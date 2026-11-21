// Ingenium 7.62 · Your apps signed when shipped, part two (modules/r352.js; r112's Bring one in, r108's card, r349's words).
// Approved on its ten pictures (previews/app_sign2): "I approved of the previews from the other session and this one, please commit and
// push it everywhere and continue working on my requests." Invented apps (Tide Clock, made by git; Harbour Notes, a page) and test owner
// keys made by the page's own PermitCore (never hers).
//   1. the Security room and Package details say that every app checks its signature at each start, and what is not yet
//   2. a page signed with the (test) owner key, as Ship makes it
//   3. IngAppSign.cameIn: signed (kept, no question), unsigned (kept, no question), changed (the card opens on Leave it out; Escape and
//      Leave it out keep nothing; Keep it anyway keeps it marked Changed), signed with a key no copy carries (Not the owner's)
//   4. Lector's app library: each copy kept with what its check found, and its mark on the tile; a changed copy left out says so in the
//      library's note (never as a page that could not be read); one kept anyway is marked Changed; a copy kept before 7.62 is checked again
//   5. Fabrica's Bring one in: a changed page is left out and nothing is made; a signed page comes in and says it was signed
//     node rig/t_762_app_sign2.js <master test page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [URL_, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
let P = 0, F = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? P++ : F++; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PW = 'Tide Clock owner key, for the test only', PW2 = 'a second key that no copy of Ingenium carries';
(async () => {
  // Tide Clock, made by git, as a bundle; Harbour Notes, a page with no signature
  const W = path.join(OUT, 'tide'); fs.mkdirSync(W, { recursive: true });
  const env = Object.assign({}, process.env, { GIT_CONFIG_NOSYSTEM: '1', GIT_AUTHOR_NAME: 'Ada Example', GIT_AUTHOR_EMAIL: 'ada@example.invalid', GIT_COMMITTER_NAME: 'Ada Example', GIT_COMMITTER_EMAIL: 'ada@example.invalid' });
  const git = (a) => cp.execFileSync('git', a, { cwd: W, encoding: 'utf8', env });
  fs.writeFileSync(path.join(W, 'index.html'), '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="ingenium-build" content="">\n<title>Tide Clock</title>\n</head>\n<body>\n<h1>Tide Clock</h1>\n<p>Next high water at 14:20.</p>\n</body>\n</html>\n');
  git(['init', '-q', '-b', 'main']); git(['add', '-A']); git(['commit', '-qm', 'Tide Clock, the first version']); git(['bundle', 'create', '-q', path.join(OUT, 'tide.bundle'), '--all']);
  const HARBOUR = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Harbour Notes</title>\n</head>\n<body>\n<h1>Harbour Notes</h1>\n<p>Moorings, tides and the day\'s notes.</p>\n</body>\n</html>\n';
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 1000 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('fabrica'); }); await sleep(2000);
  ok(await p.evaluate(() => ['p349', 'p352'].every((k) => window.__ingParts[k] === 'running') && ['cameIn', 'brief', 'libChip'].every((f) => typeof IngAppSign[f] === 'function')), 'r349 and r352 run; IngAppSign has cameIn, brief and libChip');
  await p.evaluate(async (PW) => { const s = await PermitCore.makeKey(PW); await PermitCore._.put('key', s); IngPermit.keys.push({ kid: s.kid, jwk: { kty: 'EC', crv: 'P-256', x: s.pub.x, y: s.pub.y } }); }, PW);

  // 1. the Security room and Package details
  await p.evaluate(() => { go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('code'); }); await sleep(2500);
  await p.waitForFunction(() => { try { return IngAppSign.state() === 'on'; } catch (e) { return false; } }, null, { timeout: 60000, polling: 1000 }).catch(() => {});
  await p.evaluate(() => IngSecurity.view('code')); await sleep(2000);
  const room = await p.evaluate(() => { const w = [...document.querySelectorAll('#secCard .sc-well')].find((x) => /Signed with your key/.test(x.textContent)); return w ? w.textContent.replace(/\s+/g, ' ') : ''; });
  ok(/every app it makes checks that signature each time it starts: on a Mac, on Windows, on a Fire tablet or Android, on an iPhone or iPad, and on the web/.test(room) && /an app brought into your library is checked as it comes in/.test(room), 'the Security room says every app checks the signature at each start, on every device, and that an app is checked as it comes in', room.slice(0, 400));
  ok(/Not yet: an app built from its build kit, on GitHub or in the terminal, carries your signature but does not check it at start/.test(room) && !/Not yet: the Mac, Windows, Android and iPhone apps check/.test(room), 'what is not yet is said as it is now: the build kits, and no longer the device apps', room.slice(-260));
  await p.evaluate(() => go('fabrica')); await sleep(1200);
  const b64 = fs.readFileSync(path.join(OUT, 'tide.bundle')).toString('base64');
  const id = await p.evaluate(async (b64) => { const bin = atob(b64), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    const r = await IngRepo.fromBundle(u8, { name: 'Tide Clock' }); fbHubHost.FBS().sel = r.id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.setPanel('ship'); fbHubHost.paint(); return r.id; }, b64);
  await sleep(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#fbPkg button')].find((x) => x.textContent.trim() === 'Package details'); if (k) k.click(); }); await sleep(900);
  const row = await p.evaluate(() => { const r = document.querySelector('.r349-row'); return r ? r.textContent.replace(/\s+/g, ' ') : ''; });
  ok(/every app made from it checks the signature each time it starts: a changed copy refuses to open and says which file/.test(row), 'Package details: the switch says that every app made from the package checks its signature at each start', row);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Keep these' && x.offsetParent); if (k) k.click(); }); await sleep(700);

  // 2. the page, signed with the test owner key, as Ship makes it
  const made = p.evaluate((id) => IngShip.onePage(id, { target: 'page' }).then((x) => x.html), id);
  await p.waitForSelector('#r349Ask #r349Pw', { timeout: 30000 }); await p.fill('#r349Pw', PW); await p.click('#r349Yes'); const SIGNED = await made;
  ok(/<meta name="ingenium-signature" content="[A-Za-z0-9_-]{40,}">/.test(SIGNED) && /Next high water/.test(SIGNED), 'Ship makes the page signed with the owner key (the signature inside its page)');
  const CHANGED = SIGNED.replace('Next high water', 'Next low water');

  // 3. IngAppSign.cameIn, case by case
  const cameIn = (html, name) => p.evaluate(({ html, name }) => IngAppSign.cameIn(new TextEncoder().encode(html), name).then((x) => ({ go: x.go, state: x.s && x.s.state, chip: IngAppSign.libChip(x.s), asked: !!document.getElementById('r349Ask') })), { html, name });
  let r = await cameIn(SIGNED, 'Tide Clock');
  ok(r.go === true && r.state === 'signed' && !r.asked && /Signed by you/.test(r.chip) && !/bad|none/.test(r.chip.split('>')[0]), 'signed and as it was signed: kept without a question, marked Signed by you', r);
  r = await cameIn(HARBOUR, 'Harbour Notes');
  ok(r.go === true && r.state === 'unsigned' && !r.asked && /class="r352-sig none"/.test(r.chip) && /Not signed/.test(r.chip), 'no signature: kept without a question, marked Not signed', r);
  // changed: the card opens on Leave it out; Escape leaves it out
  let pend = cameIn(CHANGED, 'Tide Clock');
  await p.waitForSelector('#r349Ask #r352Leave', { timeout: 30000 }); await sleep(300);
  const card = await p.evaluate(() => { const w = document.getElementById('r349Ask'); return { text: w.textContent.replace(/\s+/g, ' '), focus: document.activeElement && document.activeElement.id, role: w.getAttribute('role'), state: (w.querySelector('.r349-state') || {}).textContent }; });
  ok(card.focus === 'r352Leave' && card.role === 'alertdialog', 'a changed copy: the card asks, and opens on Leave it out', card);
  ok(/Tide Clock is not as you signed it/.test(card.text) && card.state === 'Changed' && /the page/.test(card.text) && /Left out, nothing of it is kept\. Kept anyway, it is marked Changed wherever it is listed\./.test(card.text), 'the card says what changed and what each answer does', card.text.slice(0, 300));
  await p.keyboard.press('Escape'); r = await pend;
  ok(r.go === false && !(await p.evaluate(() => !!document.getElementById('r349Ask'))), 'Escape leaves it out, and the card goes', r);
  pend = cameIn(CHANGED, 'Tide Clock'); await p.waitForSelector('#r349Ask #r352Keep', { timeout: 30000 }); await p.click('#r352Keep'); r = await pend;
  ok(r.go === true && r.state === 'changed' && /class="r352-sig bad"/.test(r.chip) && /Changed/.test(r.chip), 'Keep it anyway keeps it, marked Changed', r);
  // signed with a key no copy carries: Not the owner's
  const FOREIGN = await p.evaluate(async ({ html, PW2 }) => { const s2 = await PermitCore.makeKey(PW2); const k2 = await PermitCore.openKey(s2, PW2);
    return (await IngAppSign.signPage(html, { s: { key: k2, kid: s2.kid }, app: 'harbour-notes', name: 'Harbour Notes', version: '1' })).html; }, { html: HARBOUR, PW2 });
  pend = cameIn(FOREIGN, 'Harbour Notes'); await p.waitForSelector('#r349Ask #r352Leave', { timeout: 30000 });
  const card2 = await p.evaluate(() => document.getElementById('r349Ask').textContent.replace(/\s+/g, ' '));
  await p.click('#r352Leave'); r = await pend;
  ok(/Harbour Notes: its signature is not yours/.test(card2) && /Not the owner's/.test(card2) && r.go === false, 'signed with a key no copy carries: Not the owner\'s, and left out on Leave it out', { card2: card2.slice(0, 200), r });

  // 4. Lector's app library
  await p.evaluate(() => go('lector')); await sleep(2500);
  const add = (files) => p.evaluate(async (files) => { const list = files.map(([n, t]) => new File([new TextEncoder().encode(t)], n, { type: 'text/html' })); await libAddFiles(list); }, files);
  await add([['Tide Clock.html', SIGNED], ['Harbour Notes.html', HARBOUR]]); await sleep(2500);
  const lib = () => p.evaluate(() => { const apps = libState().apps, out = {}; Object.keys(apps).forEach((k) => { const m = apps[k]; out[(m.title || m.name || k)] = m.sig ? m.sig.state : null; }); return out; });
  const tiles = () => p.evaluate(() => { try { if (window.IngLector && IngLector.render) IngLector.render(); } catch (e) {} return [...document.querySelectorAll('#l7Bf .l-app, #libCard .lib-app')].map((x) => [((x.querySelector('.l-name,.lib-name,b,h4') || x).textContent || '').trim().slice(0, 40), ((x.querySelector('.r352-sig') || {}).className || ''), ((x.querySelector('.r352-sig') || {}).textContent || '').trim()]); });
  let L = await lib();
  const tideKey = Object.keys(L).find((k) => /^Tide Clock$/.test(k)), harbourKey = Object.keys(L).find((k) => /^Harbour Notes$/.test(k));
  ok(tideKey && L[tideKey] === 'signed' && harbourKey && L[harbourKey] === 'unsigned', 'Lector\'s library keeps each copy with what its check found', L);
  await sleep(800); let T = await tiles();
  const tt = T.find((x) => /Tide Clock/.test(x[0])), ht = T.find((x) => /Harbour Notes/.test(x[0]));
  ok(tt && /r352-sig/.test(tt[1]) && tt[2] === 'Signed by you' && ht && /none/.test(ht[1]) && ht[2] === 'Not signed', 'each tile carries its mark under its name: Signed by you, Not signed', T);
  // a changed copy, left out: the note says so, and nothing of it is kept
  const before = Object.keys(L).length;
  const adding = add([['Tide Clock, changed.html', CHANGED]]);
  await p.waitForSelector('#r349Ask #r352Leave', { timeout: 60000 }); await p.click('#r352Leave'); await adding; await sleep(1500);
  const note = await p.evaluate(() => ((document.getElementById('libNote') || {}).textContent || String((window.LIB && LIB.note) || '')).replace(/\s+/g, ' '));
  L = await lib();
  ok(/Left out, as you chose: Tide Clock \(not as you signed it\)\./.test(note) && !/Could not be read/.test(note) && Object.keys(L).length === before, 'a changed copy left out: the note names the app by its title, says it was left out as she chose (never that it could not be read), and nothing of it is kept', { note, apps: L });
  // a changed copy, kept anyway: marked Changed
  const adding2 = add([['Tide Clock, kept.html', CHANGED]]);
  await p.waitForSelector('#r349Ask #r352Keep', { timeout: 60000 }); await p.click('#r352Keep'); await adding2; await sleep(2000);
  // the library keeps one copy for each app: the copy kept anyway takes Tide Clock's place, and its one tile says Changed
  L = await lib(); T = await tiles(); const kt = T.find((x) => /Tide Clock/.test(x[0]));
  ok(L[tideKey] === 'changed' && Object.keys(L).length === before && kt && /bad/.test(kt[1]) && kt[2] === 'Changed', 'a changed copy kept anyway: it takes the app\'s place in the library, and its tile is marked Changed', { L, kt });
  // a copy kept before 7.62 (no mark yet): checked again, quietly
  await p.evaluate((k) => { const a = libState().apps; Object.keys(a).forEach((x) => { if ((a[x].title || a[x].name || x) === k) delete a[x].sig; }); saveState(); }, tideKey);
  await p.evaluate(() => libAddFiles([])); await sleep(4000);
  L = await lib();
  ok(L[tideKey] === 'changed', 'a copy kept before 7.62 (its mark taken away) is checked again, quietly, and keeps what was found (the copy kept anyway: Changed)', L);

  // 5. Fabrica's Bring one in
  await p.evaluate(() => go('fabrica')); await sleep(1500);
  const repos = () => p.evaluate(() => IngRepo.list().then((l) => l.length));
  const bringIn = async (name, html, answer) => {
    await p.evaluate(() => { document.querySelectorAll('#fb .f-toast').forEach((t) => t.remove()); fbHubHost.S.home = true; fbHubHost.paint(); }); await sleep(800);
    const opened = await p.evaluate(() => { const k = [...document.querySelectorAll('#page-fabrica button')].find((x) => /^Bring one in/.test(x.textContent.trim()) && x.offsetParent); if (k) { k.click(); return true; } return false; });
    if (!opened) return { opened };
    await sleep(700); const fp = path.join(OUT, name); fs.writeFileSync(fp, html);
    const [fc] = await Promise.all([p.waitForEvent('filechooser', { timeout: 15000 }), p.evaluate(() => { const o = [...document.querySelectorAll('button, [role="button"], .opt, li')].find((x) => /A page or a zip/.test(x.textContent) && x.offsetParent); if (o) o.click(); })]);
    await fc.setFiles(fp);
    if (answer) { await p.waitForSelector('#r349Ask #r352Leave', { timeout: 30000 }); await p.click(answer === 'leave' ? '#r352Leave' : '#r352Keep'); }
    const t0 = Date.now(); let toast = '';
    while (Date.now() - t0 < 20000) { toast = await p.evaluate(() => [...document.querySelectorAll('#fb .f-toast')].map((x) => x.textContent).join(' | ')); if (/is here|Left out/.test(toast) && !/Bringing /.test(toast)) break; await sleep(250); }
    return { opened, toast };
  };
  const n0 = await repos();
  let x = await bringIn('Tide Clock, changed.html', CHANGED, 'leave'); await sleep(1500); const n1 = await repos();
  ok(x.opened && /Left out, as you chose: Tide Clock, changed is not as it was signed\./.test(x.toast) && n1 === n0, 'Bring one in: a changed page is left out on Leave it out, says so, and nothing is made', { x, n0, n1 });
  x = await bringIn('Tide Clock, signed.html', SIGNED, null); await sleep(1500); const n2 = await repos();
  ok(x.opened && /Tide Clock, signed\.html is here, signed by you and as it was signed\./.test(x.toast) && n2 === n1 + 1, 'Bring one in: a signed page comes in and says it was signed by her, as it was signed', { x, n1, n2 });

  ok(errs.length === 0, 'no page errors', errs);
  console.log(P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})().catch((e) => { console.log('FAIL the test stopped: ' + (e && e.stack || e)); process.exit(1); });
