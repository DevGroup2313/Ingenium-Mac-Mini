// Ingenium 7.49 · sealed on the computer's disk, the page's side (modules/r340.js, r197.js's diskKey and key events, r318.js's room),
// with a stand-in for the computer app that records each call (the computer app's own side: rig/t_749_disk_app.py). An invented person.
//   1. no sign-in: no key handed over; Security, The computer's disk says Off
//   2. protected: the computer app is handed a 32-byte key (never the password), with its id; the room says On, with Seal them now
//   3. Lock now: the key is dropped; signed in again: the same key is handed back
//   4. a page opened locked drops any key the app still held
//   5. Seal them now asks the app to seal; protection turned off: everything opened again first, then the key dropped
//     node rig/t_749_disk_page.js http://127.0.0.1:8193/<page>
const pw = require('/opt/node-tools/node_modules/playwright'); const crypto = require('crypto');
const URL = process.argv[2] || 'http://127.0.0.1:8193/ingenium.html';
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? P++ : F++; }
const NAME = 'Ada Example', PW = 'tide-clock-harbour-41';
const STUB = () => { const calls = []; window.__diskCalls = calls; let held = false; const push = calls.push.bind(calls); calls.push = (x) => { try { if (window.diskRec) window.diskRec(x[0]); } catch (e) {} return push(x); };
  const st = () => ({ ok: true, held, kid: held ? 'x' : '', lib: true, files: 2, sealed: held ? 2 : 0, kinds: ['outbox', 'runs'] });
  window.pywebview = { api: { disk_key_hold(b, k) { calls.push(['hold', b, k]); held = true; return Promise.resolve(st()); },
    disk_key_drop() { calls.push(['drop']); held = false; return Promise.resolve(st()); }, disk_status() { return Promise.resolve(st()); },
    disk_seal_now() { calls.push(['seal']); return Promise.resolve(Object.assign(st(), { now: 1 })); },
    disk_unseal_all() { calls.push(['unseal', held]); return Promise.resolve(Object.assign(st(), { opened: 2 })); } } }; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } }); await ctx.addInitScript(STUB);
  const ALL = []; await ctx.exposeBinding('diskRec', (_s, n) => { ALL.push(n); }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  await p.goto(URL, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(2500);
  const calls = () => p.evaluate(() => window.__diskCalls.map((c) => c.slice()));
  const room = () => p.evaluate(() => { try { go('settings'); IngRooms.open('settings', 'security'); } catch (e) {} const c = document.getElementById('secCard'); if (window.IngSecurity) IngSecurity.paint();
    const sv = [...document.querySelectorAll('#secCard .sc-sub')].find((x) => x.getAttribute('data-v') === 'disk'); if (sv) sv.click();
    return { state: window.IngDiskSeal && IngDiskSeal.state(), text: c ? c.textContent.replace(/\s+/g, ' ') : '' }; });

  // 1. no sign-in
  ok(!!(await p.evaluate(() => window.IngDiskSeal && window.IngLock && typeof IngLock.diskKey === 'function')), 'the page carries IngDiskSeal and IngLock.diskKey');
  let c = await calls();
  ok(!c.some((x) => x[0] === 'hold'), 'no sign-in: no key is handed to the computer app', c);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  let r = await room();
  ok(r.state === 'off' && /Off: the computer app's own files are plain/.test(r.text), 'Security, The computer\'s disk: Off, and why', r.text.slice(r.text.indexOf('computer\'s disk'), 400));

  // 2. protect (the welcome door's lock key, as she would)
  await p.goto(URL, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { localStorage.clear(); }); await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  await p.click('#introProtect'); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 10000 });
  await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW); await p.fill('#ildP2', PW); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 15000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map((d) => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 60000 });
  await p.waitForTimeout(1200);
  c = await calls(); const h1 = c.filter((x) => x[0] === 'hold').pop();
  const key = h1 ? Buffer.from(h1[1], 'base64') : Buffer.alloc(0);
  ok(h1 && key.length === 32 && /^[0-9a-f]{16}$/.test(h1[2]), 'protected: the computer app is handed a key of 32 bytes, with its id', h1 && [h1[1].length, h1[2]]);
  ok(h1 && crypto.createHash('sha256').update(key).digest('hex').slice(0, 16) === h1[2], 'its id is the first 8 bytes of its SHA-256');
  ok(h1 && !h1[1].includes(Buffer.from(PW).toString('base64').slice(0, 12)) && !key.includes(Buffer.from(PW)), 'it is not the password');
  await p.evaluate(() => { const d = document.querySelector('#ingLockDoor #ildDone'); if (d) d.click(); }); await p.waitForTimeout(600);
  r = await room();
  ok(r.state === 'on' && /On\. Fabrica's runs and their logs, and the apps waiting for your devices: sealed with the same password/.test(r.text) && /Seal them now/.test(r.text) && /Not sealed yet, the next stage/.test(r.text),
    'the room: On, what is sealed, Seal them now, and what is not sealed yet', r.text.slice(r.text.indexOf('On. Fabrica'), 500));

  // 5a. Seal them now
  await p.evaluate(() => { const k = document.querySelector('#secCard [data-a="disk-seal"]'); if (k) k.click(); }); await p.waitForTimeout(500);
  c = await calls();
  ok(c.some((x) => x[0] === 'seal'), 'Seal them now asks the computer app to seal', c.map((x) => x[0]));

  // 3. lock, sign in again
  const n0 = ALL.length;
  await p.evaluate(() => IngLock.lockNow('press')); await p.waitForTimeout(1500);
  ok(ALL.slice(n0)[0] === 'drop', 'Lock now: the key is dropped before the page goes to its door', ALL.slice(n0));
  await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 15000 }); await p.fill('#ingLockDoor #ildPw', PW); await p.click('#ingLockDoor #ildGo');
  await p.waitForFunction(() => !document.querySelector('#ingLockDoor:not([hidden]) #ildPw'), null, { timeout: 60000 }); await p.waitForTimeout(1500);
  c = await calls(); const h2 = c.filter((x) => x[0] === 'hold').pop();
  ok(h2 && h2[1] === h1[1] && h2 !== h1, 'signed in again: the same key is handed back', h2 && h2[2]);

  // 4. a page opened locked
  await p.reload(); await p.waitForFunction(() => window.__ingReady === true || !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw'), null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(4000);
  c = await calls();
  ok(c.some((x) => x[0] === 'drop') && !c.some((x) => x[0] === 'hold'), 'a page opened locked drops any key the app still held, and hands none', c.map((x) => x[0]));
  await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 15000 }); await p.fill('#ingLockDoor #ildPw', PW); await p.click('#ingLockDoor #ildGo');
  await p.waitForFunction(() => window.__ingReady === true && !document.querySelector('#ingLockDoor:not([hidden]) #ildPw'), null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(2000);

  // 5b. protection turned off
  const n1 = (await calls()).length;
  await p.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); if (window.IngSettingsParts) IngSettingsParts.show('data', 'lock'); if (window.IngSettingsRaised) IngSettingsRaised.open(document.getElementById('ingLockCard')); });
  await p.waitForTimeout(600);
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find((x) => /Turn protection off/.test(x.textContent)).click());
  await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 10000 }); await p.fill('#ingLockDoor #ildPw', PW); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /Protection is off/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 60000 }); await p.waitForTimeout(1500);
  c = (await calls()).slice(n1); const iu = c.findIndex((x) => x[0] === 'unseal'), idr = c.findIndex((x, i) => x[0] === 'drop' && i > iu);
  ok(iu >= 0 && c[iu][1] === true && idr > iu, 'protection turned off: everything opened again while the app still held the key, then the key dropped', c.map((x) => x[0]));
  ok(!errs.length, 'no error on the page', errs);
  console.log('\n' + P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})();
