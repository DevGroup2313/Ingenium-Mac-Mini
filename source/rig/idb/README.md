# The library tests across IndexedDB implementations

Ingenium keeps everything on the device in IndexedDB: the app library (`ingenium_apps`), Fabrica's repositories (`IngRepo`,
`ingenium_repos`) and its made packages (`fabrica_made`), long texts (`IngBig`, `ingenium_big`), the model store with its files
and blobs (`ingenium_files`), the signing keys (`ingenium_keys`), the owner's key and book (`offline_owner`), the chats brought
in from other assistants (r160, through `IngBig`), Fabrica's issues (`ingenium_hub`). The owner's devices run two engines,
WebKit (the Mac apps' web view, iPhone, iPad) and Chromium (the Windows app's WebView2, the Fire tablet's Android WebView). These
tests run the same suite against three implementations of IndexedDB, so that what one engine forgives and another does not
(transaction timing, blobs, key order, quota errors, versionchange, cursors) shows as a failure on one of them.

| file | what it is |
|---|---|
| `suite.js` | the tests: plain browser JavaScript, injected into the built page after `window.__ingReady`. It drives the library's own public functions and records `[{name, ok, detail, ms}]` on `window.__idbSuite.results`. It reads a store directly only to check what the library left in it. |
| `run_chromium.js` | Chromium's own IndexedDB (Playwright's Chromium) |
| `run_reference.js` | Chromium with the reference implementation, fake-indexeddb, put in place of its own before any page script |
| `run_node.js` | the Chromium side shared by the two above: load, inject, run the phases, print, write the JSON |
| `run_webkit.py` | WebKit's own IndexedDB (WebKitGTK, driven from Python) |
| `reference_entry.js`, `build_reference.js` | the reference implementation's browser bundle, built under `/tmp/idb-ref` (never in the repositories) |
| `run_all.sh`, `table.js` | all three against one page, and the table (test x implementation) |

## Running

The page must be built already (`python3 build/build_page.py OUT/ingenium.html`) and served by any static server
(`python3 -m http.server PORT --directory OUT`).

    rig/idb/run_all.sh http://127.0.0.1:PORT/ingenium.html [out folder]           # all three, one after another, then the table
    IDB_PARALLEL=1 rig/idb/run_all.sh http://127.0.0.1:PORT/ingenium.html out      # the three at the same time
    node rig/idb/run_chromium.js  http://127.0.0.1:PORT/ingenium.html chromium.json
    node rig/idb/run_reference.js http://127.0.0.1:PORT/ingenium.html reference.json
    xvfb-run -a /usr/bin/python3.12 rig/idb/run_webkit.py http://127.0.0.1:PORT/ingenium.html webkit.json
    node rig/idb/table.js chromium.json webkit.json reference.json [--md table.md]

Each runner prints a PASS or FAIL line for every test and the count, writes its JSON (the engine, the versions, every result
with its detail and time), and exits non-zero on any failure; `run_all.sh` prints the table and exits non-zero when any test
failed on any implementation. `IDB_ONLY=<regular expression>` runs only the one-tab tests whose names match;
`IDB_SKIP=main,tabs,quota` leaves phases out; `IDB_KEEP=1` keeps WebKit's data directories. A full run took four to five
minutes on each implementation on a busy machine (WebKit loads the 56 MB page in about 15 seconds, Chromium in about 6; the
timeouts are generous, so slowness is not taken for failure).

## The three implementations

- **Chromium's own IndexedDB**: Playwright's Chromium (`require('/opt/node-tools/node_modules/playwright')`; Chromium
  153.0.8010.12 on the machine where these were written), a fresh browser profile for each run, the store on its LevelDB backing.
- **WebKit's own IndexedDB**: WebKitGTK 2.52.6 through PyGObject (Gtk 3.0, WebKit2 4.1) under `xvfb-run`, the same WebCore
  IndexedDB as Safari. Each run has a data directory of its own (`WebKit2.WebsiteDataManager` with `base-data-directory` in a
  temporary folder, removed afterwards), so the store is WebKit's SQLite backing on disk, as on the owner's Macs and iPhone,
  not the in-memory store of an ephemeral session. The page is loaded and polled as `rig/wk_load_time.py` does, and results are
  read back with `WebKit2.WebView.call_async_javascript_function`.
- **The reference implementation of the standard**: fake-indexeddb 6.2.5 (npm; its licence is Apache-2.0, not MIT as the
  brief said; https://github.com/dumbmatter/fakeIndexedDB), bundled for the browser by esbuild 0.28.2. `build_reference.js`
  installs both into `/tmp/idb-ref` with npm and writes `/tmp/idb-ref/fake-indexeddb-6.2.5.iife.js`; `run_reference.js`
  builds it when it is not there and injects it with Playwright's `addInitScript`, so `indexedDB`, `IDBKeyRange` and every other
  IDB global are fake-indexeddb's before any page script runs. Its stores live in the page's memory.
  - Two tabs: a tab is a realm of its own, so a tab opened from another (`window.opener`, the same origin) takes the opener's
    databases and connection queues, with its own classes; a value read is cloned into the reading tab's realm, and a tab's
    connections close when it goes away, as a browser closes them. For that, the bundle asks in three places whether a key is a
    key range or a binary key by its shape rather than by `instanceof` (`lib/RecordStore.js` 3, `lib/cmp.js` 1,
    `lib/valueToKeyWithoutThrowing.js` 2; each patch must match exactly, or the build stops). Within one tab nothing changes.
  - A reload starts with empty stores (they are in memory), so the suite never reloads the page it tests; a restore is applied
    with `reload: false`.

## The tests

Phase `main` (one tab, in this order): the page runs on the implementation; the app library keeps the apps carried inside on
first start, Ingenium's own 56 MB page reads back whole, nothing is kept twice, an older copy is replaced, a newer one never, lost
bytes are kept again (`rig/t_builtin.js`); IngRepo create, fromFiles, put, commit, head, history, setNote, bundle and back,
rename, remove, gc; a 40 MB file and a 24 MB text through IngRepo and out again by fingerprint, read through a fresh object
store; IngBig: a 20 MB text kept cold and read back with its slices, a lone surrogate, delete; the model store keeps a 30 MB
Blob and a File (name, date, type) and reads slices of it, and the model reader reads a GGUF head from a slice; imported chats
(r160) read, kept in the long-text store, opened, never twice; the owner key made through its card, sealed in `offline_owner`,
signing a permission that checks valid and fails when changed, the owner's book; the device's signing key made once; Fabrica's
made packages kept through its Ship view and only the three newest versions; storage (`rig/t_61_storage.js`): each version
newest first, the same bytes never twice, measured store by store, Keep always, Clean the library removes exactly its plan,
old copies go on their own near the limit, calm warnings at 80 and 95 %, a full store (simulated, below) explained with old
copies making room and every store answering, damaged zips of each kind and missing parts explained through the real import
paths; backup (`rig/t_61_backup.js`): made with a password, opened and checked, a wrong password and a damaged file refused,
restored with Replace store by store to the same fingerprints (with a store of every kind of key, more than one batch of the
backup, read back in IndexedDB's order), then Merge; no page errors.

Phases `tabs-*`: two tabs of the page on one set of stores. The first writes and holds its stores open; the second reads what it
wrote and writes back; the second presses Reset everything, which deletes the model store the first holds open: the delete must
go through without being blocked, the second must open the store again once started, nothing else may be lost, and the first
must be told (versionchange) and keep working with the new store.

Phase `quota`, in a fresh profile: four versions of an app, then a 12 MB text the store must refuse; the refusal is explained
at once and old copies make room; then every store (long texts, the library, Fabrica, the signing keys, the owner key, the
model store) is asked to write while full and must answer, and say why when it refuses.

## Quotas and storage counts, as each implementation keeps them

- Chromium: the profile of the quota phase gets 12 MB through `Storage.overrideQuotaForOrigin` (DevTools protocol).
  Chromium refuses at commit: the transaction aborts with a `QuotaExceededError` and no request fails, so only `abort` fires.
- WebKit: the quota of an origin is a share of the disk that holds the data directory; the quota phase's data manager gets
  `origin-storage-ratio` = 12 MB / the volume's size. WebKit refuses the request itself: its `error` event reaches the
  transaction before the transaction aborts, and `transaction.error` is still empty then, as the standard says.
- The reference implementation keeps no quota (its stores are in memory), so its quota phase checks that nothing is said to be
  full and nothing is removed.
- `navigator.storage.estimate()`: WebKitGTK has no `navigator.storage` at all, and Ingenium falls back on its own measure of
  its stores there. In the reference the browser's count exists but never includes fake-indexeddb's memory, which comes from
  this set-up, not from an engine; so the reference runner hides `navigator.storage` (rig/idb/run_node.js), as WebKitGTK has
  none, and Ingenium falls back on its own measure there too. The tests set their limits from what Ingenium counts.

The simulated full store (in `main`) is the same on all three: the next write to the named store is taken, then its transaction
is aborted before it commits with a `QuotaExceededError` as its error (Chromium's shape), using only the standard API.

## Results (25 October 2026)

Before: the combined 6.7 page (`build_page.py` at the worktree's start, the same page the long regression runs). After: the same
sources with the fixes below (modules/r181.js, the two edits in build_page.py, and the in-place lines in modules/r136.js and
modules/r142.js). Chromium 153.0.8010.12, WebKitGTK 2.52.6, fake-indexeddb 6.2.5; the three run at the same time
(`IDB_PARALLEL=1`).

| test | Chromium before | WebKit before | reference before | Chromium after | WebKit after | reference after |
|---|---|---|---|---|---|---|
| the page runs on this implementation, its stores opened | PASS | PASS | PASS | PASS | PASS | PASS |
| app library: the apps carried inside are kept on first start, never over a newer copy | FAIL | FAIL | FAIL | PASS | PASS | PASS |
| IngRepo: create, fromFiles, put, commit, head, history, setNote, bundle, remove | PASS | PASS | PASS | PASS | PASS | PASS |
| IngRepo: a large file (40 MB) and a long text (24 MB) go in and come out unchanged | PASS | PASS | PASS | PASS | PASS | PASS |
| IngBig: a long text (20 MB) and its slices; a lone surrogate; the model store keeps a Blob and a File, sliced | PASS | PASS | PASS | PASS | PASS | PASS |
| imported chats (r160): read, kept in the long-text store, opened, never brought in twice | PASS | PASS | PASS | PASS | PASS | PASS |
| the owner's key (offline_owner): made, kept under its password, signs a permission; the signing key (ingenium_keys) is made once | PASS | PASS | PASS | PASS | PASS | PASS |
| Fabrica's packages (fabrica_made): each kept, and only the three newest versions | PASS | PASS | PASS | PASS | PASS | PASS |
| storage: each version kept, newest first; the same bytes never kept twice; measured store by store | FAIL | FAIL | FAIL | PASS | PASS | PASS |
| storage: Keep always, and Clean the library removes exactly what its plan lists | PASS | PASS | PASS | PASS | PASS | PASS |
| storage: old copies go on their own when the limit is near; calm warnings at 80 % and 95 % | PASS | PASS | FAIL | PASS | PASS | PASS |
| storage: a full store (simulated) is explained at once, old copies make room, refused writes are answered | FAIL | FAIL | FAIL | PASS | PASS | PASS |
| storage: damaged zips and missing parts are explained, through the real import paths | PASS | PASS | PASS | PASS | PASS | PASS |
| backup: made with a password, refused when damaged, restored store by store (Replace, then Merge) | PASS | PASS | PASS | PASS | PASS | PASS |
| no page errors while the tests ran | PASS | PASS | PASS | PASS | PASS | PASS |
| two tabs: the first tab writes, holding its stores open | PASS | PASS | PASS | PASS | PASS | PASS |
| two tabs: what one tab writes, the other reads (texts and Fabrica's history), and the other way | PASS | PASS | PASS | PASS | PASS | PASS |
| two tabs: another tab's Reset everything deletes a store this tab holds open: not blocked, nothing else lost | FAIL | FAIL | FAIL | PASS | PASS | PASS |
| two tabs: the first tab let the other delete its store, and keeps working with the new one | FAIL | PASS | FAIL | PASS | PASS | PASS |
| quota: the implementation's own limit: a write it refuses is explained, old copies make room, every store still answers | PASS | FAIL | PASS | PASS | PASS | PASS |
| passed | 15/20 | 15/20 | 14/20 | 20/20 | 20/20 | 20/20 |

Before, "measured store by store" failed on all three because of finding 4: the copy reported as kept again had no bytes, so
the library measured short of what its records say.

## What the tests found, and what was done (6.7, 25 October 2026)

Run against the combined 6.7 page before the fixes, and again after (`rig/idb` results, table below):

1. Another tab could not delete or upgrade a store Ingenium held open (all three; behaving differently). No connection
   Ingenium keeps open had a `versionchange` handler (only Fabrica's issues did). Reset everything deletes the model store and
   reloads at once: in Chromium and the reference the delete stayed blocked behind the other tab's connection (and its own), and
   the page, started again, waited behind it, so its models never loaded; in WebKit the delete was dropped when the page went,
   so the models were not reset at all. Fixed: modules/r181.js closes every connection when another tab asks for its store,
   opens a fresh one at once for Ingenium's own stores (with the same stores) and lets a transaction asked of the closed
   connection be taken by the fresh one, so nothing written afterwards is lost. Without r181 the Reset test fails on all three.
   Reset everything now also waits for the delete before it starts the page again (build_page.py, "6.7 idb: Reset everything
   waits for the model store to go"). A review found that no engine needs this second change: with r181 alone WebKit and the
   reference pass every two-tab check, and Chromium fails only the suite's own record of the delete's success event (the page
   reloads before it is recorded), while the store is still emptied, reopened and written. It is kept because it lets that
   event arrive before the page goes, and costs nothing.
2. A write refused at commit left two stores waiting for ever: the signing key store (modules/r136.js `ktx`) and the model
   store (`idbPut` in the base) listened for `error` only, and a refusal at commit (Chromium's shape when its quota is reached
   as a transaction commits) fires only `abort`. The simulated full store showed it on all three implementations (each waited
   20 seconds for an answer that never came). Fixed in place: both answer `abort` too.
3. A write the request itself refused was rejected with nothing (WebKit's shape, shown by WebKit's real quota): Fabrica's
   history and the owner key answered `onerror` with `transaction.error`, which the standard leaves empty until the transaction
   aborts, so a full store was never named as full. Fixed in modules/r181.js: while a refused request's error event goes
   through its transaction, `transaction.error` is the request's error; afterwards it is the engine's own again.
4. A copy in the app library whose bytes were lost was reported as kept again but was not written (all three): modules/r142.js
   replaced the library's keep with one that answered "same" on a matching fingerprint without looking for the bytes. Fixed in
   place: the same fingerprint is the same copy only while its bytes are in the store.
5. In the reference, storage saw a count of nothing: the browser's count exists but never includes the stores (they are in
   memory), so limits, warnings and freeing room on its own never acted there. A first fix in modules/r142.js measured the
   stores whenever the browser gave no count, or counted nothing. A review showed that it answered no real engine (Chromium and
   WebKitGTK pass every storage and quota test without it) and that it cost a full walk of the stores, about a second for a
   93 MB library, up to once a minute on WebKitGTK, which has no count of its own. It was taken out again; the reference runner
   hides the browser's count instead (above).

In the reference, a delete made by a tab that then goes away stays pending for ever (the tab's realm, which ran it, is gone);
before the fixes this made the reference behave as Chromium did (the restarted tab waited behind the delete), and its first tab
also stopped answering in the last two-tab step. After the fixes the delete is done before the tab goes, on all three.
