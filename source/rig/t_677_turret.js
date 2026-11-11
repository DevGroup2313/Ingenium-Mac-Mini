// The Models page as a turret of lenses (Ingenium 6.77; modules/r269.js). Her words (11 November 2026): "The Models page needs a
// redesign and a major makeover to match the rest of the Ingenium's pages", "I want Ingenium's colours preserved with the new designs",
// "I like the turret version but the colours are off", and, choosing it: "I choose the Turret, please push it everywhere."
// Checks, with invented models (nothing is downloaded; the engine's load is played by a stand-in that reports progress as the real one does):
//   - the page opens on its head: the eyebrow, the page's own title and words, the turret beside them, the keys, the card In the engine;
//   - with no model: the empty port and capped ports, and the card says how to get one;
//   - each model is a lens named round the rim; pressing one turns the turret until it stands under the engine's mark, loads it as the
//     page's own Load key does (the model is chosen, the engine loads it), the card follows the load and the scale fills; pressed again,
//     it unloads, and the turret turns back to the empty port; the empty port unloads too; the keyboard works as the pointer does;
//   - a model too heavy for this device asks first; a model whose file is not linked says so; a busy engine is not interrupted;
//   - more than five models: five stand in the turret, the one in the engine always among them;
//   - by night the metal and the scale take the night's colours; on a phone the turret stands under the words, scaled to the width, and
//     nothing runs past the edge; below 260 pixels the page is as it was; left alone, nothing is rewritten; a lens sounds as a key.
//   node rig/t_677_turret.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_677_turret.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const MODELS = [['m1', 'Scriba', '#6a3fb5', 4.8e9, 4], ['m2', 'Velox', '#3f6bb8', 0.7e9, 1.2], ['m3', 'Magister', '#8a63d2', 5.3e9, 9]];
const rec = (a, extra) => Object.assign({ id: a[0], customName: a[1], fileName: a[1].toLowerCase() + '-q4_k_m.gguf', color: a[2], sizeBytes: a[3], paramB: a[4], type: 'GGUF', fileState: 'ready', effort: 3, tokens: 1024, ctx: 8192 }, extra || {});
const T = () => window.IngModelsTurret.state();
async function open(b, vp, models) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1 }); const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message.slice(0, 300)));
  await p.addInitScript(() => { window.__INGENIUM_DEVICE = { ramGB: 16, cores: 8 }; }); // a device of 16 GB, as the page reads it, so the fit is the same on every machine
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(700);
  await p.evaluate(M => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.theme = 'day'; applyTheme(); state.models = M; state.activeModelId = M.length ? M[0].id : null; try { saveState(); } catch (e) {} renderModels(); go('models'); }, models || []);
  await p.waitForTimeout(1600); return { ctx, p }; }
/* the engine's load, played as the real one reports it: loading in steps, then ready (Engine.load is the page's own; loadActiveModel calls it) */
const fakeEngine = () => { window.__loads = []; Engine.load = function (m) { const self = this; window.__loads.push(m.id); self.setStatus('loading', 0);
  return new Promise(res => { let f = 0; const iv = setInterval(() => { f += 0.25; self.progress = f; self.setStatus('loading', f); if (f >= 1) { clearInterval(iv); self.modelId = m.id; self.adapter = null; self.setStatus('ready'); res(); } }, 200); }); }; };
(async () => {
  const b = await pw.chromium.launch();
  // ---------------- no model yet ----------------
  let { ctx, p } = await open(b, { width: 1440, height: 950 }, []);
  const s0 = await p.evaluate(() => { const pg = document.getElementById('page-models'), h = pg.querySelector(':scope > .tr-head'), w = h && h.querySelector('.tr-words');
    return { part: window.__ingParts && window.__ingParts.p269, first: pg.firstElementChild === h, eyebrow: h ? h.querySelector('.tr-eyebrow').textContent : '', title: !!(w && w.querySelector(':scope > .page-title')),
      lede: !!(w && w.querySelector(':scope > .lede')), keys: [...h.querySelectorAll('.tr-keys .btn')].map(x => x.textContent), turret: !!h.querySelector('#trTurret canvas.tr-base'),
      side: (() => { const a = w.getBoundingClientRect(), t = h.querySelector('.tr-scene').getBoundingClientRect(); return t.left >= a.right - 1; })(), st: window.IngModelsTurret ? window.IngModelsTurret.state() : null }; });
  ok(s0.part === 'running' && s0.first && s0.eyebrow === 'IngeniumModels · the turret' && s0.title && s0.lede && s0.turret && s0.side, 'the page opens on its head: the eyebrow, its own title and words, and the turret beside them', s0);
  ok(s0.keys.join('|') === "Get one of Ingenium's models|Add a model file", 'its keys: Get one of Ingenium\'s models, and Add a model file', s0.keys);
  // her words (11 November 2026): "I want the "Open the Studio" button to be removed since it seem superfluous from the new Models page but I want the
  // button to stay purple when selected instead of just having the purple outline around the button"
  const rk = await p.evaluate(() => { const t = document.querySelector('#page-models .rm-tab[aria-selected="true"]'), cs = t && getComputedStyle(t), h = document.getElementById('rmStudioHint');
    return { tab: t ? t.textContent.trim() : '', color: cs ? cs.color : '', fill: cs ? cs.backgroundImage : '', ring: cs ? cs.boxShadow : '', studio: !!h && h.getClientRects().length > 0 }; });
  ok(!rk.studio, 'the line Open the Studio is gone from the Models page', rk);
  ok(rk.color === 'rgb(255, 255, 255)' && /gradient/.test(rk.fill) && !/0px 0px 0px 1\.5px/.test(rk.ring), 'the room shown is filled purple with white words, not outlined', rk);
  ok(s0.st && s0.st.count === 5 && s0.st.ports.filter(x => x.kind === 'cap').length === 4 && s0.st.ports[4].kind === 'empty' && s0.st.names[0] === 'Empty' && s0.st.card.name === 'No model yet' && /Get one of Ingenium's models, or add a model file/.test(s0.st.card.says),
    'with no model: the empty port under the engine, four capped ports, and the card says how to get one', s0.st);
  const g0 = await p.evaluate(() => { const r = document.querySelector('#trGet'); r.click(); return new Promise(res => setTimeout(() => res({ room: IngRooms.current ? IngRooms.current('models') : null, shown: (document.getElementById('rmP-models-get') || {}).offsetParent !== null }), 300)); });
  ok(g0.shown, "Get one of Ingenium's models opens the room of Ingenium's models", g0);
  await p.evaluate(() => { try { IngRooms.open('models', 'yours'); } catch (e) {} });
  // ---------------- three models: each a lens ----------------
  await p.evaluate(M => { state.models = M; state.activeModelId = 'm1'; renderModels(); }, MODELS.map(a => rec(a)));
  await p.waitForTimeout(1300);
  const s1 = await p.evaluate(T);
  ok(s1.count === 5 && s1.ports.map(x => x.kind).join(',') === 'lens,lens,lens,cap,empty' && s1.ports.slice(0, 3).map(x => x.name).join(',') === 'Scriba,Velox,Magister' && s1.at === 4 && s1.names[0] === 'Empty' && s1.names.filter(Boolean).sort().join(',') === 'Empty,Magister,Scriba,Velox',
    'each model is a lens, named round the rim; the empty port stands under the engine\'s mark', s1);
  ok(/^Velox, 668 MB: press to load it into the engine$/.test(s1.ports[1].label) && s1.ports[1].pressed === 'false' && /^The empty port: nothing is in the engine$/.test(s1.ports[4].label), 'each lens says in words what pressing it does', s1.ports.map(x => x.label));
  ok(s1.card.name === 'Nothing in the engine' && s1.fill === '0.000' && +s1.gb > 0, 'the card: nothing in the engine; the scale is this device\'s memory for a model, empty', s1.card);
  await p.screenshot({ path: OUT + '/1_three.png' });
  // a lens sounds as a key, where this desk plays sounds at all
  const snd0 = await p.evaluate(() => { try { return { on: IngSound.play('hover', {}) === true, n: IngSound.count() }; } catch (e) { return { on: false }; } });
  // ---------------- press a lens: it turns to the engine and loads ----------------
  await p.evaluate(fakeEngine);
  await p.waitForTimeout(150);
  await p.click('#page-models button.tr-port[data-model="m3"]'); await p.waitForTimeout(450);
  const s2 = await p.evaluate(() => Object.assign(window.IngModelsTurret.state(), { active: state.activeModelId, loads: window.__loads.slice(), disc: document.querySelector('#trTurret .tr-disc').style.transform, turning: document.querySelector('#trTurret').classList.contains('tr-turning') }));
  ok(s2.active === 'm3' && s2.loads.join() === 'm3' && /^Loading Magister$/.test(s2.card.name) && /Reading it into memory · \d+%/.test(s2.card.says) && s2.target === 2 && s2.at === 2, 'pressed, a lens is chosen and loaded as the engine\'s own Load key does, and the card follows the load', s2);
  ok(/rotate\(-?\d+(\.\d+)?deg\)/.test(s2.disc) && ((parseFloat(/rotate\((-?[\d.]+)deg/.exec(s2.disc)[1]) % 360) + 360) % 360 === (360 - 2 * 72) % 360 && s2.turning, 'the turret turns until that lens stands under the engine\'s mark; the names wait while it turns', { disc: s2.disc, turning: s2.turning });
  if (snd0.on) { const h = await p.evaluate(() => IngSound.history().map(x => x.role)); ok(h.indexOf('keys') >= 0, 'a lens sounds as a key when pressed', h.slice(-6)); }
  else console.log('     (sound is off on this desk, so the key sound is not heard here)');
  await p.waitForTimeout(1600);
  const s3 = await p.evaluate(T);
  ok(s3.card.name === 'Magister is in the engine' && /^It uses about [\d.]+ of [\d.]+ GB\. Chat, Blend and Lector use it now\./.test(s3.card.says) && +s3.fill > 0 && s3.ports[2].pressed === 'true' && /in the engine: press to unload it$/.test(s3.ports[2].label) && s3.names[0] === 'Magister',
    'loaded: the card says so with the memory it takes, the scale fills that far, the lens says it is in the engine and its name stands at the top', s3);
  await p.screenshot({ path: OUT + '/2_loaded.png' });
  // ---------------- pressed again: it unloads ----------------
  await p.click('#page-models button.tr-port[data-model="m3"]'); await p.waitForTimeout(1300);
  const s4 = await p.evaluate(() => Object.assign(window.IngModelsTurret.state(), { eng: Engine.status, mid: Engine.modelId }));
  ok(s4.eng === 'disconnected' && !s4.mid && s4.at === 4 && s4.card.name === 'Nothing in the engine' && s4.fill === '0.000' && s4.ports[2].pressed === 'false', 'pressed again, it unloads, and the turret turns back to the empty port', s4);
  // ---------------- the keyboard; the empty port ----------------
  await p.focus('#page-models button.tr-port[data-model="m2"]'); await p.keyboard.press('Enter'); await p.waitForTimeout(1600);
  const s5 = await p.evaluate(() => Object.assign(window.IngModelsTurret.state(), { mid: Engine.modelId }));
  ok(s5.mid === 'm2' && s5.at === 1 && s5.card.name === 'Velox is in the engine', 'the keyboard works as the pointer does: Enter on a lens loads it', s5.card);
  await p.click('#page-models button.tr-port.tr-empty'); await p.waitForTimeout(1200);
  const s6 = await p.evaluate(() => Object.assign(window.IngModelsTurret.state(), { mid: Engine.modelId }));
  ok(!s6.mid && s6.at === 4 && s6.card.name === 'Nothing in the engine', 'the empty port unloads the model in the engine', s6.card);
  // ---------------- asking first; a file not linked; a busy engine ----------------
  await p.evaluate(M => { state.models = state.models.concat(M); renderModels(); window.__loads = []; }, [rec(['m4', 'Gravis', '#3f8f7a', 90e9, 120]), rec(['m5', 'Absens', '#b8433f', 2e9, 3], { fileState: 'missing' })]);
  await p.waitForTimeout(1300);
  await p.click('#page-models button.tr-port[data-model="m4"]'); await p.waitForTimeout(500);
  const s7 = await p.evaluate(() => Object.assign(window.IngModelsTurret.state(), { loads: window.__loads.slice(), fit: fitVerdict(state.models.filter(m => m.id === 'm4')[0]).level }));
  ok(s7.fit === 'heavy' && s7.card.name === 'Gravis may be too heavy here' && s7.card.acts.join('|') === 'Load it anyway|Not now' && s7.loads.length === 0, 'a model too heavy for this device asks first, and nothing is loaded yet', s7.card);
  await p.evaluate(() => { [...document.querySelectorAll('#trNow .tr-act button')].find(x => x.textContent === 'Not now').click(); }); await p.waitForTimeout(300);
  const s8 = await p.evaluate(T);
  ok(s8.card.name === 'Nothing in the engine', 'Not now leaves it as it was', s8.card);
  await p.click('#page-models button.tr-port[data-model="m5"]'); await p.waitForTimeout(400);
  const s9 = await p.evaluate(() => Object.assign(window.IngModelsTurret.state(), { loads: window.__loads.slice() }));
  ok(s9.card.name === 'The file for Absens is not linked' && s9.card.acts.join('|') === 'Show its card' && s9.loads.length === 0, 'a model whose file is not linked says so, and shows its card', s9.card);
  await p.evaluate(() => { Engine.modelId = 'm1'; Engine.setStatus('busy'); }); await p.waitForTimeout(300);
  await p.click('#page-models button.tr-port[data-model="m2"]'); await p.waitForTimeout(400);
  const s10 = await p.evaluate(() => Object.assign(window.IngModelsTurret.state(), { loads: window.__loads.slice() }));
  ok(s10.card.name === 'The engine is writing' && s10.card.acts.join('|') === 'Stop' && s10.loads.length === 0, 'a busy engine is not interrupted: the card offers Stop', s10.card);
  await p.evaluate(() => { Engine.modelId = null; Engine.setStatus('disconnected'); }); await p.waitForTimeout(300);
  // ---------------- more than five models ----------------
  await p.evaluate(M => { state.models = state.models.concat(M); renderModels(); }, [rec(['m6', 'Sexta', '#3f6bb8', 1e9, 1]), rec(['m7', 'Septima', '#8a63d2', 1.2e9, 1.5])]);
  await p.waitForTimeout(1200);
  await p.evaluate(() => { setActive('m7', { fromUser: true }); }); await p.waitForTimeout(1800);
  const s11 = await p.evaluate(T);
  ok(s11.count === 6 && s11.ports.filter(x => x.kind === 'lens').length === 5 && s11.ports.some(x => x.id === 'm7') && s11.ports[5].kind === 'empty', 'with seven models, five stand in the turret, the chosen one among them', s11.ports.map(x => x.kind + ':' + (x.id || '')));
  // ---------------- left alone ----------------
  const still = await p.evaluate(() => new Promise(res => { let n = 0; const h = document.querySelector('#page-models .tr-head'), mo = new MutationObserver(ms => { n += ms.length; }); mo.observe(h, { subtree: true, childList: true, attributes: true, characterData: true }); setTimeout(() => { mo.disconnect(); res(n); }, 3000); }));
  ok(still === 0, 'left alone, nothing in the head is rewritten over three seconds', still);
  // ---------------- by night ----------------
  const px = () => { const c = document.querySelector('#trTurret canvas.tr-base'), g = c.getContext('2d'), k = c.width / 460, d = g.getImageData(Math.round(30 * k), Math.round(230 * k), 1, 1).data; return d[0] + d[1] + d[2]; };
  const day = await p.evaluate(px); await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(700);
  const nightPx = await p.evaluate(px), s12 = await p.evaluate(T);
  ok(s12.night && nightPx < day - 150, 'by night the metal and the scale are drawn in the night\'s colours', { day, night: nightPx });
  await p.screenshot({ path: OUT + '/3_night.png' });
  ok(p.__errs.length === 0, 'no page error', p.__errs); await ctx.close();
  // ---------------- a phone; a very narrow window ----------------
  ({ ctx, p } = await open(b, { width: 390, height: 844 }, MODELS.map(a => rec(a))));
  const s13 = await p.evaluate(() => { const vw = innerWidth, over = []; document.querySelectorAll('#page-models .tr-head, #page-models .tr-head *').forEach(x => { const r = x.getBoundingClientRect(); if (r.width > 0 && (r.right > vw + 1 || r.left < -1)) over.push(String(x.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right)); });
    const t = document.querySelector('#trTurret').getBoundingClientRect(), w = document.querySelector('#page-models .tr-words').getBoundingClientRect();
    return { st: window.IngModelsTurret.state(), over: over.slice(0, 6), wide: document.documentElement.scrollWidth - vw, under: t.top >= w.bottom - 1, tw: Math.round(t.width) }; });
  ok(s13.st.stack && s13.st.phone && +s13.st.k < 1 && s13.under && s13.over.length === 0 && s13.wide <= 0, 'on a phone the turret stands under the words, scaled to the width, and nothing runs past the edge', s13);
  await p.screenshot({ path: OUT + '/4_phone.png' });
  await p.setViewportSize({ width: 250, height: 700 }); await p.waitForTimeout(900);
  const s14 = await p.evaluate(() => { const pg = document.getElementById('page-models'); return { head: !!pg.querySelector('.tr-head'), title: !!pg.querySelector(':scope > .page-title'), on: pg.classList.contains('tr-on') }; });
  ok(!s14.head && s14.title && !s14.on, 'below 260 pixels the page is as it was', s14);
  await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(900); // wide enough beside the side bar for the turret to stand beside the words
  const s15 = await p.evaluate(() => ({ head: !!document.querySelector('#page-models > .tr-head'), st: window.IngModelsTurret.state() }));
  ok(s15.head && !s15.st.stack && s15.st.count === 5, 'wide again, the turret comes back', s15.st.count);
  ok(p.__errs.length === 0, 'no page error on the phone', p.__errs); await ctx.close();
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + (e && e.message || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
