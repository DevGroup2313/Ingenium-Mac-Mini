// The Forge 644 · the Editor's live preview holds still while the Editor scrolls (blocks/forge_preview_steady.html), in
// Chromium. The owner's words (21 October 2026): "The live preview panel keeps on shaking when I scroll on the Forge's
// Editor page, please fix that issue."
// What it checks:
//   - nothing clips or scrolls between the preview (#stage) and the box that scrolls (#cd-scroll) where the preview
//     stands beside the page (the cause found in WebKit; 643 fails this), and the clip is kept where it does not;
//   - the preview stays on its seat in every frame of wheel, key, touch, fling, scroll bar and in-preview scrolls, by day
//     and by night, at 1440 x 900 and 1024 x 768, in the low-power mode of the Windows app, with reduced motion, floating;
//     on a phone it moves exactly with the page and never changes size;
//   - the Forge's own endless loops hold still while the page scrolls and go on after (643 fails this), never in a
//     room without a preview, never while typing;
//   - the page never moves sideways; the split and its divider, Full page, the rail and the preview following an edit
//     still work; axe-core on the Editor.
//   node tests/t_644_preview.js http://127.0.0.1:8461/the_forge_644_lean.html <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const report = [];
const ok = (c, m, d) => { const line = (c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 400) : ''); console.log(line); report.push(line); c ? pass++ : fail++; };
const SMALL = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Small app</title>' +
  '<style>body{font-family:sans-serif;margin:0;padding:16px;background:#fdf6e3;color:#222}header{position:sticky;top:0;background:#fff;padding:8px}' +
  '.card{margin:12px 0;padding:12px;border:1px solid #ccc;border-radius:8px}</style></head><body><header><h1>Small app</h1></header><main id="m"></main>' +
  '<script>(function(){var m=document.getElementById("m");for(var i=0;i<40;i++){var d=document.createElement("div");d.className="card";d.textContent="Card "+(i+1)+": "+new Array(17).join("words ");m.appendChild(d);}})();</' + 'script></body></html>';
// axe-core: AXE=/path/to/axe.min.js, or the first one found on this machine
const AXE = (() => { if (process.env.AXE && fs.existsSync(process.env.AXE)) return process.env.AXE; for (const p of ['/opt/node-tools/node_modules/axe-core/axe.min.js', '/usr/lib/node_modules/axe-core/axe.min.js']) if (fs.existsSync(p)) return p;
  try { return require('child_process').execSync('find / -name axe.min.js -not -path "/proc/*" 2>/dev/null | head -1', { timeout: 60000 }).toString().trim() || null; } catch (e) { return null; } })();

async function boot(p, url) {
  p.goto(url, { timeout: 240000 }).catch(() => { });
  await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return b && b.classList.contains('fb-gone') && document.readyState === 'complete'; }, null, { timeout: 240000, polling: 250 });
  await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); });
  await p.waitForTimeout(1200);
  await p.evaluate(() => { if (window.FORGE && FORGE.openRoom && document.body.getAttribute('data-froom') !== 'editor') FORGE.openRoom('editor'); });
  await p.waitForTimeout(800);
}
async function load(p) {
  await p.setInputFiles('#edShell', { name: 'small_app.html', mimeType: 'text/html', buffer: Buffer.from(SMALL) });
  await p.waitForFunction(() => /live/i.test(document.getElementById('curName').textContent), null, { timeout: 120000 }).catch(() => { });
  await p.waitForTimeout(2500);
}
// the page's own record of every animation frame: where the preview and its frame are, against the box that scrolls
function install() {
  const $ = id => document.getElementById(id); const st = $('stage'), fr = $('frame'), sc = $('cd-scroll'), root = document.documentElement;
  if (window.__r) window.__r.on = false;
  const R = window.__r = { frames: [], on: true, t0: performance.now(), heldMax: 0, loopsMin: 1e9 };
  const loops = () => document.getAnimations().filter(a => a.animationName && a.effect && a.effect.target && a.effect.getComputedTiming().iterations === Infinity && a.playState === 'running' && getComputedStyle(a.effect.target).animationPlayState.split(',')[0].trim() === 'running').length;
  (function loop() {
    if (!R.on) return;
    try {
      const a = st.getBoundingClientRect(), b = fr.getBoundingClientRect(), s = sc.getBoundingClientRect();
      const held = window.__forgePreviewSteady ? window.__forgePreviewSteady.held() : 0; R.heldMax = Math.max(R.heldMax, held);
      R.frames.push({ t: +(performance.now() - R.t0).toFixed(1), sc: sc.scrollTop, sl: sc.scrollLeft, scT: s.top, top: a.top, h: a.height, l: a.left, w: a.width, ft: b.top, fh: b.height,
        tf: getComputedStyle(st).transform, mainH: root.style.getPropertyValue('--forge-main-h'), vh: innerHeight, held, loops: R.frames.length % 6 ? null : loops() });
    } catch (e) { R.err = String(e); }
    requestAnimationFrame(loop);
  })();
}
// a frame is explained when the preview stays still or moves exactly with the page (or between the two in the frame it
// reaches or leaves its seat); its height, its frame and its transform never change while only scrolling
function analyse(fr, tol) {
  tol = tol || 0.75; const bad = [];
  for (let i = 1; i < fr.length; i++) {
    const a = fr[i - 1], b = fr[i], ds = b.sc - a.sc, dscT = b.scT - a.scT, dt = b.top - a.top, lo = Math.min(dscT, dscT - ds) - tol, hi = Math.max(dscT, dscT - ds) + tol, is = [];
    if (dt < lo || dt > hi) is.push('top ' + dt.toFixed(1) + ' for scroll ' + ds.toFixed(1));
    if (Math.abs(b.h - a.h) > tol && a.vh === b.vh) is.push('height ' + a.h.toFixed(1) + '>' + b.h.toFixed(1));
    if (Math.abs(b.fh - a.fh) > tol && a.vh === b.vh) is.push('frame height');
    if (Math.abs((b.ft - b.top) - (a.ft - a.top)) > tol) is.push('frame in panel');
    if (Math.abs(b.l - a.l) > tol || Math.abs(b.w - a.w) > tol) is.push('x');
    if (b.tf !== a.tf) is.push('transform');
    if (a.mainH !== b.mainH) is.push('--forge-main-h');
    if (b.sl) is.push('sideways ' + b.sl);
    if (is.length) bad.push({ i, t: b.t, sc: b.sc, is });
  }
  const sc = fr.map(f => f.sc), tops = fr.map(f => f.top);
  return { frames: fr.length, bad: bad.length, first: bad.slice(0, 3), scrolled: fr.length ? Math.round(Math.max(...sc) - Math.min(...sc)) : 0, top: fr.length ? [Math.min(...tops), Math.max(...tops)].map(v => +v.toFixed(1)) : null };
}
async function record(p, fn, after, start) {
  await p.evaluate(s => { document.getElementById('cd-scroll').scrollTop = s || 0; try { document.getElementById('frame').contentWindow.scrollTo(0, 0); } catch (e) { } }, start || 0);
  await p.waitForTimeout(900);
  await p.evaluate(install);
  await fn();
  await p.waitForTimeout(after || 1200);
  const rec = await p.evaluate(() => { window.__r.on = false; return window.__r; });
  const a = analyse(rec.frames); a.heldMax = rec.heldMax; a.loops = rec.frames.map(f => f.loops).filter(v => v !== null);
  return a;
}
const geo = p => p.evaluate(() => { const r = o => { const q = o.getBoundingClientRect(); return { x: q.left, y: q.top, w: q.width, h: q.height }; }; const th = document.getElementById('thread'), st = document.getElementById('stage'), fr = document.getElementById('frame'), sc = document.getElementById('cd-scroll');
  return { th: r(th), st: r(st), fr: r(fr), max: sc.scrollHeight - sc.clientHeight, sbw: sc.offsetWidth - sc.clientWidth, view: document.body.getAttribute('data-stageview'), vw: innerWidth, vh: innerHeight }; });
// where the wheel turns: over the Editor's column, or inside the preview (always inside the window)
const inWin = (v, H) => Math.max(20, Math.min(H - 40, v));
const pts = (g, H) => ({ left: { x: g.th.x + Math.min(200, g.th.w / 2), y: inWin(Math.max(g.th.y + 40, Math.min(H - 60, g.th.y + 300)), H) }, prev: { x: g.st.x + g.st.w / 2, y: inWin(Math.max(g.fr.y + 40, Math.min(H - 60, g.fr.y + 200)), H) } });
const top0 = p => p.evaluate(() => { document.getElementById('cd-scroll').scrollTop = 0; }).then(() => p.waitForTimeout(400));
// what lies between the preview and the box that scrolls
const chain = p => p.evaluate(() => { const out = []; const sc = document.getElementById('cd-scroll'); for (let n = document.getElementById('stage').parentElement; n && n !== sc; n = n.parentElement) { const c = getComputedStyle(n); if (c.overflowX !== 'visible' || c.overflowY !== 'visible') out.push((n.id || n.className.split(' ')[0] || n.tagName) + ' ' + c.overflowX + '/' + c.overflowY); } return { between: out, stagePos: getComputedStyle(document.getElementById('stage')).position, appX: getComputedStyle(document.querySelector('.app')).overflowX }; });
const loopsRunning = p => p.evaluate(() => document.getAnimations().filter(a => a.animationName && a.effect && a.effect.target && a.effect.getComputedTiming().iterations === Infinity && a.playState === 'running' && getComputedStyle(a.effect.target).animationPlayState.split(',')[0].trim() === 'running').length);

async function page(b, W, H, opts) {
  opts = opts || {};
  const ctx = await b.newContext({ viewport: { width: W, height: H }, hasTouch: W < 600, reducedMotion: opts.reduced ? 'reduce' : 'no-preference' });
  const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message));
  await boot(p, URL_ + (opts.query || ''));
  if (opts.night) { await p.evaluate(() => { try { state.theme = 'night'; applyTheme(); } catch (e) { document.body.setAttribute('data-theme', 'night'); } }); await p.waitForTimeout(600); }
  await load(p);
  return { p, ctx };
}
const wheelSmall = async (p, q) => { await p.mouse.move(q.x, q.y); for (let i = 0; i < 40; i++) { await p.mouse.wheel(0, 40); await p.waitForTimeout(16); } for (let i = 0; i < 40; i++) { await p.mouse.wheel(0, -40); await p.waitForTimeout(16); } };

(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const build = { };
  // ---------------------------------------------------------------- 1440 x 900, by day: the full set
  {
    const { p, ctx } = await page(b, 1440, 900);
    Object.assign(build, await p.evaluate(() => ({ pass: (window.CD_BUILD || {}).pass, steady: !!window.__forgePreviewSteady })));
    console.log('build', JSON.stringify(build));
    const c = await chain(p);
    ok(c.between.length === 0 && c.stagePos === 'sticky', 'beside the page, nothing clips or scrolls between the preview and the box that scrolls (WebKit drew the preview 1 or 2 px off its seat because of such a clip)', c);
    let g = await geo(p); const q = pts(g, 900);
    await p.screenshot({ path: path.join(OUT, 'editor_1440_day.png') });
    const loops0 = await loopsRunning(p);
    const runs = {
      wheel_small: () => wheelSmall(p, q.left),
      wheel_large: async () => { await p.mouse.move(q.left.x, q.left.y); for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 500); await p.waitForTimeout(120); } for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, -500); await p.waitForTimeout(120); } },
      keys: async () => { await p.evaluate(() => { const a = document.activeElement; if (a && a.blur && a !== document.body) a.blur(); const s = document.getElementById('cd-scroll'); s.tabIndex = -1; s.focus({ preventScroll: true }); });
        for (let i = 0; i < 12; i++) { await p.keyboard.press('ArrowDown'); await p.waitForTimeout(30); } for (let i = 0; i < 3; i++) { await p.keyboard.press('PageDown'); await p.waitForTimeout(250); } for (let i = 0; i < 3; i++) { await p.keyboard.press('PageUp'); await p.waitForTimeout(250); } await p.keyboard.press('Home'); },
      touch: async () => { const cdp = await ctx.newCDPSession(p); for (const d of [-700, -700, 1400]) await cdp.send('Input.synthesizeScrollGesture', { x: Math.round(q.left.x), y: Math.round(q.left.y), yDistance: d, speed: 1400, gestureSourceType: 'mouse' }); },
      fling: async () => { const cdp = await ctx.newCDPSession(p); await cdp.send('Input.synthesizeScrollGesture', { x: Math.round(q.left.x), y: Math.round(q.left.y), yDistance: -900, speed: 3000, gestureSourceType: 'mouse', preventFling: false }); await p.waitForTimeout(600); await cdp.send('Input.synthesizeScrollGesture', { x: Math.round(q.left.x), y: Math.round(q.left.y), yDistance: 900, speed: 3000, gestureSourceType: 'mouse', preventFling: false }); },
      scrollbar: async () => { await p.evaluate(async () => { const s = document.getElementById('cd-scroll'), m = s.scrollHeight - s.clientHeight; for (let i = 0; i <= 40; i++) { s.scrollTop = m * i / 40 * 0.6; await new Promise(r => requestAnimationFrame(r)); } for (let i = 40; i >= 0; i--) { s.scrollTop = m * i / 40 * 0.6; await new Promise(r => requestAnimationFrame(r)); } }); },
      in_preview: async () => { await p.mouse.move(q.prev.x, q.prev.y); for (let i = 0; i < 50; i++) { await p.mouse.wheel(0, 120); await p.waitForTimeout(16); } for (let i = 0; i < 50; i++) { await p.mouse.wheel(0, -120); await p.waitForTimeout(16); } },
    };
    for (const k of Object.keys(runs)) {
      const a = await record(p, runs[k]);
      const moved = k === 'in_preview' ? true : a.scrolled > 300;
      ok(a.bad === 0 && moved && a.frames > 20, '1440 x 900 day, ' + k + ': the preview holds its seat in every frame', { frames: a.frames, bad: a.bad, scrolled: a.scrolled, top: a.top, first: a.first });
      if (k === 'wheel_small') {
        const during = a.loops.slice(2, -12), after = await loopsRunning(p);
        ok(loops0 > 0 && a.heldMax >= loops0 && during.length > 3 && Math.max(...during) === 0, "while the page scrolls, the Forge's own endless loops hold still", { before: loops0, held: a.heldMax, runningDuring: during.slice(0, 12) });
        ok(after === loops0, 'a moment after the scroll stops, they go on again', { before: loops0, after });
      }
    }
    // never while typing; never in a room without a preview
    await p.evaluate(() => { document.getElementById('fold-studio').open = true; document.getElementById('fsOpenCode').click(); }); await p.waitForTimeout(600);
    // (the focus itself may bring the field into view, which is a scroll: the keys are pressed once that has settled)
    // (from 645 the code is in the shared editor: the keys go to it, as a person's would)
    await p.evaluate(() => { const t = document.getElementById('fsCode'); if (t.__ingCode) t.__ingCode.view.focus(); else t.focus(); }); await p.waitForTimeout(900);
    await p.keyboard.press('ArrowDown'); await p.keyboard.press('PageDown'); await p.keyboard.press('End');
    const typed = await p.evaluate(() => ({ held: window.__forgePreviewSteady ? window.__forgePreviewSteady.held() : 0, on: window.__forgePreviewSteady ? window.__forgePreviewSteady.on() : null }));
    ok(typed.held === 0 && typed.on === false, 'keys typed in a field never hold anything', typed);
    // the preview follows an edit (the code, then Run)
    await p.evaluate(() => { const t = document.getElementById('fsCode'); t.value = t.value.replace('<h1>Small app</h1>', '<h1>Small app probe 644</h1>'); t.dispatchEvent(new Event('input', { bubbles: true })); document.getElementById('fsRun').click(); });
    await p.waitForTimeout(2500);
    ok(await p.evaluate(() => { try { return /Small app probe 644/.test(document.getElementById('frame').contentDocument.body.innerText); } catch (e) { return false; } }), 'the preview follows an edit');
    // the divider: the split moves, and the preview still holds its seat after
    await top0(p); g = await geo(p);
    const hd = await p.evaluate(() => { const h = document.getElementById('handle').getBoundingClientRect(); return { x: h.left + h.width / 2, y: Math.min(innerHeight - 80, Math.max(0, h.top) + 200), w: document.getElementById('thread').getBoundingClientRect().width }; });
    await p.mouse.move(hd.x, hd.y); await p.mouse.down(); for (let i = 1; i <= 10; i++) { await p.mouse.move(hd.x + i * 8, hd.y); await p.waitForTimeout(16); } await p.mouse.up(); await p.waitForTimeout(500);
    const w2 = await p.evaluate(() => document.getElementById('thread').getBoundingClientRect().width);
    ok(Math.abs(w2 - hd.w) >= 40, 'the divider still moves the split', { before: Math.round(hd.w), after: Math.round(w2) });
    { await top0(p); const g2 = await geo(p); const a = await record(p, () => wheelSmall(p, pts(g2, 900).left)); ok(a.bad === 0 && a.scrolled > 300, 'after the split is moved, the preview still holds its seat', { bad: a.bad, scrolled: a.scrolled }); }
    // Full page (lives under More): the page alone, then shared again
    const wide1 = await p.evaluate(() => { document.getElementById('pageWide').click(); return document.body.getAttribute('data-stageview'); }); await p.waitForTimeout(700);
    const c1 = await chain(p);
    const wide2 = await p.evaluate(() => { document.getElementById('pageWide').click(); return document.body.getAttribute('data-stageview'); }); await p.waitForTimeout(700);
    const c2 = await chain(p);
    ok(wide1 === 'closed' && wide2 === 'split' && c1.appX !== 'visible' && c2.appX === 'visible', 'Full page gives the page the screen and shares it again; the clip comes back while the preview is closed', { wide1, wide2, closed: c1.appX, shared: c2.appX });
    { await top0(p); const g3 = await geo(p); const a = await record(p, () => wheelSmall(p, pts(g3, 900).left)); ok(a.bad === 0 && a.scrolled > 300, 'after Full page and back, the preview holds its seat', { bad: a.bad, scrolled: a.scrolled }); }
    // the six rooms with a preview: nothing is wider than the page, and the page never moves sideways
    const side = [];
    for (const id of ['editor', 'bakery', 'library', 'compose', 'workshop', 'curriculum']) {
      await p.evaluate(id => FORGE.openRoom(id), id); await p.waitForTimeout(450);
      side.push(await p.evaluate(id => { const s = document.getElementById('cd-scroll'); const fs = [...document.querySelectorAll('#section-forge button, #section-forge input, #section-forge a[href]')].filter(n => n.offsetParent); let far = null, fr = -1; fs.forEach(n => { const r = n.getBoundingClientRect(); if (r.right > fr) { fr = r.right; far = n; } }); if (far) far.focus(); const sl = s.scrollLeft; return { id, over: s.scrollWidth - s.clientWidth, sl }; }, id));
    }
    ok(side.every(x => x.over === 0 && x.sl === 0), 'in each room with a preview nothing is wider than the page, and focus never moves it sideways', side);
    // a room without a preview: nothing is held
    await p.evaluate(() => FORGE.openRoom('agenda')); await p.waitForTimeout(600);
    const ag = await p.evaluate(() => ({ up: window.__forgePreviewSteady ? window.__forgePreviewSteady.up() : null, x: getComputedStyle(document.querySelector('.app')).overflowX }));
    await p.mouse.move(700, 450); for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 60); await p.waitForTimeout(30); }
    const agHeld = await p.evaluate(() => window.__forgePreviewSteady ? window.__forgePreviewSteady.held() : 0);
    ok(ag.up === false && agHeld === 0 && ag.x !== 'visible', 'in a room without a preview nothing is held and the clip stays', { up: ag.up, held: agHeld, appOverflowX: ag.x });
    // the rail still takes you between rooms
    await p.evaluate(() => FORGE.openRoom('files')); await p.waitForTimeout(500);
    const rail = await p.evaluate(async () => { const n = document.querySelector('.nav-bar'); const k = n && [...n.querySelectorAll('button,a,[role="button"]')].find(x => /Editor/.test(x.textContent) && x.offsetParent); if (k) k.click(); await new Promise(r => setTimeout(r, 700)); const r = n && n.getBoundingClientRect(); return { rail: !!(r && r.width > 40 && r.height > 100 && getComputedStyle(n).visibility !== 'hidden'), key: !!k, room: document.body.getAttribute('data-froom') }; });
    ok(rail.rail && rail.key && rail.room === 'editor', 'the rail is there and takes you back to the Editor', rail);
    // floating: a fixed panel; it holds still and the loops are held while the page scrolls
    await p.evaluate(() => document.getElementById('floatBtn').click()); await p.waitForTimeout(800);
    { const gf = await geo(p); const fl = await record(p, () => wheelSmall(p, { x: Math.min(gf.th.x + 150, 600), y: 500 }));
      const fv = await p.evaluate(() => document.body.getAttribute('data-stageview'));
      const stillF = fl.frames > 20 && fl.top[1] - fl.top[0] < 0.75;
      ok(fv === 'float' && stillF && fl.scrolled > 300 && fl.heldMax > 0, 'floating, the preview holds still and the loops are held while the page scrolls', { view: fv, top: fl.top, scrolled: fl.scrolled, held: fl.heldMax }); }
    await p.evaluate(() => document.getElementById('floatBtn').click()); await p.waitForTimeout(800);
    ok(await p.evaluate(() => document.body.getAttribute('data-stageview')) === 'split', 'and it docks again beside the page');
    // axe-core on the Editor
    if (AXE) {
      await p.evaluate(() => FORGE.openRoom('editor')); await p.waitForTimeout(600);
      await p.addScriptTag({ path: AXE });
      const ax = await p.evaluate(async () => { const r = await axe.run(document.getElementById('section-forge'), { resultTypes: ['violations'] }); return r.violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, t: v.nodes.slice(0, 3).map(n => n.target.join(' ')) })); });
      fs.writeFileSync(path.join(OUT, 'axe_editor_1440_day.json'), JSON.stringify(ax, null, 1));
      const mine = ax.filter(v => v.t.some(t => /forge-preview-steady/.test(t)));
      ok(mine.length === 0, 'axe-core on the Editor: nothing this pass adds is flagged (it adds no controls); the page as a whole: ' + ax.length + ' rules (' + ax.map(v => v.id + ' ' + v.n).join(', ') + ')');
    } else ok(false, 'axe-core: axe.min.js not found');
    ok(p.__errs.length === 0, 'no page errors', p.__errs.slice(0, 3));
    await ctx.close();
  }
  // ---------------------------------------------------------------- by night, 1440 x 900
  {
    const { p, ctx } = await page(b, 1440, 900, { night: true });
    const g = await geo(p); const a = await record(p, () => wheelSmall(p, pts(g, 900).left));
    ok(a.bad === 0 && a.scrolled > 300 && a.heldMax > 0, '1440 x 900 night: the preview holds its seat and the loops are held', { bad: a.bad, scrolled: a.scrolled, held: a.heldMax });
    await p.screenshot({ path: path.join(OUT, 'editor_1440_night.png') });
    await ctx.close();
  }
  // ---------------------------------------------------------------- 1024 x 768 (the Fire on its side): the split, sticky
  {
    const { p, ctx } = await page(b, 1024, 768);
    const c = await chain(p);
    ok(c.between.length === 0 && c.stagePos === 'sticky', '1024 x 768: nothing clips between the preview and the box that scrolls', c);
    const g = await geo(p);
    for (const k of ['wheel', 'keys']) {
      const a = await record(p, k === 'wheel' ? () => wheelSmall(p, pts(g, 768).left) : async () => { await p.evaluate(() => { const s = document.getElementById('cd-scroll'); s.tabIndex = -1; s.focus({ preventScroll: true }); }); for (let i = 0; i < 3; i++) { await p.keyboard.press('PageDown'); await p.waitForTimeout(250); } for (let i = 0; i < 3; i++) { await p.keyboard.press('PageUp'); await p.waitForTimeout(250); } });
      ok(a.bad === 0 && a.scrolled > 300, '1024 x 768, ' + k + ': the preview holds its seat', { bad: a.bad, scrolled: a.scrolled, first: a.first });
    }
    await p.screenshot({ path: path.join(OUT, 'editor_1024.png') });
    await ctx.close();
  }
  // ---------------------------------------------------------------- the phone: one under the other, as before
  {
    const { p, ctx } = await page(b, 390, 844);
    const c = await chain(p);
    ok(c.stagePos === 'static' && c.appX !== 'visible', '390 x 844: the preview sits under the Editor (not sticky) and the clip is kept', c);
    const g = await geo(p);
    // from just above the preview (the synthesized touch gesture does not scroll headless Chromium here, on 643 either:
    // the wheel stands in for the finger)
    const start = Math.max(0, Math.round(g.st.y - 600));
    const a = await record(p, async () => { await p.mouse.move(195, 150); for (let i = 0; i < 10; i++) { await p.mouse.wheel(0, 60); await p.waitForTimeout(30); } for (let i = 0; i < 10; i++) { await p.mouse.wheel(0, -60); await p.waitForTimeout(30); } }, 1200, start);
    const held = await p.evaluate(() => window.__forgePreviewSteady ? window.__forgePreviewSteady.up() : null);
    ok(a.bad === 0 && a.scrolled > 300 && held === false, '390 x 844: the preview moves exactly with the page, never changes size, and nothing is held', { bad: a.bad, scrolled: a.scrolled, h: g.st.h, up: held });
    await p.evaluate(s => { document.getElementById('cd-scroll').scrollTop = s; }, start); await p.waitForTimeout(500);
    await p.screenshot({ path: path.join(OUT, 'editor_390.png') });
    await ctx.close();
  }
  // ---------------------------------------------------------------- the Windows app's low-power mode; reduced motion
  {
    const b2 = await pw.chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu-compositing'] });
    const { p, ctx } = await page(b2, 1440, 900, { query: '?softgpu=1' });
    const soft = await p.evaluate(() => document.documentElement.getAttribute('data-softgpu'));
    const g = await geo(p); const a = await record(p, () => wheelSmall(p, pts(g, 900).left));
    ok(soft === '1' && a.bad === 0 && a.scrolled > 300, 'low power (?softgpu=1, no GPU compositing): the preview holds its seat', { soft, bad: a.bad, scrolled: a.scrolled });
    await ctx.close(); await b2.close();
  }
  {
    const { p, ctx } = await page(b, 1440, 900, { reduced: true });
    const g = await geo(p); const a = await record(p, () => wheelSmall(p, pts(g, 900).left));
    ok(a.bad === 0 && a.scrolled > 300, 'reduced motion: the preview holds its seat', { bad: a.bad, scrolled: a.scrolled, held: a.heldMax });
    await ctx.close();
  }
  await b.close();
  fs.writeFileSync(path.join(OUT, 'report.txt'), report.join('\n') + '\n' + pass + ' passed, ' + fail + ' failed\n');
  console.log(pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('crash', e.stack); process.exit(2); });
