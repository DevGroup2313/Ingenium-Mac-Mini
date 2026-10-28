// The Forge 652 · Magister's card is the Forge's own, whenever it is made. In Chromium:
//   - opened as usual: the card's row of tutors is the Forge's three years (HTML, CSS and JavaScript; Python; C++), its key
//     opens the lessons, its modes are Lessons, Practice, Questions, Diary and Path, and nothing of Carpe Diem's row is in it;
//   - opened with Carpe Diem's marks held back for the first 25 seconds (data-cd-mode, data-cd-magbtn), as they were on the
//     owner's computer (her words, 28 October 2026: "it has the wrong Magister dock. Why is the French tutor button amongst
//     the other buttons inside of the Forge?"): the same card, made by the keys' words;
//   - a card already made with Carpe Diem's row in it is made again, within a few seconds;
//   - no page errors.
//   node tests/t_652_magister.js <url of the Forge page>
const pw = require('/opt/node-tools/node_modules/playwright');
const URL = process.argv[2];
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d).slice(0, 700) : '')); c ? pass++ : fail++; };
const CD = ['Proposal', 'Curriculum', 'Research Writing', 'Ask the librarian', 'French Tutor'];
const card = p => p.evaluate(names => { const d = document.getElementById('magDock'); if (!d) return null;
  const keys = [...d.querySelectorAll('button')].map(b => (b.textContent || '').trim());
  return { built: d.getAttribute('data-built'), keys, cd: keys.filter(t => names.some(n => t === n || t.endsWith(' ' + n))),
    years: keys.filter(t => /HTML, CSS and JavaScript|Python|C\+\+/.test(t)), go: keys.filter(t => /^Open (the lessons|Magister)$/.test(t)),
    modes: [...d.querySelectorAll('.cd-mag-mode')].map(b => b.textContent.trim()) }; }, CD);
async function open(hold) {
  const b = await pw.chromium.launch({ args: ['--js-flags=--max-old-space-size=8192'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } });
  if (hold) await ctx.addInitScript(() => { const t0 = Date.now(), set = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function (n, v) { if ((n === 'data-cd-mode' || n === 'data-cd-magbtn') && Date.now() - t0 < 25000) return; return set.call(this, n, v); }; });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL);
  await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 300000 });
  await p.waitForTimeout(1500); await p.evaluate(() => { try { if (typeof cdCloseDoor === 'function') cdCloseDoor(); } catch (e) {} });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.offsetParent && x.textContent.replace(/[^A-Za-z ]/g, '').trim() === 'Magister'); if (k) k.click(); });
  await p.waitForTimeout(4500);
  return { b, p, errs };
}
const right = c => c && c.built === '1' && c.cd.length === 0 && c.years.length === 3 && c.go.join() === 'Open the lessons' && c.modes.join() === 'Lessons,Practice,Questions,Diary,Path';
(async () => {
  let { b, p, errs } = await open(false);
  const c1 = await card(p);
  ok(right(c1), "opened as usual, the card is the Forge's own: its three years, Open the lessons, its five modes, no Carpe Diem tutor", c1);
  // a card made with Carpe Diem's row in it is made again
  await p.evaluate(() => { const d = document.getElementById('magDock'), row = d.querySelector('button').parentElement, k = document.createElement('button'); k.textContent = '🇫🇷 French Tutor'; k.className = 'btn btn-soft btn-sm'; row.appendChild(k); });
  await p.waitForTimeout(4000);
  const c2 = await card(p);
  ok(right(c2), "a card made with Carpe Diem's French Tutor in it is made again", c2);
  await p.screenshot({ path: '/tmp/claude-0/out/t652_magister.png' });
  ok(errs.length === 0, 'no errors on the page', errs.slice(0, 3)); await b.close();
  ({ b, p, errs } = await open(true));
  const c3 = await card(p);
  ok(right(c3), "with Carpe Diem's marks held back at the start, as on her computer, the card is still the Forge's own", c3);
  await p.waitForTimeout(23000);
  const c4 = await card(p);
  ok(right(c4), 'and stays so once the marks have come', c4);
  await p.screenshot({ path: '/tmp/claude-0/out/t652_magister_held.png' });
  ok(errs.length === 0, 'no errors on the page', errs.slice(0, 3)); await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
