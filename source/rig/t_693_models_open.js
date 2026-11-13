// node rig/t_693_models_open.js <Ingenium page url> <out dir>
// Ingenium 6.93 (12 November 2026). Her words: "the Models page always reverts back to its previosu design everytime I open the page".
// Measured on 6.92: the turret (modules/r269.js) was built only when the page was first shown, a frame after its width changed, so the
// page's former head was painted first. Checks, at 1440 and on a phone (390): the turret is built before the page is first opened; in the
// very frame the page opens, and in every frame after, the turret stands and the former head does not show; so on every later opening;
// after a reload too. No errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 700) : '')); } }
const frames = (p, from) => p.evaluate((from) => new Promise(res => { go(from); setTimeout(() => {
    const pg = document.getElementById('page-models'), rec = [];
    const snap = () => { const h = pg.querySelector('.tr-head'), t = pg.querySelector(':scope > .page-title');
      rec.push({ on: pg.classList.contains('tr-on'), head: !!(h && getComputedStyle(h).display !== 'none' && h.getBoundingClientRect().height > 100), old: !!(t && t.offsetParent) }); };
    go('models'); snap(); let n = 0; const f = () => { snap(); if (++n < 6) requestAnimationFrame(f); else res(rec); }; requestAnimationFrame(f);
  }, 300); }), from);
(async () => {
  const b = await pw.chromium.launch();
  for (const [vw, vh] of [[1440, 900], [390, 844]]) {
    const tag = vw === 1440 ? 'computer' : 'phone';
    const ctx = await b.newContext({ viewport: { width: vw, height: vh } }); const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('home'); });
    await p.waitForTimeout(400);
    const early = await p.evaluate(() => { const pg = document.getElementById('page-models'); return { active: pg.classList.contains('active'), on: pg.classList.contains('tr-on'), head: !!pg.querySelector('.tr-head') }; });
    ok(!early.active && early.on && early.head, tag + ': the turret is built before the page is first opened', early);
    const runs = []; for (const from of ['home', 'chat', 'settings', 'blend']) runs.push({ from, rec: await frames(p, from) });
    ok(runs[0].rec.every(r => r.on && r.head && !r.old), tag + ': the first opening shows the turret in its very first frame and in every frame after, never the former head', runs[0]);
    ok(runs.slice(1).every(x => x.rec.every(r => r.on && r.head && !r.old)), tag + ': so does every later opening', runs.slice(1).map(x => x.from + ':' + x.rec.map(r => r.on && r.head && !r.old ? 'T' : 'F').join('')));
    await p.screenshot({ path: OUT + '/models_open_' + tag + '.png' });
    await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
    const again = await frames(p, 'home');
    ok(again.every(r => r.on && r.head && !r.old), tag + ': after a reload, the same', again);
    ok(errs.length === 0, tag + ': no errors on the page', errs);
    await ctx.close();
  }
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
