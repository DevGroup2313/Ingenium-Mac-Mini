// Ingenium 7.47 · Code's start window in Vocatio's drop zone (modules/r335.js), at 1280 by 800.
// Her words (19 November 2026), on its live preview: "I approve of the preview but I only want the area to be raised when I hover over it,
// it can be flat on rest mode."
//   1. each of the six cards wears the drop zone's dashed lilac edge, its lilac light and rounder corners, and is flat at rest, as the drop zone is
//   2. under the pointer it lifts two pixels with a shadow; pressed, it sinks
//   3. by night, the drop zone's night colours, flat at rest and raised under the pointer
//   4. its words and their order unchanged; the cards still open what they did; Minimal motion keeps them still
//     node rig/t_747_code_raised.js http://127.0.0.1:8193/<page>
const pw = require('/opt/node-tools/node_modules/playwright');
const URL = process.argv[2] || 'http://127.0.0.1:8193/ingenium.html';
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? P++ : F++; }
const ty = (t) => { const m = /matrix\(([^)]+)\)/.exec(t || ''); return m ? +m[1].split(',')[5] : 0; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1280, height: 800 } })).newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  await p.goto(URL, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const open = async (theme) => { await p.evaluate((t) => { state.theme = t; try { applyTheme(); } catch (e) {} try { closeModal(); } catch (e) {} go('code'); }, theme); await p.waitForTimeout(700);
    await p.evaluate(() => ccWelcome()); await p.waitForSelector('#modalBox .cc-start .cc-card', { timeout: 15000 }); await p.mouse.move(2, 790); await p.waitForTimeout(500); };
  const cards = () => p.evaluate(() => [...document.querySelectorAll('#modalBox .cc-start .cc-card, #modalBox .cc-start .cc-new')].map((c) => { const s = getComputedStyle(c);
    return { t: (c.querySelector('b') || c).textContent.trim(), border: s.borderTopStyle, bc: s.borderTopColor, radius: s.borderTopLeftRadius, bg: s.backgroundImage, sh: s.boxShadow, tf: s.transform }; }));
  const hover = async (i) => { const box = await p.evaluate((i) => { const c = [...document.querySelectorAll('#modalBox .cc-start .cc-card, #modalBox .cc-start .cc-new')][i]; const r = c.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, i);
    await p.mouse.move(box[0], box[1]); await p.waitForTimeout(450);
    return p.evaluate((i) => { const c = [...document.querySelectorAll('#modalBox .cc-start .cc-card, #modalBox .cc-start .cc-new')][i]; const s = getComputedStyle(c); return { sh: s.boxShadow, tf: s.transform }; }, i); };

  // 1. by day, at rest
  await open('day');
  let cs = await cards();
  ok(cs.length === 6 && cs.map((c) => c.t).join('|') === 'New app|⑂ From GitHub|From Fabrica|Open an app file|Open a folder|Your apps' || (cs.length === 6 && cs[0].t === 'New app' && /From GitHub/.test(cs[1].t) && cs[2].t === 'From Fabrica' && cs[5].t === 'Your apps'),
    'six cards, their words and their order unchanged', cs.map((c) => c.t));
  ok(cs.every((c) => c.border === 'dashed' && /106, 63, 181/.test(c.bc) && c.radius === '16px' && /linear-gradient/.test(c.bg)), "each wears the drop zone's dashed lilac edge, its lilac light and its rounder corners", cs[0]);
  ok(cs.every((c) => c.sh === 'none' && ty(c.tf) === 0), 'each is flat at rest, as the drop zone is', cs.map((c) => c.sh.slice(0, 40)));
  // 2. under the pointer, pressed
  const h = await hover(2);
  ok(h.sh !== 'none' && Math.abs(ty(h.tf) + 2) < 0.6, 'under the pointer a card lifts two pixels with a shadow', h);
  const rest = await p.evaluate(() => { const c = [...document.querySelectorAll('#modalBox .cc-start .cc-card, #modalBox .cc-start .cc-new')][0]; return getComputedStyle(c).boxShadow; });
  ok(rest === 'none', 'the others stay flat meanwhile', rest);
  await p.mouse.down(); await p.waitForTimeout(250);
  const d = await p.evaluate(() => { const c = [...document.querySelectorAll('#modalBox .cc-start .cc-card, #modalBox .cc-start .cc-new')][2]; const s = getComputedStyle(c); return { sh: s.boxShadow, tf: s.transform }; });
  await p.mouse.move(2, 790); await p.mouse.up(); await p.waitForTimeout(400);
  ok(ty(d.tf) > 0 && d.sh !== 'none', 'pressed, it sinks', d);
  ok(await p.evaluate(() => !!document.querySelector('#modalBox .cc-start')), 'pressing and letting go away from a card opens nothing');
  // the drop zone itself, for comparison: flat at rest
  // 3. by night
  await open('night');
  cs = await cards();
  ok(cs.every((c) => c.border === 'dashed' && /183, 156, 230/.test(c.bc) && c.sh === 'none'), "by night the drop zone's night edge, flat at rest", cs[0]);
  const hn = await hover(0);
  ok(hn.sh !== 'none' && Math.abs(ty(hn.tf) + 2) < 0.6 && /0, 0, 0/.test(hn.sh), 'by night, raised under the pointer with a dark shadow', hn);
  // 4. a card still opens what it did; Minimal motion
  await open('day');
  await p.click('#modalBox .cc-start [data-a="fabrica"]'); await p.waitForTimeout(1200);
  ok(await p.evaluate(() => !!document.querySelector('#r333List') || /Fabrica/.test((document.getElementById('modalBox') || {}).textContent || '')), 'From Fabrica still opens its list of apps');
  await p.evaluate(() => { try { closeModal(); } catch (e) {} document.querySelectorAll('.fbx.r333x').forEach((x) => x.remove()); document.body.setAttribute('data-motion', 'minimal'); });
  await open('day'); await p.evaluate(() => document.body.setAttribute('data-motion', 'minimal'));
  const hm = await hover(1);
  ok(ty(hm.tf) === 0, 'with Minimal motion a card does not move', hm);
  ok(!errs.length, 'no error on the page', errs);
  console.log('\n' + P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})();
