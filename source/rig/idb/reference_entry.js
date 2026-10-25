// The reference implementation of the IndexedDB standard (fake-indexeddb), put in place of the browser's own before any page
// script runs: indexedDB, IDBKeyRange and every other IDB global. build_reference.js bundles this file (esbuild, IIFE) into
// /tmp/idb-ref; the bundle never enters the repositories.
//
// A tab is a realm of its own, and fake-indexeddb keeps its databases in the memory of the realm that made it. So that two tabs
// of the same page see one set of databases, as two tabs of a real browser do, a tab opened from another (window.opener, the
// same origin) takes the opener's databases and connection queues: its own classes, the same stores. A value is cloned into the
// realm that reads it (structuredClone of the reader), as a browser deserialises a stored value into the reading page. When a tab
// goes away its connections close, as a browser closes them when a page is unloaded. A frame of the same origin shares its
// parent's databases; a frame of another or an opaque origin keeps the browser's own indexedDB (which refuses it, as before).
import * as F from 'fake-indexeddb';

(function install() {
  var W = window, NAMES = ['IDBCursor', 'IDBCursorWithValue', 'IDBDatabase', 'IDBFactory', 'IDBIndex', 'IDBKeyRange', 'IDBObjectStore',
    'IDBOpenDBRequest', 'IDBRecord', 'IDBRequest', 'IDBTransaction', 'IDBVersionChangeEvent'];
  if (W.__fidb) return; // a popup's first, empty document hands its window on to the page it opens: already in place
  var from = null;
  try { if (W.top !== W) { from = W.parent.__fidb || null; if (!from) return; } } catch (e) { return; } // another origin: leave it
  // the opener's stores, when the opener can be reached (the same origin; a popup's first, empty document has the origin of
  // the page that opened it)
  try { if (!from && W.opener && W.opener.__fidb) from = W.opener.__fidb; } catch (e) { from = null; }
  var factory = F.indexedDB;
  var me = { version: '6.2.5', factory: factory, shared: false, conns: new Set(), from: from };
  if (from) { factory._databases = from.factory._databases; factory._connectionQueues = from.factory._connectionQueues; me.shared = true; from.shared = true; }
  W.__fidb = me;
  // a value read from a store made by another realm's code comes back as that realm's objects: clone it into this one
  var mine = NAMES.map(function (n) { return F[n]; }).filter(Boolean);
  function own(v) { for (var i = 0; i < mine.length; i++) if (v instanceof mine[i]) return true; return false; }
  function here(v) { if (v === null || typeof v !== 'object' || own(v)) return v; try { return structuredClone(v); } catch (e) { return v; } }
  var P = F.IDBTransaction.prototype, ex = P._execRequestAsync;
  P._execRequestAsync = function (obj) {
    if (obj && typeof obj.operation === 'function' && me.shared) { var op = obj.operation; obj = Object.assign({}, obj, { operation: function () { return here(op.apply(this, arguments)); } }); }
    return ex.call(this, obj);
  };
  // the connections this tab opened, closed when it goes away
  var FP = F.IDBFactory.prototype, open = FP.open;
  FP.open = function () { var rq = open.apply(this, arguments); rq.addEventListener('success', function () { try { var d = rq.result; me.conns.add(d); d.addEventListener('close', function () { me.conns.delete(d); }); } catch (e) { } }); return rq; };
  var closeAll = function () { me.conns.forEach(function (d) { try { d.close(); } catch (e) { } }); me.conns.clear(); };
  W.__fidbCloseAll = closeAll;
  W.addEventListener('pagehide', closeAll);
  var desc = function (v) { return { value: v, enumerable: false, configurable: true, writable: true }; };
  var props = { indexedDB: desc(factory) };
  NAMES.forEach(function (n) { if (F[n]) props[n] = desc(F[n]); });
  Object.defineProperties(W, props);
})();
