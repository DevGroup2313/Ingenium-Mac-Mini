// Folder search, phase 1: parsing, chunking and hashing (rag/chunker.js, rag/parse.worker.js, and the test corpus rag/fixtures/ that
// rag/tools/make_fixtures.py writes; rag/DESIGN.md section 5). In headless Chromium, with the model's own tokenizer to count:
//   - the corpus: 72 files in the seven types, three folders, 37 facts each in exactly one file, one text file of about 4 MB, and the
//     files on disk are what the generator writes, byte for byte
//   - every file of every type parsed in the parse worker (pdf.js and mammoth run inside it), through 1 MB pieces, no error
//   - headings become heading paths (Markdown, HTML, Word, PDF by type size, JSON keys, the CSV header), checked against the browser's
//     own HTML parser and mammoth for HTML and Word
//   - offsets point at the right text in .txt and .md (a byte order mark, CRLF, Windows-1252 included), checked against an independent decode
//   - a PDF's chunks carry their page numbers, running heads and page numbers are left out
//   - every chunk's embedded input fits the model's 512 tokens by its own tokenizer, and keeps to about 300 to 450
//   - where a section is split, the next chunk repeats 10 to 15% of the one before it
//   - metadata complete; content hashes are the SHA-256 of the embedded input; the file's hash that of its bytes
//   - the facts are found in their files and no other; PDF facts on their pages
//   - edge cases (UTF-16, Windows-1252, bad files, a file with no text, long sentences, another model's limit) and the hashing code
//   - the 4 MB file parsed in pieces, with the page's memory recorded
//   python3 rag/test/serve.py 8176 --vendor <the unpacked vendor tree>        (rag/ = source/rag, rag/vendor = the vendor tree)
//   node rig/t_rag1_parse.js http://127.0.0.1:8176/ <out folder>
// If nothing answers at the address and it is on this computer, the test starts that server itself (the vendor tree from $RAG_VENDOR)
// and stops it at the end. Nothing in the page may leave this computer: every request to another address is refused and counted.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const os = require('os');
const crypto = require('crypto'); const { spawn, execFileSync } = require('child_process');
const [BASE0, OUT] = process.argv.slice(2);
if (!BASE0 || !OUT) { console.log('usage: node rig/t_rag1_parse.js <server address> <out folder>'); process.exit(2); }
const BASE = BASE0.replace(/\/?$/, '/'); const HARNESS = BASE + 'rag/test/parse_harness.html'; const ORIGIN = new URL(BASE).origin;
fs.mkdirSync(OUT, { recursive: true });
const SRC = path.resolve(__dirname, '..'); const FIX = path.join(SRC, 'rag', 'fixtures');
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d).slice(0, 700) : '')); c ? pass++ : fail++; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const TYPES = ['txt', 'md', 'html', 'json', 'csv', 'pdf', 'docx'];
const norm = (s) => s.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();

async function reachable(url) { try { const r = await fetch(url); return r.ok; } catch (e) { return false; } }
async function ensureServer() {
  if (await reachable(HARNESS)) return null;
  const u = new URL(BASE);
  if (!/^(127\.0\.0\.1|localhost)$/.test(u.hostname)) throw new Error('nothing answers at ' + BASE);
  const vendor = process.env.RAG_VENDOR || '/tmp/claude-0/-home-user/f70d4091-5e3f-5b2b-9e4a-4f66b5694ecf/scratchpad/rag0/vendor';
  const child = spawn('python3', [path.join(SRC, 'rag', 'test', 'serve.py'), u.port || '80', '--vendor', vendor], { stdio: 'ignore' });
  for (let i = 0; i < 40; i++) { if (await reachable(HARNESS)) return child; await sleep(250); }
  child.kill(); throw new Error('the test server did not start (vendor tree: ' + vendor + ')');
}

function rssMB(pid) { try { const m = /VmRSS:\s+(\d+) kB/.exec(fs.readFileSync('/proc/' + pid + '/status', 'utf8')); return m ? +m[1] / 1024 : 0; } catch (e) { return 0; } }

(async () => {
  const server = await ensureServer();
  const manifest = JSON.parse(fs.readFileSync(path.join(FIX, 'MANIFEST.json'), 'utf8')).files;
  const factsDoc = JSON.parse(fs.readFileSync(path.join(FIX, 'FACTS.json'), 'utf8')); const FACTS = factsDoc.facts;
  const extOf = (f) => f.split('.').pop().toLowerCase();
  const b = await pw.chromium.launch(); const ctx = await b.newContext();
  const external = [], requests = [], consoleErrors = [], pageErrors = [];
  await ctx.route((u) => u.origin !== ORIGIN && !/^(data|blob):/.test(u.protocol), (route) => { external.push(route.request().url()); route.abort(); });
  ctx.on('request', (r) => requests.push(r.url()));
  const p = await ctx.newPage();
  p.on('pageerror', (e) => pageErrors.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  const ev = (fn, arg) => p.evaluate(fn, arg);
  await p.goto(HARNESS); await p.waitForFunction(() => window.PH && window.PH.ready === true, null, { timeout: 30000 });
  const tk = await ev(() => PH.loadTokenizer()); await ev(() => PH.loadFacts());

  const SECTIONS = ['corpus', 'types', 'headings', 'offsets', 'pages', 'limits', 'overlap', 'metadata', 'facts', 'edge cases', 'hashing', 'big file', 'protocol'];
  const ran = [];
  const section = async (name, fn) => { try { await fn(); } catch (e) { ok(false, 'section "' + name + '" stopped: ' + (e && e.stack || e)); } ran.push(name); };
  const R = {};   // the report of each file (all folders): path -> analysis made in the page

  // ----------------------------------------------------------------------------------------------------------- corpus
  await section('corpus', async () => {
    const files = manifest.map((f) => f.path);
    ok(files.length >= 60 && files.length <= 80, 'the corpus has 60 to 80 files (' + files.length + ')');
    const folders = [...new Set(files.map((f) => f.split('/')[0]))].sort();
    ok(JSON.stringify(folders) === JSON.stringify([...factsDoc.folders].sort()) && folders.length === 3, 'three folders', folders);
    const byType = {}; for (const f of files) byType[extOf(f)] = (byType[extOf(f)] || 0) + 1;
    ok(TYPES.every((t) => byType[t] >= 3) && Object.keys(byType).length === 7, 'all seven types, at least three files of each: ' + JSON.stringify(byType));
    const big = manifest.filter((f) => f.size >= 3.9e6 && f.size <= 4.4e6);
    ok(big.length === 1 && /\.txt$/.test(big[0].path), 'one text file of about 4 MB (' + (big[0] && (big[0].size / 1e6).toFixed(2)) + ' MB)');
    const onDisk = manifest.every((f) => { const d = fs.readFileSync(path.join(FIX, f.path)); return d.length === f.size && crypto.createHash('sha256').update(d).digest('hex') === f.sha256; });
    ok(onDisk, 'every file on disk is what MANIFEST.json says (size and SHA-256)');
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fixtures-'));
    execFileSync('python3', ['-I', path.join(SRC, 'rag', 'tools', 'make_fixtures.py'), tmp]);
    const again = JSON.parse(fs.readFileSync(path.join(tmp, 'MANIFEST.json'), 'utf8')).files;
    ok(JSON.stringify(again) === JSON.stringify(manifest) && fs.readFileSync(path.join(tmp, 'FACTS.json'), 'utf8') === fs.readFileSync(path.join(FIX, 'FACTS.json'), 'utf8'),
      'make_fixtures.py writes the same corpus again, byte for byte (' + again.length + ' files and FACTS.json)');
    fs.rmSync(tmp, { recursive: true, force: true });
    ok(FACTS.length >= 25 && new Set(FACTS.map((f) => f.id)).size === FACTS.length, FACTS.length + ' distinct facts (at least 25)');
    ok(FACTS.every((f) => f.question && f.answer && f.needle && files.includes(f.path) && f.path === f.folder + '/' + f.file), 'every fact names its file, with a question, an answer and a needle');
    const restricted = FACTS.filter((f) => f.folder === factsDoc.restricted_folder);
    ok(factsDoc.restricted_folder === 'household_papers' && restricted.length >= 8, restricted.length + ' facts live only in the restricted folder (' + factsDoc.restricted_folder + ') for the permissions test');
    const bytes = fs.readFileSync(path.join(FIX, 'historian_archive/logbook/ship_logbooks_1781-1802.txt'));
    const edge = [1, 2, 3].map((k) => bytes[k * 1048576 - 1] === 0xc2 && bytes[k * 1048576] === 0xb0);
    ok(edge.every(Boolean), 'the 4 MB file has a two-byte character (the degree sign) across the edge of each of its first three 1 MiB pieces', edge);
  });

  // --------------------------------------------------------------------------------------------------------- types
  await section('types', async () => {
    for (const f of manifest.map((m) => m.path)) {
      R[f] = await ev((f) => PH.analyse(f), f).catch((e) => ({ path: f, error: String(e && e.message || e) }));
    }
    const errs = Object.values(R).filter((r) => r.error);
    ok(errs.length === 0, 'every file was parsed without an error (' + Object.keys(R).length + ' files)', errs.map((r) => [r.path, r.error]));
    for (const t of TYPES) {
      const rs = Object.values(R).filter((r) => !r.error && r.ext === t);
      ok(rs.length >= 3 && rs.every((r) => r.chunks >= 1 && r.blocks >= 1), '.' + t + ': ' + rs.length + ' files parsed, ' + rs.reduce((a, r) => a + r.chunks, 0) + ' chunks, each file has blocks and chunks');
    }
    ok(Object.values(R).every((r) => r.hashOk), "each file's hash is the SHA-256 of its bytes (the page's own digest)");
    const odd = Object.values(R).filter((r) => r.warnings && r.warnings.length);
    ok(odd.length === 1 && /school_letter/.test(odd[0].path) && /Windows-1252/.test(odd[0].warnings[0]), 'only the Windows-1252 letter gives a warning', odd.map((r) => [r.path, r.warnings]));
    const multi = Object.values(R).filter((r) => r.pieces > 1);
    ok(multi.length === 1 && multi[0].pieces === 5, 'only the 4 MB file is read in several pieces (5 of at most 1 MiB)', multi.map((r) => [r.path, r.pieces]));
  });

  // ----------------------------------------------------------------------------------------------------- headings
  await section('headings', async () => {
    const WANT = {
      'historian_archive/diaries/josiah_hollis_diary_1786.md': ['Journal of Josiah Hollis, 1786 > September > 27 September 1786', 'Journal of Josiah Hollis, 1786 > December'],
      'historian_archive/diaries/josiah_hollis_diary_1788.md': ['Journal of Josiah Hollis, 1788 > Spring term > The accounts', 'Journal of Josiah Hollis, 1788 > Setext heading: the winter'],
      'historian_archive/diaries/dorothea_pell_journal_1789.md': ["Journal kept at Pell's Rest, St. Elizabeth, Jamaica, 1789 > The weather > The storm of August"],
      'historian_archive/finding_aids/wren_collection_guide.html': ['The Wren Papers: a guide to the collection > Access > Reading room', 'The Wren Papers: a guide to the collection > Administrative history'],
      'historian_archive/chapters/chapter3_the_cooper_trade.docx': ['Chapter Three: The Cooper Trade > The credit of the firm > Where the firm stood in January 1790'],
      'historian_archive/articles/sugar_duties_1787.pdf': ['The Sugar Duties of 1787 and the Bristol Refiners > The rate in 1787'],
      'historian_archive/articles/guide_for_visitors.pdf': ["A Visitor's Guide to the Reading Room > In the reading room"],
      'historian_archive/ledgers/voyages_1781-1795.json': ['voyages'],
      'lab_notes/data/experiment_metadata.json': ['design > factors', 'investigators'],
      'lab_notes/instruments/incubator_b_log_2026-05.csv': ['timestamp | temp_c | humidity_pct | note'],
      'lab_notes/reports/q2_report_2026.pdf': ['Okoye Laboratory: Quarterly Report, April to June 2026 > Finance'],
      'lab_notes/protocols/spore_germination_assay.md': ['Spore germination assay > Procedure > Counting'],
      'lab_notes/meetings/lab_meeting_2026-06-18.html': ['Lab meeting, 18 June 2026 > 2. Equipment > Centrifuge'],
      'household_papers/recipes/cardamom_buns.md': ['Cardamom buns > Method'],
    };
    for (const [f, paths] of Object.entries(WANT)) {
      const have = new Set(R[f].headings);
      ok(paths.every((x) => have.has(x)), 'heading paths of ' + f.split('/').slice(-1)[0] + ': ' + paths.map((x) => '"' + x.slice(0, 60) + '"').join(', '), paths.filter((x) => !have.has(x)));
    }
    const txt = Object.values(R).filter((r) => r.ext === 'txt');
    ok(txt.every((r) => r.headings.length === 1 && r.headings[0] === ''), 'a plain text has no headings: its chunks carry no heading path (' + txt.length + ' files)');
    // the browser's own HTML parser, and mammoth for Word, say where the headings are
    let checked = 0; const diffs = [];
    for (const f of Object.keys(R).filter((x) => /\.(html|docx)$/.test(x))) {
      const want = await ev((f) => PH.oracleHeadings(f), f); const got = R[f].headBlocks;
      checked++; if (JSON.stringify(want) !== JSON.stringify(got)) diffs.push([f, want.slice(0, 4), got.slice(0, 4)]);
    }
    ok(checked >= 13 && diffs.length === 0, 'the headings of ' + checked + ' HTML and Word files are those the browser\'s HTML parser finds (levels and words)', diffs);
    // Markdown: ATX headings outside code fences, read again here with another small reader
    const mdDiffs = []; let mdN = 0;
    for (const f of Object.keys(R).filter((x) => x.endsWith('.md'))) {
      mdN++;
      const raw = fs.readFileSync(path.join(FIX, f), 'utf8').replace(/^\uFEFF/, ''); let fence = false; const want = [];
      for (const line of raw.split(/\r?\n/)) {
        if (/^\s{0,3}(```|~~~)/.test(line)) { fence = !fence; continue; }
        const m = !fence && /^ {0,3}(#{1,6})[ \t]+(.*?)[ \t]*$/.exec(line);
        if (m) want.push([m[1].length, m[2].replace(/[ \t]+#+$/, '').replace(/[*_`]/g, '')]);
      }
      const got = R[f].headBlocks.filter((h) => !/Setext heading/.test(h[1]));
      if (JSON.stringify(want.filter((w) => !/Setext heading/.test(w[1]))) !== JSON.stringify(got)) mdDiffs.push([f, want.slice(0, 3), got.slice(0, 3)]);
    }
    ok(mdN >= 10 && mdDiffs.length === 0, 'the ATX headings of ' + mdN + ' Markdown files are read as another reader reads them', mdDiffs);
    const pdfs = Object.values(R).filter((r) => r.ext === 'pdf');
    ok(pdfs.every((r) => r.headBlocks.length >= 2), 'every PDF has headings found from its type sizes (' + pdfs.map((r) => r.headBlocks.length).join(', ') + ')');
    const csv = Object.values(R).filter((r) => r.ext === 'csv');
    ok(csv.every((r) => r.headBlocks.length === 1 && r.headBlocks[0][1].includes(' | ')), 'every CSV keeps its header as the heading path (' + csv.length + ' files)');
  });

  // ------------------------------------------------------------------------------------------------------ offsets
  await section('offsets', async () => {
    const txtmd = Object.values(R).filter((r) => r.ext === 'txt' || r.ext === 'md');
    ok(txtmd.every((r) => r.blockOffsets.bad === 0 && r.verbatimBad === 0), 'in ' + txtmd.length + ' .txt and .md files every block and every chunk is text.slice(char_start, char_end) of the file\'s text exactly (' +
      txtmd.reduce((a, r) => a + r.blockOffsets.n, 0) + ' blocks, ' + txtmd.reduce((a, r) => a + r.chunks, 0) + ' chunks)');
    ok(txtmd.every((r) => r.decodeEqual === true), "the worker's text is the file's bytes decoded again here (UTF-8; Windows-1252 for the one old letter)");
    const withBom = [], withCrlf = [];
    for (const r of Object.values(R)) { const d = fs.readFileSync(path.join(FIX, r.path)); if (['txt', 'md', 'csv'].includes(r.ext)) { if (d[0] === 0xef && d[1] === 0xbb && d[2] === 0xbf) withBom.push(r.path); if (d.includes(13)) withCrlf.push(r.path); } }
    ok(withBom.length >= 2 && withCrlf.length >= 4, 'the corpus has files with a byte order mark (' + withBom.length + ') and CRLF line ends (' + withCrlf.length + ')');
    ok(withBom.every((f) => R[f].verbatimBad === 0 && R[f].decodeEqual !== false) && withCrlf.every((f) => R[f].verbatimBad === 0), 'offsets are exact in those files too');
    // the chunk that holds a fact, cut from the text of the file decoded in this process
    let n = 0, bad = [];
    for (const f of FACTS.filter((x) => /\.(txt|md)$/.test(x.path))) {
      const r = R[f.path]; const d = fs.readFileSync(path.join(FIX, f.path));
      const txt = new TextDecoder(r.warnings.some((w) => /1252/.test(w)) ? 'windows-1252' : 'utf-8').decode(d);
      const spans = r.factChunks[f.id] || []; n++;
      if (!spans.length || !spans.every(([a, b]) => norm(txt.slice(a, b)).includes(norm(f.needle)))) bad.push(f.id);
    }
    ok(n >= 15 && bad.length === 0, 'for ' + n + ' facts in .txt and .md files the offsets, applied to the file decoded here, cut out the sentence that holds the fact', bad);
  });

  // ---------------------------------------------------------------------------------------------------- pages
  await section('pages', async () => {
    const pdfs = Object.values(R).filter((r) => r.ext === 'pdf');
    ok(pdfs.length === 9, pdfs.length + ' PDFs');
    const counted = pdfs.map((r) => { const raw = fs.readFileSync(path.join(FIX, r.path)).toString('latin1'); return [r.path, (raw.match(/\/Type \/Page /g) || []).length, r.numPages]; });
    ok(counted.every(([, n, m]) => n === m && n >= 2), 'each PDF is read as the pages it has (' + counted.map((c) => c[2]).join(', ') + ')', counted.filter((c) => c[1] !== c[2]));
    ok(pdfs.every((r) => r.pageNumbers.every((x) => Number.isInteger(x) && x >= 1 && x <= r.numPages) && r.pageNumbers.length === r.numPages), 'the chunks of each PDF carry integer page numbers from 1 to its last page, and every page has chunks');
    ok(pdfs.filter((r) => r.numPages >= 4).length >= 4, 'several PDFs run to four pages or more');
    const others = Object.values(R).filter((r) => r.ext !== 'pdf');
    ok(others.every((r) => r.pageNumbers === null), 'no other type carries a page number');
    const ok1 = FACTS.filter((f) => f.type === 'pdf');
    const wrong = ok1.filter((f) => { const x = R[f.path].found[f.id]; return !x || x.pages.length !== 1 || x.pages[0] !== f.page; });
    ok(ok1.length === 6 && wrong.length === 0 && new Set(ok1.map((f) => f.page)).size >= 3, ok1.length + ' facts in PDFs are in chunks that carry the page they are on (' + ok1.map((f) => f.id + ':p' + f.page).join(' ') + ')', wrong.map((f) => [f.id, f.page, R[f.path].found[f.id]]));
    // the running head and the page numbers of the offprints are left out of the text
    const text = await ev(async () => { const out = {}; for (const f of ['historian_archive/articles/sugar_duties_1787.pdf', 'historian_archive/articles/guide_for_visitors.pdf', 'lab_notes/reports/q2_report_2026.pdf']) { const bytes = await PH.fetchBytes(PH.FIX + f); const r = await PH.parseBytes(bytes, 'pdf', { path: f }); out[f] = r.pages; } return out; });
    const joined = Object.values(text).flat().join('\n');
    ok(!/Offprint series \|/.test(joined) && !/Visitors \| Bristol/.test(joined) && !/Okoye Laboratory \| Q2/.test(joined) && !/^- \d+ -$/m.test(joined), 'running heads and "- n -" page numbers are not in the text of a PDF');
    ok(Object.values(text).every((pg) => pg.every((t) => t.length > 200)), 'the text of every page is its own (page by page offsets)');
  });

  // ----------------------------------------------------------------------------------------------------- limits
  await section('limits', async () => {
    const rs = Object.values(R); const total = rs.reduce((a, r) => a + r.chunks, 0);
    ok(rs.every((r) => r.over512 === 0), 'no chunk\'s embedded input is over the model\'s limit of ' + tk.maxTokens + ' tokens, by the model\'s own tokenizer, in ' + total + ' chunks');
    ok(rs.every((r) => r.tokBad === 0), "the worker's token counts are the tokenizer's, chunk by chunk (" + total + ' chunks)');
    const over450 = rs.reduce((a, r) => a + r.over450, 0), maxTok = Math.max(...rs.map((r) => r.maxTok));
    ok(over450 / total < 0.01 && maxTok <= 475, over450 + ' chunks of ' + total + ' are over 450 tokens (a small tail kept with its chunk), the largest has ' + maxTok);
    const splitMin = Math.min(...rs.filter((r) => r.overlap.splitMin).map((r) => r.overlap.splitMin));
    ok(splitMin >= 300, 'a chunk that a section goes on from holds at least 300 tokens (the smallest has ' + splitMin + ')');
    const log = R['historian_archive/logbook/ship_logbooks_1781-1802.txt'];
    ok(log.minTok >= 300 && log.maxTok <= 475 && log.meanTok >= 380, 'the 4 MB file: ' + log.chunks + ' chunks of ' + log.minTok + ' to ' + log.maxTok + ' tokens, mean ' + log.meanTok);
  });

  // --------------------------------------------------------------------------------------------------- overlap
  await section('overlap', async () => {
    const rs = Object.values(R); const pairs = rs.reduce((a, r) => a + r.overlap.pairs, 0), ovl = rs.reduce((a, r) => a + r.overlap.ovl, 0);
    ok(rs.reduce((a, r) => a + r.overlap.outsideCount, 0) === 0 && ovl === pairs && ovl > 3000, 'in ' + ovl + ' pairs of chunks of one section the later chunk repeats 10 to 15% of the earlier (' +
      Math.min(...rs.filter((r) => r.overlap.ovl).map((r) => r.overlap.minR)).toFixed(3) + ' to ' + Math.max(...rs.filter((r) => r.overlap.ovl).map((r) => r.overlap.maxR)).toFixed(3) + ' of its tokens)',
      rs.filter((r) => r.overlap.outsideCount).map((r) => [r.path, r.overlap.outside]));
    ok(rs.every((r) => r.overlap.disjoint === 0), 'a section that is split never splits without the overlap');
    for (const t of TYPES) { const n = rs.filter((r) => r.ext === t).reduce((a, r) => a + r.overlap.ovl, 0); ok(n >= 1, '.' + t + ': ' + n + ' overlapping pairs'); }
    ok(rs.reduce((a, r) => a + (r.stats.fragments || 0), 0) >= 1, 'where no run of whole sentences is 10 to 15%, the end of a sentence is carried (' + rs.reduce((a, r) => a + (r.stats.fragments || 0), 0) + ' times)');
  });

  // ------------------------------------------------------------------------------------------------- metadata
  await section('metadata', async () => {
    const rs = Object.values(R); const total = rs.reduce((a, r) => a + r.chunks, 0);
    ok(rs.every((r) => r.metaBadCount === 0), 'metadata is complete in all ' + total + ' chunks: chunk_index (in order), heading_path, char_start < char_end, page (integer or null), content_hash, text, input, tokens', rs.filter((r) => r.metaBadCount).map((r) => [r.path, r.metaBad]));
    ok(rs.every((r) => r.hashBad === 0), 'content_hash is the SHA-256 (hex) of the embedded input in every chunk (the page\'s own digest)');
    ok(rs.every((r) => r.inputBad === 0), 'the embedded input is the heading path, a blank line and the text (or the text alone) in every chunk');
    ok(rs.every((r) => r.verbatimBad === 0), 'every chunk\'s text is the slice of the text (of its page for a PDF) that its offsets give');
    const ids = new Set(); let dup = 0; for (const r of rs) { /* hashes are per chunk text; the same text twice in a file is allowed */ ids.add(r.path); }
    ok(ids.size === rs.length, 'one report for each of ' + rs.length + ' files');
  });

  // ---------------------------------------------------------------------------------------------------- facts
  await section('facts', async () => {
    const where = {}; for (const r of Object.values(R)) for (const id in r.found) (where[id] = where[id] || []).push(r.path);
    const bad = FACTS.filter((f) => !where[f.id] || where[f.id].length !== 1 || where[f.id][0] !== f.path);
    ok(Object.keys(where).length === FACTS.length && bad.length === 0, 'each of ' + FACTS.length + ' facts is found in the text its reader extracts from its own file and from no other file', bad.map((f) => [f.id, where[f.id]]));
    const byType = {}; for (const f of FACTS) byType[f.type] = (byType[f.type] || 0) + 1;
    ok(TYPES.every((t) => byType[t] >= 2), 'facts sit in files of all seven types: ' + JSON.stringify(byType));
    const noChunk = FACTS.filter((f) => !R[f.path].found[f.id] || R[f.path].found[f.id].chunks < 1);
    ok(noChunk.length === 0, 'the whole phrase of each fact is inside at least one chunk (' + FACTS.length + ' of ' + FACTS.length + ')', noChunk.map((f) => f.id));
    const inRestricted = FACTS.filter((f) => f.folder === factsDoc.restricted_folder).every((f) => where[f.id].every((w) => w.startsWith(factsDoc.restricted_folder + '/')));
    const leaked = FACTS.filter((f) => f.folder !== factsDoc.restricted_folder).filter((f) => where[f.id].some((w) => w.startsWith(factsDoc.restricted_folder + '/')));
    ok(inRestricted && leaked.length === 0, "the restricted folder's facts exist only in that folder, and no other folder's fact is in it");
    const big = FACTS.filter((f) => f.path.includes('ship_logbooks'));
    ok(big.length === 2 && big.every((f) => R[f.path].found[f.id] && R[f.path].found[f.id].chunks >= 1), 'two facts are buried deep in the 4 MB file and are found in its chunks');
  });

  // ------------------------------------------------------------------------------------------------ edge cases
  await section('edge cases', async () => {
    const e1 = await ev(() => {
      const S = (t) => PH.chunker.splitSentences(t).map(([a, b]) => t.slice(a, b));
      return [S("Dr. Smith went to St. Mary's on Oct. 5, 1790. He left at noon."), S('J. R. R. Tolkien wrote it. It sold well.'), S('See pp. 12-15 and fig. 3. Then stop.'),
        S('He paid 3.5 shillings; e.g. the cooper. Next year came. "Why?" she asked. No one knew!'), S('It was ca. 1790. The ship sailed.'), S('Wait... what? Yes. Fine'), S('  Leading space.  Two.  ')];
    });
    ok(JSON.stringify(e1) === JSON.stringify([["Dr. Smith went to St. Mary's on Oct. 5, 1790.", 'He left at noon.'], ['J. R. R. Tolkien wrote it.', 'It sold well.'], ['See pp. 12-15 and fig. 3.', 'Then stop.'],
      ['He paid 3.5 shillings; e.g. the cooper.', 'Next year came.', '"Why?" she asked.', 'No one knew!'], ['It was ca. 1790.', 'The ship sailed.'], ['Wait... what?', 'Yes.', 'Fine'], ['Leading space.', 'Two.']]),
      'sentences: titles, initials, abbreviations, decimals, quotes and ellipses do not end them', e1);
    const e2 = await ev(async () => {
      const out = {};
      const le = new Uint8Array([0xff, 0xfe, ...[...'Héllo wörld.\n\nSecond paragraph, with £.'].flatMap((c) => [c.charCodeAt(0) & 255, c.charCodeAt(0) >> 8])]);
      const r1 = await PH.parseBytes(le, 'txt'); out.utf16 = [r1.text, r1.warnings, r1.blocks.length];
      const r2 = await PH.parseBytes(new Uint8Array([...'caf'].map((c) => c.charCodeAt(0)).concat([0xe9, 0x20, 0x93, 0x71, 0x94, 0x20, 0xa3, 0x35, 0x2e])), 'txt'); out.cp1252 = [r2.text, r2.warnings];
      const u = new TextEncoder().encode('Maîéé °°° — 😀 end.\n\nSecond.'); const r3 = await PH.parseBytes(u, 'txt', { pieceSize: 7 }); out.pieces = [r3.text === new TextDecoder().decode(u), r3.pieces === Math.ceil(u.length / 7), r3.text.includes('�'), u.length];
      const r4 = await PH.parseBytes(new Uint8Array([0xef, 0xbb, 0xbf, ...new TextEncoder().encode('With BOM.\r\nLine two.\r\n\r\nThird.')]), 'txt'); out.bom = [r4.text, r4.blocks.map((b) => [b.char_start, b.char_end])];
      return out;
    });
    ok(e2.utf16[0] === 'Héllo wörld.\n\nSecond paragraph, with £.' && e2.utf16[1].length === 0 && e2.utf16[2] === 2, 'UTF-16 with a byte order mark is decoded (no warning)', e2.utf16);
    ok(e2.cp1252[0] === 'café “q” £5.' && /Windows-1252/.test(e2.cp1252[1][0]), 'bytes that are not UTF-8 are read as Windows-1252, with a warning', e2.cp1252);
    ok(e2.pieces[0] && e2.pieces[1] && !e2.pieces[2], 'a text of ' + e2.pieces[3] + ' bytes cut into pieces of 7 (characters of 2, 3 and 4 bytes fall across the edges) decodes whole with one TextDecoder', e2.pieces);
    ok(e2.bom[0] === 'With BOM.\r\nLine two.\r\n\r\nThird.' && JSON.stringify(e2.bom[1]) === JSON.stringify([[0, 20], [24, 30]]), 'a UTF-8 byte order mark is dropped, CRLF stays, offsets are those of the decoded text', e2.bom);
    const e3 = await ev(async () => {
      const md = '---\ntitle: x\n---\n# Top\n\nIntro.\n\n```\n# not a heading\n```\n\nSetext\n======\n\nBody under setext.\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n- item\n  more\n- second\n';
      const r = await PH.parseString(md, 'md'); return { heads: r.blocks.filter((b) => b.kind === 'heading').map((b) => [b.level, b.text]), kinds: r.blocks.map((b) => b.kind), paths: r.chunks.map((c) => c.heading_path) };
    });
    ok(JSON.stringify(e3.heads) === JSON.stringify([[1, 'Top'], [1, 'Setext']]) && e3.kinds.filter((k) => k === 'code').length === 1 && e3.kinds.filter((k) => k === 'row').length === 2 && e3.kinds.filter((k) => k === 'item').length === 2,
      'Markdown: front matter skipped, a "#" inside a fence is not a heading, setext headings, a table is its rows (the separator line is none), a list item with a continued line is one item', e3);
    const e4 = await ev(async () => {
      const h = '<html><head><title>T &amp; U</title><style>p{}</style><script>var a="<h1>x</h1>";</script></head><body><nav><h2>menu</h2></nav><h1>Main</h1><p>A&eacute;&#233;&#x41;&nbsp;b<br>c</p>' +
        '<table><tr><th>Port</th><th>Year</th></tr><tr><td>Bristol</td><td>1790</td></tr></table><ul><li>one</li><li>two</li></ul><pre>x\n  y</pre><p hidden>secret</p></body></html>';
      const r = await PH.parseString(h, 'html'); return { text: r.text, meta: r.meta, heads: r.blocks.filter((b) => b.kind === 'heading').map((b) => [b.level, b.text]) };
    });
    ok(e4.text === 'Main\n\nAééA b\nc\n\nPort | Year\nPort: Bristol | Year: 1790\n\n- one\n- two\n\nx\n  y' && JSON.stringify(e4.heads) === '[[1,"Main"]]' && e4.meta.title === 'T & U',
      'HTML: script, style, nav and hidden dropped, entities decoded, a table of th cells labels its rows, lists and pre kept', e4);
    const e5 = await ev(async () => {
      const a = await PH.parseString('{"a": {"b": [1, {"c": "x y"}]}, "k": 2}', 'json'); const bad = await PH.parseString('{not json', 'json'); const jl = await PH.parseString('{"n": 1}\n{"n": 2}\n', 'json');
      const q = await PH.parseString('Port;Year;Note\nBristol;1790;"two\nlines; with semicolon"\nCork;1791;plain\n', 'csv'); const nh = await PH.parseString('1,2,3\n4,5,6\n', 'csv');
      return { json: a.text, badW: bad.warnings, jl: jl.text, rows: q.blocks.map((b) => b.kind + ':' + b.text.length), heading: q.blocks[0].text, nh: nh.blocks.map((b) => b.kind) };
    });
    ok(e5.json === 'k: 2\n\na\n\nb\n\na.b[0]: 1\n\na.b[1].c: x y', 'JSON is written as path: value lines, every key that holds an object or array a heading, every array item a block', e5.json);
    ok(e5.badW.length === 1 && /not valid JSON/.test(e5.badW[0]) && e5.jl === '[0].n: 1\n\n[1].n: 2', 'JSON that is not JSON is read as plain text (with a warning); JSON Lines is read line by line', [e5.badW, e5.jl]);
    ok(e5.heading === 'Port | Year | Note' && JSON.stringify(e5.rows) === JSON.stringify(['heading:18', 'row:40', 'row:15']) && JSON.stringify(e5.nh) === '["row","row"]',
      'CSV: ";" is found as the delimiter, a quoted field with a line break and a semicolon stays in its row, a numeric first row is not taken for a header', e5);
    const e6 = await ev(async () => {
      const r1 = await PH.parseBytes(new Uint8Array(0), 'txt'); const r2 = await PH.parseString('   \n\n  ', 'md'); const r3 = await PH.parseString('Tiny.', 'txt');
      return { empty: [r1.chunks.length, r1.warnings, r1.fileHash], ws: [r2.chunks.length, r2.warnings], tiny: [r3.chunks.length, r3.chunks[0].text] };
    });
    ok(e6.empty[0] === 0 && /empty/.test(e6.empty[1][0]) && e6.empty[2] === 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' && e6.ws[0] === 0 && e6.tiny[0] === 1 && e6.tiny[1] === 'Tiny.',
      'an empty file and a file of white space give no chunks (a warning, the hash of nothing); a one-word file gives one', e6);
    const e7 = await ev(async () => {
      const blank = (() => { const enc = new TextEncoder(); const o = ['%PDF-1.4\n', '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n', '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n', '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] >>\nendobj\n'];
        let s = '', offs = []; for (const x of o) { if (x.startsWith('%')) s += x; else { offs.push(s.length); s += x; } } const xr = s.length;
        s += 'xref\n0 4\n0000000000 65535 f \n' + offs.map((n) => String(n).padStart(10, '0') + ' 00000 n \n').join('') + 'trailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n' + xr + '\n%%EOF\n'; return enc.encode(s); })();
      const out = {};
      const r = await PH.parseBytes(blank, 'pdf'); out.blank = [r.chunks.length, r.warnings, r.meta.numPages];
      const errs = async (bytes, ext, o) => { try { await PH.parseBytes(bytes, ext, o); return 'no error'; } catch (e) { return String(e.message); } };
      out.badPdf = await errs(new TextEncoder().encode('this is not a pdf at all'), 'pdf'); out.badDocx = await errs(new TextEncoder().encode('this is not a docx'), 'docx');
      out.ext = await errs(new Uint8Array(3), 'xyz'); out.big = await errs(new Uint8Array(100), 'txt', { maxBytes: 10 });
      const after = await PH.parseString('Still works after the errors.', 'txt'); out.after = after.chunks.length;
      return out;
    });
    ok(e7.blank[0] === 0 && /no text on 1 of 1 pages/.test(e7.blank[1][0]) && e7.blank[2] === 1, 'a PDF with no text gives no chunks and says so (scanned pages)', e7.blank);
    ok(/PDF/.test(e7.badPdf) && /Word/.test(e7.badDocx) && /unsupported file type/.test(e7.ext) && /too large/.test(e7.big) && e7.after === 1, 'a file that is not a PDF, not a Word file, of another type or too large is refused with its reason, and the worker goes on', e7);
    const e8 = await ev(async () => {
      const W = 'harbour sugar cargo merchant letter ledger captain wind tide cooper cask shilling warehouse Bristol Kingston voyage Lisbon freight insurance partner debt receipt'.split(' ');
      let s = 7; const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
      const sent = (n) => { const w = []; for (let i = 0; i < n; i++) w.push(W[Math.floor(rnd() * W.length)]); return w.join(' ').replace(/^./, (c) => c.toUpperCase()) + '.'; };
      const long = Array.from({ length: 30 }, () => Array.from({ length: 3 }, () => sent(55 + Math.floor(rnd() * 60))).join(' ')).join('\n\n');
      const r = await PH.parseString(long, 'txt'); const ov = PH.overlapReport(r.chunks, () => r.text);
      const mini = await PH.parseString(Array.from({ length: 20 }, () => sent(20 + Math.floor(rnd() * 15))).join(' '), 'txt', { maxTokens: 256 });
      const word = await PH.parseString('\u6c49\u5b57'.repeat(1500) + '\n\nShort tail paragraph here.', 'txt');
      const head = '# ' + 'Very long heading about the sugar trade of Bristol in the eighteenth century '.repeat(9) + '\n\nBody text that follows the heading. '.repeat(3);
      const hr = await PH.parseString(head, 'md');
      return { n: r.chunks.length, ov, frag: r.stats.fragments, maxLong: Math.max(...r.chunks.map((c) => PH.tok.encode(c.input).length)), miniMax: Math.max(...mini.chunks.map((c) => PH.tok.encode(c.input).length)), miniN: mini.chunks.length,
        wordMax: Math.max(...word.chunks.map((c) => PH.tok.encode(c.input).length)), wordN: word.chunks.length, hp: hr.chunks[0].heading_path.length, hin: PH.tok.encode(hr.chunks[0].input).length, hsplit: hr.chunks[0].input.split('\n\n')[0].length };
    });
    ok(e8.ov.outsideCount === 0 && e8.ov.ovl >= 20 && e8.frag >= 5, 'long sentences of 55 to 115 words: ' + e8.n + ' chunks, ' + e8.ov.ovl + ' overlaps all 10 to 15% (' + e8.ov.minR.toFixed(3) + ' to ' + e8.ov.maxR.toFixed(3) + '), the end of a sentence carried ' + e8.frag + ' times', e8.ov);
    ok(e8.maxLong <= 475, 'and none of those chunks is over 475 tokens (' + e8.maxLong + ')');
    ok(e8.miniMax <= 256 && e8.miniN > 1, "for a model whose limit is 256 tokens the chunks are cut to fit (" + e8.miniN + " chunks, the largest " + e8.miniMax + ")", e8);
    ok(e8.wordMax <= 512 && e8.wordN >= 7, 'a text of 3,000 Chinese characters with no space and no full stop is cut by characters to fit (' + e8.wordN + ' chunks, the largest ' + e8.wordMax + ' tokens)', e8);
    ok(e8.hin <= 512 && e8.hp > 300 && e8.hsplit < e8.hp, "a heading path of " + e8.hp + " characters is shortened in the embedded input (" + e8.hin + " tokens) but kept whole as the chunk's heading_path", e8);
  });

  // ------------------------------------------------------------------------------------------------------ hashing
  await section('hashing', async () => {
    const inputs = ['', 'abc', 'x'.repeat(55), 'x'.repeat(56), 'x'.repeat(63), 'x'.repeat(64), 'x'.repeat(65), 'café — 😀', 'a'.repeat(100000)];
    const want = inputs.map((s) => crypto.createHash('sha256').update(s).digest('hex'));
    const got = await ev(async (inputs) => { const C = PH.chunker; const out = []; for (const s of inputs) out.push([C.sha256HexJs(s), await C.sha256Hex(s), await PH.sha(s)]); return out; }, inputs);
    ok(got.every((g, i) => g[0] === want[i] && g[1] === want[i] && g[2] === want[i]), 'SHA-256 in plain JS, through crypto.subtle and the page\'s own digest agree with Node on ' + inputs.length + ' inputs (empty, block edges, accents, emoji, 100 kB)');
    const data = Buffer.alloc(100003).map((_, i) => (i * 7 + 3) & 255); const w2 = crypto.createHash('sha256').update(data).digest('hex');
    const s2 = await ev((arr) => { const d = new Uint8Array(arr); const h = new PH.chunker.Sha256(); for (let q = 0; q < d.length;) { const n = 1 + (q % 977); h.update(d.subarray(q, q + n)); q += n; } return Array.from(h.digest(), (x) => x.toString(16).padStart(2, '0')).join(''); }, [...data]);
    ok(s2 === w2, 'streaming SHA-256 in pieces of odd sizes equals the one-shot digest');
    const known = await ev(() => PH.chunker.sha256Hex('abc'));
    ok(known === 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad', 'SHA-256 of "abc" is the published value');
  });

  // ---------------------------------------------------------------------------------------------------- big file
  await section('big file', async () => {
    const f = 'historian_archive/logbook/ship_logbooks_1781-1802.txt';
    const bc = await b.newBrowserCDPSession(); const cdp = await ctx.newCDPSession(p);
    await cdp.send('Performance.enable'); await cdp.send('HeapProfiler.collectGarbage');
    const procs = (await bc.send('SystemInfo.getProcessInfo')).processInfo; const renderers = procs.filter((x) => x.type === 'renderer').map((x) => x.id);
    const rss = () => renderers.reduce((a, id) => a + rssMB(id), 0);
    const heap = async () => (await cdp.send('Performance.getMetrics')).metrics.find((m) => m.name === 'JSHeapUsedSize').value / 1048576;
    const before = { heap: await heap(), rss: rss() };
    let peakRss = before.rss, peakHeap = before.heap; let stop = false;
    const sampler = (async () => { while (!stop) { peakRss = Math.max(peakRss, rss()); peakHeap = Math.max(peakHeap, await heap()); await sleep(150); } })();
    const t0 = Date.now();
    const r = await ev(async (f) => {
      const bytes = await PH.fetchBytes(PH.FIX + f); const stages = []; const memPeak = { used: 0 };
      const timer = setInterval(() => { const m = PH.memory(); if (m) memPeak.used = Math.max(memPeak.used, m.used); }, 100);
      const res = await PH.parseBytes(bytes, 'txt', { path: f, slim: true, onStage: (m) => { if (!stages.length || stages[stages.length - 1] !== m.stage) stages.push(m.stage); } });
      clearInterval(timer);
      return { size: bytes.length, pieces: res.pieces, chunks: res.chunks.length, fileHash: res.fileHash, expected: await PH.sha(bytes), stats: res.stats, parseMs: res.parseMs, stages, hasText: 'text' in res, warnings: res.warnings, pageUsed: memPeak.used, lastTokens: res.chunks[res.chunks.length - 1].tokens };
    }, f);
    const ms = Date.now() - t0; stop = true; await sampler;
    await cdp.send('HeapProfiler.collectGarbage'); await sleep(300);
    const after = { heap: await heap(), rss: rss() };
    ok(r.size === manifest.find((m) => m.path === f).size && r.pieces === 5, 'the 4 MB file (' + (r.size / 1e6).toFixed(2) + ' MB) is sent to the worker in ' + r.pieces + ' pieces of at most 1 MiB');
    ok(r.fileHash === r.expected && r.chunks === R[f].chunks && r.hasText === false, 'its hash is the SHA-256 of its bytes, and a "slim" result leaves out the text and the blocks (' + r.chunks + ' chunks)');
    ok(r.chunks > 2800 && r.parseMs < 60000, 'parsed, measured and chunked in ' + (r.parseMs / 1000).toFixed(1) + ' s (' + r.chunks + ' chunks, ' + r.stats.calls + ' token-count requests for ' + r.stats.texts + ' texts)');
    const mem = { method: 'CDP Performance.getMetrics (JSHeapUsedSize of the page), SystemInfo.getProcessInfo + /proc/<pid>/status VmRSS (the renderer, which holds the page and its workers), sampled every 150 ms',
      pageHeapMB: { before: +before.heap.toFixed(1), peak: +peakHeap.toFixed(1), after: +after.heap.toFixed(1) }, rendererRssMB: { before: +before.rss.toFixed(0), peak: +peakRss.toFixed(0), after: +after.rss.toFixed(0) }, pageUsedHeapByPerformanceMemoryMB: +(r.pageUsed / 1048576).toFixed(1), ms };
    fs.writeFileSync(path.join(OUT, 'big_file_memory.json'), JSON.stringify(mem, null, 1));
    console.log('     memory of the page while the 4 MB file is parsed: ' + JSON.stringify(mem.pageHeapMB) + ' MB JS heap; renderer RSS ' + JSON.stringify(mem.rendererRssMB) + ' MB; ' + (ms / 1000).toFixed(1) + ' s in all');
    ok(peakHeap - before.heap < 150, "the page's JS heap grows by " + (peakHeap - before.heap).toFixed(0) + ' MB at most while the file is parsed (under 150 MB; its pieces and chunks pass through)');
    ok(peakRss - before.rss < 700, "the renderer's resident memory (page, tokenizer and parse worker) grows by " + (peakRss - before.rss).toFixed(0) + ' MB at most (under 700 MB)');
    ok(after.heap - before.heap < 60, "and the page's JS heap is back to within " + (after.heap - before.heap).toFixed(0) + ' MB of where it began when the parse is done');
    const text = await ev(async (f) => { const bytes = await PH.fetchBytes(PH.FIX + f); const r = await PH.parseBytes(bytes, 'txt', { path: f }); return { len: r.text.length, bad: r.text.includes('�'), deg: (r.text.match(/°/g) || []).length, equal: r.text === new TextDecoder().decode(bytes) }; }, f);
    const raw = fs.readFileSync(path.join(FIX, f)); let degBytes = 0; for (let i = 0; i < raw.length - 1; i++) if (raw[i] === 0xc2 && raw[i + 1] === 0xb0) degBytes++;
    ok(!text.bad && text.equal && text.deg === degBytes, 'decoded piece by piece with one TextDecoder, the 4 MB file\'s text equals the whole file decoded at once: ' + text.len + ' characters, ' + text.deg + ' degree signs, none lost at a piece edge');
  });

  // ------------------------------------------------------------------------------------------------- protocol
  await section('protocol', async () => {
    const info = await ev(async () => { const st = []; const bytes = new TextEncoder().encode('One paragraph. ' .repeat(300)); const r = await PH.parseBytes(bytes, 'txt', { onStage: (m) => { if (!st.length || st[st.length - 1] !== m.stage) st.push(m.stage); } }); const i = await PH.client._request('info'); return { st, i, counts: PH.counts, errs: PH.client.errors }; });
    ok(JSON.stringify(info.st) === JSON.stringify(['reading', 'units', 'counting', 'splitting', 'packing', 'checking']), 'the worker reports its stages in order', info.st);
    ok(info.counts > 1000 && info.i.pdfjs === '6.4.299' && info.i.mammoth === true && info.i.sessions === 0, 'token counts came from the page (' + info.counts + ' texts counted by the tokenizer); pdf.js ' + info.i.pdfjs + ' and mammoth are loaded in the worker; no session is left open', info.i);
    ok(info.errs.length === 0, 'the parse worker raised no error');
    ok(external.length === 0, 'no request left this computer (' + requests.length + ' requests, all to ' + ORIGIN + ')', external);
    const app = requests.filter((u) => /\/rag\/vendor\//.test(u)).map((u) => new URL(u).pathname.replace(/^\/rag\/vendor\//, '').split('/').slice(0, 2).join('/'));
    ok(['pdfjs/pdf.worker.min.mjs', 'pdfjs/pdf.min.mjs', 'mammoth/mammoth.browser.min.js'].every((x) => app.includes(x)), 'pdf.js, its worker module and mammoth were read from rag/vendor/ (self-hosted)');
  });

  ok(ran.length === SECTIONS.length && SECTIONS.every((s) => ran.includes(s)), 'every section ran: ' + ran.join(', '));
  const wErr = await ev(() => PH.errors.concat(PH.client.errors));
  ok(pageErrors.length === 0 && consoleErrors.length === 0 && wErr.length === 0, 'no script errors on the page or in the worker', [pageErrors, consoleErrors, wErr]);
  fs.writeFileSync(path.join(OUT, 'parse_reports.json'), JSON.stringify(R, null, 1));
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); if (server) server.kill();
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log('FAIL the test itself: ' + (e && e.stack || e)); process.exit(1); });
