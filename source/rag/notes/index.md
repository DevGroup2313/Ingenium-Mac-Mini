# Folder search, phase 1: parsing and indexing ("index")

Written 1 November 2026. Files: `rag/chunker.js`, `rag/parse.worker.js`, `rag/indexer.js`, `rag/folders.js`, `rag/tools/make_fixtures.py`,
`rag/fixtures/` (72 corpus files and `FACTS.json`, `MANIFEST.json`, `README.md`), `rag/test/parse_harness.html`,
`rig/t_rag1_parse.js`, `rig/t_rag1_index.js`. A previous agent wrote all of them and a usage limit stopped it before the last runs.
This session read them against DESIGN.md sections 3, 5 and 6 and `notes/core.md`, ran both tests, and finished what was missing.
The desktop side (the app's five bridge methods, the stand-in) is in `notes/desktop.md`.

## 1. What I found, and the three changes I made

Against DESIGN section 3 (parse worker ops, messages), 5 (blocks, headings, chunk sizes, overlap, hashes) and 6 (the bridge as
`folders.js` calls it) I found no deviation: the code was complete and 115 of 116 parse checks and 49 of 50 index checks passed on
the first run. Two real problems and one gap, all fixed:

1. **A chunk pair with no overlap (`chunker.js`).** The fuzz section of `t_rag1_parse.js` (700 mutated copies) found one: a JSON file
   damaged into plain text whose long lines are "words" of 20 to 60 tokens, so no word start lies in the 10 to 15% window
   (42 to 63 tokens for a 424-token chunk) and `fragmentOverlap` fell back to carrying nothing. New `charFragment(...)` (last function
   in the file): when no run of whole units and no word start fits, the carried text starts inside the last unit at the CHARACTER
   whose suffix has its tokens in the window (binary search on the tokenizer's counts, never between the halves of a surrogate pair,
   `null` when none does; then the old fall-back). It runs only where the old code carried nothing, so no chunk of the corpus changed
   (`VERSION` stays 1, nothing was indexed yet). After it the fuzz finds nothing and the corpus's 3,284 overlapping pairs are all 0.100
   to 0.150.
2. **A test that broke itself (`t_rag1_index.js`).** The "a store that has died" step added `zz_new.txt` to the folder and never took
   it out, so the later "ALREADY_RUNNING" check saw 21 files, not 20. It is taken out now. The indexer was right.
3. **A listing the app cuts short (`folders.js`, `indexer.js`, harness, test).** The desktop bridge's `rag_list` says `truncated: true`
   when it stopped at its limit (5,000 files or 300,000 directory entries). `listFiles` now passes that on (`files.truncated`) and the
   indexer, which only looked at "5,000 files listed", takes nothing out of the index and says so in `summary.notes` when the app says
   the list is cut short (it still falls back on "5,000 listed" when the bridge says nothing). New check in `t_rag1_index.js`
   (a listing of 5 of 20 files deletes nothing) and `cutList` in the harness's stand-in bridge.

## 2. What the pieces do, for the parts that use them

- **`chunker.js`** (pure; imports in Node and in the worker): `sha256Hex` (crypto.subtle or the same in plain JS), `blocksFromText /
  Markdown / Html / Json / Csv / PdfPages` and `parseTextFile(ext, text)` -> `{text, blocks, meta, warnings}`, `chunkDocument(doc,
  {count, maxTokens = 512, limits, overhead, onStage})` -> `{chunks, stats}`. Sizes are MEASURED: `count(texts)` must return the
  tokens of each text as an embedded input (specials included); the chunker finds the fixed overhead itself, and checks every
  chunk's real input against the model's limit at the end (a chunk over it is packed again smaller, then cut at words). Limits for
  512 tokens: aim 300 to 450, never over 512 (2 chunks of 3,511 are over 450, the largest 470); for 256 (MiniLM) the maximum is 199.
  Chunk: `{chunk_index, heading_path, char_start, char_end, page, content_hash, text, input, tokens, overlap: {tokens, chars}}`;
  `input` = `heading_path + "\n\n" + text` (a path longer than a fifth of the input drops its first parts, then is cut at words, in
  `input` only; `heading_path` stays whole); `content_hash` = SHA-256 of `input`; `text` is the verbatim slice of the file's text
  (of the page's text for a PDF) between the offsets, so a citation can mark it. A section that is split repeats 10 to 15% of the
  earlier chunk (whole sentences, else a sentence end, else a clause or a word, else, new, a character).
- **`parse.worker.js`** (module worker, one protocol): `init`, `open / feed / finish / abort` (a file in 1 MB pieces; text is decoded
  piece by piece with one `TextDecoder`, `stream: true`; UTF-8, UTF-16 with a mark, else Windows-1252 with a warning), `parse` (all
  in one), `counts` (the page's answer), `info`. Events `count` (it asks the page for token counts: the embedder's tokenizer) and
  `stage`. pdf.js runs INSIDE this worker (`globalThis.pdfjsWorker` is set before it starts, no nested worker) and mammoth is
  fetched and run with `new Function`; pictures are not read; running heads and page numbers of a PDF are left out; a scanned
  PDF gives no chunks and a warning; a password PDF, a damaged PDF or Word file gives a plain error and the worker goes on.
  `finish` -> `{fileHash (SHA-256 of the bytes), ext, size, pieces, chunks, warnings, meta, stats, parseMs, mem}`, and, unless `slim`,
  `text`, `pages`, `blocks`. A file over 64 MB (`maxBytes`) is refused with its size.
- **`indexer.js`**: `createIndexer({store, embedder, bridge?, maxFileBytes = 64 MB, embedBatch = 32, parseTimeoutMs = 10 min})` ->
  `indexFolder(folderId, {onProgress, signal, force, only, confirmEmpty})` -> summary `{files: {total, indexed, skipped, failed,
  deleted}, chunks, embedded, reused, ms, failures, warnings, stopped, notes}`; events `folder-start, file-start, file-stage,
  file-done, file-skip, file-error, file-deleted, folder-done`. A file whose size and `mtime` (floored) are those in the index is left
  alone; otherwise it is read (1 MB pieces), parsed, the vectors of chunks already in `emb_cache` (same content hash, same
  `embedder.info().key`) are reused, the others are embedded shortest first in batches of 32, and the file goes in with ONE
  `store.file.replace` (old chunks out, new in, one transaction). A failing file is reported (`file-error`, with why) and the run goes on;
  the store or embedder being gone (`WORKER_FAILED WORKER_STOPPED NOT_OPEN OPFS_LOCKED OPFS_UNAVAILABLE NOT_READY MODEL_NOT_INSTALLED
  MODEL_UNREADABLE`) stops it. Files gone from the folder are taken out (`file.delete`), unless the listing is cut short, or is empty
  while files are indexed (taken for a drive that is not there: nothing is deleted unless `confirmEmpty`). An unreadable folder is
  `FOLDER_UNAVAILABLE`; a folder already being read is `ALREADY_RUNNING`. A stop through `signal` ends after the file in hand with
  an `AbortError` carrying `.summary`; the vectors already made for a long file stay in `emb_cache` (a stop costs little).
  `summary.embedded` is the number of vectors made: the reindex test of Phase 5 can use it with the embedder's own counter.
- **`folders.js`**: the five bridge calls as functions (`chooseFolder, chosenFolders, forgetFolder, listFiles, readPieces` as an async
  iterator of 1 MB `Uint8Array`s, `available(), whenReady()`), the app's `{ok: false, error}` becomes an `Error` with `.code`; a file
  that changes size while read rejects (`CHANGED`); `NO_BRIDGE` outside the desktop app.

## 3. The corpus (`rag/fixtures/`, `rag/tools/make_fixtures.py`)

72 invented files in three folders, all seven types, written byte for byte by the generator (the test runs it again and compares):
`historian_archive` 28 files, `lab_notes` 24, `household_papers` 20; txt 22, md 13, csv 9, pdf 9, docx 8, json 6, html 5. One text
file of 4.27 MB (`historian_archive/logbook/ship_logbooks_1781-1802.txt`, 3,154 of the corpus's 3,511 chunks), with a two-byte
character across the edge of each of its first three 1 MiB pieces. Some files have a byte order mark (3) or CRLF (10); one old
letter is Windows-1252. **`FACTS.json`: 37 facts (14 / 13 / 10 by folder; txt 11, md 7, pdf 6, html 4, csv 3, docx 3, json 3), each stated
in exactly one file** (the test finds each fact's exact phrase in the text its reader extracts from its own file and from no other of
the 72, in at least one chunk, and the six PDF facts on their pages); **`restricted_folder` is `household_papers`: its 10 facts
exist only there** (for the permissions test of Phase 2: user B without that folder must get nothing for those questions). Each
fact is `{id, folder, file, path, type, question, answer, needle}`; Phase 5's golden questions can be drawn from them. Two facts
are buried deep in the 4 MB file. `MANIFEST.json` has every file's size and SHA-256.

## 4. Numbers (headless Chromium on this machine, load average low)

- Whole corpus, parsed: 3,511 chunks (txt 3,182, md 76, html 24, json 42, csv 77, pdf 77, docx 33); every chunk's embedded input is
  at most 512 tokens by the model's own tokenizer; the 4 MB file gives 3,154 chunks of 311 to 450 tokens (mean 422), parsed,
  measured and chunked in 1.8 s with 20 token-count requests for 20,532 texts; the page's JS heap rose 15 MB at most while it was
  parsed (7.6 to 22.3 MB, back to where it began), renderer RSS 248 to 293 MB.
- **Embedding the whole corpus has not been run**, and it is mostly that one file: 3,154 chunks at the 0.7 to 2 s a 400-token chunk
  took on one worker in the core tests is of the order of an hour (the 2-worker pool and `suggestWorkers` are in `embedder.js`;
  Phase 3 should use them and measure; the memory done in Phase 1's test is the parse's, not the embedder's). What was run for real:
  the household folder (20 files, 50 chunks) through the real store (SQLite in memory) and the real embedder in 18 s, every table
  filled (50 rows in `chunks`, `chunks_fts`, `chunks_vec`, `emb_cache`, the ACL row for "me"), a second run leaves all 20 alone, and
  each of the 10 household facts' question, embedded as a query, finds its chunk first for 9 and within the first three for 10.
- 4 MB log through the indexer's stand-in test: a 60 kB cut (44 chunks), because the stand-in embedder is exact but not free.

## 5. Tests (`python3 rag/test/serve.py 8176 --vendor <vendor tree>` first; both start it themselves if nothing answers)

- `node rig/t_rag1_parse.js http://127.0.0.1:8176/ <out>`: **116 passed, 0 failed** (23 s). Corpus (72 files, manifest, the generator again
  byte for byte, facts), every file parsed through 1 MB pieces, heading paths (Markdown ATX and setext, HTML and Word checked against
  the browser's own parser and mammoth, PDF by type size, JSON keys, the CSV header), offsets (.txt/.md: 21,584 blocks and 3,258 chunks
  are exactly `text.slice(char_start, char_end)`; BOM, CRLF, Windows-1252), PDF pages, limits, overlap, metadata and hashes, the facts,
  edge cases (UTF-16, sentence splitting of "Dr." "e.g." "Oct. 5", long sentences, 3,000 Chinese characters, a 300-character heading
  path, another model's limit), robustness (700 mutated copies; 18 damaged PDF and Word files, none hangs), hashing (the plain-JS SHA-256
  against `crypto.subtle`), the 4 MB file, the worker protocol. No request left 127.0.0.1 (167 requests); pdf.js and mammoth came from
  `rag/vendor/`.
- `node rig/t_rag1_index.js http://127.0.0.1:8176/ <out>`: **51 passed, 0 failed** (65 s). The bridge wrapper (pieces, errors, a file that
  changes while read, abort, no bridge), the indexer against exact stand-ins of the store and the embedder (first run, second run
  leaves everything alone, a changed file embeds only its new chunk: 1 of 17, added/removed files, force, five kinds of failure
  reported and the rest go on, a dead store stops the run, an unplugged drive deletes nothing, a cut-short listing deletes nothing,
  a folder cannot be read twice at once, stopping keeps the vectors made) and against the real store and embedder (above). No request
  left 127.0.0.1 (179).
- Order of runs: both tests first (115/1 and 49/1), the parse test again after change 1 (116/0), the index test again after 2 (50/0) and
  after 3 (51/0). Not run: `t_rag1_store.js` and `t_rag1_embed.js` (`store.js`, `embedder.js` and their workers were not touched).

## 6. Left

- No OCR (a scanned PDF is reported, not read); no legacy `.doc`/`.xls`; no pictures in Word files; a file of more than 64 MB is a
  failure with its size, as is one that takes more than 10 minutes.
- `mtime` is compared floored, in milliseconds; a drive that stores two-second times (exFAT) is fine, but a file edited twice inside
  one tick looks unchanged. Content is only hashed when the file is read, so Phase 4's "hash only when size or mtime differ" is the
  indexer's rule already.
- The vectors of the same text embedded in another batch differ by a little (core.md 1.6): a reindex that re-embeds a chunk gets a new
  vector; reuse by content hash returns exactly what was stored.
- The real pywebview bridge, the Mac and Windows folder dialogs and the speed of 1 MB pieces through the web view's script bridge are
  not run here (see `notes/desktop.md`). `main.js` (wiring, `window.IngRag`) is not part of these two parts.
- `rag/DESIGN.md` section 6 could name the extra keys the app answers (`available`, `again`, `forgot`, `truncated`, `code`) and the
  millisecond `mtime`.
