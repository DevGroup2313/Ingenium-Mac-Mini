// node rig/t_712_kits.js <out dir> <page url>
// Ingenium 7.12: every app but Ingenium is shipped from the family's packaging (modules/r299.js, made by
// build/kits/family_templates.py from The Forge's templates); modules/r178.js chooses it. Fabrica's audit of 14 November 2026
// found Ingenium's own engine in such kits (r178's generic kit renamed Ingenium's repositories). People and apps here are invented:
// the owner is "Ada Example", the apps "Tide Clock" and the like. Checks:
//   - each device's kit for an invented app (Fire tablet, iPhone, iPad, MacBook, Mac mini, Windows) comes from the family's
//     packaging, with the app's own name, file stem and id; no file of Ingenium's (no path naming it, none of its engine's files)
//     and no text naming Ingenium; no placeholder left; its owner and year in the licence and the build files
//   - its icons are drawn from its own picture: its initials on its own colour when its page names no icon, its page's icon when
//     it names one
//   - the Fire tablet kit: the app's own Java package (its id, or the package an earlier one of a family app kept), Gradle's own
//     wrapper (byte for byte, gradlew a program) and the terminal builds (the .command a program, the .bat with Windows line
//     endings, the PowerShell script with a byte order mark); the Windows kit: its terminal build with the pinned tools, the
//     installer's publisher; the Mac kit's terminal build a program
//   - an app's own templates still come first; Ingenium's own page keeps Ingenium's own projects
//   - the web kit, by the Build page and by Download as an app, comes from the family's packaging
//   - with no name in the profile and none to publish under (as in a public edition), the owner is the app's own name
//   (7.27: the invented owner is set as the publishing name too, since 7.25 the name kits are published under)
//   - when the family's packaging cannot be read, another app's kit is refused, never made from Ingenium's projects
//   - the kits of the invented app are saved in <out dir> (for the proof on GitHub's machines); no page errors
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const crypto = require('crypto');
const [OUT, URL] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1200))); c ? pass++ : fail++; };
const SRC = path.join(__dirname, '..', 'build', 'kits', 'gradle');
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const GRADLEW = sha(fs.readFileSync(path.join(SRC, 'gradlew'))), JAR = sha(fs.readFileSync(path.join(SRC, 'gradle', 'wrapper', 'gradle-wrapper.jar')));
const APP = '<!doctype html><html><head><meta charset="utf-8"><title>Tide Clock</title></head><body><h1>Tide Clock</h1><p>An invented app for the test.</p></body></html>';

(async () => {
  const b = await pw.chromium.launch();
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(600);
  const r = await p.evaluate(async ({ APP }) => {
    const out = { authorFn: typeof lxhAuthor, family: !!(window.IngFamilyKit && IngFamilyKit.has()), kits: {}, saved: {} };
    window.lxhAuthor = function () { return 'Ada Example'; };   // an invented person in place of the profile's name
    /* 7.27: since 7.25 a kit's owner is the publishing name (modules/r309.js), the master edition's own until changed: the invented
       owner is set as the publishing name too, chosen quietly, so no make asks */
    if (window.IngPublisher) IngPublisher.set('Ada Example', true);
    const store = await kitStore(); const TD = new TextDecoder('utf-8');
    const toB64 = u => { let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); };
    const bytesOf = e => typeof e.data === 'string' ? new TextEncoder().encode(e.data) : e.data;
    async function pixel(u8, x, y) { const bm = await createImageBitmap(new Blob([u8], { type: 'image/png' })); const c = document.createElement('canvas'); c.width = bm.width; c.height = bm.height; const g = c.getContext('2d'); g.drawImage(bm, 0, 0); return { w: bm.width, h: bm.height, rgb: Array.from(g.getImageData(x, y, 1, 1).data.slice(0, 3)) }; }
    function view(k) { return k.entries.map(e => { const u = bytesOf(e); const text = typeof e.data === 'string'; return { name: e.name, mode: e.mode || 420, size: u.length, text: text ? e.data : null, head: Array.from(u.slice(0, 3)) }; }); }
    const who = { isNew: true, name: 'Tide Clock', id: 'com.example.tideclock', file: 'TideClock', title: 'Tide Clock', version: '3', colour: '#3a7bd5' };
    for (const kit of ['fire', 'iphone', 'ipad', 'mac', 'macarm', 'windows']) {
      try { const k = await kitAssemble(store, kit, who, APP); const v = view(k); const o = { zip: k.zip, templated: !!k.templated, own: !!k.own, title: k.identity && k.identity.title, files: v.length, entries: v };
        if (kit === 'fire') { const big = k.entries.find(e => /ic_launcher_512\.png$/.test(e.name)); o.icon = big ? await pixel(bytesOf(big), 256, 60) : null;
          o.mipmaps = await Promise.all(k.entries.filter(e => /mipmap-[a-z]+\/ic_launcher\.png$/.test(e.name)).map(async e => (await pixel(bytesOf(e), 0, 0)).w)); }
        if (kit === 'iphone') { const big = k.entries.find(e => /AppIcon\.appiconset\/icon-1024\.png$/.test(e.name)); o.icon = big ? await pixel(bytesOf(big), 512, 140) : null; }
        out.kits[kit] = o; if (kit !== 'ipad') out.saved[k.zip] = toB64(k.bytes || makeZip(k.entries));
      } catch (e) { out.kits[kit] = { error: String(e && e.message || e) }; }
    }
    // the web kit: the Build page's and Download as an app's
    try { const k = await kitWebEntries(who, APP); out.web = { zip: k.zip, templated: !!k.templated, names: k.entries.map(e => e.name), manifest: (k.entries.find(e => /manifest\.webmanifest$/.test(e.name)) || {}).data }; out.saved[k.zip] = toB64(k.bytes || makeZip(k.entries)); } catch (e) { out.web = { error: String(e && e.message || e) }; }
    try { const k = await IngKits.make('web', APP, who); out.make = { templated: !!(k && k.templated), files: k ? k.entries.length : 0 }; } catch (e) { out.make = { error: String(e && e.message || e) }; }
    // an app whose page names its own icon: a green square of 192 pixels
    { const c = document.createElement('canvas'); c.width = c.height = 192; const g = c.getContext('2d'); g.fillStyle = '#1f9d55'; g.fillRect(0, 0, 192, 192);
      const page = APP.replace('<title>', '<link rel="icon" sizes="192x192" href="' + c.toDataURL('image/png') + '"><title>').replace(/Tide Clock/g, 'Green Leaf');
      const k = await kitAssemble(store, 'fire', Object.assign({}, who, { name: 'Green Leaf', title: 'Green Leaf', id: 'com.example.greenleaf', file: 'GreenLeaf' }), page);
      const big = k.entries.find(e => /ic_launcher_512\.png$/.test(e.name)); out.ownIcon = big ? await pixel(bytesOf(big), 256, 256) : null; }
    // family apps: the Java package an earlier package kept, or the app's id
    for (const app of ['inkwell', 'cd']) {
      const k = await kitAssemble(store, 'fire', Object.assign({}, who, { app: app, name: 'Family Test', title: 'Family Test', id: 'com.example.familytest', file: 'FamilyTest' }), APP.replace(/Tide Clock/g, 'Family Test'));
      const g = k.entries.find(e => /Fire tablet project\/app\/build\.gradle$/.test(e.name)), m = k.entries.find(e => /\/MainActivity\.java$/.test(e.name));
      out['ns_' + app] = { alias: ((window.fbKnown || {})[app] || {}).alias || '', ns: (/namespace '([^']+)'/.exec(g ? g.data : '') || [])[1], java: m ? m.name.replace(/^.*\/java\//, '') : null, pkg: (/^package ([\w.]+);/m.exec(m ? m.data : '') || [])[1] }; }
    // an app's own templates come first
    { const T = { v: 2, fire: { '__APP_TITLE__ own/README.txt': 'Own template for __APP_TITLE__.' } };
      const page = APP.replace('</body>', '<script id="own-pkg-src">b64:' + btoa(JSON.stringify(T)) + '</scr' + 'ipt></body>');
      const k = await kitAssemble(store, 'fire', who, page); out.ownTpl = { names: k.entries.map(e => e.name), text: k.entries[0] && k.entries[0].data }; }
    // Ingenium's own page keeps Ingenium's own projects
    { const own = '<!doctype html><html><head><meta charset="utf-8"><title>Ingenium</title></head><body><script>var ING_EDITION="master";try{(window.__ingParts=window.__ingParts||{})["p1"]="running";}catch(_){}</scr' + 'ipt><p>Ingenium</p></body></html>';
      try { const k = await kitAssemble(store, 'fire', Object.assign({}, who, { name: 'Ingenium', title: 'Ingenium', id: 'com.example.ingeniumcopy', file: 'Ingenium' }), own); out.ingenium = { own: !!k.own, templated: !!k.templated, files: k.entries.length }; } catch (e) { out.ingenium = { error: String(e && e.message || e) }; } }
    // no name in the profile, as in a public edition: the owner is the app's own name
    { const keep = window.lxhAuthor, keepP = window.personaGet; window.lxhAuthor = function () { return ''; }; window.personaGet = function () { return { name: '' }; };
      if (window.IngPublisher) IngPublisher.set('', true);  /* 7.27: and no publishing name (Publish with no name) */
      try { const k = await kitAssemble(store, 'windows', who, APP); out.noName = (k.entries.find(e => /Windows project\/LICENCE\.txt$/.test(e.name)) || {}).data; } finally { window.lxhAuthor = keep; window.personaGet = keepP; if (window.IngPublisher) IngPublisher.set('Ada Example', true); } }
    // the family's packaging unreadable: refused, never Ingenium's projects
    { const keep = IngFamilyKit.templates; IngFamilyKit.templates = function () { return Promise.reject(new Error('unreadable (test)')); };
      try { const k = await kitAssemble(store, 'fire', who, APP); out.refused = { made: true, own: !!k.own }; } catch (e) { out.refused = { error: String(e && e.message || e) }; } finally { IngFamilyKit.templates = keep; } }
    try { out.since712 = !!localStorage.getItem('ing:r178:since712'); } catch (e) { out.since712 = 'no storage'; }
    return out; }, { APP });

  ok(r.family && r.authorFn === 'function', 'the family\'s packaging is in the page (IngFamilyKit) and Lector\'s author is there to name the owner', [r.family, r.authorFn]);
  const year = String(new Date().getFullYear());
  const ENGINE = /Bridge\.java|NativeEngine|ModelLibrary|ingenium_jni|ingenium_engine|EngineBridge|Engine\.swift|IngeniumKey|Bridging-Header|mobile_models|bake_engine/;
  for (const kit of ['fire', 'iphone', 'ipad', 'mac', 'macarm', 'windows']) {
    const k = r.kits[kit]; if (!k || k.error) { ok(false, kit + ': the kit is made', k); continue; }
    const E = k.entries, texts = E.filter(e => e.text != null);
    ok(k.templated && !k.own && k.title === 'Tide Clock' && /^tide_clock_/.test(k.zip), kit + ': made from the family\'s packaging, with the app\'s own name (' + k.zip + ', ' + k.files + ' files)', { templated: k.templated, own: k.own, title: k.title, zip: k.zip });
    const named = E.filter(e => /ingenium/i.test(e.name) || ENGINE.test(e.name)).map(e => e.name);
    const says = texts.filter(e => /Ingenium/.test(e.text) && !/<h1>Tide Clock<\/h1>/.test(e.text)).map(e => e.name);
    ok(named.length === 0 && says.length === 0, kit + ': no file of Ingenium\'s and no text naming it', { named, says });
    const left = texts.filter(e => /__APP_[A-Z0-9_]+__/.test(e.text)).map(e => e.name + ': ' + /__APP_[A-Z0-9_]+__/.exec(e.text)[0]);
    ok(left.length === 0, kit + ': no placeholder left', left);
    const lic = E.find(e => /\/LICENCE\.txt$/.test(e.name));
    ok(lic && lic.text.indexOf('Copyright (c) ' + year + ' Ada Example. All rights reserved.') >= 0 && /^TIDE CLOCK\n/.test(lic.text), kit + ': its licence names its owner and the year', lic && lic.text.slice(0, 120));
  }
  const F = r.kits.fire, W = r.kits.windows, M = r.kits.mac, I = r.kits.iphone;
  if (F && F.entries) {
    const f = n => F.entries.find(e => e.name.endsWith(n));
    const g = f('Fire tablet project/app/build.gradle'), ma = F.entries.find(e => /\/java\/com\/example\/tideclock\/MainActivity\.java$/.test(e.name));
    ok(g && /namespace 'com\.example\.tideclock'/.test(g.text) && /applicationId 'com\.example\.tideclock'/.test(g.text) && ma && /^package com\.example\.tideclock;/m.test(ma.text), 'fire: the app\'s own id and Java package (build.gradle, MainActivity.java in its own folder)', { g: g && g.text.match(/namespace .*|applicationId .*/g), ma: ma && ma.name });
    const gw = f('Fire tablet project/gradlew'), jar = f('Fire tablet project/gradle/wrapper/gradle-wrapper.jar'), bat = f('Fire tablet project/gradlew.bat');
    ok(gw && gw.mode === 493 && jar && bat, 'fire: Gradle\'s own wrapper is in the project (gradlew a program, gradlew.bat, gradle-wrapper.jar)', { gw: gw && gw.mode, jar: !!jar, bat: !!bat });
    const cmd = f('Fire tablet project/Build the APK.command'), wbat = f('Fire tablet project/Build the APK (Windows).bat'), ps1 = f('Fire tablet project/build_apk.ps1');
    ok(cmd && cmd.mode === 493 && /^#!\/usr\/bin\/env bash/.test(cmd.text) && wbat && /\r\n/.test(wbat.text) && !/[^\r]\n/.test(wbat.text) && ps1 && ps1.head.join() === '239,187,191' && /\r\n/.test(ps1.text), 'fire: the terminal builds (the Mac one a program; the Windows one with Windows line endings and a byte order mark)', { cmd: cmd && cmd.mode, bat: !!wbat, ps1: ps1 && ps1.head });
    ok(cmd && /-dname "CN=Tide Clock, O=Ada Example"/.test(cmd.text) && ps1 && /-dname 'CN=Tide Clock, O=Ada Example'/.test(ps1.text), 'fire: both terminal builds make the key in the app\'s and the owner\'s names', cmd && (cmd.text.match(/-dname .*/) || [])[0]);
    const wf = f('Fire tablet project/.github/workflows/build-apk.yml');
    ok(wf && /O=Ada Example/.test(wf.text) && /Made by Fabrica/.test(wf.text), 'fire: GitHub\'s recipe makes the key in the owner\'s name and says it was made by Fabrica', wf && (wf.text.match(/-dname .*/) || [])[0]);
    const guide = f('Tide Clock for Fire tablet/READ ME FIRST.txt');
    ok(guide && /PART 3\. BUILD THE APK ON YOUR OWN MAC OR PC/.test(guide.text) && /Made by Fabrica/.test(guide.text) && !/The Forge|Carpe Diem|Inkwell/.test(guide.text), 'fire: the guide has the part on building on her own computer, and names no other app', guide && guide.text.slice(0, 200));
    ok(F.icon && F.icon.w === 512 && Math.abs(F.icon.rgb[0] - 0x3a) < 12 && Math.abs(F.icon.rgb[1] - 0x7b) < 12 && Math.abs(F.icon.rgb[2] - 0xd5) < 12, 'fire: its icon is its own (its initials on its own colour, #3a7bd5)', F.icon);
    ok(JSON.stringify(F.mipmaps.slice().sort((a, b) => a - b)) === '[48,72,96,144,192]', 'fire: the launcher icon at every size Android asks for (48 to 192)', F.mipmaps);
  }
  if (W && W.entries) {
    const f = n => W.entries.find(e => e.name.endsWith(n));
    const bat = f('Windows project/Build Tide Clock (Windows).bat'), ps1 = f('Windows project/build_windows.ps1'), iss = f('Windows project/tide_clock.iss'), spec = f('Windows project/tide_clock.spec');
    ok(bat && /\r\n/.test(bat.text) && ps1 && ps1.head.join() === '239,187,191' && /pyinstaller==6\.22\.3 pywebview==6\.2\.1 pythonnet==3\.2\.0/.test(ps1.text), 'windows: the terminal build, with the same pinned tools as GitHub\'s build', { bat: !!bat, ps1: ps1 && ps1.head });
    ok(iss && /AppPublisher=Ada Example\r?\n/.test(iss.text) && spec && /StringStruct\('CompanyName', 'Ada Example'\)/.test(spec.text), 'windows: the installer and the program name their owner', { iss: iss && (iss.text.match(/AppPublisher=.*/) || [])[0] });
    const guide = f('Tide Clock for Windows/READ ME FIRST.txt');
    ok(guide && /PART 4\. MAKING IT ON THIS PC INSTEAD/.test(guide.text) && !/The Forge|Carpe Diem|Inkwell|WHAT IS NEW IN THIS BUILD/.test(guide.text), 'windows: the guide has the part on making it on this PC, and names no other app', guide && guide.text.slice(0, 200));
  }
  if (M && M.entries) { const c = M.entries.find(e => e.name.endsWith('Mac project/Build Mac App.command')); ok(c && c.mode === 493 && /\.build_probe/.test(c.text), 'mac: its terminal build is a program', c && c.mode); }
  if (I && I.entries) { const pb = I.entries.find(e => /project\.pbxproj$/.test(e.name)); ok(pb && /ORGANIZATIONNAME = "Ada Example";/.test(pb.text) && I.icon && I.icon.w === 1024, 'iphone: the Xcode project names its owner; its icon is 1024 pixels', { org: pb && (pb.text.match(/ORGANIZATIONNAME = .*/) || [])[0], icon: I.icon }); }
  ok(r.kits.ipad && r.kits.iphone && r.kits.ipad.zip === r.kits.iphone.zip, 'ipad: the same package as the iPhone\'s, as an app\'s own templates make it', [r.kits.ipad && r.kits.ipad.zip]);
  ok(r.ownIcon && Math.abs(r.ownIcon.rgb[0] - 0x1f) < 12 && Math.abs(r.ownIcon.rgb[1] - 0x9d) < 12 && Math.abs(r.ownIcon.rgb[2] - 0x55) < 12, 'an app whose page names its own icon: its kit\'s icons are drawn from it', r.ownIcon);
  const ni = r.ns_inkwell, nc = r.ns_cd;
  ok(ni && ni.ns === 'com.example.familytest' && ni.java === 'com/example/familytest/MainActivity.java' && ni.pkg === ni.ns, 'a family app with no earlier activity name: its Java package is its id', ni);
  const want = (nc && nc.alias || '').replace(/\.MainActivity$/, '');
  ok(nc && want && nc.ns === want && nc.pkg === want && nc.java === want.replace(/\./g, '/') + '/MainActivity.java', 'a family app whose earlier packages kept an activity name: the same Java package, so a home screen icon still points to it', nc);
  ok(r.ownTpl && r.ownTpl.names.length === 1 && r.ownTpl.names[0] === 'Tide Clock own/README.txt' && r.ownTpl.text === 'Own template for Tide Clock.', 'an app\'s own templates still come first', r.ownTpl);
  ok(r.ingenium && r.ingenium.own && !r.ingenium.templated, 'Ingenium\'s own page keeps Ingenium\'s own projects', r.ingenium);
  ok(r.web && r.web.templated && /^tide_clock_web_/.test(r.web.zip) && r.web.names.some(n => /icons\/icon-512\.png$/.test(n)) && /"name": "Tide Clock"/.test(r.web.manifest || '') && /Ada Example/.test(r.web.manifest || ''), 'the web kit (the Build page\'s) comes from the family\'s packaging, with its own manifest and icons', r.web && { zip: r.web.zip, m: (r.web.manifest || '').slice(0, 160) });
  ok(r.make && r.make.templated && r.make.files > 10, 'Download as an app\'s web row and the other askers get the same', r.make);
  ok(typeof r.noName === 'string' && r.noName.indexOf('Copyright (c) ' + year + ' Tide Clock. All rights reserved.') >= 0, 'with no name in the profile (as in a public edition), the owner is the app\'s own name', (r.noName || '').slice(0, 100));
  ok(r.refused && /could not be made from the family's packaging/.test(r.refused.error || ''), 'the family\'s packaging unreadable: the kit is refused, never made from Ingenium\'s projects', r.refused);
  ok(r.since712 === true, 'kits kept before 7.12 are let go once (its time is kept)', r.since712);
  for (const [name, b64] of Object.entries(r.saved)) fs.writeFileSync(path.join(OUT, name), Buffer.from(b64, 'base64'));
  // the zips themselves: gradlew and the build scripts kept as programs, Gradle's own files byte for byte
  const zips = fs.readdirSync(OUT).filter(n => /\.zip$/.test(n));
  ok(zips.length === 6, 'the six packages of the invented app are saved (' + zips.join(', ') + ')', zips);
  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  await b.close();
  // read the Fire zip back with Python's zipfile: the modes and the wrapper's bytes
  const fire = zips.find(n => /_fire_/.test(n));
  if (fire) {
    const py = require('child_process').spawnSync('python3', ['-c', `import zipfile,hashlib,sys,json
z=zipfile.ZipFile(sys.argv[1]);o={}
for i in z.infolist():
  n=i.filename
  if n.endswith('/gradlew') or n.endswith('.command') or n.endswith('gradle-wrapper.jar'):
    o[n.split('/')[-1]]={'mode':oct((i.external_attr>>16)&0o777),'sha':hashlib.sha256(z.read(n)).hexdigest()}
print(json.dumps(o))`, path.join(OUT, fire)], { encoding: 'utf8' });
    let z = {}; try { z = JSON.parse(py.stdout); } catch (e) { z = { error: py.stderr || py.stdout }; }
    ok(z.gradlew && z.gradlew.mode === '0o755' && z.gradlew.sha === GRADLEW && z['gradle-wrapper.jar'] && z['gradle-wrapper.jar'].sha === JAR && z['Build the APK.command'] && z['Build the APK.command'].mode === '0o755', 'fire zip: gradlew and the build script unzip as programs; Gradle\'s files byte for byte as Gradle made them', z);
  }
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
