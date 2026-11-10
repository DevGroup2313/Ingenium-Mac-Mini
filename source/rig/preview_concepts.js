// each concept: by day and by night (pictures), and a video by day: it opens, the pointer visits the rooms, the seal key is pressed
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, DIR, OUT, NAMES, KEYSEL] = process.argv.slice(2);
async function open(b, opts, th, js) {
  const ctx = await b.newContext(opts); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(600);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(300);
  await p.evaluate((th) => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = th; applyTheme(); go('home'); }, th);
  await p.waitForTimeout(1500);
  await p.evaluate(() => { try { const c = document.getElementById('hxPlaque'); if (c) c.scrollIntoView(); window.scrollTo(0, 0); } catch (e) {} });
  await p.waitForTimeout(700);
  await p.addScriptTag({ content: js }); await p.waitForTimeout(300); return { ctx, p, errs };
}
(async () => {
  const b = await pw.chromium.launch(); fs.mkdirSync(OUT, { recursive: true });
  for (const name of NAMES.split(',')) {
    const js = fs.readFileSync(path.join(DIR, name + '.js'), 'utf8');
    for (const th of ['day', 'night']) {
      const { ctx, p, errs } = await open(b, { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }, th, js);
      await p.waitForTimeout(2200); await p.evaluate(() => window.scrollTo(0, 0));
      await p.screenshot({ path: path.join(OUT, 'home_' + name + '_' + th + '.png') });
      if (th === 'day') {
        const k = await p.$(KEYSEL); if (k) { const bb = await k.boundingBox(); if (bb) { await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2, { steps: 8 }); await p.waitForTimeout(900); await p.screenshot({ path: path.join(OUT, 'home_' + name + '_day_pointed.png') }); } }
      }
      if (errs.length) console.log(name, th, 'errors', errs.slice(0, 3));
      await ctx.close();
    }
    const vdir = path.join(OUT, 'v_' + name); fs.mkdirSync(vdir, { recursive: true });
    const { ctx, p } = await open(b, { viewport: { width: 1440, height: 900 }, recordVideo: { dir: vdir, size: { width: 1440, height: 900 } } }, 'day', js);
    await p.waitForTimeout(2600);
    const keys = await p.$$(KEYSEL);
    for (const k of keys.slice(0, 6)) { const bb = await k.boundingBox(); if (!bb) continue; await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2, { steps: 14 }); await p.waitForTimeout(900); }
    await p.mouse.move(720, 500, { steps: 10 }); await p.waitForTimeout(1200);
    if (name.indexOf('orrery') === 0) { await p.mouse.move(560, 640, { steps: 6 }); await p.mouse.down(); await p.mouse.move(980, 640, { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(3200); }
    const seal = await p.$('#hxSealKey'); if (seal) { const bb = await seal.boundingBox(); if (bb) { await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2, { steps: 10 }); await p.waitForTimeout(300); await p.mouse.down(); await p.mouse.up(); await p.waitForTimeout(2200); } }
    const v = p.video(); await ctx.close(); const vp = await v.path();
    fs.copyFileSync(vp, path.join(OUT, 'home_' + name + '.webm')); console.log('made', name);
  }
  await b.close();
})();
