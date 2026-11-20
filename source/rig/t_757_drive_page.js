// node rig/t_757_drive_page.js <api port of rig/run_app.py> <a folder standing in for the drive> <out folder>
// Ingenium 7.57 · Fabrica's plan, stage 3, part two, on a drive: the page's side (modules/r280.js routes the pick and changes put aside to
// the computer app; modules/r342.js offers its keys on a drive repository with a folder of files; modules/r110.js shares its merge), with
// the page bridged to the computer app's own back-end (rig/run_app.py, its ingenium_app.py patched with build/desktop/app_disk_fix_757.py
// and app_pick_757.py). An invented app (Tide Clock) and people (Ada writes on an idea, Theo brings versions in). Each result is read back
// with git itself:
//   1. a drive repository is added and opened; Ideas offers Pick its versions on the other idea;
//   2. a version with nothing changed both ways, brought in from the sheet: made at once, git's words (cherry picked from commit <id>),
//      the author and the author's time kept, one parent, the folder clean;
//   3. a version with a line changed both ways: Changes says so, the words box holds the version's words with git's line, git says a
//      cherry-pick is under way; resolved and kept: one parent, the picked version's author, git's pick files gone;
//   4. Put aside in Changes: git stash list shows her words, the folder is clean, the Put aside list shows it; Bring back: the change is
//      back, git's list empty; put aside again and Drop, asked first: gone;
//   5. no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const API = +process.argv[2], DRIVE = process.argv[3], OUT = process.argv[4];
if (!API || !DRIVE || !OUT) { console.log('usage: node rig/t_757_drive_page.js <api port> <drive folder> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; return !!c; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const W = path.join(DRIVE, 'Tide Clock');
const ENV = Object.assign({}, process.env, { GIT_CONFIG_NOSYSTEM: '1', GIT_AUTHOR_NAME: 'Ada Ferreira', GIT_AUTHOR_EMAIL: 'ada@example.invalid', GIT_COMMITTER_NAME: 'Ada Ferreira', GIT_COMMITTER_EMAIL: 'ada@example.invalid' });
const git = (args, env) => cp.execFileSync('git', args, { cwd: W, env: env || ENV, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const gitq = (args) => { try { return git(args); } catch (e) { return (e.stdout || '') + (e.stderr || ''); } };
const put = (rel, text) => { const f = path.join(W, ...rel.split('/')); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, text); };
const read = (rel) => { try { return fs.readFileSync(path.join(W, ...rel.split('/')), 'utf8'); } catch (e) { return null; } };
(async () => {
  // the repository, as git makes it
  fs.rmSync(W, { recursive: true, force: true }); fs.mkdirSync(W, { recursive: true });
  git(['init', '-q', '-b', 'main']); git(['config', 'user.name', 'Ada Ferreira']); git(['config', 'user.email', 'ada@example.invalid']);
  put('app/tide.js', 'function next(){\n  return 6.2;\n}\n'); put('README.md', '# Tide Clock\n\nHigh water, twice a day.\n');
  git(['add', '-A']); git(['commit', '-qm', 'The first version']); git(['checkout', '-qb', 'evening']);
  const EV = Object.assign({}, ENV, { GIT_AUTHOR_DATE: '2026-11-19T10:00:00+0100' });
  put('app/evening.js', 'export const evening = 18.5;\n'); git(['add', '-A']); git(['commit', '-qm', 'Evening tides'], EV);
  put('README.md', '# Tide Clock\n\nHigh water, twice a day, and the evening tide.\n'); git(['add', '-A']); git(['commit', '-qm', 'The evening, said'], EV);
  git(['checkout', '-q', 'main']); put('README.md', '# Tide Clock\n\nHigh water, twice a day, by the harbour.\n'); git(['add', '-A']); git(['commit', '-qm', 'The harbour']);
  const ev = Object.fromEntries(git(['log', '--format=%s|%H', 'evening']).trim().split('\n').map((x) => x.split('|')));

  const info = await (await fetch('http://127.0.0.1:' + API + '/')).json();
  const call = (n, ...a) => fetch('http://127.0.0.1:' + API + '/call/' + n, { method: 'POST', body: JSON.stringify(a) }).then((r) => r.json()).then((j) => j.v);
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
  await ctx.addInitScript(({ names, API, FOLDER }) => {
    const api = {};
    for (const n of names) api[n] = (...args) => fetch('http://127.0.0.1:' + API + '/call/' + n, { method: 'POST', body: JSON.stringify(args) }).then((r) => r.json()).then((j) => { if (!j.ok) throw new Error(j.e); return j.v; });
    api.disk_choose = () => api.disk_add(FOLDER);   // what the folder dialog would answer
    window.pywebview = { api };
    window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50));
  }, { names: info.names, API, FOLDER: W });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 300)));
  const show = async (v) => { await p.evaluate((v) => { fbHubHost.S.view = v; fbHubHost.paint(); }, v); await sleep(1800); };
  const refresh = async () => { await p.evaluate(async () => { await fbHubHost.refresh(); fbHubHost.paint(); }); await sleep(1200); };
  // a drive repository's record comes through the computer app: the ideas are looked for until they are drawn (up to 30 s)
  const ideasDrawn = async () => { for (let i = 0; i < 40; i++) { if (i % 12 === 0) await p.evaluate(() => { fbHubHost.S.view = 'ideas'; fbHubHost.paint(); });
      await sleep(1000); const n = await p.evaluate(() => [...document.querySelectorAll('#fbWorkBody .f-idea')].filter((x) => /^evening/.test(x.textContent.trim())).length); if (n) return true; } return false; };
  try {
    await p.goto('http://127.0.0.1:' + info.port + '/ingenium.html', { waitUntil: 'domcontentloaded', timeout: 300000 });
    await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('fabrica'); });
    await sleep(2500);
    // added with Fabrica's own key, Add one from this computer (its folder dialog answered with the test's folder)
    await p.waitForSelector('#fbDiskAdd', { timeout: 30000 });
    await p.evaluate(() => { IngRepo.setAuthor({ name: 'Theo', email: 'theo@example.invalid' }); document.getElementById('fbDiskAdd').click(); });
    await sleep(4000);
    const id = await p.evaluate(() => { try { return fbHubHost.FBS().sel; } catch (e) { return null; } });
    ok(/^disk:/.test(id || ''), '1. the repository on the drive is added with Add one from this computer, and opened', id);
    await sleep(2000); await ideasDrawn(); await sleep(800);
    const offer = await p.evaluate(() => { const e = [...document.querySelectorAll('#fbWorkBody .f-idea')].find((x) => /^evening/.test(x.textContent.trim())); return e ? !!e.querySelector('[data-r342="pick"]') : null; });
    const seen = offer === true ? null : await p.evaluate(() => { let c = null; try { c = fbHubHost.cur(); } catch (e) {} return { view: fbHubHost.S.view, home: fbHubHost.S.home, sel: fbHubHost.FBS().sel, cur: c ? c.id : null,
      body: ((document.getElementById('fbWorkBody') || {}).innerText || '').slice(0, 400), page: (document.querySelector('#page-fabrica') || {}).offsetParent ? 'shown' : 'hidden' }; });
    if (seen) await p.screenshot({ path: path.join(OUT, '1-ideas.png') });
    ok(offer === true, '   Ideas offers Pick its versions on the other idea, on a drive', seen || offer);
    // 2. nothing changed both ways, from the sheet
    await p.evaluate(() => [...document.querySelectorAll('#fbWorkBody .f-idea')].find((x) => /^evening/.test(x.textContent.trim())).querySelector('[data-r342="pick"]').click());
    await sleep(2500);
    const rows = await p.evaluate(() => [...document.querySelectorAll('.f-sheet .r342-v')].map((x) => x.getAttribute('data-oid')));
    ok(rows.includes(ev['Evening tides']) && rows.includes(ev['The evening, said']), '   the sheet lists the other idea\'s versions, read from the drive', rows);
    await p.evaluate((oid) => document.querySelector('.f-sheet .r342-v[data-oid="' + oid + '"] [data-r342="bring"]').click(), ev['Evening tides']);
    await sleep(3500);
    const said = await p.evaluate(() => (document.querySelector('.f-sheet .r342-v.r342-done .r342-tag') || {}).textContent || '');
    const top = git(['log', '-1', '--format=%H|%an|%ae|%ad|%P', '--date=raw', 'main']).trim().split('|');
    const orig = git(['log', '-1', '--format=%an|%ae|%ad', '--date=raw', ev['Evening tides']]).trim();
    ok(/^Brought in as [0-9a-f]{7}$/.test(said) && said.slice(-7) === top[0].slice(0, 7), '2. brought in at once: the sheet says it, git has it on main', { said, top });
    ok(git(['log', '-1', '--format=%B', 'main']).trim() === 'Evening tides\n\n(cherry picked from commit ' + ev['Evening tides'] + ')', '   git\'s own words, ending (cherry picked from commit <id>)', git(['log', '-1', '--format=%B', 'main']));
    ok([top[1], top[2], top[3]].join('|') === orig && top[4].split(' ').length === 1, '   the author and the author\'s time are the picked version\'s; one parent', { top, orig });
    ok(read('app/evening.js') === 'export const evening = 18.5;\n' && gitq(['status', '--porcelain']) === '', '   the file is in the folder, and the folder is clean', gitq(['status', '--porcelain']));
    await p.evaluate(() => { try { document.querySelector('.f-sheet-wrap').remove(); } catch (e) {} });
    // 3. a line changed both ways, from the sheet
    await ideasDrawn(); await sleep(800);
    await p.evaluate(() => [...document.querySelectorAll('#fbWorkBody .f-idea')].find((x) => /^evening/.test(x.textContent.trim())).querySelector('[data-r342="pick"]').click());
    await sleep(2500);
    await p.evaluate((oid) => document.querySelector('.f-sheet .r342-v[data-oid="' + oid + '"] [data-r342="bring"]').click(), ev['The evening, said']);
    await sleep(4500);
    const st3 = await p.evaluate(() => ({ view: fbHubHost.S.view, note: [...document.querySelectorAll('#fbWorkBody .f-note')].map((x) => x.textContent).join(' | '), words: (document.getElementById('fbMsg') || {}).value || '' }));
    ok(st3.view === 'changes' && /Bringing in/.test(st3.note) && /The evening, said/.test(st3.note), '3. a line changed both ways: Changes says the version is being brought in', st3);
    ok(st3.words === 'The evening, said\n\n(cherry picked from commit ' + ev['The evening, said'] + ')', '   the words box holds the version\'s words with git\'s own line', st3.words);
    ok(/You are currently cherry-picking commit/.test(gitq(['status'])) && /<<<<<<</.test(read('README.md') || ''), '   git itself says a cherry-pick is under way; README.md holds both versions', gitq(['status']).slice(0, 300));
    await p.screenshot({ path: path.join(OUT, '3-both-ways.png') });
    const kept = await p.evaluate(async (id) => { await IngRepo.put(id, 'README.md', '# Tide Clock\n\nHigh water, twice a day, by the harbour and in the evening.\n');
      try { return { oid: await IngRepo.commit(id, document.getElementById('fbMsg').value) }; } catch (e) { return { e: String(e.message || e) }; } }, id);
    const top3 = git(['log', '-1', '--format=%H|%an|%ad|%P', '--date=raw', 'main']).trim().split('|');
    ok(kept.oid && kept.oid === top3[0] && top3[3].split(' ').length === 1, '   resolved and kept: one parent', { kept, top3 });
    ok([top3[1], top3[2]].join('|') === git(['log', '-1', '--format=%an|%ad', '--date=raw', ev['The evening, said']]).trim(), '   the picked version\'s author and the author\'s time', top3);
    ok(!fs.existsSync(path.join(W, '.git', 'CHERRY_PICK_HEAD')) && gitq(['status', '--porcelain']) === '' && /cherry picked from commit/.test(git(['log', '-1', '--format=%B', 'main'])),
      '   git\'s pick files gone, the folder clean, git\'s line in its words', gitq(['status', '--porcelain']));
    // 4. Put aside, in Changes
    put('README.md', '# Tide Clock\n\nHigh water, by the moon.\n'); put('notes/moon.txt', 'waxing\n');
    await refresh(); await show('changes');
    await p.fill('#fbMsg', 'Halfway through the moon');
    const key = await p.evaluate(() => !!document.querySelector('[data-r342="aside"]'));
    ok(key, '4. Changes offers Put aside, on a drive', key);
    await p.evaluate(() => document.querySelector('[data-r342="aside"]').click()); await sleep(3500);
    ok(gitq(['stash', 'list']).trim() === 'stash@{0}: On main: Halfway through the moon', '   git stash list shows her words', gitq(['stash', 'list']));
    ok(gitq(['status', '--porcelain']) === '' && !fs.existsSync(path.join(W, 'notes', 'moon.txt')), '   the folder is clean, the new file aside too', gitq(['status', '--porcelain']));
    await show('changes');
    const row = await p.evaluate(() => [...document.querySelectorAll('#r342Aside .r342-row')].map((x) => x.textContent.replace(/\s+/g, ' ')));
    ok(row.length === 1 && /Halfway through the moon/.test(row[0]), '   the Put aside list shows it', row);
    await p.screenshot({ path: path.join(OUT, '4-aside.png') });
    await p.evaluate(() => document.querySelector('#r342Aside [data-r342="back"]').click()); await sleep(3500);
    ok(read('README.md') === '# Tide Clock\n\nHigh water, by the moon.\n' && read('notes/moon.txt') === 'waxing\n' && gitq(['stash', 'list']) === '',
      '   Bring back: the change and the new file are back, git\'s list is empty', { readme: read('README.md'), list: gitq(['stash', 'list']) });
    await refresh(); await show('changes'); await p.fill('#fbMsg', 'Again');
    await p.evaluate(() => document.querySelector('[data-r342="aside"]').click()); await sleep(3500); await show('changes');
    await p.evaluate(() => document.querySelector('#r342Aside [data-r342="drop"]').click()); await sleep(900);
    const ask = await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.offsetParent && x.textContent.trim() === 'Drop them'); if (k) { k.click(); return true; } return false; });
    await sleep(2500);
    ok(ask && gitq(['stash', 'list']) === '' && !fs.existsSync(path.join(W, '.git', 'refs', 'stash')), '   Drop, asked first: gone from git\'s list, refs/stash with it', { ask, list: gitq(['stash', 'list']) });
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 900)); }
  ok(errs.length === 0, '5. no page error', errs.slice(0, 6));
  console.log(`\n${pass} passed, ${fail} failed`); await b.close(); process.exit(fail ? 1 : 0);
})();
