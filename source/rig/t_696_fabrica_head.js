// node rig/t_696_fabrica_head.js <Ingenium page url> <out dir>
// Ingenium 6.96 (13 November 2026), in Chromium: Fabrica's header, the tree of your versions (modules/r294.js, on r290's shared header kit).
// Her words: "I also want the Fabrica page to get the same makeover as the others. I want everything inside of the 3 panel view look but I
// think that it is missing its header card with the nice 3D animation"; then "I also want you to commit and push the Fabrica redesign
// please." Invented people and an invented app (Quill Notes). Checks, at 1440 by 900 and on a phone (390):
//   Fabrica opens on the same header as Lector and Vocatio (r290's .skh: eyebrow, title, keys, line, hint) with the four steps under it as
//   Lector's are (Change, Keep, Test, Ship, as Fabrica's own steps stand); its own title row gives way (its Back to the work key stays);
//   with no app: the line says so and the tree waits, faded;
//   with an app: the tree reads its history (the trunk, an idea brought in as an arch, two ideas open as branches, two releases as collars,
//   a change not kept as a bead not yet set); the line names the app and what it holds; the first key stays New app, and the sheet it opens
//   stands in the window without the page moving; the label
//   names the newest version; a version under the pointer says its words; pressed, it opens what it changed (Compare);
//   it turns slowly, stills under the pointer, and Minimal motion holds it; by night it is drawn again; the three panels keep the window's
//   height under the header; on a phone the tree stands under the words (7.00) and nothing scrolls sideways; no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(800);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme(); go('fabrica'); });
    await sleep(1800);
    const h0 = await p.evaluate(() => { const pg = document.getElementById('page-fabrica'), h = pg.querySelector('.skh'), host = document.getElementById('fbHost'), row = pg.querySelector('.sks');
      const fh = document.querySelector('#fb .f-head'), vis = e => !!(e && e.offsetParent);
      return { part: window.__ingParts && window.__ingParts.p294, on: pg.classList.contains('sk-on'), head: !!h, before: !!(h && host && (h.compareDocumentPosition(host) & 4)), rowBefore: !!(row && (row.compareDocumentPosition(host) & 4)),
        eyebrow: h && h.querySelector('.skh-eyebrow').textContent, title: h && h.querySelector('.skh-title').textContent, keys: h ? [...h.querySelectorAll('.skh-k')].map(k => [k.textContent.trim(), k.classList.contains('pri')]) : [],
        says: h && (h.querySelector('.skh-says') || {}).textContent, hint: h && h.querySelector('.skh-hint').textContent, steps: row ? [...row.querySelectorAll('.sks-step')].map(s => s.querySelector('b').textContent + (s.getAttribute('aria-current') ? '*' : '')) : [],
        ownTitle: vis(fh && fh.querySelector('h1')), ownSteps: vis(document.getElementById('fbSteps')), back: !!document.getElementById('fbHome'), state: IngTree.state() }; });
    ok(h0.part === 'running' && h0.on && h0.head && h0.before && h0.rowBefore, 'Fabrica opens on the header Lector and Vocatio wear, the four steps under it, its three panels below (p294)', h0);
    ok(h0.eyebrow === 'IngeniumFabrica · the tree of your versions' && h0.title === 'Fabrica' && JSON.stringify(h0.keys) === '[["New app",true],["Bring one in",false]]' && /the tree to still it/.test(h0.hint),
      'its words and keys: the eyebrow, the title, New app and Bring one in, the hint', h0);
    ok(JSON.stringify(h0.steps.map(s => s.replace('*', ''))) === '["Change","Keep","Test","Ship"]' && h0.steps.filter(s => /\*$/.test(s)).length <= 1, 'the four steps, as Fabrica\'s own stand', h0.steps);
    ok(!h0.ownTitle && !h0.ownSteps && h0.back, 'Fabrica\'s own title row gives way to the header; its Back to the work key stays', h0);
    ok(/^No app chosen yet/.test(h0.says || '') && h0.state.tree === null, 'with no app: the line says so, and the tree waits', h0);
    await p.screenshot({ path: path.join(OUT, 'empty.png') });
    // an invented app with a history
    await p.evaluate(async () => { const enc = s => new TextEncoder().encode(s); IngRepo.setAuthor({ name: 'Ada Ferreira', email: 'ada@example.invalid' });
      const r = await IngRepo.create({ name: 'Quill Notes' }); const put = (f, t) => IngRepo.put(r.id, f, enc(t)), keep = m => IngRepo.commit(r.id, m);
      await put('index.html', '<!doctype html><title>Quill</title>'); await keep('The first version');
      for (const [i, m] of ['A reader for long notes', 'The export keeps its fonts', 'French for the guide'].entries()) { await put('n' + i + '.txt', 'v' + i); await keep(m); }
      await IngRepo.tag(r.id, 'v1.0');
      await IngRepo.branch(r.id, 'pdf-export'); await IngRepo.switchTo(r.id, 'pdf-export'); await put('pdf.js', '1'); await keep('A PDF of a whole notebook'); await put('pdf.js', '2'); await keep('The PDF keeps its pictures'); await IngRepo.switchTo(r.id, 'main');
      await put('m4.txt', '4'); await keep('Print in colour'); await IngRepo.merge(r.id, 'pdf-export', { msg: 'Merge pdf-export' });
      await IngRepo.branch(r.id, 'sync'); await IngRepo.switchTo(r.id, 'sync'); await put('sync.js', '1'); await keep('Notes shared with the tablet'); await IngRepo.switchTo(r.id, 'main');
      await put('m5.txt', '5'); await keep('Search by word');
      await IngRepo.branch(r.id, 'search'); await IngRepo.switchTo(r.id, 'search'); await put('s.txt', '1'); await keep('Search, a first try'); await put('s.txt', '2'); await keep('Search remembers'); await IngRepo.switchTo(r.id, 'main');
      await put('m6.txt', '6'); await keep('Notes sorted by date of their last change'); await IngRepo.tag(r.id, 'v1.1');
      await put('wip.txt', 'waiting');
      fbHubHost.FBS().sel = r.id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.paint(); });
    await sleep(2500);
    const h1 = await p.evaluate(() => { const h = document.querySelector('#page-fabrica .skh'), lab = h.querySelector('.skh-label');
      return { state: IngTree.state(), says: h.querySelector('.skh-says').textContent, key: h.querySelector('.skh-k.pri').textContent.trim(), label: lab ? [lab.querySelector('b').textContent, lab.querySelector('small').textContent] : null }; });
    ok(h1.state.tree && h1.state.tree.trunk >= 6 && h1.state.tree.arches === 1 && h1.state.tree.branches === 2 && h1.state.tree.tags === 2 && h1.state.tree.waiting === 1,
      'the tree reads the app: its trunk, the idea brought in as an arch, the two ideas open as branches, two releases, a change not kept', h1.state);
    ok(/^Quill Notes · main · \d+ versions · 3 ideas · 2 releases\. 1 change not kept yet\.$/.test(h1.says) && h1.key === 'New app', 'the line names the app, what it holds and the change not kept yet; the first key stays New app', h1);
    // the head's keys do not scroll the page (as r290's do not); the sheet New app opens stands in the window
    const sc0 = await p.evaluate(() => { const m = document.scrollingElement; let el = document.getElementById('page-fabrica'); while (el && el.scrollHeight <= el.clientHeight) el = el.parentElement; return (el || m).scrollTop; });
    await p.evaluate(() => document.getElementById('fbtGo').click()); await sleep(700);
    const sh = await p.evaluate(() => { const w = document.querySelector('#fb .f-sheet-wrap'), s = w && w.querySelector('.f-sheet'); if (!s) return null; const r = s.getBoundingClientRect(); let el = document.getElementById('page-fabrica'); while (el && el.scrollHeight <= el.clientHeight) el = el.parentElement;
      return { pos: getComputedStyle(w).position, top: r.top, bottom: r.bottom, ih: innerHeight, scroll: (el || document.scrollingElement).scrollTop }; });
    ok(sh && sh.pos === 'fixed' && sh.top >= 0 && sh.bottom <= sh.ih && sh.scroll === sc0, 'New app opens its sheet in the window, and the page does not move', { sh, sc0 });
    await p.keyboard.press('Escape'); await sleep(400); await p.evaluate(() => { const w = document.querySelector('#fb .f-sheet-wrap'); if (w) w.remove(); });
    ok(h1.label && h1.label[0].length <= 24 && /…$/.test(h1.label[0]) && /^[0-9a-f]{7} · the newest on main$/.test(h1.label[1]), 'the label names the newest version, shortened when long', h1.label);
    await p.screenshot({ path: path.join(OUT, 'quill_day.png') });
    // a version under the pointer, and pressed
    const beads = await p.evaluate(() => { const st = document.querySelector('#page-fabrica .fbt-stage'), r = st.getBoundingClientRect(); return { x: r.left, y: r.top, k: r.width / 460 }; });
    let found = null;
    for (let yy = 120; yy < 380 && !found; yy += 6) { await p.mouse.move(beads.x + 230 * beads.k, beads.y + yy * beads.k); await sleep(60);
      found = await p.evaluate(() => { const t = document.querySelector('#page-fabrica .fbt-tip'); return t && t.classList.contains('fbt-show') ? t.textContent : null; }); }
    ok(!!found && /[0-9a-f]{7}/.test(found), 'a version under the pointer says its words', found);
    const sc = () => p.evaluate(() => { let el = document.getElementById('page-fabrica'); while (el && el.scrollHeight <= el.clientHeight) el = el.parentElement; return (el || document.scrollingElement).scrollTop; });
    const scA = await sc();
    if (found) { await p.mouse.down(); await p.mouse.up(); await sleep(1600); }
    const v = await p.evaluate(() => fbHub.viewing()), scB = await sc();
    ok(v && v.view === 'compare', 'pressed, it opens what it changed (Compare)', v);
    // 6.97: her word, no scrolling down the page: a version pressed opens Compare in its sheet, and the page stays where it was
    ok(scA === scB, 'a version pressed does not move the page', { scA, scB });
    const hint2 = await p.evaluate(() => (document.querySelector('#page-fabrica .skh-hint') || {}).textContent || '');
    ok(/press a version to see what it changed, in the panels below\./.test(hint2), 'with an app open, the hint says where a version pressed opens: in the panels below', hint2);
    await p.keyboard.press('Escape'); await sleep(500);
    // motion: it turns, stills under the pointer, Minimal motion holds it
    await p.evaluate(() => document.querySelector('#page-fabrica .skh').scrollIntoView({ block: 'start' })); await p.mouse.move(40, 880); await sleep(1500);
    const a0 = await p.evaluate(() => IngTree.state().angle); await sleep(1500); const a1 = await p.evaluate(() => IngTree.state().angle);
    await p.mouse.move(beads.x + 230 * beads.k, beads.y + 60 * beads.k); await sleep(1600);
    const s0 = await p.evaluate(() => IngTree.state().angle); await sleep(1000); const s1 = await p.evaluate(() => IngTree.state().angle);
    await p.mouse.move(40, 880); await p.evaluate(() => document.body.setAttribute('data-motion', 'minimal')); await sleep(800);
    const m0 = await p.evaluate(() => IngTree.state().angle); await sleep(1200); const m1 = await p.evaluate(() => IngTree.state().angle);
    await p.evaluate(() => document.body.setAttribute('data-motion', 'calm'));
    ok(Math.abs(a1 - a0) > 0.05 && Math.abs(s1 - s0) < 0.01 && Math.abs(m1 - m0) < 1e-9, 'it turns slowly, stills under the pointer, and Minimal motion holds it', { turn: a1 - a0, still: s1 - s0, minimal: m1 - m0 });
    // by night, drawn again
    const px = () => p.evaluate(() => { const c = document.querySelector('#page-fabrica .fbt-cv'); const g = c.getContext('2d'); const d = g.getImageData(Math.round(c.width / 2), Math.round(c.height * 0.85), 1, 1).data; return [d[0], d[1], d[2], d[3]]; });
    const day = await px(); await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await sleep(1200); const nite = await px();
    await p.screenshot({ path: path.join(OUT, 'quill_night.png') });
    ok(JSON.stringify(day) !== JSON.stringify(nite) && nite[0] < day[0], 'by night the plinth and the tree are drawn again in the night\'s metal', { day, nite });
    // the panels keep the window's height under the header
    const fh = await p.evaluate(() => ({ h: document.getElementById('fb').offsetHeight, ih: innerHeight }));
    ok(Math.abs(fh.h - Math.max(420, fh.ih - 74)) <= 2, 'the three panels keep the window\'s height under the header', fh);
    // 7.06: an app opened as she opens it, by pressing its card in Your apps (Fabrica's own paint, never the exported one): the header follows
    await p.setViewportSize({ width: 1440, height: 1000 }); await p.evaluate(() => { state.theme = 'day'; applyTheme(); }); await sleep(600);
    await p.evaluate(async () => { const enc = s => new TextEncoder().encode(s); const r = await IngRepo.fromFiles([{ path: 'index.html', data: enc('<!doctype html><title>Ledger</title>') }], { name: 'ledger' });
      await IngRepo.put(r.id, 'a.txt', enc('1')); await IngRepo.commit(r.id, 'Household accounts, a second version'); await fbHubHost.refresh(); fbHubHost.paint(); });
    await sleep(1200);
    const pressed = await p.evaluate(() => { const c = [...document.querySelectorAll('#fb .f-repo')].find(x => /ledger/.test(x.textContent)); if (!c) return null; c.click(); return true; });
    await sleep(2500);
    const fol = await p.evaluate(() => ({ says: document.querySelector('#page-fabrica .skh-says').textContent, tree: IngTree.state().tree, open: (fbHubHost.cur() || {}).name || null }));
    ok(pressed && fol.open === 'ledger' && /^ledger · main · 2 versions/.test(fol.says) && fol.tree && fol.tree.trunk === 2, 'an app opened by pressing its card in Your apps: the header names it and grows its tree (7.06)', fol);
    // a phone
    await p.setViewportSize({ width: 390, height: 860 }); await sleep(900);
    const ph = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth, obj: getComputedStyle(document.querySelector('#page-fabrica .skh-obj')).display, head: !!document.querySelector('#page-fabrica .skh').offsetParent }));
    await p.screenshot({ path: path.join(OUT, 'phone.png') });
    ok(ph.sw <= ph.iw && ph.obj === 'block' && ph.head, 'on a phone the header stays, the tree stands under the words (7.00), and nothing scrolls sideways', ph);
    ok(!errs.length, 'no page error', errs);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 900)); }
  finally { await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0); }
})();
