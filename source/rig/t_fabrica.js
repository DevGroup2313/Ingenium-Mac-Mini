// R112: the Fabrica page, end to end, in Chromium, with real git as the referee for what it exports.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const cp = require('child_process');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 240) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(800);
  const parts = await p.evaluate(() => window.__ingParts && window.__ingParts.p44);
  ok(parts === 'running', 'the module ran to its end', parts);
  const nav = await p.evaluate(() => { const b = document.querySelector('.nav-btn[data-page="fabrica"]'); return b ? { text: b.textContent.trim(), prev: b.previousElementSibling && b.previousElementSibling.getAttribute('data-page') } : null; });
  ok(nav && nav.text === 'Fabrica' && nav.prev === 'build', 'a Fabrica key in the rail, after Build', JSON.stringify(nav));
  await p.evaluate(() => go('fabrica')); await p.waitForTimeout(900);
  const frame = await p.evaluate(() => { const r = document.getElementById('fb'); const sec = document.getElementById('page-fabrica'); const rc = r.getBoundingClientRect(); return { active: sec.classList.contains('active'), h: rc.height, bottom: Math.round(rc.bottom), vh: innerHeight, panels: [...r.querySelectorAll('.f-pn')].map(x => x.offsetParent ? 1 : 0), scroll: document.documentElement.scrollHeight - innerHeight, hidTitle: getComputedStyle(sec.querySelector('.page-title')).display, foot: getComputedStyle(document.querySelector('.foot')).display }; });
  ok(frame.active && frame.panels.join() === '1,1,1', 'the frame shows its three panels side by side', JSON.stringify(frame));
  ok(frame.bottom <= frame.vh + 2 && frame.scroll <= 2 && frame.hidTitle === 'none', 'one frame the height of the window; the page does not scroll', JSON.stringify(frame));
  const empty = await p.evaluate(() => ({ chip: document.getElementById('fbAppsChip').textContent, empty: !!document.querySelector('#fbRepos .f-empty'), work: document.querySelector('#fbWorkBody .f-empty b') && document.querySelector('#fbWorkBody .f-empty b').textContent }));
  ok(empty.chip === 'None yet' && empty.empty && /Choose an app/.test(empty.work), 'with nothing kept yet it says so plainly', JSON.stringify(empty));
  await p.screenshot({ path: OUT + '/fab-empty.png' });
  // a new app from a page: fromFiles, as "A page" would bring it in
  const r1 = await p.evaluate(async () => {
    const page = '<!doctype html><html><head><meta charset="utf-8"><meta name="ingenium-build" content="1.0.1"><title>Notes</title><link rel="stylesheet" href="style.css"></head><body><h1>Notes</h1><script src="app.js"></script></body></html>';
    const x = await IngRepo.fromFiles([{ path: 'index.html', data: page }, { path: 'style.css', data: 'body{font:16px serif}' }, { path: 'app.js', data: 'document.title="Notes 1";' }], { name: 'My Notes', msg: 'First version' });
    state.fabrica.sel = x.id; await fbRender(); await new Promise(r => setTimeout(r, 900)); return x.id; });
  const tile = await p.evaluate(() => { const t = document.querySelector('#fbRepos .f-repo'); return t ? { nm: t.querySelector('.nm').textContent, line: t.querySelector('.stl span').textContent, pressed: t.getAttribute('aria-pressed'), seal: !!t.querySelector('.f-ls.new') } : null; });
  ok(tile && tile.nm === 'My Notes' && tile.pressed === 'true' && /Kept · to test/.test(tile.line), 'the new app has its tile: chosen, kept, to test (no hash shown)', JSON.stringify(tile));
  const steps = await p.evaluate(() => [...document.querySelectorAll('#fbSteps li[data-s]')].map(l => l.getAttribute('data-s') + ':' + l.className).join(' '));
  ok(steps === 'change:done keep:done test:now ship:', 'the steps show Change and Keep done, Test now', steps);
  // a change made outside (as Code would make it): it appears in Changes with its lines
  await p.evaluate(async (id) => { await IngRepo.put(id, 'app.js', 'document.title="Notes 2";\nconsole.log("hello");'); await IngRepo.put(id, 'readme.md', '# Notes'); await fbRender(); await new Promise(r => setTimeout(r, 600)); }, r1);
  await p.evaluate(() => { [...document.querySelectorAll('#fbViews button')].find(x => x.dataset.v === 'changes').click(); }); await p.waitForTimeout(900);
  const ch = await p.evaluate(() => ({ n: document.getElementById('fbNChanges').textContent, rows: [...document.querySelectorAll('#fbWorkBody .f-frow')].map(r => r.querySelector('.p').textContent.trim() + '|' + r.querySelector('.k').textContent), lines: [...document.querySelectorAll('#fbWorkBody .f-dl')].map(d => d.className.replace('f-dl', '').trim() + ':' + d.textContent.trim().slice(0, 30)), chip: document.getElementById('fbWorkChip').textContent }));
  ok(ch.n === '2' && ch.rows.length === 2 && /app\.js\|changed/.test(ch.rows[0]) && /readme\.md\|added/.test(ch.rows[1]), 'two changes, file by file: app.js changed, readme.md added', JSON.stringify(ch.rows));
  ok(ch.lines.some(l => /^del:1/.test(l)) && ch.lines.some(l => /^add:1/.test(l)) && ch.lines.some(l => /^add:2\+console/.test(l)) && /2 not kept/.test(ch.chip), 'the lines taken away and added show with their numbers', JSON.stringify(ch.lines));
  await p.screenshot({ path: OUT + '/fab-changes.png' });
  // write it for me, then keep
  await p.click('#fbWrite'); const draft = await p.inputValue('#fbMsg');
  ok(/^Changes to app\.js and 1 other file\n\n- app\.js: \+2 −1 lines\n- readme\.md: new$/.test(draft), 'Write it for me drafts a message from the changes', JSON.stringify(draft));
  await p.click('#fbKeep'); await p.waitForTimeout(1200);
  const hist = await p.evaluate(() => ({ view: [...document.querySelectorAll('#fbViews button')].find(x => x.getAttribute('aria-selected') === 'true').dataset.v, cards: [...document.querySelectorAll('#fbWorkBody .f-cm b')].map(x => x.textContent), here: !!document.querySelector('#fbWorkBody .f-cm .f-chip.ok'), chip: document.getElementById('fbWorkChip').textContent }));
  ok(hist.view === 'history' && hist.cards.length === 2 && /Changes to app\.js/.test(hist.cards[0]) && hist.cards[1] === 'First version' && hist.here && /Kept/.test(hist.chip), 'kept: the history shows both versions, newest first', JSON.stringify(hist));
  // the history card opens with its files and keys
  await p.click('#fbWorkBody .f-cm'); await p.waitForTimeout(700);
  const card = await p.evaluate(() => { const c = document.querySelector('#fbWorkBody .f-cm'); return { open: c.getAttribute('aria-expanded'), files: [...c.querySelectorAll('.fl li')].map(x => x.textContent), keys: [...c.querySelectorAll('.f-acts .f-btn')].map(x => x.textContent) }; });
  ok(card.open === 'true' && card.files.join(',') === 'app.js,readme.md (added)' && /^See the changes\|Undo it\|Mark a release(\|Compare\|Browse the files)?$/.test(card.keys.join('|')), 'a version opens to its files and its keys', JSON.stringify(card));
  // mark a release through the sheet
  await p.evaluate(() => { [...document.querySelectorAll('#fbWorkBody .f-cm .f-acts .f-btn')].find(x => x.textContent === 'Mark a release').click(); }); await p.waitForTimeout(300);
  await p.fill('#fb .f-sheet input', 'v1.0.2'); await p.click('#fb .f-sheet .f-btn.pri'); await p.waitForTimeout(1000);
  const tag = await p.evaluate(() => ({ tags: [...document.querySelectorAll('#fbWorkBody .f-tag')].map(x => x.textContent), ver: document.querySelector('#fbRepos .f-repo .nm em') && document.querySelector('#fbRepos .f-repo .nm em').textContent }));
  ok(tag.tags.join() === 'v1.0.2' && tag.ver === 'v1.0.2', 'a release is marked and named on the tile', JSON.stringify(tag));
  // test this version (IngShip): the five checks, recorded beside the version
  await p.evaluate(() => document.getElementById('fbTest').click()); await p.waitForFunction(() => /Passed|Faults/.test(document.getElementById('fbTestChip').textContent), null, { timeout: 60000 }); await p.waitForTimeout(400);
  const test = await p.evaluate(() => ({ chip: document.getElementById('fbTestChip').textContent, checks: [...document.querySelectorAll('#fbChecks .f-ck')].map(c => c.className.replace('f-ck', '').trim() || '-'), steps: [...document.querySelectorAll('#fbSteps li[data-s]')].map(l => l.className).join(' '), line: document.querySelector('#fbRepos .f-repo .stl span').textContent }));
  ok(/Passed/.test(test.chip) && test.checks.slice(0, 3).join() === 'ok,ok,ok' && test.steps === 'done done done now' && /ready to ship/.test(test.line), 'tested: the checks pass and the step moves to Ship', JSON.stringify(test));
  await p.screenshot({ path: OUT + '/fab-tested.png' });
  // ship: one page and a web app, made on the device
  const dl = []; p.on('download', d => dl.push(d.suggestedFilename()));
  await p.evaluate(() => { saveFileNative = function (name, mime, data) { const u = URL.createObjectURL(new Blob([data], { type: mime })); const a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); }; });
  // 6.0: the cards are chosen by pressing them (the APK and one page at first); here one page and the web app
  await p.evaluate(() => { const card = k => document.querySelector('#fbTargets .f-tg[data-k="' + k + '"]'); if (card('apk').getAttribute('aria-pressed') === 'true') card('apk').click(); if (card('web').getAttribute('aria-pressed') !== 'true') card('web').click(); });
  const picked = await p.evaluate(() => [...document.querySelectorAll('#fbTargets .f-tg[aria-pressed="true"]')].map(e => e.dataset.k).sort().join());
  ok(picked === 'page,web', 'the cards are chosen by pressing them', picked);
  await p.evaluate(() => document.getElementById('fbMakeAll').click()); await p.waitForFunction(() => /Made/.test(document.getElementById('fbShipState').textContent), null, { timeout: 60000 }); await p.waitForTimeout(600);
  const ship = await p.evaluate(() => ({ state: document.getElementById('fbShipState').textContent, chips: [...document.querySelectorAll('#fbTargets .f-tg .foot .f-chip')].map(x => x.textContent), tile: document.querySelector('#fbRepos .f-repo .stl span').textContent, step: [...document.querySelectorAll('#fbSteps li[data-s]')].map(l => l.className).join(' ') }));
  ok(/Made/.test(ship.state) && ship.chips.filter(c => /Made/.test(c)).length >= 2 && /Shipped/.test(ship.tile), 'shipped: one page and a web app are made and noted beside the version', JSON.stringify(ship));
  ok(dl.some(n => /\.html$/.test(n)) && dl.some(n => /web.*\.zip$/.test(n)), 'both packages were saved', dl.join(', '));
  await p.screenshot({ path: OUT + '/fab-shipped.png' });
  // the bundle, checked by real git
  const b64 = await p.evaluate(async (id) => { const u = await IngRepo.bundle(id); let s = ''; for (let i = 0; i < u.length; i += 32768) s += String.fromCharCode.apply(null, u.subarray(i, i + 32768)); return btoa(s); }, r1);
  fs.writeFileSync(OUT + '/notes.bundle', Buffer.from(b64, 'base64')); const cl = OUT + '/notes-clone'; fs.rmSync(cl, { recursive: true, force: true });
  let gitok = true, log = ''; try { cp.execFileSync('git', ['clone', '-q', OUT + '/notes.bundle', cl]); cp.execFileSync('git', ['-C', cl, 'fsck', '--full', '--strict'], { stdio: 'pipe' }); log = cp.execFileSync('git', ['-C', cl, 'log', '--format=%s%d', 'main']).toString(); } catch (e) { gitok = false; log = String(e.stderr || e.message); }
  ok(gitok && /Changes to app\.js.*tag: v1\.0\.2/.test(log.split('\n')[0]) && /First version/.test(log), 'git clones the bundle: both versions and the release are there', log.replace(/\n/g, ' / '));
  // ideas: a branch, work on it, bring it into main
  await p.evaluate(() => { [...document.querySelectorAll('#fbViews button')].find(x => x.dataset.v === 'ideas').click(); }); await p.waitForTimeout(500);
  await p.evaluate(() => { [...document.querySelectorAll('#fbWorkFoot .f-btn')].find(x => /New idea/.test(x.textContent)).click(); }); await p.waitForTimeout(300);
  await p.fill('#fb .f-sheet input', 'autumn'); await p.click('#fb .f-sheet .f-btn.pri'); await p.waitForTimeout(900);
  const idea = await p.evaluate(() => ({ branch: document.getElementById('fbBranchName').textContent, ideas: [...document.querySelectorAll('#fbWorkBody .f-idea')].map(x => x.querySelector('b').textContent.trim().split(' ')[0] + (x.classList.contains('on') ? '*' : '')) }));
  ok(idea.branch === 'autumn' && idea.ideas.join() === 'main,autumn*', 'a new idea is a branch, and the work moves onto it', JSON.stringify(idea));
  await p.evaluate(async (id) => { await IngRepo.put(id, 'style.css', 'body{font:16px serif;color:#432}'); await IngRepo.commit(id, 'Autumn colours'); await fbRender(); await new Promise(r => setTimeout(r, 700)); }, r1);
  await p.evaluate(() => { [...document.querySelectorAll('#fbWorkBody .f-idea .f-btn')].find(x => /Bring it into main/.test(x.textContent)).click(); }); await p.waitForTimeout(1200);
  const merged = await p.evaluate(async (id) => { const i = await IngRepo.info(id); const l = await IngRepo.log(id); return { branch: i.branch, titles: l.map(x => x.title), toast: document.querySelector('#fb .f-toast') && document.querySelector('#fb .f-toast').textContent }; }, r1);
  ok(merged.branch === 'main' && merged.titles[0] === 'Autumn colours' && /Brought into main/.test(merged.toast || ''), 'the idea is brought into main (fast forward, nothing crossed)', JSON.stringify(merged));
  // files view and a saved copy
  await p.evaluate(() => { [...document.querySelectorAll('#fbViews button')].find(x => x.dataset.v === 'files').click(); }); await p.waitForTimeout(600);
  const files = await p.evaluate(() => [...document.querySelectorAll('#fbWorkBody .f-node .nm')].map(x => x.textContent));
  ok(files.join() === 'app.js,index.html,readme.md,style.css', 'Files lists every file of the working copy', files.join());
  // night, and the narrow frames
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(500);
  const night = await p.evaluate(() => ({ bg: getComputedStyle(document.querySelector('#fb .f-pn')).backgroundColor, ink: getComputedStyle(document.querySelector('#fb .f-head h1')).color }));
  ok(night.bg === 'rgb(32, 26, 43)' && night.ink === 'rgb(243, 238, 251)', 'by night the panels and the ink take the night tokens', JSON.stringify(night));
  await p.screenshot({ path: OUT + '/fab-night.png' });
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); });
  await p.setViewportSize({ width: 800, height: 1280 }); await p.waitForTimeout(500);
  const fire = await p.evaluate(() => { const r = document.getElementById('fb'); return { one: r.classList.contains('f-one'), tabs: getComputedStyle(document.getElementById('fbTabs')).display, shown: [...r.querySelectorAll('.f-pn')].filter(x => x.offsetParent).map(x => x.id), scroll: document.documentElement.scrollHeight - innerHeight, bottom: Math.round(r.getBoundingClientRect().bottom), vh: innerHeight }; });
  /* R123: Fabrica was opened afresh just above (the page loop ends on it), so on a narrow frame it shows Your apps */
  ok(fire.one && fire.tabs !== 'none' && fire.shown.join() === 'fbApps' && fire.scroll <= 2 && fire.bottom <= fire.vh + 2, 'upright tablet: one panel at a time under tabs; no page scroll', JSON.stringify(fire));
  await p.evaluate(() => { [...document.querySelectorAll('#fbTabs button')].find(x => x.dataset.p === 'ship').click(); }); await p.waitForTimeout(400);
  await p.screenshot({ path: OUT + '/fab-fire.png' });
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(500);
  const phone = await p.evaluate(() => { const r = document.getElementById('fb'); const doc = document.documentElement; return { phone: r.classList.contains('f-phone'), hscroll: doc.scrollWidth - innerWidth, shown: [...r.querySelectorAll('.f-pn')].filter(x => x.offsetParent).map(x => x.id) }; });
  ok(phone.phone && phone.hscroll <= 1 && phone.shown.length === 1, 'phone: one panel, nothing sideways', JSON.stringify(phone));
  await p.evaluate(() => { [...document.querySelectorAll('#fbTabs button')].find(x => x.dataset.p === 'apps').click(); }); await p.waitForTimeout(400);
  await p.screenshot({ path: OUT + '/fab-phone.png' });
  await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(500);
  // Code and Fabrica keep the same files: open in Code, change there, come back
  await p.evaluate(() => { [...document.querySelectorAll('#fbViews button')].find(x => x.dataset.v === 'files').click(); }); await p.waitForTimeout(500);
  await p.evaluate(() => { [...document.querySelectorAll('#fbWorkFoot .f-btn')].find(x => /Open it in Code/.test(x.textContent)).click(); }); await p.waitForTimeout(1500);
  const code = await p.evaluate(() => { const pr = (state.projects || []).filter(p => p.app && p.name === 'My Notes')[0]; return { page: document.querySelector('.section.active').id, mode: document.body.getAttribute('data-chatmode'), proj: pr ? pr.files.map(f => f.name).sort().join() : null, main: pr && pr.main, link: pr && state.fabrica.links[Object.keys(state.fabrica.links)[0]] === pr.id }; });
  ok(code.page === 'page-chat' && code.mode === 'code' && code.proj === 'app.js,index.html,readme.md,style.css' && code.main === 'index.html' && code.link, 'Open it in Code: the Code page opens on a project with the same files', JSON.stringify(code));
  await p.evaluate(async () => { const pr = (state.projects || []).filter(p => p.app && p.name === 'My Notes')[0]; const f = pr.files.filter(x => x.name === 'readme.md')[0]; await ccPut(f, '# Notes\n\nChanged in Code.'); go('fabrica'); });
  await p.waitForFunction(() => document.getElementById('fbNChanges').textContent === '1' && document.querySelectorAll('#fbWorkBody .f-frow').length === 1, null, { timeout: 15000 }); await p.waitForTimeout(400);
  const back = await p.evaluate(() => ({ n: document.getElementById('fbNChanges').textContent, rows: [...document.querySelectorAll('#fbWorkBody .f-frow .p')].map(x => x.textContent.trim()), line: document.querySelector('#fbRepos .f-repo .stl span').textContent }));
  ok(back.n === '1' && back.rows.join() === 'readme.md' && /1 to keep/.test(back.line), 'a change made in Code comes back to Fabrica as a change to keep', JSON.stringify(back));
  await p.evaluate(async (id) => { await IngRepo.discard(id, ['readme.md']); }, r1);
  // the app library: Lector's kept copy of an app comes in with its own seal
  await p.evaluate(async () => { const page = '<!doctype html><html><head><meta charset="utf-8"><title>Carpe Diem</title></head><body><h1>Carpe Diem</h1></body></html>'; const u8 = new TextEncoder().encode(page); await libPut('lib-cd-test', u8, page); libState().apps.cd = { ref: 'lib-cd-test', sha256: 'test', version: '1051', title: 'carpe_diem.html', size: u8.length, at: Date.now() }; saveState(); });
  await p.click('#fbBring'); await p.waitForTimeout(400);
  const sheet1 = await p.evaluate(() => [...document.querySelectorAll('#fb .f-opt b')].map(x => x.textContent));
  ok(sheet1.join('|') === 'From your app library|A page, or a zip of its files|A git bundle, or a folder with its .git (zipped)|From Code', 'Bring one in offers the library, a file, a bundle and Code', sheet1.join('|'));
  await p.evaluate(() => { [...document.querySelectorAll('#fb .f-opt')][0].click(); }); await p.waitForTimeout(400);
  await p.evaluate(() => { [...document.querySelectorAll('#fb .f-opt')].find(x => /Carpe Diem/.test(x.textContent)).click(); }); await p.waitForTimeout(2000);
  const cd = await p.evaluate(() => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => /Carpe Diem/.test(x.textContent)); return t ? { pressed: t.getAttribute('aria-pressed'), layers: t.querySelectorAll('.f-ls-l').length, ver: t.querySelector('.nm em') && t.querySelector('.nm em').textContent, line: t.querySelector('.stl span').textContent, n: document.querySelectorAll('#fbRepos .f-repo').length } : null; });
  ok(cd && cd.pressed === 'true' && cd.layers >= 3 && /Kept · to test/.test(cd.line) && cd.n === 2, 'Carpe Diem comes in from the library with its layered seal and a first version', JSON.stringify(cd));
  await p.screenshot({ path: OUT + '/fab-library.png' });
  // a zip of files comes in as an app of its own (GitHub's Download ZIP shape: one folder round everything)
  cp.execFileSync('python3', ['-I', '-c', 'import zipfile,sys\nz=zipfile.ZipFile(sys.argv[1],"w")\nz.writestr("tiny-main/index.html","<!doctype html><title>Tiny</title><p>Tiny</p>")\nz.writestr("tiny-main/README.md","# Tiny")\nz.close()', OUT + '/tiny.zip']);
  await p.click('#fbBring'); await p.waitForTimeout(300);
  const [chooser] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => { [...document.querySelectorAll('#fb .f-opt')][1].click(); })]);
  await chooser.setFiles(OUT + '/tiny.zip'); await p.waitForTimeout(2000);
  const tiny = await p.evaluate(async () => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => /tiny/i.test(x.textContent)); const rs = await IngRepo.list(); const r = rs.filter(x => /tiny/i.test(x.name))[0]; const fl = r ? (await IngRepo.files(r.id)).map(f => f.path) : []; return { tile: !!t, files: fl.join(), n: rs.length }; });
  ok(tiny.tile && tiny.files === 'README.md,index.html' && tiny.n === 3, 'a zip comes in as an app of its own, its one folder taken off', JSON.stringify(tiny));
  await p.evaluate(async () => { const rs = await IngRepo.list(); for (const r of rs) if (!/My Notes/.test(r.name)) await IngRepo.remove(r.id); state.fabrica.sel = rs.filter(r => /My Notes/.test(r.name))[0].id; await fbRender(); await new Promise(r => setTimeout(r, 600)); });
  // the keys are raised and spring: box shadows and a spring transition on every key
  const keys = await p.evaluate(() => { const ks = [...document.querySelectorAll('#fb .f-btn:not(.quiet), #fb .f-repo, #fb .f-frow, #fb .f-cm, #fb .f-opt')].filter(x => x.offsetParent); return { n: ks.length, flat: ks.filter(k => { const cs = getComputedStyle(k); return cs.boxShadow === 'none' || !/cubic-bezier\(0\.34, 1\.35/.test(cs.transition); }).map(k => k.className) }; });
  ok(keys.n >= 5 && keys.flat.length === 0, 'every key is raised (a shadow) and springs (the spring curve): none is flat or stiff', JSON.stringify(keys));
  // the other pages still work and the whole page has no errors
  const pages = await p.evaluate(async () => { const out = []; for (const pg of ['home', 'chat', 'lector', 'build', 'tabula', 'fabrica']) { go(pg); await new Promise(r => setTimeout(r, 250)); out.push(pg + ':' + (pg === 'tabula' ? (IngDesk.state().shown && IngDesk.state().active === 'tabula') : document.getElementById('page-' + pg).classList.contains('active')) + ':' + document.body.classList.contains('fb-on')); } /* R123: Tabula opens on the Desk */ return out; });
  ok(pages.join(' ') === 'home:true:false chat:true:false lector:true:false build:true:false tabula:true:false fabrica:true:true', 'moving between pages keeps each one whole; fb-on only on Fabrica', pages.join(' '));
  await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(1000);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); go('fabrica'); }); await p.waitForTimeout(1200);
  const again = await p.evaluate(() => ({ tiles: document.querySelectorAll('#fbRepos .f-repo').length, nm: document.querySelector('#fbRepos .f-repo .nm') && document.querySelector('#fbRepos .f-repo .nm').textContent, line: document.querySelector('#fbRepos .f-repo .stl span') && document.querySelector('#fbRepos .f-repo .stl span').textContent }));
  ok(again.tiles === 1 && /My Notes/.test(again.nm || ''), 'after a reload the app is still here, with its state', JSON.stringify(again));
  const notRunning = await p.evaluate(() => Object.entries(window.__ingParts || {}).filter(([k, v]) => v !== 'running').map(x => x.join(':')));
  ok(notRunning.length === 0, 'every part of the page ran to its end (the smoke test\'s check)', notRunning.join(' '));
  ok(errs.length === 0, 'no script errors on the page', errs.join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
