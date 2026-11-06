// Folder search, phase 2: retrieval and the folder permissions (rag/retriever.js, rag/ftsquery.js, the search ops of
// rag/store.worker.js), in headless Chromium.
//   - the searches (made-up vectors and words, SQLite in memory): the folder permission is inside both SQL statements, so a folder
//     the user may not read never comes back, even when it holds the nearest passages; the user still gets their k best; a chosen
//     set of folders only narrows; a revoked folder is gone at once; chunk.get checks again; an unknown user finds nothing; wrong
//     arguments are refused; and what sqlite-vec 0.1.6 does with "in (...)" on its partition key and with LIMIT beside "k = ?"
//   - fusion: Reciprocal Rank Fusion with k = 60, exactly, ties broken by the better single rank, then the lower id
//   - escaping: FTS5's own query language in a question (quotes, NEAR(, column:, {cols}:, *, ^, -, AND, OR, NOT, brackets) is read
//     as words, never as syntax, and never fails
//   - the test corpus with the real reading model (bge-small-en-v1.5): the three folders read for "me"; a second user, "test-b",
//     may not read household_papers (FACTS.json's restricted folder). Recall@5 over the 37 facts (the owner's evaluation 1), no
//     passage of household_papers for test-b on any question, in either search or the fused list (evaluation 3, retrieve()'s
//     part), the facts of the folders test-b may read still found, narrowing to one folder, the time a retrieval takes
//   - reindex (the owner's evaluation 5, with the manual reading that phase 4's scheduler will call): one file added, one changed,
//     one deleted, read once: the index shows each change, and the reading model embedded exactly the new or changed passages
//   python3 rag/test/serve.py 8176 --vendor <the unpacked vendor tree>
//   node rig/t_rag2_retrieve.js http://127.0.0.1:8176/ <out folder> [--quick]      (--quick: without the 4 MB logbook)
//   RAG_WORKERS (1 to 4, 3 when not set): the reading model's workers for the corpus (the app itself uses one, for its memory)
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const { spawn } = require('child_process');
const args = process.argv.slice(2); const QUICK = args.includes('--quick'); const WORKERS = Math.max(1, Math.min(4, +(process.env.RAG_WORKERS || 3))); const [BASE0, OUT] = args.filter((a) => !a.startsWith('--'));
if (!BASE0 || !OUT) { console.log('usage: node rig/t_rag2_retrieve.js <server address> <out folder> [--quick]'); process.exit(2); }
const BASE = BASE0.replace(/\/?$/, '/'); const HARNESS = BASE + 'rag/test/parse_harness.html'; const ORIGIN = new URL(BASE).origin;
fs.mkdirSync(OUT, { recursive: true });
const SRC = path.resolve(__dirname, '..');
let pass = 0, fail = 0, skipped = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d).slice(0, 900) : '')); c ? pass++ : fail++; };
const info = (m) => console.log('     ' + m);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function reachable(url) { try { const r = await fetch(url); return r.ok; } catch (e) { return false; } }
async function ensureServer() {
  if (await reachable(HARNESS)) return null;
  const u = new URL(BASE);
  if (!/^(127\.0\.0\.1|localhost)$/.test(u.hostname)) throw new Error('nothing answers at ' + BASE);
  const vendor = process.env.RAG_VENDOR; if (!vendor) throw new Error('nothing answers at ' + BASE + ' and $RAG_VENDOR is not set');
  const child = spawn('python3', [path.join(SRC, 'rag', 'test', 'serve.py'), u.port || '80', '--vendor', vendor], { stdio: 'ignore' });
  for (let i = 0; i < 40; i++) { if (await reachable(HARNESS)) return child; await sleep(250); }
  child.kill(); throw new Error('the test server did not start');
}

(async () => {
  const server = await ensureServer();
  const b = await pw.chromium.launch(); const ctx = await b.newContext();
  const external = [], pageErrors = [], consoleErrors = [];
  await ctx.route((u) => u.origin !== ORIGIN && !/^(data|blob):/.test(u.protocol), (route) => { external.push(route.request().url()); route.abort(); });
  const p = await ctx.newPage(); p.setDefaultTimeout(0);
  p.on('pageerror', (e) => pageErrors.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 300)); });
  await p.goto(HARNESS); await p.waitForFunction(() => window.PH && window.PH.ready === true, null, { timeout: 120000 });
  const ev = (fn, a) => p.evaluate(fn, a);
  const ran = [];
  const SECTIONS = ['searches and permissions', 'fusion', 'escaping', 'the corpus', 'reindex'];
  const section = async (name, fn) => { try { await fn(); ran.push(name); } catch (e) { ok(false, 'section "' + name + '" ran to its end', String(e && e.stack || e).slice(0, 900)); } };

  // ------------------------------------------------------------------------------------------- searches and permissions
  await section('searches and permissions', async () => {
    const r = await ev(async () => {
      const R = await import('/rag/retriever.js');
      const s = PH.storeModule.createStore({ debug: true }); await s.open({ vfs: 'memory' }); window.SYN = s;
      const me = (await s.principal.ensure({ name: 'me' })).id, tb = (await s.principal.ensure({ name: 'test-b' })).id;
      const A = await s.folder.add({ name: 'A', path: '/A' }), B = await s.folder.add({ name: 'B', path: '/B' }), C = await s.folder.add({ name: 'C', path: '/C' });
      await s.acl.grant({ folderId: A.id, principalId: me }); await s.acl.grant({ folderId: C.id, principalId: me }); await s.acl.grant({ folderId: B.id, principalId: tb });
      const D = 384; const unit = (i, t) => { const v = new Float32Array(D); v[i % D] = 1; v[(i + 1) % D] = t; const n = Math.hypot(...v); for (let j = 0; j < D; j++) v[j] /= n; return v; };
      // B's passages are the nearest to the question and the only ones with the word "zebra"; A's and C's are further, at known steps
      const mk = (tag, n, near) => Array.from({ length: n }, (_, i) => ({ chunk_index: i, heading_path: tag + ' notes', char_start: i * 10, char_end: i * 10 + 9, page: null,
        content_hash: tag + '-' + i, text: (near ? 'zebra crossing ' : 'plain words ') + tag + ' passage ' + i, embedding: near ? unit(0, 0.01 + i * 0.001) : unit(0, 0.5 + i * 0.05 + (tag === 'C' ? 0.025 : 0)) }));
      await s.file.replace({ folderId: A.id, path: 'a.txt', size: 1, mtime: 1, contentHash: 'a', model: 'm', chunks: mk('A', 15, false) });
      await s.file.replace({ folderId: B.id, path: 'b.txt', size: 1, mtime: 1, contentHash: 'b', model: 'm', chunks: mk('B', 15, true) });
      await s.file.replace({ folderId: C.id, path: 'c.txt', size: 1, mtime: 1, contentHash: 'c', model: 'm', chunks: mk('C', 15, false) });
      const q = unit(0, 0); const qv = () => new Float32Array(q);
      const out = { ids: { A: A.id, B: B.id, C: C.id }, me, tb };
      out.find = [await s.principal.find({ name: 'me' }), await s.principal.find({ name: 'nobody' })];
      out.vecMe = (await s.search.vec({ embedding: qv(), principalId: me, k: 20 })).hits;
      out.vecTb = (await s.search.vec({ embedding: qv(), principalId: tb, k: 20 })).hits;
      out.vecMeC = (await s.search.vec({ embedding: qv(), principalId: me, k: 20, folderIds: [C.id] })).hits;
      out.vecMeB = (await s.search.vec({ embedding: qv(), principalId: me, k: 20, folderIds: [B.id] })).hits;
      out.ftsMe = await s.search.fts({ query: 'zebra crossing', principalId: me, k: 20 });
      out.ftsTb = await s.search.fts({ query: 'zebra crossing', principalId: tb, k: 20 });
      out.ftsMeWords = await s.search.fts({ query: 'plain passage', principalId: me, k: 20 });
      out.ftsEmpty = await s.search.fts({ query: '  ¿?! ', principalId: me, k: 20 });
      const bIds = out.vecTb.map((h) => h.id);
      out.getMeB = await s.chunk.get({ ids: bIds.slice(0, 3), principalId: me });
      out.getTbB = await s.chunk.get({ ids: bIds.slice(0, 3).concat(out.vecMe.slice(0, 2).map((h) => h.id)), principalId: tb });
      // what sqlite-vec 0.1.6 does: "in (...)" on the partition key gives the k nearest of each folder; LIMIT beside "k = ?" is refused
      const qb = new Uint8Array(qv().buffer);
      out.perFolder = (await s.debug.sql({ sql: 'select folder_id from chunks_vec where embedding match ? and k = 5 and folder_id in (select folder_id from folder_acl where principal_id = ?)', bind: [qb, me] })).map((o) => o.folder_id);
      try { await s.debug.sql({ sql: 'select rowid from chunks_vec where embedding match ? and k = 5 order by distance limit 5', bind: [qb] }); out.limitErr = null; } catch (e) { out.limitErr = e.message; }
      // retrieve() itself, with a stand-in reading model that gives the question the vector above
      const emb = { embed: async (a) => a.texts.map(() => qv()) };
      out.retMe = await R.retrieve({ store: s, embedder: emb }, 'zebra crossing', 'me', { k: 5 });
      out.retTb = await R.retrieve({ store: s, embedder: emb }, 'zebra crossing', 'test-b', { k: 5 });
      out.retNobody = await R.retrieve({ store: s, embedder: emb }, 'zebra crossing', 'nobody');
      out.retEmpty = await R.retrieve({ store: s, embedder: emb }, '   ', 'me');
      // refused arguments
      const err = async (fn) => { try { await fn(); return null; } catch (e) { return e.code || e.message; } };
      out.bad = {
        k0: await err(() => s.search.vec({ embedding: qv(), principalId: me, k: 0 })), k500: await err(() => s.search.fts({ query: 'x', principalId: me, k: 500 })),
        folders: await err(() => s.search.fts({ query: 'x', principalId: me, folderIds: 'all' })), folderNum: await err(() => s.search.vec({ embedding: qv(), principalId: me, folderIds: [1, 'x'] })),
        who: await err(() => s.search.fts({ query: 'x' })), dims: await err(() => s.search.vec({ embedding: new Float32Array(10), principalId: me })),
        query: await err(() => s.search.fts({ query: { match: 'x' }, principalId: me })), ids: await err(() => s.chunk.get({ ids: 'x', principalId: me })),
        retK: await err(() => R.retrieve({ store: s, embedder: emb }, 'x', 'me', { k: 0 })), retUser: await err(() => R.retrieve({ store: s, embedder: emb }, 'x', '')),
      };
      // a folder taken away is gone from the next search
      await s.acl.revoke({ folderId: C.id, principalId: me });
      out.afterRevoke = (await s.search.vec({ embedding: qv(), principalId: me, k: 20 })).hits.map((h) => h.folderId);
      out.afterRevokeFts = (await s.search.fts({ query: 'plain passage', principalId: me, k: 20 })).hits.map((h) => h.folderId);
      await s.acl.grant({ folderId: C.id, principalId: me });
      return out; });
    const { A, B, C } = r.ids;
    ok(r.find[0] && r.find[0].id === r.me && r.find[1] === null, 'principal.find names a known user and makes no new one for an unknown name', r.find);
    ok(r.vecMe.length === 20 && r.vecMe.every((h) => h.folderId === A || h.folderId === C) && r.vecMe.some((h) => h.folderId === A) && r.vecMe.some((h) => h.folderId === C),
      'the vector search for "me" gives its full 20 from folders A and C, though folder B (not theirs) holds the 15 nearest passages', r.vecMe.map((h) => h.folderId));
    ok(r.vecMe.every((h, i) => i === 0 || h.distance >= r.vecMe[i - 1].distance) && r.vecMe.every((h, i) => h.rank === i + 1), 'its hits are the nearest first, ranked 1 to 20');
    ok(r.vecTb.length === 15 && r.vecTb.every((h) => h.folderId === B), 'the vector search for "test-b" gives folder B\'s 15 passages only', r.vecTb.map((h) => h.folderId));
    ok(r.vecMeC.length === 15 && r.vecMeC.every((h) => h.folderId === C) && r.vecMeB.length === 0, 'a chosen set of folders narrows: C alone gives C\'s 15; choosing B, which "me" may not read, gives nothing (it cannot widen)', [r.vecMeC.length, r.vecMeB.length]);
    ok(r.ftsMe.hits.length === 0 && r.ftsTb.hits.length === 15 && r.ftsTb.hits.every((h) => h.folderId === B), 'the text search for "zebra crossing" finds nothing for "me" (the words are only in B) and B\'s 15 for "test-b"', [r.ftsMe.hits.length, r.ftsTb.hits.length]);
    ok(r.ftsMeWords.hits.length === 20 && r.ftsMeWords.hits.every((h) => h.folderId === A || h.folderId === C) && r.ftsMeWords.hits.every((h, i) => i === 0 || h.score >= r.ftsMeWords.hits[i - 1].score),
      'the text search for "plain passage" gives "me" 20 passages of A and C, best bm25 first', r.ftsMeWords.hits.slice(0, 3));
    ok(r.ftsEmpty.match === null && r.ftsEmpty.hits.length === 0, 'a question with no word in it makes no text search and fails nothing', r.ftsEmpty);
    ok(r.getMeB.length === 0 && r.getTbB.length === 3 && r.getTbB.every((c) => c.folderId === B && c.filePath === 'b.txt' && c.folderName === 'B' && typeof c.text === 'string'),
      'chunk.get gives "me" none of B\'s passages even when asked by id, and "test-b" only B\'s, with what a citation needs', [r.getMeB.length, r.getTbB.map((c) => c.folderId)]);
    ok(r.perFolder.length === 10 && r.perFolder.filter((f) => f === A).length === 5 && r.perFolder.filter((f) => f === C).length === 5,
      'checked in sqlite-vec 0.1.6: "folder_id in (select ... from folder_acl ...)" runs inside the vector search, the k nearest of each allowed folder', r.perFolder);
    ok(typeof r.limitErr === 'string' && /LIMIT/.test(r.limitErr), 'checked: sqlite-vec 0.1.6 refuses LIMIT beside "k = ?", so the store keeps the k nearest of them all itself', r.limitErr);
    ok(r.retMe.passages.length === 5 && r.retMe.passages.every((x) => x.folderId === A || x.folderId === C) && r.retMe.fts.length === 0 && r.retMe.vec.length === 20,
      'retrieve() for "me": the best 5, all from A and C', r.retMe.passages.map((x) => x.folderId));
    ok(r.retTb.passages.length === 5 && r.retTb.passages.every((x) => x.folderId === B && x.ftsRank && x.vecRank) && r.retTb.match === '"zebra" OR "crossing"',
      'retrieve() for "test-b": the best 5, all from B, each found by both searches', r.retTb.passages.map((x) => [x.folderId, x.ftsRank, x.vecRank]));
    ok(r.retNobody.passages.length === 0 && r.retNobody.reason === 'NO_SUCH_USER' && r.retEmpty.passages.length === 0 && r.retEmpty.reason === 'EMPTY_QUESTION', 'an unknown user and an empty question find nothing, and say why', [r.retNobody.reason, r.retEmpty.reason]);
    ok(Object.values(r.bad).every((v) => v === 'BAD_ARGS'), 'wrong arguments are refused (k of 0 or 500, folders that are not ids, no user, a vector of the wrong size, a question that is not text, ids that are not a list)', r.bad);
    ok(r.afterRevoke.length === 15 && r.afterRevoke.every((f) => f === A) && r.afterRevokeFts.every((f) => f === A), 'a folder taken away from "me" is gone from the very next search, in both', [r.afterRevoke.length, r.afterRevokeFts.length]);
  });

  // ------------------------------------------------------------------------------------------- fusion
  await section('fusion', async () => {
    const r = await ev(async () => { const R = await import('/rag/retriever.js');
      return { a: R.rrf([[1, 2, 3], [3, 1, 4]], 60), tie: R.rrf([[7], [2]], 60).map((x) => x.id), dup: R.rrf([[5, 5, 6]], 60), k: R.RRF_K, per: R.PER_LIST, top: R.TOP,
        tieRank: R.rrf([[1, 2], [3, 4], [2, 1]], 60).map((x) => [x.id, +x.score.toFixed(6), x.bestRank]) }; });
    const near = (x, y) => Math.abs(x - y) < 1e-12;
    const s = Object.fromEntries(r.a.map((x) => [x.id, x.score]));
    ok(r.k === 60 && r.per === 20 && r.top === 5, 'the constants are the owner\'s: RRF k = 60, 20 from each search, the best 5', [r.k, r.per, r.top]);
    ok(near(s[1], 1 / 61 + 1 / 62) && near(s[3], 1 / 63 + 1 / 61) && near(s[2], 1 / 62) && near(s[4], 1 / 63) && r.a.map((x) => x.id).join() === '1,3,2,4',
      'a passage scores the sum of 1 / (60 + its rank) over the lists it is in: 1, 3, 2, 4', r.a.map((x) => [x.id, x.score]));
    ok(r.tie.join() === '2,7', 'equal scores and equal best ranks go to the lower id', r.tie);
    ok(r.dup.length === 2 && near(r.dup[0].score, 1 / 61), 'an id twice in one list counts once, at its better rank', r.dup);
    ok(r.tieRank[0][0] === 1 && r.tieRank[1][0] === 2, 'in three lists, two passages found twice outrank one found once', r.tieRank);
  });

  // ------------------------------------------------------------------------------------------- escaping
  await section('escaping', async () => {
    const r = await ev(async () => {
      const F = await import('/rag/ftsquery.js'); const s = window.SYN; const me = (await s.principal.find({ name: 'me' })).id, tb = (await s.principal.find({ name: 'test-b' })).id;
      const qs = ['zebra"', '"zebra', 'NEAR(zebra crossing', 'NEAR(zebra crossing, 2)', 'text: zebra', 'heading_path : zebra', '{text heading_path}: zebra', 'zebra*', '^zebra', '-zebra', 'zebra AND', 'OR', 'NOT zebra',
        ')(', 'zebra) OR (crossing', "zebra'; drop table chunks; --", 'folder_id:2 zebra', '"""', '*', 'zebra + crossing', 'z'.repeat(80) + ' zebra'];
      const out = [];
      for (const q of qs) { let hits = null, err = null, match = null; try { const res = await s.search.fts({ query: q, principalId: tb, k: 20 }); hits = res.hits.length; match = res.match; } catch (e) { err = e.message; }
        let mine = null; try { mine = (await s.search.fts({ query: q, principalId: me, k: 20 })).hits.filter((h) => h.folderId === 2).length; } catch (e) { mine = 'ERR ' + e.message; }
        out.push({ q: q.slice(0, 40), hits, err, match, mine }); }
      return { out, words: F.ftsWords('Où est la clé? Ça coûte 3,50 € — naïve café'), max: F.ftsWords(Array.from({ length: 50 }, (_, i) => 'w' + i).join(' ')).length, tables: await s.stats() }; });
    ok(r.out.every((x) => x.err === null), 'none of 21 questions written in FTS5\'s own query language fails', r.out.filter((x) => x.err));
    ok(r.out.filter((x) => /zebra/i.test(x.q) && !/^z{80}/.test(x.q)).every((x) => x.hits === 15), 'each question holding the word "zebra" finds B\'s 15 zebra passages for "test-b", whatever operators surround it', r.out.map((x) => [x.q, x.hits]));
    ok(r.out.every((x) => x.mine === 0), 'and none of them reaches folder B for "me": no column filter or operator gets past the folder rule', r.out.map((x) => [x.q, x.mine]));
    ok(r.out.every((x) => x.match === null || /^"[^"]*"( OR "[^"]*")*$/.test(x.match)), 'every MATCH sent is quoted words joined by OR, nothing else', r.out.map((x) => x.match));
    ok(r.tables.chunks === 45 && r.tables.chunks_fts === 45, 'the "drop table" question changed nothing (45 passages, 45 text rows)', r.tables);
    ok(r.words.join(' ') === 'Où est la clé Ça coûte 3 50 naïve café' && r.max === 32, 'words of any script are kept whole (accents and all), at most 32 a question', [r.words, r.max]);
  });

  // ------------------------------------------------------------------------------------------- the corpus, with the real model
  let corpus = null;
  await section('the corpus', async () => {
    const files = await ev(async () => { const e = new PH.embedderModule.Embedder(); return e.modelFiles(); });
    if (!files.installed) { skipped++; info('SKIP the corpus: the model files are not in rag/vendor/models'); return; }
    const t0 = Date.now();
    const timer = setInterval(() => info('... still reading the corpus, ' + Math.round((Date.now() - t0) / 1000) + ' s'), 60000);
    let r;
    try {
      r = await ev(async ({ QUICK, WORKERS }) => {
        const R = await import('/rag/retriever.js'); const E = PH.embedderModule, S = PH.storeModule; PH.bridge.folders.clear(); PH.installBridge();
        const store = S.createStore({ debug: true }), embedder = E.createEmbedder({ workers: WORKERS }); PH.real = { store, embedder };
        await store.open({ vfs: 'memory' }); await embedder.init();
        const me = (await store.principal.ensure({ name: 'me' })).id, tb = (await store.principal.ensure({ name: 'test-b' })).id;
        const facts = (await PH.loadFacts()).facts; const restricted = PH.facts.restricted_folder;
        const folders = {}; const ix = PH.createIndexer({ store, embedder }); const read = {};
        for (const name of PH.facts.folders) {
          const { path } = await PH.loadCorpusFolder(name, QUICK ? { only: (rel) => !/ship_logbooks/.test(rel) } : {});
          const f = await store.folder.add({ name, path }); folders[name] = f.id;
          await store.acl.grant({ folderId: f.id, principalId: me });
          if (name !== restricted) await store.acl.grant({ folderId: f.id, principalId: tb });
          const t1 = performance.now(); const sum = await ix.indexFolder(f.id); read[name] = { files: sum.files, chunks: sum.chunks, s: Math.round(performance.now() - t1) / 1000 };
        }
        window.CORPUS = { store, embedder, ix, folders, me, tb };
        const stats = await store.stats();
        const ctx = { store, embedder }; const rows = []; const times = [];
        for (const f of facts) {
          if (QUICK && /ship_logbooks/.test(f.file)) continue;
          const n = PH.norm(f.needle);
          const t = performance.now(); const a = await R.retrieve(ctx, f.question, 'me', { k: 5 }); times.push(performance.now() - t);
          const hitMe = a.passages.findIndex((x) => PH.norm(x.text).includes(n));
          const bRes = await R.retrieve(ctx, f.question, 'test-b', { k: 5 });
          const hitB = bRes.passages.findIndex((x) => PH.norm(x.text).includes(n));
          rows.push({ id: f.id, folder: f.folder, hitMe, fromFile: hitMe >= 0 ? a.passages[hitMe].filePath === f.file : null,
            meFolders: a.passages.map((x) => x.folderId), bN: bRes.passages.length, hitB,
            bFolders: bRes.passages.map((x) => x.folderId), bFts: bRes.fts.map((h) => h.folderId), bVec: bRes.vec.map((h) => h.folderId) });
        }
        // narrowing: "me", lab_notes only
        const lab = await R.retrieve(ctx, 'incubator temperature log', 'me', { k: 5, folderIds: [folders.lab_notes] });
        times.sort((x, y) => x - y);
        return { read, stats, rows, folders, restrictedId: folders[restricted], restricted, lab: lab.passages.map((x) => x.folderId), labId: folders.lab_notes,
          median: Math.round(times[Math.floor(times.length / 2)]), slowest: Math.round(times[times.length - 1]) };
      }, { QUICK, WORKERS });
    } finally { clearInterval(timer); }
    corpus = r;
    info('read: ' + Object.entries(r.read).map(([k, v]) => k + ' ' + v.chunks + ' passages in ' + v.s + ' s').join('; ') + ' (' + r.stats.chunks + ' passages in all)');
    const total = r.rows.length, found = r.rows.filter((x) => x.hitMe >= 0).length, recall = found / total;
    ok(recall >= 0.8, 'Recall@5 for "me" over the ' + total + ' facts of the corpus: ' + found + ' of ' + total + ' (' + recall.toFixed(3) + '; the owner\'s bar is 0.8)', r.rows.filter((x) => x.hitMe < 0).map((x) => x.id));
    info('found first: ' + r.rows.filter((x) => x.hitMe === 0).length + ', in the first three: ' + r.rows.filter((x) => x.hitMe >= 0 && x.hitMe < 3).length + '; median retrieval ' + r.median + ' ms, slowest ' + r.slowest + ' ms');
    ok(r.rows.filter((x) => x.hitMe >= 0).every((x) => x.fromFile), 'each fact found is found in the file FACTS.json names for it', r.rows.filter((x) => x.hitMe >= 0 && !x.fromFile).map((x) => x.id));
    const restrictedRows = r.rows.filter((x) => x.folder === r.restricted);
    ok(restrictedRows.length === 10 && r.rows.every((x) => !x.bFolders.includes(r.restrictedId) && !x.bFts.includes(r.restrictedId) && !x.bVec.includes(r.restrictedId)),
      'evaluation 3 (retrieve\'s part): "test-b", who may not read ' + r.restricted + ', gets none of its passages for any of the ' + total + ' questions, in the text search, the vector search or the fused 5',
      r.rows.filter((x) => x.bFolders.includes(r.restrictedId) || x.bFts.includes(r.restrictedId) || x.bVec.includes(r.restrictedId)).map((x) => x.id));
    ok(restrictedRows.every((x) => x.hitB < 0), 'and so none of the 10 questions answerable only from ' + r.restricted + ' finds its answer for "test-b"', restrictedRows.map((x) => [x.id, x.hitB]));
    ok(r.rows.every((x) => x.bN === 5), '"test-b" still gets 5 passages for every question, from the folders they may read', r.rows.filter((x) => x.bN !== 5).map((x) => [x.id, x.bN]));
    const open = r.rows.filter((x) => x.folder !== r.restricted), openB = open.filter((x) => x.hitB >= 0).length;
    ok(openB / open.length >= 0.8, 'the facts of the folders "test-b" may read are found for them too: ' + openB + ' of ' + open.length, open.filter((x) => x.hitB < 0).map((x) => x.id));
    ok(r.lab.length === 5 && r.lab.every((f) => f === r.labId), 'given lab_notes alone, "me" gets 5 passages of lab_notes only', r.lab);
    info('the corpus took ' + Math.round((Date.now() - t0) / 1000) + ' s in all');
  });

  // ------------------------------------------------------------------------------------------- reindex (evaluation 5)
  await section('reindex', async () => {
    if (!corpus) { skipped++; info('SKIP reindex: the corpus was not read'); return; }
    const r = await ev(async () => {
      const R = await import('/rag/retriever.js'); const { store, embedder, ix, folders, me } = window.CORPUS; const fid = folders.household_papers;
      const path = '/corpus/household_papers'; const files = PH.bridge.folders.get(path); const rels = Array.from(files.keys()).sort();
      const sql = async (q, bind) => store.debug.sql({ sql: q, bind });
      const before = new Set((await sql('select distinct content_hash as h from chunks where folder_id = ?', [fid])).map((o) => o.h));
      const cacheBefore = new Set((await sql('select hash as h from emb_cache')).map((o) => o.h));
      const filesBefore = (await store.file.list({ folderId: fid })).map((f) => f.path).sort();
      // one file added, one changed (a new paragraph at its end), one deleted
      const changeRel = rels.find((x) => /\.(md|txt)$/.test(x) && !/\//.test(x)) || rels.find((x) => /\.(md|txt)$/.test(x));
      const deleteRel = rels.find((x) => x !== changeRel && /\.(md|txt|html|json|csv)$/.test(x));
      const added = 'notes/garden_shed_inventory.md';
      PH.setFile(path, added, '# Garden shed inventory\n\nThe shed holds a blue wheelbarrow with a puncture-proof tyre, bought for 64 pounds in March.\n', 5000);
      const old = new TextDecoder().decode(files.get(changeRel).bytes);
      PH.setFile(path, changeRel, old + '\n\nAddendum: the chimney sweep comes every second Thursday of October and charges 85 pounds.\n', 5001);
      PH.removeFile(path, deleteRel);
      const deletedText = (await sql('select text from chunks where folder_id = ? and file_path = ? limit 1', [fid, deleteRel]))[0];
      const e0 = (await embedder.info()).embedded;
      const sum = await ix.indexFolder(fid);
      const e1 = (await embedder.info()).embedded;
      const after = (await sql('select distinct content_hash as h from chunks where folder_id = ?', [fid])).map((o) => o.h);
      const fresh = after.filter((h) => !before.has(h) && !cacheBefore.has(h));
      const filesAfter = (await store.file.list({ folderId: fid })).map((f) => f.path).sort();
      const ctx = { store, embedder };
      const qAdd = await R.retrieve(ctx, 'What did the blue wheelbarrow cost?', 'me', { k: 5 });
      const qChg = await R.retrieve(ctx, 'How much does the chimney sweep charge?', 'me', { k: 5 });
      const qDel = deletedText ? await R.retrieve(ctx, deletedText.text.slice(0, 200), 'me', { k: 5 }) : null;
      const counts = await store.stats();
      return { changeRel, deleteRel, added, sum: { files: sum.files, chunks: sum.chunks, embedded: sum.embedded, reused: sum.reused }, embedded: e1 - e0, fresh: fresh.length,
        hasAdded: filesAfter.includes(added) && !filesBefore.includes(added), goneDeleted: filesBefore.includes(deleteRel) && !filesAfter.includes(deleteRel),
        addFound: qAdd.passages.some((x) => x.filePath === added && /64 pounds/.test(x.text)), chgFound: qChg.passages.some((x) => x.filePath === changeRel && /85 pounds/.test(x.text)),
        delGone: qDel ? qDel.passages.every((x) => x.filePath !== deleteRel) : null, tables: [counts.chunks, counts.chunks_fts, counts.chunks_vec] };
    });
    ok(r.hasAdded && r.goneDeleted, 'after one reading the index has the added file (' + r.added + ') and not the deleted one (' + r.deleteRel + ')', r);
    ok(r.addFound && r.chgFound, 'the added file\'s words and the changed file\'s new paragraph (' + r.changeRel + ') are found by retrieval', [r.addFound, r.chgFound]);
    ok(r.delGone === true, 'no passage of the deleted file comes back, even asked in its own words', r.delGone);
    ok(r.embedded === r.fresh && r.fresh > 0, 'the reading model embedded exactly the new or changed passages: ' + r.embedded + ' embedded, ' + r.fresh + ' new or changed (the unchanged ones were reused)', r);
    ok(r.tables[0] === r.tables[1] && r.tables[1] === r.tables[2], 'passages, text rows and vectors still agree (' + r.tables.join(', ') + ')', r.tables);
  });

  ok(ran.length === SECTIONS.length && SECTIONS.every((s) => ran.includes(s)), 'every section ran: ' + ran.join(', ') + (skipped ? ' (' + skipped + ' skipped)' : ''));
  const wErr = await ev(() => PH.errors.concat(window.SYN ? window.SYN.errors : [], PH.real ? PH.real.store.errors.concat(PH.real.embedder.errors) : []));
  ok(pageErrors.length === 0 && consoleErrors.length === 0 && wErr.length === 0, 'no script errors on the page or in a worker', [pageErrors, consoleErrors, wErr]);
  ok(external.length === 0, 'no request left this computer', external);
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); if (server) server.kill();
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
