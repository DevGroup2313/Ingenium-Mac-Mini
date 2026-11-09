// node rig/t_702_career_reading.js <Ingenium page url> <out dir>
// 6.9.2: the Career Studio's reading list (modules/r188.js), in Chromium, with a stand-in model and stand-ins for the web
// search and the page fetch (nothing goes online). Her words (31 October 2026): "I want to be able to use it for PhD
// applications and for job applications." So each application keeps what to read for it: a supervisor's work, the
// programme's pages, the call. Kept from Look it up online, added to Fontes, fetched on press, read by the reading page as a
// document; what it found stands under the item and, as MY READING NOTES, beside the profile when the studio writes.
//   - Keep to read on a result found online; the reading list in What you send; its status; Add to Fontes; Fetch its text;
//   - Read it with the reading page: a doc run tied to the application, its analysis shown under the item, the item read;
//   - the request to write a statement carries MY READING NOTES; the application removed takes the reading and its run with it;
//   - nothing fetched online; every part ran; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const POST = 'DPhil in History of Science\nUniversity of Exampleton\nApplicants must submit a CV and a statement of purpose of no more than 1,000 words.\nThe closing date is 30 November 2026.\n' + 'x'.repeat(40);
const PAGE = 'Field Notebooks and the Making of Method\nBy Charles Babbage\n' + 'The notebooks of the 1850s show how observation was written down before it was argued. '.repeat(12) + 'The archive holds 312 letters.';
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const outside = []; p.on('request', r => { const u = r.url(); if (/^https?:/.test(u) && !/^https?:\/\/(127\.0\.0\.1|localhost)/.test(u)) outside.push(u); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  const press = async (text, within) => { const hit = await p.evaluate(([text, within]) => { const root = document.querySelector(within || '#cs') || document;
      const k = [...root.querySelectorAll('button')].find(x => x.offsetParent && !x.disabled && (x.textContent.trim() === text || (x.querySelector('b') && x.querySelector('b').textContent.trim() === text)));
      if (!k) return false; k.click(); return true; }, [text, within || null]); if (!hit) throw new Error('no key: ' + text); await p.waitForTimeout(350); };
  const idle = () => p.waitForFunction(() => !IngCareer.run.busy, null, { timeout: 60000 });
  await p.evaluate(PAGE => {
    const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^mfake/.test(m.id));
    state.models.push({ id: 'mfake12', customName: 'Stand-in 12B', fileState: 'ready', fileName: L['gemma-4-12b'].file, stored: true }); saveState();
    window.__asked = []; window.__net = [];
    lxAsk = function (run, msgs, max, temp, onPiece) { const u = msgs[msgs.length - 1].content; window.__asked.push(u.slice(0, 6000)); let out = 'Nothing.';
      if (/--- PART START ---/.test(u)) out = 'Main points:\n- Observation was written down before it was argued.\nEvidence, data and sources:\n- The notebooks of the 1850s; an archive of 312 letters.\nNames, dates and numbers:\n- Charles Babbage; 1850s; 312 letters.\nQuestions or gaps:\n- nothing here';
      else if (/Write the section "/.test(u)) { const s = /Write the section "([^"]+)"/.exec(u)[1]; out = s === 'In brief' ? 'The piece argues that field notebooks made method: observation was written before it was argued.' : 'For ' + s + ': the notebooks of the 1850s and an archive of 312 letters.'; }
      else if (/^Write my statement of purpose/.test(u)) out = 'My research asks how field notebooks shaped method.\n\nAt Oxford I read the archives of the Museum.';
      else if (/^Below is the draft of my/.test(u)) out = (u.split('THE DRAFT:\n')[1] || '');
      if (onPiece) onPiece(out); return Promise.resolve(out); };
    window.webSearch = function (q, n) { window.__net.push('search:' + q); return Promise.resolve([{ title: 'Field Notebooks and the Making of Method', url: 'https://example.org/babbage/notebooks', snippet: 'On method in the 1850s.' }, { title: 'The Faculty of History', url: 'https://example.org/history', snippet: 'The programme.' }]); };
    window.fetchPageText = function (url, limit) { window.__net.push('fetch:' + url); return Promise.resolve(PAGE); };
    const P = IngCareer.state().profile; P.name = 'Ada Lovelace'; P.items.push({ id: 'i1', sec: 'education', title: 'MSt in History', place: 'Oxford', from: '2020', to: '2021', text: 'Dissertation on the archives of the Museum.', src: 'me' }); saveState(); }, PAGE);
  const id = await p.evaluate(post => IngCareer.newOpp('phd', post, 'pasted').then(o => { o.step = 'post'; saveState(); const S = IngCareer.state(); S.ui.room = 'apps'; S.ui.open = o.id; S.ui.show = 'work'; go('career'); IngCareer.render(); return o.id; }), POST);
  await p.waitForTimeout(500);
  // Keep to read, from what Look it up online found
  await press('Look it up online', '#cs .c-work .c-pn-f'); await p.waitForTimeout(500);
  const web = await p.evaluate(() => ({ n: document.querySelectorAll('#cs .c-web li').length, keys: [...document.querySelectorAll('#cs .c-web li .c-btn')].map(x => x.textContent), net: window.__net }));
  ok(web.n === 2 && web.keys.join('|') === 'Keep to read|Keep to read' && web.net.join('|') === 'search:University of Exampleton DPhil in History of Science', 'each result found online has a Keep to read key (the search ran only on her press)', web);
  await p.evaluate(() => document.querySelector('#cs .c-web li .c-btn').click()); await p.waitForTimeout(500);
  const kept = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); return { r: o.reading.map(x => [x.title, x.url, x.kind, x.status]), chip: (document.querySelector('#cs .c-web li .c-chip') || {}).textContent }; }, id);
  ok(kept.r.length === 1 && kept.r[0][0] === 'Field Notebooks and the Making of Method' && kept.r[0][3] === 'toread' && kept.chip === 'On your reading list', 'Keep to read keeps it on the reading list, to read, and the result says so', kept);
  const twice = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); const r = IngCareer.keepToRead(o, { title: 'Field Notebooks and the Making of Method', url: 'https://example.org/babbage/notebooks', kind: 'other' }); return { r, n: o.reading.length, toast: (document.getElementById('ingToast') || {}).textContent }; }, id);
  ok(twice.r === null && twice.n === 1 && /on the reading list already/.test(twice.toast || ''), 'kept again by its address, it is not kept twice', twice);
  // the reading list in What you send
  await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); o.step = 'send'; o.sv = { kind: 'reading' }; IngCareer.render(); }, id); await p.waitForTimeout(300);
  const pane = await p.evaluate(() => ({ h3: (document.querySelector('#cs .c-pane .c-h3') || {}).textContent, nav: [...document.querySelectorAll('#cs .c-nav .c-item')].filter(x => x.getAttribute('aria-current') === 'true').map(x => x.querySelector('b').textContent), keys: [...document.querySelectorAll('#cs .c-ref .c-keyrow .c-btn')].map(x => x.textContent), seg: [...document.querySelectorAll('#cs .c-ref .c-seg button')].map(x => x.textContent + ':' + x.getAttribute('aria-pressed')) }));
  ok(pane.h3 === 'Your reading list' && pane.nav.join() === 'Your reading list' && pane.keys.join('|') === 'Add to Fontes|Fetch its text|Remove' && pane.seg.join('|') === 'To read:true|Reading:false|Read:false', 'the reading list is a pane of What you send, each piece with its status, Add to Fontes, Fetch its text and Remove', pane);
  await p.evaluate(() => [...document.querySelectorAll('#cs .c-ref .c-seg button')].find(x => x.textContent === 'Reading').click()); await p.waitForTimeout(200);
  ok(await p.evaluate(id => IngCareer.state().opps.find(x => x.id === id).reading[0].status === 'reading', id), 'its status is hers to set');
  await p.evaluate(id => { const it = IngCareer.state().opps.find(x => x.id === id).reading[0]; it.by = 'Charles Babbage'; saveState(); IngCareer.render(); }, id); await p.waitForTimeout(200);
  await press('Add to Fontes', '#cs .c-ref');
  const fon = await p.evaluate(id => { const it = IngCareer.state().opps.find(x => x.id === id).reading[0], f = fontesItems().find(c => c.title === 'Field Notebooks and the Making of Method'); return { id: it.fontesId, f: f && [f.type, f.URL, f.author && f.author[0].literal, f.id] }; }, id);
  ok(fon.f && fon.f[0] === 'webpage' && fon.f[1] === 'https://example.org/babbage/notebooks' && fon.f[2] === 'Charles Babbage' && fon.id === fon.f[3], 'Add to Fontes keeps it among her sources, by title, author and address, and the item remembers it', fon);
  await press('Fetch its text', '#cs .c-ref'); await p.waitForFunction(id => !!IngCareer.state().opps.find(x => x.id === id).reading[0].ref, id, { timeout: 20000 }); await p.waitForTimeout(300);
  const fe = await p.evaluate(id => { const it = IngCareer.state().opps.find(x => x.id === id).reading[0]; return { ref: !!it.ref, chars: it.chars, net: window.__net, keys: [...document.querySelectorAll('#cs .c-ref .c-keyrow .c-btn')].map(x => x.textContent) }; }, id);
  ok(fe.ref && fe.chars > 800 && fe.net[1] === 'fetch:https://example.org/babbage/notebooks' && fe.keys.includes('Read it with the reading page'), 'Fetch its text fetches the page only on her press and keeps its text; Read it with the reading page is offered', fe);
  // read by the reading page
  await press('Read it with the reading page', '#cs .c-ref');
  await p.waitForFunction(id => { const it = IngCareer.state().opps.find(x => x.id === id).reading[0]; const r = it.runId && lxRun(it.runId); return r && r.status === 'done' && it.status === 'read'; }, id, { timeout: 60000 }); await p.waitForTimeout(600);
  const run = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id), it = o.reading[0], r = lxRun(it.runId); return { kind: r.kind, career: r.career === o.id, name: r.name, parts: r.total, status: it.status, read: !!it.readAt, an: (document.querySelector('#cs .c-an') || {}).innerText || '', notes: window.__asked.filter(u => /--- PART START ---/.test(u)).length, secs: window.__asked.filter(u => /Write the section "/.test(u)).length, meta: [...document.querySelectorAll('#cs .c-ref small')].map(x => x.textContent).join(' ') }; }, id);
  ok(run.kind === 'doc' && run.career && run.name === 'Field Notebooks and the Making of Method' && run.parts >= 1 && run.notes >= 1 && run.secs === 6, 'the reading page read it as a document tied to the application: its parts noted, the six sections of the analysis written', run);
  ok(run.status === 'read' && run.read && /In brief/.test(run.an) && /observation was written before it was argued/.test(run.an) && /read by the reading page/.test(run.meta), 'what it found stands under the item, and the item is marked read', { an: run.an.slice(0, 160), meta: run.meta });
  await p.screenshot({ path: OUT + '/reading.png' });
  const notes = await p.evaluate(id => IngCareer.readingNotes(IngCareer.state().opps.find(x => x.id === id)), id);
  ok(notes.length === 1 && notes[0].title === 'Field Notebooks and the Making of Method, Charles Babbage' && /\(In brief\)/.test(notes[0].text) && /\(Main points\)/.test(notes[0].text), 'the reading notes for the prompts: the piece, its author, and what was found', notes);
  await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); o.way = 'auto'; IngCareer.write(o, 'purpose'); }, id); await idle(); await p.waitForTimeout(500);
  const u = await p.evaluate(() => window.__asked.find(x => /^Write my statement of purpose/.test(x)) || '');
  ok(/MY READING NOTES \(what the reading page found in works I read for this application: take from them only what they say, never as facts about me\):\n### Field Notebooks and the Making of Method, Charles Babbage\n\(In brief\)/.test(u) && /THE PROFILE \(the only source of facts about me\)/.test(u), 'the request to write the statement carries MY READING NOTES beside the profile', u.slice(u.indexOf('MY READING NOTES'), u.indexOf('MY READING NOTES') + 200));
  // finished in the reading page itself, or paused there: the item follows its run
  const follow = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id), it = o.reading[0], run = lxRun(it.runId); delete it.readAt; it.status = 'reading'; o.sv = { kind: 'reading' }; o.step = 'send'; IngCareer.render();
    const a = { status: it.status, read: !!it.readAt }; run.status = 'paused'; delete it.readAt; it.status = 'reading'; IngCareer.render();
    const b = { keys: [...document.querySelectorAll('#cs .c-ref .c-keyrow .c-btn')].map(x => x.textContent), meta: [...document.querySelectorAll('#cs .c-ref small')].map(x => x.textContent).join(' ') };
    run.status = 'done'; IngCareer.render(); return { a, b, c: it.status }; }, id);
  ok(follow.a.status === 'read' && follow.a.read && follow.b.keys.includes('Carry on reading') && /the reading is paused \(\d+ of \d+ parts\)/.test(follow.b.meta) && follow.c === 'read', 'the item follows its run: read to its end in the reading page itself, it is read here; paused, it offers Carry on reading', follow);
  // the application removed takes its reading and the run with it
  const refs = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); return { ref: o.reading[0].ref, run: o.reading[0].runId, inRefs: IngCareer.oppRefs(o).includes(o.reading[0].ref) && IngCareer.refsOfPerson(IngCareer.root().people[0]).includes(o.reading[0].ref) }; }, id);
  ok(refs.inRefs, "the fetched text is among the application's and the profile's references, so nothing sweeps it away", refs);
  await p.evaluate(id => IngCareer.removeOpp(IngCareer.state().opps.find(x => x.id === id)), id); await p.waitForTimeout(300);
  const gone = await p.evaluate(refs => Promise.all([IngBig.load(refs.ref), Promise.resolve(lxRun(refs.run))]).then(r => ({ text: r[0], run: r[1] })), refs);
  ok(gone.text == null && gone.run == null, 'removed, its text and the reading page\'s run go with it', gone);
  // a profile removed takes the readings its reading lists made
  const rp = await p.evaluate(async () => { const meId = IngCareer.root().cur; await IngCareer.newPerson('other', 'Alex Rivera', ''); const o = await IngCareer.newOpp('phd', 'A programme\nA university\nApply with a statement.\nThe closing date is 1 December 2026.\n' + 'z'.repeat(60), 'pasted');
    const run = { id: 'lx_fake_career', name: 'A piece', kind: 'doc', status: 'done', done: 1, total: 1, partsRef: null, notesRef: null, mergeRef: null, analysisRef: null, writings: {}, career: o.id, created: Date.now(), updated: Date.now() };
    lxState().runs.unshift(run); o.reading = [{ id: 'rdx', title: 'A piece', status: 'read', runId: run.id }]; saveState();
    const alex = IngCareer.root().people.find(x => x.profile.name === 'Alex Rivera'); IngCareer.switchTo(meId); IngCareer.removePerson(alex);
    /* 6.11.1: the question is Ingenium's own dialog: its Yes key */
    await new Promise(r => setTimeout(r, 300)); const yes = [...document.querySelectorAll('.ing-dlg-root .ing-ask-keys .btn, #modalBox .ing-ask-keys .btn')].pop(); if (yes) yes.click(); await new Promise(r => setTimeout(r, 600));
    return { people: IngCareer.root().people.length, run: !!lxRun('lx_fake_career') }; });
  ok(rp.people === 1 && !rp.run, 'a profile removed takes the readings its reading lists made', rp);
  ok(outside.length === 0, 'nothing was searched or fetched online (the stand-ins answered)', outside.slice(0, 3));
  ok(await p.evaluate(() => Object.keys(window.__ingParts).every(k => window.__ingParts[k] === 'running')), 'every part of the page ran to its end');
  ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
