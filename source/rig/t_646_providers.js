// node rig/t_646_providers.js <Ingenium page url> <out dir>
// Every provider within its model's limits (Ingenium 6.46; modules/r206.js, r190.js, build_page.py 6.46). Her words (6 November 2026):
// "I want the fix to be applied to all Claude models and Ollama's, GPT and every other provider, I want the caps gone and for the fixes to
// be applied to them as well inside of Ingenium to prevent anything else from crashing." A stand-in for a service of OpenAI's form
// (page.route, at the page's own address; the key and the model are invented) refuses a reply asked longer than its model gives, in
// OpenAI's own words, and once a key's tokens a minute.
// Checks: the chat asks again within the figure the service names, keeps it, and the reply comes; a chat with a file (the working loop)
// the same; a refusal for tokens a minute is waited out; Blend's own request asks within the figure kept; no page errors.
// Ollama (a stand-in of its form at /mockollama: /api/show says the model holds 131,072 tokens; the computer has memory for 65,536): a short
// chat is given 32,768 as before; a long one more, nothing left out; one longer than the memory is refused, given half, fitted, and the
// reply comes, the figure kept; the working loop now tells Ollama the memory it needs; a model whose own window is smaller is never given more.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const LIM = 4000;
const sse = (text) => 'data: ' + JSON.stringify({ choices: [{ index: 0, delta: { role: 'assistant', content: text } }] }) + '\n\n' + 'data: ' + JSON.stringify({ choices: [{ index: 0, delta: {}, finish_reason: 'stop' }] }) + '\n\ndata: [DONE]\n\n';
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const p = await (await b.newContext({ viewport: { width: 1360, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  const sent = []; let rateOnce = false;
  await p.route('**/mockopenai/**', (route) => { const u = route.request().url(); if (/\/models/.test(u)) return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: [{ id: 'gpt-invented-test' }] }) });
    const bd = JSON.parse(route.request().postData() || '{}'); const mt = bd.max_completion_tokens || bd.max_tokens; sent.push({ mt, tools: (bd.tools || []).length });
    if (rateOnce && (bd.tools || []).length) { rateOnce = false; return route.fulfill({ status: 429, contentType: 'application/json', headers: { 'retry-after': '1' },
      body: JSON.stringify({ error: { message: 'Rate limit reached for gpt-invented-test on tokens per min (TPM): Limit 30000, Used 29000, Requested 4000. Please try again in 1s.', type: 'tokens', code: 'rate_limit_exceeded' } }) }); }
    if (mt > LIM) return route.fulfill({ status: 400, contentType: 'application/json',
      body: JSON.stringify({ error: { message: 'max_tokens is too large: ' + mt + '. This model supports at most ' + LIM + ' completion tokens, whereas you provided ' + mt + '.', type: 'invalid_request_error', param: 'max_tokens', code: 'invalid_value' } }) });
    return route.fulfill({ status: 200, contentType: 'text/event-stream', body: sse('Hello from the invented model.') }); });
  const osent = []; const OWN = { 'invented-local:8b': 131072, 'invented-small:1b': 8192 }; const MEM = 65536;
  const nd = (o) => JSON.stringify(o) + '\n';
  await p.route('**/mockollama/**', (route) => { const u = route.request().url(); const bd = JSON.parse(route.request().postData() || '{}');
    if (/\/api\/tags/.test(u)) return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ models: Object.keys(OWN).map(n => ({ name: n, model: n, size: 1 })) }) });
    if (/\/api\/show/.test(u)) { const own = OWN[bd.model] || 4096; return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ model_info: { 'general.architecture': 'llama', 'llama.context_length': own, 'llama.block_count': 32 } }) }); }
    if (/\/api\/chat/.test(u)) { const o = bd.options || {}; const chars = (bd.messages || []).reduce((a, m) => a + String(m.content || '').length, 0);
      osent.push({ model: bd.model, num_ctx: o.num_ctx, chars, tools: (bd.tools || []).length, first: String(((bd.messages || [])[1] || {}).content || '').slice(0, 40) });
      if (o.num_ctx > MEM) return route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'model requires more system memory (24.0 GiB) than is available (16.0 GiB)' }) });
      return route.fulfill({ status: 200, contentType: 'application/x-ndjson', body: nd({ model: bd.model, message: { role: 'assistant', content: 'Hello from the invented local model.' }, done: false }) + nd({ model: bd.model, message: { role: 'assistant', content: '' }, done: true, done_reason: 'stop' }) }); }
    return route.fulfill({ status: 404, body: 'not found' }); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500);
  const BASE = new URL(URL_).origin + '/mockopenai/v1';
  await p.evaluate((BASE) => { state.cloud = { on: true, provider: 'openai', base: BASE, key: 'sk-invented-not-real', model: 'gpt-invented-test', models: ['gpt-invented-test'] }; state.chatSource = 'cloud'; saveState(); window.ingLimitWaitScale = 0.02; }, BASE);
  const chatOnce = async (text, file) => { await p.evaluate(() => go('chat')); await p.waitForTimeout(300);
    await p.evaluate(() => { const n = document.getElementById('chatNew'); if (n) n.click(); }); await p.waitForTimeout(300);
    await p.evaluate(() => { const t = document.getElementById('ctlTokens'); t.max = '300000'; t.value = '300000'; });
    if (file) await p.evaluate((f) => stageText(f[0], f[1], false), file);
    await p.fill('#chatInput', text); const n0 = sent.length; await p.evaluate(() => sendChat());
    await p.waitForFunction(() => { const m = curMsgs(); const last = m[m.length - 1]; return last && last.role === 'bot' && !last.live; }, null, { timeout: 60000 }).catch(() => {});
    await p.waitForTimeout(300);
    const last = await p.evaluate(() => { const m = curMsgs(), x = m[m.length - 1] || {}; return String(x.text || '').slice(0, 300); });
    return { last, reqs: sent.slice(n0) }; };
  const r1 = await chatOnce('Say hello.');
  const kept = await p.evaluate(() => ((state.cloud.info || {})['gpt-invented-test'] || {}).out || 0);
  ok(r1.reqs.length >= 2 && r1.reqs[r1.reqs.length - 1].mt <= LIM && /Hello from the invented model/.test(r1.last) && kept === LIM, 'a GPT-style service refuses the reply\'s length; the chat asks again within its figure, keeps it, and the reply comes', { reqs: r1.reqs, kept, last: r1.last });
  const r2 = await chatOnce('Say hello once more.');
  ok(r2.reqs.length === 1 && r2.reqs[0].mt <= LIM && /Hello from the invented model/.test(r2.last), 'the next message is asked within the kept figure the first time', r2);
  await p.evaluate(() => { delete (state.cloud.info || {})['gpt-invented-test']; saveState(); });
  const r3 = await chatOnce('Read this file and say hello.', ['notes.txt', 'Invented notes for the test.']);
  ok(r3.reqs.some(q => q.tools > 0) && r3.reqs[r3.reqs.length - 1].mt <= LIM && /Hello from the invented model/.test(r3.last), 'a chat with a file (the working loop, its tools sent) asks again within the figure, and the reply comes', r3);
  rateOnce = true;
  const r4 = await chatOnce('Read this file and answer.', ['notes.txt', 'Invented notes for the test.']);
  ok(r4.reqs.length >= 2 && /Hello from the invented model/.test(r4.last), 'a refusal for the key\'s tokens a minute is waited out, and the reply comes', r4);
  const bl = await p.evaluate(() => ingOutFor('gpt-invented-test', 300000));
  ok(bl === LIM, 'a request on its own connection (Blend) is asked within the figure kept for the model', bl);
  // ---- Ollama ----
  const OB = new URL(URL_).origin + '/mockollama';
  // compacting by itself (6.47) is turned off here: these checks are about the memory each request is given, not the summary
  await p.evaluate((OB) => { state.cloud = { on: true, provider: 'ollama-lan', base: OB, key: '', model: 'invented-local:8b', models: ['invented-local:8b', 'invented-small:1b'] }; state.chatSource = 'cloud'; state.compactAuto = false; saveState(); }, OB);
  const ochat = async (text, history) => { await p.evaluate(() => go('chat')); await p.waitForTimeout(250);
    await p.evaluate(() => { const n = document.getElementById('chatNew'); if (n) n.click(); }); await p.waitForTimeout(250);
    await p.evaluate(() => { const t = document.getElementById('ctlTokens'); t.value = '1024'; });
    if (history) await p.evaluate((h) => { const c = curChat(); for (let i = 0; i < h.n; i++) { c.messages.push({ role: 'me', text: 'Invented question ' + i + '. ' + 'tide '.repeat(h.w) }); c.messages.push({ role: 'bot', text: 'Invented answer ' + i + '. ' + 'harbour '.repeat(h.w) }); } saveState(); renderChat(); }, history);
    await p.fill('#chatInput', text); const n0 = osent.length; await p.evaluate(() => sendChat());
    await p.waitForFunction(() => { const m = curMsgs(); const last = m[m.length - 1]; return last && last.role === 'bot' && !last.live; }, null, { timeout: 60000 }).catch(() => {});
    await p.waitForTimeout(300);
    const last = await p.evaluate(() => { const m = curMsgs(), x = m[m.length - 1] || {}; return { text: String(x.text || '').slice(0, 300), note: String(x.note || '').slice(0, 300) }; });
    return { last, reqs: osent.slice(n0) }; };
  const o1 = await ochat('Say hello.');
  const own1 = await p.evaluate(() => ((state.cloud.info || {})['invented-local:8b'] || {}).own || 0);
  ok(o1.reqs.length === 1 && o1.reqs[0].num_ctx === 32768 && /invented local model/.test(o1.last.text) && own1 === 131072, 'Ollama: what the model holds is read from Ollama itself (131,072), and a short chat is given 32,768 as before', { reqs: o1.reqs, own1, last: o1.last });
  // about 31,000 tokens of conversation (7 exchanges of about 11,000 characters): given 65,536, nothing left out
  const o2 = await ochat('Sum up our conversation.', { n: 7, w: 850 });
  ok(o2.reqs.length === 1 && o2.reqs[0].num_ctx === 65536 && /invented local model/.test(o2.last.text) && !/left out/.test(o2.last.note) && /Invented question 0\./.test(JSON.stringify(o2.reqs[0].first) + '') , 'Ollama: a long conversation is given more memory (65,536, past the old 32,768), read whole, nothing left out', { reqs: o2.reqs, note: o2.last.note });
  // about 89,000 tokens (20 long exchanges, fewer than the 60 messages a conversation keeps at hand): 131,072 asked, refused for
  // memory, half given, fitted, the reply comes; the figure kept
  const o3 = await ochat('Sum up our conversation once more.', { n: 20, w: 850 });
  const mem3 = await p.evaluate(() => ((state.cloud.info || {})['invented-local:8b'] || {}).memCtx || 0);
  ok(o3.reqs.length === 2 && o3.reqs[0].num_ctx === 131072 && o3.reqs[1].num_ctx <= 65536 && /invented local model/.test(o3.last.text) && /left out/.test(o3.last.note) && mem3 === 65536, 'Ollama: a conversation larger than the computer\'s memory is refused, given half, fitted to it (said under the reply), and the reply comes; the figure is kept', { reqs: o3.reqs, mem3, last: o3.last });
  const o4 = await ochat('And again.', { n: 20, w: 850 });
  ok(o4.reqs.length === 1 && o4.reqs[0].num_ctx <= 65536 && /invented local model/.test(o4.last.text), 'Ollama: the next message is given what the computer holds, the first time', o4.reqs);
  // the working loop (a chat with a file): Ollama is told the memory it needs (before: nothing, so Ollama's own small default cut the start)
  const o5 = await (async () => { await p.evaluate(() => go('chat')); await p.waitForTimeout(250); await p.evaluate(() => { const n = document.getElementById('chatNew'); if (n) n.click(); }); await p.waitForTimeout(250);
    await p.evaluate(() => stageText('notes.txt', 'Invented notes for the test.', false)); await p.fill('#chatInput', 'Read this file and say hello.'); const n0 = osent.length; await p.evaluate(() => sendChat());
    await p.waitForFunction(() => { const m = curMsgs(); const last = m[m.length - 1]; return last && last.role === 'bot' && !last.live; }, null, { timeout: 60000 }).catch(() => {}); await p.waitForTimeout(300);
    return { reqs: osent.slice(n0), last: await p.evaluate(() => { const m = curMsgs(); return String((m[m.length - 1] || {}).text || '').slice(0, 200); }) }; })();
  ok(o5.reqs.length >= 1 && o5.reqs.every(q => q.num_ctx >= 32768 && q.num_ctx <= 65536) && o5.reqs.some(q => q.tools > 0) && /invented local model/.test(o5.last), 'Ollama: the working loop (its tools sent) tells Ollama the memory it needs, within what the computer holds', o5);
  // a model whose own window is smaller is never given more than it holds
  await p.evaluate(() => { state.cloud.model = 'invented-small:1b'; saveState(); });
  const o6 = await ochat('Say hello, small model.');
  ok(o6.reqs.length === 1 && o6.reqs[0].num_ctx === 8192 && /invented local model/.test(o6.last.text), 'Ollama: a model that holds 8,192 tokens is given 8,192, not more', o6.reqs);
  const bo = await p.evaluate(() => ingOllamaCtx([{ role: 'user', content: 'x'.repeat(100000) }], { provider: 'ollama-lan', model: 'other-model' }));
  ok(bo === 32768, 'Ollama in Blend: a long request on its own connection is given the memory it needs (before, 16,384 whatever it held)', bo);
  ok(errs.length === 0, 'no script errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
