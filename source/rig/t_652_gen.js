// node rig/t_652_gen.js <Ingenium page url> <out dir>
// Ingenium 6.52 (7 November 2026), in Chromium. Her words (7 November 2026): "I want the Tokens and Context controls to be fixed
// inside of Ingenium, the app always resets it to zero with the models even though I already moved it to a higher capacity earlier,
// it never remembers them and they are all out whack all over the app, I can only regulate it on the chat pages which is not really
// convenient since that I cannot regulate it on the other pages that are running these models and I can't adjust the effort level."
// (modules/r249.js, r244.js). Invented connections only: a stand-in service key that is never sent, and a stand-in model entry.
// Who answers is changed as the app changes it: state.chatSource 'cloud' or 'local' (useConn, useDevice).
//   - nothing set up: Longest reply, Context and Effort set in the chat's Controls are there again after a reload (on 6.51 they went
//     back to 1,024 tokens, 8,192 and Medium);
//   - a connected service: its Longest reply, Effort and memory are there again after a reload;
//   - each model and each service keeps its own: changing who answers brings back that one's settings, both ways;
//   - a model used for the first time starts from the last settings chosen, not from the page's defaults;
//   - the top bar's model key holds How it answers (Effort with Auto, Longest reply with Follows the effort, Context or the service's
//     memory), on any page; what is changed there is what the chat's Controls show, and it is kept;
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 900) : '')); } }
const read = (p) => p.evaluate(() => { const v = id => { const e = document.getElementById(id); return e ? +e.value : null; };
  return { tokens: v('ctlTokens'), ctx: v('ctlCtx'), effort: v('ctlEffort'), cloudWin: +((state.cloud || {}).window || 0), key: window.IngGen ? IngGen.key() : null }; });
const set = (p, id, val) => p.evaluate(([id, val]) => { const e = document.getElementById(id); e.value = String(val); e.dispatchEvent(new Event('input', { bubbles: true })); }, [id, val]);
async function enter(p, pg) { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(900);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(700);
  await p.evaluate(() => { try { const k = [...document.querySelectorAll('button')].find(x => /^Not now$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); } catch (e) {} });
  await p.evaluate((pg) => go(pg || 'chat'), pg); await p.waitForTimeout(1000); }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await enter(p);
  // 1. nothing set up
  const a0 = await read(p);
  await set(p, 'ctlTokens', 8192); await set(p, 'ctlCtx', 16384); await set(p, 'ctlEffort', 4); await p.waitForTimeout(300);
  await p.reload(); await enter(p); const a1 = await read(p);
  ok(a1.tokens === 8192 && a1.ctx === 16384 && a1.effort === 4, 'nothing set up: Longest reply, Context and Effort are there again after a reload', { before: a0, after: a1 });
  // 2. a connected service (a stand-in key, never sent)
  await p.evaluate(() => { state.cloud = Object.assign(state.cloud || {}, { on: true, provider: 'anthropic', model: 'claude-opus-4-1', key: 'sk-ant-test-invented-not-sent' }); state.chatSource = 'cloud'; saveState(); });
  await p.reload(); await enter(p); const b0 = await read(p);
  ok(b0.key === 'c:anthropic|claude-opus-4-1' && b0.tokens === 8192 && b0.effort === 4, 'a service used for the first time starts from the last settings chosen (8,192 tokens, Extra), not the page\'s defaults', b0);
  await set(p, 'ctlTokens', 12288); await set(p, 'ctlEffort', 5);
  await p.evaluate(() => { const s = document.getElementById('ctlCloudCtx'); if (s) { s.value = '131072'; s.dispatchEvent(new Event('change', { bubbles: true })); } else { state.cloud.window = 131072; saveState(); } }); await p.waitForTimeout(300);
  await p.reload(); await enter(p); const b1 = await read(p);
  ok(b1.tokens === 12288 && b1.effort === 5 && b1.cloudWin === 131072, 'a connected service: its Longest reply, Effort and memory are there again after a reload', b1);
  // 3. each keeps its own: a model on this device, then back to the service, then the model again
  await p.evaluate(() => { state.models = state.models || []; state.models.push({ id: 'm_t652', customName: 'Invented test model', fileName: 'invented-q4_k_m.gguf', fileState: 'ready', effort: 3, tokens: 2048, ctx: 4096 }); state.activeModelId = 'm_t652'; state.chatSource = 'local'; saveState(); });
  await p.waitForTimeout(500); const c0 = await read(p);
  ok(c0.key === 'm:m_t652' && c0.tokens === 2048 && c0.ctx === 4096, 'a model on this device with numbers of its own from before brings them back when it answers', c0);
  await set(p, 'ctlTokens', 6144); await set(p, 'ctlCtx', 8192); await set(p, 'ctlEffort', 2); await p.waitForTimeout(300);
  await p.evaluate(() => { state.chatSource = 'cloud'; saveState(); }); await p.waitForTimeout(500); const c1 = await read(p);
  ok(c1.key === 'c:anthropic|claude-opus-4-1' && c1.tokens === 12288 && c1.effort === 5, 'back to the service: its own settings come back (12,288 tokens, Max)', c1);
  await p.evaluate(() => { state.chatSource = 'local'; saveState(); }); await p.waitForTimeout(500); const c2 = await read(p);
  ok(c2.key === 'm:m_t652' && c2.tokens === 6144 && c2.ctx === 8192 && c2.effort === 2, 'and the model again: its own (6,144 tokens, 8,192, Medium)', c2);
  await p.reload(); await enter(p); const c3 = await read(p);
  ok(c3.tokens === 6144 && c3.ctx === 8192 && c3.effort === 2, 'the model\'s settings are there after a reload too', c3);
  // 4. the top bar's model key, from another page
  await p.evaluate(() => { state.chatSource = 'cloud'; saveState(); go('settings'); }); await p.waitForTimeout(700);
  await p.click('#activeModelPill'); await p.waitForTimeout(500);
  const pop = await p.evaluate(() => { const s = document.querySelector('#waPop .gen'); if (!s) return null;
    return { h: (s.querySelector('.gen-h') || {}).textContent, eff: [...s.querySelectorAll('.gen-eff button')].map(b => b.textContent + (b.getAttribute('aria-checked') === 'true' ? '*' : '')),
      tok: !!s.querySelector('#genTokens'), follow: !!s.querySelector('#genFollow'), ctxShown: !(s.querySelector('#genCtx') || {}).hidden, cloudShown: !(s.querySelector('#genCloudCtx') || {}).hidden, words: s.textContent.slice(0, 200) }; });
  ok(pop && pop.h === 'How it answers' && pop.eff.join('|') === 'Auto|Low|Medium|High|Extra|Max*' && pop.tok && pop.follow && pop.cloudShown && !pop.ctxShown,
    'on Settings, the top bar\'s model key holds How it answers: Effort (Auto and the five levels, Max chosen), Longest reply, and the service\'s memory', pop);
  await p.screenshot({ path: OUT + '/how_it_answers.png', clip: { x: 900, y: 0, width: 540, height: 900 } });
  await p.click('#waPop .gen-eff button[data-eff="4"]'); await p.waitForTimeout(300);
  await p.evaluate(() => { const t = document.getElementById('genTokens'); t.value = '20480'; t.dispatchEvent(new Event('input', { bubbles: true })); }); await p.waitForTimeout(300);
  await p.evaluate(() => { const s = document.getElementById('genCloudCtx'); s.value = '65536'; s.dispatchEvent(new Event('change', { bubbles: true })); }); await p.waitForTimeout(300);
  const d0 = await read(p), ra = await p.evaluate(() => state.effort && state.effort.replyAuto);
  ok(d0.effort === 4 && d0.tokens === 20480 && d0.cloudWin === 65536 && ra === false, 'what is chosen there is what the chat\'s Controls hold (Extra, 20,480 tokens set by hand, 64K of memory)', { d0, replyAuto: ra });
  await p.reload(); await enter(p, 'lector'); const d1 = await read(p);
  ok(d1.effort === 4 && d1.tokens === 20480 && d1.cloudWin === 65536, 'and it is kept: after a reload, on Lector, the same', d1);
  await p.click('#activeModelPill'); await p.waitForTimeout(400);
  const pop2 = await p.evaluate(() => { const s = document.querySelector('#waPop .gen'); return s ? [...s.querySelectorAll('.gen-eff button')].map(b => b.textContent + (b.getAttribute('aria-checked') === 'true' ? '*' : '')).join('|') : null; });
  ok(pop2 === 'Auto|Low|Medium|High|Extra*|Max', 'on Lector the model key shows the same effort', pop2);
  await p.click('#waPop .gen-eff button[data-eff="auto"]'); await p.waitForTimeout(300);
  const au = await p.evaluate(() => !!(state.effort && state.effort.auto));
  ok(au, 'Auto can be chosen there too', au);
  ok(errs.length === 0, 'no errors on the page', errs);
  await b.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); process.exit(1); });
