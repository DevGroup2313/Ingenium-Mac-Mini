// R130: Tabula's footnotes as Word sets them (apps/tabula_notes_patch.py, by Inkwell 7.48): each page's notes at its foot,
// a note written where it stands, the numbers set as Word sets them, real footnotes in both Word writers, notes through
// copy and paste. The owner's words: "apply the new footnotes addition to all of the other Tabula to keep full parity
// across Tabula."
// Checked: every note stands at the foot of the page that cites it, its page's text stops above it, and no line crosses
// a page break; #footnotes keeps the notes (hidden on the screen, shown in print); the layout by need makes a full
// layout's pages and notes after typing, a new note, a longer note and a removed one; Insert footnote takes the pen to
// the foot, a note is written there, Enter goes back to the text, a note's number goes back to its place; copy writes
// Word's footnote HTML, a paste of it makes notes; Save as .docx and the ribbon's .docx carry real footnotes; night; the
// thesis (300 notes) is laid out and a note placed in it quickly.
//   node t_tabula_notes.js <R130 Tabula page> <outdir> [<Carpe Diem page carrying R130>]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT, HOST] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 320) : '')); c ? pass++ : fail++; };
const DOC = (WORDS) => {
  const V = 'archive evidence argument reading attention literacy method interpretation history society practice theory source context institution culture change pattern account analysis claim question measure study school learning memory language narrative tradition critique concept structure agency power knowledge author reader text period figure model case data result effect relation sample design order form time place value'.split(' ');
  let seed = 11; const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  let w = 0, nid = 0, html = '', notes = '<div class="h">Notes</div>';
  const para = () => { let s = ''; const n = 110 + Math.floor(rnd() * 70); for (let i = 0; i < n; i++) { let t = V[Math.floor(rnd() * V.length)]; if (i === 0) t = t[0].toUpperCase() + t.slice(1); s += (i ? ' ' : '') + t; w++;
      if (w % 330 === 0) { nid++; s += '<sup class="fn-ref" data-note="foot" data-nid="fn' + nid + '">' + nid + '</sup>'; notes += '<div class="fn" data-nid="fn' + nid + '"><sup>' + nid + '</sup> Smith, <i>Archives of Empire</i> (Oxford: Clarendon, 2001), ' + (nid + 10) + (nid % 4 === 0 ? '; see also Jones, <i>Readers and Their Books</i> (Cambridge: Cambridge University Press, 1998), 41–63, and the discussion in chapter two.' : '.') + '</div>'; } }
    return '<p>' + s + '.</p>'; };
  for (let c = 1; w < WORDS; c++) { html += '<h1>Chapter ' + c + '</h1>'; for (let sct = 1; sct <= 8 && w < WORDS; sct++) { html += '<h2>Section ' + c + '.' + sct + '</h2>'; for (let k = 0; k < 7 && w < WORDS; k++) html += para(); } }
  const ed = document.getElementById('editor'), fb = document.getElementById('footnotes');
  ed.innerHTML = html; fb.innerHTML = notes; fb.style.display = 'block';
  try { window.__cdAfterImport && window.__cdAfterImport(); } catch (e) {}
  return { words: w, notes: nid };
};
const settle = async (p) => { await p.waitForTimeout(700); await p.waitForFunction(() => !window.__tabLayoutBusy, null, { timeout: 90000 }); await p.waitForTimeout(300); return p.evaluate(() => ({ ms: window.__tabLayoutMs, touched: window.__tabLayoutTouched })); };
/* the pages and their feet, in the editor's own units */
const FEET = () => {
  const ed = document.getElementById('editor'), er = ed.getBoundingClientRect(), k = ed.offsetHeight ? er.height / ed.offsetHeight : 1, top = ed.offsetTop;
  const seps = [...document.querySelectorAll('#pageguides .pg-sep')].map(e => parseFloat(e.style.top) - top);
  const INNER = seps.length ? seps[0] - 50 : null, starts = [0].concat(seps.map(s => s + 104));
  const pageOf = (y) => { let i = 0; while (i + 1 < starts.length && y >= starts[i + 1] - 0.5) i++; return i; };
  const rects = []; const tw = document.createTreeWalker(ed, NodeFilter.SHOW_TEXT); let tn;
  while ((tn = tw.nextNode())) { if (!/\S/.test(tn.nodeValue)) continue; if (tn.parentNode.closest && tn.parentNode.closest('sup.fn-ref')) continue; const rg = document.createRange(); rg.selectNodeContents(tn); for (const r of rg.getClientRects()) if (r.height >= 8 && r.width > 1) rects.push([(r.top - er.top) / k, (r.bottom - er.top) / k]); }
  const refs = {}; ed.querySelectorAll('sup.fn-ref[data-note="foot"]').forEach(r => { const rc = r.getBoundingClientRect(); refs[r.getAttribute('data-nid')] = { y: ((rc.top + rc.bottom) / 2 - er.top) / k, n: r.textContent }; });
  const feet = [...document.querySelectorAll('#cd-fnpages .cd-fnpage')].map(f => { const t = parseFloat(f.style.top) - top, b = t + f.getBoundingClientRect().height / k; return { t, b, ids: [...f.querySelectorAll('.cd-fnp')].map(x => x.getAttribute('data-nid')), nums: [...f.querySelectorAll('.cd-fnpn')].map(x => x.textContent) }; });
  let wrongPage = 0, offFoot = 0, overlap = 0, seen = {}, wrongNum = 0, ex = null;
  feet.forEach(f => { const pg = pageOf(f.t); if (INNER != null && Math.abs(f.b - (starts[pg] + INNER)) > 1.5) { offFoot++; ex = ex || ['foot', pg, f.b, starts[pg] + INNER]; }
    f.ids.forEach((id, i) => { seen[id] = (seen[id] || 0) + 1; const r = refs[id]; if (!r || pageOf(r.y) !== pg) { wrongPage++; ex = ex || ['page', id, r && pageOf(r.y), pg]; } if (r && f.nums[i] !== r.n) wrongNum++; });
    rects.forEach(r => { if (pageOf(r[0]) === pg && r[1] > f.t + 0.5) { overlap++; ex = ex || ['overlap', pg, r, f.t]; } }); });
  let straddle = 0; seps.forEach(s => { const lo = s - 50 + 2, hi = s + 104 - 2; rects.forEach(r => { if (r[1] > lo && r[0] < hi) straddle++; }); });
  const ids = Object.keys(refs), missing = ids.filter(id => seen[id] !== 1).length;
  return { pages: starts.length, feet: feet.length, refs: ids.length, missing, wrongPage, offFoot, overlap, straddle, wrongNum, ex, tops: feet.map(f => f.t.toFixed(2) + ':' + f.ids.join('+')).join('|') };
};
const snap = (p) => p.evaluate(() => ({ seps: [...document.querySelectorAll('#pageguides .pg-sep')].map(e => e.style.top).join(','), push: [...document.getElementById('editor').children].map(b => (b.style.marginTop || '') + '/' + (b.style.getPropertyValue('--pg-shape') || '')).join('|'), feet: [...document.querySelectorAll('#cd-fnpages .cd-fnpage')].map(f => f.style.top + ':' + [...f.querySelectorAll('.cd-fnp')].map(x => x.getAttribute('data-nid')).join('+')).join('|') }));
const nums = (x) => (x.match(/-?\d+(\.\d+)?/g) || []).map(Number); const near = (x, y) => { const u = nums(x), v = nums(y); return u.length === v.length && u.every((q, i) => Math.abs(q - v[i]) < 0.05); };
const same = async (p, what) => { const a = await snap(p); await p.evaluate(() => { window.__tabDirty = 'all'; window.cdLayoutNow(); }); await settle(p); const b2 = await snap(p); const f = await p.evaluate(FEET);
  const A = a.push.split('|'), B = b2.push.split('|'), diff = A.findIndex((x, i) => !near(x, B[i]));
  ok(a.seps === b2.seps && diff < 0 && near(a.feet, b2.feet) && a.feet.replace(/[\d.]+px/g, '') === b2.feet.replace(/[\d.]+px/g, ''), 'after ' + what + ', the pages and notes laid out by need are a full layout\'s', (a.seps === b2.seps ? '' : 'breaks differ; ') + (diff < 0 ? '' : 'block ' + diff + ' differs; ') + (near(a.feet, b2.feet) ? '' : 'feet differ: ' + a.feet.slice(0, 120) + ' / ' + b2.feet.slice(0, 120)));
  ok(!f.missing && !f.wrongPage && !f.offFoot && !f.overlap && !f.straddle && !f.wrongNum, 'and every note stands at the foot of its page, under its page\'s text', JSON.stringify(f).slice(0, 300)); };
const caretIn = (p, sel, off) => p.evaluate(([sel, off]) => { const ed = document.getElementById('editor'); const el = typeof sel === 'number' ? ed.querySelectorAll('p')[sel] : ed.querySelector(sel); let n = el.firstChild; while (n && n.nodeType !== 3) n = n.nextSibling; const rg = document.createRange(); rg.setStart(n, off); rg.collapse(true); const s = getSelection(); s.removeAllRanges(); s.addRange(rg); ed.focus(); }, [sel, off]);
/* the entries of a Word file: stored or deflated */
const UNZIP = async (b64) => { const bin = atob(b64), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  const dv = new DataView(u.buffer), out = {}; let i = 0;
  while (i + 30 < u.length && dv.getUint32(i, true) === 0x04034b50) { const m = dv.getUint16(i + 8, true), cs = dv.getUint32(i + 18, true), nl = dv.getUint16(i + 26, true), xl = dv.getUint16(i + 28, true);
    const name = new TextDecoder().decode(u.subarray(i + 30, i + 30 + nl)), at = i + 30 + nl + xl, data = u.subarray(at, at + cs);
    if (m === 0) out[name] = new TextDecoder().decode(data); else { const ds = new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))); out[name] = await ds.text(); }
    i = at + cs; }
  return out; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForTimeout(2500);
  ok(await p.evaluate(() => /R130-TABULA-FOOTNOTES/.test(document.documentElement.innerHTML) && typeof window.INKFNCLIP === 'object' && typeof window.cdInsertFootnote === 'function'), 'the footnotes patch is in Tabula, with Inkwell\'s clipboard');
  const made = await p.evaluate(DOC, 9000); await settle(p);
  const f0 = await p.evaluate(FEET);
  ok(f0.refs === made.notes && f0.feet >= 5 && !f0.missing && !f0.wrongPage && !f0.wrongNum, 'each note stands once at the foot of the page that cites it, with its number', JSON.stringify(f0).slice(0, 300));
  ok(!f0.offFoot && !f0.overlap && !f0.straddle, 'each page\'s notes end at its foot, its text stops above them, and no line crosses a page break', JSON.stringify({ off: f0.offFoot, overlap: f0.overlap, straddle: f0.straddle, ex: f0.ex }));
  const look = await p.evaluate(() => { const r = document.querySelector('#editor sup.fn-ref'), para = r.closest('p'), cr = getComputedStyle(r), cp = getComputedStyle(para), fb = document.getElementById('footnotes'), cf = getComputedStyle(fb);
    return { color: cr.color === cp.color, size: parseFloat(cr.fontSize) / parseFloat(cp.fontSize), top: cr.top, hidden: fb.classList.contains('cd-fn-atfoot') && cf.visibility === 'hidden', kept: fb.querySelectorAll('.fn[data-nid]').length, italics: !!document.querySelector('#cd-fnpages .cd-fnpt i') }; });
  ok(look.color && look.size < 0.75 && parseFloat(look.top) < 0 && look.italics, 'a note\'s number is set as Word sets it (the text\'s colour, small and raised), and a note keeps its italics', JSON.stringify(look));
  ok(look.hidden && look.kept === made.notes, '#footnotes keeps every note, hidden on the screen', JSON.stringify(look));
  await p.evaluate(() => { const f = document.querySelector('#cd-fnpages .cd-fnpage'); f.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(500);
  await p.screenshot({ path: OUT + '/notes-foot.png' });
  await p.emulateMedia({ media: 'print' });
  const pr = await p.evaluate(() => ({ fb: getComputedStyle(document.getElementById('footnotes')).visibility, layer: getComputedStyle(document.getElementById('cd-fnpages')).display }));
  await p.emulateMedia({ media: 'screen' });
  ok(pr.fb === 'visible' && pr.layer === 'none', 'in print the notes stand at the end, as before, and the page-foot layer is left out', JSON.stringify(pr));
  // the layout by need
  await caretIn(p, 3, 12); await p.keyboard.type(' a few more words to move the lines along a little, and then a few more again'); await settle(p);
  await same(p, 'typing');
  await caretIn(p, 9, 30);
  await p.evaluate(() => document.getElementById('insFoot').click()); await settle(p); await p.waitForTimeout(400);
  const nw = await p.evaluate(() => { const a = document.activeElement, id = a && a.parentNode && a.parentNode.getAttribute && a.parentNode.getAttribute('data-nid'); return { at: a && a.className, id, ref: !!document.querySelector('#editor sup.fn-ref[data-nid="' + id + '"]'), n: document.querySelectorAll('#editor sup.fn-ref').length }; });
  ok(/cd-fnpt/.test(nw.at || '') && nw.ref && nw.n === made.notes + 1, 'Insert footnote puts its number at the pen and the pen in the new note, at the foot of its page', JSON.stringify(nw));
  await p.keyboard.type('Brown, A Long Note on Method, written at the foot of the page where it stands, and long enough to take three lines of the note area at least, so that the page gives up more of its room.');
  await p.waitForTimeout(400); await settle(p); await p.waitForTimeout(300); await settle(p);
  const wr = await p.evaluate((id) => ({ store: (document.querySelector('#footnotes .fn[data-nid="' + id + '"]') || {}).textContent || '', foot: (document.querySelector('#cd-fnpages .cd-fnp[data-nid="' + id + '"] .cd-fnpt') || {}).textContent || '', still: document.activeElement && document.activeElement.classList.contains('cd-fnpt') }), nw.id);
  ok(/A Long Note on Method/.test(wr.store) && /A Long Note on Method/.test(wr.foot) && wr.still, 'the note is written where it stands, into #footnotes, the pen staying in it as the page is laid out again', JSON.stringify(wr).slice(0, 200));
  await same(p, 'a new note, written at the foot');
  await p.keyboard.press('Enter'); await p.waitForTimeout(300);
  const back = await p.evaluate((id) => { const s = getSelection(), r = s.rangeCount && s.getRangeAt(0), ref = document.querySelector('#editor sup.fn-ref[data-nid="' + id + '"]'); const after = document.createRange(); after.setStartAfter(ref); return { inEd: document.activeElement === document.getElementById('editor'), at: !!r && r.collapsed && r.compareBoundaryPoints(Range.START_TO_START, after) === 0 }; }, nw.id);
  ok(back.inEd && back.at, 'Enter goes back to the text, the pen after the note\'s number', JSON.stringify(back));
  await p.evaluate(() => { const n = document.querySelector('#cd-fnpages .cd-fnpn'); n.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true })); }); await p.waitForTimeout(200);
  ok(await p.evaluate(() => { const id = document.querySelector('#cd-fnpages .cd-fnp').getAttribute('data-nid'), s = getSelection(), r = s.rangeCount && s.getRangeAt(0), ref = document.querySelector('#editor sup.fn-ref[data-nid="' + id + '"]'); const a = document.createRange(); a.setStartAfter(ref); return document.activeElement.id === 'editor' && r.compareBoundaryPoints(Range.START_TO_START, a) === 0; }), 'a press on a note\'s number at the foot goes back to its place in the text');
  await p.evaluate(() => { const ed = document.getElementById('editor'); const r = ed.querySelectorAll('sup.fn-ref')[2]; let blk = r; while (blk.parentNode !== ed) blk = blk.parentNode; window.__tabDirty = blk; window.__tabDirtyLast = blk; r.remove(); window.cdLayoutNow(); }); await settle(p);
  await same(p, 'a removed note');
  // copy and paste
  const cp = await p.evaluate(() => { const ed = document.getElementById('editor'), r = ed.querySelector('sup.fn-ref'), para = r.closest('p'); const rg = document.createRange(); rg.selectNodeContents(para); const s = getSelection(); s.removeAllRanges(); s.addRange(rg);
    const dt = new DataTransfer(); ed.dispatchEvent(new ClipboardEvent('copy', { clipboardData: dt, bubbles: true, cancelable: true })); return { html: dt.getData('text/html'), plain: dt.getData('text/plain') }; });
  ok(/mso-footnote-id:ftn1/.test(cp.html) && /mso-element:footnote/.test(cp.html) && /Archives of Empire/.test(cp.html) && /\[\^1\]: Smith/.test(cp.plain), 'a copy that holds a note carries it in Word\'s own footnote form, and in plain text as Inkwell keeps notes', cp.plain.slice(-80));
  const before = await p.evaluate(() => document.querySelectorAll('#editor sup.fn-ref').length);
  await caretIn(p, 1, 5);
  await p.evaluate(() => { const html = INKFNCLIP.wordHTML('Pasted words<sup data-fnk="1"></sup> stand here.', [{ html: 'A pasted <i>note</i> from Word.' }]); const dt = new DataTransfer(); dt.setData('text/html', html); dt.setData('text/plain', 'Pasted words stand here.'); document.getElementById('editor').dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true })); });
  await settle(p);
  const ps = await p.evaluate(() => { const refs = [...document.querySelectorAll('#editor sup.fn-ref[data-note="foot"]')], i = refs.findIndex(r => { const e = document.querySelector('#footnotes .fn[data-nid="' + r.getAttribute('data-nid') + '"]'); return e && /A pasted/.test(e.textContent); }); return { n: refs.length, i, num: i >= 0 ? refs[i].textContent : null, foot: !!document.querySelector('#cd-fnpages .cd-fnpt i') && [...document.querySelectorAll('#cd-fnpages .cd-fnpt')].some(x => /A pasted note/.test(x.textContent)) }; });
  ok(ps.n === before + 1 && ps.i >= 0 && ps.num === String(ps.i + 1) && ps.foot, 'a paste of Word\'s footnote form makes the note Tabula\'s own, numbered in its place, at the foot of its page', JSON.stringify(ps));
  // the Word files
  const dx = await p.evaluate(async () => { const toB64 = (u) => { let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); };
    const a = window.cdBuildDocx(); const u1 = a instanceof Uint8Array ? a : new Uint8Array(a instanceof Blob ? await a.arrayBuffer() : a);
    const c = window.__tbBuildDocx(); const u2 = c instanceof Uint8Array ? c : new Uint8Array(c instanceof Blob ? await c.arrayBuffer() : c);
    return [toB64(u1), toB64(u2)]; });
  const z1 = await p.evaluate(UNZIP, dx[0]), z2 = await p.evaluate(UNZIP, dx[1]);
  const d1 = z1['word/document.xml'] || '', f1 = z1['word/footnotes.xml'] || '', s1 = z1['word/styles.xml'] || '';
  ok(/<w:footnoteReference w:id="1"\/>/.test(d1) && (f1.match(/<w:footnote w:id="\d+">/g) || []).length === ps.n && /Archives of Empire/.test(f1) && /FootnoteText/.test(s1) && /Times New Roman/.test(s1) && /footnotePr/.test(z1['word/settings.xml'] || '') && /footnotes\.xml/.test(z1['word/_rels/document.xml.rels'] || ''),
    'Save as .docx writes Word\'s own footnotes (their part, styles, separators and links) in the page\'s own type', JSON.stringify({ refs: (d1.match(/footnoteReference/g) || []).length, notes: (f1.match(/<w:footnote w:id="\d+">/g) || []).length, want: ps.n }));
  ok(/<w:i\/>/.test(f1.slice(f1.indexOf('Archives') - 200, f1.indexOf('Archives'))), 'and a note keeps its italics there');
  ok(/footnotePr/.test(z2['word/settings.xml'] || '') && !/<w:sectPr[^>]*>[\s\S]*?<w:footnotePr/.test(z2['word/document.xml'] || '') && /settings\.xml/.test(z2['[Content_Types].xml'] || '') && /<w:i\/>/.test(z2['word/footnotes.xml'] || ''), 'the ribbon\'s .docx names the separators in settings.xml (not in the section) and keeps a note\'s italics', JSON.stringify(Object.keys(z2)));
  // night
  await p.evaluate(() => { document.documentElement.classList.add('cd-dark'); }); await p.waitForTimeout(1800);
  const nt = await p.evaluate(() => { const f = document.querySelector('#cd-fnpages .cd-fnpage'), r = document.querySelector('#editor sup.fn-ref'), para = r.closest('p'); return { foot: getComputedStyle(f).color, ref: getComputedStyle(r).color === getComputedStyle(para).color }; });
  ok(nt.ref && /242, 245, 248/.test(nt.foot), 'by night the notes and their numbers take the night\'s ink', JSON.stringify(nt));
  await p.evaluate(() => { const f = document.querySelector('#cd-fnpages .cd-fnpage'); f.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(400);
  await p.screenshot({ path: OUT + '/notes-foot-night.png' });
  ok(errs.length === 0, 'no page errors', JSON.stringify(errs.slice(0, 3)));
  await p.close();
  // the thesis: 100,000 words and 300 notes
  const q = await ctx.newPage(); const qerr = []; q.on('pageerror', e => qerr.push(e.message.slice(0, 200)));
  await q.goto(URL_); await q.waitForTimeout(2500);
  const t0 = Date.now(); const th = await q.evaluate(DOC, 100000); await settle(q); const tAll = Date.now() - t0;
  const tf = await q.evaluate(FEET);
  ok(!tf.missing && !tf.wrongPage && !tf.offFoot && !tf.overlap && !tf.straddle && tf.refs === th.notes, 'a thesis of 100,000 words: ' + th.notes + ' notes, each at the foot of its page, on ' + tf.pages + ' pages', JSON.stringify(tf).slice(0, 240) + ' laid out in ' + tAll + ' ms');
  await caretIn(q, 40, 15);
  const ins = await q.evaluate(() => new Promise(res => { const t0 = performance.now(); document.getElementById('insFoot').click(); (function w() { if (window.__tabLayoutBusy || !document.activeElement.classList.contains('cd-fnpt')) { if (performance.now() - t0 < 20000) { setTimeout(w, 5); return; } } res({ ms: Math.round(performance.now() - t0), touched: window.__tabLayoutTouched, at: document.activeElement.className }); })(); }));
  ok(/cd-fnpt/.test(ins.at) && ins.ms < 1500 && ins.touched < 200, 'in the thesis a new note is placed and the pen is in it quickly, laid out from its paragraph', JSON.stringify(ins));
  await settle(q);
  await same(q, 'a new note in the thesis');
  ok(qerr.length === 0, 'no page errors in the thesis', JSON.stringify(qerr.slice(0, 3)));
  await q.close();
  // in a host
  if (HOST) {
    const h = await ctx.newPage(); const herr = []; h.on('pageerror', e => herr.push(e.message.slice(0, 200)));
    await h.goto(HOST, { timeout: 120000 }); await h.waitForTimeout(6000);
    await h.click('text=Start fresh', { timeout: 4000 }).catch(() => {}); await h.waitForTimeout(1200);
    await h.evaluate(() => { try { if (document.getElementById('cd-door')) cdCloseDoor(); } catch (e) {} }); await h.waitForTimeout(500);
    await h.evaluate(() => openTextInTabula('Notes', 'x')); await h.waitForTimeout(6000);
    const fr = await (await h.$('#frame-tabula')).contentFrame();
    await fr.evaluate(DOC, 6000); await fr.waitForTimeout(800); await fr.waitForFunction(() => !window.__tabLayoutBusy, null, { timeout: 60000 }); await fr.waitForTimeout(2200);
    const hf = await fr.evaluate(FEET), cards = await fr.evaluate(() => document.querySelectorAll('#cd-pages .cd-page').length);
    ok(!hf.missing && !hf.wrongPage && !hf.offFoot && !hf.overlap && hf.feet >= 3 && cards === hf.pages, 'in Carpe Diem the notes stand at each page\'s foot, on its raised pages', JSON.stringify({ feet: hf.feet, pages: hf.pages, cards, wrong: hf.wrongPage, overlap: hf.overlap }));
    await fr.evaluate(() => { const f = document.querySelector('#cd-fnpages .cd-fnpage'); f.scrollIntoView({ block: 'center' }); }); await h.waitForTimeout(600);
    await h.screenshot({ path: OUT + '/notes-in-carpe-diem.png' });
    ok(herr.length === 0, 'no page errors in Carpe Diem', JSON.stringify(herr.slice(0, 3)));
    await h.close();
  }
  await b.close();
  console.log(`RESULT ${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('CRASH', e.message); process.exit(1); });
