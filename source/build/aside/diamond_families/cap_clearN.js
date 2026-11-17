// The clear crystal's own night (24 frames, the night theme, family clear: cn and the lights in every colour), as cap_purple.js takes
// the five looks.   node cap_clearN.js <harness url> <raw folder> [frames]
const pw = require('/opt/node-tools/node_modules/playwright'); const path = require('path');
const [U, OUT, NF] = process.argv.slice(2); const N = +(NF || 24);
(async () => {
  const b = await pw.chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })).newPage(); p.setDefaultTimeout(180000);
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(U); await p.waitForTimeout(5000); await p.evaluate(() => { window.__tFix = 3.2; window.__yawFix = 0; });
  await p.addStyleTag({ content: 'html,body{background:transparent!important}#page-build *{visibility:hidden!important}#page-build canvas.bd-cv{visibility:visible!important}' });
  const r = await p.evaluate(() => { const c = document.querySelector('#page-build .skh-obj canvas.bd-cv').getBoundingClientRect(); return { x: c.left, y: c.top, width: c.width, height: c.height }; });
  const shot = async (f) => { await p.evaluate(() => new Promise(res => { IngDiamond.kick(); requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(res, 220))); })); await p.screenshot({ path: f, clip: r, omitBackground: true }); };
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); IngDiamond.variant('lavender'); IngDiamond.tint({ stone: null, band: null }); IngDiamond.family({ s: [null, null, null, { h: [0, 0, 1, 1], g: 1.15 }], cp: true, cn: true, aur: 'spectrum' }); });
  for (let k = 0; k < N; k++) { await p.evaluate(y => { window.__yawFix = y; }, 0.3 + k * (Math.PI / 4) / N); await shot(path.join(OUT, `stone_clearN_${String(k).padStart(2, '0')}.png`)); }
  console.log(JSON.stringify({ r, errs, gl: await p.evaluate(() => window.__diamondErr || '') })); await b.close();
})();
