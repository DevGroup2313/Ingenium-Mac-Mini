// node rig/t_692_fabrica_merge.js <app folder: ingenium_app.py (patched by build/desktop/app_merge_692.py) and ingenium.html> <out folder>
// Ingenium 6.92 (12 November 2026), in Chromium with the computer app's own back end (rig/run_app.py, HOME in a temporary folder):
// a merge whose two ideas changed the same lines, resolved on the drive (modules/r280.js, desktop/app_merge_692.py, with r110, r112
// and r141). 6.87 refused it, saying "Fabrica does not resolve that on the drive yet". An invented working copy that git itself made,
// Atelier (main and three ideas, each changing the same line of a.txt). Checks:
//   bringing an idea in from Fabrica: Both versions are in 1 file; the folder holds the merge as git leaves one (git sees it: a.txt marked
//   as both changed, the clean files staged, MERGE_HEAD); Fabrica's work says so (Bringing in “idea”, Stop the merge);
//   Keep this version is refused while a.txt holds both versions, naming it; a.txt resolved in Fabrica (written to the folder), the
//   version is kept with both parents, git finds the folder clean and nothing wrong;
//   another idea brought in, then Stop the merge: the folder as it was, git finds it clean, Fabrica's work says no merge;
//   a merge git itself left in the folder: Fabrica shows it (its idea's name), and keeps it once resolved, with both parents;
//   a pull request whose idea changed the same lines: merged from its page, it says both versions are in a file; kept, it is merged;
//   a file too large for the page (49 MB) changed by both ideas: refused in plain words, nothing changed;
//   no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process'); const os = require('os');
const [APP, OUT] = process.argv.slice(2);
if (!APP || !OUT) { console.log('usage: node rig/t_692_fabrica_merge.js <app folder> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const T = fs.mkdtempSync(path.join(os.tmpdir(), 'fab692-')), HOME = path.join(T, 'home'), DRIVE = path.join(T, 'drive');
fs.mkdirSync(HOME); fs.mkdirSync(DRIVE);
const ENV = Object.assign({}, process.env, { HOME, GIT_AUTHOR_NAME: 'Ada Ferreira', GIT_AUTHOR_EMAIL: 'ada@example.invalid', GIT_COMMITTER_NAME: 'Ada Ferreira', GIT_COMMITTER_EMAIL: 'ada@example.invalid', GIT_CONFIG_NOSYSTEM: '1' });
const git = (cwd, ...a) => cp.execFileSync('git', a, { cwd, env: ENV }).toString();
const gitMay = (cwd, ...a) => { try { return git(cwd, ...a); } catch (e) { return String(e.stdout || ''); } };
// ---------- Atelier: main and three ideas, each changing line two of a.txt ----------
const AT = path.join(DRIVE, 'Atelier'), W = (f, t) => fs.writeFileSync(path.join(AT, f), t), R = f => fs.readFileSync(path.join(AT, f), 'utf8');
fs.mkdirSync(AT); git(AT, 'init', '-q', '-b', 'main'); git(AT, 'config', 'user.name', 'Ada Ferreira'); git(AT, 'config', 'user.email', 'ada@example.invalid');
W('a.txt', 'one\ntwo\nthree\n'); W('b.txt', 'bee\n'); W('index.html', '<!doctype html><title>Atelier</title><h1>Atelier</h1>\n');
let seed = 692; const bigOf = k => { const u = Buffer.alloc(49 * 1048576); for (let i = 0; i < u.length; i += 4096) u[i] = (seed = (seed * 1103515245 + 12345 + k) & 0x7fffffff) & 255; return u; };
fs.writeFileSync(path.join(AT, 'big.bin'), bigOf(0));
git(AT, 'add', '-A'); git(AT, 'commit', '-qm', 'The first version');
git(AT, 'checkout', '-qb', 'huge'); fs.writeFileSync(path.join(AT, 'big.bin'), bigOf(1)); git(AT, 'commit', '-qam', 'A new big file'); git(AT, 'checkout', '-q', 'main');
for (const idea of ['idea', 'idea2', 'idea3', 'night']) {
  git(AT, 'checkout', '-qb', idea, 'main'); W('a.txt', 'one\nTWO from ' + idea + '\nthree\n'); if (idea === 'idea') W('b.txt', 'bee, from the idea\n');
  git(AT, 'commit', '-qam', idea + "'s version"); }
git(AT, 'checkout', '-q', 'main'); W('a.txt', 'one\nTWO from main\nthree\n'); git(AT, 'commit', '-qam', "main's version");
const PORT = 18692;
const app = cp.spawn('python3', ['-I', path.join(__dirname, 'run_app.py'), APP, String(PORT)], { env: ENV, stdio: ['ignore', 'pipe', 'pipe'] });
let appErr = ''; app.stderr.on('data', d => { appErr += d.toString(); });
const started = new Promise((res, rej) => { let buf = ''; app.stdout.on('data', d => { buf += d.toString(); const i = buf.indexOf('\n'); if (i >= 0) { try { res(JSON.parse(buf.slice(0, i))); } catch (e) { rej(e); } } }); setTimeout(() => rej(new Error('the app did not start: ' + appErr.slice(-800))), 120000); });
const call = (n, ...args) => fetch(`http://127.0.0.1:${PORT}/call/${n}`, { method: 'POST', body: JSON.stringify(args) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
(async () => {
  let b;
  try {
    const info = await started;
    ok(['disk_merge_begin', 'disk_merge_stop', 'disk_commit'].every(n => info.names.includes(n)), 'the computer app answers the merge calls', info.names.filter(n => /^disk_/.test(n)));
    const added = await call('disk_add', AT); const AID = added.id;
    b = await pw.chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
    await ctx.addInitScript(({ names, port }) => { const api = {};
      for (const n of names) api[n] = (...args) => fetch(`http://127.0.0.1:${port}/call/${n}`, { method: 'POST', body: JSON.stringify(args) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
      window.pywebview = { api }; window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50)); }, { names: info.names, port: PORT });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message.slice(0, 240)));
    await p.goto(`http://127.0.0.1:${info.page_port}/ingenium.html?b=test`, { waitUntil: 'domcontentloaded', timeout: 180000 });
    await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(900);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
    await p.evaluate(() => go('fabrica')); await sleep(2500);
    const open = () => p.evaluate(id => { IngRepo.setAuthor({ name: 'Ada Ferreira', email: 'ada@example.invalid' }); fbHubHost.FBS().sel = id; fbHubHost.S.home = false; fbHubHost.S.view = 'changes';
      return fbHubHost.refresh().then(() => fbHubHost.paint()); }, AID);
    await open(); await sleep(900);
    const note = () => p.evaluate(() => { const n = [...document.querySelectorAll('#fb .f-note')].find(x => /Bringing in/.test(x.textContent)); return n ? n.textContent : null; });
    // 1. an idea brought in, both versions in a.txt
    const main0 = git(AT, 'rev-parse', 'main').trim(), idea0 = git(AT, 'rev-parse', 'idea').trim();
    const m1 = await p.evaluate(id => IngRepo.merge(id, 'idea').then(x => x, e => ({ error: e.message })), AID);
    await open(); await sleep(1200);
    const st1 = git(AT, 'status', '--porcelain').split('\n').filter(Boolean).sort();
    ok(m1 && m1.kind === 'conflicts' && JSON.stringify(m1.conflicts) === '["a.txt"]', 'bringing an idea in from Fabrica: both versions are in a.txt, as before for an app kept in Ingenium', m1);
    ok(JSON.stringify(st1) === '["M  b.txt","UU a.txt"]' && fs.existsSync(path.join(AT, '.git', 'MERGE_HEAD')) && /^<<<<<<< /m.test(R('a.txt')),
      'the folder holds the merge as git leaves one: git sees a.txt marked as both changed and b.txt staged, and MERGE_HEAD', st1);
    const n1 = await note();
    ok(/Bringing in “idea”: both versions are in 1 file/.test(n1 || '') && /Stop the merge/.test(n1 || ''), 'Fabrica\'s work says so, with Stop the merge', n1);
    const k1 = await p.evaluate(id => IngRepo.commit(id, 'Bring in the idea').then(() => 'kept', e => 'refused: ' + e.message), AID);
    ok(/^refused: These still hold both versions: a\.txt/.test(k1) && git(AT, 'rev-parse', 'main').trim() === main0, 'Keep this version is refused while a.txt holds both versions, naming it (nothing kept)', k1);
    const k2 = await p.evaluate(id => IngRepo.put(id, 'a.txt', 'one\nTWO from main and the idea\nthree\n').then(() => IngRepo.commit(id, 'Bring in the idea')).then(o => o, e => 'refused: ' + e.message), AID);
    await open(); await sleep(900);
    const par1 = git(AT, 'log', '-1', '--format=%P', 'main').trim().split(' ');
    const fsck1 = cp.spawnSync('git', ['fsck', '--no-progress'], { cwd: AT, env: ENV });
    ok(/^[0-9a-f]{40}$/.test(k2) && JSON.stringify(par1) === JSON.stringify([main0, idea0]) && git(AT, 'status', '--porcelain') === '' && fsck1.status === 0 && R('a.txt') === 'one\nTWO from main and the idea\nthree\n',
      'resolved in Fabrica, the version is kept with both parents; git finds the folder clean and nothing wrong', { k2, par1 });
    ok((await note()) === null && !fs.existsSync(path.join(AT, '.git', 'MERGE_HEAD')), 'Fabrica\'s work says no merge is under way any longer', await note());
    // 2. stopped
    const main1 = git(AT, 'rev-parse', 'main').trim();
    const m2 = await p.evaluate(id => IngRepo.merge(id, 'idea2').then(x => x, e => ({ error: e.message })), AID);
    await open(); await sleep(900);
    const hadNote = await note();
    await p.evaluate(() => { const n = [...document.querySelectorAll('#fb .f-note')].find(x => /Bringing in/.test(x.textContent)); [...n.querySelectorAll('button')].find(x => x.textContent === 'Stop the merge').click(); });
    await sleep(2500); await open(); await sleep(900);
    ok(m2 && m2.kind === 'conflicts' && /Bringing in “idea2”/.test(hadNote || '') && git(AT, 'status', '--porcelain') === '' && git(AT, 'rev-parse', 'main').trim() === main1
       && !fs.existsSync(path.join(AT, '.git', 'MERGE_HEAD')) && (await note()) === null && R('a.txt') === 'one\nTWO from main and the idea\nthree\n',
      'another idea brought in, then Stop the merge: the folder as it was, git finds it clean, and Fabrica says no merge', { m2, hadNote, st: git(AT, 'status', '--porcelain') });
    // 3. a merge git itself left
    gitMay(AT, 'merge', 'idea3');
    await sleep(3200); await open(); await sleep(1200); await open(); await sleep(900);/* Fabrica reads the folder again within a refresh or two */
    const n3 = await note();
    ok(/Bringing in “idea3”: both versions are in 1 file/.test(n3 || ''), 'a merge git itself left in the folder: Fabrica shows it, with its idea\'s name', n3);
    const main2 = git(AT, 'rev-parse', 'main').trim(), idea3 = git(AT, 'rev-parse', 'idea3').trim();
    const k3 = await p.evaluate(id => IngRepo.put(id, 'a.txt', 'one\nTWO, all three\nthree\n').then(() => IngRepo.commit(id, 'Bring in idea3')).then(o => o, e => 'refused: ' + e.message), AID);
    const par3 = git(AT, 'log', '-1', '--format=%P', 'main').trim().split(' ');
    ok(/^[0-9a-f]{40}$/.test(k3) && JSON.stringify(par3) === JSON.stringify([main2, idea3]) && git(AT, 'status', '--porcelain') === '', 'kept in Fabrica once resolved, with both parents', { k3, par3 });
    // 4. a pull request whose idea changed the same lines
    await open(); await sleep(600);
    await p.evaluate(() => fbHub.open('pulls')); await sleep(1200);
    await p.evaluate(() => { const s = document.querySelector('#hPrNew'); s.click(); }); await sleep(2500);
    await p.evaluate(() => { const sel = [...document.querySelectorAll('#fb select')].find(x => [...x.options].some(o => o.value === 'night' || o.textContent === 'night')); if (sel) { const o = [...sel.options].find(o => o.value === 'night' || o.textContent === 'night'); sel.value = o.value; sel.dispatchEvent(new Event('change', { bubbles: true })); } });
    await sleep(1200);
    await p.fill('#hPrT', 'Night for the notebook'); await p.click('#hPrGo'); await sleep(2500);
    const before = git(AT, 'rev-parse', 'main').trim(), night = git(AT, 'rev-parse', 'night').trim();
    await p.click('#hPrMerge'); await sleep(4000);
    const pr1 = await p.evaluate(id => fbHub.live(id).then(r => { const x = r.pulls[r.pulls.length - 1]; return { state: x.state, pending: !!x.pending, from: x.from, files: x.pending && x.pending.files }; }), AID);
    ok(pr1.from === 'night' && pr1.pending && JSON.stringify(pr1.files) === '["a.txt"]' && fs.existsSync(path.join(AT, '.git', 'MERGE_HEAD')), 'a pull request whose idea changed the same lines: merged from its page, both versions are in a.txt, on the drive', pr1);
    const k4 = await p.evaluate(id => IngRepo.put(id, 'a.txt', 'one\nTWO by night\nthree\n').then(() => IngRepo.commit(id, 'Merge pull request #1 from night')).then(o => o, e => 'refused: ' + e.message), AID);
    await sleep(3000);
    const pr2 = await p.evaluate(id => fbHub.live(id).then(r => r.pulls[r.pulls.length - 1].state), AID);
    const par4 = git(AT, 'log', '-1', '--format=%P', 'main').trim().split(' ');
    ok(/^[0-9a-f]{40}$/.test(k4) && JSON.stringify(par4) === JSON.stringify([before, night]) && pr2 === 'merged', 'kept, the pull request is merged, with both parents', { k4, par4, pr2 });
    // 5. a file too large for the page (49 MB), changed by both ideas: refused, nothing changed
    await open(); await sleep(600);
    fs.writeFileSync(path.join(AT, 'big.bin'), bigOf(2)); git(AT, 'commit', '-qam', "main's big file"); await sleep(3200); await open(); await sleep(900);
    const main5 = git(AT, 'rev-parse', 'main').trim();
    const m5 = await p.evaluate(id => IngRepo.merge(id, 'huge').then(x => x, e => ({ error: e.message })), AID);
    ok(/^Both ideas changed big\.bin, too large for Fabrica to bring into the page: bring this idea in with git, in its folder\. Nothing was changed\./.test(m5.error || '')
       && git(AT, 'status', '--porcelain') === '' && git(AT, 'rev-parse', 'main').trim() === main5 && !fs.existsSync(path.join(AT, '.git', 'MERGE_HEAD')),
      'a file too large for the page, changed by both ideas: refused in plain words, and nothing changed', m5);
    await p.screenshot({ path: path.join(OUT, 'end.png') });
    ok(!errs.length, 'no page error', errs);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 900) + (appErr ? '\n' + appErr.slice(-600) : '')); }
  finally { try { b && await b.close(); } catch (e) {} try { app.kill(); } catch (e) {} }
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
