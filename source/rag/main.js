// INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
// NO LICENCE IS GRANTED. See LICENCE.txt.
//
// The folder search's wiring: window.IngRag (rag/DESIGN.md section 7). The page's loader (build/modules/r202.js) imports this file,
// inside the desktop app only, when the app's folder bridge (window.pywebview.api.rag_list) is there. Importing it starts nothing:
// the store (SQLite in the browser's private storage), the embedder (the reading model) and the parse worker are started by the
// first call that needs them, they are files beside the page, and nothing goes online.
//
//   IngRag.available()                       true where the app's folder bridge is (the Mac and Windows apps); false anywhere else
//   await IngRag.ready()                     opens the store and the embedder, makes the indexer -> {schemaVersion, vfs, dims, modelId, workers}
//   await IngRag.folders()                   the folders of the user "me": [{id, name, path, files, passages, addedAt, lastReadAt, manualOnly,
//                                            available, job, last}]   (opens the store only; the embedder is not loaded for this)
//   await IngRag.addFolder()                 the app's folder dialog, then the folder and an ACL row for "me" -> {cancelled, folder, again}
//   await IngRag.removeFolder(id)            the folder with its files, passages, text-search rows and vectors in one transaction, the app
//                                            forgets it, and compact() gives the room back after a big one -> {removed, files, chunks, forgot, compacted}
//   await IngRag.indexFolder(id, {onProgress, signal, force})
//                                            reads the folder now (manual); one folder at a time, the others wait their turn -> the indexer's summary
//   IngRag.stopReading(id)                   stops after the file in hand (the vectors already made are kept)
//   await IngRag.stats() / IngRag.state() / IngRag.running() / IngRag.on(fn) / IngRag.config(opts) / await IngRag.shutdown()
//   IngRag.config({workers, spareGB, bigFolderChunks, embedBatch}); IngRag.suggestedWorkers()  (workers: embedder workers, 1 unless asked for more)
//   IngRag._store / _embedder / _indexer / _principalId   (the live clients, for tests)
//
// THE USER. One user now, "me": every folder added gets an ACL row for her (folder_acl), and folders() asks the store for the folders
// she is allowed (the same SQL filter the retriever will use). The permission rules separate the app's users from one another; they
// do not protect against a person who can open this computer's browser storage directly.
//
// ANOTHER WINDOW. The index is one set of files that one worker may hold. A second Ingenium window that asks for it gets
// OPFS_LOCKED from the store (after waiting about 8 s); here that is "another window has the folder search open": state().status is
// 'locked', the error carries .code 'OPFS_LOCKED' and plain words in .plain, and a later call tries again.
//
// A reading's job is 'waiting' (another folder is being read), 'starting' (its turn; the store and the model open) or 'reading'.
// Events (IngRag.on(fn); fn gets one object): {type: 'status', status, problem} | {type: 'folders'} | {type: 'queued' | 'start', folderId}
// | {type: 'progress', folderId, progress} | {type: 'done', folderId, summary | error}.

import * as bridge from './folders.js';
import { createStore } from './store.js';
import { createEmbedder, suggestWorkers, MODEL_TIERS } from './embedder.js';
import { createIndexer } from './indexer.js';

const PRINCIPAL = 'me';

const S = {
  status: bridge.available() ? 'idle' : 'off',   // off | idle | opening | open | loading | ready | locked | unavailable | failed
  problem: null,                                   // {code, plain} when status is locked, unavailable or failed
  store: null, opened: null, principalId: null, storePromise: null,
  embedder: null, embedInit: null, indexer: null, readyPromise: null,
  jobs: new Map(),                                 // folderId -> {folderId, status: 'waiting' | 'starting' | 'reading', controller, progress}
  lastRun: new Map(),                              // folderId -> {at, summary | error}
  listeners: new Set(),
  adding: false,
  config: { workers: null, spareGB: null, bigFolderChunks: 200, embedBatch: 32 },
};

// ------------------------------------------------------------------------------------------------------ plain words for the failures
const PLAIN = {
  NO_BRIDGE: 'Folders can only be read inside the Ingenium app on a Mac or a Windows computer.',
  OPFS_LOCKED: 'Another Ingenium window has the folder search open. Close that window, then try again.',
  OPFS_UNAVAILABLE: "This computer's web view cannot keep the folder search yet. It needs a newer version of the system.",
  SCHEMA_TOO_NEW: 'The folder search was made by a newer Ingenium. Update Ingenium to use it.',
  DIMS_MISMATCH: 'The folder search was made for a different reading model than this one.',
  MODEL_NOT_INSTALLED: "Ingenium's reading model is missing from this copy of the app, so folders cannot be read.",
  MODEL_UNREADABLE: "Ingenium could not load its reading model, so folders cannot be read.",
  WORKER_FAILED: 'The folder search could not start. Close Ingenium and open it again.',
  WORKER_STOPPED: 'The folder search was stopped.',
  FOLDER_UNAVAILABLE: 'This folder cannot be read now. If it is on a drive, connect the drive and try again.',
  ALREADY_RUNNING: 'This folder is being read already.',
  NO_SUCH_FOLDER: 'This folder is not in the folder search any more.',
  BUSY: 'A folder window is open already. Finish with it first.',
  NOT_CHOSEN: 'The app does not have this folder on its list. Add it again.',
};
const FATAL_STATUS = { OPFS_LOCKED: 'locked', OPFS_UNAVAILABLE: 'unavailable', SCHEMA_TOO_NEW: 'failed', WORKER_FAILED: 'failed', DIMS_MISMATCH: 'failed' };

function coded(code, message) { const e = new Error(message || PLAIN[code] || code); e.code = code; e.plain = PLAIN[code] || message || code; return e; }
function explain(e) {
  if (!e || typeof e !== 'object') e = new Error(String(e));
  if (!e.plain) {
    if (e.name === 'QuotaExceededError') e.plain = 'There is not enough room on this computer for the folder search.';
    else e.plain = PLAIN[e.code] || (e.message ? String(e.message) : 'Something went wrong.');
  }
  return e;
}
const abortError = () => { const e = new Error('stopped'); e.name = 'AbortError'; return e; };

function emit(ev) { S.listeners.forEach((fn) => { try { fn(ev); } catch (_) { /* a listener's error is its own */ } }); }
function setStatus(status, problem) {
  if (S.status === status && !problem && !S.problem) return;
  S.status = status; S.problem = problem || null;
  emit({ type: 'status', status, problem: S.problem });
}
function failStatus(e) {
  const st = FATAL_STATUS[e && e.code];
  if (st) setStatus(st, { code: e.code, plain: e.plain });
  else if (S.status === 'opening' || S.status === 'loading') setStatus(S.store ? 'open' : 'idle');
}

// ------------------------------------------------------------------------------------------------------ the store
function openStore() {
  if (S.storePromise) return S.storePromise;
  const p = (async () => {
    if (!bridge.available()) { setStatus('off'); throw coded('NO_BRIDGE'); }
    setStatus('opening');
    const store = createStore();
    let opened;
    try { opened = await store.open(); }
    catch (e) { try { store.terminate(); } catch (_) { /* gone */ } throw explain(e); }
    try { S.principalId = (await store.principal.ensure({ name: PRINCIPAL })).id; }
    catch (e) { try { store.terminate(); } catch (_) { /* gone */ } throw explain(e); }
    S.store = store; S.opened = opened;
    setStatus(S.embedder ? 'ready' : 'open');
    return store;
  })();
  S.storePromise = p;
  p.catch((e) => { if (S.storePromise === p) S.storePromise = null; failStatus(e); });
  return p;
}

// ------------------------------------------------------------------------------------------------------ the embedder and the indexer
// ONE embedder worker unless the caller asks for more (IngRag.config({workers: n})). Measured 1 November 2026 in headless Chromium
// (ps, the resident memory of every browser process added up): the built page open and nothing read, 958 MB; reading a folder of
// short files, 1,273 MB with one worker and 1,511 MB with two; on a small page an embedder worker grew the browser by 640 MB on
// passages of 533 tokens (two workers by 1,260 MB, three by 1,780 MB), and a worker takes about 1.1 s a passage of that size. So one
// worker keeps the whole under the owner's 2 GB and a second would take it past (rag/notes/integrate.md has the figures for the whole
// corpus). suggestedWorkers() is what embedder.js's suggestWorkers says for this computer (half its processors, a fifth of its spare
// memory), for a settings choice later; a computer with room may use it.
function pickWorkers() {
  const w = S.config.workers;
  return Number.isFinite(w) && w >= 1 ? Math.min(4, Math.floor(w)) : 1;
}
function suggestedWorkers() {
  const c = S.config, nav = typeof navigator !== 'undefined' ? navigator : {};
  const spare = Number.isFinite(c.spareGB) ? c.spareGB : (nav.deviceMemory ? nav.deviceMemory * 0.5 : 4);
  return suggestWorkers({ cores: nav.hardwareConcurrency || 2, spareGB: spare, tier: MODEL_TIERS[0] });
}

function ready() {
  if (S.readyPromise) return S.readyPromise;
  const p = (async () => {
    const store = await openStore();
    setStatus('loading');
    const embedder = createEmbedder({ workers: pickWorkers() });
    let init;
    try { init = await embedder.init(); }
    catch (e) { try { embedder.terminate(); } catch (_) { /* gone */ } throw explain(e); }
    if (S.opened && init.dims !== S.opened.dims) { try { embedder.terminate(); } catch (_) { /* gone */ } throw coded('DIMS_MISMATCH'); }
    S.embedder = embedder; S.embedInit = init;
    S.indexer = createIndexer({ store, embedder, embedBatch: S.config.embedBatch });
    setStatus('ready');
    return { schemaVersion: S.opened.schemaVersion, vfs: S.opened.vfs, dims: init.dims, modelId: init.modelId, workers: embedder.workers };
  })();
  S.readyPromise = p;
  p.catch((e) => { if (S.readyPromise === p) S.readyPromise = null; failStatus(e); });
  return p;
}

// ------------------------------------------------------------------------------------------------------ progress of a reading
function newProgress(folderId) {
  return { folderId, phase: 'waiting', startedAt: null, total: 0, changed: 0, index: 0, path: null, size: 0, stage: null, stageDone: 0, stageOf: 0,
    finished: 0, skipped: 0, failed: 0, deleted: 0, passages: 0, embedded: 0, reused: 0, failures: [], etaSeconds: null, _e: null };
}
function absorb(p, ev) {
  const now = Date.now();
  switch (ev.event) {
    case 'folder-start': p.phase = 'reading'; p.total = ev.total; p.changed = ev.changed; break;
    case 'file-start': p.index = ev.index; p.path = ev.path; p.size = ev.size; p.stage = 'reading'; p.stageDone = 0; p.stageOf = 0; p.etaSeconds = null; p._e = null; break;
    case 'file-stage':
      p.path = ev.path; p.stage = ev.stage; p.stageDone = ev.done || 0; p.stageOf = ev.of || 0;
      if (ev.stage === 'embedding' && ev.of >= 100) {
        if (!p._e || p._e.path !== ev.path) p._e = { path: ev.path, t0: now, d0: ev.done || 0 };
        const secs = (now - p._e.t0) / 1000, made = (ev.done || 0) - p._e.d0;
        p.etaSeconds = made >= 64 && secs >= 15 ? Math.round((ev.of - ev.done) / (made / secs)) : null;
      } else p.etaSeconds = null;
      break;
    case 'file-done': p.finished++; p.passages += ev.chunks; p.embedded += ev.embedded; p.reused += ev.reused; p.stage = null; p.etaSeconds = null; break;
    case 'file-skip': p.skipped++; break;
    case 'file-error': p.failed++; p.failures.push({ path: ev.path, error: ev.error }); p.stage = null; break;
    case 'file-deleted': p.deleted++; break;
    case 'folder-done': p.phase = 'done'; break;
    default: break;
  }
}
const snapshot = (p) => Object.assign({}, p, { failures: p.failures.slice(), _e: undefined });

// ------------------------------------------------------------------------------------------------------ the folders
async function folders() {
  const store = await openStore();
  const rows = await store.folder.list({ principalId: S.principalId });
  let chosen = null;
  try { chosen = await bridge.chosenFolders(); } catch (_) { chosen = null; }
  const byPath = new Map((chosen || []).map((f) => [f.path, f]));
  return rows.map((r) => {
    const known = byPath.get(r.path), job = S.jobs.get(r.id), last = S.lastRun.get(r.id);
    return {
      id: r.id, name: r.name, path: r.path, files: r.fileCount, passages: r.chunkCount, addedAt: r.addedAt, lastReadAt: r.lastIndexedAt,
      manualOnly: r.manualOnly,
      available: chosen === null || !known ? null : known.available !== false,   // null: the app did not say
      job: job ? { status: job.status, progress: snapshot(job.progress) } : null,
      last: last ? { at: last.at, summary: last.summary || null, error: last.error || null } : null,
    };
  });
}

async function addFolder() {
  if (S.adding) throw coded('BUSY');
  S.adding = true;
  try {
    const store = await openStore();
    let r;
    try { r = await bridge.chooseFolder(); } catch (e) { throw explain(e); }
    if (!r || r.cancelled || r.ok === false) return { cancelled: true, folder: null, again: false };
    const name = r.name || String(r.path).split(/[\\/]/).filter(Boolean).pop() || r.path;
    const f = await store.folder.add({ name, path: r.path, source: 'bridge', manualOnly: false });
    try { await store.acl.grant({ folderId: f.id, principalId: S.principalId }); }
    catch (e) { if (f.created) { try { await store.folder.remove({ folderId: f.id }); } catch (_) { /* nothing more to do */ } } throw explain(e); }
    emit({ type: 'folders' });
    const mine = (await folders()).find((x) => x.id === f.id) || null;
    return { cancelled: false, folder: mine, again: f.created === false || !!r.again };
  } finally { S.adding = false; }
}

async function removeFolder(folderId) {
  const store = await openStore();
  const f = (await store.folder.list()).find((x) => x.id === folderId);
  if (!f) return { removed: false, files: 0, chunks: 0, forgot: null, compacted: null };
  const job = S.jobs.get(folderId);
  if (job) { stopReading(folderId); try { await job.done; } catch (_) { /* it ended, which is what was wanted */ } }
  const r = await store.folder.remove({ folderId });
  let forgot = null;
  try { const g = await bridge.forgetFolder(f.path); forgot = !g || g.forgot !== false; } catch (_) { forgot = false; }
  let compacted = null;
  if (r.removed && r.chunks >= S.config.bigFolderChunks) {
    try { compacted = await store.compact(); } catch (e) { compacted = { error: String((e && e.message) || e) }; }
  }
  S.lastRun.delete(folderId);
  emit({ type: 'folders' });
  return { removed: r.removed, files: r.files, chunks: r.chunks, forgot, compacted };
}

// ------------------------------------------------------------------------------------------------------ reading a folder (manual)
// One folder is read at a time (the embedder is one pool for all); the others wait their turn in a queue, and a waiting folder can be
// stopped or removed at once.
const queue = [];
let busy = false;

function stoppedSummary(folderId) {
  return { folderId, files: { total: 0, indexed: 0, skipped: 0, failed: 0, deleted: 0 }, chunks: 0, embedded: 0, reused: 0, ms: 0, failures: [], warnings: [], stopped: true, notes: [] };
}

function pump() {
  if (busy) return;
  const job = queue.shift();
  if (!job) return;
  busy = true;
  runJob(job).then(job.resolve, job.reject).then(() => { busy = false; pump(); });
}

function indexFolder(folderId, opts = {}) {
  if (S.jobs.has(folderId)) return Promise.reject(coded('ALREADY_RUNNING'));
  const job = { folderId, status: 'waiting', controller: new AbortController(), progress: newProgress(folderId), opts, resolve: null, reject: null, done: null };
  if (opts.signal) {
    if (opts.signal.aborted) job.controller.abort();
    else opts.signal.addEventListener('abort', () => stopReading(folderId), { once: true });
  }
  S.jobs.set(folderId, job);
  emit({ type: 'queued', folderId });
  job.done = new Promise((resolve, reject) => { job.resolve = resolve; job.reject = reject; });
  queue.push(job);
  if (job.controller.signal.aborted) stopReading(folderId); else pump();
  return job.done;
}

async function runJob(job) {
  const { folderId, opts } = job;
  let summary = null, error = null;
  try {
    job.status = 'starting'; job.progress.startedAt = Date.now();      // its turn has come: the store and the reading model may still have to open
    emit({ type: 'start', folderId });
    await ready();
    job.status = 'reading';
    emit({ type: 'progress', folderId, progress: snapshot(job.progress) });
    const onProgress = (ev) => {
      absorb(job.progress, ev);
      emit({ type: 'progress', folderId, progress: snapshot(job.progress) });
      if (opts.onProgress) { try { opts.onProgress(ev); } catch (_) { /* the caller's own */ } }
    };
    if (job.controller.signal.aborted) throw abortError();
    summary = await S.indexer.indexFolder(folderId, { onProgress, signal: job.controller.signal, force: !!opts.force, only: opts.only, confirmEmpty: !!opts.confirmEmpty });
  } catch (e) {
    if (e && e.name === 'AbortError') summary = e.summary || stoppedSummary(folderId);
    else error = explain(e);
  }
  finish(job, summary, error);
  if (error) throw error;
  return summary;
}

function finish(job, summary, error) {
  const { folderId } = job;
  S.jobs.delete(folderId);
  S.lastRun.set(folderId, error ? { at: Date.now(), error: error.plain } : { at: Date.now(), summary });
  emit({ type: 'done', folderId, summary, error });
  emit({ type: 'folders' });
}

/** Stops a reading after the file in hand; a folder still waiting for its turn leaves the queue at once. -> true when there was one. */
function stopReading(folderId) {
  const job = S.jobs.get(folderId);
  if (!job) return false;
  job.controller.abort();
  const i = queue.indexOf(job);
  if (i >= 0) {            // it never started
    queue.splice(i, 1);
    const summary = stoppedSummary(folderId);
    finish(job, summary, null);
    job.resolve(summary);
  }
  return true;
}

// ------------------------------------------------------------------------------------------------------ the rest
async function stats() {
  const store = await openStore();
  const [tables, info] = await Promise.all([store.stats(), store.info()]);
  let embedder = null;
  if (S.embedder) { try { const i = await S.embedder.info(); embedder = { modelId: i.modelId, dims: i.dims, workers: S.embedder.workers, calls: i.calls, embedded: i.embedded }; } catch (_) { embedder = null; } }
  return {
    folders: tables.folders, files: tables.files, passages: tables.chunks, tables,
    bytes: info.bytes, storage: info.storage, vfs: info.vfs, persisted: info.persisted, dims: info.dims, schemaVersion: info.schemaVersion, embedder,
  };
}

const state = () => ({ status: S.status, problem: S.problem, available: bridge.available(), principal: PRINCIPAL, running: running() });
const running = () => Array.from(S.jobs.values()).map((j) => ({ folderId: j.folderId, status: j.status, progress: snapshot(j.progress) }));

function config(opts) {
  if (opts && typeof opts === 'object') {
    for (const k of Object.keys(S.config)) if (Object.prototype.hasOwnProperty.call(opts, k)) S.config[k] = opts[k];
  }
  return Object.assign({}, S.config);
}

async function shutdown() {
  Array.from(S.jobs.keys()).forEach((id) => stopReading(id));
  await Promise.all(Array.from(S.jobs.values()).map((j) => j.done.catch(() => undefined)));
  if (S.indexer) { try { S.indexer.stop(); } catch (_) { /* gone */ } }
  if (S.embedder) { try { S.embedder.terminate(); } catch (_) { /* gone */ } }
  if (S.store) { try { S.store.terminate(); } catch (_) { /* gone */ } }
  S.indexer = S.embedder = S.store = S.embedInit = S.opened = null; S.principalId = null; S.storePromise = S.readyPromise = null;
  S.status = bridge.available() ? 'idle' : 'off'; S.problem = null;
  emit({ type: 'status', status: S.status, problem: null });
  return { shutdown: true };
}

export const IngRag = {
  version: 1,
  principal: PRINCIPAL,
  available: () => bridge.available(),
  ready, folders, addFolder, removeFolder, indexFolder, stopReading, stats, state, running, config, shutdown, suggestedWorkers,
  on(fn) { S.listeners.add(fn); return () => S.listeners.delete(fn); },
  get _store() { return S.store; },
  get _embedder() { return S.embedder; },
  get _indexer() { return S.indexer; },
  get _principalId() { return S.principalId; },
};

if (typeof window !== 'undefined') window.IngRag = IngRag;
export default IngRag;
