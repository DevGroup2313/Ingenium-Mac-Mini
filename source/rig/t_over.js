const { openApp } = require('./bridge.js');
(async () => {
  const { page, browser } = await openApp({ viewport: { width: 1440, height: 900 } });
  await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 });
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  for (const [sz, side] of [['962x601', false], ['1280x800', false], ['1440x900', true]]) {
    const [w, h] = sz.split('x').map(Number); await page.setViewportSize({ width: w, height: h });
    const r = await page.evaluate(async (side) => { go('chat'); ccState().side = side; ccPaintSide(); window.dispatchEvent(new Event('resize')); await new Promise(r => setTimeout(r, 400));
      const vh = innerHeight, out = []; document.querySelectorAll('body *').forEach(e => { if (!e.offsetParent) return; const cs = getComputedStyle(e); if (cs.position === 'fixed') return; const b = e.getBoundingClientRect(); if (b.bottom > vh + 2 && b.height > 0 && b.top < vh + 400) out.push([e.tagName + (e.id ? '#' + e.id : '') + '.' + String(e.className).slice(0, 40), Math.round(b.top), Math.round(b.bottom)]); });
      return { sh: document.documentElement.scrollHeight, vh, out: out.slice(0, 12), r2h: getComputedStyle(document.documentElement).getPropertyValue('--r2-h') }; }, side);
    console.log(sz, side, JSON.stringify(r));
  }
  await browser.close();
})();
