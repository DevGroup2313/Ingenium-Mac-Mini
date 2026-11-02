// node rig/t_6812_career.js <Ingenium page url> <out dir>
// Career Studio at her pace, and several profiles (modules/r188.js, 6.8.12), in Chromium, with a stand-in for the model that
// answers each kind of request and records what it was asked. Her words (28 October 2026): "I want to be able to automate where
// I want and also meticulously review and do on my own at my own pace" (she chose a switch on each task, a calm Today view,
// requirement checklists, more PhD documents, and changes accepted one by one), and "I want the Career Studio to be able to
// hold multiple profiles" (both other sides of her and other people she helps; each with its own applications).
//   - the profile kept before becomes the first of several; a profile for someone else is empty, keeps nothing of hers, and
//     the switcher at the top opens either; Another side of me copies the profile without its applications;
//   - the checklist is made from the posting's own sentences, each item with its quotation; Step by step offers each found
//     item to keep or drop; Find anything missed keeps only what the model quotes word for word;
//   - Today shows the next small step of each application, Do this now goes to it, Not today lets it rest until tomorrow;
//   - the new documents (statement of purpose, teaching statement, funding application, the writing sample) are offered;
//   - Step by step: a plan first, which she can change; the writing follows it; an improvement waits change by change,
//     and Done keeps exactly what she chose, the version before one press away;
//   - Guide me: a guide to write it herself, with nothing written for her;
//   - no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(d).slice(0, 900))); c ? pass++ : fail++; };
const POST = `DPhil in History of Science, University of Exampleton.
The Faculty invites applications for its doctoral programme beginning in October 2027.
Applicants must submit a CV, a personal statement of no more than 1,000 words, and a research proposal of no more than 2,000 words.
A writing sample of up to 5,000 words is also required.
Please include transcripts of all your degrees.
Two academic references are required.
Candidates whose first language is not English must provide an IELTS score of 7.5 or above.
Applications must be submitted through the University's online application portal.
The closing date is 30 November 2026 at 12 noon UK time.
Applicants should also name a prospective supervisor.
Interviews will be held in January 2027.`;
const PLAN_LINE = 'The question: what the archive of field notebooks shows about method [say which archive]';
const SOP = ['My research asks how field notebooks shaped method.', 'At Oxford I studied the archives of the Museum.', 'This programme offers the history of collections.', 'Afterwards I mean to teach and curate.'];
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  // the stand-in model
  await p.evaluate(([PLAN_LINE, SOP, POST]) => {
    window.__asked = [];
    IngLector.plan = () => ({ chosen: { id: 'test-model', customName: 'Test model' } });
    window.lxAsk = function (run, msgs, max, temp, onPiece) { const u = msgs[msgs.length - 1].content; window.__asked.push(u.slice(0, 4000)); let out = '';
      if (/^Plan my /.test(u)) out = 'The opening: the field and the question, from your education entry\n' + PLAN_LINE + '\nPreparation: your MSt and the archive work\nWhy this programme: the history of collections, as the call says\nAfterwards: teaching and curating';
      else if (/Guide me\./.test(u)) out = '## The opening\nIt says what you mean to research.\n- What question drives you?\n- Why now?\nFrom your profile: MSt in History, Oxford\n\n## Your preparation\nIt shows you are ready.\n- Which methods do you have?\nFrom your profile: nothing yet';
      else if (/^Write my statement of purpose/.test(u)) out = SOP.join('\n\n');
      else if (/^Revise my /.test(u)) out = [SOP[0], 'At Oxford I read the Museum archives closely.', SOP[2], 'Afterwards I will teach.'].join('\n\n');
      else if (/^List what this /.test(u)) out = 'The application form :: Applications must be submitted through the University\'s online application portal.\nA prospective supervisor :: Applicants should also name a prospective supervisor.\nA photograph :: Applicants must send a recent photograph.\nInterview :: Interviews will be held in January 2027.';
      else if (/In one plain sentence, say why/.test(u)) out = 'It is shorter, as you asked, and keeps the archive.';
      else if (/^Below is the draft of my/.test(u)) out = '';
      else out = 'Nothing.';
      if (onPiece) onPiece(out); return Promise.resolve(out); };
  }, [PLAN_LINE, SOP, POST]);
  await p.evaluate(() => go('career')); await p.waitForTimeout(700);
  const tabs = await p.evaluate(() => [...document.querySelectorAll('#cs .rm-tabs [data-room]')].map(b => b.textContent.trim()));
  ok(JSON.stringify(tabs) === '["Today","Applications","Your profile","Goals and plan","Learn"]', 'Today is a room of its own, the first', JSON.stringify(tabs));
  // the profile kept before is the first of several
  const r0 = await p.evaluate(() => { const r = IngCareer.root(); const P = IngCareer.state().profile; P.name = 'Yannie D. Forest'; P.items.push({ id: 'i1', sec: 'education', title: 'MSt in History', place: 'Oxford', from: '2020', to: '2021', text: 'Dissertation on the archives of the Museum.' }); saveState();
    return { n: r.people.length, v: r.v, cur: r.cur, opps: Array.isArray(IngCareer.state().opps), old: Object.keys(r).sort().join(',') }; });
  ok(r0.n === 1 && r0.v === 2 && r0.opps && r0.old === 'cur,people,v', 'what was kept before becomes the first profile, and nothing else stays at the top', JSON.stringify(r0));
  // a profile for someone else
  await p.evaluate(() => { const S = IngCareer.state(); S.ui.room = 'profile'; S.ui.ppart = 'people'; IngCareer.render(); }); await p.waitForTimeout(300);
  await p.fill('#cs .c-newp input', 'Alex Rivera'); await p.click('#cs .c-newp button:has-text("Someone else")'); await p.waitForTimeout(500);
  const alex = await p.evaluate(() => { const S = IngCareer.state(), P = S.profile; return { name: P.name, me: P.isMe, opps: S.opps.length, items: P.items.length, own: !!P.own, sel: [...document.querySelectorAll('#csWho option')].map(o => o.textContent),
    selected: document.getElementById('csWho').selectedOptions[0].textContent, n: IngCareer.root().people.length }; });
  ok(alex.name === 'Alex Rivera' && alex.me === false && alex.opps === 0 && alex.items === 0 && alex.own && alex.n === 2, 'Someone else: an empty profile of their own, with their own CV and writing', JSON.stringify(alex));
  ok(JSON.stringify(alex.sel) === '["Yannie D. Forest","Alex Rivera","Add or manage profiles…"]' && alex.selected === 'Alex Rivera', 'the switcher at the top names each profile, and the one open', JSON.stringify(alex.sel));
  await p.evaluate(() => { const S = IngCareer.state(); S.ui.room = 'profile'; S.ui.ppart = 'sources'; IngCareer.render(); }); await p.waitForTimeout(300);
  const srcs = await p.evaluate(() => ({ text: document.querySelector('#cs .c-work').innerText, titles: [...document.querySelectorAll('#cs .c-work .c-src b')].map(x => x.textContent) }));
  ok(/Kept in this profile only/.test(srcs.text) && /Add their CV/.test(srcs.text) && !srcs.titles.includes("Lector's readings of your apps") && !srcs.titles.includes('Your sources in Fontes') && /nothing of yours/.test(srcs.text), "someone else's sources keep nothing of hers: not her CV, her writing, nor Lector's readings", JSON.stringify(srcs.titles));
  // back to her own profile with the switcher
  const meId = await p.evaluate(() => IngCareer.root().people[0].id);
  await p.selectOption('#csWho', meId); await p.waitForTimeout(400);
  ok(await p.evaluate(() => IngCareer.state().profile.name === 'Yannie D. Forest' && IngCareer.state().profile.isMe !== false), 'the switcher opens her own profile again');
  // another side of her
  await p.evaluate(() => { window.prompt = () => 'Museums'; const S = IngCareer.state(); S.ui.room = 'profile'; S.ui.ppart = 'people'; IngCareer.render(); }); await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/profiles.png' });
  await p.click('#cs .c-newp button:has-text("Another side of me")'); await p.waitForTimeout(600);
  const side = await p.evaluate(() => { const S = IngCareer.state(), r = IngCareer.root(); return { label: r.people.filter(x => x.id === r.cur)[0].label, items: S.profile.items.length, opps: S.opps.length, me: S.profile.isMe, n: r.people.length,
    sel: document.getElementById('csWho').selectedOptions[0].textContent }; });
  ok(side.label === 'Museums' && side.items === 1 && side.opps === 0 && side.me === true && side.n === 3 && side.sel === 'Yannie D. Forest · Museums', 'Another side of me: a copy of her profile, named, with no applications', JSON.stringify(side));
  await p.selectOption('#csWho', meId); await p.waitForTimeout(300);

  // an application, read, and its checklist
  const oid = await p.evaluate(post => IngCareer.newOpp('phd', post, 'pasted').then(o => { o.read = { r: { crit: [], strengths: [], concerns: [], next: [], asks: [], wants: [] }, at: Date.now(), model: 'Test model' }; o.due = '2026-11-30'; saveState(); return o.id; }), POST);
  const found = await p.evaluate(([post, id]) => { const o = IngCareer.state().opps.find(x => x.id === id); return IngCareer.checkFind(post, o).map(x => [x.text, x.doc, !!x.quote]); }, [POST, oid]);
  const texts = found.map(x => x[0]);
  ok(['Your CV', 'A personal statement (no more than 1,000 words)', 'A research proposal (no more than 2,000 words)', 'A writing sample (no more than 5,000 words)', 'Transcripts of your degrees', '2 references', 'Proof of your English (IELTS, TOEFL or the like)'].every(t => texts.includes(t)) && found.every(x => x[2] || /^Send it before/.test(x[0])),
    'the checklist is read from its own sentences, each item with its quotation, limits and all', JSON.stringify(texts));
  ok(texts.some(t => /^Send it the way it asks: Applications must be submitted through/.test(t)) && texts.some(t => /^Send it before it closes: 30 November 2026/.test(t)) && texts.includes('Keep the interview dates free') && texts.includes('Ask your referees, and give them the posting and the date it is due'),
    'and how and when to send it, the references to ask for, and the interview dates', JSON.stringify(texts));
  // Today, before the checklist: its next step
  await p.evaluate(() => { const S = IngCareer.state(); S.ui.room = 'today'; S.ui.today = null; IngCareer.render(); }); await p.waitForTimeout(300);
  let today = await p.evaluate(() => [...document.querySelectorAll('#cs .c-list .c-item')].map(x => x.innerText.replace(/\s+/g, ' ').trim()));
  ok(today.length === 1 && /^Make its checklist DPhil in History of Science/.test(today[0]) && /30 November 2026|days? left|closes/i.test(today[0]), 'Today: the one next step of the application, with its closing date', JSON.stringify(today));
  await p.screenshot({ path: OUT + '/today.png' });
  await p.click('#cs .c-list .c-item'); await p.waitForTimeout(300);
  await p.click('#cs .c-work button:has-text("Do this now")'); await p.waitForTimeout(400);
  const at = await p.evaluate(id => { const S = IngCareer.state(); return { room: S.ui.room, open: S.ui.open, step: S.opps.find(x => x.id === id).step, bar: document.querySelector('#cs .c-steps [aria-current="step"]') && document.querySelector('#cs .c-steps [aria-current="step"]').textContent }; }, oid);
  ok(at.room === 'apps' && at.open === oid && at.step === 'check' && /Checklist/.test(at.bar), 'Do this now goes straight to it: the Checklist step', JSON.stringify(at));
  // Step by step: each found item, kept or dropped
  await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); o.way = 'step'; IngCareer.render(); }, oid); await p.waitForTimeout(200);
  await p.click('#cs .c-work button:has-text("Find what it asks for")'); await p.waitForTimeout(400);
  const sug = await p.evaluate(() => { const c = document.querySelector('#cs .c-ck-sug'); return c ? c.innerText.replace(/\s+/g, ' ') : null; });
  ok(sug && /Found in the posting · \d+ to look at/.test(sug) && /Your CV/.test(sug) && /“Applicants must submit a CV/.test(sug), 'Step by step: each item found is offered with its sentence, to keep or drop', sug);
  await p.screenshot({ path: OUT + '/checklist-step.png' });
  await p.click('#cs .c-ck-sug button:has-text("Keep it")'); await p.waitForTimeout(200);
  await p.click('#cs .c-ck-sug button:has-text("Drop it")'); await p.waitForTimeout(200);
  await p.click('#cs .c-ck-sug button:has-text("Keep all")'); await p.waitForTimeout(300);
  const ck = await p.evaluate(id => { const C = IngCareer.state().opps.find(x => x.id === id).check; return { items: C.items.map(x => x.text), pending: C.pending.length }; }, oid);
  ok(ck.pending === 0 && ck.items[0] === 'Your CV' && !ck.items.includes('A personal statement (no more than 1,000 words)') && ck.items.length === found.length - 1, 'kept, dropped, and the rest kept in one press', JSON.stringify(ck));
  await p.click('#cs .c-work button:has-text("Find anything missed")'); await p.waitForTimeout(500);
  const more = await p.evaluate(id => { const C = IngCareer.state().opps.find(x => x.id === id).check; return { pending: C.pending.map(x => [x.text, x.src, x.quote]) }; }, oid);
  ok(more.pending.length === 1 && more.pending[0][0] === 'A prospective supervisor' && more.pending[0][1] === 'model', "Find anything missed keeps only what the model quotes word for word and the list does not already hold (a photograph the posting never asks for, and sentences already on the list, are left out)", JSON.stringify(more));
  await p.click('#cs .c-ck-sug button:has-text("Drop it")'); await p.waitForTimeout(200);
  // tick the CV off; Today's next step follows the list
  await p.evaluate(id => { const C = IngCareer.state().opps.find(x => x.id === id).check; C.items[0].done = true; saveState(); }, oid);
  const nx = await p.evaluate(id => IngCareer.nextOf(IngCareer.state().opps.find(x => x.id === id)), oid);
  ok(nx && nx.step === 'send' && nx.kind === 'proposal' && /^Write your research proposal outline$/.test(nx.text), 'Today follows the checklist: the next undone item, here a document to write', JSON.stringify(nx));
  // Not today
  await p.evaluate(() => { const S = IngCareer.state(); S.ui.room = 'today'; S.ui.today = null; IngCareer.render(); }); await p.waitForTimeout(200);
  await p.click('#cs .c-list .c-item'); await p.waitForTimeout(200); await p.click('#cs .c-work button:has-text("Not today")'); await p.waitForTimeout(300);
  const rest = await p.evaluate(() => ({ items: [...document.querySelectorAll('#cs .c-list > .c-pn-b > .c-item')].length, fold: [...document.querySelectorAll('#cs .c-list summary')].map(s => s.textContent) }));
  ok(rest.items === 0 && rest.fold.includes('Resting today (1)'), 'Not today: it rests until tomorrow, out of the way', JSON.stringify(rest));

  // the new documents
  const kinds = await p.evaluate(() => ({ phd: IngCareer.FOR.phd, docs: Object.keys(IngCareer.docs).map(k => IngCareer.docs[k][0]) }));
  ok(['purpose', 'sample', 'funding'].every(k => kinds.phd.includes(k)) && ['Statement of purpose', 'Teaching statement', 'Funding application', 'Writing sample: which to send'].every(t => kinds.docs.includes(t)), 'the new documents: statement of purpose, teaching statement, funding application, the writing sample', JSON.stringify(kinds));
  // Step by step: a plan first
  await p.evaluate(id => { const S = IngCareer.state(), o = S.opps.find(x => x.id === id); S.ui.room = 'apps'; S.ui.open = id; o.step = 'send'; o.sv = { kind: 'purpose' }; o.way = 'step'; IngCareer.render(); }, oid); await p.waitForTimeout(300);
  await p.click('#cs .c-work button:has-text("Plan it with me")'); await p.waitForTimeout(500);
  const plan = await p.evaluate(() => { const t = document.querySelector('#cs textarea.c-plan'); return t ? t.value : null; });
  ok(plan && plan.split('\n').length === 5 && plan.includes(PLAN_LINE), 'Step by step: a plan first, part by part, for her to change', plan);
  await p.screenshot({ path: OUT + '/plan.png' });
  await p.fill('#cs textarea.c-plan', plan.replace('Afterwards: teaching and curating', 'Afterwards: curating, above all'));
  await p.click('#cs .c-work button:has-text("Write it from this plan")'); await p.waitForTimeout(800);
  const wrote = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); const a = window.__asked.filter(u => /^Write my statement of purpose/.test(u)).pop() || ''; return { doc: !!o.docs.purpose, plan: /FOLLOW THIS PLAN, WHICH I APPROVED/.test(a) && a.includes('Afterwards: curating, above all') }; }, oid);
  ok(wrote.doc && wrote.plan, 'the writing follows the plan she approved, with her change', JSON.stringify(wrote));
  // an improvement, change by change
  await p.click('#cs .c-work button:has-text("Improve it")'); await p.waitForTimeout(300);
  await p.fill('#cs .c-improve textarea', 'Make it shorter.'); await p.click('#cs .c-work .c-pn-f button:has-text("Improve it")'); await p.waitForTimeout(800);
  const cards = await p.evaluate(() => [...document.querySelectorAll('#cs .c-rv-card')].map(c => c.innerText.replace(/\s+/g, ' ')));
  ok(cards.length === 2 && /Change 1 of 2/.test(cards[0]) && /Before At Oxford I studied/i.test(cards[0]) && /After At Oxford I read/i.test(cards[0]) && /Change 2 of 2/.test(cards[1]), 'the improvement waits change by change, each with its before and after', JSON.stringify(cards));
  await p.screenshot({ path: OUT + '/review.png' });
  await p.click('#cs .c-rv-card >> nth=0 >> button:has-text("Why this change?")'); await p.waitForTimeout(400);
  ok(/Why: It is shorter, as you asked/.test(await p.evaluate(() => document.querySelector('#cs .c-rv-card').innerText)), 'Why this change? gives one plain sentence');
  await p.click('#cs .c-rv-card >> nth=0 >> button:has-text("Keep the change")'); await p.waitForTimeout(200);
  await p.click('#cs .c-rv-card >> nth=1 >> button:has-text("Keep my words")'); await p.waitForTimeout(200);
  await p.click('#cs .c-work .c-pn-f button:has-text("Done")'); await p.waitForTimeout(500);
  const fin = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); return Promise.all([IngBig.load(o.docs.purpose.ref), IngBig.load(o.older.purpose[0].ref)]).then(t => ({ now: t[0], before: t[1], review: !!o.review, note: o.docs.purpose.note })); }, oid);
  ok(fin.now === [SOP[0], 'At Oxford I read the Museum archives closely.', SOP[2], SOP[3]].join('\n\n') && fin.before === SOP.join('\n\n') && !fin.review && /1 of 2 changes kept, one by one/.test(fin.note), 'Done keeps exactly what she chose, and the version before is one press away', JSON.stringify(fin));
  // Guide me: a guide, and nothing written for her
  await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); o.way = 'guide'; o.sv = { kind: 'teaching' }; IngCareer.render(); }, oid); await p.waitForTimeout(300);
  await p.click('#cs .c-work button:has-text("Guide me to write it")'); await p.waitForTimeout(600);
  const gd = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); const g = document.querySelector('#cs .c-guide'); return { doc: !!o.docs.teaching, view: o.sv && o.sv.kind, guide: g ? g.innerText : null, draft: document.querySelector('#cs .c-mine textarea') ? document.querySelector('#cs .c-mine textarea').value : null }; }, oid);
  ok(!gd.doc && gd.view === 'mine' && gd.guide && /What question drives you\?/.test(gd.guide) && gd.draft === '', 'Guide me: a guide beside her own draft; nothing is written for her', JSON.stringify(gd));
  await p.screenshot({ path: OUT + '/guide.png' });
  // nothing of one profile in another
  const iso = await p.evaluate(() => { const r = IngCareer.root(); return r.people.map(x => [x.profile.name || '', x.label || '', (x.opps || []).length]); });
  ok(iso[0][2] === 1 && iso[1][2] === 0 && iso[2][2] === 0, 'each profile keeps its own applications', JSON.stringify(iso));
  ok(errs.length === 0, 'no page errors', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
