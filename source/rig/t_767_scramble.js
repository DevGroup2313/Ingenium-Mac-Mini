// Ingenium 7.67 · your apps' code scrambled (modules/r356.js; its hooks in r349, r112, r114, r178, r316 and r318; Terser in build/terser).
// Invented apps (Tide Clock, Harbour Desk and the notes it carries, Name Keeper, Rough Draft, a page that says it is Ingenium) and a test
// owner key made by the page's own PermitCore. With --apps, the apps the page carries built in (build/apps/builtin) are scrambled in the
// page and each is opened beside its scrambled copy.
//   1. the scrambler rides with the module; Package details: Scrambled code, on until she turns it off; the Security room's state and words
//   2. a package (unsigned, no owner key here): each script shrunk, the names inside it scrambled, the names the page shares kept, licence
//      and marker comments kept, quotes kept, data blocks as they were; the page shows the same as the one she wrote; Run is not scrambled
//   3. signed: the signature is over the scrambled page; with the door of an app for its owner alone, the door is as r354 wrote it
//   4. the pages an app carries packed inside (base64, and gzipped base64) scrambled and packed again as they were
//   5. a copy that shows an error hers does not: made as written, and said; a script the scrambler cannot read: left as written, and said
//   6. turned off for an app: as written; a page that is Ingenium itself: never scrambled; the Ship card's chip and line
//     node rig/t_767_scramble.js <ingenium page file> [--apps <builtin folder>] [--cd]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const http = require('http'); const os = require('os'); const zlib = require('zlib');
const args = process.argv.slice(2), PAGE = args[0], AI = args.indexOf('--apps'), APPS = AI >= 0 ? args[AI + 1] : null, WITH_CD = args.includes('--cd');
if (!PAGE) { console.log('usage: node rig/t_767_scramble.js <ingenium page file> [--apps <builtin folder>] [--cd]'); process.exit(2); }
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 900))); c ? P++ : F++; }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
setTimeout(() => { console.log('FAIL the test did not finish in 40 minutes'); process.exit(3); }, 40 * 60 * 1000).unref();
const PW = 'Tide Clock owner key, for the tests only';
const TIDE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="ingenium-build" content="">
<title>Tide Clock</title>
</head>
<body>
<h1>Tide Clock</h1>
<p id="next">…</p>
<button id="b" onclick="refreshTide()">Refresh</button>
<script>
/* Tide Clock: the harbour's next high water (an invented app for the tests). Copyright (c) 2026 Ada Example */
window.CD_BUILD={date:"2026-11-22",pass:"412"};
// the next high water, from the last one and the harbour's own offset
function refreshTide(){var harbourOffsetMinutes=17,lunarHalfDay=745,lastHighWater=new Date(2026,10,22,6,25);
  var nextHighWater=new Date(lastHighWater.getTime()+(lunarHalfDay+harbourOffsetMinutes)*60000);
  document.getElementById('next').textContent='Next high water at the harbour: '+formatClock(nextHighWater);return nextHighWater;}
function formatClock(when){var hoursPart=('0'+when.getHours()).slice(-2),minutesPart=('0'+when.getMinutes()).slice(-2);return hoursPart+':'+minutesPart;}
/*TIDE_MARKER*/
refreshTide();
</script>
<script type="module">
const tideTableEntries=[["06:25","18:42"],["07:10"]];
function countTideEntries(listOfEntries){let runningTotal=0;for(const oneEntry of listOfEntries)runningTotal+=oneEntry.length;return runningTotal;}
document.body.setAttribute('data-entries',String(countTideEntries(tideTableEntries)));
</script>
<script type="application/json" id="tide-data">{"harbour":"Saltmere","keepThisName":"harbourOffsetMinutes"}</script>
</body>
</html>
`;
const NOTES = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Harbour Notes</title></head>
<body><p id="n"></p>
<script>function showNotes(){var noteCounterValue=3,noteWordForCount=' notes';document.getElementById('n').textContent=noteCounterValue+noteWordForCount;}showNotes();</script>
</body></html>
`;
const b64 = (s) => Buffer.from(s, 'utf8').toString('base64');
const DESK = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Harbour Desk</title></head>
<body><h1>Harbour Desk</h1>
<script type="text/plain" id="hd-notes">${b64(NOTES)}</script>
<script type="cd/b64" id="hd-notes-gz">${zlib.gzipSync(Buffer.from(NOTES, 'utf8'), { level: 9 }).toString('base64')}</script>
<script type="text/plain" id="hd-words">${b64('Saltmere harbour, its tides and its notes. '.repeat(40))}</script>
<script>function openNotes(){var packedNotesText=atob(document.getElementById('hd-notes').textContent.trim());return packedNotesText.length;}document.title='Harbour Desk '+(openNotes()>0?'ready':'empty');</script>
</body>
</html>
`;
const KEEPER = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Name Keeper</title></head>
<body><p>Name Keeper</p>
<script>(function(){function secretHelperName(){}if(secretHelperName.name!=="secretHelperName")throw new Error("Name Keeper needs its own names");document.title="Name Keeper ok";})();</script>
</body></html>
`;
const ROUGH = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Rough Draft</title></head>
<body><p>Rough Draft</p>
<script>function roughTitle(){var draftWordForTitle='Rough Draft';document.title=draftWordForTitle;}roughTitle();</script>
<script>var = broken;</script>
</body></html>
`;
const SELF = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Not quite Ingenium</title></head>
<body><script>var ING_EDITION="master";window.__ingParts={};function localSelf(){var keepThisLocalName=1;return keepThisLocalName;}localSelf();</script></body></html>
`;
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), 't765-'));
fs.symlinkSync(path.resolve(PAGE), path.join(DIR, 'ingenium.html'));
const serve = (port) => new Promise((res) => { const s = http.createServer((q, r) => { const f = path.join(DIR, decodeURIComponent(q.url.split('?')[0]));
  if (!f.startsWith(DIR)) { r.writeHead(403); r.end(); return; }
  if (q.method === 'PUT') { const out = fs.createWriteStream(f); q.pipe(out); out.on('finish', () => { r.writeHead(200); r.end('kept'); }); return; }
  if (!fs.existsSync(f)) { r.writeHead(404); r.end(); return; }
  r.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }); fs.createReadStream(f).pipe(r); });
  s.listen(port, '127.0.0.1', () => res(s)); });
const firstScript = (html, n) => { const re = /<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi; let m, i = 0; while ((m = re.exec(html))) { if (i++ === n) return m[2]; } return ''; };
const blockOf = (html, id) => { const m = new RegExp('<script[^>]*id="' + id + '"[^>]*>([\\s\\S]*?)</script>').exec(html); return m ? m[1] : null; };
(async () => {
  const srv = await serve(8765); const BASE = 'http://127.0.0.1:8765/';
  const b = await pw.chromium.launch({ args: ['--js-flags=--max-old-space-size=8192'] }); const ctx = await b.newContext({ viewport: { width: 1360, height: 1000 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  await p.goto(BASE + 'ingenium.html', { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(800); await p.evaluate(() => { const t = document.getElementById('tgTick'); if (t && !t.checked) t.click(); const k = [...document.querySelectorAll('.tg-veil button')].find((x) => x.offsetParent && !x.disabled); if (k) k.click(); });
  const toastText = () => p.evaluate(() => [...document.querySelectorAll('#ingToast,.ing-toast,.toast')].map((e) => e.textContent).join(' | '));

  // 1. the scrambler, Package details and the room
  const api = await p.evaluate(() => ({ api: !!(window.IngScramble && IngScramble.onePage && IngScramble.packageRow && IngScramble.well && IngScramble.page), lib: !!document.getElementById('ing-terser'),
    bytes: +(document.getElementById('ing-terser') || { getAttribute: () => 0 }).getAttribute('data-bytes'), ed: ING_EDITION }));
  if (api.ed !== 'master' && api.ed !== 'full') {   // an edition without Fabrica: no scrambler carried, nothing scrambled, and the room says Off without naming it
    const r = await p.evaluate(() => { const box = document.createElement('div'); const well = window.IngScramble ? IngScramble.well((s) => '[' + s + ']') : '';
      return { row: window.IngScramble ? IngScramble.packageRow(box, {}, {}) : 'none', state: window.IngScramble ? IngScramble.state() : 'none', well, wanted: window.IngScramble ? IngScramble.wanted('x') : 'none',
        item: (IngSecurity.items().filter((x) => x.t === "Your apps' code scrambled")[0] || {}).s }; });
    ok(!api.lib && r.row === null && r.state === 'off' && r.item === 'off' && r.wanted === false, api.ed + ' edition: no scrambler carried, no switch, nothing scrambled, and the room says Off', r);
    ok(/\[off\]/.test(r.well) && /Off in this copy: what you make here is shipped as you wrote it\./.test(r.well) && !/Fabrica/.test(r.well), "its words say why, and name nothing this edition does not have", r.well);
    ok(errs.length === 0, 'no page errors', errs); console.log(P + ' passed, ' + F + ' failed'); await b.close(); srv.close(); process.exit(F ? 1 : 0); }
  ok(api.api && api.lib && api.bytes === 1104314 && api.ed === 'master', 'r356 runs in the master edition, and Terser 5.51.2 rides beside it (1,104,314 bytes unpacked)', api);
  await p.evaluate(() => go('fabrica')); await sleep(1200);
  const mk = (html, name) => p.evaluate(async (a) => { const x = await IngRepo.fromFiles([{ path: 'index.html', data: a.html }], { name: a.name, msg: a.name + ', the first version' }); return x.id || (x.repo && x.repo.id); }, { html, name });
  const tide = await mk(TIDE, 'Tide Clock');
  await p.evaluate(async (id) => { fbHubHost.FBS().sel = id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.setPanel('ship'); fbHubHost.paint(); }, tide); await sleep(1200);
  const openDetails = async () => { await p.evaluate(() => { const k = [...document.querySelectorAll('#fbPkg button')].find((x) => x.textContent.trim() === 'Package details'); k.click(); }); await sleep(800); };
  await openDetails();
  const rows = await p.evaluate(() => [...document.querySelectorAll('.r349-row')].map((r) => ({ t: r.querySelector('b').textContent, on: r.getAttribute('aria-checked'), small: r.querySelector('small').textContent })));
  ok(rows.length === 3 && rows[2].t === 'Scrambled code' && rows[2].on === 'true' && /shrunk and the names inside it scrambled/.test(rows[2].small) && /stay as you wrote them/.test(rows[2].small),
    'Package details: Scrambled code, on for every app until she turns it off, under the two rows of 7.60 and 7.63', rows.map((r) => r.t + ':' + r.on));
  await p.evaluate(() => { [...document.querySelectorAll('.r349-row')].pop().click(); [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Keep these' && x.offsetParent).click(); }); await sleep(600);
  const offKept = await p.evaluate((id) => ({ pref: fbHubHost.FBS().ship[id].scramble, wanted: IngScramble.wanted(id), line: (document.querySelector('#fbPkg .r356-line') || {}).textContent }), tide);
  ok(offKept.pref === false && offKept.wanted === false && offKept.line === 'its code as written', 'turned off and kept: the app is shipped as written, and the package line says so', offKept);
  await openDetails(); await p.evaluate(() => { [...document.querySelectorAll('.r349-row')].pop().click(); [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Keep these' && x.offsetParent).click(); }); await sleep(600);
  const onKept = await p.evaluate((id) => ({ pref: fbHubHost.FBS().ship[id].scramble, wanted: IngScramble.wanted(id), line: (document.querySelector('#fbPkg .r356-line') || {}).textContent }), tide);
  ok(onKept.pref === true && onKept.wanted === true && onKept.line === 'its code scrambled', 'turned on again: "its code scrambled" on the package line', onKept);
  const room = await p.evaluate(() => { const row = IngSecurity.items().filter((x) => x.t === "Your apps' code scrambled")[0]; return { s: row && row.s, well: IngScramble.well((s) => '[' + s + ']') }; });
  ok(room.s === 'on' && /\[on\]/.test(room.well) && /On: every package Fabrica makes carries its code shrunk/.test(room.well) && /never impossible/.test(room.well) && /Ingenium itself is never scrambled/.test(room.well),
    'the Security room: On, with what it does, what it keeps, and what it never touches', room);

  // 2. a package, with no owner key here (made unsigned): scrambled
  const one = await p.evaluate((id) => IngShip.onePage(id, { target: 'page' }).then((x) => ({ html: x.html, scr: x.scrambled || null, signed: !!x.signed }), (e) => ({ error: e.message })), tide);
  const s1 = firstScript(one.html || '', 0), s2 = firstScript(one.html || '', 1);
  ok(one.scr && one.scr.scripts === 2 && !one.signed, 'made unsigned (no owner key here), with both of its scripts scrambled', one.scr || one);
  ok(!/harbourOffsetMinutes|lunarHalfDay|lastHighWater|nextHighWater|hoursPart|minutesPart/.test(s1) && /function refreshTide\(/.test(s1) && /function formatClock\(/.test(s1) && /refreshTide\(\)/.test(s1),
    'the names inside each function scrambled; the names the page shares (refreshTide, which its markup calls, and formatClock) kept', s1.slice(0, 400));
  ok(/Copyright \(c\) 2026 Ada Example/.test(s1) && /\/\*TIDE_MARKER\*\//.test(s1) && !/the next high water, from the last one/.test(s1), 'a copyright note and a build marker kept; every other comment gone', s1.slice(0, 300));
  ok(/'Next high water at the harbour: '/.test(s1) && /window\.CD_BUILD=\{date:"2026-11-22",pass:"412"\}/.test(s1), 'strings keep their own quotes, so a version written in the code reads as before', s1.slice(0, 300));
  ok(!/tideTableEntries|countTideEntries|listOfEntries|runningTotal|oneEntry/.test(s2), 'a module script: its own names scrambled too', s2);
  ok(blockOf(one.html, 'tide-data') === '{"harbour":"Saltmere","keepThisName":"harbourOffsetMinutes"}', 'a data block stays exactly as it was');
  const ver = await p.evaluate((h) => IngShip._.numberOf(h, {}), one.html); ok(ver === '412', "its version reads as before (Fabrica's numberOf)", ver);
  fs.writeFileSync(path.join(DIR, 'tide.html'), TIDE); fs.writeFileSync(path.join(DIR, 'tide.scr.html'), one.html || '');
  const shows = async (name) => { const q = await ctx.newPage(); const e = []; q.on('pageerror', (x) => e.push(String(x).slice(0, 160))); await q.goto(BASE + name); await sleep(700);
    const r = await q.evaluate(() => ({ next: (document.getElementById('next') || {}).textContent || '', entries: document.body.getAttribute('data-entries'), title: document.title }));
    if (await q.$('#b')) { await q.click('#b'); await sleep(200); } r.errors = e; await q.close(); return r; };
  const a1 = await shows('tide.html'), a2 = await shows('tide.scr.html');
  ok(a2.next === a1.next && a1.next === 'Next high water at the harbour: 19:07' && a2.entries === '3' && a1.entries === '3' && a2.errors.length === 0 && a1.errors.length === 0,
    'the scrambled page shows what hers shows (19:07, three entries), its key still works, and no error', { a1, a2 });
  const run = await p.evaluate((id) => IngShip.onePage(id).then((x) => ({ plain: /harbourOffsetMinutes/.test(x.html), scr: !!x.scrambled })), tide);
  ok(run.plain && !run.scr, 'Run (no package): her code as written');
  const apart = await p.evaluate((id) => IngShip.onePage(id, { ref: 'HEAD', quiet: true }).then((x) => /harbourOffsetMinutes/.test(x.html), () => 'no ref'), tide);
  ok(apart === true || apart === 'no ref', 'a version opened apart: as written', apart);
  await p.evaluate(async () => { await fbHubHost.refresh(); fbHubHost.setPanel('ship'); fbHubHost.paint(); }); await sleep(900);
  const chips = await p.evaluate(() => { const t = document.querySelector('.f-tg[data-k="page"]'); return t ? [...t.querySelectorAll('.f-chip')].map((c) => c.textContent.trim()) : null; });
  ok(chips && chips.indexOf('Scrambled') >= 0, 'the Ship card: Scrambled on the one page made', chips);

  // 3. signed, with an owner key here; and with the door of an app for its owner alone
  await p.evaluate(async (PW) => { const s = await PermitCore.makeKey(PW); await PermitCore._.put('key', s); IngPermit.keys.push({ kid: s.kid, jwk: { kty: 'EC', crv: 'P-256', x: s.pub.x, y: s.pub.y } }); }, PW);
  const signedP = p.evaluate((id) => IngShip.onePage(id, { target: 'page' }).then((x) => ({ html: x.html, scr: x.scrambled || null, signed: !!x.signed }), (e) => ({ error: e.message })), tide);
  await p.waitForSelector('#r349Ask', { timeout: 20000 }); await p.fill('#r349Pw', PW); await p.click('#r349Yes');
  const sg = await signedP;
  const chk = await p.evaluate((h) => IngAppSign.checkPage(new TextEncoder().encode(h)).then((r) => r.state), sg.html || '');
  ok(sg.signed && sg.scr && sg.scr.scripts === 2 && !/harbourOffsetMinutes/.test(firstScript(sg.html, 0)) && chk === 'signed', 'signed: the signature is over the scrambled page, and the check reads it as signed', { signed: sg.signed, scr: sg.scr, chk });
  await p.evaluate((id) => { fbHubHost.FBS().ship[id].ownerOnly = true; }, tide);
  const door = await p.evaluate((id) => IngShip.onePage(id, { target: 'apk', quiet: true }).then((x) => ({ html: x.html, signed: !!x.signed, scr: x.scrambled || null }), (e) => ({ error: e.message })), tide);
  const doorSrc = await p.evaluate(() => document.getElementById('r354-door').textContent);
  const firstOne = firstScript(door.html || '', 0), appCode = firstScript(door.html || '', 1);
  ok(door.signed && door.scr && firstOne.indexOf(doorSrc.trim().slice(0, 200)) >= 0 && /function refreshTide\(/.test(appCode) && !/harbourOffsetMinutes/.test(appCode),
    "for its owner alone: the door, the page's first script, is as r354 wrote it; the app's own code after it is scrambled; the page signed", { signed: door.signed, scr: door.scr });
  await p.evaluate(async (id) => { fbHubHost.FBS().ship[id].ownerOnly = false; IngAppSign._drop(); await PermitCore._.put('key', null); }, tide);   // no owner key here again, for what follows

  // 4. the pages an app carries packed inside
  const desk = await mk(DESK, 'Harbour Desk');
  const dk = await p.evaluate((id) => IngShip.onePage(id, { target: 'page', unsigned: true }).then((x) => ({ html: x.html, scr: x.scrambled || null })), desk);
  const inPlain = Buffer.from(blockOf(dk.html, 'hd-notes') || '', 'base64').toString('utf8'), gzB = blockOf(dk.html, 'hd-notes-gz') || '';
  let inGz = ''; try { inGz = zlib.gunzipSync(Buffer.from(gzB, 'base64')).toString('utf8'); } catch (e) { inGz = 'unreadable: ' + e.message; }
  ok(dk.scr && dk.scr.pages === 2 && /^PCFkb2N0eXBl/.test(blockOf(dk.html, 'hd-notes')) && /^H4sI/.test(gzB), 'two pages packed inside, scrambled and packed again as they were (base64, and gzipped base64)', dk.scr);
  ok(/function showNotes\(/.test(inPlain) && !/noteCounterValue|noteWordForCount/.test(inPlain) && /function showNotes\(/.test(inGz) && !/noteCounterValue/.test(inGz) && /<title>Harbour Notes<\/title>/.test(inGz),
    'inside each: the page as it was, its scripts scrambled', inPlain.slice(0, 300));
  ok(blockOf(dk.html, 'hd-words') === blockOf(DESK, 'hd-words'), 'packed data that is not a page stays as it was');
  fs.writeFileSync(path.join(DIR, 'notes.scr.html'), inGz);
  const nq = await ctx.newPage(); const ne = []; nq.on('pageerror', (x) => ne.push(String(x))); await nq.goto(BASE + 'notes.scr.html'); await sleep(400);
  const nt = await nq.evaluate(() => document.getElementById('n').textContent); await nq.close();
  ok(nt === '3 notes' && ne.length === 0, 'a page carried inside, scrambled, still shows what it showed', { nt, ne });

  // 5. a copy that shows an error hers does not; a script the scrambler cannot read
  const keeper = await mk(KEEPER, 'Name Keeper');
  const kp = await p.evaluate((id) => IngShip.onePage(id, { target: 'page', unsigned: true }).then((x) => ({ html: x.html, scr: x.scrambled || null })), keeper); await sleep(300);
  const kt = await toastText();
  ok(!kp.scr && /secretHelperName/.test(kp.html) && /Made with Name Keeper's code as written: the scrambled copy showed an error the one you wrote does not/.test(kt),
    'a scrambled copy that shows an error hers does not: the package carries her code as written, and Ingenium says so', kt);
  const rough = await mk(ROUGH, 'Rough Draft');
  const rp = await p.evaluate((id) => IngShip.onePage(id, { target: 'page', unsigned: true }).then((x) => ({ html: x.html, scr: x.scrambled || null })), rough); await sleep(300);
  const rt = await toastText();
  ok(rp.scr && rp.scr.scripts === 1 && rp.scr.left === 1 && /var = broken;/.test(rp.html) && !/draftWordForTitle/.test(rp.html) && /1 of Rough Draft's scripts could not be read by the scrambler, and is left as written/.test(rt),
    'a script the scrambler cannot read: left as written, the rest scrambled, and Ingenium says how many', { scr: rp.scr, rt });

  // 6. Ingenium itself; the other ship marks
  const self = await mk(SELF, 'Not quite Ingenium');
  const sp = await p.evaluate((id) => IngShip.onePage(id, { target: 'page', unsigned: true }).then((x) => ({ plain: /keepThisLocalName/.test(x.html), scr: !!x.scrambled })), self);
  ok(sp.plain && !sp.scr, 'a page that is Ingenium itself is never scrambled', sp);
  const marks = await p.evaluate((id) => Promise.all(['release', 'send', 'web'].map((k) => IngShip.onePage(id, { ship: k, unsigned: true, quiet: true }).then((x) => k + ':' + !!x.scrambled)))
    .then((r) => r), tide);
  ok(marks.join(' ') === 'release:true send:true web:true', "a release's attachments, an app sent to her devices and the web app's page are scrambled too", marks);
  const web = await p.evaluate((id) => IngShip.webApp(id, { unsigned: true }).then((x) => { const z = IngRepo.core.unzip(x.bytes); const e = z.entries.filter((v) => /index\.html$/.test(v.name))[0];
    return IngRepo.core.unzipData(x.bytes, e).then((d) => new TextDecoder().decode(d)); }).then((h) => ({ plain: /harbourOffsetMinutes/.test(h.slice(0, h.indexOf('tide-data'))), fn: /function refreshTide\(/.test(h) }), (e) => ({ error: e.message })), tide);
  ok(web.fn && web.plain === false, "the web app: its page's code scrambled", web);

  // --apps: the apps the page carries, each beside its scrambled copy
  if (APPS) {
    const names = ['lakay', 'inkwell', 'forge'].concat(WITH_CD ? ['cd'] : []);
    for (const n of names) {
      const gz = path.join(APPS, n + '.html.gz'); if (!fs.existsSync(gz)) { ok(false, n + ': not found'); continue; }
      fs.writeFileSync(path.join(DIR, n + '.html'), zlib.gunzipSync(fs.readFileSync(gz)));
      const r = await p.evaluate(async (a) => { const t0 = Date.now(); const html = await (await fetch(a.base + a.n + '.html')).text(); const res = await IngScramble.page(html);
        await fetch(a.base + a.n + '.scr.html', { method: 'PUT', body: res.html }); return { scripts: res.scripts, pages: res.pages, left: res.left.length, leftWhy: res.left.slice(0, 2), before: res.before, after: res.after, ms: Date.now() - t0 }; }, { base: BASE, n });
      const look = async (file) => { const q = await ctx.newPage(); const e = []; q.on('pageerror', (x) => e.push(String(x).slice(0, 200))); await q.goto(BASE + file, { timeout: 600000 }); await sleep(n === 'cd' ? 15000 : 8000);
        const t = await q.evaluate(() => ({ title: document.title, text: (document.body && document.body.innerText || '').length })); await q.close(); return { errors: e, title: t.title, text: t.text }; };
      const o = await look(n + '.html'), s = await look(n + '.scr.html');
      ok(r.scripts > 0 && r.left === 0 && s.errors.length <= o.errors.length && s.title === o.title,
        n + ': ' + r.scripts + ' scripts and ' + r.pages + ' pages carried inside scrambled in ' + Math.round(r.ms / 1000) + ' s (code ' + Math.round(r.before / 1024) + ' KB to ' + Math.round(r.after / 1024) + ' KB); opened beside hers: no error hers does not show, the same title',
        { r, o: { errors: o.errors.slice(0, 3), title: o.title, text: o.text }, s: { errors: s.errors.slice(0, 3), title: s.title, text: s.text } });
    }
  }
  // the quiet windows the copies run in report their errors here too: Name Keeper's own (scrambled, on purpose) and Rough Draft's broken script
  const ours = errs.filter((e) => !/Name Keeper needs its own names|Unexpected token '='/.test(e));
  ok(ours.length === 0, "no page errors in Ingenium (beyond the two the test apps make on purpose in Fabrica's quiet windows)", errs);
  console.log(P + ' passed, ' + F + ' failed'); await b.close(); srv.close(); process.exit(F ? 1 : 0);
})().catch((e) => { console.log('FAIL ' + (e && e.stack || e)); process.exit(1); });
