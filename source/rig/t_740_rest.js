// Ingenium 7.40: at rest, still (modules/r324.js), on a phone's screen. For each page: the share of one processor core used in 8 s with
// nothing touched, measured after the rest has begun (12 s on a phone); then a touch wakes it and the animations run again.
//   node rig/t_740_rest.js <page url>
const pw = require('/opt/node-tools/node_modules/playwright');
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 400))); c ? pass++ : fail++; };
(async () => { const b = await pw.chromium.launch(); const ctx = await b.newContext({ ...pw.devices['iPhone 13'] }); const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p); await cdp.send('Performance.enable'); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 160)));
  await p.goto(process.argv[2], { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngStill, null, { timeout: 600000, polling: 500 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const res = {};
  for (const pg of ['home', 'focus', 'career', 'fabrica', 'build']) {
    await p.evaluate(pg => { go(pg); IngStill.touched(); }, pg); await p.waitForTimeout(16500);
    const on = await p.evaluate(() => IngStill.on());
    const g = (m, n) => (m.metrics.find(x => x.name === n) || {}).value; const m0 = await cdp.send('Performance.getMetrics'); await p.waitForTimeout(8000); const m1 = await cdp.send('Performance.getMetrics');
    res[pg] = { rest: on, core: +((g(m1, 'TaskDuration') - g(m0, 'TaskDuration')) / 8 * 100).toFixed(1) };
  }
  ok(Object.values(res).every(r => r.rest), 'after 12 s untouched on a phone, every page is at rest', res);
  ok(Object.values(res).every(r => r.core < 6), 'at rest each page uses under 6 per cent of one core (7.39: Adamas 138, Vesta 98, Home 35, Fabrica 22, Vocatio 15)', res);
  const paused = await p.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length);
  await p.touchscreen.tap(5, 300); await p.waitForTimeout(400);
  const woke = await p.evaluate(() => ({ rest: IngStill.on(), running: document.getAnimations().filter(a => a.playState === 'running').length }));
  ok(paused === 0 && !woke.rest && woke.running > 0, 'a touch wakes it: the animations run again', { pausedRunning: paused, woke });
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0); })();
