// node rig/t_812_welcome_orbit.js <page url> <picture folder>
// Ingenium 8.12 (modules/r410.js): the welcome on the Sign-in Orbit. Her words (28 November 2026), with a picture of the welcome card:
// "Ingenium still does not have the sphere sign-in Orbit page and I have been waiting all night for it ... Please push it through!"
// The orbit stood only behind a sign-in; a copy without one never showed it. Checks, on a fresh copy with no sign-in (nothing of hers):
//   the welcome stands on the orbit (ground, stars, two rings, the date in Latin); the greeting and the welcome's own words at the head;
//   the seal at the heart is the seal key; one orb, opening straight away; the welcome card is the plate at the foot with Enter, the lock
//   key and the theme keys; nothing covers anything; the orbit sits at the welcome's own layer; by night; on a phone; her orb enters and
//   the orbit gives way; the logo in the top bar opens it again; Enter closes it; turning the sign-in on keeps its own card; no error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let P = 0, F = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? P++ : F++; };
const hit = (a, b) => a && b && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  const ready = () => p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 500 });
  const look = () => p.evaluate(() => { const st = document.getElementById('sioStage'), q = (s) => document.querySelector(s), R = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const orb = q('#sioStage .sio-box .sio-orb');
    return { on: document.body.classList.contains('sio-on') && !!st && getComputedStyle(st).display !== 'none', welcome: !!(st && st.classList.contains('welcome')), night: !!(st && st.classList.contains('night')),
      z: st ? getComputedStyle(st).zIndex : '', stars: st ? st.querySelectorAll('.sio-stars i').length : 0, rings: st ? st.querySelectorAll('.sio-ring').length : 0,
      date: (q('#sioStage .sio-date') || {}).textContent || '', hello: (q('#sioStage .sio-hello') || {}).textContent || '', sub: (q('#sioStage .sio-sub') || {}).textContent || '',
      seal: R(q('#sioStage .sio-centre .hx-seal')), sealKey: !!q('#sioStage .sio-centre .r175-seal'), orb: R(orb ? orb.querySelector('.sio-ball') : null), orbName: orb ? orb.querySelector('.sio-nm').textContent : '', orbState: orb ? orb.querySelector('.sio-stt').textContent : '', orbs: document.querySelectorAll('#sioStage .sio-box .sio-orb').length,
      plate: R(q('#introDoor .intro-card')), plateOn: !!q('#introDoor.sio'), enter: R(q('#introEnter')), lockKey: R(q('#introProtect')), theme: R(q('#introTheme')), head: R(q('#sioStage .sio-head')),
      cardSeal: (function () { const s = q('#introDoor .intro-seal'); return s ? getComputedStyle(s).display : 'none'; })(), wide: document.documentElement.scrollWidth <= innerWidth + 1 }; });
  await p.goto(URL_, { timeout: 600000 }); await ready();
  await p.evaluate(() => { localStorage.clear(); sessionStorage.clear(); }); await p.reload(); await ready(); await p.waitForTimeout(2500);
  let r = await look();
  ok(r.on && r.welcome && r.plateOn, 'the welcome stands on the orbit', r);
  ok(r.stars >= 40 && r.rings === 2 && /Novembris|Decembris|[A-Z][a-z]+ii|Aprilis|Maii/.test(r.date), 'its ground, its stars, its two rings, the date in Latin', { stars: r.stars, rings: r.rings, date: r.date });
  ok(/^Good (morning|afternoon|evening)/.test(r.hello) && /Your quiet room on this device/.test(r.sub) && /Press your orb to enter\.$/.test(r.sub), 'the greeting and the welcome\'s own words at the head', { h: r.hello, s: r.sub });
  ok(r.seal && r.seal.w >= 90 && r.sealKey && r.cardSeal === 'none', 'the seal at the heart is the seal key; the card\'s own seal gives way to it', { seal: r.seal, key: r.sealKey, cs: r.cardSeal });
  ok(r.orbs === 1 && r.orb && /Opens straight away/.test(r.orbState), 'one orb, hers, saying it opens straight away', { n: r.orbs, name: r.orbName, st: r.orbState });
  ok(r.plate && r.plate.bottom > 900 - 60 && Math.abs((r.plate.left + r.plate.right) / 2 - 720) < 3 && r.enter && r.lockKey && r.theme, 'the welcome card is the plate at the foot, with Enter, the lock key and the theme keys', { plate: r.plate });
  ok(!hit(r.plate, r.seal) && !hit(r.plate, r.orb) && !hit(r.seal, r.orb) && !hit(r.head, r.seal) && r.wide, 'nothing covers the seal, her orb or the words', { plate: r.plate, seal: r.seal, orb: r.orb, head: r.head });
  ok(r.z === '401', 'the orbit takes the welcome\'s own place among the layers', r.z);
  await p.screenshot({ path: path.join(OUT, '1_welcome_day.png') });
  // by night, with the theme keys on the plate
  await p.click('#introTheme .seg-btn[data-m="night"]'); await p.waitForTimeout(900); r = await look();
  ok(r.on && r.welcome && r.night, 'by night: the orbit\'s night ground', { night: r.night });
  await p.screenshot({ path: path.join(OUT, '2_welcome_night.png') });
  // on a phone
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(900); r = await look();
  ok(r.on && r.plate && r.seal && r.orb && !hit(r.plate, r.seal) && !hit(r.plate, r.orb) && r.seal.top >= 0 && r.wide && r.plate.right <= 390, 'on a phone: the plate, the seal and her orb stand clear, nothing off the screen', { plate: r.plate, seal: r.seal, orb: r.orb });
  await p.screenshot({ path: path.join(OUT, '3_welcome_phone.png') });
  await p.setViewportSize({ width: 1440, height: 900 }); await p.click('#introTheme .seg-btn[data-m="day"]'); await p.waitForTimeout(700);
  // her orb enters
  await p.click('#sioStage .sio-box .sio-orb'); await p.waitForTimeout(1600);
  r = await look(); const hidden = await p.evaluate(() => document.getElementById('introDoor').hasAttribute('hidden'));
  ok(!r.on && hidden, 'her orb enters: the welcome closes and the orbit gives way to the desk', { on: r.on, hidden });
  // the logo opens it again, at once on the orbit; Enter closes it
  await p.evaluate(() => { const b = document.getElementById('brandSealBtn'); if (b) b.click(); }); await p.waitForTimeout(400); r = await look();
  ok(r.on && r.welcome, 'the logo in the top bar opens the welcome again, on the orbit', { on: r.on, w: r.welcome });
  await p.click('#introEnter'); await p.waitForTimeout(1400); r = await look();
  ok(!r.on, 'Enter closes it and the orbit gives way', r.on);
  // turning the sign-in on, over the welcome: the setup keeps its own card
  await p.evaluate(() => { const b = document.getElementById('brandSealBtn'); if (b) b.click(); }); await p.waitForTimeout(400);
  await p.click('#introProtect'); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 10000 }); await p.waitForTimeout(500); r = await look();
  ok(!r.on, 'turning the sign-in on: its own card, as before (no orbit)', r.on);
  ok(errs.length === 0, 'no page error', errs);
  console.log(P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})();
