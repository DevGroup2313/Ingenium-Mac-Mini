// Ingenium 7.51 · Ask before each export (modules/r341.js; the switch in modules/r318.js; the question, IngLock.confirm, in modules/r197.js).
// An invented person and invented files. The preview: "A plain copy (a backup without its seal, a plain export of an app) asks for your
// password first."
//   1. without a sign-in the switch cannot be turned on, and a file is saved as before
//   2. signed in, the switch off: a file is saved as before; turned on, it says so
//   3. a plain file now waits for the password: a wrong one is refused and nothing is saved; Cancel, and Escape, save nothing and say why
//   4. the right password saves it, whole; two files asked for at once share one question
//   5. a backup sealed whole, and the recovery key file, leave without the question
//   6. turning the switch off asks for the password; Cancel keeps it on
//     node rig/t_751_export_ask.js http://127.0.0.1:8193/<page>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL = process.argv[2] || 'http://127.0.0.1:8193/ingenium.html';
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? P++ : F++; }
const NAME = 'Ada Example', PW = 'tide-clock-harbour-41';
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, acceptDownloads: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  const downs = []; p.on('download', async (d) => { let text = ''; try { const f = await d.path(); text = fs.readFileSync(f, 'utf8').slice(0, 200); } catch (e) {} downs.push({ name: d.suggestedFilename(), text }); });
  const settle = (ms) => p.waitForTimeout(ms);
  const save = (name, data) => p.evaluate(([n, d]) => { window.__saved = window.__saved || []; Promise.resolve(saveFileNative(n, 'text/plain', d)).then((r) => window.__saved.push([n, r === null ? 'null' : String(r)])); }, [name, data]);
  const asking = () => p.evaluate(() => { const d = document.getElementById('ingLockDoor'); const h = d && !d.hidden && d.querySelector('#ildAsk') ? (d.querySelector('h2') || {}).textContent : ''; return h || ''; });
  const room = () => p.evaluate(() => { try { go('settings'); IngRooms.open('settings', 'security'); } catch (e) {} if (window.IngSecurity) IngSecurity.paint();
    const sv = [...document.querySelectorAll('#secCard .sc-sub')].find((x) => x.getAttribute('data-v') === 'more'); if (sv) sv.click();
    const s = document.querySelector('#secCard [data-sw="export"]'); return s ? { on: s.getAttribute('aria-checked') === 'true', disabled: s.disabled, text: s.textContent.replace(/\s+/g, ' ') } : null; });
  const flip = () => p.evaluate(() => { const s = document.querySelector('#secCard [data-sw="export"]'); if (s) s.click(); });
  await p.goto(URL, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await settle(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  // 1. no sign-in
  let r = await room();
  ok(r && r.disabled && !r.on && /Ask before each export/.test(r.text) && /asks for your password first/.test(r.text), 'without a sign-in the switch is there, off, and cannot be turned on', r);
  await save('plain-before.txt', 'TIDE-EXPORT-0'); await settle(1200);
  ok(downs.some((d) => d.name === 'plain-before.txt') && !(await asking()), 'without a sign-in a file is saved as before, with no question', downs);
  // 2. protect, as she would (the welcome door's lock key)
  await p.evaluate(() => { localStorage.clear(); }); await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await settle(1500);
  await p.click('#introProtect'); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 10000 });
  await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW); await p.fill('#ildP2', PW); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 15000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map((d) => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 60000 });
  await p.evaluate(() => { const d = document.querySelector('#ingLockDoor #ildDone'); if (d) d.click(); }); await settle(800);
  r = await room();
  ok(r && !r.disabled && !r.on, 'signed in: the switch can be turned on, and is off until she does', r);
  let n0 = downs.length; await save('plain-switch-off.txt', 'TIDE-EXPORT-1'); await settle(1200);
  ok(downs.length === n0 + 1 && !(await asking()), 'with the switch off, a file is saved as before', downs.slice(n0));
  await flip(); await settle(500); r = await room();
  ok(r && r.on && await p.evaluate(() => IngSecurity.cfg().export === true && IngExportAsk.on()), 'turned on, the switch says so and the gate is on', r);
  // 3. a plain file waits for the password
  n0 = downs.length; await save('tide-notes.txt', 'TIDE-EXPORT-2'); await settle(700);
  let q = await asking();
  ok(/Export a plain copy/.test(q) && downs.length === n0, 'a plain file waits: the password is asked, and nothing is saved yet', q);
  ok(/tide-notes\.txt/.test(await p.evaluate(() => document.querySelector('#ingLockDoor').textContent)), 'the question names the file that would leave unsealed');
  await p.fill('#ingLockDoor #ildPw', 'not-her-password-99'); await p.click('#ingLockDoor #ildAsk button[type=submit]'); await settle(1500);
  ok(/not the password/i.test(await p.evaluate(() => document.querySelector('#ingLockDoor').textContent)) && downs.length === n0, 'a wrong password is refused, and nothing is saved', downs.slice(n0));
  await p.click('#ingLockDoor #ildCancel'); await settle(900);
  ok(!(await asking()) && downs.length === n0 && (await p.evaluate(() => (window.__saved || []).some((x) => x[0] === 'tide-notes.txt' && x[1] === 'null'))), 'Cancel: nothing is saved, and the save answers that it was not', await p.evaluate(() => window.__saved));
  await save('tide-escape.txt', 'TIDE-EXPORT-3'); await settle(700); await p.keyboard.press('Escape'); await settle(900);
  ok(!(await asking()) && !downs.some((d) => d.name === 'tide-escape.txt'), 'Escape closes the question, and nothing is saved');
  // 4. the right password
  n0 = downs.length; await save('tide-ok.txt', 'TIDE-EXPORT-4'); await settle(700);
  await p.fill('#ingLockDoor #ildPw', PW); await p.click('#ingLockDoor #ildAsk button[type=submit]'); await settle(2500);
  ok(downs.some((d) => d.name === 'tide-ok.txt' && d.text === 'TIDE-EXPORT-4') && !(await asking()), 'the right password: the file is saved, whole', downs.slice(n0));
  n0 = downs.length; await save('tide-a.txt', 'TIDE-A'); await save('tide-b.txt', 'TIDE-B'); await settle(700);
  await p.fill('#ingLockDoor #ildPw', PW); await p.click('#ingLockDoor #ildAsk button[type=submit]'); await settle(3000);
  ok(downs.some((d) => d.name === 'tide-a.txt') && downs.some((d) => d.name === 'tide-b.txt') && !(await asking()), 'two files asked for at once share one question', downs.slice(n0).map((d) => d.name));
  n0 = downs.length; await save('tide-again.txt', 'TIDE-EXPORT-5'); await settle(700);
  ok(/Export a plain copy/.test(await asking()), 'the next export asks again');
  await p.click('#ingLockDoor #ildCancel'); await settle(600);
  // 5. sealed already
  n0 = downs.length; await save('Ingenium backup.sealed', 'INGENIUM SEALED BACKUP 1\n{"kind":"ingenium-sealed-backup"}'); await settle(1200);
  ok(downs.some((d) => d.name === 'Ingenium backup.sealed') && !(await asking()), 'a backup sealed whole leaves without the question', downs.slice(n0).map((d) => d.name));
  await save('Ingenium recovery key.ingenium-key', '{\n "kind": "ingenium-recovery-key",\n "v": 1\n}'); await settle(1200);
  ok(downs.some((d) => d.name === 'Ingenium recovery key.ingenium-key') && !(await asking()), 'the recovery key file (saved only after her password was asked) leaves without a second question');
  // 6. turning it off asks too
  await room(); await flip(); await settle(700);
  ok(/Stop asking before each export/.test(await asking()), 'turning the switch off asks for the password');
  await p.click('#ingLockDoor #ildCancel'); await settle(700); r = await room();
  ok(r && r.on && await p.evaluate(() => IngSecurity.cfg().export === true), 'Cancel keeps it on', r);
  await flip(); await settle(700); await p.fill('#ingLockDoor #ildPw', PW); await p.click('#ingLockDoor #ildAsk button[type=submit]'); await settle(2000); r = await room();
  ok(r && !r.on && await p.evaluate(() => IngSecurity.cfg().export === false && !IngExportAsk.on()), 'the right password turns it off', r);
  ok(!errs.length, 'no error on the page', errs);
  console.log('\n' + P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})();
