// Frames of Ingenium's own purple stone in its five looks (the clear crystal, lavender, purple, the night stone by day, and the night
// stone of the night theme), from the real renderer (r292 with the family patch and the capture hook), on a transparent ground.
//   node cap_purple.js <harness url> <out folder> [frames]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [U, OUT, NF] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true }); const N = +(NF || 24);
(async () => {
  const b = await pw.chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })).newPage(); p.setDefaultTimeout(180000);
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(U); await p.waitForTimeout(5000); await p.evaluate(() => { window.__tFix = 3.2; window.__yawFix = 0; });
  // only the stone's own canvas shows (the background's canvas, if any, is hidden)
  await p.addStyleTag({ content: 'html,body{background:transparent!important}#page-build *{visibility:hidden!important}#page-build canvas.bd-cv{visibility:visible!important}' });
  const r = await p.evaluate(() => { const c = document.querySelector('#page-build .skh-obj canvas.bd-cv').getBoundingClientRect(); return { x: c.left, y: c.top, width: c.width, height: c.height }; });
  const shot = async (f) => { await p.evaluate(() => new Promise(res => { IngDiamond.kick(); requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(res, 220))); })); await p.screenshot({ path: f, clip: r, omitBackground: true }); };
  const conf = [['clear', 'clear', 'day'], ['lavender', 'lavender', 'day'], ['purple', 'purple', 'day'], ['night', 'night', 'day'], ['nightT', 'purple', 'night']];
  for (const [name, v, th] of conf) {
    await p.evaluate(([v, th]) => { document.body.setAttribute('data-theme', th); IngDiamond.family(null); IngDiamond.variant(v); IngDiamond.tint({ stone: null, band: null }); }, [v, th]);
    for (let k = 0; k < N; k++) { await p.evaluate(y => { window.__yawFix = y; }, 0.3 + k * (Math.PI / 4) / N); await shot(path.join(OUT, `stone_${name}_${String(k).padStart(2, '0')}.png`)); }
    console.log('stone', name);
  }
  // the holder with each band (as tools/cap_all.js took them)
  const JEW = [['ruby', '#c8143c'], ['rose', '#e8649a'], ['amber', '#e8962a'], ['citrine', '#e7cc3e'], ['emerald', '#1f9d63'], ['aqua', '#2fb7c7'], ['sapphire', '#2f5bd3'], ['amethyst', '#8e4fe0']];
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'day'); window.__yawFix = 0.3; IngDiamond.family(null); IngDiamond.variant('clear'); });
  for (const [name, hex] of [['violet', null]].concat(JEW)) { await p.evaluate(h => { IngDiamond.tint({ stone: null, band: h ? [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)) : null }); }, hex); await shot(path.join(OUT, `band_${name}.png`)); console.log('band', name); }
  console.log(JSON.stringify({ r, errs, fam: await p.evaluate(() => typeof IngDiamond.family) })); await b.close();
})();
