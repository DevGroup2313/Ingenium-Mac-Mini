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
| `rag/retriever.js`, `rag/prompt.js`, `rag/scheduler.worker.js`, `rag/eval.js` | later phases | |

## 3. Messages

Every worker speaks one protocol. Request `{id, op, args}`; reply `{id, ok: true, result}` or `{id, ok: false, error}`.
Progress events `{event, ...}` carry no id. Clients (`store.js`, `embedder.js`) return Promises and transfer ArrayBuffers.

Store worker ops (phase 1):
- `open({dbName = 'rag.sqlite3', vfs = 'opfs-sahpool' | 'memory', vendorBase})` → `{schemaVersion, vfs, sqlite, vec}`
- `principal.ensure({name})` → `{id}` (the one user now is `"me"`; tests add `"test-b"`)
- `folder.add({name, path, source = 'bridge', manualOnly = false})` → folder row; `folder.list({principalId?})`;
  `folder.remove({folderId})` (deletes its files, chunks, FTS rows and vectors in one transaction); `folder.touch({folderId, indexedAt})`
- `acl.grant({folderId, principalId})`, `acl.revoke({folderId, principalId})`, `acl.allowed({principalId})` → `[folderId]`
- `file.list({folderId})` → `[{id, path, size, mtime, contentHash, chunkCount, indexedAt}]`; `file.get({folderId, path})`
- `file.replace({folderId, path, size, mtime, contentHash, model, chunks})` → `{fileId, chunkCount}`: ONE transaction
  deletes the file's old chunks (chunks, chunks_fts, chunks_vec, by rowid) and inserts the new ones; each chunk is
  `{chunk_index, heading_path, char_start, char_end, page, content_hash, text, embedding}` with `embedding` a Float32Array
  of the model's dimension. Writes the embeddings into `emb_cache` too.
- `file.delete({folderId, path})` (one transaction)
- `emb.lookup({model, hashes})` → `{[hash]: Float32Array}` (reuse of unchanged chunks); `emb.put({model, items})`
- `stats()` → counts per table; `debug.rows({table, limit})` (tests only)

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

## 4. Schema (version 1; `meta.schema_version`; each migration in one transaction)

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
`pragma foreign_keys = on`. Vectors are bound as the bytes of a Float32Array (`new Uint8Array(f32.buffer)`): this build of
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
- Tests use `rig/rag_bridge.py` (an HTTP stand-in that imports the patch's own functions) and `rig/rag_bridge_shim.js`
  (an init script defining `window.pywebview.api.rag_*` over it), so the real Python rules are what the tests exercise.

## 7. `window.IngRag` (phase 1)

`available()`, `ready()` (opens the store and the embedder), `folders()`, `addFolder()` (the dialog, then
`folder.add` and an ACL row for "me"), `removeFolder(id)`, `indexFolder(id, {onProgress})` (manual), `stats()`,
`_store`, `_embedder` (tests). Off unless the page runs in the desktop app; nothing goes online.

## 8. Tests

Playwright in headless Chromium (`/opt/node-tools/node_modules/playwright`), named `rig/t_rag1_*.js`, run as
`node rig/t_rag1_x.js <base url> <out>`. A small harness page (`rag/test/harness.html`) loads `rag/main.js` with the
stand-in bridge for the unit-level tests; the end-to-end test uses the built page with `rag/` beside it. The vendor tree
for tests is unpacked from the release "rag-vendor" (see the README); on this build machine it is already unpacked at
`/tmp/claude-0/-home-user/f70d4091-5e3f-5b2b-9e4a-4f66b5694ecf/scratchpad/rag0/vendor` (the same tree, checked).
