// node rig/t_681_house.js <page url> <out dir> [master|other]
// 6.8.1: Tabula, Abacus and Imago inside Ingenium wear Ingenium's seal, never Carpe Diem's, and only in the master edition
// (apps/house_patch.py). For each app on the Desk: the seal studio is told its house; its letterheads draw Ingenium's seal
// in the master edition, nothing in the others, where the key beside the group opens "Your own" instead; no visible text
// in the studio's group, picker or Tabula's watermark menu names Carpe Diem. Pictures of the group and picker to <out dir>.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL = process.argv[2], OUT = process.argv[3], ED = process.argv[4] || 'master'; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, what, info) { if (c) pass++; else fail++; console.log((c ? 'PASS ' : 'FAIL ') + what + (c ? '' : '  ' + (info || ''))); }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(600);
  for (const app of ['tabula', 'abacus', 'imago']) {
    const key = app === 'imago' ? 'slides' : app;
    await p.evaluate(k => go(k), key);
    await p.waitForFunction(k => { const f = document.querySelector('#ing-desk iframe[data-app="' + k + '"]') || document.querySelector('#ing-desk iframe[data-app="' + (k === 'slides' ? 'imago' : k) + '"]');
      try { return !!f.contentWindow.document.getElementById('cd-seal-group'); } catch (e) { return false; } }, key, { timeout: 60000 });
    const fr = p.frames().find(f => { try { return f.url() !== p.url() && f.parentFrame() === p.mainFrame() && f.name() !== 'x' && f !== p.mainFrame(); } catch (e) { return false; } });
    const r = await p.evaluate(async k => {
      const f = document.querySelector('#ing-desk iframe[data-app="' + k + '"]') || document.querySelector('#ing-desk iframe[data-app="' + (k === 'slides' ? 'imago' : k) + '"]');
      const w = f.contentWindow, d = w.document, H = w.__ingHouse || null, g = d.getElementById('cd-seal-group');
      const u = w.cdSeal && w.cdSeal.uri ? w.cdSeal.uri(64, 'blue') : '';
      const btn = d.getElementById('cd-seal-btn'); btn.dispatchEvent(new w.MouseEvent('click', { bubbles: true })); btn.dispatchEvent(new w.PointerEvent('pointerup', { bubbles: true }));
      await new Promise(r => setTimeout(r, 500));
      const pop = d.getElementById('cd-seal-pop'), dlg = [...d.querySelectorAll('[role="dialog"],.cd-ownmark,.cdsl-own,input[type=file]')].filter(e => e.offsetParent || e.type === 'file');
      const texts = (g ? g.innerText + ' ' + [...g.querySelectorAll('[title],[aria-label]')].map(e => (e.title || '') + ' ' + (e.getAttribute('aria-label') || '')).join(' ') : '') + ' ' + (pop ? pop.innerText + ' ' + (pop.getAttribute('aria-label') || '') : '');
      const imgs = pop ? [...pop.querySelectorAll('img')].map(i => i.src) : [];
      const r = { house: H && { name: H.name, word: H.word, png: !!H.png }, uri: u.slice(0, 40), uriHasPng: /data%3Aimage%2Fpng|data:image\/png/.test(decodeURIComponent(u)), pop: !!pop, popImgs: imgs.length,
        popPng: imgs.filter(s => /data%3Aimage%2Fpng|image\/png/.test(decodeURIComponent(s))).length, other: dlg.length, carpe: /carpe diem/i.test(texts), text: texts.replace(/\s+/g, ' ').slice(0, 200) };
      if (pop && pop.__close) pop.__close();
      if (k === 'tabula') { const wb = d.getElementById('watermarkBtn'); if (wb) { wb.click(); await new Promise(r => setTimeout(r, 300)); const m = [...d.querySelectorAll('[role="menu"]')].pop();
        r.wm = m ? [...m.querySelectorAll('button')].map(x => x.textContent) : null; if (m) m.remove(); } }
      return r;
    }, key);
    await p.screenshot({ path: path.join(OUT, app + '-' + ED + '.png') });
    if (ED === 'master') {
      ok(r.house && r.house.name === 'Ingenium' && r.house.word === 'INGENIUM' && r.house.png, app + ': the studio is told its house, Ingenium, with its seal', JSON.stringify(r.house));
      ok(r.uriHasPng, app + ': the seal it draws is Ingenium\'s picture, not Carpe Diem\'s drawing', r.uri);
      ok(r.pop && r.popImgs > 0 && r.popPng === r.popImgs, app + ': the letterheads show Ingenium\'s seal', JSON.stringify(r));
    } else {
      ok(r.house && !r.house.png && !r.house.word, app + ': this edition gives the studio no seal and no wordmark', JSON.stringify(r.house));
      ok(!r.uri, app + ': it draws no seal', r.uri);
      ok(!r.pop, app + ': the key beside the group opens Your own, not the house letterheads', JSON.stringify(r));
    }
    ok(!r.carpe, app + ': nothing in the group or its picker names Carpe Diem', r.text);
    if (app === 'tabula') ok(r.wm && !r.wm.some(t => /carpe/i.test(t)) && (ED === 'master' ? r.wm.some(t => /INGENIUM/.test(t)) : !r.wm.some(t => /seal|INGENIUM/i.test(t))),
      'tabula: the watermark menu offers ' + (ED === 'master' ? "Ingenium's seal and name" : 'no seal and no name'), JSON.stringify(r.wm));
  }
  ok(errs.length === 0, 'no errors on the page', errs.slice(0, 3).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
