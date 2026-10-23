// The Forge 644 · a quicker start in the Mac app (blocks/forge_quick.html, patches_quick.json, forge_quick_split.py), in Chromium,
// the quick page and its parts served from one folder as the Mac app (pywebview) serves them. Checks:
//   - the page the app opens is the quick page: its four carried apps are files beside it;
//   - a first start of the build keeps all four apps in the library, each fetched from its file, checked (size and
//     fingerprint) as before; a second start needs none of them and fetches nothing;
//   - the time to a page that answers, quick against full (three loads each);
//   - no page errors.
//   node tests/t_644_quick.js <url of the quick page> <url of the full page> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [QUICK, FULL, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
const ready = p => p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 120000 });

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  try {
    const times = { quick: [], full: [] };
    for (let i = 0; i < 3; i++) for (const [k, u] of [['full', FULL], ['quick', QUICK]]) { const c = await b.newContext(); const p = await c.newPage(); const t0 = Date.now(); await p.goto(u); await ready(p); times[k].push(Date.now() - t0); await c.close(); }
    const med = a => a.slice().sort((x, y) => x - y)[1];
    ok(med(times.quick) < med(times.full), 'a page that answers: ' + (med(times.quick) / 1000).toFixed(1) + ' s quick, ' + (med(times.full) / 1000).toFixed(1) + ' s full (the middle of three loads each)', times);

    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    let p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    const fetched = []; p.on('request', r => { if (/the_forge_parts\//.test(r.url())) fetched.push(r.url().split('/').pop()); });
    await p.goto(QUICK); await ready(p);
    const st = await p.evaluate(() => ({ left: forgeDeferredLeft(), ids: [...document.querySelectorAll('script[data-defer]')].map(e => e.id) }));
    ok(st.left === 4, 'the quick page: its four carried apps are files beside it', st.ids);
    await p.waitForFunction(() => !!window.__forgeBiLast, null, { timeout: 120000 }).catch(() => { });
    const seed = await p.evaluate(() => ({ last: window.__forgeBiLast, left: forgeDeferredLeft() }));
    ok(seed.last && seed.last.kept === 4 && !seed.last.failed && fetched.length === 4, 'a first start keeps all four apps, each fetched from its file and checked', [seed, fetched]);
    const meta = await p.evaluate(async () => { const M = await window.__forgeLib.meta(); return ['cd', 'forge', 'inkwell', 'ingenium'].map(a => !!M[a + ':newest']); });
    ok(meta.every(Boolean), 'the library holds Carpe Diem, the Forge, Inkwell and Ingenium', meta);
    await p.close(); fetched.length = 0;
    p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message)); p.on('request', r => { if (/the_forge_parts\//.test(r.url())) fetched.push(r.url().split('/').pop()); });
    await p.goto(QUICK); await ready(p); await p.waitForTimeout(8000);
    const again = await p.evaluate(() => forgeDeferredLeft());
    ok(again === 4 && fetched.length === 0, 'a second start needs none of them and fetches nothing', { left: again, fetched });
    ok(!errs.length, 'no page errors', errs.slice(0, 4));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
