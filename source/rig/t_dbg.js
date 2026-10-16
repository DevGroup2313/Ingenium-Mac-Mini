const { openApp } = require('./bridge.js');
(async () => {
  const { page, browser } = await openApp({ viewport: { width: 1440, height: 900 } });
  await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 });
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  const r = await page.evaluate(async () => {
    document.body.setAttribute('data-chatstyle', 'classic'); state.chatStyle = 'classic';
    go('chat'); ccState().side = true; ccPaintSide(); try { csClose(); } catch (e) { document.body.classList.remove('cs-on'); }
    window.dispatchEvent(new Event('resize')); await new Promise(r => setTimeout(r, 400));
    const vh = innerHeight, out = []; document.querySelectorAll('#page-chat *, #page-chat').forEach(e => { if (!e.offsetParent) return; const b = e.getBoundingClientRect(); if (b.bottom > vh + 2 && b.height > 0) out.push([e.tagName + (e.id ? '#' + e.id : '') + '.' + String(e.className).slice(0, 30), Math.round(b.top), Math.round(b.bottom)]); });
    const cs = getComputedStyle(document.documentElement);
    return { sh: document.documentElement.scrollHeight, out: out.slice(0, 10), r2h: cs.getPropertyValue('--r2-h'), cardh: cs.getPropertyValue('--r2-cardh'), side: getComputedStyle(document.getElementById('ccSide')).maxHeight, cls: document.body.className, csClose: typeof csClose };
  });
  console.log(JSON.stringify(r, null, 1));
  await browser.close();
})();
