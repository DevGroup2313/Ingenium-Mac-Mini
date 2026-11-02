// Folder search, phase 1: the indexer (rag/indexer.js) and the bridge wrapper (rag/folders.js), in headless Chromium.
//   - folders.js: the five bridge calls (rag/DESIGN.md section 6), files read in pieces of at most 1 MB, errors the app reports, a file
//     that changes while it is read
//   - the indexer against exact stand-ins for the store and the embedder (the same calls and shapes as rag/store.js and rag/embedder.js):
//     every file of a folder read, parsed in the worker, embedded and written in ONE store.file.replace; progress events; a second run
//     leaves unchanged files alone; a changed file embeds only its new or changed chunks (the rest are reused by content hash); a file
//     added, a file removed, force; one file failing is reported and the rest go on; a fatal store error stops the run; a drive that is
//     not there takes nothing out of the index; stopping keeps what is embedded
//   - the indexer against the REAL store (SQLite in memory) and the REAL embedder (bge-small-en-v1.5, from rag/vendor/models), when the
//     model files are present: the household folder indexed, the rows in every table, and each fact's question finds its chunk first
//   python3 rag/test/serve.py 8176 --vendor <the unpacked vendor tree>        (rag/ = source/rag, rag/vendor = the vendor tree)
//   node rig/t_rag1_index.js http://127.0.0.1:8176/ <out folder>
// If nothing answers at the address and it is on this computer, the test starts that server itself ($RAG_VENDOR) and stops it at the end.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const { spawn } = require('child_process');
const [BASE0, OUT] = process.argv.slice(2);
if (!BASE0 || !OUT) { console.log('usage: node rig/t_rag1_index.js <server address> <out folder>'); process.exit(2); }
const BASE = BASE0.replace(/\/?$/, '/'); const HARNESS = BASE + 'rag/test/parse_harness.html'; const ORIGIN = new URL(BASE).origin;
fs.mkdirSync(OUT, { recursive: true });
const SRC = path.resolve(__dirname, '..'); const FIX = path.join(SRC, 'rag', 'fixtures');
let pass = 0, fail = 0, skipped = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d).slice(0, 700) : '')); c ? pass++ : fail++; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function reachable(url) { try { const r = await fetch(url); return r.ok; } catch (e) { return false; } }
async function ensureServer() {
  if (await reachable(HARNESS)) return null;
  const u = new URL(BASE);
  if (!/^(127\.0\.0\.1|localhost)$/.test(u.hostname)) throw new Error('nothing answers at ' + BASE);
  const vendor = process.env.RAG_VENDOR || '/tmp/claude-0/-home-user/f70d4091-5e3f-5b2b-9e4a-4f66b5694ecf/scratchpad/rag0/vendor';
  const child = spawn('python3', [path.join(SRC, 'rag', 'test', 'serve.py'), u.port || '80', '--vendor', vendor], { stdio: 'ignore' });
  for (let i = 0; i < 40; i++) { if (await reachable(HARNESS)) return child; await sleep(250); }
  child.kill(); throw new Error('the test server did not start');
}

(async () => {
  const server = await ensureServer();
  const factsDoc = JSON.parse(fs.readFileSync(path.join(FIX, 'FACTS.json'), 'utf8')); const FACTS = factsDoc.facts;
  const b = await pw.chromium.launch(); const ctx = await b.newContext();
  const external = [], requests = [], consoleErrors = [], pageErrors = [];
  await ctx.route((u) => u.origin !== ORIGIN && !/^(data|blob):/.test(u.protocol), (route) => { external.push(route.request().url()); route.abort(); });
  ctx.on('request', (r) => requests.push(r.url()));
  const p = await ctx.newPage();
  p.on('pageerror', (e) => pageErrors.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  const ev = (fn, arg) => p.evaluate(fn, arg);
  await p.goto(HARNESS); await p.waitForFunction(() => window.PH && window.PH.ready === true, null, { timeout: 30000 });
  await ev(() => PH.loadTokenizer()); await ev(() => PH.loadFacts());

  const SECTIONS = ['bridge', 'first run', 'second run', 'changed file', 'added and removed', 'failures', 'safeguards', 'stopping', 'real store and embedder'];
  const ran = [];
  const section = async (name, fn) => { try { await fn(); ran.push(name); } catch (e) { ok(false, 'section "' + name + '" stopped: ' + (e && e.stack || e)); } };

  // ------------------------------------------------------------------------------------------------------- bridge
  await section('bridge', async () => {
    const r = await ev(async () => {
      const F = PH.folders; const out = {};
      out.noBridge = F.available(); delete window.pywebview;
      PH.installBridge(); out.bridge = F.available(); out.ready = await F.whenReady(100);
      const rnd = new Uint8Array(2.5 * 1048576 + 17); for (let i = 0; i < rnd.length; i++) rnd[i] = (i * 31 + (i >> 8) * 7) & 255;
      PH.bridge.folders.clear(); PH.setFile('/f', 'dir/big.bin.txt', rnd, 5555); PH.setFile('/f', 'a.txt', 'hello', 1); PH.bridge.calls.length = 0;
      out.list = await F.listFiles('/f'); out.cancelled = await F.chooseFolder(); out.chosen = await F.chosenFolders();
      const pieces = []; let total = 0, same = true;
      for await (const u8 of F.readPieces('/f', 'dir/big.bin.txt')) { pieces.push(u8.length); for (let i = 0; i < u8.length; i += 4099) if (u8[i] !== rnd[total + i]) same = false; total += u8.length; structuredClone(u8, { transfer: [u8.buffer] }); }   // the parse client transfers each piece: its buffer is gone when the generator goes on (1 November 2026: that read 0 bytes and ended the file after one piece)
      out.pieces = pieces; out.total = total; out.same = same;
      out.reads = PH.bridge.calls.filter((c) => c[0] === 'rag_read').map((c) => [c[3], c[4]]);
      out.b64 = Array.from(F.b64ToBytes(btoa('ÿ\u0000abc'))); out.empty = F.b64ToBytes('').length;
      const err = async (fn) => { try { await fn(); return ['none', 'none', 'no error']; } catch (e) { return [e.name, e.code, e.message]; } };
      out.badList = await err(() => F.listFiles('/nowhere')); out.badRead = await err(async () => { for await (const x of F.readPieces('/f', 'missing.txt')) { /* none */ } });
      const api = window.pywebview.api; let n = 0;
      api.rag_read = async () => (n++ === 0 ? { ok: true, data: btoa('0123456789'), size: 20, eof: false } : { ok: true, data: '', size: 20, eof: true });
      out.changed = await err(async () => { for await (const x of F.readPieces('/f', 'a.txt')) { /* none */ } });
      const ac = new AbortController(); ac.abort(); PH.installBridge();
      out.aborted = await err(async () => { for await (const x of F.readPieces('/f', 'a.txt', { signal: ac.signal })) { /* none */ } });
      const sav = window.pywebview; delete window.pywebview; out.none = await err(() => F.listFiles('/f')); window.pywebview = sav;
      out.forget = await F.forgetFolder('/f'); out.after = (await F.chosenFolders()).length;
      return out;
    });
    ok(r.noBridge === false && r.bridge === true && r.ready === true, 'available() is true only where the app\'s bridge (window.pywebview.api.rag_list and rag_read) is');
    ok(JSON.stringify(r.list.map((f) => [f.rel, f.size, f.mtime])) === JSON.stringify([['dir/big.bin.txt', 2.5 * 1048576 + 17, 5555], ['a.txt', 5, 1]]) && r.cancelled.ok === false && r.cancelled.cancelled === true && r.chosen.length === 1,
      'listFiles gives {rel, size, mtime}; chooseFolder returns {ok: false, cancelled: true} when the dialog is closed; chosenFolders lists the folders', r.list);
    ok(JSON.stringify(r.pieces) === JSON.stringify([1048576, 1048576, 524288 + 17]) && r.total === 2.5 * 1048576 + 17 && r.same, 'a 2.5 MB file is read in pieces of 1 MiB, 1 MiB and the rest, byte for byte', r.pieces);
    ok(r.reads.length === 3 && r.reads.every(([off, len]) => len <= 1048576) && JSON.stringify(r.reads.map((x) => x[0])) === JSON.stringify([0, 1048576, 2097152]), 'rag_read is asked for at most 1 MB at a time, at the offsets 0, 1 MiB, 2 MiB', r.reads);
    ok(JSON.stringify(r.b64) === '[255,0,97,98,99]' && r.empty === 0, 'base64 is decoded to bytes');
    ok(r.badList[1] === 'BRIDGE' && /not available/.test(r.badList[2]) && /no such file/.test(r.badRead[2]), "an {ok: false, error} from the app rejects with the app's own words", [r.badList, r.badRead]);
    ok(r.changed[1] === 'CHANGED', 'a file whose size changes while it is read rejects (CHANGED)', r.changed);
    ok(r.aborted[0] === 'AbortError', 'a read stops between pieces when its AbortSignal has fired', r.aborted);
    ok(r.none[1] === 'NO_BRIDGE', 'without the bridge every call rejects with NO_BRIDGE', r.none);
    ok(r.forget.ok === true && r.after === 0, 'forgetFolder makes the app forget the folder');
  });

  // ------------------------------------------------------------------------------------------------------ first run
  await section('first run', async () => {
    const r = await ev(async () => {
      PH.installBridge(); PH.bridge.folders.clear();
      const { path, files } = await PH.loadCorpusFolder('household_papers');
      const store = PH.fakeStore(), emb = PH.fakeEmbedder(); const folder = await store.folder.add({ name: 'household_papers', path });
      const ix = PH.createIndexer({ store, embedder: emb }); const events = [];
      const t0 = performance.now(); const sum = await ix.indexFolder(folder.id, { onProgress: (e) => events.push(e) }); const ms = performance.now() - t0;
      window.SC = { store, emb, ix, folder, path, events };
      // what the parse worker gives for each file, to compare with what was stored
      const expect = {}; for (const [rel, f] of PH.bridge.folders.get(path)) { const res = await PH.parseBytes(f.bytes, rel.split('.').pop(), { slim: true }); expect[rel] = res.chunks.map((c) => c.content_hash); }
      const stored = {}; for (const f of await store.file.list({ folderId: folder.id })) stored[f.path] = store.chunks.get(f.id).map((c) => c.content_hash);
      const allChunks = [...store.chunks.values()].flat(); const fields = ['chunk_index', 'heading_path', 'char_start', 'char_end', 'page', 'content_hash', 'text', 'embedding'];
      const hashes = allChunks.map((c) => c.content_hash);
      return { files, sum, ms, expectOk: Object.keys(expect).every((k) => JSON.stringify(expect[k]) === JSON.stringify(stored[k])) && Object.keys(stored).length === files,
        chunks: allChunks.length, distinct: new Set(hashes).size, embedded: emb.embedded, batches: emb.calls, fieldsOk: allChunks.every((c) => fields.every((k) => k in c) && Object.keys(c).length === fields.length && c.embedding.length === 384),
        replaces: store.calls.filter((c) => c[0] === 'file.replace').length, touches: store.calls.filter((c) => c[0] === 'folder.touch').length, lookups: store.calls.filter((c) => c[0] === 'emb.lookup').length,
        kinds: events.map((e) => e.event), stages: [...new Set(events.filter((e) => e.event === 'file-stage').map((e) => e.stage))], first: events[0], last: events[events.length - 1].event,
        lastIdx: folder.id, touched: store.folders[0].lastIndexedAt > Date.now() - 60000 };
    });
    ok(r.sum.files.total === r.files && r.sum.files.indexed === r.files && r.sum.files.failed === 0 && r.sum.files.skipped === 0, 'the first run reads all ' + r.files + ' files of the household folder: ' + JSON.stringify(r.sum.files), r.sum);
    ok(r.expectOk, 'each file is stored with exactly the chunks (content hashes, in order) the parse worker gives for its bytes');
    ok(r.sum.chunks === r.chunks && r.chunks > 40 && r.fieldsOk, r.chunks + ' chunks stored, each with chunk_index, heading_path, char_start, char_end, page, content_hash, text and a Float32Array(384) embedding, and nothing more');
    ok(r.replaces === r.files && r.touches === 1, 'each file went in with ONE store.file.replace (' + r.replaces + ' calls), and the folder was marked indexed once');
    ok(r.embedded === r.distinct && r.sum.embedded === r.distinct && r.sum.reused === r.chunks - r.distinct, 'every distinct chunk input was embedded once (' + r.embedded + '); the same input in another file was reused (' + r.sum.reused + ')');
    ok(r.batches.length >= 1 && r.batches.every((n) => n <= 32) && r.lookups === r.files, 'embedded in batches of at most 32 (' + r.batches.length + ' calls), the cache asked once for each file before embedding');
    ok(r.first.event === 'folder-start' && r.first.total === r.files && r.last === 'folder-done' && r.kinds.filter((k) => k === 'file-done').length === r.files && r.kinds.filter((k) => k === 'file-start').length === r.files, 'progress: folder-start, then file-start and file-done for each file, then folder-done', r.first);
    ok(['reading', 'units', 'counting', 'packing', 'checking', 'embedding', 'writing'].every((s) => r.stages.includes(s)) && r.stages.includes('pdf'), 'progress stages are reported: ' + r.stages.join(', '));
    ok(r.touched, 'the folder\'s last_indexed_at is set');
  });

  // ----------------------------------------------------------------------------------------------------- second run
  await section('second run', async () => {
    const r = await ev(async () => {
      const { store, emb, ix, folder } = window.SC; const before = { calls: store.calls.length, emb: emb.embedded, counted: emb.counted }; const events = [];
      const sum = await ix.indexFolder(folder.id, { onProgress: (e) => events.push(e.event) });
      const after = store.calls.slice(before.calls).map((c) => c[0]);
      return { sum, replaces: after.filter((c) => c === 'file.replace').length, embedded: emb.embedded - before.emb, counted: emb.counted - before.counted, skips: events.filter((e) => e === 'file-skip').length };
    });
    ok(r.sum.files.skipped === r.sum.files.total && r.sum.files.indexed === 0 && r.skips === r.sum.files.total, 'a second run leaves every file alone: size and modification time are those in the index', r.sum.files);
    ok(r.replaces === 0 && r.embedded === 0 && r.counted === 0, 'nothing is parsed, counted, embedded or written (no file.replace, no embedder call)');
    const f = await ev(async () => {
      const { store, emb, ix, folder, path } = window.SC; PH.touchFile(path, 'recipes/fish_soup.md', 99999); const b0 = emb.embedded, c0 = store.calls.length;
      const sum = await ix.indexFolder(folder.id); const calls = store.calls.slice(c0).filter((c) => c[0] === 'file.replace').map((c) => c[1]);
      const sum2 = await ix.indexFolder(folder.id, { force: true }); return { sum, calls, embedded: emb.embedded - b0, sum2, total: store.files.size };
    });
    ok(f.sum.files.indexed === 1 && f.calls.join() === 'recipes/fish_soup.md' && f.embedded === 0 && f.sum.reused > 0, 'a file whose modification time changed but not its words is read again and every vector is reused (0 embedded)', f.sum);
    ok(f.sum2.files.indexed === f.total && f.embedded === 0 && f.sum2.embedded === 0, 'force reads every file again and still embeds nothing: the same inputs are reused by content hash (' + f.sum2.files.indexed + ' files)');
  });

  // ---------------------------------------------------------------------------------------------------- changed file
  await section('changed file', async () => {
    const r = await ev(async () => {
      PH.bridge.folders.clear();
      const { path } = await PH.loadCorpusFolder('historian_archive', { cut: { 'logbook/ship_logbooks_1781-1802.txt': 60000 } });
      const store = PH.fakeStore(), emb = PH.fakeEmbedder(); const folder = await store.folder.add({ name: 'historian_archive', path });
      const ix = PH.createIndexer({ store, embedder: emb }); const first = await ix.indexFolder(folder.id); window.SC2 = { store, emb, ix, folder, path };
      const rel = 'diaries/josiah_hollis_diary_1786.md', old = new Set(); const f0 = await store.file.get({ folderId: folder.id, path: rel }); for (const c of store.chunks.get(f0.id)) old.add(c.content_hash);
      const big = 'logbook/ship_logbooks_1781-1802.txt'; const fb = await store.file.get({ folderId: folder.id, path: big });
      // the same words with one sentence of one section changed
      let text = new TextDecoder().decode(PH.bridge.folders.get(path).get(rel).bytes);
      const sentence = 'Launched the Hester at Hotwells this morning on the top of the tide'; if (!text.includes(sentence)) throw new Error('sentence missing');
      text = text.replace(sentence, 'Launched the Hester at Hotwells yesterday on the top of the tide, after a delay'); PH.setFile(path, rel, text, 77777);
      const e0 = emb.embedded; const sum = await ix.indexFolder(folder.id); const f1 = await store.file.get({ folderId: folder.id, path: rel });
      const now = store.chunks.get(f1.id), changed = now.filter((c) => !old.has(c.content_hash)).map((c) => c.content_hash);
      const bigChunks = fb.chunkCount;
      return { first: first.files, filesN: first.files.indexed, sum, embedded: emb.embedded - e0, newDistinct: new Set(changed).size, oldN: old.size, nowN: now.length, sameHash: f0.contentHash === f1.contentHash, bigChunks, hasSentence: now.some((c) => c.text.includes('yesterday on the top of the tide')) };
    });
    ok(r.filesN > 20 && r.bigChunks >= 10, 'the historian\'s folder (the 4 MB log cut to 60 kB) is indexed: ' + r.filesN + ' files, the log in ' + r.bigChunks + ' chunks');
    ok(r.sum.files.indexed === 1 && r.sum.files.skipped === r.filesN - 1 && !r.sameHash, 'after one file is changed a run reads that one file only; its content hash is new');
    ok(r.embedded === r.newDistinct && r.embedded >= 1 && r.embedded < r.nowN && r.hasSentence, 'the number of vectors embedded (' + r.embedded + ') is the number of its chunks that are new (' + r.newDistinct + ' of ' + r.nowN + '); the other ' + (r.nowN - r.newDistinct) + ' are reused by content hash', r);
  });

  // ------------------------------------------------------------------------------------------- added and removed
  await section('added and removed', async () => {
    const r = await ev(async () => {
      const { store, emb, ix, folder, path } = window.SC2; const add = 'letters/1799-01-01_new_letter.txt';
      PH.setFile(path, add, 'Bristol, 1st January 1799.\n\nA new letter has been found in the bundle. It speaks of casks, freight and the price of sugar at the quay. ' + 'The partners agreed to meet on the following Monday. '.repeat(12), 88888);
      const e0 = emb.embedded; const s1 = await ix.indexFolder(folder.id); const added = await store.file.get({ folderId: folder.id, path: add }); const e1 = emb.embedded;
      PH.removeFile(path, 'letters/1795-09-14_wren_to_hollis_accounts.txt'); PH.removeFile(path, 'diaries/tobias_wren_memoranda.md'); const c0 = store.calls.length;
      const s2 = await ix.indexFolder(folder.id); const deletes = store.calls.slice(c0).filter((c) => c[0] === 'file.delete').map((c) => c[1]).sort();
      const left = (await store.file.list({ folderId: folder.id })).map((f) => f.path);
      return { s1, added: added && added.chunkCount, embedded1: e1 - e0, s2, deletes, goneStill: left.includes('diaries/tobias_wren_memoranda.md') || left.includes('letters/1795-09-14_wren_to_hollis_accounts.txt'), embedded2: emb.embedded - e1 };
    });
    ok(r.s1.files.indexed === 1 && r.added >= 1 && r.embedded1 === r.added, 'a file added to the folder is indexed on the next run, and only its ' + r.added + ' chunks are embedded');
    ok(r.s2.files.deleted === 2 && r.deletes.length === 2 && !r.goneStill && r.embedded2 === 0, 'two files taken out of the folder are taken out of the index (store.file.delete) and nothing is embedded', r.deletes);
  });

  // -------------------------------------------------------------------------------------------------- failures
  await section('failures', async () => {
    const r = await ev(async () => {
      PH.bridge.folders.clear();
      const { path } = await PH.loadCorpusFolder('household_papers');
      PH.setFile(path, 'bad/not_a.pdf', 'this is not a pdf', 5); PH.setFile(path, 'bad/unreadable.txt', 'cannot be read', 6); PH.setFile(path, 'bad/refused.md', '# Refused\n\nThe store will not take this file.', 7);
      PH.setFile(path, 'bad/poison.txt', 'POISON text that the embedder will not take. ' + 'More words follow here. '.repeat(10), 8); PH.setFile(path, 'bad/huge.txt', 'x', 9); PH.bridge.folders.get(path).get('bad/huge.txt').bytes = new Uint8Array(20000);
      PH.bridge.failRead.add('bad/unreadable.txt');
      const store = PH.fakeStore(), emb = PH.fakeEmbedder({ failOn: (t) => t.includes('POISON') }); store.failReplace.add('bad/refused.md');
      const folder = await store.folder.add({ name: 'household_papers', path }); const ix = PH.createIndexer({ store, embedder: emb, maxFileBytes: 15000 }); const events = [];
      const sum = await ix.indexFolder(folder.id, { onProgress: (e) => events.push(e) }); const list = (await store.file.list({ folderId: folder.id })).map((f) => f.path);
      window.SC3 = { store, emb, ix, folder, path };
      // the next run tries the failed files again (and fails again), and the others are left alone
      const sum2 = await ix.indexFolder(folder.id);
      const e = events.filter((x) => x.event === 'file-error').map((x) => [x.path, x.error.slice(0, 70)]);
      return { sum, sum2, list, errors: e, nGood: list.filter((x) => !x.startsWith('bad/')).length };
    });
    ok(r.sum.files.failed === 5 && r.sum.failures.length === 5 && r.sum.files.indexed === r.nGood && r.nGood === 20, 'five files fail (not a PDF, unreadable, refused by the store, refused by the embedder, too large) and are reported; the other ' + r.nGood + ' go in', r.errors);
    ok(r.errors.some(([p, m]) => p === 'bad/not_a.pdf' && /PDF/.test(m)) && r.errors.some(([p, m]) => p === 'bad/unreadable.txt' && /could not read/.test(m)) && r.errors.some(([p, m]) => p === 'bad/refused.md' && /store failed/.test(m)) &&
      r.errors.some(([p, m]) => p === 'bad/poison.txt' && /embedder failed/.test(m)) && r.errors.some(([p, m]) => p === 'bad/huge.txt' && /too large \(20 kB; the limit is 15 kB\)/.test(m)), 'each failure says why, with the file\'s path (file-error events)');
    ok(r.list.every((x) => !x.startsWith('bad/')), 'a file that failed leaves nothing in the index');
    ok(r.sum2.files.failed === 5 && r.sum2.files.indexed === 0 && r.sum2.files.skipped === 20, 'the next run tries the five again and leaves the twenty alone');
    const fatal = await ev(async () => {
      const { store, emb, folder, path } = window.SC3; PH.bridge.failRead.clear(); for (const k of ['bad/not_a.pdf', 'bad/unreadable.txt', 'bad/refused.md', 'bad/poison.txt', 'bad/huge.txt']) PH.removeFile(path, k);
      PH.setFile(path, 'zz_new.txt', 'A new file that arrives when the store has failed. ' + 'Words. '.repeat(30), 1234);
      const dead = Object.assign({}, store, { file: { ...store.file, replace: async () => { const e = new Error('store worker failed'); e.code = 'WORKER_FAILED'; throw e; } } });
      const ix = PH.createIndexer({ store: dead, embedder: emb }); let err = null; try { await ix.indexFolder(folder.id); } catch (e) { err = [e.code, e.message]; } ix.stop(); PH.removeFile(path, 'zz_new.txt'); return err;
    });
    ok(fatal && fatal[0] === 'WORKER_FAILED', 'a store that has died stops the run (every other file would fail the same way) instead of listing a failure for each', fatal);
  });

  // ---------------------------------------------------------------------------------------------------- safeguards
  await section('safeguards', async () => {
    const r = await ev(async () => {
      const { store, emb, ix, folder, path } = window.SC; const n0 = store.files.size; const out = {};
      PH.bridge.failList.add(path); let err = null; try { await ix.indexFolder(folder.id); } catch (e) { err = [e.code, e.message]; } PH.bridge.failList.delete(path);
      out.unavailable = err; out.afterUnavailable = store.files.size;
      const saved = PH.bridge.folders.get(path); PH.bridge.folders.set(path, new Map());
      const s1 = await ix.indexFolder(folder.id); out.emptyNotes = s1.notes; out.deleted1 = s1.files.deleted; out.afterEmpty = store.files.size;
      out.emptyNow = s1.emptyNow;
      const s2 = await ix.indexFolder(folder.id, { confirmEmpty: true }); out.deleted2 = s2.files.deleted; out.afterConfirm = store.files.size; out.n0 = n0;
      PH.bridge.folders.set(path, saved);
      let err2 = null; try { await ix.indexFolder(9999); } catch (e) { err2 = e.code; } out.noFolder = err2;
      // the app no longer has the folder on its list: said as such, not as a drive that is not connected
      PH.bridge.notChosen.add(path);
      try { await ix.indexFolder(folder.id); out.notChosen = 'resolved'; } catch (e) { out.notChosen = e.code; } finally { PH.bridge.notChosen.delete(path); }
      const a = ix.indexFolder(folder.id); let err3 = null; try { await ix.indexFolder(folder.id); } catch (e) { err3 = e.code; } const first = await a; out.twice = [err3, first.files.total];
      const n1 = store.files.size; PH.bridge.cutList = 5; const s3 = await ix.indexFolder(folder.id); PH.bridge.cutList = null;   // the app stopped listing at its limit
      out.cut = { total: s3.files.total, deleted: s3.files.deleted, kept: store.files.size === n1 && n1 === 20, notes: s3.notes };
      return out;
    });
    ok(r.unavailable && r.unavailable[0] === 'FOLDER_UNAVAILABLE' && /drive/.test(r.unavailable[1]) && r.afterUnavailable === r.n0, 'a folder the app cannot list (a drive that is unplugged) stops the run with a plain reason and takes nothing out of the index', r.unavailable);
    ok(r.deleted1 === 0 && r.afterEmpty === r.n0 && r.emptyNotes.length === 1 && /not connected/.test(r.emptyNotes[0]), 'a folder that suddenly lists no files while files are indexed is taken for a drive that is not there: nothing is deleted, and the run says so', r.emptyNotes);
    ok(r.emptyNow === r.n0, 'the run tells the card how many files are still in the search, so it can ask her in plain words', r.emptyNow);
    ok(r.deleted2 === r.n0 && r.afterConfirm === 0, 'with confirmEmpty the files are taken out (' + r.deleted2 + ')');
    ok(r.notChosen === 'NOT_CHOSEN', 'a folder the app no longer has on its list is reported as NOT_CHOSEN, not as a drive to connect', r.notChosen);
    ok(r.noFolder === 'NO_SUCH_FOLDER', 'a folder that is not in the index is refused');
    ok(r.cut.total === 5 && r.cut.deleted === 0 && r.cut.kept && r.cut.notes.length === 1 && /more files than Ingenium reads at once/.test(r.cut.notes[0]), 'a listing the app cut short (truncated: true) takes nothing out of the index, and the run says so', r.cut);
    ok(r.twice[0] === 'ALREADY_RUNNING' && r.twice[1] === 20, 'a folder that is being read cannot be started a second time (ALREADY_RUNNING); the first run goes on and ends', r.twice);
  });

  // ------------------------------------------------------------------------------------------------------ stopping
  await section('stopping', async () => {
    const r = await ev(async () => {
      PH.bridge.folders.clear();
      const { path } = await PH.loadCorpusFolder('household_papers'); const store = PH.fakeStore(), emb = PH.fakeEmbedder(); const folder = await store.folder.add({ name: 'h', path });
      const ix = PH.createIndexer({ store, embedder: emb }); const ac = new AbortController(); let done = 0; const events = [];
      let err = null, sum = null;
      try { await ix.indexFolder(folder.id, { signal: ac.signal, onProgress: (e) => { events.push(e.event); if (e.event === 'file-done' && ++done === 3) ac.abort(); } }); } catch (e) { err = [e.name, e.summary && e.summary.stopped]; }
      const kept = (await store.file.list({ folderId: folder.id })).length;
      const rerun = await ix.indexFolder(folder.id);
      // stopped in the middle of a long file: what is embedded is kept in the cache
      const big = new TextDecoder().decode(await PH.fetchBytes(PH.FIX + 'historian_archive/logbook/ship_logbooks_1781-1802.txt')).slice(0, 400000);
      PH.bridge.folders.clear(); PH.setFile('/long', 'log.txt', big, 1); const st2 = PH.fakeStore(), em2 = PH.fakeEmbedder({ delay: 20 }); const f2 = await st2.folder.add({ name: 'long', path: '/long' });
      const ix2 = PH.createIndexer({ store: st2, embedder: em2, embedBatch: 32 }); const ac2 = new AbortController(); let batches = 0; let err2 = null;
      const orig = em2.embed; em2.embed = async (...a) => { const r = await orig(...a); if (++batches === 4) ac2.abort(); return r; };
      try { await ix2.indexFolder(f2.id, { signal: ac2.signal }); } catch (e) { err2 = e.name; }
      const puts = st2.calls.filter((c) => c[0] === 'emb.put').length, cached = st2.cache.size, written = st2.files.size, e0 = em2.embedded;
      em2.embed = orig; const again = await ix2.indexFolder(f2.id);
      // the whole 4 MB log read from nothing: its progress saves (every 200 new vectors) carry each new vector once (review rag-r-05)
      const whole = new TextDecoder().decode(await PH.fetchBytes(PH.FIX + 'historian_archive/logbook/ship_logbooks_1781-1802.txt'));
      PH.bridge.folders.clear(); PH.setFile('/whole', 'log.txt', whole, 1); const st3 = PH.fakeStore(), em3 = PH.fakeEmbedder(); const f3 = await st3.folder.add({ name: 'whole', path: '/whole' });
      const ix3 = PH.createIndexer({ store: st3, embedder: em3, embedBatch: 32 }); const run3 = await ix3.indexFolder(f3.id); ix3.stop();
      const savedAgain = { calls: st3.calls.filter((c) => c[0] === 'emb.put').length, items: st3.putItems || 0, embedded: run3.embedded };
      return { err, kept, done, rerunIndexed: rerun.files.indexed, rerunSkipped: rerun.files.skipped, total: rerun.files.total, last: events[events.length - 1], err2, puts, cached, written, e0, savedAgain, again: { embedded: again.embedded, reused: again.reused, chunks: again.chunks }, tail: events.slice(-1) };
    });
    ok(r.err && r.err[0] === 'AbortError' && r.err[1] === true && r.done === 3 && r.kept === 3 && r.last === 'folder-done', 'stopping a run (AbortSignal) ends it after the file in hand: 3 files are in the index, folder-done says it was stopped', r.err);
    ok(r.rerunIndexed === r.total - 3 && r.rerunSkipped === 3, 'the next run does the rest and leaves those 3 alone');
    ok(r.err2 === 'AbortError' && r.written === 0 && r.puts >= 1 && r.cached >= 64, 'stopped in the middle of a long file, nothing of that file is written, but the ' + r.cached + ' vectors already made are kept in the embedding cache (emb.put)', { puts: r.puts, cached: r.cached });
    ok(r.savedAgain.calls >= 10 && r.savedAgain.items <= r.savedAgain.embedded, 'reading the 4 MB log from nothing, its progress saves carry each new vector once (' + r.savedAgain.items + ' carried in ' + r.savedAgain.calls + ' saves, ' + r.savedAgain.embedded + ' made)', r.savedAgain);
    ok(r.again.reused >= r.cached && r.again.embedded === r.again.chunks - r.again.reused, 'and the run after it reuses them: ' + r.again.reused + ' of ' + r.again.chunks + ' chunks need no embedding', r.again);
  });

  // ---------------------------------------------------------------------------------------- the real store and embedder
  await section('real store and embedder', async () => {
    const files = await ev(async () => { const e = new PH.embedderModule.Embedder(); return e.modelFiles(); });
    if (!files.installed) { skipped++; console.log('SKIP real store and embedder: the model files are not in rag/vendor/models (' + files.missing.join(', ') + ')'); return; }
    const t0 = Date.now();
    const r = await ev(async () => {
      const E = PH.embedderModule, S = PH.storeModule; PH.bridge.folders.clear(); PH.installBridge();
      const store = S.createStore({ debug: true }), embedder = E.createEmbedder(); PH.real = { store, embedder };
      const open = await store.open({ vfs: 'memory' }); const init = await embedder.init(); const me = await store.principal.ensure({ name: 'me' });
      const { path } = await PH.loadCorpusFolder('household_papers'); const folder = await store.folder.add({ name: 'household_papers', path }); await store.acl.grant({ folderId: folder.id, principalId: me.id });
      const ix = PH.createIndexer({ store, embedder }); const events = [];
      const t1 = performance.now(); const sum = await ix.indexFolder(folder.id, { onProgress: (e) => events.push(e.event) }); const ms = performance.now() - t1;
      const stats = await store.stats(); const info = await embedder.info();
      // retrieval sanity: each fact's question, embedded as a query, against the chunks of the folder (read from the parse worker's output)
      const chunks = []; for (const [rel, f] of PH.bridge.folders.get(path)) { const res = await PH.parseBytes(f.bytes, rel.split('.').pop(), { slim: true }); for (const c of res.chunks) chunks.push({ rel, input: c.input, text: c.text }); }
      const vecs = []; for (let i = 0; i < chunks.length; i += 16) vecs.push(...await embedder.embed({ texts: chunks.slice(i, i + 16).map((c) => c.input), kind: 'passage' }));
      const cos = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; };
      const ranks = []; const facts = PH.facts.facts.filter((f) => f.folder === 'household_papers');
      for (const f of facts) { const [q] = await embedder.embed({ texts: [f.question], kind: 'query' }); const order = chunks.map((c, i) => [cos(q, vecs[i]), i]).sort((a, b) => b[0] - a[0]); const n = PH.norm(f.needle); ranks.push([f.id, order.findIndex(([, i]) => PH.norm(chunks[i].text).includes(n))]); }
      // an unchanged second run, then one more file changed: through the real store
      const sum2 = await ix.indexFolder(folder.id); const dbg = await store.debug.rows({ table: 'chunks', limit: 3 });
      store.terminate(); embedder.terminate(); ix.stop();
      return { open, init: { modelId: init.modelId, dims: init.dims, maxTokens: init.maxTokens, key: init.key }, sum, sum2, ms, stats, embedded: info.embedded, ranks, nChunks: chunks.length, events: events.length, dbg: dbg.length || (dbg.rows && dbg.rows.length) };
    });
    ok(r.sum.files.indexed === 20 && r.sum.files.failed === 0 && r.sum.chunks === r.stats.chunks && r.stats.chunks === r.nChunks && r.stats.files === 20, 'the household folder is indexed through the real store (SQLite, in memory) and the real embedder (' + r.init.modelId + ', ' + r.init.dims + ' values): 20 files, ' + r.stats.chunks + ' chunks, ' + (r.ms / 1000).toFixed(1) + ' s', r.stats);
    ok(r.stats.chunks_fts === r.stats.chunks && r.stats.chunks_vec === r.stats.chunks && r.stats.emb_cache >= r.sum.embedded && r.stats.folder_acl === 1, 'every chunk has its row in chunks, chunks_fts and chunks_vec (' + r.stats.chunks + ' each), the vectors are in emb_cache, the ACL row for "me" is there', r.stats);
    ok(r.embedded === r.sum.embedded && r.sum.embedded <= r.nChunks, 'the embedder embedded exactly the ' + r.sum.embedded + ' distinct chunk inputs of the index (its own counter), none twice');
    ok(r.sum2.files.skipped === 20 && r.sum2.files.indexed === 0, 'a second run through the real store leaves all 20 files alone');
    const top1 = r.ranks.filter(([, k]) => k === 0).length, top3 = r.ranks.filter(([, k]) => k >= 0 && k < 3).length;
    ok(r.ranks.length === 10 && top3 === 10 && top1 >= 8, 'each of the 10 household facts\' question, embedded as a query, finds the chunk that holds the answer: first for ' + top1 + ', within the first three for ' + top3 + ' (of ' + r.nChunks + ' chunks)', r.ranks);
    console.log('     real run took ' + ((Date.now() - t0) / 1000).toFixed(1) + ' s in all');
  });

  ok(ran.length === SECTIONS.length && SECTIONS.every((s) => ran.includes(s)), 'every section ran: ' + ran.join(', ') + (skipped ? ' (' + skipped + ' skipped)' : ''));
  const wErr = await ev(() => PH.errors.concat(PH.client.errors, (PH.real ? PH.real.store.errors.concat(PH.real.embedder.errors) : [])));
  ok(pageErrors.length === 0 && consoleErrors.length === 0 && wErr.length === 0, 'no script errors on the page or in a worker', [pageErrors, consoleErrors, wErr]);
  ok(external.length === 0, 'no request left this computer (' + requests.length + ' requests)', external);
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); if (server) server.kill();
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log('FAIL the test itself: ' + (e && e.stack || e)); process.exit(1); });
