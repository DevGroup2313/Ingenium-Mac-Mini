// Ingenium 7.59 · the practice studio (modules/r350.js, with its part in boot/profiles_boot.js): Ingenium shown while no one is signed
// in, as Lakay's practice store. Her words (20 November 2026): "I want a practice page built into Ingenium or a Guest page built into the
// app that users are able to view when they are signed out of their account and want to show the app." An invented person (Ada Example),
// invented sample work, and a stand-in computer app that records each call (never a real one).
//   1. with no sign-in, no door offers it; signed out, Who is using Ingenium offers it (a line in ink, the door's own key); the sign-in's
//      card offers it after its note (a violet word, underlined)
//   2. entered: its own stores, the sample work, the full edition, none of her conversation anywhere, her desk still sealed, no sign-in
//   3. the welcome door with its mark in place of the little lock; Home's strip, the top bar's key, the Status panel's two rows
//   4. what the device shares is never changed from it: the shared names, the shared databases (written or deleted), and the computer
//      app's device calls (refused before they reach it)
//   5. Start again: the sample work as new, what was tried taken away; Leave: back to the door it was opened from, nothing of it left,
//      the computer app's practice files dropped; her sign-in opens her desk as it was
//   6. a window closed while it was open: the next start opens at that door, and nothing of it is left; by night, it opens by night
//     node rig/t_759_practice.js <page url>
const pw = require('/opt/node-tools/node_modules/playwright');
const URL_ = process.argv[2];
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? P++ : F++; }
const NAME = 'Ada Example', PW = 'tide-clock-harbour-41';
// the stand-in computer app: the profile calls, two calls that would change the device, and one that only reads
const STUB = () => { let cur = '';
  const rec = (n, a) => { try { if (window.appRec) window.appRec([n].concat([].slice.call(a || []))); } catch (e) {} };
  window.pywebview = { api: {
    profile_current() { rec('profile_current'); return Promise.resolve({ id: cur }); },
    profile_use(id) { rec('profile_use', [id]); cur = id || ''; return Promise.resolve({ ok: true }); },
    profile_drop(id) { rec('profile_drop', [id]); return Promise.resolve({ ok: true }); },
    delete_model_file(n) { rec('delete_model_file', [n]); return Promise.resolve({ ok: true }); },
    disk_add(x) { rec('disk_add', [x]); return Promise.resolve({ ok: true }); },
    engine_status() { rec('engine_status'); return Promise.resolve({ ok: true, running: false }); } } }; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 860 } });
  const CALLS = []; await ctx.exposeBinding('appRec', (_s, x) => { CALLS.push(x); }); await ctx.addInitScript(STUB);
  let p = await ctx.newPage(); const errs = []; const watch = (pg) => pg.on('pageerror', (e) => errs.push(String(e).slice(0, 200))); watch(p);
  const ready = async (pg) => { pg = pg || p; await pg.waitForFunction(() => window.__ingReady === true || !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw') || !!document.querySelector('#profDoor:not([hidden])'), null, { timeout: 600000, polling: 500 }); await pg.waitForTimeout(2200); };
  const fresh = async () => { for (let i = 0; i < 480; i++) { try { if (await p.evaluate(() => !window.__pvOld)) break; } catch (e) {} await p.waitForTimeout(250); } await ready(); };
  const enter = () => p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const terms = async () => { await p.waitForSelector('.tg-veil', { timeout: 30000 }).catch(() => {}); await p.evaluate(() => { const t = document.getElementById('tgTick'); if (t && !t.checked) t.click(); }); await p.waitForTimeout(200); await p.evaluate(() => { const a = document.getElementById('tgAgree'); if (a) a.click(); }); await p.waitForTimeout(900); };
  // the question's own key: the last of that name on the page (the question is drawn after the strip, whose key may share its words)
  const yes = (word) => p.evaluate((w) => { window.__pvOld = 1; const k = [...document.querySelectorAll('button')].reverse().find((x) => x.offsetParent && x.textContent.trim() === w); if (k) k.click(); return !!k; }, word);
  const raw = (pg) => (pg || p).evaluate(async () => { const keys = window.__ingProfiles.rawKeys();
    const files = await new Promise((res) => { const rq = indexedDB.open('ingenium_files'); rq.onsuccess = () => { try { const g = rq.result.transaction('files', 'readonly').objectStore('files').get('pvmark'); g.onsuccess = () => { res(g.result || null); rq.result.close(); }; } catch (e) { res('error ' + e.message); } }; rq.onerror = () => res('open failed'); });
    return { reg: JSON.parse(localStorage.getItem('ingenium_profiles') || 'null'), sec: localStorage.getItem('ing.security.v1'), models: localStorage.getItem('ingenium_models_shared'), files,
      practiceKeys: keys.filter((k) => /@practice$/.test(k)), dbs: (await indexedDB.databases()).map((d) => d.name).filter((n) => /@practice$/.test(n)) }; });
  await p.goto(URL_, { timeout: 600000 }); await ready(); await p.evaluate(() => { localStorage.clear(); }); await p.reload(); await ready(); await enter();
  // 1. with no sign-in: nothing offers it
  ok(await p.evaluate(() => !!window.IngPractice && !document.getElementById('ildPractice') && !document.getElementById('r350Open') && !document.getElementById('r350Pill') && !window.__ingPractice), 'with no sign-in, no door offers the practice studio and the page is not it');
  // the device's shared things, as the owner left them
  await p.evaluate(async () => { localStorage.setItem('ing.security.v1', JSON.stringify({ offline: false, sleep: true, slow: true, clip: true, log: true, export: false })); localStorage.setItem('ingenium_models_shared', '[{"id":"pvm","name":"PVMODEL shared"}]');
    await new Promise((res) => { const rq = indexedDB.open('ingenium_files'); rq.onsuccess = () => { const db = rq.result; if (!db.objectStoreNames.contains('files')) { db.close(); res(); return; } const t = db.transaction('files', 'readwrite'); t.objectStore('files').put('PVFILEBYTES', 'pvmark'); t.oncomplete = () => { db.close(); res(); }; }; }); });
  // her sign-in, as she would turn it on, and a conversation of hers
  await p.evaluate(() => { localStorage.removeItem('ingenium_intro_seen'); }); await p.reload(); await ready();
  await p.click('#introProtect'); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 10000 });
  await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW); await p.fill('#ildP2', PW); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 15000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map((d) => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 60000 });
  await p.evaluate(() => { const d = document.querySelector('#ingLockDoor #ildDone'); if (d) d.click(); }); await p.waitForTimeout(800);
  await p.evaluate(() => { state.chats = state.chats || []; state.chats.push({ id: 'cmine', title: 'OWNERMARK conversation', messages: [{ role: 'me', text: 'OWNERMARK words of hers' }] }); state.introSeen = true; state.doorStraight = true; saveState(); });
  await p.waitForTimeout(1500);
  // 1. signed out: the profiles door offers it
  await p.evaluate(() => { window.__pvOld = 1; IngSignOut.go(); }); await fresh();
  await p.waitForSelector('#profDoor:not([hidden]) .r350-door #r350Open', { timeout: 120000 }).catch(() => {}); await p.waitForTimeout(600);
  const d1 = await p.evaluate(() => { const w = document.querySelector('#profDoor .r350-door'), l = w && w.querySelector('p'), k = document.getElementById('r350Open');
    return { has: !!(w && k), line: l ? l.textContent : '', ink: l ? getComputedStyle(l).color : '', key: k ? k.className : '', text: k ? k.textContent.trim() : '', out: !!document.querySelector('#profDoor .r344-door-out') }; });
  ok(d1.has && d1.out && /Showing Ingenium to someone\?/.test(d1.line) && !/106, 63, 181/.test(d1.ink) && /\br331-k\b/.test(d1.key) && d1.text === 'Open the practice studio', 'signed out, Who is using Ingenium offers it: a line in ink and the door\'s own key', d1);
  // the sign-in's card, her own profile chosen
  await p.evaluate(() => { const c = document.querySelector('#profDoor [data-door="owner"]'); if (c) c.click(); }); await p.waitForTimeout(1500);
  const d2 = await p.evaluate(() => { const k = document.getElementById('ildPractice'), cs = k && getComputedStyle(k); return { inNote: !!(k && k.closest('.ild-note') && !k.closest('form')), deco: cs ? cs.textDecorationLine : '', color: cs ? cs.color : '', text: k ? k.textContent : '' }; });
  ok(d2.inNote && /underline/.test(d2.deco) && d2.text === 'Open the practice studio', 'the sign-in\'s card offers it after its note: a violet word, underlined', d2);
  // 2. entered (what the device shares noted first, as the door leaves it)
  const before = await raw();
  CALLS.length = 0;
  await p.evaluate(() => { window.__pvOld = 1; document.getElementById('ildPractice').click(); }); await fresh();
  const s2 = await p.evaluate(() => { return { practice: window.__ingPractice === true, id: (window.__ingProfile || {}).id, ed: typeof ING_EDITION !== 'undefined' ? ING_EDITION : '', chats: (state.chats || []).map((c) => c.title),
      lock: !!(window.IngLock && IngLock.active()), body: document.body.innerText.includes('OWNERMARK'), stateHas: JSON.stringify(state).includes('OWNERMARK'),
      reg: JSON.parse(localStorage.getItem('ingenium_profiles') || 'null'), deskRaw: (localStorage.getItem('ingenium_v4') || '').slice(0, 20) }; });
  ok(s2.practice && s2.id === 'practice' && s2.reg && s2.reg.cur === 'practice' && s2.reg.back === 'owner', 'entered: the page starts again as the practice studio, the door it came from kept', s2.reg);
  ok(s2.chats.length === 3 && s2.chats.indexOf('Tides, explained simply') >= 0 && !s2.lock, 'its own stores hold the sample work (three conversations), with no sign-in of its own', s2.chats);
  ok(!s2.body && !s2.stateHas, 'none of her conversation anywhere in it');
  ok(s2.ed === 'full' || s2.ed === 'gift' || s2.ed === 'demo', 'it runs as the full edition on her master copy (as another person\'s profile does)', s2.ed);
  ok(CALLS.some((c) => c[0] === 'profile_drop' && c[1] === 'practice'), 'the computer app: what an earlier visit left there is dropped first', CALLS.filter((c) => /^profile_/.test(c[0])));
  // 3. the welcome door, Home, the top bar, the Status panel
  await terms();
  const w3 = await p.evaluate(() => { const d = document.getElementById('introDoor'), c = d && d.querySelector('.r350-corner .r350-chip'), l = d && d.querySelector('.intro-corner-l:not(.r350-corner)');
    return { door: !!(d && !d.hidden), chip: c ? c.textContent : '', lockHidden: !l || getComputedStyle(l).display === 'none' }; });
  ok(w3.door && w3.chip === 'Practice studio' && w3.lockHidden, 'it opens on the welcome door, with its mark in place of the little lock', w3);
  await p.evaluate(() => { const k = document.getElementById('introEnter'); if (k) k.click(); }); await p.waitForTimeout(1500);
  await p.evaluate(() => { try { go('home'); } catch (e) {} }); await p.waitForTimeout(1500);
  const h3 = await p.evaluate(() => { try { openPresenceMenu(); } catch (e) {} const m = document.querySelector('.pres-menu'); const rows = m ? [...m.querySelectorAll('button')].map((x) => (x.id ? '#' + x.id + ' ' : '') + x.textContent.trim()) : [];
    const pill = document.getElementById('r350Pill'), st = document.querySelector('#page-home .r350-strip'); try { closePresenceMenu(); } catch (e) {}
    return { strip: st ? st.querySelector('h3').textContent : '', keys: st ? [...st.querySelectorAll('button')].map((x) => x.textContent) : [], pill: !!(pill && pill.offsetParent && pill.nextElementSibling && pill.nextElementSibling.id === 'statusPill'), rows }; });
  ok(h3.strip === 'Welcome to the practice studio' && h3.keys.join('|') === 'Start again|Leave the practice studio' && h3.pill, 'Home\'s strip with Start again and Leave, and the top bar\'s key beside the status', h3);
  ok(h3.rows.some((x) => /^#r350RowAgain/.test(x)) && h3.rows.some((x) => /^#r350RowLeave/.test(x)) && !h3.rows.some((x) => /#r338Lock|#r344Out|#r338Manage/.test(x)), 'the Status panel: Start again and Leave in place of the profiles, Lock and Sign out', h3.rows);
  const f3 = await p.evaluate(async () => { const f = (IngFolders.folders() || []).filter((x) => x.name === 'Tide Clock')[0]; if (!f) return null; const out = []; for (const x of f.files || []) out.push({ name: x.name, text: (await ccLoad(x) || '').slice(0, 40) });
    return { files: out, chat: (state.chats || []).filter((c) => c.projectId === f.id).map((c) => c.title) }; });
  ok(f3 && f3.files.length === 2 && f3.files.every((x) => x.text.length > 10) && f3.chat.join() === 'Tides, explained simply', 'a sample app\'s folder on Ingenia, with its two files and its conversation', f3);
  ok(await p.evaluate(() => { try { return IngLock.setup() === false; } catch (e) { return false; } }), 'no sign-in is offered inside it (nothing in it is kept)');
  // 4. what the device shares
  const t4 = await p.evaluate(async () => { localStorage.setItem('ing.security.v1', JSON.stringify({ slow: false })); localStorage.removeItem('ingenium_models_shared'); localStorage.setItem('ingenium_profiles', '{"cur":"x"}');
    const put = await new Promise((res) => { const rq = indexedDB.open('ingenium_files'); rq.onsuccess = () => { const db = rq.result; try { const t = db.transaction('files', 'readwrite'); t.objectStore('files').put('VISITOR', 'pvmark'); t.oncomplete = () => { db.close(); res('written'); }; t.onerror = () => { db.close(); res('refused'); }; } catch (e) { db.close(); res('refused: ' + e.name); } }; });
    const del = await new Promise((res) => { const r = indexedDB.deleteDatabase('ingenium_files'); r.onsuccess = () => res('ok'); r.onerror = () => res('error'); r.onblocked = () => res('blocked'); });
    let dm = '', dk = '', es = '';
    try { await pywebview.api.delete_model_file('a model'); dm = 'reached'; } catch (e) { dm = String(e.message || e); }
    try { await pywebview.api.disk_add('/somewhere'); dk = 'reached'; } catch (e) { dk = String(e.message || e); }
    try { es = JSON.stringify(await pywebview.api.engine_status()); } catch (e) { es = 'refused ' + e.message; }
    return { put, del, dm, dk, es }; });
  ok(/^refused/.test(t4.put), 'a write into the device\'s shared database is refused from it', t4.put);
  const iu = CALLS.findIndex((c) => c[0] === 'profile_use' && c[1] === 'practice'), ie = CALLS.findIndex((c) => c[0] === 'engine_status');
  ok(iu >= 0 && ie > iu, 'the computer app is told to hold the practice studio\'s own files before its first call reaches it', CALLS.map((c) => c.join(':')));
  ok(/cannot do this on this computer/.test(t4.dm) && /cannot do this on this computer/.test(t4.dk) && !CALLS.some((c) => c[0] === 'delete_model_file' || c[0] === 'disk_add') && /"ok":true/.test(t4.es), 'the computer app: a model\'s removal and a drive refused before they reach it; a reading call passes', { t4, calls: CALLS.map((c) => c[0]) });
  // 5. Start again
  await p.evaluate(() => { state.chats.push({ id: 'cvis', title: 'VISITORMARK conversation', messages: [{ role: 'me', text: 'VISITORMARK' }] }); saveState(); }); await p.waitForTimeout(600);
  await p.evaluate(() => { document.getElementById('r350Again').click(); }); await p.waitForTimeout(700); await yes('Start again'); await fresh();
  const s5 = await p.evaluate(() => ({ practice: window.__ingPractice === true, chats: (state.chats || []).map((c) => c.title) }));
  ok(s5.practice && s5.chats.length === 3 && !s5.chats.some((t) => /VISITORMARK/.test(t)), 'Start again: the sample work as new, what was tried taken away', s5);
  await terms(); await p.evaluate(() => { const k = document.getElementById('introEnter'); if (k) k.click(); }); await p.waitForTimeout(1200);
  // Leave
  CALLS.length = 0;
  await p.evaluate(() => { try { go('home'); } catch (e) {} document.getElementById('r350Leave').click(); }); await p.waitForTimeout(700); await yes('Leave'); await fresh(); await p.waitForTimeout(3000);
  const a5 = await raw();
  const d5 = await p.evaluate(() => ({ practice: !!window.__ingPractice, lock: !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw') }));
  ok(!d5.practice && d5.lock && a5.reg && a5.reg.cur === 'owner' && !a5.reg.back, 'Leave: back to the door it was opened from (her sign-in)', { d5, reg: a5.reg });
  ok(!a5.practiceKeys.length && !a5.dbs.length, 'nothing of it is left in the stores', a5);
  ok(CALLS.some((c) => c[0] === 'profile_drop' && c[1] === 'practice'), 'the computer app\'s practice files are dropped', CALLS.filter((c) => /^profile_/.test(c[0])));
  ok(a5.sec === before.sec && a5.models === before.models && a5.files === 'PVFILEBYTES', 'what the device shares is as it was: its protection, its models\' record, its models\' files', { before: [before.sec, before.models, before.files], after: [a5.sec, a5.models, a5.files] });
  await p.fill('#ildPw', PW); await p.click('#ildGo'); await p.waitForFunction(() => window.__ingReady === true && !window.__ingLocked, null, { timeout: 120000 }).catch(() => {}); await p.waitForTimeout(2500);
  ok(await p.evaluate(() => (state.chats || []).some((c) => /OWNERMARK/.test(c.title))), 'her sign-in opens her desk as it was');
  // 6. a window closed while it was open, by night
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); saveState(); }); await p.waitForTimeout(1200);
  await p.evaluate(() => { window.__pvOld = 1; IngSignOut.go(); }); await fresh();
  await p.waitForSelector('#profDoor:not([hidden]) #r350Open', { timeout: 120000 }).catch(() => {}); await p.waitForTimeout(800);
  ok(await p.evaluate(() => document.getElementById('profDoor').classList.contains('r344-night')), 'by night the door with its key is in the night colours');
  await p.evaluate(() => { window.__pvOld = 1; document.getElementById('r350Open').click(); }); await fresh();
  ok(await p.evaluate(() => window.__ingPractice === true && document.body.getAttribute('data-theme') === 'night'), 'opened from a door by night, it opens by night');
  await p.close();
  const p2 = await ctx.newPage(); watch(p2); await p2.goto(URL_, { timeout: 600000 }); await ready(p2); await p2.waitForTimeout(2500);
  const a6 = await raw(p2); const d6 = await p2.evaluate(() => ({ practice: !!window.__ingPractice, door: !!document.querySelector('#profDoor:not([hidden]) .r344-door-out') }));
  ok(!d6.practice && d6.door && a6.reg && a6.reg.cur === 'owner' && a6.reg.out, 'a window closed while it was open: the next start opens at that door (Signed out)', { d6, reg: a6.reg });
  ok(!a6.practiceKeys.length && !a6.dbs.length, 'and nothing of it is left', a6);
  ok(!errs.length, 'no error on the page', errs.slice(0, 5));
  console.log('\n' + P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})().catch((e) => { console.error('FAILED', e); process.exit(1); });
