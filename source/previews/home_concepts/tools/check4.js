// one look at the 6.67 preview before publishing: wrapped as the publisher does, by night and by day, a room pointed at, errors
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [SRC, OUT] = process.argv.slice(2);
const wrapped = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>body{margin:0}[hidden]{display:none!important}</style></head><body>' + fs.readFileSync(SRC, 'utf8') + '</body></html>';
const tmp = OUT + '_page.html'; fs.writeFileSync(tmp, wrapped);
(async () => {
  const b = await pw.chromium.launch(); const errs = [];
  for (const scheme of ['dark', 'light']) {
    const p = await (await b.newContext({ viewport: { width: 1500, height: 1000 }, colorScheme: scheme })).newPage();
    p.on('pageerror', e => errs.push(scheme + ': ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(scheme + ' console: ' + m.text()); });
    await p.goto('file://' + tmp, { waitUntil: 'domcontentloaded', timeout: 60000 }); await p.waitForTimeout(3500);
    await p.screenshot({ path: OUT + '_' + scheme + '.png' });
    const j = await p.$('#hx .hx-key[data-go="code"] .hx-jewel'); const bb = j && await j.boundingBox();
    if (bb) { await p.mouse.move(bb.x + bb.width * .7, bb.y + bb.height * .35); await p.waitForTimeout(1200); }
    const hd = await p.$('#hx .hx-head'); await hd.screenshot({ path: OUT + '_' + scheme + '_hover.png' });
    const info = await p.evaluate(() => ({ st: window.IngOrrery && IngOrrery.state(), S: getComputedStyle(document.querySelector('#hxSeal .isl')).getPropertyValue('--S'),
      seal: Math.round(document.getElementById('hxSeal').offsetWidth), spin: getComputedStyle(document.querySelector('#hxSeal .seal-spin')).animationName,
      guide: getComputedStyle(document.getElementById('hxGuide')).display, c2: getComputedStyle(document.querySelector("#hx .hx-key[data-go=code] .oxo")).getPropertyValue("--c2"),
      btns: ['heroNext', 'homeTour'].map(id => Math.round(document.getElementById(id).getBoundingClientRect().width)) }));
    console.log(scheme, JSON.stringify(info));
  }
  console.log('errors', JSON.stringify(errs).slice(0, 800)); await b.close();
})();
