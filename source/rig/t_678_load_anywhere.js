// Loading a model from any page (Ingenium 6.78, modules/r270.js, with the turret's checks in modules/r269.js). Her words: "loading and
// unloading models simplified", and the turret's preview she chose: "Load a model: from any page, in one press. Press the loaded one to
// unload it." The models are invented and the engine's load is a stand-in that reports progress as the real one does; nothing is
// downloaded. Checks, on the Chat page (not Models):
//   - the top bar's key opens Who answers, which holds Load a model: each model with its lens, its size and the memory it needs;
//   - one press loads a model as the turret does (chosen, loaded, the chat answering from this device), the row follows the load and the
//     menu stays open; the turret on the Models page has turned to it; a press on the one in the engine unloads it;
//   - a model too heavy for this device asks first, and a second press loads it; a busy engine is not interrupted; a file not linked
//     says so;
//   - the rows sound as keys, the keyboard reaches them, a phone's width holds the menu, nothing is rewritten while left alone, no
//     page error.
//   node rig/t_678_load_anywhere.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_678_load_anywhere.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const rec = (id, name, color, bytes, params, extra) => Object.assign({ id, customName: name, fileName: id + '.gguf', color, sizeBytes: bytes, paramB: params, type: 'GGUF', fileState: 'ready', effort: 3, tokens: 1024, ctx: 8192 }, extra || {});
const MODELS = [rec('m1', 'Scriba', '#6a3fb5', 4.8e9, 4), rec('m2', 'Velox', '#3f6bb8', 0.7e9, 1.2), rec('m3', 'Gravis', '#3f8f7a', 90e9, 120), rec('m4', 'Absens', '#b8433f', 2e9, 3, { fileState: 'missing' })];
const S = () => window.IngLoadAnywhere.state();
async function open(b, vp) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1 }); const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message.slice(0, 300)));
  await p.addInitScript(() => { window.__INGENIUM_DEVICE = { ramGB: 16, cores: 8 }; });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(700);
  await p.evaluate(M => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.theme = 'day'; applyTheme(); state.models = M; state.activeModelId = 'm1'; try { saveState(); } catch (e) {} renderModels();
    window.__loads = []; Engine.load = function (m) { const self = this; window.__loads.push(m.id); self.setStatus('loading', 0);
      return new Promise(res => { let f = 0; const iv = setInterval(() => { f += 0.25; self.progress = f; self.setStatus('loading', f); if (f >= 1) { clearInterval(iv); self.modelId = m.id; self.adapter = null; self.setStatus('ready'); res(); } }, 200); }); };
    go('chat'); }, MODELS);
  await p.waitForTimeout(1200); return { ctx, p }; }
(async () => {
  const b = await pw.chromium.launch();
  let { ctx, p } = await open(b, { width: 1440, height: 900 });
  await p.click('#activeModelPill'); await p.waitForTimeout(500);
  const s1 = await p.evaluate(() => { const pop = document.getElementById('waPop'), sec = pop && pop.querySelector('.tl-sec'); const r = pop && pop.getBoundingClientRect();
    return { part: window.__ingParts && window.__ingParts.p270, page: [...document.querySelectorAll('.page.active,[id^="page-"].active')].map(x => x.id).join(','), open: !!pop && !pop.hidden,
      head: sec ? sec.querySelector('.tl-h').textContent : '', say: sec ? (sec.querySelector('.tl-say') || {}).textContent : '', st: window.IngLoadAnywhere.state(),
      lenses: sec ? sec.querySelectorAll('.tl-row canvas').length : 0, inView: r ? r.left >= 0 && r.right <= innerWidth && r.top >= 0 : false,
      before: sec ? !!(sec.nextElementSibling && sec.nextElementSibling.classList.contains('wa-sep')) : false }; });
  ok(s1.part === 'running' && /chat/.test(s1.page) && s1.open && s1.head === 'Load a model' && /From any page, in one press/.test(s1.say), 'on the Chat page the top bar\'s key opens Who answers, which holds Load a model', s1);
  ok(s1.st.rows.map(r => r.name).join(',') === 'Scriba,Velox,Gravis,Absens' && s1.lenses === 4 && /^668 MB · needs about [\d.]+ GB$/.test(s1.st.rows[1].sub) && s1.inView && s1.before, 'each model has its lens, its size and the memory it needs; the menu stays on the screen', s1.st.rows);
  await p.screenshot({ path: OUT + '/1_menu.png' });
  // one press loads it
  const snd0 = await p.evaluate(() => { try { return { on: IngSound.play('hover', {}) === true }; } catch (e) { return { on: false }; } });
  await p.click('#waPop .tl-row[data-model="m2"]'); await p.waitForTimeout(450);
  const s2 = await p.evaluate(() => Object.assign(window.IngLoadAnywhere.state(), { loads: window.__loads.slice(), active: state.activeModelId, source: state.chatSource, open: !document.getElementById('waPop').hidden }));
  ok(s2.loads.join() === 'm2' && s2.active === 'm2' && s2.source === 'local' && s2.open && /^Loading · \d+%$/.test(s2.rows[1].sub), 'one press loads it as the turret does: chosen, loaded, the chat answering from this device; the menu stays open and the row follows the load', s2);
  if (snd0.on) { const h = await p.evaluate(() => IngSound.history().map(x => x.role)); ok(h.indexOf('keys') >= 0, 'a row sounds as a key when pressed', h.slice(-5)); }
  else console.log('     (sound is off on this desk, so the key sound is not heard here)');
  await p.waitForTimeout(1600);
  const s3 = await p.evaluate(() => Object.assign(window.IngLoadAnywhere.state(), { mid: Engine.modelId, turret: window.IngTurret ? IngTurret.state().loaded : null,
    device: (document.querySelector('#waPop .wa-row.dev .wa-sub') || {}).textContent, gen: (document.querySelector('#waPop .gen') || {}).textContent || '' }));
  ok(s3.mid === 'm2' && s3.rows[1].sub === 'In the engine · press to unload it' && /\bon\b/.test(s3.rows[1].cls) && s3.turret === 'm2', 'loaded: the row says it is in the engine, and the turret on the Models page has it', s3);
  ok(s3.device === 'Velox · in the engine' && (!s3.gen || /Velox/.test(s3.gen)), 'the rest of the menu follows: This device names Velox in the engine, and How it answers is for it', { device: s3.device, gen: s3.gen.slice(0, 60) });
  // her words: "I want the newly added buttons to have the popped out animated 3D look and animation"
  const look = await p.evaluate(() => { const r = document.querySelector('#waPop .tl-row[data-model="m1"]'), on = document.querySelector('#waPop .tl-row[data-model="m2"]'), c = getComputedStyle(r), o = getComputedStyle(on);
    return { layers: c.boxShadow.split(/,(?![^(]*\))/).length, tf: c.transform, onFill: o.backgroundImage, onColor: o.color }; });
  await p.hover('#waPop .tl-row[data-model="m1"]'); await p.waitForTimeout(700);
  const hov = await p.evaluate(() => { const c = getComputedStyle(document.querySelector('#waPop .tl-row[data-model="m1"]')); const m = /matrix3d\(([^)]+)\)/.exec(c.transform); return { lift: m ? +m[1].split(',')[13] : null, layers: c.boxShadow.split(/,(?![^(]*\))/).length }; });
  ok(look.layers >= 4 && /matrix3d/.test(look.tf) && hov.lift !== null && hov.lift < -2 && hov.layers >= 4, 'each row is a raised key in 3D that lifts under the pointer', { look, hov });
  ok(/gradient/.test(look.onFill) && look.onColor === 'rgb(255, 255, 255)', 'the one in the engine is filled purple with white words', look);
  await p.mouse.move(5, 5); await p.waitForTimeout(300);
  // her words: "The loaded model section sometimes shows a past loaded model instead of the current ones": loaded or chosen elsewhere, the menu follows
  await p.evaluate(() => IngTurret.press('m1')); await p.waitForTimeout(1900);
  const t1 = await p.evaluate(() => (document.querySelector('#waPop .wa-row.dev .wa-sub') || {}).textContent);
  await p.evaluate(() => setActive('m2', { fromUser: true })); await p.waitForTimeout(400);
  const t2 = await p.evaluate(() => (document.querySelector('#waPop .wa-row.dev .wa-sub') || {}).textContent);
  ok(t1 === 'Scriba · in the engine' && t2 === 'Velox chosen · Scriba in the engine', 'loaded or chosen elsewhere while the menu is open, This device says what is true now', { t1, t2 });
  await p.evaluate(() => { setActive('m1', { fromUser: true }); return IngTurret.unload(); }); await p.waitForTimeout(700);
  await p.screenshot({ path: OUT + '/2_loaded.png' });
  // a press on the one in the engine unloads it
  await p.click('#waPop .tl-row[data-model="m2"]'); await p.waitForTimeout(1900);
  await p.click('#waPop .tl-row[data-model="m2"]'); await p.waitForTimeout(700);
  const s4 = await p.evaluate(() => Object.assign(window.IngLoadAnywhere.state(), { mid: Engine.modelId, status: Engine.status }));
  ok(!s4.mid && s4.status === 'disconnected' && /needs about/.test(s4.rows[1].sub), 'a press on the one in the engine unloads it', s4);
  // too heavy: asks first, then loads
  await p.click('#waPop .tl-row[data-model="m3"]'); await p.waitForTimeout(300);
  const s5 = await p.evaluate(() => Object.assign(window.IngLoadAnywhere.state(), { loads: window.__loads.slice() }));
  ok(/Press again to load it anyway\.$/.test(s5.rows[2].sub) && /\bwarn\b/.test(s5.rows[2].cls) && s5.loads.indexOf('m3') < 0, 'a model too heavy for this device asks first, and nothing is loaded yet', s5.rows[2]);
  await p.click('#waPop .tl-row[data-model="m3"]'); await p.waitForTimeout(500);
  ok(await p.evaluate(() => window.__loads[window.__loads.length - 1] === 'm3'), 'pressed again, it is loaded anyway');
  await p.waitForTimeout(1500);
  // a busy engine is not interrupted; a file not linked says so
  await p.evaluate(() => { Engine.setStatus('busy'); }); await p.waitForTimeout(200);
  const n6 = await p.evaluate(() => window.__loads.length);
  await p.click('#waPop .tl-row[data-model="m1"]'); await p.waitForTimeout(300);
  const s6 = await p.evaluate(() => Object.assign(window.IngLoadAnywhere.state(), { loads: window.__loads.slice() }));
  ok(s6.rows[0].sub === 'The engine is writing. Let it finish, or stop it, first.' && s6.loads.length === n6, 'a busy engine is not interrupted, and the row says why', s6.rows[0]);
  await p.evaluate(() => { Engine.setStatus('ready'); }); await p.waitForTimeout(200);
  await p.click('#waPop .tl-row[data-model="m4"]'); await p.waitForTimeout(300);
  const s7 = await p.evaluate(() => window.IngLoadAnywhere.state());
  ok(s7.rows[3].sub === 'The file for Absens is not linked. Relink it on the Models page, then press it again.', 'a model whose file is not linked says so', s7.rows[3]);
  // the keyboard reaches the rows
  const kb = await p.evaluate(() => { const r = document.querySelector('#waPop .tl-row[data-model="m1"]'); r.focus(); return document.activeElement === r; });
  ok(kb, 'the keyboard reaches the rows');
  // left alone
  const still = await p.evaluate(() => new Promise(res => { let n = 0; const pop = document.getElementById('waPop'), mo = new MutationObserver(ms => { n += ms.length; }); mo.observe(pop, { subtree: true, childList: true, attributes: true, characterData: true }); setTimeout(() => { mo.disconnect(); res(n); }, 2500); }));
  ok(still === 0, 'left alone, nothing in the menu is rewritten', still);
  // closing and opening again keeps one section
  await p.keyboard.press('Escape'); await p.waitForTimeout(200); await p.click('#activeModelPill'); await p.waitForTimeout(400);
  ok(await p.evaluate(() => document.querySelectorAll('#waPop .tl-sec').length === 1 && !document.getElementById('waPop').hidden), 'opened again, it holds one Load a model, freshly drawn');
  ok(p.__errs.length === 0, 'no page error', p.__errs); await ctx.close();
  // a phone
  ({ ctx, p } = await open(b, { width: 390, height: 844 }));
  await p.click('#activeModelPill'); await p.waitForTimeout(500);
  const s8 = await p.evaluate(() => { const pop = document.getElementById('waPop'), r = pop.getBoundingClientRect(); return { left: Math.round(r.left), right: Math.round(r.right), vw: innerWidth, wide: document.documentElement.scrollWidth - innerWidth, rows: pop.querySelectorAll('.tl-row').length }; });
  ok(s8.rows === 4 && s8.left >= 0 && s8.right <= s8.vw && s8.wide <= 0, 'on a phone the menu stays inside the screen, with every model', s8);
  await p.screenshot({ path: OUT + '/3_phone.png' });
  ok(p.__errs.length === 0, 'no page error on the phone', p.__errs); await ctx.close();
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + (e && e.message || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
