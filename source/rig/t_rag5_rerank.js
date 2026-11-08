// Folder search, phase 5: the optional reranker (rag/reranker.worker.js, rag/reranker.js, the rerank step in rag/retriever.js,
// IngRag.retrieve's fallback in rag/main.js, the card's switch in build/modules/r202.js, the chat's request in build/modules/r257.js),
// on the BUILT page in headless Chromium with the desktop app's folder bridge standing in (rig/rag_bridge.py, rig/rag_bridge_shim.js).
// Her task: "Reranker. Optional, off by default, loaded on demand. Use a small cross-encoder that has a working ONNX export for
// Transformers.js." and "merge with reciprocal rank fusion (k = 60), then rerank to 5 if enabled, else take the top 5". What is checked:
//   1. off by default: the card's switch is there and not ticked, state.rag.rerank is not set, and nothing of the reranker is fetched
//      while the folders are read and searched without it
//   2. Recall@5 on the golden set without reranking, then with it, on the same index (the three fixture folders, the 4 MB logbook left
//      out to keep the test short, so its one item, H09, is left out and said so); the time each search takes, both ways
//   3. loaded on demand: the first search that asks for it fetches rag/reranker.worker.js and the model's quantized file from the
//      app's own address; the result says it was reranked; five passages, each with its score, best first, all from the twenty the
//      fusion ranked first
//   4. the folder rule holds: test-b, who may not read household_papers, gets none of its passages (nor from either search) with the
//      reranker on
//   5. the chat: ticking the switch makes the next folder answer rerank, and the model is given the passages in the reranker's order;
//      unticking it goes back to the fusion's order
//   6. a copy of the app without the reranker's files: the search keeps the fusion's order, says why in plain words, and the chat
//      shows that note under the reply
//   7. no request leaves this computer, no page error
//   node rig/t_rag5_rerank.js http://127.0.0.1:8187/ <out folder>
//   Environment: RAG_E2E (the page folder: ingenium.html, rag/ with the reranker, rag/vendor/ with its model), RAG_E2E_BARE (a second
//   page folder whose rag/vendor has no reranker model; its server address is RAG_BARE_BASE, default the first address's port minus
//   one), RAG_BRIDGE (default http://127.0.0.1:8199).
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [BASE0, OUT] = process.argv.slice(2);
if (!BASE0 || !OUT) { console.log('usage: node rig/t_rag5_rerank.js <page server address> <out folder>'); process.exit(2); }
const BASE = BASE0.replace(/\/?$/, '/'); const ORIGIN = new URL(BASE).origin; const PAGE = BASE + 'ingenium.html';
const BARE_BASE = (process.env.RAG_BARE_BASE || ('http://127.0.0.1:' + (+new URL(BASE).port - 1) + '/')).replace(/\/?$/, '/');
const BARE_ORIGIN = new URL(BARE_BASE).origin; const BARE_PAGE = BARE_BASE + 'ingenium.html';
const BRIDGE = (process.env.RAG_BRIDGE || 'http://127.0.0.1:8199').replace(/\/$/, ''); const BRIDGE_ORIGIN = new URL(BRIDGE).origin;
const E2E = process.env.RAG_E2E || '/tmp/claude-0/-home-user/20533335-3d8c-5333-8292-4941e284bafb/scratchpad/e2e';
const E2E_BARE = process.env.RAG_E2E_BARE || '';
const SRC = path.resolve(__dirname, '..'); const FIX = path.join(SRC, 'rag', 'fixtures');
fs.mkdirSync(OUT, { recursive: true }); const OUTA = path.resolve(OUT);
const GOLD = JSON.parse(fs.readFileSync(path.join(SRC, 'rag', 'eval', 'golden.json'), 'utf8'));
const WORK = path.join(OUTA, 'work'); const NAMES = ['household_papers', 'lab_notes', 'historian_archive'];
const LEFT_OUT = 'logbook';   // historian_archive/logbook: the 4 MB logbook, about an hour to read on four processors
const MISSING = "The reranker's model is not in this copy of the app, so the passages keep the search's own order.";
let pass = 0, fail = 0; const T0 = Date.now();
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; return !!c; };
const note = (m) => console.log('     [' + ((Date.now() - T0) / 60000).toFixed(1) + ' min] ' + m);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function reachable(url, method) { try { const r = await fetch(url, { method: method || 'GET' }); return r.ok; } catch (e) { return false; } }
async function bridgePost(p, body) { const r = await fetch(BRIDGE + p, { method: 'POST', body: JSON.stringify(body) }); return r.json(); }
const started = [];
const SERVE = ['import http.server, sys', 'root, port = sys.argv[1], int(sys.argv[2])', 'class H(http.server.SimpleHTTPRequestHandler):',
  "    extensions_map = dict(http.server.SimpleHTTPRequestHandler.extensions_map, **{'.mjs': 'text/javascript', '.js': 'text/javascript', '.wasm': 'application/wasm', '.json': 'application/json', '.onnx': 'application/octet-stream', '.html': 'text/html; charset=utf-8'})",
  "    def end_headers(self):", "        self.send_header('Cache-Control', 'no-store'); super().end_headers()", "    def log_message(self, *a): pass",
  "http.server.ThreadingHTTPServer(('127.0.0.1', port), lambda *a, **k: H(*a, directory=root, **k)).serve_forever()"].join('\n');
async function servePage(page, root, base) {
  if (await reachable(page, 'HEAD')) return;
  if (!root) throw new Error('no page folder for ' + base);
  started.push(cp.spawn('python3', ['-c', SERVE, root, new URL(base).port || '80'], { stdio: 'ignore' }));
  for (let i = 0; i < 40 && !(await reachable(page, 'HEAD')); i++) await sleep(250);
  if (!(await reachable(page, 'HEAD'))) throw new Error('the page server did not start: ' + base);
}
async function ensureServers() {
  await servePage(PAGE, E2E, BASE);
  if (E2E_BARE) await servePage(BARE_PAGE, E2E_BARE, BARE_BASE);
  if (!(await reachable(BRIDGE + '/'))) {
    started.push(cp.spawn('python3', [path.join(SRC, 'rig', 'rag_bridge.py'), new URL(BRIDGE).port, '--state', path.join(OUTA, 'bridge_state')], { stdio: 'ignore' }));
    for (let i = 0; i < 40 && !(await reachable(BRIDGE + '/')); i++) await sleep(250);
    if (!(await reachable(BRIDGE + '/'))) throw new Error('the bridge stand-in did not start');
  }
}
const ALLOWED = (u) => u.origin === ORIGIN || u.origin === BARE_ORIGIN || u.origin === BRIDGE_ORIGIN || /^(data|blob|about):/.test(u.protocol);
const RR_FILE = /\/rag\/reranker\.worker\.js$|ms-marco-MiniLM/;

async function openBrowser(name) {
  const profile = path.join(OUTA, 'profile-' + name); fs.rmSync(profile, { recursive: true, force: true });
  const ctx = await pw.chromium.launchPersistentContext(profile, { headless: true, viewport: { width: 1280, height: 900 } }); ctx.setDefaultTimeout(120000);
  const run = { ctx, requests: [], external: [], errors: [] };
  await ctx.route((u) => !ALLOWED(u), (route) => { run.external.push(route.request().url()); route.abort(); });
  ctx.on('request', (r) => run.requests.push(r.url()));
  await ctx.addInitScript('window.__RAG_BRIDGE__ = ' + JSON.stringify(BRIDGE)); await ctx.addInitScript({ path: path.join(SRC, 'rig', 'rag_bridge_shim.js') });
  await ctx.addInitScript(() => { window.__ING_RAG_TEST__ = true; });
  const p = ctx.pages()[0] || await ctx.newPage(); p.on('pageerror', (e) => run.errors.push(e.message));
  run.page = p; return run;
}
async function boot(p, page) {
  await p.goto(page); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(500); await p.evaluate(() => { try { go('chat'); } catch (e) { } });
  await p.waitForFunction(() => !!(window.IngRag && IngRag.prompt && IngRag.schedule), null, { timeout: 90000 });
  await p.evaluate(() => IngRag.schedule(0));
}
const openCard = async (p) => { await p.evaluate(() => { go('settings'); try { IngRooms.open('settings', 'ai'); } catch (e) { } try { IngSettingsParts.show('ai', 'search'); } catch (e) { } }); await p.waitForTimeout(400); await p.locator('#ragCard').scrollIntoViewIfNeeded(); await p.waitForTimeout(300); };
// the stand-in model (as rig/t_rag3_chat.js): it records what it is given and answers with the first passage's number
const fakeModel = (p) => p.evaluate(() => {
  state.models = state.models || []; if (!state.models.some((m) => m.id === 'rag-test')) state.models.push({ id: 'rag-test', customName: 'Stand-in (test)', fileState: 'ready', sizeBytes: 1, effort: 3, tokens: 1024, ctx: 32768 });
  state.activeModelId = 'rag-test'; Engine.modelId = 'rag-test'; Engine.status = 'ready'; Engine.adapter = { hasImageInput: false };
  state.chatSource = 'local'; if (state.cloud) state.cloud.on = false; state.thinking = false;
  document.getElementById('ctlCtx').value = '32768';
  window.__sent = [];
  Engine.generate = function (o) {
    const msgs = o.messages.map((m) => ({ role: m.role, content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) }));
    window.__sent.push(msgs);
    const reply = 'The first passage answers it [1].';
    try { o.onToken && o.onToken(reply); } catch (e) { }
    return Promise.resolve({ text: reply, stats: {} });
  };
});
const waitReply = (p) => p.waitForFunction(() => { const m = curMsgs(); const l = m[m.length - 1]; return l && l.role === 'bot' && !l.live && !l.wake && (typeof liveBot === 'undefined' || !liveBot); }, null, { timeout: 300000 });
async function send(p, text) {
  await p.evaluate(() => { const c = { id: 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), title: 'New conversation', messages: [] }; state.chats.push(c); state.activeChat = c.id; saveState(); renderChat(); });
  const n0 = await p.evaluate(() => curMsgs().length);
  await p.fill('#chatInput', text); await p.evaluate(() => sendChat());
  await p.waitForFunction((n) => curMsgs().length > n + 1 || (curMsgs().length > n && curMsgs()[curMsgs().length - 1].role === 'bot'), n0, { timeout: 30000 });
  await waitReply(p); await p.waitForTimeout(400);
  return p.evaluate(() => { const m = curMsgs(); return JSON.parse(JSON.stringify(m[m.length - 1])); });
}
// the passages' labels, in the order the system prompt numbers them
const labelsOf = (sys) => (String(sys).split('\nContext:\n')[1] || '').split(/\n\n(?=\[\d+\] )/).map((b) => /^\[\d+\] ([^\n]*)/.exec(b)).filter(Boolean).map((m) => m[1]);

(async () => {
  const E = await import('file://' + path.join(SRC, 'rag', 'eval.js'));
  await ensureServers();
  fs.rmSync(WORK, { recursive: true, force: true });
  for (const n of NAMES) fs.cpSync(path.join(FIX, n), path.join(WORK, n), { recursive: true, filter: (s) => !(n === 'historian_archive' && path.relative(path.join(FIX, n), s).split(path.sep)[0] === LEFT_OUT) });
  ok(!fs.existsSync(path.join(WORK, 'historian_archive', LEFT_OUT)), 'the three folders copied, the 4 MB logbook left out (golden item H09 is left out with it)');
  const items = GOLD.items.filter((it) => !(it.source.folder === 'historian_archive' && it.source.file.split('/')[0] === LEFT_OUT));
  await bridgePost('/admin/state', { dir: null });
  const report = { when: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC', left_out: GOLD.items.length - items.length };
  const A = await openBrowser('rr'); const p = A.page;
  try {
    await boot(p, PAGE);
    // ---------------------------------------------------------------- 1. off by default
    ok(await p.evaluate(() => !(state.rag && state.rag.rerank)), 'off by default: state.rag.rerank is not set');
    await openCard(p);
    const sw = await p.evaluate(() => { const i = document.getElementById('ragRerank'); return i ? { checked: i.checked, text: i.closest('label').textContent.trim() } : null; });
    ok(sw && sw.checked === false && /loads only when you switch it on/.test(sw.text), 'the card has the switch, not ticked, and says it loads only when switched on', sw);
    await p.evaluate(() => { try { go('chat'); } catch (e) { } });
    await bridgePost('/admin/dialog', { answers: NAMES.map((n) => path.join(WORK, n)) });
    const ids = await p.evaluate(async (n) => { const o = {}; for (let i = 0; i < n; i++) { const a = await IngRag.addFolder(); o[a.folder.name] = a.folder.id; } return o; }, NAMES.length);
    for (const n of NAMES) { note('reading ' + n); const sm = await p.evaluate((id) => IngRag.indexFolder(id).then((s) => ({ files: s.files, chunks: s.chunks })), ids[n]); note(n + ': ' + JSON.stringify(sm)); }
    // ---------------------------------------------------------------- 2. Recall@5 without reranking
    const plain = {}, plainMs = [];
    for (const it of items) { const r = await p.evaluate((q) => IngRag.retrieve(q, 'me', { k: 5 }).then((r) => ({ reranked: r.reranked, ms: r.ms, passages: r.passages.map((x) => ({ id: x.id, folderName: x.folderName, filePath: x.filePath, text: x.text })) })), it.question); plain[it.id] = r.passages; plainMs.push(r.ms); if (r.reranked) plain.__reranked = true; }
    ok(!plain.__reranked && !A.requests.some((u) => RR_FILE.test(u)) && await p.evaluate(() => IngRag._reranker === null), 'off by default: ' + items.length + ' searches without it: none reranked, nothing of the reranker fetched, no reranker worker');
    delete plain.__reranked;
    const R0 = E.recall({ items }, plain, 5);
    // ---------------------------------------------------------------- 3. loaded on demand
    const q0 = items[0].question;
    const t1 = Date.now();
    const first = await p.evaluate((q) => IngRag.retrieve(q, 'me', { k: 5, rerank: true }).then((r) => ({ reranked: r.reranked, note: r.rerankNote || null, passages: r.passages.map((x) => ({ id: x.id, s: x.rerankScore, f: x.fusedRank })) })), q0);
    const loadMs = Date.now() - t1;
    const pool = await p.evaluate((q) => IngRag.retrieve(q, 'me', { k: 20 }).then((r) => r.passages.map((x) => x.id)), q0);
    const scores = first.passages.map((x) => x.s);
    ok(first.reranked && !first.note && A.requests.some((u) => /\/rag\/reranker\.worker\.js$/.test(u)) && A.requests.some((u) => /models\/Xenova\/ms-marco-MiniLM-L-6-v2\/onnx\/model_quantized\.onnx$/.test(u)) && await p.evaluate(() => IngRag._reranker !== null),
      'loaded on demand: the first search that asks for it fetches rag/reranker.worker.js and the model\'s quantized file from the app\'s own address (' + loadMs + ' ms, the loading included)', { reranked: first.reranked, note: first.note });
    ok(first.passages.length === 5 && scores.every((s) => typeof s === 'number' && isFinite(s)) && scores.every((s, i) => i === 0 || scores[i - 1] >= s) && first.passages.every((x) => pool.includes(x.id) && x.f >= 1 && x.f <= 20),
      'five passages, each with its score, best first, all from the twenty the fusion ranked first', first.passages);
    // ---------------------------------------------------------------- 2. Recall@5 with reranking
    const rer = {}, rerMs = []; let allRer = true;
    for (const it of items) { const r = await p.evaluate((q) => IngRag.retrieve(q, 'me', { k: 5, rerank: true }).then((r) => ({ reranked: r.reranked, ms: r.ms, passages: r.passages.map((x) => ({ id: x.id, folderName: x.folderName, filePath: x.filePath, text: x.text })) })), it.question); rer[it.id] = r.passages; rerMs.push(r.ms); if (!r.reranked) allRer = false; }
    const R1 = E.recall({ items }, rer, 5);
    const med = (a) => { const s = a.slice().sort((x, y) => x - y); return Math.round(s[Math.floor(s.length / 2)]); };
    report.recall = { n: items.length, without: { fileHits: R0.fileHits, needleHits: R0.needleHits, medianMs: med(plainMs), items: R0.items }, with: { fileHits: R1.fileHits, needleHits: R1.needleHits, medianMs: med(rerMs), items: R1.items }, loadMs };
    note('Recall@5 without reranking: file ' + R0.fileHits + '/' + R0.n + ', answer passage ' + R0.needleHits + '/' + R0.n + ', median ' + med(plainMs) + ' ms a search');
    note('Recall@5 with reranking:    file ' + R1.fileHits + '/' + R1.n + ', answer passage ' + R1.needleHits + '/' + R1.n + ', median ' + med(rerMs) + ' ms a search');
    R0.items.forEach((x, i) => { const y = R1.items[i]; if (x.fileRank !== y.fileRank || x.needleRank !== y.needleRank) note('  ' + x.id + ': file rank ' + (x.fileRank || '-') + ' -> ' + (y.fileRank || '-') + ', answer rank ' + (x.needleRank || '-') + ' -> ' + (y.needleRank || '-')); });
    ok(allRer && R1.fileRecall >= 0.8, 'Recall@5 with reranking ' + R1.fileHits + ' of ' + R1.n + ' (' + R1.fileRecall.toFixed(2) + ', file level; the answer passage ' + R1.needleHits + '), without ' + R0.fileHits + ' (' + R0.needleHits + ')', R1.items.filter((x) => !x.fileRank || !x.needleRank));
    // ---------------------------------------------------------------- 4. the folder rule, with the reranker on
    const onlyX = items.filter((it) => it.source.folder === GOLD.restricted_folder);
    await p.evaluate(async (ids) => { const s = IngRag._store; const b = await s.principal.ensure({ name: 'test-b' }); for (const n of ['lab_notes', 'historian_archive']) await s.acl.grant({ folderId: ids[n], principalId: b.id }); }, ids);
    let leaks = 0, searchLeaks = 0, reranked = 0;
    for (const it of onlyX) { const r = await p.evaluate(([q, x]) => IngRag.retrieve(q, 'test-b', { k: 5, rerank: true }).then((r) => ({ rr: r.reranked, p: r.passages.filter((y) => y.folderId === x).length, s: r.fts.concat(r.vec).filter((y) => y.folderId === x).length })), [it.question, ids[GOLD.restricted_folder]]); if (r.p) leaks++; if (r.s) searchLeaks++; if (r.rr) reranked++; }
    ok(reranked === onlyX.length && leaks === 0 && searchLeaks === 0, 'the folder rule holds with the reranker on: test-b gets no passage of ' + GOLD.restricted_folder + ' for its ' + onlyX.length + ' questions, nor from either search', { reranked, leaks, searchLeaks });
    // ---------------------------------------------------------------- 5. the chat
    await fakeModel(p); await p.evaluate(() => IngRagChat.setOn(true));
    await openCard(p); await p.check('#ragRerank'); const on1 = await p.evaluate(() => !!state.rag.rerank);
    await p.evaluate(() => { try { go('chat'); } catch (e) { } });
    const qc = (items.find((it) => it.id === 'R06') || items[0]).question;
    const b1 = await send(p, qc);
    const sys1 = await p.evaluate(() => { const m = window.__sent[window.__sent.length - 1]; return m && m[0] ? m[0].content : ''; });
    const want1 = await p.evaluate((q) => IngRag.retrieve(q, 'me', { k: 5, rerank: true }).then((r) => r.passages.map((x) => IngRag.prompt.sourceLabel(x))), qc);
    ok(on1 && b1.rag && b1.rag.reranked === true && JSON.stringify(labelsOf(sys1)) === JSON.stringify(want1.slice(0, labelsOf(sys1).length)) && labelsOf(sys1).length > 0,
      'ticking the switch: the next folder answer is reranked and the model is given the passages in the reranker\'s order', { on: on1, reranked: b1.rag && b1.rag.reranked, given: labelsOf(sys1), want: want1 });
    await openCard(p); await p.uncheck('#ragRerank'); const off1 = await p.evaluate(() => state.rag.rerank === false);
    await p.evaluate(() => { try { go('chat'); } catch (e) { } });
    const b2 = await send(p, qc);
    const sys2 = await p.evaluate(() => { const m = window.__sent[window.__sent.length - 1]; return m && m[0] ? m[0].content : ''; });
    const want2 = await p.evaluate((q) => IngRag.retrieve(q, 'me', { k: 5 }).then((r) => r.passages.map((x) => IngRag.prompt.sourceLabel(x))), qc);
    ok(off1 && b2.rag && !b2.rag.reranked && JSON.stringify(labelsOf(sys2)) === JSON.stringify(want2.slice(0, labelsOf(sys2).length)), 'unticking it: the next answer has the fusion\'s order again', { reranked: b2.rag && b2.rag.reranked, given: labelsOf(sys2), want: want2 });
    ok(!A.external.length, 'no request left this computer', A.external.slice(0, 5));
    ok(!A.errors.length, 'no page error', A.errors.slice(0, 5));
  } catch (e) { ok(false, 'the reranker test ran to its end', String(e && e.stack || e).slice(0, 1500)); }
  finally { try { await A.ctx.close(); } catch (e) { } }
  // ------------------------------------------------------------------ 6. a copy of the app without the reranker's model
  if (E2E_BARE || await reachable(BARE_PAGE, 'HEAD')) {
    const B = await openBrowser('bare'); const q = B.page;
    try {
      await bridgePost('/admin/state', { dir: null });
      await boot(q, BARE_PAGE);
      await bridgePost('/admin/dialog', { answers: [path.join(WORK, 'household_papers')] });
      await q.evaluate(async () => { const a = await IngRag.addFolder(); await IngRag.indexFolder(a.folder.id); });
      const r = await q.evaluate(() => IngRag.retrieve('At what temperature are the cardamom buns baked?', 'me', { k: 5, rerank: true }).then((r) => ({ reranked: r.reranked, note: r.rerankNote || null, n: r.passages.length })));
      ok(r.reranked === false && r.note === MISSING && r.n === 5 && await q.evaluate(() => IngRag._reranker === null), 'without the reranker\'s files: five passages in the fusion\'s order and a plain note', r);
      await fakeModel(q); await q.evaluate(() => { IngRagChat.setOn(true); state.rag.rerank = true; saveState(); });
      const b = await send(q, 'At what temperature are the cardamom buns baked?');
      const shown = await q.evaluate(() => [...document.querySelectorAll('#chatMessages .rag-note, .rag-note')].map((x) => x.textContent.trim()));
      ok(b.rag && b.rag.rerankNote === MISSING && !b.rag.reranked && shown.includes(MISSING), 'the chat answers with the fusion\'s order and shows the note under the reply', { note: b.rag && b.rag.rerankNote, shown });
      ok(!B.external.length && !B.errors.length, 'no request left this computer, no page error (the copy without the model)', { external: B.external.slice(0, 3), errors: B.errors.slice(0, 3) });
    } catch (e) { ok(false, 'the copy without the model ran to its end', String(e && e.stack || e).slice(0, 1500)); }
    finally { try { await B.ctx.close(); } catch (e) { } }
  } else note('no copy without the model (RAG_E2E_BARE): check 6 left out');
  for (const s of started) { try { s.kill(); } catch (e) { } }
  fs.writeFileSync(path.join(OUTA, 'rerank.json'), JSON.stringify(report, null, 1));
  console.log('\n' + pass + ' passed, ' + fail + ' failed in ' + ((Date.now() - T0) / 60000).toFixed(1) + ' min');
  process.exit(fail ? 1 : 0);
})();
