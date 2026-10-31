# Folder search, phase 1: the store and the embedder ("core")

Written 31 October 2026. Files: `rag/store.worker.js`, `rag/store.js`, `rag/embedder.worker.js`, `rag/embedder.js`,
`rag/test/harness.html`, `rag/test/serve.py`, `rig/t_rag1_store.js`, `rig/t_rag1_embed.js`; one added line (with a reason) in
`rag/vendor.json`. SPEC.md was not at the given path (`scratchpad/rag0/SPEC.md` does not exist); I followed DESIGN.md.

## 1. Things the next parts must know first

1. **`transformers.web.min.js` cannot run in a browser.** It starts with `import ... from "onnxruntime-web/webgpu"` and
   `from "onnxruntime-common"`: bare names that only a bundler resolves, and a module worker cannot use import maps. Checked
   in headless Chromium: "Failed to resolve module specifier". The same tarball (integrity already pinned) holds
   `dist/transformers.min.js`, which has ONNX Runtime inside it and loads. `vendor.json` now lists it
   (`transformers/transformers.min.js`, SHA-256 8b5a3171...decb, 587,917 bytes) and I copied it into the unpacked vendor tree
   with its VENDOR.txt row. The "web" file stays in the list unused. `embedder.worker.js` imports the standalone one.
2. **ONNX Runtime files.** Given only a folder (`wasmPaths = vendorBase + 'ort/'`, as DESIGN says) the library asks for
   `ort-wasm-simd-threaded.asyncify.{mjs,wasm}`, which are not in the vendor list. The worker names the plain pair in full:
   `wasmPaths = {mjs: ort/ort-wasm-simd-threaded.mjs, wasm: ort/ort-wasm-simd-threaded.wasm}` (the CPU build; it is what
   Transformers.js itself picks for Safari before 26). The two `.jsep.*` files in `vendor.json` are not used. Also
   `env.useWasmCache = false` (no Cache API copy, no blob: module).
3. **`env.localModelPath` is a path, not an address.** DESIGN says `vendorBase + 'models/'`. With a full `http://127.0.0.1:...`
   address Transformers.js never looks at local files (its existence check treats an address as remote) and fails inside
   with "Cannot read properties of undefined (reading 'tokenizer_class')". The worker sets the path part
   (`/rag/vendor/models/`, derived from `vendorBase`, same origin required).
4. **Do not pass a progress callback to Transformers.js**: it then reads `config.json` and the model file twice (a metadata step
   that does a full GET for local files). The worker sends stage events instead (`library, tokenizer, model, warm-up, ready`).
   Each big file is now read once (tested).
5. **The vendored OPFS installer deletes the database when it fails to start** (`installOpfsSAHPoolVfs` calls `removeVfs()` on
   any failed start, and remembers the failure for the life of the worker). A start fails when another window, or the page
   just reloaded, still holds the files. So the store first tries the files itself, waits up to 8 s (`lockWaitMs`), and
   answers `OPFS_LOCKED` without ever calling the installer. Tested: a second worker on the open index gets `OPFS_LOCKED`, the
   first is unharmed, nothing lost after a reload.
6. **q8 vectors depend slightly on their batch.** The quantized model quantizes whole batches, so the same text embedded alone
   and inside a batch of 40 differs: cosine 0.988 to 0.996. Never compare a stored vector with a fresh one for equality; the
   cache (`emb_cache`) returns exactly what was stored.
7. **Pooling.** DESIGN (and the Xenova card) say mean pooling; BAAI's own bge card uses the CLS token. Both work here
   (`init({pooling: 'cls'})`); on the card's panda example mean gives 0.386, 0.802, 0.687 and CLS 0.431, 0.820, 0.710 (the
   card's fp32 numbers for mean: 0.391, 0.800, 0.691). They give different vectors (cosine about 0.94 to each other), so an
   index records one. Worth a comparison on her own texts in Phase 5 (`eval.js`) before the index is big.
8. **`folders.id` is reused.** DESIGN's `integer primary key` has no AUTOINCREMENT, so after the newest folder is removed the
   next folder gets the same id. A caller that still holds the old id (for example an `indexFolder(id)` in flight while the
   folder is removed and added again) would address the new folder. Check the folder's `path` as well when it matters.

## 2. What was built

### Store (`store.worker.js` + `store.js`)
- One module worker, the only SQLite connection. SQLite 3.45.3, sqlite-vec 0.1.6, FTS5. `vfs: 'opfs-sahpool'` (default; pool
  directory `.ingenium-rag`, database `rag.sqlite3`) or `'memory'` (touches no OPFS; tested).
- Schema version 1 is DESIGN section 4 word for word (the tests compare columns, flags, defaults, foreign keys, unique
  constraints and the two virtual tables). `foreign_keys = on`. Migrations are an ordered list (`MIGRATIONS`): each step runs in
  one transaction together with `meta.schema_version`; a failing step changes nothing; a database newer than the list is
  refused (`SCHEMA_TOO_NEW`); re-running is a no-op. `debug.migrate` lets tests append steps.
- Every op of section 3: `open principal.ensure folder.add folder.list folder.remove folder.touch acl.grant acl.revoke
  acl.allowed file.list file.get file.replace file.delete emb.lookup emb.put stats debug.rows`. `file.replace`, `file.delete`
  and `folder.remove` are one transaction each; vectors are bound as `new Uint8Array(f32.buffer, offset, length)`.
- Replies: `{id, ok: true, result}` or `{id, ok: false, error: {name, message, code, resultCode, stack}}` (an object, not a
  string; the client turns it into an `Error` with `.code`, `.op`). Event `{event: 'hello', worker: 'store'}`.
- Client API (`store.js`): `createStore()`, then `store.open()`, `store.principal.ensure`, `store.folder.{add,list,remove,touch}`,
  `store.acl.{grant,revoke,allowed}`, `store.file.{list,get,replace,delete}`, `store.emb.{lookup,put,prune}`, `store.stats()`,
  `store.info()`, `store.compact()`, `store.call(op, args)`, `store.terminate()`. Worker and vendor addresses come from the
  module's own address (they sit beside it), so it works in the apps and in the harness. Float32Arrays in `file.replace` and
  `emb.put` are transferred (the caller's arrays are emptied) unless they are views of a bigger buffer or `{transfer: false}`.
- Behaviour beyond the contract (all tested):
  - `folder.add` of a known path returns the same folder (`created: false`) and applies a changed name or `manualOnly`;
    `folder.list` rows also carry `fileCount` and `chunkCount`.
  - Validation before any write: wrong vector length ("embedding has 383 values, this index holds 384"), NaN, wrong types,
    unknown folder. `file.replace` of a file with no chunks records it with `chunk_count` 0.
  - `emb_cache` keeps nothing nobody uses: `file.replace`, `file.delete` and `folder.remove` drop the cache entries of the
    chunks they removed unless another chunk (in any file) has the same hash; so "nothing left in any table" is literally true
    (with every folder removed `stats()` is `{meta:1, principals:2, others 0}`). `emb.prune` drops all unused entries.
  - `open({dims})` makes an index for a model with longer vectors (see 4); asking a stored index for other dims is
    `DIMS_MISMATCH`.
  - `info()`: `{schemaVersion, vfs, sqlite, vec, dims, dbName, bytes, persisted, storage: {quota, usage}}`. `persist()` is not
    available in workers, so `store.open()` asks for it on the page and the worker reports `persisted()`.
  - `compact()`: new indexes are made with `auto_vacuum = incremental` (a file setting, only possible before the first table), so
    removing a folder can give its pages back; and sqlite-vec 0.1.6 keeps the (1,024-vector, 1.5 MB at 384 values) block of a
    removed folder forever, so `compact()` deletes empty blocks from vec0's own tables (pinned version only, columns checked,
    never the block with the highest number because vec0 numbers blocks in two places that must stay in step, count compared
    afterwards). Volume test: removing a 400-chunk folder, 7.2 MB to 3.4 MB after compact. `emb.prune` also drops the cache
    entries the indexer keeps for a file it is still working on (`emb.put` before `file.replace`): call it only when no
    indexing is running.
  - Test-only: `debug.sql` (one select), `debug.fail({after})` (one injected failure inside the next `file.replace`),
    `debug.migrate`, `debug.wipe`.
- Timings in OPFS (headless Chromium, loaded machine): 400 chunks of 1.8 kB with 384-value vectors, written in one transaction
  1.1 to 2.3 s, written over itself 2.2 to 4.6 s, `folder.remove` 0.7 to 1.2 s, reopening an index 0.8 to 1.0 s (mostly
  starting SQLite).

### Embedder (`embedder.worker.js` + `embedder.js`)
- Transformers.js 4.3.2 (standalone build), `Xenova/bge-small-en-v1.5`, q8, `device: 'wasm'`, one thread. Settings of DESIGN
  with the two corrections above. `allowRemoteModels = false`: a missing file is an error, never a download.
- `init({modelId, dtype, device, pooling, batchSize, vendorBase})` -> `{modelId, dtype, device, pooling, key, dims, maxTokens,
  batchSize, calls, embedded, batches, counted, atLimit, loads, loadMs, ready}`. `dims` is read from the model (a warm-up run
  that is not counted), `maxTokens` from the tokenizer/config (512). A second init for the loaded model loads and fetches
  nothing (tested: zero requests); a different model loads first and replaces the old one only when it has loaded; a model
  that is not on this computer is `MODEL_NOT_INSTALLED` (HEAD checks, names the missing files) and leaves the working model.
- `embed({texts, kind})`: mean pooling, normalised (length 1 +/- 1e-4), batches of 16, a query gets "Represent this sentence
  for searching relevant passages: " (tested equal to the prefixed text as a passage), each vector has its own buffer.
  `count({texts, special = true})`: the model's tokenizer, specials counted ("Hello world." = 5), never cut at the limit.
  `info()` counters: `calls` (embed requests), `embedded` (texts), `batches` (model runs), `counted`, `atLimit` (texts that
  reached 512 tokens and were cut); they count from the init that loaded the model; failed and empty requests change nothing.
- Request recording: `t_rag1_embed.js` records every request of the page and its workers and refuses any that leaves
  `127.0.0.1`: 88 requests in the whole run, none outside; loading reads each big file once.
- Optional pool: `createEmbedder({workers: n})` (default 1) starts n workers, each with its own model copy; `embed` shares the
  batches of 16 out to whichever is free and returns them in order; `info()` adds the counters and lists `perWorker`;
  `suggestWorkers({cores, spareGB, tier})` = half the cores, at most a fifth of the spare memory, at most 4, at least 1.

## 3. Her devices (the owner asked that the other computers be considered, not only the MacBook Pro)

The memory, not the disk, decides which model a computer holds; the models for this feature are small. What the code does:

| Device | Embedder | Workers | Index |
| --- | --- | --- | --- |
| MacBook Pro, about 5.4 GB to spare | small (shipped, verified), always | 2 at most (a fifth of the spare memory) | 384 values |
| Two Windows laptops, 16 GB, graphics chip unknown | small by default; base once installed and about 6 GB spare; runs on the processor (WebAssembly), `device: 'webgpu'` is accepted but untested | 2 to 3 | 384, or 768 with base |
| Mac mini (M-series, 16 GB, 256 GB SSD, 2 TB + 64 GB + 32 GB external) | base once installed with 6 GB spare; large only if asked (`strongest`) and 10 GB spare | up to 4 | 768 (1024 with large) |

- `MODEL_TIERS` (in `embedder.js`): small `Xenova/bge-small-en-v1.5` 384 values, 34 MB (measured); base `bge-base-en-v1.5` 768 values and
  large `bge-large-en-v1.5` 1024 values, about 110 MB and 335 MB (read off the parameter counts, **not measured**, and
  **not fetched or run**: huggingface.co cannot be reached from the build machine). Each says `shipped`/`verified` honestly.
  `pickTier({spareGB, installed, strongest})` returns the strongest tier that is installed and fits, else small, with a
  reason; `embedder.modelFiles(id, dtype)` says whether a model's files are on this computer. The memory thresholds
  (1.5 / 6 / 10 GB spare) are my estimates; `workerGB` is measured for small only (0.4 GB: +0.2 GB at load, +0.2 GB after the
  first full batch; a second worker +0.37 GB) and scaled for the others.
- **Disk.** The index lives in the browser's private storage on the computer's own disk (not on an external drive); the folders
  she indexes can be on the external drives. Measured (4,096 chunks of 1,800 characters, growth from 2,048 to 4,096):
  8,650 bytes a chunk with 384 values, 12,700 with 768, 17,800 with 1024 (vectors are stored twice, in the vec table and the
  cache; a 1024-value cache row fills an 8 KB page by itself). `estimateIndexBytes({chunks, dims, folders})` in `store.js` is
  within 30% of a measured index (test). Examples: 100,000 chunks 0.9 GB (small), 1.3 GB (base), 1.8 GB (large); 300,000 chunks
  2.6, 3.8, 5.3 GB. On the 256 GB Mac mini that is small. The browser also caps what an origin may keep: `info().storage.quota`
  (3 GB in the test browser; read it before a big index).
- The model files can live anywhere the app serves (`vendorBase` is a parameter), so the external drives can hold the larger
  models if the desktop part serves them under `rag/vendor/models/`.

## 4. How to add a stronger model (not done; needs the network)
1. Add `Xenova/bge-base-en-v1.5` (and/or large) to `vendor.json` "hf" with its six files (`config.json, tokenizer.json,
   tokenizer_config.json, special_tokens_map.json, README.md, onnx/model_quantized.onnx`), pin the SHA-256 (run
   `fetch_vendor.py --list-hf` after adding the repo to "hf_list"), fetch into `rag/vendor/models/`.
2. A new index: `store.open({dbName: 'rag-base.sqlite3', dims: 768})` and `embedder.init({modelId: 'Xenova/bge-base-en-v1.5'})`;
   pass `init().key` ("model|dtype|pooling") as `model` to `file.replace`/`emb.*`, so vectors of different models never meet.
3. Run `rig/t_rag1_embed.js`'s retrieval part against it. Vectors of different lengths cannot share an index.

## 5. Tests (headless Chromium, Playwright 1.63, `node rig/t_rag1_*.js http://127.0.0.1:8175/ <out>`)
Start the server first (it maps `/rag/` to `source/rag` and `/rag/vendor/` to the unpacked tree; no COOP/COEP; wasm and mjs
types as the app's server):
`python3 rag/test/serve.py 8175 --vendor <vendor tree>`   (I left it running on port 8175, pid 15592 when I finished; the page is
`/rag/test/harness.html` and also `/harness.html`; the tests take the server address or the harness address).
- `rig/t_rag1_store.js`: **106 passed, 0 failed** (4 runs in a row after the last change, 25 to 30 s each, also with the harness
  address as the argument): schema and version, migrations (a later step, re-run, failing
  step rolled back, order), principals, folders, ACL (two users, filters by `json_each` in vec0 and FTS5), `file.replace`
  (rows, FTS, vectors bit for bit, replaced cleanly, injected failure after 2 of 4 chunks and for a new file leave every table
  as it was), validation, delete and remove leave nothing in any table, cache reuse and per-model, transfer rules, dims 768,
  size estimate, OPFS reload (page.reload twice), second window (`OPFS_LOCKED`), 400-chunk volume, `compact`.
- `rig/t_rag1_embed.js`: **65 passed, 0 failed** (3 runs after the last change; 60 s, up to 2 min 15 s at load average 25): request recording, 384
  values of length 1, retrieval pairs (Cluny, Roman law, Kant, recipe distractor: each question finds its own passage by at
  least 0.27), the card's panda example, the prefix, batching (1/16/17/33/40 texts = 1/1/2/3/3 batches), counts, counters, second
  init (no request), missing models, CLS pooling, tiers for her devices, `suggestWorkers`, the 2-worker pool.
- Both check: every part ran, no script or worker errors, no console errors (except the 404s the browser logs for probes of
  models that are deliberately not installed), nothing requested outside 127.0.0.1.
- **Speed is not measured.** The build machine was overloaded (load average 8 to 28 on 4 processors) while these ran:
  one worker took 0.7 to 2.0 s for a 400-token chunk; two workers were 0.92 times and 1.51 times as fast on the same 16 chunks
  in two runs. That says nothing about her computers; the pool's speed-up could not be shown cleanly here (its correctness is
  tested). A single thread of this model does roughly 20
  GFLOP per chunk, so expect hours, not minutes, for a large library on one worker: Phase 3 should use the pool and measure.

## 6. Fit with the other parts (read, not run together)
`rag/indexer.js` (index part) calls exactly this API: `embedder.info()/init()` with `info.key` as the cache model,
`embedder.count({texts})`, `embedder.embed({texts, kind})`, `store.emb.lookup`, `store.emb.put(..., {transfer})`,
`store.file.replace/list/delete`, `store.folder.list/touch`; its FATAL list (`WORKER_FAILED, WORKER_STOPPED, NOT_OPEN,
OPFS_LOCKED, OPFS_UNAVAILABLE, NOT_READY, MODEL_NOT_INSTALLED, MODEL_UNREADABLE`) is the set of codes these workers emit.

## 7. Left
- Not run on WebKit (macOS) or WebView2 (Windows): everything above is Chromium. On macOS 13.x the SAH pool may refuse to start
  (older WebKit has an asynchronous `close()` on sync access handles: the store answers `OPFS_UNAVAILABLE`); the first Mac run of
  these tests is the real check. `sqlite3.mjs` writes one console warning at start (no SharedArrayBuffer for the other OPFS
  file system): harmless.
- Stronger models: not fetched, not run (section 4). WebGPU not tried.
- The index records no model: `file.replace({model})` does not refuse a different model than the vectors came from. Phase 2/3
  should refuse it (or keep one index per `key`), and record the pooling.
- `main.js` should: call `store.compact()` after removing a big folder, show `info().storage` and `estimateIndexBytes`, pass
  `suggestWorkers(...)` to `createEmbedder`, treat `OPFS_LOCKED` as "another window has the index open", and run only one of the
  desktop app's windows against the index.
- A removed folder's id can be reused (1.8); an external drive that is unplugged leaves a stale index: not handled here.
