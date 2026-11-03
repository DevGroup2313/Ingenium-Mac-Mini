// A connected model for Lector and the Career Studio (Ingenium 6.9.5: modules/r108.js, r188.js, r195.js, r206.js and the lxAsk edit in
// build_page.py). Her words (3 November 2026): "I also want to be able to load and run a connected Cloud model from Claude or GPT and etc,
// inside of the Career Studio and the Lector page and not just only have the local models as options".
// A stand-in for Anthropic's Messages API on the page's own address (page.route) answers; no real key is used, and no model is on the device.
//   node rig/t_695_lx_cloud.js http://127.0.0.1:8150/ingenium.html <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d).slice(0, 600) : '')); c ? pass++ : fail++; };
const WIN = 200000, origin = new URL(URL_).origin, BASE = origin + '/mockanthropic';
let plan = [], log = [];
function sizeOf(m) { return typeof m.content === 'string' ? m.content.length : (m.content || []).reduce((a, p) => a + (p.text ? p.text.length : 0), 0); }
const ev = (o) => 'event: ' + o.type + '\ndata: ' + JSON.stringify(o) + '\n\n';
const sse = (t) => ev({ type: 'message_start', message: { model: 'claude-fable-5-1', usage: { input_tokens: 10 } } }) + ev({ type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } })
  + ev({ type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text: t } }) + ev({ type: 'message_delta', delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 5 } }) + ev({ type: 'message_stop' });
const err = (status, type, message) => ({ status, contentType: 'application/json', body: JSON.stringify({ type: 'error', error: { type, message } }) });
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route('**/mockanthropic/**', (route) => { const q = route.request(); if (q.method() !== 'POST') return route.fulfill({ status: 200, contentType: 'application/json', body: '{"data":[]}' });
    const bd = JSON.parse(q.postData() || '{}'); const chars = (typeof bd.system === 'string' ? bd.system.length : 0) + (bd.messages || []).reduce((a, m) => a + sizeOf(m) + 12, 0), tok = Math.ceil(chars / 2.5);
    const step = plan.shift() || 'count'; const last = (bd.messages || []).slice(-1)[0];
    log.push({ step, model: bd.model, tok, max: bd.max_tokens, lastLen: last ? sizeOf(last) : 0, sys: String(bd.system || '').slice(0, 50) });
    if (step === 'rate') return route.fulfill(err(429, 'rate_limit_error', "This request would exceed your organization's rate limit of 30,000 input tokens per minute."));
    if (tok > WIN) return route.fulfill(err(400, 'invalid_request_error', 'prompt is too long: ' + tok + ' tokens > ' + WIN + ' maximum'));
    return route.fulfill({ status: 200, contentType: 'text/event-stream', body: sse('ROLE: Doctoral researcher in digital humanities | WHY: your apps and writing | GAP: a proposal | FIRST: draft one page') }); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(500);
  const lectorBox = () => p.evaluate(() => { go('lector'); const box = document.getElementById('l7Model'); return box ? { text: box.innerText.replace(/\s+/g, ' ').trim(), keys: [...box.querySelectorAll('button')].map((k) => k.textContent.trim()) } : null; });
  // 1. no connection: Lector offers no connected model
  await p.evaluate(() => { state.cloud = {}; state.chatSource = 'local'; saveState(); });
  let lb = await lectorBox();
  ok(lb && !lb.keys.some((k) => /^Use .*\(/.test(k)) && !/connected model/.test(lb.text), '1. with no connection set, Lector offers only this device\'s models', lb);
  // 2. a Claude connection set (the chat on this device's models): Lector offers it, saying where the text goes
  await p.evaluate((BASE) => { state.cloud = { on: false, provider: 'anthropic', base: BASE, key: 'sk-test-not-real', model: 'claude-fable-5-1', models: ['claude-fable-5-1'], info: { 'claude-fable-5-1': { ctx: 200000, out: 64000 } } }; state.chatSource = 'local'; saveState(); }, BASE);
  lb = await lectorBox();
  ok(lb && lb.keys.indexOf('Use Claude Fable 5.1 (Anthropic)') >= 0 && /Or let your connected model read and write: Claude Fable 5.1 \(Anthropic\)\. What it reads is then sent to Anthropic\./.test(lb.text), '2. with a Claude connection, Lector offers it by name, and says what it reads is then sent to Anthropic', lb);
  // 3. chosen: the box says so, and how to go back
  await p.evaluate(() => { const k = [...document.querySelectorAll('#l7Model button')].find((x) => x.textContent.trim() === 'Use Claude Fable 5.1 (Anthropic)'); k.click(); });
  await p.waitForTimeout(300); lb = await lectorBox();
  ok(lb && /Your connected model reads and writes/.test(lb.text) && /Lector uses Claude Fable 5.1 \(Anthropic\)\. While it works, what it reads .* is sent to Anthropic/.test(lb.text) && lb.keys.indexOf("Use this device's model instead") >= 0, '3. chosen, the box says Lector uses claude-fable-5-1 through Anthropic, what is sent, and offers the way back', lb);
  await p.screenshot({ path: OUT + '/lector_cloud.png' }).catch(() => {});
  // 4. Lector asks the connected model (no model on this device)
  log = []; plan = [];
  const asked = await p.evaluate(async () => { try { const t = await lxAsk({}, [{ role: 'system', content: 'You read.' }, { role: 'user', content: 'Say a role.' }], 900, 0.4, null); return { t }; } catch (e) { return { e: e.message }; } });
  ok(asked.t && /Doctoral researcher/.test(asked.t) && log.length === 1 && log[0].model === 'claude-fable-5-1', '4. Lector\'s request goes to the connected model and its answer comes back', { asked, log });
  // 5. the Career Studio writes with it too, and says so
  await p.evaluate(() => { go('career'); }); await p.waitForTimeout(600);
  const cs = await p.evaluate(() => { const pg = document.getElementById('page-career'); const t = pg ? pg.innerText.replace(/\s+/g, ' ') : ''; return { note: (t.match(/Writing with [^.]*\.[^.]*\./) || [''])[0], keys: [...(pg ? pg.querySelectorAll('button') : [])].map((k) => k.textContent.trim()).filter((k) => /^Use /.test(k)) }; });
  ok(/Writing with Claude Fable 5.1 \(Anthropic\), the model Lector uses, through your Anthropic connection: what it reads is sent to Anthropic\./.test(cs.note) && cs.keys.indexOf("Use this device's model instead") >= 0, '5. the Career Studio says it writes with claude-fable-5-1 through Anthropic, and has the key back', cs);
  log = []; plan = [];
  await p.evaluate(() => { const tab = [...document.querySelectorAll('#page-career [role=tab], #page-career button')].find((x) => x.textContent.trim() === 'Goals and plan'); if (tab) tab.click(); });
  await p.waitForTimeout(500);
  await p.evaluate(() => { const it = [...document.querySelectorAll('#page-career button, #page-career [role=button], #page-career .c-item, #page-career li')].find((x) => x.offsetParent && /^Roles and programmes that suit you/.test(x.textContent.trim())); if (it) it.click(); });
  await p.waitForTimeout(500);
  const clicked = await p.evaluate(() => { const k = [...document.querySelectorAll('#page-career button')].find((x) => /^Weigh (what suits me|them again)$/.test(x.textContent.trim())); if (!k) return false; k.click(); return true; });
  await p.waitForFunction(() => true, null, { timeout: 1000 }); for (let i = 0; i < 60 && !log.length; i++) await p.waitForTimeout(250);
  await p.waitForTimeout(1500);
  const said = await p.evaluate(() => (document.getElementById('page-career') || {}).innerText || '');
  ok(clicked && log.length >= 1 && log[0].model === 'claude-fable-5-1' && !/No model is ready on this device yet/.test(said), '5. Weigh what suits me is written by the connected model, with no model on this device', { clicked, log: log.slice(0, 2) });
  await p.screenshot({ path: OUT + '/career_cloud.png' }).catch(() => {});
  // 6. back to this device's model, from the room the studio opens on (Applications, where its model is named): the key to choose the connected one returns
  for (let i = 0; i < 40; i++) { const busy = await p.evaluate(() => !![...document.querySelectorAll('#page-career button')].find((x) => x.offsetParent && x.textContent.trim() === 'Stop')); if (!busy) break; await p.waitForTimeout(250); }
  await p.evaluate(() => { const tab = [...document.querySelectorAll('#page-career [role=tab]')].find((x) => x.textContent.trim() === 'Applications'); if (tab) tab.click(); });
  await p.waitForTimeout(500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#page-career button')].find((x) => x.textContent.trim() === "Use this device's model instead"); if (k) k.click(); });
  await p.waitForTimeout(400);
  const back = await p.evaluate(() => ({ uses: lxUsesCloud(), keys: [...document.querySelectorAll('#page-career button')].map((k) => k.textContent.trim()).filter((k) => /^Use /.test(k)) }));
  ok(back.uses === false && back.keys.indexOf('Use Claude Fable 5.1 (Anthropic)') >= 0, '6. the way back works: this device\'s model again, and the key to choose the connected one', back);
  log = [];
  const local = await p.evaluate(async () => { try { await lxAsk({}, [{ role: 'user', content: 'x' }], 100, 0.4, null); return 'answered'; } catch (e) { return e.message; } });
  ok(/Choose a model that is ready on this device first/.test(local) && log.length === 0, '6. not chosen, nothing is sent to the connection', { local, sent: log.length });
  // 7. a part too long for the model: refused once, handed back to Lector as a context error, never cut here
  await p.evaluate(() => lxSetCloud(true));
  log = []; plan = [];
  const big = await p.evaluate(async () => { const ab = netAbortable(); LX.cloudAb = ab; let e2 = null;
    try { await cloudChat([{ role: 'system', content: 'You read.' }, { role: 'user', content: 'x'.repeat(600000) }], () => {}, () => {}, ab); } catch (e) { e2 = e.message; } LX.cloudAb = null;
    return { e: e2, ctx: e2 ? lxIsCtxError(new Error(e2)) : false }; });
  ok(big.ctx && log.length === 1 && log[0].lastLen === 600000, '7. a part too long for the model goes back to Lector as a context error after one request, its text never cut', { big, log });
  // 8. a part larger than the key's minute: handed back too; the minute's allowance is kept, and Lector's parts fit under it
  log = []; plan = ['rate'];
  const rate = await p.evaluate(async () => { const ab = netAbortable(); LX.cloudAb = ab; let e2 = null;
    try { await cloudChat([{ role: 'system', content: 'You read.' }, { role: 'user', content: 'y'.repeat(200000) }], () => {}, () => {}, ab); } catch (e) { e2 = e.message; } LX.cloudAb = null;
    return { e: e2, ctx: e2 ? lxIsCtxError(new Error(e2)) : false, perMin: (state.cloud.info['claude-fable-5-1'] || {}).perMin, lxCtx: lxCtx(null) }; });
  ok(rate.ctx && log.length === 1 && rate.perMin === 30000 && rate.lxCtx > 0 && rate.lxCtx <= 18000, '8. a part over the key\'s tokens a minute goes back as a context error; the allowance (30,000) is kept and Lector\'s parts now fit under it', { rate, calls: log.length });
  ok(await p.evaluate(() => Object.values(window.__ingParts || {}).every(v => v === 'running')), 'every part of the page ran to its end');
  ok(errs.length === 0, 'no script errors on the page', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
