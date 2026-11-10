// how long the movement takes to render, whether the still light truly stays still, and how smoothly the page runs
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [SRC, OUT] = process.argv.slice(2);
const tmp = OUT + '_page.html';
fs.writeFileSync(tmp, '<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0}[hidden]{display:none!important}</style></head><body>' + fs.readFileSync(SRC, 'utf8') + '</body></html>');
(async () => {
  const b = await pw.chromium.launch();
  const p = await (await b.newContext({ viewport: { width: 1500, height: 1010 }, deviceScaleFactor: 2 })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + tmp, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1500);
  const r = await p.evaluate(async () => {
    const out = {};
    const ang = el => { const m = new DOMMatrix(getComputedStyle(el).transform); return Math.atan2(m.b, m.a) * 180 / Math.PI; };
    out.netTurnOfStillLight = [...document.querySelectorAll('#cx .mv-mask')].map(m => {
      const u = m.querySelector('.mv-unspin'); let s = (ang(m) + ang(u)) % 360; if (s > 180) s -= 360; if (s < -180) s += 360; return +s.toFixed(3); });
    const pick = n => [...document.querySelectorAll('.bx-model')].find(x => x.textContent.indexOf(n) >= 0);
    let t = performance.now(); pick('Velox').click(); out.addThirdMs = +(performance.now() - t).toFixed(1);
    t = performance.now(); pick('Faber').click(); out.addFourthMs = +(performance.now() - t).toFixed(1);
    const more = [...document.querySelectorAll('.bx-model')].filter(x => x.getAttribute('aria-pressed') !== 'true');
    t = performance.now(); if (more[0]) more[0].click(); out.addFifthMs = +(performance.now() - t).toFixed(1);
    out.wheels = document.querySelectorAll('#cx .mv-w').length; out.canvases = document.querySelectorAll('#cx canvas').length;
    const gaps = []; let last = performance.now(), n = 0;
    await new Promise(res => { const f = now => { gaps.push(now - last); last = now; if (++n < 120) requestAnimationFrame(f); else res(); }; requestAnimationFrame(f); });
    gaps.sort((a, c) => a - c); out.frameMedianMs = +gaps[60].toFixed(1); out.frameWorstMs = +gaps[gaps.length - 1].toFixed(1);
    out.swayRunning = document.querySelector('.mv-sway').getAnimations().map(a => a.playState);
    return out;
  });
  const hit = await (await p.$$('#cx .mv-hit'))[0].boundingBox();
  await p.mouse.move(hit.x + hit.width / 2, hit.y + hit.height / 2); await p.waitForTimeout(1200);
  r.whilePointing = await p.evaluate(() => getComputedStyle(document.querySelector('.mv-sway')).transform);
  await p.mouse.move(5, 5); await p.waitForTimeout(1500);
  r.afterLeaving = await p.evaluate(() => [getComputedStyle(document.querySelector('.mv-sway')).transform.slice(0, 48), document.querySelector('.mv-sway').getAnimations().map(a => a.playState)]);
  console.log(JSON.stringify(r, null, 1)); console.log('errors', JSON.stringify(errs));
  await b.close();
})();
