// node rig/t_perf.js <page url> [runs] [--profile out.json]
// How fast the page starts and moves: the time to its first paint, to its ready mark (window.__ingReady), to the door's
// Enter; the main thread's long tasks; the memory it holds; and the time each room takes to open. With --profile, a CPU
// profile of the start (open it in Chromium's DevTools, Performance) and the functions that cost the most.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2); const URL = args[0]; const RUNS = +(args[1] && !args[1].startsWith('-') ? args[1] : 3);
const PROF = args.includes('--profile') ? args[args.indexOf('--profile') + 1] : null;
const ROOMS = ['chat', 'models', 'settings', 'lector', 'tabula', 'abacus', 'slides', 'home'];
(async () => {
  const b = await pw.chromium.launch(); const all = [];
  for (let run = 0; run < RUNS; run++) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); const p = await ctx.newPage(); const cdp = await ctx.newCDPSession(p);
    await p.addInitScript(() => { window.__lt = []; try { new PerformanceObserver(l => l.getEntries().forEach(e => window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]))).observe({ type: 'longtask', buffered: true }); } catch (e) {} });
    if (PROF && run === 0) { await cdp.send('Profiler.enable'); await cdp.send('Profiler.setSamplingInterval', { interval: 200 }); await cdp.send('Profiler.start'); }
    const t0 = Date.now(); await p.goto(URL, { waitUntil: 'commit', timeout: 600000 });
    await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 50 });
    const ready = await p.evaluate(() => performance.now());
    const paint = await p.evaluate(() => { const e = performance.getEntriesByName('first-contentful-paint')[0]; return e ? Math.round(e.startTime) : null; });
    const nav = await p.evaluate(() => { const n = performance.getEntriesByType('navigation')[0]; return { dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd), bytes: n.transferSize || n.encodedBodySize }; });
    if (PROF && run === 0) { const { profile } = await cdp.send('Profiler.stop'); fs.writeFileSync(PROF, JSON.stringify(profile));
      const self = {}; const byId = {}; profile.nodes.forEach(n => byId[n.id] = n); const dt = profile.timeDeltas; const per = {};
      profile.samples.forEach((id, i) => { per[id] = (per[id] || 0) + (dt[i] || 0); });
      for (const id in per) { const n = byId[id]; const f = n.callFrame; const k = (f.functionName || '(anonymous)') + ' ' + (f.url ? f.url.split('/').pop() : '') + ':' + f.lineNumber; self[k] = (self[k] || 0) + per[id] / 1000; }
      console.log('top self time (ms):'); Object.entries(self).sort((a, b) => b[1] - a[1]).slice(0, 25).forEach(([k, v]) => console.log('  ' + v.toFixed(0).padStart(6) + '  ' + k)); }
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
    await p.waitForTimeout(1500);
    const heap = await cdp.send('Runtime.getHeapUsage'); const dom = await cdp.send('Memory.getDOMCounters').catch(() => ({}));
    const lt = await p.evaluate(() => window.__lt.slice());
    const rooms = {};
    for (const r of ROOMS) { const ms = await p.evaluate(async r => { const t = performance.now(); go(r); await new Promise(res => requestAnimationFrame(() => requestAnimationFrame(res))); return Math.round(performance.now() - t); }, r);
      rooms[r] = ms; await p.waitForTimeout(r === 'tabula' || r === 'abacus' || r === 'slides' ? 2500 : 600); }
    const lt2 = await p.evaluate(() => window.__lt.slice());
    const res = { run, paint, dcl: nav.dcl, load: nav.load, ready: Math.round(ready), wall: Date.now() - t0, heapMB: +(heap.usedSize / 1048576).toFixed(1), nodes: dom.nodes, longTasks: lt.length,
      longMs: lt.reduce((a, x) => a + x[1], 0), worst: lt.sort((a, b) => b[1] - a[1]).slice(0, 5), rooms, roomLong: lt2.length - lt.length };
    console.log(JSON.stringify(res)); all.push(res); await ctx.close();
  }
  const med = k => { const v = all.map(r => r[k]).sort((a, b) => a - b); return v[Math.floor(v.length / 2)]; };
  console.log('median: paint ' + med('paint') + ' ms, DOM ready ' + med('dcl') + ' ms, ready ' + med('ready') + ' ms, heap ' + med('heapMB') + ' MB, long tasks ' + med('longMs') + ' ms');
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
