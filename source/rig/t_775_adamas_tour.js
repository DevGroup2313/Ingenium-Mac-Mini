// Ingenium 7.75 (24 November 2026): the guided tour no longer leaves Adamas's stone still, soft and without its holder, and its card keeps
// clear of the stone (modules/r292.js, r367.js). Her words: "The diamond is blurred in the background, and the holder is missing from view
// in the Guided Tour section of the Adamas page. The tour card is also placed directly on the diamond during the tour".
//   node rig/t_775_adamas_tour.js <Ingenium page url> <out folder>
// The scene here runs on SwiftShader (no graphics card), as rig/t_740_adamas.js does, with "ing.gpu.diamond" set to "full" where the
// scene itself must draw; the mark's rules are read from IngDiamond.gpu() and localStorage.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];
async function open(b, vw, vh, init) { const ctx = await b.newContext({ viewport: { width: vw, height: vh } }); if (init) await ctx.addInitScript(init);
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(800);
  return { ctx, p, errs }; }
(async () => {
  const b = await pw.chromium.launch({ args: ARGS });
  // 1. the tour passes through Adamas for a moment: the mark does not outlive the visit
  { const { ctx, p, errs } = await open(b, 1440, 900, () => { try { localStorage.setItem('ing.gpu.diamond', 'full'); localStorage.removeItem('ing.diamond.trying'); } catch (e) {} });
    // as the tour does: Adamas opens, its first frames begin to be timed (the mark is set), and the tour moves on before three are drawn
    await p.evaluate(() => { localStorage.removeItem('ing.gpu.diamond'); go('build'); });
    await p.waitForFunction(() => localStorage.getItem('ing.diamond.trying') === '1', null, { timeout: 15000, polling: 5 }).catch(() => {});
    const during = await p.evaluate(() => ({ mark: localStorage.getItem('ing.diamond.trying'), st: IngDiamond.gpu().st, n: IngDiamond.gpu().n }));
    await p.evaluate(() => go('home')); await sleep(1200);
    const after = await p.evaluate(() => ({ mark: localStorage.getItem('ing.diamond.trying'), st: IngDiamond.gpu().st }));
    ok(during.mark === '1' && after.mark === null, 'leaving Adamas before its first frames are drawn (as the tour does) leaves no mark that reads as a crash', { during, after });
    ok(errs.length === 0, 'no page errors (1)', errs); await ctx.close(); }
  // 2. a device that has drawn the moving stone well, with a mark left from before: one fresh try, not the still stone for good
  { const { ctx, p, errs } = await open(b, 1440, 900, () => { try { localStorage.setItem('ing.diamond.trying', '1'); localStorage.setItem('ing.gpu.diamond.ok', 'full'); localStorage.removeItem('ing.diamond.retried'); localStorage.removeItem('ing.gpu.diamond'); } catch (e) {} });
    await p.evaluate(() => go('build')); await sleep(2500);
    const g = await p.evaluate(() => ({ gpu: IngDiamond.gpu(), still: (document.querySelector('[data-still]') || {}).getAttribute ? document.querySelector('[data-still]').getAttribute('data-still') : null, retried: localStorage.getItem('ing.diamond.retried') }));
    ok(g.gpu.why !== 'stopped' && g.still !== 'stopped' && g.retried === '1', 'a device that has drawn the moving stone before gets a fresh try after an old mark, not the still stone without its holder', g);
    await p.screenshot({ path: OUT + '/2_adamas.png' });
    ok(errs.length === 0, 'no page errors (2)', errs); await ctx.close(); }
  // 3. the same mark a second time, after the fresh try: the still stone, as before (a device that really stops is still protected)
  { const { ctx, p } = await open(b, 1440, 900, () => { try { localStorage.setItem('ing.diamond.trying', '1'); localStorage.setItem('ing.gpu.diamond.ok', 'full'); localStorage.setItem('ing.diamond.retried', '1'); localStorage.removeItem('ing.gpu.diamond'); } catch (e) {} });
    await p.evaluate(() => go('build')); await sleep(1500);
    const g = await p.evaluate(() => IngDiamond.gpu());
    ok(g.st === 'still', 'stopped again after the fresh try: the still stone, which cannot stop the app (a device that really stops is still protected)', g); await ctx.close(); }
  // 4. the tour's card keeps clear of the stone, on a short window where it would cover it
  { const { ctx, p, errs } = await open(b, 1280, 560, () => { try { localStorage.setItem('ing.gpu.diamond', 'still'); } catch (e) {} });
    const i = await p.evaluate(() => ING_TOUR.findIndex(s => s.chap === 'Making things' && s.sub === 'Adamas'));
    await p.evaluate(i => { try { tour(); } catch (e) {} setTimeout(() => tourJump(i), 500); }, i); await sleep(3500);
    await p.waitForFunction(() => { const o = document.querySelector('.tour-ov'); return o && o.getAttribute('data-r367'); }, null, { timeout: 8000 }).catch(() => {});
    const r = await p.evaluate(() => { const c = document.querySelector('.tour-card'), s = document.querySelector('#page-build .bd-cv:not(.ov)'); const a = c && c.getBoundingClientRect(), h = s && (s.parentNode || s).getBoundingClientRect();
      const cross = !!(a && h && a.left < h.right && h.left < a.right && a.top < h.bottom && h.top < a.bottom); return { card: a && [Math.round(a.left), Math.round(a.top), Math.round(a.width), Math.round(a.height)], stone: h && [Math.round(h.left), Math.round(h.top), Math.round(h.width), Math.round(h.height)], cross, side: (document.querySelector('.tour-ov') || {}).getAttribute ? document.querySelector('.tour-ov').getAttribute('data-r367') : null }; });
    await p.screenshot({ path: OUT + '/4_tour_card.png' });
    ok(r.card && r.stone && !r.cross, 'on a short window the tour\'s card stands beside the stone, never on it', r);
    ok(errs.length === 0, 'no page errors (4)', errs); await ctx.close(); }
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
