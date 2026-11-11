// The Models page as a turret of lenses (Ingenium 6.75, modules/r266.js). Her words (11 November 2026): "I need you to push build 6.75
// and 6.76 with the models page new turet redesign", her preview Ingenium_Models_Designs.html, design I · The turret.
// The models here are invented (Lantern 3B, Quill 8B and Atlas 70B), and the engine is a stand-in that loads at once, so that the turret
// is tested without model files:
//   - the head: Models, the turret's words, its two keys, the In the engine card; the page's own title and words give way to it;
//   - one port for each model and one empty port, the rest blank; the scale is this device's memory for a model;
//   - pressing a model turns it into the light path and loads it (the page's own setActive and loadActiveModel); pressing it again, or
//     the empty port, unloads it; the card says what the engine does; a model too heavy says so first, with Load it anyway;
//   - the keys open their rooms; the rooms still work; night redraws it; minimal motion turns it at once; a phone fits it; no page error.
//   node rig/t_675_turret.js <Ingenium page url (master)> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_675_turret.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true }); const OUTA = path.resolve(OUT);
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; return !!c; };
async function open(b, vp, th, extra) {
  const ctx = await b.newContext(Object.assign({ viewport: vp }, extra || {})); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(300);
  // three invented models, and an engine that loads at once (no model file is read)
  await p.evaluate((th) => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = th; applyTheme();
    window.__ingDevice0 = window.__INGENIUM_DEVICE; window.__INGENIUM_DEVICE = Object.assign({}, window.__INGENIUM_DEVICE || {}, { ramGB: 16 });
    const mm = (id, name, gb, color) => ({ id, customName: name, name, type: 'GGUF', fileName: id + '.gguf', sizeBytes: Math.round(gb * 1e9), fileState: 'ready', color, effort: 'Medium', tokens: 1024, ctx: 4096 });
    state.models = [mm('t-lantern', 'Lantern 3B', 2.1, '#7458c6'), mm('t-quill', 'Quill 8B', 5.2, '#8641b8'), mm('t-atlas', 'Atlas 70B', 41, '#4d3db0')];
    window.__loads = []; window.__unloads = 0;
    Engine.load = function (m) { window.__loads.push(m.id); this.modelId = m.id; this.setStatus('loading'); return new Promise(r => setTimeout(() => { this.setStatus('ready'); r(); }, 300)); };
    Engine.unload = function () { window.__unloads++; this.modelId = null; this.setStatus('disconnected'); return Promise.resolve(); };
    go('models'); }, th);
  await p.waitForTimeout(1500); await p.evaluate(() => { try { IngTurret.rebuild(); } catch (e) {} }); await p.waitForTimeout(600);
  return { ctx, p, errs };
}
(async () => {
  const b = await pw.chromium.launch();
  const { p, ctx, errs } = await open(b, { width: 1440, height: 900 }, 'day');
  // 1. the head
  const s1 = await p.evaluate(() => { const pg = document.getElementById('page-models'), h = pg.querySelector('.tu-head'), vis = e => !!(e && e.offsetParent);
    return { part: window.__ingParts && window.__ingParts.p266, on: pg.classList.contains('tu-on'), head: vis(h), h1: h && h.querySelector('h1').textContent, eyebrow: h && h.querySelector('.tu-eyebrow').textContent,
      lede: h && h.querySelector('.tu-lede').textContent, keys: h ? [...h.querySelectorAll('.tu-key')].map(k => k.textContent) : [], oldTitle: vis(pg.querySelector(':scope > h1.page-title')),
      oldLede: vis(pg.querySelector(':scope > p.lede')), card: h && h.querySelector('.tu-now b').textContent, st: IngTurret.state() }; });
  ok(s1.part === 'running' && s1.on && s1.head && s1.h1 === 'Models' && /Models · the turret/.test(s1.eyebrow), 'the Models page opens on the turret\'s head', s1);
  ok(/turret of lenses/.test(s1.lede) && s1.keys.join('|') === 'Get one of Ingenium\'s models|Add a model file' && !s1.oldTitle && !s1.oldLede, 'its words and its two keys, and the page\'s own title and words give way to it', s1);
  ok(s1.card === 'Nothing in the engine', 'the In the engine card says the engine is empty', s1.card);
  ok(s1.st.ports === 6 && s1.st.models.join('|') === 't-lantern|t-quill|t-atlas' && s1.st.empty === 3 && s1.st.at === 3, 'one port for each model and one empty port, turned into the light path, the rest blank', s1.st);
  ok(Math.abs(s1.st.avail - 16 * 0.68) < 0.01, 'the scale is this device\'s memory for a model (16 GB, about 10.9 for a model)', s1.st.avail);
  const ports = await p.evaluate(() => [...document.querySelectorAll('#page-models .tu-port')].map(x => ({ blank: x.classList.contains('blank'), label: x.getAttribute('aria-label') })));
  const tags = await p.evaluate(() => { const l = document.querySelector('#page-models .tu-tags'); return { z: l ? getComputedStyle(l).zIndex : null, last: l === l.parentNode.lastElementChild,
    names: [...document.querySelectorAll('#page-models .tu-tag')].map(t => ({ t: t.textContent, w: Math.round(t.getBoundingClientRect().width) })) }; });
  ok(ports.filter(x => x.blank).length === 2 && /Lantern 3B, 2\.1 GB: turn it into the engine/.test(ports[0].label) && /empty port/.test(ports[3].label), 'each port says what a press does', ports);
  ok(tags.names.map(n => n.t).join('|') === 'Lantern 3B|Quill 8B|Atlas 70B|empty' && tags.names.every(n => n.w > 20) && tags.z === '3' && tags.last, 'every model\'s name stands above the lenses, none hidden under another', tags);
  await p.screenshot({ path: path.join(OUTA, 'turret_day.png') });

  // 2. a press loads a model: the turret turns it into the light path, and the page's own loader is used
  await p.evaluate(() => document.querySelectorAll('#page-models .tu-port')[1].click()); await p.waitForTimeout(150);
  const s2 = await p.evaluate(() => ({ card: document.querySelector('#page-models .tu-now b').textContent, busy: document.querySelector('#page-models .tu-bar').classList.contains('busy'), st: IngTurret.state() }));
  ok(/Loading Quill 8B/.test(s2.card) && s2.busy && s2.st.at === 1, 'pressed, the model turns into the light path and the card says it is loading', s2);
  await p.waitForTimeout(1600);
  const s3 = await p.evaluate(() => ({ loads: window.__loads, active: state.activeModelId, card: document.querySelector('#page-models .tu-now b').textContent, says: document.querySelector('#page-models .tu-now p').textContent, st: IngTurret.state() }));
  ok(s3.loads.join('|') === 't-quill' && s3.active === 't-quill' && s3.st.loaded === 't-quill', 'the model is set active and loaded by the page\'s own loader', s3);
  ok(s3.card === 'Quill 8B is loaded and ready' && /Uses about [\d.]+ of 10\.9 GB\. Chat, Blend and Lector use it now\./.test(s3.says), 'the card says it is loaded, and the memory it takes of this device\'s', s3);
  await p.screenshot({ path: path.join(OUTA, 'turret_loaded.png') });
  // pressed again: unloaded, the empty port turns in
  await p.evaluate(() => document.querySelectorAll('#page-models .tu-port')[1].click()); await p.waitForTimeout(600);
  const s4 = await p.evaluate(() => ({ unloads: window.__unloads, card: document.querySelector('#page-models .tu-now b').textContent, st: IngTurret.state() }));
  ok(s4.unloads >= 1 && s4.card === 'Nothing in the engine' && s4.st.at === 3 && !s4.st.loaded, 'pressed again, it is unloaded and the empty port turns in', s4);
  // the empty port unloads too
  await p.evaluate(() => document.querySelectorAll('#page-models .tu-port')[0].click()); await p.waitForTimeout(1600);
  await p.evaluate(() => document.querySelectorAll('#page-models .tu-port')[3].click()); await p.waitForTimeout(600);
  const s5 = await p.evaluate(() => ({ st: IngTurret.state(), card: document.querySelector('#page-models .tu-now b').textContent }));
  ok(!s5.st.loaded && s5.st.at === 3 && s5.card === 'Nothing in the engine', 'the empty port, turned in, unloads the model', s5);
  // a model too heavy says so before it is loaded
  await p.evaluate(() => document.querySelectorAll('#page-models .tu-port')[2].click()); await p.waitForTimeout(300);
  const s6 = await p.evaluate(() => ({ card: document.querySelector('#page-models .tu-now b').textContent, says: document.querySelector('#page-models .tu-now p').textContent, warn: document.querySelector('#page-models .tu-now').classList.contains('warn'),
    key: (document.querySelector('#page-models .tu-now .tu-act .tu-key') || {}).textContent, loads: window.__loads.slice() }));
  ok(s6.card === 'Atlas 70B is likely too heavy here' && s6.warn && s6.key === 'Load it anyway' && s6.loads.indexOf('t-atlas') < 0, 'a model too heavy says so first, with Load it anyway, and is not loaded', s6);
  await p.evaluate(() => document.querySelector('#page-models .tu-now .tu-act .tu-key').click()); await p.waitForTimeout(1600);
  ok(await p.evaluate(() => IngTurret.state().loaded) === 't-atlas', 'Load it anyway loads it');
  await p.evaluate(() => IngTurret.unload()); await p.waitForTimeout(500);

  // 3. the keys open their rooms, and the rooms still work
  await p.evaluate(() => [...document.querySelectorAll('#page-models .tu-key')].find(k => /Ingenium's models/.test(k.textContent)).click()); await p.waitForTimeout(500);
  const r1 = await p.evaluate(() => { const t = [...document.querySelectorAll('#page-models .rm-tab')].find(x => x.getAttribute('aria-selected') === 'true'); return t ? t.textContent.trim() : null; });
  ok(/Ingenium.s models/.test(r1 || ''), 'Get one of Ingenium\'s models opens that room', r1);
  await p.evaluate(() => [...document.querySelectorAll('#page-models .tu-key')].find(k => /Add a model file/.test(k.textContent)).click()); await p.waitForTimeout(500);
  const r2 = await p.evaluate(() => { const t = [...document.querySelectorAll('#page-models .rm-tab')].find(x => x.getAttribute('aria-selected') === 'true'); return { t: t ? t.textContent.trim() : null, ring: t ? getComputedStyle(t).boxShadow : '' }; });
  ok(/Your models/.test(r2.t || '') && /inset/.test(r2.ring), 'Add a model file opens Your models; the room shown is ringed, as the design draws it', r2);

  // 4. night, minimal motion, the keys' sound
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(2600);
  const s7 = await p.evaluate(() => { const h = document.querySelector('#page-models .tu-head'); return { bg: getComputedStyle(h).backgroundImage.slice(0, 60), ink: getComputedStyle(h.querySelector('h1')).color }; });
  ok(/radial-gradient/.test(s7.bg) && s7.ink === 'rgb(236, 228, 248)', 'by night the head and the turret are drawn again in the night\'s colours', s7);
  await p.screenshot({ path: path.join(OUTA, 'turret_night.png') });
  await p.evaluate(() => document.body.setAttribute('data-motion', 'minimal'));
  const s8 = await p.evaluate(() => getComputedStyle(document.querySelector('#page-models .tu-disc')).transitionDuration);
  ok(s8 === '0s', 'with minimal motion the turret turns at once', s8);
  await p.evaluate(() => document.body.removeAttribute('data-motion'));
  await ctx.close();

  // 5. on a phone
  const ph = await open(b, { width: 390, height: 844 }, 'day', { hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const s9 = await ph.p.evaluate(() => { const sc = document.querySelector('#page-models .tu-scene'), t = document.querySelector('#page-models .tu-turret').getBoundingClientRect();
    return { sw: document.documentElement.scrollWidth, vw: innerWidth, tw: Math.round(t.width), scene: Math.round(sc.getBoundingClientRect().width) }; });
  ok(s9.sw <= s9.vw && s9.tw <= s9.scene + 1, 'on a phone the turret fits the screen, and nothing scrolls sideways', s9);
  await ph.p.screenshot({ path: path.join(OUTA, 'turret_phone.png') });
  ok(errs.length === 0 && ph.errs.length === 0, 'no page error', errs.concat(ph.errs));
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
