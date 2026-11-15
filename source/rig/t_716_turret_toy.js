// Ingenium 7.16: the turret, a toy, and the Models page without endless scrolling (modules/r304.js, r269.js). Her words (15 November 2026),
// sending version 15 of the live preview as "the approved turret redesign": "remove the white outline that is around the big circle of the
// turret's surface, it is detracting from the overall look of the 3D design especially on Night mode", then "Please make the edits that I
// requested and commit and push the approved design." And the same evening: "Ingenium is possibly overheating my phone ... I want my 3D
// graphics and animations to be preserved and run smoothly as well".
// Checks: the toy stands in the head in place of the turret's drawing, says it loads nothing, and loads nothing when pressed (by a mouse or a
// finger), with Ingenium's sound; the plate's face has no pale ring at its edge, by day or by night (read from its own pixels); the rooms'
// cartridges are drawn as the toy's lenses and load nothing; Your models' Load key loads, and the card says so; the compact layer: a room
// opened from its tab folds the head, the band unfolds it, the page opens unfolded, drawers and a sheet; the toy draws about thirty frames a
// second at rest, none off screen or on another page. Invented models; the engine is a stand-in; nothing is downloaded.
// usage: node rig/t_716_turret_toy.js <page url> <out folder>
const pw = require('playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_716_turret_toy.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const MODELS = [['m1', 'Atlas', '#7a5af0', 0.66e9, 1.2], ['m2', 'Quill', '#3f8fd8', 4.5e9, 7], ['m3', 'Meridian', '#c2427a', 4.9e9, 8]];
const rec = (a) => ({ id: a[0], customName: a[1], fileName: a[1].toLowerCase() + '.gguf', color: a[2], sizeBytes: a[3], paramB: a[4], type: 'GGUF', fileState: 'ready', effort: 3, tokens: 1024, ctx: 8192 });
const fakeEngine = () => { window.__loads = []; Engine.load = function (m) { const self = this; window.__loads.push(m.id); self.setStatus('loading', 0);
  return new Promise(res => { let f = 0; const iv = setInterval(() => { f += 0.25; self.progress = f; self.setStatus('loading', f); if (f >= 1) { clearInterval(iv); self.modelId = m.id; self.adapter = null; self.setStatus('ready'); res(); } }, 150); }); }; };
const spySound = () => { window.__snd = []; const S = window.IngSound; if (S) ['play', 'voice'].forEach(k => { const o = S[k]; if (typeof o === 'function') S[k] = function (a) { window.__snd.push(k + ':' + a); return o.apply(this, arguments); }; });
  [window.AudioContext, window.webkitAudioContext].forEach(C => { if (!C || C.prototype.__spied) return; C.prototype.__spied = 1; ['createBufferSource', 'createOscillator'].forEach(k => { const o = C.prototype[k]; C.prototype[k] = function () { window.__snd.push('audio'); return o.apply(this, arguments); }; }); }); };
async function open(b, opts) {
  const ctx = await b.newContext(Object.assign({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 1 }, opts || {})); const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message.slice(0, 300)));
  await p.addInitScript(() => { window.__INGENIUM_DEVICE = { ramGB: 16, cores: 8 }; });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(700);
  await p.evaluate(M => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.theme = 'day'; applyTheme(); state.models = M; state.activeModelId = 'm1'; try { saveState(); } catch (e) {} renderModels(); go('models'); document.scrollingElement.scrollTop = 0; }, MODELS.map(rec));
  await sleep(2200); await p.evaluate(fakeEngine); await p.evaluate(spySound); return { ctx, p };
}
// the plate's face, read from its own canvas: how much brighter its edge is than the face just inside it (a pale ring shows as a bright band)
const ringGain = () => { const cv = document.querySelector('#page-models .tq canvas.tq-face'); if (!cv) return null; const g = cv.getContext('2d'), N = cv.width, u = N / 340, c = N / 2;
  const lum = (x, y) => { const d = g.getImageData(Math.round(x), Math.round(y), 1, 1).data; return d[3] ? 0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2] : null; };
  let worst = 0; for (let a = 0; a < 360; a += 15) { const ca = Math.cos(a * Math.PI / 180), sa = Math.sin(a * Math.PI / 180); let inside = 0, n = 0;
    for (let r = 146; r <= 152; r += 1) { const v = lum(c + ca * r * u, c + sa * r * u); if (v != null) { inside += v; n++; } } inside /= Math.max(1, n);
    for (let r = 155.5; r <= 158.2; r += 0.35) { const v = lum(c + ca * r * u, c + sa * r * u); if (v != null && inside > 0) worst = Math.max(worst, v / inside); } }
  return +worst.toFixed(3); };
(async () => {
  const b = await pw.chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  let { ctx, p } = await open(b);
  // ---------- the toy in the head ----------
  const h = await p.evaluate(() => { const pg = document.getElementById('page-models'), hd = pg.querySelector('.tr-head'), fit = hd && hd.querySelector('.tr-fit'), tq = fit && fit.querySelector(':scope > .tq'), tr = hd && hd.querySelector('.tr-turret');
    return { part: window.__ingParts && window.__ingParts.p304, on: pg.classList.contains('tq-on'), toy: !!tq, turretHidden: !tr || getComputedStyle(tr).display === 'none', how: (hd.querySelector('.tr-how') || {}).textContent,
      eyebrow: (hd.querySelector('.tr-eyebrow') || {}).textContent, says: (hd.querySelector('.tr-says') || {}).textContent, name: (hd.querySelector('.tr-name') || {}).textContent,
      size: tq ? [Math.round(tq.getBoundingClientRect().width), Math.round(fit.getBoundingClientRect().width)] : null, tags: tq ? [...tq.querySelectorAll('.tq-tag')].map(t => t.textContent) : [] }; });
  ok(h.part === 'running' && h.on && h.toy && h.turretHidden, 'the toy stands in the Models head, in place of the turret\'s own drawing', h);
  ok(/^The turret is a toy, all of it/.test(h.how) && /It loads nothing\. Load a model from Your models below\./.test(h.how), 'the head says the turret is a toy that loads nothing, and where models load', h.how);
  ok(h.size && Math.abs(h.size[0] - h.size[1]) <= 2, 'the toy fills the turret\'s place exactly', h.size);
  // her words (15 November 2026): "the purple catridge disappears or rather seems to glitch in and out of view from the turret when I click to spin it"
  const flat = await p.evaluate(() => [...document.querySelectorAll('#page-models .tq .tq-lens')].map(l => getComputedStyle(l).transformStyle));
  ok(flat.length >= 5 && flat.every(x => x === 'flat'), 'each cartridge is drawn flat, as one picture, so no engine can sort its ball behind its floor while the plate turns', flat);
  ok(['Atlas', 'Quill', 'Meridian'].every(n => h.tags.some(t => t.toUpperCase() === n.toUpperCase())), 'the models on this device are its coloured balls, named round the rim', h.tags);
  ok(/Load a model from Your models below\. It is then ready for Chat, (Blend|Concordia) and Lector\./.test(h.says) && h.name === 'Nothing in the engine', 'the card beside it says how to load a model, with nothing about pressing a lens', h);
  // ---------- the outline she asked to be removed: no pale ring at the plate's edge, by day and by night ----------
  const day = await p.evaluate(ringGain);
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await sleep(1200);
  const night = await p.evaluate(ringGain);
  ok(day != null && day < 1.06, 'by day the plate\'s face is no brighter at its edge than just inside it (no pale outline)', { day });
  ok(night != null && night < 1.06, 'by night the same: no pale outline round the plate', { night });
  const hd0 = await p.$('#page-models .tr-scene'); if (hd0) await hd0.screenshot({ path: path.join(OUT, 'toy_night.png') });
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); }); await sleep(900);
  if (hd0) await hd0.screenshot({ path: path.join(OUT, 'toy_day.png') });
  // ---------- pressed anywhere: it plays, sounds, and loads nothing ----------
  const box = await p.evaluate(() => { const r = document.querySelector('#page-models .tq').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  const spots = [[0.5, 0.5], [0.5, 0.22], [0.78, 0.4], [0.5, 0.95], [0.3, 0.3]]; let sounded = 0;
  for (const [fx, fy] of spots) { await p.evaluate(() => { window.__snd.length = 0; }); await p.mouse.move(box.x + box.w * fx, box.y + box.h * fy, { steps: 3 }); await sleep(150); await p.evaluate(() => { window.__snd.length = 0; });
    await p.mouse.down(); await sleep(80); await p.mouse.up(); await sleep(700); if ((await p.evaluate(() => window.__snd.length)) > 0) sounded++; }
  const l0 = await p.evaluate(() => ({ loads: window.__loads.slice(), st: Engine.status || null }));
  ok(sounded === spots.length, 'every part of the toy answers a press with Ingenium\'s sound (' + sounded + ' of ' + spots.length + ')', sounded);
  ok(l0.loads.length === 0, 'pressing the toy loads nothing', l0);
  // ---------- the rooms' cartridges: the toy's lenses, loading nothing; the Load key loads ----------
  await p.evaluate(() => { try { IngRooms.open('models', 'yours'); } catch (e) {} }); await sleep(900);
  const rc = await p.evaluate(() => { const ks = [...document.querySelectorAll('#modelList > .model-row > .tm-ic')]; return { n: ks.length, drawn: ks.filter(k => { const c = k.querySelector('canvas'); return c && c.__tq; }).length, labels: ks.map(k => k.getAttribute('aria-label')) }; });
  ok(rc.n === 3 && rc.drawn === 3, 'each model in Your models wears a cartridge drawn as the toy\'s lenses are', rc);
  ok(rc.labels.join('|') === 'Atlas|Quill|Meridian', 'a cartridge says only its model\'s name (it loads nothing)', rc.labels);
  const ic = await p.evaluate(() => { const k = document.querySelector('#modelList > .model-row > .tm-ic'); k.scrollIntoView({ block: 'center' }); const r = k.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await sleep(300); await p.evaluate(() => { window.__snd.length = 0; }); await p.mouse.click(ic.x, ic.y); await sleep(900);
  const rp = await p.evaluate(() => ({ loads: window.__loads.slice(), snd: window.__snd.length }));
  ok(rp.loads.length === 0 && rp.snd > 0, 'pressing a room\'s cartridge sounds and loads nothing', rp);
  await p.evaluate(() => { const k = document.querySelector('#modelList > .model-row .tm-load'); k.click(); }); await sleep(1500);
  const ld = await p.evaluate(() => ({ loads: window.__loads.slice(), name: document.querySelector('#page-models .tr-name').textContent, says: document.querySelector('#page-models .tr-says').textContent, key: document.querySelector('#modelList > .model-row .tm-load').textContent }));
  ok(ld.loads.join(',') === 'm1' && ld.name === 'Atlas is in the engine' && /Its Unload key in Your models below takes it out\./.test(ld.says) && ld.key === 'Unload', 'Your models\' Load key loads the model; the card says so and how to take it out', ld);
  // ---------- the compact layer ----------
  await p.evaluate(() => { document.scrollingElement.scrollTop = 0; }); await sleep(300);
  const c0 = await p.evaluate(() => window.IngModelsCompact.state());
  ok(c0.on && !c0.fold, 'the compact layer is on, and the page opens on its unfolded turret', c0);
  const tabs = await p.evaluate(() => [...document.querySelectorAll('#page-models .rm-tab')].map(t => t.getAttribute('data-room')));
  const tabKept = tabs.indexOf('get') >= 0 ? 'get' : tabs[1];
  await p.evaluate(r => { const t = document.querySelector('#page-models .rm-tab[data-room="' + r + '"]'); t.click(); }, tabKept); await sleep(900);
  const c1 = await p.evaluate(() => ({ s: window.IngModelsCompact.state(), headH: Math.round(document.querySelector('#page-models .tr-head').getBoundingClientRect().height), note: getComputedStyle(document.querySelector('#page-models .mc-unfold')).display }));
  ok(c1.s.fold && c1.headH < 330 && c1.note !== 'none', 'a room opened from its tab folds the head to a band, with a line saying a press unfolds it', c1);
  await p.screenshot({ path: path.join(OUT, 'folded.png') });
  const bandAt = await p.evaluate(() => { const r = document.querySelector('#page-models .tr-head .page-title').getBoundingClientRect(); return { x: r.left + 10, y: r.top + r.height / 2 }; });
  await p.mouse.click(bandAt.x, bandAt.y); await sleep(700);
  ok(!(await p.evaluate(() => window.IngModelsCompact.state().fold)), 'pressing the band unfolds the turret');
  await p.evaluate(r => { document.querySelector('#page-models .rm-tab[data-room="' + r + '"]').click(); }, tabKept); await sleep(500);
  await p.evaluate(() => { go('home'); }); await sleep(500); await p.evaluate(() => { go('models'); }); await sleep(800);
  ok(!(await p.evaluate(() => window.IngModelsCompact.state().fold)), 'opening the Models page again shows the turret unfolded');
  // the rooms' compact parts, where the page has them
  const parts = await p.evaluate(() => { const out = {}; ['get', 'catalogue', 'kept'].forEach(r => { try { IngRooms.open('models', r); } catch (e) {} out[r] = { shown: !!document.querySelector('#page-models .rm-panel[data-room="' + r + '"]:not([hidden])') }; });
    out.state = window.IngModelsCompact.state(); try { IngRooms.open('models', 'yours'); } catch (e) {} return out; });
  ok(parts.state.drawers >= 1, 'the long lists stand in drawers', parts);
  // the sheet: opened by a sheet key, closed by Escape
  const sh = await p.evaluate(() => { try { IngRooms.open('models', 'get'); } catch (e) {} const k = document.querySelector('#page-models .mc-aboutkey'); if (!k) return { none: true }; k.click(); return { open: window.IngModelsCompact.state().sheet }; });
  await p.keyboard.press('Escape'); await sleep(200);
  ok(sh.none || (sh.open && !(await p.evaluate(() => window.IngModelsCompact.state().sheet))), 'How the houses are chosen opens in a raised sheet in the window, and Escape closes it', sh);
  await p.evaluate(() => { try { IngRooms.open('models', 'yours'); } catch (e) {} });
  // ---------- at rest: about thirty frames a second; none off screen; none on another page ----------
  await p.mouse.move(2, 2); await p.evaluate(() => { document.scrollingElement.scrollTop = 0; }); await sleep(1500);
  const rate = async () => p.evaluate(() => new Promise(res => { const t = document.querySelector('#page-models .tq-tilt'); let n = 0; const mo = new MutationObserver(l => { n += l.length; }); mo.observe(t, { attributes: true, attributeFilter: ['style'] }); setTimeout(() => { mo.disconnect(); res(n / 2); }, 2000); }));
  const r0 = await rate();
  ok(r0 >= 20 && r0 <= 40, 'at rest the toy sways at about thirty frames a second (' + r0 + ')', r0);
  await p.evaluate(() => { document.scrollingElement.scrollTop = 4000; }); await sleep(900);
  const r1 = await rate();
  ok(r1 === 0, 'scrolled out of sight it draws nothing (' + r1 + ')', r1);
  await p.evaluate(() => { document.scrollingElement.scrollTop = 0; go('home'); }); await sleep(900);
  const r2 = await rate();
  ok(r2 === 0, 'on another page it draws nothing (' + r2 + ')', r2);
  await p.evaluate(() => { go('models'); document.scrollingElement.scrollTop = 0; }); await sleep(1200);
  const r3 = await rate();
  ok(r3 >= 20, 'back on the Models page it sways again (' + r3 + ')', r3);
  ok(p.__errs.length === 0, 'no page error', p.__errs);
  await ctx.close();
  // ---------- a finger, on a phone's screen ----------
  ({ ctx, p } = await open(b, { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }));
  const pb = await p.evaluate(() => { const t = document.querySelector('#page-models .tq'); t.scrollIntoView({ block: 'center' }); const r = t.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height, ta: getComputedStyle(t).touchAction }; });
  await sleep(500); let fsound = 0;
  for (const [fx, fy] of spots) { await p.evaluate(() => { window.__snd.length = 0; }); await p.touchscreen.tap(Math.round(pb.x + pb.w * fx), Math.round(pb.y + pb.h * fy)); await sleep(700); if ((await p.evaluate(() => window.__snd.length)) > 0) fsound++; }
  const fl = await p.evaluate(() => window.__loads.slice());
  ok(fsound === spots.length && fl.length === 0, 'on a phone a finger plays with every part of it (' + fsound + ' of ' + spots.length + ') and loads nothing', { fsound, fl });
  ok(pb.ta === 'pan-y', 'on a touch screen a finger moving up or down scrolls the page past it', pb.ta);
  await p.screenshot({ path: path.join(OUT, 'phone.png') });
  ok(p.__errs.length === 0, 'no page error on the phone', p.__errs);
  await ctx.close(); await b.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
