// Ingenium: Memoria, Memory, Ingenium Cloud and Back up and move on a page of their own (modules/r396.js). Her words (25 November 2026): "put them together
// in their own page under a new page name that better fits them and the rest of the app".
//   node rig/t_794_memoria.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); p.setDefaultTimeout(120000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngMemoria && window.IngMindHead && window.IngKnow, null, { timeout: 600000 }); await sleep(4000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const act = () => p.evaluate(() => (document.querySelector('section.active') || {}).id || '');
  const a0 = await act();
  const nav = await p.evaluate(() => { const L = [...document.querySelectorAll('.nav-btn')].map(b => b.getAttribute('data-page')); return { L, at: L.indexOf('memoria'), after: L[L.indexOf('memoria') - 1] }; });
  ok(a0 !== 'page-memoria' && nav.at > 0 && nav.after === 'folders', 'Memoria in the side bar under Studio, after Ingenia; Ingenium does not open on it', { a0, nav });
  await p.evaluate(() => go('memoria')); await sleep(3000);
  const h = await p.evaluate(() => { const k = document.querySelector('#mmHeadSlot #knHead'); return { head: !!k, title: k ? k.querySelector('h2').textContent : '', height: k ? k.offsetHeight : 0, canvas: !!(k && k.querySelector('canvas')), stars: IngMindHead.model() ? IngMindHead.model().nodes.length : 0 }; });
  ok(h.head && h.title === 'Memoria' && h.height >= 440 && h.canvas && h.stars > 0, 'Memoria opens on its head: the constellation mind, with the page\'s name', h);
  await p.screenshot({ path: OUT + '/memoria_day.png' });
  const rooms = [];
  for (const k of ['knows', 'chats', 'cloud', 'backup']) { await p.evaluate(k => IngMemoria.show(k, false), k); await sleep(700);
    rooms.push(await p.evaluate(k => { const P = document.getElementById('mmPanel'); const on = [...P.children].filter(c => getComputedStyle(c).display !== 'none').map(c => c.id); const t = document.getElementById('mmT-' + k); return { k, on, sel: t.getAttribute('aria-selected') }; }, k)); }
  ok(rooms[0].on.join() === 'mmAtlas' && rooms[1].on.join() === 'memRoomCard' && rooms[2].on.join() === 'cloudCard' && rooms[3].on.join() === 'bkCard,rpCard,sbCard' && rooms.every(r => r.sel === 'true'), 'four rooms, one at a time: What it knows, From your chats, Ingenium Cloud, Back up and move (the backup, restore points, scheduled backups)', rooms);
  const big = await p.evaluate(() => [...document.querySelectorAll('#mmPanel svg')].filter(s => s.getBoundingClientRect().width > 120).length);
  ok(big === 0, 'every card drawn as in Settings (no icon out of size)', big);
  // a star pressed: What it knows opens, in view
  await p.evaluate(() => { IngMemoria.show('cloud', false); window.scrollTo(0, 0); }); await sleep(800);
  const pt = await p.evaluate(() => { const r = document.querySelector('#knHead canvas').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  let hit = null; for (let gx = 0.5; gx < 0.97 && !hit; gx += 0.015) for (let gy = 0.1; gy < 0.92 && !hit; gy += 0.025) { const x = pt.x + pt.w * gx, y = pt.y + pt.h * gy; await p.mouse.move(x, y); if (await p.evaluate(() => document.querySelector('#knHead canvas').style.cursor) === 'pointer') hit = { x, y }; }
  let st = null; if (hit) { await p.mouse.click(hit.x, hit.y); await sleep(2500); st = await p.evaluate(() => ({ page: (document.querySelector('section.active') || {}).id, room: IngMemoria.room(), shown: !!document.getElementById('mmAtlas') && getComputedStyle(document.getElementById('mmAtlas')).display !== 'none', plate: window.IngAtlas ? IngAtlas.plate() : null })); }
  ok(hit && st && st.page === 'page-memoria' && st.room === 'knows' && st.shown && /^app:/.test(st.plate || ''), 'a star pressed opens What it knows, on Memoria, at that app\'s plate of the atlas (7.99)', { hit, st });
  // what opened Memory or Ingenium Cloud in Settings opens Memoria
  await p.evaluate(() => go('home')); await sleep(800); await p.evaluate(() => IngChatMemory.open()); await sleep(1500);
  const o1 = await p.evaluate(() => ({ page: (document.querySelector('section.active') || {}).id, room: IngMemoria.room() }));
  await p.evaluate(() => go('home')); await sleep(800); await p.evaluate(() => IngSettingsParts.show('data', 'cloud', true)); await sleep(1500);
  const o2 = await p.evaluate(() => ({ page: (document.querySelector('section.active') || {}).id, room: IngMemoria.room() }));
  await p.evaluate(() => go('home')); await sleep(800); await p.evaluate(() => IngSettingsParts.show('data', 'backup', true)); await sleep(1500);
  const o3 = await p.evaluate(() => ({ page: (document.querySelector('section.active') || {}).id, room: IngMemoria.room() }));
  ok(o1.page === 'page-memoria' && o1.room === 'chats' && o2.page === 'page-memoria' && o2.room === 'cloud' && o3.page === 'page-memoria' && o3.room === 'backup', 'Memory, Ingenium Cloud and Back up and move, opened from anywhere, open in Memoria', { o1, o2, o3 });
  // Settings keeps a card that opens Memoria
  await p.evaluate(() => { go('settings'); try { IngRooms.open('settings', 'data'); } catch (e) {} }); await sleep(1200);
  await p.evaluate(() => { const t = document.getElementById('dxT-data-memory'); if (t) t.click(); }); await sleep(1000);
  const sc = await p.evaluate(() => { const c = document.getElementById('mmMovedMem'); return { shown: !!(c && c.offsetHeight > 0), mem: !!document.querySelector('#rmP-settings-data #memRoomCard') }; });
  await p.evaluate(() => { const b = document.querySelector('#mmMovedMem button'); if (b) b.click(); }); await sleep(1500);
  const sc2 = await p.evaluate(() => ({ page: (document.querySelector('section.active') || {}).id, room: IngMemoria.room() }));
  ok(sc.shown && !sc.mem && sc2.page === 'page-memoria' && sc2.room === 'chats', 'Settings, Your data, Memory: a card that opens Memoria', { sc, sc2 });
  // night, and a phone
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); go('memoria'); window.scrollTo(0, 0); }); await sleep(1500); await p.screenshot({ path: OUT + '/memoria_night.png' });
  await p.setViewportSize({ width: 390, height: 844 }); await sleep(1500);
  const ph = await p.evaluate(() => ({ wide: document.documentElement.scrollWidth > innerWidth + 1, w: Math.round(document.getElementById('knHead').getBoundingClientRect().width) }));
  await p.screenshot({ path: OUT + '/memoria_phone.png' });
  ok(!ph.wide && ph.w <= 390, 'on a phone nothing is wider than the screen', ph);
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
