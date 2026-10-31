// Ingenium 6.9.1 · a longer memory, seen (modules/r195.js and the R195 edits in build_page.py), in Chromium, against the stand-in
// cloud server rig/mockcloud.py (started here) and a stand-in model on the device. The owner's words (30 October 2026): "I want
// for context and tokens to be massively increased inside of Ingenium." Checks:
//   - the page's own engine: the slider's maximum and the history's budget equal the memory the engine really loaded (its
//     real cap: 8,192, or 32,768 where the fast build runs on 8 GB or more), never a slider above it;
//   - a document asked of a server on this computer (Ollama's form, LM Studio's) with Thinking off is given its room:
//     num_predict and max_tokens of at least 6,144;
//   - a connected model's window and longest reply are read from the service's own list (a million tokens, 128,000), the
//     slider reaches 128,000, the reply asked for is at least the slider and at most the model's own cap; the fallback by
//     version when no list was read; a reply of more than 32,000 tokens is given 1,800 seconds through the apps' relay;
//   - the memory meter under the Context window slider and the pill beside the model key: the service's own count after a
//     connected reply, an estimate after a reply on the device, the messages in the window and those recalled;
//   - the rolling summary: once a long conversation's oldest messages are put away, a summary is written in the background
//     (at most 4,000 characters) and travels with the newest message sent, with 60% of the brief's room;
//   - a personal AI's length never cuts a document below replyTokens(); a thinking budget comes on top of the reply;
//   - the computer app's automatic memory reaches 262,144 for a model trained for it, by the 70% rule; the reading page's
//     parts follow a lender's window when it is known; no page errors.
//   node rig/t_695_memory.js http://127.0.0.1:8153/ingenium.html <out folder> [mock port, default 18795]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [URL_, OUT, PORT_] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const PORT = +PORT_ || 18795, MOCK = 'http://127.0.0.1:' + PORT, LOG = path.join(OUT, 'mock_req.json');
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; };
const SUMMARY = 'The person is cataloguing the letters of the abbey of Cluny with the assistant. Decisions: Abbot Hugh is the author of folio 12; the date 1088 stands. Open tasks: check folios 30 to 40, write the catalogue entry for folio 12. Files: cluny_letters.docx.';

async function boot(ctx) {
  const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(400); return p;
}
// a model on the device, as rig/t_62_import.js stands one in; its replies are kept, and it writes the summary when asked for one
const fakeModel = (p, ctx) => p.evaluate(([ctx, SUMMARY]) => {
  state.models = state.models || []; if (!state.models.some(m => m.id === 'imp-test')) state.models.push({ id: 'imp-test', customName: 'Faber (test)', fileState: 'ready', sizeBytes: 1, effort: 3, tokens: 1024, ctx: ctx || 8192 });
  state.activeModelId = 'imp-test'; Engine.modelId = 'imp-test'; Engine.status = 'ready'; Engine.adapter = { hasImageInput: false };
  state.chatSource = 'local'; if (state.cloud) state.cloud.on = false;
  if (ctx) { document.getElementById('ctlCtx').value = String(ctx); }
  window.__sent = []; window.__sum = 0; Engine.generate = function (o) {
    const sys = (o.messages[0] && o.messages[0].role === 'system') ? String(o.messages[0].content) : '';
    if (/running summary/.test(sys)) { window.__sum++; window.__sumAsk = o; (window.__sumAsks = window.__sumAsks || []).push(o); try { o.onToken && o.onToken(SUMMARY); } catch (e) { } return Promise.resolve({ text: SUMMARY, stats: {} }); }
    window.__sent.push(o.messages.map(m => ({ role: m.role, content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) })));
    try { o.onToken && o.onToken('Carrying on from where we were.'); } catch (e) { } return Promise.resolve({ text: 'Carrying on from where we were.', stats: {} }); };
}, [ctx, SUMMARY]);
const reqs = () => { try { return JSON.parse(fs.readFileSync(LOG, 'utf8')); } catch (e) { return []; } };
const lastPost = (re) => reqs().filter(x => x.method === 'POST' && re.test(x.path)).pop() || null;
const waitReply = (p) => p.waitForFunction(() => { const m = curMsgs(); const l = m[m.length - 1]; return l && l.role === 'bot' && !l.live && !l.preview && !l.wake && (typeof liveBot === 'undefined' || !liveBot); }, null, { timeout: 90000 });
const send = async (p, text) => { const n0 = await p.evaluate(() => curMsgs().length); await p.fill('#chatInput', text); await p.evaluate(() => sendChat()); await p.waitForFunction(n => curMsgs().length > n, n0, { timeout: 30000 }); await waitReply(p); await p.waitForTimeout(500); };

(async () => {
  fs.writeFileSync(LOG, '[]');
  const mock = cp.spawn('python3', [path.join(__dirname, 'mockcloud.py'), String(PORT), LOG], { stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 800));
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  let p = await boot(ctx);
  try {
    ok(await p.evaluate(() => !!(window.IngMem && window.IngMemory && window.__ingParts.p195 === 'running' && typeof ingReplyCap === 'function' && typeof ingUsageAsk === 'function')), 'the longer memory is in the page (r195 running, its helpers named)');
    ok(await p.evaluate(() => !!(window.chatHistory.__r190 && Engine.generate.__r190 && window.cloudChat.__r190)), 'the working loop\'s marks on the functions r195 wraps are kept');

    // ---- 1. the page's own engine: the memory it really loaded ----
    const w1 = await p.evaluate(() => {
      const src = String(WllamaAdapter.load); const edits = /WllamaAdapter\.loaded=\{ctx:lopts\.n_ctx\}/.test(src) && /ingCtxMax\(model\)/.test(src);
      const m = { id: 'wasm-test', customName: 'Page engine (test)', fileState: 'ready', sizeBytes: 1, ctx: 32768 }; state.models.push(m); state.activeModelId = m.id;
      state.chatSource = 'local'; if (state.cloud) state.cloud.on = false;
      Engine.adapter = WllamaAdapter; Engine.modelId = m.id; Engine.status = 'ready';
      const cap = ingCtxMax(m); WllamaAdapter.loaded = { ctx: Math.min(m.ctx, cap) }; document.getElementById('ctlCtx').value = '32768'; paintChatCtl();
      const c = document.getElementById('ctlCtx'), rt = replyTokens(), n = WllamaAdapter.loaded.ctx;
      const want = Math.max(1500, (n - Math.min(rt, Math.floor(n * 0.5)) - 256) * 3);
      const r = { edits, cap, pageMax: ingPageCtxMax(), max: +c.max, val: +c.value, loaded: n, budget: chatBudget(), want, fast: !ingNeedsCompat(), mem: deviceMemGB(), lx: typeof lxCtx === 'function' ? lxCtx(m) : null };
      WllamaAdapter.loaded = { ctx: 4096 }; r.budget4k = chatBudget(); r.want4k = Math.max(1500, (4096 - Math.min(replyTokens(), 2048) - 256) * 3);
      WllamaAdapter.loaded = null; Engine.adapter = null; Engine.modelId = null; Engine.status = 'disconnected'; state.models = state.models.filter(x => x.id !== 'wasm-test');
      return r; });
    ok(w1.edits, 'the page\'s engine records the memory it loaded (WllamaAdapter.loaded.ctx) and may be given up to ingCtxMax', w1.edits);
    ok(w1.cap === w1.pageMax && (w1.pageMax === 8192 || w1.pageMax === 32768) && (w1.pageMax === 32768) === (w1.fast && w1.mem >= 8),
      'the page\'s engine\'s cap is its real one: 32,768 only with the fast build on 8 GB or more, else 8,192', { cap: w1.cap, fast: w1.fast, mem: w1.mem });
    ok(w1.max === w1.cap && w1.val <= w1.cap && w1.loaded === w1.cap, 'the Context window slider stops at the real cap, and the engine loads that', { max: w1.max, val: w1.val, loaded: w1.loaded });
    ok(w1.budget === w1.want && w1.budget <= w1.loaded * 3 && w1.budget4k === w1.want4k && w1.budget4k < w1.budget, 'the history\'s budget follows the memory the engine loaded (32K or 8K, and 4K when it loaded 4K), never the slider', { budget: w1.budget, want: w1.want, budget4k: w1.budget4k });
    ok(w1.lx === null || w1.lx === w1.loaded, 'the reading page sizes its parts to the engine\'s loaded memory too', w1.lx);

    // ---- 2. a document asked of a server on this computer, Thinking off ----
    await p.evaluate(M => { state.cloud = { provider: 'ollama-local', base: M, key: '', model: 'llama3.2:3b', models: ['llama3.2:3b'], on: true }; state.chatSource = 'cloud'; state.thinking = false;
      document.getElementById('ctlTokens').value = '1024'; saveState(); document.getElementById('chatNew').click(); go('chat'); }, MOCK);
    await p.waitForTimeout(300);
    await send(p, 'Write my cover letter for the lectureship in digital history as a Word document.');
    const q1 = lastPost(/\/api\/chat$/), b1 = (q1 && q1.body) || {};
    ok(b1.options && b1.options.num_predict >= 6144 && !b1.think && b1.options.num_ctx >= 32768, 'Ollama, Thinking off: a document is given at least 6,144 tokens (num_predict), and told how much to keep (num_ctx)', b1.options);
    const meterO = await p.evaluate(() => ({ line: document.getElementById('ctlMemUse').textContent, how: IngMem.use.last && IngMem.use.last.how }));
    ok(/^Memory in use: 19 of 32,768 tokens \(0%\) · \d+ messages? in the window/.test(meterO.line) && /server's own count/.test(meterO.how), 'the meter reads Ollama\'s own count of the prompt and the reply', meterO);
    await p.evaluate(M => { state.cloud = { provider: 'lmstudio', base: M + '/v1', key: '', model: 'qwen3-8b', models: ['qwen3-8b'], on: true }; state.chatSource = 'cloud'; state.thinking = false; saveState(); document.getElementById('chatNew').click(); }, MOCK);
    await p.waitForTimeout(300);
    await send(p, 'Write the whole proposal as a Word document, please.');
    const q2 = lastPost(/\/chat\/completions$/), b2 = (q2 && q2.body) || {};
    ok(b2.max_tokens >= 6144 && b2.stream_options && b2.stream_options.include_usage === true, 'LM Studio, Thinking off: a document is given at least 6,144 tokens (max_tokens), and the count of tokens is asked for', { max: b2.max_tokens, so: b2.stream_options });
    const meterL = await p.evaluate(() => document.getElementById('ctlMemUse').textContent);
    ok(/^Memory in use: 19 of 32,768 tokens \(0%\)/.test(meterL), 'the meter reads the server\'s count from the stream\'s last chunk', meterL);

    // ---- 3. a connected model's window and longest reply, from the service's own list ----
    const w3 = await p.evaluate(async M => {
      state.cloud = { provider: 'anthropic', base: M, key: 'sk-test-123', model: '', models: [], on: true }; state.chatSource = 'cloud'; state.thinking = false; saveState();
      const chosen = await ensureCloudModel(); const info = state.cloud.info || {};
      const r = { chosen, info, win: ingCloudWindow(), replyMax: ingReplyMax(null) };
      state.cloud.model = 'claude-haiku-4-5'; r.winOld = ingCloudWindow(); r.replyOld = ingReplyMax(null);
      // no list read: the version in the id decides, a million from 4.6 on, 200,000 before
      const keep = state.cloud.info; delete state.cloud.info;
      const by = m => { state.cloud.model = m; return ingCloudWindow(); };
      r.rule = [by('claude-opus-5-5'), by('claude-fable-5-1'), by('claude-sonnet-4-6'), by('claude-haiku-4-5'), by('claude-opus-4-1-20250805'), by('claude-3-7-sonnet-20250219'), by('claude-opus-5-5[1m]')];
      r.replyNoList = ingReplyMax(null); state.cloud.window = 65536; r.chosenWin = ingCloudWindow(); state.cloud.window = 0;
      state.cloud.info = keep; state.cloud.model = 'claude-opus-5-5'; paintChatCtl(); r.sliderMax = +document.getElementById('ctlTokens').max; r.target = [IngMem.target(600000), IngMem.target(16128)];
      return r; }, MOCK);
    ok(w3.chosen === 'claude-opus-5-5' && w3.info['claude-opus-5-5'] && w3.info['claude-opus-5-5'].ctx === 1000000 && w3.info['claude-opus-5-5'].out === 128000 && w3.info['claude-haiku-4-5'].ctx === 200000,
      'the model list is read: each model\'s window and longest reply kept by id (a million and 128,000; 200,000 and 64,000)', w3.info);
    ok(w3.win === 1000000 && w3.replyMax === 128000 && w3.winOld === 200000 && w3.replyOld === 64000, 'the window and the slider\'s reach come from the list (1M and 128K; 200K and 64K for the older one)', [w3.win, w3.replyMax, w3.winOld, w3.replyOld]);
    ok(w3.rule.join() === '1000000,1000000,1000000,200000,200000,200000,1000000' && w3.replyNoList === 131072 && w3.chosenWin === 65536,
      'without a list, the version in the id decides (a million from 4.6, 200,000 before; the [1m] mark kept); a window chosen by hand still wins', w3.rule);
    ok(w3.sliderMax === 128000 && w3.target[0] === 48000 && w3.target[1] === 4515, 'the Longest reply slider reaches 128,000 on this connection; the recall\'s room scales with the memory (48,000 characters at 200K; a quarter of a small memory)', [w3.sliderMax, w3.target]);
    await p.evaluate(() => { document.getElementById('ctlTokens').value = '65536'; paintChatCtl(); document.getElementById('chatNew').click(); });
    await send(p, 'Say hello in five words.');
    const q3 = lastPost(/\/v1\/messages$/), b3 = (q3 && q3.body) || {};
    ok(b3.max_tokens >= 65536 && b3.max_tokens <= 128000 && b3.stream === true, 'the reply asked of the connection is at least the slider (65,536) and at most the model\'s own longest reply (128,000)', { max: b3.max_tokens, model: b3.model });
    // ---- 5. the meter after a connected reply ----
    const m5 = await p.evaluate(() => ({ line: document.getElementById('ctlMemUse').textContent, pill: document.getElementById('ingMemPill').textContent, title: document.getElementById('ingMemPill').title, use: IngMem.use.last, win: IngMem.window(), fit: document.getElementById('ctlCtxFit').textContent }));
    ok(/^Memory in use: 17 of 1,000,000 tokens \(0%\) · \d+ messages? in the window$/.test(m5.line) && m5.use && m5.use.inTok === 10 && m5.use.outTok === 7 && /service's own count/.test(m5.use.how),
      'the meter under the slider: the service\'s own count (10 in, 7 out) of 1,000,000, and the messages in the window', m5.line);
    ok(/^17 of 1M$/.test(m5.pill.trim()) && /Memory in use: 17 of 1,000,000/.test(m5.title) && m5.fit === '', 'the pill beside the model key says the same in short, and opens Controls; no fit verdict for a connection', { pill: m5.pill, title: m5.title.slice(0, 80) });
    // a reply of more than 32,000 tokens through the apps' relay is given 1,800 seconds
    const relaySeen = [];
    await p.route('**/_relay', async route => { const j = route.request().postDataJSON(); relaySeen.push({ url: j.url, timeout: j.timeout, max: (() => { try { return JSON.parse(j.body).max_tokens; } catch (e) { return null; } })() });
      const ev = (t, d) => `event: ${t}\ndata: ${JSON.stringify(Object.assign({ type: t }, d))}\n\n`;
      const body = ev('message_start', { message: { id: 'm', model: 'x', role: 'assistant', content: [], usage: { input_tokens: 3000, output_tokens: 0 } } }) + ev('content_block_start', { index: 0, content_block: { type: 'text', text: '' } }) +
        ev('content_block_delta', { index: 0, delta: { type: 'text_delta', text: 'Hello from the relay.' } }) + ev('content_block_stop', { index: 0 }) + ev('message_delta', { delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 5 } }) + ev('message_stop', {});
      await route.fulfill({ status: 200, headers: { 'X-Upstream-Status': '200', 'Content-Type': 'text/event-stream' }, body }); });
    await p.evaluate(() => { window.pywebview = { api: { relay_key: () => Promise.resolve('k') } }; });
    await send(p, 'Say hello again.');
    await p.evaluate(() => { delete window.pywebview; });
    const m5b = await p.evaluate(() => IngMem.use.last);
    ok(relaySeen.length === 1 && relaySeen[0].max === 128000 && relaySeen[0].timeout === 1800 && m5b && m5b.inTok === 3000 && m5b.outTok === 5, 'a reply of 128,000 tokens is given 1,800 seconds through the relay (900 before), and the count is read there too', { relay: relaySeen, use: m5b });
    await p.unroute('**/_relay');

    // ---- 4. the rolling summary ----
    await fakeModel(p, 8192);
    await p.evaluate(() => { state.thinking = false; document.getElementById('ctlTokens').value = '1024'; document.getElementById('chatNew').click(); go('chat'); const c = curChat(); c.title = 'The letters of Cluny';
      const t0 = Date.now() - 4 * 864e5;
      for (let i = 0; i < 140; i++) c.messages.push(i % 2 ? { role: 'bot', text: 'Reply ' + i + ': folio ' + i + ' names Abbot Hugh and gives the year 1088; the entry for it is drafted in cluny_letters.docx.', at: t0 + i * 60000, done: t0 + i * 60000 + 5000, by: 'Faber (test)' }
        : { role: 'me', text: 'Question ' + i + ': what does folio ' + i + ' of the Cluny letters say about the abbot?', at: t0 + i * 60000 });
      trimChat(); saveState(); renderChat(); });
    const arch = await p.evaluate(() => ({ left: curMsgs().length, earlier: (curChat().earlier || []).reduce((a, x) => a + x.n, 0) }));
    ok(arch.left === 60 && arch.earlier === 80, 'past 100 messages the oldest 80 are put away (r103), which starts the summary', arch);
    await p.waitForFunction(() => !!(curChat().summary), null, { timeout: 30000 }).catch(() => { });
    const s4 = await p.evaluate(() => { const c = curChat(); return { summary: c.summary || '', n: c.summaryN, asks: window.__sum, sys: window.__sumAsk && window.__sumAsk.messages[0].content.slice(0, 60), user: window.__sumAsks && window.__sumAsks[0].messages[1].content, last: window.__sumAsk && window.__sumAsk.messages[1].content.slice(0, 120), params: window.__sumAsk && window.__sumAsk.params, busy: IngMem.state.busy, status: Engine.status }; });
    ok(s4.summary.length > 0 && s4.summary.length <= 4000 && s4.summary.indexOf('Abbot Hugh') >= 0 && s4.n === 80, 'the summary is written in the background over the 80 messages put away: not empty, at most 4,000 characters, names kept', { len: s4.summary.length, n: s4.n, asks: s4.asks });
    ok(s4.asks >= 1 && s4.asks <= 4 && /running summary/.test(s4.sys) && /^The summary so far:\n\(nothing yet/.test(s4.user) && /\[Them, \d{4}-\d{2}-\d{2}\] Question 0:/.test(s4.user) && (s4.asks === 1 || /^The summary so far:\nThe person is cataloguing/.test(s4.last)) && s4.params && s4.params.max_tokens === 600 && s4.params.thinking === false,
      'asked of the model in at most four rounds, Thinking off, 600 tokens, the messages in order with who wrote them, each round carrying the summary so far', { asks: s4.asks, last: s4.last, params: s4.params });
    ok(!s4.busy && s4.status === 'ready', 'the engine is handed back when the summary is done', { busy: s4.busy, status: s4.status });
    await p.evaluate(() => { window.__sent = []; });
    await send(p, 'What did the abbot decide about folio 12?');
    const s4b = await p.evaluate(() => { const m = window.__sent[0] || []; const last = [...m].reverse().find(x => x.role === 'user') || {}; const t = last.content || '';
      return { msgs: m.length, head: t.slice(0, 400), hasBlock: /\[Earlier in this conversation\]/.test(t), hasSum: t.indexOf('A summary of it so far: The person is cataloguing the letters of the abbey of Cluny') >= 0, line: document.getElementById('ctlMemUse').textContent, pill: document.getElementById('ingMemPill').textContent, how: document.getElementById('ctlMemUse').title, budget: chatBudget(), all: m.reduce((a, x) => a + x.content.length, 0) }; });
    ok(s4b.hasBlock && s4b.hasSum && s4b.all <= s4b.budget * 1.05, 'the newest message sent carries the brief with the summary, within the memory', { msgs: s4b.msgs, head: s4b.head.slice(0, 220) });
    ok(/^Memory in use: [\d,]+ of 8,192 tokens \(\d+%\) · \d+ messages in the window · \d+ recalled$/.test(s4b.line) && /estimate/.test(s4b.how) && /^\d+K? of 8K$/.test(s4b.pill.trim()),
      'the meter after a reply on the device: an estimate of the tokens, the messages in the window, those recalled', { line: s4b.line, pill: s4b.pill });

    // ---- 6. a personal AI's length is a floor; a thinking budget comes on top of the reply ----
    const w6 = await p.evaluate(() => { state.ownAIs = (state.ownAIs || []).filter(a => a.id !== 'ai-test').concat([{ id: 'ai-test', name: 'Scribe (test)', settings: { length: 'medium', creativity: 'balanced', thinking: 'off' } }]);
      const c = curChat(); c.aiId = 'ai-test'; c.messages.push({ role: 'me', text: 'Write my cover letter for the lectureship as a Word document.', at: Date.now() });
      const m = state.models.find(x => x.id === 'imp-test'); document.getElementById('ctlTokens').value = '1024';
      const rt = replyTokens(), p1 = replyParams(m, { max_tokens: rt, ctx: 8192, thinking: thinkOn() });
      c.aiId = null; state.thinking = true; document.getElementById('ctlEffort').value = '3';
      const rt2 = replyTokens(), p2 = replyParams(m, { max_tokens: rt2, ctx: 8192, thinking: thinkOn() });
      state.thinking = false; c.messages.pop();
      return { rt, max1: p1.max_tokens, think1: p1.thinking, rt2, max2: p2.max_tokens, budget: p2.thinking_budget, want2: 1024 + (p2.thinking_budget || 0) + 512 }; });
    ok(w6.rt >= 6144 && w6.max1 >= w6.rt && w6.think1 === false, 'a personal AI set to a medium length (1,024) no longer cuts a document below replyTokens()', { rt: w6.rt, max: w6.max1 });
    ok(w6.budget > 0 && w6.max2 >= w6.want2 && w6.max2 >= w6.rt2, 'with Thinking on, the reply holds the slider, the thinking budget and 512 more', { budget: w6.budget, max: w6.max2, want: w6.want2 });

    // ---- the computer app's automatic memory, and the reading page on a lender ----
    const w7 = await p.evaluate(() => { const m = { id: 'desk-test', customName: 'Desk (test)', shellStored: true, fileState: 'ready', ctxLen: 262144, sizeBytes: 4.5e9, paramB: 7 };
      const keep = window.__INGENIUM_DEVICE; const at = g => { window.__INGENIUM_DEVICE = { ramGB: g }; return r1AutoCtx(m, DeskAdapter); };
      const r = { big: at(64), mid: at(24), small: at(12), none: (() => { window.__INGENIUM_DEVICE = { ramGB: 64 }; return r1AutoCtx(Object.assign({}, m, { ctxLen: 0 }), DeskAdapter); })(), header: /ggufInspect/.test(String(DeskAdapter.load)) };
      window.__INGENIUM_DEVICE = keep; return r; });
    ok(w7.big === 262144 && w7.mid === 131072 && w7.small === 49152 && w7.none === 131072 && w7.header, 'the computer app chooses 262,144 for a model trained for it on 64 GB (131,072 on 24 GB, 49,152 on 12 GB, by the 70% rule), 131,072 when the length is unknown, and reads the header first', w7);
    const w8 = await p.evaluate(() => { if (typeof lxCtx !== 'function') return null; const keep = JSON.stringify(state.cloud), ks = state.chatSource;
      state.cloud = { provider: 'ingenium', base: 'http://10.0.0.2:17953', key: 'k', model: 'scriba', models: ['scriba'], on: true, info: { scriba: { lineup: '', file: 'scriba.gguf', size: 1 } } }; state.chatSource = 'cloud';
      const m = { id: 'x', fileState: 'ready' }; const unknown = lxCtx(m); state.cloud.info.scriba.ctx = 65536; const known = lxCtx(m); state.cloud.info.scriba.ctx = 1000000; const capped = lxCtx(m);
      state.cloud = JSON.parse(keep); state.chatSource = ks; return { unknown, known, capped }; });
    ok(w8 === null || (w8.unknown === 8192 && w8.known === 65536 && w8.capped === 262144), 'the reading page keeps 8,192 on a lender whose window is unknown, follows it when known, and stops at 262,144', w8);
    ok(!p.__errs.length, 'no page errors', p.__errs.slice(0, 5));
    await p.screenshot({ path: path.join(OUT, 'controls.png') }).catch(() => { });
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close(); try { mock.kill(); } catch (e) { }
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
