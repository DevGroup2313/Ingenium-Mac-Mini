// node rig/t_685_home.js <Ingenium page url> <out dir> [<Carpe Diem 1059 page url>]
// 6.8.5, in Chromium. The owner's words (28 October 2026): "I want the 'Your apps' section to actually show the brick
// jewelled sparkling pill look of the apps original button designs from Carpe Diem and the Forge"; of the Focus page's
// Inbox, "They are supposed to be button and look 3D and popped out and animated. I want them matching the rest of the
// apps look and design"; and "I want them to have similar sounds when I hover over the buttons inside of Ingenium the same
// way they are inside of Carpe Diem and the Forge". So:
//   - each app on Home is Carpe Diem's cut stone (its own stone picture, the gilt edge, the 8px cut corners), lettered
//     white (Fontes in its dark blue on ivory), with sparks at its corners on their own clocks; it lifts under the pointer;
//   - the Inbox's keys on the Focus page are raised keys: a face, an edge and a shadow, rising into place, lifting under
//     the pointer;
//   - the pointer coming onto either ticks (Touching a key), and pressing sounds as a key goes down;
//   - no errors.
// 6.8.7, her words: "Why are they so big and bulky? ... I want them back to their actual sizes like they are on Magister's
// dock." So the stones are measured against Carpe Diem 1059's keys on Magister's dock, in this same browser: 26px high,
// 6px by 14px around the name, Georgia 600 at 12px, as wide as the name, one row 6px apart; what each does is told when
// the pointer rests on it (and to a screen reader), not written beneath.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3], CD_URL = process.argv[4] || 'http://127.0.0.1:8150/cd/cd1059.html'; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(d).slice(0, 500))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngSound, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  await p.evaluate(() => go('home')); await p.waitForTimeout(900);
  await p.evaluate(() => document.getElementById('hxAppsH').scrollIntoView({ block: 'center' })); await p.waitForTimeout(500);
  const apps = await p.evaluate(() => [...document.querySelectorAll('.hx-apps .hx-app')].map(a => { const s = a.querySelector('.hx-stone'), cs = getComputedStyle(s), bf = getComputedStyle(s, '::before');
    return { app: a.getAttribute('data-app'), name: s.textContent.trim(), stone: /^url\("data:image\/svg\+xml;base64,/.test(cs.backgroundImage), edge: cs.borderTopColor, r: cs.borderTopLeftRadius, color: cs.color, font: cs.fontFamily.split(',')[0],
      spark: bf.animationName, clock: bf.animationDuration, star: /data:image\/svg\+xml/.test(bf.backgroundImage), title: a.title, label: a.getAttribute('aria-label'), beneath: a.querySelectorAll('.hx-ad').length,
      h: Math.round(s.getBoundingClientRect().height * 10) / 10, w: Math.round(s.getBoundingClientRect().width * 10) / 10, top: Math.round(s.getBoundingClientRect().top), pad: cs.padding, fs: cs.fontSize, fw: cs.fontWeight, ff: cs.fontFamily, gap: getComputedStyle(a.parentElement).columnGap }; }));
  ok(apps.length === 7 && apps.map(a => a.name).join() === 'Tabula,Abacus,Imago,Scriba,Fontes,Schedae,Clepsydra', 'seven apps, by name', apps.map(a => a.name).join());
  ok(apps.every(a => a.stone && a.edge === 'rgb(189, 154, 82)' && a.r === '8px'), "each is Carpe Diem's cut stone: its stone picture, the gilt edge, the 8px cut corners", JSON.stringify(apps.map(a => [a.app, a.stone, a.edge, a.r])));
  ok(apps.every(a => a.spark === 'hxGlitter' && a.star) && new Set(apps.map(a => a.clock)).size === 7, 'each has sparks at its corners, on a clock of its own', JSON.stringify(apps.map(a => [a.app, a.spark, a.clock])));
  ok(apps.filter(a => a.app !== 'fontes').every(a => a.color === 'rgb(255, 255, 255)') && apps.find(a => a.app === 'fontes').color === 'rgb(15, 75, 102)', "lettered white, and Fontes in its dark blue on ivory, as on Magister's dock", JSON.stringify(apps.map(a => [a.app, a.color])));
  ok(apps.every(a => /^\w+: .{4,}/.test(a.title) && /^Open \w+: /.test(a.label) && a.beneath === 0), 'what each does is told when the pointer rests on it and to a screen reader, not written beneath', JSON.stringify(apps.map(a => [a.title, a.beneath])));
  // the size of Carpe Diem's keys on Magister's dock, measured in Carpe Diem 1059 in this same browser
  const cd = await (async () => { const q = await ctx.newPage(); await q.goto(CD_URL); await q.waitForTimeout(12000);
    const r = await q.evaluate(() => [...document.querySelectorAll('.tabula-btn,.abacus-btn,.imago-btn')].filter(e => e.offsetParent).map(e => { const c = getComputedStyle(e), b = e.getBoundingClientRect();
      return { t: e.textContent.trim(), h: Math.round(b.height * 10) / 10, w: Math.round(b.width * 10) / 10, pad: c.padding, fs: c.fontSize, fw: c.fontWeight, ff: c.fontFamily, gap: getComputedStyle(e.parentElement).columnGap }; }));
    await q.close(); return r; })();
  ok(cd.length === 3, "Carpe Diem's dock keys were found to measure against", JSON.stringify(cd));
  const near = (a, b, d) => Math.abs(a - b) <= d;
  ok(apps.every(a => near(a.h, cd[0].h, 1) && a.pad === cd[0].pad && a.fs === cd[0].fs && a.fw === cd[0].fw && a.ff === cd[0].ff), "each stone is the height of Carpe Diem's dock key, with its padding and its lettering (" + cd[0].h + 'px, ' + cd[0].pad + ', ' + cd[0].fw + ' ' + cd[0].fs + ')',
    JSON.stringify(apps.map(a => [a.app, a.h, a.pad, a.fw, a.fs, a.ff.split(',')[0]])));
  ok(cd.every(k => { const a = apps.find(x => x.name === k.t); return a && near(a.w, k.w, 1.5); }), 'Tabula, Abacus and Imago are as wide as on the dock', JSON.stringify(cd.map(k => [k.t, k.w, (apps.find(x => x.name === k.t) || {}).w])));
  ok(new Set(apps.map(a => a.top)).size === 1 && apps.every(a => a.gap === cd[0].gap), 'they stand in one row, as far apart as on the dock (' + cd[0].gap + ')', JSON.stringify(apps.map(a => [a.app, a.top, a.gap])));
  const stones = await p.evaluate(() => new Set([...document.querySelectorAll('.hx-apps .hx-stone')].map(s => getComputedStyle(s).backgroundImage)).size);
  ok(stones === 7, 'seven stones, one for each app (Schedae amethyst, Clepsydra gold)', stones);
  await p.screenshot({ path: OUT + '/apps.png', clip: await p.evaluate(() => { const r = document.querySelector('.hx-appsec').getBoundingClientRect(); return { x: Math.max(0, r.left - 10), y: Math.max(0, r.top - 10), width: Math.min(1430, r.width + 20), height: r.height + 30 }; }) });
  // the pointer on a stone: it lifts, and ticks
  const bb = await p.evaluate(() => { const r = document.querySelector('.hx-app[data-app="abacus"] .hx-stone').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
  await p.mouse.move(4, 400); await p.mouse.click(4, 400); await p.waitForTimeout(200);   // a first touch, so the browser lets sound play
  const n0 = await p.evaluate(() => IngSound.count());
  await p.mouse.move(bb[0], bb[1]); await p.waitForTimeout(300);   // straight onto it, passing over no other key
  const hov = await p.evaluate(() => ({ t: getComputedStyle(document.querySelector('.hx-app[data-app="abacus"] .hx-stone')).transform, last: IngSound.last() }));
  const n1 = await p.evaluate(() => IngSound.count());
  ok(/matrix\(1, 0, 0, 1, 0, -[34]/.test(hov.t), 'under the pointer the stone lifts', hov.t);
  ok(n1 - n0 === 1 && hov.last && hov.last.role === 'hover', 'and ticks as the pointer comes onto it (Touching a key)', JSON.stringify({ d: n1 - n0, last: hov.last }));
  await p.screenshot({ path: OUT + '/apps-hover.png', clip: await p.evaluate(() => { const r = document.querySelector('.hx-appsec').getBoundingClientRect(); return { x: Math.max(0, r.left - 10), y: Math.max(0, r.top - 10), width: Math.min(1430, r.width + 20), height: r.height + 30 }; }) });
  await p.mouse.down(); await p.waitForTimeout(60);
  const pr = await p.evaluate(() => ({ t: getComputedStyle(document.querySelector('.hx-app[data-app="abacus"] .hx-stone')).transform, last: IngSound.last() }));
  await p.mouse.move(4, 400); await p.mouse.up(); await p.waitForTimeout(300);
  ok(pr.last && pr.last.role === 'keys', 'pressed, it sounds as a key goes down', JSON.stringify(pr));

  // the Focus page's Inbox
  await p.evaluate(() => { if (!Array.isArray(state.parked)) state.parked = []; state.parked.unshift({ id: 'tst' + Date.now(), t: 'This is beautiful to look at, I think our brainwaves like the colour purple', at: Date.now() - 2 * 86400000, sphere: 'creative' }); saveState(); go('focus'); });
  await p.waitForTimeout(900); await p.evaluate(() => { try { fxRenderPark(); } catch (e) {} const l = document.getElementById('fxParkList'); if (l) l.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(700);
  const ib = await p.evaluate(() => [...document.querySelector('#fxParkList .ib-item').querySelectorAll('.ib-acts .tc-chip')].map(k => { const c = getComputedStyle(k);
    return { t: k.textContent.trim(), act: k.classList.contains('ib-act'), sh: c.boxShadow, bg: c.backgroundImage, r: c.borderTopLeftRadius, bd: c.borderTopWidth, anim: c.animationName, h: Math.round(k.getBoundingClientRect().height) }; }));
  ok(ib.length >= 5 && ib.some(k => /To Tabula/.test(k.t)) && ib.every(k => k.act), 'the Inbox shows its keys (To a note, To Tabula and the rest)', JSON.stringify(ib.map(k => k.t)));
  ok(ib.every(k => k.sh !== 'none' && /gradient/.test(k.bg) && k.r === '11px' && k.bd === '1px' && k.h >= 34), 'each is a raised key: a face, an edge and a shadow, as the rest of Ingenium', JSON.stringify(ib.map(k => [k.sh.slice(0, 40), k.bg.slice(0, 30), k.r, k.bd, k.h])));
  ok(ib.every(k => k.anim === 'ibKeyIn'), 'they rise into place', JSON.stringify(ib.map(k => k.anim)));
  const kb = await p.evaluate(() => { const k = [...document.querySelectorAll('#fxParkList .ib-act')].find(x => /To Tabula/.test(x.textContent)); const r = k.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
  const m0 = await p.evaluate(() => IngSound.count());
  await p.mouse.move(kb[0], kb[1]); await p.waitForTimeout(420);
  const kh = await p.evaluate(() => ({ t: getComputedStyle([...document.querySelectorAll('#fxParkList .ib-act')].find(x => /To Tabula/.test(x.textContent))).transform, last: IngSound.last(), n: IngSound.count() }));
  ok(/matrix\(1, 0, 0, 1, 0, -[12]/.test(kh.t) && kh.n - m0 === 1 && kh.last.role === 'hover', 'under the pointer an Inbox key lifts and ticks', JSON.stringify(kh));
  await p.screenshot({ path: OUT + '/inbox.png', clip: await p.evaluate(() => { const r = document.getElementById('fxParkList').closest('.card,section,div').getBoundingClientRect(); return { x: Math.max(0, r.left - 10), y: Math.max(0, r.top - 30), width: Math.min(1430, r.width + 20), height: Math.min(900, r.height + 40) }; }) });
  await p.evaluate(() => { state.parked = state.parked.filter(x => !/^tst/.test(x.id)); saveState(); });
  ok(errs.length === 0, 'no errors on the page', errs.slice(0, 3).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
