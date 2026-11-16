// node rig/t_717_seal_cmp.js <page url> webkit|chromium <out dir>, then python3 rig/t_717_seal_cmp.py <out dir> webkit|chromium
// the top bar's seal, rebuilt (r306) against as it was (r306 let go), at the same moments of its motion: every animation in it held at
// the same time, then photographed at twice the pixels; day and night
const pw = require('/opt/node-tools/node_modules/playwright');
const [U, eng, OUT] = process.argv.slice(2);
const TS = [700, 1900, 3100, 4400, 5600, 7300, 9100, 11600];
(async () => { const b = await pw[eng].launch(); const p = await (await b.newContext({ viewport: { width: 900, height: 500 }, deviceScaleFactor: 2 })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 160)));
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(2500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('chat'); });
  await p.mouse.move(600, 400); await p.waitForTimeout(2500);
  console.log('state', JSON.stringify(await p.evaluate(() => window.IngSealGC && IngSealGC.state())));
  const box = await p.evaluate(() => { const r = document.querySelector('#brandSealBtn .isl').getBoundingClientRect(); return { x: r.left - 5, y: r.top - 4, width: r.width + 10, height: r.height + 10 }; });
  const hold = (T) => p.evaluate((T) => { const w = document.querySelector('#brandSealBtn .isl'); w.getAnimations({ subtree: true }).forEach((a) => { if (a.__gcSrc) return; try { a.pause(); a.currentTime = T; } catch (e) {} }); }, T);
  for (const th of ['day', 'night']) {
    await p.evaluate((th) => { state.theme = th; applyTheme(); }, th); await p.waitForTimeout(800);
    for (const mode of ['gc', 'orig']) {
      if (mode === 'orig') { await p.evaluate(() => IngSealGC.off()); await p.waitForTimeout(300); } else { await p.evaluate(() => IngSealGC.on()); await p.waitForTimeout(600); }
      for (const T of TS) { await hold(T); await p.waitForTimeout(250); await p.screenshot({ path: `${OUT}/${eng}_${th}_${mode}_${T}.png`, clip: box }); } } }
  console.log('errors', errs.length, errs.slice(0, 2).join(' | ')); await b.close(); })().catch((e) => { console.error(String(e).slice(0, 600)); process.exit(2); });
