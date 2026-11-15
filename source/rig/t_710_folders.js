// Folders without endless scrolling (Ingenium 7.10, build/modules/r300.js). Her words (15 November 2026): "The Folders page and the apps
// pages inside of the Folders page are really long and I have to scroll endlessly"; on the live preview: "I approve of your recommendation
// for rge Folders Without Scrolling preview, please push it everywhere." With an invented library (six apps, 144 notes), at 1440 by 900:
//   1. the Folders page is compact: Your apps in one row without the "+ A folder" card, six envelopes in one row with their words folded
//      away, the build library and How I work side by side, and the page about two screens tall (it was 2.9)
//   2. an envelope pressed opens its words in a raised sheet in the window; the sheet's key is the envelope's own (the file window opens);
//      Escape closes it
//   3. a folder open: the head folds to the drawer's front, the papers have divider tabs, one paper shows, the page under two screens
//      (it was 4.8); the front pressed unfolds the head, and again folds it
//   4. one drawer stands open at a time; an open drawer of 13 cards shows about eight and flips through the rest with the wheel, the page
//      itself not moving
//   5. a paper chosen stays chosen when Folders draws the folder again (a decision added)
//   6. by night the dividers keep their depth; nothing on the page is rewritten while it is left alone; below 760 pixels none of it
//      applies and nothing is wider than the screen; no page error
//   node rig/t_710_folders.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_710_folders.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true }); const OUTA = path.resolve(OUT);
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; return !!c; };
const APPS = ['Quill', 'Ledger', 'Lantern', 'Atlas', 'Meridian', 'Harbor'], PARTS = ['Pages', 'Footnotes', 'Ruler', 'Tables', 'Search', 'Export', 'Seal', 'Sounds'];
const NOTES = {}; const para = (a, w) => ('The ' + w + ' of ' + a + ' keeps what the reader set, and its history says why each change was made. ').repeat(6);
for (const a of APPS) { NOTES[a + '/00 Index.md'] = '# ' + a + '\n\n' + para(a, 'index') + '\n';
  for (const pt of PARTS) NOTES[a + '/' + pt + '_history.md'] = '# ' + pt + ' (' + a + '): its history\n\n' + para(a, pt.toLowerCase()) + '\n';
  for (let v = 1; v <= 13; v++) NOTES[a + '/versions/' + a + ' 1.' + v + ' handoff.md'] = '# ' + a + ' 1.' + v + '\n\n' + para(a, 'version') + '\n';
  NOTES[a + '/How I work on it.md'] = '# How I work on ' + a + '\n\n' + para(a, 'way') + '\n'; NOTES[a + '/Design notes.md'] = '# Design notes\n\n' + para(a, 'design') + '\n'; }
const ZIP = path.join(OUTA, 'invented_library.zip');
cp.execFileSync('python3', ['-I', '-c', 'import sys,json,zipfile\nnotes=json.loads(sys.stdin.read())\nz=zipfile.ZipFile(sys.argv[1],"w",zipfile.ZIP_DEFLATED)\n[z.writestr(k,v) for k,v in notes.items()]\nz.close()', ZIP], { input: JSON.stringify(NOTES) });
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 300)));
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(400);
    await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} go('folders'); document.scrollingElement.scrollTop = 0; }); await p.waitForTimeout(800);
    ok(await p.evaluate(() => !!window.IngFoldersCompact), 'the page carries r300 (IngFoldersCompact)');
    const lib = await p.evaluate(() => !!window.IngBuildLib);
    if (lib) { const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => { const k = [...document.querySelectorAll('#page-folders button')].find((x) => /^Bring in (the build library|more notes)$/.test(x.textContent.trim())); k.click(); })]);
      await fc.setFiles(ZIP); await p.waitForFunction(() => IngBuildLib.load().then((L) => L.notes.length >= 144), null, { timeout: 30000 }).catch(() => {}); }
    else await p.evaluate((apps) => { apps.forEach((n) => { try { IngFolders.add ? IngFolders.add(n) : null; } catch (e) {} }); }, APPS);
    await p.waitForTimeout(1500); await p.evaluate(() => { document.querySelectorAll('.ing-toast,#ingToast').forEach((t) => t.remove()); document.scrollingElement.scrollTop = 0; });
    // 1. the Folders page, compact
    const home = await p.evaluate(() => { const pg = document.getElementById('page-folders'), top = (e) => Math.round(e.getBoundingClientRect().top), vis = (e) => e.offsetParent !== null;
      const cards = [...pg.querySelectorAll('.fld-grid>.fld-card')].filter(vis), envs = [...pg.querySelectorAll('.fd-env')].filter(vis), libc = pg.querySelector('#fldBody>.fd-libcard'), how = pg.querySelector('#fldBody>.fw-how');
      return { st: IngFoldersCompact.state(), screens: +(document.scrollingElement.scrollHeight / innerHeight).toFixed(2), h: document.scrollingElement.scrollHeight,
        cardRows: new Set(cards.map(top)).size, cards: cards.length, newShown: [...pg.querySelectorAll('.fld-grid>.fld-new')].some(vis), envRows: new Set(envs.map(top)).size, envs: envs.length,
        paraShown: envs.some((e) => [...e.children].some((c) => c.tagName === 'P' && vis(c))), side: libc && how ? { same: top(libc) === top(how), apart: Math.abs(libc.getBoundingClientRect().left - how.getBoundingClientRect().left) > 200 } : null }; });
    ok(home.st.home && !home.st.open, 'the Folders page is dressed compact (fw-home)', home.st);
    ok(home.cards >= 6 && home.cardRows === 1 && !home.newShown, 'Your apps stand in one row, without the "+ A folder for another app" card (the head holds that key)', home);
    ok(home.envs === 6 && home.envRows === 1 && !home.paraShown, 'the six envelopes stand in one row, their words folded away', home);
    if (lib) ok(home.side && home.side.same && home.side.apart, 'the build library and How I work stand side by side', home.side);
    ok(home.screens <= 2.3, 'the Folders page is about two screens tall (' + home.screens + ' screens, ' + home.h + ' px; it was 2.9 on 7.09)', home);
    await p.screenshot({ path: OUTA + '/1_home.png' });
    // 2. an envelope's sheet
    await p.evaluate(() => { const e = document.querySelector('#page-folders .fd-env'); e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(); });
    await p.click('#page-folders .fd-env >> nth=0', { position: { x: 30, y: 30 } }); await p.waitForTimeout(700);
    const sh = await p.evaluate(() => { const s = document.querySelector('.fw-sheet'), e = document.querySelector('#page-folders .fd-env'); if (!s) return null; const cs = getComputedStyle(s);
      return { title: s.querySelector('.fw-st').textContent, envTitle: e.querySelector('b').textContent, words: (s.querySelector('p') || {}).textContent || '', keys: [...s.querySelectorAll('.fld-acts button')].map((x) => x.textContent), raised: cs.boxShadow !== 'none', fixed: cs.position === 'fixed', film: [...document.body.children].some((c) => c !== s && getComputedStyle(c).position === 'fixed' && /rgba\(\s*\d+,\s*\d+,\s*\d+,\s*0?\.[1-9]/.test(getComputedStyle(c).backgroundColor) && c.getBoundingClientRect().width >= innerWidth - 2 && c.getBoundingClientRect().height >= innerHeight - 2) }; });
    ok(sh && sh.title === sh.envTitle && sh.words.length > 40 && sh.keys.length >= 1 && sh.raised && sh.fixed && !sh.film, 'an envelope pressed opens its words and keys in a raised sheet in the window, with no film over the page', sh);
    await p.screenshot({ path: OUTA + '/2_sheet.png' });
    const chooser = await Promise.race([p.waitForEvent('filechooser', { timeout: 4000 }).then(() => true).catch(() => false), (async () => { await p.click('.fw-sheet .fld-acts button >> nth=0'); return new Promise((r) => setTimeout(() => r(null), 4500)); })()]);
    ok(chooser === true, 'the sheet\'s key is the envelope\'s own: pressed, it opens the file window', chooser);
    await p.click('#page-folders .fd-env >> nth=0', { position: { x: 30, y: 30 } }); await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    ok(await p.evaluate(() => !document.querySelector('.fw-sheet')), 'Escape closes the sheet');
    // 3. a folder open
    await p.evaluate(() => { const f = IngFolders.folders().find((x) => x.name === 'Quill') || IngFolders.folders()[0]; state.folders.ui.open = f.id; IngFolders.paint(); document.scrollingElement.scrollTop = 0; }); await p.waitForTimeout(1800);
    const op = await p.evaluate(() => { const pg = document.getElementById('page-folders'), head = pg.querySelector('.fd-head').getBoundingClientRect().height;
      const divs = [...pg.querySelectorAll('.fw-dividers .fw-div')].map((x) => x.firstChild.textContent.trim()), shown = [...pg.querySelectorAll('.fd-right>.card')].filter((c) => c.offsetParent !== null).length;
      return { st: IngFoldersCompact.state(), head: Math.round(head), divs, shown, screens: +(document.scrollingElement.scrollHeight / innerHeight).toFixed(2), h: document.scrollingElement.scrollHeight }; });
    ok(op.st.open && !op.st.unfold && op.head <= 210, 'with a folder open the head folds to the drawer\'s front (' + op.head + ' px; it was 480)', op);
    ok(op.divs.join('|') === 'How it was built|Decisions|Conversations|GitHub|Words' && op.shown === 1, 'the folder\'s papers have divider tabs, and one paper shows', op);
    ok(op.screens <= 2.0, 'the folder is under two screens tall (' + op.screens + ' screens, ' + op.h + ' px; it was 4.8 on 7.09)', op);
    await p.screenshot({ path: OUTA + '/3_open.png' });
    await p.evaluate(() => { const t = document.querySelector('#page-folders .fd-dfront .fd-label') || [...document.querySelectorAll('#page-folders .fd-dfront *')].find((x) => !x.closest('input,label,button') && x.textContent.trim()); (t || document.querySelector('#page-folders .fd-dfront')).click(); }); await p.waitForTimeout(800);
    const unf = await p.evaluate(() => ({ st: IngFoldersCompact.state(), head: Math.round(document.querySelector('#page-folders .fd-head').getBoundingClientRect().height) }));
    await p.evaluate(() => { const t = document.querySelector('#page-folders .fd-dfront .fd-label') || [...document.querySelectorAll('#page-folders .fd-dfront *')].find((x) => !x.closest('input,label,button') && x.textContent.trim()); (t || document.querySelector('#page-folders .fd-dfront')).click(); }); await p.waitForTimeout(800);
    const ref = await p.evaluate(() => IngFoldersCompact.state().unfold);
    ok(unf.st.unfold && unf.head >= 400 && ref === false, 'the drawer\'s front pressed unfolds the head (' + unf.head + ' px), and pressed again folds it', { unf, ref });
    // 4. one drawer at a time
    if (lib) {
      const d0 = await p.evaluate(() => [...document.querySelectorAll('#page-folders .fd-right .cdw')].map((d) => d.getAttribute('data-open')).join(''));
      await p.evaluate(() => { const ds = [...document.querySelectorAll('#page-folders .fd-right .cdw')]; ds[ds.length - 1].querySelector('.cdw-pull').click(); }); await p.waitForTimeout(1000);
      const d1 = await p.evaluate(() => { const ds = [...document.querySelectorAll('#page-folders .fd-right .cdw')], last = ds[ds.length - 1], bx = last.querySelector('.cdw-box');
        return { open: ds.map((d) => d.getAttribute('data-open')).join(''), cards: last.querySelectorAll('.bl-card').length, box: Math.round(bx.getBoundingClientRect().height), more: last.classList.contains('fw-more'), sh: bx.scrollHeight }; });
      ok(d0 === '1000' && d1.open === '0001', 'one drawer stands open at a time: Start here first; pressing Versions opens it and shuts the others', { d0, d1 });
      ok(d1.cards === 13 && d1.box <= 380 && d1.more, 'an open drawer of 13 cards shows about eight (' + d1.box + ' px of ' + d1.sh + ') and says the rest are flipped through', d1);
      await p.evaluate(() => { const ds = [...document.querySelectorAll('#page-folders .fd-right .cdw')]; ds[ds.length - 1].querySelector('.cdw-box').scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(400);
      const before = await p.evaluate(() => { const ds = [...document.querySelectorAll('#page-folders .fd-right .cdw')], bx = ds[ds.length - 1].querySelector('.cdw-box'), r = bx.getBoundingClientRect(); return { y: document.scrollingElement.scrollTop, x: Math.round(r.left + r.width / 2), yy: Math.round(r.top + r.height / 2), st: bx.scrollTop }; });
      await p.mouse.move(before.x, before.yy); await p.mouse.wheel(0, 240); await p.waitForTimeout(700);
      const after = await p.evaluate(() => { const ds = [...document.querySelectorAll('#page-folders .fd-right .cdw')], bx = ds[ds.length - 1].querySelector('.cdw-box'); return { y: document.scrollingElement.scrollTop, st: bx.scrollTop }; });
      ok(after.st > before.st && after.y === before.y, 'the wheel flips through the drawer\'s cards, and the page itself does not move', { before, after });
      await p.screenshot({ path: OUTA + '/4_drawer.png' }); }
    // 5. a paper chosen stays chosen when the folder is drawn again
    await p.evaluate(() => { document.scrollingElement.scrollTop = 0; [...document.querySelectorAll('#page-folders .fw-dividers .fw-div')][1].click(); }); await p.waitForTimeout(700);
    await p.evaluate(() => { const box = [...document.querySelectorAll('#page-folders input')].find((x) => /Add one/.test(x.placeholder || '') && x.offsetParent); box.value = 'Footnotes are saved with the main text.'; box.dispatchEvent(new Event('input', { bubbles: true }));
      const k = [...box.parentElement.querySelectorAll('button')][0] || box.nextElementSibling; k.click(); }); await p.waitForTimeout(1200);
    const kept = await p.evaluate(() => { const pg = document.getElementById('page-folders'); return { sel: [...pg.querySelectorAll('.fw-dividers .fw-div')].filter((x) => x.getAttribute('aria-selected') === 'true').map((x) => x.firstChild.textContent.trim()), tabs: pg.querySelectorAll('.fw-dividers .fw-div').length,
      shown: [...pg.querySelectorAll('.fd-right>.card')].filter((c) => c.offsetParent !== null).map((c) => (c.querySelector('h2') || {}).textContent), decided: pg.textContent.indexOf('Footnotes are saved with the main text.') >= 0 }; });
    ok(kept.decided && kept.tabs === 5 && kept.sel.join() === 'Decisions' && kept.shown.length === 1 && /^Decisions/.test(kept.shown[0]), 'a paper chosen stays chosen when Folders draws the folder again (a decision added)', kept);
    // 6. night, rest, a narrow window, errors
    await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await p.waitForTimeout(500);
    const nightDepth = await p.evaluate(() => getComputedStyle(document.querySelector('#page-folders .fw-div')).boxShadow);
    ok(nightDepth && nightDepth !== 'none' && /rgba\(0, 0, 0/.test(nightDepth), 'by night the dividers keep their depth, in the night\'s shadows', nightDepth);
    await p.screenshot({ path: OUTA + '/5_night.png' }); await p.evaluate(() => document.body.setAttribute('data-theme', 'day'));
    await p.waitForTimeout(1200);
    const still = await p.evaluate(() => new Promise((res) => { let n = 0; const mo = new MutationObserver((r) => { n += r.length; }); mo.observe(document.getElementById('page-folders'), { subtree: true, childList: true, attributes: true, characterData: true }); setTimeout(() => { mo.disconnect(); res(n); }, 3000); }));
    ok(still === 0, 'nothing on the Folders page is rewritten while it is left alone (3 seconds)', still);
    await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(1400);
    const phoneOpen = await p.evaluate(() => { const pg = document.getElementById('page-folders'); return { phone: pg.classList.contains('fd-phone'), st: IngFoldersCompact.state(), shown: [...pg.querySelectorAll('.fd-right>.card')].filter((c) => c.offsetParent !== null).length, wide: document.scrollingElement.scrollWidth > innerWidth + 1 }; });
    await p.screenshot({ path: OUTA + '/6_phone_open.png' });
    await p.evaluate(() => { state.folders.ui.open = null; IngFolders.paint(); document.scrollingElement.scrollTop = 0; }); await p.waitForTimeout(1400);
    const phoneHome = await p.evaluate(() => { const pg = document.getElementById('page-folders'), envs = [...pg.querySelectorAll('.fd-env')].filter((e) => e.offsetParent !== null), tops = envs.map((e) => Math.round(e.getBoundingClientRect().top));
      const perRow = Math.max.apply(null, [...new Set(tops)].map((t) => tops.filter((x) => x === t).length)); return { st: IngFoldersCompact.state(), perRow, wide: document.scrollingElement.scrollWidth > innerWidth + 1 }; });
    ok(phoneOpen.phone && phoneOpen.st.tabs && phoneOpen.shown === 1 && !phoneOpen.wide && phoneHome.st.home && phoneHome.perRow === 2 && !phoneHome.wide,
      'on a phone (390 pixels) a folder keeps its dividers and one paper, the envelopes stand two to a row, and nothing is wider than the screen', { phoneOpen, phoneHome });
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 500)); }
  ok(errs.length === 0, 'no page error', errs);
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
