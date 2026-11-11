// Home's orbs, as solid as the seal (modules/r264.js, Ingenium 6.72; she approved its preview on 11 November 2026). Her words: "I want the orbs pages
// circling around the engine logo to have the same feel and density and animation as the engine logo, I want them to be as animated
// and thick and 3D feeling as the logo button. I want them to feel like buttons with the same texture when I click on them on the
// Home page, it feels weird seeing them just light up and feel hollow when I click on them or hover over them."
//   - the part runs and every orb is made solid;
//   - each orb has a body: seven discs in its own purples standing behind its face at growing depths, and a base under them;
//   - its face is in three parts, and its surface drifts behind the ball's own round clip, left to right;
//   - its mark stands at a fifth of its size above the face, with two copies under it, and lifts and settles at rest;
//   - left alone, nothing on Home is rewritten;
//   - under the mouse its mark rises and its base's shadow lengthens; pressed, the mark is pushed down, the body closes up, it sinks;
//   - released, it knocks (the ripple, the pop) and the room opens after the beat, not before; a click that is not a person's
//     opens the room at once; Minimal motion stills it all and opens at once;
//   - by night its body wears the night's purples; on a phone it is the same at 76 pixels and a tap knocks then opens;
//   - below 260 pixels nothing of it shows but the room's icon; no ring, moon or glare is added; no page error.
//   node rig/t_672_orbs.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_672_orbs.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
async function open(b, view, theme, extra = {}) {
  const ctx = await b.newContext({ viewport: view, ...extra }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(400);
  await p.evaluate(t => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = t; applyTheme(); go('home'); }, theme); await p.waitForTimeout(3000);
  return { p, ctx, errs };
}
const z = m => { const v = /matrix3d\(([^)]+)\)/.exec(m || ''); return v ? +v[1].split(',')[14] : 0; };  // a transform's depth (m43), read in Node
(async () => {
  const b = await pw.chromium.launch();
  const { p, ctx, errs } = await open(b, { width: 1440, height: 900 }, 'day');

  // 1. the part and the orbs
  // Home has six rooms in the master and full editions, four in the gift and demo (Fabrica and Lector are the first two's alone)
  const s1 = await p.evaluate(() => ({ part: window.__ingParts && window.__ingParts.p264, st: window.IngOrbs && IngOrbs.state(),
    keys: document.querySelectorAll('#hx .hx-key').length, lector: !!document.querySelector('#hx .hx-key[data-go="lector"]') }));
  const WANT = s1.lector ? 6 : 4;
  ok(s1.part === 'running' && s1.st && s1.keys === WANT && s1.st.orbs === WANT && s1.st.solid === WANT, 'the part runs and all ' + WANT + ' orbs of this edition\'s Home are made solid', s1);

  // 2. the body
  const s2 = await p.evaluate(() => [...document.querySelectorAll('#hx .hx-key .oxo')].map(o => { const c = getComputedStyle(o);
    return { room: o.closest('.hx-key').getAttribute('data-go'), rims: [...o.querySelectorAll('.oxo-edge .oxo-rim')].map(r => ({ k: +r.style.getPropertyValue('--k'), t: getComputedStyle(r).transform, bg: getComputedStyle(r).backgroundImage })),
      base: o.querySelector('.oxo-edge .oxo-base') ? getComputedStyle(o.querySelector('.oxo-edge .oxo-base')).transform : null, c1: c.getPropertyValue('--c1').trim(), edge: getComputedStyle(o.querySelector('.oxo-edge')).transformStyle }; }));
  const bodyOk = s2.every(o => o.rims.length === 7 && o.edge === 'preserve-3d' && o.base && o.rims.every(r => z(r.t) < 0) && z(o.base) < Math.min(...o.rims.map(r => z(r.t))));
  const depthsGrow = s2.every(o => { const d = o.rims.slice().sort((a, b) => a.k - b.k).map(r => z(r.t)); return d.every((v, i) => i === 0 || v < d[i - 1]); });
  ok(bodyOk && depthsGrow, 'each orb has a body of seven discs behind its face at growing depths, and a base under them', s2.map(o => ({ room: o.room, rims: o.rims.map(r => +z(r.t).toFixed(2)), base: o.base && +z(o.base).toFixed(2) })));
  ok(s2.every(o => /linear-gradient/.test(o.rims[0].bg)), "the body wears the orb's own purples, lit on its upper side", s2.map(o => o.rims[0].bg.slice(0, 90)));

  // 3. the face in three parts, the surface drifting behind the ball's own round clip, left to right
  const face = () => p.evaluate(() => [...document.querySelectorAll('#hx .hx-key .oxo')].map(o => { const ball = o.querySelector('.oxo-ball'), d = o.querySelector('.oxo-drift');
    return { parts: [...ball.children].map(x => x.getAttribute('class')), clipped: !!(d && d.parentNode && d.parentNode.getAttribute('clip-path')), twin: d ? d.querySelectorAll(':scope > g[transform="translate(80 0)"]').length : 0,
      anim: d ? getComputedStyle(d).animationName : null, x: d ? new DOMMatrix(getComputedStyle(d).transform).m41 : null }; }));
  const f0 = await face(); await p.waitForTimeout(2500); const f1 = await face();
  ok(f0.every(o => o.parts.join(',') === 'oxo-body,oxo-surf,oxo-shade'), "each orb's face is in three parts: the ball, its surface and its light", f0.map(o => o.parts));
  ok(f0.every(o => o.clipped && o.twin === 1 && o.anim === 'oxsTurn'), "the surface drifts behind the ball's own round clip, its pattern twice", f0);
  ok(f0.every((o, i) => f1[i].x > o.x || f1[i].x < o.x - 60), 'the surface drifts left to right, as the planet turns', f0.map((o, i) => [+o.x.toFixed(2), +f1[i].x.toFixed(2)]));

  // 4. the mark: a fifth of the orb's size above the face, thick, lifting and settling
  const s4 = await p.evaluate(() => [...document.querySelectorAll('#hx .hx-key .oxo')].map(o => { const m = o.querySelector('.oxo-mark'), l = o.querySelector('.oxo-lift');
    return { fz: getComputedStyle(m).getPropertyValue('--fz').trim(), ts: getComputedStyle(m).transformStyle, lift: getComputedStyle(l).animationName, top: !!l.querySelector(':scope > .oxo-ico svg'),
      d1: new DOMMatrix(getComputedStyle(l.querySelector('.oxo-dp1')).transform).m43, d2: new DOMMatrix(getComputedStyle(l.querySelector('.oxo-dp2')).transform).m43, sway: getComputedStyle(o.querySelector('.oxo-idle')).animationName }; }));
  ok(s4.every(o => +o.fz === .2 && o.ts === 'preserve-3d' && o.top), "each mark stands a fifth of the orb's size above its face", s4);
  ok(s4.every(o => o.d1 < 0 && o.d2 < o.d1), 'two copies stand under each mark, so the mark is thick', s4.map(o => [o.d1, o.d2]));
  ok(s4.every(o => o.lift === 'oxsLift' && o.sway === 'oxSway'), 'at rest each orb sways and its mark lifts and settles, as the seal does', s4.map(o => [o.sway, o.lift]));

  // 5. left alone, nothing on Home is rewritten
  const writes = await p.evaluate(() => new Promise(r => { let n = 0; const mo = new MutationObserver(l => { n += l.length; }); mo.observe(document.getElementById('hx'), { subtree: true, childList: true, attributes: true, characterData: true });
    setTimeout(() => { mo.disconnect(); r(n); }, 3000); }));
  ok(writes === 0, 'left alone for three seconds, nothing on Home is rewritten', writes);

  // 6. under the mouse
  const ROOM = await p.evaluate(() => document.querySelector('#hx .hx-key[data-go="lector"]') ? 'lector'
    : [...document.querySelectorAll('#hx .hx-key')].map(k => k.getAttribute('data-go')).find(r => ['code', 'focus', 'chat'].indexOf(r) < 0));
  const sel = '#hx .hx-key[data-go="' + ROOM + '"]';
  const rest = await p.evaluate(s => getComputedStyle(document.querySelector(s + ' .oxo-base')).boxShadow, sel);
  let jb = await (await p.$(sel + ' .hx-jewel')).boundingBox();
  await p.mouse.move(jb.x + jb.width * .75, jb.y + jb.height * .3); await p.waitForTimeout(800); jb = await (await p.$(sel + ' .hx-jewel')).boundingBox();
  const s6 = await p.evaluate(s => { const o = document.querySelector(s + ' .oxo'); return { hover: o.classList.contains('hover'), fz: getComputedStyle(o.querySelector('.oxo-mark')).getPropertyValue('--fz').trim(),
    sh: getComputedStyle(o.querySelector('.oxo-base')).boxShadow, lift: getComputedStyle(o.querySelector('.oxo-lift')).animationPlayState, m42: new DOMMatrix(getComputedStyle(o.querySelector('.oxo-tilt')).transform).m42,
    rim7: new DOMMatrix(getComputedStyle(o.querySelector('.oxo-rim')).transform).m43 }; }, sel);
  ok(s6.hover && +s6.fz === .25 && s6.lift === 'paused', 'under the mouse the orb lifts and its mark rises further from its face', s6);
  ok(s6.sh !== rest, "under the mouse the base's shadow lengthens", { rest, hover: s6.sh });

  // 7. pressed
  await p.mouse.down(); await p.waitForTimeout(220);
  const s7 = await p.evaluate(s => { const o = document.querySelector(s + ' .oxo'); return { down: o.classList.contains('down'), fz: getComputedStyle(o.querySelector('.oxo-mark')).getPropertyValue('--fz').trim(),
    m42: new DOMMatrix(getComputedStyle(o.querySelector('.oxo-tilt')).transform).m42, rim7: new DOMMatrix(getComputedStyle(o.querySelector('.oxo-rim')).transform).m43 }; }, sel);
  ok(s7.down && +s7.fz === .11 && s7.m42 > s6.m42, 'pressed, its mark is pushed toward its face and the orb sinks', s7);
  ok(s7.rim7 > s6.rim7, 'pressed, its body closes up, as a key does', { hover: s6.rim7, down: s7.rim7 });

  // 8. released: the knock, then the room
  await p.mouse.up(); await p.waitForTimeout(90);
  const s8 = await p.evaluate(s => { const o = document.querySelector(s + ' .oxo'); return { knock: o.classList.contains('knock'), tilt: getComputedStyle(o.querySelector('.oxo-tilt')).animationName,
    ripple: getComputedStyle(o.querySelector('.oxo-ripple')).animationName, pop: getComputedStyle(o.querySelector('.oxo-lift')).animationName, home: !!document.getElementById('page-home').offsetParent }; }, sel);
  ok(s8.knock && s8.tilt === 'oxsKnock' && s8.ripple === 'oxsRipple' && /oxsPop/.test(s8.pop), 'released, it knocks as the seal knocks, with its ripple and the pop of its mark', s8);
  ok(s8.home, 'the room is not opened before the knock is seen', s8);
  await p.waitForTimeout(700);
  const s8b = await p.evaluate(r => ({ room: r, home: !!document.getElementById('page-home').offsetParent, open: !!(document.getElementById('page-' + r) && document.getElementById('page-' + r).offsetParent) }), ROOM);
  ok(!s8b.home && s8b.open, 'then the room opens', s8b);

  // 9. a click that is not a person's (the guided tour's) opens the room at once
  await p.evaluate(() => go('home')); await p.mouse.move(5, 890); await p.waitForTimeout(1500);
  const s9 = await p.evaluate(() => { document.querySelector('#hx .hx-key[data-go="focus"]').click(); return { home: !!document.getElementById('page-home').offsetParent }; });
  ok(!s9.home, "a click that is not a person's opens the room at once", s9);

  // 10. Minimal motion
  await p.evaluate(() => { go('home'); document.body.setAttribute('data-motion', 'minimal'); }); await p.waitForTimeout(1200);
  const s10 = await p.evaluate(() => { const o = document.querySelector('#hx .hx-key[data-go="code"] .oxo'); return { drift: getComputedStyle(o.querySelector('.oxo-drift')).animationName, lift: getComputedStyle(o.querySelector('.oxo-lift')).animationName }; });
  jb = await (await p.$('#hx .hx-key[data-go="code"] .hx-jewel')).boundingBox();
  await p.mouse.click(jb.x + jb.width / 2, jb.y + jb.height / 2); await p.waitForTimeout(60);
  const s10b = await p.evaluate(() => ({ home: !!document.getElementById('page-home').offsetParent, knock: !!document.querySelector('#hx .oxo.knock') }));
  ok(s10.drift === 'none' && s10.lift === 'none', 'Minimal motion stills the drift and the lift', s10);
  ok(!s10b.home && !s10b.knock, "in Minimal motion a person's press opens the room at once, without the knock", s10b);
  await p.evaluate(() => { document.body.setAttribute('data-motion', 'calm'); go('home'); }); await p.waitForTimeout(800);

  // 11. no ring, moon or glare added
  const s11 = await p.evaluate(() => { const o = [...document.querySelectorAll('#hx .hx-key .oxo')]; return { rings: o.filter(x => [...x.querySelectorAll('ellipse')].some(e => +e.getAttribute('rx') > 40)).length,
    moons: document.querySelectorAll('#hx .ox-moon,#hx .ox-moon-front').length, glare: document.querySelectorAll('#hx .oxo-glare').length, filt: document.querySelectorAll('#hx .oxo-ball svg [filter]').length }; });
  ok(s11.rings === 0 && s11.moons === 0 && s11.glare === 0 && s11.filt === 0, 'no ring, moon, glare or glowing edge is added', s11);
  await p.locator('#hx .hx-head').screenshot({ path: OUT + '/orbs_day.png' });

  // 12. by night
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(900);
  const s12 = await p.evaluate(() => [...document.querySelectorAll('#hx .hx-key .oxo')].map(o => getComputedStyle(o.querySelector('.oxo-rim')).backgroundImage));
  ok(s12.every((bg, i) => bg !== s2[i].rims[0].bg) && new Set(s12).size > 1, "by night each orb's body wears its own room's purples", s12.map(x => x.slice(0, 60)));
  await p.locator('#hx .hx-head').screenshot({ path: OUT + '/orbs_night.png' });

  // 13. below 260 pixels: nothing of it but the room's icon
  await p.setViewportSize({ width: 300, height: 900 }); await p.evaluate(() => { const h = document.getElementById('hx'); h.style.width = '250px'; }); await p.waitForTimeout(2600);
  const s13 = await p.evaluate(() => { const k = document.querySelector('#hx .hx-key'); return { on: document.getElementById('hx').classList.contains('ox-on'), edge: getComputedStyle(k.querySelector('.oxo-edge')).display,
    dp: getComputedStyle(k.querySelector('.oxo-dp')).display, ripple: getComputedStyle(k.querySelector('.oxo-ripple')).display, icon: Math.round(k.querySelector('.oxo-ico svg').getBoundingClientRect().width) }; });
  ok(!s13.on && s13.edge === 'none' && s13.dp === 'none' && s13.ripple === 'none' && s13.icon > 0, "below 260 pixels nothing of the orb shows but the room's icon", s13);
  await p.evaluate(() => { document.getElementById('hx').style.width = ''; });
  ok(errs.length === 0, 'no page error on the computer', errs);
  await ctx.close();

  // 14. on a phone
  const ph = await open(b, { width: 390, height: 844 }, 'day', { hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const s14 = await ph.p.evaluate(() => ({ narrow: document.getElementById('hx').classList.contains('ox-narrow'), st: IngOrbs.state(), S: [...document.querySelectorAll('#hx .hx-key .oxo')].map(o => getComputedStyle(o).getPropertyValue('--S').trim()) }));
  ok(s14.narrow && s14.st.solid === WANT && s14.S.length === WANT && s14.S.every(v => v === '76px'), 'on a phone all ' + WANT + ' orbs are solid, at 76 pixels', s14);
  const t = await ph.p.evaluate(() => { const j = document.querySelector('#hx .hx-key[data-go="chat"] .hx-jewel').getBoundingClientRect(); return { x: j.left + j.width / 2, y: j.top + j.height / 2 }; });
  await ph.p.touchscreen.tap(t.x, t.y); await ph.p.waitForTimeout(80);
  const s14b = await ph.p.evaluate(() => ({ home: !!document.getElementById('page-home').offsetParent, knock: document.querySelector('#hx .hx-key[data-go="chat"] .oxo').classList.contains('knock') }));
  await ph.p.waitForTimeout(700); const s14c = await ph.p.evaluate(() => ({ home: !!document.getElementById('page-home').offsetParent }));
  ok(s14b.home && s14b.knock && !s14c.home, 'on a phone a tap knocks, then opens the room', { s14b, s14c });
  ok(ph.errs.length === 0, 'no page error on the phone', ph.errs);
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
