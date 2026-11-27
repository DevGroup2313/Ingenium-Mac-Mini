// Ingenium 7.22: Adamas's scene paced for heat, its look unchanged. Her words (16 November 2026): "Adamas does make my mac warm, the fan of
// the computer gets really loud as well, like it is suddenly working overtime or something." The scene's draws are counted with the drawing
// itself skipped (this machine's software drawing takes about two seconds a frame, which would hide the pace): at rest about 20 a second,
// under the pointer more, while Ingenium is not the window in use 10, and back on the next touch.
// 8.03: at rest 15 a second (a frame asked for every 66 ms), as the scene is drawn at the screen's true sharpness and keeps cool by frames;
// the scene's frames fall on the page's own, so the rest pace expected here is worked out from the page's frames a second on this machine.
//   node rig/t_722_adamas_pace.js <page url>
const pw = require('/opt/node-tools/node_modules/playwright');
const [U] = process.argv.slice(2);
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d))); c ? pass++ : fail++; };
(async () => { const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  /* 8.03: a browser that draws in software ends on the still stone (r292), so the scene is chosen by hand here, as the pace is what is measured */
  await ctx.addInitScript(() => { try { localStorage.setItem('ing.gpu.diamond', 'full'); } catch (e) {} window.__draws = 0; [window.WebGLRenderingContext, window.WebGL2RenderingContext].forEach(C => { const P = C && C.prototype; if (!P) return; const o = P.drawArrays;
    P.drawArrays = function () { const c = this.canvas; if (c && c.classList && c.classList.contains('bd-cv') && !c.classList.contains('ov')) { window.__draws++; return; } if (c && c.classList && c.classList.contains('bd-bg')) return; return o.apply(this, arguments); }; }); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('build'); window.scrollTo(0, 0); });
  await p.mouse.move(5, 890); await p.waitForTimeout(6000);
  const rate = async (s) => { const d0 = await p.evaluate(() => window.__draws); await p.waitForTimeout(s * 1000); return +(((await p.evaluate(() => window.__draws)) - d0) / s).toFixed(1); };
  const raf = await p.evaluate(() => new Promise(r => { let n = 0; const t0 = performance.now(); (function f() { n++; if (performance.now() - t0 < 2000) requestAnimationFrame(f); else r(+(n / 2).toFixed(1)); })(); }));
  console.log('the page\'s own frames a second here: ' + raf);
  const fm = 1000 / Math.min(raf, 30), want = +(1000 / (Math.ceil(66 * 0.85 / fm) * fm)).toFixed(1);   /* 8.03: 15 a second on a page that keeps 30 */
  const rest = await rate(6); ok(rest >= want * 0.7 && rest <= want * 1.3 && rest <= 18, 'at rest the scene draws about 15 times a second (8.03; it drew 20 from 7.22, 30 before): ' + want + ' expected on this page', rest);
  const box = await p.evaluate(() => { const c = document.querySelector('#page-build .skh canvas.bd-cv:not(.ov)'); const r = c.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height * 0.4]; });
  await p.mouse.move(box[0], box[1]); await p.waitForTimeout(800); let over = 0; { const d0 = await p.evaluate(() => window.__draws); for (let i = 0; i < 12; i++) { await p.mouse.move(box[0] + (i % 2 ? 6 : -6), box[1]); await p.waitForTimeout(250); } over = +(((await p.evaluate(() => window.__draws)) - d0) / 3).toFixed(1); }
  ok(over > rest * 1.3, 'under the pointer it draws more often than at rest', { over, rest });
  await p.mouse.move(5, 890); await p.waitForTimeout(3500);
  await p.evaluate(() => { document.__hf = document.hasFocus; document.hasFocus = () => false; });
  const away = await rate(6); ok(away >= 7 && away <= 13, 'while Ingenium is not the window in use it draws about 10 times a second', away);
  await p.evaluate(() => { document.hasFocus = document.__hf; window.dispatchEvent(new Event('focus')); });
  const back = await rate(4); ok(back >= want * 0.7, 'back in use, it draws at its rest pace again', back);
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0); })().catch((e) => { console.error(String(e).slice(0, 500)); process.exit(2); });
