// Ingenium 6.7 · on a phone (modules r174, part p95), in Chromium with an iPhone's user agent, touch, and the notch's safe
// areas emulated: every page of the app and every panel of the top bar, at the three iPhone sizes (375 x 812, 393 x 852,
// 430 x 932) by day and by night, every top bar panel at each phone width from 320 to 430 upright and sideways, and a quick
// pass at the iPad's sizes (820 x 1180, 1024 x 1366) and the Fire tablet's (800 x 1280). It looks for:
//   overflow   the document wider than the window (it would scroll sideways)
//   edges      a box that runs past the left or right edge of the window (not one inside a box that scrolls or clips it)
//   covered    words that a floating element (the side column of keys, a bubble) lies over, now or once the page scrolls
//   panels     a panel or popover cut by the window or the safe areas, or taller than the window without scrolling itself
//   keys       on a phone, a key smaller than 44 pixels either way (words linked inside a sentence are allowed), on the pages
//              and in the top bar's panels
//   side keys  what each side key opens (reminders, the quiet screen, a thought, the Clepsydra, the notes), inside the
//              window and the safe areas, upright and sideways; the column itself between the top bar and the foot, no key
//              over another, 44 pixels upright, and sideways one column of 38 pixels or more (r155) or two of 44
// and prints PASS or FAIL for each place, then the count. Screenshots and report.json go into <out>.
//   axe        axe-core (WCAG 2.1 A and AA) on every page and with each top bar panel open, on a phone with touch, by day and night
//   T67_AXE=path/to/axe.min.js node rig/t_67_phone.js http://127.0.0.1:8162/ingenium.html <out> [phones|panels|side|axe|tablets|all] [page,...]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3], PART = process.argv[4] || 'all', ONLY = (process.argv[5] || '').split(',').filter(Boolean);
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const report = [];
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + (Array.isArray(d) ? d.length + ': ' : '') + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900) : '')); c ? pass++ : fail++; report.push({ ok: !!c, m, d }); };
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const UA_IPAD = 'Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const UA_FIRE = 'Mozilla/5.0 (Linux; Android 11; KFTRWI) AppleWebKit/537.36 (KHTML, like Gecko) Silk/126.3.1 like Chrome/126.0.6478.71 Safari/537.36';
let PAGES = ['home', 'chat', 'code', 'focus', 'models', 'blend', 'lector', 'build', 'fabrica', 'notes', 'guide', 'settings'];
if (ONLY.length) PAGES = PAGES.filter(p => ONLY.includes(p));
const UPRIGHT = { top: 59, bottom: 34, left: 0, right: 0 }, SIDEWAYS = { top: 0, bottom: 21, left: 59, right: 59 }, NONE = { top: 0, bottom: 0, left: 0, right: 0 }, IPAD = { top: 24, bottom: 20, left: 0, right: 0 };

async function open(b, vp, insets, ua) {
  const ctx = await b.newContext({ viewport: { width: vp[0], height: vp[1] }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, userAgent: ua || UA });
  const p = await ctx.newPage(); p.__errs = [];
  p.on('pageerror', e => p.__errs.push(e.message || String(e)));
  const cdp = await ctx.newCDPSession(p);
  await cdp.send('Emulation.setSafeAreaInsetsOverride', { insets });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 });
  await p.waitForTimeout(900);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(700);
  return { ctx, p, cdp };
}
async function theme(p, t) { await p.evaluate(t => { state.theme = t; applyTheme(); }, t); await p.waitForTimeout(350); }
async function goTo(p, pg) { await p.evaluate(pg => { try { if (typeof closeModal === 'function') closeModal(); } catch (e) { } try { closePresenceMenu(); } catch (e) { } go(pg); window.scrollTo(0, 0); }, pg); await p.waitForTimeout(pg === 'lector' || pg === 'settings' || pg === 'models' ? 1500 : 1000); }

// ---------------- the checks that run inside the page ----------------
function inPage(opts) {
  const W = innerWidth, H = innerHeight, out = { overflow: null, edges: [], covered: [], keys: [], floats: [] };
  const safe = (() => { const d = document.createElement('div'); d.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);visibility:hidden;pointer-events:none'; document.body.appendChild(d); const c = getComputedStyle(d); const r = { t: parseFloat(c.paddingTop) || 0, r: parseFloat(c.paddingRight) || 0, b: parseFloat(c.paddingBottom) || 0, l: parseFloat(c.paddingLeft) || 0 }; d.remove(); return r; })();
  out.safe = safe;
  const vis = e => { try { return e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }); } catch (x) { return !!e.offsetParent; } };
  const name = e => { if (!e) return ''; let s = e.tagName.toLowerCase(); if (e.id) s += '#' + e.id; else if (e.className && typeof e.className === 'string') s += '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.'); const t = (e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40); return s + (t ? ' "' + t + '"' : ''); };
  // 1. the document wider than the window
  const sw = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
  if (sw > W + 1) out.overflow = sw + ' > ' + W;
  // 2. boxes past the edges
  const all = [...document.body.querySelectorAll('*')].filter(e => !e.closest('svg') || e.tagName.toLowerCase() === 'svg');
  const reported = new Set();
  function clipper(e) { for (let a = e.parentElement; a && a !== document.body && a !== document.documentElement; a = a.parentElement) { const c = getComputedStyle(a); if (c.overflowX !== 'visible' || c.contain.includes('paint')) return a; if (c.position === 'fixed') return null; } return null; }
  for (const e of all) {
    const tag = e.tagName.toLowerCase(); if (tag === 'script' || tag === 'style' || tag === 'template') continue;
    const r = e.getBoundingClientRect(); if (r.width < 1 || r.height < 1) continue;
    if (!(r.right > W + 1 || r.left < -1)) continue;
    if (!vis(e)) continue;
    if (r.top >= H + 2000 || r.bottom < -2000) { /* far away still counts, but only if inside the document flow */ }
    const cl = clipper(e);
    if (cl) { const cr = cl.getBoundingClientRect(); if (cr.left >= -1 && cr.right <= W + 1) continue; }
    // only the outermost
    let a = e.parentElement, skip = false; while (a) { if (reported.has(a)) { skip = true; break; } a = a.parentElement; } if (skip) continue;
    // a box made to sit outside on purpose and hidden from everyone (aria-hidden, inert) is not counted
    if (e.closest('[aria-hidden="true"],[inert]') && (r.left >= W || r.right <= 0)) continue;
    reported.add(e); out.edges.push(name(e) + ' [' + Math.round(r.left) + '..' + Math.round(r.right) + ' x ' + Math.round(r.top) + ']');
  }
  // 3. words under a floating element
  const isFixedLike = e => { const c = getComputedStyle(e); return c.position === 'fixed'; };
  const floats = [];
  for (const e of all) {
    if (!isFixedLike(e) || !vis(e)) continue;
    let a = e.parentElement, inner = false; while (a && a !== document.body) { if (getComputedStyle(a).position === 'fixed') { inner = true; break; } a = a.parentElement; } if (inner) continue;
    if (e.closest('.topbar')) continue;
    const c = getComputedStyle(e); if (c.pointerEvents === 'none') continue;
    const r = e.getBoundingClientRect(); if (r.width < 4 || r.height < 4) continue;
    if (r.right <= 0 || r.left >= W || r.bottom <= 0 || r.top >= H) continue;
    if (r.width * r.height > 0.3 * W * H) continue;
    floats.push({ e, r: { l: r.left, r: r.right, t: r.top, b: r.bottom }, n: name(e) });
  }
  out.floats = floats.map(f => f.n + ' [' + [f.r.l, f.r.t, f.r.r - f.r.l, f.r.b - f.r.t].map(Math.round).join(',') + ']');
  if (floats.length) {
    // everything in the document's own coordinates: a floating key stays put in the window while the page scrolls under it
    const se = document.scrollingElement, sy = se.scrollTop, maxS = Math.max(0, se.scrollHeight - se.clientHeight);
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT });
    const seen = new Set(); let n;
    while ((n = tw.nextNode())) {
      const pe = n.parentElement; if (!pe || seen.has(pe)) continue;
      if (pe.closest('script,style,noscript,template,.topbar,[aria-hidden="true"]')) continue;
      if (!vis(pe)) continue;
      // the boxes that clip it: a box that scrolls can bring any of its words into its window; one that only clips cuts them
      let skip = false; const clips = [];
      for (let a = pe; a && a !== document.body; a = a.parentElement) {
        const c = getComputedStyle(a);
        if (c.position === 'fixed' || c.position === 'sticky') { skip = true; break; }   // in a layer of its own (a panel, a dialog)
        const cx = c.overflowX !== 'visible', cy = c.overflowY !== 'visible';
        if (!cx && !cy) continue;
        const ar = a.getBoundingClientRect(); if (ar.width < 2 || ar.height < 2) { skip = true; break; }  // words kept for screen readers only
        clips.push({ cx, cy, l: ar.left, r: ar.right, t: ar.top + sy, b: ar.bottom + sy,
          sx: cx && /(auto|scroll)/.test(c.overflowX) && a.scrollWidth > a.clientWidth + 1 ? [a.scrollLeft, a.scrollWidth - a.clientWidth - a.scrollLeft] : null,
          syr: cy && /(auto|scroll)/.test(c.overflowY) && a.scrollHeight > a.clientHeight + 1 ? [a.scrollTop, a.scrollHeight - a.clientHeight - a.scrollTop] : null });
      }
      if (skip) continue;
      const rg = document.createRange(); rg.selectNodeContents(n);
      const rects = [...rg.getClientRects()].filter(q => q.width > 2 && q.height > 4);
      for (const q of rects) {
        let x0 = q.left, x1 = q.right, y0 = q.top + sy, y1 = q.bottom + sy;
        for (const k of clips) {
          if (k.cx) { if (k.sx) { x0 -= k.sx[1]; x1 += k.sx[0]; } x0 = Math.max(x0, k.l); x1 = Math.min(x1, k.r); }
          if (k.cy) { if (k.syr) { y0 -= k.syr[1]; y1 += k.syr[0]; } y0 = Math.max(y0, k.t); y1 = Math.min(y1, k.b); }
          if (x1 <= x0 || y1 <= y0) break;
        }
        if (x1 - x0 <= 2 || y1 - y0 <= 2) continue;
        for (const f of floats) {
          if (f.e.contains(pe)) continue;
          if (Math.min(x1, f.r.r) - Math.max(x0, f.r.l) <= 2) continue;
          // some scroll s in [0, maxS] puts the key (window y f.t..f.b, document y f.t+s..f.b+s) over the words
          if (!(y0 - f.r.b < maxS - 2 && y1 - f.r.t > 2)) continue;
          seen.add(pe);
          out.covered.push(f.n.split(' ')[0] + ' over ' + name(pe).slice(0, 70) + ' (x ' + Math.round(x0) + '..' + Math.round(x1) + ')');
          break;
        }
        if (seen.has(pe)) break;
      }
    }
  }
  // 4. keys smaller than 44 pixels (phones)
  if (opts.keys) {
    const scope = [document.querySelector('.topbar'), document.querySelector('.dock'), ...document.querySelectorAll('.rail-btn,#railChevron'), document.querySelector('.main > section.active, main > section.active, .section.active')].filter(Boolean);
    const sel = 'button,[role=button],a[href],[role=tab],[role=menuitem],[role=menuitemradio],[role=menuitemcheckbox],[role=switch],[role=checkbox],[role=radio],[role=option],input:not([type=hidden]),select,summary,textarea';
    const keys = new Set(); scope.forEach(s => { if (s.matches(sel)) keys.add(s); s.querySelectorAll(sel).forEach(k => keys.add(k)); });
    for (const k of keys) {
      if (!vis(k)) continue;
      const r = k.getBoundingClientRect(); if (r.width < 1 || r.height < 1) continue;
      if (k.closest('[aria-hidden="true"],[inert],.hidden')) continue;
      const c = getComputedStyle(k);
      // a link inside a sentence
      if (k.tagName === 'A' && c.display === 'inline') continue;
      // an input that is drawn by its label (a hidden checkbox behind a switch): its label is measured instead
      let m = r;
      if (k.tagName === 'INPUT' && /^(checkbox|radio)$/.test(k.type)) {
        const lb = k.closest('label') || (k.id && document.querySelector('label[for="' + CSS.escape(k.id) + '"]'));
        if (lb && vis(lb)) { const lr = lb.getBoundingClientRect(); if (lr.width >= 1 && lr.height >= 1) m = lr; }
        if (m === r && (c.opacity === '0' || r.width <= 2)) continue;
      } else if (k.tagName === 'INPUT' && (c.opacity === '0' || r.width <= 2)) continue;
      // a key laid down out of sight in a box that scrolls sideways is still a key: measured all the same
      if (Math.min(m.width, m.height) < 43.5) out.keys.push(name(k).slice(0, 80) + ' ' + Math.round(m.width) + 'x' + Math.round(m.height) + (m !== r ? ' (its label)' : ''));
    }
  }
  return out;
}

// ---------------- a top bar panel ----------------
const PANELS = [
  { id: 'statusPill', key: '#statusPill', panel: '.pres-menu', close: () => { try { closePresenceMenu(); } catch (e) { } } },
  { id: 'enginePill', key: '#enginePill', panel: null, close: () => { } },
  { id: 'activeModelPill', key: '#activeModelPill', panel: null, close: () => { } },
  { id: 'displayBtn', key: '#displayBtn', panel: '#displayPanel', close: () => { const d = document.getElementById('displayPanel'); if (d) d.setAttribute('hidden', ''); } },
  { id: 'aboutBtn', key: '#aboutBtn', panel: '#modalBox', close: () => { try { closeModal(); } catch (e) { } } },
  { id: 'ingHelpKey', key: '#ingHelpKey', panel: '#ihPanel', close: () => { const x = document.querySelector('#ihPanel .ih-x'); if (x && !document.getElementById('ihPanel').hidden) x.click(); } },
];
function panelCheck(sel) {
  const W = innerWidth, H = innerHeight;
  const d = document.createElement('div'); d.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);visibility:hidden'; document.body.appendChild(d);
  const c0 = getComputedStyle(d), s = { t: parseFloat(c0.paddingTop) || 0, r: parseFloat(c0.paddingRight) || 0, b: parseFloat(c0.paddingBottom) || 0, l: parseFloat(c0.paddingLeft) || 0 }; d.remove();
  const e = [...document.querySelectorAll(sel)].find(x => x.checkVisibility({ checkOpacity: false, checkVisibilityCSS: true }));
  if (!e) return { missing: true };
  const r = e.getBoundingClientRect(), c = getComputedStyle(e), bad = [];
  if (r.left < s.l - 0.5) bad.push('left ' + Math.round(r.left) + ' < ' + s.l);
  if (r.right > W - s.r + 0.5) bad.push('right ' + Math.round(r.right) + ' > ' + (W - s.r));
  if (r.top < s.t - 0.5) bad.push('top ' + Math.round(r.top) + ' < ' + s.t);
  if (r.bottom > H - s.b + 0.5) bad.push('bottom ' + Math.round(r.bottom) + ' > ' + (H - s.b));
  if (e.scrollHeight > e.clientHeight + 2 && !/(auto|scroll)/.test(c.overflowY)) {
    // a panel whose body scrolls (a head that stays, the rest scrolling) is fine
    const inner = [...e.querySelectorAll('*')].some(x => { const cc = getComputedStyle(x); return /(auto|scroll)/.test(cc.overflowY) && x.clientHeight > 40; });
    if (!inner) bad.push('taller than its box (' + e.scrollHeight + ' > ' + e.clientHeight + ') and it does not scroll');
  }
  if (e.scrollWidth > e.clientWidth + 2 && !/(auto|scroll)/.test(c.overflowX)) bad.push('wider inside than its box (' + e.scrollWidth + ' > ' + e.clientWidth + ')');
  return { box: [r.left, r.top, r.width, r.height].map(Math.round), safe: s, bad };
}
// the keys inside an open panel (a box to tick is measured by its line, which answers the finger)
function smallIn(sel) {
  const e = [...document.querySelectorAll(sel)].find(x => x.checkVisibility({ checkOpacity: false, checkVisibilityCSS: true })); if (!e) return ['(no panel)'];
  const out = [];
  e.querySelectorAll('button,[role=button],a[href],[role=tab],[role=menuitem],[role=menuitemradio],[role=menuitemcheckbox],[role=switch],[role=radio],input:not([type=hidden]),select,summary,textarea').forEach(k => {
    if (!k.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) return;
    let r = k.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return;
    const c = getComputedStyle(k); if (k.tagName === 'A' && c.display === 'inline') return;
    if (k.tagName === 'INPUT' && /^(checkbox|radio)$/.test(k.type)) { const lb = k.closest('label'); if (lb) r = lb.getBoundingClientRect(); else if (c.opacity === '0') return; }
    if (Math.min(r.width, r.height) < 43.5) out.push((k.id || k.className || k.tagName) + ' "' + (k.getAttribute('aria-label') || k.textContent || '').trim().slice(0, 30) + '" ' + Math.round(r.width) + 'x' + Math.round(r.height));
  });
  return out;
}
// what a side key opens: every new box that floats over the page, inside the window and its safe areas
function floatingNow() {
  return [...document.querySelectorAll('body *')].filter(e => { const c = getComputedStyle(e); if (c.position !== 'fixed' || c.display === 'none' || c.visibility === 'hidden' || +c.opacity === 0) return false; const r = e.getBoundingClientRect(); return r.width * r.height > 8000; })
    .map(e => { if (!e.dataset.t67) e.dataset.t67 = 'f' + Math.random().toString(36).slice(2, 8); return e.dataset.t67; });
}
function sideCheck(tags) {
  const W = innerWidth, H = innerHeight;
  const d = document.createElement('div'); d.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);visibility:hidden'; document.body.appendChild(d);
  const c0 = getComputedStyle(d), s = { t: parseFloat(c0.paddingTop) || 0, r: parseFloat(c0.paddingRight) || 0, b: parseFloat(c0.paddingBottom) || 0, l: parseFloat(c0.paddingLeft) || 0 }; d.remove();
  const bad = [];
  for (const t of tags) {
    const e = document.querySelector('[data-t67="' + t + '"]'); if (!e) continue;
    const r = e.getBoundingClientRect(), nm = e.id || String(e.className).split(' ')[0];
    // a layer over the whole window (a dialog's frame, the quiet screen): what it holds must keep clear of the notch and the home bar
    const boxes = r.width >= W - 1 && r.height >= H - 1 ? [...e.querySelectorAll('*')].filter(x => { if (!x.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) return false; const q = x.getBoundingClientRect(); return q.width > 1 && q.height > 1 && (x.matches('button,a[href],input,select,textarea,[role=button],h1,h2,h3,p') || x.id === 'modalBox'); }) : [e];
    for (const x of boxes) {
      const q = x.getBoundingClientRect(), n2 = x === e ? nm : nm + ' > ' + (x.id || x.tagName.toLowerCase());
      if (q.left < s.l - 0.5 || q.right > W - s.r + 0.5 || q.top < s.t - 0.5 || q.bottom > H - s.b + 0.5) {
        // inside a box that scrolls, a part may sit below the fold: only the scrolling box itself is measured
        let a = x.parentElement, scrolls = false; while (a && a !== e.parentElement) { const cc = getComputedStyle(a); if (/(auto|scroll)/.test(cc.overflowY) && a.scrollHeight > a.clientHeight + 1) { scrolls = true; break; } a = a.parentElement; }
        if (!scrolls) bad.push(n2 + ' [' + [q.left, q.top, q.right, q.bottom].map(Math.round).join(',') + ']');
      }
    }
  }
  return { safe: s, bad: bad.slice(0, 8) };
}
async function sideKeys(p, label, shot) {
  for (const id of ['fabBell', 'fabQuiet', 'fabPark', 'fabTimer', 'fabNote']) {
    await p.evaluate(() => { window.scrollTo(0, 0); go('home'); }); await p.waitForTimeout(300);
    const before = new Set(await p.evaluate(floatingNow));
    const there = await p.evaluate(id => { const k = document.getElementById(id); return !!k && k.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }); }, id);
    if (!there) { ok(false, `${label} the ${id} side key is on screen`); continue; }
    await p.tap('#' + id); await p.waitForTimeout(900);
    const now = (await p.evaluate(floatingNow)).filter(t => !before.has(t));
    const r = await p.evaluate(sideCheck, now);
    if (shot) await p.screenshot({ path: `${shot}_${id}.png` });
    ok(now.length > 0 && r.bad.length === 0, `${label} what the ${id} side key opens stands whole inside the window and the safe areas`, { opened: now.length, bad: r.bad });
    // closed again: Escape, then the page's own ways
    await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    await p.evaluate(() => { try { closeModal(); } catch (e) { } const q = [...document.querySelectorAll('#ingQuiet button')].find(b => /ready to come back/i.test(b.textContent)); if (q && q.offsetParent) q.click();
      const x = document.querySelector('.tc-cloud [aria-label*="lose" i], .tc-cloud .tc-x'); if (x && x.offsetParent) x.click(); const sb = document.querySelector('.schedae-back'); if (sb && sb.offsetParent) sb.click(); });
    await p.waitForTimeout(500);
  }
}
async function panels(p, label, shotPrefix) {
  for (const P of PANELS) {
    await p.evaluate(() => { window.scrollTo(0, 0); go('home'); }); await p.waitForTimeout(300);
    const keyBox = await p.evaluate(sel => { const k = document.querySelector(sel); if (!k || !k.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) return null; const r = k.getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; }, P.key);
    if (!keyBox) { ok(false, `${label} the ${P.id} key is on screen`); continue; }
    const W = await p.evaluate(() => innerWidth);
    ok(keyBox[0] >= 0 && keyBox[0] + keyBox[2] <= W, `${label} the ${P.id} key stands inside the window`, keyBox.map(Math.round));
    await p.tap(P.key).catch(async () => { await p.click(P.key); });
    await p.waitForTimeout(650);
    if (!P.panel) {
      const pg = await p.evaluate(() => { const s = document.querySelector('.section.active'); return s && s.id; });
      ok(pg === 'page-models', `${label} the ${P.id} key opens Models`, pg);
      continue;
    }
    const r = await p.evaluate(panelCheck, P.panel);
    if (shotPrefix) await p.screenshot({ path: `${shotPrefix}_${P.id}.png` });
    ok(!r.missing && r.bad.length === 0, `${label} the ${P.id} panel opens whole inside the window and the safe areas`, r);
    if (W <= 430) {
      const small = await p.evaluate(smallIn, P.panel);
      ok(small.length === 0, `${label} every key in the ${P.id} panel is at least 44 pixels`, small);
    }
    await p.evaluate(P.close); await p.keyboard.press('Escape').catch(() => { }); await p.waitForTimeout(250);
  }
}

(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const T0 = Date.now();
  // ---------------- every page at the iPhone sizes, by day and by night ----------------
  const PH = process.env.PH_SIZES ? process.env.PH_SIZES.split(',').map(s => s.split('x').map(Number)) : [[375, 812], [393, 852], [430, 932]];
  const THEMES = process.env.PH_THEMES ? process.env.PH_THEMES.split(',') : ['day', 'night'];
  if (PART === 'all' || PART === 'phones') for (const vp of PH) {
    const { ctx, p } = await open(b, vp, UPRIGHT);
    for (const th of THEMES) {
      await theme(p, th);
      for (const pg of PAGES) {
        await goTo(p, pg);
        const where = `${vp[0]}x${vp[1]} ${th} ${pg}:`;
        const r = await p.evaluate(inPage, { keys: true });
        await p.screenshot({ path: path.join(OUT, `ph_${vp[0]}_${th}_${pg}.png`) });
        ok(!r.overflow, `${where} nothing wider than the window`, r.overflow);
        ok(r.edges.length === 0, `${where} no box runs past an edge`, r.edges);
        ok(r.covered.length === 0, `${where} no words lie under a floating key`, r.covered);
        ok(r.keys.length === 0, `${where} every key is at least 44 pixels`, r.keys);
      }
    }
    if (p.__errs.length) console.log('NOTE script errors at ' + vp.join('x') + ': ' + p.__errs.slice(0, 5).join(' | '));
    await ctx.close();
  }
  // ---------------- the top bar's panels at every phone width, upright and sideways ----------------
  if (PART === 'all' || PART === 'panels') for (const [vp, ins] of [[[320, 568], UPRIGHT], [[360, 780], UPRIGHT], [[375, 812], UPRIGHT], [[393, 852], UPRIGHT], [[414, 896], UPRIGHT], [[430, 932], UPRIGHT], [[568, 320], SIDEWAYS], [[812, 375], SIDEWAYS], [[852, 393], SIDEWAYS], [[932, 430], SIDEWAYS]]) {
    const { ctx, p } = await open(b, vp, ins);
    for (const th of ['day', 'night']) {
      await theme(p, th);
      await panels(p, `${vp[0]}x${vp[1]} ${th}:`, path.join(OUT, `pn_${vp[0]}x${vp[1]}_${th}`));
      // the side keys all reachable inside the window
      const side = await p.evaluate(() => { const W = innerWidth, H = innerHeight; const ks = [...document.querySelectorAll('.rail-btn,#railChevron')].filter(k => k.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })); const top = document.querySelector('.topbar').getBoundingClientRect().bottom;
        const rs = ks.map(k => [k.id, k.getBoundingClientRect()]), over = [];
        rs.forEach(([a, p], i) => rs.slice(i + 1).forEach(([b, q]) => { if (Math.min(p.right, q.right) - Math.max(p.left, q.left) > 0.5 && Math.min(p.bottom, q.bottom) - Math.max(p.top, q.top) > 0.5) over.push(a + '/' + b); }));
        return { n: ks.length, out: ks.filter(k => { const r = k.getBoundingClientRect(); return r.left < 0 || r.right > W || r.top < top - 1 || r.bottom > H; }).map(k => k.id),
          min: Math.round(Math.min(...rs.map(([, r]) => Math.min(r.width, r.height))) * 10) / 10, cols: new Set(rs.map(([, r]) => Math.round(r.left))).size, over }; });
      ok(side.n >= 6 && side.out.length === 0, `${vp[0]}x${vp[1]} ${th}: every side key stands between the top bar and the foot of the window`, side);
      // upright, every side key is 44 pixels; held sideways the column stays one column where it can (r155, the owner's leaf
      // in its place), its keys no smaller than r155's 38 pixels, and only where that cannot stand two columns of 44
      const upright = vp[1] > vp[0];
      ok(side.over.length === 0 && (upright ? side.min >= 43.5 : (side.cols === 1 ? side.min >= 37.5 : side.min >= 43.5)),
        `${vp[0]}x${vp[1]} ${th}: no side key lies over another, each ${upright ? 'at least 44 pixels' : 'at least 38 pixels in one column, or 44 in two'}`, side);
      if (!upright) console.log(`NOTE ${vp[0]}x${vp[1]} ${th}: the side keys sideways: ${side.cols} column(s), ${side.min} pixels`);
    }
    await ctx.close();
  }
  // ---------------- what the side keys open, on a phone upright and sideways ----------------
  if (PART === 'all' || PART === 'side') for (const [vp, ins] of [[[375, 812], UPRIGHT], [[430, 932], UPRIGHT], [[812, 375], SIDEWAYS], [[568, 320], SIDEWAYS]]) {
    const { ctx, p } = await open(b, vp, ins);
    for (const th of ['day', 'night']) { await theme(p, th); await sideKeys(p, `${vp[0]}x${vp[1]} ${th}:`, th === 'day' ? path.join(OUT, `sk_${vp[0]}x${vp[1]}`) : null); }
    await ctx.close();
  }
  // ---------------- axe-core on every page with a finger's sizes (a phone with touch, the notch's safe areas) ----------------
  const AXE = process.env.T67_AXE;
  if ((PART === 'all' || PART === 'axe') && AXE) for (const th of ['day', 'night']) {
    const { ctx, p } = await open(b, [393, 852], UPRIGHT);
    await theme(p, th);
    for (const pg of PAGES) {
      await goTo(p, pg);
      await p.waitForFunction(() => !document.getAnimations || document.getAnimations().every(a => a.playState !== 'running' || (a.effect && a.effect.getTiming && a.effect.getTiming().iterations === Infinity)), null, { timeout: 4000 }).catch(() => { });
      await p.addScriptTag({ path: AXE });
      const v = await p.evaluate(async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes: ['violations'] });
        return r.violations.map(x => x.id + ' (' + x.nodes.length + '): ' + x.nodes.slice(0, 3).map(n => n.target.join(' ')).join(', ')); });
      ok(v.length === 0, `393x852 touch ${th} ${pg}: axe-core finds nothing`, v);
    }
    // and the top bar's panels open
    for (const P of PANELS.filter(x => x.panel)) {
      await p.evaluate(() => { window.scrollTo(0, 0); go('home'); }); await p.waitForTimeout(300);
      await p.tap(P.key).catch(() => { }); await p.waitForTimeout(700);
      await p.addScriptTag({ path: AXE });
      const v = await p.evaluate(async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes: ['violations'] });
        return r.violations.map(x => x.id + ' (' + x.nodes.length + '): ' + x.nodes.slice(0, 3).map(n => n.target.join(' ')).join(', ')); });
      ok(v.length === 0, `393x852 touch ${th}: axe-core finds nothing with the ${P.id} panel open`, v);
      await p.evaluate(P.close); await p.keyboard.press('Escape').catch(() => { }); await p.waitForTimeout(250);
    }
    await ctx.close();
  }
  // ---------------- a quick pass on the tablets ----------------
  if (PART === 'all' || PART === 'tablets') for (const [vp, ua] of [[[820, 1180], UA_IPAD], [[1024, 1366], UA_IPAD], [[800, 1280], UA_FIRE]]) {
    const { ctx, p } = await open(b, vp, ua === UA_FIRE ? NONE : IPAD, ua);
    for (const th of ['day', 'night']) {
      await theme(p, th);
      for (const pg of PAGES) {
        await goTo(p, pg);
        const where = `${vp[0]}x${vp[1]} ${th} ${pg}:`;
        const r = await p.evaluate(inPage, { keys: false });
        if (th === 'day' || pg === 'home' || pg === 'settings') await p.screenshot({ path: path.join(OUT, `tb_${vp[0]}_${th}_${pg}.png`) });
        ok(!r.overflow && r.edges.length === 0, `${where} nothing wider than the window, no box past an edge`, { overflow: r.overflow, edges: r.edges });
        ok(r.covered.length === 0, `${where} no words lie under a floating key`, r.covered);
      }
      await panels(p, `${vp[0]}x${vp[1]} ${th}:`, th === 'day' ? path.join(OUT, `tp_${vp[0]}`) : null);
    }
    await ctx.close();
  }
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 1));
  console.log(`\n${pass} passed, ${fail} failed (${Math.round((Date.now() - T0) / 1000)} s)`);
  await b.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('crashed', e.stack); process.exit(2); });
