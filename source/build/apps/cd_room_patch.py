"""R132 (18 October 2026): room to grow for Carpe Diem's own desk.

The owner's words: "I want for the local storage limits for all of my apps to be expanded please."

Carpe Diem keeps its desk (programmes, notes, citations, settings) as one record in the small store, localStorage, which
browsers keep to about 5 MB for a whole site (and Tabula, Abacus and the other rooms share it). When the record grew past
that room, the save failed and the corner said "Not saved. Export a backup." Now:

  1. A desk the small store refuses is kept in this device's larger store (IndexedDB, 'cd-room'), whose room the browser
     sets as a share of the device's free disk, and the corner says where it went. Nothing is lost.
  2. On the next start, a desk kept there that the small store does not hold is the one that opens, read by Carpe Diem's
     own loadState, and the page is drawn again. When the small store takes the desk again, the copy in the larger store
     is let go.
  3. The browser is asked to keep these stores (persistent storage), so it does not clear them when the disk runs short.
     Chromium and Safari decide without asking; Firefox would ask the person, so there it is not asked.

patch(text) returns the patched Carpe Diem page. Usage on its own:
  python3 -I cd_room_patch.py carpe_diem.html OUT.html
"""
import sys

MARK = "R132-CD-ROOM"
SAVE_OLD = ("var __cdSer = JSON.stringify(state); if (window.__cdLastSaved !== __cdSer) { localStorage.setItem(STORAGE_KEY, __cdSer); "
            "window.__cdLastSaved = __cdSer; }")
SAVE_NEW = ("var __cdSer = JSON.stringify(state); if (window.__cdLastSaved !== __cdSer) { var __cdOk = true; "
            "try { localStorage.setItem(STORAGE_KEY, __cdSer); } catch (__cdQ) { __cdOk = false; if (!window.__cdOverflow) throw __cdQ; } "
            "window.__cdLastSaved = __cdSer; if (window.__cdOverflow) window.__cdOverflow(__cdSer, __cdOk); } /* " + MARK + " */")
ADD = r"""<script id="cd-room">/* R132-CD-ROOM · a desk the small store refuses is kept in the larger one, and opens from there */
(function () {
  if (window.__cdRoom || typeof STORAGE_KEY === 'undefined' || typeof loadState !== 'function' || typeof state === 'undefined') return;
  window.__cdRoom = 1;
  var DBN = 'cd-room', ST = 'd', REC = 'desk:' + STORAGE_KEY, dbp = null;
  function fr() { try { return state.lang === 'fr'; } catch (e) { return false; } }
  function db() { if (dbp) return dbp;
    dbp = new Promise(function (res, rej) { try { var r = indexedDB.open(DBN, 1);
      r.onupgradeneeded = function () { try { r.result.createObjectStore(ST); } catch (e) {} };
      r.onsuccess = function () { res(r.result); }; r.onerror = function () { rej(r.error); }; r.onblocked = function () { rej(new Error('blocked')); }; } catch (e) { rej(e); } });
    dbp['catch'](function () { dbp = null; }); return dbp; }
  function put(v) { return db().then(function (d) { return new Promise(function (res, rej) { var t = d.transaction(ST, 'readwrite'); t.objectStore(ST).put(v, REC);
    t.oncomplete = function () { res(true); }; t.onerror = t.onabort = function () { rej(t.error || new Error('refused')); }; }); }); }
  function get() { return db().then(function (d) { return new Promise(function (res) { var t = d.transaction(ST, 'readonly'), r = t.objectStore(ST).get(REC);
    r.onsuccess = function () { res(r.result || null); }; r.onerror = function () { res(null); }; }); })['catch'](function () { return null; }); }
  function notice(ok, en, f) { try { if (typeof cdSaveNotice === 'function') cdSaveNotice(ok, fr() ? f : en); } catch (e) {} }
  function persist() { try { if (navigator.storage && navigator.storage.persist && !/Firefox\//.test(navigator.userAgent))
    navigator.storage.persisted().then(function (p) { if (!p) return navigator.storage.persist(); })['catch'](function () {}); } catch (e) {} }
  var checked = false, early = null, pend = null, timer = null, recOk = null, said = false;
  function write(raw, ok) {
    var v = ok ? { lsOk: true, raw: null, at: Date.now() } : { lsOk: false, raw: raw, at: Date.now(), n: raw.length };
    put(v).then(function () { recOk = ok;
      if (!ok && !said) { said = true; persist(); notice(true, 'Saved in the larger store on this device (the small one is full)', 'Enregistré dans la grande mémoire de cet appareil (la petite est pleine)'); } },
      function () { if (!ok) notice(false, 'Not saved: this device has no room left. Export a backup.', 'Non enregistré : cet appareil n’a plus de place. Faites une sauvegarde.'); });
  }
  function flush() { if (timer) { clearTimeout(timer); timer = null; } if (!pend) return; var p = pend; pend = null; write(p.raw, p.ok); }
  window.__cdOverflow = function (raw, ok) {
    if (!checked) { early = { raw: raw, ok: ok }; return; }
    if (ok && recOk !== false) return;
    pend = { raw: raw, ok: ok }; if (timer) clearTimeout(timer); timer = setTimeout(flush, ok ? 0 : 250);
  };
  window.addEventListener('pagehide', flush);
  document.addEventListener('visibilitychange', function () { if (document.hidden) flush(); });
  function adopt(raw) {
    var real = Storage.prototype.getItem, s = null;
    Storage.prototype.getItem = function (k) { if (this === localStorage && k === STORAGE_KEY) return raw; return real.apply(this, arguments); };
    try { s = loadState(); } catch (e) { s = null; } finally { Storage.prototype.getItem = real; }
    if (!s || typeof s !== 'object') return false;
    Object.keys(state).forEach(function (k) { delete state[k]; });
    for (var k in s) state[k] = s[k];
    try { if (typeof renderAll === 'function') renderAll(); } catch (e) {}
    notice(true, 'Your newest desk came back from the larger store', 'Votre bureau le plus récent est revenu de la grande mémoire');
    return true;
  }
  if (!window.indexedDB) { checked = true; return; }
  get().then(function (rec) {
    var ls = null; try { ls = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    recOk = rec ? rec.lsOk !== false : null;
    var take = !!(rec && rec.lsOk === false && typeof rec.raw === 'string' && rec.raw.length > 20 && rec.raw !== ls);
    checked = true;
    if (take) { early = null; adopt(rec.raw); try { saveState(); } catch (e) {} }
    else if (early) { var e = early; early = null; window.__cdOverflow(e.raw, e.ok); }
  });
  setTimeout(persist, 2000);
  window.__cdRoomApi = { get: get, recOk: function () { return recOk; }, checked: function () { return checked; } };
})();
</script>
"""


def patch(s):
    if MARK in s:
        return s
    if s.count(SAVE_OLD) != 1:
        raise SystemExit("cd_room_patch: Carpe Diem's saveState line was found %d times" % s.count(SAVE_OLD))
    s = s.replace(SAVE_OLD, SAVE_NEW)
    i = s.rfind("</body>")
    if i < 0 or not s[i:].startswith("</body>\n</html>"):
        raise SystemExit("cd_room_patch: the page's own </body> was not found")
    return s[:i] + ADD + s[i:]


if __name__ == "__main__":
    src, out = sys.argv[1], sys.argv[2]
    open(out, "w", encoding="utf-8").write(patch(open(src, encoding="utf-8").read()))
    print("written", out)
