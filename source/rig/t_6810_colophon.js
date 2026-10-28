// node rig/t_6810_colophon.js <Ingenium page url> <out dir>
// 6.8.10, in Chromium. The owner's words (28 October 2026): "I want the copyrights and authorship line of "Designed and built
// by Yannie D. Forest · © 2026 Yannie D. Forest" placed at the bottom of the app's display page as well as the About panel
// like it is done on Carpe Diem. I want the app's page to not just abruptly end." So (modules/r189.js):
//   - each page that scrolls ends with the colophon, below its last card: the seal (drawn), the app's name, the rule with
//     LOCAL MODEL STUDIO, and the line in her words; it is the last thing on the page;
//   - the rooms that fill the window (Chat, Code, Lector, Career, Fabrica, an app on the Desk) show none;
//   - by night its words take the night's colours and the seal is drawn again;
//   - About ends with "Designed and built by Yannie D. Forest" over "© 2026 Yannie D. Forest", after the version, before
//     Close, as Carpe Diem's About does;
//   - no errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(d).slice(0, 500))); c ? pass++ : fail++; };
const LINE = 'Designed and built by Yannie D. Forest  ·  © 2026 Yannie D. Forest';
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  const look = () => p.evaluate(() => { const f = document.getElementById('ingColophon'); if (!f) return null; const r = f.getBoundingClientRect(), main = document.querySelector('main.main'), act = main.querySelector('.section.active');
    const cv = f.querySelector('.icol-seal'); let inked = 0; try { const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data; for (let i = 3; i < d.length; i += 4) if (d[i] > 40) inked++; } catch (e) {}
    return { on: f.getAttribute('data-on'), shown: getComputedStyle(f).display !== 'none' && r.height > 60, last: main.lastElementChild === f, below: act ? Math.round(r.top - act.getBoundingClientRect().bottom) : null,
      word: f.querySelector('.icol-word').textContent, rule: f.querySelector('.icol-rule').innerText.trim(), credit: f.querySelector('.icol-credit').textContent, inked, cw: cv.width,
      creditColor: getComputedStyle(f.querySelector('.icol-credit')).color, ruleColor: getComputedStyle(f.querySelector('.icol-rule span')).color }; });
  const SCROLL = ['home', 'focus', 'models', 'blend', 'build', 'guide', 'settings'], FILL = ['chat', 'code', 'lector', 'career', 'fabrica', 'tabula'];
  const seen = {};
  for (const pg of SCROLL.concat(FILL)) { await p.evaluate(n => go(n), pg); await p.waitForTimeout(1100); seen[pg] = await look(); }
  ok(SCROLL.every(n => seen[n] && seen[n].on === '1' && seen[n].shown && seen[n].last && seen[n].below >= 0), 'each page that scrolls ends with the colophon, below its last card, the last thing on the page',
    JSON.stringify(SCROLL.map(n => [n, seen[n] && [seen[n].on, seen[n].shown, seen[n].last, seen[n].below]])));
  ok(FILL.every(n => seen[n] && seen[n].on === '0' && !seen[n].shown), 'the rooms that fill the window show none (Chat, Code, Lector, Career, Fabrica, an app)', JSON.stringify(FILL.map(n => [n, seen[n] && [seen[n].on, seen[n].shown]])));
  const h = seen.home;
  ok(h.credit === LINE, 'its line is in her words: ' + LINE.replace(/ /g, ' '), JSON.stringify(h.credit));
  ok(h.word === 'Ingenium' && /^LOCAL MODEL STUDIO$/.test(h.rule), "over it, the app's name and the rule with LOCAL MODEL STUDIO, as Carpe Diem's colophon has its name and OFFLINE", JSON.stringify([h.word, h.rule]));
  ok(h.inked > 300 && h.cw >= 46, 'and the seal, drawn', JSON.stringify([h.inked, h.cw]));
  await p.evaluate(() => go('home')); await p.waitForTimeout(800);
  await p.evaluate(() => { const f = document.getElementById('ingColophon'); f.scrollIntoView({ block: 'end' }); }); await p.waitForTimeout(500);
  await p.screenshot({ path: OUT + '/home-end-day.png' });
  // by night
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); }); await p.waitForTimeout(700);
  const n = await look();
  ok(n.creditColor !== h.creditColor && n.ruleColor !== h.ruleColor && n.inked > 300, "by night its words take the night's colours, and the seal is drawn again", JSON.stringify([h.creditColor, n.creditColor, h.ruleColor, n.ruleColor, n.inked]));
  await p.screenshot({ path: OUT + '/home-end-night.png' });
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'day'); }); await p.waitForTimeout(400);
  // About
  await p.evaluate(() => document.getElementById('aboutBtn').click()); await p.waitForTimeout(900);
  const a = await p.evaluate(() => { const box = document.getElementById('modalBox'), c = box.querySelector('.ab-credit'); if (!c) return null;
    const kids = [...box.children]; return { by: c.querySelector('.ab-by').textContent, rights: c.querySelector('.ab-rights').textContent, afterVersion: kids.indexOf(c) > kids.indexOf(box.querySelector('.ab-foot')),
      beforeClose: kids.indexOf(c) === kids.indexOf(box.querySelector('#aClose').parentNode) - 1, byColor: getComputedStyle(c.querySelector('.ab-by')).color, rimTop: getComputedStyle(c).borderTopStyle }; });
  ok(a && a.by === 'Designed and built by Yannie D. Forest' && a.rights === '© 2026 Yannie D. Forest', 'About ends with "Designed and built by Yannie D. Forest" over "© 2026 Yannie D. Forest"', JSON.stringify(a));
  ok(a && a.afterVersion && a.beforeClose && a.rimTop === 'solid', 'after the version, before Close, under a fine rule, as in Carpe Diem', JSON.stringify(a));
  await p.screenshot({ path: OUT + '/about.png' });
  await p.evaluate(() => { const c = document.getElementById('aClose'); if (c) c.click(); }); await p.waitForTimeout(400);
  await p.evaluate(() => document.getElementById('aboutBtn').click()); await p.waitForTimeout(700);
  ok(await p.evaluate(() => document.querySelectorAll('#modalBox .ab-credit').length === 1), 'opened again, About has it once');
  ok(errs.length === 0, 'no errors on the page', errs.slice(0, 3).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
