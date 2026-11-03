// A connected model's limits, kept (Ingenium 6.9.4, modules/r206.js). Her words (3 November 2026): "I tried to run Fable through
// the API key on Ingenium and the chat kept on crashing because it was exceeding Token limits. I want Ingenium to be strong enough
// to do it."
// A stand-in for Anthropic's Messages API, on the page's own address (page.route), counts each request's tokens from its
// characters and refuses as the service does: a conversation longer than the window, a conversation and reply together longer
// than the window, a reply asked longer than the model gives, the key's tokens a minute, a busy service. No real key is used.
//   node rig/t_694_cloud_limits.js http://127.0.0.1:8150/ingenium.html <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d).slice(0, 700) : '')); c ? pass++ : fail++; };
const WIN = 200000, OUTMAX = 64000;
const origin = new URL(URL_).origin, BASE = origin + '/mockanthropic';
let plan = [], log = [], bg = [], cpt = 2.5;
function sizeOf(m) { return typeof m.content === 'string' ? m.content.length : (m.content || []).reduce((a, p) => a + (p.text ? p.text.length : 0), 0); }
function sse(text, cut) {
  const ev = (o) => 'event: ' + o.type + '\ndata: ' + JSON.stringify(o) + '\n\n';
  let s = ev({ type: 'message_start', message: { id: 'msg_1', model: 'claude-test-5', usage: { input_tokens: 10, output_tokens: 1 } } })
    + ev({ type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } })
    + ev({ type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text: text } });
  if (cut) return s + ev({ type: 'error', error: { type: 'overloaded_error', message: 'Overloaded' } });
  return s + ev({ type: 'content_block_stop', index: 0 }) + ev({ type: 'message_delta', delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 5 } }) + ev({ type: 'message_stop' });
}
const err = (status, type, message) => ({ status, contentType: 'application/json', body: JSON.stringify({ type: 'error', error: { type, message } }) });
async function handler(route) {
  const req = route.request();
  if (req.method() !== 'POST') return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: [{ id: 'claude-test-5', max_input_tokens: WIN, max_tokens: OUTMAX }] }) });
  const b = JSON.parse(req.postData() || '{}');
  const chars = (typeof b.system === 'string' ? b.system.length : 0) + (b.messages || []).reduce((a, m) => a + sizeOf(m) + 12, 0);
  const tok = Math.ceil(chars / cpt);
  const step = plan.shift() || 'count';
  const sysText = typeof b.system === 'string' ? b.system : '';
  if (/^You keep the running summary/.test(sysText)) { bg.push({ tok }); return route.fulfill({ status: 200, contentType: 'text/event-stream', body: sse('Summary: a long test conversation about loops, written in French and English.') }); }
  const lastM = (b.messages || []).slice(-1)[0];
  log.push({ step, tok, max: b.max_tokens, n: (b.messages || []).length, first: b.messages && b.messages[0] && b.messages[0].role, last: lastM && sizeOf(lastM), model: b.model });
  if (step === 'rate') return route.fulfill(err(429, 'rate_limit_error', "This request would exceed your organization's rate limit of 30,000 input tokens per minute. For details, refer to the documentation."));
  if (step === 'busy') return route.fulfill(err(529, 'overloaded_error', 'Overloaded'));
  if (step === 'cut') return route.fulfill({ status: 200, contentType: 'text/event-stream', body: sse('The first words of a reply', true) });
  if (step === 'count') {
    if (b.max_tokens > OUTMAX) return route.fulfill(err(400, 'invalid_request_error', 'max_tokens: ' + b.max_tokens + ' > ' + OUTMAX + ', which is the maximum allowed number of output tokens for claude-test-5'));
    if (tok > WIN) return route.fulfill(err(400, 'invalid_request_error', 'prompt is too long: ' + tok + ' tokens > ' + WIN + ' maximum'));
    if (tok + b.max_tokens > WIN) return route.fulfill(err(400, 'invalid_request_error', 'input length and `max_tokens` exceed context limit: ' + tok + ' + ' + b.max_tokens + ' > ' + WIN + ', decrease input length or `max_tokens` and try again'));
  }
  return route.fulfill({ status: 200, contentType: 'text/event-stream', body: sse('Hello from the stand-in.') });
}
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1400, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route('**/mockanthropic/**', handler);
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(400);
  // background work of the scenario before (the rolling summary) is let finish first, so each scenario counts its own requests
  const settle = async () => { await p.waitForFunction(() => !window._cloudAb && (typeof liveBot === 'undefined' || !liveBot), null, { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(1800); };
  const setup = async (histChars, outKnown, model) => {
    model = model || 'claude-test-5';
    await settle();
    await p.evaluate(({ BASE, histChars, outKnown, model }) => {
      go('chat'); try { $('chatNew').click(); } catch (e) {}
      const inf = {}; inf[model] = outKnown ? { ctx: 200000, out: 64000 } : { ctx: 200000 };
      state.cloud = { on: true, provider: 'anthropic', base: BASE, key: 'sk-test-not-real', model: model, models: [model], info: inf };
      state.chatSource = 'cloud'; state.webSearch = false; state.research = false; state.thinking = false;
      try { window.ingLimitWaitScale = 0.01; } catch (e) {}
      // a long conversation: pairs of messages of about 4,000 characters each, mixed prose and code
      const ms = curMsgs(); const chunk = 'Une phrase en français, with code: for (let i = 0; i < n; i++) { total += f(i); } and more words. ';
      let made = 0, i = 0; while (made < histChars) { const t = '[' + i + '] ' + chunk.repeat(40); ms.push({ role: i % 2 ? 'bot' : 'me', text: t, at: Date.now() - 100000 + i }); made += t.length; i++; }
      try { saveState(); } catch (e) {} try { renderChat(); } catch (e) {}
    }, { BASE, histChars, outKnown, model });
    await p.waitForTimeout(300);
  };
  // the reply is found by the message it answers: a long conversation moves its older messages to its archive (r103), so
  // the number of messages can fall while a reply is written
  const send = async (text, ms = 90000) => {
    const n0 = text;
    await p.fill('#chatInput', text); await p.evaluate(() => sendChat());
    const seen = [];
    const t0 = Date.now();
    while (Date.now() - t0 < ms) {
      const st = await p.evaluate((sent) => { const m = curMsgs(); let i = m.length - 1; while (i >= 0 && !(m[i].role === 'me' && m[i].text === sent)) i--;
        const l = i >= 0 ? m[i + 1] : null; return { done: !!l && l.role === 'bot' && !l.live && !l.wake && !l.preview, status: l && l.status || '', text: l && l.text, note: l && l.note, keys: l && Object.keys(l) }; }, n0);
      if (st.status && seen.indexOf(st.status.replace(/\d+ seconds?/, 'N seconds')) < 0) seen.push(st.status.replace(/\d+ seconds?/, 'N seconds'));
      if (st.done) return { ...st, seen };
      await p.waitForTimeout(60);
    }
    return { done: false, seen };
  };
  // 1. a long conversation, counted as the page counts (2.5 characters a token): the first request fits, the reply too
  cpt = 2.5; plan = []; log = [];
  await setup(700000, true, 'claude-fable-5-1');
  let r = await send('Please answer briefly.');
  ok(r.done && /Hello from the stand-in/.test(r.text) && log.length === 1, '1. a conversation longer than the window is fitted before it is sent: one request, answered', { calls: log, text: r.text, note: r.note });
  ok(log.length && log[0].tok + log[0].max <= WIN, '1. the conversation and the reply asked for fit the window together (' + (log[0] && (log[0].tok + ' + ' + log[0].max)) + ' <= ' + WIN + ')', log[0]);
  ok(log.length && log[0].first === 'user', '1. the first message sent is the person\'s (the service refuses any other)', log[0]);
  // 2. a service that counts far more tokens than the page does (1 character a token): refused as too long, fitted, answered
  cpt = 1.0; plan = []; log = [];
  await setup(700000, true, 'claude-fable-5-1');
  r = await send('Please answer briefly, again.');
  ok(r.done && /Hello from the stand-in/.test(r.text) && log.length >= 2 && log.length <= 4, '2. refused as too long, the conversation is fitted and sent again, and answered (' + log.length + ' requests)', { calls: log, text: (r.text || '').slice(0, 300), keys: r.keys });
  ok(log.length >= 2 && log[log.length - 1].tok + log[log.length - 1].max <= WIN, '2. the request that was answered fits the window', log.slice(-1)[0]);
  ok(/oldest \d+ messages? (was|were) left out/.test(r.note || ''), '2. a plain note under the reply says what was left out', r.note);
  ok(r.seen.some((s) => /Fitting the conversation/.test(s)), '2. the status line says what Ingenium is doing while it fits the conversation', r.seen);
  const learnt = await p.evaluate(() => (state.cloud.info['claude-fable-5-1'] || {}).cpt);
  ok(learnt > 0 && learnt <= 1.0, '2. the service\'s own count (about 1 character a token here) is kept for this model', learnt);
  await settle(); log = [];
  r = await send('And one more question in the same conversation.');
  ok(r.done && /Hello from the stand-in/.test(r.text) && log.length === 1 && log[0].tok + log[0].max <= WIN, '2. the next message in the conversation fits the first time', { calls: log });
  // 3. a reply asked longer than the model gives (the model's longest reply not known yet): refused once, the longest is kept
  cpt = 2.5; plan = []; log = [];
  await setup(2000, false);
  await p.evaluate(() => { $('ctlTokens').max = '131072'; $('ctlTokens').value = '100000'; });
  r = await send('A short question.');
  const learned = await p.evaluate(() => (state.cloud.info['claude-test-5'] || {}).out);
  ok(r.done && /Hello from the stand-in/.test(r.text) && log.length === 2 && log[1].max <= OUTMAX, '3. a reply asked longer than the model gives is asked again within its limit, and answered', { calls: log });
  ok(learned === OUTMAX, '3. the model\'s longest reply (' + OUTMAX + ') is kept for the next message', learned);
  plan = []; log = []; r = await send('Another short question.');
  ok(r.done && log.length === 1 && log[0].max <= OUTMAX, '3. the next message fits the first time', log);
  await p.evaluate(() => { $('ctlTokens').value = '1024'; });
  // 4. the key's tokens a minute (429): the reply waits, says so, fits the conversation to a minute's allowance, and is answered
  cpt = 2.5; plan = ['rate']; log = [];
  await setup(150000, true);
  r = await send('Answer after the wait.');
  ok(r.done && /Hello from the stand-in/.test(r.text) && log.length === 2, '4. after the key\'s per-minute limit, Ingenium waits and sends again, and the reply comes', { calls: log, text: (r.text || '').slice(0, 300) });
  ok(r.seen.some((s) => /limit of tokens a minute/.test(s) && /Trying again in N seconds/.test(s)), '4. the status line says why it waits, and counts down', r.seen);
  ok(log.length === 2 && log[1].tok <= 30000 * 0.9, '4. the message sent again fits within a minute\'s allowance of 30,000 tokens (' + (log[1] && log[1].tok) + ')', log[1]);
  // 5. the limit stays: after two waits the reply says so in plain words, and nothing is sent a fourth time
  plan = ['rate', 'rate', 'rate', 'rate']; log = [];
  r = await send('This one keeps hitting the limit.');
  ok(r.done && log.length === 3 && /API key reached its limit of tokens a minute/.test(r.text || '') && /Wait a minute and send again/.test(r.text || ''), '5. a limit that stays is said in plain words after two waits (3 requests)', { calls: log.length, text: r.text });
  // 6. a busy service (529): sent again after a short wait
  plan = ['busy']; log = [];
  r = await send('Are you busy?');
  ok(r.done && /Hello from the stand-in/.test(r.text) && log.length === 2 && r.seen.some((s) => /busy at the moment/.test(s)), '6. a busy service is asked again after a short wait, saying so', { calls: log.length, seen: r.seen });
  // 7. a reply that has begun is never sent again (no word doubled)
  plan = ['cut']; log = [];
  r = await send('Start then stop.');
  ok(r.done && log.length === 1 && (r.text || '').split('The first words of a reply').length === 2, '7. an error after the reply began is not sent again, and the words already written stay once', { calls: log.length, text: r.text });
  // 8. Stop during a wait ends it at once, and nothing more is sent
  plan = ['rate', 'rate']; log = [];
  await p.evaluate(() => { window.ingLimitWaitScale = 1; });
  const n0 = await p.evaluate(() => curMsgs().length);
  await p.fill('#chatInput', 'Stop me while I wait.'); await p.evaluate(() => sendChat());
  await p.waitForFunction(() => { const m = curMsgs(); const l = m[m.length - 1]; return l && /Trying again/.test(l.status || ''); }, null, { timeout: 30000 }).catch(() => {});
  await p.evaluate(() => { try { cloudAbort(); } catch (e) {} });
  await p.waitForTimeout(2500);
  const st8 = await p.evaluate((n0) => { const m = curMsgs(); const l = m[m.length - 1]; return { live: !!l.live, text: l.text, n: m.length - n0 }; }, n0);
  ok(!st8.live && log.length === 1, '8. Stop ends the wait at once; nothing more is sent', { calls: log.length, st8 });
  await p.evaluate(() => { window.ingLimitWaitScale = 0.01; });
  // 9. the kinds of refusal read from the services' own words (OpenAI's included)
  const kinds = await p.evaluate(() => [
    'HTTP 400 prompt is too long: 1046321 tokens > 1000000 maximum',
    "HTTP 400 This model's maximum context length is 128000 tokens. However, your messages resulted in 150000 tokens.",
    'HTTP 400 max_tokens: 200000 > 128000, which is the maximum allowed number of output tokens for claude-fable-5-1',
    'HTTP 400 input length and `max_tokens` exceed context limit: 990000 + 128000 > 1000000, decrease input length or `max_tokens` and try again',
    "HTTP 429 This request would exceed your organization's rate limit of 450,000 input tokens per minute.",
    'HTTP 529 Overloaded', 'HTTP 413 request_too_large', 'HTTP 401 invalid x-api-key', 'Stopped.'].map((m) => window.ingLimitKind(new Error(m))));
  ok(kinds[0] && kinds[0].type === 'long' && kinds[0].limit === 1000000 && kinds[0].actual === 1046321
    && kinds[1] && kinds[1].type === 'long' && kinds[1].limit === 128000 && kinds[1].actual === 150000
    && kinds[2] && kinds[2].type === 'maxtok' && kinds[2].max === 128000
    && kinds[3] && kinds[3].type === 'sum' && kinds[3].input === 990000 && kinds[3].win === 1000000
    && kinds[4] && kinds[4].type === 'rate' && kinds[4].perMin === 450000
    && kinds[5] && kinds[5].type === 'busy' && kinds[6] && kinds[6].type === 'long' && kinds[7] === null && kinds[8] === null,
    '9. each refusal is read for what it is (too long, reply too long, the two together, a minute\'s tokens, busy); a wrong key or Stop is not retried', kinds);
  // 10. the agent's mark on the chat's history is kept on every copy (r190's coding agent needs it)
  const mark = await p.evaluate(() => { const a = [{ role: 'system', content: 'x'.repeat(5000) }, { role: 'user', content: 'y'.repeat(50000) }, { role: 'assistant', content: 'z'.repeat(50000) }, { role: 'user', content: 'last' }];
    Object.defineProperty(a, '__ingChat', { value: true, enumerable: false }); const f = window.ingFitMessages(a, 20000); return { mark: f.__ingChat === true, n: f.length, first: f[1] && f[1].role, size: f.reduce((s, m) => s + m.content.length, 0) }; });
  ok(mark.mark && mark.first === 'user' && mark.size <= 21000, '10. a fitted history keeps the chat\'s own mark, starts with the person\'s message, and fits', mark);
  ok(await p.evaluate(() => Object.values(window.__ingParts || {}).every(v => v === 'running')), 'every part of the page ran to its end');
  ok(errs.length === 0, 'no script errors on the page', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
