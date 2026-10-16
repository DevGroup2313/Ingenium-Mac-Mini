const { start } = require('./lib.js');
(async () => {
  const { page, browser } = await start({ viewport: { width: 1440, height: 900 } });
  await page.evaluate(() => go('chat')); await page.waitForTimeout(400);
  for (const s of ['claude', 'soft', 'classic']) {
    await page.evaluate(s => { ccState().style = s; ccStyle(); renderChat(); }, s); await page.waitForTimeout(200);
    console.log(s, await page.evaluate(() => { const c = getComputedStyle(document.querySelector('#page-chat .composer')), sc = getComputedStyle(document.getElementById('chatScroll')), card = getComputedStyle(document.querySelector('#page-chat .chat-card'));
      return JSON.stringify({ blank: document.body.classList.contains('cc-blank'), compM: c.margin, scFlex: sc.flex, scDisp: sc.display + ' ' + sc.flexDirection, scMt: sc.marginTop, cardDisp: card.display + ' ' + card.flexDirection, wrapDisp: getComputedStyle(document.querySelector('#page-chat .chat-wrap')).display, parent: document.getElementById('chatScroll').parentElement.className, compParent: document.querySelector('#page-chat .composer').parentElement.className }); }));
  }
  await browser.close();
})();
