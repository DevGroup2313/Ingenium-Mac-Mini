// Ingenium 6.23 (5 November 2026): a model installed once (modules/r229.js). Her words: "there are a lot of duplicate models downloaded on
// the Models page of Ingenium, the app does not seem to register when a model has been installed twice". Stand-in model cards only (no
// real model files): a lineup model already here is not fetched again; a file already here is not added again; models installed more
// than once are listed with one key that keeps one of each (the one in use first) and removes the others through removeModel.
//   node rig/t_623_dupes.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  const said = []; await p.evaluate(() => { window.__said = []; const o = window.ingSay; window.ingSay = function (t) { window.__said.push(String(t)); try { return o && o.apply(this, arguments); } catch (e) {} }; });
  // stand-in cards: a lineup model three times, a file of her own twice, and one model once
  const setup = await p.evaluate(() => { const L = ING_LINEUP.models, key = Object.keys(L)[0], sp = L[key];
    const mk = (id, name, file, size, extra) => Object.assign({ id, customName: name, fileName: file, sizeBytes: size, type: 'GGUF', fileState: 'ready', stored: true, color: '#888', effort: 3, tokens: 1024, ctx: 8192 }, extra || {});
    state.models = [mk('mA1', sp.name, sp.file, sp.size), mk('mA2', sp.name + ' (2)', sp.file, sp.size), mk('mA3', sp.name + ' (3)', sp.file, sp.size, { lineup: key }),
      mk('mB1', 'My own model', 'my-own-model.Q4_K_M.gguf', 123456), mk('mB2', 'My own model again', 'my-own-model.Q4_K_M.gguf', 123456), mk('mC1', 'Another model', 'another.Q8_0.gguf', 654321)];
    state.activeModelId = 'mA2'; saveState(); go('models'); renderModels(); return { key, name: sp.name, file: sp.file }; });
  await p.waitForTimeout(800);
  const g = await p.evaluate(() => ({ groups: IngModelDupes.groups().map(l => l.map(m => m.id)), card: !!document.getElementById('ingDupCard'), items: [...document.querySelectorAll('#ingDupCard li')].map(x => x.textContent) }));
  ok(g.groups.length === 2 && g.groups.some(l => l.length === 3) && g.groups.some(l => l.length === 2), 'the same model installed three times, and a file twice, are found as two groups', g.groups);
  ok(g.card && g.items.length === 2 && /3 copies/.test(g.items.join(' ')) && /2 copies/.test(g.items.join(' ')), 'Your models lists them, with how many copies of each', g.items);
  await p.locator('#ingDupCard').screenshot({ path: OUT + '/623_card.png' });
  // a lineup model already here is not fetched again
  const li = await p.evaluate((key) => { window.__said = []; const r = lineupInstall(key); return Promise.resolve(r).then(x => ({ id: x && x.id, jobs: Object.keys(lineupJobs || {}).length, said: window.__said.slice() })); }, setup.key);
  ok(li.id && li.jobs === 0 && li.said.some(s => /already installed here/.test(s)), 'Get on a model already here: nothing is downloaded again, and it says so', li);
  // a file already here is not added again; a new one is
  const ad = await p.evaluate(() => { window.__said = []; const n0 = state.models.length;
    const same = new File([new Uint8Array(123456)], 'my-own-model.Q4_K_M.gguf'); addEntries([{ file: same }]);
    const n1 = state.models.length; const fresh = new File([new Uint8Array(1000)], 'brand-new.Q4_K_M.gguf'); addEntries([{ file: fresh }]);
    return { n0, n1, n2: state.models.length, said: window.__said.slice() }; });
  ok(ad.n1 === ad.n0 && ad.said.some(s => /already installed here/.test(s)), 'a file brought in again (the same name and size) is not added again, and it says so', ad);
  ok(ad.n2 === ad.n0 + 1, 'a new file is still added', ad);
  await p.waitForTimeout(500);
  // the key: keeps one of each (the one in use), after she says yes
  // the stand-in "new" file (a thousand empty bytes) is not a model, and Ingenium's dialog says so: close it first
  await p.evaluate(() => { try { if (typeof closeModal === 'function') closeModal(); } catch (e) {} const r = document.getElementById('modalRoot'); if (r) r.classList.remove('open'); });
  await p.waitForTimeout(300); await p.evaluate(() => renderModels()); await p.waitForTimeout(300);
  await p.click('#ingDupGo'); await p.waitForTimeout(500);
  const dlg = await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.offsetParent && /Remove the extra copies/.test(x.textContent)); return b ? b.textContent : null; });
  ok(!!dlg, 'nothing is removed before she says so: Ingenium asks first', dlg);
  await p.screenshot({ path: OUT + '/623_ask.png' });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.offsetParent && /Remove the extra copies/.test(x.textContent)); b.click(); });
  await p.waitForTimeout(800);
  const after = await p.evaluate(() => ({ ids: state.models.map(m => m.id), active: state.activeModelId, card: !!document.getElementById('ingDupCard'), groups: IngModelDupes.groups().length }));
  ok(after.groups === 0 && !after.card, 'afterwards each model is there once, and the card is gone', after);
  ok(after.ids.includes('mA2') && !after.ids.includes('mA1') && !after.ids.includes('mA3') && after.active === 'mA2', 'the copy in use is the one kept', after);
  ok(after.ids.includes('mB1') && !after.ids.includes('mB2') && after.ids.includes('mC1'), 'of the others, the first is kept; a model installed once is untouched', after);
  await p.evaluate(() => { state.models = []; state.activeModelId = null; saveState(); });
  ok(!errs.length, 'no errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
