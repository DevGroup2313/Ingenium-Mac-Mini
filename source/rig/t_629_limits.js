// Ingenium 6.29 (5 November 2026): a model's reply length and memory, remembered, and set wherever it works (modules/r233.js). Her
// report: the Tokens and Context controls "reset", and she wants to set them, and the effort, on every page that runs a model. On
// 6.24 a model with no saved limits was shown (and run with) the sliders' midpoints, 16,512 and 17,408; the Models page's Settings
// saved those, and cut a saved memory of 65,536 to 32,768. Stand-in model cards only (no model files); invented names.
//   node rig/t_629_limits.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngLimits, null, { timeout: 300000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  const put = (list, active) => p.evaluate(([list, active]) => { state.models = list.map(r => Object.assign({ customName: r.id, fileName: r.id + '.Q4_K_M.gguf', sizeBytes: 4e9, type: 'GGUF', fileState: 'ready', stored: true, color: '#888', paramB: 8 }, r)); state.activeModelId = active; saveState(); }, [list, active]);
  const chat = () => p.evaluate(() => { go('chat'); try { refreshChatNote(); } catch (e) {} const v = id => (document.getElementById(id) || {}).value; return { tokens: v('ctlTokens'), ctx: v('ctlCtx') }; });

  // 1. a model with no saved limits: the app's defaults, saved on the model, never a slider's midpoint
  await put([{ id: 'mNone' }], 'mNone');
  const c1 = await chat(); const m1 = await p.evaluate(() => ({ t: state.models[0].tokens, c: state.models[0].ctx, e: state.models[0].effort }));
  ok(m1.t === 1024 && m1.c === 8192 && m1.e === 3, 'a model with no saved limits gets 1,024 and 8,192 (and effort 3), saved on the model', m1);
  ok(c1.tokens === '1024' && c1.ctx === '8192', 'Chat\'s Controls show them, not the sliders\' midpoints (16,512 and 17,408 on 6.24)', c1);
  // 2. zero and broken numbers are mended; a small model's own small memory is kept
  await put([{ id: 'mZero', tokens: 0, ctx: 0, effort: 0 }, { id: 'mNaN', tokens: 'x', ctx: null }, { id: 'mTiny', tokens: 256, ctx: 256, ctxTrain: 256 }], 'mZero');
  await chat(); const m2 = await p.evaluate(() => { IngLimits.mendAll(); return state.models.map(m => [m.id, m.tokens, m.ctx]); });
  ok(JSON.stringify(m2) === JSON.stringify([['mZero', 1024, 8192], ['mNaN', 1024, 8192], ['mTiny', 256, 256]]), 'zero and broken limits are mended; a trained 256 memory is kept as it is', m2);
  // 3. the Models page's Settings shows and keeps every saved value
  await put([{ id: 'mBig', tokens: 6144, ctx: 65536, effort: 4 }, { id: 'mBlank' }], 'mBig');
  const d3 = await p.evaluate(() => { go('models'); editModel('mBig'); const q = id => document.getElementById(id); const shown = { t: q('emTokens').value, c: q('emCtx').value, tv: q('emTokensV').textContent, cv: q('emCtxV').textContent };
    q('emSave').click(); const m = state.models.find(x => x.id === 'mBig'); return { shown, saved: [m.tokens, m.ctx, m.effort] }; });
  ok(d3.shown.t === '6144' && d3.shown.c === '65536' && /6144|6,144/.test(d3.shown.tv) && /65536|65,536/.test(d3.shown.cv), 'Settings shows a saved 6,144 and 65,536 as they are', d3.shown);
  ok(JSON.stringify(d3.saved) === JSON.stringify([6144, 65536, 4]), 'saving Settings unchanged keeps them (6.24 wrote 32,768)', d3.saved);
  const d4 = await p.evaluate(() => { try { closeModal(); } catch (e) {} editModel('mBlank'); const q = id => document.getElementById(id); const shown = [q('emTokens').value, q('emCtx').value]; q('emSave').click(); const m = state.models.find(x => x.id === 'mBlank'); return { shown, saved: [m.tokens, m.ctx] }; });
  ok(JSON.stringify(d4.shown) === JSON.stringify(['1024', '8192']) && JSON.stringify(d4.saved) === JSON.stringify([1024, 8192]), 'Settings for a model with no saved limits shows and saves the defaults, not 16,512 and 17,408', d4);
  try { await p.evaluate(() => { try { closeModal(); } catch (e) {} }); } catch (e) {}
  // 4. Reply and Memory beside Effort on Lector, the Career Studio and Folders, for the model that page writes with
  await put([{ id: 'mPage', customName: 'Stand-in 8B', tokens: 2048, ctx: 16384, effort: 3 }], 'mPage');
  const pages = {};
  for (const [pg, sel] of [['lector', '#lx7'], ['career', '#cs'], ['folders', '#page-folders']]) {
    /* Folders shows Effort (and now Reply and Memory) in a folder's "Where we left off" card: open an invented folder */
    if (pg === 'folders') await p.evaluate(() => { const f = IngFolders.make('Example App'); state.folders.ui.open = f.id; saveState(); });
    await p.evaluate((pg) => { go(pg); if (pg === 'folders') try { IngFolders.paint(); } catch (e) {} }, pg); await p.waitForTimeout(1200);
    pages[pg] = await p.evaluate((sel) => { const root = document.querySelector(sel) || document; const w = root.querySelector('.wlim'); if (!w) return { strip: false, wef: !!root.querySelector('.wef') };
      const ss = [...w.querySelectorAll('select')]; return { strip: true, besideEffort: !!(w.previousElementSibling && w.previousElementSibling.classList.contains('wef')), reply: ss[0] && ss[0].value, memory: ss[1] && ss[1].value, say: (w.querySelector('.wlim-say') || {}).textContent || '' }; }, sel);
  }
  ok(['lector', 'career', 'folders'].every(k => pages[k].strip && pages[k].besideEffort && pages[k].reply === '2048' && pages[k].memory === '16384'), 'Lector, the Career Studio and Folders each show Reply and Memory beside Effort, with the model\'s own numbers', pages);
  await p.evaluate(() => go('lector')); await p.waitForTimeout(800);
  await p.locator('#lx7 .wlim').first().screenshot({ path: OUT + '/629_lector_strip.png' }).catch(() => {});
  // 5. a change on a page is the same change everywhere, and remembered per model
  const ch = await p.evaluate(() => { const w = document.querySelector('#lx7 .wlim'); const ss = w.querySelectorAll('select');
    ss[1].value = '32768'; ss[1].dispatchEvent(new Event('change', { bubbles: true })); ss[0].value = '4096'; ss[0].dispatchEvent(new Event('change', { bubbles: true }));
    const m = state.models[0]; go('chat'); try { refreshChatNote(); } catch (e) {} return { model: [m.tokens, m.ctx, !!m.ctxUser], chat: [document.getElementById('ctlTokens').value, document.getElementById('ctlCtx').value] }; });
  ok(JSON.stringify(ch.model) === JSON.stringify([4096, 32768, true]) && JSON.stringify(ch.chat) === JSON.stringify(['4096', '32768']), 'set on Lector, the model keeps 4,096 and 32K, and Chat\'s Controls show the same', ch);
  const back = await p.evaluate(() => { go('career'); return new Promise(r => setTimeout(() => { const w = document.querySelector('#cs .wlim'); const ss = w ? w.querySelectorAll('select') : []; r(ss.length ? [ss[0].value, ss[1].value] : null); }, 900)); });
  ok(JSON.stringify(back) === JSON.stringify(['4096', '32768']), 'and the Career Studio shows the same numbers', back);
  await p.reload(); await p.waitForFunction(() => window.__ingReady === true && window.IngLimits, null, { timeout: 300000 }); await p.waitForTimeout(1200);
  const kept = await p.evaluate(() => [state.models[0].tokens, state.models[0].ctx]);
  ok(JSON.stringify(kept) === JSON.stringify([4096, 32768]), 'after a reload they are still 4,096 and 32,768', kept);
  // 6. the reply length is used: a longer reply where the memory has room, never more than the room, never less than the task asks
  // the page's own lxAsk chain, every wrapper included, with a stand-in for the engine's generate
  const ask2 = await p.evaluate(() => { const got = []; const og = Engine.generate; const oe = window.ingEnsureLoaded;
    Engine.generate = function (o) { got.push(o && o.params && o.params.max_tokens); return Promise.resolve({ text: 'ok' }); };
    window.ingEnsureLoaded = function () { return Promise.resolve(); }; try { ingEnsureLoaded = window.ingEnsureLoaded; } catch (e) {}
    const m = state.models[0]; m.tokens = 4096; m.ctx = 32768; m.fileState = 'ready'; m.stored = true; saveState();   /* a stand-in has no file: after the reload the app marks it so */
    const fails = [];
    const short = [{ role: 'system', content: 'You are Lector, writing a test.' }, { role: 'user', content: 'Say yes.' }];
    const long = [{ role: 'system', content: 'You are Lector, writing a test.' }, { role: 'user', content: 'x'.repeat(95000) }];
    const run = { modelId: m.id };
    const note = e => { fails.push(String(e && e.message || e)); };
    return Promise.resolve().then(() => window.lxAsk(run, short, 700, 0.2, function () {})).catch(note)
      .then(() => window.lxAsk(run, long, 700, 0.2, function () {})).catch(note)
      .then(() => { m.tokens = 512; saveState(); return window.lxAsk(run, short, 700, 0.2, function () {}); }).catch(note)
      .then(() => { Engine.generate = og; return { got, fails }; }); });
  const g2 = ask2.got;
  ok(g2.length === 3 && g2[0] >= 4096 && g2[1] >= 700 && g2[1] < 4096 && g2[2] === 700, 'Lector\'s reply may run to the model\'s 4,096 when it fits; with a long prompt it gets only the room left; a lower setting never cuts what the task asked (700)', ask2);
  ok(!errs.length, 'no errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
