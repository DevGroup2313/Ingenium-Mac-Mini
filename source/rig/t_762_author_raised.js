// Ingenium 7.62 · The Author Studio, raised (modules/r353.js, the master edition only). Approved on its ten pictures and live preview
// (previews/author_raised): "I approve of the preview, please commit and push it everywhere and continue working on my requests."
//   1. r353 runs in the master; the studio opens; its cards and the Editor's kinds rise in one after another (their order set)
//   2. each kind wears its room's mark on a disc, the rail's own mark; a kind still opens its room
//   3. raised: the cards, the kinds, the rows, the top bar's keys carry shadows; the fields are wells (an inset shadow)
//   4. a kind under the pointer leans toward it and lifts; it settles when the pointer leaves; pressing it sinks it
//   5. the layers' strip is a well whose raised key sits under the chosen layer and slides to the one pressed
//   6. by night the slabs take the night colours; Minimal motion keeps every tile still (no lean)
//   7. the measures are 6.38's: no tile, card or key is taller than before r353 by more than the depth's 2 px
//     node rig/t_762_author_raised.js <master page url> [<gift page url>]
const pw = require('/opt/node-tools/node_modules/playwright');
const [URL_, GIFT] = process.argv.slice(2);
let P = 0, F = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? P++ : F++; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    IngAuthor.words.set('Break it down', 'Take it apart', 'all'); go('author'); });
  await sleep(2500);
  const room = async (n) => { await p.evaluate((n) => { const k = [...document.querySelectorAll('#ingAuthor .au-room')].find((x) => x.textContent.trim().indexOf(n) === 0); if (k) k.click(); }, n); await p.mouse.move(1355, 895); await sleep(1300); };
  // 1
  const r1 = await p.evaluate(() => ({ part: window.__ingParts.p353, open: !!document.querySelector('#ingAuthor:not([hidden])'),
    order: [...document.querySelectorAll('#ingAuthor .au-pane .au-card, #ingAuthor .au-pane .au-kind')].map((x) => x.style.getPropertyValue('--au-i')),
    anim: getComputedStyle(document.querySelector('#ingAuthor .au-pane .au-kind')).animationName }));
  ok(r1.part === 'running' && r1.open, 'r353 runs in the master, and the studio opens', r1);
  ok(r1.order.length >= 6 && r1.order.every((v, i) => v === String(i)) && /auRaise/.test(r1.anim), 'the cards and the Editor\'s kinds rise in one after another (each its place in the order, the rise animation)', r1);
  // 2
  const r2 = await p.evaluate(() => { const kinds = [...document.querySelectorAll('#ingAuthor .au-kind')];
    return { n: kinds.length, discs: kinds.map((k) => { const d = k.querySelector('.au-disc svg'); return d ? d.innerHTML.length : 0; }),
      same: kinds.every((k) => { const t = ((/Open (\w[\w ]*)/.exec(k.textContent) || [])[1] || '').trim(); const rail = [...document.querySelectorAll('#ingAuthor .au-rail .au-room')].find((x) => t && x.textContent.trim().indexOf(t) === 0);
        const d = k.querySelector('.au-disc svg'); return !!(rail && d && rail.querySelector('svg').innerHTML === d.innerHTML); }) }; });
  ok(r2.n === 5 && r2.discs.every((x) => x > 0) && r2.same, 'each of the five kinds wears its room\'s mark on a disc, the rail\'s own mark', r2);
  // 3
  const r3 = await p.evaluate(() => { const cs = (q) => { const e = document.querySelector(q); return e ? getComputedStyle(e) : null; };
    const sh = (q) => { const c = cs(q); return c ? c.boxShadow : ''; };
    return { card: sh('#ingAuthor .au-pane .au-card'), kind: sh('#ingAuthor .au-pane .au-kind'), pill: sh('#ingAuthor .au-top .au-pill'), row: sh('#ingAuthor .au-pane .au-row') }; });
  const deep = (s) => (s.match(/rgba?\(/g) || []).length >= 3;
  ok(deep(r3.card) && deep(r3.kind) && deep(r3.pill), 'raised: the cards, the kinds and the top bar\'s keys carry their layered shadows', r3);
  ok(deep(r3.row), 'raised: a row (Lately) is a raised plate', r3.row);
  await room('Words');
  const well = await p.evaluate(() => { const f = document.querySelector('#ingAuthor .au-pane .au-search'); return f ? getComputedStyle(f).boxShadow : ''; });
  ok(/inset/.test(well), 'the fields are lit wells (an inset shadow)', well);
  // 4
  await room('The Editor');
  const k = await p.$('#ingAuthor .au-kind:nth-child(2)'); const bx = await k.boundingBox();
  const rest = await p.evaluate(() => document.querySelectorAll('#ingAuthor .au-kind')[1].getBoundingClientRect().top);
  await p.mouse.move(bx.x + bx.width * 0.85, bx.y + bx.height * 0.2, { steps: 6 }); await sleep(500);
  const lean = await p.evaluate(() => { const e = document.querySelectorAll('#ingAuthor .au-kind')[1]; return { rx: e.style.getPropertyValue('--au-rx'), ry: e.style.getPropertyValue('--au-ry'), top: e.getBoundingClientRect().top, t: getComputedStyle(e).transform }; });
  ok(parseFloat(lean.ry) > 0 && parseFloat(lean.rx) > 0 && Math.abs(parseFloat(lean.ry)) <= 4.01 && /matrix3d/.test(lean.t), 'under the pointer a kind leans toward it (at most 4 degrees) in three dimensions', lean);
  ok(lean.top < rest - 1, 'and lifts', { rest, top: lean.top });
  await p.mouse.move(1355, 895, { steps: 4 }); await sleep(500);
  const settled = await p.evaluate(() => { const e = document.querySelectorAll('#ingAuthor .au-kind')[1]; return e.style.getPropertyValue('--au-rx') + '|' + e.style.getPropertyValue('--au-ry'); });
  ok(settled === '|', 'it settles when the pointer leaves', settled);
  await p.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2); await p.mouse.down(); await sleep(250);
  const sunk = await p.evaluate(() => getComputedStyle(document.querySelectorAll('#ingAuthor .au-kind')[1]).boxShadow);
  await p.mouse.up(); await sleep(1200);
  const opened = await p.evaluate(() => (document.querySelector('#ingAuthor .au-h') || {}).textContent);
  ok(/0px 1px 2px 0px inset/.test(sunk), 'pressed, it sinks (its shadow drawn inward)', sunk);
  ok(/Names/.test(opened || ''), 'and the kind still opens its room (Its names opens Names)', opened);
  // 5
  await room('Additions');
  const s1 = await p.evaluate(() => { const s = document.querySelector('#ingAuthor .au-strip'); if (!s) return null; const c = [...s.children].find((x) => x.getAttribute('aria-selected') === 'true');
    return { sx: s.style.getPropertyValue('--au-sx'), sw: s.style.getPropertyValue('--au-sw'), cl: c.offsetLeft, cw: c.offsetWidth, well: getComputedStyle(s).boxShadow }; });
  ok(s1 && parseFloat(s1.sx) === s1.cl && parseFloat(s1.sw) === s1.cw && /inset/.test(s1.well), 'the layers\' strip is a well, its raised key under the chosen layer', s1);
  await p.evaluate(() => { const s = document.querySelector('#ingAuthor .au-strip'); [...s.children].find((x) => /Scripts/.test(x.textContent)).click(); }); await sleep(600);
  const s2 = await p.evaluate(() => { const s = document.querySelector('#ingAuthor .au-strip'); const c = [...s.children].find((x) => /Scripts/.test(x.textContent)); return { sx: s.style.getPropertyValue('--au-sx'), cl: c.offsetLeft, sel: c.getAttribute('aria-selected') }; });
  ok(s2.sel === 'true' && parseFloat(s2.sx) === s2.cl, 'pressed, the key slides under Scripts', s2);
  // 6
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await room('The Editor');
  const night = await p.evaluate(() => getComputedStyle(document.querySelector('#ingAuthor .au-pane .au-kind')).backgroundImage);
  ok(/rgb\(42, 34, 57\)/.test(night), 'by night the tiles take the night colours', night);
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); document.body.setAttribute('data-motion', 'minimal'); }); await room('The Editor');
  const k2 = await p.$('#ingAuthor .au-kind:nth-child(3)'); const b2 = await k2.boundingBox(); await p.mouse.move(b2.x + b2.width * 0.9, b2.y + 4, { steps: 5 }); await sleep(500);
  const still = await p.evaluate(() => { const e = document.querySelectorAll('#ingAuthor .au-kind')[2]; return { ry: e.style.getPropertyValue('--au-ry'), anim: getComputedStyle(e).animationName }; });
  ok(!still.ry && still.anim === 'none', 'Minimal motion: no lean and no rise, the tiles raised but still', still);
  await p.evaluate(() => document.body.removeAttribute('data-motion'));
  // 7 the measures: 6.38's sizes kept (the tallest key and tile)
  const size = await p.evaluate(() => ({ pill: document.querySelector('#ingAuthor .au-top .au-pill').getBoundingClientRect().height, room: document.querySelector('#ingAuthor .au-room').getBoundingClientRect().height }));
  ok(size.pill <= 26.5 && size.room <= 40, 'the measures stay 6.38\'s: the top bar\'s keys 26 px at most, the rail\'s rooms as they were', size);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close();
  // the other editions carry no Author Studio, and so not r353
  if (GIFT) { const b2 = await pw.chromium.launch(); const q = await (await b2.newContext()).newPage(); await q.goto(GIFT, { waitUntil: 'domcontentloaded', timeout: 300000 }); await q.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
    const g = await q.evaluate(() => ({ p353: window.__ingParts.p353 || null, studio: !!document.getElementById('ingAuthor') })); ok(!g.p353 && !g.studio, 'the gift edition carries neither the Author Studio nor r353', g); await b2.close(); }
  console.log(P + ' passed, ' + F + ' failed'); process.exit(F ? 1 : 0);
})().catch((e) => { console.log('FAIL the test stopped: ' + (e && e.stack || e)); process.exit(1); });
