// node rig/t_650_levels.js <Ingenium page url> <out dir>
// Ingenium 6.50 (7 November 2026), in Chromium. Her words: "The "New to this", "Some experience", and "Expert" cards are all
// different sizes and length and they look really weird on the "Help and the guided tour" section of the Settings page, please
// fix this." (modules/r166.js for Settings and the tour's first card; modules/r243.js for the Guide's Start here)
//   - on Settings, in the Guide's Start here and on the tour's first card, the three level cards have one width and one height,
//     at 1440, 900 and 390 pixels wide, by day and by night;
//   - narrower, after her second word ("The cards are still too wide"): 260 pixels at most on Settings, 270 in the Guide;
//   - their words sit at the left; a press still chooses a level, and the arrow keys still move between them;
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 700) : '')); } }
const PLACES = { settings: '#ihSetCard .ih-lvk', guide: '#guideTour .ih-lvk', tour: '#ingTour .ih-lvk' };
function alike(list) { if (!list || list.length !== 3) return false; const w = list.map(x => x.w), h = list.map(x => x.h);
  return Math.max(...w) - Math.min(...w) <= 0.5 && Math.max(...h) - Math.min(...h) <= 0.5; }
(async () => {
  const b = await pw.chromium.launch(); const errs = [];
  for (const W of [1440, 900, 390]) {
    for (const theme of ['day', 'night']) {
      if (W !== 1440 && theme === 'night') continue;
      const ctx = await b.newContext({ viewport: { width: W, height: 900 } }); const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
      await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
      await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(700);
      if (theme === 'night') { await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(300); }
      const read = (sel) => p.evaluate((sel) => [...document.querySelectorAll(sel)].filter(k => k.offsetParent).map(k => { const r = k.getBoundingClientRect(), c = getComputedStyle(k);
        const card = k.closest('.card, #guideTour, #ingTour'); const cr = card ? card.getBoundingClientRect() : r;
        return { lv: k.getAttribute('data-lv'), w: +r.width.toFixed(1), h: +r.height.toFixed(1), left: Math.round(r.left), justify: c.justifyContent, cardW: Math.round(cr.width) }; }), sel);
      await p.evaluate(() => go('settings')); await p.waitForTimeout(1200); const set = await read(PLACES.settings);
      await p.evaluate(() => go('guide')); await p.waitForTimeout(1200); const gd = await read(PLACES.guide);
      await p.evaluate(() => tourStart(0)); await p.waitForTimeout(900); const tp = await read(PLACES.tour);
      const tag = W + ' ' + theme;
      ok(alike(set), tag + ': Settings: New to this, Some experience and Expert are one width and one height', set);
      ok(alike(gd), tag + ': the Guide\'s Start here: one width and one height', gd);
      ok(alike(tp), tag + ': the tour\'s first card: one width and one height', tp);
      if (W === 1440 && theme === 'day') {
        ok(set.length === 3 && set[0].w <= 260.5 && gd.length === 3 && gd[0].w <= 270.5, 'narrower: 260 pixels at most on Settings and 270 in the Guide', { settings: set.map(x => x.w), guide: gd.map(x => x.w) });
        ok(set.concat(tp).every(x => /flex-start|start|left/.test(x.justify)) && new Set(set.map(x => x.left)).size === 1, 'their words sit at the left, the three cards in one column', set.concat(tp).map(x => x.justify + ' ' + x.left));
        await p.keyboard.press('Escape'); await p.waitForTimeout(400); await p.evaluate(() => { try { if (typeof tourEnd === 'function') tourEnd(); } catch (e) {} });
        await p.evaluate(() => go('settings')); await p.waitForTimeout(900);
        await p.click('#ihSetCard .ih-lvk[data-lv="expert"]'); await p.waitForTimeout(400);
        const chosen = await p.evaluate(() => ({ level: IngHelp.level(), checked: document.querySelector('#ihSetCard .ih-lvk[data-lv="expert"]').getAttribute('aria-checked') }));
        ok(chosen.level === 'expert' && chosen.checked === 'true', 'a press on a card still chooses that level', chosen);
        await p.focus('#ihSetCard .ih-lvk[data-lv="expert"]'); await p.keyboard.press('ArrowUp'); await p.waitForTimeout(300);
        const moved = await p.evaluate(() => (document.activeElement && document.activeElement.getAttribute('data-lv')) || '');
        ok(moved === 'some', 'the arrow keys still move between the three', moved);
        const after = await read(PLACES.settings); ok(alike(after), 'with a level chosen, the three stay one size', after);
        const card = await p.$('#ihSetCard'); if (card) await card.screenshot({ path: OUT + '/650_settings.png' });
      }
      await ctx.close(); }
  }
  ok(errs.length === 0, 'no errors on the page', errs.slice(0, 5));
  await b.close(); console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('stopped: ' + (e && e.stack || e)); process.exit(2); });
