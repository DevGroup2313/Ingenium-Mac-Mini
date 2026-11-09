// node rig/t_638_reset.js <Ingenium page url> <out dir>
// Ingenium 6.38 (6 November 2026): Reset everything clears every store Ingenium keeps (her answer of 6 November 2026: "For the second
// question, the answer is yes"). Invented data only. Checks, in one profile:
//   - the dialog says what it clears, and what stays on a computer app
//   - before: each store holds an invented record (the long texts, the app library, Fabrica's repositories, packages and issues,
//     the conversations brought in, the signing keys, the desk's copy), an Ingenium preference, a carried app's own key, the folder
//     search's index folder in the private file system, and an Author Studio rewrite
//   - after Reset everything and the start that follows: every one of those stores is gone or empty, the preference and the
//     rewrite are gone, the index folder is gone; the carried app's own key is still there; the fresh copy opens as new
//   - no page errors before the reset; every part ran after it
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const STORES = [['ingenium_big', 't'], ['ingenium_apps', 'b'], ['ingenium_repos', 'o'], ['fabrica_made', 'meta'], ['ingenium_claude', 'conv'], ['ingenium_keys', 'k'], ['ingenium_hub', 'apps']];
async function boot(p) { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500); }
/* how many records each store holds (null when the database is not there at all) */
const census = (p) => p.evaluate((STORES) => Promise.all(STORES.map(([db, st]) => new Promise((res) => {
  const known = indexedDB.databases ? indexedDB.databases().then(l => (l || []).some(d => d && d.name === db)) : Promise.resolve(true);
  known.then((there) => { if (!there) { res([db, null]); return; } const rq = indexedDB.open(db); rq.onsuccess = () => { const d = rq.result; if (!d.objectStoreNames.contains(st)) { d.close(); res([db, 0]); return; }
    const c = d.transaction(st, 'readonly').objectStore(st).count(); c.onsuccess = () => { d.close(); res([db, c.result]); }; c.onerror = () => { d.close(); res([db, -1]); }; }; rq.onerror = () => res([db, -1]); });
}))).then(a => Object.fromEntries(a)), STORES);
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await boot(p);
  // 1. the dialog says what it clears
  await p.evaluate(() => { go('settings'); try { IngSettingsParts.show('data', 'lock'); } catch (e) {} document.getElementById('resetAll').click(); }); await p.waitForTimeout(500);
  const dlg = await p.evaluate(() => (document.querySelector('#modalBox') || {}).textContent || '');
  ok(/everything Ingenium keeps on this device/.test(dlg) && /the long texts, the app library, Fabrica's apps, packages, issues and pages, the conversations you brought in, the signing keys/.test(dlg) && /models on its disk and its earlier desks \(desk-backups\) stay/.test(dlg),
    'the dialog says what Reset everything clears, and what stays on a computer app', dlg.slice(0, 400));
  await p.evaluate(() => closeModal()); await p.waitForTimeout(200);
  // 2. invented data in every store, a preference, a carried app's key, the index folder, a rewrite
  await p.evaluate(async () => {
    const id = IngBig.newId(); await IngBig.put(id, 'An invented long text, kept to be reset.'); state.__t638 = id;
    await libPut('big_t638lib0000aa', new TextEncoder().encode('<p>An invented page</p>'), '<p>An invented page</p>');
    const r = await IngRepo.create({ name: 'An invented app to reset' }); await IngRepo.put(r.id, 'index.html', '<p>invented</p>'); const c = await IngRepo.commit(r.id, 'First');
    await fbMade.keep({ id: r.id }, String(c), 'web', 'invented.zip', 'application/zip', new TextEncoder().encode('invented package'));
    await IngClaude.importFiles([new File([JSON.stringify([{ uuid: 't638', name: 'An invented chat', created_at: '2026-10-01T10:00:00Z', updated_at: '2026-10-01T10:00:00Z', chat_messages: [{ sender: 'human', text: 'Invented question', created_at: '2026-10-01T10:00:00Z' }, { sender: 'assistant', text: 'Invented answer', created_at: '2026-10-01T10:01:00Z' }] }])], 'conversations.json', { type: 'application/json' })]);
    await IngApk.keys.device();
    /* Fabrica keeps the notes of an app that is on this device: the invented app made above */
    await fbHub.importAll({ kind: 'ingenium-hub', version: 1, apps: [{ id: r.id, issues: [{ n: 1, title: 'An invented issue', body: 'invented', state: 'open', by: 'Example Owner', at: Date.now(), comments: [], events: [], labels: [], refs: [] }], next: 2 }] });
    localStorage.setItem('ing.t638.pref', 'an invented preference'); localStorage.setItem('carpe_diem_t638', 'a carried app keeps its own');
    const root = await navigator.storage.getDirectory(); const dir = await root.getDirectoryHandle('.ingenium-rag', { create: true }); const f = await dir.getFileHandle('invented.sqlite3', { create: true }); const w = await f.createWritable(); await w.write('invented'); await w.close();
    if (window.IngAuthor) IngAuthor.words.set('Make it yours. Changes save on this device as you make them.', 'An invented line to be reset.', 'page-settings');
    saveState(); });
  await p.waitForTimeout(1500);
  const before = await census(p);
  const pre = await p.evaluate(async () => { let rag = false; try { const root = await navigator.storage.getDirectory(); await root.getDirectoryHandle('.ingenium-rag'); rag = true; } catch (e) {} return { pref: localStorage.getItem('ing.t638.pref'), carried: localStorage.getItem('carpe_diem_t638'), rag, words: window.IngAuthor ? IngAuthor.words.list().length : -1 }; });
  ok(STORES.every(([db]) => before[db] >= 1) && pre.pref && pre.carried && pre.rag && pre.words >= 1, 'before the reset each store holds an invented record, with the preference, the carried app\'s key, the index folder and a rewrite', { before, pre });
  ok(errs.length === 0, 'no page errors before the reset', errs.join(' | '));
  // 3. Reset everything
  await p.evaluate(() => { go('settings'); document.getElementById('resetAll').click(); }); await p.waitForTimeout(400);
  await Promise.all([p.waitForNavigation({ timeout: 60000 }).catch(() => {}), p.click('#rGo')]);
  await boot(p); await p.waitForTimeout(2500);
  const after = await census(p);
  const post = await p.evaluate(async () => { let rag = true; try { const root = await navigator.storage.getDirectory(); await root.getDirectoryHandle('.ingenium-rag'); } catch (e) { rag = false; }
    return { pref: localStorage.getItem('ing.t638.pref'), carried: localStorage.getItem('carpe_diem_t638'), rag, words: window.IngAuthor ? IngAuthor.words.list().length : -1, chats: (state.chats || []).filter(c => (c.messages || []).length).length, big: state.__t638 || null, lock: localStorage.getItem('ingenium_lock') }; });
  /* the apps Ingenium carries are put in the library again at the fresh copy's first start (as before 6.38): the invented page is what must be gone */
  const lib = await p.evaluate(() => new Promise((res) => { const rq = indexedDB.open('ingenium_apps'); rq.onsuccess = () => { const d = rq.result; if (!d.objectStoreNames.contains('b')) { d.close(); res([]); return; } const g = d.transaction('b', 'readonly').objectStore('b').getAllKeys(); g.onsuccess = () => { d.close(); res(g.result.map(String)); }; }; rq.onerror = () => res(null); }));
  ok(STORES.filter(([db]) => db !== 'ingenium_apps').every(([db]) => !after[db]) && Array.isArray(lib) && lib.indexOf('big_t638lib0000aa') < 0, 'after the reset every one of those stores is gone or empty (the long texts, Fabrica\'s repositories, packages and issues, the conversations brought in, the signing keys), and the invented page is gone from the app library (which holds again only the apps Ingenium carries: ' + (lib ? lib.length : '?') + ')', { after, lib });
  ok(post.pref === null && post.words <= 0 && post.big === null && post.chats === 0 && post.lock === null, 'Ingenium\'s own preferences, the Author Studio\'s rewrite and the desk are gone: the copy opens as new', post);
  ok(post.rag === false, 'the folder search\'s index folder is gone from the private file system', post);
  ok(post.carried === 'a carried app keeps its own', 'a carried app\'s own key stays (only Ingenium\'s keys go)', post);
  const parts = await p.evaluate(() => Object.keys(window.__ingParts).filter(k => window.__ingParts[k] !== 'running'));
  ok(parts.length === 0, 'every part of the page ran to its end after the reset', parts);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
