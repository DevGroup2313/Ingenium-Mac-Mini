// node rig/t_717_wk_spin.js <page url> <out dir> <label>, then python3 rig/t_717_wk_spin.py <out dir>/<label>_frames.json <sheet.png>
// WebKit (Safari's engine): the Mentes turret spun by its centre, frames captured with each ball's place, to see whether a ball vanishes
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [U, OUT, label] = process.argv.slice(2);
const MODELS = [['m1', 'Scriba', '#6a3fb5', 4.8e9, 4], ['m2', 'Velox', '#3f6bb8', 0.7e9, 1.2], ['m3', 'Magister', '#8a63d2', 5.3e9, 9]];
const rec = (a) => ({ id: a[0], customName: a[1], fileName: a[1].toLowerCase() + '-q4_k_m.gguf', color: a[2], sizeBytes: a[3], paramB: a[4], type: 'GGUF', fileState: 'ready', effort: 3, tokens: 1024, ctx: 8192 });
(async () => { fs.mkdirSync(OUT, { recursive: true });
  const b = await pw.webkit.launch(); const p = await (await b.newContext({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 1 })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  const t0 = Date.now(); await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); console.log('ready in', Math.round((Date.now() - t0) / 1000), 's');
  await p.evaluate((M) => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.theme = 'day'; applyTheme(); state.models = M; state.activeModelId = null; try { saveState(); } catch (e) {} renderModels(); go('models'); document.scrollingElement.scrollTop = 0; }, MODELS.map(rec));
  await p.waitForTimeout(5000); await p.evaluate(() => { const t = document.querySelector('#page-models .tq'); if (t) t.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(1500);
  const info = await p.evaluate(() => ({ lenses: document.querySelectorAll('#page-models .tq-lens').length, balls: document.querySelectorAll('#page-models .tq-lens .tq-ball,#page-models .tq-lens canvas').length }));
  console.log(JSON.stringify(info));
  const box = await p.evaluate(() => { const r = document.querySelector('#page-models .tq').getBoundingClientRect(); return { x: Math.max(0, r.left - 20), y: Math.max(0, r.top - 20), width: r.width + 40, height: r.height + 40 }; });
  const hub = await p.locator('#page-models .tq-hub').boundingBox(); await p.mouse.click(hub.x + hub.width / 2, hub.y + hub.height / 2);
  const frames = []; const tEnd = Date.now() + 4000; let i = 0;
  while (Date.now() < tEnd) { const pos = await p.evaluate(() => [...document.querySelectorAll('#page-models .tq-lens')].map((l) => { const r = l.getBoundingClientRect(); return { cap: l.classList.contains('tq-cap'), x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width }; }));
    const f = `${OUT}/${label}_${String(i).padStart(3, '0')}.png`; await p.screenshot({ path: f, clip: box }); frames.push({ f, pos: pos.map((q) => Object.assign(q, { x: q.x - box.x, y: q.y - box.y })) }); i++; }
  fs.writeFileSync(`${OUT}/${label}_frames.json`, JSON.stringify(frames)); console.log('frames', frames.length, 'errors', errs.length, errs.slice(0, 2).join(' | ')); await b.close(); })().catch((e) => { console.error(String(e).slice(0, 800)); process.exit(2); });
