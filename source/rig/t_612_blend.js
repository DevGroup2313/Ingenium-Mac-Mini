// Blend, deepened (Ingenium 6.12, modules/r218.js). Her words (4 November 2026): "Please deepen and expand the 'Blend' page so that it
// really enhances the app and provide great and powerful blend of models with thorough and precise reasoning and outstanding performance
// ... I want for Ingenium to work as an ecosystem"; and (3 November) "I want to be able to select low to Max effort and Ultracode inside
// of the chats and everywhere a model can be selected to run a task or do work inside of Ingenium."
// Every service is a stand-in: window.fetch answers Anthropic's Messages API, OpenRouter's chat completions and Ollama's /api/chat in
// their own streamed forms, and the engine on this device is a stand-in too (two invented models). Nothing goes online. The people and
// the keys are invented.
//   node rig/t_612_blend.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1200))); c ? pass++ : fail++; };

/* one stand-in model answers every kind of step, by the words of the step; the answers differ by model so that agreement can be counted */
const STAND = () => {
  window.__req = []; window.__checks = 0; window.__slow = 0; window.__loads = []; window.__gen = [];
  const ANSWER = { 'claude-opus-5-5': 'Paris', 'claude-haiku-4-5': 'Paris', 'stand-in-b': 'Paris', 'stand-in-c': 'Paris', 'qwen3:8b': 'Paris', 'loc-a': 'Lyon', 'loc-b': 'Paris' };
  window.__reply = function (model, prompt) {
    const p = String(prompt || '');
    if (/Before anyone answers, write the checklist/.test(p)) return '- Name the capital city\n- Give one true fact about it\n- Keep it to two sentences';
    if (/^Check the answer below/.test(p)) { window.__checks++; const plan = /CHECKLIST:/.test(p);
      return window.__checks === 1 ? 'WRONG: Lyon is the capital | WHY: the capital of France is Paris | FIX: Paris' + (plan ? '\nCHECKLIST: 1 not met, 2 met, 3 met' : '') : 'ALL CORRECT' + (plan ? '\nCHECKLIST: 1 met, 2 met, 3 met' : ''); }
    if (/^Several models answered the question below/.test(p)) return 'Paris is the capital of France.\n\nHOW IT WAS SETTLED\nAgreed: Paris is the capital\nDiffered: which city | kept: Paris | because: it is the seat of government\nLeft out: Lyon | because: it is not the capital';
    if (/^You answered the question below, and other models answered it too/.test(p)) return /Your answer:\nLyon/.test(p) ? 'Changed: I said Lyon; the others are right that it is Paris.\nParis' : 'Changed: nothing, because my answer was right.\nParis';
    if (/^Your answer to the question below was checked/.test(p)) return 'Paris is the capital of France, and the seat of its government.\n\nHOW IT WAS SETTLED\nAccepted: Lyon is not the capital | because: Paris is';
    if (/^Divide the task below/.test(p)) return 'PART 1 | WRITER 1 | the history of the city\nPART 2 | WRITER 2 | the geography of the city';
    if (/^You are writing one part of a larger answer/.test(p)) return 'A part written by ' + model + ' (' + (/part 1 of/.test(p) ? 'history' : 'geography') + ').';
    if (/^Join the parts below/.test(p)) return 'The joined answer: history, then geography.\n\nHOW IT WAS SETTLED\nJoined: the two parts, in order';
    if (/^You are the judge of several answers/.test(p)) return 'Answer 1: accuracy 5/5, completeness 4/5, clarity 5/5. Reason: right and plain.\nAnswer 2: accuracy 5/5, completeness 4/5, clarity 4/5. Reason: right.\nAnswer 3: accuracy 1/5, completeness 3/5, clarity 4/5. Reason: the wrong city.\nTHE ANSWER:\nParis is the capital of France.';
    if (/^Below is a question and a draft answer/.test(p)) return 'Changed: added the country.\nParis, in France';
    return ANSWER[model] || 'Paris';
  };
  const last = (msgs) => { for (let i = msgs.length - 1; i >= 0; i--) if (msgs[i].role === 'user') { const c = msgs[i].content; return typeof c === 'string' ? c : (c || []).map(x => x.text || '').join('\n'); } return ''; };
  const sysOf = (body) => body.system || ((body.messages || []).filter(m => m.role === 'system').map(m => m.content).join('\n'));
  const chunks = (text) => text.split(/(?<= )/);
  const of = window.fetch.bind(window);
  window.fetch = function (url, init) {
    url = String(url); const isA = /api\.anthropic\.com\/v1\/messages/.test(url), isO = /openrouter\.ai\/api\/v1\/chat\/completions|api\.openai\.com\/v1\/chat\/completions/.test(url), isL = /127\.0\.0\.1:11434\/api\/chat/.test(url);
    if (!isA && !isO && !isL) return of(url, init);
    let body = {}; try { body = JSON.parse(init.body); } catch (e) {}
    const h = init.headers || {}; const model = body.model; const prompt = last(body.messages || []);
    window.__req.push({ url, model, key: h['x-api-key'] || h['Authorization'] || '', body: { max_tokens: body.max_tokens, max_completion_tokens: body.max_completion_tokens, num_predict: body.options && body.options.num_predict, thinking: body.thinking, output_config: body.output_config, reasoning: body.reasoning, reasoning_effort: body.reasoning_effort, think: body.think }, system: sysOf(body).slice(0, 4000), prompt: prompt.slice(0, 3000) });
    const text = window.__reply(model, prompt), enc = new TextEncoder(), sig = init.signal;
    const parts = [];
    if (isA) { const e = (t, d) => { d.type = t; parts.push('event: ' + t + '\ndata: ' + JSON.stringify(d) + '\n\n'); };
      e('message_start', { message: { id: 'm', model, role: 'assistant', content: [], usage: { input_tokens: 9, output_tokens: 0 } } });
      if (body.thinking) { e('content_block_start', { index: 0, content_block: { type: 'thinking', thinking: '' } }); e('content_block_delta', { index: 0, delta: { type: 'thinking_delta', thinking: 'Weighing it.' } }); e('content_block_stop', { index: 0 }); }
      e('content_block_start', { index: 1, content_block: { type: 'text', text: '' } }); chunks(text).forEach(w => e('content_block_delta', { index: 1, delta: { type: 'text_delta', text: w } }));
      e('content_block_stop', { index: 1 }); e('message_delta', { delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 5 } }); e('message_stop', {}); }
    else if (isO) { chunks(text).forEach(w => parts.push('data: ' + JSON.stringify({ choices: [{ delta: { content: w } }] }) + '\n\n')); parts.push('data: ' + JSON.stringify({ choices: [{ delta: {}, finish_reason: 'stop' }], usage: { prompt_tokens: 9, completion_tokens: 5 } }) + '\n\n'); parts.push('data: [DONE]\n\n'); }
    else { chunks(text).forEach(w => parts.push(JSON.stringify({ message: { role: 'assistant', content: w }, done: false }) + '\n')); parts.push(JSON.stringify({ done: true, prompt_eval_count: 9, eval_count: 5 }) + '\n'); }
    const stream = new ReadableStream({ start(c) { let i = 0; const tick = () => { if (sig && sig.aborted) { try { c.error(new DOMException('Aborted', 'AbortError')); } catch (e) {} return; } if (i >= parts.length) { c.close(); return; } c.enqueue(enc.encode(parts[i++])); setTimeout(tick, window.__slow || 3); }; tick(); } });
    return Promise.resolve(new Response(stream, { status: 200, headers: { 'Content-Type': isL ? 'application/x-ndjson' : 'text/event-stream' } }));
  };
};
/* the engine on this device, a stand-in */
const ENGINE = () => {
  window.__origCan = blCanRun; window.blCanRun = function (m) { return /^loc-/.test(m && m.id) || window.__origCan(m); };
  Engine.modelId = 'loc-b'; Engine.status = 'ready';
  Engine.load = function (m) { window.__loads.push(m.id); Engine.modelId = m.id; Engine.status = 'ready'; return new Promise(r => setTimeout(r, 5)); };
  Engine.unload = function () { Engine.modelId = null; Engine.status = 'disconnected'; return Promise.resolve(); };
  Engine.abort = function () { window.__aborted = (window.__aborted || 0) + 1; };
  Engine.generate = function (job) { const msgs = job.messages || []; let u = ''; for (let i = msgs.length - 1; i >= 0; i--) if (msgs[i].role === 'user') { u = String(msgs[i].content); break; }
    window.__gen.push({ model: Engine.modelId, params: job.params, system: (msgs.find(m => m.role === 'system') || {}).content || '', prompt: u.slice(0, 2000) });
    const t = window.__reply(Engine.modelId, u); return new Promise(res => { let i = 0; const w = t.split(/(?<= )/); const tick = () => { if (i >= w.length) { res({}); return; } job.onToken(w[i++]); setTimeout(tick, window.__slow || 2); }; tick(); }); };
};
const SETUP = () => {
  state.cxKept = [{ id: 'anthropic|https://api.anthropic.com', provider: 'anthropic', base: 'https://api.anthropic.com', key: 'sk-ant-invented', model: 'claude-opus-5-5', models: ['claude-opus-5-5', 'claude-haiku-4-5'] },
    { id: 'openrouter|https://openrouter.ai/api/v1', provider: 'openrouter', base: 'https://openrouter.ai/api/v1', key: 'sk-or-invented', model: 'stand-in-b', models: ['stand-in-b', 'stand-in-c'] },
    { id: 'ollama-local|http://127.0.0.1:11434', provider: 'ollama-local', base: 'http://127.0.0.1:11434', key: '', model: 'qwen3:8b', models: ['qwen3:8b'] }];
  state.cloud = { provider: 'openai', base: 'https://api.openai.com/v1', key: 'sk-chat-invented', model: 'gpt-5', on: true, models: ['gpt-5'] }; state.chatSource = 'cloud';
  state.models = (state.models || []).filter(m => !/^loc-/.test(m.id));
  state.models.push({ id: 'loc-a', name: 'Local A', type: 'GGUF', paramB: 8, color: '#a65', ctx: 8192 }, { id: 'loc-b', name: 'Local B', type: 'GGUF', paramB: 4, color: '#5a6', ctx: 8192 });
  state.persona = Object.assign({}, state.persona || {}, { on: true, name: 'Testa Persona', about: 'An invented person for this test.', cloud: false });
  const b = blState(); b.ids = []; b.cx = []; b.weights = {}; b.eff = 'auto'; b.writer = 'auto'; b.strategy = 'synth'; b.runs = [];
  saveState();
};
const choose = async (p, o) => { await p.evaluate((o) => { const b = blState(); b.ids = o.ids || []; b.cx = o.cx || []; b.eff = o.eff; b.strategy = o.strategy; b.writer = o.writer || 'auto'; b.weights = o.weights || {}; delete b.seed; saveState(); renderBlend(); const t = document.getElementById('blendTask'); t.value = o.task; t.dispatchEvent(new Event('input', { bubbles: true })); }, o);
  await p.waitForTimeout(320); };
const CL = 'anthropic|https://api.anthropic.com', OR = 'openrouter|https://openrouter.ai/api/v1', OL = 'ollama-local|http://127.0.0.1:11434';
const run = async (p, label) => {
  await p.evaluate(() => { window.__req = []; window.__checks = 0; window.__loads = []; window.__gen = []; document.getElementById('blendRun').click(); });
  await p.waitForFunction(() => { const r = blState().runs[0]; return r && r.v === 2 && r.status !== 'running' && !BL.run; }, null, { timeout: 60000 }).catch(() => {});
  return p.evaluate(() => { const r = blState().runs[0]; return { status: r.status, strategy: r.strategy, chose: r.chose, eff: r.eff, writer: r.writer, writerName: r.writerName, final: r.final, passed: !!r.passed, plan: r.plan, agree: r.agree, agree2: r.agree2, account: r.account, notes: r.notes, error: r.error,
    steps: r.steps.map(s => ({ k: s.k, name: s.name, kind: s.kind, state: s.state, changed: s.changed || '', check: s.check ? { ok: s.check.ok, n: s.check.items.length } : null, part: s.part || 0 })),
    req: window.__req, loads: window.__loads, gen: window.__gen.map(g => ({ model: g.model, max: g.params && g.params.max_tokens, think: g.params && g.params.thinking, budget: g.params && g.params.thinking_budget, sys: g.system.slice(0, 3000), prompt: g.prompt.slice(0, 300) })),
    out: document.getElementById('blendOut').innerText.slice(0, 5000), cloud: { model: state.cloud.model, key: state.cloud.key, provider: state.cloud.provider }, source: state.chatSource }; });
};
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 980 } }); await ctx.addInitScript(STAND); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(900);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.evaluate(ENGINE); await p.evaluate(SETUP);
  await p.evaluate(() => { go('blend'); try { IngRooms.open('blend', 'new'); } catch (e) {} renderBlend(); }); await p.waitForTimeout(500);

  /* 1. the page: connected models, the effort key with its explanations, the ways in groups, the writer */
  let u = await p.evaluate(() => ({ cx: [...document.querySelectorAll('#blendPick .blx-cx')].map(x => x.innerText.replace(/\s+/g, ' ')), head: !!document.querySelector('#blendPick .blx-cxh'),
    key: (document.getElementById('blxEffKey') || {}).textContent || '', line: (document.getElementById('blxEffLine') || {}).textContent || '', think: getComputedStyle(document.querySelector('#page-blend .bl-think')).display,
    strats: [...document.querySelectorAll('#blendStrats .blend-strat b')].map(x => x.textContent), groups: [...document.querySelectorAll('#blendStrats .blx-grp')].map(x => x.textContent),
    writer: [...document.querySelectorAll('#blWriter option')].map(x => x.textContent), steps: [...document.querySelectorAll('#page-blend .bl-setup > [data-rm-step]')].filter(e => /blx/.test(e.id || '')).map(e => e.id + ':' + e.getAttribute('data-rm-step')) }));
  const rowOf = (re) => u.cx.find(t => re.test(t)) || '';
  ok(u.head && u.cx.length === 4 && /Claude \(Anthropic\)/.test(rowOf(/Claude Opus 5\.5/)) && /Claude Haiku 4\.5/.test(rowOf(/Claude Opus 5\.5/)) && /OpenRouter/.test(rowOf(/stand-in-b/)) && /Ollama on this computer/.test(rowOf(/qwen3:8b/)) && /OpenAI/.test(rowOf(/gpt-5/)) && /×5/.test(rowOf(/stand-in-b/)),
    'step 1 lists every connection she keeps (Claude, OpenRouter, Ollama, and the chat\'s own OpenAI), each with its service, a choice of its models and a weight', u.cx);
  ok(/^Auto/.test(u.key) && /^Ingenium chooses Low to Extra for each question, and says why\.$/.test(u.line) && u.think === 'none', 'the effort key starts at Auto and says in one line what Auto does; the old "think first" box gives way to it', { key: u.key, line: u.line, think: u.think });
  const sw = await p.evaluate(() => { const L = [...document.querySelectorAll('#blendStrats .blend-strat')]; const on = L.find(x => x.classList.contains('on')); const full = (STRATS.find(x => x.id === blState().strategy) || {}).desc || ''; const rest = L.filter(x => !x.classList.contains('on')).map(x => x.querySelector('.small').textContent); return on && full && on.querySelector('.small').textContent === full && rest.length === 8 && rest.every(t => t.length > 10 && t.length < 80) ? true : { on: on && on.textContent, full, rest }; });
  ok(u.strats.length === 9 && sw === true, 'each way in one short line; the chosen way with its whole description', sw);
  ok(u.strats.join('|') === 'Ingenium chooses|Pass and refine|Best of the batch|Compare and combine|Weigh and agree|Judge and decide|Debate and settle|Check every claim|Divide the work' && u.groups.join('|') === 'Quick|Careful|Deep',
    'nine ways, in groups: Ingenium chooses; Quick; Careful; Deep (the three new ones)', u);
  ok(/^Ingenium chooses/.test(u.writer[0]), 'who writes the final answer: Ingenium chooses, or any chosen model', u.writer);
  ok(u.steps.indexOf('blxEffRow:2') >= 0 && u.steps.indexOf('blxWriterRow:2') >= 0, 'effort and the writer sit in step 2, with the ways', u.steps);
  await p.evaluate(() => { try { IngRooms.step(2); } catch (e) {} }); await p.waitForTimeout(250);
  await p.click('#blxEffKey'); await p.waitForTimeout(200);
  let m = await p.evaluate(() => ({ opts: [...document.querySelectorAll('#blxEffMenu .eff-opt')].map(x => x.innerText.split('\n')[0]), open: !document.getElementById('blxEffMenu').hidden }));
  await p.hover('#blxEffMenu > button.eff-opt:last-of-type'); await p.waitForTimeout(150);
  let pop = await p.evaluate(() => { const e = document.getElementById('blxEffPop'); return e && !e.hidden ? e.innerText : ''; });
  ok(m.open && m.opts.join('|') === 'Auto|Low|Medium|High|Extra|Max|Ultra' && /plan first/.test(pop) && /until the check passes/.test(pop), 'the effort menu: Auto, Low to Max and Ultra; hovering Ultra explains it', { m, pop });
  await p.evaluate(() => { const o = [...document.querySelectorAll('#blxEffMenu .eff-opt')].find(x => /^High/.test(x.innerText)); o.click(); });
  ok(await p.evaluate(() => blState().eff === 3 && /^High/.test(document.getElementById('blxEffKey').textContent)), 'choosing High keeps it');
  await p.screenshot({ path: OUT + '/blend_setup.png', fullPage: false });

  /* 2. Compare and combine: two connected models and one on this device, at High effort */
  await choose(p, { ids: ['loc-a'], cx: [{ conn: CL, model: 'claude-opus-5-5' }, { conn: OR, model: 'stand-in-b' }], eff: 3, strategy: 'synth', task: 'What is the capital of France?' });
  let est = await p.evaluate(() => document.getElementById('blxEst').textContent);
  ok(/4 steps to write: the 1 model on this device one after another, the 2 connected at the same time/.test(est), 'before the run it says what it will take', est);
  let r = await run(p);
  const reqA = r.req.find(x => /anthropic/.test(x.url)), reqO = r.req.find(x => /openrouter/.test(x.url));
  ok(r.status === 'done' && r.final && r.final.text === 'Paris is the capital of France.' && r.writerName === 'Claude Opus 5.5' && r.steps.filter(s => s.k === 'answer').length === 3 && r.steps.some(s => s.k === 'combine' && s.name === 'Claude Opus 5.5'),
    'three answers, then Claude (connected, the first by Ingenium\'s rule) writes the blended answer', { st: r.steps, f: r.final, w: r.writerName });
  ok(r.agree && r.agree.n === 2 && r.agree.of === 3 && /Ingenium's own count: 2 of 3 answers agree \(“Paris”\)/.test(r.out), 'Ingenium counts itself: 2 of 3 short answers agree', { agree: r.agree });
  ok(r.account && r.account.length === 3 && /How it was settled/.test(r.out) && /Differed: which city/.test(r.out) && /not checked these against sources/.test(r.out), 'how it was settled, in the writer\'s words, marked as not checked', r.account);
  ok(reqA && reqA.key === 'sk-ant-invented' && reqA.body.output_config && reqA.body.output_config.effort === 'high' && reqA.body.thinking && reqA.body.thinking.type === 'adaptive' && reqA.body.max_tokens >= 16000,
    'Claude is asked through its own connection and key, at effort "high", with adaptive thinking', reqA && { key: reqA.key, body: reqA.body });
  ok(reqO && reqO.key === 'Bearer sk-or-invented' && reqO.body.max_tokens === 8192 && reqO.body.reasoning && reqO.body.reasoning.effort === 'high', 'OpenRouter through its own key: High\'s room (8,192 tokens) and reasoning effort "high"', reqO && { key: reqO.key, body: reqO.body });
  ok(r.cloud.model === 'gpt-5' && r.cloud.key === 'sk-chat-invented' && r.source === 'cloud' && !r.req.some(x => /sk-chat-invented/.test(x.key)), 'the chat\'s own model and key are untouched, and never used by the blend', r.cloud);
  ok(!reqA.system.includes('Testa Persona') && r.gen.length && r.gen[0].sys.includes('Testa Persona'), 'her own details reach the model on this device, not the connected ones (she has not allowed it)', { cloudSys: reqA.system.slice(0, 200), loc: r.gen[0] && r.gen[0].sys.slice(0, 100) });
  ok(r.gen.every(g => g.max === 2048 && g.think === true && g.budget > 0), 'the model on this device: thinking on, with a budget, and a quarter of its 8,192 memory to answer in', r.gen);
  await p.screenshot({ path: OUT + '/blend_combined.png', fullPage: false });

  /* 3. Extra effort: the final answer is checked by another model and corrected */
  await choose(p, { ids: ['loc-a'], cx: [{ conn: CL, model: 'claude-opus-5-5' }, { conn: OR, model: 'stand-in-b' }], eff: 4, strategy: 'synth', task: 'What is the capital of France?' });
  r = await run(p);
  const vs = r.steps.filter(s => s.k === 'verify'), fx = r.steps.filter(s => s.k === 'fix');
  ok(vs.length === 1 && vs[0].name === 'stand-in-b' && vs[0].check && !vs[0].check.ok && fx.length === 1 && fx[0].name === 'Claude Opus 5.5' && /seat of its government/.test(r.final.text) && /not checked again at this effort/.test(r.out),
    'Extra: another model checks the final answer, finds a problem, the writer corrects it once, and the page says it was not checked again', { vs, fx, f: r.final, out: r.out.slice(-600) });

  /* 4. Ultra: a plan first, ticked off, and checks until one passes */
  await choose(p, { ids: [], cx: [{ conn: CL, model: 'claude-opus-5-5' }, { conn: OR, model: 'stand-in-b' }], eff: 'ultra', strategy: 'synth', task: 'What is the capital of France?' });
  r = await run(p);
  const firstAns = r.req.filter(x => /A complete answer must meet this checklist/.test(x.prompt));
  ok(r.plan && r.plan.length === 3 && r.steps[0].k === 'plan' && firstAns.length === 2, 'Ultra writes the plan first, and every answer is written against it', { plan: r.plan, n: firstAns.length });
  ok(r.passed && r.steps.filter(s => s.k === 'verify').length === 2 && r.steps.filter(s => s.k === 'fix').length === 1 && r.plan.every(x => x.met === true) && /✓ Checked by stand-in-b after 1 correction: no problem found/.test(r.out),
    'Ultra checks, corrects, checks again until it passes, and ticks every line of the plan', { steps: r.steps.map(s => s.k + ':' + s.name), plan: r.plan, out: r.out.slice(-500) });
  const ra = r.req.find(x => /anthropic/.test(x.url));
  ok(ra && ra.body.output_config.effort === 'max', 'Ultra asks at Max effort ("max" for Claude)', ra && ra.body);
  await p.screenshot({ path: OUT + '/blend_ultra.png', fullPage: false });

  /* 5. Debate and settle: each reads the others and revises */
  await choose(p, { ids: ['loc-a'], cx: [{ conn: CL, model: 'claude-opus-5-5' }, { conn: OR, model: 'stand-in-b' }], eff: 2, strategy: 'debate', task: 'Which city is the capital of France?' });
  r = await run(p);
  const rev = r.steps.filter(s => s.k === 'revise');
  ok(rev.length === 3 && rev.some(s => /I said Lyon/.test(s.changed)) && r.agree && r.agree.n === 2 && r.agree2 && r.agree2.n === 3 && /before they read each other, 2 of 3 did/.test(r.out) && r.final,
    'Debate: three answers (2 of 3 agree), each revises after reading the others (now 3 of 3), then one settled answer', { rev, agree: r.agree, agree2: r.agree2 });
  ok(r.req.some(x => /^Several models answered the question below, then read each other's answers/.test(x.prompt)), 'the writer is told the answers are the revised ones');

  /* 6. Check every claim */
  await choose(p, { ids: ['loc-a'], cx: [{ conn: CL, model: 'claude-opus-5-5' }, { conn: OR, model: 'stand-in-b' }], eff: 3, strategy: 'verify', task: 'What is the capital of France?' });
  r = await run(p);
  const ck = r.steps.filter(s => s.k === 'check');
  ok(r.steps[0].k === 'answer' && r.steps[0].name === 'Claude Opus 5.5' && ck.length === 2 && ck.filter(s => s.check && !s.check.ok).length === 1 && r.steps.some(s => s.k === 'fix') && r.account.some(x => x.k === 'accepted'),
    'Check every claim: the writer answers, the two others check it, one finding, the writer accepts it and corrects', { steps: r.steps, acc: r.account });

  /* 7. Divide the work */
  await choose(p, { ids: ['loc-a'], cx: [{ conn: CL, model: 'claude-opus-5-5' }, { conn: OR, model: 'stand-in-b' }], eff: 3, strategy: 'split', task: 'Write about Paris: its history and its geography.' });
  r = await run(p);
  const parts = r.steps.filter(s => s.k === 'part');
  const pn = parts.slice().sort((a, b) => a.part - b.part).map(s => s.part + ':' + s.name).join(',');
  ok(r.steps[0].k === 'divide' && parts.length === 2 && pn === '1:Local A,2:Claude Opus 5.5' && r.steps.some(s => s.k === 'assemble') && /joined answer/.test(r.final.text) && r.out.indexOf('Writes part 1 of 2') < r.out.indexOf('Writes part 2 of 2'),
    'Divide the work: the writer divides it in two, each part goes to the model named, the writer joins them', r.steps);

  /* 8. Judge and decide */
  await choose(p, { ids: ['loc-a'], cx: [{ conn: CL, model: 'claude-opus-5-5' }, { conn: OR, model: 'stand-in-b' }], eff: 1, strategy: 'judge', task: 'What is the capital of France?' });
  r = await run(p);
  ok(r.final && r.final.judged && /Accuracy 5\/5/.test(r.out) && /the judge's choice/.test(r.out) && r.req.every(x => !x.body.thinking) && r.gen.every(g => g.think === false),
    'Judge: scores on every answer, the best marked; at Low nothing thinks', { out: r.out.slice(0, 600) });

  /* 9. Ingenium chooses the way, and Auto the effort */
  await choose(p, { ids: [], cx: [{ conn: CL, model: 'claude-opus-5-5' }, { conn: OR, model: 'stand-in-b' }], eff: 'auto', strategy: 'auto', task: 'Should I learn Python or JavaScript first, for building small web apps?' });
  est = await p.evaluate(() => document.getElementById('blxEst').textContent);
  r = await run(p);
  ok(r.strategy === 'debate' && /weighs options/.test(r.chose) && r.eff.auto && /Ingenium chose it: a question that weighs options/.test(r.out) && /Ingenium would choose Debate and settle/.test(est),
    'Ingenium chooses Debate and settle for a question that weighs options, says so before and after; Auto chooses the effort', { s: r.strategy, chose: r.chose, eff: r.eff, est });
  await choose(p, { ids: [], cx: [{ conn: CL, model: 'claude-opus-5-5' }, { conn: OR, model: 'stand-in-b' }], eff: 'auto', strategy: 'auto', task: 'Fix the bug in this function: function add(a,b){return a-b}' });
  r = await run(p);
  ok(r.strategy === 'verify' && /about code/.test(r.chose), 'and Check every claim for code', { s: r.strategy, chose: r.chose });

  /* 10. on this device: the loaded model first, the writer last, so it loads once */
  await choose(p, { ids: ['loc-a', 'loc-b'], cx: [], eff: 3, strategy: 'synth', task: 'What is the capital of France?' });
  await p.evaluate(() => { Engine.modelId = 'loc-b'; Engine.status = 'ready'; });
  r = await run(p);
  ok(r.writerName === 'Local A' && r.loads.join(',') === 'loc-a' && r.gen.map(g => g.model).join(',') === 'loc-b,loc-a,loc-a', 'two models on this device: the loaded one answers first, the writer (the larger) last, then combines without loading again', { loads: r.loads, gen: r.gen.map(g => g.model) });

  /* 11. a house keeps connected models, effort and writer, and answers in the chat whatever the chat's source */
  await choose(p, { ids: [], cx: [{ conn: CL, model: 'claude-haiku-4-5' }, { conn: OL, model: 'qwen3:8b' }], eff: 4, strategy: 'synth', task: 'x', writer: 'cx:' + OL + '|qwen3:8b' });
  await p.evaluate(() => document.getElementById('blendSave').click()); await p.waitForTimeout(200);
  await p.fill('#bhName', 'Two minds'); await p.evaluate(() => document.getElementById('bhOk').click()); await p.waitForTimeout(200);
  const h = await p.evaluate(() => { const h = bhList().find(x => x.name === 'Two minds'); return h && { cx: h.cx, eff: h.eff, writer: h.writer, row: [...document.querySelectorAll('#bhList .bh-row')].map(x => x.innerText.replace(/\s+/g, ' ')).find(t => /Two minds/.test(t)) }; });
  ok(h && h.cx.length === 2 && h.eff === 4 && /qwen3:8b/.test(h.writer) && /Extra effort/.test(h.row) && /Claude Haiku 4\.5/.test(h.row), 'the house keeps its connected models, Extra effort and its writer, and says so', h);
  await p.evaluate(() => { const hh = bhList().find(x => x.name === 'Two minds'); const c = { id: 'cT' + Date.now(), title: 'House test', messages: [] }; state.chats.push(c); IngBlend.openConv(c); bhUse(hh); window.__req = []; window.__checks = 0; });
  await p.fill('#chatInput', 'What is the capital of France?'); await p.evaluate(() => sendChat());
  await p.waitForFunction(() => { const ms = curMsgs(); const l = ms[ms.length - 1]; return l && l.role === 'bot' && !l.live && l.text; }, null, { timeout: 60000 }).catch(() => {});
  const hc = await p.evaluate(() => { const ms = curMsgs(), l = ms[ms.length - 1]; return { title: curChat().title, text: l.text, note: l.note, n: ms.length, req: window.__req.map(x => x.model + '@' + x.url.replace(/^https?:\/\/([^/]+).*/, '$1')), cloud: state.cloud.model }; });
  ok(hc.title === 'House test' && /seat of its government/.test(hc.text) && /Blended by Two minds/.test(hc.note) && hc.req.some(x => /claude-haiku-4-5@api.anthropic.com/.test(x)) && hc.req.some(x => /qwen3:8b@127.0.0.1:11434/.test(x)) && !hc.req.some(x => /gpt-5/.test(x)) && hc.cloud === 'gpt-5',
    'in a chat on a connected model, the house answers (its own models; checked and corrected at Extra), not the chat\'s gpt-5', hc);
  ok(!/HOW IT WAS SETTLED/.test(hc.text), 'the chat shows the answer, not the writer\'s account', hc.text);

  /* 12. Check with Blend, under a reply in the chat, and back to the conversation */
  await p.evaluate(() => { const c = { id: 'cK' + Date.now(), title: 'Check test', messages: [{ role: 'me', text: 'What is the capital of France?', at: Date.now() }, { role: 'bot', text: 'Lyon is the capital of France.', at: Date.now(), done: Date.now() }] }; state.chats.push(c); IngBlend.openConv(c); });
  await p.waitForTimeout(300);
  const key = await p.evaluate(() => { const k = [...document.querySelectorAll('#page-chat .msg-act.blx-chk')]; return k.length ? k.length : { acts: document.querySelectorAll('#page-chat .msg-acts').length, msgs: [...document.querySelectorAll('#page-chat .msg')].map(x => x.className + '|' + x.innerText.slice(0, 120)), fill: String(window.fillMsg).slice(0, 200), active: (typeof activePage === 'function' ? activePage() : ''), cur: curChat().title }; });
  ok(key >= 1, 'under a reply: Check with Blend', key);
  await choose(p, { ids: [], cx: [{ conn: CL, model: 'claude-opus-5-5' }, { conn: OR, model: 'stand-in-b' }], eff: 3, strategy: 'synth', task: '' });
  await p.evaluate(() => { go('chat'); renderChat(); }); await p.waitForTimeout(200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#page-chat .msg-act.blx-chk')].pop(); k.click(); }); await p.waitForTimeout(400);
  const seed = await p.evaluate(() => ({ page: document.querySelector('#page-blend.active,#page-blend[aria-hidden="false"]') ? 1 : (typeof activePage === 'function' ? activePage() : ''), task: document.getElementById('blendTask').value, seed: (document.getElementById('blxSeed') || {}).innerText || '', est: document.getElementById('blxEst').textContent }));
  ok(/capital of France/.test(seed.task) && /A reply from the chat will be checked/.test(seed.seed) && /Lyon is the capital/.test(seed.seed) && /the way is Check every claim/.test(seed.est), 'Blend opens with the question, the reply to check, and says how it will check it', seed);
  r = await run(p);
  ok(r.strategy === 'verify' && r.steps.filter(s => s.k === 'check').length === 2 && r.steps.some(s => s.k === 'fix') && /seat of its government/.test(r.final.text) && /The reply being checked/i.test(r.out), 'every chosen model checks the chat\'s reply; the writer corrects it', r.steps);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#blendOut .bl-final button')].find(x => x.textContent === 'Send back to the conversation'); k.click(); }); await p.waitForTimeout(300);
  const back = await p.evaluate(() => { const c = curChat(), l = c.messages[c.messages.length - 1]; return { title: c.title, n: c.messages.length, text: l.text, note: l.note }; });
  ok(back.title === 'Check test' && back.n === 3 && /seat of its government/.test(back.text) && /Checked with Blend/.test(back.note), 'the corrected answer goes back to that conversation, marked as checked with Blend', back);

  /* 13. where else the answer goes: the chat (the new conversation, not the Chat page's last one), Notes, Tabula, a folder */
  await p.evaluate(() => { go('blend'); blShow(blState().runs[0]); [...document.querySelectorAll('#blendOut .bl-final button')].find(x => x.textContent === 'Open in the chat').click(); }); await p.waitForTimeout(300);
  const oc = await p.evaluate(() => { const c = curChat(); return { title: c.title, n: c.messages.length, shown: [...document.querySelectorAll('#page-chat .msg')].map(x => x.innerText.slice(0, 60)) }; });
  ok(/^Blend: What is the capital of France/.test(oc.title) && oc.n === 2 && oc.shown.length === 2, 'Open in the chat opens the new conversation, with the question and the answer', oc);
  await p.evaluate(() => { go('blend'); blShow(blState().runs[0]); });
  const notes0 = await p.evaluate(() => (state.notes || []).length);
  await p.evaluate(() => { [...document.querySelectorAll('#blendOut .bl-final button')].find(x => x.textContent === 'Notes').click(); }); await p.waitForTimeout(200);
  const nt = await p.evaluate(() => ({ n: (state.notes || []).length, t: ((state.notes || [])[0] || {}).text || '' }));
  ok(nt.n === notes0 + 1 && /seat of its government/.test(nt.t) && /capital of France/.test(nt.t), 'Notes: the question and the answer as a note', nt);
  await p.evaluate(() => { go('blend'); blShow(blState().runs[0]); [...document.querySelectorAll('#blendOut .bl-final button')].find(x => x.textContent === 'Tabula').click(); }); await p.waitForTimeout(500);
  const tb = await p.evaluate(() => ({ body: (state.tabulaDoc || {}).body || '', page: typeof activePage === 'function' ? activePage() : '' }));
  ok(/seat of its government/.test(tb.body) && /<h2>/.test(tb.body), 'Tabula: the answer under its question, in her page', { page: tb.page, body: tb.body.slice(-300) });
  const hasF = await p.evaluate(() => { try { if (!IngFolders.folders().length && IngFolders.make) IngFolders.make('Invented app'); } catch (e) {} try { return IngFolders.folders().length; } catch (e) { return 0; } });
  if (hasF) { await p.evaluate(() => { go('blend'); blShow(blState().runs[0]); [...document.querySelectorAll('#blendOut .bl-final button')].find(x => x.textContent === 'Into a folder').click(); }); await p.waitForTimeout(300);
    await p.evaluate(() => document.getElementById('blxFOk').click()); await p.waitForTimeout(200);
    const fd = await p.evaluate(() => { const f = IngFolders.folders()[0]; const c = state.chats.filter(x => x.projectId === f.id).pop(); return c ? { title: c.title, n: c.messages.length, text: c.messages[1].text } : null; });
    ok(fd && fd.n === 2 && /^Blend: /.test(fd.title) && /seat of its government/.test(fd.text), 'Into a folder: a conversation in the folder, with the question and the answer', fd); }
  else ok(false, 'a folder could be made for the test');

  /* 14. Stop ends every request at once */
  await choose(p, { ids: ['loc-a'], cx: [{ conn: CL, model: 'claude-opus-5-5' }, { conn: OR, model: 'stand-in-b' }], eff: 3, strategy: 'synth', task: 'What is the capital of France?' });
  await p.evaluate(() => { window.__slow = 400; window.__aborted = 0; document.getElementById('blendRun').click(); }); await p.waitForTimeout(700);
  await p.evaluate(() => document.getElementById('blendStop').click());
  await p.waitForFunction(() => !BL.run, null, { timeout: 20000 }).catch(() => {});
  const sp = await p.evaluate(() => { window.__slow = 0; const r = blState().runs[0]; return { status: r.status, states: r.steps.map(s => s.state), note: document.getElementById('blendNote').textContent, aborted: window.__aborted }; });
  ok(sp.status === 'stopped' && sp.states.every(s => s === 'stopped' || s === 'done' || s === 'failed') && /Stopped/.test(sp.note), 'Stop ends the blend: connected requests are aborted, the engine is told to stop', sp);

  /* 15. a phone: nothing wider than the screen */
  await p.setViewportSize({ width: 390, height: 844 }); await p.evaluate(() => { go('blend'); try { IngRooms.open('blend', 'new'); IngRooms.step(2); } catch (e) {} renderBlend(); }); await p.waitForTimeout(400);
  const ph = await p.evaluate(() => { const W = document.documentElement.clientWidth; const bad = [...document.querySelectorAll('#page-blend .bl-setup *')].filter(e => { if (e.closest('.r172-native') || getComputedStyle(e).opacity === '0') return false; const r = e.getBoundingClientRect(); return r.width && (r.right > W + 1); }).map(e => (e.id || e.className || e.tagName) + ':' + Math.round(e.getBoundingClientRect().right)); const face = (() => { const sel = document.getElementById('blWriter'); const f = sel && (sel.previousElementSibling || sel.nextElementSibling); const n = [...document.querySelectorAll('#blxWriterRow *')].filter(x => x !== sel && !x.closest('.r172-native') && x.getBoundingClientRect().width > 40).map(x => (x.className || x.tagName) + ':' + Math.round(x.getBoundingClientRect().left) + '-' + Math.round(x.getBoundingClientRect().right)); return n; })();
    return { W, bad: bad.slice(0, 8), sw: document.documentElement.scrollWidth, face }; });
  ok(!ph.bad.length && ph.sw <= ph.W + 1 && ph.face.length >= 1, 'on a phone, step 2 (the ways, the effort, the writer) fits the screen', ph);
  await p.screenshot({ path: OUT + '/blend_phone.png', fullPage: false });

  /* 16. the Guide: Blend, its ways, effort and Ultra */
  await p.setViewportSize({ width: 1440, height: 980 }); await p.evaluate(() => go('guide')); await p.waitForTimeout(400);
  const gd = await p.evaluate(() => { const g = document.getElementById('blxGuide'); return g ? { t: g.querySelector('h3').textContent, dts: [...g.querySelectorAll('dt')].map(x => x.textContent) } : null; });
  ok(gd && /Blend: several models, one answer/.test(gd.t) && ['Ingenium chooses', 'Debate and settle', 'Check every claim', 'Divide the work', 'Effort', 'Auto', 'Ultra', 'Who writes', 'How it was settled', 'Check with Blend', 'Where it goes'].every(x => gd.dts.indexOf(x) >= 0), 'the Guide explains Blend: every way, effort, Auto, Ultra, the writer, the account, Check with Blend', gd);
  ok(!errs.length, 'no errors on the page', errs);
  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})();
