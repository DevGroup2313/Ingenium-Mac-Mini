// Ingenium 6.5 · an app for a Mac and for Windows, made in Fabrica on the device (modules/r170.js, R170), in Chromium. The owner's
// words (20 October 2026): "ship ready made apps on my devices for all of my devices". Checks:
//   - the page carries both shells (IngMac.has, IngWin.has);
//   - Download as an app: the Mac row (one app for the MacBook and the Mac mini) and the Windows row make the app itself, each
//     named for the app, the device and its version, and still offer the project GitHub builds;
//   - pressing each saves a zip that rig/verify_desktop_app.py reads as macOS and Windows read it: the Mac app's seal and
//     signature agree with every file and the program's code is as GitHub built it; the Windows program's icon table names
//     each picture with its size, and the app's files follow it;
//   - Fabrica's Test and ship has a Mac app card and a Windows app card, and each makes and saves the same kind of app;
//   - no page errors.
//   node rig/t_65_desktop.js <url of Ingenium> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 600) : '')); c ? pass++ : fail++; };
const VERIFY = path.join(__dirname, 'verify_desktop_app.py');
const verify = (kind, file, id, title) => { const r = cp.spawnSync('python3', [VERIFY, kind, file, id, title], { encoding: 'utf8' }); let j = {}; try { j = JSON.parse(r.stdout.trim().split('\n').pop()); } catch (e) { j = { faults: ['no report: ' + r.stdout + r.stderr] }; } return j; };

(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1500, height: 1000 }, acceptDownloads: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  const downloads = []; p.on('download', d => downloads.push(d));
  async function nextDownload(fn, timeout = 90000) { const n0 = downloads.length; await fn(); const t0 = Date.now(); while (downloads.length <= n0 && Date.now() - t0 < timeout) await p.waitForTimeout(200);
    const d = downloads[n0]; if (!d) return null; const f = path.join(OUT, d.suggestedFilename()); await d.saveAs(f); return f; }
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(800);
    const has = await p.evaluate(() => ({ mac: !!(window.IngMac && IngMac.has()), win: !!(window.IngWin && IngWin.has()), dl: !!window.IngDownload }));
    ok(has.mac && has.win && has.dl, 'the page carries the Mac and Windows shells, and Download as an app', has);

    // an app with its own icon (a teal seal), as a person would have made in Chat or Build
    const html = await p.evaluate(() => { const c = document.createElement('canvas'); c.width = 256; c.height = 256; const x = c.getContext('2d');
      x.fillStyle = '#0d6a58'; x.beginPath(); x.arc(128, 128, 120, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff'; x.font = '600 120px Georgia'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('T', 128, 136);
      return '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Tide Clock</title><link rel="icon" sizes="256x256" href="' + c.toDataURL('image/png') + '"></head>' +
        '<body><h1>Tide Clock</h1><p id="t"></p><script>document.getElementById("t").textContent = "High water at six.";<\/script></body></html>'; });
    await p.evaluate(h => IngDownload.open({ html: h, title: 'Tide Clock', id: 'com.yannieforest.tideclock', version: '1.2' }), html);
    await p.waitForSelector('.dl-app .dl-dev', { timeout: 15000 }); await p.waitForTimeout(400);
    const rows = await p.evaluate(() => [...document.querySelectorAll('.dl-app .dl-dev')].map(r => ({ t: r.querySelector('.dl-t b').textContent, file: r.querySelector('.dl-file').textContent,
      off: r.classList.contains('off'), d: r.querySelector('.dl-t i').textContent, keys: [...r.querySelectorAll('.dl-row button')].map(x => x.textContent + (x.disabled ? ' (off)' : '')) })));
    const mac = rows.find(r => /^Mac/.test(r.t)), win = rows.find(r => /^Windows/.test(r.t));
    ok(mac && !mac.off && mac.file === 'Tide-Clock-mac-1.2.zip' && /The app itself, made here/.test(mac.d) && mac.keys.includes('Or the Mac projects'),
      'Download as an app: the Mac row makes the app itself (one for the MacBook and the Mac mini), named for the app and its version, and still offers the projects', mac);
    ok(win && !win.off && win.file === 'Tide-Clock-windows-1.2.zip' && /The app itself, made here/.test(win.d) && win.keys.includes('Or the Windows project'),
      'Download as an app: the Windows row makes the app itself, named for the app and its version, and still offers the project', win);
    ok(!rows.some(r => /Mac mini \(Apple silicon\)$/.test(r.t)) && rows.length === 6, 'one Mac row for both kinds of Mac (the app runs on each), six rows in all', rows.map(r => r.t));
    await p.screenshot({ path: path.join(OUT, 'download_as_app.png') });

    const press = async t => { const f = await nextDownload(() => p.evaluate(t => { const r = [...document.querySelectorAll('.dl-app .dl-dev')].find(x => x.querySelector('.dl-t b').textContent.startsWith(t));
      [...r.querySelectorAll('.dl-row button')].find(x => x.textContent === 'Make and save').click(); }, t)); await p.waitForTimeout(500);
      const st = await p.evaluate(t => { const r = [...document.querySelectorAll('.dl-app .dl-dev')].find(x => x.querySelector('.dl-t b').textContent.startsWith(t)); return r.querySelector('.dl-st').textContent; }, t);
      return { f, st }; };
    const m1 = await press('Mac');
    const vm = m1.f ? verify('mac', m1.f, 'com.yannieforest.tideclock', 'Tide Clock') : { faults: ['nothing saved'] };
    ok(m1.f && path.basename(m1.f) === 'Tide-Clock-mac-1.2.zip' && /^Saved: Tide-Clock-mac-1\.2\.zip/.test(m1.st) && !vm.faults.length && vm.halves === 2 && vm.code_directories >= 2,
      'the Mac row saves the app: its seal and signature agree with every file, and its program is as built, for Apple silicon and Intel', { saved: m1.f && path.basename(m1.f), status: m1.st, verify: vm });
    const w1 = await press('Windows');
    const vw = w1.f ? verify('win', w1.f, 'com.yannieforest.tideclock', 'Tide Clock') : { faults: ['nothing saved'] };
    ok(w1.f && path.basename(w1.f) === 'Tide-Clock-windows-1.2.zip' && /^Saved: Tide-Clock-windows-1\.2\.zip/.test(w1.st) && !vw.faults.length && vw.icons.length === 6,
      'the Windows row saves the app: its icon at six sizes, each named with its size, and the app\'s files after the program', { saved: w1.f && path.basename(w1.f), status: w1.st, verify: vw });
    await p.screenshot({ path: path.join(OUT, 'download_as_app_saved.png') });
    await p.evaluate(() => { try { closeModal(); } catch (e) {} }); await p.waitForTimeout(400);

    // Fabrica's Test and ship
    await p.evaluate(async h => { const r = await IngRepo.create({ name: 'Harbour Lights' }); await IngRepo.put(r.id, 'index.html', h.replace(/Tide Clock/g, 'Harbour Lights')); await IngRepo.commit(r.id, 'First version'); }, html);
    await p.evaluate(() => go('fabrica')); await p.waitForTimeout(1500);
    await p.evaluate(() => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => /Harbour Lights/.test(x.textContent)); if (t) t.click(); }); await p.waitForTimeout(1200);
    // (6.3: a card's Make and save key sits beside the card, in the card's wrapper, never inside it)
    const keyOf = 'e => [...(e.parentElement || e).querySelectorAll("button")].find(x => /^Make and save/.test(x.textContent))';
    const cards = await p.evaluate(kf => { const key = eval(kf); return [...document.querySelectorAll('#fbTargets .f-tg')].map(e => ({ k: e.getAttribute('data-k'), t: e.querySelector('b').textContent, off: e.classList.contains('off'),
      make: !!key(e) })); }, keyOf);
    const cm = cards.find(c => c.k === 'mac'), cw = cards.find(c => c.k === 'win');
    ok(cm && cw && !cm.off && !cw.off && cm.make && cw.make && cm.t === 'Mac app' && cw.t === 'Windows app (.exe)', 'Fabrica\'s Test and ship has a Mac app card and a Windows app card, ready to make', cards);
    const viaCard = async k => nextDownload(() => p.evaluate(([k, kf]) => { const e = document.querySelector('#fbTargets .f-tg[data-k="' + k + '"]'); eval(kf)(e).click(); }, [k, keyOf]));
    const fm = await viaCard('mac');
    const vfm = fm ? verify('mac', fm, '', 'Harbour Lights') : { faults: ['nothing saved'] };
    ok(fm && /^Harbour-Lights-mac-.*\.zip$/.test(path.basename(fm)) && !vfm.faults.length, 'the Mac app card makes and saves the app, sealed as macOS reads it', { saved: fm && path.basename(fm), verify: vfm });
    await p.waitForTimeout(1500);
    const fw = await viaCard('win');
    const vfw = fw ? verify('win', fw, '', 'Harbour Lights') : { faults: ['nothing saved'] };
    ok(fw && /^Harbour-Lights-windows-.*\.zip$/.test(path.basename(fw)) && !vfw.faults.length, 'the Windows app card makes and saves the app, as Windows reads it', { saved: fw && path.basename(fw), verify: vfw });
    await p.waitForTimeout(1500);
    const kept = await p.evaluate(() => { const e = document.querySelector('#fbTargets .f-tg[data-k="mac"] .f-chip.ok'); const w = document.querySelector('#fbTargets .f-tg[data-k="win"] .f-chip.ok');
      return [e && e.textContent, w && w.textContent]; });
    ok(kept[0] && kept[1] && /Made/.test(kept[0]) && /Made/.test(kept[1]), 'each card then says it was made, and keeps it under Releases', kept);
    await p.screenshot({ path: path.join(OUT, 'fabrica_ship.png') });
    ok(!errs.length, 'no page errors', errs);
  } catch (e) { ok(false, 'the run crashed', e.message); }
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
