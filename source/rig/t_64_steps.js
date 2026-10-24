// Ingenium 6.4 · Break it down always gives steps (modules/r168.js; thoughts/support_core.html's steps from the words of a task),
// in Chromium. The owner's words (24 October 2026): "The break it down into steps do not really work on Ingenium, the model never
// writes anything and an error message populates". The engine is stood in for by one that answers as the real models did through
// the app's own engine (Ingenium-HPWindows tools/steps_probe.py, 24 October 2026). Checks, on the Focus page:
//   - no model ready: steps made from the words of the task (they name it), one calm line says why, no error;
//   - a model that writes a list (Velox): its steps; the engine was given room (420 + 300);
//   - a model that thinks without being asked and runs out (the Fire tablet's Scriba): its thoughts show while they come,
//     "Thinking first…" in the answer's box; at the end, the steps from the words of the task and a calm line; a thinking
//     model is given room (420 + 1600); its thoughts are never taken for steps;
//   - a model whose list is written only in its thoughts: that list;
//   - thoughts that come apart from the answer (Scriba, Qwen3.5) and then a list: the list;
//   - the model busy: steps from the words, a calm line;
//   - Stop: nothing changed, the task's words still in the box; Use my words instead, beside it: steps from the words at once;
//   - Too big? Break it down splits one step into the model's smaller ones;
//   - axe-core finds nothing on the Focus page; no page errors.
//   node rig/t_64_steps.js <url of Ingenium> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const AXE = process.env.AXE_JS || '/tmp/claude-0/-home-user/61388abb-8c01-57dc-aeb9-f70a19a79e0d/scratchpad/tools/node_modules/axe-core/axe.min.js';
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; };
const VELOX = ['1. Read the grant report requirements carefully.  \n', '2. List all required sections of the report.  \n', '3. Gather any data or figures needed for each section.  \n', '4. Write the introduction or summary first.'];
const LFMT = Array.from({ length: 40 }, (_, i) => (i ? ' and so on, ' : "<think> Okay, let's tackle this. The user wants me to break down the task of writing a grant report into small steps following their rules,") + ' thought ' + i);
const DRAFT = ["<think> Let me plan this.\n\nDraft:\n1. Pick a date.\n2. Call friends.\n\nBetter:\n\n", '1. Set the date.\n2. Send the invitations.\n3. Order the cake.\n4. Buy the decorations.\n', '</think>'];

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1500, height: 950 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(800);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
    await p.evaluate(() => {
      window.__fake = { content: [], think: [], delay: 25, calls: [] };
      window.__fakeAd = { id: 'fake', generate(job) { const F = window.__fake; F.calls.push(job.params); this._stop = false; const self = this;
          return new Promise(res => { let out = '', i = 0; const all = F.think.map(t => ['t', t]).concat(F.content.map(t => ['c', t]));
            (function next() { if (self._stop || i >= all.length) return res({ text: out }); const [k, t] = all[i++];
              if (k === 't') { if (job.onThink) job.onThink(t); } else { out += t; job.onToken(t); } setTimeout(next, F.delay); })(); }); },
        abort() { this._stop = true; } };
      window.__useModel = (file) => { state.models = state.models.filter(m => m.id !== 'mfake'); state.models.push({ id: 'mfake', fileName: file, customName: /Thinking/.test(file) ? 'Scriba' : (/Qwen/.test(file) ? 'Scriba' : 'Velox'), fileState: 'ready', sizeBytes: 7e8, color: '#7a5', ctx: 8192 });
        state.activeModelId = 'mfake'; Engine.adapter = window.__fakeAd; Engine.modelId = 'mfake'; Engine.status = 'ready'; };
      window.__noModel = () => { state.activeModelId = null; Engine.adapter = null; Engine.modelId = null; Engine.status = 'disconnected'; };
      try { if (typeof chatSource === 'function' && chatSource() === 'cloud') state.cloud.on = false; } catch (e) {}
      state.tasks = []; state.activeTask = null; saveState(); go('focus'); });
    await p.waitForTimeout(800);
    const press = async title => { await p.evaluate(t => { state.activeTask = '__new'; fxRender(); const ta = document.getElementById('fxTaskIn'); ta.value = t; const k = [...document.querySelectorAll('#fxSteps button')].find(x => x.textContent.trim() === 'Break it down'); k.click(); }, title); };
    const read = () => p.evaluate(() => { const t = taskCur(); return { title: t && t.title, steps: t ? t.steps.map(s => s.t) : [], note: (document.querySelector('#fxSteps .fx-note-calm') || {}).textContent || '', warn: (document.querySelector('#fxSteps .fx-msg') || {}).textContent || '', n: (state.tasks || []).length }; });

    // 1. no model ready
    await p.evaluate(() => __noModel()); await press('write the grant report'); await p.waitForTimeout(600);
    let r = await read();
    ok(r.title === 'write the grant report' && r.steps[0] === 'Open the grant report, or a new page for it' && r.steps.length >= 4 && /No model is ready/.test(r.note) && !r.warn, 'no model ready: steps from the words of the task (they name it), a calm line says why, no error', r);
    await p.screenshot({ path: path.join(OUT, '1_no_model.png') });

    // 2. a model that writes a list (Velox)
    await p.evaluate(v => { __useModel('LFM2.5-1.2B-Instruct-Q4_K_M.gguf'); __fake.think = []; __fake.content = v; __fake.calls = []; }, VELOX);
    await press('write the grant report'); await p.waitForTimeout(150);
    const mid2 = await p.evaluate(() => (document.getElementById('fxBusyText') || {}).textContent || '');
    await p.waitForTimeout(800); r = await read(); let prm = await p.evaluate(() => __fake.calls[0] || {});
    ok(r.steps.length === 4 && r.steps[0] === 'Read the grant report requirements carefully.' && !r.note && !r.warn && prm.max_tokens === 720 && prm.thinking === false, 'a model that writes a list: its steps, the answer shown as it comes; room 420 + 300, thinking off', { r, prm: { max: prm.max_tokens, th: prm.thinking }, mid2 });

    // 3. a model that thinks without being asked, and runs out (the Fire tablet's Scriba)
    await p.evaluate(c => { __useModel('LFM2.5-1.2B-Thinking-Q4_K_M.gguf'); __fake.think = []; __fake.content = c; __fake.calls = []; __fake.delay = 40; }, LFMT);
    await press('plan my sister\'s birthday party'); await p.waitForTimeout(700);
    const mid3 = await p.evaluate(() => ({ box: (document.getElementById('fxBusyText') || {}).textContent || '', think: (document.getElementById('fxBusyThink') || {}).textContent || '' }));
    await p.screenshot({ path: path.join(OUT, '3_thinking.png') });
    await p.waitForTimeout(2200); r = await read(); prm = await p.evaluate(() => __fake.calls[0] || {});
    ok(mid3.box === 'Thinking first…' && /^….*thought \d+/.test(mid3.think) && !/<think>/.test(mid3.box + mid3.think), 'a thinking model: "Thinking first…" in the answer\'s box, its thoughts shown softly beneath while they come', mid3);
    ok(r.title === "plan my sister's birthday party" && r.steps[0] === "Write in one line what your sister's birthday party is for, and when" && /did not write a list/.test(r.note) && !r.steps.some(s => /thought|tackle/.test(s)) && prm.max_tokens === 2020, 'its thoughts are never taken for steps: the steps come from the words of the task, a calm line says so; a thinking model is given room (420 + 1600)', { r, max: prm.max_tokens });
    await p.screenshot({ path: path.join(OUT, '3_after.png') });

    // 4. a list written only in its thoughts
    await p.evaluate(c => { __fake.think = []; __fake.content = c; __fake.delay = 20; }, DRAFT);
    await press('plan the party'); await p.waitForTimeout(700); r = await read();
    ok(r.steps.join('|') === 'Set the date.|Send the invitations.|Order the cake.|Buy the decorations.' && !r.note, 'a list written only in its thoughts: the last list there (not the draft)', r);

    // 5. thoughts apart from the answer (Scriba, Qwen3.5), then a list
    await p.evaluate(() => { __useModel('Qwen3.5-2B-Q4_K_M.gguf'); __fake.think = ['The person wants steps. ', 'I will keep them short.']; __fake.content = ['1. Wipe down all countertops.\n', '2. Wash the sink.\n', '3. Vacuum the floor.']; __fake.delay = 150; });
    await press('clean the kitchen'); await p.waitForTimeout(220);
    const mid5 = await p.evaluate(() => (document.getElementById('fxBusyThink') || {}).textContent || '');
    await p.waitForTimeout(1200); r = await read();
    ok(r.steps.length === 3 && r.steps[2] === 'Vacuum the floor.' && /keep them short|person wants/.test(mid5), 'thoughts apart from the answer show while they come; then the list', { r, mid5 });

    // 6. the model busy
    await p.evaluate(() => { Engine.status = 'busy'; }); await press('email Professor Lee about the deadline'); await p.waitForTimeout(500); r = await read();
    ok(r.steps[0] === 'Find the address or the number for Professor Lee' && /busy/.test(r.note) && !r.warn, 'the model busy: steps from the words of the task, a calm line says so', r);
    await p.evaluate(() => { Engine.status = 'ready'; });

    // 7. Stop
    const before = (await read()).n;
    await p.evaluate(c => { __fake.think = []; __fake.content = c; __fake.delay = 120; }, LFMT); await press('tidy the garage');
    await p.waitForTimeout(500); await p.evaluate(() => { const k = [...document.querySelectorAll('.fx-busy button')].find(x => x.textContent.trim() === 'Stop'); k.click(); }); await p.waitForTimeout(600);
    const st = await p.evaluate(() => ({ n: (state.tasks || []).length, box: (document.getElementById('fxTaskIn') || {}).value, msg: (document.querySelector('#fxSteps .fx-msg') || {}).textContent || '' }));
    ok(st.n === before && st.box === 'tidy the garage' && /Stopped\. Nothing was changed/.test(st.msg), 'Stop: nothing changed, the task\'s words still in the box', st);

    // 7b. Use my words instead: the model stopped, the steps made from the words at once
    await p.evaluate(c => { __fake.think = []; __fake.content = c; __fake.delay = 120; }, LFMT); await press('pay the electricity bill');
    await p.waitForTimeout(500);
    const wk = await p.evaluate(() => { const k = document.querySelector('.fx-busy .fx-words'); return k ? k.textContent.trim() : null; });
    await p.evaluate(() => document.querySelector('.fx-busy .fx-words').click()); await p.waitForTimeout(600);
    r = await read();
    ok(wk === 'Use my words instead' && r.title === 'pay the electricity bill' && r.steps[0] === 'Open the letter, the email or the website for the electricity bill' && /as you asked/.test(r.note), 'Use my words instead, beside Stop: the model stopped, the steps made from the words at once', { wk, r });

    // 8. Too big? Break it down
    await p.evaluate(v => { __useModel('LFM2.5-1.2B-Instruct-Q4_K_M.gguf'); __fake.think = []; __fake.content = v; __fake.delay = 15; }, VELOX);
    await press('write the grant report'); await p.waitForTimeout(700);
    await p.evaluate(() => { __fake.content = ['1. Open the funder\'s page.\n', '2. Copy the list of sections.\n', '3. Paste it into the report.']; const t = taskCur(); taskBreakStep(t, 0); }); await p.waitForTimeout(600);
    r = await read();
    ok(r.steps[0] === "Open the funder's page." && r.steps[2] === 'Paste it into the report.' && r.steps[3] === 'List all required sections of the report.', 'Too big? Break it down: one step split into the model\'s smaller ones, the others kept', r.steps);

    if (fs.existsSync(AXE)) { await p.addScriptTag({ path: AXE }); const v = await p.evaluate(async () => (await axe.run('#page-focus', { runOnly: ['wcag2a', 'wcag2aa'] })).violations.map(v => v.id + ':' + v.nodes.length)); ok(v.length === 0, 'axe-core finds nothing on the Focus page', v); }
    ok(!errs.length, 'no page errors', errs.slice(0, 4));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
