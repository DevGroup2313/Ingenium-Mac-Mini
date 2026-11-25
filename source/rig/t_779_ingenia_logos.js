// Ingenium 7.79: Ingenia's app logos are Lector's and Fabrica's 3D logos (modules/r378.js), and Clavis's face is see-through
// (apps/clavis_clear_face.py). Her words (25 November 2026): "I just want the apps logos to be animated buttons and have the same 3D look
// and effect on the Ingenia page that they have on the Fabrica and Lector page"; "The Clavis logo is transluscent on the inside, it does
// not have any coloured fillins"; "I want this logo made see through inside of Ingenium, do not overcomplicate it."
//   node rig/t_779_ingenia_logos.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2), URL_ = args.find(a => /^https?:\/\//.test(a)), OUT = args.find(a => !/^https?:\/\//.test(a)) || '/tmp';
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('folders'); });
  await sleep(4000);
  // 1. every app logo on the page is made as Fabrica's: its seal in layers, at their depths, with its cast
  const d = await p.evaluate(() => { const pg = document.getElementById('page-folders'), all = [...pg.querySelectorAll('.ig-ls')];
    return { n: all.length, flat: [...pg.querySelectorAll('img.fd-seal:not(.fd-wm)')].map(e => e.getAttribute('data-fd-seal')), layered: all.filter(e => e.querySelectorAll('img.ig-ls-l').length >= 4 && e.querySelector('.ig-ls-cast')).length,
      sized: all.filter(e => e.getBoundingClientRect().height > 10).length, sway: all.filter(e => getComputedStyle(e.querySelector('.ig-ls-idle')).animationName === 'igSway').length, keys: [...new Set(all.map(e => e.getAttribute('data-fd-seal')))] }; });
  ok(d.n >= 6 && d.flat.length === 0 && d.layered === d.n, 'every app logo on Ingenia is its seal in layers, with its cast; none is left a flat picture', d);
  ok(d.sized === d.n && d.sway === d.n, 'each stands at its size and sways, as on Fabrica', d);
  // 2. the open folder's logo: tilts to follow the pointer and lifts; pressed, it sinks
  await p.evaluate(() => { const f = (state.projects || []).find(x => x.kind === 'app' && /clavis/i.test(x.name)) || (state.projects || []).find(x => x.kind === 'app'); state.folders.ui.open = f.id; IngFolders.paint(); });
  await sleep(2000);
  const r = await p.evaluate(() => { const e = document.querySelector('#page-folders .fd-oh .ig-ls'); if (!e) return null; e.scrollIntoView({ block: 'center' }); const q = e.getBoundingClientRect(); return [q.x, q.y, q.width, q.height, e.getAttribute('data-fd-seal')]; });
  ok(r && r[3] > 40, 'the open folder carries its app\'s 3D logo', r);
  if (r) { await sleep(400); const q = await p.evaluate(() => { const e = document.querySelector('#page-folders .fd-oh .ig-ls').getBoundingClientRect(); return [e.x, e.y, e.width, e.height]; });
    await p.mouse.move(q[0] + q[2] * .85, q[1] + q[3] * .2); await sleep(500);
    const h = await p.evaluate(() => { const e = document.querySelector('#page-folders .fd-oh .ig-ls'); return { cls: e.className, ry: parseFloat(e.style.getPropertyValue('--ry')), rx: parseFloat(e.style.getPropertyValue('--rx')) }; });
    ok(/hov/.test(h.cls) && h.ry > 3 && h.rx > 1, 'under the pointer it tilts to follow it and lifts', h);
    await p.mouse.down(); await sleep(150); const dn = await p.evaluate(() => document.querySelector('#page-folders .fd-oh .ig-ls').classList.contains('down')); await p.mouse.up();
    ok(dn, 'pressed, it sinks');
    await p.screenshot({ path: OUT + '/ingenia_head.png', clip: { x: Math.max(0, q[0] - 30), y: Math.max(0, q[1] - 30), width: 560, height: q[3] + 70 } }); }
  // 3. by night, the night layers
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await sleep(1200);
  const nt = await p.evaluate(() => [...document.querySelectorAll('#page-folders .ig-ls')].map(e => e.getAttribute('data-ig')));
  ok(nt.length && nt.every(k => /N(:own)?$/.test(k) || !(window.LX7_LAYERS || {})[k.replace(/:own$/, '') + 'N']), 'by night each wears its night layers', nt);
  // 4. Clavis's face is see-through, in its plate and in its flat seal, by day and by night
  const cl = await p.evaluate(async () => { const L = window.LX7_LAYERS || {}; if (!L.clavis) return null;
    async function face(src) { const im = new Image(); im.src = src; await im.decode(); const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight; const g = c.getContext('2d'); g.drawImage(im, 0, 0);
      const W = c.width, H = c.height, pts = [[.38, .55], [.62, .7], [.45, .75], [.6, .48]]; return pts.map(([x, y]) => g.getImageData(Math.round(x * W), Math.round(y * H), 1, 1).data[3]); }
    return { day: await face(L.clavis[0].src), night: await face(L.clavisN[0].src) }; });
  ok(cl === null || (cl.day.filter(a => a < 60).length >= 3 && cl.night.filter(a => a < 60).length >= 3), 'Clavis\'s face is see-through by day and by night (its plate\'s face pixels nearly clear)', cl);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
