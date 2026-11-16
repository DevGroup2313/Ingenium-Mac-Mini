// Ingenium 7.23: the ready-made apps Fabrica makes name their own version and their owner, never Ingenium. Her words (16 November 2026): "I
// don't want to keep seeing Ingenium's own app files and logo when I try to ship a new version of the Forge or Carpe Diem or Inkwell or any
// future app that I choose to make." Fabrica's audit of that day (on the family's real apps, in a scratch folder) found each made as 1.0 and
// "Made with Ingenium Fabrica" in a Mac app's copyright and a Windows program's company. Invented apps and an invented owner here:
//   - the version: the family's marks read (window.CD_BUILD's pass, Inkwell's BUILD constant, a lakay-build meta), and a version meta;
//   - a repository known as a family app by its name, as whole words (The Forge, carpe-diem-offline), and not otherwise (Forget Me Not);
//   - an invented app made for a Mac and for Windows: its version inside, the owner's copyright and company, notes without the credit, and
//     the Mac app's seal and the Windows program read as those systems read them (rig/verify_desktop_app.py).
//   node rig/t_723_ready_made.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const { execFileSync } = require('child_process');
const [U, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? pass++ : fail++; };
(async () => { const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200))); const saving = [];
  p.on('download', d => saving.push(d.saveAs(path.join(OUT, d.suggestedFilename())).catch(() => {})));
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.persona = Object.assign({}, state.persona || {}, { name: 'Ada Quill' }); go('fabrica'); });
  await p.waitForTimeout(2500);
  const r = await p.evaluate(async () => { const N = IngShip._.numberOf, o = {};
    o.cd = N('<html><head><title>Tidewater</title></head><body><script>window.CD_BUILD={date:"2026-11-16",pass:"42",stamp:"zz1"};</script></body></html>', {});
    o.ink = N("<html><head><title>Inkwell</title></head><body><script>const BUILD='3.14 · A · B · C';</script></body></html>", {});
    o.lakay = N('<html><head><meta name="lakay-build" content="9"><title>Lakay</title></head></html>', {});
    o.meta = N('<html><head><meta name="version" content="2.3.1"></head></html>', {}); o.none = N('<html><head><title>Plain</title></head></html>', {});
    const H = window.fbHubHost; o.names = {};
    for (const n of ['The Forge', 'carpe-diem-offline', 'Forget Me Not', 'Harbour Garden']) { const made = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>' + n + '</title><p>' + n + '</p>' }], { name: n, msg: 'first' });
      const rec = (await IngRepo.list()).find(x => x.id === made.id); o.names[n] = H.pkgOf(rec).app; }
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>Harbour Garden</title><meta name="version" content="2.3.1"></head><body><h1>Harbour Garden</h1></body></html>';
    const made = await IngRepo.fromFiles([{ path: 'index.html', data: html }], { name: 'Harbour Garden', msg: 'Harbour Garden 2.3.1' }); const rec = (await IngRepo.list()).find(x => x.id === made.id);
    o.pkg = H.pkgOf(rec); o.made = [];
    for (const w of ['mac', 'win']) { try { await H.makeOne(rec, w, { quiet: true }); o.made.push(w); } catch (e) { o.made.push(w + ' failed: ' + e.message); } }
    return o; });
  await Promise.all(saving);
  ok(r.cd === '42' && r.ink === '3.14' && r.lakay === '9' && r.meta === '2.3.1' && r.none === '', 'the version is read from the family\'s marks and a version meta', r);
  ok(r.names['The Forge'] === 'forge' && r.names['carpe-diem-offline'] === 'cd' && r.names['Forget Me Not'] === null && r.names['Harbour Garden'] === null, 'a repository is known as a family app by its name, as whole words only', r.names);
  ok(r.made.join() === 'mac,win', 'Fabrica made the Mac app and the Windows app', r.made);
  const files = fs.readdirSync(OUT); const mac = files.find(f => /-mac-2\.3\.1\.zip$/.test(f)), win = files.find(f => /-windows-2\.3\.1\.zip$/.test(f));
  ok(!!mac && !!win, 'each is named with the app\'s version, 2.3.1', files);
  const V = (kind, f) => { try { return JSON.parse(execFileSync('python3', ['-I', path.join(__dirname, 'verify_desktop_app.py'), kind, path.join(OUT, f), r.pkg.id, 'Harbour Garden']).toString()); } catch (e) { try { return JSON.parse(String(e.stdout)); } catch (x) { return { faults: ['unreadable: ' + String(e).slice(0, 200)] }; } } };
  if (mac) { const m = V('mac', mac); ok(m.faults && m.faults.length === 0, 'the Mac app\'s seal holds, as macOS reads it (every file, Info.plist bound)', m.faults);
    const z = execFileSync('python3', ['-I', '-c', 'import zipfile,plistlib,sys,json;z=zipfile.ZipFile(sys.argv[1]);n=[x for x in z.namelist() if x.endswith("Contents/Info.plist")][0];p=plistlib.loads(z.read(n));h=[x for x in z.namelist() if x.startswith("How to open")];print(json.dumps({"v":p.get("CFBundleShortVersionString"),"c":p.get("NSHumanReadableCopyright"),"how":z.read(h[0]).decode().splitlines()[:3] if h else []}))', path.join(OUT, mac)]).toString();
    const j = JSON.parse(z); ok(j.v === '2.3.1' && /^© \d{4} Ada Quill$/.test(j.c) && !/Ingenium/.test(j.how.join(' ')), 'the Mac app: version 2.3.1, copyright the owner\'s, its notes without Ingenium', j); }
  if (win) { const w = V('win', win); ok(w.faults && w.faults.length === 0 && w.names && w.names.CompanyName === 'Ada Quill' && w.names.FileVersion === '2.3.1' && w.names.FileDescription === 'Harbour Garden', 'the Windows program: its name, version 2.3.1, the owner as its company, read as Windows reads it', w.names || w.faults); }
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0); })().catch((e) => { console.error(String(e).slice(0, 600)); process.exit(2); });
