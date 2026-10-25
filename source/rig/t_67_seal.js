// Ingenium 6.7 · the seal on Home, to press for fun (module r175, part p96), in Chromium:
// the seal beside the greeting is the door's own layered seal and moves as the door's does at rest (it sways, the ring turns
// and lifts, the star turns, the stone beats); it is a real key with a name and a focus ring; a press (mouse, finger, Enter,
// Space) plays a short flourish, a different one each time, and changes no page and nothing kept; Minimal motion and the
// system's reduced motion still it, and a press then only glows; window.IngSealPlay.press() plays one; by night, on a phone;
// axe-core finds nothing on Home; the door's seal and the top bar's seal are untouched.
//   node rig/t_67_seal.js http://127.0.0.1:8162/ingenium.html <out folder> <axe.min.js>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3], AXE = process.argv[4]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
const NAME = "Ingenium's seal. Press it for fun.";
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';

async function open(b, opts) {
  const ctx = await b.newContext(Object.assign({ viewport: { width: 1440, height: 900 } }, opts || {}));
  const p = await ctx.newPage(); p.__errs = [];
  p.on('pageerror', e => p.__errs.push((e.message || '') + ' ' + (e.stack || '')));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 });
  await p.waitForTimeout(900);
  // the door's own seal, while the door is open: how it moves
  p.__door = await p.evaluate(() => { const s = document.querySelector('#introSeal .isl'); return s ? [...new Set(s.getAnimations({ subtree: true }).map(a => a.animationName).filter(n => n && n !== 'islRise' && n !== 'islSeat' && n !== 'islCastIn'))].sort() : []; });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(700);
  await p.evaluate(() => go('home')); await p.waitForTimeout(1500);
  return { ctx, p };
}
// the first press anywhere on a first start (any click: the greeting's words will do) lets the page keep the apps it carries
// in the app library, and the storage part writes its first settings some seconds later: a press of the seal is judged after
// such a first click and twenty seconds, once everything kept (the state and the device's store) has stood unchanged for
// four seconds
async function quiet(p) {
  if (!p.__first) { p.__first = true; await p.click('#hxHello').catch(() => { }); await p.waitForTimeout(20000); }
  await p.evaluate(async () => { let last = '', since = Date.now(); const t0 = Date.now();
    while (Date.now() - t0 < 40000) { const now = JSON.stringify(state) + '|' + Object.keys(localStorage).map(k => k + (localStorage.getItem(k) || '').length).join();
      if (now !== last) { last = now; since = Date.now(); } else if (Date.now() - since > 4000) return; await new Promise(r => setTimeout(r, 400)); } });
}
async function theme(p, t) { await p.evaluate(t => { state.theme = t; applyTheme(); }, t); await p.waitForTimeout(500); }
// what a press could change: the page open, the address, the dialogs, and everything kept (the state and the device's store)
const diffState = (a, b) => { try { const x = JSON.parse(a.state), y = JSON.parse(b.state); return [...new Set([...Object.keys(x), ...Object.keys(y)])].filter(k => JSON.stringify(x[k]) !== JSON.stringify(y[k])); } catch (e) { return ['?']; } };
// the page's own heartbeat: once a minute it notes that it was seen (supSeen) and saves the desk (__deskAt), and at the top of
// every minute the status clock adds the minute to the time report (presenceSince, presenceLog: presEnsureTick in the page)
// and saves, which rewrites the device's store. A change of those alone, and the store rewritten with them, is the clock's,
// not the press's
const HEARTBEAT = ['supSeen', '__deskAt', 'presenceSince', 'presenceLog'];
function same(a, b) { const ch = Object.keys(a).filter(x => a[x] !== b[x]); if (!ch.length) return { ok: true, ch };
  const ds = diffState(a, b); const beat = ch.every(x => x === 'state' || x === 'store') && ch.includes('state') && ds.every(k => HEARTBEAT.includes(k));
  return { ok: beat, ch, ds, note: beat ? 'only the minute\'s heartbeat' : '' }; }
const snap = p => p.evaluate(() => ({ page: (document.querySelector('.section.active') || {}).id, href: location.href, title: document.title,
  modal: !!document.querySelector('#modalRoot.open'), door: !document.getElementById('introDoor').hasAttribute('hidden'),
  state: JSON.stringify(state), store: Object.keys(localStorage).sort().map(k => k + '=' + (localStorage.getItem(k) || '').length).join('|') }));
const idle = p => p.evaluate(() => { const k = document.getElementById('hxSealKey'); if (!k) return null;
  const names = k.getAnimations({ subtree: true }).filter(a => a.playState === 'running' && a.animationName).map(a => a.animationName);
  return [...new Set(names)].sort(); });
const fx = p => p.evaluate(() => { const k = document.getElementById('hxSealKey');
  return { flourish: k.getAttribute('data-flourish'), last: IngSealPlay.last(), waapi: k.getAnimations({ subtree: true }).filter(a => !a.animationName && a.playState === 'running').map(a => a.effect.target.className && a.effect.target.className.baseVal !== undefined ? 'svg' : String(a.effect.target.className)) }; });
const settle = p => p.waitForFunction(() => { const k = document.getElementById('hxSealKey'); return k && !k.getAttribute('data-flourish'); }, null, { timeout: 8000 }).catch(() => { });
async function axe(p, where) {
  if (!AXE) return;
  await p.addScriptTag({ path: AXE });
  const v = await p.evaluate(async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes: ['violations'] });
    return r.violations.map(x => x.id + ' (' + x.nodes.length + '): ' + x.nodes.slice(0, 2).map(n => n.target.join(' ')).join(', ')); });
  ok(v.length === 0, `axe-core finds nothing on Home (${where})`, v);
}

(async () => {
  const html = await (await fetch(URL_)).text();
  ok(html.includes('<style id="r175-css">') && html.includes('__ingParts["p96"]="running"'), 'the seal part (r175, p96) is in the built page');
  const src = fs.readFileSync(path.join(__dirname, '..', 'build', 'modules', 'r175.js'), 'utf8');
  ok(!/Lector|Carpe Diem|Forge|Inkwell/.test(src.replace(/\/\*[\s\S]*?\*\//g, '')), 'no other app is named in the module\'s code (the gift and demo editions would refuse it)');
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  let { ctx, p } = await open(b);
  const ED = await p.evaluate(() => typeof ING_EDITION !== 'undefined' ? ING_EDITION : 'master');
  console.log('NOTE the ' + ED + ' edition');
  ok(await p.evaluate(() => (window.__ingParts || {}).p96 === 'running'), 'the part runs to its end');

  // ---------------- a real key with a name, holding the door's own seal ----------------
  const k = await p.evaluate(() => { const box = document.getElementById('hxSeal'), k = document.getElementById('hxSealKey');
    if (!k) return null; const r = k.getBoundingClientRect(), isl = k.querySelector('.isl'), door = document.querySelector('#introSeal .isl');
    const ids = [...document.querySelectorAll('[id]')].map(e => e.id), dup = ids.filter((x, i) => ids.indexOf(x) !== i);
    return { tag: k.tagName, type: k.type, name: k.getAttribute('aria-label'), inBox: k.parentElement === box, kids: box.children.length, w: r.width, h: r.height,
      layers: isl ? [...isl.querySelectorAll('.isl-layer')].map(l => l.className.replace('isl-layer ', '')) : [], door: !!door, doorLayers: door ? door.querySelectorAll('.isl-layer').length : 0,
      dup: [...new Set(dup)].slice(0, 5), hidden: isl && isl.getAttribute('aria-hidden'), headSeal: !!document.querySelector('#brandSealBtn .isl'),
      nearHello: Math.abs(r.top - document.getElementById('hxHello').getBoundingClientRect().top) < 120 };
  });
  ok(k && k.tag === 'BUTTON' && k.type === 'button' && k.name === NAME, 'the seal beside the greeting is a key named "' + NAME + '"', k);
  ok(k && k.inBox && k.kids === 1 && k.nearHello, 'it stands in Home\'s head (#hxSeal), alone, beside the greeting', k);
  ok(k && k.layers.join(',') === 'isl-back,isl-ring,isl-star,isl-heart' && k.hidden === 'true', 'it is the door\'s layered seal: the face, the ring, the star and the stone, its picture hidden from screen readers', k && k.layers);
  ok(k && k.door && k.doorLayers === 4 && k.headSeal, 'the door\'s seal and the top bar\'s seal are still there, untouched', k);
  ok(k && k.dup.length === 0, 'no id appears twice in the page (the copy\'s gradients are named afresh)', k && k.dup);
  ok(k && k.w >= 44 && k.h >= 44, 'the key is at least 44 pixels', k && [k.w, k.h]);

  // ---------------- at rest, it moves as the door's seal does ----------------
  const a1 = await idle(p);
  const doorAnims = p.__door;
  ok(a1 && ['islSway', 'sealEngine', 'sealBeat', 'sealCounter'].every(n => a1.includes(n)), 'at rest it sways, the star turns, the stone beats and the ring turns', a1);
  ok(a1 && doorAnims.length >= 4 && doorAnims.join() === a1.join(), 'the same movements as the door\'s seal (measured on the door while it stood open)', { door: doorAnims, home: a1 });
  const moving = await p.evaluate(async () => { const e = document.querySelector('#hxSealKey .isl-idle'); const a = getComputedStyle(e).transform; await new Promise(r => setTimeout(r, 700)); return a !== getComputedStyle(e).transform; });
  ok(moving, 'the sway is really running (its turn changes from moment to moment)');
  await p.locator('#hxSeal').screenshot({ path: path.join(OUT, 'seal_day.png') });

  // ---------------- a press: a flourish, and nothing else ----------------
  await settle(p); await quiet(p);
  const before = await snap(p);
  let evs = 0; await p.evaluate(() => { window.__sealEv = 0; document.addEventListener('ing-seal-press', () => window.__sealEv++); });
  await p.click('#hxSealKey'); await p.waitForTimeout(150);
  const f1 = await fx(p);
  ok(f1.flourish && f1.waapi.length > 0, 'a press with the mouse plays a flourish', f1);
  await p.waitForTimeout(250); await p.screenshot({ path: path.join(OUT, 'seal_press_day.png'), clip: await p.evaluate(() => { const r = document.getElementById('hxSeal').getBoundingClientRect(); return { x: Math.max(0, r.left - 30), y: Math.max(0, r.top - 30), width: r.width + 60, height: r.height + 60 }; }) });
  await settle(p); await p.waitForTimeout(300);
  const after = await snap(p);
  const sm = same(before, after);
  await p.mouse.move(1300, 850);
  ok(sm.ok, 'the press changes no page, no address, opens nothing and keeps nothing', sm.ch.length ? sm : undefined);
  evs = await p.evaluate(() => window.__sealEv);
  ok(evs === 1, 'a press tells the page once (ing-seal-press), for a later part that adds a sound', evs);
  const rest = await p.evaluate(() => { const k = document.getElementById('hxSealKey'); return { flourish: k.getAttribute('data-flourish'), left: k.getAnimations({ subtree: true }).filter(a => !(a instanceof CSSAnimation) && !(a instanceof CSSTransition) && a.playState === 'running').length }; });
  ok(!rest.flourish && rest.left === 0, 'the flourish ends by itself and the seal goes back to its rest', rest);

  // ---------------- a different flourish from press to press ----------------
  const seen = [];
  for (let i = 0; i < 8; i++) { await p.click('#hxSealKey'); await p.waitForTimeout(80); seen.push(await p.evaluate(() => IngSealPlay.last())); await settle(p); }
  const repeats = seen.filter((x, i) => i > 0 && x === seen[i - 1]).length;
  ok(new Set(seen).size >= 4 && repeats === 0, 'eight presses: at least four different flourishes, never the same twice running', seen);
  // a press during a flourish waits its turn and plays next
  await p.click('#hxSealKey'); await p.waitForTimeout(60); const fa = await p.evaluate(() => IngSealPlay.last());
  await p.click('#hxSealKey'); await p.waitForTimeout(60);
  await p.waitForFunction(fa => IngSealPlay.last() !== fa, fa, { timeout: 4000 }).catch(() => { });
  ok(await p.evaluate(fa => IngSealPlay.last() !== fa, fa), 'a press while one plays is kept and plays as soon as it ends');
  await settle(p);

  // ---------------- the keyboard ----------------
  await p.keyboard.press('Shift'); await p.evaluate(() => document.getElementById('hxSealKey').focus()); await p.waitForTimeout(100);
  const ring = await p.evaluate(() => { const k = document.getElementById('hxSealKey'), c = getComputedStyle(k); return { focus: document.activeElement === k, fv: k.matches(':focus-visible'), style: c.outlineStyle, width: parseFloat(c.outlineWidth), color: c.outlineColor }; });
  ok(ring.focus && ring.fv && ring.style === 'solid' && ring.width >= 2, 'reached by the keyboard, it shows a focus ring', ring);
  await p.locator('#hxSeal').screenshot({ path: path.join(OUT, 'seal_focus_day.png') });
  await quiet(p); const kb0 = await snap(p);
  await p.keyboard.press('Enter'); await p.waitForTimeout(120); const fe = await fx(p);
  ok(!!fe.flourish, 'Enter plays a flourish', fe); await settle(p);
  await p.keyboard.press('Space'); await p.waitForTimeout(120); const fs2 = await fx(p);
  ok(!!fs2.flourish, 'Space plays a flourish', fs2); await settle(p); await p.waitForTimeout(300);
  const kb1 = await snap(p);
  const sk = same(kb0, kb1); ok(sk.ok, 'and the keys change nothing either', sk.ch.length ? sk : undefined);
  ok(await p.evaluate(() => document.activeElement && document.activeElement.id === 'hxSealKey'), 'the focus stays on the seal after a press');

  // ---------------- for a later part: window.IngSealPlay ----------------
  const api = await p.evaluate(() => { const r = IngSealPlay.press(); return { r, t: typeof IngSealPlay.press, el: IngSealPlay.el() && IngSealPlay.el().id }; });
  ok(api.t === 'function' && typeof api.r === 'string' && api.r.length > 0 && api.el === 'hxSealKey', 'window.IngSealPlay.press() plays one and says which', api);
  await settle(p);
  // a wrapper put on IngSealPlay.press (as a sound part would) hears every press of the key
  const wrapped = await p.evaluate(async () => { let n = 0; const o = IngSealPlay.press; IngSealPlay.press = function () { n++; return o.apply(this, arguments); };
    document.getElementById('hxSealKey').click(); await new Promise(r => setTimeout(r, 50)); IngSealPlay.press = o; return n; });
  ok(wrapped === 1, 'a part that wraps IngSealPlay.press hears the key\'s presses', wrapped);
  await settle(p);

  // ---------------- by night ----------------
  await theme(p, 'night');
  const nt = await p.evaluate(() => { const k = document.getElementById('hxSealKey'); return { there: !!k && k.isConnected, ring: getComputedStyle(k).outlineColor, base: getComputedStyle(k.querySelector('.isl-base')).backgroundImage.slice(0, 60) }; });
  ok(nt.there && /#|rgb/.test(nt.base), 'by night the seal stays, in its night colours', nt);
  await p.click('#hxSealKey'); await p.waitForTimeout(300);
  await p.locator('#hxSeal').screenshot({ path: path.join(OUT, 'seal_night.png') });
  await settle(p);
  await p.keyboard.press('Shift'); await p.evaluate(() => document.getElementById('hxSealKey').focus()); await p.waitForTimeout(100);
  await p.locator('#hxSeal').screenshot({ path: path.join(OUT, 'seal_focus_night.png') });
  await p.screenshot({ path: path.join(OUT, 'home_night_desk.png') });
  await axe(p, 'desk, night');
  await theme(p, 'day'); await p.evaluate(() => document.activeElement && document.activeElement.blur());
  await p.screenshot({ path: path.join(OUT, 'home_day_desk.png') });
  await axe(p, 'desk, day');

  // ---------------- Minimal motion: still, and a press only glows ----------------
  await p.evaluate(() => document.body.setAttribute('data-motion', 'minimal')); await p.waitForTimeout(400);
  const still = await p.evaluate(async () => { const k = document.getElementById('hxSealKey'), e = k.querySelector('.isl-idle'); const a = getComputedStyle(e).transform; await new Promise(r => setTimeout(r, 600));
    return { running: k.getAnimations({ subtree: true }).filter(x => x.animationName && x.playState === 'running').map(x => x.animationName), same: a === getComputedStyle(e).transform }; });
  ok(still.running.length === 0 && still.same, 'with Minimal motion the seal stands still', still);
  await p.click('#hxSealKey'); await p.waitForTimeout(120);
  const mg = await p.evaluate(() => { const k = document.getElementById('hxSealKey'); return { moves: k.getAnimations({ subtree: true }).filter(a => !a.animationName && a.effect.target !== k.querySelector('.r175-glow')).length, glow: k.querySelector('.r175-glow').getAnimations().length, flourish: k.getAttribute('data-flourish') }; });
  ok(mg.moves === 0 && mg.glow === 1 && !mg.flourish, 'and a press only glows: nothing turns, hops or spins', mg);
  await p.evaluate(() => document.body.setAttribute('data-motion', 'calm')); await p.mouse.move(1300, 850); await p.waitForTimeout(400);
  ok((await idle(p) || []).includes('islSway'), 'back to Calm, it sways again', await idle(p));
  for (const e of p.__errs) if (/r175|IngSealPlay|hxSeal/.test(e)) ok(false, 'a script error from the seal', e.slice(0, 300));
  await ctx.close();

  // ---------------- the system's reduced motion ----------------
  ({ ctx, p } = await open(b, { reducedMotion: 'reduce' }));
  const rm = await idle(p);
  ok(rm && rm.length === 0, 'with the system\'s reduced motion the seal stands still', rm);
  await p.click('#hxSealKey'); await p.waitForTimeout(120);
  ok(await p.evaluate(() => IngSealPlay.el().getAnimations({ subtree: true }).filter(a => !a.animationName && !a.effect.target.classList.contains('r175-glow')).length === 0), 'and a press only glows');
  await ctx.close();

  // ---------------- a phone ----------------
  ({ ctx, p } = await open(b, { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, userAgent: UA }));
  const ph = await p.evaluate(() => { const k = document.getElementById('hxSealKey'), r = k.getBoundingClientRect(); return { w: r.width, h: r.height, l: r.left, r: r.right, W: innerWidth, S: k.querySelector('.isl').getBoundingClientRect().width }; });
  ok(ph.w >= 44 && ph.h >= 44 && ph.l >= 0 && ph.r <= ph.W && Math.abs(ph.S - ph.w) < 2, 'on a phone the seal is a key of at least 44 pixels, whole on the screen, the seal filling it', ph);
  await quiet(p); const p0 = await snap(p);
  await p.tap('#hxSealKey'); await p.waitForTimeout(150);
  const pf = await fx(p);
  ok(!!pf.flourish, 'a finger\'s tap plays a flourish', pf);
  await p.waitForTimeout(200); await p.screenshot({ path: path.join(OUT, 'home_phone_day.png') });
  await settle(p); await p.waitForTimeout(300);
  const p1 = await snap(p);
  const sp = same(p0, p1); ok(sp.ok, 'and changes nothing', sp.ch.length ? sp : undefined);
  await axe(p, 'phone, day');
  await theme(p, 'night'); await p.tap('#hxSealKey'); await p.waitForTimeout(250);
  await p.screenshot({ path: path.join(OUT, 'home_phone_night.png') });
  await settle(p);
  await axe(p, 'phone, night');
  await ctx.close();

  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('crashed', e.stack); process.exit(2); });
