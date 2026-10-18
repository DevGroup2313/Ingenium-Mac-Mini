// R121 + R122: the shared support module in Ingenium's Focus page, and Ingenium's own copy of itself in the app library.
// node support121_e2e.js <url> <outdir>
const pw = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  const parts = await p.evaluate(() => ({ p52: window.__ingParts.p52, v: window.SupportCore && SupportCore.v, s: !!window.IngSupport }));
  ok(parts.p52 === 'running' && parts.v === 2 && parts.s, 'the support module part (p52) runs on the shared core, version 2', JSON.stringify(parts));

  // 1. the module's cards sit in Ingenium's own Focus grid
  await p.evaluate(() => { state.tasks = []; state.activeTask = null; state.reminders = []; delete state.supportCore; saveState(); go('focus'); });
  await p.waitForTimeout(800);
  const cards = await p.evaluate(() => { const g = document.querySelector('#page-focus .fx-grid'); return {
    order: [...g.children].map(c => c.id), low: document.getElementById('fxLowHost').hidden,
    rt: [...document.querySelectorAll('#fxRoutinesHost .sc-rt-n')].map(x => x.textContent),
    today: (document.querySelector('#fxTodayHost .sc-h') || {}).textContent,
    sw: [...document.querySelectorAll('#fxSupportsHost .sc-sw-l')].map(x => x.textContent),
    cls: (document.querySelector('#fxRoutinesHost .sc-card') || {}).className }; });
  ok(cards.low === true && cards.rt.join('|') === 'Start of the day|End of the day' && cards.today === 'Today asks of you' && cards.sw.length === 7,
    'Routines, Today asks of you and Your supports join the Focus page; the low-day card waits', JSON.stringify(cards));
  ok(cards.order[0] === 'fxLowHost' && cards.order.indexOf('fxRoutinesHost') > cards.order.indexOf('fxWordsCard') && /card fx-card/.test(cards.cls),
    'they sit in Ingenium\'s grid, in its own cards, after Clear words', JSON.stringify(cards.order));
  ok(cards.sw.join('|') === 'Calm look|Smaller steps|Time you can see|Low-energy days|The Inbox|Routines|Focus room', 'the switches use Ingenium\'s own words where it has its own', cards.sw.join('|'));
  await p.screenshot({ path: OUT + '/focus-top.png' });
  await p.evaluate(() => document.getElementById('fxRoutinesHost').scrollIntoView({ block: 'start' })); await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/focus-module-cards.png' });

  // 2. Steps: Just start and the Focus room beside the step
  await p.evaluate(() => { taskNew('Write the grant report', ['Open the draft', 'Read the last paragraph', 'Write one sentence']); state.support.view = 'one'; saveState(); fxRender(); });
  await p.waitForTimeout(300);
  const keys = await p.evaluate(() => [...document.querySelectorAll('#fxSteps .fx-step-acts button')].map(b => b.textContent));
  ok(keys.includes('⏱ Just start · 2 min') && keys.includes('🎧 Focus room') && keys[0] === 'Done', 'the step offers Just start and the Focus room after its own keys', keys.join(' | '));
  await p.evaluate(() => document.querySelector('#fxSteps [data-sc-key="just"]').click()); await p.waitForTimeout(700);
  const just = await p.evaluate(() => { const c = document.getElementById('sc-just'); return c ? c.textContent : null; });
  ok(just && /Just start · [12]:\d\d/.test(just), 'Just start runs a two-minute timer at the foot of the screen', just);
  await p.screenshot({ path: OUT + '/just-start.png' });
  await p.evaluate(() => document.querySelector('#sc-just button').click()); await p.waitForTimeout(200);
  ok(await p.evaluate(() => !document.getElementById('sc-just')), 'Stop takes it away');
  await p.evaluate(() => document.querySelector('#fxSteps [data-sc-key="focusroom"]').click()); await p.waitForTimeout(500);
  const room = await p.evaluate(() => { const r = document.getElementById('sc-focus-room'); return r ? { task: r.querySelector('.sc-fr-task').value, now: (r.querySelector('.sc-fr-now') || {}).textContent, clock: r.querySelector('.sc-fr-clock').textContent, run: r.querySelector('.sc-fr-go').textContent, app: r.getAttribute('data-sc-app'), bg: getComputedStyle(r.querySelector('.sc-fr-go')).backgroundColor } : null; });
  ok(room && room.task === 'Write the grant report' && /Open the draft/.test(room.now) && /^\d+:\d\d$/.test(room.clock) && room.app === 'ingenium', 'the Focus room opens with the task, its step and the Clepsydra\'s time', JSON.stringify(room));
  await p.screenshot({ path: OUT + '/focus-room.png' });
  await p.evaluate(() => document.querySelector('#sc-focus-room .sc-fr-go').click()); await p.waitForTimeout(1300);
  const ran = await p.evaluate(() => ({ running: pomo.running, run: document.querySelector('#sc-focus-room .sc-fr-go').textContent }));
  ok(ran.running && /Pause/.test(ran.run), 'its key starts Ingenium\'s own focus timer', JSON.stringify(ran));
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  await p.evaluate(() => { pomoReset(); });
  ok(await p.evaluate(() => !document.getElementById('sc-focus-room')), 'Esc leaves the room');

  // 3. today asks of you
  await p.evaluate(() => { state.reminders.push({ text: 'Call the library about the inter-library loan' }); state.parked = state.parked || []; state.parked.unshift({ id: 'r121t', t: 'Look up the archive hours', at: Date.now(), remindAt: (function () { const d = new Date(); d.setHours(23, 58, 0, 0); return Math.max(Date.now() + 1000, Math.min(d.getTime(), Date.now() + 3600e3)); })() /* later today, never past midnight */ }); saveState(); fxRender(); });
  await p.waitForTimeout(300);
  const today = await p.evaluate(() => [...document.querySelectorAll('#fxTodayHost .sc-row')].map(r => r.querySelector('.sc-ico').textContent + ' ' + r.querySelector('.sc-txt').textContent));
  const nowInbox = await p.evaluate(() => [...document.querySelectorAll('#fxNow .fx-txt')].map(t => t.textContent).find(t => /Inbox|parked/.test(t)));
  ok(nowInbox === 'One thought waits in the Inbox.', 'Now names the Inbox as the rest of the app does', nowInbox);
  ok(today.some(t => /^→ Your step in “Write the grant report”: Open the draft/.test(t)) && today.some(t => /^🔔 Call the library/.test(t)) && today.some(t => /^⏰ A thought asked to come back today: “Look up the archive hours”/.test(t)) && today.some(t => /^⏳ \d+ focus session/.test(t)),
    'Today asks of you gathers the step, the reminders, a thought due back today and the focus sessions', JSON.stringify(today));
  await p.evaluate(() => { const r = [...document.querySelectorAll('#fxTodayHost .sc-row')].find(x => /Call the library/.test(x.textContent)); r.querySelector('button').click(); }); await p.waitForTimeout(300);
  ok(await p.evaluate(() => state.reminders.length === 0 && !/Call the library/.test(document.getElementById('fxTodayHost').textContent)), 'a reminder\'s Done there clears it from the bell too');

  // 4. a low-energy day
  await p.evaluate(() => { state.reminders.push({ text: 'Send the form' }); saveState(); const c = document.querySelector('#fxLowRow input'); c.click(); }); await p.waitForTimeout(600);
  const low = await p.evaluate(() => ({ attr: document.body.hasAttribute('data-sc-low'), host: !document.getElementById('fxLowHost').hidden, h: (document.querySelector('#fxLowHost .sc-h') || {}).textContent,
    acts: [...document.querySelectorAll('#fxLowHost button')].map(b => b.textContent), rt: document.getElementById('fxRoutinesHost').hidden, time: getComputedStyle(document.getElementById('fxTimeCard')).display,
    today: [...document.querySelectorAll('#fxTodayHost .sc-txt')].map(x => x.textContent), stored: JSON.stringify(state.supportCore.low) }));
  ok(low.attr && low.host && /A low-energy day/.test(low.h) && low.rt && low.time === 'none', 'a low day shows its card at the top and leaves out Routines and Time', JSON.stringify(low));
  ok(low.acts.join('|') === '⏱ Just start · 2 min|🎧 Open the Focus room|🌿 I need quiet|Show everything again' && low.today.length === 3 && !low.today.some(t => /focus session|thoughts? wait/.test(t)),
    'it offers one small start, and Today keeps only what is essential', JSON.stringify({ a: low.acts, t: low.today }));
  await p.evaluate(() => window.scrollTo(0, 0)); await p.evaluate(() => document.getElementById('page-focus').scrollIntoView()); await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/low-day.png' });
  await p.evaluate(() => [...document.querySelectorAll('#fxLowHost button')].find(b => b.textContent === 'Show everything again').click()); await p.waitForTimeout(500);
  ok(await p.evaluate(() => !document.body.hasAttribute('data-sc-low') && document.getElementById('fxLowHost').hidden && !document.getElementById('fxRoutinesHost').hidden && !document.querySelector('#fxLowRow input').checked), 'Show everything again brings it all back');

  // 5. a routine, step by step
  await p.evaluate(() => [...document.querySelectorAll('#fxRoutinesHost button')].find(b => /Begin|Again/.test(b.textContent)).click()); await p.waitForTimeout(500);
  const sh = await p.evaluate(() => { const s = document.querySelector('.sc-sheet'); return s ? { h: s.querySelector('h3').textContent, c: s.querySelector('.sc-rt-count').textContent, st: s.querySelector('.sc-rt-step').textContent, app: s.parentNode.getAttribute('data-tc-app') } : null; });
  const foc = await p.evaluate(() => document.activeElement && document.activeElement.textContent);
  ok(foc === '✓ Done', 'the routine sheet puts the keyboard on its main key', foc);
  ok(sh && sh.h === '🌅 Start of the day' && sh.c === 'Step 1 of 4' && sh.app === 'ingenium', 'a routine opens in the thought panel\'s dress, one step at a time', JSON.stringify(sh));
  await p.screenshot({ path: OUT + '/routine.png' });
  for (let i = 0; i < 4; i++) { await p.evaluate(() => document.querySelector('.sc-sheet .tc-keep').click()); await p.waitForTimeout(120); }
  const done = await p.evaluate(() => ({ t: (document.querySelector('.sc-rt-done') || {}).textContent, rd: JSON.stringify(state.supportCore.rDone) }));
  ok(/Well begun/.test(done.t) && /"start":true/.test(done.rd), 'done, it says so and remembers it for today', JSON.stringify(done));
  await p.evaluate(() => document.querySelector('.sc-sheet .tc-keep').click()); await p.waitForTimeout(300);
  ok(await p.evaluate(() => /done today ✓/.test(document.getElementById('fxRoutinesHost').textContent)), 'the routine shows done today');

  // 6. the switches
  const sw = async (k, v) => p.evaluate(([k, v]) => { const row = [...document.querySelectorAll('#fxSupportsHost .sc-sw')].find(r => r.querySelector('.sc-sw-l').textContent === k); [...row.querySelectorAll('button')].find(b => b.textContent === (v ? 'On' : 'Off')).click(); }, [k, v]);
  await sw('Smaller steps', false); await p.waitForTimeout(400);
  ok(await p.evaluate(() => getComputedStyle(document.getElementById('fxStepsCard')).display === 'none' && state.supportCore.sw.tiny === false), 'Smaller steps off takes the Steps card away');
  await sw('Smaller steps', true); await p.waitForTimeout(300);
  await sw('The Inbox', false); await p.waitForTimeout(400);
  const ibOff = await p.evaluate(() => ({ fab: getComputedStyle(document.getElementById('fabPark')).display, card: getComputedStyle(document.getElementById('fxParkCard')).display }));
  await p.keyboard.press('Control+Period'); await p.waitForTimeout(400);
  const cloud = await p.evaluate(() => !!document.querySelector('.tc-cloud'));
  ok(ibOff.fab === 'none' && ibOff.card === 'none' && !cloud, 'the Inbox off hides the 💭 and its card, and Ctrl and the full stop leave the page alone', JSON.stringify({ ibOff, cloud }));
  await sw('The Inbox', true); await p.waitForTimeout(400);
  ok(await p.evaluate(() => getComputedStyle(document.getElementById('fabPark')).display !== 'none'), 'on again, the 💭 is back');
  await sw('Calm look', true); await p.waitForTimeout(300);
  ok(await p.evaluate(() => sup('calm') === true && document.body.getAttribute('data-calm') === '1'), 'Calm look there is Ingenium\'s own calm look');
  await sw('Calm look', false); await p.waitForTimeout(200);
  await sw('Time you can see', false); await p.waitForTimeout(300);
  ok(await p.evaluate(() => sup('clock') === false && $('clockPill').hidden), 'Time you can see there is the clock in the top bar');
  await sw('Time you can see', true); await sw('Routines', false); await p.waitForTimeout(400);
  ok(await p.evaluate(() => document.getElementById('fxRoutinesHost').hidden), 'Routines off takes its card away');
  await sw('Focus room', false); await p.waitForTimeout(400);
  ok(await p.evaluate(() => !document.querySelector('#fxSteps [data-sc-key="focusroom"]') && !document.querySelector('#fxCalm [data-sc-key="focusroom"]')), 'Focus room off takes its keys away');
  await p.evaluate(() => document.getElementById('fxSupportsHost').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/supports.png' });

  // 7. Settings, Support
  await p.evaluate(() => go('settings')); await p.waitForTimeout(600);
  const set = await p.evaluate(() => { const g = [...document.querySelectorAll('#supRows .sup-group')].find(x => /Days, routines/.test(x.textContent)); return g ? [...g.querySelectorAll('[data-sc-sw]')].map(r => r.getAttribute('data-sc-sw') + ':' + r.querySelector('input').checked) : null; });
  ok(set && set.join(',') === 'tiny:true,energy:true,inbox:true,routines:false,focus:false', 'Settings, Support has the same switches as a fourth group', JSON.stringify(set));
  await p.evaluate(() => { const g = [...document.querySelectorAll('#supRows .sup-group')].find(x => /Days, routines/.test(x.textContent)); g.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/settings-support.png' });
  await p.evaluate(() => { const r = document.querySelector('[data-sc-sw="routines"] input'); r.click(); }); await p.waitForTimeout(300);
  ok(await p.evaluate(() => IngSupport.sc.on('routines') === true), 'and turning one on there turns it on in Focus');

  // 8. kept across a restart
  await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(400);
  const kept = await p.evaluate(() => ({ focus: IngSupport.sc.on('focus'), routines: IngSupport.sc.on('routines'), rd: JSON.stringify(state.supportCore.rDone) }));
  ok(kept.focus === false && kept.routines === true && /"start":true/.test(kept.rd), 'the switches and today\'s routine are kept when the app opens again', JSON.stringify(kept));
  await p.evaluate(() => { IngSupport.sc.set('focus', true); });

  // 9. the tour
  const tour = await p.evaluate(() => ING_TOUR.filter(s => s.r121).map(s => s.t));
  ok(tour.length === 5 && tour[0] === '🌅 Routines', 'the tour\'s Focus chapter has five more cards', tour.join(' | '));

  // 10. night and the phone
  await p.evaluate(() => { state.theme = 'night'; saveState(); applyTheme(); go('focus'); }); await p.waitForTimeout(600);
  await p.evaluate(() => document.getElementById('fxRoutinesHost').scrollIntoView({ block: 'start' })); await p.waitForTimeout(300);
  const nightH = await p.evaluate(() => ({ th: document.body.getAttribute('data-theme'), c: getComputedStyle(document.querySelector('#fxRoutinesHost .sc-h')).color, n: document.querySelector('#fxRoutinesHost .sc-page').getAttribute('data-sc-night') }));
  ok(nightH.n === '1', 'by night the module\'s cards dress for the night', JSON.stringify(nightH));
  await p.screenshot({ path: OUT + '/focus-night.png' });
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(500);
  await p.evaluate(() => document.getElementById('fxRoutinesHost').scrollIntoView({ block: 'start' })); await p.waitForTimeout(300);
  const wide = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, vw: innerWidth }));
  ok(wide.sw <= wide.vw + 1, 'on a phone nothing runs off the side', JSON.stringify(wide));
  await p.screenshot({ path: OUT + '/focus-phone.png' });
  await p.setViewportSize({ width: 1440, height: 900 });
  await p.evaluate(() => { state.theme = 'day'; saveState(); applyTheme(); });

  // 11. Ingenium's own copy of itself
  await p.waitForFunction(() => window.__ingBuiltin && window.__ingBuiltin.states && window.__ingBuiltin.states.ingenium, null, { timeout: 120000 });
  const self = await p.evaluate(() => { const m = libState().apps.ingenium; return libText('ingenium').then(t => ({ st: window.__ingBuiltin.states.ingenium, v: m && m.version, src: m && m.source, run: ING_VERSION, size: m && m.size, det: libDetect(t), ver: libVersionOf('ingenium', t) })); });
  ok((self.st === 'kept' || self.st === 'same') && self.v === self.run && self.src === 'this copy' && self.det === 'ingenium' && self.ver === self.run, 'Ingenium keeps a checked copy of itself, naming the version that is running', JSON.stringify(self));
  const again = await p.evaluate(() => IngBuiltin.self.seed());
  ok(again === 'same', 'opened again, it is not kept twice', again);
  const older = await p.evaluate(() => { const A = libState().apps; A.ingenium = Object.assign({}, A.ingenium, { version: '3.1', sha256: 'dddd', source: 'file' }); return IngBuiltin.self.seed().then(s => ({ s, v: libState().apps.ingenium.version, e: libState().apps.ingenium.earlier && libState().apps.ingenium.earlier.version })); });
  ok(older.s === 'kept' && older.v === self.run && older.e === '3.1', 'an older copy (3.1) is replaced, and stays one step back', JSON.stringify(older));
  const newer = await p.evaluate(() => { const A = libState().apps; A.ingenium = Object.assign({}, A.ingenium, { version: '9.0', sha256: 'eeee', source: 'file' }); return IngBuiltin.self.seed().then(s => ({ s, v: libState().apps.ingenium.version })); });
  ok(newer.s === 'newer' && newer.v === '9.0', 'a newer Ingenium added by hand is never replaced', JSON.stringify(newer));
  await p.evaluate(() => { const A = libState().apps; A.ingenium = Object.assign({}, A.ingenium, { version: '3.0', sha256: 'ffff' }); return IngBuiltin.self.seed(); });
  await p.evaluate(() => go('lector')); await p.waitForTimeout(1200);
  const line = await p.evaluate(() => ({ t: (document.getElementById('libBuiltin') || {}).textContent, tile: (document.querySelector('#l7Bf .l-app[data-k="ingenium"]') || {}).textContent }));
  ok(/Ingenium [\d.]+ keeps a copy of itself beside them, ready for Lector and Fabrica/.test(line.t) && /Not read yet · [\d.]+/.test(line.tile), 'the Your apps card says so, and Lector offers it to read', JSON.stringify(line));
  await p.evaluate(() => document.getElementById('libBuiltin').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/self-copy.png' });
  await p.evaluate(() => go('fabrica')); await p.waitForTimeout(1500);
  await p.evaluate(() => document.getElementById('fbBring').click()); await p.waitForTimeout(400);
  const fab = await p.evaluate(() => { const o = [...document.querySelectorAll('.f-sheet .f-opt')].find(x => /From your app library/.test(x.textContent)); return o ? o.querySelector('small').textContent : ''; });
  ok(/Ingenium/.test(fab) && /Carpe Diem \d{4}/.test(fab), 'Fabrica can bring Ingenium in from the app library, to work on', fab);
  await p.screenshot({ path: OUT + '/self-fabrica.png' });

  // 12. a copy opened as a file cannot read itself, and says so
  const fileCase = await p.evaluate(() => { const A = libState().apps; delete A.ingenium; const of = window.fetch, ox = window.XMLHttpRequest;
    window.fetch = () => Promise.reject(new Error('file')); window.XMLHttpRequest = function () { return { open() {}, send() { setTimeout(() => this.onerror && this.onerror(), 0); } }; };
    return IngBuiltin.self.seed().then(s => { window.fetch = of; window.XMLHttpRequest = ox; return { s, why: IngBuiltin.self.state().why }; }); });
  ok(fileCase.s === 'unread', 'where the page cannot read itself (opened as a file), nothing is kept and the state says why', JSON.stringify(fileCase));
  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('CRASH ' + e.message); process.exit(2); });
