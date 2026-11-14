// Folders, How it was built as a card drawer (Ingenium 7.08, build/modules/r258.js). Her choice on the live preview (14 November 2026):
// "I approve of your recommendations for both of the Folders previews and choose the "card drawer" preview design", and "Please make
// sure that there aren't any flat and plain surfaces on Ingenium". With an invented library (the app Quill), made by this test:
//   1. each part of an app's notes is a drawer: Start here, its parts, and each group (Versions), the name on the drawer's label with
//      its count, a silver pull, the cards standing in it in order, each showing only its top edge with the note's name and words
//   2. no flat surface: the cards, the drawer's front, its label and its pull are raised (shadows), the drawer's inside sunk
//   3. under the pointer a card rises out of the drawer and shows its first lines; pressed, it is drawn out and the note opens
//   4. the pull shuts the drawer and opens it again, the cards rising in one after another
//   5. by night the drawer keeps its depth in the night colours
//   6. at a phone's width the drawer fits with no sideways scroll; no page error
//   node rig/t_708_drawer.js <Ingenium page url (master)> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_708_drawer.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true }); const OUTA = path.resolve(OUT);
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; return !!c; };
const NOTES = {
  'Quill/00 Index.md': '# Quill\n\nThe index of the page maker and its footnotes, kept so the next build starts from here.\n',
  'Quill/Pages_history.md': '# Pages (Quill): its history\n\nThe page maker keeps the margins a reader set, and the ruler follows the paper size chosen.\n',
  'Quill/Footnotes_history.md': '# Footnotes (Quill): its history\n\nThe footnotes are saved with the main text, because the autosave lost them once.\n',
  'Quill/versions/Quill 1.2 handoff.md': '# Quill 1.2\n\nShipped with the footnotes kept.\n',
  'Quill/versions/Quill 1.10 handoff.md': '# Quill 1.10\n\nThe table writer, and a ruler that follows the paper.\n',
  'Quill/versions/Quill 1.11 handoff.md': '# Quill 1.11\n\nThe margins kept between pages.\n'
};
const ZIP = path.join(OUTA, 'invented_library.zip');
cp.execFileSync('python3', ['-I', '-c', 'import sys,json,zipfile\nnotes=json.loads(sys.stdin.read())\nz=zipfile.ZipFile(sys.argv[1],"w",zipfile.ZIP_DEFLATED)\n[z.writestr(k,v) for k,v in notes.items()]\nz.close()', ZIP], { input: JSON.stringify(NOTES) });

(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 950 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 300)));
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(400);
    await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} go('folders'); }); await p.waitForTimeout(700);
    const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => { const k = [...document.querySelectorAll('#page-folders button')].find((x) => /^Bring in (the build library|more notes)$/.test(x.textContent.trim())); k.click(); })]);
    await fc.setFiles(ZIP); await p.waitForFunction(() => window.IngBuildLib && IngBuildLib.load().then((L) => L.notes.length >= 6), null, { timeout: 20000 }).catch(() => {}); await p.waitForTimeout(800);
    await p.evaluate(() => { const f = IngFolders.folders().find((x) => x.name === 'Quill'); state.folders.ui.open = f.id; IngFolders.paint(); });
    await p.waitForFunction(() => document.querySelectorAll('#page-folders .cdw').length >= 2, null, { timeout: 20000 }).catch(() => {}); await p.waitForTimeout(1400);
    // 1. the drawers
    const dw = await p.evaluate(() => [...document.querySelectorAll('#page-folders .cdw')].map((d) => ({ label: (d.querySelector('.cdw-label b, .cdw-label .bl-sub') || {}).textContent, count: (d.querySelector('.cdw-label small') || {}).textContent, cards: [...d.querySelectorAll('.bl-card .cdw-ttl b')].map((x) => x.textContent), tops: [...d.querySelectorAll('.bl-card')].map((x) => Math.round(x.getBoundingClientRect().top)), pull: !!d.querySelector('.cdw-pull') })));
    ok(dw.length === 3 && dw[0].label === 'Start here' && /^Its parts/.test(dw[1].label) && dw[2].label === 'Versions', '1. a drawer for each part: Start here, its parts, Versions', dw.map((x) => x.label));
    ok(dw[2].count === '3 notes' && dw[2].cards.join('|') === 'Quill 1.11 handoff|Quill 1.10 handoff|Quill 1.2 handoff' && dw.every((x) => x.pull), 'the label counts its notes, the cards stand in order (the newest version first), each drawer has its pull', dw[2]);
    const steps = dw[2].tops.slice(1).map((t, i) => t - dw[2].tops[i]);
    ok(steps.length === 2 && steps.every((s) => s >= 38 && s <= 46), 'the cards stand one behind another, each showing its top edge (about 42 px apart)', steps);
    // 2. raised, never flat
    const look = await p.evaluate(() => { const d = document.querySelectorAll('#page-folders .cdw')[2]; const cs = (s) => getComputedStyle(d.querySelector(s));
      return { face: cs('.cdw-face').boxShadow, front: cs('.cdw-front').boxShadow, label: cs('.cdw-label').boxShadow, pull: cs('.cdw-pull').boxShadow, box: cs('.cdw-box').boxShadow, find: (document.querySelector('#page-folders .bl-q') ? getComputedStyle(document.querySelector('#page-folders .bl-q')).boxShadow : 'n/a') }; });
    ok(Object.values(look).every((v) => v && v !== 'none'), '2. no flat surface: the cards, the front, the label and the pull are raised, the inside of the drawer and the finder sunk', look);
    // 3. under the pointer, and pressed
    const card = p.locator('#page-folders .cdw').nth(2).locator('.bl-card').nth(1);
    const y0 = await card.evaluate((x) => x.getBoundingClientRect().top);
    await card.hover({ position: { x: 120, y: 14 } }); await p.waitForTimeout(800);
    const up = await card.evaluate((x) => ({ dy: Math.round(x.getBoundingClientRect().top), peek: getComputedStyle(x.querySelector('.cdw-peek')).opacity, text: x.querySelector('.cdw-peek').textContent }));
    ok(y0 - up.dy >= 40 && +up.peek > 0.9 && /table writer/.test(up.text), '3. under the pointer a card rises out of the drawer and shows its first lines', { rise: y0 - up.dy, peek: up.peek });
    await card.click({ position: { x: 120, y: 14 } }); await p.waitForTimeout(1200);
    const rd = await p.evaluate(() => { const h = document.querySelector('#modalBox .bl-reader h3'); return h ? h.textContent : null; });
    ok(rd === 'Quill 1.10 handoff', 'pressed, it is drawn out and the note opens', rd);
    await p.evaluate(() => { try { closeModal(); } catch (e) {} }); await p.waitForTimeout(500);
    // 4. the pull
    const pull = p.locator('#page-folders .cdw').nth(2).locator('.cdw-pull');
    const h0 = await p.evaluate(() => document.querySelectorAll('#page-folders .cdw-box')[2].getBoundingClientRect().height);
    await pull.click(); await p.waitForTimeout(1200);
    const shut = await p.evaluate(() => { const d = document.querySelectorAll('#page-folders .cdw')[2]; return { open: d.getAttribute('data-open'), h: d.querySelector('.cdw-box').getBoundingClientRect().height, exp: d.querySelector('.cdw-pull').getAttribute('aria-expanded') }; });
    ok(shut.open === '0' && shut.h < 50 && h0 > 150 && shut.exp === 'false', '4. the pull shuts the drawer', { h0, shut });
    await pull.click(); await p.waitForTimeout(1400);
    const opened = await p.evaluate(() => { const d = document.querySelectorAll('#page-folders .cdw')[2]; return { open: d.getAttribute('data-open'), h: d.querySelector('.cdw-box').getBoundingClientRect().height }; });
    ok(opened.open === '1' && opened.h > 150, 'and opens it again', opened);
    await p.screenshot({ path: path.join(OUTA, 'drawer_day.png') });
    // 5. by night
    await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(700);
    const night = await p.evaluate(() => { const d = document.querySelectorAll('#page-folders .cdw')[2]; return { face: getComputedStyle(d.querySelector('.cdw-face')).backgroundColor, front: getComputedStyle(d.querySelector('.cdw-front')).boxShadow }; });
    ok(night.face !== 'rgb(255, 253, 250)' && night.front !== 'none', '5. by night the cards take the night paper and the drawer keeps its depth', night);
    await p.screenshot({ path: path.join(OUTA, 'drawer_night.png') });
    // 6. a phone's width
    await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(900);
    const ph = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, w: innerWidth, cardW: Math.round(document.querySelector('#page-folders .bl-card').getBoundingClientRect().width) }));
    ok(ph.sw <= ph.w + 1 && ph.cardW > 200, '6. at a phone\'s width the drawer fits, with no sideways scroll', ph);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 600)); }
  ok(errs.length === 0, 'no page error', errs.slice(0, 4));
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
