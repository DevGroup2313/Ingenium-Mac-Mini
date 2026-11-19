// Ingenium 7.45: a computer moved from the master edition to the full edition keeps all of its owner's work. Her words (19 November
// 2026): "I don't want my data and my past chats to be lost when I replace my master edition of Ingenium with the new Full edition on my
// HP laptop ... Please allow for my data to be transferred to this new one and then you can seal everything and keep everything after".
// The computer apps serve every edition from the same address (http://127.0.0.1:17953); the full edition keeps its own stores under a
// prefix (storage_shim.py), so it asks, once, to bring in the master's work (modules/r332.js). Here both pages are served from one
// address, as the app does. Invented people and texts only.
//   1. the master: conversations, a remembered note, a name; then the sign-in on (sealed)
//   2. the full edition at the same address asks, on the Security room's own sheet (raised, lifting), to bring that work in
//   3. Bring it in: it opens again, the sign-in asks for the same password; every conversation, the note and the name are there, sealed
//   4. work done in the full edition is kept with the rest; nothing of the master's (its rules included) is taken out of the desk
//   5. the master again: everything, from both, is there
//   6. another device: Start empty keeps the master's work untouched and out of sight, and is not asked again
//   7. a device with no master edition: nothing is asked
//   8. her work not yet sealed: after Bring it in, the Security room's Protect your work first may ask again
//   node rig/t_745_to_full.js <folder url, ending in /> <out folder>     (the folder holds ingenium.html and ingenium_full.html)
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [BASE, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; return !!c; };
const PW = 'orchard-lantern-52';
async function boot(p) { await p.waitForFunction(() => window.__ingReady === true || !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw') || !!document.querySelector('#ingLockDoor:not([hidden]) #ildUser'), null, { timeout: 300000 }); await p.waitForTimeout(1500); }
async function inside(p) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(600);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} }); await p.waitForTimeout(300); }
async function agreeTerms(p) { await p.evaluate(() => { const tick = [...document.querySelectorAll('input[type=checkbox]')].find((c) => c.offsetParent && !c.checked && c.closest('#ingTermsGate,.itg'));
  if (tick) tick.click(); const g = [...document.querySelectorAll('button')].find((b) => /^I agree$/.test(b.textContent.trim()) && b.offsetParent); if (g) g.click(); }); await p.waitForTimeout(600); }
async function setupLock(p, name, pwd) { await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 20000 });
  await p.fill('#ildUser', name); await p.fill('#ildP1', pwd); await p.fill('#ildP2', pwd); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 20000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map((d) => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 20000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 90000 });
  await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(800); }
async function signIn(p, pwd) { await p.waitForSelector('#ingLockDoor:not([hidden]) #ildPw', { timeout: 60000 }); await p.fill('#ingLockDoor #ildPw', pwd); await p.click('#ingLockDoor #ildGo');
  await p.waitForFunction(() => window.__ingReady === true && !(document.querySelector('#ingLockDoor') && !document.querySelector('#ingLockDoor').hidden), null, { timeout: 120000 }); await p.waitForTimeout(1500); }
const look = () => ({ ed: ING_EDITION, chats: (state.chats || []).map((c) => c.id), text: JSON.stringify(state.chats || []), persona: (state.persona || {}).name, ways: ((state.ways || {}).list || []).length,
  memory: JSON.stringify(state.memory || state.mem || ''), keys: Object.keys(state).sort(), lock: !!(window.IngLock && IngLock.on()), raw: (localStorage.getItem('ingenium_v4') || '').slice(0, 40) });
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 240)));
  try {
    // ---------------------------------------------------------------- 1. the master
    await p.goto(BASE + 'ingenium.html'); await boot(p); await inside(p);
    await p.evaluate(() => { for (let i = 1; i <= 12; i++) state.chats.push({ id: 'cM' + i, title: 'Seminar notes ' + i, messages: [{ role: 'me', text: 'master chat ' + i + ' on reading lists' }, { role: 'ai', text: 'reply ' + i }] });
      state.persona = Object.assign({}, state.persona || {}, { name: 'Ada' }); if (!state.memory || typeof state.memory !== 'object') state.memory = { on: true, items: [] }; if (!Array.isArray(state.memory.items)) state.memory.items = []; state.memory.items.push({ id: 'mM', text: 'prefers footnotes in Chicago style', at: Date.now() }); saveState(); });
    const m1 = await p.evaluate(look);
    ok(m1.ed === 'master' && m1.chats.filter((x) => /^cM/.test(x)).length === 12 && m1.persona === 'Ada' && /Chicago style/.test(m1.memory), '1. the master: twelve conversations, a remembered note and a name', { ed: m1.ed, n: m1.chats.length, persona: m1.persona, ways: m1.ways });
    await p.evaluate(() => IngLock.setup({})); await setupLock(p, 'Ada Lindqvist', PW);
    const m1b = await p.evaluate(look);
    ok(m1b.lock && !/master chat/.test(m1b.raw), '   then the sign-in on: the desk is kept sealed, its text unreadable in the store', { lock: m1b.lock, raw: m1b.raw });
    // ---------------------------------------------------------------- 2. the full edition asks
    await p.goto(BASE + 'ingenium_full.html'); await p.waitForSelector('#secAsk.r332 .sa-card', { timeout: 300000 }); await p.waitForTimeout(800);
    const q = await p.evaluate(() => { const w = document.querySelector('#secAsk.r332'), c = w.querySelector('.sa-card'), g = getComputedStyle(c);
      return { h: w.querySelector('h2').textContent, text: c.textContent, keys: [...w.querySelectorAll('button')].map((x) => x.textContent), shadow: g.boxShadow !== 'none', ed: ING_EDITION, fresh: window.__ingOwnStore.fresh }; });
    ok(q.ed === 'full' && q.h === 'Bring in your work from Ingenium' && /sealed with your password/.test(q.text) && q.keys.join('|') === 'Start empty|Bring it in' && q.shadow,
      '2. the full edition at the same address asks, on the Security room\'s raised sheet: Bring in your work from Ingenium (it says the work is sealed)', q);
    const t0 = await p.evaluate(() => document.querySelector('#secAsk.r332 .sa-card').getBoundingClientRect().top); await p.hover('#secAsk.r332 .sa-card'); await p.waitForTimeout(500);
    const t1 = await p.evaluate(() => document.querySelector('#secAsk.r332 .sa-card').getBoundingClientRect().top);
    ok(t0 - t1 >= 1, '   the sheet lifts under the pointer', { lift: t0 - t1 });
    await p.screenshot({ path: path.join(OUT, 'carry_sheet.png') });
    await Promise.all([p.waitForNavigation({ timeout: 120000 }).catch(() => {}), p.click('#carryYes')]);
    // ---------------------------------------------------------------- 3. it opens again on her work
    await boot(p);
    ok(await p.evaluate(() => !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw') && window.__ingOwnStore.adopted === true), '3. Bring it in: it opens again and asks for the same password');
    await signIn(p, PW); await inside(p); await agreeTerms(p); await inside(p);
    const f2 = await p.evaluate(look);
    const all12 = f2.chats.filter((x) => /^cM/.test(x)).length === 12 && /master chat 12 on reading lists/.test(f2.text);
    ok(f2.ed === 'full' && all12 && f2.persona === 'Ada' && /Chicago style/.test(f2.memory), '   every conversation, the remembered note and the name are there', { ed: f2.ed, n: f2.chats.length, persona: f2.persona, mem: f2.memory.slice(0, 80) });
    ok(f2.lock && !/master chat/.test(f2.raw), '   still sealed with the same sign-in', { lock: f2.lock, raw: f2.raw });
    const asked = await p.evaluate(() => document.querySelector('#secAsk.r332') ? 'asked' : 'not');
    ok(asked === 'not', '   and it does not ask again', asked);
    // ---------------------------------------------------------------- 4. work in the full edition
    await p.evaluate(() => { state.chats.push({ id: 'cF1', title: 'Written in Full', messages: [{ role: 'me', text: 'full edition chat on archives' }] }); saveState(); });
    await p.waitForTimeout(1500); await p.reload(); await boot(p); await signIn(p, PW); await inside(p);
    const f3 = await p.evaluate(look);
    const lost = m1b.keys.filter((k) => f3.keys.indexOf(k) < 0);
    ok(f3.chats.indexOf('cF1') >= 0 && f3.chats.filter((x) => /^cM/.test(x)).length === 12, '4. work done in the full edition is kept with the rest, after it opens again', { n: f3.chats.length });
    ok(lost.length === 0 && f3.ways === m1b.ways, '   nothing the master kept is taken out of the desk (its rules included)', { lost, ways: [m1b.ways, f3.ways] });
    // ---------------------------------------------------------------- 5. the master again
    await p.goto(BASE + 'ingenium.html'); await boot(p); await signIn(p, PW); await inside(p);
    const m4 = await p.evaluate(look);
    ok(m4.ed === 'master' && m4.chats.indexOf('cF1') >= 0 && m4.chats.filter((x) => /^cM/.test(x)).length === 12 && m4.ways === m1b.ways && m4.persona === 'Ada', '5. the master again: everything, from both editions, is there', { n: m4.chats.length, ways: m4.ways });
    // ---------------------------------------------------------------- 6. another device: Start empty
    const c2 = await b.newContext({ viewport: { width: 1360, height: 900 } }); const q2 = await c2.newPage(); q2.on('pageerror', (e) => errs.push(e.message.slice(0, 240)));
    await q2.goto(BASE + 'ingenium.html'); await boot(q2); await inside(q2);
    await q2.evaluate(() => { state.chats.push({ id: 'cB1', title: 'Kept apart', messages: [{ role: 'me', text: 'second device note 8830' }] }); saveState(); }); await q2.waitForTimeout(1200);
    await q2.goto(BASE + 'ingenium_full.html'); await q2.waitForSelector('#secAsk.r332 #carryNo', { timeout: 300000 });
    const q6 = await q2.evaluate(() => /\b\d+ conversations?\b/.test(document.querySelector('#secAsk.r332').textContent)); await q2.click('#carryNo'); await q2.waitForTimeout(600);
    await q2.reload(); await boot(q2); await q2.waitForTimeout(3000);
    const s6 = await q2.evaluate(() => ({ asked: !!document.querySelector('#secAsk.r332'), theirs: JSON.stringify(state.chats || []).indexOf('second device note 8830') >= 0, raw: (window.__ingOwnStore.rawGet('ingenium_v4') || '').indexOf('second device note 8830') >= 0, adopted: window.__ingOwnStore.adopted }));
    ok(q6 && !s6.asked && !s6.theirs && s6.raw && !s6.adopted, '6. another device: it counts the master\'s work; Start empty keeps it untouched and out of sight, and is not asked again', { q6, s6 });
    await c2.close();
    // ---------------------------------------------------------------- 7. a device with no master edition
    const c3 = await b.newContext({ viewport: { width: 1360, height: 900 } }); const q3 = await c3.newPage(); q3.on('pageerror', (e) => errs.push(e.message.slice(0, 240)));
    await q3.goto(BASE + 'ingenium_full.html'); await boot(q3); await q3.waitForTimeout(3000);
    ok(await q3.evaluate(() => !document.querySelector('#secAsk.r332') && IngCarry.wanted() === false), '7. a device with no master edition: nothing is asked');
    await c3.close();
    // ---------------------------------------------------------------- 8. her work not yet sealed
    const c4 = await b.newContext({ viewport: { width: 1360, height: 900 } }); const q4 = await c4.newPage(); q4.on('pageerror', (e) => errs.push(e.message.slice(0, 240)));
    await q4.goto(BASE + 'ingenium.html'); await boot(q4); await inside(q4);
    await q4.evaluate(() => { state.chats.push({ id: 'cU1', title: 'Open', messages: [{ role: 'me', text: 'unsealed note 2207' }] }); saveState(); localStorage.setItem('ing.security.asked.v1', 'true'); }); await q4.waitForTimeout(1200);
    await q4.goto(BASE + 'ingenium_full.html'); await q4.waitForSelector('#secAsk.r332 #carryYes', { timeout: 300000 });
    await Promise.all([q4.waitForNavigation({ timeout: 120000 }).catch(() => {}), q4.click('#carryYes')]); await boot(q4); await inside(q4); await agreeTerms(q4);
    const s8 = await q4.evaluate(() => ({ chat: JSON.stringify(state.chats || []).indexOf('unsealed note 2207') >= 0, asked: localStorage.getItem('ing.security.asked.v1'), lock: IngLock.on() }));
    ok(s8.chat && s8.asked === null && !s8.lock, '8. her work not yet sealed: it is brought in, and the Security room\'s Protect your work first may ask again', s8);
    await c4.close();
  } catch (e) { ok(false, 'the run finished', e.message); }
  ok(errs.length === 0, 'no page error', errs.slice(0, 5));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
