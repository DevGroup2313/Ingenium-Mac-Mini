// Ingenium 8.02, r408: Custodia's dial, with Ingenium's own seal, cool at rest, deep by night, moving under the pointer.
//   node rig/t_802_custodia_dial.js <page url> [picture folder]
// Her words (27 November 2026): "Custodia has the wrong logo on the inside of the 3D drawing and also is overheating my devices again ...
// the design looks entirely too bright on Night mode ... I want Custodia to have the same animated and clickable feel and look as the other
// pages inside of Ingenium". No sign-in is needed here; nothing of anyone's is read or written.
const pw = require('/opt/node-tools/node_modules/playwright'); const os = require('os'); const path = require('path'); const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const url = process.argv[2]; const pics = process.argv[3] || path.join(os.tmpdir(), 't802d');
let ok = 0, bad = 0; const check = (c, m, x) => { if (c) { ok++; console.log('PASS ' + m); } else { bad++; console.log('FAIL ' + m + (x !== undefined ? '  ' + JSON.stringify(x).slice(0, 500) : '')); } };
const rot = (t) => { const m = /matrix\(([^)]+)\)/.exec(t || ''); if (!m) return 0; const v = m[1].split(',').map(Number); return Math.round(Math.atan2(v[1], v[0]) * 180 / Math.PI * 10) / 10; };
(async () => {
  require('fs').mkdirSync(pics, { recursive: true });
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 240)));
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(1200);
  await p.evaluate(() => { const x = document.getElementById('introEnter') || [...document.querySelectorAll('button')].find((b) => /^Enter$/.test(b.textContent.trim())); if (x) x.click(); });
  await sleep(800); await p.evaluate(() => go('custodia')); await sleep(2600);

  // the logo: Ingenium's own seal in the dial's face, no plain star
  const logo = await p.evaluate(() => { const sb = document.querySelector('#cuHead .cu-sealbox'); return { seal: !!(sb && sb.querySelector('.r175-seal .isl')), layers: sb ? [...sb.querySelectorAll('.isl-layer')].map((x) => x.className.split(' ')[1]) : [], star: !![...document.querySelectorAll('#cuHead svg path')].some((x) => /^M0,-10C1\.6/.test(x.getAttribute('d') || '')),
    upright: sb ? !document.querySelector('#cuHead .cu-turn').contains(sb) : false }; });
  check(logo.seal && ['isl-ring', 'isl-star', 'isl-heart'].every((k) => logo.layers.indexOf(k) >= 0), "the dial's centre holds Ingenium's own seal, in its layers (ring, star, heart)", logo);
  check(!logo.star && logo.upright, 'no plain star is left, and the seal stands upright outside the turning ring', logo);

  // cool at rest: once the opening turn has ended, nothing in the head moves by itself but the seal's own breath
  await sleep(1500);
  const rest = await p.evaluate(() => { const h = document.getElementById('cuHead'); return document.getAnimations().filter((a) => a.playState === 'running' && a.effect && a.effect.target && h.contains(a.effect.target) && !a.effect.target.closest('.isl')).map((a) => (a.animationName || a.transitionProperty || 'anim') + ' on ' + String(a.effect.target.className).split(' ')[0] + ' x' + a.effect.getTiming().iterations); });
  check(rest.length === 0, 'at rest nothing in the head runs by itself (the ring no longer turns, the lamps no longer pulse)', rest);
  const css = await p.evaluate(() => [...document.querySelectorAll('style')].map((s) => s.textContent).join('\n'));
  check(!/cuTurn|cuPulse/.test(css), 'the endless turn and the endless pulse are gone from the page');
  const rafs = await p.evaluate(() => new Promise((res) => { let n = 0; const o = window.requestAnimationFrame; window.requestAnimationFrame = function (f) { const st = new Error().stack || ''; if (/r408|cu-|Custodia|wireDial|glide/.test(st)) n++; return o.call(window, f); }; setTimeout(() => { window.requestAnimationFrame = o; res(n); }, 2000); }));
  check(rafs === 0, 'at rest the dial asks for no frames at all', rafs);

  // the opening turn ended on a number (a multiple of 3.6 degrees: here, home)
  const r0 = await p.evaluate(() => getComputedStyle(document.querySelector('#cuHead .cu-turn')).transform);
  check(Math.abs(rot(r0)) < 0.6, 'the ring turned home as the page opened', rot(r0));
  await p.screenshot({ path: pics + '/1_day.png', clip: { x: 0, y: 0, width: 1440, height: 760 } });

  // the plate tilts toward the pointer and its light follows; it settles back when the pointer leaves
  const box = await p.evaluate(() => { const r = document.querySelector('#cuHead .cu-dialbox').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  await p.mouse.move(box.x + box.w * 0.85, box.y + box.h * 0.2, { steps: 6 }); await sleep(450);
  const tilted = await p.evaluate(() => { const b = document.querySelector('#cuHead .cu-dialbox'); return { live: b.classList.contains('live'), rx: b.style.getPropertyValue('--rx'), ry: b.style.getPropertyValue('--ry'), t: getComputedStyle(b.querySelector('.cu-tilt')).transform, sheen: getComputedStyle(b.querySelector('.cu-sheen')).opacity }; });
  check(tilted.live && parseFloat(tilted.ry) > 2 && parseFloat(tilted.rx) > 2 && tilted.t !== 'none', 'the dial tilts toward the pointer', tilted);
  check(+tilted.sheen > 0.5, 'its light shows and follows the pointer', tilted.sheen);
  await p.mouse.move(box.x + box.w + 160, box.y + box.h / 2, { steps: 4 }); await sleep(700);
  const flat = await p.evaluate(() => { const b = document.querySelector('#cuHead .cu-dialbox'); return { live: b.classList.contains('live'), rx: b.style.getPropertyValue('--rx'), ry: b.style.getPropertyValue('--ry') }; });
  check(!flat.live && parseFloat(flat.rx) === 0 && parseFloat(flat.ry) === 0, 'it settles flat when the pointer leaves', flat);

  // a lamp: it names its key under the pointer; pressed, the ring dials its number and the key opens below, the head kept as it was
  const lamps = await p.evaluate(() => [...document.querySelectorAll('#cuHead .cu-lamp')].map((l) => { const r = l.getBoundingClientRect(); return { k: l.getAttribute('data-key'), x: r.left + r.width / 2, y: r.top + r.height / 2 }; }));
  check(lamps.length >= 5, 'a lamp for each key', lamps.length);
  const L = lamps[2]; await p.mouse.move(L.x, L.y, { steps: 3 }); await sleep(350);
  const lab = await p.evaluate(() => { const l = document.querySelector('#cuHead .cu-lab'); return { on: l.classList.contains('on'), t: l.textContent }; });
  check(lab.on && lab.t.length > 3, 'a lamp names its key under the pointer', lab);
  const headBefore = await p.evaluate(() => { window.__cuHead = document.getElementById('cuHead'); return true; });
  await p.mouse.click(L.x, L.y); await sleep(1500);
  const after = await p.evaluate((k) => ({ same: window.__cuHead === document.getElementById('cuHead'), t: getComputedStyle(document.querySelector('#cuHead .cu-turn')).transform, open: (document.getElementById('cuOpen') || {}).getAttribute ? document.getElementById('cuOpen').getAttribute('data-key') : null, n: [...document.querySelectorAll('#cuHead .cu-lamp')].length }), L.k);
  const want = -Math.round(2 * (100 / after.n)) * 3.6, got = rot(after.t), diff = Math.abs((((got - want) % 360) + 540) % 360 - 180);
  check(headBefore && after.same, 'the head is kept as it was while a key opens below it (a turn in progress is never cut short)');
  check(diff < 0.8, 'the pressed lamp dials its number under the mark', { want, got });
  check(after.open === L.k, "the lamp's key opens below the dial", after.open);
  await p.evaluate(() => window.scrollTo(0, 0)); await sleep(400);

  // the ring turns under her hand, and settles on a number
  const c = { x: box.x + box.w / 2, y: box.y + box.h / 2 }, R = 132;
  const before = rot(await p.evaluate(() => getComputedStyle(document.querySelector('#cuHead .cu-turn')).transform));
  await p.mouse.move(c.x + R, c.y); await p.mouse.down();
  for (let i = 1; i <= 12; i++) { const a = i * 5 * Math.PI / 180; await p.mouse.move(c.x + R * Math.cos(a), c.y + R * Math.sin(a)); await sleep(30); }
  await p.mouse.up(); await sleep(1600);
  const turned = rot(await p.evaluate(() => getComputedStyle(document.querySelector('#cuHead .cu-turn')).transform));
  const moved = Math.abs((((turned - before) % 360) + 540) % 360 - 180), onTick = Math.abs(turned / 3.6 - Math.round(turned / 3.6)) < 0.08;
  check(moved > 20, 'dragged, the ring turns with the hand', { before, turned });
  check(onTick, 'let go, it settles on a mark', turned);

  // the seal presses as on Home: a flourish, and nothing opens
  const sealAt = await p.evaluate(() => { const r = document.querySelector('#cuHead .cu-sealbox').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, page: document.querySelector('.section.active').id }; });
  await p.mouse.click(sealAt.x, sealAt.y); await sleep(250);
  const pressed = await p.evaluate(() => { const k = document.querySelector('#cuHead .cu-sealbox .r175-seal'); return { flourish: k.getAttribute('data-flourish') || '', anims: document.getAnimations().filter((a) => a.effect && a.effect.target && k.contains(a.effect.target) && a.playState === 'running').length, page: document.querySelector('.section.active').id }; });
  check((pressed.flourish || pressed.anims > 0) && pressed.page === 'page-custodia', 'the seal plays a flourish when pressed, and nothing opens', pressed);
  await sleep(1400);

  // the pewter dial as approved, refined: bright polished metal by day, dark metal by night (colours read from the page, faint washes skipped)
  const metal = () => { const lum = (s) => (s.match(/rgba?\([^)]+\)|#[0-9a-f]{6}/gi) || []).map((c) => { let r, g, b, a = 1; if (c[0] === '#') { r = parseInt(c.slice(1, 3), 16); g = parseInt(c.slice(3, 5), 16); b = parseInt(c.slice(5, 7), 16); }
      else { const v = c.replace(/rgba?\(|\)/g, '').split(',').map(Number); [r, g, b] = v; if (v.length > 3) a = v[3]; } return a < 0.2 ? null : (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255; }).filter((x) => x !== null);
    const bg = (sel) => { const e = document.querySelector(sel); return e ? lum(getComputedStyle(e).backgroundImage) : []; };
    const d = bg('#cuHead .cu-dial'), k = bg('#cuHead .cu-knob'), n = bg('#cuHead .cu-lamp.none');
    return { dial: +Math.max(...d).toFixed(3), knob: +Math.max(...k).toFixed(3), none: n.length ? +Math.max(...n).toFixed(3) : 0, face: !!document.querySelector('#cuHead .cu-face'), ticks: document.querySelectorAll('#cuHead .cu-ticks').length, plate: !!document.querySelector('#cuHead canvas') }; };
  const day = await p.evaluate(metal);
  check(day.face && day.ticks === 3 && !day.plate, 'the pewter dial as approved: its face, its ticks (with a middle tick between the numbers), nothing painted over it', day);
  check(day.dial > 0.9, 'by day the bezel is bright polished pewter', day);
  const centre = await p.evaluate(() => { const sb = document.querySelector('#cuHead .cu-sealbox'); return { knob: !!document.querySelector('#cuHead .cu-knob'), w: sb ? Math.round(sb.getBoundingClientRect().width) : 0, ring: sb ? getComputedStyle(sb, '::before').boxShadow : '' }; });
  check(!centre.knob && centre.w > 70 && centre.w <= 92 && /inset/.test(centre.ring), 'no knob: the seal, smaller, sits in the face within a fine engraved ring', centre);
  // by night: dark metal, no bright white left on the dial
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); }); await sleep(900);
  const night = await p.evaluate(metal);
  check(night.dial < 0.5 && night.none < 0.6, 'by night the bezel and the empty lamps are dark metal, with nothing bright white', night);
  await p.screenshot({ path: pics + '/2_night.png', clip: { x: 0, y: 0, width: 1440, height: 760 } });
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'day'); }); await sleep(400);

  // Minimal motion: the plate stays flat under the pointer
  await p.evaluate(() => document.body.setAttribute('data-motion', 'minimal')); await sleep(200);
  await p.mouse.move(box.x + box.w * 0.8, box.y + box.h * 0.25, { steps: 5 }); await sleep(500);
  const mini = await p.evaluate(() => getComputedStyle(document.querySelector('#cuHead .cu-tilt')).transform);
  check(mini === 'none' || /^matrix\(([\d.]+), 0, 0, \1, 0, 0\)$/.test(mini), 'with Minimal motion the dial stays flat (no tilt, only its size)', mini);
  await p.evaluate(() => document.body.removeAttribute('data-motion'));

  check(errs.length === 0, 'no error on the page', errs.slice(0, 5));
  console.log('\n' + ok + ' passed, ' + bad + ' failed'); await b.close(); process.exit(bad ? 1 : 0);
})();
