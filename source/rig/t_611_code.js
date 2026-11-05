// The Code session as in Claude (Ingenium 6.11, modules/r215.js with modules/r190.js and build_page.py's 6.11 edits). Her words
// (3 November 2026): "I want Ingenium's Coding chat to have full parity with Claude's Coding chat ... I want to see the plan laid out
// with the completed Tasks checked off the scrollable list", "I want to be able to select low to Max effort and Ultracode inside of the
// chats ... briefly explained accurately in a preview popup when I hover over it", "I want Ultracode to be at the highest effort, Code
// plans first, writes the app, runs its checks, reads the errors and fixes them, repeating until the checks pass, showing each step",
// and "I want the 'Auto' function to be added and for the effort level and Token level to be better regulated".
// Nothing leaves this machine: every connection is a stand-in (window.netFetch answers as Anthropic's and OpenAI's services stream);
// the app is invented (a tally with one button); the model in the working loop is a script.
//   node rig/t_611_code.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const APP = [{ name: 'index.html', text: '<!doctype html>\n<html><head><meta charset="utf-8"><title>Tally</title></head>\n<body>\n<h1>Tally</h1>\n<button id="add">Add one</button> <span id="n">0</span>\n<script src="app.js"></script>\n</body></html>\n' },
  { name: 'app.js', text: 'let n = 0;\ndocument.getElementById("add").onclick = () => { n++; document.getElementById("n").textContent = n; };\n' }];
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1512, height: 945 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); state.motion = 'minimal'; });
  await p.waitForTimeout(400);
  // a stand-in for every connection: requests are kept; Anthropic's and OpenAI's streams are answered with one sentence
  await p.evaluate(() => {
    window.__net = []; window.__netRefuse = 0;
    const sse = (lines) => lines.map(l => 'data: ' + JSON.stringify(l) + '\n\n').join('');
    window.netFetch = function (url, o) {
      o = o || {}; let body = null; try { body = o.body ? JSON.parse(o.body) : null; } catch (e) { body = o.body; }
      window.__net.push({ url: String(url), body });
      const res = (ok, status, txt) => Promise.resolve({ ok, status, text: () => Promise.resolve(txt || ''), json: () => Promise.resolve(JSON.parse(txt || '{}')), headers: { get: () => null } });
      if (/\/v1\/models|\/models$/.test(url)) return res(true, 200, JSON.stringify({ data: [{ id: 'claude-opus-5-5', display_name: 'Claude Opus 5.5' }, { id: 'gpt-5.2' }] }));
      if (/\/v1\/messages$/.test(url)) {
        if (o.onChunk) o.onChunk(sse([{ type: 'message_start', message: { model: body && body.model } }, { type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } },
          { type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text: 'Done as asked.' } }, { type: 'content_block_stop', index: 0 }, { type: 'message_delta', delta: { stop_reason: 'end_turn' } }, { type: 'message_stop' }]));
        return res(true, 200, '');
      }
      if (/\/chat\/completions$/.test(url)) {
        if (window.__netRefuse > 0 && body && (body.reasoning_effort || body.reasoning)) { window.__netRefuse--; return res(false, 400, JSON.stringify({ error: { message: "Unsupported parameter: 'reasoning_effort' is not supported with this model." } })); }
        if (o.onChunk) o.onChunk('data: ' + JSON.stringify({ choices: [{ delta: { content: 'Done as asked.' } }] }) + '\n\ndata: ' + JSON.stringify({ choices: [{ delta: {}, finish_reason: 'stop' }] }) + '\n\ndata: [DONE]\n\n');
        return res(true, 200, '');
      }
      return res(false, 404, 'not in this test');
    };
  });
  const useCloud = (provider, model) => p.evaluate(([provider, model]) => { state.cloud = Object.assign(state.cloud || {}, { on: true, provider, model, key: 'test-key-not-real', base: provider === 'anthropic' ? 'https://api.anthropic.com' : 'https://api.openai.com/v1', models: [model] });
    state.chatSource = 'cloud'; saveState(); try { paintSrc(); } catch (e) {} }, [provider, model]);
  const send = async (text) => { await p.evaluate((t) => { const i = document.getElementById('chatInput'); i.value = t; sendChat(); }, text);
    await p.waitForFunction(() => Engine.status !== 'busy' && !window.liveBot, null, { timeout: 30000 }); await p.waitForTimeout(400); };
  const lastBody = (re) => p.evaluate((re) => { const L = window.__net.filter(x => new RegExp(re).test(x.url)); return L.length ? L[L.length - 1].body : null; }, re);

  // ---------- 1. the effort key, beside the model's name ----------
  await p.evaluate(() => go('chat')); await p.waitForTimeout(500);
  let k = await p.evaluate(() => { const e = document.getElementById('effKey'), m = document.getElementById('chatModelBtn'); if (!e) return null; const r = e.getBoundingClientRect(), rm = m.getBoundingClientRect();
    return { text: e.textContent.trim(), shown: !!e.offsetParent, afterModel: r.left >= rm.right - 1, sameRow: Math.abs((r.top + r.bottom) / 2 - (rm.top + rm.bottom) / 2) < 6 }; });
  ok(k && k.shown && /^High/.test(k.text) && k.afterModel && k.sameRow, 'Chat: the effort key stands beside the model\'s name, under the message box, and says High', k);
  await p.click('#effKey'); await p.waitForTimeout(250);
  const menu = await p.evaluate(() => { const m = document.getElementById('effMenu'); return m && !m.hidden ? [...m.querySelectorAll('.eff-opt')].map(b => ({ k: b.getAttribute('data-k'), on: b.getAttribute('aria-checked'), dis: b.getAttribute('aria-disabled'), t: b.textContent.slice(0, 40) })) : null; });
  ok(menu && menu.map(x => x.k).join() === 'auto,1,2,3,4,5,ultra,think' && menu.find(x => x.k === '3').on === 'true', 'its menu offers Auto, Low, Medium, High, Extra and Max, then Ultracode and Thinking; High is chosen', menu);
  ok(menu && menu.find(x => x.k === 'ultra').dis === 'true', 'in a chat without files, Ultracode is offered but cannot be turned on (it works on code)', menu && menu.find(x => x.k === 'ultra'));
  await useCloud('anthropic', 'claude-opus-5-5');
  await p.evaluate(() => { IngR215.closeMenu(); IngR215.openMenu(); }); await p.waitForTimeout(200);
  await p.hover('#effMenu .eff-opt[data-k="4"]'); await p.waitForTimeout(250);
  let pop = await p.evaluate(() => { const e = document.getElementById('effPop'); return e && !e.hidden ? e.innerText : null; });
  ok(pop && /Extra/.test(pop) && /Anthropic's own effort setting, “xhigh”/.test(pop) && /16,384 tokens/.test(pop) && /90 steps/.test(pop), 'hovering a level explains it with the model chosen: Claude is sent “xhigh” for Extra, its reply length and its steps', pop);
  await p.hover('#effMenu .eff-opt[data-k="auto"]'); await p.waitForTimeout(250);
  pop = await p.evaluate(() => { const e = document.getElementById('effPop'); return e && !e.hidden ? e.innerText : null; });
  ok(pop && /never chooses Max/.test(pop) && /says what it chose/.test(pop), 'hovering Auto says how it chooses, that it never chooses Max, and that it says what it chose', pop);
  await p.screenshot({ path: OUT + '/effort-menu.png' });
  // ---------- 2. the requests: what each service is sent ----------
  await p.evaluate(() => { IngR215.closeMenu(); state.thinking = false; saveState(); }); // Thinking off: 6.10.5 then held Claude at Medium
  await p.evaluate(() => { const e = document.getElementById('ctlEffort'); e.value = '5'; e.dispatchEvent(new Event('input')); state.effort = { auto: false }; });
  await send('Please list three facts about tallies.');
  let bd = await lastBody('/v1/messages$');
  ok(bd && bd.output_config && bd.output_config.effort === 'max', 'a chat with Claude at Max, Thinking off: Claude is sent “max” (6.10.5 sent “medium”)', bd && bd.output_config);
  await p.evaluate(() => { const e = document.getElementById('ctlEffort'); e.value = '4'; e.dispatchEvent(new Event('input')); });
  await send('And three more, carefully.');
  bd = await lastBody('/v1/messages$');
  ok(bd && bd.output_config && bd.output_config.effort === 'xhigh', 'at Extra, Claude is sent “xhigh”', bd && bd.output_config);
  await p.evaluate(() => { state.effort = { auto: true }; saveState(); IngR215.paintKey(); });
  await send('What is a tally?');
  bd = await lastBody('/v1/messages$');
  const said = await p.evaluate(() => { const ms = curChat().messages, m = ms[ms.length - 1]; const d = [...document.querySelectorAll('.eff-says')].pop(); return { eff: m.eff, line: d ? d.textContent : null, key: document.getElementById('effKey').textContent }; });
  ok(bd && bd.output_config.effort === 'low' && said.eff && said.eff.auto && said.eff.lv === 1 && /Auto chose Low effort: a short question/.test(said.line || '') && /Auto/.test(said.key),
    'Auto: a short question goes at Low; the reply says what Auto chose and why; the key says Auto', { effort: bd && bd.output_config.effort, said });
  const picks = await p.evaluate(() => ['What is a tally?', 'Tell me how tallies were used by medieval exchequers and what survives of them in archives today.', 'Write a cover letter for this post.',
    'Please review this argument thoroughly and critique its logic, step by step, checking each claim against the sources I gave you earlier in our conversation today.', 'x '.repeat(160)].map(t => IngEffort.pick(t, {}).lv)
    .concat([IngEffort.pick('fix the button', { code: true }).lv, IngEffort.pick('anything', { ultra: true }).lv]));
  ok(picks.join() === '1,2,3,4,4,3,5', 'Auto\'s rules: a short question Low, an everyday question Medium, a request for work High, a careful or long brief Extra, Code High, and Ultracode Max (Auto alone never chooses Max)', picks);
  await p.evaluate(() => { state.effort = { auto: false }; const e = document.getElementById('ctlEffort'); e.value = '3'; e.dispatchEvent(new Event('input')); });
  await useCloud('openai', 'gpt-5.2');
  await send('List three facts about tallies.');
  bd = await lastBody('/chat/completions$');
  ok(bd && bd.reasoning_effort === 'high', 'OpenAI\'s reasoning model is sent the reasoning effort (High: “high”)', bd && { reasoning_effort: bd.reasoning_effort });
  await p.evaluate(() => { window.__netRefuse = 1; });
  await send('And three more.');
  const two = await p.evaluate(() => window.__net.filter(x => /chat\/completions$/.test(x.url)).slice(-2).map(x => x.body.reasoning_effort || null));
  const lastText = await p.evaluate(() => { const ms = curChat().messages; return ms[ms.length - 1].text; });
  ok(two[0] === 'high' && two[1] === null && /Done as asked/.test(lastText), 'a service that refuses the effort is asked again without it, and the reply comes', { two, lastText });
  const ob = await p.evaluate(() => { const o1 = {}, o2 = {}, o3 = {}; IngEffort.openaiBody(o1, 'openrouter', 'some/model', 2); IngEffort.openaiBody(o2, 'moonshot', 'kimi-k3', 5); IngEffort.openaiBody(o3, 'gemini', 'gemini-3-pro', 1); return [o1, o2, o3]; });
  ok(ob[0].reasoning && ob[0].reasoning.effort === 'medium' && !Object.keys(ob[1]).length && ob[2].reasoning_effort === 'low', 'OpenRouter is sent a reasoning object, Kimi nothing (it takes no effort setting), Gemini a reasoning effort', ob);

  // the longest reply follows the effort, unless she sets it by hand (then it stays hers)
  const rl = await p.evaluate(async () => { const t = document.getElementById('ctlTokens'), was = state.effort.replyAuto; IngEffort.beforeSend({ text: 'Make a long page.' }); const auto = +t.value;
    return { was, auto, room: IngEffort.replyRoom(3, true) }; });
  await p.evaluate(() => { const k = document.getElementById('chatCtlBtn'); if (k.getAttribute('aria-expanded') !== 'true') k.click(); }); await p.waitForTimeout(400);
  await p.focus('#ctlTokens'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(150);
  const rl2 = await p.evaluate(() => { const t = document.getElementById('ctlTokens'), v = +t.value; IngEffort.beforeSend({ text: 'Make a long page.' }); const k = document.getElementById('chatCtlBtn'); if (k.getAttribute('aria-expanded') === 'true') k.click();
    return { hand: state.effort.replyAuto, before: v, after: +t.value }; });
  ok(rl.was !== false && rl.auto === rl.room && rl2.hand === false && rl2.after === rl2.before, 'the longest reply follows the effort (High: 8,192 tokens with a connection) until she moves its slider; then her length stays', { rl, rl2 });
  await p.evaluate(() => { state.effort.replyAuto = true; saveState(); });
  // ---------- 3. Code: an app, a session, Ultracode ----------
  await useCloud('anthropic', 'claude-opus-5-5');
  const pid = await p.evaluate(async (APP) => { go('code'); await new Promise(r => setTimeout(r, 600)); const pr = await ccMakeProject('Tally', APP, 'index.html'); ccNewSession(pr); await new Promise(r => setTimeout(r, 900)); return pr.id; }, APP);
  await p.evaluate(() => { IngAgent.setWay('auto'); IngR215.paintKey(); }); await p.waitForTimeout(300);
  await p.evaluate(() => IngR215.openMenu()); await p.waitForTimeout(200);
  const uopt = await p.evaluate(() => { const b = document.querySelector('#effMenu .eff-opt[data-k="ultra"]'); return { dis: b.getAttribute('aria-disabled'), on: b.getAttribute('aria-checked') }; });
  await p.click('#effMenu .eff-opt[data-k="ultra"]'); await p.waitForTimeout(250);
  k = await p.evaluate(() => ({ key: document.getElementById('effKey').textContent, ultra: curChat().ultra, run: IngEffort.forRun({ cloud: true, provider: 'anthropic' }) }));
  ok(uopt.dis === null && k.ultra === true && /Ultracode/.test(k.key) && k.run.lv === 5 && k.run.claude === 'max' && k.run.steps === 200,
    'Code with an app: Ultracode turns on; the key says Ultracode; it runs at Max (Claude: “max”) with up to 200 steps', { uopt, k });
  await p.evaluate(() => IngR215.closeMenu());
  await send('Add a button that takes one away.');
  bd = await lastBody('/v1/messages$');
  const tools = bd && bd.tools ? bd.tools.map(t => t.name) : [];
  ok(bd && bd.output_config.effort === 'max' && tools.includes('update_plan') && tools.includes('run_check') && /Ultracode is on/.test(JSON.stringify(bd.system)) && bd.max_tokens >= 64000,
    'Ultracode\'s request: effort “max”, a long reply allowed, the plan and check tools, and the four phases in its instructions', { effort: bd && bd.output_config.effort, tools, max: bd && bd.max_tokens });
  const back = await p.evaluate(() => +document.getElementById('ctlEffort').value);
  ok(back === 3, 'after an Ultracode reply, the effort chosen by hand (High) is back', back);

  // ---------- 4. the working loop under Ultracode: plan, build, a check run inside the app, carry on until it is done ----------
  const loopRes = await p.evaluate(async () => {
    const bot = { role: 'bot', text: '' }; curChat().messages.push(bot);
    const ws = await IngAgent.wsFor(bot); if (!ws) return { err: 'no workspace' };
    const steps = [], plans = [], said = []; let turn = 0;
    const script = [
      [{ name: 'update_plan', input: { tasks: [{ task: 'Add a Take one button', status: 'in_progress', check: 'take one' }, { task: 'Check that it takes one away', status: 'pending' }] } }],
      [{ name: 'edit', input: { file: 'index.html', old_text: '<button id="add">Add one</button>', new_text: '<button id="add">Add one</button> <button id="take">Take one</button>' } },
       { name: 'edit', input: { file: 'app.js', old_text: 'document.getElementById("add").onclick = () => { n++; document.getElementById("n").textContent = n; };', new_text: 'document.getElementById("add").onclick = () => { n++; document.getElementById("n").textContent = n; };\ndocument.getElementById("take").onclick = () => { n--; document.getElementById("n").textContent = n; };' } }],
      [{ name: 'run_check', input: { name: 'take one', code: "document.getElementById('add').click(); document.getElementById('take').click(); document.getElementById('take').click(); return document.getElementById('n').textContent === '0' ? true : 'it shows ' + document.getElementById('n').textContent;" } }],
      'I added the button.',   // ends with the plan unfinished and a check failing (it goes below zero): Ultracode sends it back
      [{ name: 'edit', input: { file: 'app.js', old_text: '{ n--;', new_text: '{ n = Math.max(0, n - 1);' } }],
      [{ name: 'run_check', input: { name: 'take one', code: "document.getElementById('add').click(); document.getElementById('take').click(); document.getElementById('take').click(); return document.getElementById('n').textContent === '0' ? true : 'it shows ' + document.getElementById('n').textContent;" } },
       { name: 'run_app', input: {} }],
      [{ name: 'update_plan', input: { tasks: [{ task: 'Add a Take one button', status: 'completed' }, { task: 'Check that it takes one away', status: 'completed' }] } }],
      'Done: a Take one button that stops at zero. The check “take one” passed, and the app shows no errors.'];
    const S = { msgs: [] };
    const fake = function (S, onToken) { const r = script[turn++]; if (typeof r === 'string') { onToken(r); said.push(r);
        return Promise.resolve({ calls: [], stop: 'end_turn', nudge: (t) => { S.msgs.push({ role: 'assistant', content: r }); S.msgs.push({ role: 'user', content: t }); said.push('[nudge] ' + t); } }); }
      return Promise.resolve({ calls: r.map((c, i) => ({ id: 't' + turn + '_' + i, name: c.name, input: c.input, bad: '' })), stop: 'tool_use', push: (res) => { S.msgs.push({ role: 'tool', res }); } }); };
    const ui = { token() {}, think() {}, step(s) { steps.push(s); }, plan(p) { plans.push(JSON.parse(JSON.stringify(p))); bot.plan = { tasks: p.tasks, at: p.at }; }, ask() { return Promise.resolve({ act: 'make' }); } };
    const out = await IngAgent.loop({ turn: fake, S, ws, way: 'auto', plan: false, small: false, ultra: true, limit: 200, stopped: () => false, ui, commit: () => Promise.resolve(2) });
    return { turns: turn, steps: steps.map(s => (s.bad ? '!' : '') + s.t), plans: plans.map(p => p.tasks.map(t => t.s).join('/')), said, app: ws.files.find(f => f.name === 'app.js').text, left: IngAgent.unfinished(ws) };
  });
  const st = (loopRes.steps || []).join(' | ');
  ok(loopRes.turns === 8 && /Plan: 0 of 2 done/.test(st) && /!Checked “take one” · failed/.test(st) && /Ultracode: \d+ tasks? (is|are) not completed/.test(st) && /Checked “take one” · passed/.test(st) && /Ran the app · no errors/.test(st) && /Plan: 2 of 2 done/.test(st),
    'Ultracode: it plans, builds, its check fails inside the running app, Ingenium sends it back to work, it fixes the cause, the check passes, the app runs clean, and the plan ends 2 of 2', loopRes);
  ok(loopRes.said && loopRes.said.some(x => /^\[nudge\] Ultracode is on, and the work is not finished: \d+ tasks? (is|are) not completed .*1 check failed \(“take one”\)/.test(x)) && /Math\.max\(0, n - 1\)/.test(loopRes.app || '') && loopRes.left === null,
    'what it was told when it stopped too soon names the unfinished task and the failed check; the fix is in the file; nothing is left unfinished at the end', { said: loopRes.said, left: loopRes.left });

  // ---------- 5. the plan, in the reply and in the column ----------
  await p.evaluate(() => { const ms = curChat().messages; ms[ms.length - 1].text = 'Done.'; ms[ms.length - 1].plan = { tasks: [{ t: 'Read the files', s: 'done' }, { t: 'Add a Take one button', s: 'done' }, { t: 'Stop it at zero', s: 'done' }, { t: 'Run the checks', s: 'doing' }, { t: 'Say what changed', s: 'todo' }], at: Date.now() };
    saveState(); renderChat(); IngR215.panel('plan', true); });
  await p.waitForTimeout(500);
  const pl = await p.evaluate(() => { const c = [...document.querySelectorAll('.pl-card')].pop(), col = document.getElementById('ccPanel'), key = document.getElementById('ccpPlanKey');
    return { card: c ? c.innerText.replace(/\s+/g, ' ') : null, done: c ? c.querySelectorAll('li.done').length : 0, doing: c ? c.querySelectorAll('li.doing').length : 0, strike: c ? getComputedStyle(c.querySelector('li.done .pl-t')).textDecorationLine : '',
      col: col && getComputedStyle(col).display !== 'none' && col.getBoundingClientRect().width > 0 ? col.innerText.replace(/\s+/g, ' ') : null, colDone: col ? col.querySelectorAll('li.done').length : 0, key: key ? key.textContent.trim() : null, keyOn: key && key.classList.contains('on') }; });
  ok(pl.card && /Plan 3 of 5 done/.test(pl.card) && pl.done === 3 && pl.doing === 1 && pl.strike === 'line-through', 'the reply shows the plan: 3 of 5 done, the done tasks checked off and struck through, the one in progress marked', pl);
  ok(pl.col && /Tasks 3 of 5 done/i.test(pl.col) && pl.colDone === 3 && /3\/5/.test(pl.key) && pl.keyOn, 'the Plan column beside the conversation lists the tasks, checked off; the Plan key in the top row says 3/5', pl);
  await p.screenshot({ path: OUT + '/code-plan.png' });
  const lay = await p.evaluate(() => { const card = document.querySelector('#page-chat .chat-card').getBoundingClientRect(), col = document.getElementById('ccPanel').getBoundingClientRect(), t = document.getElementById('ccTitle'), s = document.getElementById('chatSend').getBoundingClientRect();
    const spill = [...document.querySelectorAll('#page-chat .chat-top > *, #page-chat .composer-bar > *')].filter(e => e.offsetParent).map(e => e.getBoundingClientRect()).filter(r => r.right > card.right + 1 || r.left < card.left - 1).length;
    return { card: Math.round(card.width), over: document.body.classList.contains('ccp-over'), spill, title: t ? Math.round(t.getBoundingClientRect().width) : 0, sendIn: s.right <= card.right + 1 && s.width > 20, overlap: !(col.left >= card.right - 1 || document.body.classList.contains('ccp-over')) }; });
  ok(lay.spill === 0 && lay.title >= 110 && lay.sendIn && !lay.overlap, 'her MacBook\'s width with the preview open: the plan column does not squeeze the conversation (it floats over the preview when there is no room), nothing spills out, the title keeps its words, the send arrow shows', lay);
  const longPlan = await p.evaluate(() => { const tasks = []; for (let i = 1; i <= 14; i++) tasks.push({ t: 'Task ' + i, s: i <= 7 ? 'done' : i === 8 ? 'doing' : 'todo' }); const ms = curChat().messages; ms[ms.length - 1].plan = { tasks, at: Date.now() }; renderChat();
    const c = [...document.querySelectorAll('.pl-card')].pop(); return { more: [...c.querySelectorAll('.pl-more')].map(x => x.textContent), shown: c.querySelectorAll('li').length }; });
  ok(longPlan.more.join('|') === '5 earlier steps done|3 more to go' && longPlan.shown === 6, 'a long plan in a reply folds: the 5 earlier steps done above, the current task with 2 done before it and 3 to come, "3 more to go" below, as Claude shows it', longPlan);
  await p.evaluate(() => { const b = [...document.querySelectorAll('.pl-card')].pop().querySelector('.pl-more'); b.click(); });
  const unf = await p.evaluate(() => [...document.querySelectorAll('.pl-card')].pop().querySelectorAll('li').length);
  ok(unf === 14, 'pressing it shows every task', unf);
  // ---------- 6. the session column: environment, context, outputs, changes ----------
  await p.evaluate(() => IngR215.panel('session', true)); await p.waitForTimeout(900);
  const sess = await p.evaluate(() => { const col = document.getElementById('ccPanel'); return col ? col.innerText.replace(/\s+/g, ' ') : null; });
  // since 6.16 the Environment names the session's environment first (modules/r223.js), as Claude's names its own
  ok(sess && /Environment (☁ Default · Full )?⌂ Ingenium, on this device <\/> Tally · 2 files ◉ Claude: claude-opus-5-5/i.test(sess) && /Context/i.test(sess) && /Outputs/i.test(sess) && /Changes/i.test(sess) && /Background tasks/i.test(sess), 'the Session column, as in her picture: Environment (Ingenium on this device, the app, the model), Context, Outputs, Changes and Background tasks', sess && sess.slice(0, 400));
  // background tasks: a reply being written and a model being installed, each with its time and a stop key; the queue's waiting messages
  const bg = await p.evaluate(async () => {
    const bot = { role: 'bot', text: '', live: true, steps: [{ i: '✎', t: 'Changed app.js at line 2' }] }; curChat().messages.push(bot); window.liveBot = bot; Engine.setStatus('busy');
    const key = Object.keys(ING_LINEUP.models)[0]; lineupJobs[key] = { state: 'running', received: 300, total: 1000, error: '' };
    curChat().queue = [{ text: 'Then make it blue.', at: Date.now() }]; IngR215.paintPanel(); await new Promise(r => setTimeout(r, 2300));
    const box = document.querySelector('#ccPanel [data-sec="jobs"]'); const txt = box ? box.innerText.replace(/\s+/g, ' ') : null; const stops = box ? box.querySelectorAll('.stop').length : 0;
    let cancelled = null; const oc = window.lineupCancel; window.lineupCancel = (k) => { cancelled = k; delete lineupJobs[k]; };
    const rows = box ? [...box.querySelectorAll('.ccp-row')] : []; const inst = rows.find(r => /Installing/.test(r.textContent)); if (inst) inst.querySelector('.stop').click();
    window.lineupCancel = oc; delete bot.live; window.liveBot = null; Engine.setStatus('ready'); curChat().queue = []; delete lineupJobs[key];
    const ctx = document.querySelector('#ccPanel [data-sec="context"] .ccp-hd'), chg = document.querySelector('#ccPanel [data-sec="changes"] .ccp-hd');
    return { txt, stops, cancelled: cancelled === key, ctx: ctx ? ctx.getAttribute('aria-expanded') : null, chg: chg ? chg.getAttribute('aria-expanded') : null, ctxSum: ctx ? ctx.textContent : '' }; });
  ok(bg.txt && /Background tasks/i.test(bg.txt) && /Add a button that takes one away|A reply/.test(bg.txt) && /Changed app\.js at line 2/.test(bg.txt) && /Installing .* 30%/.test(bg.txt) && /\d+s/.test(bg.txt) && /Queued: “Then make it blue\.”/.test(bg.txt) && bg.stops === 3 && bg.cancelled,
    'Background tasks lists the reply being written (its latest step), a model being installed (30%), each with its time and a stop key (which stops it), and the message queued', bg);
  ok(bg.ctx === 'false' && bg.chg === 'true' && /%/.test(bg.ctxSum), 'Context folds (its share of the memory beside its name) and Changes opens, as in her picture', bg);
  const diff = await p.evaluate(() => [IngR215.lineDiff('a\nb\nc\n', 'a\nB\nc\nd\n'), IngR215.lineDiff('', 'x\ny'), IngR215.lineDiff('same', 'same')]);
  ok(JSON.stringify(diff) === '[{"add":2,"del":1},{"add":2,"del":1},{"add":0,"del":0}]', 'lines added and removed are counted as a diff counts them', diff);
  // ---------- 7. the working clock and the queue ----------
  const q = await p.evaluate(async () => {
    const sent = []; const realSend = window.sendChat; window.sendChat = function () { sent.push(document.getElementById('chatInput').value); document.getElementById('chatInput').value = ''; };
    const bot = { role: 'bot', text: '', live: true, steps: [{ i: '¶', t: 'Read app.js, lines 1–3' }] }; curChat().messages.push(bot); window.liveBot = bot; Engine.setStatus('busy'); renderChat();
    await new Promise(r => setTimeout(r, 1300));
    const w = document.getElementById('ccWork'), clockText = w && !w.hidden ? w.innerText.replace(/\s+/g, ' ') : null;
    const inp = document.getElementById('chatInput'); inp.value = 'Now make the number larger.'; inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    const stillBusy = Engine.status === 'busy' && window.liveBot === bot, queued = (curChat().queue || []).map(x => x.text), chip = document.getElementById('ccQueue'), chipText = chip && !chip.hidden ? chip.innerText : null, box = inp.value;
    inp.value = 'And a reset key.'; inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', metaKey: true, bubbles: true, cancelable: true }));
    const queued2 = (curChat().queue || []).length;
    delete bot.live; window.liveBot = null; Engine.setStatus('ready'); renderChat();
    await new Promise(r => setTimeout(r, 1200));
    const after = { sent: sent.slice(), left: (curChat().queue || []).length, clockHidden: document.getElementById('ccWork').hidden };
    window.sendChat = realSend; return { clockText, stillBusy, queued, chipText, box, queued2, after }; });
  ok(q.clockText && /Working/.test(q.clockText) && /\d+s/.test(q.clockText) && /Read app\.js, lines 1–3/.test(q.clockText) && /Stop/.test(q.clockText), 'while a reply is made, a clock above the message box says it is working, for how long, its latest step, with a Stop key', q.clockText);
  ok(q.stillBusy && q.queued.join() === 'Now make the number larger.' && /queued/i.test(q.chipText || '') && q.box === '' && q.queued2 === 2,
    'Enter while it works queues the message (it no longer stops the reply); ⌘ Enter queues too; the queue shows above the box', q);
  ok(q.after.sent.join('|') === 'Now make the number larger.' && q.after.left === 1 && q.after.clockHidden, 'when the reply ends, the first queued message is sent, the next waits for that reply; the clock goes', q.after);
  // ---------- 8. the left column's two keys, and the Guide ----------
  await p.evaluate(() => { IngR215.panel('plan', false); IngR215.panel('session', false); go('code'); }); await p.waitForTimeout(400);
  await p.evaluate(() => { const a = document.querySelector('.cc-proj-acts'); if (!(a && a.offsetParent)) { const k = document.getElementById('ccSideBtn'); if (k && k.offsetParent) k.click(); } }); await p.waitForTimeout(500);
  await p.screenshot({ path: OUT + '/code-left.png' });
  const keys = await p.evaluate(() => { const a = document.querySelector('.cc-proj-acts'); if (!a) return null; const bs = [...a.querySelectorAll('.btn')].map(b => Math.round(b.getBoundingClientRect().width)); return { bs, col: Math.round(a.getBoundingClientRect().width) }; });
  ok(keys && keys.bs.length === 2 && keys.bs.every(w => w < 130) && keys.bs[0] + keys.bs[1] < keys.col - 20, 'the left column\'s Close this app and Remove from Code keys are as long as their words, not stretched across the column', keys);
  // the grey browser box she showed is gone from the left column: rename asks in Ingenium's own dialog
  const ren = await p.evaluate(async () => { let native = 0; const op = window.prompt; window.prompt = () => { native++; return null; };
    const c = curChat(); ccRowMenu(c, document.getElementById('ccTitle')); const b = [...document.querySelectorAll('#ccMenu .menu-btn')].find(x => x.textContent === 'Rename'); b.click(); await new Promise(r => setTimeout(r, 300));
    const box = document.getElementById('modalBox'), inp = box && box.querySelector('.ing-ask-in'), shown = !!(inp && document.getElementById('modalRoot').classList.contains('open')), h = box.querySelector('h3').textContent, v0 = inp ? inp.value : null;
    if (inp) { inp.value = 'Tally, with a take-away key'; inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); } await new Promise(r => setTimeout(r, 300));
    window.prompt = op; return { native, shown, h, v0, title: c.title, closed: !document.getElementById('modalRoot').classList.contains('open') }; });
  ok(ren.native === 0 && ren.shown && ren.h === 'Name this conversation' && ren.title === 'Tally, with a take-away key' && ren.closed, 'Rename in the left column asks in Ingenium\'s own dialog (the browser\'s grey box is not used), and Enter keeps the new name', ren);
  await p.evaluate(() => { const c = curChat(); ccRowMenu(c, document.getElementById('ccTitle')); [...document.querySelectorAll('#ccMenu .menu-btn')].find(x => x.textContent === 'Rename').click(); });
  await p.waitForTimeout(400); await p.screenshot({ path: OUT + '/rename-dialog.png' }); await p.evaluate(() => closeModal());
  // since 6.26 each topic of the Guide is a folded tile in a room (modules/r230.js): it is opened, as she would open it, before it is read
  const guide = await p.evaluate(async () => { go('guide'); if (window.IngGuide) IngGuide.toggle('guideEffortCard', true); await new Promise(r => setTimeout(r, 400)); const c = document.getElementById('guideEffortCard'); return c ? c.innerText.replace(/\s+/g, ' ') : null; });
  ok(guide && /Low to Max/.test(guide) && /Auto/.test(guide) && /Ultracode/.test(guide) && /xhigh for Extra/.test(guide) && /three times/.test(guide) && /Honest limits/.test(guide), 'the Guide explains effort, Auto and Ultracode in depth, with their honest limits', guide && guide.slice(0, 300));
  ok(errs.length === 0, 'no script errors on the page', errs);
  // ---------- 9. a phone ----------
  const ph = await (await b.newContext({ ...pw.devices['iPhone 13'] })).newPage(); const perr = []; ph.on('pageerror', e => perr.push(e.message.slice(0, 200)));
  await ph.goto(URL_); await ph.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await ph.waitForTimeout(700);
  await ph.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); go('chat'); });
  await ph.waitForTimeout(500);
  const phoneRow = () => ph.evaluate(() => { const e = document.getElementById('effKey'), s = document.getElementById('chatSend'), bar = document.querySelector('#page-chat .composer-bar'); if (!e) return null; const r = e.getBoundingClientRect(), rs = s.getBoundingClientRect(), br = bar.getBoundingClientRect();
    return { shown: !!e.offsetParent, inside: r.right <= br.right + 1 && r.left >= br.left - 1, send: rs.right <= br.right + 1 && rs.right <= innerWidth && rs.width > 20, over: document.documentElement.scrollWidth > innerWidth + 1, key: e.textContent }; });
  let pk = await phoneRow();
  ok(pk && pk.shown && pk.inside && pk.send && !pk.over, 'an iPhone: the effort key and the send arrow both fit in the message box\'s row, and the page does not scroll sideways', pk);
  await ph.evaluate(() => { state.cloud = Object.assign(state.cloud || {}, { on: true, provider: 'anthropic', model: 'claude-opus-5-5', key: 'x', models: ['claude-opus-5-5'] }); state.chatSource = 'cloud'; curChat().ultra = true; saveState(); try { paintChatTop(); } catch (e) {} renderChat(); });
  await ph.waitForTimeout(400); pk = await phoneRow();
  ok(pk && pk.inside && pk.send && /Ultra/.test(pk.key), 'with a model named and Ultracode on, both still fit (the key says Ultra there)', pk);
  await ph.screenshot({ path: OUT + '/phone.png' });
  ok(perr.length === 0, 'no script errors on the phone', perr);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
