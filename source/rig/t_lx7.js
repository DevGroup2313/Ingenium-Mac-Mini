// the new Lector page at her screens' sizes, by day and by night: no page scroll, the panels where they belong
const { start } = require('./lib.js');
(async () => {
  const S = process.env.S, W = +(process.env.W || 1440), H = +(process.env.H || 900), TAG = process.env.TAG || 'lx7';
  const { browser, page, logs } = await start(Object.assign({ viewport: { width: W, height: H } }, process.env.UA ? { ua: process.env.UA, dpr: 1.5 } : {}));
  if (process.env.NIGHT) await page.evaluate(() => { state.theme = 'night'; applyTheme(); });
  await page.evaluate(() => go('lector')); await page.waitForTimeout(1600);
  if (process.env.PANEL) await page.evaluate((p) => IngLector.setPanel(p), process.env.PANEL);
  await page.waitForTimeout(600);
  const m = await page.evaluate(() => { const r = document.getElementById('lx7'), se = document.scrollingElement;
    const box = e => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)]; };
    return { pageScroll: se.scrollHeight - innerHeight, docW: se.scrollWidth - innerWidth, one: r.classList.contains('l-one'), phone: r.classList.contains('l-phone'), frame: box(r),
      brief: box(document.getElementById('l7Brief')), read: box(document.getElementById('l7Read')), doc: box(document.getElementById('l7Doc')),
      shown: ['l7Brief', 'l7Read', 'l7Doc'].filter(id => { const e = document.getElementById(id); return e && getComputedStyle(e).display !== 'none'; }) }; });
  console.log(TAG, JSON.stringify(m));
  await page.screenshot({ path: S + '/shots/' + TAG + '.png' });
  console.log(logs.filter(l => /error/i.test(l)).slice(0, 8).join('\n'));
  await browser.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
