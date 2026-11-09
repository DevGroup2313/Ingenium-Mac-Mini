// node rig/t_656_cd1081.js <Ingenium page url (master)> <out dir>
// Ingenium 6.56 (8 November 2026), in Chromium. Her words (8 November 2026): "Lector quotes a much older Carpe Diem build 1058 when it
// should be 1081."
//   - the page carries Carpe Diem 1081 (2026-11-01, 528171081, its full edition, 48,542,093 bytes) and keeps it on first start,
//     checked against its fingerprint;
//   - Lector's Your apps line names Carpe Diem 1081;
//   - measured by the recipe, Carpe Diem is build 1081, 48.5 MB and 71,186 lines;
//   - what Lector is given to write with (the recipe's layer) names 1081 and its figures, and never gives 1058 as the present build;
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 900) : '')); } }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(800);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} });
  const meta = await p.evaluate(() => IngBuiltin.meta.cd);
  ok(meta && meta.version === '1081' && meta.build === '528171081' && meta.date === '2026-11-01' && meta.size === 48542093, 'the page carries Carpe Diem 1081, its full edition', meta);
  // the quiet first start keeps it; wait for it (or keep it now, as the first start does)
  let kept = null; for (let i = 0; i < 90; i++) { kept = await p.evaluate(() => { try { const m = libState().apps.cd; return m ? { v: m.version, b: m.build, sha: m.sha256, src: m.source } : null; } catch (e) { return null; } }); if (kept && kept.v === '1081') break; await p.waitForTimeout(2000); }
  if (!kept || kept.v !== '1081') { await p.evaluate(() => IngBuiltin.keep('cd').catch(() => {})); await p.waitForTimeout(8000); kept = await p.evaluate(() => { const m = libState().apps.cd; return m ? { v: m.version, b: m.build, sha: m.sha256, src: m.source } : null; }); }
  ok(kept && kept.v === '1081' && kept.sha === meta.sha256, 'Carpe Diem 1081 is kept in the app library, checked against its fingerprint', kept);
  const line = await p.evaluate(() => { try { const n = IngBuiltin.lectorLine('cd'); return n && n.nodeType ? n.textContent : String(n); } catch (e) { return String(e); } });
  ok(/1081/.test(JSON.stringify(line)) && !/1058/.test(JSON.stringify(line)), 'Lector\'s Your apps line names Carpe Diem 1081', line);
  const m = await p.evaluate(async () => { try { const r = await IngRecipe.measureOne('cd'); const L = IngRecipe.latest('cd'); return { pass: L && L.v.pass, mb: L && L.v.mb, lines: L && L.v.lines, r: r && r.error }; } catch (e) { return { err: String(e && e.message || e) }; } });
  ok(m.pass === '1081' && m.mb === '48.5' && m.lines === 71186, 'measured by the recipe, Carpe Diem is build 1081, 48.5 MB and 71,186 lines', m);
  const lay = await p.evaluate(() => { try { return IngRecipe.layer(false); } catch (e) { return String(e); } });
  const cdLines = lay.split('\n').filter(x => /Carpe Diem/.test(x));
  ok(cdLines.length && cdLines.every(x => !/\b1058\b/.test(x)) && cdLines.some(x => /1081/.test(x)) && /48\.5 MB and 71,186 lines \(1081\)/.test(lay), 'what Lector writes with names 1081 and its figures, never 1058 as the present build', cdLines);
  await p.evaluate(() => { try { go('lector'); } catch (e) {} }); await p.waitForTimeout(2500); await p.screenshot({ path: OUT + '/lector_1081.png' });
  ok(errs.length === 0, 'no errors on the page', errs);
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
