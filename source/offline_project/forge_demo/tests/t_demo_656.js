// The Forge's demonstration from 656: its edition, its DEMO key and card, the lock on making apps and packages (Fabrica's
// keys and its More menu too), the one app it carries (Carpe Diem's Public sample), the Editor's switch (Carpe Diem, then
// Another app), no visible word of Inkwell or Ingenium on the Editor page or in the Guidebook, the tour, French, a phone.
// node t_demo_656.js <url> <outdir>
const pw = require('/opt/node-tools/node_modules/playwright');
const [URL_, OUT] = process.argv.slice(2); require('fs').mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light', acceptDownloads: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 300)));
  const downloads = []; p.on('download', d => downloads.push(d.suggestedFilename()));
  await p.goto(URL_, { timeout: 180000 }); await p.waitForTimeout(4000);
  const id = await p.evaluate(() => ({ ed: CD_BUILD.edition, edFr: CD_BUILD.editionFr, pass: CD_BUILD.pass, title: document.title, demo: window.FORGE_DEMO === true, locked: typeof cdLocked === 'function' && cdLocked() }));
  ok(id.ed === 'Demo' && id.edFr === 'Démo' && id.pass === '656' && /^The Forge · Demo/.test(id.title) && id.demo && id.locked, 'the page names itself the demonstration of Forge 656', JSON.stringify(id));
  const carried = await p.evaluate(() => window.__forgeLib && __forgeLib.carried().map(x => x.key + ' ' + x.version).join(', '));
  ok(carried === 'cd 1080', 'it carries Carpe Diem 1080 (the Public sample) alone', carried);
  await p.waitForFunction(() => !!window.__forgeBiLast, null, { timeout: 120000 }).catch(() => {});
  const last = await p.evaluate(() => window.__forgeBiLast);
  ok(last && last.kept === 1 && !last.failed, 'on its first start it keeps what it carries on this device', JSON.stringify(last));
  const key = await p.evaluate(() => { const k = document.getElementById('fg-demo-key'); if (!k) return null; const r = k.getBoundingClientRect(); const cs = getComputedStyle(k); return { t: k.textContent, x: Math.round(r.left), b: Math.round(innerHeight - r.bottom), w: Math.round(r.width), shadow: cs.boxShadow !== 'none' }; });
  ok(key && key.t === 'DEMO' && key.x < 30 && key.b < 30 && key.shadow, 'the DEMO key sits in the lower left corner, raised', JSON.stringify(key));
  await p.screenshot({ path: OUT + '/door.png' });
  await p.locator('#cd-door button', { hasText: 'Open the Editor' }).first().click({ timeout: 60000 }).catch(() => {});
  await p.waitForTimeout(3000);
  const seg = await p.evaluate(() => [...document.querySelectorAll('#edAppSeg button[data-app]')].filter(e => getComputedStyle(e).display !== 'none' && e.getAttribute('data-app') !== 'any').map(e => e.getAttribute('data-app') + (e.getAttribute('aria-pressed') === 'true' ? '*' : '')));
  ok(seg.length === 1 && seg[0] === 'cd*', 'the Editor offers the app it carries, chosen', JSON.stringify(seg));
  const order = await p.evaluate(() => [...document.querySelectorAll('#edAppSeg button[data-app]')].filter(e => getComputedStyle(e).display !== 'none').map(e => e.textContent.trim()));
  ok(order.length === 2 && /^Carpe Diem/.test(order[0]) && /^Another app/.test(order[1]), 'the Editor lists Carpe Diem, then Another app, and nothing else', JSON.stringify(order));
  const vis = await p.evaluate(() => document.body.innerText.match(/.{0,50}(Inkwell|Ingenium).{0,50}/g) || []);
  ok(vis.length === 0, 'no visible word names Inkwell or Ingenium on the Editor page', JSON.stringify(vis.slice(0, 4)));
  await p.evaluate(() => document.querySelector('#edAppSeg button[data-app="cd"]').click());
  await p.waitForFunction(() => window.__forgeLibLastOpen && window.__forgeLibLastOpen.app === 'cd', null, { timeout: 60000 }).catch(() => {});
  const o = await p.evaluate(() => ({ open: window.__forgeLibLastOpen, line: (document.getElementById('edLib') || {}).innerText || '' }));
  ok(o.open && o.open.app === 'cd' && /carried inside the Forge/.test(o.line), 'choosing Carpe Diem opens the copy the demonstration carries', JSON.stringify(o).slice(0, 200));
  await p.screenshot({ path: OUT + '/editor.png' });
  // the DEMO key opens its card
  await p.locator('#fg-demo-key').click({ force: true }); await p.waitForTimeout(400);
  const c1 = await p.evaluate(() => { const b = document.getElementById('fg-demo-back'), c = document.getElementById('fg-demo-card'); return { open: b.getAttribute('data-open'), why: c.getAttribute('data-why'), h: c.querySelector('h2').textContent, go: c.querySelector('.fg-demo-go').textContent, p1: c.querySelector('.fg-demo-p1').textContent }; });
  ok(c1.open === '1' && c1.why === '0' && c1.h === 'The Forge, a demonstration' && c1.go === 'Take the guided tour' && !/Inkwell/.test(c1.p1), 'the DEMO key opens a card that says what the demonstration is', JSON.stringify(c1));
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  ok(await p.evaluate(() => document.getElementById('fg-demo-back').getAttribute('data-open')) === '0', 'Escape closes it');
  // the lock: every control that makes an app or a package answers with the card, and nothing is downloaded
  const res = [];
  for (const idn of await p.evaluate(() => window.FORGE_DEMO_LOCKED)) {
    res.push(await p.evaluate((idn) => { const e = document.getElementById(idn); if (!e) return idn + ':missing'; document.getElementById('fg-demo-back').setAttribute('data-open', '0'); e.click(); const c = document.getElementById('fg-demo-card'); return idn + ':' + document.getElementById('fg-demo-back').getAttribute('data-open') + c.getAttribute('data-why'); }, idn));
  }
  await p.waitForTimeout(3000);
  ok(res.length === 12 && res.every(r => /:11$/.test(r)) && downloads.length === 0, 'each of the twelve controls that make an app or a package shows the card instead, and nothing is downloaded', res.join(' ') + ' | downloads ' + JSON.stringify(downloads));
  await p.evaluate(() => document.getElementById('fg-demo-back').setAttribute('data-open', '0'));
  await p.evaluate(() => { const f = document.getElementById('fold-ship'); if (f && !f.open) f.open = true; document.getElementById('shipHtml').scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(500);
  await p.locator('#shipHtml').click({ force: true }); await p.waitForTimeout(1500);
  const c2 = await p.evaluate(() => ({ open: document.getElementById('fg-demo-back').getAttribute('data-open'), why: document.querySelector('#fg-demo-card .fg-demo-why').textContent, note: (document.getElementById('fg-demo-shipnote') || {}).textContent || '' }));
  ok(c2.open === '1' && /shown, not made/.test(c2.why) && /makes nothing/.test(c2.note) && downloads.length === 0, 'pressing "The edited app as one HTML file" says why it is not made, and step 5 says so too', JSON.stringify(c2));
  // the tour from the card
  await p.evaluate(() => document.getElementById('fg-demo-back').setAttribute('data-open', '0'));
  await p.locator('#fg-demo-key').click({ force: true }); await p.waitForTimeout(300);
  await p.locator('#fg-demo-card .fg-demo-go').click({ force: true }); await p.waitForTimeout(2500);
  const tour = await p.evaluate(() => { const c = document.querySelector('.demo-tour-card, #demo-tour-card'); return c ? (c.innerText || '').slice(0, 120) : null; });
  ok(!!tour, 'the card\'s key starts the Forge\'s guided tour', tour);
  await p.screenshot({ path: OUT + '/tour.png' });
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  // French
  await p.evaluate(() => document.body.setAttribute('data-lang', 'fr')); await p.waitForTimeout(400);
  const frw = await p.evaluate(() => ({ key: document.getElementById('fg-demo-key').textContent, h: document.querySelector('#fg-demo-card h2').textContent, note: document.getElementById('fg-demo-shipnote').textContent.slice(0, 40) }));
  ok(frw.key === 'DÉMO' && frw.h === 'La Forge, une démonstration' && /^Dans la démonstration/.test(frw.note), 'in French the key, card and note speak French', JSON.stringify(frw));
  await p.evaluate(() => document.body.setAttribute('data-lang', 'en'));
  // Fabrica: its controls that make a package or a copy answer with the card, from its keys and its More menu
  await p.evaluate(() => { document.getElementById('fg-demo-back').setAttribute('data-open', '0'); FORGE.openRoom('fabrica'); }); await p.waitForTimeout(1200);
  const fid = await p.evaluate(async () => { const x = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><meta charset="utf-8"><title>Demo app</title><h1>Demo</h1>' }], { name: 'Demo app', msg: 'First version' }); window.__fbState().fabrica = window.__fbState().fabrica || {}; window.__fbState().fabrica.sel = x.id; await fbRender(); await new Promise(r => setTimeout(r, 900)); return x.id; });
  const fabLock = [];
  for (const sel of ['#fbMakeAll', '#fbTargets .f-btn', '#fbCopies .f-cp .f-btn']) {
    fabLock.push(await p.evaluate((sel) => { document.getElementById('fg-demo-back').setAttribute('data-open', '0'); const e = document.querySelector(sel); if (!e) return sel + ':missing'; e.disabled = false; e.click(); return sel + ':' + document.getElementById('fg-demo-back').getAttribute('data-open'); }, sel));
    await p.waitForTimeout(400);
  }
  const more = await p.evaluate(async () => { document.getElementById('fg-demo-back').setAttribute('data-open', '0'); const m = document.getElementById('fbMore'); if (!m) return 'fbMore:missing'; m.click(); await new Promise(r => setTimeout(r, 300));
    const it = [...document.querySelectorAll('#fb .f-menu button')].find(b => /^Save the whole history/.test(b.textContent.trim())); if (!it) return 'item:missing';
    it.click(); return 'bundle:' + document.getElementById('fg-demo-back').getAttribute('data-open'); });
  await p.waitForTimeout(1500);
  const fabState = await p.evaluate(async (id) => { const n = await IngRepo.notes(id, (await IngRepo.info(id)).head); return { made: Object.keys(n).filter(k => /onePage|webApp|kits/.test(k)), room: document.getElementById('room-fabrica').getAttribute('data-on') }; }, fid);
  ok(fabLock.every(r => /:1$/.test(r)) && more === 'bundle:1' && !fabState.made.length && fabState.room === '1' && downloads.length === 0, 'Fabrica is here, and its controls that make a package or a copy (its keys and its More menu) show the card: nothing is made or downloaded', fabLock.join(' ') + ' ' + more + ' ' + JSON.stringify(fabState));
  await p.evaluate(() => document.getElementById('fg-demo-back').setAttribute('data-open', '0'));
  // the Guidebook
  const gb = await p.evaluate(() => { const arts = [...document.querySelectorAll('article[data-group]')]; const all = arts.map(a => a.textContent).join(' ');
    return { inkArt: arts.filter(a => /The Editor: (Inkwell|Ingenium)/.test(a.textContent)).length, four: /Your four apps|Vos quatre apps/.test(all), carries: /The app it carries/.test(all) && /L’app qu’elle porte/.test(all), steps: /Carpe Diem, or Another app for a page of your own/.test(all) }; });
  ok(gb.inkArt === 0 && !gb.four && gb.carries && gb.steps, 'the Guidebook names Carpe Diem\'s demonstration alone, in English and French', JSON.stringify(gb));
  // its own storage: what it keeps is under forge-demo:, and nothing it keeps has a bare name
  const st = await p.evaluate(async () => { const raw = Object.getOwnPropertyDescriptor(Storage.prototype, 'key'); const ks = []; try { const L = window.localStorage; for (let i = 0; i < L.length; i++) ks.push(L.key(i)); } catch (e) {}
    let dbs = []; try { dbs = (await indexedDB.databases()).map(d => d.name); } catch (e) {} return { ls: ks.length, dbs: dbs.length, shim: !!document.getElementById('forge-own-store') }; });
  ok(st.shim, 'its own storage shim runs in the page', JSON.stringify(st));
  ok(errs.length === 0, 'no page errors', errs.slice(0, 3).join(' | '));
  // a phone
  const ph = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); const q = await ph.newPage();
  await q.goto(URL_, { timeout: 180000 }); await q.waitForTimeout(6000);
  const pk = await q.evaluate(() => { const k = document.getElementById('fg-demo-key'); const r = k.getBoundingClientRect(); return { x: Math.round(r.left), b: Math.round(innerHeight - r.bottom), sw: document.documentElement.scrollWidth }; });
  ok(pk.x < 30 && pk.b < 30 && pk.sw <= 390, 'on a phone the key sits in its corner and the page does not scroll sideways', JSON.stringify(pk));
  await q.screenshot({ path: OUT + '/phone.png' });
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close();
})().catch(e => { console.log('CRASH', e.message); process.exit(1); });
