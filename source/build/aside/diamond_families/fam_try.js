// Tries families in the real renderer: the head by day and by night with a family set, and one stone frame for comparison with the
// sheet's own sums.   node fam_try.js <harness url> <palette.json> <family,family,...> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [U, PAL, FAMS, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const pal = JSON.parse(fs.readFileSync(PAL, 'utf8'));
const SRC = ['#5d4e72', '#402b5f', '#463962', '#231c31'];
const hueOf = h => { const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255); return Math.atan2(0.211 * c[0] - 0.523 * c[1] + 0.312 * c[2], 0.596 * c[0] - 0.274 * c[1] - 0.322 * c[2]); };
function famObj(name) { const t = pal[name]; if (!t) return null;
  const s = t.map((x, i) => x ? { h: [hueOf(SRC[i]), hueOf(x[0]), x[1], x[2]], g: x[3] } : null);
  const ah = t[1] ? hueOf(t[1][0]) : 0; const aur = name === 'Clear' ? [1.90, hueOf('#8cc8ff'), 0.4, 0.45] : (t[1] ? [1.90, ah, 0.4, 1.0] : null);
  return { s, cp: name === 'Clear', aur }; }
(async () => {
  const b = await pw.chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })).newPage(); p.setDefaultTimeout(180000);
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(U); await p.waitForTimeout(5000); await p.evaluate(() => { window.__tFix = 3.2; window.__yawFix = 0.3; });
  const head = await p.$('#page-build .skh');
  const settle = () => p.evaluate(() => new Promise(res => { IngDiamond.kick(); requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(res, 400))); }));
  for (const name of FAMS.split(',')) {
    for (const [th, v] of [['day', 'purple'], ['night', 'purple']]) {
      await p.evaluate(([o, th, v]) => { document.body.setAttribute('data-theme', th); IngDiamond.variant(v); IngDiamond.family(o); }, [famObj(name), th, v]);
      await settle(); await settle();
      await head.screenshot({ path: path.join(OUT, `head_${name}_${th}.png`) });
    }
    console.log('done', name);
  }
  console.log(JSON.stringify({ errs, gl: await p.evaluate(() => window.__diamondErr || ''), fam: await p.evaluate(() => IngDiamond.fam()) }).slice(0, 600));
  await b.close();
})();
