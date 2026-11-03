// The ways back in, and the sign-in in the door's own place (Ingenium 6.9.9, modules/r197.js). Her words (3 November 2026):
// "Ingenium's sign in page looks slightly awkward floating over the app's introduction door in the background, please refine that
// and find a better fit", and "I want a proper and strong and robust recovery system on Ingenium so that a user does not get locked
// out of their work ... I don't want to forget my password and 10 words and then get locked out ... I want a path that protects me
// and ensures that I can always find a way back into my account on Ingenium."
// Checks: the sign-in at the door stands in the door card's place (no dimmed card behind it, as wide); turning it on ends with the
// ways back in: a recovery key file saved, and a hint (one that gives the password away is refused); a wrong password shows the
// hint; Can't sign in? lists every way; the key file opens the copy and a new password is set; a newer key file replaces the older
// (the older is refused in plain words), and a file from another lock too; new words replace the old; the check now and then comes
// when it is due, and Yes moves it a week on. The person is invented.
//   node rig/t_699_recovery.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const NAME = 'Ada', PW1 = 'quill-and-ink-1843', PW2 = 'after-the-key-file-2026', PW3 = 'a-third-password-77', MSG = 'Note G, the first program, in the notes of 1843.';
const waitBoot = (p) => p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
const doorText = (p) => p.evaluate(() => { const d = document.querySelector('#ingLockDoor'); return d && !d.hidden ? d.innerText.replace(/\s+/g, ' ') : ''; });
const errText = (p) => p.evaluate(() => { const e = document.querySelector('#ingLockDoor .ild-err'); return e && !e.hidden ? e.textContent : ''; });
const rec = (p) => p.evaluate(() => JSON.parse(localStorage.getItem('ingenium_lock') || 'null'));
async function waitOpen(p) { await p.waitForFunction(() => window.__ingLocked === false && (!document.querySelector('#ingLockDoor') || document.querySelector('#ingLockDoor').hidden), null, { timeout: 30000 }); await p.waitForTimeout(400); }
async function setPw(p, pwd) { await p.waitForSelector('#ingLockDoor #ildP1', { timeout: 30000 }); await p.fill('#ildP1', pwd); await p.fill('#ildP2', pwd); await p.click('#ingLockDoor form button[type=submit]'); }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, acceptDownloads: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await waitBoot(p); await p.waitForTimeout(800);
  await p.evaluate((m) => { state.chats = state.chats || []; state.chats.unshift({ id: 'c_t699', title: 'Note G', messages: [{ role: 'me', text: m }] }); saveState(); }, MSG);
  // 1. at the door, the sign-in stands in the door's own place
  const introW = await p.evaluate(() => Math.round(document.querySelector('#introDoor .intro-card').getBoundingClientRect().width));
  await p.click('#introProtect'); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 10000 }); await p.waitForTimeout(1200);
  const place = await p.evaluate(() => { const d = document.getElementById('ingLockDoor'), c = d.querySelector('.ild-card'), ic = document.querySelector('#introDoor .intro-card');
    return { indoor: d.classList.contains('ild-indoor'), bg: getComputedStyle(d).backgroundColor, away: document.getElementById('introDoor').classList.contains('ild-card-away'), introOpacity: +getComputedStyle(ic).opacity, w: c.offsetWidth }; });
  ok(place.indoor && place.bg === 'rgba(0, 0, 0, 0)' && place.away && place.introOpacity < 0.02 && Math.abs(place.w - Math.max(440, Math.min(introW, 640))) <= 2,
    '1. asked at the door, the sign-in takes the door card\'s place: nothing dimmed behind it, the door\'s card stepped back, as wide as it', { place, introW });
  await p.screenshot({ path: OUT + '/door-setup.png' });
  // Not now: the door comes back as it was
  await p.click('#ingLockDoor #ildCancel'); await p.waitForTimeout(400);
  const back = await p.evaluate(() => ({ away: document.getElementById('introDoor').classList.contains('ild-card-away'), op: getComputedStyle(document.querySelector('#introDoor .intro-card')).opacity, door: !document.getElementById('introDoor').hidden }));
  ok(!back.away && back.op === '1' && back.door, '1. Not now: the door\'s own card comes back, as it was', back);
  // 2. turned on: the words, then the ways back in
  await p.click('#introProtect'); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 10000 });
  await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW1); await p.fill('#ildP2', PW1); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 10000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map(d => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 90000 });
  let t = await doorText(p);
  ok(/Two ways back in are set: your password and your ten words/.test(t) && /A recovery key file/.test(t) && /A hint for your password/.test(t), '2. turned on, it ends with the ways back in: one more offered at once (a key file), and a hint', t.slice(0, 260));
  const [dl] = await Promise.all([p.waitForEvent('download', { timeout: 20000 }), p.click('#ingLockDoor #ildSaveKey')]);
  const keyA = path.join(OUT, 'keyA.ingenium-key'); await dl.saveAs(keyA); await p.waitForTimeout(400);
  const kf = JSON.parse(fs.readFileSync(keyA, 'utf8')); let r = await rec(p); t = await doorText(p);
  ok(/^Ingenium recovery key \(Ada\)\.ingenium-key$/.test(dl.suggestedFilename()) && kf.kind === 'ingenium-recovery-key' && kf.lock === r.made && kf.id === r.file.id && kf.key.length >= 40 && !JSON.stringify(r).includes(kf.key) && /Saved as/.test(t),
    '2. Save it: a recovery key file, named for her; the lock keeps only the wrapped data key and the file\'s id, never the key itself', { name: dl.suggestedFilename(), id: kf.id });
  await p.fill('#ingLockDoor #ildHint', 'my quill-and-ink password'); await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(300);
  ok(/holds your password/.test(await errText(p)), '2. a hint that holds the password is refused', await errText(p));
  await p.fill('#ingLockDoor #ildHint', 'the first program, and the year of its notes'); await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(600);
  r = await rec(p);
  ok(r.hint === 'the first program, and the year of its notes' && r.remind && r.remind.step === 0 && r.remind.next > Date.now(), '2. a good hint is kept; the first check is set for a day on', { hint: r.hint, remind: r.remind });
  // 3. a wrong password shows the hint; Can't sign in? lists every way
  await p.reload(); await waitBoot(p); await p.waitForTimeout(600);
  await p.fill('#ingLockDoor #ildPw', 'not-the-password'); await p.click('#ingLockDoor #ildGo'); await p.waitForTimeout(1500);
  ok(/Your hint: the first program, and the year of its notes/.test(await errText(p)), '3. a wrong password: refused, with her hint', await errText(p));
  await p.click('#ingLockDoor #ildForgot'); await p.waitForSelector('#ingLockDoor #ildWayWords', { timeout: 5000 }); t = await doorText(p);
  ok(/Ways back in/.test(t) && /Your ten recovery words/.test(t) && /Your recovery key file Saved on/.test(t) && /Your hint: the first program/.test(t) && /I have none of these/.test(t), '3. Can\'t sign in? lists every way back in, each on its own, with her hint', t.slice(0, 300));
  await p.screenshot({ path: OUT + '/ways.png' });
  // 4. the key file opens it; a new password is set
  await p.click('#ingLockDoor #ildWayFile'); await p.waitForSelector('#ingLockDoor #ildPick', { timeout: 5000 });
  const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.click('#ingLockDoor #ildPick')]); await fc.setFiles(keyA);
  await p.waitForFunction(() => /Your recovery key file opened this copy/.test((document.querySelector('#ingLockDoor') || {}).innerText || ''), null, { timeout: 30000 });
  await setPw(p, PW2); await waitOpen(p);
  ok(await p.evaluate((m) => (state.chats || []).some(c => (c.messages || []).some(x => x.text === m)), MSG), '4. the key file opened the same desk, and a new password was set');
  await p.reload(); await waitBoot(p); await p.waitForTimeout(600); await p.fill('#ingLockDoor #ildPw', PW2); await p.click('#ingLockDoor #ildGo'); await waitOpen(p);
  ok(true, '4. the new password opens it');
  // 5. Settings: every way back in; a new key file replaces the old
  await p.evaluate(() => { const r = JSON.parse(localStorage.getItem('ingenium_lock')); r.remind = { next: Date.now() + 864e5 * 30, step: 1 }; localStorage.setItem('ingenium_lock', JSON.stringify(r)); });
  await p.evaluate(() => { go('settings'); }); await p.waitForTimeout(700);
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(x => /Your ways back in/.test(x.textContent)).click()); await p.waitForSelector('#ingLockDoor .ild-way', { timeout: 5000 });
  const rows = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-way')].map(x => ({ t: x.querySelector('b').textContent, ok: !x.querySelector('i').classList.contains('no'), k: (x.querySelector('button') || {}).textContent || '' })));
  ok(rows.length === 4 && rows.every(x => x.ok) && rows.map(x => x.t).join('|') === 'Your password|Your ten recovery words|A recovery key file|A hint for your password', '5. Settings, Your ways back in: the password, the words, the key file and the hint, each kept', rows);
  await p.screenshot({ path: OUT + '/ways-settings.png' });
  await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-way')].find(x => /A recovery key file/.test(x.textContent)).querySelector('button').click());
  await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 5000 }); await p.fill('#ingLockDoor #ildPw', PW2);
  const [dl2] = await Promise.all([p.waitForEvent('download', { timeout: 30000 }), p.click('#ingLockDoor form button[type=submit]')]);
  const keyB = path.join(OUT, 'keyB.ingenium-key'); await dl2.saveAs(keyB); await p.waitForTimeout(500);
  const kfB = JSON.parse(fs.readFileSync(keyB, 'utf8')); r = await rec(p);
  ok(kfB.id !== kf.id && r.file.id === kfB.id, '5. a new key file replaces the old: the lock now knows only the new one', { old: kf.id, now: r.file.id });
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  // 6. at the sign-in: the older file is refused in plain words; one from another lock too; the newest opens
  await p.reload(); await waitBoot(p); await p.waitForTimeout(600);
  await p.click('#ingLockDoor #ildForgot'); await p.waitForSelector('#ingLockDoor #ildWayFile', { timeout: 5000 }); await p.click('#ingLockDoor #ildWayFile');
  let [fc2] = await Promise.all([p.waitForEvent('filechooser'), p.click('#ingLockDoor #ildPick')]); await fc2.setFiles(keyA); await p.waitForTimeout(1500);
  ok(/That is an older recovery key file: a newer one was saved on/.test(await errText(p)), '6. the older key file is refused, and it says a newer one was saved', await errText(p));
  const other = path.join(OUT, 'other.ingenium-key'); fs.writeFileSync(other, JSON.stringify(Object.assign({}, kfB, { lock: 12345 })));
  [fc2] = await Promise.all([p.waitForEvent('filechooser'), p.click('#ingLockDoor #ildPick')]); await fc2.setFiles(other); await p.waitForTimeout(1200);
  ok(/belongs to another lock/.test(await errText(p)), '6. a key file of another lock is refused, in plain words', await errText(p));
  const notkey = path.join(OUT, 'notakey.json'); fs.writeFileSync(notkey, '{"hello":"world"}');
  [fc2] = await Promise.all([p.waitForEvent('filechooser'), p.click('#ingLockDoor #ildPick')]); await fc2.setFiles(notkey); await p.waitForTimeout(800);
  ok(/not an Ingenium recovery key file/.test(await errText(p)), '6. a file that is no key file is refused', await errText(p));
  [fc2] = await Promise.all([p.waitForEvent('filechooser'), p.click('#ingLockDoor #ildPick')]); await fc2.setFiles(keyB);
  await p.waitForFunction(() => /Your recovery key file opened this copy/.test((document.querySelector('#ingLockDoor') || {}).innerText || ''), null, { timeout: 30000 });
  await setPw(p, PW3); await waitOpen(p);
  ok(true, '6. the newest key file opens it, and a new password is set');
  // 7. new words replace the old
  await p.evaluate(() => { go('settings'); }); await p.waitForTimeout(500);
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(x => /Your ways back in/.test(x.textContent)).click()); await p.waitForSelector('#ingLockDoor .ild-way', { timeout: 5000 });
  await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-way')].find(x => /recovery words/.test(x.textContent)).querySelector('button').click());
  await p.waitForSelector('#ingLockDoor #ildNew', { timeout: 5000 }); await p.click('#ingLockDoor #ildNew');
  await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 5000 }); await p.fill('#ingLockDoor #ildPw', PW3); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 30000 });
  const words2 = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map(d => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked2 = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  await p.fill('#ildW1', words2[asked2[0] - 1]); await p.fill('#ildW2', words2[asked2[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => document.querySelector('#ingLockDoor').hidden, null, { timeout: 30000 }); r = await rec(p);
  ok(words2.join(' ') !== words.join(' ') && r.recMade > 0, '7. new words are made and kept, once two of them are typed back', { recMade: r.recMade });
  await p.reload(); await waitBoot(p); await p.waitForTimeout(600);
  await p.click('#ingLockDoor #ildForgot'); await p.waitForSelector('#ingLockDoor #ildWayWords', { timeout: 5000 }); await p.click('#ingLockDoor #ildWayWords'); await p.waitForSelector('#ingLockDoor #ildPhrase', { timeout: 5000 });
  await p.fill('#ildPhrase', words.join(' ')); await p.click('#ingLockDoor form button[type=submit]'); await p.waitForTimeout(2500);
  ok(/Those words do not open this copy/.test(await errText(p)), '7. the old words no longer open it', await errText(p));
  await p.fill('#ildPhrase', words2.join(' ')); await p.click('#ingLockDoor form button[type=submit]');
  await setPw(p, PW1); await waitOpen(p);
  ok(true, '7. the new words open it');
  // 8. the hint: one that gives the password away is refused in Settings too; removed, it is gone
  await p.evaluate(() => { go('settings'); }); await p.waitForTimeout(500);
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(x => /Your ways back in/.test(x.textContent)).click()); await p.waitForSelector('#ingLockDoor .ild-way', { timeout: 5000 });
  await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-way')].find(x => /A hint/.test(x.textContent)).querySelector('button').click());
  await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 5000 }); await p.fill('#ingLockDoor #ildPw', PW1); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor #ildHint', { timeout: 30000 }); await p.fill('#ingLockDoor #ildHint', 'it is QUILL-AND-INK-1843'); await p.click('#ingLockDoor form button[type=submit]'); await p.waitForTimeout(300);
  ok(/holds your password/.test(await errText(p)), '8. in Settings too, a hint that holds the password is refused', await errText(p));
  await p.click('#ingLockDoor #ildDel'); await p.waitForTimeout(400); r = await rec(p);
  ok(!r.hint, '8. Remove it: the hint is gone');
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  // 9. the check now and then, when it is due
  await p.evaluate(() => { const r = JSON.parse(localStorage.getItem('ingenium_lock')); r.remind = { next: Date.now() - 1000, step: 1 }; localStorage.setItem('ingenium_lock', JSON.stringify(r)); });
  await p.reload(); await waitBoot(p); await p.waitForTimeout(600); await p.fill('#ingLockDoor #ildPw', PW1); await p.click('#ingLockDoor #ildGo'); await waitOpen(p);
  await p.waitForFunction(() => /A quick check, so you are never locked out/.test((document.querySelector('#ingLockDoor') || {}).innerText || ''), null, { timeout: 15000 }).catch(() => {});
  t = await doorText(p);
  ok(/A quick check, so you are never locked out/.test(t) && /Your ten recovery words/.test(t) && /A recovery key file Saved/.test(t), '9. when it is due, after the sign-in, a short check of the ways back in', t.slice(0, 220));
  await p.screenshot({ path: OUT + '/check.png' });
  await p.click('#ingLockDoor #ildFine'); await p.waitForTimeout(400); r = await rec(p);
  const days = Math.round((r.remind.next - Date.now()) / 864e5);
  ok(r.remind.step === 2 && days === 30, '9. Yes, they are safe: the next check is set further on (a month, at the third)', { step: r.remind.step, days });
  ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
