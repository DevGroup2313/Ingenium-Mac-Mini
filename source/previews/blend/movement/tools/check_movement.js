// one look at the quiet Movement before publishing: the head by day and by night (two and four models), a wheel pointed at,
// Ingenium's wheel pressed, step I's rows, the answers, and any error
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [SRC, OUT, DSF] = process.argv.slice(2);
const wrapped = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}[hidden]{display:none!important}</style></head><body>' + fs.readFileSync(SRC, 'utf8') + '</body></html>';
const tmp = OUT + '_page.html'; fs.writeFileSync(tmp, wrapped);
(async () => {
  const b = await pw.chromium.launch(); const errs = []; const res = {};
  for (const scheme of ['light', 'dark']) {
    const p = await (await b.newContext({ viewport: { width: 1500, height: 1010 }, deviceScaleFactor: +(DSF || 1), colorScheme: scheme })).newPage();
    p.on('pageerror', e => errs.push(scheme + ': ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(scheme + ' console: ' + m.text()); });
    await p.goto('file://' + tmp, { waitUntil: 'domcontentloaded', timeout: 60000 }); await p.waitForTimeout(2000);
    await (await p.$('#bxHead')).screenshot({ path: OUT + '_' + scheme + '_two.png' });
    const gb = await (await p.$$('#cx .mv-hit'))[0].boundingBox(); await p.mouse.move(gb.x + gb.width / 2, gb.y + gb.height / 2); await p.waitForTimeout(800);
    res[scheme] = await p.evaluate(() => ({ st: window.__blend3.state(), hold: document.getElementById('cx').classList.contains('hold'),
      seal: !!document.querySelector('#cx #hxSealKey .isl'), turning: (() => { const s = document.querySelector('#cx .mv-seal .seal-spin'); return s ? getComputedStyle(s).animationName + ' ' + getComputedStyle(s).animationPlayState : null; })() }));
    await (await p.$('#bxHead')).screenshot({ path: OUT + '_' + scheme + '_hold.png' });
    await p.mouse.move(5, 5); await p.waitForTimeout(300);
    await p.evaluate(() => { document.getElementById('hxSealKey').click(); ['Velox', 'Faber'].forEach(n => [...document.querySelectorAll('.bx-model')].find(x => x.textContent.indexOf(n) >= 0).click()); });
    await p.waitForTimeout(1200);
    await (await p.$('#bxHead')).screenshot({ path: OUT + '_' + scheme + '_four.png' });
    await p.evaluate(() => document.getElementById('scroll').scrollTop = 440); await p.waitForTimeout(400);
    await p.screenshot({ path: OUT + '_' + scheme + '_rows.png' });
    if (scheme === 'light') {
      await p.evaluate(() => { document.getElementById('scroll').scrollTop = 0; document.querySelectorAll('.stg')[2].click(); document.getElementById('bxRun').click(); }); await p.waitForTimeout(11000);
      await p.evaluate(() => document.getElementById('scroll').scrollTop = 440); await p.waitForTimeout(400);
      await p.screenshot({ path: OUT + '_' + scheme + '_answers.png' });
    }
    await p.close();
  }
  console.log(JSON.stringify(res)); console.log('errors', JSON.stringify(errs).slice(0, 900)); await b.close();
})();
