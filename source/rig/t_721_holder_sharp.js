// Ingenium 7.21: Adamas's holder keeps the screen's full sharpness when frames arrive late. Her words (16 November 2026): "The holder of
// Adamas' diamond still look really blurry on build 7.20, it does not look more defined or refined." Before 7.21 a computer that fell behind
// drew the scene at fewer pixels (down to 0.45 of the screen's sharpness on a Retina screen); now it draws fewer frames a second instead.
// Every animation frame is delayed to 60 ms (a computer that cannot keep 30 frames a second), at a Retina screen's density (2).
//   node rig/t_721_holder_sharp.js <Ingenium page url>
const pw = require('/opt/node-tools/node_modules/playwright');
const [U] = process.argv.slice(2);
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d))); c ? pass++ : fail++; };
(async () => { const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { window.__late = false; const raf = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = function (f) { if (!window.__late) return raf(f); return setTimeout(() => f(performance.now()), 60); }; });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(2500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('build'); window.scrollTo(0, 0); });
  await p.mouse.move(5, 890); await p.waitForTimeout(4000);
  const size = () => p.evaluate(() => { const c = document.querySelector('#page-build .skh canvas.bd-cv:not(.ov)'); const r = c.getBoundingClientRect(); return { w: c.width, h: c.height, cssW: Math.round(r.width), cssH: Math.round(r.height) }; });
  const s0 = await size(); ok(s0.w === s0.cssW * 2 && s0.h === s0.cssH * 2, 'the holder starts at the screen\'s full sharpness (two pixels a point)', s0);
  await p.evaluate(() => { window.__late = true; });
  const seen = []; for (let i = 0; i < 8; i++) { await p.waitForTimeout(5000); seen.push(await size()); }
  ok(seen.every(s => s.w === s0.w && s.h === s0.h), 'with frames 60 ms apart for 40 s, it keeps every pixel (before 7.21 it fell to 884 by 721, and on toward 0.45)', seen.map(s => s.w + 'x' + s.h).join(' '));
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0); })().catch((e) => { console.error(String(e).slice(0, 500)); process.exit(2); });
