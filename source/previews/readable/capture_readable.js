// Read it as written, scrambled for everyone else, part one (modules/r357.js): the pictures she sees before anything is released, from the
// running app (a test build), an invented app (Tide Clock) and a reading key made here with a password for the pictures only (never hers).
// The new parts are ringed in Ingenium's violet (her rule: no gold), and no edge of a picture cuts through a line of words. The file and
// the code shown are the real ones: the public half the room saved, the package Fabrica made, and the version Fabrica opened as written.
//   node capture_readable.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const VW = 1360, VH = 1000; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PW = 'Tide Clock reading key, for the pictures only';
const CODE = `/* Tide Clock. Copyright (c) 2026 Ada Example */
// the harbour's next high water, from the last one
function refreshTide() {
  var harbourOffsetMinutes = 17, lunarHalfDay = 745;
  var lastHighWater = new Date(2026, 10, 22, 6, 25);
  var minutesToNext = lunarHalfDay + harbourOffsetMinutes;
  var nextHighWater =
    new Date(lastHighWater.getTime() + minutesToNext * 60000);
  document.getElementById('next').textContent = formatClock(nextHighWater);
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
const APP = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>Tide Clock</title>\n</head>\n<body>\n<main><h1>Tide Clock</h1><div id="next">…</div></main>\n<script>\n' + CODE + '</script>\n</body>\n</html>\n';
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2, acceptDownloads: true });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  const quiet = (pg, keepToast) => pg.evaluate((k) => { let st = document.getElementById('pvQuiet'); if (!st) { st = document.createElement('style'); st.id = 'pvQuiet'; document.head.appendChild(st); }
    st.textContent = k ? '' : '#ingToast{display:none!important}'; try { const a = document.activeElement; if (a && a.blur && a.tagName !== 'INPUT') a.blur(); } catch (e) {} }, !!keepToast);
  const ring = (pg, sel) => pg.evaluate((sel) => { document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring'));
    if (!document.getElementById('pvRingCss')) { const st = document.createElement('style'); st.id = 'pvRingCss'; st.textContent = '.pv-ring{outline:3px solid #6a3fb5!important;outline-offset:4px!important;border-radius:12px}'; document.head.appendChild(st); }
    const els = []; sel.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { if (e.getClientRects().length) els.push(e); })); els.forEach((e) => e.classList.add('pv-ring')); return els.length; }, sel);
  // o: pad (both ways), padX, padY, xSel (the left and right edges are that element's own), keepToast, backdrop
  const grab = async (pg, key, ringSel, frameSel, o) => { o = o || {}; await quiet(pg, o.keepToast); await sleep(500); const n = await ring(pg, ringSel); await sleep(700);
    if (o.backdrop) await pg.evaluate(() => { const d = document.createElement('div'); d.id = 'pvBack'; d.style.cssText = 'position:fixed;inset:0;z-index:899;background:#f1eef6'; document.body.appendChild(d); });
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
    await pg.screenshot({ path: path.join(OUT, key + '.png'), clip: { x: r.x, y: r.y, width: r.width, height: r.height } }); console.log(key, 'ringed', n, r.moved ? '(edges moved clear of text)' : '');
    if (o.backdrop) await pg.evaluate(() => { const d = document.getElementById('pvBack'); if (d) d.remove(); }); };
  const theme = (t) => p.evaluate((t) => { state.theme = t; applyTheme(); try { saveState(); } catch (e) {} }, t);
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(800); await p.evaluate(() => { const t = document.getElementById('tgTick'); if (t && !t.checked) t.click(); const k = [...document.querySelectorAll('.tg-veil button')].find((x) => x.offsetParent && !x.disabled); if (k) k.click(); });
  await theme('day'); await p.evaluate(() => PermitCore._.put('readkey', null)); await p.evaluate(() => IngReadable._look()); await sleep(400);
  const room = async () => { await p.evaluate(() => { go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('self'); }); await sleep(2000);
    await p.evaluate(() => { const w = document.getElementById('r357Well'); if (w) w.scrollIntoView({ block: 'center' }); }); await sleep(700); };
  // 1. before any reading key
  await room(); await grab(p, '1-before', '#r357Well', '#r357Well', { pad: 14 });
  // 2. making it: its own card, its password twice
  await p.click('#secCard [data-rk="make"]'); await p.waitForSelector('#r357Ask #r357Pw', { timeout: 10000 }); await p.fill('#r357Pw', PW); await p.fill('#r357Pw2', PW); await sleep(500);
  await grab(p, '2-make', '#r357Ask .sa-card', '#r357Ask .sa-card', { pad: 26, keepToast: false, backdrop: true });
  const dl1 = p.waitForEvent('download', { timeout: 60000 }); await p.click('#r357Yes'); await (await dl1).path(); await sleep(900);
  // 3. and 4. made: the room names it, by day and by night
  await room(); await grab(p, '3-made', '#r357Well', '#r357Well', { pad: 14 });
  await theme('night'); await sleep(900); await room(); await grab(p, '4-made-night', '#r357Well', '#r357Well', { pad: 14 }); await theme('day'); await sleep(800);
  // 5. its public half, as saved
  await room(); const dl2 = p.waitForEvent('download', { timeout: 30000 }); await p.click('#secCard [data-rk="pub"]'); const d2 = await dl2; const pubText = fs.readFileSync(await d2.path(), 'utf8');
  // 6. a scrambled copy of Tide Clock, brought back into Fabrica
  await p.evaluate(() => go('fabrica')); await sleep(1500);
  const id = await p.evaluate(async (t) => { const x = await IngRepo.fromFiles([{ path: 'index.html', data: t }], { name: 'Tide Clock', msg: 'Tide Clock, the first version' }); const id = x.id || (x.repo && x.repo.id);
    fbHubHost.FBS().sel = id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.setPanel('ship'); fbHubHost.paint(); return id; }, APP); await sleep(1200);
  const pkg = await p.evaluate((id) => IngShip.onePage(id, { target: 'page', unsigned: true }).then((x) => ({ html: x.html, commit: x.commit })), id);
  fs.writeFileSync(path.join(OUT, 'Tide Clock.html'), pkg.html);
  const aw = await p.evaluate((html) => IngAppSign.cameIn(new TextEncoder().encode(html), 'Tide Clock').then((x) => x.asWritten ? x.asWritten.html : ''), pkg.html);
  await p.evaluate(() => { const t = document.getElementById('ingToast'); if (t) t.remove(); });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /Bring one in/.test(x.textContent) && x.offsetParent); if (k) k.click(); }); await sleep(900);
  const fc = p.waitForEvent('filechooser', { timeout: 15000 }); await p.evaluate(() => { const r = [...document.querySelectorAll('.f-opt')].filter((x) => /A page or a zip/.test(x.textContent) && x.offsetParent).pop(); if (r) r.click(); });
  await (await fc).setFiles(path.join(OUT, 'Tide Clock.html'));
  // Fabrica says it in its own toast (.f-toast in #fb), which stays a few seconds: held still for the picture once it is there
  await p.waitForFunction(() => { const t = document.querySelector('#fb .f-toast'); return t && /is a scrambled copy of/.test(t.textContent); }, null, { timeout: 30000 });
  await p.evaluate(() => { const t = document.querySelector('#fb .f-toast'); const c = t.cloneNode(true); c.id = 'pvFbToast'; t.replaceWith(c); c.scrollIntoView({ block: 'center' }); }); await sleep(600);
  await grab(p, '6-fabrica', '#pvFbToast', '#pvFbToast', { pad: 24, keepToast: true });
  // 7. in Lector's app library
  await p.evaluate(() => { const t = document.getElementById('ingToast'); if (t) t.remove(); });
  await p.evaluate(async (html) => { await libKeep('tide-clock-copy', { title: 'Tide Clock' }, new TextEncoder().encode(html), html); }, pkg.html); await sleep(700);
  await grab(p, '7-lector', '#ingToast', '#ingToast', { pad: 24, keepToast: true, backdrop: true });
  // 5. and 8. the file, and the code: drawn as cards of Ingenium's own kind, with the real texts in them
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); const soft = (s) => esc(s).replace(/([;{},])/g, '$1<wbr>');
  const scriptOf = (h) => (/<script>\n?([\s\S]*?)<\/script>/.exec(h) || [])[1] || '';
  const css = `body{margin:0;padding:40px;background:#f1eef6;font:14px -apple-system,"Segoe UI",system-ui,sans-serif;color:#221a2e}
    .two{display:grid;grid-template-columns:1fr 1fr;gap:28px;width:1240px;align-items:start} .one{width:820px}
    .card{border-radius:20px;padding:20px 22px 22px;background:linear-gradient(180deg,#ffffff,#f7f5fa 62%,#efeaf4);box-shadow:inset 0 2px 0 rgba(255,255,255,.45),inset -2px 0 0 #d3cbe0,inset 0 -3px 0 #d3cbe0,0 0 0 1px rgba(40,22,68,.1),0 9px 12px -7px rgba(40,22,68,.18),0 22px 40px -14px rgba(40,22,68,.26)}
    h2{margin:0 0 4px;font-size:17px} small{display:block;color:#6c6480;margin:0 0 12px;font-size:13px}
    pre{margin:0;padding:14px 16px;border-radius:12px;background:#1e1829;color:#efe9f8;font:12.5px/1.55 ui-monospace,"SF Mono",Menlo,Consolas,monospace;white-space:pre-wrap;word-break:normal;overflow-wrap:normal;box-shadow:inset 0 2px 6px rgba(0,0,0,.45)}`;
  const card = async (key, html, sel) => { const c = await b.newContext({ viewport: { width: 1320, height: 900 }, deviceScaleFactor: 2 }); const q = await c.newPage();
    await q.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}</body></html>`); await sleep(500);
    const over = await q.evaluate(() => [...document.querySelectorAll('pre')].some((p) => p.scrollWidth > p.clientWidth));
    await q.screenshot({ path: path.join(OUT, key + '.png'), clip: await q.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left - 30, y: r.top - 30, width: r.width + 60, height: r.height + 60 }; }, sel) });
    await c.close(); console.log(key, 'taken', over ? '(A LINE IS WIDER THAN ITS PANEL)' : ''); };
  await card('5-public-half', `<div class="one card"><h2>reading_keys.json</h2><small>What you give for the next release: the public half alone, numbered by its own fingerprint (${pubText.length} characters)</small><pre>${soft(pubText)}</pre></div>`, '.one');
  await card('8-code', `<div class="two"><div class="card"><h2>The copy that came back</h2><small>Tide Clock's script, in the package Fabrica made: scrambled</small><pre>${soft(scriptOf(pkg.html))}</pre></div>
    <div class="card"><h2>What opens for you</h2><small>The same version, from your Fabrica, as you wrote it</small><pre>${esc(scriptOf(aw))}</pre></div></div>`, '.two');
  console.log(JSON.stringify(errs)); await b.close();
})();
