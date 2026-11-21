// Ingenium 7.59 · see the password as it is typed (modules/r351.js), as Lakay does it. Her words (20 November 2026): "I also want to be
// able to see the text of my password when I am typing it on the sign-in page the same way it is done on the Lakay app, please make the
// fix." An invented person and password only.
//   1. the sign-in's set-up: each password field carries its key, the field as wide as before
//   2. pressed: the text shows, the key says Hide the password, the field keeps the focus and the caret its place; pressed again: hidden
//   3. while shown: marked secret (Clear a copied secret still applies), no spelling; under the pointer no purple shading
//   4. the sign-in itself: its key; the field a password field again when its form is sent; the sign-in opens as before
//   5. a password field added later anywhere gets its key; by night the door's key is in the night colours
//     node rig/t_759_peek.js <page url>
const pw = require('/opt/node-tools/node_modules/playwright');
const URL_ = process.argv[2];
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? P++ : F++; }
const NAME = 'Ada Example', PWD = 'tide-clock-harbour-41';
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 860 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  const ready = async () => { await p.waitForFunction(() => window.__ingReady === true || !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw'), null, { timeout: 600000, polling: 500 }); await p.waitForTimeout(2000); };
  const fresh = async () => { for (let i = 0; i < 480; i++) { try { if (await p.evaluate(() => !window.__pvOld)) break; } catch (e) {} await p.waitForTimeout(250); } await ready(); };
  await p.goto(URL_, { timeout: 600000 }); await ready(); await p.evaluate(() => { localStorage.clear(); }); await p.reload(); await ready();
  await p.click('#introProtect'); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 10000 }); await p.waitForTimeout(300);
  // 1. the set-up's fields
  const s1 = await p.evaluate(() => ['ildP1', 'ildP2'].map((id) => { const i = document.getElementById(id), w = i && i.parentNode, k = w && w.querySelector('.ing-peek'), lab = w && w.parentNode;
    return { wrap: !!(w && w.classList.contains('ing-peek-wrap')), key: !!k, label: k ? k.getAttribute('aria-label') : '', wi: i ? Math.round(i.getBoundingClientRect().width) : 0, wl: lab ? Math.round(lab.getBoundingClientRect().width) : 0, pad: i ? getComputedStyle(i).paddingRight : '' }; }));
  ok(s1.every((x) => x.wrap && x.key && x.label === 'Show the password'), 'the set-up: each password field carries its key, Show the password', s1);
  ok(s1.every((x) => Math.abs(x.wi - x.wl) <= 1 && parseFloat(x.pad) >= 40), 'each field is as wide as its row, with room kept for the key', s1);
  // 2. pressed
  await p.fill('#ildP1', PWD); await p.focus('#ildP1'); await p.evaluate(() => { const i = document.getElementById('ildP1'); i.setSelectionRange(i.value.length, i.value.length); });
  await p.click('#ildP1 + .ing-peek'); await p.waitForTimeout(150);
  const s2 = await p.evaluate(() => { const i = document.getElementById('ildP1'), k = i.parentNode.querySelector('.ing-peek'); return { type: i.type, label: k.getAttribute('aria-label'), pressed: k.getAttribute('aria-pressed'), focus: document.activeElement === i, caret: i.selectionStart === i.value.length, secret: i.getAttribute('data-secret'), spell: i.getAttribute('spellcheck') }; });
  ok(s2.type === 'text' && s2.label === 'Hide the password' && s2.pressed === 'true', 'pressed, the text shows and the key says Hide the password', s2);
  ok(s2.focus && s2.caret, 'the field keeps the focus, the caret at the end', s2);
  ok(s2.secret === '1' && s2.spell === 'false', 'while shown it is marked secret and never spell-checked', s2);
  await p.hover('#ildP1 + .ing-peek'); await p.waitForTimeout(250);
  const bg = await p.evaluate(() => getComputedStyle(document.querySelector('#ildP1 + .ing-peek')).backgroundColor);
  ok(/rgba\(0, 0, 0, 0\)|transparent/.test(bg), 'under the pointer, no purple shading', bg);
  await p.click('#ildP1 + .ing-peek');
  ok(await p.evaluate(() => document.getElementById('ildP1').type === 'password'), 'pressed again, it is hidden');
  // finish the set-up as she would
  await p.fill('#ildUser', NAME); await p.fill('#ildP1', PWD); await p.fill('#ildP2', PWD); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 15000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map((d) => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 60000 });
  await p.evaluate(() => { const d = document.querySelector('#ingLockDoor #ildDone'); if (d) d.click(); }); await p.waitForTimeout(800);
  // 4. the sign-in
  await p.evaluate(() => { window.__pvOld = 1; IngLock.lockNow('press'); }); await fresh();
  await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 60000 }); await p.waitForTimeout(400);
  ok(await p.evaluate(() => !!document.querySelector('#ildPw + .ing-peek')), 'the sign-in: its password field carries the key');
  ok(await p.evaluate(() => document.activeElement && document.activeElement.id === 'ildPw'), 'and the sign-in still opens ready to type: the password field keeps the focus it was given', await p.evaluate(() => document.activeElement && (document.activeElement.id || document.activeElement.tagName)));
  await p.fill('#ildPw', PWD); await p.click('#ildPw + .ing-peek');
  ok(await p.evaluate(() => document.getElementById('ildPw').type === 'text' && document.getElementById('ildPw').value.length > 0), 'pressed, the password typed shows');
  await p.evaluate(() => { const f = document.getElementById('ildSign'); window.__pvType = null; f.addEventListener('submit', () => { window.__pvType = document.getElementById('ildPw').type; }); });
  await p.click('#ildGo'); await p.waitForFunction(() => window.__ingReady === true && !window.__ingLocked, null, { timeout: 120000 }).catch(() => {});
  const s4 = await p.evaluate(() => ({ typeAtSend: window.__pvType, open: !window.__ingLocked }));
  ok(s4.typeAtSend === 'password', 'sent, the field is a password field again first', s4);
  ok(s4.open, 'and the sign-in opens as before');
  // 5. a field added later
  const s5 = await p.evaluate(async () => { const box = document.createElement('div'); box.innerHTML = '<label>Key <input type="password" id="pvLater"></label>'; document.body.appendChild(box); await new Promise((r) => setTimeout(r, 50));
    const i = document.getElementById('pvLater'); const k = i.parentNode.querySelector('.ing-peek'); const r = { key: !!k, label: k ? k.getAttribute('aria-label') : '' }; box.remove(); return r; });
  ok(s5.key && s5.label === 'Show the password', 'a password field added later anywhere gets its key', s5);
  // by night
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); saveState(); }); await p.waitForTimeout(800);
  await p.evaluate(() => { window.__pvOld = 1; IngLock.lockNow('press'); }); await fresh(); await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 60000 }); await p.waitForTimeout(500);
  const s6 = await p.evaluate(() => { const d = document.getElementById('ingLockDoor'), k = document.querySelector('#ildPw + .ing-peek'); return { night: d.classList.contains('ild-night'), color: k ? getComputedStyle(k).color : '', soft: getComputedStyle(d).getPropertyValue('--ild-soft').trim() }; });
  ok(s6.night && s6.color && !/106, 63, 181/.test(s6.color), 'by night the door\'s key is in the door\'s own quiet ink', s6);
  ok(!errs.length, 'no error on the page', errs.slice(0, 5));
  console.log('\n' + P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})().catch((e) => { console.error('FAILED', e); process.exit(1); });
