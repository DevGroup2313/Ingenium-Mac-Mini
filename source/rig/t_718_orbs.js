// PLAYWRIGHT_BROWSERS_PATH=<a WebKit build> node rig/t_718_orbs.js <page url>   (r306 on Home's orbs)
const pw = require('/opt/node-tools/node_modules/playwright');
const [U] = process.argv.slice(2); let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else fail++; console.log((c ? 'ok   ' : 'FAIL ') + m); };
(async () => { const b = await pw.webkit.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 140)));
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(3000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('home'); });
  await p.waitForTimeout(3500);
  const d1 = await p.evaluate(() => IngSealGC.drifts()); ok(d1.length === 6 && d1.every((o) => o.on && o.moving), 'Home: six orbs taken in hand and sliding: ' + JSON.stringify(d1));
  const tr = () => p.evaluate(() => [...document.querySelectorAll('.isl-gc-orb > svg')].map((s) => getComputedStyle(s).translate));
  const a = await tr(); await p.waitForTimeout(1500); const c = await tr(); const hid = await p.evaluate(() => [...document.querySelectorAll('svg.oxo-surf')].filter((s) => s.style.visibility === 'hidden').length); ok(a.length === 6 && a[0] !== c[0] && hid === 6, 'the bands move on the graphics chip (' + a[0] + ' -> ' + c[0] + '), six wrappers, the six old drawings hidden (' + hid + ')');
  await p.evaluate(() => document.body.setAttribute('data-motion', 'minimal')); await p.waitForTimeout(600); const mn = await p.evaluate(() => IngSealGC.drifts().map((o) => o.moving)); ok(mn.every((x) => !x), 'Minimal motion stills them: ' + JSON.stringify(mn));
  await p.evaluate(() => document.body.setAttribute('data-motion', 'full')); await p.waitForTimeout(600); const fm = await p.evaluate(() => IngSealGC.drifts().map((o) => o.moving)); const du = await p.evaluate(() => document.querySelector('.isl-gc-orb > svg').getAnimations().map((x) => x.effect.getTiming().duration)); ok(fm.every((x) => x) && du[0] === 40000, 'Full motion: sliding again at its own pace (' + du + ' ms)');
  await p.evaluate(() => go('chat')); await p.waitForTimeout(1500); const hh = await p.evaluate(() => IngSealGC.drifts().map((o) => o.moving)); ok(hh.every((x) => !x), 'Home hidden: nothing slides');
  await p.evaluate(() => go('home')); await p.waitForTimeout(2000); const ha = await p.evaluate(() => IngSealGC.drifts().map((o) => o.moving)); ok(ha.every((x) => x), 'Home again: sliding');
  const er = errs.filter((e) => !/sandboxed/.test(e)); ok(er.length === 0, 'no page errors ' + JSON.stringify(er)); console.log(pass + '/' + (pass + fail)); await b.close(); })();
