// node rig/t_720_holder.js <page url> chromium|webkit   (r292: Adamas's scene compiles and draws, at full sharpness on a computer and a touch screen; WebKit with PLAYWRIGHT_BROWSERS_PATH)
// r292 on the page: the scene compiles and draws (no data-nogl, the canvas not empty), and on a touch screen the canvas is drawn at full
// sharpness (its pixels against its box and the screen's density); Chrome or WebKit
const pw = require('/opt/node-tools/node_modules/playwright');
const [U, eng] = process.argv.slice(2); let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else fail++; console.log((c ? 'ok   ' : 'FAIL ') + m); };
(async () => { const b = await pw[eng || 'chromium'].launch();
  for (const touch of [false, true]) {
    const ctx = await b.newContext(touch ? { viewport: { width: 1180, height: 820 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true } : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    await ctx.addInitScript(() => { window.__keepQ = true; }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => { if (!/sandboxed/.test(e.message)) errs.push(e.message.slice(0, 140)); }); p.on('console', (m) => { if (m.type() === 'error' && /shader|GL|program/i.test(m.text())) errs.push('console: ' + m.text().slice(0, 160)); });
    await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(2500);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('build'); window.scrollTo(0, 0); });
    await p.waitForTimeout(eng === 'webkit' ? 16000 : 9000);
    const r = await p.evaluate(() => { const host = document.querySelector('#page-build .skh'); const cv = host && host.querySelector('canvas.bd-cv:not(.ov)'); if (!cv) return null; const b = cv.getBoundingClientRect();
      const nogl = !!host.querySelector('[data-nogl]');
      return { coarse: matchMedia('(pointer: coarse)').matches, w: cv.width, cssw: cv.offsetWidth, dpr: Math.min(2, Math.max(1, devicePixelRatio)), nogl, x: b.left, y: b.top, bw: b.width, bh: b.height }; });
    if (r) { const png = await p.screenshot({ clip: { x: r.x, y: r.y, width: r.bw, height: r.bh } }); r.range = await p.evaluate((b64) => new Promise((res) => { const im = new Image(); im.onload = () => { const o = document.createElement('canvas'); o.width = 64; o.height = 64; const g = o.getContext('2d'); g.drawImage(im, 0, 0, 64, 64); const d = g.getImageData(0, 0, 64, 64).data; let mn = 765, mx = 0; for (let i = 0; i < d.length; i += 4) { const v = d[i] + d[i + 1] + d[i + 2]; mn = Math.min(mn, v); mx = Math.max(mx, v); } res(mx - mn); }; im.onerror = () => res(-1); im.src = 'data:image/png;base64,' + b64; }), png.toString('base64')); }
    if (!r) { ok(false, (touch ? 'touch' : 'desk') + ': no scene canvas'); continue; }
    ok(!r.nogl && r.range > 60, (touch ? 'touch' : 'desk') + ': the scene compiles and draws (contrast ' + r.range + ')');
    const qq = r.w / (r.cssw * r.dpr); ok(Math.abs(qq - 1) < 0.03, (touch ? 'touch' : 'desk') + `: drawn at ${qq.toFixed(2)} of full sharpness (canvas ${r.w} px for ${r.cssw} css px at density ${r.dpr}; coarse pointer ${r.coarse})`);
    ok(errs.length === 0, (touch ? 'touch' : 'desk') + ': no page or shader errors ' + JSON.stringify(errs.slice(0, 2)));
    await ctx.close(); }
  console.log(pass + '/' + (pass + fail)); await b.close(); })().catch((e) => { console.error(String(e).slice(0, 600)); process.exit(2); });
