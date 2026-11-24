// Ingenium 7.77: the Engine panel, one model for all of Ingenium (modules/r374.js).
// Her words (24 November 2026): "I should be able to click on the "Engine" button from the top bar and be able to select to unload the
// model and other options for the models"; "it should all be folded into and added to the Engine button and give it its own panel when
// you click on it and it operates for the entire app".
//   node rig/t_777_engine.js <Ingenium page url> <out folder>
// The engine is played by a stand-in (no model file runs here): it loads and unloads as the real one reports, by its status.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2), URL_ = args.find(a => /^https?:\/\//.test(a)), OUT = args.find(a => !/^https?:\/\//.test(a)) || '/tmp';
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    const mk = (id, n, gb) => ({ id, customName: n, name: n, fileState: 'ready', size: gb * 1073741824, sizeBytes: gb * 1073741824, ctx: 8192 });
    state.models = (state.models || []).concat([mk('m-small', 'A small model', 1.2), mk('m-mid', 'A middle model', 2.4), mk('m-big', 'A larger model', 6.1)]);
    Engine.load = function (m) { const self = this; self.setStatus('loading'); return new Promise(r => setTimeout(() => { self.modelId = m.id; self.setStatus('ready'); r(); }, 150)); };
    Engine.unload = function () { this.modelId = null; this.setStatus('disconnected'); return Promise.resolve(); };
    setActive('m-small', { fromUser: true }); loadActiveModel(); });
  await sleep(500);
  // 1. the Engine key opens the panel (until 7.76 it opened Mentes)
  await p.click('#enginePill'); await sleep(700);
  const o = await p.evaluate(() => { const e = document.getElementById('ingEngine'); if (!e) return null; const h = e.querySelector('.ie-h'), bd = e.querySelector('.ie-b');
    return { page: (document.querySelector('section.section.active') || {}).id, rows: e.querySelectorAll('#ieBody .mt').length, pages: [...e.querySelectorAll('.pk')].map(x => x.tagName + ':' + x.textContent.trim()), head: getComputedStyle(h).position, scrolls: getComputedStyle(bd).overflowY, chip: e.querySelector('.chip').textContent, expanded: document.getElementById('enginePill').getAttribute('aria-expanded') }; });
  ok(o && o.rows >= 3 && o.expanded === 'true' && o.page !== 'page-models', 'the Engine key opens the panel, with the models ready here; it no longer leaves for Mentes', o);
  ok(o && o.pages.length >= 5 && o.pages.every(x => /^SPAN:/.test(x)), 'the pages that write with the model are names, not keys', o && o.pages);
  ok(o && o.head !== 'sticky' && o.head !== 'fixed' && /auto|scroll/.test(o.scrolls), 'the title stays put and only the body scrolls, so it never covers the contents', o);
  ok(o && /Running/.test(o.chip), 'the state says Running, with the model loaded', o && o.chip);
  await p.screenshot({ path: OUT + '/engine_open.png' });
  // 2. choosing a model makes it the model of the whole app, and loads it
  await p.evaluate(() => { const r = [...document.querySelectorAll('#ingEngine .mt')].find(x => /A middle model/.test(x.textContent)); r.click(); }); await sleep(900);
  const c = await p.evaluate(() => ({ active: state.activeModelId, engine: Engine.modelId, pill: (document.getElementById('activeModelName') || {}).textContent, plan: IngLector.plan().chosen && IngLector.plan().chosen.id, inUse: [...document.querySelectorAll('#ingEngine .mt')].filter(x => /In use/.test(x.textContent)).map(x => x.textContent.slice(0, 20)) }));
  ok(c.active === 'm-mid' && c.engine === 'm-mid' && /A middle model/.test(c.pill || ''), 'choosing a model makes it the app\'s model and loads it; the top bar names it', c);
  ok(c.plan === 'm-mid', 'Lector, Vocatio, Ingenia and Fabrica write with it (Lector\'s plan takes the app\'s model)', c);
  ok(c.inUse.length === 1 && /middle/.test(c.inUse[0]), 'the panel marks it In use', c.inUse);
  // 3. Unload, then Load
  await p.evaluate(() => [...document.querySelectorAll('#ingEngine .k')].find(x => x.textContent === 'Unload').click()); await sleep(500);
  const u = await p.evaluate(() => ({ engine: Engine.modelId, chip: document.querySelector('#ingEngine .chip').textContent, active: state.activeModelId }));
  ok(u.engine == null && /Resting/.test(u.chip) && u.active === 'm-mid', 'Unload empties the engine; the choice stays', u);
  await p.evaluate(() => [...document.querySelectorAll('#ingEngine .k')].find(x => x.textContent === 'Load').click()); await sleep(800);
  ok(await p.evaluate(() => Engine.modelId === 'm-mid'), 'Load loads the chosen model again');
  // 4. Reply, Memory and Effort through the one record
  await p.evaluate(() => [...document.querySelectorAll('#ingEngine .ie-eff .k')].find(x => x.textContent === 'Extra').click()); await sleep(300);
  await p.evaluate(() => { const i = document.getElementById('ietokens'); i.value = '4096'; i.dispatchEvent(new Event('change')); }); await sleep(300);
  const r = await p.evaluate(() => { const rec = IngGen.rec('m:m-mid') || {}; return { effort: rec.effort, tokens: rec.tokens, wEff: state.wEff }; });
  ok(r.effort === 4 && r.tokens === 4096 && r.wEff === '4', 'Reply and Effort set here are the model\'s, the same in every place', r);
  // 5. Lector: one line in place of its own list, and the way to this panel
  await p.keyboard.press('Escape'); await sleep(300);
  ok(await p.evaluate(() => !document.getElementById('ingEngine') && document.getElementById('enginePill').getAttribute('aria-expanded') === 'false'), 'Escape closes the panel');
  await p.evaluate(() => go('lector')); await sleep(2000);
  const l = await p.evaluate(() => { const w = document.querySelector('#lx7 .r374-who'), lab = document.querySelector('#lx7 .l-how-model'); return { who: w && w.offsetParent ? w.textContent : null, listHidden: !lab || getComputedStyle(lab).display === 'none' }; });
  ok(l.who && /A middle model/.test(l.who) && l.listHidden, 'Lector says which model reads and writes; its own list is gone', l);
  await p.evaluate(() => document.querySelector('#lx7 .r374-who button').click()); await sleep(600);
  ok(await p.evaluate(() => !!document.getElementById('ingEngine')), 'Change it in the engine opens the panel');
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
