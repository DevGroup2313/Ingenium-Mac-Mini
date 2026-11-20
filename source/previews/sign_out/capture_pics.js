// Sign out (modules/r344.js, held for her preview), as pictures of the running app, one per step, the new part ringed in Ingenium's violet.
// An invented person (Ada Example) and an invented second profile (Theo). Each picture is then given its number, title and sentence by
// compose_pics.py, one file per picture, at full size (her rule: "Pictures one by one, at full size").
//   node previews/sign_out/capture_pics.js <test page url with r344> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const NAME = 'Ada Example', PW = 'tide-clock-harbour-41';
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 2 }); const p = await ctx.newPage();
  const ready = async () => { await p.waitForFunction(() => window.__ingReady === true || !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw') || !!document.querySelector('#profDoor:not([hidden])'), null, { timeout: 600000, polling: 500 }); await p.waitForTimeout(2200); };
  // Sign out seals, then the page starts again (modules/r197.js reloads it): wait for the new page before drawing a ring on it
  const fresh = async () => { for (let i = 0; i < 480; i++) { try { if (await p.evaluate(() => !window.__pvOld)) break; } catch (e) {} await p.waitForTimeout(250); } await ready(); };
  const enter = () => p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const theme = (t) => p.evaluate((t) => { try { state.theme = t; applyTheme(); } catch (e) {} }, t);
  const ring = (sel, pad) => p.evaluate(([sel, pad]) => { document.querySelectorAll('.pv-ring').forEach((x) => x.remove()); const el = typeof sel === 'string' ? document.querySelector(sel) : null; if (!el) return false;
    const r = el.getBoundingClientRect(), d = document.createElement('div'); d.className = 'pv-ring';
    d.style.cssText = 'position:fixed;pointer-events:none;z-index:2147483647;border:3px solid #6a3fb5;border-radius:14px;box-shadow:0 0 0 4px rgba(106,63,181,.18);left:' + (r.left - pad) + 'px;top:' + (r.top - pad) + 'px;width:' + (r.width + pad * 2) + 'px;height:' + (r.height + pad * 2) + 'px';
    document.body.appendChild(d); return true; }, [sel, pad || 6]).then((x) => { if (!x) console.log('no ring: nothing matches ' + sel); return x; });
  const unring = () => p.evaluate(() => document.querySelectorAll('.pv-ring').forEach((x) => x.remove()));
  const shot = async (name) => { await p.waitForTimeout(500); await p.screenshot({ path: OUT + '/' + name + '.png' }); await unring(); console.log('shot', name); };
  await p.goto(URL_, { timeout: 600000 }); await ready(); await enter();
  // 6. without a sign-in: the question
  await p.evaluate(() => { openPresenceMenu(); }); await p.waitForTimeout(600);
  await p.evaluate(() => document.getElementById('r344Out').click()); await p.waitForTimeout(900);
  await ring('.ing-ask', 10); await shot('6-no-sign-in');
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.offsetParent && x.textContent.trim() === 'Not now'); if (k) k.click(); }); await p.waitForTimeout(600);
  // protect, as she would
  await p.evaluate(() => { localStorage.clear(); }); await p.reload(); await ready();
  await p.click('#introProtect'); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 10000 });
  await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW); await p.fill('#ildP2', PW); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 15000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map((d) => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 60000 });
  await p.evaluate(() => { const d = document.querySelector('#ingLockDoor #ildDone'); if (d) d.click(); }); await p.waitForTimeout(900);
  await p.evaluate(() => { const x = window.__ingProfiles, g = x.reg() || { v: 1, cur: 'owner', list: [] }; if (!g.list.some((q) => q.id === 'ptide')) g.list.push({ id: 'ptide', name: 'Theo', t: 2, pw: 'none', kind: 'guest' }); x.save(g); });
  // 1. the Status panel, by day and by night
  for (const t of ['day', 'night']) { await theme(t); await p.waitForTimeout(500); await p.evaluate(() => { try { closePresenceMenu(); } catch (e) {} openPresenceMenu(); }); await p.waitForTimeout(700);
    await ring('#r344Out', 4); await shot(t === 'day' ? '1-panel' : '7-panel-night'); await p.evaluate(() => { try { closePresenceMenu(); } catch (e) {} }); }
  await theme('day');
  // 2. Settings, Security
  await p.evaluate(async () => { go('settings'); IngRooms.open('settings', 'security'); if (window.IngSecurity) IngSecurity.paint(); const sv = [...document.querySelectorAll('#secCard .sc-sub')].find((x) => x.getAttribute('data-v') === 'device'); if (sv) sv.click(); await new Promise((r) => setTimeout(r, 900));
    const k = document.querySelector('#secCard .r344-out'); if (k) k.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(900);
  await ring('#secCard .r344-out', 6); await shot('2-security');
  // 3. the sign-in's own card
  await p.evaluate(async () => { IngRooms.open('settings', 'data'); if (window.IngSettingsParts) IngSettingsParts.show('data', 'lock'); if (window.IngSettingsRaised) IngSettingsRaised.open(document.getElementById('ingLockCard')); await new Promise((r) => setTimeout(r, 900));
    const k = document.querySelector('#ingLockCard .r344-out'); if (k) k.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(900);
  await ring('#ingLockCard .r344-out', 6); await shot('3-sign-in-card');
  // 4. signed out: Who is using Ingenium, headed Signed out
  await p.evaluate(() => { window.__pvOld = 1; go('home'); openPresenceMenu(); document.getElementById('r344Out').click(); }); await fresh();
  await p.waitForSelector('#profDoor:not([hidden]) .r331-door .r344-door-out', { timeout: 120000 }); await p.waitForTimeout(700);
  await ring('#profDoor .r331-door', 8); await shot('4-signed-out');
  // 5. her own profile: her sign-in
  await p.evaluate(() => { const c = document.querySelector('#profDoor button[data-door="owner"]'); if (c) c.click(); }); await p.waitForTimeout(1000);
  await ring('#ingLockDoor .ild-card', 8); await shot('5-her-sign-in');
  // 8. by night, the way she would come to it: signed in, Night chosen, signed out again. The sealed desk keeps its look in plain words,
  //    so the sign-in door opens by night; forcing Night on a page already signed out would give a night card on a day door, which no one sees.
  await p.fill('#ingLockDoor #ildPw', PW); await p.click('#ingLockDoor #ildGo');
  await p.waitForFunction(() => window.__ingReady === true && !document.querySelector('#ingLockDoor:not([hidden]) #ildPw'), null, { timeout: 120000, polling: 500 }); await p.waitForTimeout(2000);
  await theme('night'); await p.evaluate(() => { try { saveState(); } catch (e) {} }); await p.waitForTimeout(1200);
  await p.evaluate(() => { window.__pvOld = 1; go('home'); openPresenceMenu(); document.getElementById('r344Out').click(); }); await fresh();
  await p.waitForSelector('#profDoor:not([hidden]) .r331-door .r344-door-out', { timeout: 120000 }); await p.waitForTimeout(700);
  await ring('#profDoor .r331-door', 8); await shot('8-signed-out-night');
  await b.close();
})();
