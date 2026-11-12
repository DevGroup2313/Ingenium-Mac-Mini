// node rig/t_688_fabrica.js <app folder: ingenium_app.py (patched to 6.88) and ingenium.html> <rag vendor folder, or ""> <out folder>
// Ingenium 6.88 (12 November 2026), in Chromium with the computer app's own back end (rig/run_app.py, HOME in a temporary folder):
// Fabrica, phase 2, second stage, its second part (modules/r281.js, desktop/app_copy_688.py): a second copy on another drive, checked by
// fingerprint, and Find by what it means. Her words, on the preview of this stage (https://claude.ai/artifact/VNwsz2ywj3XkXaCq8gws1o,
// version 4): "I approve of the preview, please push it everywhere." Invented repositories git made: Atelier (a working copy) and Lumen
// (bare). With a rag vendor folder (rag-vendor.zip unpacked, checked against its fingerprint), the folder search's own engine runs here
// (rag/ beside the page, as in the apps) and the meaning search is tested with the real model; with "" those checks are left out. Checks:
//   the card says where a copy goes and when it is checked; the copy's view as the preview shows it (the drive chip, the three times, the
//   key); Ingenium's own list for the drive, with Choose another folder; the copy made in the background, said as it goes, then checked;
//   git itself finds the copy whole, with every branch and tag; the card's line follows the choice; a fault found by the check is shown
//   with what is wrong, and Check it now puts it right; Stop keeping a copy leaves it on its drive; a repository kept in Ingenium is told
//   plainly; Find has By its words and By what it means; by meaning, a file that shares no word with the question is found first, and
//   opens in Code at its line; by its words, the same question finds nothing; the meanings are kept by the file's git name and not made
//   twice; on a phone nothing scrolls sideways; no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process'); const os = require('os');
const [APP, VENDOR, OUT] = process.argv.slice(2);
if (!APP || VENDOR === undefined || !OUT) { console.log('usage: node rig/t_688_fabrica.js <app folder> <rag vendor folder or ""> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const T = fs.mkdtempSync(path.join(os.tmpdir(), 'fab688-')), HOME = path.join(T, 'home'), DRIVE = path.join(T, 'drive'), BACKUP = path.join(T, 'Backup SSD'), APPDIR = path.join(T, 'app');
[HOME, DRIVE, BACKUP, APPDIR].forEach(d => fs.mkdirSync(d, { recursive: true }));
fs.copyFileSync(path.join(APP, 'ingenium_app.py'), path.join(APPDIR, 'ingenium_app.py')); fs.copyFileSync(path.join(APP, 'ingenium.html'), path.join(APPDIR, 'ingenium.html'));
if (VENDOR) { const rag = path.join(APPDIR, 'rag'); fs.mkdirSync(rag); const SRC = path.join(__dirname, '..', 'rag');
  for (const f of fs.readdirSync(SRC)) if (/\.(m?js)$/.test(f)) fs.copyFileSync(path.join(SRC, f), path.join(rag, f));
  fs.symlinkSync(path.resolve(VENDOR), path.join(rag, 'vendor')); }
const ENV = Object.assign({}, process.env, { HOME, GIT_AUTHOR_NAME: 'Ada Ferreira', GIT_AUTHOR_EMAIL: 'ada@example.invalid', GIT_COMMITTER_NAME: 'Ada Ferreira', GIT_COMMITTER_EMAIL: 'ada@example.invalid', GIT_CONFIG_NOSYSTEM: '1' });
const git = (cwd, ...a) => cp.execFileSync('git', a, { cwd, env: ENV }).toString();
const fsck = d => { try { cp.execFileSync('git', ['fsck', '--full', '--no-progress'], { cwd: d, env: ENV, stdio: 'pipe' }); return true; } catch (e) { return false; } };
const refs = d => git(d, 'for-each-ref', '--format=%(refname) %(objectname)').split('\n').filter(l => l && !l.startsWith('refs/ingenium-kept/')).sort().join('\n');
// invented repositories: each file says one thing, in its own words
const AT = path.join(DRIVE, 'Atelier');
fs.mkdirSync(path.join(AT, 'app'), { recursive: true }); fs.mkdirSync(path.join(AT, 'docs'), { recursive: true });
git(AT, 'init', '-q', '-b', 'main'); git(AT, 'config', 'user.name', 'Ada Ferreira'); git(AT, 'config', 'user.email', 'ada@example.invalid');
fs.writeFileSync(path.join(AT, 'README.md'), '# Atelier\n\nAn invented sketchbook app for drawing with friends.\n');
fs.writeFileSync(path.join(AT, 'app', 'palette.js'), 'const scheme = window.matchMedia("(prefers-color-scheme: dark)");\ndocument.body.dataset.palette = scheme.matches ? "dusk" : "dawn";\nscheme.addEventListener("change", e => { document.body.dataset.palette = e.matches ? "dusk" : "dawn"; });\n');
fs.writeFileSync(path.join(AT, 'app', 'invoice.js'), 'export function total(lines){\n  return lines.reduce((sum, l) => sum + l.price * l.qty, 0);\n}\nexport function vat(amount){ return amount * 0.2; }\n');
fs.writeFileSync(path.join(AT, 'app', 'brush.js'), 'export function stroke(ctx, points, width){\n  ctx.lineWidth = width;\n  ctx.beginPath();\n  points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));\n  ctx.stroke();\n}\n');
fs.writeFileSync(path.join(AT, 'docs', 'keeping.md'), '# Keeping the sketches\n\nEach sketch is saved to the device every minute while you draw.\n');
git(AT, 'add', '-A'); git(AT, 'commit', '-qm', 'The first version'); git(AT, 'tag', '-a', 'v1.0', '-m', 'The first release');
git(AT, 'checkout', '-qb', 'night-reader'); fs.appendFileSync(path.join(AT, 'README.md'), 'Now with a gallery.\n'); git(AT, 'commit', '-qam', 'A gallery'); git(AT, 'checkout', '-q', 'main');
const BARE = path.join(DRIVE, 'Lumen.git'); git(DRIVE, 'clone', '-q', '--bare', AT, BARE);
const PORT = 18688;
const app = cp.spawn('python3', ['-I', path.join(__dirname, 'run_app.py'), APPDIR, String(PORT)], { env: ENV, stdio: ['ignore', 'pipe', 'pipe'] });
let appErr = ''; app.stderr.on('data', d => { appErr += d.toString(); });
const started = new Promise((res, rej) => { let buf = ''; app.stdout.on('data', d => { buf += d.toString(); const i = buf.indexOf('\n'); if (i >= 0) { try { res(JSON.parse(buf.slice(0, i))); } catch (e) { rej(e); } } }); setTimeout(() => rej(new Error('the app did not start: ' + appErr.slice(-600))), 120000); });
const call = (n, ...args) => fetch(`http://127.0.0.1:${PORT}/call/${n}`, { method: 'POST', body: JSON.stringify(args) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
(async () => {
  let b;
  try {
    const info = await started;
    ok(['copy_places', 'copy_choose', 'copy_list', 'copy_plan', 'copy_now', 'copy_check', 'copy_forget'].every(n => info.names.includes(n)), 'the computer app answers the calls of the second copy', info.names.filter(n => /^copy_/.test(n)));
    const AID = (await call('disk_add', AT)).id, LID = (await call('disk_add', BARE)).id;
    b = await pw.chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
    await ctx.addInitScript(({ names, port, BACKUP }) => { const api = {};
      for (const n of names) api[n] = (...args) => fetch(`http://127.0.0.1:${port}/call/${n}`, { method: 'POST', body: JSON.stringify(args) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
      api.copy_choose = () => Promise.resolve({ ok: true, place: { label: 'Backup SSD', folder: BACKUP, free: 1.2e12, kind: 'chosen' } });   // what the folder dialog would answer
      window.pywebview = { api }; window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50)); }, { names: info.names, port: PORT, BACKUP });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message.slice(0, 240)));
    await p.goto(`http://127.0.0.1:${info.page_port}/ingenium.html?b=test`, { waitUntil: 'domcontentloaded', timeout: 180000 });
    await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(900);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('fabrica'); });
    await sleep(2500);
    const open = async id => { await p.evaluate(id => { fbHubHost.FBS().sel = id; fbHubHost.S.home = false; return fbHubHost.refresh().then(() => fbHubHost.paint()); }, id); await sleep(1500); };
    const ingPart = async () => { await p.evaluate(() => { const k = document.getElementById('fbPart_ingenium'); if (k) k.click(); }); await sleep(700); };
    await open(AID); await ingPart();
    const t0 = await p.evaluate(() => ({ part: window.__ingParts && window.__ingParts.p281, line: (document.querySelector('#fbPartSec_ingenium .r280-tile[data-k="copy"] small') || {}).textContent }));
    ok(t0.part === 'running' && t0.line === 'on another drive, checked every Sunday', 'the card A second copy says where it goes and when it is checked, as the preview does', t0);
    await p.click('#fbPartSec_ingenium .r280-tile[data-k="copy"]'); await sleep(1500);
    const v1 = await p.evaluate(() => { const a = document.querySelector('#fbPartSec_ingenium .r280-ans'); return { h: (a.querySelector('.h-big') || {}).textContent, out: (a.querySelector('.r280-out') || {}).textContent, chip: (a.querySelector('.r281-drive') || {}).textContent,
      when: [...a.querySelectorAll('.r281-when button')].map(x => [x.textContent, x.getAttribute('aria-pressed')]), key: (a.querySelector('[data-copy]') || {}).textContent, st: (a.querySelector('.r281-copyst') || {}).textContent }; });
    ok(v1.h === 'A second copy of Atelier' && /kept whole on another drive, and checked against this one by fingerprint/.test(v1.out) && /^This computer · /.test(v1.chip) && v1.key === 'Make the copy now' && v1.st === 'Not copied yet.'
       && JSON.stringify(v1.when) === JSON.stringify([['Every day', 'false'], ['Every Sunday', 'true'], ['By hand', 'false']]), 'the copy\'s view: its title and words, the drive chip, Every day, Every Sunday (chosen) and By hand, the key', v1);
    await p.click('#fbPartSec_ingenium .r281-drive'); await sleep(400);
    const lst = await p.evaluate(() => [...document.querySelectorAll('.r280-pop .r172-opt')].map(o => o.textContent));
    ok(lst.some(t => /^This computer · /.test(t)) && lst[lst.length - 1] === 'Choose another folder…', 'the drive is chosen in Ingenium\'s own list, with Choose another folder at its end', lst);
    await p.evaluate(() => { const o = [...document.querySelectorAll('.r280-pop .r172-opt')].pop(); o.click(); }); await sleep(800);
    await p.click('#fbPartSec_ingenium .r281-when button[data-w="day"]'); await sleep(200);
    const chip = await p.evaluate(() => document.querySelector('#fbPartSec_ingenium .r281-drive').textContent);
    ok(chip === 'Backup SSD · 1.2 TB free', 'a folder chosen through the system\'s dialog becomes the place', chip);
    await p.click('#fbPartSec_ingenium [data-copy]');
    const seen = new Set(); let st = '';
    for (let i = 0; i < 120; i++) { await sleep(250); st = await p.evaluate(() => (document.querySelector('#fbPartSec_ingenium .r281-copyst') || {}).textContent || ''); seen.add(st.replace(/[0-9.]+ (KB|MB|GB)/g, 'N')); if (/^Copied and checked/.test(st)) break; }
    const after = await p.evaluate(() => ({ key: (document.querySelector('#fbPartSec_ingenium [data-copy]') || {}).textContent, line: document.querySelector('#fbPartSec_ingenium .r280-tile[data-k="copy"] small').textContent }));
    ok(/^Copied and checked just now: every version matches, by fingerprint\. Next check: tomorrow \(when Ingenium is open\)\.$/.test(st) && after.key === 'Check it now', 'the copy is made, then checked; the key becomes Check it now', [st, [...seen], after]);
    ok(after.line === 'on Backup SSD, checked every day', 'the card\'s line follows: on Backup SSD, checked every day', after.line);
    const CP = path.join(BACKUP, 'Ingenium copies', 'Atelier.git');
    ok(fs.existsSync(CP) && fsck(CP) && refs(CP) === refs(path.join(AT, '.git')) && /refs\/tags\/v1\.0/.test(refs(CP)) && /night-reader/.test(refs(CP)), 'git itself finds the copy whole, with every branch and tag of the repository', refs(CP));
    // a fault in the copy: found, shown, then put right by Check it now
    const pd = path.join(CP, 'objects', 'pack'), loose = fs.readdirSync(path.join(CP, 'objects')).filter(d => /^[0-9a-f]{2}$/.test(d));
    const one = loose.length ? path.join(CP, 'objects', loose[0], fs.readdirSync(path.join(CP, 'objects', loose[0]))[0]) : path.join(pd, fs.readdirSync(pd).find(n => n.endsWith('.pack')));
    const buf = fs.readFileSync(one); buf[Math.floor(buf.length / 2)] ^= 0xff; fs.writeFileSync(one, buf);
    await call('copy_check', AID); for (let i = 0; i < 40; i++) { await sleep(250); const c = (await call('copy_list')).copies.find(x => x.id === AID); if (c.job && c.job.state === 'done') break; }
    await p.click('#fbPartSec_ingenium .r280-tile[data-k="copy"]'); await sleep(1500);
    const bad = await p.evaluate(() => ({ st: document.querySelector('#fbPartSec_ingenium .r281-copyst').textContent, cls: document.querySelector('#fbPartSec_ingenium .r281-copyst').className, probs: [...document.querySelectorAll('#fbPartSec_ingenium .r281-probs li')].map(x => x.textContent) }));
    ok(/^The last check found a fault/.test(bad.st) && /bad/.test(bad.cls) && bad.probs.length >= 1, 'a fault the check found is shown, with what is wrong', bad);
    await p.click('#fbPartSec_ingenium [data-copy]');
    for (let i = 0; i < 120; i++) { await sleep(250); st = await p.evaluate(() => (document.querySelector('#fbPartSec_ingenium .r281-copyst') || {}).textContent || ''); if (/^Copied and checked/.test(st)) break; }
    ok(/^Copied and checked just now: every version matches/.test(st) && fsck(CP), 'Check it now copies again what was not right, and the copy is whole', st);
    await p.click('#fbPartSec_ingenium .r280-key.quiet, #fbPartSec_ingenium button.quiet'); await sleep(1200);
    const gone = await p.evaluate(() => ({ line: document.querySelector('#fbPartSec_ingenium .r280-tile[data-k="copy"] small').textContent, list: IngCopies.state().list }));
    ok(gone.line === 'on another drive, checked every Sunday' && gone.list.length === 0 && fs.existsSync(CP) && fsck(CP), 'Stop keeping a copy: Fabrica forgets it, and the copy stays on its drive, whole', gone);
    // a repository kept in Ingenium itself
    const kid = await p.evaluate(() => IngRepo.create({ name: 'Sketch kept here' }).then(s => s.id));
    await open(kid); await ingPart(); await p.click('#fbPartSec_ingenium .r280-tile[data-k="copy"]'); await sleep(600);
    const kept = await p.evaluate(() => document.querySelector('#fbPartSec_ingenium .r280-ans').textContent);
    ok(/kept of a repository on this computer's drive/.test(kept) && /Sketch kept here is kept in Ingenium itself/.test(kept), 'a repository kept in Ingenium is told plainly where a second copy applies', kept);
    // find: by its words, or by what it means
    await open(AID); await ingPart();
    const how = await p.evaluate(() => ({ keys: [...document.querySelectorAll('#fbPartSec_ingenium .r281-how button')].map(x => [x.textContent, x.getAttribute('aria-pressed')]), ph: document.querySelector('#fbPartSec_ingenium .r280-find input').placeholder, rag: !!(window.IngRag && IngRag.available && IngRag.available()) }));
    ok(how.keys.length === 2 && how.keys[0][0] === 'By its words' && how.keys[1][0] === 'By what it means' && (how.rag ? how.keys[1][1] === 'true' && how.ph === 'Describe what you are looking for' : how.keys[0][1] === 'true'),
       'Find has By its words and By what it means, the second chosen where the folder search\'s engine is', how);
    if (VENDOR) {
      const Q = 'where night mode is chosen';
      await p.fill('#fbPartSec_ingenium .r280-find input', Q); await p.click('#fbPartSec_ingenium .r280-find button[type="submit"]');
      let res = null; for (let i = 0; i < 480; i++) { await sleep(500); res = await p.evaluate(() => ({ hits: [...document.querySelectorAll('#fbPartSec_ingenium .r280-hits .r280-hit')].map(x => x.textContent), note: (document.querySelector('#fbPartSec_ingenium .r280-hits > p') || {}).textContent, st: IngMeaning.state() })); if (res.hits.length && !res.st.reading) break; }
      // the first finds come from what was read so far: once all is read, the same question again
      await p.click('#fbPartSec_ingenium .r280-find button[type="submit"]');
      for (let i = 0; i < 120; i++) { await sleep(500); res = await p.evaluate(() => ({ hits: [...document.querySelectorAll('#fbPartSec_ingenium .r280-hits .r280-hit')].map(x => x.textContent), note: (document.querySelector('#fbPartSec_ingenium .r280-hits > p') || {}).textContent, read: (document.querySelector('#fbPartSec_ingenium .r281-read span') || {}).textContent, st: IngMeaning.state() })); if (res.hits.length) break; }
      res.scores = await p.evaluate(() => [...document.querySelectorAll('#fbPartSec_ingenium .r280-hits .r280-hit')].map(x => [x.querySelector('b').textContent, x.getAttribute('data-score')]));
      fs.writeFileSync(path.join(OUT, 'meaning.json'), JSON.stringify(res, null, 1));
      ok(res.hits.length && /^Atelier · app\/palette\.js/.test(res.hits[0]) && /by what they mean \(the folder search's own engine, on this computer\)/.test(res.note), 'by meaning, the file that shares no word with the question comes first: app/palette.js, named in the repository open', res);
      ok(/^Every file is read for what it means/.test(res.read || '') && res.st.files >= 5, 'the reading line says every file is read', res.read);
      await p.evaluate(() => document.querySelector('#fbPartSec_ingenium .r280-hits .r280-hit').click()); await sleep(2500);
      const code = await p.evaluate(() => ({ view: fbHubHost.S.view, file: (document.querySelector('.h-crumbs b') || {}).textContent, hl: !!document.querySelector('.h-ln.h-hl') }));
      ok(code.view === 'code' && code.file === 'palette.js' && code.hl, 'a find opens its file in Code, at its line', code);
      const n1 = await p.evaluate(() => new Promise(r => { const q = indexedDB.open('ingenium_meaning'); q.onsuccess = () => { const t = q.result.transaction('v').objectStore('v').count(); t.onsuccess = () => r(t.result); }; }));
      await ingPart(); await p.click('#fbPartSec_ingenium .r281-how button[data-h="words"]'); await sleep(200);
      await p.fill('#fbPartSec_ingenium .r280-find input', Q); await p.click('#fbPartSec_ingenium .r280-find button[type="submit"]'); await sleep(2500);
      const words = await p.evaluate(() => ({ hits: document.querySelectorAll('#fbPartSec_ingenium .r280-hits .r280-hit').length, note: (document.querySelector('#fbPartSec_ingenium .r280-hits > p') || {}).textContent }));
      ok(words.hits === 0 && /^Nothing found/.test(words.note), 'by its words, the same question finds nothing: no file holds those words', words);
      await p.click('#fbPartSec_ingenium .r281-how button[data-h="meaning"]'); await p.click('#fbPartSec_ingenium .r280-find button[type="submit"]'); await sleep(4000);
      const n2 = await p.evaluate(() => new Promise(r => { const q = indexedDB.open('ingenium_meaning'); q.onsuccess = () => { const t = q.result.transaction('v').objectStore('v').count(); t.onsuccess = () => r(t.result); }; }));
      ok(n1 >= 5 && n2 === n1, 'the meanings are kept by each file\'s git name and not made twice (' + n1 + ' files)', [n1, n2]);
    }
    await p.setViewportSize({ width: 390, height: 860 }); await sleep(900); await p.evaluate(() => { try { fbHubHost.setPanel('ship'); } catch (e) {} }); await sleep(600); await ingPart();
    await p.click('#fbPartSec_ingenium .r280-tile[data-k="copy"]'); await sleep(1200);
    const ph = await p.evaluate(() => { const s = document.getElementById('fbPartSec_ingenium'); const r = s.getBoundingClientRect(); return { sw: document.documentElement.scrollWidth, iw: innerWidth, over: [...s.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > r.right + 1 && e.offsetParent).map(e => e.className).slice(0, 4) }; });
    await p.screenshot({ path: path.join(OUT, 'phone.png') });
    ok(ph.sw <= ph.iw && !ph.over.length, 'on a phone nothing scrolls sideways, and nothing overflows the part', ph);
    ok(!errs.length, 'no page error', errs);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 900)); }
  finally { try { if (b) await b.close(); } catch (e) {} app.kill(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0); }
})();
