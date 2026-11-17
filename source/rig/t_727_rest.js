// Ingenium 7.27: what each page keeps doing at rest (her words, 17 November 2026: "The diamond on Adamas' page is still overheats my
// computer and my fan is still loud, not as much as before but it is loud, the same for the Vesta page and Lector and Fabrica").
// For each page named, opened and left alone (the pointer parked in a corner) for a few seconds, then watched for ten: the animations
// still running on what can be seen (and what each one moves: a move or a fade the graphics chip does alone, anything else repainted
// every frame), the canvases drawn (WebGL and 2D: draws a second and their pixels), the page's own frame callbacks a second, and the
// main thread's time (Chrome's own counters). WebGL drawing itself is skipped and only counted (this machine draws it in software).
//   node rig/t_727_rest.js <page url> <out json> <page>...   (pages by go()'s names: build focus lector fabrica home chat; build@<selector> or build@text:<its words>
//   scrolls that part of the page to 210 px from the top first; a name ending in !type presses a key in a field once a second while watched)
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [U, OUT, ...PAGES] = process.argv.slice(2);
(async () => { const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { const W = window; W.__cv = new Map(); W.__raf = 0;
    const tag = (c) => { if (!c) return '?'; let s = c.id ? '#' + c.id : ''; if (c.className && typeof c.className === 'string') s += '.' + c.className.trim().split(/\s+/).join('.'); const p = c.closest && c.closest('section[id^="page-"]'); return (p ? p.id + ' ' : '') + 'canvas' + s; };
    const bump = (c, k) => { const t = tag(c); let e = W.__cv.get(t); if (!e) { e = { gl: 0, d2: 0, px: 0 }; W.__cv.set(t, e); } e[k]++; e.px = (c.width || 0) * (c.height || 0); };
    [W.WebGLRenderingContext, W.WebGL2RenderingContext].forEach(C => { const P = C && C.prototype; if (!P) return; ['drawArrays', 'drawElements'].forEach(n => { const o = P[n]; P[n] = function () { bump(this.canvas, 'gl'); }; }); });
    const P2 = W.CanvasRenderingContext2D && W.CanvasRenderingContext2D.prototype; if (P2) { const oc = P2.clearRect; P2.clearRect = function () { bump(this.canvas, 'd2'); return oc.apply(this, arguments); }; }
    const or = W.requestAnimationFrame.bind(W); W.requestAnimationFrame = function (f) { return or(function (t) { W.__raf++; return f(t); }); }; });
  const p = await ctx.newPage(); const cdp = await ctx.newCDPSession(p); await cdp.send('Performance.enable');
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(2000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const metric = async () => { const m = (await cdp.send('Performance.getMetrics')).metrics; const o = {}; m.forEach(x => o[x.name] = x.value); return o; };
  const out = {};
  for (const pg of PAGES) {
    await p.evaluate((pg) => { const [n, sel] = pg.replace(/!type$/, '').split('@'); go(n); window.scrollTo(0, 0); if (sel) setTimeout(() => { const e = /^text:/.test(sel) ? [...document.querySelectorAll('section.active *, #page-' + n + ' *')].filter(x => x.textContent.trim().indexOf(sel.slice(5)) === 0 && x.offsetParent).pop() : document.querySelector(sel); if (e) { const r = e.getBoundingClientRect(); window.scrollBy(0, r.top - 210); } }, 600); }, pg); await p.mouse.move(2, 898); await p.waitForTimeout(8000);
    const s0 = await p.evaluate(() => { const o = {}; window.__cv.forEach((v, k) => o[k] = { gl: v.gl, d2: v.d2 }); return { cv: o, raf: window.__raf, t: performance.now() }; }); const m0 = await metric();
    if (/!type$/.test(pg)) { for (let i = 0; i < 10; i++) { await p.evaluate(() => { const e = document.querySelector('#codeEditor') || [...document.querySelectorAll('textarea')].find(x => x.offsetParent); if (e) e.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true })); }); await p.waitForTimeout(1000); } }
    else await p.waitForTimeout(10000);
    const s1 = await p.evaluate(() => { const o = {}; window.__cv.forEach((v, k) => o[k] = { gl: v.gl, d2: v.d2, px: v.px }); return { cv: o, raf: window.__raf, t: performance.now() }; }); const m1 = await metric();
    const sec = (s1.t - s0.t) / 1000; const cv = {};
    Object.keys(s1.cv).forEach(k => { const a = s0.cv[k] || { gl: 0, d2: 0 }, z = s1.cv[k]; const gl = (z.gl - a.gl) / sec, d2 = (z.d2 - a.d2) / sec; if (gl || d2) cv[k] = { gl: +gl.toFixed(1), d2: +d2.toFixed(1), px: z.px, mpxs: +(((gl + d2) * z.px) / 1e6).toFixed(1) }; });
    const anim = await p.evaluate(() => { const vw = innerWidth, vh = innerHeight, cheap = /^(transform|opacity|translate|rotate|scale|offset|composite|easing|computedOffset)$/;
      const rows = []; document.getAnimations().forEach(a => { if (a.playState !== 'running') return; const t = a.effect && a.effect.target; if (!t || !t.getBoundingClientRect) return; const r = t.getBoundingClientRect(); if (!r.width || !r.height || r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw) return;
        if (t.closest && t.closest('[hidden]')) return; let cs = getComputedStyle(t); if (cs.visibility === 'hidden' || cs.display === 'none') return;
        const props = new Set(); try { a.effect.getKeyframes().forEach(k => Object.keys(k).forEach(x => props.add(x))); } catch (e) {}
        const pr = [...props].filter(x => !/^(offset|easing|composite|computedOffset)$/.test(x)); const timing = a.effect.getComputedTiming ? a.effect.getComputedTiming() : {};
        let sel = t.tagName.toLowerCase() + (t.id ? '#' + t.id : '') + (typeof t.className === 'string' && t.className ? '.' + t.className.trim().split(/\s+/).slice(0, 3).join('.') : '') + (t.className && t.className.baseVal ? '.' + t.className.baseVal.trim().split(/\s+/).slice(0, 2).join('.') : '');
        const pg = t.closest && t.closest('section[id^="page-"]');
        rows.push({ el: (pg ? pg.id + ' ' : '') + sel, name: a.animationName || a.id || '', props: pr.join(','), paint: pr.some(x => !cheap.test(x)), inf: timing.iterations === Infinity, area: Math.round(r.width * r.height) }); });
      return rows; });
    const d = (k) => +(((m1[k] || 0) - (m0[k] || 0)) / sec * 1000).toFixed(1);
    out[pg] = { raf: +((s1.raf - s0.raf) / sec).toFixed(1), task_ms_s: d('TaskDuration'), script_ms_s: d('ScriptDuration'), layout_ms_s: d('LayoutDuration'), style_ms_s: d('RecalcStyleDuration'), canvases: cv,
      anims: anim.length, paintAnims: anim.filter(x => x.paint).length, paintArea: anim.filter(x => x.paint).reduce((s, x) => s + x.area, 0), list: anim };
    console.log(pg, JSON.stringify({ raf: out[pg].raf, task: out[pg].task_ms_s, script: out[pg].script_ms_s, style: out[pg].style_ms_s, layout: out[pg].layout_ms_s, anims: out[pg].anims, paintAnims: out[pg].paintAnims, paintArea: out[pg].paintArea, canvases: cv }));
  }
  fs.writeFileSync(OUT, JSON.stringify(out, null, 1)); await b.close(); })();
