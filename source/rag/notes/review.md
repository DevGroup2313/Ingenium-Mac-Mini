# Folder search, phase 1: the review and what was done (1 November 2026)

An independent review of phase 1 (storage, embedding, manual reading) read the code, ran probes of its own and read the full
end-to-end run. It found one blocker, three major findings and nine minor ones. This note lists each, what was changed, and the
test that shows it. Its probes were kept in the build machine's scratchpad (`rag0/review/`); the lasting tests are in `rig/`.

## The blocker

**rag-r-01. A crash in the middle of a write left the index damaged for good.** The opfs-sahpool file system of the vendored SQLite
(sqlite-vec-wasm-demo 0.1.6, SQLite 3.45.3) always answered "yes" to SQLite's question "does another connection hold a RESERVED
lock?". SQLite rolls a journal back only when no such lock is held, so the journal a crash left behind was never used. In the
review, killing the browser 1.0 s and 1.3 s into a 3,154-passage write left the integrity check failing, and the folder could not
even be removed.
- Fixed in `rag/vendor.json`: a pinned patch of `sqlite/sqlite3.mjs`, applied by `rag/tools/fetch_vendor.py` after the package's
  integrity check, and only to the published file (its SHA-256 before and after are pinned). The answer is now the one SQLite 3.54.1
  (19 October 2026) gives: "yes" only when a file of the pool with that name really holds the lock.
- `open()` runs `pragma quick_check` whenever a journal was left behind; a damaged index from any cause is reported with the code
  `CORRUPT`; the card then says so in plain words and offers "Start the folder search again" (`IngRag.rebuild()`, store op `reset`).
  Her files are never touched.
- Test: `rig/t_rag1_crash.js` kills the whole browser (SIGKILL) during a 3,154-passage write (after 500, 750, 1,000 and 1,300 ms),
  a removal of a folder of that size (400 and 1,200 ms) and a compaction (40 and 90 ms): **24 passed, 0 failed**. Every restart
  finds the index whole (integrity_check "ok"), the three tables agreeing, and either the old rows or the new ones.
  `rig/t_rag1_store.js` section "damaged index" overwrites three pages of the database file and checks `CORRUPT` and `reset`.

## The three major findings

**rag-r-02. Removing a folder left its vectors behind.** Vectors a stopped reading had kept stayed in the cache, and sqlite-vec 0.1.6
keeps a deleted vector's bytes in its block.
- Each vector is overwritten with zeros before its row is deleted; `pragma secure_delete = on`; FTS5's `secure-delete` (schema
  version 2); `folder.remove({prune: true})` drops every cached vector no passage uses (and, when another folder is being read,
  the clearing waits for the end of the readings).
- Tests: `t_rag1_store.js` section "nothing left behind"; the end-to-end test checks that, with every folder removed, the vector
  library's own blocks hold only zeros.

**rag-r-03. The Mac and Windows builds do not yet carry `rag/` and its third-party files**, so the apps show no card. Not done in
this round: the card stays held out of release builds (`build/held.json`) until the owner approves phase 1 and the shipping is
built (the PyInstaller specs, the Windows installer and the build workflows; about 84 MB of files).

**rag-r-04. Nothing had run in WebKit.** `.github/workflows/rag-engines.yml` now runs `rig/rag_engine_check.py` on GitHub's Apple
silicon Mac, Intel Mac (WKWebView) and Windows PC (WebView2), through pywebview 6.2.1 as the apps use it: the private file system,
SQLite with FTS5 and sqlite-vec, the reading model's vectors against Chromium's, the household folder read through the app's own
bridge code, and a second start of the app that must find the index. Its results are in the workflow's summary.

## The nine minor findings

- **r-05** A long file's progress saves sent every vector made so far each time (23,520 writes for 3,167 passages): now only the new
  ones (the 4 MB log: 3,136 vectors in 14 saves for 3,154 made; `t_rag1_index.js`).
- **r-06** A folder chosen through a link that later changed could not be forgotten: it is now forgotten by the path it was chosen
  with too (`build/desktop/app_rag_693.py`; `t_rag1_bridge.py`).
- **r-07** A link inside a chosen folder could reach a hidden file or folder there: the real path is now checked step by step
  (`app_rag_693.py`; `t_rag1_bridge.py`).
- **r-08** The reading model's worker checked that its files are on the app's own address only after asking for them: now first (and
  the parsing worker checks too).
- **r-09** A folder that was emptied was never cleared, and the card showed a developer's note: the card now asks, "Did you empty the
  folder on purpose?", and "Yes, take them out" clears it (`t_rag1_index.js`, end-to-end section "an emptied folder").
- **r-10** A folder the app no longer has on its list was reported as a drive to connect: now `NOT_CHOSEN`, with its own plain words.
- **r-11** The tests' own store operations were open to the app: now served only to a worker started for the tests.
- **r-12** Some tests checked less than they said: "every section ran" now counts a section only when it ends; the crash, removal and
  plain-words checks above were added.
- **r-13** The integration notes had three unfilled placeholders: filled.

## The tests after the fixes (1 November 2026, headless Chromium on the build machine)

| Test | Result |
| --- | --- |
| `rig/t_rag1_store.js` | 116 passed, 0 failed |
| `rig/t_rag1_crash.js` | 24 passed, 0 failed |
| `rig/t_rag1_index.js` | 54 passed, 0 failed |
| `rig/t_rag1_embed.js` | 65 passed, 0 failed |
| `rig/t_rag1_parse.js` | 116 passed, 0 failed |
| `rig/t_rag1_bridge.py` | 795 passed, 0 failed |
| `rig/t_rag1_manual.js --quick` | 72 passed, 0 failed |
