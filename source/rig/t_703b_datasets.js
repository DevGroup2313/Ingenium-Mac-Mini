// node rig/t_703b_datasets.js <Ingenium page url> <out dir> [stand-in model port, default 8184]
// Ingenium 6.9.x (31 October 2026), in Chromium. The owner's words: "I want to expand on the parameters of what Ingenium can do
// as a serious coding and creating workbench with and without AI. I want to be able to create and train all kinds of AI models,
// even Frontier level AI models inside of the app." (modules/r200.js: datasets from her own work; desktop/app_data_692.py is
// checked by rig/t_692_app_data.py, and here only through the page's side of it, with a stand-in for the computer app's bridge)
//   - the Data room holds the card; the sources are counted from the page's own state (chats, chats carried over, Claude's
//     history, the reading page's documents, Fontes notes, the Tabula page, sticky notes, project files);
//   - the wizard: name and sources, every piece listed with where it came from, exact duplicates removed, keep/edit/drop,
//     emails and phone numbers counted and hidden on request, a part held back by the hash of its text, sizes in characters
//     and pieces; the dataset is kept in IndexedDB "ingenium_datasets" and is still there after a reload;
//   - the exports: plain text (training part, held-back part), chat lines (JSON Lines), question-and-answer lines;
//   - question-and-answer pairs drafted by a stand-in model (rig/mock_qa.py), shown for review, changed or dropped by her,
//     and kept only when she says so; the passage sent to the model has the emails hidden when she asked;
//   - Train on it: with the computer app's trainer, the dataset's training part is the trainer wizard's text; without it,
//     the learning workbench takes it; the computer's newer side is feature-detected (the text handed over a megabyte at a
//     time and train_start given a path; a run the app's closing cut short offered back); without it, the text goes as before;
//   - no script errors; every part of the page ran to its end.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const URL_ = process.argv[2], OUT = process.argv[3], PORT = +process.argv[4] || 8184; fs.mkdirSync(OUT, { recursive: true });
const MOCK = 'http://127.0.0.1:' + PORT, LOG = path.join(OUT, 'qa_req.json');
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  try { fs.unlinkSync(LOG); } catch (e) { }
  const mock = cp.spawn('python3', [path.join(__dirname, 'mock_qa.py'), String(PORT), LOG], { stdio: 'ignore' }); await sleep(700);
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  // what her work holds: two chats, two carried over (one kept in the larger store), a Claude conversation, a reading-page
  // document, a note on a source, the Tabula page, twenty-three sticky notes (two of them the same words), a project
  await p.evaluate(async () => {
    state.chatSource = 'local'; if (state.cloud) state.cloud.on = false;
    const long = 'The Peace of Westphalia of 1648 ended the Thirty Years War and recognised the sovereignty of the German states within the Empire, which is why historians treat it as a turning point for the state system. ';
    state.chats = [
      { id: 'cA', title: 'On the Peace of Westphalia', messages: [{ role: 'me', text: 'What did the Peace of Westphalia settle in 1648? Please be brief.' }, { role: 'bot', text: long + 'It also fixed the religious settlement of Augsburg for Lutherans and Catholics and added the Calvinists.' }] },
      { id: 'cB', title: 'Letters and a seminar', messages: [{ role: 'me', text: 'Email me at yannie.test@example.org or call 0412 345 678 about the seminar on Tuesday morning.' }, { role: 'bot', text: 'I will remember that the seminar is on Tuesday morning; I cannot send email myself, and I cannot make calls either.' }] },
      { id: 'cI1', title: 'An old ChatGPT talk', messages: [{ role: 'me', text: 'Explain the idea of a commonplace book in two sentences for a first-year class.' }, { role: 'bot', text: 'A commonplace book is a notebook in which a reader copies the passages worth keeping, with headings so they can be found again. Scholars from Erasmus to Locke used them to turn their reading into a store of their own.' }], imported: { from: 'ChatGPT', at: Date.now() } },
      { id: 'cI2', title: 'A Gemini talk', messages: [], imported: { from: 'Gemini', ref: 'big_testimp', at: Date.now() } }];
    await IngBig.put('big_testimp', JSON.stringify([{ role: 'me', text: 'Give me a reading plan for the history of the book.' }, { role: 'bot', text: 'Begin with the manuscript culture of the late Middle Ages, then the coming of print, then the rise of the periodical press; read one short study for each in turn.' }]));
    state.activeChat = 'cA';
    state.notes = [{ id: 'n1', text: '<p>Check the archive catalogue for the 1648 treaty text before Friday.</p>', ts: 1 }, { id: 'n2', text: 'Check the archive catalogue for the 1648 treaty text before   FRIDAY.', ts: 2 },
      { id: 'n3', text: 'Remember to write to the editor at editor@journal.example about the proofs.', ts: 3 }];
    for (let i = 0; i < 20; i++) state.notes.push({ id: 'm' + i, text: 'Note number ' + i + ' on the archive visit: the reading room opens at nine and the catalogue desk is on the second floor, bring the reader card.', ts: 10 + i });
    state.tabulaDoc = { title: 'Seminar page', body: '<h1>Seminar</h1><p>The seminar meets on Tuesdays in the old library. Bring one primary source and one article to discuss.</p>' };
    state.projects = [{ id: 'p1', name: 'Westphalia', instructions: 'Answer as a careful historian of early modern Europe and cite sources where you can.', files: [{ name: 'outline.txt', text: 'Chapter one: the war. Chapter two: the congress at Münster and Osnabrück. Chapter three: the settlement and its afterlife.' }] }];
    state.fontes = { style: 'apa', items: [{ id: 'f1', title: 'The Peace of Westphalia: A Historical Perspective', author: [{ family: 'Croxton', given: 'Derek' }], issued: { 'date-parts': [[2013]] }, abstract: '<p>A study of the treaties of 1648 and their legacy.</p>', ingNote: 'Useful for the chapter on sovereignty.' }, { id: 'f2', title: 'A source with nothing written beside it', author: [{ family: 'Nobody', given: 'N' }] }] };
    if (window.IngClaude) { IngClaude.list = () => Promise.resolve([{ id: 'cl1', title: 'A Claude conversation' }]); IngClaude.get = () => Promise.resolve({ id: 'cl1', title: 'A Claude conversation', updated: 5, msgs: [{ r: 'me', t: 'How should I organise notes for a dissertation on print culture?' }, { r: 'bot', t: 'Keep one note for each idea, with the source and page beside it, and tag each note with the chapter it may serve; review the tags every month.' }] }); }
    window.lectorDocs = () => [{ key: 'k1', set: { apps: ['Tabula'], docs: { dossier: { ref: 'big_testdoc', made: 9 } } }, kind: 'dossier', made: 9 }];
    await IngBig.put('big_testdoc', 'Project dossier. The project gathers primary sources on the settlement of 1648 and arranges them by theme, so that a reader can follow one argument at a time through the treaties and the commentary.');
    window.__saved = []; window.saveFileNative = (n, m, t) => { window.__saved.push({ n, m, t }); return true; };
    saveState(); go('models'); IngRooms.open('models', 'studio', true); IngStudio.open('data'); });
  await p.waitForTimeout(900);
  // the card
  const card0 = await p.evaluate(() => { const c = document.getElementById('ingDataCard'); return { room: IngStudio.roomOf(c), h: c.querySelector('h2').textContent, none: /No dataset yet/.test(c.innerText), btn: !!document.getElementById('ingDataNew'), shown: c.getBoundingClientRect().height > 0, ind: typeof IngData, db: true }; });
  ok(card0.room === 'data' && card0.h === 'Datasets from your own work' && card0.btn && card0.none && card0.shown && card0.ind === 'object', "the Data room holds the card, with Make a dataset and 'No dataset yet' before the first", card0);
  const src = await p.evaluate(() => IngData.sources().then(l => l.map(s => s.kind + ':' + s.n).join(' ')));
  ok(src === 'chats:2 imported:2 claude:1 reading:1 fontes:1 tabula:1 notes:23 projects:2', 'the sources are counted from her own state: chats, carried over, Claude, reading page, Fontes (only a source with an abstract or a note), Tabula, sticky notes, project files', src);
  // the wizard
  await p.click('#ingDataNew'); await p.waitForSelector('#dsSources label', { timeout: 10000 }); await p.waitForTimeout(400);
  const w1 = await p.evaluate(() => ({ title: document.getElementById('dsTitle').textContent, steps: [...document.querySelectorAll('#dsSteps li')].map(x => x.textContent),
    boxes: [...document.querySelectorAll('#dsSources label')].map(l => ({ kind: l.querySelector('input').value, on: l.querySelector('input').checked, off: l.classList.contains('off'), t: l.querySelector('b').textContent })) }));
  ok(/step 1 of 3/.test(w1.title) && w1.steps.join() === 'Name and sources,Review,Kept' && w1.boxes.length === 8 && w1.boxes.every(x => x.on && !x.off) && /Your chats · 2 pieces/.test(w1.boxes[0].t),
    'the wizard begins with a name and the eight sources, each counted, each chosen', w1);
  await p.fill('#dsBody input[type=text]', 'Westphalia and notes');
  await p.click('#dsNext'); await p.waitForSelector('#dsItems .ds-item', { timeout: 20000 }); await p.waitForTimeout(500);
  const w2 = await p.evaluate(() => { const rows = [...document.querySelectorAll('#dsItems .ds-item')]; return { n: rows.length, tags: [...new Set(rows.map(r => r.querySelector('.ds-tag').textContent))].sort(), sum: document.getElementById('dsSum').textContent,
    dup: /1 exact duplicate removed/.test(document.getElementById('dsSum').textContent), title: document.getElementById('dsTitle').textContent, imported: rows.some(r => /Gemini/.test(r.querySelector('.ds-tag').textContent)) && rows.some(r => /ChatGPT/.test(r.querySelector('.ds-tag').textContent)),
    fontes: rows.some(r => /Fontes/.test(r.querySelector('.ds-tag').textContent) && /My note: Useful for the chapter on sovereignty/.test(r.querySelector('.ds-pre').textContent)),
    plain: rows.every(r => !/<p>|<h1>/.test(r.querySelector('.ds-pre').textContent)) }; });
  ok(/step 2 of 3/.test(w2.title) && w2.n === 32 && w2.dup && w2.imported && w2.fontes && w2.plain, 'every piece is listed with where it came from; the two sticky notes with the same words are one piece, the duplicate said; your own note on a source (Fontes) comes with it; no markup', w2);
  ok(['ChatGPT', 'Claude', 'Fontes', 'Gemini', 'Tabula', 'chat', 'project', 'reading page', 'sticky note'].join() === w2.tags.join(), 'each piece is tagged with its source (chat, ChatGPT, Gemini, Claude, reading page, Fontes, Tabula, sticky note, project)', w2.tags);
  // keep, edit, drop; emails and phone numbers; the held-back part
  const act = await p.evaluate(async () => { const rows = () => [...document.querySelectorAll('#dsItems .ds-item')]; const kept = () => +/^(\d[\d,]*) of/.exec(document.getElementById('dsSum').textContent)[1].replace(/,/g, '');
    const out = { kept0: kept() };
    const drop = rows().find(r => /Note number 3 /.test(r.querySelector('.ds-pre').textContent)); [...drop.querySelectorAll('button')].find(x => x.textContent === 'Drop').click(); out.kept1 = kept(); out.dropMarked = drop.classList.contains('drop');
    [...drop.querySelectorAll('button')].find(x => x.textContent === 'Keep').click(); out.kept2 = kept();
    const ed = rows().find(r => /Seminar/.test(r.querySelector('.ds-t').textContent)); [...ed.querySelectorAll('button')].find(x => x.textContent === 'Edit').click();
    const ta = ed.querySelector('textarea'); ta.value = ta.value + ' Bring a pencil.'; [...ed.querySelectorAll('button')].find(x => x.textContent === 'Save').click(); out.edited = [...ed.querySelectorAll('.ds-tag')].some(t => t.textContent === 'edited') && /Bring a pencil/.test(ed.querySelector('.ds-pre').textContent);
    out.found = [...document.querySelectorAll('#dsBody .ds-tools label')].map(l => l.textContent.trim()).filter(t => /^Hide/.test(t));
    const q = document.querySelector('.ds-q'); q.value = 'archive'; q.dispatchEvent(new Event('input')); out.search = rows().length; q.value = ''; q.dispatchEvent(new Event('input'));
    const sel = document.querySelector('#dsBody select[aria-label="Show"]'); sel.value = 'projects'; sel.dispatchEvent(new Event('change')); out.filter = rows().length; sel.value = ''; sel.dispatchEvent(new Event('change'));
    const hs = document.querySelector('#dsBody select[aria-label="How much is held back"]'); hs.value = '0.2'; hs.dispatchEvent(new Event('change'));
    out.held = rows().filter(r => [...r.querySelectorAll('.ds-tag')].some(t => t.textContent === 'held back')).length; out.heldSum = +/(\d+) held back/.exec(document.getElementById('dsSum').textContent)[1];
    const boxes = [...document.querySelectorAll('#dsBody .ds-tools label input[type=checkbox]')]; boxes.forEach(c => { if (!c.checked) c.click(); }); out.scrubOn = boxes.length;
    return out; });
  ok(act.kept0 === 32 && act.kept1 === 31 && act.dropMarked && act.kept2 === 32 && act.edited, 'a piece can be dropped (the count falls, the piece is struck through), kept again, and edited (it is then marked as edited)', act);
  ok(act.search === 21 && act.filter === 2 && act.found.length === 2 && /\(2 found\)/.test(act.found[0]) && /\(1 found\)/.test(act.found[1]), 'she can find pieces by their words and by their source; the emails (2) and phone numbers (1) are counted before she decides', act);
  ok(act.held > 0 && act.held < 32 && act.held === act.heldSum, 'one piece in five is held back by the hash of its text (' + act.held + ' of 32), shown on each piece and in the sum', { held: act.held, sum: act.heldSum });
  const sz = await p.evaluate(() => document.getElementById('dsSum').textContent);
  const chars = +/([\d,]+) characters/.exec(sz)[1].replace(/,/g, ''), toks = +/about ([\d,]+) pieces of text/.exec(sz)[1].replace(/,/g, '');
  ok(chars > 3000 && Math.abs(toks - chars / 4) <= 1, 'the size is counted in characters and in pieces of text (an estimate: four characters a piece)', sz);
  await p.screenshot({ path: path.join(OUT, 'data_review.png') });
  await p.click('#dsNext'); await p.waitForFunction(() => /step 3 of 3/.test(document.getElementById('dsTitle').textContent), null, { timeout: 15000 }); await p.waitForTimeout(500);
  const kept = await p.evaluate(async () => { const l = await IngData.list(); const s = l[0]; const r = await IngData.get(s.id);
    return { n: l.length, name: s.name, items: r.items.length, kept: s.kept, heldN: s.heldN, scrub: s.scrub, held: s.held, dupes: s.dupes, chars: s.chars, tokens: s.tokens, prov: r.items.every(x => x.src && x.src.kind && x.title !== undefined),
      listed: document.getElementById('ingDataList').innerText, step3: document.getElementById('dsBody').innerText.slice(0, 200), id: s.id }; });
  ok(kept.n === 1 && kept.name === 'Westphalia and notes' && kept.items === 32 && kept.scrub.emails && kept.scrub.phones && kept.held === 0.2 && kept.dupes === 1 && kept.prov && kept.tokens === Math.round(kept.chars / 4) && /32 pieces kept/.test(kept.step3),
    'the dataset is kept on this device with its pieces, their provenance, the choices (held back, emails and phone numbers hidden), the duplicate counted and the size', kept);
  ok(/Westphalia and notes/.test(kept.listed) && /32 of 32 pieces kept/.test(kept.listed) && /held back/.test(kept.listed), 'the card lists it with its counts', kept.listed);
  const ID = kept.id;
  // the text that goes out
  const out = await p.evaluate(async id => { const tr = await IngData.text(id, { split: 'train' }), hd = await IngData.text(id, { split: 'held' }), all = await IngData.text(id, { split: 'all' }), r = await IngData.get(id);
    const held = r.items.filter(x => x.held && x.keep !== false).length, train = r.items.filter(x => !x.held && x.keep !== false).length;
    const lines = (await IngData.jsonl(id, { split: 'all' })).trim().split('\n').map(l => JSON.parse(l));
    return { trLen: tr.length, hdLen: hd.length, allLen: all.length, held, train, email: /yannie\.test@example\.org|editor@journal\.example/.test(all), phone: /0412 345 678/.test(all), tags: (all.match(/\[email\]/g) || []).length + '/' + (all.match(/\[phone\]/g) || []).length,
      chatLines: lines.filter(l => l.messages).length, textLines: lines.filter(l => l.text !== undefined).length, roles: lines.filter(l => l.messages).every(l => l.messages[0].role === 'user' && l.messages.every((m, i) => m.role === (i % 2 ? 'assistant' : 'user'))),
      overlap: tr.split('\n\n').some(t => t.trim() && hd.indexOf(t.trim()) >= 0), edit: /Bring a pencil/.test(all) }; }, ID);
  ok(out.held > 0 && out.train + out.held === 32 && out.trLen > 0 && out.hdLen > 0 && !out.overlap && out.trLen + out.hdLen <= out.allLen + 4 && out.edit, 'the training part and the held-back part are different pieces and together make the dataset; her edit is in what goes out', out);
  ok(!out.email && !out.phone && out.tags === '2/1', 'emails and phone numbers are hidden in what goes out, as she asked ([email] and [phone] in their place)', out);
  ok(out.chatLines === 5 && out.textLines === 27 && out.roles, 'chat lines (JSON Lines): one conversation a line as user and assistant messages (chats, carried over, Claude); any other piece is {"text": …}', out);
  // the exports, as files
  await p.evaluate(() => { const rows = [...document.querySelectorAll('#ingDataList .ds-row')]; [...rows[0].querySelectorAll('button')].find(x => x.textContent === 'Export…').click(); }); await p.waitForSelector('#dxTxt', { timeout: 5000 });
  const exp = await p.evaluate(async () => { const out = {}; window.__saved.length = 0;
    for (const id of ['dxTxt', 'dxHeld', 'dxJsonl', 'dxQa']) { document.getElementById(id).click(); await new Promise(r => setTimeout(r, 500)); out[id] = (document.getElementById('dxNote').textContent || ''); }
    out.files = window.__saved.map(f => ({ n: f.n, m: f.m, len: f.t.length })); return out; });
  ok(exp.files.length === 3 && exp.files[0].n === 'Westphalia-and-notes-train.txt' && exp.files[1].n === 'Westphalia-and-notes-held-back.txt' && exp.files[2].n === 'Westphalia-and-notes-chat.jsonl' && /No question-and-answer pairs are kept/.test(exp.dxQa) && /Written: .* characters, about/.test(exp.dxTxt),
    'the exports are files she holds: the training text, the held-back text, chat lines; the question-and-answer file waits until pairs are kept', exp);
  await p.evaluate(() => closeModal()); await p.waitForTimeout(300);
  // question-and-answer pairs, drafted by a stand-in model and reviewed one by one
  await p.evaluate(M => { state.cloud = { provider: 'lmstudio', base: M + '/v1', key: '', model: 'qwen3-8b', models: ['qwen3-8b'], on: true }; state.chatSource = 'cloud'; state.thinking = false; saveState(); }, MOCK);
  await p.evaluate(() => { const rows = [...document.querySelectorAll('#ingDataList .ds-row')]; [...rows[0].querySelectorAll('button')].find(x => x.textContent === 'Review').click(); }); await p.waitForSelector('#drQa', { timeout: 10000 });
  const rv = await p.evaluate(() => ({ items: document.querySelectorAll('#drItems .ds-item').length, sum: document.getElementById('drSum').textContent, hs: document.querySelector('#drTools select').value, scrub: [...document.querySelectorAll('#drTools input[type=checkbox]')].map(c => c.checked) }));
  ok(rv.items === 32 && /32 of 32 pieces kept/.test(rv.sum) && rv.hs === '0.2' && rv.scrub.join() === 'true,true', 'Review reopens the dataset with its pieces and its choices', rv);
  await p.click('#drQa'); await p.waitForSelector('#dqGo', { timeout: 5000 });
  await p.selectOption('#dqMax', '3'); await p.click('#dqGo');
  await p.waitForFunction(() => document.querySelectorAll('#dqItems .ds-item').length > 0, null, { timeout: 60000 }); await p.waitForTimeout(400);
  const dr = await p.evaluate(() => { const rows = [...document.querySelectorAll('#dqItems .ds-item')]; return { n: rows.length, note: document.getElementById('dqNote').textContent, first: rows[0].querySelectorAll('textarea')[0].value, ans: rows[0].querySelectorAll('textarea')[1].value, from: rows[0].querySelector('.ds-tag').textContent,
    keepHidden: document.getElementById('dqKeep').hidden, stopHidden: document.getElementById('dqStop').hidden }; });
  const reqs = JSON.parse(fs.readFileSync(LOG, 'utf8')).filter(r => r.method === 'POST');
  const sent = reqs.map(r => ((r.body.messages || []).map(m => m.content).join('\n'))).join('\n');
  ok(dr.n >= 3 && dr.n <= 9 && /pairs? drafted/.test(dr.note) && /^What does the passage say/.test(dr.first) && dr.ans.length > 10 && /^from /.test(dr.from) && !dr.keepHidden && dr.stopHidden, 'the stand-in model drafts questions and answers from the kept pieces; each pair is shown with the piece it came from, to read, change or drop', dr);
  ok(reqs.length >= 1 && reqs.length <= 3 && !/yannie\.test@example\.org|editor@journal\.example|0412 345 678/.test(sent) && /PASSAGE:/.test(sent), 'the passages sent to the model have the emails and phone numbers hidden (' + reqs.length + ' requests, one a piece, none for held-back pieces)', { reqs: reqs.length });
  const kq = await p.evaluate(async () => { const rows = [...document.querySelectorAll('#dqItems .ds-item')]; const n0 = rows.length; const ta = rows[0].querySelectorAll('textarea')[0]; ta.value = 'Edited by her: what settled the war?'; ta.dispatchEvent(new Event('input'));
    [...rows[1].querySelectorAll('button')].find(x => x.textContent === 'Drop').click(); document.getElementById('dqKeep').click(); await new Promise(r => setTimeout(r, 900));
    const l = await IngData.list(), r = await IngData.get(l[0].id), qa = r.items.filter(x => x.kind === 'qa');
    return { n0, note: document.getElementById('dqNote').textContent, qa: qa.length, set: l[0].qa, firstQ: qa[0] && qa[0].q, edited: qa[0] && qa[0].edited, src: qa[0] && qa[0].src.title, text: qa[0] && IngData.hash('Q: ' + qa[0].q + '\nA: ' + qa[0].a) === qa[0].hash }; });
  ok(kq.qa === kq.n0 - 1 && kq.set === kq.qa && kq.firstQ === 'Edited by her: what settled the war?' && kq.edited && /reviewed by you/.test(kq.src) && kq.text && new RegExp(kq.qa + ' pairs? kept').test(kq.note),
    'only the pairs she marked are kept (one dropped, one changed), with their provenance, in the dataset', kq);
  await p.evaluate(() => closeModal()); await p.waitForTimeout(300);
  const qaFile = await p.evaluate(async () => { const l = await IngData.list(); const id = l[0].id; window.__saved.length = 0;
    const rows = [...document.querySelectorAll('#ingDataList .ds-row')]; [...rows[0].querySelectorAll('button')].find(x => x.textContent === 'Export…').click(); await new Promise(r => setTimeout(r, 300));
    document.getElementById('dxQa').click(); await new Promise(r => setTimeout(r, 500)); const f = window.__saved[0]; closeModal();
    const ls = f ? f.t.trim().split('\n').map(x => JSON.parse(x)) : []; return { n: f && f.n, len: ls.length, shape: ls.every(x => x.messages && x.messages[0].role === 'user' && x.messages[1].role === 'assistant'), first: ls[0] && ls[0].messages[0].content }; });
  ok(/-qa\.jsonl$/.test(qaFile.n || '') && qaFile.len === kq.qa && qaFile.shape && qaFile.first === 'Edited by her: what settled the war?', 'the question-and-answer export holds exactly the pairs she kept, as user and assistant lines', qaFile);
  // it is still there after a reload (IndexedDB "ingenium_datasets")
  await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); go('models'); IngRooms.open('models', 'studio', true); IngStudio.open('data'); }); await p.waitForTimeout(1500);
  const again = await p.evaluate(async () => { const l = await IngData.list(); const dbs = indexedDB.databases ? (await indexedDB.databases()).map(d => d.name) : ['ingenium_datasets']; return { n: l.length, qa: l[0] && l[0].qa, shown: document.getElementById('ingDataList').innerText, db: dbs.indexOf('ingenium_datasets') >= 0 }; });
  ok(again.n === 1 && again.qa >= 2 && /Westphalia and notes/.test(again.shown) && again.db, 'the dataset is still there after a reload, in its own store "ingenium_datasets"', again);
  // Train on it: the computer app's trainer (stood in for), the text handed over a megabyte at a time, and a run cut short
  const tr = await p.evaluate(async () => { const log = { put: [], asked: [], resume: 0, discard: 0 }; let resumable = { id: 'x', name: 'Cut short', done: 1, passes: 3, chars: 4000, size: 'tiny' };
    window.pywebview = { api: { engine_load: () => ({}), engine_status: () => ({ state: 'idle' }), train_available: () => ({ ok: true, trainer: true, cores: 8, file: true, resume: true }),
      train_status: () => ({ state: 'idle', resumable }), train_start: spec => { log.asked.push(spec); return { ok: true, id: 't1' }; }, train_cancel: () => ({ ok: true }),
      train_text_put: (c, first) => { log.put.push({ n: c.length, first: !!first }); return { ok: true, path: '/data/incoming.txt' }; }, train_resume: () => { log.resume++; resumable = null; return { ok: true }; }, train_discard: () => { log.discard++; resumable = null; return { ok: true }; } } };
    const a = trainApi(); const big = 'a'.repeat(2500000);
    const r = await a.train_start({ name: 'Big', text: big, size: 'tiny', passes: 2 });
    const spec = log.asked[0] || {};
    await new Promise(res => setTimeout(res, 100));
    return { r, put: log.put, spec: { text: spec.text, text_path: spec.text_path, chars: spec.chars, size: spec.size, passes: spec.passes, name: spec.name }, same: a === window.pywebview.api, wrapped: typeof a.train_text_put }; });
  ok(tr.r && tr.r.ok && tr.put.length === 3 && tr.put[0].first === true && tr.put[1].first === false && tr.put.reduce((x, y) => x + y.n, 0) === 2500000 && tr.spec.text === undefined && tr.spec.text_path === '/data/incoming.txt' && tr.spec.chars === 2500000 && tr.spec.size === 'tiny' && tr.spec.passes === 2,
    "with the computer app's newer side, the trainer is given the text as a file, handed over a megabyte at a time (3 pieces for 2.5 million characters), not as one string over the bridge", tr);
  const old = await p.evaluate(async () => { const log = []; window.pywebview = { api: { engine_load: () => ({}), engine_status: () => ({ state: 'idle' }), train_available: () => ({ ok: true, trainer: true, cores: 8 }), train_status: () => ({ state: 'idle' }), train_start: spec => { log.push(spec); return { ok: true }; }, train_cancel: () => ({ ok: true }) } };
    const a = trainApi(); const r = await a.train_start({ name: 'Small', text: 'b'.repeat(5000), size: 'tiny', passes: 1 }); return { r, text: log[0] && log[0].text && log[0].text.length, path: log[0] && log[0].text_path, same: a === window.pywebview.api }; });
  ok(old.r.ok && old.text === 5000 && old.path === undefined && old.same, 'without the newer side the page works as before: one string, the same object, no file', old);
  await p.evaluate(() => { let resumable = { id: 'x', name: 'Cut short', done: 1, passes: 3, chars: 4000, size: 'tiny' }; window.__log2 = { resume: 0, discard: 0 };
    window.pywebview = { api: { engine_load: () => ({}), engine_status: () => ({ state: 'idle' }), train_available: () => ({ ok: true, trainer: true, cores: 8 }), train_status: () => ({ state: 'idle', resumable }), train_start: () => ({ ok: true }), train_cancel: () => ({ ok: true }),
      train_text_put: () => ({ ok: true, path: '/p' }), train_resume: () => { window.__log2.resume++; resumable = null; return { ok: true }; }, train_discard: () => { window.__log2.discard++; resumable = null; return { ok: true }; } } };
    go('models'); IngStudio.open('train'); renderTrainCard(); }); await p.waitForTimeout(900);
  const rs = await p.evaluate(() => { const b = document.querySelector('#trainCard .ds-resume'); return b ? { text: b.innerText.replace(/\s+/g, ' '), keys: [...b.querySelectorAll('button')].map(x => x.textContent) } : null; });
  ok(rs && /A training was cut short when the app closed/.test(rs.text) && /Cut short: 1 of 3 passes done and saved, on 4,000 characters/.test(rs.text) && rs.keys.join() === 'Go on with it,Let it go', 'a training the app\'s closing cut short is offered back on the trainer card: go on with it, or let it go', rs);
  await p.evaluate(() => [...document.querySelectorAll('#trainCard .ds-resume button')].find(x => x.textContent === 'Let it go').click()); await p.waitForTimeout(500);
  const gone = await p.evaluate(() => ({ discard: window.__log2.discard, box: !!document.querySelector('#trainCard .ds-resume') }));
  ok(gone.discard === 1 && !gone.box, '"Let it go" lets the run go and the offer goes', gone);
  // the dataset becomes the trainer wizard's text
  const tw = await p.evaluate(async () => { const l = await IngData.list(); const r = await IngData.toTrainer(l[0].id); const t = await IngData.text(l[0].id, { split: 'train' });
    await new Promise(res => setTimeout(res, 500)); const ta = document.querySelector('#trBody textarea.tr-text'); return { r, title: (document.getElementById('trTitle') || {}).textContent, has: !!ta, same: !!ta && ta.value === t, name: window.__trainPreset === null, chars: t.length }; });
  ok(tw.r && tw.r.trainer && tw.has && tw.same && tw.chars > 2000, "Train on it hands the dataset's training part to Train a small model as its text (the trainer wizard opens with it)", tw);
  await p.evaluate(() => { try { closeModal(); } catch (e) { } window.pywebview = undefined; });
  // without the trainer (a browser, a phone): the learning workbench takes the text
  const lab = await p.evaluate(async () => { const l = await IngData.list(); const had = typeof IngLab; let r = null, err = '';
    try { r = await IngData.toTrainer(l[0].id); } catch (e) { err = String(e.message || e); } const t = await IngData.text(l[0].id, { split: 'train' });
    const cur = window.IngLab && IngLab.current ? IngLab.current() : null; return { had, r, err, cur: cur && { kind: cur.kind, chars: cur.chars, name: cur.name }, want: t.length, room: IngStudio.current() }; });
  ok(lab.had === 'object' && lab.r && lab.r.lab && lab.cur && lab.cur.kind === 'chars' && lab.cur.chars === lab.want && lab.cur.name === 'Westphalia and notes' && lab.room === 'train', 'in a browser the same key hands the training part to the learning workbench (its character model), and opens the Train room', lab);
  await p.evaluate(async () => { const l = await IngData.list(); await IngData.remove(l[0].id); }); await p.waitForTimeout(300);
  const rm = await p.evaluate(async () => ({ n: (await IngData.list()).length }));
  ok(rm.n === 0, 'a dataset can be removed (her chats, notes and documents stay)', rm);
  const parts = await p.evaluate(() => Object.keys(window.__ingParts).filter(k => window.__ingParts[k] !== 'running'));
  ok(parts.length === 0, 'every part of the page ran to its end', parts);
  ok(errs.length === 0, 'no script errors on the page', errs.join(' | '));
  await b.close(); try { mock.kill(); } catch (e) { }
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
