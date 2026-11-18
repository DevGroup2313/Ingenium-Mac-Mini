// Ingenium 7.41: the controls key (r325), agreeing to the terms (r326), your ways of working (r327); her approved preview
// (source/previews/v741, https://claude.ai/artifact/S7Rwqc72usWw7Ly138jeSz) with her changes.
//   node rig/t_741.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); p.setDefaultTimeout(120000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngModelKey && window.IngTermsGate && window.IngWays, null, { timeout: 600000, polling: 500 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.models = [{ id: 'mA', customName: 'Qwen3.5 9B', fileName: 'a.gguf', sizeBytes: 5e9, type: 'GGUF', fileState: 'ready', stored: true, paramB: 9, tokens: 4096, ctx: 16384, effort: 2, ctxTrain: 131072 }]; state.activeModelId = 'mA'; saveState(); });
  // 1. the controls key: beside Learn (Vocatio), beside Bring one in (Fabrica), by the title (Lector, Ingenia)
  const at = {};
  for (const pg of ['career', 'fabrica', 'lector', 'folders']) { await p.evaluate(g => go(g), pg); await p.waitForTimeout(2600);
    at[pg] = await p.evaluate(() => { const k = [...document.querySelectorAll('.mk3')].find(x => x.offsetParent); if (!k) return null; const pr = k.previousElementSibling;
      return { id: k.id, beside: pr ? pr.textContent.trim() : '', inTitle: !!k.closest('.mk3-title'), title: (k.closest('.mk3-title') || {}).textContent ? k.closest('.mk3-title').textContent.trim() : '' }; }); }
  ok(at.career && at.career.beside === 'Learn', 'Vocatio: the controls key stands beside the Learn tab', at.career);
  ok(at.fabrica && /Bring one in/.test(at.fabrica.beside), 'Fabrica: the controls key stands beside Bring one in', at.fabrica);
  ok(at.lector && !at.lector.inTitle && /Add your apps/.test(at.lector.beside) && at.folders && !at.folders.inTitle && /Bring in your work/.test(at.folders.beside), 'Lector and Ingenia (7.42, her words): not by the title; after Add your apps and after Bring in your work', { lector: at.lector, folders: at.folders });
  await p.evaluate(() => go('career')); await p.waitForTimeout(1200); const key = p.locator('#mk3Vocatio');
  const t0 = await key.evaluate(e => getComputedStyle(e).transform); await key.hover(); await p.waitForTimeout(450); const t1 = await key.evaluate(e => getComputedStyle(e).transform);
  ok(t0 === 'none' && t1 !== 'none', 'the key keeps its look at rest and lifts under the pointer', { t0, t1 });
  await key.click(); await p.waitForTimeout(500);
  const pop = await p.evaluate(() => { const q = document.querySelector('.gk-pop'); return q ? { h: q.querySelector('h3').textContent, ranges: q.querySelectorAll('input[type=range]').length, eff: q.querySelectorAll('.gk-seg button').length } : null; });
  ok(pop && /Qwen3\.5 9B/.test(pop.h) && pop.ranges === 2 && pop.eff === 5, "pressed, it opens Reply, Memory and Effort for the page's model", pop);
  await p.keyboard.press('Escape'); await p.screenshot({ path: OUT + '/vocatio_key.png' });
  ok(await p.evaluate(() => !document.querySelector('#page-career .wef, #page-career .wlim, #cs > .c-lims') || ![...document.querySelectorAll('#page-career .wef, #page-career .wlim, #cs > .c-lims')].some(x => x.offsetParent)), 'nothing else of Reply, Memory or Effort shows on Vocatio');
  // 2. the terms: a copy that is not the master asks, with the full terms and notice
  const masterAsks = await p.evaluate(() => IngTermsGate.need()); ok(masterAsks === false, 'her master copy does not ask her', masterAsks);
  await p.evaluate(() => { IngTerms.mine = () => false; }); await p.waitForTimeout(3600);
  const g0 = await p.evaluate(() => ({ open: !!document.querySelector('.tg'), agreeOff: (document.getElementById('tgAgree') || {}).disabled, tabs: [...document.querySelectorAll('.tg-tab')].map(t => t.textContent) }));
  ok(g0.open && g0.agreeOff === true && g0.tabs.join() === 'In short,Terms of use,Privacy notice', 'another copy asks first: In short, the Terms of use and the Privacy notice; I agree waits for the tick', g0);
  const full = await p.evaluate(async () => { const w = ms => new Promise(r => setTimeout(r, ms)); const tabs = document.querySelectorAll('.tg-tab'); tabs[1].click(); await w(200);
    const terms = document.querySelectorAll('.tg-read .tp-sec').length; document.querySelectorAll('.tg-tab')[2].click(); await w(200); const priv = document.querySelectorAll('.tg-read .tp-sec').length; return { terms, priv }; });
  ok(full.terms >= 10 && full.priv >= 8, 'the full Terms of use (every section) and the full Privacy notice can be read in the sheet', full);
  await p.screenshot({ path: OUT + '/terms_sheet.png' });
  const blocked = await p.evaluate(() => { const r = document.querySelector('.tg-veil').getBoundingClientRect(); const e = document.elementFromPoint(innerWidth - 30, innerHeight / 2); return { covers: r.width >= innerWidth - 1 && r.height >= innerHeight - 1, topIsVeil: !!(e && e.closest('.tg-veil')) }; });
  ok(blocked.covers && blocked.topIsVeil, 'nothing behind the sheet can be reached until it is answered', blocked);
  await p.keyboard.press('Escape'); ok(await p.evaluate(() => !!document.querySelector('.tg')), 'Escape does not close it');
  await p.locator('.tg .tg-key', { hasText: 'Decline' }).click(); await p.waitForTimeout(300);
  const dec = await p.evaluate(() => ({ text: (document.querySelector('.tg') || {}).textContent || '', rec: state.terms && state.terms.agreed }));
  ok(/Ingenium stays closed/.test(dec.text) && !dec.rec, 'Decline: Ingenium stays closed, nothing is recorded, the terms can be read again', dec.text.slice(0, 80));
  await p.locator('.tg .tg-key', { hasText: 'Read the terms again' }).click(); await p.waitForTimeout(300);
  await p.locator('#tgTick').check(); await p.locator('#tgAgree').click(); await p.waitForTimeout(400);
  const ag = await p.evaluate(() => ({ open: !!document.querySelector('.tg'), rec: state.terms && state.terms.agreed, need: IngTermsGate.need() }));
  ok(!ag.open && ag.rec && /18 November 2026/.test(ag.rec.v) && ag.rec.at > 0 && ag.need === false, 'I agree: the sheet closes; the version, date and copy are kept on this device', ag);
  await p.evaluate(() => { go('settings'); try { IngRooms.open('settings', 'own', true); } catch (e) {} IngTerms.paint(); }); await p.waitForTimeout(3500);
  const line = await p.evaluate(() => (document.querySelector('#termsCard .tp-agreed') || {}).textContent || '');
  ok(/You agreed to these terms/.test(line), 'Settings, Ownership says when this copy agreed', line);
  await p.evaluate(() => { delete IngTerms.mine; });
  // 3. your ways of working
  const w0 = await p.evaluate(() => ({ n: IngWays.list().length, first: IngWays.list()[0].t, layer: /Their ways of working/.test(ingPersonLayer(false)) && /AuDHD accessibility at the root of everything/.test(ingPersonLayer(false)) }));
  ok(w0.n === 9 && /alive/.test(w0.first) && w0.layer, 'her master copy holds her nine rules, and every model reads them', w0);
  await p.evaluate(() => go('folders')); await p.waitForTimeout(1500);
  const f0 = await p.evaluate(() => { const c = document.getElementById('waysIngenia'); return c ? { folded: !c.querySelector('.wy-list'), n: (c.querySelector('.wy-fold .n') || {}).textContent } : null; });
  ok(f0 && f0.folded && f0.n === '9', 'in Ingenia it waits folded, its count on its key', f0);
  await p.locator('#waysIngenia .wy-fold').click(); await p.waitForTimeout(400);
  await p.locator('#waysIngenia .wy-add input').fill('Keys answer the pointer, never flat'); await p.locator('#waysIngenia .wy-add button').click(); await p.waitForTimeout(300);
  const a1 = await p.evaluate(() => ({ n: IngWays.list().length, last: IngWays.list().slice(-1)[0].t, layer: /Keys answer the pointer, never flat/.test(ingPersonLayer(false)) }));
  ok(a1.n === 10 && a1.layer, 'a rule she adds is kept and read by every model at once', a1);
  await p.evaluate(() => { const rows = document.querySelectorAll('#waysIngenia .wy-row'); rows[rows.length - 1].querySelector('[aria-label^="Move up"]').click(); }); await p.waitForTimeout(200);
  const mv = await p.evaluate(() => IngWays.list()[8].t); ok(mv === 'Keys answer the pointer, never flat', 'Move up moves it', mv);
  const row = p.locator('#waysIngenia .wy-sw').first(); const r0 = await row.evaluate(e => getComputedStyle(e).transform); await row.hover(); await p.waitForTimeout(400); const r1 = await row.evaluate(e => getComputedStyle(e).transform);
  ok(r0 === 'none' && r1 !== 'none', 'Where they apply: each row lifts under the pointer (not flat)', { r0, r1 });
  await p.evaluate(() => document.querySelectorAll('#waysIngenia .wy-tg')[0].click()); await p.waitForTimeout(200);
  ok(await p.evaluate(() => !/Their ways of working/.test(ingPersonLayer(false))), 'switched off, models outside her app work no longer read them');
  await p.evaluate(() => document.querySelectorAll('#waysIngenia .wy-tg')[0].click());
  await p.screenshot({ path: OUT + '/ways_ingenia.png' });
  await p.evaluate(() => { go('settings'); try { IngRooms.open('settings', 'ai', true); } catch (e) {} try { IngSettingsParts.show('ai', 'you'); } catch (e) {} }); await p.waitForTimeout(1200);
  ok(await p.evaluate(() => { const c = document.getElementById('waysCard'); return !!(c && c.offsetParent && c.querySelectorAll('.wy-row').length === 10); }), 'Settings, Your Ingenium shows the same list');
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
