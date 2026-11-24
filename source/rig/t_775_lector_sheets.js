// Ingenium 7.75 (24 November 2026): Lector's document on Tabula's weighted sheets, real pages with a gap between them, by day and by
// night; Ingenium's plum by night, or a cool slate; the saving bar folds away (modules/r108.js).
// Her words: "I want the documents area to have Tabula's 3D paper UI design ... I want to see the proper pages and separation like in
// Tabula"; "There appears to still be a dark band that connects the pages together ... give me true 3D pages on both Day and Night
// mode"; "I choose Ingenium's plum look as the approved look for Night mode but I want Tabula's original colour for Night added as a
// second option"; "The dark grey sheet sheets need to be darker and a cooler shade"; "Please remove the frame".
//   node rig/t_775_lector_sheets.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
// a dossier long enough for several pages, with long paragraphs that a page must split
const PARA = n => 'Paragraph ' + n + ' of the test. ' + Array.from({ length: 36 }, (_, i) => 'Sentence ' + (i + 1) + ' of paragraph ' + n + ' tells what the app does, plainly and in full.').join(' ');
const DOC = '# Project dossier\n\n' + Array.from({ length: 6 }, (_, s) => '## Section ' + (s + 1) + '\n\n' + [1, 2, 3].map(k => PARA((s + 1) * 10 + k)).join('\n\n')).join('\n\n') + '\n';
async function open(b, theme, np, app) {
  const ctx = await b.newContext({ viewport: { width: 1600, height: 1000 } });
  await ctx.addInitScript(np => { try { if (np) localStorage.setItem('ing.lx.nightPaper', np); else localStorage.removeItem('ing.lx.nightPaper'); localStorage.removeItem('ing.lx.footFold'); } catch (e) {} }, np);
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.evaluate(async ([DOC, THEME, APP]) => { state.models = (state.models || []).concat([{ id: 'm-test', name: 'Test model', fileState: 'ready', size: 2e9, sizeBytes: 2e9, ctx: 16384 }]);
    const L = lxState(); L.brief = { apps: [APP], purpose: 'portfolio', docs: { dossier: true }, depth: 'overview', fmt: 'pdf', modelId: 'm-test' };
    L.job = null; const ref = IngBig.newId(); await IngBig.put(ref, DOC);
    L.sets = L.sets || {}; L.sets[APP + '|portfolio'] = { apps: [APP], purpose: 'portfolio', docs: { dossier: { ref, made: Date.now(), model: 'Test model', title: 'Project dossier', chk: { figures: 0, unmatched: [] } } }, older: {} };
    saveState(); if (THEME === 'night') { try { setTheme('night'); } catch (e) { document.body.setAttribute('data-theme', 'night'); } } go('lector'); }, [DOC, theme, app || 'ingenium']);
  await p.waitForFunction(() => { const pp = document.querySelector('#l7Desk .l-paper'); return pp && pp.querySelectorAll('.l-sheet').length > 1; }, null, { timeout: 20000 }).catch(() => {});
  await sleep(1200); await p.evaluate(() => document.getElementById('l7Doc').scrollIntoView({ block: 'start' })); await settle(p);
  return { ctx, p, errs };
}
// the paper settled: its pages measured at its present height (a picture that loads late grows the paper, and Lector measures again
// a tenth of a second later), the same for a second and a half
async function settle(p) { let same = 0, last = -1;
  for (let i = 0; i < 60 && same < 5; i++) { await sleep(300); const h = await p.evaluate(() => { const pp = document.querySelector('#l7Desk .l-paper'); return pp && pp.__h === pp.offsetHeight ? pp.offsetHeight : -2; });
    same = h > 0 && h === last ? same + 1 : 0; last = h; } }
// the paper's state: sheets, gaps, and whether any line of text stands outside its sheet's written area
const SHAPE = () => { const pp = document.querySelector('#l7Desk .l-paper'), r = pp.getBoundingClientRect(), k = r.width / 640;
  const sheets = [...pp.querySelectorAll('.l-sheet')].map(s => { const q = s.getBoundingClientRect(); return { top: q.top, bottom: q.bottom }; });
  const tw = document.createTreeWalker(pp, 4), rg = document.createRange(); let n, out = [], lines = 0;
  while ((n = tw.nextNode())) { if (!/\S/.test(n.nodeValue) || !n.parentElement || n.parentElement.closest('.l-sheets')) continue; rg.selectNodeContents(n);
    for (const q of rg.getClientRects()) { if (q.height < 2) continue; lines++; const s = sheets.find(s => q.top >= s.top - 1 && q.bottom <= s.bottom + 1); if (!s) out.push(Math.round((q.top - r.top) / k)); } }
  const cs = getComputedStyle(pp), bf = getComputedStyle(pp, '::before'), sh = pp.querySelector('.l-sheet'), shs = sh && getComputedStyle(sh);
  return { sheets: sheets.length, gaps: pp.querySelectorAll('.l-gap').length, lines, outside: out.slice(0, 8), nOut: out.length, paged: pp.classList.contains('l-paged'),
    paperShadow: cs.boxShadow, frameOnPaper: bf.display, sheetBg: shs && shs.backgroundImage.slice(0, 120), sheetShadow: shs && shs.boxShadow,
    desk: getComputedStyle(document.getElementById('l7Desk')).backgroundColor, text: pp.innerText.replace(/\s+/g, ' ') }; };
// no shadow of a sheet goes upwards or spreads out: a dark band in the gap came from those (each part: offset-x offset-y blur spread)
const noBand = sh => !(sh || '').split(/,(?![^(]*\))/).some(part => { if (/inset/.test(part)) return false; const nums = (part.replace(/rgba?\([^)]*\)/, '').match(/-?\d+(\.\d+)?px/g) || []).map(parseFloat);
  const [x, y, blur = 0, spread = 0] = nums; return y < 0 || blur + spread > Math.max(0, y) * 2 + 16 || (x === 0 && y === 0 && blur > 8); });
// an outline round the sheet: a shadow with no offset and no blur, only a spread (her words: "Please remove the frame")
const ring = sh => (sh || '').split(/,(?![^(]*\))/).some(part => { if (/inset/.test(part)) return false; const n = (part.replace(/rgba?\([^)]*\)/, '').match(/-?\d+(\.\d+)?px/g) || []).map(parseFloat); return n[0] === 0 && n[1] === 0 && !(n[2] > 0) && n[3] > 0; });
(async () => {
  const b = await pw.chromium.launch();
  // 1. by day: real pages, every line on a sheet, the paper's own frame and shadow off, no band
  { const { ctx, p, errs } = await open(b, 'day', null);
    const s = await p.evaluate(SHAPE);
    ok(s.paged && s.sheets >= 3 && s.gaps === s.sheets - 1, 'by day the document stands on separate sheets, a gap between each', { sheets: s.sheets, gaps: s.gaps });
    ok(s.lines > 50 && s.nOut === 0, 'every line of text stands on a sheet, none in a gap (paragraphs are split at the exact line)', { lines: s.lines, outside: s.outside });
    ok(s.paperShadow === 'none' && s.frameOnPaper === 'none', 'the paper itself draws no shadow and no frame down the whole document (they made the band)', { paperShadow: s.paperShadow, frame: s.frameOnPaper });
    ok(noBand(s.sheetShadow), 'each sheet casts its shadow downwards only, so nothing joins the pages', s.sheetShadow);
    ok(!ring(s.sheetShadow), 'by day no outline runs round a sheet', s.sheetShadow);
    const np = await p.evaluate(() => { const x = document.getElementById('l7NPaper'); return x ? !!x.offsetParent : null; });
    ok(np === false, 'by day the night paper keys are not shown', np);
    // the text reads as written: each paragraph once, whole
    const once = ['Paragraph 11 of the test.', 'Sentence 36 of paragraph 63'].every(t => s.text.split(t).length === 2);
    ok(once, 'each paragraph appears once, whole, across its pages');
    await p.screenshot({ path: OUT + '/1_day.png' });
    // 2. the saving bar folds away and comes back, and stays folded on this device
    const f = await p.evaluate(async () => { const k = document.querySelector('#lx7 .l-hidebar'), t = document.querySelector('#lx7 .l-showbar'), foot = document.getElementById('l7Fmt').closest('.l-pn-f');
      if (!k || !t) return { k: !!k, t: !!t }; k.click(); await new Promise(r => setTimeout(r, 200)); const a = { folded: foot.classList.contains('l-folded'), hidden: getComputedStyle(foot).display === 'none', show: !t.hidden && !!t.offsetParent, kept: localStorage.getItem('ing.lx.footFold') };
      t.click(); await new Promise(r => setTimeout(r, 200)); return { a, back: !foot.classList.contains('l-folded') && getComputedStyle(foot).display !== 'none', showGone: t.hidden, kept: localStorage.getItem('ing.lx.footFold') }; });
    ok(f.a && f.a.folded && f.a.hidden && f.a.show && f.a.kept === '1' && f.back && f.showGone && f.kept === '0', '"Hide bar" folds the saving bar away, "Show bar" brings it back, and the choice is kept', f);
    ok(errs.length === 0, 'no page errors (day)', errs); await ctx.close(); }
  // 3. by night: Ingenium's plum, the keys shown, no band
  { const { ctx, p, errs } = await open(b, 'night', null);
    const s = await p.evaluate(SHAPE);
    ok(/rgb\(46, 37, 67\)/.test(s.sheetBg || '') && s.desk === 'rgb(23, 17, 31)', 'by night the sheets are in Ingenium\'s plum on a plum desk (her choice)', { bg: s.sheetBg, desk: s.desk });
    ok(noBand(s.sheetShadow) && s.paperShadow === 'none' && s.nOut === 0, 'by night too each sheet stands alone, every line on a sheet', { sh: s.sheetShadow, out: s.outside });
    ok(!ring(s.sheetShadow), 'by night no outline runs round a sheet', s.sheetShadow);
    const k = await p.evaluate(() => { const x = document.getElementById('l7NPaper'); return x && { shown: !!x.offsetParent, keys: [...x.querySelectorAll('button')].map(b => b.textContent + ':' + b.getAttribute('aria-pressed')) }; });
    ok(k && k.shown && k.keys.join() === 'Plum:true,Slate:false', 'by night the keys Plum and Slate are shown beside the size, Plum chosen', k);
    await p.screenshot({ path: OUT + '/3_night_plum.png' });
    // 4. the second option: the cool slate, chosen with its key and kept
    await p.evaluate(() => document.querySelector('#l7NPaper [data-np="slate"]').click()); await sleep(300);
    const t = await p.evaluate(() => { const sh = document.querySelector('#l7Desk .l-sheet'); return { attr: document.documentElement.getAttribute('data-lx-npaper'), bg: getComputedStyle(sh).backgroundImage.slice(0, 80), desk: getComputedStyle(document.getElementById('l7Desk')).backgroundColor, kept: localStorage.getItem('ing.lx.nightPaper'), pressed: document.querySelector('#l7NPaper [data-np="slate"]').getAttribute('aria-pressed') }; });
    ok(t.attr === 'slate' && /rgb\(38, 44, 57\)/.test(t.bg) && t.desk === 'rgb(17, 20, 27)' && t.kept === 'slate' && t.pressed === 'true', 'Slate gives the darker, cooler slate sheets on a slate desk, and is kept on this device', t);
    await p.screenshot({ path: OUT + '/4_night_slate.png' });
    ok(errs.length === 0, 'no page errors (night)', errs); await ctx.close(); }
  // 5. the slate kept from before is used when Lector opens again; Carpe Diem's paper keeps its frame on each sheet only
  { const { ctx, p, errs } = await open(b, 'night', 'slate', 'cd');
    const s = await p.evaluate(() => { const sh = document.querySelector('#l7Desk .l-sheet'), bf = getComputedStyle(sh, '::before');
      return { attr: document.documentElement.getAttribute('data-lx-npaper'), sheetFrame: bf.content === 'none' || bf.content === 'normal' ? 'none' : bf.borderTopWidth, onPaper: getComputedStyle(document.querySelector('#l7Desk .l-paper'), '::before').display, shadow: getComputedStyle(sh).boxShadow }; });
    ok(s.attr === 'slate', 'the slate kept from before is used when Lector opens again', s.attr);
    ok(s.onPaper === 'none' && s.sheetFrame === 'none' && !ring(s.shadow), 'no frame on the pages: no inset frame (Carpe Diem\'s paper here) and no outline round a sheet', s);
    ok(errs.length === 0, 'no page errors (Carpe Diem)', errs); await ctx.close(); }
  // 6. a paragraph being written live, split across two pages, then written further: its text is never doubled
  { const { ctx, p, errs } = await open(b, 'day', null);
    const r = await p.evaluate(() => { const pp = document.querySelector('#l7Desk .l-paper'), c = pp.querySelector('p.l-cont'); if (!c || !c.__head) return { split: false };
      const head = c.__head, whole = head.textContent + c.textContent; head.setAttribute('data-live', '1');
      head.textContent = whole + ' The newest words.'; IngLectorPaper.marks();   /* as the writer does: the head rewritten whole, then the pages measured */
      const txt = pp.innerText.replace(/\s+/g, ' '), probe = whole.match(/Sentence \d+ of paragraph \d+/g).pop();
      return { split: true, probeCount: txt.split(probe).length - 1, newest: txt.split('The newest words.').length - 1, live: pp.querySelectorAll('[data-live]').length }; });
    ok(r.split && r.probeCount === 1 && r.newest === 1 && r.live === 1, 'a split paragraph rewritten as it is written live is never doubled across its pages', r);
    ok(errs.length === 0, 'no page errors (live)', errs); await ctx.close(); }
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
