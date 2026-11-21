// See the password as it is typed (modules/r351.js): the sign-in's card with the key, by day (hidden, then shown) and by night (shown).
// An invented person and password. node previews/practice/capture_peek.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const NAME = 'Ada Example', PWD = 'tide-clock-harbour-41';
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 2 })).newPage();
  const ready = async () => { await p.waitForFunction(() => window.__ingReady === true || !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw'), null, { timeout: 600000, polling: 500 }); await p.waitForTimeout(2000); };
  const fresh = async () => { for (let i = 0; i < 480; i++) { try { if (await p.evaluate(() => !window.__pvOld)) break; } catch (e) {} await p.waitForTimeout(250); } await ready(); };
  const ring = (sel) => p.evaluate((sel) => { document.querySelectorAll('.pv-ring').forEach((x) => x.remove()); const el = document.querySelector(sel); if (!el) return; const r = el.getBoundingClientRect(), d = document.createElement('div'); d.className = 'pv-ring';
    d.style.cssText = 'position:fixed;pointer-events:none;z-index:2147483647;border:3px solid #6a3fb5;border-radius:12px;box-shadow:0 0 0 4px rgba(106,63,181,.18);left:' + (r.left - 5) + 'px;top:' + (r.top - 5) + 'px;width:' + (r.width + 10) + 'px;height:' + (r.height + 10) + 'px'; document.body.appendChild(d); }, sel);
  const shot = async (n) => { await p.mouse.move(2, 858); await p.waitForTimeout(500); await p.screenshot({ path: OUT + '/' + n + '.png' }); console.log('shot', n); };
  await p.goto(URL_, { timeout: 600000 }); await ready(); await p.evaluate(() => { localStorage.clear(); }); await p.reload(); await ready();
  await p.click('#introProtect'); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 10000 });
  await p.fill('#ildUser', NAME); await p.fill('#ildP1', PWD); await p.fill('#ildP2', PWD); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 15000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map((d) => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 60000 });
  await p.evaluate(() => { const d = document.querySelector('#ingLockDoor #ildDone'); if (d) d.click(); state.introSeen = true; state.doorStraight = true; saveState(); }); await p.waitForTimeout(800);
  for (const t of ['day', 'night']) {
    if (t === 'night') { await p.fill('#ildPw', PWD); await p.click('#ildGo'); await p.waitForFunction(() => window.__ingReady === true && !window.__ingLocked, null, { timeout: 120000 }); await p.waitForTimeout(1500);
      await p.evaluate(() => { state.theme = 'night'; applyTheme(); saveState(); }); await p.waitForTimeout(800); }
    await p.evaluate(() => { window.__pvOld = 1; IngLock.lockNow('press'); }); await fresh(); await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 60000 }); await p.waitForTimeout(600);
    await p.fill('#ildPw', PWD);
    if (t === 'day') { await ring('#ildPw + .ing-peek'); await shot('1-hidden'); }
    await p.click('#ildPw + .ing-peek'); await p.waitForTimeout(200); await ring('#ildPw + .ing-peek'); await shot(t === 'day' ? '2-shown' : '3-shown-night');
  }
  await b.close();
})().catch((e) => { console.error('FAILED', e); process.exit(1); });
