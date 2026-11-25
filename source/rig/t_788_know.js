// Ingenium 7.88: what Ingenium knows (modules/r390.js), stage 1 of the recommendations she approved on 25 November 2026: one store, her
// facts first, learning that asks first, folders brought up to date with Undo, the facts used in chats, a card in each app's folder and the
// whole of it in Settings, Memory. No model is asked.
//   node rig/t_788_know.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage(); p.setDefaultTimeout(120000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngKnow && window.IngFolders, null, { timeout: 600000 }); await sleep(2500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const app = await p.evaluate(() => { const A = IngFolders.folders(); const cd = A.find(x => /carpe diem/i.test(x.name)) || A[0]; return { name: cd.name, id: cd.id, n: A.length }; });
  // 1. her facts come first, from what she said (r386, r387)
  const f1 = await p.evaluate(n => IngKnow.of(IngKnow.appKey(n)).map(f => ({ t: f.t, k: f.src.k, st: f.st })), app.name);
  ok(f1.length >= 1 && f1[0].k === 'her' && f1[0].st === 'kept', 'her own fact about the app is in the store, first, as hers', f1);
  // 2. the app's folder shows it, with the links and the timeline
  await p.evaluate(id => { go('folders'); state.folders.ui.open = id; IngFolders.paint(); }, app.id); await sleep(1200);
  const c1 = await p.evaluate(() => { const c = document.getElementById('knFolder'); return c ? { title: (c.querySelector('h3,h2,.fld-card-h,b') || {}).textContent, rows: [...c.querySelectorAll('.kn-row')].map(r => r.className + '|' + r.querySelector('b').textContent), links: [...c.querySelectorAll('.kn-chip')].map(x => x.textContent) } : null; });
  ok(c1 && c1.rows.length >= 1 && /her/.test(c1.rows[0]) && c1.links.some(l => /conversation/.test(l)), "the app's folder: What Ingenium knows about it, her fact first, its links", c1);
  await p.screenshot({ path: OUT + '/folder.png', fullPage: false });
  // 3. a fact in her words, added in the folder
  await p.evaluate(() => { const c = document.getElementById('knFolder'); const i = c.querySelector('.kn-in'); i.value = 'Its timer keeps sessions in Vesta.'; [...c.querySelectorAll('button')].find(b => b.textContent === 'Add a fact').click(); }); await sleep(600);
  const f3 = await p.evaluate(n => IngKnow.of(IngKnow.appKey(n)).find(f => /sessions in Vesta/.test(f.t)), app.name);
  ok(f3 && f3.st === 'kept' && f3.src.k === 'her', 'a fact added in her words is kept at once, as hers', f3);
  // 4. learning asks first (the store has seen the folder once, as it does when Ingenium opens): a new decision in the folder's notes waits; Keep keeps it; Not this is not suggested again
  const f4 = await p.evaluate(id => { const P = IngFolders.folders().find(x => x.id === id); IngKnow.learn(); P.app.decisions = (P.app.decisions || []).concat(['Exports go to PDF and Word.', 'Keep the dark theme.']); IngKnow.learn(); const W1 = IngKnow.waiting().map(f => ({ id: f.id, t: f.t, k: f.src.k }));
    const a = W1.find(f => /PDF/.test(f.t)), c = W1.find(f => /dark theme/.test(f.t)); if (a) IngKnow.keep(a.id); if (c) IngKnow.drop(c.id); IngKnow.learn(); return { W1, after: IngKnow.waiting().length, kept: !!IngKnow.of(IngKnow.appKey(P.name), 'kept').find(f => /PDF/.test(f.t)), again: !!IngKnow.add(IngKnow.appKey(P.name), 'Keep the dark theme.', { k: 'folder' }) }; }, app.id);
  ok(f4.W1.length === 2 && f4.W1.every(f => f.k === 'folder') && f4.kept && f4.after === 0 && !f4.again, "a new decision waits for her; kept, it is kept; left out, it is not suggested again", f4);
  // 5. a fact that names a system hers do not is shown as disagreeing with hers
  const f5 = await p.evaluate(n => { const f = IngKnow.add(IngKnow.appKey(n), n + ' is a Windows app.', { k: 'folder', label: 'its summary' }); return f ? { st: f.st, clash: f.clash || null } : null; }, app.name);
  ok(f5 && f5.st === 'waiting' && /all devices/.test(f5.clash || ''), 'a fact that calls it a Windows app waits, shown as disagreeing with what she said', f5);
  // 6. a chat draws the facts that fit, and says so under the reply
  const f6 = await p.evaluate(async n => { go('chat'); await new Promise(r => setTimeout(r, 500)); const ms = curMsgs(); ms.length = 0; ms.push({ role: 'me', text: 'Which devices does ' + n + ' run on, and where do its exports go?' }); const live = { role: 'bot', live: true, text: '' }; ms.push(live);
    const block = memLayer(6000) || ''; live.live = false; live.text = 'It runs on all your devices.'; renderChat(); await new Promise(r => setTimeout(r, 600));
    return { has: /What Ingenium knows/.test(block), all: /all devices/.test(block), pdf: /PDF/.test(block), ids: (live.know || []).length, used: (document.querySelector('#chatScroll .kn-used') || {}).textContent || '' }; }, app.name);
  ok(f6.has && f6.all && f6.pdf && f6.ids >= 2 && /Used \d+ facts? Ingenium knows/.test(f6.used), 'a chat about the app draws its facts (hers first), and the reply says how many it used', f6);
  // 7. a chat in the app's folder starts from all of its facts
  const f7 = await p.evaluate(id => { const P = IngFolders.folders().find(x => x.id === id); return IngFolderFab.lines(P); }, app.id);
  ok(/What Ingenium knows about/.test(f7) && /all devices/.test(f7) && /\(mine\)/.test(f7), "a chat in the app's folder starts from all its kept facts, hers marked", f7.slice(0, 300));
  // 8. a folder brought up to date by itself can be undone
  const f8 = await p.evaluate(id => { const P = IngFolders.folders().find(x => x.id === id), K = IngKnow.store(); P.app.brief = 'Old notes.'; K.undo[P.id] = { brief: 'Old notes.', decisions: [], open: [], briefAt: 0, at: Date.now(), done: true, doneAt: Date.now() }; P.app.brief = 'New notes written by itself.'; IngKnow.undo(P); return { brief: P.app.brief, left: !!K.undo[P.id] }; }, app.id);
  ok(f8.brief === 'Old notes.' && !f8.left, 'Undo puts back the notes as they were before it brought the folder up to date by itself', f8);
  // 9. Settings, Memory: the whole of it
  await p.evaluate(() => { try { IngChatMemory.open(); } catch (e) {} }); await sleep(1500);
  const f9 = await p.evaluate(() => { const c = document.getElementById('knRoom'); if (!c) return null; const fi = c.querySelector('#knFind'); fi.value = 'PDF'; fi.dispatchEvent(new Event('input')); return { chips: [...c.querySelectorAll('.kn-chip')].map(x => x.textContent), wait: c.querySelectorAll('.kn-row.wait').length, found: [...c.querySelectorAll('#knFind ~ .kn-list .kn-row b')].map(b => b.textContent), opts: ['learn', 'ask', 'auto'].map(k => !!document.getElementById('knOpt-' + k)) }; });
  ok(f9 && f9.chips.some(t => /facts/.test(t)) && f9.wait >= 1 && f9.found.some(t => /PDF/.test(t)) && f9.opts.every(Boolean), 'Settings, Memory: what waits, Find a fact, each app, and the three switches', f9);
  await p.screenshot({ path: OUT + '/memory.png' });
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
