// Folder search, phase 1: the embedder (rag/embedder.js and rag/embedder.worker.js; rag/DESIGN.md section 3).
// The model loads from rag/vendor with every request recorded (and any request that would leave this machine refused), 384
// values of length 1, a query scores its matching passage above unrelated ones, the query instruction, batches of 16, token
// counts from the model's own tokenizer, the counters in info(), a second init that reuses the loaded model, a model that is
// not installed, and the choice of a stronger model for the computers that have room (the owner's devices).
//   python3 rag/test/serve.py 8175 --vendor <the unpacked vendor tree>        (rag/ = source/rag, rag/vendor = the vendor tree)
//   node rig/t_rag1_embed.js http://127.0.0.1:8175/ <out folder>
// The first argument is the server's address (or the harness page's address itself).
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [BASE0, OUT] = process.argv.slice(2);
if (!BASE0 || !OUT) { console.log('usage: node rig/t_rag1_embed.js <server address or harness address> <out folder>'); process.exit(2); }
const HARNESS = /\.html($|\?)/.test(BASE0) ? BASE0 : BASE0.replace(/\/?$/, '/') + 'rag/test/harness.html';
const ORIGIN = new URL(HARNESS).origin;
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d).slice(0, 700) : '')); c ? pass++ : fail++; };
const sameJSON = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const MODEL = 'Xenova/bge-small-en-v1.5';
const PATH = (u) => new URL(u).pathname;

function pageHelpers() {
  window.T = window.T || {};
  window.T.dot = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; };
  window.T.norm = (a) => Math.sqrt(window.T.dot(a, a));
  window.T.cos = (a, b) => window.T.dot(a, b) / (window.T.norm(a) * window.T.norm(b));
}

(async () => {
  const b = await pw.chromium.launch();
  const ctx = await b.newContext();
  const external = [], requests = [], consoleErrors = [];
  await ctx.route((u) => u.origin !== ORIGIN && !/^(data|blob):/.test(u.protocol), (route) => { external.push(route.request().url()); route.abort(); });
  ctx.on('request', (r) => requests.push({ method: r.method(), url: r.url() }));
  await ctx.addInitScript(pageHelpers);
  const p = await ctx.newPage();
  const pageErrors = [];
  p.on('pageerror', (e) => pageErrors.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') consoleErrors.push({ text: m.text(), url: m.location().url }); });
  const ev = (fn, arg) => p.evaluate(fn, arg);
  await p.goto(HARNESS); await p.waitForFunction(() => window.RagHarness && window.RagHarness.ready === true, null, { timeout: 30000 });

  const SECTIONS = ['start', 'files', 'init', 'vectors', 'retrieval', 'prefix', 'batching', 'count', 'counters', 'second init', 'other models', 'pooling', 'tiers', 'speed', 'worker pool'];
  const ran = [];
  let speed1 = 0;
  const section = async (name, fn) => { try { await fn(); } catch (e) { ok(false, 'section "' + name + '" stopped: ' + (e && e.message)); } ran.push(name); };
  const seen = () => requests.length;
  const since = (n) => requests.slice(n);

  // ------------------------------------------------------------------------------------------------------------ start
  await section('start', async () => {
    const r = await ev(() => {
      const { MODEL_TIERS, pickTier, DEFAULT_MODEL_ID, QUERY_PREFIX, BATCH_SIZE } = RagHarness.embedder;
      const e = RagHarness.makeEmbedder(); window.T.emb = e;
      return { methods: ['init', 'count', 'embed', 'info', 'dispose'].map((m) => typeof e[m]), tiers: MODEL_TIERS.map((t) => t.modelId), pick: typeof pickTier, id: DEFAULT_MODEL_ID, prefix: QUERY_PREFIX, batch: BATCH_SIZE, frozen: Object.isFrozen(MODEL_TIERS) };
    });
    ok(r.methods.every((m) => m === 'function') && r.id === MODEL && r.prefix === 'Represent this sentence for searching relevant passages: ' && r.batch === 16, 'the client has init, count, embed, info; the defaults are the small BGE model, its query instruction and batches of 16', r);
  });

  // ------------------------------------------------------------------------------------------------------------ files
  await section('files', async () => {
    const n0 = seen();
    const r = await ev(async () => {
      const e = window.T.emb;
      return { small: await e.modelFiles(), base: await e.modelFiles('Xenova/bge-base-en-v1.5'), fp32: await e.modelFiles(undefined, 'fp32') };
    });
    ok(r.small.installed === true && r.small.missing.length === 0, 'modelFiles(): the small model\'s files are on this computer', r.small);
    ok(r.base.installed === false && r.base.missing.includes('config.json') && r.base.missing.includes('onnx/model_quantized.onnx') && r.fp32.installed === false && sameJSON(r.fp32.missing, ['onnx/model.onnx']), 'a stronger model that is not shipped, and a data type that is not shipped, are reported missing (no download is tried)', { base: r.base.missing, fp32: r.fp32.missing });
    ok(since(n0).every((q) => q.method === 'HEAD' && q.url.startsWith(ORIGIN + '/rag/vendor/models/')), 'asking costs only HEAD requests to this server\'s model folder', since(n0).map((q) => q.method + ' ' + PATH(q.url)).slice(0, 12));
  });

  // ------------------------------------------------------------------------------------------------------------ init
  let nBeforeInit = 0, initResult = null;
  await section('init', async () => {
    nBeforeInit = seen();
    const r = await ev(async () => {
      const e = window.T.emb; window.T.events = [];
      e.onEvent((m) => window.T.events.push(m));
      const before = await e.info();
      const t0 = performance.now();
      const init = await e.init();
      const ms = Math.round(performance.now() - t0);
      const info = await e.info();
      const prog = window.T.events.filter((m) => m.event === 'progress');
      return { before, init, info, ms, hello: window.T.events.some((m) => m.event === 'hello' && m.worker === 'embedder'), stages: prog.map((m) => m.stage), stageModel: [...new Set(prog.map((m) => m.modelId))] };
    });
    initResult = r;
    ok(r.before.ready === false && r.before.modelId === null, 'before init the embedder says it is not ready', r.before);
    ok(r.init.modelId === MODEL && r.init.dims === 384 && r.init.maxTokens === 512, 'init() gives {modelId: Xenova/bge-small-en-v1.5, dims: 384, maxTokens: 512}, the dimensions read from the model itself', { init: r.init, ms: r.ms });
    ok(r.init.dtype === 'q8' && r.init.device === 'wasm' && r.init.pooling === 'mean' && r.init.batchSize === 16 && r.init.loads === 1 && r.init.key === MODEL + '|q8|mean', 'it ran the quantized (q8) model on the processor (wasm) with mean pooling, batches of 16, one load; key is "model|dtype|pooling"', r.init);
    ok(r.info.calls === 0 && r.info.embedded === 0 && r.info.batches === 0 && r.info.counted === 0, 'the warm-up run is not counted: calls, embedded, batches and counted are all 0 after init', r.info);
    ok(r.hello && sameJSON(r.stages, ['library', 'tokenizer', 'model', 'warm-up', 'ready']) && sameJSON(r.stageModel, [MODEL]), 'the page is told how loading goes: library, tokenizer, model, warm-up, ready', { hello: r.hello, stages: r.stages });

    const mine = since(nBeforeInit);
    const paths = mine.map((q) => PATH(q.url));
    const want = ['/rag/vendor/transformers/transformers.min.js', '/rag/vendor/models/Xenova/bge-small-en-v1.5/config.json', '/rag/vendor/models/Xenova/bge-small-en-v1.5/tokenizer.json', '/rag/vendor/models/Xenova/bge-small-en-v1.5/tokenizer_config.json', '/rag/vendor/models/Xenova/bge-small-en-v1.5/onnx/model_quantized.onnx', '/rag/vendor/ort/ort-wasm-simd-threaded.mjs', '/rag/vendor/ort/ort-wasm-simd-threaded.wasm', '/rag/embedder.worker.js'];
    ok(want.every((w) => paths.includes(w)), 'loading read the library, the model\'s config, tokenizer and ONNX file, and the runtime\'s two files, all from rag/ and rag/vendor/ on this server', { missing: want.filter((w) => !paths.includes(w)) });
    const gets = (name) => mine.filter((q) => q.method === 'GET' && PATH(q.url).endsWith(name)).length;
    ok(gets('/onnx/model_quantized.onnx') === 1 && gets('/config.json') === 1 && gets('/tokenizer.json') === 1 && gets('ort-wasm-simd-threaded.wasm') === 1, 'each big file is read once: the ONNX model, config.json, tokenizer.json and the runtime\'s WebAssembly file', { onnx: gets('/onnx/model_quantized.onnx'), config: gets('/config.json'), tokenizer: gets('/tokenizer.json'), wasm: gets('ort-wasm-simd-threaded.wasm') });
    const outside = requests.filter((q) => !q.url.startsWith(ORIGIN + '/') && !/^(data|blob):/.test(q.url));
    ok(requests.length > 8 && outside.length === 0 && external.length === 0, 'no request left this machine (' + requests.length + ' requests recorded since the page opened, every one to ' + ORIGIN + '; none had to be refused)', { outside, external });
    ok(!paths.some((u) => /huggingface|jsdelivr|\.asyncify|transformers\.web/.test(u)), 'nothing asked for the hub, a CDN, the ".asyncify" runtime or the "web" build of the library', paths.filter((u) => /huggingface|jsdelivr|asyncify|web\.min/.test(u)));
  });

  // ------------------------------------------------------------------------------------------------------------ vectors
  await section('vectors', async () => {
    const r = await ev(async () => {
      const e = window.T.emb;
      const texts = ['The abbey of Cluny was founded in 910.', 'Letters of Abbot Hugh to the monastic houses.', 'Unrelated notes on Roman tax law.'];
      const v = await e.embed({ texts, kind: 'passage' });
      const v2 = await e.embed(texts, 'passage');
      return {
        n: v.length, types: v.map((x) => x instanceof Float32Array), lens: v.map((x) => x.length), norms: v.map((x) => window.T.norm(x)), finite: v.every((x) => x.every(Number.isFinite)),
        ownBuffer: v.every((x) => x.buffer.byteLength === 384 * 4 && x.byteOffset === 0), distinctBuffers: new Set(v.map((x) => x.buffer)).size,
        again: v.map((x, i) => window.T.cos(x, v2[i])), between: [window.T.cos(v[0], v[1]), window.T.cos(v[0], v[2])], empty: (await e.embed({ texts: [] })).length,
        info: await e.info(),
      };
    });
    ok(r.n === 3 && r.types.every(Boolean) && r.lens.every((l) => l === 384) && r.finite, 'embed() returns one Float32Array of 384 finite numbers per text, in order', { lens: r.lens });
    ok(r.norms.every((x) => Math.abs(x - 1) < 1e-4), 'every vector has length 1 (mean pooling, then normalised): ' + r.norms.map((x) => x.toFixed(6)).join(', '), r.norms);
    ok(r.ownBuffer && r.distinctBuffers === 3, 'each vector has a buffer of its own (so each can be handed to the store without taking the others)', { distinct: r.distinctBuffers });
    ok(r.again.every((c) => c > 0.99999) && r.between[0] < 0.95 && r.between[1] < 0.9, 'the same text gives the same vector again; different texts give different ones', { again: r.again, between: r.between });
    ok(r.empty === 0 && r.info.calls === 2, 'embedding nothing returns nothing and is not counted as a call', r.info);
  });

  // ------------------------------------------------------------------------------------------------------------ retrieval
  await section('retrieval', async () => {
    const r = await ev(async () => {
      const e = window.T.emb; const out = {};
      // the model card's own example (fp32 scores: 0.7996, 0.6911, 0.3907)
      const panda = ['Hello world.', 'The giant panda (Ailuropoda melanoleuca), sometimes called a panda bear or simply panda, is a bear species endemic to China.', 'I love pandas so much!'];
      const pv = await e.embed({ texts: panda, kind: 'passage' }); const [pq] = await e.embed({ texts: ['What is a panda?'], kind: 'query' });
      out.panda = pv.map((v) => window.T.cos(pq, v));
      // questions and passages in the owner's field; each question must find its own passage among all of them
      const passages = [
        'The Benedictine abbey of Cluny was founded in 910 by William I, Duke of Aquitaine, who gave the land to the monks and placed the house under the protection of the pope.',
        'In Roman law a slave was property, and the sale of a slave was governed by the edict of the aediles, which obliged the seller to disclose diseases and defects.',
        'In the Critique of Pure Reason Kant argues that knowledge arises from the combination of intuition and concepts, and that reason cannot reach beyond the limits of possible experience.',
        'To bake sourdough bread, mix flour, water and salt with an active starter and let the dough rise overnight before baking in a hot oven.',
      ];
      const questions = ['Who founded the abbey of Cluny, and when?', 'How did Roman law treat the sale of slaves?', 'What is the main argument of the Critique of Pure Reason?'];
      const pe = await e.embed({ texts: passages, kind: 'passage' }); const qe = await e.embed({ texts: questions, kind: 'query' });
      out.matrix = qe.map((q) => pe.map((p2) => window.T.cos(q, p2)));
      return out;
    });
    const exp = [0.3907, 0.7996, 0.6911];
    ok(r.panda[1] > r.panda[2] && r.panda[2] > r.panda[0] && r.panda.every((s, i) => Math.abs(s - exp[i]) < 0.07), 'the model card\'s example: "What is a panda?" scores the panda passage above "I love pandas so much!" above "Hello world." (' + r.panda.map((s) => s.toFixed(3)).join(', ') + '; the card\'s fp32 numbers are 0.391, 0.800, 0.691)', r.panda);
    const best = r.matrix.map((row) => row.indexOf(Math.max(...row)));
    const margin = r.matrix.map((row, i) => row[i] - Math.max(...row.filter((_, j) => j !== i)));
    ok(sameJSON(best, [0, 1, 2]), 'each question scores its own passage above every unrelated passage (Cluny, Roman law, Kant, and a recipe as the distractor)', r.matrix.map((row) => row.map((s) => +s.toFixed(3))));
    ok(margin.every((m) => m > 0.08) && r.matrix.every((row) => row[3] < 0.6), 'with a clear margin (at least 0.08), and the recipe scores low against all three questions', { margin: margin.map((m) => +m.toFixed(3)), recipe: r.matrix.map((row) => +row[3].toFixed(3)) });
  });

  // ------------------------------------------------------------------------------------------------------------ prefix
  await section('prefix', async () => {
    const r = await ev(async () => {
      const e = window.T.emb; const P = RagHarness.embedder.QUERY_PREFIX;
      const t = 'Who copied the manuscripts in the scriptorium?';
      const [asQuery] = await e.embed({ texts: [t], kind: 'query' });
      const [prefixedPassage] = await e.embed({ texts: [P + t], kind: 'passage' });
      const [asPassage] = await e.embed({ texts: [t], kind: 'passage' });
      const [dflt] = await e.embed({ texts: [t] });
      return { queryEqualsPrefixed: window.T.cos(asQuery, prefixedPassage), queryVsPassage: window.T.cos(asQuery, asPassage), defaultIsPassage: window.T.cos(asPassage, dflt), bad: await e.embed({ texts: [t], kind: 'question' }).then(() => null, (x) => x.code) };
    });
    ok(r.queryEqualsPrefixed > 0.99999, 'a query is embedded with the instruction "Represent this sentence for searching relevant passages: " ahead of it (the same vector as that sentence embedded as a passage)', r.queryEqualsPrefixed);
    ok(r.queryVsPassage < 0.995 && r.defaultIsPassage > 0.99999 && r.bad === 'BAD_ARGS', 'a passage gets no instruction (kind defaults to passage, and differs from the query); another kind is refused', { queryVsPassage: r.queryVsPassage, defaultIsPassage: r.defaultIsPassage, bad: r.bad });
  });

  // ------------------------------------------------------------------------------------------------------------ batching
  await section('batching', async () => {
    const r = await ev(async () => {
      const e = window.T.emb; const out = {};
      const texts = Array.from({ length: 40 }, (_, i) => 'Passage number ' + i + ' about ' + ['abbeys', 'tithes', 'charters', 'saints', 'rents'][i % 5] + (i % 3 === 0 ? ' with a good deal more to say about it than the others have, to make the lengths differ' : '') + '.');
      const batchesFor = async (n) => { const a = await e.info(); await e.embed({ texts: texts.slice(0, n), kind: 'passage' }); const b2 = await e.info(); return { batches: b2.batches - a.batches, embedded: b2.embedded - a.embedded, calls: b2.calls - a.calls }; };
      out.n1 = await batchesFor(1); out.n16 = await batchesFor(16); out.n17 = await batchesFor(17); out.n33 = await batchesFor(33); out.n40 = await batchesFor(40);
      const all = await e.embed({ texts, kind: 'passage' });
      const picks = [0, 7, 15, 16, 31, 39];
      const alone = await Promise.all(picks.map((i) => e.embed({ texts: [texts[i]], kind: 'passage' })));
      out.order = picks.map((i, k) => window.T.cos(all[i], alone[k][0]));
      // the vector at position i is the one for text i: it is closer to that text's own vector than to the other picks'
      out.orderMargin = picks.map((i, k) => window.T.cos(all[i], alone[k][0]) - Math.max(...picks.map((j, m) => (m === k ? -1 : window.T.cos(all[i], alone[m][0])))));
      const mixed = ['ok', 'Cluny '.repeat(200), 'a short one'];   // a short, a long and a short text padded together
      const together = await e.embed({ texts: mixed, kind: 'passage' });
      const separately = await Promise.all(mixed.map((m) => e.embed({ texts: [m], kind: 'passage' })));
      out.padding = mixed.map((m, i) => window.T.cos(together[i], separately[i][0]));
      return out;
    });
    ok(sameJSON(r.n1, { batches: 1, embedded: 1, calls: 1 }) && sameJSON(r.n16, { batches: 1, embedded: 16, calls: 1 }) && sameJSON(r.n17, { batches: 2, embedded: 17, calls: 1 }), 'batches of 16: 1 text is 1 batch, 16 texts 1 batch, 17 texts 2 batches', { n1: r.n1, n16: r.n16, n17: r.n17 });
    ok(sameJSON(r.n33, { batches: 3, embedded: 33, calls: 1 }) && sameJSON(r.n40, { batches: 3, embedded: 40, calls: 1 }), '33 texts are 3 batches, 40 texts are 3 (16 + 16 + 8), still one call', { n33: r.n33, n40: r.n40 });
    ok(r.order.every((c) => c > 0.98) && r.orderMargin.every((m) => m > 0.03), 'the order is kept: for texts picked from the first, middle and last batch the vector in the batch is the vector of that text alone (cosine ' + Math.min(...r.order).toFixed(4) + ' or more) and not another text\'s (those texts are near-duplicates of each other, so the margin is small)', { cos: r.order.map((c) => +c.toFixed(4)), margin: r.orderMargin.map((m) => +m.toFixed(3)) });
    ok(r.padding.every((c) => c > 0.98), 'a short text padded next to a long one stays close to its vector alone (cosine ' + Math.min(...r.padding).toFixed(4) + ' or more: the q8 model quantizes whole batches, so the same text differs by about 1% between batches)', r.padding.map((c) => +c.toFixed(5)));
  });

  // ------------------------------------------------------------------------------------------------------------ count
  await section('count', async () => {
    const r = await ev(async () => {
      const e = window.T.emb; const out = {};
      const a = await e.info();
      out.hello = await e.count({ texts: ['Hello world.'] });
      out.shorthand = await e.count(['Hello world.', '', 'The abbey of Cluny was founded in 910.']);
      out.noSpecial = await e.count({ texts: ['Hello world.', ''], special: false });
      out.none = await e.count({ texts: [] });
      const sentence = 'The monks of Cluny copied manuscripts in the scriptorium. ';
      out.short = (await e.count({ texts: [sentence.repeat(10)] }))[0];
      out.long = (await e.count({ texts: [sentence.repeat(90)] }))[0];
      out.sameLen = (await e.count({ texts: [sentence.repeat(10), sentence.repeat(90)] }));
      const b2 = await e.info();
      out.delta = { calls: b2.calls - a.calls, embedded: b2.embedded - a.embedded, counted: b2.counted - a.counted };
      // a text that the count says is over the limit is cut by embed (and counted as at the limit); one under it is not
      const base = await e.info();
      await e.embed({ texts: [sentence.repeat(10)] }); const mid = await e.info();
      await e.embed({ texts: [sentence.repeat(90)] }); const end = await e.info();
      out.atLimit = [mid.atLimit - base.atLimit, end.atLimit - mid.atLimit];
      out.bad = await e.count({ texts: 'no' }).then(() => null, (x) => x.code);
      return out;
    });
    ok(sameJSON(r.hello, [5]) && sameJSON(r.shorthand, [5, 2, 13]) && sameJSON(r.noSpecial, [3, 0]) && sameJSON(r.none, []), 'count() uses the model\'s own tokenizer: "Hello world." is 5 tokens with [CLS] and [SEP] (3 without), the empty text is 2; count(array) and count({texts}) agree', { hello: r.hello, shorthand: r.shorthand, noSpecial: r.noSpecial });
    ok(r.short > 100 && r.short < 160 && r.long > 512 && sameJSON(r.sameLen, [r.short, r.long]), 'a long text is counted in full, not cut at the limit (' + r.short + ' tokens for 10 sentences, ' + r.long + ' for 90)', { short: r.short, long: r.long });
    ok(r.delta.calls === 0 && r.delta.embedded === 0 && r.delta.counted === 10 && r.bad === 'BAD_ARGS', 'count() adds to "counted" only (10 texts here), not to calls or embedded; bad arguments are refused', r.delta);
    ok(sameJSON(r.atLimit, [0, 1]), 'the count agrees with embed: the 90-sentence text (over 512 tokens) is reported as reaching the model\'s limit, the 10-sentence text is not', r.atLimit);
  });

  // ------------------------------------------------------------------------------------------------------------ counters
  await section('counters', async () => {
    const r = await ev(async () => {
      const e = window.T.emb; const out = {};
      const snap = async () => { const i = await e.info(); return [i.calls, i.embedded, i.batches, i.counted, i.atLimit]; };
      const s0 = await snap();
      await e.embed({ texts: ['one'] }); const s1 = await snap();
      await e.embed({ texts: Array.from({ length: 20 }, (_, i) => 'text ' + i), kind: 'query' }); const s2 = await snap();
      await e.embed({ texts: [] }); const s3 = await snap();
      const bad1 = await e.embed({ texts: ['x'], kind: 'nonsense' }).then(() => null, (x) => x.code); const s4 = await snap();
      const bad2 = await e.embed({ texts: ['x', 5] }).then(() => null, (x) => x.code); const s5 = await snap();
      const bad3 = await e.embed({}).then(() => null, (x) => x.code); const s6 = await snap();
      out.steps = [s0, s1, s2, s3, s4, s5, s6]; out.bad = [bad1, bad2, bad3];
      out.info = await e.info();
      return out;
    });
    const d = (a, b2) => b2.map((x, i) => x - a[i]);
    ok(sameJSON(d(r.steps[0], r.steps[1]), [1, 1, 1, 0, 0]) && sameJSON(d(r.steps[1], r.steps[2]), [1, 20, 2, 0, 0]), 'info() counts: one text is call +1, embedded +1, batch +1; twenty texts are call +1, embedded +20, batches +2', { one: d(r.steps[0], r.steps[1]), twenty: d(r.steps[1], r.steps[2]) });
    ok(sameJSON(r.steps[2], r.steps[3]) && sameJSON(r.steps[3], r.steps[4]) && sameJSON(r.steps[4], r.steps[5]) && sameJSON(r.steps[5], r.steps[6]) && sameJSON(r.bad, ['BAD_ARGS', 'BAD_ARGS', 'BAD_ARGS']), 'an empty request and three bad requests (bad kind, a text that is not a string, no texts) change no counter', { bad: r.bad });
    ok(r.info.modelId === MODEL && r.info.dims === 384 && r.info.maxTokens === 512 && r.info.loads === 1, 'info() also carries {modelId, dims, maxTokens}', r.info);
  });

  // ------------------------------------------------------------------------------------------------------------ second init
  await section('second init', async () => {
    const nA = seen();
    const r = await ev(async () => {
      const e = window.T.emb; const out = {};
      const before = await e.info();
      out.again = await e.init(); out.explicit = await e.init({ modelId: 'Xenova/bge-small-en-v1.5', dtype: 'q8' });
      const after = await e.info();
      out.counters = [before.calls, before.embedded, after.calls, after.embedded]; out.loads = after.loads; out.loadMs = [before.loadMs, after.loadMs];
      out.work = (await e.embed({ texts: ['still works'] })).length;
      return out;
    });
    const nB = seen();
    ok(r.again.loads === 1 && r.explicit.loads === 1 && r.again.dims === 384 && r.loads === 1 && r.loadMs[0] === r.loadMs[1], 'a second init reuses the loaded model: same model, still one load (the first took ' + r.again.loadMs + ' ms)', { again: r.again, loads: r.loads });
    ok(nB === nA, 'a second and a third init made no request at all: nothing was fetched again (' + (nB - nA) + ' requests)', since(nA).map((q) => q.method + ' ' + PATH(q.url)));
    ok(r.counters[2] === r.counters[0] && r.counters[3] === r.counters[1] && r.work === 1, 'a reusing init does not reset the counters, and the model still embeds', r.counters);
    // two inits sent together to a new worker load the model once; that worker has to read the model files itself (a control for the recording)
    const r2 = await ev(async () => {
      const e2 = RagHarness.makeEmbedder(); window.T.emb2 = e2;
      const [a, c] = await Promise.all([e2.init(), e2.init()]);
      return [a.loads, c.loads, a.dims, c.dims];
    });
    const loadRequests = since(nB).filter((q) => q.method === 'GET' && /\/rag\/vendor\/(models|ort)\//.test(q.url));
    const onnxReads = loadRequests.filter((q) => /model_quantized\.onnx$/.test(q.url)).length;
    ok(sameJSON(r2, [1, 1, 384, 384]) && onnxReads === 1 && loadRequests.length >= 5, 'two inits sent together to a fresh worker load the model once: the ONNX file was read once, of ' + loadRequests.length + ' GET requests for model and runtime files (this also shows the request recording is working)', { r2, requests: loadRequests.map((q) => PATH(q.url)) });
  });
  await section('other models', async () => {
    const n0 = seen();
    const r = await ev(async () => {
      const e = window.T.emb; const out = {};
      const before = await e.info();
      out.base = await e.init({ modelId: 'Xenova/bge-base-en-v1.5' }).then(() => null, (x) => ({ code: x.code, message: x.message }));
      out.fp16 = await e.init({ dtype: 'fp16' }).then(() => null, (x) => ({ code: x.code, message: x.message }));
      out.path = await e.init({ modelId: '../../etc/passwd' }).then(() => null, (x) => x.code);
      out.pooling = await e.init({ pooling: 'max' }).then(() => null, (x) => x.code);
      out.batch = await e.init({ batchSize: 0 }).then(() => null, (x) => x.code);
      const after = await e.info();
      out.same = [before.modelId, after.modelId, before.loads, after.loads, before.embedded, after.embedded];
      out.works = (await e.embed({ texts: ['the working model is still there'] }))[0].length;
      return out;
    });
    const mine = since(n0).filter((q) => q.method === 'GET');
    ok(r.base && r.base.code === 'MODEL_NOT_INSTALLED' && /bge-base-en-v1\.5/.test(r.base.message) && /config\.json/.test(r.base.message) && /onnx\/model_quantized\.onnx/.test(r.base.message), 'a stronger model that is not on this computer: init says MODEL_NOT_INSTALLED, naming the model and the files that are missing', r.base);
    ok(r.fp16 && r.fp16.code === 'MODEL_NOT_INSTALLED' && /onnx\/model_fp16\.onnx/.test(r.fp16.message), 'the same for a data type that is not shipped (fp16 of the small model)', r.fp16);
    ok(r.path === 'BAD_ARGS' && r.pooling === 'BAD_ARGS' && r.batch === 'BAD_ARGS', 'a model id that is a path, a pooling that is not mean or cls, a batch size of 0 are refused', { path: r.path, pooling: r.pooling, batch: r.batch });
    ok(r.same[0] === MODEL && r.same[1] === MODEL && r.same[2] === 1 && r.same[3] === 1 && r.same[4] === r.same[5] && r.works === 384, 'a failed init leaves the working model, its counters and its load count as they were', r.same);
    ok(mine.length === 0, 'and none of that went online or even to the model folder for a file that would be downloaded (only HEAD checks: ' + since(n0).length + ' requests, ' + mine.length + ' GET)', since(n0).map((q) => q.method + ' ' + PATH(q.url)).slice(0, 8));
  });

  // ------------------------------------------------------------------------------------------------------------ pooling
  await section('pooling', async () => {
    const r = await ev(async () => {
      const e = RagHarness.makeEmbedder(); const out = {};
      out.init = await e.init({ pooling: 'cls', batchSize: 4 });
      const panda = ['Hello world.', 'The giant panda (Ailuropoda melanoleuca), sometimes called a panda bear or simply panda, is a bear species endemic to China.', 'I love pandas so much!'];
      const pv = await e.embed({ texts: panda }); const [pq] = await e.embed({ texts: ['What is a panda?'], kind: 'query' });
      out.cls = pv.map((v) => window.T.cos(pq, v));
      out.norms = pv.map((v) => window.T.norm(v));
      const m = await window.T.emb.embed({ texts: panda }); out.vsMean = m.map((v, i) => window.T.cos(v, pv[i]));
      out.batches = (await e.embed({ texts: Array.from({ length: 9 }, (_, i) => 'text ' + i) }), (await e.info()).batches);
      e.terminate();
      return out;
    });
    ok(r.init.pooling === 'cls' && r.init.batchSize === 4 && r.init.key === MODEL + '|q8|cls' && r.norms.every((x) => Math.abs(x - 1) < 1e-4), "pooling: 'cls' and batchSize: 4 are honoured (own key, vectors still length 1)", r.init);
    ok(r.vsMean.every((c) => c < 0.9999) && r.cls[1] > r.cls[0], 'CLS pooling gives different vectors from mean pooling (so an index must record which one built it), and still ranks the panda passage first', { vsMean: r.vsMean.map((x) => +x.toFixed(4)), cls: r.cls.map((x) => +x.toFixed(3)) });
    ok(r.batches === 5, 'with batchSize 4, nine texts are 3 batches (4 + 4 + 1): 5 batches in all with the three panda passages (1) and the query (1)', r.batches);
    console.log('INFO  "What is a panda?" against [hello, panda passage, pandas]: CLS pooling ' + r.cls.map((x) => x.toFixed(3)).join(', ') + ' (mean pooling, the setting of DESIGN, is in the retrieval part above; the model card of BAAI/bge uses the CLS token, the Xenova card and DESIGN mean pooling)');
  });

  // ------------------------------------------------------------------------------------------------------------ tiers
  await section('tiers', async () => {
    const r = await ev(() => {
      const { MODEL_TIERS, pickTier, DEFAULT_MODEL_ID } = RagHarness.embedder;
      const small = DEFAULT_MODEL_ID, base = 'Xenova/bge-base-en-v1.5', large = 'Xenova/bge-large-en-v1.5';
      const pick = (o) => { const x = pickTier(o); return x.tier.tier + ' | ' + x.reason; };
      return {
        tiers: MODEL_TIERS.map((t) => ({ tier: t.tier, id: t.modelId, dims: t.dims, shipped: t.shipped, verified: t.verified, mb: t.fileMB, measured: t.fileMBMeasured, spare: t.minSpareGB })),
        frozenEntries: MODEL_TIERS.every((t) => Object.isFrozen(t)), workerGB: MODEL_TIERS.map((t) => t.workerGB),
        macbook: pick({ spareGB: 5.4, installed: [small] }), macbookBase: pick({ spareGB: 5.4, installed: [small, base] }),
        winTight: pick({ spareGB: 7, installed: [small] }), winBase: pick({ spareGB: 7, installed: [small, base] }), winBig: pick({ spareGB: 7, installed: [small, base, large] }),
        miniBusy: pick({ spareGB: 5, installed: [small, base, large] }), miniEasy: pick({ spareGB: 10, installed: [small, base, large] }), miniStrongest: pick({ spareGB: 10, installed: [small, base, large], strongest: true }),
        unknown: pick({}), unknown2: pick({ spareGB: NaN, installed: [small, base, large] }), defaults: pickTier({ spareGB: 20 }).tier.tier,
        noSmall: pick({ spareGB: 12, installed: [base] }),
      };
    });
    ok(sameJSON(r.tiers.map((t) => [t.tier, t.dims]), [['small', 384], ['base', 768], ['large', 1024]]) && r.frozenEntries, 'three tiers of one family: small (384 values), base (768), large (1024); the list cannot be changed', r.tiers);
    ok(r.workerGB.every((w, i, a) => w > 0 && (i === 0 || w > a[i - 1])) && r.workerGB[0] === 0.4, 'each tier says what one more worker costs in memory (0.4 GB for the small one, measured; more for the others)', r.workerGB);
    ok(r.tiers[0].shipped && r.tiers[0].verified && r.tiers[0].measured && r.tiers[0].mb === 34 && !r.tiers[1].shipped && !r.tiers[1].verified && !r.tiers[2].shipped && !r.tiers[2].verified, 'only the small model is shipped and verified here; the stronger ones say they are neither, and their sizes say they are not measured', r.tiers.map((t) => [t.tier, t.shipped, t.verified, t.measured]));
    const T = (s) => s.split(' | ')[0];
    ok(T(r.macbook) === 'small' && T(r.macbookBase) === 'small' && /only 5.4 GB spare/.test(r.macbookBase), 'the MacBook Pro (about 5.4 GB to spare) keeps the small model even when a stronger one is installed', { macbook: r.macbook, macbookBase: r.macbookBase });
    ok(T(r.winTight) === 'small' && /not installed|no stronger/.test(r.winTight) && T(r.winBase) === 'base' && T(r.winBig) === 'base', 'a 16 GB Windows laptop with about 7 GB spare: base when it is installed, small when it is not; large only when asked', { winTight: r.winTight, winBase: r.winBase, winBig: r.winBig });
    ok(T(r.miniBusy) === 'small' && T(r.miniEasy) === 'base' && T(r.miniStrongest) === 'large', 'the 16 GB Mac mini: small while a big chat model leaves 5 GB, base with 10 GB, large with 10 GB when strongest is asked for', { busy: r.miniBusy, easy: r.miniEasy, strongest: r.miniStrongest });
    ok(T(r.unknown) === 'small' && T(r.unknown2) === 'small' && r.defaults === 'small' && T(r.noSmall) === 'base', 'unknown memory gives the small model; a stronger one is chosen only if installed and fitting (the default install list is the small model alone)', { unknown: r.unknown, unknown2: r.unknown2, defaults: r.defaults, noSmall: r.noSmall });
  });

  // ------------------------------------------------------------------------------------------------------------ speed
  await section('speed', async () => {
    const r = await ev(async () => {
      const e = window.T.emb; const out = {};
      const sentence = 'The monks of Cluny copied manuscripts in the scriptorium and kept the accounts of the great house. ';
      const texts = Array.from({ length: 16 }, (_, i) => sentence.repeat(18) + ' no. ' + i);
      window.T.speedTexts = texts;
      out.tokens = (await e.count({ texts: texts.slice(0, 1) }))[0];
      const t0 = performance.now(); const v = await e.embed({ texts, kind: 'passage' }); out.ms = Math.round(performance.now() - t0);
      out.n = v.length; out.hc = navigator.hardwareConcurrency; window.T.speedVec = v;
      return out;
    });
    speed1 = r.ms;
    ok(r.n === 16 && r.tokens > 300 && r.tokens < 450, '16 passages of about ' + r.tokens + ' tokens (the size the chunker aims for) embed without trouble', { tokens: r.tokens });
    console.log('INFO  speed: 16 chunks of ' + r.tokens + ' tokens in ' + r.ms + ' ms (' + (r.ms / 16).toFixed(0) + ' ms a chunk, ' + (16000 / r.ms).toFixed(1) + ' chunks a second) with one thread, in headless Chromium on a shared ' + r.hc + '-processor build machine (load average ' + require('os').loadavg()[0].toFixed(1) + '): a guide, not a measurement of the owner\'s computers');
  });

  // ------------------------------------------------------------------------------------------------------------ worker pool
  await section('worker pool', async () => {
    const sug = await ev(() => {
      const { suggestWorkers, MODEL_TIERS } = RagHarness.embedder; const [small, base] = MODEL_TIERS;
      return {
        macbook: suggestWorkers({ cores: 8, spareGB: 5.4, tier: small }), laptop8: suggestWorkers({ cores: 8, spareGB: 7, tier: small }), laptop4: suggestWorkers({ cores: 4, spareGB: 7, tier: small }),
        mini: suggestWorkers({ cores: 10, spareGB: 10, tier: small }), miniBase: suggestWorkers({ cores: 10, spareGB: 10, tier: base }),
        tight: suggestWorkers({ cores: 8, spareGB: 1, tier: small }), unknown: suggestWorkers({}), huge: suggestWorkers({ cores: 64, spareGB: 100 }),
      };
    });
    ok(sug.macbook === 2 && sug.laptop8 === 3 && sug.laptop4 === 2 && sug.mini === 4 && sug.miniBase === 2, 'suggestWorkers: half the cores, at most a fifth of the spare memory, at most 4 (MacBook Pro 5.4 GB: 2; a laptop with 8 cores and 7 GB: 3, with 4 cores: 2; the Mac mini with 10 GB: 4 small or 2 base workers; the cores of these computers are assumed)', sug);
    ok(sug.tight === 1 && sug.unknown === 1 && sug.huge === 4, 'and never fewer than 1 (little memory, nothing known) nor more than 4', sug);

    const n0 = seen();
    const r = await ev(async () => {
      const out = {};
      const one = window.T.emb;
      const e = RagHarness.makeEmbedder({ workers: 2 }); window.T.pool = e;
      out.workersProp = e.workers;
      out.init = await e.init();
      const texts = Array.from({ length: 40 }, (_, i) => 'Passage number ' + i + ' about ' + ['abbeys', 'tithes', 'charters', 'saints', 'rents'][i % 5] + (i % 3 === 0 ? ' with a good deal more to say about it than the others have' : '') + '.');
      const [pooled, plain] = [await e.embed({ texts, kind: 'passage' }), await one.embed({ texts, kind: 'passage' })];
      out.same = pooled.map((v, i) => window.T.cos(v, plain[i]));
      out.shape = [pooled.length, pooled.every((v) => v instanceof Float32Array && v.length === 384 && v.buffer.byteLength === 1536)];
      out.margin = [3, 17, 38].map((i) => window.T.cos(pooled[i], plain[i]) - Math.max(window.T.cos(pooled[i], plain[i - 1]), window.T.cos(pooled[i], plain[i + 1] || plain[0])));
      const info = await e.info();
      out.info = { workers: info.workers, calls: info.calls, embedded: info.embedded, batches: info.batches, perWorker: info.perWorker, dims: info.dims, loads: info.loads };
      out.small = (await e.embed({ texts: texts.slice(0, 5), kind: 'query' })).length;
      out.empty = (await e.embed({ texts: [] })).length;
      out.count = await e.count({ texts: ['Hello world.'] });
      const bad = await e.embed({ texts: texts.slice(0, 20), kind: 'nonsense' }).then(() => null, (x) => x.code);
      const after = await e.info();
      out.bad = bad; out.afterBad = [after.calls, after.embedded];
      // the speed of the same 16 chunks as in the part above
      const t0 = performance.now(); const v = await e.embed({ texts: window.T.speedTexts, kind: 'passage' }); out.ms = Math.round(performance.now() - t0);
      out.sameSpeedVecs = v.map((x, i) => window.T.cos(x, window.T.speedVec[i]));
      out.errors = e.errors.length;
      return out;
    });
    const onnx = since(n0).filter((q) => q.method === 'GET' && /model_quantized\.onnx$/.test(q.url)).length;
    ok(r.workersProp === 2 && r.init.workers === 2 && r.init.dims === 384 && r.init.loads === 1 && onnx === 2, 'createEmbedder({workers: 2}): init loads the model in both workers (the ONNX file was read twice, once each)', { init: r.init, onnxReads: onnx });
    ok(r.shape[0] === 40 && r.shape[1] && r.same.every((c) => c > 0.98) && r.margin.every((m) => m > 0.0), 'embed() through two workers gives 40 vectors in the order of the texts, each close to the vector one worker gives (cosine ' + Math.min(...r.same).toFixed(4) + ' or more)', { min: Math.min(...r.same), margin: r.margin });
    ok(r.info.calls >= 1 && r.info.embedded === 40 && r.info.batches === 3 && r.info.perWorker.length === 2 && r.info.perWorker.every((w) => w.embedded > 0 && w.loads === 1) && r.info.perWorker.reduce((n, w) => n + w.batches, 0) === 3, 'both workers took part (3 batches shared out), and info() adds them up: 40 embedded, 3 batches, 1 call', r.info);
    ok(r.small === 5 && r.empty === 0 && sameJSON(r.count, [5]) && r.bad === 'BAD_ARGS' && sameJSON(r.afterBad, [2, 45]), 'a call of one batch or less, an empty call, count(), and a bad request all work through the pool; the bad one changes no counter (2 calls and 45 texts so far)', { small: r.small, empty: r.empty, count: r.count, bad: r.bad, afterBad: r.afterBad });
    ok(r.sameSpeedVecs.every((c) => c > 0.98) && r.errors === 0, '16 long chunks come back the same as from one worker', { min: Math.min(...r.sameSpeedVecs) });
    console.log('INFO  two workers: the same 16 chunks of about 400 tokens in ' + r.ms + ' ms, one worker took ' + speed1 + ' ms (' + (speed1 / r.ms).toFixed(2) + ' times as fast; the machine is shared and loaded, load average ' + require('os').loadavg()[0].toFixed(1) + ')');
    await ev(() => { window.T.pool.terminate(); });
  });

  // ------------------------------------------------------------------------------------------------------------ the end
  const sc = await ev(() => ({ errors: window.RagHarness.errors, workerErrors: window.RagHarness.workerErrors() }));
  ok(ran.length === SECTIONS.length && SECTIONS.every((s) => ran.includes(s)), 'every part of this test ran to its end (' + ran.length + ' of ' + SECTIONS.length + ')', { missing: SECTIONS.filter((s) => !ran.includes(s)) });
  ok(pageErrors.length === 0 && sc.errors.length === 0 && sc.workerErrors.length === 0, 'no script errors on the page or in the workers', { pageErrors, errors: sc.errors, workerErrors: sc.workerErrors });
  const expected404 = consoleErrors.filter((c) => /status of 404/.test(c.text) && /bge-base-en-v1\.5|\/onnx\/model(_fp16)?\.onnx$/.test(c.url));
  const unexpected = consoleErrors.filter((c) => !expected404.includes(c));
  ok(unexpected.length === 0, 'no console errors (but the ' + expected404.length + ' 404 answers the browser logs for the files of the models that are not installed, asked for on purpose)', unexpected);
  const outside = requests.filter((q) => !q.url.startsWith(ORIGIN + '/') && !/^(data|blob):/.test(q.url));
  ok(outside.length === 0 && external.length === 0, 'at the end: ' + requests.length + ' requests in all, none outside this machine', { outside, external });
  fs.writeFileSync(OUT + '/t_rag1_embed.requests.txt', requests.map((q) => q.method + ' ' + q.url).join('\n'));
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close();
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log('FAIL the test itself: ' + (e && e.stack || e)); process.exit(1); });
