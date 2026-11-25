// Ingenium 7.82: Ingenia's app logos pressed as Ingenium's own logo is (modules/r378.js), and Fabrica's little diamond left in view when
// pressed (r294.js). Her words (25 November 2026): "The apps logos on the Ingenia folders page are animated but are still not clickable. I
// was very clear about wanting them to be made into clickable buttons the same way Ingenium's engine logo button is"; "I can't see the
// animation of the diamond after clicking on it because the mouse tip is in the shape of a little white hand and entirely covers the little
// diamond and obscures it from view".
//   node rig/t_782_press.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2), URL_ = args.find(a => /^https?:\/\//.test(a)), OUT = args.find(a => !/^https?:\/\//.test(a)) || '/tmp';
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); p.setDefaultTimeout(90000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await sleep(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(800);
  await p.evaluate(() => { window.__snd = []; if (window.IngSound) { const o = IngSound.play; IngSound.play = function (n) { window.__snd.push(n); try { return o.apply(this, arguments); } catch (e) {} }; } });
  // 1. Ingenia: the open folder's logo is a button, pressed as Ingenium's own logo is
  await p.evaluate(() => go('folders')); await sleep(1200);
  await p.evaluate(() => { const c = [...document.querySelectorAll('#page-folders .fd-file')].find(x => /Ingenium/.test(x.textContent)) || document.querySelector('#page-folders .fd-file'); if (c) c.click(); }); await sleep(1500);
  const k0 = await p.evaluate(() => { const k = document.querySelector('#page-folders .fd-oh .ig-ls.ig-key'); if (!k) return null; const r = k.getBoundingClientRect(); return { role: k.getAttribute('role'), tab: k.tabIndex, label: k.getAttribute('aria-label'), cursor: getComputedStyle(k).cursor, x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width }; });
  ok(k0 && k0.role === 'button' && k0.tab === 0 && k0.cursor === 'pointer' && /logo/.test(k0.label), "the open folder's logo is a button: the pointer's hand, the keyboard, and a name", k0);
  if (k0) {
    await p.mouse.move(k0.x, k0.y); await sleep(450);
    const hov = await p.evaluate(() => document.querySelector('#page-folders .fd-oh .ig-ls').classList.contains('hov'));
    await p.mouse.down(); await sleep(160);
    const dn = await p.evaluate(() => { const k = document.querySelector('#page-folders .fd-oh .ig-ls'), t = k.querySelector('.ig-ls-tilt'); return { down: k.classList.contains('down'), tf: getComputedStyle(t).transform }; });
    await p.screenshot({ path: OUT + '/logo_down.png', clip: { x: k0.x - 70, y: k0.y - 70, width: 140, height: 140 } });
    await p.mouse.up(); await sleep(120);
    const up = await p.evaluate(() => { const k = document.querySelector('#page-folders .fd-oh .ig-ls'); return { knock: k.classList.contains('knock'), igz: getComputedStyle(k).getPropertyValue('--igz').trim(), anim: getComputedStyle(k.querySelector('.ig-ls-tilt')).animationName, snd: window.__snd.slice() }; });
    await p.screenshot({ path: OUT + '/logo_knock.png', clip: { x: k0.x - 70, y: k0.y - 70, width: 140, height: 140 } });
    ok(hov && dn.down, 'under the pointer it lifts; pressed, it sinks', { hov, dn });
    ok(up.knock && up.anim === 'igKnock' && up.igz !== '' && up.igz !== '1' && up.snd.indexOf('keys') >= 0, "let go, it knocks back up, its layers draw together and part (their depth mid-way: " + up.igz + "), with Ingenium's key sound", up);
    await sleep(1100);
    const rest = await p.evaluate(() => { const k = document.querySelector('#page-folders .fd-oh .ig-ls'); return { knock: k.classList.contains('knock'), igz: getComputedStyle(k).getPropertyValue('--igz').trim() }; });
    ok(!rest.knock && (rest.igz === '1' || rest.igz === ''), 'and settles, its layers back at their depths', rest);
    await p.evaluate(() => { window.__snd = []; document.querySelector('#page-folders .fd-oh .ig-ls').focus(); }); await p.keyboard.press('Enter'); await sleep(260);
    const kb = await p.evaluate(() => ({ knock: document.querySelector('#page-folders .fd-oh .ig-ls').classList.contains('knock'), snd: window.__snd.slice() }));
    ok(kb.knock && kb.snd.indexOf('keys') >= 0, 'the keyboard presses it the same way (Enter or Space)', kb);
  }
  // the logos on the folders' tabs and files sink and knock when their folder is pressed
  await p.evaluate(() => { const bc = [...document.querySelectorAll('#page-folders a, #page-folders button')].find(x => x.textContent.trim() === 'Ingenia' && x.offsetParent && x.getBoundingClientRect().top > 200); if (bc) bc.click(); else { try { state.folders.ui.open = null; IngFolders.paint(); } catch (e) {} } }); await sleep(1200);
  const t0 = await p.evaluate(() => { for (const f of document.querySelectorAll('#page-folders .fd-file, #page-folders .fd-front')) { const l = f.querySelector('.ig-ls'); if (!l || !f.offsetParent) continue; const r = l.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, e = document.elementFromPoint(x, y); if (e && l.contains(e)) return { x, y }; } return null; });
  if (t0) { await p.mouse.move(t0.x, t0.y); await p.mouse.down(); await sleep(120); const d1 = await p.evaluate(() => !!document.querySelector('#page-folders .ig-ls.down')); await p.mouse.up(); await sleep(80); const k1 = await p.evaluate(() => !!document.querySelector('#page-folders .ig-ls.knock'));
    ok(d1 && k1, "a folder's logo in the drawer sinks when pressed and knocks when let go", { d1, k1 }); } else ok(false, 'a folder file with a logo is in view');
  // 2. Fabrica's little diamond: over it the pointer is a small open ring; pressed, no grabbing hand; while it spins, no pointer at all
  await p.evaluate(() => go('fabrica')); await sleep(4000);
  const g0 = await p.evaluate(() => window.IngTree && IngTree.gems ? IngTree.gems() : null);
  const pt = g0 && g0.at[0] ? await p.evaluate(([gx, gy]) => { const c = document.querySelector('#page-fabrica canvas'), r = c.getBoundingClientRect(), s = r.width / 460; return { x: r.left + gx * s, y: r.top + gy * s }; }, [g0.at[0][0], g0.at[0][1]]) : null;
  ok(!!pt, 'the tree has its little diamond', g0);
  if (pt) {
    await p.mouse.move(pt.x, pt.y); await sleep(500);
    const c1 = await p.evaluate(() => { const s = document.querySelector('#page-fabrica .fbt-stage'); return { gem: s.classList.contains('fbt-on-gem'), bead: s.classList.contains('fbt-on-bead'), cursor: getComputedStyle(s).cursor.slice(0, 40), hover: IngTree.gems().hover }; });
    ok(c1.gem && !c1.bead && /^url\("data:image\/png/.test(c1.cursor) && c1.hover >= 0, 'over the diamond the pointer is a small open ring, not the hand', c1);
    await p.mouse.down(); await sleep(120);
    const c2 = await p.evaluate(() => { const s = document.querySelector('#page-fabrica .fbt-stage'); return { drag: s.classList.contains('fbt-drag'), cursor: getComputedStyle(s).cursor.slice(0, 40) }; });
    ok(!c2.drag && /^url\(/.test(c2.cursor), 'pressed, it does not turn into the grabbing hand', c2);
    await p.mouse.up(); await sleep(200);
    const c3 = await p.evaluate(() => { const s = document.querySelector('#page-fabrica .fbt-stage'); return { spin: IngTree.gems().spin, cls: s.classList.contains('fbt-gem-spin'), cursor: getComputedStyle(s).cursor }; });
    await p.screenshot({ path: OUT + '/diamond_spin.png', clip: { x: pt.x - 80, y: pt.y - 80, width: 160, height: 160 } });
    ok(c3.spin && c3.cls && c3.cursor === 'none', 'while it spins the pointer steps aside, so the stone is in full view', c3);
    await sleep(1500);
    const c4 = await p.evaluate(() => { const s = document.querySelector('#page-fabrica .fbt-stage'); return { cls: s.classList.contains('fbt-gem-spin'), cursor: getComputedStyle(s).cursor.slice(0, 20) }; });
    ok(!c4.cls && /^url\(/.test(c4.cursor), 'the spin over, the ring comes back', c4);
    await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await sleep(600);
    const c5 = await p.evaluate(() => getComputedStyle(document.querySelector('#page-fabrica .fbt-stage')).cursor.slice(0, 120));
    ok(/^url\(/.test(c5) && c5 !== c4.cursor, 'by night the ring is lavender', c5.slice(0, 60));
    await p.mouse.move(pt.x + 200, pt.y + 200); await sleep(300);
    // dragging from the diamond still turns the tree, with the grabbing hand
    await p.evaluate(() => document.body.setAttribute('data-theme', 'day'));
    await p.mouse.move(pt.x, pt.y); await sleep(300); await p.mouse.down(); await p.mouse.move(pt.x + 40, pt.y, { steps: 6 }); await sleep(100);
    const c6 = await p.evaluate(() => document.querySelector('#page-fabrica .fbt-stage').classList.contains('fbt-drag'));
    await p.mouse.up();
    ok(c6, 'dragged from the diamond, the tree still turns with the grabbing hand', c6);
  }
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
