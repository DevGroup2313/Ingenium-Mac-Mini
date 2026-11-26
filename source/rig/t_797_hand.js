// node rig/t_797_hand.js <page url> <modules/r401.js> [inject]
// Ingenium 7.97 (modules/r401.js): over the diamond, a glass bulb or a part of Fabrica's tree the pointer is the small hand again, by day and
// by night; it steps aside while the diamond spins; elsewhere the arrow stays.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 200))); c ? pass++ : fail++; };
(async () => {
  const src = fs.readFileSync(process.argv[3], 'utf8'); const css = src.match(/<style[^>]*>([\s\S]*?)<\/style>/)[1];
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  await p.goto(process.argv[2], { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  for (let i = 0; i < 2; i++) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(900); }
  if (process.argv[4] === 'inject') await p.evaluate((css) => { if (!document.getElementById('r401-css')) { const s = document.createElement('style'); s.id = 'r401-css'; s.textContent = css; document.body.appendChild(s); } }, css);
  await p.evaluate(() => go('fabrica')); await sleep(2500);
  const cur = (cls, night) => p.evaluate(([cls, night]) => { const st = document.querySelector('#page-fabrica .fbt-stage'); if (!st) return 'no stage'; if (night) document.body.setAttribute('data-theme', 'night'); else document.body.removeAttribute('data-theme');
    st.classList.remove('fbt-on-gem', 'fbt-on-part', 'fbt-on-bead', 'fbt-gem-spin'); cls.forEach((c) => st.classList.add(c)); return getComputedStyle(st).cursor.slice(0, 60); }, [cls, night]);
  for (const c of ['fbt-on-gem', 'fbt-on-bead', 'fbt-on-part']) { const v = await cur([c], false); ok(/data:image\/svg/.test(v), 'day: over ' + c.slice(7) + ' the pointer is the small hand', v); }
  const n = await cur(['fbt-on-gem'], true); ok(/data:image\/svg/.test(n) && /f3ecfd/i.test(await p.evaluate(() => getComputedStyle(document.querySelector('#page-fabrica .fbt-stage')).cursor)), 'night: the hand is pale lilac', n);
  ok((await cur(['fbt-on-gem', 'fbt-gem-spin'], false)) === 'none', 'while the diamond spins the pointer still steps aside');
  ok((await cur([], false)) === 'default', 'elsewhere on the tree the plain arrow stays');
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
