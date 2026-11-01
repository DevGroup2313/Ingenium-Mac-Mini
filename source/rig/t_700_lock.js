// node rig/t_700_lock.js <Ingenium page url> <out dir>
// Ingenium 6.9.x (31 October 2026), in Chromium. The owner's words: "I also want for the data on the app to be protected with
// encryption so that my data is protected on the device. I also want an optional sign-in / login screen with user name and
// password." (modules/r197.js and the R197 edits in build_page.py). Checks, in one profile:
//   - a fresh profile: the welcome door as before, with the optional third choice "Protect this copy with a sign-in";
//   - protect: name and password, the recovery phrase shown once and two of its words typed back, the desk and the long texts
//     already there sealed (localStorage ingenium_v4 is an envelope with a clear header, IndexedDB ingenium_big holds envelopes,
//     no "role":"me" and no plain text visible anywhere), the JavaScript AES-GCM gives the very bytes WebCrypto gives;
//   - reload: the sign-in greets her by name and asks for her user name (filled in) and password; a wrong password, or a wrong
//     user name, is refused and nothing changes; the right ones open the same chat and the same long text; the loading page took
//     the night theme from the clear header;
//   - while the page waits at the sign-in, the long-text store's sweep (90 s after the start) lets nothing go: a long text made
//     an hour ago, named only by the sealed desk, is still there after the sweep and opens after the sign-in;
//   - the lock record lost from the browser's store: the sealed desk carries it in its clear header, so the sign-in still opens;
//   - Settings: the card is in Your data and Find a setting finds it; the recovery shelf counts what each sealed moment holds;
//   - the password changed; "Forgot your password?" with the phrase opens and sets a new password;
//   - the lock after time away fires (shortened for the test) and the page comes back to the sign-in;
//   - protection turned off writes everything back as plain text and removes the lock; the page then behaves as before;
//   - where the browser offers no cryptography (an insecure address), the door and the card say the lock cannot be turned on
//     here, and a sealed desk is met with that message, never overwritten;
//   - "I have neither the password nor the phrase": the page starts again with an empty desk, the sealed one kept aside;
//   - every part of the page ran to its end, and no script errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const MSG = 'The abbey of Cluny, folio 12, is dated 1088 by the hand of Abbot Hugh.', NAME = 'Yannie', PW1 = 'cluny-folio-1088', PW2 = 'hugh-of-semur-1049', PW3 = 'after-the-phrase-2026';
const MARKS = { note: 'NOTE-MARK-CLUNY the abbey bells', rem: 'REMINDER-MARK-CLUNY write to the abbot', park: 'PARKED-MARK-CLUNY a thought about folio 12', legacy: 'LEGACY-MARK-CLUNY an older copy of the desk' };
const BIGTEXT = 'PLAIN-LONG-TEXT-MARK the letters of the abbey, copied out in full. '.repeat(1200);
const OLDTEXT = 'OLD-LONG-TEXT-MARK a register copied an hour ago. '.repeat(900), OLDID = 'big_' + (Date.now() - 3600 * 1000).toString(36) + 'oldtxt';
const waitBoot = (p) => p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
const doorUp = (p) => p.evaluate(() => { const d = document.querySelector('#ingLockDoor'); return !!(d && !d.hidden && d.querySelector('#ildPw')); });
const lsRaw = (p, k) => p.evaluate((k) => localStorage.getItem(k), k);
const idbVals = (p) => p.evaluate(() => new Promise((res) => { try { const rq = indexedDB.open('ingenium_big', 1); rq.onsuccess = () => { const d = rq.result; try { const g = d.transaction('t', 'readonly').objectStore('t').getAll(); g.onsuccess = () => { res(g.result.map(v => typeof v === 'string' ? v : typeof v)); d.close(); }; g.onerror = () => { res(null); d.close(); }; } catch (e) { res(null); } }; rq.onerror = () => res(null); } catch (e) { res(null); } }));
const idbHas = (p, id) => p.evaluate((id) => new Promise((res) => { try { const rq = indexedDB.open('ingenium_big', 1); rq.onsuccess = () => { const d = rq.result; try { const g = d.transaction('t', 'readonly').objectStore('t').get(id); g.onsuccess = () => { res(typeof g.result === 'string' ? g.result.slice(0, 6) : null); d.close(); }; g.onerror = () => { res(null); d.close(); }; } catch (e) { res(null); } }; rq.onerror = () => res(null); } catch (e) { res(null); } }), id);
const settle = async (p) => { for (let i = 0; i < 60; i++) { const n = await p.evaluate(() => (window.IngLock && window.IngLock._test.pending()) || 0); if (!n) break; await p.waitForTimeout(100); } await p.waitForTimeout(300); };
async function signIn(p, password) { await p.fill('#ingLockDoor #ildPw', password); await p.click('#ingLockDoor #ildGo'); }
async function waitOpen(p) { await p.waitForFunction(() => window.__ingLocked === false && (!document.querySelector('#ingLockDoor') || document.querySelector('#ingLockDoor').hidden), null, { timeout: 30000 }); await p.waitForTimeout(500); }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await waitBoot(p); await p.waitForTimeout(800);
  // 1. the door as before, with the optional third choice
  const door = await p.evaluate(() => ({ shown: !document.getElementById('introDoor').hasAttribute('hidden'), enter: !!document.getElementById('introEnter'), protect: (document.getElementById('introProtect') || {}).textContent || null, lock: window.IngLock && !window.IngLock.active(), p197: window.__ingParts.p197 }));
  ok(door.shown && door.enter && /Protect this copy with a sign-in/.test(door.protect || '') && door.lock === true && door.p197 === 'running', 'a fresh profile: the welcome door as before, with the optional "Protect this copy with a sign-in" beside Enter, and no lock set', door);
  // a long text already on the device, and a theme, before the lock is turned on
  await p.evaluate(async (a) => { const id = IngBig.newId(); window.__t700big = id; state.t700ref = id; state.theme = 'night'; applyTheme(); await IngBig.put(id, a.t); state.t700old = a.oid; await IngBig.put(a.oid, a.o); saveState(); }, { t: BIGTEXT, o: OLDTEXT, oid: OLDID });
  // her notes, a reminder and a parked thought; the page keeps a shared copy of these for a window of its own (R123), in plain text while no lock is set
  await p.evaluate((m) => { state.notes = state.notes || []; state.notes.unshift({ id: 'n_t700', text: m.note, title: m.note, x: 40, y: 60 }); state.reminders = state.reminders || []; state.reminders.push({ text: m.rem }); state.parked = state.parked || []; state.parked.unshift({ id: 'park_t700', t: m.park, at: Date.now() }); saveState(); }, MARKS);
  // older copies of the desk: one kept by an earlier version under another name, one set aside when a desk could not be read
  await p.evaluate((m) => { localStorage.setItem('the_foundry_v4', JSON.stringify({ appName: 'The Foundry', note: m.legacy })); localStorage.setItem('ingenium_v4.broken-1700000000000', '{"appName": "broken ' + m.legacy); }, MARKS);
  await p.waitForTimeout(2200);
  const hub0 = await lsRaw(p, 'ing_lite_hub');
  ok(hub0 && hub0.includes(MARKS.note) && hub0.includes(MARKS.rem) && hub0.includes(MARKS.park), 'before the lock: the shared copy of the notes for a window of its own is plain text in this browser\'s store (so the check after the lock means something)', hub0 && hub0.slice(0, 80));
  const before = await idbVals(p);
  ok(before && before.length === 2 && before.some(v => v.indexOf('PLAIN-LONG-TEXT-MARK') === 0) && before.some(v => v.indexOf('OLD-LONG-TEXT-MARK') === 0), 'before the lock: the long texts are plain in IndexedDB ingenium_big', before && before.map(v => v.slice(0, 30)));
  ok(await p.evaluate(() => IngLock._test.selfTest()), 'the JavaScript AES-GCM (for the moment the window closes) gives the very bytes WebCrypto gives');
  // a second window of the same copy, open (and plain) when protection is turned on in the first
  const w2 = await ctx.newPage(); const errsW2 = []; w2.on('pageerror', e => errsW2.push(e.message.slice(0, 300)));
  await w2.goto(URL_); await waitBoot(w2); await w2.waitForTimeout(800);
  // 2. protect
  await p.click('#introProtect'); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 10000 });
  await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW1); await p.fill('#ildP2', PW1); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 10000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map(d => d.textContent.replace(/^\d+/, '').trim()));
  ok(words.length === 10 && words.every(w => /^[a-z]{3,7}$/.test(w)), 'the recovery phrase: ten plain words, shown once', words.join(' '));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  ok(asked && asked.length === 2, 'two of the words are asked back', asked);
  // the wrong word first: refused
  await p.fill('#ildW1', 'wrongword'); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]'); await p.waitForTimeout(300);
  ok(await p.evaluate(() => { const e = document.querySelector('#ingLockDoor .ild-err'); return !!(e && !e.hidden && /not the one/.test(e.textContent)); }), 'a word that is not in the phrase is refused');
  await p.fill('#ildW1', words[asked[0] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 60000 });
  const protectedSay = await p.evaluate(() => document.querySelector('#ingLockDoor p').textContent);
  ok(/Yannie, this copy now opens to a sign-in/.test(protectedSay) && /quarter of an hour/.test(protectedSay), 'protection turned on: the card says what changed and what locks on its own', protectedSay.slice(0, 160));
  await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(600);
  const after = await p.evaluate(() => ({ door: document.getElementById('introDoor').hasAttribute('hidden'), on: IngLock.on(), rec: !!localStorage.getItem('ingenium_lock'), locked: window.__ingLocked }));
  ok(after.door && after.on && after.rec && !after.locked, 'the welcome door closed, the lock is on and its record is kept', after);
  let w2up = false; for (let i = 0; i < 60; i++) { await p.waitForTimeout(500); try { if (await doorUp(w2)) { w2up = true; break; } } catch (e) {} }
  const w2st = await w2.evaluate(() => ({ locked: window.__ingLocked, chats: (state.chats || []).reduce((n, c) => n + (c.messages || []).length, 0) })).catch(() => null);
  const w2raw = await lsRaw(p, 'ingenium_v4');
  ok(w2up && w2st && w2st.locked === true && w2raw.indexOf('{"ing":"locked"') === 0, 'a second window of the same copy, open when protection was turned on, starts again at the sign-in, and writes no plain desk over the sealed one', { w2up, w2st, head: w2raw.slice(0, 16) });
  await w2.close();
  const rec = await p.evaluate(() => JSON.parse(localStorage.getItem('ingenium_lock')));
  ok(rec.v === 1 && rec.user === NAME && rec.kdf.name === 'PBKDF2' && rec.kdf.hash === 'SHA-256' && rec.kdf.iter >= 600000 && rec.dek && rec.rec && rec.check && rec.phr && rec.mig && rec.mig.big === 1 && !JSON.stringify(rec).includes(PW1), 'the lock record: PBKDF2-SHA-256 at 600,000 rounds or more, the wrapped data key, the phrase\'s own wrap, the check value; no password in it', { iter: rec.kdf.iter, user: rec.user, mig: rec.mig });
  // 3. one chat message, then everything sealed at rest
  await p.evaluate((t) => { const c = curChat(); c.messages.push({ role: 'me', text: t }); saveState(); try { renderChat(); } catch (e) {} }, MSG);
  await settle(p);
  const raw = await lsRaw(p, 'ingenium_v4'); let head = null; try { head = JSON.parse(raw); } catch (e) {}
  ok(raw && raw.indexOf('{"ing":"locked"') === 0 && head && head.v === 1 && head.__deskAt > 0 && head.theme === 'night' && head.look && head.n && head.n.chats >= 1 && head.n.messages >= 1 && /^ING1g?\./.test(head.body), 'localStorage ingenium_v4 is a sealed envelope with a clear header (when, the look, how many chats and messages)', head && { at: head.__deskAt, theme: head.theme, look: head.look, n: head.n, body: head.body.slice(0, 8) });
  ok(!raw.includes('"role":"me"') && !raw.includes('folio 12') && !raw.includes(MSG.slice(0, 20)), 'no message, role or plain text is visible in the sealed desk');
  const snaps = await p.evaluate(() => [0, 1, 2].map(i => localStorage.getItem('ingenium_v4.snap' + i)).filter(Boolean));
  ok(snaps.every(s => { try { const o = JSON.parse(s); return typeof o.v === 'string' && o.v.indexOf('{"ing":"locked"') === 0 && !o.v.includes('"role":"me"'); } catch (e) { return false; } }), 'the recovery shelf holds only sealed desks', snaps.map(s => s.slice(0, 40)));
  const idb = await idbVals(p);
  ok(idb && idb.length >= 2 && idb.every(v => /^ING1g?\./.test(v)) && !idb.some(v => v.includes('PLAIN-LONG-TEXT-MARK') || v.includes('OLD-LONG-TEXT-MARK')), 'IndexedDB ingenium_big: every record is an envelope (the texts put before the lock were sealed in place)', idb && idb.map(v => v.slice(0, 12)));
  ok(head && head.lock && head.lock.made === rec.made && head.lock.dek && head.lock.dek.ct === rec.dek.ct && !raw.includes(PW1), 'the sealed desk carries its lock record in the clear header (the wrapped key only; no password)', head && head.lock && { made: head.lock.made, user: head.lock.user });
  await p.evaluate((m) => { state.reminders.push({ text: m.rem + ' two' }); state.parked.unshift({ id: 'park_t700b', t: m.park + ' two', at: Date.now() }); saveState(); }, MARKS);
  await settle(p); await p.waitForTimeout(1800);
  const traces = await p.evaluate((marks) => { const out = []; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i), v = localStorage.getItem(k) || ''; marks.forEach(m => { if (v.includes(m)) out.push(k + ' has ' + m.slice(0, 14)); }); } return out; }, [MSG.slice(0, 24), MARKS.note, MARKS.rem, MARKS.park, MARKS.legacy, 'PLAIN-LONG-TEXT-MARK']);
  const legacyNow = await p.evaluate(() => ({ a: localStorage.getItem('the_foundry_v4'), b: localStorage.getItem('ingenium_v4.broken-1700000000000') }));
  ok(legacyNow.a && legacyNow.b && /^\{"ing":"locked"/.test(legacyNow.a) && /^\{"ing":"locked"/.test(legacyNow.b), 'older copies of the desk (an earlier name, one set aside as unreadable) are sealed in place too', { a: (legacyNow.a || '').slice(0, 20), b: (legacyNow.b || '').slice(0, 20) });
  ok(traces.length === 0 && (await lsRaw(p, 'ing_lite_hub')) === null, 'no plain trace of the chat, a note, a reminder or a parked thought in any value of this browser\'s store, and the shared copy for a window of its own is not kept while protection is on', traces);
  const sealedEnv = raw, sealedRec = JSON.stringify(rec);
  // 4. reload: the sign-in
  await p.reload(); await waitBoot(p); await p.waitForTimeout(600);
  ok(await doorUp(p), 'after a reload the sign-in is drawn over the loading page');
  const greet = await p.evaluate(() => ({ sub: document.querySelector('#ingLockDoor .ild-sub').textContent, night: document.querySelector('#ingLockDoor').classList.contains('ild-night'), splashNight: !!document.querySelector('#ing-boot.ib-night'), locked: window.__ingLocked, chats: (state.chats || []).reduce((n, c) => n + (c.messages || []).length, 0), ready: window.__ingReady }));
  ok(/Welcome back, Yannie\./.test(greet.sub) && greet.locked === true && greet.chats === 0, 'the sign-in greets her by name; the desk is not open yet', greet);
  ok(greet.night && greet.splashNight, 'the loading page and the sign-in took the night theme from the clear header', greet);
  const fields = await p.evaluate(() => ({ name: (document.querySelector('#ingLockDoor #ildName') || {}).value, nameAuto: (document.querySelector('#ingLockDoor #ildName') || { getAttribute() {} }).getAttribute('autocomplete'), pwAuto: document.querySelector('#ingLockDoor #ildPw').getAttribute('autocomplete'), focus: document.activeElement && document.activeElement.id }));
  ok(fields.name === NAME && fields.nameAuto === 'username' && fields.pwAuto === 'current-password' && fields.focus === 'ildPw', 'the sign-in asks for the user name (filled in from the lock) and the password, with the password field ready to type in', fields);
  await p.screenshot({ path: OUT + '/signin.png' });
  // the long-text store's sweep, as the base runs it 90 s after the start, while the page waits at the sign-in
  await p.evaluate(() => IngBig.gc(ingBigLive())); await p.waitForTimeout(800);
  const kept = await idbHas(p, OLDID);
  ok(kept && /^ING1/.test(kept), 'the sweep run while the page waits at the sign-in lets nothing go: a long text made an hour ago, named only by the sealed desk, is still there', kept);
  await p.fill('#ingLockDoor #ildName', 'Someone Else'); await p.fill('#ingLockDoor #ildPw', PW1); await p.click('#ingLockDoor #ildGo'); await p.waitForTimeout(400);
  const wrongName = await p.evaluate(() => ({ err: (document.querySelector('#ingLockDoor .ild-err') || {}).textContent || '', locked: window.__ingLocked, up: !document.querySelector('#ingLockDoor').hidden }));
  ok(/That user name and password do not open this copy/.test(wrongName.err) && wrongName.locked === true && wrongName.up, 'a user name that is not the one kept with the lock is refused, and nothing changed', wrongName);
  await p.fill('#ingLockDoor #ildName', ' yannie ');
  const rawBefore = await lsRaw(p, 'ingenium_v4');
  await signIn(p, 'not-the-password-at-all'); await p.waitForFunction(() => { const e = document.querySelector('#ingLockDoor .ild-err'); return e && !e.hidden; }, null, { timeout: 20000 });
  const wrong = await p.evaluate(() => ({ err: document.querySelector('#ingLockDoor .ild-err').textContent, locked: window.__ingLocked, chats: (state.chats || []).reduce((n, c) => n + (c.messages || []).length, 0), up: !document.querySelector('#ingLockDoor').hidden }));
  ok(/does not open this copy. Nothing was changed/.test(wrong.err) && wrong.locked === true && wrong.chats === 0 && wrong.up && (await lsRaw(p, 'ingenium_v4')) === rawBefore, 'a wrong password is refused, and nothing changed (the store and the desk are as they were)', wrong);
  await signIn(p, PW1); await waitOpen(p);
  const opened = await p.evaluate(async () => { const c = (state.chats || []).find(c => (c.messages || []).some(m => m.role === 'me')); const t = await IngBig.load(window.__t700big || state.t700ref); return { msg: c && c.messages.find(m => m.role === 'me').text, big: t && t.slice(0, 20), bigLen: t && t.length, on: IngLock.on(), theme: document.body.getAttribute('data-theme'), door: document.getElementById('introDoor').hasAttribute('hidden'), splash: document.getElementById('ing-boot').classList.contains('ib-done') || document.getElementById('ing-boot').classList.contains('ib-gone') }; });
  const vis = await p.evaluate(() => { const d = document.getElementById('ingLockDoor'); const el = document.elementFromPoint(innerWidth / 2, innerHeight / 2); return { hidden: d.hidden, display: getComputedStyle(d).display, over: !!(el && el.closest && el.closest('#ingLockDoor')) }; });
  ok(vis.hidden && vis.display === 'none' && !vis.over, 'after the sign-in the door is gone for good: not displayed, and nothing of it takes a click', vis);
  ok(opened.msg === MSG && opened.on && opened.door && opened.splash && opened.theme === 'night', 'the right password opens the same desk: the chat message is there, the door stays closed, the cover lifted, the night theme applied', opened);
  ok(opened.big === 'PLAIN-LONG-TEXT-MARK' && opened.bigLen === BIGTEXT.length, 'the long text put before the lock is read back whole through the sealed store', { big: opened.big, len: opened.bigLen });
  const oldBack = await p.evaluate(async (id) => { const t = await IngBig.load(id); return t ? t.slice(0, 18) + ':' + t.length : null; }, OLDID);
  ok(oldBack === 'OLD-LONG-TEXT-MARK:' + OLDTEXT.length, 'the long text made an hour ago opens whole after the sign-in (the sweep waited)', oldBack);
  // the lock record lost from this browser's store (a store cleared by hand, the computer app's view at a new address): the sealed desk carries it
  await p.evaluate(() => { localStorage.removeItem('ingenium_lock'); });
  await p.reload(); await waitBoot(p); await p.waitForTimeout(600);
  const lost = await p.evaluate(() => ({ up: !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw'), sub: (document.querySelector('#ingLockDoor .ild-sub') || {}).textContent, rec: !!localStorage.getItem('ingenium_lock') }));
  ok(lost.up && /Welcome back, Yannie\./.test(lost.sub || '') && lost.rec, 'with the lock record gone from the store, the sign-in still greets her (the record came back from the sealed desk\'s header)', lost);
  await signIn(p, PW1); await waitOpen(p);
  ok(await p.evaluate((t) => IngLock.on() && (state.chats || []).some(c => (c.messages || []).some(m => m.text === t)), MSG), 'and the password opens the same desk');
  // 5. change the password (Settings, Your data)
  await p.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); }); await p.waitForSelector('#ingLockCard', { timeout: 10000 });
  const card = await p.evaluate(() => { const c = document.getElementById('ingLockCard'); const room = c.parentNode && c.parentNode.getAttribute('data-room'); return { room, say: document.getElementById('ingLockSay').textContent, keys: [...c.querySelectorAll('button')].map(b => b.textContent), idle: (document.getElementById('ingLockIdle') || {}).value }; });
  const found = await p.evaluate(() => { const r = (window.IngRooms && IngRooms.find('encryption')) || []; const cards = [...document.querySelectorAll('#page-settings .rm-panel[data-room="data"] > *')].map(e => e.id || '').filter(Boolean); return { hits: r.map(h => h.card + '@' + h.room), roomOf: IngRooms.roomOf(document.getElementById('ingLockCard')), cards }; });
  ok(found.hits.indexOf('ingLockCard@data') >= 0 && found.roomOf === 'data', 'Find a setting: "encryption" finds the card, in Your data', found);
  await p.evaluate(() => document.getElementById('recoverSnap').click()); await p.waitForSelector('#snapList .shelf-card', { timeout: 15000 });
  const shelf = await p.evaluate(() => [...document.querySelectorAll('#snapList .shelf-card')].map(c => c.textContent.replace(/\s+/g, ' ').slice(0, 220)));
  ok(shelf.length >= 1 && shelf.every(t => !/\b0 conversations, 0 messages/.test(t)) && shelf.some(t => /[1-9]\d* conversations?, [1-9]\d* messages?/.test(t)), 'the recovery shelf opens its sealed moments to count them: conversations and messages, as with the lock off', shelf);
  await p.evaluate(() => { const b = document.getElementById('snapClose'); if (b) b.click(); }); await p.waitForTimeout(300);
  ok(card.room === 'data' && /On\./.test(card.say) && /Signed in as Yannie/.test(card.say) && card.keys.join('|').includes('Lock now') && card.keys.join('|').includes('Change the password') && card.keys.join('|').includes('Show the recovery phrase') && card.keys.join('|').includes('Turn protection off') && card.idle === '15', 'Settings, Your data: the card in the data room says the lock is on, with Lock now, Change the password, Show the recovery phrase, Turn protection off and the auto-lock choice', card);
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(b => /Change the password/.test(b.textContent)).click());
  await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 5000 }); await p.fill('#ingLockDoor #ildPw', PW1); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor #ildP1', { timeout: 20000 }); await p.fill('#ildP1', PW2); await p.fill('#ildP2', PW2); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => document.querySelector('#ingLockDoor').hidden, null, { timeout: 20000 });
  const rec2 = await p.evaluate(() => JSON.parse(localStorage.getItem('ingenium_lock')));
  ok(rec2.dek.ct !== rec.dek.ct && rec2.kdf.salt !== rec.kdf.salt && rec2.rec.ct === rec.rec.ct && rec2.changed > rec.changed, 'the password changed: only the data key\'s wrap and salt changed; the phrase\'s wrap is the same', { changed: rec2.changed > rec.changed });
  // the recovery phrase shown again, for the password
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(b => /Show the recovery phrase/.test(b.textContent)).click());
  await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 5000 }); await p.fill('#ingLockDoor #ildPw', PW2); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 20000 });
  const shown = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map(d => d.textContent.replace(/^\d+/, '').trim()));
  ok(shown.join(' ') === words.join(' '), 'Show the recovery phrase (password asked) shows the same ten words');
  await p.click('#ingLockDoor .ild-key'); await p.waitForTimeout(300);
  // 6. reload: the old password fails, the new one opens; then "Forgot" with the phrase
  await p.reload(); await waitBoot(p); await p.waitForTimeout(600);
  await signIn(p, PW1); await p.waitForFunction(() => { const e = document.querySelector('#ingLockDoor .ild-err'); return e && !e.hidden; }, null, { timeout: 20000 });
  ok(await doorUp(p), 'the old password no longer opens');
  await signIn(p, PW2); await waitOpen(p);
  ok(await p.evaluate((t) => (state.chats || []).some(c => (c.messages || []).some(m => m.text === t)), MSG), 'the new password opens the same desk');
  await p.reload(); await waitBoot(p); await p.waitForTimeout(600);
  await p.click('#ingLockDoor #ildForgot'); await p.waitForSelector('#ingLockDoor #ildPhrase', { timeout: 5000 });
  await p.fill('#ildPhrase', 'actor adobe agate agent alarm album alley anchor angle ankle'); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => { const e = document.querySelector('#ingLockDoor .ild-err'); return e && !e.hidden; }, null, { timeout: 20000 });
  ok(await p.evaluate(() => window.__ingLocked === true && /do not open this copy/.test(document.querySelector('#ingLockDoor .ild-err').textContent)), 'ten wrong words are refused, and nothing changed');
  await p.fill('#ildPhrase', words.map((w, i) => i % 2 ? w.toUpperCase() : w).join('  ')); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor #ildP1', { timeout: 30000 });
  ok(true, '"Forgot your password?" with the phrase (any case, any spacing) opens, and asks for a new password');
  await p.fill('#ildP1', PW3); await p.fill('#ildP2', PW3); await p.click('#ingLockDoor form button[type=submit]'); await waitOpen(p);
  ok(await p.evaluate((t) => IngLock.on() && (state.chats || []).some(c => (c.messages || []).some(m => m.text === t)), MSG), 'the desk opened with the phrase, the chat is there');
  // 7. the lock after time away, shortened for the test
  await p.evaluate(() => IngLock._test.idle(1500));
  let relocked = false; for (let i = 0; i < 40; i++) { await p.waitForTimeout(500); try { if (await doorUp(p)) { relocked = true; break; } } catch (e) {} }
  ok(relocked, 'the lock after time away fired: the page started again and shows the sign-in');
  await waitBoot(p); await signIn(p, PW3); await waitOpen(p);
  ok(await p.evaluate((t) => (state.chats || []).some(c => (c.messages || []).some(m => m.text === t)), MSG), 'the password set after the phrase opens the desk again after the auto-lock');
  // 8. turn protection off
  await p.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); }); await p.waitForSelector('#ingLockCard', { timeout: 10000 });
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(b => /Turn protection off/.test(b.textContent)).click());
  await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 5000 }); await p.fill('#ingLockDoor #ildPw', 'wrong-again'); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => { const e = document.querySelector('#ingLockDoor .ild-err'); return e && !e.hidden; }, null, { timeout: 20000 });
  ok(await p.evaluate(() => IngLock.on() && !!localStorage.getItem('ingenium_lock')), 'turning protection off asks the password, and refuses a wrong one');
  await p.fill('#ingLockDoor #ildPw', PW3); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /Protection is off/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 60000 });
  await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(800);
  const plain = await lsRaw(p, 'ingenium_v4'); const idb2 = await idbVals(p);
  const off = await p.evaluate(() => ({ active: IngLock.active(), rec: localStorage.getItem('ingenium_lock'), say: document.getElementById('ingLockSay').textContent }));
  ok(!off.active && off.rec === null && /Off\./.test(off.say), 'protection is off: the lock record is gone and the card says so', off);
  const legacyOff = await p.evaluate(() => ({ a: localStorage.getItem('the_foundry_v4'), b: localStorage.getItem('ingenium_v4.broken-1700000000000') }));
  ok(legacyOff.a && legacyOff.a.includes('LEGACY-MARK-CLUNY') && legacyOff.a.indexOf('{"appName"') === 0 && legacyOff.b && legacyOff.b.includes('LEGACY-MARK-CLUNY') && legacyOff.b.indexOf('{"appName": "broken') === 0, 'and the older copies of the desk are opened again, as they were', { a: (legacyOff.a || '').slice(0, 30), b: (legacyOff.b || '').slice(0, 30) });
  ok(plain && plain.indexOf('{"ing":"locked"') !== 0 && plain.includes(MSG) && plain.includes('"role":"me"'), 'the desk is plain text again, with the chat message in it');
  ok(idb2 && idb2.length >= 2 && idb2.every(v => v.indexOf('PLAIN-LONG-TEXT-MARK') === 0 || v.indexOf('OLD-LONG-TEXT-MARK') === 0) && idb2.some(v => v.indexOf('PLAIN-LONG-TEXT-MARK') === 0) && idb2.some(v => v.indexOf('OLD-LONG-TEXT-MARK') === 0), 'IndexedDB ingenium_big holds both long texts as plain text again', idb2 && idb2.map(v => v.slice(0, 24)));
  await p.reload(); await waitBoot(p); await p.waitForTimeout(800);
  const back = await p.evaluate((t) => ({ door: !!document.querySelector('#ingLockDoor:not([hidden])'), intro: !document.getElementById('introDoor').hasAttribute('hidden'), msg: (state.chats || []).some(c => (c.messages || []).some(m => m.role === 'me' && m.text === t)), locked: !!window.__ingLocked, protect: !!document.getElementById('introProtect') }), MSG);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(400);
  const entered = await p.evaluate(() => document.getElementById('introDoor').hasAttribute('hidden'));
  ok(!back.door && back.intro && back.protect && entered && back.msg && !back.locked, 'with the lock off the page opens as before: no sign-in, the welcome door on every start (R102) with its optional protect key, Enter closes it, the chat is there', back);
  // 9. with the lock off, a second fresh profile: the door and Enter as always
  const ctx2 = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p2 = await ctx2.newPage(); const errs2 = []; p2.on('pageerror', e => errs2.push(e.message.slice(0, 300)));
  await p2.goto(URL_); await waitBoot(p2); await p2.waitForTimeout(600);
  const d2 = await p2.evaluate(() => ({ shown: !document.getElementById('introDoor').hasAttribute('hidden'), lock: document.querySelector('#ingLockDoor:not([hidden])') ? 1 : 0 }));
  await p2.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p2.waitForTimeout(500);
  const d3 = await p2.evaluate(() => ({ hidden: document.getElementById('introDoor').hasAttribute('hidden'), seen: !!state.introSeen, raw: (localStorage.getItem('ingenium_v4') || '').slice(0, 2), parts: Object.keys(window.__ingParts).filter(k => window.__ingParts[k] !== 'running') }));
  ok(d2.shown && !d2.lock && d3.hidden && d3.seen && d3.raw === '{"' && d3.parts.length === 0, 'a fresh profile with the lock off: the door, Enter, a plain desk, every part running, as always', { d2, d3 });
  // 10. an address where the browser offers no cryptography (plain http on another computer's address): stood in for by isSecureContext=false
  const insecure = () => { try { Object.defineProperty(window, 'isSecureContext', { get: () => false, configurable: true }); } catch (e) {} };
  const ctx3 = await b.newContext({ viewport: { width: 1280, height: 900 } }); await ctx3.addInitScript(insecure);
  const p3 = await ctx3.newPage(); const errs3 = []; p3.on('pageerror', e => errs3.push(e.message.slice(0, 300)));
  await p3.goto(URL_); await waitBoot(p3); await p3.waitForTimeout(800);
  const ins = await p3.evaluate(() => ({ key: !!document.getElementById('introProtect'), note: (document.getElementById('introProtectNote') || {}).textContent || '' }));
  await p3.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p3.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); }); await p3.waitForSelector('#ingLockCard', { timeout: 10000 });
  const insCard = await p3.evaluate(() => ({ say: document.getElementById('ingLockSay').textContent, keys: [...document.querySelectorAll('#ingLockCard button')].map(b => b.textContent) }));
  await p3.evaluate(() => IngLock.setup()); await p3.waitForTimeout(300);
  const insSetup = await p3.evaluate(() => ({ text: (document.querySelector('#ingLockDoor:not([hidden]) p') || {}).textContent || '', form: !!document.querySelector('#ingLockDoor #ildP1'), rec: localStorage.getItem('ingenium_lock') }));
  ok(!ins.key && /opened in the Ingenium apps, or at localhost or over https/.test(ins.note) && /Off\./.test(insCard.say) && /cannot be turned on/.test(insCard.say) && insCard.keys.length === 0 && /cannot be turned on/.test(insSetup.text) && !insSetup.form && insSetup.rec === null,
    'where the browser offers no cryptography: no protect key at the door (a note says where it works), the card says it cannot be turned on here, and asking anyway refuses', { ins, insCard, insSetup });
  const seed = (a) => { try { if (a.insecure) Object.defineProperty(window, 'isSecureContext', { get: () => false, configurable: true }); if (!sessionStorage.getItem('__t700seeded')) { localStorage.setItem('ingenium_v4', a.env); localStorage.setItem('ingenium_lock', a.rec); sessionStorage.setItem('__t700seeded', '1'); } } catch (e) {} };
  const ctx4 = await b.newContext({ viewport: { width: 1280, height: 900 } }); await ctx4.addInitScript(seed, { env: sealedEnv, rec: sealedRec, insecure: true });
  const p4 = await ctx4.newPage(); const errs4 = []; p4.on('pageerror', e => errs4.push(e.message.slice(0, 300)));
  await p4.goto(URL_); await waitBoot(p4); await p4.waitForTimeout(2500);
  const cant = await p4.evaluate(() => ({ text: (document.querySelector('#ingLockDoor:not([hidden])') || {}).textContent || '', locked: window.__ingLocked, n: (state.chats || []).length, same: localStorage.getItem('ingenium_v4') }));
  ok(/This copy is protected with a sign-in/.test(cant.text) && /cannot be turned on, and a sealed desk cannot be opened/.test(cant.text) && cant.locked === true && cant.same === sealedEnv,
    'a sealed desk met at such an address: the page says so plainly, and writes nothing over it', { text: cant.text.slice(0, 160), locked: cant.locked, same: cant.same === sealedEnv });
  await ctx3.close(); await ctx4.close();
  // 11. neither the password nor the phrase: the page starts again with an empty desk, and the sealed one is kept aside, unopened
  const ctx5 = await b.newContext({ viewport: { width: 1280, height: 900 } }); await ctx5.addInitScript(seed, { env: sealedEnv, rec: sealedRec, insecure: false });
  const p5 = await ctx5.newPage(); const errs5 = []; p5.on('pageerror', e => errs5.push(e.message.slice(0, 300)));
  await p5.goto(URL_); await waitBoot(p5); await p5.waitForTimeout(800);
  ok(await doorUp(p5), 'a copy of the sealed desk in another profile: the sign-in');
  await p5.click('#ingLockDoor #ildForgot'); await p5.waitForSelector('#ingLockDoor #ildNeither', { timeout: 5000 }); await p5.click('#ingLockDoor #ildNeither');
  await p5.waitForSelector('#ingLockDoor #ildFresh', { timeout: 5000 });
  const warnText = await p5.evaluate(() => document.querySelector('#ingLockDoor .ild-card').textContent);
  await p5.click('#ingLockDoor #ildFresh');
  await p5.waitForFunction(() => window.__ingReady === true && !window.__ingLocked && !document.querySelector('#ingLockDoor:not([hidden])'), null, { timeout: 120000 }).catch(() => {}); await p5.waitForTimeout(1200);
  const fresh = await p5.evaluate(() => { const ks = []; for (let i = 0; i < localStorage.length; i++) ks.push(localStorage.key(i)); const sk = ks.find(k => /^ingenium_v4\.sealed-\d+$/.test(k)), rk = ks.find(k => /^ingenium_lock\.sealed-\d+$/.test(k));
    return { door: !!document.querySelector('#ingLockDoor:not([hidden])'), intro: !document.getElementById('introDoor').hasAttribute('hidden'), protect: !!document.getElementById('introProtect'), lock: localStorage.getItem('ingenium_lock'), aside: sk ? localStorage.getItem(sk).slice(0, 15) : null, asideRec: rk ? !!JSON.parse(localStorage.getItem(rk)).dek : false, chats: (state.chats || []).reduce((n, c) => n + (c.messages || []).length, 0), locked: !!window.__ingLocked }; });
  ok(/cannot be opened: not by you, and not by anyone else/.test(warnText) && !fresh.door && fresh.intro && fresh.protect && fresh.lock === null && fresh.aside === '{"ing":"locked"' && fresh.asideRec && fresh.chats === 0 && !fresh.locked,
    '"I have neither the password nor the phrase": a plain warning, then the page starts again with an empty desk and no sign-in; the sealed desk and its lock record are kept aside', fresh);
  await ctx5.close();
  // 12. a sign-in set up, but the desk found plain (closed between the lock record and the first sealing): the sign-in, then the plain desk is taken, and the next save seals it
  const PLAINDESK = JSON.stringify({ appName: 'Ingenium', theme: 'day', __deskAt: Date.now(), introSeen: true, chats: [{ id: 'c_plain', title: 'A plain desk', messages: [{ role: 'me', text: 'PLAIN-DESK-MARK found before the first sealing' }] }], activeChat: 'c_plain' });
  const seedP = (a) => { try { if (!sessionStorage.getItem('__t700plain')) { localStorage.setItem('ingenium_v4', a.desk); localStorage.setItem('ingenium_lock', a.rec); sessionStorage.setItem('__t700plain', '1'); } } catch (e) {} };
  const ctx6 = await b.newContext({ viewport: { width: 1280, height: 900 } }); await ctx6.addInitScript(seedP, { desk: PLAINDESK, rec: sealedRec });
  const p6 = await ctx6.newPage(); const errs6 = []; p6.on('pageerror', e => errs6.push(e.message.slice(0, 300)));
  await p6.goto(URL_); await waitBoot(p6); await p6.waitForTimeout(800);
  const up6 = await doorUp(p6);
  const rawKept = await p6.evaluate(() => localStorage.getItem('ingenium_v4'));
  await p6.fill('#ingLockDoor #ildPw', PW1); await p6.click('#ingLockDoor #ildGo'); await waitOpen(p6);
  const got6 = await p6.evaluate(() => ({ msg: (state.chats || []).some(c => (c.messages || []).some(m => /PLAIN-DESK-MARK/.test(m.text))), on: IngLock.on() }));
  await p6.evaluate(() => { saveState(); }); await settle(p6); await p6.waitForTimeout(500);
  const sealed6 = await p6.evaluate(() => localStorage.getItem('ingenium_v4'));
  ok(up6 && rawKept === PLAINDESK && got6.msg && got6.on && sealed6 && sealed6.indexOf('{"ing":"locked"') === 0 && !sealed6.includes('PLAIN-DESK-MARK'),
    'a sign-in set up with the desk still plain: the page waits at the sign-in and writes nothing, the plain desk is taken after it, and the next save seals it', { up6, kept: rawKept === PLAINDESK, got6, sealed: (sealed6 || '').slice(0, 16) });
  await ctx6.close();
  const parts = await p.evaluate(() => Object.keys(window.__ingParts).filter(k => window.__ingParts[k] !== 'running'));
  ok(parts.length === 0, 'every part of the page ran to its end', parts);
  ok(errs.length === 0 && errs2.length === 0 && errs3.length === 0 && errs4.length === 0 && errs5.length === 0 && errs6.length === 0 && errsW2.length === 0, 'no script errors on the page', errs.concat(errs2, errs3, errs4, errs5, errs6, errsW2).join(' | '));
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
