// Ingenium's own pop-ups everywhere, and documents in a chat that open (Ingenium 6.11.1, modules/r216.js with r115, r118, r131, r188).
// Her words (4 November 2026): "Ingenium's in app popups look weird in this random basic dark gray format and completely detracts from the
// rest of the app, please redesign these popups all over the app", and "The documents uploaded inside of the chats of Ingenium are not
// clickable or offer a preview when you hover over it, the HTML single file is clickable but not the documents, please fix that."
// The browser's own boxes are watched: a test fails if any of them opens (in the page or in an app's frame). The documents and sources
// are invented.
//   node rig/t_6111_popups.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 800))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1360, height: 900 } })).newPage();
  const errs = [], native = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  p.on('dialog', d => { native.push(d.type() + ': ' + d.message().slice(0, 80)); d.dismiss().catch(() => {}); });   // the browser's grey box: never wanted
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); state.motion = 'minimal'; });
  await p.waitForTimeout(400);
  const dlg = () => p.evaluate(() => { const r = document.getElementById('modalRoot'), bx = document.getElementById('modalBox'); if (!r || !r.classList.contains('open')) return null;
    const i = bx.querySelector('input'); return { h: (bx.querySelector('h3') || {}).textContent || '', p: (bx.querySelector('p') || {}).textContent || '', input: i ? i.value : null, keys: [...bx.querySelectorAll('.ing-ask-keys .btn')].map(x => x.textContent) }; });
  const press = (label) => p.evaluate((label) => { const k = [...document.querySelectorAll('#modalBox .ing-ask-keys .btn')].find(x => x.textContent === label); if (k) k.click(); return !!k; }, label);
  const type = (t) => p.evaluate((t) => { const i = document.querySelector('#modalBox input'); i.value = t; }, t);

  // ---------- 1. a notice: Ingenium's dialog, not the browser's ----------
  await p.evaluate(() => { window.alert('Export failed: the disk is full.'); }); await p.waitForTimeout(400);
  let d = await dlg();
  ok(d && d.h === 'Export failed: the disk is full.' && d.keys.join() === 'OK', 'a notice (alert) shows in Ingenium\'s own dialog, with one OK key', d);
  await p.screenshot({ path: OUT + '/alert-day.png' }); await press('OK'); await p.waitForTimeout(300);
  ok(!(await dlg()), 'OK closes it');

  // ---------- 2. Fontes: a new collection is named in Ingenium's dialog ----------
  await p.evaluate(() => { const st = fontesState(); st.items = []; fontesAdd([{ id: 'doi:10.1000/calm.2021.1', type: 'article-journal', title: 'Attention restoration and the design of calm interfaces', author: [{ family: 'Lovelace', given: 'Ada' }], issued: { 'date-parts': [[2021]] } },
    { id: 'doi:10.1000/calm.2022.2', type: 'article-journal', title: 'Quiet screens', author: [{ family: 'Hopper', given: 'Grace' }], issued: { 'date-parts': [[2022]] } }]); saveState(); });
  await p.evaluate(() => openFontes()); await p.waitForTimeout(1500);
  const hasColl = await p.evaluate(() => !!document.getElementById('foNewColl'));
  if (hasColl) {
    await p.evaluate(() => { const cbs = document.querySelectorAll('#foList .fo-row input'); if (cbs[0]) cbs[0].checked = true; document.getElementById('foNewColl').click(); }); await p.waitForTimeout(400);
    d = await p.evaluate(() => { const L = document.querySelector('.ing-dlg-root .ing-dlg-card'); if (!L) return null; const i = L.querySelector('input'); return { h: L.querySelector('h3').textContent, input: i ? i.value : null }; });
    ok(d && /A name for the collection/.test(d.h) && d.input === '', 'Fontes: + Collection asks for its name in Ingenium\'s dialog, over the Fontes room', d);
    await p.evaluate(() => { const L = document.querySelector('.ing-dlg-root .ing-dlg-card'); L.querySelector('input').value = 'Chapter two'; [...L.querySelectorAll('.ing-ask-keys .btn')].pop().click(); }); await p.waitForTimeout(400);
    const coll = await p.evaluate(() => ({ colls: (state.fontes && state.fontes.colls) || [], inColl: fontesItems().filter(c => c.ingColl === 'Chapter two').length }));
    ok(coll.colls.indexOf('Chapter two') >= 0, 'and the collection is made with the name she wrote', coll);
    const room = await p.evaluate(() => ({ list: !!document.getElementById('foList'), open: document.getElementById('modalRoot').classList.contains('open'), layer: !!document.querySelector('.ing-dlg-root') }));
    ok(room.list && room.open && !room.layer, 'the question opened over the Fontes room and left it as it was (Fontes lives in the dialog frame itself)', room);
  } else ok(false, 'Fontes could not be opened in this test', null);

  // ---------- 3. documents in a chat: they open, and show their first lines on hover ----------
  await p.evaluate(() => { try { closeModal(); } catch (e) {} go('chat'); const c = curChat(); c.messages = [];
    const files = [{ name: 'Chapter notes.docx', chars: 1800 }, { name: 'tally.py', chars: 120 }];
    const block = '<file name="Chapter notes.docx">\nThe tally stick was a notched record of a debt.\n\nIt was split in two, and each party kept a half.\n</file>\n\n<file name="tally.py">\ndef add(n):\n    return n + 1\n</file>';
    c.messages.push({ role: 'me', text: 'What do these say?', files, attach: block, at: Date.now() - 5000 });
    c.messages.push({ role: 'bot', text: 'They describe tally sticks.', at: Date.now() - 2000, done: Date.now() - 1000 }); saveState(); renderChat(); });
  await p.waitForTimeout(500);
  const chips = await p.evaluate(() => [...document.querySelectorAll('#page-chat .msg-files .msg-file')].map(x => ({ tag: x.tagName, t: x.textContent })));
  ok(chips.length === 2 && chips.every(x => x.tag === 'BUTTON' && /▸ Open/.test(x.t)), 'a Word document and a code file attached to a message are keys that open, like a page', chips);
  await p.hover('#page-chat .msg-files .msg-file >> nth=0'); await p.waitForTimeout(700);
  const peek = await p.evaluate(() => { const e = document.getElementById('r216Peek'); return e && !e.hidden ? e.innerText : null; });
  ok(peek && /Chapter notes\.docx/.test(peek) && /notched record of a debt/.test(peek) && /press to open it/.test(peek), 'hovering one shows its name, its size and its first lines', peek);
  await p.screenshot({ path: OUT + '/doc-peek.png' });
  await p.click('#page-chat .msg-files .msg-file >> nth=0'); await p.waitForTimeout(800);
  const st = await p.evaluate(() => ({ kind: csCur && csCur.kind, name: csCur && csCur.name, has: !!(csCur && /split in two/.test(csCur.md || '')), on: document.body.classList.contains('cs-on') }));
  ok(st.kind === 'doc' && st.name === 'Chapter notes.docx' && st.has && st.on, 'pressing it opens the document beside the chat, its words as they were attached', st);
  await p.click('#page-chat .msg-files .msg-file >> nth=1'); await p.waitForTimeout(600);
  const st2 = await p.evaluate(() => ({ name: csCur && csCur.name, code: !!(csCur && /```python\ndef add/.test(csCur.md || '')) }));
  ok(st2.name === 'tally.py' && st2.code, 'a code file opens as code, in its language', st2);
  await p.screenshot({ path: OUT + '/doc-open.png' });

  // ---------- 4. an app Ingenium carries: Tabula's questions in Ingenium's dialog, and her answer reaches the app ----------
  const fr = await p.evaluate(async () => { try { IngDesk.open('tabula'); } catch (e) { return 'no desk: ' + e.message; } for (let i = 0; i < 40; i++) { await new Promise(r => setTimeout(r, 250)); const f = [...document.querySelectorAll('iframe')].find(x => { try { return x.contentDocument && x.contentDocument.getElementById('insFoot'); } catch (e) { return false; } }); if (f) { f.id = f.id || 'tabTest'; return f.id; } } return null; });
  const frame = fr ? p.frames().find(f => { try { return f.name() === fr || f.url() === 'about:srcdoc'; } catch (e) { return false; } }) : null;
  let tf = null; if (fr) { const h = await p.$('#' + fr); tf = h ? await h.contentFrame() : null; }
  ok(!!tf, 'Tabula opens inside Ingenium', fr);
  if (tf) {
    await tf.waitForFunction(() => !!document.getElementById('editor') && window.__ingDlg === 1, null, { timeout: 30000 });
    // a comment on the words she selected: the question in Ingenium's dialog, and her selection kept for the answer
    await tf.evaluate(() => { const ed = document.getElementById('editor'); ed.focus(); ed.innerHTML = '<p>The tally stick recorded debts.</p>'; const t = ed.querySelector('p').firstChild, r = document.createRange(); r.setStart(t, 4); r.setEnd(t, 15); const s = getSelection(); s.removeAllRanges(); s.addRange(r); });
    await tf.click('button.ribtab[data-rib="insert"]'); await tf.waitForTimeout(300);
    await tf.evaluate(() => { const ed = document.getElementById('editor'), t = ed.querySelector('p').firstChild, r = document.createRange(); r.setStart(t, 4); r.setEnd(t, 15); const s = getSelection(); s.removeAllRanges(); s.addRange(r); });
    await tf.click('#insComment'); await tf.waitForTimeout(500);
    let td = await tf.evaluate(() => { const x = document.querySelector('.ing-dlg'); return x ? { h: x.querySelector('h3').textContent, input: !!x.querySelector('input'), keys: [...x.querySelectorAll('button')].map(b => b.textContent) } : null; });
    ok(td && td.h === 'Comment' && td.input && td.keys.join() === 'Cancel,OK', 'Tabula\'s Comment asks in Ingenium\'s dialog, inside the app', td);
    await p.screenshot({ path: OUT + '/tabula-dialog.png' });
    await tf.evaluate(() => { const i = document.querySelector('.ing-dlg input'); i.value = 'Clanchy calls these tallies the first receipts.'; [...document.querySelectorAll('.ing-dlg button')].find(b => b.textContent === 'OK').click(); });
    await tf.waitForTimeout(900);
    const cm = await tf.evaluate(() => { const c = document.querySelectorAll('#editor .comment'); return { n: c.length, on: c[0] ? c[0].textContent : null, says: c[0] ? c[0].getAttribute('data-comment') : null, dlg: !!document.querySelector('.ing-dlg') }; });
    ok(cm.n === 1 && cm.on === 'tally stick' && cm.says === 'Clanchy calls these tallies the first receipts.' && !cm.dlg, 'her words reach the app: one comment, on the very words she had selected', cm);
    // two questions in one sum (rows, then columns), and Cancel
    await tf.evaluate(() => { const ed = document.getElementById('editor'), p = ed.querySelector('p'), r = document.createRange(); r.selectNodeContents(p); r.collapse(false); const s = getSelection(); s.removeAllRanges(); s.addRange(r); });
    await tf.click('#insTable'); await tf.waitForTimeout(400);
    td = await tf.evaluate(() => { const x = document.querySelector('.ing-dlg'); return x ? x.querySelector('h3').textContent : null; });
    await tf.evaluate(() => { const i = document.querySelector('.ing-dlg input'); i.value = '2'; [...document.querySelectorAll('.ing-dlg button')].find(b => b.textContent === 'OK').click(); }); await tf.waitForTimeout(500);
    const td2 = await tf.evaluate(() => { const x = document.querySelector('.ing-dlg'); return x ? x.querySelector('h3').textContent : null; });
    await tf.evaluate(() => { const i = document.querySelector('.ing-dlg input'); i.value = '4'; [...document.querySelectorAll('.ing-dlg button')].find(b => b.textContent === 'OK').click(); }); await tf.waitForTimeout(700);
    const tb = await tf.evaluate(() => { const t = document.querySelectorAll('#editor table'); const last = t[t.length - 1]; return { tables: t.length, rows: last ? last.rows.length : 0, cols: last && last.rows[0] ? last.rows[0].cells.length : 0 }; });
    ok(td === 'Rows' && td2 === 'Columns' && tb.tables === 1 && tb.rows === 2 && tb.cols === 4, 'a table: Rows, then Columns, each asked in turn; one table of 2 by 4 is made', { td, td2, tb });
    await tf.click('#insBookmark'); await tf.waitForTimeout(400);
    await tf.evaluate(() => { [...document.querySelectorAll('.ing-dlg button')].find(b => b.textContent === 'Cancel').click(); }); await tf.waitForTimeout(500);
    const after = await tf.evaluate(() => ({ marks: document.querySelectorAll('#editor a[id]').length, dlg: !!document.querySelector('.ing-dlg') }));
    ok(after.marks === 0 && !after.dlg, 'Cancel (on Bookmark) does nothing, as before', after);
    // night: the dialog in Ingenium's night colours
    await tf.evaluate(() => { document.documentElement.classList.add('cd-dark'); }); await tf.click('#insBookmark'); await tf.waitForTimeout(400);
    const night = await tf.evaluate(() => { const x = document.querySelector('.ing-dlg'); const cs = x ? getComputedStyle(x) : null; return cs ? { bg: cs.backgroundImage.slice(0, 60), color: cs.color } : null; });
    ok(night && /45, 37, 64|2d2540/.test(night.bg) && /243, 238, 251/.test(night.color), 'by night it takes Ingenium\'s night colours', night);
    await p.screenshot({ path: OUT + '/tabula-dialog-night.png' });
    await tf.evaluate(() => { [...document.querySelectorAll('.ing-dlg button')].find(b => b.textContent === 'Cancel').click(); });
  }
  ok(native.length === 0, 'the browser\'s own grey box never opened, in the page or in the app', native);
  ok(errs.length === 0, 'no script errors on the page', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
