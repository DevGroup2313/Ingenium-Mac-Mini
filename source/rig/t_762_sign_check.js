// Ingenium 7.62 · your apps signed when shipped, part two (modules/r352.js, r349's words, r108's tiles, r112's Bring one in, r136 and
// r170's packages). The shells' own check of their page is tested apart: shells/common/test (32 cases, every shell's code) and
// .github/workflows/build-shells.yml (each device's app, opened). Her word on the preview (21 November 2026): "I approve of the
// previews, please commit and push it everywhere and continue working on my requests." Invented apps (Tide Clock, Harbour Notes) and
// a test owner key made by the page's own PermitCore (never hers).
//   1. checked as it comes in (IngAppSign.cameIn): a page as its maker signed it comes in without a question; a changed one opens r349's
//      card on Leave it out, and Leave it out, Escape and Keep it anyway each answer as they say
//   2. Lector's app library: Add your apps keeps a signed page marked Signed by you and an unsigned one Not signed; a changed copy is
//      asked about and left out, the copy kept before stays, and the note says it was left out as she chose (never "Could not be
//      read"); Lector's tiles carry the marks; a copy kept before 7.62 is checked once, quietly
//   3. Fabrica's Bring one in: a changed copy asked about and left out (no new app); the signed page comes in, and its toast says so
//   4. the packages: a signed page makes an iPhone, a Mac and a Windows package that say it was signed (shell.json's signature,
//      shell.txt's signature_kid and signature_app), naming its key and app; an unsigned page makes ones that do not
//   5. the words: the Security room's well and Package details say every app checks itself at every start; a release's shells name
//      the check (build_page.py refuses a release otherwise)
//     node rig/t_762_sign_check.js <page url> [master|gift]
const pw = require('/opt/node-tools/node_modules/playwright');
const [URL_, ED = 'master'] = process.argv.slice(2);
const MASTER = ED === 'master';
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? P++ : F++; }
const PW = 'Tide Clock owner key, for the tests only';
const PAGE = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="ingenium-build" content="">\n<title>Tide Clock</title>\n</head>\n<body>\n<h1>Tide Clock</h1>\n<p>Next high water at the harbour: 18:42.</p>\n</body>\n</html>\n';
const HARBOUR = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Harbour Notes</title>\n</head>\n<body>\n<h1>Harbour Notes</h1>\n<p>Moorings, tides and the day\'s notes.</p>\n</body>\n</html>\n';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
setTimeout(() => { console.log('FAIL the test did not finish in 12 minutes'); process.exit(3); }, 12 * 60 * 1000).unref();
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 1000 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.waitForTimeout(800);
  await p.evaluate(() => { const t = document.getElementById('tgTick'); if (t && !t.checked) t.click(); const k = [...document.querySelectorAll('.tg-veil button')].find((x) => x.offsetParent && !x.disabled); if (k) k.click(); });
  await p.waitForTimeout(600);
  const has = await p.evaluate(() => !!(window.IngAppSign && window.IngShip));
  if (!MASTER && !has) { ok(!(await p.evaluate(() => !!window.__r352)) && errs.length === 0, 'an edition without Fabrica: r352 stays out, and the page has no errors', errs);
    console.log(P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0); }
  ok(await p.evaluate(() => !!(window.IngAppSign && IngAppSign.cameIn && IngAppSign.brief && IngAppSign.libChip && window.__r352)), 'r352 is running: IngAppSign.cameIn, brief and libChip');

  // a test owner key, made by the page itself, carried as Ingenium carries hers
  await p.evaluate(async (PW) => { const s = await PermitCore.makeKey(PW); await PermitCore._.put('key', s); IngPermit.keys.push({ kid: s.kid, jwk: { kty: 'EC', crv: 'P-256', x: s.pub.x, y: s.pub.y } }); window.__kid = s.kid; }, PW);
  const kid = await p.evaluate(() => window.__kid);
  let S = PAGE;
  if (MASTER) {   // the page, signed as Ship signs it
    const id = await p.evaluate(async (t) => { const x = await IngRepo.fromFiles([{ path: 'index.html', data: t }], { name: 'Tide Clock', msg: 'Tide Clock, the first version' }); return x.id || (x.repo && x.repo.id); }, PAGE);
    const made = p.evaluate((id) => IngShip.onePage(id, { target: 'page' }).then((x) => x.html), id);
    await p.waitForSelector('#r349Ask #r349Pw', { timeout: 60000 }); await p.fill('#r349Pw', PW); await p.click('#r349Yes'); S = await made;
  } else {   // an edition signs nothing: a page signed by the owner's copy is made here with the same parts, as a test owner's
    S = await p.evaluate(async (args) => { const [html, PW] = args; const s = await PermitCore._.get('key'); const k = await PermitCore.openKey(s, PW);
      const r = await IngAppSign.signPage(html, { s: { key: k, kid: s.kid }, app: 'tide-clock', name: 'Tide Clock', version: '1.0' }); return r.html; }, [PAGE, PW]);
  }
  const C = S.replace('high water', 'low water');
  ok(/<meta name="ingenium-signature" content="[A-Za-z0-9_-]{40,}">/.test(S) && S !== C, 'the test page is signed with the test key', S.slice(0, 200));

  // 1. checked as it comes in
  const came = (html, name) => p.evaluate((a) => IngAppSign.cameIn(new TextEncoder().encode(a[0]), a[1]).then((x) => ({ go: x.go, state: x.s.state, kid: x.s.kid, card: !!document.getElementById('r349Ask') })), [html, name]);
  let r = await came(S, 'Tide Clock');
  ok(r.go === true && r.state === 'signed' && r.kid === kid && !r.card, 'a page as its maker signed it comes in without a question, Signed', r);
  r = await came(HARBOUR, 'Harbour Notes');
  ok(r.go === true && r.state === 'unsigned' && !r.card, 'an unsigned page comes in without a question, Not signed', r);
  let pending = came(C, 'Tide Clock'); await p.waitForSelector('#r349Ask #r352Leave', { timeout: 30000 }); await sleep(300);
  const card = await p.evaluate(() => ({ focus: document.activeElement && document.activeElement.id, role: document.getElementById('r349Ask').getAttribute('role'), eye: document.querySelector('#r349Ask .eye').textContent,
    h: document.getElementById('r349AskH').textContent, chip: document.querySelector('#r349Ask .r349-state').textContent, why: document.getElementById('r352Why').textContent,
    keys: [...document.querySelectorAll('#r349Ask .sa-keys button')].map((x) => x.textContent) }));
  ok(card.focus === 'r352Leave' && card.role === 'alertdialog' && card.eye === 'Checked as it comes in', 'a changed copy: r349\'s own card, opened on Leave it out', card);
  ok((MASTER ? /^Tide Clock is not as you signed it$/ : /^Tide Clock is not as its maker signed it$/).test(card.h) && card.chip === 'Changed' && /^After (you|its maker) signed it on \d+ \w+ \d{4}: the page changed\.$/.test(card.why)
    && card.keys.join('|') === 'Keep it anyway|Leave it out', 'its words: what changed, and when it was signed; Keep it anyway and Leave it out', card);
  await p.click('#r352Leave'); r = await pending;
  ok(r.go === false && r.state === 'changed' && !r.card, 'Leave it out: it does not come in', r);
  pending = came(C, 'Tide Clock'); await p.waitForSelector('#r349Ask #r352Leave', { timeout: 30000 }); await p.waitForFunction(() => document.activeElement && document.activeElement.id === 'r352Leave', null, { timeout: 5000 }); await p.keyboard.press('Escape'); r = await pending;
  ok(r.go === false && !r.card, 'Escape: left out too', r);
  pending = came(C, 'Tide Clock'); await p.waitForSelector('#r349Ask #r352Keep', { timeout: 30000 }); await p.click('#r352Keep'); r = await pending;
  ok(r.go === true && r.state === 'changed' && !r.card, 'Keep it anyway: it comes in, marked Changed', r);

  // 2. Lector's app library
  await p.evaluate(() => { try { go('lector'); } catch (e) {} }); await sleep(1500);
  const add = (files) => p.evaluate(async (files) => { const list = files.map(([n, t]) => new File([new TextEncoder().encode(t)], n, { type: 'text/html' })); await libAddFiles(list);
    return (window.LIB && LIB.note) || ''; }, files);
  const lib = () => p.evaluate(() => { const A = libState().apps, o = {}; Object.keys(A).forEach((k) => { if (A[k] && A[k].ref) o[A[k].title || k] = { key: k, sig: A[k].sig ? A[k].sig.state : null, sha: A[k].sha256 }; }); return o; });
  let note = await add([['Tide Clock.html', S], ['Harbour Notes.html', HARBOUR]]);
  let L = await lib();
  ok(L['Tide Clock'] && L['Tide Clock'].sig === 'signed' && L['Harbour Notes'] && L['Harbour Notes'].sig === 'unsigned', 'Add your apps: kept and marked, Signed and Not signed', { L, note });
  const keptSha = L['Tide Clock'] && L['Tide Clock'].sha;
  pending = add([['Tide Clock, changed.html', C]]); await p.waitForSelector('#r349Ask #r352Leave', { timeout: 30000 }); await p.click('#r352Leave'); note = await pending; await sleep(800);
  L = await lib();
  ok(L['Tide Clock'] && L['Tide Clock'].sha === keptSha && L['Tide Clock'].sig === 'signed', 'the changed copy, left out: the copy kept before stays as it was', L['Tide Clock']);
  ok(/Left out, as you chose: Tide Clock \(not as (you|its maker) signed it\)\./.test(note) && !/Could not be read/.test(note), 'the note says it was left out as she chose, never that it could not be read', note);
  if (MASTER) {
    await p.evaluate(() => { try { IngLector.render(); } catch (e) {} }); await sleep(900);
    const tiles = await p.evaluate(() => { const o = {}; document.querySelectorAll('#l7Bf .l-app').forEach((t) => { const n = (t.querySelector('.nm') || {}).textContent, s = t.querySelector('.r352-sig'); o[n] = s ? s.textContent.trim() : null; }); return o; });
    ok(tiles['Tide Clock'] === 'Signed by you' && tiles['Harbour Notes'] === 'Not signed', 'Lector\'s tiles: Signed by you, Not signed', tiles);
    const st = await p.evaluate(() => { const s = document.querySelector('#l7Bf .l-app .r352-sig'); if (!s) return null; const c = getComputedStyle(s); return { shadow: c.boxShadow, anim: c.animationName, trans: c.transform }; });
    ok(st && st.shadow && st.shadow !== 'none' && st.trans === 'none', 'the mark is raised and still (never moves)', st);
  }
  // a copy kept before 7.62 (no mark): checked once, quietly
  await p.evaluate((k) => { delete libState().apps[k].sig; saveState(); }, L['Harbour Notes'].key);
  await p.evaluate(() => libAddFiles([])); await sleep(2500);
  L = await lib();
  ok(L['Harbour Notes'].sig === 'unsigned' && !(await p.evaluate(() => !!document.getElementById('r349Ask'))), 'a copy kept before 7.62 is checked once, quietly, and marked', L['Harbour Notes']);

  // 3. Fabrica's Bring one in
  if (MASTER) {
    await p.evaluate(() => { go('fabrica'); try { fbHubHost.S.home = true; fbHubHost.paint(); } catch (e) {} }); await sleep(1500);
    const repos = () => p.evaluate(() => fbHubHost.C.repos.length);
    const bring = async (name, html) => { const ch = p.waitForEvent('filechooser', { timeout: 30000 });
      await p.evaluate(() => { const k = [...document.querySelectorAll('#fb button')].find((x) => x.textContent.trim() === 'Bring one in' && x.offsetParent); k.click(); }); await sleep(600);
      await p.evaluate(() => { const o = [...document.querySelectorAll('#fb .f-opt')].find((x) => /A page or a zip/.test(x.textContent)); o.click(); });
      const fc = await ch; await fc.setFiles({ name, mimeType: 'text/html', buffer: Buffer.from(html, 'utf8') }); };
    const n0 = await repos();
    await bring('Tide Clock, changed.html', C); await p.waitForSelector('#r349Ask #r352Leave', { timeout: 30000 }); await p.click('#r352Leave'); await sleep(1200);
    let t = await p.evaluate(() => { const x = document.querySelector('#fb .f-toast'); return x ? x.textContent : ''; });
    ok((await repos()) === n0 && /^Left out, as you chose: Tide Clock, changed is not as it was signed\.$/.test(t), 'Bring one in, a changed copy: asked about, left out, and no new app', { t, n0 });
    await bring('Tide Clock.html', S); await p.waitForFunction((n) => fbHubHost.C.repos.length > n, n0, { timeout: 30000 }).catch(() => {}); await sleep(800);
    t = await p.evaluate(() => { const x = document.querySelector('#fb .f-toast'); return x ? x.textContent : ''; });
    ok((await repos()) === n0 + 1 && /^Tide Clock\.html is here, signed by you and as it was signed\.$/.test(t), 'Bring one in, the signed page: it comes in, and its toast says so', { t });
  }

  // 4. the packages say whether their page was signed
  const pkg = await p.evaluate(async (args) => { const [S, U] = args, TD = new TextDecoder(), out = {};
    const png = (n) => { const c = document.createElement('canvas'); c.width = c.height = n; const g = c.getContext('2d'); g.fillStyle = '#6a3fb5'; g.fillRect(0, 0, n, n); return new Uint8Array(atob(c.toDataURL('image/png').split(',')[1]).split('').map((ch) => ch.charCodeAt(0))); };
    out.markSigned = IngApk.core.signMark(S); out.markUnsigned = IngApk.core.signMark(U);
    const entries = (u8) => { const z = IngApk.core.zipRead(u8); return z; };
    const read = async (list, re) => { const e = list.filter((x) => re.test(x.name))[0]; return e ? TD.decode(await e.read()) : null; };
    for (const [k, h] of [['signed', S], ['unsigned', U]]) {
      try { const icons = {}; IngIpa.icons.forEach((x) => { icons[x[1]] = png(x[1]); });
        const r = await IngIpa.make({ html: h, page: 'index.html', title: 'Tide Clock', id: 'com.example.tideclock', versionName: '1.0', icons });
        out['ipa_' + k] = JSON.parse(await read(entries(r.bytes || r), /\/www\/shell\.json$/)); } catch (e) { out['ipa_' + k] = 'error: ' + e.message; }
      try { const icons = {}; (IngMac.sizes || []).forEach((z) => { icons[z] = png(z); });
        const r = await IngMac.make({ html: h, page: 'index.html', title: 'Tide Clock', id: 'com.example.tideclock', versionName: '1.0', build: '1', icons });
        out['mac_' + k] = JSON.parse(await read(entries(r.bytes), /\/Resources\/www\/shell\.json$/)); } catch (e) { out['mac_' + k] = 'error: ' + e.message; }
      try { const icons = {}; (IngWin.sizes || []).forEach((z) => { icons[z] = png(z); });
        const r = await IngWin.make({ html: h, page: 'index.html', title: 'Tide Clock', id: 'com.example.tideclock', versionName: '1.0', icons });
        /* the installer is the program with the app's files after its code: [zip][its length, 8 bytes][INGWWW01] */
        let exe = r.bytes; if (exe[0] === 0x50 && exe[1] === 0x4b) exe = await entries(exe).filter((x) => /\.exe$/i.test(x.name))[0].read();
        const n = exe.length, dv = new DataView(exe.buffer, exe.byteOffset + n - 16, 8), len = dv.getUint32(0, true) + dv.getUint32(4, true) * 4294967296;
        out['win_' + k] = TD.decode(exe.subarray(n - 8)) === 'INGWWW01' ? await read(entries(exe.subarray(n - 16 - len, n - 16)), /(^|\/)shell\.txt$/) : 'no files after the program'; } catch (e) { out['win_' + k] = 'error: ' + e.message; }
    }
    return out; }, [S, HARBOUR]);
  const want = { kid, app: MASTER ? '' : 'tide-clock' };
  ok(pkg.markSigned && pkg.markSigned.kid === kid && typeof pkg.markSigned.app === 'string' && pkg.markUnsigned === null, 'signMark: a signed page names its key and app; an unsigned page, nothing', { m: pkg.markSigned, u: pkg.markUnsigned, want });
  ok(pkg.ipa_signed && pkg.ipa_signed.signature && pkg.ipa_signed.signature.kid === kid && pkg.ipa_unsigned && !pkg.ipa_unsigned.signature, 'the iPhone package: shell.json says its page was signed, and only then', { s: pkg.ipa_signed, u: pkg.ipa_unsigned });
  ok(pkg.mac_signed && pkg.mac_signed.signature && pkg.mac_signed.signature.kid === kid && pkg.mac_unsigned && !pkg.mac_unsigned.signature, 'the Mac package: shell.json says its page was signed, and only then', { s: pkg.mac_signed, u: pkg.mac_unsigned });
  ok(typeof pkg.win_signed === 'string' && pkg.win_signed.indexOf('signature_kid=' + kid + '\n') >= 0 && /\nsignature_app=/.test(pkg.win_signed) && typeof pkg.win_unsigned === 'string' && pkg.win_unsigned.indexOf('signature_') < 0,
    'the Windows package: shell.txt says its page was signed, and only then', { s: pkg.win_signed, u: pkg.win_unsigned });

  // 5. the words
  if (MASTER) {
    await p.evaluate(() => { go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('code'); }); await sleep(3000);
    await p.waitForFunction(() => IngAppSign.state() === 'on', null, { timeout: 30000, polling: 1000 }).catch(() => {});
    await p.evaluate(() => IngSecurity.view('code')); await sleep(1500);
    const well = await p.evaluate(() => { const w = [...document.querySelectorAll('#secCard .sc-well')].find((x) => /Signed with your key/.test(x.textContent)); return w ? w.textContent.replace(/\s+/g, ' ') : ''; });
    ok(/every app it makes checks that signature each time it starts: on a Mac, on Windows, on a Fire tablet or Android, on an iPhone or iPad, and on the web\./.test(well)
      && /an app brought into your library is checked as it comes in/.test(well) && /Not yet: an app built from its build kit/.test(well) && !/Not yet: the Mac, Windows/.test(well), 'the Security room: every app checks itself at every start; what is not yet, said', well);
    const row = await p.evaluate(() => { const box = document.createElement('div'); IngAppSign.packageRow(box, {}, {}); return box.textContent; });
    ok(/every app made from it checks the signature each time it starts: a changed copy refuses to open and says which file/.test(row), 'Package details says the same', row);
  }
  // the shells this page carries name the check (the Mac's and the iPhone's are compressed in their zips: build_page.py reads them)
  const marks = await p.evaluate(() => { const o = {}; for (const id of ['ing-android-shell', 'ing-win-shell']) { const e = document.getElementById(id); o[id] = e ? atob(e.textContent.trim()).indexOf('ING-SHELL-CHECK-1 ') >= 0 : null; } return o; });
  ok(marks['ing-android-shell'] === true && marks['ing-win-shell'] === true, 'the Android and Windows shells this page carries were built with the check', marks);
  ok(errs.length === 0, 'no page errors', errs);
  console.log(P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
