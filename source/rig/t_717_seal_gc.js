// node rig/t_717_seal_gc.js <page url> webkit|chromium   (WebKit: a Playwright WebKit build, PLAYWRIGHT_BROWSERS_PATH pointing at it)
// r306 at work: applied in WebKit and not in Chromium; moving; still under minimal motion and reduced motion, moving again after; the
// shadows by day and by night; no page errors
const pw = require('/opt/node-tools/node_modules/playwright');
const [U, eng] = process.argv.slice(2); let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else fail++; console.log((c ? 'ok   ' : 'FAIL ') + m); };
(async () => { const b = await pw[eng].launch(); const ctx = await b.newContext({ viewport: { width: 1200, height: 800 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 160)));
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(3000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('chat'); });
  await p.waitForTimeout(2000);
  const st = () => p.evaluate(() => window.IngSealGC ? IngSealGC.state() : null);
  const host = () => p.evaluate(() => { const g = (s) => { const e = document.querySelector(s); return e ? getComputedStyle(e).rotate + '|' + getComputedStyle(e).scale + '|' + getComputedStyle(e).opacity : null; };
    return [g('#brandSealBtn .isl-ring > svg'), g('#brandSealBtn .isl-star > svg'), g('#brandSealBtn .isl-heart > svg'), g('#brandSealBtn .isl-back > svg.isl-gc')]; });
  if (eng === 'chromium') { ok(!(await st()) || !(await st()).applied, 'Chromium: the seal is as it was (r306 not applied): ' + JSON.stringify(await st()));
    ok(await p.evaluate(() => document.querySelectorAll('#brandSealBtn .isl-gc').length === 0), 'Chromium: no added layers'); }
  else {
    let s = await st(); ok(s && s.applied && s.ring.moving === 1 && s.star.moving === 4 && s.heart.moving === 1 && s.glow.moving === 1, 'WebKit: applied, four parts carried (star with its three shadows): ' + JSON.stringify(s));
    /* the engine rests at each full turn for about a tenth of its cycle (sealEngine 88% to 100%): two seconds apart */ const h1 = await host(); await p.waitForTimeout(2000); const h2 = await host(); ok(h1[0] !== h2[0] && h1[1] !== h2[1], 'WebKit: ring and engine turn (' + h1[1] + ' -> ' + h2[1] + ')');
    ok(await p.evaluate(() => document.querySelectorAll('#brandSealBtn .isl-star > svg.isl-gc-sh').length === 3 && document.querySelectorAll('#brandSealBtn .isl-back > svg.isl-gc').length === 1), 'WebKit: three shadow layers and one glow layer');
    ok(await p.evaluate(() => { const v = document.querySelector('#brandSealBtn .isl-back > svg:not(.isl-gc) .s4-breath'); return v && getComputedStyle(v).visibility === 'hidden'; }), 'WebKit: the old glow hidden under the new');
    const floods = () => p.evaluate(() => [...document.querySelectorAll('#brandSealBtn .isl-gc-sh feFlood[flood-color]')].map((f) => f.getAttribute('flood-color')).join(' / '));
    await p.evaluate(() => { state.theme = 'day'; applyTheme(); }); await p.waitForTimeout(400); const sd = await floods();
    await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(400); const sn = await floods();
    ok(/42, 20, 80/.test(sd) && !/0, 0, 0\b/.test(sd) && /0, 0, 0/.test(sn) && !/42, 20, 80/.test(sn), 'WebKit: the shadows drawn again with the theme, from the seal\'s own style (day ' + sd + '; night ' + sn + ')');
    const was = await p.evaluate(() => document.body.getAttribute('data-motion'));
    await p.evaluate(() => document.body.setAttribute('data-motion', 'minimal')); await p.waitForTimeout(800); s = await st();
    ok(s.ring.moving === 0 && s.star.moving === 0 && s.heart.moving === 0, 'WebKit: minimal motion stills the parts: ' + JSON.stringify(s));
    const m1 = await host(); await p.waitForTimeout(500); const m2 = await host(); ok(JSON.stringify(m1) === JSON.stringify(m2), 'WebKit: and nothing moves');
    await p.evaluate((w) => { if (w == null) document.body.removeAttribute('data-motion'); else document.body.setAttribute('data-motion', w); }, was); await p.waitForTimeout(800); s = await st();
    ok(s.ring.moving === 1 && s.star.moving === 4, 'WebKit: motion back, parts carried again');
    await p.emulateMedia({ reducedMotion: 'reduce' }); await p.waitForTimeout(800); s = await st(); ok(s.star.moving === 0 && s.ring.moving === 0, 'WebKit: reduced motion stills them: ' + JSON.stringify(s));
    await p.emulateMedia({ reducedMotion: 'no-preference' }); await p.waitForTimeout(800); s = await st(); ok(s.star.moving === 4, 'WebKit: and lets them go again');
    await p.mouse.move(30, 20); await p.waitForTimeout(500); const v1 = await host(); await p.waitForTimeout(500); const v2 = await host(); ok(v1[1] !== v2[1], 'WebKit: under the pointer the engine still turns, as before');
    await p.evaluate(() => go('settings')); await p.waitForTimeout(1500); s = await st(); ok(s.applied && s.star.moving === 4, 'WebKit: on another page, still carried');
  }
  ok(errs.filter((e) => !/sandboxed/.test(e)).length === 0, 'no page errors (' + errs.filter((e) => !/sandboxed/.test(e)).slice(0, 2).join(' | ') + ')');
  console.log(pass + '/' + (pass + fail)); await b.close(); })().catch((e) => { console.error(String(e).slice(0, 600)); process.exit(2); });
