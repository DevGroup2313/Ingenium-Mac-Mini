// Ingenium 7.29: every package Fabrica makes for her own apps, read apart from the page that made it. Her words (17 November 2026):
// "I don't want to keep seeing Ingenium's own app files and logo when I try to ship a new version of the Forge or Carpe Diem or
// Inkwell or any future app that I choose to make. I want Ingenium to actually build and create ready-made apps and build kits for
// all of my devices accurately and without errors, bugs, or missing files or documents. I want the apps produced with their icons
// and logos as proper apps with no issues." rig/t_67_kits.js checks The Forge (its own templates) and an invented app; the family's
// own apps that ship from the family's packaging (Carpe Diem, Inkwell, Lakay: modules/r299.js) were audited once, on 16 November
// 2026, in a scratch folder. This keeps that audit. For each app, brought in from the app library as she would:
//   - Fabrica's Build kits, all six devices: five kits (one for the iPhone and the iPad), each named <app>_<device>_<stamp>.zip,
//     one folder named for the app, its guide naming the app, every icon the app's own picture and none of Ingenium's, no file
//     named for Ingenium, no text naming Ingenium outside the app's own page (her apps' pages mention Ingenium in their own notes);
//   - the ready-made apps (Ship): the Android app (APK), the iPhone and iPad app (IPA, unsigned, for Sideloadly), the Mac app, the
//     Windows app (its own installer, "<App> Setup.exe") and the web app: the same icon and name rules; the APK's label, the IPA's
//     and the Mac app's Info.plist give the app's own name; the Windows program names the app as Windows reads it, and installs as
//     "<App>.exe" with shortcuts named "<App>" (rig/verify_desktop_app.py); the Mac app's seal holds;
//   - no page errors.
//   node rig/t_729_family_real.js <page url> <out folder> [cd,inkwell,lakay]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process'); const crypto = require('crypto');
const [U, OUT, ONLY] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const APPS = { cd: 'Carpe Diem', inkwell: 'Inkwell', lakay: 'Lakay', forge: 'The Forge' };
const KEYS = (ONLY || 'cd,inkwell,lakay').split(',').filter(k => APPS[k]);
const OWNER = 'Ada Quill';
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const KC = path.join(__dirname, 'kit_check.py'), VERIFY = path.join(__dirname, 'verify_desktop_app.py');
const REF = path.join(OUT, 'refs'); fs.rmSync(OUT + '/made', { recursive: true, force: true }); fs.mkdirSync(REF, { recursive: true });
let nspec = 0;
const kc = (file, spec) => { const sp = path.join(REF, 'spec_' + (++nspec) + '.json'); fs.writeFileSync(sp, JSON.stringify(spec));
  const r = cp.spawnSync('python3', ['-I', KC, file, sp], { encoding: 'utf8', maxBuffer: 1 << 28 }); try { return JSON.parse(r.stdout.trim().split('\n').pop()); } catch (e) { return { error: (r.stderr || r.stdout).slice(-1500) }; } };
const verify = (kind, file, id, title) => { const r = cp.spawnSync('python3', ['-I', VERIFY, kind, file, id, title], { encoding: 'utf8', maxBuffer: 1 << 26 }); try { return JSON.parse(r.stdout.trim().split('\n').pop()); } catch (e) { return { faults: ['no report: ' + (r.stdout + r.stderr).slice(-400)] }; } };
// what a package says its app is called, read as each system reads it: the APK's resource table, the IPA's and Mac app's Info.plist
const PEEK = `
import sys, zipfile, plistlib, json, re
z = zipfile.ZipFile(sys.argv[1]); title = sys.argv[2]; out = {}
names = z.namelist()
import hashlib
if sys.argv[1].endswith('.exe'):
    for n in names:
        if n.startswith('__setup/') or n in ('shell.json', 'shell.txt'):
            out.setdefault('inner', {})[n] = z.read(n).decode('utf-8', 'replace').count('Ingenium')
    print(json.dumps(out)); sys.exit(0)
if re.search(r'_web_[^/]*\\.zip$', sys.argv[1]):
    idx = [n for n in names if n.endswith('/index.html')]
    if idx:
        b = z.read(idx[0]); added = re.search(rb'<link rel="manifest" href="manifest\\.webmanifest"><link rel="icon" href="favicon\\.ico"><link rel="apple-touch-icon" href="icons/apple-touch-icon\\.png"><script>if\\("serviceWorker" in navigator.*?</script>', b, re.S)
        out['web_added'] = len(added.group(0)) if added else 0
        out['web_page_sha'] = hashlib.sha256(b[:added.start()] + b[added.end():] if added else b).hexdigest()
if sys.argv[1].endswith('.apk'):
    arsc = z.read('resources.arsc') if 'resources.arsc' in names else b''
    man0 = z.read('AndroidManifest.xml') if 'AndroidManifest.xml' in names else b''
    out['label_in_manifest'] = title.encode('utf-16-le') in man0 or title.encode('utf-8') in man0
    out['label_in_resources'] = (title.encode('utf-16-le') in arsc) or (title.encode('utf-8') in arsc)
    out['ingenium_in_resources'] = (b'I\\x00n\\x00g\\x00e\\x00n\\x00i\\x00u\\x00m' in arsc) or (b'Ingenium' in arsc)
    man = z.read('AndroidManifest.xml') if 'AndroidManifest.xml' in names else b''
    out['ingenium_in_manifest'] = (b'I\\x00n\\x00g\\x00e\\x00n\\x00i\\x00u\\x00m' in man) or (b'ingenium' in man.lower())
    out['signed_v1'] = any(n.startswith('META-INF/') and n.endswith(('.RSA', '.EC', '.DSA')) for n in names)
else:
    pl = [n for n in names if re.search(r'(\\.app/Info\\.plist|\\.app/Contents/Info\\.plist)$', n)]
    if pl:
        p = plistlib.loads(z.read(pl[0])); out['plist'] = pl[0]
        out['name'] = p.get('CFBundleName'); out['display'] = p.get('CFBundleDisplayName'); out['id'] = p.get('CFBundleIdentifier')
        out['version'] = p.get('CFBundleShortVersionString'); out['copyright'] = p.get('NSHumanReadableCopyright'); out['exe'] = p.get('CFBundleExecutable')
        out['ingenium_in_plist'] = 'ingenium' in json.dumps(p, default=str).lower()
    out['app_dirs'] = sorted({m.group(1) for n in names for m in [re.search(r'([^/]+\\.app)/', n)] if m})
print(json.dumps(out))
`;
const peek = (file, title) => { const r = cp.spawnSync('python3', ['-I', '-c', PEEK, file, title], { encoding: 'utf8', maxBuffer: 1 << 26 }); try { return JSON.parse(r.stdout.trim()); } catch (e) { return { error: (r.stderr || r.stdout).slice(-600) }; } };

(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1500, height: 1000 }, acceptDownloads: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  const downloads = []; p.on('download', d => downloads.push(d));
  async function collect(dir, fn, n, timeout = 420000) { const n0 = downloads.length; await fn(); const t0 = Date.now();
    while (downloads.length < n0 + n && Date.now() - t0 < timeout) await p.waitForTimeout(250);
    await p.waitForTimeout(1200); fs.mkdirSync(dir, { recursive: true }); const out = [];
    for (const d of downloads.slice(n0)) { const f = path.join(dir, d.suggestedFilename()); await d.saveAs(f); out.push(f); } return out; }
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  await p.evaluate(o => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.persona = Object.assign({}, state.persona || {}, { name: o }); if (window.IngPublisher) IngPublisher.set(o, true); }, OWNER);
  await p.waitForFunction(() => window.__ingBuiltin && window.__ingBuiltin.states, null, { timeout: 120000 }).catch(() => {});

  // Ingenium's own icons: every icon file in its kit store, and its seal (as rig/t_67_kits.js takes them)
  const R = await p.evaluate(async () => { const store = await kitStore(); const f = (s, q) => (store.files.find(x => x.s === s && x.p === q) || {}).b || '';
    const u = sealBytes(512); let s = ''; for (let i = 0; i < u.length; i += 32768) s += String.fromCharCode.apply(null, u.subarray(i, i + 32768));
    return { ingWin: f('windows', 'ingenium.png'), ingIos: f('fire', 'ingenium_ios_project/Ingenium/Assets.xcassets/AppIcon.appiconset/icon-1024.png'), ingSeal: btoa(s),
      ingSha: await Promise.all(store.files.filter(x => /\.(png|ico|icns|svg)$/i.test(x.p)).map(x => x.b != null ? Uint8Array.from(atob(x.b), c => c.charCodeAt(0)) : new TextEncoder().encode(x.t || '')).concat([u])
        .map(b => crypto.subtle.digest('SHA-256', b).then(h => [...new Uint8Array(h)].map(v => v.toString(16).padStart(2, '0')).join('')))) }; });
  const ING = ['ing_win512.png', 'ing_ios1024.png', 'ing_seal512.png'].map((n, i) => { const f = path.join(REF, n); fs.writeFileSync(f, Buffer.from([R.ingWin, R.ingIos, R.ingSeal][i], 'base64')); return f; });
  ok(R.ingWin.length > 1000 && R.ingSeal.length > 1000 && R.ingSha.length > 10, 'Ingenium\'s own icons read, to tell them apart', { icons: R.ingSha.length });
  const iconsOk = (r, n) => (r.icons || []).length >= n && !(r.icons || []).some(i => i.bad) && r.icon_worst_app < 10 && r.icon_nearest_ing > 12 && r.icon_least_ratio >= 1.5 && (r.ing_icon_bytes || []).length === 0;
  const iconSay = r => ({ pics: (r.icons || []).length, worst_from_app: r.icon_worst_app, nearest_to_ingenium: r.icon_nearest_ing, least_ratio: r.icon_least_ratio, ingenium_bytes: r.ing_icon_bytes, err: r.error });
  // a text naming Ingenium outside the app's own page: the page is the one large file (nine tenths of its size or more) or its exact copy
  const textsOutside = (r, pageLen) => Object.keys(r.texts_naming_ingenium || {}).filter(n => { const e = (r.entries || []).find(x => x[0] === n); return !(e && e[1] >= pageLen * 0.9) && !(r.page_entries || []).includes(n); });

  const summary = [];
  for (const key of KEYS) {
    const title = APPS[key]; const dir = path.join(OUT, 'made', key);
    // the app's own page, its picture (as r178's ownPicture finds it: the page's own icon, else its seal), its fingerprint
    const A = await p.evaluate(async k => { const page = await libText(k); let src = null; try { src = IngApk.iconSource(page); } catch (e) {}
      if (!src && window.ING_SEALS && ING_SEALS[k]) src = 'data:image/png;base64,' + ING_SEALS[k].b64;
      const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(page)); return { len: page.length, bytes: new TextEncoder().encode(page).length, sha: [...new Uint8Array(h)].map(v => v.toString(16).padStart(2, '0')).join(''), icon: src ? src.slice(src.indexOf(',') + 1) : '', iconKind: src ? src.slice(5, src.indexOf(';')) : '' }; }, key);
    const APPREF = path.join(REF, key + '_picture.png');
    if (A.iconKind === 'image/png') fs.writeFileSync(APPREF, Buffer.from(A.icon, 'base64'));
    else { const raw = path.join(REF, key + '_picture.raw'); fs.writeFileSync(raw, Buffer.from(A.icon, 'base64')); cp.spawnSync('python3', ['-I', '-c', 'import sys;from PIL import Image;Image.open(sys.argv[1]).convert("RGBA").save(sys.argv[2])', raw, APPREF]); }
    ok(A.len > 100000 && fs.existsSync(APPREF), title + ': its page from the app library, and its own picture', { bytes: A.bytes, picture: A.iconKind });

    // brought in from the app library, as she would (Fabrica, Bring one in)
    await p.evaluate(() => { go('fabrica'); }); await p.waitForTimeout(1500);
    await p.evaluate(() => document.getElementById('fbBring').click()); await p.waitForTimeout(600);
    await p.evaluate(t => { const re = new RegExp('^' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      const tile = [...document.querySelectorAll('.f-sheet .f-tile')].find(x => re.test((x.querySelector('b') || x).textContent.trim())); if (tile) { tile.click(); return; }
      const o = [...document.querySelectorAll('.f-sheet .f-opt')].find(x => /From your app library/.test(x.textContent)); if (o) o.click(); }, title); await p.waitForTimeout(600);
    await p.evaluate(t => { const o = [...document.querySelectorAll('.f-sheet .f-opt')].find(x => x.textContent.trim().replace(/^♦\s*/, '').startsWith(t)); if (o) o.click(); }, title);
    await p.waitForFunction(t => [...document.querySelectorAll('#fbRepos .f-repo')].some(x => x.textContent.includes(t)), title, { timeout: 180000 }).catch(() => {});
    await p.waitForTimeout(1500);
    await p.evaluate(t => { const r = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => x.textContent.includes(t)); if (r) r.click(); }, title); await p.waitForTimeout(1800);
    const rec = await p.evaluate(async t => { const list = await IngRepo.list(); const r = list.filter(x => (x.name || '').includes(t)).sort((a, b) => (b.updated || 0) - (a.updated || 0))[0];
      if (!r) return null; const pk = window.fbHubHost.pkgOf(r); return { id: r.id, name: r.name, pkg: pk, cards: [...document.querySelectorAll('#fbTargets .f-tg')].map(e => e.getAttribute('data-k')) }; }, title);
    ok(!!rec && rec.cards.includes('kits') && rec.pkg && rec.pkg.title === title, title + ': brought in from the app library, its package details name it', rec && { name: rec.name, pkg: rec.pkg, cards: rec.cards });
    if (!rec) continue;
    const ID = rec.pkg.id;

    // ---------- Fabrica's Build kits, all six devices ----------
    const keyOf = e => [...(e.parentElement || e).querySelectorAll('button')].find(x => /^Make and save/.test(x.textContent));
    const kits = await collect(path.join(dir, 'kits'), async () => {
      await p.evaluate(kf => { const e = document.querySelector('#fbTargets .f-tg[data-k="kits"]'); eval(kf)(e).click(); }, String(keyOf)); await p.waitForTimeout(700);
      await p.evaluate(() => { const s = [...document.querySelectorAll('.f-sheet')].pop(); s.querySelectorAll('.f-opt').forEach(o => { if (o.getAttribute('aria-pressed') !== 'true') o.click(); });
        [...s.querySelectorAll('button')].find(x => /^Make kits for \d+ devices?$/.test(x.textContent)).click(); }); }, 5);
    const kn = kits.map(f => path.basename(f)).sort(); const stem = rec.pkg.file || '';
    ok(kn.length === 5 && ['fire', 'ios', 'mac', 'mac_mini', 'windows'].every(d => kn.some(n => new RegExp('_' + d + '_[^_]+\\.zip$').test(n) && !/ingenium/i.test(n))),
      title + ': Build kits: five kits, one for each device (one for the iPhone and the iPad), named for the app', kn);
    for (const f of kits) { const nm = path.basename(f);
      const r = kc(f, { app_ref: APPREF, ing_refs: ING, ing_icon_sha256: R.ingSha, page_sha256: A.sha, read: ['READ ME FIRST\\.txt$'], read_max: 20000 });
      const guide = (((r.read || {})['READ ME FIRST\\.txt$']) || {}).text || ''; const out = textsOutside(r, A.bytes);
      ok(iconsOk(r, 1), title + ': ' + nm + ': every icon is the app\'s own picture, none is Ingenium\'s', iconSay(r));
      ok((r.ing_paths || []).length === 0 && out.length === 0, title + ': ' + nm + ': no file named for Ingenium, no text naming it outside the app\'s own page', { paths: (r.ing_paths || []).slice(0, 6), texts: out.slice(0, 8) });
      ok((r.top || []).length === 1 && r.top[0].startsWith(title + ' for ') && guide.includes(title) && (r.page_entries || []).length >= 1, title + ': ' + nm + ': one folder named for the app, its guide naming it, its page inside whole', { top: r.top, guide: guide.split('\n')[0].slice(0, 120), page: (r.page_entries || []).slice(0, 2) });
      summary.push([title, nm, fs.statSync(f).size]); }

    // ---------- the ready-made apps (Ship) ----------
    for (const w of ['apk', 'ipa', 'mac', 'win', 'web']) {
      const made = await collect(path.join(dir, 'ready'), async () => { await p.evaluate(async ([id, w]) => { const r = (await IngRepo.list()).find(x => x.id === id);
        window.__lastMake = 'started'; try { await window.fbHubHost.makeOne(r, w, { quiet: true, named: true }); window.__lastMake = 'done'; } catch (e) { window.__lastMake = 'failed: ' + (e && e.message || e); } }, [rec.id, w]); }, 1);
      const said = await p.evaluate(() => window.__lastMake); const f = made[0]; const nm = f ? path.basename(f) : '(nothing saved)';
      ok(!!f && said === 'done' && !/ingenium/i.test(nm), title + ': Ship, ' + w + ': made and saved as ' + nm, { said, files: made.map(x => path.basename(x)) });
      if (!f) continue; summary.push([title, nm, fs.statSync(f).size]);
      const r = kc(f, { app_ref: APPREF, ing_refs: ING, ing_icon_sha256: R.ingSha, page_sha256: A.sha }); const out = textsOutside(r, A.bytes);
      ok(iconsOk(r, 1), title + ': ' + nm + ': every icon is the app\'s own picture, none is Ingenium\'s', iconSay(r));
      ok((r.ing_paths || []).length === 0 && out.length === 0, title + ': ' + nm + ': no file named for Ingenium, no text naming it outside the app\'s own page', { paths: (r.ing_paths || []).slice(0, 6), texts: out.slice(0, 8) });
      if (w === 'web') { const k = peek(f, title); ok((r.page_entries || []).length >= 1 || (k.web_page_sha === A.sha && k.web_added > 0), title + ': ' + nm + ': the app\'s own page is inside, whole (a web app: with only its manifest, icons and offline helper linked in)', { exact: (r.page_entries || []).slice(0, 2), added: k.web_added, same_without_them: k.web_page_sha === A.sha }); }
      else ok((r.page_entries || []).length >= 1, title + ': ' + nm + ': the app\'s own page is inside, whole', (r.page_entries || []).slice(0, 3));
      if (w === 'apk') { const k = peek(f, title); ok((k.label_in_manifest || k.label_in_resources) && !k.ingenium_in_resources && !k.ingenium_in_manifest && k.signed_v1, title + ': the APK is labelled with the app\'s name (in its manifest, where Android reads it), names no Ingenium, and is signed', k); }
      if (w === 'ipa') { const k = peek(f, title); ok(k.plist && (k.display === title || k.name === title) && !k.ingenium_in_plist && (k.app_dirs || []).length === 1 && /^Payload\//.test(k.plist), title + ': the IPA\'s Info.plist gives the app\'s name, and names no Ingenium', k); }
      if (w === 'mac') { const k = peek(f, title); const v = verify('mac', f, ID, title);
        ok(k.plist && k.name === title && !k.ingenium_in_plist && new RegExp(OWNER).test(k.copyright || ''), title + ': the Mac app\'s Info.plist gives the app\'s name and the owner\'s copyright, and names no Ingenium', k);
        ok(v.faults && v.faults.length === 0, title + ': the Mac app\'s seal holds, as macOS reads it', v.faults); }
      if (w === 'win') { const v = verify('win', f, ID, title); const k = peek(f, title);
        ok(k.inner && Object.keys(k.inner).length >= 3 && Object.values(k.inner).every(c => c === 0), title + ': inside the installer, its own files (shell.json, shell.txt, the installer\'s page) name no Ingenium', k.inner || k);
        ok(nm === title + ' Setup.exe' && v.setup === true && v.faults && v.faults.length === 0, title + ': the Windows app is its own installer, ' + title + ' Setup.exe, read as Windows reads it', { setup: v.setup, faults: v.faults });
        ok(v.names && v.names.FileDescription === title && v.names.ProductName === title && v.names.OriginalFilename === title + '.exe' && v.names.CompanyName === OWNER && v.publisher === OWNER,
          title + ': Windows names the program "' + title + '" (its shortcuts and Settings, Apps carry the name, not ".exe"), the owner as its publisher', { names: v.names, publisher: v.publisher }); }
    }
  }
  fs.writeFileSync(path.join(OUT, 'made.json'), JSON.stringify(summary, null, 1));
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(String(e && e.stack || e).slice(0, 1200)); process.exit(2); });
