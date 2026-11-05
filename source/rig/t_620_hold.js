// The chat's height, held when it swings (Ingenium 6.20, modules/r102.js). Her words (4 November 2026): "the chat inside of the
// panel keeps on glitching back and forth". 6.11.2 held the steadier of two swinging heights for three seconds; the same swing could
// then come back. Now: a swing seen once is held for three seconds, as before; the same swing again, in the same layout, is held
// until the layout changes (here, the window's size). The swing is made by hand (two heights in its recent history), as Chromium
// does not swing on its own here; invented text only. (6.21: the hold is read a millisecond or two after the test reads the clock, so up to 3050 ms counts as three seconds.)
//   node rig/t_620_hold.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1400))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e.message).slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1400);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.evaluate(() => { go('chat'); }); await p.waitForTimeout(1500);
  const H = () => p.evaluate(() => parseInt(getComputedStyle(document.documentElement).getPropertyValue('--r2-h'), 10) || 0);
  const swing = (d) => p.evaluate((d) => { const vh = window.innerHeight, h = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--r2-h'), 10), now = Date.now();
    R2.raf = 0; R2.h = 0; R2.hist = [[now - 300, h, vh], [now - 150, h - d, vh]]; r2Fit(); return { holdN: R2.holdN || 0, until: R2.holdUntil === Infinity ? 'always' : (R2.holdUntil || 0) - now }; }, d);
  const settle = () => p.evaluate(() => { R2.hist = []; R2.raf = 0; r2Fit(); });
  await settle(); const h0 = await H();
  const fn = await p.evaluate(() => typeof r2Fit === 'function' && typeof R2 === 'object');
  ok(h0 >= 240 && fn, 'the chat has its height, from the fit that holds it', { h0, fn });
  const s1 = await swing(50); const h1 = await H();
  ok(h1 === h0 - 50 && s1.holdN === 1 && s1.until > 2000 && s1.until <= 3050, 'a swing seen once: the steadier height, held for three seconds', { h0, h1, s1 });
  await p.evaluate(() => { R2.holdUntil = Date.now() - 1; }); await settle(); const h2 = await H();
  ok(h2 === h0, 'after those three seconds, the full height again (a swing once, as a page settles, costs nothing)', { h0, h2 });
  const s3 = await swing(50); await settle(); await p.waitForTimeout(3600); await settle(); const h3 = await H();
  ok(s3.holdN === 2 && s3.until === 'always' && h3 === h0 - 50, 'the same swing again in the same layout: held, past three seconds', { h0, h3, s3 });
  await p.setViewportSize({ width: 1500, height: 1080 }); await p.waitForTimeout(900); await settle(); const h4 = await H(); const n4 = await p.evaluate(() => R2.holdN || 0);
  ok(h4 > h0 && n4 === 0, 'a new window size lets go at once: the chat takes the new height', { h0, h4, n4 });
  await p.evaluate(() => { R2.h = 0; window.r2Grip && r2Grip(400); }); await settle(); const g = await p.evaluate(() => ({ h: R2.h, css: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--r2-h'), 10) }));
  ok(g.css === 400, 'a height she sets with the grip is hers, never held', g);
  ok(!errs.length, 'no errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
