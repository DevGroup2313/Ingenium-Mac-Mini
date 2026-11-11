// The lenses of the Models page's rooms as keys (Ingenium 6.78, modules/r269.js, with the rooms of modules/r267.js). Her words (11 November
// 2026): "I want you to remove the black squares arounf the little catridges and leave the coloured catridges without them but make them 3D
// popped out animated and make them react to my mouse when I hover over them and clickable, the same as the the ones from inside the turret."
// Invented models; the engine's load is a stand-in that reports progress as the real one does; nothing is downloaded. Checks:
//   - Ingenium's models: each house's lens stands on no dark square; it is a key (named in words, reached by the keyboard);
//   - under the pointer a lens leans, lifts and catches the light (it is drawn again where the pointer is); pressed, it sinks;
//   - a house whose model is on this device: pressing its lens loads that model, as the turret does, and the turret turns to it;
//     pressed again, it unloads; a house not on this device yet: its lens points to its own key, and nothing is downloaded;
//   - Your models: each row's lens loads and unloads its model the same way, and Enter on it does the same;
//   - by night the lenses are drawn again; left alone, nothing is rewritten; no page error.
//   node rig/t_678_room_lenses.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_678_room_lenses.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 1 }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.addInitScript(() => { window.__INGENIUM_DEVICE = { ramGB: 16, cores: 8 }; });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.theme = 'day'; applyTheme();
    const vk = lineupKeyFor('velox');
    state.models = [{ id: 'm1', customName: 'Quill', fileName: 'quill.gguf', color: '#3f6bb8', sizeBytes: 2e9, paramB: 3, type: 'GGUF', fileState: 'ready', ctx: 8192 },
      { id: 'mv', customName: 'Velox', lineup: vk, fileName: (ING_LINEUP.models[vk] || {}).file || 'velox.gguf', color: '#7458c6', sizeBytes: 0.7e9, paramB: 1.2, type: 'GGUF', fileState: 'ready', ctx: 8192 }];
    state.activeModelId = 'm1'; try { saveState(); } catch (e) {} renderModels(); try { renderLineup(); } catch (e) {}
    window.__loads = []; Engine.load = function (m) { const self = this; window.__loads.push(m.id); self.setStatus('loading', 0);
      return new Promise(res => { let f = 0; const iv = setInterval(() => { f += 0.5; self.progress = f; self.setStatus('loading', f); if (f >= 1) { clearInterval(iv); self.modelId = m.id; self.adapter = null; self.setStatus('ready'); res(); } }, 150); }); };
    go('models'); IngRooms.open('models', 'get'); });
  await p.waitForTimeout(1500);
  // 1. the houses: no dark square; each lens a key
  const h1 = await p.evaluate(() => [...document.querySelectorAll('#lineupGrid .lu-tile > .tm-stage')].map(s => { const c = getComputedStyle(s); return { house: s.getAttribute('data-house'), bg: c.backgroundImage + ' ' + c.backgroundColor, key: s.classList.contains('tm-key'), role: s.getAttribute('role'), tab: s.getAttribute('tabindex'), label: s.getAttribute('aria-label'), model: s.getAttribute('data-model') }; }));
  ok(h1.length >= 4 && h1.every(x => /^none rgba\(0, 0, 0, 0\)$/.test(x.bg)), 'each house\'s lens stands on no dark square', h1.map(x => x.bg));
  ok(h1.every(x => x.key && x.role === 'button' && x.tab === '0' && /press/.test(x.label || '')), 'each house\'s lens is a key, named in words and reached by the keyboard', h1.map(x => x.label));
  await p.screenshot({ path: OUT + '/1_houses.png' });
  // 2. under the pointer: leans, lifts and catches the light
  const sel = '#lineupGrid .lu-tile > .tm-stage[data-house="velox"]';
  const px = () => { const c = document.querySelector('#lineupGrid .lu-tile > .tm-stage[data-house="velox"] canvas'), g = c.getContext('2d'); return Array.from(g.getImageData(0, 0, c.width, c.height).data.filter((_, i) => i % 97 === 0)).join(','); };
  const before = await p.evaluate(px);
  const box = await (await p.$(sel)).boundingBox();
  await p.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5); await p.waitForTimeout(100);
  await p.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.2, { steps: 4 }); await p.waitForTimeout(600);
  const h2 = await p.evaluate(s => { const e = document.querySelector(s), c = getComputedStyle(e), m = /matrix3d\(([^)]+)\)/.exec(c.transform); return { lift: m ? +m[1].split(',')[13] : null, lx: e.style.getPropertyValue('--lx'), ly: e.style.getPropertyValue('--ly'), filter: c.filter }; }, sel);
  const after = await p.evaluate(px);
  ok(h2.lift !== null && h2.lift < -2 && parseFloat(h2.lx) > 2 && parseFloat(h2.ly) > 2 && /drop-shadow/.test(h2.filter), 'under the pointer a lens leans toward it and lifts, raised on its shadow', h2);
  ok(before !== after, 'and catches the light where the pointer is (it is drawn again)');
  await p.mouse.move(5, 5); await p.waitForTimeout(500);
  // 3. pressing the lens of a house on this device loads its model, as the turret does
  await p.click(sel); await p.waitForTimeout(900);
  const h3 = await p.evaluate(() => ({ loads: window.__loads.slice(), mid: Engine.modelId, turret: IngTurret.state().loaded, label: document.querySelector('#lineupGrid .lu-tile > .tm-stage[data-house="velox"]').getAttribute('aria-label') }));
  ok(h3.loads.join() === 'mv' && h3.mid === 'mv' && h3.turret === 'mv' && /in the engine: press to unload it$/.test(h3.label), 'pressing the lens of a house on this device loads its model, and the turret has it', h3);
  await p.evaluate(() => IngRooms.open('models', 'get')); await p.waitForTimeout(300);
  await p.click(sel); await p.waitForTimeout(700);
  ok(await p.evaluate(() => !Engine.modelId && Engine.status === 'disconnected'), 'pressed again, it unloads');
  // a house not on this device: its lens points to its own key, and nothing is downloaded
  await p.evaluate(() => IngRooms.open('models', 'get')); await p.waitForTimeout(300);
  const other = await p.evaluate(() => { const s = [...document.querySelectorAll('#lineupGrid .lu-tile > .tm-stage')].find(x => !x.getAttribute('data-model')); return s ? s.getAttribute('data-house') : null; });
  if (other) { const n0 = await p.evaluate(() => window.__loads.length); await p.click('#lineupGrid .lu-tile > .tm-stage[data-house="' + other + '"]'); await p.waitForTimeout(600);
    const h4 = await p.evaluate(h => ({ loads: window.__loads.length, focus: document.activeElement && document.activeElement.closest && !!document.activeElement.closest('.lu-tile.lu-' + h), tag: document.activeElement && document.activeElement.tagName }), other);
    ok(h4.loads === n0 && h4.focus, 'a house not on this device yet: its lens points to its own key, and nothing is downloaded', h4); }
  // 4. Your models: each row's lens loads and unloads; Enter does the same
  await p.evaluate(() => IngRooms.open('models', 'yours')); await p.waitForTimeout(500);
  const rsel = '#modelList > .model-row > .tm-ic.tm-key[data-model="m1"]';
  const r0 = await p.evaluate(s => { const e = document.querySelector(s); return e ? { role: e.getAttribute('role'), label: e.getAttribute('aria-label') } : null; }, rsel);
  await p.click(rsel); await p.waitForTimeout(900);
  const r1 = await p.evaluate(() => ({ mid: Engine.modelId, loads: window.__loads.slice() }));
  ok(r0 && r0.role === 'button' && r1.mid === 'm1', "a row's lens in Your models loads its model", { r0, r1 });
  await p.evaluate(() => IngRooms.open('models', 'yours')); await p.waitForTimeout(300);
  await p.focus(rsel); await p.keyboard.press('Enter'); await p.waitForTimeout(700);
  ok(await p.evaluate(() => !Engine.modelId), 'Enter on it unloads it, as a press does');
  // 5. night, left alone, errors
  await p.evaluate(() => IngRooms.open('models', 'get')); await p.waitForTimeout(300);
  const d0 = await p.evaluate(px); await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(1500);
  const n1 = await p.evaluate(() => [...document.querySelectorAll('#lineupGrid .lu-tile > .tm-stage')].every(s => s.classList.contains('tm-key') && s.querySelector('canvas')));
  ok(n1, 'by night the lenses are drawn again, and stay keys');
  await p.screenshot({ path: OUT + '/2_night.png' });
  // after day and night change, the turret and the Health card are drawn again once; then the page is left alone
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); }); await p.waitForTimeout(3000);
  // the Health card is drawn again every five seconds by an older part of the page (renderHealth's timer): known, and left out here until it is fixed
  const still = await p.evaluate(() => new Promise(res => { let n = 0; const g = document.getElementById('page-models'), mo = new MutationObserver(ms => { ms.forEach(m => { if (!(m.target.closest && m.target.closest('#healthBox'))) n++; }); }); mo.observe(g, { subtree: true, childList: true, attributes: true, characterData: true }); setTimeout(() => { mo.disconnect(); res(n); }, 3000); }));
  ok(still === 0, 'left alone, nothing on the page is rewritten (but the Health card, which an older timer draws again)', still);
  ok(errs.length === 0, 'no page error', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + (e && e.message || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
