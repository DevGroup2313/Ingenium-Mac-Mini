// Ingenium 7.39: one Reply, Memory and Effort for each model, the same in every place, and a record of every change and of any reset
// (modules/r249.js IngGen.note, r233.js, r225.js, r321.js; her approved preview, source/previews/model_limits).
//   node rig/t_739_limits.js <page url>
// What 7.38 did (the probe this test grew from): Reply 2,048 set in Lector was written on the model only, and the next change of who
// answers put back Chat's older 8,192. Checks: a change in Chat is kept for that model and logged with its place; Lector shows the same
// key in place of its two menus; a change made there is the change in Chat, and survives a change of model and back; a zero is refused
// and logged as a reset caught; a lost value is mended to its last good one, and logged; Lector's Effort is the model's own; the key's
// sheet sets Reply and Effort and the key shows them; Settings, Models and AI has each model's key and the record; Fabrica has the key;
// all of it is still there after a reload; the key lifts under the pointer, and the sheet stays inside a phone's screen.
const pw = require('/opt/node-tools/node_modules/playwright');
const URL = process.argv[2];
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
async function ready(p) { await p.waitForFunction(() => window.__ingReady === true && window.IngGenKey && window.IngGen && IngGen.version >= 2, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p = await ctx.newPage(); p.setDefaultTimeout(300000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL, { timeout: 600000 }); await ready(p);
  const r = await p.evaluate(async () => { const w = ms => new Promise(r => setTimeout(r, ms)); const o = {};
    state.models = ['mA', 'mB'].map(id => ({ id, customName: 'Model ' + id.slice(1), fileName: id + '.Q4_K_M.gguf', sizeBytes: 4e9, type: 'GGUF', fileState: 'ready', stored: true, paramB: 8, tokens: 1024, ctx: 8192, effort: 3, ctxTrain: 131072 }));
    state.activeModelId = 'mA'; state.cloud = null; state.gen = { v: 1, by: {}, last: null }; state.effort = Object.assign(state.effort || {}, { auto: false }); state.wEff = '3'; saveState(); await w(600);
    go('chat'); await w(900);
    const t = document.getElementById('ctlTokens'); t.value = '8192'; t.dispatchEvent(new Event('input')); await w(400);
    const L0 = IngGen.log();
    o.chat = { model: state.models[0].tokens, rec: (state.gen.by['m:mA'] || {}).tokens, log: L0[0] && { f: L0[0].f, from: L0[0].from, to: L0[0].to, p: L0[0].p } };
    // Lector: the key in place of the two menus
    go('lector'); await w(900);
    const wl = document.createElement('div'); wl.className = 'wlim'; wl.setAttribute('data-wlim', 'lector'); document.getElementById('page-lector').appendChild(wl); IngLimits.paintAll(); await w(100);
    o.lectorStrip = { key: !!wl.querySelector('.gk'), selects: wl.querySelectorAll('select').length, text: (wl.querySelector('.gk') || {}).textContent || '' };
    IngLimits.setLimit(state.models[0], 'tokens', 2048); await w(300);
    const L1 = IngGen.log()[0];
    o.lector = { model: state.models[0].tokens, rec: state.gen.by['m:mA'].tokens, chat: t.value, log: L1 && { f: L1.f, from: L1.from, to: L1.to, p: L1.p }, key: (wl.querySelector('.gk') || {}).textContent || '' };
    // a change of model and back
    state.activeModelId = 'mB'; saveState(); await w(700); o.onB = t.value; state.activeModelId = 'mA'; saveState(); await w(900);
    o.back = { model: state.models[0].tokens, chat: t.value, rec: state.gen.by['m:mA'].tokens };
    // a zero, refused
    const n0 = IngGen.log().length; const z = IngGen.note('m:mA', 'tokens', 0, 'Code'); const L2 = IngGen.log()[0];
    o.zero = { took: z, rec: state.gen.by['m:mA'].tokens, chat: t.value, grew: IngGen.log().length - n0, log: L2 && { reset: L2.reset, p: L2.p, to: L2.to } };
    // a lost value, mended to its last good one
    state.gen.by['m:mA'].ctx = 0; state.models[0].ctx = 0; state.activeModelId = 'mB'; saveState(); await w(700); state.activeModelId = 'mA'; saveState(); await w(900);
    const L3 = IngGen.log().filter(e => e.reset && e.f === 'ctx')[0];
    o.lost = { rec: state.gen.by['m:mA'].ctx, model: state.models[0].ctx, slider: +document.getElementById('ctlCtx').value, log: L3 && { why: L3.why, to: L3.to } };
    // Lector's Effort: the model's own
    IngWriteEffort.set('5'); await w(300);
    o.lxEff = { rec: state.gen.by['m:mA'].effort, chatEff: document.getElementById('ctlEffort').value, get: IngWriteEffort.get(), wEff: state.wEff };
    return o; });
  ok(r.chat.model === 8192 && r.chat.rec === 8192 && r.chat.log && r.chat.log.f === 'tokens' && r.chat.log.to === 8192 && r.chat.log.p === 'Chat', 'a Reply set in Chat is kept for that model, and the record names Chat', r.chat);
  ok(r.lectorStrip.key && r.lectorStrip.selects === 0 && /Reply 8K/.test(r.lectorStrip.text), "Lector shows the same key in place of its two menus, with the model's own numbers", r.lectorStrip);
  ok(r.lector.model === 2048 && r.lector.rec === 2048 && r.lector.chat === '2048' && r.lector.log && r.lector.log.p === 'Lector' && r.lector.log.from === 8192, 'a Reply set in Lector is the same change in Chat, and the record names Lector', r.lector);
  ok(/Reply 2K/.test(r.lector.key), "Lector's key shows the new Reply at once", r.lector.key);
  ok(r.back.model === 2048 && r.back.chat === '2048' && r.back.rec === 2048, "after a change of model and back, Lector's 2,048 holds (7.38 put back 8,192)", r.back);
  ok(r.zero.took === false && r.zero.rec === 2048 && r.zero.chat === '2048' && r.zero.grew === 1 && r.zero.log.reset === true && r.zero.log.p === 'Code' && r.zero.log.to === 2048, 'a zero is never taken: the last good value is kept, and a reset caught is recorded with its place', r.zero);
  ok(r.lost.rec > 0 && r.lost.model > 0 && r.lost.slider > 0 && r.lost.log && r.lost.log.why === 'a lost value', 'a lost Memory is mended to its last good one, and the record says so', r.lost);
  ok(r.lxEff.rec === 5 && r.lxEff.chatEff === '5' && r.lxEff.get === '5', "Lector's Effort is the model's own: set there, it is Chat's Effort for the same model", r.lxEff);
  // the key's sheet, in Chat
  await p.evaluate(() => go('chat')); await p.waitForTimeout(900);
  const k0 = await p.evaluate(() => { const k = document.getElementById('chatGenKey'); return k ? { text: k.textContent, vis: !!k.offsetParent } : null; });
  ok(k0 && k0.vis && /Reply 2K/.test(k0.text) && /Effort Max/.test(k0.text), 'the key is beside the model in Chat, with the same numbers', k0);
  const keyEl = p.locator('#chatGenKey'); const t0 = await keyEl.evaluate(e => getComputedStyle(e).transform); await keyEl.hover(); await p.waitForTimeout(450);
  const t1 = await keyEl.evaluate(e => getComputedStyle(e).transform); await p.mouse.move(5, 5); await p.waitForTimeout(450); const t2 = await keyEl.evaluate(e => getComputedStyle(e).transform);
  ok(t0 === 'none' && t1 !== 'none' && t2 === 'none', 'the key keeps its look at rest and lifts under the pointer', { t0, t1, t2 });
  await keyEl.click(); await p.waitForTimeout(500);
  const pop = await p.evaluate(() => { const q = document.querySelector('.gk-pop'); return q ? { ranges: q.querySelectorAll('input[type=range]').length, eff: [...q.querySelectorAll('.gk-seg button')].map(x => x.textContent), on: (q.querySelector('.gk-seg [aria-pressed="true"]') || {}).textContent, same: /The same in every place/.test(q.textContent) } : null; });
  ok(pop && pop.ranges === 2 && pop.eff.join() === 'Low,Medium,High,Extra,Max' && pop.on === 'Max' && pop.same, 'pressed, it opens Reply, Memory and Effort for this model', pop);
  await p.locator('.gk-pop .gk-seg button', { hasText: 'Low' }).click(); await p.waitForTimeout(300);
  await p.evaluate(() => { const i = document.getElementById('gkReply'); i.value = '4096'; i.dispatchEvent(new Event('change')); }); await p.waitForTimeout(400);
  const s1 = await p.evaluate(() => ({ eff: state.gen.by['m:mA'].effort, chatEff: document.getElementById('ctlEffort').value, tok: state.gen.by['m:mA'].tokens, chatTok: document.getElementById('ctlTokens').value, key: document.getElementById('chatGenKey').textContent, auto: !!(state.effort && state.effort.auto), lx: IngWriteEffort.get(), last: IngGen.log().slice(0, 2).map(e => e.f + ':' + e.from + '>' + e.to + '@' + e.p) }));
  ok(s1.eff === 1 && s1.chatEff === '1' && s1.tok === 4096 && s1.chatTok === '4096' && /Reply 4K/.test(s1.key) && /Effort Low/.test(s1.key) && s1.lx === '1', "the sheet's Effort and Reply are the model's, in Chat's Controls, the key and Lector alike", s1);
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  ok(await p.evaluate(() => !document.querySelector('.gk-pop')), 'Escape closes the sheet');
  await keyEl.click(); await p.waitForTimeout(400); await p.locator('#gkReply').focus(); await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  const esc2 = await p.evaluate(() => !document.querySelector('.gk-pop'));
  await keyEl.click(); await p.waitForTimeout(400); await p.evaluate(() => go('lector')); await p.waitForTimeout(400);
  ok(esc2 && await p.evaluate(() => !document.querySelector('.gk-pop')), 'Escape closes it from a slider too, and a change of page closes it');
  // Settings, Models and AI
  await p.evaluate(() => { go('settings'); try { IngRooms.open('settings', 'ai', true); } catch (e) {} try { IngSettingsParts.show('ai', 'you'); } catch (e) {} }); await p.waitForTimeout(900);
  const card = await p.evaluate(() => { const c = document.getElementById('genLogCard'); if (!c) return null; return { vis: !!c.offsetParent, models: c.querySelectorAll('.gl-m .gk').length, ents: c.querySelectorAll('.gl-e').length, amb: c.querySelectorAll('.gl-e.amb').length, text: c.textContent.slice(0, 900) }; });
  ok(card && card.vis && card.models === 2 && card.ents >= 6 && card.amb >= 2 && /A reset caught/.test(card.text) && /in Lector, and so in every place/.test(card.text), 'Settings, Models and AI has each model with its key, and every change and any reset', card);
  // Fabrica
  await p.evaluate(() => go('fabrica')); await p.waitForTimeout(900);
  const fb = await p.evaluate(() => { const k = document.getElementById('fbGenKey'); return k ? { text: k.textContent, vis: !!k.offsetParent } : null; });
  ok(fb && /Reply 4K/.test(fb.text) && /Effort Low/.test(fb.text), 'Fabrica has the same key, for the model Chat and Code use there', fb);
  // after a reload
  await p.reload({ timeout: 600000 }); await ready(p);
  const after = await p.evaluate(() => ({ tok: state.gen.by['m:mA'] && state.gen.by['m:mA'].tokens, eff: state.gen.by['m:mA'] && state.gen.by['m:mA'].effort, log: IngGen.log().length, chat: document.getElementById('ctlTokens').value }));
  ok(after.tok === 4096 && after.eff === 1 && after.log >= 6 && after.chat === '4096', 'all of it is still there after a reload', after);
  // night, and a phone's screen
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); go('chat'); }); await p.waitForTimeout(700);
  const night = await p.evaluate(() => { const k = document.getElementById('chatGenKey'); return k ? getComputedStyle(k).color : ''; });
  ok(night === 'rgb(183, 156, 230)', 'by night the key takes the night colours', night);
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(500);
  await p.evaluate(() => { const k = document.getElementById('chatGenKey'); if (k) k.click(); }); await p.waitForTimeout(500);
  const ph = await p.evaluate(() => { const q = document.querySelector('.gk-pop'); if (!q) return null; const r = q.getBoundingClientRect(); return { l: r.left, r: r.right, t: r.top, b: r.bottom, vw: innerWidth, vh: innerHeight, sx: document.documentElement.scrollWidth }; });
  ok(ph && ph.l >= 16 && ph.r <= ph.vw - 16 && ph.t >= 0 && ph.b <= ph.vh && ph.sx <= ph.vw, "on a phone the sheet stays inside the screen, with no sideways scrolling", ph);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
