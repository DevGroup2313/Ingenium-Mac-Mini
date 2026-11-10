// close look at the Movement at 2x: day and night, the sway at its two ends and facing
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [SRC, OUT] = process.argv.slice(2);
const wrapped = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}[hidden]{display:none!important}</style></head><body>' + fs.readFileSync(SRC, 'utf8') + '</body></html>';
const tmp = OUT + '_page.html'; fs.writeFileSync(tmp, wrapped);
(async () => {
  const b = await pw.chromium.launch();
  for (const scheme of ['light', 'dark']) {
    const p = await (await b.newContext({ viewport: { width: 1500, height: 1010 }, deviceScaleFactor: 2, colorScheme: scheme })).newPage();
    await p.goto('file://' + tmp, { waitUntil: 'domcontentloaded', timeout: 60000 }); await p.waitForTimeout(1800);
    for (const [nm, tf] of [['face', 'none'], ['left', 'rotateY(-9deg) rotateX(3.5deg)'], ['right', 'rotateY(9deg) rotateX(-3.5deg)']]) {
      await p.evaluate(t => { const s = document.querySelector('.mv-sway'); if (s) { s.style.animation = 'none'; s.style.transform = t; } }, tf);
      await p.waitForTimeout(250);
      const r0 = await (await p.$('#cx .mv-cw')).boundingBox(); const r = { x: r0.x + r0.width / 2 - 160, y: r0.y + r0.height / 2 - 120 };
      await p.screenshot({ path: OUT + '_' + scheme + '_' + nm + '.png', clip: { x: r.x, y: r.y, width: 320, height: 240 } });
    }
    await p.close();
  }
  await b.close(); console.log('done');
})();
