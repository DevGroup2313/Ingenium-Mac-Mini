// node rig/t_708_fabrica_runs.js <app folder: ingenium_app.py (patched by build/desktop/app_runs_708.py) and ingenium.html> <out folder>
// Ingenium 7.08 (14 November 2026), in Chromium with the computer app's own back end (rig/run_app.py, HOME in a temporary folder):
// Fabrica, phase 3, its first stage (modules/r298.js, desktop/app_runs_708.py), as previewed and approved ("I approve of the Fabrica on
// Every Device preview, please commit and push it everywhere"). Invented apps: Tide Clock, a repository on the drive that git made, with two
// workflows; Harbour Garden, kept in Ingenium. Checks:
//   the rooms: Runs between Plans and Care, its tabs Runs, Workflows and Machines;
//   Workflows: each file of .github/workflows read as GitHub reads it, with when it runs and its jobs;
//   Run it now: the run sheet with the workflow's own input; the run on this computer; its jobs (one not run here, saying why), its steps,
//   its whole log (the input and a step's output in it), what it made (Save), the run kept and listed, numbered;
//   a workflow that fails: the failed step, the step after a failure, Explain this error (no model loaded: it says so), Re-run the failed jobs;
//   Needs you: a failed run not yet seen; pressing it opens the run;
//   an app kept in Ingenium: its files sent to the run's folder by the page, and its run passes;
//   a recipe written as a workflow file, a change to keep;
//   Machines: this computer and its tools; the others said to come next;
//   Learn: the room's card, every word side by side, Learning mode's caption on a key;
//   Releases: every device on its own row; Remove this run; at a phone's width nothing is wider than the screen; no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process'); const os = require('os');
const [APP, OUT] = process.argv.slice(2);
if (!APP || !OUT) { console.log('usage: node rig/t_708_fabrica_runs.js <app folder> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const T = fs.mkdtempSync(path.join(os.tmpdir(), 'fab708-')), HOME = path.join(T, 'home'), DRIVE = path.join(T, 'drive');
fs.mkdirSync(HOME); fs.mkdirSync(DRIVE);
const ENV = Object.assign({}, process.env, { HOME, GIT_AUTHOR_NAME: 'Ada Ferreira', GIT_AUTHOR_EMAIL: 'ada@example.invalid', GIT_COMMITTER_NAME: 'Ada Ferreira', GIT_COMMITTER_EMAIL: 'ada@example.invalid', GIT_CONFIG_NOSYSTEM: '1' });
delete ENV.XDG_DATA_HOME;
const git = (cwd, ...a) => cp.execFileSync('git', a, { cwd, env: ENV }).toString();
// ---------- Tide Clock, an invented app, with two workflows ----------
const TC = path.join(DRIVE, 'Tide Clock');
fs.mkdirSync(path.join(TC, '.github', 'workflows'), { recursive: true });
fs.writeFileSync(path.join(TC, 'index.html'), '<!doctype html><title>Tide Clock</title><p>High water at 6:12</p>\n');
fs.writeFileSync(path.join(TC, 'README.md'), '# Tide Clock\n\nAn invented app.\n');
fs.writeFileSync(path.join(TC, '.github', 'workflows', 'check.yml'), `name: Check every version
on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      word:
        description: A word to say
        default: hello
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - id: v
        run: echo "pages=$(ls *.html | wc -l | tr -d ' ')" >> "$GITHUB_OUTPUT"
      - name: Say \${{ inputs.word }}
        run: |
          echo "the word is \${{ inputs.word }}"
          echo "pages: \${{ steps.v.outputs.pages }}"
          mkdir -p out && cp index.html out/
      - uses: actions/upload-artifact@v4
        with:
          name: pages
          path: out/*.html
  mac:
    runs-on: macos-latest
    steps:
      - run: echo never here
`);
fs.writeFileSync(path.join(TC, '.github', 'workflows', 'fails.yml'), `name: Fails on purpose
on: workflow_dispatch
jobs:
  broken:
    runs-on: ubuntu-latest
    steps:
      - name: Break
        run: echo "about to fail"; exit 3
      - name: Clean up
        if: failure()
        run: echo "cleaned up"
`);
git(TC, 'init', '-q', '-b', 'main'); git(TC, 'add', '-A'); git(TC, 'commit', '-q', '-m', 'Tide Clock, with its workflows');
const PORT = 18708;
const app = cp.spawn('python3', ['-I', path.join(__dirname, 'run_app.py'), APP, String(PORT)], { env: ENV, stdio: ['ignore', 'pipe', 'pipe'] });
let appErr = ''; app.stderr.on('data', d => { appErr += d.toString(); });
const started = new Promise((res, rej) => { let buf = ''; app.stdout.on('data', d => { buf += d.toString(); const i = buf.indexOf('\n'); if (i >= 0) { try { res(JSON.parse(buf.slice(0, i))); } catch (e) { rej(e); } } }); setTimeout(() => rej(new Error('the app did not start: ' + appErr.slice(-800))), 120000); });
const call = (n, ...args) => fetch(`http://127.0.0.1:${PORT}/call/${n}`, { method: 'POST', body: JSON.stringify(args) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
(async () => {
  let b;
  try {
    const info = await started;
    ok(['runs_tools', 'runs_new', 'runs_put', 'runs_go', 'runs_stop', 'runs_list', 'runs_get', 'runs_log', 'runs_file', 'runs_reveal', 'runs_forget', 'runs_install_begin', 'runs_install_put', 'runs_install_go'].every(n => info.names.includes(n)),
      'the computer app answers the runs calls', info.names.filter(n => /^runs_/.test(n)));
    const added = await call('disk_add', TC); const TCID = added.id;
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
    const hg = await p.evaluate(async () => { const r = await IngRepo.create({ name: 'Harbour Garden' });
      await IngRepo.putMany(r.id, [{ path: 'index.html', data: '<!doctype html><title>Harbour Garden</title><p>Garden</p>' },
        { path: '.github/workflows/hello.yml', data: 'name: Hello\non: workflow_dispatch\njobs:\n  hi:\n    runs-on: ubuntu-latest\n    steps:\n      - run: cat index.html && echo "the garden answers"\n' }]);
      await IngRepo.commit(r.id, 'The first page, and a workflow'); return r.id; });
    await p.evaluate(() => go('fabrica')); await sleep(2500);
    const openApp = async id => { await p.evaluate(id => { fbHubHost.FBS().sel = id; fbHubHost.S.home = false; return fbHubHost.refresh().then(() => fbHubHost.paint()); }, id); await sleep(900); };
    const view = async v => { await p.evaluate(v => { const b = document.querySelector('#fbViews button[data-v="' + v + '"]'); if (b) b.click(); }, v); await sleep(900); };
    await openApp(TCID);
    // ---------- the rooms ----------
    const rooms = await p.evaluate(() => ({ rooms: [...document.querySelectorAll('#fbRooms .fr-room')].map(b => b.getAttribute('data-room')), five: document.getElementById('fbRooms').classList.contains('r298-five') }));
    ok(JSON.stringify(rooms.rooms) === JSON.stringify(['now', 'story', 'plans', 'runs', 'care']), 'the rooms: Now, Story, Plans, Runs and Care, Runs before Care', rooms);
    await p.evaluate(() => fbRooms.choose('runs')); await sleep(700);
    const tabs = await p.evaluate(() => [...document.querySelectorAll('#fbViews button[data-v]')].filter(b => !b.hidden).map(b => b.getAttribute('data-v')));
    ok(JSON.stringify(tabs) === JSON.stringify(['runs', 'workflows', 'machines']), 'the Runs room shows its own tabs: Runs, Workflows, Machines', tabs);
    // ---------- Workflows ----------
    await view('workflows'); await sleep(800);
    const wfs = await p.evaluate(() => [...document.querySelectorAll('#fbWorkBody .r298-wf')].map(c => ({ name: c.querySelector('b').textContent, file: (c.querySelector('code') || {}).textContent, when: (c.querySelector('small') || {}).textContent, jobs: [...c.querySelectorAll('.on .f-chip')].map(x => x.textContent) })));
    const chk = wfs.find(w => w.name === 'Check every version'), fl = wfs.find(w => w.name === 'Fails on purpose');
    ok(wfs.length === 2 && chk && chk.file === '.github/workflows/check.yml' && /a new version on main; by hand/.test(chk.when) && chk.jobs.join('|') === 'check · ubuntu-latest|mac · macos-latest' && fl,
      'Workflows reads each file in .github/workflows: its name, when it runs, its jobs and their machines', wfs);
    await p.screenshot({ path: path.join(OUT, 'workflows.png') });
    // ---------- Run it now, with its input ----------
    await p.evaluate(() => { const c = [...document.querySelectorAll('#fbWorkBody .r298-wf')].find(x => x.querySelector('b').textContent === 'Check every version'); [...c.querySelectorAll('button')].find(x => x.textContent === 'Run it now').click(); });
    await sleep(600);
    const sh = await p.evaluate(() => { const s = document.querySelector('.f-sheet'); return s ? { title: s.querySelector('h3').textContent, opts: [...s.querySelectorAll('.r298-pick .f-opt b')].map(x => x.textContent), input: (s.querySelector('.r298-inputs input[type=text]') || {}).value, cap: (s.querySelector('.r298-inputs label span') || {}).textContent } : null; });
    ok(sh && sh.title === 'Run Check every version' && sh.opts.length >= 2 && sh.input === 'hello' && /A word to say/.test(sh.cap), 'the run sheet: where each job runs, and the workflow\'s own input with its default', sh);
    await p.screenshot({ path: path.join(OUT, 'run_sheet.png') });
    await p.fill('.f-sheet .r298-inputs input[type=text]', 'salut');
    await p.click('.f-sheet .end .f-btn.pri');
    await p.waitForFunction(() => { const s = window.IngRuns && IngRuns.state(); return s && s.open; }, null, { timeout: 30000 });
    await p.waitForFunction(() => { const st = [...document.querySelectorAll('#fbWorkBody .r298-job .r298-m')].map(m => m.className); return st.length === 2 && st[0].indexOf('ok') >= 0; }, null, { timeout: 90000 }).catch(() => {});
    await sleep(2500);
    const d1 = await p.evaluate(() => ({ head: (document.querySelector('#fbWorkBody .r298-runhead h4') || {}).textContent, jobs: [...document.querySelectorAll('#fbWorkBody .r298-job')].map(j => j.querySelector('b').textContent + ' | ' + j.querySelector('small').textContent),
      steps: [...document.querySelectorAll('#fbWorkBody .r298-step span')].map(s => s.textContent), log: (document.querySelector('#fbWorkBody .r298-log pre') || {}).textContent || '', arts: [...document.querySelectorAll('#fbWorkBody .r298-art b')].map(x => x.textContent),
      view: fbHubHost.S.view, room: fbRooms.room() }));
    ok(d1.view === 'runs' && d1.room === 'runs' && /^Check every version · #1$/.test(d1.head), 'the run opens at once, numbered #1', d1.head);
    ok(d1.jobs.length === 2 && /^check \| this computer/.test(d1.jobs[0]) && /^mac \| Not run: it runs on macOS/.test(d1.jobs[1]), 'its jobs: check on this computer; mac not run here, saying why', d1.jobs);
    ok(d1.steps.some(s => /^Say salut/.test(s)) && /the word is salut/.test(d1.log) && /pages: 1/.test(d1.log), 'the input reaches the step\'s name and its command; a step\'s output reaches the next', { steps: d1.steps, log: d1.log.slice(-500) });
    ok(JSON.stringify(d1.arts) === '["pages"]', 'what it made is kept with the run: pages', d1.arts);
    await p.screenshot({ path: path.join(OUT, 'run_detail.png') });
    // Find in the log
    await p.fill('#fbWorkBody .r298-log input[type=search]', 'salut'); await sleep(300);
    const hits = await p.evaluate(() => document.querySelectorAll('#fbWorkBody .r298-log pre span.hit').length);
    ok(hits >= 1, 'Find in the log marks the lines that hold the word', hits);
    // ---------- the list ----------
    await p.evaluate(() => { const b = [...document.querySelectorAll('#fbWorkBody .r298-runhead button')].find(x => x.textContent === 'All runs'); b.click(); }); await sleep(700);
    const l1 = await p.evaluate(() => [...document.querySelectorAll('#fbWorkBody .r298-run')].map(r => r.querySelector('b').textContent + ' | ' + r.querySelector('.f-chip').textContent));
    ok(l1.length === 1 && l1[0] === 'Check every version · #1 | Passed', 'All runs lists it, passed', l1);
    // ---------- a workflow that fails ----------
    await view('workflows');
    await p.evaluate(() => { const c = [...document.querySelectorAll('#fbWorkBody .r298-wf')].find(x => x.querySelector('b').textContent === 'Fails on purpose'); [...c.querySelectorAll('button')].find(x => x.textContent === 'Run it now').click(); });
    await sleep(500); await p.click('.f-sheet .end .f-btn.pri');
    await p.waitForFunction(() => document.querySelector('#fbWorkBody .r298-explain'), null, { timeout: 90000 }).catch(() => {});
    await sleep(1500);
    const d2 = await p.evaluate(() => ({ head: (document.querySelector('#fbWorkBody .r298-runhead h4') || {}).textContent, steps: [...document.querySelectorAll('#fbWorkBody .r298-step')].map(s => s.querySelector('.r298-m').className.replace('r298-m', '').trim() + ':' + s.querySelectorAll('span')[1].textContent),
      ex: !!document.querySelector('#fbWorkBody .r298-explain'), keys: [...document.querySelectorAll('#fbWorkBody .r298-runhead button')].map(x => x.textContent), log: (document.querySelector('#fbWorkBody .r298-log pre') || {}).textContent || '' }));
    ok(/Fails on purpose · #2/.test(d2.head) && /^bad:Break/.test(d2.steps[0]) && /^ok:Clean up/.test(d2.steps[1]) && /cleaned up/.test(d2.log), 'the failed step is marked; the step for after a failure runs', d2);
    ok(d2.ex && d2.keys.indexOf('Re-run the failed jobs') >= 0 && d2.keys.indexOf('Run it again') >= 0, 'Explain this error, Re-run the failed jobs and Run it again are offered', d2.keys);
    await p.evaluate(() => { const b = [...document.querySelectorAll('#fbWorkBody .r298-explain button')].find(x => x.textContent === 'Explain this error'); b.click(); }); await sleep(600);
    const said = await p.evaluate(() => (document.querySelector('#fbWorkBody .r298-explain .said') || {}).textContent || '');
    ok(/Load a model first/.test(said), 'with no model loaded, Explain this error says so, and that nothing leaves this computer', said);
    await p.screenshot({ path: path.join(OUT, 'run_failed.png') });
    // ---------- Needs you ----------
    await p.evaluate(() => { fbHubHost.FBS().runsSeen = {}; IngRuns.needs(true); }); await sleep(1500);
    const nd = await p.evaluate(() => [...document.querySelectorAll('.r298-needs .r298-need b')].map(x => x.textContent));
    ok(nd.some(t => t === 'Tide Clock: Fails on purpose failed'), 'Needs you lists the failed run not yet seen', nd);
    await p.screenshot({ path: path.join(OUT, 'needs_you.png') });
    await p.evaluate(() => { const b = [...document.querySelectorAll('.r298-needs .r298-need')].find(x => /Fails on purpose failed/.test(x.textContent)); b.click(); }); await sleep(900);
    const nopen = await p.evaluate(() => ({ head: (document.querySelector('#fbWorkBody .r298-runhead h4') || {}).textContent, view: fbHubHost.S.view }));
    ok(nopen.view === 'runs' && /Fails on purpose · #2/.test(nopen.head), 'pressing it opens that run', nopen);
    // Re-run the failed jobs
    await p.evaluate(() => { const b = [...document.querySelectorAll('#fbWorkBody .r298-runhead button')].find(x => x.textContent === 'Re-run the failed jobs'); b.click(); });
    await p.waitForFunction(() => /#3/.test((document.querySelector('#fbWorkBody .r298-runhead h4') || {}).textContent || ''), null, { timeout: 60000 }).catch(() => {});
    const r3 = await p.evaluate(() => ({ head: (document.querySelector('#fbWorkBody .r298-runhead h4') || {}).textContent, why: (document.querySelector('#fbWorkBody .r298-runhead small') || {}).textContent }));
    ok(/Fails on purpose · #3/.test(r3.head) && /the failed jobs of #2 again/.test(r3.why), 'Re-run the failed jobs starts run #3, saying so', r3);
    await sleep(3000);
    // ---------- an app kept in Ingenium: the page sends its files ----------
    await openApp(hg); await p.evaluate(() => fbRooms.choose('runs')); await sleep(500); await view('workflows');
    await p.evaluate(() => { const c = document.querySelector('#fbWorkBody .r298-wf'); [...c.querySelectorAll('button')].find(x => x.textContent === 'Run it now').click(); });
    await sleep(500); await p.click('.f-sheet .end .f-btn.pri');
    await p.waitForFunction(() => /the garden answers/.test((document.querySelector('#fbWorkBody .r298-log pre') || {}).textContent || ''), null, { timeout: 60000 }).catch(() => {});
    const hgl = await p.evaluate(() => (document.querySelector('#fbWorkBody .r298-log pre') || {}).textContent || '');
    ok(/<title>Harbour Garden<\/title>/.test(hgl) && /the garden answers/.test(hgl), 'an app kept in Ingenium: its files go to the run\'s folder from the page, and its run reads them', hgl.slice(-300));
    // ---------- a recipe ----------
    await view('workflows');
    await p.evaluate(() => { const b = [...document.querySelectorAll('#fbWorkFoot button')].find(x => x.textContent === 'New workflow, from a recipe'); b.click(); }); await sleep(500);
    const rc = await p.evaluate(() => [...document.querySelectorAll('.f-sheet .r298-pick .f-opt b')].map(x => x.textContent));
    ok(JSON.stringify(rc) === JSON.stringify(['Check every version', 'Keep the app\'s pages', 'Check every night', 'Begin from nothing']), 'four recipes', rc);
    await p.click('.f-sheet .end .f-btn.pri'); await sleep(1500);
    const st = await p.evaluate(id => IngRepo.status(id).then(s => s.changes.map(c => c.path + ':' + c.kind)), hg);
    ok(st.indexOf('.github/workflows/check.yml:added') >= 0, 'the recipe is written as a workflow file, a change to keep', st);
    const parsed = await p.evaluate(id => IngRepo.readText(id, '.github/workflows/check.yml').then(t => { const y = IngRuns.core.yaml(t); return { name: y.name, jobs: Object.keys(y.jobs), on: Object.keys(y.on) }; }), hg);
    ok(parsed.name === 'Check every version' && parsed.jobs[0] === 'check' && parsed.on.join(',') === 'push,workflow_dispatch', 'and it is a workflow Fabrica and GitHub read', parsed);
    // ---------- Machines ----------
    await view('machines'); await sleep(1500);
    const mc = await p.evaluate(() => ({ cards: [...document.querySelectorAll('#fbWorkBody .r298-mc > div > b')].map(x => x.textContent), tools: [...document.querySelectorAll('#fbWorkBody .r298-mc .r298-tool')].map(x => x.textContent).slice(0, 12) }));
    ok(/^This computer/.test(mc.cards[0]) && mc.cards.indexOf('Your other computers') >= 0 && mc.cards.indexOf('GitHub\'s machines') >= 0 && mc.tools.some(t => /Python 3/.test(t)) && mc.tools.some(t => /git/.test(t)),
      'Machines: this computer with its tools checked; the others said to come next', mc);
    await p.screenshot({ path: path.join(OUT, 'machines.png') });
    // ---------- Learn ----------
    const lk = await p.evaluate(() => { const k = document.querySelector('#fbRoomSays .r298-learnk'); if (!k) return null; k.click(); return true; }); await sleep(500);
    const lc = await p.evaluate(() => { const c = document.querySelector('.r298-lcard'); return c ? { h: c.querySelector('h4').textContent, dd: [...c.querySelectorAll('dd')].map(x => x.textContent) } : null; });
    ok(lk && lc && lc.h === 'Machines' && /Runners/.test(lc.dd[0]), 'Learn opens the room\'s card: what it is, its names on GitHub and in git, why it matters', lc);
    await p.evaluate(() => { const b = [...document.querySelectorAll('.r298-lcard button')].find(x => /side by side/.test(x.textContent)); b.click(); }); await sleep(400);
    const gl = await p.evaluate(() => document.querySelectorAll('.f-sheet .r298-gloss > b').length);
    ok(gl >= 15, 'Every word, side by side: Fabrica\'s words with GitHub\'s and git\'s', gl);
    await p.screenshot({ path: path.join(OUT, 'glossary.png') });
    await p.keyboard.press('Escape'); await sleep(300); await p.evaluate(() => { const s = document.querySelector('.f-sheet-wrap'); if (s) s.remove(); });
    await p.evaluate(() => { const b = [...document.querySelectorAll('.r298-lcard button')].find(x => /^Learning mode/.test(x.textContent)); b.click(); }); await sleep(300);
    await p.hover('#fbRooms .fr-room[data-room="runs"]'); await sleep(500);
    const cap = await p.evaluate(() => { const c = document.querySelector('.r298-cap'); return c ? { on: c.classList.contains('on'), t: c.textContent } : null; });
    ok(cap && cap.on && /GitHub: Actions/.test(cap.t), 'Learning mode: pointing at the Runs room shows its name on GitHub', cap);
    // ---------- Releases: every device ----------
    await p.evaluate(async id => { const r = (await IngRepo.list()).find(x => x.id === id); const u = new TextEncoder().encode('<!doctype html><p>Garden</p>');
      await fbMade.keep(r, r.head, 'page', 'harbour-garden.html', 'text/html', u); await fbMade.keep(r, r.head, 'win', 'Harbour-Garden-windows-1.0.zip', 'application/zip', new Uint8Array([80, 75, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
      fbHubHost.C.log = {}; }, hg);
    await p.evaluate(() => fbRooms.choose('story')); await sleep(400); await view('releases'); await sleep(1500);
    const rel = await p.evaluate(() => ({ devs: [...document.querySelectorAll('#fbWorkBody .r298-dev > b')].map(x => x.textContent), assets: [...document.querySelectorAll('#fbWorkBody .r298-asset:not(.miss) b')].map(x => x.textContent),
      keys: [...document.querySelectorAll('#fbWorkBody .r298-asset:not(.miss) .f-btn')].map(x => x.textContent), miss: document.querySelectorAll('#fbWorkBody .r298-asset.miss').length, foot: [...document.querySelectorAll('#fbWorkFoot .f-btn')].map(x => x.textContent) }));
    ok(rel.devs.indexOf('Windows') >= 0 && rel.devs.indexOf('Web and one page') >= 0 && rel.assets.indexOf('harbour-garden.html') >= 0 && rel.assets.indexOf('Harbour-Garden-windows-1.0.zip') >= 0, 'Releases: each package on its device\'s row', rel);
    ok(rel.keys.indexOf('Install on this PC') < 0 && rel.keys.indexOf('Install on this Mac') < 0 && rel.keys.filter(k => k === 'Save').length === 2, 'on a computer that is neither, no Install key; Save on each', rel.keys);
    await p.screenshot({ path: path.join(OUT, 'releases.png') });
    // ---------- Remove this run ----------
    await p.evaluate(() => fbRooms.choose('runs')); await sleep(300); await view('runs'); await sleep(700);
    const before = await p.evaluate(() => document.querySelectorAll('#fbWorkBody .r298-run').length);
    await p.evaluate(() => document.querySelector('#fbWorkBody .r298-run').click()); await sleep(1200);
    await p.evaluate(() => { window.ingAsk = () => Promise.resolve(true); const b = [...document.querySelectorAll('#fbWorkFoot button')].find(x => x.textContent === 'Remove this run'); b.click(); }); await sleep(1500);
    const after = await p.evaluate(() => document.querySelectorAll('#fbWorkBody .r298-run').length);
    ok(before === 1 && after === 0, 'Remove this run takes it away', { before, after });
    // ---------- a phone's width ----------
    await openApp(TCID); await p.evaluate(() => fbRooms.choose('runs')); await sleep(400); await view('runs'); await sleep(600);
    await p.evaluate(() => document.querySelector('#fbWorkBody .r298-run') && document.querySelector('#fbWorkBody .r298-run').click()); await sleep(1200);
    await p.setViewportSize({ width: 390, height: 844 }); await sleep(1200);
    await p.evaluate(() => { try { fbHubHost.setPanel('work'); } catch (e) {} }); await sleep(800);
    const wide = await p.evaluate(() => { const W = document.documentElement.clientWidth; return [...document.querySelectorAll('#fb .r298-pad *')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.right > W + 1; }).map(e => e.className).slice(0, 5); });
    ok(!wide.length, 'at a phone\'s width nothing in the runs is wider than the screen', wide);
    await p.screenshot({ path: path.join(OUT, 'phone_run.png') });
    ok(!errs.length, 'no page error', errs);
  } catch (e) { ok(false, 'the test went through', String(e && e.stack || e).slice(0, 900)); }
  finally { if (b) await b.close(); app.kill(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0); }
})();
