const { openApp } = require('./bridge.js');
(async () => {
  const S = process.env.S, W = +(process.env.VW || 1440), H = +(process.env.VH || 900), TAG = process.env.TAG || 'rs';
  const { page, browser } = await openApp({ viewport: { width: W, height: H } });
  await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 });
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); go('chat'); });
  await page.waitForTimeout(800);
  // open a page in the stage so the split exists
  await page.evaluate(() => csShow({ kind: 'file', html: '<!doctype html><title>Demo</title><h1>Demo app</h1>', name: 'demo.html' }, { user: true }));
  await page.waitForTimeout(800);
  const m = async (label) => { const r = await page.evaluate(() => { const q = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)]; };
    return { card: q('#page-chat .chat-card'), wrap: q('#page-chat .chat-wrap'), composer: q('#page-chat .composer'), pane: q('#csPane'), grip: q('.chat-grip'), doc: [document.documentElement.scrollWidth, document.documentElement.scrollHeight], chath: getComputedStyle(document.documentElement).getPropertyValue('--chat-h') }; }); console.log(label, JSON.stringify(r)); return r; };
  const a = await m('before');
  // drag the foot grip down 500px
  const g = a.grip; await page.mouse.move(g[0] + g[2] / 2, g[1] + g[3] / 2); await page.mouse.down(); await page.mouse.move(g[0] + g[2] / 2, g[1] + g[3] / 2 + 250, { steps: 8 }); await page.mouse.move(g[0] + g[2] / 2, g[1] + g[3] / 2 + 500, { steps: 8 }); await page.mouse.up();
  await page.waitForTimeout(500);
  await m('after grip +500');
  await page.screenshot({ path: `${S}/shots/${TAG}_grip.png`, fullPage: false });
  // drag the split handle to the left by 300px
  const hd = await page.evaluate(() => { const b = document.getElementById('csHandle').getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; });
  await page.mouse.move(hd[0], hd[1]); await page.mouse.down(); await page.mouse.move(hd[0] - 300, hd[1], { steps: 10 }); await page.mouse.up();
  await page.waitForTimeout(500); await m('after split -300');
  const hd2 = await page.evaluate(() => { const b = document.getElementById('csHandle').getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; });
  await page.mouse.move(hd2[0], hd2[1]); await page.mouse.down(); await page.mouse.move(hd2[0] + 500, hd2[1], { steps: 10 }); await page.mouse.up();
  await page.waitForTimeout(500); await m('after split +500');
  await page.screenshot({ path: `${S}/shots/${TAG}_split.png`, fullPage: false });
  await browser.close();
})();
