// node rig/t_682_selfcopy.js <Ingenium page url (master)> <out dir> [<the page file, for its size>]
// Ingenium 6.82 (11 November 2026), in Chromium: Carpe Diem carried without its own copy of itself (build/self_copy.py,
// modules/r275.js). At 6.81 the page had 0.85 MB left under the 100 MiB GitHub keeps in one file, and Carpe Diem's copy of itself
// took 18.9 MB of it. Checks:
//   - the page carries Carpe Diem's block with the note of its copy and the code that puts it back, about 24 MB where it was 43 MB,
//     and the page is well under 100 MiB;
//   - put back in a worker, Carpe Diem 1089 is whole (its size and fingerprint), and the page goes on answering meanwhile;
//   - where a worker cannot be made, it is put back in the page itself, whole;
//   - a note that does not match gives a plain refusal, never a page that passes for Carpe Diem;
//   - the app library keeps Carpe Diem 1089, checked against its fingerprint (modules/r120.js);
//   - Fabrica's Public sample of Carpe Diem, made from it, comes back whole (modules/r268.js);
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT, FILE] = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('PASS ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 900) : '')); } }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(800);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} });

  // 1. what the page carries
  const carried = await p.evaluate(async () => {
    const e = document.getElementById('ing-builtin-cd'); if (typeof ingFill === 'function') await ingFill('ing-builtin-cd');
    return { note: typeof ingBuiltinWhole === 'function' && ingBuiltinWhole.carriesCopy('ing-builtin-cd'), code: (document.getElementById('ing-self-copy-src') || {}).textContent ? document.getElementById('ing-self-copy-src').textContent.length : 0,
      chars: e ? e.textContent.trim().length : 0, part: window.__ingParts && window.__ingParts.p275, meta: IngBuiltin.meta.cd };
  });
  ok(carried.note && carried.code > 20000 && carried.part === 'running', 'the page carries Carpe Diem with the note of its copy, and the code that puts it back', carried);
  ok(carried.chars > 20e6 && carried.chars < 26e6, 'Carpe Diem\'s block is about 24 MB, not 43 MB (' + (carried.chars / 1e6).toFixed(1) + ' MB)', carried.chars);
  if (FILE) { const n = fs.statSync(FILE).size; ok(n < 104857600 - 10e6, 'the page is ' + (n / 1e6).toFixed(1) + ' MB, well under the 100 MiB GitHub keeps in one file (104.9 MB)', n); }
  const meta = carried.meta;

  // 2 and 3. put back in a worker, and in the page itself
  const back = async (noWorker) => p.evaluate(async ({ noWorker }) => {
    const e = document.getElementById('ing-builtin-cd'); const s = atob(e.textContent.trim()); const gz = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) gz[i] = s.charCodeAt(i);
    const cdx = new Uint8Array(await new Response(new Blob([gz]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());
    const keepW = window.Worker; if (noWorker) window.Worker = function () { throw new Error('no worker here (the test)'); };
    let ticks = 0, last = performance.now(), gap = 0; const iv = setInterval(() => { const t = performance.now(); gap = Math.max(gap, t - last); last = t; ticks++; }, 16);
    const t0 = performance.now(); let out, err = null;
    try { out = await ingBuiltinWhole('ing-builtin-cd', cdx); } catch (x) { err = String(x && x.message || x); }
    const ms = performance.now() - t0; clearInterval(iv); window.Worker = keepW;
    if (err) return { err };
    const h = [...new Uint8Array(await crypto.subtle.digest('SHA-256', out))].map(x => x.toString(16).padStart(2, '0')).join('');
    return { size: out.length, sha: h, ms: Math.round(ms), gap: Math.round(gap), ticks, stats: ingBuiltinWhole.stats(), cdx: cdx.length };
  }, { noWorker });
  const w = await back(false);
  ok(w.size === meta.size && w.sha === meta.sha256 && w.stats.worker === 1, 'put back in a worker, Carpe Diem ' + meta.version + ' is whole: its size and fingerprint (' + w.ms + ' ms)', w);
  ok(w.gap < 500 && w.ticks > w.ms / 40, 'the page goes on answering while the worker works (its longest pause ' + w.gap + ' ms)', w);
  const pg = await back(true);
  ok(pg.size === meta.size && pg.sha === meta.sha256 && pg.stats.page === 1, 'where a worker cannot be made, it is put back in the page itself, whole (' + pg.ms + ' ms)', pg);

  // 4. a note that does not match
  const bad = await p.evaluate(async () => {
    const e = document.getElementById('ing-builtin-cd'), a = e.getAttribute('data-self');
    const m = JSON.parse(atob(a)); m.ops = m.ops.filter(o => typeof o !== 'string');
    e.setAttribute('data-self', btoa(JSON.stringify(m)));
    let r; try { const s = atob(e.textContent.trim()); const gz = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) gz[i] = s.charCodeAt(i);
      const cdx = new Uint8Array(await new Response(new Blob([gz]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());
      const out = await ingBuiltinWhole('ing-builtin-cd', cdx); r = { gave: out.length }; } catch (x) { r = { err: String(x && x.message || x) }; }
    e.setAttribute('data-self', a); return r;
  });
  ok(bad.err && /did not come back whole/.test(bad.err), 'a note that does not match is refused in plain words', bad);

  // 5. the app library keeps it, checked against its fingerprint
  let kept = null; for (let i = 0; i < 90; i++) { kept = await p.evaluate(() => { try { const m = libState().apps.cd; return m ? { v: m.version, sha: m.sha256, src: m.source } : null; } catch (e) { return null; } }); if (kept && kept.v === meta.version) break; await p.waitForTimeout(2000); }
  if (!kept || kept.v !== meta.version) { await p.evaluate(() => IngBuiltin.keep('cd').catch(() => {})); await p.waitForTimeout(10000); kept = await p.evaluate(() => { const m = libState().apps.cd; return m ? { v: m.version, sha: m.sha256, src: m.source } : null; }); }
  ok(kept && kept.v === meta.version && kept.sha === meta.sha256, 'the app library keeps Carpe Diem ' + meta.version + ', checked against its fingerprint', kept);

  // 6. Fabrica's Public sample, made from it
  const demo = await p.evaluate(async () => { try { const r = await IngDemos.cd(); const h = [...new Uint8Array(await crypto.subtle.digest('SHA-256', r.u8))].map(x => x.toString(16).padStart(2, '0')).join('');
    return { what: r.what, size: r.u8.length, ok: h === IngDemos.meta.cd.sha256 && r.u8.length === IngDemos.meta.cd.size }; } catch (e) { return { err: String(e && e.message || e) }; } });
  ok(demo.ok === true, 'Fabrica\'s Public sample of Carpe Diem, made from it, comes back whole', demo);

  ok(errs.length === 0, 'no errors on the page', errs);
  fs.writeFileSync(OUT + '/t_682_selfcopy.json', JSON.stringify({ carried: { chars: carried.chars, code: carried.code }, worker: w, page: pg, bad, kept, demo }, null, 1));
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
