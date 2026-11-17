// SUPERSEDED in 7.30 by rig/t_730_diamond_colours.js: the key moved to the head's corner and the panel beside the diamond (her approved
// preview, source/previews/diamond_colours_v2). Kept as 7.29's test; it fails on 7.30 by design.
// Ingenium 7.29: the diamond's colours, within reach (modules/r314.js, with modules/r292.js). Her words (17 November 2026): "I want a
// clear way to edit Adamas' diamond and change the colours as I please, I can't locate the settings for it. Please make it accessible
// and visible for me." Checks, in Chromium (software WebGL), at 1440 by 900 and on a phone's width:
//   - Adamas's head has a key, Diamond colours, beside Run your page and Load a sample; pressed, it opens the panel beside the diamond,
//     not over it; Escape closes it and gives the key its focus back;
//   - the stone: By the hour, the four looks, a colour of her own (a jewel or any colour, and how deep); the holder's band; the light;
//     each choice reaches the diamond at once (IngDiamond.look and IngDiamond.tinted) and is kept in state.diamond;
//   - a deep ruby turns the stone red where it was violet (the picture of the stone, measured), and Back to Ingenium's own brings the
//     diamond back exactly as before (no colour of her own, By the hour);
//   - kept: after the page is opened again, the diamond takes her colours at once;
//   - Settings, Everyday holds the same panel ("The diamond on Adamas"), Find a setting finds it, and Show me on Adamas opens the head's;
//   - on a phone's width the panel stands under the keys, within the screen;
//   - no page errors and no error from the diamond's drawing.
//   node rig/t_729_diamond_colours.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [U, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
// the stone's mean colour, read from a picture of the middle of the canvas (the stone floats there, above its holder)
const MEAN = 'import sys;from PIL import Image;im=Image.open(sys.argv[1]).convert("RGB");px=list(im.getdata());n=len(px);print(",".join(str(round(sum(p[i] for p in px)/n,1)) for i in range(3)))';
const mean = f => cp.execFileSync('python3', ['-I', '-c', MEAN, f]).toString().trim().split(',').map(Number);
(async () => {
  const b = await pw.chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); p.setDefaultTimeout(180000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const open = async (pg) => { await pg.goto(U, { timeout: 600000 }); await pg.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await pg.waitForTimeout(1200);
    await pg.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme(); window.__tFix = 3.2; go('build'); });
    await pg.waitForFunction(() => !!document.getElementById('bdColours'), null, { timeout: 20000 }).catch(() => {}); await pg.waitForTimeout(1500); };
  await open(p);
  const stoneShot = async (name) => { await p.evaluate(() => { const h = document.querySelector('#page-build > .skh'); h.scrollIntoView({ block: 'start' }); window.scrollBy(0, -70); }); await p.waitForTimeout(1600);
    const r = await p.evaluate(() => { const c = document.querySelector('#page-build .skh-obj canvas').getBoundingClientRect(); return { x: c.left + c.width * 0.36, y: c.top + c.height * 0.18, width: c.width * 0.28, height: c.height * 0.16 }; });
    const f = path.join(OUT, name + '.png'); await p.screenshot({ path: f, clip: r }); return mean(f); };

  // the key, beside the head's other keys
  const k = await p.evaluate(() => { const b = document.getElementById('bdColours'), keys = b && b.parentElement; return b ? { text: b.textContent.trim(), inKeys: keys.classList.contains('skh-keys'), siblings: [...keys.children].map(x => x.textContent.trim()), shown: !!b.offsetParent, expanded: b.getAttribute('aria-expanded') } : null; });
  ok(k && k.text === 'Diamond colours' && k.inKeys && k.shown && k.siblings.includes('Run your page') && k.siblings.includes('Load a sample') && k.expanded === 'false', 'Adamas\'s head has a key, Diamond colours, beside its other keys', k);
  const violet = await stoneShot('stone_0_by_hour');
  // pressed (as she presses it), the panel opens beside the diamond
  await p.click('#bdColours'); await p.waitForTimeout(700);
  const pn = await p.evaluate(() => { const d = document.querySelector('#page-build .dmc'), o = document.querySelector('#page-build .skh-obj canvas'); if (!d) return null; const a = d.getBoundingClientRect(), c = o.getBoundingClientRect();
    return { over: d.classList.contains('dmc-over'), right: Math.round(a.right), diamondLeft: Math.round(c.left + c.width * 0.3), expanded: document.getElementById('bdColours').getAttribute('aria-expanded'),
      chips: [...d.querySelectorAll('.dmc-c')].map(x => x.textContent.trim()), checked: [...d.querySelectorAll('.dmc-c[aria-checked="true"]')].map(x => x.textContent.trim()), jewels: d.querySelectorAll('.dmc-s').length / 2,
      light: d.querySelector('.eswitch input').checked, focusIn: d.contains(document.activeElement) }; });
  ok(pn && pn.over && pn.right <= pn.diamondLeft && pn.expanded === 'true' && pn.focusIn, 'pressed, it opens the panel beside the diamond, not over it', pn && { right: pn.right, diamond: pn.diamondLeft, expanded: pn.expanded });
  ok(pn && ['By the hour', 'Clear crystal', 'Lavender', 'Purple', 'Night stone', 'Your own colour', 'Ingenium\'s violet'].every(t => pn.chips.includes(t)) && pn.checked.join() === 'By the hour,Ingenium\'s violet' && pn.jewels === 8 && pn.light,
    'the stone (by the hour, four looks, her own colour), the band and the light; at first, Ingenium\'s own', pn && { chips: pn.chips, checked: pn.checked, jewels: pn.jewels, light: pn.light });
  // a fixed look, then her own colour, then the band: each reaches the diamond at once and is kept
  await p.click('#page-build .dmc .dmc-c[data-look="lavender"]'); await p.waitForTimeout(400);
  const lv = await p.evaluate(() => ({ look: IngDiamond.look(), auto: IngDiamond.auto(), kept: state.diamond && state.diamond.look }));
  ok(lv.look === 'lavender' && lv.auto === false && lv.kept === 'lavender', 'Lavender: the diamond keeps that look, and it is kept in the settings', lv);
  await p.click('#page-build .dmc .dmc-c[data-look="own"]'); await p.waitForTimeout(300);
  await p.click('#page-build .dmc .dmc-own:not([hidden]) .dmc-s[data-hex="#c8143c"]'); await p.waitForTimeout(300);
  await p.evaluate(() => { const r = document.querySelector('#page-build .dmc .dmc-own:not([hidden]) input[type=range]'); r.value = '0.95'; r.dispatchEvent(new Event('input', { bubbles: true })); }); await p.waitForTimeout(400);
  const rb = await p.evaluate(() => ({ t: IngDiamond.tinted(), kept: state.diamond }));
  ok(Math.abs(rb.t.stone[0] - 200 / 255) < 0.01 && rb.t.stone[3] === 0.95 && rb.kept.look === 'own' && rb.kept.stone === '#c8143c' && rb.kept.depth === 0.95, 'Ruby, deep: the stone takes the colour and its depth, kept in the settings', rb);
  const red = await stoneShot('stone_1_ruby_deep');
  ok(red[0] > red[1] + 25 && red[0] > red[2] && violet[2] > violet[1], 'the stone is red where it was violet (its picture, measured)', { by_hour: violet, ruby: red });
  const band = p.locator('#page-build .dmc .dmc-sec').nth(1);   // the holder's band: its own section
  await band.locator('.dmc-c', { hasText: 'Your own colour' }).click(); await p.waitForTimeout(300);
  await band.locator('.dmc-own:not([hidden]) .dmc-s[data-hex="#2f5bd3"]').click(); await p.waitForTimeout(300);
  await p.click('#page-build .dmc .eswitch'); await p.waitForTimeout(300);
  const bd = await p.evaluate(() => ({ t: IngDiamond.tinted(), kept: state.diamond }));
  ok(bd.t.band[3] === 1 && Math.abs(bd.t.band[2] - 211 / 255 * 0.92) < 0.01 && bd.kept.band === '#2f5bd3' && bd.kept.light === false, 'the holder\'s band in Sapphire, and the light switched off, kept', bd.kept);
  await p.screenshot({ path: path.join(OUT, 'head_ruby_sapphire.png') });
  // Escape closes; the key has the focus again
  await p.focus('#page-build .dmc .dmc-c[data-look="own"]'); await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  const esc = await p.evaluate(() => ({ open: !!document.querySelector('#page-build .dmc'), focus: document.activeElement && document.activeElement.id, expanded: document.getElementById('bdColours').getAttribute('aria-expanded') }));
  ok(!esc.open && esc.focus === 'bdColours' && esc.expanded === 'false', 'Escape closes the panel and gives the key its focus back', esc);
  // kept: opened again, the diamond takes her colours at once
  const p2 = await ctx.newPage(); p2.on('pageerror', e => errs.push('again: ' + e.message.slice(0, 200)));
  await p2.evaluate(() => {}).catch(() => {}); await p.evaluate(() => { try { saveState(); } catch (e) {} }); await p.waitForTimeout(1500);
  await open(p2);
  const again = await p2.evaluate(() => ({ kept: state.diamond, t: IngDiamond.tinted() }));
  ok(again.kept && again.kept.stone === '#c8143c' && again.t.stone[3] === 0.95 && again.t.band[3] === 1, 'opened again, the diamond takes her colours at once', again);
  await p2.close();
  // Back to Ingenium's own
  await p.click('#bdColours'); await p.waitForTimeout(500); await p.click('#page-build .dmc .dmc-foot .dmc-k:not(.pri)'); await p.waitForTimeout(500);
  const rs = await p.evaluate(() => ({ kept: state.diamond === undefined, t: IngDiamond.tinted(), auto: IngDiamond.auto(), checked: [...document.querySelectorAll('#page-build .dmc .dmc-c[aria-checked="true"]')].map(x => x.textContent.trim()), light: document.querySelector('#page-build .dmc .eswitch input').checked }));
  ok(rs.kept && rs.t.stone.every(v => v === 0) && rs.t.band.every(v => v === 0) && rs.auto === true && rs.light && rs.checked.join() === 'By the hour,Ingenium\'s violet', 'Back to Ingenium\'s own: no colour of her own, by the hour, the light on', rs);
  await p.click('#page-build .dmc .dmc-foot .dmc-k.pri'); await p.waitForTimeout(300);
  // Settings, Everyday: the same panel; Find a setting finds it; Show me on Adamas
  const se = await p.evaluate(async () => { go('settings'); await new Promise(r => setTimeout(r, 600)); const c = document.getElementById('dmcCard'); const hits = IngRooms.find('diamond colour');
    return { card: !!c, room: c && IngRooms.roomOf(c), panel: !!(c && c.querySelector('.dmc .dmc-c[data-look="own"]')), hits: hits.map(h => h.card + ' in ' + h.room).slice(0, 4) }; });
  ok(se.card && se.room === 'everyday' && se.panel && se.hits.some(h => /^dmcCard in everyday$/.test(h)), 'Settings, Everyday holds the same panel, and Find a setting finds it', se);
  await p.evaluate(() => { IngRooms.open('settings', 'everyday'); const c = document.getElementById('dmcCard'); try { IngSettingsRaised.open(c); } catch (e) {} c.querySelector('.dmc-c[data-look="purple"]').click(); }); await p.waitForTimeout(300);
  const fromSettings = await p.evaluate(() => ({ look: IngDiamond.look(), kept: state.diamond && state.diamond.look }));
  ok(fromSettings.look === 'purple' && fromSettings.kept === 'purple', 'a choice made in Settings reaches the diamond', fromSettings);
  await p.evaluate(() => { const c = document.getElementById('dmcCard'); c.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(OUT, 'settings_card.png') });
  await p.evaluate(() => [...document.querySelectorAll('#dmcCard .dmc-k.pri')].find(x => /Show me on Adamas/.test(x.textContent)).click()); await p.waitForTimeout(1500);
  const sh = await p.evaluate(() => ({ page: document.querySelector('section.section.active').id, open: !!document.querySelector('#page-build .dmc'), checked: [...document.querySelectorAll('#page-build .dmc .dmc-c[aria-checked="true"]')].map(x => x.textContent.trim()) }));
  ok(sh.page === 'page-build' && sh.open && sh.checked[0] === 'Purple', 'Show me on Adamas opens Adamas with the panel open, showing the same choice', sh);
  await p.evaluate(() => { IngDiamondColours.reset(); IngDiamondColours.close(); });
  // a phone's width: the panel under the keys, within the screen
  const ph = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); const q = await ph.newPage(); q.setDefaultTimeout(180000); q.on('pageerror', e => errs.push('phone: ' + e.message.slice(0, 200)));
  await open(q); await q.tap('#bdColours').catch(async () => { await q.click('#bdColours'); }); await q.waitForTimeout(800);
  const pp = await q.evaluate(() => { const d = document.querySelector('#page-build .dmc'); if (!d) return null; const r = d.getBoundingClientRect(), k = document.querySelector('#page-build .skh-keys').getBoundingClientRect();
    return { flow: d.classList.contains('dmc-flow'), left: Math.round(r.left), right: Math.round(r.right), width: innerWidth, belowKeys: r.top >= k.bottom - 1, page: document.documentElement.scrollWidth <= innerWidth + 1 }; });
  ok(pp && pp.flow && pp.left >= 0 && pp.right <= pp.width && pp.belowKeys && pp.page, 'on a phone\'s width the panel stands under the keys, within the screen', pp);
  await q.evaluate(() => document.querySelector('#page-build .dmc').scrollIntoView({ block: 'start' })); await q.waitForTimeout(500); await q.screenshot({ path: path.join(OUT, 'phone_panel.png') });
  await ph.close();
  const de = await p.evaluate(() => IngDiamond.state().err);
  ok(errs.length === 0 && !de, 'no page errors, and no error from the diamond\'s drawing', { errs, diamond: de });
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(String(e && e.stack || e).slice(0, 1200)); process.exit(2); });
