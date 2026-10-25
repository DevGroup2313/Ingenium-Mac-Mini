// Ingenium 6.1 · Storage, its limits and its errors (modules/r142.js), in Chromium:
// Settings, Storage measures every store (real sizes, and what the browser counts and offers), keeps the limit the owner
// sets, warns calmly at 80 % and 95 %, asks for persistent storage and shows the answer; the app library keeps each
// version, the owner can mark one Keep always; Clean the library shows the exact list and removes exactly that in one
// press; old copies go on their own when the limit is near, keeping the newest N; stored texts are removed only when
// nothing names them (chats, Lector's documents and readings, Code, Ask Lector's versions, the recovery shelf, every other
// store); IngErr.say explains a full store (a simulated full disk, caught inside IndexedDB writes), a damaged zip of each
// kind (not a zip, cut short, wrong check sum, unknown packing, broken data, locked) through the real import paths, and a
// missing part; nothing the owner made is ever removed.
//   node rig/t_61_storage.js http://127.0.0.1:8202/ingenium.html <out folder> [axe.min.js]
// (a page beside it named ingenium_no142.html, the same page without modules/r142.js, adds the time-to-ready comparison)
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const zlib = require('zlib');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
// axe-core's axe.min.js: the third argument, or AXE_JS, or rig/a11y/axe.min.js; without it the axe checks are left out (a NOTE says so)
const AXE = [process.argv[4], process.env.AXE_JS, path.join(__dirname, 'a11y', 'axe.min.js')].find(f => f && fs.existsSync(f)) || null;
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
const shot = (p, n, o) => p.screenshot(Object.assign({ path: path.join(OUT, n + '.png') }, o || {}));
const ORIGIN = new URL(URL_).origin;

// ---------- zips made here, each damaged in its own way ----------
function crc32(buf) { if (!crc32.t) crc32.t = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  let c = 0xFFFFFFFF; for (const b of buf) c = crc32.t[(c ^ b) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function makeZip(files) { const parts = [], cds = []; let off = 0;
  for (const f of files) { const name = Buffer.from(f.name), data = Buffer.from(f.data), crc = crc32(data), body = f.deflate ? zlib.deflateRawSync(data) : data, meth = f.deflate ? 8 : 0;
    const lh = Buffer.alloc(30); lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x800, 6); lh.writeUInt16LE(meth, 8); lh.writeUInt16LE(0, 10); lh.writeUInt16LE(0x21, 12);
    lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(body.length, 18); lh.writeUInt32LE(data.length, 22); lh.writeUInt16LE(name.length, 26); lh.writeUInt16LE(0, 28);
    const cd = Buffer.alloc(46); cd.writeUInt32LE(0x02014b50, 0); cd.writeUInt16LE(20, 4); cd.writeUInt16LE(20, 6); cd.writeUInt16LE(0x800, 8); cd.writeUInt16LE(meth, 10); cd.writeUInt16LE(0, 12); cd.writeUInt16LE(0x21, 14);
    cd.writeUInt32LE(crc, 16); cd.writeUInt32LE(body.length, 20); cd.writeUInt32LE(data.length, 24); cd.writeUInt16LE(name.length, 28); cd.writeUInt32LE(off, 42);
    f.lho = off; f.dataAt = off + 30 + name.length; f.clen = body.length; parts.push(lh, name, body); off += 30 + name.length + body.length; f.cdAt = null; cds.push([cd, name, f]); }
  let cdo = off; const cdParts = []; for (const [cd, name, f] of cds) { f.cdAt = cdo; cdParts.push(cd, name); cdo += 46 + name.length; }
  const cdb = Buffer.concat(cdParts), eo = Buffer.alloc(22); eo.writeUInt32LE(0x06054b50, 0); eo.writeUInt16LE(files.length, 8); eo.writeUInt16LE(files.length, 10); eo.writeUInt32LE(cdb.length, 12); eo.writeUInt32LE(off, 16);
  return Buffer.concat([...parts, cdb, eo]); }
const pageHtml = (title, extra) => `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title></head><body><h1>${title}</h1><script src="app.js"></script>${extra || ''}<p>${'Lorem ipsum dolor sit amet. '.repeat(160)}</p></body></html>`;
function zips() {
  const mk = () => [{ name: 'index.html', data: pageHtml('Lumen'), deflate: true }, { name: 'app.js', data: 'console.log("Lumen");\n'.repeat(200), deflate: false }, { name: 'style.css', data: 'body{color:#222}\n'.repeat(120), deflate: true }];
  const good = makeZip(mk());
  const cut = good.subarray(0, Math.floor(good.length * 0.6));
  const f1 = mk(); const crcBad = makeZip(f1); crcBad[f1[1].dataAt + 7] ^= 0x5a;                     // a byte of app.js (stored) changed
  const f2 = mk(); const meth = makeZip(f2); meth.writeUInt16LE(12, f2[0].lho + 8); meth.writeUInt16LE(12, f2[0].cdAt + 10);   // index.html said to be bzip2
  const f3 = mk(); const broken = makeZip(f3); for (let i = 0; i < 24; i++) broken[f3[2].dataAt + 2 + i] = 0xff;                // style.css's packed data spoilt
  const f4 = mk(); const locked = makeZip(f4); locked.writeUInt16LE(0x801, f4[1].lho + 6); locked.writeUInt16LE(0x801, f4[1].cdAt + 8);
  const notzip = Buffer.from(pageHtml('Not a zip at all'));
  const docxCut = makeZip([{ name: '[Content_Types].xml', data: '<?xml version="1.0"?><Types/>', deflate: true }, { name: 'word/document.xml', data: '<w:document><w:body><w:p><w:r><w:t>' + 'Hello there. '.repeat(400) + '</w:t></w:r></w:p></w:body></w:document>', deflate: true }]);
  return { good, cut, crcBad, meth, broken, locked, notzip, docxCut: docxCut.subarray(0, Math.floor(docxCut.length * 0.7)) };
}
const b64 = b => Buffer.from(b).toString('base64');

async function ready(p) { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(500);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(600); }
async function timeToReady(b, url) { const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const t0 = Date.now(); await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); const ms = Date.now() - t0; await p.close(); return ms; }
async function axe(p, include) { if (!AXE) return null; await p.addScriptTag({ path: AXE });
  return p.evaluate(async (inc) => { const r = await axe.run({ include: inc.map(s => [s]) }, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes: ['violations'] });
    return r.violations.map(v => ({ id: v.id, n: v.nodes.length, t: v.nodes.slice(0, 3).map(n => n.target.join(' ')), why: (v.nodes[0] && v.nodes[0].failureSummary || '').slice(0, 200) })); }, include); }

// in the page: helpers for the stores
const PAGE_HELPERS = () => {
  window.__t = {
    steady: async () => { let a = (await navigator.storage.estimate()).usage; for (let i = 0; i < 12; i++) { await new Promise(z => setTimeout(z, 250)); const b = (await navigator.storage.estimate()).usage; if (b === a) return b; a = b; } return a; },
    u8: (s) => Uint8Array.from(atob(s), c => c.charCodeAt(0)),
    rnd: (n) => { const u = new Uint8Array(n); for (let i = 0; i < n; i += 65536) crypto.getRandomValues(u.subarray(i, Math.min(n, i + 65536))); return u; },
    oldId: (daysAgo, tag) => 'big_' + (Date.now() - daysAgo * 86400000).toString(36) + (tag + 'zzzzzz').slice(0, 6),
    open: (name, ver, up) => new Promise((res, rej) => { const rq = ver ? indexedDB.open(name, ver) : indexedDB.open(name); rq.onupgradeneeded = () => up && up(rq.result); rq.onsuccess = () => res(rq.result); rq.onerror = () => rej(rq.error); }),
    keys: async (db, st) => { const names = (await indexedDB.databases()).map(x => x.name); if (names.indexOf(db) < 0) return []; const d = await __t.open(db); if (!d.objectStoreNames.contains(st)) { d.close(); return []; }
      return new Promise(res => { const t = d.transaction(st, 'readonly'), r = t.objectStore(st).getAllKeys(); t.oncomplete = () => { d.close(); res(r.result); }; }); },
    put: async (db, st, key, val) => { const d = await __t.open(db); return new Promise((res, rej) => { const t = d.transaction(st, 'readwrite'); t.objectStore(st).put(val, key); t.oncomplete = () => { d.close(); res(true); }; t.onabort = () => { d.close(); rej(t.error); }; }); },
    keep: async (key, title, version, n) => { const u = __t.rnd(n); const h = await AppLib.sha(u); const r = await libKeep(key, { title, version, build: '', date: '', size: u.length, sha256: h, name: key + '.html', source: 'file' }, u, ''); return { r, h, ref: libState().apps[key].ref }; },
    chain: (key) => IngStore.versions(key).map(v => ({ v: v.version, ref: v.ref, pin: !!v.pin })),
    noteText: () => { const n = document.getElementById('stxNote'); return n ? { role: n.getAttribute('role'), cls: n.className, t: n.textContent, on: n.classList.contains('on') } : null; },
  };
};

(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const Z = zips();

  // ================= 0 · the start =================
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]));
  await p.goto(URL_); await ready(p); await p.evaluate(PAGE_HELPERS);
  const s0 = await p.evaluate(() => ({ part: window.__ingParts && window.__ingParts.p63, api: !!(window.IngStore && IngStore.plan && IngStore.clean && IngStore.measure && IngStore.status), err: !!(window.IngErr && IngErr.say && IngErr.zip),
    wired: { libKeep: !!libKeep.__r142, libFromZip: !!libFromZip.__r142, toast: !!ingToast.__r142, docx: !!docxText.__r142, repo: !!(IngRepo.importAny && IngRepo.importAny.__r142z), gc: !!IngBig.gc.__r142, tx: !!IDBDatabase.prototype.transaction.__r142 },
    noCardYet: !document.getElementById('stxCard') }));
  ok(s0.part === 'running' && s0.api && s0.err, 'the module runs (part p63) and gives window.IngStore and window.IngErr', s0);
  ok(Object.values(s0.wired).every(Boolean), 'it is wired where storage and errors reach the owner: the library, the toast, Word documents, Fabrica, the stores, every IndexedDB write', s0.wired);
  ok(s0.noCardYet, 'nothing heavy at start: the Storage section is drawn only when Settings opens');
  // the base's own sweep (R81, 90 s after start) is held back here so that the test sees only what this module removes;
  // the apps Ingenium carries inside it (R120) are kept first, as they are a few seconds after every start, so they never land mid-test
  await p.evaluate(async () => { window.__gcWrapped = IngBig.gc; IngBig.gc = () => Promise.resolve(); if (window.IngBuiltin) await IngBuiltin.seed(); });
  const builtin = await p.evaluate(() => ({ cd: __t.chain('cd').map(x => x.v), inkwell: __t.chain('inkwell').map(x => x.v), forge: __t.chain('forge').map(x => x.v), ingenium: __t.chain('ingenium').map(x => x.v) }));
  console.log('NOTE the library before the test, from inside Ingenium:', JSON.stringify(builtin));

  // ================= 1 · Settings, Storage =================
  await p.evaluate(() => go('settings')); await p.waitForTimeout(500);
  await p.evaluate(() => document.getElementById('stxCard').scrollIntoView()); await p.waitForTimeout(400);
  // measuring 88 MB of stores takes about a second; a busy machine may take longer, so the test waits for it to be done
  await p.waitForFunction(() => { const m = document.getElementById('stxMeasured'); return !!(m && m.textContent.trim()); }, null, { timeout: 30000 }).catch(() => { });
  const s1 = await p.evaluate(async () => { const c = document.getElementById('stxCard'); const dbs = (await indexedDB.databases()).map(x => x.name);
    return { place: c.nextElementSibling && c.nextElementSibling.querySelector('h2').textContent, h: c.querySelector('h2').textContent, role: c.getAttribute('aria-labelledby'),
      used: document.getElementById('stxUsed').textContent, of: document.getElementById('stxOf').textContent, rows: [...document.querySelectorAll('#stxKinds li')].map(l => l.getAttribute('data-db')),
      dbs, measured: document.getElementById('stxMeasured').textContent, persist: document.getElementById('stxPersist').textContent, kept: document.getElementById('stxPersistRow').getAttribute('data-kept'),
      r132: getComputedStyle(document.getElementById('r132Room') || document.body).display, meter: document.getElementById('stxMeter').getAttribute('aria-valuetext') }; });
  ok(s1.h === 'Storage' && s1.place === 'Data on this device', 'Settings has a Storage section, just before Data on this device', s1.place);
  ok(s1.dbs.every(d => s1.rows.indexOf(d) >= 0) && s1.rows.indexOf('localStorage') >= 0, 'every store on this device is listed, and the desk', { rows: s1.rows, dbs: s1.dbs });
  ok(/The browser counts .* for Ingenium in all, and gives it up to .* here/.test(s1.measured) && /of .*(the room the browser gives|the limit you set)/.test(s1.of), "the browser's own count and offer (navigator.storage.estimate) are shown", s1.measured);
  ok(/Kept for good|Not kept for good yet|does not say/.test(s1.persist) && (/Asked on/.test(s1.persist) || s1.kept === 'yes'), 'persistent storage was requested and its answer is shown', s1.persist);
  ok(s1.r132 === 'none', "the older room line in Data on this device gives way to the Storage section", s1.r132);
  await shot(p, 's1-storage-day', { fullPage: false });

  // 6.2: every section from here on is built on the app library (its versions, Keep always, what goes on its own), which
  // only the master edition keeps; in another edition the cleaning of stored texts and packages is checked by t_62_editions.js
  if (!(await p.evaluate(() => typeof libOn !== 'function' || libOn()))) {
    const none = await p.evaluate(() => (document.getElementById('stxApps') || {}).textContent || '');
    ok(/This edition keeps no app library/.test(none), 'this edition keeps no app library, and says so where its versions would be', none.slice(0, 120));
    console.log('NOTE the ' + (await p.evaluate(() => ING_EDITION)) + ' edition keeps no app library: the library\'s sections are checked in the master edition');
    console.log(`\n${pass} passed, ${fail} failed`); await b.close(); process.exit(fail ? 1 : 0);
  }
  // ================= 2 · the owner's work, the library's versions, Fabrica's packages, orphans =================
  const seed = await p.evaluate(async () => {
    const T = __t, O = {};
    // the library: Carpe Diem in five versions, Inkwell in one, The Forge to show the same bytes are not kept twice
    O.cd = []; for (let i = 1; i <= 5; i++) { O.cd.push(await T.keep('cd', 'Carpe Diem', '200' + i, 60000 + i * 1000)); await new Promise(r => setTimeout(r, 5)); }
    O.ink = await T.keep('inkwell', 'Inkwell', '9.40', 50000);
    const u1 = T.rnd(40000), h1 = await AppLib.sha(u1), u2 = T.rnd(41000), h2 = await AppLib.sha(u2);
    await libKeep('forge', { title: 'The Forge', version: '900', size: u1.length, sha256: h1, name: 'forge.html', source: 'file' }, u1, '');
    const f1ref = libState().apps.forge.ref;
    await libKeep('forge', { title: 'The Forge', version: '901', size: u2.length, sha256: h2, name: 'forge.html', source: 'file' }, u2, '');
    await libKeep('forge', { title: 'The Forge', version: '900', size: u1.length, sha256: h1, name: 'forge.html', source: 'file' }, u1, '');
    O.forge = { chain: T.chain('forge'), f1ref, f1gone: (await T.keys('ingenium_apps', 'b')).indexOf(f1ref) < 0 };
    // Fabrica: a real app, with packages made at five versions (web) and two (Fire tablet)
    const rp = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Lumen</title><h1>Lumen</h1>' }], { name: 'Lumen', msg: 'First version' }); O.repo = rp.id;
    await T.open('fabrica_made', 1, d => { try { d.createObjectStore('meta'); } catch (e) { } try { d.createObjectStore('bytes'); } catch (e) { } }).then(d => d.close());
    O.pk = [];
    for (let i = 1; i <= 5; i++) { const key = rp.id + '|c' + i + '|web|Lumen-c' + i + '.zip'; await T.put('fabrica_made', 'meta', key, { key, repo: rp.id, commit: 'c' + i, kind: 'web', name: 'Lumen-c' + i + '.zip', mime: 'application/zip', size: 3000 + i, at: Date.now() - (10 - i) * 60000 }); await T.put('fabrica_made', 'bytes', key, T.rnd(3000 + i)); O.pk.push(key); }
    for (let i = 4; i <= 5; i++) { const key = rp.id + '|c' + i + '|apk|Lumen.apk'; await T.put('fabrica_made', 'meta', key, { key, repo: rp.id, commit: 'c' + i, kind: 'apk', name: 'Lumen.apk', mime: 'application/vnd.android.package-archive', size: 5000, at: Date.now() - (10 - i) * 60000 }); await T.put('fabrica_made', 'bytes', key, T.rnd(5000)); O.pk.push(key); }
    // the owner's work, each naming a stored text made two days ago
    const W = {}; ['chat', 'lxdoc', 'askv', 'run', 'code', 'codev', 'shelf', 'store'].forEach((k, i) => W[k] = T.oldId(2, 'w' + i + k));
    for (const k in W) await IngBig.put(W[k], 'The owner\'s ' + k + ' text. ' + 'x'.repeat(2000));
    state.chats = state.chats || []; state.chats.push({ id: 'chat_r142', title: 'Storage test chat', created: Date.now(), updated: Date.now(), messages: [{ role: 'me', text: 'See the file', attachRef: W.chat, attachChars: 2000 }] });
    // 6.2: in an edition without Lector the desk can still hold Lector's records (a backup from the master edition, read back), and they still protect what they name
    const lx = typeof lxState === 'function' ? lxState() : (state.lector = state.lector || {}); lx.sets = lx.sets || {}; lx.runs = lx.runs || []; lx.sets.r142 = { apps: ['cd'], purpose: 'portfolio', docs: { analysis: { ref: W.lxdoc, at: Date.now() } }, older: { analysis: [{ ref: W.askv, at: Date.now() - 1000 }] } };
    lx.runs.push({ id: 'run_r142', name: 'Storage test reading', status: 'done', partsRef: W.run, notesRef: null, mergeRef: null, analysisRef: null, writings: {} });
    state.projects = state.projects || []; state.projects.push({ id: 'proj_r142', name: 'Storage test project', app: false, files: [{ name: 'index.html', ref: W.code, size: 2000 }], versions: [{ prev: W.codev, next: null }] });
    saveState();
    localStorage.setItem('ingenium_v4.snap2', JSON.stringify({ at: Date.now() - 50000, v: JSON.stringify({ chats: [{ id: 'gone', messages: [{ role: 'me', attachRef: W.shelf }] }] }) }));
    await T.open('r142_probe', 1, d => d.createObjectStore('s')).then(d => d.close()); await T.put('r142_probe', 's', 'note', { text: 'kept by another part: ' + W.store });
    // stored texts nothing names: three old ones, one young one, and an old app page in the library's store
    O.orph = [T.oldId(3, 'o1'), T.oldId(4, 'o2'), T.oldId(5, 'o3')]; for (const id of O.orph) await IngBig.put(id, 'nothing names this ' + 'y'.repeat(3000));
    O.young = IngBig.newId(); await IngBig.put(O.young, 'made a moment ago');
    O.orphLib = T.oldId(6, 'ol'); await T.put('ingenium_apps', 'b', O.orphLib, T.rnd(7000));
    O.W = W; O.keysBefore = (await T.keys('ingenium_keys', 'k')).length;
    O.libSum = ['cd', 'inkwell', 'forge', 'ingenium'].reduce((a, k) => a + IngStore.versions(k).reduce((b, v) => b + (+v.size || 0), 0), 0) + 7000;
    return O; });
  const cdChain = await p.evaluate(() => __t.chain('cd'));
  const cdTail = builtin.cd.join(',');
  ok(cdChain.map(x => x.v).join(',') === '2005,2004,2003,2002,2001' + (cdTail ? ',' + cdTail : ''), 'the library keeps each version of an app, newest first (it kept one earlier copy before)', cdChain.map(x => x.v));
  ok(seed.forge.chain.length === 2 + builtin.forge.length && seed.forge.chain[0].v === '900' && seed.forge.chain[1].v === '901' && seed.forge.f1gone, 'the same bytes added again are not kept twice: the copy before goes, the newest stays', seed.forge);

  // what takes the room, measured again: real sizes
  // (the new measurement is waited for, not a fixed time: a busy machine may take longer than the 1.8 s once allowed)
  await p.evaluate(() => { window.__m0 = IngStore._.last().measure; document.getElementById('stxMeasure').click(); });
  await p.waitForFunction(() => { const m = IngStore._.last().measure; return !!m && m !== window.__m0; }, null, { timeout: 60000 }).catch(() => { });
  await p.waitForTimeout(300);
  const s2 = await p.evaluate(() => { const rows = {}; document.querySelectorAll('#stxKinds li').forEach(l => rows[l.getAttribute('data-db')] = { t: l.textContent }); return { rows, last: IngStore._.last().measure.dbs }; });
  const libRow = s2.last.find(x => x.db === 'ingenium_apps'), madeRow = s2.last.find(x => x.db === 'fabrica_made'), bigRow = s2.last.find(x => x.db === 'ingenium_big');
  const libBytes = seed.libSum;
  ok(libRow && libRow.bytes >= libBytes && libRow.bytes < libBytes * 1.02 && /Your app library/.test(s2.rows.ingenium_apps.t), 'the app library is measured at its real size', { measured: libRow && libRow.bytes, expected: libBytes });
  ok(madeRow && madeRow.n === 14 && /Fabrica's packages/.test(s2.rows.fabrica_made.t) && bigRow && bigRow.n >= 12, "Fabrica's packages and the long-text store are counted entry by entry", { made: madeRow, big: bigRow && bigRow.n });
  ok(!!s2.rows.r142_probe && /Another store: r142_probe/.test(s2.rows.r142_probe.t), 'a store Ingenium does not know is listed too, by its name', s2.rows.r142_probe && s2.rows.r142_probe.t);

  // ================= 3 · Keep always, from the page =================
  await p.evaluate(() => { const b = [...document.querySelectorAll('#stxApps button[data-pin]')].find(x => /Carpe Diem 2002/.test(x.getAttribute('aria-label'))); b.scrollIntoView({ block: 'center' }); });
  await p.click('#stxApps button[aria-label="Keep always: Carpe Diem 2002"]'); await p.waitForTimeout(300);
  const s3 = await p.evaluate(() => { const b = document.querySelector('#stxApps button[aria-label="Keep always: Carpe Diem 2002"]'); return { pressed: b.getAttribute('aria-pressed'), chip: b.parentNode.querySelector('.stx-chip').textContent, focus: document.activeElement === b, chain: __t.chain('cd'),
    chips: [...document.querySelectorAll('#stxApps .stx-app')].find(a => /Carpe Diem/.test(a.querySelector('h4').textContent)).querySelectorAll('.stx-chip').length }; });
  ok(s3.pressed === 'true' && s3.chip === 'Kept by you' && s3.chain[3].pin && s3.focus, 'Keep always marks a version (a pressed key, read as such), and it is kept', s3);
  const s3b = await p.evaluate(() => [...document.querySelectorAll('#stxApps .stx-app')].find(a => /Carpe Diem/.test(a.querySelector('h4').textContent)).textContent);
  ok(/Newest/.test(s3b) && /Among your newest 3/.test(s3b) && /Goes when room runs short/.test(s3b), 'each version says whether it stays (newest, among the newest N, kept by her) or may go', s3b.slice(0, 300));
  await p.evaluate(() => document.getElementById('stxApps').scrollIntoView({ block: 'start' })); await p.waitForTimeout(300);
  await shot(p, 's3-library-day');

  // ================= 4 · the plan: exactly what may go, and the proof =================
  const plan = await p.evaluate(() => IngStore.plan());
  const ids = plan.items.map(x => x.ref || x.key || x.id);
  const W = seed.W, ownerIds = Object.values(W);
  const cdOld = await p.evaluate(() => __t.chain('cd').slice(4).map(x => x.ref)); const expLib = cdOld, expPk = seed.pk.filter(k => /\|c[12]\|web\|/.test(k)), expOrph = seed.orph, expOL = [seed.orphLib];
  const expected = [].concat(expLib, expPk, expOrph, expOL);
  ok(expected.every(x => ids.indexOf(x) >= 0), 'the plan lists the old copies: Carpe Diem 2001 and the copy below it, the two oldest web packages, three stored texts and an app page nothing names', { items: plan.items.map(x => x.kind + ':' + x.label) });
  ok(ids.length === expected.length, 'and nothing else', { got: ids.length, expected: expected.length, extra: plan.items.filter(x => expected.indexOf(x.ref || x.key || x.id) < 0).map(x => x.label) });
  ok(ownerIds.every(x => ids.indexOf(x) < 0) && ids.indexOf(seed.young) < 0, "nothing the owner's work names is in it (chats, Lector's documents and readings, Ask Lector's versions, Code, the recovery shelf, another store), nor a text made a moment ago", ownerIds.filter(x => ids.indexOf(x) >= 0));
  const only = await p.evaluate(() => { const k = ['ingenium', 'inkwell', 'forge', 'cd'].find(k => IngStore.versions(k).length === 1); return k ? IngStore.versions(k)[0].ref : null; });
  ok(ids.indexOf(seed.cd[4].ref) < 0 && ids.indexOf(seed.cd[1].ref) < 0 && ids.indexOf(seed.ink.ref) < 0 && (!only || ids.indexOf(only) < 0) && plan.items.every(x => x.kind !== 'package' || !/\|apk\|/.test(x.key)),
    'never the newest, never a version marked Keep always, never an app\'s only copy; packages beyond N for each app and kind only');
  ok(plan.proof && plan.proof.by && plan.proof.by.chats && plan.proof.by.lectorDocs && plan.proof.by.askVers && plan.proof.by.lectorRuns && plan.proof.by.code && plan.proof.by.shelf && plan.proof.by.stores, 'the proof read every place that names stored texts', plan.proof);

  // the preview: the exact list, then one press
  await p.evaluate(() => document.getElementById('stxClean').scrollIntoView({ block: 'center' }));
  await p.click('#stxClean'); await p.waitForSelector('#modalBox .stx-pv-list', { timeout: 15000 }); await p.waitForTimeout(250);
  const pv = await p.evaluate(() => { const box = document.getElementById('modalBox'); return { role: box.getAttribute('role'), lab: box.getAttribute('aria-labelledby'), lis: [...box.querySelectorAll('.stx-pv-list li')].map(l => l.textContent),
    groups: [...box.querySelectorAll('.stx-pv-list h4')].map(h => h.textContent), total: box.querySelector('.stx-pv-total').textContent, yes: [...box.querySelectorAll('button')].map(b => b.textContent), proof: (box.querySelector('.stx-proof') || {}).textContent, focus: document.activeElement.textContent }; });
  ok(pv.lis.length === expected.length && pv.role === 'dialog' && pv.lab === 'stxPvH', 'Clean the library opens a preview (a dialog) listing exactly what would go, one line each', pv.lis);
  ok(pv.lis.some(t => /^Carpe Diem 2001 · /.test(t)) && pv.lis.some(t => /^Lumen · web app · Lumen-c1\.zip/.test(t)) && /Frees /.test(pv.total) && pv.yes.some(t => /^Remove these · /.test(t)) && pv.focus === 'Not now',
    'each line names the copy and its size, the total is given, and Not now has the focus', { total: pv.total, keys: pv.yes });
  ok(/nothing names these/.test(pv.proof || ''), 'the stored texts carry the proof that nothing names them', pv.proof);
  await shot(p, 's4-clean-preview');
  await p.click('#modalBox .stx-pv-keys .btn.primary'); await p.waitForSelector('#stxPvDone', { timeout: 20000 }); await p.waitForTimeout(200);
  const done = await p.evaluate(() => document.getElementById('stxPvDone').textContent);
  await shot(p, 's4-clean-done');
  await p.evaluate(() => closeModal()); await p.waitForTimeout(200);
  const after = await p.evaluate(async (o) => { const T = __t; return { big: await T.keys('ingenium_big', 't'), apps: await T.keys('ingenium_apps', 'b'), made: await T.keys('fabrica_made', 'meta'), chain: T.chain('cd'), log: IngStore.log()[0], ink: T.chain('inkwell') }; }, null);
  ok(new RegExp('Removed ' + expected.length + ' copies and freed').test(done), 'one press removes them, and says how much was freed', done);
  ok(seed.orph.every(x => after.big.indexOf(x) < 0) && after.apps.indexOf(seed.orphLib) < 0 && cdOld.every(r => after.apps.indexOf(r) < 0) && expPk.every(k => after.made.indexOf(k) < 0), 'exactly those are gone from the stores');
  ok(after.chain.map(x => x.v).join(',') === '2005,2004,2003,2002' && after.chain[3].pin && after.ink.length === 1 + builtin.inkwell.length && after.made.length === 5, 'the newest three of Carpe Diem and the one kept always stay, Inkwell\'s two stay, the newest packages stay', { cd: after.chain.map(x => x.v), made: after.made.length });
  ok(ownerIds.every(x => after.big.indexOf(x) >= 0) && after.big.indexOf(seed.young) >= 0, "every text the owner's work names is still in the store", ownerIds.filter(x => after.big.indexOf(x) < 0));
  ok(after.log && after.log.why === 'clean' && after.log.items.length === expected.length, 'the log records it', after.log && { why: after.log.why, n: after.log.items.length });
  await p.evaluate(() => { document.getElementById('stxLogBox').open = true; document.getElementById('stxLogBox').scrollIntoView({ block: 'start' }); }); await p.waitForTimeout(250);
  const logT = await p.evaluate(() => document.getElementById('stxLog').textContent);
  ok(new RegExp('You cleaned the library · ' + expected.length + ' copies removed, .* freed\\..*Carpe Diem 2001').test(logT), 'the log reads plainly: when, why, what, how much', logT.slice(0, 200));
  await shot(p, 's4-log');

  // ================= 5 · old copies go on their own when the limit is near, keeping the newest N =================
  await p.evaluate(() => document.getElementById('stxKeep').scrollIntoView({ block: 'center' }));
  await p.fill('#stxKeep', '2'); await p.press('#stxKeep', 'Tab'); await p.waitForTimeout(200);
  await p.evaluate(async () => { await __t.keep('cd', 'Carpe Diem', '2006', 66000); });
  const s5 = await p.evaluate(async () => { const st = await IngStore.status(); IngStore.set({ limit: Math.ceil(st.usage / 0.93) }); const r = await IngStore.check(); await new Promise(z => setTimeout(z, 300));
    return { keepN: IngStore.settings().keepN, chain: __t.chain('cd'), made: (await __t.keys('fabrica_made', 'meta')).sort(), log: IngStore.log()[0], note: __t.noteText(), st: r && { pct: r.pct, level: r.level } }; });
  ok(s5.keepN === 2 && s5.chain.map(x => x.v).join(',') === '2006,2005,2002', 'at 90 % of the limit, old versions go on their own: the newest 2 stay, and the one kept always', s5.chain.map(x => x.v));
  ok(s5.made.filter(k => /\|web\|/.test(k)).length === 2 && s5.made.filter(k => /\|apk\|/.test(k)).length === 2, 'Fabrica keeps its newest 2 packages for each app and kind', s5.made);
  const expEv = 3 + builtin.forge.length + Math.max(0, builtin.inkwell.length - 1); // Carpe Diem 2004 and 2003, the web package c3, and the built-in copies below the newest two of The Forge and Inkwell
  ok(s5.log && s5.log.why === 'limit' && s5.log.items.length === expEv, 'the log says room was running short and lists what went', s5.log && s5.log.items.map(x => x.label));
  ok(s5.note && /Room was running short/.test(s5.note.t) && new RegExp('removed ' + expEv + ' old copies on its own').test(s5.note.t) && /Open Storage/.test(s5.note.t), 'a calm notice says what went, with a key to Storage', s5.note && s5.note.t);
  await shot(p, 's5-evicted-note');
  await p.evaluate(() => IngErr.closeNotice());
  const own5 = await p.evaluate(async (ids) => { const big = await __t.keys('ingenium_big', 't'); return ids.filter(x => big.indexOf(x) < 0); }, ownerIds);
  ok(own5.length === 0, "automatic freeing never touches the owner's work", own5);

  // switched off: nothing goes on its own
  const s5b = await p.evaluate(async () => { document.getElementById('stxAuto').click(); await __t.keep('cd', 'Carpe Diem', '2007', 67000); const st = await IngStore.status(); IngStore.set({ limit: Math.ceil(st.usage / 0.92) }); await IngStore.check(); await new Promise(z => setTimeout(z, 200)); return { auto: IngStore.settings().auto, chain: __t.chain('cd').map(x => x.v) }; });
  ok(s5b.auto === false && s5b.chain.join(',') === '2007,2006,2005,2002', 'with the switch off, nothing goes on its own', s5b);

  // ================= 6 · calm warnings at 80 % and 95 % =================
  const w1 = await p.evaluate(async () => { IngErr.closeNotice(); const u = await __t.steady(); IngStore.set({ limit: Math.ceil(u / 0.85) }); const r = await IngStore.check(); await new Promise(z => setTimeout(z, 300));
    return { level: r.level, note: __t.noteText(), warn: !document.getElementById('stxWarn').hidden, wl: document.getElementById('stxWarn').getAttribute('data-level'), wt: document.getElementById('stxWarnT').textContent, ml: document.getElementById('stxMeter').getAttribute('data-level'), vt: document.getElementById('stxMeter').getAttribute('aria-valuetext') }; });
  ok(w1.level === 1 && /Getting full: (8\d|9[0-4])/.test(w1.wt) && w1.note && w1.note.role === 'status' && /Storage is getting full/.test(w1.note.t) && /Nothing needs doing yet/.test(w1.note.t), 'at 80 % a calm notice says it is getting full, and that nothing needs doing yet', w1.note && w1.note.t);
  ok(w1.warn && w1.wl === '1' && w1.ml === '1' && /of your limit/.test(w1.vt), 'the section shows it too: the meter, and a warning with Clean the library and the limit', w1);
  await p.evaluate(() => document.getElementById('stxCard').scrollIntoView()); await p.waitForTimeout(400);
  await shot(p, 's6-warn-80');
  const w2 = await p.evaluate(async () => { const u = await __t.steady(); IngStore.set({ limit: Math.ceil(u / 0.97) }); const r = await IngStore.check(); await new Promise(z => setTimeout(z, 300));
    return { level: r.level, note: __t.noteText(), wt: document.getElementById('stxWarnT').textContent, ml: document.getElementById('stxMeter').getAttribute('data-level'), lim: document.getElementById('stxLimit').value }; });
  ok(w2.level === 2 && /Storage is nearly full/.test(w2.note.t) && /Nearly full: \d+/.test(w2.wt) && w2.ml === '2', 'at 95 % it says nearly full, still calm, with what to do', w2.note && w2.note.t);
  await p.waitForTimeout(400); await shot(p, 's6-warn-95');
  // the limit set from the page, in GB or MB, and cleared
  await p.evaluate(() => IngErr.closeNotice());
  await p.fill('#stxLimit', '300'); await p.selectOption('#stxUnit', '1048576'); await p.press('#stxLimit', 'Tab'); await p.waitForTimeout(500);
  const w3 = await p.evaluate(() => ({ lim: IngStore.settings().limit, of: document.getElementById('stxOf').textContent, warn: document.getElementById('stxWarn').hidden }));
  ok(w3.lim === 300 * 1048576 && /of 300 MB, the limit you set/.test(w3.of) && w3.warn, 'the owner sets her own limit on the page (300 MB here), and the warning goes when there is room', w3);
  await p.fill('#stxLimit', '9000'); await p.selectOption('#stxUnit', '1073741824'); await p.press('#stxLimit', 'Tab'); await p.waitForTimeout(500);
  const w4 = await p.evaluate(() => ({ lim: IngStore.settings().limit, of: document.getElementById('stxOf').textContent, note: document.getElementById('stxLimitNote').textContent }));
  ok(w4.lim === 9000 * 1073741824 && /the room the browser gives Ingenium here/.test(w4.of) && /Your limit is more than the browser gives Ingenium here .*, so the browser's room is the one that counts/.test(w4.note), 'a limit above what the browser gives is said to be so, and the browser\'s room counts', w4);
  await p.click('#stxLimitClear'); await p.waitForTimeout(300);
  ok(await p.evaluate(() => IngStore.settings().limit === null && document.getElementById('stxLimit').value === ''), 'No limit of my own clears it');

  // ================= 7 · damaged zips: which file, and what =================
  const zr = await p.evaluate(async (Z) => { const out = {}; for (const k in Z) { const r = await IngErr.zip(__t.u8(Z[k]), k === 'notzip' ? 'Lumen.zip' : 'Lumen-' + k + '.zip'); out[k] = { ok: r.ok, kinds: r.problems.map(x => x.kind), files: r.problems.map(x => x.file), m: r.message }; } return out; },
    Object.fromEntries(Object.entries(Z).filter(([k]) => k !== 'docxCut').map(([k, v]) => [k, b64(v)])));
  ok(zr.good.ok && !zr.good.m, 'a whole zip passes the check', zr.good);
  ok(!zr.notzip.ok && zr.notzip.kinds[0] === 'notzip' && /“Lumen\.zip” is not a zip: it is a web page\./.test(zr.notzip.m), 'not a zip: it says so, and what the file is instead', zr.notzip.m);
  ok(!zr.cut.ok && zr.cut.kinds[0] === 'short' && /is incomplete: it is cut short: it ends after .* before the list of its files \(the first \d+ files? in it/.test(zr.cut.m) && /Copy or download it again/.test(zr.cut.m), 'cut short: it says where it ends, how much is whole, and what to do', zr.cut.m);
  ok(!zr.crcBad.ok && zr.crcBad.kinds[0] === 'crc' && zr.crcBad.files[0] === 'app.js' && /“app\.js” inside it: what it holds does not match its check sum/.test(zr.crcBad.m), 'a wrong check sum: it names the file inside, app.js', zr.crcBad.m);
  ok(!zr.meth.ok && zr.meth.kinds[0] === 'method' && zr.meth.files[0] === 'index.html' && /bzip2 \(method 12\), which Ingenium does not unpack/.test(zr.meth.m), 'an unknown way of packing: it names the file and the method', zr.meth.m);
  ok(!zr.broken.ok && /damaged|crc/.test(zr.broken.kinds[0]) && zr.broken.files[0] === 'style.css', 'broken packed data: it names style.css', zr.broken.m);
  ok(!zr.locked.ok && zr.locked.kinds[0] === 'locked' && zr.locked.files[0] === 'app.js', 'a file locked with a password: it says so', zr.locked.m);
  // through the real paths: the library, Fabrica, a Word document, the toast, and IngErr.say on the raw words
  const zp = await p.evaluate(async (Z) => { const out = {};
    await AppLib.addFiles([new File([__t.u8(Z.cut)], 'Lumen-web.zip', { type: 'application/zip' }), new File([__t.u8(Z.crcBad)], 'Lumen-kit.zip', { type: 'application/zip' })]);
    out.lib = window.__libLastAdd; out.libNote = LIB.note;
    try { await IngRepo.importAny(__t.u8(Z.crcBad), { name: 'Lumen' }); out.repo = 'imported'; } catch (e) { out.repo = e.message; out.repoKind = e.ingKind; }
    try { await IngRepo.importAny(__t.u8(Z.meth), { name: 'Lumen' }); out.repo2 = 'imported'; } catch (e) { out.repo2 = e.message; }
    try { const r = await IngRepo.importAny(__t.u8(Z.good), { name: 'LumenWhole' }); out.good = !!(r && (r.id || (r.repo && r.repo.id) || (r.summary && r.summary.id))); } catch (e) { out.good = 'failed: ' + e.message; }
    try { out.docx = await readAsText(new File([__t.u8(Z.docxCut)], 'Report.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })); } catch (e) { out.docx = 'ERR ' + e.message; }
    out.raw = ['the zip\'s directory is damaged', 'this is not a zip file', 'a file in the zip is broken', 'index.html: packed in a way this cannot read'].map(m => IngErr.say(new Error(m), { name: 'Lumen.zip' }));
    ingToast('Could not open it: the zip\'s directory is damaged'); out.toast = (document.getElementById('ingToast') || {}).textContent;
    return out; }, { cut: b64(Z.cut), crcBad: b64(Z.crcBad), meth: b64(Z.meth), good: b64(Z.good), docxCut: b64(Z.docxCut) });
  ok(zp.lib && zp.lib.fail.length === 2 && /Lumen-web\.zip \(“Lumen-web\.zip” is incomplete: it is cut short/.test(zp.lib.fail[0]) && /app\.js.*check sum/.test(zp.lib.fail[1]) && /Could not be read/.test(zp.libNote), 'adding damaged zips to the library says, for each, which file and what', zp.lib && zp.lib.fail);
  ok(/“Lumen\.zip” is damaged: “app\.js” inside it: what it holds does not match its check sum/.test(zp.repo) && zp.repoKind === 'zip', 'Fabrica refuses a zip with a wrong check sum before bringing damaged files in, and says which', zp.repo);
  ok(/“index\.html” inside “Lumen\.zip”: it is packed with bzip2/.test(zp.repo2), 'Fabrica names an unknown way of packing', zp.repo2);
  ok(zp.good === true, 'a whole zip still comes into Fabrica as before', zp.good);
  ok(/^ERR “Report\.docx” is incomplete: it is cut short/.test(zp.docx), 'a damaged Word document is explained the same way', zp.docx);
  ok(/list of the files inside it is broken/.test(zp.raw[0]) && /is not a zip file/.test(zp.raw[1]) && /a file inside it is broken/.test(zp.raw[2]) && /“index\.html” inside Lumen\.zip|“index\.html” inside “Lumen\.zip”/.test(zp.raw[3]), "IngErr.say turns the older readers' raw words into plain ones", zp.raw);
  ok(/the list of the files inside the zip is broken/.test(zp.toast || ''), 'and the toast never shows the raw words', zp.toast);

  // ================= 8 · missing parts =================
  const mp = await p.evaluate(async () => { const out = {};
    out.say = ['this build of Ingenium carries no Android shell', 'this build of Ingenium carries no iPhone and iPad shell', 'This copy of Ingenium does not carry the kit store (the phone and tablet apps leave it out).', 'this window has no Web Crypto: open Ingenium from its own app or a secure address', 'this window cannot unpack a zip', 'this device keeps no store'].map(m => IngErr.say(new Error(m)));
    const sh = document.getElementById('ing-ios-shell'), keep = sh ? sh.parentNode : null, nx = sh ? sh.nextSibling : null, had = window.__ingIosShell; if (sh) sh.remove(); window.__ingIosShell = undefined;
    out.parts = IngErr.parts().map(x => x.id + ':' + x.ok);
    try { await IngIpa.make({ html: '<html></html>', title: 'Lumen', id: 'com.yannieforest.lumen' }); out.ipa = 'made'; } catch (e) { out.ipa = e.message; }
    go('settings'); await new Promise(z => setTimeout(z, 300)); document.getElementById('stxPartsBox').open = true; out.partsUi = document.getElementById('stxParts').textContent;
    if (sh && keep) keep.insertBefore(sh, nx); window.__ingIosShell = had;
    // a page that names a file that is not there
    const r = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Gap</title><script src="app.js"></script><link rel="stylesheet" href="look.css"><h1>Gap</h1>' }], { name: 'Gap', msg: 'First version' });
    ingToast('-'); await IngShip.onePage(r.id); await new Promise(z => setTimeout(z, 100)); out.files = (document.getElementById('ingToast') || {}).textContent;
    out.filesSay = IngErr.say({ missing: ['app.js'], page: 'index.html' });
    return out; });
  ok(/does not carry the Android shell, so it cannot make the Fire tablet app here/.test(mp.say[0]) && /iPhone and iPad shell, so it cannot make the iPhone and iPad app here/.test(mp.say[1]) && /kit store/.test(mp.say[2]) && /no Web Crypto/.test(mp.say[3]) && /cannot unpack zips/.test(mp.say[4]) && /cannot keep things in its own store/.test(mp.say[5]),
    'a missing part is said plainly, with where it can be done instead', mp.say.map(x => x.slice(0, 70)));
  ok(mp.parts.indexOf('iphone:false') >= 0 && /does not carry the iPhone and iPad shell/.test(mp.ipa) && /Not in this copyThe iPhone and iPad shell/.test(mp.partsUi), 'without the iPhone shell, making the app says why, and Storage lists what this copy carries', { ipa: mp.ipa, parts: mp.parts });
  ok(/names 2 files that are not in the app: app\.js, look\.css\. Add them, or take the name out of the page\. It was made without them\./.test(mp.files || ''), 'a page that names files that are not there: the owner is told which', mp.files);
  ok(/names a file that is not in the app: app\.js/.test(mp.filesSay), 'IngErr.say explains a missing file the same way', mp.filesSay);

  // ================= 9 · the base's sweep keeps what the recovery shelf names =================
  const gc = await p.evaluate(async (W) => { const o4 = __t.oldId(7, 'o4'); await IngBig.put(o4, 'garbage'); await window.__gcWrapped(ingBigLive()); await new Promise(z => setTimeout(z, 700));
    const big = await __t.keys('ingenium_big', 't'); return { shelf: big.indexOf(W.shelf) >= 0, store: big.indexOf(W.store) >= 0, o4: big.indexOf(o4) >= 0 }; }, W);
  ok(gc.shelf && gc.store && !gc.o4, "the base's own sweep of stored texts now keeps what the recovery shelf and other stores name, and still lets real garbage go", gc);

  // ================= 10 · nothing the owner made is ever removed =================
  const fin = await p.evaluate(async (o) => { const big = await __t.keys('ingenium_big', 't'), apps = await __t.keys('ingenium_apps', 'b'); const repos = (await IngRepo.list()).map(r => r.name);
    const chat = state.chats.find(c => c.id === 'chat_r142'), lx = typeof lxState === 'function' ? lxState() : (state.lector || {}); const loads = await Promise.all(Object.values(o.W).map(id => IngBig.load(id)));
    return { missing: Object.values(o.W).filter(x => big.indexOf(x) < 0), loads: loads.every(t => typeof t === 'string' && /The owner's/.test(t)), repos, chat: !!chat, lx: !!(lx.sets.r142 && lx.runs.find(r => r.id === 'run_r142')), proj: !!state.projects.find(x => x.id === 'proj_r142'),
      newest: ['cd', 'inkwell', 'forge'].every(k => apps.indexOf(libState().apps[k].ref) >= 0), pinned: apps.indexOf(o.cd[1].ref) >= 0, keys: (await __t.keys('ingenium_keys', 'k')).length, hub: (await indexedDB.databases()).map(d => d.name) }; }, seed);
  ok(fin.missing.length === 0 && fin.loads && fin.chat && fin.lx && fin.proj, "after every clean and every eviction, the owner's chats, Lector's documents and readings, Ask Lector's versions, Code's project and the recovery shelf all still read back whole", fin.missing);
  ok(fin.repos.indexOf('Lumen') >= 0 && fin.newest && fin.pinned && fin.keys === seed.keysBefore, "Fabrica's apps, the newest version of every app, the version kept always, and the signing keys are all still here", { repos: fin.repos, keys: fin.keys });

  // ================= 11 · keyboard, screen readers =================
  await p.evaluate(() => { IngErr.closeNotice(); document.getElementById('stxClean').scrollIntoView({ block: 'center' }); document.getElementById('stxClean').focus(); });
  await p.keyboard.press('Enter'); await p.waitForSelector('#modalBox .stx-pv-keys button', { timeout: 15000 }); await p.waitForTimeout(150);
  const k1 = await p.evaluate(() => ({ open: document.getElementById('modalRoot').classList.contains('open'), focus: document.activeElement.textContent }));
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  const k2 = await p.evaluate(() => ({ open: document.getElementById('modalRoot').classList.contains('open'), focus: document.activeElement && document.activeElement.id, role: document.getElementById('modalBox').getAttribute('role') }));
  ok(k1.open && /Not now|Close/.test(k1.focus) && !k2.open && k2.focus === 'stxClean' && !k2.role, 'by keyboard: Enter opens the preview with the focus inside, Escape closes it and the focus comes back', { k1, k2 });
  const tabbable = await p.evaluate(() => { const c = document.getElementById('stxCard'); return [...c.querySelectorAll('button,input,select,summary')].filter(x => x.offsetParent && !x.disabled && x.tabIndex >= 0).map(x => x.id || x.textContent.trim().slice(0, 20)); });
  ok(['stxPersistAsk', 'stxMeasure', 'stxLimit', 'stxLimitClear', 'stxAuto', 'stxKeep', 'stxClean'].filter(id => tabbable.indexOf(id) < 0 && !(id === 'stxPersistAsk')).length === 0 && tabbable.filter(x => /^Keep always/.test(x)).length >= 2, 'every key, switch and field of the section is reached by Tab', tabbable);
  const names = await p.evaluate(() => { const c = document.getElementById('stxCard'); const un = [...c.querySelectorAll('button,input,select')].filter(x => { const n = x.getAttribute('aria-label') || x.getAttribute('aria-labelledby') || (x.id && document.querySelector('label[for="' + x.id + '"]')) || x.textContent.trim(); return !n; }); return un.map(x => x.outerHTML.slice(0, 80)); });
  ok(names.length === 0, 'each has a name a screen reader reads', names);
  const ax1 = await axe(p, ['#stxCard']);
  if (ax1) ok(ax1.length === 0, 'axe-core (WCAG 2.1 A and AA) finds nothing in the Storage section by day', ax1); else console.log('NOTE no axe.min.js given: ' + 'axe-core (WCAG 2.1 A and AA) finds nothing in the Storage section by day' + ' was not checked');
  await p.evaluate(() => IngErr.notice({ kind: 'full', title: 'This device\'s storage for Ingenium is full', text: 'A test of the notice.', keys: [['Open Storage', () => { }, true]] })); await p.waitForTimeout(400);
  const ax2 = await axe(p, ['#stxNote']);
  if (ax2) ok(ax2.length === 0, 'and nothing in the notice', ax2); else console.log('NOTE no axe.min.js given: ' + 'and nothing in the notice' + ' was not checked');
  await p.evaluate(() => IngErr.closeNotice());
  await p.click('#stxClean'); await p.waitForSelector('#modalBox .stx-pv-keys button', { timeout: 15000 }); await p.waitForTimeout(200);
  const ax3 = await axe(p, ['#modalBox']);
  if (ax3) ok(ax3.length === 0, 'nor in the preview', ax3); else console.log('NOTE no axe.min.js given: ' + 'nor in the preview' + ' was not checked');
  await p.evaluate(() => closeModal());

  // ================= 12 · by night, on a phone, on a wide display =================
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); IngStore.set({ limit: null }); document.getElementById('stxCard').scrollIntoView(); }); await p.waitForTimeout(700);
  await shot(p, 's12-night');
  const ax4 = await axe(p, ['#stxCard']);
  if (ax4) ok(ax4.length === 0, 'axe-core finds nothing in the section by night either', ax4); else console.log('NOTE no axe.min.js given: ' + 'axe-core finds nothing in the section by night either' + ' was not checked');
  await p.evaluate(() => document.getElementById('stxApps').scrollIntoView({ block: 'start' })); await p.waitForTimeout(300); await shot(p, 's12-night-library');
  await p.evaluate(() => IngErr.notice({ kind: 'warn', title: 'Storage is getting full', text: 'Ingenium has used 82 % of the limit you set (1.6 GB of 2.0 GB). Nothing needs doing yet.', keys: [['Open Storage', () => { }, true]] })); await p.waitForTimeout(500);
  await shot(p, 's12-night-note'); await p.evaluate(() => IngErr.closeNotice());
  await p.evaluate(() => document.body.setAttribute('data-theme', 'day'));
  for (const [w, h, n] of [[390, 844, 'phone'], [3440, 1440, 'wide']]) {
    await p.setViewportSize({ width: w, height: h }); await p.waitForTimeout(600);
    await p.evaluate(() => document.getElementById('stxCard').scrollIntoView()); await p.waitForTimeout(500);
    const lay = await p.evaluate(() => { const c = document.getElementById('stxCard').getBoundingClientRect(); const over = [...document.querySelectorAll('#stxCard *')].filter(x => { const r = x.getBoundingClientRect(); return r.width && (r.right > c.right + 1 || r.left < c.left - 1); }).map(x => x.id || x.className).slice(0, 5);
      return { sw: document.documentElement.scrollWidth, vw: innerWidth, over }; });
    ok(lay.sw <= lay.vw && lay.over.length === 0, 'on a ' + n + ' (' + w + ' pixels) nothing spills sideways', lay);
    await shot(p, 's12-' + n);
    if (n === 'phone') { await p.evaluate(() => document.getElementById('stxApps').scrollIntoView({ block: 'start' })); await p.waitForTimeout(300); await shot(p, 's12-phone-library'); }
  }
  await p.setViewportSize({ width: 1440, height: 900 });
  ok(errs.length === 0, 'no page errors along the way', errs.slice(0, 5));
  await ctx.close();

  // ================= 13 · a full disk, simulated =================
  const ctx2 = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p2 = await ctx2.newPage(); const errs2 = [];
  p2.on('pageerror', e => errs2.push(e.message));
  const cdp = await ctx2.newCDPSession(p2); await cdp.send('Storage.overrideQuotaForOrigin', { origin: ORIGIN, quotaSize: 12 * 1048576 });
  await p2.goto(URL_); await p2.route('**/' + new URL(URL_).pathname.split('/').pop(), r => r.abort());
  await p2.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 });
  await p2.evaluate(async () => { document.querySelectorAll('[id^="ing-builtin-"]').forEach(e => e.textContent = ''); if (window.IngBuiltin) await IngBuiltin.seed().catch(() => { }); });
  await ready(p2); await p2.evaluate(PAGE_HELPERS);
  const f1 = await p2.evaluate(async () => { IngStore.set({ keepN: 1, auto: true }); for (let i = 1; i <= 4; i++) await __t.keep('cd', 'Carpe Diem', '70' + i, 1500000);
    const est = await navigator.storage.estimate(); return { chain: __t.chain('cd').map(x => x.v), quota: est.quota, usage: est.usage }; });
  ok(f1.quota === 12 * 1048576 && f1.chain.length === 4 && f1.usage < 12 * 1048576, 'a device with 12 MB for Ingenium, four versions of an app kept', f1);
  const f2 = await p2.evaluate(async () => { const id = IngBig.newId(); let s = ''; const r = __t.rnd(9000000); for (let i = 0; i < r.length; i += 30000) s += btoa(String.fromCharCode.apply(null, r.subarray(i, i + 30000)));
    await IngBig.put(id, s); await new Promise(z => setTimeout(z, 2500)); return { note: __t.noteText(), log: IngStore.log()[0], chain: __t.chain('cd').map(x => x.v) }; });
  ok(f2.note && f2.note.role === 'alert' && /This device's storage for Ingenium is full/.test(f2.note.t) && /Your own work stays/.test(f2.note.t) && !/Nothing kept before is lost/.test(f2.note.t), 'a write the full store refuses (caught inside IndexedDB, though the writer swallows it) is explained at once, and no longer says nothing was lost while it says old copies went', f2.note && f2.note.t);
  ok(f2.log && f2.log.why === 'full' && f2.log.items.length === 3 && f2.chain.join(',') === '704' && /removed 3 old copies to free/.test(f2.note.t), 'old copies go first to make room (the newest stays), and the notice says so', { log: f2.log && f2.log.items.map(x => x.label), chain: f2.chain });
  await shot(p2, 's13-full-note');
  await p2.click('#stxNote button.primary'); await p2.waitForTimeout(1500);
  const f3 = await p2.evaluate(() => { const c = document.getElementById('stxCard'), r = c && c.getBoundingClientRect(); return { page: document.querySelector('section.section.active').id, inView: !!r && r.top < innerHeight && r.bottom > 0, focus: document.activeElement && document.activeElement.id, note: !!document.getElementById('stxNote') }; });
  ok(f3.page === 'page-settings' && f3.inView && f3.focus === 'stxH', 'Open Storage opens Settings at the Storage section, its heading focused', f3);
  await shot(p2, 's13-open-storage');
  const f4 = await p2.evaluate(async () => { const out = {}; out.say = IngErr.say(new DOMException('', 'QuotaExceededError'), { quiet: true });
    const big = '<!doctype html><html><head><title>Inkwell</title></head><body>' + 'z'.repeat(10) + '</body></html>'; const u = __t.rnd(11000000); const head = new TextEncoder().encode(big); const all = new Uint8Array(head.length + u.length); all.set(head); all.set(u, head.length);
    await new Promise(z => setTimeout(z, 16000)); // past the notice's quiet time
    await AppLib.addFiles([new File([all], 'Inkwell.html', { type: 'text/html' })]); out.fail = window.__libLastAdd && window.__libLastAdd.fail;
    for (let i = 0; i < 40 && !__t.noteText(); i++) await new Promise(z => setTimeout(z, 150)); out.note = __t.noteText(); return out; });
  ok(/^This device's storage for Ingenium is full, so this could not be kept/.test(f4.say), 'IngErr.say(QuotaExceededError) is a plain sentence', f4.say);
  ok(f4.fail && f4.fail.length === 1 && /Inkwell\.html \(This device's storage for Ingenium is full/.test(f4.fail[0]) && f4.note && /full/.test(f4.note.t), 'adding an app to a full library says the store is full, not a raw error', f4.fail);
  ok(errs2.length === 0, 'no page errors with the disk full', errs2.slice(0, 3));
  await ctx2.close();

  // ================= 14 · a window with no store of its own =================
  const ctx3 = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p3 = await ctx3.newPage(); const errs3 = [];
  p3.on('pageerror', e => errs3.push(e.message));
  await p3.addInitScript(() => { try { Object.defineProperty(window, 'indexedDB', { value: undefined, configurable: true }); } catch (e) { } });
  await p3.goto(URL_); let started = true; try { await ready(p3); } catch (e) { started = false; }
  if (started) {
    const n1 = await p3.evaluate(async () => { go('settings'); await new Promise(z => setTimeout(z, 400)); document.getElementById('stxCard').scrollIntoView(); document.getElementById('stxMeasure').click(); await new Promise(z => setTimeout(z, 900)); document.getElementById('stxPartsBox').open = true;
      return { store: IngErr.parts().find(x => x.id === 'store').ok, say: IngErr.say(new Error('this device would not keep it (its storage is full or switched off)')), ui: document.getElementById('stxParts').textContent, rows: [...document.querySelectorAll('#stxKinds li')].map(l => l.getAttribute('data-db')) }; });
    ok(n1.store === false && /cannot keep things in its own store: it may be a private window/.test(n1.say) && /Not in this copyIts own store on this device/.test(n1.ui) && n1.rows.join() === 'localStorage', 'with no IndexedDB, the missing store is named, plainly, and Storage still measures the desk', n1);
    await shot(p3, 's14-no-store');
  } else ok(false, 'the page starts in a window with no IndexedDB (not this module: the page did not get ready)');
  ok(errs3.length === 0, 'no page errors from this module without a store', errs3.slice(0, 3));
  await ctx3.close();

  // ================= 15 · nothing heavy at start: time to ready with and without the module =================
  const NO = URL_.replace(/[^\/]*$/, 'ingenium_no142.html');
  const has = await (async () => { const pp = await b.newPage(); try { const r = await pp.goto(NO); return r && r.ok(); } catch (e) { return false; } finally { await pp.close(); } })();
  if (has) { const a = [], z = []; for (let i = 0; i < 3; i++) { z.push(await timeToReady(b, NO)); a.push(await timeToReady(b, URL_)); }
    const med = x => x.slice().sort((m, n) => m - n)[1];
    ok(med(a) - med(z) < 250, 'time to ready with the module ' + med(a) + ' ms, without it ' + med(z) + ' ms', { with: a, without: z }); }
  else console.log('NOTE no ingenium_no142.html beside the page: the time-to-ready comparison was not made');

  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL crashed', e.stack); console.log(`\n${pass} passed, ${fail + 1} failed`); process.exit(1); });
