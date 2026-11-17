// Ingenium 7.31: the diamond's colour families (modules/r314.js, with modules/r292.js family()). Her words (17 November 2026): "I want the
// light blue pastel shade that I love from Carpe Diem's sticky notes to be among the diamond colour choices ... I want for every colour
// shade to come with their 4 variations so that the diamond has a proper night mode look to match and accompany it if I choose to change
// the colour from purple to another colour. I want you to give the diamond, the same treatment as the sticky notes in that regard"; and "I
// also want the northern lights to change colours to better complement the new diamond colours when they are selected on the page".
// Supersedes rig/t_730_diamond_colours.js (its looks and its depth are replaced by families and shades); its other checks are kept here.
// Checks, in Chromium (software WebGL), at 1440 by 900 and on a phone's width:
//   - the key in the head's corner, as 7.30 (the welcome door's sign-in key; no tint under the pointer; the row of keys);
//   - pressed, the panel opens beside the diamond; no circle at its top; no scroll bar in view; the little diamond is still a toy;
//   - the stone: eleven families (Ingenium's purple, Sky blue, Sapphire, Aqua, Emerald, Citrine, Amber, Rose, Ruby, Clear crystal, Your
//     own colour), each a turning strip of the renderer's frames; the shade: By the hour, Pastel, Medium, Deep, and the night's own shown
//     beside them, not pressable; at first Ingenium's purple by the hour, with no family set on the diamond (exactly as before);
//   - Sky blue: the family reaches the diamond (IngDiamond.fam), the stone turns blue, the panel glides down to its shades; Pastel: the
//     lavender look dressed in sky blue; the night theme: the stone is its night shade, deep and blue, and the northern lights turn from
//     violet to blue (both measured on their pictures);
//   - the Clear crystal: by night a black diamond (not the purple night stone) under northern lights in every colour;
//   - At night, the silver diamond (or the black), whatever the stone by day;
//   - her own colour, picked; the band and the light as before; kept, and opened again; Back to Ingenium's own; the settings 7.29 and 7.30
//     kept are read as families and shades; Settings, Everyday; Show me on Adamas; a phone's width; no page error;
//   - with a second page (7.30's) given: Ingenium's purple drawn pixel for pixel as 7.30 drew it (a still frame, Minimal motion, sparkles
//     seeded the same).
//   node rig/t_731_diamond_families.js <page url> <out folder> [7.30 page url]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [U, OUT, U730] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const MEAN = 'import sys;from PIL import Image;im=Image.open(sys.argv[1]).convert("RGB");px=list(im.getdata());n=len(px);print(",".join(str(round(sum(p[i] for p in px)/n,1)) for i in range(3)))';
const mean = f => cp.execFileSync('python3', ['-I', '-W', 'ignore', '-c', MEAN, f]).toString().trim().split(',').map(Number);
/* the bright, coloured pixels' mean colour (the northern lights against the night sky; white words and stars left out) */
const BRIGHT = 'import sys;from PIL import Image;im=Image.open(sys.argv[1]).convert("RGB");px=[p for p in im.getdata() if sum(p)>150 and max(p)-min(p)>40];n=max(1,len(px));print(",".join(str(round(sum(p[i] for p in px)/n,1)) for i in range(3))+","+str(len(px)))';
const bright = f => cp.execFileSync('python3', ['-I', '-W', 'ignore', '-c', BRIGHT, f]).toString().trim().split(',').map(Number);
/* the bright pixels by their strongest channel (red, green, blue): northern lights in every colour show all three */
const HUES = 'import sys;from PIL import Image;im=Image.open(sys.argv[1]).convert("RGB");px=[p for p in im.getdata() if sum(p)>150 and max(p)-min(p)>40];n=max(1,len(px));c=[0,0,0]\nfor p in px: c[p.index(max(p))]+=1\nprint(",".join(str(round(v/n,3)) for v in c)+","+str(len(px)))';
const hues = f => cp.execFileSync('python3', ['-I', '-W', 'ignore', '-c', HUES, f]).toString().trim().split(',').map(Number);
const DIFF = 'import sys;from PIL import Image, ImageChops;a=Image.open(sys.argv[1]).convert("RGB");b=Image.open(sys.argv[2]).convert("RGB");print(sum(1 for p in ImageChops.difference(a,b).getdata() if max(p)>0) if a.size==b.size else -1)';
(async () => {
  const b = await pw.chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); p.setDefaultTimeout(180000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const open = async (pg, url) => { await pg.goto(url || U, { timeout: 600000 }); await pg.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await pg.waitForTimeout(1200);
    await pg.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme(); window.__tFix = 3.2; go('build'); });
    await pg.waitForFunction(() => !!document.getElementById('bdColours'), null, { timeout: 20000 }).catch(() => {}); await pg.waitForTimeout(1500); };
  await open(p);
  await p.evaluate(() => { const h = document.querySelector('#page-build > .skh'); h.scrollIntoView({ block: 'start' }); window.scrollBy(0, -70); }); await p.waitForTimeout(800);
  /* the stone alone: the sky's own canvas (.bd-bg, the northern lights) is hidden while it is pictured, so its colours are the stone's */
  const stoneShot = async (name) => { await p.evaluate(() => document.querySelectorAll('#page-build canvas.bd-bg').forEach(c => c.style.visibility = 'hidden')); await p.waitForTimeout(2400);
    const r = await p.evaluate(() => { const c = document.querySelector('#page-build .skh-obj canvas').getBoundingClientRect(); return { x: c.left + c.width * 0.36, y: c.top + c.height * 0.18, width: c.width * 0.28, height: c.height * 0.16 }; });
    const f = path.join(OUT, name + '.png'); await p.screenshot({ path: f, clip: r }); await p.evaluate(() => document.querySelectorAll('#page-build canvas.bd-bg').forEach(c => c.style.visibility = '')); return mean(f); };
  /* the sky above the stone: the head's upper band, where the northern lights run */
  const skyShot = async (name) => { await p.evaluate(() => { try { IngDiamond.kick(); } catch (e) {} }); await p.waitForTimeout(4500);   /* the sky draws at half the frames; slow in software WebGL */
    const r = await p.evaluate(() => { const h = document.querySelector('#page-build > .skh').getBoundingClientRect(); return { x: h.left + 20, y: h.top + 30, width: h.width - 40, height: 120 }; });
    const f = path.join(OUT, name + '.png'); await p.screenshot({ path: f, clip: r }); return bright(f); };

  // the key, in the corner, as the welcome door's sign-in key (as 7.30)
  const k = await p.evaluate(() => { const b = document.getElementById('bdColours'), pill = b && b.closest('.dmc-pill'), h = document.querySelector('#page-build > .skh'); if (!b || !pill) return { b: !!b, pill: !!pill };
    const r = pill.getBoundingClientRect(), hr = h.getBoundingClientRect(); return { label: b.getAttribute('aria-label'), w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top - hr.top), right: Math.round(hr.right - r.right),
      row: [...h.querySelectorAll('.skh-keys > *')].map(x => x.textContent.trim()), expanded: b.getAttribute('aria-expanded') }; });
  ok(k.label === "The diamond's colours" && k.w === 37 && k.h === 32 && k.top === 15 && k.right === 15 && k.expanded === 'false' && JSON.stringify(k.row) === JSON.stringify(['Run your page', 'Load a sample']), 'the key: in the head\'s top-right corner, as 7.30; the row of keys unchanged', k);
  await p.mouse.move(5, 5);
  const violet = await stoneShot('stone_0_purple');
  const fam0 = await p.evaluate(() => ({ fam: IngDiamond.fam(), auto: IngDiamond.auto() }));
  ok(fam0.fam === null && fam0.auto === true, 'at first: Ingenium\'s purple by the hour, with no family set on the diamond (drawn as before)', fam0);
  // pressed: beside the diamond
  const before = await p.evaluate(() => { const c = document.querySelector('#page-build .skh-obj canvas').getBoundingClientRect(); return Math.round(c.left + c.width / 2); });
  await p.click('#bdColours'); await p.waitForTimeout(600);
  await p.evaluate(async () => { const h = document.querySelector('#page-build > .skh'); const els = [h.querySelector('.skh-words'), h.querySelector('.skh-obj')];
    await Promise.race([Promise.all([].concat.apply([], els.map(e => e.getAnimations())).map(a => a.finished.catch(() => {}))), new Promise(r => setTimeout(r, 8000))]); });
  await p.waitForTimeout(300);
  const pn = await p.evaluate(() => { const d = document.querySelector('#page-build .dmc'), h = document.querySelector('#page-build > .skh'), c = document.querySelector('#page-build .skh-obj canvas'); if (!d) return null;
    const a = d.getBoundingClientRect(), cr = c.getBoundingClientRect(), w = h.querySelector('.skh-words'), sc = d.querySelector('.dmc-scroll'), set = d.querySelector('.dmc-setting'), cs = getComputedStyle(set);
    return { side: d.classList.contains('dmc-side'), left: Math.round(a.left), diamondMid: Math.round(cr.left + cr.width / 2), stoneRight: Math.round(cr.left + cr.width * 0.68), words: getComputedStyle(w).opacity,
      circle: { bg: cs.backgroundImage, shadow: cs.boxShadow }, bar: sc.offsetWidth - sc.clientWidth, scrolls: sc.scrollHeight > sc.clientHeight, top: sc.scrollTop }; });
  ok(pn && pn.side && pn.stoneRight <= pn.left && pn.diamondMid < before - 40 && pn.words === '0' && pn.circle.bg === 'none' && /none/.test(pn.circle.shadow) && pn.bar === 0,
    'pressed, the panel opens beside the diamond, no circle at its top, no scroll bar in view (it scrolls: ' + (pn && pn.scrolls) + ')', pn);
  const st = await p.evaluate(() => { const d = document.querySelector('#page-build .dmc'); const fams = [...d.querySelectorAll('.dmc-c[data-fam]')], shades = [...d.querySelectorAll('.dmc-c[data-shade]')], nts = [...d.querySelectorAll('.dmc-c[data-night]')];
    const real = x => { const i = x.querySelector('.dmc-st img'); return !!i && /^data:image\/(webp|png)/.test(i.src) && i.naturalWidth > i.naturalHeight * 10 && i.getAnimations().length > 0; };
    return { fams: fams.map(x => (x.querySelector('.dmc-n') || {}).textContent), shades: shades.map(x => (x.querySelector('.dmc-n') || {}).textContent), nights: nts.map(x => (x.querySelector('.dmc-n') || {}).textContent), nightsReal: nts.every(real),
      real: fams.concat(shades).every(real), keyBehind: fams.concat(shades).some(x => { const cs = getComputedStyle(x); return cs.backgroundImage !== 'none' || !/rgba\(0, 0, 0, 0\)/.test(cs.backgroundColor) || cs.boxShadow !== 'none'; }),
      checked: [...d.querySelectorAll('.dmc-c[aria-checked="true"]')].map(x => (x.querySelector('.dmc-n') || {}).textContent), note: d.querySelector('.dmc-note').textContent.slice(0, 120) }; });
  ok(st.fams.join() === "Ingenium's purple,Sky blue,Sapphire,Aqua,Emerald,Citrine,Amber,Rose,Ruby,Clear crystal,Your own colour" && st.shades.join() === 'By the hour,Pastel,Medium,Deep' && st.nights.join() === 'Its own,Black diamond,Silver diamond' && st.nightsReal && st.real && !st.keyBehind,
    'the stone: eleven families; the shade: four; at night: its own, the black diamond or the silver diamond; every one the real diamond, turning, no key behind', st);
  ok(st.checked.join() === "Ingenium's purple,By the hour,Its own,Ingenium's violet", 'at first: Ingenium\'s purple, by the hour, Ingenium\'s violet band', st.checked);
  await p.screenshot({ path: path.join(OUT, 'panel_open.png') });
  // the toy, as 7.30
  const before0 = await p.evaluate(() => JSON.stringify(state.diamond || null));
  await p.click('#page-build .dmc .dmc-setting'); await p.waitForTimeout(150);
  const ty = await p.evaluate(() => { const t = document.querySelector('#page-build .dmc .dmc-setting'); return { whirl: t.classList.contains('dmc-whirl'), sparks: t.querySelectorAll('.dmc-burst i').length, kept: JSON.stringify(state.diamond || null) }; });
  ok(ty.whirl && ty.sparks === 8 && ty.kept === before0, 'the little diamond at the top is still a toy: it whirls and throws its sparkles, and nothing chosen changes', ty);
  // Sky blue
  await p.click('#page-build .dmc .dmc-c[data-fam="sky"]'); await p.waitForTimeout(1500);
  const sk = await p.evaluate(() => { const d = document.querySelector('#page-build .dmc'), sc = d.querySelector('.dmc-scroll'), row = d.querySelector('.dmc-shades'), f = IngDiamond.fam();
    const r = row.getBoundingClientRect(), s = sc.getBoundingClientRect(); return { fam: !!f, shades: f && f.s.filter(Boolean).length, aur: f && f.aur, kept: state.diamond && { fam: state.diamond.fam, shade: state.diamond.shade },
      scrolled: sc.scrollTop, shadesInView: r.top >= s.top - 1 && r.bottom <= s.bottom + 1, note: d.querySelector('.dmc-note').textContent }; });
  ok(sk.fam && sk.shades === 4 && sk.aur && sk.kept.fam === 'sky' && sk.kept.shade === 'auto', 'Sky blue reaches the diamond as a family of four shades with the northern lights\' hue, and is kept', sk);
  ok(sk.scrolled > 0 && sk.shadesInView, 'choosing a family glides the panel down until its shades are in view', { scrolled: sk.scrolled, inView: sk.shadesInView });
  ok(/sky blue/i.test(sk.note) && /Carpe Diem/.test(sk.note), 'its note names the light sky blue of Carpe Diem\'s sticky note (this is the master edition)', sk.note.slice(0, 160));
  const blue = await stoneShot('stone_1_sky');
  ok(blue[2] > blue[0] + 15 && violet[0] > violet[1], 'the stone is blue where it was purple (its picture, measured)', { purple: violet, sky: blue });
  await p.click('#page-build .dmc .dmc-c[data-shade="pastel"]'); await p.waitForTimeout(500);
  const pa = await p.evaluate(() => ({ look: IngDiamond.look(), auto: IngDiamond.auto(), kept: state.diamond.shade }));
  ok(pa.look === 'lavender' && pa.auto === false && pa.kept === 'pastel', 'Pastel: the lavender look, dressed in sky blue, kept', pa);
  const pastel = await stoneShot('stone_2_sky_pastel');
  ok(pastel[2] > pastel[0] + 10 && (pastel[0] + pastel[1] + pastel[2]) > (blue[0] + blue[1] + blue[2]), 'the pastel is lighter than the medium and still blue', { medium: blue, pastel });
  // the night theme: the night shade, and the northern lights
  await p.evaluate(() => { IngDiamondColours.close(); state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(800);
  const skyNight = await stoneShot('stone_3_sky_night'); const auSky = await skyShot('lights_sky_night');
  await p.evaluate(() => IngDiamondColours.set({ fam: 'purple' })); const purpleNight = await stoneShot('stone_4_purple_night'); const auPurple = await skyShot('lights_purple_night');
  ok(skyNight[2] > skyNight[0] + 8 && (skyNight[0] + skyNight[1] + skyNight[2]) < (pastel[0] + pastel[1] + pastel[2]), 'with the night theme, Sky blue shows its night shade: deep and blue', { night: skyNight, pastel });
  ok(auSky[3] > 50 && auPurple[3] > 50 && auSky[2] > auSky[0] + 20 && auPurple[0] > auSky[0] + 20, 'the northern lights take the stone\'s colour: blue for Sky blue, violet for Ingenium\'s purple (bright pixels, measured)', { sky: auSky, purple: auPurple });
  // the clear crystal's own night (her words: "I also want the option to keep the clear crystal and have its own Night mode look. It should
  // have the full colour spectrum for the Northern lights since that makes the most sense"; then "No I prefer the stone as a black diamond on
  // Night mode, it is the best look for it and its natural opposite")
  await p.evaluate(() => IngDiamondColours.set({ fam: 'clear', shade: 'pastel' })); const clearNight = await stoneShot('stone_5_clear_night'); await skyShot('lights_clear_night');
  const hc = hues(path.join(OUT, 'lights_clear_night.png')), hp = hues(path.join(OUT, 'lights_purple_night.png')), cf = await p.evaluate(() => { const f = IngDiamond.fam(); return f && { cn: f.cn, aur: f.aur, look: IngDiamond.look() }; });
  const spread = Math.max(...clearNight.slice(0, 3)) - Math.min(...clearNight.slice(0, 3));
  ok(cf && cf.cn === true && cf.aur === 'spectrum' && spread < 14 && Math.abs(clearNight[2] - purpleNight[2]) + Math.abs(clearNight[0] - purpleNight[0]) > 4,
    'the Clear crystal turns to a black diamond at night: colourless, not the purple night stone (its picture, measured)', { clear: clearNight, purple: purpleNight, fam: cf });
  ok(hc[3] > 50 && hc[0] > 0.1 && hc[1] > 0.1 && hc[2] > 0.1 && hp[1] < 0.05, 'its northern lights run through every colour: red, green and blue all lead somewhere (Ingenium\'s purple: hardly any green)', { clear: hc, purple: hp });
  // the silver diamond at night (her words: "I like the silver diamond look on dark mode too from your previous clear Night mode look, please
  // also add it as an option for Night mode look for the diamond"), here for Sky blue: whatever the stone by day
  await p.evaluate(() => IngDiamondColours.set({ fam: 'sky', shade: 'medium', night: 'silver' })); const silver = await stoneShot('stone_6_sky_silver_night');
  const sv = await p.evaluate(() => { const f = IngDiamond.fam(); return f && { n: f.n, says: IngDiamondColours.says() }; });
  const sSpread = Math.max(...silver.slice(0, 3)) - Math.min(...silver.slice(0, 3)), lum = c => c[0] + c[1] + c[2];
  ok(sv && sv.n && sv.n.cn === true && sv.n.aur === 'spectrum' && Math.abs(sv.n.s.g - 0.72) < 1e-9 && sSpread < 14 && lum(silver) > lum(clearNight) + 6 && /silver at night/.test(sv.says),
    'At night, Silver diamond: Sky blue by day, a colourless silver diamond by night, brighter than the black one, under lights in every colour', { silver, black: clearNight, n: sv && sv.n, says: sv && sv.says });
  await p.evaluate(() => IngDiamondColours.set({ night: 'own' }));
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); }); await p.waitForTimeout(600);
  // her own colour, the band and the light
  await p.evaluate(() => IngDiamondColours.open()); await p.waitForTimeout(900);
  await p.click('#page-build .dmc .dmc-c[data-fam="own"]'); await p.waitForTimeout(400);
  await p.evaluate(() => { const i = document.querySelector('#page-build .dmc .dmc-pick:not([hidden]) input[type=color]'); i.value = '#2e8b57'; i.dispatchEvent(new Event('input', { bubbles: true })); }); await p.waitForTimeout(500);
  const ow = await p.evaluate(() => ({ kept: state.diamond, fam: IngDiamond.fam(), pick: !document.querySelector('#page-build .dmc .dmc-pick').hidden }));
  ok(ow.kept.fam === 'own' && ow.kept.own === '#2e8b57' && ow.fam && ow.fam.s.length === 4 && ow.pick, 'Your own colour: any colour picked, in the same four shades with a night of its own', ow.kept);
  const band = p.locator('#page-build .dmc .dmc-sec').nth(2);
  await band.locator('.dmc-c', { hasText: 'Your own colour' }).click(); await p.waitForTimeout(300);
  await band.locator('.dmc-own:not([hidden]) .dmc-s[data-hex="#2f5bd3"]').click(); await p.waitForTimeout(300);
  await p.click('#page-build .dmc .dmc-sw'); await p.waitForTimeout(300);
  const bd = await p.evaluate(() => ({ t: IngDiamond.tinted(), kept: state.diamond, sw: document.querySelector('#page-build .dmc .dmc-sw').getAttribute('aria-checked') }));
  ok(bd.t.band[3] === 1 && Math.abs(bd.t.band[2] - 211 / 255 * 0.92) < 0.01 && bd.kept.band === '#2f5bd3' && bd.kept.light === false && bd.sw === 'false' && bd.t.stone[3] === 0, 'the band in Sapphire, the light off, kept; the stone is a family, not a tint', bd.kept);
  await p.focus('#page-build .dmc .dmc-c[data-fam="own"]'); await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  const esc = await p.evaluate(async () => { const w = document.querySelector('#page-build .skh-words'); await Promise.race([Promise.all(w.getAnimations().map(a => a.finished.catch(() => {}))), new Promise(r => setTimeout(r, 8000))]);
    return { open: !!document.querySelector('#page-build .dmc'), focus: document.activeElement && document.activeElement.id, words: getComputedStyle(w).opacity }; });
  ok(!esc.open && esc.focus === 'bdColours' && esc.words === '1', 'Escape closes the panel, the words come back, and the key has the focus', esc);
  await p.evaluate(() => { try { saveState(); } catch (e) {} }); await p.waitForTimeout(1500);
  const p2 = await ctx.newPage(); p2.setDefaultTimeout(180000); p2.on('pageerror', e => errs.push('again: ' + e.message.slice(0, 200)));
  await open(p2); const again = await p2.evaluate(() => ({ kept: state.diamond, fam: IngDiamond.fam(), t: IngDiamond.tinted() })); await p2.close();
  ok(again.kept && again.kept.own === '#2e8b57' && again.fam && again.t.band[3] === 1, 'opened again, the diamond takes her colours at once', again.kept);
  await p.click('#bdColours'); await p.waitForTimeout(800); await p.click('#page-build .dmc .dmc-foot .dmc-k:not(.pri)'); await p.waitForTimeout(500);
  const rs = await p.evaluate(() => ({ kept: state.diamond === undefined, fam: IngDiamond.fam(), t: IngDiamond.tinted(), auto: IngDiamond.auto(), light: document.querySelector('#page-build .dmc .dmc-sw').getAttribute('aria-checked') }));
  ok(rs.kept && rs.fam === null && rs.t.band.every(v => v === 0) && rs.auto === true && rs.light === 'true', 'Back to Ingenium\'s own: Ingenium\'s purple by the hour, no family, the light on', rs);
  // the settings 7.29 and 7.30 kept, read as families and shades
  const old = await p.evaluate(() => { const r = {}; const cases = { aqua: { look: 'own', stone: '#2fb7c7', depth: 0.6 }, night: { look: 'night' }, lav: { look: 'lavender' }, clear: { look: 'clear' }, mine: { look: 'own', stone: '#123456', depth: 0.3 }, hour: { look: 'auto', band: '#c8143c', light: false } };
    for (const k in cases) { state.diamond = cases[k]; const g = IngDiamondColours.get(); r[k] = [g.fam, g.shade, g.fam === 'own' ? g.own : '', g.band || '', g.light]; } delete state.diamond; IngDiamondColours.apply(); return r; });
  ok(old.aqua.join() === 'aqua,auto,,,true' && old.night.join() === 'purple,deep,,,true' && old.lav.join() === 'purple,pastel,,,true' && old.clear.join() === 'clear,pastel,,,true' && old.mine.join() === 'own,auto,#123456,,true' && old.hour.join() === 'purple,auto,,#c8143c,false',
    'the settings 7.29 and 7.30 kept are read as families and shades (a jewel of the eight is its family; another colour her own)', old);
  // Settings, Everyday; Show me on Adamas
  await p.click('#page-build .dmc .dmc-foot .dmc-k.pri'); await p.waitForTimeout(400);
  const se = await p.evaluate(async () => { go('settings'); await new Promise(r => setTimeout(r, 600)); const c = document.getElementById('dmcCard'); const hits = IngRooms.find('diamond colour');
    return { card: !!c, room: c && IngRooms.roomOf(c), panel: !!(c && c.querySelector('.dmc .dmc-c[data-fam="sky"]')), hits: hits.map(h => h.card + ' in ' + h.room).slice(0, 4), tile: IngDiamondColours.says() }; });
  ok(se.card && se.room === 'everyday' && se.panel && se.hits.some(h => /^dmcCard in everyday$/.test(h)) && /^Ingenium's purple, by the hour · band: Ingenium's violet · light on$/.test(se.tile), 'Settings, Everyday holds the same panel; Find a setting finds it; its tile says the family and the shade', se);
  await p.evaluate(() => { IngRooms.open('settings', 'everyday'); const c = document.getElementById('dmcCard'); try { IngSettingsRaised.open(c); } catch (e) {} c.querySelector('.dmc-c[data-fam="ruby"]').click(); c.querySelector('.dmc-c[data-shade="deep"]').click(); }); await p.waitForTimeout(300);
  const fs2 = await p.evaluate(() => ({ look: IngDiamond.look(), fam: !!IngDiamond.fam(), kept: state.diamond && [state.diamond.fam, state.diamond.shade].join() }));
  ok(fs2.look === 'night' && fs2.fam && fs2.kept === 'ruby,deep', 'a choice made in Settings reaches the diamond (Ruby, deep)', fs2);
  await p.evaluate(() => [...document.querySelectorAll('#dmcCard .dmc-k.pri')].find(x => /Show me on Adamas/.test(x.textContent)).click()); await p.waitForTimeout(1800);
  const sh = await p.evaluate(() => ({ page: document.querySelector('section.section.active').id, open: !!document.querySelector('#page-build .dmc'), checked: [...document.querySelectorAll('#page-build .dmc .dmc-c[aria-checked="true"]')].map(x => (x.querySelector('.dmc-n') || {}).textContent) }));
  ok(sh.page === 'page-build' && sh.open && sh.checked[0] === 'Ruby' && sh.checked[1] === 'Deep', 'Show me on Adamas opens Adamas with the panel open, showing the same choice', sh);
  await p.evaluate(() => { IngDiamondColours.reset(); IngDiamondColours.close(); });
  // a phone's width
  const ph = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); const q = await ph.newPage(); q.setDefaultTimeout(180000); q.on('pageerror', e => errs.push('phone: ' + e.message.slice(0, 200)));
  await open(q); await q.tap('#bdColours').catch(async () => { await q.click('#bdColours'); }); await q.waitForTimeout(900);
  const pp = await q.evaluate(() => { const d = document.querySelector('#page-build .dmc'); if (!d) return null; const r = d.getBoundingClientRect();
    return { flow: d.classList.contains('dmc-flow'), left: Math.round(r.left), right: Math.round(r.right), width: innerWidth, page: document.documentElement.scrollWidth <= innerWidth + 1 }; });
  ok(pp && pp.flow && pp.left >= 0 && pp.right <= pp.width && pp.page, 'on a phone\'s width the panel stands in the head\'s flow, within the screen', pp);
  await q.evaluate(() => document.querySelector('#page-build .dmc').scrollIntoView({ block: 'start' })); await q.waitForTimeout(500); await q.screenshot({ path: path.join(OUT, 'phone_panel.png') });
  await ph.close();
  // Ingenium's purple, pixel for pixel as 7.30 drew it
  if (U730) {
    const still = async (url, name) => { const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
      await c.addInitScript(() => { let s = 7; Math.random = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; });
      const pg = await c.newPage(); pg.setDefaultTimeout(180000); await open(pg, url);
      await pg.evaluate(() => { try { IngDiamondColours.reset(); } catch (e) {} state.motion = 'minimal'; try { applyMotion(); } catch (e) {} document.body.setAttribute('data-motion', 'minimal'); window.__tFix = 3.2;
        const h = document.querySelector('#page-build > .skh'); h.scrollIntoView({ block: 'start' }); window.scrollBy(0, -70); });
      await pg.mouse.move(5, 5); await pg.waitForTimeout(4000);
      const r = await pg.evaluate(() => { const c = document.querySelector('#page-build .skh-obj canvas').getBoundingClientRect(); return { x: c.left, y: c.top, width: c.width, height: c.height }; });
      const f = path.join(OUT, name + '.png'); await pg.screenshot({ path: f, clip: r }); await c.close(); return f; };
    const a = await still(U730, 'still_730'), z = await still(U, 'still_731');
    const n = +cp.execFileSync('python3', ['-I', '-W', 'ignore', '-c', DIFF, a, z]).toString().trim();
    ok(n === 0, 'Ingenium\'s purple, with nothing chosen, is drawn pixel for pixel as 7.30 drew it (a still frame)', { differing: n });
  }
  const de = await p.evaluate(() => IngDiamond.state().err);
  ok(errs.length === 0 && !de, 'no page errors, and no error from the diamond\'s drawing', { errs, diamond: de });
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(String(e && e.stack || e).slice(0, 1200)); process.exit(2); });
