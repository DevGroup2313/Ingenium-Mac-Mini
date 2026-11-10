// Blend as a movement in 3D (Ingenium 6.70, modules/r262.js). Her words (10 November 2026): "I want it to look 3D and refined like the
// other pages inside of Ingenium ... The engine logo looks bad inside of the design, it does not look built in, it looks placed on top
// badly"; "I want the 3D look kept and preserved and deepened. It is starting to look fake and cartoonish." On the preview: "I approve
// of this design, please push it everywhere and continue working on my requests."
//   - the part runs; Blend's own title, lede and rooms stand in the head; its own steps are raised labels with their numerals;
//   - the movement is rendered: a plate, Ingenium's wheel holding Ingenium's seal key in its collar (the seal's own coin edge, back and
//     sway left out, its layers on the dial, its star turning counterclockwise), each chosen model a wheel with its shadow, its
//     thickness, a turning face, a light that stays still while it turns, its hub and its mark; every model row wears a small wheel;
//   - choosing or leaving a model updates the movement and the roles; the movement sways, and pointing at a wheel brings it to rest
//     facing her, slows the wheels to a stop, lifts the wheel and names it; pressing it opens step I at its row;
//   - pointing at the seal tilts and lifts Ingenium's wheel; pressing it sinks the wheel, plays a flourish and winds the movement;
//   - the steps open their panels; a way leans and sinks; out of sight the sway waits; Ready-made hides the steps; left alone,
//     nothing on Blend is rewritten;
//     below 760 pixels Blend is as it was; by night it is rendered again in the night's light; with minimal motion it keeps still;
//     no page error.
//   node rig/t_670_blend.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_670_blend.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(400);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme();
    state.models = (state.models || []).filter(m => !/^t670-/.test(m.id));
    state.models.push({ id: 't670-a', name: 'Magister 9B', type: 'GGUF', paramB: 9, color: '#a65', ctx: 8192 }, { id: 't670-b', name: 'Scriba 4B', type: 'GGUF', paramB: 4, color: '#5a6', ctx: 8192 },
      { id: 't670-c', name: 'Velox 1B', type: 'GGUF', paramB: 1, color: '#56a', ctx: 8192 });
    const bl = blState(); bl.ids = ['t670-a', 't670-b']; bl.cx = []; bl.strategy = 'synth'; bl.writer = 'auto'; saveState();
    go('blend'); try { IngRooms.open('blend', 'new'); } catch (e) {} renderBlend(); }); await p.waitForTimeout(2200);
  const ang = el => `(() => { const m = new DOMMatrix(getComputedStyle(${el}).transform); return Math.atan2(m.b, m.a) * 180 / Math.PI; })()`;

  // 1. the head and the steps
  const s1 = await p.evaluate(() => { const pg = document.getElementById('page-blend'), w = pg.querySelector('.bx-words');
    return { part: window.__ingParts && window.__ingParts.p262, st: window.IngBlendLook && IngBlendLook.state(), on: pg.classList.contains('bx-on'),
      title: !!(w && w.querySelector(':scope > .page-title')), lede: !!(w && w.querySelector(':scope > .lede')), tabs: !!(w && w.querySelector('#rmTabs-blend')),
      nums: [...document.querySelectorAll('.bx-steps .rm-steps .rm-step .bx-num')].map(x => x.textContent).join(' '), titleFont: getComputedStyle(pg.querySelector('.bx-words > .page-title')).fontFamily }; });
  ok(s1.part === 'running' && s1.st && s1.st.on && s1.on, 'the new look runs on Blend', s1);
  ok(s1.title && s1.lede && s1.tabs, "Blend's own title, lede and rooms stand in the head", s1);
  ok(s1.nums === 'I II III IV', 'its own four steps are raised labels with their numerals', s1.nums);
  ok(/Home Cormorant|Cormorant/.test(s1.titleFont), "the title is in Ingenium's Cormorant", s1.titleFont);

  // 2. the movement, rendered
  const s2 = await p.evaluate(() => { const mv = document.querySelector('#page-blend .bx-move'), cw = mv.querySelector('.bx-cw'), k = cw && cw.querySelector('.bx-seat .r175-seal'), isl = k && k.querySelector('.isl');
    const ws = [...mv.querySelectorAll('.bx-w:not(.bx-cw):not(.bx-ghostw)')];
    const cs = (sel, pr) => getComputedStyle(k.querySelector(sel)).getPropertyValue(pr).trim();
    return { plate: !!mv.querySelector('.bx-plate canvas'), chaton: !!(cw && cw.querySelector('.bx-hub.bx-chaton canvas')), key: !!k, isl: !!isl, seal: !!(k && k.closest('[data-ing-seal="blend"]')),
      star: k && cs('.isl-star', '--fz'), heart: k && cs('.isl-heart', '--fz'), edge: k && getComputedStyle(k.querySelector('.isl-edge')).display, back: k && getComputedStyle(k.querySelector('.isl-back')).display,
      anim: k && getComputedStyle(k.querySelector('.seal-spin')).animationName,
      wheels: ws.map(w => ({ cast: !!w.querySelector('.bx-cast canvas'), rims: w.querySelectorAll('.bx-rim canvas').length, face: !!w.querySelector('.bx-face .bx-mask > canvas'),
        light: !!w.querySelector('.bx-face .bx-mask .bx-unturn canvas'), mask: /url\(/.test(getComputedStyle(w.querySelector('.bx-mask')).webkitMaskImage || getComputedStyle(w.querySelector('.bx-mask')).maskImage || ''),
        hub: !!w.querySelector('.bx-hub canvas'), mark: !!w.querySelector('.bx-mark svg path'), hit: !!w.querySelector('button.bx-hit') })),
      canvases: mv.querySelectorAll('canvas').length }; });
  ok(s2.plate && s2.chaton && s2.key && s2.isl && s2.seal, "the movement: a plate, and Ingenium's wheel holding Ingenium's seal key in its collar", s2);
  ok(+s2.star > .1 && +s2.heart > .2 && s2.edge === 'none' && s2.back === 'none', "the seal stands on the wheel's dial: its own coin edge and back left out, its layers apart", s2);
  ok(s2.wheels.length === 2 && s2.wheels.every(w => w.cast && w.rims === 3 && w.face && w.light && w.mask && w.hub && w.mark && w.hit), 'each model wheel is rendered: its shadow, its thickness, a turning face with the still light, its hub, its mark, a key', s2.wheels);
  const a0 = await p.evaluate(ang("document.querySelector('#page-blend .bx-seat .seal-spin')")); await p.waitForTimeout(700); const a1 = await p.evaluate(ang("document.querySelector('#page-blend .bx-seat .seal-spin')"));
  const d1 = ((a1 - a0 + 540) % 360) - 180;
  ok(s2.anim === 'bxEngine' && d1 < -3, 'its star turns counterclockwise without stopping, as on Home', { anim: s2.anim, d1 });
  const still = await p.evaluate(() => [...document.querySelectorAll('#page-blend .bx-mask')].map(m => { const a = e => { const x = new DOMMatrix(getComputedStyle(e).transform); return Math.atan2(x.b, x.a) * 180 / Math.PI; };
    let s = (a(m) + a(m.querySelector('.bx-unturn'))) % 360; if (s > 180) s -= 360; if (s < -180) s += 360; return Math.abs(s); }));
  const t0 = await p.evaluate(ang("document.querySelector('#page-blend .bx-w:not(.bx-cw) .bx-mask')")); await p.waitForTimeout(600); const t1 = await p.evaluate(ang("document.querySelector('#page-blend .bx-w:not(.bx-cw) .bx-mask')"));
  ok(still.length >= 3 && still.every(v => v < .01) && Math.abs(t1 - t0) > .3, 'the wheels turn while the light on them stays still', { still, t0, t1 });

  // 3. the chosen models, the rows
  const s3 = await p.evaluate(() => ({ st: IngBlendLook.state(), roles: [...document.querySelectorAll('#page-blend .bx-label:not(.bx-ghostl) .bx-role')].map(x => x.textContent),
    rows: document.querySelectorAll('#blendPick label.bl-model .bx-rw canvas').length, marks: document.querySelectorAll('#blendPick label.bl-model .bx-rw .bx-rmark svg').length,
    chosen: document.querySelectorAll('#blendPick label.bl-model.bx-chosen').length }));
  ok(s3.st.wheels === 2 && s3.st.names.join() === 'Magister 9B,Scriba 4B' && s3.st.turning && s3.st.swaying, 'the two chosen models turn with Ingenium\'s wheel, and the movement sways', s3.st);
  ok(s3.rows >= 3 && s3.marks === s3.rows && s3.chosen === 2, 'every model row wears its small wheel; the chosen ones stand raised', s3);
  ok(s3.roles.length === 2 && s3.roles.every(r => r.length > 2), 'each says what it does in this blend', s3.roles);
  await p.evaluate(() => { const bl = blState(); bl.ids = ['t670-a', 't670-b', 't670-c']; saveState(); renderBlend(); }); await p.waitForTimeout(600);
  const s4 = await p.evaluate(() => IngBlendLook.state());
  ok(s4.wheels === 3 && s4.names.includes('Velox 1B'), 'a model chosen joins the movement', s4);
  await p.evaluate(() => { const bl = blState(); bl.ids = ['t670-a', 't670-b']; saveState(); renderBlend(); }); await p.waitForTimeout(600);
  const s4b = await p.evaluate(() => IngBlendLook.state());
  ok(s4b.wheels === 2 && !s4b.names.includes('Velox 1B'), 'a model left leaves the movement', s4b);

  // 4. pointing at a wheel, pressing it
  const hb = await (await p.$('#page-blend .bx-w:not(.bx-cw):not(.bx-ghostw) .bx-hit')).boundingBox();
  await p.mouse.move(hb.x + hb.width * .62, hb.y + hb.height * .4); await p.waitForTimeout(1300);
  const s5 = await p.evaluate(() => { const w = document.querySelector('#page-blend .bx-w.bx-hov');
    return { st: IngBlendLook.state(), hold: document.querySelector('#page-blend .bx-head').classList.contains('bx-hold'), count: document.querySelector('#page-blend .bx-count').textContent,
      near: !!document.querySelector('#page-blend .bx-label.bx-near'), sway: getComputedStyle(document.querySelector('#page-blend .bx-sway')).transform, ry: w && w.style.getPropertyValue('--ry') }; });
  ok(s5.hold && !s5.st.turning && s5.st.held && s5.count.indexOf(s5.st.held) >= 0 && s5.near, 'pointing at a wheel slows the movement to a stop and names it', s5);
  ok(s5.sway === 'none' || /^matrix\(1, 0, 0, 1, 0, 0\)$/.test(s5.sway), 'the movement comes to rest facing her', s5.sway);
  ok(s5.ry != null && parseFloat(s5.ry) !== 0, 'under the mouse the wheel lifts and tilts, as the seal does', s5);
  await p.evaluate(() => document.querySelector('.rm-step[data-step="2"]').click()); await p.waitForTimeout(400);
  await p.mouse.click(hb.x + hb.width / 2, hb.y + hb.height / 2); await p.waitForTimeout(500);
  const s6 = await p.evaluate(() => ({ step: document.getElementById('page-blend').getAttribute('data-rm-step'), seen: !!document.querySelector('#blendPick .bl-model.bx-seen') }));
  ok(s6.step === '1' && s6.seen, 'pressing it opens step I at its row', s6);
  await p.mouse.move(5, 890); await p.waitForTimeout(1500);
  const s6b = await p.evaluate(() => IngBlendLook.state());
  ok(s6b.turning && s6b.swaying && !s6b.held, 'left, the movement turns and sways again', s6b);

  // 5. the seal at the hub (pressing a wheel scrolled the page to step I: the head is brought back into view first)
  await p.evaluate(() => { const h = document.querySelector('#page-blend .bx-head'); h.scrollIntoView({ block: 'start' }); }); await p.waitForTimeout(800);
  const kb = await (await p.$('#page-blend .bx-seat .r175-seal')).boundingBox();
  await p.mouse.move(kb.x + kb.width * .7, kb.y + kb.height * .3); await p.waitForTimeout(500);
  const hovE = await p.evaluate(() => { const c = document.querySelector('#page-blend .bx-cw'); return { hov: c.classList.contains('bx-hov'), ry: c.style.getPropertyValue('--ry'), sway: getComputedStyle(document.querySelector('#page-blend .bx-sway')).transform }; });
  await p.mouse.down(); await p.waitForTimeout(120); const downE = await p.evaluate(() => document.querySelector('#page-blend .bx-cw').classList.contains('bx-dn'));
  await p.mouse.up(); await p.waitForTimeout(200); const fl = await p.evaluate(() => IngBlendLook.state());
  ok(hovE.hov && parseFloat(hovE.ry) !== 0 && downE, "pointing at the seal tilts and lifts Ingenium's wheel; pressed, the wheel sinks", { hovE, downE });
  ok(!!fl.flourish && fl.rate > 1.2, 'pressed, the seal plays a flourish and winds the movement', fl);
  await p.mouse.move(5, 890); await p.waitForTimeout(2500);

  // 6. the steps, the ways and the leaning cards
  await p.evaluate(() => document.querySelector('.bx-steps .rm-step[data-step="2"]').click()); await p.waitForTimeout(500);
  const s7 = await p.evaluate(() => ({ step: document.getElementById('page-blend').getAttribute('data-rm-step'), cur: document.querySelector('.bx-steps .rm-step[aria-current="step"]').getAttribute('data-step'),
    bg: getComputedStyle(document.querySelector('.bx-steps .rm-step[aria-current="step"]')).backgroundImage.slice(0, 60) }));
  ok(s7.step === '2' && s7.cur === '2' && /gradient/.test(s7.bg), "a step label opens its step, which stands in Ingenium's violet", s7);
  const wb = await (await p.$('#blendStrats .blend-strat:not(.on)')).boundingBox();
  await p.mouse.move(wb.x + wb.width * .8, wb.y + wb.height * .3); await p.waitForTimeout(400);
  const s8 = await p.evaluate(() => { const w = document.querySelector('#blendStrats .blend-strat.bx-ph'); return w ? { lx: w.style.getPropertyValue('--lx'), tf: getComputedStyle(w).transform } : null; });
  ok(s8 && parseFloat(s8.lx) !== 0 && s8.tf !== 'none', 'a way leans toward the pointer and lifts', s8);
  await p.mouse.down(); await p.waitForTimeout(100); const pd = await p.evaluate(() => !!document.querySelector('#blendStrats .blend-strat.bx-pd')); await p.mouse.up(); await p.waitForTimeout(400);
  const s9 = await p.evaluate(() => ({ strat: blState().strategy, roles: [...document.querySelectorAll('#page-blend .bx-label .bx-role')].map(x => x.textContent) }));
  ok(pd && s9.strat !== 'synth', 'pressed, it sinks, and the way is chosen as before', { pd, s9 });

  // 7. out of sight, the sway waits (so another page asks nothing of the browser for it)
  await p.evaluate(() => go('guide')); await p.waitForTimeout(800);
  const away = await p.evaluate(() => IngBlendLook.state());
  await p.evaluate(() => { go('blend'); try { IngRooms.open('blend', 'new'); } catch (e) {} }); await p.waitForTimeout(500);
  await p.evaluate(() => document.querySelector('#page-blend .bx-head').scrollIntoView({ block: 'start' })); await p.waitForTimeout(900);
  const back = await p.evaluate(() => IngBlendLook.state());
  ok(!away.swaying && away.inView === false && back.swaying && back.inView, 'out of sight the sway waits; back on Blend it sways again', { away, back });

  // 8. Ready-made, stillness, the narrow page, the night, minimal motion
  await p.evaluate(() => { const t = document.getElementById('rmT-blend-ready'); if (t) t.click(); }); await p.waitForTimeout(600);
  const s10 = await p.evaluate(() => ({ steps: getComputedStyle(document.querySelector('#page-blend .bx-steps')).display, cards: [...document.querySelectorAll('.bl-presets .bl-preset')].filter(c => c.offsetParent).length }));
  ok(s10.steps === 'none' && s10.cards >= 1, 'Ready-made shows its cards, without the steps', s10);
  await p.evaluate(() => { const t = document.getElementById('rmT-blend-new'); if (t) t.click(); }); await p.mouse.move(5, 890); await p.waitForTimeout(1500);
  const quiet = await p.evaluate(() => new Promise(res => { let n = 0; const seen = {}; const mo = new MutationObserver(l => l.forEach(m => { n++; const k = m.type + ' ' + (m.attributeName || '') + ' ' + (m.target.id || m.target.className || m.target.nodeName); seen[k] = (seen[k] || 0) + 1; }));
    mo.observe(document.getElementById('page-blend'), { attributes: true, childList: true, subtree: true, characterData: true }); setTimeout(() => { mo.disconnect(); res({ n, seen }); }, 2500); }));
  ok(quiet.n === 0, 'left alone, nothing on Blend is rewritten', quiet);
  await p.screenshot({ path: path.join(OUT, 'blend_day.png') });
  await p.setViewportSize({ width: 1000, height: 900 }); await p.waitForTimeout(1500);
  const s11 = await p.evaluate(() => { const pg = document.getElementById('page-blend'); return { on: pg.classList.contains('bx-on'), title: !!pg.querySelector(':scope > .page-title'),
    steps: !!pg.querySelector('.bl-setup > .rm-steps'), head: !!pg.querySelector('.bx-head') }; });
  ok(!s11.on && s11.title && s11.steps && !s11.head, 'below 760 pixels Blend is as it was', s11);
  await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(1500);
  ok(await p.evaluate(() => IngBlendLook.state().on && IngBlendLook.state().wheels === 2), 'wide again, the new look comes back with its models');
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(1200);
  const s12 = await p.evaluate(() => ({ bg: getComputedStyle(document.querySelector('#page-blend .bx-head')).backgroundImage.slice(0, 70), st: IngBlendLook.state(),
    rows: [...document.querySelectorAll('#blendPick .bx-rw')].map(r => r.getAttribute('data-bx')).join('') }));
  ok(/36, 26, 55|241a37/.test(s12.bg) && s12.st.night && s12.st.wheels === 2 && /^n+$/.test(s12.rows), 'by night Blend wears the night desk, and the movement and the rows are rendered again in its light', s12);
  await p.screenshot({ path: path.join(OUT, 'blend_night.png') });
  await p.evaluate(() => { document.body.setAttribute('data-motion', 'minimal'); }); await p.waitForTimeout(900);
  const s13 = await p.evaluate(() => ({ st: IngBlendLook.state(), seal: getComputedStyle(document.querySelector('#page-blend .bx-seat .seal-spin')).animationName }));
  ok(!s13.st.turning && !s13.st.swaying && s13.seal === 'none', 'with minimal motion the movement keeps still', s13);
  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
