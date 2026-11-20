// Ingenium 7.54 · her rule "Purple words that can be pressed are underlined" added to her ways of working (modules/r327.js), at her words
// (20 November 2026): "I want you to add the purple pressable words underlined to my rules in my way of working in the Ingenia page."
//   1. a list seeded before 7.54 (her nine rules) takes the new rule once, at its end, in her master copy and her own profile
//   2. opened again, it is not added twice; removed by her, it is not added back
//   3. it shows on the Ingenia page, in her ways of working
//   4. a fresh master copy is seeded with it; another person's profile on her master copy takes nothing of hers
//     node rig/t_754_ways_rule.js <master page url>
const pw = require('/opt/node-tools/node_modules/playwright');
const URL_ = process.argv[2];
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? P++ : F++; }
const RULE = 'Purple words that can be pressed are underlined';
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1280, height: 860 } })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  const boot = async () => { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 500 }); await p.waitForTimeout(1500);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); };
  const ways = () => p.evaluate(() => { try { IngWays && IngWays.paint && IngWays.paint(); } catch (e) {} const w = window.state && state.ways; return w ? { list: w.list.map((r) => r.t), added: w.added || null, seeded: w.seeded } : null; });
  await p.goto(URL_, { timeout: 600000 }); await boot();
  // 4a. a fresh master copy
  let w = await ways();
  ok(w && w.seeded && w.list[w.list.length - 1] === RULE && w.list.filter((t) => t === RULE).length === 1, 'a fresh master copy is seeded with the rule, once, at the end of her list', w && w.list);
  // 1. a list seeded before 7.54
  await p.evaluate(() => { state.ways.list = state.ways.list.filter((r) => !/^Purple words/.test(r.t)); delete state.ways.added; saveState(); });
  await p.reload(); await boot(); w = await ways();
  ok(w && w.list.length === 10 && w.list[9] === RULE && w.added && w.added.u753, 'a list seeded before takes the rule once, at its end', w);
  await p.reload(); await boot(); w = await ways();
  ok(w && w.list.filter((t) => t === RULE).length === 1, 'opened again, it is not added twice', w && w.list);
  // 2. removed by her
  await p.evaluate(() => { state.ways.list = state.ways.list.filter((r) => !/^Purple words/.test(r.t)); saveState(); });
  await p.reload(); await boot(); w = await ways();
  ok(w && w.list.indexOf(RULE) < 0, 'removed by her, it is not added back', w && w.list);
  await p.evaluate(() => { delete state.ways.added; saveState(); }); await p.reload(); await boot();
  // 3. on the Ingenia page
  const shown = await p.evaluate(async () => { go('folders'); await new Promise((r) => setTimeout(r, 1200)); const c = document.getElementById('waysIngenia'); if (!c) return 'no card';
    const f = c.querySelector('.wy-fold'); if (f && f.getAttribute('aria-expanded') !== 'true') f.click(); await new Promise((r) => setTimeout(r, 700));
    return /Purple words that can be pressed are underlined/.test(c.textContent) ? true : c.textContent.replace(/\s+/g, ' ').slice(0, 400); });
  ok(shown === true, 'it shows on the Ingenia page, in her ways of working (the card opened, as she opens it)', shown);
  // 4b. another person's profile on her master copy
  await p.evaluate(() => { const x = window.__ingProfiles, g = x.reg() || { v: 1, cur: 'owner', list: [] }; if (!g.list.some((q) => q.id === 'ptide')) g.list.push({ id: 'ptide', name: 'Theo', t: 2, pw: 'none', kind: 'guest' }); g.cur = 'ptide'; x.save(g); });
  await p.reload(); await boot(); w = await ways();
  ok(await p.evaluate(() => window.__ingProfile && window.__ingProfile.id === 'ptide') && (!w || w.list.indexOf(RULE) < 0), "another person's profile on her master copy takes nothing of hers", w && w.list);
  ok(!errs.length, 'no error on the page', errs);
  console.log('\n' + P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})();
