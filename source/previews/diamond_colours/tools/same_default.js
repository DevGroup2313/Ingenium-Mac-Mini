// The diamond and its holder with nothing chosen: the same picture before and after (time held at one instant, Math.random seeded)
const pw = require('/opt/node-tools/node_modules/playwright'); const path = require('path');
const [U, OUT, THEME] = process.argv.slice(2);
(async () => { const b = await pw.chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { let s = 123456789; Math.random = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; });
  const p = await ctx.newPage(); p.setDefaultTimeout(180000);
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1200);
  await p.evaluate(th => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.theme = th; state.motion = 'minimal'; applyTheme(); window.__tFix = 3.2; window.__pFix = [0.4, 0.2, -99, 1]; go('build'); if (window.IngDiamond) IngDiamond.variant('lavender'); }, THEME);
  await p.waitForTimeout(6000);
  await p.evaluate(() => { const h = document.querySelector('#page-build > .skh'); h.scrollIntoView({ block: 'start' }); window.scrollBy(0, -70); }); await p.waitForTimeout(2500);
  const r = await p.evaluate(() => { const c = document.querySelector('#page-build .skh-obj canvas').getBoundingClientRect(); return { x: c.left, y: c.top, width: c.width, height: c.height }; });
  await p.screenshot({ path: OUT, clip: r }); console.log('saved', OUT, JSON.stringify(r)); await b.close(); })();
