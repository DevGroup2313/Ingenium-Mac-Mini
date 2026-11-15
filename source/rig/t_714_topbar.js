// node rig/t_714_topbar.js <page url> <out dir>
// 7.14 (r301, r174): the top bar, tidied. On the real page, at nineteen widths from 1440 to 360 pixels, with no model chosen and with a
// long model's name (invented): nothing runs past the bar's edge or the window, no key lies over another, the seal keeps its whole room
// and stays clear of the first key, every key of the bar is 28 pixels tall, a model's name shows at least 56 pixels or its dot alone,
// and the readings make one capsule closed at its first and last shown reading. Then at 1440: the spaces (6 between keys, 16 between
// the readings and the actions), the round hide key, the raised plate; at night the keys dark; a reading under the pointer rising;
// on a phone Studio's pencil alone, its name still "Studio" for a screen reader; the clock last by day on a desk, hidden on a phone;
// and on a 320 pixel touch phone the bar in one row (7.13 wrapped it to two).
const pw = require('playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
const WIDTHS = [1440, 1280, 1180, 1024, 900, 820, 800, 768, 744, 720, 700, 640, 600, 560, 430, 414, 390, 375, 360];
const LONG = 'Corvina 3 8B Instruct';   // invented
let pass = 0, fail = 0; const lines = [];
function ok(c, what) { if (c) pass++; else { fail++; lines.push('FAIL ' + what); } }
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.waitForTimeout(400); await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} go('home'); }); await p.waitForTimeout(600);
  ok(await p.evaluate(() => !!document.getElementById('r301-css') && !!window.IngTopBar), 'r301 is on the page');
  const table = [];
  for (const model of ['No model', LONG]) for (const w of WIDTHS) {
    await p.setViewportSize({ width: w, height: 800 });
    await p.evaluate((m) => { document.getElementById('activeModelName').textContent = m; }, model); await p.waitForTimeout(450);
    const r = await p.evaluate(() => {
      const bar = document.querySelector('.topbar'), tools = document.getElementById('topTools'), br = bar.getBoundingClientRect();
      const vis = (e) => { const s = getComputedStyle(e), q = e.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && q.width > 0 && q.height > 0; };
      const keys = [...tools.children].filter(vis).map((e) => { const q = e.getBoundingClientRect(); return { id: e.id, x: q.left, w: q.width, h: q.height, y: q.top, cls: e.className }; });
      const brand = document.getElementById('brandSealBtn').getBoundingClientRect(), seal = document.querySelector('#brandSealBtn .seal').getBoundingClientRect();
      const over = []; const all = [{ id: 'brand', x: brand.left, w: brand.width, y: brand.top, h: brand.height }].concat(keys);
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i], c = all[j]; if (a.x < c.x + c.w - 1 && c.x < a.x + a.w - 1 && a.y < c.y + c.h - 1 && c.y < a.y + a.h - 1) over.push(a.id + '/' + c.id); }
      const nm = document.getElementById('activeModelName'), nr = nm.getBoundingClientRect(), nshown = getComputedStyle(nm).position !== 'absolute' && nr.width > 2;
      const reads = ['statusPill', 'enginePill', 'activeModelPill', 'clockPill'].map((id) => document.getElementById(id)).filter((e) => e && vis(e));
      const capOk = reads.every((e, i) => e.classList.contains('tb-seg') && e.classList.contains('tb-seg-first') === (i === 0) && e.classList.contains('tb-seg-last') === (i === reads.length - 1));
      const padR = parseFloat(getComputedStyle(bar).paddingRight) || 0, toolsR = Math.max(...keys.map((k) => k.x + k.w));
      return { fit: document.documentElement.className.replace(/ing-tb-/g, '').trim() || '-', overflow: bar.scrollWidth > bar.clientWidth + 1, pageWide: document.scrollingElement.scrollWidth > innerWidth + 1,
        intoMargin: toolsR > br.right - padR + 1.5, spare: Math.round(innerWidth - toolsR), over, sealOut: seal.left < brand.left - 1 || seal.right > brand.right + 1 || seal.left < 0, sealHit: keys.length && seal.right > keys[0].x - 2,
        heights: [...new Set(keys.map((k) => Math.round(k.h)))], nameW: Math.round(nr.width), nshown, ncut: nm.scrollWidth > nm.clientWidth + 1, capOk, reads: reads.map((e) => e.id) };
    });
    const tag = (model === LONG ? 'name ' : 'none ') + w;
    ok(!r.overflow && !r.pageWide, tag + ': nothing runs past the bar or the window');
    ok(!r.intoMargin, tag + ': the keys stay out of the bar\'s right margin (' + r.spare + ' px to spare)');
    ok(r.over.length === 0, tag + ': no key over another ' + r.over.join(','));
    ok(!r.sealOut && !r.sealHit, tag + ': the seal keeps its room, clear of the first key');
    ok(r.heights.length === 1 && r.heights[0] === 28, tag + ': every key 28 px tall ' + JSON.stringify(r.heights));
    ok(!r.nshown || r.nameW >= 56 || !r.ncut, tag + ': the model\'s name readable (' + r.nameW + ' px) or its dot alone');
    ok(r.capOk, tag + ': one capsule, closed at its first and last reading ' + r.reads.join(','));
    table.push(tag.padEnd(9) + ' fit[' + r.fit + ']'.padEnd(2) + ' spare ' + r.spare + ' name ' + (r.nshown ? r.nameW + (r.ncut ? '…' : '') : 'dot'));
  }
  // at 1440, by day, no model: the spaces, the round hide key, the raised plate, the clock last
  await p.setViewportSize({ width: 1440, height: 900 }); await p.evaluate(() => { document.getElementById('activeModelName').textContent = 'No model'; }); await p.waitForTimeout(500);
  const d = await p.evaluate(() => {
    const g = (id) => document.getElementById(id).getBoundingClientRect();
    const gap = (a, c) => Math.round(g(c).left - g(a).right);
    const ch = getComputedStyle(document.getElementById('topChevron')), pl = getComputedStyle(document.getElementById('brandSealBtn'));
    return { chevW: g('topChevron').width, chevH: g('topChevron').height, chevR: parseFloat(ch.borderTopLeftRadius), g1: gap('topChevron', 'statusPill'), gCap: gap('statusPill', 'enginePill'),
      gSep: gap('clockPill', 'displayBtn'), gAct: (function () { const a = ['displayBtn', 'auTopKey', 'aboutBtn', 'ingHelpKey'].filter((id) => document.getElementById(id)); const o = []; for (let i = 1; i < a.length; i++) o.push(gap(a[i - 1], a[i])); return o; })(), plate: pl.boxShadow !== 'none' && pl.backgroundImage !== 'none',
      clockLast: document.getElementById('clockPill').classList.contains('tb-seg-last'), font: getComputedStyle(document.getElementById('displayBtn')).fontSize, gapProp: getComputedStyle(document.getElementById('topTools')).columnGap };
  });
  ok(d.chevW === 28 && d.chevH === 28 && d.chevR >= 14, '1440: the hide key a round 28 px key ' + JSON.stringify([d.chevW, d.chevH, d.chevR]));
  ok(d.g1 === 6 && d.gCap <= 0 && d.gSep === 16 && d.gAct.every((x) => x === 6), '1440: 6 px between keys, the capsule joined, 16 px between readings and actions ' + JSON.stringify(d));
  ok(d.gapProp === 'normal' || d.gapProp === '0px', '1440: spaced by margins, not by gap (Chrome 83) ' + d.gapProp);
  ok(d.plate, '1440: the INGENIUM plate raised');
  ok(d.clockLast, '1440: the clock closes the capsule');
  ok(d.font === '12px', '1440: the keys\' type 12 px ' + d.font);
  await p.screenshot({ path: OUT + '/bar_1440_day.png', clip: { x: 0, y: 0, width: 1440, height: 56 } });
  // a reading under the pointer rises out of the capsule
  await p.hover('#enginePill'); await p.waitForTimeout(350);
  const lift = await p.evaluate(() => getComputedStyle(document.getElementById('enginePill')).transform);
  ok(/matrix\(1, 0, 0, 1, 0, -2\)/.test(lift), 'a reading under the pointer rises 2 px ' + lift);
  await p.mouse.move(700, 500); await p.waitForTimeout(300);
  // at night: the keys dark
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await p.waitForTimeout(700);
  // the theme fades in (its colours change over a moment), so the reading is taken once they have settled
  let night = [];
  for (let i = 0; i < 12; i++) { night = await p.evaluate(() => ['statusPill', 'topChevron', 'displayBtn'].map((id) => { const m = getComputedStyle(document.getElementById(id)).backgroundColor.match(/\d+/g).map(Number); return (m[0] + m[1] + m[2]) / 3; }));
    if (night.every((v) => v < 90)) break; await p.waitForTimeout(250); }
  ok(night.every((v) => v < 90), 'at night the keys are dark ' + JSON.stringify(night));
  await p.screenshot({ path: OUT + '/bar_1440_night.png', clip: { x: 0, y: 0, width: 1440, height: 56 } });
  await p.evaluate(() => document.body.setAttribute('data-theme', 'day')); await p.waitForTimeout(500);
  // a phone, with the long name: Studio's pencil alone, still named Studio; the clock hidden, the model's reading closing the capsule
  await p.setViewportSize({ width: 390, height: 844 }); await p.evaluate((m) => { document.getElementById('activeModelName').textContent = m; }, LONG); await p.waitForTimeout(600);
  // (Studio is the master edition's alone: in another edition its checks are skipped)
  const hasStudio = await p.evaluate(() => !!document.getElementById('auTopKey'));
  const ph = await p.evaluate(() => { const s = document.getElementById('auTopKey') || document.getElementById('aboutBtn'), q = s.getBoundingClientRect(); return { w: Math.round(q.width), h: Math.round(q.height), icons: document.documentElement.classList.contains('ing-tb-icons'),
    clockHidden: document.getElementById('clockPill').hidden, modelLast: document.getElementById('activeModelPill').classList.contains('tb-seg-last') }; });
  const studioNamed = await p.getByRole('button', { name: 'Studio', exact: false }).count();
  if (hasStudio) { ok(ph.icons && ph.w === 28 && ph.h === 28, '390: Studio shows its pencil alone, a 28 px circle ' + JSON.stringify(ph));
    ok(studioNamed >= 1, '390: Studio still named "Studio" for a screen reader'); }
  ok(ph.clockHidden && ph.modelLast, '390: the clock hidden, the model\'s reading closes the capsule');
  await p.screenshot({ path: OUT + '/bar_390_name.png', clip: { x: 0, y: 0, width: 390, height: 56 } });
  for (const w of [820, 600, 430, 360]) { await p.setViewportSize({ width: w, height: 800 }); await p.waitForTimeout(450); await p.screenshot({ path: OUT + '/bar_' + w + '_name.png', clip: { x: 0, y: 0, width: w, height: 56 } }); }
  // a touch phone under 360 pixels (320 by 568), where r174 lets the keys wrap: the steps come first, the bar keeps one row
  { const c2 = await b.newContext({ viewport: { width: 320, height: 568 }, isMobile: true, hasTouch: true }); const q = await c2.newPage(); q.on('pageerror', (e) => errs.push(e.message));
    await q.goto(URL_); await q.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await q.waitForTimeout(700);
    await q.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await q.waitForTimeout(400);
    await q.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} go('home'); }); await q.waitForTimeout(800);
    const r = await q.evaluate(() => { const ks = [...document.getElementById('topTools').children].filter((e) => e.getBoundingClientRect().width > 0).map((e) => Math.round(e.getBoundingClientRect().top));
      return { tops: [...new Set(ks)], barH: Math.round(document.querySelector('.topbar').getBoundingClientRect().height), wide: document.scrollingElement.scrollWidth > innerWidth + 1 }; });
    ok(r.tops.length === 1 && r.barH <= 48 && !r.wide, '320 touch: the bar keeps one row ' + JSON.stringify(r));
    await q.screenshot({ path: OUT + '/bar_320_touch.png', clip: { x: 0, y: 0, width: 320, height: 56 } }); await c2.close(); }
  ok(errs.length === 0, 'no page errors ' + errs.slice(0, 2).join(' | '));
  fs.writeFileSync(OUT + '/t_714_table.txt', table.join('\n') + '\n');
  console.log(table.join('\n')); lines.forEach((l) => console.log(l));
  console.log((fail ? 'FAILED ' : 'PASS ') + pass + '/' + (pass + fail));
  await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
