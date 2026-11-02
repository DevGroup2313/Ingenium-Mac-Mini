// node rig/t_702_career_interview.js <Ingenium page url> <out dir>
// 6.9.2: the Career Studio's interview (modules/r188.js), in Chromium, with a stand-in model. Her words (31 October 2026):
// "automate where I want and also meticulously review and do on my own at my own pace". So an application at interview
// keeps the day, the time, the place and the panel; a list to prepare by, fixed and without a model (the posting once more,
// an example for each essential criterion, two questions to ask, the way there, what to bring), the questions prefilled from
// the reading's ASK lines; a mock run of one question on the Clepsydra for two minutes, then her answer looked at with her;
// notes after, and a thank-you email written for her to send.
//   - Track: the stage set to Interview opens the card; a day five days off makes Today say "Prepare: 5 days to the interview";
//   - the list to prepare by has five lines, the questions come from the reading; a line ticked is kept;
//   - Practise: Mock run starts the Clepsydra for two minutes (its usual length given back after); the bell ends it;
//   - Look at it with me carries the question; the thank-you email names the day; every part ran; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const POST = 'Lecturer in Digital History\nUniversity of Oxbridge\nEssential:\n- Experience of teaching undergraduates\n- Skill in archival research\nInterviews will be held in January 2027.\nThe closing date is 30 November 2026.\n' + 'x'.repeat(40);
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  const press = async (text, within) => { const hit = await p.evaluate(([text, within]) => { const root = document.querySelector(within || '#cs') || document;
      const k = [...root.querySelectorAll('button')].find(x => x.offsetParent && !x.disabled && (x.textContent.trim() === text || (x.querySelector('b') && x.querySelector('b').textContent.trim() === text)));
      if (!k) return false; k.click(); return true; }, [text, within || null]); if (!hit) throw new Error('no key: ' + text); await p.waitForTimeout(350); };
  const idle = () => p.waitForFunction(() => !IngCareer.run.busy, null, { timeout: 60000 });
  await p.evaluate(() => { window.__asked = []; IngLector.plan = () => ({ chosen: { id: 'test-model', customName: 'Test model' } });
    window.lxAsk = function (run, msgs, max, temp, onPiece) { const u = msgs[msgs.length - 1].content; window.__asked.push(u.slice(0, 5000)); let out = 'Nothing.';
      if (/^An interview question for/.test(u)) out = 'MEETS: PARTLY\nWORKS: You name the archive.\nMISSING: What came of it.\nASK YOURSELF: What changed?';
      else if (/^Write an email from me/.test(u)) out = 'Subject: Thank you\n\nDear [their name],\n\nThank you for the interview.\n\nYours sincerely,\nAda Lovelace';
      else if (/^Below is the draft of my/.test(u)) out = (u.split('THE DRAFT:\n')[1] || '');
      if (onPiece) onPiece(out); return Promise.resolve(out); };
    const P = IngCareer.state().profile; P.name = 'Ada Lovelace'; P.items.push({ id: 'i1', sec: 'teaching', title: 'Tutor in History', place: 'London', from: '2022', to: '2024', text: 'Taught 40 undergraduates.', src: 'me' }); saveState(); });
  const made = await p.evaluate(post => { const d = new Date(); d.setDate(d.getDate() + 5); const iso = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    return IngCareer.newOpp('job', post, 'pasted').then(o => { o.read = { r: { crit: [{ text: 'Experience of teaching undergraduates', ess: true, st: 'met', ev: 'Tutor' }, { text: 'Skill in archival research', ess: true, st: 'partly', ev: '' }], strengths: [], concerns: [], next: [], asks: ['Is a PhD in progress acceptable?', 'Who would I teach with?', 'A third question?'], wants: [] }, at: Date.now(), model: 'Test model' };
      o.stage = 'applied'; o.check = { items: [{ id: 'c1', text: 'Your CV', doc: 'cv', done: true, src: 'posting' }], pending: [], at: Date.now(), way: 'auto' }; o.step = 'track'; saveState();
      const S = IngCareer.state(); S.ui.room = 'apps'; S.ui.open = o.id; S.ui.show = 'work'; go('career'); IngCareer.render(); return { id: o.id, iso }; }); }, POST);
  await p.waitForTimeout(500);
  // the stage set to Interview opens the card; a day set makes Today say to prepare
  ok(await p.evaluate(() => !document.querySelector('#cs .c-ivcard') && !!document.querySelector('#cs .c-work button') && [...document.querySelectorAll('#cs .c-work .c-btn')].some(x => x.textContent === 'Add an interview')), 'before an interview, Track offers only a quiet "Add an interview" key');
  await p.evaluate(() => { const s = document.querySelector('#cs .c-work select'); s.value = 'interview'; s.dispatchEvent(new Event('change')); }); await p.waitForTimeout(300);
  const card = await p.evaluate(() => { const c = document.querySelector('#cs .c-ivcard'); return { has: !!c, prep: c ? [...c.querySelectorAll('.c-prep li label')].map(x => x.textContent) : [], asks: c ? c.querySelector('textarea').value : '', text: c ? c.innerText : '' }; });
  ok(card.has && card.prep.length === 5 && /Read the posting once more/.test(card.prep[0]) && /An example for each essential criterion/.test(card.prep[1]) && /Two questions to ask them/.test(card.prep[2]) && /The way there/.test(card.prep[3]) && /What to bring/.test(card.prep[4]), 'the stage Interview opens the card with its five lines to prepare by, fixed and without a model', card.prep);
  ok(card.asks === 'Is a PhD in progress acceptable?\nWho would I teach with?' && /nothing here is written by the model/.test(card.text), "the two questions to ask come from the reading's ASK lines, for her to change", card.asks);
  await p.evaluate(iso => { const i = document.querySelector('#cs .c-ivcard input[type=date]'); i.value = iso; i.dispatchEvent(new Event('change')); }, made.iso); await p.waitForTimeout(300);
  const nx = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); return { next: IngCareer.nextOf(o), days: (document.querySelector('#cs .c-ivdays') || {}).textContent, dates: IngCareer.datesOf(o).map(d => d.kind), mins: IngCareer.estimateOf(o, IngCareer.nextOf(o)) }; }, made.id);
  ok(nx.next.step === 'track' && nx.next.text === 'Prepare: 5 days to the interview' && nx.days === 'In 5 days' && nx.dates.join('|') === 'interview|closes' && nx.mins === 25, 'with the day set five days off, Today says "Prepare: 5 days to the interview", the card counts the days, and the interview is among the dates (a twenty-five-minute step)', nx);
  await p.evaluate(() => { const c = document.querySelector('#cs .c-ivcard .c-prep input'); c.click(); }); await p.waitForTimeout(300);
  ok(await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); return o.interview.prep.post === true && document.querySelector('#cs .c-ivcard .c-prep li').classList.contains('c-ck-done'); }, made.id), 'a line to prepare by, ticked, is kept');
  await p.screenshot({ path: OUT + '/interview.png' });
  await press('Practise', '#cs .c-ivcard');
  ok(await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); return o.step === 'practise' && o.ptab === 'evidence' && !!document.querySelector('#cs .c-nav .c-item'); }, made.id), 'the key beside "an example for each criterion" opens Practise at the evidence');
  // the mock run: two minutes on the Clepsydra, then her answer looked at
  await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); o.practice.qs = [{ id: 'q1', q: 'Why this post?', answer: '', fb: null }]; o.ptab = 'interview'; o.qsel = 'q1'; state.clep.focusLen = 25; saveState(); IngCareer.render(); }, made.id); await p.waitForTimeout(300);
  const before = await p.evaluate(() => ({ running: pomo.running, len: state.clep.focusLen, box: (document.querySelector('#cs .c-mock') || {}).innerText || '' }));
  ok(!before.running && before.len === 25 && /Mock run · 2 minutes/.test(before.box), 'Practise offers a mock run of two minutes beside the question', before);
  await press('Mock run · 2 minutes', '#cs .c-mock'); await p.waitForTimeout(1300);
  const run = await p.evaluate(() => ({ running: pomo.running, len: state.clep.focusLen, rem: pomo.remaining, mock: IngCareer.mock(), box: (document.querySelector('#cs .c-mock') || {}).innerText || '' }));
  ok(run.running && run.len === 2 && run.rem <= 120 && run.rem >= 115 && run.mock && run.mock.q === 'q1' && /The clock runs: 1:5\d left/.test(run.box), 'Mock run starts the Clepsydra for two minutes, and the panel counts down', run);
  await press('Stop the clock', '#cs .c-mock');
  const stopped = await p.evaluate(() => ({ running: pomo.running, len: state.clep.focusLen, mock: IngCareer.mock() }));
  ok(!stopped.running && stopped.len === 25 && !stopped.mock, 'Stop the clock stills the Clepsydra and gives it back its usual length', stopped);
  await press('Mock run · 2 minutes', '#cs .c-mock'); await p.evaluate(() => { pomo.remaining = 1; }); await p.waitForTimeout(2500);
  const bell = await p.evaluate(() => ({ running: pomo.running, len: state.clep.focusLen, mock: IngCareer.mock(), phase: pomo.phase, toast: (document.getElementById('ingToast') || {}).textContent || '' }));
  ok(!bell.mock && bell.len === 25 && bell.phase === 'focus' && !bell.running && /Two minutes: now write down what you said/.test(bell.toast), 'at the bell the mock run ends, the Clepsydra is given back its length, and she is told to write her answer down', bell);
  await p.fill('#cs .c-pane textarea', 'I would teach the survey course as I taught forty undergraduates in London, and bring my archival catalogue to the digital methods seminar.');
  await press('Look at it with me', '#cs .c-work .c-pn-f'); await idle(); await p.waitForTimeout(300);
  const look = await p.evaluate(() => ({ u: window.__asked.find(x => /^An interview question for/.test(x)) || '', fb: (document.querySelector('#cs .c-pane .c-fb') || {}).innerText || '' }));
  ok(/^An interview question for Lecturer in Digital History, University of Oxbridge:\nWhy this post\?/.test(look.u) && /Meets it: partly/.test(look.fb), 'Look at it with me carries the question, and her answer is looked at with her as before', look.u.slice(0, 120));
  // the thanks
  await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); o.step = 'track'; o.interview.after = 'They asked about the catalogue.'; o.interview.panel = 'Professor Lovelace and two colleagues'; IngCareer.render(); }, made.id); await p.waitForTimeout(300);
  await press('Write a thank-you email', '#cs .c-ivcard'); await idle(); await p.waitForTimeout(400);
  const th = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id), u = window.__asked.find(x => /^Write an email from me/.test(x)) || ''; return { u, email: o.emails[0] && [o.emails[0].role, o.emails[0].purpose] }; }, made.id);
  ok(/to the contact named in the posting, to thank them after an interview/.test(th.u) && /Also: The interview was on .*, with Professor Lovelace and two colleagues\. My notes after it: They asked about the catalogue\./.test(th.u) && th.email && th.email[1] === 'thanks', 'the thank-you email carries the day, the panel and her notes after', th.u.slice(0, 300));
  await p.evaluate(() => { const S = IngCareer.state(); S.ui.room = 'today'; S.ui.today = null; IngCareer.render(); }); await p.waitForTimeout(300);
  const today = await p.evaluate(() => ({ rows: [...document.querySelectorAll('#cs .c-list .c-item')].map(x => x.innerText.replace(/\s+/g, ' ')), week: (document.querySelector('#cs .c-week') || {}).innerText || '' }));
  ok(today.rows.length === 1 && /^Prepare: 5 days to the interview/.test(today.rows[0]) && /about 25 min/.test(today.rows[0]) && /Interview · Lecturer/.test(today.week), 'Today: the one step is to prepare, about 25 minutes, and the interview is in the week\'s strip', today);
  // after the interview: a note of how it went and the thanks; then, waiting to hear
  const after = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); const d = new Date(); d.setDate(d.getDate() - 2); o.interview.at = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    o.interview.after = ''; const em = o.emails; o.emails = []; const a = IngCareer.nextOf(o); o.interview.after = 'They asked about the catalogue.'; const b = IngCareer.nextOf(o); o.emails = em; saveState(); IngCareer.render();
    return { a, b, wait: [...document.querySelectorAll('#cs .c-list summary')].map(s => s.textContent) }; }, made.id);
  ok(after.a && after.a.step === 'track' && after.a.text === 'Note how the interview went, and write your thanks' && after.b === null && after.wait.includes('Waiting to hear (1)'), 'two days after the interview, Today asks for a note of how it went and the thanks; with the note written, it is waiting to hear', after);
  // a mock run cut short by a reload: the Clepsydra is given back its usual length
  await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); state.clep.focusLen = 25; saveState(); IngCareer.startMock(o, o.practice.qs[0]); }, made.id); await p.waitForTimeout(400);
  const mid = await p.evaluate(() => ({ len: state.clep.focusLen, kept: localStorage.getItem('ing_cs_mock') }));
  await p.reload(); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer, null, { timeout: 300000 }); await p.waitForTimeout(800);
  const back = await p.evaluate(() => ({ len: state.clep.focusLen, rem: pomo.remaining, kept: localStorage.getItem('ing_cs_mock') }));
  ok(mid.len === 2 && mid.kept === '25' && back.len === 25 && back.rem === 1500 && back.kept === null, 'a reload in the middle of a mock run gives the Clepsydra back its usual length', { mid, back });
  ok(await p.evaluate(() => Object.keys(window.__ingParts).every(k => window.__ingParts[k] === 'running')), 'every part of the page ran to its end');
  ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
