// A new app's logo, solid and pressable, and "logo" for every app's mark (Ingenium 6.74, modules/r265.js, r112.js, r176.js and the
// sentences of r102, r108, r140, r144, r147, r175, r176, r262 and the base page). Her words (11 November 2026): "Please change "seal"
// to "logo" because not every app will have an seal themed logo. I also want you to make the app's logo animated and clickable on the
// popped out panel page, it needs to be interactive and clickable like the rest of the page." Her choices: "Logo everywhere", and a
// press that knocks and turns to the next colour, with a picture of her own as the logo.
//   - the logo is a key: a body of seven discs at growing depths, its letter standing up from its face, swaying at rest;
//   - it leans toward the pointer, lifts under it, sinks when pressed; released, it knocks with a ripple and turns to the next colour,
//     and the colour row follows; Enter does the same; it says which colour it wears;
//   - a picture (invented here, drawn by this test) becomes the logo; the app made with it carries it in its page (which the
//     installers read) and as icon.png beside it; "Use its letter" takes it away; with "Bring its files in" there is no picture key;
//   - minimal motion keeps it still, and a press still changes its colour;
//   - the words: logo, not seal, on the panel, on Home, in the top bar, in the Guide, in Blend and in the sounds; seal stays where it
//     means locking a backup;
//   - no page error.
//   node rig/t_674_logo.js <Ingenium page url (master)> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_674_logo.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true }); const OUTA = path.resolve(OUT);
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; return !!c; };
// an invented picture: a wide gold card with a blue disc in its middle (the square cut from its middle keeps the disc)
const PIC = path.join(OUTA, 'invented_logo.svg');
fs.writeFileSync(PIC, '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="#e0b040"/><circle cx="150" cy="100" r="60" fill="#3050a0"/></svg>');
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(400);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} go('fabrica'); }); await p.waitForTimeout(1500);
  const openNew = async () => { await p.evaluate(() => document.getElementById('fbNew').click()); await p.waitForTimeout(900); };
  const MK = '#fb .f-new-prev .f-ls.mark';
  await openNew();

  // 1. the logo is a key, solid
  const s1 = await p.evaluate(() => window.IngNewLogo && IngNewLogo.state());
  ok(s1 && s1.on && s1.discs === 7 && s1.role === 'button' && !s1.still, 'the logo is a key with a body of seven discs', s1);
  const s1b = await p.evaluate((sel) => { const mk = document.querySelector(sel), rims = [...mk.querySelectorAll('.nl-rim')].map(r => new DOMMatrix(getComputedStyle(r).transform).m43);
    const lift = getComputedStyle(mk.querySelector('.nl-lift')), idle = getComputedStyle(mk.querySelector('.nl-idle')), face = getComputedStyle(mk.querySelector('.nl-face'));
    return { rims, deeper: rims.every((z, i) => i === 0 || z > rims[i - 1]), lift: lift.animationName, idle: idle.animationName, shine: getComputedStyle(mk.querySelector('.nl-shine')).animationName,
      face: face.backgroundColor, mc: mk.style.getPropertyValue('--mc').trim(), tab: mk.tabIndex, label: mk.getAttribute('aria-label'), ch: mk.querySelector('.nl-ch').textContent }; }, MK);
  ok(s1b.rims.length === 7 && s1b.rims[6] < 0 && s1b.deeper, 'its discs stand behind its face, each deeper than the one before', s1b.rims);
  ok(s1b.idle === 'nlSway' && s1b.lift === 'nlLift' && s1b.shine === 'nlShine', 'at rest it sways, its letter lifts and settles, and a sheen crosses it', s1b);
  ok(s1b.face === 'rgb(47, 122, 138)' && s1b.mc === '#2f7a8a' && s1b.tab === 0, 'its face wears its first colour, and it can be reached by the keyboard', s1b);
  ok(/^Its logo, the letter A, in colour 1 of 6\. Press it for the next colour\.$/.test(s1b.label), 'it says what it is, which colour it wears and what a press does', s1b.label);
  const words = await p.evaluate(() => { const sh = document.querySelector('#fb .f-sheet'); return { all: sh.innerText, sub: (sh.querySelector('p') || {}).textContent || '', small: document.querySelector('#fb .f-new-prev small').textContent }; });
  ok(/its name and logo, how it starts/.test(words.all) && !/\bseals?\b/i.test(words.all), 'the panel says logo, never seal', words.all.slice(0, 300));
  ok(words.small === 'Its logo, wherever it shows: here, its app icon, its installer. Press it for the next colour, or use a picture of your own.', 'and says what the logo is and what a press does', words.small);
  await p.screenshot({ path: path.join(OUTA, 'logo_rest.png') });

  // 2. under the pointer: it leans toward it and lifts; pressed, it sinks
  const box = await (await p.$(MK)).boundingBox();
  await p.mouse.move(box.x + box.width * .85, box.y + box.height * .2); await p.waitForTimeout(500);
  const s2 = await p.evaluate((sel) => { const mk = document.querySelector(sel), t = mk.querySelector('.nl-tilt'); return { hov: mk.classList.contains('nl-hov'), rx: t.style.getPropertyValue('--rx'), ry: t.style.getPropertyValue('--ry'),
    m42: new DOMMatrix(getComputedStyle(t).transform).m42, stand: new DOMMatrix(getComputedStyle(mk.querySelector('.nl-stand')).transform).m43 }; }, MK);
  ok(s2.hov && parseFloat(s2.ry) > 5 && parseFloat(s2.rx) > 5 && s2.stand > 3, 'under the pointer it leans toward it, lifts, and its letter stands higher', s2);
  await p.mouse.down(); await p.waitForTimeout(200);
  const s3 = await p.evaluate((sel) => { const mk = document.querySelector(sel); return { down: mk.classList.contains('nl-down'), stand: new DOMMatrix(getComputedStyle(mk.querySelector('.nl-stand')).transform).m43,
    rim7: new DOMMatrix(getComputedStyle(mk.querySelector('.nl-rim')).transform).m43 }; }, MK);
  ok(s3.down && s3.stand < 0 && s3.rim7 > s1b.rims[0], 'pressed, it sinks: its letter goes down and its body closes up', { s3, rest7: s1b.rims[0] });
  await p.mouse.up(); await p.waitForTimeout(90);
  const s4 = await p.evaluate((sel) => { const mk = document.querySelector(sel); return { knock: mk.classList.contains('knock'), tilt: getComputedStyle(mk.querySelector('.nl-tilt')).animationName,
    ripple: getComputedStyle(mk.querySelector('.nl-ripple')).animationName }; }, MK);
  ok(s4.knock && s4.tilt === 'nlKnock' && s4.ripple === 'nlRipple', 'released, it knocks, with its ripple', s4);
  await p.waitForTimeout(400);
  const s5 = await p.evaluate((sel) => { const mk = document.querySelector(sel); return { mc: mk.style.getPropertyValue('--mc').trim(), pressed: [...document.querySelectorAll('#fb .f-sw button')].map(b => b.getAttribute('aria-pressed')).indexOf('true'),
    label: mk.getAttribute('aria-label'), turned: mk.classList.contains('turn') || getComputedStyle(mk).animationName }; }, MK);
  ok(s5.mc === '#3d6e9e' && s5.pressed === 1 && /in colour 2 of 6/.test(s5.label), 'then it wears the next colour, and the colour row follows', s5);
  // her words on the release: "the colour of the letter switches too fast and looks off": the face, the letter's raised sides and the body change together, slowly
  const fade = await p.evaluate((sel) => { const mk = document.querySelector(sel), f = (e, prop) => { const c = getComputedStyle(e); const ps = c.transitionProperty.split(',').map(x => x.trim()), ds = c.transitionDuration.split(',').map(x => parseFloat(x)); const i = ps.indexOf(prop); return i < 0 ? 0 : ds[i] || ds[0]; };
    return { face: f(mk.querySelector('.nl-face'), 'background-color'), letter: f(mk.querySelector('.nl-ch'), 'text-shadow'), body: f(mk.querySelector('.nl-rim'), 'background-color') }; }, MK);
  ok(fade.face === 0.6 && fade.letter === 0.6 && fade.body === 0.6, 'its face, its letter\'s raised sides and its body change colour together, over .6 seconds', fade);
  // it sounds as Fabrica's keys do: where this desk plays sounds at all (a calm desk plays none), the press is heard as a key
  const snd = await p.evaluate(() => { try { return { on: IngSound.play('hover', {}) === true, hist: IngSound.history().map(h => h.role) }; } catch (e) { return { on: false, hist: [] }; } });
  if (snd.on) ok(snd.hist.indexOf('keys') >= 0, 'it sounds as Fabrica\'s keys do', snd); else console.log('     (sound is off on this desk, so the key sound is not heard here)');
  await p.mouse.move(5, 5); await p.waitForTimeout(400);
  // the rest of the panel moves: the colours bob out of step and the one chosen pops; the ways lean, lift and tick; Make it pops when ready
  // the colours bob all the time, so the pointer presses them where they are (the test tool would wait for them to stand still)
  await p.click('#fb .f-new .f-sw button:nth-child(3)', { force: true }); await p.waitForTimeout(450); await p.click('#fb .f-new .f-sw button:nth-child(2)', { force: true }); await p.waitForTimeout(80);
  const s5b = await p.evaluate(() => { const bs = [...document.querySelectorAll('#fb .f-new .f-sw button')]; return { bob: bs.map(b => getComputedStyle(b).animationName.split(',')[0].trim()),
    delays: bs.map(b => getComputedStyle(b).animationDelay.split(',')[0].trim()), chosen: getComputedStyle(bs[1]).animationName }; });
  ok(s5b.bob.every(n => n === 'nlBob' || n === 'nlPop') && new Set(s5b.delays).size >= 5 && /nlPop/.test(s5b.chosen), 'the colours bob, out of step, and the one just chosen pops', s5b);
  const wb = await (await p.$('#fb .f-new .f-way:nth-child(2)')).boundingBox();
  await p.mouse.move(wb.x + wb.width * .9, wb.y + wb.height * .15); await p.waitForTimeout(400);
  const s5c = await p.evaluate(() => { const w = document.querySelectorAll('#fb .f-new .f-way')[1], m = new DOMMatrix(getComputedStyle(w).transform);
    return { rx: w.style.getPropertyValue('--wrx'), ry: w.style.getPropertyValue('--wry'), m42: Math.round(m.m42 * 10) / 10, is3d: !m.is2D }; });
  ok(parseFloat(s5c.ry) > 1 && parseFloat(s5c.rx) > 1 && s5c.m42 < 0 && s5c.is3d, 'a way leans toward the pointer and lifts', s5c);
  await p.mouse.move(5, 5); await p.waitForTimeout(300);
  // 3. the keyboard
  await p.focus(MK); await p.keyboard.press('Enter'); await p.waitForTimeout(450);
  ok(await p.evaluate((sel) => document.querySelector(sel).style.getPropertyValue('--mc').trim(), MK) === '#7a5230', 'Enter turns it to the next colour too');
  for (let i = 0; i < 4; i++) { await p.keyboard.press(' '); await p.waitForTimeout(260); }
  ok(await p.evaluate((sel) => document.querySelector(sel).style.getPropertyValue('--mc').trim(), MK) === '#2f7a8a', 'after the sixth colour it comes back to the first');
  // the letter still follows the name
  await p.fill('#fb .f-sheet input.f-in', 'Lantern Notes'); await p.waitForTimeout(120);
  const goPop = await p.evaluate(() => { const g = [...document.querySelectorAll('#fb .f-new .f-new-foot .f-btn')].pop(); return { on: !g.disabled, an: getComputedStyle(g).animationName }; });
  ok(goPop.on && goPop.an === 'nlPop', 'Make it pops when it becomes ready', goPop); await p.waitForTimeout(200);
  ok(await p.evaluate((sel) => document.querySelector(sel).querySelector('.nl-ch').textContent, MK) === 'L', 'its letter follows the name typed');

  // 4. a picture of her own
  const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => document.querySelector('#fb .nl-pic-k').click())]);
  await fc.setFiles(PIC); await p.waitForTimeout(1200);
  const s6 = await p.evaluate((sel) => { const mk = document.querySelector(sel), pic = mk.querySelector('.nl-pic'); return { has: mk.classList.contains('nl-has-pic'), src: (pic.getAttribute('src') || '').slice(0, 22), shown: !pic.hidden && pic.offsetWidth > 0,
    letter: getComputedStyle(mk.querySelector('.nl-stand')).display, key: document.querySelector('#fb .nl-pic-k').textContent, label: mk.getAttribute('aria-label'), w: pic.naturalWidth, h: pic.naturalHeight }; }, MK);
  ok(s6.has && s6.shown && s6.src === 'data:image/png;base64,' && s6.w === 512 && s6.h === 512 && s6.letter === 'none', 'a picture becomes the logo, cut to a square from its middle', s6);
  ok(s6.key === 'Use its letter' && /^Its logo, your picture/.test(s6.label), 'the key now offers its letter again, and the logo says it is her picture', s6);
  const px = await p.evaluate((sel) => new Promise(r => { const im = document.querySelector(sel).querySelector('.nl-pic'), c = document.createElement('canvas'); c.width = 512; c.height = 512; const x = c.getContext('2d'); x.drawImage(im, 0, 0);
    const at = (a, b) => [...x.getImageData(a, b, 1, 1).data].slice(0, 3).join(','); r({ middle: at(256, 256), edge: at(20, 256) }); }), MK);
  ok(px.middle === '48,80,160' && px.edge === '224,176,64', 'its middle is the picture\'s middle (the blue disc on its gold)', px);
  await p.screenshot({ path: path.join(OUTA, 'logo_picture.png') });
  // pressed with a picture: it still knocks and changes colour
  await p.click(MK); await p.waitForTimeout(500);
  ok(await p.evaluate((sel) => document.querySelector(sel).style.getPropertyValue('--mc').trim(), MK) === '#3d6e9e', 'pressed, the logo with a picture still turns to the next colour');
  // the way of her own files has no picture key
  const ways = await p.evaluate(() => { const w = [...document.querySelectorAll('#fb .f-way')]; const f = w.find(x => /Bring its files in/.test(x.textContent)); f.click();
    const hidden = getComputedStyle(document.querySelector('#fb .nl-keys')).display; const pg = w.find(x => /A simple first page/.test(x.textContent)); pg.click();
    return { hidden, back: getComputedStyle(document.querySelector('#fb .nl-keys')).display }; });
  ok(ways.hidden === 'none' && ways.back !== 'none', 'with Bring its files in there is no picture key (her files bring their own logo)', ways);
  const tick = await p.evaluate(() => { const w = [...document.querySelectorAll('#fb .f-new .f-way')].find(x => x.getAttribute('aria-pressed') === 'true'); return getComputedStyle(w.querySelector('b'), '::after').animationName; });
  ok(tick === 'nlTick', 'the way chosen ticks', tick);

  // 5. made with the picture: the app carries it
  await p.evaluate(() => { const k = [...document.querySelectorAll('#fb .f-sheet button')].find(x => /^Make /.test(x.textContent.trim())); k.click(); });
  await p.waitForFunction(() => !document.querySelector('#fb .f-sheet .f-new'), null, { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(1500);
  const made = await p.evaluate(async () => { const rs = await IngRepo.list(); const r = rs.find(x => x.name === 'Lantern Notes'); if (!r) return { none: rs.map(x => x.name) };
    const fl = await IngRepo.files(r.id); const html = await IngRepo.readText(r.id, 'index.html'); const png = await IngRepo.read(r.id, 'icon.png'); const man = JSON.parse(await IngRepo.readText(r.id, 'manifest.webmanifest'));
    const src = IngApk.iconSource(html);
    return { files: fl.map(x => x.path).sort(), link: /<link rel="icon" type="image\/png" sizes="512x512" href="data:image\/png;base64,/.test(html), apple: /<link rel="apple-touch-icon" href="icon.png">/.test(html),
      img: /<img src="icon.png"/.test(html), png: png ? [...png.slice(0, 4)].join(',') : null, man: man.icons, src: src ? src.slice(0, 22) : null,
      sw: (await IngRepo.readText(r.id, 'sw.js')).indexOf('./icon.png') >= 0, theme: /<meta name="theme-color" content="#3d6e9e">/.test(html) }; });
  ok(made.files && made.files.join('|') === 'icon.png|index.html|manifest.webmanifest|sw.js', 'the app is made with icon.png in place of the letter\'s icon.svg', made.files || made);
  ok(made.link && made.apple && made.img && made.png === '137,80,78,71', 'its page carries the logo written into it, names icon.png beside it, and icon.png is a PNG', made);
  ok(made.src === 'data:image/png;base64,' && made.man && made.man[0].src === 'icon.png' && made.sw && made.theme, 'the installers read it from the page; its manifest and offline copy name icon.png; its colour is the one pressed to', made);
  const card = await p.evaluate(() => new Promise(res => { let n = 0; const t = setInterval(() => { const r = [...document.querySelectorAll('#fb .f-repo')].find(x => /Lantern Notes/.test(x.textContent));
    const l = r && r.querySelector('.f-ls.logo .f-ls-l'); if (l || ++n > 30) { clearInterval(t); res({ card: !!r, logo: !!l }); } }, 300); }));
  ok(card.card && card.logo, 'Fabrica\'s card for the app wears the picture as its own logo, in 3D', card);

  // 6. its letter again, and minimal motion
  await openNew();
  await p.evaluate(() => { document.querySelector('#fb .nl-pic-k'); });
  const [fc2] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => document.querySelector('#fb .nl-pic-k').click())]); await fc2.setFiles(PIC); await p.waitForTimeout(900);
  await p.evaluate(() => document.querySelector('#fb .nl-pic-k').click()); await p.waitForTimeout(300);
  const s7 = await p.evaluate((sel) => { const mk = document.querySelector(sel); return { has: mk.classList.contains('nl-has-pic'), pic: !!window.IngNewLogo.picture(mk), key: document.querySelector('#fb .nl-pic-k').textContent, letter: getComputedStyle(mk.querySelector('.nl-stand')).display }; }, MK);
  ok(!s7.has && !s7.pic && s7.key === 'Use a picture' && s7.letter !== 'none', 'Use its letter takes the picture away', s7);
  await p.evaluate(() => document.body.setAttribute('data-motion', 'minimal')); await p.waitForTimeout(200);
  const before = await p.evaluate((sel) => document.querySelector(sel).style.getPropertyValue('--mc').trim(), MK);
  await p.click(MK); await p.waitForTimeout(120);
  const s8 = await p.evaluate((sel) => { const mk = document.querySelector(sel); return { idle: getComputedStyle(mk.querySelector('.nl-idle')).animationName, lift: getComputedStyle(mk.querySelector('.nl-lift')).animationName,
    knock: getComputedStyle(mk.querySelector('.nl-tilt')).animationName, mc: mk.style.getPropertyValue('--mc').trim() }; }, MK);
  ok(s8.idle === 'none' && s8.lift === 'none' && s8.knock === 'none' && s8.mc !== before, 'with minimal motion it stands still, and a press still changes its colour', { s8, before });
  await p.evaluate(() => document.body.removeAttribute('data-motion'));
  await p.evaluate(() => { const x = document.querySelector('#fb .f-sheet .f-x') || [...document.querySelectorAll('#fb .f-sheet button')].find(k => /close/i.test(k.getAttribute('aria-label') || '')); if (x) x.click(); }); await p.waitForTimeout(500);

  // 7. logo, not seal, elsewhere
  const where = await p.evaluate(() => ({ top: document.getElementById('brandSealBtn').getAttribute('title'), home: (document.getElementById('hxSealKey') || {}).getAttribute ? document.getElementById('hxSealKey').getAttribute('aria-label') : null,
    blend: null, sounds: (window.IngSound && IngSound.roles || []).map(r => r.when).join(' | ') }));
  ok(where.top === 'The logo opens the introduction', 'the top bar\'s logo is called a logo', where.top);
  await p.evaluate(() => go('home')); await p.waitForTimeout(1200);
  const home = await p.evaluate(() => { const k = document.getElementById('hxSealKey'); return k ? k.getAttribute('aria-label') : null; });
  ok(home === 'Ingenium\'s logo. Press it for fun.', 'Home\'s logo says it is Ingenium\'s logo', home);
  await p.evaluate(() => go('blend')); await p.waitForTimeout(1500);
  const blend = await p.evaluate(() => { const k = document.querySelector('#page-blend .bxk'); return k ? k.getAttribute('aria-label') : null; });
  ok(blend === null || blend === 'Ingenium\'s logo, at the heart of the blend. Press it to wind the movement.', 'Blend\'s logo is called a logo', blend);
  ok(/press the logo on Home/.test(where.sounds) && !/\bseal\b/i.test(where.sounds), 'the sounds name the logo on Home', where.sounds.slice(0, 200));
  // every page's words and labels: no seal that means a logo
  const pages = ['home', 'chat', 'code', 'build', 'fabrica', 'lector', 'focus', 'models', 'blend', 'folders', 'settings', 'guide'];
  const seen = [];
  for (const pg of pages) {
    await p.evaluate((g) => { try { go(g); } catch (e) {} }, pg); await p.waitForTimeout(900);
    const hits = await p.evaluate(() => { const out = []; const vis = (e) => { for (let n = e; n && n !== document.body; n = n.parentElement) { const s = getComputedStyle(n); if (s.display === 'none' || s.visibility === 'hidden') return false; } return true; };
      const t = document.body.innerText.split('\n').filter(l => /\bseals?\b/i.test(l)); t.forEach(l => out.push('text: ' + l.trim().slice(0, 140)));
      document.querySelectorAll('[aria-label],[title],img[alt]').forEach(e => { ['aria-label', 'title', 'alt'].forEach(a => { const v = e.getAttribute(a); if (v && /\bseals?\b/i.test(v) && vis(e)) out.push(a + ': ' + v.slice(0, 140)); }); });
      return [...new Set(out)]; });
    hits.forEach(h => seen.push(pg + ' · ' + h));
  }
  // a backup sealed with a password is the other meaning of the word, and stays
  const logoSeals = seen.filter(h => !/Seal the whole backup|sealed|seals your data|cannot seal your work|seal of the backup|Opening the seal/i.test(h));
  ok(logoSeals.length === 0, 'no page calls a logo a seal (sealing a backup keeps its word)', logoSeals);
  ok(errs.length === 0, 'no page error', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
