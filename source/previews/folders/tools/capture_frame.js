// the app's frame around a page, as it is drawn with that page open: the top bar, the side list (with the page marked), the side
// buttons and the page's backdrop, by day and by night, for a live preview of that page
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, PAGE] = process.argv.slice(2);
(async () => {
  const b = await pw.chromium.launch(); fs.mkdirSync(OUT, { recursive: true }); const info = {};
  for (const th of ['day', 'night']) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }); const p = await ctx.newPage();
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(300);
    await p.evaluate(([th, pg]) => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = th; applyTheme(); go(pg); }, [th, PAGE]); await p.waitForTimeout(2500);
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(600);
    const g = await p.evaluate((pg) => { const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return { x: b.left, y: b.top, w: b.width, h: b.height }; };
      const page = document.getElementById('page-' + pg); const title = page && page.querySelector('.page-title');
      return { page: r(page), title: r(title), bar: r(document.querySelector('#topbar, .topbar')) }; }, PAGE);
    info[th] = g;
    const T = Math.round(g.bar.h), L = 221, RX = 1364;
    await p.screenshot({ path: path.join(OUT, 'top_' + th + '.png'), clip: { x: 0, y: 0, width: 1440, height: T } });
    await p.screenshot({ path: path.join(OUT, 'rail_' + th + '.png'), clip: { x: 0, y: T, width: L, height: 900 - T } });
    await p.screenshot({ path: path.join(OUT, 'right_' + th + '.png'), clip: { x: RX, y: T, width: 1440 - RX, height: 900 - T } });
    await p.addStyleTag({ content: 'body > *{visibility:hidden !important}' }); await p.waitForTimeout(200);
    await p.screenshot({ path: path.join(OUT, 'back_' + th + '.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });
    g.T = T; g.L = L; g.RX = RX; console.log(th, JSON.stringify(g));
    await ctx.close();
  }
  fs.writeFileSync(path.join(OUT, 'geometry.json'), JSON.stringify(info, null, 1)); await b.close();
})();
