// Folder search, phase 6 in the chat (Ingenium 7.08, build/modules/r257.js and r202.js, rag/prompt.js guard), on the BUILT page in
// headless Chromium, with the desktop app's folder bridge standing in (rig/rag_bridge.py, rig/rag_bridge_shim.js), a stand-in model on
// this computer and a stand-in connection (rig/mockcloud.py). Her choices (14 November 2026, "I agree with your recommendation"):
//   1. Settings, Models and AI, Folders for the chat: two switches, both on: the detail check takes out what no passage holds; Ingenium
//      asks each time who answers from her folders
//   2. with Your folders on and two who may answer (this computer's model and a connection she keeps), sending asks first: a raised
//      sheet, each choice a key, the connection recommended and what leaves the computer named beside it
//   3. this computer chosen: its model answers; the reply says who answered, as she chose, and the check's note says every sentence holds
//   4. a reply with a sentence no passage holds and a citation to a passage not given: both taken out, listed under the reply, the answer
//      before the check kept beside it; the text keeps its cited sentence
//   5. Not now: nothing is sent, and the chat says so
//   6. the connection chosen: the request goes to it with her grounding prompt; the reply says who answered
//   7. Ask me each time turned off in the sheet: the next question is not asked about
//   8. the check off (mark only): the sentences stay in the answer and are marked under it
//   9. no request leaves this computer (the stand-ins aside), no page error
//   node rig/t_708_rag6.js http://127.0.0.1:8189/ <out folder>
//   Environment: RAG_E2E (the page folder), RAG_BRIDGE (default http://127.0.0.1:8199).
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [BASE0, OUT] = process.argv.slice(2);
if (!BASE0 || !OUT) { console.log('usage: node rig/t_708_rag6.js <page server address> <out folder>'); process.exit(2); }
const BASE = BASE0.replace(/\/?$/, '/'); const ORIGIN = new URL(BASE).origin; const PAGE = BASE + 'ingenium.html';
const BRIDGE = (process.env.RAG_BRIDGE || 'http://127.0.0.1:8199').replace(/\/$/, ''); const BRIDGE_ORIGIN = new URL(BRIDGE).origin;
const MOCK_PORT = 18797, MOCK = 'http://127.0.0.1:' + MOCK_PORT;
const SRC = path.resolve(__dirname, '..'); const FIX = path.join(SRC, 'rag', 'fixtures');
const FACTS = JSON.parse(fs.readFileSync(path.join(FIX, 'FACTS.json'), 'utf8')).facts;
const fact = (id) => FACTS.find((f) => f.id === id);
fs.mkdirSync(OUT, { recursive: true }); const OUTA = path.resolve(OUT); const MOCKLOG = path.join(OUTA, 'mock_req.json');
let pass = 0, fail = 0; const T0 = Date.now();
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; return !!c; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function reachable(url) { try { const r = await fetch(url); return r.ok; } catch (e) { return false; } }
async function bridgePost(p, body) { const r = await fetch(BRIDGE + p, { method: 'POST', body: JSON.stringify(body) }); return r.json(); }
const started = [];
async function ensureServers() {
  if (!(await reachable(PAGE))) throw new Error('the page server does not answer at ' + PAGE);
  if (!(await reachable(BRIDGE + '/'))) {
    started.push(cp.spawn('python3', [path.join(SRC, 'rig', 'rag_bridge.py'), new URL(BRIDGE).port, '--state', path.join(OUTA, 'bridge_state')], { stdio: 'ignore' }));
    for (let i = 0; i < 40 && !(await reachable(BRIDGE + '/')); i++) await sleep(250);
  }
  fs.writeFileSync(MOCKLOG, '[]');
  started.push(cp.spawn('python3', [path.join(SRC, 'rig', 'mockcloud.py'), String(MOCK_PORT), MOCKLOG], { stdio: 'ignore' }));
  await sleep(800);
}
const ALLOWED = (u) => u.origin === ORIGIN || u.origin === BRIDGE_ORIGIN || u.origin === MOCK || /^(data|blob|about):/.test(u.protocol);
// the stand-in model on this computer: it answers with the passage that holds window.__needle; __mode 'loose' adds a sentence no
// passage holds and a citation to a passage it was not given
const standIn = (p) => p.evaluate(() => {
  state.models = state.models || []; if (!state.models.some((m) => m.id === 'rag-test')) state.models.push({ id: 'rag-test', customName: 'Stand-in (test)', fileState: 'ready', sizeBytes: 1, effort: 3, tokens: 1024, ctx: 32768 });
  state.activeModelId = 'rag-test'; Engine.modelId = 'rag-test'; Engine.status = 'ready'; Engine.adapter = { hasImageInput: false };
  state.chatSource = 'local'; if (state.cloud) state.cloud.on = false; state.thinking = false; state.rag = state.rag || {}; state.rag.recheck = false;
  document.getElementById('ctlCtx').value = '32768'; window.__sent = [];
  Engine.generate = function (o) {
    const msgs = o.messages.map((m) => ({ role: m.role, content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) }));
    window.__sent.push(msgs);
    const sys = msgs[0] && msgs[0].role === 'system' ? msgs[0].content : '';
    const blocks = sys.split(/\n\n(?=\[\d+\] )|\nContext:\n/).filter((b) => /^\[\d+\] /.test(b));
    const hit = window.__needle ? blocks.find((b) => b.indexOf(window.__needle) >= 0) : null;
    let reply = '"I could not find that in the selected folders."';
    if (hit) { const n = /^\[(\d+)\]/.exec(hit)[1]; reply = 'Your folder says: ' + window.__needle + ' [' + n + '].'; if (window.__mode === 'loose') reply += ' This part comes from nowhere in particular. It is also in [9].'; }
    try { o.onToken && o.onToken(reply); } catch (e) { }
    return Promise.resolve({ text: reply, stats: {} });
  };
});
const last = (p) => p.evaluate(() => { const m = curMsgs(); return JSON.parse(JSON.stringify(m[m.length - 1])); });
const waitReply = (p) => p.waitForFunction(() => { const m = curMsgs(); const l = m[m.length - 1]; return l && l.role === 'bot' && !l.live && (typeof liveBot === 'undefined' || !liveBot) && (!l.rag || l.rag.done || l.rag.called === false); }, null, { timeout: 120000 });
async function ask(p, text) { await p.fill('#chatInput', text); await p.evaluate(() => sendChat()); }
async function sheet(p) { await p.waitForSelector('#ragWho', { timeout: 15000 }); await p.waitForTimeout(500);
  return p.evaluate(() => { const s = document.getElementById('ragWho'); const r = s.getBoundingClientRect(); return { opts: [...s.querySelectorAll('.rw-opt')].map((b) => ({ name: b.querySelector('.rw-name').textContent, rec: !!b.querySelector('.rw-badge') && b.querySelector('.rw-badge').textContent === 'Recommended', away: (b.querySelector('.rw-away') || {}).textContent || '', btn: b.classList.contains('btn'), shadow: getComputedStyle(b).boxShadow })), shadow: getComputedStyle(s).boxShadow, inWindow: r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth, focus: document.activeElement && document.activeElement.classList.contains('rw-opt') ? document.activeElement.querySelector('.rw-name').textContent : '' }; }); }
const choose = (p, re) => p.evaluate((src) => { const b = [...document.querySelectorAll('#ragWho .rw-opt')].find((x) => new RegExp(src).test(x.querySelector('.rw-name').textContent)); b.click(); }, re.source);

(async () => {
  await ensureServers();
  const profile = path.join(OUTA, 'profile'); fs.rmSync(profile, { recursive: true, force: true });
  const ctx = await pw.chromium.launchPersistentContext(profile, { headless: true, viewport: { width: 1280, height: 900 } }); ctx.setDefaultTimeout(60000);
  const external = [], errs = [];
  await ctx.route((u) => !ALLOWED(u), (route) => { external.push(route.request().url()); route.abort(); });
  await ctx.addInitScript('window.__RAG_BRIDGE__ = ' + JSON.stringify(BRIDGE)); await ctx.addInitScript({ path: path.join(SRC, 'rig', 'rag_bridge_shim.js') });
  await ctx.addInitScript(() => { window.__ING_RAG_TEST__ = true; });
  const p = ctx.pages()[0] || await ctx.newPage(); p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  try {
    await p.goto(PAGE); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(800);
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
    await p.waitForTimeout(500);
    await p.waitForFunction(() => !!(window.IngRag && IngRag.prompt && typeof IngRag.prompt.guard === 'function'), null, { timeout: 90000 });
    // 1. the card's two switches
    await p.evaluate(() => { go('settings'); }); await p.waitForTimeout(800);
    await p.evaluate(() => { const c = document.getElementById('ragCard'); if (c) c.scrollIntoView(); }); await p.waitForFunction(() => !!document.getElementById('ragStrict'), null, { timeout: 30000 }).catch(() => {});
    const sw = await p.evaluate(() => ({ strict: (document.getElementById('ragStrict') || {}).checked, ask: (document.getElementById('ragAskWho') || {}).checked, words: (document.getElementById('ragAskWho') || { parentNode: { textContent: '' } }).parentNode.textContent }));
    ok(sw.strict === true && sw.ask === true && /Ask me each time/.test(sw.words), '1. Folders for the chat holds both switches, both on: take out what no passage holds; ask me each time', sw);
    // a folder read for real, the stand-in on this computer and a kept connection
    await bridgePost('/admin/dialog', { answers: [path.join(FIX, 'household_papers')] });
    const fid = await p.evaluate(async () => { const a = await IngRag.addFolder(); await IngRag.indexFolder(a.folder.id); return a.folder.id; });
    ok(!!fid, 'household_papers is read through the bridge');
    await p.evaluate(() => go('chat')); await p.waitForTimeout(600);
    await standIn(p);
    await p.evaluate((M) => { state.cxKept = [{ id: 'anthropic|' + M, provider: 'anthropic', base: M, key: 'sk-test-123', model: 'claude-opus-5-5', models: ['claude-opus-5-5'], at: Date.now() }]; saveState(); IngRagChat.setOn(true); }, MOCK);
    const R09 = fact('R09');
    await p.evaluate((nd) => { window.__needle = nd; window.__mode = ''; }, R09.needle);
    // 2. the sheet
    await ask(p, R09.question || 'Until when does the dishwasher\'s warranty run?');
    const sh = await sheet(p);
    ok(sh.opts.length === 2 && /^This computer: Stand-in/.test(sh.opts[0].name) && /claude-opus-5-5/.test(sh.opts[1].name), '2. sending asks who answers: this computer\'s model and the kept connection', sh.opts);
    ok(sh.opts[1].rec && !sh.opts[0].rec && /go to .+\. Nothing else does\./.test(sh.opts[1].away) && !sh.opts[0].away, 'the connection is recommended, and what leaves this computer is named beside it alone', sh.opts);
    ok(sh.opts.every((o) => o.btn && o.shadow && o.shadow !== 'none') && sh.shadow && sh.shadow !== 'none' && sh.inWindow, 'the sheet and its choices are raised (no flat surface) and stand in the window', sh);
    ok(sh.focus === sh.opts[1].name, 'the recommended choice holds the focus', sh.focus);
    ok((await p.evaluate(() => window.__sent.length)) === 0, 'nothing is sent while she chooses');
    // 3. this computer
    await choose(p, /^This computer/); await waitReply(p); await p.waitForTimeout(500);
    let m = await last(p);
    ok(m.rag && /\[\d\]/.test(m.text) && m.text.indexOf(R09.needle) >= 0 && m.rag.who && /Stand-in/.test(m.rag.who), '3. this computer\'s model answers, with its citation; who answered is kept with the reply', { text: m.text, who: m.rag && m.rag.who });
    let dom = await p.evaluate(() => { const ds = [...document.querySelectorAll('.msg')]; const d = ds[ds.length - 1]; const ck = d.querySelector('.rag-check'); return { notes: [...d.querySelectorAll('.rag-note')].map((x) => x.textContent), check: ck ? ck.textContent : '', cut: ck ? ck.classList.contains('cut') : null, shadow: ck ? getComputedStyle(ck).boxShadow : '' }; });
    ok(dom.notes.some((t) => /^Answered by This computer: Stand-in \(test\), as you chose\.$/.test(t)) && /every sentence holds/.test(dom.check) && dom.cut === false && dom.shadow !== 'none', 'the reply says who answered, and the raised note says every sentence holds', dom);
    // 4. a sentence no passage holds, and a citation to a passage not given
    await p.evaluate(() => { window.__mode = 'loose'; });
    await ask(p, 'When does the dishwasher warranty end?'); await sheet(p); await choose(p, /^This computer/); await waitReply(p); await p.waitForTimeout(500);
    m = await last(p);
    ok(m.text.indexOf(R09.needle) >= 0 && !/nowhere in particular|\[9\]/.test(m.text) && m.rag.guarded && m.rag.guarded.mode === 'strict' && m.rag.guarded.removed.length === 2 && /nowhere in particular/.test(m.rag.guarded.before || ''), '4. both are taken out; the cited sentence stays; the answer before the check is kept', m.rag && m.rag.guarded);
    dom = await p.evaluate(() => { const ds = [...document.querySelectorAll('.msg')]; const d = ds[ds.length - 1]; const ck = d.querySelector('.rag-check'); return { cut: ck && ck.classList.contains('cut'), open: ck && ck.open, items: ck ? [...ck.querySelectorAll('li')].map((x) => x.textContent) : [], before: !!(ck && ck.querySelector('.rc-before')), flag: !!d.querySelector('.rag-flag') }; });
    ok(dom.cut && dom.open && dom.items.length === 2 && dom.items.every((t) => /names no passage|holds it/.test(t)) && dom.before && !dom.flag, 'the note lists both with the reason, open, with the answer before the check beside them; nothing is left to flag', dom);
    // 5. Not now
    const sent0 = await p.evaluate(() => window.__sent.length);
    await ask(p, 'What else is in the warranty notes?'); await sheet(p);
    await p.evaluate(() => { [...document.querySelectorAll('#ragWho .btn')].find((b) => b.textContent.trim() === 'Not now').click(); }); await p.waitForTimeout(800);
    m = await last(p);
    ok(!(await p.evaluate(() => !!document.getElementById('ragWho'))) && m.role === 'bot' && /^Not sent to a model/.test(m.text) && (await p.evaluate(() => window.__sent.length)) === sent0, '5. Not now: the sheet closes, nothing is sent, and the chat says so', m.text);
    // 6. the connection
    await p.evaluate(() => { window.__mode = ''; });
    await ask(p, R09.question || 'Until when does the dishwasher\'s warranty run?'); await sheet(p); await choose(p, /claude-opus-5-5/); await waitReply(p); await p.waitForTimeout(600);
    const reqs = JSON.parse(fs.readFileSync(MOCKLOG, 'utf8')); const lastReq = reqs[reqs.length - 1] || {};
    const body = typeof lastReq.body === 'string' ? lastReq.body : JSON.stringify(lastReq.body || {});
    m = await last(p);
    ok(reqs.length >= 1 && /You are answering strictly from the provided context/.test(body) && m.rag && /claude-opus-5-5/.test(m.rag.who || ''), '6. the connection chosen: the request goes to it with her grounding prompt; the reply says who answered', { n: reqs.length, who: m.rag && m.rag.who });
    // 7. Ask me each time, off
    await standIn(p); await p.evaluate(() => { window.__mode = ''; });
    await ask(p, R09.question || 'Until when does the dishwasher\'s warranty run?'); await sheet(p);
    await p.evaluate(() => { const cb = document.querySelector('#ragWho .rw-foot input'); cb.click(); });
    await choose(p, /^This computer/); await waitReply(p); await p.waitForTimeout(400);
    await ask(p, R09.question || 'Until when does the dishwasher\'s warranty run?'); await p.waitForTimeout(700);
    const asked = await p.evaluate(() => !!document.getElementById('ragWho'));
    await waitReply(p); m = await last(p);
    ok(!asked && (await p.evaluate(() => state.rag.ask)) === false && m.text.indexOf(R09.needle) >= 0, '7. Ask me each time turned off in the sheet: the next question goes straight to the model chosen', { asked });
    // 8. mark only
    await p.evaluate(() => { state.rag.strict = false; saveState(); window.__mode = 'loose'; });
    await ask(p, 'When does the dishwasher warranty end?'); await waitReply(p); await p.waitForTimeout(500);
    m = await last(p);
    dom = await p.evaluate(() => { const ds = [...document.querySelectorAll('.msg')]; const d = ds[ds.length - 1]; const ck = d.querySelector('.rag-check'); return ck ? ck.textContent : ''; });
    ok(/nowhere in particular/.test(m.text) && m.rag.guarded && m.rag.guarded.mode === 'mark' && /marked here, not taken out/.test(dom), '8. the check off: the sentences stay in the answer and are marked under it', { text: m.text, note: dom.slice(0, 200) });
    await p.screenshot({ path: path.join(OUTA, 'rag6_chat.png') });
    // the sheet by night, for the eye
    await p.evaluate(() => { state.theme = 'night'; applyTheme(); state.rag.ask = true; state.rag.strict = true; saveState(); window.__mode = ''; });
    await ask(p, 'Until when does the dishwasher warranty run?'); await sheet(p); await p.screenshot({ path: path.join(OUTA, 'rag6_sheet_night.png') });
    await p.keyboard.press('Escape'); await p.waitForTimeout(600);
    ok(!(await p.evaluate(() => !!document.getElementById('ragWho'))), 'Escape closes the sheet');
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 600)); }
  ok(external.length === 0, '9. no request left this computer (the stand-ins aside)', external.slice(0, 5));
  ok(errs.length === 0, 'no page error', errs.slice(0, 5));
  console.log('\n' + pass + ' passed, ' + fail + ' failed in ' + ((Date.now() - T0) / 60000).toFixed(1) + ' min');
  await ctx.close(); started.forEach((c) => { try { c.kill(); } catch (e) {} });
  process.exit(fail ? 1 : 0);
})();
