// INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
// NO LICENCE IS GRANTED. See LICENCE.txt.
//
// Ingenium's ears (modules/r254.js): the speech engine and models Scriba uses, fetched once on GitHub's machines
// (.github/workflows/speech-vendor.yml), tried on a few recordings, listed with their sizes and SHA-256 fingerprints,
// and kept on the release "speech-vendor" (speech-vendor.zip), from which the computer apps and the tests take them.
//
//   node fetch_speech.mjs OUT_DIR [clip.en.wav ...] [clip.fr.wav ...]
//
// It runs from a folder where npm installed @huggingface/transformers 3.8.1 (the version Scriba uses). Each model is
// fetched by transformers.js itself, the way the page asks for it (dtype q8), into OUT_DIR/models/<model>/<file>, the
// layout the page reads with env.localModelPath. The engine's three browser files are copied to OUT_DIR/runtime/.
// A clip is 16 kHz mono 16-bit WAV; its name says its language (.en.wav, .fr.wav, .ht.wav); each is transcribed by the
// model the page would choose for that language, and the text is printed, so the run's log shows the models at work.
import { pipeline, env } from '@huggingface/transformers';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const OUT = path.resolve(process.argv[2] || 'speech-vendor');
const CLIPS = process.argv.slice(3);
const VERSION = '3.8.1';
const DIST = path.resolve('node_modules', '@huggingface', 'transformers', 'dist');
// the same lists as the page (modules/r254.js): English with Moonshine base, every other language with Whisper base
const MODELS = [
  { id: 'onnx-community/moonshine-base-ONNX', langs: ['en'] },
  { id: 'onnx-community/whisper-base', langs: ['fr', 'ht', 'es'] },
];
const RUNTIME = ['transformers.min.js', 'ort-wasm-simd-threaded.jsep.mjs', 'ort-wasm-simd-threaded.jsep.wasm'];

env.cacheDir = path.join(OUT, 'models');
env.allowLocalModels = false;
env.allowRemoteModels = true;

function readWav16(p) {
  const b = fs.readFileSync(p);
  if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WAVE') throw new Error(p + ': not a WAV file');
  let o = 12, fmt = null, data = null;
  while (o + 8 <= b.length) {
    const id = b.toString('ascii', o, o + 4), n = b.readUInt32LE(o + 4);
    if (id === 'fmt ') fmt = { ch: b.readUInt16LE(o + 10), rate: b.readUInt32LE(o + 12), bits: b.readUInt16LE(o + 22) };
    if (id === 'data') data = b.subarray(o + 8, o + 8 + n);
    o += 8 + n + (n & 1);
  }
  if (!fmt || !data || fmt.bits !== 16 || fmt.rate !== 16000 || fmt.ch !== 1) throw new Error(p + ': not 16 kHz mono 16-bit');
  const f = new Float32Array(data.length >> 1);
  for (let i = 0; i < f.length; i++) f[i] = data.readInt16LE(i * 2) / 32768;
  return f;
}
function langOf(p) { const m = /\.([a-z]{2})\.wav$/i.exec(path.basename(p)); return m ? m[1].toLowerCase() : 'en'; }

const log = [];
function say(s) { log.push(s); console.log(s); }
for (const m of MODELS) {
  const t0 = Date.now();
  const asr = await pipeline('automatic-speech-recognition', m.id, { dtype: 'q8' });
  say(`${m.id}: fetched and loaded in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
  for (const clip of CLIPS) {
    const lang = langOf(clip);
    if (!m.langs.includes(lang)) continue;
    const audio = readWav16(clip), sec = audio.length / 16000, cap = Math.min(440, Math.ceil(sec * 6.5) + 12);
    const opts = /moonshine/.test(m.id) ? { max_new_tokens: cap }
      : { max_new_tokens: cap, chunk_length_s: 30, stride_length_s: 5, language: lang, task: 'transcribe' };
    const t1 = Date.now(), r = await asr(audio, opts);
    say(`  ${path.basename(clip)} (${sec.toFixed(1)} s, ${((Date.now() - t1) / 1000).toFixed(1)} s to write): ${String(r && r.text || '').trim()}`);
  }
  await asr.dispose();
}

fs.mkdirSync(path.join(OUT, 'runtime'), { recursive: true });
for (const f of RUNTIME) fs.copyFileSync(path.join(DIST, f), path.join(OUT, 'runtime', f));

// every file, with its size and fingerprint: SPEECH.txt for people, speech.json for the page
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(d => d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]); }
const files = walk(OUT).filter(f => !/(^|\/)(SPEECH\.txt|speech\.json)$/.test(f)).sort();
const rows = files.map(f => { const b = fs.readFileSync(f); return { path: path.relative(OUT, f).split(path.sep).join('/'), size: b.length, sha256: crypto.createHash('sha256').update(b).digest('hex') }; });
const models = {};
for (const m of MODELS) models[m.id] = { langs: m.langs, files: rows.filter(r => r.path.startsWith('models/' + m.id + '/')).map(r => r.path.slice(('models/' + m.id + '/').length)), bytes: rows.filter(r => r.path.startsWith('models/' + m.id + '/')).reduce((a, r) => a + r.size, 0) };
const runtimeBytes = rows.filter(r => r.path.startsWith('runtime/')).reduce((a, r) => a + r.size, 0);
fs.writeFileSync(path.join(OUT, 'speech.json'), JSON.stringify({ v: 1, made: new Date().toISOString().slice(0, 10), transformers: VERSION, runtime: { files: RUNTIME, bytes: runtimeBytes }, models, files: rows }, null, 1) + '\n');
const mb = n => (n / 1048576).toFixed(1) + ' MB';
const txt = ['Ingenium\'s ears: the speech engine and models (modules/r254.js), fetched by source/speech/fetch_speech.mjs', '',
  `transformers.js ${VERSION} (Apache-2.0), with ONNX Runtime Web (MIT): ${mb(runtimeBytes)}`,
  ...MODELS.map(m => `${m.id} (${m.langs.join(', ')}): ${mb(models[m.id].bytes)}`), '',
  ...rows.map(r => `${r.sha256}  ${String(r.size).padStart(10)}  ${r.path}`), '', 'The run:', ...log];
fs.writeFileSync(path.join(OUT, 'SPEECH.txt'), txt.join('\n') + '\n');
say(`runtime ${mb(runtimeBytes)}; ` + MODELS.map(m => `${m.id} ${mb(models[m.id].bytes)}`).join('; '));
