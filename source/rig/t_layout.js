const { openApp } = require('./bridge.js');
(async () => {
  const S = process.env.S;
  const sizes = (process.env.SIZES || '800x1280,1280x800,601x962,962x601').split(',');
  for (const sz of sizes) {
    const [w, h] = sz.split('x').map(Number);
    const r = await openApp({ viewport: { width: w, height: h } });
    const { page, browser } = r;
    await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 });
    await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
    await page.evaluate(() => { go('chat'); const cs = ccState(); cs.side = true; for (let i = 0; i < 6; i++) { state.chats.push({ id: 'cT' + i, title: 'Conversation number ' + i + ' about my thesis chapter', messages: [{ role: 'me', text: 'hello ' + i, at: Date.now() - i * 864e5 }, { role: 'bot', text: 'Hi there, this is a reply.', at: Date.now() - i * 864e5, done: Date.now() - i * 864e5 }] }); } saveState(); ccPaintSide(); renderChat(); if (ccSideOver()) document.body.classList.add('cc-side-open'); });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${S}/shots/fire_${sz}.png` });
    const m = await page.evaluate(() => { const q = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)]; };
      return { side: q('#ccSide'), col: q('#chatCol'), card: q('.chat-card'), composer: q('#page-chat .composer'), scroll: q('#chatScroll'), body: [document.documentElement.scrollWidth, document.documentElement.scrollHeight], over: ccSideOver(), cls: document.body.className }; });
    console.log(sz, JSON.stringify(m));
    await browser.close();
  }
})();
