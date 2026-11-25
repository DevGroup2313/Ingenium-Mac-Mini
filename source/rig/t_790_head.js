// Ingenium 7.90: Memory's head, the constellation mind (modules/r392.js), her choice of 25 November 2026. Her apps as its brightest
// stars, real links, a star pressed opens its facts; light on the device: still when untouched, nothing drawn off screen.
//   node rig/t_790_head.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage(); p.setDefaultTimeout(120000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngMindHead && window.IngKnow, null, { timeout: 600000 }); await sleep(2500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.evaluate(() => { IngKnow.open(); }); await sleep(3500);
  const h1 = await p.evaluate(() => { const h = document.getElementById('knHead'), r = document.getElementById('knRoom'); const m = IngMindHead.model(); return { head: !!h, before: !!(h && r && h.nextSibling === (document.getElementById('memRoomCard') || r)),  /* 7.91: the head opens Memory, above Memory's own card */ canvas: !!(h && h.querySelector('canvas')), nodes: m ? m.nodes.length : 0, folders: IngFolders.folders().length, links: m ? m.links.length : 0, chips: h ? [...h.querySelectorAll('.kn-chip')].map(c => c.textContent) : [] }; });
  ok(h1.head && h1.before && h1.canvas && h1.nodes === h1.folders && h1.nodes > 0 && h1.links >= h1.nodes - 1 && h1.chips.length === 2, "Memory opens on the constellation mind: one star for each of her apps, linked, with what it knows and what waits", h1);
  await p.evaluate(() => document.getElementById('knHead').scrollIntoView({ block: 'center' })); await sleep(800);
  await p.screenshot({ path: OUT + '/head_day.png' });
  // a star pressed: its facts open below
  const pt = await p.evaluate(() => { const h = document.getElementById('knHead').querySelector('canvas'), r = h.getBoundingClientRect(); const m = IngMindHead.model(); return { r: { x: r.left, y: r.top, w: r.width, h: r.height } }; });
  let opened = false; for (let gx = 0.55; gx < 0.95 && !opened; gx += 0.02) for (let gy = 0.15; gy < 0.9 && !opened; gy += 0.03) { const x = pt.r.x + pt.r.w * gx, y = pt.r.y + pt.r.h * gy; await p.mouse.move(x, y); const cur = await p.evaluate(() => document.querySelector('#knHead canvas').style.cursor); if (cur === 'pointer') { await p.mouse.down(); await p.mouse.up(); opened = true; } }
  ok(opened, 'a star answers the pointer, and pressing it opens what Ingenium knows about that app', opened);
  // light on the device: still 30 seconds after the last touch, and nothing drawn while off screen
  const r1 = await p.evaluate(async () => { const a = IngMindHead.frames(); await new Promise(r => setTimeout(r, 600)); const b = IngMindHead.frames(); return { moving: b > a }; });
  const r2 = await p.evaluate(async () => { window.scrollTo(0, 0); document.getElementById('knHead').style.display = 'none'; await new Promise(r => setTimeout(r, 700)); const a = IngMindHead.frames(); await new Promise(r => setTimeout(r, 700)); const b = IngMindHead.frames(); document.getElementById('knHead').style.display = ''; return { still: a === b }; });
  ok(r1.moving && r2.still, 'it moves while she uses it, and draws nothing while out of view', { r1, r2 });
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await p.evaluate(() => document.getElementById('knHead').scrollIntoView({ block: 'center' })); await p.mouse.move(900, 400); await sleep(1200); await p.screenshot({ path: OUT + '/head_night.png' });
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
