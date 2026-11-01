// node rig/t_702_career_minutes.js <Ingenium page url> <out dir>
// 6.9.2: "What I can do in N minutes" on the Career Studio's Today (modules/r188.js), in Chromium. Her words (31 October 2026):
// "automate where I want and also meticulously review and do on my own at my own pace." So each step on Today says about how
// long it takes; the right panel asks how long she has (10 · 15 · 25 · 45, the Clepsydra's own lengths) and lists only the steps
// that fit, the smallest first; on a low-energy day one step only; Start the clock runs the Clepsydra, and at the bell the
// studio offers Not today or Carry on.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const P1 = 'Archivist\nThe County Record Office\nApply with a CV.\nThe closing date is 5 December 2026.\n' + 'a'.repeat(60);
const P2 = 'Lecturer in Digital History\nUniversity of Oxbridge\nApply with a CV and a cover letter.\nThe closing date is 30 November 2026.\n' + 'b'.repeat(60);
const P3 = 'DPhil in History of Science\nUniversity of Exampleton\nSubmit a personal statement.\nThe closing date is 10 December 2026.\n' + 'c'.repeat(60);
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  const press = async (text, within) => { const hit = await p.evaluate(([text, within]) => { const root = document.querySelector(within || '#cs') || document;
      const k = [...root.querySelectorAll('button')].find(x => x.offsetParent && !x.disabled && (x.textContent.trim() === text || (x.querySelector('b') && x.querySelector('b').textContent.trim() === text)));
      if (!k) return false; k.click(); return true; }, [text, within || null]); if (!hit) throw new Error('no key: ' + text); await p.waitForTimeout(350); };
  // three applications: one not read yet (10 min), one with its checklist done (5 min: send it), one with a statement to write herself (45 min, Guide me)
  await p.evaluate(async ([P1, P2, P3]) => { IngLector.plan = () => ({ chosen: { id: 'test-model', customName: 'Test model' } }); state.clep.focusLen = 25; document.body.removeAttribute('data-sc-low');
    const a = await IngCareer.newOpp('job', P1, 'pasted'); const read = { r: { crit: [{ text: 'Cataloguing', ess: true, st: 'met', ev: 'x' }], strengths: [], concerns: [], next: [], asks: [], wants: [] }, at: Date.now(), model: 'Test model' };
    const bb = await IngCareer.newOpp('job', P2, 'pasted'); bb.read = read; bb.check = { items: [{ id: 'c1', text: 'Your CV', doc: 'cv', done: true, src: 'posting' }], pending: [], at: Date.now(), way: 'auto' }; bb.stage = 'preparing';
    const c = await IngCareer.newOpp('phd', P3, 'pasted'); c.read = read; c.way = 'guide'; c.check = { items: [{ id: 'c2', text: 'A personal statement', doc: 'statement', done: false, src: 'posting' }], pending: [], at: Date.now(), way: 'guide' };
    saveState(); const S = IngCareer.state(); S.ui.room = 'today'; S.ui.today = null; S.ui.mins = 0; go('career'); IngCareer.render(); }, [P1, P2, P3]);
  await p.waitForTimeout(500);
  const rows = await p.evaluate(() => [...document.querySelectorAll('#cs .c-list .c-item')].map(x => x.innerText.replace(/\s+/g, ' ')));
  ok(rows.length === 3 && rows.some(r => /^Read it against your profile Archivist .* about 10 min$/.test(r)) && rows.some(r => /^Send it, then mark it Applied in Track Lecturer .* about 5 min$/.test(r)) && rows.some(r => /^Write your personal statement DPhil .* about 45 min$/.test(r)), 'each step on Today says about how long it takes: a reading 10, a send 5, a statement written herself 45', rows);
  const seg = await p.evaluate(() => ({ box: !!document.getElementById('csMins'), keys: [...document.querySelectorAll('#csMins .c-seg button')].map(x => x.textContent), note: (document.querySelector('#csMins .c-note') || {}).textContent }));
  ok(seg.box && seg.keys.join('|') === '10|15|25|45 minutes' && /Say how long you have/.test(seg.note), 'the right panel asks how long she has: 10 · 15 · 25 · 45 minutes, the Clepsydra\'s own lengths', seg);
  await p.evaluate(() => [...document.querySelectorAll('#csMins .c-seg button')].find(x => x.textContent === '10').click()); await p.waitForTimeout(300);
  const ten = await p.evaluate(() => ({ list: [...document.querySelectorAll('#csMins .c-fitlist .c-item')].map(x => x.innerText.replace(/\s+/g, ' ')), head: (document.querySelector('#csMins p') || {}).textContent, key: [...document.querySelectorAll('#csMins .c-btn')].map(x => x.textContent) }));
  ok(ten.list.length === 2 && /^Send it, then mark it Applied/.test(ten.list[0]) && /about 5 min/.test(ten.list[0]) && /^Read it against your profile/.test(ten.list[1]) && /In 10 minutes you could:/.test(ten.head) && ten.key.includes('Start the clock · 10 minutes'), 'ten minutes: only the 5- and 10-minute steps are listed, the smallest first, with Start the clock', ten);
  await p.screenshot({ path: OUT + '/minutes.png' });
  await p.evaluate(() => [...document.querySelectorAll('#csMins .c-seg button')].find(x => x.textContent === '45 minutes').click()); await p.waitForTimeout(300);
  ok(await p.evaluate(() => document.querySelectorAll('#csMins .c-fitlist .c-item').length === 3), 'forty-five minutes: all three fit');
  // a low-energy day: one step only
  await p.evaluate(() => { document.body.setAttribute('data-sc-low', '1'); IngCareer.render(); }); await p.waitForTimeout(300);
  const low = await p.evaluate(() => ({ n: document.querySelectorAll('#csMins .c-fitlist .c-item').length, head: (document.querySelector('#csMins p') || {}).textContent }));
  ok(low.n === 1 && /a low-energy day: this one step is enough/.test(low.head), 'on a low-energy day one step only, the smallest, and it says so', low);
  await p.evaluate(() => { document.body.removeAttribute('data-sc-low'); [...document.querySelectorAll('#csMins .c-seg button')].find(x => x.textContent === '10').click(); }); await p.waitForTimeout(300);
  // the clock, and the bell
  await press('Start the clock · 10 minutes', '#csMins'); await p.waitForTimeout(400);
  const clock = await p.evaluate(() => ({ running: pomo.running, len: state.clep.focusLen, rem: pomo.remaining, on: IngCareer.clock().on, ids: IngCareer.clock().ids.length, note: (document.querySelector('#csMins .c-note') || {}).textContent, key: [...document.querySelectorAll('#csMins .c-btn')].map(x => x.textContent) }));
  ok(clock.running && clock.len === 10 && clock.rem <= 600 && clock.rem > 590 && clock.on && clock.ids === 2 && /The clock runs: (10:00|9:5\d) left\. Stop at the bell/.test(clock.note) && clock.key.includes('Stop the clock'), 'Start the clock runs the Clepsydra for ten minutes, says to stop at the bell, and remembers the two steps', clock);
  await p.evaluate(() => { pomo.remaining = 1; }); await p.waitForTimeout(2500);
  const bell = await p.evaluate(() => ({ ended: IngCareer.clock().ended, on: IngCareer.clock().on, text: (document.getElementById('csMins') || {}).innerText || '', keys: [...document.querySelectorAll('#csMins .c-btn')].map(x => x.textContent) }));
  ok(bell.ended && !bell.on && /The bell has gone\. What is left can wait/.test(bell.text) && bell.keys.join('|') === 'Not today|Carry on', 'at the bell the studio offers Not today or Carry on', bell);
  try { await p.evaluate(() => pomoReset()); } catch (e) {}
  await press('Not today', '#csMins'); await p.waitForTimeout(300);
  const rest = await p.evaluate(() => ({ rows: document.querySelectorAll('#cs .c-list > .c-pn-b > .c-item').length, folds: [...document.querySelectorAll('#cs .c-list summary')].map(s => s.textContent), rested: IngCareer.state().opps.filter(o => o.rest).map(o => o.title).sort(), clock: IngCareer.clock() }));
  ok(rest.rows === 1 && rest.folds.includes('Resting today (2)') && rest.rested.join('|') === 'Archivist|Lecturer in Digital History' && !rest.clock.ended, 'Not today rests the steps the clock was for until tomorrow; the third stays', rest);
  // on a phone the right panel shows only after a press: she opens the page on the list (the Today key), finds a key to how long
  // she has, and the panel that opens has its own way back
  const keyOf = () => p.evaluate(() => { const k = [...document.querySelectorAll('#cs .c-list .c-pn-f .c-btn')].find(x => x.textContent === 'How long do you have?'); return k ? { display: getComputedStyle(k).display, seen: !!k.offsetParent } : null; });
  const hidden = await keyOf();
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(600);
  await press('Today', '#cs .rm-tabs'); await p.waitForTimeout(300);
  const ph = await keyOf();
  if (ph && ph.seen) await press('How long do you have?', '#cs .c-list');
  const ph2 = await p.evaluate(() => { const m = document.getElementById('csMins'), l = document.querySelector('#cs .c-list'), back = [...document.querySelectorAll('#cs .c-work .c-pn-h .c-btn')].find(x => x.offsetParent && /^‹ Today$/.test(x.textContent));
    return { mins: !!(m && m.offsetParent), list: getComputedStyle(l).display, back: !!back, over: document.documentElement.scrollWidth - innerWidth }; });
  if (ph2.back) await press('‹ Today', '#cs .c-work');
  const ph3 = await p.evaluate(() => { const m = document.getElementById('csMins'), l = document.querySelector('#cs .c-list'); return { list: getComputedStyle(l).display, mins: !!(m && m.offsetParent), key: !!([...document.querySelectorAll('#cs .c-list .c-pn-f .c-btn')].find(x => x.textContent === 'How long do you have?' && x.offsetParent)) }; });
  ok(hidden && hidden.display === 'none' && ph && ph.seen && ph2.mins && ph2.list === 'none' && ph2.over <= 1 && ph2.back && ph3.list !== 'none' && !ph3.mins && ph3.key,
    'on a phone a key in the list, How long do you have?, opens the minutes and they have a key back to Today (hidden on a wide screen, where the minutes are in view)', { hidden, ph, ph2, ph3 });
  await p.screenshot({ path: OUT + '/minutes-phone.png' });
  await p.setViewportSize({ width: 1440, height: 950 }); await p.waitForTimeout(400);
  ok(await p.evaluate(() => Object.keys(window.__ingParts).every(k => window.__ingParts[k] === 'running')), 'every part of the page ran to its end');
  ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
