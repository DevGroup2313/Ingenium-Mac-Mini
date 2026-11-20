// Ingenium 7.54 (held for her preview) · Sign out (modules/r344.js; the lock's two hooks and its words in modules/r197.js). An invented
// person, invented documents and an invented recording. Her words (20 November 2026): "I want to be able to sign out of my profile and out
// of the app and have my data and chats and evrything else sealed until I login again into Igenium."
//   1. without a sign-in: Sign out stands after Lock Ingenium in the Status panel; pressed, it says nothing can be sealed yet and offers
//      to turn the sign-in on; Not now changes nothing
//   2. signed in: Sign out beside Lock now in Settings, Security, and in the sign-in's own card
//   3. Sign out: the page starts again at Who is using Ingenium, headed Signed out; the carried apps' documents (Tabula's, the signatures)
//      and Scriba's recording are sealed in the store, their words nowhere in clear
//   4. her own profile chosen: her sign-in; signed in, everything is opened again as it was, the recording's sound byte for byte
//   5. Lock now seals them too; a page closed while signed in leaves the documents sealed; another profile chosen from the door opens
//     node rig/t_754_sign_out.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT || '/tmp/t754', { recursive: true });
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? P++ : F++; }
const NAME = 'Ada Example', PW = 'tide-clock-harbour-41';
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 860 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  const ready = async () => { await p.waitForFunction(() => window.__ingReady === true || !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw') || !!document.querySelector('#profDoor:not([hidden])'), null, { timeout: 600000, polling: 500 }); await p.waitForTimeout(2200); };
  // Sign out seals, then the page starts again (r197 reloads it): wait for the new page, never the old one still standing
  const fresh = async () => { for (let i = 0; i < 480; i++) { try { if (await p.evaluate(() => !window.__pvOld)) break; } catch (e) {} await p.waitForTimeout(250); } await ready(); };
  const enter = () => p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const panel = () => p.evaluate(() => { try { openPresenceMenu(); } catch (e) {} const m = document.querySelector('.pres-menu'); const rows = m ? [...m.querySelectorAll('button')].map((x) => (x.id ? '#' + x.id + ' ' : '') + x.textContent.trim()) : []; return rows; });
  const raw = () => p.evaluate(async () => { const out = { ls: {}, rec: null };
    for (const k of ['tabula_docs', 'cd_signatures_v1']) out.ls[k] = localStorage.getItem(k);
    out.reg = JSON.parse(localStorage.getItem('ingenium_profiles') || 'null');
    const l = await indexedDB.databases(); if (l.some((d) => d.name === 'scriba_db')) { out.rec = await new Promise((res) => { const rq = indexedDB.open('scriba_db'); rq.onsuccess = () => { const db = rq.result; const t = db.transaction('recordings', 'readonly'); const g = t.objectStore('recordings').get('r1');
      g.onsuccess = async () => { const v = g.result; let bytes = null; if (v && v.blob) bytes = await v.blob.text(); db.close(); res({ v: v ? Object.assign({}, v, { blob: v.blob ? 'Blob' : undefined }) : null, bytes }); }; }; }); }
    return out; });
  await p.goto(URL_, { timeout: 600000 }); await ready(); await enter();
  // 1. no sign-in
  let rows = await panel();
  const iL = rows.findIndex((x) => /#r338Lock/.test(x)), iO = rows.findIndex((x) => /#r344Out/.test(x));
  ok(iL >= 0 && iO === iL + 1 && /Sign out/.test(rows[iO]), 'the Status panel: Sign out right after Lock Ingenium', rows);
  await p.evaluate(() => document.getElementById('r344Out').click()); await p.waitForTimeout(800);
  const askT = await p.evaluate(() => { const d = [...document.querySelectorAll('div,section')].reverse().find((x) => x.offsetParent && /Sign out needs your sign-in/.test(x.textContent || '')); return d ? d.textContent.replace(/\s+/g, ' ').slice(0, 400) : ''; });
  ok(/nothing can be sealed yet/.test(askT) && /Turn on my sign-in/.test(askT), 'without a sign-in it says nothing can be sealed yet, and offers to turn the sign-in on', askT);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.offsetParent && x.textContent.trim() === 'Not now'); if (k) k.click(); }); await p.waitForTimeout(800);
  ok(!(await p.evaluate(() => !!(JSON.parse(localStorage.getItem('ingenium_profiles') || '{}') || {}).out)) && await p.evaluate(() => window.__ingReady === true), 'Not now: nothing changes, nothing is signed out');
  // 2. protect, as she would
  await p.evaluate(() => { localStorage.clear(); }); await p.reload(); await ready();
  await p.click('#introProtect'); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 10000 });
  await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW); await p.fill('#ildP2', PW); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 15000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map((d) => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 60000 });
  await p.evaluate(() => { const d = document.querySelector('#ingLockDoor #ildDone'); if (d) d.click(); }); await p.waitForTimeout(800);
  // the invented documents and recording, as the carried apps keep them
  await p.evaluate(async () => { localStorage.setItem('tabula_docs', JSON.stringify([{ id: 'd1', title: 'TABMARK-1 harbour notes', body: 'the tide turns' }])); localStorage.setItem('cd_signatures_v1', 'SIGMARK-2');
    await new Promise((res) => { const rq = indexedDB.open('scriba_db', 1); rq.onupgradeneeded = () => rq.result.createObjectStore('recordings', { keyPath: 'id' }); rq.onsuccess = () => { const db = rq.result; const t = db.transaction('recordings', 'readwrite');
      t.objectStore('recordings').put({ id: 'r1', name: 'RECNAME-3 harbour', ts: 1, dur: 2, blob: new Blob(['RECBYTES-4 sound'], { type: 'audio/webm' }) }); t.oncomplete = () => { db.close(); res(); }; }; }); });
  // 2. the keys beside Lock now
  const sk = await p.evaluate(async () => { try { go('settings'); IngRooms.open('settings', 'security'); } catch (e) {} if (window.IngSecurity) IngSecurity.paint(); await new Promise((r) => setTimeout(r, 900));
    const a = [...document.querySelectorAll('#secCard [data-a="lock"]')].map((k) => !!(k.nextElementSibling && k.nextElementSibling.classList.contains('r344-out') && k.nextElementSibling.textContent === 'Sign out'));
    try { IngRooms.open('settings', 'data'); if (window.IngSettingsParts) IngSettingsParts.show('data', 'lock'); } catch (e) {} await new Promise((r) => setTimeout(r, 900));
    const lc = document.getElementById('ingLockCard'); const ln = lc && [...lc.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Lock now');
    return { security: a, card: !!(ln && ln.nextElementSibling && ln.nextElementSibling.textContent === 'Sign out') }; });
  ok(sk.security.length && sk.security.every(Boolean) && sk.card, 'Sign out beside Lock now in Settings, Security, and in the sign-in\'s own card', sk);
  // 3. sign out
  rows = await panel();
  ok(rows.some((x) => /#r344Out Sign out/.test(x)), 'signed in, the Status panel offers Sign out', rows);
  // from the first frame of the page started again, until Who is using Ingenium is up: the sign-in card must never show first
  await p.addInitScript(() => { window.__flash = null; const look = () => { if (window.__flash !== null) return; if (document.querySelector('#profDoor:not([hidden]) .r331-door')) { window.__flash = false; return; }
    const c = document.querySelector('#ingLockDoor:not([hidden]) .ild-card'); if (c && getComputedStyle(c).visibility === 'visible' && c.getBoundingClientRect().height > 0) { window.__flash = true; return; } requestAnimationFrame(look); }; requestAnimationFrame(look); });
  await p.evaluate(() => { window.__pvOld = 1; document.getElementById('r344Out').click(); }); await fresh();
  await p.waitForSelector('#profDoor:not([hidden]) .r331-door .r344-door-out', { timeout: 120000 }).catch(() => {}); await p.waitForTimeout(400);
  ok(await p.evaluate(() => window.__flash === false), 'signed out, the sign-in card never shows for a moment before Who is using Ingenium (watched frame by frame)', await p.evaluate(() => window.__flash));
  const d1 = await p.evaluate(() => { const d = document.getElementById('profDoor'), c = document.querySelector('#ingLockDoor .ild-card'), o = document.querySelector('#profDoor .r344-door-out');
    return { door: !!(d && !d.hidden), text: d ? d.textContent.replace(/\s+/g, ' ').slice(0, 300) : '', lock: !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw'), cardHidden: !!(c && getComputedStyle(c).visibility === 'hidden'), ink: o ? getComputedStyle(o).color : '' }; });
  ok(d1.cardHidden && d1.ink && !/106, 63, 181/.test(d1.ink), 'while the profiles stand over it, the sign-in card waits out of sight; the Signed out line is in ink, not violet (it is not pressed)', d1);
  ok(d1.door && /Signed out\. Everything is sealed/.test(d1.text) && /Who is using Ingenium/.test(d1.text) && d1.lock, 'signed out: the page starts at Who is using Ingenium, headed Signed out, with the sign-in waiting under it', d1);
  let r = await raw();
  ok(/^ING1\./.test(r.ls.tabula_docs || '') && /^ING1\./.test(r.ls.cd_signatures_v1 || '') && !JSON.stringify(r.ls).includes('TABMARK-1') && !JSON.stringify(r.ls).includes('SIGMARK-2'), "the carried apps' documents are sealed in the store, their words nowhere in clear", r.ls);
  ok(r.rec && r.rec.v && r.rec.v.__ing === 'sealed' && !JSON.stringify(r.rec).includes('RECNAME-3') && !JSON.stringify(r.rec).includes('RECBYTES-4'), "Scriba's recording is sealed whole, its name and its sound nowhere in clear", r.rec && r.rec.v && Object.keys(r.rec.v));
  ok(r.reg && r.reg.out, 'the profiles\' list remembers that Ingenium was signed out');
  // 4. her own profile, her sign-in
  await p.evaluate(() => { const c = document.querySelector('#profDoor button[data-door="owner"]'); if (c) c.click(); }); await p.waitForTimeout(800);
  ok(await p.evaluate(() => document.getElementById('profDoor').hidden && !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw') && getComputedStyle(document.querySelector('#ingLockDoor .ild-card')).visibility === 'visible'), 'her own profile chosen: her sign-in shows, and nothing reloaded');
  await p.fill('#ingLockDoor #ildPw', PW); await p.click('#ingLockDoor #ildGo'); await p.waitForFunction(() => window.__ingReady === true && !document.querySelector('#ingLockDoor:not([hidden]) #ildPw'), null, { timeout: 120000, polling: 500 }); await p.waitForTimeout(2000);
  r = await raw();
  ok(r.ls.tabula_docs && JSON.parse(r.ls.tabula_docs)[0].title === 'TABMARK-1 harbour notes' && r.ls.cd_signatures_v1 === 'SIGMARK-2', "signed in: the carried apps' documents are as they were", r.ls);
  ok(r.rec && r.rec.v && r.rec.v.name === 'RECNAME-3 harbour' && r.rec.bytes === 'RECBYTES-4 sound' && !r.rec.v.__ing, "Scriba's recording is as it was, its sound byte for byte", r.rec);
  ok(r.reg && !r.reg.out, 'and Ingenium is no longer signed out');
  // 5. Lock now seals them too
  await p.evaluate(() => { window.__pvOld = 1; IngLock.lockNow('press'); }); await fresh();
  r = await raw();
  ok(/^ING1\./.test(r.ls.tabula_docs || '') && r.rec && r.rec.v && r.rec.v.__ing === 'sealed' && !await p.evaluate(() => !!(document.getElementById('profDoor') && !document.getElementById('profDoor').hidden)), 'Lock now seals them too, and stays in her profile (no door of profiles)', { tab: (r.ls.tabula_docs || '').slice(0, 12) });
  await p.fill('#ingLockDoor #ildPw', PW); await p.click('#ingLockDoor #ildGo'); await p.waitForFunction(() => window.__ingReady === true && !document.querySelector('#ingLockDoor:not([hidden]) #ildPw'), null, { timeout: 120000, polling: 500 }); await p.waitForTimeout(2000);
  // a page closed while signed in
  await p.reload(); await ready();
  r = await raw();
  ok(/^ING1\./.test(r.ls.tabula_docs || '') && /^ING1\./.test(r.ls.cd_signatures_v1 || ''), 'a page closed while she was signed in leaves the documents sealed (sealed as it closed)', { tab: (r.ls.tabula_docs || '').slice(0, 12) });
  await p.fill('#ingLockDoor #ildPw', PW); await p.click('#ingLockDoor #ildGo'); await p.waitForFunction(() => window.__ingReady === true && !document.querySelector('#ingLockDoor:not([hidden]) #ildPw'), null, { timeout: 120000, polling: 500 }); await p.waitForTimeout(2000);
  r = await raw();
  ok(r.ls.tabula_docs && JSON.parse(r.ls.tabula_docs)[0].title === 'TABMARK-1 harbour notes', 'and opened again at the sign-in');
  // another profile, chosen from the door
  await p.evaluate(() => { const x = window.__ingProfiles, g = x.reg() || { v: 1, cur: 'owner', list: [] }; if (!g.list.some((q) => q.id === 'ptide')) g.list.push({ id: 'ptide', name: 'Theo', t: 2, pw: 'none', kind: 'guest' }); x.save(g); });
  // by night, as she would come to it: Night chosen, then Sign out (the page's look is sealed; only the sign-in door knows it is night)
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); saveState(); }); await p.waitForTimeout(1200);
  await p.evaluate(() => { window.__pvOld = 1; try { openPresenceMenu(); } catch (e) {} document.getElementById('r344Out').click(); }); await fresh();
  await p.waitForSelector('#profDoor:not([hidden]) .r331-door .r344-door-out', { timeout: 120000 }).catch(() => {}); await p.waitForTimeout(400);
  const n1 = await p.evaluate(() => { const l = document.getElementById('ingLockDoor'), box = document.querySelector('#profDoor .r331-door'), o = document.querySelector('#profDoor .r344-door-out');
    return { lockNight: !!(l && l.classList.contains('ild-night')), card: box ? getComputedStyle(box).backgroundColor : '', ink: o ? getComputedStyle(o).color : '' }; });
  ok(n1.lockNight && n1.card === 'rgb(32, 26, 43)' && n1.ink === 'rgb(211, 201, 227)', 'by night (Night chosen, then Sign out): Who is using Ingenium is in the night colours on the night door, never a day card', n1);
  await p.evaluate(() => { const c = document.querySelector('#profDoor button[data-door="owner"]'); if (c) c.click(); }); await p.waitForTimeout(800);
  const n2 = await p.evaluate(() => { const k = document.querySelector('#ingLockDoor .r331-else'); return k ? getComputedStyle(k).backgroundImage + ' | ' + getComputedStyle(k).color : 'no key'; });
  ok(/rgb\(42, 34, 57\)/.test(n2) && /rgb\(246, 241, 253\)/.test(n2), 'by night, her sign-in\'s "Someone else? Choose a profile" key is in the night colours too', n2);
  await p.evaluate(() => document.querySelector('#ingLockDoor .r331-else').click()); await p.waitForTimeout(600);
  const n3 = await p.evaluate(() => { const box = document.querySelector('#profDoor:not([hidden]) .r331-door'); return box ? getComputedStyle(box).backgroundColor : 'no door'; });
  ok(n3 === 'rgb(32, 26, 43)', 'and the profiles that key opens are in the night colours', n3);
  await p.evaluate(() => { const c = document.querySelector('#profDoor button[data-door="owner"]'); if (c) c.click(); }); await p.waitForTimeout(800);
  await p.fill('#ingLockDoor #ildPw', PW); await p.click('#ingLockDoor #ildGo'); await p.waitForFunction(() => window.__ingReady === true && !document.querySelector('#ingLockDoor:not([hidden]) #ildPw'), null, { timeout: 120000, polling: 500 }); await p.waitForTimeout(2000);
  ok(await p.evaluate(() => document.body.getAttribute('data-theme') === 'night' && state.theme === 'night'), 'signed in again: her desk by night, as she left it');
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); saveState(); }); await p.waitForTimeout(800);
  await p.evaluate(() => document.getElementById('r344Out') || openPresenceMenu()); await p.evaluate(() => { window.__pvOld = 1; try { openPresenceMenu(); } catch (e) {} document.getElementById('r344Out').click(); });
  await fresh(); await p.waitForSelector('#profDoor:not([hidden]) .r331-door .r344-door-out', { timeout: 120000 }).catch(() => {}); await p.waitForTimeout(400);
  const d2 =await p.evaluate(() => [...document.querySelectorAll('#profDoor button[data-door]')].map((x) => x.getAttribute('data-door')));
  ok(d2.indexOf('owner') >= 0 && d2.indexOf('ptide') >= 0, 'the door lists each profile', d2);
  await p.evaluate(() => document.querySelector('#profDoor button[data-door="ptide"]').click()); await p.waitForTimeout(1500); await ready();
  const g = await p.evaluate(() => ({ prof: window.__ingProfile, out: !!(JSON.parse(localStorage.getItem('ingenium_profiles') || '{}') || {}).out }));
  ok(g.prof && g.prof.id === 'ptide' && !g.out, 'another profile chosen from the door opens as it opens, and Ingenium is no longer signed out', g);
  ok(!errs.length, 'no error on the page', errs);
  console.log('\n' + P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})();
