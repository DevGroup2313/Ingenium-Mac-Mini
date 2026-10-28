// node rig/t_690_agent.js <Ingenium page url> <mock server url> <out dir>
// The working loop (modules/r190.js), in Chromium, against rig/mock_agent_server.py speaking each service's own form, and a
// stand-in for a model on this device. The owner's words (28 October 2026): "I want the models to be aware of what I need
// them to do and make surgical edits and help me improve my apps", and "I want to be able to automate where I want and also
// meticulously review and do on my own at my own pace" (she chose a switch on each task). So:
//   - Do it for me, with Claude (Anthropic's form, thinking on), Kimi (Moonshot's OpenAI form, its reasoning passed back) and
//     an Ollama model (Ollama's own form): in Code, asked to change an app, the model lists the files, searches, reads, makes
//     two changes at once (one wrong, and told so plainly), runs the app, is shown the error it caused, mends it, runs it
//     again (no errors) and sums up; each step is shown under the reply in plain words; the file is changed in place, kept
//     as a version, and the preview shows it; every request was in the service's form (tools defined, each call answered
//     by its id, Claude's thinking passed back unchanged, the history only appended to);
//   - the way is chosen on a key beside the model's name, with each way said in plain words, and kept for the task;
//   - Step by step with me: each change waits on a card with the lines before and after; Make this change goes on;
//     Skip it (with a note) leaves the file as it was and tells the model, note and all; Stop here ends the work;
//   - Guide me, I do it: the model may only read, is told to guide, and changes nothing;
//   - Plan first: it may only read, plans and changes nothing;
//   - a chat with the app's files attached: the changed file is kept under the reply;
//   - a model on this device: the same work through written tool calls (<tool_call>), its thinking kept apart;
//   - Build: Ask a model to change this page does the same work on the page in the editor, and Undo puts it back;
//   - a model that refuses tools answers as before, in one reply; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, MOCK, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(d).slice(0, 900))); c ? pass++ : fail++; };
const INDEX = '<!doctype html>\n<html>\n<head><title>Greeting</title></head>\n<body>\n<h1 id="title"></h1>\n<script src="app.js"></script>\n</body>\n</html>\n';
const APP = 'function greet(n){ return "Hello " + n; }\n// the title\ndocument.getElementById("title").textContent = greet("world");\n';
const PAGE = '<!doctype html>\n<html>\n<head><title>Greeting</title></head>\n<body>\n<h1 id="title"></h1>\n<script>\n' + APP + '</script>\n</body>\n</html>\n';
const http = (method, path) => fetch(MOCK + path, { method }).then(r => r.json());
const STEPS = [/^Looked at the files$/, /^Searched for “greet” · 3 places$/, /^Read app\.js, lines 1–3$/, /^Changed app\.js at line 3$/, /^!Could not change app\.js: old_text is not in app\.js/, /^!Ran the app · 1 error$/, /^Changed app\.js at line 3$/, /^Ran the app · no errors$/];
const stepsOk = s => s.length === STEPS.length && STEPS.every((re, i) => re.test(s[i]));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  // the test's app is broken on purpose once (greeet), so the model can see and mend the error; that error is the app's own
  const errs = []; p.on('pageerror', e => { if (!/greeet is not defined/.test(e.message)) errs.push(e.message.slice(0, 200)); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  ok(await p.evaluate(() => !!(window.IngAgent && window.cloudChat.__r190 && window.chatHistory.__r190 && window.fillMsg.__r190 && Engine.generate.__r190)), 'the working loop is in place');

  const connect = (provider, model, think) => p.evaluate(([provider, base, model, think]) => {
    state.cloud = { provider, base, key: 'test-key', model, models: [model], on: true }; state.chatSource = 'cloud'; state.thinking = think; saveState(); }, [provider, MOCK, model, think]);
  const waitDone = () => p.waitForFunction(() => typeof liveBot !== 'undefined' && !liveBot && (() => { const m = curMsgs(); const l = m[m.length - 1]; return l && l.role === 'bot' && !l.live; })(), null, { timeout: 120000 });
  const lastBot = () => p.evaluate(() => { const m = curMsgs(), l = m[m.length - 1]; const d = [...document.querySelectorAll('.ag-steps')].pop();
    return { text: l.text, way: l.way, steps: (l.steps || []).map(s => (s.bad ? '!' : '') + s.t), edits: (l.edits || []).map(e => ({ file: e.file, ok: e.ok, ref: e.ref })), shown: d ? d.innerText : null }; });
  const project = (name) => p.evaluate(([i, a, name]) => ccMakeProject(name, [{ name: 'index.html', text: i }, { name: 'app.js', text: a }], 'index.html').then(pr => { ccNewSession(pr); go('code'); return pr.id; }), [INDEX, APP, name]);
  const chooseWay = async (label) => { await p.click('#agWayBtn'); await p.waitForTimeout(200); await p.click(`#agWayMenu button:has-text("${label}")`); await p.waitForTimeout(200); };
  const send = (text) => p.evaluate(t => { const i = document.getElementById('chatInput'); i.value = t; sendChat(); }, text);
  const fileOf = (pid) => p.evaluate(id => { const pr = projById(id); const f = ccFile(pr, 'app.js'); return { text: f.text, versions: (pr.versions || []).map(v => v.file + ':' + v.n) }; }, pid);

  const codeRun = async (provider, model, think, label) => {
    await http('POST', '/reset'); await connect(provider, model, think);
    const pid = await project('Greeting'); await p.waitForTimeout(800);
    await chooseWay('Do it for me');
    await send('Make the page greet Yannie instead of the world.');
    await waitDone(); await p.waitForTimeout(600);
    const r = await lastBot(), pr = await fileOf(pid), rep = await http('GET', '/report');
    ok(stepsOk(r.steps), label + ': it found, read, changed, ran, mended and ran again, each step shown in plain words', JSON.stringify(r.steps));
    ok(/greet\("Yannie"\)/.test(pr.text) && !/greeet|world/.test(pr.text) && /function greet\(n\)/.test(pr.text), label + ': the app is changed in place, surgically (the rest as it was)', pr.text);
    ok(pr.versions.length === 1 && /^app\.js:\d+$/.test(pr.versions[0]) && r.edits.length === 1 && r.edits[0].file === 'app.js', label + ': kept as a version, to compare or undo', JSON.stringify([pr.versions, r.edits]));
    ok(/greet Yannie/.test(r.text) && /no errors/.test(r.text) && !/<<<<<<<|FIND|REPLACE/.test(r.text), label + ': it sums up in plain words, without edit blocks', r.text);
    ok(r.shown && /Searched for/.test(r.shown) && /Ran the app/.test(r.shown), label + ': the steps are on the page under the reply', r.shown);
    ok(rep.problems.length === 0, label + ": every request was in the service's own form (tools, ids, thinking passed back, history only appended)", JSON.stringify(rep.problems));
    const html = await p.evaluate(() => (typeof csCur !== 'undefined' && csCur && csCur.html) || '');
    ok(/greet\("Yannie"\)/.test(html) && !/greeet/.test(html), label + ': the preview shows the changed app', html.slice(0, 300));
    return { rep, pid };
  };
  // Do it for me, with Claude (thinking on), Kimi and Ollama
  const A = await codeRun('anthropic', 'claude-opus-5-5', true, 'Claude');
  const rq = A.rep.requests;
  ok(rq.length === 8 && rq.every(x => x.fam === 'anthropic' && x.thinking && x.thinking.type === 'adaptive' && x.eager.every(e => e === true) && x.max_tokens >= 32000 && x.tools.length === 6),
    'Claude: adaptive thinking, eager tool input, room to write, all six tools, one request per step', JSON.stringify(rq.map(x => [x.n, x.thinking && x.thinking.type, x.max_tokens, x.tools.length])));
  await p.screenshot({ path: OUT + '/claude-auto.png' });
  const wayKey = await p.evaluate(() => { const k = document.getElementById('agWayBtn'); return { text: k.textContent.trim(), shown: !!k.offsetParent, title: k.title, kept: curChat().way, last: state.agent.way }; });
  ok(wayKey.shown && wayKey.text === 'For me' && wayKey.kept === 'auto' && wayKey.last === 'auto' && /Do it for me/.test(wayKey.title), 'the way is on a key beside the model, said in plain words, and kept for the task', JSON.stringify(wayKey));
  await p.click('#agWayBtn'); await p.waitForTimeout(250);
  const menu = await p.evaluate(() => [...document.querySelectorAll('#agWayMenu button')].map(b => b.innerText.replace(/\s+/g, ' ').trim()));
  ok(menu.length === 3 && /^Do it for me/.test(menu[0]) && /^Step by step with me/.test(menu[1]) && /^Guide me, I do it/.test(menu[2]) && menu.every(t => t.length > 60), 'its menu offers the three ways, each with what it does', JSON.stringify(menu));
  await p.screenshot({ path: OUT + '/way-menu.png' }); await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  await codeRun('moonshot', 'kimi-k2', false, 'Kimi (Moonshot)');
  await codeRun('ollama-local', 'qwen3:8b', false, 'Ollama');

  // Step by step with me: each change waits for her
  await http('POST', '/reset'); await connect('anthropic', 'claude-sonnet-5-5', false);
  let pid = await project('Greeting step'); await p.waitForTimeout(600); await chooseWay('Step by step with me');
  await send('Make the page greet Yannie instead of the world.');
  await p.waitForSelector('.ag-ask', { timeout: 60000 }); await p.waitForTimeout(300);
  const card = await p.evaluate(() => { const c = document.querySelector('.ag-ask'); return { h: c.querySelector('h4').textContent, del: [...c.querySelectorAll('.ag-diff .del .t')].map(x => x.textContent), add: [...c.querySelectorAll('.ag-diff .add .t')].map(x => x.textContent),
    keys: [...c.querySelectorAll('.ag-keys button')].map(b => b.textContent), file: projById(curChat().projectId) && ccFile(projById(curChat().projectId), 'app.js').text }; });
  ok(card.h === 'Change app.js at line 3?' && card.del.length === 1 && /greet\("world"\)/.test(card.del[0]) && card.add.length === 1 && /greeet\("Yannie"\)/.test(card.add[0]) && JSON.stringify(card.keys) === '["Make this change","Skip it","Make all the rest","Stop here"]' && /greet\("world"\)/.test(card.file),
    'Step by step: the change waits on a card, the line before and after, and the file is untouched until she chooses', JSON.stringify(card));
  await p.screenshot({ path: OUT + '/step-card.png' });
  await p.click('.ag-ask button[data-act="make"]');
  await p.waitForSelector('.ag-ask', { timeout: 60000 }); await p.waitForTimeout(300);
  await p.click('.ag-ask button[data-act="make"]');
  await waitDone(); await p.waitForTimeout(400);
  let r = await lastBot(), f = await fileOf(pid);
  ok(stepsOk(r.steps) && /greet\("Yannie"\)/.test(f.text) && r.way === 'step', 'Make this change: the work goes on, change by change, to the same end', JSON.stringify([r.steps, f.text]));
  ok(/one plain sentence what it changes and why/.test((await http('GET', '/report')).requests[0].sys || ''), 'and the model is told she reviews each change, and to say why before each one');

  // Skip it, with a note
  await http('POST', '/reset');
  pid = await project('Greeting skip'); await p.waitForTimeout(600); await chooseWay('Step by step with me');
  await send('Make the page greet Yannie instead of the world.');
  await p.waitForSelector('.ag-ask', { timeout: 60000 }); await p.waitForTimeout(200);
  await p.fill('.ag-ask textarea', 'Keep the world; greet Yannie in a subtitle instead.');
  await p.click('.ag-ask button[data-act="skip"]');
  await waitDone(); await p.waitForTimeout(400);
  r = await lastBot(); f = await fileOf(pid); let rep = await http('GET', '/report');
  const told = rep.requests.find(x => x.step === 4);
  ok(f.text === APP && r.steps.some(s => /^You skipped the change to app\.js at line 3: “Keep the world; greet Yannie/.test(s)) && !r.edits.length,
    'Skip it: the file stays as it was, and the reply says so with her note', JSON.stringify([r.steps, f.text === APP]));
  ok(told && /chose not to make this change\. They said: “Keep the world; greet Yannie in a subtitle instead\.”/.test(told.res), 'and the model is told, in her words', told && told.res);

  // Stop here
  await http('POST', '/reset');
  pid = await project('Greeting stop'); await p.waitForTimeout(600); await chooseWay('Step by step with me');
  await send('Make the page greet Yannie instead of the world.');
  await p.waitForSelector('.ag-ask', { timeout: 60000 }); await p.waitForTimeout(200);
  await p.click('.ag-ask button[data-act="stop"]');
  await waitDone(); await p.waitForTimeout(400);
  r = await lastBot(); f = await fileOf(pid); rep = await http('GET', '/report');
  ok(f.text === APP && /Stopped here, as you asked\. Nothing was changed\./.test(r.text) && rep.requests.length === 4, 'Stop here: the work ends at once, and nothing is changed', JSON.stringify([r.text, rep.requests.length]));

  // Guide me, I do it
  await http('POST', '/reset');
  pid = await project('Greeting guide'); await p.waitForTimeout(600); await chooseWay('Guide me, I do it');
  await send('Make the page greet Yannie instead of the world.');
  await waitDone(); await p.waitForTimeout(400);
  r = await lastBot(); f = await fileOf(pid); rep = await http('GET', '/report');
  ok(rep.requests.every(x => JSON.stringify(x.tools) === '["list_files","search","read"]') && /make each change themselves, to learn/.test(rep.requests[0].sys || '') && f.text === APP && !r.edits.length && r.way === 'guide',
    'Guide me: it may only read, is told to guide her step by step, and changes nothing', JSON.stringify([rep.requests.map(x => x.tools), r.way, f.text === APP]));

  // Plan first: read only
  await http('POST', '/reset');
  pid = await project('Greeting plan'); await p.waitForTimeout(600); await chooseWay('Do it for me');
  await p.evaluate(() => { state.cc = state.cc || {}; state.cc.plan = true; });
  await send('Make the page greet Yannie.');
  await waitDone(); await p.waitForTimeout(400);
  r = await lastBot(); f = await fileOf(pid); rep = await http('GET', '/report');
  ok(rep.requests.every(x => JSON.stringify(x.tools) === '["list_files","search","read"]') && f.text === APP && !r.edits.length && /Plan:/.test(r.text), 'Plan first: it may only read; it plans and changes nothing', JSON.stringify([rep.requests.map(x => x.tools), r.text]));
  await p.evaluate(() => { state.cc.plan = false; saveState(); });

  // a chat with the app's files attached
  await http('POST', '/reset'); await connect('anthropic', 'claude-opus-5-5', true);
  await p.evaluate(([i, a]) => { const c = { id: 'c' + Date.now().toString(36) + 'zz', title: 'New conversation', messages: [], way: 'auto' }; state.chats.push(c); state.activeChat = c.id; go('chat'); renderChat();
    const blk = '<file name="index.html">\n' + i + '\n</file>\n\n<file name="app.js">\n' + a + '\n</file>';
    const rec = { role: 'me', text: 'Make the page greet Yannie instead of the world.', files: [{ name: 'index.html', chars: i.length }, { name: 'app.js', chars: a.length }], attach: blk };
    curMsgs().push(rec); saveState(); renderChat(); sendRec(rec); }, [INDEX, APP]);
  await waitDone(); await p.waitForTimeout(500);
  const rc = await lastBot(), repC = await http('GET', '/report');
  const changed = rc.edits[0] ? await p.evaluate(ref => IngBig.load(ref), rc.edits[0].ref) : null;
  ok(stepsOk(rc.steps) && rc.edits.length === 1 && rc.edits[0].file === 'app.js' && /greet\("Yannie"\)/.test(changed || '') && /function greet\(n\)/.test(changed || ''),
    'in a chat with the files attached, the changed file is kept under the reply', JSON.stringify([rc.steps, rc.edits, changed]));
  ok(repC.problems.length === 0, "and every request was in Claude's form", JSON.stringify(repC.problems));
  const cardText = await p.evaluate(() => { const ms = [...document.querySelectorAll('.msg')]; const l = ms[ms.length - 1]; return l ? l.innerText.slice(0, 900) : ''; });
  ok(/app\.js/.test(cardText) && (await p.evaluate(() => !document.getElementById('agWayBtn').closest('.ag-way-wrap').hidden)), 'the changed file is named on the reply, and the way key shows in a chat with files', cardText.slice(0, 300));
  await p.screenshot({ path: OUT + '/claude-chat.png' });

  // a model on this device, through written tool calls
  await p.evaluate(() => {
    window.__fakeLog = [];
    const say = [
      '<think>I should look at the files first.</think>Let me see the files.\n<tool_call>\n{"name": "list_files", "arguments": {}}\n</tool_call>',
      '<tool_call>\n{"name": "search", "arguments": {"pattern": "greet"}}\n</tool_call>',
      '<tool_call>\n{"name": "read", "arguments": {"file": "app.js", "start_line": 1, "end_line": 20}}\n</tool_call>',
      'I will change the greeting.\n<tool_call>\n{"name": "edit", "arguments": {"file": "app.js", "old_text": "greet(\\"world\\")", "new_text": "greeet(\\"Yannie\\")"}}\n</tool_call>\n<tool_call>\n{"name": "edit", "arguments": {"file": "app.js", "old_text": "this text is not in the file", "new_text": "x"}}\n</tool_call>',
      '<tool_call>\n{"name": "run_app", "arguments": {}}\n</tool_call>',
      'The app shows an error. Mending it.\n<tool_call>\n{"name": "edit", "arguments": {"file": "app.js", "old_text": "greeet(\\"Yannie\\")", "new_text": "greet(\\"Yannie\\")"}}\n</tool_call>',
      '<tool_call>\n{"name": "run_app", "arguments": {}}\n</tool_call>',
      'I changed the greeting in app.js to greet Yannie; the app runs with no errors.'];
    const fake = { hasImageInput: false, generate(job) { const ms = job.messages; window.__fakeLog.push(JSON.parse(JSON.stringify(ms)));
      let last = -1; ms.forEach((m, i) => { if (m.role === 'user' && !/^<tool_response>/.test(m.content)) last = i; });
      const n = ms.slice(last + 1).filter(m => m.role === 'assistant').length; const out = say[Math.min(n, say.length - 1)];
      return new Promise(res => { let i = 0; const t = setInterval(() => { if (i >= out.length) { clearInterval(t); res(out); return; } job.onToken(out.slice(i, i + 4)); i += 4; }, 2); }); } };
    const m = { id: 'fake-local', customName: 'Small model', fileState: 'ready', family: 'qwen', size: 1 };
    state.models = (state.models || []).filter(x => x.id !== m.id).concat([m]); state.activeModelId = m.id; state.chatSource = 'local';
    Engine.adapter = fake; Engine.modelId = m.id; Engine.status = 'ready'; saveState(); });
  pid = await project('Greeting local'); await p.waitForTimeout(600); await chooseWay('Do it for me');
  await p.evaluate(() => { Engine.status = 'ready'; });
  await send('Make the page greet Yannie instead of the world.');
  await waitDone(); await p.waitForTimeout(500);
  r = await lastBot(); f = await fileOf(pid);
  const log = await p.evaluate(() => window.__fakeLog);
  const think = await p.evaluate(() => { const m = curMsgs(), l = m[m.length - 1]; return l.think || l.thinkTag || ''; });
  ok(stepsOk(r.steps) && /greet\("Yannie"\)/.test(f.text) && !/greeet|world/.test(f.text), 'a model on this device does the same work through written tool calls', JSON.stringify([r.steps, f.text]));
  ok(!/<tool_call>|<think>|tool_response/.test(r.text) && /Let me see the files\./.test(r.text) && /no errors/.test(r.text) && /look at the files first/.test(think), 'its tool calls and its thinking stay out of the reply; the thinking is kept apart', JSON.stringify([r.text, think]));
  const sysL = log[0] && log[0][0] && log[0][0].content || '';
  ok(log.length === 8 && /<tool_call>/.test(sysL) && /- edit /.test(sysL) && log[1].some(m => m.role === 'user' && /^<tool_response>\n/.test(m.content)) && log[1].filter(m => m.role === 'assistant').length === 1,
    'it is told the tools in its own written form, and each result comes back as <tool_response>', JSON.stringify([log.length, sysL.slice(-500)]));

  // Build: ask a model to change the page
  await http('POST', '/reset'); await connect('anthropic', 'claude-opus-5-5', false);
  await p.evaluate(pg => { go('build'); const ce = document.getElementById('codeEditor'); ce.value = pg; ce.dispatchEvent(new Event('input', { bubbles: true })); runBuild(); }, PAGE); await p.waitForTimeout(800);
  await p.click('#agBuild .agb-ways button[data-way="auto"]');
  const bwho = await p.evaluate(() => document.querySelector('#agBuild .agb-who').textContent);
  await p.fill('#agBuild textarea.agb-in', 'Make the page greet Yannie instead of the world.'); await p.click('#agBuild .agb-go');
  await p.waitForFunction(() => !IngAgent.build.state.busy, null, { timeout: 120000 }); await p.waitForTimeout(500);
  const bd = await p.evaluate(() => ({ code: document.getElementById('codeEditor').value, steps: [...document.querySelectorAll('#agBuild .ag-steps li')].map(li => (li.className === 'bad' ? '!' : '') + li.textContent.slice(1)),
    reply: document.querySelector('#agBuild .agb-reply').innerText, undo: !document.querySelector('#agBuild .agb-after').hidden }));
  ok(/greet\("Yannie"\)/.test(bd.code) && !/greeet|"world"/.test(bd.code) && bd.steps.length === 8 && bd.undo && /greet Yannie/.test(bd.reply) && /claude-opus-5-5/.test(bwho),
    'Build: Ask a model to change this page does the same work on the page in the editor', JSON.stringify([bd.steps, bd.code.slice(0, 260), bd.reply, bwho]));
  const repB = await http('GET', '/report');
  ok(repB.problems.length === 0, "and Build's requests were in Claude's form too", JSON.stringify(repB.problems));
  await p.evaluate(() => document.getElementById('agBuild').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300); await p.screenshot({ path: OUT + '/build-bar.png' });
  await p.click('#agBuild .agb-undo'); await p.waitForTimeout(500);
  ok(await p.evaluate(pg => document.getElementById('codeEditor').value === pg, PAGE), 'and Undo these changes puts the page back as it was');

  // a model that refuses tools answers as before
  await http('POST', '/reset'); await connect('openrouter', 'notools-model', false);
  await project('Greeting plain'); await p.waitForTimeout(500);
  await send('Make the page greet Yannie.');
  await waitDone(); await p.waitForTimeout(400);
  const rn = await lastBot(), repN = await http('GET', '/report');
  ok(rn.text === 'A plain reply without tools.' && repN.requests.length === 2 && repN.requests[0].tools.length === 6 && repN.requests[1].tools.length === 0,
    'a model that refuses tools answers as before, in one reply', JSON.stringify([rn.text, repN.requests.map(x => x.tools.length)]));

  ok(errs.length === 0, 'no page errors', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
