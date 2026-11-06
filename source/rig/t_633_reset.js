// node rig/t_633_reset.js <Ingenium page url> <out dir> [<run_app.py api port>]
// Ingenium 6.33 (6 November 2026): Reset everything leaves nothing of the earlier desk behind, whatever is still on its way.
// Found by rig/t_700d_lock_backup.js, which failed once in a full sweep: a seal of the desk still on its way when Reset everything was
// pressed was written after the reset had removed the desk, and the lock record came back from the sealed desk's head, so the fresh copy
// opened to the sign-in. Here the moment is made certain: the seal is slowed by two seconds and a connection to the model store is held
// open, so the reset waits its whole five seconds.
// Checks:
//   1. a plain copy: Reset everything takes the recovery shelf with it (its three earlier moments of the desk), and the page starts fresh;
//   2. a protected copy with a seal on its way: after the reset no lock record, no sealed desk, no sign-in, the welcome door, the desk gone,
//      and the apps Ingenium carries kept again and opened whole; the same with the seal still on its way as the page goes;
//   3. (with a third argument, the desktop back-end of rig/run_app.py) the computer apps: the desk on disk is emptied too, so the page does
//      not bring the earlier desk back from it, and the computer still keeps that desk among its earlier desks, where it can be chosen.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3], API = process.argv[4] ? +process.argv[4] : 0; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const NAME = 'Corin', PW1 = 'the-lighthouse-at-pharos-280';
const waitBoot = (p) => p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
const settle = async (p) => { for (let i = 0; i < 80; i++) { const n = await p.evaluate(() => (window.IngLock && window.IngLock._test.pending()) || 0); if (!n) break; await p.waitForTimeout(100); } await p.waitForTimeout(700); };
const enter = async (p) => { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500); };
const addChat = (p, id, mark) => p.evaluate(([id, mark]) => { state.chats.push({ id, title: 'Reset check ' + mark, created: Date.now(), messages: [{ role: 'me', text: mark + ' is the first line', at: Date.now() }, { role: 'bot', text: 'kept for the check', at: Date.now() }] }); saveState(); }, [id, mark]);
async function reset(p) {
  await p.evaluate(() => { go('settings'); }); await p.waitForSelector('#resetAll', { state: 'attached', timeout: 10000 });
  await p.evaluate(() => document.getElementById('resetAll').click()); await p.waitForSelector('#rGo', { timeout: 5000 });
  const t0 = Date.now(); await Promise.all([p.waitForNavigation({ timeout: 90000 }), p.click('#rGo')]); const took = Date.now() - t0;
  await waitBoot(p); await p.waitForTimeout(1500); return took;
}
const after = (p, mark) => p.evaluate((mark) => ({ lock: localStorage.getItem('ingenium_lock'), env: (localStorage.getItem('ingenium_v4') || '').indexOf('{"ing":"locked"') === 0,
  desk: (localStorage.getItem('ingenium_v4') || '').includes(mark), active: !!(window.IngLock && IngLock.active()), signin: !!(document.querySelector('#ingLockDoor') && !document.querySelector('#ingLockDoor').hidden),
  welcome: !!document.querySelector('#introEnter'), old: (state.chats || []).some(x => JSON.stringify(x).includes(mark)),
  shelf: Object.keys(localStorage).filter(k => /^ingenium_v4\.snap\d+$/.test(k) && (localStorage.getItem(k) || '').includes(mark)), snaps: (typeof ingSnapshots === 'function') ? ingSnapshots().length : -1 }), mark);
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
  await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(600);
}
(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const errs = {};
  const open = async (nm) => { const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p = await ctx.newPage(); errs[nm] = []; p.on('pageerror', e => errs[nm].push(e.message.slice(0, 300)));
    await p.goto(URL_); await waitBoot(p); await p.waitForTimeout(1200); await enter(p); return p; };
  // 1. a plain copy and its recovery shelf
  const p1 = await open('plain');
  await addChat(p1, 'rs-plain', 'RS-MARK-PLAIN');
  const shelf0 = await p1.evaluate(() => { _snapAt = 0; ingNoteSnapshot(localStorage.getItem('ingenium_v4')); return ingSnapshots().length; });
  ok(shelf0 >= 1, 'a plain copy keeps its earlier moments on the recovery shelf (Settings, Data on this device)', shelf0);
  await reset(p1); const a1 = await after(p1, 'RS-MARK-PLAIN');
  ok(!a1.desk && !a1.old && a1.welcome && a1.lock === null, 'Reset everything on a plain copy: the desk is gone and the welcome door is shown', a1);
  ok(a1.shelf.length === 0 && a1.snaps <= 1, 'and the recovery shelf goes with it: nothing of the earlier desk is left in this browser\'s store (at most the fresh desk\'s own first moment)', a1);
  // 2. a protected copy, with a seal of the desk on its way when Reset is pressed
  const p2 = await open('protected');
  await protect(p2); await addChat(p2, 'rs-locked', 'RS-MARK-LOCKED'); await settle(p2);
  // the connection is opened from a frame of the same address, whose store is not the page's own (modules/r181.js closes the page's
  // own connections when a delete asks), so the delete waits and the reset with it
  const held = await p2.evaluate(() => new Promise((res) => { const sub = crypto.subtle, enc = sub.encrypt.bind(sub);
    sub.encrypt = (...a) => new Promise((r) => setTimeout(r, 2000)).then(() => enc(...a));
    const f = document.createElement('iframe'); f.src = 'about:blank'; f.style.display = 'none'; document.body.appendChild(f);
    const rq = f.contentWindow.indexedDB.open('ingenium_files'); rq.onsuccess = () => { window.__heldDb = rq.result; res(true); }; rq.onerror = () => res(false); }));
  ok(held, 'the seal is slowed by two seconds and the model store is held open (the reset then waits its five seconds)', held);
  await p2.evaluate(() => { const c = state.chats.find(x => x.id === 'rs-locked'); c.messages.push({ role: 'me', text: 'RS-MARK-LOCKED on its way', at: Date.now() }); saveState(); });
  const took = await reset(p2); const a2 = await after(p2, 'RS-MARK-LOCKED');
  ok(took >= 4000, 'the reset waited for the store it could not delete (about five seconds), long enough for the slowed seal to finish', took);
  ok(a2.lock === null && !a2.env && !a2.active && !a2.signin, 'after it: no lock record, no sealed desk, no sign-in', a2);
  ok(a2.welcome && !a2.old && a2.shelf.length === 0, 'the welcome door, the earlier desk gone, the recovery shelf empty', a2);
  // the apps Ingenium carries are kept again at the fresh copy's first start (modules/r120.js, nine seconds after ready), plain, over the
  // sealed pages the earlier copy left in the library
  await enter(p2); await p2.waitForTimeout(13000);
  const lib2 = await p2.evaluate(async () => { const out = []; const apps = (libState() || {}).apps || {};
    for (const k of ['cd', 'forge', 'inkwell']) { const m = apps[k]; if (m && m.ref) { let t = null; try { t = await libText(k); } catch (e) {} out.push({ k, ok: !!t && t.length > 1000 && /<html|<!doctype/i.test(t.slice(0, 3000)) }); } } return out; });
  ok(lib2.length >= 1 && lib2.every(x => x.ok), 'the fresh copy keeps the apps it carries again and opens them whole (' + lib2.map(x => x.k).join(', ') + ')', lib2);
  // 2b. the other moment: the seal is slower than the reset (eight seconds), so it is still on its way when the page goes, where the
  // lock's own close-of-window seal (pagehide, pure JavaScript) would write it
  const p2b = await open('protected, closing');
  await protect(p2b); await addChat(p2b, 'rs-locked-b', 'RS-MARK-CLOSING'); await settle(p2b);
  await p2b.evaluate(() => { const sub = crypto.subtle, enc = sub.encrypt.bind(sub); sub.encrypt = (...a) => new Promise((r) => setTimeout(r, 8000)).then(() => enc(...a));
    const c = state.chats.find(x => x.id === 'rs-locked-b'); c.messages.push({ role: 'me', text: 'RS-MARK-CLOSING on its way', at: Date.now() }); saveState(); });
  const pend = await p2b.evaluate(() => (window.IngLock && IngLock._test.pending()) || 0);
  await reset(p2b); const a2b = await after(p2b, 'RS-MARK-CLOSING');
  ok(pend >= 1 && a2b.lock === null && !a2b.env && !a2b.signin && a2b.welcome && !a2b.old, 'a seal still on its way as the page goes is not written either: no lock record, no sealed desk, the welcome door', { pend, a2b });
  // 3. the computer apps: the desk on disk
  if (API) {
    const { openApp } = require('./bridge.js');
    const app = await openApp({ apiPort: API }); const p3 = app.page; errs.app = []; p3.on('pageerror', e => errs.app.push(e.message.slice(0, 300)));
    await waitBoot(p3); await p3.waitForTimeout(2500); await enter(p3);
    await addChat(p3, 'rs-disk', 'RS-MARK-DISK'); await p3.waitForTimeout(2500);
    const disk0 = await p3.evaluate(async () => { const t = await window.pywebview.api.load_state(); return { has: String(t || '').includes('RS-MARK-DISK'), size: String(t || '').length }; });
    ok(disk0.has, 'the computer app keeps the desk on its disk as well (desk.json)', disk0);
    await reset(p3); await p3.waitForTimeout(4000); await waitBoot(p3); await p3.waitForTimeout(1500);
    const a3 = await after(p3, 'RS-MARK-DISK');
    const disk1 = await p3.evaluate(async () => { const t = String(await window.pywebview.api.load_state() || ''); const l = await window.pywebview.api.desk_list();
      return { has: t.includes('RS-MARK-DISK'), size: t.length, kept: (l || []).filter(x => (x.titles || []).some(s => /RS-MARK-DISK/.test(s))).map(x => x.kind + ':' + x.reason) }; });
    ok(!a3.old && !a3.desk && a3.welcome, 'Reset everything in the computer app: the page starts fresh and does not bring the earlier desk back from the disk', { a3, disk1 });
    ok(!disk1.has, 'the desk on disk no longer holds the earlier desk (it holds the fresh one)', disk1);
    ok(disk1.kept.length >= 1, 'the computer keeps the earlier desk among its earlier desks, where it can still be chosen', disk1);
    await app.browser.close();
  }
  for (const nm of Object.keys(errs)) ok(errs[nm].length === 0, 'no script errors on the page (' + nm + ')', errs[nm].join(' | '));
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
