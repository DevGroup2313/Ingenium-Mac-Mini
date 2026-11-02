const { start } = require('./lib.js');
(async () => {
  const S = process.env.S, VW = +(process.env.VW || 1440), VH = +(process.env.VH || 900), TAG = process.env.TAG || 'smoke';
  const { browser, page, logs } = await start({ viewport: { width: VW, height: VH } });
  const pages = await page.evaluate(() => [...document.querySelectorAll('.nav-btn[data-page]')].map(b => b.getAttribute('data-page')));
  for (const p of pages) { await page.evaluate((p) => { try { go(p); } catch (e) { console.error('go ' + p + ' ' + e.message); } }, p); await page.waitForTimeout(700); if (process.env.SHOTS) await page.screenshot({ path: `${S}/shots/${TAG}_${p}.png` }); }
  const parts = await page.evaluate(() => Object.entries(window.__ingParts).filter(([k, v]) => v !== 'running'));
  console.log('pages', pages.join(','), 'parts not running', JSON.stringify(parts));
  console.log(logs.filter(l => /error|exception|failed/i.test(l)).slice(0, 20).join('\n') || 'no errors');
  await browser.close();
})();
