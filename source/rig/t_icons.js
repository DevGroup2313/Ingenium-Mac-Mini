const fs = require('fs');
const { start } = require('./lib.js');
(async () => {
  const { page, browser } = await start();
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.waitForTimeout(1500);
  const r = await page.evaluate(() => {
    const ic = () => { const l = document.querySelector('link[rel="icon"]'); return l ? l.href.length : 0; };
    const out = { favLen: ic(), shown: window._ingIconShown };
    state.theme = 'night'; applyTheme(); try { ingSyncIcons(); } catch (e) {}
    out.nightShown = window._ingIconShown; out.nightLink = document.querySelector('link[rel="icon"]').href;
    state.theme = 'light'; applyTheme(); try { ingSyncIcons(); } catch (e) {}
    out.dayLink = document.querySelector('link[rel="icon"]').href;
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 512; drawIngeniumSeal(cv); out.ship = cv.toDataURL('image/png');
    return out; });
  for (const k of ['nightLink', 'dayLink', 'ship']) fs.writeFileSync(process.env.S + '/icon/new/chk_' + k + '.png', Buffer.from(r[k].split(',')[1], 'base64'));
  console.log(JSON.stringify({ favLen: r.favLen, shown: r.shown, nightShown: r.nightShown, errs }));
  await browser.close();
})();
