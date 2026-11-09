// Floating windows, her sticky notes and the side buttons (Ingenium 6.65, modules/r123.js). Her words (9 November 2026):
// "Schedae's sticky notes open behind the exported floating windows inside of the app and they never float over the exported
// floating windows page, only when the apps main page is open do I see the side emoji buttons and have the sticky notes inside of
// the Tabula page." Until 6.64 a floating window stood on layer 600 and took the next number at every press (up to 1800), while
// the notes stood on 120 and the side buttons on 130. Now the windows keep to 600 to 607, and while one is shown the notes (608)
// and the side buttons (609) stand above it; the chat's drawer, Schedae's panel and every dialog stay above all of them.
//   node rig/t_665_windows.js <Ingenium page url (an edition with the five apps)> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_665_windows.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; return !!c; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(400);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} });
  const z = (sel) => p.evaluate((s) => { const e = document.querySelector(s); return e ? +getComputedStyle(e).zIndex : null; }, sel);
  const wins = () => p.evaluate(() => [...document.querySelectorAll('.ing-fw')].map(e => ({ id: e.id, z: +getComputedStyle(e).zIndex, folded: e.classList.contains('folded') })));
  // what stands on top at a point: 'note', 'fab', 'win', 'modal', or the element's name
  const topAt = (x, y) => p.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); if (!e) return 'nothing'; if (e.closest('.sticky-note')) return 'note'; if (e.closest('.rail-btn')) return 'fab:' + e.closest('.rail-btn').id; if (e.closest('#modalRoot')) return 'modal'; if (e.closest('.ing-fw')) return 'win:' + e.closest('.ing-fw').id; return e.id || String(e.className).slice(0, 30) || e.tagName; }, [x, y]);
  const centre = (sel) => p.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, sel);

  // 1. before any window: the layers as they always were
  ok((await z('#notesLayer')) === 120 && (await z('#fabNote')) === 130 && !(await p.evaluate(() => document.body.classList.contains('ing-fw-up'))), 'with no floating window, the notes stand on layer 120 and the side buttons on 130, as before');

  // 2. a sticky note, made from the side button
  await p.click('#fabNote'); await p.waitForTimeout(700);
  await p.evaluate(() => { [...document.querySelectorAll('button')].find(e => e.textContent.trim() === 'New note' && e.offsetParent).click(); }); await p.waitForTimeout(900);
  await p.keyboard.press('Escape'); await p.waitForTimeout(400);
  await p.evaluate(() => { const bk = document.querySelector('.schedae-back'); if (bk && getComputedStyle(bk).display !== 'none') bk.click(); }); await p.waitForTimeout(400);
  ok((await p.evaluate(() => document.querySelectorAll('.sticky-note').length)) === 1, 'a sticky note is made from Schedae\'s side button');

  // 3. Tabula full width: the note and the side buttons show over it (as they did)
  await p.evaluate(() => go('tabula')); await p.waitForTimeout(5000);
  let nc = await centre('.sticky-note'), fc = await centre('#fabNote');
  ok((await topAt(nc[0], nc[1])) === 'note' && (await topAt(fc[0], fc[1])) === 'fab:fabNote', 'over Tabula open full width, the note and the side buttons are on top', [await topAt(nc[0], nc[1]), await topAt(fc[0], fc[1])]);

  // 4. Tabula floated into a window, then moved over the note
  await p.click('#fabFloat'); await p.waitForTimeout(2500);
  let w = await wins();
  ok(w.length === 1 && w[0].z >= 600 && w[0].z <= 607, 'the float key makes a floating window, on a layer between 600 and 607', w);
  ok(await p.evaluate(() => document.body.classList.contains('ing-fw-up')), 'the page knows a floating window is shown');
  ok((await z('#notesLayer')) === 608 && (await z('#fabNote')) === 609 && (await z('#fabBell')) === 609, 'the notes step up to 608 and the side buttons to 609, above the window', [await z('#notesLayer'), await z('#fabNote')]);
  const bar = await p.evaluate(() => { const r = document.querySelector('.ing-fw .ing-fw-title').getBoundingClientRect(); return [r.left + 40, r.top + r.height / 2]; });
  await p.mouse.move(bar[0], bar[1]); await p.mouse.down(); await p.mouse.move(bar[0] - 150, bar[1] - 20, { steps: 6 }); await p.mouse.move(bar[0] - 215, bar[1] - 40, { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(400);
  nc = await centre('.sticky-note');
  const over = await p.evaluate(([x, y]) => { const r = document.querySelector('.ing-fw').getBoundingClientRect(); return x > r.left && x < r.right && y > r.top && y < r.bottom; }, nc);
  ok(over, 'the window is moved so that it lies under the note', await p.evaluate(() => document.querySelector('.ing-fw').getBoundingClientRect().toJSON()));
  ok((await topAt(nc[0], nc[1])) === 'note', 'the sticky note floats over the floating window', await topAt(nc[0], nc[1]));
  await p.screenshot({ path: path.join(OUT, 'windows_note_over.png') });

  // 5. the window filling the screen: the side buttons stay on top of it
  await p.evaluate(() => { const k = [...document.querySelectorAll('.ing-fw .ing-fw-keys button')].find(x => /Fill the screen/.test(x.title || x.getAttribute('aria-label') || '')); if (k) k.click(); }); await p.waitForTimeout(600);
  fc = await centre('#fabNote'); const bc = await centre('#fabBell');
  const covers = await p.evaluate(([x, y]) => { const r = document.querySelector('.ing-fw').getBoundingClientRect(); return x > r.left && x < r.right && y > r.top && y < r.bottom; }, fc);
  ok(covers, 'filling the screen, the window lies under the side column');
  ok((await topAt(fc[0], fc[1])) === 'fab:fabNote' && (await topAt(bc[0], bc[1])) === 'fab:fabBell', 'the side buttons stay on top of the floating window', [await topAt(fc[0], fc[1]), await topAt(bc[0], bc[1])]);
  await p.screenshot({ path: path.join(OUT, 'windows_filled.png') });
  await p.evaluate(() => { const k = [...document.querySelectorAll('.ing-fw .ing-fw-keys button')].find(x => /Restore the size/.test(x.title || x.getAttribute('aria-label') || '')); if (k) k.click(); }); await p.waitForTimeout(500);

  // 6. pressed three hundred times, the window never climbs: a dialog and Schedae's panel still open above it
  await p.evaluate(() => { const e = document.querySelector('.ing-fw .ing-fw-bar'); for (let i = 0; i < 300; i++) e.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 1, clientX: 5, clientY: 5 })); document.querySelector('.ing-fw .ing-fw-bar').dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 1 })); }); await p.waitForTimeout(300);
  w = await wins();
  ok(w[0].z >= 600 && w[0].z <= 607, 'after three hundred presses the window is still on its own layers (it used to climb by one at each press)', w);
  await p.click('#fabNote'); await p.waitForTimeout(600);
  const sp = await p.evaluate(() => { const e = document.getElementById('schedaePanel'); const r = e.getBoundingClientRect(); const t = document.elementFromPoint(r.left + r.width / 2, r.top + 20); return { z: +getComputedStyle(e).zIndex, top: !!(t && t.closest('#schedaePanel')) }; });
  ok(sp.z > 609 && sp.top, 'Schedae\'s panel opens above the window, the notes and the side buttons', sp);
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  await p.evaluate(() => { const bk = document.querySelector('.schedae-back'); if (bk && getComputedStyle(bk).display !== 'none') bk.click(); }); await p.waitForTimeout(300);
  await p.evaluate(() => { document.getElementById('modalBox').innerHTML = '<h3>A dialog</h3><p>Above every window.</p>'; openModal(); }); await p.waitForTimeout(400);
  const md = await p.evaluate(() => { const e = document.getElementById('modalBox'); const r = e.getBoundingClientRect(); const t = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return !!(t && t.closest('#modalRoot')); });
  ok(md, 'a dialog opens above the window');
  await p.evaluate(() => closeModal()); await p.waitForTimeout(300);

  // 7. a second window: the one pressed last is on top, both within their layers
  await p.evaluate(() => go('abacus')); await p.waitForTimeout(4500);
  await p.click('#fabFloat'); await p.waitForTimeout(2500);
  w = await wins();
  ok(w.length === 2 && w.every(x => x.z >= 600 && x.z <= 607) && w[0].z !== w[1].z, 'a second floating window: both between 600 and 607, each on its own layer', w);
  const top1 = w.slice().sort((a, b) => b.z - a.z)[0].id;
  ok(/abacus/.test(top1), 'the window opened last is on top', w);
  await p.evaluate(() => { document.querySelector('#ing-fw-tabula .ing-fw-bar').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 2, clientX: 5, clientY: 5 })); document.querySelector('#ing-fw-tabula .ing-fw-bar').dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 2 })); }); await p.waitForTimeout(300);
  w = await wins();
  ok(/tabula/.test(w.slice().sort((a, b) => b.z - a.z)[0].id) && w.every(x => x.z >= 600 && x.z <= 607), 'pressing the other brings it to the top', w);
  nc = await centre('.sticky-note');
  ok((await topAt(nc[0], nc[1])) === 'note', 'the note still floats over both', await topAt(nc[0], nc[1]));
  await p.screenshot({ path: path.join(OUT, 'windows_two.png') });

  // 8. folded away and closed: the layers go back
  await p.evaluate(() => { [...document.querySelectorAll('.ing-fw')].forEach(wn => { const k = [...wn.querySelectorAll('.ing-fw-keys button')].find(x => /fold|Fold|−|–/.test((x.title || '') + (x.getAttribute('aria-label') || '') + x.textContent)); if (k) k.click(); }); }); await p.waitForTimeout(600);
  w = await wins();
  ok(w.every(x => x.folded) && !(await p.evaluate(() => document.body.classList.contains('ing-fw-up'))) && (await z('#notesLayer')) === 120 && (await z('#fabNote')) === 130, 'with every window folded into its tab, the notes and the side buttons go back to their own layers', { w, n: await z('#notesLayer'), f: await z('#fabNote') });
  await p.evaluate(() => { const t = document.querySelector('#ing-deskbar button[data-tab^="tabula"], #ing-deskbar button[data-tab*="tabula"]'); if (t) t.click(); }); await p.waitForTimeout(700);
  ok(await p.evaluate(() => document.body.classList.contains('ing-fw-up')) && (await z('#notesLayer')) === 608, 'a window brought back from its tab lifts them again', await wins());
  await p.evaluate(() => { [...document.querySelectorAll('.ing-fw')].forEach(wn => { const k = [...wn.querySelectorAll('.ing-fw-keys button')].find(x => /^Close/.test((x.title || '') + '') || /^Close/.test(x.getAttribute('aria-label') || '') || x.textContent.trim() === '✕' || x.textContent.trim() === '×'); if (k) k.click(); }); }); await p.waitForTimeout(900);
  w = await wins();
  ok(w.length === 0 && !(await p.evaluate(() => document.body.classList.contains('ing-fw-up'))) && (await z('#notesLayer')) === 120, 'with the windows closed, everything is as it was', { w, n: await z('#notesLayer') });

  ok(errs.length === 0, 'no page error', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.log('FAIL the test stopped: ' + (e && e.stack || e)); process.exit(1); });
