const { start } = require('./lib.js');
(async () => {
  const { page, browser } = await start({ viewport: { width: 1440, height: 900 } });
  await page.evaluate(() => { go('chat'); });
  await page.waitForTimeout(400);
  console.log(await page.evaluate(() => { const c = curChat(); return JSON.stringify({ id: c && c.id, n: c && c.messages.length, sample: c && c.messages.slice(0, 2).map(m => Object.keys(m).join(',') + ' role=' + m.role), html: (document.getElementById('chatScroll') || {}).innerHTML.slice(0, 600) }); }));
  await page.evaluate(() => { const c = curChat(); c.messages.push({ role: 'user', text: 'hello there' }); c.messages.push({ role: 'bot', text: 'hi' }); renderChat(); });
  await page.waitForTimeout(400);
  console.log(await page.evaluate(() => [...document.querySelectorAll('#chatScroll > *')].slice(-3).map(e => e.className).join(' | ')));
  await browser.close();
})();
