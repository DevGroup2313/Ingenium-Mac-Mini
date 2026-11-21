// Your apps signed when shipped, part one (modules/r349.js, 7.60): the pictures she sees before it is released, from the running app (a test
// build) with an invented app (Tide Clock, made by git) and a test owner key made by the page's own PermitCore (never hers); the new parts
// ringed in Ingenium's violet (her rule: no gold); one picture for each step, each sent on its own at full size (her rule).
//   node capture_app_sign.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process'); const http = require('http');
const [URL_, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const VW = 1360, VH = 1000; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PW = 'Tide Clock owner key, for the pictures only';
const serve = (dir, port) => new Promise((res) => { const s = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(dir, p); if (!f.startsWith(dir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); r.end(); return; }
  const t = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.ingsig': 'application/json', '.txt': 'text/plain' }[path.extname(f)] || 'application/octet-stream';
  r.writeHead(200, { 'Content-Type': t, 'Cache-Control': 'no-store' }); r.end(fs.readFileSync(f)); }); s.listen(port, '127.0.0.1', () => res(s)); });
(async () => {
  const W = path.join(OUT, 'tide'); fs.mkdirSync(W, { recursive: true });
  const git = (a) => cp.execFileSync('git', a, { cwd: W, encoding: 'utf8', env: Object.assign({}, process.env, { GIT_CONFIG_NOSYSTEM: '1', GIT_AUTHOR_NAME: 'Ada Ferreira', GIT_AUTHOR_EMAIL: 'ada@example.invalid', GIT_COMMITTER_NAME: 'Ada Ferreira', GIT_COMMITTER_EMAIL: 'ada@example.invalid' }) });
  fs.writeFileSync(path.join(W, 'index.html'), '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="ingenium-build" content="">\n<title>Tide Clock</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1 id="t">Tide Clock</h1>\n<p id="next">Next high water: <span id="h"></span></p>\n<script src="app.js"></script>\n</body>\n</html>\n');
  fs.writeFileSync(path.join(W, 'app.js'), 'document.getElementById("h").textContent = "18:42";\n');
  fs.writeFileSync(path.join(W, 'style.css'), 'body{font:16px/1.5 Georgia,serif;margin:40px;color:#123}h1{color:#235}\n');
  git(['init', '-q', '-b', 'main']); git(['add', '-A']); git(['commit', '-qm', 'Tide Clock, the first version']); git(['bundle', 'create', '-q', path.join(OUT, 'tide.bundle'), '--all']);
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2, acceptDownloads: true });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  const quiet = (pg) => pg.evaluate(() => { if (!document.getElementById('pvQuiet')) { const st = document.createElement('style'); st.id = 'pvQuiet'; st.textContent = '#ingToast{display:none!important}'; document.head.appendChild(st); }
    try { document.activeElement && document.activeElement.blur && document.activeElement.id !== 'r349Pw' && document.activeElement.blur(); } catch (e) {} });
  const ring = (pg, sel) => pg.evaluate((sel) => { document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring'));
    if (!document.getElementById('pvRingCss')) { const st = document.createElement('style'); st.id = 'pvRingCss'; st.textContent = '.pv-ring{outline:3px solid #6a3fb5!important;outline-offset:4px!important;border-radius:12px}'; document.head.appendChild(st); }
    const els = []; sel.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { if (e.getClientRects().length) els.push(e); })); els.forEach((e) => e.classList.add('pv-ring')); return els.length; }, sel);
  const grab = async (pg, key, ringSel, frameSel, pad) => { await quiet(pg); await sleep(500); const n = await ring(pg, ringSel); await sleep(700);
    const box = await pg.evaluate((s) => { let x0 = 1e9, y0 = 1e9, x1 = 0, y1 = 0; s.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { const r = e.getBoundingClientRect(); if (!r.width) return; x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); })); return { x0, y0, x1, y1 }; }, frameSel);
    if (!(box.x1 > box.x0)) { console.log(key, 'NOT TAKEN: nothing of', frameSel, 'is on screen'); return; }
    const P = pad == null ? 30 : pad; const x = Math.max(0, box.x0 - P), y = Math.max(0, box.y0 - P);
    const w = Math.min(VW - x, box.x1 - box.x0 + 2 * P), h = Math.min(VH - y, box.y1 - box.y0 + 2 * P);
    console.log(key, 'ringed', n); await pg.screenshot({ path: path.join(OUT, key + '.png'), clip: { x, y, width: w, height: h } }); };
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('fabrica'); }); await sleep(2000);
  await p.evaluate(async (PW) => { const s = await PermitCore.makeKey(PW); await PermitCore._.put('key', s); IngPermit.keys.push({ kid: s.kid, jwk: { kty: 'EC', crv: 'P-256', x: s.pub.x, y: s.pub.y } }); }, PW);
  // 0. the Security room: Your apps signed when shipped, on
  await p.evaluate(() => { go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('code'); }); await sleep(5200);
  await p.evaluate(() => { IngSecurity.view('code'); const t = document.querySelector('#secCard .sc-subs'); if (t) t.scrollIntoView({ block: 'start' }); window.scrollBy(0, -16); }); await sleep(900);
  await p.evaluate(() => { const w = [...document.querySelectorAll('#secCard .sc-well')].find((x) => /Signed with your key/.test(x.textContent)); if (w) w.classList.add('pv-signwell'); });
  await grab(p, '0-room-signed', '.pv-signwell', '#secCard .sc-subs|.pv-signwell', 24);
  await p.evaluate(() => go('fabrica')); await sleep(1200);
  const b64 = fs.readFileSync(path.join(OUT, 'tide.bundle')).toString('base64');
  const id = await p.evaluate(async (b64) => { const bin = atob(b64), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    const r = await IngRepo.fromBundle(u8, { name: 'Tide Clock' }); fbHubHost.FBS().sel = r.id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.setPanel('ship'); fbHubHost.paint(); return r.id; }, b64);
  await sleep(1500);
  // 1. Package details: Signed with your owner key
  await p.evaluate(() => { const k = [...document.querySelectorAll('#fbPkg button')].find((x) => x.textContent.trim() === 'Package details'); k.click(); }); await sleep(900);
  await p.evaluate(() => { const r = document.querySelector('.r349-row'); if (r) r.scrollIntoView({ block: 'center' }); }); await sleep(600);
  await grab(p, '1-package-details', '.r349-row', '.r349-row', 150);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Keep these' && x.offsetParent); k.click(); }); await sleep(700);
  // 2. the card, when the first package is made
  const made = p.evaluate((id) => IngShip.onePage(id, { target: 'page' }).then((x) => x.html), id);
  await p.waitForSelector('#r349Ask'); await sleep(600); await p.fill('#r349Pw', PW);
  await grab(p, '2-sign-card', '#r349Ask .sa-card', '#r349Ask .sa-card', 60);
  await ring(p, 'none'); await p.click('#r349Yes'); const html = await made; fs.writeFileSync(path.join(OUT, 'Tide Clock.html'), html);
  fs.writeFileSync(path.join(OUT, 'Tide Clock, changed.html'), html.replace('Next high water', 'Next low water'));
  // 3. the Ship card: the package's line, and the one page made and signed
  await p.evaluate(async () => { go('fabrica'); fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.setPanel('ship'); fbHubHost.paint(); }); await sleep(900);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Ship' && x.offsetParent); if (k) k.click(); }); await sleep(900);
  await p.evaluate(() => { const t = document.querySelector('#fbTargets .f-tg[data-k="page"]'); if (!t) return; let c = t.parentElement; while (c && !(c.scrollHeight > c.clientHeight + 4 && /(auto|scroll)/.test(getComputedStyle(c).overflowY))) c = c.parentElement;
    t.scrollIntoView({ block: 'start' }); if (c) { const cr = c.getBoundingClientRect(), er = t.getBoundingClientRect(); c.scrollTop += (er.top - cr.top) - 16; } }); await sleep(1200);
  console.log('ship card', JSON.stringify(await p.evaluate(() => { const t = document.getElementById('fbTargets'), r = t && t.getBoundingClientRect(); return r ? [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)] : null; })));
  await p.evaluate(() => { const k = [...document.querySelectorAll('#fbPkg button')].find((x) => x.textContent.trim() === 'Check a package'); if (k) k.classList.add('pv-check'); });
  await grab(p, '3-ship-signed', '#fbTargets .f-tg[data-k="page"] .r349-signed|#fbPkg > span:nth-of-type(2)|#fbPkg .pv-check', '#fbTargets .f-tg[data-k="page"]|#fbTargets .f-tg[data-k="web"]|#fbPkg > span|#fbPkg .pv-check', 20);
  // 4 and 5. Check a package: signed, then changed
  for (const [f, key] of [['Tide Clock.html', '4-check-signed'], ['Tide Clock, changed.html', '5-check-changed']]) {
    const ch = p.waitForEvent('filechooser'); await p.evaluate(() => { const k = [...document.querySelectorAll('#fbPkg button')].find((x) => x.textContent.trim() === 'Check a package'); k.click(); });
    const fc = await ch; await fc.setFiles(path.join(OUT, f)); await p.waitForSelector('#r349Ask .r349-state'); await sleep(700);
    await grab(p, key, '#r349Ask .r349-state', '#r349Ask .sa-card', 60); await ring(p, 'none'); await p.click('#r349Ok'); await sleep(500); }
  // 6 and 7. the web app, one file changed on its host: it refuses, by day and by night
  const web = p.evaluate((id) => IngShip.webApp(id, { pkg: fbHubHost.pkgOf(fbHubHost.cur()) }).then((x) => ({ b64: btoa(String.fromCharCode.apply(null, x.bytes)), name: x.name })), id);
  await sleep(800); if (await p.evaluate(() => !!document.getElementById('r349Ask'))) { await p.fill('#r349Pw', PW); await p.click('#r349Yes'); }
  const w = await web; const zf = path.join(OUT, w.name); fs.writeFileSync(zf, Buffer.from(w.b64, 'base64'));
  const WD = path.join(OUT, 'web'); cp.execFileSync('python3', ['-c', 'import sys,zipfile;zipfile.ZipFile(sys.argv[1]).extractall(sys.argv[2])', zf, WD]);
  const TOPD = path.join(WD, fs.readdirSync(WD)[0]); fs.writeFileSync(path.join(TOPD, 'index.html'), fs.readFileSync(path.join(TOPD, 'index.html'), 'utf8').replace('Next high water', 'Next low water'));
  const srv = await serve(TOPD, 8393);
  for (const [scheme, key] of [['light', '6-web-refused'], ['dark', '7-web-refused-night']]) {
    const c = await b.newContext({ viewport: { width: 900, height: 700 }, deviceScaleFactor: 2, colorScheme: scheme }); const q = await c.newPage();
    await q.goto('http://127.0.0.1:8393/index.html'); await q.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, { timeout: 30000 }).catch(() => {});
    await sleep(800); await q.reload(); await sleep(1500);
    await grab(q, key, '.well', 'main', 40); await c.close(); }
  srv.close();
  console.log(JSON.stringify(errs)); await b.close();
})();
