// one look at the Folders preview (the drawer design) before publishing: by night and by day,
// a folder lifted out of the drawer, the rest of the page, a folder opened, one added, and any error
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [SRC, OUT] = process.argv.slice(2);
const wrapped = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>body{margin:0}[hidden]{display:none!important}</style></head><body>' + fs.readFileSync(SRC, 'utf8') + '</body></html>';
const tmp = OUT + '_page.html'; fs.writeFileSync(tmp, wrapped);
(async () => {
  const b = await pw.chromium.launch(); const errs = [];
  for (const scheme of ['dark', 'light']) {
    const p = await (await b.newContext({ viewport: { width: 1500, height: 1000 }, colorScheme: scheme })).newPage();
    p.on('pageerror', e => errs.push(scheme + ': ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(scheme + ' console: ' + m.text()); });
    await p.goto('file://' + tmp, { waitUntil: 'domcontentloaded', timeout: 60000 }); await p.waitForTimeout(1500);
    await p.screenshot({ path: OUT + '_' + scheme + '.png' });
    const lay = await p.evaluate(() => {
      const r = s => { const e = document.querySelector(s); if (!e) return null; const q = e.getBoundingClientRect(); return [Math.round(q.left), Math.round(q.top), Math.round(q.right), Math.round(q.bottom)]; };
      const imgs = [...document.querySelectorAll('.fd-file img, .fd-card img')];
      return { head: r('.fd-head'), words: r('.fd-words'), drawer: r('.fd-drawer'), hint: r('.fd-hint'), files: document.querySelectorAll('.fd-file').length,
        seals: imgs.length, sealsLoaded: imgs.filter(i => i.complete && i.naturalWidth > 0).length,
        shown: [...new Set(imgs.filter(i => i.offsetParent).map(i => i.classList.contains('only-night') ? 'night' : 'day'))] };
    });
    const f2 = await (await p.$$('.fd-file'))[1].boundingBox();
    await p.mouse.move(f2.x + f2.width * .5, f2.y + 60); await p.waitForTimeout(900);
    const hv = await p.evaluate(() => ({ up: [...document.querySelectorAll('.fd-file.up')].map(f => f.querySelector('.fd-tab span').textContent),
      hold: document.getElementById('fdDrawer').classList.contains('hold'), hint: document.getElementById('fdHint').textContent.slice(0, 90) }));
    await (await p.$('.fd-head')).screenshot({ path: OUT + '_' + scheme + '_hold.png' });
    await p.mouse.move(5, 5); await p.waitForTimeout(600);
    await p.evaluate(() => { document.getElementById('scroll').scrollTop = 520; }); await p.waitForTimeout(500);
    await p.screenshot({ path: OUT + '_' + scheme + '_home2.png' });
    await p.evaluate(() => { document.getElementById('scroll').scrollTop = 1250; }); await p.waitForTimeout(500);
    await p.screenshot({ path: OUT + '_' + scheme + '_home3.png' });
    await p.evaluate(() => document.querySelectorAll('.fd-card')[2].click()); await p.waitForTimeout(1100);
    await p.screenshot({ path: OUT + '_' + scheme + '_folder.png' });
    const fv = await p.evaluate(() => ({ open: !document.getElementById('fdOpen').hidden, title: (document.querySelector('.fd-ohead h2') || {}).textContent,
      seal: !!document.querySelector('.fd-ohead img'), convs: document.querySelectorAll('.fd-conv').length }));
    await p.evaluate(() => { document.getElementById('scroll').scrollTop += 460; }); await p.waitForTimeout(500);
    await p.screenshot({ path: OUT + '_' + scheme + '_folder2.png' });
    await p.evaluate(() => { document.querySelector('.fd-crumb .bx-key').click(); document.getElementById('fdNewTop').click(); }); await p.waitForTimeout(500);
    await p.fill('#fdAddName', 'Quill'); await p.evaluate(() => document.getElementById('fdMake').click()); await p.waitForTimeout(600);
    const ad = await p.evaluate(() => ({ cards: document.querySelectorAll('.fd-card:not(.fd-new)').length, files: document.querySelectorAll('.fd-file').length,
      coin: !!document.querySelector('.fd-file .fd-coin') }));
    await p.evaluate(() => { document.getElementById('scroll').scrollTop = 0; }); await p.waitForTimeout(500);
    await (await p.$('.fd-head')).screenshot({ path: OUT + '_' + scheme + '_added.png' });
    console.log(scheme, JSON.stringify({ lay, hv, fv, ad }));
  }
  console.log('errors', JSON.stringify(errs).slice(0, 800)); await b.close();
})();
