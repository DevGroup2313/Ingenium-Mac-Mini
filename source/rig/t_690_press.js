// node rig/t_690_press.js <Ingenium page url> <out dir>
// Ingenium 6.90 (12 November 2026). Her words: "There is a bug on the "Help and the guided tour" section of Ingenium's Settings, when I
// press on the card buttons, the reaction is delayed, it took a while for the "New to this" button to look pressed after I clicked on it".
// With a heavy state (invented conversations, about 18 MB), each press is timed from the click to the card being marked chosen, and to the
// next frame; the save still happens, after the frame. The same for Settings' Theme and Motion pills and the Sounds switch.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 600) : '')); } }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.evaluate(() => { state.convs = state.convs || []; for (let i = 0; i < 400; i++) state.convs.push({ id: 'heavy' + i, title: 'Invented ' + i, messages: Array.from({ length: 30 }, (_, j) => ({ role: j % 2 ? 'assistant' : 'user', content: 'x'.repeat(1500) })) }); });
  await p.evaluate(() => go('settings')); await p.waitForTimeout(1500);
  await p.evaluate(() => document.getElementById('ihSetCard').scrollIntoView()); await p.waitForTimeout(400);
  // a click, timed: how long the click's own work holds the page, whether the key is marked when it returns, and whether the save follows
  const time = (sel, attr) => p.evaluate(([sel, attr]) => new Promise(res => {
    const k = document.querySelector(sel); let saves = 0; const os = window.saveState; window.saveState = function () { saves++; return os.apply(this, arguments); };
    const t0 = performance.now(); k.click(); const held = performance.now() - t0; const marked = k.getAttribute(attr) === 'true';
    requestAnimationFrame(() => { const frame = performance.now() - t0; setTimeout(() => setTimeout(() => { window.saveState = os; res({ held: +held.toFixed(1), frame: +frame.toFixed(1), marked, saves, kb: Math.round(JSON.stringify(state).length / 1024) }); }, 30), 0); });
  }), [sel, attr]);
  for (const lv of ['new', 'expert', 'some']) {
    const r = await time('#ihSetCard .ih-lvk[data-lv="' + lv + '"]', 'aria-checked');
    const lvNow = await p.evaluate(() => state.v61.tour.level);
    ok(r.marked && r.held < 30 && r.saves >= 1 && lvNow === lv, 'Help, ' + lv + ': the card is marked chosen as the click returns (' + r.held + ' ms held, ' + r.kb + ' KB of state), and the level is saved after', r);
    await p.waitForTimeout(300);
  }
  const theme = await p.evaluate(() => { const g = [...document.querySelectorAll('#page-settings .st-pills')][0]; return g ? [...g.children].map(b => b.getAttribute('data-v')) : []; });
  const other = theme.length ? await p.evaluate(() => { const s = document.getElementById('setTheme'); return [...s.options].map(o => o.value).find(v => v !== s.value); }) : null;
  if (other) { const r = await time('#page-settings .st-pills [data-v="' + other + '"]', 'aria-checked'); const v = await p.evaluate(() => document.getElementById('setTheme').value);
    ok(r.marked && r.held < 30 && v === other, 'Theme: the pill is marked as the click returns (' + r.held + ' ms held), and the theme follows', { r, v, other }); }
  else ok(false, 'Theme pills found', theme);
  await p.waitForTimeout(500);
  const sw = await p.evaluate(() => !!document.getElementById('setSndSw'));
  if (sw) { const before = await p.evaluate(() => document.getElementById('setSndSw').getAttribute('aria-checked'));
    const r = await p.evaluate(() => new Promise(res => { const k = document.getElementById('setSndSw'), was = k.getAttribute('aria-checked'); const t0 = performance.now(); k.click(); const held = performance.now() - t0; const now = k.getAttribute('aria-checked');
      setTimeout(() => res({ held: +held.toFixed(1), flipped: now !== was, after: k.getAttribute('aria-checked') }), 150); }));
    ok(r.flipped && r.held < 30 && r.after !== before, 'Sounds: the switch moves as the click returns, and stays moved', r);
    await p.evaluate(() => document.getElementById('setSndSw').click()); await p.waitForTimeout(200); }
  else ok(false, 'the Sounds switch is there');
  // kept over a reload
  await p.evaluate(() => document.querySelector('#ihSetCard .ih-lvk[data-lv="expert"]').click()); await p.waitForTimeout(400);
  const kept = await p.evaluate(() => { try { return JSON.stringify(state.v61.tour.level); } catch (e) { return ''; } });
  ok(kept === '"expert"', 'the level chosen is kept in the state', kept);
  ok(errs.length === 0, 'no errors on the page', errs);
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
