const { openApp } = require('./bridge.js');
(async () => {
  const S = process.env.S;
  for (const sz of (process.env.SIZES || '800x1280,1280x800,962x601').split(',')) {
    const [w, h] = sz.split('x').map(Number);
    const { page, browser } = await openApp({ viewport: { width: w, height: h } });
    await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 });
    await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); go('build'); });
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${S}/shots/build_${sz}.png` });
    const m = await page.evaluate(() => { const q = s => { const e = document.querySelector(s); if (!e || !e.offsetParent) return null; const b = e.getBoundingClientRect(); return [b.left | 0, b.top | 0, b.width | 0, b.height | 0]; };
      return { section: q('#page-build'), editor: q('#codeEditor'), frame: q('#frameWrap'), preview: q('#previewFrame'), pane: q('#page-build .preview-pane'), doc: document.documentElement.scrollHeight }; });
    console.log(sz, JSON.stringify(m));
    await browser.close();
  }
})();
