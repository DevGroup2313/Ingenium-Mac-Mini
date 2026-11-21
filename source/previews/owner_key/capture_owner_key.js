// Opens only with your owner key (modules/r354.js, the door at the head of each package's page): the pictures she sees before anything is
// released, from the running app (a test build), an invented app (Tide Clock), an invented person (Ada Example) and a test owner key made by
// the page's own PermitCore (never hers). The new parts in Ingenium are ringed in Ingenium's violet (her rule: no gold). The door is the real
// door, in the very package Fabrica made, opened in a browser at a Mac window's size and an iPhone's, by day and by night; the window around
// it is drawn for the picture.
//   node capture_owner_key.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const http = require('http');
const [URL_, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const VW = 1360, VH = 1000; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PW = 'Tide Clock owner key, for the pictures only';
const APP = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<meta name="ingenium-build" content="">\n<title>Tide Clock</title>\n'
  + '<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:linear-gradient(160deg,#e6f1f6,#c9e0ea);font:16px/1.5 Georgia,serif;color:#123}main{text-align:center;padding:30px 36px;border-radius:22px;background:#fff;box-shadow:0 14px 34px rgba(10,40,60,.18)}h1{margin:0;color:#235;font-size:30px}.t{font:700 54px/1.1 Georgia,serif;color:#1b5a7a;margin:10px 0}</style>\n'
  + '</head>\n<body>\n<main><h1>Tide Clock</h1><div class="t">18:42</div><p>Next high water at the harbour.</p></main>\n<script>window.__appRan = true;</script>\n</body>\n</html>\n';
const serve = (dir, port) => new Promise((res) => { const s = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(dir, p); if (!f.startsWith(dir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); r.end(); return; }
  r.writeHead(200, { 'Content-Type': f.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/octet-stream', 'Cache-Control': 'no-store' }); r.end(fs.readFileSync(f)); }); s.listen(port, '127.0.0.1', () => res(s)); });
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  const quiet = (pg) => pg.evaluate(() => { if (!document.getElementById('pvQuiet')) { const st = document.createElement('style'); st.id = 'pvQuiet'; st.textContent = '#ingToast{display:none!important}'; document.head.appendChild(st); }
    try { const a = document.activeElement; if (a && a.blur && a.id !== 'r349Pw') a.blur(); } catch (e) {} });
  const ring = (pg, sel) => pg.evaluate((sel) => { document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring'));
    if (!document.getElementById('pvRingCss')) { const st = document.createElement('style'); st.id = 'pvRingCss'; st.textContent = '.pv-ring{outline:3px solid #6a3fb5!important;outline-offset:4px!important;border-radius:12px}'; document.head.appendChild(st); }
    const els = []; sel.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { if (e.getClientRects().length) els.push(e); })); els.forEach((e) => e.classList.add('pv-ring')); return els.length; }, sel);
  const grab = async (pg, key, ringSel, frameSel, pad) => { await quiet(pg); await sleep(500); const n = await ring(pg, ringSel); await sleep(700);
    const box = await pg.evaluate((s) => { let x0 = 1e9, y0 = 1e9, x1 = 0, y1 = 0; s.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { const r = e.getBoundingClientRect(); if (!r.width) return; x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); })); return { x0, y0, x1, y1 }; }, frameSel);
    if (!(box.x1 > box.x0)) { console.log(key, 'NOT TAKEN: nothing of', frameSel, 'is on screen'); return; }
    const P = pad == null ? 30 : pad; const x = Math.max(0, box.x0 - P), y = Math.max(0, box.y0 - P);
    await pg.screenshot({ path: path.join(OUT, key + '.png'), clip: { x, y, width: Math.min(VW - x, box.x1 - box.x0 + 2 * P), height: Math.min(VH - y, box.y1 - box.y0 + 2 * P) } }); console.log(key, 'ringed', n); };
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(800); await p.evaluate(() => { const t = document.getElementById('tgTick'); if (t && !t.checked) t.click(); const k = [...document.querySelectorAll('.tg-veil button')].find((x) => x.offsetParent && !x.disabled); if (k) k.click(); });
  // a test owner key, its backup file, and two permissions it signed (Ada Example's, valid; and one that has ended)
  const made = await p.evaluate(async (PW) => { const s = await PermitCore.makeKey(PW); await PermitCore._.put('key', s); IngPermit.keys.push({ kid: s.kid, jwk: { kty: 'EC', crv: 'P-256', x: s.pub.x, y: s.pub.y } });
    const key = await PermitCore.openKey(s, PW), out = { key: JSON.stringify(s, null, 1), kid: s.kid, permits: {} };
    for (const [n, from, until] of [['P-2026-0007', '2026-11-21', '2026-12-31'], ['P-2026-0004', '2026-11-01', '2026-11-20']]) {
      const permit = { n, holder: 'Ada Example', apps: ['tide-clock'], allows: ['use'], from, until, issued: new Date().toISOString() };
      out.permits[n] = JSON.stringify({ kind: PermitCore.KIND.permit, v: 1, permit, kid: s.kid, sig: await PermitCore.signWith(key, permit) }, null, 1); }
    return out; }, PW);
  fs.writeFileSync(path.join(OUT, 'Tide Clock owner key.ingkey'), made.key);
  fs.writeFileSync(path.join(OUT, 'permission-P-2026-0007-Ada_Example.ingperm'), made.permits['P-2026-0007']);
  fs.writeFileSync(path.join(OUT, 'permission-P-2026-0004-Ada_Example.ingperm'), made.permits['P-2026-0004']);
  // Tide Clock in Fabrica; 1. Package details: Opens only with your owner key
  await p.evaluate(() => go('fabrica')); await sleep(1500);
  const id = await p.evaluate(async (t) => { const x = await IngRepo.fromFiles([{ path: 'index.html', data: t }], { name: 'Tide Clock', msg: 'Tide Clock, the first version' }); const id = x.id || (x.repo && x.repo.id);
    fbHubHost.FBS().sel = id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.setPanel('ship'); fbHubHost.paint(); return id; }, APP);
  await sleep(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#fbPkg button')].find((x) => x.textContent.trim() === 'Package details'); k.click(); }); await sleep(900);
  await p.evaluate(() => { const r = [...document.querySelectorAll('.r349-row')].find((x) => /Opens only with your owner key/.test(x.textContent)); if (r) { r.click(); r.scrollIntoView({ block: 'center' }); r.classList.add('pv-own'); } }); await sleep(800);
  await grab(p, '1-package-details', '.pv-own', '.r349-row', 120);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Keep these' && x.offsetParent); k.click(); }); await sleep(700);
  // 2. the Security room: Opens only with your owner key, on for one app
  await p.evaluate(() => { go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('code'); }); await sleep(3000);
  await p.waitForFunction(() => { try { return IngAppSign.state() === 'on'; } catch (e) { return false; } }, null, { timeout: 60000, polling: 1000 }).catch(() => {});
  for (let i = 0; i < 3; i++) { await p.evaluate(() => { IngSecurity.view('code'); }); await sleep(2000);
    await p.evaluate(() => { const w = [...document.querySelectorAll('#secCard .sc-well')].find((x) => /Opens only with your owner key/.test(x.textContent)); if (w) { w.classList.add('pv-own'); w.scrollIntoView({ block: 'center' }); } }); await sleep(600);
    if (await p.evaluate(() => { const w = document.querySelector('.pv-own'); return !!(w && w.getBoundingClientRect().width); })) break; }
  await grab(p, '2-room', '.pv-own', '.pv-own', 140);
  // the package: the one page, signed, with its door
  await p.evaluate(() => go('fabrica')); await sleep(1000);
  const html = p.evaluate((id) => IngShip.onePage(id, { target: 'page' }).then((x) => x.html), id);
  await p.waitForSelector('#r349Ask #r349Pw', { timeout: 60000 }); await p.fill('#r349Pw', PW); await p.click('#r349Yes');
  const page = await html; fs.writeFileSync(path.join(OUT, 'tide.html'), page);
  console.log('package', JSON.stringify({ door: page.indexOf('__ingDoorCfg') >= 0, first: page.indexOf('__ingDoorCfg') < page.indexOf('<title>'), signed: /<meta name="ingenium-signature" content="[A-Za-z0-9_-]{40,}">/.test(page), bytes: page.length }));
  const srv = await serve(OUT, 8233);
  // the door, as a device shows it: a Mac window's size by day, an iPhone's by night
  const shot = async (scheme, vw, vh, steps) => { const c = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 2, colorScheme: scheme }); const q = await c.newPage();
    q.on('pageerror', (e) => errs.push('door: ' + e.message.slice(0, 200)));
    await q.goto('http://127.0.0.1:8233/tide.html', { waitUntil: 'commit' }); await q.waitForSelector('#dKey', { timeout: 30000 }); await sleep(1200);   // the door stops the page, so no load event comes
    for (const [key, fn] of steps) { await fn(q); await sleep(900); await q.evaluate(() => { try { document.activeElement && document.activeElement.blur && document.activeElement.id !== 'dPw' && document.activeElement.blur(); } catch (e) {} });
      await q.screenshot({ path: path.join(OUT, 'raw-' + key + '.png') }); console.log(key, 'taken'); }
    await c.close(); };
  const choose = async (q, btnId, file) => { const ch = q.waitForEvent('filechooser'); await q.click('#' + btnId); const fc = await ch; await fc.setFiles(path.join(OUT, file)); };
  await shot('light', 980, 660, [
    ['3-door', async () => {}],
    ['4-key', async (q) => { await q.click('#dKey'); await sleep(400); await choose(q, 'dFile', 'Tide Clock owner key.ingkey'); await sleep(400); await q.fill('#dPw', 'not the right password'); }],
    ['5-wrong', async (q) => { await q.click('#dOpen'); await q.waitForFunction(() => /does not open/.test((document.getElementById('dSay') || {}).textContent || ''), null, { timeout: 60000 }); }],
    ['6-opened', async (q) => { await q.fill('#dPw', PW); await q.click('#dOpen'); await q.waitForFunction(() => window.__appRan === true, null, { timeout: 60000 }); }],
  ]);
  await shot('dark', 390, 790, [
    ['7-door-night', async () => {}],
    ['8-permit', async (q) => { await q.click('#dPermit'); await sleep(400); await choose(q, 'dFile', 'permission-P-2026-0007-Ada_Example.ingperm'); await q.waitForFunction(() => /Valid/.test((document.getElementById('dState') || {}).textContent || ''), null, { timeout: 30000 }); }],
    ['9-ended', async (q) => { await choose(q, 'dFile', 'permission-P-2026-0004-Ada_Example.ingperm'); await q.waitForFunction(() => /Ended/.test((document.getElementById('dState') || {}).textContent || ''), null, { timeout: 30000 }); }],
  ]);
  srv.close();
  // each door picture in the window drawn for it
  for (const f of fs.readdirSync(OUT).filter((x) => x.startsWith('raw-'))) {
    const key = f.slice(4, -4), dark = /night|permit|ended/.test(key), phone = dark;
    const img = 'data:image/png;base64,' + fs.readFileSync(path.join(OUT, f)).toString('base64');
    const c = await b.newContext({ viewport: { width: 1400, height: 1100 }, deviceScaleFactor: 2 }); const q = await c.newPage();
    const frame = phone ? `<div class="dev phone"><div class="scr"><div class="isl"></div><div class="sb"><span>18:42</span><span>82%</span></div><img src="${img}" style="width:390px;height:790px"></div></div>`
      : `<div class="dev mac"><div class="bar"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i><b>Tide Clock</b></div><img src="${img}" style="width:980px;height:660px"></div>`;
    const css = `body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:${dark ? '#16121d' : '#f1eef6'};font:13px -apple-system,"Segoe UI",system-ui,sans-serif}img{display:block}
      .mac{border-radius:12px;overflow:hidden;box-shadow:0 0 0 1px rgba(0,0,0,.18),0 22px 60px rgba(30,20,50,.35),0 4px 12px rgba(30,20,50,.2)}
      .mac .bar{height:38px;display:flex;align-items:center;gap:8px;padding:0 14px;background:linear-gradient(#ececec,#dedede);border-bottom:1px solid #c9c9c9;position:relative}
      .mac .bar i{width:12px;height:12px;border-radius:50%;box-shadow:inset 0 0 0 .5px rgba(0,0,0,.25)} .mac .bar b{position:absolute;left:0;right:0;text-align:center;font-weight:600;color:#3c3c3c}
      .phone{padding:14px;border-radius:62px;background:#111;box-shadow:0 0 0 2px #3a3a3e,0 26px 60px rgba(0,0,0,.6)} .phone .scr{border-radius:48px;overflow:hidden;position:relative;background:#1b1326}
      .phone .sb{height:54px;display:flex;justify-content:space-between;align-items:center;padding:0 34px;color:#f1ecf8;font-size:15px;font-weight:600;background:#1b1326} .phone .isl{position:absolute;top:11px;left:50%;width:120px;height:34px;margin-left:-60px;border-radius:20px;background:#000}`;
    await q.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${frame}</body></html>`); await sleep(600);
    await q.screenshot({ path: path.join(OUT, key + '.png'), clip: await q.evaluate(() => { const r = document.querySelector('.dev').getBoundingClientRect(); const P = 36; return { x: Math.max(0, r.left - P), y: Math.max(0, r.top - P), width: r.width + 2 * P, height: r.height + 2 * P }; }) });
    await c.close(); }
  console.log(JSON.stringify(errs)); await b.close();
})();
