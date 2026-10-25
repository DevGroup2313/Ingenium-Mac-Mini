// Ingenium 6.7 · the analogue sounds (module r176, part p97), in Chromium: the sounds of the owner's other two apps, ported
// voice for voice and made on the device as they play; placed left or right by where they happened, in a small room; where
// they sound (the welcome door, a page chosen from the main menu, a notice, a reminder, the seal on Home) and where they
// never do (the quiet screen, Calm mode, a reply being written, Off); the 60 ms rule; the keys in the Display panel and in
// Settings, the panel of choices, each kept across a reload; axe-core by day and night on a desk and a phone; each of the
// thirteen voices rendered away from the speakers: not silent, never clipping.
//   node rig/t_67_sound.js http://127.0.0.1:8163/ingenium.html <out folder> [axe.min.js]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3] || path.join(__dirname, 'out_67_sound'); fs.mkdirSync(OUT, { recursive: true });
const AXE = [process.argv[4], process.env.AXE, process.env.AXE_JS, path.join(__dirname, 'a11y', 'axe.min.js')].find(f => f && fs.existsSync(f));
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 400) : '')); c ? pass++ : fail++; };
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';

// the lines of the built page that hold this module, so its errors can be told apart from another part's
function myRanges(html) {
  const lines = html.split('\n'), R = [];
  const s = lines.findIndex(l => l.includes('<style id="r176-css">')); if (s < 0) return R;
  let e = s; while (e < lines.length && !lines[e].includes('__ingParts["p97"]="running"')) e++; R.push([s + 1, e + 1]); return R;
}
function mine(text, R) { const m = [...String(text).matchAll(/ingenium\.html:(\d+):\d+/g)].map(x => +x[1]); return m.some(n => R.some(([a, b]) => n >= a && n <= b)) || /IngSound|r176|isc-|snd-/.test(text); }

// counts every sound source the live audio starts (OfflineAudioContext's rendering is left out), and keeps each stereo panner
function counter() {
  window.__snd = { osc: 0, buf: 0, started: 0, pans: [] };
  const B = (window.BaseAudioContext || window.AudioContext); if (!B) return; const P = B.prototype;
  const off = n => typeof OfflineAudioContext !== 'undefined' && n && n.context instanceof OfflineAudioContext;
  const co = P.createOscillator, cb = P.createBufferSource, cs = P.createStereoPanner;
  P.createOscillator = function () { const n = co.apply(this, arguments); if (!off(n)) window.__snd.osc++; return n; };
  P.createBufferSource = function () { const n = cb.apply(this, arguments); if (!off(n)) window.__snd.buf++; return n; };
  if (cs) P.createStereoPanner = function () { const n = cs.apply(this, arguments); if (!off(n)) window.__snd.pans.push(n); return n; };
  // an AudioBufferSourceNode has a start of its own, over the one every scheduled source shares: both are counted
  [window.AudioScheduledSourceNode, window.AudioBufferSourceNode, window.OscillatorNode].forEach(C => {
    if (!C || !Object.prototype.hasOwnProperty.call(C.prototype, 'start')) return; const st = C.prototype.start;
    C.prototype.start = function () { if (!off(this) && !this.__t67) { this.__t67 = 1; window.__snd.started++; } return st.apply(this, arguments); };
  });
}

async function open(b, opts, first) {
  const o = Object.assign({ viewport: { width: 1440, height: 900 } }, opts || {}); const insets = o.insets; delete o.insets;
  const ctx = await b.newContext(o); await ctx.addInitScript(counter);
  const p = await ctx.newPage(); p.__errs = [];
  if (insets) { const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setSafeAreaInsetsOverride', { insets }); }
  p.on('pageerror', e => p.__errs.push('pageerror: ' + (e.message || '') + ' ' + (e.stack || '')));
  p.on('console', m => { if (m.type() === 'error') p.__errs.push('console: ' + m.text() + ' ' + JSON.stringify(m.location())); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 });
  await p.waitForTimeout(800);
  return { ctx, p };
}
async function reload(p) { await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(800); }
const doorUp = p => p.evaluate(() => { const d = document.getElementById('introDoor'); return !!d && !d.hidden; });
async function enter(p, how) { if (!(await doorUp(p))) return false; if (how === 'tap') await p.tap('#introEnter'); else await p.click('#introEnter'); await p.waitForTimeout(500); return true; }
async function theme(p, t) { await p.evaluate((t) => { state.theme = t; applyTheme(); }, t); await p.waitForTimeout(500); }
const snap = p => p.evaluate(() => ({ started: window.__snd.started, n: IngSound.count(), last: IngSound.last() }));
// what one action plays: the sources started and the sounds IngSound itself played, after it settles
async function heard(p, fn, ms = 400) { const a = await snap(p); await fn(); await p.waitForTimeout(ms); const z = await snap(p); return { started: z.started - a.started, sounds: z.n - a.n, last: z.last }; }
async function displayOpen(p) {
  const shown = await p.evaluate(() => { const d = document.getElementById('displayPanel'); return !!d && !d.hidden; });
  if (!shown) { await p.click('#displayBtn'); await p.waitForTimeout(400); }
  await p.evaluate(() => { const s = document.getElementById('dpSoundSec'); if (s) s.scrollIntoView({ block: 'start' }); }); await p.waitForTimeout(200);
}
async function displayClose(p) { await p.evaluate(() => { const d = document.getElementById('displayPanel'); if (d && !d.hidden) d.setAttribute('hidden', ''); }); }
async function axeOn(p, where, sel) {
  if (!AXE) return [{ where, id: 'no axe.min.js given', n: 1 }];
  await p.addScriptTag({ path: AXE });
  await p.waitForTimeout(250);
  return p.evaluate(async ([where, sel]) => {
    const el = document.querySelector(sel); if (!el) return [{ where, id: 'missing ' + sel, n: 1 }];
    const r = await axe.run(el, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes: ['violations'] });
    return r.violations.map(v => ({ where, id: v.id, n: v.nodes.length, eg: v.nodes.slice(0, 3).map(n => n.target.join(' ') + ' ' + (n.failureSummary || '').slice(0, 160)) }));
  }, [where, sel]);
}
// test keys, placed on the left and the right of the window, each asking for a sound of its own
async function testKeys(p) {
  await p.evaluate(() => {
    if (document.getElementById('t67L')) return;
    [['t67L', 'left:24px'], ['t67R', 'right:24px'], ['t67C', 'left:calc(50% - 50px)']].forEach(([id, side]) => {
      const b = document.createElement('button'); b.id = id; b.type = 'button'; b.textContent = 'Test key ' + id.slice(3); b.setAttribute('data-ing-sound', 'confirm');
      b.style.cssText = 'position:fixed;bottom:120px;' + side + ';z-index:2147483000;width:100px;height:44px'; document.body.appendChild(b);
    });
  });
}
async function dropKeys(p) { await p.evaluate(() => ['t67L', 't67R', 't67C'].forEach(id => { const e = document.getElementById(id); if (e) e.remove(); })); }
const lastPan = p => p.evaluate(() => { const a = window.__snd.pans; return a.length ? +a[a.length - 1].pan.value.toFixed(3) : null; });

(async () => {
  const pageText = await (await fetch(URL_)).text(); const R = myRanges(pageText);
  ok(R.length === 1, 'the sound module is in the built page', R);
  const src = fs.readFileSync(path.join(__dirname, '..', 'build', 'modules', 'r176.js'), 'utf8');
  const code = src.replace(/\/\*[\s\S]*?\*\//g, ''), body = src.slice(src.indexOf('<script>') + 8, src.lastIndexOf('</script>'));
  ok(!/\b(claude|gpt|gemini|llama|qwen|mistral|anthropic|openai|deepseek)\b/i.test(src), 'no model is named anywhere in the module');
  ok(!/Lector|Carpe|Forge|Inkwell|cd_sound|cdPlay|cdSound/.test(code) && !/<\/script/i.test(body), 'outside its comments the module names none of the owner\'s other apps, reads none of their keys, and never closes its script early');
  ok(/ing_sound_67/.test(code), 'its settings are kept under Ingenium\'s own key, ing_sound_67');
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  let { ctx, p } = await open(b);
  const ED = await p.evaluate(() => typeof ING_EDITION !== 'undefined' ? ING_EDITION : 'master'); console.log('NOTE the ' + ED + ' edition');

  // ---------------- 1 · it is there, and quiet until a touch ----------------
  const api = await p.evaluate(() => ({ has: !!window.IngSound, part: (window.__ingParts || {}).p97, fns: ['play', 'voice', 'config', 'set', 'test', 'render', 'choices'].filter(k => typeof (window.IngSound || {})[k] === 'function'),
    cfg: window.IngSound && IngSound.config(), roles: window.IngSound && IngSound.roles.map(r => r.id + ':' + r.voices.join('/')), started: window.__snd.started, stored: localStorage.getItem('ing_sound_67') }));
  ok(api.has && api.part === 'running' && api.fns.length === 7, 'IngSound is there, its part runs to its end, with play, voice, config, set, test, render and choices', api);
  ok(api.roles.join(' ') === 'notify:deskChime/smallBell/waterDrop confirm:keepMark/softClick/feltPress room:dayTurn/lampLit/duskFall paper:deskSet/bookClose/boardLift/shelfPass', 'the four roles with the alternates the owner chose', api.roles);
  ok(api.cfg.on === true && api.cfg.vol === 0.25 && api.cfg.notify === 'deskChime' && api.cfg.confirm === 'keepMark' && api.cfg.room === 'dayTurn' && api.cfg.paper === 'deskSet', 'on by default, at a gentle level (0.25, about 0.45 of the template\'s 0.55), with her chosen four', api.cfg);
  ok(api.started === 0, 'nothing sounds before the first touch (a browser allows none, and nothing is started)', api.started);

  // ---------------- 2 · the thirteen voices, rendered away from the speakers ----------------
  const rend = await p.evaluate(async () => { const out = {}; for (const v of Object.keys(IngSound.names)) { const d = await IngSound.render(v, {}); const mx = await IngSound.render(v, { level: 1.5, pan: 0.35 }); const dry = await IngSound.render(v, { dry: true });
    out[v] = d && mx && dry ? { peak: +d.peak.toFixed(4), rms: +d.rms.toFixed(6), max: +mx.peak.toFixed(3), maxL: +mx.peakL.toFixed(3), maxR: +mx.peakR.toFixed(3), eL: mx.energyL, eR: mx.energyR, dryRms: +dry.rms.toFixed(6) } : null; } return out; });
  const vs = Object.keys(rend);
  ok(vs.length === 13 && vs.every(v => rend[v] && rend[v].peak > 0.005 && rend[v].rms > 0.0001), 'each of the thirteen voices renders, and none is silent', vs.map(v => v + ' ' + (rend[v] && rend[v].peak)));
  ok(vs.every(v => rend[v] && rend[v].peak < 1 && rend[v].max < 1), 'none clips: every peak stays below 1.0, at the default level and at the very loudest (volume full, its own level at 150%, placed to one side)', vs.map(v => v + ' ' + (rend[v] && rend[v].max)));
  ok(vs.every(v => rend[v] && rend[v].eR > rend[v].eL * 2), 'placed to the right, each carries well over twice the energy in the right ear as in the left', vs.map(v => v + ' ' + (rend[v] && (rend[v].eR / rend[v].eL).toFixed(2))));
  const roomT = await p.evaluate(async () => { const w = await IngSound.render('keepMark', { tailFrom: 0.4, seconds: 2 }), d = await IngSound.render('keepMark', { dry: true, tailFrom: 0.4, seconds: 2 }); return { wet: w.tail, dry: d.tail, db: 20 * Math.log10(w.tail / d.rms) }; });
  ok(roomT.dry === 0 && roomT.wet > 0 && roomT.db < -15 && roomT.db > -60, 'a small room around each sound: after Keep mark ends, its room rings on a little, well under the sound itself', roomT);

  // ---------------- 3 · the welcome door: Enter plays the room tone, once ----------------
  const door = await doorUp(p);
  ok(door, 'the welcome door is up at the start');
  let h = await heard(p, () => enter(p), 600);
  ok(h.sounds === 1 && h.last && h.last.role === 'room' && h.last.voice === 'dayTurn' && h.started === 4, 'the door\'s Enter plays the room tone (Day turn) once: four tones started', h);
  ok(Math.abs(h.last.pan) < 0.06, 'Enter is in the middle of the window, and so is its sound', h.last && h.last.pan);
  const st = await p.evaluate(() => { const a = window.fdAudioCtx && window.fdAudioCtx(); return a ? a.state : null; });
  ok(st === 'running', 'the audio woke inside that press, and it is the Clepsydra\'s own (one audio for the page)', st);
  await p.waitForTimeout(1600);

  // ---------------- 4 · a page chosen from the main menu: the wood and paper sound, once ----------------
  h = await heard(p, () => p.click('.dock .nav-btn[data-page="focus"]'), 500);
  ok(h.sounds === 1 && h.last && h.last.role === 'paper' && h.last.voice === 'deskSet' && h.started > 20, 'choosing Focus in the side bar plays Desk set once (its grains and its low body)', h);
  ok(h.last && h.last.pan < 0, 'the side bar is on the left, and the sound leans left', h.last && h.last.pan);
  h = await heard(p, () => p.click('.dock .nav-btn[data-page="focus"]'), 400);
  ok(h.sounds === 0 && h.started === 0, 'pressing the page already open moves nowhere, and plays nothing', h);
  h = await heard(p, () => p.evaluate(() => go('home')), 400);
  ok(h.sounds === 0, 'a page opened by the app itself (not from the menu) plays nothing', h);

  // ---------------- 5 · notices and reminders ----------------
  await p.waitForTimeout(500);
  h = await heard(p, () => p.evaluate(() => ingToast('A gentle notice for the test.')), 400);
  ok(h.sounds === 1 && h.last && h.last.role === 'notify' && h.last.voice === 'deskChime', 'a notice at the foot of the page plays the Desk chime', h);
  await p.waitForTimeout(700);
  h = await heard(p, () => p.evaluate(() => ingToast('Saved. Your page is kept on this device.')), 400);
  ok(h.sounds === 1 && h.last && h.last.role === 'confirm' && h.last.voice === 'keepMark', 'a notice that something was saved plays Keep mark instead', h);
  await p.waitForTimeout(700);
  h = await heard(p, () => p.evaluate(() => ingToast('The file could not be saved: the disk is full.')), 400);
  ok(h.sounds === 0 || (h.last && h.last.role === 'notify'), 'a notice that something could not be saved is not taken for a keeping (it may chime, never Keep mark)', h);
  await p.waitForTimeout(1600);
  h = await heard(p, () => p.evaluate(() => supNotice('A reminder for the test: time to stretch.', [], { timeout: 5000 })), 400);
  ok(h.sounds === 1 && h.last && h.last.role === 'notify', 'a reminder card (the support module\'s notice) plays the chime', h);
  ok(h.last && h.last.pan < 0, 'the reminder card stands at the bottom left, and its chime leans left', h.last && h.last.pan);
  h = await heard(p, () => p.evaluate(() => { ingToast('Second notice.'); ingToast('Third notice.'); supNotice('Another reminder.', [], { timeout: 3000 }); }), 400);
  ok(h.sounds === 0, 'notices arriving together do not chatter: a chime waits a moment and a half before the next', h);
  await p.waitForTimeout(1600);
  // the Clepsydra's own chime at the end of a session is never doubled
  h = await heard(p, () => p.evaluate(() => { state.clep.sound = true; pomoChime(); supNotice('A session ended.', [], { timeout: 3000 }); }), 500);
  ok(h.sounds === 0 && h.started === 2, 'when the Clepsydra rings its own chime, the notice beside it stays silent (only its two tones play)', h);
  await p.waitForTimeout(2200);

  // ---------------- 6 · the 60 ms rule, and where a sound is placed ----------------
  const burst = await p.evaluate(() => { const a = IngSound.count(); const r = []; for (let i = 0; i < 10; i++) r.push(IngSound.play('confirm')); return { played: IngSound.count() - a, r }; });
  ok(burst.played === 1, 'ten calls in the same breath play once (the template\'s 60 ms rule)', burst);
  await p.waitForTimeout(70);
  const after = await p.evaluate(() => IngSound.play('paper'));
  ok(after === true, 'past 60 ms another kind sounds again at once', after);
  await testKeys(p); await p.waitForTimeout(300);
  h = await heard(p, async () => { for (let i = 0; i < 8; i++) await p.click('#t67C', { delay: 0 }); }, 300);
  ok(h.sounds >= 1 && h.sounds <= 3, 'eight quick presses on one key do not chatter', h);
  await p.waitForTimeout(400);
  h = await heard(p, () => p.click('#t67R'), 300); const pr = await lastPan(p);
  ok(h.sounds === 1 && h.last.pan > 0.25 && h.last.pan <= 0.35 && pr > 0.25, 'a key on the right of the window sounds from the right (a stereo place above zero, at most 0.35)', [h.last && h.last.pan, pr]);
  await p.waitForTimeout(300);
  h = await heard(p, () => p.click('#t67L'), 300); const pl = await lastPan(p);
  ok(h.sounds === 1 && h.last.pan < -0.25 && h.last.pan >= -0.35 && pl < -0.25, 'and a key on the left from the left (below zero)', [h.last && h.last.pan, pl]);
  await p.waitForTimeout(300);
  h = await heard(p, async () => { await p.focus('#t67R'); await p.keyboard.press('Enter'); }, 300);
  ok(h.sounds === 1 && h.last.pan === 0, 'the same key pressed from the keyboard sounds from the middle', h.last);
  await p.waitForTimeout(300);

  // ---------------- 7 · silence where it matters ----------------
  const hasQuiet = await p.evaluate(() => !!(window.IngQuiet && IngQuiet.open));
  if (hasQuiet) {
    await p.evaluate(() => IngQuiet.open()); await p.waitForTimeout(500);
    h = await heard(p, async () => { await p.evaluate(() => { ingToast('A notice behind the quiet screen.'); supNotice('A reminder behind it.', [], { timeout: 2000 }); IngSound.play('paper'); IngSound.test(); }); }, 3400);
    ok(h.sounds === 0 && h.started === 0, 'nothing plays while the quiet screen is open (a notice, a reminder, a page, the test)', h);
    await p.evaluate(() => IngQuiet.close()); await p.waitForTimeout(500);
  } else ok(false, 'the quiet screen is there to test');
  h = await heard(p, async () => { await p.evaluate(() => { document.documentElement.setAttribute('data-sc-calm', ''); ingToast('A notice in Calm mode.'); IngSound.play('paper'); }); }, 400);
  await p.evaluate(() => document.documentElement.removeAttribute('data-sc-calm'));
  ok(h.sounds === 0 && h.started === 0, 'nothing plays in Calm mode, which promises "no motion, no sounds"', h);
  h = await heard(p, async () => { await p.evaluate(() => { const m = document.createElement('div'); m.className = 'msg msg-live'; m.id = 't67live'; document.body.appendChild(m); IngSound.play('confirm'); ingToast('A notice while a reply is written.'); }); }, 400);
  await p.evaluate(() => { const m = document.getElementById('t67live'); if (m) m.remove(); });
  ok(h.sounds === 0 && h.started === 0, 'nothing plays while a reply is being written word by word', h);
  h = await heard(p, async () => { await p.evaluate(() => go('chat')); await p.waitForTimeout(500); const box = await p.$('#chatInput'); if (box) { await box.click(); await p.keyboard.type('typing makes no sound', { delay: 15 }); } }, 400);
  ok(h.sounds <= 1 && (h.sounds === 0 || h.last.role !== 'confirm'), 'typing makes no sound', h);
  await p.evaluate(() => { const i = document.getElementById('chatInput'); if (i) { i.value = ''; i.dispatchEvent(new Event('input', { bubbles: true })); } go('home'); });
  await p.waitForTimeout(600);

  // ---------------- 8 · the Display panel's Sound section ----------------
  await displayOpen(p);
  const dp = await p.evaluate(() => { const s = document.getElementById('dpSound'), sec = document.getElementById('dpSoundSec'), secs = [...document.querySelectorAll('#displayPanel .dp-sec')].map(x => x.textContent.trim());
    return { sec: sec && sec.textContent.trim(), secs, last: secs[secs.length - 1], inPanel: !!(s && s.closest('#displayPanel')) }; });
  ok(dp.inPanel && dp.sec === 'Sound' && dp.last === 'Sound' && dp.secs.indexOf('Feel') >= 0, 'the Display panel has a Sound section at its foot, after Feel', dp.secs);
  const names = { on: await p.locator('#dpSound').getByRole('button', { name: 'On', exact: true }).count(), off: await p.locator('#dpSound').getByRole('button', { name: 'Off', exact: true }).count(),
    group: await p.locator('#dpSound').getByRole('group', { name: 'Sounds' }).count(), vol: await p.locator('#dpSound').getByRole('slider', { name: 'Volume' }).count(),
    more: await p.locator('#dpSound').getByRole('button', { name: 'More sound choices' }).count(), test: await p.locator('#dpSound').getByRole('button', { name: 'Test the sounds' }).count() };
  ok(Object.values(names).every(n => n === 1), 'each is named for a screen reader: the Sounds group with On and Off, the Volume slider, More sound choices, Test the sounds', names);
  const aria = await p.evaluate(() => ({ on: document.querySelector('#dpSound [data-snd-on="1"]').getAttribute('aria-pressed'), off: document.querySelector('#dpSound [data-snd-on="0"]').getAttribute('aria-pressed'),
    vt: document.getElementById('dpSndVol').getAttribute('aria-valuetext'), word: document.querySelector('#dpSound [data-snd-word]').textContent, note: document.getElementById('dpSndNote').textContent, live: document.getElementById('dpSndNote').getAttribute('aria-live') }));
  ok(aria.on === 'true' && aria.off === 'false' && aria.vt === 'Gentle, 25 percent' && aria.word === 'Gentle' && aria.live === 'polite', 'On is pressed; the volume is told in words (Gentle, 25 percent) to the eye and the ear', aria);
  ok(!/[–—]| - /.test(aria.note) && aria.note.length > 10, 'its note is in plain words, with no dashes', aria.note);
  // the volume by keyboard: words follow, and the setting is kept
  await p.focus('#dpSndVol'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300);
  const vol = await p.evaluate(() => ({ v: IngSound.config().vol, vt: document.getElementById('dpSndVol').getAttribute('aria-valuetext'), stored: JSON.parse(localStorage.getItem('ing_sound_67') || '{}').vol }));
  ok(Math.abs(vol.v - 0.4) < 1e-9 && vol.vt === 'Clear, 40 percent' && Math.abs(vol.stored - 0.4) < 1e-9, 'three steps up from the keyboard: 40 percent, Clear, kept at once', vol);
  await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(OUT, 's67-display-desk-day.png') });
  // Test plays the four
  h = await heard(p, () => p.click('#dpSndTest'), 3600);
  ok(h.sounds === 4 && h.started > 30, 'Test the sounds plays the four, one after another', h);
  // Off: nothing at all
  await p.click('#dpSound [data-snd-on="0"]'); await p.waitForTimeout(300);
  const offA = await p.evaluate(() => ({ cfg: IngSound.config().on, on: document.querySelector('#dpSound [data-snd-on="1"]').getAttribute('aria-pressed'), off: document.querySelector('#dpSound [data-snd-on="0"]').getAttribute('aria-pressed'), note: document.getElementById('dpSndNote').textContent, stored: JSON.parse(localStorage.getItem('ing_sound_67')).on }));
  ok(offA.cfg === false && offA.off === 'true' && offA.on === 'false' && offA.stored === false && /off/i.test(offA.note), 'Off is pressed, said, and kept', offA);
  h = await heard(p, async () => { await displayClose(p); await p.click('.dock .nav-btn[data-page="focus"]'); await p.waitForTimeout(300); await p.evaluate(() => { ingToast('A notice while sounds are off.'); supNotice('A reminder while sounds are off.', [], { timeout: 2000 }); IngSound.play('paper'); IngSound.voice('smallBell'); IngSound.test(); });
    await p.click('#t67R'); await displayOpen(p); await p.click('#dpSndTest'); }, 3400);
  ok(h.sounds === 0 && h.started === 0, 'with sounds off nothing plays at all: a page, a notice, a reminder, a key, the test', h);
  const offNote = await p.evaluate(() => document.getElementById('dpSndNote').textContent);
  ok(/Turn them on/.test(offNote), 'Test the sounds says, calmly, that sounds are off', offNote);
  await p.evaluate(() => go('home')); await p.waitForTimeout(300);
  await reload(p);
  const kept = await p.evaluate(() => ({ cfg: IngSound.config(), started: window.__snd.started }));
  ok(kept.cfg.on === false && Math.abs(kept.cfg.vol - 0.4) < 1e-9, 'after a reload, Off and the volume are as they were left', kept.cfg);
  h = await heard(p, async () => { if (await doorUp(p)) await enter(p); else await p.mouse.click(700, 450); await p.click('.dock .nav-btn[data-page="focus"]'); }, 500);
  ok(h.sounds === 0 && h.started === 0, 'and after the reload, with sounds off, the door and the side bar stay silent', h);
  await displayOpen(p);
  const offB = await p.evaluate(() => document.querySelector('#dpSound [data-snd-on="0"]').getAttribute('aria-pressed'));
  ok(offB === 'true', 'the Display panel shows Off after the reload', offB);
  // on again: the panel answers with a Keep mark, and Test plays
  h = await heard(p, () => p.click('#dpSound [data-snd-on="1"]'), 400);
  ok(h.sounds === 1 && h.last && h.last.role === 'confirm', 'On again answers with a soft Keep mark', h);
  await p.waitForTimeout(300);
  h = await heard(p, () => p.click('#dpSndTest'), 3600);
  ok(h.sounds === 4 && h.started > 30, 'turned on, Test the sounds plays again', h);

  // ---------------- 9 · More sound choices ----------------
  await p.click('#dpSndMore'); await p.waitForTimeout(500);
  const dlg = await p.evaluate(() => { const b = document.getElementById('ingSoundChoices'), x = b && b.querySelector('[role="dialog"]'); return { open: !!x, modal: x && x.getAttribute('aria-modal'), title: x && document.getElementById(x.getAttribute('aria-labelledby')).textContent,
    focus: !!(x && x.contains(document.activeElement)), legends: x ? [...x.querySelectorAll('legend')].map(l => l.textContent) : [], listen: x ? x.querySelectorAll('[data-listen]').length : 0, radios: x ? x.querySelectorAll('input[type=radio]').length : 0,
    checked: x ? [...x.querySelectorAll('input[type=radio]:checked')].map(i => i.value) : [], panelOpen: !document.getElementById('displayPanel').hidden }; });
  ok(dlg.open && dlg.modal === 'true' && dlg.title === 'Sound choices' && dlg.focus, 'More sound choices opens a dialog of its own, named, with the focus inside', dlg);
  ok(dlg.legends.join('|') === 'Notices and reminders|Keeping something|Entering Ingenium|Moving between pages' && dlg.radios === 13 && dlg.listen === 13, 'each role in plain words, its sounds as choices, a Listen key for each of the thirteen', dlg.legends);
  ok(dlg.checked.join() === 'deskChime,keepMark,dayTurn,deskSet' && dlg.panelOpen, 'the chosen four are marked, and the Display panel stays open under it', dlg.checked);
  const nm = { listen: await p.locator('#ingSoundChoices').getByRole('button', { name: 'Listen to Water drop' }).count(), radio: await p.locator('#ingSoundChoices').getByRole('radio', { name: 'Small bell' }).count(),
    lvl: await p.locator('#ingSoundChoices').getByRole('slider', { name: 'Its level' }).count(), close: await p.locator('#ingSoundChoices').getByRole('button', { name: 'Close sound choices' }).count() };
  ok(nm.listen === 1 && nm.radio === 1 && nm.lvl === 4 && nm.close === 1, 'named for a screen reader: Listen to Water drop, the Small bell choice, a level for each role, Close', nm);
  await p.screenshot({ path: path.join(OUT, 's67-choices-desk-day.png') });
  h = await heard(p, () => p.click('#ingSoundChoices [data-listen="waterDrop"]'), 400);
  ok(h.sounds === 1 && h.last && h.last.voice === 'waterDrop' && h.started === 1, 'Listen plays that sound (Water drop), and only that', h);
  await p.waitForTimeout(200);
  h = await heard(p, () => p.click('#ingSoundChoices [data-listen="shelfPass"]'), 600);
  ok(h.sounds === 1 && h.last && h.last.voice === 'shelfPass', 'Listen to Shelf pass plays Shelf pass', h);
  await p.waitForTimeout(200);
  h = await heard(p, () => p.click('#ingSoundChoices label[data-voice="smallBell"]'), 400);
  const ch = await p.evaluate(() => ({ cfg: IngSound.config().notify, stored: JSON.parse(localStorage.getItem('ing_sound_67')).notify, on: document.querySelector('#ingSoundChoices label[data-voice="smallBell"]').classList.contains('on') }));
  ok(ch.cfg === 'smallBell' && ch.stored === 'smallBell' && ch.on && h.sounds === 1 && h.last.voice === 'smallBell', 'choosing Small bell for notices plays it, marks it and keeps it', [ch, h.last]);
  await p.focus('#iscL-notify'); for (let i = 0; i < 5; i++) await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(300);
  const tr = await p.evaluate(() => ({ t: IngSound.config().trim.notify, vt: document.getElementById('iscL-notify').getAttribute('aria-valuetext'), stored: JSON.parse(localStorage.getItem('ing_sound_67')).trim.notify }));
  ok(Math.abs(tr.t - 0.5) < 1e-9 && tr.vt === 'Softer than the others, 50 percent' && Math.abs(tr.stored - 0.5) < 1e-9, 'the notices\' own level, five steps down by keyboard: 50 percent, told as Softer than the others, kept', tr);
  // keyboard: arrows move between the choices
  await p.focus('#isc-keepMark'); await p.waitForTimeout(80); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(250);
  const arrow = await p.evaluate(() => IngSound.config().confirm);
  ok(arrow === 'softClick', 'the arrow keys move between a role\'s choices (Keep mark to Soft click)', arrow);
  await p.focus('#isc-softClick'); await p.keyboard.press('ArrowUp'); await p.waitForTimeout(250);
  // Tab stays inside
  const trap = await p.evaluate(async () => { const box = document.querySelector('#ingSoundChoices .isc-box'); const ks = [...box.querySelectorAll('button,input')].filter(e => e.getClientRects().length); ks[ks.length - 1].focus(); return ks.length; });
  await p.keyboard.press('Tab'); const inside = await p.evaluate(() => document.getElementById('ingSoundChoices').contains(document.activeElement));
  ok(trap > 10 && inside, 'Tab stays inside the dialog', { keys: trap, inside });
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(OUT, 's67-choices-desk-night.png') });
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  const closed = await p.evaluate(() => ({ gone: !document.getElementById('ingSoundChoices'), focus: document.activeElement && document.activeElement.id, panel: !document.getElementById('displayPanel').hidden }));
  ok(closed.gone && closed.focus === 'dpSndMore' && closed.panel, 'Escape closes it, the focus goes back to More sound choices, and the Display panel is still open', closed);
  await reload(p);
  const kept2 = await p.evaluate(() => IngSound.config());
  ok(kept2.notify === 'smallBell' && Math.abs(kept2.trim.notify - 0.5) < 1e-9 && kept2.confirm === 'keepMark' && kept2.on === true, 'after a reload, the choice and its level are as they were left', kept2);
  if (await doorUp(p)) await enter(p);
  await p.waitForTimeout(1700);
  h = await heard(p, () => p.evaluate(() => ingToast('A notice after the reload.')), 400);
  ok(h.sounds === 1 && h.last && h.last.voice === 'smallBell' && Math.abs(h.last.level - 0.2) < 1e-9, 'a notice now plays the Small bell, at its own level (0.4 times 0.5)', h.last);

  // ---------------- 10 · the same keys in Settings ----------------
  await p.evaluate(() => go('settings')); await p.waitForTimeout(900);
  const card = await p.evaluate(() => { const c = document.getElementById('ingSoundCard'); if (!c) return null; const h2 = c.querySelector('h2.sec'); c.scrollIntoView({ block: 'start' });
    return { cls: c.className, h: h2 && h2.textContent, prev: c.previousElementSibling && (c.previousElementSibling.querySelector('h2') || {}).textContent, on: c.querySelector('[data-snd-on="1"]').getAttribute('aria-pressed'), vt: c.querySelector('[data-snd-vol]').getAttribute('aria-valuetext'), lede: (c.querySelector('.snd-lede') || {}).textContent }; });
  ok(card && /\bcard\b/.test(card.cls) && card.h === 'Sound' && card.prev === 'Look and feel', 'Settings has a Sound card (a plain card, its heading an h2), beside Look and feel', card);
  ok(card && card.on === 'true' && card.vt === 'Clear, 40 percent' && !/[–—]| - /.test(card.lede), 'it shows the same settings, in plain words', card);
  await p.click('#ingSoundCard [data-snd-on="0"]'); await p.waitForTimeout(200);
  await displayOpen(p);
  const sync = await p.evaluate(() => ({ cfg: IngSound.config().on, dp: document.querySelector('#dpSound [data-snd-on="0"]').getAttribute('aria-pressed') }));
  ok(sync.cfg === false && sync.dp === 'true', 'Off pressed in Settings shows Off in the Display panel too', sync);
  await displayClose(p);
  await p.click('#ingSoundCard [data-snd-on="1"]'); await p.waitForTimeout(200);
  await p.click('#setSndMore'); await p.waitForTimeout(400);
  const fromCard = await p.evaluate(() => !!document.getElementById('ingSoundChoices'));
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  const back2 = await p.evaluate(() => document.activeElement && document.activeElement.id);
  ok(fromCard && back2 === 'setSndMore', 'More sound choices opens from Settings too, and gives the focus back there', [fromCard, back2]);
  await theme(p, 'day'); await p.screenshot({ path: path.join(OUT, 's67-settings-card-day.png') });
  await theme(p, 'night'); await p.screenshot({ path: path.join(OUT, 's67-settings-card-night.png') });

  // ---------------- 11 · axe-core, desk, by day and by night ----------------
  let v = [];
  for (const t of ['day', 'night']) {
    await theme(p, t); await p.evaluate(() => go('home')); await p.waitForTimeout(500);
    await displayOpen(p); v.push(...await axeOn(p, 'desk/' + t + '/display', '#displayPanel'));
    await p.click('#dpSndMore'); await p.waitForTimeout(500); v.push(...await axeOn(p, 'desk/' + t + '/choices', '#ingSoundChoices'));
    await p.keyboard.press('Escape'); await displayClose(p);
    await p.evaluate(() => go('settings')); await p.waitForTimeout(700); v.push(...await axeOn(p, 'desk/' + t + '/settings-card', '#ingSoundCard'));
  }
  ok(v.length === 0, 'axe-core: no rule broken in the Display panel, the choices or the Sound card, by day and by night, on a desk', v);
  await theme(p, 'day');

  // ---------------- 12 · the seal on Home ----------------
  await p.evaluate(() => go('home')); await p.waitForTimeout(800);
  const seal = await p.$('#hxSeal');
  if (seal) {
    await p.waitForTimeout(700);
    h = await heard(p, () => p.click('#hxSeal'), 400);
    ok(h.sounds === 1 && h.last && h.last.role === 'paper' && h.last.pan < 0, 'pressing the seal on Home sets down a wooden Desk set, from the left where it stands', h);
    const sp = await p.evaluate(() => typeof window.IngSealPlay === 'function' ? 'IngSealPlay' : 'the element');
    console.log('NOTE the seal\'s press is heard through ' + sp);
  } else console.log('NOTE no seal on Home in this edition');
  await dropKeys(p);
  const errs1 = p.__errs.slice(); await ctx.close();

  // ---------------- 13 · a phone with the iPhone's notch: the panel fits, the keys take a finger ----------------
  const phoneOpts = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, userAgent: IPHONE, insets: { top: 59, bottom: 34, left: 0, right: 0 } };
  ({ ctx, p } = await open(b, phoneOpts));
  h = await heard(p, () => enter(p, 'tap'), 600);
  ok(h.sounds === 1 && h.last && h.last.role === 'room', 'on a phone, a tap on Enter plays the room tone once (the first touch wakes the sound)', h);
  await p.waitForTimeout(1600);
  h = await heard(p, async () => { const k = await p.$('.dock .nav-btn[data-page="focus"]'); await k.scrollIntoViewIfNeeded(); await k.tap(); }, 500);
  ok(h.sounds === 1 && h.last && h.last.role === 'paper', 'a tap on a page in the strip at the top plays Desk set once', h);
  await p.evaluate(() => go('home')); await p.waitForTimeout(500);
  await p.tap('#displayBtn'); await p.waitForTimeout(500);
  await p.evaluate(() => { const s = document.getElementById('dpSoundSec'); s.scrollIntoView({ block: 'start' }); }); await p.waitForTimeout(300);
  const ph = await p.evaluate(() => { const pn = document.getElementById('displayPanel').getBoundingClientRect(); const ks = [...document.querySelectorAll('#dpSound .seg-btn, #dpSndVol')].map(e => { const r = e.getBoundingClientRect(); return { t: e.id || e.textContent.trim(), h: Math.round(r.height), w: Math.round(r.width), right: Math.round(r.right), bottom: Math.round(r.bottom) }; });
    return { panel: { left: Math.round(pn.left), right: Math.round(pn.right), top: Math.round(pn.top), bottom: Math.round(pn.bottom) }, ks, vw: innerWidth, vh: innerHeight, scrollW: document.documentElement.scrollWidth }; });
  ok(ph.ks.length === 5 && ph.ks.every(k => k.h >= 44), 'on a phone each Sound key and the volume slider are at least 44 pixels tall', ph.ks.map(k => k.t + ' ' + k.h));
  ok(ph.panel.right <= ph.vw && ph.panel.left >= 0 && ph.ks.every(k => k.right <= ph.panel.right) && ph.panel.top >= 59 && ph.panel.bottom <= ph.vh - 34 + 1 && ph.scrollW <= ph.vw, 'the panel fits the phone inside the notch and the home bar, its Sound keys inside it, and nothing scrolls sideways', ph.panel);
  await p.screenshot({ path: path.join(OUT, 's67-display-phone-day.png') });
  await p.tap('#dpSndMore'); await p.waitForTimeout(500);
  const pd = await p.evaluate(() => { const bx = document.querySelector('#ingSoundChoices .isc-box').getBoundingClientRect(); const small = [...document.querySelectorAll('#ingSoundChoices .seg-btn, #ingSoundChoices .btn, #ingSoundChoices .isc-x, #ingSoundChoices input[type=range]')].filter(e => e.getBoundingClientRect().height < 44).map(e => e.textContent.trim() || e.id);
    return { left: Math.round(bx.left), right: Math.round(bx.right), top: Math.round(bx.top), bottom: Math.round(bx.bottom), small, vw: innerWidth, vh: innerHeight, sw: document.querySelector('#ingSoundChoices .isc-box').scrollWidth, cw: document.querySelector('#ingSoundChoices .isc-box').clientWidth }; });
  ok(pd.left >= 0 && pd.right <= pd.vw && pd.top >= 59 && pd.bottom <= pd.vh - 34 && pd.sw <= pd.cw && pd.small.length === 0, 'the choices fit the phone between the notch and the home bar, scroll only up and down, and every key is at least 44 pixels', pd);
  await p.screenshot({ path: path.join(OUT, 's67-choices-phone-day.png') });
  h = await heard(p, async () => { const k = await p.$('#ingSoundChoices [data-listen="lampLit"]'); await k.scrollIntoViewIfNeeded(); await k.tap(); }, 500);
  ok(h.sounds === 1 && h.last && h.last.voice === 'lampLit', 'a tap on Listen plays that sound on a phone', h);
  v = [];
  for (const t of ['day', 'night']) {
    await theme(p, t);
    v.push(...await axeOn(p, 'phone/' + t + '/choices', '#ingSoundChoices'));
    if (t === 'night') await p.screenshot({ path: path.join(OUT, 's67-choices-phone-night.png') });
    await p.evaluate(() => IngSound.close()); await p.waitForTimeout(200);
    const shown = await p.evaluate(() => !document.getElementById('displayPanel').hidden); if (!shown) { await p.tap('#displayBtn'); await p.waitForTimeout(400); }
    await p.evaluate(() => document.getElementById('dpSoundSec').scrollIntoView({ block: 'start' })); await p.waitForTimeout(200);
    v.push(...await axeOn(p, 'phone/' + t + '/display', '#displayPanel'));
    if (t === 'night') await p.screenshot({ path: path.join(OUT, 's67-display-phone-night.png') });
    await displayClose(p);
    await p.evaluate(() => go('settings')); await p.waitForTimeout(700);
    await p.evaluate(() => document.getElementById('ingSoundCard').scrollIntoView({ block: 'start' })); await p.waitForTimeout(200);
    v.push(...await axeOn(p, 'phone/' + t + '/settings-card', '#ingSoundCard'));
    if (t === 'night') await p.screenshot({ path: path.join(OUT, 's67-settings-phone-night.png') });
    await p.evaluate(() => go('home')); await p.waitForTimeout(400);
    if (t === 'day') { await p.tap('#displayBtn'); await p.waitForTimeout(400); await p.evaluate(() => document.getElementById('dpSoundSec').scrollIntoView({ block: 'start' })); await p.tap('#dpSndMore'); await p.waitForTimeout(400); }
  }
  ok(v.length === 0, 'axe-core: no rule broken in the Display panel, the choices or the Sound card, by day and by night, on a phone', v);
  // 375 pixels wide, the smallest iPhone in use
  await p.setViewportSize({ width: 375, height: 812 }); await p.evaluate(() => go('home')); await p.waitForTimeout(500);
  await p.tap('#displayBtn'); await p.waitForTimeout(400); await p.evaluate(() => document.getElementById('dpSoundSec').scrollIntoView({ block: 'start' })); await p.waitForTimeout(200);
  const n375 = await p.evaluate(() => { const pn = document.getElementById('displayPanel').getBoundingClientRect(); const over = [...document.querySelectorAll('#dpSound *')].filter(e => e.getBoundingClientRect().right > pn.right + 0.5).map(e => e.tagName + (e.id ? '#' + e.id : '')); return { right: Math.round(pn.right), vw: innerWidth, over, sw: document.documentElement.scrollWidth }; });
  ok(n375.right <= n375.vw && n375.over.length === 0 && n375.sw <= n375.vw, 'at 375 pixels the Sound section still fits inside the panel and the window', n375);
  await p.screenshot({ path: path.join(OUT, 's67-display-375.png') });
  const errs2 = p.__errs.slice(); await ctx.close();

  // ---------------- 14 · no errors ----------------
  const all = errs1.concat(errs2), ours = all.filter(e => mine(e, R)), pageErrs = all.filter(e => /^pageerror/.test(e));
  ok(ours.length === 0 && pageErrs.length === 0, 'no page errors, and no console error from the sound module', { ours: ours.slice(0, 3), pageErrs: pageErrs.slice(0, 3), others: all.length });
  if (all.length && !ours.length) console.log('NOTE console errors from other parts: ' + all.length + ' (e.g. ' + all[0].slice(0, 200) + ')');
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL crashed: ' + (e && e.stack || e)); console.log(`\n${pass} passed, ${fail + 1} failed`); process.exit(1); });
