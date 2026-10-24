// The Forge 646 · Break it down on the Forge's Focus room (thoughts/support_core.html, the steps made from the words of the
// task; the Forge has no model). The owner's words (24 October 2026): Break it down "do not really work on Ingenium ... its not
// that much better on the Forge either". Checks: each task's steps name the task (its parts; its doing word and what it is
// about), the first step is a small one, the Steps card says how they are made, the steps can be followed one at a time,
// Too big? Break it down splits a step, axe-core finds nothing on the Focus room, no page errors.
//   node rig/t_646_steps.js <url of the Forge> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const AXE = process.env.AXE_JS || '/tmp/claude-0/-home-user/61388abb-8c01-57dc-aeb9-f70a19a79e0d/scratchpad/tools/node_modules/axe-core/axe.min.js';
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  try {
    await p.goto(URL_); await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 120000 }); await p.waitForTimeout(1200);
    await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await p.waitForTimeout(800);
    await p.evaluate(() => FORGE.openRoom('focus')); await p.waitForTimeout(1200);
    const note = await p.evaluate(() => [...document.querySelectorAll('#focusPages [data-sc-card="steps"] .sc-note')].map(n => n.textContent).join(' | '));
    ok(/reads the task: each part, its doing word and what it is about/.test(note) && /less than five minutes/.test(note), 'the Steps card says how the steps are made', note);
    const C = '#focusPages [data-sc-card="steps"]';
    const brk = async t => { if (!(await p.$(C + ' input.sc-in'))) { await p.click(C + ' button:has-text("New task")'); await p.waitForTimeout(300); }
      await p.fill(C + ' input.sc-in', t); await p.click(C + ' button:has-text("Break it down")'); await p.waitForTimeout(700);
      return p.evaluate(C => { const card = document.querySelector(C); return { step: (card.querySelector('.sc-step') || {}).textContent || '', count: (card.querySelector('.sc-count') || {}).textContent || '' }; }, C); };
    let r = await brk('make the menu work on a phone');
    ok(r.step === 'Open the file where the change goes, and find the place' && /Step 1 of 5/.test(r.count), 'a building task: steps for building, the first a small one', r);
    await p.click(C + ' .sc-acts button:has-text("Done")'); await p.waitForTimeout(400);
    const s2 = await p.evaluate(() => (document.querySelector('#focusPages [data-sc-card="steps"] .sc-step') || {}).textContent || '');
    ok(s2 === 'Write in one line what you will see when “make the menu work on a phone” is done', 'the steps name the task, and come one at a time', s2);
    r = await brk('write the release notes and email the testers');
    ok(r.step === 'Write the release notes' && /Step 1 of 3/.test(r.count), 'a task of two parts: each part is a step', r);
    r = await brk('plan the launch party');
    ok(r.step === 'Write in one line what the launch party is for, and when', 'a plan: its first step names what is planned', r);
    r = await brk('clean my desk before the call');
    ok(r.step === 'Choose one small part of your desk to start with', '"my desk" becomes "your desk"; "before the call" is left out of the thing', r);
    await p.screenshot({ path: path.join(OUT, 'forge_steps.png') });
    await p.click(C + ' button:has-text("Too big? Break it down")'); await p.waitForTimeout(500);
    const sub = await p.evaluate(() => (document.querySelector('#focusPages [data-sc-card="steps"] .sc-step') || {}).textContent || '');
    ok(/^Get ready for: Choose one small part of your desk/.test(sub), 'Too big? Break it down splits the step in front of you', sub);
    if (fs.existsSync(AXE)) { await p.addScriptTag({ path: AXE }); const v = await p.evaluate(async () => (await axe.run('#room-focus', { runOnly: ['wcag2a', 'wcag2aa'] })).violations.map(v => v.id + ':' + v.nodes.length)); ok(v.length === 0, 'axe-core finds nothing on the Focus room', v); }
    ok(!errs.length, 'no page errors', errs.slice(0, 4));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
