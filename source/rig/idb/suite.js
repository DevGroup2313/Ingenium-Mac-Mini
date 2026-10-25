// Ingenium's on-device library, tested the same way on every IndexedDB implementation (rig/idb/README.md).
// Plain browser JavaScript, injected into the built page after window.__ingReady. It drives the library's own public functions
// (IngRepo, IngBig, the app library and IngBuiltin, IngStore and IngErr, IngBackup, IngImport, the owner key card, Fabrica's
// Ship view, the model store) and never re-implements them; it reads a store directly only to check what the library left in it.
// Results go to window.__idbSuite.results as [{name, ok, detail, ms}]. A runner calls window.__idbSuite.run(phase):
//   'main'                       every test of one tab, in order
//   'tabs-a1', 'tabs-b1',        two tabs of the same page on one set of stores (the runner opens the second tab, runs b1 there,
//   'tabs-b-reset', 'tabs-b2',   presses Reset everything there, which deletes a store the first tab holds open, waits for that
//   'tabs-a2'                    tab to start again, runs b2 there and a2 in the first tab)
//   'quota'                      in a fresh profile whose store has a small quota (window.__idbEnv.quota, in bytes), or none
// window.__idbEnv = {impl: 'chromium' | 'webkit' | 'reference', quota: bytes or null} is set by the runner before the page loads.
(function () {
  'use strict';
  if (window.__idbSuite && window.__idbSuite.loaded) return;
  var S = window.__idbSuite = { loaded: true, results: [], running: null, finished: {}, notes: [] };
  var ENV = window.__idbEnv || {};
  var TE = new TextEncoder(), TD = new TextDecoder();
  var MB = 1048576;
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  function short(v, n) { var s; try { s = typeof v === 'string' ? v : JSON.stringify(v); } catch (e) { s = String(v); } s = String(s); return s.length > (n || 600) ? s.slice(0, n || 600) + '…' : s; }
  function note(t) { S.notes.push(t); try { console.log('[idb] ' + t); } catch (e) { } }
  async function until(fn, ms, step) { var t0 = Date.now(), v; while (Date.now() - t0 < (ms || 30000)) { try { v = await fn(); if (v) return v; } catch (e) { } await sleep(step || 200); } return null; }
  function timeout(p, ms, what) { return Promise.race([p, new Promise(function (_, rej) { setTimeout(function () { rej(new Error((what || 'it') + ' did not finish in ' + Math.round(ms / 1000) + ' s')); }, ms); })]); }
  function hex(u8) { var s = ''; for (var i = 0; i < u8.length; i++) s += (u8[i] < 16 ? '0' : '') + u8[i].toString(16); return s; }
  async function sha(x) { var u8 = typeof x === 'string' ? TE.encode(x) : (x instanceof Uint8Array ? x : new Uint8Array(x)); return AppLib.sha(u8); }
  async function blobSha(b) { return sha(new Uint8Array(await b.arrayBuffer())); }
  function rnd(n, seed) { var u = new Uint8Array(n); if (seed == null) { for (var i = 0; i < n; i += 65536) crypto.getRandomValues(u.subarray(i, Math.min(n, i + 65536))); return u; }
    var x = seed >>> 0 || 1; for (var j = 0; j < n; j++) { x ^= x << 13; x >>>= 0; x ^= x >>> 17; x ^= x << 5; x >>>= 0; u[j] = x & 255; } return u; }
  function sameBytes(a, b) { if (a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  function oldId(daysAgo, tag) { return 'big_' + (Date.now() - daysAgo * 86400000).toString(36) + (tag + 'zzzzzz').slice(0, 6); }
  // a check list: each check that fails is named in the detail; the detail of a passing test says what was measured
  function checks() { var fails = [], info = {}; var c = function (cond, what, val) { if (!cond) fails.push(what + (val !== undefined ? ' (' + short(val, 300) + ')' : '')); return !!cond; };
    c.info = function (k, v) { info[k] = v; }; c.result = function () { return { ok: !fails.length, detail: fails.length ? fails.join(' | ') : short(info) }; };
    c.fails = function () { return fails.slice(); }; S.curC = c; return c; }
  async function test(name, fn, ms) {
    var t0 = performance.now(), r; S.curC = null;
    try { r = await timeout(Promise.resolve().then(fn), ms || 300000, name); if (!r || typeof r.ok !== 'boolean') r = { ok: false, detail: 'the test gave no result' }; }
    catch (e) { var before = S.curC ? S.curC.fails() : []; var msg = e && e.message ? String(e.message) + (e.stack && String(e.stack).indexOf(e.message) < 0 ? ' ' + String(e.stack).split('\n').slice(0, 3).join(' < ') : '') : String(e && e.stack || e);
      r = { ok: false, detail: before.concat(['threw: ' + short(msg, 900)]).join(' | ') }; }
    var row = { name: name, ok: r.ok, detail: r.detail, ms: Math.round(performance.now() - t0) };
    S.results.push(row); try { console.log((row.ok ? 'PASS ' : 'FAIL ') + name + '  ' + row.detail); } catch (e) { } return row;
  }

  // ---------- reading a store directly, only to check what the library left in it ----------
  function rawOpen(name) { return new Promise(function (res) { var fresh = false, rq; try { rq = indexedDB.open(name); } catch (e) { res(null); return; }
    rq.onupgradeneeded = function () { fresh = true; try { rq.transaction.abort(); } catch (e) { } };
    rq.onsuccess = function () { var d = rq.result; if (fresh) { d.close(); res(null); return; } d.onversionchange = function () { d.close(); }; res(d); };
    rq.onerror = function (e) { try { e.preventDefault(); } catch (x) { } res(null); }; }); }
  async function rawRead(name, st, how, key) { var d = await rawOpen(name); if (!d) return how === 'get' ? undefined : []; if (!d.objectStoreNames.contains(st)) { d.close(); return how === 'get' ? undefined : []; }
    return new Promise(function (res, rej) { var t = d.transaction(st, 'readonly'), s = t.objectStore(st), r = how === 'keys' ? s.getAllKeys() : how === 'get' ? s.get(key) : how === 'count' ? s.count() : s.getAll();
      t.oncomplete = function () { d.close(); res(r.result); }; t.onabort = t.onerror = function () { d.close(); rej(t.error); }; }); }
  async function rawPut(name, st, key, val, up) { var d = await new Promise(function (res, rej) { var rq = indexedDB.open(name); rq.onupgradeneeded = function () { if (up) up(rq.result); }; rq.onsuccess = function () { res(rq.result); }; rq.onerror = function () { rej(rq.error); }; });
    return new Promise(function (res, rej) { var t = d.transaction(st, 'readwrite'); if (key === undefined) t.objectStore(st).put(val); else t.objectStore(st).put(val, key); t.oncomplete = function () { d.close(); res(true); }; t.onabort = t.onerror = function () { d.close(); rej(t.error); }; }); }
  async function dbNames() { try { return (await indexedDB.databases()).map(function (d) { return d.name; }); } catch (e) { return null; } }

  // ---------- the page ----------
  function desk() { return window.state; }
  async function libIdle() { await until(function () { return !LIB.busy; }, 120000, 250); }
  async function builtinSettled() { return until(function () { return window.__ingBuiltin && window.__ingBuiltin.states; }, 240000, 500); }
  var SAVED = [];
  function catchSaves() { window.saveFileNative = function (name, mime, data) { var size = data == null ? 0 : (data.byteLength != null ? data.byteLength : (data.size != null ? data.size : String(data).length));
    SAVED.push({ name: name, mime: mime, size: size, data: data }); return true; }; }
  function lastSaved(re) { for (var i = SAVED.length - 1; i >= 0; i--) if (re.test(SAVED[i].name)) return SAVED[i]; return null; }
  function noteText() { var n = document.getElementById('stxNote'); return n ? { role: n.getAttribute('role'), t: n.textContent } : null; }

  // ---------- zips made here, each damaged in its own way (as rig/t_61_storage.js makes them) ----------
  function crc32(u8) { return IngErr.crc32(u8); }
  async function deflateRaw(u8) { return new Uint8Array(await new Response(new Blob([u8]).stream().pipeThrough(new CompressionStream('deflate-raw'))).arrayBuffer()); }
  function le(n, b) { var a = new Uint8Array(b); for (var i = 0; i < b; i++) { a[i] = n & 255; n = Math.floor(n / 256); } return a; }
  function cat(list) { var n = 0; list.forEach(function (x) { n += x.length; }); var o = new Uint8Array(n), p = 0; list.forEach(function (x) { o.set(x, p); p += x.length; }); return o; }
  async function makeZip(files) { var parts = [], cds = [], off = 0;
    for (var i = 0; i < files.length; i++) { var f = files[i], name = TE.encode(f.name), data = TE.encode(f.data), crc = crc32(data), body = f.deflate ? await deflateRaw(data) : data, meth = f.deflate ? 8 : 0;
      var lh = cat([le(0x04034b50, 4), le(20, 2), le(0x800, 2), le(meth, 2), le(0, 2), le(0x21, 2), le(crc, 4), le(body.length, 4), le(data.length, 4), le(name.length, 2), le(0, 2)]);
      f.lho = off; f.dataAt = off + 30 + name.length; parts.push(lh, name, body); cds.push([crc, body.length, data.length, name, meth, off, f]); off += 30 + name.length + body.length; }
    var cdo = off, cdParts = [];
    cds.forEach(function (c) { c[6].cdAt = cdo; var h = cat([le(0x02014b50, 4), le(20, 2), le(20, 2), le(0x800, 2), le(c[4], 2), le(0, 2), le(0x21, 2), le(c[0], 4), le(c[1], 4), le(c[2], 4), le(c[3].length, 2), le(0, 2), le(0, 2), le(0, 2), le(0, 2), le(0, 4), le(c[5], 4)]); cdParts.push(h, c[3]); cdo += h.length + c[3].length; });
    var cd = cat(cdParts), eo = cat([le(0x06054b50, 4), le(0, 2), le(0, 2), le(files.length, 2), le(files.length, 2), le(cd.length, 4), le(off, 4), le(0, 2)]);
    return cat(parts.concat([cd, eo])); }
  function w16(u, o, v) { u[o] = v & 255; u[o + 1] = (v >> 8) & 255; }
  async function damagedZips() {
    var page = '<!doctype html><html><head><meta charset="utf-8"><title>Lumen</title></head><body><h1>Lumen</h1><script src="app.js"></script><p>' + 'Lorem ipsum dolor sit amet. '.repeat(160) + '</p></body></html>';
    var mk = function () { return [{ name: 'index.html', data: page, deflate: true }, { name: 'app.js', data: 'console.log("Lumen");\n'.repeat(200), deflate: false }, { name: 'style.css', data: 'body{color:#222}\n'.repeat(120), deflate: true }]; };
    var Z = {}, f;
    Z.good = await makeZip(mk());
    Z.cut = Z.good.slice(0, Math.floor(Z.good.length * 0.6));
    f = mk(); Z.crcBad = await makeZip(f); Z.crcBad[f[1].dataAt + 7] ^= 0x5a;
    f = mk(); Z.meth = await makeZip(f); w16(Z.meth, f[0].lho + 8, 12); w16(Z.meth, f[0].cdAt + 10, 12);
    f = mk(); Z.broken = await makeZip(f); for (var i = 0; i < 24; i++) Z.broken[f[2].dataAt + 2 + i] = 0xff;
    f = mk(); Z.locked = await makeZip(f); w16(Z.locked, f[1].lho + 6, 0x801); w16(Z.locked, f[1].cdAt + 8, 0x801);
    Z.notzip = TE.encode('<!doctype html><title>Not a zip at all</title><h1>Not a zip at all</h1>');
    return Z;
  }

  // ---------- a full store, simulated the same way on every implementation ----------
  // The next read-write transaction on the named store is refused as a full disk refuses it: once its writes have been taken,
  // and before it is committed, it is aborted, and its error is a QuotaExceededError (the shape Chromium gives when the quota is
  // reached at commit; WebKit fails the request itself, which then aborts the transaction with the same error).
  var FULL = { on: null, hits: 0 };
  (function hookFull() { try { var P = IDBObjectStore.prototype; if (P.__idbFull) return; var put = P.put, add = P.add;
    function wrap(orig) { return function () { var rq = orig.apply(this, arguments); try { var t = this.transaction, dbn = t.db && t.db.name;
        if (FULL.on && FULL.on.db === dbn && (!FULL.on.min || weigh(arguments[0]) >= FULL.on.min) && !t.__idbFull) { t.__idbFull = true; FULL.hits++; if (FULL.on.once) FULL.on = null;
          var err = new DOMException('The quota has been exceeded.', 'QuotaExceededError');
          rq.addEventListener('success', function () { try { Object.defineProperty(t, 'error', { configurable: true, get: function () { return err; }, set: function () { } }); t.abort(); } catch (e) { } }); } } catch (e) { } return rq; }; }
    P.put = wrap(put); P.add = wrap(add); P.__idbFull = true; } catch (e) { note('the full-store hook could not be set: ' + e); } })();
  // the head of a GGUF model file: its magic, version 3, no tensors, and the keys given (strings, then 32-bit numbers)
  function gguf(strs, nums) { var out = [], u32 = function (v) { out.push(le(v, 4)); }, u64 = function (v) { out.push(le(v, 8)); }, str = function (t) { var b = TE.encode(t); u64(b.length); out.push(b); };
    u32(0x46554747); u32(3); u64(0); u64(Object.keys(strs).length + Object.keys(nums).length);
    Object.keys(strs).forEach(function (k) { str(k); u32(8); str(strs[k]); }); Object.keys(nums).forEach(function (k) { str(k); u32(4); u32(nums[k]); }); return cat(out); }
  function weigh(v) { if (v == null) return 0; if (typeof v === 'string') return v.length; if (v.byteLength != null) return v.byteLength; if (v.size != null) return v.size; return 0; }

  // =====================================================================================================================
  var MAIN = [];
  function T(name, fn, ms) { MAIN.push([name, fn, ms]); }

  T('the page runs on this implementation, its stores opened', async function () {
    var c = checks();
    var isRef = !!window.__fidb;
    c(ENV.impl !== 'reference' || isRef, 'the reference implementation is in place of the browser\'s own', isRef);
    c(ENV.impl === 'reference' || !isRef, 'the browser\'s own IndexedDB is in use', isRef);
    c(window.__ingReady === true, 'the page is ready');
    var parts = window.__ingParts || {}, bad = Object.keys(parts).filter(function (k) { return parts[k] !== 'running'; });
    c(!bad.length, 'every part of the page runs', bad.map(function (k) { return k + ':' + parts[k]; }));
    c(!!(window.IngRepo && window.IngBig && window.AppLib && window.IngStore && window.IngErr && window.IngBackup && window.IngImport && window.IngBuiltin && window.PermitCore), 'the library is in the page');
    var names = await dbNames();
    c(Array.isArray(names) && names.indexOf('ingenium_files') >= 0, 'indexedDB.databases() names the model store, opened at start', names);
    c.info('impl', ENV.impl); c.info('ua', navigator.userAgent.replace(/^Mozilla\/5\.0 /, '').slice(0, 120)); c.info('stores', names);
    return c.result();
  });

  T('app library: the apps carried inside are kept on first start, never over a newer copy', async function () {
    var c = checks(), BI = IngBuiltin.meta;
    var st = await builtinSettled(); st = st ? window.__ingBuiltin.states : null;
    c(st && ['forge', 'inkwell', 'cd'].filter(function (k) { return BI[k]; }).every(function (k) { return st[k] === 'kept'; }), 'on first start each carried app is unpacked, checked and kept', st);
    c(st && /^(kept|same)$/.test(st.ingenium), 'this Ingenium keeps a copy of itself', st && st.ingenium);
    await libIdle();
    var A = libState().apps;
    for (var k of ['forge', 'inkwell', 'cd']) { if (!BI[k]) continue; var t = await libText(k), u = t == null ? null : TE.encode(t), h = u ? await sha(u) : null;
      c(u && u.length === BI[k].size && h === BI[k].sha256 && A[k].sha256 === BI[k].sha256, k + ' reads back whole from the store (size and fingerprint)', { len: u && u.length, size: BI[k].size }); }
    var me = A.ingenium, mt = me ? await libText('ingenium') : null, mu = mt ? TE.encode(mt) : null;
    c(me && mu && mu.length === me.size && (await sha(mu)) === me.sha256, 'Ingenium\'s own page (' + (me ? Math.round(me.size / MB) : '?') + ' MB) reads back whole', me && { size: me.size, len: mu && mu.length });
    var again = await IngBuiltin.seed();
    c(['forge', 'inkwell', 'cd'].filter(function (k) { return BI[k]; }).every(function (k) { return again[k] === 'same'; }), 'opened again, nothing is kept twice', again);
    // an older copy is replaced and stays one step back
    A.inkwell = Object.assign({}, A.inkwell, { version: '7.30', sha256: 'aaaa', source: 'file' });
    var older = await IngBuiltin.seed();
    c(older.inkwell === 'kept' && libState().apps.inkwell.version === BI.inkwell.version && (libState().apps.inkwell.earlier || {}).version === '7.30', 'an older Inkwell is replaced, and stays one step back', { s: older.inkwell, v: libState().apps.inkwell.version });
    // a newer copy the owner added stays
    var keep = Object.assign({}, libState().apps.forge), NEWV = String(+BI.forge.version + 1);
    libState().apps.forge = Object.assign({}, keep, { version: NEWV, build: '9s99', sha256: 'cccc', source: 'file' }); saveState();
    var newer = await IngBuiltin.seed();
    c(newer.forge === 'newer' && libState().apps.forge.version === NEWV, 'a newer Forge the owner added is never replaced', { s: newer.forge, v: libState().apps.forge.version });
    libState().apps.forge = keep; saveState();
    // bytes lost from the store are kept again
    var ref = libState().apps.inkwell.ref;
    await libTx('readwrite', function (s) { return s.delete(ref); });
    var lost = await IngBuiltin.seed();
    c(lost.inkwell === 'kept again' && (await libText('inkwell')) != null, 'a copy whose bytes were lost from the store is kept again', lost.inkwell);
    return c.result();
  }, 600000);

  T('IngRepo: create, fromFiles, put, commit, head, history, setNote, bundle, remove', async function () {
    var c = checks();
    var v1 = '<!doctype html><title>Lumen</title><h1>One</h1>', v2 = '<!doctype html><title>Lumen</title><h1>Two ✓ αβγ</h1>';
    var r = await IngRepo.fromFiles([{ path: 'index.html', data: v1 }, { path: 'css/look.css', data: 'h1{color:#432}' }], { name: 'Lumen', msg: 'First version' });
    c(r && /^repo_/.test(r.id) && /^[0-9a-f]{40}$/.test(r.commit), 'fromFiles makes a repository with a first version', r);
    c((await IngRepo.head(r.id)) === r.commit, 'head names the first version');
    await IngRepo.put(r.id, 'index.html', v2); await IngRepo.put(r.id, 'app.js', 'console.log(2)');
    var st = await IngRepo.status(r.id);
    c(st.changes.length === 2 && !st.clean, 'status shows the two changes', st.changes.map(function (x) { return x.path + ':' + x.kind; }));
    var c2 = await IngRepo.commit(r.id, 'Second version');
    c((await IngRepo.head(r.id)) === c2 && c2 !== r.commit, 'commit moves the head');
    var log = await IngRepo.log(r.id);
    c(log.length === 2 && log[0].oid === c2 && log[1].oid === r.commit && log[0].parents[0] === r.commit && /Second version/.test(log[0].title || log[0].msg), 'history: both versions, newest first, the second\'s parent the first', log.map(function (x) { return x.short + ' ' + (x.title || x.msg); }));
    c((await IngRepo.readText(r.id, 'index.html')) === v2 && (await IngRepo.readText(r.id, 'index.html', r.commit)) === v1, 'each version reads back as it was kept');
    var files = (await IngRepo.files(r.id)).map(function (f) { return f.path; }).sort();
    c(files.join() === 'app.js,css/look.css,index.html', 'files lists the working copy', files);
    var n = await IngRepo.setNote(r.id, c2, 'kits', { at: 1, size: 42 });
    var nn = await IngRepo.notes(r.id, c2);
    c(n.kits && nn.kits && nn.kits.size === 42, 'setNote keeps a note beside a version', nn);
    var other = await IngRepo.create({ name: 'Empty one' });
    c(other && (await IngRepo.list()).some(function (x) { return x.id === other.id; }), 'create makes an empty repository, listed');
    await IngRepo.rename(other.id, 'Renamed one');
    c((await IngRepo.info(other.id)).name === 'Renamed one', 'rename keeps the new name');
    var b = await IngRepo.bundle(r.id), head = TD.decode(b.subarray(0, 16));
    c(/^# v[23] git bundle/.test(head), 'bundle writes a git bundle', head);
    var imp = await IngRepo.importAny(b, { name: 'Lumen again' });
    var ilog = await IngRepo.log(imp.id);
    c(ilog.map(function (x) { return x.oid; }).join() === log.map(function (x) { return x.oid; }).join(), 'the bundle brought back in has the same history, object for object', ilog.length);
    await IngRepo.remove(other.id); await IngRepo.remove(imp.id);
    var gone = (await IngRepo.list()).map(function (x) { return x.id; });
    c(gone.indexOf(other.id) < 0 && gone.indexOf(imp.id) < 0 && gone.indexOf(r.id) >= 0, 'remove takes a repository away, and only that one');
    var err = null; try { await IngRepo.info(imp.id); } catch (e) { err = e.message; }
    c(/no longer on this device/.test(err || ''), 'a removed repository says so', err);
    S.repoLumen = r.id;
    return c.result();
  });

  T('IngRepo: a large file (40 MB) and a long text (24 MB) go in and come out unchanged', async function () {
    var c = checks(), big = rnd(40 * MB, 7), txt = ('Ingenium keeps everything on this device. αβγ 漢字 🌿\n').repeat(Math.ceil(24 * MB / 52)).slice(0, 24 * MB);
    var hBig = await sha(big), hTxt = await sha(txt);
    var t0 = Date.now();
    var r = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Big</title>' }], { name: 'Big files', msg: 'First version' });
    await IngRepo.put(r.id, 'assets/big.bin', big); await IngRepo.put(r.id, 'notes.txt', txt);
    var oid = await IngRepo.commit(r.id, 'Large files');
    c.info('in', (Date.now() - t0) + ' ms');
    IngRepo.core.use(IngRepo.core.store().be); // a new object store over the same stores: nothing comes from memory
    t0 = Date.now();
    var back = await IngRepo.read(r.id, 'assets/big.bin'), backT = await IngRepo.readText(r.id, 'notes.txt');
    c.info('out', (Date.now() - t0) + ' ms');
    c(back && back.length === big.length && (await sha(back)) === hBig, 'the 40 MB file comes out byte for byte (fingerprint)', back && back.length);
    c(backT && backT.length === txt.length && (await sha(backT)) === hTxt, 'the 24 MB text comes out character for character (fingerprint)', backT && backT.length);
    var old = await IngRepo.read(r.id, 'assets/big.bin', oid);
    c(old && old.length === big.length, 'and from its version by name');
    var recs = await rawRead('ingenium_repos', 'o', 'count');
    c(recs > 0, 'the objects are in the store', recs);
    await IngRepo.remove(r.id); var g = await IngRepo.gc();
    c(g && g.gone >= 3, 'removed, its objects are let go', g);
    return c.result();
  }, 900000);

  T('IngBig: a long text (20 MB) and its slices; a lone surrogate; the model store keeps a Blob and a File, sliced', async function () {
    var c = checks(), parts = [], i;
    for (i = 0; i < 4000; i++) parts.push('Line ' + i + ': a long attachment, with letters from afar: αβγ δ, 漢字, emoji 🌿. ');
    var unit = parts.join('\n'), text = unit.repeat(Math.ceil(20 * MB / unit.length)).slice(0, 20 * MB);
    var id = IngBig.newId();
    await IngBig.cold(id, text);
    c(IngBig.get(id) === null, 'kept cold: nothing held in memory');
    var back = await IngBig.load(id);
    c(typeof back === 'string' && back.length === text.length && back === text, 'the 20 MB text reads back the same', back && back.length);
    var cuts = [[0, 1000], [5 * MB, 5 * MB + 4096], [text.length - 777, text.length], [12345678, 12345679]];
    c(cuts.every(function (k) { return back.slice(k[0], k[1]) === text.slice(k[0], k[1]); }), 'its slices are the same, at the start, the middle and the end');
    var odd = 'before \uD800 after \uDC00 end 🌿';
    var id2 = IngBig.newId(); await IngBig.cold(id2, odd); var odd2 = await IngBig.load(id2);
    c(odd2 === odd, 'a text with a lone surrogate comes back unchanged', odd2 && Array.from(odd2).map(function (ch) { return ch.charCodeAt(0).toString(16); }).join(' '));
    var id3 = IngBig.newId(); await IngBig.put(id3, 'small'); IngBig.del(id3); await sleep(300);
    c((await IngBig.load(id3)) === null, 'a deleted text is gone');
    IngBig.del(id); IngBig.del(id2);
    // the model store (ingenium_files, "files"): a Blob and a File, kept as they are
    var bytes = rnd(30 * MB, 11), blob = new Blob([bytes], { type: 'application/octet-stream' }), hb = await sha(bytes);
    var head = gguf({ 'general.architecture': 'llama', 'general.name': 'Hearth 4B' }, { 'llama.block_count': 26, 'llama.context_length': 8192 });
    var fb = bytes.slice(0, 3 * MB); fb.set(head, 0);
    var file = new File([fb], 'hearth-4b-q4.gguf', { type: 'application/x-gguf', lastModified: 1700000000000 });
    var ok1 = await idbPut('files', 'idb_blob', blob), ok2 = await idbPut('files', 'idb_file', file);
    c(ok1 === true && ok2 === true, 'idbPut keeps a 30 MB Blob and a File', [ok1, ok2]);
    var gb = await idbGet('files', 'idb_blob'), gf = await idbGet('files', 'idb_file');
    c(gb && typeof gb.size === 'number' && gb.size === bytes.length && gb.type === 'application/octet-stream', 'the Blob comes back with its size and type', gb && [gb.size, gb.type]);
    c(gb && (await blobSha(gb)) === hb, 'its bytes are the same (fingerprint)');
    var sl = [[0, MB], [7 * MB + 3, 9 * MB], [bytes.length - 100, bytes.length]], same = true;
    for (var s of sl) { var u = new Uint8Array(await gb.slice(s[0], s[1]).arrayBuffer()); if (!sameBytes(u, bytes.subarray(s[0], s[1]))) same = false; }
    var ss = new Uint8Array(await gb.slice(MB, 2 * MB).slice(10, 20).arrayBuffer());
    c(same && sameBytes(ss, bytes.subarray(MB + 10, MB + 20)), 'its slices (and a slice of a slice) read the same bytes');
    c(gf && gf.name === 'hearth-4b-q4.gguf' && gf.lastModified === 1700000000000 && gf.size === 3 * MB && gf.type === 'application/x-gguf', 'the File keeps its name, date, size and type', gf && [gf.name, gf.lastModified, gf.size, gf.type]);
    var gg = gf ? await ggufInspect(gf) : null;
    c(gg && gg.ok === true && gg.arch === 'llama' && gg.name === 'Hearth 4B' && gg.layers === 26 && gg.ctxLen === 8192, 'the model reader reads its head from a slice of the stored File', gg);
    idbDel('files', 'idb_blob'); idbDel('files', 'idb_file'); await sleep(300);
    c((await idbGet('files', 'idb_blob')) === null, 'deleted, it is gone');
    return c.result();
  }, 900000);

  T('imported chats (r160): read, kept in the long-text store, opened, never brought in twice', async function () {
    var c = checks();
    var md = '# Best telescope for a beginner\n\n**User:** Which telescope should a beginner buy?\n\n**Assistant:** A 130 mm Dobsonian is a good start.\nIt is simple to use.\n\n**User:** And for photographs?\n' + 'Long words. '.repeat(3000) + '\n\n**Assistant:** An equatorial mount helps.\n';
    var f = await IngImport.read([new File([md], 'telescope_thread.md', { type: 'text/markdown' })]);
    c(f && f.conversations.length === 1 && f.conversations[0].messages.length === 4, 'the transcript is read: one conversation, four messages', f && f.conversations.map(function (x) { return x.title + ':' + x.messages.length; }));
    var before = (desk().chats || []).length;
    var mg = await IngImport.apply(f, {});
    c(mg.chats === 1 && mg.messages === 4, 'brought in', mg);
    var ch = desk().chats.filter(function (x) { return x.imported && /telescope/i.test(x.title || ''); })[0];
    c(ch && ch.imported.ref && !(ch.messages || []).length, 'its words wait in the long-text store, not on the desk', ch && { ref: ch.imported.ref, n: (ch.messages || []).length });
    var stored = ch ? await rawRead('ingenium_big', 't', 'get', ch.imported.ref) : null;
    c(typeof stored === 'string' && stored.indexOf('equatorial mount') > 0, 'the store holds them', stored && stored.length);
    var h = ch ? await IngImport.hydrate(ch) : null;
    c(h && ch.messages.length === 4 && /equatorial mount/.test(ch.messages[3].text) && /Long words\./.test(ch.messages[2].text || (ch.messages[2].attachRef ? 'x' : '')), 'opened, its messages come back from the store', ch && (ch.messages || []).map(function (m) { return m.role + ':' + String(m.text || '').slice(0, 30); }));
    var f2 = await IngImport.read([new File([md], 'telescope_thread.md', { type: 'text/markdown' })]);
    var again = await IngImport.apply(f2, {});
    c(again.chats === 0 && again.again === 1 && desk().chats.length === before + 1, 'the same transcript again brings nothing twice', again);
    return c.result();
  });

  T('the owner\'s key (offline_owner): made, kept under its password, signs a permission; the signing key (ingenium_keys) is made once', async function () {
    var c = checks(), PW = 'correct horse battery 42';
    catchSaves(); SAVED.length = 0;
    go('settings'); if (window.IngRooms) IngRooms.open('settings', 'own');
    var card = await until(function () { return document.getElementById('ingPermitCard'); }, 20000);
    c(!!card, 'the licence card is in Settings');
    var press = function (t) { var b = [].slice.call(document.querySelectorAll('#ingPermitCard button')).filter(function (x) { return x.textContent.trim().indexOf(t) === 0; })[0]; if (b) b.click(); return !!b; };
    var answer = async function (pw) { var ins = await until(function () { var l = document.querySelectorAll('#ingPermitCard .pc-form[role=group] input[type=password]'); return l.length ? l : null; }, 15000);
      if (!ins) return false; [].forEach.call(ins, function (i) { i.value = pw; }); [].slice.call(document.querySelectorAll('#ingPermitCard .pc-form[role=group] button')).filter(function (b) { return b.textContent === 'Go on'; })[0].click(); return true; };
    var say = function () { return (document.querySelector('#ingPermitCard .pc-say') || {}).textContent || ''; };
    c(press('Make my owner key'), 'Make my owner key is offered');
    c(await answer(PW), 'it asks for a password, twice');
    var made = await until(function () { return /owner key is made/.test(say()) ? say() : null; }, 120000);
    c(!!made, 'the key is made and kept', say());
    var sealed = await rawRead('offline_owner', 'o', 'get', 'key');
    c(sealed && sealed.kid && sealed.enc && sealed.enc.iter >= 600000 && !JSON.stringify(sealed).match(/"d":"/), 'the store holds it sealed (PBKDF2, AES-GCM), never in the clear', sealed && { kid: sealed.kid, iter: sealed.enc && sealed.enc.iter });
    var backup = lastSaved(/owner-key-.*\.ingkey$/);
    c(!!backup, 'its backup file is handed over', SAVED.map(function (x) { return x.name; }));
    var opened = null, refused = null;
    try { await PermitCore.openKey(JSON.parse(backup.data), PW); opened = true; } catch (e) { opened = e.message; }
    try { await PermitCore.openKey(sealed, 'not the password'); refused = false; } catch (e) { refused = e.message; }
    c(opened === true && /does not open/.test(refused || ''), 'the right password opens it, a wrong one does not', { opened: opened, refused: refused });
    // a permission signed with the key read back from the store
    await until(function () { return document.querySelector('#ingPermitCard form.pc-form [name=holder]'); }, 15000);
    var form = document.querySelector('#ingPermitCard form.pc-form');
    form.querySelector('[name=holder]').value = 'Test Holder';
    form.querySelectorAll('input[name=app]').forEach(function (i) { i.checked = i.value === 'ingenium'; });
    form.querySelectorAll('input[name=allow]').forEach(function (i) { i.checked = i.value === 'use'; });
    press('Sign and save the permission'); await answer(PW);
    var signed = await until(function () { return /is signed and saved/.test(say()) ? say() : null; }, 120000);
    var perm = lastSaved(/\.ingperm$/), file = perm ? JSON.parse(perm.data) : null;
    c(signed && file && file.kid === sealed.kid, 'a permission is signed and saved', say());
    var verdict = file ? await PermitCore.checkPermit(file, [{ kid: sealed.kid, jwk: sealed.pub }], [], 'ingenium') : null;
    c(verdict && verdict.state === 'valid', 'it checks as valid against the key\'s public half', verdict && verdict.state);
    var bad = file ? JSON.parse(JSON.stringify(file)) : null; if (bad) bad.permit.holder = 'Test Holdes';
    var v2 = bad ? await PermitCore.checkPermit(bad, [{ kid: sealed.kid, jwk: sealed.pub }], [], 'ingenium') : null;
    c(v2 && v2.state === 'foreign', 'changed by one letter, it is not the owner\'s', v2 && v2.state);
    var book = await rawRead('offline_owner', 'o', 'get', 'book');
    c(book && book.given && book.given.length === 1 && book.given[0].holder === 'Test Holder', 'the owner\'s book in the store records it', book && book.given);
    // the signing key for Fabrica's packages
    var k1 = await IngApk.keys.device(), k2 = await IngApk.keys.device(), raw = await rawRead('ingenium_keys', 'k', 'get', 'device');
    var u8 = function (x) { return x instanceof Uint8Array ? x : new Uint8Array(x); };
    c(k1 && k2 && sameBytes(u8(k1.pkcs8), u8(k2.pkcs8)) && raw && sameBytes(u8(raw.pkcs8), u8(k1.pkcs8)) && u8(raw.cert).length > 200, 'the device\'s signing key is made once and read back the same', raw && { pkcs8: u8(raw.pkcs8).length, cert: u8(raw.cert).length });
    go('home');
    return c.result();
  }, 400000);

  T('Fabrica\'s packages (fabrica_made): each kept, and only the three newest versions', async function () {
    var c = checks();
    catchSaves();
    var r = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Pack</title><h1>v1</h1>' }], { name: 'Pack test', msg: 'First version' });
    go('fabrica'); await sleep(1200);
    fbHubHost.FBS().sel = r.id; await fbRender(); await sleep(600);
    var commits = [r.commit];
    for (var i = 1; i <= 4; i++) {
      if (i > 1) { await IngRepo.put(r.id, 'index.html', '<!doctype html><title>Pack</title><h1>v' + i + '</h1>'); commits.push(await IngRepo.commit(r.id, 'Version ' + i)); await fbRender(); await sleep(500); }
      // the card's Make and save key (a later part of the page sets it beside the card, in the card's wrapper)
      var btn = await until(function () { var cd = document.querySelector('#fbTargets .f-tg[data-k="page"]'); var e = cd && (cd.querySelector('.foot button') || (cd.parentNode.classList.contains('fr-tgw') && cd.parentNode.querySelector('button.fr-mk'))); return e && !e.disabled ? e : null; }, 20000);
      if (!btn) { c(false, 'the one-page card offers Make and save (version ' + i + ')'); break; }
      var n0 = SAVED.length; btn.click();
      var done = await until(async function () { var m = await rawRead('fabrica_made', 'meta', 'all'); return SAVED.length > n0 && m.some(function (x) { return x.repo === r.id && x.commit === commits[i - 1]; }); }, 60000, 300);
      c(!!done, 'version ' + i + ': the page is made, saved and kept');
    }
    await sleep(800);
    var meta = (await rawRead('fabrica_made', 'meta', 'all')).filter(function (x) { return x.repo === r.id; }), keys = await rawRead('fabrica_made', 'bytes', 'keys');
    var kept = meta.map(function (x) { return x.commit; });
    c(meta.length === 3 && kept.indexOf(commits[0]) < 0 && commits.slice(1).every(function (x) { return kept.indexOf(x) >= 0; }), 'only the packages of the three newest versions stay', meta.map(function (x) { return x.commit.slice(0, 7) + ' ' + x.name; }));
    c(meta.every(function (x) { return keys.indexOf(x.key) >= 0; }) && !keys.some(function (k) { return String(k).indexOf(r.id + '|' + commits[0]) === 0; }), 'each kept package has its bytes, and the oldest\'s bytes went with it', keys.length);
    var b = meta[0] ? await rawRead('fabrica_made', 'bytes', 'get', meta[0].key) : null;
    c(b && (b.byteLength || b.length) === meta[0].size, 'its bytes are as long as its record says', b && (b.byteLength || b.length));
    go('home');
    S.repoPack = r.id;
    return c.result();
  }, 400000);

  // ---------- storage (modules/r142.js), as rig/t_61_storage.js drives it ----------
  async function keepApp(key, title, version, n) { var u = rnd(n); var h = await AppLib.sha(u); var r = await libKeep(key, { title: title, version: version, build: '', date: '', size: u.length, sha256: h, name: key + '.html', source: 'file' }, u, ''); return { r: r, h: h, ref: libState().apps[key].ref }; }
  function chain(key) { return IngStore.versions(key).map(function (v) { return { v: v.version, ref: v.ref, pin: !!v.pin }; }); }
  // what Ingenium counts as used (the browser's own count, or its own measure of the stores where the browser gives none), once it settles
  async function steady() { var a = (await IngStore.status()).usage; for (var i = 0; i < 12; i++) { await sleep(250); var b = (await IngStore.status()).usage; if (b === a) return b; a = b; } return a; }

  T('storage: each version kept, newest first; the same bytes never kept twice; measured store by store', async function () {
    var c = checks();
    window.__gcWrapped = IngBig.gc; IngBig.gc = function () { return Promise.resolve(); }; // the base's own sweep is held back while the storage tests run
    IngStore.set({ keepN: 3, auto: true, limit: null });
    var before = chain('cd').map(function (x) { return x.v; });
    S.cd = []; for (var i = 1; i <= 5; i++) { S.cd.push(await keepApp('cd', 'Carpe Diem', '200' + i, 60000 + i * 1000)); await sleep(5); }
    S.ink = await keepApp('inkwell', 'Inkwell', '9.40', 50000);
    var cc = chain('cd').map(function (x) { return x.v; });
    c(cc.slice(0, 5).join() === '2005,2004,2003,2002,2001' && cc.length === 5 + before.length, 'the library keeps each version, newest first', cc);
    var u1 = rnd(40000), h1 = await AppLib.sha(u1), u2 = rnd(41000), h2 = await AppLib.sha(u2), fb = chain('forge').length;
    await libKeep('forge', { title: 'The Forge', version: '900', size: u1.length, sha256: h1, name: 'forge.html', source: 'file' }, u1, '');
    var f1ref = libState().apps.forge.ref;
    await libKeep('forge', { title: 'The Forge', version: '901', size: u2.length, sha256: h2, name: 'forge.html', source: 'file' }, u2, '');
    await libKeep('forge', { title: 'The Forge', version: '900', size: u1.length, sha256: h1, name: 'forge.html', source: 'file' }, u1, '');
    var fc = chain('forge'), keys = await rawRead('ingenium_apps', 'b', 'keys');
    c(fc.length === 2 + fb && fc[0].v === '900' && fc[1].v === '901' && keys.indexOf(f1ref) < 0, 'the same bytes added again are not kept twice: the copy before goes, the newest stays', fc.map(function (x) { return x.v; }));
    // Fabrica's packages, the owner's work naming stored texts, and texts nothing names
    var rp = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Lumen</title>' }], { name: 'Lumen packages', msg: 'First version' }); S.rp = rp.id;
    var up = function (d) { try { d.createObjectStore('meta'); } catch (e) { } try { d.createObjectStore('bytes'); } catch (e) { } };
    S.pk = [];
    for (i = 1; i <= 5; i++) { var key = rp.id + '|c' + i + '|web|Lumen-c' + i + '.zip'; await rawPut('fabrica_made', 'meta', key, { key: key, repo: rp.id, commit: 'c' + i, kind: 'web', name: 'Lumen-c' + i + '.zip', mime: 'application/zip', size: 3000 + i, at: Date.now() - (10 - i) * 60000 }, up); await rawPut('fabrica_made', 'bytes', key, rnd(3000 + i)); S.pk.push(key); }
    for (i = 4; i <= 5; i++) { key = rp.id + '|c' + i + '|apk|Lumen.apk'; await rawPut('fabrica_made', 'meta', key, { key: key, repo: rp.id, commit: 'c' + i, kind: 'apk', name: 'Lumen.apk', mime: 'application/vnd.android.package-archive', size: 5000, at: Date.now() - (10 - i) * 60000 }); await rawPut('fabrica_made', 'bytes', key, rnd(5000)); S.pk.push(key); }
    var W = {}; ['chat', 'lxdoc', 'askv', 'run', 'code', 'codev', 'shelf', 'store'].forEach(function (k, j) { W[k] = oldId(2, 'w' + j + k); });
    for (var k in W) await IngBig.put(W[k], 'The owner\'s ' + k + ' text. ' + 'x'.repeat(2000));
    var st = desk(); st.chats = st.chats || []; st.chats.push({ id: 'chat_idb', title: 'Storage test chat', created: Date.now(), updated: Date.now(), messages: [{ role: 'me', text: 'See the file', attachRef: W.chat, attachChars: 2000 }] });
    var lx = typeof lxState === 'function' ? lxState() : (st.lector = st.lector || {}); lx.sets = lx.sets || {}; lx.runs = lx.runs || [];
    lx.sets.idb = { apps: ['cd'], purpose: 'portfolio', docs: { analysis: { ref: W.lxdoc, at: Date.now() } }, older: { analysis: [{ ref: W.askv, at: Date.now() - 1000 }] } };
    lx.runs.push({ id: 'run_idb', name: 'Storage test reading', status: 'done', partsRef: W.run, writings: {} });
    st.projects = st.projects || []; st.projects.push({ id: 'proj_idb', name: 'Storage test project', app: false, files: [{ name: 'index.html', ref: W.code, size: 2000 }], versions: [{ prev: W.codev, next: null }] });
    saveState();
    localStorage.setItem('ingenium_v4.snap2', JSON.stringify({ at: Date.now() - 50000, v: JSON.stringify({ chats: [{ id: 'gone', messages: [{ role: 'me', attachRef: W.shelf }] }] }) }));
    await rawPut('idb_probe', 's', 'note', { text: 'kept by another part: ' + W.store }, function (d) { d.createObjectStore('s'); });
    S.orph = [oldId(3, 'o1'), oldId(4, 'o2'), oldId(5, 'o3')]; for (var o of S.orph) await IngBig.put(o, 'nothing names this ' + 'y'.repeat(3000));
    S.young = IngBig.newId(); await IngBig.put(S.young, 'made a moment ago');
    S.orphLib = oldId(6, 'ol'); await rawPut('ingenium_apps', 'b', S.orphLib, rnd(7000));
    S.W = W;
    var m = await IngStore.measure(), row = function (db) { return m.dbs.filter(function (x) { return x.db === db; })[0]; };
    var libSum = ['cd', 'inkwell', 'forge', 'ingenium'].reduce(function (a, k2) { return a + IngStore.versions(k2).reduce(function (b, v) { return b + (+v.size || 0); }, 0); }, 0) + 7000;
    var lr = row('ingenium_apps'), mr = row('fabrica_made'), br = row('ingenium_big'), pr = row('idb_probe');
    c(lr && lr.bytes >= libSum && lr.bytes < libSum * 1.02, 'the app library is measured at its real size', { measured: lr && lr.bytes, expected: libSum });
    var madeN = (await rawRead('fabrica_made', 'meta', 'count')) * 2;
    c(mr && mr.n === madeN && br && br.n >= 12 && pr && pr.n === 1, 'Fabrica\'s packages, the long texts and a store Ingenium does not know are counted entry by entry', { made: mr && mr.n, expected: madeN, big: br && br.n, probe: pr && pr.n });
    return c.result();
  }, 400000);

  T('storage: Keep always, and Clean the library removes exactly what its plan lists', async function () {
    var c = checks(), W = S.W;
    var two = IngStore.versions('cd').filter(function (v) { return v.version === '2002'; })[0];
    c(IngStore.pin('cd', two.ref, true) !== false && chain('cd')[3].pin, 'Keep always marks Carpe Diem 2002');
    var plan = await IngStore.plan(), ids = plan.items.map(function (x) { return x.ref || x.key || x.id; });
    var cdOld = chain('cd').slice(4).map(function (x) { return x.ref; }), expPk = S.pk.filter(function (k) { return /\|c[12]\|web\|/.test(k); });
    var expected = [].concat(cdOld, expPk, S.orph, [S.orphLib]);
    var builtinOld = plan.items.filter(function (x) { return x.kind === 'library' && x.app !== 'cd'; }).map(function (x) { return x.ref; });
    c(expected.every(function (x) { return ids.indexOf(x) >= 0; }), 'the plan lists the old copies, the two oldest web packages, three stored texts and an app page nothing names', plan.items.map(function (x) { return x.kind + ':' + x.label; }));
    c(ids.length === expected.length + builtinOld.length, 'and nothing else', plan.items.filter(function (x) { return expected.indexOf(x.ref || x.key || x.id) < 0; }).map(function (x) { return x.label; }));
    var owner = Object.keys(W).map(function (k) { return W[k]; });
    c(owner.every(function (x) { return ids.indexOf(x) < 0; }) && ids.indexOf(S.young) < 0, 'nothing the owner\'s work names, and no text made a moment ago', owner.filter(function (x) { return ids.indexOf(x) >= 0; }));
    c(ids.indexOf(S.cd[4].ref) < 0 && ids.indexOf(S.cd[1].ref) < 0 && plan.items.every(function (x) { return x.kind !== 'package' || !/\|apk\|/.test(x.key); }), 'never the newest, never one kept always, packages beyond the newest three of each kind only');
    var ev = await IngStore.clean(plan, 'clean');
    var big = await rawRead('ingenium_big', 't', 'keys'), apps = await rawRead('ingenium_apps', 'b', 'keys'), made = await rawRead('fabrica_made', 'meta', 'keys');
    c(ev.items.length === ids.length, 'one clean removes them all', ev.items.length);
    c(S.orph.every(function (x) { return big.indexOf(x) < 0; }) && apps.indexOf(S.orphLib) < 0 && cdOld.every(function (r) { return apps.indexOf(r) < 0; }) && expPk.every(function (k) { return made.indexOf(k) < 0; }), 'exactly those are gone from the stores');
    c(chain('cd').map(function (x) { return x.v; }).join() === '2005,2004,2003,2002' && owner.every(function (x) { return big.indexOf(x) >= 0; }) && big.indexOf(S.young) >= 0, 'the newest three, the one kept always and every text the owner\'s work names stay', chain('cd').map(function (x) { return x.v; }));
    var log = IngStore.log()[0];
    c(log && log.why === 'clean' && log.items.length === ids.length, 'the log records it', log && log.items.length);
    return c.result();
  }, 300000);

  T('storage: old copies go on their own when the limit is near; calm warnings at 80 % and 95 %', async function () {
    var c = checks();
    IngErr.closeNotice();
    IngStore.set({ keepN: 2 });
    await keepApp('cd', 'Carpe Diem', '2006', 66000);
    var st = await IngStore.status();
    c(st && st.usage > 0, 'what the stores hold is counted (the browser\'s own count, or Ingenium\'s measure where the browser gives none)', st);
    IngStore.set({ limit: Math.ceil(st.usage / 0.93) });
    await IngStore.check(); await sleep(400);
    var cc = chain('cd').map(function (x) { return x.v; }), made = (await rawRead('fabrica_made', 'meta', 'keys')).filter(function (k) { return String(k).indexOf(S.rp) === 0; });
    c(cc.join() === '2006,2005,2002', 'at 90 % of the limit old versions go on their own: the newest 2 stay, and the one kept always', cc);
    c(made.filter(function (k) { return /\|web\|/.test(k); }).length === 2 && made.filter(function (k) { return /\|apk\|/.test(k); }).length === 2, 'Fabrica keeps its newest 2 packages of each app and kind', made);
    var log = IngStore.log()[0], nt = noteText();
    c(log && log.why === 'limit' && log.items.length >= 3, 'the log says room was running short', log && log.items.map(function (x) { return x.label; }));
    c(nt && /Room was running short/.test(nt.t) && /Open Storage/.test(nt.t), 'a calm notice says what went', nt && nt.t);
    var big = await rawRead('ingenium_big', 't', 'keys');
    c(Object.keys(S.W).every(function (k) { return big.indexOf(S.W[k]) >= 0; }), 'freeing room on its own never touches the owner\'s work');
    IngErr.closeNotice();
    var u = await steady(); IngStore.set({ limit: Math.ceil(u / 0.85) }); var r1 = await IngStore.check(); await sleep(300); var n1 = noteText();
    c(r1 && r1.level === 1 && n1 && n1.role === 'status' && /Storage is getting full/.test(n1.t) && /Nothing needs doing yet/.test(n1.t), 'at 80 % a calm notice: getting full, nothing needs doing yet', { level: r1 && r1.level, note: n1 && n1.t });
    u = await steady(); IngStore.set({ limit: Math.ceil(u / 0.97) }); var r2 = await IngStore.check(); await sleep(300); var n2 = noteText();
    c(r2 && r2.level === 2 && n2 && /Storage is nearly full/.test(n2.t), 'at 95 % it says nearly full', { level: r2 && r2.level, note: n2 && n2.t });
    IngErr.closeNotice(); IngStore.set({ limit: null, keepN: 3 });
    return c.result();
  }, 300000);

  T('storage: a full store (simulated) is explained at once, old copies make room, refused writes are answered', async function () {
    var c = checks();
    IngErr.closeNotice(); IngStore.set({ keepN: 1, auto: true, limit: null });
    for (var i = 1; i <= 3; i++) await keepApp('cd', 'Carpe Diem', '70' + i, 20000);
    var before = chain('cd').map(function (x) { return x.v; });
    await sleep(16000); // past the notice's quiet time
    FULL.on = { db: 'ingenium_big', min: 100000, once: true };
    var id = IngBig.newId(); await IngBig.put(id, 'z'.repeat(400000));
    var nt = await until(function () { var n = noteText(); return n && /full/.test(n.t) ? n : null; }, 30000);
    await sleep(1500); nt = noteText();
    var log = IngStore.log()[0], after = chain('cd').map(function (x) { return x.v; });
    c(FULL.hits >= 1, 'the write was refused as a full store refuses it');
    c(nt && nt.role === 'alert' && /This device's storage for Ingenium is full/.test(nt.t) && /Your own work stays/.test(nt.t), 'a write the full store refuses (caught inside IndexedDB, though the writer swallows it) is explained at once', nt && nt.t);
    var pinned = chain('cd').filter(function (x) { return x.pin; }).map(function (x) { return x.v; });
    c(log && log.why === 'full' && log.items.length >= 2 && after[0] === '703' && after.slice(1).every(function (v) { return pinned.indexOf(v) >= 0; }), 'old copies go first to make room; the newest stays, and the one kept always', { before: before, after: after, log: log && log.items.length });
    c(/^This device's storage for Ingenium is full, so this could not be kept/.test(IngErr.say(new DOMException('', 'QuotaExceededError'), { quiet: true })), 'IngErr.say(QuotaExceededError) is a plain sentence');
    // the signing key store, refused the same way, still answers (it never waits for ever)
    IngErr.closeNotice(); await sleep(15500);
    FULL.on = { db: 'ingenium_keys', once: true };
    var kr = null; try { await timeout(ktxProbe(), 20000, 'the key store'); kr = 'answered'; } catch (e) { kr = String(e.message || e); }
    c(kr === 'answered', 'a refused write to the signing key store is answered, not left waiting', kr);
    // the model store, refused the same way, says the file was not kept (it never waits for ever)
    IngErr.closeNotice(); await sleep(15500);
    FULL.on = { db: 'ingenium_files', once: true };
    var mr = null; try { mr = await timeout(idbPut('files', 'idb_full_sim', new Blob([rnd(200000)])), 20000, 'the model store'); } catch (e) { mr = String(e.message || e); }
    c(mr === false, 'a refused write to the model store is answered: not kept', mr);
    FULL.on = null; IngErr.closeNotice(); IngStore.set({ keepN: 3 });
    return c.result();
  }, 300000);
  // a key put through the key store's own path (IngApk.keys.device makes and keeps one when none is kept): the record is
  // taken away first so that the store must write
  async function ktxProbe() { var d = await rawOpen('ingenium_keys'); if (d) { await new Promise(function (res) { var t = d.transaction('k', 'readwrite'); t.objectStore('k').delete('device'); t.oncomplete = t.onabort = t.onerror = function () { d.close(); res(); }; }); }
    try { await IngApk.keys.device(); } catch (e) { } return true; }

  T('storage: damaged zips and missing parts are explained, through the real import paths', async function () {
    var c = checks(), Z = await damagedZips(), r = {};
    for (var k of ['good', 'cut', 'crcBad', 'meth', 'broken', 'locked', 'notzip']) { var x = await IngErr.zip(Z[k], k === 'notzip' ? 'Lumen.zip' : 'Lumen-' + k + '.zip'); r[k] = { ok: x.ok, kinds: x.problems.map(function (p) { return p.kind; }), files: x.problems.map(function (p) { return p.file; }), m: x.message }; }
    c(r.good.ok, 'a whole zip passes', r.good);
    c(!r.notzip.ok && r.notzip.kinds[0] === 'notzip', 'not a zip: said so', r.notzip.m);
    c(!r.cut.ok && r.cut.kinds[0] === 'short' && /cut short/.test(r.cut.m), 'cut short: said where', r.cut.m);
    c(!r.crcBad.ok && r.crcBad.kinds[0] === 'crc' && r.crcBad.files[0] === 'app.js', 'a wrong check sum names app.js', r.crcBad.m);
    c(!r.meth.ok && r.meth.kinds[0] === 'method' && r.meth.files[0] === 'index.html' && /bzip2/.test(r.meth.m), 'an unknown packing names the file and the method', r.meth.m);
    c(!r.broken.ok && /damaged|crc/.test(r.broken.kinds[0]) && r.broken.files[0] === 'style.css', 'broken packed data names style.css', r.broken);
    c(!r.locked.ok && r.locked.kinds[0] === 'locked' && r.locked.files[0] === 'app.js', 'a locked file is said to be locked', r.locked.m);
    await libIdle();
    await AppLib.addFiles([new File([Z.cut], 'Lumen-web.zip', { type: 'application/zip' }), new File([Z.crcBad], 'Lumen-kit.zip', { type: 'application/zip' })]);
    var add = window.__libLastAdd;
    c(add && add.fail.length === 2 && /incomplete: it is cut short/.test(add.fail[0]) && /app\.js.*check sum/.test(add.fail[1]), 'adding damaged zips to the library says, for each, which file and what', add && add.fail);
    var e1 = null; try { await IngRepo.importAny(Z.crcBad, { name: 'Lumen' }); e1 = 'imported'; } catch (e) { e1 = e.message; }
    c(/“app\.js” inside it: what it holds does not match its check sum/.test(e1), 'Fabrica refuses a zip with a wrong check sum before bringing anything in', e1);
    var good = null; try { var g = await IngRepo.importAny(Z.good, { name: 'LumenWhole' }); good = !!(g && (g.id || (g.summary && g.summary.id))); if (g && g.id) await IngRepo.remove(g.id); } catch (e) { good = e.message; }
    c(good === true, 'a whole zip still comes into Fabrica', good);
    var sh = document.getElementById('ing-ios-shell'), parent = sh && sh.parentNode, nx = sh && sh.nextSibling, had = window.__ingIosShell; if (sh) sh.remove(); window.__ingIosShell = undefined;
    var ipa = null; try { await IngIpa.make({ html: '<html></html>', title: 'Lumen', id: 'com.example.lumen' }); ipa = 'made'; } catch (e) { ipa = e.message; }
    var partsList = IngErr.parts().map(function (x) { return x.id + ':' + x.ok; });
    if (sh && parent) parent.insertBefore(sh, nx); window.__ingIosShell = had;
    c(/does not carry the iPhone and iPad shell/.test(ipa || '') && partsList.indexOf('iphone:false') >= 0, 'without the iPhone shell, making the app says why, and the parts list says it is missing', { ipa: ipa, parts: partsList });
    var gap = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Gap</title><script src="app.js"></script><link rel="stylesheet" href="look.css"><h1>Gap</h1>' }], { name: 'Gap', msg: 'First version' });
    ingToast('-'); await IngShip.onePage(gap.id); await sleep(150); var said = (document.getElementById('ingToast') || {}).textContent || '';
    c(/names 2 files that are not in the app: app\.js, look\.css/.test(said), 'a page that names files that are not there: the owner is told which', said);
    await IngRepo.remove(gap.id);
    return c.result();
  }, 300000);

  T('backup: made with a password, refused when damaged, restored store by store (Replace, then Merge)', async function () {
    var c = checks(), PW = 'correct horse 42';
    // what this device holds, beyond what the tests before left
    var ids = {};
    ids.big1 = IngBig.newId(); await IngBig.put(ids.big1, 'A long attachment, line by line.\n'.repeat(9000));
    ids.big2 = IngBig.newId(); await IngBig.put(ids.big2, ('A large-store entry, with letters from afar: αβγ δ, 漢字, emoji 🌿. ').repeat(52000));
    var st = desk(); st.chats = st.chats || [];
    for (var i = 0; i < 3; i++) st.chats.push({ id: 'rt_chat_' + i, title: 'Round trip ' + (i + 1), created: Date.now() - 9000 + i, messages: [{ role: 'me', text: 'Question ' + i, at: Date.now() - 6000 }, { role: 'bot', text: 'Answer ' + i + ' ✓', at: Date.now() - 5000, done: Date.now() - 5000 }] });
    st.chats[st.chats.length - 1].messages.push({ role: 'me', text: 'With a long text', at: Date.now() - 3000, attachRef: ids.big2, attachName: 'long.txt' });
    st.cloud = st.cloud || {}; st.cloud.key = 'sk-rt-cloud-456'; st.cloud.base = 'http://192.168.1.20:8080';
    var r = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Round Trip</title><h1>One</h1>' }], { name: 'Round Trip App', msg: 'First version' }); ids.repo = r.id;
    await IngRepo.put(r.id, 'index.html', '<!doctype html><title>Round Trip</title><h1>Two</h1>'); await IngRepo.commit(r.id, 'Second version');
    await IngRepo.put(r.id, 'app.js', 'console.log("three");'); await IngRepo.commit(r.id, 'Third version: a script');
    await fbHub.importAll({ kind: 'ingenium-hub', version: 1, apps: [{ id: r.id, next: 2, issues: [{ n: 1, title: 'Keep the backup whole', body: 'Byte for byte.', state: 'open', by: 'Yannie', at: Date.now(), comments: [{ by: 'Yannie', at: Date.now(), body: 'A first comment, with ünïcödé.' }], events: [], labels: ['bug'], refs: [] }], pulls: [] }] });
    await IngApk.keys.device();
    localStorage.setItem('tabula_rt_doc', JSON.stringify({ title: 'Tabula page', body: 'kept in the small store' }));
    // a store of an app carried inside, holding every kind of key, more than one batch of the backup (1,000 records)
    var KEYS = []; for (i = 0; i < 700; i++) KEYS.push(i * 3 - 1000.5);
    for (i = 0; i < 300; i++) KEYS.push(new Date(1.7e12 + i * 86400000));
    for (i = 0; i < 400; i++) KEYS.push('k' + String(i).padStart(4, '0') + (i % 7 ? '' : ' ünï'));
    for (i = 0; i < 100; i++) KEYS.push([i % 10, 'a' + i]);
    for (i = 0; i < 60; i++) KEYS.push(new Uint8Array([i, 255 - i, 7]).buffer);
    var kd = await new Promise(function (res, rej) { var rq = indexedDB.open('idb_keys_probe', 1); rq.onupgradeneeded = function () { rq.result.createObjectStore('s'); }; rq.onsuccess = function () { res(rq.result); }; rq.onerror = function () { rej(rq.error); }; });
    await new Promise(function (res, rej) { var t = kd.transaction('s', 'readwrite'), s = t.objectStore('s'); KEYS.forEach(function (k, j) { s.put({ n: j, at: Date.now() }, k); }); t.oncomplete = res; t.onerror = t.onabort = function () { rej(t.error); }; });
    kd.close();
    saveState(); await sleep(1500);
    var hold = async function () { var o = {}; o.chats = (desk().chats || []).filter(function (x) { return /^rt_/.test(x.id); }).map(function (x) { return JSON.stringify(x); });
      try { o.log = (await IngRepo.log(ids.repo)).map(function (x) { return x.oid; }).join(); o.bundle = await sha(await IngRepo.bundle(ids.repo)); } catch (e) { o.log = 'err ' + e.message; }
      try { o.hub = JSON.stringify(await fbHub.record(ids.repo)); } catch (e) { o.hub = 'err'; }
      for (var k of ['big1', 'big2']) { var t = await IngBig.load(ids[k]); o[k] = t == null ? null : t.length + ':' + await sha(t); }
      o.cloud = desk().cloud && desk().cloud.key; o.tabula = localStorage.getItem('tabula_rt_doc');
      var kk = await rawRead('idb_keys_probe', 's', 'keys'); o.order = kk.map(function (k) { return typeof k === 'number' ? 1 : k instanceof Date ? 2 : typeof k === 'string' ? 3 : k instanceof ArrayBuffer ? 4 : Array.isArray(k) ? 5 : 9; }).filter(function (t, i, a) { return i === 0 || t !== a[i - 1]; }).join('');
      o.probe = kk.length + ':' + await sha(JSON.stringify(kk.map(function (k) { return k instanceof ArrayBuffer ? 'b' + Array.from(new Uint8Array(k)).join('.') : k instanceof Date ? 'd' + k.getTime() : k; })));
      return o; };
    var before = await hold(), fpA = await IngBackup.fingerprints();
    c(before.order === '12345', 'a store holding every kind of key reads back in IndexedDB\'s order: numbers, dates, strings, binary, arrays', before.order);
    c(before.log.split(',').length === 3 && before.big2 && /Keep the backup whole/.test(before.hub), 'this device holds the round trip', { log: before.log.length, hub: before.hub.slice(0, 40) });
    var t0 = Date.now(), made = await IngBackup.make({ keys: true, password: PW, packages: true });
    c.info('make', (Date.now() - t0) + ' ms, ' + made.size + ' bytes');
    var m = made.manifest;
    c(made.blob && made.size > 1000 && m.kind === 'ingenium-backup' && m.secrets && m.secrets.kdf.iterations >= 600000, 'the backup is made, its keys locked with the password', { size: made.size, secrets: m.secrets && m.secrets.keys });
    var dbs = m.stores.map(function (d) { return d.db; });
    c(['ingenium_big', 'ingenium_repos', 'ingenium_apps', 'fabrica_made', 'idb_keys_probe'].every(function (d) { return dbs.indexOf(d) >= 0; }), 'every store goes in, the packages chosen, and a store Ingenium does not know', dbs);
    var probe = m.stores.filter(function (d) { return d.db === 'idb_keys_probe'; })[0], pf = probe && probe.stores[0];
    c(pf && pf.count === KEYS.length && pf.files.filter(function (f) { return /\.json$/.test(f); }).length >= 2, 'the store of every kind of key goes in whole, in more than one batch', pf && { count: pf.count, parts: pf.files.length });
    var bytes = new Uint8Array(await made.blob.arrayBuffer());
    var file = new File([bytes], made.name, { type: 'application/zip' });
    var b = await IngBackup.open(file);
    c(b && b.kind === 'zip' && b.parts === Object.keys(m.files).length, 'opened again, every part matches its fingerprint', b && b.parts);
    var wrong = null; try { await IngBackup.unlock(b, 'a wrong password'); wrong = 'opened'; } catch (e) { wrong = e.message; }
    c(/does not open the keys/.test(wrong || ''), 'a wrong password does not open the keys', wrong);
    var dmg = bytes.slice(); dmg[Math.floor(dmg.length / 2)] ^= 0x5a;
    var refused = null; try { await IngBackup.open(new File([dmg], 'damaged.zip')); refused = 'opened'; } catch (e) { refused = e.message; }
    c(/damaged|does not match|do not match|cannot be read/.test(refused || ''), 'one byte turned over: refused', refused);
    // what is here changes: the app goes, a text goes, the keys store loses records, the desk loses the chats
    await IngRepo.remove(ids.repo); IngBig.del(ids.big1);
    desk().chats = (desk().chats || []).filter(function (x) { return !/^rt_/.test(x.id); }); desk().cloud.key = ''; saveState();
    var pd = await rawOpen('idb_keys_probe'); await new Promise(function (res) { var t = pd.transaction('s', 'readwrite'); t.objectStore('s').delete(IDBKeyRange.upperBound(0)); t.oncomplete = t.onerror = t.onabort = function () { pd.close(); res(); }; });
    localStorage.removeItem('tabula_rt_doc'); await sleep(500);
    t0 = Date.now();
    var rep = await IngBackup.apply(b, { mode: 'replace', password: PW, reload: false });
    c.info('replace', (Date.now() - t0) + ' ms, ' + rep.records + ' records');
    c(rep && rep.ok, 'Replace puts everything back, with nothing left out', rep && rep.problems);
    await sleep(800);
    var after = await hold(), fpB = await IngBackup.fingerprints();
    ['chats', 'log', 'bundle', 'hub', 'big1', 'big2', 'cloud', 'tabula', 'probe', 'order'].forEach(function (k) { c(JSON.stringify(after[k]) === JSON.stringify(before[k]), k + ' is back as it was', { before: short(before[k], 80), after: short(after[k], 80) }); });
    var diff = ['ingenium_big/t', 'ingenium_apps/b', 'ingenium_repos/o', 'ingenium_repos/r', 'ingenium_keys/k', 'idb_keys_probe/s', 'fabrica_made/meta', 'fabrica_made/bytes'].filter(function (k) { return !fpA.stores[k] || !fpB.stores[k] || fpA.stores[k].digest !== fpB.stores[k].digest; });
    c(!diff.length && fpA.hub && fpB.hub && fpA.hub.digest === fpB.hub.digest, 'store by store, every record has the same fingerprint as before', diff.map(function (k) { return k + ' ' + (fpA.stores[k] || {}).count + '/' + (fpB.stores[k] || {}).count; }));
    // Merge: what is here now stays beside the backup's
    desk().chats.push({ id: 'rt_only_here', title: 'Only here', created: Date.now(), messages: [{ role: 'me', text: 'mine', at: Date.now() }] }); saveState();
    var mer = await IngBackup.apply(b, { mode: 'merge', reload: false });
    var mids = desk().chats.map(function (x) { return x.id; }).filter(function (x) { return /^rt_/.test(x); }).sort();
    c(mer && mer.ok && mids.join() === 'rt_chat_0,rt_chat_1,rt_chat_2,rt_only_here', 'Merge keeps what is only here beside the backup\'s', { ids: mids, problems: mer && mer.problems });
    S.backupIds = ids;
    return c.result();
  }, 900000);

  T('no page errors while the tests ran', async function () {
    var c = checks();
    var errs = (window.__idbErrors || []).filter(function (e) { return !/ResizeObserver loop/.test(e); });
    c(!errs.length, 'no page errors while the tests ran', errs.slice(0, 5));
    if (window.__gcWrapped) { IngBig.gc = window.__gcWrapped; }
    return c.result();
  });

  // =====================================================================================================================
  // two tabs of the same page on one set of stores
  var TABS = 'idb_tabs_ids';
  function tabsIds() { try { return JSON.parse(localStorage.getItem(TABS) || '{}'); } catch (e) { return {}; } }
  function setTabsIds(o) { localStorage.setItem(TABS, JSON.stringify(Object.assign(tabsIds(), o))); }
  var PHASES = {};
  PHASES['tabs-a1'] = async function () {
    await test('two tabs: the first tab writes, holding its stores open', async function () {
      var c = checks(), x = IngBig.newId(); await IngBig.put(x, 'written in the first tab ' + 'a'.repeat(5000));
      var r = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Two tabs</title>' }], { name: 'Two tabs', msg: 'From the first tab' });
      var files = await timeout(idbReady, 10000, 'the model store'); var ok = await idbPut('handles', 'idb_tab_a', { from: 'a' });
      // what the first tab's connection to the model store is told when another tab asks for the store
      S.vc = []; if (files && files.addEventListener) files.addEventListener('versionchange', function (ev) { S.vc.push({ at: Date.now(), oldVersion: ev.oldVersion, newVersion: ev.newVersion }); });
      c(!!files && ok === true, 'the first tab holds the model store open and writes to it', ok);
      setTabsIds({ x: x, repo: r.id, a1: Date.now() }); c.info('ids', tabsIds()); return c.result();
    });
  };
  PHASES['tabs-b1'] = async function () {
    await test('two tabs: what one tab writes, the other reads (texts and Fabrica\'s history), and the other way', async function () {
      var c = checks(), ids = tabsIds();
      var t = await IngBig.load(ids.x);
      c(typeof t === 'string' && /^written in the first tab/.test(t), 'the second tab reads the first tab\'s text', t && t.length);
      var list = (await IngRepo.list()).map(function (r) { return r.id; });
      c(list.indexOf(ids.repo) >= 0, 'and its repository', list.length);
      await IngRepo.put(ids.repo, 'b.txt', 'from the second tab'); var oid = await IngRepo.commit(ids.repo, 'From the second tab');
      var y = IngBig.newId(); await IngBig.put(y, 'written in the second tab');
      var h = await timeout(idbGet('handles', 'idb_tab_a'), 10000, 'the model store');
      c(h && h.from === 'a', 'the second tab reads the model store the first tab holds open', h);
      setTabsIds({ y: y, bCommit: oid }); return c.result();
    });
  };
  PHASES['tabs-b-reset'] = async function () {
    // Settings, Reset everything: it deletes the model store (which the first tab holds open) and starts this tab again
    go('settings'); await sleep(400);
    var b = document.getElementById('resetAll'); if (!b) throw new Error('no Reset everything key');
    setTabsIds({ resetAt: Date.now(), del: {} });
    var del0 = IDBFactory.prototype.deleteDatabase;
    IDBFactory.prototype.deleteDatabase = function (name) { var rq = del0.apply(this, arguments), t0 = Date.now();
      var mark = function (k) { var o = tabsIds(); o.del = o.del || {}; var e = o.del[name] = o.del[name] || {}; e[k] = Date.now() - t0; setTabsIds({ del: o.del }); };
      rq.addEventListener('blocked', function () { mark('blocked'); }); rq.addEventListener('success', function () { mark('success'); }); rq.addEventListener('error', function () { mark('error'); }); return rq; };
    b.click(); var go2 = await until(function () { return document.getElementById('rGo'); }, 5000); go2.click();
  };
  PHASES['tabs-b2'] = async function () {
    await test('two tabs: another tab\'s Reset everything deletes a store this tab holds open: not blocked, nothing else lost', async function () {
      var c = checks(), ids = tabsIds();
      var del = (ids.del || {}).ingenium_files || {};
      c(typeof del.success === 'number' && del.blocked === undefined, 'the delete of the model store went through, never blocked by the other tab', del);
      var db = null; try { db = await timeout(Promise.resolve(idbReady), 30000, 'the model store after the reset'); } catch (e) { db = e.message; }
      c(db && typeof db === 'object', 'after the reset this tab opens the model store again (the delete was not left blocked by the other tab)', typeof db === 'string' ? db : !!db);
      var h = typeof db === 'object' && db ? await idbGet('handles', 'idb_tab_a') : 'not open';
      c(h === null, 'the model store was emptied, as Reset everything says', h);
      var t = await IngBig.load(ids.x), y = await IngBig.load(ids.y), log = (await IngRepo.log(ids.repo)).map(function (x) { return x.oid; });
      c(/^written in the first tab/.test(t || '') && y === 'written in the second tab' && log[0] === ids.bCommit && log.length === 2, 'the long texts and Fabrica\'s history are all still here', { t: !!t, y: y, log: log.length });
      var ok = typeof db === 'object' && db ? await idbPut('handles', 'idb_tab_b2', { from: 'b2' }) : false;
      c(ok === true, 'this tab writes to the new model store', ok); return c.result();
    }, 120000);
  };
  PHASES['tabs-a2'] = async function () {
    await test('two tabs: the first tab let the other delete its store, and keeps working with the new one', async function () {
      var c = checks(), ids = tabsIds();
      c((S.vc || []).length >= 1 && S.vc[0].newVersion === null, 'the first tab\'s connection was told of the delete (versionchange, no new version)', S.vc);
      var ok = await timeout(idbPut('handles', 'idb_tab_a2', { from: 'a2' }), 20000, 'a write to the model store').catch(function (e) { return e.message; });
      c(ok === true, 'a write to the model store after the other tab\'s reset is kept (the first tab reopened it)', ok);
      var b2 = await timeout(idbGet('handles', 'idb_tab_b2'), 20000, 'a read').catch(function (e) { return e.message; });
      c(b2 && b2.from === 'b2', 'and it reads what the second tab wrote there', b2);
      var y = await IngBig.load(ids.y), log = (await IngRepo.log(ids.repo)).map(function (x) { return x.oid; });
      c(y === 'written in the second tab' && log[0] === ids.bCommit, 'it reads the second tab\'s text and version', { y: y, log: log.length });
      var z = IngBig.newId(); await IngBig.put(z, 'after'); IngBig.get(z);
      var back = await rawRead('ingenium_big', 't', 'get', z);
      c(back === 'after', 'its own writes still reach the store', back);
      return c.result();
    }, 120000);
  };

  // =====================================================================================================================
  // the implementation's own quota, in a fresh profile (window.__idbEnv.quota: the bytes the runner gave the origin, or null
  // where the implementation keeps no quota, as fake-indexeddb, which keeps everything in memory)
  PHASES.quota = async function () {
    await test('quota: the implementation\'s own limit: a write it refuses is explained, old copies make room, every store still answers', async function () {
      var c = checks(), Q = ENV.quota || null;
      await builtinSettled(); await libIdle();
      IngStore.set({ keepN: 1, auto: true, limit: null });
      for (var i = 1; i <= 4; i++) await keepApp('cd', 'Carpe Diem', '70' + i, 1500000);
      var before = chain('cd').map(function (x) { return x.v; });
      var est = (navigator.storage && navigator.storage.estimate) ? await navigator.storage.estimate() : { usage: null, quota: null };
      c(chain('cd').length >= 4, 'four versions of an app kept', chain('cd').map(function (x) { return x.v; }));
      c.info('quota', Q); c.info('estimate', { usage: est.usage, quota: est.quota });
      await sleep(16000);
      var id = IngBig.newId(), s = '', rr = rnd(9000000);
      for (i = 0; i < rr.length; i += 30000) s += btoa(String.fromCharCode.apply(null, rr.subarray(i, i + 30000)));
      await IngBig.put(id, s);
      var nt = await until(function () { var n = noteText(); return n && /full/.test(n.t) ? n : null; }, Q ? 30000 : 6000);
      await sleep(2000); nt = noteText();
      var log = IngStore.log()[0], after = chain('cd').map(function (x) { return x.v; }), stored = await rawRead('ingenium_big', 't', 'get', id);
      if (Q) {
        c(nt && nt.role === 'alert' && /This device's storage for Ingenium is full/.test(nt.t), 'the write the store refused is explained at once', nt && nt.t);
        c(log && log.why === 'full' && after.length === 1 && after[0] === '704', 'old copies go first to make room (the newest stays)', { after: after, log: log && log.items.length });
        c(stored === undefined, 'the refused text is not in the store', stored && stored.length);
      } else {
        c(!nt, 'with no quota, nothing is said to be full', nt && nt.t);
        c(typeof stored === 'string' && stored.length === s.length && after.join() === before.join(), 'the text is kept and nothing is removed', { stored: stored && stored.length, before: before, after: after });
      }
      // every store answers a write while full: none is left waiting for ever
      IngErr.closeNotice();
      var answers = {};
      var probe = async function (name, fn) { try { await timeout(Promise.resolve().then(fn), 20000, name); answers[name] = 'answered'; } catch (e) { var m = e && e.message ? String(e.message) : String(e); answers[name] = /did not finish/.test(m) ? 'no answer' : 'refused: ' + (e && e.name ? e.name + ': ' : '') + m.slice(0, 70); } };
      var pad = btoa(String.fromCharCode.apply(null, rnd(30000))).repeat(60);
      await probe('long texts', function () { return IngBig.put(IngBig.newId(), pad); });
      await probe('app library', function () { return libPut(IngBig.newId(), TE.encode(pad), pad); });
      await probe('Fabrica', function () { return IngRepo.fromFiles([{ path: 'big.txt', data: pad }], { name: 'Full', msg: 'x' }); });
      await probe('signing keys', ktxProbe);
      await probe('owner key', function () { return PermitCore.makeKey('a long enough password').then(function (k) { return rawPut('offline_owner', 'o', 'probe', Object.assign(k, { pad: pad })); }); });
      await probe('model store', function () { return idbPut('files', 'idb_full', new Blob([TE.encode(pad)])); });
      c(Object.keys(answers).every(function (k) { return answers[k] !== 'no answer'; }), 'every store answers a write (kept, or refused), none waits for ever', answers);
      c(Object.keys(answers).every(function (k) { return !/^refused: (null|undefined)/.test(answers[k]); }), 'a store that refuses a write says why (never with nothing)', answers);
      if (Q) c(Object.keys(answers).every(function (k) { return answers[k] === 'answered' || /full|quota/i.test(answers[k]); }), 'each refusal is a full store, in words Ingenium can explain', answers);
      c.info('answers', answers);
      var f4 = null; await libIdle();
      if (Q) { var big = new Uint8Array(11000000); big.set(TE.encode('<!doctype html><html><head><title>Inkwell</title></head><body>')); big.set(rnd(10000000), 100);
        await sleep(16000); await AppLib.addFiles([new File([big], 'Inkwell.html', { type: 'text/html' })]); f4 = window.__libLastAdd && window.__libLastAdd.fail;
        c(f4 && f4.length === 1 && /Inkwell\.html \(This device's storage for Ingenium is full/.test(f4[0]), 'adding an app to a full library says the store is full, not a raw error', f4); }
      var errs = (window.__idbErrors || []).filter(function (e) { return !/ResizeObserver loop/.test(e); });
      c(!errs.length, 'no page errors with the store full', errs.slice(0, 3));
      return c.result();
    }, 600000);
  };

  // =====================================================================================================================
  S.run = function (phase) {
    if (S.running) return S.running;
    S.finished[phase] = false;
    S.running = (async function () {
      // the apps carried inside are kept a few seconds after every start: that work is let finish first, so it never lands mid-test
      if (phase === 'main' || phase === 'quota') { await builtinSettled(); await libIdle(); }
      if (phase === 'main') { for (var i = 0; i < MAIN.length; i++) { if (S.only && !S.only.test(MAIN[i][0])) continue; await test(MAIN[i][0], MAIN[i][1], MAIN[i][2]); } }
      else if (PHASES[phase]) await PHASES[phase]();
      else throw new Error('no phase ' + phase);
    })().then(function () { S.finished[phase] = true; S.running = null; return S.results.length; }, function (e) { S.finished[phase] = 'error: ' + (e && e.message || e); S.running = null; throw e; });
    return S.running;
  };
  S.names = function () { return MAIN.map(function (x) { return x[0]; }); };
})();
