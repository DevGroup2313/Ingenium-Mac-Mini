// Ingenium 7.81: one colour for each model, everywhere (modules/r380.js; the Engine panel's orbs, r374). Her words (25 November 2026):
// "I want the models colour bubbles to remain consistent throughout the app and actually have a system and still keep the full option to
// customise and change them as I please within the app"; on the preview: "For the models colours, I agree with your recommendations."
//   node rig/t_781_model_colours.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2), URL_ = args.find(a => /^https?:\/\//.test(a)), OUT = args.find(a => !/^https?:\/\//.test(a)) || '/tmp';
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(1500);
  // her five models, with the colours they were given in the order they were added (as before 7.81), and the system not yet run
  await p.evaluate(() => { const mk = (id, n, b, c) => ({ id, customName: n, name: n, fileName: n.replace(/\s+/g, '-') + '.gguf', paramB: b, fileState: 'ready', size: b * 6e8, sizeBytes: b * 6e8, ctx: 8192, color: c, effort: 3, tokens: 1024 });
    state.models = [mk('m1', 'LFM2.5 1.2B Instruct', 1.2, '#6a3fb5'), mk('m2', 'LFM2.5 2.6B', 2.6, '#b88a3a'), mk('m3', 'Qwen3.5 2B', 2, '#3f8f7a'), mk('m4', 'Qwen3 4B Thinking (2507)', 4, '#b8433f'), mk('m5', 'Qwen3 4B Instruct (2507)', 4, '#3f6bb8')];
    delete state.modelColours; state.activeModelId = 'm5'; IngModelColour.migrate(); renderDockModels(); go('models'); });
  await sleep(1500);
  const hex = s => { const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(s || ''); return m ? '#' + [m[1], m[2], m[3]].map(v => (+v).toString(16).padStart(2, '0')).join('') : (s || '').toLowerCase(); };
  const r = await p.evaluate(() => { const ms = state.models; return { cols: ms.map(m => [m.id, m.color, m.colorSys, !!m.colorOwn, IngModelColour.family(m)[0]]), of: ms.map(m => IngModelColour.of(m)),
    dock: [...document.querySelectorAll('#dockModels .model-pill .swatch')].map(s => getComputedStyle(s).backgroundColor), pill: getComputedStyle(document.querySelector('#activeModelPill .swatch')).backgroundColor,
    rows: [...document.querySelectorAll('#modelList .model-row .swatch')].map(s => getComputedStyle(s).backgroundColor), plates: [...document.querySelectorAll('#modelList .ing-fitplate')].map(x => x.textContent) }; });
  const fam = r.cols.map(c => c[4]);
  ok(fam.join() === 'LFM,LFM,Qwen,Qwen,Qwen' && r.cols.every(c => c[1] === c[2] && !c[3]), 'every model takes its family\'s colour (her answer): LFM aquamarine, Qwen sapphire', r.cols);
  ok(r.of[0] !== r.of[1] && r.of[3] !== r.of[4], 'a smaller model is a lighter shade, a thinking model a step apart from its instruct twin', r.of);
  ok(r.dock.map(hex).join() === r.of.join() && hex(r.pill) === r.of[4] && r.rows.map(hex).join() === r.of.join(), 'the side list, the top bar and Mentes\'s list show each model in the same colour', { dock: r.dock.map(hex), pill: hex(r.pill), rows: r.rows.map(hex), of: r.of });
  ok(r.plates.length === 5, 'Mentes\'s list says each model\'s fit on a plate beside it', r.plates);
  // the Engine panel: the same colours, its orbs pressable for the chooser (pressing an orb does not choose the model)
  await p.evaluate(() => IngEnginePanel.open()); await sleep(700);
  const e = await p.evaluate(() => [...document.querySelectorAll('#ingEngine .orb[data-mid]')].map(o => { const id = o.getAttribute('data-mid'); return [id, o.style.getPropertyValue('--o').trim(), IngModelColour.of(state.models.find(m => m.id === id))]; }));
  ok(e.length === 5 && e.every(x => x[1] === x[2]), 'the Engine panel shows each model in its own colour', e);
  await p.evaluate(() => document.querySelector('#ingEngine .orb[data-mid="m2"]').click()); await sleep(500);
  const c1 = await p.evaluate(() => ({ pop: !!document.getElementById('ingColourPop'), active: state.activeModelId, title: (document.querySelector('#ingColourPop h5') || {}).textContent }));
  ok(c1.pop && c1.active === 'm5' && c1.title === 'LFM2.5 2.6B', 'pressing a model\'s orb opens its colour chooser, without choosing the model', c1);
  await p.screenshot({ path: OUT + '/engine_chooser.png' });
  await p.evaluate(() => document.querySelector('#ingColourPop .jw[data-c="#b8433f"]').click()); await sleep(500);
  const c2 = await p.evaluate(() => { const m = state.models[1]; return { color: m.color, own: !!m.colorOwn, kept: (state.modelPrefs || {})[ingModelPrefKey(m)] || null, dock: getComputedStyle(document.querySelectorAll('#dockModels .model-pill .swatch')[1]).backgroundColor, orb: document.querySelector('#ingEngine .orb[data-mid="m2"]').style.getPropertyValue('--o').trim() }; });
  ok(c2.color === '#b8433f' && c2.own && c2.kept && c2.kept.color === '#b8433f' && c2.kept.colorOwn === true, 'her choice is kept for that model, over restarts and updates', c2);
  ok(hex(c2.dock) === '#b8433f' && c2.orb === '#b8433f', 'and shown in every place at once', c2);
  await p.evaluate(() => document.querySelector('#ingColourPop [data-fam]').click()); await sleep(400);
  const c3 = await p.evaluate(() => { const m = state.models[1]; return { color: m.color, own: !!m.colorOwn, sys: IngModelColour.system(m) }; });
  ok(!c3.own && c3.color === c3.sys, 'Its family\'s colour gives it back its system colour', c3);
  await p.keyboard.press('Escape'); await p.evaluate(() => IngEnginePanel.close());
  // a colour picked in the model's Edit sheet is hers too
  const c4 = await p.evaluate(() => { const m = state.models[2]; m.color = '#5a7a3f'; renderDockModels(); return { own: !!m.colorOwn, color: m.color }; });
  ok(c4.own && c4.color === '#5a7a3f', 'a colour picked in a model\'s Edit sheet counts as hers', c4);
  // Mentes's own bubbles open the chooser too
  await p.evaluate(() => { go('models'); renderModels(); }); await sleep(600);
  await p.evaluate(() => document.querySelector('#modelList .model-row .swatch[data-mid="m1"]').click()); await sleep(400);
  ok(await p.evaluate(() => !!document.getElementById('ingColourPop')), 'pressing a bubble on Mentes opens the chooser');
  await p.screenshot({ path: OUT + '/mentes_chooser.png' });
  await p.keyboard.press('Escape');
  // the model running wears a halo; by night each colour is a little brighter
  await p.evaluate(() => { Engine.modelId = 'm5'; Engine.setStatus('ready'); renderDockModels(); }); await sleep(300);
  ok(await p.evaluate(() => !!document.querySelector('#dockModels .model-pill.running')), 'the model running wears its halo');
  const day = await p.evaluate(() => IngModelColour.of(state.models[0]));
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await sleep(700);
  const nt = await p.evaluate(() => ({ of: IngModelColour.of(state.models[0]), dock: getComputedStyle(document.querySelector('#dockModels .model-pill .swatch')).backgroundColor }));
  ok(nt.of !== day && hex(nt.dock) === nt.of, 'by night each bubble wears its night shade, in every place', { day, nt });
  await p.screenshot({ path: OUT + '/night.png' });
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
