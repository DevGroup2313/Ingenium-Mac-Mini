// Ingenium 8.03, r292: the Adamas scene drawn at the screen's true pixel ratio, so the diamond's holder is sharp.
//   node rig/t_803_adamas_sharp.js <page url>
// Her words (27 November 2026): "The diamon holder of the Adamas page looks blurry and unrefined. I have been asking for this to be fixed
// for ages! I want it to look detailed, defined, sharpened and refined and not look like a blurry, poorly generated blob. I need you to
// fix it for good please." Since 7.89 every scene read a pixel ratio of at most 1.25 (r391), so on a Retina screen the scene was drawn at
// 1.25 and stretched 1.6 times. On a Retina-sized page (2 pixels a point), with cool running on as she has it, this checks: the scene's
// drawing has the screen's true pixels; every other scene still reads r391's ceiling; the soft sky keeps its old size; the tiers keep
// their old limits; the holder's edges are as strong as a true-ratio drawing gives (a stretched one gives about half). The graphics card
// here is software, so the scene is chosen by hand ("full") as the tests do. No sign-in; nothing of anyone's is read or written.
const pw = require('/opt/node-tools/node_modules/playwright'); const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const url = process.argv[2];
let ok = 0, bad = 0; const check = (c, m, x) => { if (c) { ok++; console.log('PASS ' + m); } else { bad++; console.log('FAIL ' + m + (x !== undefined ? '  ' + JSON.stringify(x).slice(0, 400) : '')); } };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.addInitScript(() => { try { localStorage.setItem('ing.gpu.diamond', 'full'); } catch (e) {} });
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(1200);
  await p.evaluate(() => { const x = document.getElementById('introEnter') || [...document.querySelectorAll('button')].find((b) => /^Enter$/.test(b.textContent.trim())); if (x) x.click(); });
  await sleep(800);
  const cool = await p.evaluate(() => ({ seen: devicePixelRatio, real: window.__ingRealRatio ? __ingRealRatio() : null, on: window.IngCool ? IngCool.on() : null }));
  check(cool.on === true && cool.seen <= 1.25 && cool.real === 2, 'cool running is on, and every other scene still reads a pixel ratio of at most 1.25 (the screen\'s true one is 2)', cool);
  await p.evaluate(() => { document.body.setAttribute('data-motion', 'minimal'); go('build'); }); await sleep(4000);
  await p.evaluate(() => { try { window.dispatchEvent(new Event('resize')); } catch (e) {} });
  await sleep(70000);
  const s = await p.evaluate(() => { const cv = document.querySelector('#page-build .bd-cv:not(.ov)'), ov = document.querySelector('#page-build .bd-cv.ov'); const r = cv.getBoundingClientRect();
    const bg = [...document.querySelectorAll('#page-build canvas')].filter((c) => c !== cv && c !== ov)[0];
    return { w: cv.width, h: cv.height, cssW: Math.round(r.width), cssH: Math.round(r.height), ovW: ov ? ov.width : 0, bg: bg ? { w: bg.width, cssW: Math.round(bg.getBoundingClientRect().width) } : null, gpu: IngDiamond.gpu() }; });
  check(s.gpu && s.gpu.ok && s.gpu.st === 'full' && s.gpu.q === 1, 'the scene draws (its shader, with the smoothed outline, compiles and runs)', s.gpu);
  check(s.w === s.cssW * 2 && s.h === s.cssH * 2, 'the scene\'s drawing has the screen\'s true pixels: ' + s.w + ' by ' + s.h + ' for ' + s.cssW + ' by ' + s.cssH + ' points', s);
  check(s.ovW === s.cssW * 2, 'its sparkles are drawn at the true pixels too', s);
  check(!s.bg || s.bg.w <= Math.ceil(s.bg.cssW * 0.625) + 1, 'the soft sky behind the stone keeps its old size (half of 1.25)', s.bg);
  // the holder's edges, against the same frame stretched from 1.25 as before 8.03 (measured: 18 stretched, 33 at the true ratio)
  const rc = await p.evaluate(() => { const r = document.querySelector('#page-build .bd-cv').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  const png = await p.screenshot({ clip: rc });
  const edge = await p.evaluate(async (b64) => { const im = new Image(); im.src = 'data:image/png;base64,' + b64; await im.decode(); const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const g = c.getContext('2d'); g.drawImage(im, 0, 0);
    const x0 = Math.round(im.width * 0.12), y0 = Math.round(im.height * 0.55), w = Math.round(im.width * 0.76), h = Math.round(im.height * 0.40); const d = g.getImageData(x0, y0, w, h).data;
    const L = (i) => 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]; let n = 0, s1 = 0, s2 = 0;
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) { const i = (y * w + x) * 4; const v = L(i - 4) + L(i + 4) + L(i - w * 4) + L(i + w * 4) - 4 * L(i); n++; s1 += v; s2 += v * v; }
    const m = s1 / n; return { w: im.width, std: Math.sqrt(s2 / n - m * m) }; }, png.toString('base64'));
  check(edge.w === s.cssW * 2 && edge.std > 26, 'the holder\'s edges are sharp: strength ' + edge.std.toFixed(1) + ' (a picture stretched from 1.25 gives about 18)', edge);
  // the rules, as the page carries them
  const src = await p.evaluate(() => [...document.scripts].map((x) => x.textContent).filter((t) => t.indexOf('__ingRealRatio') >= 0 && t.indexOf('bd-cv') >= 0).join('\n'));
  check(/c=full\*q0\*q0/.test(src) && /c<=220/.test(src) && /c<=900/.test(src) && /c>900&&!REPROBED/.test(src), 'the graphics measurement keeps its tiers in what a frame cost at the old ratio, so no chip does worse than before');
  check(/SLOW0=Math\.max\(1,Math\.min\(1\.6,full\/33\)\)/.test(src) && /busy\?33:66/.test(src), 'it keeps cool by frames: 15 a second at rest, fewer where a chip only just affords the true ratio');
  check(/HCV=1\.0-mk/.test(src), 'the holder\'s outline is smoothed within a pixel');
  check(/q=PQ\*Math\.min\(1\.25,dpr\(\)\)\/dpr\(\)/.test(src) && /pq=PQ\*Math\.min\(1\.25,dpr\(\)\)\/dpr\(\)/.test(src), 'the speed test is drawn at its old size, so opening Adamas holds the page no longer than before');
  check((src.match(/holderCol\(pp,pn,rdL,part,lit\)/g) || []).length === 1, 'the holder is coloured from one place in the shader (a second would double what the browser compiles)');
  check(/if\(SOFT\)\{goStill\("slow"\);return;\}/.test(src) && /swiftshader\|llvmpipe/.test(src), 'a browser that draws in software ends on the still stone');
  check(errs.length === 0, 'no error on the page', errs.slice(0, 3));
  console.log('\n' + ok + ' passed, ' + bad + ' failed'); await b.close(); process.exit(bad ? 1 : 0);
})();
