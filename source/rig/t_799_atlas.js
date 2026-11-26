// Ingenium 7.99, r406: Memoria's atlas of what Ingenium knows. node rig/t_799_atlas.js <page url> [picture folder]
// Every fact here is invented for the test.
const pw = require('/opt/node-tools/node_modules/playwright'); const os = require('os'); const path = require('path'); const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const url = process.argv[2]; const pics = process.argv[3] || path.join(os.tmpdir(), 't799');
let ok = 0, bad = 0; const check = (c, m) => { if (c) { ok++; console.log('PASS ' + m); } else { bad++; console.log('FAIL ' + m); } };
(async () => {
  require('fs').mkdirSync(pics, { recursive: true });
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1100 } })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 240)));
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  for (let i = 0; i < 2; i++) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(900); }
  check(await p.evaluate(() => window.__ingParts && window.__ingParts.p406 === 'running' && typeof IngAtlas === 'object'), 'r406 runs and IngAtlas is there');
  await p.evaluate(() => { const K = IngKnow, d = 86400000, n = Date.now(), A = (x) => K.appKey(x); let i = 0;
    const add = (a, t, k, kept, ago) => { const f = K.add(a, t, { k }, kept ? { kept: true } : undefined); if (f) f.at = n - (ago || 0) * d - (i++) * 60000; return f; };
    add('me', 'Writes every morning before noon', 'her', 1, 4);
    add(A('Carpe Diem'), 'Carpe Diem is an app for all devices, not for one system.', 'her', 1, 9);
    add(A('Carpe Diem'), 'The reading room keeps a quiet clock in its corner', 'her', 1, 6);
    add(A('Carpe Diem'), 'A ribbon marks where reading stopped', 'folder', 1, 5);
    add(A('Carpe Diem'), 'Carpe Diem runs from a single file, as an app on Windows', 'folder', 0, 0);
    add(A('Inkwell'), 'Inkwell keeps its drafts in a drawer', 'folder', 0, 0);
    add(A('Inkwell'), 'Inkwell shows a candle while it writes', 'folder', 0, 0);
    add(A('The Forge'), 'The Forge rings a small bell when a piece is done', 'chat', 1, 2);
    go('memoria'); try { IngMemoria.show('knows', true); } catch (e) {} });
  await sleep(2600);
  // its place under the head
  const place = await p.evaluate(() => { const a = document.getElementById('mmAtlas'), kr = document.getElementById('knRoom'), says = document.getElementById('mmSays');
    return { inPanel: !!a && a.parentNode && a.parentNode.id === 'mmPanel', room: a && a.getAttribute('data-mm'), shown: !!a && a.offsetHeight > 400, krHidden: !kr || getComputedStyle(kr).display === 'none', saysHidden: !says || getComputedStyle(says).display === 'none',
      underHead: (() => { const h = document.getElementById('knHead'); return !!(h && a && h.getBoundingClientRect().bottom <= a.getBoundingClientRect().top); })() }; });
  check(place.inPanel && place.room === 'knows' && place.shown, 'the atlas stands in Memoria\'s What it knows room');
  check(place.underHead, 'it is under Memoria\'s head');
  check(place.krHidden && place.saysHidden, 'r390\'s old room card and the room line are not shown in What it knows');
  const meds = await p.evaluate(() => ({ n: document.querySelectorAll('#mmAtlas .mmb-med').length, apps: IngFolders.folders().length, wait: (document.querySelector('#mmAtlas .mmb-med[data-k="wait"] b') || {}).textContent, waiting: IngKnow.waiting().length, find: !!document.getElementById('mmbFind') }));
  check(meds.n === meds.apps + 2, 'one medallion for Waiting, one for her and one for each app (' + meds.n + ')');
  check(meds.wait === String(meds.waiting) && meds.waiting === 3, 'the Waiting medallion shows how many wait (' + meds.wait + ')');
  check(meds.find, 'Find a fact on every plate is at the end of the row');
  // an app's plate
  await p.evaluate(() => IngAtlas.open(IngKnow.appKey('Carpe Diem'))); await sleep(700);
  const cd = await p.evaluate(() => ({ title: document.querySelector('#mmAtlas .mmb-ph h3').textContent, stars: document.querySelectorAll('#mmAtlas .mmb-s').length, keys: document.querySelectorAll('#mmAtlas .mmb-list li').length, sel: (document.querySelector('#mmAtlas .mmb-med[aria-selected="true"]') || {}).getAttribute && document.querySelector('#mmAtlas .mmb-med[aria-selected="true"]').getAttribute('data-k'), first: document.querySelector('#mmAtlas .mmb-ft') && document.querySelector('#mmAtlas .mmb-ft').textContent }));
  check(cd.title === 'Carpe Diem' && cd.stars === 4 && cd.keys === 4, 'Carpe Diem\'s plate: its name, four stars on the chart and four in the key');
  check(/Carpe Diem is an app for all devices|reading room/.test(cd.first || ''), 'her own words come first on the plate');
  await p.screenshot({ path: path.join(pics, '1_plate_day.png') });
  // pressing a star chooses it
  await p.evaluate(() => { const g = [...document.querySelectorAll('#mmAtlas .mmb-s')].find((x) => /ribbon/.test(x.getAttribute('aria-label'))); g.dispatchEvent(new MouseEvent('click', { bubbles: true })); }); await sleep(400);
  check(await p.evaluate(() => /ribbon marks/.test(document.querySelector('#mmAtlas .mmb-ft').textContent) && !!document.querySelector('#mmAtlas .mmb-list li.on')), 'pressing a star reads it large, and marks it in the key');
  // uses this week, counted from the replies
  await p.evaluate(() => { const f = IngKnow.store().facts.find((x) => /ribbon marks/.test(x.t)); const n = Date.now(); state.chats = state.chats || [];
    state.chats.push({ id: 'c' + (n - 5000).toString(36), title: 'Test one', messages: [{ role: 'me', text: 'a', at: n - 5000 }, { role: 'bot', text: 'b', at: n - 4000, done: n - 4000, know: [f.id] }] });
    state.chats.push({ id: 'c' + (n - 9000).toString(36), title: 'Test two', messages: [{ role: 'bot', text: 'c', at: n - 3000, done: n - 3000, knowF: [f.id] }] });
    state.chats.push({ id: 'c' + (n - 30 * 864e5).toString(36), title: 'Old', messages: [{ role: 'bot', text: 'd', at: n - 30 * 864e5, done: n - 30 * 864e5, know: [f.id] }] });
    IngAtlas.paint(); }); await sleep(300);
  check(await p.evaluate(() => /Used in 2 chats this week/.test(document.querySelector('#mmAtlas .mmb-fm').textContent)), 'it says how many chats used it this week, from the replies themselves (the older one is not counted)');
  // leave out: kept, shown dimmed, given to no model
  await p.evaluate(() => { [...document.querySelectorAll('#mmAtlas .mmb-w')].find((x) => x.textContent === 'Leave out').click(); }); await sleep(400);
  const lo = await p.evaluate(() => { const f = IngKnow.store().facts.find((x) => /ribbon marks/.test(x.t)); const fit = IngKnow.fit('Where does the ribbon mark reading in Carpe Diem', 1600).map((x) => x.id);
    const lines = IngFolderFab.lines({ name: 'Carpe Diem' }) || ''; return { off: f.off === true, st: f.st, inFit: fit.indexOf(f.id) >= 0, inLines: /ribbon marks/.test(lines), dim: !!document.querySelector('#mmAtlas .mmb-s.off'), again: [...document.querySelectorAll('#mmAtlas .mmb-w')].some((x) => x.textContent === 'Use it again'), say: document.querySelector('#mmAtlas .mmb-fm').textContent }; });
  check(lo.off && lo.st === 'kept' && lo.dim, 'Leave out keeps the fact on its plate, dimmed');
  check(!lo.inFit && !lo.inLines, 'a fact left out is given to no chat: not with what fits a question, not with its folder');
  check(lo.again && /no model is given it/.test(lo.say), 'it says so, and Use it again is there');
  await p.evaluate(() => { [...document.querySelectorAll('#mmAtlas .mmb-w')].find((x) => x.textContent === 'Use it again').click(); }); await sleep(300);
  check(await p.evaluate(() => { const f = IngKnow.store().facts.find((x) => /ribbon marks/.test(x.t)); return !f.off && IngKnow.fit('Where does the ribbon mark reading in Carpe Diem', 1600).some((x) => x.id === f.id); }), 'Use it again gives it to chats once more');
  // edit
  await p.evaluate(() => { [...document.querySelectorAll('#mmAtlas .mmb-w')].find((x) => x.textContent === 'Edit').click(); }); await sleep(300);
  await p.fill('#mmbEdit', 'A silk ribbon marks where reading stopped'); await p.evaluate(() => [...document.querySelectorAll('#mmAtlas .mmb-key2')].find((x) => x.textContent === 'Save it').click()); await sleep(400);
  check(await p.evaluate(() => { const f = IngKnow.store().facts.find((x) => /silk ribbon/.test(x.t)); return !!f && f.src.k === 'her'; }), 'Edit changes the fact, and it becomes her own words');
  // add a fact
  await p.evaluate(() => [...document.querySelectorAll('#mmAtlas .mmb-key2')].find((x) => /Add a fact/.test(x.textContent)).click()); await sleep(300);
  check(await p.evaluate(() => !!document.getElementById('mmbAdd')), 'Add a fact opens a place to write it');
  await p.screenshot({ path: path.join(pics, '2_add.png') });
  await p.fill('#mmbAdd', 'Its shelves hold one book for each season'); await p.evaluate(() => [...document.querySelectorAll('#mmAtlas .mmb-key2')].find((x) => /Add it/.test(x.textContent)).click()); await sleep(400);
  check(await p.evaluate(() => { const f = IngKnow.store().facts.find((x) => /one book for each season/.test(x.t)); return !!f && f.st === 'kept' && f.src.k === 'her' && f.about === IngKnow.appKey('Carpe Diem') && /one book for each season/.test(document.querySelector('#mmAtlas .mmb-ft').textContent); }), 'the new fact is on the plate, in her own words, and read large');
  // the waiting plate
  await p.evaluate(() => [...document.querySelectorAll('#mmAtlas .mmb-med')].find((x) => x.getAttribute('data-k') === 'wait').click()); await sleep(800);
  const wp = await p.evaluate(() => ({ title: document.querySelector('#mmAtlas .mmb-ph h3').textContent, hollow: document.querySelectorAll('#mmAtlas .mmb-s circle.core').length, pair: !!document.querySelector('#mmAtlas .mmb-pair'), all: [...document.querySelectorAll('#mmAtlas .mmb-key2')].some((x) => /Keep all that agree/.test(x.textContent)) }));
  check(wp.title === 'Waiting for you' && wp.hollow === 3, 'the Waiting plate: what waits are hollow stars');
  check(wp.pair, 'a fact that disagrees with her words is shown beside them');
  check(wp.all, 'Keep all that agree is at the plate\'s foot');
  await p.screenshot({ path: path.join(pics, '3_waiting.png') });
  // the disagreement: keep mine
  await p.evaluate(() => [...document.querySelectorAll('#mmAtlas .mmb-key2')].find((x) => x.textContent === 'Keep mine').click()); await sleep(400);
  check(await p.evaluate(() => { const F = IngKnow.store().facts; return !F.some((x) => /single file, as an app on Windows/.test(x.t)) && F.some((x) => /for all devices/.test(x.t) && x.st === 'kept'); }), 'Keep mine: her words stay and the other is let go');
  // keep and not this
  await p.evaluate(() => { const f = IngKnow.store().facts.find((x) => /drafts in a drawer/.test(x.t)); IngAtlas.focus(f.id); }); await sleep(200);
  await p.evaluate(() => [...document.querySelectorAll('#mmAtlas .mmb-key2')].find((x) => /^Keep$/.test(x.textContent.trim())).click()); await sleep(300);
  check(await p.evaluate(() => IngKnow.store().facts.find((x) => /drafts in a drawer/.test(x.t)).st === 'kept'), 'Keep keeps what waited');
  await p.evaluate(() => { const f = IngKnow.store().facts.find((x) => /candle/.test(x.t)); IngAtlas.focus(f.id); }); await sleep(200);
  await p.evaluate(() => [...document.querySelectorAll('#mmAtlas .mmb-w')].find((x) => x.textContent === 'Not this').click()); await sleep(300);
  check(await p.evaluate(() => !IngKnow.store().facts.some((x) => /candle/.test(x.t))), 'Not this lets it go');
  // the other two answers to a disagreement
  await p.evaluate(() => { IngKnow.add(IngKnow.appKey('Carpe Diem'), 'Carpe Diem is made only for the iPhone', { k: 'folder' }); }); await sleep(200);
  await p.evaluate(() => IngAtlas.open('wait')); await sleep(400);
  await p.evaluate(() => [...document.querySelectorAll('#mmAtlas .mmb-key2')].find((x) => x.textContent === 'Keep the new one').click()); await sleep(400);
  check(await p.evaluate(() => { const F = IngKnow.store().facts; return F.some((x) => /only for the iPhone/.test(x.t) && x.st === 'kept') && !F.some((x) => /for all devices/.test(x.t)); }), 'Keep the new one keeps it in place of her words');
  // find
  await p.fill('#mmbFind', 'ribbon'); await sleep(500);
  check(await p.evaluate(() => /Found on every plate/.test(document.querySelector('#mmAtlas .mmb-pno').textContent) && document.querySelectorAll('#mmAtlas .mmb-s').length === 1), 'Find a fact finds it on every plate');
  await p.evaluate(() => { const i = document.getElementById('mmbFind'); i.value = ''; i.dispatchEvent(new Event('input', { bubbles: true })); }); await sleep(300);
  // never kept
  const nv = await p.evaluate(() => ({ chat: IngKnow.add('me', 'My API key is sk-abcdefghijklmnop', { k: 'chat' }), folder: IngKnow.add(IngKnow.appKey('Inkwell'), 'The password for the test site is hunter', { k: 'folder' }), her: !!IngKnow.add('me', 'I never write my password down', { k: 'her' }) }));
  check(nv.chat === null && nv.folder === null, 'a password or a key from a chat or a folder is never kept');
  check(nv.her, 'her own words are kept as she wrote them');
  // which models may read it
  const rd = await p.evaluate(() => { state.models.push({ id: 'pv-r', name: 'Test model', customName: 'Lumen', fileName: 'test.gguf', fileState: 'ready', type: 'GGUF' }); const prev = state.activeModelId; state.activeModelId = 'pv-r';
    IngAtlas.readers()['pv-r'] = false; const off = { allowed: IngAtlas.allowed(), mem: memLayer(6000), outer: !!(window.memLayer && window.memLayer.__r406), lines: IngFolderFab.lines({ name: 'Carpe Diem' }) || '' };
    IngAtlas.readers()['pv-r'] = true; const on = { allowed: IngAtlas.allowed(), lines: IngFolderFab.lines({ name: 'Carpe Diem' }) || '' }; state.activeModelId = prev; return { off, on }; });
  check(rd.off.outer && rd.off.allowed === false && rd.off.mem === '' && !/What Ingenium knows about/.test(rd.off.lines), 'a model she turns off is given no memory and no fact');
  check(rd.on.allowed === true && /What Ingenium knows about Carpe Diem/.test(rd.on.lines), 'a model she lets read is given them again');
  // the back of the plate
  await p.evaluate(() => IngAtlas.open('me')); await sleep(400);
  await p.evaluate(() => [...document.querySelectorAll('#mmAtlas .mmb-key2')].find((x) => /How it is kept/.test(x.textContent)).click()); await sleep(900);
  const bk = await p.evaluate(() => ({ mode: IngAtlas.mode(), title: (document.querySelector('#mmAtlas .mmb-ph h3') || {}).textContent, sw: document.querySelectorAll('#mmAtlas .mmb-sw').length, never: document.querySelectorAll('#mmAtlas .mmb-never li').length, models: state.models.filter((m) => m.fileState === 'ready').length }));
  check(bk.mode === 'back' && bk.title === 'How it is kept', 'How it is kept turns the plate over');
  check(bk.sw === 3 + bk.models && bk.never >= 4, 'its back: three switches, a switch for each model, and what is never kept');
  await p.screenshot({ path: path.join(pics, '4_back.png') });
  await p.evaluate(() => document.querySelectorAll('#mmAtlas .mmb-sw')[1].click()); await sleep(200);
  check(await p.evaluate(() => IngKnow.store().opts.ask === false), 'a switch on its back changes how it is kept');
  await p.evaluate(() => document.querySelectorAll('#mmAtlas .mmb-sw')[1].click()); await sleep(200);
  await p.evaluate(() => [...document.querySelectorAll('#mmAtlas .mmb-key2')].find((x) => /Back to the plate/.test(x.textContent)).click()); await sleep(900);
  check(await p.evaluate(() => IngAtlas.mode() === 'front' && !!document.querySelector('#mmAtlas .mmb-chart')), 'Back to the plate turns it back');
  // the head's keys and stars
  await p.evaluate(() => { window.scrollTo(0, 0); const b = [...document.querySelectorAll('#knHead .kh-keys button')].find((x) => x.textContent.trim() === 'Waiting for you'); if (b) b.click(); }); await sleep(900);
  check(await p.evaluate(() => IngAtlas.plate() === 'wait'), 'the head\'s Waiting for you opens the Waiting plate');
  await p.evaluate(() => IngKnow.open(IngKnow.appKey('The Forge'))); await sleep(1400);
  check(await p.evaluate(() => IngAtlas.plate() === IngKnow.appKey('The Forge') && document.querySelector('#mmAtlas .mmb-ph h3').textContent === 'The Forge'), 'a star pressed in the head opens that app\'s plate');
  // keys on the medallions
  await p.evaluate(() => document.querySelector('#mmAtlas .mmb-med[aria-selected="true"]').focus()); await p.keyboard.press('ArrowRight'); await sleep(400);
  check(await p.evaluate(() => IngAtlas.plate() !== IngKnow.appKey('The Forge')), 'the arrow keys move from plate to plate');
  // night
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); IngAtlas.open(IngKnow.appKey('Carpe Diem')); }); await sleep(900);
  check(await p.evaluate(() => getComputedStyle(document.getElementById('mmAtlas')).getPropertyValue('--b-p0').trim() === '#1c1530'), 'by night the plate is deep indigo');
  await p.screenshot({ path: path.join(pics, '5_night.png') });
  await p.evaluate(() => document.body.removeAttribute('data-theme')); await sleep(300);
  // minimal motion
  await p.evaluate(() => { document.body.setAttribute('data-motion', 'minimal'); IngAtlas.open('me'); }); await sleep(400);
  check(await p.evaluate(() => getComputedStyle(document.querySelector('#mmAtlas .mmb-plate')).animationName === 'none'), 'Minimal motion keeps the plate still');
  await p.evaluate(() => document.body.removeAttribute('data-motion'));
  // a narrow window
  await p.setViewportSize({ width: 420, height: 900 }); await sleep(600);
  check(await p.evaluate(() => { const a = document.getElementById('mmAtlas'); return a.scrollWidth <= a.clientWidth + 2 && document.querySelector('#mmAtlas .mmb-chart').getBoundingClientRect().width <= a.clientWidth; }), 'in a narrow window nothing runs past the edge');
  check(errs.length === 0, 'no page error' + (errs.length ? ': ' + errs.join(' | ') : ''));
  console.log(ok + ' passed, ' + bad + ' failed'); await b.close(); process.exit(bad ? 1 : 0);
})();
