// node rig/t_693_stones.js <Ingenium page url> <out dir>
// Ingenium 6.9 (30 October 2026), in Chromium. The owner's words: "I also want the apps buttons to match the Forge and have
// the little coloured circles that show their colours and I also want them reflected on the desktab circle." (modules/r193.js)
//   - the five apps in the side rail (Tabula, Abacus, Imago, Scriba, Fontes) are cut stones: the stone Home wears for the
//     same app, 26px high, the name alone on it, Fontes lettered in the dock's blue-black;
//   - folded, the APPS key wears five circles in the stones' colours; open, it wears none;
//   - an open app's Desk tab has its circle in the stone's colour;
//   - the app in hand keeps its stone and wears a ring; by night the stones stay; on a phone the rail does not overflow;
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(d).slice(0, 600))); c ? pass++ : fail++; };
const APPS = ['tabula', 'abacus', 'slides', 'scriba', 'fontes'];
const COL = { tabula: 'rgb(58, 58, 64)', abacus: 'rgb(53, 122, 85)', slides: 'rgb(154, 53, 64)', fontes: 'rgb(242, 234, 214)', scriba: 'rgb(58, 81, 120)' };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(1800);
  const stones = () => p.evaluate((APPS) => APPS.map(k => { const e = document.querySelector('.dock .nav-btn[data-page="' + k + '"]'); if (!e) return null; const cs = getComputedStyle(e), r = e.getBoundingClientRect();
    const home = document.querySelector('.hx-app[data-app="' + k + '"] .hx-stone'); const hi = home ? getComputedStyle(home).backgroundImage : null;
    return { k, stone: e.classList.contains('ing-stone'), img: /svg/.test(cs.backgroundImage), sameAsHome: hi ? hi === cs.backgroundImage : null, h: Math.round(r.height), w: Math.round(r.width), text: e.textContent.trim(), svgShown: !![...e.querySelectorAll('svg')].find(s => s.offsetParent && getComputedStyle(s).display !== 'none'), color: cs.color, font: cs.fontFamily.slice(0, 12), shown: !!e.offsetParent }; }), APPS);
  let st = await stones();
  ok(st.every(s => s && s.shown && s.stone && s.img), 'the five apps in the rail are cut stones (a stone picture on each)', JSON.stringify(st));
  ok(st.every(s => s && s.sameAsHome !== false), 'each is the stone Home wears for the same app', JSON.stringify(st.map(s => s && [s.k, s.sameAsHome])));
  ok(st.every(s => s && s.h >= 25 && s.h <= 28 && !s.svgShown && /^(Tabula|Abacus|Imago|Scriba|Fontes)$/.test(s.text)), '26px high, the name alone on it, no line icon', JSON.stringify(st.map(s => s && [s.k, s.h, s.text, s.svgShown])));
  ok(st.every(s => s && /Georgia/.test(s.font)), 'lettered in Georgia, as the Forge letters its stones', JSON.stringify(st.map(s => s && s.font)));
  ok(st.find(s => s.k === 'fontes').color === 'rgb(15, 75, 102)' && st.find(s => s.k === 'tabula').color === 'rgb(255, 255, 255)', 'Fontes in the dock\'s blue-black, the others in white', JSON.stringify(st.map(s => [s.k, s.color])));
  await p.screenshot({ path: OUT + '/rail_day.png', clip: { x: 0, y: 40, width: 240, height: 900 } });
  // the folded APPS key wears the circles
  const dotsAt = () => p.evaluate((APPS) => { const lab = document.querySelector('.dock .grp-label.ing-fold'); const d = lab && lab.querySelector('.ing-fak-dots'); if (!d) return null; const cs = getComputedStyle(d);
    return { shown: cs.display !== 'none' && d.offsetParent !== null, n: d.querySelectorAll('i').length, folded: document.querySelector('.dock').classList.contains('apps-folded'),
      cols: APPS.map(k => { const i = d.querySelector('i[data-app="' + k + '"]'); const c = i ? getComputedStyle(i) : null; return c ? { k, bg: c.backgroundImage, w: c.width, br: c.borderRadius } : null; }) }; }, APPS);
  let d0 = await dotsAt();
  ok(d0 && d0.n === 5 && !d0.shown && !d0.folded, 'open, the APPS key wears no circles (the stones show the colours)', JSON.stringify(d0 && { n: d0.n, shown: d0.shown, folded: d0.folded }));
  await p.evaluate(() => document.querySelector('.dock .grp-label.ing-fold').click()); await p.waitForTimeout(500);
  let d1 = await dotsAt();
  ok(d1 && d1.shown && d1.folded, 'folded, the APPS key wears the five circles', JSON.stringify(d1 && { shown: d1.shown, folded: d1.folded }));
  ok(d1 && d1.cols.every(c => c && c.w === '6px' && c.br === '50%' && c.bg.indexOf(COL[c.k]) >= 0), 'each circle 6px round, in its stone\'s colour', JSON.stringify(d1 && d1.cols));
  await p.screenshot({ path: OUT + '/rail_folded.png', clip: { x: 0, y: 40, width: 240, height: 900 } });
  await p.evaluate(() => document.querySelector('.dock .grp-label.ing-fold').click()); await p.waitForTimeout(500);
  // the Desk tab's circle
  await p.evaluate(() => go('tabula')); await p.waitForTimeout(3500);
  const tab = await p.evaluate(() => { const t = document.querySelector('#ing-deskbar [data-tab^="tabula"]'); if (!t) return null; const dot = t.querySelector('.dot'); const cs = dot ? getComputedStyle(dot) : null; return { shown: !!t.offsetParent, bg: cs && cs.backgroundImage, sh: cs && cs.boxShadow, folded: t.classList.contains('folded') }; });
  ok(tab && tab.shown && tab.bg && tab.bg.indexOf(COL.tabula) >= 0, 'Tabula open: its Desk tab\'s circle is the stone\'s colour', JSON.stringify(tab));
  const act = await p.evaluate(() => { const e = document.querySelector('.dock .nav-btn[data-page="tabula"]'); const cs = getComputedStyle(e); const lit = [...document.querySelectorAll('.dock .nav-btn.active')].map(b => b.getAttribute('data-page')); return { active: e.classList.contains('active'), lit, img: /svg/.test(cs.backgroundImage), ring: /rgba\(232, 199, 133/.test(cs.boxShadow), color: cs.color }; });
  ok(act.active && act.img && act.ring && act.color === 'rgb(255, 255, 255)' && act.lit.length === 1, 'the app in hand: the rail lights its stone alone, which keeps its colour and wears the gilt ring', JSON.stringify(act));
  await p.evaluate(() => go('abacus')); await p.waitForTimeout(2500);
  const act2 = await p.evaluate(() => [...document.querySelectorAll('.dock .nav-btn.active')].map(b => b.getAttribute('data-page')));
  ok(act2.length === 1 && act2[0] === 'abacus', 'Abacus opened beside it: the rail moves its light to Abacus', JSON.stringify(act2));
  await p.evaluate(() => go('home')); await p.waitForTimeout(900);
  const act3 = await p.evaluate(() => [...document.querySelectorAll('.dock .nav-btn.active')].map(b => b.getAttribute('data-page')));
  ok(act3.length === 1 && act3[0] === 'home', 'back on Home, Home alone is lit', JSON.stringify(act3));
  await p.evaluate(() => go('tabula')); await p.waitForTimeout(2000);
  await p.screenshot({ path: OUT + '/desk_tabula.png', clip: { x: 0, y: 0, width: 1440, height: 160 } });
  // by night
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); }); await p.waitForTimeout(400);
  st = await stones();
  ok(st.every(s => s && s.stone && s.img), 'by night the stones stay', JSON.stringify(st.map(s => s && [s.k, s.img])));
  await p.screenshot({ path: OUT + '/rail_night.png', clip: { x: 0, y: 40, width: 240, height: 900 } });
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'day'); });
  // a phone
  const ph = await ctx.newPage(); await ph.setViewportSize({ width: 390, height: 844 });
  await ph.goto(URL_); await ph.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await ph.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await ph.waitForTimeout(1500);
  const phone = await ph.evaluate(() => { const d = document.querySelector('.dock'); const r = d.getBoundingClientRect(); const over = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    const st = [...document.querySelectorAll('.dock .nav-btn.ing-stone')].map(e => { const b = e.getBoundingClientRect(); return { k: e.getAttribute('data-page'), shown: !!e.offsetParent, right: Math.round(b.right), h: Math.round(b.height) }; });
    return { dockW: Math.round(r.width), dockScroll: d.scrollWidth, dockClient: d.clientWidth, over, st }; });
  ok(!phone.over, 'on a phone the page does not overflow sideways', JSON.stringify(phone));
  ok(phone.st.length === 5 && phone.st.every(s => s.h >= 25 && s.h <= 28), 'on a phone the five stones keep their size', JSON.stringify(phone.st));
  await ph.screenshot({ path: OUT + '/phone.png' });
  ok(errs.length === 0, 'no errors on the page', errs.join(' | '));
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
