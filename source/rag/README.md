# Ingenium's folder search (`source/rag/`)

## What it is

An opt-in way for the **desktop chat** (the Mac and Windows apps; not the browser page, the Fire tablet or the iPhone) to look things
up in folders of the owner's own papers. She chooses a folder with the app's own folder dialog. Ingenium reads its files when she
asks, cuts their text into passages, turns each passage into a list of numbers with a small reading model that runs on this
computer, and keeps text, numbers and a record of where each passage came from in a private index on this computer. Later phases
search that index for every chat turn and cite the files the answer came from. Everything runs in the page and its workers; the only
network call the whole feature may ever make is the chat's own call to the model provider, and that comes in a later phase.

The design contract every part follows is `DESIGN.md`; the owner's task (31 October 2026) and her Phase 0 decisions, which override
her task where they differ (one user now, the app's own folder dialog instead of the File System Access API, the third-party files
shipped inside the desktop apps), are summarised at its top.

**Phase 1 (this) is manual indexing**: the store, the embedder, parsing and chunking, the indexer, the bridge to the app's folder
dialog and file reads, and the card **"Folders for the chat"** in Settings (Models and AI): add a folder, read it now, read it again,
remove it. **Phase 2 is retrieval** (6 November 2026): `IngRag.retrieve(question, userId, opts)` (`retriever.js`) runs the text
search (FTS5, bm25) and the vector search (vec0, cosine) with the folder permissions inside both SQL statements, fuses their 20 best
each by Reciprocal Rank Fusion (k = 60) and gives the best 5 with what a citation needs; `ftsquery.js` makes a question's words safe
for FTS5. **Not built yet**: the chat's toggle, the grounded prompt and the citations (3), the 20-minute scheduler (4), the whole
evaluation (5). Nothing in the chat uses the folders yet; the card says so.

## Who can read what

The index has one user now, **"me"**, with a row in `folder_acl` for every folder she adds. The SQL filter that uses them,
`folder_id in (select folder_id from folder_acl where principal_id = ?)`, is inside both the text search and the vector search,
before anything is ranked or merged (`store.worker.js`, `search.fts` and `search.vec`); a passage is read back only for a user who
may read its folder (`chunk.get`). It is built and tested with a second test user, "test-b" (`rig/t_rag2_retrieve.js`), ready for
the local profiles the owner plans on top of the optional sign-in.

**This client-side ACL separates the app's users. It does not protect against a person with direct access to the browser profile's
storage**: the index is a file of this computer's browser storage, and whoever can open that storage can read it whole.

The folders themselves are protected by the app, not by the page: the app reads only folders chosen in its dialog, refuses paths that
leave them, hidden files, other file types and symbolic links that point outside (`build/desktop/app_rag_692.py`).

## What is in this folder

| File | Runs in | What it does |
| --- | --- | --- |
| `main.js` | page | `window.IngRag`: opens the store and the embedder when a call needs them, adds and removes folders (one ACL row for "me" each), reads one folder at a time, `compact()` after a big folder is removed, says plainly when another window holds the index |
| `folders.js` | page | the app's five folder calls (`window.pywebview.api.rag_*`), files read in pieces of 1 MB |
| `indexer.js`, `parse.worker.js`, `chunker.js` | page, worker | walks a folder, parses (txt, md, html, json, csv; pdf with pdf.js; docx with mammoth), cuts into passages of 300 to 450 tokens with 10 to 15% overlap, hashes, embeds, writes each file in one transaction |
| `embedder.js`, `embedder.worker.js` | page, worker | Transformers.js with `Xenova/bge-small-en-v1.5` (384 values, q8), batches of 16, one or more workers |
| `store.js`, `store.worker.js` | page, worker | the only SQLite connection (SQLite 3.45.3 with FTS5 and sqlite-vec 0.1.6, OPFS), schema and migrations, every read and write |
| `vendor.json`, `tools/fetch_vendor.py` | build machine | the pinned third-party files and the script that fetches and checks them |
| `fixtures/`, `tools/make_fixtures.py` | tests | the 72-file test corpus (three folders, all seven types, one 4 MB log) and its answers |
| `test/` | tests | `serve.py` (static server for the tests), `harness.html`, `parse_harness.html` |
| `notes/` | | what each part's author found: `core.md`, `index.md`, `desktop.md`, `integrate.md` |

The page itself carries only a small loader and the card: `build/modules/r202.js`. In the desktop app, when the app's folder bridge is
there (`window.pywebview.api.rag_list`), it imports `./rag/main.js` relative to the page. In a browser, on the Fire tablet and on the
iPhone there is no bridge, so nothing is imported, nothing is fetched and no card is made (tested: `rig/t_rag1_manual.js`). The card
sits in the Settings room "Models and AI" (named in `build/modules/r173.js`). Nothing starts when `main.js` is imported: the index is
opened the first time the card scrolls into view, and the reading model is loaded when the first folder is read.

## How it is built and shipped

* **The page.** `build/modules/r202.js` is built into `ingenium.html` like every module (`python3 build/build_page.py [dest]`; the
  modules are joined in name order). The demo edition (`ING_EDITION=demo`) builds with it: that build checks that the page names no
  page the demo leaves out, and finds nothing new.
* **Beside the page.** `rag/*.js` are shipped as plain files in `<page folder>/rag/` and the third-party files in
  `<page folder>/rag/vendor/` (`sqlite/`, `transformers/`, `ort/`, `pdfjs/`, `mammoth/`, `models/Xenova/bge-small-en-v1.5/`; about
  84 MB). They cannot go inside the page: workers must be real files on the app's own address, never `blob:` (WebKit refused those).
  Every address is relative to the page (`new URL('rag/vendor/...', location.href)`). This is the owner's decision: the assets ship
  inside the desktop apps, nothing is fetched from the web at run time.
* **The vendor files.** `python3 rag/tools/fetch_vendor.py OUT_DIR` downloads the npm packages (checked against the registry's sha512)
  and the model (checked against the SHA-256 pinned in `vendor.json`) and writes `OUT_DIR/VENDOR.txt`. The release "rag-vendor" of
  DevGroup2313/Ingenium-Mac-Mini holds `rag-vendor.zip`, the same tree, for tests and build machines.
* **The app.** `build/desktop/app_rag_692.py` is applied by `release.py` (as every `build/desktop/app_*.py`) to the Mac and Windows
  `ingenium_app.py`: the five bridge methods and explicit types for `.mjs`, `.js`, `.wasm`, `.onnx` and `.json` on the loopback server
  (http://127.0.0.1:17953), which serves the page's folder.
* **Not done yet.** The PyInstaller spec (`ingenium.spec`) and the Windows installer still put only `ingenium.html` in the page folder.
  Until they also put `rag/` and `rag/vendor/` beside it, the app's import fails quietly (one console line) and no card appears. See
  `notes/integrate.md`, section 5.

## How to test

All tests run in headless Chromium through Playwright (`/opt/node-tools/node_modules/playwright`) and need the unpacked vendor tree
(`$RAG_VENDOR`, or `--vendor`). Run them from `source/`.

| Test | Command | What it covers |
| --- | --- | --- |
| store | `node rig/t_rag1_store.js http://127.0.0.1:8175/ OUT` | schema, migrations, ACL filters, transactions, OPFS reload and a second window, compact |
| embedder | `node rig/t_rag1_embed.js http://127.0.0.1:8175/ OUT` | the model, batches, counters, the pool, no request off this computer |
| parsing | `node rig/t_rag1_parse.js http://127.0.0.1:8176/ OUT` | 72 files, offsets, headings, limits, overlap, hashes, damaged files |
| indexer | `node rig/t_rag1_index.js http://127.0.0.1:8176/ OUT` | reading, reuse, failures, stopping, against stand-ins and the real store and embedder |
| bridge | `python3 -I rig/t_rag1_bridge.py` | the app's folder methods (the patch applied to copies of `ingenium_app.py`), the stand-in `rig/rag_bridge.py` |
| retrieval | `node rig/t_rag2_retrieve.js http://127.0.0.1:8176/ OUT [--quick]` | the two searches with the folder permissions inside their SQL, a second user, fusion (k = 60), escaping, Recall@5 over the corpus's facts, the restricted folder for the second user, reindex with embedding counts (`--quick` leaves out the 4 MB logbook; `RAG_WORKERS` sets the reading model's workers) |
| by hand | `node rig/t_rag1_manual.js http://127.0.0.1:8178/ OUT [--quick]` | the built page with the card, from the browser without the bridge to removing the last folder |

The servers: `python3 rag/test/serve.py PORT --vendor <vendor tree>` serves `/rag/` from this checkout (the first four tests start it
by themselves). The by-hand test needs the **built page** in a folder with `rag/` beside it and `rag/vendor` inside it, a static
server on that folder, and the bridge stand-in:

```
python3 build/build_page.py E2E/ingenium.html          # about three minutes; add ING_EDITION=demo for the demo edition
cp -r rag E2E/rag && rm -rf E2E/rag/vendor && ln -s <vendor tree> E2E/rag/vendor
python3 -m http.server 8178 --bind 127.0.0.1 --directory E2E      # any static server that sends .mjs/.js as text/javascript and .wasm as application/wasm
python3 rig/rag_bridge.py 8198                                      # the app's own folder functions behind HTTP
node rig/t_rag1_manual.js http://127.0.0.1:8178/ OUT              # --quick: only the household folder, a few minutes
```

(`t_rag1_manual.js` starts the two servers itself if nothing answers and they are on this computer.) Reading the whole corpus takes
a long time on one computer because 3,154 of its 3,511 passages are in the 4 MB log; the test prints its progress every minute.

## Limits worth knowing

* One computer's browser storage holds the index, in the browser's private file system, so a second Ingenium window cannot open it at
  the same time (the card says "Another Ingenium window has the folder search open").
* The model is English (`bge-small-en-v1.5`); there is no OCR (a scanned PDF is reported, not read) and no legacy `.doc` or `.xls`.
* Not yet run on a Mac or on Windows: everything above is Chromium on Linux. On macOS 13 and older the private file system may refuse
  to start; the store then answers `OPFS_UNAVAILABLE` and the card says so.
