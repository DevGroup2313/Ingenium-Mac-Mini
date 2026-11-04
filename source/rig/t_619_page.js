// Your page (Ingenium 6.19, modules/r227.js, the master edition; the computer apps' side is desktop/app_page_619.py, tested on its
// own). Her words (4 November 2026): "I want full agency and authorship over Ingenium. I want to be able to make proper edits,
// customise, troubleshoot, fix, curate, run diagnostics and add or remove new features, pages, sections or different functions in
// Ingenium as its author and creator"; her answer on how changes take effect: both, layers first, then the page itself.
// The computer app is a stand-in here (its five calls, in the page); every change, note and folder is invented.
//   node rig/t_619_page.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1400))); c ? pass++ : fail++; };
const STAND_IN = () => {
  window.__pg = { calls: [], versions: [], use: '', running: '', back: null, started: 0, inc: '', last: '' };
  const g = () => window.__pg;
  window.pywebview = { api: {
    page_state() { const s = g(); return Promise.resolve({ ok: true, use: s.use, running: s.running, versions: s.versions.slice().reverse(), back: s.back, builtin: { bytes: 1 }, folder: '/Users/invented/Library/Application Support/Ingenium/pages', now: true }); },
    page_put(piece, first, last, note) { const s = g(); s.calls.push(['put', piece.length, !!first, !!last, note]); if (first) s.inc = ''; s.inc += piece;
      if (!last) return Promise.resolve({ ok: true, bytes: s.inc.length }); const id = '20261104-1900' + String(10 + s.versions.length);
      s.versions.push({ id, bytes: s.inc.length, when: Date.now() / 1000, good: false, tries: 0, note }); s.last = s.inc; s.inc = '';
      return Promise.resolve({ ok: true, id, bytes: s.last.length, put_back: 0, missing: [] }); },
    page_use(id, now) { const s = g(); s.calls.push(['use', id, !!now]); s.use = id; if (now) s.running = id; s.back = null; return Promise.resolve({ ok: true, now: !!now }); },
    page_drop(id) { const s = g(); s.calls.push(['drop', id]); s.versions = s.versions.filter(v => v.id !== id); return Promise.resolve({ ok: true }); },
    page_started() { g().started++; return Promise.resolve({ ok: true, running: g().running }); } } };
};
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 980 } }); await ctx.addInitScript(STAND_IN); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e.message).slice(0, 200) + ' @ ' + String(e.stack || '').split('\n').slice(0, 4).join(' / ').slice(0, 400) + ' #' + STEP));
  let STEP = 'load'; const step = (n) => { STEP = n; };
  const open = async (pg) => { await pg.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await pg.waitForTimeout(1400);
    await pg.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await pg.waitForTimeout(300); };
  const press = (pg, label) => pg.evaluate((l) => { const k = [...document.querySelectorAll('button')].filter(x => x.textContent.trim() === l && x.offsetParent).pop(); if (k) { k.click(); return true; } return false; }, label);
  const toasts = () => p.evaluate(() => [...document.querySelectorAll('.toast, #toast, .ing-toast, [role="status"]')].map(t => t.textContent.trim()).filter(Boolean).join(' | '));
  await p.goto(URL_); await open(p);

  /* 1. the card, in the Workshop */
  step('card');
  const c1 = await p.evaluate(async () => { go('workshop'); await new Promise(r => setTimeout(r, 900));
    return { cards: [...document.querySelectorAll('#page-workshop .card > h2')].map(h => h.textContent), state: (document.getElementById('pgState') || {}).textContent || '',
      keys: [...document.querySelectorAll('#pgKeys button')].map(x => x.textContent), note: (document.getElementById('pgNote') || {}).textContent || '', started: window.__pg.started }; });
  ok(c1.cards.join('|') === 'Check Ingenium|Errors since it started|Your layers|Your page', 'the Workshop ends with Your page', c1.cards);
  ok(/Running: the page Ingenium was built with\./.test(c1.state), 'it says the built page is running', c1.state);
  ok(c1.keys.join('|') === 'Use the page from Code|Use a page file…|Download the page running', 'its keys: from Code, a file, download (no going back while the built page runs)', c1.keys);
  ok(/Kept on this computer, beside your stored work: \/Users\/invented/.test(c1.note) && /At most five versions/.test(c1.note), 'it says where versions are kept and how many', c1.note);
  ok(c1.started === 1, 'the page reported in to the computer app once, after it was ready', c1.started);

  /* 2. what the page carries: out of the copy, and back */
  step('tails');
  const t2 = await p.evaluate(async () => { const full = await selfPageText(); const l = IngPage.lean(full); const w = await IngPage.whole(l);
    const ids = t => Object.keys(IngPage.tails(t)).sort().join(',');
    return { full: full.length, lean: l.length, left: Object.keys(IngPage.tails(l)).length, named: IngPage.named(l).length, whole: w.length, same: ids(w) === ids(full), n: Object.keys(IngPage.tails(full)).length }; });
  ok(t2.n >= 6 && t2.left === 0 && t2.named === t2.n && t2.lean < t2.full * 0.35, 'the copy leaves out what the page carries at its end, and still names each part', t2);
  ok(t2.whole === t2.full && t2.same, 'put back, it is the whole page again', t2);

  /* 3. Find and fix: the lighter copy, made once and used again */
  step('fix');
  const t3 = await p.evaluate(async () => { const n0 = (state.projects || []).length; const pr = await IngWorkshop.fix(); await new Promise(r => setTimeout(r, 600));
    const msg = (document.getElementById('chatInput') || {}).value || ''; go('workshop'); const pr2 = await IngWorkshop.fix(); await new Promise(r => setTimeout(r, 600));
    await ccLoadAll(pr); const f = pr.files.find(x => x.name === 'ingenium.html');
    return { made: (state.projects || []).length - n0, same: pr === pr2 || (pr && pr2 && pr.id === pr2.id), lean: !!(pr.ingSelf && pr.ingSelf.lean), len: f && f.text.length, hint: /leaves out what the page carries/.test(msg), name: pr.name }; });
  ok(t3.made === 1 && t3.same, 'Find and fix made one copy in Code and used it again', t3);
  ok(t3.lean && t3.len === t2.lean, 'the copy in Code is the lighter one', t3);
  ok(t3.hint, 'the message tells the model the empty blocks are filled when the page is used', t3);

  /* 4. Use the page from Code: unchanged, then changed */
  step('use');
  await p.evaluate(() => go('workshop')); await p.waitForTimeout(700);
  await press(p, 'Use the page from Code'); await p.waitForTimeout(4000);
  const t4 = await p.evaluate(() => window.__pg.calls.length);
  ok(t4 === 0, 'an unchanged copy is not handed over', { calls: t4 });
  const changed = await p.evaluate(async () => { const pr = IngPage.projects()[0]; await ccLoadAll(pr); const f = pr.files.find(x => x.name === 'ingenium.html');
    const t = f.text.replace('<head>', '<head><!-- an invented change -->'); f.text = t; await ccPut(f, t); try { saveState(); } catch (e) {} return t.length; });
  await press(p, 'Use the page from Code'); await p.waitForTimeout(4000);
  const dlg = await p.evaluate(() => [...document.querySelectorAll('button')].filter(x => x.offsetParent).map(x => x.textContent.trim()).filter(t => /Use it now|Not now/.test(t)));
  ok(dlg.join('|') === 'Use it now|Not now' || dlg.join('|') === 'Not now|Use it now', 'a changed copy asks first, in Ingenium\'s own pop-up', dlg);
  await press(p, 'Use it now'); await p.waitForTimeout(6000);
  const t5 = await p.evaluate(() => { const s = window.__pg, puts = s.calls.filter(c => c[0] === 'put');
    return { puts: puts.length, firsts: puts.filter(c => c[2]).length, first0: puts.length && puts[0][2], lasts: puts.filter(c => c[3]).length, lastN: puts.length && puts[puts.length - 1][3], note: puts.length && puts[puts.length - 1][4],
      len: s.last.length, change: s.last.indexOf('an invented change') > 0, use: s.calls.filter(c => c[0] === 'use') }; });
  ok(t5.puts >= 2 && t5.first0 && t5.firsts === 1 && t5.lastN && t5.lasts === 1, 'handed over in pieces, the first and the last marked', t5);
  ok(t5.len === changed && t5.change, 'the computer app received the changed page whole, as written', { got: t5.len, want: changed });
  ok(/^from Code: Ingenium \(workshop/.test(t5.note), 'with a note of where it came from', t5.note);
  ok(t5.use.length === 1 && t5.use[0][2] === true && /^20261104-/.test(t5.use[0][1]), 'and chosen at once, in this window', t5.use);
  const c6 = await p.evaluate(() => ({ state: document.getElementById('pgState').textContent, keys: [...document.querySelectorAll('#pgKeys button')].map(x => x.textContent),
    vers: [...document.querySelectorAll('#pgVers .ws-item')].map(x => x.textContent) }));
  ok(/Running: your page of .*\(from Code: Ingenium \(workshop\)\)\./.test(c6.state), 'the card says her page is running, with its note', c6.state);
  ok(c6.keys.indexOf('Go back to the built page') >= 0, 'with a way back to the built page', c6.keys);
  ok(c6.vers.length === 1 && /not tried yet/.test(c6.vers[0]) && /running/.test(c6.vers[0]) && !/Remove/.test(c6.vers[0]), 'its version is listed, running, and cannot be removed while it runs', c6.vers);

  /* 5. a page that did not start: Ingenium went back on its own, and says so */
  step('back');
  const c7 = await p.evaluate(async () => { const s = window.__pg, id = s.versions[0].id; s.versions[0].tries = 1; s.running = ''; s.use = '';
    s.back = { from: id, to: '', why: 'did not start', at: Date.now() / 1000 }; await IngPage.fill();
    return { warn: (document.querySelector('#pgState .ws-safe') || {}).textContent || '', vers: [...document.querySelectorAll('#pgVers .ws-item')].map(x => x.textContent) }; });
  ok(/did not start, so Ingenium went back to the page it was built with on its own\. Your work is as it was\./.test(c7.warn), 'a page that did not start: the card says Ingenium went back on its own', c7.warn);
  ok(c7.vers.length === 1 && /did not start/.test(c7.vers[0]) && /UseRemove/.test(c7.vers[0]), 'the version says it did not start, and can be used again or removed', c7.vers);
  await press(p, 'Remove'); await p.waitForTimeout(700); await press(p, 'Remove it'); await p.waitForTimeout(1200);
  const c8 = await p.evaluate(() => ({ drop: window.__pg.calls.filter(c => c[0] === 'drop').length, vers: document.querySelectorAll('#pgVers .ws-item').length }));
  ok(c8.drop === 1 && c8.vers === 0, 'Remove asks, then removes it', c8);

  /* 6. the copy in Code, downloaded whole */
  step('download');
  const t9 = await p.evaluate(async () => { window.saveFileNative = (name, mime, text) => { window.__saved = { name, mime, len: text.length, tails: Object.keys(IngPage.tails(text)).length, change: text.indexOf('an invented change') > 0 }; };
    const pr = IngPage.projects()[0]; await ccDownload(pr); for (let i = 0; i < 40 && !window.__saved; i++) await new Promise(r => setTimeout(r, 250)); return window.__saved || null; });
  ok(t9 && t9.name === 'ingenium.html' && t9.tails === t2.n && t9.change && t9.len === changed + (t2.full - t2.lean), 'Download the app gives the changed page whole, with what it carries put back', t9);

  /* 7. Guide, What is new, tour */
  step('guide');
  const t10 = await p.evaluate(() => { go('guide'); const g = document.getElementById('wsGuide'); return { guide: g ? g.textContent : '' }; });
  ok(/Your page/.test(t10.guide) && /goes back to the last page that worked/.test(t10.guide), 'the Guide\'s Workshop card has Your page', t10.guide.slice(0, 300));
  const errs1 = errs.slice(); ok(errs1.length === 0, 'no page errors', errs1);
  await p.screenshot({ path: OUT + '/workshop_your_page.png' }).catch(() => {});

  /* 8. in a browser: no computer app */
  const ctx2 = await b.newContext({ viewport: { width: 1280, height: 900 } }); const q = await ctx2.newPage(); const errs2 = []; q.on('pageerror', e => errs2.push(e.message.slice(0, 300)));
  await q.goto(URL_); await open(q);
  const c11 = await q.evaluate(async () => { go('workshop'); await new Promise(r => setTimeout(r, 900)); return { state: (document.getElementById('pgState') || {}).textContent || '', keys: [...document.querySelectorAll('#pgKeys button')].map(x => x.textContent),
    note: (document.getElementById('pgNote') || {}).textContent || '' }; });
  ok(/In the computer app, a changed page takes the place/.test(c11.state) && c11.keys.join('|') === 'Download the page from Code, whole' && /in a browser/.test(c11.note), 'in a browser, the card says how to keep a changed page', c11);
  ok(errs2.length === 0, 'no page errors in a browser', errs2);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
