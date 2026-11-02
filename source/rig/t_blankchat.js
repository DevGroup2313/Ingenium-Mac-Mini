const { start } = require('./lib.js');
(async () => {
  const { page, browser } = await start({ viewport: { width: 1440, height: 900 } });
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  for (const s of ['soft', 'claude', 'classic']) {
    await page.evaluate(s => { ccState().style = s; ccStyle(); go('chat'); }, s); await page.waitForTimeout(300);
    await page.evaluate(() => { const b = document.querySelector('.cc-new'); if (b) b.click(); else newChat(); }); await page.waitForTimeout(600);
    const m = await page.evaluate(() => { const r = s => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return [b.top | 0, b.bottom | 0]; }; return { blank: document.body.classList.contains('cc-blank'), card: r('#chatCol .chat-card'), comp: r('#page-chat .composer'), hello: r('.cc-hello'), page: document.documentElement.scrollHeight + '/' + innerHeight }; });
    console.log(s, JSON.stringify(m));
    await page.screenshot({ path: process.env.S + '/shots/code2/blankchat_' + s + '.png' });
  }
  console.log('errors', errs); await browser.close();
})();
