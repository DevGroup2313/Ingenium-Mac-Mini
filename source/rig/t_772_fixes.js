// Ingenium 7.72: her fixes of 24 November 2026. node rig/t_772_fixes.js <page url> <out folder>
// Fabrica's small diamonds wear Adamas's stone (r294); the Ollama row in Bring in your work (r263); Your ways of working inside How I
// work (r327); the Engine tab's two engines (r214); the Train overview's labels and steady lift, Health and Where your models are kept
// raised (r364); rest leaves finished animations alone, so a page cannot be left blank (r324).
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); p.setDefaultTimeout(90000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await sleep(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(800);
  const click = (re, scope) => p.evaluate(([re, scope]) => { const r = new RegExp(re); const b = [...document.querySelectorAll((scope || 'body') + ' button')].find(x => r.test(x.textContent.trim()) && x.offsetParent); if (b) { b.click(); return true; } return false; }, [re, scope]);
  // 1. Fabrica's small diamonds: Adamas's stone, in its shade by the hour; they lift, and spin when pressed
  await p.evaluate(() => go('fabrica')); await sleep(4000);
  const g0 = await p.evaluate(() => window.IngTree && IngTree.gems ? IngTree.gems() : null);
  const want = await p.evaluate(() => { const C = window.IngDiamondColours; const d = C.get(); const h = new Date().getHours(); const i = document.body.getAttribute('data-theme') === 'night' ? 3 : (d.shade === 'auto' || !d.shade ? (h >= 5 && h < 11 ? 0 : h >= 11 && h < 14 ? 1 : h >= 14 && h < 18 ? 2 : 3) : ({ pastel: 0, medium: 1, deep: 2 })[d.shade]); return C.drawn(d.fam, d.own, i).slice(0, 24); });
  ok(g0 && g0.n >= 1 && g0.adamas === true && g0.src === want, "Fabrica's small diamonds draw Adamas's own stone, in the shade Adamas shows now", { g0, want });
  const gemAt = g0 && g0.at[0];
  if (gemAt) {
    const box = await p.evaluate(() => { const c = document.querySelector('#page-fabrica canvas'); const r = c.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, cw: c.width }; });
    const k = box.w / 460 * 0.92 / 0.92; // the canvas draws in 460 units scaled to its box
    const sx = box.x + gemAt[0] * box.w / 423.2 * 0.92 / 0.92 * (423.2 / 460) / 0.92 * 0.92, sy = box.y + gemAt[1] * box.w / 460;
    const pt = await p.evaluate(([gx, gy]) => { const c = document.querySelector('#page-fabrica canvas'), r = c.getBoundingClientRect(), s = r.width / 460; return { x: r.left + gx * s, y: r.top + gy * s }; }, [gemAt[0], gemAt[1]]);
    await p.mouse.move(pt.x, pt.y); await sleep(500);
    const h1 = await p.evaluate(() => ({ g: IngTree.gems(), tip: (document.querySelector('#page-fabrica .fbt-tip.fbt-show') || {}).textContent || '' }));
    ok(h1.g.hover >= 0 && /Adamas's diamond/.test(h1.tip), 'under the pointer the diamond lifts and says whose stone it is', { hover: h1.g.hover, tip: h1.tip.slice(0, 120) });
    await p.mouse.down(); await p.mouse.up(); await sleep(150);
    const h2 = await p.evaluate(() => IngTree.gems().spin); ok(h2 === true, 'pressed, it spins with a glint', h2);
    await sleep(1600); await p.screenshot({ path: OUT + '/1_fabrica_diamond.png', clip: { x: 900, y: 60, width: 540, height: 480 } });
  } else ok(false, 'a small diamond is drawn on the tree', g0);
  // 2. Ingenia: the Ollama row's keys under its words; Your ways of working inside How I work
  await p.evaluate(() => go('folders')); await sleep(3000);
  const top = await p.evaluate(() => { const w = document.getElementById('waysIngenia'); return { inHow: !!(w && w.closest('.card') && w.closest('.card').querySelector('#fldHowAll')), parentIsPage: !!(w && w.parentNode && w.parentNode.id === 'page-folders' && !w.hidden) }; });
  ok(top.inHow && !top.parentIsPage, 'Your ways of working is no longer a separate area: it stands inside How I work, on every app', top);
  await click('^How I work$', '#page-folders'); await sleep(1200);
  const how = await p.evaluate(() => { const c = document.getElementById('fldHowAll').closest('.card'); const w = document.getElementById('waysIngenia'), h = c.querySelector('.wy-own-h'), ta = document.getElementById('fldHowAll');
    return { shown: !!(w && w.offsetParent), order: !!(w && h && (w.compareDocumentPosition(h) & 4) && (h.compareDocumentPosition(ta) & 4)), head: h ? h.textContent : '' }; });
  ok(how.shown && how.order && how.head === 'In your own words', 'in the How I work tab: your ways of working, then In your own words and your text', how);
  await p.screenshot({ path: OUT + '/2_how_i_work.png', fullPage: false });
  // the card is drawn again (Ingenia paints): the rules come back into it
  await p.evaluate(() => { try { IngFolders.paint ? IngFolders.paint() : null; } catch (e) {} try { go('home'); go('folders'); } catch (e) {} }); await sleep(1500);
  const again = await p.evaluate(() => { const w = document.getElementById('waysIngenia'); return !!(w && w.closest('.card') && w.closest('.card').querySelector('#fldHowAll')); });
  ok(again, 'after Ingenia draws its cards again, your ways of working are still inside How I work', again);
  await click('^Bring in your work$', '#page-folders'); await sleep(1500);
  const ol = await p.evaluate(() => { const w = [...document.querySelectorAll('.fd-bway')].find(x => /^Ollama$/.test((x.querySelector(':scope > b') || {}).textContent || '')); if (!w) return null; w.scrollIntoView({ block: 'center' });
    const t = w.querySelector(':scope > p').getBoundingClientRect(), a = w.querySelector('.fd-bacts').getBoundingClientRect(); return { many: w.classList.contains('fd-many'), textW: Math.round(t.width), keysBelow: a.top >= t.bottom - 1, rowW: Math.round(w.getBoundingClientRect().width) }; });
  ok(ol && ol.many && ol.keysBelow && ol.textW >= ol.rowW * 0.6, "the Ollama row: its words across the row, its keys on a line of their own beneath", ol);
  await sleep(300); await p.screenshot({ path: OUT + '/3_ollama.png' }); await p.keyboard.press('Escape'); await sleep(400);
  // 3. Mentes: Train overview, Health, Where your models are kept, the Engine tab
  await p.evaluate(() => go('models')); await sleep(2500);
  const hl = p.locator('#healthBox .hl-row').first(); const t0 = await hl.evaluate(e => getComputedStyle(e).transform); await hl.hover(); await sleep(450);
  const t1 = await hl.evaluate(e => ({ tf: getComputedStyle(e).transform, sh: getComputedStyle(e).boxShadow }));
  ok(t0 === 'none' && t1.tf !== 'none' && /rgba/.test(t1.sh), 'Health: each reading is raised, keeps its look at rest and lifts under the pointer', { t0, t1: t1.tf });
  await p.screenshot({ path: OUT + '/4_health.png', clip: { x: 220, y: 560, width: 1160, height: 340 } });
  const mp = await p.evaluate(() => { const c = document.createElement('div'); c.id = 'mdPlaceCard'; c.className = 'card'; c.innerHTML = '<h2 class="sec">Where your models are kept</h2><div class="mp-places"><div class="mp-place">This computer</div></div><div class="mp-row">a model</div>'; document.getElementById('page-models').appendChild(c);
    const pl = c.querySelector('.mp-place'); const r = { sh: getComputedStyle(pl).boxShadow, tr: getComputedStyle(pl).transitionProperty }; c.remove(); return r; });
  ok(/rgba/.test(mp.sh) && /transform/.test(mp.tr), 'Where your models are kept: each place raised, ready to lift', mp);
  await click('^Studio$', '#page-models'); await sleep(1200); await click('^Train$', '#page-models'); await sleep(2500);
  const lab = await p.evaluate(() => [...document.querySelectorAll('#ingTruthBands .tr-band')].map(li => { const t = li.querySelector('.tr-tag').getBoundingClientRect(), h = li.querySelector('b').getBoundingClientRect(); return { gap: Math.round(h.top - t.bottom), pos: getComputedStyle(li.querySelector('.tr-tag')).position }; }));
  ok(lab.length >= 4 && lab.every(x => x.gap >= 0 && x.pos === 'static'), 'Train overview: each label sits above its title, no longer over it', lab);
  const r = await p.evaluate(() => { const li = document.querySelector('#ingTruthBands .tr-band'); const b = li.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.bottom - 2 }; });
  await p.mouse.move(r.x, r.y); await sleep(600);
  const steady = await p.evaluate(async () => { const li = document.querySelector('#ingTruthBands .tr-band'); const s = []; for (let i = 0; i < 30; i++) { s.push(li.matches(':hover') ? 'h' : '-'); await new Promise(r => setTimeout(r, 40)); } return s.join(''); });
  ok(/^h+$/.test(steady), 'with the pointer at a card\'s foot, the lifted card stays under it: no popping up and down', steady);
  await p.screenshot({ path: OUT + '/5_train.png', clip: { x: 220, y: 160, width: 1160, height: 600 } });
  // the Engine tab, as on her computer (the computer app's answer, invented here)
  await p.evaluate(() => { window.deskApi = () => ({ engine_choice: () => Promise.resolve({ proven: { version: 'llama.cpp b6400', kinds: 112 }, newer: { available: true, version: 'llama.cpp b7100', kinds: 131, only: ['lfm3', 'deepseek41', 'mistral-large4'] }, choice: 'auto', running: 'proven' }), engine_choice_set: () => Promise.resolve({ ok: true }) }); IngR214.refresh(); });
  await click('^Engine$', '#page-models'); await sleep(1500);
  const eng = await p.evaluate(() => { const c = document.getElementById('engPairCard'); if (!c) return null; c.scrollIntoView({ block: 'center' }); return { plates: c.querySelectorAll('.ep-eng').length, run: (c.querySelector('.ep-run') || {}).textContent, opts: c.querySelectorAll('.ep-opt').length, chips: c.querySelectorAll('.ep-chip').length, on: (c.querySelector('.ep-opt.on b') || {}).textContent }; });
  ok(eng && eng.plates === 2 && eng.run === 'Runs now' && eng.opts === 3 && eng.chips === 3 && eng.on === 'Automatic (recommended)', 'the engines on this computer: two raised plates (the one running marked), three raised choices, the newer kinds as chips', eng);
  await p.mouse.move(5, 5); await sleep(500); const op = p.locator('#engPairCard .ep-opt').nth(1); const o0 = await op.evaluate(e => getComputedStyle(e).transform); await op.hover(); await sleep(450); const o1 = await op.evaluate(e => getComputedStyle(e).transform);
  ok(o0 === 'none' && o1 !== 'none', 'each choice keeps its look at rest and lifts under the pointer', { o0, o1 });
  await sleep(300); await p.screenshot({ path: OUT + '/6_engine.png' });
  // 4. rest: the page's own animation, once finished, is never paused (so it cannot be held at its first frame, blank)
  await p.evaluate(() => go('home')); await sleep(1200); await p.evaluate(() => go('lector')); await sleep(1500);
  const rest = await p.evaluate(async () => { IngStill.now(); await new Promise(r => setTimeout(r, 300)); const s = document.querySelector('.section.active'); const inf = [...document.querySelectorAll('*')].find(e => { const c = getComputedStyle(e); return c.animationIterationCount === 'infinite' && c.animationName !== 'none'; });
    return { done: s.classList.contains('ing-done'), state: getComputedStyle(s).animationPlayState, rest: document.body.classList.contains('ing-rest'), inf: inf ? getComputedStyle(inf).animationPlayState : 'none found' }; });
  ok(rest.rest && rest.done && rest.state === 'running' && (rest.inf === 'paused' || rest.inf === 'none found'), "at rest the page's own finished animation is left alone (never paused); a looping one is paused as before", rest);
  await p.mouse.move(300, 300); await sleep(300);
  ok(await p.evaluate(() => !document.body.classList.contains('ing-rest')), 'a movement ends the rest, as before');
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
