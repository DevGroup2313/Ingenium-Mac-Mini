// Ingenium 7.68 · read it as written, scrambled for everyone else, part one (modules/r357.js; the mark modules/r356.js writes; its hooks in
// r112, r352, r318 and build_page.py). Invented apps (Tide Clock) and a reading key made here with a password for the tests only.
//   1. Settings, Security, Ingenium itself: Read it as written, Not yet, with Make your reading key and Bring it back from its backup
//   2. made: the password asked twice (twelve characters at least, the same twice); its backup saved; the room names it and says this
//      release does not carry its public half yet; Save its public half: the public half alone, numbered by its own fingerprint
//   3. the key opens with its password (and not with another), and opens what is sealed to its public half; brought back from its backup
//   4. build_page.py's guard on reading_keys.json: none, a good one, a private part, a wrong number, another kind of file
//   5. a scrambled package names the version it came from (the app and its version id), and a copy that comes back opens as written:
//      Fabrica's Bring one in opens that app (nothing brought in); Lector's app library keeps it as written; a version not held stays
//   6. another edition (gift): no reading key, nothing said
//     node rig/t_768_readable.js <page file> [gift]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const http = require('http'); const os = require('os'); const { execFileSync } = require('child_process');
const [PAGE, ED = 'master'] = process.argv.slice(2);
if (!PAGE) { console.log('usage: node rig/t_768_readable.js <page file> [gift]'); process.exit(2); }
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 900))); c ? P++ : F++; }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
setTimeout(() => { console.log('FAIL the test did not finish in 25 minutes'); process.exit(3); }, 25 * 60 * 1000).unref();
const PW = 'Tide Clock reading key, for the tests only';
const TIDE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Tide Clock</title>
</head>
<body>
<p id="next">…</p>
<script>
function refreshTide(){var harbourOffsetMinutes=17,lunarHalfDay=745,lastHighWater=new Date(2026,10,22,6,25);
  var nextHighWater=new Date(lastHighWater.getTime()+(lunarHalfDay+harbourOffsetMinutes)*60000);
  document.getElementById('next').textContent=('0'+nextHighWater.getHours()).slice(-2)+':'+('0'+nextHighWater.getMinutes()).slice(-2);}
refreshTide();
</script>
</body>
</html>
`;
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), 't768-'));
fs.symlinkSync(path.resolve(PAGE), path.join(DIR, 'ingenium.html'));
const serve = (port) => new Promise((res) => { const s = http.createServer((q, r) => { const f = path.join(DIR, decodeURIComponent(q.url.split('?')[0]));
  if (!f.startsWith(DIR) || !fs.existsSync(f)) { r.writeHead(404); r.end(); return; }
  r.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }); fs.createReadStream(f).pipe(r); });
  s.listen(port, '127.0.0.1', () => res(s)); });
(async () => {
  const srv = await serve(8768); const URL_ = 'http://127.0.0.1:8768/ingenium.html';
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 1000 }, acceptDownloads: true });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(800); await p.evaluate(() => { const t = document.getElementById('tgTick'); if (t && !t.checked) t.click(); const k = [...document.querySelectorAll('.tg-veil button')].find((x) => x.offsetParent && !x.disabled); if (k) k.click(); });
  const toastText = () => p.evaluate(() => (document.getElementById('ingToast') || {}).textContent || '');
  const room = async () => { await p.evaluate(() => { go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('self'); }); await sleep(1800);
    return p.evaluate(() => { const w = document.getElementById('r357Well'); return w ? { text: w.textContent, keys: [...w.querySelectorAll('[data-rk]')].map((k) => k.getAttribute('data-rk')), chip: (w.querySelector('.sc-chip') || {}).textContent } : null; }); };
  if (ED !== 'master') {
    const r = await p.evaluate(() => ({ api: !!window.IngReadable, well: window.IngReadable ? IngReadable.well((s) => '[' + s + ']') : '', ed: ING_EDITION }));
    const w = await room();
    ok(r.well === '' && w === null, r.ed + ' edition: no reading key and nothing said of it (it is the owner\'s own)', { r, w });
    ok(errs.length === 0, 'no page errors', errs); console.log(P + ' passed, ' + F + ' failed'); await b.close(); srv.close(); process.exit(F ? 1 : 0); }

  // 1. the room, before any reading key
  ok(await p.evaluate(() => !!(window.IngReadable && IngReadable.well && IngReadable.markOf && IngReadable.holder) && ING_EDITION === 'master'), 'r357 runs in the master edition');
  await p.evaluate(() => PermitCore._.put('readkey', null));
  await p.evaluate(() => IngReadable._look()); await sleep(400);
  const w0 = await room();
  ok(w0 && w0.chip === 'Not yet' && /Every copy of Ingenium is to be scrambled, and you to read it as written/.test(w0.text) && w0.keys.join() === 'make,bring' && /Ingenium's code, in this copy: as written/.test(w0.text),
    'Ingenium itself: Read it as written, Not yet, with Make your reading key and Bring it back; the code of this copy said to be as written', w0);

  // 2. made
  await p.click('#secCard [data-rk="make"]'); await p.waitForSelector('#r357Ask #r357Pw', { timeout: 10000 });
  await p.fill('#r357Pw', 'too short'); await p.fill('#r357Pw2', 'too short'); await p.click('#r357Yes'); await sleep(200);
  const s1 = await p.evaluate(() => document.getElementById('r357Say').textContent);
  await p.fill('#r357Pw', PW); await p.fill('#r357Pw2', PW + ' not the same'); await p.click('#r357Yes'); await sleep(200);
  const s2 = await p.evaluate(() => document.getElementById('r357Say').textContent);
  ok(s1 === 'At least twelve characters, please.' && s2 === 'The two passwords are not the same.', 'its password: twelve characters at least, the same twice', { s1, s2 });
  await p.fill('#r357Pw2', PW);
  const dl1 = p.waitForEvent('download', { timeout: 60000 }); await p.click('#r357Yes'); const d1 = await dl1; const f1 = path.join(DIR, d1.suggestedFilename()); await d1.saveAs(f1);
  const backup = JSON.parse(fs.readFileSync(f1, 'utf8'));
  ok(/^ingenium-reading-key-\d{4}-\d\d-\d\d\.ingreadkey$/.test(d1.suggestedFilename()) && backup.kind === 'ingenium-reading-key' && backup.enc && backup.enc.iter === 600000 && !JSON.stringify(backup).includes('"d"'),
    'made: its backup saved, sealed under its password (600,000 rounds), with no private part in the clear', { name: d1.suggestedFilename(), kind: backup.kind });
  await sleep(600); const w1 = await room();
  ok(w1 && w1.chip === 'Not yet' && w1.text.includes(backup.rid) && /This release does not carry its public half yet/.test(w1.text) && w1.keys.join() === 'pub,backup',
    'the room names the key and says this release does not carry its public half yet, with Save its public half', w1);
  const dl2 = p.waitForEvent('download', { timeout: 30000 }); await p.click('#secCard [data-rk="pub"]'); const d2 = await dl2; const f2 = path.join(DIR, 'reading_keys.json'); await d2.saveAs(f2);
  const pub = JSON.parse(fs.readFileSync(f2, 'utf8'));
  const kid = await p.evaluate((j) => PermitCore.kidOf(j), pub.keys[0].jwk);
  ok(d2.suggestedFilename() === 'reading_keys.json' && pub.kind === 'ingenium-reading-public-key' && pub.keys.length === 1 && !('d' in pub.keys[0].jwk) && pub.keys[0].rid === backup.rid && kid === backup.rid,
    'Save its public half: reading_keys.json, the public half alone, numbered by its own fingerprint', { pub, kid });

  // 3. it opens with its password, and opens what is sealed to it; brought back from its backup
  const o3 = await p.evaluate(async ([PW, pubJwk]) => { const s = await IngReadable._sealed(); let wrong = '';
    try { await IngReadable._open(s, 'not the password'); wrong = 'opened'; } catch (e) { wrong = e.message; }
    const key = await IngReadable._open(s, PW);
    const eph = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, false, ['deriveBits']);
    const herPub = await crypto.subtle.importKey('jwk', pubJwk, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
    const a = new Uint8Array(await crypto.subtle.deriveBits({ name: 'ECDH', public: herPub }, eph.privateKey, 256));
    const bb = new Uint8Array(await crypto.subtle.deriveBits({ name: 'ECDH', public: eph.publicKey }, key, 256));
    return { wrong, same: a.length === 32 && a.every((x, i) => x === bb[i]), usages: key.usages, extractable: key.extractable }; }, [PW, pub.keys[0].jwk]);
  ok(o3.wrong === 'That password does not open your reading key.' && o3.same && o3.usages.join() === 'deriveBits' && o3.extractable === false,
    'it opens with its password (not with another), for opening alone, and opens what is sealed to its public half', o3);
  await p.evaluate(() => PermitCore._.put('readkey', null)); await p.evaluate(() => IngReadable._look()); await sleep(500); await room();
  const fc = p.waitForEvent('filechooser'); await p.click('#secCard [data-rk="bring"]'); const chooser = await fc; await chooser.setFiles(f1);
  await p.waitForSelector('#r357Ask #r357Pw', { timeout: 10000 }); await p.fill('#r357Pw', 'not the password'); await p.click('#r357Yes'); await sleep(2500);
  const s3 = await p.evaluate(() => (document.getElementById('r357Say') || {}).textContent);
  await p.fill('#r357Pw', PW); await p.click('#r357Yes'); await sleep(3000);
  const back = await p.evaluate(() => IngReadable._sealed().then((s) => s && s.rid)); const w3 = await room();
  ok(s3 === 'That password does not open your reading key.' && back === backup.rid && w3 && w3.text.includes(backup.rid), 'brought back from its backup, once its password opens it', { s3, back });

  // 4. build_page.py's guard on reading_keys.json (its own function, run alone)
  const guard = (file) => { const bp = fs.readFileSync(path.join(__dirname, '..', 'build', 'build_page.py'), 'utf8'); const fn = /def _reading_keys_js\(\):[\s\S]*?\n    return json\.dumps\(out, separators=\(",", ":"\)\)\n/.exec(bp)[0];
    const py = 'import os, sys, json\nHERE = ' + JSON.stringify(path.join(__dirname, '..', 'build')) + '\n' + fn + '\nprint(_reading_keys_js())\n';
    try { return execFileSync('python3', ['-c', py], { env: Object.assign({}, process.env, file ? { ING_READING_KEYS: file } : { ING_READING_KEYS: path.join(DIR, 'none.json') }), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim(); }
    catch (e) { return 'STOP ' + String(e.stderr || '').trim().split('\n').pop(); } };
  const bad1 = path.join(DIR, 'private.json'), bad2 = path.join(DIR, 'wrongnum.json'), bad3 = path.join(DIR, 'otherkind.json');
  fs.writeFileSync(bad1, JSON.stringify({ kind: pub.kind, v: 1, keys: [{ rid: pub.keys[0].rid, jwk: Object.assign({ d: 'secret' }, pub.keys[0].jwk) }] }));
  fs.writeFileSync(bad2, JSON.stringify({ kind: pub.kind, v: 1, keys: [{ rid: 'AAAAAAAAAAAAAAAAAAAAAA', jwk: pub.keys[0].jwk }] }));
  fs.writeFileSync(bad3, JSON.stringify({ kind: 'offline-project-owner-public-key', v: 1, keys: [] }));
  const g = { none: guard(null), good: guard(f2), priv: guard(bad1), num: guard(bad2), kind: guard(bad3) };
  let gj = null; try { gj = JSON.parse(g.good); } catch (e) {}
  ok(g.none === '[]' && gj && gj.length === 1 && gj[0].rid === backup.rid && !('d' in gj[0].jwk) && /never its private part/.test(g.priv) && /not that key's own fingerprint/.test(g.num) && /not the public half of a reading key/.test(g.kind),
    "build_page.py: no file, none carried; a good one carried; a private part, a wrong number or another kind of file stops the build", g);

  // 5. read it as written
  await p.evaluate(() => go('fabrica')); await sleep(1200);
  const id = await p.evaluate(async (t) => { const x = await IngRepo.fromFiles([{ path: 'index.html', data: t }], { name: 'Tide Clock', msg: 'Tide Clock, the first version' }); const id = x.id || (x.repo && x.repo.id);
    fbHubHost.FBS().sel = id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.setPanel('ship'); fbHubHost.paint(); return id; }, TIDE); await sleep(800);
  const pkg = await p.evaluate((id) => IngShip.onePage(id, { target: 'page', unsigned: true }).then((x) => ({ html: x.html, commit: x.commit, scr: !!x.scrambled })), id);
  const mk = /<meta name="ingenium-source" content="([^"]+)">/.exec(pkg.html || '');
  ok(pkg.scr && mk && mk[1] === 'tide-clock ' + pkg.commit && /^[0-9a-f]{40}$/.test(pkg.commit) && !/harbourOffsetMinutes/.test(pkg.html), 'a scrambled package names the version it came from: the app, in small letters, and its version id; nothing of its code', mk && mk[1]);
  const came = await p.evaluate(([html, id]) => IngAppSign.cameIn(new TextEncoder().encode(html), 'Tide Clock').then((x) => ({ go: x.go, aw: x.asWritten ? { id: x.asWritten.id, commit: x.asWritten.commit, plain: /harbourOffsetMinutes/.test(x.asWritten.html), mark: /ingenium-source/.test(x.asWritten.html) } : null, s2: x.s2 && x.s2.state })), [pkg.html, id]);
  ok(came.go && came.aw && came.aw.id === id && came.aw.commit === pkg.commit && came.aw.plain && !came.aw.mark && came.s2 === 'unsigned', 'as it comes in, the copy is matched to the version her Fabrica holds, and that version is read as written', came);
  fs.writeFileSync(path.join(DIR, 'Tide Clock.html'), pkg.html);
  const before = await p.evaluate(() => IngRepo.list().then((r) => r.length));
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /Bring one in/.test(x.textContent) && x.offsetParent); if (k) k.click(); }); await sleep(900);
  const fc2 = p.waitForEvent('filechooser', { timeout: 15000 });
  await p.evaluate(() => { const r = [...document.querySelectorAll('button,[role="button"],.f-opt,div')].filter((x) => /^⇩?\s*A page or a zip/.test((x.textContent || '').trim()) && x.offsetParent).pop(); if (r) r.click(); });
  let brought = 'no chooser'; try { const ch2 = await fc2; await ch2.setFiles(path.join(DIR, 'Tide Clock.html')); await sleep(4000); brought = 'chosen'; } catch (e) {}
  const after = await p.evaluate(() => IngRepo.list().then((r) => r.length)); const sel = await p.evaluate(() => fbHubHost.FBS().sel); const t5 = await toastText();
  ok(brought === 'chosen' && after === before && sel === id && /is a scrambled copy of Tide Clock, version [0-9a-f]{7}: your Fabrica holds it as written, and it is open here/.test(t5),
    "Fabrica's Bring one in: the app opens, as written, and nothing is brought in", { brought, before, after, sel, id, t5 });
  const lib = await p.evaluate(async (html) => { await libKeep('tide-clock-copy', { title: 'Tide Clock' }, new TextEncoder().encode(html), html); await new Promise((r) => setTimeout(r, 400));
    const t = await libText('tide-clock-copy'); return { plain: /harbourOffsetMinutes/.test(t || ''), mark: /ingenium-source/.test(t || ''), toast: (document.getElementById('ingToast') || {}).textContent || '' }; }, pkg.html);
  ok(lib.plain && !lib.mark && /Tide Clock is a scrambled copy of your own app: kept as written, from Fabrica \(version [0-9a-f]{7}\)/.test(lib.toast), "Lector's app library keeps it as written, and says so", lib);
  const other = pkg.html.replace(pkg.commit, pkg.commit.slice(0, 39) + (pkg.commit.slice(39) === '0' ? '1' : '0'));
  const no = await p.evaluate((html) => IngAppSign.cameIn(new TextEncoder().encode(html), 'Tide Clock').then((x) => ({ go: x.go, aw: !!x.asWritten })), other);
  ok(no.go && !no.aw, 'a copy naming a version not held here comes in as it is, scrambled (as in anyone else\'s Ingenium)', no);
  ok(errs.length === 0, 'no page errors', errs);
  console.log(P + ' passed, ' + F + ' failed'); await b.close(); srv.close(); process.exit(F ? 1 : 0);
})().catch((e) => { console.log('FAIL ' + (e && e.stack || e)); process.exit(1); });
