// node rig/t_681_cd1089.js <Ingenium page url (master)> <out dir>
// Ingenium 6.81 (11 November 2026), in Chromium. Her words (11 November 2026): "Carpe Diem has also been recently been updated, please update Ingenium and the documents witht the latest version." (6.72's check, t_672_cd1084.js, was written for 1084.)
// Source: DevGroup2313/Carpe-Diem-Gift, branch claude/beautiful-brahmagupta-1gpfih, Mac project/carpe_diem.html.
//   - the page carries Carpe Diem 1089 (2026-11-11, 528171089, its full edition, 49,367,704 bytes) and keeps it on first start,
//     checked against its fingerprint;
//   - Lector's Your apps line names Carpe Diem 1089;
//   - measured by the recipe, Carpe Diem is build 1089, 49.4 MB and 73,130 lines;
//   - what Lector is given to write with (the recipe's layer) names 1089 and its figures, and never gives 1084, 1081 or 1058 as the present build;
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
  ok(meta && meta.version === '1089' && meta.build === '528171089' && meta.date === '2026-11-11' && meta.size === 49367704, 'the page carries Carpe Diem 1089, its full edition', meta);
  // the quiet first start keeps it; wait for it (or keep it now, as the first start does)
  let kept = null; for (let i = 0; i < 90; i++) { kept = await p.evaluate(() => { try { const m = libState().apps.cd; return m ? { v: m.version, b: m.build, sha: m.sha256, src: m.source } : null; } catch (e) { return null; } }); if (kept && kept.v === '1089') break; await p.waitForTimeout(2000); }
  if (!kept || kept.v !== '1089') { await p.evaluate(() => IngBuiltin.keep('cd').catch(() => {})); await p.waitForTimeout(8000); kept = await p.evaluate(() => { const m = libState().apps.cd; return m ? { v: m.version, b: m.build, sha: m.sha256, src: m.source } : null; }); }
  ok(kept && kept.v === '1089' && kept.sha === meta.sha256, 'Carpe Diem 1089 is kept in the app library, checked against its fingerprint', kept);
  const line = await p.evaluate(() => { try { const n = IngBuiltin.lectorLine('cd'); return n && n.nodeType ? n.textContent : String(n); } catch (e) { return String(e); } });
  ok(/1089/.test(JSON.stringify(line)) && !/1084|1081|1058/.test(JSON.stringify(line)), 'Lector\'s Your apps line names Carpe Diem 1089', line);
  const m = await p.evaluate(async () => { try { const r = await IngRecipe.measureOne('cd'); const L = IngRecipe.latest('cd'); return { pass: L && L.v.pass, mb: L && L.v.mb, lines: L && L.v.lines, r: r && r.error }; } catch (e) { return { err: String(e && e.message || e) }; } });
  ok(m.pass === '1089' && m.mb === '49.4' && m.lines === 73130, 'measured by the recipe, Carpe Diem is build 1089, 49.4 MB and 73,130 lines', m);
  const lay = await p.evaluate(() => { try { return IngRecipe.layer(false); } catch (e) { return String(e); } });
  const cdLines = lay.split('\n').filter(x => /Carpe Diem/.test(x));
  ok(cdLines.length && cdLines.every(x => !/\b(1058|1081|1084)\b/.test(x)) && cdLines.some(x => /1089/.test(x)) && /49\.4 MB and 73,130 lines \(1089\)/.test(lay), 'what Lector writes with names 1089 and its figures, never 1084, 1081 or 1058 as the present build', cdLines);
  await p.evaluate(() => { try { go('lector'); } catch (e) {} }); await p.waitForTimeout(2500); await p.screenshot({ path: OUT + '/lector_1089.png' });
  ok(errs.length === 0, 'no errors on the page', errs);
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
