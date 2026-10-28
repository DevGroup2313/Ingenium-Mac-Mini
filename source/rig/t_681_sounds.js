// node rig/t_681_sounds.js <page url> <out dir>
// 6.8.1: Ingenium's own sounds (modules/r176.js). Every voice is rendered away from the speakers (OfflineAudioContext) at the
// default level, and checked: it sounds (not silent), it stays quiet (its peak no higher than the loudest of the template's
// voices it replaces), it is short (nothing left after 1.6 seconds); none of Carpe Diem's or The Forge's names is offered;
// the defaults are Ingenium's; a room's page sound is that room's.
// 6.8.2: the owner found these sounds "weak and mild" and asked for sounds that feel alive; "stays quiet" gave way to
// "never reaches the speakers' limit"; 6.8.3: the warm voices, a welcome and a notice included, are let die away by 4.6 seconds.
// Each kind's presence is checked in rig/t_682_sounds.js.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, what, info) { if (c) pass++; else fail++; console.log((c ? 'PASS ' : 'FAIL ') + what + (c ? '' : '  ' + (info || ''))); }
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext()).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL); await p.waitForFunction(() => window.__ingReady === true && window.IngSound, null, { timeout: 300000 });
  const r = await p.evaluate(async () => { const S = window.IngSound, out = {};
    for (const role of S.roles) for (const v of role.voices) { if (/Off$/.test(v)) continue; const x = await S.render(v, { level: 0.6, seconds: 5.6, tailFrom: 4.6 }); out[v] = x && { peak: +x.peak.toFixed(4), rms: +x.rms.toFixed(5), tail: +x.tail.toFixed(6) }; }
    return { names: S.names, defaults: S.defaults, roles: S.roles.map(r => [r.id, r.voices]), out }; });
  fs.writeFileSync(OUT + '/sounds.json', JSON.stringify(r, null, 1));
  const old = ['deskChime', 'smallBell', 'waterDrop', 'keepMark', 'softClick', 'feltPress', 'dayTurn', 'lampLit', 'duskFall', 'deskSet', 'bookClose', 'boardLift', 'shelfPass'];
  ok(!Object.keys(r.names).some(n => old.includes(n)), "none of Carpe Diem's or The Forge's voices is offered", Object.keys(r.names).join(','));
  ok(r.defaults.notify === 'vesperChime' && r.defaults.confirm === 'twoNotes' && r.defaults.room === 'eveningLight' && r.defaults.paper === 'byRoom', "the defaults are Ingenium's own (6.8.3)", JSON.stringify(r.defaults));
  for (const [v, x] of Object.entries(r.out)) {
    ok(x && x.peak > 0.004, v + ' sounds', JSON.stringify(x));
    ok(x && x.peak < 0.97, v + ' never reaches the speakers\' limit at the default level (peak ' + (x && x.peak) + ')', JSON.stringify(x));
    ok(x && x.tail < 0.002, v + ' is over within 4.6 seconds', JSON.stringify(x));
  }
  ok(errs.length === 0, 'no errors on the page', errs.slice(0, 3).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
