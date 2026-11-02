// Ingenium 6.1 · Fabrica at parity with GitHub (R141): Code (any idea, release or version, the README, line numbers, Blame,
// a file's history, a search, save, edit), Issues, Pull requests (reviews, merge, a merge whose files hold both versions,
// the idea deleted and brought back), Compare (the version comparison tool, also from History), Actions, Projects (drag
// and keys), Wiki, Insights, Settings (about, star, labels, fork, template, the issues and pages saved in one file and brought
// back, found by name on another device), the store's export and import, an app removed
// taking its record, the Markdown kept safe, the look by day, by night, on a phone and on a 3440 display, and the same views
// inside the Forge's copy of Fabrica (no Chat, no Code, no Build, no model).
//   node rig/t_61_hub.js http://127.0.0.1:8201/ingenium.html <out folder> [forge=<url of the Forge page>]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 400) : '')); c ? pass++ : fail++; };
const SRC = path.join(__dirname, '..');
(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1600, height: 1000 }, acceptDownloads: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  const downloads = []; p.on('download', d => downloads.push(d));
  async function nextDownload(fn, timeout = 30000) { const n0 = downloads.length; await fn(); const t0 = Date.now(); while (downloads.length <= n0 && Date.now() - t0 < timeout) await p.waitForTimeout(150);
    const d = downloads[n0]; if (!d) return null; const f = path.join(OUT, d.suggestedFilename()); await d.saveAs(f); return f; }
  const ev = (fn, a) => p.evaluate(fn, a);
  const wait = (fn, a, t = 20000) => p.waitForFunction(fn, a, { timeout: t }).then(() => true, () => false);
  // Playwright's waitForFunction takes a promise as truthy and stops at once, so a wait on the store polls here instead
  const waitA = async (fn, a, t = 20000) => { const t0 = Date.now(); while (Date.now() - t0 < t) { if (await ev(fn, a).catch(() => false)) return true; await p.waitForTimeout(200); } return false; };
  // (6.3: the tabs are in four rooms, and only the chosen room's show: its room is chosen first, as a person would)
  const tab = async v => { await ev(v => { if (window.fbRooms) { const R = fbRooms.rooms.find(r => r.v.includes(v)); if (R && fbRooms.room() !== R.k) fbRooms.choose(R.k); } }, v); await p.waitForTimeout(200);
    await p.click('#fbViews button[data-v="' + v + '"]'); await p.waitForTimeout(450);
    // (6.3: an app's settings are cards that fold; each is opened, as a person would open the one wanted, and stays open)
    if (v === 'settings') { await ev(() => document.querySelectorAll('#fbWorkBody .fr-fold.fr-shut .fr-fh').forEach(h => h.click())); await p.waitForTimeout(150); } };
  const body = () => ev(() => document.getElementById('fbWorkBody').innerText);
  const toastText = () => ev(() => (document.querySelector('#fb .f-toast') || {}).textContent || '');
  const clickText = async (sel, text) => { const ok2 = await ev(([s, t]) => { const e = [...document.querySelectorAll(s)].find(x => x.textContent.trim() === t && x.offsetParent); if (e) { e.click(); return true; } return false; }, [sel, text]); await p.waitForTimeout(350); return ok2; };
  const rec = id => ev(id => fbHub.record(id), id);

  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(800);
  await ev(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(500);
  const parts = await ev(() => [window.__ingParts.p44, window.__ingParts.p62, window.fbHub && Object.keys(fbHub.views).join(','), typeof fbHub.exportAll, typeof fbHub.importAll]);
  ok(parts[0] === 'running' && parts[1] === 'running' && parts[2] === 'code,issues,pulls,compare,actions,projects,wiki,insights,settings' && parts[3] === 'function' && parts[4] === 'function', 'Fabrica (p44) and the hub (p62) ran to their end; nine views, exportAll and importAll', parts);
  const quiet = await ev(() => new Promise(res => { const r = indexedDB.databases ? indexedDB.databases() : Promise.resolve([]); r.then(l => res(l.map(x => x.name))); }));
  ok(!quiet.includes('ingenium_hub'), 'nothing heavy at start: the hub opens no store until a view needs it', quiet.join(','));

  // ---------- an app with a history: three versions, a release, a picture and a README that tries to run HTML ----------
  const png = fs.readFileSync(path.join(SRC, 'shells', 'test', 'icons', 'android-xxxhdpi.png')).toString('base64');
  const id = await ev(async png => {
    const page = '<!doctype html>\n<html><head><meta charset="utf-8"><title>Tide Clock</title></head>\n<body>\n<h1>Tide Clock</h1>\n<p>one</p>\n</body></html>\n';
    const readme = '# Tide Clock\n\nA **clock** for the _tides_, with `code`.\n\n| Part | Size |\n|:--|--:|\n| hands | 2 |\n| face | 1 |\n\n- one\n- two\n  - nested\n- [x] done\n- [ ] not yet\n\n```js\nvar x = 1 < 2;\n```\n\n> a quote\n> > inside\n\n<script>alert("readme")</script>\n\n<img src=x onerror="window.__pwned=1">\n\n[bad](javascript:window.__pwned=2) and [its code](src/app.js) and [a site](https://example.org).\n\n![logo](logo.png)\n';
    const bin = Uint8Array.from(atob(png), c => c.charCodeAt(0));
    const x = await IngRepo.fromFiles([{ path: 'index.html', data: page }, { path: 'README.md', data: readme }, { path: 'src/app.js', data: 'var a = 1;\nvar b = 2;\n' }, { path: 'logo.png', data: bin }], { name: 'Tide Clock', msg: 'First version' });
    await IngRepo.put(x.id, 'src/app.js', 'var a = 1;\nvar b = 2;\nvar c = 3;\n'); await IngRepo.commit(x.id, 'Add c');
    await IngRepo.tag(x.id, 'v1');
    await IngRepo.put(x.id, 'src/app.js', 'var a = 10;\nvar b = 2;\nvar c = 3;\n'); await IngRepo.commit(x.id, 'Change a');
    await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Other</title><p>other</p>' }], { name: 'Another app', msg: 'First version' });
    go('fabrica'); await new Promise(r => setTimeout(r, 400)); state.fabrica.sel = x.id; fbRender(); await new Promise(r => setTimeout(r, 1200)); return x.id; }, png);
  ok(!!id, 'an app with three versions, a release (v1), a picture and a README', id);

  // ---------- the tabs ----------
  const tabs = await ev(() => { const vb = document.getElementById('fbViews'); return { names: [...vb.querySelectorAll('button[data-v]')].map(b => b.getAttribute('data-v')).join(','), roles: [...vb.querySelectorAll('button[data-v]')].every(b => b.getAttribute('role') === 'tab'), over: vb.scrollWidth > vb.clientWidth, ox: getComputedStyle(vb).overflowX }; });
  const rooms = await ev(() => ({ rooms: [...document.querySelectorAll('#fbRooms .fr-room')].map(b => b.textContent.trim() + (b.getAttribute('aria-pressed') === 'true' ? '*' : '')).join(','),
    shown: [...document.querySelectorAll('#fbViews button[data-v]')].filter(b => !b.hidden).map(b => b.getAttribute('data-v')).join(','), says: (document.getElementById('fbRoomSays') || {}).textContent || '' }));
  ok(tabs.names === 'changes,files,code,history,compare,releases,ideas,issues,pulls,projects,wiki,actions,insights,settings' && tabs.roles && rooms.rooms === 'Now*,Story,Plans,Care' && rooms.shown === 'changes,files,code' && /as it is now/.test(rooms.says),
    'fourteen tabs in four rooms (6.3): Now (Changes, Files, Code), Story (History, Compare, Releases), Plans (Ideas, Issues, Pull requests, Projects, Wiki), Care (Checks, Overview, Settings); only the chosen room\'s show, with a line that says what it holds', { tabs: tabs.names, rooms });
  ok(!tabs.over, 'so the tab row never has to scroll sideways', tabs);
  await ev(() => document.querySelector('#fbViews button[data-v="changes"]').focus()); await p.keyboard.press('End'); await p.waitForTimeout(700);
  const endTab = await ev(() => [document.activeElement.getAttribute('data-v')]);
  ok(endTab[0] === 'code', 'the keys move along the tabs shown (End reaches Code, the last of Now)', endTab);

  // ---------- CODE ----------
  await tab('code'); await wait(() => !!document.getElementById('hReadme'));
  const code = await ev(() => { const r = document.getElementById('hReadme'); const names = [...document.querySelectorAll('#fbWorkBody .f-tree .f-node .nm')].map(x => x.textContent);
    return { names, h1: (r.querySelector('h1') || {}).textContent, th: [...r.querySelectorAll('th')].map(x => x.textContent + ':' + (x.style.textAlign || '')), li: r.querySelectorAll('li').length, task: r.querySelectorAll('li.task input[disabled]').length, checked: r.querySelectorAll('li.task input:checked').length,
      pre: (r.querySelector('pre code') || {}).textContent, bq: r.querySelectorAll('blockquote blockquote').length, strong: (r.querySelector('strong') || {}).textContent, em: (r.querySelector('em') || {}).textContent,
      scripts: r.querySelectorAll('script').length, imgs: [...r.querySelectorAll('img')].map(i => i.getAttribute('alt') + '|' + (i.getAttribute('onerror') || '')), text: r.textContent,
      js: [...r.querySelectorAll('a')].filter(a => /javascript/i.test(a.getAttribute('href') || '')).length, links: [...r.querySelectorAll('a')].map(a => a.textContent + '>' + (a.getAttribute('data-path') || a.getAttribute('href'))), latest: document.querySelector('#fbWorkBody .h-line b').textContent }; });
  ok(code.names.join() === 'src/,index.html,logo.png,README.md' && code.latest === 'Change a', 'Code lists the folders and files at the idea worked on, with the latest version above', code.names.join() + ' · ' + code.latest);
  ok(code.h1 === 'Tide Clock' && code.th.join() === 'Part:left,Size:right' && code.li === 5 && code.task === 2 && code.checked === 1 && code.pre === 'var x = 1 < 2;' && code.bq === 1 && code.strong === 'clock' && code.em === 'tides',
    'the README is drawn: headings, a table with its alignment, lists (nested, and tasks), code, quotes inside quotes, emphasis', code);
  const pwned = await ev(() => window.__pwned);
  ok(code.scripts === 0 && code.imgs.join() === 'logo|' && code.js === 0 && /<script>alert\("readme"\)<\/script>/.test(code.text) && /<img src=x onerror/.test(code.text) && !pwned,
    'HTML in the README is shown as text, never run; a javascript: link is only words', { imgs: code.imgs, js: code.js, pwned });
  const logoSrc = await wait(() => { const i = document.querySelector('#hReadme img'); return i && /^blob:/.test(i.src) && i.naturalWidth > 0; }, null, 8000);
  ok(logoSrc && code.links.includes('its code>src/app.js') && code.links.some(l => /^a site>https:\/\/example.org/.test(l)), 'the README\'s picture comes from the app itself; its links to the app\'s files open them', code.links);
  await p.screenshot({ path: OUT + '/hub-code-day.png' });
  await ev(() => [...document.querySelectorAll('#hReadme a')].find(a => a.textContent === 'its code').click()); await wait(() => !!document.getElementById('hFileView'));
  const f1 = await ev(() => ({ lines: [...document.querySelectorAll('#hFileView .h-ln')].map(x => x.querySelector('i').textContent + ':' + x.lastChild.textContent), crumbs: document.querySelector('#fbWorkBody .h-crumbs').innerText.replace(/\s+/g, '') }));
  ok(f1.lines.join('|') === '1:var a = 10;|2:var b = 2;|3:var c = 3;' && f1.crumbs === 'TideClock/src/app.js', 'a file with its line numbers, and where it is in the app', f1);
  await p.click('#hFileView .h-ln[data-n="2"] i'); await p.waitForTimeout(150);
  ok(await ev(() => [...document.querySelectorAll('#hFileView .h-hl')].map(x => x.getAttribute('data-n')).join() === '2'), 'a press on a line number marks that line');
  // the version picker: the release v1
  await p.selectOption('#fbWorkBody .h-bar select.h-sel', 'refs/tags/v1'); await wait(() => { const l = document.querySelector('#hFileView .h-ln'); return l && /var a = 1;$/.test(l.textContent); });
  const atTag = await ev(() => document.querySelector('#hFileView .h-ln').lastChild.textContent);
  ok(atTag === 'var a = 1;', 'the picker shows the same file at the release v1, as it was then', atTag);
  await ev(() => document.querySelector('#fbWorkFoot .f-btn[data-k="edit"]').click()); await p.waitForTimeout(300);
  const noEdit = [await ev(() => !!document.getElementById('fbEdit')), await toastText()];
  ok(!noEdit[0] && /Editing is for the idea you are working on/.test(noEdit[1]), 'at a release, Edit says plainly that editing is for the idea you work on', noEdit[1]);
  await p.selectOption('#fbWorkBody .h-bar select.h-sel', 'refs/heads/main'); await wait(() => { const l = document.querySelector('#hFileView .h-ln'); return l && /var a = 10;$/.test(l.textContent); });
  await p.click('#fbWorkFoot .f-btn[data-k="edit"]'); await wait(() => !!document.getElementById('fbEdit'));
  // (the editor says "Reading src/app.js…" until the file is read from the store; the text is looked at once it is there)
  await wait(() => { const t = document.getElementById('fbEdText'); return !!t && !t.disabled && t.value.length > 0; }, null, 10000);
  const edit = await ev(() => [document.getElementById('fbEdFile').value, document.getElementById('fbEdText').value]);
  ok(edit[0] === 'src/app.js' && /var a = 10;/.test(edit[1]), 'on main, Edit opens Fabrica\'s own editor on this file', edit[0]);
  await ev(() => [...document.querySelectorAll('#fbEdit .f-btn')].find(x => x.textContent === 'Close').click()); await p.waitForTimeout(200);
  const saved = await nextDownload(() => clickText('#fbWorkFoot .f-btn', 'Save a copy'));
  ok(saved && path.basename(saved) === 'app.js' && fs.readFileSync(saved, 'utf8') === 'var a = 10;\nvar b = 2;\nvar c = 3;\n', 'Save a copy saves the file as it is at that version', saved && path.basename(saved));
  // blame
  await clickText('#fbWorkBody .f-seg button', 'Blame'); await wait(() => !!document.getElementById('hBlame'));
  const bl = await ev(() => ({ groups: [...document.querySelectorAll('#hBlame .h-bg')].map(g => g.querySelector('.h-bm b').textContent + ':' + [...g.querySelectorAll('.f-dl i')].map(i => i.textContent).join('.')), note: document.getElementById('hBlameNote').textContent }));
  ok(bl.groups.join('|') === 'Change a:1|First version:2|Add c:3' && /Looked back through 3 versions, all of this idea's history/.test(bl.note), 'Blame: each line with the version that last changed it, and how far back it looked', bl);
  await p.screenshot({ path: OUT + '/hub-blame.png' });
  await clickText('#fbWorkBody .f-seg button', 'History'); await wait(() => !!document.getElementById('hFileHist'));
  const fh = await ev(() => [...document.querySelectorAll('#hFileHist .h-ver')].map(x => x.querySelector('.t').textContent + ':' + x.querySelector('small').textContent.split(' · ')[0]));
  ok(fh.join('|') === 'Change a:changed|Add c:changed|First version:added', 'the History of one file: every version that changed it', fh);
  // search
  await p.fill('#hCodeQ', 'var'); await p.press('#hCodeQ', 'Enter'); await wait(() => !!document.getElementById('hSearchNote'));
  const sr = await ev(() => ({ note: document.getElementById('hSearchNote').textContent, files: [...document.querySelectorAll('#fbWorkBody .h-res')].map(r => r.querySelector('.h-res-h span').textContent + ':' + [...r.querySelectorAll('.h-res-l i')].map(i => i.textContent).join('.')), marks: document.querySelectorAll('#fbWorkBody mark.h-mk').length }));
  ok(/^4 lines in 2 files for “var” at main, in 3 files searched \(1 picture/.test(sr.note) && sr.files.sort().join('|') === 'README.md:17|src/app.js:1.2.3' && sr.marks === 4, 'a search across the code: results by file and line, each found word marked; pictures left out', sr);
  await ev(() => [...document.querySelectorAll('#fbWorkBody .h-res')].find(r => /app\.js/.test(r.textContent)).querySelectorAll('.h-res-l')[2].click()); await wait(() => !!document.querySelector('#hFileView .h-hl'));
  ok(await ev(() => document.querySelector('#hFileView .h-hl').getAttribute('data-n') === '3' && !!document.querySelector('#fbWorkBody .h-bar .f-btn')), 'a press on a result opens the file at that line, with a way back to the search');
  await p.fill('#hCodeQ', '/a = \\d+;/'); await p.press('#hCodeQ', 'Enter'); await wait(() => !!document.getElementById('hSearchNote') && /“\/a/.test(document.getElementById('hSearchNote').textContent));
  const rx = await ev(() => document.getElementById('hSearchNote').textContent);
  ok(/^1 line in 1 file/.test(rx), 'a pattern between slashes searches as a regular expression', rx);
  await p.fill('#hCodeQ', '/(/'); await p.press('#hCodeQ', 'Enter'); await p.waitForTimeout(500);
  const bad = await body(); ok(/That pattern cannot be read/i.test(bad), 'a pattern that cannot be read is said so, in plain words', bad.replace(/\s+/g, ' ').slice(-140));
  await clickText('#fbWorkFoot .f-btn', 'Close the search');
  const closed = await ev(() => !document.getElementById('hSearchNote') && !/That pattern/.test(document.getElementById('fbWorkBody').innerText));
  ok(closed, 'Close the search is there even when the pattern could not be read, and it closes it');
  await tab('code'); await wait(() => !!document.querySelector('#fbWorkBody .f-tree'));
  const zip = await nextDownload(() => clickText('#fbWorkFoot .f-btn', 'Download this version (zip)'));
  let zl = []; try { zl = cp.execFileSync('unzip', ['-Z1', zip]).toString().trim().split('\n'); } catch (e) { }
  ok(zip && /Tide-Clock-main\.zip$/.test(zip) && zl.some(x => /src\/app\.js$/.test(x)) && zl.some(x => /logo\.png$/.test(x)), 'Download this version (zip) saves the files of the version shown', zip && path.basename(zip) + ' ' + zl.length);

  // ---------- ISSUES ----------
  await tab('issues'); await wait(() => !!document.getElementById('hIssNew'));
  await p.click('#hIssNew'); await p.fill('#hIsT', 'The clock is slow'); await p.fill('#hIsB', 'It loses **a minute** an hour.');
  await ev(() => [...document.querySelectorAll('#fbWorkBody .h-form button.h-lab')].find(b => b.textContent === 'bug').click());
  await clickText('#fbWorkBody .h-form .f-seg button', 'Preview');
  ok(await ev(() => { const pv = document.querySelector('#fbWorkBody .h-form .h-prev'); return !pv.hidden && pv.querySelector('strong') && pv.querySelector('strong').textContent === 'a minute'; }), 'the issue\'s words have a Preview, drawn as Markdown');
  await p.click('#hIsGo'); await wait(() => !!document.getElementById('hIsTitle'));
  const i1 = await ev(() => ({ t: document.getElementById('hIsTitle').textContent, st: document.querySelector('#fbWorkBody .h-state').textContent, labs: [...document.querySelectorAll('#fbWorkBody .h-meta .h-lab')].map(x => x.textContent), cnt: document.querySelector('#fbViews button[data-v="issues"] .n').textContent }));
  ok(i1.t === 'The clock is slow #1' && i1.st === 'Open' && i1.labs.join() === 'bug' && i1.cnt === '1', 'a new issue is #1, open, with its label; the Issues tab counts it', i1);
  await p.fill('#hIsC', 'Seen again **today**.'); await p.click('#hIsCm'); await p.waitForTimeout(400);
  ok(await ev(() => [...document.querySelectorAll('#hIsTl .h-cmt')].length === 2 && document.querySelectorAll('#hIsTl .h-cmt strong')[1].textContent === 'today'), 'a comment, in Markdown, joins its conversation');
  await p.click('#hIsClose'); await p.waitForTimeout(400);
  const cl = await ev(() => [document.querySelector('#fbWorkBody .h-state').textContent, !!document.getElementById('hIsReopen'), /Closed/.test(document.getElementById('hIsTl').innerText)]);
  await p.click('#hIsReopen'); await p.waitForTimeout(400);
  const ro = await ev(() => [document.querySelector('#fbWorkBody .h-state').textContent, /Reopened/.test(document.getElementById('hIsTl').innerText)]);
  ok(cl[0] === 'Closed' && cl[1] && cl[2] && ro[0] === 'Open' && ro[1], 'it closes, and opens again, and its conversation says so', [cl, ro]);
  await ev(() => document.querySelector('#fbWorkBody [data-k="back"]').click()); await p.waitForTimeout(300);
  await p.click('#hIssNew'); await p.fill('#hIsT', 'Add a moon phase'); await ev(() => [...document.querySelectorAll('#fbWorkBody .h-form button.h-lab')].find(b => b.textContent === 'enhancement').click()); await p.click('#hIsGo'); await p.waitForTimeout(400);
  await ev(() => document.querySelector('#fbWorkBody [data-k="back"]').click()); await p.waitForTimeout(300);
  await p.fill('#hIssQ', 'moon'); await p.waitForTimeout(200);
  const q1 = await ev(() => [...document.querySelectorAll('#hIssList .h-item')].map(x => x.getAttribute('data-n')).join());
  await p.fill('#hIssQ', ''); await ev(() => [...document.querySelectorAll('#fbWorkBody .h-filt button.h-lab')].find(b => b.textContent.replace('✓', '') === 'bug').click()); await p.waitForTimeout(300);
  const q2 = await ev(() => [...document.querySelectorAll('#hIssList .h-item')].map(x => x.getAttribute('data-n')).join());
  await ev(() => [...document.querySelectorAll('#fbWorkBody .h-filt button.h-lab')].find(b => b.textContent.replace('✓', '') === 'bug').click()); await p.waitForTimeout(300);
  await p.fill('#hIssQ', 'minute'); await p.waitForTimeout(200);
  const q3 = await ev(() => [...document.querySelectorAll('#hIssList .h-item')].map(x => x.getAttribute('data-n')).join()); await p.fill('#hIssQ', '');
  ok(q1 === '2' && q2 === '1' && q3 === '1', 'the search finds by words (in the text too) and a label shows only its own', [q1, q2, q3]);
  await p.screenshot({ path: OUT + '/hub-issues.png' });
  // a version kept with "fixes #1", through Fabrica's own Keep
  await ev(id => IngRepo.put(id, 'index.html', '<!doctype html>\n<html><head><meta charset="utf-8"><title>Tide Clock</title></head>\n<body>\n<h1>Tide Clock</h1>\n<p>one</p>\n<p>on time</p>\n</body></html>\n'), id);
  await ev(() => fbRender()); await p.waitForTimeout(800); await tab('changes'); await wait(() => !!document.getElementById('fbMsg'));
  await p.fill('#fbMsg', 'Keep the hour, fixes #1'); await p.click('#fbKeep');
  const closedBy = await waitA(id => fbHub.record(id).then(r => r.issues[0].state === 'closed'), id, 15000);
  const i1r = (await rec(id)).issues[0];
  await p.waitForTimeout(1800); const t1 = await toastText();
  ok(closedBy && i1r.closedBy && i1r.closedBy.kind === 'version' && i1r.closedBy.title === 'Keep the hour, fixes #1' && /Issue #1 is closed by this version/.test(t1), 'a version kept with “fixes #1” closes issue 1, and says so', [i1r.closedBy, t1]);
  await tab('issues'); await ev(() => document.querySelector('#fbWorkBody .h-seg, #fbWorkBody .f-seg button[data-s="closed"]').click()); await p.waitForTimeout(300);
  await ev(() => document.querySelector('#hIssList .h-item[data-n="1"]').click()); await p.waitForTimeout(400);
  const ment = await ev(() => ({ tl: document.getElementById('hIsTl').innerText.replace(/\s+/g, ' '), men: ((document.getElementById('hIssMent') || {}).innerText || '').replace(/\s+/g, ' ') }));
  ok(/Closed by version [0-9a-f]{7} “Keep the hour, fixes #1”/.test(ment.tl) && /Keep the hour, fixes #1/.test(ment.men), 'the issue names the version that closed it, under Mentioned in as well', ment.men);

  // ---------- PULL REQUESTS ----------
  await ev(async id => { await IngRepo.branch(id, 'moon'); await IngRepo.switchTo(id, 'moon'); await IngRepo.put(id, 'moon.js', 'var phase = "full";\n'); await IngRepo.commit(id, 'Add the moon, closes #2'); await IngRepo.switchTo(id, 'main'); await fbHub.scan(id); fbRender(); }, id); await p.waitForTimeout(900);
  const i2 = (await rec(id)).issues[1];
  ok(i2.state === 'open' && i2.refs.length === 1 && i2.refs[0].idea === 'moon', '“closes #2” on another idea mentions issue 2 and leaves it open until it reaches main', { state: i2.state, refs: i2.refs.map(r => r.idea) });
  await tab('pulls'); await p.click('#hPrNew'); await wait(() => /1 version to bring in/.test((document.getElementById('hPrInfo') || {}).textContent || ''));
  const pf = await ev(() => ({ from: document.getElementById('hPrFrom').value, to: document.getElementById('hPrTo').value, info: document.getElementById('hPrInfo').textContent, ph: document.getElementById('hPrT').placeholder }));
  ok(pf.from === 'moon' && pf.to === 'main' && /1 version to bring in, 1 file changed/.test(pf.info) && pf.ph === 'Add the moon, closes #2', 'a new pull request: the idea, its target, what it brings, and its one version\'s words as its title', pf);
  await p.fill('#hPrB', 'The moon, at last.'); await p.click('#hPrGo'); await wait(() => !!document.getElementById('hPrTitle'));
  const pr3 = await ev(() => ({ t: document.getElementById('hPrTitle').textContent, st: document.querySelector('#fbWorkBody .h-state').textContent, cnt: document.querySelector('#fbViews button[data-v="pulls"] .n').textContent, box: document.getElementById('hPrMergeBox').innerText }));
  ok(pr3.t === 'Add the moon, closes #2 #3' && pr3.st === 'Open' && pr3.cnt === '1' && /1 version to bring in/.test(pr3.box) && /comes? in cleanly/.test(pr3.box), 'it is #3 (numbers shared with issues), open, and ready to merge cleanly', pr3);
  await wait(() => [...document.querySelectorAll('#fbWorkBody .f-seg button')].some(b => b.textContent.trim() === 'Versions1')); await clickText('#fbWorkBody .f-seg button', 'Versions1'); await wait(() => !!document.getElementById('hPrVers'));
  const pv = await ev(() => [...document.querySelectorAll('#hPrVers .h-ver .t')].map(x => x.textContent));
  await ev(() => [...document.querySelectorAll('#fbWorkBody .f-seg button')].find(b => /Files changed/.test(b.textContent)).click()); await wait(() => !!document.querySelector('#fbWorkBody .f-files .f-frow'));
  const pfc = await ev(() => [...document.querySelectorAll('#fbWorkBody .f-files .f-frow')].map(r => r.querySelector('.p').textContent + ':' + r.querySelector('.k').textContent).join() + ' / ' + document.querySelector('#fbWorkBody .f-diff .f-dcode').innerText.trim());
  ok(pv.join() === 'Add the moon, closes #2' && /^moon\.js:added \/ lines 1 to 1\s+1\s*\+\s*var phase = "full";$/.test(pfc), 'its Versions, and its Files changed line by line (Fabrica\'s own diff list)', [pv, pfc]);
  await ev(() => [...document.querySelectorAll('#fbWorkBody .f-seg button')].find(b => /Conversation/.test(b.textContent)).click()); await p.waitForTimeout(300);
  await p.fill('#hPrC', 'Looks right.'); await p.click('#hPrApprove'); await p.waitForTimeout(400);
  const rv = await ev(() => [document.querySelector('#fbWorkBody .h-meta .f-chip').textContent, document.querySelectorAll('#hPrTl .h-cmt.approve').length]);
  ok(rv[0] === 'Approved' && rv[1] === 1, 'a review: Approve, with its words, marks it Approved', rv);
  const nChip = await ev(() => { const b = [...document.querySelectorAll('#fbWorkBody .f-seg button[aria-pressed="true"]')].find(x => x.querySelector('.n')); if (!b) return null; const n = b.querySelector('.n'); return [b.textContent, getComputedStyle(n).color]; });
  ok(nChip && /^Conversation1$/.test(nChip[0]) && nChip[1] === 'rgb(255, 255, 255)', 'the count on a pressed key is white on its amethyst, easy to read', nChip);
  await p.fill('#hPrC', ''); await p.click('#hPrChanges'); await p.waitForTimeout(250);
  ok(/Say what to change first/.test(await toastText()), 'Ask for changes wants a word of what to change');
  await p.screenshot({ path: OUT + '/hub-pull.png' });
  await p.click('#hPrMerge'); await waitA(id => fbHub.record(id).then(r => r.pulls[0].state === 'merged'), id, 15000); await p.waitForTimeout(700);
  const mg = await ev(async id => { const r = await fbHub.record(id); const f = await IngRepo.files(id, 'refs/heads/main'); const i = await IngRepo.info(id); return { pr: r.pulls[0].state, merged: !!r.pulls[0].merged.commit, i2: r.issues[1].state, by: r.issues[1].closedBy, moon: f.some(x => x.path === 'moon.js'), branch: i.branch, box: document.getElementById('hPrMergeBox').innerText }; }, id);
  ok(mg.pr === 'merged' && mg.merged && mg.moon && mg.branch === 'main' && mg.i2 === 'closed' && /Merged/.test(mg.box), 'Merge brings moon into main; the pull request is merged, and “closes #2” closes issue 2', mg);
  await p.click('#hPrDelBr'); await p.waitForTimeout(900);
  const del = await ev(id => IngRepo.info(id).then(i => i.branches.join()), id);
  await p.click('#hPrRestore'); await p.waitForTimeout(900);
  const back = await ev(id => IngRepo.info(id).then(i => i.branches.join()), id);
  ok(del === 'main' && back === 'main,moon', 'after the merge its idea can be deleted, and brought back', [del, back]);
  // a merge whose files hold both versions
  await ev(async id => { await IngRepo.branch(id, 'night'); await IngRepo.switchTo(id, 'night'); await IngRepo.put(id, 'index.html', '<!doctype html>\n<html><head><meta charset="utf-8"><title>Tide Clock</title></head>\n<body>\n<h1>Tide Clock</h1>\n<p>night</p>\n<p>on time</p>\n</body></html>\n'); await IngRepo.commit(id, 'Night');
    await IngRepo.switchTo(id, 'main'); await IngRepo.put(id, 'index.html', '<!doctype html>\n<html><head><meta charset="utf-8"><title>Tide Clock</title></head>\n<body>\n<h1>Tide Clock</h1>\n<p>day</p>\n<p>on time</p>\n</body></html>\n'); await IngRepo.commit(id, 'Day'); fbRender(); }, id);
  await p.waitForTimeout(900); await tab('pulls'); await p.click('#hPrNew'); await wait(() => /1 version to bring in/.test((document.getElementById('hPrInfo') || {}).textContent || ''));
  const autoFrom = await ev(() => document.getElementById('hPrFrom').value);
  ok(autoFrom === 'night', 'a new pull request starts from the idea that has something to bring in (moon is in main already; night is not)', autoFrom);
  await p.selectOption('#hPrFrom', 'night'); await wait(() => /index\.html|1 file also changed/.test((document.getElementById('hPrInfo') || {}).textContent || ''));
  const cinfo = await ev(() => document.getElementById('hPrInfo').textContent);
  await p.click('#hPrGo'); await wait(() => !!document.getElementById('hPrMerge')); await p.click('#hPrMerge');
  await wait(() => /Both versions are in 1 file/.test((document.getElementById('hPrMergeBox') || {}).innerText || ''), null, 15000);
  const cbox = await ev(() => document.getElementById('hPrMergeBox').innerText);
  ok(/1 file also changed in main/.test(cinfo) && /index\.html changed in both ideas/.test(cbox) && /keep the version: that completes the merge/.test(cbox), 'a merge whose files hold both versions explains what to do: choose in Changes, then keep the version', cbox.replace(/\s+/g, ' ').slice(0, 260));
  await p.screenshot({ path: OUT + '/hub-pull-both.png' });
  const work = await ev(id => IngRepo.readText(id, 'index.html'), id);
  ok(/<<<<<<< main[\s\S]*<p>day<\/p>[\s\S]*=======[\s\S]*<p>night<\/p>[\s\S]*>>>>>>> night/.test(work), 'the file holds both versions, marked', work.split('\n').slice(4, 10).join(' '));
  await ev(id => IngRepo.put(id, 'index.html', '<!doctype html>\n<html><head><meta charset="utf-8"><title>Tide Clock</title></head>\n<body>\n<h1>Tide Clock</h1>\n<p>day and night</p>\n<p>on time</p>\n</body></html>\n'), id);
  await ev(() => fbRender()); await p.waitForTimeout(800); await tab('changes'); await wait(() => !!document.getElementById('fbMsg'));
  await p.fill('#fbMsg', 'Bring night in'); await p.click('#fbKeep');
  const done4 = await waitA(id => fbHub.record(id).then(r => r.pulls[1].state === 'merged'), id, 15000);
  const p4 = (await rec(id)).pulls[1], log4 = await ev(id => IngRepo.log(id, { max: 1 }), id);
  ok(done4 && p4.merged.commit === log4[0].oid && log4[0].parents.length === 2, 'keeping the version completes the merge, and the pull request is marked merged', { state: p4.state, commit: p4.merged && p4.merged.commit.slice(0, 7), parents: log4[0].parents.length });

  // ---------- COMPARE ----------
  await tab('compare'); await p.selectOption('#hCmpA', 'refs/tags/v1'); await p.waitForTimeout(200); await p.selectOption('#hCmpB', 'refs/heads/main'); await wait(() => !!document.getElementById('hCmpSum'));
  const cm = await ev(() => ({ sum: document.getElementById('hCmpSum').innerText.replace(/\n/g, ' · '), vers: document.querySelectorAll('#hCmpVers .h-ver').length, idx: [...document.querySelectorAll('#hCmpIdx .f-frow .p')].map(x => x.textContent), blocks: [...document.querySelectorAll('#fbWorkBody .h-dblk')].map(x => x.getAttribute('data-path')), lines: document.querySelectorAll('#fbWorkBody .h-dblk .f-dl.add').length }));
  const vcount = await ev(id => Promise.all([IngRepo.log(id, { ref: 'refs/tags/v1' }), IngRepo.log(id, { ref: 'refs/heads/main' })]).then(([a, b]) => b.filter(c => !a.some(x => x.oid === c.oid)).length), id);
  ok(cm.vers === vcount && new RegExp('^' + vcount + ' versions from v1 to main').test(cm.sum) && cm.idx.join() === 'index.html,moon.js,src/app.js' && cm.blocks.join() === cm.idx.join() && cm.lines >= 3,
    'Compare: v1 against main, the versions between them, and every changed file line by line', cm);
  await p.screenshot({ path: OUT + '/hub-compare.png' });
  await p.click('#hCmpSwap'); await wait(() => /from main to v1/.test((document.getElementById('hCmpSum') || {}).innerText || ''));
  const sw = await ev(() => document.getElementById('hCmpSum').innerText.replace(/\n/g, ' · '));
  ok(/^0 versions from main to v1/.test(sw) && new RegExp('v1 does not have ' + vcount + ' versions of main').test(sw), 'Swap turns the comparison round, and says what the other side lacks', sw);
  await p.selectOption('#hCmpA', 'refs/heads/main'); await p.waitForTimeout(200); await p.selectOption('#hCmpB', 'refs/heads/moon'); await wait(() => !!document.getElementById('hCmpPr'));
  await p.click('#hCmpPr'); await wait(() => !!document.getElementById('hPrFrom'));
  const fromCmp = await ev(() => [document.getElementById('hPrFrom').value, document.getElementById('hPrTo').value]);
  ok(fromCmp.join() === 'moon,main', 'two ideas compared offer “Open a pull request”, filled in', fromCmp);
  await ev(() => [...document.querySelectorAll('#fbWorkFoot .f-btn')].find(b => b.textContent === 'Cancel').click());
  await tab('history'); await wait(() => document.querySelectorAll('#fbWorkBody .f-cm').length > 3);
  await ev(() => { const c = [...document.querySelectorAll('#fbWorkBody .f-cm')].find(x => x.querySelector('b').textContent === 'Add c'); c.click(); }); await wait(() => !!document.querySelector('#fbWorkBody .h-cmpk'));
  await p.click('#fbWorkBody .h-cmpk'); await wait(() => !!document.getElementById('hCmpSum'));
  const fromHist = await ev(() => ({ sum: document.getElementById('hCmpSum').innerText.replace(/\n/g, ' · '), b: document.getElementById('hCmpB').selectedOptions[0].textContent, files: [...document.querySelectorAll('#hCmpIdx .p')].map(x => x.textContent).join() }));
  ok(/^1 version from [0-9a-f]{7} to [0-9a-f]{7}/.test(fromHist.sum) && /Add c/.test(fromHist.b) && fromHist.files === 'src/app.js', 'from History, any version opens in Compare beside the one before it, and either side can be changed', fromHist);

  // ---------- ACTIONS ----------
  await tab('actions'); await p.click('#hActRun'); await waitA(id => fbHub.record(id).then(r => r.runs.length === 1), id, 60000); await p.waitForTimeout(600);
  const run1 = (await rec(id)).runs[0], r1ui = await ev(() => ({ checks: [...document.querySelectorAll('#hRuns .h-run[data-n="1"] .f-ck')].map(x => x.getAttribute('data-ck') + ':' + x.className.replace('f-ck', '').trim()), head: document.querySelector('#hRuns .h-run[data-n="1"] b').textContent }));
  ok(run1.n === 1 && run1.checks.length === 5 && run1.ok && run1.by === 'hand' && r1ui.checks.length === 5 && /#1 · Passed · Bring night in/.test(r1ui.head), 'Actions: the checks run by hand on a version, kept as run #1 with its five checks', r1ui);
  await p.click('#hActAuto'); await p.waitForTimeout(300);
  await ev(async id => { await IngRepo.put(id, 'notes.md', '# Notes\n'); }, id); await ev(() => fbRender()); await p.waitForTimeout(700); await tab('changes'); await wait(() => !!document.getElementById('fbMsg'));
  await p.fill('#fbMsg', 'Add notes'); await p.click('#fbKeep');
  const auto = await waitA(id => fbHub.record(id).then(r => r.runs.length === 2 && r.runs[0].by === 'kept'), id, 60000);
  const run2 = (await rec(id)).runs[0];
  ok(auto && run2.title === 'Add notes' && run2.checks.length === 5, 'with “Run them on every version kept” on, a version kept is checked by itself', { by: run2.by, title: run2.title });
  await tab('actions'); await p.waitForTimeout(300); await p.screenshot({ path: OUT + '/hub-actions.png' });

  // ---------- PROJECTS ----------
  await tab('issues'); await ev(() => document.querySelector('#fbWorkBody .f-seg button[data-s="open"]').click()); await p.click('#hIssNew'); await p.fill('#hIsT', 'Polish the face'); await p.click('#hIsGo'); await p.waitForTimeout(400);
  await tab('projects'); await p.click('#hBoardNote'); await p.fill('#fb .f-sheet textarea', 'Ask about the tides'); await ev(() => [...document.querySelectorAll('#fb .f-sheet .f-btn')].find(b => b.textContent === 'Save').click()); await p.waitForTimeout(500);
  await p.click('#hBoardAdd'); await p.waitForTimeout(300);
  await ev(() => document.querySelector('#fb .f-sheet .f-opt[data-k="issue:5"]').click()); await ev(() => document.querySelector('#fb .f-sheet .f-opt[data-k="issue:1"]').click()); await p.click('#hBoardAddGo'); await p.waitForTimeout(500);
  const b1 = (await rec(id)).board;
  ok(b1.todo.length === 2 && /^note:/.test(b1.todo[0]) && b1.todo[1] === 'issue:5' && b1.done.join() === 'issue:1', 'a board: a note and an open issue in To do; a closed issue goes straight to Done', b1);
  const card = await p.locator('#hBoard .h-card[data-k^="note:"]').boundingBox(), colB = await p.locator('#hBoard .h-colm[data-col="doing"]').boundingBox();
  await p.mouse.move(card.x + card.width / 2, card.y + card.height / 2); await p.mouse.down(); await p.mouse.move(card.x + card.width / 2 + 30, card.y + 20, { steps: 4 });
  await p.mouse.move(colB.x + colB.width / 2, colB.y + 80, { steps: 12 }); await p.mouse.up(); await p.waitForTimeout(600);
  const b2 = (await rec(id)).board;
  ok(b2.doing.length === 1 && /^note:/.test(b2.doing[0]) && b2.todo.join() === 'issue:5', 'a card dragged to In progress moves there', b2);
  await ev(() => document.querySelector('#hBoard .h-card[data-k="issue:5"]').focus()); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(500);
  const b3 = (await rec(id)).board, foc = await ev(() => document.activeElement && document.activeElement.getAttribute('data-k'));
  await p.keyboard.press('Alt+ArrowUp'); await p.waitForTimeout(500); const b4 = (await rec(id)).board;
  ok(b3.doing.join() === 'note:' + b2.doing[0].slice(5) + ',issue:5' && foc === 'issue:5' && b4.doing[0] === 'issue:5', 'by the keys: → moves a card to the next column (it keeps the focus), Alt with ↑ moves it up', [b3.doing, foc, b4.doing]);
  await p.screenshot({ path: OUT + '/hub-projects.png' });
  await ev(id => fbHub.record(id), id); await tab('issues'); await ev(() => document.querySelector('#hIssList .h-item[data-n="5"]').click()); await p.waitForTimeout(300); await p.click('#hIsClose'); await p.waitForTimeout(400);
  await tab('projects'); await p.waitForTimeout(400); const b5 = (await rec(id)).board;
  ok(b5.done.indexOf('issue:5') >= 0 && b5.doing.indexOf('issue:5') < 0, 'a closed issue moves to Done by itself', b5);

  // ---------- WIKI ----------
  await tab('wiki'); await p.click('#hWikiStart'); await p.fill('#hWikiText', '# Welcome\n\nSee [[Plans]] and [[the moon|Moon page]].'); await p.fill('#hWikiMsg', 'First words'); await p.click('#hWikiSave'); await wait(() => !!document.getElementById('hWikiView'));
  const w1 = await ev(() => [...document.querySelectorAll('#hWikiView a')].map(a => a.textContent + ':' + a.getAttribute('data-wiki') + ':' + a.className));
  ok(w1.join('|') === 'Plans:Plans:h-new|the moon:Moon page:h-new', 'a wiki page with [[Page]] links; a page not written yet is marked', w1);
  await ev(() => document.querySelector('#hWikiView a[data-wiki="Plans"]').click()); await wait(() => !!document.getElementById('hWikiText'));
  await p.fill('#hWikiText', 'The plans: a moon, a tide table.'); await p.click('#hWikiSave'); await wait(() => !!document.getElementById('hWikiView'));
  await clickText('#fbWorkBody .h-pages button', 'Home'); await p.waitForTimeout(300);
  const w2 = await ev(() => [...document.querySelectorAll('#hWikiView a')].map(a => a.textContent + ':' + a.className).join('|'));
  ok(w2 === 'Plans:|the moon:h-new', 'pressing the link writes the page; Home first, and the link is whole once it is written', w2);
  await p.click('#hWikiEdit'); await p.fill('#hWikiText', '# Welcome home\n\nSee [[Plans]].'); await p.fill('#hWikiMsg', 'Shorter'); await p.click('#hWikiSave'); await p.waitForTimeout(400);
  await p.click('#hWikiHist'); await wait(() => !!document.getElementById('hWikiRevs'));
  const wh = await ev(() => ({ revs: [...document.querySelectorAll('#hWikiRevs .h-ver .t')].map(x => x.textContent), diff: document.getElementById('hWikiDiff').innerText }));
  ok(wh.revs.join() === 'Shorter,First words' && /\+\s*# Welcome home/.test(wh.diff) && /−\s*# Welcome/.test(wh.diff), 'each page\'s history, with what changed between revisions', wh.revs);
  await ev(() => document.querySelectorAll('#hWikiRevs .h-ver')[1].click()); await p.waitForTimeout(300); await p.click('#hWikiBack'); await p.waitForTimeout(400);
  const w3 = (await rec(id)).wiki.pages.Home.revs;
  ok(w3.length === 3 && w3[2].text === w3[0].text, 'an older revision can be brought back, as a new one', w3.map(x => x.msg));
  await p.screenshot({ path: OUT + '/hub-wiki.png' });

  // ---------- INSIGHTS ----------
  await tab('insights'); await wait(() => !!document.getElementById('hInsTotals'));
  const ins = await ev(async id => { const r = await IngRepo.info(id); const all = {}; for (const b of r.branches.concat(r.tags)) for (const c of await IngRepo.log(id, { ref: b, max: 3000 })) all[c.oid] = c;
    const st = k => document.querySelector('#hInsTotals .h-stat[data-k="' + k + '"]').innerText.replace(/\n/g, ' ');
    return { n: Object.keys(all).length, versions: st('versions'), ideas: st('ideas'), releases: st('releases'), issues: st('issues'), pulls: st('pulls'), cols: document.querySelectorAll('#hInsWeeks .h-colb').length, last: document.querySelectorAll('#hInsWeeks .h-colb')[15].getAttribute('aria-label'), who: document.getElementById('hInsWho').innerText, langs: document.getElementById('hInsLangs').innerText }; }, id);
  ok(ins.versions === ins.n + ' versions kept' && ins.ideas === '3 ideas' && ins.releases === '1 release' && ins.issues === '0 open 3 closed issues' && ins.pulls === '0 open 2 merged · 0 closed pull requests', 'Insights: the totals of versions, ideas, releases, issues and pull requests', ins);
  ok(ins.cols === 16 && new RegExp(': ' + ins.n + ' versions$').test(ins.last) && /Yannie D\. Forest/.test(ins.who) && /HTML/.test(ins.langs) && /Markdown/.test(ins.langs) && /JavaScript/.test(ins.langs), 'versions per week over 16 weeks, contributors, and languages by size', [ins.last, ins.langs.replace(/\n/g, ' ')]);
  await p.click('#hInsLines'); await wait(() => !!document.getElementById('hInsLineRows'), null, 20000);
  const li = await ev(() => ({ rows: document.querySelectorAll('#hInsLineRows > div').length, sum: document.getElementById('hInsLineSum').innerText }));
  const mainN = await ev(id => IngRepo.log(id, { ref: 'refs/heads/main', max: 20 }).then(l => l.length), id);
  ok(li.rows === mainN && /added: \d+/.test(li.sum) && /taken away: \d+/.test(li.sum), 'on request, the lines added and taken away in the last 20 versions', li);
  await p.screenshot({ path: OUT + '/hub-insights.png' });
  await clickText('#fbWorkBody .h-sub .f-btn', 'Show as a table'); await p.waitForTimeout(200);
  ok(await ev(() => document.querySelectorAll('#fbWorkBody .h-tbl tbody tr').length === 16), 'the weeks can be read as a table too');

  // ---------- SETTINGS ----------
  await tab('settings'); await p.fill('#hSetDesc', 'A clock for the tides'); await p.fill('#hSetSite', 'tides.example.org'); await p.fill('#hSetTopics', 'Clock, Tides, offline'); await p.click('#hSetSave'); await p.waitForTimeout(800);
  await p.screenshot({ path: OUT + '/hub-settings.png' });
  const ab = await rec(id), info0 = await ev(id => IngRepo.info(id), id);
  ok(ab.about.site === 'https://tides.example.org' && ab.about.topics.join() === 'clock,tides,offline' && info0.desc === 'A clock for the tides', 'its description, website and topics are kept (the description in the repository too)', ab.about);
  await ev(() => { const v = document.querySelector('#fbViews button[data-v="code"]'); v.click(); }); await p.waitForTimeout(500);
  const aboutBox = await ev(() => (document.querySelector('#fbWorkBody .h-about') || {}).innerText || '');
  ok(/A clock for the tides/.test(aboutBox) && /tides\.example\.org/.test(aboutBox) && /clock/.test(aboutBox), 'Code shows them, as GitHub\'s About', aboutBox.replace(/\n/g, ' '));
  await tab('settings');
  const order0 = await ev(() => [...document.querySelectorAll('#fbRepos .f-repo .nm')].map(x => x.textContent.trim()));
  await p.click('#hSetStar'); await p.waitForTimeout(900);
  const order1 = await ev(() => ({ names: [...document.querySelectorAll('#fbRepos .f-repo .nm')].map(x => x.textContent.trim()), star: !!document.querySelector('#fbRepos .f-repo .h-starmark'), saved: state.v61.hub.stars }));
  ok(order0[0] !== 'Tide Clock' || order1.names[0] === 'Tide Clock', 'a star', order0);
  ok(order1.names[0] === 'Tide Clock' && order1.star && order1.saved.includes(id), 'a starred app stands first in Your apps, with its star', order1);
  await p.click('#hSetNewLabel'); await p.fill('#fb .f-sheet input', 'urgent'); await ev(() => [...document.querySelectorAll('#fb .f-sheet .f-btn')].find(b => b.textContent === 'Done').click()); await p.waitForTimeout(500);
  await ev(() => { const row = [...document.querySelectorAll('#hSetLabels .h-labrow')].find(r => r.querySelector('input[type=text]').value === 'urgent'); const c = row.querySelector('input[type=color]'); c.value = '#ff8800'; c.dispatchEvent(new Event('input')); [...row.querySelectorAll('.f-btn')].find(b => b.textContent === 'Save').click(); });
  await p.waitForTimeout(400); await tab('issues');
  const lab = await ev(() => { const b = [...document.querySelectorAll('#fbWorkBody .h-filt button.h-lab')].find(x => x.textContent.replace('✓', '') === 'urgent'); return b ? b.style.getPropertyValue('--lc') : null; });
  ok(lab === '#ff8800', 'a new label with its own colour, ready for issues', lab);
  await tab('settings'); await p.click('#hSetFork'); await p.fill('#fb .f-sheet input', 'Tide Clock fork'); await ev(() => [...document.querySelectorAll('#fb .f-sheet .f-btn')].find(b => b.textContent === 'Done').click());
  await wait(() => document.getElementById('fbWhName').textContent === 'Tide Clock fork', null, 15000);
  const fk = await ev(async id => { const rs = await IngRepo.list(); const f = rs.find(r => r.name === 'Tide Clock fork'); const cnt = async x => { const all = {}; for (const b of x.branches) for (const c of await IngRepo.log(x.id, { ref: 'refs/heads/' + b })) all[c.oid] = 1; return Object.keys(all).length; };
    const o = rs.find(r => r.id === id); const rec = await fbHub.record(f.id); return { id: f.id, a: await cnt(o), b: await cnt(f), br: f.branches.join(), tags: f.tags.join(), app: f.app, forkOf: rec.forkOf && rec.forkOf.name, labs: rec.labels.map(l => l.name).join() }; }, id);
  ok(fk.a === fk.b && fk.br === 'main,moon,night' && fk.tags === 'v1' && fk.forkOf === 'Tide Clock' && /urgent/.test(fk.labs) && !fk.app, 'Fork: a new app with the whole history (every version, idea and release), and the labels', fk);
  await ev(id => { state.fabrica.sel = id; fbRender(); }, id); await p.waitForTimeout(900); await tab('settings');
  await p.click('#hSetTpl'); await p.fill('#fb .f-sheet input', 'Wave Clock'); await ev(() => [...document.querySelectorAll('#fb .f-sheet .f-btn')].find(b => b.textContent === 'Done').click());
  await wait(() => document.getElementById('fbWhName').textContent === 'Wave Clock', null, 15000);
  const tp = await ev(async id => { const rs = await IngRepo.list(); const t = rs.find(r => r.name === 'Wave Clock'); const l = await IngRepo.log(t.id); const fa = (await IngRepo.files(t.id, 'HEAD')).map(f => f.path + ':' + f.oid).join(); const fb = (await IngRepo.files(id, 'HEAD')).map(f => f.path + ':' + f.oid).join(); return { id: t.id, n: l.length, msg: l[0].title, same: fa === fb, from: (await fbHub.record(t.id)).from.name }; }, id);
  ok(tp.n === 1 && /from the template Tide Clock/.test(tp.msg) && tp.same && tp.from === 'Tide Clock', 'Use as a template: a new app from the current files, with a fresh history', tp);

  // ---------- the store: export, import, an app removed takes its record ----------
  const exp = await ev(() => fbHub.exportAll());
  const mine = exp.apps.find(a => a.id === id);
  ok(exp.kind === 'ingenium-hub' && mine && mine.issues.length === 3 && mine.pulls.length === 2 && mine.wiki.pages.Plans && exp.stars.includes(id), 'exportAll gives every app\'s record (issues, pull requests, wiki, board) and the stars', { apps: exp.apps.length, issues: mine && mine.issues.length });
  await ev(id => fbHub.forget(id), id); const gone = await ev(id => fbHub.record(id), id);
  const imp = await ev(d => fbHub.importAll(JSON.stringify(d)), exp); const again = await rec(id);
  ok(gone.issues.length === 0 && imp.apps === exp.apps.length && again.issues.length === 3 && again.pulls[0].state === 'merged' && again.wiki.pages.Home.revs.length === 3, 'importAll puts every record back as it was', { gone: gone.issues.length, back: again.issues.length });
  const badImp = await ev(() => fbHub.importAll('{"kind":"other"}').then(() => 'took it', e => e.message));
  ok(/not a backup of Fabrica/.test(badImp), 'importAll refuses what is not its own, in plain words', badImp);
  // the same copy from Settings, as a file the owner keeps; and a copy from another device, where each app came in with a new id
  await tab('settings'); await wait(() => !!document.getElementById('hSetExport'));
  const expF = await nextDownload(() => p.click('#hSetExport'));
  let expJ = null; try { expJ = JSON.parse(fs.readFileSync(expF, 'utf8')); } catch (e) { }
  const tideE = expJ && expJ.apps.find(a => a.id === id);
  ok(expJ && expJ.kind === 'ingenium-hub' && tideE && tideE.name === 'Tide Clock' && tideE.issues.length === 3 && /^fabrica-issues-and-pages-\d{4}-\d\d-\d\d\.json$/.test(path.basename(expF)), 'Settings saves every app\'s issues and pages in one file, each with its app\'s name', expF && path.basename(expF));
  const movedId = await ev(async () => (await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Moved</title><p>moved</p>' }], { name: 'Moved Clock', msg: 'First version' })).id);
  const other = { kind: 'ingenium-hub', version: 1, at: Date.now(), stars: [], apps: [
    { id: 'repo_otherdevice1', name: 'Moved Clock', v: 1, next: 2, issues: [{ n: 1, kind: 'issue', title: 'From the other device', body: '', state: 'open', labels: [], created: Date.now(), updated: Date.now(), comments: [], events: [], refs: [] }], pulls: [] },
    { id: 'repo_otherdevice2', name: 'Not here at all', v: 1, next: 1, issues: [], pulls: [] }] };
  await p.setInputFiles('#hSetImportFile', { name: 'from-the-other-device.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(other)) });
  const asked = await wait(() => [...document.querySelectorAll('button')].some(b => b.textContent.trim() === 'Bring them back' && b.offsetParent), null, 8000);
  const askText = await ev(() => (document.querySelector('.ing-ask p') || {}).textContent || '');
  await clickText('button', 'Bring them back');
  const movedOk = await waitA(mid => fbHub.record(mid).then(r => r.issues.length === 1 && r.issues[0].title === 'From the other device'), movedId, 8000);
  await p.waitForTimeout(300); const impToast = await toastText();
  const orphan = await ev(() => new Promise(res => { const rq = indexedDB.open('ingenium_hub'); rq.onsuccess = () => { const g = rq.result.transaction('apps').objectStore('apps').getAllKeys(); g.onsuccess = () => res(g.result.filter(k => /otherdevice/.test(k))); }; }));
  ok(asked && /2 apps/.test(askText) && movedOk && orphan.length === 0 && /the notes of 1 app, 1 found by name\. 1 app in the copy is not in Fabrica here: bring it in, then bring the copy back again\./.test(impToast),
    'Bring a copy back asks first; an app with a new id is found by its name, and the notes of an app not here are left in the copy, said plainly', [askText, impToast, orphan]);
  await p.setInputFiles('#hSetImportFile', { name: 'notes.json', mimeType: 'application/json', buffer: Buffer.from('{"kind":"something else"}') }); await p.waitForTimeout(500);
  ok(/That is not a backup of Fabrica's issues and pages/.test(await toastText()), 'a file that is not such a copy is refused in plain words, before anything is asked');
  const rm = await ev(async fid => { const before = await new Promise(res => { const rq = indexedDB.open('ingenium_hub'); rq.onsuccess = () => { const g = rq.result.transaction('apps').objectStore('apps').get(fid); g.onsuccess = () => res(!!g.result); }; });
    await IngRepo.remove(fid); await new Promise(r => setTimeout(r, 200)); const after = await new Promise(res => { const rq = indexedDB.open('ingenium_hub'); rq.onsuccess = () => { const g = rq.result.transaction('apps').objectStore('apps').get(fid); g.onsuccess = () => res(!!g.result); }; }); return [before, after]; }, fk.id);
  ok(rm[0] === true && rm[1] === false, 'removing an app from Fabrica removes its record from the hub\'s store', rm);

  // ---------- the Markdown, kept safe ----------
  const mdS = await ev(() => { const t = s => fbHub.md(s); return {
    a: t('[x](javascript:alert(1)) [y](JaVaScRiPt:alert(1)) [z](data:text/html,1) [w]( vbscript:x) [v](//evil.example)'), b: t('<b onclick="x">hi</b> & <iframe>'), c: t('`<script>`'),
    d: t('| a | b |\n| :-: | - |\n| `|` | **x** |'), e: t('1. one\n2. two\n\n   three'), f: t('Setext\n===='), g: t('![p](javascript:alert(1))'), h: t('"quotes" & \'single\'') }; });
  ok(!/href=/.test(mdS.a) && /^<p>x y z w v<\/p>$/.test(mdS.a.replace(/\s+/g, ' ').replace(/ <\/p>/, '</p>')), 'links to javascript:, data:, vbscript: and //elsewhere are left as words', mdS.a);
  ok(mdS.b === '<p>&lt;b onclick=&quot;x&quot;&gt;hi&lt;/b&gt; &amp; &lt;iframe&gt;</p>' && mdS.c === '<p><code>&lt;script&gt;</code></p>' && /<img|onerror/.test(mdS.g) === false, 'tags are escaped everywhere, in code too, and a picture cannot carry a script', [mdS.b, mdS.c, mdS.g]);
  ok(/<th style="text-align:center">a<\/th>/.test(mdS.d) && /<td style="text-align:center"><code>\|<\/code><\/td>/.test(mdS.d) && /<ol><li><p>one<\/p><\/li>\s*<li><p>two<\/p>\s*<p>three<\/p><\/li><\/ol>/.test(mdS.e.replace(/\n/g, '')) && /^<h1[^>]*>Setext<\/h1>$/.test(mdS.f),
    'tables with alignment, a loose list, and setext headings', [mdS.d.slice(0, 120), mdS.e.replace(/\n/g, ''), mdS.f]);

  // ---------- the look: night, a phone, a wide display, reduced motion, keys and labels ----------
  await ev(id => { state.fabrica.sel = id; fbRender(); }, id); await p.waitForTimeout(800); await tab('issues');
  // every issue is closed by now, so the closed ones are the list to look at (the choice stays for the phone and the keys below)
  await ev(() => document.querySelector('#fbWorkBody .f-seg button[data-s="closed"]').click()); await wait(() => !!document.querySelector('#hIssList .h-item'));
  await ev(() => document.body.setAttribute('data-theme', 'night')); await p.waitForTimeout(500);
  const night = await ev(() => { const it = document.querySelector('#hIssList .h-item'), bg = getComputedStyle(document.getElementById('fbWork')).backgroundColor; return { bg, item: getComputedStyle(it).backgroundImage.slice(0, 60), ink: getComputedStyle(it.querySelector('.t')).color }; });
  ok(/rgb\(32, 26, 43\)/.test(night.bg) && /rgb\(243, 238, 251\)/.test(night.ink), 'by night the views take Fabrica\'s night tokens', night);
  await p.screenshot({ path: OUT + '/hub-issues-night.png' });
  await tab('compare'); await p.waitForTimeout(500); await p.screenshot({ path: OUT + '/hub-compare-night.png' });
  await tab('code'); await wait(() => !!document.getElementById('hReadme')); await p.screenshot({ path: OUT + '/hub-code-night.png' });
  await tab('insights'); await p.waitForTimeout(600); await p.screenshot({ path: OUT + '/hub-insights-night.png' });
  await ev(() => document.body.setAttribute('data-theme', 'day')); await ev(() => document.body.removeAttribute('data-theme')); await p.waitForTimeout(300);
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(600);
  await ev(() => { fbHubHost.setPanel('work'); }); await p.waitForTimeout(700);
  const inSight = await ev(() => { const vb = document.getElementById('fbViews'), on = vb.querySelector('button[aria-selected="true"]'), a = vb.getBoundingClientRect(), b = on.getBoundingClientRect(); return [on.getAttribute('data-v'), Math.round(b.left - a.left), Math.round(a.right - b.right)]; });
  ok(inSight[1] >= 0 && inSight[2] >= 0, 'on a phone, the chosen tab is in sight in its row once the work shows', inSight);
  await tab('issues'); await p.waitForTimeout(400);
  const phone = await ev(() => ({ doc: document.documentElement.scrollWidth, fb: [document.getElementById('fb').scrollWidth, document.getElementById('fb').clientWidth], work: [document.getElementById('fbWorkBody').scrollWidth, document.getElementById('fbWorkBody').clientWidth], items: document.querySelectorAll('#hIssList .h-item').length }));
  ok(phone.doc <= 392 && phone.fb[0] <= phone.fb[1] + 1 && phone.work[0] <= phone.work[1] + 1 && phone.items > 0, 'on a phone: one panel, nothing wider than the screen', phone);
  await p.screenshot({ path: OUT + '/hub-phone-issues.png' });
  await tab('projects'); await p.waitForTimeout(400);
  const phB = await ev(() => { const c = [...document.querySelectorAll('#hBoard .h-colm')].map(x => Math.round(x.getBoundingClientRect().left)); return { lefts: c, w: [document.getElementById('fbWorkBody').scrollWidth, document.getElementById('fbWorkBody').clientWidth] }; });
  ok(phB.lefts.length === 3 && phB.lefts[0] === phB.lefts[1] && phB.w[0] <= phB.w[1] + 1, 'on a phone the board\'s columns stand one under another', phB);
  await p.screenshot({ path: OUT + '/hub-phone-board.png' });
  await p.setViewportSize({ width: 3440, height: 1440 }); await p.waitForTimeout(700); await tab('compare'); await p.waitForTimeout(500);
  const wide = await ev(() => ({ work: Math.round(document.getElementById('fbWork').getBoundingClientRect().width), over: document.getElementById('fbViews').scrollWidth > document.getElementById('fbViews').clientWidth }));
  ok(wide.work > 1200 && !wide.over, 'on a 3440 display the work is wide and every tab shows at once', wide);
  await p.screenshot({ path: OUT + '/hub-wide-compare.png' });
  await p.setViewportSize({ width: 1600, height: 1000 }); await p.waitForTimeout(500);
  await p.emulateMedia({ reducedMotion: 'reduce' }); await tab('issues'); await p.waitForTimeout(300);
  const rm2 = await ev(() => { const it = document.querySelector('#hIssList .h-item'); return [getComputedStyle(it).animationName, getComputedStyle(it).transitionDuration]; });
  ok(rm2[0] === 'none' && /0\.00001s|1e-05s|0s/.test(rm2[1]), 'with reduced motion nothing rises or glides', rm2);
  await p.emulateMedia({ reducedMotion: 'no-preference' });
  await ev(() => document.querySelector('#fbViews button[data-v="issues"]').focus()); await p.keyboard.press('ArrowRight');
  const kf = await ev(() => { const a = document.activeElement; return [a.getAttribute('data-v'), getComputedStyle(a).outlineStyle]; });
  ok(kf[0] === 'pulls' && kf[1] !== 'none', 'keyboard focus is visible on the tabs', kf);
  const unl = [], dashes = [];
  for (const v of ['code', 'issues', 'pulls', 'compare', 'actions', 'projects', 'wiki', 'insights', 'settings']) {
    await tab(v); await p.waitForTimeout(500);
    unl.push(...(await ev(v => { const out = []; document.querySelectorAll('#fbWork button, #fbWork input, #fbWork select, #fbWork textarea').forEach(e => { if (!e.offsetParent) return; const name = (e.getAttribute('aria-label') || e.textContent || e.placeholder || (e.labels && e.labels[0] && e.labels[0].textContent) || '').trim(); if (!name) out.push(v + ': ' + e.outerHTML.slice(0, 80)); }); return out; }, v)));
    const t = await ev(() => document.getElementById('fbWork').innerText); const m = t.match(/ [-–—] |—|–/g); if (m) dashes.push(v + ': ' + m.length);
  }
  ok(unl.length === 0, 'every control in the nine views has a name for a screen reader', unl);
  ok(dashes.length === 0, 'no dash used as punctuation in what the nine views say', dashes);

  ok(errs.length === 0, 'no errors in the page', errs.slice(0, 5));

  // ---------- in the Forge's copy of Fabrica: its own store, no Chat, Code, Build or model ----------
  // (6.3: on the Forge's own page, forge=<url>; the pass 639 builder this used made the Forge's copy from 6.1's sources)
  const hub = fs.readFileSync(path.join(SRC, 'build', 'modules', 'r141.js'), 'utf8');
  ok(hub.split('var HUBDB="ingenium_hub";').length === 2, 'the hub names its store in one place the Forge\'s build can rename');
  const FORGE = (process.argv.find(a => a.startsWith('forge=')) || '').slice(6);
  if (FORGE) {
    const f = await ctx.newPage(); const ferrs = []; f.on('pageerror', e => ferrs.push(e.message.slice(0, 300)));
    await f.goto(FORGE); await f.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 120000 }); await f.waitForTimeout(1200);
    await f.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await f.waitForTimeout(800);
    await f.evaluate(() => FORGE.openRoom('fabrica')); await f.waitForTimeout(1500);
    const ftab = async v => { await f.evaluate(v => { if (window.fbRooms) { const R = fbRooms.rooms.find(r => r.v.includes(v)); if (R && fbRooms.room() !== R.k) fbRooms.choose(R.k); } }, v); await f.waitForTimeout(200);
      await f.click('#fbViews button[data-v="' + v + '"]'); await f.waitForTimeout(450);
      if (v === 'settings') { await f.evaluate(() => document.querySelectorAll('#fbWorkBody .fr-fold.fr-shut .fr-fh').forEach(h => h.click())); await f.waitForTimeout(150); } };
    const fparts = await f.evaluate(() => ({ p62: (window.__ingParts || {}).p62, ask: typeof window.ingAsk, chat: typeof window.csShow, tabs: [...document.querySelectorAll('#fbViews button[data-v]')].length }));
    ok(fparts.p62 === 'running' && fparts.ask === 'undefined' && fparts.chat === 'undefined' && fparts.tabs === 14, 'in the Forge\'s Fabrica (no Chat, no ingAsk) the hub runs, with its fourteen tabs', fparts);
    const fid = await f.evaluate(async () => { const x = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Forge app</title><p>hi</p>' }, { path: 'README.md', data: '# Forge app\n\nMade in the **Forge**.' }], { name: 'Forge app', msg: 'First version' });
      window.__fbState().sel = x.id; fbRender(); await new Promise(r => setTimeout(r, 900)); return x.id; });
    await ftab('code'); await f.waitForTimeout(300);
    const fcode = await f.evaluate(() => (document.querySelector('#hReadme strong') || {}).textContent);
    await ftab('issues'); await f.click('#hIssNew'); await f.fill('#hIsT', 'A Forge issue'); await f.click('#hIsGo'); await f.waitForTimeout(500);
    await ftab('settings'); await f.click('#hSetStar'); await f.waitForTimeout(700);
    const fst = await f.evaluate(async fid => { const dbs = indexedDB.databases ? (await indexedDB.databases()).map(d => d.name) : []; const got = await new Promise(res => { const rq = indexedDB.open('forge_hub'); rq.onsuccess = () => { const g = rq.result.transaction('apps').objectStore('apps').get(fid); g.onsuccess = () => res(g.result); g.onerror = () => res(null); }; rq.onerror = () => res(null); });
      return { dbs, issue: got && got.issues[0] && got.issues[0].title, stars: (window.__fbState().v61 || {}).hub && window.__fbState().v61.hub.stars }; }, fid);
    ok(fcode === 'Forge' && fst.issue === 'A Forge issue' && fst.dbs.includes('forge_hub') && Array.isArray(fst.stars) && fst.stars.includes(fid), 'there, Code, Issues and a star work, kept in the Forge\'s own store (forge_hub) and its own settings', fst);
    await ftab('compare'); await f.waitForTimeout(400); await f.screenshot({ path: OUT + '/hub-forge-compare.png' });
    await ftab('issues'); await f.waitForTimeout(300); await f.screenshot({ path: OUT + '/hub-forge-issues.png' });
    ok(ferrs.length === 0, 'no errors in the Forge\'s copy', ferrs.slice(0, 4));
  } else console.log('(the Forge\'s copy not checked: give forge=<url of the Forge page>)');

  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself stopped: ' + (e && e.stack || e)); console.log('\n' + pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
