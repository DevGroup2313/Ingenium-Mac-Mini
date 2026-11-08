# Ingenium's folder search (RAG): the contract every part follows

Owner's task of 31 October 2026, with her Phase 0 decisions: one user now (the permission tables and the SQL filters are
built and tested with a second test user, ready for local profiles on the optional sign-in later); folders are chosen with
the app's own folder dialog and read by the app when asked (Mac and Windows alike; this replaces the File System Access API
of her spec, by her decision); the third-party files ship inside the desktop apps. Desktop apps only (Mac, Windows): the
browser page, the Fire tablet and the iPhone carry none of it.

## 1. Where things live

- `source/rag/` holds the folder search's own code (ES modules) and its tests' helpers. It is shipped as files beside the
  page in the desktop apps: `<page folder>/rag/*.js`. The page itself carries only a small loader (`build/modules/r202.js`)
  that, inside the desktop app with the bridge's `rag_list` method present, imports `./rag/main.js`.
- `source/rag/vendor.json` pins the third-party files; `rag/tools/fetch_vendor.py OUT` fetches and checks them. In the
  desktop apps they sit at `<page folder>/rag/vendor/` (`sqlite/`, `transformers/`, `ort/`, `pdfjs/`, `mammoth/`,
  `models/Xenova/bge-small-en-v1.5/...`). The release "rag-vendor" of DevGroup2313/Ingenium-Mac-Mini holds rag-vendor.zip
  (the same tree) for tests and build machines.
- Every URL is relative to the page: `new URL('rag/vendor/...', location.href)`. Workers are real files on the app's own
  address (`new Worker(new URL('rag/store.worker.js', location.href), {type: 'module'})`), never blob: URLs (WebKit refused
  blob workers before; see ingenium_app.py `_start_local_server`).
- The desktop app's loopback server (http://127.0.0.1:17953) serves the page's folder; the patch gives it explicit types
  for .mjs/.js (text/javascript), .wasm (application/wasm), .onnx and .json.

## 2. Files and what each one owns

| File | Runs in | Owns |
| --- | --- | --- |
| `rag/main.js` | page | wiring; `window.IngRag` (section 7) |
| `rag/folders.js` | page | the bridge calls (section 6); streaming reads in 1 MB pieces |
| `rag/indexer.js` | page | walking a folder, sending bytes to the parse worker, embedding, writing through the store |
| `rag/parse.worker.js` | module worker | parsing (txt, md, html, json, csv with its own code; pdf with pdf.js run in this worker through `globalThis.pdfjsWorker`; docx with mammoth loaded by `fetch` + `new Function`), chunking, hashing |
| `rag/chunker.js` | parse worker (pure functions, importable by tests) | blocks to chunks (section 5) |
| `rag/embedder.worker.js` + `rag/embedder.js` | module worker + page client | Transformers.js, the tokenizer, batched embedding |
| `rag/store.worker.js` + `rag/store.js` | module worker + page client | THE ONLY SQLite connection (opfs-sahpool); schema and migrations; every read and write |
| `rag/retriever.js` | page | retrieval (phase 2, section 9): the two searches, Reciprocal Rank Fusion, the best k with what a citation needs |
| `rag/ftsquery.js` | store worker (pure functions, importable by tests) | a question's words made safe for FTS5's MATCH (section 9) |
| `rag/prompt.js` | page (pure functions, importable by tests) | phase 3, section 10: NOT_FOUND, her system prompt, the citation reader, the sentence check |
| `rag/scheduler.worker.js` + `rag/scheduler.js` | module worker + page | phase 4, section 11: the clock (setInterval in the worker) and its page side |
| `rag/eval.js` | later phase | |

## 3. Messages

Every worker speaks one protocol. Request `{id, op, args}`; reply `{id, ok: true, result}` or `{id, ok: false, error}`.
Progress events `{event, ...}` carry no id. Clients (`store.js`, `embedder.js`) return Promises and transfer ArrayBuffers.

Store worker ops (phase 1):
- `open({dbName = 'rag.sqlite3', vfs = 'opfs-sahpool' | 'memory', vendorBase})` → `{schemaVersion, vfs, sqlite, vec}`
- `principal.ensure({name})` → `{id}` (the one user now is `"me"`; tests add `"test-b"`)
- `folder.add({name, path, source = 'bridge', manualOnly = false})` → folder row; `folder.list({principalId?})`;
  `folder.remove({folderId, prune = false})` (deletes its files, chunks, FTS rows and vectors in one transaction; `prune` also drops
  every cached vector no passage uses, which `main.js` asks for when no reading is running); `folder.touch({folderId, indexedAt})`
- `acl.grant({folderId, principalId})`, `acl.revoke({folderId, principalId})`, `acl.allowed({principalId})` → `[folderId]`
- `file.list({folderId})` → `[{id, path, size, mtime, contentHash, chunkCount, indexedAt}]`; `file.get({folderId, path})`
- `file.replace({folderId, path, size, mtime, contentHash, model, chunks})` → `{fileId, chunkCount}`: ONE transaction
  deletes the file's old chunks (chunks, chunks_fts, chunks_vec, by rowid) and inserts the new ones; each chunk is
  `{chunk_index, heading_path, char_start, char_end, page, content_hash, text, embedding}` with `embedding` a Float32Array
  of the model's dimension. Writes the embeddings into `emb_cache` too.
- `file.delete({folderId, path})` (one transaction)
- `emb.lookup({model, hashes})` → `{[hash]: Float32Array}` (reuse of unchanged chunks); `emb.put({model, items})`
- `stats()` → counts per table; `reset({dbName?})` (deletes the database files and opens a new, empty index with the arguments
  of the last open: the way back from a damaged index, error code `CORRUPT`)
- `debug.rows`, `debug.sql`, `debug.fail`, `debug.migrate`, `debug.wipe`: the tests' own, served only by a worker started with
  `?debug=1` in its address (`createStore({debug: true})`); the app never starts one so (`main.js` does only when a test page has
  set `window.__ING_RAG_TEST__ = true`)

Store worker ops (phase 2, section 9): `principal.find({name})` → `{id}` or null (makes no principal);
`search.fts({query, principalId, k = 20, folderIds?})` → `{match, hits: [{id, folderId, rank, score}]}`;
`search.vec({embedding, principalId, k = 20, folderIds?})` → `{hits: [{id, folderId, rank, distance}]}`;
`chunk.get({ids, principalId})` → `[{id, folderId, folderName, folderPath, fileId, filePath, chunkIndex, headingPath, charStart,
charEnd, page, text}]`, only of folders the principal may read.

Embedder worker ops: `init({modelId = 'Xenova/bge-small-en-v1.5', dtype = 'q8', vendorBase})` → `{modelId, dims, maxTokens}`;
`count({texts})` → `[tokens]`; `embed({texts, kind: 'passage' | 'query'})` → `[Float32Array]` (normalized; batches of 16;
a query gets bge's instruction "Represent this sentence for searching relevant passages: "); `info()` →
`{modelId, dims, maxTokens, calls, embedded}` where `embedded` counts every text embedded since init (the reindex test
uses it). Transformers.js settings: `env.allowRemoteModels = false`, `env.allowLocalModels = true`,
`env.localModelPath = vendorBase + 'models/'` (the model id `Xenova/bge-small-en-v1.5` resolves to `models/Xenova/bge-small-en-v1.5/`), `env.useBrowserCache = false` (the files are on this computer already),
`env.backends.onnx.wasm.wasmPaths = vendorBase + 'ort/'`, `env.backends.onnx.wasm.numThreads = 1` (no cross-origin
isolation in the app). Pooling and normalisation as the model card says (`models/Xenova/bge-small-en-v1.5/README.md`: `{ pooling: 'mean', normalize: true }`; a query is prefixed with "Represent this sentence for searching relevant passages: ").

Parse worker ops: `parse({bytes, ext, path, maxTokens, overlap})` → `{text, blocks, chunks, fileHash}`; it may ask the
page for token counts through the embedder (or receive a counting function's results); chunk sizes are measured with the
model's own tokenizer, never guessed.

## 4. Schema (version 2; `meta.schema_version`; each migration in one transaction)

```sql
create table meta(key text primary key, value text);
create table principals(id integer primary key, name text not null unique);
create table folders(id integer primary key, name text not null, path text not null unique, source text not null,
  manual_only integer not null default 0, added_at integer not null, last_indexed_at integer);
create table folder_acl(folder_id integer not null references folders(id) on delete cascade,
  principal_id integer not null references principals(id) on delete cascade, primary key(folder_id, principal_id));
create table files(id integer primary key, folder_id integer not null references folders(id) on delete cascade,
  path text not null, size integer not null, mtime integer not null, content_hash text not null, chunk_count integer not null,
  indexed_at integer not null, unique(folder_id, path));
create table chunks(id integer primary key, folder_id integer not null, file_id integer not null references files(id) on delete cascade,
  file_path text not null, chunk_index integer not null, heading_path text not null default '', char_start integer not null,
  char_end integer not null, page integer, content_hash text not null, text text not null);
create index chunks_file on chunks(file_id);
create virtual table chunks_fts using fts5(text, heading_path, folder_id unindexed, tokenize = 'porter unicode61');
  -- rowid = chunks.id
create virtual table chunks_vec using vec0(folder_id integer partition key, embedding float[384] distance_metric=cosine);
  -- rowid = chunks.id
create table emb_cache(model text not null, hash text not null, vec blob not null, primary key(model, hash));
```
Version 2 (1 November 2026): `insert into chunks_fts(chunks_fts, rank) values ('secure-delete', 1)`, so FTS5 takes a deleted row's
words out of its index at once instead of keeping tombstones.

`pragma foreign_keys = on` and `pragma secure_delete = on` on every connection (SQLite overwrites deleted rows with zeros). Before a
passage's vector row is deleted its vector is overwritten with zeros (`update chunks_vec set embedding = ?`): sqlite-vec 0.1.6 only
marks a deleted vector unused and keeps its bytes in its block. Crash safety: the vendored opfs-sahpool file system always told
SQLite that a RESERVED lock was held, so a journal left by a crash was never rolled back; `vendor.json` patches that answer as SQLite
3.54.1 gives it (from the locks actually held), and `open()` runs `quick_check` whenever a journal was left behind. A damaged index
is reported with the code `CORRUPT`. Vectors are bound as the bytes of a Float32Array (`new Uint8Array(f32.buffer)`): this build of
sqlite-wasm does not bind a Float32Array itself. Checked in headless Chromium (31 October 2026, sqlite-vec-wasm-demo 0.1.6,
SQLite 3.45.3, vec 0.1.6, opfs-sahpool in a module worker): FTS5 with bm25; a KNN on vec0 with `folder_id = ?` and with
`folder_id in (select value from json_each(?))` on a partition key or a metadata column returns only the allowed folders;
rollback works; a reopened database keeps its rows. Phase 2 resolves the allowed set with a parameterized query and puts
`folder_id in (select value from json_each(?))` inside both the FTS5 query and the vec0 query, before fusion.

## 5. Parsing and chunking

- Blocks: `{kind: 'heading' | 'para' | 'code' | 'row' | 'item', level, text, char_start, char_end, page}` with offsets in
  the file's extracted text (txt and md: the file's own text, so a citation can highlight it exactly; pdf: the page's text,
  with `page`; html, docx, json, csv: the extracted text).
- md: ATX and setext headings; fenced code kept whole when it fits. html: h1 to h6 make the heading path; script, style and
  nav dropped; text of block elements in order. docx: mammoth's HTML, then as html. json: each top-level key or array item
  as a block, written as `path: value` lines. csv: the header kept as the heading path; rows grouped into blocks.
  txt: paragraphs (blank lines). Large files (some about 4 MB) are read in 1 MB pieces and decoded with one TextDecoder
  (`stream: true`).
- Chunks: split on headings, then paragraphs, then sentences; each chunk's embedded input is
  `heading_path + "\n\n" + text` (or the text alone) and must fit the model's input: 300 to 450 tokens for bge-small
  (limit 512), about 200 for MiniLM; overlap 10 to 15% (whole sentences carried into the next chunk); a sentence longer
  than the limit is cut at words. `heading_path` joins headings with " > ". `content_hash` is the SHA-256 (hex) of the
  embedded input; a file's `content_hash` is the SHA-256 of its bytes.

## 6. The bridge (desktop app, `window.pywebview.api`)

- `rag_choose_folder()` → `{ok: true, path, name}` or `{ok: false, cancelled: true}`; the app remembers the folders chosen
  (in its data folder), and only those may be read.
- `rag_folders()` → `[{path, name, added}]`; `rag_forget_folder(path)` → `{ok}`.
- `rag_list(path)` → `{ok, files: [{rel, size, mtime}]}`: recursive, files of the seven types only (.txt .md .html .htm
  .json .csv .pdf .docx), hidden files and folders skipped, symbolic links followed only when they stay inside the folder,
  at most 5,000 files.
- `rag_read(path, rel, offset, length)` → `{ok, data (base64), size, eof}`; `length` at most 1 MB; `rel` must resolve
  (realpath) inside the chosen folder.
- 6.9.3 (`build/desktop/app_rag_693.py`, exact replacements in what `app_rag_692.py` added): what a path really is once its links are
  resolved is checked step by step below the folder (no hidden step, a searched type), in `rag_list` and `rag_read`, so a link inside
  the folder cannot reach a hidden file or folder; `rag_forget_folder` also forgets by the path the folder was chosen with.
- Tests use `rig/rag_bridge.py` (an HTTP stand-in that imports the patch's own functions, with app_rag_693's changes) and `rig/rag_bridge_shim.js`
  (an init script defining `window.pywebview.api.rag_*` over it), so the real Python rules are what the tests exercise.

## 7. `window.IngRag` (phase 1)

`available()`, `ready()` (opens the store and the embedder), `folders()`, `addFolder()` (the dialog, then
`folder.add` and an ACL row for "me"), `removeFolder(id)`, `indexFolder(id, {onProgress, confirmEmpty})` (manual; a folder that
lists no files while some are in the search is left alone and its summary has `emptyNow`, so the card can ask; `confirmEmpty`
takes them out), `rebuild()` (after status `damaged`: a new, empty index, with the folders the app has on its list put back), `stats()`,
`_store`, `_embedder` (tests). Off unless the page runs in the desktop app; nothing goes online.
Phase 2: `retrieve(question, userId = 'me', opts)` (section 9), which opens the store and the reading model when needed.

## 8. Tests

Playwright in headless Chromium (`/opt/node-tools/node_modules/playwright`), named `rig/t_rag1_*.js`, run as
`node rig/t_rag1_x.js <base url> <out>`. `rig/t_rag1_crash.js` kills the whole browser in the middle of a write, a folder removal
and a compaction, and checks the index after a restart. `.github/workflows/rag-engines.yml` runs `rig/rag_engine_check.py` (pywebview
6.2.1: WKWebView on GitHub's Apple silicon and Intel Macs, WebView2 on its Windows PC), so the engines the apps have are checked too. A small harness page (`rag/test/harness.html`) loads `rag/main.js` with the
stand-in bridge for the unit-level tests; the end-to-end test uses the built page with `rag/` beside it. The vendor tree
for tests is unpacked from the release "rag-vendor" (see the README); on this build machine it is already unpacked at
`/tmp/claude-0/-home-user/f70d4091-5e3f-5b2b-9e4a-4f66b5694ecf/scratchpad/rag0/vendor` (the same tree, checked).

## 9. Retrieval (phase 2, 6 November 2026)

`retrieve(ctx, query, userId, opts)` in `rag/retriever.js` (and `IngRag.retrieve(query, userId, opts)`, with `ctx` the app's own
store and reading model). opts: `k` (the passages given, 5), `perList` (each search's hits, 20), `rrfK` (60), `folderIds` (the folders
the chat was given; it narrows, never widens). It returns `{passages, principalId, match, fts, vec, ms}`; a passage is the row of
`chunk.get` with `score` (its fused score), `ftsRank` and `vecRank` (its rank in each search, or null) and `distance`.

1. The user is found by name (`principal.find`); a name the index does not know gives no passages and `reason: 'NO_SUCH_USER'`;
   an empty question gives `reason: 'EMPTY_QUESTION'`.
2. The text search starts at once in the store's worker while the question's vector is made in the reading model's worker
   (`kind: 'query'`), then the vector search runs. Both statements carry the folder rule in their SQL:
   ```sql
   select rowid as id, folder_id, bm25(chunks_fts) as score from chunks_fts where chunks_fts match ?1
     and folder_id in (select folder_id from folder_acl where principal_id = ?2)
     [and folder_id in (select value from json_each(?4))] order by score, rowid limit ?3
   select rowid as id, folder_id, distance from chunks_vec where embedding match ?1 and k = ?2
     and folder_id in (select folder_id from folder_acl where principal_id = ?3)
     [and folder_id in (select value from json_each(?4))]
   ```
   Checked in sqlite-vec 0.1.6 (`rig/t_rag2_retrieve.js`): the partition key's `in (...)` is run once for each allowed folder, giving
   the k nearest of each, so a folder the user may not read is never searched, even when it holds the nearest passages, and the user
   still gets their k; LIMIT beside `k = ?` is refused ("Only LIMIT or 'k =?' can be provided, not both"), so the worker keeps the k
   nearest of all the folders' answers itself (by distance, then id).
3. The question is never handed to MATCH as it is (`ftsquery.js`): its words (runs of `\p{L}\p{N}_`, any script) are each
   quoted and joined with OR, at most 32, none longer than 64 characters, each once; a question with no word makes no text search.
   Inside quotes FTS5 reads no operator, keyword or column filter.
4. Fusion: Reciprocal Rank Fusion (Cormack, Clarke and Buettcher, SIGIR 2009) with k = 60: a passage scores the sum of
   1 / (60 + rank) over the lists it is in, ranks from 1; equal scores go to the better single rank, then the lower id.
5. The best k are read back with `chunk.get`, which applies the folder rule once more.

First results (6 November 2026, headless Chromium, the corpus without the 4 MB logbook: 357 passages, two reading-model workers):
Recall@5 33 of 35 facts (0.943), 28 found first; for the second user, who may not read `household_papers`, none of its passages in
either search or the fused five for any question, 5 passages still given for every question; a retrieval takes about 41 ms (median)
once the reading model is loaded; reading after one file added, one changed and one deleted embedded exactly the 2 new or changed
passages.

## 10. The chat (phase 3, 8 November 2026)

Her contract: "If retrieve() returns zero chunks, do not call the LLM. Return the constant NOT_FOUND = \"I could not find that in the
selected folders.\" Otherwise, use this system prompt" (her four lines, then `Context:`, the passages as `[n] {file_path}#{chunk_index}
({heading_path})` and their text, then `Question: {user_query}`), and "Render each [n] as a clickable link. It opens the source file ...
and, where possible, highlights the section".

- `rag/prompt.js` (pure): `NOT_FOUND`; `systemPrompt(passages, question)` (her lines word for word; `file_path` is the folder's name and
  the file's path in it; the brackets are left out when a passage has neither heading nor page; a PDF's page is added in them);
  `ground(result, question, budgetChars)` -> `{notFound, passages, dropped, system, messages}` (zero passages: notFound; otherwise the
  passages are kept best first while the prompt fits the model's room, at least one); `isNotFound(answer)` (quotes, emphasis and a final
  stop aside); `citations(text)` ([1], [1, 3], [2-4], [1][2]; a Markdown link [1](...) is not one); `sentences(text)` (code blocks,
  headings and table rules left out, each list line a sentence, marks after a full stop belong to the sentence before);
  `checkGrounded(answer, count)` -> `{ok, flagged, badRefs, cited}` (every sentence carries a citation to a passage given; a sentence
  ending with a colon introduces what follows and is not counted).
- `IngRag.prompt` is that module; `IngRag.openSource(passage, userId = 'me')` reads the cited file again through the bridge (only a folder
  the user may read, checked with `folder.list({principalId})`), asks the parse worker for its text without chunking (`textOnly`: the
  file's text, a PDF's pages), and finds the passage: at its offsets (`exact`), elsewhere (`moved`), or not at all (`changed`); it returns
  a window of 20,000 characters each side.
- The page (`build/modules/r257.js`): "Your folders" in the chat's + menu before Research and Web search, and a chip while it is on (turning it on
  turns Web search and Research off; not in Code conversations; not where `window.IngRag` is not). A message sent while it is on is
  marked (`rec.ragAsk`); in the chat's own preparation (`chatPrepare`) `IngRag.retrieve(question, 'me', {k: 5})` runs; zero passages ->
  the reply is NOT_FOUND and no model is called; otherwise the chat's model, whichever it is, reads two messages (`chatHistory`): the
  system prompt and the question, and nothing else (no earlier turns, memory, web or tools; the working loop's mark `__ingChat` is
  pinned false). The reply keeps a small copy of its passages (`bot.rag.passages`: id, folder id and name, file, chunk, heading, page,
  offsets, text); when it is written, a NOT_FOUND sentence becomes exactly NOT_FOUND and the others are checked (`bot.rag.flagged`,
  `badRefs`), named under the reply. Each [n] is a link and the passages are listed ("From your folders"); a link opens the viewer: the
  passage as it was read, then the file with the passage marked (`openSource`). A message with a file or a picture is answered without
  the folders, with a note. Elsewhere than the computer that read it, a reply keeps its links and sources, and the viewer shows the
  passage as it was read.
- Tests: `rig/t_rag3_chat.js` (the built page, two fixture folders read for real, a stand-in model that follows the contract, the
  Anthropic stand-in for a connection).

## 11. The scheduler (phase 4, 8 November 2026)

Her task: "Use setInterval in a Worker. Default interval 20 minutes, configurable. It runs only while the app is open ... Do not use
continuous file watchers" and "Reconcile each folder: compare mtime and size first, and hash the content only when they differ. Reuse
stored embeddings for chunks whose content_hash is unchanged. Delete chunks of removed files. Use one transaction per file so concurrent
queries see a consistent state."

- `rag/scheduler.worker.js`: the clock and nothing else (`start({everyMs, firstMs})`, `stop()`, `state()`; event `tick`). It touches no
  file and no index; it stops when the page closes.
- `rag/scheduler.js`: `createScheduler({onTick})` -> `{start(ms, {firstMs}), stop(), tickNow(), state(), terminate()}`; a tick that comes
  while the last one's work goes on is let pass (counted as skipped), so two runs never overlap.
- `rag/main.js`: `IngRag.schedule(minutes, {firstMs, everyMs})` (0: off), `IngRag.reconcile(reason)`, `IngRag.scheduleState()`; events
  `{type: 'scheduled', phase: 'start' | 'done' | 'set', report}`. A reconcile lists each folder through the bridge and compares sizes and
  modification times with `file.list`: a folder where nothing changed is not read (one listing; the reading model is not loaded for
  it); otherwise `indexFolder` reads it, which is the indexer's reconcile: size and time first, a changed file hashed and parsed,
  passages whose hash is in `emb_cache` not embedded again, files gone deleted, each file in one transaction (`file.replace`,
  `file.delete`). Skipped: a folder being read, a folder marked manual only, a folder whose listing is empty while the index holds files
  (the card asks about that one). A folder that cannot be listed is noted in the report and tried again at the next tick.
- The card (`build/modules/r202.js`): "Look for changes and read them by itself": never, 10, 20 (the default), 30 minutes or an hour,
  kept per device (`state.rag.every`); the first look two minutes after the app opens; a line with the next look and what the last
  one found. Periodic Background Sync (an installed web app's) does not apply to the desktop apps and is not used.
- Test: `rig/t_rag4_schedule.js` (her done criterion 5 through one tick of the clock; questions asked while it runs; a folder away).


## 12. The evaluation (phase 5, 8 November 2026)

Her done criteria: Recall@5 of at least 0.8 on 15 to 20 question, answer and source triples; groundedness (every sentence cited, every
citation to a retrieved chunk, flagged sentences listed, an unsupported claim a blocker); the ACL test (a user without folder X asks
what only X answers: `retrieve()` gives no chunk of X and the response equals NOT_FOUND); memory under 2 GB while the whole corpus,
the 4 MB file included, is indexed, with the method reported; reindex (add, modify, delete, one reconcile; the embedding calls equal the
new or changed chunks only). "Do not claim completion unless tests 3 and 5 pass."

- `rag/eval/golden.json`: 20 items drawn from `fixtures/FACTS.json`, covering the seven file types, the three folders and the 4 MB
  logbook (H09); `household_papers` is the restricted folder.
- `rag/eval.js` (pure): `recall(golden, results, k)` (file level, her criterion, and the stricter level where the passage holds the
  answer), `grounded(answer, passages)` (`checkGrounded`'s rules, then each cited sentence's words looked for in the passages it cites:
  below 0.6 it is listed for a person to read), `aclClean`, `answerHas` (the answer names the item's numbers, or most of its rarer
  words), `markdown(report)`.
- `rig/t_rag5_eval.js`: the built page in headless Chromium with the bridge stand-in; a real model answers through the chat's own
  connection path (an OpenAI-style server on this computer). It writes `report.json` and `report.md`; the results are kept in
  `rag/eval/RESULTS.md`.

## 13. The reranker (phase 5, 8 November 2026)

Her task: "Reranker. Optional, off by default, loaded on demand. Use a small cross-encoder that has a working ONNX export for
Transformers.js. Confirm this on Hugging Face before choosing a model." and, for retrieval, "merge with reciprocal rank fusion (k = 60),
then rerank to 5 if enabled, else take the top 5".

- The model, confirmed on Hugging Face on 8 November 2026: `Xenova/ms-marco-MiniLM-L-6-v2` (revision a0914435), tagged transformers.js,
  onnx and text-classification, a conversion of `cross-encoder/ms-marco-MiniLM-L6-v2` (Apache-2.0). Its quantized export
  `onnx/model_quantized.onnx` is pinned in `vendor.json` with the SHA-256 of each file (`config.json`, `tokenizer.json`,
  `tokenizer_config.json`, `vocab.txt`, `quantize_config.json`, the model). It reads a question and a passage together and gives one
  number (a logit): higher is a better answer.
- `rag/reranker.worker.js`: a module worker. `init({vendorBase, modelId, dtype = 'q8'})` checks that the four files it needs are on the
  app's own address (else `MODEL_NOT_INSTALLED`), loads Transformers.js as the embedder does (remote models off, local path
  `vendor/models/`, one thread), `AutoTokenizer` and `AutoModelForSequenceClassification`; `score({query, texts})` reads the pairs in
  batches of 8, at most 512 tokens a pair, and returns one number per text.
- `rag/reranker.js`: the page's side, `createReranker()` -> `{init, score, info, terminate}`. Nothing starts until `init`.
- `rag/retriever.js`: with `opts.rerank` and a reranker, the best 20 of the fusion (`RERANK_FROM`) are read back (the folder rule applies,
  as for the five), scored with the heading and the text, ordered by score (ties: the fusion's order), and the best 5 kept; each
  passage carries `fusedRank` and `rerankScore`, and the result `reranked`. The reranker only reorders passages the user may read.
- `rag/main.js`: `IngRag.retrieve(query, user, {rerank})` loads the reranker the first time a search asks for it (`config.rerank` is
  false); when its files are not in the app, the search keeps the fusion's order and says so in `rerankNote` (the chat shows it under
  the reply). `shutdown()` stops its worker.
- The page: the card's switch "Reorder what is found with a second reading model" (`#ragRerank`, `state.rag.rerank`, per device, off);
  the chat asks `retrieve(question, 'me', {k: 5, rerank})` and keeps `bot.rag.reranked`.
- Shipping: the three build workflows fetch the six files from Hugging Face at the pinned revision into
  `rag/vendor/models/Xenova/ms-marco-MiniLM-L-6-v2/` and check them against `tools/rag_reranker.sha256` (written by `release.py rag`);
  a fetch or check that fails leaves the reranker out, and the switch then says why in the chat. About 24 MB (the model 23.1 MB).
- Test: `rig/t_rag5_rerank.js`.
