// Ingenium 6.7 · an app shipped as itself (modules/r178.js, R178), in Chromium. The owner's words (25 October 2026):
// "Ingenium's windows app does not ship proper apps and packages. I tried to ship new Forge app on windows laptop and it kept
// on showing Ingenium's files on the zip folder and not the Forge and its kit and icons."
// Checks, in a running Ingenium, with The Forge taken from the app library as the owner would:
//   - the Forge's own packager, in the Forge's own page (FORGE.fab.kits), makes its five install packages: the reference;
//   - Fabrica's Build kits, its web app card, its Windows and Mac app cards, Download as an app (each device row and each
//     "Or the ... project" key, opened from Fabrica and as Chat and Code open it) and the old Build page's rows each make
//     the Forge's packages: the top folder and every name inside are the Forge's, entry for entry the same bytes, names,
//     modes and order as the Forge's own packager makes them; every icon (each picture in each .png, .ico and .icns) is the
//     Forge's seal and far from Ingenium's; the Forge's page is inside, whole; its installer script, build recipe and
//     manifest name The Forge and its id; no path names Ingenium; the Windows and Mac apps carry the Forge's icon and name
//     (rig/verify_desktop_app.py reads them as Windows and macOS do);
//   - a plain app with no templates (Tide Clock) gets the generic kits made its own: its icon in every icon file, its names
//     and id in app.json, the installer script, the build recipes, the build and run files and the guide, the files that
//     carry its identity renamed for it, every file a build file names present in the zip, and no Ingenium file name in
//     the desktop kits; Ingenium's own kit is still Ingenium's;
//   - through the Windows desktop app's own saving (ingenium_app.py's save_file, rig/t_67_winsave.py) each package lands
//     under its own name with exactly the bytes made, one after another, never one in place of another;
//   - no page errors.
//   node rig/t_67_kits.js <url of Ingenium> <out folder> [path/to/the Windows app's ingenium_app.py]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process'); const crypto = require('crypto');
// the Forge Ingenium carries (build/apps/builtin/builtin.json): its kits are named with its own stamp
const BIF = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '..', 'build', 'apps', 'builtin', 'builtin.json'), 'utf8')).forge;
const FS = BIF.build, FP = BIF.version, FD = BIF.date;
const [URL_, OUT, WINAPP_ARG] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const REF = path.join(OUT, 'kits_ref'), ZIPS = path.join(OUT, 'kits_made'); fs.rmSync(REF, { recursive: true, force: true }); fs.rmSync(ZIPS, { recursive: true, force: true });
fs.mkdirSync(REF, { recursive: true }); fs.mkdirSync(ZIPS, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; };
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const KC = path.join(__dirname, 'kit_check.py'), VERIFY = path.join(__dirname, 'verify_desktop_app.py');
let nspec = 0;
const kc = (zip, spec) => { const sp = path.join(REF, 'spec_' + (++nspec) + '.json'); fs.writeFileSync(sp, JSON.stringify(spec));
  const r = cp.spawnSync('python3', ['-I', KC, zip, sp], { encoding: 'utf8', maxBuffer: 1 << 28 }); try { return JSON.parse(r.stdout.trim().split('\n').pop()); } catch (e) { return { error: (r.stderr || r.stdout).slice(-1500) }; } };
const verify = (kind, file, id, title) => { const r = cp.spawnSync('python3', [VERIFY, kind, file, id, title], { encoding: 'utf8', maxBuffer: 1 << 26 }); try { return JSON.parse(r.stdout.trim().split('\n').pop()); } catch (e) { return { faults: ['no report: ' + r.stdout + r.stderr] }; } };
const DEV = { mac: 'Mac', mac_mini: 'Mac mini', windows: 'Windows', ios: 'iPhone and iPad', fire: 'Fire tablet', web: 'the web' };
const kindOf = n => (/_(mac_mini|mac|windows|ios|fire|web)_[^_]+\.zip$/.exec(n) || [])[1];

(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1500, height: 1000 }, acceptDownloads: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  const downloads = []; p.on('download', d => downloads.push(d));
  // every file saved while fn runs (at least n), kept under kits_made/<label>/
  async function collect(label, fn, n, timeout = 240000) { const n0 = downloads.length; await fn(); const t0 = Date.now();
    while (downloads.length < n0 + n && Date.now() - t0 < timeout) await p.waitForTimeout(250);
    await p.waitForTimeout(1500); const dir = path.join(ZIPS, label); fs.mkdirSync(dir, { recursive: true }); const out = [];
    for (const d of downloads.slice(n0)) { const f = path.join(dir, d.suggestedFilename()); await d.saveAs(f); out.push(f); } return out; }
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(800);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
    ok(await p.evaluate(() => window.__ingParts.p99 === 'running' && !!window.IngKits && kitAssemble !== undefined), 'the part that ships an app as itself (p99) runs');
    await p.waitForFunction(() => window.__ingBuiltin && window.__ingBuiltin.states && window.__ingBuiltin.states.forge, null, { timeout: 120000 });

    // ---------- the references: the Forge's page, its seal, Ingenium's own icons ----------
    const R = await p.evaluate(async () => { const page = await libText('forge'), T = IngKits.templates(page), store = await kitStore();
      const f = (s, p) => (store.files.find(x => x.s === s && x.p === p) || {}).b || '';
      const u = sealBytes(512); let s = ''; for (let i = 0; i < u.length; i += 32768) s += String.fromCharCode.apply(null, u.subarray(i, i + 32768));
      return { page, v: T && T.v, devices: T ? Object.keys(T).filter(k => T[k] && typeof T[k] === 'object' && k !== 'icons' && k !== 'texts') : [], seal: T && T.icons.seal512.replace(/^b64:/, ''),
        ingWin: f('windows', 'ingenium.png'), ingIos: f('fire', 'ingenium_ios_project/Ingenium/Assets.xcassets/AppIcon.appiconset/icon-1024.png'), ingSeal: btoa(s), id: fbKnown.forge.id,
        // every icon file of Ingenium's own (its kits' .png, .ico, .icns and .svg, and its seal), by its SHA-256
        ingSha: await Promise.all(store.files.filter(x => /\.(png|ico|icns|svg)$/i.test(x.p)).map(x => x.b != null ? Uint8Array.from(atob(x.b), c => c.charCodeAt(0)) : new TextEncoder().encode(x.t || '')).concat([u])
          .map(b => crypto.subtle.digest('SHA-256', b).then(h => [...new Uint8Array(h)].map(v => v.toString(16).padStart(2, '0')).join('')))) }; });
    const forgeFile = path.join(REF, 'the_forge.html'); fs.writeFileSync(forgeFile, R.page); const PAGE_SHA = sha(Buffer.from(R.page, 'utf8'));
    const SEAL = path.join(REF, 'forge_seal512.png'); fs.writeFileSync(SEAL, Buffer.from(R.seal, 'base64'));
    const ING = ['ing_win512.png', 'ing_ios1024.png', 'ing_seal512.png'].map((n, i) => { const f = path.join(REF, n); fs.writeFileSync(f, Buffer.from([R.ingWin, R.ingIos, R.ingSeal][i], 'base64')); return f; });
    const ING_SHA = R.ingSha;
    // an icon check every package passes: at least n pictures; each nearer the app's own picture than any of Ingenium's icons by
    // half again at least (worst from the app's below 10 of 255, nearest to Ingenium's above 12); no icon file is one of Ingenium's
    const iconsOk = (r, n) => (r.icons || []).length >= n && !(r.icons || []).some(i => i.bad) && r.icon_worst_app < 10 && r.icon_nearest_ing > 12 && r.icon_least_ratio >= 1.5 && (r.ing_icon_bytes || []).length === 0;
    const iconSay = r => ({ pics: (r.icons || []).length, worst_from_app: r.icon_worst_app, nearest_to_ingenium: r.icon_nearest_ing, least_ratio: r.icon_least_ratio, ingenium_bytes: r.ing_icon_bytes });
    ok(R.v === 2 && ['mac', 'windows', 'fire', 'ios', 'web', 'mac_mini'].every(k => R.devices.includes(k)), 'The Forge in the app library carries its own package templates (v 2, a map for each device), found by their markup', R.devices);

    // ---------- 0. the Forge's own packager, in the Forge's own page ----------
    const fp = await ctx.newPage(), forgeErrs = []; fp.on('pageerror', e => forgeErrs.push(e.message.slice(0, 200)));  // the Forge's own page, served here from memory: its own errors are not Ingenium's
    await fp.route('http://forge.test/**', r => r.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: R.page }));
    await fp.goto('http://forge.test/the_forge.html'); await fp.waitForFunction(() => window.FORGE && FORGE.fab && FORGE.fab.hasKits && FORGE.fab.hasKits(), null, { timeout: 180000 });
    const own = await fp.evaluate(async () => { const t = await (await fetch(location.href)).text(); const made = await FORGE.fab.kits(t, 'the_forge');
      return made.map(m => { let s = ''; for (let i = 0; i < m.bytes.length; i += 32768) s += String.fromCharCode.apply(null, m.bytes.subarray(i, i + 32768)); return [m.name, btoa(s)]; }); });
    const OWN = {}; for (const [n, b64] of own) { const f = path.join(REF, 'own_' + n); fs.writeFileSync(f, Buffer.from(b64, 'base64')); OWN[kindOf(n)] = f; }
    await fp.close();
    const OWN_PAGES = {}; for (const k of Object.keys(OWN)) OWN_PAGES[k] = (kc(OWN[k], { page_sha256: PAGE_SHA }).page_entries || []).sort();
    ok(Object.keys(OWN).sort().join() === 'fire,ios,mac,mac_mini,windows', 'the Forge\'s own packager, in its own page, makes its five install packages (the reference)', own.map(x => x[0]));

    // the checks every package of the Forge's passes
    const checked = [];
    function forgePackage(file, label) { const name = path.basename(file), kind = kindOf(name);
      const spec = { app_ref: SEAL, ing_refs: ING, ing_icon_sha256: ING_SHA, page_sha256: PAGE_SHA, read: ['\\.iss$', '\\.spec$', 'manifest\\.webmanifest$', 'BUILD_INFO\\.txt$', 'Info\\.plist$', 'strings\\.xml$', '/index\\.html$'], read_max: 3000 };
      if (kind && kind !== 'web' && OWN[kind]) spec.ref_zip = OWN[kind];
      if (kind === 'web') { spec.ref_zip = OWN.ios; spec.ref_map = [['The Forge for iPhone and iPad/Home Screen app/', 'The Forge for the web/']]; }
      const r = kc(file, spec); checked.push([label, name, r]);
      const rd = k => ((r.read || {})[k] || {}).text || '';
      ok(!!kind && r.top && r.top.length === 1 && r.top[0] === 'The Forge for ' + DEV[kind] && r.ing_paths && r.ing_paths.length === 0,
        label + ': ' + name + ' holds one folder, "The Forge for ' + (DEV[kind] || '?') + '", and no path names Ingenium', { top: r.top, ing: r.ing_paths, n: (r.entries || []).length, err: r.error });
      const rf = r.ref || {};
      ok(rf.compared > 0 && rf.same === rf.compared && !rf.missing.length && !(kind !== 'web' && rf.extra.length) && rf.order_same,
        label + ': ' + name + (kind === 'web' ? ': its Home Screen files are, byte for byte, those of the Forge\'s own iPhone and iPad package' : ': entry for entry (names, bytes, modes, order) what the Forge\'s own packager makes'), rf);
      ok(iconsOk(r, kind === 'web' ? 10 : kind === 'ios' ? 10 : kind === 'fire' ? 6 : 3), label + ': ' + name + ': every picture in its icons (' + (r.icons || []).length + ') is the Forge\'s seal, not Ingenium\'s, and no icon file is one of Ingenium\'s', iconSay(r));
      if (kind === 'web') ok(new RegExp('window\\.CD_BUILD=\\{date:"' + FD + '",pass:"' + FP + '",stamp:"' + FS + '"\\}').test(rd('/index\\.html$')) || (r.entries || []).some(e => /\/index\.html$/.test(e[0]) && e[1] > R.page.length), label + ': ' + name + ': the Forge\'s page is inside as its index.html', (r.entries || []).filter(e => /index\.html$/.test(e[0])).map(e => e[0] + ' ' + e[1]));
      else ok((r.page_entries || []).length >= 1 && r.page_entries.slice().sort().join('|') === (OWN_PAGES[kind] || []).join('|'), label + ': ' + name + ': the Forge\'s page is inside, whole (its fingerprint), where the Forge\'s own package has it', r.page_entries);
      if (kind === 'windows') ok(/#define AppName "The Forge"|AppName=The Forge|The Forge/.test(rd('\\.iss$')) && !/Ingenium\.iss|AppName "Ingenium"/.test(rd('\\.iss$')) && /the_forge/.test(rd('\\.spec$')) && /Name: the_forge|The Forge/.test(rd('BUILD_INFO\\.txt$')),
        label + ': ' + name + ': its installer script (the_forge.iss) and build recipe (the_forge.spec) name The Forge', { iss: ((r.read || {})['\\.iss$'] || {}).name, spec: ((r.read || {})['\\.spec$'] || {}).name, info: rd('BUILD_INFO\\.txt$').slice(0, 80) });
      if (kind === 'web') { let man = {}; try { man = JSON.parse(rd('manifest\\.webmanifest$')); } catch (e) {}
        ok(man.name === 'The Forge' && man.icons && man.icons.length === 6, label + ': ' + name + ': its manifest names The Forge', { name: man.name, icons: man.icons && man.icons.length }); }
      if (kind === 'fire') ok(new RegExp(R.id.replace(/\./g, '\\.')).test(JSON.stringify(r.read || {})) || /The Forge/.test(rd('strings\\.xml$')), label + ': ' + name + ': its Android project names The Forge and its id', rd('strings\\.xml$').slice(0, 200));
      return r; }

    // ---------- 1. Fabrica: The Forge from the app library ----------
    await p.evaluate(() => go('fabrica')); await p.waitForTimeout(1500);
    await p.evaluate(() => document.getElementById('fbBring').click()); await p.waitForTimeout(500);
    await p.evaluate(() => [...document.querySelectorAll('.f-sheet .f-opt')].find(x => /From your app library/.test(x.textContent)).click()); await p.waitForTimeout(500);
    await p.evaluate(() => [...document.querySelectorAll('.f-sheet .f-opt')].find(x => /^♦?\s*The Forge/.test(x.textContent.trim()) || /The Forge \d/.test(x.textContent)).click());
    await p.waitForFunction(() => { const r = IngRepo && document.querySelector('#fbRepos .f-repo.on, #fbRepos .f-repo[aria-current="true"]'); return !!r && /The Forge/.test(r.textContent); }, null, { timeout: 120000 }).catch(() => {});
    await p.waitForTimeout(1500);
    await p.evaluate(() => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => /The Forge/.test(x.textContent)); if (t) t.click(); }); await p.waitForTimeout(1500);
    const repo = await p.evaluate(() => { const cards = [...document.querySelectorAll('#fbTargets .f-tg')].map(e => e.getAttribute('data-k')); const pk = (document.getElementById('fbPkg') || {}).textContent || ''; return { cards, pk }; });
    ok(repo.cards.includes('kits') && repo.cards.includes('win') && /The Forge/.test(repo.pk), 'Fabrica brings The Forge in from the app library, ready to ship (its package details name it)', repo);
    const keyOf = 'e => [...(e.parentElement || e).querySelectorAll("button")].find(x => /^Make and save/.test(x.textContent))';

    // ---------- 2. Fabrica's Build kits, every device ----------
    const fk = await collect('fabrica_kits', async () => { await p.evaluate(kf => { const e = document.querySelector('#fbTargets .f-tg[data-k="kits"]'); eval(kf)(e).click(); }, keyOf); await p.waitForTimeout(600);
      const sh = await p.evaluate(() => { const s = [...document.querySelectorAll('.f-sheet')].pop(); return s ? { opts: [...s.querySelectorAll('.f-opt')].map(o => o.textContent.trim().slice(0, 30) + '=' + o.getAttribute('aria-pressed')), go: [...s.querySelectorAll('button')].map(x => x.textContent) } : null; });
      await p.evaluate(() => { const s = [...document.querySelectorAll('.f-sheet')].pop(); s.querySelectorAll('.f-opt').forEach(o => { if (o.getAttribute('aria-pressed') !== 'true') o.click(); }); [...s.querySelectorAll('button')].find(x => /^Make kits for \d+ devices?$/.test(x.textContent)).click(); });
      console.log('  (the Build kits sheet: ' + JSON.stringify(sh) + ')'); }, 5, 300000);
    ok(fk.map(f => path.basename(f)).sort().join() === ['the_forge_fire_' + FS + '.zip', 'the_forge_ios_' + FS + '.zip', 'the_forge_mac_' + FS + '.zip', 'the_forge_mac_mini_' + FS + '.zip', 'the_forge_windows_' + FS + '.zip'].join(),
      'Fabrica\'s Build kits, with all six devices chosen, saves the Forge\'s five packages, each once, under the Forge\'s own names', fk.map(f => path.basename(f)));
    // (6.7, after review: the key counts the devices; the notice after counts the packages and names the one iPhone and iPad share)
    const fkSaid = await p.waitForFunction(() => { const t = document.querySelector('#fb .f-toast'); return t && /build kits? made and saved/.test(t.textContent) ? t.textContent : null; }, null, { timeout: 20000 }).then(h => h.jsonValue()).catch(() => '');
    ok(fkSaid === '5 build kits made and saved, one .zip each; the iPhone and iPad kits come as one package, the_forge_ios_' + FS + '.zip. They are kept under Releases too.',
      'the notice counts the five packages and says that the iPhone and iPad kits are one', fkSaid);
    for (const f of fk) forgePackage(f, 'Fabrica, Build kits');
    await p.waitForTimeout(1500);

    // ---------- 3. Fabrica's web app card ----------
    const fw = await collect('fabrica_web', () => p.evaluate(kf => { const e = document.querySelector('#fbTargets .f-tg[data-k="web"]'); eval(kf)(e).click(); }, keyOf), 1);
    ok(fw.length === 1 && path.basename(fw[0]) === 'the_forge_web_' + FS + '.zip', 'Fabrica\'s web app card saves the Forge\'s own web package', fw.map(f => path.basename(f)));
    if (fw[0]) forgePackage(fw[0], 'Fabrica, web app');
    await p.waitForTimeout(1500);

    // ---------- 4. Fabrica's Windows and Mac app cards: the apps themselves ----------
    const fwin = await collect('fabrica_win', () => p.evaluate(kf => { const e = document.querySelector('#fbTargets .f-tg[data-k="win"]'); eval(kf)(e).click(); }, keyOf), 1);
    const vfw = fwin[0] ? verify('win', fwin[0], R.id, 'The Forge') : { faults: ['nothing saved'] };
    const kfw = fwin[0] ? kc(fwin[0], { app_ref: SEAL, ing_refs: ING, ing_icon_sha256: ING_SHA, page_sha256: PAGE_SHA }) : {};
    ok(fwin[0] && /^The-Forge-windows-.*\.zip$/.test(path.basename(fwin[0])) && !vfw.faults.length && vfw.program === 'The Forge.exe' && vfw.id === R.id,
      'Fabrica\'s Windows app card makes The Forge.exe, named for the Forge with its id, read as Windows reads it', { saved: fwin[0] && path.basename(fwin[0]), verify: vfw });
    ok(kfw.icons && kfw.icons.length === 6 && iconsOk(kfw, 6) && (kfw.page_entries || []).length === 1 && kfw.ing_paths.length === 0,
      'the program carries the Forge\'s seal at every size of its icon, and the Forge\'s page whole', { icons: (kfw.icons || []).map(i => i.pic + ' ' + i.d_app + '/' + i.d_ing), page: kfw.page_entries, ing: kfw.ing_paths });
    await p.waitForTimeout(1500);
    const fmac = await collect('fabrica_mac', () => p.evaluate(kf => { const e = document.querySelector('#fbTargets .f-tg[data-k="mac"]'); eval(kf)(e).click(); }, keyOf), 1);
    const vfm = fmac[0] ? verify('mac', fmac[0], R.id, 'The Forge') : { faults: ['nothing saved'] };
    const kfm = fmac[0] ? kc(fmac[0], { app_ref: SEAL, ing_refs: ING, ing_icon_sha256: ING_SHA, page_sha256: PAGE_SHA }) : {};
    ok(fmac[0] && /^The-Forge-mac-.*\.zip$/.test(path.basename(fmac[0])) && !vfm.faults.length && vfm.bundle === 'The Forge.app' && vfm.id === R.id && iconsOk(kfm, 11) && (kfm.page_entries || []).length === 1 && kfm.ing_paths.length === 0,
      'Fabrica\'s Mac app card makes The Forge.app, sealed as macOS reads it, with the Forge\'s seal and page', { saved: fmac[0] && path.basename(fmac[0]), bundle: vfm.bundle, faults: vfm.faults, icons: iconSay(kfm), page: kfm.page_entries });
    await p.waitForTimeout(1500);

    // ---------- 5. Download as an app, opened from Fabrica ----------
    await p.evaluate(() => [...document.querySelectorAll('#fbPkg button')].find(x => /Download as an app/.test(x.textContent)).click());
    await p.waitForSelector('.dl-app .dl-dev', { timeout: 120000 }); await p.waitForTimeout(800);
    const rows = await p.evaluate(() => [...document.querySelectorAll('.dl-app .dl-dev')].map(r => ({ t: r.querySelector('.dl-t b').textContent, file: r.querySelector('.dl-file').textContent, keys: [...r.querySelectorAll('.dl-row button')].map(x => x.textContent) })));
    ok(rows.find(r => r.t === 'Web').file === 'the_forge_web_' + FS + '.zip' && rows.find(r => r.t === 'Windows').keys.includes('Or the Windows project'), 'Download as an app, from Fabrica: the web row names the Forge\'s own web package, and each device still offers its project', rows.map(r => r.t + ': ' + r.file));
    await p.screenshot({ path: path.join(OUT, 'kits_download_as_app.png') });
    const pressDl = async (label, row, key, n) => { const f = await collect(label, () => p.evaluate(([row, key]) => { const r = [...document.querySelectorAll('.dl-app .dl-dev')].find(x => x.querySelector('.dl-t b').textContent.startsWith(row));
      [...r.querySelectorAll('.dl-row button')].find(x => x.textContent === key).click(); }, [row, key]), n);
      const st = await p.evaluate(row => { const r = [...document.querySelectorAll('.dl-app .dl-dev')].find(x => x.querySelector('.dl-t b').textContent.startsWith(row)); return r.querySelector('.dl-st').textContent; }, row);
      return { f, st }; };
    const dlw = await pressDl('dl_windows_project', 'Windows', 'Or the Windows project', 1);
    ok(dlw.f.length === 1 && path.basename(dlw.f[0]) === 'the_forge_windows_' + FS + '.zip' && new RegExp('^Saved: the_forge_windows_' + FS + '\\.zip').test(dlw.st), 'Download as an app: "Or the Windows project" saves the Forge\'s Windows package', { f: dlw.f.map(x => path.basename(x)), st: dlw.st });
    if (dlw.f[0]) forgePackage(dlw.f[0], 'Download as an app, Windows project');
    const dlm = await pressDl('dl_mac_projects', 'Mac', 'Or the Mac projects', 2);
    ok(dlm.f.map(x => path.basename(x)).sort().join() === 'the_forge_mac_' + FS + '.zip,the_forge_mac_mini_' + FS + '.zip', 'Download as an app: "Or the Mac projects" saves the Forge\'s Mac and Mac mini packages', dlm.f.map(x => path.basename(x)));
    for (const f of dlm.f) forgePackage(f, 'Download as an app, Mac projects');
    const dli = await pressDl('dl_xcode_projects', 'iPhone', 'Or the Xcode projects', 1);
    ok(dli.f.length === 1 && path.basename(dli.f[0]) === 'the_forge_ios_' + FS + '.zip', 'Download as an app: "Or the Xcode projects" saves the Forge\'s iPhone and iPad package, once', dli.f.map(x => path.basename(x)));
    if (dli.f[0]) forgePackage(dli.f[0], 'Download as an app, Xcode projects');
    const dla = await pressDl('dl_android_project', 'Fire', 'Or the Android project', 1);
    ok(dla.f.length === 1 && path.basename(dla.f[0]) === 'the_forge_fire_' + FS + '.zip', 'Download as an app: "Or the Android project" saves the Forge\'s Fire tablet package', dla.f.map(x => path.basename(x)));
    if (dla.f[0]) forgePackage(dla.f[0], 'Download as an app, Android project');
    const dlweb = await pressDl('dl_web', 'Web', 'Make and save', 1);
    ok(dlweb.f.length === 1 && path.basename(dlweb.f[0]) === 'the_forge_web_' + FS + '.zip', 'Download as an app: the web row saves the Forge\'s own web package', dlweb.f.map(x => path.basename(x)));
    if (dlweb.f[0]) forgePackage(dlweb.f[0], 'Download as an app, web');
    const dlx = await pressDl('dl_windows_app', 'Windows', 'Make and save', 1);
    const vdx = dlx.f[0] ? verify('win', dlx.f[0], R.id, 'The Forge') : { faults: ['nothing saved'] }, kdx = dlx.f[0] ? kc(dlx.f[0], { app_ref: SEAL, ing_refs: ING, ing_icon_sha256: ING_SHA, page_sha256: PAGE_SHA }) : {};
    ok(dlx.f[0] && /^The-Forge-windows-.*\.zip$/.test(path.basename(dlx.f[0])) && !vdx.faults.length && vdx.program === 'The Forge.exe' && vdx.id === R.id && iconsOk(kdx, 6) && (kdx.page_entries || []).length === 1 && kdx.ing_paths.length === 0,
      'Download as an app: the Windows row makes The Forge.exe with the Forge\'s seal in its icon and its page inside', { f: dlx.f.map(x => path.basename(x)), faults: vdx.faults, icons: iconSay(kdx) });
    const dlapk = await pressDl('dl_apk', 'Fire', 'Make and save', 1);
    const kap = dlapk.f[0] ? kc(dlapk.f[0], { app_ref: SEAL, ing_refs: ING, ing_icon_sha256: ING_SHA, page_sha256: PAGE_SHA }) : {};
    ok(dlapk.f[0] && /^The-Forge-.*\.apk$/.test(path.basename(dlapk.f[0])) && iconsOk(kap, 5) && (kap.page_entries || []).length === 1 && kap.ing_paths.length === 0,
      'Download as an app: the Fire row makes the Forge\'s APK, with the Forge\'s seal at every density and its page inside', { f: dlapk.f.map(x => path.basename(x)), icons: iconSay(kap) });
    const dlmac = await pressDl('dl_mac_app', 'Mac', 'Make and save', 1);
    const vdm = dlmac.f[0] ? verify('mac', dlmac.f[0], R.id, 'The Forge') : { faults: ['nothing saved'] }, kdm = dlmac.f[0] ? kc(dlmac.f[0], { app_ref: SEAL, ing_refs: ING, ing_icon_sha256: ING_SHA, page_sha256: PAGE_SHA }) : {};
    ok(dlmac.f[0] && /^The-Forge-mac-.*\.zip$/.test(path.basename(dlmac.f[0])) && !vdm.faults.length && vdm.bundle === 'The Forge.app' && vdm.id === R.id && iconsOk(kdm, 11) && (kdm.page_entries || []).length === 1 && kdm.ing_paths.length === 0,
      'Download as an app: the Mac row makes The Forge.app with the Forge\'s seal in its icon and its page inside', { f: dlmac.f.map(x => path.basename(x)), faults: vdm.faults, bundle: vdm.bundle, icons: iconSay(kdm) });
    const dlipa = await pressDl('dl_ipa', 'iPhone', 'Make and save', 1);
    const kip = dlipa.f[0] ? kc(dlipa.f[0], { app_ref: SEAL, ing_refs: ING, ing_icon_sha256: ING_SHA, page_sha256: PAGE_SHA, read: ['Info\\.plist$'] }) : {};
    const plist = ((kip.read || {})['Info\\.plist$'] || {}).text || '';
    ok(dlipa.f[0] && /\.ipa$/.test(path.basename(dlipa.f[0])) && /^TheForge/.test(path.basename(dlipa.f[0])) && iconsOk(kip, 2) && (kip.page_entries || []).length === 1 && kip.ing_paths.length === 0 && plist.indexOf(R.id) >= 0 && /The Forge/.test(plist),
      'Download as an app: the iPhone and iPad row makes the Forge\'s IPA, named for it, with its id, its seal in every icon and its page inside', { f: dlipa.f.map(x => path.basename(x)), icons: iconSay(kip), page: kip.page_entries, id: plist.indexOf(R.id) >= 0 });
    await p.evaluate(() => { try { closeModal(); } catch (e) {} }); await p.waitForTimeout(500);

    // ---------- 6. Download as an app, as Chat and Code open it (the page alone) ----------
    await p.evaluate(h => IngDownload.open({ html: h, name: 'the_forge_646_lean.html' }), R.page);
    await p.waitForSelector('.dl-app .dl-dev', { timeout: 120000 }); await p.waitForTimeout(800);
    const cw = await pressDl('chat_windows_project', 'Windows', 'Or the Windows project', 1);
    ok(cw.f.length === 1 && path.basename(cw.f[0]) === 'the_forge_windows_' + FS + '.zip', 'from Chat or Code (the page alone): "Or the Windows project" saves the Forge\'s Windows package', cw.f.map(x => path.basename(x)));
    if (cw.f[0]) forgePackage(cw.f[0], 'Chat and Code, Windows project');
    await p.evaluate(() => { try { closeModal(); } catch (e) {} }); await p.waitForTimeout(500);

    // ---------- 6b. Download as an app, as Build opens it (the page it holds, under its file name) ----------
    await p.evaluate(h => IngDownload.open({ getHtml: () => Promise.resolve(h), name: 'index.html' }), R.page);
    await p.waitForSelector('.dl-app .dl-dev', { timeout: 120000 }); await p.waitForTimeout(800);
    const bm = await pressDl('build_mac_projects', 'Mac', 'Or the Mac projects', 2);
    ok(bm.f.map(x => path.basename(x)).sort().join() === 'the_forge_mac_' + FS + '.zip,the_forge_mac_mini_' + FS + '.zip', 'from Build (the page it holds): "Or the Mac projects" saves the Forge\'s Mac and Mac mini packages', bm.f.map(x => path.basename(x)));
    for (const f of bm.f) forgePackage(f, 'Build, Mac projects');
    await p.evaluate(() => { try { closeModal(); } catch (e) {} }); await p.waitForTimeout(500);

    // ---------- 7. the old Build page's rows ----------
    // the Forge's page opened in Build (14 MB: Build holds it part by part and leaves its editor empty), the kit for "the app in the
    // editor", its id typed; then each row pressed in turn, as a person presses them
    await p.evaluate(h => { go('build'); IngBuild.open({ name: 'the_forge.html', text: h }); const r = document.querySelector('input[name="kitWhat"][value="editor"]'); if (r) { r.checked = true; r.dispatchEvent(new Event('change', { bubbles: true })); }
      const i = document.getElementById('kitId'); i.value = fbKnown.forge.id; i.dispatchEvent(new Event('input', { bubbles: true })); }, R.page);
    await p.waitForTimeout(800);
    const bnm = await p.evaluate(() => ({ large: IngBuild.large(), editor: document.getElementById('codeEditor').value.length, name: document.getElementById('kitName').value }));
    const brows = await p.evaluate(() => [...document.querySelectorAll('#shipList .ship-row')].map(r => r.querySelector('.ship-zip').textContent));
    ok(bnm.large && bnm.name === 'The Forge' && brows.includes('the_forge_windows_' + FS + '.zip') && brows.includes('the_forge_web_' + FS + '.zip'), 'the old Build page, holding the Forge\'s page part by part, names the app from it and its rows name the Forge\'s own packages', { held: bnm, rows: brows });
    const bw = await collect('build_rows', () => p.evaluate(async () => { const ids = KIT_ROWS.map(d => d[0]), note = document.getElementById('shipNote');
      for (const id of ['windows', 'mac', 'macarm', 'fire', 'iphone', 'web']) { note.textContent = ''; document.querySelectorAll('#shipList .ship-row')[ids.indexOf(id)].click(); const t0 = Date.now();
        while (!/offered|Could not/.test(note.textContent) && Date.now() - t0 < 180000) await new Promise(r => setTimeout(r, 200));
        if (/Could not/.test(note.textContent)) return; await new Promise(r => setTimeout(r, 300)); } }), 6);
    const bnote = await p.evaluate(() => (document.getElementById('shipNote') || {}).textContent);
    ok(bw.map(x => path.basename(x)).sort().join() === ['the_forge_fire_' + FS + '.zip', 'the_forge_ios_' + FS + '.zip', 'the_forge_mac_' + FS + '.zip', 'the_forge_mac_mini_' + FS + '.zip', 'the_forge_web_' + FS + '.zip', 'the_forge_windows_' + FS + '.zip'].join() && /READ ME FIRST\.txt/.test(bnote),
      'the old Build page\'s rows save the Forge\'s six packages, and point to its READ ME FIRST', { files: bw.map(x => path.basename(x)), note: bnote });
    for (const f of bw) forgePackage(f, 'Build page');

    // ---------- 8. a plain app with no templates: the generic kits, made its own ----------
    const tide = await p.evaluate(async () => { const c = document.createElement('canvas'); c.width = 256; c.height = 256; const x = c.getContext('2d');
      x.fillStyle = '#0d6a58'; x.beginPath(); x.arc(128, 128, 120, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff'; x.font = '600 120px Georgia'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('T', 128, 136);
      const icon = c.toDataURL('image/png');
      const html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Tide Clock</title><link rel="icon" sizes="256x256" href="' + icon + '"></head><body><h1>Tide Clock</h1><p>High water at six.</p></body></html>';
      const r = await IngRepo.create({ name: 'Tide Clock' }); await IngRepo.put(r.id, 'index.html', html); await IngRepo.commit(r.id, 'First version');
      const store = await kitStore(), orig = {};
      for (const id of ['windows', 'mac', 'macarm', 'fire', 'iphone', 'ipad']) { const k = kitAssemble(store, id, { isNew: false, name: 'Ingenium', id: 'x.y', file: 'Ingenium' }, '<html></html>');
        orig[id] = { names: k.entries.map(e => e.name), zip: k.zip, icons: k.entries.filter(e => /\.(png|ico|icns)$/.test(e.name)).length }; }
      return { icon: icon.slice(22), orig }; });
    const TIDE = path.join(REF, 'tide_icon.png'); fs.writeFileSync(TIDE, Buffer.from(tide.icon, 'base64'));
    ok(Object.values(tide.orig).every(o => /^Ingenium-/.test(o.zip)) && tide.orig.windows.names.some(n => /\/ingenium\.ico$/.test(n)), 'Ingenium\'s own kit is still Ingenium\'s (its own names, icons and files)', Object.values(tide.orig).map(o => o.zip));
    await p.evaluate(() => { go('fabrica'); }); await p.waitForTimeout(1200);
    await p.evaluate(() => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => /Tide Clock/.test(x.textContent)); if (t) t.click(); }); await p.waitForTimeout(1500);
    const tk = await collect('tide_kits', async () => { await p.evaluate(kf => { const e = document.querySelector('#fbTargets .f-tg[data-k="kits"]'); eval(kf)(e).click(); }, keyOf); await p.waitForTimeout(600);
      await p.evaluate(() => { const s = [...document.querySelectorAll('.f-sheet')].pop(); s.querySelectorAll('.f-opt').forEach(o => { if (o.getAttribute('aria-pressed') !== 'true') o.click(); }); [...s.querySelectorAll('button')].find(x => /^Make kits for \d+ devices?$/.test(x.textContent)).click(); }); }, 6);
    const tnames = tk.map(x => path.basename(x)).sort();
    ok(tnames.join() === ['TideClock-Fire-Tablet-Kit.zip', 'TideClock-Mac-Apple-Silicon-Kit.zip', 'TideClock-Mac-Kit.zip', 'TideClock-Windows-Kit.zip', 'TideClock-iPad-Kit.zip', 'TideClock-iPhone-Kit.zip'].join(), 'a plain app\'s Build kits: six kits, named for the app', tnames);
    const KITID = { 'TideClock-Windows-Kit.zip': 'windows', 'TideClock-Mac-Kit.zip': 'mac', 'TideClock-Mac-Apple-Silicon-Kit.zip': 'macarm', 'TideClock-Fire-Tablet-Kit.zip': 'fire', 'TideClock-iPhone-Kit.zip': 'iphone', 'TideClock-iPad-Kit.zip': 'ipad' };
    const OLD = ['ingenium.html', 'ingenium_app.py', 'ingenium_win.spec', 'ingenium.spec', 'ingenium.ico', 'ingenium.icns', 'ingenium.png', 'Ingenium.iss', 'make_ingenium_icon.py', 'Build Ingenium (Windows).bat', 'Run Ingenium (Windows).bat', 'Ingenium-Setup.exe', 'ingenium_android_project', 'ingenium_ios_project'];
    // the shell's and engine's own sources keep their makers' names (the Java package and its native calls, the iPhone target's folder)
    const SHELL_SRC = /\/java\/com\/[^/]+\/ingenium\/|\/cpp\/ingenium_jni\.cpp$|\/native\/ingenium_engine\.(cpp|h)$|_ios_project\/Ingenium\//;
    for (const f of tk) { const id = KITID[path.basename(f)]; if (!id) continue; const desk = /windows|mac/.test(id);
      const origNames = tide.orig[id].names.map(n => n.split('/').slice(2).join('/')).filter(Boolean);
      const r = kc(f, { app_ref: TIDE, ing_refs: ING, ing_icon_sha256: ING_SHA, orig_names: origNames, old_names: OLD,
        build_globs: ['\\.github/workflows/', '\\.spec$', '\\.iss$', '\\.bat$', '\\.command$', '\\.gradle$', 'project\\.yml$', 'make_[^/]*_icon\\.py$', 'tools/app_name\\.py$'],
        read: ['/app\\.json$', '\\.iss$', '_win\\.spec$', '[^/]\\.spec$', '\\.github/workflows/build-[^/]*\\.yml$', '/START_HERE\\.txt$', 'Info\\.plist$', 'WINDOWS_README\\.txt$', 'project\\.yml$', '_app\\.py$'], read_max: 60000 });
      checked.push(['plain app', path.basename(f), r]);
      const rd = k => ((r.read || {})[k] || {}).text || '';
      let aj = {}; try { aj = JSON.parse(rd('/app\\.json$')); } catch (e) {}
      ok(aj.name === 'Tide Clock' && aj.app_id === 'com.yannieforest.tideclock' && aj.file_name === 'TideClock', path.basename(f) + ': app.json names the app, its id and its file stem', aj);
      const iconFiles = [...new Set((r.icons || []).map(i => i.name))];
      ok(iconFiles.length >= tide.orig[id].icons && iconsOk(r, tide.orig[id].icons), path.basename(f) + ': every icon file (as many as Ingenium\'s own kit has: ' + tide.orig[id].icons + ') holds the app\'s own icon, in the same formats and sizes, and none is Ingenium\'s', { files: iconFiles.map(n => n.split('/').pop()), ...iconSay(r) });
      const badPaths = (r.ing_paths || []).filter(n => !SHELL_SRC.test(n));
      ok(badPaths.length === 0, path.basename(f) + ': no file name carries Ingenium' + (desk ? '' : ' (the shell\'s Java package, native calls and iPhone target folder keep their makers\' names)'), badPaths.slice(0, 8));
      ok(r.refs && r.refs.missing.length === 0 && r.refs.old.length === 0, path.basename(f) + ': every file its build files name is in it, and no file still names an old one', r.refs);
      if (id === 'windows') { const iss = rd('\\.iss$'), spec = rd('_win\\.spec$'), wf = rd('\\.github/workflows/build-[^/]*\\.yml$'), sh = rd('/START_HERE\\.txt$'), rm = rd('WINDOWS_README\\.txt$');
        ok(/#define AppName "Tide Clock"/.test(iss) && /#define AppFile "TideClock"/.test(iss) && /#define AppIdent "com\.yannieforest\.tideclock"/.test(iss) && /SetupIconFile=\{#RepoDir\}\\tideclock\.ico/.test(iss) && ((r.read || {})['\\.iss$'] || {}).name.endsWith('installer/TideClock.iss'),
          'the Windows kit: its installer script (installer/TideClock.iss) names the app, its file stem, its id and its icon', iss.split('\n').filter(l => /define App(Name|File|Ident) |SetupIconFile/.test(l)).join(' | '));
        ok(/icon='tideclock\.ico'/.test(spec) && /\('tideclock\.html', '\.'\)/.test(spec) && /\['tideclock_app\.py'\]/.test(spec) && /^name: Build Tide Clock for Windows$/m.test(wf) && /tideclock_win\.spec/.test(wf) && /installer\\TideClock\.iss/.test(wf),
          'the Windows kit: its build recipe (tideclock_win.spec) and build file name the app\'s own icon, page and shell, and the build file is named for it', { spec: /icon='[^']*'/.exec(spec), wf: /^name: .*$/m.exec(wf) });
        ok(!/Build Ingenium|Ingenium\.iss|ingenium\.html|Ingenium-Setup|Ingenium\.exe/.test(sh) && /Build Tide Clock[\s\S]{0,4}\(Windows\)\.bat/.test(sh) && /^Tide Clock for Windows/.test(rm) && !/Ingenium/.test(rm),
          'the Windows kit: its guide and the read-me installed with it name the app\'s own files, not Ingenium\'s', { guide: (sh.match(/Build [A-Z][a-z]+[^\n]{0,30}/) || [])[0], readme: rm.split('\n')[0] }); }
      if (id === 'mac') { const spec = rd('[^/]\\.spec$'), wf = rd('\\.github/workflows/build-[^/]*\\.yml$');
        ok(/'tideclock\.icns'/.test(spec) && /\['tideclock_app\.py'\]/.test(spec) && /Tide Clock uses the home network/.test(spec) && /^name: Build Tide Clock for Mac$/m.test(wf) && ((r.read || {})['[^/]\\.spec$'] || {}).name.endsWith('/tideclock.spec'),
          'the Mac kit: its build recipe (tideclock.spec) names the app\'s icon and shell, and what macOS shows names the app', /NSLocalNetworkUsageDescription'?: '[^']{0,40}/.exec(spec)); }
      if (id === 'iphone') ok(/<key>CFBundleDisplayName<\/key>\s*<string>Tide Clock<\/string>/.test(rd('Info\\.plist$')) && /Tide Clock uses your home network/.test(rd('Info\\.plist$')), 'the iPhone kit: the name under its icon is the app\'s', /CFBundleDisplayName<\/key>\s*<string>[^<]*/.exec(rd('Info\\.plist$')));
      // (6.7, after review: the iPhone and iPad app's target, product and program, and the cloud build that makes it, take the app's
      // name; the Windows and Mac shells write their crash report and diagnosis under the app's name)
      if (id === 'iphone' || id === 'ipad') { const yml = rd('project\\.yml$'), wf = rd('\\.github/workflows/build-[^/]*\\.yml$');
        ok(/^name: TideClock$/m.test(yml) && /^  TideClock:$/m.test(yml) && /^\s+PRODUCT_NAME: TideClock$/m.test(yml) && /-project TideClock\.xcodeproj -scheme TideClock\b/.test(wf) && /Release-iphoneos\/TideClock\.app Payload\//.test(wf) && !/Ingenium\.app|Ingenium\.xcodeproj|-scheme Ingenium|PRODUCT_NAME: Ingenium|^name: Ingenium$/m.test(yml + '\n' + wf),
          path.basename(f) + ': the Xcode project, its target, its program and the cloud build that makes them are named for the app', { yml: (yml.match(/^(name|  [A-Za-z]+:$|\s+PRODUCT_NAME:).*$/mg) || []).slice(0, 4), wf: (wf.match(/xcodebuild[^\n]*|cp -R [^\n]*/g) || []).slice(0, 2) }); }
      if (desk) { const app = rd('_app\\.py$'), guide = rd('/START_HERE\\.txt$');
        ok(/tideclock_crash\.log/.test(app) && /tideclock_diag\.txt/.test(app) && !/ingenium_crash\.log|ingenium_diag\.txt/.test(app + guide),
          path.basename(f) + ': the shell writes its crash report and diagnosis under the app\'s name, and the guide names them so', (app.match(/[a-z_]+_(crash\.log|diag\.txt)/g) || []).slice(0, 4)); }
    }

    // ---------- 8b. a kit Fabrica kept from before this version is let go, once ----------
    const old = await p.evaluate(async () => {
      const since = IngKits._.since(), key = 'r178-test|old|kits|TheForge-Windows-Kit.zip';
      const open = () => new Promise((res, rej) => { const q = indexedDB.open('fabrica_made', 1); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); });
      const kits = d => new Promise(res => { const q = d.transaction('meta').objectStore('meta').getAll(); q.onsuccess = () => res(q.result.filter(m => m.kind === 'kits')); });
      const d = await open(), before = await kits(d);
      await new Promise((res, rej) => { const t = d.transaction(['meta', 'bytes'], 'readwrite');
        t.objectStore('meta').put({ key, repo: 'r178-test', commit: 'old', kind: 'kits', name: 'TheForge-Windows-Kit.zip', mime: 'application/zip', size: 3, at: since - 60000 }, key);
        t.objectStore('bytes').put(new Uint8Array([1, 2, 3]), key); t.oncomplete = res; t.onerror = () => rej(t.error); });
      d.close();
      const n = await IngKits._.forgetOldKits(since);
      const d2 = await open(), after = await kits(d2), b = await new Promise(res => { const q = d2.transaction('bytes').objectStore('bytes').get(key); q.onsuccess = () => res(q.result); }); d2.close();
      return { since: since > 0, let_go: n, kept_before: before.length, kept_after: after.length, old_gone: !after.some(m => m.key === key) && b === undefined, same: before.map(m => m.key).sort().join() === after.map(m => m.key).sort().join() };
    });
    ok(old.since && old.let_go === 1 && old.old_gone && old.same && old.kept_before >= 5, 'a kit Fabrica kept from before this version (made from Ingenium\'s files) is let go, so Save it again cannot hand it back; the kits made since stay', old);

    // ---------- 9. the Windows desktop app's own saving ----------
    const winApp = WINAPP_ARG || '/home/user/Ingenium-HPWindows/ingenium_app.py';
    if (fs.existsSync(winApp)) {
      const SAVED = path.join(OUT, 'kits_saved_by_windows_app'); fs.rmSync(SAVED, { recursive: true, force: true }); const port = 18677;
      const srv = cp.spawn('python3', ['-I', path.join(__dirname, 't_67_winsave.py'), winApp, SAVED, String(port)], { stdio: ['ignore', 'pipe', 'pipe'] });
      let up = ''; srv.stdout.on('data', d => { up += d; }); let serr = ''; srv.stderr.on('data', d => { serr += d; });
      for (let i = 0; i < 80 && !/"port"/.test(up); i++) await new Promise(r => setTimeout(r, 250));
      ok(/"save_file": true/.test(up), 'the Windows app\'s back end (ingenium_app.py) answers save_file here, its window stood in for', up.trim() || serr.slice(-300));
      await p.evaluate(port => { window.__winSaves = []; const td = s => { const bin = atob(s), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; };
        window.pywebview = { api: { save_file: (name, mime, b64) => crypto.subtle.digest('SHA-256', td(b64)).then(h => { const hex = [...new Uint8Array(h)].map(v => v.toString(16).padStart(2, '0')).join('');
          return fetch('http://127.0.0.1:' + port + '/save', { method: 'POST', body: JSON.stringify([name, mime, b64]) }).then(r => r.json()).then(j => { window.__winSaves.push({ name, made: hex, size: td(b64).length, saved: j }); return j.path; }); }) } }; }, port);
      // the Forge's five packages (Fabrica's Build kits), its Windows app, and the plain app's Windows kit, saved one after another
      await p.evaluate(() => { go('fabrica'); }); await p.waitForTimeout(1000);
      await p.evaluate(() => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => /The Forge/.test(x.textContent)); if (t) t.click(); }); await p.waitForTimeout(1500);
      await p.evaluate(kf => { const e = document.querySelector('#fbTargets .f-tg[data-k="kits"]'); eval(kf)(e).click(); }, keyOf); await p.waitForTimeout(600);
      await p.evaluate(() => { const s = [...document.querySelectorAll('.f-sheet')].pop(); s.querySelectorAll('.f-opt').forEach(o => { if (o.getAttribute('aria-pressed') !== 'true') o.click(); }); [...s.querySelectorAll('button')].find(x => /^Make kits for \d+ devices?$/.test(x.textContent)).click(); });
      await p.waitForFunction(() => window.__winSaves.length >= 5, null, { timeout: 300000 }).catch(() => {}); await p.waitForTimeout(1500);
      await p.evaluate(kf => { const e = document.querySelector('#fbTargets .f-tg[data-k="win"]'); eval(kf)(e).click(); }, keyOf);
      await p.waitForFunction(() => window.__winSaves.length >= 6, null, { timeout: 300000 }).catch(() => {}); await p.waitForTimeout(1500);
      await p.evaluate(() => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => /Tide Clock/.test(x.textContent)); if (t) t.click(); }); await p.waitForTimeout(1500);
      await p.evaluate(kf => { const e = document.querySelector('#fbTargets .f-tg[data-k="kits"]'); eval(kf)(e).click(); }, keyOf); await p.waitForTimeout(600);
      await p.evaluate(() => { const s = [...document.querySelectorAll('.f-sheet')].pop(); s.querySelectorAll('.f-opt').forEach(o => { const w = /Windows/.test(o.textContent); if ((o.getAttribute('aria-pressed') === 'true') !== w) o.click(); }); [...s.querySelectorAll('button')].find(x => /^Make kits for \d+ devices?$/.test(x.textContent)).click(); });
      await p.waitForFunction(() => window.__winSaves.length >= 7, null, { timeout: 300000 }).catch(() => {}); await p.waitForTimeout(1500);
      const ws = await p.evaluate(() => window.__winSaves.map(s => ({ name: s.name, made: s.made, size: s.size, path: s.saved.path, offered: s.saved.offered, onDisk: s.saved.sha256, diskSize: s.saved.size })));
      const want = ['the_forge_fire_' + FS + '.zip', 'the_forge_ios_' + FS + '.zip', 'the_forge_mac_' + FS + '.zip', 'the_forge_mac_mini_' + FS + '.zip', 'the_forge_windows_' + FS + '.zip'];
      ok(ws.length === 7 && want.every(n => ws.some(s => s.name === n)) && /^The-Forge-windows-.*\.zip$/.test(ws[5].name) && ws[6].name === 'TideClock-Windows-Kit.zip',
        'through the Windows app\'s saving: the Forge\'s five packages, its Windows app and the plain app\'s Windows kit are each saved', ws.map(s => s.name));
      ok(ws.length && ws.every(s => s.offered === s.name && path.basename(s.path || '') === s.name && s.made === s.onDisk && s.size === s.diskSize),
        'each lands under its own name (the name the save dialog was offered), with exactly the bytes made (SHA-256 on disk = SHA-256 made)', ws.map(s => s.name + ' ' + (s.made === s.onDisk ? 'same' : 'DIFFERENT') + ' ' + s.size));
      ok(new Set(ws.map(s => s.made)).size === ws.length, 'no file stands in for another: seven saves, seven different packages', ws.map(s => s.made.slice(0, 12)));
      const sw = ws.find(s => s.name === 'the_forge_windows_' + FS + '.zip'), swr = sw && sw.path ? forgePackage(sw.path, 'Windows app\'s saving') : null;
      const sx = ws[5] && ws[5].path ? kc(ws[5].path, { app_ref: SEAL, ing_refs: ING, ing_icon_sha256: ING_SHA, page_sha256: PAGE_SHA }) : {};
      ok(iconsOk(sx, 6) && (sx.page_entries || []).length === 1, 'the Forge\'s Windows app, saved by the Windows app, carries the Forge\'s seal and page', iconSay(sx));
      await p.evaluate(() => { delete window.pywebview; });
      srv.kill();
    } else console.log('NOTE the Windows app\'s ingenium_app.py was not found (' + winApp + '): its saving was not run');

    await p.screenshot({ path: path.join(OUT, 'kits_fabrica.png') });
    // the listings, for whoever reads the run
    const lst = checked.map(([label, name, r]) => label + ' · ' + name + ' (' + ((r.entries || []).length) + ' files)\n' + (r.entries || []).map(e => '    ' + e[0] + '  ' + e[1] + '  ' + e[2].slice(0, 12) + '  ' + (e[3] || 0).toString(8)).join('\n')).join('\n\n');
    fs.writeFileSync(path.join(OUT, 'kits_listings.txt'), lst + '\n');
    console.log('  (every zip\'s listing: ' + path.join(OUT, 'kits_listings.txt') + ')');
  } catch (e) { ok(false, 'the run went through', e.stack ? e.stack.slice(0, 900) : String(e)); }
  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('CRASH ' + e.message); process.exit(2); });
