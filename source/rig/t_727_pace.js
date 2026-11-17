// Ingenium 7.27: the scenes rest when nobody watches them (modules/r310.js; r290, r291, r292, r294). Her words (17 November 2026): "The
// diamond on Adamas' page is still overheats my computer and my fan is still loud, not as much as before but it is loud, the same for the
// Vesta page and Lector and Fabrica." WebGL drawing is skipped and counted (this machine draws it in software); frames are counted too.
// Checks:
//   - Adamas, Vesta and Fabrica's tree at rest: about 20 draws a second, and no wake between them (wakes at most draws x 1.5 + 3);
//   - typing in a field: 10 a second at most;
//   - scrolled so that less than three tenths of a scene shows below the top bar: no draws; back at the top: drawing again;
//   - under the pointer, Adamas draws as before (more than 25 a second);
//   - Lector: its head and its two documents sway at the top and all rest once three tenths of the head no longer show;
//   - no page error.
//   node rig/t_727_pace.js <page url>
const pw = require('/opt/node-tools/node_modules/playwright');
const [U] = process.argv.slice(2);
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { const W = window; W.__d = {}; W.__w = 0;
    [W.WebGLRenderingContext, W.WebGL2RenderingContext].forEach(C => { const P = C && C.prototype; if (!P) return; ['drawArrays', 'drawElements'].forEach(n => { P[n] = function () { const c = this.canvas, k = c && c.className && typeof c.className === 'string' ? c.className.split(' ')[0] : '?'; W.__d[k] = (W.__d[k] || 0) + 1; }; }); });
    const P2 = W.CanvasRenderingContext2D && W.CanvasRenderingContext2D.prototype; const oc = P2.clearRect; P2.clearRect = function () { const c = this.canvas; if (c && c.classList && c.classList.contains('fbt-cv')) W.__d['fbt-cv'] = (W.__d['fbt-cv'] || 0) + 1; return oc.apply(this, arguments); };
    const or = W.requestAnimationFrame.bind(W); W.requestAnimationFrame = function (f) { return or(function (t) { W.__w++; return f(t); }); }; });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await sleep(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const rate = async (k, s, during) => { const a = await p.evaluate(() => ({ d: Object.assign({}, window.__d), w: window.__w })); if (during) await during(); else await sleep(s * 1000);
    const z = await p.evaluate(() => ({ d: Object.assign({}, window.__d), w: window.__w })); return { draws: +(((z.d[k] || 0) - (a.d[k] || 0)) / s).toFixed(1), wakes: +((z.w - a.w) / s).toFixed(1) }; };
  const open = async (pg) => { await p.evaluate((pg) => { go(pg); window.scrollTo(0, 0); }, pg); await p.mouse.move(2, 898); await sleep(6000); };
  const typing = async () => { for (let i = 0; i < 8; i++) { await p.evaluate(() => { const e = [...document.querySelectorAll('textarea,input[type=text],input:not([type])')].find(x => x.offsetParent) || document.querySelector('textarea'); if (e) e.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true })); }); await sleep(1000); } };
  const away = async (pg, text) => { await p.evaluate(([pg, text]) => { const e = [...document.querySelectorAll('#page-' + pg + ' *')].filter(x => x.textContent.trim().indexOf(text) === 0 && x.offsetParent).pop(); if (e) window.scrollBy(0, e.getBoundingClientRect().top - 210); }, [pg, text]); await sleep(2500); };
  for (const [pg, k, below] of [['build', 'bd-cv', 'Your code'], ['focus', 'fc-cv', null], ['fabrica', 'fbt-cv', null]]) {
    await open(pg); const r = await rate(k, 8); ok(r.draws >= 12 && r.draws <= 22 && r.wakes <= r.draws * 1.5 + 3, pg + ': at rest about 20 draws a second, and no wake between them', r);
    await sleep(5500); const t = await rate(k, 8, typing); ok(t.draws <= 11 && t.draws >= 5, pg + ': while she types in a field, 10 a second at most', t); await sleep(5500);
    if (below) await away(pg, below); else await p.evaluate((pg) => { const s = document.querySelector('#page-' + pg + ' .skh') || document.querySelector('#page-' + pg + ' canvas'); const r = s.getBoundingClientRect(); window.scrollBy(0, r.bottom - 48 - 0.2 * r.height); }, pg);
    await sleep(2000); const a = await rate(k, 6); ok(a.draws === 0 && a.wakes < 6, pg + ': scrolled so that less than three tenths of it shows below the top bar, it draws nothing', a);
    await p.evaluate(() => window.scrollTo(0, 0)); await sleep(2500); const back = await rate(k, 5); ok(back.draws >= 8, pg + ': back at the top, it draws again', back); }
  await open('build'); const box = await p.evaluate(() => { const r = document.querySelector('#page-build canvas.bd-cv').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height * 0.4 }; });
  const ov = await rate('bd-cv', 4, async () => { for (let i = 0; i < 40; i++) { await p.mouse.move(box.x + Math.sin(i / 3) * 30, box.y + Math.cos(i / 4) * 20); await sleep(100); } });
  ok(ov.draws > 25, 'Adamas under the pointer draws as before, more than 25 a second', ov); await p.mouse.move(2, 898);
  await p.evaluate(() => { go('lector'); window.scrollTo(0, 0); }); await sleep(3000);
  const sway = () => p.evaluate(() => { const h = document.querySelector('#page-lector .skh'); return { away: h.classList.contains('is-away'), running: document.getAnimations().filter(a => a.playState === 'running' && /skhSway|lfSway/.test(a.animationName)).length }; });
  const l0 = await sway(); await p.evaluate(() => { const r = document.querySelector('#page-lector .skh').getBoundingClientRect(); window.scrollTo(0, r.bottom - 48 - 0.25 * r.height); }); await sleep(1200); const l1 = await sway();
  ok(!l0.away && l0.running === 3 && l1.away && l1.running === 0, 'Lector: the head and its two documents sway at the top, and all rest with a quarter of the head in view', { top: l0, quarter: l1 });
  ok(!errs.length, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); })();
