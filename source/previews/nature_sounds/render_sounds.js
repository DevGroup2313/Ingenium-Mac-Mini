// More nature sounds (modules/r363.js), for her ears before anything is released: each new place made exactly as Ingenium makes it
// (modules/r295.js's kit, in a browser), its loop played twice so its seam can be heard, saved as an MP3 (ffmpeg); with each, a picture
// of its sound (a spectrogram) for checking, and its timings and levels.
//   node render_sounds.js <out folder> [kind ...]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const OUT = process.argv[2]; const ONLY = process.argv.slice(3); fs.mkdirSync(OUT, { recursive: true });
const MOD = path.join(__dirname, '..', '..', 'build', 'modules');
const page = '<!doctype html><html><head><meta charset="utf-8"></head><body>' + fs.readFileSync(path.join(MOD, 'r295.js'), 'utf8') + fs.readFileSync(path.join(MOD, 'r363.js'), 'utf8') + '</body></html>';
const HTML = path.join(OUT, '_render.html'); fs.writeFileSync(HTML, page);
(async () => {
  const b = await pw.chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] }); const p = await b.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message)); await p.goto('file://' + HTML);
  await p.waitForFunction(() => window.IngNature && IngNature.places().length > 9, null, { timeout: 30000 });
  const kinds = await p.evaluate(() => IngNature.places().filter((k) => k !== 'off'));
  const todo = ONLY.length ? ONLY : kinds;
  console.log('places:', kinds.join(', '));
  for (const k of todo) {
    const r = await p.evaluate((k) => new Promise((res) => { const t0 = performance.now(); IngNature._render(k, (buf) => {
      if (!buf) return res({ err: 'no buffer' }); const ms = performance.now() - t0, n = buf.length, sr = buf.sampleRate, L = buf.getChannelData(0), R = buf.getChannelData(1);
      let pk = 0, ss = 0; for (let i = 0; i < n; i++) { pk = Math.max(pk, Math.abs(L[i]), Math.abs(R[i])); ss += L[i] * L[i] + R[i] * R[i]; }
      // the seam: the jump from the loop's last sample to its first, against the loop's own sample-to-sample movement
      let dsum = 0; for (let i = 1; i < n; i++) dsum += Math.abs(L[i] - L[i - 1]); const seam = Math.abs(L[0] - L[n - 1]) / (dsum / (n - 1));
      const reps = 2, m = n * reps, pcm = new Int16Array(m * 2); for (let rr = 0; rr < reps; rr++) for (let i = 0; i < n; i++) { const o = (rr * n + i) * 2; pcm[o] = Math.max(-32767, Math.min(32767, Math.round(L[i] * 32767))); pcm[o + 1] = Math.max(-32767, Math.min(32767, Math.round(R[i] * 32767))); }
      const u8 = new Uint8Array(pcm.buffer); let s = ''; for (let i = 0; i < u8.length; i += 32768) s += String.fromCharCode.apply(null, u8.subarray(i, i + 32768));
      res({ ms: Math.round(ms), sec: +(n / sr).toFixed(1), sr, peak: +pk.toFixed(3), rms: +(10 * Math.log10(ss / (2 * n))).toFixed(1), seam: +seam.toFixed(2), pcm: btoa(s) }); }); }), k);
    if (r.err) { console.log(k, 'FAILED', r.err); continue; }
    const raw = path.join(OUT, '_' + k + '.pcm'); fs.writeFileSync(raw, Buffer.from(r.pcm, 'base64'));
    cp.execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 's16le', '-ar', String(r.sr), '-ac', '2', '-i', raw, '-codec:a', 'libmp3lame', '-b:a', '160k', path.join(OUT, k + '.mp3')]);
    cp.execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 's16le', '-ar', String(r.sr), '-ac', '2', '-i', raw, '-lavfi', 'showspectrumpic=s=1400x500:legend=1:scale=log:fscale=lin:stop=12000', path.join(OUT, '_' + k + '_spec.png')]);
    fs.unlinkSync(raw);
    console.log(k, JSON.stringify({ made_in_ms: r.ms, loop_s: r.sec, peak: r.peak, rms_db: r.rms, seam: r.seam }));
  }
  console.log('page errors:', errs.length, JSON.stringify(errs.slice(0, 3))); await b.close();
})();
