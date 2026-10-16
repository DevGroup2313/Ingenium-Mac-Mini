// collect the page's own CSS for the seal drawing (stop colours, night colours, spin/beat/counter motion)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const info = await (await fetch('http://127.0.0.1:18999/')).json();
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${info.port}/ingenium.html?b=css`);
  await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 });
  const css = await page.evaluate(() => {
    const out = [];
    const want = /seal3d|seal-spin|seal-heart|seal-counter|s4-/;
    const kf = /^(sealEngine|sealBeat|sealCounter|s4Breath)$/;
    function walk(rules, wrap) {
      for (const r of rules) {
        if (r.type === 1 && want.test(r.selectorText) && !/\.isl|intro-seal|\.brand|tabula|\.dock-|isl-/.test(r.selectorText)) out.push(wrap ? wrap + '{' + r.cssText + '}' : r.cssText);
        else if (r.type === 7 && kf.test(r.name)) out.push(r.cssText);
        else if (r.type === 4) walk(r.cssRules, '@media ' + r.conditionText);
      }
    }
    for (const s of document.styleSheets) { try { walk(s.cssRules, ''); } catch (e) {} }
    return out.join('\n');
  });
  const svg = await page.evaluate(() => null);
  require('fs').writeFileSync(process.argv[2], css);
  console.log(css.length, css.split('\n').length);
  await browser.close();
})();
