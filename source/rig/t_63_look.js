// Ingenium 6.3 / The Forge 645 · the look of the new pages, and Fabrica calm (modules/r166.js, thoughts/fabrica_rooms.html), in
// Chromium. The owner's words (23 October 2026): "I don't like how you made every button wide and flat, please fix them and match
// them to the rest of the app's look"; the tour key moved up "does not look changed at all"; "The Copies, and GitHub section [...]
// seems truncated and does not show anything"; "remove the name "GitHub" from the app except for the sections that directly
// prompts users to connect to GitHub"; Fabrica's features "overwhelming just listed out without any tabs or organising". Checks:
//   - Home: the next step and the tour side by side, of one height, at 1600, 1280 and 1024 wide, with the longest next step
//     ("Load LFM2.5 2.6B into the engine");
//   - keys popped out (a shadow beneath) and as wide as their words: the tour's levels on the Guide, in Help and in Settings, the
//     Guide's chapters; on the first start, the levels' words at the left;
//   - Fabrica: four rooms, only the chosen room's tabs shown, the room following a view opened from elsewhere; Test and ship one
//     part at a time, Copies in sight when chosen, Make the chosen only with Ship and as wide as its words; an app's settings fold;
//   - the name GitHub in Fabrica only on the switch that connects to it; nowhere else on the pages walked;
//   - by night too; axe-core finds nothing in Fabrica's rooms and parts; no page errors;
//   - the Forge (forge=<url>): the same rooms and parts in its own colours, and its Fabrica without the name but on its switch.
//   node rig/t_63_look.js <url of Ingenium> <out folder> [forge=<url of the Forge>]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const args = process.argv.slice(2); const FORGE = (args.find(a => a.startsWith('forge=')) || '').slice(6); const [URL_, OUT] = args.filter(a => !a.startsWith('forge='));
fs.mkdirSync(OUT, { recursive: true });
const AXE = process.env.AXE_JS || '/tmp/claude-0/-home-user/61388abb-8c01-57dc-aeb9-f70a19a79e0d/scratchpad/tools/node_modules/axe-core/axe.min.js';
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; };
// a key: popped out (a shadow below it, not inset) and as wide as its words (within 70 pixels)
const KEY = `(el => { const cs = getComputedStyle(el), r = el.getBoundingClientRect(), rg = document.createRange(); rg.selectNodeContents(el); const need = rg.getBoundingClientRect().width + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) + 2;
  const below = cs.boxShadow.split(/,(?![^(]*\\))/).some(s => { const n = s.trim().match(/(-?\\d+(?:\\.\\d+)?)px (-?\\d+(?:\\.\\d+)?)px/); return n && +n[2] > 0 && !/inset/.test(s); });
  return { t: el.textContent.trim().slice(0, 24), w: Math.round(r.width), need: Math.round(need), below, fits: r.width <= need + 70 }; })`;
async function axe(p, sel) { if (!fs.existsSync(AXE)) return null; await p.addScriptTag({ path: AXE }); return p.evaluate(async sel => { const r = await axe.run(sel, { runOnly: ['wcag2a', 'wcag2aa'] }); return r.violations.map(v => v.id + ':' + v.nodes.length + ' ' + v.nodes.slice(0, 2).map(n => n.target.join(' ')).join(' | ')); }, sel); }
async function fabricaApp(p, open) {
  await p.evaluate(async () => { const r = await IngRepo.create({ name: 'Notes app' });
    await IngRepo.put(r.id, 'index.html', '<!doctype html><title>Notes</title><h1>Notes</h1>\n'); await IngRepo.put(r.id, 'README.md', '# Notes\nA small app.\n'); await IngRepo.commit(r.id, 'First version');
    await IngRepo.put(r.id, 'index.html', '<!doctype html><title>Notes</title><h1>My notes</h1>\n'); });
  await open(); await p.waitForTimeout(1500);
  await p.evaluate(() => { const t = document.querySelector('#fbRepos .f-repo'); if (t) t.click(); }); await p.waitForTimeout(1200);
}
async function rooms(p, label) {
  const st = await p.evaluate(() => ({ rooms: [...document.querySelectorAll('#fbRooms .fr-room')].map(b => b.textContent.trim() + (b.getAttribute('aria-pressed') === 'true' ? '*' : '')).join(','),
    shown: [...document.querySelectorAll('#fbViews button[data-v]')].filter(b => !b.hidden).map(b => b.textContent.replace(/\d+$/, '').trim()).join(','), over: (v => v.scrollWidth > v.clientWidth + 2)(document.getElementById('fbViews')) }));
  const seen = {};
  for (const r of ['story', 'plans', 'care', 'now']) { await p.evaluate(r => document.querySelector('#fbRooms .fr-room[data-room="' + r + '"]').click(), r); await p.waitForTimeout(700);
    seen[r] = await p.evaluate(() => [...document.querySelectorAll('#fbViews button[data-v]')].filter(b => !b.hidden).map(b => b.textContent.replace(/\d+$/, '').trim()).join(',')); }
  ok(st.rooms === 'Now*,Story,Plans,Care' && st.shown === 'Changes,Files,Code' && !st.over && seen.story === 'History,Compare,Releases' && seen.plans === 'Ideas,Issues,Pull requests,Projects,Wiki' && seen.care === 'Checks,Overview,Settings',
    label + ': the work in four rooms, only the chosen room\'s tabs shown (no row to scroll sideways)', { st, seen });
  await p.evaluate(() => fbHub.open('compare', {})); await p.waitForTimeout(700);
  const fol = await p.evaluate(() => ({ room: fbRooms.room(), on: (document.querySelector('#fbViews button[aria-selected="true"]') || {}).textContent }));
  ok(fol.room === 'story' && /Compare/.test(fol.on), label + ': a view opened from elsewhere (Compare) brings its room with it', fol);
  // Test and ship, one part at a time
  const parts = {};
  for (const k of ['test', 'ship', 'copies']) { await p.evaluate(k => document.getElementById('fbPart_' + k).click(), k); await p.waitForTimeout(600);
    parts[k] = await p.evaluate(() => { const secs = [...document.querySelectorAll('#fbShip .f-pn-b > .f-sec')].map(s => !s.classList.contains('fr-off')); const mk = document.getElementById('fbMakeAll'); const pn = document.querySelector('#fbShip .f-pn-b').getBoundingClientRect();
      const cp = document.getElementById('fbCopies').getBoundingClientRect(); return { secs: secs.join(','), make: !!mk.offsetParent, copiesSeen: cp.height > 40 && cp.top >= pn.top && cp.top < pn.bottom - 40 }; }); }
  const mk = await p.evaluate(() => document.getElementById('fbPart_ship').click()).then(() => p.waitForTimeout(400)).then(() => p.evaluate(`${KEY}(document.getElementById('fbMakeAll'))`));
  ok(parts.test.secs === 'true,false,false' && parts.ship.secs === 'false,true,false' && parts.copies.secs === 'false,false,true' && !parts.test.make && parts.ship.make && !parts.copies.make && parts.copies.copiesSeen && mk.fits,
    label + ': Test and ship shows one part at a time; Copies is in sight when chosen; Make the chosen shows with Ship only, as wide as its words', { parts, mk });
  // History: a version opens from its title line, a key of its own; its keys (and Compare, from the other part) are there
  await p.evaluate(() => { document.querySelector('#fbRooms .fr-room[data-room="story"]').click(); }); await p.waitForTimeout(400);
  await p.evaluate(() => document.querySelector('#fbViews button[data-v="history"]').click()); await p.waitForTimeout(800);
  await p.evaluate(() => { const h = document.querySelector('#fbWorkBody .f-cm .fr-cmh'); if (h) h.click(); }); await p.waitForTimeout(900);
  const hv = await p.evaluate(() => { const c = document.querySelector('#fbWorkBody .f-cm'), h = c && c.querySelector('.fr-cmh'); return c ? { open: c.getAttribute('data-open'), key: h && h.getAttribute('aria-expanded'), divAttr: c.hasAttribute('aria-expanded'), keys: [...c.querySelectorAll('.f-acts button')].map(b => b.textContent.trim()) } : null; });
  ok(hv && hv.open === 'true' && hv.key === 'true' && !hv.divAttr && hv.keys.includes('See the changes') && hv.keys.includes('Compare'), label + ': History: a version opens from its title line, a key of its own, with its keys and Compare', hv);
  const axh = await axe(p, '#fb');
  if (axh) ok(axh.length === 0, label + ': axe-core finds nothing in History with a version open', axh);
  // an app's settings fold
  await p.evaluate(() => { document.querySelector('#fbRooms .fr-room[data-room="care"]').click(); }); await p.waitForTimeout(500);
  await p.evaluate(() => document.querySelector('#fbViews button[data-v="settings"]').click()); await p.waitForTimeout(800);
  const fo = await p.evaluate(() => [...document.querySelectorAll('#fbWorkBody .fr-fh')].map(h => h.getAttribute('aria-expanded')));
  await p.evaluate(() => document.querySelectorAll('#fbWorkBody .fr-fh')[1].click()); await p.waitForTimeout(300);
  const fo2 = await p.evaluate(() => document.querySelectorAll('#fbWorkBody .fr-fh')[1].getAttribute('aria-expanded'));
  ok(fo.length >= 4 && fo[0] === 'true' && fo.slice(1).every(x => x === 'false') && fo2 === 'true', label + ': an app\'s settings are cards that fold: the first open, the others closed to their titles, each opened with a press', { fo, fo2 });
  // the name: only on the switch that connects to it
  await p.evaluate(() => { document.querySelector('#fbRooms .fr-room[data-room="now"]').click(); document.getElementById('fbPart_copies').click(); }); await p.waitForTimeout(500);
  const gh = await p.evaluate(() => { const all = document.getElementById('fb').innerText; const sw = [...document.querySelectorAll('#fbCopies .f-cp')].filter(c => /GitHub/.test(c.textContent)).map(c => c.querySelector('.t') ? c.querySelector('.t').firstChild.textContent : '');
    return { n: (all.match(/GitHub/g) || []).length, sw }; });
  ok(gh.sw.length >= 1 && gh.sw.every(t => /GitHub/.test(t)) && gh.n === gh.sw.length, label + ': in Fabrica the name GitHub is only on the switch that connects to it', gh);
  const ax = await axe(p, '#fb');
  if (ax) ok(ax.length === 0, label + ': axe-core finds nothing in Fabrica, its rooms and parts', ax);
}

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  {
    const ctx = await b.newContext({ viewport: { width: 1600, height: 1000 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    try {
      await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(800);
      await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
      // ---- Home ----
      const homes = {};
      for (const w of [1600, 1280, 1024]) { await p.setViewportSize({ width: w, height: 900 }); await p.evaluate(() => go('home')); await p.waitForTimeout(600);
        await p.evaluate(() => { document.getElementById('heroNext').textContent = 'Load LFM2.5 2.6B into the engine'; }); await p.waitForTimeout(300);
        homes[w] = await p.evaluate(() => { const a = document.getElementById('heroNext').getBoundingClientRect(), t = document.getElementById('homeTour').getBoundingClientRect(); return { row: Math.abs(a.top - t.top) < 3 && t.left > a.right, h: [Math.round(a.height), Math.round(t.height)] }; }); }
      await p.screenshot({ path: path.join(OUT, 'home.png'), clip: { x: 0, y: 0, width: 1024, height: 360 } });
      ok(Object.values(homes).every(x => x.row && Math.abs(x.h[0] - x.h[1]) <= 3), 'Home: the next step and the tour side by side, of one height, at 1600, 1280 and 1024 wide, with the longest next step', homes);
      await p.setViewportSize({ width: 1600, height: 1000 });
      // ---- the tour's levels and chapters ----
      await p.evaluate(() => go('guide')); await p.waitForTimeout(800);
      const lv = await p.evaluate(`[...document.querySelectorAll('#guideTour .ih-lvk')].map(${KEY})`), ch = await p.evaluate(`[...document.querySelectorAll('#guideTour .tour-entry-chap')].map(${KEY})`);
      ok(lv.length === 3 && lv.every(k => k.below && k.fits), 'the Guide: the tour\'s levels are keys, popped out and as wide as their words', lv);
      ok(ch.length >= 10 && ch.every(k => k.below && k.fits), 'the Guide: its chapters are keys, popped out and as wide as their words', ch.slice(0, 4));
      await p.screenshot({ path: path.join(OUT, 'guide.png'), clip: { x: 0, y: 0, width: 1600, height: 520 } });
      await p.evaluate(() => document.getElementById('ingHelpKey').click()); await p.waitForTimeout(700);
      const hl = await p.evaluate(`[...document.querySelectorAll('#ihPanel .ih-lvk')].map(${KEY})`);
      ok(hl.length === 3 && hl.every(k => k.below && k.fits), 'Help: the levels, popped out and as wide as their words', hl);
      await p.evaluate(() => { try { closeHelp(true); } catch (e) {} }); await p.waitForTimeout(300);
      await p.evaluate(() => go('settings')); await p.waitForTimeout(700);
      const sl = await p.evaluate(`[...document.querySelectorAll('#ihSetCard .ih-lvk')].map(${KEY})`);
      ok(sl.length === 3 && sl.every(k => k.below && k.w <= 360), 'Settings: the levels, popped out, none stretched across the page', sl);
      await p.evaluate(() => { try { tourStart(0); } catch (e) {} }); await p.waitForTimeout(900);
      const pick = await p.evaluate(() => [...document.querySelectorAll('#ingTour .ih-pickg .ih-k')].map(k => { const t = k.querySelector('.ih-lvt') || k.lastElementChild; return Math.round(t.getBoundingClientRect().left - k.getBoundingClientRect().left); }));
      ok(pick.length === 0 || (pick.length === 3 && Math.max(...pick) - Math.min(...pick) <= 2), 'the first start: the three levels\' words begin at the same place, at the left', pick);
      await p.evaluate(() => { try { tourEnd(); } catch (e) {} }); await p.waitForTimeout(300);
      // ---- Fabrica ----
      await p.evaluate(() => go('fabrica')); await p.waitForTimeout(1000);
      const lede = await p.evaluate(() => document.querySelector('#fb .f-head p').textContent);
      ok(/^Your workshop, on this device/.test(lede) && !/GitHub/.test(lede), 'Fabrica says what it is in its own words', lede);
      await fabricaApp(p, async () => { await p.evaluate(() => go('home')); await p.waitForTimeout(400); await p.evaluate(() => go('fabrica')); });
      await rooms(p, 'Ingenium');
      await p.screenshot({ path: path.join(OUT, 'fabrica.png') });
      // ---- the name, on the pages walked ----
      const pages = {};
      for (const pg of ['home', 'chat', 'code', 'focus', 'models', 'build', 'guide', 'settings']) { await p.evaluate(pg => go(pg), pg); await p.waitForTimeout(500);
        pages[pg] = await p.evaluate(pg => { const t = (document.getElementById('page-' + pg) || document.body).innerText; const all = (t.match(/GitHub/g) || []).length;
          const asks = (t.match(/(Upload|Connect|Sign in|Add from)[^.\n]*GitHub/g) || []).length; return all - asks; }, pg); }
      ok(Object.values(pages).every(n => n === 0), 'the name GitHub on Home, Chat, Code, Focus, Models, Build, the Guide and Settings only where it asks to connect to it (upload a kit there, add from it)', pages);
      // ---- by night ----
      const was = await p.evaluate(() => { const w = state.theme; state.theme = 'night'; applyTheme(); return w; }); await p.evaluate(() => go('fabrica')); await p.waitForTimeout(900);
      const night = await p.evaluate(() => document.body.getAttribute('data-theme'));
      ok(night === 'night', 'by night: Ingenium turns to night', night);
      await p.screenshot({ path: path.join(OUT, 'fabrica_night.png') });
      const axn = await axe(p, '#fb');
      if (axn) ok(axn.length === 0, 'by night, axe-core finds nothing in Fabrica', axn);
      await p.evaluate(w => { state.theme = w || 'auto'; applyTheme(); }, was);
      ok(!errs.length, 'Ingenium: no page errors', errs.slice(0, 4));
    } catch (e) { ok(false, 'Ingenium: the run crashed', e.stack); }
    await ctx.close();
  }
  if (FORGE) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    try {
      await p.goto(FORGE); await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 120000 }); await p.waitForTimeout(1200);
      await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await p.waitForTimeout(800);
      await p.evaluate(() => FORGE.openRoom('fabrica')); await p.waitForTimeout(1500);
      const sub = await p.evaluate(() => [(document.querySelector('#room-fabrica .section-sub') || {}).textContent || '', (document.querySelector('#fb .f-head p') || {}).textContent || '']);
      ok(sub.every(t => /^Your workshop/.test(t) && !/GitHub/.test(t)), 'the Forge: Fabrica says what it is in its own words', sub);
      await fabricaApp(p, async () => { await p.evaluate(() => FORGE.openRoom('files')); await p.waitForTimeout(400); await p.evaluate(() => FORGE.openRoom('fabrica')); });
      const acc = await p.evaluate(() => getComputedStyle(document.querySelector('#fbRooms .fr-room svg')).color);
      ok(!/106, 63, 181|183, 156, 230/.test(acc), 'the Forge: its rooms in the Forge\'s own colours, not Ingenium\'s', acc);
      await rooms(p, 'the Forge');
      await p.screenshot({ path: path.join(OUT, 'forge_fabrica.png') });
      ok(!errs.length, 'the Forge: no page errors', errs.slice(0, 4));
    } catch (e) { ok(false, 'the Forge: the run crashed', e.stack); }
    await ctx.close();
  }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
