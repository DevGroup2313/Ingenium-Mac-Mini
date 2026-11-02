const { openApp } = require('./bridge.js');
const SIZES = (process.env.SIZES || '1440x900,1280x800,1024x768,962x601,800x1280,601x962,390x844').split(',');
(async () => {
  const S = process.env.S, TAG = process.env.TAG || 'lc', fails = [];
  const { page, browser } = await openApp(Object.assign({ viewport: { width: 1440, height: 900 } }, process.env.FIRE ? { ua: 'Mozilla/5.0 (Linux; Android 11; KFTRWI) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.230 Safari/537.36' } : {}));
  await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 });
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); try { localStorage.removeItem('ingenium_chat_h'); } catch (e) {} });
  for (const style of ['classic', 'claude', 'soft']) for (const side of [true, false]) for (const stage of [false, true]) for (const sz of SIZES) {
    const [w, h] = sz.split('x').map(Number);
    await page.setViewportSize({ width: w, height: h });
    const r = await page.evaluate(async ({ style, side, stage }) => {
      document.body.setAttribute('data-chatstyle', style); state.chatStyle = style;
      go('chat'); const cs = ccState(); cs.side = side; ccPaintSide();
      if (stage) csShow({ kind: 'file', html: '<!doctype html><h1>Demo</h1>', name: 'demo.html' }, { user: true }); else { try { csClose(); } catch (e) { document.body.classList.remove('cs-on'); } }
      window.dispatchEvent(new Event('resize'));
      await new Promise(r => setTimeout(r, 350));
      const B = s => { const e = document.querySelector(s); if (!e || !e.offsetParent && getComputedStyle(e).position !== 'fixed') return null; const b = e.getBoundingClientRect(); return b.width && b.height ? b : null; };
      const vw = innerWidth, vh = innerHeight, comp = B('#page-chat .composer'), card = B('#page-chat .chat-card'), pane = B('#csPane'), sd = B('#ccSide'), send = B('#chatSend');
      const doc = document.documentElement, lane = vw >= 721 ? 76 : 0;
      const issues = [];
      if (doc.scrollWidth > vw + 1) issues.push('hscroll ' + (doc.scrollWidth - vw));
      const flow = document.body.classList.contains('r2-flow');
      if (!flow && doc.scrollHeight > vh + 2) issues.push('page scrolls ' + (doc.scrollHeight - vh));
      if (!flow && comp && comp.bottom > vh + 1) issues.push('composer below window ' + Math.round(comp.bottom - vh));
      if (flow && comp && pane && stage && comp.bottom > pane.top + 2 && pane.left < comp.right && pane.right > comp.left) issues.push('preview over composer');
      if (flow && card && card.height > vh * 0.9) issues.push('chat taller than 90% of window');
      if (send && send.right > vw - lane + 4) issues.push('send under lane ' + Math.round(send.right - (vw - lane)));
      if (pane && stage && pane.right > vw - lane + 4) issues.push('preview under lane ' + Math.round(pane.right - (vw - lane)));
      if (card && card.width < 340 && !(stage && vw <= 700)) issues.push('chat narrow ' + Math.round(card.width));
      if (sd && card && side && sd.bottom > card.bottom + 4 && getComputedStyle(document.querySelector('#ccSide')).position !== 'fixed') issues.push('list longer than chat ' + Math.round(sd.bottom - card.bottom));
      return issues;
    }, { style, side, stage });
    const key = `${style}/${side ? 'side' : 'noside'}/${stage ? 'stage' : 'nostage'}/${sz}`;
    if (r.length) { fails.push(key + ': ' + r.join('; ')); if (process.env.SHOTS) await page.screenshot({ path: `${S}/shots/${TAG}_${key.replace(/\//g, '_')}.png` }); }
  }
  console.log(fails.length + ' failing states'); console.log(fails.join('\n'));
  await browser.close();
})();
