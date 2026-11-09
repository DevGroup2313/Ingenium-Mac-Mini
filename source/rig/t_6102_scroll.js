// Every page ends with the colophon, and the rooms scroll on to it (Ingenium 6.10.2, modules/r189.js). Her words (3 November 2026):
// "I want the app to be more scrollable on the Lector, Career Studio, and Fabrica pages, they feel stiff. I want to be able to scroll
// and see the Ingenium seal and copyrights declaration at the footer of the app like I do on the other pages ... It's the same for both
// chat pages, I like how they look when I open their pages and I don't want anything to change when I go on their pages, I only want
// to be able to scroll past the chat page and see the Ingenium logo and the local model studio line and the copyrights line at the end."
//   node rig/t_6102_scroll.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1360, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); state.motion = 'minimal'; });
  await p.waitForTimeout(400);
  const look = (pg) => p.evaluate((pg) => { const c = document.getElementById('ingColophon'), r = c.getBoundingClientRect(), se = document.scrollingElement;
    const sec = document.querySelector('main.main > .section.active'), panels = [...(sec ? sec.querySelectorAll('#cs .c-pn, #lx7 .l-pn, #fb .f-pn, .chat-wrap') : [])].filter((x) => x.offsetParent);
    return { pg, sec: sec && sec.id, on: c.getAttribute('data-on'), y: Math.round(scrollY), range: se.scrollHeight - se.clientHeight, colTop: Math.round(r.top), colBottom: Math.round(r.bottom), vh: innerHeight,
      roomBottom: panels.length ? Math.round(Math.max(...panels.map((x) => x.getBoundingClientRect().bottom))) : null, credit: (c.querySelector('.icol-credit') || {}).textContent, rule: (c.querySelector('.icol-rule span') || {}).textContent }; }, pg);
  for (const pg of ['chat', 'code', 'lector', 'career', 'fabrica']) {
    await p.evaluate(() => { go('build'); }); await p.waitForTimeout(200); await p.evaluate(() => window.scrollTo(0, 99999)); await p.waitForTimeout(200);
    await p.evaluate((pg) => go(pg), pg); await p.waitForTimeout(700);
    const a = await look(pg);
    ok(a.on === '1' && a.y === 0 && a.colTop >= a.vh - 2 && (a.roomBottom === null || a.roomBottom <= a.vh + 2), pg + ': it opens at the top, as before: the room fits the window, and the colophon waits below it', a);
    if (pg === 'chat' || pg === 'career') await p.screenshot({ path: OUT + '/' + pg + '-open.png' });
    await p.evaluate(() => window.scrollTo(0, 99999)); await p.waitForTimeout(300);
    const z = await look(pg);
    ok(z.y > 0 && z.y === z.range && z.colBottom <= z.vh + 1 && z.colTop >= 0 && /Designed and built by Yannie D\. Forest/.test(z.credit || '') && /Local model studio/i.test(z.rule || '') && z.range < 420,
      pg + ': a short scroll past the room shows the seal, Local model studio and the copyright, and no more', z);
    if (pg === 'chat' || pg === 'career') await p.screenshot({ path: OUT + '/' + pg + '-foot.png' });
  }
  // a panel scrolled to its end carries the scroll on to the page, as the Build page scrolls
  await p.evaluate(() => { go('career'); const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.ui.room = 'apps'; s.ui.open = null; s.ui.show = 'list'; saveState(); IngCareer.render(); });
  await p.waitForTimeout(500);
  const box = await p.evaluate(() => { const b = [...document.querySelectorAll('#cs .c-work .c-pn-b')].find((x) => x.offsetParent); b.scrollTop = b.scrollHeight; const r = b.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, ob: getComputedStyle(b).overscrollBehaviorY }; });
  await p.mouse.move(box.x, box.y); for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 160); await p.waitForTimeout(120); }
  const y = await p.evaluate(() => Math.round(scrollY));
  ok(box.ob === 'auto' && y > 0, 'a Career panel scrolled to its end carries the scroll on to the page, to the colophon', { ...box, y });
  // the pages that scrolled before still end with it
  await p.evaluate(() => go('build')); await p.waitForTimeout(400);
  ok((await look('build')).on === '1', 'Build ends with the colophon, as before');
  ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
