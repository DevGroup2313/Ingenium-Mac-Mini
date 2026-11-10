// Home as an orrery (Ingenium 6.67, modules/r261.js). Her choice and words (10 November 2026): the Orrery "for the rest", her seal
// as the engine "continuously ... spinning and ... counterclockwise", "I don't want the circle around the logo seal. The big one can
// stay ... I also don't want it to be gold", "Remove the sphere from Fabrica!", "Remove the tiny moon from Build as well", the next
// step's keys at their own width with "the original look and animation preserved", no "Read the short Guide", and "I want the orbs
// to actually feel like 3D buttons like Ingenium's logo ... I want full parity with the rest of the app. I also don't want
// Ingenium's Engine to look flat either."
//   - the part runs; Home's head holds the orrery; the six room keys are in it, Home's own keys (their data-go, their words);
//   - the engine is Home's own seal key at the centre, larger, in deeper layers with a rim behind its face; its star turns
//     counterclockwise without stopping; there is no circle hugging the seal; the rings are purple, not gold;
//   - no orb carries a ring or a moon; the rooms travel counterclockwise;
//   - an orb answers the pointer as the seal does: it tilts and lifts, sinks on a press; the orbit stops; the room's words show;
//     a press opens the room;
//   - the card keeps its two keys at their own width side by side, without "Read the short guide";
//   - the greeting is in Ingenium's own Cormorant; Minimal motion and the tour keep it still; below 760 pixels the orrery in its phone layout (6.71), below 260 pixels Home keeps its grid;
//   - by night as by day; no page error.
//   node rig/t_667_orrery.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_667_orrery.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(400);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme(); go('home'); }); await p.waitForTimeout(2500);

  // 1. the orrery in Home's head, with Home's own keys
  const s1 = await p.evaluate(() => { const h = document.querySelector('#hx .hx-head'); return { part: window.__ingParts && window.__ingParts.p261, st: window.IngOrrery && IngOrrery.state(),
    on: document.getElementById('hx').classList.contains('ox-on'), inHead: [...h.querySelectorAll('.hx-keys .hx-key')].map(k => k.getAttribute('data-go')),
    workShown: getComputedStyle(document.querySelector('#hx .hx-work')).display, hh: h.getBoundingClientRect().height }; });
  ok(s1.part === 'running' && s1.st && s1.st.on && s1.on, 'the orrery runs in Home', s1);
  ok(s1.inHead.join(',') === 'chat,code,build,fabrica,lector,focus', "Home's six room keys ride in its head", s1.inHead);
  ok(s1.workShown === 'none' && s1.hh >= 690, 'the head is the orrery; the old grid of rooms is not shown', s1);

  // 2. the engine
  const s2 = await p.evaluate(() => { const h = document.querySelector('#hx .hx-head').getBoundingClientRect(), s = document.getElementById('hxSeal'), r = s.getBoundingClientRect();
    const key = document.getElementById('hxSealKey'), cs = (sel, prop) => getComputedStyle(s.querySelector(sel)).getPropertyValue(prop).trim();
    return { inHead: s.parentElement.classList.contains('hx-head'), key: !!key && s.contains(key), dx: Math.round(r.left + r.width / 2 - (h.left + h.width / 2)), w: Math.round(r.width),
      anim: getComputedStyle(s.querySelector('.seal-spin')).animationName, ring: cs('.isl-ring', '--fz'), star: cs('.isl-star', '--fz'), heart: cs('.isl-heart', '--fz'),
      rims: s.querySelectorAll('.isl-edge .ox-rim').length, kids: s.children.length }; });
  ok(s2.inHead && s2.key && s2.kids === 1, "the engine is Home's own seal key, moved in whole", s2);
  ok(Math.abs(s2.dx) <= 4 && s2.w >= 120, 'the engine stands at the centre, larger than before (92 pixels)', s2);
  ok(+s2.ring > .065 && +s2.star > .11 && +s2.heart > .25 && s2.rims === 4, 'the engine is in deeper layers, with a rim behind its face', s2);
  const ang = () => p.evaluate(() => { const m = new DOMMatrix(getComputedStyle(document.querySelector('#hxSeal .seal-spin')).transform); return Math.atan2(m.b, m.a) * 180 / Math.PI; });
  const a0 = await ang(); await p.waitForTimeout(600); const a1 = await ang(); await p.waitForTimeout(600); const a2 = await ang();
  const d1 = ((a1 - a0 + 540) % 360) - 180, d2 = ((a2 - a1 + 540) % 360) - 180;
  ok(s2.anim === 'oxEngine' && d1 < -3 && d2 < -3, 'the star turns counterclockwise without stopping', { anim: s2.anim, d1, d2 });
  const s3 = await p.evaluate(() => { const h = document.querySelector('#hx .hx-head'); const rgb = (c) => (c.match(/[\d.]+/g) || []).map(Number);
    const r1 = h.querySelector('.ox-ring.r1'), cols = [...h.querySelectorAll('.ox-ring')].map(e => rgb(getComputedStyle(e).stroke));
    const hug = [...h.querySelectorAll('*')].filter(e => { const c = getComputedStyle(e, '::before'); return e.closest('#hxSeal') === null && /ox-sun/.test(e.className) && c.content !== 'none'; }).length;
    return { r1: !!r1, purple: cols.every(c => c[2] > c[1]), cols, hug, sealBefore: getComputedStyle(document.getElementById('hxSeal'), '::before').content }; });
  ok(s3.r1 && s3.purple, 'the larger ring round the seal stays, and every ring is purple, not gold', s3);
  ok(s3.hug === 0 && (s3.sealBefore === 'none' || s3.sealBefore === 'normal'), 'no circle hugs the seal', s3);

  // 2b. the orbs' colours: by day Ingenium's own day violets for every room; by night each room its own purple, as she liked it
  const cday = await p.evaluate(() => [...document.querySelectorAll('#hx .hx-key .oxo')].map(o => getComputedStyle(o).getPropertyValue('--c2').trim().toLowerCase()));
  ok(cday.length === 6 && cday.every(c => c === '#6a3fb5'), "by day every orb wears Ingenium's day violet", cday);
  {
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(500);
  const cnight = await p.evaluate(() => [...document.querySelectorAll('#hx .hx-key .oxo')].map(o => getComputedStyle(o).getPropertyValue('--c2').trim().toLowerCase()));
  ok(cnight.join() === '#6a3fb5,#4d3db0,#8641b8,#7637a8,#7458c6,#5c31a4', 'by night each room keeps its own purple', cnight);
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); }); await p.waitForTimeout(500); }

  // 3. the orbs: no ring, no moon, travelling counterclockwise
  const s4 = await p.evaluate(() => { const o = [...document.querySelectorAll('#hx .hx-key .oxo')]; return { n: o.length,
    rings: o.filter(x => [...x.querySelectorAll('ellipse')].some(e => +e.getAttribute('rx') > 40)).length, moons: document.querySelectorAll('#hx .ox-moon,#hx .ox-moon-front').length,
    layers: o.every(x => x.querySelector('.oxo-cast') && x.querySelector('.oxo-ball svg') && x.querySelector('.oxo-mark .oxo-ico svg')),
    depth: o.map(x => getComputedStyle(x.querySelector('.oxo-mark')).getPropertyValue('--fz').trim()), glare: document.querySelectorAll('#hx .oxo-glare').length,
    blur: [...document.querySelectorAll('#hx .oxo-ball svg [filter]')].length, sway: getComputedStyle(o[0].querySelector('.oxo-idle')).animationName }; });
  ok(s4.n === 6 && s4.layers && s4.depth.every(d => +d > .1), "each room is an orb made as the seal is: its cast, the ball, and its mark standing above it", s4);
  ok(s4.glare === 0 && s4.blur === 0 && s4.sway === 'oxSway', 'no glare and no glowing edge; at rest it sways as the seal does', s4);
  ok(s4.rings === 0 && s4.moons === 0, 'no orb carries a ring or a moon (Fabrica, Build)', s4);
  const pos = () => p.evaluate(() => { const h = document.querySelector('#hx .hx-head').getBoundingClientRect(), s = document.getElementById('hxSeal').getBoundingClientRect();
    const cx = s.left + s.width / 2, cy = h.top + h.height * .61; return [...document.querySelectorAll('#hx .hx-key')].map(k => { const r = k.querySelector('.hx-jewel').getBoundingClientRect();
      return Math.atan2((r.top + r.height / 2 - cy) / Math.cos(70 * Math.PI / 180), r.left + r.width / 2 - cx); }); });
  await p.mouse.move(5, 890); const q0 = await pos(); await p.waitForTimeout(1500); const q1 = await pos();
  const dq = q0.map((a, i) => ((q1[i] - a + 3 * Math.PI) % (2 * Math.PI)) - Math.PI);
  ok(dq.every(d => d < -0.02), 'the rooms travel counterclockwise, with the engine', dq.map(d => +d.toFixed(3)));

  // 4. an orb answers the pointer as the seal does
  const jb = await (await p.$('#hx .hx-key[data-go="lector"] .hx-jewel')).boundingBox();
  await p.mouse.move(jb.x + jb.width * .72, jb.y + jb.height * .3); await p.waitForTimeout(900);
  const s5 = await p.evaluate(() => { const k = document.querySelector('#hx .hx-key[data-go="lector"]'), o = k.querySelector('.oxo'), t = getComputedStyle(o.querySelector('.oxo-tilt')).transform;
    const others = [...document.querySelectorAll('#hx .hx-key')].filter(x => x !== k).map(x => +getComputedStyle(x).opacity);
    const M = new DOMMatrix(t); return { hover: o.classList.contains('hover'), near: k.classList.contains('ox-near'), m: { m13: M.m13, m23: M.m23, m31: M.m31, m42: M.m42 }, ry: o.style.getPropertyValue('--ry'), kd: +getComputedStyle(k.querySelector('.hx-kd')).opacity,
      dim: others.every(v => v < .75), grey: [...document.querySelectorAll('#hx .hx-key')].filter(x => x !== k).map(x => getComputedStyle(x).filter).filter(f => f !== 'none'), st: IngOrrery.state() }; });
  const m5 = s5.m;
  ok(s5.hover && parseFloat(s5.ry) !== 0 && Math.abs(m5.m13) + Math.abs(m5.m23) + Math.abs(m5.m31) > 0.01, 'under the mouse an orb tilts to follow it', s5);
  ok(m5.m42 < -2, 'under the mouse an orb lifts, as the seal does', { lift: m5.m42 });
  const held0 = await pos(); await p.waitForTimeout(700); const held1 = await pos();
  ok(s5.near && s5.kd > .9 && s5.dim && s5.st.hold === 'lector' && !s5.st.turning && held0.every((a, i) => Math.abs(a - held1[i]) < 0.003), "the orbit stops, the room comes near with its words, the others step back", { s5, held0, held1 });
  ok(s5.grey.length === 0, 'by day the rooms that step back keep their colours (no grey)', s5.grey);
  await p.mouse.down(); await p.waitForTimeout(200);
  const s6 = await p.evaluate(() => { const o = document.querySelector('#hx .hx-key[data-go="lector"] .oxo'); return { down: o.classList.contains('down'), m42: new DOMMatrix(getComputedStyle(o.querySelector('.oxo-tilt')).transform).m42 }; });
  ok(s6.down && s6.m42 > m5.m42, 'pressed, an orb sinks', s6);
  await p.mouse.up(); await p.waitForTimeout(800);
  const opened = await p.evaluate(() => { const h = document.getElementById('page-home'); return { home: !!(h && h.offsetParent), lector: !!(document.getElementById('page-lector') && document.getElementById('page-lector').offsetParent) }; });
  ok(!opened.home, 'a press opens the room', opened);
  await p.evaluate(() => go('home')); await p.mouse.move(5, 890); await p.waitForTimeout(1500);

  // 4b. Home stays light: left alone, the orbit turns by itself and nothing on Home is rewritten (her rule of 7 November 2026)
  await p.mouse.move(5, 890); await p.waitForTimeout(600);
  const quiet = await p.evaluate(() => new Promise(res => { let n = 0; const seen = {}; const mo = new MutationObserver(l => { l.forEach(m => { n++; const k = m.type + ' ' + (m.attributeName || '') + ' ' + (m.target.id || m.target.className || m.target.nodeName); seen[k] = (seen[k] || 0) + 1; }); });
    mo.observe(document.getElementById('page-home'), { attributes: true, childList: true, subtree: true, characterData: true }); const a0 = performance.now();
    setTimeout(() => { mo.disconnect(); res({ n, seen, turning: IngOrrery.state().turning }); }, 2500); }));
  ok(quiet.n === 0 && quiet.turning, 'left alone, the orbit turns and nothing on Home is rewritten', quiet);

  // 5. the card
  const s7 = await p.evaluate(() => { const r = (id) => document.getElementById(id).getBoundingClientRect(), g = document.getElementById('hxGuide');
    return { guide: getComputedStyle(g).display, row: getComputedStyle(g.parentNode).display, a: [Math.round(r('heroNext').width), Math.round(r('heroNext').top)], b: [Math.round(r('homeTour').width), Math.round(r('homeTour').top)] }; });
  ok(s7.guide === 'none' && s7.row === 'none', 'the card has no "Read the short guide"', s7);
  ok(s7.a[0] < 230 && s7.b[0] < 230 && Math.abs(s7.a[1] - s7.b[1]) <= 4, 'its two keys keep their own width, side by side', s7);

  // 6. the greeting's Cormorant; the tour and Minimal motion keep it still
  const s8 = await p.evaluate(async () => { try { await document.fonts.ready; } catch (e) {} return { fam: getComputedStyle(document.getElementById('hxHello')).fontFamily,
    loaded: [...document.fonts].some(f => /Home Cormorant/.test(f.family) && f.style === 'normal' && String(f.weight) === '600' && f.status === 'loaded') }; });
  ok(/^"?Home Cormorant/.test(s8.fam) && s8.loaded, "the greeting is in Ingenium's own Cormorant", s8);
  await p.evaluate(() => document.body.classList.add('touring')); await p.waitForTimeout(600);
  const t0 = await pos(); await p.waitForTimeout(700); const t1 = await pos(); const tt = await p.evaluate(() => IngOrrery.state().turning);
  ok(!tt && t0.every((a, i) => Math.abs(a - t1[i]) < 0.003), 'the tour holds the orbit still', { tt, t0, t1 });
  await p.evaluate(() => { document.body.classList.remove('touring'); document.body.setAttribute('data-motion', 'minimal'); }); await p.waitForTimeout(800);
  const s9 = await p.evaluate(() => ({ orbit: getComputedStyle(document.querySelector('#hx .ox-spin')).animationName, anim: getComputedStyle(document.querySelector('#hxSeal .seal-spin')).animationName,
    sway: getComputedStyle(document.querySelector('#hx .oxo-idle')).animationName })); const m0 = await pos(); await p.waitForTimeout(700); const m1 = await pos();
  ok(s9.orbit === 'none' && s9.anim === 'none' && s9.sway === 'none' && m0.every((a, i) => Math.abs(a - m1[i]) < 0.003), 'Minimal motion keeps the orbit, the engine and the orbs still', { s9, m0, m1 });
  await p.evaluate(() => document.body.setAttribute('data-motion', 'calm'));

  // 7. narrow: the orrery in its phone layout (6.71); below 260 pixels Home keeps its grid; wide again: the orrery
  await p.setViewportSize({ width: 1000, height: 900 }); await p.waitForTimeout(2500);
  const s10p = await p.evaluate(() => ({ on: IngOrrery.state().on, narrow: document.getElementById('hx').classList.contains('ox-narrow'), world: !!document.querySelector('#hx .ox-world'),
    inHead: document.querySelector('#hx .hx-keys').parentElement.classList.contains('hx-head') }));
  ok(s10p.on && s10p.narrow && s10p.world && s10p.inHead, 'below 760 pixels the orrery takes its phone layout', s10p);
  await p.setViewportSize({ width: 250, height: 900 }); await p.waitForTimeout(2500);
  const s10 = await p.evaluate(() => { const box = document.querySelector('#hx .hx-keys'), i = document.querySelector('#hx .hx-key .hx-jewel .oxo-ico svg');
    return { on: IngOrrery.state().on, w: document.getElementById('hx').clientWidth, inWork: box.parentElement.classList.contains('hx-work'), grid: getComputedStyle(box).display,
      icon: i ? Math.round(i.getBoundingClientRect().width) : 0, sph: getComputedStyle(document.querySelector('#hx .oxo-ball')).display, tf: getComputedStyle(document.querySelector('#hx .hx-key')).transform,
      world: !!document.querySelector('#hx .ox-world'), kids: [...box.children].every(c => c.classList.contains('hx-key')) }; });
  ok(!s10.on && s10.inWork && s10.grid === 'grid' && s10.icon >= 18 && s10.sph === 'none' && s10.tf === 'none' && !s10.world && s10.kids, 'below 260 pixels Home keeps its grid of rooms, as before', s10);
  const tourAt = await p.evaluate(() => { const e = document.querySelector('.hx-work, .hx-key'); const r = e && e.getBoundingClientRect(); return !!(r && r.width > 0); });
  await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(2500);
  const s11 = await p.evaluate(() => ({ on: IngOrrery.state().on, inHead: document.querySelector('#hx .hx-keys').parentElement.classList.contains('hx-head') }));
  const tourAt2 = await p.evaluate(() => { const e = document.querySelector('.hx-work, .hx-key'); const r = e && e.getBoundingClientRect(); return !!(r && r.width > 0); });
  ok(s11.on && s11.inHead, 'wide again, the orrery comes back', s11);
  ok(tourAt && tourAt2, "the tour's step on the rooms finds one shown, both ways", { tourAt, tourAt2 });
  await p.setViewportSize({ width: 1280, height: 860 }); await p.waitForTimeout(2200);
  const s12 = await p.evaluate(() => { const h = document.querySelector('#hx .hx-head').getBoundingClientRect(), t = document.querySelector('#hx .hx-htext').getBoundingClientRect(), n = document.querySelector('#hx .hx-next').getBoundingClientRect();
    const keys = [...document.querySelectorAll('#hx .hx-key .hx-jewel')].map(k => k.getBoundingClientRect());
    return { on: IngOrrery.state().on, apart: t.right <= n.left, inside: keys.every(r => r.left >= h.left - 2 && r.right <= h.right + 2), nextW: Math.round(n.width) }; });
  ok(s12.on && s12.apart && s12.inside, 'at 1280 pixels the greeting and the card stand apart and every orb stays inside Home', s12);
  await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(1500);

  // 8. by night
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(1200);
  const s13 = await p.evaluate(() => ({ bg: getComputedStyle(document.querySelector('#hx .hx-head')).backgroundImage.slice(0, 60), on: IngOrrery.state().on }));
  ok(s13.on && /36, 26, 56|241a38/.test(s13.bg), 'by night the orrery wears its night sky', s13);
  await p.screenshot({ path: path.join(OUT, 'night.png') });
  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
