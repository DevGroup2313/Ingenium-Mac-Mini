const { start } = require('./lib.js');
(async () => {
  const { page, browser } = await start({ viewport: { width: 1024, height: 700 } });
  await page.evaluate(() => { window.__log = []; const top = document.querySelector('#page-chat .chat-top'); window.__log.push('top exists ' + !!top);
    new ResizeObserver(() => window.__log.push('ro ' + (performance.now() | 0) + ' w=' + top.clientWidth + ' cls=' + top.className)).observe(top);
    const o = IngR106.squeeze; });
  await page.evaluate(() => { go('code'); }); await page.waitForTimeout(600);
  await page.evaluate(() => ccMakeProject('Inkwell', [{ name: 'inkwell.html', text: '<!doctype html><h1>Hi</h1>' }], 'inkwell.html').then(ccNewSession));
  for (let i = 0; i < 6; i++) { await page.waitForTimeout(400); console.log(i, await page.evaluate(() => { const top = document.querySelector('#page-chat .chat-top'); return 'lbl=' + !!document.querySelector('#ccCodeBar .r6-l') + ' ' + top.className + ' w=' + top.clientWidth + ' sw=' + top.scrollWidth + ' bar=' + (document.getElementById('ccCodeBar') || {}).childElementCount; })); }
  console.log(await page.evaluate(() => window.__log.join('\n') + '\n--\n' + (window.__r6log || []).join('\n')));
  await browser.close();
})();
