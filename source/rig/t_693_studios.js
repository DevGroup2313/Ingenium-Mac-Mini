// node rig/t_693_studios.js <Ingenium page url> <out dir>
// Ingenium 6.93 (12 November 2026). The heads of the Career Studio and Lector (modules/r290.js), as she approved them, with her changes after
// 6.92: "I want the little balls inside of the Career Studio's compass that contains the roman numerals to look more refined and match the
// compass and its metal and deepened visuals. I want the balls to just be flat and there with no animation"; then "The buttons inside of
// the compass are improved but still look ugly ... fake and pasted on the page"; of Lector, "I don't want pressing the engine button on the
// Lector page to do anything. I just want to use it as a fidget button ... matching that of the one from the Home page", and "you've
// massively regressed it from my approved design". Home's orbs wear the seal's finish (modules/r261.js) and still turn (r264).
// Checks, by day and by night at 1440 by 900, and on a phone (390): each page opens on its head above its kept panels; the dial carries one
// setting for each of the counsellor's stages, set in the bezel as its hub is, flat and still, turns the stage in hand under its index with
// every numeral upright, and turns again when another stage is pressed; Lector's head is the fan she approved, its seal Ingenium's own
// seal key: it leans and lifts under a mouse, sinks when pressed, plays a flourish and the seal's sound, and changes nothing else; names
// stay inside their heads; Minimal motion stills the turning; the new keys are the app's keys; no errors. The person is invented.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 700) : '')); } }
const enter = (p, th) => p.evaluate((th) => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} state.theme = th; applyTheme(); }, th);
const inside = (p, pg) => p.evaluate((pg) => { const h = document.querySelector('#page-' + pg + ' .skh'); if (!h) return { none: true }; const H = h.getBoundingClientRect();
  const out = [...h.querySelectorAll('.skh-label')].map(l => { const r = l.getBoundingClientRect(); return { t: l.textContent.trim().slice(0, 40), l: Math.round(r.left - H.left), r: Math.round(H.right - r.right), tp: Math.round(r.top - H.top), b: Math.round(H.bottom - r.bottom) }; });
  return { out, bad: out.filter(x => x.l < 0 || x.r < 0 || x.tp < 0 || x.b < 0) }; }, pg);
const rot = s => { const m = /matrix(?:3d)?\(([^)]+)\)/.exec(s || ''); if (!m) return 0; const v = m[1].split(',').map(Number); return Math.round(Math.atan2(v[1], v[0]) * 180 / Math.PI); };
(async () => {
  const b = await pw.chromium.launch();
  for (const th of ['day', 'night']) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngStudios, null, { timeout: 300000 }); await p.waitForTimeout(600);
    await enter(p, th);
    // Home: the orbs as before, with the seal's finish
    await p.evaluate(() => go('home')); await p.waitForTimeout(1500);
    const home = await p.evaluate(() => { const orbs = [...document.querySelectorAll('#hx .hx-head .oxo')];
      const one = o => { const sh = o.querySelector('.oxo-shade'), d = o.querySelector('.oxo-drift'), icon = o.querySelector('.oxo-ico svg');
        return { surf: !!o.querySelector('.oxo-surf'), drift: d ? getComputedStyle(d).animationName : 'none', rim: !!(sh && sh.querySelector('circle[stroke^="url"]')), sheen: !!o.querySelector('.oxs-sheen'),
          fade: !!o.querySelector('.oxo-surf g[mask]'), pearl: icon ? getComputedStyle(icon).stroke : '', sway: getComputedStyle(o.querySelector('.oxo-idle')).animationName }; };
      return { n: orbs.length, all: orbs.map(one), sphere: !!(window.IngOrrery && IngOrrery.sphere && IngOrrery.pearl) }; });
    ok(home.n === 6 && home.all.every(o => o.sway === 'oxSway'), th + ': Home keeps its six orbs and their sway', home.all.map(o => o.sway));
    ok(home.all.every(o => o.surf && o.drift === 'oxsTurn'), th + ': each orb\'s surface still turns under its light, as 6.72 made it (r264)', home.all.map(o => o.drift));
    ok(home.all.every(o => o.rim && o.sheen && o.fade && /oxPearl/.test(o.pearl)), th + ': each orb wears the seal\'s rim, its light, a surface fading to the edge, and the seal\'s pearl on its mark', home.all[0]);
    ok(home.sphere, th + ': Home gives the other heads the same orbs (IngOrrery.sphere, IngOrrery.pearl)', home);
    await p.screenshot({ path: OUT + '/home_' + th + '.png' });
    // the Career Studio: the dial (the counsellor's stages, with an invented person's first two done)
    await p.evaluate(() => { go('career'); const S = IngCareer.state(); S.profile.name = 'Rosalind Okafor'; S.ui.room = 'mentor'; S.ui.show = 'work';
      if (window.IngCounsel) { IngCounsel.done = k => k === 'have' || k === 'record'; IngCounsel.next = () => 'want'; IngCounsel.state().stage = 'want'; } IngCareer.render(); });
    await p.waitForTimeout(2600);
    const dial = await p.evaluate(() => { const pg = document.getElementById('page-career'), h = pg.querySelector('.skh'), st = IngStudios.state();
      const ups = [...pg.querySelectorAll('.skc-up')].map(u => getComputedStyle(u).transform), d = pg.querySelector('.skc-dial');
      return { on: pg.classList.contains('sk-on'), hero: !!h, before: h && h.nextElementSibling && h.nextElementSibling.id, orbs: pg.querySelectorAll('.skc-cart').length, lens: [...pg.querySelectorAll('.skc-cart')].map(c => { const im = c.querySelector('img'), cs = getComputedStyle(c); return { src: im ? (im.getAttribute('src') || '').slice(0, 22) : '', w: im ? im.naturalWidth : 0, num: (c.querySelector('.nm text:not(.sh)') || {}).textContent, anim: cs.animationName, sko: !!c.querySelector('.sko'), tr: cs.transitionDuration, shadow: cs.boxShadow }; }), stages: window.IngCounsel ? IngCounsel.stages.length : 0,
        T: st.T, cur: st.cur, dial: d ? getComputedStyle(d).transform : '', ups, index: !!pg.querySelector('.skc-index'), seal: !!pg.querySelector('.skc-seat .isl'), plate: !!(pg.querySelector('.skc-plateimg') || {}).src,
        bezel: ((pg.querySelector('.skc-bezelimg') || {}).src || '').slice(0, 22), inlay: !!pg.querySelector('.skc-dsvg .inl'), cur3: (pg.querySelector('.skc-cart[aria-current="step"]') || {}).getAttribute ? pg.querySelector('.skc-cart[aria-current="step"]').getAttribute('aria-label') : '',
        panels: pg.querySelectorAll('#cs .c-pn').length, csH: Math.round(document.getElementById('cs').getBoundingClientRect().height), vh: innerHeight, title: (h && h.querySelector('.skh-title') || {}).textContent }; });
    ok(dial.on && dial.hero && dial.before === 'cs' && dial.title === 'Career Studio', th + ': the Career Studio opens on its hero, above its panels', dial);
    ok(dial.stages === 5 && dial.orbs === 5 && dial.index && dial.seal && dial.plate && /^data:image\/png/.test(dial.bezel), th + ': the dial: Blend\'s plate, the turned bezel, the index, the seal at its heart, one setting for each of the five stages', dial);
    ok(dial.lens.every((l, i) => /^data:image\/png/.test(l.src) && l.w >= 72 && l.num === ['I', 'II', 'III', 'IV', 'V'][i]), th + ': each stage is set in the bezel as the hub is (Blend\'s setting, drawn with the dial\'s light), its numeral on the enamel', dial.lens);
    ok(dial.lens.every(l => l.anim === 'none' && !l.sko && /^0s/.test(l.tr) && l.shadow === 'none'), th + ': the stages are flat and still: no sway, no lift, no shadow floating over the bezel', dial.lens);
    ok(dial.cur === 2 && Math.abs(((dial.T % 360) + 360) % 360 - 216) < .5 && /^III\. What you want/.test(dial.cur3), th + ': the stage in hand (III) is turned under the index', dial);
    ok(Math.abs(((rot(dial.dial) + 360) % 360) - 216) <= 1, th + ': the bezel stands turned by as much', dial.dial);
    ok(dial.ups.every(u => Math.abs(((rot(u) + 360) % 360) - 144) <= 1), th + ': every numeral is turned back as far, so it stays upright', dial.ups);
    ok(dial.inlay, th + ': the path walked (I and II) is inlaid in the groove', dial);
    ok(dial.panels === 2 && Math.abs(dial.csH - (dial.vh - 74)) <= 2, th + ': its two panels are kept, as tall as the window', dial);
    let ins = await inside(p, 'career'); ok(ins.bad.length === 0 && ins.out.length >= 1, th + ': the dial\'s names stay inside its hero', ins);
    await p.screenshot({ path: OUT + '/career_' + th + '.png' });
    // press stage IV: the counsellor opens it and the dial turns to it, the short way round
    await p.evaluate(() => { IngCounsel.next = () => 'want'; }); await p.click('#page-career .skc-cart[aria-label^="IV."]', { force: true }); await p.waitForTimeout(1800);
    const turned = await p.evaluate(() => { const st = IngStudios.state(); return { T: st.T, cur: st.cur, stage: IngCounsel.state().stage, room: IngCareer.state().ui.room, bear: [...document.querySelectorAll('#page-career .skh-label')].map(l => l.textContent).join(' | ') }; });
    ok(turned.stage === 'go' && turned.cur === 3 && Math.abs(turned.T - (dial.T - 72)) < .5 && /IV · Where you could go/.test(turned.bear), th + ': pressing stage IV opens it and turns the dial one stage on, the short way', turned);
    // Lector: the fan deck
    await p.evaluate(() => go('lector')); await p.waitForTimeout(1600);
    const lec = await p.evaluate(() => { const pg = document.getElementById('page-lector'), h = pg.querySelector('.skh'), docs = [...pg.querySelectorAll('.lf-card')].filter(d => !d.hidden);
      return { on: pg.classList.contains('sk-on'), hero: !!h, docs: docs.length, cur: docs.filter(d => d.classList.contains('lf-f')).length, rib: docs.some(d => d.classList.contains('lf-f') && getComputedStyle(d.querySelector('.lf-ribbon')).display !== 'none'), grain: /^url\(/.test(getComputedStyle(pg.querySelector('.lf')).getPropertyValue('--lf-grain').trim()), leaves: docs.every(d => d.querySelectorAll('.lf-leaf').length === 3),
        seal: !!pg.querySelector('.lf-seal .r175-seal .isl'), sway: getComputedStyle(pg.querySelector('.lf-sway')).animationName, steps: pg.querySelectorAll('.sks-step').length, now: pg.querySelectorAll('.sks-step[aria-current="step"]').length, panels: pg.querySelectorAll('#lx7 .l-pn').length,
        lxH: Math.round(document.getElementById('lx7').getBoundingClientRect().height), vh: innerHeight, head: getComputedStyle(pg.querySelector('#lx7 .l-head')).display }; });
    ok(lec.on && lec.hero && lec.docs === 3 && lec.cur === 1 && lec.rib && lec.grain && lec.leaves && lec.seal && lec.sway === 'lfSway', th + ': Lector opens on the fan she approved: three grained sheets on their leaves, the one shown in front with its ribbon, Ingenium\'s seal key at its foot, swaying as one piece', lec);
    // the seal: Ingenium's own seal key, for fun only
    const before = await p.evaluate(() => { window.__snd = []; if (window.IngSound && !IngSound.__spy) { const o = IngSound.play; IngSound.play = function (r, x) { __snd.push(r); return o.apply(this, arguments); }; IngSound.__spy = 1; }
      const c = document.querySelector('#page-lector .lf-card.lf-f'); return { page: [...document.querySelectorAll('[id^="page-"].active')].map(x => x.id).join(), cur: c ? c.getAttribute('aria-label') : '', y: Math.round(window.scrollY + (document.querySelector('main') || {}).scrollTop || 0) }; });
    const key = await p.$('#page-lector .lf-seal .r175-seal'); const bb = await key.boundingBox();
    await p.mouse.move(bb.x + bb.width * .8, bb.y + bb.height * .3); await p.waitForTimeout(400);
    const hov = await p.evaluate(() => { const s = document.querySelector('#page-lector .lf-seal .isl'); return { hover: s.classList.contains('hover'), ry: s.style.getPropertyValue('--ry'), rx: s.style.getPropertyValue('--rx') }; });
    ok(hov.hover && parseFloat(hov.ry) > 0 && parseFloat(hov.rx) > 0, th + ': under a mouse the seal leans toward it and lifts, as Home\'s does', hov);
    await p.mouse.down(); await p.waitForTimeout(120); const dn = await p.evaluate(() => document.querySelector('#page-lector .lf-seal .isl').classList.contains('down'));
    await p.mouse.up(); await p.waitForTimeout(60);
    const fl = await p.evaluate(() => { const k = document.querySelector('#page-lector .lf-seal .r175-seal'), s = k.querySelector('.isl'); return { fl: k.getAttribute('data-flourish'), knock: s.classList.contains('knock'), snd: (window.__snd || []).slice() }; });
    ok(dn && fl.knock && !!fl.fl && fl.snd.indexOf('paper') >= 0, th + ': pressed, it sinks; let go, it knocks, plays one of Home\'s flourishes and the seal\'s sound', { dn, fl });
    await p.waitForTimeout(1500);
    const after = await p.evaluate(() => { const c = document.querySelector('#page-lector .lf-card.lf-f'); return { page: [...document.querySelectorAll('[id^="page-"].active')].map(x => x.id).join(), cur: c ? c.getAttribute('aria-label') : '', y: Math.round(window.scrollY + (document.querySelector('main') || {}).scrollTop || 0) }; });
    ok(after.page === before.page && after.cur === before.cur && after.y === before.y, th + ': and nothing else happens: the same page, the same document, the same place', { before, after });
    await p.mouse.move(5, 5);
    ok(lec.steps === 4 && lec.now === 1, th + ': Lector\'s four steps stand under the hero as Blend\'s step cards, one in hand', lec);
    ok(lec.panels === 3 && Math.abs(lec.lxH - (lec.vh - 74)) <= 2 && lec.head === 'none', th + ': its three panels are kept, as tall as the window', lec);
    await p.screenshot({ path: OUT + '/lector_' + th + '.png' });
    if (th === 'day') {
      // the keys: the app's own press and sound (modules/r176.js)
      const keys = await p.evaluate(() => { const sel = ['.skh-k', '.sks-step', '.skc-cart', '.lf-card']; let s = ''; try { s = KEYSEL; } catch (e) { s = ''; }
        const src = [...document.querySelectorAll('script')].map(x => x.textContent).find(t => /var KEYSEL=/.test(t)) || ''; return sel.map(k => (s || src).indexOf(k) >= 0); });
      ok(keys.every(Boolean), 'the heads\' keys, step cards, stages and documents are the app\'s keys', keys);
      // Minimal motion stills the turning, the sway and the breath
      await p.evaluate(() => { document.body.setAttribute('data-motion', 'minimal'); go('career'); }); await p.waitForTimeout(500);
      const still = await p.evaluate(() => { const pg = document.getElementById('page-career'); return { dial: getComputedStyle(pg.querySelector('.skc-dial')).transitionDuration, sway: getComputedStyle(pg.querySelector('.skh-sway')).animationName,
        spin: getComputedStyle(pg.querySelector('.skc-seat .seal-spin')).animationName }; });
      ok(/^0s/.test(still.dial) && still.sway === 'none' && still.spin === 'none', 'Minimal motion stills the dial\'s turn, the sway and the seal at its heart', still);
    }
    ok(errs.length === 0, th + ': no errors on the page', errs);
    await ctx.close();
  }
  // a phone: the words and the cards, no object, nothing wider than the screen
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngStudios, null, { timeout: 300000 }); await p.waitForTimeout(600); await enter(p, 'day');
  for (const pg of ['career', 'lector']) {
    await p.evaluate(pg => go(pg), pg); await p.waitForTimeout(1200);
    const ph = await p.evaluate((pg) => { const h = document.querySelector('#page-' + pg + ' .skh'); if (!h) return { none: true }; const r = h.getBoundingClientRect();
      return { w: Math.round(r.width), obj: getComputedStyle(h.querySelector('.skh-obj')).display, sw: document.documentElement.scrollWidth, vw: innerWidth }; }, pg);
    ok(ph.obj === 'none' && ph.w <= ph.vw && ph.sw <= ph.vw + 1, 'phone: ' + pg + ' keeps its words and keys, no object, nothing wider than the screen', ph);
    await p.screenshot({ path: OUT + '/phone_' + pg + '.png' });
  }
  ok(errs.length === 0, 'phone: no errors on the page', errs);
  await ctx.close();
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
