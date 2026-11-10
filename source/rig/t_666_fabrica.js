// Fabrica in Ingenium's own depth, and the Offline Project's crest (Ingenium 6.66, modules/r260.js, r246.js, r176.js). Her words
// (10 November 2026): "The newly added Fabrica pages are still and not animated and clickable when I hover over them", "The Offline
// Project without Inkwell app has the wrong seal in Fabrica", "I also really dislike the weird film over the background in the Fabrica
// page when a panel is open", "I want the new app panel's surfaces to be animated and have that popped out 3D look and effect".
//   - a panel (A new app, Bring an app in) stands on no film: its backdrop is transparent, and the panel is a raised plate;
//   - the library's cards, the New app's ways, colours and close key, and the tiles of Bring an app in lift on the pointer and sink
//     on a press; the library's cards lean toward the pointer; pressed, they sound as keys do;
//   - the New app's coin turns when its letter or colour changes, and not while more of the same name is typed;
//   - minimal motion keeps the cards still;
//   - the Offline Project without Inkwell is kept as an app of its own, named so, and wears the crest of three; all four wears the
//     crest of four; a copy kept the old way (under the name of four, every version without Inkwell) is renamed once; one that holds
//     versions of both keeps its name;
//   - no page error.
//   node rig/t_666_fabrica.js <Ingenium page url (master)> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_666_fabrica.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; return !!c; };
const note = (m) => console.log('     ' + m);
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(400);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} go('fabrica'); }); await p.waitForTimeout(1500);
  const ty = (sel) => p.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const t = getComputedStyle(e).transform; if (!t || t === 'none') return 0; const m = new DOMMatrix(t); return Math.round(m.m42 * 10) / 10; }, sel);
  const centre = (sel) => p.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, sel);
  const hoverLift = async (sel, label) => { const c = await centre(sel); await p.mouse.move(c[0], c[1]); await p.waitForTimeout(450); const up = await ty(sel);
    await p.mouse.down(); await p.waitForTimeout(160); const down = await ty(sel); await p.mouse.move(5, 5); await p.mouse.up(); await p.waitForTimeout(350);
    ok(up < -0.9 && down > up, label + ': lifts on the pointer and sinks on a press', { up, down }); return { up, down }; };

  // 1. A new app: no film, a raised plate, choices that lift and sink, a coin that turns
  ok(await p.evaluate(() => !!window.IngFabricaDepth), 'the depth part is there');
  const opened = await p.evaluate(() => { const k = [...document.querySelectorAll('#fb button')].find(x => /New app/.test(x.textContent) && x.offsetParent); if (k) { k.click(); return true; } return false; });
  await p.waitForTimeout(800);
  ok(opened && await p.evaluate(() => !!document.querySelector('#fb .f-sheet .f-new')), 'A new app opens');
  const film = await p.evaluate(() => { const w = document.querySelector('#fb .f-sheet-wrap'); const c = getComputedStyle(w); return { bg: c.backgroundColor, bf: c.backdropFilter || c.webkitBackdropFilter || 'none' }; });
  ok(/rgba\(0, 0, 0, 0\)|transparent/.test(film.bg) && /none/.test(film.bf), 'no film over the page while the panel is open', film);
  const plate = await p.evaluate(() => getComputedStyle(document.querySelector('#fb .f-sheet')).boxShadow);
  ok((plate.match(/rgba?\(/g) || []).length >= 6, 'the panel stands as a raised plate (its depth in layers)', plate.slice(0, 200));
  await p.screenshot({ path: path.join(OUT, 'fabrica_new_app.png') });
  await hoverLift('#fb .f-way:not([aria-pressed="true"])', 'a way to start');
  await hoverLift('#fb .f-sw button:not([aria-pressed="true"])', 'a colour');
  const xr = await (async () => { const c = await centre('#fb .f-x'); await p.mouse.move(c[0], c[1]); await p.waitForTimeout(400); const t = await ty('#fb .f-x'); await p.mouse.move(5, 5); await p.waitForTimeout(300); return t; })();
  ok(xr < -0.9, 'the close key lifts on the pointer', xr);
  const coin = async (fn) => { await p.evaluate(fn); await p.waitForTimeout(80); return p.evaluate(() => document.querySelector('#fb .f-new-prev .f-ls.mark').classList.contains('turn')); };
  await p.waitForTimeout(800);
  const t1 = await coin(() => { const b = [...document.querySelectorAll('#fb .f-sw button')][2]; b.click(); });
  ok(t1, 'a new colour turns the coin');
  await p.waitForTimeout(900);
  await p.click('#fb .f-sheet input.f-in'); await p.keyboard.type('R'); await p.waitForTimeout(100);
  const t2 = await p.evaluate(() => document.querySelector('#fb .f-new-prev .f-ls.mark').classList.contains('turn'));
  ok(t2, 'a new first letter turns it');
  await p.waitForTimeout(900);
  await p.keyboard.type('ecipe Box'); await p.waitForTimeout(150);
  const t3 = await p.evaluate(() => document.querySelector('#fb .f-new-prev .f-ls.mark').classList.contains('turn'));
  ok(!t3, 'typing more of the same name does not turn it again');
  const coinLook = await p.evaluate(() => { const m = document.querySelector('#fb .f-new-prev .f-ls.mark'); const c = getComputedStyle(m); return { an: c.animationName, sh: (c.boxShadow.match(/rgba?\(/g) || []).length }; });
  ok(/r260Float/.test(coinLook.an) && coinLook.sh >= 5, 'the coin floats, and stands out in layers', coinLook);
  await p.screenshot({ path: path.join(OUT, 'fabrica_new_app_typed.png') });
  await p.evaluate(() => document.querySelector('#fb .f-x').click()); await p.waitForTimeout(400);
  ok(await p.evaluate(() => !document.querySelector('#fb .f-sheet-wrap')), 'the close key closes the panel');

  // 2. Bring an app in: its tiles lift
  await p.evaluate(() => { const k = [...document.querySelectorAll('#fb button')].find(x => /Bring one in/.test(x.textContent) && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(800);
  if (await p.evaluate(() => !!document.querySelector('#fb .f-tile'))) await hoverLift('#fb .f-tile', 'a tile of Bring an app in');
  else note('(no tiles in Bring an app in on this page)');
  await p.screenshot({ path: path.join(OUT, 'fabrica_bring.png') });
  await p.evaluate(() => { const x = document.querySelector('#fb .f-x'); if (x) x.click(); }); await p.waitForTimeout(400);

  // 3. the Offline Project without Inkwell: an app of its own, with the crest of three
  const can = await p.evaluate(() => !!(window.IngOffline && IngOffline.data && IngOffline.data()));
  const edition = await p.evaluate(() => { try { return typeof ING_EDITION !== 'undefined' ? ING_EDITION : 'master'; } catch (e) { return 'master'; } });
  if (!can && edition !== 'master') { note('(the ' + edition + ' edition carries no Offline Project: its crest checks are for the master edition)'); }
  else if (!can) { ok(false, 'this page carries the Offline Project (the master edition)'); }
  else {
    await p.evaluate(() => IngOffline.keep(false)); await p.waitForTimeout(500);
    for (let i = 0; i < 120 && !(await p.evaluate(() => IngRepo.list().then(rs => rs.some(r => r.name === 'The Offline Project (without Inkwell)')))); i++) await p.waitForTimeout(1000);
    const names = await p.evaluate(() => IngRepo.list().then(rs => rs.map(r => r.name)));
    ok(names.includes('The Offline Project (without Inkwell)') && !names.includes('The Offline Project'), 'without Inkwell is kept as an app of its own, named so', names);
    await p.evaluate(() => { const k = document.querySelector('#fb .f-libk'); if (k) k.click(); }); await p.waitForTimeout(1200);
    const lib = await p.evaluate(() => [...document.querySelectorAll('#fb .f-lc')].map(c => ({ nm: (c.querySelector('.nm') || {}).textContent, vr: (c.querySelector('.vr') || {}).textContent, crest: (c.querySelector('.ing-crest') || {}).className || '', st: (c.querySelector('.st') || {}).textContent })).filter(x => /Offline/.test(x.nm)));
    const three = lib.find(x => /without Inkwell/i.test(x.nm + ' ' + x.vr));
    ok(three && /ic-trio/.test(three.crest) && !/Not made/.test(three.st || ''), 'in Your apps it wears the crest of three, and is made', lib);
    const four = lib.find(x => x !== three && /All four/.test(x.vr || ''));
    ok(four && /ic-master/.test(four.crest), 'all four keeps the crest of four (its card waits to be made)', lib);
    await p.screenshot({ path: path.join(OUT, 'fabrica_library.png') });
    // the library's cards lift, lean and sink
    const card = '#fb .f-lc';
    const c0 = await centre(card); await p.mouse.move(c0[0] + 60, c0[1] - 20); await p.waitForTimeout(500);
    const lean = await p.evaluate((s) => { const e = document.querySelector(s); return { ry: e.style.getPropertyValue('--ry'), rx: e.style.getPropertyValue('--rx'), m: getComputedStyle(e).transform }; }, card);
    ok(parseFloat(lean.ry) > 0 && /matrix3d/.test(lean.m), 'a library card leans toward the pointer', lean);
    await p.mouse.move(5, 5); await p.waitForTimeout(400);
    await hoverLift(card, 'a library card');
    let snd = await p.evaluate(() => window.IngSound ? { allowed: IngSound.allowed(), n: IngSound.count() } : null);
    if (snd && snd.allowed) { const c1 = await centre(card); await p.mouse.move(c1[0], c1[1]); await p.mouse.down(); await p.mouse.up(); await p.waitForTimeout(300);
      const n2 = await p.evaluate(() => IngSound.count()); ok(n2 > snd.n, 'a library card sounds as a key does when pressed', { before: snd.n, after: n2 });
      await p.evaluate(() => { try { go('fabrica'); } catch (e) {} }); await p.waitForTimeout(600); }
    else note('(sounds are not allowed in this browser profile: the press sound is not measured here)');
    // minimal motion keeps them still
    await p.evaluate(() => { const k = document.querySelector('#fb .f-libk'); if (k && !document.querySelector('#fb .f-lc')) k.click(); }); await p.waitForTimeout(800);
    await p.evaluate(() => document.body.setAttribute('data-motion', 'minimal'));
    const cm = await centre(card); await p.mouse.move(cm[0], cm[1]); await p.waitForTimeout(450);
    ok((await ty(card)) === 0, 'with minimal motion the cards keep still', await ty(card));
    await p.mouse.move(5, 5); await p.evaluate(() => { document.body.setAttribute('data-motion', state.motion || 'full'); });

    // 4. a copy kept the old way is renamed once; one with both kinds keeps its name
    const fix = await p.evaluate(async () => { const rs0 = await IngRepo.list(); for (const r of rs0) await IngRepo.remove(r.id).catch(() => {});
      const files = [{ path: 'the_offline_project.html', data: '<!doctype html><title>x</title>' }];
      const a = await IngRepo.fromFiles(files, { name: 'The Offline Project', msg: 'Made from your apps (without Inkwell)' });
      await IngRepo.putMany(a.id, [{ path: 'the_offline_project.html', data: '<!doctype html><title>y</title>' }]); await IngRepo.commit(a.id, 'Made from your apps (without Inkwell)');
      const id1 = await IngOffline.fixNames(); const rs1 = await IngRepo.list();
      return { id1, names: rs1.map(r => r.name) }; });
    ok(fix.names.includes('The Offline Project (without Inkwell)') && !fix.names.includes('The Offline Project'), 'a copy kept the old way, every version without Inkwell, takes the name of three', fix);
    const mixed = await p.evaluate(async () => { const rs0 = await IngRepo.list(); for (const r of rs0) await IngRepo.remove(r.id).catch(() => {});
      const a = await IngRepo.fromFiles([{ path: 'the_offline_project.html', data: '<!doctype html><title>x</title>' }], { name: 'The Offline Project', msg: 'Made from your apps (all four)' });
      await IngRepo.putMany(a.id, [{ path: 'the_offline_project.html', data: '<!doctype html><title>y</title>' }]); await IngRepo.commit(a.id, 'Made from your apps (without Inkwell)');
      await IngOffline.fixNames(); return (await IngRepo.list()).map(r => r.name); });
    ok(mixed.includes('The Offline Project') && mixed.length === 1, 'one that holds versions of both keeps its name', mixed);
  }
  ok(errs.length === 0, 'no page error', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.log('FAIL the test stopped: ' + (e && e.stack || e)); process.exit(1); });
