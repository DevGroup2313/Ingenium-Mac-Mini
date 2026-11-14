// Ingenium 7.01: Build's diamond rides (r292), on the holder she chose, with the light and the press she asked for; Focus's landscape fills
// the whole header card and its stones go by their place on the path (r291); Fabrica's tree stands for any app, and every part of it
// answers a press (r294). Her words (14 November 2026): "I like this preview and the holder design with the seal button, I want you to push
// it everywhere but please refine the light animations and the other animations of the page, they are too brusque and intense"; "I need
// the diamond and the holder to be clickable and animated"; "I want the orrerry to be spinning inside of the diamond holder when I click on
// the surface the same way that it does on the compass from Vocatio, I want matching animations"; "I want the diamond to feel like a
// clickable button and have vaious effects and animations similar to the animations and effects of the engine button throughout Ingenium's
// pages"; "The lighter stone should be first on the Focus page on Night mode and the purple stone should be second"; "For the Focus page,
// the darker purple stone should be the first stone on Day mode"; "I also don't want half of the Focus header card to be black or have this
// dark shadow, I want the whole card to be filled with the purple landscape design and animation"; "The tree from Fabrica is missing and
// its surface are not clickable, especially the seal button."
// The parts of the holder are found with the module's own hit test (IngDiamond.part), then pressed with the pointer, one point each: in a
// software renderer a pointer sweep is too slow. The stones' colours are read from a picture of the card at the stones' own places
// (IngStones.state().stones.pos). An invented task and invented apps only.
// usage: node rig/t_701_heads.js <page url> <out folder>
const pw = require('playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_701_heads.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const LORD = ['spin', 'pulse', 'hop', 'twirl', 'beat', 'grand'];
(async () => {
  const b = await pw.chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await sleep(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await sleep(400);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme(); });
  const open = async pg => { await p.evaluate(pg => { go(pg); document.scrollingElement.scrollTop = 0; }, pg); await sleep(1600); await p.evaluate(() => { document.scrollingElement.scrollTop = 0; }); await sleep(200); };
  await p.evaluate(() => { window.__snd = []; const o = IngSound.play; IngSound.play = function (r) { window.__snd.push(r); return o.apply(this, arguments); }; });
  const sounds = () => p.evaluate(() => window.__snd.splice(0));

  // ---------- Build: the diamond on its holder ----------
  await open('build'); await sleep(2500);
  const bd = await p.evaluate(() => { const pg = document.getElementById('page-build'), h = pg.querySelector('.skh'), o = h && h.querySelector('.skh-obj');
    return { has: !!window.IngDiamond, head: !!h, on: pg.classList.contains('sk-on'), cv: o ? o.querySelectorAll('canvas.bd-cv').length : 0, nogl: o ? o.getAttribute('data-nogl') : 'none',
      err: window.__diamondErr || null, state: window.IngDiamond ? IngDiamond.state() : null, hint: h ? h.querySelector('.skh-hint').textContent : '' }; });
  ok(bd.has && bd.head && bd.on && bd.state && bd.state.mounted && bd.cv === 2 && bd.nogl === null && !bd.err, 'Build\'s diamond rides in this build (no longer held): its head stands, drawn by the graphics chip', bd);
  ok(bd.hint === 'Point at the diamond and it turns to you. Press it, or any part of its holder, and it answers.', 'the hint says what the pointer and a press do', bd.hint);
  if (!bd.has) { console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(1); }
  const box = await p.evaluate(() => { const r = document.querySelector('#page-build .skh-obj').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
  const [BX, BY, BW, BH] = box;
  // what answers where, by the module's own hit test; for each part, the point deepest inside it (the most neighbours of the same part)
  const mapParts = () => p.evaluate(([BX, BY, BW, BH]) => { const S = 0.02, g = {}, cnt = {};
    for (let fy = 0.04; fy < 0.99; fy += S) for (let fx = 0.04; fx < 0.99; fx += S) { const k = IngDiamond.part(BX + BW * fx, BY + BH * fy); if (!k) continue; g[fx.toFixed(2) + ',' + fy.toFixed(2)] = k; cnt[k] = (cnt[k] || 0) + 1; }
    const best = {}; for (const key in g) { const k = g[key], [fx, fy] = key.split(',').map(Number); let n = 0;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) if (g[(fx + dx * S).toFixed(2) + ',' + (fy + dy * S).toFixed(2)] === k) n++;
      if (!best[k] || n > best[k].n) best[k] = { n, x: BX + BW * fx, y: BY + BH * fy }; }
    return { cnt, best }; }, box);
  const m0 = await mapParts();
  ok(m0.cnt.stone > 100 && ['dial', 'logo', 'bezel', 'band', 'rim'].every(k => m0.cnt[k] > 0), 'the stone and every part of its holder answer the pointer: the Orrery\'s face, the seal, the bezel, the band of jewels and the rim', m0.cnt);
  const pressAt = async (x, y) => { await p.mouse.move(x, y); await sleep(250); await p.mouse.down(); await sleep(90); await p.mouse.up(); await sleep(250); };
  // the diamond pressed: one of the engine button's flourishes; pressed again once it is done, another of them
  await sounds();
  const st = m0.best.stone; await pressAt(st.x, st.y);
  const f1 = await p.evaluate(() => IngDiamond.flourish()), s1 = await sounds();
  ok(f1.count === 1 && LORD.indexOf(f1.n) >= 0 && s1.indexOf('paper') >= 0, 'pressed, the diamond answers as the engine button does: one of its flourishes, with Ingenium\'s own sound', { f1, s1 });
  await sleep(2700); await pressAt(st.x, st.y);
  const f2 = await p.evaluate(() => IngDiamond.flourish());
  ok(f2.count === 2 && LORD.indexOf(f2.n) >= 0 && f2.n !== f1.n, 'pressed again once it has finished, it answers in another of its ways', [f1.n, f2.n]);
  await p.mouse.move(5, 300); await sleep(2800);
  // the Orrery at rest: its own slow pace
  const r0 = await p.evaluate(() => [performance.now(), IngDiamond.holder().da]); await sleep(2500); const r1 = await p.evaluate(() => [performance.now(), IngDiamond.holder().da]);
  const rest = r1[1] - r0[1];
  // the seal, the bezel, the band and the rim: each pressed where it is, found again with the pointer over the holder (the case leans to it)
  const got = {};
  for (const k of ['logo', 'bezel', 'band', 'rim']) {
    let pt = m0.best[k], hit = null;
    for (let tries = 0; tries < 3 && pt; tries++) {
      await p.mouse.move(pt.x, pt.y); await sleep(700);
      if (await p.evaluate(([x, y]) => IngDiamond.part(x, y), [pt.x, pt.y]) === k) { hit = pt; break; }
      pt = (await mapParts()).best[k];
    }
    if (!hit) { got[k] = 'not found'; continue; }
    await p.evaluate(() => document.querySelector('#page-build .skh-obj').removeAttribute('data-part'));
    await p.mouse.down(); await sleep(90); await p.mouse.up(); await sleep(300);
    got[k] = await p.evaluate(() => document.querySelector('#page-build .skh-obj').getAttribute('data-part'));
  }
  const s2 = await sounds();
  ok(['logo', 'bezel', 'band', 'rim'].every(k => got[k] === k) && s2.filter(x => x === 'paper').length >= 4, 'the seal, the bezel, the band of jewels and the rim each answer a press, with the same sound', { got, s2 });
  // the Orrery pressed: it turns as on Vocatio's compass, a burst that slows back to its own pace
  let dp = (await mapParts()).best.dial; await p.mouse.move(dp.x, dp.y); await sleep(700);
  if (await p.evaluate(([x, y]) => IngDiamond.part(x, y), [dp.x, dp.y]) !== 'dial') { dp = (await mapParts()).best.dial; await p.mouse.move(dp.x, dp.y); await sleep(700); }
  await p.evaluate(() => document.querySelector('#page-build .skh-obj').removeAttribute('data-part'));
  const d0 = await p.evaluate(() => [performance.now(), IngDiamond.holder().da]); await p.mouse.down(); await sleep(90); await p.mouse.up(); await sleep(2410);
  const d1 = await p.evaluate(() => [performance.now(), IngDiamond.holder().da, document.querySelector('#page-build .skh-obj').getAttribute('data-part')]);
  const turned = d1[1] - d0[1];
  ok(d1[2] === 'dial' && turned > rest + 0.4, 'a press on the holder\'s face sets the Orrery turning, as on Vocatio\'s compass', { rest: +rest.toFixed(3), pressed: +turned.toFixed(3), part: d1[2] });
  await p.screenshot({ path: path.join(OUT, 'build_day.png') });
  await p.mouse.move(5, 300);
  const top = await p.evaluate(() => document.scrollingElement.scrollTop);
  ok(top === 0, 'no press moved the page', top);
  // by night
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await open('build'); await sleep(1500);
  const nt = await p.evaluate(() => ({ st: IngDiamond.state(), nogl: document.querySelector('#page-build .skh-obj').getAttribute('data-nogl'), err: window.__diamondErr || null }));
  ok(nt.st.mounted && nt.nogl === null && !nt.err && nt.st.look === 'night', 'by night the diamond is the night stone, drawn by the graphics chip', nt);
  await p.screenshot({ path: path.join(OUT, 'build_night.png') });
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); });

  // ---------- Focus: the landscape over the whole card, the stones by their place ----------
  await open('focus'); await sleep(1500);
  await p.evaluate(() => { state.tasks = (state.tasks || []).filter(t => t.id !== 't701'); state.tasks.unshift({ id: 't701', title: 'Plan a small garden', steps: [{ t: 'Measure the bed', done: true }, { t: 'Choose the seeds', done: true }, { t: 'Sow the first row' }, { t: 'Water it' }] }); state.activeTask = 't701'; IngStones.paint(); });
  const look = async tag => {
    await sleep(1800);
    const g = await p.evaluate(() => { const h = document.querySelector('#page-focus .skh'), o = h.querySelector('.skh-obj'), r = o.getBoundingClientRect(), hr = h.getBoundingClientRect(), hn = h.querySelector('.skh-hint').getBoundingClientRect(), s = IngStones.state().stones;
      return { r: [r.left, r.top, r.width, r.height], hr: [hr.left, hr.top, hr.width, hr.height], hint: [hn.left - r.left, hn.top - r.top, hn.width, hn.height], cur: s.cur, cnt: s.cnt, pos: s.pos }; });
    const buf = await p.screenshot({ clip: { x: g.r[0], y: g.r[1], width: g.r[2], height: g.r[3] } });
    fs.writeFileSync(path.join(OUT, 'focus_' + tag + '.png'), buf);
    const px = await p.evaluate(async ({ b64, pos, hint }) => { const im = new Image(); im.src = 'data:image/png;base64,' + b64; await im.decode(); const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0);
      const at = (u, v) => { const d = x.getImageData(Math.round(u) - 3, Math.round(v) - 3, 7, 7).data; let R = 0, G = 0, B = 0, n = 0; for (let i = 0; i < d.length; i += 4) { R += d[i]; G += d[i + 1]; B += d[i + 2]; n++; } R /= n * 255; G /= n * 255; B /= n * 255; return { rgb: [R, G, B].map(v => +v.toFixed(3)), L: +(0.2126 * R + 0.7152 * G + 0.0722 * B).toFixed(3) }; };
      // the brightest patch round the hint's words (its box, widened by 24 px), the words themselves aside: the 75th percentile of the patches
      const L = []; for (let v = hint[1] - 24; v < hint[1] + hint[3] + 24; v += 8) for (let u = Math.max(4, hint[0] - 24); u < hint[0] + hint[2] + 24; u += 8) L.push(at(u, v).L); L.sort((a, b) => a - b);
      return { stones: pos.map(([u, v]) => at(u, v)), hintBright: L[Math.floor(L.length * 0.75)] }; }, { b64: buf.toString('base64'), pos: g.pos, hint: g.hint });
    return { g, px };
  };
  const dy = await look('day');
  const whole = q => Math.abs(q.r[0] - q.hr[0]) < 2 && Math.abs(q.r[1] - q.hr[1]) < 2 && Math.abs(q.r[2] - q.hr[2]) < 2 && Math.abs(q.r[3] - q.hr[3]) < 2;
  ok(whole(dy.g), 'the landscape fills the whole header card: no dark half beside the words', dy.g);
  const wd = await p.evaluate(() => { const h = document.querySelector('#page-focus .skh'), t = h.querySelector('.skh-title'), k = document.getElementById('fcToday'), a = t.getBoundingClientRect(), kb = k.getBoundingClientRect();
    const e1 = document.elementFromPoint(a.left + a.width / 2, a.top + a.height / 2), e2 = document.elementFromPoint(kb.left + kb.width / 2, kb.top + kb.height / 2); return { title: !!(e1 && e1.closest('.skh-words')), key: !!(e2 && (e2 === k || k.contains(e2))) }; });
  ok(wd.title && wd.key, 'the words and the keys stand over the landscape, and the keys are still the things pressed', wd);
  const [d0s, d1s] = dy.px.stones;
  ok(dy.g.cur === 2 && d0s.L < d1s.L - 0.15 && d0s.rgb[2] > d0s.rgb[1] + 0.2, 'by day the deeper violet stone comes first on the path, the pearl one second', dy.px.stones.slice(0, 2));
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); });
  const ng = await look('night');
  const [n0s, n1s] = ng.px.stones;
  ok(whole(ng.g), 'by night too the landscape fills the whole card', ng.g);
  ok(n0s.L > n1s.L + 0.15 && n1s.rgb[2] > n1s.rgb[1] + 0.25, 'by night the light stone comes first on the path, the purple one second', ng.px.stones.slice(0, 2));
  // 7.00's water measured 0.53 there (a white streak of glint where no moon explains it); 7.01's, 0.27
  ok(ng.px.hintBright < 0.42, 'by night the hint\'s words lie on the dark water, not on a white streak of glint', ng.px.hintBright);
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); state.tasks = state.tasks.filter(t => t.id !== 't701'); state.activeTask = null; IngStones.paint(); });

  // ---------- Fabrica: the tree at its true size, every part pressable, standing for any app ----------
  await open('fabrica'); await sleep(1800);
  const fz = await p.evaluate(() => { const st = document.querySelector('#page-fabrica .fbt-stage'), cv = st.querySelector('.fbt-cv'), r = st.getBoundingClientRect(); return { w: r.width, h: r.height, tf: getComputedStyle(st).transform, cvw: cv.width, dpr: Math.min(2, devicePixelRatio || 1), tree: IngTree.state().tree }; });
  ok(Math.abs(fz.w - 423.2) < 0.6 && Math.abs(fz.h - 423.2) < 0.6 && fz.tf === 'none' && Math.abs(fz.cvw - Math.round(423.2 * fz.dpr)) <= 1, 'the tree is drawn at its true size, never shrunk afterwards by the page (so never blurred)', fz);
  const sr = await p.evaluate(() => { const r = document.querySelector('#page-fabrica .fbt-stage').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
  // the star at the top of the trunk: down the middle until its words show
  let star = null;
  for (let yy = 40; yy < 300 && !star; yy += 5) { await p.mouse.move(sr[0] + sr[2] / 2, sr[1] + yy); await sleep(50); if (await p.evaluate(() => { const t = document.querySelector('#page-fabrica .fbt-tip'); return !!t && t.classList.contains('fbt-show'); })) star = yy; }
  if (star) { await p.mouse.down(); await sleep(70); await p.mouse.up(); await sleep(200); }
  const sp = await p.evaluate(() => IngTree.state()), s3 = await sounds();
  ok(!!star && sp.pressed && sp.pressed.head && sp.pressed.kind === 'main' && sp.pressed.ago < 1500 && s3.indexOf('paper') >= 0, 'the star at the top of the trunk answers a press (it swells, with a ring of light), with Ingenium\'s own sound', { star, pressed: sp.pressed, s3 });
  // the trunk: its beads cover most of it (a press there opens a version), so the bare trunk under the lowest bead, above the base
  let lastBead = null, tk = null, tp = null;
  for (let yy = star ? star : 110; yy < sr[3] - 40; yy += 4) { await p.mouse.move(sr[0] + sr[2] / 2, sr[1] + yy); await sleep(30);
    const c = await p.evaluate(() => { const s = document.querySelector('#page-fabrica .fbt-stage'), t = document.querySelector('#page-fabrica .fbt-tip'); return { bead: !!(t && t.classList.contains('fbt-show')), part: s.classList.contains('fbt-on-part') }; });
    if (c.bead) lastBead = yy; else if (c.part && lastBead !== null && yy > lastBead + 6 && yy < lastBead + 30) {
      await p.mouse.down(); await sleep(70); await p.mouse.up(); await sleep(200); tp = await p.evaluate(() => IngTree.state());
      if (tp.knockedPart === 'trunk' && tp.knocked < 1500) { tk = yy; break; } } }
  ok(!!tk && tp.turn > 0.5, 'pointed at, the trunk shows a hand; pressed, it turns the tree', { tk, lastBead, knocked: tp && tp.knocked, part: tp && tp.knockedPart, turn: tp && tp.turn });
  await p.mouse.move(5, 300); await sleep(3500);
  // the base: pointed at, the tree stills; pressed, it turns, then slows
  let pl = null;
  for (let yy = sr[3] - 20; yy > sr[3] - 140 && !pl; yy -= 6) { await p.mouse.move(sr[0] + sr[2] * 0.3, sr[1] + yy); await sleep(40); if (await p.evaluate(() => document.querySelector('#page-fabrica .fbt-stage').classList.contains('fbt-on-part'))) pl = yy; }
  let still = null, spun = null;
  if (pl) { await sleep(1500); const a0 = await p.evaluate(() => IngTree.state().angle); await sleep(1500); const a1 = await p.evaluate(() => IngTree.state().angle);
    await p.mouse.down(); await sleep(70); await p.mouse.up(); await sleep(1500); const a2 = await p.evaluate(() => IngTree.state().angle); still = a1 - a0; spun = a2 - a1; }
  ok(pl !== null && Math.abs(still) < 0.05 && spun > 1.0, 'pointed at, the tree stills; a press on its base turns it, then it slows', { pl, still, spun });
  await p.mouse.move(5, 300);
  // invented apps of one version and of two
  for (const n of [1, 2]) {
    await p.evaluate(async n => { const enc = s => new TextEncoder().encode(s); IngRepo.setAuthor({ name: 'Ada Ferreira', email: 'ada@example.invalid' });
      const r = await IngRepo.create({ name: 'Tiny ' + n }); for (let i = 0; i < n; i++) { await IngRepo.put(r.id, 'f' + i + '.txt', enc('v' + i)); await IngRepo.commit(r.id, 'Version ' + (i + 1)); }
      fbHubHost.FBS().sel = r.id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.paint(); }, n);
    await sleep(2500);
    const t = await p.evaluate(() => { const c = document.querySelector('#page-fabrica .fbt-cv'), g = c.getContext('2d'), d = g.getImageData(0, 0, c.width, c.height).data; let n = 0, op = 0; for (let i = 3; i < d.length; i += 4 * 7) { if (d[i] > 0) { n++; if (d[i] === 255) op++; } } return { drawn: n, opaque: op, st: IngTree.state(), says: document.querySelector('#page-fabrica .skh-says').textContent }; });
    ok(t.st.tree && t.st.tree.trunk === n && t.st.beads === n && t.drawn > 4000 && t.opaque > 2000 && new RegExp('· ' + n + ' versions?\\.$').test(t.says), 'an app of ' + (n === 1 ? 'a single version' : 'two versions') + ': its tree stands, the trunk with ' + (n === 1 ? 'its version' : 'both versions') + ' on it', t);
    await p.screenshot({ path: path.join(OUT, 'fabrica_' + n + '.png'), clip: { x: sr[0] - 40, y: sr[1] - 10, width: sr[2] + 80, height: sr[3] + 20 } });
  }

  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
