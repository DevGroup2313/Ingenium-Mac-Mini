// Ingenium 7.44: local profiles (boot/profiles_boot.js, modules/r331.js), in Chromium on a built page served over http. Invented people only.
//   1. the owner's profile: the key beside the seal (version 3's), raised; its menu, Who is using Ingenium, with Ingenium's card sound
//   2. Profiles on this device in Settings, Security; adding a profile needs the owner's sign-in, turned on through the sign-in's own door
//   3. a profile that opens without a password: its own desk (none of the owner's conversations), the full edition (no Author Studio key),
//      none of the owner's built-in apps or rules, its own store names; what it writes stays its own
//   4. back to the owner: her sign-in asks for her password; her conversation is there and the other profile's is not
//   5. a profile with its own password: the person chooses it when it first opens (the sign-in's own door), and it is sealed
//   6. Lock Ingenium there: the sign-in's door offers Someone else, and the door Who is using Ingenium opens another profile
//   7. the owner removes a profile: its stores go with it; no page error
//   node rig/t_744_profiles.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; return !!c; };
const PW_OWNER = 'quince-harbour-71', PW_ELIAS = 'lantern-meadow-38';
async function boot(p) { await p.waitForFunction(() => window.__ingReady === true || !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw') || !!document.querySelector('#ingLockDoor:not([hidden]) #ildUser'), null, { timeout: 300000 }); await p.waitForTimeout(1500); }
async function inside(p) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(600);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} try { const g = document.querySelector('#ingTermsGate button, .itg-agree'); } catch (e) {} }); await p.waitForTimeout(300); }
async function agreeTerms(p) { const t = await p.evaluate(() => { const g = [...document.querySelectorAll('button')].find((b) => /^I agree$/.test(b.textContent.trim()) && b.offsetParent); if (!g) return false; const tick = [...document.querySelectorAll('input[type=checkbox]')].find((c) => c.offsetParent && !c.checked); if (tick) tick.click(); g.click(); return true; }); await p.waitForTimeout(600); return t; }
async function setupLock(p, name, pwd) { await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 20000 });
  await p.fill('#ildUser', name); await p.fill('#ildP1', pwd); await p.fill('#ildP2', pwd); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 20000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map((d) => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 20000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 90000 });
  await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(800); return words; }
async function signIn(p, pwd) { await p.waitForSelector('#ingLockDoor:not([hidden]) #ildPw', { timeout: 60000 }); await p.fill('#ingLockDoor #ildPw', pwd); await p.click('#ingLockDoor #ildGo');
  await p.waitForFunction(() => window.__ingReady === true && !(document.querySelector('#ingLockDoor') && !document.querySelector('#ingLockDoor').hidden), null, { timeout: 120000 }); await p.waitForTimeout(1500); }
// 7.48 (r338): the profile key is inside the Status panel (the top bar's status key), at its foot: Who is using Ingenium
async function openWho(p) { await p.click('#statusPill'); await p.waitForSelector('.pres-menu .r338-who', { timeout: 10000 }); }
async function chooseFromKey(p, name) { await openWho(p);
  const id = await p.evaluate((n) => { const rows = [...document.querySelectorAll('.pres-menu .r338-who[data-who]')]; const b = n === null ? rows.find((x) => x.getAttribute('data-who') === 'owner') : rows.find((x) => x.querySelector('.pres-name').textContent === n); return b ? b.getAttribute('data-who') : null; }, name);
  await Promise.all([p.waitForNavigation({ timeout: 120000 }).catch(() => {}), p.click('.pres-menu .r338-who[data-who="' + id + '"]')]); return id; }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 240)));
  try {
    // ---------------------------------------------------------------- 1. the owner's profile
    await p.goto(URL_); await boot(p); await inside(p);
    const k1 = await p.evaluate(() => { const k = document.getElementById('profKey'); return { name: (k && k.querySelector('.r331-nm') || {}).textContent, owner: window.__ingProfile && window.__ingProfile.owner, dockShows: !!(k && k.offsetParent), top: !!document.querySelector('.topbar #profKey'), ed: ING_EDITION }; });
    ok(k1.owner && !k1.dockShows && !k1.top && k1.ed === 'master' && k1.name === 'Yannie', '1. the owner\'s profile: no profile key in the left menu or the top bar (7.48: it is inside the Status panel), her name as Home greets her', k1);
    await openWho(p); await p.waitForTimeout(400);
    const m1 = await p.evaluate(() => { const m = document.querySelector('.pres-menu'), r = m.getBoundingClientRect(), heads = [...m.querySelectorAll('.pres-head')].map((x) => x.textContent.trim());
      const rows = [...m.querySelectorAll('.r338-who[data-who]')]; return { heads, inside: r.top >= 0 && r.bottom <= innerHeight + 1, rows: rows.length, inUse: rows.filter((x) => /In use/.test(x.textContent)).map((x) => x.querySelector('.pres-name').textContent), tile: !!m.querySelector('.r338-who .r331-mk.round'), keys: [...m.querySelectorAll('#r338Lock,#r338Manage')].map((x) => x.textContent.trim()) }; });
    ok(m1.heads.join('|') === 'Status|Who is using Ingenium' && m1.inside && m1.rows === 1 && m1.inUse.join() === 'Yannie' && m1.tile && m1.keys.join('|') === 'Lock Ingenium|Manage profiles', '   the Status panel ends with Who is using Ingenium: the profile In use, with its tile, Lock Ingenium and Manage profiles', m1);
    await p.evaluate(() => { const c = { id: 'cOWN', title: 'Owner marker', messages: [{ role: 'me', text: 'owner secret 4471' }] }; state.chats.push(c); saveState(); });
    // ---------------------------------------------------------------- 2. Profiles on this device
    await openWho(p); await p.waitForTimeout(400); await p.click('#r338Manage'); await p.waitForTimeout(1500);  // 7.48: Manage profiles, in the Status panel
    const c2 = await p.evaluate(() => { const c = document.getElementById('profCard'); return { shown: !!(c && c.offsetParent), rows: c ? c.querySelectorAll('.r331-prow').length : 0, needs: !!(c && /Profiles need your sign-in/.test(c.textContent)), form: !!document.getElementById('profAdd') }; });
    ok(c2.shown && c2.rows === 1 && c2.needs && !c2.form, '2. Manage profiles opens Settings, Security: Profiles on this device, and adding one asks for the owner\'s sign-in first', c2);
    await p.click('#profLockSetup'); await setupLock(p, 'Ada Lindqvist', PW_OWNER);
    await p.evaluate(() => IngProfiles.paint()); await p.waitForTimeout(400);
    ok(await p.evaluate(() => !!document.getElementById('profAdd') && IngLock.on()), '   with her sign-in on, the card offers Add a profile');
    const add = async (name, how) => { await p.fill('#profAddName', name); await p.click('#profAdd .r331-opt[data-addpw="' + how + '"]'); await p.fill('#profAddName', name); await p.click('#profAdd button[type=submit]'); await p.waitForTimeout(500); };
    await add('Test', 'none'); await add('Elias', 'own');
    const r2 = await p.evaluate(() => IngProfiles.list().map((x) => [x.name, x.pw]));
    ok(r2.length === 3 && r2[1][0] === 'Test' && r2[1][1] === 'none' && r2[2][0] === 'Elias' && r2[2][1] === 'own', '   two profiles added: Test, opening without a password, and Elias, with a password of its own', r2);
    // ---------------------------------------------------------------- 3. Test, without a password
    const testId = await chooseFromKey(p, 'Test'); await boot(p); await inside(p); await agreeTerms(p); await p.waitForTimeout(800);
    const t3 = await p.evaluate(() => ({ me: window.__ingProfile, ed: ING_EDITION, chats: JSON.stringify(state.chats || []).indexOf('owner secret 4471') >= 0, lock: localStorage.getItem('ingenium_lock'), studio: (() => { const s = document.getElementById('auTopKey'); return !!(s && s.offsetParent); })(),
      builtin: (window.IngBuiltin && IngBuiltin.meta) || null, ways: ((state.ways || {}).list || []).length, persona: (state.persona || {}).name, key: (document.querySelector('#profKey .r331-nm') || {}).textContent,
      raw: (window.__ingProfiles.rawKeys() || []).filter((k) => /^ingenium_v4/.test(k)) }));
    ok(t3.me && t3.me.owner === false && t3.me.id === testId && t3.key === 'Test', '3. Test opens with no password asked, its key named Test', t3.me);
    ok(!t3.chats && t3.lock === null, '   its desk is its own: none of the owner\'s conversations, and no sign-in of the owner\'s', { chats: t3.chats, lock: t3.lock });
    ok(t3.ed === 'full' && !t3.studio && !t3.builtin && t3.ways === 0, '   it is the full edition: no Author Studio key, none of the owner\'s built-in apps or rules', { ed: t3.ed, studio: t3.studio, builtin: !!t3.builtin, ways: t3.ways });
    ok(t3.persona === 'Test' && t3.raw.indexOf('ingenium_v4') >= 0 && t3.raw.indexOf('ingenium_v4@' + testId) >= 0, '   its name is its own, and its desk is kept under its own name in the store', t3.raw);
    await p.evaluate(() => { state.chats.push({ id: 'cTST', title: 'Test marker', messages: [{ role: 'me', text: 'test note 5512' }] }); saveState(); });
    await p.screenshot({ path: path.join(OUT, 'test_profile.png'), clip: { x: 0, y: 0, width: 1360, height: 300 } });
    // ---------------------------------------------------------------- 4. back to the owner
    await chooseFromKey(p, null); await boot(p); await signIn(p, PW_OWNER); await inside(p);
    const o4 = await p.evaluate(() => ({ owner: window.__ingProfile.owner, mine: JSON.stringify(state.chats).indexOf('owner secret 4471') >= 0, theirs: JSON.stringify(state.chats).indexOf('test note 5512') >= 0, ed: ING_EDITION }));
    ok(o4.owner && o4.mine && !o4.theirs && o4.ed === 'master', '4. back to the owner: her password asked; her conversation is there, Test\'s is not', o4);
    // ---------------------------------------------------------------- 5. Elias, a password of its own, chosen when it first opens
    const eliasId = await chooseFromKey(p, 'Elias'); await boot(p);
    await p.waitForSelector('#ingLockDoor:not([hidden]) #ildUser', { timeout: 60000 }).catch(() => {});
    const asked5 = await p.evaluate(() => ({ setup: !!document.querySelector('#ingLockDoor:not([hidden]) #ildUser'), user: (document.querySelector('#ingLockDoor #ildUser') || {}).value }));
    ok(asked5.setup, '5. Elias, opening for the first time, asks the person to choose its password (the sign-in\'s own door)', asked5);
    await setupLock(p, 'Elias', PW_ELIAS); await inside(p); await agreeTerms(p);
    const e5 = await p.evaluate(() => ({ on: IngLock.on(), rec: !!localStorage.getItem('ingenium_lock'), sealed: (IngProfiles.list().find((x) => x.name === 'Elias') || {}).sealed, mine: JSON.stringify(state.chats).indexOf('owner secret') >= 0 }));
    await p.waitForTimeout(1600);
    const e5b = await p.evaluate(() => (IngProfiles.list().find((x) => x.name === 'Elias') || {}).sealed);
    ok(e5.on && e5.rec && !e5.mine && e5b === true, '   Elias is sealed with its own password, and holds nothing of the owner\'s', Object.assign(e5, { sealedNow: e5b }));
    // ---------------------------------------------------------------- 6. Lock Ingenium, Someone else
    await openWho(p); await p.waitForTimeout(400); await Promise.all([p.waitForNavigation({ timeout: 120000 }).catch(() => {}), p.click('#r338Lock')]); await boot(p);
    await p.waitForSelector('#ingLockDoor:not([hidden]) .r331-else', { timeout: 30000 }).catch(() => {});
    const d6 = await p.evaluate(() => ({ pw: !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw'), other: !!document.querySelector('#ingLockDoor .r331-else') }));
    ok(d6.pw && d6.other, '6. Lock Ingenium: the sign-in\'s door, with Someone else? Choose a profile', d6);
    await p.click('#ingLockDoor .r331-else'); await p.waitForTimeout(600);
    const coins = await p.evaluate(() => [...document.querySelectorAll('#profDoor .r331-coin b')].map((x) => x.textContent));
    ok(coins.join('|') === 'Yannie|Test|Elias', '   Who is using Ingenium: each profile, as its owner chose it to open', coins);
    await p.screenshot({ path: path.join(OUT, 'door.png') });
    await Promise.all([p.waitForNavigation({ timeout: 120000 }).catch(() => {}), p.click('#profDoor .r331-coin[data-door="' + testId + '"]')]); await boot(p); await inside(p);
    const t6 = await p.evaluate(() => ({ id: window.__ingProfile.id, note: JSON.stringify(state.chats).indexOf('test note 5512') >= 0 }));
    ok(t6.id === testId && t6.note, '   Test opens from it, with what Test kept', t6);
    // ---------------------------------------------------------------- 7. the owner removes Elias
    await chooseFromKey(p, null); await boot(p); await signIn(p, PW_OWNER); await inside(p);
    await p.evaluate(() => { go('settings'); }); await p.waitForTimeout(600); await p.evaluate(() => IngProfiles.paint());
    const before = await p.evaluate((id) => window.__ingProfiles.rawKeys().filter((k) => k.endsWith('@' + id)).length, eliasId);
    await p.evaluate((id) => { document.querySelector('#profCard [data-rm="' + id + '"]').click(); }, eliasId); await p.waitForTimeout(300);
    await p.evaluate((id) => { document.querySelector('#profCard [data-rmyes="' + id + '"]').click(); }, eliasId); await p.waitForTimeout(2500);
    const r7 = await p.evaluate((id) => ({ names: IngProfiles.list().map((x) => x.name), left: window.__ingProfiles.rawKeys().filter((k) => k.endsWith('@' + id)).length, mine: JSON.stringify(state.chats).indexOf('owner secret 4471') >= 0 }), eliasId);
    ok(before > 0 && r7.left === 0 && r7.names.join('|') === 'Yannie|Test' && r7.mine, '7. the owner removes Elias: its stores go with it, and hers stay', Object.assign(r7, { before }));
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 800)); }
  ok(errs.length === 0, 'no page error', errs.slice(0, 6));
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
