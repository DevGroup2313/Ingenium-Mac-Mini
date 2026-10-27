// Ingenium and the Forge · what comes at a time wears the app's own reminder card, never a near-black one.
// The owner's words (21 October 2026): "I want the time reminders that show up on the screen to be in a blue card or a
// better colour that matches the app better instead of the black colour it currently is, please make the fix."
// Each reminder the app shows at a time is made to appear the way the app makes it: the word five minutes before the
// next item of the day (a plan with an item three minutes ahead, the Forge), a thought whose time has come, the
// two-minute start and the word at its end, Custodia's pause after a long stretch of focus, and in Ingenium the gentle
// notices (a focus session's last minutes, a break after steady work). Then, by day and by night, on a desk (1440x900)
// and on a phone (390x844):
//  · its card is measured from the screen's own pixels: its words hidden for a moment, its keys and its edges left out,
//    the median of what is left;
//  · it must not be near black (CIE L* under 20 with chroma C* under 12);
//  · it must be one of the app's own reminder colours (CIE76 ΔE at most 12 from the nearest of them);
//  · every line of words on it, and on its keys, must reach a contrast of 4.5 to 1 (WCAG 2.1) against the pixels
//    behind it;
//  · with axe-core (when its file is given), what it shows must break no WCAG 2.1 A or AA rule;
//  · where it sits and how much of the app's own keys it covers are written down, to set beside the page before.
// Screenshots: <out>/<app>-<reminder>-<day|night>-<desk|phone>.png; the numbers: <out>/reminder_cards.json.
//   node rig/t_reminder_cards.js <page url> <out folder> <ingenium|forge> [axe.min.js]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, APP, AXE] = process.argv.slice(2);
if (!URL_ || !OUT || !/^(ingenium|forge)$/.test(APP || '')) { console.log('usage: node t_reminder_cards.js <url> <outdir> <ingenium|forge> [axe.min.js]'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 400) : '')); c ? pass++ : fail++; };

/* ---------- each app's own reminder colours ---------- */
const PAL = {
  forge: { '#0c3c52': 'its toast, cdToast', '#17577a': 'its anvil blue', '#124866': 'anvil blue, low', '#0a3049': 'anvil blue, edge', '#145671': 'deep ocean', '#1b6b93': 'ocean blue' },
  ingenium: { '#4e2c8a': 'amethyst, deep (fill low)', '#43277a': 'amethyst jewel, low', '#472b7f': 'amethyst, night fill low', '#5d37a1': 'violet key, low', '#6a3fb5': 'amethyst accent', '#6b4fa0': 'violet accent', '#603ca6': 'violet, night fill' }
}[APP];

/* ---------- colour ---------- */
const hex = c => '#' + c.map(v => ('0' + Math.round(v).toString(16)).slice(-2)).join('');
const unhex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const lin = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
const lum = c => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
function lab(c) { const r = lin(c[0]), g = lin(c[1]), b = lin(c[2]);
  const X = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047, Y = r * 0.2126 + g * 0.7152 + b * 0.0722, Z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  const f = t => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
  return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))]; }
const dE = (a, b) => { const p = lab(a), q = lab(b); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); };
const nearBlack = c => { const l = lab(c); return { L: +l[0].toFixed(1), C: +Math.hypot(l[1], l[2]).toFixed(1), black: l[0] < 20 && Math.hypot(l[1], l[2]) < 12 }; };
const nearest = (c, more) => { const P = Object.assign({}, PAL, more || {}); return Object.keys(P).map(h => ({ h, name: P[h], d: dE(c, unhex(h)) })).sort((a, b) => a.d - b.d)[0]; };
// 6.8, the owner's words: a thought that comes back has "full parity with Carpe Diem's 'Thoughts' reminder cloud popups", in Ingenium's
// colours: by day the raised paper card it shares with Carpe Diem (white, as Carpe Diem's); by night it stays amethyst
const PAPER = { '#ffffff': 'paper (a thought by day, the raised card shared with Carpe Diem)', '#fbfafd': 'paper, low' };
const over = (fg, bg) => fg[3] >= 1 ? fg.slice(0, 3) : [0, 1, 2].map(i => fg[i] * fg[3] + bg[i] * (1 - fg[3]));

/* ---------- the app ---------- */
async function ready(p) {
  if (APP === 'forge') {
    await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 240000 });
    await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); });
    await p.waitForFunction(() => window.forgeSupport && window.forgeSupport.sc && window.forgeSupport.tc && !document.querySelector('#cd-door'), null, { timeout: 60000 });
  } else {
    await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(800);
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
    await p.waitForFunction(() => window.IngSupport && window.IngInbox, null, { timeout: 60000 });
  }
  await p.waitForTimeout(1500);
}
async function setTheme(p, night) {
  if (APP === 'forge') {
    for (let i = 0; i < 3; i++) {
      const now = await p.evaluate(() => document.body.getAttribute('data-theme') === 'night'); if (now === night) break;
      await p.evaluate(() => document.getElementById('cd-theme-fab').click()); await p.waitForTimeout(700);
    }
  } else {
    await p.evaluate(n => { const t = n ? 'night' : 'day'; try { state.theme = t; applyTheme(); } catch (e) { } document.body.setAttribute('data-theme', t); }, night);
  }
  await p.waitForTimeout(600);
  return p.evaluate(() => document.body.getAttribute('data-theme'));
}
const SC = APP === 'forge' ? 'window.forgeSupport.sc' : 'window.IngSupport.sc';
const TCx = APP === 'forge' ? 'window.forgeSupport.tc' : 'window.IngInbox.tc';
const ev = (p, src) => p.evaluate(src);
const waitFor = (p, fn, ms) => p.waitForFunction(fn, null, { timeout: ms || 5000 }).then(() => true, () => false);
async function closeAll(p) {
  await ev(p, `(function(){try{var t=document.getElementById('sc-toast');if(t){clearTimeout(t.__h);t.classList.remove('show');}}catch(e){}
    try{var i=document.getElementById('ingToast');if(i)i.style.display='none';}catch(e){}
    try{var x=document.querySelector('.tc-nudge .tc-nudge-x');if(x)x.click();}catch(e){}
    try{${SC}.stopJust(true);}catch(e){}
    try{if(typeof custodiaClose==='function')custodiaClose();if(typeof custodiaW==='function'){var w=custodiaW();w.acc=0;w.open=false;}}catch(e){}
    try{if(typeof pomo!=='undefined'&&pomo.running)pomoStop();}catch(e){}
    try{var s=document.getElementById('supNotice');if(s)s.innerHTML='';}catch(e){}})()`);
  await p.waitForTimeout(350);
}

/* ---------- each reminder: how the app makes it, and where its card is ---------- */
const CASES = [];
if (APP === 'forge') CASES.push({ id: 'five-minutes', name: 'the word five minutes before the next item of the day', card: '#sc-toast.show', root: '#sc-toast',
  show: async p => {
    await ev(p, `(function(){var f=function(x){return ('0'+x.getHours()).slice(-2)+':'+('0'+x.getMinutes()).slice(-2);},n=Date.now();
      var s=new Date(n-30*60000),e=new Date(n+60*60000),d=new Date(n+3*60000);window.isWorkday=function(){return true;};
      var id='rcT'+n;window.weekdayFor=function(){return {morning:{id:'rcB',title:'🔨 The test block',time:f(s)+' - '+f(e),tasks:[{id:id,title:'Send the release notes',time:f(d)}]}};};})()`);
    // the module looks every 30 seconds, and the Forge's timer governor stretches that (by 1.6 here, measured; up to 3.6
    // on a slow device), so up to two minutes are allowed
    const got = await waitFor(p, () => { const t = document.getElementById('sc-toast'); if (t && t.classList.contains('show') && /five minutes/.test(t.textContent)) { clearTimeout(t.__h); return true; } return false; }, 120000);
    return got;
  } });
CASES.push({ id: 'thought', name: 'a thought whose time has come', card: '.tc-nudge .tc-body', root: '.tc-nudge',
  show: async p => {
    await ev(p, `(function(){var it={id:'rc'+Date.now(),t:'Ring the printer about the proofs',at:Date.now()-2*3600e3,sphere:'work',remindAt:Date.now()-1000};
      ${APP === 'forge' ? 'state.support.box.unshift(it);' : 'state.parked=state.parked||[];state.parked.unshift(it);'}${TCx}.tick();})()`);
    const got = await waitFor(p, () => !!document.querySelector('.tc-nudge'), 4000);
    await p.waitForTimeout(600);
    await ev(p, `(function(){var n=document.querySelector('.tc-nudge');if(n)n.dispatchEvent(new PointerEvent('pointerenter'));})()`);
    return got;
  } });
CASES.push({ id: 'two-minute-chip', name: 'the two-minute start, while it runs', card: '#sc-just', root: '#sc-just',
  show: async p => { await ev(p, `${SC}.justStart()`); return waitFor(p, () => !!document.getElementById('sc-just'), 3000); } });
CASES.push({ id: 'two-minutes-end', name: 'the word at the end of the two minutes', card: APP === 'forge' ? '#sc-toast.show' : '#sc-toast.show, #ingToast', root: APP === 'forge' ? '#sc-toast' : '#sc-toast, #ingToast',
  show: async p => {
    await ev(p, `${SC}.justStart()`); await p.waitForTimeout(300);
    // the clock is moved on by two minutes for a moment, so the chip's own tick finds its time is up
    await ev(p, `(function(){var real=Date.now;Date.now=function(){return real()+125000;};setTimeout(function(){Date.now=real;},1200);})()`);
    const got = await waitFor(p, () => { const t = document.getElementById('sc-toast'), i = document.getElementById('ingToast');
      if (t && t.classList.contains('show') && /Two minutes/.test(t.textContent)) { clearTimeout(t.__h); return true; }
      if (i && i.style.display !== 'none' && /Two minutes/.test(i.textContent)) { try { clearTimeout(ingToast._t); } catch (e) { } return true; } return false; }, 5000);
    await p.waitForTimeout(1300); return got;
  } });
CASES.push({ id: 'custodia', name: "Custodia's pause after a long stretch of focus", card: APP === 'forge' ? '#custodia-overlay > div' : '#custodiaOverlay .cust-card', root: APP === 'forge' ? '#custodia-overlay' : '#custodiaOverlay',
  show: async p => {
    // as the timer makes it: a focus session running, with the stretch already long
    await ev(p, `(function(){try{var w=custodiaW();w.open=false;w.acc=custodiaLimitMin()*60+1;w.lastMs=Date.now();pomo.phase='focus';if(!pomo.running)pomoStart();}catch(e){}})()`);
    let got = await waitFor(p, () => !!document.querySelector('#custodia-overlay, #custodiaOverlay'), 4000);
    await ev(p, `(function(){try{pomoStop();}catch(e){}})()`);
    if (!got) { await ev(p, `custodiaPrompt()`); got = await waitFor(p, () => !!document.querySelector('#custodia-overlay, #custodiaOverlay'), 2000); if (got) console.log('NOTE Custodia was opened by its own function, not by the timer'); }
    return got;
  } });
if (APP === 'ingenium') {
  CASES.push({ id: 'session-end', name: "a focus session's last minutes (the gentle notice)", card: '#supNotice .sup-note', root: '#supNotice',
    show: async p => {
      await ev(p, `(function(){var w=+sup('warn')||5;pomo.phase='focus';pomo.remaining=w*60+1;pomo.running=false;pomoStart();})()`);
      const got = await waitFor(p, () => !!document.querySelector('#supNotice .sup-note'), 5000);
      await ev(p, `(function(){try{pomoStop();}catch(e){}})()`); return got;
    } });
  CASES.push({ id: 'break', name: 'a break after steady work ("A break?")', card: '#supNotice .sup-note', root: '#supNotice',
    show: async p => {
      await ev(p, `(function(){state.support=state.support||{};if(sup('guard')===false)state.support.guard=true;supAct.last=Date.now();supAct.snoozeTo=0;supAct.offDay='';
        supAct.acc=(+sup('guardMin')||50)*60000;supGuardTick();})()`);
      return waitFor(p, () => !!document.getElementById('supGuardNote'), 3000);
    } });
}

/* ---------- measuring one card ---------- */
const HUSH = '.rc-hush,.rc-hush *{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;outline:none!important;transition:none!important;caret-color:transparent!important}';
async function measure(p, dec, cs) {
  const info = await p.evaluate(sel => {
    const card = [...document.querySelectorAll(sel)].filter(n => { const r = n.getBoundingClientRect(), s = getComputedStyle(n); return r.width > 2 && r.height > 2 && s.display !== 'none' && s.visibility !== 'hidden'; }).pop();
    if (!card) return null;
    document.querySelectorAll('[data-rc],[data-rc-card]').forEach(n => { n.removeAttribute('data-rc'); n.removeAttribute('data-rc-card'); });
    card.setAttribute('data-rc-card', '1');
    const R = card.getBoundingClientRect(), box = { x: Math.max(0, Math.floor(R.left)), y: Math.max(0, Math.floor(R.top)) };
    box.w = Math.min(innerWidth, Math.ceil(R.right)) - box.x; box.h = Math.min(innerHeight, Math.ceil(R.bottom)) - box.y;
    const rgba = s => { const m = /rgba?\(([^)]+)\)/.exec(s); if (!m) return [0, 0, 0, 0]; const v = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return [v[0], v[1], v[2], v.length > 3 ? v[3] : 1]; };
    const ownBg = n => { const s = getComputedStyle(n); return rgba(s.backgroundColor)[3] > 0.05 || s.backgroundImage !== 'none'; };
    const pics = /^[\p{Extended_Pictographic}\uFE0F\u200D\s]+$/u;
    const bgs = [], texts = []; let k = 0;
    card.querySelectorAll('*').forEach(n => { const r = n.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return;
      if (ownBg(n)) { n.setAttribute('data-rc', 'b' + (k++)); bgs.push({ id: n.getAttribute('data-rc'), x: r.left - box.x, y: r.top - box.y, w: r.width, h: r.height, tag: n.tagName.toLowerCase() + (n.className && typeof n.className === 'string' ? '.' + n.className.trim().split(/\s+/).join('.') : '') }); } });
    [card, ...card.querySelectorAll('*')].forEach(n => { const own = [...n.childNodes].filter(c => c.nodeType === 3).map(c => c.textContent).join('').trim(); if (!own || pics.test(own)) return;
      const s = getComputedStyle(n), r = n.getBoundingClientRect(); if (r.width < 1 || r.height < 1 || s.visibility === 'hidden' || +s.opacity === 0) return;
      let o = n; while (o && o !== card && !o.getAttribute('data-rc')) o = o.parentElement;
      texts.push({ text: own.slice(0, 60), color: rgba(s.color), on: o && o !== card ? o.getAttribute('data-rc') : 'card', size: s.fontSize, weight: s.fontWeight }); });
    // the app's own keys it lies over (any key outside the reminder)
    const root = card.closest('#sc-toast,#ingToast,.tc-nudge,#sc-just,#custodia-overlay,#custodiaOverlay,#supNotice') || card;
    let cover = 0, keys = 0; document.querySelectorAll('button,a[href],[role=button],input,select,textarea').forEach(c => { if (root.contains(c)) return; const r = c.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return;
      const s = getComputedStyle(c); if (s.visibility === 'hidden' || s.display === 'none') return;
      const w = Math.min(R.right, r.right) - Math.max(R.left, r.left), h = Math.min(R.bottom, r.bottom) - Math.max(R.top, r.top); if (w > 0 && h > 0) { cover += w * h; keys++; } });
    const cs = getComputedStyle(card);
    return { box, rect: [R.left, R.top, R.width, R.height].map(Math.round), radius: parseFloat(cs.borderTopLeftRadius) || 0, bgs, texts, cover: Math.round(cover), keys, css: { bg: cs.backgroundColor, img: cs.backgroundImage.slice(0, 90), color: cs.color } };
  }, cs.card);
  if (!info) return null;
  await p.evaluate(css => { let st = document.getElementById('rc-hush-css'); if (!st) { st = document.createElement('style'); st.id = 'rc-hush-css'; st.textContent = css; document.head.appendChild(st); }
    const card = document.querySelector('[data-rc-card]'); if (card) card.classList.add('rc-hush'); }, HUSH);
  await p.waitForTimeout(80);
  const png = await p.screenshot({ clip: { x: info.box.x, y: info.box.y, width: Math.max(1, info.box.w), height: Math.max(1, info.box.h) } });
  await p.evaluate(sel => document.querySelectorAll('.rc-hush').forEach(n => n.classList.remove('rc-hush')), cs.card);
  await p.waitForTimeout(400);
  const inset = Math.max(4, Math.min(info.radius * 0.6, 14)) + 2;
  const regions = [{ id: 'card', x: 0, y: 0, w: info.box.w, h: info.box.h, inset, excl: info.bgs }].concat(info.bgs.map(b => ({ id: b.id, x: b.x, y: b.y, w: b.w, h: b.h, inset: 3, excl: [] })));
  const med = await dec.evaluate(async ([b64, regions]) => {
    const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const g = c.getContext('2d'); g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data, out = {};
    regions.forEach(rg => { const R = [], G = [], B = [];
      for (let y = Math.ceil(rg.y + rg.inset); y < rg.y + rg.h - rg.inset; y += 2) for (let x = Math.ceil(rg.x + rg.inset); x < rg.x + rg.w - rg.inset; x += 2) {
        if (x < 0 || y < 0 || x >= c.width || y >= c.height) continue;
        if (rg.excl.some(e => x >= e.x - 6 && x < e.x + e.w + 6 && y >= e.y - 6 && y < e.y + e.h + 6)) continue;
        const i = (y * c.width + x) * 4; R.push(d[i]); G.push(d[i + 1]); B.push(d[i + 2]); }
      const m = a => { if (!a.length) return null; a.sort((p, q) => p - q); return a[a.length >> 1]; };
      out[rg.id] = R.length ? [m(R), m(G), m(B)] : null; out[rg.id + '#n'] = R.length; });
    return out; }, [png.toString('base64'), regions]);
  const face = med.card;
  const words = info.texts.map(t => { const bg = (t.on !== 'card' && med[t.on]) || face; const fg = over(t.color, bg); return { text: t.text, on: t.on, fg: hex(fg), bg: hex(bg), ratio: +ratio(fg, bg).toFixed(2) }; });
  return { face, n: med['card#n'], info, words };
}

async function axeOn(p, root) {
  if (!AXE) return null;
  if (!(await p.evaluate(() => !!window.axe))) await p.addScriptTag({ path: AXE });
  return p.evaluate(async root => { const els = [...document.querySelectorAll(root)]; if (!els.length) return [];
    const r = await axe.run({ include: els }, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes: ['violations'] });
    return r.violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, eg: v.nodes[0] && v.nodes[0].target.join(' '), why: v.nodes[0] && (v.nodes[0].failureSummary || '').slice(0, 200) })); }, root);
}

(async () => {
  const engines = [['chromium', pw.chromium]];
  let wk = false; try { wk = fs.existsSync(pw.webkit.executablePath()); } catch (e) { wk = false; }
  if (wk) engines.push(['webkit', pw.webkit]); else console.log('NOTE WebKit is not installed here (the Playwright browsers hold Chromium only), so this ran in Chromium only.');
  const all = [];
  for (const [ename, eng] of engines) {
    const b = await eng.launch({ headless: true, args: ename === 'chromium' ? ['--no-sandbox'] : [] });
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    const dec = await ctx.newPage(); await dec.setContent('<!doctype html><title>decode</title>');
    const t0 = Date.now(); await p.goto(URL_, { timeout: 300000 }); await ready(p);
    console.log(`${ename}: ${APP} ready in ${Date.now() - t0} ms`);
    const looks = await p.evaluate(() => ({ sc: !!document.querySelector('style#sc-css') && /data-sc-look/.test(document.getElementById('sc-css').textContent), tc: /data-tc-remind/.test((document.getElementById('tc-css') || {}).textContent || '') }));
    console.log('the page\'s shared modules know the reminder card: support ' + looks.sc + ', thoughts ' + looks.tc);
    for (const cs of CASES) {
      await closeAll(p); await setTheme(p, false); await p.setViewportSize({ width: 1440, height: 900 });
      const shown = await cs.show(p);
      ok(shown, `${ename} · ${cs.name}: it appears`);
      if (!shown) continue;
      for (const night of [false, true]) {
        const th = await setTheme(p, night);
        for (const vp of [{ n: 'desk', w: 1440, h: 900 }, { n: 'phone', w: 390, h: 844 }]) {
          await p.setViewportSize({ width: vp.w, height: vp.h }); await p.waitForTimeout(700);
          if (!(await p.evaluate(sel => !!document.querySelector(sel), cs.card))) { await cs.show(p); await setTheme(p, night); await p.waitForTimeout(700); }
          const where = `${ename} · ${cs.id} · ${night ? 'night' : 'day'} · ${vp.n}`;
          const shot = path.join(OUT, `${APP}-${cs.id}-${night ? 'night' : 'day'}-${vp.n}${ename === 'chromium' ? '' : '-' + ename}.png`);
          await p.screenshot({ path: shot });
          // axe first, while the words are as the app drew them (the measuring below hides them for a moment)
          const ax = await axeOn(p, cs.root);
          const m = await measure(p, dec, cs);
          if (!m || !m.face) { ok(false, where + ': its card was found and measured'); continue; }
          const nb = nearBlack(m.face), nr = nearest(m.face, APP === 'ingenium' && cs.id === 'thought' && !night ? PAPER : null), low = m.words.slice().sort((a, b) => a.ratio - b.ratio)[0];
          const row = { engine: ename, app: APP, reminder: cs.id, theme: night ? 'night' : 'day', themeAttr: th, view: vp.n, card: hex(m.face), pixels: m.n, L: nb.L, C: nb.C, luminance: +lum(m.face).toFixed(4), nearBlack: nb.black,
            nearest: nr.h, nearestName: nr.name, dE: +nr.d.toFixed(1), minContrast: low ? low.ratio : null, minText: low ? low.text : null, minPair: low ? low.fg + ' on ' + low.bg : null, words: m.words,
            rect: m.info.rect, coversKeys: m.info.keys, coversArea: m.info.cover, css: m.info.css, shot };
          ok(!nb.black, `${where}: the card is not near black`, `${row.card} (L* ${nb.L}, C* ${nb.C})`);
          ok(nr.d <= 12, `${where}: the card is one of ${APP === 'forge' ? "the Forge's" : "Ingenium's"} own colours`, `${row.card} is ΔE ${row.dE} from ${nr.h} (${nr.name})`);
          ok(low && low.ratio >= 4.5, `${where}: every line of words reads at 4.5 to 1 or more`, low ? `lowest ${low.ratio}: "${low.text}" ${low.fg} on ${low.bg}` : 'no words found');
          if (ax) { ok(ax.length === 0, `${where}: axe-core finds no WCAG 2.1 A or AA rule broken in it`, ax); row.axe = ax; }
          all.push(row);
        }
      }
    }
    await closeAll(p);
    ok(errs.length === 0, `${ename}: the page raised no errors`, errs.slice(0, 4));
    await b.close();
  }
  fs.writeFileSync(path.join(OUT, 'reminder_cards.json'), JSON.stringify(all, null, 1));
  console.log('\nreminder · theme · view · card (L*, C*) · nearest own colour (ΔE) · lowest contrast · where (x, y, w, h) · keys covered (area)');
  all.forEach(r => console.log(`${r.engine === 'chromium' ? '' : r.engine + ' · '}${r.reminder} · ${r.theme} · ${r.view} · ${r.card} (${r.L}, ${r.C})${r.nearBlack ? ' NEAR BLACK' : ''} · ${r.nearest} (${r.dE}) · ${r.minContrast} · ${r.rect.join(',')} · ${r.coversKeys} (${r.coversArea})`));
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('crashed', e.stack); process.exit(3); });
