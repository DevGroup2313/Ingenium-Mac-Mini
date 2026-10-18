// The Forge 639: Fabrica, Ingenium's offline GitHub with no model, in a room of the Forge's own; end to end in Chromium,
// with real git as the referee for what it exports. Files are changed in Fabrica's file editor (no Code, no model), the
// Forge's Editor takes a page and its edits come back, and the install packages are the Forge's own five.
// node rig/t_forge_fabrica.js <url of a Forge 639 page> <outdir>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const cp = require('child_process');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 260) : '')); c ? pass++ : fail++; };
async function open(p) {
  await p.goto(URL_, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(7000);
  await p.locator('#cd-door button', { hasText: 'Open the Editor' }).first().click({ timeout: 30000 }).catch(() => {});
  await p.waitForTimeout(1500);
}
const room = (p, r) => p.click('.nav-inner .nav-btn[data-room="' + r + '"]').then(() => p.waitForTimeout(900));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const dl = []; p.on('download', d => dl.push(d.suggestedFilename()));
  await open(p);
  const parts = await p.evaluate(() => ['p42', 'p43', 'p44', 'p45'].map(k => k + ':' + (window.__ingParts || {})[k]).join(' '));
  ok(/p42:running p43:running p44:running p45:running/.test(parts), 'the engines, the page and GitHub ran to their end', parts);
  const nav = await p.evaluate(() => [...document.querySelectorAll('.nav-inner[data-forge="1"] .nav-btn')].map(b => b.dataset.room).slice(0, 4).join(' '));
  ok(nav === 'editor files fabrica workshop', 'Fabrica stands on the rail between Files and the Workshop', nav);
  const fabOk = await p.evaluate(() => ({ fab: !!(window.FORGE && FORGE.fab), kits: FORGE.fab.hasKits(), store: typeof indexedDB }));
  ok(fabOk.fab && fabOk.kits, 'the Forge offers Fabrica its Editor and its five install packages', JSON.stringify(fabOk));
  await room(p, 'fabrica');
  const frame = await p.evaluate(() => { const r = document.getElementById('fb'); const rc = r.getBoundingClientRect(); return { on: document.getElementById('room-fabrica').getAttribute('data-on'), stageless: document.body.getAttribute('data-stageless'), active: (document.querySelector('.nav-inner .nav-btn.active') || {}).dataset.room,
    bottom: Math.round(rc.bottom), top: Math.round(rc.top), h: Math.round(rc.height), vh: innerHeight, panels: [...r.querySelectorAll('.f-pn')].map(x => x.offsetParent ? 1 : 0).join(), title: getComputedStyle(r.querySelector('.f-head > div')).display }; });
  ok(frame.on === '1' && frame.stageless === '1' && frame.active === 'fabrica' && frame.panels === '1,1,1', 'its room opens, the whole width, three panels side by side; the rail marks it', JSON.stringify(frame));
  ok(Math.abs(frame.h - Math.max(420, frame.vh - frame.top - 12)) <= 2 && frame.title === 'none', 'the frame fills what the window leaves below the room\'s head (never under 420 pixels), and the room names it once', JSON.stringify(frame));
  const empty = await p.evaluate(() => ({ chip: document.getElementById('fbAppsChip').textContent, empty: !!document.querySelector('#fbRepos .f-empty'), work: (document.querySelector('#fbWorkBody .f-empty b') || {}).textContent }));
  ok(empty.chip === 'None yet' && empty.empty && /Choose an app/.test(empty.work), 'with nothing kept yet it says so plainly', JSON.stringify(empty));
  await p.screenshot({ path: OUT + '/ff-empty.png' });

  // a new app, its first page written in Fabrica's own file editor
  await p.click('#fbNew'); await p.waitForTimeout(300); await p.fill('#fb .f-sheet input', 'My Notes'); await p.click('#fb .f-sheet .f-btn.pri'); await p.waitForTimeout(1200);
  const fresh = await p.evaluate(() => ({ tile: (document.querySelector('#fbRepos .f-repo .nm') || {}).textContent, empty: (document.querySelector('#fbWorkBody .f-empty b') || {}).textContent, keys: [...document.querySelectorAll('#fbWorkFoot .f-btn')].map(x => x.textContent) }));
  ok(fresh.tile === 'My Notes' && /first page/.test(fresh.empty || '') && fresh.keys.join('|') === 'Write its first page|Bring a page in', 'a new app asks for its first page: written here, or brought in (no Chat, no Code)', JSON.stringify(fresh));
  await p.evaluate(() => { [...document.querySelectorAll('#fbWorkFoot .f-btn')].find(x => x.textContent === 'Write its first page').click(); }); await p.waitForTimeout(900);
  const ed0 = await p.evaluate(() => ({ sheet: !!document.getElementById('fbEdit'), file: document.getElementById('fbEdFile').value, info: document.querySelector('#fbEdit .f-hint').textContent }));
  ok(ed0.sheet && ed0.file === 'index.html' && /A new file/.test(ed0.info), 'the file editor opens on index.html, a new file', JSON.stringify(ed0));
  const PAGE = '<!doctype html><html><head><meta charset="utf-8"><meta name="ingenium-build" content="1.0.1"><title>Notes</title><link rel="stylesheet" href="style.css"></head><body><h1>Notes</h1><script src="app.js"></script></body></html>';
  await p.fill('#fbEdText', PAGE); await p.click('#fbEdSave'); await p.waitForTimeout(900);
  // two more files through New file, saved with Ctrl and S
  for (const [path, text] of [['style.css', 'body{font:16px serif}'], ['app.js', 'document.title="Notes 1";']]) {
    await p.evaluate(() => { [...document.querySelectorAll('#fbEdit .f-btn')].find(x => x.textContent === 'New file').click(); }); await p.waitForTimeout(300);
    await p.fill('#fb .f-sheet:not(#fbEdit) input', path); await p.click('#fb .f-sheet:not(#fbEdit) .f-btn.pri'); await p.waitForTimeout(600);
    await p.fill('#fbEdText', text); await p.focus('#fbEdText'); await p.keyboard.press('Control+s'); await p.waitForTimeout(800);
  }
  await p.evaluate(() => { [...document.querySelectorAll('#fbEdit .end .f-btn')].find(x => x.textContent === 'Close').click(); }); await p.waitForTimeout(700);
  const ch0 = await p.evaluate(() => ({ n: document.getElementById('fbNChanges').textContent, rows: [...document.querySelectorAll('#fbWorkBody .f-frow')].map(r => r.querySelector('.p').textContent.trim() + '|' + r.querySelector('.k').textContent) }));
  ok(ch0.n === '3' && ch0.rows.join() === 'app.js|added,index.html|added,style.css|added', 'three files written in the editor wait under Changes', JSON.stringify(ch0));
  await p.fill('#fbMsg', 'First version'); await p.click('#fbKeep'); await p.waitForTimeout(1300);
  const r1 = await p.evaluate(() => window.__fbState().fabrica.sel);
  const tile = await p.evaluate(() => { const t = document.querySelector('#fbRepos .f-repo'); return { nm: t.querySelector('.nm').textContent, line: t.querySelector('.stl span').textContent, pressed: t.getAttribute('aria-pressed') }; });
  ok(tile.nm === 'My Notes' && tile.pressed === 'true' && /Kept · to test/.test(tile.line), 'kept: the tile says to test', JSON.stringify(tile));
  const steps = await p.evaluate(() => [...document.querySelectorAll('#fbSteps li[data-s]')].map(l => l.getAttribute('data-s') + ':' + l.className).join(' '));
  ok(steps === 'change:done keep:done test:now ship:', 'the steps show Change and Keep done, Test now', steps);

  // a change in the editor, line by line; Write it for me; keep
  await p.evaluate(() => { [...document.querySelectorAll('#fbViews button')].find(x => x.dataset.v === 'files').click(); }); await p.waitForTimeout(700);
  await p.evaluate(() => { [...document.querySelectorAll('#fbWorkBody .f-node')].find(x => /app\.js/.test(x.textContent)).click(); }); await p.waitForTimeout(300);
  const fkeys = await p.evaluate(() => [...document.querySelectorAll('#fbWorkFoot .f-btn')].map(x => x.textContent).join('|'));
  ok(fkeys === 'Edit this file|Save a copy', 'Files offers Edit this file and Save a copy', fkeys);
  await p.evaluate(() => { [...document.querySelectorAll('#fbWorkFoot .f-btn')].find(x => x.textContent === 'Edit this file').click(); }); await p.waitForTimeout(900);
  const ed1 = await p.evaluate(() => ({ file: document.getElementById('fbEdFile').value, text: document.getElementById('fbEdText').value, open: !document.querySelector('#fbEdit .f-edit-bar .f-btn:nth-of-type(2)').hidden }));
  ok(ed1.file === 'app.js' && ed1.text === 'document.title="Notes 1";', 'Edit this file opens it with its text', JSON.stringify(ed1));
  await p.fill('#fbEdText', 'document.title="Notes 2";\nconsole.log("hello");'); await p.click('#fbEdSave'); await p.waitForTimeout(800);
  await p.evaluate(() => { [...document.querySelectorAll('#fbEdit .f-btn')].find(x => x.textContent === 'New file').click(); }); await p.waitForTimeout(300);
  await p.fill('#fb .f-sheet:not(#fbEdit) input', 'readme.md'); await p.click('#fb .f-sheet:not(#fbEdit) .f-btn.pri'); await p.waitForTimeout(600);
  await p.fill('#fbEdText', '# Notes'); await p.click('#fbEdSave'); await p.waitForTimeout(800);
  await p.evaluate(() => { [...document.querySelectorAll('#fbEdit .end .f-btn')].find(x => x.textContent === 'Close').click(); }); await p.waitForTimeout(800);
  const ch = await p.evaluate(() => ({ view: [...document.querySelectorAll('#fbViews button')].find(x => x.getAttribute('aria-selected') === 'true').dataset.v, n: document.getElementById('fbNChanges').textContent, rows: [...document.querySelectorAll('#fbWorkBody .f-frow')].map(r => r.querySelector('.p').textContent.trim() + '|' + r.querySelector('.k').textContent), lines: [...document.querySelectorAll('#fbWorkBody .f-dl')].map(d => d.className.replace('f-dl', '').trim() + ':' + d.textContent.slice(0, 20)) }));
  ok(ch.view === 'changes' && ch.n === '2' && /app\.js\|changed/.test(ch.rows[0]) && /readme\.md\|added/.test(ch.rows[1]), 'two changes, file by file: app.js changed, readme.md added', JSON.stringify(ch.rows));
  ok(ch.lines.some(l => /^del:1/.test(l)) && ch.lines.some(l => /^add:2\+console/.test(l)), 'the lines taken away and added show with their numbers', JSON.stringify(ch.lines.slice(0, 6)));
  await p.screenshot({ path: OUT + '/ff-changes.png' });
  await p.click('#fbWrite'); const draft = await p.inputValue('#fbMsg');
  ok(/^Changes to app\.js and 1 other file\n\n- app\.js: \+2 −1 lines\n- readme\.md: new$/.test(draft), 'Write it for me drafts a message from the changes (no model: the changes themselves)', JSON.stringify(draft));
  await p.click('#fbKeep'); await p.waitForTimeout(1300);
  const hist = await p.evaluate(() => ({ view: [...document.querySelectorAll('#fbViews button')].find(x => x.getAttribute('aria-selected') === 'true').dataset.v, cards: [...document.querySelectorAll('#fbWorkBody .f-cm b')].map(x => x.textContent) }));
  ok(hist.view === 'history' && hist.cards.length === 2 && /Changes to app\.js/.test(hist.cards[0]) && hist.cards[1] === 'First version', 'kept: the history shows both versions, newest first', JSON.stringify(hist));
  await p.click('#fbWorkBody .f-cm'); await p.waitForTimeout(700);
  const card = await p.evaluate(() => { const c = document.querySelector('#fbWorkBody .f-cm'); return { files: [...c.querySelectorAll('.fl li')].map(x => x.textContent), keys: [...c.querySelectorAll('.f-acts .f-btn')].map(x => x.textContent) }; });
  ok(card.files.join(',') === 'app.js,readme.md (added)' && card.keys.join('|') === 'See the changes|Undo it|Mark a release', 'a version opens to its files and its keys', JSON.stringify(card));
  await p.evaluate(() => { [...document.querySelectorAll('#fbWorkBody .f-cm .f-acts .f-btn')].find(x => x.textContent === 'Mark a release').click(); }); await p.waitForTimeout(300);
  await p.fill('#fb .f-sheet input', 'v1.0.2'); await p.click('#fb .f-sheet .f-btn.pri'); await p.waitForTimeout(1000);
  const tag = await p.evaluate(() => ({ tags: [...document.querySelectorAll('#fbWorkBody .f-tag')].map(x => x.textContent), ver: (document.querySelector('#fbRepos .f-repo .nm em') || {}).textContent }));
  ok(tag.tags.join() === 'v1.0.2' && tag.ver === 'v1.0.2', 'a release is marked and named on the tile', JSON.stringify(tag));

  // test, then ship: one page, a web app, and the Forge's five install packages
  await p.evaluate(() => document.getElementById('fbTest').click()); await p.waitForFunction(() => /Passed|Faults/.test(document.getElementById('fbTestChip').textContent), null, { timeout: 90000 }); await p.waitForTimeout(400);
  const test = await p.evaluate(() => ({ chip: document.getElementById('fbTestChip').textContent, checks: [...document.querySelectorAll('#fbChecks .f-ck')].map(c => c.className.replace('f-ck', '').trim() || '-'), steps: [...document.querySelectorAll('#fbSteps li[data-s]')].map(l => l.className).join(' ') }));
  ok(/Passed/.test(test.chip) && test.checks.slice(0, 3).join() === 'ok,ok,ok' && test.steps === 'done done done now', 'tested in a quiet window: the checks pass and the step moves to Ship', JSON.stringify(test));
  const tg = await p.evaluate(() => [...document.querySelectorAll('#fbTargets .f-tg')].map(x => x.querySelector('b').textContent + '|' + x.querySelector('small').textContent).join(' / '));
  ok(/Install packages\|Five: Mac, Mac mini, Windows, iPhone and iPad, Fire/.test(tg), 'the third target is the Forge\'s five install packages', tg);
  await p.evaluate(() => document.getElementById('fbMakeAll').click()); await p.waitForFunction(() => /All made/.test(document.getElementById('fbShipState').textContent), null, { timeout: 240000 }); await p.waitForTimeout(1500);
  const ship = await p.evaluate(() => ({ state: document.getElementById('fbShipState').textContent, chips: [...document.querySelectorAll('#fbTargets .f-tg .foot .f-chip')].map(x => x.textContent), tile: document.querySelector('#fbRepos .f-repo .stl span').textContent }));
  ok(/All made/.test(ship.state) && ship.chips.filter(c => /Made/.test(c)).length === 3 && /Shipped/.test(ship.tile), 'shipped: all three are made and noted beside the version', JSON.stringify(ship));
  const kits = dl.filter(n => /_(mac|mac_mini|windows|ios|fire)_/.test(n));
  ok(dl.some(n => /\.html$/.test(n)) && dl.some(n => /web.*\.zip$/.test(n)) && kits.length === 5, 'saved: the one page, the web app and five install packages', dl.join(', '));
  await p.screenshot({ path: OUT + '/ff-shipped.png' });

  // the copies, checked by real git: the bundle and the folder with its .git
  const b64 = await p.evaluate(async (id) => { const u = await IngRepo.bundle(id); let s = ''; for (let i = 0; i < u.length; i += 32768) s += String.fromCharCode.apply(null, u.subarray(i, i + 32768)); return btoa(s); }, r1);
  fs.writeFileSync(OUT + '/notes.bundle', Buffer.from(b64, 'base64')); const cl = OUT + '/notes-clone'; fs.rmSync(cl, { recursive: true, force: true });
  let gitok = true, log = ''; try { cp.execFileSync('git', ['clone', '-q', OUT + '/notes.bundle', cl]); cp.execFileSync('git', ['-C', cl, 'fsck', '--full', '--strict'], { stdio: 'pipe' }); log = cp.execFileSync('git', ['-C', cl, 'log', '--format=%s%d|%an', 'main']).toString(); } catch (e) { gitok = false; log = String(e.stderr || e.message); }
  ok(gitok && /Changes to app\.js.*tag: v1\.0\.2/.test(log.split('\n')[0]) && /First version/.test(log) && /\|Yannie D\. Forest/.test(log), 'git clones the bundle: both versions, the release, her name on each', log.replace(/\n/g, ' / '));
  const zb = await p.evaluate(async (id) => { const u = await IngRepo.gitFolder(id); let s = ''; for (let i = 0; i < u.length; i += 32768) s += String.fromCharCode.apply(null, u.subarray(i, i + 32768)); return btoa(s); }, r1);
  const fz = OUT + '/notes-git.zip', fd = OUT + '/notes-folder'; fs.writeFileSync(fz, Buffer.from(zb, 'base64')); fs.rmSync(fd, { recursive: true, force: true }); fs.mkdirSync(fd);
  let fstat = ''; try { cp.execFileSync('python3', ['-I', '-c', 'import zipfile,sys;zipfile.ZipFile(sys.argv[1]).extractall(sys.argv[2])', fz, fd]); const top = fs.readdirSync(fd).length === 1 && fs.statSync(fd + '/' + fs.readdirSync(fd)[0]).isDirectory() ? fd + '/' + fs.readdirSync(fd)[0] : fd; cp.execFileSync('git', ['-C', top, 'fsck', '--strict'], { stdio: 'pipe' }); fstat = cp.execFileSync('git', ['-C', top, 'status', '--porcelain']).toString().trim() || 'clean'; } catch (e) { fstat = 'error: ' + String(e.stderr || e.message).slice(0, 160); }
  ok(fstat === 'clean', 'the folder with its .git opens in git, clean and whole', fstat);

  // ideas: a branch, work on it in the editor, bring it into main
  await p.evaluate(() => { [...document.querySelectorAll('#fbViews button')].find(x => x.dataset.v === 'ideas').click(); }); await p.waitForTimeout(500);
  await p.evaluate(() => { [...document.querySelectorAll('#fbWorkFoot .f-btn')].find(x => /New idea/.test(x.textContent)).click(); }); await p.waitForTimeout(300);
  await p.fill('#fb .f-sheet input', 'autumn'); await p.click('#fb .f-sheet .f-btn.pri'); await p.waitForTimeout(900);
  const idea = await p.evaluate(() => ({ branch: document.getElementById('fbBranchName').textContent, ideas: [...document.querySelectorAll('#fbWorkBody .f-idea')].map(x => x.querySelector('b').textContent.trim().split(' ')[0] + (x.classList.contains('on') ? '*' : '')) }));
  ok(idea.branch === 'autumn' && idea.ideas.join() === 'main,autumn*', 'a new idea is a branch, and the work moves onto it', JSON.stringify(idea));
  await p.evaluate(async (id) => { await IngRepo.put(id, 'style.css', 'body{font:16px serif;color:#432}'); await IngRepo.commit(id, 'Autumn colours'); await fbRender(); await new Promise(r => setTimeout(r, 700)); }, r1);
  await p.evaluate(() => { [...document.querySelectorAll('#fbWorkBody .f-idea .f-btn')].find(x => /Bring it into main/.test(x.textContent)).click(); }); await p.waitForTimeout(1300);
  const merged = await p.evaluate(async (id) => { const i = await IngRepo.info(id); const l = await IngRepo.log(id); return { branch: i.branch, titles: l.map(x => x.title).slice(0, 2), toast: (document.querySelector('#fb .f-toast') || {}).textContent }; }, r1);
  ok(merged.branch === 'main' && merged.titles[0] === 'Autumn colours' && /Brought into main/.test(merged.toast || ''), 'the idea is brought into main', JSON.stringify(merged));
  // a crossing merge: both sides change the same line; the editor shows both, and the version is kept by hand
  await p.evaluate(async (id) => { await IngRepo.branch(id, 'winter'); await IngRepo.switchTo(id, 'winter'); await IngRepo.put(id, 'readme.md', '# Winter notes'); await IngRepo.commit(id, 'Winter title');
    await IngRepo.switchTo(id, 'main'); await IngRepo.put(id, 'readme.md', '# Spring notes'); await IngRepo.commit(id, 'Spring title'); await fbRender(); await new Promise(r => setTimeout(r, 500)); }, r1);
  await p.evaluate(() => { [...document.querySelectorAll('#fbViews button')].find(x => x.dataset.v === 'ideas').click(); }); await p.waitForTimeout(500);
  await p.evaluate(() => { [...document.querySelectorAll('#fbWorkBody .f-idea')].find(x => /winter/.test(x.textContent)).querySelector('.f-acts .f-btn:nth-child(2)').click(); }); await p.waitForTimeout(1500);
  const cross = await p.evaluate(async (id) => { const i = await IngRepo.info(id); return { merging: !!i.merging, note: (document.querySelector('#fbWorkBody .f-note') || {}).textContent || '', text: await IngRepo.readText(id, 'readme.md') }; }, r1);
  ok(cross.merging && /Edit them here/.test(cross.note) && /Winter/.test(cross.text) && /Spring/.test(cross.text), 'a crossing merge keeps both versions in the file, and says to edit them here', JSON.stringify(cross));
  await p.evaluate(() => { [...document.querySelectorAll('#fbViews button')].find(x => x.dataset.v === 'files').click(); }); await p.waitForTimeout(600);
  await p.evaluate(() => { [...document.querySelectorAll('#fbWorkBody .f-node')].find(x => /readme/.test(x.textContent)).click(); }); await p.waitForTimeout(300);
  await p.evaluate(() => { [...document.querySelectorAll('#fbWorkFoot .f-btn')].find(x => x.textContent === 'Edit this file').click(); }); await p.waitForTimeout(900);
  await p.fill('#fbEdText', '# Winter and spring notes'); await p.click('#fbEdSave'); await p.waitForTimeout(800);
  await p.evaluate(() => { [...document.querySelectorAll('#fbEdit .end .f-btn')].find(x => x.textContent === 'Close').click(); }); await p.waitForTimeout(700);
  await p.fill('#fbMsg', 'Winter brought in'); await p.click('#fbKeep'); await p.waitForTimeout(1300);
  const resolved = await p.evaluate(async (id) => { const i = await IngRepo.info(id); const l = await IngRepo.log(id, { max: 3 }); return { merging: !!i.merging, top: l[0].title, parents: l[0].parents.length }; }, r1);
  ok(!resolved.merging && resolved.top === 'Winter brought in' && resolved.parents === 2, 'kept by hand: a merge version with both parents', JSON.stringify(resolved));

  // the Forge's Editor: a page goes there, and its edits come back as changes to keep
  await p.evaluate(() => { [...document.querySelectorAll('#fbViews button')].find(x => x.dataset.v === 'files').click(); }); await p.waitForTimeout(600);
  await p.evaluate(() => { [...document.querySelectorAll('#fbWorkBody .f-node')].find(x => /index\.html/.test(x.textContent)).click(); }); await p.waitForTimeout(300);
  await p.evaluate(() => { [...document.querySelectorAll('#fbWorkFoot .f-btn')].find(x => x.textContent === 'Edit this file').click(); }); await p.waitForTimeout(900);
  await p.evaluate(() => { [...document.querySelectorAll('#fbEdit .f-btn')].find(x => x.textContent === 'Open it in the Editor').click(); }); await p.waitForTimeout(2500);
  const inEd = await p.evaluate(() => ({ room: document.body.getAttribute('data-froom'), name: window.__forgeEd.shellName(), has: (window.__forgeEd.shell() || '').indexOf('<h1>Notes</h1>') >= 0, app: FORGE.fab.editorApp() && FORGE.fab.editorApp().name, link: JSON.stringify(window.__fbState().fabrica.edLinks || {}) }));
  ok(inEd.room === 'editor' && inEd.name === 'index.html' && inEd.has && inEd.app === 'index.html' && /index\.html/.test(inEd.link), 'Open it in the Editor: the Editor holds the page, and Fabrica remembers where it came from', JSON.stringify(inEd));
  await p.evaluate(() => { const real = FORGE.fab.editorApp; FORGE.fab.editorApp = function () { const a = real(); if (a) { a.html = a.html.replace('<h1>Notes</h1>', '<h1>Notes, edited in the Editor</h1>'); a.edited = true; } return a; }; });
  await room(p, 'fabrica'); await p.waitForTimeout(1500);
  const back = await p.evaluate(() => ({ n: document.getElementById('fbNChanges').textContent, rows: [...document.querySelectorAll('#fbWorkBody .f-frow .p')].map(x => x.textContent.trim()), toast: (document.querySelector('#fb .f-toast') || {}).textContent }));
  ok(back.n === '1' && back.rows.join() === 'index.html' && /edits in the Editor are here/.test(back.toast || ''), 'back in Fabrica, the Editor\'s edits are here as a change to keep', JSON.stringify(back));
  await p.evaluate(async (id) => { await IngRepo.discard(id, ['index.html']); window.__fbState().fabrica.edLinks = {}; await fbRender(); }, r1);

  // Bring one in: the library, the Editor, a file, a bundle (no Code); the library's Carpe Diem comes in
  await p.evaluate(async () => { const page = '<!doctype html><html><head><meta charset="utf-8"><title>Carpe Diem</title><script>window.CD_BUILD={date:"2026-10-18",pass:"1056",stamp:"9s70"};</script></head><body><h1>Carpe Diem</h1></body></html>'; const u8 = new TextEncoder().encode(page);
    await window.__forgeLib.keepRaw({ app: 'cd', title: 'Carpe Diem', version: '1056', build: '9s70', date: '', name: 'carpe_diem.html', size: u8.length, sha256: 'test', source: 'file' }, u8, 'newest'); });
  await p.click('#fbBring'); await p.waitForTimeout(800);
  const sheet1 = await p.evaluate(() => [...document.querySelectorAll('#fb .f-opt')].map(x => x.querySelector('b').textContent + '=' + x.querySelector('small').textContent));
  ok(sheet1.map(x => x.split('=')[0]).join('|') === 'From your app library|From the Editor|A page, or a zip of its files|A git bundle, or a folder with its .git (zipped)' && /Carpe Diem 1056/.test(sheet1[0]) && /index\.html/.test(sheet1[1]), 'Bring one in offers the library, the Editor, a file and a bundle', sheet1.join(' | '));
  await p.evaluate(() => { [...document.querySelectorAll('#fb .f-opt')][0].click(); }); await p.waitForTimeout(500);
  await p.evaluate(() => { [...document.querySelectorAll('#fb .f-opt')].find(x => /Carpe Diem/.test(x.textContent)).click(); }); await p.waitForTimeout(2200);
  const cd = await p.evaluate(async () => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => /Carpe Diem/.test(x.textContent)); const rs = await IngRepo.list(); const r = rs.filter(x => /Carpe Diem/.test(x.name))[0]; return { pressed: t && t.getAttribute('aria-pressed'), line: t && t.querySelector('.stl span').textContent, app: r && r.app, files: r ? (await IngRepo.files(r.id)).map(f => f.path).join() : '' }; });
  ok(cd.pressed === 'true' && /Kept · to test/.test(cd.line) && cd.app === 'cd' && cd.files === 'carpe_diem.html', 'Carpe Diem comes in from the Forge\'s app library with a first version', JSON.stringify(cd));
  cp.execFileSync('python3', ['-I', '-c', 'import zipfile,sys\nz=zipfile.ZipFile(sys.argv[1],"w")\nz.writestr("tiny-main/index.html","<!doctype html><title>Tiny</title><p>Tiny</p>")\nz.writestr("tiny-main/README.md","# Tiny")\nz.close()', OUT + '/tiny.zip']);
  await p.click('#fbBring'); await p.waitForTimeout(400);
  const [chooser] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => { [...document.querySelectorAll('#fb .f-opt')][2].click(); })]);
  await chooser.setFiles(OUT + '/tiny.zip'); await p.waitForTimeout(2200);
  const tiny = await p.evaluate(async () => { const rs = await IngRepo.list(); const r = rs.filter(x => /tiny/i.test(x.name))[0]; return { files: r ? (await IngRepo.files(r.id)).map(f => f.path).join() : '' }; });
  ok(tiny.files === 'README.md,index.html', 'a zip comes in as an app of its own, its one folder taken off', JSON.stringify(tiny));
  const [ch2] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => { document.getElementById('fbBring').click(); setTimeout(() => { [...document.querySelectorAll('#fb .f-opt')][3].click(); }, 300); })]);
  await ch2.setFiles(OUT + '/notes.bundle'); await p.waitForTimeout(2500);
  const nb = await p.evaluate(async () => { const rs = await IngRepo.list(); const r = rs.filter(x => /^notes$/i.test(x.name))[0]; if (!r) return { names: rs.map(x => x.name).join() }; const l = await IngRepo.log(r.id); return { titles: l.length, tags: (r.tags || []).join() }; });
  ok(nb.titles >= 2 && /v1\.0\.2/.test(nb.tags || ''), 'a git bundle comes back in with its history and its release', JSON.stringify(nb));
  await p.screenshot({ path: OUT + '/ff-library.png' });

  // the keys are raised and spring; night; narrow frames; the other rooms; a reload keeps it all
  await p.evaluate(async () => { const rs = await IngRepo.list(); window.__fbState().fabrica.sel = rs.filter(r => /My Notes/.test(r.name))[0].id; await fbRender(); });
  const keys = await p.evaluate(() => { const ks = [...document.querySelectorAll('#fb .f-btn:not(.quiet), #fb .f-repo, #fb .f-cm, #fb .f-opt')].filter(x => x.offsetParent); return { n: ks.length, flat: ks.filter(k => { const cs = getComputedStyle(k); return cs.boxShadow === 'none' || !/cubic-bezier\(0\.34, 1\.3/.test(cs.transition); }).map(k => k.className + ':' + getComputedStyle(k).transition.slice(0, 50)) }; });
  ok(keys.n >= 5 && keys.flat.length === 0, 'every key is raised (a shadow) and springs as the Forge\'s keys do: none is flat or stiff', JSON.stringify(keys));
  const day = await p.evaluate(() => getComputedStyle(document.querySelector('#fb .f-btn.pri')).backgroundImage);
  ok(/rgb\(31, 106, 146\)/.test(day), 'by day the main key wears the Forge\'s blue, not Ingenium\'s purple', day.slice(0, 120));
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await p.waitForTimeout(500);
  const night = await p.evaluate(() => ({ bg: getComputedStyle(document.querySelector('#fb .f-pn')).backgroundColor, acc: getComputedStyle(document.getElementById('fb')).getPropertyValue('--f-acc').trim() }));
  ok(night.bg === 'rgb(23, 33, 42)' && night.acc === '#86c1de', 'by night the panels and the accent take the Forge\'s night tokens', JSON.stringify(night));
  await p.screenshot({ path: OUT + '/ff-night.png' });
  await p.evaluate(() => document.body.setAttribute('data-theme', 'day'));
  await p.setViewportSize({ width: 800, height: 1280 }); await room(p, 'editor'); await room(p, 'fabrica'); await p.waitForTimeout(600);
  const fire = await p.evaluate(() => { const r = document.getElementById('fb'); return { one: r.classList.contains('f-one'), shown: [...r.querySelectorAll('.f-pn')].filter(x => x.offsetParent).map(x => x.id), hs: document.documentElement.scrollWidth - innerWidth }; });
  ok(fire.one && fire.shown.join() === 'fbApps' && fire.hs <= 1, 'upright tablet: one panel at a time, opening on Your apps; nothing sideways', JSON.stringify(fire));
  await p.screenshot({ path: OUT + '/ff-fire.png' });
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(600);
  const phone = await p.evaluate(() => { const r = document.getElementById('fb'); return { phone: r.classList.contains('f-phone'), shown: [...r.querySelectorAll('.f-pn')].filter(x => x.offsetParent).length, hs: document.documentElement.scrollWidth - innerWidth }; });
  ok(phone.phone && phone.shown === 1 && phone.hs <= 1, 'phone: one panel, nothing sideways', JSON.stringify(phone));
  await p.screenshot({ path: OUT + '/ff-phone.png' });
  await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(400);
  const rooms = []; for (const r of ['editor', 'files', 'workshop', 'settings', 'fabrica']) { await room(p, r); rooms.push(await p.evaluate((r) => r + ':' + document.getElementById('room-' + r).getAttribute('data-on') + ':' + document.body.getAttribute('data-stageless'), r)); }
  ok(rooms.join(' ') === 'editor:1:0 files:1:1 workshop:1:0 settings:1:1 fabrica:1:1', 'the other rooms still open, with the stage where they had it', rooms.join(' '));
  await open(p); await room(p, 'fabrica'); await p.waitForTimeout(1200);
  const again = await p.evaluate(() => ({ tiles: [...document.querySelectorAll('#fbRepos .f-repo .nm')].map(x => x.textContent.replace(/ v.*$/, '')).sort().join(), where: JSON.parse(localStorage.getItem('forge:where') || '{}').room, key: !!localStorage.getItem('fabrica:state') }));
  ok(/My Notes/.test(again.tiles) && /Carpe Diem/.test(again.tiles) && again.key, 'after a reload the apps are still here, and Fabrica keeps its own key', JSON.stringify(again));
  const backup = await p.evaluate(() => { const re = /^(?!forgedemo:)(?:forge:|.*carpe|cd[-_]|cdp:|cdx_|tabula_incoming$)/i; return re.test('fabrica:state'); });
  ok(backup === false, 'Fabrica\'s key (where a GitHub token would be kept) is not one the Forge\'s backup carries', String(backup));
  ok(errs.length === 0, 'no script errors on the page', errs.join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
