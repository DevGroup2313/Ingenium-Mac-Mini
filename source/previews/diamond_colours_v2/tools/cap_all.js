// frames of the real diamond turning (12 over 45 degrees, its symmetry), for each look and jewel; the real holder for each band
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [U, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const JEW = [['ruby', '#c8143c'], ['rose', '#e8649a'], ['amber', '#e8962a'], ['citrine', '#e7cc3e'], ['emerald', '#1f9d63'], ['aqua', '#2fb7c7'], ['sapphire', '#2f5bd3'], ['amethyst', '#8e4fe0']];
const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
(async () => { const b = await pw.chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })).newPage(); p.setDefaultTimeout(180000);
  await p.goto(U); await p.waitForTimeout(5000); await p.evaluate(() => { window.__tFix = 3.2; window.__yawFix = 0; });
  const r = await p.evaluate(() => { const c = document.querySelector('#page-build .skh-obj canvas.bd-cv').getBoundingClientRect(); return { x: c.left, y: c.top, width: c.width, height: c.height }; });
  const shot = async (f) => { await p.evaluate(() => new Promise(res => { IngDiamond.kick(); requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(res, 220))); })); await p.screenshot({ path: f, clip: r, omitBackground: true }); };
  const N = 24, conf = [['clear', { v: 'clear' }], ['lavender', { v: 'lavender' }], ['purple', { v: 'purple' }], ['night', { v: 'night' }]].concat(JEW.map(j => [j[0], { v: 'clear', stone: rgb(j[1]).concat([0.9]) }]));
  for (const [name, c] of conf) {
    await p.evaluate(c => { IngDiamond.variant(c.v); IngDiamond.tint({ stone: c.stone || null, band: null }); }, c);
    for (let k = 0; k < N; k++) { await p.evaluate(y => { window.__yawFix = y; }, 0.3 + k * (Math.PI / 4) / N); await shot(path.join(OUT, `stone_${name}_${String(k).padStart(2, '0')}.png`)); }
    console.log('stone', name);
  }
  await p.evaluate(() => { window.__yawFix = 0.3; IngDiamond.variant('clear'); });
  for (const [name, hex] of [['violet', null]].concat(JEW)) { await p.evaluate(h => { IngDiamond.tint({ stone: null, band: h ? [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)) : null }); }, hex); await shot(path.join(OUT, `band_${name}.png`)); console.log('band', name); }
  console.log(JSON.stringify(r)); await b.close(); })();
