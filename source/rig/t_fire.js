const { openApp } = require('./bridge.js');
const UA = 'Mozilla/5.0 (Linux; Android 11; KFTRWI) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.230 Safari/537.36';
(async () => {
  const S = process.env.S;
  for (const sz of (process.env.SIZES || '1280x800,800x1280,962x601,601x962').split(',')) {
    const [w, h] = sz.split('x').map(Number);
    const { page, browser } = await openApp({ viewport: { width: w, height: h }, ua: UA });
    await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 });
    await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); go('chat');
      csShow({ kind: 'file', html: '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;font-family:system-ui;display:grid;place-items:center;min-height:100vh;background:linear-gradient(135deg,#6a3fb5,#b88a3a);color:#fff}.c{background:rgba(255,255,255,.15);padding:24px 30px;border-radius:16px;text-align:center}</style></head><body><div class="c"><h1>Pomodoro</h1><p>25:00</p><button>Start</button></div></body></html>', name: 'pomodoro.html' }, { user: true }); });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${S}/shots/fire2_${sz}.png` });
    const m = await page.evaluate(() => { const q = s => { const e = document.querySelector(s); if (!e || !e.offsetParent && getComputedStyle(e).position !== 'fixed') return null; const b = e.getBoundingClientRect(); return [b.left | 0, b.top | 0, b.width | 0, b.height | 0]; };
      return { flow: document.body.classList.contains('r2-flow'), up: document.body.classList.contains('r2-up'), card: q('#page-chat .chat-card'), pane: q('#csPane'), frame: q('#csFrame'), composer: q('#page-chat .composer'), send: q('#chatSend'), doc: [document.documentElement.scrollWidth, document.documentElement.scrollHeight] }; });
    console.log(sz, JSON.stringify(m));
    await browser.close();
  }
})();
