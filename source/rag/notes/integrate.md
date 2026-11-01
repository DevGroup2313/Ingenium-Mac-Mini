# Folder search, phase 1: the wiring ("integrate")

Written 1 November 2026. Files: `rag/main.js`, `build/modules/r202.js`, two lines in `build/modules/r173.js`, `rig/t_rag1_manual.js`,
`rag/README.md` and this note. Read first: `scratchpad/rag0/SPEC.md`, `rag/DESIGN.md`, `rag/notes/core.md`, `index.md`, `desktop.md`. The
parts those notes describe were used as they are: nothing in `store*`, `embedder*`, `indexer.js`, `folders.js`, `parse.worker.js`,
`chunker.js` or the patch was changed. Nothing was added to the page's top bar.

## 1. Things the next parts must know first

1. **The page is 960 MB before anything is read; an embedder worker is 0.6 GB.** All the browser's processes together (ps, RSS) held
   about 958 MB with the built page open and nothing read; a dedicated worker lives in the renderer's process, so the renderer is where the
   workers show. On the harness page (385 MB idle) an embedder worker added 640 MB (1 worker 1,024 MB, 2 workers 1,645 MB, 3 workers
   2,162 MB peak, passages of 533 tokens; `scratchpad/rag0/bench/bench.log`). **So `main.js` starts ONE embedder worker unless asked
   (`IngRag.config({workers: 2})`)**: two would take the whole past the owner's 2 GB. `IngRag.suggestedWorkers()` still says what
   `suggestWorkers` (half the processors, a fifth of the spare memory) would choose, for a settings choice later. Speed on this idle
   4-processor machine: 1.15 s a passage of 533 tokens with one worker, 0.56 s with two (2.05 times as fast), 0.40 s with three; a real
   passage averages 422 tokens.
2. **The index opens when the card scrolls into view**, not at start-up: the card watches itself with an `IntersectionObserver`, and
   `IngRag.folders()` (the card's first call) opens the store only. The reading model is loaded by the first reading (`ready()`), and a
   reading is `waiting` (another folder is being read), `starting` (its turn; the store and the model open) or `reading`. A test that
   wants the card's numbers must scroll the card into view first (`locator.scrollIntoViewIfNeeded()`), as a person would.
3. **A reading is not the card's.** The card is only a view: `main.js` holds the jobs (`IngRag.running()`), the progress (the
   indexer's events folded into a snapshot) and the last result of each folder (`last`, kept for the page's life, not on disk), and says
   what happens through `IngRag.on(fn)`. A reading started from a test, or later by the scheduler, shows in the card.
4. **One folder is read at a time**; the others wait in a queue and can be stopped or removed at once. `stopReading(id)` ends after the
   file in hand (the indexer's rule; the vectors made for a long file are already in `emb_cache`), and `indexFolder` then RESOLVES with
   the summary (`stopped: true`), it does not reject. `ALREADY_RUNNING` rejects.
5. **`removeFolder(id)`** stops a reading of that folder first, removes it from the store in one transaction (the store also drops the cache
   entries only it used), makes the app forget it (`rag_forget_folder`; a failure there is reported as `forgot: false`, not thrown), and
   calls `store.compact()` when the folder had 200 passages or more (`config.bigFolderChunks`). The card then says how much room was given
   back.
6. **`OPFS_LOCKED` is "another window has the folder search open".** `openStore()` clears its memory on a failure, so the next call tries
   again; `state().status` is `locked`, `unavailable` (`OPFS_UNAVAILABLE`, an older web view) or `failed`, `problem.plain` has the words,
   and the card shows them with a "Try again" key. Every error `IngRag` throws has `.code` and `.plain` (plain words for a person).
7. **How the card joins Settings.** `build/modules/r173.js` files a card by its id (`CONF.settings.rooms[].ids`) or by a pattern on its
   heading; a card nobody names goes to the room "More". The card is `#ragCard` and is named in the room "Models and AI" (after
   `ingEyesCard`), with its words for "Find a setting" (`KEYS`). Those are the only two lines changed outside `rag/` and `r202.js`. (A
   module may also place a card inside a room's panel by hand: r173 leaves an unnamed card alone when it already sits in a panel.)
8. **The `hidden` attribute loses to a `display:` rule** in a stylesheet. The question under "Remove" (`.rag-ask`, `display: grid`) was
   on the screen all the time in the first run although `hidden` was set, and the test only looked at the property. The card now ends
   with `#ragCard [hidden]{display:none !important}`, and the test looks at what is really shown.
9. **The loader** (`r202.js`): off unless `window.pywebview.api.rag_list` exists; it waits for the page's `load` and 300 ms, imports
   `./rag/main.js` relative to the page (`document.baseURI`), and does nothing in the app's own extra windows (`/ingenium_window.html`),
   so only the main window can hold the index. If the import fails (no `rag/` beside the page) it writes one console line and no card
   appears. In a browser it arms a listener for `pywebviewready` and a timer and finds no bridge: nothing is fetched (tested).
10. **The chat does not use the folders yet** and the card says so; nothing in `main.js` talks to the chat.
11. **Warnings are said in plain words** (`plainWarning` in r202.js): "not valid UTF-8: read as Windows-1252" becomes "it is not saved as
    plain UTF-8 text, so it was read as Windows text"; a failure is shown as the indexer names it (`path: reason`), in red; notes are grey.

## 2. What was built

- **`rag/main.js`** (page, ES module): `window.IngRag` as DESIGN section 7, plus `stopReading`, `state`, `running`, `on`, `config`,
  `shutdown`, `suggestedWorkers`. The one user is `"me"` (`principal.ensure`), with an `acl.grant` for every folder added; `folders()` asks the
  store for the folders she may read (`folder.list({principalId})`, the same filter the retriever will use) and adds what the app says
  (`rag_folders`: `available`). `addFolder()` returns `{cancelled, folder, again}`; a folder chosen twice is the same folder.
- **`build/modules/r202.js`**: the loader and the card "Folders for the chat": "Add a folder…"; for each folder its name, path, files,
  passages and when last read; "Read it now" / "Read it again now" with a progress bar and a line ("Reading file 3 of 28: logbook/…
  (making passages: 1,200 of 3,154) · 1,350 passages made so far · about 20 minutes left"), "Stop"; "Remove" with a question first
  ("Its files stay where they are; only what Ingenium remembered about them goes"), Escape keeps the folder; how much room the folder search
  takes; "These folders are read on this computer only. Nothing is sent anywhere. The chat's use of them comes next." All real buttons;
  the status line is `aria-live="polite"`, updated once a second; the focus goes to the new folder's key after adding, to Stop after
  starting, back to the read key when done, and to "Add a folder…" after a removal.
- **`rig/t_rag1_manual.js`**: the by-hand test, section 3.

## 3. The by-hand test and its numbers

The full run (`node rig/t_rag1_manual.js http://127.0.0.1:8178/ <out>`, 1 November 2026, the combined page of 6.9.2's sources with
`r202.js` in it, all three fixture folders; log `scratchpad/rag0/manual_int.log`, figures in its `result.json`):

- **102 passed, 0 failed, in 67.7 minutes** on this 4-processor machine (one embedder worker).
- **72 files, 3,511 passages** (household_papers 20 files and 50 passages; lab_notes 24 and 149; historian_archive 28 and 3,312, the
  4.27 MB log alone 3,154). By type: txt 3,182, pdf 77, csv 77, md 76, json 42, docx 33, html 24.
- The three tables of passages agree (3,511 rows each). The text search finds the file of **37 of 37** facts in its first five
  results (the exact phrase); the vector search finds **35 of 37**; no text-search syntax error.
- **Memory: peak 1,582 MB**, at minute 67.4 (while reading again), the sum of the resident memory (RSS) of the browser process and all
  its descendants, sampled every 250 ms (16,130 samples); RSS counts shared pages in every process, so it is an upper bound (the
  review's PSS peak: 1,256 MB). `performance.measureUserAgentSpecificMemory` needs cross-origin isolation, which the app does not have.
- Reading again with nothing changed embeds nothing (every file skipped); a reload keeps every row; removing the three folders one by
  one leaves no row in any table but the version and the one user, and the app forgets the folders too.
- 253 requests, all to 127.0.0.1; no script or worker error.

After the review's fixes (section 6) the tests were run again; their numbers are in `rag/notes/review.md`.

## 4. The demo edition

The gift and demo editions are release builds, and release builds leave `r202.js` out while `build/held.json` names it, so neither
edition carries the folder search yet. When it is let in: the word "Lector" (which those editions refuse anywhere in the page)
appears nowhere in `rag/`, `r202.js`, the lines of `r173.js` or the desktop patches (checked in the review of 1 November 2026), and
`rag/` is not part of the page at all (it is shipped beside it).

## 5. Left

- **Shipping.** `ingenium.spec` (Mac), the Windows installer script and the build workflows still put only `ingenium.html` in the page folder.
  Until `rag/*.js` and `rag/vendor/` (about 84 MB) are put beside it, the loader's import fails quietly and no card appears; the vendor
  tree comes from the release "rag-vendor" or `rag/tools/fetch_vendor.py`. `release.py` applies the patch that gives the app the bridge
  (it is in `DESKTOP`) but copies no `rag/`. Not done here: the task said to edit nothing else.
- **Not run on a Mac or on Windows.** Everything is Chromium on Linux with the app's bridge stood in for by `rig/rag_bridge.py`.
  The real pywebview bridge, the folder dialogs, and the speed of 1 MB pieces through the web view are unmeasured (desktop.md section 5).
  WebKit before macOS 14 may refuse the private file system; the card then says so.
- **The embedder pool stays loaded after a reading** (about 0.6 GB for one worker) until the page closes. A release after some idle
  minutes is easy (`embedder.terminate()`, `readyPromise = null`) but was not asked; phase 3 will want the model warm for questions.
- **No automatic reading.** Adding a folder does not read it (the owner's phase 1 is manual; the 20-minute scheduler is phase 4), and a
  folder that was read keeps what it has until she presses "Read it again now".
- **The index records no model** (core.md section 7): `main.js` opens one index for the small model and refuses a model whose vectors
  have another length (`DIMS_MISMATCH`), but not another model of the same length or another pooling.
- **`IngRag.stats()` and the card's room line** read the index file's size, not the disk's free space; the browser's quota is in
  `stats().storage`.
- `last` (the "Finished: …" line) is not kept across a reload; the counts and the last-read time are (they come from the store).
- A removed folder's id can be reused (core.md 1.8); `main.js` forgets its `last` on removal and stops its reading first.
