// INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
// NO LICENCE IS GRANTED. See LICENCE.txt.
//
// The page's side of the folder search's embedder (rag/embedder.worker.js; DESIGN section 3). Every method returns a Promise.
//
//   import { createEmbedder } from './embedder.js';
//   const emb = createEmbedder();
//   const { modelId, dims, maxTokens } = await emb.init();          // Xenova/bge-small-en-v1.5, q8: 384 values, 512 tokens
//   const counts = await emb.count({ texts });                       // [tokens], with the model's own tokenizer
//   const vecs = await emb.embed({ texts, kind: 'passage' });        // [Float32Array(dims)], length 1, own buffers
//   const [q] = await emb.embed({ texts: [question], kind: 'query' });
//   await emb.info();                                                // {modelId, dims, maxTokens, calls, embedded, ...}
//
// emb.count / emb.embed also take the array itself: emb.embed(texts, 'query'). Errors reject with an Error that has .code
// (BAD_ARGS, NOT_READY, MODEL_NOT_INSTALLED, MODEL_UNREADABLE, ...) and .op.
//
// STRONGER MODELS FOR STRONGER COMPUTERS. The default model is the small one because it must run everywhere, down to the
// MacBook Pro with about 5.4 GB of memory to spare. A computer with room can use a larger model of the same family: init takes
// any modelId and dtype whose files are in vendor/models/ (init says MODEL_NOT_INSTALLED if they are not, and goes nowhere
// else to look). MODEL_TIERS lists the candidates and pickTier() chooses among those installed by the memory that is spare.
// The index holds vectors of ONE model (its vec table has a fixed length): a different length needs store.open({dims}) on a
// new index, and every file embedded again. Use `key` from init()/info() ("model|dtype|pooling") to tell indexes apart.

export const DEFAULT_MODEL_ID = 'Xenova/bge-small-en-v1.5';
export const QUERY_PREFIX = 'Represent this sentence for searching relevant passages: ';
export const BATCH_SIZE = 16;
export const EMBEDDER_WORKER_URL = new URL('./embedder.worker.js', import.meta.url).href;
export const VENDOR_BASE = new URL('./vendor/', import.meta.url).href;

// The candidates, smallest first. `shipped`: the files are in the vendor list (rag/vendor.json); `verified`: it has been run
// here (31 October 2026, headless Chromium, ONNX Runtime on the processor). The sizes of the others are the parameter counts
// of their model cards read as bytes (int8 is one byte a value; the small model's file is 34,014,426 bytes for 33.4 million
// values) - not measured, because huggingface.co cannot be reached from the build machine. minSpareGB is an estimate of the
// memory the embedder needs beyond what the chat model and the system hold; speed is relative to the small model.
export const MODEL_TIERS = Object.freeze([
  Object.freeze({
    tier: 'small', modelId: 'Xenova/bge-small-en-v1.5', dtype: 'q8', pooling: 'mean', dims: 384, maxTokens: 512,
    fileMB: 34, fileMBMeasured: true, minSpareGB: 1, speed: 1, shipped: true, verified: true,
  }),
  Object.freeze({
    tier: 'base', modelId: 'Xenova/bge-base-en-v1.5', dtype: 'q8', pooling: 'mean', dims: 768, maxTokens: 512,
    fileMB: 110, fileMBMeasured: false, minSpareGB: 2.5, speed: 1 / 3.3, shipped: false, verified: false,
  }),
  Object.freeze({
    tier: 'large', modelId: 'Xenova/bge-large-en-v1.5', dtype: 'q8', pooling: 'mean', dims: 1024, maxTokens: 512,
    fileMB: 335, fileMBMeasured: false, minSpareGB: 5, speed: 1 / 10, shipped: false, verified: false,
  }),
]);

/**
 * Chooses a tier for a computer.
 * @param {{spareGB: number, installed?: string[], strongest?: boolean}} want
 *   spareGB: memory free for the embedder (the page's own measure of what the chat model leaves);
 *   installed: model ids whose files are in vendor/models/ (default: only the small one);
 *   strongest: allow the large tier (about ten times slower to index than the small one); by default the choice stops at base.
 * @returns {{tier: object, reason: string}} always a tier: the small one if nothing stronger fits or is installed.
 */
export function pickTier(want = {}) {
  const spare = Number.isFinite(want.spareGB) ? want.spareGB : 0;
  const installed = want.installed || [DEFAULT_MODEL_ID];
  const top = want.strongest ? MODEL_TIERS.length : MODEL_TIERS.length - 1;
  for (let i = top - 1; i > 0; i--) {
    const t = MODEL_TIERS[i];
    if (installed.includes(t.modelId) && spare >= t.minSpareGB) return { tier: t, reason: t.tier + ' fits: ' + spare + ' GB spare, needs about ' + t.minSpareGB + ' GB, and it is installed' };
  }
  const small = MODEL_TIERS[0];
  const stronger = MODEL_TIERS.slice(1, top).find((t) => installed.includes(t.modelId));
  return {
    tier: small,
    reason: stronger && spare < stronger.minSpareGB
      ? 'small: only ' + spare + ' GB spare, ' + stronger.tier + ' needs about ' + stronger.minSpareGB + ' GB'
      : 'small: no stronger model is installed',
  };
}

const ONNX_SUFFIX = { fp32: '', fp16: '_fp16', int8: '_int8', uint8: '_uint8', q8: '_quantized', q4: '_q4', q4f16: '_q4f16', bnb4: '_bnb4' };

/** Asks the app's own server which of a model's files are there (no download). -> {installed: boolean, missing: [file]} */
export async function modelFiles(modelId, dtype = 'q8', vendorBase = VENDOR_BASE) {
  const base = vendorBase + 'models/' + modelId + '/';
  const files = ['config.json', 'tokenizer.json', 'tokenizer_config.json', 'onnx/model' + (ONNX_SUFFIX[dtype] == null ? '' : ONNX_SUFFIX[dtype]) + '.onnx'];
  const missing = [];
  for (const f of files) {
    const r = await fetch(base + f, { method: 'HEAD', cache: 'no-store' });
    if (r.status === 404) missing.push(f);
  }
  return { installed: missing.length === 0, missing };
}

// ------------------------------------------------------------------------------------------------ the request/reply core
function remoteError(info, op) {
  const e = new Error(info && info.message ? info.message : 'the embedder failed');
  if (info) { e.name = info.name || 'Error'; e.code = info.code || null; e.workerStack = info.stack || null; }
  e.op = op;
  return e;
}

class Rpc {
  constructor(url, label) {
    this.url = url; this.label = label; this.worker = null; this.seq = 0; this.pending = new Map(); this.listeners = new Set();
    this.errors = []; this.dead = null;
  }
  start() {
    if (this.worker) return;
    const w = new Worker(this.url, { type: 'module' });
    w.onmessage = (e) => {
      const m = e.data || {};
      if (m.id != null && this.pending.has(m.id)) {
        const p = this.pending.get(m.id); this.pending.delete(m.id);
        if (m.ok) p.resolve(m.result); else p.reject(remoteError(m.error, p.op));
      } else if (m.event) this.listeners.forEach((f) => { try { f(m); } catch (_) { /* a listener's error is its own */ } });
    };
    w.onerror = (e) => {
      const msg = this.label + ' worker failed: ' + (e && e.message ? e.message : 'it could not start') + (e && e.filename ? ' (' + e.filename + ':' + e.lineno + ')' : '');
      this.errors.push(msg); this.dead = new Error(msg); this.dead.code = 'WORKER_FAILED';
      this.pending.forEach((p) => p.reject(this.dead)); this.pending.clear();
    };
    w.onmessageerror = () => this.errors.push(this.label + ' worker sent a message that could not be read');
    this.worker = w;
  }
  request(op, args) {
    if (this.dead) return Promise.reject(this.dead);
    this.start();
    return new Promise((resolve, reject) => {
      const id = ++this.seq;
      this.pending.set(id, { resolve, reject, op });
      try { this.worker.postMessage({ id, op, args: args || {} }); } catch (e) { this.pending.delete(id); reject(e); }
    });
  }
  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  terminate() {
    if (this.worker) { this.worker.terminate(); this.worker = null; }
    const gone = new Error(this.label + ' worker was stopped'); gone.code = 'WORKER_STOPPED';
    this.pending.forEach((p) => p.reject(gone)); this.pending.clear();
    this.dead = null;
  }
}

// ------------------------------------------------------------------------------------------------ the client
export class Embedder {
  constructor(options = {}) {
    this.workerUrl = options.workerUrl || EMBEDDER_WORKER_URL;
    this.vendorBase = options.vendorBase || VENDOR_BASE;
    this.rpc = new Rpc(this.workerUrl, 'embedder');
  }
  /** Loads the model (see embedder.worker.js). Args: {modelId, dtype = 'q8', device = 'wasm', pooling = 'mean', batchSize = 16}. */
  init(args = {}) { return this.rpc.request('init', Object.assign({ vendorBase: this.vendorBase }, args)); }
  /** Token counts: count({texts}) or count(texts). */
  count(a, special) { return this.rpc.request('count', Array.isArray(a) ? { texts: a, special } : a); }
  /** Vectors: embed({texts, kind}) or embed(texts, kind). */
  embed(a, kind) { return this.rpc.request('embed', Array.isArray(a) ? { texts: a, kind } : a); }
  info() { return this.rpc.request('info'); }
  ops() { return this.rpc.request('ops'); }
  dispose() { return this.rpc.request('dispose'); }
  /** Which of a model's files are on this computer (no download, no worker needed). */
  modelFiles(modelId = DEFAULT_MODEL_ID, dtype = 'q8') { return modelFiles(modelId, dtype, this.vendorBase); }
  onEvent(fn) { return this.rpc.on(fn); }
  get errors() { return this.rpc.errors; }
  terminate() { this.rpc.terminate(); }
}

export function createEmbedder(options) { return new Embedder(options); }
export default createEmbedder;
