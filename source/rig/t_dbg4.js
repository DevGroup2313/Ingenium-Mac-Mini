const { start } = require('./lib.js');
(async () => {
  const { page, browser } = await start({ viewport: { width: 1024, height: 700 } });
  await page.evaluate(() => { go('code'); }); await page.waitForTimeout(600);
  await page.evaluate(() => ccMakeProject('Inkwell', [{ name: 'inkwell.html', text: '<!doctype html><h1>Hi</h1>' }], 'inkwell.html').then(ccNewSession));
  await page.waitForTimeout(2500);
  const m = () => page.evaluate(() => { const top = document.querySelector('#page-chat .chat-top'), t = document.getElementById('ccTitle'), card = document.querySelector('#chatCol .chat-card');
    return JSON.stringify({ cls: top.className, top: [top.getBoundingClientRect().left|0, top.getBoundingClientRect().width|0, top.scrollWidth, top.clientWidth, getComputedStyle(top).overflow, getComputedStyle(top).display], card: [card.getBoundingClientRect().left|0, card.getBoundingClientRect().width|0], title: t && [t.clientWidth, t.scrollWidth, t.textContent], kids: [...top.children].filter(k => k.offsetParent).map(k => [k.id || k.className.slice(0, 12), k.getBoundingClientRect().left|0, k.getBoundingClientRect().width|0, getComputedStyle(k).flex]) }); });
  console.log('A', await m());
  await page.evaluate(() => IngR106.squeeze()); console.log('B', await m());
  await browser.close();
})();
