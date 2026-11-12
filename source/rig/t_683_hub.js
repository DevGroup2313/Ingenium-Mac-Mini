// node rig/t_683_hub.js <Ingenium page file (master)> <patched Mac ingenium_app.py> <out folder>
// Ingenium 6.83 (11 November 2026), in Chromium: Fabrica brings everything from GitHub (modules/r276.js with desktop/app_hub_683.py).
// Her words: "I want to transfer all of my data and contents from GitHub directly to Ingenium and continue working from there without
// missing a beat"; on the preview: "I like the preview please push it everywhere but make sure that all of the apps logos are showing
// instead of the coloured letters". The computer app's own back-end runs here (rig/run_app.py), with the engine, against a stand-in
// GitHub (rig/hub683_mock.py: invented repositories and people). Checks:
//   the key Everything from GitHub stands beside Bring one in; the sheet opens on Sign in once; a key signs in (through r114);
//   the repositories are read and listed, each with a logo and never a letter (its own logo from its files, or Fabrica's mark), and
//   her apps' names wear their own logos (the four seals, Lakay's, the master logo); a folder is chosen; choices change the total;
//   Bring everything runs, with its steps, and ends checked against GitHub; Open in Fabrica opens a repository with every branch and
//   tag, its issues, pull requests and comments, its labels and description; the keys lift, sink and sound (r176); by night; on a
//   phone nothing scrolls sideways; no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process'); const os = require('os');
const [PAGE, APP, OUT] = process.argv.slice(2);
if (!PAGE || !APP || !OUT) { console.log('usage: node rig/t_683_hub.js <page file> <patched ingenium_app.py> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const T = fs.mkdtempSync(path.join(os.tmpdir(), 'hub683p-')), HERE = __dirname, TOKEN = 'invented-key-683', PORT = 18693, FPORT = 18694, API = 18695;
const WORK = path.join(T, 'github'), APPDIR = path.join(T, 'app'), HOME = path.join(T, 'home'), DRIVE = path.join(T, 'studio-drive');
[WORK, APPDIR, HOME, DRIVE].forEach(d => fs.mkdirSync(d, { recursive: true }));
fs.copyFileSync(APP, path.join(APPDIR, 'ingenium_app.py')); fs.copyFileSync(PAGE, path.join(APPDIR, 'ingenium.html'));
const mock = cp.spawn('python3', [path.join(HERE, 'hub683_mock.py'), String(PORT), String(FPORT), WORK, TOKEN, path.join(T, 'requests.jsonl')], { stdio: ['ignore', 'pipe', 'inherit'] });
const env = Object.assign({}, process.env, { HOME, INGENIUM_HUB_API: 'http://127.0.0.1:' + PORT + '/api', INGENIUM_HUB_GIT: 'http://127.0.0.1:' + PORT + '/git' });
let back = null;
(async () => {
  await new Promise(r => mock.stdout.once('data', r));
  back = cp.spawn('python3', [path.join(HERE, 'run_app.py'), APPDIR, String(API)], { env, stdio: 'ignore' });
  let info = null; for (let i = 0; i < 120 && !info; i++) { try { info = await (await fetch('http://127.0.0.1:' + API + '/')).json(); } catch (e) { await sleep(500); } }
  ok(info && info.names.includes('hub_bring') && info.names.includes('hub_git_read'), 'the computer app carries the engine (hub_scan, hub_bring, hub_git_read...)', info && info.names.filter(n => /^hub_/.test(n)));
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } });
  await ctx.addInitScript(({ names, API, DRIVE }) => {
    const api = {};
    for (const n of names) api[n] = (...args) => fetch('http://127.0.0.1:' + API + '/call/' + n, { method: 'POST', body: JSON.stringify(args) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
    api.hub_choose_place = () => api.hub_set_place(DRIVE);   // what the folder dialog would answer
    window.pywebview = { api };
    window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50));
  }, { names: info.names, API, DRIVE });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto('http://127.0.0.1:' + info.port + '/ingenium.html', { waitUntil: 'domcontentloaded', timeout: 300000 });
  await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(1200);
  await p.evaluate(({ PORT }) => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.github = { api: 'http://127.0.0.1:' + PORT + '/api' }; try { saveState(); } catch (e) {} go('fabrica'); }, { PORT });
  await sleep(2500);

  // the key, and the sheet's first step
  const k = await p.evaluate(() => { const a = document.getElementById('fbBring'), b = document.getElementById('fbHubBring'); return { here: !!b, beside: !!(a && b && a.nextSibling === b), text: b && b.textContent, part: window.__ingParts && window.__ingParts.p276 }; });
  ok(k.here && k.beside && k.text === 'Everything from GitHub' && k.part === 'running', 'the key Everything from GitHub stands beside Bring one in', k);
  await p.click('#fbHubBring'); await sleep(600);
  const s1 = await p.evaluate(() => ({ step: IngHubBring.state().step, h: (document.querySelector('#fb .hb h4') || {}).textContent, key: !!document.getElementById('hbKey') }));
  ok(s1.step === 1 && /Sign in to GitHub once/.test(s1.h) && s1.key, 'the sheet opens on Sign in once, with a way to sign in by key', s1);
  // Fabrica's own key sign-in (r114, fbGitHub.signIn) is tested in its own tests; here it stands in, so the sheet's part is what is checked
  await p.evaluate(() => { window.__signedWith = null; fbGitHub.signIn = (t) => { window.__signedWith = t; state.github.token = t; state.github.login = 'ledger-studio'; return Promise.resolve('ledger-studio'); }; });
  await p.fill('#hbKey', TOKEN); await p.click('text=Sign in with the key');
  await p.waitForFunction(() => IngHubBring.state().step === 2 && document.querySelectorAll('#fb .hb-tbl tbody tr').length === 2, null, { timeout: 120000 }).catch(() => {});
  const s2 = await p.evaluate(() => ({ step: IngHubBring.state().step, login: state.github.login, said: (document.getElementById('hbWait') || {}).textContent, gh: JSON.stringify(Object.keys(state.github || {})), st: JSON.stringify((IngHubBring.state().st || {}).scan || null).slice(0, 300), rows: [...document.querySelectorAll('#fb .hb-tbl tbody tr')].map(tr => ({ name: tr.querySelector('.hb-pick').textContent, logo: tr.querySelector('.hb-logo') && tr.querySelector('.hb-logo').tagName, emblem: !!tr.querySelector('.hb-emblem'), src: ((tr.querySelector('img.hb-logo') || {}).src || '').slice(0, 30), cells: [...tr.children].map(td => td.textContent) })) }));
  const signed = await p.evaluate(() => window.__signedWith);
  ok(signed === TOKEN && s2.step === 2 && s2.login === 'ledger-studio' && s2.rows.length === 2, 'the key typed is the one Fabrica signs in with; then both repositories are read and listed', [signed === TOKEN, s2]);
  const hg = s2.rows.find(r => /harbour-garden/.test(r.name)) || {}, ln = s2.rows.find(r => /lantern-notes/.test(r.name)) || {};
  ok(hg.logo === 'IMG' && /^data:image\/png/.test(hg.src) && ln.emblem && !s2.rows.some(r => /^[A-Z]$/.test((r.name || '').trim().charAt(0)) && !r.logo), 'every repository wears a logo, never a letter: harbour-garden its own, lantern-notes Fabrica\'s mark', s2.rows.map(r => [r.name, r.logo, r.emblem, r.src]));
  ok(ln.cells && ln.cells[1] === '7' && ln.cells[2] === '2, 2' && ln.cells[3] === '130, 1' && ln.cells[4] === '1', 'lantern-notes: 7 versions, 2 branches and 2 tags, 130 issues and 1 pull, 1 release', ln.cells);
  const fam = await p.evaluate(() => ['Carpe-Diem-Gift', 'Ingenium-Mac-Mini', 'inwell-mac-intel', 'forge-fire', 'Lakay-Mac', 'Offline-pro'].map(n => { const e = IngHubBring.logo({ name: n }, 28); return [n, e.tagName, e.classList.contains('hb-emblem')]; }));
  ok(fam.every(x => x[1] === 'IMG' && !x[2]), 'her apps\' repositories wear their own logos: Carpe Diem, Ingenium, Inkwell, The Forge, Lakay and the Offline Project', fam);

  // where it goes, and what comes
  await p.click('text=Choose a folder'); await sleep(900);
  const pl = await p.evaluate(() => ({ place: IngHubBring.state().places && IngHubBring.state().places.place, pressed: [...document.querySelectorAll('#fb .hb-drive[aria-pressed="true"]')].map(x => x.textContent) }));
  ok(pl.place && pl.place.endsWith(path.sep + 'Ingenium GitHub') && pl.place.indexOf('studio-drive') > 0 && pl.pressed.length === 1, 'a folder on another drive is chosen, and shown pressed', pl);
  const tot0 = await p.evaluate(() => document.querySelector('#hbGo').textContent);
  await p.click('#fb .hb-opt:has-text("Releases and their files")'); await sleep(300);
  const tot1 = await p.evaluate(() => document.querySelector('#hbGo').textContent);
  await p.click('#fb .hb-opt:has-text("Releases and their files")'); await sleep(300);
  ok(tot0 !== tot1 && /Bring everything \(/.test(tot0), 'leaving out the release files changes the total', [tot0, tot1]);

  // bring
  await p.click('#hbGo');
  await p.waitForFunction(() => IngHubBring.state().step === 3, null, { timeout: 30000 }).catch(() => {});
  const s3 = await p.evaluate(() => ({ step: IngHubBring.state().step, rows: document.querySelectorAll('#fb .hb-pr').length, logos: document.querySelectorAll('#fb .hb-pr .hb-logo').length }));
  ok(s3.step === 3 && s3.rows === 2 && s3.logos === 2, 'bringing shows each repository, with its logo, and its progress', s3);
  await p.screenshot({ path: OUT + '/hub_bringing.png' });
  await p.waitForFunction(() => IngHubBring.state().step === 4, null, { timeout: 240000 }).catch(() => {});
  const s4 = await p.evaluate(() => ({ step: IngHubBring.state().step, h: (document.querySelector('#fb .hb h4') || {}).textContent, checks: [...document.querySelectorAll('#fb .hb-ck')].map(x => x.textContent) }));
  ok(s4.step === 4 && /checked against GitHub/.test(s4.h) && s4.checks.length === 2 && s4.checks.every(t => /every branch and tag matches GitHub/.test(t)), 'it ends checked against GitHub: every branch and tag matches', s4);
  await p.screenshot({ path: OUT + '/hub_checked.png' });

  // open in Fabrica
  await p.click('#fb .hb-ck:has-text("lantern-notes") >> text=Open in Fabrica');
  await p.waitForFunction(() => !document.querySelector('#fb .hb-wrap'), null, { timeout: 120000 }).catch(() => {});
  const op = await p.evaluate(async () => { const rs = await IngRepo.list(), r = rs.find(x => x.name === 'lantern-notes'); if (!r) return { none: rs.map(x => x.name), said: [...document.querySelectorAll('#fb .hb-warn')].map(x => x.textContent), wrap: !!document.querySelector('#fb .hb-wrap') };
    const info = await IngRepo.info(r.id), rec = await fbHub.record(r.id), i1 = rec.issues.find(x => x.n === 1) || {};
    return { sel: state.fabrica.sel === r.id, branches: info.branches, tags: info.tags, issues: rec.issues.length, pulls: rec.pulls.length, pr: rec.pulls[0] && [rec.pulls[0].from, rec.pulls[0].to, rec.pulls[0].comments.length],
      c1: i1.comments && i1.comments.length, labels: rec.labels.map(l => l.name), desc: rec.about.desc }; });
  /* 6.89: the drive's refs come in the order git's files give them, which may change between runs: compared as sets */
  ok(op.sel && JSON.stringify((op.branches || []).slice().sort()) === JSON.stringify(['idea', 'main']) && JSON.stringify((op.tags || []).slice().sort()) === JSON.stringify(['v1.0', 'v1.1']), 'Open in Fabrica: lantern-notes opens with every branch and tag', op);
  ok(op.issues === 130 && op.pulls === 1 && op.pr && op.pr[0] === 'fix' && op.pr[1] === 'main' && op.pr[2] >= 1 && op.c1 >= 1 && op.labels.includes('idea') && op.desc === 'Notes by lamplight',
    'and with its issues, its pull request (fix into main, with its review), comments, labels and description', op);
  await p.screenshot({ path: OUT + '/fabrica_opened.png' });

  // keys, night, phone
  const snd = fs.readFileSync(PAGE, 'utf8').includes("'#fb .hb-opt,#fb .hb-pick,#fb .hb-drive,'+");
  ok(snd, 'the sheet\'s choices, repositories and drives lift, sink and sound as every key does (r176)', snd);
  await p.evaluate(() => { state.theme = 'night'; try { applyTheme(); } catch (e) {} IngHubBring.open(); }); await sleep(900);
  const nt = await p.evaluate(() => { const hb = document.querySelector('#fb .hb'), cs = hb && getComputedStyle(hb); return { bg: cs && cs.backgroundColor, ink: hb && getComputedStyle(hb.querySelector('h3')).color }; });
  ok(nt.bg && nt.bg !== 'rgb(250, 248, 252)', 'by night the sheet takes Fabrica\'s night colours', nt);
  await p.screenshot({ path: OUT + '/hub_night.png' });
  await p.setViewportSize({ width: 390, height: 844 }); await sleep(900);
  const ph = await p.evaluate(() => { const w = document.querySelector('#fb .hb-wrap'); return { over: w ? w.scrollWidth - w.clientWidth : -1, doc: document.documentElement.scrollWidth - document.documentElement.clientWidth }; });
  ok(ph.over <= 1 && ph.doc <= 1, 'on a phone nothing scrolls sideways', ph);
  await p.screenshot({ path: OUT + '/hub_phone.png' });
  ok(errs.length === 0, 'no page error', errs);
  await b.close();
})().catch(e => { console.error(e); fail++; }).finally(() => { try { back && back.kill(); } catch (e) {} try { mock.kill(); } catch (e) {} console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0); });
