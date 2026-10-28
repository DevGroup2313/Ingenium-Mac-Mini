// node rig/t_682_sounds.js <Ingenium page url> <out dir>
// 6.8.2: Ingenium's sounds, alive (modules/r176.js). The owner's words (28 October 2026): "I don't like Ingenium's new sound
// systems, it sounds weak and mild. Its not creative enough, I want the entire app and software to feel alive and realistic
// hence the 3D animated look, right now it all sounds dead and weak and I HATE IT."
// Every voice is rendered away from the speakers (OfflineAudioContext) and checked: it has its kind's presence at the default
// level (the loudest 50 milliseconds, within reach of its kind's mark); it never reaches the speakers' limit, even at the
// loudest volume and level; it is over within 2.4 seconds; a sound in the middle stays in the middle; no two plays are the
// same. Then, in the page: six kinds, Ingenium's own defaults at 0.6; the old default kept from 6.8.1 (0.25) gives way to
// 0.6, a level chosen otherwise stays; a raised key pressed with the pointer sounds as a key, the title bar's
// keys too; typing in a field does not; the Display panel rising (it is kept in the page, only shown) sounds as a card; Off silences everything.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, what, info) { if (c) pass++; else fail++; console.log((c ? 'PASS ' : 'FAIL ') + what + (c ? '' : '  ' + (info || ''))); }
const MARK = { notify: 0.13, room: 0.15, confirm: 0.10, paper: 0.08, keys: 0.03, cards: 0.05 };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const enter = async () => { await p.waitForFunction(() => window.__ingReady === true && window.IngSound, null, { timeout: 300000 });
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900); };
  // the old default, kept from 6.8.1, before the page opens
  await p.goto(URL); await p.evaluate(() => localStorage.setItem('ing_sound_67', JSON.stringify({ on: true, vol: 0.25, notify: 'orreryBell', trim: { notify: 1, confirm: 1, room: 1, paper: 1 } })));
  await p.reload(); await enter();
  let c = await p.evaluate(() => IngSound.config());
  ok(c.vol === 0.6 && c.notify === 'orreryBell', 'the old default level kept from 6.8.1 (0.25) gives way to 0.6; her own choice of sound stays', JSON.stringify({ vol: c.vol, notify: c.notify }));
  await p.evaluate(() => localStorage.setItem('ing_sound_67', JSON.stringify({ on: true, vol: 0.4, trim: { notify: 1, confirm: 1, room: 1, paper: 1 } })));
  await p.reload(); await enter();
  c = await p.evaluate(() => IngSound.config());
  ok(c.vol === 0.4, 'a level she chose herself stays as it is', c.vol);
  await p.evaluate(() => { localStorage.removeItem('ing_sound_67'); }); await p.reload(); await enter();
  const r = await p.evaluate(async () => { const S = window.IngSound, C = S.config(), out = {};
    for (const role of S.roles) for (const v of role.voices) { if (v === 'byRoom') continue;
      const L = C.vol * (C.trim[role.id] == null ? 1 : C.trim[role.id]);
      const a = await S.render(v, { level: L, seconds: 3.2, tailFrom: 2.4 }), a2 = await S.render(v, { level: L, seconds: 3.2, tailFrom: 2.4 }), m = await S.render(v, { level: 1.5, seconds: 3.2, tailFrom: 2.4 });
      out[v] = { role: role.id, loud: a.loud, peak: a.peak, max: m.peak, tail: a.tail, bal: 10 * Math.log10(a.energyL / a.energyR), same: a.rms === a2.rms && a.peak === a2.peak }; }
    return { defaults: S.defaults, roles: S.roles.map(x => [x.id, x.voices]), names: S.names, out }; });
  fs.writeFileSync(OUT + '/sounds.json', JSON.stringify(r, null, 1));
  ok(r.roles.map(x => x[0]).join() === 'notify,confirm,room,paper,keys,cards', 'six kinds of sound: notices, keeping, entering, pages, keys, cards', r.roles.map(x => x[0]).join());
  ok(r.defaults.vol === 0.6 && r.defaults.keys === 'feltKey' && r.defaults.cards === 'cardLift' && r.defaults.notify === 'tuningFork', "Ingenium's defaults, at 0.6", JSON.stringify(r.defaults));
  const old = ['deskChime', 'smallBell', 'waterDrop', 'keepMark', 'softClick', 'feltPress', 'dayTurn', 'lampLit', 'duskFall', 'deskSet', 'bookClose', 'boardLift', 'shelfPass'];
  ok(!Object.keys(r.names).some(n => old.includes(n)), "none of Carpe Diem's or The Forge's voices is offered");
  for (const [v, x] of Object.entries(r.out)) {
    const k = MARK[x.role];
    ok(x.loud > k * 0.6 && x.loud < k * 1.6, `${v} has its kind's presence (${x.loud.toFixed(3)}, the mark ${k})`, JSON.stringify(x));
    ok(x.max < 0.95, `${v} never reaches the speakers' limit, even at the loudest: below 0.95 (${x.max.toFixed(3)})`);
    ok(x.tail < 0.002, `${v} is over within 2.4 seconds`, x.tail);
    ok(Math.abs(x.bal) < 0.5, `${v}, played in the middle, stays in the middle (${x.bal.toFixed(2)} dB)`);
    ok(!x.same, `${v} is never twice the same`);
  }
  // in the page: a raised key, a field, a card, Off
  const pressed = async sel => { const bb = await p.evaluate(s => { const e = [...document.querySelectorAll(s)].find(x => x.offsetParent); if (!e) return null; const r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, sel);
    if (!bb) return null; const n0 = await p.evaluate(() => IngSound.count()); await p.mouse.move(bb[0], bb[1]); await p.mouse.down(); await p.waitForTimeout(60);
    const n1 = await p.evaluate(() => IngSound.count()); const l = await p.evaluate(() => IngSound.last());
    await p.mouse.move(4, 600); await p.mouse.up(); await p.waitForTimeout(400); return { n: n1 - n0, last: l }; };   // let go away from the key: it sounds, nothing is done
  await p.evaluate(() => go('settings')); await p.waitForTimeout(900);
  let k = await pressed('#page-settings .btn, #page-settings .seg-btn');
  ok(k && k.n === 1 && k.last && k.last.role === 'keys' && k.last.voice === 'feltKey', 'a raised key pressed with the pointer sounds as a key goes down (the felt key)', JSON.stringify(k));
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
