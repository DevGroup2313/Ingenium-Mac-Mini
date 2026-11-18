// Ingenium 7.40: Adamas measures the graphics card before it draws its scene in full (modules/r292.js, GPU).
//   node rig/t_740_adamas.js <page url>
// Her words (18 November 2026): "the Adamas page has consistently crashed the app everytime that I have tried to go on the page".
// Measured on 7.39 with a processor slowed four times: opening Adamas held the page for 11.7 s in all (one stretch of 3 s), then about
// 2 frames a second; the time went to the graphics card (WebGL, read back for every frame where the card draws in software).
// Checks: the first frames are drawn at a third of the sharpness and timed; a mode is chosen from them; where the card cannot keep up (as in this
// test, whose browser draws in software) the stone is shown still, its own 24-frame strip stepping, and nothing is drawn by WebGL after;
// opening Adamas no longer holds the page for seconds; a mark left by an app that stopped while the scene was tried shows the still stone
// at once; "full" chosen by hand draws the scene; a lost graphics card leaves the still stone, not an empty head; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright');
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? pass++ : fail++; };
async function open(b, pre) { const ctx = await b.newContext({ viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1.5 }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 160)));
  if (pre) await p.addInitScript(pre);
  await p.goto(process.argv[2], { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngDiamond, null, { timeout: 600000, polling: 500 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  return { ctx, p, errs }; }
(async () => { const b = await pw.chromium.launch();
  // 1. measured, on a slower processor
  let { ctx, p, errs } = await open(b);
  const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.evaluate(() => { window.__lt = []; new PerformanceObserver(l => l.getEntries().forEach(e => window.__lt.push(Math.round(e.duration)))).observe({ type: 'longtask' }); go('build'); });
  await p.waitForTimeout(6000); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
  const g = await p.evaluate(() => ({ gpu: IngDiamond.gpu(), lt: window.__lt, still: (document.querySelector('[data-still]') || {}).getAttribute ? document.querySelector('[data-still]').getAttribute('data-still') : null,
    strip: !!document.querySelector('.bd-still img[src]'), stripVis: (() => { const s = document.querySelector('.bd-still'); return !!(s && s.offsetWidth > 40); })(), cvHidden: (document.querySelector('.bd-cv:not(.ov)') || {}).style ? document.querySelector('.bd-cv:not(.ov)').style.visibility : null,
    trying: localStorage.getItem('ing.diamond.trying') }));
  const tot = g.lt.reduce((a, x) => a + x, 0), worst = Math.max(0, ...g.lt);
  ok(g.gpu && g.gpu.n >= 3 && g.gpu.est > 0, 'the first frames are timed on the graphics card and a full frame is estimated', g.gpu);
  ok(g.gpu.st === 'still' && g.still === 'slow' && g.strip && g.stripVis && g.cvHidden === 'hidden', 'where the card cannot keep up (this browser draws in software), the stone is shown still, from its own strip', { st: g.gpu.st, still: g.still, strip: g.strip, vis: g.stripVis, cv: g.cvHidden });
  ok(tot < 4500 && worst < 2500, 'opening Adamas on a processor four times slower holds the page far less (7.39: 11.7 s in all, then 2 frames a second); its longest stretch is the shader compiled at once by a browser without parallel compiling', { total: tot, worst, n: g.lt.length });
  ok(g.trying === null, 'the mark of a scene being tried is cleared once the choice is made', g.trying);
  ok(errs.length === 0, 'no page errors', errs); await ctx.close();
  // 2. an app that stopped while the scene was tried: the still stone at once, with no frame drawn
  ({ ctx, p, errs } = await open(b, () => { try { localStorage.setItem('ing.diamond.trying', '1'); } catch (e) {} }));
  await p.evaluate(() => go('build')); await p.waitForTimeout(2500);
  const s2 = await p.evaluate(() => ({ gpu: IngDiamond.gpu(), still: document.querySelector('[data-still]') && document.querySelector('[data-still]').getAttribute('data-still') }));
  ok(s2.gpu.st === 'still' && s2.gpu.n === 0 && s2.still === 'stopped', 'after the app stopped while the scene was tried, Adamas opens on the still stone without drawing a frame', s2);
  await ctx.close();
  // 3. full sharpness chosen by hand draws the scene
  ({ ctx, p, errs } = await open(b, () => { try { localStorage.setItem('ing.gpu.diamond', 'full'); localStorage.removeItem('ing.diamond.trying'); } catch (e) {} }));
  await p.evaluate(() => go('build')); await p.waitForTimeout(3000);
  const s3 = await p.evaluate(() => ({ gpu: IngDiamond.gpu(), cv: document.querySelector('.bd-cv:not(.ov)').style.visibility }));
  ok(s3.gpu.st === 'full' && s3.gpu.q === 1 && s3.cv !== 'hidden', '"full" chosen by hand draws the scene at full sharpness', s3);
  // 4. the graphics card lost: the still stone, not an empty head
  await p.evaluate(() => { const c = document.querySelector('.bd-cv:not(.ov)'); const gl = c.getContext('webgl'); const x = gl && gl.getExtension('WEBGL_lose_context'); if (x) x.loseContext(); });
  await p.waitForTimeout(1500);
  const s4 = await p.evaluate(() => ({ gpu: IngDiamond.gpu(), still: document.querySelector('[data-still]') && document.querySelector('[data-still]').getAttribute('data-still'), strip: !!document.querySelector('.bd-still img[src]') }));
  ok(s4.gpu.st === 'still' && s4.still === 'lost' && s4.strip, 'when the graphics card is lost, the still stone is shown', s4);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0); })();
