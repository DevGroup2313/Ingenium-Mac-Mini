// node rig/t_694_lector.js <Ingenium page url> <out dir>
// Ingenium 6.94 (13 November 2026). Lector's head (modules/r290.js) rides with its wax seal, as she approved it on its live preview that day:
// "I approve of the was seal design for Lector, please push it everywhere." Before it, her words on the seal: "The seal engine needs to look
// like a real vintage wax stamp"; "The seal should not say Lector, instead it should read Ingenium at the top and the live latin date of the
// day at the bottom. It needs to also be animated and work like my own digital fidget spinner button on the page"; "Why are the seals just
// one colour? and why is the little engine circle sticking out like that"; "the middle circle animation at rest from the Home page".
// Checks, by day and by night at 1440 by 900, and on a phone (390): Lector opens on its head, the fan of three documents; at its foot the
// wax seal, drawn for the theme and for today (its date in Latin, as the device's clock gives it), in three lit layers (the wax with its
// lettering, the star, the pearl); (6.96) it sways with the stack of documents as one piece, casts no shadow behind it on the paper, and
// its pearl beats at rest with Home's heartbeat; under a mouse it
// leans and lifts, pressed it sinks, let go it knocks and plays one of Home's flourishes with Home's click, and nothing else happens; by
// night it is drawn again for the night; Minimal motion stills it; the Career Studio's compass stays held (modules/r293.js), so that page
// reads as in 6.93; no errors. The person is invented.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 700) : '')); } }
const enter = (p, th) => p.evaluate((th) => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} state.theme = th; applyTheme(); }, th);
const roman = n => { const v = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], s = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']; let o = ''; v.forEach((x, i) => { while (n >= x) { o += s[i]; n -= x; } }); return o; };
const MON = ['IANUARII', 'FEBRUARII', 'MARTII', 'APRILIS', 'MAII', 'IUNII', 'IULII', 'AUGUSTI', 'SEPTEMBRIS', 'OCTOBRIS', 'NOVEMBRIS', 'DECEMBRIS'];
(async () => {
  const b = await pw.chromium.launch();
  for (const th of ['day', 'night']) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngStudios, null, { timeout: 300000 }); await p.waitForTimeout(600);
    await enter(p, th);
    const today = await p.evaluate(() => { const d = new Date(); return [d.getDate(), d.getMonth(), d.getFullYear()]; });
    const latin = roman(today[0]) + ' · ' + MON[today[1]] + ' · ' + roman(today[2]);
    await p.evaluate(() => go('lector')); await p.waitForTimeout(2600);
    const lec = await p.evaluate(() => { const pg = document.getElementById('page-lector'), h = pg.querySelector('.skh'), docs = [...pg.querySelectorAll('.lf-card')].filter(d => !d.hidden);
      const hs = pg.querySelector('.lf-seal .lx-wax'), k = hs && hs.querySelector('.r175-seal'), im = c => ((hs && hs.querySelector(c)) || {}).src || '';
      const homeBeat = (() => { const e = document.querySelector('#page-home .seal-heart'); return e ? getComputedStyle(e).animationDuration : ''; })();
      return { on: pg.classList.contains('sk-on'), hero: !!h, before: !!(h && document.getElementById('lx7') && (h.compareDocumentPosition(document.getElementById('lx7')) & 4)), homeBeat, docs: docs.length, front: docs.filter(d => d.classList.contains('lf-f')).length,
        seal: !!hs, key: !!k, date: k ? k.getAttribute('data-date') : '', drawn: hs ? hs.__k2 : '', ring: im('.lxs-ring').slice(0, 22), star: im('.lxs-star').slice(0, 22), heart: im('.lxs-heart').slice(0, 22),
        idle: hs ? getComputedStyle(hs.querySelector('.isl-idle')).animationName : '', stack: (function () { const w = pg.querySelector('.lf-sway'); return w ? getComputedStyle(w).animationName + ' ' + getComputedStyle(w).animationDuration : ''; })(),
        cast: (function () { const c = pg.querySelector('.lf-seal .lxs-cast'); return c ? getComputedStyle(c).display : 'gone'; })(), beat: hs ? getComputedStyle(hs.querySelector('.lxs-heart')).animationName + ' ' + getComputedStyle(hs.querySelector('.lxs-heart')).animationDuration : '',
        panels: pg.querySelectorAll('#lx7 .l-pn').length }; });
    ok(lec.on && lec.hero && lec.before && lec.docs === 3 && lec.front === 1, th + ': Lector opens on its head, the fan of three documents, above its panels', lec);
    ok(lec.seal && lec.key && lec.date === latin, th + ': at its foot the wax seal, with today\'s date in Latin (' + latin + ')', lec);
    ok([lec.ring, lec.star, lec.heart].every(s => /^data:image\/png/.test(s)) && new RegExp('^white' + (th === 'night' ? 'n' : 'd')).test(lec.drawn || ''), th + ': its three lit layers are drawn for the ' + th + ' (white wax by day, the engine button\'s night by night)', lec);
    // 6.96: the seal is pressed on the sheet in front and sways with the stack as one piece, on Home's engine button's clock (7 seconds), its
    // own sway stilled; its pearl still beats with Home's heartbeat; and it casts no shadow on the paper (her words, 13 November 2026:
    // "remove the black dot/shadow that shows up behind the wax seal on the header")
    ok(lec.idle === 'none' && lec.stack === 'lfSway 7s' && lec.beat === 'sealBeat ' + (lec.homeBeat || '3.2s'), th + ': the seal sways with the stack as one piece, on Home\'s engine button\'s clock (7s), and its pearl beats at rest with Home\'s heartbeat, at Home\'s pace (' + lec.homeBeat + ')', lec);
    ok(lec.cast === 'none' || lec.cast === 'gone', th + ': no shadow behind the wax seal (6.96)', lec.cast);
    // 6.99, her words: "there is a clear bug that keeps on disappearing the wax seal. I hate that." Pressing the sheet in front, lifted under
    // the pointer, sent the seal behind it; now the seal stands off the paper in every state: at rest, lifted, pressed
    const zOf = () => p.evaluate(() => { const z = t => { const m = /matrix3d\(([^)]+)\)/.exec(t || ''); return m ? +m[1].split(',')[14] : 0; };
      return { seal: z(getComputedStyle(document.querySelector('#page-lector .lf-seal')).transform), card: z(getComputedStyle(document.querySelector('#page-lector .lf-card.lf-f')).transform) }; });
    const fc = await (await p.$('#page-lector .lf-card.lf-f')).boundingBox();
    await p.mouse.move(5, 5); await p.waitForTimeout(700); const zr = await zOf();
    await p.mouse.move(fc.x + fc.width * .5, fc.y + fc.height * .2, { steps: 4 }); await p.waitForTimeout(700); const zu = await zOf();
    await p.mouse.down(); await p.waitForTimeout(250); const zd = await zOf(); await p.mouse.move(5, 5, { steps: 3 }); await p.mouse.up(); await p.waitForTimeout(700);
    ok([zr, zu, zd].every(z => z.seal - z.card >= 3) && zd.card < zu.card, th + ': the seal stays in front of the paper at rest, lifted and pressed; a press sinks the sheet and the seal with it', { zr, zu, zd });
    // 6.99, her words: "please remove the weird dark shadow that is showing on the left top corner of the seal and documents". No blur or
    // drop shadow filter inside the stack's 3D frame, which the Mac's web view (Safari's engine) can set down out of place
    const filt = await p.evaluate(() => [...document.querySelectorAll('#page-lector .lf-tilt, #page-lector .lf-tilt *')].filter(e => e.getClientRects().length > 0).map(e => getComputedStyle(e).filter).filter(f => f && f !== 'none'));
    ok(filt.length === 0, th + ': no blur or drop shadow filter inside the stack\'s 3D frame; its shadows are painted soft without one', filt.slice(0, 6));
    const before = await p.evaluate(() => { window.__snd = []; if (window.IngSound && !IngSound.__spy) { const o = IngSound.play; IngSound.play = function (r, x) { __snd.push(r); return o.apply(this, arguments); }; IngSound.__spy = 1; }
      const c = document.querySelector('#page-lector .lf-card.lf-f'); return { page: [...document.querySelectorAll('[id^="page-"].active')].map(x => x.id).join(), cur: c ? c.getAttribute('aria-label') : '', y: Math.round(window.scrollY) }; });
    const key = await p.$('#page-lector .lf-seal .r175-seal'); const bb = await key.boundingBox();
    await p.mouse.move(bb.x + bb.width * .8, bb.y + bb.height * .3); await p.waitForTimeout(400);
    const hov = await p.evaluate(() => { const s = document.querySelector('#page-lector .lf-seal .isl'); return { hover: s.classList.contains('hover'), ry: s.style.getPropertyValue('--ry'), rx: s.style.getPropertyValue('--rx') }; });
    ok(hov.hover && parseFloat(hov.ry) > 0 && parseFloat(hov.rx) > 0, th + ': under a mouse it leans toward it and lifts', hov);
    await p.mouse.down(); await p.waitForTimeout(120); const dn = await p.evaluate(() => document.querySelector('#page-lector .lf-seal .isl').classList.contains('down'));
    await p.mouse.up(); await p.waitForTimeout(60);
    const fl = await p.evaluate(() => { const k = document.querySelector('#page-lector .lf-seal .r175-seal'), s = k.querySelector('.isl'); return { fl: k.getAttribute('data-flourish'), knock: s.classList.contains('knock'), snd: (window.__snd || []).slice() }; });
    ok(dn && fl.knock && !!fl.fl && fl.snd.indexOf('paper') >= 0, th + ': pressed, it sinks; let go, it knocks and plays one of Home\'s flourishes with Home\'s click', { dn, fl });
    await p.waitForTimeout(1500);
    const after = await p.evaluate(() => { const c = document.querySelector('#page-lector .lf-card.lf-f'); return { page: [...document.querySelectorAll('[id^="page-"].active')].map(x => x.id).join(), cur: c ? c.getAttribute('aria-label') : '', y: Math.round(window.scrollY) }; });
    ok(after.page === before.page && after.cur === before.cur && after.y === before.y, th + ': and nothing else happens', { before, after });
    await p.mouse.move(5, 5);
    await p.screenshot({ path: OUT + '/lector_' + th + '.png' });
    if (th === 'day') {
      // by night it is drawn again for the night
      await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(1500);
      const nn = await p.evaluate(() => (document.querySelector('#page-lector .lf-seal .lx-wax') || {}).__k2 || '');
      ok(/^whiten/.test(nn), 'by night the seal is drawn again for the night', nn);
      await p.evaluate(() => { state.theme = 'day'; applyTheme(); }); await p.waitForTimeout(800);
      // Vocatio's compass rides from 6.95 (modules/r293.js): the page opens on it
      await p.evaluate(() => go('career')); await p.waitForTimeout(1500);
      const car = await p.evaluate(() => ({ compass: !!document.querySelector('#page-career .skv'), head: !!document.querySelector('#page-career .skh'), on: !!window.ING_COMPASS, switch: !!(window.IngStudios && IngStudios.compassOn), cs: !!document.getElementById('cs') }));
      ok(car.compass && car.head && car.on && car.switch && car.cs, 'Vocatio\'s compass rides from 6.95 (modules/r293.js): the page opens on it', car);
      // Minimal motion stills the seal
      await p.evaluate(() => { document.body.setAttribute('data-motion', 'minimal'); go('lector'); }); await p.waitForTimeout(600);
      const st = await p.evaluate(() => { const hs = document.querySelector('#page-lector .lf-seal .lx-wax'); return { idle: getComputedStyle(hs.querySelector('.isl-idle')).animationName, beat: getComputedStyle(hs.querySelector('.lxs-heart')).animationName }; });
      ok(st.idle === 'none' && st.beat === 'none', 'Minimal motion stills the seal: no sway, no heartbeat', st);
    }
    ok(errs.length === 0, th + ': no errors on the page', errs);
    await ctx.close();
  }
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngStudios, null, { timeout: 300000 }); await p.waitForTimeout(600); await enter(p, 'day');
  await p.evaluate(() => go('lector')); await p.waitForTimeout(1500);
  const ph = await p.evaluate(() => { const h = document.querySelector('#page-lector .skh'); if (!h) return { none: true }; const r = h.getBoundingClientRect(); return { w: Math.round(r.width), sw: document.documentElement.scrollWidth, vw: innerWidth }; });
  ok(!ph.none && ph.w <= ph.vw && ph.sw <= ph.vw + 1, 'phone: Lector\'s head fits the screen, nothing wider than it', ph);
  await p.screenshot({ path: OUT + '/phone_lector.png' });
  ok(errs.length === 0, 'phone: no errors on the page', errs);
  await ctx.close();
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
