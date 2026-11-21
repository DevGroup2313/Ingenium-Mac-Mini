// node rig/t_760_app_sign.js <page url> <out folder>
// Ingenium 7.60 · Your apps signed when shipped, part one (modules/r349.js, with r111's web app and r112's Ship): an invented app (Tide
// Clock, its repository made by git) and a test owner key made by the page's own PermitCore (never hers; its public half added to the keys
// this page carries, in the test only). Then:
//   1. Package details has Signed with your owner key, on; the package's line says so;
//   2. the one page: her owner key's password asked in a card of its own (a wrong one refused), the page signed inside itself, the key held
//      for the next package and then dropped; Not now makes nothing; the Ship card marks the package made as Signed;
//   3. the signature checks here and apart from the page (Node's WebCrypto, PermitCore's fixed order), and one byte changed is caught;
//   4. turned off in Package details: made unsigned, and no card;
//   5. the web app: its page and every file signed (signature.ingsig), Check a package says Signed; served over http, its service worker
//      checks each file and the app opens; the same app with one file changed refuses, naming the file;
//   6. Check a package, with the files themselves; 7. no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process'); const crypto = require('crypto'); const http = require('http');
const URL_ = process.argv[2], OUT = process.argv[3];
if (!URL_ || !OUT) { console.log('usage: node rig/t_760_app_sign.js <page url> <out folder>'); process.exit(2); }
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 600))); c ? pass++ : fail++; return !!c; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PW = 'Tide Clock owner key, for the test only';
const canon = (v) => { if (v === null || typeof v !== 'object') return JSON.stringify(v); if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
  return '{' + Object.keys(v).sort().filter((k) => v[k] !== undefined).map((k) => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}'; };
const unb64u = (s) => Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
const SIGTAG = /<meta name="ingenium-signature" content="([A-Za-z0-9_-]{0,8000})">/, BUILDTAG = /<meta name="ingenium-build" content="([0-9A-Za-z.\-]{0,40})">/;
const plain = (buf) => { const s = buf.subarray(0, 1 << 20).toString('latin1'), cut = [];
  for (const re of [SIGTAG, BUILDTAG]) { const m = re.exec(s); if (m && m[1].length) { const a = m.index + m[0].indexOf('content="') + 9; cut.push([a, a + m[1].length]); } }
  cut.sort((x, y) => x[0] - y[0]); const parts = []; let last = 0; for (const c of cut) { parts.push(buf.subarray(last, c[0])); last = c[1]; } parts.push(buf.subarray(last)); return Buffer.concat(parts); };
const serve = (dir, port) => new Promise((res) => { const s = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(dir, p); if (!f.startsWith(dir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); r.end(); return; }
  const t = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.ingsig': 'application/json', '.txt': 'text/plain' }[path.extname(f)] || 'application/octet-stream';
  r.writeHead(200, { 'Content-Type': t, 'Cache-Control': 'no-store' }); r.end(fs.readFileSync(f)); }); s.listen(port, '127.0.0.1', () => res(s)); });
(async () => {
  // the app, as git makes it
  const W = path.join(OUT, 'tide'); fs.mkdirSync(path.join(W, 'icons'), { recursive: true });
  const git = (a) => cp.execFileSync('git', a, { cwd: W, encoding: 'utf8', env: Object.assign({}, process.env, { GIT_CONFIG_NOSYSTEM: '1', GIT_AUTHOR_NAME: 'Ada Ferreira', GIT_AUTHOR_EMAIL: 'ada@example.invalid', GIT_COMMITTER_NAME: 'Ada Ferreira', GIT_COMMITTER_EMAIL: 'ada@example.invalid' }) });
  fs.writeFileSync(path.join(W, 'index.html'), '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="ingenium-build" content="">\n<title>Tide Clock</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1 id="t">Tide Clock</h1>\n<p id="next">Next high water: <span id="h"></span></p>\n<script src="app.js"></script>\n</body>\n</html>\n');
  fs.writeFileSync(path.join(W, 'app.js'), 'document.getElementById("h").textContent = "18:42";\nwindow.__tide = true;\n');
  fs.writeFileSync(path.join(W, 'style.css'), 'body{font:16px/1.5 Georgia,serif;margin:40px;color:#123}h1{color:#235}\n');
  fs.writeFileSync(path.join(W, 'icons', 'icon-192.png'), Buffer.from('89504e470d0a1a0a0000000d4948445200000001000000010806000000' + '1f15c4890000000d4944415478da63f8ffff3f0005fe02fea7d6a4a80000000049454e44ae426082', 'hex'));
  git(['init', '-q', '-b', 'main']); git(['add', '-A']); git(['commit', '-qm', 'Tide Clock, the first version']); git(['bundle', 'create', '-q', path.join(OUT, 'tide.bundle'), '--all']);
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 300)));
  try {
    await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('fabrica'); }); await sleep(2000);
    ok(await p.evaluate(() => !!(window.IngAppSign && IngShip.onePage && ING_EDITION === 'master')), 'the master edition carries IngAppSign');
    const sealed = await p.evaluate(async (PW) => { const s = await PermitCore.makeKey(PW); await PermitCore._.put('key', s); IngPermit.keys.push({ kid: s.kid, jwk: { kty: 'EC', crv: 'P-256', x: s.pub.x, y: s.pub.y } }); return s; }, PW);
    // 0. the Security room: Your apps signed when shipped, on, now that the owner key is here
    await p.evaluate(() => { go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('code'); }); await sleep(5200);
    await p.evaluate(() => IngSecurity.view('code')); await sleep(900);
    const room = await p.evaluate(() => { const w = [...document.querySelectorAll('#secCard .sc-well')].find((x) => /Signed with your key/.test(x.textContent)); const it = IngSecurity.items().filter((x) => x.t === 'Your apps signed when shipped')[0];
      return { t: w ? w.innerText.replace(/\s+/g, ' ') : '', s: it && it.s }; });
    ok(room.s === 'on' && /On: every package Fabrica makes carries your owner key's signature/.test(room.t) && /Not yet: the Mac, Windows, Android and iPhone apps check/.test(room.t), 'the Security room: Your apps signed when shipped, on, with what is not yet', room);
    await p.evaluate(() => go('fabrica')); await sleep(1200);
    const b64 = fs.readFileSync(path.join(OUT, 'tide.bundle')).toString('base64');
    const id = await p.evaluate(async (b64) => { const bin = atob(b64), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
      const r = await IngRepo.fromBundle(u8, { name: 'Tide Clock' }); fbHubHost.FBS().sel = r.id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.setPanel('ship'); fbHubHost.paint(); return r.id; }, b64);
    await sleep(1500);
    // 1. Package details and the package's line
    const line = await p.evaluate(() => (document.getElementById('fbPkg') || {}).innerText || '');
    ok(/signed with this device's key and with your owner key/.test(line) && /Check a package/.test(line), "the package's line: signed with your owner key too, and Check a package", line);
    await p.evaluate(() => { const k = [...document.querySelectorAll('#fbPkg button')].find((x) => x.textContent.trim() === 'Package details'); k.click(); }); await sleep(800);
    const row = await p.evaluate(() => { const b = document.querySelector('.r349-row'); return b ? { on: b.getAttribute('aria-checked'), t: b.innerText.replace(/\s+/g, ' ') } : null; });
    ok(row && row.on === 'true' && /Signed with your owner key/.test(row.t), 'Package details: Signed with your owner key, on', row);
    await p.screenshot({ path: path.join(OUT, '1-package-details.png') });
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Keep these' && x.offsetParent); k.click(); }); await sleep(600);
    // 2. the one page: the card, a wrong password, then hers
    const made = p.evaluate((id) => IngShip.onePage(id, { target: 'page' }).then((x) => ({ html: x.html, signed: x.signed || null }), (e) => ({ error: e.message })), id);
    await p.waitForSelector('#r349Ask', { timeout: 20000 }); await sleep(400);
    const card = await p.evaluate(() => { const w = document.getElementById('r349Ask'); return { h: w.querySelector('h2').textContent, t: w.innerText.replace(/\s+/g, ' '), focus: document.activeElement && document.activeElement.id }; });
    ok(card.h === 'Sign Tide Clock' && card.focus === 'r349Pw' && /Not now/.test(card.t) && /Sign and make/.test(card.t), "the card asks for the owner key's password", card);
    await p.screenshot({ path: path.join(OUT, '2-sign-card.png') });
    await p.fill('#r349Pw', 'not the password'); await p.click('#r349Yes');
    await p.waitForFunction(() => /does not open/.test((document.getElementById('r349Say') || {}).textContent || ''), null, { timeout: 60000 }).catch(() => {});
    ok(await p.evaluate(() => !!document.getElementById('r349Ask') && /does not open the key/.test(document.getElementById('r349Say').textContent)), 'a wrong password is refused, and the card stays');
    await p.fill('#r349Pw', PW); await p.click('#r349Yes');
    const one = await made;
    ok(one.signed && one.signed.kid === sealed.kid && SIGTAG.test(one.html) && !one.error, 'the one page is made, signed inside itself', one.error || (one.signed && one.signed.kid));
    const again = await p.evaluate((id) => Promise.race([IngShip.onePage(id, { target: 'page' }).then((x) => !!x.signed), new Promise((r) => setTimeout(() => r('asked'), 4000))]), id);
    ok(again === true && !(await p.evaluate(() => !!document.getElementById('r349Ask'))), 'the next package within two minutes is signed without asking again', again);
    await p.evaluate(async () => { IngAppSign._drop(); await fbHubHost.refresh(); fbHubHost.paint(); }); await sleep(1200);
    const chip = await p.evaluate(() => { const t = document.querySelector('#fbTargets .f-tg[data-k="page"]'); return t ? t.innerText.replace(/\s+/g, ' ') : ''; });
    ok(/Made/.test(chip) && /Signed/.test(chip), 'the Ship card marks the one page made as Signed', chip);
    await p.screenshot({ path: path.join(OUT, '3-ship-signed.png') });
    const notNow = p.evaluate((id) => IngShip.onePage(id, { target: 'page' }).then(() => 'made', (e) => e.message), id);
    await p.waitForSelector('#r349Ask', { timeout: 20000 }); await p.click('#r349No');
    ok(/Nothing was made: it was not signed/.test(await notNow), 'Not now makes nothing');
    // 3. the signature, checked here and apart from the page
    const page = Buffer.from(one.html, 'utf8'); fs.writeFileSync(path.join(OUT, 'Tide Clock.html'), page);
    const here = await p.evaluate((h) => IngAppSign.checkPage(new TextEncoder().encode(h)).then((r) => ({ state: r.state, name: r.release && r.release.name, app: r.release && r.release.app })), one.html);
    ok(here.state === 'signed' && here.name === 'Tide Clock' && here.app, 'Ingenium checks it: signed', here);
    const file = JSON.parse(unb64u(SIGTAG.exec(one.html)[1]).toString('utf8'));
    const key = await crypto.webcrypto.subtle.importKey('jwk', { kty: 'EC', crv: 'P-256', x: sealed.pub.x, y: sealed.pub.y, ext: true }, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
    const good = await crypto.webcrypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, key, unb64u(file.sig), new TextEncoder().encode(canon(file.release)));
    const pb = plain(page);
    ok(good && file.release.files.page.sha256 === crypto.createHash('sha256').update(pb).digest('hex') && file.release.files.page.size === pb.length,
      'apart from the page: the signature holds, over the page with its own tag and the build number left empty');
    const stamped = one.html.replace('<meta name="ingenium-build" content="">', '<meta name="ingenium-build" content="1.0.20261121.4">');
    ok((await p.evaluate((h) => IngAppSign.checkPage(new TextEncoder().encode(h)).then((r) => r.state), stamped)) === 'signed', 'a build number stamped in later does not break it');
    const changed = one.html.replace('Next high water', 'Next low water');
    fs.writeFileSync(path.join(OUT, 'Tide Clock, changed.html'), changed);
    ok((await p.evaluate((h) => IngAppSign.checkPage(new TextEncoder().encode(h)).then((r) => r.state), changed)) === 'changed', 'a word changed after signing is caught');
    // 4. turned off: made unsigned, no card
    await p.evaluate((id) => { fbHubHost.FBS().ship[id].sign = false; }, id);
    const off = await p.evaluate((id) => Promise.race([IngShip.onePage(id, { target: 'page' }).then((x) => ({ signed: !!x.signed, tag: /ingenium-signature/.test(x.html) })), new Promise((r) => setTimeout(() => r('asked'), 4000))]), id);
    ok(off && off.signed === false && off.tag === false, 'turned off in Package details: made unsigned, nothing asked', off);
    await p.evaluate((id) => { fbHubHost.FBS().ship[id].sign = true; }, id);
    // 4b. on a device without her owner key: made unsigned, nothing asked, and said
    await p.evaluate(() => PermitCore._.put('key', null));
    const nokey = await p.evaluate((id) => Promise.race([IngShip.onePage(id, { target: 'page' }).then((x) => ({ signed: !!x.signed, said: (document.getElementById('ingToast') || {}).textContent || '' })), new Promise((r) => setTimeout(() => r('asked'), 4000))]), id);
    ok(nokey && nokey.signed === false && /Made unsigned: your owner key is not on this device/.test(nokey.said), 'without her owner key on the device: made unsigned, nothing asked, and said', nokey);
    await p.evaluate((s) => PermitCore._.put('key', s), sealed);
    // 5. the web app
    const web = p.evaluate((id) => IngShip.webApp(id, { pkg: fbHubHost.pkgOf(fbHubHost.cur()) }).then((x) => ({ b64: btoa(String.fromCharCode.apply(null, x.bytes)), name: x.name }), (e) => ({ error: e.message })), id);
    await p.waitForSelector('#r349Ask', { timeout: 20000 }); await p.fill('#r349Pw', PW); await p.click('#r349Yes');
    const w = await web; ok(w.b64 && !w.error, 'the web app is made', w.error);
    const zip = Buffer.from(w.b64, 'base64'); fs.writeFileSync(path.join(OUT, w.name || 'web.zip'), zip);
    const zchk = await p.evaluate((b64) => { const bin = atob(b64), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i); return IngAppSign.check(u8).then((r) => ({ state: r.state, files: r.files })); }, w.b64);
    ok(zchk.state === 'signed' && zchk.files >= 5, 'Ingenium checks the web app: every file as signed', zchk);
    const WD = path.join(OUT, 'web'); cp.execFileSync('python3', ['-c', 'import sys,zipfile;zipfile.ZipFile(sys.argv[1]).extractall(sys.argv[2])', path.join(OUT, w.name || 'web.zip'), WD]);
    const top = fs.readdirSync(WD)[0], TOPD = path.join(WD, top);
    ok(fs.existsSync(path.join(TOPD, 'signature.ingsig')) && /^\/\* Ingenium: Tide Clock opens only as its maker signed it/.test(fs.readFileSync(path.join(TOPD, 'sw.js'), 'utf8')) && SIGTAG.test(fs.readFileSync(path.join(TOPD, 'index.html'), 'utf8')),
      'it carries signature.ingsig, its page carries its own, and its service worker carries the check');
    const s1 = await serve(TOPD, 8391);
    const c2 = await b.newContext(); const q = await c2.newPage(); const qerr = []; q.on('pageerror', (e) => qerr.push(e.message));
    await q.goto('http://127.0.0.1:8391/index.html'); await q.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, { timeout: 30000 }).catch(() => {});
    await sleep(800); await q.reload(); await sleep(1200);
    const okApp = await q.evaluate(() => ({ h1: (document.querySelector('h1') || {}).textContent, tide: window.__tide === true, sw: !!(navigator.serviceWorker && navigator.serviceWorker.controller) }));
    ok(okApp.h1 === 'Tide Clock' && okApp.tide && okApp.sw, 'served over http: its service worker checks each file, and the app opens', okApp);
    await c2.close(); s1.close();
    const TD2 = path.join(OUT, 'web-changed'); fs.cpSync(TOPD, TD2, { recursive: true });
    fs.writeFileSync(path.join(TD2, 'index.html'), fs.readFileSync(path.join(TD2, 'index.html'), 'utf8').replace('Next high water', 'Next low water'));
    const s2 = await serve(TD2, 8392);
    const c3 = await b.newContext(); const r3 = await c3.newPage();
    await r3.goto('http://127.0.0.1:8392/index.html'); await r3.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, { timeout: 30000 }).catch(() => {});
    await sleep(800); await r3.reload(); await sleep(1200);
    const bad = await r3.evaluate(() => ({ h1: (document.querySelector('h1') || {}).textContent, t: document.body.innerText.replace(/\s+/g, ' '), tide: window.__tide === true }));
    ok(bad.h1 === 'Tide Clock did not open' && /index\.html/.test(bad.t) && /changed since it was signed/.test(bad.t) && !bad.tide, 'one file changed on the host: the app refuses to open, naming the file', bad);
    await r3.screenshot({ path: path.join(OUT, '5-web-refused.png') });
    await c3.close(); s2.close();
    // 6. Check a package, with the files themselves
    for (const [f, want] of [['Tide Clock.html', 'Signed'], ['Tide Clock, changed.html', 'Changed']]) {
      const ch = p.waitForEvent('filechooser', { timeout: 15000 });
      await p.evaluate(() => { const k = [...document.querySelectorAll('#fbPkg button')].find((x) => x.textContent.trim() === 'Check a package'); k.click(); });
      const fc = await ch; await fc.setFiles(path.join(OUT, f)); await p.waitForSelector('#r349Ask .r349-state', { timeout: 20000 });
      const res = await p.evaluate(() => ({ chip: document.querySelector('#r349Ask .r349-state').textContent, t: document.getElementById('r349Ask').innerText.replace(/\s+/g, ' ') }));
      ok(res.chip === want, 'Check a package, ' + f + ': ' + want, res);
      if (want === 'Signed') await p.screenshot({ path: path.join(OUT, '4-check-signed.png') });
      await p.click('#r349Ok'); await sleep(400);
    }
    ok(errs.length === 0, 'no page error', errs);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 700)); }
  finally { await b.close(); }
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
