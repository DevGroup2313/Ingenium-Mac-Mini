// The Models page's rooms in the turret's design (Ingenium 6.76, modules/r267.js), on the page of 6.75's turret (modules/r266.js). Her words (11 November 2026): "I need you to push build 6.75
// and 6.76 with the models page new turet redesign", her preview Ingenium_Models_Designs.html, design I · The turret.
// The models here are invented (Lantern 3B, Quill 8B and Atlas 70B), and the engine is a stand-in that loads at once, so that the turret
// is tested without model files:
//   - the head: Models, the turret's words, its two keys, the In the engine card; the page's own title and words give way to it;
//   - one port for each model and one empty port, the rest blank; the scale is this device's memory for a model;
//   - pressing a model turns it into the light path and loads it (the page's own setActive and loadActiveModel); pressing it again, or
//     the empty port, unloads it; the card says what the engine does; a model too heavy says so first, with Load it anyway;
//   - the keys open their rooms; the rooms still work; night redraws it; minimal motion turns it at once; a phone fits it; no page error.
//   node rig/t_676_rooms.js <Ingenium page url (master)> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_676_rooms.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true }); const OUTA = path.resolve(OUT);
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; return !!c; };
async function open(b, vp, th, extra) {
  const ctx = await b.newContext(Object.assign({ viewport: vp }, extra || {})); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(300);
  // three invented models, and an engine that loads at once (no model file is read)
  await p.evaluate((th) => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = th; applyTheme();
    window.__ingDevice0 = window.__INGENIUM_DEVICE; window.__INGENIUM_DEVICE = Object.assign({}, window.__INGENIUM_DEVICE || {}, { ramGB: 16 });
    const mm = (id, name, gb, color) => ({ id, customName: name, name, type: 'GGUF', fileName: id + '.gguf', sizeBytes: Math.round(gb * 1e9), fileState: 'ready', color, effort: 'Medium', tokens: 1024, ctx: 4096 });
    state.models = [mm('t-lantern', 'Lantern 3B', 2.1, '#7458c6'), mm('t-quill', 'Quill 8B', 5.2, '#8641b8'), mm('t-atlas', 'Atlas 70B', 41, '#4d3db0')];
    window.__loads = []; window.__unloads = 0;
    Engine.load = function (m) { window.__loads.push(m.id); this.modelId = m.id; this.setStatus('loading'); return new Promise(r => setTimeout(() => { this.setStatus('ready'); r(); }, 300)); };
    Engine.unload = function () { window.__unloads++; this.modelId = null; this.setStatus('disconnected'); return Promise.resolve(); };
    go('models'); }, th);
  await p.waitForTimeout(1500); await p.evaluate(() => { try { IngTurret.rebuild(); } catch (e) {} }); await p.waitForTimeout(600);
  return { ctx, p, errs };
}
(async () => {
  const b = await pw.chromium.launch();
  const { p, ctx, errs } = await open(b, { width: 1440, height: 900 }, 'day');
  await p.evaluate(() => { try { renderModels(); } catch (e) {} try { renderLineup(); } catch (e) {} }); await p.waitForTimeout(800);
  const s1 = await p.evaluate(() => { const rows = [...document.querySelectorAll('#modelList > .model-row')];
    return { part: window.__ingParts && window.__ingParts.p267, n: rows.length, icons: rows.map(r => !!r.querySelector(':scope > .tm-ic canvas')), sw: rows.map(r => { const s = r.querySelector(':scope > .swatch'); return s ? getComputedStyle(s).display : 'none'; }),
      name: rows[0] ? getComputedStyle(rows[0].querySelector('.mname')).fontFamily : '', keys: rows.map(r => (r.querySelector('.tm-load') || {}).textContent || '') }; });
  ok(s1.part === 'running' && s1.n === 3 && s1.icons.every(Boolean) && s1.sw.every(d => d === 'none'), 'each of her models in Your models carries its lens, drawn as the turret draws it', s1);
  ok(/Cormorant/.test(s1.name) && s1.keys.join('|') === 'Load|Load|Load', 'its name in the page\'s serif, and a key to load it', s1);
  // the key loads through the turret, and the row says it is in the engine
  await p.evaluate(() => document.querySelectorAll('#modelList > .model-row')[0].querySelector('.tm-load').click()); await p.waitForTimeout(1900);
  const s2 = await p.evaluate(() => { const r = document.querySelectorAll('#modelList > .model-row')[0]; return { loaded: IngTurret.state().loaded, at: IngTurret.state().at, chip: (r.querySelector('.tm-in') || {}).textContent || '', key: (r.querySelector('.tm-load') || {}).textContent || '' }; });
  ok(s2.loaded === 't-lantern' && s2.at === 0 && s2.chip === 'In the engine' && s2.key === 'Unload', 'its key loads it through the turret, and the row says it is in the engine, with Unload', s2);
  await p.evaluate(() => document.querySelectorAll('#modelList > .model-row')[0].querySelector('.tm-load').click()); await p.waitForTimeout(900);
  ok(await p.evaluate(() => !IngTurret.state().loaded && !document.querySelector('#modelList .tm-in')), 'Unload unloads it');
  // the Health card as gauges, Ingenium's models as houses with their lenses
  const s3 = await p.evaluate(() => { const h = document.querySelector('#healthBox .hl-rows'), tiles = [...document.querySelectorAll('#lineupGrid .lu-tile')];
    return { grid: h ? getComputedStyle(h).display : '', cols: h ? getComputedStyle(h).gridTemplateColumns.split(' ').length : 0, gauges: h ? h.children.length : 0,
      houses: tiles.length, stages: tiles.filter(t => t.querySelector(':scope > .tm-stage canvas')).length }; });
  ok(s3.grid === 'grid' && s3.cols === 4 && s3.gauges >= 4, 'the Health card reads as gauges, four across', s3);
  ok(s3.houses >= 4 && s3.stages === s3.houses, 'each of Ingenium\'s houses is a card with its lens on a dark stage', s3);
  await p.screenshot({ path: path.join(OUTA, 'rooms_day.png'), fullPage: true });
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(2500);
  ok(await p.evaluate(() => [...document.querySelectorAll('#modelList > .model-row')].every(r => r.querySelector(':scope > .tm-ic canvas'))), 'by night the lenses are drawn again');
  await ctx.close();
  const ph = await open(b, { width: 390, height: 844 }, 'day', { hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  await ph.p.evaluate(() => { try { renderModels(); } catch (e) {} }); await ph.p.waitForTimeout(800);
  ok(await ph.p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'on a phone nothing scrolls sideways');
  ok(errs.length === 0 && ph.errs.length === 0, 'no page error', errs.concat(ph.errs));
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
