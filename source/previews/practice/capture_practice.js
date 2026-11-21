// The practice studio (modules/r350.js, held for her preview), as pictures of the running app, one per step, the new part ringed in
// Ingenium's violet. An invented person (Ada Example) and invented sample work only. Run once by day and once by night:
//     node previews/practice/capture_practice.js <page url> <out folder> day|night
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT, THEME] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const NAME = 'Ada Example', PW = 'tide-clock-harbour-41', N = THEME === 'night';
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 2 }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 300)));
  const ready = async () => { await p.waitForFunction(() => window.__ingReady === true || !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw') || !!document.querySelector('#profDoor:not([hidden])'), null, { timeout: 600000, polling: 500 }); await p.waitForTimeout(2200); };
  const fresh = async () => { for (let i = 0; i < 480; i++) { try { if (await p.evaluate(() => !window.__pvOld)) break; } catch (e) {} await p.waitForTimeout(250); } await ready(); };
  const ring = (sels, pad) => p.evaluate(([sels, pad]) => { document.querySelectorAll('.pv-ring').forEach((x) => x.remove()); let n = 0;
    for (const sel of sels) { const el = document.querySelector(sel); if (!el) continue; const r = el.getBoundingClientRect(), d = document.createElement('div'); d.className = 'pv-ring';
      d.style.cssText = 'position:fixed;pointer-events:none;z-index:2147483647;border:3px solid #6a3fb5;border-radius:14px;box-shadow:0 0 0 4px rgba(106,63,181,.18);left:' + (r.left - pad) + 'px;top:' + (r.top - pad) + 'px;width:' + (r.width + pad * 2) + 'px;height:' + (r.height + pad * 2) + 'px';
      document.body.appendChild(d); n++; } return n; }, [sels, pad || 6]).then((n) => { if (n < sels.length) console.log('ring: only', n, 'of', sels.join(', ')); });
  const shot = async (name) => { await p.mouse.move(2, 858); await p.waitForTimeout(700); await p.screenshot({ path: OUT + '/' + name + '.png' }); await p.evaluate(() => document.querySelectorAll('.pv-ring').forEach((x) => x.remove())); console.log('shot', name); };
  await p.goto(URL_, { timeout: 600000 }); await ready(); await p.evaluate(() => { localStorage.clear(); }); await p.reload(); await ready();
  // her sign-in turned on, as she would
  await p.click('#introProtect'); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 10000 });
  await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW); await p.fill('#ildP2', PW); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 15000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map((d) => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 60000 });
  await p.evaluate(() => { const d = document.querySelector('#ingLockDoor #ildDone'); if (d) d.click(); }); await p.waitForTimeout(800);
  await p.evaluate((n) => { state.persona = state.persona || {}; state.persona.name = 'Ada Example'; state.introSeen = true; state.doorStraight = true; if (n) { state.theme = 'night'; applyTheme(); } saveState(); }, N);
  await p.waitForTimeout(1500);
  // signed out, the real way
  await p.evaluate(() => { window.__pvOld = 1; IngSignOut.go(); }); await fresh();
  await p.waitForSelector('#profDoor:not([hidden]) .r331-door .r350-door', { timeout: 120000 }); await p.waitForTimeout(1200);
  await ring(['#profDoor .r350-door'], 8); await shot(N ? '10-door-night' : '1-door');
  if (!N) { await p.evaluate(() => { const c = document.querySelector('#profDoor [data-door="owner"]'); if (c) c.click(); }); await p.waitForTimeout(1500);
    await ring(['#ingLockDoor #ildPractice'], 6); await shot('2-sign-in'); }
  // into the practice studio
  await p.evaluate((n) => { window.__pvOld = 1; const k = n ? document.getElementById('r350Open') : document.getElementById('ildPractice'); k.click(); }, N); await fresh();
  await p.waitForSelector('.tg-veil', { timeout: 60000 }).catch(() => {}); await p.waitForTimeout(800);
  await p.evaluate(() => { const t = document.getElementById('tgTick'); if (t && !t.checked) t.click(); }); await p.waitForTimeout(300);
  await p.evaluate(() => { const a = document.getElementById('tgAgree'); if (a) a.click(); }); await p.waitForTimeout(1500);
  await p.waitForSelector('#introDoor:not([hidden]) .r350-corner', { timeout: 30000 }).catch(() => console.log('no welcome door chip'));
  await ring(['#introDoor .r350-corner .r350-chip'], 6); await shot(N ? '11-welcome-night' : '3-welcome');
  await p.evaluate(() => { const k = document.getElementById('introEnter'); if (k) k.click(); }); await p.waitForTimeout(2200);
  await p.evaluate(() => { try { go('home'); } catch (e) {} window.scrollTo(0, 0); }); await p.waitForTimeout(2000);
  await ring(['#page-home .r350-strip', '#r350Pill'], 6); await shot(N ? '12-home-night' : '4-home');
  if (!N) {
    await p.evaluate(() => { try { openPresenceMenu(); } catch (e) {} }); await p.waitForTimeout(900);
    await p.evaluate(() => { const m = document.querySelector('.pres-menu'); if (m) m.scrollTop = m.scrollHeight; }); await p.waitForTimeout(300);
    await p.evaluate(() => { const h = [...document.querySelectorAll('.pres-menu .pres-head')].find((x) => x.textContent === 'Practice studio'); if (h) h.id = 'pvHead'; });
    await p.evaluate(() => { const a = document.querySelector('#pvHead'), z = document.getElementById('r350RowLeave'); if (!a || !z) return; const r1 = a.getBoundingClientRect(), r2 = z.getBoundingClientRect();
      const d = document.createElement('div'); d.id = 'pvBox'; d.style.cssText = 'position:fixed;pointer-events:none;left:' + Math.min(r1.left, r2.left) + 'px;top:' + r1.top + 'px;width:' + Math.max(r1.width, r2.width) + 'px;height:' + (r2.bottom - r1.top) + 'px'; document.body.appendChild(d); });
    await ring(['#pvBox'], 6); await shot('5-panel'); await p.evaluate(() => { const d = document.getElementById('pvBox'); if (d) d.remove(); try { closePresenceMenu(); } catch (e) {} });
    await p.evaluate(() => { try { go('chat'); state.activeChat = 'cpr-tides'; renderChat(); } catch (e) {} }); await p.waitForTimeout(2000);
    await p.evaluate(() => { const t = [...document.querySelectorAll('.web-tag')].find((x) => /A sample reply/.test(x.textContent)); if (t) t.id = 'pvTag'; });
    await ring(['#pvTag'], 5); await shot('6-chat');
    await p.evaluate(() => { try { go('folders'); } catch (e) {} window.scrollTo(0, 0); }); await p.waitForTimeout(2500);
    await p.evaluate(() => { const c = [...document.querySelectorAll('#page-folders *')].filter((x) => x.children.length < 30 && /Tide Clock/.test(x.textContent || '') && /1 conversation/.test(x.textContent || '')).sort((a, b) => a.getBoundingClientRect().height - b.getBoundingClientRect().height);
      const inHead = c.filter((x) => { const r = x.getBoundingClientRect(); return r.top > 150 && r.bottom < 600 && r.width > 300; }); const pick = inHead[0] || c[0]; if (pick) pick.id = 'pvFolder'; });
    await p.waitForTimeout(600);
    await ring(['#pvFolder'], 6); await shot('7-ingenia');
    await p.evaluate(() => { try { go('home'); } catch (e) {} window.scrollTo(0, 0); }); await p.waitForTimeout(1200);
    await p.evaluate(() => { document.getElementById('r350Leave').click(); }); await p.waitForTimeout(1000);
    await p.evaluate(() => { const m = [...document.querySelectorAll('div')].reverse().find((x) => x.offsetParent && /^Leave the practice studio\?/.test((x.textContent || '').trim()) && x.getBoundingClientRect().width < 700); if (m) m.id = 'pvAsk'; });
    await ring(['#pvAsk'], 6); await shot('8-leave');
    await p.evaluate(() => { window.__pvOld = 1; const k = [...document.querySelectorAll('button')].find((x) => x.offsetParent && x.textContent.trim() === 'Leave'); if (k) k.click(); }); await fresh(); await p.waitForTimeout(2000);
    await ring(['#ingLockDoor .ild-card'], 6); await shot('9-back');
    const after = await p.evaluate(async () => ({ practiceKeys: (window.__ingProfiles.rawKeys() || []).filter((k) => /@practice$/.test(k)), dbs: (await indexedDB.databases()).map((d) => d.name).filter((n) => /@practice$/.test(n)) }));
    console.log('after leave, left of the practice studio:', JSON.stringify(after));
  }
  console.log('errors', JSON.stringify(errs.slice(0, 10)));
  await b.close();
})().catch((e) => { console.error('FAILED', e); process.exit(1); });
