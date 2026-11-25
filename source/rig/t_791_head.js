// Ingenium 7.91: Memory's head opens the Memory section as its header (modules/r392.js), and Settings sorts the newer cards into their own
// sections (modules/r234.js). Her words (25 November 2026): "its a header for a reason and should be appropriately placed instead of
// looking like a last minute add-on."
//   node rig/t_791_head.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); p.setDefaultTimeout(120000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngMindHead && window.IngKnow && window.IngSettingsParts, null, { timeout: 600000 }); await sleep(2500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.evaluate(() => { IngChatMemory.open(); }); await sleep(3500);
  const shown = () => p.evaluate(() => { const h = document.getElementById('knHead'), pn = h && h.parentNode; if (!pn) return null; return [...pn.children].filter(c => c.offsetHeight > 0 && getComputedStyle(c).display !== 'none' && (c.classList.contains('card') || c.id === 'knHead')).map(c => c.id || c.className.split(' ').slice(0, 2).join('.')); });
  const m1 = await shown();
  const look = await p.evaluate(() => { const h = document.getElementById('knHead'), m = document.getElementById('memRoomCard'); const e = m && m.querySelector(':scope > .mr-eye'), t = m && m.querySelector(':scope > h2.mr-h'); return { next: h && h.nextElementSibling ? h.nextElementSibling.id : '', height: h ? h.offsetHeight : 0, eye: e ? getComputedStyle(e).display : 'none', title: t ? getComputedStyle(t).display : 'none' }; });
  ok(m1 && m1[0] === 'knHead' && m1.indexOf('memRoomCard') === 1 && m1.indexOf('knRoom') > 1 && look.next === 'memRoomCard' && look.height >= 400, "Memory opens on the mind, its header, first; then Memory's own card and What Ingenium knows", { m1, look });
  ok(look.eye === 'none' && look.title === 'none', "Memory's own card no longer repeats a header of its own under it", look);
  await p.screenshot({ path: OUT + '/memory_top.png' });
  await p.evaluate(() => IngSettingsParts.show('data', 'backup', false)); await sleep(900); const bk = await shown();
  ok(bk && bk.indexOf('knHead') < 0 && bk.indexOf('knRoom') < 0 && ['bkCard', 'rpCard', 'sbCard'].every(x => bk.indexOf(x) >= 0), 'Back up and move: the backup, restore points and scheduled backups, and no mind', bk);
  await p.evaluate(() => IngSettingsParts.show('data', 'lock', false)); await sleep(900); const lk = await shown();
  ok(lk && ['knHead', 'knRoom', 'rpCard', 'sbCard'].every(x => lk.indexOf(x) < 0), 'Sign-in and reset: none of Memory, restore points or scheduled backups', lk);
  // a star pressed opens its facts, in view, under Memory
  await p.evaluate(() => IngSettingsParts.show('data', 'memory', false)); await sleep(900);
  await p.evaluate(() => { document.getElementById('knHead').scrollIntoView({ block: 'start' }); }); await sleep(1200);
  const pt = await p.evaluate(() => { const r = document.querySelector('#knHead canvas').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  let hit = null; for (let gx = 0.5; gx < 0.97 && !hit; gx += 0.015) for (let gy = 0.1; gy < 0.92 && !hit; gy += 0.025) { const x = pt.x + pt.w * gx, y = pt.y + pt.h * gy; await p.mouse.move(x, y); const c = await p.evaluate(() => document.querySelector('#knHead canvas').style.cursor); if (c === 'pointer') hit = { x, y }; }
  let facts = null; if (hit) { await p.mouse.click(hit.x, hit.y); await sleep(2500); facts = await p.evaluate(() => { const r = document.getElementById('knRoom'), b = r.getBoundingClientRect(); return { on: r.classList.contains('dx-on'), shown: getComputedStyle(r).display !== 'none', inView: b.top < innerHeight && b.bottom > 0 }; }); }
  ok(hit && facts && facts.on && facts.shown && facts.inView, 'a star pressed opens its facts in view, under Memory', { hit, facts });
  // a phone: the words above the mind, nothing wider than the screen
  await p.setViewportSize({ width: 390, height: 844 }); await p.evaluate(() => IngSettingsParts.show('data', 'memory', false)); await sleep(1500);
  await p.evaluate(() => document.getElementById('knHead').scrollIntoView({ block: 'start' })); await sleep(1200);
  const ph = await p.evaluate(() => { const h = document.getElementById('knHead').getBoundingClientRect(), w = document.querySelector('#knHead .kh-words').getBoundingClientRect(); return { hw: Math.round(h.width), ww: Math.round(w.width), wide: document.documentElement.scrollWidth > innerWidth + 1, top: Math.round(w.top - h.top) }; });
  await p.screenshot({ path: OUT + '/memory_phone.png' });
  ok(!ph.wide && ph.ww <= ph.hw && ph.top < 40, 'on a phone the words stand at the top of the header, nothing wider than the screen', ph);
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
