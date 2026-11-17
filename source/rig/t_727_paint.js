// Ingenium 7.27: what the browser paints each second at rest on each page named (Chrome's own trace: Paint and raster events, their time),
// and which elements are painted, by the trace's own names. node rig/t_727_paint.js <page url> <page>...
const pw = require('/opt/node-tools/node_modules/playwright');
const [U, ...PAGES] = process.argv.slice(2);
(async () => { const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { [window.WebGLRenderingContext, window.WebGL2RenderingContext].forEach(C => { const P = C && C.prototype; if (!P) return; ['drawArrays', 'drawElements'].forEach(n => { P[n] = function () {}; }); }); });
  const p = await ctx.newPage(); await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(2000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const cdp = await ctx.newCDPSession(p);
  for (const pg of PAGES) { await p.evaluate((pg) => { go(pg); window.scrollTo(0, 0); }, pg); await p.mouse.move(2, 898); await p.waitForTimeout(7000);
    const events = []; cdp.removeAllListeners('Tracing.dataCollected'); cdp.on('Tracing.dataCollected', (e) => events.push(...e.value));
    const done = new Promise(r => cdp.once('Tracing.tracingComplete', r));
    await cdp.send('Tracing.start', { categories: 'devtools.timeline,disabled-by-default-devtools.timeline,cc,viz', transferMode: 'ReportEvents' });
    await p.waitForTimeout(5000); await cdp.send('Tracing.end'); await done;
    const sec = 5, sum = {}; const nodes = {};
    events.forEach(e => { if (e.ph !== 'X' && e.ph !== 'B') return; const n = e.name; if (!/^(Paint|RasterTask|PaintImage|UpdateLayerTree|Layerize|Commit|PrePaint|Layout|UpdateLayoutTree|FireAnimationFrame|DrawFrame|BeginMainThreadFrame|Animation)$/.test(n)) return;
      const s = sum[n] || (sum[n] = { n: 0, ms: 0 }); s.n++; s.ms += (e.dur || 0) / 1000; if (n === 'Paint' && e.args && e.args.data) { const k = (e.args.data.nodeName || '') + ' ' + (e.args.data.layerId || ''); nodes[k] = (nodes[k] || 0) + 1; } });
    const o = {}; Object.keys(sum).forEach(k => o[k] = (sum[k].n / sec).toFixed(1) + '/s ' + (sum[k].ms / sec).toFixed(1) + 'ms/s');
    console.log('==', pg, JSON.stringify(o)); console.log('   painted:', JSON.stringify(Object.entries(nodes).sort((a, b) => b[1] - a[1]).slice(0, 8))); }
  await b.close(); })();
