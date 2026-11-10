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
    const hd0 = await p.$('#bx'); await hd0.screenshot({ path: OUT + '_' + scheme + '_page.png' });
    const sb = await (await p.$('.bx-sat:not(.ghost) .orb')).boundingBox(); await p.mouse.move(sb.x + sb.width * .65, sb.y + sb.height * .35); await p.waitForTimeout(900);
    const hv = await p.evaluate(() => ({ held: document.getElementById('bxHead').classList.contains('hold'), near: !!document.querySelector('.bx-sat.near'), kd: +getComputedStyle(document.querySelector('.bx-sat.near .bx-kd')).opacity,
      paused: getComputedStyle(document.querySelector('.bx-spin')).animationPlayState, hov: !!document.querySelector('.bx-sat.near .orb.hov') }));
    console.log(scheme, 'hover', JSON.stringify(hv)); const hh = await p.$('#bxHead'); await hh.screenshot({ path: OUT + '_' + scheme + '_hold.png' });
    await p.mouse.move(5, 5); const kb = await (await p.$('#hxSealKey')).boundingBox(); await p.mouse.click(kb.x + kb.width / 2, kb.y + kb.height / 2); await p.waitForTimeout(300);
    console.log(scheme, 'engine', JSON.stringify(await p.evaluate(() => ({ rims: document.querySelectorAll('#bxSun .bx-rim').length, anims: document.getAnimations().filter(a => a.effect && a.effect.target && a.effect.target.closest && a.effect.target.closest('#bxSun') && !(a instanceof CSSAnimation)).length }))));
    await p.evaluate(() => { const r = [...document.querySelectorAll('.bx-model')][0]; r.click(); }); await p.waitForTimeout(400);
    await p.evaluate(() => document.querySelector('.bx-step:nth-child(3)').click()); await p.waitForTimeout(300);
    await p.evaluate(() => document.getElementById('bxRun').click()); await p.waitForTimeout(9000);
    await hd0.screenshot({ path: OUT + '_' + scheme + '_run.png' });
    const info = await p.evaluate(() => ({ sats: document.querySelectorAll('.bx-sat:not(.ghost)').length, answers: document.querySelectorAll('.bx-ans').length, final: !!document.querySelector('.bx-final'),
      spin: getComputedStyle(document.querySelector('.bx-sun .seal-spin')).animationName, step: document.querySelector('.bx-step[aria-current]').textContent }));
    console.log(scheme, JSON.stringify(info));
  }
  console.log('errors', JSON.stringify(errs).slice(0, 800)); await b.close();
})();
