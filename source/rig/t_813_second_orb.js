// node rig/t_813_second_orb.js <page url> <picture folder>
// Ingenium 8.13 (modules/r410.js): a second orb on the welcome orbit. Her words (28 November 2026): "I want a second orb added to the new
// sign-in for another profile or user login into my master edition of Ingenium". Checks, on a fresh master copy with invented people:
//   with no other profile, two orbs: hers first (opening straight away), and Someone else (+, Add their profile), one each side of the seal,
//   nothing covered, by day, by night and on a phone; Someone else leads to Profiles on this device; with a Guest profile, its own orb
//   (opening straight away) and no Someone else; pressing it opens Ingenium in that profile; no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let P = 0, F = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? P++ : F++; };
const hit = (a, b) => a && b && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  const ready = () => p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 500 });
  const orbs = () => p.evaluate(() => [...document.querySelectorAll('#sioStage .sio-box .sio-orb')].map((o) => { const r = o.querySelector('.sio-ball').getBoundingClientRect(), c = o.getBoundingClientRect();
    return { id: o.getAttribute('data-p'), name: o.querySelector('.sio-nm').textContent, letter: o.querySelector('.sio-ball b').textContent, state: o.querySelector('.sio-stt').textContent, dim: o.classList.contains('dim'), label: o.getAttribute('aria-label'),
      box: { left: c.left, right: c.right, top: c.top, bottom: c.bottom } }; }));
  const rect = (s) => p.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom }; }, s);
  await p.goto(URL_, { timeout: 600000 }); await ready();
  await p.evaluate(() => { localStorage.clear(); sessionStorage.clear(); }); await p.reload(); await ready(); await p.waitForTimeout(2500);
  // A. no other profile: her orb and Someone else
  let o = await orbs();
  ok(o.length === 2 && !o[0].dim && /Opens straight away/.test(o[0].state), 'two orbs: hers first, opening straight away', o);
  ok(o[1] && o[1].name === 'Someone else' && o[1].letter === '+' && o[1].state === 'Add their profile' && o[1].dim && /add a profile/.test(o[1].label), 'the second orb is Someone else, to add their profile', o[1]);
  const seal = await rect('#sioStage .sio-centre .hx-seal'), plate = await rect('#introDoor .intro-card');
  ok(o.length === 2 && !hit(o[0].box, o[1].box) && !hit(o[1].box, seal) && !hit(o[1].box, plate) && o[0].box.right < seal.left && o[1].box.left > seal.right, 'one orb each side of the seal, nothing covered', { o: o.map((x) => x.box), seal, plate });
  await p.screenshot({ path: path.join(OUT, '1_two_orbs_day.png') });
  await p.click('#introTheme .seg-btn[data-m="night"]'); await p.waitForTimeout(800); await p.screenshot({ path: path.join(OUT, '2_two_orbs_night.png') });
  await p.click('#introTheme .seg-btn[data-m="day"]'); await p.waitForTimeout(500);
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(900); o = await orbs();
  const seal2 = await rect('#sioStage .sio-centre .hx-seal'), plate2 = await rect('#introDoor .intro-card');
  ok(o.length === 2 && !hit(o[0].box, o[1].box) && !hit(o[0].box, plate2) && !hit(o[1].box, plate2) && o.every((x) => x.box.left >= 0 && x.box.right <= 390), 'on a phone: both orbs on the screen, clear of the plate', { o: o.map((x) => x.box), seal2, plate2 });
  await p.screenshot({ path: path.join(OUT, '3_two_orbs_phone.png') });
  await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(500);
  // Someone else leads to Profiles on this device
  await p.click('#sioStage .sio-box .sio-orb[data-p="__sio_new"]'); await p.waitForTimeout(3500);
  const st = await p.evaluate(() => { const c = document.getElementById('profCard'); return { on: document.body.classList.contains('sio-on'), intro: document.getElementById('introDoor').hasAttribute('hidden'), card: !!(c && c.offsetParent), page: (document.querySelector('.page.active,.page:not([hidden])') || {}).id || '' }; });
  ok(!st.on && st.intro && st.card, 'Someone else: the welcome gives way and Profiles on this device opens, where a profile is added', st);
  // B. a Guest profile on this device: it stands on the orbit as its own orb, and pressing it opens that profile
  await p.evaluate(() => { localStorage.setItem('ingenium_profiles', JSON.stringify({ v: 1, cur: 'owner', list: [{ id: 'owner', name: 'You', t: 0, pw: 'always' }, { id: 'g1', name: 'Guest', t: 3, pw: 'none' }] })); });
  await p.evaluate(() => { const b = document.getElementById('brandSealBtn'); if (b) b.click(); }); await p.waitForTimeout(700);
  o = await orbs();
  ok(o.length === 2 && o[1].name === 'Guest' && o[1].letter === 'G' && o[1].state === 'Opens straight away' && !o.some((x) => x.id === '__sio_new'), 'with a Guest profile: its own orb, opening straight away, and no Someone else', o);
  await p.screenshot({ path: path.join(OUT, '4_guest_orb.png') });
  const nav = p.waitForEvent('framenavigated', { timeout: 20000 }).then(() => true, () => false);
  await p.click('#sioStage .sio-box .sio-orb[data-p="g1"]'); const went = await nav; await p.waitForTimeout(4000);
  const cur = await p.evaluate(() => { try { return JSON.parse(localStorage.getItem('ingenium_profiles')).cur; } catch (e) { return null; } });
  ok(went && cur === 'g1', 'pressing the Guest orb opens Ingenium in the Guest profile', { went, cur });
  ok(errs.length === 0, 'no page error', errs);
  console.log(P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})();
