// node rig/t_690_homekeys.js <Ingenium page url> <out dir>
// Ingenium 6.90 (12 November 2026). Her words: "Sometimes the Bring in your model and take the guided tour buttons from the Home page revert
// back to a wider and chunkier look instead of their new designs". The next step's key, through each step (no model, a model chosen and
// not loaded with a short and a long name, a model running), keeps the width of the first step's words, and the two keys are one height;
// the model's name is in the line above; the full words stay for a screen reader. At 1440 and on a phone (390).
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 700) : '')); } }
const meas = p => p.evaluate(() => { const n = document.querySelector('#page-home .hx-next'), b = document.getElementById('heroNext'), t = document.getElementById('homeTour') || [...n.querySelectorAll('.hx-btn')].find(x => /guided tour/.test(x.textContent));
  const r = b.getBoundingClientRect(), q = t.getBoundingClientRect();
  return { key: b.textContent.trim(), aria: b.getAttribute('aria-label') || '', note: (document.getElementById('heroStepNote') || {}).textContent || '', w: Math.round(r.width), h: Math.round(r.height), tw: Math.round(q.width), th: Math.round(q.height), sameRow: Math.abs(r.top - q.top) < 2 }; });
(async () => {
  const b = await pw.chromium.launch();
  for (const [vw, vh] of [[1440, 900], [390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: vw, height: vh } }); const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(600);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('home'); }); await p.waitForTimeout(1200);
    const first = await meas(p);
    const set = (name, running) => p.evaluate(([name, running]) => { const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^mfake/.test(m.id));
      state.models.push({ id: 'mfake', customName: name, fileState: 'ready', fileName: L[Object.keys(L)[0]].file, stored: true }); state.activeModelId = 'mfake';
      if (running) { window.__eng = { s: Engine.status, m: Engine.modelId }; Engine.status = 'ready'; Engine.modelId = 'mfake'; } else if (window.__eng) { Engine.status = __eng.s; Engine.modelId = __eng.m; }
      renderNextStep(); }, [name, running]);
    await set('Qwen3.5 2B', false); await p.waitForTimeout(300); const load = await meas(p);
    await p.screenshot({ path: OUT + '/homekeys_' + vw + '.png' });
    await set('Qwen3 4B Thinking (2507) Q4_K_M', false); await p.waitForTimeout(300); const long = await meas(p);
    await set('Qwen3.5 2B', true); await p.waitForTimeout(300); const run = await meas(p);
    const tag = vw === 1440 ? 'computer' : 'phone';
    ok(/^(Bring in your first model|Get your first model|One-time setup|Add the engine files)/.test(first.key), tag + ': the first step reads as before', first);
    ok(load.key === 'Load your model' && load.aria === 'Load Qwen3.5 2B into the engine' && /^Step 3 of 4 · Qwen3\.5 2B: /.test(load.note), tag + ': a model to load: the key says Load your model, its name in the line above, the full words for a screen reader', load);
    ok(load.w <= first.w + 4 && long.w === load.w && run.w <= first.w + 4, tag + ': the key keeps the first step\'s width, a long model name too (' + [first.w, load.w, long.w, run.w].join(', ') + ' px)', { first, load, long, run });
    ok(run.key === 'Start a chat' && /Qwen3\.5 2B is running/.test(run.note), tag + ': a model running: Start a chat, its name in the line above', run);
    ok([first, load, long, run].every(x => x.h === x.th && x.h <= 36), tag + ': the two keys are one height in every step', [first, load, long, run].map(x => x.h + '/' + x.th));
    if (vw === 1440) ok([first, load, long, run].every(x => x.sameRow), 'computer: side by side in every step', [first, load, long, run].map(x => x.sameRow));
    ok(errs.length === 0, tag + ': no errors on the page', errs);
    await ctx.close();
  }
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
