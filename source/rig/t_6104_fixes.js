// Two fixes she asked for (Ingenium 6.10.4, modules/r213.js). Her words (3 November 2026): "I want you to hide the scroll bar inside of the
// Learn panel of the Career studio page ... I only want the scroll bar hidden from view, I want to keep the scrollability of the page intact.
// I also want the scrolling ability of the Build page's 'Your code' panel restored, I don't want it to be stiff and unscrollable."
// The code is invented (300 numbered lines); the wheel is a real mouse wheel over each panel.
//   node rig/t_6104_fixes.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
async function open(b, ctxOpts) {
  const p = await (await b.newContext(ctxOpts)).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); state.motion = 'minimal'; });
  await p.waitForTimeout(400); return { p, errs };
}
const CODE = (() => { let t = '<!doctype html>\n<html><body>\n'; for (let i = 0; i < 300; i++) t += '  <p class="line-' + i + '">Line ' + i + ' of a long page, with words enough to run a little past the middle of the panel.</p>\n'; return t + '</body></html>'; })();
const look = (p) => p.evaluate(() => { const sc = document.querySelector('#editorPane .cm-scroller'), ep = document.getElementById('editorPane'), pv = document.getElementById('previewPane'), r = sc.getBoundingClientRect(), er = ep.getBoundingClientRect();
  return { h: Math.round(sc.clientHeight), sh: sc.scrollHeight, top: Math.round(sc.scrollTop), paneBottom: Math.round(er.bottom), paneH: Math.round(er.height), pvH: Math.round(pv.getBoundingClientRect().height), vh: innerHeight, page: Math.round(scrollY),
    x: Math.round(r.left + r.width / 2), y: Math.round(r.top + Math.min(r.height, 400) / 2), range: document.scrollingElement.scrollHeight - innerHeight }; });
(async () => {
  const b = await pw.chromium.launch();
  // 1. Build, a desktop window: the code scrolls inside its panel; at its end the page carries on to the colophon
  const { p, errs } = await open(b, { viewport: { width: 1360, height: 900 } });
  await p.evaluate((CODE) => { go('build'); const ta = document.getElementById('codeEditor'); ta.value = CODE; try { ta.dispatchEvent(new Event('input', { bubbles: true })); } catch (e) {} }, CODE);
  await p.waitForTimeout(1000);
  const a = await look(p);
  ok(a.h < a.sh && a.paneBottom <= a.vh && a.paneH >= 480 && Math.abs(a.pvH - a.paneH) <= 2, 'a desktop window: the code panel and the preview stand as tall as the window leaves them (the code is longer than the panel)', a);
  await p.mouse.move(a.x, a.y); for (let i = 0; i < 5; i++) { await p.mouse.wheel(0, 200); await p.waitForTimeout(120); }
  await p.waitForTimeout(300); const a2 = await look(p);
  ok(a2.top > 600 && a2.page === 0, 'the wheel over the code scrolls the code itself, and the page stays where it is', { codeTop: a2.top, page: a2.page });
  await p.screenshot({ path: OUT + '/build-scroll.png' });
  await p.evaluate(() => { const sc = document.querySelector('#editorPane .cm-scroller'); sc.scrollTop = sc.scrollHeight; }); await p.waitForTimeout(200);
  for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 200); await p.waitForTimeout(120); }
  await p.waitForTimeout(300); const a3 = await look(p);
  const col = await p.evaluate(() => { window.scrollTo(0, 1e6); const c = document.getElementById('ingColophon'), r = c && c.getBoundingClientRect(); return { on: c && c.getAttribute('data-on'), seen: !!r && r.top < innerHeight && r.bottom <= innerHeight + 1 }; });
  ok(a3.page > 0 && col.on === '1' && col.seen, 'at the end of the code the wheel carries on down the page, whose foot is the colophon, as before', { page: a3.page, col });
  // 2. the Career Studio: Learn scrolls, with no bar showing; so does every panel of the studio, as in Lector and Fabrica
  await p.evaluate(() => { window.scrollTo(0, 0); go('career'); const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.ui.room = 'learn'; s.ui.show = 'list'; s.ui.learnTpl = false; saveState(); IngCareer.render(); });
  await p.waitForTimeout(600);
  const pick = () => p.evaluate(() => { const els = [...document.querySelectorAll('#cs .c-pn-b')].filter(x => x.offsetParent && x.scrollHeight > x.clientHeight + 4);
    const e = els[0]; if (!e) return null; const r = e.getBoundingClientRect(); return { bar: e.offsetWidth - e.clientWidth, sw: getComputedStyle(e).scrollbarWidth, top: Math.round(e.scrollTop), x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), n: els.length }; });
  let c = await pick();
  if (!c) { await p.setViewportSize({ width: 1360, height: 560 }); await p.waitForTimeout(500); c = await pick(); }
  ok(c && c.bar === 0 && c.sw === 'none', 'Learn: its panel has more than it shows, and no scroll bar takes room or shows', c);
  if (c) { await p.mouse.move(c.x, c.y); for (let i = 0; i < 4; i++) { await p.mouse.wheel(0, 160); await p.waitForTimeout(120); } await p.waitForTimeout(300); }
  const c2 = await pick();
  ok(c2 && c2.top > 100, 'it still scrolls, by the wheel as before', c2);
  const all = await p.evaluate(() => [...document.querySelectorAll('#cs *')].filter(x => x.offsetParent && x.scrollHeight > x.clientHeight + 4 && /(auto|scroll)/.test(getComputedStyle(x).overflowY)).map(x => x.offsetWidth - x.clientWidth));
  ok(all.every(w => w === 0), 'no panel of the Career Studio shows a bar (as Lector and Fabrica)', all);
  await p.screenshot({ path: OUT + '/career-learn.png' });
  ok(errs.length === 0, 'no script errors on the page', errs);
  // 3. a phone: the code panel has a height of its own and scrolls inside it
  const ph = await open(b, { ...pw.devices['iPhone 13'] });
  await ph.p.evaluate((CODE) => { go('build'); const ta = document.getElementById('codeEditor'); ta.value = CODE; try { ta.dispatchEvent(new Event('input', { bubbles: true })); } catch (e) {} }, CODE);
  await ph.p.waitForTimeout(1000);
  const q = await look(ph.p);
  ok(q.h < q.sh && q.paneH <= Math.round(q.vh * 0.72) + 2 && q.paneH >= 300, 'an iPhone: the code panel stands at most about three quarters of the screen tall, and the code scrolls inside it', q);
  ok(ph.errs.length === 0, 'no script errors on the phone', ph.errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
