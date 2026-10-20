// Ingenium 6.0 in Chromium: Fabrica's ship cards, the APK and the IPA made in the page (checked by Google's apksig and by
// unzipping), Make the chosen, Releases, package details, the dividers, removing an app; the side rail's Apps folding away;
// the whole width of a wide window; Code opening as Chat and letting its app go; Build holding a whole app part by part.
//   node rig/t_v6.js http://127.0.0.1:8150/ingenium.html <out folder> <tools folder with apksig.jar and VerifyApk.class>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const cp = require('child_process'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3], TOOLS = process.argv[4]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
function verifyApk(file) {
  try { return cp.execFileSync('java', ['--add-exports', 'java.base/sun.security.pkcs=ALL-UNNAMED', '--add-exports', 'java.base/sun.security.x509=ALL-UNNAMED', '--add-exports', 'java.base/sun.security.util=ALL-UNNAMED',
    '-cp', TOOLS + '/apksig.jar:' + TOOLS, 'VerifyApk', file, '22'], { stdio: 'pipe' }).toString(); } catch (e) { return String(e.stdout || '') + String(e.stderr || e.message); }
}
function unzipList(file) { try { return cp.execFileSync('unzip', ['-Z1', file]).toString().trim().split('\n'); } catch (e) { return []; } }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1600, height: 1000 }, acceptDownloads: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  const downloads = []; p.on('download', d => downloads.push(d));
  async function nextDownload(fn, timeout = 120000) { const n0 = downloads.length; await fn(); const t0 = Date.now(); while (downloads.length <= n0 && Date.now() - t0 < timeout) await p.waitForTimeout(200);
    const d = downloads[n0]; if (!d) return null; const f = path.join(OUT, d.suggestedFilename()); await d.saveAs(f); return f; }
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(800);
  const parts = await p.evaluate(() => [window.__ingParts.p57, window.__ingParts.p58, window.__ingParts.p59, window.__ingParts.p44]);
  ok(parts.every(x => x === 'running'), 'the new parts (R136, R137, R138) and Fabrica ran to their end', parts.join());

  // ---- the side rail: the Apps group folds away and stays as it was left
  await p.evaluate(() => { window.appsKeys = () => { const lab = [...document.querySelectorAll('.dock .grp-label')].find(x => /apps/i.test(x.textContent)); const out = []; let n = lab.nextElementSibling; while (n && !n.classList.contains('grp-label')) { if (n.classList.contains('nav-btn')) out.push(n); n = n.nextElementSibling; } return out; }; });
  const fold0 = await p.evaluate(() => { const lab = [...document.querySelectorAll('.dock .grp-label')].find(x => /apps/i.test(x.textContent)); return { fold: lab && lab.classList.contains('ing-fold'), shown: appsKeys().map(n => n.offsetParent ? 1 : 0), names: appsKeys().map(n => n.textContent.trim()) }; });
  await p.evaluate(() => [...document.querySelectorAll('.dock .grp-label')].find(x => /apps/i.test(x.textContent)).click()); await p.waitForTimeout(400);
  const fold1 = await p.evaluate(() => appsKeys().map(n => n.offsetParent ? 1 : 0));
  ok(fold0.fold && fold0.names.join() === 'Tabula,Abacus,Imago,Scriba,Fontes' && fold0.shown.join() === '1,1,1,1,1' && fold1.join() === '0,0,0,0,0', 'the Apps group folds away at a press (Tabula, Abacus, Imago, Scriba, Fontes)', JSON.stringify([fold0, fold1]));
  await p.screenshot({ path: OUT + '/v6-nav-folded.png' });
  await p.evaluate(() => saveState()); await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(600);
  const fold2 = await p.evaluate(() => document.querySelector('.nav-btn[data-page="tabula"]').offsetParent ? 1 : 0);
  await p.evaluate(() => [...document.querySelectorAll('.dock .grp-label')].find(x => /apps/i.test(x.textContent)).click()); await p.waitForTimeout(400);
  const fold3 = await p.evaluate(() => document.querySelector('.nav-btn[data-page="tabula"]').offsetParent ? 1 : 0);
  ok(fold2 === 0 && fold3 === 1, 'folded it stays folded after a restart, and opens again at a press', fold2 + ',' + fold3);

  // ---- the whole width of a wide window
  await p.setViewportSize({ width: 3440, height: 1440 }); await p.waitForTimeout(500);
  const wide = await p.evaluate(() => { const r = {}; ['home', 'fabrica', 'lector', 'chat'].forEach(pg => { go(pg); const s = document.querySelector('.section.active'); const m = document.querySelector('.main'); r[pg] = [Math.round(s.getBoundingClientRect().width), Math.round(m.getBoundingClientRect().width)]; }); return r; });
  ok(Object.values(wide).every(([s, m]) => s >= m - 40), 'at 3440 by 1440 each page takes the whole width (it stood at 1,680)', JSON.stringify(wide));
  await p.evaluate(() => go('fabrica')); await p.waitForTimeout(900); await p.screenshot({ path: OUT + '/v6-wide-fabrica.png' });
  await p.setViewportSize({ width: 1600, height: 1000 }); await p.waitForTimeout(500);

  // ---- Fabrica: an app with an icon of its own, kept and tested
  const icon = fs.readFileSync(path.join(__dirname, '..', 'shells', 'test', 'icons', 'android-xxxhdpi.png')).toString('base64');
  const rid = await p.evaluate(async (icon) => {
    const page = '<!doctype html><html><head><meta charset="utf-8"><title>Tide Clock</title><link rel="icon" sizes="192x192" href="data:image/png;base64,' + icon + '"><meta name="ingenium-build" content="1.4"></head><body><h1>Tide Clock</h1><script>document.body.insertAdjacentHTML("beforeend","<p>ok</p>");</script></body></html>';
    const x = await IngRepo.fromFiles([{ path: 'index.html', data: page }], { name: 'Tide Clock', msg: 'First version' });
    state.fabrica.sel = x.id; go('fabrica'); await fbRender(); await new Promise(r => setTimeout(r, 800)); return x.id; }, icon);
  await p.evaluate(() => document.getElementById('fbTest').click());
  await p.waitForFunction(() => /Passed|Faults|No page/.test(document.getElementById('fbTestChip').textContent), null, { timeout: 60000 }); await p.waitForTimeout(500);
  const cards = await p.evaluate(() => [...document.querySelectorAll('#fbTargets .f-tg')].map(e => { const f = e.querySelector('.foot'), k = f.querySelector('.f-btn'); if (k) k.scrollIntoView({ block: 'center' }); const r = k ? k.getBoundingClientRect() : null;
    return { k: e.getAttribute('data-k'), pressed: e.getAttribute('aria-pressed'), foot: Math.round(f.getBoundingClientRect().height), key: k ? k.textContent : null, keyH: r ? Math.round(r.height) : 0, keyHit: r ? (document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) === k) : false }; }));
  ok(cards.length === 5 && cards.map(c => c.k).join() === 'apk,ipa,web,page,kits', 'five ways to ship: APK, IPA, web app, one page, build kits', cards.map(c => c.k).join());
  ok(cards.every(c => c.foot > 0 && c.keyH > 0 && c.keyHit && /Make and save/.test(c.key)), 'every card shows its own Make and save key, on top, where a press lands (the hidden foot is gone)', JSON.stringify(cards.map(c => [c.k, c.foot, c.keyH, c.keyHit])));
  await p.screenshot({ path: OUT + '/v6-fabrica-cards.png' });
  // a card pressed is chosen, pressed again it is not
  const before = await p.evaluate(() => document.querySelector('#fbTargets .f-tg[data-k="web"]').getAttribute('aria-pressed'));
  await p.click('#fbTargets .f-tg[data-k="web"] small'); await p.waitForTimeout(300);
  const after = await p.evaluate(() => [document.querySelector('#fbTargets .f-tg[data-k="web"]').getAttribute('aria-pressed'), document.getElementById('fbMakeAll').textContent]);
  ok(before === 'false' && after[0] === 'true' && /Make the chosen \(3\)/.test(after[1]), 'a card pressed is chosen, and Make the chosen counts it', JSON.stringify([before, after]));
  // the APK, made in the page and checked by Google's own verifier
  const apk = await nextDownload(() => p.click('#fbTargets .f-tg[data-k="apk"] .foot .f-btn'));
  await p.waitForFunction(() => !document.querySelector('#fbTargets .f-tg[data-k="apk"] .bar'), null, { timeout: 120000 }).catch(() => {}); await p.waitForTimeout(600);
  const v = apk ? verifyApk(apk) : '';
  ok(apk && /\.apk$/.test(apk) && /verified=true v1=true v2=true/.test(v), 'Make and save on the APK card saves an APK that apksig verifies (v1 and v2)', (apk ? path.basename(apk) + ' ' + fs.statSync(apk).size + ' B · ' : 'no download · ') + v.trim().split('\n')[0]);
  let man = '';
  try { man = cp.execFileSync('python3', ['-c', 'from loguru import logger;logger.remove()\nfrom androguard.core.apk import APK\nimport sys\na=APK(sys.argv[1])\nprint(a.get_package(),a.get_androidversion_name(),a.get_app_name(),a.get_app_icon())', apk], { stdio: 'pipe' }).toString().trim(); } catch (e) { man = String(e.stderr || e.message).slice(-300); }
  ok(/^com\.yannieforest\.tideclock 1\.4 Tide Clock res\/mipmap-xxxhdpi-v4\/ic_launcher\.png$/.test(man), 'its manifest: the app\'s id, its build number as the version, its name and its own icon', man);
  const apkCard = await p.evaluate(() => document.querySelector('#fbTargets .f-tg[data-k="apk"] .foot').textContent);
  ok(/Made · /.test(apkCard), 'the APK card says it is made, and how large', apkCard);
  // the IPA
  const ipa = await nextDownload(() => p.click('#fbTargets .f-tg[data-k="ipa"] .foot .f-btn'));
  await p.waitForFunction(() => !document.querySelector('#fbTargets .f-tg[data-k="ipa"] .bar'), null, { timeout: 120000 }).catch(() => {}); await p.waitForTimeout(600);
  const il = ipa ? unzipList(ipa) : [];
  let plist = ''; try { plist = cp.execFileSync('unzip', ['-p', ipa, 'Payload/TideClock.app/Info.plist']).toString(); } catch (e) { }
  ok(ipa && il.includes('Payload/TideClock.app/Shell') && il.includes('Payload/TideClock.app/www/index.html') && il.includes('Payload/TideClock.app/AppIcon60x60@3x.png') && /<string>com\.yannieforest\.tideclock<\/string>/.test(plist) && /<string>Tide Clock<\/string>/.test(plist),
    'Make and save on the IPA card saves an IPA: the shell, the page in www/, its icons, its id and name in Info.plist', ipa ? path.basename(ipa) + ' · ' + il.length + ' entries' : 'no download');
  // make the chosen: one after another, never two at once
  const n0 = downloads.length; await p.click('#fbMakeAll');
  await p.waitForFunction(() => /made and saved|made;/.test((document.querySelector('#fb .f-toast') || {}).textContent || ''), null, { timeout: 180000 }).catch(() => {}); await p.waitForTimeout(800);
  const names = downloads.slice(n0).map(d => d.suggestedFilename());
  ok(names.length === 3 && /\.apk$/.test(names[0]) && /\.html$/.test(names[1]) && /web.*\.zip$/.test(names[2]), 'Make the chosen makes the three chosen, one after another (APK, one page, web app)', names.join(', '));
  const toast1 = await p.evaluate(() => (document.querySelector('#fb .f-toast') || {}).textContent || '');
  ok(/3 made and saved/.test(toast1), 'and says so', toast1);
  // releases: the version with what was made from it, saved again with no making
  await p.evaluate(() => [...document.querySelectorAll('#fbViews button')].find(x => x.dataset.v === 'releases').click()); await p.waitForTimeout(1500);
  const rel = await p.evaluate(() => ({ n: document.querySelectorAll('#fbWorkBody .f-rel').length, assets: [...document.querySelectorAll('#fbWorkBody .f-asset .nm')].map(x => x.textContent) }));
  ok(rel.n === 1 && rel.assets.some(a => /\.apk$/.test(a)) && rel.assets.some(a => /\.ipa$/.test(a)) && rel.assets.some(a => /\.html$/.test(a)), 'Releases shows the version with its packages: APK, IPA, one page, web app', JSON.stringify(rel));
  await p.screenshot({ path: OUT + '/v6-releases.png' });
  const again = await nextDownload(() => p.evaluate(() => [...document.querySelectorAll('#fbWorkBody .f-asset')].find(a => /\.apk$/.test(a.querySelector('.nm').textContent)).querySelector('.f-btn').click()));
  ok(again && /\.apk$/.test(again) && /verified=true/.test(verifyApk(again)), 'a package kept under Releases saves again with no making', again ? path.basename(again) : 'none');
  // package details: a new id and name reach the next APK
  await p.click('#fbPkg .f-btn'); await p.waitForTimeout(400);
  await p.evaluate(() => { const ins = document.querySelectorAll('#fb .f-sheet .f-field input'); ins[0].value = 'Tide Clock Pro'; ins[1].value = 'com.yannieforest.tidepro'; [...document.querySelectorAll('#fb .f-sheet .f-btn')].find(x => x.textContent === 'Keep these').click(); });
  await p.waitForTimeout(400);
  const apk2 = await nextDownload(() => p.click('#fbTargets .f-tg[data-k="apk"] .foot .f-btn'));
  await p.waitForTimeout(800);
  let man2 = ''; try { man2 = cp.execFileSync('python3', ['-c', 'from loguru import logger;logger.remove()\nfrom androguard.core.apk import APK\nimport sys\na=APK(sys.argv[1])\nprint(a.get_package(),a.get_app_name())', apk2], { stdio: 'pipe' }).toString().trim(); } catch (e) { man2 = String(e.message).slice(-200); }
  ok(man2 === 'com.yannieforest.tidepro Tide Clock Pro', 'Package details: the id and name chosen are the ones the next APK carries', man2);
  // the dividers between Fabrica's panels
  const w0 = await p.evaluate(() => Math.round(document.getElementById('fbApps').getBoundingClientRect().width));
  const sp = await p.evaluate(() => { const s = document.querySelectorAll('#fbPanels .f-split')[0].getBoundingClientRect(); return [s.left + s.width / 2, s.top + s.height / 2]; });
  await p.mouse.move(sp[0], sp[1]); await p.mouse.down(); await p.mouse.move(sp[0] + 60, sp[1], { steps: 6 }); await p.mouse.move(sp[0] + 120, sp[1], { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(400);
  const w1 = await p.evaluate(() => [Math.round(document.getElementById('fbApps').getBoundingClientRect().width), state.fabrica.cols]);
  ok(w1[0] >= w0 + 100 && w1[1] && w1[1].a > 0, 'a divider dragged gives Your apps more room, and the width is kept', w0 + ' -> ' + JSON.stringify(w1));
  await p.screenshot({ path: OUT + '/v6-fabrica-wider.png' });
  // removing an app
  await p.click('#fbMore'); await p.waitForTimeout(300);
  const menu = await p.evaluate(() => [...document.querySelectorAll('#fb .f-menu button')].map(b => b.textContent));
  ok(menu.includes('Remove from Fabrica') && menu.includes('Rename') && menu.includes('Edit a file') && menu.includes('Package details'), 'the app\'s menu: edit a file, Build, Code, package details, rename, history, remove', menu.join(' | '));
  await p.evaluate(() => [...document.querySelectorAll('#fb .f-menu button')].find(b => b.textContent === 'Remove from Fabrica').click()); await p.waitForTimeout(300);
  await p.evaluate(() => [...document.querySelectorAll('#fb .f-sheet .f-btn')].find(b => b.textContent === 'Remove it').click()); await p.waitForTimeout(1500);
  const gone = await p.evaluate(async (rid) => ({ tiles: document.querySelectorAll('#fbRepos .f-repo').length, inStore: (await IngRepo.list()).some(r => r.id === rid), made: (await new Promise(res => { const rq = indexedDB.open('fabrica_made'); rq.onsuccess = () => { const t = rq.result.transaction('meta').objectStore('meta').getAll(); t.onsuccess = () => res(t.result.filter(m => m.repo === rid).length); }; })) }), rid);
  ok(gone.tiles === 0 && !gone.inStore && gone.made === 0, 'Remove from Fabrica: the app, its versions and its kept packages are gone from this device', JSON.stringify(gone));

  // ---- Code opens as Chat opens, and lets its app go
  await p.evaluate(async () => { const pr = await ccMakeProject('Lantern', [{ name: 'index.html', text: '<!doctype html><title>Lantern</title><h1>Lantern</h1>' }], 'index.html'); go('code'); ccNewSession(pr); await new Promise(r => setTimeout(r, 1500)); });
  const code1 = await p.evaluate(() => ({ nav: document.body.classList.contains('nav-collapsed'), acts: [...document.querySelectorAll('.cc-proj-acts .btn')].map(b => b.textContent), cs: document.body.classList.contains('cs-on') }));
  ok(!code1.nav && code1.cs && code1.acts.join('|') === 'Close this app|Remove from Code', 'Code keeps the side rail, as Chat does; its app has Close this app and Remove from Code', JSON.stringify(code1));
  await p.screenshot({ path: OUT + '/v6-code.png' });
  await p.evaluate(() => { csOpen(false, true); }); await p.waitForTimeout(300);
  await p.evaluate(() => go('home')); await p.waitForTimeout(300); await p.evaluate(() => go('code')); await p.waitForTimeout(1500);
  const stays = await p.evaluate(() => document.body.classList.contains('cs-on'));
  await p.evaluate(() => [...document.querySelectorAll('#ccCodeBar .chat-top-key')].find(b => /Run/.test(b.textContent)).click()); await p.waitForTimeout(1200);
  const runs = await p.evaluate(() => document.body.classList.contains('cs-on'));
  ok(!stays && runs, 'a preview closed in Code stays closed on coming back, and Run opens it again', JSON.stringify({ stays, runs }));
  await p.evaluate(() => [...document.querySelectorAll('.cc-proj-acts .btn')].find(b => b.textContent === 'Remove from Code').click()); await p.waitForTimeout(400);
  const ask = await p.evaluate(() => ({ open: document.getElementById('modalRoot').classList.contains('open'), h: (document.querySelector('#modalBox .ing-ask h3') || {}).textContent }));
  await p.evaluate(() => [...document.querySelectorAll('#modalBox .ing-ask .btn')].find(b => b.textContent === 'Remove it').click()); await p.waitForTimeout(800);
  const code2 = await p.evaluate(() => ({ projects: ccProjects().map(x => x.name), sessions: state.chats.filter(c => ccIsCode(c) && c.projectId).length }));
  ok(ask.open && /Remove Lantern from Code/.test(ask.h) && !code2.projects.includes('Lantern') && code2.sessions === 0, 'Remove from Code asks in the page, then the app and its sessions leave Code', JSON.stringify([ask, code2]));

  // ---- Build holds a whole app, part by part
  const forge = fs.readFileSync(process.env.FORGE_HTML || path.join(OUT, 'the_forge.html'), 'utf8');
  await p.evaluate((t) => IngBuild.open({ name: 'the_forge.html', text: t, title: 'The Forge' }), forge); await p.waitForTimeout(2500);
  const bd = await p.evaluate(() => ({ large: IngBuild.large(), parts: IngBuild.parts().length, kinds: IngBuild.parts().reduce((a, x) => (a[x.kind] = (a[x.kind] || 0) + 1, a), {}), whole: IngBuild.text().length, shown: !!document.getElementById('bdText') && document.getElementById('bdText').value.length, stored: !!(state.buildDoc && state.buildDoc.ref), deskBuild: (state.build || '').length }));
  ok(bd.large && bd.parts > 40 && bd.whole === forge.length && bd.shown > 0 && bd.stored && bd.deskBuild === 0, 'The Forge (13 MB) opens in Build part by part, whole, kept in the large store and not in the desk\'s record', JSON.stringify(bd));
  await p.screenshot({ path: OUT + '/v6-build-forge.png' });
  await p.fill('#bdFind', 'Fabrica'); await p.waitForTimeout(800);
  const hits = await p.evaluate(() => document.querySelectorAll('#bdHits .bd-hit').length);
  await p.evaluate(() => document.querySelector('#bdHits .bd-hit').click()); await p.waitForTimeout(500);
  const sel = await p.evaluate(() => { const ta = document.getElementById('bdText'); return ta.value.slice(ta.selectionStart, ta.selectionEnd); });
  ok(hits > 10 && sel.toLowerCase() === 'fabrica', 'a search finds a word anywhere in the page, and a press opens its part with the word chosen', hits + ' places; chosen: ' + sel);
  await p.evaluate(() => { const ta = document.getElementById('bdText'); ta.value = ta.value + '\n/* changed in Build */'; ta.dispatchEvent(new Event('input')); }); await p.waitForTimeout(300);
  const ch = await p.evaluate(() => ({ whole: IngBuild.text().includes('/* changed in Build */'), mark: document.querySelectorAll('#bdParts .bd-part.changed').length }));
  await p.evaluate(() => [...document.querySelectorAll('#bdBox .btn')].find(b => b.textContent === 'Run the whole app').click()); await p.waitForTimeout(4000);
  const run = await p.evaluate(() => ({ len: document.getElementById('previewFrame').srcdoc.length }));
  ok(ch.whole && ch.mark === 1 && run.len > forge.length, 'a part written in is part of the whole page at once, and the whole app runs in the preview', JSON.stringify([ch, run]));
  const saved = await nextDownload(() => p.evaluate(() => [...document.querySelectorAll('#bdBox .btn')].find(b => b.textContent === 'Save the page').click()));
  ok(saved && fs.statSync(saved).size >= forge.length && fs.readFileSync(saved, 'utf8').includes('/* changed in Build */'), 'Save the page saves the whole app with the change', saved ? path.basename(saved) + ' ' + fs.statSync(saved).size : 'none');

  // ---- a page in Chat is read whole
  const lim = await p.evaluate(() => CHAT_FILE_MAX_CHARS);
  ok(lim >= 64 * 1048576, 'a page in Chat is no longer cut at four million characters', lim);

  ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})();
