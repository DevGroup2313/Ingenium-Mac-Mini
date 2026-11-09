// The build library on the Folders page (Ingenium 6.65, modules/r258.js, called by modules/r208.js). Her words (8 November 2026):
// "I want all of my apps and how I like to work and how I build them ... to be neatly added into the Folders ... filed and organised
// and always made accessible to me." The library is a zip of Markdown notes, a top folder for each app; she brings it in and it
// stays on the device (IndexedDB "ingenium-buildlib"), never in the page, the saved desk or a repository.
// The library here is invented (the apps Quill and Lantern), made by this test with Python's zipfile.
//   node rig/t_665_buildlib.js <Ingenium page url (master)> <out folder> [absent]
//   With "absent" as the third word the page is another edition: it must not carry the library at all (it names her apps).
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [URL_, OUT, MODE] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_665_buildlib.js <page url> <out folder> [absent]'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true }); const OUTA = path.resolve(OUT);
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; return !!c; };

// the invented library: wrapped by hand as the real notes are, so a list item runs over two lines
const NOTES = {
  'READ ME FIRST.md': '# Your build library\n\nHow your apps were built, filed by app and by part.\n',
  '00 How I build apps.md': '# How I build apps\n\nOne step at a time: plan first, then build, then check.\nA preview comes before anything is restyled.\n',
  'Quill/00 Index.md': '# Quill\n\n- Pages_history.md: the page maker\n- Footnotes_history.md: the footnotes\n',
  'Quill/Pages_history.md': '<!-- From quill/NOTES.md, builds 1 to 12 -->\n# Pages (Quill): its history in the build notes\n\n## At a glance\n\n- Build 12: the page maker keeps the margins a reader set, and the zanzibar ruler\nfollows the paper size chosen, as asked.\n- Build 11: a quicker first page.\n\n```\nline one of the code\nline two of the code\n```\n\n| part | file |\n| --- | --- |\n| ruler | ruler.js |\n',
  'Quill/Footnotes_history.md': '# Footnotes (Quill): its history in the build notes\n\nThe footnotes are saved with the main text, because the autosave lost them.\nZanzibar is named here once.\n',
  'Quill/versions/Quill 1.2 handoff.md': '# Quill 1.2\n\nShipped with the footnotes kept.\n',
  'Quill/versions/Quill 1.10 handoff.md': '# Quill 1.10\n\nThe table writer.\n',
  'Lantern/00 Index.md': '# Lantern\n\nThe reading room.\n',
  'Lantern/Reading_room_history.md': '# Reading room (Lantern)\n\nDarker after sunset.\n',
  '__MACOSX/._junk.md': 'not a note',
  'Quill/picture.png': 'not a note either'
};
const ZIP = path.join(OUTA, 'invented_build_library.zip'); const BAD = path.join(OUTA, 'no_notes.zip'); const NOTZIP = path.join(OUTA, 'not_a_zip.zip');
cp.execFileSync('python3', ['-I', '-c', 'import sys,json,zipfile\nnotes=json.loads(sys.stdin.read())\nz=zipfile.ZipFile(sys.argv[1],"w",zipfile.ZIP_DEFLATED)\n[z.writestr(k,v) for k,v in notes.items()]\nz.close()\nz=zipfile.ZipFile(sys.argv[2],"w");z.writestr("a.txt","no notes here");z.close()\nopen(sys.argv[3],"w").write("plain words, not a zip")', ZIP, BAD, NOTZIP], { input: JSON.stringify(NOTES) });

(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 950 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  const ORIGIN = new URL(URL_).origin; const away = []; p.on('request', (r) => { const u = r.url(); if (!u.startsWith(ORIGIN) && !/^(data|blob|about):/.test(u)) away.push(u.slice(0, 160)); });
  const start = async () => { await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(400);
    await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} window.__toasts = []; const o = window.ingToast; window.ingToast = function (t) { window.__toasts.push(String(t)); return o.apply(this, arguments); }; go('folders'); }); await p.waitForTimeout(600); };
  await start();
  const text = () => p.evaluate(() => (document.getElementById('page-folders') || {}).innerText || '');
  const toasts = () => p.evaluate(() => window.__toasts.join(' | '));
  const give = async (file) => { const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => { const k = [...document.querySelectorAll('#page-folders button')].find(x => /^Bring in (the build library|a newer copy)$/.test(x.textContent.trim())); k.click(); })]); await fc.setFiles(file); };

  if (MODE === 'absent') {
    ok(await p.evaluate(() => typeof window.IngBuildLib === 'undefined'), 'this edition carries no build library');
    ok(!/build library/i.test(await text()), 'and its Folders page does not name one');
    ok(errs.length === 0, 'no page error', errs);
    console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
  }

  // 1. before anything is brought in
  ok(await p.evaluate(() => !!window.IngBuildLib), 'the page carries the build library\'s part');
  let t = await text();
  ok(/Your build library/i.test(t) && /Bring in the build library/.test(t), 'Folders shows Your build library, empty, with its key', t.slice(0, 300));
  ok(/kept on this device/i.test(t), 'and says the notes stay on this device');
  const before = await p.evaluate(() => IngFolders.folders().map(f => f.name));

  // 2. a file that is not a zip, and a zip with no notes: refused with the reason, nothing kept
  await give(NOTZIP); await p.waitForTimeout(900);
  ok(/could not be read: this is not a zip file/.test(await toasts()), 'a file that is not a zip is refused, with the reason', await toasts());
  await give(BAD); await p.waitForTimeout(900);
  ok(/could not be read: the zip holds no notes/.test(await toasts()), 'a zip with no notes is refused, with the reason', await toasts());
  ok((await p.evaluate(() => IngBuildLib.load().then(L => L.notes.length))) === 0, 'nothing was kept from either');

  // 3. the library brought in through its key
  await give(ZIP); await p.waitForFunction(() => /notes kept for/.test(window.__toasts.join(' ')), null, { timeout: 20000 }).catch(() => {}); await p.waitForTimeout(700);
  const ts = await toasts();
  ok(/9 notes kept for 2 apps/.test(ts), 'nine notes are kept for two apps (the picture and the Mac\'s hidden file are left out)', ts);
  const after = await p.evaluate(() => IngFolders.folders().map(f => f.name));
  ok(after.indexOf('Quill') >= 0 && after.indexOf('Lantern') >= 0 && after.length === before.length + 2, 'a folder is made for each app that had none', { before, after });
  t = await text();
  ok(/9 notes for 2 apps, brought in on \d+ \w+ \d{4}/.test(t), 'the card says how many notes, for how many apps, and when', t.slice(0, 400));
  ok(/Quill · 5/.test(t) && /Lantern · 2/.test(t), 'each app is named with its number of notes');
  const top = await p.evaluate(() => [...document.querySelectorAll('#page-folders .bl-row b')].map(x => x.textContent));
  ok(top.join('|') === 'How I build apps|Read me first', 'the notes that belong to no app are listed on the card, How I build apps first', top);

  // 4. kept on the device only: not in the saved desk, and still there after the page is opened again
  const inState = await p.evaluate(() => JSON.stringify(state).indexOf('zanzibar') >= 0);
  ok(!inState, 'the notes are not in the saved desk (they are kept in their own store on the device)');
  await p.screenshot({ path: path.join(OUTA, 'buildlib_home.png') });
  const bk = await p.evaluate(async () => { try { const r = await IngBackup.make({ leave: ['ingenium_apps'] }); const d = r.manifest.stores.find(x => x.db === 'ingenium-buildlib'); return d ? { label: d.label, stores: d.stores.map(s => s.name + ':' + s.count) } : { none: r.manifest.stores.map(x => x.db), out: r.manifest.excluded }; } catch (e) { return { err: String(e && e.message || e) }; } });
  ok(bk && bk.stores && bk.stores.join('|') === 'meta:1|notes:9' && /build library/i.test(bk.label || ''), 'a backup, and what Ingenium Cloud sends, carries the library under its own name (meta 1, notes 9)', bk);
  const round = await p.evaluate(async () => { try { const r = await IngBackup.make({ leave: ['ingenium_apps'] }); const bk = await IngBackup.open(r.blob);
      await new Promise((res, rej) => { const q = indexedDB.deleteDatabase('ingenium-buildlib'); q.onsuccess = res; q.onerror = () => rej(q.error); q.onblocked = res; }); IngBuildLib._reset();
      const gone = (await IngBuildLib.load()).notes.length; await IngBackup.apply(bk, { mode: 'merge', reload: false });
      const L = await IngBuildLib.load(); IngFolders.paint(); return { gone, back: L.notes.length, meta: L.meta && L.meta.count, text: (L.notes.find(n => /Pages_history/.test(n.path)) || {}).text || '' }; } catch (e) { return { err: String(e && e.stack || e) }; } });
  ok(round && round.gone === 0 && round.back === 9 && round.meta === 9 && /zanzibar ruler/.test(round.text), 'taken off the device and brought back from that backup, as Ingenium Cloud brings work in: the nine notes return, seen without opening the page again', round);
  const stl = await p.evaluate(() => { try { return (typeof IngStorage !== 'undefined' && IngStorage.labelOf) ? IngStorage.labelOf('ingenium-buildlib') : null; } catch (e) { return null; } });
  if (stl) ok(/build library/i.test(stl[0]), 'Storage names the store Your build library', stl);

  // 5. the finder on the card: the title first, then how often; a row opens the note at that place
  await p.fill('#page-folders .bl-q', 'zanzibar'); await p.waitForTimeout(500);
  let hits = await p.evaluate(() => [...document.querySelectorAll('#page-folders .bl-hit')].map(x => ({ t: x.querySelector('b').textContent, s: x.querySelector('small').textContent, m: (x.querySelector('mark') || {}).textContent || '' })));
  ok(hits.length === 2 && hits.every(h => /^Quill · 1 time$/.test(h.s)) && hits.every(h => h.m.toLowerCase() === 'zanzibar'), 'looking for a word finds the two notes that hold it, each with its app, how often, and the place marked', hits);
  await p.fill('#page-folders .bl-q', 'footnotes'); await p.waitForTimeout(500);
  hits = await p.evaluate(() => [...document.querySelectorAll('#page-folders .bl-hit')].map(x => x.querySelector('b').textContent));
  ok(hits[0] === 'Footnotes' && hits.length === 3, 'a note named by the word comes first', hits);
  await p.fill('#page-folders .bl-q', 'qqqxyz'); await p.waitForTimeout(500);
  ok(/Nothing in these notes says/.test(await text()), 'a word that is nowhere says so');
  await p.fill('#page-folders .bl-q', 'zanzibar ruler'); await p.waitForTimeout(500);
  await p.evaluate(() => document.querySelector('#page-folders .bl-hit').click()); await p.waitForTimeout(600);
  let rd = await p.evaluate(() => { const box = document.getElementById('modalBox'), r = box.querySelector('.bl-reader'); if (!r) return null; const lis = [...r.querySelectorAll('.bl-text li')].map(x => x.textContent.trim());
    return { open: document.getElementById('modalRoot').classList.contains('open'), h: r.querySelector('h3').textContent, meta: r.querySelector('.bl-meta').textContent, lis, mark: (r.querySelector('.bl-text mark') || {}).textContent || '', code: (r.querySelector('.bl-text pre') || {}).textContent || '', table: !!r.querySelector('.bl-text table'), raw: r.querySelector('.bl-text').textContent.indexOf('<!--') >= 0 }; });
  ok(rd && rd.open && rd.h === 'Pages: its history', 'the row opens the note in the reader, under its part\'s name', rd);
  ok(rd && /Quill · \d+ words · from quill\/NOTES\.md, builds 1 to 12/.test(rd.meta) && !rd.raw, 'the reader names the app, the length and where the note was filed from', rd && rd.meta);
  ok(rd && rd.lis[0] === 'Build 12: the page maker keeps the margins a reader set, and the zanzibar ruler follows the paper size chosen, as asked.' && rd.lis.length === 2, 'a list item wrapped over two lines is read as one item', rd && rd.lis);
  ok(rd && /line one of the code\nline two of the code/.test(rd.code), 'code keeps its own lines', rd && rd.code);
  ok(rd && rd.mark.toLowerCase() === 'zanzibar ruler', 'the words looked for are marked in the note', rd && rd.mark);
  await p.screenshot({ path: path.join(OUTA, 'buildlib_reader.png') });
  await p.evaluate(() => { [...document.querySelectorAll('#modalBox .bl-acts button')].find(x => x.textContent.trim() === 'Close').click(); }); await p.waitForTimeout(400);
  ok(await p.evaluate(() => !document.getElementById('modalRoot').classList.contains('open') && !document.getElementById('modalBox').classList.contains('bl-read')), 'Close closes the reader and leaves the box as it was');

  // 6. the app's own folder: How it was built
  await p.evaluate(() => { const f = IngFolders.folders().find(x => x.name === 'Quill'); state.folders.ui.open = f.id; IngFolders.paint(); });
  // the card is drawn hidden and filled once the notes are read from the device's store (slower when the computer is busy)
  await p.waitForFunction(() => [...document.querySelectorAll('#page-folders h2')].some(h => /^How it was built \(\d+\)$/.test(h.textContent)), null, { timeout: 20000 }).catch(() => {}); await p.waitForTimeout(300);
  const fv = await p.evaluate(() => { const c = [...document.querySelectorAll('#page-folders h2')].find(h => /^How it was built/.test(h.textContent)); if (!c) return null; const card = c.closest('.card') || c.parentElement;
    return { h: c.textContent, subs: [...card.querySelectorAll('.bl-sub')].map(x => x.textContent), rows: [...card.querySelectorAll(':scope > .bl-list .bl-row b')].map(x => x.textContent), groups: [...card.querySelectorAll('details.bl-group')].map(d => ({ s: d.querySelector('summary').textContent, rows: [...d.querySelectorAll('.bl-row b')].map(x => x.textContent) })), find: !!card.querySelector('.bl-q') }; });
  ok(fv && fv.h === 'How it was built (5)', 'Quill\'s folder shows How it was built, with its five notes', fv);
  ok(await p.evaluate(() => { const h = [...document.querySelectorAll('#page-folders h2')].find(x => /^How it was built/.test(x.textContent)); const c = h && (h.closest('.card') || h.parentElement); return !!c && !c.hidden && c.offsetHeight > 0; }), 'and the card is shown');
  ok(fv && fv.subs.join('|') === 'Start here|Its parts, each with its history in the build notes' && fv.rows.join('|') === 'Index|Footnotes|Pages', 'Start here holds its index, then its parts by name', fv);
  ok(fv && fv.groups.length === 1 && /^Versions \(2\)$/.test(fv.groups[0].s) && fv.groups[0].rows.join('|') === 'Quill 1.10 handoff|Quill 1.2 handoff', 'its versions are folded together, the newest first (1.10 before 1.2)', fv && fv.groups);
  ok(fv && fv.find, 'and its notes have their own finder');
  await p.fill('#page-folders .bl-q', 'reading room'); await p.waitForTimeout(500);
  ok(/Nothing in these notes says/.test(await text()), 'the folder\'s finder looks in that app\'s notes only (Lantern\'s words are not found in Quill\'s)');
  await p.screenshot({ path: path.join(OUTA, 'buildlib_folder.png') });
  await p.evaluate(() => { if (!IngFolders.folders().some(x => x.name === 'Abacist')) IngFolders.make('Abacist'); const f = IngFolders.folders().find(x => x.name === 'Abacist'); state.folders.ui.open = f.id; IngFolders.paint(); }); await p.waitForTimeout(700);
  const other = await p.evaluate(() => { const o = state.folders.ui.open; const f = IngFolders.folders().find(x => x.id === o); return { name: f && f.name, has: [...document.querySelectorAll('#page-folders h2')].some(h => /^How it was built/.test(h.textContent)) }; });
  ok(other.name === 'Abacist' && !other.has, 'a folder whose app has no notes shows no such card', other);

  // 7. opened again: the library is still there
  await p.evaluate(() => { state.folders.ui.open = null; saveState(); }); await p.waitForTimeout(300);
  await start(); t = await text();
  ok(/9 notes for 2 apps/.test(t), 'after the page is opened again the library is still on the device', t.slice(0, 300));
  const api = await p.evaluate(() => IngBuildLib.find('sunset').then(r => r.map(x => x.app + '/' + x.title)));
  ok(api.join('|') === 'Lantern/Reading room', 'IngBuildLib.find answers for other parts of the page', api);

  // 8. a newer copy replaces the old one; removing it leaves the folders alone
  await give(ZIP); await p.waitForFunction(() => /notes kept for/.test(window.__toasts.join(' ')), null, { timeout: 20000 }).catch(() => {}); await p.waitForTimeout(600);
  ok((await p.evaluate(() => IngBuildLib.load().then(L => L.notes.length))) === 9 && !/folders made for/.test(await toasts()), 'a newer copy takes the place of the old one, and no folder is made twice', await toasts());
  p.once('dialog', d => d.accept());
  await p.evaluate(() => { [...document.querySelectorAll('#page-folders button')].find(x => x.textContent.trim() === 'Remove it from this device').click(); }); await p.waitForTimeout(900);
  t = await text(); const still = await p.evaluate(() => IngFolders.folders().map(f => f.name));
  ok(/Bring in the build library/.test(t) && (await p.evaluate(() => IngBuildLib.load().then(L => L.notes.length))) === 0, 'Remove it from this device takes the notes away');
  ok(still.indexOf('Quill') >= 0 && still.indexOf('Lantern') >= 0, 'and leaves her folders as they are', still);

  ok(away.length === 0, 'no request left this computer', away);
  ok(errs.length === 0, 'no page error', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.log('FAIL the test stopped: ' + (e && e.stack || e)); process.exit(1); });
