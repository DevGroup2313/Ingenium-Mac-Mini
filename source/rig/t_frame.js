const { openApp } = require('./bridge.js');
(async () => {
  const { page, browser } = await openApp({ viewport: { width: +(process.env.VW||1440), height: +(process.env.VH||900) } });
  await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 });
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); go('chat'); csShow({ kind: 'file', html: '<!doctype html><h1>Demo</h1>', name: 'demo.html' }, { user: true }); });
  await page.waitForTimeout(1000);
  const r = await page.evaluate(() => { const o = {}; const q = (s, props) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(), cs = getComputedStyle(e); const x = { box: [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)] }; (props || []).forEach(p => x[p] = cs[p]); return x; };
    o.shell = q('.shell', ['paddingRight', 'paddingLeft', 'maxWidth']); o.main = q('.main', ['paddingRight', 'paddingBottom']); o.page = q('#page-chat', ['marginRight', 'paddingRight', 'width']); o.col = q('#chatCol', ['marginRight', 'width']); o.pane = q('#csPane', ['position', 'right']);
    o.rail = [...document.querySelectorAll('.gem-go, .gem, [class*="gem-"]')].slice(0, 3).map(e => { const b = e.getBoundingClientRect(); return [e.className.slice(0, 30), Math.round(b.left), Math.round(b.width)]; });
    o.foot = q('.foot'); o.body = document.body.className + ' | ' + ['data-chatwide', 'data-chatstyle', 'data-chatmode', 'data-csview'].map(a => a + '=' + document.body.getAttribute(a)).join(' ');
    return o; });
  console.log(JSON.stringify(r, null, 1));
  await browser.close();
})();
