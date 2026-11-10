// Blend in Home's language (Ingenium 6.68, modules/r262.js). Her words (10 November 2026): "I like the Blend redesign but I want
// everything made clickable and popped out animated. I want you to match the Home page and have the Ingenium engine be animated and a
// clickable button, the same for Scriba and Magister's buttons. I want you give them the same effect as the orbs from the Home page.
// I also want them to be redesigned a bit to better fit the app and its visuals." Then: "I approve of the design please push it
// everywhere."
//   - the part runs; Blend's own title, lede and rooms stand in the head; its own steps are coins under it;
//   - the engine is Ingenium's seal key, in deeper layers with a rim, its star turning counterclockwise; it tilts, sinks and plays a
//     flourish when pressed;
//   - the chosen models ride the engine as keys made as Home's orbs are (the ball, its own mark above it, its sway); places wait while
//     fewer than two are chosen; choosing a model or a way updates the orbit and the roles;
//   - pointing at a model stops the orbit and names it; pressing it opens step I at its row;
//   - the rows, the ways and the answers lean, lift and sink; the coins open their steps; every Blend control still works;
//   - Ready-made hides the steps; left alone, nothing on Blend is rewritten; below 760 pixels Blend is as it was; no page error.
//   node rig/t_668_blend.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_668_blend.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(400);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme();
    state.models = (state.models || []).filter(m => !/^t668-/.test(m.id));
    state.models.push({ id: 't668-a', name: 'Magister 9B', type: 'GGUF', paramB: 9, color: '#a65', ctx: 8192 }, { id: 't668-b', name: 'Scriba 4B', type: 'GGUF', paramB: 4, color: '#5a6', ctx: 8192 },
      { id: 't668-c', name: 'Velox 1B', type: 'GGUF', paramB: 1, color: '#56a', ctx: 8192 });
    const bl = blState(); bl.ids = ['t668-a', 't668-b']; bl.cx = []; bl.strategy = 'synth'; bl.writer = 'auto'; saveState();
    go('blend'); try { IngRooms.open('blend', 'new'); } catch (e) {} renderBlend(); }); await p.waitForTimeout(1800);

  // 1. the head and the steps
  const s1 = await p.evaluate(() => { const pg = document.getElementById('page-blend'), w = pg.querySelector('.bx-words');
    return { part: window.__ingParts && window.__ingParts.p262, st: window.IngBlendLook && IngBlendLook.state(), on: pg.classList.contains('bx-on'),
      title: !!(w && w.querySelector(':scope > .page-title')), lede: !!(w && w.querySelector(':scope > .lede')), tabs: !!(w && w.querySelector('#rmTabs-blend')),
      coins: document.querySelectorAll('.bx-steps .rm-steps .rm-step .bxc').length, titleFont: getComputedStyle(pg.querySelector('.bx-words > .page-title')).fontFamily }; });
  ok(s1.part === 'running' && s1.st && s1.st.on && s1.on, 'the new look runs on Blend', s1);
  ok(s1.title && s1.lede && s1.tabs, "Blend's own title, lede and rooms stand in the head", s1);
  ok(s1.coins === 4, 'its own four steps are coins', s1);
  ok(/Home Cormorant|Cormorant/.test(s1.titleFont), "the title is in Ingenium's Cormorant", s1.titleFont);

  // 2. the engine
  const s2 = await p.evaluate(() => { const k = document.querySelector('#page-blend .bx-sun .r175-seal'), isl = k && k.querySelector('.isl');
    const cs = (sel, pr) => getComputedStyle(k.querySelector(sel)).getPropertyValue(pr).trim();
    return { key: !!k, isl: !!isl, rims: k ? k.querySelectorAll('.bx-rim').length : 0, star: k && cs('.isl-star', '--fz'), heart: k && cs('.isl-heart', '--fz'),
      anim: k && getComputedStyle(k.querySelector('.seal-spin')).animationName, seal: !!(k && k.closest('[data-ing-seal]')) }; });
  ok(s2.key && s2.isl && s2.rims === 4 && +s2.star > .11 && +s2.heart > .25 && s2.seal, "the engine is Ingenium's seal key, in deeper layers with a rim", s2);
  const ang = () => p.evaluate(() => { const m = new DOMMatrix(getComputedStyle(document.querySelector('#page-blend .bx-sun .seal-spin')).transform); return Math.atan2(m.b, m.a) * 180 / Math.PI; });
  const a0 = await ang(); await p.waitForTimeout(700); const a1 = await ang(); const d1 = ((a1 - a0 + 540) % 360) - 180;
  ok(s2.anim === 'bxEngine' && d1 < -3, 'its star turns counterclockwise without stopping', { anim: s2.anim, d1 });
  const kb = await (await p.$('#page-blend .bx-sun .r175-seal')).boundingBox();
  await p.mouse.move(kb.x + kb.width * .7, kb.y + kb.height * .3); await p.waitForTimeout(400);
  const hovE = await p.evaluate(() => { const i = document.querySelector('#page-blend .bx-sun .isl'); return { hover: i.classList.contains('hover'), ry: i.style.getPropertyValue('--ry') }; });
  await p.mouse.down(); await p.waitForTimeout(120); const downE = await p.evaluate(() => document.querySelector('#page-blend .bx-sun .isl').classList.contains('down'));
  await p.mouse.up(); await p.waitForTimeout(150); const fl = await p.evaluate(() => IngBlendLook.state().flourish);
  ok(hovE.hover && parseFloat(hovE.ry) !== 0 && downE && !!fl, 'it tilts to follow a mouse, sinks when pressed and plays a flourish', { hovE, downE, fl });
  await p.mouse.move(5, 890); await p.waitForTimeout(1500);

  // 3. the orbit of chosen models
  const s3 = await p.evaluate(() => { const sats = [...document.querySelectorAll('#page-blend .bx-sat:not(.bx-ghost)')];
    return { st: IngBlendLook.state(), marks: sats.map(s => s.querySelector('.bx-ico path') ? s.querySelector('.bx-ico svg').innerHTML.slice(0, 18) : ''),
      layers: sats.every(s => s.querySelector('.bxo .bx-cast') && s.querySelector('.bxo .bx-l0 svg') && s.querySelector('.bxo .bx-l3 .bx-ico svg')),
      sway: sats[0] && getComputedStyle(sats[0].querySelector('.bx-idle')).animationName, roles: sats.map(s => s.querySelector('.bx-role').textContent),
      rows: document.querySelectorAll('#blendPick label.bl-model .bxo').length, chosen: document.querySelectorAll('#blendPick label.bl-model.bx-chosen').length }; });
  ok(s3.st.sats === 2 && s3.st.names.join() === 'Magister 9B,Scriba 4B' && s3.st.turning, 'the two chosen models ride the engine, turning', s3.st);
  ok(s3.layers && s3.sway === 'bxSway' && s3.marks[0] !== s3.marks[1], "each is made as Home's orbs are, with its own mark, swaying as the seal does", s3);
  ok(s3.rows >= 3 && s3.chosen === 2, 'every model row wears its orb; the chosen ones stand raised', s3);
  ok(s3.roles.every(r => r.length > 2), 'each says what it does in this blend', s3.roles);
  // choosing a third model, and leaving it
  /* (the models here have no files on this machine, so Blend keeps their boxes locked: they are chosen as Blend's own test does) */
  await p.evaluate(() => { const bl = blState(); bl.ids = ['t668-a', 't668-b', 't668-c']; saveState(); renderBlend(); }); await p.waitForTimeout(500);
  const s4 = await p.evaluate(() => IngBlendLook.state());
  ok(s4.sats === 3 && s4.names.includes('Velox 1B'), 'a model chosen joins the engine', s4);
  await p.evaluate(() => { const bl = blState(); bl.ids = ['t668-a', 't668-b']; saveState(); renderBlend(); }); await p.waitForTimeout(500);
  const s4b = await p.evaluate(() => IngBlendLook.state());
  ok(s4b.sats === 2 && !s4b.names.includes('Velox 1B'), 'a model left leaves the engine', s4b);
  // pointing at one, pressing it
  const ob = await (await p.$('#page-blend .bx-sat:not(.bx-ghost) .bxo')).boundingBox();
  await p.mouse.move(ob.x + ob.width * .65, ob.y + ob.height * .35); await p.waitForTimeout(900);
  const s5 = await p.evaluate(() => ({ st: IngBlendLook.state(), hold: document.querySelector('#page-blend .bx-head').classList.contains('bx-hold'), count: document.querySelector('#page-blend .bx-count').textContent,
    hov: !!document.querySelector('#page-blend .bx-sat.bx-near .bxo.bx-hov'), ry: document.querySelector('#page-blend .bx-sat.bx-near .bxo').style.getPropertyValue('--ry') }));
  ok(s5.hold && !s5.st.turning && s5.st.held && s5.count.indexOf(s5.st.held) >= 0, 'pointing at a model stops the orbit and names it', s5);
  ok(s5.hov && parseFloat(s5.ry) !== 0, 'under the mouse it tilts and lifts, as the seal does', s5);
  await p.evaluate(() => document.querySelector('.rm-step[data-step="2"]').click()); await p.waitForTimeout(400);
  await p.mouse.click(ob.x + ob.width / 2, ob.y + ob.height / 2); await p.waitForTimeout(500);
  const s6 = await p.evaluate(() => ({ step: document.getElementById('page-blend').getAttribute('data-rm-step'), seen: !!document.querySelector('#blendPick .bl-model.bx-seen') }));
  ok(s6.step === '1' && s6.seen, 'pressing it opens step I at its row', s6);
  await p.mouse.move(5, 890); await p.waitForTimeout(600);

  // 4. the coins, the ways and the leaning cards
  await p.evaluate(() => document.querySelector('.bx-steps .rm-step[data-step="2"]').click()); await p.waitForTimeout(500);
  const s7 = await p.evaluate(() => ({ step: document.getElementById('page-blend').getAttribute('data-rm-step'), cur: document.querySelector('.bx-steps .rm-step[aria-current="step"]').getAttribute('data-step'),
    size: Math.round(document.querySelector('.bx-steps .rm-step[aria-current="step"] .bxc').getBoundingClientRect().width), small: Math.round(document.querySelector('.bx-steps .rm-step:not([aria-current]) .bxc').getBoundingClientRect().width) }));
  ok(s7.step === '2' && s7.cur === '2' && s7.size > s7.small, 'a coin opens its step, which stands nearer', s7);
  const wb = await (await p.$('#blendStrats .blend-strat:not(.on)')).boundingBox();
  await p.mouse.move(wb.x + wb.width * .8, wb.y + wb.height * .3); await p.waitForTimeout(400);
  const s8 = await p.evaluate(() => { const w = document.querySelector('#blendStrats .blend-strat.bx-ph'); return w ? { lx: w.style.getPropertyValue('--lx'), tf: getComputedStyle(w).transform } : null; });
  ok(s8 && parseFloat(s8.lx) !== 0 && s8.tf !== 'none', 'a way leans toward the pointer and lifts', s8);
  await p.mouse.down(); await p.waitForTimeout(100); const pd = await p.evaluate(() => !!document.querySelector('#blendStrats .blend-strat.bx-pd')); await p.mouse.up(); await p.waitForTimeout(300);
  const s9 = await p.evaluate(() => ({ strat: blState().strategy, roles: IngBlendLook.state() }));
  ok(pd && s9.strat !== 'synth', 'pressed, it sinks, and the way is chosen as before', { pd, s9 });

  // 5. Ready-made, stillness, the narrow page, the night
  await p.evaluate(() => { const t = document.getElementById('rmT-blend-ready'); if (t) t.click(); }); await p.waitForTimeout(600);
  const s10 = await p.evaluate(() => ({ steps: getComputedStyle(document.querySelector('#page-blend .bx-steps')).display, cards: [...document.querySelectorAll('.bl-presets .bl-preset')].filter(c => c.offsetParent).length }));
  ok(s10.steps === 'none' && s10.cards >= 1, 'Ready-made shows its cards, without the steps', s10);
  await p.evaluate(() => { const t = document.getElementById('rmT-blend-new'); if (t) t.click(); }); await p.mouse.move(5, 890); await p.waitForTimeout(1200);
  const quiet = await p.evaluate(() => new Promise(res => { let n = 0; const seen = {}; const mo = new MutationObserver(l => l.forEach(m => { n++; const k = m.type + ' ' + (m.attributeName || '') + ' ' + (m.target.id || m.target.className || m.target.nodeName); seen[k] = (seen[k] || 0) + 1; }));
    mo.observe(document.getElementById('page-blend'), { attributes: true, childList: true, subtree: true, characterData: true }); setTimeout(() => { mo.disconnect(); res({ n, seen }); }, 2500); }));
  ok(quiet.n === 0, 'left alone, nothing on Blend is rewritten', quiet);
  await p.setViewportSize({ width: 1000, height: 900 }); await p.waitForTimeout(1500);
  const s11 = await p.evaluate(() => { const pg = document.getElementById('page-blend'); return { on: pg.classList.contains('bx-on'), title: !!pg.querySelector(':scope > .page-title'),
    steps: !!pg.querySelector('.bl-setup > .rm-steps'), head: !!pg.querySelector('.bx-head') }; });
  ok(!s11.on && s11.title && s11.steps && !s11.head, 'below 760 pixels Blend is as it was', s11);
  await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(1500);
  ok(await p.evaluate(() => IngBlendLook.state().on && IngBlendLook.state().sats === 2), 'wide again, the new look comes back with its models');
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(800);
  const s12 = await p.evaluate(() => getComputedStyle(document.querySelector('#page-blend .bx-head')).backgroundImage.slice(0, 70));
  ok(/36, 26, 56|241a38/.test(s12), 'by night Blend wears the night sky', s12);
  await p.screenshot({ path: path.join(OUT, 'blend_night.png') });
  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
