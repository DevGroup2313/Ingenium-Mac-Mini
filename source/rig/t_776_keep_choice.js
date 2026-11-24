// Ingenium 7.76 (24 November 2026): a page's model no longer replaces the model she chose for the app (modules/r373.js).
// Her words: "the chosen model there always takes precedence and replaces any new model that I load from the Home page, the chat pages
// and the Mentes page, it always reverts to the chosen model from the Lector page".
//   node rig/t_776_keep_choice.js <Ingenium page url>
// The engine is played by a stand-in (no model file can run here): it loads and unloads as the real one reports, by its status.
const pw = require('/opt/node-tools/node_modules/playwright');
const [URL_] = process.argv.slice(2);
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.evaluate(() => {
    state.models = (state.models || []).concat([{ id: 'm-hers', customName: 'Her model', name: 'Her model', fileState: 'ready', size: 2e9, sizeBytes: 2e9, ctx: 8192 },
      { id: 'm-lector', customName: 'Lector model', name: 'Lector model', fileState: 'ready', size: 5e9, sizeBytes: 5e9, ctx: 8192 }]);
    /* the stand-in engine */
    Engine.load = function (m) { const self = this; self.setStatus('loading'); return new Promise(r => setTimeout(() => { self.modelId = m.id; self.setStatus('ready'); r(); }, 120)); };
    Engine.unload = function () { this.modelId = null; this.setStatus('disconnected'); return Promise.resolve(); };
    setActive('m-hers', { fromUser: true }); });
  await p.evaluate(() => ingEnsureLoaded(state.models.find(m => m.id === 'm-hers'))); await sleep(200);
  const a = await p.evaluate(() => ({ active: state.activeModelId, engine: Engine.modelId, pill: (document.getElementById('activeModelName') || {}).textContent }));
  ok(a.active === 'm-hers' && a.engine === 'm-hers', 'her chosen model is loaded and chosen', a);
  // a page (Lector, Vocatio, Ingenia, Fabrica) loads the model it writes with
  await p.evaluate(() => ingEnsureLoaded(state.models.find(m => m.id === 'm-lector'))); await sleep(300);
  const c = await p.evaluate(() => ({ active: state.activeModelId, engine: Engine.modelId, pill: (document.getElementById('activeModelName') || {}).textContent }));
  ok(c.engine === 'm-lector', 'the page\'s model is loaded for the page\'s work', c);
  ok(c.active === 'm-hers' && /Her model/.test(c.pill || ''), 'her choice stays hers: the top bar, Home and the chat still name her model', c);
  // she writes in the chat: her model is loaded again for it
  await p.evaluate(() => ingEnsureLoaded(supModel())); await sleep(300);
  const d = await p.evaluate(() => ({ active: state.activeModelId, engine: Engine.modelId }));
  ok(d.engine === 'm-hers' && d.active === 'm-hers', 'the chat loads her model again when she next writes', d);
  // a second load asked while one is under way waits for it, then follows
  const e = await p.evaluate(() => { const L = state.models.find(m => m.id === 'm-lector'), H = state.models.find(m => m.id === 'm-hers');
    return Promise.all([ingEnsureLoaded(L), new Promise(r => setTimeout(r, 30)).then(() => ingEnsureLoaded(H))]).then(() => ({ engine: Engine.modelId, active: state.activeModelId }), x => ({ err: String(x && x.message || x) })); });
  ok(e.engine === 'm-hers' && e.active === 'm-hers', 'two loads asked one after the other both finish, in order, and her choice stays', e);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
