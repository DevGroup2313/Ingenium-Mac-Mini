const { start } = require('./lib.js');
(async () => {
  const { page, browser } = await start({ viewport: { width: 1440, height: 900 } });
  await page.evaluate(() => go('lector')); await page.waitForTimeout(1200);
  const h = await page.evaluate(() => [document.documentElement.scrollHeight, innerHeight, document.getElementById('lxHost').innerText.slice(0, 3000)]);
  console.log(h[0], h[1]); console.log(h[2]);
  await page.screenshot({ path: process.env.S + '/shots/lector_now.png', fullPage: true });
  await browser.close();
})();
