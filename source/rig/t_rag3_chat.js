// Folder search, phase 3: the chat answers from her folders (build/modules/r257.js, rag/prompt.js, IngRag.openSource), on the BUILT
// page in headless Chromium, with the desktop app's folder bridge standing in (rig/rag_bridge.py runs the patch's own functions;
// rig/rag_bridge_shim.js gives the page window.pywebview.api.rag_*). The model is a stand-in that reads what it is given and follows
// the task's contract literally (it answers from the context with a citation, or says NOT_FOUND); a connection is the stand-in
// server rig/mockcloud.py. What is checked:
//   1. a browser without the bridge: no switch, nothing fetched from rag/; a reply with folder sources made elsewhere still shows its
//      [n] links and its sources, and the viewer shows the passage as it was read
//   2. the switch: "Your folders" in the + menu, before Research and Web search; on, it turns them off and shows its chip; not in Code
//   3. no folder yet: NOT_FOUND, no model called, a note naming where folders are added
//   4. two fixture folders read for real (household_papers, lab_notes); a second user "test-b" may read lab_notes only; "test-c" none
//   5. grounded turns (Markdown, PDF, HTML and JSON facts): the model reads exactly two messages, her system prompt word for word with the
//      passages numbered and her question; the reply's [n] are links; the sources are listed; nothing flagged; the viewer marks the
//      passage at its character offsets (Markdown) or on its page (PDF)
//   6. a reply with a sentence without a citation and a citation to no passage: both named under the reply; 6b (6.65) the second
//      pass: asked once more with the first answer, the better answer kept and the first beside it, a larger model recommended, off
//      when she turns it off
//   7. a reply that is the NOT_FOUND sentence in quotes: exactly NOT_FOUND; with words around it and no citation: exactly NOT_FOUND
//      (6.63); with a citation to a passage given: an answer, the sentence flagged
//   8. ACL end to end: test-b asks what only household_papers answers: retrieve() gives no passage of it, the model is given none of
//      it, the reply equals NOT_FOUND
//   9. zero passages (test-c): NOT_FOUND and no model called
//  10. a message with a file: answered without the folders, with a note; 11. a connection (the Anthropic stand-in): the request
//      carries her system prompt and only the question; 12. a reload keeps the sources; 13. the chip's ✕ turns it off
//  14. no request leaves this computer (the stand-ins aside), no page error
//   node rig/t_rag3_chat.js http://127.0.0.1:8188/ <out folder>
//   Environment: RAG_E2E (the page folder: ingenium.html, rag/, rag/vendor/), RAG_BRIDGE (default http://127.0.0.1:8199).
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [BASE0, OUT] = process.argv.slice(2);
if (!BASE0 || !OUT) { console.log('usage: node rig/t_rag3_chat.js <page server address> <out folder>'); process.exit(2); }
const BASE = BASE0.replace(/\/?$/, '/'); const ORIGIN = new URL(BASE).origin; const PAGE = BASE + 'ingenium.html';
const BRIDGE = (process.env.RAG_BRIDGE || 'http://127.0.0.1:8199').replace(/\/$/, ''); const BRIDGE_ORIGIN = new URL(BRIDGE).origin;
const E2E = process.env.RAG_E2E || '/tmp/claude-0/-home-user/20533335-3d8c-5333-8292-4941e284bafb/scratchpad/e2e';
const MOCK_PORT = 18796, MOCK = 'http://127.0.0.1:' + MOCK_PORT;
const SRC = path.resolve(__dirname, '..'); const FIX = path.join(SRC, 'rag', 'fixtures');
const FACTS = JSON.parse(fs.readFileSync(path.join(FIX, 'FACTS.json'), 'utf8')).facts;
const fact = (id) => FACTS.find((f) => f.id === id);
fs.mkdirSync(OUT, { recursive: true }); const OUTA = path.resolve(OUT); const MOCKLOG = path.join(OUTA, 'mock_req.json');
const NOT_FOUND = 'I could not find that in the selected folders.';
// her system prompt's four lines, as her task writes them
const HEAD = 'You are answering strictly from the provided context.\nIf the context does not contain the answer, respond exactly: "I could not find that in the selected folders."\nDo not use outside knowledge.\nSupport every claim with the context and cite it as [n].\nContext:\n';
let pass = 0, fail = 0; const T0 = Date.now();
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 600) : '')); c ? pass++ : fail++; return !!c; };
const note = (m) => console.log('     ' + m);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function reachable(url, method) { try { const r = await fetch(url, { method: method || 'GET' }); return r.ok; } catch (e) { return false; } }
async function bridgePost(p, body) { const r = await fetch(BRIDGE + p, { method: 'POST', body: JSON.stringify(body) }); return r.json(); }

const started = [];
async function ensureServers() {
  if (!(await reachable(PAGE, 'HEAD'))) {
    const u = new URL(BASE);
    const code = ['import http.server, sys', 'root, port = sys.argv[1], int(sys.argv[2])',
      'class H(http.server.SimpleHTTPRequestHandler):',
      "    extensions_map = dict(http.server.SimpleHTTPRequestHandler.extensions_map, **{'.mjs': 'text/javascript', '.js': 'text/javascript', '.wasm': 'application/wasm', '.json': 'application/json', '.onnx': 'application/octet-stream', '.html': 'text/html; charset=utf-8'})",
      "    def end_headers(self):", "        self.send_header('Cache-Control', 'no-store'); super().end_headers()",
      "    def log_message(self, *a): pass",
      "http.server.ThreadingHTTPServer(('127.0.0.1', port), lambda *a, **k: H(*a, directory=root, **k)).serve_forever()"].join('\n');
    started.push(cp.spawn('python3', ['-c', code, E2E, u.port || '80'], { stdio: 'ignore' }));
    for (let i = 0; i < 40 && !(await reachable(PAGE, 'HEAD')); i++) await sleep(250);
    if (!(await reachable(PAGE, 'HEAD'))) throw new Error('the page server did not start');
  }
  if (!(await reachable(BRIDGE + '/'))) {
    started.push(cp.spawn('python3', [path.join(SRC, 'rig', 'rag_bridge.py'), new URL(BRIDGE).port, '--state', path.join(OUTA, 'bridge_state')], { stdio: 'ignore' }));
    for (let i = 0; i < 40 && !(await reachable(BRIDGE + '/')); i++) await sleep(250);
    if (!(await reachable(BRIDGE + '/'))) throw new Error('the bridge stand-in did not start');
  }
  fs.writeFileSync(MOCKLOG, '[]');
  started.push(cp.spawn('python3', [path.join(SRC, 'rig', 'mockcloud.py'), String(MOCK_PORT), MOCKLOG], { stdio: 'ignore' }));
  await sleep(800);
}

const ALLOWED = (u) => u.origin === ORIGIN || u.origin === BRIDGE_ORIGIN || u.origin === MOCK || /^(data|blob|about):/.test(u.protocol);
async function openBrowser(name, withBridge) {
  const profile = path.join(OUTA, 'profile-' + name); fs.rmSync(profile, { recursive: true, force: true });
  const ctx = await pw.chromium.launchPersistentContext(profile, { headless: true, viewport: { width: 1280, height: 900 } }); ctx.setDefaultTimeout(60000);
  const run = { name, ctx, requests: [], external: [], pageErrors: [] };
  await ctx.route((u) => !ALLOWED(u), (route) => { run.external.push(route.request().url()); route.abort(); });
  ctx.on('request', (r) => run.requests.push(r.url()));
  if (withBridge) { await ctx.addInitScript('window.__RAG_BRIDGE__ = ' + JSON.stringify(BRIDGE)); await ctx.addInitScript({ path: path.join(SRC, 'rig', 'rag_bridge_shim.js') }); }
  await ctx.addInitScript(() => { window.__ING_RAG_TEST__ = true; });
  const p = ctx.pages()[0] || await ctx.newPage();
  p.on('pageerror', (e) => run.pageErrors.push(e.message));
  run.page = p; return run;
}
async function boot(p) {
  await p.goto(PAGE); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(500);
  await p.evaluate(() => { try { go('chat'); } catch (e) { } });
  await p.waitForTimeout(400);
}
// the stand-in model: it finds window.__needle in the passages it was given and answers with that passage's number; given none
// with it, it says the NOT_FOUND sentence (in quotes, as models often do). __mode 'loose' adds a sentence without a citation and a
// citation to a passage it was not given.
const fakeModel = (p) => p.evaluate(() => {
  state.models = state.models || []; if (!state.models.some((m) => m.id === 'rag-test')) state.models.push({ id: 'rag-test', customName: 'Stand-in (test)', fileState: 'ready', sizeBytes: 1, effort: 3, tokens: 1024, ctx: 32768 });
  state.activeModelId = 'rag-test'; Engine.modelId = 'rag-test'; Engine.status = 'ready'; Engine.adapter = { hasImageInput: false };
  state.chatSource = 'local'; if (state.cloud) state.cloud.on = false; state.thinking = false;
  document.getElementById('ctlCtx').value = '32768';
  window.__sent = [];
  Engine.generate = function (o) {
    const msgs = o.messages.map((m) => ({ role: m.role, content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) }));
    window.__sent.push(msgs);
    const sys = msgs[0] && msgs[0].role === 'system' ? msgs[0].content : '';
    let reply;
    const blocks = sys.split(/\n\n(?=\[\d+\] )|\nContext:\n/).filter((b) => /^\[\d+\] /.test(b));
    const hit = window.__needle ? blocks.find((b) => b.indexOf(window.__needle) >= 0) : null;
    const last = msgs[msgs.length - 1];
    if (/^You are answering strictly/.test(sys) && last && last.role === 'user' && /^Check your answer against the context above\./.test(last.content)) {
      // 6.65, the second pass: 'fix' answers with every sentence cited; otherwise the first answer comes back as it was
      if (window.__recheck === 'fix' && hit) { const n = /^\[(\d+)\]/.exec(hit)[1]; reply = 'Your folder says: ' + window.__needle + ' [' + n + '].'; }
      else reply = msgs[msgs.length - 2].content;
    } else if (/^You are answering strictly/.test(sys)) {
      if (hit) { const n = /^\[(\d+)\]/.exec(hit)[1]; reply = 'Your folder says: ' + window.__needle + ' [' + n + '].'; if (window.__mode === 'loose') reply += ' This part comes from nowhere in particular. It is also in [9].'; if (window.__mode === 'mixed') reply += ' I could not find that in the selected folders.'; }
      else reply = window.__mode === 'explain' ? 'The passages given speak of other things, not of this.\n\nI could not find that in the selected folders.' : '"I could not find that in the selected folders."';
    } else reply = 'An ordinary reply.';
    try { o.onToken && o.onToken(reply); } catch (e) { }
    return Promise.resolve({ text: reply, stats: {} });
  };
});
const waitReply = (p) => p.waitForFunction(() => { const m = curMsgs(); const l = m[m.length - 1]; return l && l.role === 'bot' && !l.live && !l.wake && (typeof liveBot === 'undefined' || !liveBot) && (!l.rag || l.rag.done || l.rag.called === false); }, null, { timeout: 180000 });
async function send(p, text) {
  const n0 = await p.evaluate(() => curMsgs().length);
  await p.fill('#chatInput', text); await p.evaluate(() => sendChat());
  await p.waitForFunction((n) => curMsgs().length > n + 1 || (curMsgs().length > n && curMsgs()[curMsgs().length - 1].role === 'bot'), n0, { timeout: 30000 });
  await waitReply(p); await p.waitForTimeout(400);
  return p.evaluate(() => { const m = curMsgs(); return JSON.parse(JSON.stringify(m[m.length - 1])); });
}
const lastSent = (p) => p.evaluate(() => window.__sent.length ? window.__sent[window.__sent.length - 1] : null);
const sentCount = (p) => p.evaluate(() => window.__sent.length);
const newChat = (p) => p.evaluate(() => { const c = { id: 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), title: 'New conversation', messages: [] }; state.chats.push(c); state.activeChat = c.id; saveState(); renderChat(); });
const plusItems = (p) => p.evaluate(() => { const b = document.getElementById('chatImgBtn'); b.click(); const items = [...document.querySelectorAll('#chatPlusMenu .pm-item .pm-txt')].map((x) => x.childNodes[0] ? x.childNodes[0].textContent.trim() : x.textContent.trim()); const sw = document.querySelector('#chatPlusMenu [data-rag-item] input'); const r = { items, checked: sw ? sw.checked : null }; closePlus(); return r; });

(async () => {
  await ensureServers();
  const runs = [];
  try {
    // ------------------------------------------------------------------------------------------ 1. no bridge
    note('1. a browser without the bridge');
    const A = await openBrowser('plain', false); runs.push(A); const pa = A.page;
    await boot(pa); await pa.waitForTimeout(2500);
    ok(await pa.evaluate(() => !window.IngRag && !!window.IngRagChat && window.__ingParts.p257 === 'running'), 'without the bridge: no folder search, the chat part runs');
    ok(!A.requests.some((u) => /\/rag\//.test(u)), 'nothing is fetched from rag/ in a browser');
    ok(!(await plusItems(pa)).items.includes('Your folders'), 'the + menu has no Your folders without the folder search');
    await newChat(pa);
    await pa.evaluate(() => {
      curMsgs().push({ role: 'me', text: 'When was the boiler serviced?', ragAsk: true });
      curMsgs().push({ role: 'bot', text: 'It was serviced on 3 May 2025 [1].', rag: { v: 1, q: 'When was the boiler serviced?', found: 1, given: 1, dropped: 0, called: true, done: 1, ok: true, flagged: [], badRefs: [], cited: [1],
        passages: [{ id: 7, fid: 1, folder: 'household_papers', file: 'home/boiler.md', chunk: 0, heading: 'Boiler', page: null, start: 0, end: 34, text: 'The boiler was serviced on 3 May 2025.' }] } });
      saveState(); renderChat(); });
    const shown1 = await pa.evaluate(() => { const d = [...document.querySelectorAll('#chatScroll .msg')].pop(); const me = [...document.querySelectorAll('#chatScroll .msg')].slice(-2)[0];
      return { cites: d.querySelectorAll('a.rag-cite').length, src: [...d.querySelectorAll('.rag-sources li')].map((x) => x.textContent), head: (d.querySelector('.rag-sources b') || {}).textContent, tag: !!me.querySelector('.rag-tag') }; });
    ok(shown1.cites === 1 && shown1.src.length === 1 && /household_papers\/home\/boiler\.md · Boiler/.test(shown1.src[0]) && shown1.head === 'From your folders' && shown1.tag, 'a reply made elsewhere shows its [1] link, its source and the tag on the question', shown1);
    await pa.click('#chatScroll .msg:last-child a.rag-cite');
    await pa.waitForSelector('#modalBox .rag-viewer');
    const v1 = await pa.evaluate(() => ({ title: document.getElementById('ragVTitle').textContent, read: document.querySelector('#modalBox .rag-vread').textContent, note: document.querySelector('#modalBox .rag-vnote').textContent, wide: document.getElementById('modalBox').classList.contains('rag-view') }));
    ok(v1.title === '[1] boiler.md' && /serviced on 3 May 2025/.test(v1.read) && /on the computer that read it/.test(v1.note) && v1.wide, 'the viewer shows the passage as it was read, and says where the file is', v1);
    await pa.keyboard.press('Escape'); await pa.waitForTimeout(300);
    ok(await pa.evaluate(() => !document.getElementById('modalRoot').classList.contains('open') && !document.getElementById('modalBox').classList.contains('rag-view') && document.activeElement && document.activeElement.classList.contains('rag-cite')), 'Escape closes the viewer, the window goes back to its width and the focus to the citation');

    // ------------------------------------------------------------------------------------------ 2. the switch
    note('2. the switch, with the bridge');
    await bridgePost('/admin/state', { dir: null });
    const B = await openBrowser('bridge', true); runs.push(B); const p = B.page;
    await boot(p);
    await p.waitForFunction(() => !!(window.IngRag && window.IngRag.prompt && window.IngRag.available()), null, { timeout: 60000 });
    await fakeModel(p); await newChat(p);
    let pl = await plusItems(p);
    const wi = pl.items.indexOf('Research'), ri = pl.items.indexOf('Your folders');
    ok(ri > 0 && wi === ri + 1 && pl.checked === false, 'Your folders is in the + menu, just before Research and Web search, off', pl.items);
    await p.evaluate(() => { state.webSearch = true; state.research = true; saveState(); paintChips(); });
    await p.evaluate(() => { document.getElementById('chatImgBtn').click(); });
    await p.click('#chatPlusMenu [data-rag-item]');
    const sw = await p.evaluate(() => ({ on: !!(state.rag && state.rag.on), web: !!state.webSearch, research: !!state.research, chip: !!document.querySelector('#chatChips .rag-chip'), webChip: [...document.querySelectorAll('#chatChips .cchip')].some((c) => /Web search|Research/.test(c.textContent)), checked: (document.querySelector('#chatPlusMenu [data-rag-item] input') || {}).checked }));
    ok(sw.on && !sw.web && !sw.research && sw.chip && !sw.webChip && sw.checked === true, 'switched on: Web search and Research go off, the chip shows, the menu switch is on', sw);
    await p.evaluate(() => closePlus());
    await p.evaluate(() => { const c = curChat(); c.kind = 'code'; paintChips(); });
    pl = await plusItems(p);
    ok(!pl.items.includes('Your folders') && !(await p.evaluate(() => !!document.querySelector('#chatChips .rag-chip'))), 'not offered in a Code conversation');
    await p.evaluate(() => { const c = curChat(); delete c.kind; saveState(); paintChips(); });

    // ------------------------------------------------------------------------------------------ 3. no folder yet
    note('3. no folder yet');
    let n0 = await sentCount(p);
    let r = await send(p, fact('R06').question);
    ok(r.text === NOT_FOUND && (await sentCount(p)) === n0 && r.rag && r.rag.called === false && r.rag.why === 'none', 'with no folder: NOT_FOUND, no model is called', { text: r.text, rag: r.rag });
    ok(await p.evaluate(() => /No folder has been added to the folder search yet/.test(([...document.querySelectorAll('#chatScroll .msg')].pop().textContent))), 'a note says where folders are added');
    ok(await p.evaluate(() => !document.querySelector('#chatScroll .msg:last-child .tag')), 'the reply is not marked as practice text');

    // ------------------------------------------------------------------------------------------ 4. two folders read
    note('4. reading household_papers and lab_notes (a few minutes)');
    await bridgePost('/admin/dialog', { answers: [path.join(FIX, 'household_papers'), path.join(FIX, 'lab_notes')] });
    const ids = await p.evaluate(async () => { const a = await IngRag.addFolder(), b = await IngRag.addFolder(); return { h: a.folder.id, l: b.folder.id }; });
    const t1 = Date.now();
    const sums = await p.evaluate(async (ids) => { const a = await IngRag.indexFolder(ids.h), b = await IngRag.indexFolder(ids.l); return [a, b].map((s) => ({ files: s.files, chunks: s.chunks, failed: s.files.failed })); }, ids);
    note('read in ' + ((Date.now() - t1) / 60000).toFixed(1) + ' min: ' + JSON.stringify(sums));
    ok(sums[0].files.failed === 0 && sums[1].files.failed === 0 && sums[0].chunks > 0 && sums[1].chunks > 0, 'both folders read, no file failed', sums);
    const users = await p.evaluate(async (ids) => { const s = IngRag._store; const b = await s.principal.ensure({ name: 'test-b' }); await s.acl.grant({ folderId: ids.l, principalId: b.id }); const c = await s.principal.ensure({ name: 'test-c' }); return { b: b.id, c: c.id }; }, ids);
    ok(users.b > 0 && users.c > 0, 'test-b may read lab_notes only, test-c nothing');

    // ------------------------------------------------------------------------------------------ 5. grounded turns
    const hits = [];
    for (const id of ['R06', 'L08', 'R05', 'L07']) {
      const f = fact(id); note('5. ' + id + ' (' + f.type + '): ' + f.question);
      await p.evaluate((nd) => { window.__needle = nd; window.__mode = ''; }, f.needle);
      n0 = await sentCount(p);
      r = await send(p, f.question);
      const sent = await lastSent(p);
      const given = (r.rag && r.rag.passages) || [];
      const sys = sent && sent[0] && sent[0].content || '';
      ok((await sentCount(p)) === n0 + 1 && sent.length === 2 && sent[0].role === 'system' && sent[1].role === 'user' && sent[1].content === f.question, id + ': the model read exactly two messages: the system prompt and her question', sent && sent.map((m) => m.role + ':' + m.content.length));
      const labels = sys.match(/^\[\d+\] .+$/gm) || [];
      ok(sys.startsWith(HEAD + '[1] ') && sys.endsWith('\n\nQuestion: ' + f.question) && labels.length === given.length && given.length >= 1 && given.length <= 5, id + ': her system prompt word for word, the passages numbered [1] to [' + given.length + '], the question last', labels);
      ok(labels.every((l, i) => l.startsWith('[' + (i + 1) + '] ' + given[i].folder + '/' + given[i].file + '#' + given[i].chunk)) && given.every((g) => sys.indexOf(g.text.trim()) >= 0), id + ': each label is {file_path}#{chunk_index} (heading) and each passage\'s text is there', labels.slice(0, 2));
      ok(!/remember|Web search|web results|Ingenium's rules/i.test(sys.slice(0, HEAD.length + 10)) && !/What the person asked you to remember/.test(sys), id + ': nothing else goes with it (no memory, no web, no house rules)');
      const hitN = given.findIndex((g) => g.text.indexOf(f.needle) >= 0) + 1;
      if (!hitN) {   // retrieval did not bring the passage with the answer (phase 2's Recall@5 is 33 of 35): the stand-in says NOT_FOUND
        ok(r.text === NOT_FOUND && r.rag.notFound === true, id + ': the search did not bring the passage with the answer among the five, and the reply is NOT_FOUND (a retrieval miss, noted)', given.map((g) => g.file));
        continue;
      }
      hits.push(f.type);
      ok(r.text === 'Your folder says: ' + f.needle + ' [' + hitN + '].' && r.rag.ok === true && !r.rag.flagged.length, id + ': the passage with the answer was given ([' + hitN + ']), the reply cites it, nothing flagged', { hitN, text: r.text, flagged: r.rag.flagged });
      const dom = await p.evaluate(() => { const d = [...document.querySelectorAll('#chatScroll .msg')].pop(); return { cites: [...d.querySelectorAll('a.rag-cite')].map((a) => a.getAttribute('data-rag-n')), src: d.querySelectorAll('.rag-sources li').length, flag: !!d.querySelector('.rag-flag'), head: (d.querySelector('.rag-sources b') || {}).textContent }; });
      ok(dom.cites.length === 1 && dom.cites[0] === String(hitN) && dom.src === given.length && !dom.flag && dom.head === 'From your folders', id + ': [' + hitN + '] is a link, ' + given.length + ' sources listed', dom);
      await p.click('#chatScroll .msg:last-child a.rag-cite');
      await p.waitForSelector('#modalBox .rag-viewer');
      await p.waitForFunction(() => { const n = document.querySelector('#modalBox .rag-vnote'); return n && !/^Opening/.test(n.textContent); }, null, { timeout: 120000 });
      const v = await p.evaluate(() => ({ note: document.querySelector('#modalBox .rag-vnote').textContent, mark: (document.querySelector('#modalBox .rag-vtext mark') || {}).textContent || null, readHidden: document.querySelector('#modalBox .rag-vread').hidden, title: document.getElementById('ragVTitle').textContent, visible: (() => { const m = document.querySelector('#modalBox .rag-vtext mark'), b = document.querySelector('#modalBox .rag-vtext'); if (!m || !b) return false; const a = m.getBoundingClientRect(), c = b.getBoundingClientRect(); return a.top < c.bottom && a.bottom > c.top; })() }));
      const want = given[hitN - 1];
      ok(v.mark === want.text && v.readHidden && /marked in the file/.test(v.note) && v.visible && v.title === '[' + hitN + '] ' + want.file.split('/').pop(), id + ': the viewer opens the file and marks the passage at its place' + (f.type === 'pdf' ? ' on its page' : ''), { note: v.note, mark: v.mark && v.mark.slice(0, 80), title: v.title, visible: v.visible });
      if (f.type === 'pdf') ok(new RegExp('^Page ' + want.page + ' of \\d+\\. ').test(v.note), id + ': the PDF\'s page is named', v.note);
      await p.keyboard.press('Escape'); await p.waitForTimeout(200);
    }
    ok(hits.length >= 3 && hits.includes('md') && hits.includes('pdf'), 'grounded turns with the answer cited: ' + hits.length + ' of 4 (a Markdown file and a PDF among them)', hits);

    // ------------------------------------------------------------------------------------------ 6. flagged
    note('6. a reply with a sentence without a citation');
    await p.evaluate((nd) => { window.__needle = nd; window.__mode = 'loose'; }, fact('R09').needle);
    r = await send(p, fact('R09').question);
    // "This part comes from nowhere in particular." has no citation; "It is also in [9]." cites a passage it was not given, so it too
    // carries no citation to a passage given
    ok(r.rag.ok === false && r.rag.flagged.length === 2 && /comes from nowhere/.test(r.rag.flagged[0]) && /\[9\]/.test(r.rag.flagged[1]) && r.rag.badRefs.join() === '9' && r.rag.cited.length === 1, 'the sentence without a citation, and the one citing a passage it was not given, are found', { flagged: r.rag.flagged, bad: r.rag.badRefs });
    const fl = await p.evaluate(() => { const d = [...document.querySelectorAll('#chatScroll .msg')].pop(); const f = d.querySelector('.rag-flag'); return f ? f.textContent : null; });
    ok(fl && /Check these 2 sentences/.test(fl) && /comes from nowhere/.test(fl) && /cites \[9\], which is not among the passages/.test(fl), 'both are named under the reply, and [9] is said to be no passage given', fl);

    // ------------------------------------------------------------------------------------------ 6b. the second pass (6.65, her choice)
    note('6b. the second pass: the model is asked once more to cite every sentence');
    const n6 = await sentCount(p);
    ok(r.rag.recheck === 'same' && n6 >= 2 && (await lastSent(p)).length === 4, 'item 6\'s reply was asked for once more (four messages), and the second answer, no better, left the first in place with its flags', { recheck: r.rag.recheck, msgs: (await lastSent(p)).length });
    await p.evaluate(() => { window.__recheck = 'fix'; });
    let s0 = await sentCount(p);
    r = await send(p, fact('R09').question);
    const two = await p.evaluate(() => window.__sent.slice(-2));
    const [first, second] = two;
    ok((await sentCount(p)) === s0 + 2 && second.length === 4 && second[0].content === first[0].content && second[1].role === 'user' && second[1].content === first[1].content && second[2].role === 'assistant' && /comes from nowhere/.test(second[2].content) && /^Check your answer against the context above\./.test(second[3].content),
      'the second call carries her system prompt and passages unchanged, the question, the first answer, and the request to cite every sentence', second.map((m) => m.role + ':' + m.content.slice(0, 50)));
    ok(r.rag.recheck === 'better' && r.rag.ok === true && !r.rag.flagged.length && !/comes from nowhere/.test(r.text) && /comes from nowhere/.test(r.rag.draft || '') && /\[1\]|\[2\]|\[3\]|\[4\]|\[5\]/.test(r.text), 'the better second answer is kept, every sentence cited, and the first is kept beside it', { text: r.text, recheck: r.rag.recheck });
    const ui6 = await p.evaluate(() => { const d = [...document.querySelectorAll('#chatScroll .msg')].pop(); return { note: [...d.querySelectorAll('.rag-note')].map((x) => x.textContent).join(' | '), draft: !!d.querySelector('details.rag-draft'), flag: !!d.querySelector('.rag-flag'), advice: (d.querySelector('.rag-advice') || {}).textContent || '' }; });
    ok(/Checked again/.test(ui6.note) && ui6.draft && !ui6.flag, 'under the reply: "Checked again", the first answer in a fold, no flags', ui6);
    ok(/Qwen3\.5 9B cited every sentence in 16 of 20/.test(ui6.advice) && /Models page|Use /.test(ui6.advice), 'a small model is told that a larger one cites more carefully, with a key to it', ui6.advice);
    await p.evaluate(() => { state.rag.recheck = false; saveState(); window.__recheck = ''; });
    s0 = await sentCount(p);
    r = await send(p, fact('R09').question);
    ok((await sentCount(p)) === s0 + 1 && !r.rag.recheck && r.rag.flagged.length === 2, 'with the check turned off (Settings): one call, the flags named as before', { calls: (await sentCount(p)) - s0, recheck: r.rag.recheck });
    await p.evaluate(() => { delete state.rag.recheck; saveState(); window.__mode = ''; });

    // ------------------------------------------------------------------------------------------ 7. NOT_FOUND from the model
    note('7. the model says NOT_FOUND');
    await p.evaluate(() => { window.__needle = 'a needle in no folder'; window.__mode = ''; });
    n0 = await sentCount(p);
    r = await send(p, 'What colour is the lighthouse at the end of the harbour wall?');
    ok((await sentCount(p)) === n0 + 1 && r.text === NOT_FOUND && r.rag.notFound === true && r.rag.called === true, 'the model was asked and its quoted NOT_FOUND became exactly NOT_FOUND', { text: r.text });
    ok(await p.evaluate(() => (([...document.querySelectorAll('#chatScroll .msg')].pop().querySelector('.rag-sources b')) || {}).textContent === 'Looked at in your folders'), 'its sources are listed as what was looked at');
    // 6.63 (the evaluation found a small model explaining around it): the sentence with words around it and no citation is NOT_FOUND
    await p.evaluate(() => { window.__mode = 'explain'; });
    r = await send(p, 'What colour is the lighthouse at the end of the harbour wall?');
    ok(r.text === NOT_FOUND && r.rag.notFound === true && r.rag.called === true, 'a reply that explains and then says the NOT_FOUND sentence, citing no passage, became exactly NOT_FOUND', { text: r.text });
    await p.evaluate((nd) => { window.__needle = nd; window.__mode = 'mixed'; }, fact('R09').needle);
    r = await send(p, fact('R09').question);
    ok(r.text !== NOT_FOUND && !r.rag.notFound && (r.rag.flagged || []).length === 1 && /could not find that/.test(r.rag.flagged[0]), 'a reply that cites a passage and also says the NOT_FOUND sentence stays an answer, with that sentence flagged', { text: r.text, flagged: r.rag.flagged });
    await p.evaluate(() => { window.__mode = ''; });

    // ------------------------------------------------------------------------------------------ 8. ACL end to end
    note('8. test-b asks what only household_papers answers');
    const f8 = fact('R09');
    const direct = await p.evaluate(async ([q, h]) => { const b = await IngRag.retrieve(q, 'test-b'), m = await IngRag.retrieve(q, 'me'); return { b: b.passages.map((x) => x.folderId), bfts: b.fts.map((x) => x.folderId), bvec: b.vec.map((x) => x.folderId), me: m.passages.map((x) => x.folderId), h }; }, [f8.question, ids.h]);
    ok(direct.b.length > 0 && !direct.b.includes(ids.h) && !direct.bfts.includes(ids.h) && !direct.bvec.includes(ids.h), 'retrieve() for test-b gives no passage of household_papers, in neither search', direct);
    ok(direct.me.includes(ids.h), 'for "me" the same question finds household_papers (the control)');
    await p.evaluate((nd) => { IngRagChat._as('test-b'); window.__needle = nd; window.__mode = ''; }, f8.needle);
    n0 = await sentCount(p);
    r = await send(p, f8.question);
    const s8 = await lastSent(p);
    ok(r.rag.passages.every((g) => g.fid !== ids.h) && s8 && s8[0].content.indexOf('household_papers/') < 0, 'the chat gives the model no passage of household_papers for test-b');
    ok(r.text === NOT_FOUND, 'the end-to-end response equals NOT_FOUND', r.text);

    // ------------------------------------------------------------------------------------------ 9. zero passages
    note('9. test-c, who may read nothing');
    await p.evaluate(() => IngRagChat._as('test-c'));
    n0 = await sentCount(p);
    r = await send(p, fact('L03').question);
    ok(r.text === NOT_FOUND && (await sentCount(p)) === n0 && r.rag.called === false && r.rag.found === 0, 'zero passages: NOT_FOUND and no model called');
    await p.evaluate(() => IngRagChat._as('me'));

    // ------------------------------------------------------------------------------------------ 10. a message with a file
    note('10. a message with a file');
    await p.evaluate(() => stageText('notes.txt', 'A note about the garden shed.', false));
    n0 = await sentCount(p);
    r = await send(p, 'What does my note say?');
    const s10 = await lastSent(p);
    ok((await sentCount(p)) === n0 + 1 && !r.rag && /Answered without your folders/.test(r.note || '') && !/^You are answering strictly/.test((s10[0] || {}).content || ''), 'answered without the folders, with a note', { note: r.note });

    // ------------------------------------------------------------------------------------------ 11. a connection
    note('11. a connection (the Anthropic stand-in)');
    await p.evaluate((M) => { state.cloud = { provider: 'anthropic', base: M, key: 'sk-test-123', model: 'claude-opus-5-5', models: ['claude-opus-5-5'], on: true }; state.chatSource = 'cloud'; state.thinking = false; saveState(); }, MOCK);
    const f11 = fact('L01');
    const before11 = JSON.parse(fs.readFileSync(MOCKLOG, 'utf8')).filter((x) => x.method === 'POST' && /\/v1\/messages$/.test(x.path)).length;
    r = await send(p, f11.question);
    const reqs = JSON.parse(fs.readFileSync(MOCKLOG, 'utf8')).filter((x) => x.method === 'POST' && /\/v1\/messages$/.test(x.path)).slice(before11);
    const body = reqs.length ? reqs[0].body : {};
    const sysOf = (b) => typeof b.system === 'string' ? b.system : Array.isArray(b.system) ? b.system.map((x) => x.text || '').join('') : '';
    const um = (body.messages || []).map((m) => ({ role: m.role, text: typeof m.content === 'string' ? m.content : (m.content || []).map((c) => c.text || '').join('') }));
    ok(reqs.length >= 1 && sysOf(body).startsWith(HEAD + '[1] ') && sysOf(body).endsWith('\n\nQuestion: ' + f11.question) && um.length === 1 && um[0].role === 'user' && um[0].text === f11.question, 'the connection receives her system prompt and only the question', { n: reqs.length, sys: sysOf(body).slice(0, 80), msgs: um.map((m) => m.role + ':' + m.text.slice(0, 40)) });
    ok(r.text.trim() === 'Hello from the stand-in.' && r.rag.ok === false && r.rag.flagged.length === 1, 'a reply with no citation is flagged under it', r.rag && r.rag.flagged);
    const b2 = reqs.length > 1 ? reqs[1].body : {}, um2 = (b2.messages || []).map((m) => ({ role: m.role, text: typeof m.content === 'string' ? m.content : (m.content || []).map((c) => c.text || '').join('') }));
    ok(reqs.length === 2 && sysOf(b2) === sysOf(body) && um2.length === 3 && um2[1].role === 'assistant' && /^Check your answer against the context above\./.test(um2[2].text) && r.rag.recheck === 'same', 'the second pass goes through the same connection, with the first answer and the request to cite every sentence (6.65)', { n: reqs.length, msgs: um2.map((m) => m.role + ':' + m.text.slice(0, 40)), recheck: r.rag.recheck });
    await p.evaluate(() => { state.chatSource = 'local'; state.cloud.on = false; saveState(); });

    // ------------------------------------------------------------------------------------------ 12. a reload
    note('12. a reload');
    const chatId = await p.evaluate(() => state.activeChat);
    await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(1500);
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
    await p.waitForTimeout(500);
    // Ingenium opens a new conversation when it starts: the one with the replies is opened again, as she would from the list
    await p.evaluate((id) => { try { go('chat'); state.activeChat = id; renderChat(); } catch (e) { } }, chatId);
    await p.waitForFunction(() => !!(window.IngRag && window.IngRag.prompt), null, { timeout: 60000 }); await p.waitForTimeout(800);
    const after = await p.evaluate(() => ({ cites: document.querySelectorAll('#chatScroll a.rag-cite').length, lists: document.querySelectorAll('#chatScroll .rag-sources').length, chip: !!document.querySelector('#chatChips .rag-chip'), on: !!(state.rag && state.rag.on), saved: JSON.stringify(curMsgs()).indexOf('__ragPrep') < 0 }));
    ok(after.cites >= 3 && after.lists >= 5 && after.chip && after.on && after.saved, 'after a reload the replies keep their links and sources, the switch stays on, nothing internal is saved', after);

    // ------------------------------------------------------------------------------------------ 13. the chip's ✕
    note('13. the chip turns it off');
    await fakeModel(p);
    await p.click('#chatChips .rag-chip .cx');
    ok(await p.evaluate(() => !(state.rag && state.rag.on) && !document.querySelector('#chatChips .rag-chip')), 'the ✕ turns it off');
    r = await send(p, 'Hello there.');
    const s13 = await lastSent(p);
    ok(!r.rag && !/^You are answering strictly/.test((s13[0] || {}).content || ''), 'the next message is an ordinary one');

    // ------------------------------------------------------------------------------------------ 14. nothing went out
    for (const run of runs) {
      ok(!run.external.length, run.name + ': no request left this computer (the stand-ins aside)', run.external.slice(0, 5));
      ok(!run.pageErrors.length, run.name + ': no page error', run.pageErrors.slice(0, 5));
    }
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 1500)); }
  finally {
    for (const run of runs) { try { await run.ctx.close(); } catch (e) { } }
    for (const s of started) { try { s.kill(); } catch (e) { } }
  }
  console.log('\n' + pass + ' passed, ' + fail + ' failed in ' + ((Date.now() - T0) / 60000).toFixed(1) + ' min');
  fs.writeFileSync(path.join(OUTA, 'result.json'), JSON.stringify({ pass, fail, minutes: +((Date.now() - T0) / 60000).toFixed(1) }, null, 1));
  process.exit(fail ? 1 : 0);
})();
