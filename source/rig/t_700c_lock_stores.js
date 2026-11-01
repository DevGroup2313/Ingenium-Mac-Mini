// node rig/t_700c_lock_stores.js <Ingenium page url> <out dir>
// Ingenium 6.9.x (31 October 2026): the sign-in and the seal (modules/r197.js) in the other stores of the larger store: the
// conversations brought in from elsewhere (IndexedDB "ingenium_claude", r131), the signing keys ("ingenium_keys", r136, and their copies
// on the computer apps' disk) and Fabrica's issues and pages ("ingenium_hub", r141). With a stand-in of the computer apps' bridge
// (window.pywebview.api) in place before the page runs. Checks, in one profile:
//   - before the lock: every record is plain, as it always was, and the key's copy on the stand-in disk is plain;
//   - protection turned on: every record is a sealed record ({ing:"sealed"}), with nothing of the conversation, the key or the issue
//     visible, the key's copy on the disk is sealed; and the parts still read them whole (the key's bytes are the very same ones);
//   - what is written while protection is on is sealed; a key found on the disk alone is read, opened and kept sealed;
//   - after a reload and the sign-in the parts read everything whole again (a conversation, the key, the issue);
//   - what the Backup page asks (records opened for a plain zip, records sealed on their way back) works on these stores;
//   - protection turned off writes everything back as plain records and plain disk copy, the key's bytes the same;
//   - every part of the page ran to its end, and no script errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const NAME = 'Yannie', PW1 = 'the-abbey-of-cluny-1088';
const CM1 = 'IMPORTED-MARK-ONE what is folio 12 of the abbey of Cluny?', CM2 = 'IMPORTED-MARK-TWO folio 12 is the letter of Abbot Hugh.', CM3 = 'IMPORTED-MARK-THREE a conversation brought in while protection is on', TITLE = 'The abbey letters TITLE-MARK';
const HM1 = 'HUB-MARK-ONE the register needs a second reading', HM2 = 'HUB-MARK-TWO an issue written while protection is on';
const conv = (id, title, a, b) => ({ uuid: id, name: title, created_at: '2026-10-01T10:00:00Z', updated_at: '2026-10-02T10:00:00Z', chat_messages: [{ sender: 'human', text: a, created_at: '2026-10-01T10:00:00Z' }, { sender: 'assistant', text: b, created_at: '2026-10-01T10:01:00Z' }] });
const hubApp = (id, t) => ({ id, issues: [{ n: 1, title: t, body: t + ' (body)', state: 'open', by: 'Yannie', at: Date.now(), comments: [], events: [], labels: [], refs: [] }], next: 2 });
// the stand-in bridge: a disk kept in sessionStorage so it survives the page's reloads within the test
const SHELL = `(function(){var D={};try{D=JSON.parse(sessionStorage.getItem("__t700cdisk")||"{}");}catch(e){}
  function keep(){try{sessionStorage.setItem("__t700cdisk",JSON.stringify(D));}catch(e){}}
  window.pywebview={api:{
    load_state:function(){return Promise.resolve(D.desk||null);},
    save_state:function(raw){D.desk=String(raw);keep();return Promise.resolve({ok:true});},
    big_put:function(id,text){D["big:"+id]=String(text);keep();return Promise.resolve({ok:true});},
    big_get:function(id){var t=D["big:"+id];return Promise.resolve(t==null?{ok:false}:{ok:true,text:t});},
    big_del:function(id){delete D["big:"+id];keep();return Promise.resolve({ok:true});},
    big_gc:function(){return Promise.resolve({ok:true});},
    desk_keep_text:function(){return Promise.resolve({ok:true});},
    device_info:function(){return Promise.resolve({});}}};
  window.__t700cdisk=function(){return D;};
  setTimeout(function(){try{window.dispatchEvent(new Event("pywebviewready"));}catch(e){}},0);})();`;
const waitBoot = (p) => p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
const doorUp = (p) => p.evaluate(() => { const d = document.querySelector('#ingLockDoor'); return !!(d && !d.hidden && d.querySelector('#ildPw')); });
const settle = async (p) => { for (let i = 0; i < 80; i++) { const n = await p.evaluate(() => (window.IngLock && window.IngLock._test.pending()) || 0); if (!n) break; await p.waitForTimeout(100); } await p.waitForTimeout(700); };
// every record of a store, as the store holds it: typed arrays shown by their size, so that a plain key is told from a sealed one
const raw = (p, db, store) => p.evaluate(([db, store]) => new Promise((res) => { let rq; try { rq = indexedDB.open(db); } catch (e) { res(null); return; }
  rq.onsuccess = () => { const d = rq.result; if (!d.objectStoreNames.contains(store)) { d.close(); res(null); return; } const t = d.transaction(store, 'readonly'), s = t.objectStore(store), g = s.getAll(), gk = s.getAllKeys();
    t.oncomplete = () => { d.close(); res(g.result.map((v, i) => ({ k: gk.result[i], sealed: !!(v && v.ing === 'sealed'), json: JSON.stringify(v, (k, x) => (x instanceof Uint8Array ? { u8: x.length } : x)) }))); }; t.onerror = () => { d.close(); res(null); }; };
  rq.onerror = () => res(null); }), [db, store]);
const sha = `async (u8) => [...new Uint8Array(await crypto.subtle.digest('SHA-256', u8))].map(b => b.toString(16).padStart(2, '0')).join('')`;
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
  await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(600); return words;
}
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); await ctx.addInitScript(SHELL); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await waitBoot(p); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500);
  // 1. before the lock: a conversation brought in, the device's signing key, an issue in Fabrica's pages
  const seeded = await p.evaluate(async (a) => { const sha = eval(a.sha);
    const f = new File([JSON.stringify([a.conv])], 'conversations.json', { type: 'application/json' }); const r = await IngClaude.importFiles([f]);
    const k = await IngApk.keys.device(); const h = await fbHub.importAll({ kind: 'ingenium-hub', version: 1, apps: [a.hub] });
    return { convs: r.convs, msgs: r.msgs, keyHash: await sha(k.pkcs8), keyLen: k.pkcs8.length, certLen: k.cert.length, hub: h.apps }; }, { conv: conv('t700-c1', TITLE, CM1, CM2), hub: hubApp('app_t700', HM1), sha });
  ok(seeded.convs === 1 && seeded.msgs === 2 && seeded.keyLen > 600 && seeded.hub === 1, 'before the lock: a conversation is brought in, the device\'s signing key is made, an issue is kept in Fabrica\'s pages', seeded);
  await p.waitForTimeout(800);
  const disk0 = await p.evaluate(() => window.__t700cdisk()['big:signing_device'] || null);
  const c0 = await raw(p, 'ingenium_claude', 'conv'), m0 = await raw(p, 'ingenium_claude', 'meta'), k0 = await raw(p, 'ingenium_keys', 'k'), h0 = await raw(p, 'ingenium_hub', 'apps');
  ok(c0 && c0.length === 1 && !c0[0].sealed && c0[0].json.includes('IMPORTED-MARK-ONE') && m0 && m0.some(r => r.k === 'list' && !r.sealed && r.json.includes('TITLE-MARK')) && k0 && k0.length === 1 && !k0[0].sealed && k0[0].json.includes('"u8"') && h0 && h0.length === 1 && !h0[0].sealed && h0[0].json.includes('HUB-MARK-ONE') && disk0 && disk0.indexOf('{"id"') === 0,
    'before the lock every record is plain, as it always was (the conversation, its list, the key, the issue, the key\'s copy on the stand-in disk)', { c0: c0 && c0.map(r => r.json.slice(0, 40)), k0: k0 && k0.map(r => r.json.slice(0, 60)), disk0: disk0 && disk0.slice(0, 30) });
  // 2. protection turned on
  const words = await protect(p); await settle(p);
  const rec = await p.evaluate(() => JSON.parse(localStorage.getItem('ingenium_lock')));
  ok(rec.mig && rec.mig.big === 1 && rec.mig.rec === 1, 'protection turned on: the lock record says that the long texts and the other stores are sealed', rec.mig);
  const c1 = await raw(p, 'ingenium_claude', 'conv'), m1 = await raw(p, 'ingenium_claude', 'meta'), k1 = await raw(p, 'ingenium_keys', 'k'), h1 = await raw(p, 'ingenium_hub', 'apps');
  const all1 = JSON.stringify([c1, m1, k1, h1]);
  ok(c1 && c1.every(r => r.sealed) && m1 && m1.length >= 2 && m1.every(r => r.sealed) && k1 && k1.length === 1 && k1[0].sealed && h1 && h1.length === 1 && h1[0].sealed, 'every record is a sealed record now: the conversation, its list, the key and the issue', { c1: c1 && c1.map(r => r.sealed), m1: m1 && m1.map(r => r.k + ':' + r.sealed), k1: k1 && k1.map(r => r.sealed), h1: h1 && h1.map(r => r.sealed) });
  ok(!/IMPORTED-MARK|TITLE-MARK|HUB-MARK|Abbot Hugh|"u8"/.test(all1), 'nothing of the conversation, its title, the key or the issue is to be read in the stores', all1.slice(0, 200));
  const disk1 = await p.evaluate(() => window.__t700cdisk()['big:signing_device'] || null);
  ok(disk1 && /^ING1g?\./.test(disk1) && !disk1.includes('pkcs8'), 'the key\'s copy on the stand-in disk is sealed too (it was sealed in place)', disk1 && disk1.slice(0, 30));
  const read1 = await p.evaluate(async (a) => { const sha = eval(a.sha); const l = await IngClaude.list(); const c = await IngClaude.get(l[0].id); const k = await IngApk.keys.get('device'); const ks = await IngApk.keys.list(); const inf = await IngClaude.info();
    return { title: l[0].title, n: l.length, m0: c.msgs[0].t, m1: c.msgs[1].t, keyHash: await sha(k.pkcs8), keyLen: k.pkcs8.length, certLen: k.cert.length, listed: ks.length, fp: ks[0] && ks[0].fingerprint && ks[0].fingerprint.length, infoConvs: inf && inf.convs }; }, { sha });
  ok(read1.title === TITLE && read1.m0 === CM1 && read1.m1 === CM2 && read1.keyHash === seeded.keyHash && read1.keyLen === seeded.keyLen && read1.certLen === seeded.certLen && read1.listed === 1 && read1.fp === 64 && read1.infoConvs === 1,
    'the parts read the sealed records whole: the same conversation, the very same key bytes, the list and the key\'s fingerprint', read1);
  // 3. written while protection is on: sealed
  await p.evaluate(async (a) => { const f = new File([JSON.stringify([a.conv])], 'more.json', { type: 'application/json' }); await IngClaude.importFiles([f]); await fbHub.importAll({ kind: 'ingenium-hub', version: 1, apps: [a.hub] }); }, { conv: conv('t700-c2', 'A second one', CM3, 'Noted.'), hub: hubApp('app_t700b', HM2) });
  await settle(p);
  const c2 = await raw(p, 'ingenium_claude', 'conv'), h2 = await raw(p, 'ingenium_hub', 'apps');
  ok(c2 && c2.length === 2 && c2.every(r => r.sealed) && h2 && h2.length === 2 && h2.every(r => r.sealed) && !/IMPORTED-MARK|HUB-MARK/.test(JSON.stringify([c2, h2])), 'what is written while protection is on is sealed: a second conversation and a second issue', { c2: c2 && c2.map(r => r.sealed), h2: h2 && h2.map(r => r.sealed) });
  // the key found on the disk alone: read, opened on its way in, and kept sealed in the store
  await p.evaluate(() => new Promise((res) => { const rq = indexedDB.open('ingenium_keys'); rq.onsuccess = () => { const d = rq.result, t = d.transaction('k', 'readwrite'); t.objectStore('k').delete('device'); t.oncomplete = () => { d.close(); res(); }; }; }));
  const fromDisk = await p.evaluate(async (a) => { const sha = eval(a.sha); const k = await IngApk.keys.get('device'); return { keyHash: k && await sha(k.pkcs8) }; }, { sha });
  await settle(p); const k2 = await raw(p, 'ingenium_keys', 'k');
  ok(fromDisk.keyHash === seeded.keyHash && k2 && k2.length === 1 && k2[0].sealed, 'a key found on the disk alone is read whole (opened on its way in) and kept sealed in the store', { fromDisk, k2: k2 && k2.map(r => r.sealed) });
  // 4. what the Backup page asks of these stores
  const bk = await p.evaluate(async () => { const rc = await new Promise((res) => { const rq = indexedDB.open('ingenium_claude'); rq.onsuccess = () => { const d = rq.result, t = d.transaction('conv', 'readonly'), s = t.objectStore('conv'), g = s.getAll(), gk = s.getAllKeys(); t.oncomplete = () => { d.close(); res(g.result.map((v, i) => ({ k: gk.result[i], v }))); }; }; });
    const sealedBefore = rc.every(r => r.v && r.v.ing === 'sealed'); await IngLock.openRecs('ingenium_claude', 'conv', rc); const opened = rc.every(r => r.v && Array.isArray(r.v.msgs) && r.v.msgs.length >= 1);
    const again = await IngLock.sealRecs('ingenium_claude', 'conv', rc); const resealed = again.every(r => r.v && r.v.ing === 'sealed');
    const kr = [{ k: 'device', v: await IngApk.keys.get('device') }]; const ks = await IngLock.sealRecs('ingenium_keys', 'k', kr); const kOpen = ks[0].v && ks[0].v.ing === 'sealed'; await IngLock.openRecs('ingenium_keys', 'k', ks); const kBack = ks[0].v && ks[0].v.pkcs8 instanceof Uint8Array;
    const vals = await IngLock.openValues('ingenium_keys', 'k', [await new Promise((res) => { const rq = indexedDB.open('ingenium_keys'); rq.onsuccess = () => { const d = rq.result, g = d.transaction('k', 'readonly').objectStore('k').getAll(); g.onsuccess = () => { d.close(); res(g.result[0]); }; }; })]);
    return { sealedBefore, opened, resealed, kOpen, kBack, vals: vals.length === 1 && vals[0].pkcs8 instanceof Uint8Array && vals[0].id === 'device' }; });
  ok(bk.sealedBefore && bk.opened && bk.resealed && bk.kOpen && bk.kBack && bk.vals, 'the Backup page\'s two asks work on these stores: records opened for a plain zip, records sealed on their way back, the keys\' records opened for their own lock', bk);
  // 5. reload and sign in: everything read whole again
  await p.reload(); await waitBoot(p); await p.waitForTimeout(800);
  ok(await doorUp(p), 'after a reload the sign-in is drawn');
  await p.fill('#ingLockDoor #ildPw', PW1); await p.click('#ingLockDoor #ildGo');
  await p.waitForFunction(() => window.__ingLocked === false && document.querySelector('#ingLockDoor').hidden, null, { timeout: 60000 }); await p.waitForTimeout(1200);
  const read2 = await p.evaluate(async (a) => { const sha = eval(a.sha); const l = await IngClaude.list(); const c = await IngClaude.get(l.find(x => x.title === a.title).id); const k = await IngApk.keys.get('device'); const h = await fbHub.record('app_t700'); const h2 = await fbHub.record('app_t700b'); const ex = await fbHub.exportAll();
    return { n: l.length, m0: c && c.msgs[0].t, keyHash: await sha(k.pkcs8), hub1: h.issues[0] && h.issues[0].title, hub2: h2.issues[0] && h2.issues[0].title, exported: ex.apps.length }; }, { sha, title: TITLE });
  ok(read2.n === 2 && read2.m0 === CM1 && read2.keyHash === seeded.keyHash && read2.hub1 === HM1 && read2.hub2 === HM2 && read2.exported === 2, 'after the sign-in the parts read it all whole again: the conversations, the key, both issues, and Fabrica\'s own export of its pages', read2);
  // 6. turn protection off: everything plain again
  await p.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); }); await p.waitForSelector('#ingLockCard', { timeout: 10000 });
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(b => /Turn protection off/.test(b.textContent)).click());
  await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 5000 }); await p.fill('#ingLockDoor #ildPw', PW1); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /Protection is off/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 90000 });
  await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(800);
  const c3 = await raw(p, 'ingenium_claude', 'conv'), m3 = await raw(p, 'ingenium_claude', 'meta'), k3 = await raw(p, 'ingenium_keys', 'k'), h3 = await raw(p, 'ingenium_hub', 'apps');
  const disk3 = await p.evaluate(() => window.__t700cdisk()['big:signing_device'] || null);
  ok(c3 && c3.length === 2 && c3.every(r => !r.sealed) && c3.some(r => r.json.includes('IMPORTED-MARK-ONE')) && m3 && m3.every(r => !r.sealed) && k3 && k3.length === 1 && !k3[0].sealed && k3[0].json.includes('"u8"') && h3 && h3.length === 2 && h3.every(r => !r.sealed) && h3.some(r => r.json.includes('HUB-MARK-TWO')) && disk3 && disk3.indexOf('{"id"') === 0,
    'protection turned off writes it all back as plain records, and the key\'s copy on the disk as plain text', { c3: c3 && c3.map(r => r.sealed), k3: k3 && k3.map(r => r.sealed), h3: h3 && h3.map(r => r.sealed), disk3: disk3 && disk3.slice(0, 20) });
  const read3 = await p.evaluate(async (a) => { const sha = eval(a.sha); const k = await IngApk.keys.get('device'); const l = await IngClaude.list(); const c = await IngClaude.get(l.find(x => x.title === a.title).id); return { keyHash: await sha(k.pkcs8), m0: c && c.msgs[0].t }; }, { sha, title: TITLE });
  ok(read3.keyHash === seeded.keyHash && read3.m0 === CM1, 'and the parts read them as before: the very same key bytes, the same conversation', read3);
  const parts = await p.evaluate(() => Object.keys(window.__ingParts).filter(k => window.__ingParts[k] !== 'running'));
  ok(parts.length === 0, 'every part of the page ran to its end', parts);
  ok(errs.length === 0, 'no script errors on the page', errs.join(' | '));
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
