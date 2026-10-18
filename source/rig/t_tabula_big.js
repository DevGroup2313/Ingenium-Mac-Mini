// R127: Tabula holds a thesis of 100,000 words (apps/tabula_big_patch.py, by Inkwell 7.44's recipe). A thesis is made here,
// in the page (chapters, sections, 300 footnotes), so no personal document is needed. Checked: a keystroke stays quick;
// the pages laid out by need are the pages a full layout makes, after typing, a deleted paragraph, a split paragraph and a
// new heading; autosave keeps the thesis in IndexedDB and a reload brings it back with its notes; File > Save keeps it and
// the Documents tab opens it; a save made before the saved documents are read waits for them.
//   node t_tabula_big.js <url of a Tabula page> <outdir>
const pw = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
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
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForTimeout(2500);
  ok(await p.evaluate(() => !!window.__tabStore && typeof window.cdLayoutNow === 'function'), 'the thesis patch is in Tabula (its store and its layout by need)');
  const made = await p.evaluate(THESIS, 100000);
  ok(made.words >= 100000 && made.notes >= 300, 'a thesis of 100,000 words with 300 footnotes is in the page', JSON.stringify(made));
  const pages0 = await p.evaluate(() => document.getElementById('wcPages').textContent);
  ok(/^Page 1 of (3[0-9]{2})$/.test(pages0), 'it is laid out in more than three hundred pages', pages0);

  // a keystroke in the middle of the thesis, to the next painted frame
  const caret = async (frac, off) => p.evaluate(([frac, off]) => { const ed = document.getElementById('editor'); const ps = ed.querySelectorAll('p'); const mid = ps[Math.floor(ps.length * frac)]; const rg = document.createRange(); rg.setStart(mid.firstChild, off); rg.collapse(true); const s = getSelection(); s.removeAllRanges(); s.addRange(rg); ed.focus(); }, [frac, off]);
  await caret(0.5, 5);
  const per = []; for (const ch of 'archive') { const t = Date.now(); await p.keyboard.press(ch); await p.evaluate(() => new Promise(r => requestAnimationFrame(() => setTimeout(r, 0)))); per.push(Date.now() - t); }
  const med = per.slice().sort((a, b) => a - b)[Math.floor(per.length / 2)];
  ok(med < 150, 'a keystroke in a thesis of 100,000 words takes under 150 ms (it took about 430 ms before)', JSON.stringify(per) + ' median ' + med);

  // the pages laid out by need are the pages a full layout makes
  const snap = () => p.evaluate(() => ({ seps: [...document.querySelectorAll('#pageguides .pg-sep')].map(e => e.style.top).join(','), push: [...document.getElementById('editor').children].map(b => b.style.marginTop || '').join('|'), pages: document.getElementById('wcPages').textContent, words: document.getElementById('wcWords').textContent }));
  const settle = async () => { await p.waitForTimeout(700); await p.waitForFunction(() => !window.__tabLayoutBusy, null, { timeout: 30000 }); await p.waitForTimeout(200); return p.evaluate(() => ({ ms: window.__tabLayoutMs, touched: window.__tabLayoutTouched })); };
  const same = async (what) => {
    const a = await snap();
    await p.evaluate(() => { window.__tabDirty = 'all'; window.cdLayoutNow(); });
    const b2 = await snap();
    ok(a.seps === b2.seps && a.push === b2.push && a.pages === b2.pages && a.words === b2.words, 'after ' + what + ', the pages laid out by need are the pages a full layout makes', a.pages + ' / ' + b2.pages + (a.seps === b2.seps ? '' : ' (page breaks differ)') + (a.push === b2.push ? '' : ' (pushes differ)'));
  };
  const n0 = await p.evaluate(() => document.getElementById('editor').children.length);
  await caret(0.5, 5); await p.keyboard.type(' the reader returns to the archive and finds the same page again in a later hand '.repeat(6));
  const t1 = await settle(); ok(t1.touched < n0 && t1.touched > 0, 'after typing, the pause lays out from the edit only as far as the page breaks move', JSON.stringify(t1) + ' of ' + n0 + ' paragraphs');
  // while a long ripple of page breaks is laid out, in slices, a key is answered at once
  await caret(0.4, 3); await p.keyboard.type(' a sentence long enough to move the page breaks after it, a line or two at least, in a thesis that runs to three hundred pages and more '.repeat(3));
  await p.waitForTimeout(400);
  const busy = []; for (const ch of 'notes') { const t = Date.now(); await p.keyboard.press(ch); await p.evaluate(() => new Promise(r => requestAnimationFrame(() => setTimeout(r, 0)))); busy.push(Date.now() - t); }
  const bmed = busy.slice().sort((a, b) => a - b)[Math.floor(busy.length / 2)];
  ok(bmed < 150, 'a keystroke while the pages are being laid out is answered at once', JSON.stringify(busy));
  await settle(); await same('typing during a layout');
  await same('typing six long sentences');
  await p.evaluate(() => { const ed = document.getElementById('editor'); const ps = ed.querySelectorAll('p'); const tg = ps[Math.floor(ps.length * 0.3)]; const rg = document.createRange(); rg.selectNodeContents(tg); const s = getSelection(); s.removeAllRanges(); s.addRange(rg); ed.focus(); });
  await p.keyboard.press('Backspace'); await p.keyboard.press('Backspace'); const t2 = await settle(); await same('a deleted paragraph');
  await caret(0.7, 40); await p.keyboard.press('Enter'); const t3 = await settle(); await same('a split paragraph');
  await caret(0.85, 0); await p.keyboard.press('Enter'); await p.keyboard.press('ArrowUp'); await p.keyboard.type('A new section heading'); await p.evaluate(() => { try { document.execCommand('formatBlock', false, 'h2'); } catch (e) {} }); const t4 = await settle(); await same('a new heading');
  ok([t2, t3, t4].every(t => t.touched > 0 && t.touched <= n0), 'each of those edits is laid out from the edit on', JSON.stringify([t2, t3, t4]));

  // autosave keeps the thesis in IndexedDB, and a reload brings it back with its notes
  await p.evaluate(() => { try { window.__tabulaFlush(); } catch (e) {} }); await p.waitForTimeout(1500);
  const kept = await p.evaluate(() => { let n = 0; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); n += (localStorage.getItem(k) || '').length; } const m = Object.keys(localStorage).filter(k => /^tabula_autosave/.test(k)).map(k => localStorage.getItem(k)); return { ls: n, marker: m[0] || '' }; });
  ok(kept.ls < 2000 && /__tabIdb/.test(kept.marker), 'autosave keeps the thesis in IndexedDB, leaving a small marker in localStorage', JSON.stringify(kept).slice(0, 200));
  const before = await p.evaluate(() => ({ w: document.getElementById('wcWords').textContent, n: document.querySelectorAll('#editor sup.fn-ref').length }));
  await p.reload(); await p.waitForTimeout(4000);
  const back = await p.evaluate(() => ({ w: document.getElementById('wcWords').textContent, n: document.querySelectorAll('#editor sup.fn-ref').length, box: document.querySelectorAll('#footnotes .fn[data-nid]').length, warn: !!document.getElementById('cdSaveWarn') }));
  ok(back.w === before.w && back.n === before.n && back.box === before.n && !back.warn, 'a reload brings the whole thesis back, with every note, and no warning', JSON.stringify([before, back]));

  // File > Save keeps it, and the Documents tab opens it
  await p.evaluate(() => { document.getElementById('docTitle').value = 'Thesis draft'; document.querySelector('.fm-item[data-fm="save"]').click(); });
  await p.waitForFunction(() => /__tabIdb/.test(localStorage.getItem('tabula_docs') || ''), null, { timeout: 20000 }).catch(() => {});
  await p.waitForTimeout(1500);
  const saved = await p.evaluate(() => ({ marker: localStorage.getItem('tabula_docs') || '', modal: !!document.querySelector('.modal.open, #modal.open') }));
  ok(/__tabIdb/.test(saved.marker) && saved.marker.length < 400 && !saved.modal, 'File > Save keeps the thesis, in IndexedDB', saved.marker);
  await p.reload(); await p.waitForTimeout(3000);
  await p.evaluate(() => { document.querySelector('.tab[data-tab="docs"]').click(); }); await p.waitForTimeout(1500);
  const opened = await p.evaluate(() => new Promise(r => { const card = [...document.querySelectorAll('#docList .doc-card')].find(c => c.getAttribute('data-k') === 'Thesis draft'); if (!card) { r({ card: false, list: (document.getElementById('docList') || {}).textContent }); return; }
    document.getElementById('editor').innerHTML = '<p>x</p>'; card.click(); setTimeout(() => r({ card: true, w: document.getElementById('wcWords').textContent, title: document.getElementById('docTitle').value, notes: document.querySelectorAll('#editor sup.fn-ref').length }), 1500); }));
  ok(opened.card && /^1\d{5} words$/.test(opened.w) && opened.title === 'Thesis draft' && opened.notes >= 300, 'the Documents tab lists it and opens it whole', JSON.stringify(opened));

  // a save made before the saved documents are read waits for them, so it never replaces them with fewer
  const p2 = await ctx.newPage(); p2.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p2.addInitScript(() => { const o = indexedDB.open.bind(indexedDB); indexedDB.open = function () { const rq = o.apply(null, arguments); const real = {}; ['onsuccess'].forEach(k => Object.defineProperty(rq, k, { configurable: true, set(f) { real[k] = f; }, get() { return real[k]; } })); rq.addEventListener('success', ev => setTimeout(() => { if (real.onsuccess) real.onsuccess.call(rq, ev); }, 2500)); return rq; }; });
  await p2.goto(URL_); await p2.waitForTimeout(600);
  const early = await p2.evaluate(() => { const pend = window.__tabStore.pending('tabula_docs'); document.getElementById('docTitle').value = 'Seminar notes'; document.getElementById('editor').innerHTML = '<p>Notes for the seminar.</p>'; document.querySelector('.fm-item[data-fm="save"]').click(); return pend; });
  await p2.waitForTimeout(6000);
  const keysAfter = await p2.evaluate(() => new Promise(r => { window.__tabStore.ready('tabula_docs').then(() => { let d = {}; try { d = JSON.parse(window.__tabStore.get('tabula_docs') || '{}'); } catch (e) {} r(Object.keys(d).sort()); }); }));
  ok(early === true && keysAfter.join(',') === 'Seminar notes,Thesis draft', 'a save made before the saved documents were read waited for them: both documents are kept', JSON.stringify({ early, keysAfter }));
  await p2.close();
  ok(errs.length === 0, 'no page errors', JSON.stringify(errs.slice(0, 4)));
  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL crashed: ' + e.message); process.exit(1); });
