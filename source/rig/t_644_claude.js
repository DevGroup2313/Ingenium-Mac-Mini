// node rig/t_644_claude.js <Ingenium page url> <out dir>
// Claude through a connection, within each model's own limits (Ingenium 6.44; modules/r195.js, r190.js, r206.js, build_page.py 6.44).
// Her words (6 November 2026): "Ingenium keeps on failling when I try to use Claude's Opus model in the chat, it keeps on giving me an
// error message saying that the connection failed because of max token limits." A stand-in for Anthropic's Messages API (page.route,
// at the page's own address) refuses, as the service does, a reply asked longer than the model gives ("max_tokens: N > M, which is the
// maximum allowed number of output tokens for ..."), and once, a key's tokens a minute (429). The key is invented.
// Checks: the model list's limits are kept; the chat with Longest reply far above the model's asks Opus 5.5 for no more than 128,000
// and answers; a chat with a file (the working loop, with its tools) the same; an older Opus that the list does not name is asked
// within its family's ceiling, and when the service says it gives fewer, Ingenium asks again within that figure, keeps it and answers
// in the same reply, in the chat and in the working loop; a refusal for a key's tokens a minute in the working loop is waited out;
// a request on its own connection (Blend) is asked within the model's ceiling; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const LIM = { 'claude-opus-5-5': 128000, 'claude-opus-4-5': 4000 };   // the stand-in's own figures (the older one invented low, so that it refuses)
const ev = (o) => 'event: ' + o.type + '\ndata: ' + JSON.stringify(o) + '\n\n';
const reply = (model, text) => ev({ type: 'message_start', message: { model, usage: { input_tokens: 10 } } }) + ev({ type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } })
  + ev({ type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text } }) + ev({ type: 'content_block_stop', index: 0 })
  + ev({ type: 'message_delta', delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 6 } }) + ev({ type: 'message_stop' });
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const p = await (await b.newContext({ viewport: { width: 1360, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  const sent = []; let rateOnce = false;
  await p.route('**/mockanthropic/v1/models**', (route) => route.fulfill({ status: 200, contentType: 'application/json',
    body: JSON.stringify({ data: [{ id: 'claude-opus-5-5', display_name: 'Claude Opus 5.5', max_tokens: 128000, max_input_tokens: 1000000 }], has_more: false }) }));
  await p.route('**/mockanthropic/v1/messages', (route) => { const bd = JSON.parse(route.request().postData() || '{}'); sent.push({ model: bd.model, max_tokens: bd.max_tokens, tools: (bd.tools || []).length });
    if (rateOnce && (bd.tools || []).length) { rateOnce = false; return route.fulfill({ status: 429, contentType: 'application/json', headers: { 'retry-after': '1' },
      body: JSON.stringify({ type: 'error', error: { type: 'rate_limit_error', message: 'This request would exceed the rate limit for your organization of 30,000 input tokens per minute. Please retry after 1 seconds.' } }) }); }
    const lim = LIM[bd.model] || 32000;
    if (bd.max_tokens > lim) return route.fulfill({ status: 400, contentType: 'application/json',
      body: JSON.stringify({ type: 'error', error: { type: 'invalid_request_error', message: 'max_tokens: ' + bd.max_tokens + ' > ' + lim + ', which is the maximum allowed number of output tokens for ' + bd.model } }) });
    return route.fulfill({ status: 200, contentType: 'text/event-stream', body: reply(bd.model, 'Hello from ' + bd.model + '.') }); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500);
  const BASE = new URL(URL_).origin + '/mockanthropic';
  // the connection, and its model list read
  await p.evaluate(async (BASE) => { state.cloud = { on: true, provider: 'anthropic', base: BASE, key: 'sk-ant-invented-not-real', model: 'claude-opus-5-5', models: ['claude-opus-5-5'] }; state.chatSource = 'cloud'; saveState();
    window.ingLimitWaitScale = 0.02; await cxFetch(BASE + '/v1/models', { headers: { 'x-api-key': 'sk-ant-invented-not-real', 'anthropic-version': '2023-06-01' } }); await new Promise(r => setTimeout(r, 400)); }, BASE);
  const info = await p.evaluate(() => (state.cloud.info || {})['claude-opus-5-5'] || null);
  ok(info && info.out === 128000 && info.ctx === 1000000, 'the model list\'s own limits are kept for the model (1,000,000 to read, 128,000 to write)', info);
  // Longest reply set far above any model's (as a local model's reply length can be)
  const big = () => p.evaluate(() => { const t = document.getElementById('ctlTokens'); t.max = '300000'; t.value = '300000'; });
  const chatOnce = async (text, file) => { await p.evaluate(() => go('chat')); await p.waitForTimeout(300);
    await p.evaluate(() => { const n = document.getElementById('chatNew'); if (n) n.click(); }); await p.waitForTimeout(300); await big();
    if (file) await p.evaluate((f) => stageText(f[0], f[1], false), file);
    await p.fill('#chatInput', text); const n0 = sent.length; await p.evaluate(() => sendChat());
    await p.waitForFunction(() => { const m = curMsgs(); const last = m[m.length - 1]; return last && last.role === 'bot' && !last.live; }, null, { timeout: 60000 }).catch(() => {});
    await p.waitForTimeout(300);
    const last = await p.evaluate(() => { const m = curMsgs(), x = m[m.length - 1] || {}; return { text: String(x.text || '').slice(0, 400), note: String(x.note || '').slice(0, 300) }; });
    return { last, reqs: sent.slice(n0) }; };
  const r1 = await chatOnce('Say hello.');
  ok(r1.reqs.length >= 1 && r1.reqs.every(q => q.max_tokens <= 128000) && /Hello from claude-opus-5-5/.test(r1.last.text), 'the chat asks Opus 5.5 for no more than its 128,000, however long Longest reply is, and it answers', r1);
  const r2 = await chatOnce('Read this file and say hello.', ['notes.txt', 'Invented notes for the test.\nA second line.']);
  ok(r2.reqs.length >= 1 && r2.reqs.every(q => q.max_tokens <= 128000) && r2.reqs.some(q => q.tools > 0) && /Hello from claude-opus-5-5/.test(r2.last.text), 'a chat with a file (the working loop, its tools sent) asks within the same ceiling, and it answers', r2);
  // an older Opus that the list does not name: its family's ceiling first; the service's own figure when it refuses
  await p.evaluate(() => { state.cloud.model = 'claude-opus-4-5'; delete (state.cloud.info || {})['claude-opus-4-5']; saveState(); });
  const r3 = await chatOnce('Say hello again.');
  const kept3 = await p.evaluate(() => ((state.cloud.info || {})['claude-opus-4-5'] || {}).out || 0);
  ok(r3.reqs.length >= 2 && r3.reqs[0].max_tokens <= 32000 && r3.reqs[r3.reqs.length - 1].max_tokens <= 4000 && /Hello from claude-opus-4-5/.test(r3.last.text) && kept3 === 4000,
    'an older Opus not in the list is asked within its family\'s ceiling; refused, Ingenium asks again within the service\'s figure, keeps it, and the reply comes', { reqs: r3.reqs, kept3, last: r3.last });
  await p.evaluate(() => { delete (state.cloud.info || {})['claude-opus-4-5']; saveState(); });
  const r4 = await chatOnce('Read this file and say hello again.', ['notes.txt', 'Invented notes for the test.']);
  ok(r4.reqs.length >= 2 && r4.reqs[r4.reqs.length - 1].max_tokens <= 4000 && r4.reqs.some(q => q.tools > 0) && /Hello from claude-opus-4-5/.test(r4.last.text),
    'the same in a chat with a file: the working loop asks again within the service\'s figure and the reply comes (before, it sent the same request four times and failed)', { reqs: r4.reqs, last: r4.last });
  // a key's tokens a minute, refused once, in the working loop
  await p.evaluate(() => { state.cloud.model = 'claude-opus-5-5'; saveState(); }); rateOnce = true;
  const r5 = await chatOnce('Read this file and answer.', ['notes.txt', 'Invented notes for the test.']);
  ok(r5.reqs.length >= 2 && /Hello from claude-opus-5-5/.test(r5.last.text), 'a refusal for the key\'s tokens a minute is waited out, and the reply comes', { reqs: r5.reqs, last: r5.last });
  // Blend's own request: the model's ceiling, never the slider's
  const bl = await p.evaluate(() => ({ opus: ingOutFor('claude-opus-5-5', 300000), haiku: ingOutFor('claude-haiku-4-5', 300000), older: ingOutFor('claude-sonnet-4-5', 300000), fable: ingOutFor('claude-fable-5-1', 999999) }));
  ok(bl.opus === 128000 && bl.haiku === 64000 && bl.older <= 64000 && bl.fable === 128000, 'a request on its own connection (Blend) is asked within each model\'s ceiling', bl);
  await p.screenshot({ path: OUT + '/chat.png' });
  ok(errs.length === 0, 'no script errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
