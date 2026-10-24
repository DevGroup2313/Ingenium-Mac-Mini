// INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
// The Forge 647 in Chromium: Fabrica makes the apps a device installs, here on the device (forge_647/forge_fabrica_647.py).
// The owner's words (20 October 2026): "ship ready made apps on my devices for all of my devices". Checks:
//   - the Forge carries the makers (R136, R170) and the four shells, and its Fabrica ran to its end;
//   - Test and ship offers seven ways: the APK, the IPA, the Mac app, the Windows app, the web app, one page and the Forge's
//     five install packages, each with its own Make and save key; Package details names the app's id and its key;
//   - the APK it saves: both signatures Android reads verify (v2 by apksigtool, v1 by the JDK's jarsigner), its manifest gives
//     the app's id, version, name and icon (androguard), and the key it is signed with was made by the Forge on this device;
//   - the IPA: the shell, the page in www/, the icons, the id and name in Info.plist, and "Made with the Forge's Fabrica";
//   - the Mac and Windows apps, read as macOS and Windows read them (rig/verify_desktop_app.py);
//   - the five install packages are still made;
//   - the signing key is kept in the Forge's own store (forge_keys), never Ingenium's; no page errors.
//   node t_647_ship.js <url of the Forge 647 page> <out folder> <apksigtool>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [URL_, OUT, APKSIG] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const RIG = path.join(__dirname, '..', '..', '..', 'rig'); const ICONS = path.join(__dirname, '..', '..', '..', 'shells', 'test', 'icons');
const PY = path.join(path.dirname(APKSIG), 'python3');
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + (typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 400) : '')); c ? pass++ : fail++; };
const run = (cmd, args) => { try { return cp.execFileSync(cmd, args, { stdio: 'pipe' }).toString(); } catch (e) { return String(e.stdout || '') + String(e.stderr || e.message); } };
const verifyDesk = (kind, f, title) => { try { return JSON.parse(cp.execFileSync('python3', [path.join(RIG, 'verify_desktop_app.py'), kind, f, '', title]).toString()); } catch (e) { try { return JSON.parse(String(e.stdout)); } catch (_) { return { faults: [String(e.message).slice(0, 200)] }; } } };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1600, height: 1000 }, acceptDownloads: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  const downloads = []; p.on('download', d => downloads.push(d));
  async function nextDownloads(fn, n = 1, timeout = 180000) { const n0 = downloads.length; await fn(); const t0 = Date.now(); while (downloads.length < n0 + n && Date.now() - t0 < timeout) await p.waitForTimeout(250);
    const out = []; for (const d of downloads.slice(n0, n0 + n)) { const f = path.join(OUT, d.suggestedFilename()); await d.saveAs(f); out.push(f); } return out; }
  try {
    await p.goto(URL_); await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 120000 }); await p.waitForTimeout(1200);
    await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await p.waitForTimeout(800);
    const has = await p.evaluate(() => ({ apk: !!(window.IngApk && document.getElementById('ing-android-shell')), ipa: !!(window.IngIpa && IngIpa.has()), mac: !!(window.IngMac && IngMac.has()), win: !!(window.IngWin && IngWin.has()),
      parts: ['p42', 'p43', 'p44', 'p45', 'p57'].map(k => (window.__ingParts || {})[k]) }));
    ok(has.apk && has.ipa && has.mac && has.win, 'the Forge carries the makers and the four shells: Android, iPhone and iPad, Mac, Windows', has);
    ok(has.parts.every(x => x === 'running'), 'the engines, the makers and Fabrica ran to their end', has.parts);

    // an app with an icon of its own, kept as a first version
    const icon = fs.readFileSync(path.join(ICONS, 'android-xxxhdpi.png')).toString('base64');
    await p.evaluate(async icon => {
      const page = '<!doctype html><html><head><meta charset="utf-8"><title>Tide Clock</title><link rel="icon" sizes="192x192" href="data:image/png;base64,' + icon + '"><meta name="ingenium-build" content="1.4"></head><body><h1>Tide Clock</h1><script>document.body.insertAdjacentHTML("beforeend","<p>ok</p>");</script></body></html>';
      const r = await IngRepo.create({ name: 'Tide Clock' }); await IngRepo.put(r.id, 'index.html', page); await IngRepo.commit(r.id, 'First version'); }, icon);
    await p.evaluate(() => FORGE.openRoom('fabrica')); await p.waitForTimeout(1800);
    await p.evaluate(() => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => /Tide Clock/.test(x.textContent)); if (t) t.click(); }); await p.waitForTimeout(1200);
    await p.evaluate(() => { const b = document.querySelector('.f-tabs button[data-p="ship"]'); if (b) b.click(); }); await p.waitForTimeout(800);
    const keyOf = 'e => [...(e.parentElement || e).querySelectorAll("button")].find(x => /^Make and save/.test(x.textContent))';
    const cards = await p.evaluate(kf => { const key = eval(kf); return [...document.querySelectorAll('#fbTargets .f-tg')].map(e => ({ k: e.getAttribute('data-k'), t: e.querySelector('b').textContent, off: e.classList.contains('off'), make: !!key(e) })); }, keyOf);
    ok(cards.map(c => c.k).join() === 'apk,ipa,mac,win,web,page,kits' && cards.every(c => !c.off && c.make), 'Test and ship offers seven ways, each ready with its own Make and save key: APK, IPA, Mac app, Windows app, web app, one page, the five install packages', cards);
    ok((cards.find(c => c.k === 'kits') || {}).t === 'Install packages (.zip)', 'the build kits are the Forge\'s five install packages', cards.find(c => c.k === 'kits'));
    const pkg = await p.evaluate(() => { const e = document.getElementById('fbPkg'); return { hidden: e.hidden, text: e.textContent, details: [...e.querySelectorAll('button')].some(x => x.textContent.trim() === 'Package details') }; });
    ok(!pkg.hidden && /com\.yannieforest\.tideclock/.test(pkg.text) && /signed with this device's key/.test(pkg.text) && pkg.details, 'Package details: the app\'s id, the key it is signed with, and the key to change them', pkg);
    await p.screenshot({ path: path.join(OUT, 'forge_ship_cards.png') });
    const viaCard = (k, n = 1) => nextDownloads(() => p.evaluate(([k, kf]) => { const e = document.querySelector('#fbTargets .f-tg[data-k="' + k + '"]'); eval(kf)(e).click(); }, [k, keyOf]), n);

    // the APK
    const [apk] = await viaCard('apk'); await p.waitForTimeout(1500);
    const v2 = apk ? run(APKSIG, ['verify', apk]) : '', v1 = apk ? run('jarsigner', ['-verify', '-strict', apk]) : '';
    ok(apk && /\.apk$/.test(apk) && /\bv2 verified/.test(v2) && /jar verified/.test(v1), 'the APK card saves an APK whose two signatures Android reads both verify (v2: apksigtool; v1: jarsigner)', (apk ? path.basename(apk) + ' ' + fs.statSync(apk).size + ' B · ' : 'nothing saved · ') + v2.trim().split('\n').pop() + ' · ' + (v1.match(/jar verified[^\n]*/) || [''])[0]);
    const man = apk ? run(PY, ['-c', 'from loguru import logger;logger.remove()\nfrom androguard.core.apk import APK\nimport sys\na=APK(sys.argv[1])\nprint(a.get_package(),a.get_androidversion_name(),a.get_app_name(),a.get_app_icon())', apk]).trim() : '';
    ok(/^com\.yannieforest\.tideclock 1\.4 Tide Clock res\/mipmap-xxxhdpi-v4\/ic_launcher\.png$/.test(man), 'its manifest: the app\'s id, its build number as the version, its name and its own icon', man);
    const cert = apk ? run('keytool', ['-printcert', '-jarfile', apk]) : '';
    ok(/Owner:[^\n]*CN="?The Forge, on this device"?/.test(cert) && /Owner:[^\n]*O=Yannie D\. Forest/.test(cert), 'it is signed with the key the Forge made on this device', (cert.match(/Owner:[^\n]*/) || [''])[0]);
    const sj = apk ? run('unzip', ['-p', apk, 'assets/shell.json']) : '';
    ok(/"made":"The Forge's Fabrica"/.test(sj), 'what it writes into the app names the Forge', sj.slice(0, 200));

    // the IPA
    const [ipa] = await viaCard('ipa'); await p.waitForTimeout(1500);
    const il = ipa ? run('unzip', ['-Z1', ipa]).trim().split('\n') : [];
    const plist = ipa ? run('unzip', ['-p', ipa, 'Payload/TideClock.app/Info.plist']) : '', isj = ipa ? run('unzip', ['-p', ipa, 'Payload/TideClock.app/www/shell.json']) : '';
    ok(ipa && il.includes('Payload/TideClock.app/Shell') && il.includes('Payload/TideClock.app/www/index.html') && il.includes('Payload/TideClock.app/AppIcon60x60@3x.png') && /<string>com\.yannieforest\.tideclock<\/string>/.test(plist) && /<string>Tide Clock<\/string>/.test(plist) && /The Forge's Fabrica/.test(isj),
      'the IPA card saves an IPA: the shell, the page in www/, its icons, its id and name in Info.plist, made by the Forge', ipa ? path.basename(ipa) + ' · ' + il.length + ' entries' : 'nothing saved');

    // the Mac and Windows apps
    const [fm] = await viaCard('mac'); await p.waitForTimeout(1500);
    const vm = fm ? verifyDesk('mac', fm, 'Tide Clock') : { faults: ['nothing saved'] };
    ok(fm && /^Tide-Clock-mac-.*\.zip$/.test(path.basename(fm)) && !vm.faults.length, 'the Mac app card saves the app, sealed as macOS reads it', { saved: fm && path.basename(fm), verify: vm });
    const howMac = fm ? run('unzip', ['-p', fm, 'How to open Tide Clock.txt']) : '';
    const [fw] = await viaCard('win'); await p.waitForTimeout(1500);
    const vw = fw ? verifyDesk('win', fw, 'Tide Clock') : { faults: ['nothing saved'] };
    ok(fw && /^Tide-Clock-windows-.*\.zip$/.test(path.basename(fw)) && !vw.faults.length, 'the Windows app card saves the app, as Windows reads it', { saved: fw && path.basename(fw), verify: vw });
    ok(/Made with the Forge's Fabrica/.test(howMac) && !/Ingenium/.test(howMac), 'the note on how to open it names the Forge', howMac.split('\n').slice(0, 3).join(' | '));

    // the five install packages, as before
    const kits = await viaCard('kits', 5);
    await p.waitForFunction(() => !!document.querySelector('#fbTargets .f-tg[data-k="kits"] .f-chip.ok'), null, { timeout: 30000 }).catch(() => {});
    ok(kits.length === 5 && kits.every(f => /\.zip$/.test(f)), 'the install packages card still saves the Forge\'s five', kits.map(f => path.basename(f)));
    const made = await p.evaluate(() => [...document.querySelectorAll('#fbTargets .f-tg')].map(e => [e.getAttribute('data-k'), !!e.querySelector('.f-chip.ok')]));
    ok(made.filter(m => ['apk', 'ipa', 'mac', 'win', 'kits'].includes(m[0])).every(m => m[1]), 'each card made says so, and keeps what it made under Releases', made);
    await p.screenshot({ path: path.join(OUT, 'forge_ship_made.png') });

    const dbs = await p.evaluate(async () => (indexedDB.databases ? (await indexedDB.databases()).map(d => d.name) : []));
    ok(dbs.includes('forge_keys') && !dbs.includes('ingenium_keys'), 'the signing key is kept in the Forge\'s own store, never Ingenium\'s', dbs);
    ok(!errs.length, 'no page errors', errs);
  } catch (e) { ok(false, 'the run crashed', e.message); }
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
