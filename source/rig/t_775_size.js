// Ingenium 7.75 (24 November 2026): Ingenium fills a large screen. The Mac app's window zooms its page as a browser does
// (desktop/app_zoom_775.py, display_zoom), and Display gains a Size row (modules/r368.js): Auto, 100%, 110%, 125%, 150%.
// Her words: "I have a 34-inch Dell Desktop screen for the Mac mini, so it looks really tiny and weird on the screen, shrunken like that.
// I want you to fix that and compensate for the larger desk screen of the Mac mini".
//   node rig/t_775_size.js <Ingenium page url> <out folder>
// The window's zoom itself is the Mac's (WKWebView's pageZoom) and cannot run here: the desk's bridge is played by a stand-in that
// answers as app_zoom_775.py does, and its zoom is shown by narrowing the window as the Mac's zoom does (a page zoomed by z is laid out
// for a window z times narrower).
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
// the stand-in bridge: an engine that is not running, and the window's zoom as app_zoom_775.py answers (or as Windows answers: ok false)
const BRIDGE = (mode) => { const z = { now: 1, calls: [] }; window.__zoom = z;
  const api = { engine_info: () => Promise.resolve({ available: false }), engine_status: () => Promise.resolve({ running: false }), engine_load: () => Promise.resolve({ ok: false }) };
  if (mode === 'mac') api.display_zoom = f => { z.calls.push(f === undefined ? null : f); if (f === undefined || f === null) return Promise.resolve({ ok: true, zoom: z.now }); z.now = Math.max(0.8, Math.min(2, +f)); return Promise.resolve({ ok: true, zoom: z.now }); };
  if (mode === 'win') api.display_zoom = () => Promise.resolve({ ok: false, why: 'This app zooms with the keyboard here: Control and plus, Control and minus.' });
  window.pywebview = { api }; window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50)); };
async function open(b, w, h, mode, pref) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  await ctx.addInitScript(BRIDGE, mode); await ctx.addInitScript(p => { try { if (p) localStorage.setItem('ing.size.v1', p); else localStorage.removeItem('ing.size.v1'); } catch (e) {} }, pref || null);
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(1500); return { ctx, p, errs };
}
const ROW = () => { const r = document.getElementById('dpSize'); return r && { keys: [...r.querySelectorAll('.seg-btn')].map(b => b.textContent + (b.classList.contains('on') ? '*' : '')), label: r.closest('.dp-row').querySelector('.dp-label').textContent, afterWidth: (() => { const w = document.getElementById('dpWidth'); return !!(w && w.closest('.dp-row').nextElementSibling === r.closest('.dp-row')); })() }; };
(async () => {
  const b = await pw.chromium.launch();
  // 1. the Mac mini on her 34-inch screen (3,440 by 1,440): Auto zooms to 150%, and the row says so
  { const { ctx, p, errs } = await open(b, 3440, 1440, 'mac');
    const z = await p.evaluate(() => ({ calls: window.__zoom.calls, now: window.__zoom.now, attr: document.documentElement.getAttribute('data-zoom') }));
    ok(z.now === 1.5 && z.calls.includes(1.5) && z.attr === '1.5', 'on a window 3,440 pixels wide, Auto asks the window for 150%', z);
    const row = await p.evaluate(ROW);
    ok(row && row.label === 'Size' && row.keys.join() === 'Auto (150%)*,100%,110%,125%,150%' && row.afterWidth, 'Display has a Size row beside Width: Auto (150%), 100%, 110%, 125%, 150%', row);
    // as the Mac's zoom lays the page out: for a window 1.5 times narrower; Auto then stays at 150% (it reckons with the zoom already set)
    await p.setViewportSize({ width: Math.round(3440 / 1.5), height: Math.round(1440 / 1.5) }); await sleep(1200);
    const z2 = await p.evaluate(() => ({ now: window.__zoom.now, auto: IngSize.auto(), last: window.__zoom.calls.slice(-1)[0] }));
    ok(z2.now === 1.5 && z2.auto === 1.5, 'once zoomed, Auto keeps 150% (it does not zoom again and again)', z2);
    await p.screenshot({ path: OUT + '/1_large_150.png' });
    // 2. her own choice, 125%: asked of the window, kept on this device, and Auto no longer follows the window
    await p.evaluate(() => document.querySelector('#dpSize [data-v="1.25"]').click()); await sleep(500);
    const c = await p.evaluate(() => ({ now: window.__zoom.now, kept: localStorage.getItem('ing.size.v1'), row: (document.querySelector('#dpSize .seg-btn.on') || {}).textContent }));
    ok(c.now === 1.25 && c.kept === '1.25' && c.row === '125%', 'choosing 125% zooms the window to 125% and is kept on this device', c);
    const n0 = await p.evaluate(() => window.__zoom.calls.length); await p.setViewportSize({ width: 1400, height: 900 }); await sleep(1200);
    const n1 = await p.evaluate(() => ({ n: window.__zoom.calls.length, now: window.__zoom.now }));
    ok(n1.n === n0 && n1.now === 1.25, 'with a size chosen, resizing the window leaves it as she chose', { n0, n1 });
    // 3. back to Auto: it reckons with the window's real width (1,400 pixels seen at 125% is a window 1,750 wide): 110%
    await p.evaluate(() => document.querySelector('#dpSize [data-v="auto"]').click()); await sleep(500);
    const a = await p.evaluate(() => ({ now: window.__zoom.now, kept: localStorage.getItem('ing.size.v1'), label: document.querySelector('#dpSize [data-v="auto"]').textContent }));
    ok(a.now === 1.1 && a.kept === 'auto' && a.label === 'Auto (110%)', 'back to Auto, the size follows the window\'s real width (1,750 pixels: 110%)', a);
    ok(errs.length === 0, 'no page errors (Mac, large screen)', errs); await ctx.close(); }
  // 4. a laptop's window (1,440 wide): Auto leaves the page as it is, with no call to zoom
  { const { ctx, p, errs } = await open(b, 1440, 900, 'mac');
    const z = await p.evaluate(() => ({ sets: window.__zoom.calls.filter(x => x !== null), now: window.__zoom.now, row: !!document.getElementById('dpSize') }));
    ok(z.sets.length === 0 && z.now === 1 && z.row, 'on a laptop-sized window Auto keeps 100% and asks for no zoom; the row is there to choose', z);
    ok(errs.length === 0, 'no page errors (Mac, laptop)', errs); await ctx.close(); }
  // 5. a size chosen before is used when Ingenium opens again
  { const { ctx, p } = await open(b, 1440, 900, 'mac', '1.1');
    const z = await p.evaluate(() => ({ now: window.__zoom.now, on: (document.querySelector('#dpSize .seg-btn.on') || {}).textContent }));
    ok(z.now === 1.1 && z.on === '110%', 'a size chosen before (110%) is set again when Ingenium opens', z); await ctx.close(); }
  // 6. where the window cannot zoom (Windows answers ok false; a browser has no bridge): no Size row, nothing changed
  for (const mode of ['win', 'none']) { const { ctx, p, errs } = await open(b, 3440, 1440, mode);
    const r = await p.evaluate(() => ({ row: !!document.getElementById('dpSize'), zoom: document.documentElement.getAttribute('data-zoom') }));
    ok(!r.row && r.zoom === null, (mode === 'win' ? 'on Windows' : 'in a browser') + ' the Size row is not shown and nothing is zoomed', r);
    ok(errs.length === 0, 'no page errors (' + mode + ')', errs); await ctx.close(); }
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
