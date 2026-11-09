// node rig/t_700d_lock_backup.js <Ingenium page url> <out dir>
// Ingenium 6.9.x (31 October 2026): the sign-in and the seal (modules/r197.js) and the Backup page (r143), end to end, in two profiles.
// Profile one: a chat, a long text and a conversation brought in from elsewhere are kept, protection is turned on, a backup is made.
// Profile two (fresh, no lock): the backup is restored there. Back in profile one: the same backup is restored over the sealed desk.
// Checks:
//   - the backup made with protection on is a whole backup (its desk, its long text, its imported conversation);
//   - restored in a profile with no lock it gives plain, readable data, and carries no lock (no sign-in, no lock record, a plain desk);
//   - restored in the protected profile it goes back sealed (the desk, the long texts, the conversations), the lock record untouched;
//   - the window closing with a seal on its way: the newest desk is in the store at once, sealed (pagehide, pure JavaScript);
//   - after a reload and the sign-in the chat, the long text and the conversation read whole, and the last words are there;
//   - Reset everything (Settings) takes the lock with it: no lock record, no sign-in, the welcome door, the earlier desk gone;
//   - every part of the page ran to its end, and no script errors on either page.
// 6.33 (modules/r234.js): Your data and Models and AI show one section at a time; the section that holds the card is opened, as she would open it
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const NAME = 'Yannie', PW1 = 'the-abbey-of-cluny-1088';
const CHAT = 'BK-MARK-CHAT what is folio 12 of the abbey of Cluny?', LONG = 'BK-MARK-LONG ' + 'the letter of Abbot Hugh. '.repeat(400), CM1 = 'BK-MARK-IMPORTED what is folio 12?', CM2 = 'BK-MARK-IMPORTED-TWO folio 12 is the letter of Abbot Hugh.', TITLE = 'The abbey letters BK-TITLE-MARK';
const conv = (id, title, a, b) => ({ uuid: id, name: title, created_at: '2026-10-01T10:00:00Z', updated_at: '2026-10-02T10:00:00Z', chat_messages: [{ sender: 'human', text: a, created_at: '2026-10-01T10:00:00Z' }, { sender: 'assistant', text: b, created_at: '2026-10-01T10:01:00Z' }] });
const waitBoot = (p) => p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
const settle = async (p) => { for (let i = 0; i < 80; i++) { const n = await p.evaluate(() => (window.IngLock && window.IngLock._test.pending()) || 0); if (!n) break; await p.waitForTimeout(100); } await p.waitForTimeout(700); };
const enter = async (p) => { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500); };
// every record of a store, as the store holds it: a sealed record is told from a plain one
const raw = (p, db, store) => p.evaluate(([db, store]) => new Promise((res) => { let rq; try { rq = indexedDB.open(db); } catch (e) { res(null); return; }
  rq.onsuccess = () => { const d = rq.result; if (!d.objectStoreNames.contains(store)) { d.close(); res(null); return; } const t = d.transaction(store, 'readonly'), g = t.objectStore(store).getAll();
    t.oncomplete = () => { d.close(); res(g.result.map((v) => ({ sealed: (typeof v === 'string') ? /^ING1g?\./.test(v) : !!(v && v.ing === 'sealed'), json: JSON.stringify(v) }))); }; t.onerror = () => { d.close(); res(null); }; };
  rq.onerror = () => res(null); }), [db, store]);
async function protect(p) {
  await p.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); if (window.IngSettingsParts) IngSettingsParts.show('data', 'lock'); }); await p.waitForSelector('#ingLockCard', { timeout: 10000 });
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(b => /Protect this copy/.test(b.textContent)).click());
  await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 5000 }); await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW1); await p.fill('#ildP2', PW1); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 10000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map(d => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return [+m[1], +m[2]]; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 120000 });
  await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(600); return words;
}
const RESTORE = `async (b64) => { const bin = atob(b64), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  const r = await IngBackup.restore(new File([u8], 'b.zip'), { mode: 'replace', reload: false }); return { ok: r.ok, problems: (r.problems || []).slice(0, 4) }; }`;
const READ = `async (a) => { const chat = (state.chats || []).find(c => c.id === 'bk700'); const t = a.id ? await IngBig.load(a.id) : null; const l = await IngClaude.list(); const c = l.length ? await IngClaude.get(l[0].id) : null;
  return { chat: chat && chat.messages[0] && chat.messages[0].text, longLen: t ? t.length : -1, longHead: t ? t.slice(0, 13) : '', n: l.length, title: l[0] && l[0].title, m0: c && c.msgs && c.msgs[0] && c.msgs[0].t, m1: c && c.msgs && c.msgs[1] && c.msgs[1].t, flush: (state.chats || []).some(x => x.id === 'bk700-flush' && x.messages[0].text === 'FLUSH-MARK-LAST-WORDS') }; }`;
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await waitBoot(p); await p.waitForTimeout(1500); await enter(p);
  // 1. profile one: what is kept, then protection on, then a backup
  const seeded = await p.evaluate(async (a) => { const id = IngBig.newId(); state.bk700ref = id; await IngBig.put(id, a.long);
    state.chats.push({ id: 'bk700', title: 'Backup chat', created: Date.now(), messages: [{ role: 'me', text: a.chat, at: Date.now() }, { role: 'bot', text: 'A reply.', at: Date.now() }] }); saveState();
    const f = new File([JSON.stringify([a.conv])], 'conversations.json', { type: 'application/json' }); const r = await IngClaude.importFiles([f]); return { id, convs: r.convs, msgs: r.msgs }; },
    { long: LONG, chat: CHAT, conv: conv('bk700-c1', TITLE, CM1, CM2) });
  ok(seeded.convs === 1 && seeded.msgs === 2, 'a chat, a long text and a conversation brought in from elsewhere are kept', seeded);
  await p.waitForTimeout(800); await protect(p); await settle(p);
  const sealed0 = { v4: await p.evaluate(() => (localStorage.getItem('ingenium_v4') || '').indexOf('{"ing":"locked"') === 0), big: await raw(p, 'ingenium_big', 't'), conv: await raw(p, 'ingenium_claude', 'conv') };
  ok(sealed0.v4 && sealed0.big && sealed0.big.length >= 1 && sealed0.big.every(r => r.sealed) && sealed0.conv && sealed0.conv.length === 1 && sealed0.conv.every(r => r.sealed), 'protection is on: the desk, the long text and the conversation are sealed', { v4: sealed0.v4, big: sealed0.big && sealed0.big.map(r => r.sealed), conv: sealed0.conv && sealed0.conv.map(r => r.sealed) });
  const made = await p.evaluate(async () => { const m = await IngBackup.make({}); const u8 = new Uint8Array(await m.blob.arrayBuffer()); let s = ''; for (let i = 0; i < u8.length; i += 32768) s += String.fromCharCode.apply(null, u8.subarray(i, i + 32768));
    return { b64: btoa(s), size: u8.length, stores: (m.manifest.stores || []).map(d => d.db), census: m.manifest.census }; });
  ok(made.size > 2000 && made.stores.includes('ingenium_big') && made.stores.includes('ingenium_claude'), 'a backup made with protection on carries the desk, the long texts and the conversations', { size: made.size, stores: made.stores });
  fs.writeFileSync(OUT + '/backup.zip', Buffer.from(made.b64, 'base64'));
  // 2. profile two, fresh and with no lock: the backup restored there is plain and readable
  const ctxB = await b.newContext({ viewport: { width: 1280, height: 900 } }); const pb = await ctxB.newPage(); const errsB = []; pb.on('pageerror', e => errsB.push(e.message.slice(0, 300)));
  await pb.goto(URL_); await waitBoot(pb); await pb.waitForTimeout(1500); await enter(pb);
  // the app library's first-start keep (r120, 9 seconds after ready) writes its records meanwhile: let it finish before the restore counts them
  await pb.waitForTimeout(12000);
  const rb = await pb.evaluate(eval(RESTORE), made.b64); await pb.waitForTimeout(2500);
  ok(rb.ok && !(rb.problems || []).length, 'the backup restores in a profile with no lock, with no problem told', rb);
  const readB = await pb.evaluate(eval(READ), { id: seeded.id });
  ok(readB.chat === CHAT && readB.longLen === LONG.length && readB.longHead === LONG.slice(0, 13) && readB.n === 1 && readB.title === TITLE && readB.m0 === CM1 && readB.m1 === CM2, 'there the chat, the long text and the conversation read whole, as plain data', readB);
  const plainB = await pb.evaluate(() => { const v4 = localStorage.getItem('ingenium_v4') || ''; return { v4: v4.charAt(0) === '{' && v4.indexOf('"ing":"locked"') !== 0 && v4.includes('BK-MARK-CHAT'), lock: localStorage.getItem('ingenium_lock'), active: IngLock.active(), door: !!(document.querySelector('#ingLockDoor') && !document.querySelector('#ingLockDoor').hidden) }; });
  const bigB = await raw(pb, 'ingenium_big', 't'), convB = await raw(pb, 'ingenium_claude', 'conv');
  ok(plainB.v4 && plainB.lock === null && !plainB.active && !plainB.door && bigB && bigB.length >= 1 && bigB.every(r => !r.sealed) && convB && convB.length === 1 && convB.every(r => !r.sealed), 'the backup carries no lock: no sign-in, no lock record, a plain desk, plain long texts and conversations', { plainB, big: bigB && bigB.map(r => r.sealed), conv: convB && convB.map(r => r.sealed) });
  // 3. profile one again: the same backup restored over the sealed desk goes back sealed
  const ra = await p.evaluate(eval(RESTORE), made.b64); await settle(p); await p.waitForTimeout(1500);
  ok(ra.ok && !(ra.problems || []).length, 'the backup restores over the protected desk, with no problem told', ra);
  const afterA = await p.evaluate(() => { const v4 = localStorage.getItem('ingenium_v4') || ''; return { env: v4.indexOf('{"ing":"locked"') === 0, plain: v4.includes('BK-MARK-CHAT'), lock: !!localStorage.getItem('ingenium_lock'), on: IngLock.on() }; });
  const bigA = await raw(p, 'ingenium_big', 't'), convA = await raw(p, 'ingenium_claude', 'conv');
  ok(afterA.env && !afterA.plain && afterA.lock && afterA.on && bigA && bigA.length >= 1 && bigA.every(r => r.sealed && !r.json.includes('BK-MARK-LONG')) && convA && convA.length >= 1 && convA.every(r => r.sealed && !r.json.includes('BK-MARK-IMPORTED')), 'what is put back is sealed again (the desk, the long texts, the conversations), the lock record untouched', { afterA, big: bigA && bigA.map(r => r.sealed), conv: convA && convA.map(r => r.sealed) });
  // 4. the window closing in the middle of a seal: the last words are sealed at once (pure JavaScript), then a reload, the sign-in, and everything reads whole
  const fl = await p.evaluate(() => { state.chats.push({ id: 'bk700-flush', title: 'Flush', created: Date.now(), messages: [{ role: 'me', text: 'FLUSH-MARK-LAST-WORDS', at: Date.now() }] }); saveState(); window.dispatchEvent(new Event('pagehide'));
    const v = localStorage.getItem('ingenium_v4') || '', h = (() => { try { return JSON.parse(v); } catch (e) { return {}; } })(); return { env: v.indexOf('{"ing":"locked"') === 0, plain: v.includes('FLUSH-MARK'), messages: (h.n || {}).messages }; });
  ok(fl.env && !fl.plain && fl.messages === 3, 'the window closing with a seal still on its way: the newest desk is in the store at once, sealed (pagehide, no waiting)', fl);
  await p.reload(); await waitBoot(p); await p.waitForTimeout(800);
  await p.fill('#ingLockDoor #ildPw', PW1); await p.click('#ingLockDoor #ildGo');
  await p.waitForFunction(() => window.__ingLocked === false && document.querySelector('#ingLockDoor').hidden, null, { timeout: 60000 }); await p.waitForTimeout(1200);
  const readA = await p.evaluate(eval(READ), { id: seeded.id });
  ok(readA.chat === CHAT && readA.longLen === LONG.length && readA.longHead === LONG.slice(0, 13) && readA.n === 1 && readA.title === TITLE && readA.m0 === CM1 && readA.m1 === CM2 && readA.flush, 'after the sign-in the restored chat, long text and conversation read whole, and the last words sealed at the close are there', readA);
  // 5. Reset everything (Settings) takes the lock with it: the page starts again as a fresh copy, with no sign-in and no lock record
  await p.evaluate(() => { go('settings'); }); await p.waitForSelector('#resetAll', { state: 'attached', timeout: 10000 });
  await p.evaluate(() => document.getElementById('resetAll').click()); await p.waitForSelector('#rGo', { timeout: 5000 });
  await Promise.all([p.waitForNavigation({ timeout: 90000 }), p.click('#rGo')]); await waitBoot(p); await p.waitForTimeout(1500);
  const reset = await p.evaluate(() => ({ lock: localStorage.getItem('ingenium_lock'), env: (localStorage.getItem('ingenium_v4') || '').indexOf('{"ing":"locked"') === 0, active: IngLock.active(), signin: !!(document.querySelector('#ingLockDoor') && !document.querySelector('#ingLockDoor').hidden), welcome: !!document.querySelector('#introEnter'), old: (state.chats || []).some(x => x.id === 'bk700' || x.id === 'bk700-flush') }));
  ok(reset.lock === null && !reset.env && !reset.active && !reset.signin && reset.welcome && !reset.old, 'Reset everything takes the lock with it: no lock record, no sign-in, the welcome door, the earlier desk gone', reset);
  for (const [pg, er, nm] of [[p, errs, 'protected profile'], [pb, errsB, 'fresh profile']]) {
    const parts = await pg.evaluate(() => Object.keys(window.__ingParts).filter(k => window.__ingParts[k] !== 'running'));
    ok(parts.length === 0, 'every part of the page ran to its end (' + nm + ')', parts);
    ok(er.length === 0, 'no script errors on the page (' + nm + ')', er.join(' | '));
  }
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
