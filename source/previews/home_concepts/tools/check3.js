// one look at the preview before publishing: wrapped as the publisher does, by night and by day, with errors reported
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [SRC, OUT] = process.argv.slice(2);
const wrapped = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>body{margin:0}[hidden]{display:none!important}</style></head><body>' + fs.readFileSync(SRC, 'utf8') + '</body></html>';
const tmp = OUT + '_page.html'; fs.writeFileSync(tmp, wrapped);
(async () => {
  const b = await pw.chromium.launch(); const errs = [];
  for (const scheme of ['dark', 'light']) {
    const p = await (await b.newContext({ viewport: { width: 1500, height: 1000 }, colorScheme: scheme })).newPage();
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto('file://' + tmp, { waitUntil: 'domcontentloaded', timeout: 60000 }); await p.waitForTimeout(3200);
    await p.screenshot({ path: OUT + '_' + scheme + '.png' });
    const k = await p.$$('.ox-key'); const bb = k[3] && await (await k[3].$('.ox-orb')).boundingBox();
    if (bb) { await p.mouse.move(bb.x + bb.width / 2 + 6, bb.y + bb.height / 2 - 6); await p.waitForTimeout(1200); }
    const ox = await p.$('#ox'); await ox.screenshot({ path: OUT + '_' + scheme + '_hover.png' });
    const info = await p.evaluate(() => ({ st: window.IngOrrery && IngOrrery.state(), seal: !!document.querySelector('#ox .isl .seal-spin'),
      spin: getComputedStyle(document.querySelector('#ox .seal-spin')).animationName, guide: !!document.getElementById('hxGuide'),
      btns: [...document.querySelectorAll('#ox .hx-btn')].map(x => Math.round(x.getBoundingClientRect().width)) }));
    console.log(scheme, JSON.stringify(info));
  }
  console.log('errors', JSON.stringify(errs).slice(0, 600)); await b.close();
})();
