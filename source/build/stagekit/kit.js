/* ============ INGENIUM'S STAGE KIT (Ingenium 7.69, 22 November 2026) ============
   Her words (22 November 2026): "I have never been able to open and view the Lakay app in the Live Preview panel inside of
   Ingenium, it stays stuck on the Introduction door ... please properly trace the cause of this issue and fix it at the root
   for all of the apps inside of Ingenium both present and future apps that I make and any other user makes so that every app
   actually open inside of the Live Preview panel and is interactive and easy to navigate and use".
   The cause, traced: a page in Ingenium's preview runs in a sandboxed frame with no origin of its own (so it can never reach
   Ingenium's own stores). In such a frame the browser refuses every store a page can keep: its local storage (Ingenium has
   stood in for that one since R82), and also its database (IndexedDB: "IDBFactory.open() called in an invalid security
   context" on a Mac, "access to the Indexed Database API is denied in this context" in Chrome), its cookies, its cache of
   files, its service worker, its storage manager and its locks. Lakay keeps its books in IndexedDB and stops at its door;
   Clavis keeps its things in local storage and opens. Two more things break any app there: a link to a part of the page
   ("#prices") resolves against Ingenium's own address and loads Ingenium inside the frame, and a file the app saves (a
   backup, an export) is not allowed to download.
   This kit runs first in such a frame, before the page's own code, and stands in for each of them:
   - IndexedDB, in full: fake-indexeddb 6.2.8 (Apache-2.0, see fake-indexeddb/LICENSE), in memory; where Ingenium keeps
     the page's things (the stage), each database is handed to Ingenium after every change and given back the next time
     the page runs, so Lakay's books are still there after an edit;
   - cookies, a cache of files, a quiet service worker, a storage manager and locks of its own;
   - links to a part of the page, and history entries for one, stay in the page; a form that names nowhere to go stays;
   - a file the page saves is handed to Ingenium, which saves it as it saves its own (the computer's save dialog).
   The page never reaches Ingenium's own stores: everything it keeps travels as data, and only to the place it came from. */
import FDBFactory from "./fake-indexeddb/esm/FDBFactory.js";
import FDBCursor from "./fake-indexeddb/esm/FDBCursor.js";
import FDBCursorWithValue from "./fake-indexeddb/esm/FDBCursorWithValue.js";
import FDBDatabase from "./fake-indexeddb/esm/FDBDatabase.js";
import FDBIndex from "./fake-indexeddb/esm/FDBIndex.js";
import FDBKeyRange from "./fake-indexeddb/esm/FDBKeyRange.js";
import FDBObjectStore from "./fake-indexeddb/esm/FDBObjectStore.js";
import FDBOpenDBRequest from "./fake-indexeddb/esm/FDBOpenDBRequest.js";
import FDBRecord from "./fake-indexeddb/esm/FDBRecord.js";
import FDBRequest from "./fake-indexeddb/esm/FDBRequest.js";
import FDBTransaction from "./fake-indexeddb/esm/FDBTransaction.js";
import FDBVersionChangeEvent from "./fake-indexeddb/esm/FDBVersionChangeEvent.js";
import Database from "./fake-indexeddb/esm/lib/Database.js";
import ObjectStore from "./fake-indexeddb/esm/lib/ObjectStore.js";
import Index from "./fake-indexeddb/esm/lib/Index.js";

var W = window, DOC = document, NAV = navigator;
if (!W.__ingKitOn) {
W.__ingKitOn = 1;
var OPTS = {}, SEED = null;
try { OPTS = W.__ING_KIT_OPTS || {}; SEED = W.__ING_STAGE_KIT_SEED || null; } catch (e) { }
try { delete W.__ING_KIT_OPTS; delete W.__ING_STAGE_KIT_SEED; } catch (e) { }
var PERSIST = !!OPTS.persist, RELAY = !!OPTS.relay;
var hasOwn = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
function say(level, text) { try { (console[level] || console.log).call(console, "Ingenium: " + text); } catch (e) { } }
function domErr(msg, name) { try { return new DOMException(msg, name); } catch (e) { var x = new Error(msg); x.name = name; return x; } }
function define(o, k, v) {
  try { Object.defineProperty(o, k, { value: v, configurable: true, writable: true, enumerable: false }); return o[k] === v; }
  catch (e) { try { o[k] = v; return o[k] === v; } catch (e2) { return false; } }
}
function tell(m, transfer) { try { if (transfer) parent.postMessage(m, "*", transfer); else parent.postMessage(m, "*"); } catch (e) { } }
function tellKit(m) { if (!PERSIST) return; m.__ingKit = 1; tell(m); }

/* Is this page in a frame with no origin of its own? Then no store of the browser's will work here. */
var OPAQUE = (function () {
  try { if (typeof W.origin === "string") return W.origin === "null"; } catch (e) { }
  try { var r = W.indexedDB.open("__ingenium_probe__"); try { W.indexedDB.deleteDatabase("__ingenium_probe__"); } catch (e) { } return !r; } catch (e) { return true; }
})();

/* ---------- 1. what a page keeps, as text: every kind of value IndexedDB keeps, and back ---------- */
var TAG = Object.prototype.toString;
var VIEWS = ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array",
  "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array"];
var ERRS = { EvalError: EvalError, RangeError: RangeError, ReferenceError: ReferenceError, SyntaxError: SyntaxError, TypeError: TypeError, URIError: URIError };
function b64(u8) { var s = "", CH = 0x8000; for (var i = 0; i < u8.length; i += CH) s += String.fromCharCode.apply(null, u8.subarray(i, i + CH)); return btoa(s); }
function unb64(t) { var s = atob(String(t || "")), u = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; }
var BLOBS = new WeakMap();   /* a file or blob → its bytes in base64, read once */
/* A key the page made (CryptoKey) cannot be written as text when it is not extractable (Lakay keeps such keys): it travels as a
   key, by its number, beside the text, and Ingenium keeps it as the browser keeps keys (never readable as bytes). */
var KEYID = new Map(), KEYOF = new Map(), NEXTKEY = 1;
function keyId(k) { var i = KEYID.get(k); if (i === undefined) { i = NEXTKEY++; KEYID.set(k, i); KEYOF.set(i, k); } return i; }
function kindOf(v) { return TAG.call(v).slice(8, -1); }
function Enc() { this.seen = new Map(); this.ids = new Map(); this.n = 0; this.want = []; this.keys = []; }
/* first pass: which objects appear more than once (shared, or in a cycle) */
Enc.prototype.count = function (v) {
  if (v === null || typeof v !== "object") return;
  var c = this.seen.get(v); if (c) { this.seen.set(v, c + 1); return; }
  this.seen.set(v, 1);
  var k = kindOf(v), self = this, i, ks;
  if (k === "Map") { v.forEach(function (val, key) { self.count(key); self.count(val); }); return; }
  if (k === "Set") { v.forEach(function (val) { self.count(val); }); return; }
  if (k === "DataView" || VIEWS.indexOf(k) >= 0) { this.count(v.buffer); return; }
  if (k === "FileList") { for (i = 0; i < v.length; i++) this.count(v[i]); return; }
  if (Array.isArray(v) || k === "Object") { ks = Object.keys(v); for (i = 0; i < ks.length; i++) this.count(v[ks[i]]); }
};
Enc.prototype.enc = function (v) {
  var t = typeof v;
  if (v === null || t === "string" || t === "boolean") return v;
  if (t === "number") {
    if (v !== v) return { $: "n", v: "NaN" }; if (v === Infinity) return { $: "n", v: "Infinity" }; if (v === -Infinity) return { $: "n", v: "-Infinity" };
    if (v === 0 && 1 / v < 0) return { $: "n", v: "-0" }; return v;
  }
  if (t === "bigint") return { $: "bi", v: String(v) };
  if (t !== "object") return { $: "u" };
  if (this.seen.get(v) > 1) {
    var id = this.ids.get(v); if (id !== undefined) return { $: "r", i: id };
    id = this.n++; this.ids.set(v, id); return { $: "r!", i: id, v: this.body(v) };
  }
  return this.body(v);
};
Enc.prototype.body = function (v) {
  var k = kindOf(v), self = this, i, a, ks, o;
  switch (k) {
    case "Date": var tm = v.getTime(); return { $: "d", v: tm === tm ? tm : null };
    case "RegExp": return { $: "re", s: v.source, f: v.flags };
    case "Boolean": return { $: "B", v: v.valueOf() };
    case "Number": return { $: "N", v: this.enc(v.valueOf()) };
    case "String": return { $: "S", v: v.valueOf() };
    case "BigInt": return { $: "BI", v: String(v.valueOf()) };
    case "ArrayBuffer": return { $: "ab", b: b64(new Uint8Array(v)) };
    case "DataView": return { $: "dv", b: this.enc(v.buffer), o: v.byteOffset, l: v.byteLength };
    case "Blob": case "File":
      var d = BLOBS.get(v); if (d === undefined) { this.want.push(v); d = ""; }
      return k === "File" ? { $: "f", t: v.type, b: d, n: v.name, m: v.lastModified } : { $: "bl", t: v.type, b: d };
    case "FileList": a = []; for (i = 0; i < v.length; i++) a.push(this.enc(v[i])); return { $: "fl", v: a };
    case "ImageData": return { $: "img", w: v.width, h: v.height, b: b64(new Uint8Array(v.data.buffer, v.data.byteOffset, v.data.byteLength)) };
    case "Map": a = []; v.forEach(function (val, key) { a.push([self.enc(key), self.enc(val)]); }); return { $: "m", v: a };
    case "Set": a = []; v.forEach(function (val) { a.push(self.enc(val)); }); return { $: "s", v: a };
    case "Error": return { $: "e", n: String(v.name), m: String(v.message), s: v.stack ? String(v.stack) : "" };
    case "CryptoKey": i = keyId(v); if (this.keys.indexOf(i) < 0) this.keys.push(i); return { $: "ck", i: i };
  }
  if (VIEWS.indexOf(k) >= 0) return { $: "ta", t: k, b: this.enc(v.buffer), o: v.byteOffset, l: v.length };
  if (Array.isArray(v)) {
    a = new Array(v.length);
    for (i = 0; i < v.length; i++) a[i] = hasOwn(v, i) ? this.enc(v[i]) : { $: "h" };
    return a;
  }
  o = {}; ks = Object.keys(v);
  for (i = 0; i < ks.length; i++) o[ks[i]] = this.enc(v[ks[i]]);
  return hasOwn(o, "$") ? { $: "o", v: o } : o;
};
function Dec(keys) { this.refs = []; this.keys = keys || {}; }
Dec.prototype.dec = function (x) {
  if (x === null || typeof x !== "object") return x;
  if (Array.isArray(x)) return this.body(x);
  switch (x.$) {
    case undefined: return this.body(x);
    case "n": return Number(x.v);
    case "u": return undefined;
    case "bi": return BigInt(x.v);
    case "r": return this.refs[x.i];
    case "r!": return this.body(x.v, x.i);
  }
  return this.body(x);
};
Dec.prototype.put = function (o, k, v) {
  if (k === "__proto__") Object.defineProperty(o, k, { value: v, writable: true, enumerable: true, configurable: true }); else o[k] = v;
};
Dec.prototype.body = function (x, id) {
  var self = this, out, i, C, buf;
  function made(v) { if (id !== undefined) self.refs[id] = v; return v; }
  if (Array.isArray(x)) {
    out = made(new Array(x.length));
    for (i = 0; i < x.length; i++) { var e = x[i]; if (e && typeof e === "object" && !Array.isArray(e) && e.$ === "h") continue; out[i] = this.dec(e); }
    return out;
  }
  if (x.$ === undefined || x.$ === "o") {
    var src = x.$ === "o" ? x.v : x; out = made({});
    for (var k in src) if (hasOwn(src, k)) this.put(out, k, this.dec(src[k]));
    return out;
  }
  switch (x.$) {
    case "d": return made(new Date(x.v === null ? NaN : x.v));
    case "re": return made(new RegExp(x.s, x.f));
    case "B": return made(Object(!!x.v));
    case "N": return made(Object(this.dec(x.v)));
    case "S": return made(Object(String(x.v)));
    case "BI": return made(Object(BigInt(x.v)));
    case "ab": return made(unb64(x.b).buffer);
    case "dv": buf = this.dec(x.b); return made(new DataView(buf, x.o, x.l));
    case "ta": C = W[x.t]; buf = this.dec(x.b); return made(C ? new C(buf, x.o, x.l) : new Uint8Array(buf, x.o, x.l));
    case "bl": out = new Blob([unb64(x.b)], { type: x.t || "" }); BLOBS.set(out, x.b || ""); return made(out);
    case "f":
      try { out = new File([unb64(x.b)], x.n || "file", { type: x.t || "", lastModified: x.m }); }
      catch (e) { out = new Blob([unb64(x.b)], { type: x.t || "" }); }
      BLOBS.set(out, x.b || ""); return made(out);
    case "fl": out = made([]); for (i = 0; i < x.v.length; i++) out.push(this.dec(x.v[i])); return out;
    case "img": try { return made(new ImageData(new Uint8ClampedArray(unb64(x.b).buffer), x.w, x.h)); } catch (e) { return made(null); }
    case "m": out = made(new Map()); for (i = 0; i < x.v.length; i++) out.set(this.dec(x.v[i][0]), this.dec(x.v[i][1])); return out;
    case "s": out = made(new Set()); for (i = 0; i < x.v.length; i++) out.add(this.dec(x.v[i])); return out;
    case "e": C = ERRS[x.n] || Error; out = new C(x.m); try { if (x.s) out.stack = x.s; } catch (e) { } return made(out);
    case "ck": out = this.keys[x.i]; if (out) { KEYID.set(out, x.i); KEYOF.set(x.i, out); if (x.i >= NEXTKEY) NEXTKEY = x.i + 1; } return made(out === undefined ? null : out);
  }
  return made(undefined);
};
function readBlob(b) {
  return new Promise(function (res) {
    try { var fr = new FileReader(); fr.onload = function () { res(b64(new Uint8Array(fr.result))); }; fr.onerror = function () { res(""); }; fr.readAsArrayBuffer(b); }
    catch (e) { res(""); }
  });
}

/* ---------- 2. IndexedDB ---------- */
var IDB = null, ROWS = new WeakMap(), WANT = [];
function restoreAll(map, keys) {
  if (!map || typeof map !== "object") return;
  keys = keys && typeof keys === "object" ? keys : {};
  Object.keys(map).forEach(function (name) {
    try {
      var snap = JSON.parse(map[name]); if (!snap || snap.v !== 1 || !(snap.version > 0)) return;
      var kk = keys[name] && typeof keys[name] === "object" ? keys[name] : {};
      var db = new Database(name, snap.version);
      (snap.stores || []).forEach(function (s) {
        var os = new ObjectStore(db, s.n, s.kp === undefined ? null : s.kp, !!s.ai);
        if (os.keyGenerator && typeof s.kg === "number") os.keyGenerator.num = s.kg;
        db.rawObjectStores.set(s.n, os);
        var recs = [];
        (s.rows || []).forEach(function (r) { var d = new Dec(kk), rec = { key: d.dec(r[0]), value: d.dec(r[1]) }; os.records.put(rec); recs.push(rec); });
        (s.ix || []).forEach(function (x) {
          var ix = new Index(os, x[0], x[1], !!x[2], !!x[3]); ix.initialized = true; os.rawIndexes.set(x[0], ix);
          recs.forEach(function (rec) { try { ix.storeRecord(rec); } catch (e) { } });
        });
      });
      IDB._databases.set(name, db);
    } catch (e) { say("warn", "what this page kept in its database “" + name + "” could not be read back (" + (e && e.message) + "); it starts afresh."); }
  });
}
var USED = [];   /* the numbers of the keys the rows of the database being written use */
function rowText(rec) {
  var c = ROWS.get(rec);
  if (c === undefined) {
    var e = new Enc(); e.count(rec.key); e.count(rec.value);
    var t = JSON.stringify([e.enc(rec.key), e.enc(rec.value)]);
    if (e.want.length) { WANT.push.apply(WANT, e.want); return null; }
    c = { t: t, k: e.keys }; ROWS.set(rec, c);
  }
  for (var i = 0; i < c.k.length; i++) if (USED.indexOf(c.k[i]) < 0) USED.push(c.k[i]);
  return c.t;
}
function snapText(db) {
  WANT = []; USED = []; var parts = [];
  db.rawObjectStores.forEach(function (os, name) {
    if (os.deleted) return;
    var rows = [], it = os.records.values()[Symbol.iterator](), st;
    while (!(st = it.next()).done) { var t = rowText(st.value); if (t !== null) rows.push(t); }
    var ix = []; os.rawIndexes.forEach(function (x, n) { if (!x.deleted) ix.push([n, x.keyPath, !!x.multiEntry, !!x.unique]); });
    parts.push('{"n":' + JSON.stringify(name) + ',"kp":' + JSON.stringify(os.keyPath === undefined ? null : os.keyPath) + ',"ai":' + (os.autoIncrement ? "true" : "false")
      + ',"kg":' + (os.keyGenerator ? os.keyGenerator.num : 0) + ',"ix":' + JSON.stringify(ix) + ',"rows":[' + rows.join(",") + "]}");
  });
  if (WANT.length) return null;
  return '{"v":1,"version":' + db.version + ',"stores":[' + parts.join(",") + "]}";
}
var DIRTY = {}, TIMER = 0, TOLD = false, LAST = {}, CAP = 64 * 1024 * 1024, BIG = {}, PACE = 120;   /* a large database is handed over less often */
function busy(db) { return db.transactions.some(function (t) { return t._started && t._state !== "finished" && t.mode !== "readonly"; }); }
function dirty(name) {
  if (!PERSIST || !SEEDED) return;
  DIRTY[name] = 1;
  if (!TOLD) { TOLD = true; tellKit({ op: "dirty" }); }
  if (!TIMER) TIMER = setTimeout(flush, PACE);
}
function flush() {
  TIMER = 0; var names = Object.keys(DIRTY), waits = [], later = false;
  names.forEach(function (name) {
    var db = IDB._databases.get(name);
    if (!db || !(db.version > 0)) { delete DIRTY[name]; return; }
    if (busy(db)) { later = true; return; }
    var t = snapText(db);
    if (t === null) { var want = WANT.slice(); waits.push(Promise.all(want.map(function (b) { return readBlob(b).then(function (s) { BLOBS.set(b, s); }); }))); later = true; return; }
    delete DIRTY[name];
    if (LAST[name] === t) return;
    if (t.length > CAP) { if (!BIG[name]) { BIG[name] = 1; tellKit({ op: "big", name: name, bytes: t.length }); } return; }
    var ks = {}; USED.forEach(function (i) { var k = KEYOF.get(i); if (k) ks[i] = k; });
    LAST[name] = t; tellKit({ op: "db", name: name, text: t, keys: ks });
    PACE = Math.min(3000, Math.max(120, Math.round(t.length / 25000)));
  });
  if (waits.length) Promise.all(waits).then(function () { if (!TIMER) TIMER = setTimeout(flush, 0); });
  else if (later) { if (!TIMER) TIMER = setTimeout(flush, PACE); }
  else { TOLD = false; tellKit({ op: "clean" }); }
}
function dropped(name) { if (!PERSIST || !SEEDED) return; delete DIRTY[name]; delete LAST[name]; tellKit({ op: "drop", name: name }); }
var SEEDED = false, GATE = null, OPENGATE = null;
function installIdb() {
  IDB = new FDBFactory();
  var FP = FDBFactory.prototype, oOpen = FP.open, oDel = FP.deleteDatabase, oList = FP.databases, DP = FDBDatabase.prototype, oTx = DP.transaction;
  if (PERSIST) {
    /* What the page kept comes back by message (keys and all), so every open, deletion and list waits for it: the library runs
       each database's work in a queue of its own, and here a queue not yet made starts behind the gate. */
    GATE = new Promise(function (res) { OPENGATE = res; });
    var q = new Map(), oGet = q.get;
    q.get = function (name) { var v = oGet.call(q, name); return v === undefined && OPENGATE ? GATE : v; };
    IDB._connectionQueues = q;
    FP.databases = function () { var self = this, a = arguments; return (OPENGATE ? GATE : Promise.resolve()).then(function () { return oList.apply(self, a); }); };
    var open = function (seed) {
      if (!OPENGATE) return;
      if (seed && seed.none) { /* Ingenium keeps nothing for this page: what it keeps lasts while it is open */ }
      else if (seed) { try { restoreAll(seed.idb, seed.keys); SEEDED = true; } catch (e) { say("warn", "what this page kept could not be read back (" + (e && e.message) + ")."); } }
      else say("warn", "Ingenium did not hand back what this page kept, so what it keeps now lasts only while it is open.");
      var o = OPENGATE; OPENGATE = null; o();
    };
    ONSEED = open;
    setTimeout(function () { open(null); }, 6000);
    tellKit({ op: "hello" });
  }
  FP.open = function (name) {
    var req = oOpen.apply(this, arguments), n = String(name), up = false;
    try { req.addEventListener("upgradeneeded", function () { up = true; }); req.addEventListener("success", function () { if (up) dirty(n); }); } catch (e) { }
    return req;
  };
  FP.deleteDatabase = function (name) {
    var req = oDel.apply(this, arguments), n = String(name);
    try { req.addEventListener("success", function () { dropped(n); }); } catch (e) { }
    return req;
  };
  DP.transaction = function () {
    var tx = oTx.apply(this, arguments), n = this.name;
    if (tx && tx.mode !== "readonly") { try { tx.addEventListener("complete", function () { dirty(n); }); } catch (e) { } }
    return tx;
  };
  define(W, "indexedDB", IDB);
  var names = { IDBFactory: FDBFactory, IDBDatabase: FDBDatabase, IDBTransaction: FDBTransaction, IDBObjectStore: FDBObjectStore, IDBIndex: FDBIndex,
    IDBCursor: FDBCursor, IDBCursorWithValue: FDBCursorWithValue, IDBKeyRange: FDBKeyRange, IDBRequest: FDBRequest, IDBOpenDBRequest: FDBOpenDBRequest,
    IDBVersionChangeEvent: FDBVersionChangeEvent, IDBRecord: FDBRecord };
  Object.keys(names).forEach(function (k) { define(W, k, names[k]); });
  ["webkitIndexedDB", "mozIndexedDB", "msIndexedDB"].forEach(function (k) { try { if (k in W) define(W, k, IDB); } catch (e) { } });
}

/* ---------- 3. cookies ---------- */
function installCookies() {
  var JAR = {};
  try { var j = SEED && SEED.cookie ? JSON.parse(SEED.cookie) : null; if (j && typeof j === "object") JAR = j; } catch (e) { }
  function live() { var now = Date.now(), k; for (k in JAR) if (hasOwn(JAR, k) && JAR[k].x !== null && JAR[k].x <= now) delete JAR[k]; }
  function keep() { if (!PERSIST) return; var o = {}, k; for (k in JAR) if (hasOwn(JAR, k) && JAR[k].x !== null) o[k] = JAR[k]; tellKit({ op: "cookie", text: JSON.stringify(o) }); }
  function get() { live(); return Object.keys(JAR).map(function (k) { return k === "" ? JAR[k].v : k + "=" + JAR[k].v; }).join("; "); }
  function set(s) {
    s = String(s); var parts = s.split(";"), first = parts.shift(), eq = first.indexOf("="), name, val, x = null, gone = false;
    if (eq < 0) { name = ""; val = first.trim(); } else { name = first.slice(0, eq).trim(); val = first.slice(eq + 1).trim(); }
    parts.forEach(function (p) {
      var i = p.indexOf("="), k = (i < 0 ? p : p.slice(0, i)).trim().toLowerCase(), v = i < 0 ? "" : p.slice(i + 1).trim();
      if (k === "max-age") { var n = parseInt(v, 10); if (!isNaN(n)) { if (n <= 0) gone = true; else x = Date.now() + n * 1000; } }
      else if (k === "expires" && x === null) { var t = Date.parse(v); if (!isNaN(t)) { if (t <= Date.now()) gone = true; else x = t; } }
    });
    if (gone) delete JAR[name]; else JAR[name] = { v: val, x: x };
    keep();
  }
  try { Object.defineProperty(DOC, "cookie", { get: get, set: set, configurable: true, enumerable: true }); } catch (e) { }
}

/* ---------- 4. a cache of files (in memory, while the page is open) ---------- */
function installCaches() {
  function urlOf(r) { try { return typeof r === "string" ? new URL(r, DOC.baseURI).href : String(r.url); } catch (e) { return String(r); } }
  function same(a, b, o) { if (o && o.ignoreSearch) { a = a.split("?")[0]; b = b.split("?")[0]; } return a.split("#")[0] === b.split("#")[0]; }
  function respond(e) { return new Response(e.body.slice(0), { status: e.status, statusText: e.statusText, headers: e.headers }); }
  function Cache() { this._e = []; }
  Cache.prototype.match = function (r, o) { var u = urlOf(r), e = this._e.filter(function (x) { return same(x.url, u, o); })[0]; return Promise.resolve(e ? respond(e) : undefined); };
  Cache.prototype.matchAll = function (r, o) { var u = r === undefined ? null : urlOf(r); return Promise.resolve(this._e.filter(function (x) { return u === null || same(x.url, u, o); }).map(respond)); };
  Cache.prototype.put = function (r, res) {
    var self = this, u = urlOf(r);
    return res.arrayBuffer().then(function (body) {
      var h = []; try { res.headers.forEach(function (v, k) { h.push([k, v]); }); } catch (e) { }
      self._e = self._e.filter(function (x) { return !same(x.url, u); });
      self._e.push({ url: u, body: body, status: res.status || 200, statusText: res.statusText || "", headers: h });
    });
  };
  Cache.prototype.add = function (r) { var self = this; return fetch(r).then(function (res) { if (!res.ok) throw new TypeError("The file could not be fetched (" + res.status + ")."); return self.put(r, res); }); };
  Cache.prototype.addAll = function (rs) { var self = this; return Promise.all(Array.prototype.map.call(rs, function (r) { return self.add(r); })).then(function () { }); };
  Cache.prototype["delete"] = function (r, o) { var u = urlOf(r), n = this._e.length; this._e = this._e.filter(function (x) { return !same(x.url, u, o); }); return Promise.resolve(this._e.length !== n); };
  Cache.prototype.keys = function () { return Promise.resolve(this._e.map(function (x) { return new Request(x.url); })); };
  var ALL = new Map(), CS = {
    open: function (n) { n = String(n); if (!ALL.has(n)) ALL.set(n, new Cache()); return Promise.resolve(ALL.get(n)); },
    has: function (n) { return Promise.resolve(ALL.has(String(n))); },
    "delete": function (n) { return Promise.resolve(ALL["delete"](String(n))); },
    keys: function () { return Promise.resolve(Array.from(ALL.keys())); },
    match: function (r, o) {
      var cs = Array.from(ALL.values()), i = 0;
      function next() { if (i >= cs.length) return Promise.resolve(undefined); return cs[i++].match(r, o).then(function (x) { return x || next(); }); }
      return next();
    }
  };
  define(W, "caches", CS);
}

/* ---------- 5. a quiet service worker, a storage manager, locks ---------- */
function installNav() {
  var hasSW = false; try { hasSW = "serviceWorker" in NAV; } catch (e) { }
  if (hasSW) {
    var no = function () { return Promise.reject(domErr("This page runs in Ingenium's preview without a service worker; it works without one.", "SecurityError")); };
    define(NAV, "serviceWorker", {
      controller: null, ready: new Promise(function () { }), oncontrollerchange: null, onmessage: null, onmessageerror: null,
      register: no, getRegistration: function () { return Promise.resolve(undefined); }, getRegistrations: function () { return Promise.resolve([]); },
      startMessages: function () { }, addEventListener: function () { }, removeEventListener: function () { }, dispatchEvent: function () { return true; }
    });
  }
  var hasSM = false; try { hasSM = !!NAV.storage; } catch (e) { }
  if (hasSM) {
    define(NAV, "storage", {
      estimate: function () { var u = 0; Object.keys(LAST).forEach(function (k) { u += LAST[k].length; }); return Promise.resolve({ usage: u, quota: CAP }); },
      persist: function () { return Promise.resolve(PERSIST); }, persisted: function () { return Promise.resolve(PERSIST); },
      getDirectory: function () { return Promise.reject(domErr("This page runs in Ingenium's preview, where it has no folder of files of its own.", "SecurityError")); }
    });
  }
  var hasLocks = false; try { hasLocks = !!NAV.locks; } catch (e) { }
  if (hasLocks) {
    var held = [], queue = [];
    var free = function (r) { var hs = held.filter(function (h) { return h.name === r.name; }); return r.mode === "exclusive" ? hs.length === 0 : hs.every(function (h) { return h.mode === "shared"; }); };
    var run = function (r) {
      held.push(r); var p;
      try { p = Promise.resolve(r.cb({ name: r.name, mode: r.mode })); } catch (e) { p = Promise.reject(e); }
      p.then(function (v) { release(r); r.res(v); }, function (e) { release(r); r.rej(e); });
    };
    var pump = function () {
      for (var i = 0; i < queue.length; i++) {
        var r = queue[i], ahead = queue.slice(0, i).some(function (q) { return q.name === r.name; });
        if (!ahead && free(r)) { queue.splice(i, 1); i--; run(r); }
      }
    };
    var release = function (r) { var i = held.indexOf(r); if (i >= 0) held.splice(i, 1); pump(); };
    define(NAV, "locks", {
      request: function (name, a, b) {
        var o = typeof a === "function" ? {} : (a || {}), cb = typeof a === "function" ? a : b;
        return new Promise(function (res, rej) {
          var r = { name: String(name), mode: o.mode === "shared" ? "shared" : "exclusive", cb: cb, res: res, rej: rej };
          if (typeof cb !== "function") { rej(new TypeError("A lock needs a function to hold it.")); return; }
          if (o.steal) { held = held.filter(function (h) { return h.name !== r.name; }); run(r); return; }
          if (o.ifAvailable) {
            if (free(r) && !queue.some(function (q) { return q.name === r.name; })) run(r);
            else { try { Promise.resolve(cb(null)).then(res, rej); } catch (e) { rej(e); } }
            return;
          }
          if (o.signal) {
            if (o.signal.aborted) { rej(domErr("The request was aborted.", "AbortError")); return; }
            o.signal.addEventListener("abort", function () { var i = queue.indexOf(r); if (i >= 0) { queue.splice(i, 1); rej(domErr("The request was aborted.", "AbortError")); } });
          }
          queue.push(r); pump();
        });
      },
      query: function () {
        var f = function (x) { return { name: x.name, mode: x.mode, clientId: "ingenium-preview" }; };
        return Promise.resolve({ held: held.map(f), pending: queue.map(f) });
      }
    });
  }
}

/* ---------- 6. links, history and forms stay in the page ---------- */
function installNavigation() {
  var H = W.history;
  var fix = function (u) { if (u === undefined || u === null) return u; var s = String(u); return s.charAt(0) === "#" ? String(location.href).split("#")[0] + s : u; };
  var wrap = function (orig) {
    return function (state, title, url) {
      try { return arguments.length > 2 ? orig.call(H, state, title, fix(url)) : orig.apply(H, arguments); }
      catch (e) { if (arguments.length > 2 && url != null) { try { return orig.call(H, state, title); } catch (e2) { } } throw e; }
    };
  };
  try { if (H && H.pushState) { define(H, "pushState", wrap(H.pushState)); define(H, "replaceState", wrap(H.replaceState)); } } catch (e) { }
  var onClick = function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null; if (!a) return;
    if (RELAY && a.hasAttribute("download") && relayable(a)) { e.preventDefault(); relay(a); return; }
    var tg = (a.getAttribute("target") || "").toLowerCase(); if (tg && tg !== "_self") return;
    var h = String(a.getAttribute("href") || "").trim();
    if (h.charAt(0) === "#") {
      e.preventDefault();
      if (h === "#") { if (location.hash) location.hash = ""; W.scrollTo(0, 0); return; }
      if (location.hash === h) { var id = h.slice(1), el = null; try { id = decodeURIComponent(id); } catch (x) { } el = DOC.getElementById(id) || DOC.getElementsByName(id)[0]; if (el && el.scrollIntoView) el.scrollIntoView(); return; }
      location.hash = h; return;
    }
    if (h === "") { e.preventDefault(); location.reload(); return; }
    if (h.charAt(0) === "?") { e.preventDefault(); }
  };
  var onSubmit = function (e) {
    if (e.defaultPrevented) return;
    var f = e.target; if (!f || !f.getAttribute) return;
    var m = String((e.submitter && e.submitter.getAttribute && e.submitter.getAttribute("formmethod")) || f.getAttribute("method") || "").toLowerCase();
    if (m === "dialog") return;
    var act = String((e.submitter && e.submitter.getAttribute && e.submitter.getAttribute("formaction")) || f.getAttribute("action") || "").trim();
    if (act === "" || act.charAt(0) === "#" || act.charAt(0) === "?") e.preventDefault();
  };
  W.addEventListener("click", onClick, false); W.addEventListener("submit", onSubmit, false);
  /* the page's own listeners on the window, added as it starts, are heard first */
  W.addEventListener("load", function () {
    W.removeEventListener("click", onClick, false); W.addEventListener("click", onClick, false);
    W.removeEventListener("submit", onSubmit, false); W.addEventListener("submit", onSubmit, false);
  });
}

/* ---------- 7. a file the page saves is handed to Ingenium ---------- */
function relayable(a) { return RELAY && /^(blob|data):/i.test(String(a.href || "")); }
function relay(a) {
  var href = String(a.href), name = String(a.getAttribute("download") || "").trim();
  if (!name) { try { name = decodeURIComponent(href.split(/[?#]/)[0].split("/").pop() || ""); } catch (e) { } }
  if (!name || /^[0-9a-f-]{30,}$/i.test(name)) name = "download";
  fetch(href).then(function (r) { return r.blob(); }).then(function (b) {
    return b.arrayBuffer().then(function (ab) { tell({ __ingSave: 1, name: name, type: b.type || "application/octet-stream", bytes: ab }, [ab]); });
  }).catch(function (e) { say("warn", "the file could not be handed to Ingenium to save (" + (e && e.message) + ")."); });
}
function installRelay() {
  var AP = HTMLAnchorElement.prototype, oClick = AP.click, oDispatch = AP.dispatchEvent;
  AP.click = function () { if (this.hasAttribute("download") && relayable(this)) { relay(this); return; } return oClick.apply(this, arguments); };
  AP.dispatchEvent = function (ev) {
    if (ev && ev.type === "click" && this.hasAttribute("download") && relayable(this) && !this.isConnected) { relay(this); return false; }
    return oDispatch.apply(this, arguments);
  };
}

/* ---------- 8. Ingenium's messages to the kit, which the page never hears: what the page kept, handed back as it starts; and,
   before Ingenium runs the page again, a request for what is not yet handed over ---------- */
var ONSEED = null;
W.addEventListener("message", function (e) {
  var d = e.data;
  if (e.source !== parent || !d || d.__ingKit !== 1) return;
  try { e.stopImmediatePropagation(); } catch (x) { }
  if (d.op === "seed") { if (ONSEED) ONSEED(d); return; }
  if (d.op === "flush") { if (TIMER) { clearTimeout(TIMER); TIMER = 0; } if (Object.keys(DIRTY).length) flush(); else tellKit({ op: "clean" }); }
}, true);
W.addEventListener("pagehide", function () { if (TIMER) { clearTimeout(TIMER); TIMER = 0; flush(); } });

if (OPAQUE) {
  try { installIdb(); } catch (e) { say("warn", "the stand-in for IndexedDB could not be set up (" + (e && e.message) + ")."); }
  try { installCookies(); } catch (e) { }
  try { installCaches(); } catch (e) { }
  try { installNav(); } catch (e) { }
}
try { installNavigation(); } catch (e) { }
if (RELAY) { try { installRelay(); } catch (e) { } }
}
