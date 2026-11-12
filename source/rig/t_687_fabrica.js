// node rig/t_687_fabrica.js <app folder: ingenium_app.py (patched by app_disk_686.py and app_disk2_687.py) and ingenium.html> <out folder>
// Ingenium 6.87 (12 November 2026), in Chromium with the computer app's own back end (rig/run_app.py, HOME in a temporary folder):
// Fabrica, phase 2, second stage: working on the drive (modules/r280.js, desktop/app_disk2_687.py). Her words, on the preview of this
// stage (https://claude.ai/artifact/VNwsz2ywj3XkXaCq8gws1o, version 4): "I approve of the preview, please push it everywhere." Invented
// repositories git made: Atelier (a working copy, with an idea) and Lumen (a bare repository, as brought from GitHub). Checks, each by
// git itself where the drive is concerned:
//   the drive line: kept on the drive as you work (a working copy); its files change through a working copy (a bare one), with its key;
//   the folder's changes, made in another program, in Now, Changes, with the changed lines;
//   Keep this version: one version on the drive, with the repository's own name; git finds the folder clean; Fabrica too;
//   a file saved in Fabrica's editor lands in the folder; Put it back restores it and keeps what it held aside;
//   a new idea, made on the drive; switching to it, the folder follows; back to main;
//   a release (an annotated tag, with its notes), on the drive;
//   a pull request squashed and merged, on the drive: one version with one parent, the folder following, clean;
//   a bare repository: a file cannot be saved (said why); a working copy made from it, listed at once;
//   git fsck finds nothing wrong in either; no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process'); const os = require('os');
const [APP, OUT] = process.argv.slice(2);
if (!APP || !OUT) { console.log('usage: node rig/t_687_fabrica.js <app folder> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const T = fs.mkdtempSync(path.join(os.tmpdir(), 'fab687-')), HOME = path.join(T, 'home'), DRIVE = path.join(T, 'drive');
fs.mkdirSync(HOME); fs.mkdirSync(DRIVE);
const ENV = Object.assign({}, process.env, { HOME, GIT_AUTHOR_NAME: 'Ada Ferreira', GIT_AUTHOR_EMAIL: 'ada@example.invalid', GIT_COMMITTER_NAME: 'Ada Ferreira', GIT_COMMITTER_EMAIL: 'ada@example.invalid', GIT_CONFIG_NOSYSTEM: '1' });
const git = (cwd, ...a) => cp.execFileSync('git', a, { cwd, env: ENV }).toString();
const fsck = d => { try { cp.execFileSync('git', ['fsck', '--no-progress'], { cwd: d, env: ENV, stdio: 'pipe' }); return true; } catch (e) { return false; } };
const AT = path.join(DRIVE, 'Atelier');
fs.mkdirSync(path.join(AT, 'app'), { recursive: true });
git(AT, 'init', '-q', '-b', 'main'); git(AT, 'config', 'user.name', 'Ada Ferreira'); git(AT, 'config', 'user.email', 'ada@example.invalid');
fs.writeFileSync(path.join(AT, 'README.md'), '# Atelier\n\nAn invented app.\n');
fs.writeFileSync(path.join(AT, 'app', 'reader.js'), 'function theme(){\n  return "day";\n}\n');
fs.writeFileSync(path.join(AT, 'index.html'), '<!doctype html><title>Atelier</title><h1>Atelier</h1>');
git(AT, 'add', '-A'); git(AT, 'commit', '-qm', 'The first version');
git(AT, 'checkout', '-qb', 'night-reader'); fs.writeFileSync(path.join(AT, 'app', 'night.css'), 'body{background:#111}\n'); git(AT, 'add', '-A'); git(AT, 'commit', '-qm', 'Night, its colours');
fs.appendFileSync(path.join(AT, 'README.md'), 'By night too.\n'); git(AT, 'commit', '-qam', 'Night, the README'); git(AT, 'checkout', '-q', 'main');
const BARE = path.join(DRIVE, 'Lumen.git'); git(DRIVE, 'clone', '-q', '--bare', AT, BARE);
const PORT = 18687;
const app = cp.spawn('python3', ['-I', path.join(__dirname, 'run_app.py'), APP, String(PORT)], { env: ENV, stdio: ['ignore', 'pipe', 'pipe'] });
let appErr = ''; app.stderr.on('data', d => { appErr += d.toString(); });
const started = new Promise((res, rej) => { let buf = ''; app.stdout.on('data', d => { buf += d.toString(); const i = buf.indexOf('\n'); if (i >= 0) { try { res(JSON.parse(buf.slice(0, i))); } catch (e) { rej(e); } } }); setTimeout(() => rej(new Error('the app did not start: ' + appErr.slice(-800))), 60000); });
const call = (n, ...args) => fetch(`http://127.0.0.1:${PORT}/call/${n}`, { method: 'POST', body: JSON.stringify(args) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
(async () => {
  let b;
  try {
    const info = await started;
    ok(['disk_commit', 'disk_put_back', 'disk_write_file', 'disk_remove_file', 'disk_move_file', 'disk_write', 'disk_working_copy'].every(n => info.names.includes(n)), 'the computer app answers the calls that write on the drive', info.names.filter(n => /^disk_/.test(n)));
    const AID = (await call('disk_add', AT)).id, LID = (await call('disk_add', BARE)).id;
    b = await pw.chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
    await ctx.addInitScript(({ names, port }) => { const api = {};
      for (const n of names) api[n] = (...args) => fetch(`http://127.0.0.1:${port}/call/${n}`, { method: 'POST', body: JSON.stringify(args) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
      window.pywebview = { api }; window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50)); }, { names: info.names, port: PORT });
    const p = await ctx.newPage(); const errs = [], warns = [];
    p.on('pageerror', e => errs.push(e.message.slice(0, 240))); p.on('console', m => { if (m.type() === 'warning' || m.type() === 'error') warns.push(m.text().slice(0, 300)); });
    await p.goto(`http://127.0.0.1:${info.page_port}/ingenium.html?b=test`, { waitUntil: 'domcontentloaded', timeout: 180000 });
    await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(900);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('fabrica'); });
    await sleep(2500);
    const open = async id => { await p.evaluate(id => { fbHubHost.FBS().sel = id; fbHubHost.S.home = false; return fbHubHost.refresh().then(() => fbHubHost.paint()); }, id); await sleep(1500); };
    const view = async v => { await p.evaluate(v => { const b = document.querySelector('#fbViews button[data-v="' + v + '"]'); b && b.click(); }, v); await sleep(1500); };
    await open(AID);
    const line = await p.evaluate(() => (document.getElementById('fbDiskLine') || {}).textContent || '');
    ok(/kept on the drive as you work$/.test(line), 'the drive line: kept on the drive as you work', line);
    // ---------- the folder, changed in another program ----------
    fs.writeFileSync(path.join(AT, 'app', 'reader.js'), 'function theme(){\n  return state.theme||"day";\n}\n');
    fs.writeFileSync(path.join(AT, 'docs.md'), 'A page written in another program.\n');
    await open(AID); await view('changes');
    const ch = await p.evaluate(() => ({ chip: (document.getElementById('fbWorkChip') || {}).textContent, body: document.getElementById('fbWorkBody').innerText }));
    ok(/2 not kept/.test(ch.chip) && /app\/reader\.js/.test(ch.body) && /docs\.md/.test(ch.body), 'the folder\'s changes, made in another program, wait in Now, Changes', ch);
    ok(/state\.theme\|\|"day"/.test(ch.body), 'with their changed lines, read from the folder', ch.body.slice(0, 400));
    await p.screenshot({ path: path.join(OUT, '1_changes.png') });
    // ---------- Keep this version ----------
    await p.evaluate(() => { const m = document.getElementById('fbMsg'); m.value = 'The reader keeps your choice'; m.dispatchEvent(new Event('input')); document.getElementById('fbKeep').click(); });
    await sleep(2500);
    const log1 = git(AT, 'log', '-1', '--format=%an <%ae>|%s').trim();
    ok(log1 === 'Ada Ferreira <ada@example.invalid>|The reader keeps your choice' && git(AT, 'status', '--porcelain').trim() === '' && git(AT, 'show', '--name-only', '--format=', 'HEAD').trim().split('\n').sort().join() === 'app/reader.js,docs.md',
      'Keep this version: one version on the drive, with the repository\'s own name; git finds the folder clean', { log1, st: git(AT, 'status', '--porcelain') });
    const clean = await p.evaluate(id => IngRepo.status(id).then(s => s.clean), AID);
    ok(clean === true, 'and Fabrica finds nothing waiting', clean);
    // ---------- saved in Fabrica's editor, then put back ----------
    await p.evaluate(id => IngRepo.put(id, 'README.md', '# Atelier\n\nScribbled in Fabrica.\n'), AID); await sleep(400);
    const saved = fs.readFileSync(path.join(AT, 'README.md'), 'utf8');
    await p.evaluate(id => IngRepo.discard(id, ['README.md']), AID); await sleep(600);
    const after = fs.readFileSync(path.join(AT, 'README.md'), 'utf8');
    const asideDir = path.join(AT, '.git', 'ingenium-put-back'); const kept = fs.existsSync(asideDir) ? fs.readdirSync(asideDir).map(d => fs.readFileSync(path.join(asideDir, d, 'README.md'), 'utf8')) : [];
    ok(saved === '# Atelier\n\nScribbled in Fabrica.\n' && after === '# Atelier\n\nAn invented app.\n' && kept.indexOf(saved) >= 0 && git(AT, 'status', '--porcelain').trim() === '',
      'a file saved in Fabrica lands in the folder; Put it back restores it, and keeps what it held aside', { saved, after, kept });
    // ---------- a new idea, switching to it ----------
    await p.evaluate(id => IngRepo.branch(id, 'print-colour'), AID); await sleep(500);
    ok(git(AT, 'branch', '--list', 'print-colour').trim() === 'print-colour', 'a new idea, made on the drive', git(AT, 'branch'));
    await p.evaluate(id => IngRepo.switchTo(id, 'night-reader'), AID); await sleep(1200);
    ok(git(AT, 'rev-parse', '--abbrev-ref', 'HEAD').trim() === 'night-reader' && fs.existsSync(path.join(AT, 'app', 'night.css')) && git(AT, 'status', '--porcelain').trim() === '',
      'switching to another idea: the folder follows it, clean', git(AT, 'status', '--porcelain'));
    await p.evaluate(id => IngRepo.switchTo(id, 'main'), AID); await sleep(1200);
    ok(git(AT, 'rev-parse', '--abbrev-ref', 'HEAD').trim() === 'main' && !fs.existsSync(path.join(AT, 'app', 'night.css')), 'and back to main', git(AT, 'rev-parse', '--abbrev-ref', 'HEAD'));
    // ---------- a release ----------
    await p.evaluate(id => IngRepo.tag(id, 'v1.1', { msg: 'The reader keeps your choice.' }), AID); await sleep(600);
    ok(git(AT, 'tag', '-n1').replace(/\s+/g, ' ').trim() === 'v1.1 The reader keeps your choice.' && git(AT, 'cat-file', '-t', 'v1.1').trim() === 'tag', 'a release with its notes, on the drive (an annotated tag)', git(AT, 'tag', '-n1'));
    // ---------- a pull request, squashed and merged on the drive ----------
    await p.evaluate(async id => { const rec = await fbHub.record(id); rec.id = id; rec.name = 'Atelier'; rec.next = 2;
      rec.pulls = [{ n: 1, kind: 'pr', title: 'Night mode', body: 'The reader by night.', state: 'open', labels: [], created: Date.now(), updated: Date.now(), by: 'ada', comments: [], events: [], refs: [], from: 'night-reader', to: 'main' }];
      await fbHub.importAll({ kind: 'ingenium-hub', apps: [rec] }); await fbHubHost.refresh(); fbHubHost.paint(); fbHub.open('pulls', { n: 1 }); }, AID);
    await sleep(2500);
    await p.evaluate(() => { const b = [...document.querySelectorAll('#hPrHow button')].find(x => x.textContent === 'Squash and merge'); b && b.click(); }); await sleep(800);
    const prState = await p.evaluate(() => ({ box: (document.getElementById('hPrMergeBox') || {}).innerText || null, how: [...document.querySelectorAll('#hPrHow button')].map(x => x.textContent + (x.getAttribute('aria-pressed') === 'true' ? '*' : '')), merge: (document.getElementById('hPrMerge') || {}).textContent, dis: (document.getElementById('hPrMerge') || {}).disabled }));
    if (process.env.DEBUG687) console.log('PR before', JSON.stringify(prState));
    await p.evaluate(() => { window.__toasts = []; const h = fbHubHost, t0 = h.toast; h.toast = m => { window.__toasts.push(m); try { return t0(m); } catch (e) {} }; const k = document.getElementById('hPrMerge'); k && k.click(); }); await sleep(3000);
    if (process.env.DEBUG687) console.log('PR after', JSON.stringify(await p.evaluate(() => ({ toasts: window.__toasts, box: (document.getElementById('hPrMergeBox') || {}).innerText || null }))), 'warnings', JSON.stringify(warns.slice(-6)));
    const top = git(AT, 'log', '-1', '--format=%s|%P').trim().split('|');
    ok(top[0] === 'Night mode (#1)' && top[1].split(' ').length === 1 && fs.existsSync(path.join(AT, 'app', 'night.css')) && /By night too/.test(fs.readFileSync(path.join(AT, 'README.md'), 'utf8')) && git(AT, 'status', '--porcelain').trim() === '',
      'a pull request squashed and merged on the drive: one version, one parent, the folder following, clean', { top, st: git(AT, 'status', '--porcelain') });
    await p.screenshot({ path: path.join(OUT, '2_merged.png') });
    // ---------- a bare repository ----------
    await open(LID);
    const bl = await p.evaluate(() => ({ line: (document.getElementById('fbDiskLine') || {}).textContent || '', key: !!document.querySelector('#fbDiskLine .r280-key') }));
    ok(/its files change through a working copy/.test(bl.line) && bl.key, 'a bare repository: its files change through a working copy, and the key is there', bl);
    const refused = await p.evaluate(id => IngRepo.put(id, 'README.md', 'x').then(() => 'saved', e => String(e.message)), LID);
    ok(/has no folder of files on the drive: make a working copy of it/.test(refused), 'a file cannot be saved in it, and that is said', refused);
    const PARENT = path.join(T, 'copies'); fs.mkdirSync(PARENT);
    const wc = await call('disk_working_copy', LID, PARENT);
    const listed = await p.evaluate(() => IngRepo.list().then(l => l.map(r => r.name)));
    ok(wc.ok && fs.existsSync(path.join(wc.path, 'README.md')) && listed.filter(n => n === 'Lumen').length >= 2, 'a working copy made from it, listed at once', { wc, listed });
    ok(fsck(AT) && fsck(BARE), 'git fsck finds nothing wrong in either');
    ok(errs.length === 0, 'no page error', errs);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e)); }
  finally { try { b && await b.close(); } catch (e) {} try { app.kill(); } catch (e) {} }
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
