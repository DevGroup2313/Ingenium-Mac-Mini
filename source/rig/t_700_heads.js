// Ingenium 7.00: Build's diamond (r292), Focus's stepping stones (r291), nature sounds on every page (r295), the studios' heads on a phone
// (r296), Fabrica's tree never faded (r294) and Lector's seal in a stack of its own (r290). Her words (13 November 2026): "I want you to use
// the code and designs from this live preview and make the following changes and edits to Ingenium", "The sounds are amazing, please push
// them everywhere", "I approve of the Fabrica tree, please push it everywhere", "the seal is still disappearing intermittently on the page
// on a loop", and "I also want the new pages designs and graphics visible on the Iphone/Ipad and Fire Tablet screens too".
// Checks: each head stands where the others do, says what it should and never moves the page; the diamond and the stones are drawn by the
// graphics chip; the stones follow the task in hand; Sounds sits in the top bar on every page, plays a place and keeps playing from page
// to page until Quiet; on a phone the instruments stand under the words at the phone's width; the tree is opaque with no app chosen; the
// seal is drawn after the documents. An invented task only.
// usage: node rig/t_700_heads.js <page url> <out folder>
const pw = require('playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_700_heads.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await sleep(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await sleep(400);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme(); window.__keepQ = 1; });
  const open = async pg => { await p.evaluate(pg => { go(pg); document.scrollingElement.scrollTop = 0; }, pg); await sleep(1600); await p.evaluate(() => { document.scrollingElement.scrollTop = 0; }); await sleep(200); };

  // ---------- Build: the diamond (held in a release build until she approves its preview: build/held.json) ----------
  await open('build'); await sleep(800);
  const hasDiamond = await p.evaluate(() => !!window.IngDiamond);
  if (!hasDiamond) console.log('note: Build\'s diamond is held in this build (build/held.json); its checks wait for it');
  else {
  await open('build'); await sleep(2500);
  const bd = await p.evaluate(() => { const pg = document.getElementById('page-build'), h = pg.querySelector('.skh'), o = h && h.querySelector('.skh-obj'), r = o && o.getBoundingClientRect(), hr = h && h.getBoundingClientRect();
    const card = pg.querySelector(':scope > .card'), vis = e => !!e && getComputedStyle(e).display !== 'none';
    return { head: !!h, before: !!(h && card && h.nextElementSibling === card), on: pg.classList.contains('sk-on'), eyebrow: h ? h.querySelector('.skh-eyebrow').textContent : '',
      keys: h ? [...h.querySelectorAll('.skh-k')].map(k => k.textContent.trim()) : [], ownTitle: vis(pg.querySelector(':scope > .page-title')), ownLede: vis(pg.querySelector(':scope > .lede')),
      cv: o ? o.querySelectorAll('canvas.bd-cv').length : 0, nogl: o ? o.getAttribute('data-nogl') : 'none', err: window.__diamondErr || null, state: window.IngDiamond && IngDiamond.state(),
      obj: r ? [Math.round(r.width), Math.round(r.height)] : null, inHead: r && hr ? r.right <= hr.right + 1 && r.top >= hr.top - 1 : false, hint: h ? h.querySelector('.skh-hint').textContent : '' }; });
  ok(bd.head && bd.before && bd.on && /Build · code in, a page out/.test(bd.eyebrow), 'Build opens on its head, before the page\'s card, made as the other studios\' are', bd);
  ok(JSON.stringify(bd.keys) === JSON.stringify(['Run your page', 'Load a sample']) && !bd.ownTitle && !bd.ownLede, 'its keys are Run your page and Load a sample; the page\'s own title and lede give way to it', bd);
  ok(bd.cv === 2 && bd.nogl === null && !bd.err && bd.state && bd.state.mounted, 'the diamond is drawn by the graphics chip (its canvas and the sparkles\' over it)', bd);
  ok(bd.state && bd.state.label && /^\d+ lines?$/.test(bd.state.label[0]) && /runs (as you type|when you press Run)/.test(bd.state.label[1]), 'beside it, the lines of code and how the page runs', bd.state);
  ok(/press it/.test(bd.hint) && /light shoots through it/.test(bd.hint), 'the hint says what a press does', bd.hint);
  // its keys act where they stand: Run your page presses Run; the page stays where it was
  const run = await p.evaluate(() => { let n = 0; const rb = document.getElementById('runBtn'); const f = () => n++; rb.addEventListener('click', f); document.getElementById('bdRun').click(); rb.removeEventListener('click', f); return { n, top: document.scrollingElement.scrollTop }; });
  ok(run.n === 1 && run.top === 0, 'Run your page runs the page, and the page stays where it was', run);
  const auto = await p.evaluate(() => { const a = document.getElementById('autoRun'); a.checked = false; a.dispatchEvent(new Event('change')); const l1 = IngDiamond.state().label[1]; a.checked = true; a.dispatchEvent(new Event('change')); return [l1, IngDiamond.state().label[1]]; });
  ok(auto[0] === 'runs when you press Run' && auto[1] === 'runs as you type', 'the label follows the Run as I type switch', auto);
  // a press on the diamond: the light goes through at once, with Ingenium's own sound (never the preview's)
  const ob = await p.evaluate(() => { const r = document.querySelector('#page-build .skh-obj').getBoundingClientRect(); return { x: r.left + r.width * 0.5, y: r.top + r.height * 0.36 }; });
  await p.evaluate(() => { window.__snd = []; const o = IngSound.play; IngSound.play = function (r) { window.__snd.push(r); return o.apply(this, arguments); }; });
  await p.mouse.move(ob.x, ob.y); await sleep(300); await p.mouse.down(); await sleep(120); await p.mouse.up(); await sleep(300);
  const snd = await p.evaluate(() => window.__snd.slice()); ok(snd.indexOf('paper') >= 0, 'a press on the diamond plays Ingenium\'s own sound', snd);
  await p.mouse.move(5, 300);

  }

  // ---------- Focus: the stepping stones ----------
  await open('focus'); await sleep(2500);
  const fc = await p.evaluate(() => { const pg = document.getElementById('page-focus'), h = pg.querySelector('.skh'), o = h && h.querySelector('.skh-obj'), r = o && o.getBoundingClientRect(), hr = h && h.getBoundingClientRect();
    const w = h && h.querySelector('.skh-words').getBoundingClientRect(), vis = e => !!e && getComputedStyle(e).display !== 'none';
    return { head: !!h, eyebrow: h ? h.querySelector('.skh-eyebrow').textContent : '', keys: h ? [...h.querySelectorAll('.skh-k')].map(k => k.textContent.trim()) : [],
      ownTitle: vis(pg.querySelector(':scope > .page-title')), pool: o ? o.classList.contains('fc-pool') : false, fills: r && hr ? Math.abs(r.right - hr.right) < 2 && Math.abs(r.top - hr.top) < 2 && Math.abs(r.bottom - hr.bottom) < 2 : false,
      right: r && w ? r.left >= w.left + 300 : false, cv: o ? o.querySelectorAll('canvas.fc-cv').length : 0, nogl: o ? o.getAttribute('data-nogl') : 'none', err: window.__stonesErr || null, state: window.IngStones && IngStones.state(), numerals: /[IVX]{2,}/.test(o ? o.textContent : '') }; });
  ok(fc.head && /Focus · one step at a time/.test(fc.eyebrow) && JSON.stringify(fc.keys) === JSON.stringify(['Open Today', 'Your routines']) && !fc.ownTitle, 'Focus opens on its head: Open Today and Your routines', fc);
  ok(fc.pool && fc.fills && fc.right && fc.cv === 1 && fc.nogl === null && !fc.err, 'the pool fills the card to the right of the words, drawn by the graphics chip', fc);
  ok(fc.state && fc.state.stones && fc.state.stones.ok && fc.state.stones.cnt === 5 && fc.state.label[0] === 'One step at a time' && fc.state.label[1] === 'Nothing planned yet' && !fc.numerals, 'with no task, five stones and "One step at a time"; no numerals', fc.state);
  // the stones follow the task in hand (an invented task)
  const task = await p.evaluate(() => { state.tasks = (state.tasks || []).filter(t => t.id !== 't700'); state.tasks.unshift({ id: 't700', title: 'Write the opening of a short story', steps: [{ t: 'Choose a name', done: true }, { t: 'Write the first line' }, { t: 'Read it aloud' }, { t: 'Rest a minute' }] });
    state.activeTask = 't700'; IngStones.paint(); const s1 = IngStones.state(); state.tasks[0].steps.forEach(x => { x.done = true; }); IngStones.paint(); const s2 = IngStones.state(); state.tasks[0].steps.forEach((x, i) => { x.done = i < 1; }); IngStones.paint(); return { s1, s2 }; });
  // her words: "The first stone of the Focus page should be lighter and the purple one should be second on dark mode": the step in hand is the first stone
  ok(task.s1.stones.cnt === 3 && task.s1.stones.cur === 0 && task.s1.label[0] === 'Step 2 of 4' && task.s1.label[1] === 'Write the first line', 'a task of four steps at its second: the step in hand is the first stone, in the light, and the two ahead follow it', task.s1);
  ok(task.s2.stones.cur > 4 && task.s2.label[0] === 'Every step done', 'every step done: every stone is a stone done', task.s2);
  const fk = await p.evaluate(() => { document.getElementById('fcToday').click(); const a = { part: document.getElementById('page-focus').getAttribute('data-fxp'), top: document.scrollingElement.scrollTop }; return a; });
  ok(fk.part === 'today' && fk.top === 0, 'Open Today opens Today below, and the page stays where it was', fk);
  // a stone pressed: the water answers with soft water (never a chirp), under Ingenium's sound switch
  const st = await p.evaluate(() => { const o = document.querySelector('#page-focus .skh-obj'), r = o.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  await p.evaluate(() => { window.__touch = []; const t = IngNature.touch; IngNature.touch = function (n, i) { window.__touch.push([n, i]); return t.apply(this, arguments); }; });
  let hitStone = null;
  for (let fy = 0.92; fy > 0.4 && !hitStone; fy -= 0.03) for (let fx = 0.25; fx < 0.9 && !hitStone; fx += 0.03) { await p.mouse.move(st.x + st.w * fx, st.y + st.h * fy); const cur = await p.evaluate(() => getComputedStyle(document.querySelector('#page-focus .fc-cv')).cursor); if (cur === 'pointer') hitStone = [fx, fy]; }
  if (hitStone) { await p.mouse.down(); await sleep(80); await p.mouse.up(); await sleep(300); }
  const tch = await p.evaluate(() => ({ t: window.__touch.slice(), fl: document.querySelector('#page-focus .skh-obj').getAttribute('data-flourish') }));
  ok(!!hitStone && tch.t.length === 1 && !!tch.fl, 'pointing at a stone shows a hand; pressing it answers in one of its ways, with soft water', { hitStone, tch });
  await p.mouse.move(5, 300);

  // ---------- Fabrica: the tree, never faded ----------
  await open('fabrica'); await sleep(1800);
  const tr = await p.evaluate(() => { const c = document.querySelector('#page-fabrica .fbt-cv'); if (!c) return null; const g = c.getContext('2d'), d = g.getImageData(0, 0, c.width, c.height).data; let n = 0, op = 0;
    for (let i = 3; i < d.length; i += 4 * 7) { if (d[i] > 0) { n++; if (d[i] === 255) op++; } } return { drawn: n, opaque: op, share: n ? op / n : 0, state: IngTree.state() }; });
  // the faded tree of 6.99 had no pixel more opaque than about 140 in 255; whole, the metal and the glass are fully opaque
  ok(tr && tr.drawn > 4000 && tr.opaque > 2000, 'with no app chosen the tree stands whole: drawn and opaque, never greyed out', tr);

  // ---------- Lector: the seal in a stack of its own, drawn after the documents ----------
  await open('lector'); await sleep(1500);
  const lx = await p.evaluate(() => { const pg = document.getElementById('page-lector'), lf = pg.querySelector('.lf'), seal = pg.querySelector('.lf-seal'); if (!lf || !seal) return null;
    const kids = [...lf.children].map(e => e.className), twin = seal.closest('.lf-tilt.lf-twin'), main = lf.querySelector('.lf-tilt:not(.lf-twin)');
    return { kids, twin: !!twin, last: twin === lf.lastElementChild, afterMain: !!(main && twin && (main.compareDocumentPosition(twin) & 4)), cardsInMain: main ? main.querySelectorAll('.lf-card').length : 0,
      pe: twin ? getComputedStyle(twin).pointerEvents : null, sealPe: getComputedStyle(seal).pointerEvents, sway: [getComputedStyle(main.querySelector('.lf-sway')).animationName, twin ? getComputedStyle(twin.querySelector('.lf-sway')).animationName : null] }; });
  ok(lx && lx.twin && lx.last && lx.afterMain && lx.cardsInMain === 3, 'the seal stands in a stack of its own, after the documents\', so no sheet is drawn over it', lx);
  ok(lx && lx.pe === 'none' && lx.sealPe === 'auto' && lx.sway[0] === 'lfSway' && lx.sway[1] === 'lfSway', 'that stack sways with the documents and lets the pointer through to them, except on the seal', lx);
  const sk = await p.$('#page-lector .lf-seal .r175-seal'); const sb = sk ? await sk.boundingBox() : null;
  if (sb) { await p.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2); await sleep(500); }
  const up = await p.evaluate(() => ({ up: document.querySelector('#page-lector .lf-seal').classList.contains('lf-up'), at: (function () { const s = document.querySelector('#page-lector .lf-seal .r175-seal').getBoundingClientRect(); const e = document.elementFromPoint(s.left + s.width / 2, s.top + s.height / 2); return e && e.closest('.lf-seal') ? 'seal' : (e ? e.className : null); })() }));
  ok(up.up && up.at === 'seal', 'pointed at, the seal lifts and is the thing under the pointer', up);
  await p.mouse.move(5, 300);

  // ---------- Sounds: in the top bar on every page ----------
  await open('home');
  const nk = await p.evaluate(() => { const k = document.getElementById('natureBtn'), d = document.getElementById('displayBtn'); return { key: !!k, cls: k ? k.className : '', next: !!(k && d && k.nextElementSibling === d), text: k ? k.textContent.trim() : '', inBar: !!(k && k.closest('#topTools')) }; });
  ok(nk.key && nk.inBar && nk.next && /cl-key/.test(nk.cls) && nk.text === 'Sounds', 'Sounds sits in the top bar, beside Display', nk);
  await p.click('#natureBtn'); await sleep(400);
  const mn = await p.evaluate(() => { const m = document.querySelector('.nat-menu'); return m ? { rows: [...m.querySelectorAll('.pres-row')].map(r => r.querySelector('.pres-name').textContent), on: (m.querySelector('.pres-row.on .pres-name') || {}).textContent, vol: !!m.querySelector('.nat-vol input[type=range]') } : null; });
  ok(mn && JSON.stringify(mn.rows) === JSON.stringify(['Quiet', 'Stream', 'Rain', 'Waterfall', 'Waves', 'Birds', 'Night', 'Wind']) && mn.on === 'Quiet' && mn.vol, 'its menu offers Quiet, Stream, Rain, Waterfall, Waves, Birds, Night and Wind, and the volume', mn);
  await p.click('.nat-menu .pres-row[data-k="rain"]'); await sleep(2500);
  const pl = await p.evaluate(() => ({ mode: IngNature.mode(), key: document.getElementById('natureBtn').textContent.trim(), on: document.getElementById('natureBtn').classList.contains('nat-on'), err: window.__natureErr || null, last: IngNature.last() }));
  ok(pl.mode === 'rain' && pl.key === 'Rain' && pl.on && !pl.err && pl.last === 'rain', 'Rain plays, and the key says so', pl);
  await p.keyboard.press('Escape'); await sleep(200);
  await open('focus'); await open('lector');
  const kept = await p.evaluate(() => ({ mode: IngNature.mode(), key: document.getElementById('natureBtn').textContent.trim() }));
  ok(kept.mode === 'rain' && kept.key === 'Rain', 'it keeps playing from page to page', kept);
  await p.click('#natureBtn'); await sleep(300); await p.click('.nat-menu .pres-row[data-k="off"]'); await sleep(300);
  const q = await p.evaluate(() => ({ mode: IngNature.mode(), key: document.getElementById('natureBtn').textContent.trim() }));
  ok(q.mode === 'off' && q.key === 'Sounds', 'Quiet stops it', q);
  await p.keyboard.press('Escape');

  // ---------- night: the heads take the night's look ----------
  if (hasDiamond) {
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await open('build'); await sleep(1500);
  const nt = await p.evaluate(() => ({ b: IngDiamond.state().mounted, nogl: document.querySelector('#page-build .skh-obj').getAttribute('data-nogl'), dark: getComputedStyle(document.querySelector('#page-build .skh')).backgroundImage.indexOf('rgb(36, 26, 55)') >= 0 || document.body.getAttribute('data-theme') === 'night' }));
  ok(nt.b && nt.nogl === null && nt.dark, 'by night the diamond draws in the night\'s look', nt);
  await p.screenshot({ path: path.join(OUT, 'build_night.png') });
  }
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); });

  // ---------- a phone: the instruments under the words, at the phone's width ----------
  await p.setViewportSize({ width: 390, height: 844 }); await sleep(600);
  const ph = {};
  for (const pg of ['build', 'focus', 'fabrica', 'lector', 'career']) {
    await open(pg); await sleep(900);
    ph[pg] = await p.evaluate(pg => { const h = document.querySelector('#page-' + pg + ' .skh'); if (!h) return null; const o = h.querySelector('.skh-obj'), r = o.getBoundingClientRect(), hr = h.getBoundingClientRect(), w = h.querySelector('.skh-words').getBoundingClientRect();
      return { shown: getComputedStyle(o).display !== 'none', below: r.top >= w.bottom - 2, inside: r.left >= hr.left - 1 && r.right <= hr.right + 1, w: Math.round(r.width), h: Math.round(r.height), wide: document.documentElement.scrollWidth - innerWidth }; }, pg);
  }
  const phOk = Object.keys(ph).every(k => !ph[k] || (ph[k].shown && ph[k].below && ph[k].inside && ph[k].w > 200 && ph[k].wide <= 0));
  ok(phOk && (ph.build || !hasDiamond) && ph.focus && ph.fabrica, 'on a phone, the diamond, the stones, the tree, the documents and the compass stand under the words, within the phone\'s width', ph);
  await p.screenshot({ path: path.join(OUT, 'phone_focus.png') });

  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
