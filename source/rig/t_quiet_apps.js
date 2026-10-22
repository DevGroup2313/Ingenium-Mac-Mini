// The Quiet Screen, in Ingenium (its own, the model) and in the Forge (Ingenium's, carried as the shared quiet_screen.html):
// the side key is there, named and clear of its neighbours; it opens the screen; the words are Ingenium's; the back key and
// Esc close it and focus goes back; focus stays inside while it is open; the circle rests with minimal motion, with calm
// and when the device asks for reduced motion; day and night colours fit and follow the switch; it fits a phone; the 💭
// key opens the thoughts panel above it; a reminder that falls due while it is open waits; Focus has a way in; the key
// that lays the side keys down takes it too; the tour rings it; axe finds nothing in what was added.
// The owner's words (21 October 2026): "I want the "Quiet Screen" feature and page from Ingenium added to the Forge please."
//   node rig/t_quiet_apps.js <url> <out folder> <ingenium|forge>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3], APP = process.argv[4];
if (!URL_ || !OUT || !/^(ingenium|forge)$/.test(APP || '')) { console.log('usage: node t_quiet_apps.js <url> <outdir> <ingenium|forge>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
const AXE = [process.env.AXE, '/tmp/claude-0/-home-user/02db3569-4f80-5425-acc7-7b83b521aecb/scratchpad/a11y/package/axe.min.js', '/opt/node-tools/node_modules/axe-core/axe.min.js'].filter(f => f && fs.existsSync(f))[0];
let pass = 0, fail = 0; const notes = [];
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 420) : '')); c ? pass++ : fail++; };
const info = (m, d) => { console.log('INFO ' + m + (d !== undefined ? '  ' + JSON.stringify(d).slice(0, 420) : '')); notes.push(m); };
const wait = ms => new Promise(z => setTimeout(z, ms));

// Ingenium's own words, the model for both
const W = { big: 'Nothing needs doing right now.', breathe: 'Breathe in as the circle grows, and out as it shrinks. Stay as long as you like.',
  stay: 'Stay as long as you like.', back: 'I am ready to come back', cap: '💭 A thought came in', name: 'Quiet screen' };

// each app: where its parts are, and how to work its own switches
const A = {
  ingenium: {
    key: '#fabQuiet', screen: '#quietScreen', back: '#qsBack', small: '#qsSmall', big: '.qs-big', cap: '#qsCatch', orb: '.qs-orb',
    others: ['#fabBell', '#fabTheme', '#fabTimer', '#fabNote', '#fabPark', '#railChevron'], moon: '#fabTheme', fold: '#railChevron', bell: '#fabBell', thought: '#fabPark', header: '.topbar',
    bg: { day: [235, 231, 240], night: [21, 17, 28] },
    async boot(p) {
      await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 150000 }); await p.waitForTimeout(1200);
      await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
      await p.waitForTimeout(800); await p.evaluate(() => { try { go('home'); } catch (e) { } }); await p.waitForTimeout(400);
    },
    night: (p, on) => p.evaluate(on => { state.theme = on ? 'night' : 'day'; applyTheme(); }, on),
    flip: p => p.evaluate(() => { toggleTheme(); }),
    calm: (p, on) => p.evaluate(on => { supSet('calm', on); }, on),
    minimal: (p, on) => p.evaluate(on => { state.motion = on ? 'minimal' : 'full'; applyTheme(); }, on),
    tc: () => window.IngInbox && IngInbox.tc,
    list: () => IngInbox.list(),
    support: p => p.evaluate(() => { IngSupport.sc.quiet(); }),
    async focusWay(p) { await p.evaluate(() => go('focus')); await p.waitForTimeout(700); return '#fxCalmCard .fx-quiet'; },
    async tour(p) { return p.evaluate(() => { const T = window.ING_TOUR || []; const s = T.find(x => [].concat(x.ring || []).indexOf('#fabQuiet') >= 0);
      return { present: !!s, words: s ? (s.t || '') : '' }; }); },
    door: null
  },
  forge: {
    key: '#forge-quiet-fab', screen: '#forge-quiet', back: '#forge-quiet-back', small: '#forge-quiet-small', big: '#forge-quiet .qsc-big', cap: '#forge-quiet-catch', orb: '#forge-quiet .qsc-orb',
    others: ['#sticky-fab', '#horo-fab', '#cd-theme-fab', '#cd-thought-fab', '#reminders-fab', '#cd-dock-toggle'], moon: '#cd-theme-fab', fold: '#cd-dock-toggle', bell: '#reminders-fab', thought: '#cd-thought-fab', header: '#cd-masthead',
    bg: { day: [238, 232, 220], night: [8, 20, 28] },
    async boot(p) {
      await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return b && b.classList.contains('fb-gone'); }, null, { timeout: 120000 }); await p.waitForTimeout(1200);
      const atDoor = await p.evaluate(() => { const d = document.getElementById('cd-door'), k = document.getElementById('forge-quiet-fab');
        return { door: !!d, key: !!k, shown: !!(k && getComputedStyle(k).display !== 'none' && k.getBoundingClientRect().width) }; });
      await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); });
      await p.waitForFunction(() => !document.getElementById('cd-door'), null, { timeout: 10000 }).catch(() => { });
      await p.waitForTimeout(1200);
      return atDoor;
    },
    // the Forge's own switch (it keeps the person's choice over the device's)
    night: (p, on) => p.evaluate(on => { if ((document.body.getAttribute('data-theme') === 'night') !== on) cdToggleTheme(); }, on),
    flip: p => p.evaluate(() => { document.getElementById('cd-theme-fab').click(); }),
    calm: (p, on) => p.evaluate(on => { forgeSupport.sc.set('calm', on); }, on),
    minimal: (p, on) => p.evaluate(on => { state.motion = on ? 'minimal' : 'full'; applyMotion(); }, on),
    tc: () => window.forgeSupport && forgeSupport.tc,
    list: () => forgeSupport.tc.list(),
    support: p => p.evaluate(() => { forgeSupport.sc.quiet(); }),
    async focusWay(p) { await p.evaluate(() => FORGE.openRoom('focus')); await p.waitForTimeout(1200); return '#room-focus .forge-quiet-way'; },
    async tour(p) { return p.evaluate(async () => { const T = (typeof DEMO_TOUR !== 'undefined' && DEMO_TOUR) || window.FORGE_TOUR || [];
      const i = T.findIndex(x => x && x.sub === 'The quiet screen'), j = T.findIndex(x => x && x.sub === 'The Inbox'); if (i < 0) return { present: false };
      try { T[i].go(); } catch (e) { } await new Promise(z => setTimeout(z, 500)); const k = document.getElementById('forge-quiet-fab');
      const ringed = !!(k && /demo-tour-spot/.test(k.className)); try { document.querySelectorAll('.demo-tour-spot,.demo-tour-spot-strong,.demo-tour-pulse,.demo-tour-pulse-strong').forEach(n => n.classList.remove('demo-tour-spot', 'demo-tour-spot-strong', 'demo-tour-pulse', 'demo-tour-pulse-strong')); } catch (e) { }
      return { present: true, afterInbox: i === j + 1, ringed, words: T[i].en && T[i].en.t, ring: k && getComputedStyle(k).outlineStyle }; }); },
    door: true
  }
}[APP];
// the parts, as plain values the page can be handed
const S = {}; Object.keys(A).forEach(k => { if (typeof A[k] === 'string' || Array.isArray(A[k])) S[k] = A[k]; });

// measuring helpers, run in the page
const rectOf = (p, sel) => p.evaluate(sel => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
  return { x: r.x, y: r.y, w: r.width, h: r.height, disp: cs.display, vis: cs.visibility, op: +cs.opacity, pe: cs.pointerEvents, tf: cs.transform }; }, sel);
async function screenState(p) {
  return p.evaluate(a => { const s = document.querySelector(a.screen); if (!s) return null; const cs = getComputedStyle(s), o = document.querySelector(a.orb), sm = document.querySelector(a.small), bg = document.querySelector(a.big), bk = document.querySelector(a.back), cp = document.querySelector(a.cap);
    const ae = document.activeElement;
    return { open: !s.hidden && cs.display !== 'none', role: s.getAttribute('role'), modal: s.getAttribute('aria-modal'), label: s.getAttribute('aria-label'),
      bg: cs.backgroundColor, ink: cs.color, z: cs.zIndex, big: bg && bg.textContent.trim(), small: sm && sm.textContent.trim(), back: bk && bk.textContent.trim(), cap: cp && cp.offsetParent ? cp.textContent.trim() : null,
      bigInk: bg && getComputedStyle(bg).color, smallInk: sm && getComputedStyle(sm).color, smallOp: sm && +getComputedStyle(sm).opacity, backInk: bk && getComputedStyle(bk).color, backBg: bk && getComputedStyle(bk).backgroundColor,
      anim: o && getComputedStyle(o).animationName, play: o && getComputedStyle(o).animationPlayState, active: ae && (ae.id || ae.className || ae.tagName), inside: !!(ae && s.contains(ae)),
      sw: s.scrollWidth, cw: s.clientWidth, backRect: bk && (r => ({ x: r.x, y: r.y, w: r.width, h: r.height }))(bk.getBoundingClientRect()), vw: innerWidth, vh: innerHeight }; }, S);
}
function parse(c) { const m = /rgba?\(([^)]+)\)/.exec(c || ''); if (!m) return null; const v = m[1].split(',').map(x => +x.trim()); return { r: v[0], g: v[1], b: v[2], a: v.length > 3 ? v[3] : 1 }; }
function over(fg, bg, op) { const a = (fg.a == null ? 1 : fg.a) * (op == null ? 1 : op); return { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a) }; }
function lum(c) { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); }
function ratio(a, b) { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
function near(c, want) { return c && Math.abs(c.r - want[0]) <= 2 && Math.abs(c.g - want[1]) <= 2 && Math.abs(c.b - want[2]) <= 2; }

async function clickKey(p) { const r = await rectOf(p, A.key); await p.mouse.click(r.x + r.w / 2, r.y + r.h / 2); await p.waitForTimeout(500); }
async function closeAll(p) { await p.evaluate(a => { const s = document.querySelector(a.screen); if (s && !s.hidden) { const b = document.querySelector(a.back); if (b) b.click(); } }, S); await p.waitForTimeout(300); }

// the side key: there, named, not covering its neighbours and not covered by them
async function sideKey(p, where) {
  const r = await p.evaluate(a => { const k = document.querySelector(a.key); if (!k) return null; const kr = k.getBoundingClientRect(), cs = getComputedStyle(k);
    const cx = kr.x + kr.width / 2, cy = kr.y + kr.height / 2, top = document.elementFromPoint(cx, cy);
    const hits = []; const keys = a.others.map(s => document.querySelector(s)).filter(Boolean);
    keys.forEach(o => { const or = o.getBoundingClientRect(), ocs = getComputedStyle(o); if (!or.width || ocs.display === 'none' || +ocs.opacity < 0.05) return;
      const ix = Math.max(0, Math.min(kr.right, or.right) - Math.max(kr.left, or.left)), iy = Math.max(0, Math.min(kr.bottom, or.bottom) - Math.max(kr.top, or.top));
      const oc = document.elementFromPoint(or.x + or.width / 2, or.y + or.height / 2);
      hits.push({ id: o.id, overlap: Math.round(ix * iy), mineOnTop: !!(oc && k.contains(oc)), gap: Math.round(Math.min(Math.abs(kr.top - or.bottom), Math.abs(or.top - kr.bottom))) }); });
    return { label: k.getAttribute('aria-label'), title: k.getAttribute('title'), tag: k.tagName, w: Math.round(kr.width), h: Math.round(kr.height), x: Math.round(kr.x), y: Math.round(kr.y),
      inView: kr.left >= 0 && kr.top >= 0 && kr.right <= innerWidth && kr.bottom <= innerHeight, vis: cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0.5,
      onTop: !!(top && k.contains(top)), hits, glyph: (k.textContent || '').trim() }; }, S);
  ok(r && r.vis && r.inView && r.w >= 40 && r.h >= 40, where + ': the 🌿 key is shown at the side, in view, at least 40 px', r && { x: r.x, y: r.y, w: r.w, h: r.h, glyph: r.glyph });
  ok(r && r.tag === 'BUTTON' && r.label === W.name && r.title === W.name, where + ': it is a button named "Quiet screen"', r && { label: r.label, title: r.title });
  ok(r && r.onTop && r.hits.length >= 3 && r.hits.every(h => h.overlap === 0 && !h.mineOnTop), where + ': it covers none of the other side keys and none covers it', r && r.hits);
  return r;
}

(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox', '--force-color-profile=srgb'] });
  const errs = [];
  // ---------------- the desk: 1440 x 900 ----------------
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL_, { timeout: 180000 }).catch(e => console.log('goto: ' + e.message));
  const door = await A.boot(p);
  if (A.door) ok(door && door.key && !door.shown, 'the boot door: the key is hidden while the door is shown', door);
  await A.night(p, false); await p.waitForTimeout(500);
  await sideKey(p, 'desk');
  // the leaf takes the place Ingenium gives it: under the bell, above the 💭
  const order = await p.evaluate(a => a.others.concat([a.key]).map(s => { const e = document.querySelector(s); return e && e.getBoundingClientRect().width ? [s, Math.round(e.getBoundingClientRect().y)] : null; }).filter(Boolean), S);
  const col = order.sort((x, y) => x[1] - y[1]).map(x => x[0]);
  const ib = col.indexOf(A.bell), iq = col.indexOf(A.key), it = col.indexOf(A.thought);
  ok(ib >= 0 && iq === ib + 1 && it === iq + 1, 'in the side column the leaf sits under the bell and above the 💭, as in Ingenium', col);
  const keyLook = await p.evaluate(a => { const k = document.querySelector(a.key), m = document.querySelector(a.moon); const g = x => { const c = getComputedStyle(x); return { w: Math.round(x.getBoundingClientRect().width), right: Math.round(innerWidth - x.getBoundingClientRect().right), z: c.zIndex, bg: c.backgroundColor, sh: c.boxShadow.slice(0, 40) }; };
    return { key: g(k), moon: g(m) }; }, S);
  ok(keyLook.key.w === keyLook.moon.w && keyLook.key.right === keyLook.moon.right && keyLook.key.z === keyLook.moon.z, 'it is the size, the edge and the layer of its neighbour, the day or night key', keyLook);
  const sx = await rectOf(p, A.key);
  await p.screenshot({ path: path.join(OUT, APP + '-desk-side-day.png'), clip: { x: 1240, y: Math.max(0, sx.y - 160), width: 200, height: Math.min(900 - Math.max(0, sx.y - 160), 520) } });

  // opens; the words are Ingenium's; focus on the back key
  await A.minimal(p, false); await A.calm(p, false); await p.waitForTimeout(300);
  await clickKey(p);
  let s = await screenState(p);
  ok(s && s.open && s.role === 'dialog' && s.modal === 'true' && s.label === W.name, 'the key opens the quiet screen, a dialog named "Quiet screen"', s && { open: s.open, role: s.role, modal: s.modal, label: s.label });
  ok(s && s.big === W.big && s.small === W.breathe && s.back === W.back, 'the words are Ingenium\'s', s && { big: s.big, small: s.small, back: s.back });
  ok(s && s.inside && /back|qsBack/i.test(String(s.active)), 'focus is on "I am ready to come back"', s && s.active);
  ok(s && s.anim && s.anim !== 'none' && s.play === 'running', 'the circle breathes', s && { anim: s.anim, play: s.play });
  const dayS = s;
  await p.screenshot({ path: path.join(OUT, APP + '-quiet-desk-day.png') });
  // focus is held inside: Tab and Shift+Tab go round its own keys
  const trail = [];
  for (let i = 0; i < 6; i++) { await p.keyboard.press('Tab'); trail.push(await p.evaluate(a => { const s = document.querySelector(a.screen), e = document.activeElement; return (s.contains(e) ? 'in:' : 'OUT:') + (e.id || e.className || e.tagName); }, S)); }
  for (let i = 0; i < 3; i++) { await p.keyboard.press('Shift+Tab'); trail.push(await p.evaluate(a => { const s = document.querySelector(a.screen), e = document.activeElement; return (s.contains(e) ? 'in:' : 'OUT:') + (e.id || e.className || e.tagName); }, S)); }
  ok(trail.every(t => t.indexOf('in:') === 0), 'focus stays inside while it is open (Tab and Shift+Tab)', trail);
  // Esc closes; focus goes back to the key
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  let back = await p.evaluate(a => ({ open: !document.querySelector(a.screen).hidden, onKey: document.activeElement === document.querySelector(a.key), active: document.activeElement.id || document.activeElement.tagName }), S);
  ok(!back.open, 'Esc closes it', back);
  ok(back.onKey, 'focus goes back to the key that opened it', back);
  // the back key closes it; focus goes back
  await clickKey(p); await p.click(A.back); await p.waitForTimeout(300);
  back = await p.evaluate(a => ({ open: !document.querySelector(a.screen).hidden, onKey: document.activeElement === document.querySelector(a.key), active: document.activeElement.id || document.activeElement.tagName }), S);
  ok(!back.open && back.onKey, '"I am ready to come back" closes it, and focus goes back', back);
  // Enter on the key, from the keyboard
  await p.focus(A.key); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
  s = await screenState(p); ok(s.open && s.inside, 'the key works from the keyboard (Enter)', { open: s.open, active: s.active });
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);

  // the circle rests: minimal motion, then calm
  await A.minimal(p, true); await p.waitForTimeout(300); await clickKey(p); s = await screenState(p);
  ok(s.anim === 'none' || s.play === 'paused', 'with minimal motion the circle is still', { anim: s.anim, play: s.play });
  ok(s.small === W.stay, 'and the words say only "Stay as long as you like."', s.small);
  await closeAll(p); await A.minimal(p, false); await A.calm(p, true); await p.waitForTimeout(400); await clickKey(p); s = await screenState(p);
  ok(s.anim === 'none' || s.play === 'paused', 'with calm on, the circle is still', { anim: s.anim, play: s.play });
  ok(s.small === W.stay, 'and the words are the short ones', s.small);
  await closeAll(p); await A.calm(p, false); await A.minimal(p, false); await p.waitForTimeout(400);

  // day and night
  const day = { bg: parse(dayS.bg), big: parse(dayS.bigInk), small: parse(dayS.smallInk), back: parse(dayS.backInk) };
  const dr = { big: ratio(over(day.big, day.bg), day.bg), small: ratio(over(day.small, day.bg, dayS.smallOp), day.bg), back: ratio(over(day.back, day.bg), day.bg) };
  ok(near(day.bg, A.bg.day) && lum(day.bg) > 0.5, 'by day: the app\'s own light, dim page', { bg: dayS.bg, want: A.bg.day });
  ok(dr.big >= 4.5 && dr.small >= 4.5 && dr.back >= 4.5, 'by day: the words can be read (contrast 4.5 or more)', { big: +dr.big.toFixed(2), small: +dr.small.toFixed(2), back: +dr.back.toFixed(2) });
  await A.night(p, true); await p.waitForTimeout(500); await clickKey(p); s = await screenState(p);
  const nt = { bg: parse(s.bg), big: parse(s.bigInk), small: parse(s.smallInk), back: parse(s.backInk) };
  const nr = { big: ratio(over(nt.big, nt.bg), nt.bg), small: ratio(over(nt.small, nt.bg, s.smallOp), nt.bg), back: ratio(over(nt.back, nt.bg), nt.bg) };
  ok(near(nt.bg, A.bg.night) && lum(nt.bg) < 0.03, 'by night: the app\'s own deep, dim page', { bg: s.bg, want: A.bg.night });
  ok(nr.big >= 4.5 && nr.small >= 4.5 && nr.back >= 4.5, 'by night: the words can be read (contrast 4.5 or more)', { big: +nr.big.toFixed(2), small: +nr.small.toFixed(2), back: +nr.back.toFixed(2) });
  await p.screenshot({ path: path.join(OUT, APP + '-quiet-desk-night.png') });
  // the day and night switch, pressed while it is open (as the system's Auto would), is followed at once
  await A.flip(p); await p.waitForTimeout(400); const fl = await screenState(p);
  ok(fl.open && near(parse(fl.bg), A.bg.day), 'the day and night switch is followed while it is open', { bg: fl.bg });
  await closeAll(p); await A.night(p, false); await p.waitForTimeout(300);

  // the 💭 key: the thoughts panel opens above the screen; Esc puts the panel away first
  const hasTc = await p.evaluate(`!!((${A.tc.toString()})())`);
  if (hasTc) {
    await clickKey(p); s = await screenState(p);
    ok(s.cap === W.cap, 'with a thoughts panel, "💭 A thought came in" is there', s.cap);
    await p.click(A.cap); await p.waitForTimeout(700);
    const c = await p.evaluate(a => { const t = (a.app === 'ingenium' ? IngInbox.tc : forgeSupport.tc), cl = document.querySelector('.tc-cloud'); if (!cl) return { open: t.isOpen() };
      const r = cl.getBoundingClientRect(), top = document.elementFromPoint(r.x + r.width / 2, r.y + Math.min(40, r.height / 2)), ae = document.activeElement;
      return { open: t.isOpen(), onTop: !!(top && cl.contains(top)), focusIn: !!(ae && ae.closest && ae.closest('.tc-el')), quiet: !document.querySelector(a.screen).hidden }; }, Object.assign({ app: APP }, S));
    ok(c.open && c.onTop && c.quiet, 'it opens the thoughts panel above the quiet screen', c);
    ok(c.focusIn, 'focus may go into the thoughts panel', c);
    // (left empty: with words in it, the panel's own Esc asks first whether to keep them)
    await p.keyboard.press('Escape'); await p.waitForTimeout(500);
    const c2 = await p.evaluate(a => ({ cloud: (a.app === 'ingenium' ? IngInbox.tc : forgeSupport.tc).isOpen(), quiet: !document.querySelector(a.screen).hidden }), Object.assign({ app: APP }, S));
    ok(!c2.cloud && c2.quiet, 'Esc puts the thoughts panel away first; the quiet screen stays', c2);
    await closeAll(p);
    await p.evaluate(a => { try { const t = (a === 'ingenium' ? IngInbox.tc : forgeSupport.tc); if (t.isOpen()) t.shut ? t.shut() : t.close(); } catch (e) { } }, APP);
    await p.evaluate(() => { try { localStorage.removeItem('ing_tc_draft'); localStorage.removeItem('forge_tc_draft'); } catch (e) { } });

    // a thought that falls due while it is open waits, and comes after
    await clickKey(p);
    await p.evaluate(a => { const L = (a === 'ingenium' ? IngInbox.list() : forgeSupport.tc.list()); L.unshift({ id: 'qprobe', t: 'Quiet probe: a thought that asked to come back', at: Date.now() - 600000, remindAt: Date.now() - 1000 }); }, APP);
    await p.evaluate(a => { (a === 'ingenium' ? IngInbox.tc : forgeSupport.tc).tick(); }, APP); await p.waitForTimeout(600);
    const w1 = await p.evaluate(() => !!document.querySelector('.tc-nudge'));
    ok(!w1, 'a reminder that falls due while it is open waits', { nudge: w1 });
    await closeAll(p);
    await p.evaluate(a => { (a === 'ingenium' ? IngInbox.tc : forgeSupport.tc).tick(); }, APP); await p.waitForTimeout(1500);
    const w2 = await p.evaluate(() => { const n = document.querySelector('.tc-nudge'); return n ? n.textContent.slice(0, 120) : null; });
    ok(!!w2 && /Quiet probe/.test(w2), 'and comes once the screen is closed', w2);
    await p.evaluate(a => { try { document.querySelectorAll('.tc-nudge').forEach(n => n.remove()); const L = (a === 'ingenium' ? IngInbox.list() : forgeSupport.tc.list()); const i = L.findIndex(x => x.id === 'qprobe'); if (i >= 0) L.splice(i, 1); } catch (e) { } }, APP);
  } else ok(false, 'the app has a thoughts panel to test with');
  if (APP === 'forge') {
    // a timed note (five minutes before the next item) that comes while it is open waits too
    await clickKey(p); await p.waitForTimeout(1700);
    await p.evaluate(() => forgeSupport.sc.toast('In five minutes: quiet probe. Finish the line you are writing.', 9000, true)); await p.waitForTimeout(300);
    const t1 = await p.evaluate(() => { const t = document.getElementById('sc-toast'); return t && { held: t.hasAttribute('data-fq-held'), vis: getComputedStyle(t).visibility }; });
    ok(t1 && t1.held && t1.vis === 'hidden', 'a timed note that comes while it is open is held back', t1);
    await closeAll(p); await p.waitForTimeout(1300);
    const t2 = await p.evaluate(() => { const t = document.getElementById('sc-toast'); return t && { show: t.classList.contains('show'), vis: getComputedStyle(t).visibility, text: t.textContent }; });
    ok(t2 && t2.show && t2.vis === 'visible' && /quiet probe/.test(t2.text), 'and is shown once the screen is closed', t2);
    // the support module's quiet action opens this screen, not its older one
    await A.support(p); await p.waitForTimeout(400);
    const sp = await p.evaluate(a => ({ mine: !document.querySelector(a.screen).hidden, old: !!document.getElementById('sc-quiet') }), S);
    ok(sp.mine && !sp.old, 'the support module\'s "I need quiet" opens this screen, not its older dark one', sp);
    await closeAll(p);
  } else {
    await A.support(p); await p.waitForTimeout(400);
    const sp = await p.evaluate(a => ({ mine: !document.querySelector(a.screen).hidden, old: !!document.getElementById('sc-quiet') }), S);
    ok(sp.mine && !sp.old, 'the support module\'s "I need quiet" opens this screen', sp); await closeAll(p);
  }

  // Focus has a way in
  const wsel = await A.focusWay(p);
  const wy = await p.evaluate(sel => { const k = document.querySelector(sel); if (!k) return null; const r0 = k.getBoundingClientRect(); const inView0 = r0.top >= 0 && r0.bottom <= innerHeight;
    k.scrollIntoView({ block: 'center' }); const r = k.getBoundingClientRect(); return { text: k.textContent.trim(), y0: Math.round(r0.top), inView0, w: Math.round(r.width), x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, wsel);
  ok(wy && wy.w > 40, 'Focus has a way in: "' + (wy && wy.text) + '"', wy);
  if (APP === 'forge') ok(wy && wy.inView0, 'in the Forge it is at the top of Focus, seen without scrolling', wy && { y: wy.y0 });
  else info('Ingenium\'s way in sits in the Calm card' + (wy && wy.inView0 ? ', in view' : ', below the first view'), wy && { y: wy.y0 });
  if (wy) {
    await p.waitForTimeout(300); await p.mouse.click(wy.x, wy.y); await p.waitForTimeout(400);
    s = await screenState(p); ok(s.open, 'it opens the quiet screen', { open: s.open });
    if (APP === 'forge') await p.screenshot({ path: path.join(OUT, 'forge-quiet-from-focus.png') });
    await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    const fr = await p.evaluate(sel => { const k = document.querySelector(sel), a = document.activeElement; return { back: !!(k && (a === k || (a && a.textContent && a.textContent.trim() === k.textContent.trim() && a.tagName === 'BUTTON'))), active: a && (a.id || a.className || a.tagName) }; }, wsel);
    ok(fr.back, 'and focus goes back to it after', fr);
    if (APP === 'forge') { await p.evaluate(() => window.scrollTo(0, 0)); const fy = await p.evaluate(() => { const rf = document.getElementById('room-focus'); return rf ? rf.getBoundingClientRect().top : 0; });
      await p.screenshot({ path: path.join(OUT, 'forge-focus-way-in.png'), clip: { x: 200, y: 0, width: 1240, height: 420 } }); }
    // the Calm card's "I need quiet" in Focus
    const cq = await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => /^I need quiet$/.test(x.textContent.trim()) && x.offsetParent); if (!k) return null; k.scrollIntoView({ block: 'center' }); const r = k.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
    if (cq) { await p.waitForTimeout(250); await p.mouse.click(cq.x, cq.y); await p.waitForTimeout(400); const o = await p.evaluate(a => ({ mine: !document.querySelector(a.screen).hidden, old: !!document.getElementById('sc-quiet') }), S);
      ok(o.mine && !o.old, 'Focus: Calm, "I need quiet" opens it too', o); await p.keyboard.press('Escape'); await p.waitForTimeout(200); }
    else info('no "I need quiet" key in Calm on this page');
  }
  await p.evaluate(() => { try { if (window.FORGE) FORGE.openRoom('editor'); else go('home'); } catch (e) { } }); await p.waitForTimeout(600);

  // the key that lays the side keys down takes the leaf with the others
  const fold = await rectOf(p, A.fold);
  if (fold && fold.w) {
    await p.click(A.fold); await p.waitForTimeout(700);
    const down = await p.evaluate(a => { const k = document.querySelector(a.key), m = document.querySelector(a.moon); const g = x => { const r = x.getBoundingClientRect(), c = getComputedStyle(x); return { gone: +c.opacity < 0.05 || r.left >= innerWidth || c.display === 'none' || c.visibility === 'hidden', pe: c.pointerEvents }; }; return { key: g(k), moon: g(m) }; }, S);
    ok(down.key.gone === down.moon.gone && down.key.gone, 'the key that lays the side keys down lays the leaf down with them', down);
    await p.click(A.fold); await p.waitForTimeout(700);
    const up = await rectOf(p, A.key); ok(up && up.op > 0.5 && up.x < 1440, 'and raises it again', up && { x: Math.round(up.x), op: up.op });
  } else info('no key to lay the side keys down was found', fold);
  // the tour
  const tr = await A.tour(p);
  ok(tr && tr.present, 'the tour has a card for the leaf', tr);
  if (APP === 'forge') ok(tr && tr.afterInbox && tr.ringed, 'it follows the thought bubble\'s card and rings the leaf', tr);

  // axe: nothing in what was added (the screen open, its keys, the way in at Focus)
  if (AXE) {
    await clickKey(p); await p.addScriptTag({ path: AXE });
    const ax = await p.evaluate(async a => { const inc = [[a.screen], [a.key]]; const r = await axe.run({ include: inc }, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] }, resultTypes: ['violations'] });
      return r.violations.map(v => ({ id: v.id, n: v.nodes.length, t: v.nodes.slice(0, 3).map(n => n.target.join(' ')) })); }, S);
    ok(ax.length === 0, 'axe (WCAG 2.1 A and AA, and best practice) finds nothing on the screen and its key, by day', ax);
    await closeAll(p); await A.night(p, true); await p.waitForTimeout(400); await clickKey(p);
    const axn = await p.evaluate(async a => { const r = await axe.run({ include: [[a.screen], [a.key]] }, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes: ['violations'] });
      return r.violations.map(v => ({ id: v.id, n: v.nodes.length, t: v.nodes.slice(0, 3).map(n => n.target.join(' ')) })); }, S);
    ok(axn.length === 0, 'and by night', axn);
    await closeAll(p); await A.night(p, false);
    if (APP === 'forge') { await A.focusWay(p);
      const axf = await p.evaluate(async () => { const r = await axe.run({ include: [['#room-focus .forge-quiet-way']] }, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes: ['violations'] }); return r.violations.map(v => ({ id: v.id, n: v.nodes.length })); });
      ok(axf.length === 0, 'axe finds nothing on the way in at Focus', axf); }
    // the whole page with the screen closed: nothing that names the screen or its key
    const axw = await p.evaluate(async a => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes: ['violations'] });
      const mine = /forge-quiet|qsc-|quietScreen|fabQuiet|qsBack|qsCatch/;
      return { all: r.violations.length, mine: r.violations.map(v => ({ id: v.id, t: v.nodes.map(n => n.target.join(' ')).filter(t => mine.test(t)) })).filter(v => v.t.length) }; }, S);
    ok(axw.mine.length === 0, 'axe on the whole page: none of its findings are in the quiet screen or its keys', axw);
  } else info('axe.min.js was not found: the axe checks were not run');

  // ---------------- reduced motion, asked by the device ----------------
  const rc = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const rp = await rc.newPage(); rp.on('pageerror', e => errs.push(e.message));
  await rp.goto(URL_, { timeout: 180000 }).catch(() => { }); await A.boot(rp); await A.night(rp, false); await A.minimal(rp, false).catch(() => { }); await A.calm(rp, false).catch(() => { }); await rp.waitForTimeout(400);
  await clickKey(rp); s = await screenState(rp);
  ok(s.open && (s.anim === 'none' || s.play === 'paused'), 'when the device asks for reduced motion, the circle is still', { anim: s.anim, play: s.play, motion: await rp.evaluate(() => document.body.getAttribute('data-motion')) });
  ok(s.small === W.stay, 'and the words are the short ones', s.small);
  await closeAll(rp);
  const ga = await rp.evaluate(a => { const g = document.querySelector(a.key).firstElementChild, m = document.querySelector(a.moon).firstElementChild; return { leaf: g && getComputedStyle(g).animationName, moon: m && getComputedStyle(m).animationName }; }, S);
  if (APP === 'forge') ok(ga.leaf === 'none', 'and the leaf itself rests', ga); else info('the side key\'s glyph under reduced motion', ga);
  await rc.close();

  // ---------------- a phone: 390 x 844 ----------------
  const pc = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const pp = await pc.newPage(); pp.on('pageerror', e => errs.push(e.message));
  await pp.goto(URL_, { timeout: 180000 }).catch(() => { }); await A.boot(pp); await A.night(pp, false); await pp.waitForTimeout(500);
  await sideKey(pp, 'phone');
  const px = await rectOf(pp, A.key);
  await pp.screenshot({ path: path.join(OUT, APP + '-phone-side-day.png') });
  const kr = await rectOf(pp, A.key); await pp.tap(A.key).catch(async () => { await pp.mouse.click(kr.x + kr.w / 2, kr.y + kr.h / 2); }); await pp.waitForTimeout(500);
  s = await screenState(pp);
  ok(s.open && s.sw <= s.cw + 1 && s.backRect && s.backRect.x >= 0 && s.backRect.x + s.backRect.w <= s.vw && s.backRect.y + s.backRect.h <= s.vh, 'on a phone it fits the width, and the back key is in view', s && { sw: s.sw, cw: s.cw, back: s.backRect });
  ok(s.backRect && s.backRect.h >= 44, 'the back key is large enough to touch (44 px or more)', s.backRect);
  await pp.screenshot({ path: path.join(OUT, APP + '-quiet-phone-day.png') });
  await closeAll(pp); await A.night(pp, true); await pp.waitForTimeout(500);
  await pp.screenshot({ path: path.join(OUT, APP + '-phone-side-night.png') });
  const kr2 = await rectOf(pp, A.key); await pp.mouse.click(kr2.x + kr2.w / 2, kr2.y + kr2.h / 2); await pp.waitForTimeout(500);
  s = await screenState(pp); ok(s.open && near(parse(s.bg), A.bg.night), 'on a phone by night: the deep, dim page', { bg: s.bg });
  await pp.screenshot({ path: path.join(OUT, APP + '-quiet-phone-night.png') });
  await pc.close();

  // ---------------- a phone held sideways: 844 x 390 ----------------
  const lc = await b.newContext({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true });
  const lp = await lc.newPage(); lp.on('pageerror', e => errs.push(e.message));
  await lp.goto(URL_, { timeout: 180000 }).catch(() => { }); await A.boot(lp); await lp.waitForTimeout(1500);
  const side = await lp.evaluate(a => { const h = document.querySelector(a.header), hb = h ? h.getBoundingClientRect().bottom : 0; const k = document.querySelector(a.key);
    const kv = !!(k && getComputedStyle(k).display !== 'none' && k.getBoundingClientRect().width);
    const keys = a.others.concat([a.key]).map(sel => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(), c = getComputedStyle(e); if (!r.width || c.display === 'none' || +c.opacity < 0.05) return null; return [sel, Math.round(r.top), Math.round(r.bottom)]; }).filter(Boolean);
    return { header: Math.round(hb), leaf: kv, keys, clear: keys.every(x => x[1] >= hb - 1 && x[2] <= innerHeight) }; }, S);
  ok(side.clear, 'a phone held sideways: every side key stands clear of the bar at the top and inside the window', side);
  if (!side.leaf) { const w2 = await A.focusWay(lp); const fw = await lp.evaluate(sel => !!document.querySelector(sel), w2);
    ok(fw, 'where the leaf steps aside (a short screen), Focus still has its way in', { leaf: side.leaf, focusWay: fw }); }
  else info('a phone held sideways: the leaf is in the column');
  await lp.screenshot({ path: path.join(OUT, APP + '-phone-sideways.png') });
  await lc.close();

  const mine = errs.filter(e => /quiet|qsc|QuietScreen|forgeQuiet/i.test(e));
  ok(!mine.length, 'no page errors from the quiet screen', mine.slice(0, 4));
  if (errs.length) info('other page errors (not the quiet screen\'s)', errs.slice(0, 4));
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL crashed ' + e.stack); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
