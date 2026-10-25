// R115: the academic safeguards. Every search labelled (with or without the scholarly indexes), Journal articles and scholarly books only,
// Fontes as a reference database (find, collections, notes, a file brought in), and Lector citing her sources.
// The indexes and the web are stand-ins here, so what Ingenium itself does can be checked without the network.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  const parts = await p.evaluate(() => window.__ingParts);
  ok(parts.p46 === 'running' && parts.p44 === 'running' && parts.p45 === 'running', 'the academic part (p46) and Fabrica (p44, p45) run', JSON.stringify(parts).slice(0, 200));

  // ---- stand-ins for the indexes and the web ----
  await p.evaluate(() => {
    window.__sch = { journal: { kind: 'scholarly', index: 'OpenAlex', title: 'Attention restoration and the design of calm interfaces', authors: ['Ada Lovelace', 'Grace Hopper'], year: 2021, venue: 'Journal of Calm Computing', venueType: 'journal', type: 'article', doi: '10.1000/calm.2021.1', doaj: true, cites: 12, abstract: 'A study of calm interfaces.' },
      preprint: { kind: 'scholarly', index: 'arXiv', title: 'A preprint on planners for autistic adults', authors: ['Alan Turing'], year: 2024, venue: 'arXiv', type: 'article', preprint: true, url: 'https://arxiv.org/abs/2401.00001', abstract: 'A preprint.' },
      book: { kind: 'scholarly', index: 'Crossref', title: 'Designing for neurodivergent minds', authors: ['Temple Grandin'], year: 2019, type: 'book', doi: '10.1000/book.2019', abstract: 'A book.' } };
    window.__webHits = [{ title: 'Calm design, a blog post', url: 'https://example.com/calm', snippet: 'A blog.' }, { title: 'Attention (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Attention', snippet: 'An encyclopaedia.' }, { title: 'A university page on focus', url: 'https://www.ox.ac.uk/focus', snippet: 'A university.' }];
    window.__schCalls = 0; window.__webCalls = 0;
    scholarSearch = function (q, n) { window.__schCalls++; const s = window.__sch; const out = [s.journal, s.preprint, s.book].map(x => Object.assign({}, x)); out.forEach(schVet); return Promise.resolve(out); };
    webSearch = function (q, n) { window.__webCalls++; return Promise.resolve(window.__webHits.map(x => Object.assign({}, x))); };
    fetchPageText = function () { return Promise.resolve(''); };
    window.__bot = () => ({ role: 'bot', text: '', status: '' });
  });

  // 1. the scholarly indexes off: the web search alone still goes through the vetting, each source checked and labelled
  const web = await p.evaluate(async () => { state.search = state.search || {}; state.search.scholar = false; state.search.peerOnly = false; const bot = window.__bot();
    const r = await webAugment({ text: 'how does a calm interface help attention?', web: 'search' }, bot); return { status: bot.status, n: r.sources.length, kinds: r.sources.map(x => x.kind + ':' + x.vet.trust + ':' + x.vet.checks[0]), ctx: r.context.slice(0, 260), sch: window.__schCalls, web: window.__webCalls }; });
  ok(web.sch === 0 && web.web === 1 && web.n === 3, 'with the indexes off, only the web is searched, and the reply still gets vetted sources', JSON.stringify(web));
  ok(/each source is labelled by its kind/.test(web.status), 'the status says each source is labelled by its kind (6.7: a web page is labelled by its address, not checked)', web.status);
  ok(web.kinds.every(k => /^web:/.test(k)) && web.kinds.some(k => /Encyclopaedia/.test(k)) && web.kinds.some(k => /Website \(unvetted\)/.test(k)), 'every web source carries its label and trust (encyclopaedia, university, unvetted site)', web.kinds.join(' | '));
  ok(/gathered by Ingenium on \d{4}-\d{2}-\d{2}/.test(web.ctx) && /a web page by its address only/.test(web.ctx), 'the context tells the model when the sources were gathered and what was checked of each (6.7: a web page is labelled by its address, not vetted)', web.ctx);

  // 2. the indexes on: scholarly first, then the best web sources
  const both = await p.evaluate(async () => { state.search.scholar = true; const bot = window.__bot(); const r = await webAugment({ text: 'calm interfaces', web: 'search' }, bot);
    return { status: bot.status, order: r.sources.map(x => (x.kind === 'scholarly' ? 'S' : 'W') + ':' + x.vet.trust), preprint: r.sources.find(x => x.preprint).vet.checks[0] }; });
  ok(both.order.length === 6 && both.order.slice(0, 3).every(x => /^S/.test(x)), 'with the indexes on, the three scholarly records come first, then three web sources', both.order.join(' '));
  ok(/^Preprint: not peer-reviewed/.test(both.preprint), 'a preprint is named as such', both.preprint);

  // 3. Peer-reviewed only: the journal article alone; the preprint, the book and the web go
  const peer = await p.evaluate(async () => { state.search.peerOnly = true; const bot = window.__bot(); const r = await webAugment({ text: 'calm interfaces', web: 'search' }, bot);
    return { n: r.sources.length, titles: r.sources.map(x => x.title), checks: r.sources[0].vet.checks.join('; ') }; });
  ok(peer.n === 2 && /Attention restoration/.test(peer.titles[0]) && /Designing for neurodivergent/.test(peer.titles[1]), 'Peer-reviewed only keeps the journal article and the scholarly book; the preprint and the web pages go', JSON.stringify(peer.titles));
  ok(/peer review confirmed \(journal listed in DOAJ\)/.test(peer.checks), 'and its checks say peer review is confirmed through DOAJ', peer.checks);
  const none = await p.evaluate(async () => { const keep = window.__sch.journal, keepB = window.__sch.book; window.__sch.journal = window.__sch.preprint; window.__sch.book = window.__sch.preprint; try { await webAugment({ text: 'calm interfaces', web: 'search' }, window.__bot()); return 'no error'; } catch (e) { return e.message; } finally { window.__sch.journal = keep; window.__sch.book = keepB; } });
  ok(/no journal article or scholarly book was found/.test(none) && /switch Journal articles and scholarly books only off/.test(none), 'when no journal article or scholarly book is found, the reply says so and names the switch (called Peer-reviewed only until 6.7)', none);
  await p.evaluate(() => { state.search.peerOnly = false; saveState(); });

  // 4. the switch in Settings: on turns the scholarly indexes on as well
  await p.evaluate(() => go('settings')); await p.waitForTimeout(600);
  const sw = await p.evaluate(() => { const c = document.getElementById('srchPeer'), s = document.getElementById('srchScholar'); if (s) { s.checked = false; state.search.scholar = false; } c.checked = true; c.dispatchEvent(new Event('change')); return { peer: state.search.peerOnly, scholar: state.search.scholar, schChecked: s ? s.checked : null, text: (c.closest('.sch-set') || c.parentNode.parentNode).textContent.slice(0, 80) }; });
  ok(sw.peer === true && sw.scholar === true && sw.schChecked !== false, 'the Journal articles and scholarly books only switch in Settings turns the scholarly indexes on with it', JSON.stringify(sw));
  await p.evaluate(() => { const c = document.getElementById('srchPeer'); c.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/acad-settings.png' });
  await p.evaluate(() => { const c = document.getElementById('srchPeer'); c.checked = false; c.dispatchEvent(new Event('change')); });

  // 5. Fontes as a database: add three sources, find, collections, a note, a .bib brought in
  await p.evaluate(() => { const st = fontesState(); st.items = [];
    fontesAdd([{ id: 'doi:10.1000/calm.2021.1', type: 'article-journal', title: 'Attention restoration and the design of calm interfaces', author: [{ family: 'Lovelace', given: 'Ada' }, { family: 'Hopper', given: 'Grace' }], issued: { 'date-parts': [[2021]] }, 'container-title': 'Journal of Calm Computing', DOI: '10.1000/calm.2021.1' },
      { id: 'doi:10.1000/book.2019', type: 'book', title: 'Designing for neurodivergent minds', author: [{ family: 'Grandin', given: 'Temple' }], issued: { 'date-parts': [[2019]] }, publisher: 'Calm Press' },
      { id: 'ing:webcalm', type: 'webpage', title: 'Calm design, a blog post', 'container-title': 'example.com', URL: 'https://example.com/calm', accessed: { 'date-parts': [[2026, 10, 17]] } }]); saveState(); go('chat'); });
  await p.waitForTimeout(400);
  await p.evaluate(() => openFontes()); await p.waitForTimeout(1500);
  const room = await p.evaluate(() => ({ count: document.getElementById('foCount').textContent, rows: document.querySelectorAll('#foList .fo-row').length, peer: document.querySelectorAll('#foList .fo-tag.peer').length, peerWords: [...document.querySelectorAll('#foList .fo-tag.peer')].map(t => t.textContent).join('|'), find: !!document.getElementById('foFind'), coll: !!document.getElementById('foColl'), file: !!document.getElementById('foFile') }));
  ok(room.rows === 3 && /3 sources · 1 journal article · 1 book or chapter · 1 web page/.test(room.count), 'the room counts the sources by kind', room.count);
  ok(room.peer === 1 && room.peerWords === 'Journal article' && room.find && room.coll && room.file, 'one source is tagged Journal article (6.7: not called peer-reviewed, which is not checked); find, collection and file keys are there', JSON.stringify(room));
  await p.fill('#foFind', 'grandin'); await p.waitForTimeout(900);
  const found = await p.evaluate(() => ({ rows: document.querySelectorAll('#foList .fo-row').length, text: document.getElementById('foList').textContent.slice(0, 120), count: document.getElementById('foCount').textContent }));
  ok(found.rows === 1 && /Grandin/.test(found.text) && /1 shown/.test(found.count), 'find narrows the list to the matching source', JSON.stringify(found));
  await p.fill('#foFind', ''); await p.waitForTimeout(900);
  // a collection, made with the ticked sources going into it
  await p.evaluate(() => { window.prompt = () => 'DPhil chapter 2'; const cbs = document.querySelectorAll('#foList .fo-row input'); cbs[0].checked = true; cbs[1].checked = true; document.getElementById('foNewColl').click(); }); await p.waitForTimeout(900);
  const coll = await p.evaluate(() => ({ colls: state.fontes.colls, inColl: fontesItems().filter(c => c.ingColl === 'DPhil chapter 2').length, sel: document.getElementById('foColl').value, rows: document.querySelectorAll('#foList .fo-row').length, options: [...document.getElementById('foColl').options].map(o => o.textContent) }));
  ok(coll.colls.length === 1 && coll.inColl === 2 && coll.sel === 'DPhil chapter 2' && coll.rows === 2, 'a collection is made from the ticked sources and the view moves to it', JSON.stringify(coll));
  // a note on a source
  await p.evaluate(() => { const k = [...document.querySelectorAll('#foList .fo-k')].find(x => /Note/.test(x.textContent)); k.click(); const ta = document.querySelector('#foList .fo-note-in'); ta.value = 'The key study for chapter 2: restoration after 20 minutes.'; ta.dispatchEvent(new Event('change')); }); await p.waitForTimeout(300);
  const note = await p.evaluate(() => ({ saved: fontesItems().filter(c => /restoration after 20 minutes/.test(c.ingNote || '')).length, shown: /restoration after 20 minutes/.test(document.getElementById('foList').textContent) }));
  ok(note.saved === 1 && note.shown, 'a note is kept on the source and shown under it', JSON.stringify(note));
  // a whole .bib brought in, into the open collection
  await p.evaluate(() => { const orig = document.createElement; window.__fileInput = null; document.createElement = function (t) { const e = orig.call(document, t); if (t === 'input') window.__fileInput = e; return e; }; document.getElementById('foFile').click(); document.createElement = orig; });
  const bib = '@article{smith2020,\n  title={Sustained attention in autistic adults: a review},\n  author={Smith, Jane and Doe, John},\n  journal={Autism Research},\n  year={2020},\n  volume={13},\n  doi={10.1000/autres.2020.13}\n}\n@book{kahneman2011,\n  title={Thinking, Fast and Slow},\n  author={Kahneman, Daniel},\n  publisher={Farrar, Straus and Giroux},\n  year={2011}\n}\n';
  const inputs = await p.$$('input[type=file]'); const fi = inputs[inputs.length - 1];
  await fi.setInputFiles({ name: 'chapter2.bib', mimeType: 'application/x-bibtex', buffer: Buffer.from(bib) }); await p.waitForTimeout(2500);
  const brought = await p.evaluate(() => ({ note: document.getElementById('foNote').textContent, n: fontesItems().length, inColl: fontesItems().filter(c => c.ingColl === 'DPhil chapter 2').length, titles: fontesItems().map(c => c.title), rows: document.querySelectorAll('#foList .fo-row').length, peer: document.querySelectorAll('#foList .fo-tag.peer').length }));
  ok(brought.n === 5 && /2 brought in/.test(brought.note), 'a .bib file brings its two sources in', JSON.stringify(brought).slice(0, 300));
  ok(brought.inColl === 4 && brought.rows === 4 && brought.peer === 2, 'they join the open collection; the review article is tagged peer-reviewed', JSON.stringify({ inColl: brought.inColl, rows: brought.rows, peer: brought.peer }));
  await p.screenshot({ path: OUT + '/acad-fontes.png' });
  await p.evaluate(() => { document.getElementById('foColl').value = ''; document.getElementById('foColl').dispatchEvent(new Event('change')); }); await p.waitForTimeout(900);
  await p.screenshot({ path: OUT + '/acad-fontes-all.png' });
  await p.evaluate(() => closeModal());

  // 6. Lector cites her sources: the stand-in writer cites [1] and [4]; the document ends with those two references and nothing else
  await p.evaluate(async () => {
    const page = '<!doctype html><html><head><meta charset="utf-8"><title>Carpe Diem</title></head><body><h1>Carpe Diem</h1><p>A day planner.</p><script>function a(){}</script></body></html>';
    const u8 = new TextEncoder().encode(page); await libPut('lib-cd-ac', u8, page);
    libState().apps.cd = { ref: 'lib-cd-ac', sha256: 'sha-cd-ac', version: '1051', title: 'carpe_diem.html', name: 'carpe_diem.html', size: u8.length, at: Date.now() };
    const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^mfake/.test(m.id));
    state.models.push({ id: 'mfake12', customName: 'Stand-in 12B', fileState: 'ready', fileName: L['gemma-4-12b'].file, stored: true });
    const an = {}; ['In brief', 'Purpose and the person it serves', 'What it does', 'Design for focus and well-being', 'How it is built', 'Research and scholarly value', 'Skills it shows', 'How it was made', 'Limits and next steps'].forEach(k => an[k] = k + ': Carpe Diem is a day planner of 2,480 lines with 31 named functions, made alone over 14 months.');
    const run = { id: 'lx_ac', name: 'Carpe Diem', app: 'cd', sha: 'sha-cd-ac', version: '1051', file: 'carpe_diem.html', kind: 'app', depth: 'overview', modelId: 'mfake12', created: Date.now() - 5000, updated: Date.now() - 1000, finished: Date.now() - 1000, status: 'done', done: 3, total: 3,
      facts: { title: 'Carpe Diem', chars: 182400, jsChars: 91000, functions: 31, headings: 12, sayings: 240, comments: 18, lines: 2480 }, partsRef: 'lx_ac_parts', notesRef: 'lx_ac_notes', mergeRef: 'lx_ac_merge', analysisRef: 'lx_ac_an', writings: {} };
    await IngBig.put('lx_ac_parts', JSON.stringify([{ i: 0 }, { i: 1 }, { i: 2 }])); await IngBig.put('lx_ac_notes', JSON.stringify(['a', 'b', 'c'])); await IngBig.put('lx_ac_an', JSON.stringify(an));
    const s = lxState(); s.runs = s.runs.filter(r => !/^lx_/.test(r.id)); s.runs.unshift(run); saveState();
    window.__asks = [];
    lxAsk = function (run, msgs, maxTok, temp, onPiece) { const sys = msgs[0].content, u = msgs[1].content; const m = u.match(/HER SOURCES[\s\S]*?(?=\n\n[A-Z]{3,}|$)/); window.__asks.push({ examiner: /examiner of a draft/.test(sys), sources: m ? m[0].slice(0, 1600) : null, rule7: /\[n\]|source/.test(sys) });
      let out; if (/examiner of a draft/.test(sys)) { out = (u.split('THE DRAFT:\n')[1] || ''); }
      else out = 'Carpe Diem is a day planner of 2,480 lines with 31 named functions. Its calm room follows what the study of restoration found [1], and the review of sustained attention in autistic adults bears on its single-task view [4]. I made it alone over 14 months.';
      if (onPiece) onPiece(out); return Promise.resolve(out); };
  });
  await p.evaluate(() => go('lector')); await p.waitForTimeout(1500);
  const cite = await p.evaluate(() => { const c = document.getElementById('l7Cite'); return { there: !!c, on: c && c.checked, label: c && c.parentNode.textContent.trim().slice(0, 60), card: (document.getElementById('l7Bf') || document.body).textContent.match(/Your sources \(Fontes\)[^.]*\./) }; });
  ok(cite.there && cite.on, 'the brief has the Cite my sources switch, on by default, with the Fontes count', JSON.stringify(cite));
  await p.evaluate(() => { [...document.querySelectorAll('#l7Bf .l-seg button')].forEach(b => { if (b.dataset.v === 'portfolio') b.click(); }); }); await p.waitForTimeout(300);
  await p.evaluate(() => { [...document.querySelectorAll('#l7Bf input[type=checkbox]')].forEach(c => { const t = c.parentNode.textContent; if (/Portfolio piece/.test(t)) { if (!c.checked) c.click(); } else if (/dossier|Appendix|CV entry|Cover letter/i.test(t) && c.checked && !/^l7/.test(c.id)) c.click(); }); }); await p.waitForTimeout(300);
  await p.evaluate(() => { [...document.querySelectorAll('#l7BriefF button')].find(x => /Write the documents/.test(x.textContent)).click(); });
  await p.waitForFunction(() => { const c = document.getElementById('l7BriefChip'); return c && /Used for this set/.test(c.textContent); }, null, { timeout: 90000 }); await p.waitForTimeout(600);
  const asks = await p.evaluate(() => window.__asks);
  const withSrc = asks.filter(a => !a.examiner && a.sources);
  ok(withSrc.length > 0 && /\[1\] [^\n]*Lovelace[^\n]*\[journal article\]/.test(withSrc[0].sources) && !/\[peer-reviewed journal\]/.test(withSrc[0].sources) && /Her note: The key study/.test(withSrc[0].sources), 'the writer is given her sources, numbered, with the journal article mark (peer review is not claimed, as it was not checked) and her note', withSrc.length ? withSrc[0].sources.slice(240, 520) : 'none');
  const doc = await p.evaluate(() => { const d = document.getElementById('l7Desk'); return d ? d.innerText : ''; });
  const refs = (doc.split(/\nReferences\n/)[1] || '').split(/\nDrafted by/)[0];
  ok(/\nReferences\n/.test(doc) && /^\s*\[1\] /.test(refs) && /\[4\] /.test(refs) && !/\[2\] |\[3\] |\[5\] /.test(refs), 'the piece ends with References listing only the two sources cited, [1] and [4]', refs.slice(0, 240).replace(/\n/g, ' / '));
  ok(/Lovelace, A\.|Lovelace/.test(refs) && /Smith/.test(refs), 'the references are formatted in her chosen style (APA by default)', refs.slice(0, 160));
  const flagged = await p.evaluate(() => { const ev = document.getElementById('l7Stream') ? document.getElementById('l7Stream').innerText : ''; return (ev.match(/figure[^\n]*not in the record[^\n]*/i) || [''])[0]; });
  ok(!/\b1\b|\b4\b/.test(flagged), 'the check does not take a citation number for an unsupported figure', flagged || 'nothing flagged');
  await p.screenshot({ path: OUT + '/acad-lector.png' });

  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('CRASH', e); process.exit(2); });
