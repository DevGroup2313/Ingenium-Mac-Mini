// node rig/t_709_cd1091.js <Ingenium page url (master)> <out dir>
// Ingenium 7.09 (15 November 2026), in Chromium. Her words (14 November 2026): "The needle or thread, should be the visuals on the
// Thread tab inside of the library, its the golden thread with the needle points on the left side of the page next to the books'
// spines." Carpe Diem 1091 shows them again (DevGroup2313/Carpe-Diem-Gift, branch claude/carpe-diem-security-build-fixes-cdaoxj,
// Mac project/carpe_diem.html; its own test, source/carpe_diem_1091/tests/t_needle.js, finds the knots grown and moving there).
// (6.81's check, t_681_cd1089.js, was written for 1089.)
//   - the page carries Carpe Diem 1091 (2026-11-14, 528171091, its full edition, 49,370,671 bytes) and keeps it on first start,
//     checked against its fingerprint, which is the fingerprint of the page in Carpe-Diem-Gift;
//   - Lector's Your apps line names Carpe Diem 1091;
//   - measured by the recipe, Carpe Diem is build 1091, 49.4 MB and 73,140 lines;
//   - what Lector is given to write with names 1091 and its figures, and never gives 1089, 1084, 1081 or 1058 as the present build;
//   - the Offline Project's Public sample is Carpe Diem 1091's (DevGroup2313/Carpe-DIem-Demo), and it comes back whole from the
//     full edition and its recipe;
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
// SHA-256 of Mac project/carpe_diem.html at Carpe-Diem-Gift 29ad064 (the full edition) and of index.html at Carpe-DIem-Demo e77bbea
// (the public sample), both build 1091, measured on 15 November 2026
const SHA_1091 = '943d91f1e43ec197f89f958088d6d62738b00c9818ddb5ee7b2173c4838e9611';
const SHA_SAMPLE_1091 = '04221fde1909a9ced8d8af184b7559a6cd7747f1cfa8350bd7bc6d271c230fbb';
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 900) : '')); } }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(800);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} });
  const meta = await p.evaluate(() => IngBuiltin.meta.cd);
  ok(meta && meta.version === '1091' && meta.build === '528171091' && meta.date === '2026-11-14' && meta.size === 49370671 && meta.sha256 === SHA_1091,
    'the page carries Carpe Diem 1091, its full edition, the very page of Carpe-Diem-Gift', meta);
  // the quiet first start keeps it; wait for it (or keep it now, as the first start does)
  let kept = null; for (let i = 0; i < 90; i++) { kept = await p.evaluate(() => { try { const m = libState().apps.cd; return m ? { v: m.version, b: m.build, sha: m.sha256, src: m.source } : null; } catch (e) { return null; } }); if (kept && kept.v === '1091') break; await p.waitForTimeout(2000); }
  if (!kept || kept.v !== '1091') { await p.evaluate(() => IngBuiltin.keep('cd').catch(() => {})); await p.waitForTimeout(8000); kept = await p.evaluate(() => { const m = libState().apps.cd; return m ? { v: m.version, b: m.build, sha: m.sha256, src: m.source } : null; }); }
  ok(kept && kept.v === '1091' && kept.sha === meta.sha256, 'Carpe Diem 1091 is kept in the app library, checked against its fingerprint', kept);
  const line = await p.evaluate(() => { try { const n = IngBuiltin.lectorLine('cd'); return n && n.nodeType ? n.textContent : String(n); } catch (e) { return String(e); } });
  ok(/1091/.test(JSON.stringify(line)) && !/1089|1084|1081|1058/.test(JSON.stringify(line)), 'Lector\'s Your apps line names Carpe Diem 1091', line);
  const m = await p.evaluate(async () => { try { const r = await IngRecipe.measureOne('cd'); const L = IngRecipe.latest('cd'); return { pass: L && L.v.pass, mb: L && L.v.mb, lines: L && L.v.lines, r: r && r.error }; } catch (e) { return { err: String(e && e.message || e) }; } });
  ok(m.pass === '1091' && m.mb === '49.4' && m.lines === 73140, 'measured by the recipe, Carpe Diem is build 1091, 49.4 MB and 73,140 lines', m);
  const lay = await p.evaluate(() => { try { return IngRecipe.layer(false); } catch (e) { return String(e); } });
  const cdLines = lay.split('\n').filter(x => /Carpe Diem/.test(x));
  ok(cdLines.length && cdLines.every(x => !/\b(1058|1081|1084|1089)\b/.test(x)) && cdLines.some(x => /1091/.test(x)) && /49\.4 MB and 73,140 lines \(1091\)/.test(lay), 'what Lector writes with names 1091 and its figures, never 1089, 1084, 1081 or 1058 as the present build', cdLines);
  const demo = await p.evaluate(async () => { try { const M = IngDemos.meta.cd; const r = await IngDemos.cd(); const h = [...new Uint8Array(await crypto.subtle.digest('SHA-256', r.u8))].map(x => x.toString(16).padStart(2, '0')).join('');
    const s = new TextDecoder().decode(r.u8.slice(0, 4000000)); const bm = /window\.CD_BUILD=\{[^}]*\}/.exec(s);
    return { version: M.version, build: M.build, edition: M.edition, size: r.u8.length, sha: h, whole: h === M.sha256 && r.u8.length === M.size, stamp: bm ? bm[0] : null }; } catch (e) { return { err: String(e && e.message || e) }; } });
  ok(demo.version === '1091' && demo.build === '528171091' && demo.whole === true && demo.sha === SHA_SAMPLE_1091, 'the Offline Project\'s Public sample is Carpe Diem 1091\'s, and comes back whole from the full edition and its recipe', demo);
  await p.evaluate(() => { try { go('lector'); } catch (e) {} }); await p.waitForTimeout(2500); await p.screenshot({ path: OUT + '/lector_1091.png' });
  ok(errs.length === 0, 'no errors on the page', errs);
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
