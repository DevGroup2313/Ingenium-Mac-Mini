// Ingenium 7.25 and 7.26: the publishing name (modules/r309.js). Her requests of 16 November 2026 (her words in source/README.md, 7.25 and
// 7.26): her own name built in only in the master edition, the other editions starting with none; and Fabrica asking every time, in every
// edition, never assuming, the name kept so far in its field, with a choice not to be asked again. Invented owners and an invented app.
// Checks:
//   - the master edition: the owner's name to begin with, asked each time (nothing asked on opening Fabrica); its Ship part says so;
//   - a make asks, the owner's name in the field; another name used; the next make asks again, that name in the field; a Mac app and a
//     Windows app made with it, read as macOS and Windows read them; kept after the page is opened again;
//   - the question closed unanswered: nothing is made;
//   - No name: a Mac app and a Windows app that name no one;
//   - Don't ask me again: the next make asks nothing and uses the name; Change shows the choice, and unticked there, the asking returns;
//   - another edition (ING_EDITION "full", nothing kept): no name, and a make asks with the field empty;
//   - Download as an app shows the publishing name in its dialog;
//   - no page error.
//   node rig/t_725_publisher.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const { execFileSync } = require('child_process');
const [U, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  let dir = path.join(OUT, 'a'); const saving = [];
  p.on('download', d => saving.push(d.saveAs(path.join(dir, d.suggestedFilename())).catch(() => {})));
  const open = async () => { await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); };
  // Fabrica opened, with an invented app (Harbour Garden 2.3.1) open in the Ship part of its Ship room, where the line is
  const fab = async () => { await p.evaluate(() => { go('home'); }); await sleep(600); await p.evaluate(() => { go('fabrica'); }); await sleep(2600);
    await p.evaluate(async () => { const H = window.fbHubHost; let rec = (await IngRepo.list()).find(x => x.name === 'Harbour Garden');
      if (!rec) { const html = '<!doctype html><html><head><meta charset="utf-8"><title>Harbour Garden</title><meta name="version" content="2.3.1"></head><body><h1>Harbour Garden</h1></body></html>';
        const made = await IngRepo.fromFiles([{ path: 'index.html', data: html }], { name: 'Harbour Garden', msg: 'Harbour Garden 2.3.1' }); rec = (await IngRepo.list()).find(x => x.id === made.id); }
      await H.refresh(); H.FBS().sel = rec.id; H.paint(); try { H.setPanel('ship'); } catch (e) {} H.paint(); });
    await sleep(1200); if (await p.$('#fbPart_ship') && !(await p.$('.f-sheet-wrap'))) { await p.click('#fbPart_ship'); await sleep(500); } };
  // the Ship part's plate (7.26): its label and name, its note, its key
  const line = () => p.evaluate(() => { const L = document.getElementById('r309Line'); if (!L) return null; const g = s => ((L.querySelector(s) || {}).textContent || '').replace(/\s+/g, ' ').trim();
    return (L.classList.contains('r309-pl') ? g('.r309-lab') + ' ' : '') + g('.r309-nm') + ' | ' + g('.r309-note') + ' | ' + g('#r309Change'); });
  // the question as it stands: which sheet, the name on its plate (its field's text while a new name is typed), the choice, the tick
  const asking = () => p.evaluate(() => { const s = document.querySelector('[data-r309]'); if (!s) return null; const i = document.getElementById('r309Name'), n = s.querySelector('.r309-nm'), on = s.querySelector('.r309-opt.on'), q = document.getElementById('r309Quiet');
    return { kind: s.getAttribute('data-r309'), title: (s.querySelector('.r309-t') || {}).textContent, value: i ? i.value : (n ? n.textContent : null), choice: on ? on.getAttribute('data-c') : null, quiet: q ? q.getAttribute('aria-checked') : null,
      options: [...s.querySelectorAll('.r309-opt')].map(o => o.getAttribute('data-c')).join(','), seal: !!s.querySelector('.r309-seal'), make: (document.getElementById('r309Save') || {}).textContent }; });
  const pick = (c) => p.click('.r309-opt[data-c="' + c + '"]');
  // a make begun without waiting (as a press does); the question answered in between; then its end awaited
  const begin = (what) => p.evaluate((what) => { window.__made = null; const H = window.fbHubHost; IngRepo.list().then(l => { const rec = l.find(x => x.name === 'Harbour Garden'); return H.makeOne(rec, what, { quiet: true }); }).then(v => { window.__made = v === false ? 'not made' : 'made'; }, e => { window.__made = 'failed: ' + e.message; }); }, what);
  const ended = async () => { for (let i = 0; i < 240; i++) { const v = await p.evaluate(() => window.__made); if (v) return v; await sleep(500); } return 'timeout'; };
  const read = (d) => { const files = fs.existsSync(d) ? fs.readdirSync(d) : [], mac = files.find(f => /-mac-2\.3\.1\.zip$/.test(f)), win = files.find(f => /Setup\.exe$/.test(f)); const o = { files };
    if (mac) o.mac = JSON.parse(execFileSync('python3', ['-I', '-c', 'import zipfile,plistlib,sys,json;z=zipfile.ZipFile(sys.argv[1]);n=[x for x in z.namelist() if x.endswith("Contents/Info.plist")][0];p=plistlib.loads(z.read(n));print(json.dumps({"c":p.get("NSHumanReadableCopyright")}))', path.join(d, mac)]).toString());
    if (win) { try { o.win = JSON.parse(execFileSync('python3', ['-I', path.join(__dirname, 'verify_desktop_app.py'), 'win', path.join(d, win)]).toString()); } catch (e) { try { o.win = JSON.parse(String(e.stdout)); } catch (x) { o.win = { faults: ['unreadable'] }; } } }
    return o; };
  const into = (name) => { dir = path.join(OUT, name); fs.mkdirSync(dir, { recursive: true }); };
  await open();
  // 1. the master edition
  const m0 = await p.evaluate(() => ({ ed: typeof ING_EDITION !== 'undefined' ? ING_EDITION : '', decided: IngPublisher.decided(), name: IngPublisher.name(), quiet: IngPublisher.quiet() }));
  ok(m0.ed === 'master' && m0.decided && m0.name === 'Yannie D. Forest' && !m0.quiet, 'the master edition begins with the owner\'s name, and asks', m0);
  await fab();
  const a0 = await asking(), l0 = await line();
  ok(!a0 && /^Published as Yannie D\. Forest/.test(l0 || '') && /Fabrica asks each time an app is made/.test(l0 || '') && /Change$/.test(l0 || ''), 'opening Fabrica asks nothing; its Ship part shows the Published as plate with the name, that it is asked each time, and Change', { asking: a0, line: l0 });
  // 2. a make asks, the owner's name in the field
  into('named'); await begin('mac'); await sleep(900);
  const a1 = await asking();
  ok(a1 && a1.kind === 'make' && a1.title === 'Publish Harbour Garden as\u2026' && a1.value === 'Yannie D. Forest' && a1.choice === 'name' && a1.options === 'name,new,none' && a1.quiet === 'false' && a1.make === 'Make Harbour Garden',
    'making a Mac app asks "Publish Harbour Garden as…": the owner\'s name on the plate, three choices (as it, a new name, no name), Don\'t ask me again unticked, Make Harbour Garden', a1);
  await pick('new'); await sleep(300); await p.fill('#r309Name', 'Ada Quill'); await p.click('#r309Save');
  const e1 = await ended(); await sleep(800);
  await begin('win'); await sleep(900);
  const a2 = await asking();
  ok(e1 === 'made' && a2 && a2.kind === 'make' && a2.value === 'Ada Quill' && a2.choice === 'name', 'Publish with a new name: kept, and the next make asks again with it on the plate', { first: e1, asking: a2 });
  await p.click('#r309Save'); const e2 = await ended(); await sleep(1500); await Promise.all(saving.splice(0));
  const r1 = read(dir);
  ok(e2 === 'made' && r1.mac && /^© \d{4} Ada Quill$/.test(r1.mac.c) && r1.win && r1.win.faults.length === 0 && r1.win.names.CompanyName === 'Ada Quill' && r1.win.publisher === 'Ada Quill',
    'made with it: the Mac app\'s rights line, the Windows program\'s company and its installer\'s publisher are Ada Quill', { mac: r1.mac, company: r1.win && r1.win.names && r1.win.names.CompanyName, publisher: r1.win && r1.win.publisher, faults: r1.win && r1.win.faults });
  // 3. closed unanswered: nothing made
  into('closed'); await begin('mac'); await sleep(900); await p.keyboard.press('Escape');
  const e3 = await ended(); await sleep(800);
  ok(e3 === 'not made' && read(dir).files.length === 0, 'the question closed unanswered: nothing is made', { ended: e3, files: read(dir).files });
  // 4. No name
  into('none'); await begin('mac'); await sleep(900); await pick('none'); await sleep(300); await p.click('#r309Save'); const e4a = await ended();
  await begin('win'); await sleep(900); const a4 = await asking(); await pick('none'); await sleep(300); await p.click('#r309Save'); const e4b = await ended(); await sleep(1500); await Promise.all(saving.splice(0));
  const r2 = read(dir);
  ok(e4a === 'made' && e4b === 'made' && a4 && a4.value === '' && a4.choice === 'new' && a4.options === 'new,none' && r2.mac && r2.mac.c === '' && r2.win && r2.win.faults.length === 0 && r2.win.names.CompanyName === '' && r2.win.publisher === '',
    'No name: asked again with the plate empty and two choices, and a Mac app and a Windows app that name no one, never Ingenium\'s words', { mac: r2.mac, company: r2.win && r2.win.names && r2.win.names.CompanyName, publisher: r2.win && r2.win.publisher, asked: a4 });
  // 5. Don't ask me again
  into('quiet'); await begin('mac'); await sleep(900); await p.fill('#r309Name', 'Ada Quill'); await p.click('#r309Quiet'); await sleep(300); await p.click('#r309Save'); const e5a = await ended();
  await begin('mac'); await sleep(1200); const a5 = await asking(); const e5b = await ended(); await fab(); const l5 = await line();
  ok(e5a === 'made' && !a5 && e5b === 'made' && /Used each time, without asking/.test(l5 || ''), 'Don\'t ask me again: the next make asks nothing and uses the name; the Ship part says it is not asked', { asking: a5, line: l5 });
  await p.click('#r309Change'); await sleep(500); const a6 = await asking();
  await p.click('#r309Quiet'); await sleep(300); await p.click('#r309Save'); await sleep(500);
  await begin('mac'); await sleep(900); const a7 = await asking(); await p.click('#r309Save'); await ended();
  ok(a6 && a6.kind === 'edit' && a6.quiet === 'true' && a6.make === 'Save' && a7 && a7.kind === 'make' && a7.value === 'Ada Quill', 'Change shows the choice ticked; unticked and saved, the next make asks again', { change: a6, next: a7 });
  await open();
  const s8 = await p.evaluate(() => ({ name: IngPublisher.name(), quiet: IngPublisher.quiet(), decided: IngPublisher.decided() }));
  ok(s8.name === 'Ada Quill' && !s8.quiet && s8.decided, 'opened again, the name and the choice are kept', s8);
  // 6. another edition, nothing kept
  await p.evaluate(() => { window.ING_EDITION = 'full'; delete state.publisher; try { saveState(); } catch (e) {} });
  await fab();
  const e0 = await p.evaluate(() => ({ decided: IngPublisher.decided(), name: IngPublisher.name(), builtIn: IngPublisher.builtIn() })), l9 = await line(), a9o = await asking();
  into('full'); await begin('win'); await sleep(900); const a9 = await asking(); await p.fill('#r309Name', 'Ben Okafor'); await p.click('#r309Save'); const e9 = await ended();
  ok(!e0.decided && e0.name === '' && e0.builtIn === '' && /^Published as No name yet/.test(l9 || '') && !a9o && a9 && a9.kind === 'make' && a9.value === '' && a9.choice === 'new' && e9 === 'made' && (await p.evaluate(() => IngPublisher.name())) === 'Ben Okafor',
    'another edition: no name built in, and a make asks with the field empty; the answer is kept', { e0, line: l9, asking: a9, ended: e9 });
  // 7. Download as an app
  const dl = await p.evaluate(async () => { await IngDownload.open({ html: '<!doctype html><html><head><title>Harbour Garden</title></head><body><h1>Harbour Garden</h1></body></html>' }); await new Promise(r => setTimeout(r, 800));
    const pl = document.getElementById('r309DlPlate'); const v = pl ? { lab: (pl.querySelector('.r309-lab') || {}).textContent, name: (pl.querySelector('.r309-nm') || {}).textContent, change: !!document.getElementById('r309DlChange') } : null; try { closeModal(); } catch (e) {} return v; });
  ok(dl && dl.lab === 'Published as' && dl.name === 'Ben Okafor' && dl.change, 'Download as an app shows the Published as plate, with the name and Change', dl);
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0); })().catch((e) => { console.error(String(e).slice(0, 600)); process.exit(2); });
