// R124: Tabula keeps every part of a document (its footnotes, endnotes, bibliography, header, footer and contents) when
// it autosaves, when it moves into a floating window, and when the app starts again; and when autosave cannot keep a
// document, the page says so with a way to keep a copy.
// node rig/t_tabula_keep.js <url> <outdir>
const pw = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
async function open(p) { await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 });
  await p.evaluate(() => { const x = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Enter' && b.offsetParent); if (x) x.click(); });
  await p.evaluate(() => go('tabula')); await p.waitForTimeout(6000); return (await p.$('#ing-desk iframe[data-app="tabula"]')).contentFrame(); }
const notes = (f) => f.evaluate(() => ({ text: document.getElementById('editor').innerText.slice(0, 60), refs: document.querySelectorAll('#editor sup.fn-ref').length, notes: [...document.querySelectorAll('#footnotes .fn')].map(n => n.textContent.trim()), header: (document.getElementById('docheader') || {}).innerText || '' }));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const f = await open(p);
  await f.evaluate(() => { const ed = document.getElementById('editor'); ed.focus(); ed.innerHTML = '<p>The archive was closed in 1931.</p>'; const r = document.createRange(); r.selectNodeContents(ed.querySelector('p')); r.collapse(false); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    window.prompt = () => 'Smith, Archives of Empire (Oxford: Clarendon, 2001), 45.'; document.getElementById('insFoot').click(); });
  await p.waitForTimeout(800);
  /* the header, written as typing writes it: Header on the ribbon, then the words, with the input event typing fires
     (Tabula's per-section header store follows that event) */
  await f.evaluate(() => document.getElementById('tglHeader').click()); await p.waitForTimeout(300);
  await f.evaluate(() => { const h = document.getElementById('docheader'); h.insertBefore(document.createTextNode('Chapter Two'), h.firstChild); h.dispatchEvent(new Event('input', { bubbles: true })); });
  await p.waitForTimeout(300);
  await f.evaluate(() => window.__tabulaFlush());
  const auto = await f.evaluate(() => { const a = JSON.parse(localStorage.getItem('tabula_autosave') || 'null'); return a ? { keys: Object.keys(a).join(','), note: /Archives of Empire/.test(JSON.stringify(a.aux || '')), header: /Chapter Two/.test(JSON.stringify(a.aux || '')) } : null; });
  ok(auto && auto.note && auto.header, 'autosave keeps the footnote\'s words and the header, not just the text', JSON.stringify(auto));
  // a change to a footnote alone is autosaved too
  await f.evaluate(() => { const n = document.querySelector('#footnotes .fn'); n.lastChild.textContent = ' Smith, Archives of Empire, 2nd ed. (Oxford: Clarendon, 2003), 47.'; window.__tabulaFlush(); });
  ok(await f.evaluate(() => /2nd ed\./.test(localStorage.getItem('tabula_autosave'))), 'a change made in a footnote alone is autosaved');
  await p.click('#fabFloat'); await p.waitForTimeout(5000);
  const fl = await notes(await (await p.$('.ing-fw iframe')).contentFrame());
  ok(fl.refs === 1 && fl.notes.length === 1 && /2nd ed\./.test(fl.notes[0]) && /Chapter Two/.test(fl.header), 'moved into a floating window, the page keeps its footnote and its header', JSON.stringify(fl));
  await p.close();
  const p2 = await ctx.newPage(); p2.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const f2 = await open(p2);
  const back = await notes(f2);
  ok(/archive was closed/.test(back.text) && back.notes.length === 1 && /2nd ed\./.test(back.notes[0]) && /Chapter Two/.test(back.header), 'after the app starts again, the autosaved page comes back whole', JSON.stringify(back));
  await f2.evaluate(() => { document.getElementById('editor').innerHTML = '<p>' + 'x'.repeat(4100000) + '</p>'; window.__tabulaFlush(); }); await p2.waitForTimeout(400);
  const warn = await f2.evaluate(() => { const w = document.getElementById('cdSaveWarn'); return w ? { t: w.innerText.slice(0, 90), keys: [...w.querySelectorAll('button')].map(b => b.textContent) } : null; });
  ok(warn && /Autosave cannot keep this document/.test(warn.t) && warn.keys.join() === 'Save as .docx,Save as PDF,Close', 'when autosave cannot keep a document, the page says so and offers a copy', JSON.stringify(warn));
  await p2.screenshot({ path: OUT + '/autosave-warning.png' });
  ok(errs.length === 0, 'no page errors', errs.slice(0, 3).join(' | '));
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close();
})().catch(e => { console.log('CRASH', e.message); process.exit(1); });
