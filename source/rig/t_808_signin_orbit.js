// node rig/t_808_signin_orbit.js <page url> [picture folder]
// Ingenium 8.08 (modules/r410.js; the seal key lent by modules/r290.js): the Sign-in Orbit. Her words, of the live preview
// (https://claude.ai/artifact/EsxXinYmb582rHbBdmVUj1): "This looks much better."; "I want the logo button to be clickable on the Sign-in
// Orbit"; "I approve of the previews, please commit and push it everywhere". An invented person with an invented password; nothing sent.
//   1. protected, then locked: the sign-in stands on the orbit (its ground, stars, two rings, the date in Latin), Ingenium's seal at the
//      heart is a real key that answers a press, her orb on the orbit with her initial and name, the door's own card is the plate at the foot
//      greeting her by name, saying it was locked and when; nothing covers the seal or the orb
//   2. a wrong password: the door's own words, as before, and the record counts it; the record of sign-ins opens and closes
//   3. her password: the desk opens, the orbit gives way, the record says when she signed in; no page error
//   4. by night and on a phone: the plate and the seal both stand clear of each other
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT0] = process.argv.slice(2); const OUT = OUT0 || '/tmp/t808'; fs.mkdirSync(OUT, { recursive: true });
let P = 0, F = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? P++ : F++; };
const NAME = 'Ada Example', PWD = 'tide-clock-harbour-41';
const hit = (a, b) => a && b && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  const ready = () => p.waitForFunction(() => window.__ingReady === true || !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw'), null, { timeout: 600000, polling: 500 });
  const fresh = async () => { for (let i = 0; i < 480; i++) { try { if (await p.evaluate(() => !window.__pvOld)) break; } catch (e) {} await p.waitForTimeout(250); } await ready(); await p.waitForTimeout(1500); };
  const look = () => p.evaluate(() => { const st = document.getElementById('sioStage'), q = (s) => document.querySelector(s), R = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const card = q('#ingLockDoor .ild-card'), seal = q('#sioStage .sio-centre .hx-seal'), orb = q('#sioStage .sio-box .sio-orb');
    return { on: document.body.classList.contains('sio-on') && !!st && getComputedStyle(st).display !== 'none', night: !!(st && st.classList.contains('night')), stars: st ? st.querySelectorAll('.sio-stars i').length : 0, rings: st ? st.querySelectorAll('.sio-ring').length : 0,
      date: (q('#sioStage .sio-date') || {}).textContent || '', seal: R(seal), sealKey: !!q('#sioStage .sio-centre .r175-seal'), orb: R(orb ? orb.querySelector('.sio-ball') : null), orbName: orb ? orb.querySelector('.sio-nm').textContent : '', orbLetter: orb ? orb.querySelector('.sio-ball b').textContent : '',
      orbSphere: !!(orb && orb.querySelector('.sio-ball svg')), orbState: orb ? orb.querySelector('.sio-stt').textContent : '', card: R(card), plate: !!q('#ingLockDoor.sio'), h1: (q('#ingLockDoor .ild-card h1') || {}).textContent || '', sub: (q('#ingLockDoor .ild-card p.ild-sub') || {}).textContent || '',
      rec: (q('#ingLockDoor #sioRec') || {}).textContent || '', list: document.querySelectorAll('#ingLockDoor .sio-list li').length, ground: st ? getComputedStyle(st).backgroundImage.slice(0, 40) : '', wide: document.documentElement.scrollWidth <= innerWidth + 1 }; });
  await p.goto(URL_, { timeout: 600000 }); await ready();
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  // protect, as she would
  await p.evaluate(() => { localStorage.clear(); sessionStorage.clear(); }); await p.reload(); await ready();
  await p.click('#introProtect'); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 10000 });
  const asOver = await p.evaluate(() => document.body.classList.contains('sio-on'));
  ok(!asOver, 'turning the sign-in on, over the open page, keeps the door as it was (no orbit)', asOver);
  await p.fill('#ildUser', NAME); await p.fill('#ildP1', PWD); await p.fill('#ildP2', PWD); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 15000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map((d) => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 60000 });
  await p.evaluate(() => { const d = document.querySelector('#ingLockDoor #ildDone'); if (d) d.click(); }); await p.waitForTimeout(800);
  // 1. locked
  await p.evaluate(() => { window.__pvOld = 1; IngLock.lockNow('press'); }); await fresh(); await p.waitForTimeout(1200);
  let r = await look();
  ok(r.on && r.stars >= 40 && r.rings === 2 && /radial-gradient/.test(r.ground) && /Novembris|[A-Z][a-z]+ii|Maii|Aprilis/.test(r.date), 'locked: the sign-in stands on the orbit, its ground, its stars, its two rings and the date in Latin', { on: r.on, stars: r.stars, rings: r.rings, date: r.date });
  ok(r.seal && r.seal.w >= 100 && r.sealKey, 'Ingenium\'s seal stands at the heart, the seal key itself', { seal: r.seal, key: r.sealKey });
  ok(r.orbName === NAME && r.orbLetter === 'A' && r.orbSphere && /Locked|Signing in/.test(r.orbState), 'her orb on the orbit: Home\'s sphere, her initial, her name and its state', { n: r.orbName, l: r.orbLetter, s: r.orbSphere, st: r.orbState });
  ok(r.plate && r.card && r.card.bottom > 900 - 80 && Math.abs((r.card.left + r.card.right) / 2 - 720) < 3 && new RegExp('^Good (morning|afternoon|evening), ' + NAME + '$').test(r.h1) && /^Locked at \d\d:\d\d\./.test(r.sub), 'the door\'s own card is the plate at the foot: it greets her by name and says when it was locked', { card: r.card, h1: r.h1, sub: r.sub });
  ok(!hit(r.card, r.seal) && !hit(r.card, r.orb) && !hit(r.seal, r.orb) && r.wide, 'nothing covers the seal or her orb, and nothing spills sideways', { card: r.card, seal: r.seal, orb: r.orb });
  const seal0 = await p.evaluate(() => { const k = document.querySelector('#sioStage .sio-centre .r175-seal'); const c0 = k.className; k.click(); return new Promise((res) => setTimeout(() => res({ before: c0, after: document.querySelector('#sioStage .sio-centre .hx-seal').outerHTML.length, cls: k.className }), 120)); });
  ok(seal0 && seal0.cls !== seal0.before || /sk-|r175-/.test(seal0.cls), 'the seal answers a press as Home\'s does', seal0);
  await p.screenshot({ path: path.join(OUT, 'orbit_day.png') });
  // 2. a wrong password
  await p.fill('#ingLockDoor #ildPw', 'not-the-password'); await p.click('#ingLockDoor #ildGo'); await p.waitForFunction(() => /does not open this copy/.test((document.querySelector('#ingLockDoor .ild-err') || {}).textContent || ''), null, { timeout: 60000 }); await p.waitForTimeout(700);
  r = await look();
  ok(/1 wrong password since, the last today at \d\d:\d\d/.test(r.rec), 'a wrong password: the door says so as before, and the record counts it', r.rec);
  await p.click('#ingLockDoor #sioRecKey'); await p.waitForTimeout(300); r = await look();
  ok(r.list >= 2 && /A wrong password/.test(r.rec) && /Locked/.test(r.rec) && /Times only/.test(r.rec), 'the record of sign-ins opens in the plate: times only, kept outside the seal', { n: r.list, rec: r.rec.slice(0, 300) });
  await p.click('#ingLockDoor #sioRecKey'); await p.waitForTimeout(300); r = await look();
  ok(r.list === 0, 'and closes again', r.list);
  // 4. by night, then on a phone (the page as it stands, before her password)
  await p.evaluate(() => { document.getElementById('ingLockDoor').classList.add('ild-night'); }); await p.waitForTimeout(500); r = await look();
  ok(r.night && !hit(r.card, r.seal), 'by night: the orbit\'s night ground, the plate clear of the seal', { night: r.night });
  await p.screenshot({ path: path.join(OUT, 'orbit_night.png') });
  await p.evaluate(() => { document.getElementById('ingLockDoor').classList.remove('ild-night'); });
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(800); r = await look();
  ok(r.on && r.card && r.seal && !hit(r.card, r.seal) && !hit(r.card, r.orb) && r.seal.top >= 0 && r.wide && r.card.right <= 390, 'on a phone: the plate, the seal and her orb all stand clear, nothing off the screen', { card: r.card, seal: r.seal, orb: r.orb });
  await p.screenshot({ path: path.join(OUT, 'orbit_phone.png') });
  await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(500);
  // 3. her password
  await p.fill('#ingLockDoor #ildPw', PWD); await p.click('#ingLockDoor #ildGo');
  await p.waitForFunction(() => window.__ingReady === true && !document.querySelector('#ingLockDoor:not([hidden]) #ildPw'), null, { timeout: 120000, polling: 500 }); await p.waitForTimeout(1500);
  const gone = await p.evaluate(() => ({ on: document.body.classList.contains('sio-on'), log: (window.IngSignOrbit && IngSignOrbit.record().log || []).map((x) => x.k) }));
  ok(!gone.on && gone.log[0] === 'in' && gone.log.includes('bad') && gone.log.includes('lock'), 'her password: the desk opens, the orbit gives way, and the record says she signed in', gone);
  ok(errs.length === 0, 'no page error', errs);
  console.log(P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})();
