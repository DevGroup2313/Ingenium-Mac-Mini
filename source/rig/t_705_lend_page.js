// Ingenium 6.9.3 · models lent between her devices, seen from the page (modules/r205.js and the R205 edits in build_page.py), in Chromium.
// The owner's words (31 October 2026): "I have two 16 GB RAM HP laptops, I want to be able to use it as a server of sorts for my macbook pro
// and run its stronger models on the macbook pro or my fire tablet. The graphics of one of the HP laptop is not the greatest so I would really
// love to be able to still use its stronger RAM and storage but on my macbook pro instead."
// A stand-in lender (rig/lend705_mock_lender.py, started here) answers the way the new lender does; the page is run through the three paths
// by which a device reaches a lender: the browser's own fetch (web), the real computer back-end with its relay (shell: the MacBook Pro,
// rig/run_app.py with the patched app), and an emulation of the Fire app's net call (native: rig/lend705_open_native.js, NOT Android).
// Checks, on every path:
//   - Connect keeps each model's window and longest reply (info.ctx, info.out), the advice and the speed; the default pick is the strongest
//     model that is quick there (not the 9B that is slower); the chat's window never goes above the lender's (also when a larger one was
//     chosen); the Memory line says it; a long conversation is fitted to the smaller window; the model menu carries a word per model;
//   - a refusal for being too long (HTTP 400, or inside the stream) is said in plain words, with no "check that the computer is on", and
//     the list is read again; 503, 404 and a renewed code (401) show their reason on every path (on the Fire and iPhone too), without a
//     doubled full stop;
//   - a reply that ended without [DONE] says so; one that reached its limit says so; a whole one says nothing;
//   - the lender's status lines show: waiting for another device, loading, reading your message with a percent; they clear at the first
//     word; the request asks for them (ingenium_status) and the page waits 600 seconds for a lender's first word (shell and native);
//   - a lender that sends no advice (6.9.1) is picked from as before; one that does is picked from by advice.
// On the computer back-end (shell path), the lender's own card: Memory for lent models and Graphics are saved, "Right now" says what is
// used and why, the models that suit the computer are listed, the steps before lending are there, the top bar is as it was.
//   node rig/t_705_lend_page.js http://127.0.0.1:8165/ingenium.html <out folder> <patched ingenium_app.py> [mock port 8185] [api port 8167]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [URL_, OUT, APP, MP, AP] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const MOCK_PORT = +MP || 8185, API_PORT = +AP || 8167, LENDER = '127.0.0.1:' + MOCK_PORT, CODE = 'K7QM-4HXP', LOG = path.join(OUT, 'lender_log.jsonl');
const HERE = __dirname; let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 360) : '')); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const ctl = async o => (await fetch('http://' + LENDER + '/__ctl', { method: 'POST', body: JSON.stringify(o) })).json();
const posts = () => fs.readFileSync(LOG, 'utf8').trim().split('\n').filter(Boolean).map(x => JSON.parse(x)).filter(x => x.m === 'POST');
let MODELS_DEFAULT = [];   // read from the stand-in lender when it is up

async function boot(page) {
  await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await page.waitForTimeout(1200);
  // the welcome door can come a moment after the page says it is ready (a busy machine): wait for its Enter key, or for no door
  const doorUp = () => { const d = document.getElementById('introDoor'); if (!d) return false; const r = d.getBoundingClientRect(); const cs = getComputedStyle(d); return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0.05; };
  await page.waitForFunction((f) => { const up = new Function('return (' + f + ')()')(); return !up || [...document.querySelectorAll('button')].some(x => x.textContent.trim() === 'Enter' && x.offsetParent); }, doorUp.toString(), { timeout: 30000 }).catch(() => {});
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await page.waitForFunction((f) => !new Function('return (' + f + ')()')(), doorUp.toString(), { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(700);
  await page.evaluate(() => { const b = document.getElementById('grLater'); if (b) b.click(); try { state.grLater = Date.now(); } catch (e) { } }); await page.waitForTimeout(300);
}
async function connect(page, addr, code) {
  await page.evaluate(() => go('settings')); await page.waitForTimeout(500);
  await page.evaluate(([a, c]) => { document.getElementById('lkAddr').value = a; document.getElementById('lkCode').value = c; document.getElementById('lkConnect').click(); }, [addr, code]);
  await page.waitForFunction(() => { const s = document.getElementById('lkState'); return s && s.textContent && !/Looking for it/.test(s.textContent) && !document.getElementById('lkConnect').disabled; }, null, { timeout: 60000 });
  await page.waitForTimeout(900);   // the list is read again in the background
  return page.evaluate(() => ({ text: document.getElementById('lkState').textContent, model: state.cloud.model, info: state.cloud.info, models: state.cloud.models, lender: state.cloud.lender || null }));
}
async function chat(page, text, o) {
  o = o || {}; await page.evaluate(() => go('chat')); await page.waitForTimeout(300);
  const n0 = await page.evaluate(() => curMsgs().length); await page.fill('#chatInput', text);
  await page.evaluate(() => { window.__st = []; window.__stiv = setInterval(() => { try { if (liveBot && liveBot.status) { const s = liveBot.status; if (window.__st[window.__st.length - 1] !== s) window.__st.push(s); } } catch (e) { } }, 60); });
  await page.evaluate(() => sendChat());
  await page.waitForFunction(n0 => { const ms = curMsgs(); const l = ms[ms.length - 1]; return ms.length > n0 + 1 && l.role === 'bot' && !l.live && !l.wake && !l.preview; }, n0, { timeout: o.timeout || 90000, polling: 200 });
  return page.evaluate(() => { clearInterval(window.__stiv); const ms = curMsgs(), m = ms[ms.length - 1]; return { text: m.text, status: m.status || '', seen: window.__st || [] }; });
}
const mn = (page, mode, extra) => ctl(Object.assign({ mode, delay: 0 }, extra || {}));

async function borrower(label, open, hasTimeouts) {
  console.log('\n== the page as a borrower, path: ' + label);
  const R = await open(); const page = R.page; const errs = []; page.on('pageerror', e => errs.push(e.message));
  const relayBodies = []; page.on('request', rq => { if (/\/_relay$/.test(rq.url()) && rq.method() === 'POST') { try { relayBodies.push(JSON.parse(rq.postData())); } catch (e) { } } });
  try {
    await boot(page);
    ok(await page.evaluate(() => netMode()) === label, 'the page reaches the lender by the ' + label + ' path', await page.evaluate(() => netMode()));
    ok(await page.evaluate(() => !!(window.lkInfoOf && window.lkBestAdvised && window.lkStatus && window.lkRefresh && window.__ingParts.p205 === 'running')), 'r205 ran to its end');
    await mn(page, 'ok', { code: CODE, lend: true, models: MODELS_DEFAULT });
    // ---- connect: windows, advice, the default pick ----
    const c = await connect(page, LENDER, CODE);
    const i4 = (c.info || {})['Qwen3.5 4B'] || {}, i9 = (c.info || {})['Qwen3.5 9B'] || {};
    ok(i4.ctx === 32768 && i4.out === 32512 && i9.ctx === 16384 && i9.out === 16128, 'Connect keeps each model\'s window and longest reply (4B 32,768 / 32,512; 9B 16,384 / 16,128)', { i4, i9 });
    ok(i4.advice === 'quick' && i9.advice === 'ok' && i4.tps > 0 && i4.lineup === 'qwen3.5-4b' && i4.file && i4.size, 'and the advice, the speed and the old fields (lineup, file, size)', i9);
    ok(c.model === 'LFM2.5 8B A1B', 'the default pick is the strongest model that is quick there (the 8B-A1B), not the 9B that is slower', c.model);
    ok(await page.evaluate(() => ingCloudWindow()) === 32768, 'the chat\'s window is that model\'s, 32,768', await page.evaluate(() => ingCloudWindow()));
    await page.evaluate(() => { state.cloud.window = 65536; });
    ok(await page.evaluate(() => ingCloudWindow()) === 32768, 'a larger window chosen by hand is cut down to the lender\'s', await page.evaluate(() => ingCloudWindow()));
    await page.evaluate(() => { state.cloud.window = 0; state.cloud.model = 'Qwen3.5 9B'; saveState(); IngMemory.paint(); });
    ok(await page.evaluate(() => ingCloudWindow()) === 16384 && await page.evaluate(() => IngMem.window()) === 16384, 'with the 9B it is 16,384', await page.evaluate(() => [ingCloudWindow(), IngMem.window()]));
    const auto = await page.evaluate(() => { const s = document.getElementById('ctlCloudCtx'); const a = s && s.querySelector('option[value="0"]'); return a ? a.textContent : null; });
    ok(/16K/.test(auto || ''), 'the Memory line says it: "' + auto + '"');
    const rep = await page.evaluate(() => ingReplyMax(null)); ok(rep > 0 && rep <= 16128, 'the longest reply the slider reaches is the 9B\'s, 16,128 or less', rep);
    const menu = await page.evaluate(() => { go('chat'); paintModelMenu(); const m = document.getElementById('chatModelMenu'); return [...m.querySelectorAll('.menu-btn')].map(b => b.textContent.replace(/\s+/g, ' ').trim()); });
    ok(menu.some(t => /Qwen3\.5 4B.*quick/.test(t)) && menu.some(t => /Qwen3\.5 9B.*a little slower/.test(t)) && menu.some(t => /Gemma 4 26B A4B.*too big/.test(t)), 'the model menu carries a word per model', menu.slice(0, 5));
    const note = await page.evaluate(() => { go('settings'); const n = document.getElementById('lkLenderNote'); return n ? n.textContent : null; });
    ok(/16 GB of memory/.test(note || '') && /processor/.test(note || ''), 'under Connect the page says what the lender is: 16 GB, working with its processor', note);

    // ---- a long conversation is fitted to the window ----
    // the rolling summary (r195) is written in the background after a send; on a slow machine it can land before the next
    // send and shorten it, so each measurement waits for it to settle and starts without one: only the window is measured
    const settleSummary = () => page.waitForFunction(() => { try { const st = IngMem.state; return !st.busy && !st.timer; } catch (e) { return true; } }, null, { timeout: 120000, polling: 250 }).catch(() => {});
    const longChat = async () => { await settleSummary(); return page.evaluate(() => { const c = curChat(); c.messages = []; delete c.summary; delete c.summaryN; delete c.summaryAt; for (let i = 0; i < 44; i++) c.messages.push({ role: i % 2 ? 'bot' : 'me', text: ('Line ' + i + ': ' + 'The quick brown fox jumps over the lazy dog and the abbot reads folio twelve. '.repeat(26)).slice(0, 2000) }); saveState(); }); };
    await page.evaluate(() => { state.cloud.model = 'Qwen3.5 9B'; saveState(); }); await longChat();
    await chat(page, 'Please summarise our talk so far.'); const p9 = posts().pop();
    await page.evaluate(() => { state.cloud.model = 'Qwen3.5 4B'; saveState(); IngMemory.paint(); }); await longChat();
    await chat(page, 'Please summarise our talk so far, again.'); const p4 = posts().pop();
    ok(p9.prompt_chars > 8000 && p9.prompt_chars < 16384 * 3.2 && p4.prompt_chars > p9.prompt_chars * 1.3, 'a long conversation is fitted to the window: 9B ' + p9.prompt_chars + ' characters, 4B ' + p4.prompt_chars, [p9.prompt_chars, p4.prompt_chars]);
    ok(p4.body.ingenium_status === true, 'the request asks the lender to say how it is doing (ingenium_status)', Object.keys(p4.body));
    if (hasTimeouts === 'relay') { const rb = relayBodies.filter(b => /\/chat\/completions$/.test(b.url)).pop(); ok(rb && rb.timeout === 600, 'the request reaching the relay carries timeout 600', rb && rb.timeout);
      const hb = relayBodies.filter(b => /\/ingenium\/hello$/.test(b.url)).pop(); ok(hb && hb.timeout === 10, 'and Connect\'s own questions keep their short ones', hb && hb.timeout); }
    if (hasTimeouts === 'native') { const log = global.__nativeNetLog || []; const cc = log.filter(x => /\/chat\/completions$/.test(x.url)).pop(); ok(cc && cc.timeoutArg === 600, 'the request reaching the Fire\'s net call carries timeout 600', cc && cc.timeoutArg); }

    if (label === 'web') {   // a chat start reads the lender's list again (at most once in 30 seconds)
      await ctl({ models: MODELS_DEFAULT.map(m => m.name === 'Qwen3.5 4B' ? Object.assign({}, m, { context_length: 24576, max_tokens: 24320 }) : m) });
      await page.waitForTimeout(31000); await chat(page, 'A question after the lender changed its memory.');
      ok(await page.evaluate(() => state.cloud.info['Qwen3.5 4B'].ctx) === 24576, 'a chat start reads the lender\'s list again: the 4B now holds 24,576', await page.evaluate(() => state.cloud.info['Qwen3.5 4B'].ctx));
      await ctl({ models: MODELS_DEFAULT }); await page.evaluate(() => { lkRefresh(true); }); await page.waitForTimeout(1200);
    }
    // ---- too long, said plainly ----
    await page.evaluate(() => { state.cloud.model = 'Qwen3.5 9B'; saveState(); });
    await mn(page, 'err400');
    let r = await chat(page, 'A question after a very long talk, HTTP.');
    ok(/This conversation is longer than HP-Laptop's memory for this model \(16,384 tokens\)\. Start a new conversation, or raise Memory for lent models on HP-Laptop\./.test(r.text), 'HTTP 400: the plain sentence, with the number', r.text);
    ok(!/Check that/.test(r.text) && !/\.\.(?!\.)/.test(r.text) && !/HTTP 400 \./.test(r.text), 'with no "check that the computer is on", no doubled stop, and not a blank reason', r.text);
    await mn(page, 'err400b');
    r = await chat(page, 'A question after a very long talk, in the stream.');
    ok(/This conversation is longer than HP-Laptop's memory for this model \(16,384 tokens\)/.test(r.text) && !/Check that/.test(r.text), 'inside the stream: the same sentence', r.text);
    // the list is read again after the refusal: the lender now holds 8,192 for the 9B
    await ctl({ models: MODELS_DEFAULT.map(m => m.name === 'Qwen3.5 9B' ? Object.assign({}, m, { context_length: 8192, max_tokens: 7936 }) : m) });
    await mn(page, 'err400b'); await chat(page, 'Once more.'); await page.waitForTimeout(1200);
    ok(await page.evaluate(() => state.cloud.info['Qwen3.5 9B'].ctx) === 8192 && await page.evaluate(() => ingCloudWindow()) === 8192, 'after a refusal the list is read again and the window follows (8,192)', await page.evaluate(() => state.cloud.info['Qwen3.5 9B'].ctx));
    await ctl({ models: MODELS_DEFAULT });
    for (const [mode, re, what] of [['err503', /HTTP 503 The model could not be loaded on the sharing computer/, '503'], ['err404', /HTTP 404 This computer has no model called/, '404']]) {
      await mn(page, mode); r = await chat(page, 'Hello? ' + mode);
      ok(re.test(r.text) && !/\.\.(?!\.)/.test(r.text), what + ' shows its reason and has no doubled full stop', r.text);
    }
    await mn(page, 'ok', { code: 'ZZZZ-ZZZZ' }); r = await chat(page, 'Hello after the code was renewed');
    ok(/HTTP 401 The pairing code is not right/.test(r.text) && !/\.\.(?!\.)/.test(r.text), 'a renewed code (401) shows its reason', r.text);
    await ctl({ code: CODE });

    // ---- how a reply ended ----
    await page.evaluate(() => { state.cloud.model = 'Qwen3.5 4B'; saveState(); });
    await mn(page, 'die'); r = await chat(page, 'Tell me about Paris (the lender goes away).');
    ok(/The reply stopped early: the connection to HP-Laptop ended\. Ask again\./.test(r.text) && /Paris is the capital/.test(r.text), 'a stream that closes without [DONE]: the words so far and a plain note', r.text);
    await mn(page, 'length'); r = await chat(page, 'Tell me about Paris (limit).');
    ok(/The reply reached its limit\. Say .continue. to go on\./.test(r.text) && !/stopped early/.test(r.text), 'a reply that reached its limit says so, and is not called cut', r.text);
    await mn(page, 'ok'); r = await chat(page, 'Tell me about Paris (whole).');
    ok(/Paris is the capital of France\./.test(r.text) && !/stopped early|reached its limit/.test(r.text), 'a whole reply has no note', r.text);

    // ---- the lender says how it is doing ----
    await mn(page, 'progress'); r = await chat(page, 'Tell me about Paris (waiting).');
    const seen = r.seen.join(' | ');
    ok(/Waiting: 2 devices are ahead of you on HP-Laptop/.test(seen) && /Waiting: HP-Laptop is answering another device first/.test(seen), 'waiting for other devices shows, with how many are ahead', seen);
    ok(/HP-Laptop is loading Qwen3\.5 4B \(7 seconds so far\)/.test(seen), 'loading the model shows', seen);
    ok(/is reading your message: 20%/.test(seen) && /is reading your message: 60%/.test(seen) && /reading your message: 100%/.test(seen), 'reading your message shows a percent that moves', seen);
    ok(r.status === '' && /Paris is the capital/.test(r.text) && !/stopped early/.test(r.text), 'the status clears at the first word and the reply is whole', [r.status, r.text.slice(0, 60)]);
    // ---- a lender from before: no advice, no windows ----
    const OLD = MODELS_DEFAULT.map(m => ({ id: m.id, name: m.name, file: m.file, size: m.size, lineup: m.lineup }));
    await ctl({ models: OLD, mode: 'ok' }); await page.evaluate(() => { state.cloud.model = ''; }); let d = await connect(page, LENDER, CODE);
    ok(d.model === 'Qwen3.5 9B' && !((d.info || {})['Qwen3.5 9B'] || {}).ctx && !((d.info || {})['Qwen3.5 9B'] || {}).advice, 'a lender that sends no advice (6.9.1) is picked from as before (the 9B), and the window stays the old 32,768', [d.model, d.info['Qwen3.5 9B']]);
    ok(await page.evaluate(() => ingCloudWindow()) === 32768, '32,768', await page.evaluate(() => ingCloudWindow()));
    const adv = (a9, a4, a8) => MODELS_DEFAULT.map(m => Object.assign({}, m, { advice: m.name === 'Qwen3.5 9B' ? a9 : m.name === 'Qwen3.5 4B' ? a4 : m.name === 'LFM2.5 8B A1B' ? a8 : 'too big' }));
    const pick = async (a9, a4, a8) => { await ctl({ models: adv(a9, a4, a8) }); await page.evaluate(() => { state.cloud.model = ''; }); return (await connect(page, LENDER, CODE)).model; };
    ok(await pick('quick', 'quick', 'quick') === 'Qwen3.5 9B', 'all quick: the strongest general model, the 9B');
    ok(await pick('ok', 'quick', 'ok') === 'Qwen3.5 4B', 'a quick 4B beats a slower 9B and a slower 8B-A1B');
    ok(await pick('ok', 'ok', 'ok') === 'Qwen3.5 9B', 'none quick: the strongest of those that are a little slower');
    ok(await pick('slow', 'slow', 'slow') === 'Qwen3.5 9B', 'all slow: the old pick, the 9B');
    await ctl({ models: MODELS_DEFAULT });
    ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 2));
    ok(await page.evaluate(() => Object.keys(window.__ingParts || {}).every(k => window.__ingParts[k] === 'running')), 'every part of the page ran to its end');
  } catch (e) { ok(false, 'the ' + label + ' path ran through', String(e && e.stack || e).slice(0, 500)); }
  return R;
}

(async () => {
  fs.writeFileSync(LOG, '');
  const mock = cp.spawn('python3', ['-I', path.join(HERE, 'lend705_mock_lender.py'), String(MOCK_PORT), LOG, CODE], { stdio: 'ignore' });
  for (let i = 0; i < 40 && !MODELS_DEFAULT.length; i++) { await sleep(250); try { MODELS_DEFAULT = (await (await fetch('http://' + LENDER + '/v1/models', { headers: { Authorization: 'Bearer ' + CODE } })).json()).data.map(m => { const o = Object.assign({}, m); delete o.object; delete o.owned_by; return o; }); } catch (e) { } }
  // the computer back-end (the MacBook Pro's path): the patched app, headless, a stand-in engine that lists a small chip
  const appDir = path.join(OUT, 'app'); fs.mkdirSync(path.join(appDir, 'engine', 'linux-x64'), { recursive: true }); fs.mkdirSync(path.join(OUT, 'home'), { recursive: true });
  fs.copyFileSync(APP, path.join(appDir, 'ingenium_app.py'));
  // the page the computer back-end serves: PAGE_FILE, or the built page beside the stage's sources (the lending stage's own folder)
  const pageFile = path.resolve(process.env.PAGE_FILE || path.join(HERE, '..', '..', 'final', 'ingenium.html'));
  if (!fs.existsSync(pageFile)) throw new Error('no page for the computer back-end at ' + pageFile + ' (set PAGE_FILE to the built ingenium.html)');
  try { fs.rmSync(path.join(appDir, 'ingenium.html'), { force: true }); fs.symlinkSync(pageFile, path.join(appDir, 'ingenium.html')); } catch (e) { fs.copyFileSync(pageFile, path.join(appDir, 'ingenium.html')); }
  fs.copyFileSync(path.join(HERE, 'lend705_stub_llama.py'), path.join(appDir, 'engine', 'linux-x64', 'llama-server')); fs.chmodSync(path.join(appDir, 'engine', 'linux-x64', 'llama-server'), 0o755);
  const back = cp.spawn('python3', ['-I', path.join(HERE, 'run_app.py'), appDir, String(API_PORT)], { stdio: ['ignore', 'pipe', 'inherit'], env: Object.assign({}, process.env, { HOME: path.join(OUT, 'home'), STUB_DEVICES: 'Intel(R) UHD Graphics 620|8036|7000', STUB_LOG: path.join(OUT, 'stub.jsonl') }) });
  await new Promise((res, rej) => { let b = ''; back.stdout.on('data', d => { b += d; if (/page_port/.test(b)) res(); }); back.on('exit', () => rej(new Error('run_app.py stopped'))); setTimeout(() => rej(new Error('run_app.py did not start')), 90000); });
  await sleep(1500);
  const open = {
    web: async () => { const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const page = await ctx.newPage(); await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 120000 }); return { page, done: () => b.close() }; },
    shell: async () => { const { openApp } = require('./bridge.js'); const r = await openApp({ apiPort: API_PORT }); return { page: r.page, done: () => r.browser.close() }; },
    native: async () => { const r = await require('./lend705_open_native.js').open(URL_); return { page: r.page, done: () => r.browser.close() }; } };
  try {
    await borrower('web', open.web, false);
    const sh = await borrower('shell', open.shell, 'relay');
    // ---- the computer that lends: its own card (the real back-end) ----
    console.log('\n== the card of the computer that lends (the real back-end)');
    const page = sh.page;
    try {
      await page.evaluate(() => go('settings')); await page.waitForFunction(() => document.getElementById('lkLend') && !document.getElementById('lkLend').hidden, null, { timeout: 30000 });
      const snap = () => page.evaluate(() => ({ ctx: document.getElementById('lkCtxSel').value, gpu: document.getElementById('lkGpuSel').value, now: document.getElementById('lkGpuNow').textContent, note: document.getElementById('lkCtxNote').textContent }));
      let s = await snap();
      ok(s.ctx === 'auto' && s.gpu === 'auto', 'Memory for lent models and Graphics both start at Automatic', s);
      ok(/Right now: the processor only \(nothing is loaded yet\)\. This computer's graphics chip \(Intel\(R\) UHD Graphics 620\) is a small one that shares the computer's memory/.test(s.now), 'Graphics says what it is doing right now and why: processor only, a small chip', s.now);
      ok(/This computer has \d+ GB of memory/.test(s.note) && /next time a model is loaded/.test(s.note), 'Memory says what this computer has and when a change applies', s.note);
      await page.evaluate(() => { const g = document.getElementById('lkGpuSel'); g.value = 'cpu'; g.dispatchEvent(new Event('change')); }); await page.waitForTimeout(1200);
      s = await snap(); const st = await page.evaluate(() => window.pywebview.api.share_status());
      ok(s.gpu === 'cpu' && st.options.gpu === 'cpu' && /You chose Processor only/.test(s.now), 'choosing Processor only is saved with the sharing settings and shown', [st.options.gpu, s.now]);
      await page.evaluate(() => { const g = document.getElementById('lkCtxSel'); g.value = '16384'; g.dispatchEvent(new Event('change')); }); await page.waitForTimeout(1200);
      const st2 = await page.evaluate(() => window.pywebview.api.share_status()); ok(st2.options.ctx === 16384 && (await snap()).ctx === '16384', 'choosing 16,384 for lent models is saved', st2.options.ctx);
      await page.evaluate(() => { for (const [id, v] of [['lkCtxSel', 'auto'], ['lkGpuSel', 'auto']]) { const g = document.getElementById(id); g.value = v; g.dispatchEvent(new Event('change')); } }); await page.waitForTimeout(1400);
      const st3 = await page.evaluate(() => window.pywebview.api.share_status()); ok(st3.options.ctx === 'auto' && st3.options.gpu === 'auto', 'and both can be put back to Automatic', [st3.options.ctx, st3.options.gpu]);
      await page.evaluate(() => { const d = document.getElementById('lkSuit'); d.open = true; d.dispatchEvent(new Event('toggle')); });
      await page.waitForFunction(() => /Quick/.test(document.getElementById('lkSuitList').textContent), null, { timeout: 30000 });
      const suit = await page.evaluate(() => document.getElementById('lkSuitList').textContent);
      ok(/On this computer \(\d+ GB of memory, processor only\)/.test(suit) && /Qwen3\.5 4B/.test(suit) && /Too big for this computer/.test(suit) && /words a second/.test(suit), 'Which models suit this computer lists them by speed, and those that are too big', suit.slice(0, 260));
      const before = await page.evaluate(() => document.getElementById('lkBeforeBody').textContent);
      ok(/Leave Ingenium open/.test(before) && /same model on every device/.test(before) && /fixed address/.test(before), 'Before you lend from a laptop is there, in plain steps', before.slice(0, 120));
      const bar = await page.evaluate(() => { const t = document.querySelector('.topbar'); return { html: t ? t.outerHTML : '', h: t ? t.getBoundingClientRect().height : 0, bad: t ? t.querySelectorAll('[id^="lk"],[class*="lk-"]').length : -1 }; });
      ok(bar.bad === 0 && !/lend|Memory for/i.test(bar.html.replace(/<[^>]*>/g, ' ')) && bar.h > 0 && bar.h < 120, 'the top bar is as it was: nothing of this part in it, ' + Math.round(bar.h) + ' px high', { bad: bar.bad, h: bar.h });
      const wl = await page.evaluate(async () => { const a = window.pywebview.api; return { fn: typeof a.share_option_set, adv: typeof a.share_advise }; });
      ok(wl.fn === 'function' && wl.adv === 'function', 'the app gives the page share_option_set and share_advise');
    } catch (e) { ok(false, 'the lender card checks ran through', String(e && e.stack || e).slice(0, 500)); }
    await sh.done();
    await borrower('native', open.native, 'native').then(r => r.done());
  } finally { try { mock.kill(); } catch (e) { } try { back.kill(); } catch (e) { } }
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
