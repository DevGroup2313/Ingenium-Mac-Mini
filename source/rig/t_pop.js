const { openApp } = require('./bridge.js');
(async () => {
  const S = process.env.S;
  for (const sz of ['1440x900', '962x601', '800x1280', '390x844']) {
    const [w, h] = sz.split('x').map(Number);
    const { page, browser } = await openApp({ viewport: { width: w, height: h } });
    await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 });
    await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); go('chat'); });
    await page.waitForTimeout(600);
    const closed = await page.evaluate(() => ({ sideVisible: !!document.getElementById('ccSide').offsetParent, card: document.querySelector('#page-chat .chat-card').getBoundingClientRect().width | 0 }));
    await page.evaluate(() => { const b = document.getElementById('ccSideBtn') || [...document.querySelectorAll('#page-chat .chat-top button')][0]; b.click(); });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${S}/shots/pop_${sz}.png` });
    const open = await page.evaluate(() => { const r = document.getElementById('ccSide').getBoundingClientRect(), c = document.querySelector('#page-chat .chat-card').getBoundingClientRect(); return { open: document.body.classList.contains('cc-side-open'), side: [r.left | 0, r.top | 0, r.width | 0, r.height | 0], card: [c.left | 0, c.top | 0, c.width | 0, c.height | 0] }; });
    await page.mouse.click(w - 120, h / 2); await page.waitForTimeout(300);
    const after = await page.evaluate(() => document.body.classList.contains('cc-side-open'));
    console.log(sz, JSON.stringify({ closed, open, closedAfterOutsideTap: !after }));
    await browser.close();
  }
})();
