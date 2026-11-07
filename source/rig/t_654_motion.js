// node rig/t_654_motion.js <Ingenium page url> <out dir> [ref=<the 6.8.7 page: git show 749ea1e:ingenium.html, served>]
// Ingenium 6.54 (7 November 2026), in Chromium. Her words (7 November 2026): "I want the 3D look and animation of build 6.8.7, I want
// everything else to stay the same in Ingenium. I only want for the buttons inside of the "Good morning, ..." card on the Home page to
// be made slightly smaller but keep the acrylic chunky look"; "I like the white colour of the "Take the guided tour" and "Read the short
// Guide" buttons from 6.53, I want to keep the colour for the buttons but remove the glossy, flat effect and animation"; "I also really
// like the smaller size of 6.53's buttons inside of the app. I want that kept as well"; "Keep the colours from 6.53."
//   - with the pointer still, on Home and on Chat, every animation 6.8.7 ran runs (its stones' sparks as modules/r252.js draws them, its
//     status dots as modules/r242.js draws them);
//   - Home's sparks: one picture for each stone, on the stone's own beat; frozen at the peaks of the beat, each star has the place and
//     the size the old six backgrounds gave it (a background of 17s px at x% y% sits at (W - 17s) x, (H - 17s) y);
//   - a crest that moves its quarters moves them while it is on the screen and rests them off it;
//   - the greeting card's keys: 6.53's size and faces; the white keys have no bright top line and a solid edge 2 px deep; none moves
//     under the pointer or animates; pressed, a key sits 2 px down into its edge; by night the edge is dark;
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2); const REF = (args.find(a => a.startsWith('ref=')) || '').slice(4); const [URL_, OUT] = args.filter(a => !a.startsWith('ref=')); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 900) : '')); } }
async function open(b, url) { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  await p.evaluate(() => { try { const k = [...document.querySelectorAll('button')].find(x => /^Not now$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); } catch (e) {} });
  return { ctx, p, errs }; }
const running = (p, pg) => p.evaluate(async (pg) => { go(pg); await new Promise(r => setTimeout(r, 1500)); return [...new Set(document.getAnimations().filter(a => a.playState === 'running' && a.animationName).map(a => a.animationName))].sort(); }, pg);
(async () => {
  const b = await pw.chromium.launch(); const A = await open(b, URL_); const p = A.p;
  // 1. 6.8.7's animations
  const SAME = { hxGlitter: 'hxSpark', presPulse: 'r242Glow', dotPulse: 'r242Ring' };
  let want = { home: ['sealEngine', 'sealBeat', 'sealCounter', 's4Breath', 'islSway', 'islLift', 'hxGlitter', 'icSway', 'ingBellSoft', 'forgeBreathe', 'cdHourTurn', 'presPulse', 'dotPulse'],
    chat: ['sealEngine', 'sealBeat', 'sealCounter', 's4Breath', 'islSway', 'islLift', 'ingBellSoft', 'forgeBreathe', 'cdHourTurn', 'presPulse', 'dotPulse'] };
  if (REF) { const R = await open(b, REF); want = { home: await running(R.p, 'home'), chat: await running(R.p, 'chat') }; await R.ctx.close(); }
  await p.mouse.move(1439, 899);
  for (const pg of ['home', 'chat']) { const now = await running(p, pg); const miss = want[pg].map(n => SAME[n] || n).filter(n => now.indexOf(n) < 0);
    ok(want[pg].length >= 10 && miss.length === 0, 'with the pointer still on ' + pg + ', every animation of 6.8.7 runs (' + want[pg].length + (REF ? ', read from the 6.8.7 page' : '') + ')', { miss, now }); }
  // 2. Home's sparks
  await p.evaluate(() => go('home')); await p.waitForTimeout(800);
  const sk = await p.evaluate(() => [...document.querySelectorAll('.hx-app .hx-stone')].map(s => { const k = s.querySelectorAll(':scope > .hx-sparks'), b = getComputedStyle(s, '::before'), a = k[0] && k[0].getAnimations()[0];
    return { n: k.length, before: b.content, beat: b.animationDuration, start: b.animationDelay, anim: a && a.animationName, d: a && a.effect.getTiming().duration, l: a && a.effect.getTiming().delay, st: a && a.playState }; }));
  ok(sk.length >= 5 && sk.every(x => x.n === 1 && x.before === 'none' && x.anim === 'hxSpark' && x.st === 'running' && Math.abs(x.d - parseFloat(x.beat) * 1000) < 1 && Math.abs(x.l - parseFloat(x.start) * 1000) < 1),
    'every app stone has one spark picture on its own beat, and no growing backgrounds (' + sk.length + ' stones)', sk);
  const PEAK = [[0.08, 0.07, 0.16, 1], [0.41, 0.93, 0.16, 0.941], [0.58, 0.07, 0.84, 0.882], [0.24, 0.93, 0.84, 0.882], [0.16, 0.5, 0.04, 0.765], [0.34, 0.5, 0.96, 0.706], [0.06, 0.07, 0.16, 0.5]];
  const geo = await p.evaluate((PEAK) => { const s = document.querySelector('.hx-app .hx-stone'), k = s.querySelector('.hx-sparks'), a = k.getAnimations()[0], d = a.effect.getTiming().duration, l = a.effect.getTiming().delay; a.pause();
    const out = PEAK.map(([f, x, y, sc]) => { a.currentTime = l + f * d; const S = s.getBoundingClientRect(), K = k.getBoundingClientRect(), W = s.clientWidth, H = s.clientHeight, bl = s.clientLeft, bt = s.clientTop;
      // the picture's box, scaled by sc from its own corner: its left and top are the star's, and its width is W times the scale
      return { f, dx: +(K.left - S.left - bl - (W - 17 * sc) * x).toFixed(2), dy: +(K.top - S.top - bt - (H - 17 * sc) * y).toFixed(2), dw: +(K.width - W * sc).toFixed(2) }; });
    a.play(); return out; }, PEAK);
  ok(geo.every(g => Math.abs(g.dx) < 0.6 && Math.abs(g.dy) < 0.6 && Math.abs(g.dw) < 0.6), 'frozen at the peaks of the beat (and half way up the first), each star has the place and size the old backgrounds gave it', geo);
  // 3. a crest that moves its quarters: on the screen it moves them, off it it rests them
  const cr = await p.evaluate(async () => { if (!window.IngSeal || !IngSeal.el) return { none: true }; const c = IngSeal.el(IngSeal.apps.slice(0, 3), { live: true, quarters: true, size: 90, alt: "" }); if (!c || !c.__icq) return { none: true };
    c.style.cssText = 'position:fixed;left:40%;top:40%;width:120px;height:120px;z-index:99'; document.body.appendChild(c); await new Promise(r => setTimeout(r, 700)); const on = !!c.__icMove;
    c.style.top = '-3000px'; await new Promise(r => setTimeout(r, 700)); const off = !!c.__icMove; c.remove(); return { on, off }; });
  ok(cr.none || (cr.on === true && cr.off === false), 'a crest moves its quarters while it is on the screen and rests them off it', cr);
  // 4. the greeting card's keys
  await p.evaluate(() => go('home')); await p.mouse.move(1439, 899); await p.waitForTimeout(700);
  const kk = await p.evaluate(() => ['#heroNext', '#homeTour', '#hxGuide'].map(s => { const e = document.querySelector(s), c = getComputedStyle(e), r = e.getBoundingClientRect();
    return { s, h: Math.round(r.height), fs: c.fontSize, fw: c.fontWeight, bg: c.backgroundImage, sh: c.boxShadow, tr: c.transitionDuration, x: r.left + r.width / 2, y: r.top + r.height / 2 }; }));
  ok(kk.every(k => k.h >= 33 && k.h <= 37 && k.fs === '13px' && k.fw === '600'), 'the greeting card\'s keys keep 6.53\'s size (13px, 34 to 36px high)', kk.map(k => [k.s, k.h, k.fs, k.fw]));
  ok(kk[1].bg === 'linear-gradient(rgb(255, 255, 255), rgb(246, 242, 251))' && kk[2].bg === kk[1].bg && /^linear-gradient\(rgb\(122, 80, 198\)/.test(kk[0].bg), 'their faces are 6.53\'s: white, and the purple key purple', kk.map(k => k.bg));
  ok([kk[1], kk[2]].every(k => /^rgb\(217, 212, 224\) 0px 2px 0px 0px/.test(k.sh) && !/inset/.test(k.sh)), 'the white keys have a solid edge 2px deep and no bright top line', [kk[1].sh, kk[2].sh]);
  ok(kk.every(k => k.tr.split(',').every(t => t.trim() === '0s')), 'no key in the card animates', kk.map(k => k.tr));
  await p.mouse.move(kk[1].x, kk[1].y); await p.waitForTimeout(500);
  const hv = await p.evaluate(() => { const c = getComputedStyle(document.getElementById('homeTour')); return { tf: c.transform, bd: c.borderTopColor }; });
  ok(hv.tf === 'none' && hv.bd === 'rgba(34, 26, 46, 0.22)', 'under the pointer a white key does not move; its rim darkens', hv);
  await p.mouse.down(); await p.waitForTimeout(80);
  const pr = await p.evaluate(() => { const c = getComputedStyle(document.getElementById('homeTour')); return { tf: c.transform, sh: c.boxShadow }; });
  await p.mouse.move(1439, 899); await p.mouse.up(); await p.keyboard.press('Escape'); await p.waitForTimeout(400); await p.evaluate(() => go('home')); await p.waitForTimeout(500);
  ok(pr.tf === 'matrix(1, 0, 0, 1, 0, 2)' && /^rgb\(217, 212, 224\) 0px 0px 0px 0px/.test(pr.sh), 'pressed, it sits 2px down into its edge at once', pr);
  await p.mouse.move(kk[0].x, kk[0].y); await p.waitForTimeout(500);
  const ph = await p.evaluate(() => getComputedStyle(document.getElementById('heroNext')).transform); await p.mouse.move(1439, 899);
  ok(ph === 'none', 'the purple key does not rise under the pointer either', ph);
  const nt = await p.evaluate(async () => { const was = document.body.getAttribute('data-theme'); document.body.setAttribute('data-theme', 'night'); await new Promise(r => setTimeout(r, 300)); const v = getComputedStyle(document.getElementById('homeTour')).boxShadow; if (was === null) document.body.removeAttribute('data-theme'); else document.body.setAttribute('data-theme', was); return v; });
  ok(/^rgb\(18, 13, 28\) 0px 2px 0px 0px/.test(nt), 'by night the white keys\' edge is dark', nt);
  ok(A.errs.length === 0, 'no errors on the page', A.errs);
  await b.close(); console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('failed: ' + e.message); process.exit(1); });
