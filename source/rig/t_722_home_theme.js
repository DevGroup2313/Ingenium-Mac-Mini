// Ingenium 7.22. Her words (16 November 2026): "The home page's 3D header card and its "Your next step" card keep on resizing and lifitng slight
// higher on the page"; and, on the Fire tablet, the theme "does not happen all at once like it is supposed to". Home, left and come back to: its
// header keeps one height from the first frame (7.21: 408 px, then 700) and the page does not slide (7.21: up 6 px as it came in). The theme:
// on the frame after the switch is pressed, every sampled part already wears its new colours (7.21: 860 parts eased theirs, each in turn).
//   node rig/t_722_home_theme.js <page url> [width height scale]
const pw = require('/opt/node-tools/node_modules/playwright');
const [U, Wd = '1440', Ht = '900', Sc = '2'] = process.argv.slice(2);
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
(async () => { const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: +Wd, height: +Ht }, deviceScaleFactor: +Sc });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme(); go('home'); });
  await p.waitForTimeout(4000);
  for (let round = 1; round <= 2; round++) {
    const r = await p.evaluate(async () => { go('chat'); await new Promise(r => setTimeout(r, 2600)); go('home'); const seen = { head: [], top: [] };
      for (let i = 0; i < 16; i++) { const hx = document.getElementById('hx'), h = hx && hx.querySelector('.hx-head'); if (h) { const hh = Math.round(h.getBoundingClientRect().height), tt = Math.round(hx.getBoundingClientRect().top); if (seen.head[seen.head.length - 1] !== hh) seen.head.push(hh); if (seen.top[seen.top.length - 1] !== tt) seen.top.push(tt); } await new Promise(r => requestAnimationFrame(() => setTimeout(r, 60))); }
      return seen; });
    ok(r.head.length === 1, `Home, come back to (${round}): its header keeps one height from the first frame`, r.head);
    ok(r.top.length === 1, `Home, come back to (${round}): the page does not slide as it comes in`, r.top);
  }
  for (const to of ['night', 'day']) {
    const r = await p.evaluate(async (to) => { const els = [...document.querySelectorAll('#page-home button, .nav-btn, .rail-btn, .card, .topbar button')].filter(e => e.offsetParent).slice(0, 60);
      const look = () => els.map(e => { const s = getComputedStyle(e); return s.backgroundColor + '|' + s.color + '|' + s.borderTopColor; });
      document.getElementById('fabTheme').click(); await new Promise(r => requestAnimationFrame(() => r())); const first = look(); await new Promise(r => setTimeout(r, 1500)); const last = look();
      const diff = first.map((v, i) => v === last[i] ? null : (els[i].id || String(els[i].className).slice(0, 30)) + ': ' + v + ' -> ' + last[i]).filter(Boolean);
      return { theme: document.body.getAttribute('data-theme'), n: els.length, diff, swapLeft: document.documentElement.classList.contains('ing-swap') }; }, to);
    ok(r.theme === to && r.n > 20 && r.diff.length === 0 && !r.swapLeft, `the theme turned to ${to} at once: on the next frame ${r.n} parts already wore their new colours`, r.diff.slice(0, 5));
  }
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0); })().catch((e) => { console.error(String(e).slice(0, 500)); process.exit(2); });
