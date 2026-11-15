// Ingenium 7.16: what each page costs a phone while it rests, and once it is scrolled away. Her words (15 November 2026): "Ingenium is
// possibly overheating my phone, please fix that too. It is moving slow and lagging on all of my devices and sometimes making them overheat
// them. Ingenium needs to be running smoothly and fast with no issues and errors on all of my devices and I want my 3D graphics and
// animations to be preserved and run smoothly as well."
// A phone's screen (390 by 844 at three pixels to the point, touch) with the processor slowed four times; each page opened, left to settle,
// then measured for five seconds at rest (no pointer), and again scrolled to its foot: Chrome's own counters (the main thread's busy time,
// script, style and layout), the frames the page asks for (requestAnimationFrame callbacks a second), the animations running, and the
// pixels of the canvases on screen (what the graphics chip fills each frame). Measures only; a report, compared between two pages.
// usage: node rig/t_716_rest.js <page url> <out folder> [label]
const pw = require('playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, LABEL] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_716_rest.js <page url> <out folder> [label]'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PAGES = ['home', 'chat', 'blend', 'folders', 'models', 'focus', 'build', 'fabrica', 'lector', 'career', 'guide', 'settings'];
(async () => {
  const b = await pw.chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.addInitScript(() => { window.__raf = 0; const o = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = function (cb) { return o(function (t) { window.__raf++; return cb(t); }); }; });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(700);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme(); });
  const cdp = await ctx.newCDPSession(p); await cdp.send('Performance.enable'); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const metrics = async () => { const r = await cdp.send('Performance.getMetrics'); const m = {}; r.metrics.forEach(x => { m[x.name] = x.value; }); return m; };
  const measure = async () => {
    const a = await metrics(); const r0 = await p.evaluate(() => window.__raf); const t0 = Date.now(); await sleep(5000); const b2 = await metrics(); const r1 = await p.evaluate(() => window.__raf); const dt = (Date.now() - t0) / 1000;
    const vis = await p.evaluate(() => { let px = 0, n = 0; document.querySelectorAll('canvas').forEach(c => { const r = c.getBoundingClientRect(); if (r.width < 2 || r.height < 2 || r.bottom < 0 || r.top > innerHeight || !c.offsetParent) return; px += c.width * c.height; n++; });
      const an = document.getAnimations ? document.getAnimations().filter(x => x.playState === 'running') : []; return { canvases: n, mpx: +(px / 1e6).toFixed(2), anims: an.length }; });
    return { busy: +((b2.TaskDuration - a.TaskDuration) / dt * 100).toFixed(1), script: +((b2.ScriptDuration - a.ScriptDuration) / dt * 100).toFixed(1),
      style: +((b2.RecalcStyleDuration - a.RecalcStyleDuration) / dt * 100).toFixed(1), layout: +((b2.LayoutDuration - a.LayoutDuration) / dt * 100).toFixed(1),
      raf: +((r1 - r0) / dt).toFixed(0), canvases: vis.canvases, mpx: vis.mpx, anims: vis.anims };
  };
  const rows = {};
  for (const pg of PAGES) {
    const has = await p.evaluate(pg => !!document.getElementById('page-' + pg), pg); if (!has) continue;
    await p.evaluate(pg => { go(pg); document.scrollingElement.scrollTop = 0; }, pg); await sleep(4000);
    const top = await measure();
    await p.evaluate(() => { document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight; }); await sleep(1500);
    const foot = await measure();
    rows[pg] = { top, foot }; console.log(pg.padEnd(9), 'top', JSON.stringify(top), ' foot', JSON.stringify(foot));
  }
  fs.writeFileSync(path.join(OUT, 'rest' + (LABEL ? '_' + LABEL : '') + '.json'), JSON.stringify(rows, null, 1));
  console.log(errs.length ? 'page errors: ' + JSON.stringify(errs) : 'no page error');
  await b.close();
})();
