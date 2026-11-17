// Ingenium 7.30: the diamond's colours, refined (modules/r314.js, with modules/r292.js), as her approved live preview has them
// (source/previews/diamond_colours_v2, version 4), with her one change: no circle around the stone at the top of the panel. Her words
// (17 November 2026): the key "a little button on the top right side of the 3D header of the Adamas page in the same format as
// Ingenium's introduction door"; "I don't want any purple shading over the button when I hover over it"; "the panel to open beside the
// diamond"; "the crystals diamonds to be animated and be 3D alone without the acrylic button"; "the check mark to be Ingenium's colour";
// "no scroll bar should ever be in view unless stated otherwise"; "I hate long wide buttons"; "remove the white circle that is around the
// diamond at the top of the panel". Supersedes rig/t_729_diamond_colours.js (7.29's key in the row and panel over the words).
// Checks, in Chromium (software WebGL), at 1440 by 900 and on a phone's width:
//   - the key: in the head's top-right corner, the welcome door's sign-in key in size and place (a well 37 by 32, 15 from the top and the
//     right); under the pointer no tint; the head's row of keys is Run your page and Load a sample again;
//   - pressed, the panel opens beside the diamond: the words step aside, the diamond moves toward the middle, the panel stands to its
//     right without covering it; no circle around the stone at its top; no scroll bar in view, though it scrolls;
//   - the stones are the real diamond: six choices, each a turning strip of its own renderer's frames, its name beneath, no key behind;
//     the band's two choices are the real holder; the light is Ingenium's switch (.dmc-sw);
//   - each choice reaches the diamond (IngDiamond.look, IngDiamond.tinted) and is kept (state.diamond); a deep ruby turns the stone red;
//     Escape closes and gives the key its focus; kept after the page opens again; Back to Ingenium's own; Settings, Everyday, Find a setting,
//     Show me on Adamas; on a phone's width the panel stands below, within the screen; no page error.
//   node rig/t_730_diamond_colours.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [U, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const MEAN = 'import sys;from PIL import Image;im=Image.open(sys.argv[1]).convert("RGB");px=list(im.getdata());n=len(px);print(",".join(str(round(sum(p[i] for p in px)/n,1)) for i in range(3)))';
const mean = f => cp.execFileSync('python3', ['-I', '-W', 'ignore', '-c', MEAN, f]).toString().trim().split(',').map(Number);
(async () => {
  const b = await pw.chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); p.setDefaultTimeout(180000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const open = async (pg) => { await pg.goto(U, { timeout: 600000 }); await pg.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await pg.waitForTimeout(1200);
    await pg.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme(); window.__tFix = 3.2; go('build'); });
    await pg.waitForFunction(() => !!document.getElementById('bdColours'), null, { timeout: 20000 }).catch(() => {}); await pg.waitForTimeout(1500); };
  await open(p);
  await p.evaluate(() => { const h = document.querySelector('#page-build > .skh'); h.scrollIntoView({ block: 'start' }); window.scrollBy(0, -70); }); await p.waitForTimeout(800);
  const stoneShot = async (name) => { await p.waitForTimeout(1600);
    const r = await p.evaluate(() => { const c = document.querySelector('#page-build .skh-obj canvas').getBoundingClientRect(); return { x: c.left + c.width * 0.36, y: c.top + c.height * 0.18, width: c.width * 0.28, height: c.height * 0.16 }; });
    const f = path.join(OUT, name + '.png'); await p.screenshot({ path: f, clip: r }); return mean(f); };

  // the key, in the corner, as the welcome door's sign-in key
  const k = await p.evaluate(() => { const b = document.getElementById('bdColours'), pill = b && b.closest('.dmc-pill'), h = document.querySelector('#page-build > .skh'); if (!b || !pill) return { b: !!b, pill: !!pill };
    const r = pill.getBoundingClientRect(), hr = h.getBoundingClientRect(); return { label: b.getAttribute('aria-label'), w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top - hr.top), right: Math.round(hr.right - r.right),
      row: [...h.querySelectorAll('.skh-keys > *')].map(x => x.textContent.trim()), expanded: b.getAttribute('aria-expanded') }; });
  ok(k.label === "The diamond's colours" && k.w === 37 && k.h === 32 && k.top === 15 && k.right === 15 && k.expanded === 'false', 'the key: in the head\'s top-right corner, the welcome door\'s sign-in key in size and place', k);
  ok(JSON.stringify(k.row) === JSON.stringify(['Run your page', 'Load a sample']), 'the head\'s row of keys is Run your page and Load a sample again', k.row);
  await p.hover('#bdColours'); await p.waitForTimeout(400);
  const hv = await p.evaluate(() => { const cs = getComputedStyle(document.getElementById('bdColours')); return { bg: cs.backgroundColor, img: cs.backgroundImage }; });
  ok(/rgba\(0, 0, 0, 0\)|transparent/.test(hv.bg) && hv.img === 'none', 'under the pointer, no tint behind the key', hv);
  await p.mouse.move(5, 5);
  const violet = await stoneShot('stone_0_by_hour');
  // pressed: beside the diamond
  const before = await p.evaluate(() => { const c = document.querySelector('#page-build .skh-obj canvas').getBoundingClientRect(); return Math.round(c.left + c.width / 2); });
  await p.click('#bdColours'); await p.waitForTimeout(1400);
  const pn = await p.evaluate(() => { const d = document.querySelector('#page-build .dmc'), h = document.querySelector('#page-build > .skh'), c = document.querySelector('#page-build .skh-obj canvas'); if (!d) return null;
    const a = d.getBoundingClientRect(), cr = c.getBoundingClientRect(), w = h.querySelector('.skh-words'), sc = d.querySelector('.dmc-scroll'), set = d.querySelector('.dmc-setting'), cs = getComputedStyle(set);
    return { side: d.classList.contains('dmc-side'), left: Math.round(a.left), diamondMid: Math.round(cr.left + cr.width / 2), stoneRight: Math.round(cr.left + cr.width * 0.68), words: getComputedStyle(w).opacity,
      expanded: document.getElementById('bdColours').getAttribute('aria-expanded'), circle: { bg: cs.backgroundImage, radius: cs.borderRadius, shadow: cs.boxShadow }, bar: sc.offsetWidth - sc.clientWidth, scrolls: sc.scrollHeight > sc.clientHeight }; });
  ok(pn && pn.side && pn.stoneRight <= pn.left && pn.diamondMid < before - 40 && pn.words === '0' && pn.expanded === 'true', 'pressed, the panel opens beside the diamond: the words step aside, the diamond moves toward the middle', pn && { left: pn.left, stone: pn.stoneRight, mid: [before, pn.diamondMid], words: pn.words });
  ok(pn && pn.circle.bg === 'none' && /none/.test(pn.circle.shadow), 'no circle around the stone at the top of the panel', pn && pn.circle);
  ok(pn && pn.bar === 0, 'no scroll bar in view in the panel (it scrolls: ' + (pn && pn.scrolls) + ')', pn && { bar: pn.bar });
  const st = await p.evaluate(() => { const d = document.querySelector('#page-build .dmc'); const looks = [...d.querySelectorAll('.dmc-c[data-look]')];
    return { n: looks.length, names: looks.map(x => (x.querySelector('.dmc-n') || {}).textContent), real: looks.every(x => { const i = x.querySelector('.dmc-st img'); return i && /^data:image\/(webp|png)/.test(i.src) && i.naturalWidth > i.naturalHeight * 10; }),
      turning: looks.every(x => x.querySelector('.dmc-st img').getAnimations().length > 0), keyBehind: looks.some(x => { const cs = getComputedStyle(x); return cs.backgroundImage !== 'none' || !/rgba\(0, 0, 0, 0\)/.test(cs.backgroundColor) || cs.boxShadow !== 'none'; }),
      band: [...d.querySelectorAll('.dmc-sec')[1].querySelectorAll('.dmc-c')].map(x => ({ n: (x.querySelector('.dmc-n') || {}).textContent, holder: !!x.querySelector('.dmc-hd img'), w: Math.round(x.getBoundingClientRect().width) })),
      sw: !!d.querySelector('.dmc-sw[role="switch"]') && !d.querySelector('input[type="checkbox"]'), swOn: d.querySelector('.dmc-sw').getAttribute('aria-checked'), checked: [...d.querySelectorAll('.dmc-c[aria-checked="true"]')].map(x => (x.querySelector('.dmc-n') || {}).textContent) }; });
  ok(st.n === 6 && st.names.join() === 'By the hour,Clear crystal,Lavender,Purple,Night stone,Your own colour' && st.real && st.turning && !st.keyBehind, 'the stones are the real diamond, turning, each with its name beneath and no key behind it', st);
  ok(st.band.length === 2 && st.band.every(x => x.holder && x.w <= 100) && st.sw && st.swOn === 'true' && st.checked.join() === "By the hour,Ingenium's violet", 'the band: two small real holders, no long keys; the light: Ingenium\'s switch; at first, Ingenium\'s own', st);
  await p.screenshot({ path: path.join(OUT, 'panel_open.png') });
  // choices reach the diamond and are kept
  await p.click('#page-build .dmc .dmc-c[data-look="lavender"]'); await p.waitForTimeout(400);
  const lv = await p.evaluate(() => ({ look: IngDiamond.look(), auto: IngDiamond.auto(), kept: state.diamond && state.diamond.look }));
  ok(lv.look === 'lavender' && lv.auto === false && lv.kept === 'lavender', 'Lavender: the diamond keeps that look, and it is kept in the settings', lv);
  await p.click('#page-build .dmc .dmc-c[data-look="own"]'); await p.waitForTimeout(300);
  await p.click('#page-build .dmc .dmc-own:not([hidden]) .dmc-s[data-hex="#c8143c"]'); await p.waitForTimeout(300);
  await p.evaluate(() => { const r = document.querySelector('#page-build .dmc .dmc-own:not([hidden]) input[type=range]'); r.value = '0.95'; r.dispatchEvent(new Event('input', { bubbles: true })); }); await p.waitForTimeout(400);
  const rb = await p.evaluate(() => ({ t: IngDiamond.tinted(), kept: state.diamond }));
  ok(Math.abs(rb.t.stone[0] - 200 / 255) < 0.01 && rb.t.stone[3] === 0.95 && rb.kept.look === 'own' && rb.kept.stone === '#c8143c' && rb.kept.depth === 0.95, 'Ruby, deep: the stone takes the colour and its depth, kept', rb);
  const red = await stoneShot('stone_1_ruby_deep');
  ok(red[0] > red[1] + 25 && red[0] > red[2] && violet[2] > violet[1], 'the stone is red where it was violet (its picture, measured)', { by_hour: violet, ruby: red });
  const band = p.locator('#page-build .dmc .dmc-sec').nth(1);
  await band.locator('.dmc-c', { hasText: 'Your own colour' }).click(); await p.waitForTimeout(300);
  await band.locator('.dmc-own:not([hidden]) .dmc-s[data-hex="#2f5bd3"]').click(); await p.waitForTimeout(300);
  await p.click('#page-build .dmc .dmc-sw'); await p.waitForTimeout(300);
  const bd = await p.evaluate(() => ({ t: IngDiamond.tinted(), kept: state.diamond, sw: document.querySelector('#page-build .dmc .dmc-sw').getAttribute('aria-checked') }));
  ok(bd.t.band[3] === 1 && Math.abs(bd.t.band[2] - 211 / 255 * 0.92) < 0.01 && bd.kept.band === '#2f5bd3' && bd.kept.light === false && bd.sw === 'false', 'the band in Sapphire, and the light switched off, kept', bd.kept);
  await p.focus('#page-build .dmc .dmc-c[data-look="own"]'); await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  /* the words fade back in 0.32 s from the next frame; in software WebGL a frame of the diamond can take a second, so the fade is awaited */
  const esc = await p.evaluate(async () => { const w = document.querySelector('#page-build .skh-words'); await Promise.race([Promise.all(w.getAnimations().map(a => a.finished.catch(() => {}))), new Promise(r => setTimeout(r, 8000))]);
    return { open: !!document.querySelector('#page-build .dmc'), focus: document.activeElement && document.activeElement.id, words: getComputedStyle(w).opacity }; });
  ok(!esc.open && esc.focus === 'bdColours' && esc.words === '1', 'Escape closes the panel, the words come back, and the key has the focus', esc);
  await p.evaluate(() => { try { saveState(); } catch (e) {} }); await p.waitForTimeout(1500);
  const p2 = await ctx.newPage(); p2.setDefaultTimeout(180000); p2.on('pageerror', e => errs.push('again: ' + e.message.slice(0, 200)));
  await open(p2); const again = await p2.evaluate(() => ({ kept: state.diamond, t: IngDiamond.tinted() })); await p2.close();
  ok(again.kept && again.kept.stone === '#c8143c' && again.t.stone[3] === 0.95 && again.t.band[3] === 1, 'opened again, the diamond takes her colours at once', again);
  await p.click('#bdColours'); await p.waitForTimeout(800); await p.click('#page-build .dmc .dmc-foot .dmc-k:not(.pri)'); await p.waitForTimeout(500);
  const rs = await p.evaluate(() => ({ kept: state.diamond === undefined, t: IngDiamond.tinted(), auto: IngDiamond.auto(), light: document.querySelector('#page-build .dmc .dmc-sw').getAttribute('aria-checked') }));
  ok(rs.kept && rs.t.stone.every(v => v === 0) && rs.t.band.every(v => v === 0) && rs.auto === true && rs.light === 'true', 'Back to Ingenium\'s own: no colour of her own, by the hour, the light on', rs);
  await p.click('#page-build .dmc .dmc-foot .dmc-k.pri'); await p.waitForTimeout(400);
  const se = await p.evaluate(async () => { go('settings'); await new Promise(r => setTimeout(r, 600)); const c = document.getElementById('dmcCard'); const hits = IngRooms.find('diamond colour');
    return { card: !!c, room: c && IngRooms.roomOf(c), panel: !!(c && c.querySelector('.dmc .dmc-c[data-look="own"]')), hits: hits.map(h => h.card + ' in ' + h.room).slice(0, 4) }; });
  ok(se.card && se.room === 'everyday' && se.panel && se.hits.some(h => /^dmcCard in everyday$/.test(h)), 'Settings, Everyday holds the same panel, and Find a setting finds it', se);
  await p.evaluate(() => { IngRooms.open('settings', 'everyday'); const c = document.getElementById('dmcCard'); try { IngSettingsRaised.open(c); } catch (e) {} c.querySelector('.dmc-c[data-look="purple"]').click(); }); await p.waitForTimeout(300);
  const fs2 = await p.evaluate(() => ({ look: IngDiamond.look(), kept: state.diamond && state.diamond.look }));
  ok(fs2.look === 'purple' && fs2.kept === 'purple', 'a choice made in Settings reaches the diamond', fs2);
  await p.evaluate(() => [...document.querySelectorAll('#dmcCard .dmc-k.pri')].find(x => /Show me on Adamas/.test(x.textContent)).click()); await p.waitForTimeout(1800);
  const sh = await p.evaluate(() => ({ page: document.querySelector('section.section.active').id, open: !!document.querySelector('#page-build .dmc'), checked: [...document.querySelectorAll('#page-build .dmc .dmc-c[aria-checked="true"]')].map(x => (x.querySelector('.dmc-n') || {}).textContent) }));
  ok(sh.page === 'page-build' && sh.open && sh.checked[0] === 'Purple', 'Show me on Adamas opens Adamas with the panel open, showing the same choice', sh);
  await p.evaluate(() => { IngDiamondColours.reset(); IngDiamondColours.close(); });
  // a phone's width
  const ph = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); const q = await ph.newPage(); q.setDefaultTimeout(180000); q.on('pageerror', e => errs.push('phone: ' + e.message.slice(0, 200)));
  await open(q); await q.tap('#bdColours').catch(async () => { await q.click('#bdColours'); }); await q.waitForTimeout(900);
  const pp = await q.evaluate(() => { const d = document.querySelector('#page-build .dmc'); if (!d) return null; const r = d.getBoundingClientRect(), o = document.querySelector('#page-build .skh-obj').getBoundingClientRect();
    return { flow: d.classList.contains('dmc-flow'), left: Math.round(r.left), right: Math.round(r.right), width: innerWidth, below: r.top >= o.top, page: document.documentElement.scrollWidth <= innerWidth + 1 }; });
  ok(pp && pp.flow && pp.left >= 0 && pp.right <= pp.width && pp.page, 'on a phone\'s width the panel stands in the head\'s flow, within the screen', pp);
  await q.evaluate(() => document.querySelector('#page-build .dmc').scrollIntoView({ block: 'start' })); await q.waitForTimeout(500); await q.screenshot({ path: path.join(OUT, 'phone_panel.png') });
  await ph.close();
  const de = await p.evaluate(() => IngDiamond.state().err);
  ok(errs.length === 0 && !de, 'no page errors, and no error from the diamond\'s drawing', { errs, diamond: de });
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(String(e && e.stack || e).slice(0, 1200)); process.exit(2); });
