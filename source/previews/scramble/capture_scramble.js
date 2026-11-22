// Your apps' code scrambled (modules/r356.js): the pictures she sees before anything is released, from the running app (a test build) and
// invented apps (Tide Clock, Name Keeper, and a page that says it is Ingenium). The new parts in Ingenium are ringed in Ingenium's violet
// (her rule: no gold), and no edge of a picture cuts through a line of words (her rule from the pictures of 7.62): an edge that would is
// moved just clear of it, never into what is ringed. The code shown is the real code: Tide Clock's script as she would write it, and the same
// script in the very page Fabrica made. The two windows around Tide Clock are drawn for the picture; the pages inside them are the real ones.
//   node capture_scramble.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const http = require('http');
const [URL_, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const VW = 1360, VH = 1000; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const CODE = `/* Tide Clock. Copyright (c) 2026 Ada Example */
// the harbour's next high water, from the last one
function refreshTide() {
  var harbourOffsetMinutes = 17, lunarHalfDay = 745;
  var lastHighWater = new Date(2026, 10, 22, 6, 25);
  var minutesToNext = lunarHalfDay + harbourOffsetMinutes;
  var nextHighWater =
    new Date(lastHighWater.getTime() + minutesToNext * 60000);
  var shownTime = formatClock(nextHighWater);
  document.getElementById('next').textContent = shownTime;
  return nextHighWater;
}
// hours and minutes, each with two figures
function formatClock(when) {
  var hoursPart = ('0' + when.getHours()).slice(-2);
  var minutesPart = ('0' + when.getMinutes()).slice(-2);
  return hoursPart + ':' + minutesPart;
}
refreshTide();
`;
const APP = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<meta name="ingenium-build" content="">\n<title>Tide Clock</title>\n'
  + '<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:linear-gradient(160deg,#e6f1f6,#c9e0ea);font:16px/1.5 Georgia,serif;color:#123}'
  + 'main{text-align:center;padding:30px 36px;border-radius:22px;background:linear-gradient(#fff,#f3f8fb);box-shadow:inset 0 2px 0 #fff,0 1px 2px rgba(18,52,70,.18),0 14px 30px rgba(18,52,70,.18)}'
  + 'h1{margin:0 0 6px;font-size:22px;letter-spacing:.04em}#next{font:600 54px/1.1 Georgia,serif;color:#0e4f6b}p{margin:6px 0 0;color:#40606e}'
  + 'button{margin-top:14px;font:inherit;padding:8px 16px;border-radius:999px;border:1px solid rgba(14,79,107,.25);background:linear-gradient(#fff,#e9f2f6);box-shadow:0 1px 0 #fff inset,0 2px 4px rgba(18,52,70,.18)}</style>\n'
  + '</head>\n<body>\n<main><h1>Tide Clock</h1><div id="next">…</div><p>Next high water at the harbour.</p><button onclick="refreshTide()">Refresh</button></main>\n<script>\n' + CODE + '</script>\n</body>\n</html>\n';
const KEEPER = '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><title>Name Keeper</title></head>\n<body><p>Name Keeper</p>\n'
  + '<script>(function(){function secretHelperName(){}if(secretHelperName.name!=="secretHelperName")throw new Error("Name Keeper needs its own names");document.title="Name Keeper ok";})();</script>\n</body></html>\n';
const SELF = '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><title>Ingenium</title></head>\n<body><script>var ING_EDITION="master";window.__ingParts={};</script></body></html>\n';
const serve = (dir, port) => new Promise((res) => { const s = http.createServer((q, r) => { const f = path.join(dir, decodeURIComponent(q.url.split('?')[0]));
  if (!f.startsWith(dir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); r.end(); return; }
  r.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }); r.end(fs.readFileSync(f)); }); s.listen(port, '127.0.0.1', () => res(s)); });
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  const quiet = (pg, keepToast) => pg.evaluate((k) => { let st = document.getElementById('pvQuiet'); if (!st) { st = document.createElement('style'); st.id = 'pvQuiet'; document.head.appendChild(st); }
    st.textContent = k ? '' : '#ingToast{display:none!important}'; try { const a = document.activeElement; if (a && a.blur) a.blur(); } catch (e) {} }, !!keepToast);
  const ring = (pg, sel) => pg.evaluate((sel) => { document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring'));
    if (!document.getElementById('pvRingCss')) { const st = document.createElement('style'); st.id = 'pvRingCss'; st.textContent = '.pv-ring{outline:3px solid #6a3fb5!important;outline-offset:4px!important;border-radius:12px}'; document.head.appendChild(st); }
    const els = []; sel.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { if (e.getClientRects().length) els.push(e); })); els.forEach((e) => e.classList.add('pv-ring')); return els.length; }, sel);
  // o: pad (both ways), padX, padY, xSel (the left and right edges are that element's own), keepToast
  const grab = async (pg, key, ringSel, frameSel, o) => { o = o || {}; await quiet(pg, o.keepToast); await sleep(500); const n = await ring(pg, ringSel); await sleep(700);
    const r = await pg.evaluate(([frameSel, xSel, PX, PY, VW, VH]) => {
      const boxOf = (s) => { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; s.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { const r = e.getBoundingClientRect(); if (!r.width) return;
        x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); })); return { x0, y0, x1, y1 }; };
      const f = boxOf(frameSel); if (!(f.x1 > f.x0)) return null; const rg = boxOf('.pv-ring');
      const must = { x0: Math.min(f.x0, rg.x0 - 8), y0: Math.min(f.y0, rg.y0 - 8), x1: Math.max(f.x1, rg.x1 + 8), y1: Math.max(f.y1, rg.y1 + 8) };
      let L = f.x0 - PX, R = f.x1 + PX, T = f.y0 - PY, B = f.y1 + PY;
      if (xSel) { const xb = boxOf(xSel); if (xb.x1 > xb.x0) { L = xb.x0; R = xb.x1; must.x0 = Math.max(must.x0, xb.x0); must.x1 = Math.min(must.x1, xb.x1); } }
      L = Math.max(0, L); T = Math.max(0, T); R = Math.min(VW, R); B = Math.min(VH, B);
      const lines = []; const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let t = tw.nextNode(); t; t = tw.nextNode()) { if (!t.nodeValue.trim()) continue; const rr = document.createRange(); rr.selectNodeContents(t);
        for (const q of rr.getClientRects()) if (q.width && q.height) lines.push(q); }
      let moved = 0;
      for (let i = 0; i < 6; i++) { let ch = false; const inY = (q) => q.bottom > T + 1 && q.top < B - 1, inX = (q) => q.right > L + 1 && q.left < R - 1;
        for (const q of lines) {
          if (inX(q) && q.top < T && q.bottom > T) { const v = Math.min(Math.ceil(q.bottom) + 3, must.y0); if (v > T) { T = v; ch = true; } }
          if (inX(q) && q.top < B && q.bottom > B) { const v = Math.max(Math.floor(q.top) - 3, must.y1); if (v < B) { B = v; ch = true; } }
          if (inY(q) && q.left < L && q.right > L) { const v = Math.min(Math.ceil(q.right) + 3, must.x0); if (v > L) { L = v; ch = true; } }
          if (inY(q) && q.left < R && q.right > R) { const v = Math.max(Math.floor(q.left) - 3, must.x1); if (v < R) { R = v; ch = true; } } }
        if (!ch) break; moved++; }
      return { x: L, y: T, width: R - L, height: B - T, moved }; }, [frameSel, o.xSel || null, o.padX != null ? o.padX : (o.pad != null ? o.pad : 30), o.padY != null ? o.padY : (o.pad != null ? o.pad : 30), VW, VH]);
    if (!r) { console.log(key, 'NOT TAKEN: nothing of', frameSel, 'is on screen'); return; }
    await pg.screenshot({ path: path.join(OUT, key + '.png'), clip: { x: r.x, y: r.y, width: r.width, height: r.height } }); console.log(key, 'ringed', n, r.moved ? '(edges moved clear of text)' : ''); };
  const theme = (t) => p.evaluate((t) => { state.theme = t; applyTheme(); try { saveState(); } catch (e) {} }, t);
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(800); await p.evaluate(() => { const t = document.getElementById('tgTick'); if (t && !t.checked) t.click(); const k = [...document.querySelectorAll('.tg-veil button')].find((x) => x.offsetParent && !x.disabled); if (k) k.click(); });
  await theme('day');
  await p.evaluate(() => go('fabrica')); await sleep(1500);
  const mk = (html, name) => p.evaluate(async (a) => { const x = await IngRepo.fromFiles([{ path: 'index.html', data: a.html }], { name: a.name, msg: a.name + ', the first version' }); return x.id || (x.repo && x.repo.id); }, { html, name });
  const show = (id) => p.evaluate(async (id) => { fbHubHost.FBS().sel = id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.setPanel('ship'); fbHubHost.paint(); }, id);
  const details = () => p.evaluate(() => { const k = [...document.querySelectorAll('#fbPkg button')].find((x) => x.textContent.trim() === 'Package details'); k.click(); });
  // the sheet of Package details: its rows, its Keep these, and the card that holds them (its own left and right edges frame the picture)
  const markSheet = () => p.evaluate(() => { document.querySelectorAll('.pv-new,.pv-sheet,.pv-keep').forEach((x) => x.classList.remove('pv-new', 'pv-sheet', 'pv-keep'));
    const rows = [...document.querySelectorAll('.r349-row')], r = rows.find((x) => /Scrambled code/.test(x.textContent)); if (!r) return false;
    r.classList.add('pv-new'); const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Keep these' && x.offsetParent); if (k) k.classList.add('pv-keep');
    let e = r.parentElement; const w = r.getBoundingClientRect().width; while (e && e.getBoundingClientRect().width < w + 24) e = e.parentElement; if (e) e.classList.add('pv-sheet');
    r.scrollIntoView({ block: 'center' }); return true; });
  // 1. Package details: Scrambled code
  const id = await mk(APP, 'Tide Clock'); await show(id); await sleep(1500);
  await details(); await sleep(900); await markSheet(); await sleep(800);
  await grab(p, '1-package-details', '.pv-new', '.r349-row|.pv-keep', { padY: 12, xSel: '.pv-sheet' });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Keep these' && x.offsetParent); k.click(); }); await sleep(700);
  // 2. the one page made (no owner key on this test build: made unsigned), and the Ship card: its tile, and the package's line
  const page = await p.evaluate((id) => IngShip.onePage(id, { target: 'page' }).then((x) => ({ html: x.html, scr: x.scrambled || null })), id);
  console.log('package', JSON.stringify(page.scr));
  fs.writeFileSync(path.join(OUT, 'tide.html'), APP); fs.writeFileSync(path.join(OUT, 'tide.scr.html'), page.html);
  await p.evaluate(async () => { await fbHubHost.refresh(); fbHubHost.setPanel('ship'); fbHubHost.paint(); }); await sleep(1500);
  // Test and ship opens on Test for an app not tested yet: its Ship tab shows the tiles
  await p.evaluate(() => { const k = [...document.querySelectorAll('button,[role="tab"]')].find((x) => x.textContent.trim() === 'Ship' && x.offsetParent); if (k) k.click(); }); await sleep(1200);
  await p.evaluate(() => { const t = document.querySelector('.f-tg[data-k="page"]'); if (t) t.scrollIntoView({ block: 'center' }); }); await sleep(600);
  await grab(p, '2a-ship-tile', '.f-tg[data-k="page"] .r356-scr', '.f-tg[data-k="page"]', { pad: 16 });
  await p.evaluate(() => { const t = document.getElementById('fbPkg'); if (t) t.scrollIntoView({ block: 'center' }); }); await sleep(600);
  await grab(p, '2b-ship-line', '#fbPkg .r356-line', '#fbPkg', { pad: 12 });
  // 3. and 4. the Security room, by day and by night
  const room = async (key) => { await p.evaluate(() => { go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('code'); }); await sleep(2500);
    for (let i = 0; i < 3; i++) { await p.evaluate(() => { IngSecurity.view('code'); }); await sleep(1500);
      await p.evaluate(() => { const w = [...document.querySelectorAll('#secCard .sc-well')].find((x) => /^Scrambled code/.test((x.querySelector('.sc-wh b') || {}).textContent || '')); if (w) { w.classList.add('pv-new'); w.scrollIntoView({ block: 'center' }); } }); await sleep(600);
      if (await p.evaluate(() => { const w = document.querySelector('#secCard .pv-new'); return !!(w && w.getBoundingClientRect().width); })) break; }
    await grab(p, key, '#secCard .pv-new', '#secCard .pv-new', { pad: 14 }); await p.evaluate(() => document.querySelectorAll('.pv-new').forEach((x) => x.classList.remove('pv-new'))); };
  await room('3-room-day'); await theme('night'); await sleep(800); await room('4-room-night'); await theme('day'); await sleep(800);
  // 7. the safety net: a copy that would not run as hers does is made as written, and said
  await p.evaluate(() => go('fabrica')); await sleep(1200);
  const kid = await mk(KEEPER, 'Name Keeper'); await show(kid); await sleep(1200);
  await p.evaluate(() => { const t = document.getElementById('ingToast'); if (t) t.remove(); });
  await p.evaluate((id) => IngShip.onePage(id, { target: 'page', unsigned: true }), kid); await sleep(400);
  await grab(p, '7-safety', '#ingToast', '#ingToast', { pad: 18, keepToast: true });
  // 8. Ingenium itself: the switch is there, and fixed
  const sid = await mk(SELF, 'Ingenium');
  await show(sid); await sleep(1200); await p.evaluate((id) => { const r = (fbHubHost.C.repos || []).filter((x) => x.id === id)[0]; if (r) r.app = 'ingenium'; }, sid);
  await details(); await sleep(900); await markSheet(); await sleep(800);
  await grab(p, '8-ingenium', '.pv-new', '.r349-row|.pv-keep', { padY: 12, xSel: '.pv-sheet' });
  // 5. the code as she wrote it, and as it is shipped (the shipped line breaks only after ; { } or a comma)
  const scrCode = (/<script>\n?([\s\S]*?)<\/script>/.exec(page.html) || [])[1] || '';
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const soft = (s) => esc(s).replace(/([;{},])/g, '$1<wbr>');
  const css = `body{margin:0;padding:40px;background:#f1eef6;font:14px -apple-system,"Segoe UI",system-ui,sans-serif;color:#221a2e}
    .two{display:grid;grid-template-columns:1fr 1fr;gap:28px;width:1240px;align-items:start}
    .card{border-radius:20px;padding:20px 22px 22px;background:linear-gradient(180deg,#ffffff,#f7f5fa 62%,#efeaf4);box-shadow:inset 0 2px 0 rgba(255,255,255,.45),inset -2px 0 0 #d3cbe0,inset 0 -3px 0 #d3cbe0,0 0 0 1px rgba(40,22,68,.1),0 9px 12px -7px rgba(40,22,68,.18),0 22px 40px -14px rgba(40,22,68,.26)}
    h2{margin:0 0 4px;font-size:17px} small{display:block;color:#6c6480;margin:0 0 12px;font-size:13px}
    pre{margin:0;padding:14px 16px;border-radius:12px;background:#1e1829;color:#efe9f8;font:12.5px/1.55 ui-monospace,"SF Mono",Menlo,Consolas,monospace;white-space:pre-wrap;word-break:normal;overflow-wrap:normal;box-shadow:inset 0 2px 6px rgba(0,0,0,.45)}`;
  const c5 = await b.newContext({ viewport: { width: 1320, height: 900 }, deviceScaleFactor: 2 }); const q5 = await c5.newPage();
  await q5.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="two">
    <div class="card"><h2>As you wrote it</h2><small>Tide Clock's script, in your sources in Fabrica: ${CODE.length} characters</small><pre>${esc(CODE)}</pre></div>
    <div class="card"><h2>As it is shipped</h2><small>The same script, in the page Fabrica made: ${scrCode.length} characters</small><pre>${soft(scrCode)}</pre></div></div></body></html>`);
  await sleep(500);
  const over = await q5.evaluate(() => [...document.querySelectorAll('pre')].map((p) => p.scrollWidth > p.clientWidth));
  await q5.screenshot({ path: path.join(OUT, '5-code.png'), clip: await q5.evaluate(() => { const r = document.querySelector('.two').getBoundingClientRect(); return { x: r.left - 30, y: r.top - 30, width: r.width + 60, height: r.height + 60 }; }) }); await c5.close();
  console.log('5-code taken', over.some(Boolean) ? '(A LINE IS WIDER THAN ITS PANEL)' : '');
  // 6. Tide Clock as she wrote it, and as it is shipped, each opened in a window
  const srv = await serve(OUT, 8236);
  const raw = async (file, key) => { const c = await b.newContext({ viewport: { width: 560, height: 420 }, deviceScaleFactor: 2 }); const q = await c.newPage(); q.on('pageerror', (e) => errs.push(key + ': ' + e.message.slice(0, 200)));
    await q.goto('http://127.0.0.1:8236/' + file); await sleep(900); await q.screenshot({ path: path.join(OUT, 'raw-' + key + '.png') }); await c.close(); };
  await raw('tide.html', 'mine'); await raw('tide.scr.html', 'shipped'); srv.close();
  const img = (k) => 'data:image/png;base64,' + fs.readFileSync(path.join(OUT, 'raw-' + k + '.png')).toString('base64');
  const win = (k, title) => `<figure><div class="mac"><div class="bar"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i><b>Tide Clock</b></div><img src="${img(k)}" style="width:560px;height:420px;display:block"></div><figcaption>${title}</figcaption></figure>`;
  const c6 = await b.newContext({ viewport: { width: 1360, height: 700 }, deviceScaleFactor: 2 }); const q6 = await c6.newPage();
  await q6.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;padding:40px;background:#f1eef6;font:15px -apple-system,"Segoe UI",system-ui,sans-serif;color:#221a2e}
    .row{display:flex;gap:40px;width:max-content}figure{margin:0}figcaption{text-align:center;margin-top:14px;font-weight:600}
    .mac{border-radius:12px;overflow:hidden;box-shadow:0 0 0 1px rgba(0,0,0,.18),0 22px 60px rgba(30,20,50,.3),0 4px 12px rgba(30,20,50,.18)}
    .bar{height:36px;display:flex;align-items:center;gap:8px;padding:0 14px;background:linear-gradient(#ececec,#dedede);border-bottom:1px solid #c9c9c9;position:relative}
    .bar i{width:12px;height:12px;border-radius:50%;box-shadow:inset 0 0 0 .5px rgba(0,0,0,.25)}.bar b{position:absolute;left:0;right:0;text-align:center;font-size:13px;color:#3c3c3c}</style></head>
    <body><div class="row">${win('mine', 'As you wrote it')}${win('shipped', 'As it is shipped, scrambled')}</div></body></html>`);
  await sleep(600); await q6.screenshot({ path: path.join(OUT, '6-same.png'), clip: await q6.evaluate(() => { const r = document.querySelector('.row').getBoundingClientRect(); return { x: r.left - 30, y: r.top - 30, width: r.width + 60, height: r.height + 60 }; }) }); await c6.close();
  console.log('6-same taken');
  console.log(JSON.stringify(errs)); await b.close();
})();
