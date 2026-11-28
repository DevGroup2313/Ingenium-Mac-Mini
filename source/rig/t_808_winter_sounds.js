// node rig/t_808_winter_sounds.js <page url>
// Ingenium 8.08 (modules/r411.js): Snowy pines and Winter cabin join Winter, beside Noel. Her words (28 November 2026): "I want more winter
// sounds added to the nature sounds of Ingenium, I want to hear some snow sounds as well"; on the samples: "For the Winter Sounds, I like
// Snowy pines and Winter cabin, I hate the Fresh snow one."
//   1. the two are among the places, in the Winter group after Noel, in the Display panel's picker; the samples she did not keep are not
//   2. each is made on this device (nothing fetched), loops for its whole length, is neither silent nor clipped
//   3. no page error
const pw = require('/opt/node-tools/node_modules/playwright');
const URL_ = process.argv[2]; let P = 0, F = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? P++ : F++; };
(async () => {
  const b = await pw.chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] }); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  const errs = [], gets = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200))); p.on('request', (r) => { if (/^https?:/.test(r.url()) && !r.url().startsWith(URL_.replace(/[^/]*$/, ''))) gets.push(r.url().slice(0, 80)); });
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 500 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.waitForFunction(() => window.IngNature && IngNature.places().includes('pines') && IngNature.places().includes('cabin'), null, { timeout: 60000 }).catch(() => {});
  const pl = await p.evaluate(() => IngNature.places());
  ok(pl.includes('pines') && pl.includes('cabin') && pl.includes('noel'), 'Snowy pines and Winter cabin are among the places, beside Noel', pl);
  ok(!['snowsteps', 'lake', 'tent', 'nightwoods'].some((k) => pl.includes(k)), 'the samples she did not keep, or has not yet heard again, are not', pl);
  await p.evaluate(() => IngNature.open()); await p.waitForTimeout(1200);
  const grp = await p.evaluate(() => { const blk = document.querySelector('#dpSound [data-nat="dp"]') || document.querySelector('[data-nat]'); if (!blk) return null;
    return [...blk.querySelectorAll('.nat-grp')].map((g) => ({ label: (g.querySelector('.nat-gl') || {}).textContent || '', keys: [...g.querySelectorAll('.nat-pl')].map((x) => x.getAttribute('data-nat-k')), names: [...g.querySelectorAll('.nat-pl')].map((x) => x.title.split(':')[0]) })); });
  const win = grp && grp.find((g) => g.label === 'Winter');
  ok(win && win.keys.join('|') === 'noel|pines|cabin' && win.names.join('|') === 'Noel|Snowy pines|Winter cabin', 'in the picker: Winter holds Noel, Snowy pines and Winter cabin, in that order', grp);
  for (const [k, len] of [['pines', 48.5], ['cabin', 38.8]]) {
    const r = await p.evaluate((k) => new Promise((res) => { const t0 = performance.now(); IngNature._render(k, (buf) => { if (!buf) { res(null); return; } const L = buf.getChannelData(0), R = buf.getChannelData(1); let pk = 0, ms = 0;
      for (let i = 0; i < L.length; i++) { pk = Math.max(pk, Math.abs(L[i]), Math.abs(R[i])); ms += L[i] * L[i] + R[i] * R[i]; }
      const head = Math.abs(L[0] - L[L.length - 1]) + Math.abs(R[0] - R[R.length - 1]);
      res({ sec: +(buf.duration).toFixed(1), peak: +pk.toFixed(3), rms: +Math.sqrt(ms / (2 * L.length)).toFixed(4), seam: +head.toFixed(4), ms: Math.round(performance.now() - t0) }); }); }), k);
    ok(r && Math.abs(r.sec - len) < 0.6 && r.peak < 0.93 && r.rms > 0.002 && r.seam < 0.05, (k === 'pines' ? 'Snowy pines' : 'Winter cabin') + ' is made here, loops for its whole length, neither silent nor clipped', r);
  }
  ok(gets.length === 0, 'nothing is fetched to make them', gets);
  ok(errs.length === 0, 'no page error', errs);
  console.log(P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})();
