// node rig/t_638_menu.js <Ingenium page url> <out dir>
// Ingenium 6.38 (6 November 2026): the model list opens at its own key (modules/r237.js). Her note: "The models drop down list
// panel from the chats does not open directly on top of the button, it opens on the other side of the chat text, please fix
// that." Checks:
//   - Chat, a wide window: pressed, the model list stands just above its key (its foot 4 to 10 pixels over the key's top), its
//     right edge on the key's right edge, inside the window, and it covers neither the key nor the send arrow
//   - it is placed before the screen is drawn (the first moment the list is shown it is already at its key)
//   - Code: the same
//   - the window made narrower while the list is open: the list follows its key
//   - a phone (390 wide): the list is inside the screen, above its key
//   - the + list still opens at its own key, at the left; the effort list still opens at its key
//   - no page errors
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
async function boot(p) { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500); }
/* press the model key; measure the list the first moment it shows (after the page's own reactions to the press, before any drawing) */
const openAndMeasure = (p) => p.evaluate(async () => { const k = document.getElementById('chatModelBtn'), m = document.getElementById('chatModelMenu');
  if (!m.hidden) k.click(); k.click(); await Promise.resolve(); const first = m.getBoundingClientRect();
  await new Promise(r => setTimeout(r, 250)); const r = m.getBoundingClientRect(), kr = k.getBoundingClientRect(), s = document.getElementById('chatSend').getBoundingClientRect();
  const over = (a, b) => a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1;
  return { shown: !m.hidden, firstRight: Math.round(first.right), firstBottom: Math.round(first.bottom), left: Math.round(r.left), right: Math.round(r.right), top: Math.round(r.top), bottom: Math.round(r.bottom), w: Math.round(r.width), h: Math.round(r.height),
    kLeft: Math.round(kr.left), kRight: Math.round(kr.right), kTop: Math.round(kr.top), vw: innerWidth, vh: innerHeight, coversKey: over(r, kr), coversSend: over(r, s), items: m.querySelectorAll('button').length }; });
const atKey = (m) => m.shown && m.bottom <= m.kTop - 4 && m.bottom >= m.kTop - 10 && Math.abs(m.right - m.kRight) <= 1 && m.left >= 8 && m.right <= m.vw - 8 && m.top >= 0 && !m.coversKey && !m.coversSend;
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await boot(p);
  // 1. Chat, wide
  await p.evaluate(() => { go('chat'); try { if (window.ccEnter) ccEnter(''); } catch (e) {} }); await p.waitForTimeout(900);
  const c1 = await openAndMeasure(p); await p.screenshot({ path: OUT + '/chat_model_list.png' });
  ok(atKey(c1), 'Chat: the model list stands just above its key, its right edge on the key\'s, inside the window, covering neither the key nor the send arrow', c1);
  ok(c1.firstRight === c1.right && c1.firstBottom === c1.bottom, 'it is at its key the first moment it is shown (placed before the screen is drawn)', c1);
  ok(c1.items >= 1, 'the list holds its choices', c1.items);
  // 2. the window narrower while the list is open
  await p.setViewportSize({ width: 1100, height: 860 }); await p.waitForTimeout(600);
  const c2 = await p.evaluate(() => { const k = document.getElementById('chatModelBtn').getBoundingClientRect(), r = document.getElementById('chatModelMenu').getBoundingClientRect(); return { shown: !document.getElementById('chatModelMenu').hidden, right: Math.round(r.right), kRight: Math.round(k.right), bottom: Math.round(r.bottom), kTop: Math.round(k.top), left: Math.round(r.left), vw: innerWidth }; });
  ok(c2.shown && Math.abs(c2.right - c2.kRight) <= 1 && c2.bottom <= c2.kTop - 4 && c2.left >= 8, 'the window made narrower while it is open: the list follows its key', c2);
  await p.evaluate(() => closeChatMenus()); await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(500);
  // 3. Code
  await p.evaluate(() => { try { ccEnter('code'); } catch (e) {} }); await p.waitForTimeout(900);
  const c3 = await openAndMeasure(p); await p.screenshot({ path: OUT + '/code_model_list.png' });
  ok(atKey(c3) && c3.firstRight === c3.right, 'Code: the same, just above its key from the first moment', c3);
  await p.evaluate(() => { closeChatMenus(); try { ccEnter(''); } catch (e) {} }); await p.waitForTimeout(400);
  // 4. the + list and the effort list keep their places
  const plus = await p.evaluate(async () => { const k = document.getElementById('chatImgBtn'), m = document.getElementById('chatPlusMenu'); k.click(); await new Promise(r => setTimeout(r, 300));
    const r = m.getBoundingClientRect(), kr = k.getBoundingClientRect(); const out = { shown: !m.hidden, left: Math.round(r.left), kLeft: Math.round(kr.left), bottom: Math.round(r.bottom), kTop: Math.round(kr.top) }; k.click(); return out; });
  ok(plus.shown && Math.abs(plus.left - plus.kLeft) <= 14 && plus.bottom <= plus.kTop, 'the + list still opens at its own key, at the left', plus);
  const eff = await p.evaluate(async () => { const k = document.getElementById('effKey'); if (!k || !k.getClientRects().length) return { none: true };
    k.click(); await new Promise(r => setTimeout(r, 300)); const m = document.getElementById('effMenu');
    if (!m || m.hidden) return { menu: false }; const r = m.getBoundingClientRect(), kr = k.getBoundingClientRect(); const out = { menu: true, right: Math.round(r.right), kRight: Math.round(kr.right), bottom: Math.round(r.bottom), kTop: Math.round(kr.top) };
    k.click(); return out; });
  ok(eff.none || (eff.menu && Math.abs(eff.right - eff.kRight) <= 1 && eff.bottom <= eff.kTop), 'the effort list still opens at its own key', eff);
  // 5. a phone
  const ph = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true }); const q = await ph.newPage(); q.on('pageerror', e => errs.push('phone: ' + e.message.slice(0, 300)));
  await q.goto(URL_); await boot(q); await q.evaluate(() => go('chat')); await q.waitForTimeout(900);
  const c5 = await openAndMeasure(q); await q.screenshot({ path: OUT + '/phone_model_list.png' });
  ok(c5.shown && c5.left >= 8 && c5.right <= c5.vw - 8 && c5.bottom <= c5.kTop - 4 && c5.top >= 0 && !c5.coversKey, 'a phone: the list is inside the screen, above its key', c5);
  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
