// node rig/t_632_sealed_stores.js <Ingenium page url> <out dir>
// Ingenium 6.32 (6 November 2026): the lock (modules/r197.js) seals the stores that hold bytes: the app library (IndexedDB
// "ingenium_apps", build_page.py's libPut and libText), Fabrica's repositories ("ingenium_repos", modules/r110.js) and the packages
// Fabrica made ("fabrica_made", modules/r112.js). Her words: "I want you to encrypt Ingenium and everything inside of it."
// Invented data only: an invented app page, an invented repository and an invented package, each with a mark to look for.
// Checks, in one profile:
//   - before the lock every record is plain and the marks can be read in the stores;
//   - protection turned on: the lock record says these stores are sealed; every record there is a sealed record of the second kind,
//     no mark can be read in any of them; the parts read them whole (the page, the file, the commit's words, the package's bytes);
//   - what is written while protection is on is sealed; Fabrica's object keeps its kind and size beside it, bound to it (a change to
//     them is refused); the Backup page's two asks work on these stores;
//   - a copy locked before 6.32 (its lock record says nothing of these stores) seals them at its next sign-in;
//   - after a reload and the sign-in everything reads whole; protection turned off writes it all back plain;
//   - every part of the page ran to its end, and no script errors on the page.
// 6.33 (modules/r234.js): Your data and Models and AI show one section at a time; the section that holds the card is opened, as she would open it
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const NAME = 'Example Owner', PW1 = 'harbour-lantern-73';
const PAGE = '<!doctype html><title>Example Ledger</title><p>PAGE-MARK-ONE the ledger of the invented harbour</p>';
const PAGE2 = '<!doctype html><title>Example Ledger</title><p>PAGE-MARK-TWO a second version, kept while protection is on</p>';
const FILE1 = '<p>REPO-MARK-ONE the first page of the invented app</p>', FILE2 = '<p>REPO-MARK-TWO written while protection is on</p>';
const MSG1 = 'First version COMMIT-MARK-ONE', PKG = 'PACKAGE-MARK-ONE the bytes of an invented package', PKG2 = 'PACKAGE-MARK-TWO a package kept while protection is on';
const MARKS = /PAGE-MARK|REPO-MARK|COMMIT-MARK|PACKAGE-MARK|OLD-MARK|Example Ledger|Example Harbour App/;
const LIBID = 'big_t632lib0000a1', LIBID2 = 'big_t632lib0000b2', OLDID = 'big_t632old0000c3', BIGID = 'big_t632big0000d4', BIGMB = 40;
const STORES = [['ingenium_apps', 'b'], ['ingenium_repos', 'o'], ['ingenium_repos', 'r'], ['fabrica_made', 'meta'], ['fabrica_made', 'bytes']];
const waitBoot = (p) => p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
const doorUp = (p) => p.evaluate(() => { const d = document.querySelector('#ingLockDoor'); return !!(d && !d.hidden && d.querySelector('#ildPw')); });
const settle = async (p) => { for (let i = 0; i < 80; i++) { const n = await p.evaluate(() => (window.IngLock && window.IngLock._test.pending()) || 0); if (!n) break; await p.waitForTimeout(100); } await p.waitForTimeout(700); };
// every record of a store as the store holds it: whether it is sealed (and of which kind), and whether a mark can be read in it
// (byte arrays read as text, so a mark inside a page's bytes is found)
const raw = (p, db, store) => p.evaluate(([db, store, marks]) => new Promise((res) => { const re = new RegExp(marks); let rq; try { rq = indexedDB.open(db); } catch (e) { res(null); return; }
  rq.onsuccess = () => { const d = rq.result; if (!d.objectStoreNames.contains(store)) { d.close(); res([]); return; } const t = d.transaction(store, 'readonly'), s = t.objectStore(store), g = s.getAll(), gk = s.getAllKeys();
    t.oncomplete = () => { d.close(); const td = new TextDecoder('utf-8', { fatal: false });
      res(g.result.map((v, i) => { const txt = JSON.stringify(v, (k, x) => (x instanceof Uint8Array ? td.decode(x) : x instanceof ArrayBuffer ? td.decode(new Uint8Array(x)) : x));
        return { k: String(gk.result[i]), sealed: !!(v && v.ing === 'sealed'), kind: v && v.ing === 'sealed' ? v.v : 0, clear: v && v.ing === 'sealed' ? Object.keys(v).filter(f => !['ing', 'v', 'k', 'id', 'iv', 'ct'].includes(f)) : [], mark: re.test(txt) }; })); };
    t.onerror = () => { d.close(); res(null); }; };
  rq.onerror = () => res(null); }), [db, store, MARKS.source]);
const all = async (p) => { const o = {}; for (const [db, st] of STORES) o[db + '/' + st] = await raw(p, db, st); return o; };
async function protect(p) {
  await p.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); if (window.IngSettingsParts) IngSettingsParts.show('data', 'lock'); }); await p.waitForSelector('#ingLockCard', { timeout: 10000 });
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(b => /Protect this copy/.test(b.textContent)).click());
  await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 5000 }); await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW1); await p.fill('#ildP2', PW1); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 10000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map(d => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return [+m[1], +m[2]]; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 300000 });
  const fine = await p.evaluate(() => (document.querySelector('#ingLockDoor .ild-fine') || {}).textContent || '');
  await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(600); return { words, fine };
}
async function signIn(p) {
  await p.reload(); await waitBoot(p); await p.waitForTimeout(800);
  const up = await doorUp(p); await p.fill('#ingLockDoor #ildPw', PW1); await p.click('#ingLockDoor #ildGo');
  await p.waitForFunction(() => window.__ingLocked === false && document.querySelector('#ingLockDoor').hidden, null, { timeout: 60000 }); await p.waitForTimeout(1500); return up;
}
// what the parts read: the library's page, the repository's file and commit, the package's card and bytes
const readAll = (p, ids) => p.evaluate(async (ids) => { const td = new TextDecoder();
  const page = await libText('inkwell'); const file = await IngRepo.readText(ids.repo, 'index.html'); const log = await IngRepo.log(ids.repo, { max: 10 });
  const list = await fbMade.list(ids.repo); const card = list.find(m => m.kind === 'web'); const bytes = card ? await fbMade.bytes(card.key) : null;
  return { page, file, msgs: log.map(c => c.msg || c.message || ''), cards: list.length, name: card && card.name, pkg: bytes ? td.decode(bytes) : null }; }, ids);
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await waitBoot(p); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500);
  // 1. before the lock: an invented page in the library, an invented repository with one commit, an invented package
  const ids = await p.evaluate(async (a) => { const te = new TextEncoder();
    await libPut(a.LIBID, te.encode(a.PAGE), a.PAGE); const L = libState(); L.apps.inkwell = { ref: a.LIBID, version: '9.99', title: 'Example Ledger', size: a.PAGE.length, at: Date.now() }; saveState();
    const r = await IngRepo.create({ name: 'Example Harbour App' }); await IngRepo.put(r.id, 'index.html', a.FILE1); const c = await IngRepo.commit(r.id, a.MSG1);
    const commit = typeof c === 'string' ? c : (c && (c.oid || c.head || c.commit)) || (await IngRepo.head(r.id));
    await fbMade.keep({ id: r.id }, String(commit), 'web', 'example-harbour-app.zip', 'application/zip', te.encode(a.PKG));
    /* a large invented page, as large as an app with its pictures inside: the end of it says where it ends */
    const line = '<p>An invented line of a large page, kept to be sealed whole.</p>\n', n = Math.ceil(a.BIGMB * 1048576 / line.length);
    const big = line.repeat(n) + '<p>BIG-PAGE-END</p>'; await libPut(a.BIGID, te.encode(big), big);
    return { repo: r.id, commit: String(commit), bigLen: te.encode(big).length }; }, { LIBID, PAGE, FILE1, MSG1, PKG, BIGID, BIGMB });
  await p.waitForTimeout(800);
  const r0 = await all(p); const read0 = await readAll(p, ids);
  ok(read0.page === PAGE && read0.file === FILE1 && read0.msgs.some(m => m.includes('COMMIT-MARK-ONE')) && read0.pkg === PKG, 'before the lock: an invented page in the library, an invented repository with one commit and an invented package are kept and read', { ...read0, page: read0.page && read0.page.slice(0, 40) });
  ok(STORES.every(([db, st]) => (r0[db + '/' + st] || []).length && r0[db + '/' + st].every(x => !x.sealed)) && r0['ingenium_apps/b'].some(x => x.mark) && r0['ingenium_repos/o'].some(x => x.mark) && r0['fabrica_made/bytes'].some(x => x.mark),
    'before the lock every record of the five stores is plain, and the marks can be read in them', Object.fromEntries(Object.entries(r0).map(([k, v]) => [k, (v || []).map(x => (x.sealed ? 'S' : 'p') + (x.mark ? '!' : ''))])));
  // 2. protection turned on
  const t0 = Date.now(); const pr = await protect(p); await settle(p); const took = Date.now() - t0;
  const rec = await p.evaluate(() => JSON.parse(localStorage.getItem('ingenium_lock')));
  ok(rec.mig && rec.mig.big === 1 && rec.mig.rec === 1 && rec.mig.more === 1, 'protection turned on: the lock record says the long texts, the other stores and these five are sealed (in ' + Math.round(took / 1000) + ' s, a 40 MB page among them)', rec.mig);
  const r1 = await all(p);
  ok(STORES.every(([db, st]) => (r1[db + '/' + st] || []).length && r1[db + '/' + st].every(x => x.sealed && x.kind === 2)), 'every record of the five stores is now sealed, as bytes (the second kind of sealed record)', Object.fromEntries(Object.entries(r1).map(([k, v]) => [k, (v || []).map(x => x.sealed ? 'S' + x.kind : 'p')])));
  ok(STORES.every(([db, st]) => r1[db + '/' + st].every(x => !x.mark)), 'no mark can be read in any of them: not the page, the file, the commit\'s words, the repository\'s name, the package or its card');
  const clear = [...new Set(r1['ingenium_repos/o'].flatMap(x => x.clear))].sort();
  ok(clear.every(f => ['base', 'd', 'n', 't', 'z'].includes(f)) && clear.includes('t') && clear.includes('n') && r1['ingenium_repos/r'].every(x => !x.clear.length) && r1['ingenium_apps/b'].every(x => !x.clear.length),
    'Fabrica\'s objects keep only their kind, size, depth and base beside the seal; a repository\'s record and a library page keep nothing beside it', clear);
  ok(/Sealed too: your app library, and Fabrica's apps with every version and the packages it made/.test(pr.fine) && !/the app library and Fabrica/.test(pr.fine.split('Not sealed:')[1] || ''), 'the lock\'s account says the library and Fabrica\'s apps and packages are sealed, and no longer lists them as not sealed', pr.fine.slice(0, 300));
  const read1 = await readAll(p, ids);
  ok(read1.page === PAGE && read1.file === FILE1 && read1.msgs.some(m => m.includes('COMMIT-MARK-ONE')) && read1.cards === 1 && read1.name === 'example-harbour-app.zip' && read1.pkg === PKG, 'the parts read the sealed records whole: the library\'s page, the repository\'s file and commit, the package\'s card and bytes', { ...read1, page: read1.page && read1.page.slice(0, 40) });
  const carried = await p.evaluate(async () => { const out = []; for (const k of ['cd', 'forge']) { const m = libState().apps[k]; if (m && m.ref) { const t = await libText(k); out.push({ k, ok: !!t && t.length > 1000 && /<html|<!doctype/i.test(t.slice(0, 3000)) }); } } return out; });
  ok(carried.every(x => x.ok), 'any page Ingenium carries that is already in the library reads whole too (' + (carried.map(x => x.k).join(', ') || 'none placed yet in this new profile') + '; ' + r1['ingenium_apps/b'].length + ' pages sealed there)', carried);
  const bigRead = await p.evaluate(async (a) => { const v = await libTx('readonly', s => s.get(a.BIGID)); const t0 = performance.now(); const u = await libOpen(v); const ms = Math.round(performance.now() - t0);
    const ct = v && v.ct ? (v.ct.byteLength || v.ct.length) : 0; const tail = u ? new TextDecoder().decode(u.subarray(u.length - 40)) : '';
    return { sealed: !!(v && v.ing === 'sealed' && v.v === 2), ct, len: u ? u.length : 0, end: /BIG-PAGE-END/.test(tail), ms }; }, { BIGID });
  ok(bigRead.sealed && bigRead.len === ids.bigLen && bigRead.end && bigRead.ct > ids.bigLen && bigRead.ct < ids.bigLen + 4096,
    'a large page (' + BIGMB + ' MB, invented) is sealed whole with no growth beyond a few bytes (no base64), and opens whole, to its last line, in ' + bigRead.ms + ' ms', { ...bigRead, bigLen: ids.bigLen });
  // 3. written while protection is on: sealed
  await p.evaluate(async (a) => { const te = new TextEncoder(); await libPut(a.LIBID2, te.encode(a.PAGE2), a.PAGE2); await IngRepo.put(a.ids.repo, 'notes.html', a.FILE2); await IngRepo.commit(a.ids.repo, 'Second version COMMIT-MARK-TWO');
    await fbMade.keep({ id: a.ids.repo }, a.ids.commit, 'page', 'example-harbour-app.html', 'text/html', te.encode(a.PKG2)); }, { LIBID2, PAGE2, FILE2, PKG2, ids });
  await settle(p); const r2 = await all(p);
  ok(STORES.every(([db, st]) => r2[db + '/' + st].every(x => x.sealed && !x.mark)) && r2['ingenium_apps/b'].some(x => x.k === LIBID2) && r2['fabrica_made/bytes'].length === 2 && r2['ingenium_repos/o'].length > r1['ingenium_repos/o'].length,
    'what is written while protection is on is sealed: a second page, a second commit and its file, a second package', Object.fromEntries(Object.entries(r2).map(([k, v]) => [k, v.length + ' ' + v.every(x => x.sealed)])));
  const read2 = await p.evaluate(async (a) => ({ f2: await IngRepo.readText(a.ids.repo, 'notes.html'), v2: await libTx('readonly', s => s.get(a.LIBID2)).then(libOpen).then(b => b && new TextDecoder().decode(b)) }), { ids, LIBID2 });
  ok(read2.f2 === FILE2 && read2.v2 === PAGE2, 'and they read whole: the second file, the second page', read2);
  // Fabrica's clean-up with protection on: a version kept against another (a delta, its base named beside the seal) survives it, and
  // every version still reads whole afterwards
  const gc = await p.evaluate(async (a) => { const base = Array.from({ length: 600 }, (_, i) => 'Line ' + i + ' of the invented ledger, kept in two versions.').join('\n');
    await IngRepo.put(a.ids.repo, 'ledger.txt', base); const c1 = await IngRepo.commit(a.ids.repo, 'Ledger, first');
    await IngRepo.put(a.ids.repo, 'ledger.txt', base.replace('Line 300 of', 'Line 300 (changed) of')); const c2 = await IngRepo.commit(a.ids.repo, 'Ledger, second');
    const recs = await new Promise((res) => { const rq = indexedDB.open('ingenium_repos'); rq.onsuccess = () => { const d = rq.result, g = d.transaction('o', 'readonly').objectStore('o').getAll(); g.onsuccess = () => { d.close(); res(g.result); }; }; });
    const deltas = recs.filter(v => v && v.ing === 'sealed' && v.base).length;
    await IngRepo.gc();
    const first = await IngRepo.readText(a.ids.repo, 'ledger.txt', String(c1)), second = await IngRepo.readText(a.ids.repo, 'ledger.txt', String(c2)), f1 = await IngRepo.readText(a.ids.repo, 'index.html');
    return { deltas, first: first === base, second: !!second && second.includes('Line 300 (changed) of') && second.length === base.length + 10, f1: f1 === a.FILE1 }; }, { ids, FILE1 });
  ok(gc.deltas >= 1 && gc.first && gc.second && gc.f1, 'Fabrica\'s clean-up with protection on keeps every version: a version kept against another (its base named beside the seal) and the files before it read whole afterwards', gc);
  // the object's kind and size are bound to it: a change to them is refused
  const bound = await p.evaluate(async () => { const v = await new Promise((res) => { const rq = indexedDB.open('ingenium_repos'); rq.onsuccess = () => { const d = rq.result, g = d.transaction('o', 'readonly').objectStore('o').getAll(); g.onsuccess = () => { d.close(); res(g.result.find(x => x && x.ing === 'sealed' && x.t === 'blob' && !x.base && !x.z)); }; }; }); /* a whole object, kept neither as the change from another nor compressed */
    const good = await IngLock.openRec('ingenium_repos', 'o', v); const bad = await IngLock.openRec('ingenium_repos', 'o', Object.assign({}, v, { n: (v.n || 0) + 1 }));
    const moved = await IngLock.openRec('ingenium_repos', 'o', Object.assign({}, v, { k: 'a'.repeat(40) }));
    return { good: !!(good && good.b instanceof Uint8Array && good.b.length === v.n && good.t === 'blob'), bad: bad === null, moved: moved === null }; });
  ok(bound.good && bound.bad && bound.moved, 'Fabrica\'s object opens whole; one whose size beside it was changed, or that was moved to another name, is refused', bound);
  // the Backup page's two asks
  const bk = await p.evaluate(async (LIBID) => { const recs = await new Promise((res) => { const rq = indexedDB.open('ingenium_apps'); rq.onsuccess = () => { const d = rq.result, s = d.transaction('b', 'readonly').objectStore('b'), g = s.get(LIBID); g.onsuccess = () => { d.close(); res([{ k: LIBID, v: g.result }]); }; }; });
    const sealedBefore = recs[0].v && recs[0].v.ing === 'sealed'; await IngLock.openRecs('ingenium_apps', 'b', recs); const opened = recs[0].v instanceof Uint8Array && new TextDecoder().decode(recs[0].v).includes('PAGE-MARK-ONE');
    const again = await IngLock.sealRecs('ingenium_apps', 'b', recs); const resealed = again[0].v && again[0].v.ing === 'sealed' && again[0].v.v === 2;
    return { sealedBefore, opened, resealed }; }, LIBID);
  ok(bk.sealedBefore && bk.opened && bk.resealed, 'the Backup page\'s two asks work on these stores: a page opened for a plain zip, and sealed again on its way back', bk);
  // 4. a copy locked before 6.32: its lock record says nothing of these stores, and a page there is plain
  await p.evaluate(async (a) => { await new Promise((res) => { const rq = indexedDB.open('ingenium_apps'); rq.onsuccess = () => { const d = rq.result, t = d.transaction('b', 'readwrite'); t.objectStore('b').put(new TextEncoder().encode('<p>OLD-MARK a page kept before 6.32</p>'), a); t.oncomplete = () => { d.close(); res(); }; }; });
    const r = JSON.parse(localStorage.getItem('ingenium_lock')); delete r.mig.more; localStorage.setItem('ingenium_lock', JSON.stringify(r)); }, OLDID);
  const old0 = (await raw(p, 'ingenium_apps', 'b')).find(x => x.k === OLDID);
  // 5. reload and sign in: the plain page is sealed at the sign-in; everything reads whole
  const up = await signIn(p);
  let rec2 = null; for (let i = 0; i < 60; i++) { rec2 = await p.evaluate(() => JSON.parse(localStorage.getItem('ingenium_lock'))); if (rec2.mig && rec2.mig.more === 1) break; await p.waitForTimeout(500); }
  const old1 = (await raw(p, 'ingenium_apps', 'b')).find(x => x.k === OLDID);
  ok(up && old0 && !old0.sealed && old0.mark && rec2.mig.more === 1 && old1 && old1.sealed && !old1.mark, 'a copy locked before 6.32 seals these stores at its next sign-in (a plain page there was sealed, and the lock record says so)', { up, old0, old1, mig: rec2.mig });
  const read3 = await readAll(p, ids);
  ok(read3.page === PAGE && read3.file === FILE1 && read3.msgs.some(m => m.includes('COMMIT-MARK-TWO')) && read3.cards === 2 && read3.pkg === PKG, 'after the sign-in the parts read it all whole again', { ...read3, page: read3.page && read3.page.slice(0, 40) });
  // 6. turn protection off: plain again
  await p.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); if (window.IngSettingsParts) IngSettingsParts.show('data', 'lock'); }); await p.waitForSelector('#ingLockCard', { timeout: 10000 });
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(b => /Turn protection off/.test(b.textContent)).click());
  await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 5000 }); await p.fill('#ingLockDoor #ildPw', PW1); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /Protection is off/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 300000 });
  await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(800);
  const r3 = await all(p);
  ok(STORES.every(([db, st]) => r3[db + '/' + st].length && r3[db + '/' + st].every(x => !x.sealed)) && r3['ingenium_apps/b'].some(x => x.mark) && r3['ingenium_repos/o'].some(x => x.mark) && r3['fabrica_made/bytes'].some(x => x.mark),
    'protection turned off writes every record of the five stores back plain', Object.fromEntries(Object.entries(r3).map(([k, v]) => [k, v.length + ' ' + v.every(x => !x.sealed)])));
  const read4 = await readAll(p, ids);
  ok(read4.page === PAGE && read4.file === FILE1 && read4.pkg === PKG, 'and the parts read them as before', { ...read4, page: read4.page && read4.page.slice(0, 40) });
  const parts = await p.evaluate(() => Object.keys(window.__ingParts).filter(k => window.__ingParts[k] !== 'running'));
  ok(parts.length === 0, 'every part of the page ran to its end', parts);
  ok(errs.length === 0, 'no script errors on the page', errs.join(' | '));
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
