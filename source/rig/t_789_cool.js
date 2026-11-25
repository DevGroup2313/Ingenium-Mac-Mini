// Ingenium 7.89: cool running (modules/r391.js). On a Retina screen (two pixels for each point), with a screen that refreshes 60 times a
// second: frames are answered at most 30 times a second, scenes size themselves at 1.25 at most, and Adamas's diamond still draws.
//   node rig/t_789_cool.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] }); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })).newPage(); p.setDefaultTimeout(120000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngCool, null, { timeout: 600000 }); await sleep(2000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const r1 = await p.evaluate(() => ({ seen: devicePixelRatio, real: window.__ingRealRatio ? __ingRealRatio() : null, on: IngCool.on() }));
  ok(r1.on && r1.real === 2 && r1.seen === 1.25, 'on a Retina screen, scenes read a pixel ratio of 1.25 at most (the screen is 2)', r1);
  const fps = await p.evaluate(() => new Promise(res => { let n = 0; const t0 = performance.now(); (function f() { n++; if (performance.now() - t0 < 2000) requestAnimationFrame(f); else res(n / 2); })(); }));
  ok(fps <= 32 && fps >= 20, 'frames are answered at most 30 times a second (about ' + fps + ')', fps);
  const order = await p.evaluate(() => new Promise(res => { const out = []; const a = requestAnimationFrame(() => out.push('a')); requestAnimationFrame(() => out.push('b')); cancelAnimationFrame(a); setTimeout(() => res(out), 200); }));
  ok(order.length === 1 && order[0] === 'b', 'a cancelled frame never runs; the others run in order', order);
  await p.evaluate(() => go('build')); await sleep(3500);
  const cv = await p.evaluate(() => { const c = [...document.querySelectorAll('#page-build canvas')].filter(x => x.offsetParent).sort((a, b) => b.width * b.height - a.width * a.height)[0]; if (!c) return null; const r = c.getBoundingClientRect(); return { w: c.width, cssW: Math.round(r.width), ratio: Math.round(c.width / r.width * 100) / 100 }; });
  ok(cv && cv.ratio <= 1.3, "Adamas's diamond draws at 1.25 times its size at most (" + (cv && cv.ratio) + ')', cv);
  await p.screenshot({ path: OUT + '/adamas.png' });
  await p.evaluate(() => IngCool.set(false)); const r2 = await p.evaluate(() => devicePixelRatio); await p.evaluate(() => IngCool.set(true));
  ok(r2 === 2, 'turned off, the full sharpness comes back', r2);
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
