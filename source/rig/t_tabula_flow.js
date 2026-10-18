// R128: Tabula's paragraphs run on across pages, and a note does not lay out the whole thesis again (apps/tabula_flow_patch.py,
// by Inkwell 7.45's GAP1 and CITE1). The thesis of t_tabula_big.js is made in each page (R127 and R128, side by side).
// Checked: no line stands across a page break; at least two lines at each foot and two over; the thesis takes fewer pages
// than with R127; the pages laid out by need are the pages a full layout makes after typing, a new footnote, a removed one
// and a new paragraph; a footnote is laid out from its paragraph, far faster than R127's full layout; line numbers and
// columns keep the old way.
//   node t_tabula_flow.js <url of the R128 Tabula page> <url of the R127 Tabula page> <outdir>
const pw = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const URL_ = process.argv[2], URL127 = process.argv[3], OUT = process.argv[4]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
const THESIS = (WORDS) => {
  const V = ('archive evidence argument reading attention literacy method interpretation history society practice theory source context institution culture change pattern account analysis claim question measure study school learning memory language narrative tradition critique concept structure agency power knowledge author reader text period figure model case data result effect relation sample design scale form value meaning order time place').split(' ');
  let seed = 7; const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  let w = 0, nid = 0, html = '', notes = '<div class="h">Notes</div>';
  const para = () => { let s = ''; const n = 120 + Math.floor(rnd() * 60); for (let i = 0; i < n; i++) { let t = V[Math.floor(rnd() * V.length)]; if (i === 0) t = t[0].toUpperCase() + t.slice(1); s += (i ? ' ' : '') + t; w++;
      if (w % 330 === 0) { nid++; s += '<sup class="fn-ref" data-note="foot" data-nid="fn' + nid + '">' + nid + '</sup>'; notes += '<div class="fn" data-nid="fn' + nid + '"><sup>' + nid + '</sup> Smith, <i>Archives of Empire</i> (Oxford: Clarendon, 2001), ' + (nid + 10) + '.</div>'; } }
    return '<p>' + s + '.</p>'; };
  for (let c = 1; w < WORDS; c++) { html += '<h1>Chapter ' + c + '</h1>'; for (let sct = 1; sct <= 8 && w < WORDS; sct++) { html += '<h2>Section ' + c + '.' + sct + '</h2>'; for (let k = 0; k < 7 && w < WORDS; k++) html += para(); } }
  const ed = document.getElementById('editor'), fb = document.getElementById('footnotes');
  ed.innerHTML = html; fb.innerHTML = notes; fb.style.display = 'block';
  try { window.__cdAfterImport && window.__cdAfterImport(); } catch (e) {}
  return { words: w, notes: nid };
};

const settle = async (p) => { await p.waitForTimeout(700); await p.waitForFunction(() => !window.__tabLayoutBusy, null, { timeout: 60000 }); await p.waitForTimeout(250); return p.evaluate(() => ({ ms: window.__tabLayoutMs, touched: window.__tabLayoutTouched })); };
const pages = (p) => p.evaluate(() => parseInt((document.getElementById('wcPages').textContent.match(/of (\d+)/) || [])[1], 10));
/* every page break: no line box of the text stands between a page's foot and the next page's first line */
const straddle = (p) => p.evaluate(() => {
  const ed = document.getElementById('editor'), er = ed.getBoundingClientRect(), k = ed.offsetHeight ? er.height / ed.offsetHeight : 1;
  const seps = [...document.querySelectorAll('#pageguides .pg-sep')].map(e => parseFloat(e.style.top) - ed.offsetTop);
  const rs = []; const tw = document.createTreeWalker(ed, NodeFilter.SHOW_TEXT); let tn; while ((tn = tw.nextNode())) { if (!/\S/.test(tn.nodeValue)) continue; const rg = document.createRange(); rg.selectNodeContents(tn); for (const r of rg.getClientRects()) if (r.height >= 8 && r.width > 1) rs.push([(r.top - er.top) / k, (r.bottom - er.top) / k]); }
  let bad = 0, ex = null; for (const s of seps) { const lo = s - 50 + 2, hi = s + 50 + 54 - 2; for (const r of rs) { if (r[1] > lo && r[0] < hi) { bad++; if (!ex) ex = [s, r]; } } }
  return { seps: seps.length, rects: rs.length, bad, ex };
});
const snap = (p) => p.evaluate(() => ({ seps: [...document.querySelectorAll('#pageguides .pg-sep')].map(e => e.style.top).join(','), push: [...document.getElementById('editor').children].map(b => (b.style.marginTop || '') + '/' + (b.style.getPropertyValue('--pg-shape') || '')).join('|'), pages: document.getElementById('wcPages').textContent }));
const same = async (p, what) => { const a = await snap(p); await p.evaluate(() => { window.__tabDirty = 'all'; window.cdLayoutNow(); }); const b2 = await snap(p);
  /* the same to a twentieth of a pixel: a style value may differ by one layout unit (1/64 px), which moves nothing */
  const nums = (x) => (x.match(/-?\d+(\.\d+)?/g) || []).map(Number); const near = (x, y) => { const u = nums(x), v = nums(y); return u.length === v.length && u.every((q, i) => Math.abs(q - v[i]) < 0.05); };
  const A = a.push.split('|'), B = b2.push.split('|'); const diff = A.findIndex((x, i) => !near(x, B[i]));
  a.push = diff < 0 ? b2.push : a.push;
  ok(a.seps === b2.seps && a.push === b2.push && a.pages === b2.pages, 'after ' + what + ', the pages laid out by need are the pages a full layout makes', a.pages + ' / ' + b2.pages + (a.seps === b2.seps ? '' : ' (page breaks differ)') + (diff < 0 ? '' : ' (cuts differ at block ' + diff + ': ' + A[diff] + ' vs ' + B[diff] + ')')); };
const caret = (p, frac, off) => p.evaluate(([frac, off]) => { const ed = document.getElementById('editor'); const ps = ed.querySelectorAll('p'); const mid = ps[Math.floor(ps.length * frac)]; const rg = document.createRange(); rg.setStart(mid.firstChild, off); rg.collapse(true); const s = getSelection(); s.removeAllRanges(); s.addRange(rg); ed.focus(); }, [frac, off]);
async function noteTime(p) {
  /* timed inside the page, from the press to the last page laid out (the footnote's text is given at once, with no dialog) */
  await caret(p, 0.08, 20);
  return p.evaluate(() => new Promise(res => { window.prompt = () => 'Smith, Archives of Empire (Oxford: Clarendon, 2001), 12.';
    const t0 = performance.now(); document.getElementById('insFoot').click();
    (function w() { if (window.__tabLayoutBusy) { setTimeout(w, 5); return; } res({ wall: Math.round(performance.now() - t0), ms: window.__tabLayoutMs, touched: window.__tabLayoutTouched, notes: document.querySelectorAll('#editor sup.fn-ref').length }); })(); })); }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  const open = async (u) => { const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message.slice(0, 200))); await p.goto(u); await p.waitForTimeout(2500); return p; };
  const old = await open(URL127); await old.evaluate(THESIS, 100000); await settle(old);
  const oldPages = await pages(old), oldStr = await straddle(old);
  const oldNote = await noteTime(old);
  await old.close();
  const p = await open(URL_);
  ok(await p.evaluate(() => [...document.querySelectorAll('style')].some(s => /R128-TABULA-FLOW/.test(s.textContent))), 'the flow patch is in Tabula');
  const made = await p.evaluate(THESIS, 100000); await settle(p);
  ok(made.words >= 100000 && made.notes >= 300, 'the same thesis of 100,000 words with 300 footnotes', JSON.stringify(made));
  const st = await p.evaluate(() => ({ cuts: document.querySelectorAll('#editor > [data-pgcut]').length, pushes: document.querySelectorAll('#editor > [data-pgpush]').length, n: document.getElementById('editor').children.length }));
  const newPages = await pages(p);
  ok(st.cuts > 100 && st.pushes < st.cuts, 'paragraphs run on at the page foot instead of moving whole', JSON.stringify(st));
  ok(newPages < oldPages, 'the thesis takes fewer pages: no blank gap at the foot of a page', 'R128 ' + newPages + ' pages, R127 ' + oldPages);
  const s1 = await straddle(p);
  ok(s1.bad === 0 && s1.seps === newPages - 1, 'no line of text stands across a page break', JSON.stringify(s1) + ' (R127: ' + JSON.stringify(oldStr) + ')');
  // two lines at each foot and two over
  const wo = await p.evaluate(() => { const ed = document.getElementById('editor'); let bad = 0, n = 0; for (const c of ed.querySelectorAll(':scope > [data-pgcut]')) { const rg = document.createRange(); rg.selectNodeContents(c); const rs = [...rg.getClientRects()].filter(r => r.height >= 8).sort((a, b) => a.top - b.top); const tops = []; rs.forEach(r => { if (!tops.length || r.top > tops[tops.length - 1] + 8) tops.push(r.top); }); const gaps = []; for (let i = 1; i < tops.length; i++) if (tops[i] - tops[i - 1] > 60) gaps.push(i); n++; const first = gaps[0], last = gaps[gaps.length - 1]; if (first < 2 || tops.length - last < 2) bad++; } return { n, bad }; });
  ok(wo.n > 0 && wo.bad === 0, 'at least two lines stay at each foot and two go over', JSON.stringify(wo));
  await p.screenshot({ path: OUT + '/flow-page-break.png', clip: { x: 300, y: 0, width: 840, height: 900 } }).catch(() => {});
  await same(p, 'opening the thesis');
  await caret(p, 0.5, 5); await p.keyboard.type(' the reader returns to the archive and finds the same page again in a later hand '.repeat(5)); await settle(p); await same(p, 'typing five long sentences');
  ok((await straddle(p)).bad === 0, 'after typing, still no line across a page break');
  // CITE1: a footnote placed early in the thesis (every later figure moves)
  const nt = await noteTime(p); await settle(p);
  ok(nt.notes === made.notes + 1 && nt.touched < st.n / 2, 'a new footnote is laid out from its paragraph, not the whole thesis', JSON.stringify(nt) + ' of ' + st.n + ' blocks');
  ok(nt.wall < Math.max(250, oldNote.wall / 2), 'placing a footnote is at least twice as fast as with R127', 'R128 ' + JSON.stringify(nt) + ' / R127 ' + JSON.stringify(oldNote));
  await same(p, 'a new footnote');
  const firstNum = await p.evaluate(() => { const r = [...document.querySelectorAll('#editor sup.fn-ref')]; return r.slice(0, 3).map(x => x.textContent).join(',') + '…' + r[r.length - 1].textContent; });
  ok(/^1,2,3…\d+$/.test(firstNum) && firstNum.endsWith('…' + (made.notes + 1)), 'every note is numbered in order after it', firstNum);
  // a note removed by the keyboard
  await p.evaluate(() => { const sups = document.querySelectorAll('#editor sup.fn-ref'); const sp = sups[Math.floor(sups.length * 0.2)]; const rg = document.createRange(); rg.selectNode(sp); const s = getSelection(); s.removeAllRanges(); s.addRange(rg); document.getElementById('editor').focus(); });
  await p.keyboard.press('Backspace'); await settle(p); await same(p, 'a removed footnote');
  const after = await p.evaluate(() => ({ refs: document.querySelectorAll('#editor sup.fn-ref').length, box: document.querySelectorAll('#footnotes .fn[data-nid]').length }));
  ok(after.refs === made.notes && after.box === made.notes, 'the removed note leaves the Notes too', JSON.stringify(after));
  await caret(p, 0.66, 30); await p.keyboard.press('Enter'); await settle(p); await same(p, 'a split paragraph');
  // line numbers and columns keep the old way
  await p.evaluate(() => { const c = document.getElementById('lineNumChk'); c.checked = true; c.dispatchEvent(new Event('change')); window.__tabDirty = 'all'; window.cdLayoutNow(); });
  const ln = await p.evaluate(() => document.querySelectorAll('#editor > [data-pgcut]').length);
  await p.evaluate(() => { const c = document.getElementById('lineNumChk'); c.checked = false; c.dispatchEvent(new Event('change')); window.__tabDirty = 'all'; window.cdLayoutNow(); });
  const ln2 = await p.evaluate(() => document.querySelectorAll('#editor > [data-pgcut]').length);
  ok(ln === 0 && ln2 > 100, 'with line numbers on, paragraphs move whole as before; off again, they run on', JSON.stringify({ ln, ln2 }));
  // the document keeps no trace of the bands once it is saved and opened again
  const clean = await p.evaluate(() => { const h = document.getElementById('editor').innerHTML; const tmp = document.createElement('div'); tmp.innerHTML = h; const ed = document.getElementById('editor'); ed.innerHTML = h; window.__tabDirty = 'all'; window.cdLayoutNow(); return { reopenedCuts: ed.querySelectorAll(':scope > [data-pgcut]').length, words: document.getElementById('wcWords').textContent }; });
  await settle(p); ok(clean.reopenedCuts > 100 && (await straddle(p)).bad === 0, 'a document opened again is laid out afresh, with no stale band', JSON.stringify(clean));
  ok(errs.length === 0, 'no page errors', JSON.stringify(errs.slice(0, 4)));
  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL crashed: ' + e.message); process.exit(1); });
