// Lector 2i: each app's paper by day and by night; no glow, no pulse; surfaces lift; the saved web page carries both
const { start } = require('./lib.js');
const fs = require('fs');
(async () => {
  const S = process.env.S, OUT = S + '/lx2i/shots'; fs.mkdirSync(OUT, { recursive: true });
  const { browser, page, logs } = await start({ viewport: { width: 1440, height: 900 } });
  await page.evaluate(() => go('lector')); await page.waitForTimeout(1500);
  const md = '# T\n\n## What it is\n\nInkwell is an offline writing studio. It keeps [your role] and 42 screens. **Bold** and *italic* and `code`.\n\n### A closer look\n\n- one\n- two\n\n> A quotation, set apart.\n\n| Measure | Value |\n|---|---|\n| Lines | 19,100 |\n| Functions | 1,234 |\n\n## Inkwell\n\nIts own section.\n\n## Carpe Diem\n\nIts own section.\n';
  const sets = { cd: ['cd'], forge: ['forge'], inkwell: ['inkwell'], ingenium: ['ingenium'], family: ['cd', 'inkwell'], master: ['cd', 'forge', 'ingenium', 'inkwell'], neutral: ['cd'] };
  const res = {};
  for (const mode of ['day', 'night']) {
    await page.evaluate((m) => { document.body.setAttribute('data-theme', m === 'night' ? 'night' : 'day'); }, mode); await page.waitForTimeout(500);
    for (const [k, apps] of Object.entries(sets)) {
      const kind = k === 'neutral' ? 'cv' : 'dossier';
      const r = await page.evaluate(({ kind, md, apps }) => {
        const desk = document.getElementById('l7Desk'); const th = apps.length > 1 ? 'family' : (kind === 'cv' ? 'neutral' : apps[0]);
        desk.className = 'l-desk th-' + th;
        desk.innerHTML = IngLector.paper(kind, md, { apps, name: apps.length === 4 ? 'The Offline Project' : apps.map(a => ({ cd: 'Carpe Diem', forge: 'The Forge', ingenium: 'Ingenium', inkwell: 'Inkwell' })[a]).join(' and '), label: 'Project dossier', forText: 'Research Software Engineer · A University' });
        desk.scrollTop = 0;
        const p = desk.querySelector('.l-paper'), cs = getComputedStyle(p), h1 = p.querySelector('h1'), h2 = p.querySelector('h2'), own = p.querySelector('h2.own-inkwell');
        return { bg: cs.backgroundColor, ink: cs.color, font: cs.fontFamily.slice(0, 40), h1: h1 ? getComputedStyle(h1).color : null, h2: h2 ? getComputedStyle(h2).color : null, own: own ? getComputedStyle(own).color : null,
          desk: getComputedStyle(desk).backgroundColor, seals: p.querySelectorAll('.seals img,.seals .sn').length, sn: p.querySelectorAll('.seals .sn').length };
      }, { kind, md, apps });
      res[mode + ':' + k] = r;
      await page.waitForTimeout(250);
      const box = await page.$('#l7Doc'); await box.screenshot({ path: `${OUT}/${k}_${mode}.png` });
    }
  }
  console.log(JSON.stringify(res, null, 1));
  // the fonts are there
  console.log('fonts:', await page.evaluate(async () => { await document.fonts.ready; return { corm: document.fonts.check('17px "Lector Cormorant"'), cinzel: document.fonts.check('600 20px "Lector Cinzel"') }; }));
  // no glow, no pulsing; the next key settles once; the panels lift
  console.log('motion:', JSON.stringify(await page.evaluate(() => {
    const out = {}; const pri = document.querySelector('#lx7 .l-btn.pri'); if (pri) { out.priAfter = getComputedStyle(pri, '::after').boxShadow; out.priAnim = getComputedStyle(pri).animationIterationCount + ' ' + getComputedStyle(pri).animationName; }
    const infinite = [...document.querySelectorAll('#lx7 *')].filter(e => { const c = getComputedStyle(e); return c.animationName !== 'none' && c.animationIterationCount === 'infinite'; }).map(e => e.className + ':' + getComputedStyle(e).animationName);
    out.infinite = [...new Set(infinite)]; const pn = document.querySelector('#lx7 .l-pn'); out.pnShadow = getComputedStyle(pn).boxShadow.slice(0, 60); return out; })));
  const pn = await page.$('#l7Read'); const bb = await pn.boundingBox(); await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.waitForTimeout(700);
  console.log('panel under the pointer:', await page.evaluate(() => getComputedStyle(document.getElementById('l7Read')).transform));
  // the saved web page: by day, and by the reader's night
  const html = await page.evaluate(() => IngLector.htmlDoc('dossier', '# x\n\n## One\n\nText.', { apps: ['inkwell'], name: 'Inkwell', label: 'Project dossier', title: 'Inkwell · Project dossier' }));
  fs.writeFileSync(OUT + '/inkwell_doc.html', html);
  for (const scheme of ['light', 'dark']) { const p2 = await browser.newPage({ colorScheme: scheme, viewport: { width: 900, height: 700 } }); await p2.setContent(html); await p2.waitForTimeout(500);
    const r = await p2.evaluate(() => ({ bg: getComputedStyle(document.querySelector('.l-paper')).backgroundColor, body: getComputedStyle(document.body).backgroundColor, sd: [...document.querySelectorAll('.sd')].filter(e => e.offsetParent).length, sn: [...document.querySelectorAll('.sn')].filter(e => e.offsetParent).length, corm: document.fonts.check('17px "Lector Cormorant"') }));
    console.log('export', scheme, JSON.stringify(r)); await p2.screenshot({ path: `${OUT}/export_inkwell_${scheme}.png` }); await p2.close(); }
  console.log('errors:', logs.filter(l => /error/i.test(l)).slice(0, 5));
  await browser.close();
})();
