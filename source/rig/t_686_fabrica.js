// node rig/t_686_fabrica.js <app folder: ingenium_app.py (patched by build/desktop/app_disk_686.py) and ingenium.html> <out folder>
// Ingenium 6.86 (12 November 2026), in Chromium with the computer app's own back end (rig/run_app.py, HOME in a temporary folder):
// Fabrica, phase 2 (modules/r280.js, desktop/app_disk_686.py, with r110, r112, r141, r176 and r276). Her words: "I want full and
// complete parity with GitHub but I want you to go above and beyond that and really enhance it and Ingenium as a whole"; on the
// preview: "Please make the fixes and then push this preview everywhere, I approve of the design"; then "I approve, please push it
// everywhere". Invented repositories that git itself made: Atelier (a working copy: two branches, two tags, a file of 9 MB, a
// submodule, packed and loose objects), added from its folder, and Lumen, brought from GitHub (6.83) with one invented issue; and
// Harbour Garden, an app kept in Ingenium. Checks:
//   Your apps: On this computer (Atelier, Lumen, the drive, no size limit) and Kept in Ingenium; each drive tile says its size;
//   the work: its name, where it is (the drive line), read only for now; Files with the sizes git gives (9.0 MB, not read whole);
//   History from the drive; the README in Code; the branch key opens Ingenium's own list (Branches, Tags, All the ideas), and choosing
//   shows idea, then the tag v0, then main again, each with its own files;
//   reading writes nothing: git finds the drive as it was; a bare repository refuses a file and a commit, saying to make a working copy (6.87);
//   an object read from the drive is lent, never counted as kept: Harbour Garden keeps its own copy of the same file;
//   Lumen's issue is attached from its records on the drive;
//   the Ingenium part: a fourth part with seven cards; the other parts and the footer step aside, and come back; Explain, Release notes
//   and A message ask the model she chose (a stand-in here), with the version's own words and changes, and say where it runs;
//   Find in every repository finds a word in a drive repository and in one kept in Ingenium, and a find opens its file;
//   a pull request kept in Ingenium: Merge, Squash and merge, Rebase and merge; Ask Ingenium to review it reads its own changes; squashed,
//   it is one version with one parent;
//   Any version, live lists the versions; A second copy says plainly it comes in the next stage;
//   forgetting Atelier (its dialog says Fabrica only forgets it) leaves the drive as it was; Lumen, brought from GitHub, is not forgotten from here;
//   at a phone's width nothing is wider than the screen and the cards stand one to a row; no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process'); const os = require('os');
const [APP, OUT] = process.argv.slice(2);
if (!APP || !OUT) { console.log('usage: node rig/t_686_fabrica.js <app folder> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const T = fs.mkdtempSync(path.join(os.tmpdir(), 'fab686-')), HOME = path.join(T, 'home'), DRIVE = path.join(T, 'drive');
fs.mkdirSync(HOME); fs.mkdirSync(DRIVE);
const ENV = Object.assign({}, process.env, { HOME, GIT_AUTHOR_NAME: 'Ada Ferreira', GIT_AUTHOR_EMAIL: 'ada@example.invalid', GIT_COMMITTER_NAME: 'Ada Ferreira', GIT_COMMITTER_EMAIL: 'ada@example.invalid', GIT_CONFIG_NOSYSTEM: '1' });
const git = (cwd, ...a) => cp.execFileSync('git', a, { cwd, env: ENV }).toString();
// ---------- the invented repositories, made by git ----------
const AT = path.join(DRIVE, 'Atelier');
fs.mkdirSync(path.join(AT, 'src'), { recursive: true }); fs.mkdirSync(path.join(AT, 'docs', 'guide'), { recursive: true });
git(AT, 'init', '-q', '-b', 'main');
fs.writeFileSync(path.join(AT, 'README.md'), '# Atelier\n\nAn invented app: a lighthouse keeper\'s notebook.\n' + 'lamp river stone quiet garden north paper salt\n'.repeat(200));
fs.writeFileSync(path.join(AT, 'src', 'app.js'), "console.log('atelier');\n".repeat(40));
fs.writeFileSync(path.join(AT, 'docs', 'guide', 'intro.md'), 'Begin here.\n');
fs.writeFileSync(path.join(AT, 'index.html'), '<!doctype html><title>Atelier</title><h1>Atelier</h1>');
let seed = 686; const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) & 255;
const big = Buffer.alloc(9 * 1048576 + 77); for (let i = 0; i < big.length; i++) big[i] = rnd();
fs.writeFileSync(path.join(AT, 'src', 'photo.bin'), big);
git(AT, 'add', '-A'); git(AT, 'commit', '-qm', 'The first version');
const s0 = fs.readFileSync(path.join(AT, 'README.md'), 'utf8'); fs.writeFileSync(path.join(AT, 'README.md'), s0.slice(0, 80) + 'A changed line.\n' + s0.slice(80));
git(AT, 'commit', '-qam', 'A change to the README'); git(AT, 'tag', '-a', 'v1', '-m', 'The first release'); git(AT, 'tag', 'v0', 'HEAD~1');
git(AT, 'checkout', '-qb', 'idea'); fs.appendFileSync(path.join(AT, 'docs', 'guide', 'intro.md'), 'An idea.\n'); git(AT, 'commit', '-qam', 'An idea'); git(AT, 'checkout', '-q', 'main');
git(AT, 'update-index', '--add', '--cacheinfo', '160000,' + git(AT, 'rev-parse', 'HEAD').trim() + ',vendor/lib'); git(AT, 'commit', '-qm', 'A submodule, named');
git(AT, 'gc', '-q'); fs.writeFileSync(path.join(AT, 'notes.txt'), 'a loose object, after the pack\n'); git(AT, 'add', 'notes.txt'); git(AT, 'commit', '-qm', 'A loose one');
// what git finds on the drive, and a fingerprint of every object and ref file there (Ingenium writes none of them)
const crypto = require('crypto');
const print = dir => { const h = crypto.createHash('sha256'); const walk = d => { for (const n of fs.readdirSync(d).sort()) { const f = path.join(d, n), st = fs.statSync(f); if (st.isDirectory()) walk(f); else { h.update(f + ':' + st.size + ':' + st.mtimeMs + ':'); h.update(fs.readFileSync(f)); } } };
  for (const sub of ['objects', 'refs', 'packed-refs', 'HEAD']) { const f = path.join(dir, '.git', sub); if (fs.existsSync(f)) fs.statSync(f).isDirectory() ? walk(f) : h.update(fs.readFileSync(f)); } return h.digest('hex'); };
const AT_HEAD = git(AT, 'rev-parse', 'HEAD').trim(), AT_REFS = git(AT, 'show-ref'), AT_STATUS = git(AT, 'status', '--porcelain'), AT_PRINT = print(AT);
const INTRO_V0 = git(AT, 'rev-parse', 'v0:docs/guide/intro.md').trim();
// ---------- start the computer app's back end ----------
const PORT = 18686;
const app = cp.spawn('python3', ['-I', path.join(__dirname, 'run_app.py'), APP, String(PORT)], { env: ENV, stdio: ['ignore', 'pipe', 'pipe'] });
let appErr = ''; app.stderr.on('data', d => { appErr += d.toString(); });
const started = new Promise((res, rej) => { let buf = ''; app.stdout.on('data', d => { buf += d.toString(); const i = buf.indexOf('\n'); if (i >= 0) { try { res(JSON.parse(buf.slice(0, i))); } catch (e) { rej(e); } } }); setTimeout(() => rej(new Error('the app did not start: ' + appErr.slice(-800))), 60000); });
const call = (n, ...args) => fetch(`http://127.0.0.1:${PORT}/call/${n}`, { method: 'POST', body: JSON.stringify(args) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
(async () => {
  let b;
  try {
    const info = await started;
    ok(['disk_list', 'disk_add', 'disk_choose', 'disk_forget', 'disk_repo', 'disk_objs', 'disk_part', 'disk_sizes'].every(n => info.names.includes(n)), 'the computer app answers the drive calls', info.names.filter(n => /^disk_/.test(n)));
    const added = await call('disk_add', AT);
    // Lumen, brought from GitHub (6.83): a bare repository in the place that holds what came from GitHub, with one invented issue
    const sp = await call('hub_set_place', path.join(T, 'hub'));
    const place = sp.folder || sp.place || (sp.places && sp.places.folder) || path.join(T, 'hub', 'Ingenium GitHub');
    fs.mkdirSync(path.join(place, 'ada', 'Lumen.hub'), { recursive: true });
    cp.execFileSync('git', ['clone', '-q', '--bare', AT, path.join(place, 'ada', 'Lumen.git')], { env: ENV });
    fs.writeFileSync(path.join(place, 'index.json'), JSON.stringify({ repos: { 'ada/Lumen': { full: 'ada/Lumen', name: 'Lumen', description: 'An invented app', git: 'ada/Lumen.git', hub: 'ada/Lumen.hub' } } }));
    fs.writeFileSync(path.join(place, 'ada', 'Lumen.hub', 'issues.json'), JSON.stringify([{ number: 7, title: 'The lamp flickers at dusk', body: 'An invented issue.', state: 'open', labels: [], created_at: '2026-11-01T10:00:00Z', updated_at: '2026-11-02T10:00:00Z', user: { login: 'ada' } }]));
    const L0 = await call('disk_list');
    const lumen = (L0.repos || []).find(x => x.name === 'Lumen') || {};
    ok(added.ok && lumen.ok && lumen.brought, 'Atelier is added from its folder, and Lumen, brought from GitHub, is listed at once', { added, lumen: { ok: lumen.ok, brought: lumen.brought, error: lumen.error } });

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
    await sleep(400);
    // Harbour Garden, an app kept in Ingenium
    const hg = await p.evaluate(async () => { const r = await IngRepo.create({ name: 'Harbour Garden' });
      await IngRepo.putMany(r.id, [{ path: 'README.md', data: '# Harbour Garden\n\nThe lighthouse garden, kept in Ingenium.\n' }, { path: 'index.html', data: '<!doctype html><title>Harbour Garden</title><p>Garden</p>' }]);
      await IngRepo.commit(r.id, 'The first page'); return r.id; });
    await p.evaluate(() => go('fabrica')); await sleep(2500);
    await p.waitForFunction(() => document.querySelectorAll('#fbRepos .r280-sec').length >= 1, null, { timeout: 30000 }).catch(() => {});
    const apps = await p.evaluate(() => ({ secs: [...document.querySelectorAll('#fbRepos .r280-sec')].map(x => x.querySelector('b').textContent + ' | ' + x.querySelector('span').textContent),
      drive: [...document.querySelectorAll('#fbRepos .r280-grid')][0] ? [...[...document.querySelectorAll('#fbRepos .r280-grid')][0].querySelectorAll('.f-repo')].map(t => t.querySelector('.nm').textContent + ' | ' + t.querySelector('.stl span:last-child').textContent) : [],
      kept: [...document.querySelectorAll('#fbRepos .r280-grid')][1] ? [...[...document.querySelectorAll('#fbRepos .r280-grid')][1].querySelectorAll('.f-repo .nm')].map(t => t.textContent) : [],
      add: !!document.getElementById('fbDiskAdd') }));
    ok(apps.secs.length === 2 && /^On this computer · 2 \| This computer · [\d.]+ [KMGT]?B free · no size limit$/.test(apps.secs[0]) && /^Kept in Ingenium · \d+/.test(apps.secs[1]),
      'Your apps: On this computer, its drive and the room left on it, no size limit; and Kept in Ingenium', apps.secs);
    ok(apps.drive.length === 2 && apps.drive.every(x => /^(Atelier|Lumen) \| (Kept · to test|Started · nothing kept yet|\d+ to keep|Tested · ready to ship|Shipped)$/.test(x)) && apps.kept.indexOf('Harbour Garden') >= 0 && apps.add,
      'each drive tile says its state, as any app\'s (6.87); Harbour Garden is kept in Ingenium; Add one from this computer is there', apps);
    await p.screenshot({ path: path.join(OUT, '1_your_apps.png') });
    // ---------- the work, from the drive ----------
    const AID = added.id;
    await p.evaluate(id => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => x.querySelector('.nm').textContent.trim() === 'Atelier'); t.click(); }, AID);
    await sleep(1800);
    const work = await p.evaluate(() => ({ name: document.getElementById('fbWhName').textContent, line: (document.getElementById('fbDiskLine') || {}).textContent || '', branch: document.getElementById('fbBranchName').textContent }));
    ok(work.name === 'Atelier' && /^From This computer · [\d.]+ [KMG]?B, every version · no size limit · kept on the drive as you work$/.test(work.line) && work.branch === 'main',
      'the work says where it is: its drive, its room, every version, no size limit, kept on the drive as you work (6.87)', work);
    await p.evaluate(() => { const b = document.querySelector('#fbViews button[data-v="files"]'); b && b.click(); }); await sleep(1600);
    const files = await p.evaluate(() => [...document.querySelectorAll('#fbWorkBody .nm')].map(n => n.textContent + ' | ' + ((n.parentNode.querySelector('.sz') || {}).textContent || '')));
    ok(files.some(x => /^src\/ \| 3 files · 9\.0 MB$/.test(x) || /^photo\.bin \| 9\.0 MB$/.test(x)) || files.some(x => /9\.0 MB/.test(x)), 'Files: the sizes git gives, the 9 MB file too, without reading it whole', files.slice(0, 12));
    const readme = await p.evaluate(id => IngRepo.readText(id, 'README.md'), AID);
    ok(/lighthouse keeper/.test(readme) && /A changed line\./.test(readme), 'its README, read from the drive', readme.slice(0, 120));
    await p.evaluate(() => { const b = document.querySelector('#fbViews button[data-v="history"]'); b && b.click(); }); await sleep(1800);
    const hist = await p.evaluate(() => document.getElementById('fbWorkBody').textContent);
    ok(['A loose one', 'A submodule, named', 'A change to the README', 'The first version'].every(t => hist.indexOf(t) >= 0) && hist.indexOf('An idea') < 0, 'History: every version of main, from the drive', hist.slice(0, 300));
    const chips = await p.evaluate(id => IngRepo.log(id, { max: 10 }).then(l => l.map(c => c.title + ':' + c.names.join('+'))), AID);
    ok(chips.indexOf('A change to the README:v1') >= 0 && chips.indexOf('The first version:v0') >= 0 && /^A loose one:main/.test(chips[0]), 'each tag names its version in the history, the annotated v1 too', chips);
    await p.screenshot({ path: path.join(OUT, '2_history.png') });
    // ---------- the branch key: Ingenium's own list ----------
    await p.click('#fbBranch'); await sleep(350);
    const list = await p.evaluate(() => { const pop = document.querySelector('.r172-pop.r280-pop'); if (!pop) return null; return { groups: [...pop.querySelectorAll('.r172-gl')].map(x => x.textContent), opts: [...pop.querySelectorAll('.r172-opt')].map(o => o.textContent + (o.getAttribute('aria-selected') === 'true' ? ' *' : '')), native: document.querySelectorAll('#fbWork select').length }; });
    ok(list && list.groups.join(',') === 'Branches,Tags' && list.opts.join(',') === 'idea,main *,v1,v0,All the ideas, side by side' && list.native === 0, 'the branch key opens Ingenium\'s own list: branches, tags, all the ideas; no system list', list);
    await p.screenshot({ path: path.join(OUT, '3_branch_list.png') });
    const pick = async label => { if (!(await p.$('.r172-pop.r280-pop'))) { await p.click('#fbBranch'); await sleep(300); } await p.evaluate(l => { const o = [...document.querySelectorAll('.r280-pop .r172-opt')].find(x => x.textContent === l); o.click(); }, label); await sleep(1800); };
    await pick('idea');
    const onIdea = await p.evaluate(async id => ({ branch: document.getElementById('fbBranchName').textContent, intro: await IngRepo.readText(id, 'docs/guide/intro.md') }), AID);
    ok(onIdea.branch === 'idea' && /An idea\./.test(onIdea.intro), 'choosing idea shows idea, with its own files', onIdea);
    await pick('v0');
    const onV0 = await p.evaluate(async id => ({ branch: document.getElementById('fbBranchName').textContent, readme: await IngRepo.readText(id, 'README.md'), intro: (await IngRepo.files(id)).filter(f => f.path === 'docs/guide/intro.md')[0] }), AID);
    ok(onV0.branch === 'an older version' && !/A changed line\./.test(onV0.readme) && onV0.intro && onV0.intro.oid === INTRO_V0, 'choosing the tag v0 shows Atelier as it was then', { branch: onV0.branch, intro: onV0.intro });
    await pick('main');
    const onMain = await p.evaluate(() => document.getElementById('fbBranchName').textContent);
    ok(onMain === 'main', 'and main again', onMain);
    // ---------- a bare repository takes no file: its files change through a working copy (6.87) ----------
    const writes = await p.evaluate(async id => { const out = {}; for (const [k, f] of [['commit', () => IngRepo.commit(id, 'x')], ['put', () => IngRepo.put(id, 'x.txt', 'x')]]) {
      try { await f(); out[k] = 'written'; } catch (e) { out[k] = String(e.message); } } return out; }, lumen.id);
    ok(Object.values(writes).every(m => /has no folder of files on the drive: make a working copy of it/.test(m)), 'a bare repository: a commit and a file are refused, saying to make a working copy', writes);
    ok(git(AT, 'rev-parse', 'HEAD').trim() === AT_HEAD && git(AT, 'show-ref') === AT_REFS && print(AT) === AT_PRINT, 'git finds the drive\'s versions, branches and tags as they were: no object or ref file written (6.87: the folder follows the idea chosen, as git checkout does)', git(AT, 'status', '--porcelain'));
    // ---------- an object read from the drive is lent, never counted as kept ----------
    const lent = await p.evaluate(async ({ hg, at, oid }) => { const be = IngRepo.core.be(); await IngRepo.readText(at, 'docs/guide/intro.md'); const c = IngRepo.core.store().cache.get(oid);
      const before = await be.ownRec(oid), hadBefore = await IngRepo.core.store().has(oid); await IngRepo.put(hg, 'docs/same.md', 'Begin here.\n'); await IngRepo.commit(hg, 'The same words as Atelier\'s guide');
      const after = await be.ownRec(oid); const has = await IngRepo.core.store().has(oid); return { lentInCache: !!(c && c.away), before: !!before, hadBefore, after: !!after, has }; }, { hg, at: AID, oid: INTRO_V0 });
    ok(lent.lentInCache && !lent.before && !lent.hadBefore && lent.after && lent.has, 'a file read from the drive is lent, not kept: Harbour Garden keeps its own copy of the same words', lent);
    // ---------- Lumen's issue, attached from its records on the drive ----------
    await sleep(1500);
    const iss = await p.evaluate(id => fbHub.record(id).then(r => (r.issues || []).map(i => '#' + i.n + ' ' + i.title)), lumen.id);
    ok(iss.length === 1 && iss[0] === '#7 The lamp flickers at dusk', 'Lumen\'s issue is attached from its records on the drive', iss);
    // ---------- the Ingenium part ----------
    await p.evaluate(() => { window.__asked = []; const plan = { chosen: { id: 'quill', name: 'Quill 3B' } };
      try { window.IngLector.plan = () => plan; } catch (e) { window.IngLector = { plan: () => plan }; }
      window.lxAsk = (run, msgs, max, temp, on) => { window.__asked.push(msgs); on && on('Reading'); return new Promise(r => setTimeout(() => r('An answer written by the stand-in model.'), 120)); }; });
    await p.click('#fbPart_ingenium'); await sleep(500);
    const part = await p.evaluate(() => { const s = document.getElementById('fbPartSec_ingenium'), ship = document.getElementById('fbShip'), body = ship.querySelector('.f-pn-b');
      const others = [...body.children].filter(e => e.classList.contains('f-sec')); const ft = ship.querySelector('.f-pn-f');
      return { shown: !s.hidden, others: others.map(o => o.classList.contains('fr-off')), sel: [...ship.querySelectorAll('.fr-part')].map(b => b.textContent + (b.getAttribute('aria-selected') === 'true' ? ' *' : '')),
        footer: ft ? ft.hidden : null, cards: [...s.querySelectorAll('.r280-tile b')].map(x => x.textContent), where: s.querySelector('.r280-where').textContent }; });
    ok(part.shown && part.others.every(Boolean) && part.sel.join(',') === 'Test,Ship,Copies,Ingenium *' && part.footer !== false, 'the Ingenium part: a fourth part; the others and the footer step aside', part);
    ok(part.cards.join(',') === 'Explain,Review,Release notes,A message,Any version, live,A second copy,Its folder' && /^Your model on this computer, Quill 3B, reads the repository and answers here\. Nothing is sent anywhere\.$/.test(part.where),
      'seven cards, and where the model runs is said', part);
    await p.screenshot({ path: path.join(OUT, '4_ingenium_part.png') });
    const card = async k => { await p.evaluate(k => document.querySelector('#fbPartSec_ingenium .r280-tile[data-k="' + k + '"]').click(), k); await sleep(1500); return p.evaluate(() => document.querySelector('#fbPartSec_ingenium .r280-ans').innerText); };
    const ex = await card('explain');
    const exAsk = await p.evaluate(() => (window.__asked[window.__asked.length - 1] || []).map(m => m.content).join('\n'));
    ok(/An answer written by the stand-in model\./.test(ex) && /Written by Quill 3B/.test(ex) && /A loose one/.test(exAsk) && /notes\.txt/.test(exAsk) && /Plain words/.test(exAsk), 'Explain asks the model with the newest version\'s own words and changes', { ex, exAsk: exAsk.slice(0, 400) });
    const rn = await card('notes');
    const rnAsk = await p.evaluate(() => (window.__asked[window.__asked.length - 1] || []).map(m => m.content).join('\n'));
    ok(/SINCE v1/.test(rnAsk) && /A loose one/.test(rnAsk) && /A submodule, named/.test(rnAsk) && !/A change to the README/.test(rnAsk) && /Release notes since v1/.test(rn), 'Release notes: the versions since the last tag, and only those', rnAsk.slice(0, 400));
    const msg = await card('message');
    ok(/Nothing here waits to be kept: Atelier is read from the drive as it is\./.test(msg), 'A message: nothing waits to be kept on the drive, and that is said', msg);
    const rv = await card('review');
    ok(/no pull request is open in Atelier/.test(rv), 'Review: no pull request is open, and that is said', rv);
    const lv = await card('time');
    const vers = await p.evaluate(() => document.querySelectorAll('#fbPartSec_ingenium .r280-ver').length);
    ok(/Choose a version/.test(lv) && vers === 4, 'Any version, live: every version of main, each with its Open key', { lv, vers });
    const sc = await card('copy');
    ok(/comes with the next stage/.test(sc) && /Nothing is copied yet\./.test(sc), 'A second copy says plainly that it comes in the next stage', sc);
    await p.fill('#fbPartSec_ingenium .r280-find input', 'lighthouse'); await p.click('#fbPartSec_ingenium .r280-find button'); await sleep(4000);
    const hits = await p.evaluate(() => [...document.querySelectorAll('#fbPartSec_ingenium .r280-hit')].map(h => h.querySelector('b').textContent + ' ' + h.childNodes[1].textContent.trim()));
    const hitNote = await p.evaluate(() => (document.querySelector('#fbPartSec_ingenium .r280-hits .f-hint') || {}).textContent || '');
    ok(hits.some(h => /^Atelier · README\.md · line 3/.test(h)) && hits.some(h => /^Lumen · README\.md · line 3/.test(h)) && hits.some(h => /^Harbour Garden · README\.md · line 3/.test(h)) && /by their words/.test(hitNote),
      'Find in every repository: on the drive and kept in Ingenium, by their words', { hits, hitNote });
    await p.screenshot({ path: path.join(OUT, '5_find.png') });
    await p.evaluate(() => { const h = [...document.querySelectorAll('#fbPartSec_ingenium .r280-hit')].find(x => x.querySelector('b').textContent === 'Harbour Garden'); h.click(); }); await sleep(2200);
    const opened = await p.evaluate(() => ({ name: document.getElementById('fbWhName').textContent, view: fbHubHost.S.view, line: !!document.getElementById('fbDiskLine') }));
    ok(opened.name === 'Harbour Garden' && opened.view === 'code' && !opened.line, 'a find opens its file, in its repository\'s Code; an app kept in Ingenium has no drive line', opened);
    // ---------- a pull request kept in Ingenium: merge, squash or rebase, and Ask Ingenium to review it ----------
    await p.evaluate(async hg => {
      await IngRepo.branch(hg, 'night'); await IngRepo.switchTo(hg, 'night');
      await IngRepo.put(hg, 'night.css', 'body{background:#111}\n'); await IngRepo.commit(hg, 'Night, its colours');
      await IngRepo.put(hg, 'README.md', '# Harbour Garden\n\nThe lighthouse garden, kept in Ingenium.\nBy night too.\n'); await IngRepo.commit(hg, 'Night, the README');
      await IngRepo.switchTo(hg, 'main');
      const rec = await fbHub.record(hg); rec.id = hg; rec.name = 'Harbour Garden'; rec.next = 2;
      rec.pulls = [{ n: 1, kind: 'pr', title: 'Night mode', body: 'The garden by night.', state: 'open', labels: [], created: Date.now(), updated: Date.now(), by: 'ada', comments: [], events: [], refs: [], from: 'night', to: 'main' }];
      await fbHub.importAll({ kind: 'ingenium-hub', apps: [rec] });
      fbHubHost.FBS().sel = hg; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.paint(); fbHub.open('pulls', { n: 1 }); }, hg);
    await sleep(2500);
    const prv = await p.evaluate(() => { const a = document.getElementById('hPrAskIng'); return { how: [...document.querySelectorAll('#hPrHow button')].map(b => b.textContent + (b.getAttribute('aria-pressed') === 'true' ? ' *' : '')),
      merge: (document.getElementById('hPrMerge') || {}).textContent, ask: !!a, after: a && a.previousElementSibling ? a.previousElementSibling.id : null }; });
    ok(prv.how.join(',') === 'Merge *,Squash and merge,Rebase and merge' && prv.merge === 'Merge into main' && prv.ask && prv.after === 'hPrChanges',
      'a pull request: Merge, Squash and merge, Rebase and merge; and Ask Ingenium to review it beside Ask for changes', prv);
    await p.screenshot({ path: path.join(OUT, '5b_pull_request.png') });
    await p.click('#hPrAskIng'); await sleep(1600);
    const rvAsk = await p.evaluate(() => ({ shown: !document.getElementById('fbPartSec_ingenium').hidden, ans: document.querySelector('#fbPartSec_ingenium .r280-ans').innerText,
      asked: (window.__asked[window.__asked.length - 1] || []).map(m => m.content).join('\n') }));
    ok(rvAsk.shown && /A review of #1, Night mode/.test(rvAsk.ans) && /PULL REQUEST #1: Night mode \(night into main\)/.test(rvAsk.asked) && /night\.css/.test(rvAsk.asked) && /By night too/.test(rvAsk.asked),
      'Ask Ingenium to review it: the model reads that pull request\'s own changes', { ans: rvAsk.ans.slice(0, 200), asked: rvAsk.asked.slice(0, 500) });
    await p.evaluate(() => { const b = [...document.querySelectorAll('#hPrHow button')].find(x => x.textContent === 'Squash and merge'); b.click(); }); await sleep(800);
    const sq = await p.evaluate(() => (document.getElementById('hPrMerge') || {}).textContent);
    await p.click('#hPrMerge'); await sleep(2500);
    const merged = await p.evaluate(async hg => { const l = await IngRepo.log(hg, { max: 5 }); const rec = await fbHub.record(hg);
      return { top: l[0].title, parents: l[0].parents.length, next: l[1].title, state: rec.pulls[0].state, box: (document.getElementById('hPrMergeBox') || {}).textContent || '' }; }, hg).catch(e => ({ err: String(e) }));
    ok(sq === 'Squash into main' && merged.top === 'Night mode (#1)' && merged.parents === 1 && merged.next === "The same words as Atelier's guide" && merged.state === 'merged',
      'Squash and merge: one version with one parent, named for the pull request, which is merged', { sq, merged });
    await p.click('#fbPart_test'); await sleep(400);
    const back = await p.evaluate(() => { const s = document.getElementById('fbPartSec_ingenium'), ft = document.querySelector('#fbShip .f-pn-f'); return { hidden: s.hidden, footer: ft ? ft.hidden : null, test: document.getElementById('fbPart_test').getAttribute('aria-selected') }; });
    ok(back.hidden && back.footer === false && back.test === 'true', 'Test again: the Ingenium part steps aside, the footer comes back', back);
    // ---------- forgetting ----------
    const fl = await p.evaluate(id => IngRepo.remove(id).then(() => 'forgotten', e => String(e.message)), lumen.id);
    ok(/brought from GitHub/.test(fl), 'Lumen, brought from GitHub, is not forgotten from here, and that is said', fl);
    await p.evaluate(id => { fbHubHost.FBS().sel = id; fbHubHost.S.home = false; return fbHubHost.refresh().then(() => fbHubHost.paint()); }, AID); await sleep(700);
    await p.click('#fbMore'); await sleep(300);
    await p.evaluate(() => { const m = [...document.querySelectorAll('button,[role=menuitem]')].find(x => x.textContent.trim() === 'Remove from Fabrica' && x.offsetParent); m && m.click(); }); await sleep(500);
    const dlg = await p.evaluate(() => { const keys = [...document.querySelectorAll('button')].filter(x => x.offsetParent && /^(Forget it|Remove it)$/.test(x.textContent.trim())); const t = document.body.innerText;
      return { forget: keys.map(k => k.textContent.trim()), title: /Forget Atelier in Fabrica\?/.test(t), says: /Nothing on the drive is touched: the repository stays where it is/.test(t) }; });
    ok(dlg.forget.join() === 'Forget it' && dlg.title && dlg.says, 'the dialog says Fabrica only forgets it: nothing on the drive is touched', dlg);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.offsetParent && x.textContent.trim() === 'Forget it'); k && k.click(); }); await sleep(1500);
    const fa = await p.evaluate(() => IngRepo.list().then(l => l.map(r => r.name)));
    ok(fa.indexOf('Atelier') < 0 && fa.indexOf('Lumen') >= 0 && git(AT, 'rev-parse', 'HEAD').trim() === AT_HEAD && print(AT) === AT_PRINT && fs.existsSync(path.join(AT, 'src', 'photo.bin')), 'Atelier forgotten: Fabrica lists it no more, and it is on the drive as it was', fa);
    // ---------- a phone's width ----------
    await p.setViewportSize({ width: 390, height: 844 }); await sleep(1200);
    await p.evaluate(() => { const t = document.querySelector('#fbTabs button[data-p="ship"]'); if (t) t.click(); const b = document.getElementById('fbPart_ingenium'); if (b) b.click(); }); await sleep(600);
    const phone = await p.evaluate(() => { const t = document.querySelector('#fbPartSec_ingenium .r280-tiles'); const cols = t ? getComputedStyle(t).gridTemplateColumns.split(' ').length : 0; return { wide: document.documentElement.scrollWidth - innerWidth, cols }; });
    ok(phone.wide <= 0 && phone.cols === 1, 'at a phone\'s width nothing is wider than the screen, and the cards stand one to a row', phone);
    await p.screenshot({ path: path.join(OUT, '6_phone.png'), fullPage: false });
    ok(errs.length === 0, 'no page error', errs);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e)); }
  finally { try { b && await b.close(); } catch (e) {} try { app.kill(); } catch (e) {} }
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
