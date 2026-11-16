// W0=90000 [PACEAB=1] node rig/t_717_wk_heat.js <page url> <label> <page>... [label=selector|label=css:{rules}]...  (PACEAB: the top bar's seal as it was, then rebuilt)
// WebKit (Safari's engine): how much of each second the page's main thread is taken at rest, measured from inside the page:
// a chain of messages runs whenever the thread is free, and every gap in the chain longer than half a millisecond is time the page's own work took
const pw = require('/opt/node-tools/node_modules/playwright');
const [U, label, ...ARGS] = process.argv.slice(2);
const PAGES = ARGS.filter((a) => !a.includes('=')); const HOLD = ARGS.filter((a) => a.includes('=')).map((a) => a.replace(/^([^=]+)=/, '$1\u0001')).map((a) => a.replace('\u0001', '='));
(async () => { const b = await pw.webkit.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })).newPage();
  const t0 = Date.now(); await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 });
  await p.waitForTimeout(+(process.env.W0 || 90000));
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const PROBE = () => new Promise((res) => { const ch = new MessageChannel(); let n = 0; const end = Date.now() + 5000;
    ch.port1.onmessage = () => { n++; if ((n & 63) || Date.now() < end) ch.port2.postMessage(0); else res(n / 5); }; ch.port2.postMessage(0); });
  const blank = await (await b.newContext()).newPage(); await blank.goto('about:blank'); const base = await blank.evaluate(PROBE); await blank.close();
  const probe = async () => { const n = await p.evaluate(PROBE); return { busy: Math.round(1000 * Math.max(0, 1 - n / base)), gaps: Math.round(n), med: Math.round(base) }; };
  console.log(label + ' (WebKit, ready in ' + Math.round((Date.now() - t0) / 1000) + ' s): page | busy ms/s | gaps/s' + (HOLD.length ? ' | then with each group held' : ''));
  for (const pg of PAGES) { const ok = await p.evaluate((pg) => { if (!document.getElementById('page-' + pg)) return false; go(pg); document.scrollingElement.scrollTop = 0; return true; }, pg); if (!ok) continue;
    await p.waitForTimeout(3000); const r = await probe(); const row = [pg, r.busy, r.gaps, 'blank ' + r.med];
    for (const h of HOLD) { const i = h.indexOf('='), lb = h.slice(0, i), sel = h.slice(i + 1); await p.evaluate((css) => { let s = document.getElementById('__ab'); if (!s) { s = document.createElement('style'); s.id = '__ab'; document.head.appendChild(s); } s.textContent = css; }, sel.startsWith('css:') ? sel.slice(4) : sel + '{animation-play-state:paused!important}');
      await p.waitForTimeout(1200); const q = await probe(); row.push(lb + ' ' + q.busy); await p.evaluate(() => { const s = document.getElementById('__ab'); if (s) s.textContent = ''; }); await p.waitForTimeout(800); }
    if (process.env.PACEAB) { await p.evaluate(() => window.IngSealGC && IngSealGC.off()); await p.waitForTimeout(1500); const q = await probe(); row.push('seal as it was ' + q.busy); await p.evaluate(() => window.IngSealGC && IngSealGC.on()); await p.waitForTimeout(1500); const q2 = await probe(); row.push('rebuilt again ' + q2.busy); }
    console.log(row.join(' | ')); }
  await b.close(); })().catch((e) => { console.error(String(e).slice(0, 600)); process.exit(2); });
