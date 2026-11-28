// node make_icons.js <logo key> <out folder>
// Phaistos's app icons, drawn from its own layered logo (logos3.json, phl.js): the logo leaning a little so its depth shows, standing on
// a soft lemon tile with a fine gold edge, at 1024 points; make_phaistos.py makes the smaller sizes from it. Nothing is fetched.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [KEY, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const L = JSON.parse(fs.readFileSync(path.join(__dirname, 'logos3.json'), 'utf8'))[KEY || 'tripod'];
const PHL = fs.readFileSync(path.join(__dirname, 'phl.js'), 'utf8');
const page = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:transparent}
#t{position:relative;width:1024px;height:1024px;border-radius:228px;overflow:hidden;
 background:radial-gradient(120% 90% at 30% 18%,#fffef8 0%,#fff8d6 42%,#f8e9a6 100%);box-shadow:inset 0 0 0 6px rgba(201,166,72,.55),inset 0 10px 18px rgba(255,255,255,.8),inset 0 -18px 30px rgba(170,130,30,.16)}
#t .phl{position:absolute;left:112px;top:104px;width:800px;height:800px}
.phl .phl-idle{animation:none !important;transform:rotateY(-14deg) rotateX(5deg)}
.phl *{animation-play-state:paused !important}
${L.css}</style></head><body><div id="t"></div><script>${PHL}<\/script><script>PHL.style();var e=PHL.make(${JSON.stringify(L)},{size:800,host:false});document.getElementById("t").appendChild(e);window.__ok=1;<\/script></body></html>`;
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.setContent(page); await p.waitForFunction(() => window.__ok === 1); await p.waitForTimeout(600);
  await p.locator('#t').screenshot({ path: path.join(OUT, 'icon_1024.png'), omitBackground: true });
  console.log('icon_1024.png', errs.length ? errs : 'no errors'); await b.close();
})();
