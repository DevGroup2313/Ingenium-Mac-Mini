const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [SRC, OUT] = process.argv.slice(2);
const wrapped = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>body{margin:0}[hidden]{display:none!important}</style></head><body>' + fs.readFileSync(SRC, 'utf8') + '</body></html>';
fs.writeFileSync(OUT + '_page.html', wrapped);
(async () => { const b = await pw.chromium.launch(); const errs = [];
  for (const [scheme, w, h] of [['light', 1500, 1000], ['dark', 1500, 1000], ['light', 390, 844]]) {
    const p = await (await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme })).newPage();
    p.on('pageerror', e => errs.push(scheme + w + ': ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(scheme + w + ' console: ' + m.text().slice(0, 160)); });
    await p.goto('file://' + OUT + '_page.html'); await p.waitForTimeout(1200);
    await p.screenshot({ path: OUT + '_' + scheme + w + '_1.png' });
    if (w > 600) {
      const room = n => p.evaluate(n => { const b = document.querySelector('#win .fr-room[data-room="' + n + '"]'); b && b.click(); }, n);
      const sub = t => p.evaluate(t => { const M = document.querySelectorAll('#fb .f-panels > .f-pn')[1]; const b = [...M.querySelectorAll('.f-seg button')].find(x => x.textContent.replace(/\s*\d+$/, '').trim() === t); b && b.click(); }, t);
      await room('story'); await p.waitForTimeout(500); await p.screenshot({ path: OUT + '_' + scheme + w + '_story.png' });
      await room('plans'); await p.waitForTimeout(500); await sub('Pull requests'); await p.waitForTimeout(500);
      await p.evaluate(() => { const M = document.querySelectorAll('#fb .f-panels > .f-pn')[1]; const b = [...M.querySelectorAll('button,a,[role=button],.h-row,.h-item')].find(x => /Night mode for the reader/.test(x.textContent)); b && b.click(); }); await p.waitForTimeout(700);
      await p.evaluate(() => { const k = document.querySelector('#fbPart_ingenium'); k && k.click(); }); await p.waitForTimeout(400);
      await p.evaluate(() => { const b = [...document.querySelectorAll('#fb .pv-tiles .f-tg')][1]; b && b.click(); }); await p.waitForTimeout(1600);
      await p.evaluate(() => { const b = document.querySelector('#fb [data-pv-branch]'); b && b.click(); }); await p.waitForTimeout(400);
      const st = await p.evaluate(() => ({ seg: !!document.querySelector('#hPrMergeBox .f-seg'), pop: !!document.querySelector('#win .r172-pop'), ans: document.querySelectorAll('#fb .pv-ans li').length,
        tiles: [...document.querySelectorAll('#fb .f-repo .nm')].map(x => x.textContent), secs: [...document.querySelectorAll('#fb .pv-sec b')].map(x => x.textContent), wide: document.documentElement.scrollWidth - innerWidth }));
      console.log(scheme, w, JSON.stringify(st));
      await p.screenshot({ path: OUT + '_' + scheme + w + '_2.png' });
    } else { const wide = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); console.log(scheme, w, 'wide', wide); await p.screenshot({ path: OUT + '_' + scheme + w + '_full.png', fullPage: true }); }
    await p.context().close(); }
  console.log('errors', JSON.stringify(errs)); await b.close(); })();
