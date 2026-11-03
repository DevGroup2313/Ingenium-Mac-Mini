// The computer's own sign-in as a way back in (Ingenium 6.10.1, modules/r197.js). Her answer (3 November 2026): "Yes, my computer's
// own sign in (Touch ID or Windows Hello) also open Ingenium." The app's bridge stands in here (window.pywebview.api.device_*): it
// answers as desktop/app_device_6101.py does, keeping its keys in a store of its own; Touch ID's own sheet cannot be shown here.
// Checks: turned on from Your ways back in, the password first, then the computer; the lock keeps the wrapped data key and the key's
// name, never the key; at the sign-in the computer is asked at once and Ingenium opens without the password; the password can then
// be changed without the old one; cancelled, nothing changes and the key stays offered; a computer without the key is said so;
// Can't sign in? lists it; turned off, it is gone, and the computer's key is removed; a page with no bridge offers nothing.
//   node rig/t_6101_device.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const NAME = 'Ada', PW1 = 'quill-and-ink-1843', PW2 = 'touch-then-new-2026', MSG = 'Note G, the first program, in the notes of 1843.';
const waitBoot = (p) => p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
const errText = (p) => p.evaluate(() => { const e = document.querySelector('#ingLockDoor .ild-err'); return e && !e.hidden ? e.textContent : ''; });
const rec = (p) => p.evaluate(() => JSON.parse(localStorage.getItem('ingenium_lock') || 'null'));
async function waitOpen(p) { await p.waitForFunction(() => window.__ingLocked === false && (!document.querySelector('#ingLockDoor') || document.querySelector('#ingLockDoor').hidden), null, { timeout: 30000 }); await p.waitForTimeout(400); }
/* the bridge, standing in: its keys kept in its own store (sessionStorage stands in for the keychain); window.__devMode steers it */
const BRIDGE = () => { const st = () => JSON.parse(sessionStorage.getItem('__devkeys') || '{}'), put = (o) => sessionStorage.setItem('__devkeys', JSON.stringify(o)); window.__devCalls = [];
  const mode = () => sessionStorage.getItem('__devmode') || 'yes';
  window.pywebview = { api: {
    device_unlock_info: () => Promise.resolve({ ok: true, kind: 'touchid', label: 'Touch ID' }),
    device_key_make: (name, reason) => { window.__devCalls.push(['make', name, reason]); if (mode() === 'cancel') return Promise.resolve({ ok: false, error: 'Cancelled by user.', cancelled: true });
      const k = new Uint8Array(32); crypto.getRandomValues(k); let b = ''; k.forEach((x) => { b += String.fromCharCode(x); }); const o = st(); o[name] = btoa(b); put(o); return Promise.resolve({ ok: true, key: o[name] }); },
    device_key_get: (name, reason) => { window.__devCalls.push(['get', name, reason]); if (mode() === 'cancel') return Promise.resolve({ ok: false, error: 'Cancelled by user.', cancelled: true });
      const o = st(); return Promise.resolve(o[name] ? { ok: true, key: o[name] } : { ok: false, error: 'This Mac holds no key for this copy of Ingenium.', missing: true }); },
    device_key_drop: (name) => { window.__devCalls.push(['drop', name]); const o = st(); delete o[name]; put(o); return Promise.resolve({ ok: true }); } } }; };
async function protect(p) {
  await p.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); }); await p.waitForSelector('#ingLockCard', { timeout: 10000 });
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(b => /Protect this copy/.test(b.textContent)).click());
  await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 5000 }); await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW1); await p.fill('#ildP2', PW1); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 10000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map(d => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return [+m[1], +m[2]]; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 120000 });
  await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(600);
}
const waysRow = (p, re) => p.evaluate((src) => { const r = [...document.querySelectorAll('#ingLockDoor .ild-way')].find((x) => new RegExp(src).test(x.textContent)); return r ? { text: r.textContent.replace(/\s+/g, ' '), on: !r.querySelector('i').classList.contains('no'), key: (r.querySelector('button') || {}).textContent || '' } : null; }, re.source);
const openWays = async (p) => { await p.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); }); await p.waitForTimeout(300);
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(x => /Your ways back in/.test(x.textContent)).click()); await p.waitForSelector('#ingLockDoor .ild-way', { timeout: 5000 }); };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); await ctx.addInitScript(BRIDGE); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await waitBoot(p); await p.waitForTimeout(800);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.evaluate((m) => { state.chats = state.chats || []; state.chats.unshift({ id: 'c_t6101', title: 'Note G', messages: [{ role: 'me', text: m }] }); saveState(); }, MSG);
  await protect(p);
  // 1. turned on from Your ways back in: the password first, then the computer
  await openWays(p);
  let row = await waysRow(p, /This computer's own sign-in/);
  ok(row && !row.on && /Off\. Touch ID or Windows Hello can open Ingenium/.test(row.text) && row.key === 'Turn it on', '1. Your ways back in offers this computer\'s own sign-in, off', row);
  await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-way')].find((x) => /This computer's own sign-in/.test(x.textContent)).querySelector('button').click());
  await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 5000 });
  const said = await p.evaluate(() => document.querySelector('#ingLockDoor').innerText.replace(/\s+/g, ' '));
  ok(/Let Touch ID open Ingenium/.test(said) && /Anyone who can sign in to this computer as you could open it too/.test(said), '1. it asks the password first, and says plainly who else could open it', said.slice(0, 260));
  await p.fill('#ingLockDoor #ildPw', PW1); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => { const d = document.querySelector('#ingLockDoor'); return d && !d.hidden && /This computer's own sign-in/.test(d.innerText) && /opens Ingenium on this computer, since/.test(d.innerText); }, null, { timeout: 30000 });
  let r = await rec(p); const keys = await p.evaluate(() => JSON.parse(sessionStorage.getItem('__devkeys') || '{}'));
  ok(r.dev && /^ing-[A-Za-z0-9_-]{12}$/.test(r.dev.id) && r.dev.label === 'Touch ID' && keys[r.dev.id] && !JSON.stringify(r).includes(keys[r.dev.id]), '1. turned on: the lock keeps the wrapped data key and the key\'s name; the key stays with the computer', { id: r.dev && r.dev.id });
  row = await waysRow(p, /This computer's own sign-in/);
  ok(row && row.on && /Touch ID opens Ingenium on this computer, since/.test(row.text) && /Anyone who can sign in to this computer as you can open it this way/.test(row.text) && row.key === 'Turn it off', '1. the row now says it is on, and who else could open it', row);
  await p.keyboard.press('Escape');
  // 2. at the sign-in the computer is asked at once: Ingenium opens without the password
  await p.reload(); await waitBoot(p); await waitOpen(p);
  const after = await p.evaluate((m) => ({ open: (state.chats || []).some((c) => (c.messages || []).some((x) => x.text === m)), calls: window.__devCalls.map((c) => c[0]) }), MSG);
  ok(after.open && after.calls.join() === 'get', '2. at the sign-in the computer is asked once, and Ingenium opens without the password', after);
  // 3. the password changed without the old one, since the computer confirmed it is her
  await p.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); }); await p.waitForTimeout(300);
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(x => /Change the password/.test(x.textContent)).click());
  await p.waitForSelector('#ingLockDoor #ildP1', { timeout: 5000 });
  ok(!(await p.$('#ingLockDoor #ildPw')), '3. opened by the computer, the password is changed without the old one');
  await p.fill('#ildP1', PW2); await p.fill('#ildP2', PW2); await p.click('#ingLockDoor form button[type=submit]'); await p.waitForTimeout(1500);
  // 4. cancelled: nothing changes, the key stays offered, the password still works
  await p.evaluate(() => sessionStorage.setItem('__devmode', 'cancel')); await p.reload(); await waitBoot(p); await p.waitForTimeout(1200);
  const at = await p.evaluate(() => ({ key: !!document.querySelector('#ingLockDoor #ildDev'), label: (document.querySelector('#ingLockDoor #ildDev') || {}).textContent, err: (document.querySelector('#ingLockDoor .ild-err') || {}).hidden !== false }));
  ok(at.key && at.label === 'Open with Touch ID' && at.err, '4. Touch ID cancelled at once: no alarm, the key stays offered under the form', at);
  await p.click('#ingLockDoor #ildDev'); await p.waitForTimeout(600);
  ok(/Not confirmed\. Try again, or sign in with your password\./.test(await errText(p)), '4. pressed and cancelled again: said plainly', await errText(p));
  await p.screenshot({ path: OUT + '/signin-touchid.png' });
  await p.evaluate(() => { document.getElementById('ingLockDoor').classList.add('ild-night'); }); await p.screenshot({ path: OUT + '/signin-touchid-night.png' }); await p.evaluate(() => { document.getElementById('ingLockDoor').classList.remove('ild-night'); });
  await p.fill('#ingLockDoor #ildPw', PW2); await p.click('#ingLockDoor #ildGo'); await waitOpen(p);
  ok(true, '4. the new password opens it');
  // 5. a computer that does not hold the key
  await p.evaluate(() => { sessionStorage.setItem('__devmode', 'yes'); sessionStorage.setItem('__devkeys', '{}'); }); await p.reload(); await waitBoot(p); await p.waitForTimeout(1500);
  ok(/This computer holds no key for this copy of Ingenium/.test(await errText(p)), '5. a computer without the key: said so, and the other ways remain', await errText(p));
  // 6. Can't sign in? lists it among the ways
  await p.click('#ingLockDoor #ildForgot'); await p.waitForSelector('#ingLockDoor #ildWayWords', { timeout: 5000 });
  const ways = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-way b')].map((x) => x.textContent));
  ok(ways.includes('Touch ID') && ways.includes('Your ten recovery words'), '6. Can\'t sign in? lists Touch ID among the ways back in', ways);
  await p.click('#ingLockDoor #ildBack'); await p.waitForSelector('#ingLockDoor #ildPw'); await p.fill('#ingLockDoor #ildPw', PW2); await p.click('#ingLockDoor #ildGo'); await waitOpen(p);
  // 7. turned off: gone from the lock, and the computer's key removed
  await openWays(p);
  await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-way')].find((x) => /This computer's own sign-in/.test(x.textContent)).querySelector('button').click()); await p.waitForTimeout(500);
  r = await rec(p); const calls = await p.evaluate(() => window.__devCalls.map((c) => c[0]));
  ok(!r.dev && calls.includes('drop'), '7. turned off: the lock no longer holds it, and the computer\'s key is removed', { dev: r.dev, calls });
  await p.keyboard.press('Escape');
  // 8. a page with no bridge (a browser) offers nothing of it
  const p2 = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage(); await p2.goto(URL_); await waitBoot(p2); await p2.waitForTimeout(800);
  await p2.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await protect(p2); await openWays(p2); const r2 = await waysRow(p2, /This computer's own sign-in/);
  ok(r2 && !r2.on && /Only the Ingenium app on a Mac or a Windows computer/.test(r2.text) && !r2.key, '8. in a browser it is said plainly that only the apps on a computer can ask the computer itself', r2);
  ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
