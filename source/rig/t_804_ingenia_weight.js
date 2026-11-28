// node rig/t_804_ingenia_weight.js <page url> [picture folder]
// Ingenium 8.04 (modules/r378.js, r402.js): Ingenia's app logos are weighted 3D buttons, as their doors draw them. Her words (27 November
// 2026): "All of the apps logos look flat and one dimensional on the Ingenia folder pages, especially Clavis which even folds and bends while
// animated. I HATE THAT. There is also this small and light purple shadow that moves with the apps' logos ... I want ... all of the apps logos
// especially Clavis' look proper and like truly 3D weighted animated buttons like they all do on their introduction doors."
// On each app's folder page: a rim behind the face where the logo has none; the door's sway (7 degrees each way, 11 seconds); a lean of 12
// degrees at most under the pointer; no press that turns it sideways (no twirl, no flip); the plate's own neutral shadow, no violet oval.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 300))); c ? pass++ : fail++; };
(async () => {
  const OUT = process.argv[3] || path.join(require('os').tmpdir(), 't804'); fs.mkdirSync(OUT, { recursive: true });
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 160)));
  await p.goto(process.argv[2], { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  for (let i = 0; i < 2; i++) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(900); }
  await p.evaluate(() => go('folders')); await sleep(1800);
  const sway = await p.evaluate(() => { let t = ''; for (const sh of document.styleSheets) { let rs; try { rs = sh.cssRules; } catch (e) { continue; } for (const r of rs) if (r.type === 7 && r.name === 'igSway') t = r.cssText; } return t.replace(/\s+/g, ' '); });
  ok(/7deg/.test(sway) && !/18deg/.test(sway), 'the logos sway as the doors\' seals do: 7 degrees each way, not 18', sway);
  const apps = await p.evaluate(() => { go('folders'); const b = [...document.querySelectorAll('#page-folders button, #page-folders a, #page-folders [role=button]')].find((x) => x.offsetParent && /^Ingenia$/.test(x.textContent.trim())); if (b) b.click();
    return [...document.querySelectorAll('#page-folders .fld-card')].map((c) => c.textContent.trim().split('\n')[0].trim().slice(0, 30)); });
  await sleep(1200);
  const want = ['Clavis', 'Carpe Diem', 'The Forge', 'Inkwell', 'Lakay', 'Ingenium'];
  const seenAll = new Set();
  for (const app of want) {
    const opened = await p.evaluate((n) => { go('folders'); const b = [...document.querySelectorAll('#page-folders button, #page-folders a, #page-folders [role=button]')].find((x) => x.offsetParent && /^Ingenia$/.test(x.textContent.trim())); if (b) b.click();
      const c = [...document.querySelectorAll('#page-folders .fld-card')].find((x) => x.textContent.trim().startsWith(n)); if (!c) return false; c.click(); return true; }, app);
    if (!opened) { console.log('(no folder for ' + app + ' in this copy)'); continue; }
    await sleep(2000);
    const s = await p.evaluate(() => { const k = document.querySelector('#page-folders .ig-ls.ig-key'); if (!k) return null; k.scrollIntoView({ block: 'center' }); const c = getComputedStyle(k), cast = k.querySelector('.ig-ls-cast'), cc = cast ? getComputedStyle(cast) : null;
      const S = parseFloat(c.getPropertyValue('--S')) || k.getBoundingClientRect().width; const r = k.getBoundingClientRect();
      return { k: k.getAttribute('data-fd-seal'), S, persp: parseFloat(c.perspective), rims: k.querySelectorAll('.ig-ls-l.rim').length, neg: [...k.querySelectorAll('.ig-ls-l')].filter((l) => parseFloat(l.style.getPropertyValue('--z')) < 0).length,
        flat: k.classList.contains('flat'), obj: k.classList.contains('obj'), castDisp: cc ? cc.display : '', faceF: (k.querySelector('.ig-ls-l.face') ? getComputedStyle(k.querySelector('.ig-ls-l.face')).filter : ''), castBg: cc ? cc.backgroundImage : '', castSh: cc ? cc.boxShadow : '', idle: getComputedStyle(k.querySelector('.ig-ls-idle')).animationDuration, x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height, l: r.left, t: r.top }; });
    if (!s) { ok(false, app + ': its folder page shows its logo'); continue; }
    if (app === 'Clavis') ok(s.obj && s.rims === 0 && s.castDisp === 'none' && s.faceF === 'none', 'Clavis: an object, as its door draws its astrolabe: no plate behind it, no rim, no round shadow, and since 8.06 no shadow on it at all (her word)', { obj: s.obj, rims: s.rims, cast: s.castDisp, f: s.faceF.slice(0, 60) });
    else ok(s.flat || s.neg >= 4, app + ': a weighted logo with a rim behind its face (' + s.neg + ' layers behind it' + (s.rims ? ', ' + s.rims + ' of them its rim' : ', its own') + ')', s);
    ok(Math.abs(s.persp - s.S * 7) < 2, app + ': a shallower perspective, so a tilted logo is not drawn bent', { persp: s.persp, S: s.S });
    if (app !== 'Clavis') ok(s.flat || (s.castBg === 'none' && /rgba\(20, 14, 30/.test(s.castSh)), app + ': beneath it, the plate\'s own neutral shadow, no violet oval', { bg: s.castBg, sh: s.castSh.slice(0, 80) });
    // held still (Minimal motion), every layer is drawn the size of the logo's face: nothing shrunk or swollen by the perspective, so nothing looks distorted
    const reg = await p.evaluate(() => { const was = document.body.getAttribute('data-motion'); document.body.setAttribute('data-motion', 'minimal'); const k = document.querySelector('#page-folders .ig-ls.ig-key'); void k.offsetWidth;
      const ws = [...k.querySelectorAll('.ig-ls-l:not(.rim):not(.side)')].map((l) => l.getBoundingClientRect().width); if (was === null) document.body.removeAttribute('data-motion'); else document.body.setAttribute('data-motion', was); const f = ws[0] || 1; return { ws: ws.map((w) => +w.toFixed(2)), worst: +Math.max(...ws.map((w) => Math.abs(w / f - 1))).toFixed(4) }; });
    ok(reg.worst < 0.012, app + ': its layers line up, each drawn the size of its face (worst ' + (reg.worst * 100).toFixed(2) + '%)', reg);
    await sleep(1200);   // a change of motion setting has Ingenia draw its logos again a moment later
    ok(s.idle === '11s', app + ': it sways slowly, as the doors\' seals do (11 seconds)', s.idle);
    await p.mouse.move(s.l + s.w * 0.98, s.t + s.h * 0.02, { steps: 4 }); await sleep(450);
    const lean = await p.evaluate(() => { const k = document.querySelector('#page-folders .ig-ls.ig-key'); return { rx: k.style.getPropertyValue('--rx'), ry: k.style.getPropertyValue('--ry') }; });
    ok(Math.abs(parseFloat(lean.rx)) <= 12.01 && Math.abs(parseFloat(lean.ry)) <= 12.01, app + ': under the pointer it leans 12 degrees at most', lean);
    const clip = { x: s.l - 40, y: s.t - 40, width: s.w + 80, height: s.h + 80 };
    await p.mouse.move(s.x + s.w * 0.25, s.y - s.h * 0.2, { steps: 4 }); await sleep(500);
    if (app === 'Clavis') await p.screenshot({ path: path.join(OUT, 'clavis_day.png'), clip });
    const seen = new Set();
    for (let i = 0; i < 12; i++) { await p.mouse.down(); await sleep(60); await p.mouse.up(); await sleep(140); seen.add(await p.evaluate(() => document.querySelector('#page-folders .ig-ls.ig-key').getAttribute('data-r402'))); await sleep(1000); }
    seen.forEach((x) => seenAll.add(x));
    ok(![...seen].some((x) => x === 'twirl' || x === 'flip'), app + ': no press turns it sideways (no twirl, no flip): ' + [...seen].join(', '), [...seen]);
    if (app === 'Clavis') { await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await sleep(1500); await p.screenshot({ path: path.join(OUT, 'clavis_night.png'), clip }); await p.evaluate(() => document.body.setAttribute('data-theme', 'day')); await sleep(800); }
  }
  ok(seenAll.has('knock') || seenAll.has('lift'), 'the door\'s knock and the lift of its layers are among the presses', [...seenAll]);
  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
