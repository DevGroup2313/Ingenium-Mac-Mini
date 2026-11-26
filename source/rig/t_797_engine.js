// node rig/t_797_engine.js <page url>
// Ingenium 7.97 (modules/r374.js): the Engine panel, opened from the top bar, puts Unload (naming the model in use) and Load first, right
// under the card that names the model, before the list of models; with no model in use, Load names the chosen model. A pretend model.
const pw = require('/opt/node-tools/node_modules/playwright');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 300))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 960 } })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 160)));
  await p.goto(process.argv[2], { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  for (let i = 0; i < 2; i++) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(900); }
  await p.evaluate(() => { const t = Date.now(); state.models.push({ id: 'pv-b', name: 'LFM2.5 1.2B Instruct', customName: 'Velox', fileName: 'LFM2.5-1.2B-Instruct-Q4_K_M.gguf', fileState: 'ready', params: 1.2, added: t }); setActive('pv-b'); });
  const open = () => p.evaluate(() => { const k = [...document.querySelectorAll('button,[role=button]')].find((x) => x.offsetParent && /^Engine/.test(x.textContent.trim())); if (k) k.click(); return !!k; });
  ok(await open(), 'the top bar has the Engine key'); await sleep(1200);
  let r = await p.evaluate(() => { const b = document.getElementById('ieBody'); if (!b) return null; const kids = [...b.children]; const st = kids.findIndex((x) => x.id === 'ieState'), ks = kids.findIndex((x) => x.classList.contains('ie-keys-top')), list = kids.findIndex((x) => x.classList.contains('ie-list'));
    const keys = [...(kids[ks] || { querySelectorAll: () => [] }).querySelectorAll('button')].map((x) => x.textContent.trim()); return { st, ks, list, keys }; });
  ok(r && r.ks === r.st + 1 && r.ks < r.list, 'Load and Unload stand right under the card that names the model, before the list', r);
  ok(r && /^Load Velox$/.test(r.keys[0] || ''), 'resting, Load names the chosen model and comes first', r && r.keys);
  await p.keyboard.press('Escape'); await sleep(500);
  await p.evaluate(() => { const m = state.models.find((x) => x.id === 'pv-b'); try { Engine.status = 'ready'; Engine.modelId = m.id; DeskAdapter.loaded = m; } catch (e) {} });
  await open(); await sleep(1200);
  r = await p.evaluate(() => { const ks = document.querySelector('#ieBody .ie-keys-top'); return ks ? [...ks.querySelectorAll('button')].map((x) => ({ t: x.textContent.trim(), d: x.disabled })) : null; });
  ok(r && /^Unload Velox$/.test(r[0].t), 'with a model in use, Unload, naming it, comes first', r);
  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
