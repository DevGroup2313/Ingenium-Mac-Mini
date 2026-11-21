// Ingenium 7.63 · opens only with your owner key (modules/r354.js; its hooks in r112, r318, r349, r162 and PermitCore). Her word on its
// nine pictures (21 November 2026): "I approve of the previews, please commit and push it everywhere and continue working on my
// requests." An invented app (Tide Clock), an invented person (Ada Example) and a test owner key made by the page's own PermitCore.
//   1. Package details: the switch under Signed with your owner key, off until she turns it on; on, it keeps the signature on
//   2. the Security room says it is on for one app, and what the door keeps out and what it cannot; the permission form lists the app
//   3. the package: its door is the page's first script, the page is signed; a page that runs only its own scripts, or a device without
//      her owner key, makes nothing, and says why
//   4. the door: nothing of the app runs behind it; a wrong password keeps it shut; the right one opens it, and the device keeps it open;
//      an opening changed, or kept from another device, closes it again
//   5. permissions: valid opens; ended, withdrawn, another app's, one that does not allow its use, or one not signed by the owner, each
//      keeps it shut and says why; a kept permission that has since ended closes it again
//     node rig/t_763_owner_door.js <page url> [master|gift]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const http = require('http'); const os = require('os');
const [URL_, ED = 'master'] = process.argv.slice(2);
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? P++ : F++; }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
setTimeout(() => { console.log('FAIL the test did not finish in 15 minutes'); process.exit(3); }, 15 * 60 * 1000).unref();
const PW = 'Tide Clock owner key, for the tests only';
const APP = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="ingenium-build" content="">\n<title>Tide Clock</title>\n</head>\n<body>\n<h1>Tide Clock</h1>\n<p>Next high water at the harbour: 18:42.</p>\n<script>window.__appRan = true;</script>\n</body>\n</html>\n';
const STRICT = APP.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'sha256-AAAA\'">');
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), 't763-'));
const serve = (port) => new Promise((res) => { const s = http.createServer((q, r) => { const f = path.join(DIR, decodeURIComponent(q.url.split('?')[0]));
  if (!f.startsWith(DIR) || !fs.existsSync(f)) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }); r.end(fs.readFileSync(f)); });
  s.listen(port, '127.0.0.1', () => res(s)); });
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 1000 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(800); await p.evaluate(() => { const t = document.getElementById('tgTick'); if (t && !t.checked) t.click(); const k = [...document.querySelectorAll('.tg-veil button')].find((x) => x.offsetParent && !x.disabled); if (k) k.click(); });
  const api = await p.evaluate(() => !!(window.IngOwnerOnly && IngOwnerOnly.door && IngOwnerOnly.packageRow && IngOwnerOnly.well && IngOwnerOnly.apps && document.getElementById('r354-door')));
  if (ED !== 'master') {   // another edition: nothing of hers, nothing to turn on
    const r = await p.evaluate(() => { const box = document.createElement('div'); const row = window.IngOwnerOnly ? IngOwnerOnly.packageRow(box, {}, {}) : null; return { row, well: window.IngOwnerOnly ? IngOwnerOnly.well((s) => '[' + s + ']') : '', wanted: window.IngOwnerOnly ? IngOwnerOnly.wanted('x') : false }; });
    ok(r.row === null && r.wanted === false && /the owner's own copy of Ingenium makes it so/.test(r.well), 'this edition: no switch, nothing made for its owner alone, and the room says what the owner\'s copy does', r);
    ok(errs.length === 0, 'no page errors', errs); console.log(P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0); }
  ok(api, 'r354 is running, and its door rides beside it');
  // a test owner key, and four permissions it signs, and one signed by a stranger's key
  const made = await p.evaluate(async (PW) => { const s = await PermitCore.makeKey(PW); await PermitCore._.put('key', s); IngPermit.keys.push({ kid: s.kid, jwk: { kty: 'EC', crv: 'P-256', x: s.pub.x, y: s.pub.y } });
    const key = await PermitCore.openKey(s, PW), stranger = await PermitCore.openKey(await PermitCore.makeKey('another'), 'another'), out = { key: JSON.stringify(s), kid: s.kid, permits: {} };
    const sign = async (k, kid, n, extra) => { const permit = Object.assign({ n, holder: 'Ada Example', apps: ['tide-clock'], allows: ['use'], from: '2026-01-01', until: '2027-12-31', issued: new Date().toISOString() }, extra || {});
      return JSON.stringify({ kind: PermitCore.KIND.permit, v: 1, permit, kid, sig: await PermitCore.signWith(k, permit) }); };
    out.permits.valid = await sign(key, s.kid, 'P-2026-0001');
    out.permits.ended = await sign(key, s.kid, 'P-2026-0002', { from: '2026-01-01', until: '2026-02-01' });
    out.permits.withdrawn = await sign(key, s.kid, 'P-2026-0003');
    out.permits.other = await sign(key, s.kid, 'P-2026-0004', { apps: ['harbour-notes'] });
    out.permits.nouse = await sign(key, s.kid, 'P-2026-0005', { allows: ['install'] });
    out.permits.foreign = await sign(stranger, s.kid, 'P-2026-0006');
    return out; }, PW);
  fs.writeFileSync(path.join(DIR, 'owner.ingkey'), made.key); Object.keys(made.permits).forEach((k) => fs.writeFileSync(path.join(DIR, k + '.ingperm'), made.permits[k]));

  // 1. Package details
  await p.evaluate(() => go('fabrica')); await sleep(1200);
  const id = await p.evaluate(async (t) => { const x = await IngRepo.fromFiles([{ path: 'index.html', data: t }], { name: 'Tide Clock', msg: 'Tide Clock, the first version' }); const id = x.id || (x.repo && x.repo.id);
    fbHubHost.FBS().sel = id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.setPanel('ship'); fbHubHost.paint(); return id; }, APP);
  await sleep(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#fbPkg button')].find((x) => x.textContent.trim() === 'Package details'); k.click(); }); await sleep(800);
  const rows = await p.evaluate(() => [...document.querySelectorAll('.r349-row')].map((r) => ({ t: r.querySelector('b').textContent, on: r.getAttribute('aria-checked') })));
  ok(rows.length === 2 && rows[0].t === 'Signed with your owner key' && rows[1].t === 'Opens only with your owner key' && rows[1].on === 'false', 'Package details: the switch under Signed with your owner key, off', rows);
  // turned on with the signature off: it turns the signature on too
  await p.evaluate(() => { const r = [...document.querySelectorAll('.r349-row')]; r[0].click(); r[1].click(); }); await sleep(300);
  const both = await p.evaluate(() => [...document.querySelectorAll('.r349-row')].map((r) => r.getAttribute('aria-checked')));
  ok(both.join() === 'true,true', 'turned on, it keeps the signature on', both);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Keep these' && x.offsetParent); k.click(); }); await sleep(600);
  const pref = await p.evaluate((id) => fbHubHost.FBS().ship[id], id);
  ok(pref && pref.ownerOnly === true && pref.sign === true && (await p.evaluate((id) => IngOwnerOnly.wanted(id), id)), 'kept: the app is its owner\'s alone, and signed', pref);

  // 2. the room and the permission form
  const well = await p.evaluate(() => IngOwnerOnly.well((s) => '[' + s + ']'));
  ok(/\[on\]/.test(well) && /On for 1 app/.test(well) && /It keeps out a person without your key or your permission/.test(well) && /someone who takes the app apart/.test(well), 'the Security room: on for one app; what it keeps out, and what it cannot', well.replace(/<[^>]+>/g, ' ').slice(0, 300));
  const form = await p.evaluate(() => { const o = IngOwnerOnly.apps(); go('settings'); return o; }); await sleep(1500);
  ok(form.length === 1 && form[0].id === 'tide-clock' && form[0].name === 'Tide Clock', 'the permission form is given the app, by the name its door reads', form);

  // 3. the package
  await p.evaluate(() => go('fabrica')); await sleep(800);
  const html = p.evaluate((id) => IngShip.onePage(id, { target: 'page' }).then((x) => x.html), id);
  await p.waitForSelector('#r349Ask #r349Pw', { timeout: 60000 }); await p.fill('#r349Pw', PW); await p.click('#r349Yes'); const page = await html;
  const head = page.slice(page.search(/<head(\s[^>]*)?>/i), page.indexOf('<title>'));
  const firstScript = /<script>window\.__ingDoorCfg=/.test(head) && head.indexOf('<script') === head.indexOf('<script>window.__ingDoorCfg=');
  const cfg = JSON.parse(/window\.__ingDoorCfg=(\{[^\n]*?\});\n/.exec(page)[1]);
  const signed = await p.evaluate((h) => IngAppSign.check(new TextEncoder().encode(h)).then((r) => r.state), page);
  ok(firstScript && signed === 'signed' && cfg.app === 'tide-clock' && cfg.apps.indexOf('tide-clock') === 0 && cfg.keys.some((k) => k.kid === made.kid), 'the package: its door is the page\'s first script, and the page is signed', { firstScript, signed, cfg: { app: cfg.app, apps: cfg.apps, keys: cfg.keys.length } });
  fs.writeFileSync(path.join(DIR, 'tide.html'), page);
  const strict = await p.evaluate((h) => { try { IngOwnerOnly.door(h, { app: 'tide-clock', name: 'Tide Clock' }); return 'made'; } catch (e) { return e.message; } }, STRICT);
  ok(/runs only its own scripts .*nothing was made/.test(strict), 'a page that runs only its own scripts: nothing is made, and it says why', strict);
  const nokey = await p.evaluate(async (id) => { const s = await PermitCore._.get('key'); await PermitCore._.put('key', null); IngAppSign._drop();
    try { await IngShip.onePage(id, { target: 'page' }); return 'made'; } catch (e) { return e.message; } finally { await PermitCore._.put('key', s); } }, id);
  ok(/^Nothing was made: Tide Clock opens only with your owner key/.test(nokey), 'without her owner key on the device: nothing is made, and it says why', nokey);

  // 4. the door
  const srv = await serve(8297); const U = 'http://127.0.0.1:8297/tide.html';
  const c = await b.newContext({ viewport: { width: 980, height: 700 } }); const q = await c.newPage(); const derrs = []; q.on('pageerror', (e) => derrs.push(String(e).slice(0, 200)));
  const atDoor = async () => { await q.goto(U, { waitUntil: 'commit' }); await q.waitForSelector('#dKey', { timeout: 30000 }); await sleep(300); };
  await atDoor();
  const d0 = await q.evaluate(() => ({ ran: window.__appRan === true, title: document.title, h: document.getElementById('dh').textContent, keys: [...document.querySelectorAll('.keys button')].map((x) => x.textContent) }));
  ok(!d0.ran && d0.h === 'Tide Clock opens for its owner' && d0.keys.join('|') === 'Use a permission|Open it with my owner key', 'the door: nothing of the app ran, and it offers the owner key and a permission', d0);
  const choose = async (file) => { const ch = q.waitForEvent('filechooser'); await q.click('#dFile'); const fc = await ch; await fc.setFiles(path.join(DIR, file)); await sleep(400); };
  await q.click('#dKey'); await sleep(300); await choose('owner.ingkey'); await q.fill('#dPw', 'not the password'); await q.click('#dOpen');
  await q.waitForFunction(() => /does not open/.test(document.getElementById('dSay').textContent), null, { timeout: 60000 });
  ok(!(await q.evaluate(() => window.__appRan === true)) && !(await q.evaluate(() => localStorage.getItem('ingenium-door:tide-clock'))), 'a wrong password: it says so, and the door stays shut');
  await q.fill('#dPw', PW); await q.click('#dOpen'); await q.waitForFunction(() => window.__appRan === true, null, { timeout: 60000 }).catch(() => {});
  const opened = await q.evaluate(() => ({ ran: window.__appRan === true, kept: JSON.parse(localStorage.getItem('ingenium-door:tide-clock') || 'null') }));
  ok(opened.ran && opened.kept && opened.kept.kind === 'ingenium-app-opened' && opened.kept.body.app === 'tide-clock' && opened.kept.kid === made.kid, 'the right password: the app opens, and the device keeps the opening, signed by the owner key', opened);
  await q.reload({ waitUntil: 'commit' }); await sleep(1500);
  ok(await q.evaluate(() => window.__appRan === true && !document.getElementById('dKey')), 'the next start: it opens straight away');
  await q.evaluate(() => { const k = JSON.parse(localStorage.getItem('ingenium-door:tide-clock')); k.body.made = '2020-01-01T00:00:00.000Z'; localStorage.setItem('ingenium-door:tide-clock', JSON.stringify(k)); });
  await q.reload({ waitUntil: 'commit' }); await q.waitForSelector('#dKey', { timeout: 30000 }).catch(() => {});
  ok(await q.evaluate(() => !!document.getElementById('dKey') && !localStorage.getItem('ingenium-door:tide-clock')), 'an opening changed by one field: the door again, and the opening dropped');
  // an opening kept on another device: its device is not this one
  await q.click('#dKey'); await sleep(300); await choose('owner.ingkey'); await q.fill('#dPw', PW); await q.click('#dOpen'); await q.waitForFunction(() => window.__appRan === true, null, { timeout: 60000 }).catch(() => {});
  await q.evaluate(() => localStorage.setItem('ingenium-device', 'another-device')); await q.reload({ waitUntil: 'commit' }); await q.waitForSelector('#dKey', { timeout: 30000 }).catch(() => {});
  ok(await q.evaluate(() => !!document.getElementById('dKey')), 'an opening made on another device: the door again');

  // 5. permissions
  const permit = async (file) => { await q.evaluate(() => localStorage.removeItem('ingenium-door:tide-clock')); await atDoor(); await q.click('#dPermit'); await sleep(300); await choose(file + '.ingperm');
    await q.waitForFunction(() => /\S/.test((document.getElementById('dState') || {}).textContent || ''), null, { timeout: 30000 });
    return q.evaluate(() => ({ chip: document.querySelector('#dState .chip').textContent, why: document.querySelector('#dState p:last-child').textContent, open: !document.getElementById('dOpen').disabled, name: document.getElementById('dFileName').textContent })); };
  let r = await permit('valid');
  ok(r.chip === 'Valid' && r.open && /^Ada Example may use Tide Clock until 31 December 2027\.$/.test(r.why) && r.name === 'Permission P-2026-0001', 'a valid permission: Valid, its holder and its last day; Open it', r);
  await q.click('#dOpen'); await q.waitForFunction(() => window.__appRan === true, null, { timeout: 30000 }).catch(() => {});
  ok(await q.evaluate(() => window.__appRan === true && JSON.parse(localStorage.getItem('ingenium-door:tide-clock')).kind === 'offline-project-permission'), 'opened with it: the app runs, and the permission is kept');
  for (const [file, chip, re, what] of [['ended', 'Ended', /^It ended on 1 February 2026\. Ask its owner for a new one\.$/, 'an ended permission'],
    ['other', "Another app's", /^It is for another app, not for Tide Clock\.$/, "another app's permission"],
    ['nouse', 'Not for use', /^It does not allow its holder to use Tide Clock\.$/, 'a permission that does not allow its use'],
    ['foreign', "Not the owner's", /^It is not signed by this app's owner, or it was changed\.$/, "a permission not signed by the owner's key"]]) {
    r = await permit(file); ok(r.chip === chip && !r.open && re.test(r.why), what + ': ' + chip + ', and it stays shut', r); }
  // withdrawn: the owner's latest list, as a later package carries it
  fs.writeFileSync(path.join(DIR, 'tide.html'), page.replace('"withdrawn":[]', '"withdrawn":["P-2026-0003"]'));
  r = await permit('withdrawn'); ok(r.chip === 'Withdrawn' && !r.open && /^Its owner has withdrawn it\.$/.test(r.why), 'a withdrawn permission, once the app carries the owner\'s latest list: Withdrawn, and it stays shut', r);
  // a kept permission that has since ended: the door again
  await q.evaluate((t) => localStorage.setItem('ingenium-door:tide-clock', t), made.permits.ended); await q.reload({ waitUntil: 'commit' }); await q.waitForSelector('#dKey', { timeout: 30000 }).catch(() => {});
  ok(await q.evaluate(() => !!document.getElementById('dKey') && !localStorage.getItem('ingenium-door:tide-clock')), 'a kept permission that has since ended: the door again');
  ok(derrs.length === 0 && errs.length === 0, 'no page errors, in Ingenium or behind the door', { errs, derrs });
  srv.close(); fs.rmSync(DIR, { recursive: true, force: true });
  console.log(P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
