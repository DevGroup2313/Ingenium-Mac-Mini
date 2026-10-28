// node rig/t_682_sounds.js <Ingenium page url> <out dir>
// 6.8.4: her words, "I actually do want the same warm upbeat welcoming sounds from Carpe Diem on Ingenium, I just don't
// want them identical but I do want them closely related, I want them very similar to Carpe Diem's in every way to stay in
// the family and keep the same feel. The sound is slightly better now but still too slow and sounds off." So each voice is
// held to its relative in Carpe Diem: as loud (its loudest 50 milliseconds within 0.6 to 1.4 of the relative's, measured
// from Carpe Diem's module as it ships), as brisk (the welcome over within 1.6 seconds, as Carpe Diem's is), tonal voices
// the same at every play as Carpe Diem's are, the granular wood and paper never twice the same.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, what, info) { if (c) pass++; else fail++; console.log((c ? 'PASS ' : 'FAIL ') + what + (c ? '' : '  ' + (info || ''))); }
// each voice's relative in Carpe Diem, and that relative's loudness there at its default level (0.55)
const REL = { firstLight: ['Day turn', 0.0486], studyLamp: ['Lamp lit', 0.0459], evensong: ['Dusk fall', 0.0478], studyChime: ['Desk chime', 0.061], handBell: ['Small bell', 0.0696], inkDrop: ['Water drop', 0.0357],
  sealMark: ['Keep mark', 0.0255], pressClick: ['Soft click', 0.0052], feltSeal: ['Felt press', 0.0181], pageSet: ['Desk set', 0.0324], bookShut: ['Book close', 0.0359], lecternLift: ['Board lift', 0.0286], stacksPass: ['Shelf pass', 0.0164],
  keyPress: ['its key press', 0.0236], softKey: ['its key press, softer', 0.0236 * 0.72], cardLift: ['Board lift, lighter', 0.0286 * 0.82], cardChime: ['Keep mark, smaller', 0.0255 * 0.65] };
const TONAL = ['firstLight', 'evensong', 'studyChime', 'handBell', 'inkDrop', 'sealMark', 'cardChime'];
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const enter = async () => { await p.waitForFunction(() => window.__ingReady === true && window.IngSound, null, { timeout: 300000 });
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900); };
  // the old default, kept from 6.8.1, before the page opens
  await p.goto(URL); await p.evaluate(() => localStorage.setItem('ing_sound_67', JSON.stringify({ on: true, vol: 0.25, notify: 'handBell', trim: { notify: 1, confirm: 1, room: 1, paper: 1 } })));
  await p.reload(); await enter();
  let c = await p.evaluate(() => IngSound.config());
  ok(c.vol === 0.55 && c.notify === 'handBell', 'the old default level kept from 6.8.1 (0.25) gives way to Carpe Diem\'s 0.55; her own choice of sound stays', JSON.stringify({ vol: c.vol, notify: c.notify }));
  await p.evaluate(() => localStorage.setItem('ing_sound_67', JSON.stringify({ ver: 3, on: true, vol: 0.6, room: 'eveningLight', keys: 'softTap', trim: { room: 1 } })));
  await p.reload(); await enter(); c = await p.evaluate(() => IngSound.config());
  ok(c.room === 'firstLight' && c.keys === 'keyPress' && c.vol === 0.55, 'a 6.8.3 sound and level kept from before (Evening light, Soft tap, 0.6) give way to the family\'s (First light, Key press, 0.55)', JSON.stringify({ room: c.room, keys: c.keys, vol: c.vol }));
  await p.evaluate(() => localStorage.setItem('ing_sound_67', JSON.stringify({ on: true, vol: 0.4, trim: { notify: 1, confirm: 1, room: 1, paper: 1 } })));
  await p.reload(); await enter();
  c = await p.evaluate(() => IngSound.config());
  ok(c.vol === 0.4, 'a level she chose herself stays as it is', c.vol);
  await p.evaluate(() => { localStorage.removeItem('ing_sound_67'); }); await p.reload(); await enter();
  const r = await p.evaluate(async () => { const S = window.IngSound, C = S.config(), out = {};
    for (const role of S.roles) for (const v of role.voices) { if (v === 'byRoom' || /Off$/.test(v)) continue;
      const L = C.vol * (C.trim[role.id] == null ? 1 : C.trim[role.id]), from = role.id === 'room' ? 1.6 : 2.4;
      const a = await S.render(v, { level: L, seconds: 3.2, tailFrom: from }), a2 = await S.render(v, { level: L, seconds: 3.2, tailFrom: from }), m = await S.render(v, { level: 1.5, seconds: 3.2, tailFrom: from });
      out[v] = { role: role.id, loud: a.loud, peak: a.peak, max: m.peak, tail: a.tail, bal: 10 * Math.log10(a.energyL / a.energyR), same: Math.abs(a.rms - a2.rms) <= 1e-6 * a.rms && Math.abs(a.peak - a2.peak) <= 1e-6 * a.peak }; }   // the same, but for the renderer's own rounding (a part in a billion)
    return { defaults: S.defaults, roles: S.roles.map(x => [x.id, x.voices]), names: S.names, out }; });
  fs.writeFileSync(OUT + '/sounds.json', JSON.stringify(r, null, 1));
  ok(r.roles.map(x => x[0]).join() === 'notify,confirm,room,paper,keys,cards', 'six kinds of sound: notices, keeping, entering, pages, keys, cards', r.roles.map(x => x[0]).join());
  ok(r.defaults.vol === 0.55 && r.defaults.room === 'firstLight' && r.defaults.notify === 'studyChime' && r.defaults.confirm === 'sealMark' && r.defaults.paper === 'pageSet' && r.defaults.keys === 'keyPress' && r.defaults.cards === 'cardLift', "Ingenium's defaults, at Carpe Diem's level of 0.55 (First light to enter)", JSON.stringify(r.defaults));
  ok(r.roles.find(x => x[0] === 'keys')[1].includes('keysOff') && r.roles.find(x => x[0] === 'cards')[1].includes('cardsOff'), 'the keys and the cards each offer No sound');
  const old = ['deskChime', 'smallBell', 'waterDrop', 'keepMark', 'softClick', 'feltPress', 'dayTurn', 'lampLit', 'duskFall', 'deskSet', 'bookClose', 'boardLift', 'shelfPass'];
  ok(!Object.keys(r.names).some(n => old.includes(n)), "none of Carpe Diem's or The Forge's voices is offered");
  ok(Object.keys(r.out).sort().join() === Object.keys(REL).sort().join(), 'every voice has its relative in Carpe Diem', Object.keys(r.out).join());
  for (const [v, x] of Object.entries(r.out)) {
    const k = REL[v] ? REL[v][1] : 0;
    ok(x.loud > k * 0.6 && x.loud < k * 1.4, `${v} is as loud as ${REL[v] && REL[v][0]} in Carpe Diem (${x.loud.toFixed(4)}, there ${k.toFixed(4)})`, JSON.stringify(x));
    ok(x.max < 0.95, `${v} never reaches the speakers' limit, even at the loudest: below 0.95 (${x.max.toFixed(3)})`);
    ok(x.tail < 0.002, `${v} is over within ${x.role === 'room' ? '1.6 seconds: a brisk welcome, as Carpe Diem\'s' : '2.4 seconds'}`, x.tail);
    ok(Math.abs(x.bal) < 0.5, `${v}, played in the middle, stays in the middle (${x.bal.toFixed(2)} dB)`);
    if (TONAL.includes(v)) ok(x.same, `${v} is the same at every play, as Carpe Diem's notes are`); else ok(!x.same, `${v}, made of wood and paper, is never twice the same`);
  }
  // in the page: a raised key, a field, a card, Off
  const pressed = async sel => { const bb = await p.evaluate(s => { const e = [...document.querySelectorAll(s)].find(x => x.offsetParent); if (!e) return null; const r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, sel);
    if (!bb) return null; const n0 = await p.evaluate(() => IngSound.count()); await p.mouse.move(bb[0], bb[1]); await p.mouse.down(); await p.waitForTimeout(60);
    const n1 = await p.evaluate(() => IngSound.count()); const l = await p.evaluate(() => IngSound.last());
    await p.mouse.move(4, 600); await p.mouse.up(); await p.waitForTimeout(400); return { n: n1 - n0, last: l }; };   // let go away from the key: it sounds, nothing is done
  await p.evaluate(() => go('settings')); await p.waitForTimeout(900);
  let k = await pressed('#page-settings .btn, #page-settings .seg-btn');
  ok(k && k.n === 1 && k.last && k.last.role === 'keys' && k.last.voice === 'keyPress', 'a raised key pressed with the pointer sounds as a key goes down (the key press)', JSON.stringify(k));
  const t0 = await p.evaluate(() => IngSound.count());
  await p.evaluate(() => go('chat')); await p.waitForTimeout(700);
  await p.evaluate(() => { const f = document.querySelector('textarea, input[type=text]'); if (f) f.focus(); }); await p.keyboard.type('a few words'); await p.waitForTimeout(300);
  const t1 = await p.evaluate(() => IngSound.count());
  ok(t1 - t0 <= 1, 'typing in a field makes no sound (only the page change, if any)', t1 - t0);
  await p.evaluate(() => { const r = IngSound.history(); window.__h0 = r.length; });
  await p.waitForTimeout(400);
  const d = await p.evaluate(() => { const bt = document.getElementById('displayBtn'); if (!bt) return null; const r = bt.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
  if (d) { await p.mouse.click(d[0], d[1]); await p.waitForTimeout(600); }
  const h = await p.evaluate(() => IngSound.history().slice(-3).map(x => x.role));
  ok(d && h.includes('keys'), 'the title bar\'s Display key sounds as a key', JSON.stringify(h));
  ok(d && h.includes('cards'), 'the Display panel rising onto the screen sounds as a card', JSON.stringify(h));
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  await p.evaluate(() => IngSound.set({ on: false })); const n0 = await p.evaluate(() => IngSound.count());
  await p.evaluate(() => go('settings')); await p.waitForTimeout(600); await pressed('#page-settings .btn, #page-settings .seg-btn');
  ok((await p.evaluate(() => IngSound.count())) === n0, 'Off silences everything: a key pressed makes no sound');
  await p.evaluate(() => IngSound.set({ on: true }));
  ok(errs.length === 0, 'no errors on the page', errs.slice(0, 3).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
