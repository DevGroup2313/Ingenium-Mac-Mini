// Ingenium 7.36: Settings, Security (modules/r318.js; the room listed by r173.js), as her approved preview (18 November 2026,
// https://claude.ai/artifact/H4ieskf4TqQR7DXc6YSeAQ): "I approve of the preview, please commit and push it everywhere".
//   node rig/t_736_security.js <Ingenium page url> <out folder>
// Checks, in one profile:
//   - Settings has a room Security, between Your data and Ownership; its card says how many protections are on, each with its true state:
//     on a fresh copy the sign-in is off, and the five that come later say Not yet, never On;
//   - the first start's ask (asked for here, as a test drives the page): Protect your work first, Not now and Protect it; Not now closes it
//     and it does not ask again;
//   - Offline only: on, a request from the page to a host on the internet is held back (fetch rejects, saying so) and a note offers Allow
//     for an hour and Allow once; this device's own address still answers; Allow once lets that host through;
//   - protection turned on as she would: the room says Sealed on this device On, with its ways back in;
//   - Lock when the computer sleeps: a pause in time of two minutes locks the page (the sign-in door returns);
//   - Slow down wrong passwords: after three wrong passwords, a fourth try at once is told to wait; the right password, after the wait, opens;
//   - A record of every opening: the openings, the wrong passwords and the sign-in are kept in the desk;
//   - Clear a copied secret: text copied from the sign-in card is cleared from the clipboard after the wait;
//   - every way, row and key lifts under the pointer; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; };
const NAME = 'Yannie', PW1 = 'the-abbey-of-cluny-1088';
async function protect(p) {
  await p.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); if (window.IngSettingsParts) IngSettingsParts.show('data', 'lock'); }); await p.waitForSelector('#ingLockCard', { timeout: 10000 });
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(b => /Protect this copy/.test(b.textContent)).click());
  await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 5000 }); await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW1); await p.fill('#ildP2', PW1); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 10000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map(d => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return [+m[1], +m[2]]; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 180000 });
  await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(600);
}
const ready = (p) => p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 });
const doorUp = (p) => p.evaluate(() => { const d = document.querySelector('#ingLockDoor'); return !!(d && !d.hidden && d.querySelector('#ildPw')); });
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, permissions: ['clipboard-read', 'clipboard-write'] }); const p = await ctx.newPage(); p.setDefaultTimeout(180000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await ready(p); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await p.waitForTimeout(800);
  /* 1. the room */
  const room = async () => { await p.evaluate(() => { go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('all'); }); await p.waitForTimeout(900);
    return p.evaluate(() => { const c = document.getElementById('secCard'); return { tabs: [...document.querySelectorAll('#page-settings .rm-tab')].map(x => x.textContent.trim()), shown: !!(c && c.offsetParent), big: (c.querySelector('.sc-big') || {}).textContent, items: [...c.querySelectorAll('.sc-it')].map(x => [x.querySelector('span:not(.sc-chip)').textContent, x.querySelector('.sc-chip').textContent]) }; }); };
  const r1 = await room(); const st = Object.fromEntries(r1.items);
  ok(r1.tabs.join('|').includes('Your data|Security|Ownership') && r1.shown, 'Settings has a room Security, between Your data and Ownership', r1.tabs);
  ok(st['Sealed on this device'] === 'Off' && ['Sealed on the computer\'s disk', 'Sealed between your devices', 'Your apps signed when shipped', 'Your apps\' code scrambled', 'Ingenium itself, signed and checked'].every(k => st[k] === 'Not yet') && /^\d+ of \d+ protections on$/.test(r1.big), 'its card: each protection with its true state (the sign-in off on a fresh copy; the five to come say Not yet)', { big: r1.big, st });
  await p.screenshot({ path: OUT + '/room.png' });
  /* 2. the first start's ask */
  const a1 = await p.evaluate(() => { const shown = IngSecurity.ask(); const w = document.getElementById('secAsk'); return { shown, h: w && w.querySelector('h2').textContent, keys: w ? [...w.querySelectorAll('button')].map(x => x.textContent) : [] }; });
  ok(a1.shown && a1.h === 'Protect your work first' && a1.keys.join('|') === 'Not now|Protect it', 'the first start\'s ask: Protect your work first, with Not now and Protect it', a1);
  await p.click('#secAskNo'); await p.waitForTimeout(300);
  const a2 = await p.evaluate(() => ({ gone: !document.getElementById('secAsk'), asked: localStorage.getItem('ing.security.asked.v1') }));
  ok(a2.gone && a2.asked === 'true', 'Not now closes it, and it does not ask again', a2);
  /* 3. Offline only */
  await p.evaluate(() => IngSecurity.set('offline', true));
  const o1 = await p.evaluate(async () => { let away = null, home = null; try { await fetch('https://example.org/x'); away = 'reached'; } catch (e) { away = String(e.message || e); }
    try { const r = await fetch(location.href, { method: 'HEAD' }); home = r.status; } catch (e) { home = String(e); }
    const n = document.getElementById('secNet'); return { away, home, note: n && !n.hidden ? n.innerText.replace(/\s+/g, ' ') : null }; });
  ok(/Offline only is on: Ingenium did not reach example\.org/.test(o1.away) && o1.home === 200 && /example\.org/.test(o1.note || '') && /Allow for an hour/.test(o1.note) && /Allow once/.test(o1.note), 'Offline only: a request to the internet is held back, saying so, with Allow for an hour and Allow once; this device still answers', o1);
  await p.evaluate(() => [...document.querySelectorAll('#secNet button')].find(x => x.textContent === 'Allow once').click());
  const o2 = await p.evaluate(() => IngSecurity.allowed('https://example.org/y'));
  ok(o2 === true, 'Allow once lets that host through', o2);
  await p.evaluate(() => IngSecurity.set('offline', false));
  /* 4. protection on */
  await protect(p);
  const r2 = await room(); const st2 = Object.fromEntries(r2.items);
  const ways = await p.evaluate(() => { IngSecurity.view('device'); const w = [...document.querySelectorAll('#secCard .sc-well')].find(x => /Your ways back in/.test(x.textContent)); return w ? w.innerText.replace(/\s+/g, ' ') : null; });
  ok(st2['Sealed on this device'] === 'On' && st2['Backups sealed whole'] === 'On' && /2 set/.test(ways || '') && /your password and your ten recovery words/.test(ways || ''), 'protection on: Sealed on this device On, Backups sealed On, and its ways back in', { st2: st2['Sealed on this device'], ways });
  /* 5. a pause in time locks it */
  await p.evaluate(() => IngSecurity.tick(120000));
  await p.waitForFunction(() => { const d = document.querySelector('#ingLockDoor'); return !!(d && !d.hidden && d.querySelector('#ildPw')); }, null, { timeout: 60000 }).catch(() => {});
  ok(await doorUp(p), 'Lock when the computer sleeps: a pause of two minutes locks the page (the sign-in door returns)');
  await ready(p).catch(() => {});
  /* 6. wrong passwords slow down */
  for (let i = 0; i < 3; i++) { await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 30000 }); await p.fill('#ingLockDoor #ildPw', 'not-the-password-' + i); await p.click('#ingLockDoor #ildGo'); await p.waitForTimeout(2600); }
  const f3 = await p.evaluate(() => IngSecurity.fails());
  await p.fill('#ingLockDoor #ildPw', PW1); await p.click('#ingLockDoor #ildGo'); await p.waitForTimeout(300);
  const wait = await p.evaluate(() => { const e = document.querySelector('#ingLockDoor .ild-err'); return e ? e.textContent : null; });
  ok(f3.n === 3 && /^Wait \d+ seconds? before the next try/.test(wait || '') && /Nothing is wiped/.test(wait), 'Slow down wrong passwords: after three wrong ones, a fourth try at once is told to wait (nothing is wiped)', { n: f3.n, wait });
  await p.waitForTimeout(Math.max(0, f3.until - Date.now()) + 2500);
  await p.fill('#ingLockDoor #ildPw', PW1); await p.click('#ingLockDoor #ildGo');
  await p.waitForFunction(() => window.__ingLocked === false && (!document.querySelector('#ingLockDoor') || document.querySelector('#ingLockDoor').hidden), null, { timeout: 60000 }).catch(() => {});
  await p.waitForTimeout(3500);
  const opened = await p.evaluate(() => ({ on: IngLock.on(), fails: IngSecurity.fails().n }));
  ok(opened.on && opened.fails === 0, 'after the wait, the right password opens it, and the count starts again', opened);
  /* 7. the record */
  const lg = await p.evaluate(() => IngSecurity.log().map(x => x.kind));
  ok(lg.filter(k => k === 'wrong password').length === 3 && lg.includes('signed in') && lg.some(k => /^opened/.test(k)), 'A record of every opening: the openings, the three wrong passwords and the sign-in, kept in the desk', lg);
  /* 8. a copied secret is cleared */
  const clip = await p.evaluate(async () => { IngSecurity.clip.wait = 400; const calls = []; const ow = navigator.clipboard.writeText.bind(navigator.clipboard); navigator.clipboard.writeText = t => { calls.push(t); return ow(t); };
    go('settings'); IngRooms.open('settings', 'data'); IngSettingsParts.show('data', 'lock'); await new Promise(r => setTimeout(r, 600));
    const c = document.getElementById('ingLockCard'); const r = document.createRange(); r.selectNodeContents(c.querySelector('h2,h3,b,p') || c); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    document.execCommand('copy'); await new Promise(res => setTimeout(res, 900)); return { calls, cleared: IngSecurity.clip.cleared }; });
  ok(clip.calls.includes('') && clip.cleared >= 1, 'Clear a copied secret: text copied from the sign-in card is cleared from the clipboard after the wait', clip);
  /* 9. under the pointer */
  await room(); const lifts = {};
  for (const sel of ['#secCard .sc-it', '#secCard .sc-p', '#secCard .sc-key.lav']) { const h = await p.$(sel); await h.scrollIntoViewIfNeeded(); await p.mouse.move(2, 2); await p.waitForTimeout(350);
    const a = await h.evaluate(e => getComputedStyle(e).transform); await h.hover(); await p.waitForTimeout(400); lifts[sel] = [a, await h.evaluate(e => getComputedStyle(e).transform)]; }
  ok(Object.values(lifts).every(([a, z]) => a !== z && /matrix\(1, 0, 0, 1, 0, -/.test(z)), 'every row, way and key lifts under the pointer', lifts);
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(String(e && e.stack || e).slice(0, 1500)); process.exit(2); });
