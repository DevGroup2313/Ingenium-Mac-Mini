// node rig/t_658_mentor.js <Ingenium page url (master or full)> <out dir>
// Ingenium 6.58 (8 November 2026), in Chromium, with a stand-in model (the person, her CV and her answers are invented). Her words
// (8 November 2026): "I am still unclear on what exactly I am looking for so I would like for Ingenium to provide that inside of the app
// and be my in-app recruiter/mentor/counselor/headhunter"; "I want them to spot skills and experience that I have show me how it can be
// transferred ... spot my blindspots"; and the Career Studio "is not really AuDHD accessible". She chose four sources for the mentor:
// her CV and documents, Lector's readings of her apps, her LinkedIn export, and a short talk.
//   - the Career Studio has a room Your mentor, second after Today, with its seven steps in view and the next one marked;
//   - step 1: the CV added through the page's own file picker shows as read;
//   - step 2: eight questions, one at a time, each skippable; an answer survives the page being opened again halfway; finished, the
//     answers fill What you are looking for;
//   - Do the rest for me runs the steps that need the model in order: entries and skills found and kept together (not one list
//     replacing the other), what transfers, blind spots, what sets her apart, paths that fit, her CV looked at;
//   - step 3 shows the found entries one at a time; Keep puts one in her profile, Drop lets it go; the step is then done;
//   - step 7, the summary: this week, what to add to her CV, blind spots, paths; Today names the mentor's next step;
//   - Stop stops the steps after the one running; what was finished is kept;
//   - a second profile has a mentor of its own; no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 900) : '')); } }
const CV = 'Rosalind Okafor\nCurriculum vitae\n\nEducation\nMA in Education, Northgate University, 2019 to 2021. Dissertation on the design of online courses.\n\nWork\nLearning technologist, Westbrook College, 2021 to 2024. Designed three online modules used by 900 students; trained 40 teachers.\n\nProjects\nBuilt a study planner app used by 120 students.\n';
async function stand(p, slow) {
  await p.evaluate((slow) => {
    const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^mfake/.test(m.id));
    state.models.push({ id: 'mfake12', customName: 'Stand-in 12B', fileState: 'ready', fileName: L['gemma-4-12b'].file, stored: true }); saveState();
    window.__asked = [];
    lxAsk = function (run, msgs, max, temp, onPiece) { const u = msgs[msgs.length - 1].content; window.__asked.push(u.slice(0, 200)); let out = 'Nothing.';
      if (/List the entries of my profile/.test(u)) out = 'ENTRY: education | MA in Education | Northgate University | 2019 | 2021 | Dissertation on the design of online courses\nENTRY: post | Learning technologist | Westbrook College | 2021 | 2024 | Designed three online modules used by 900 students';
      else if (/List the skills my sources show/.test(u)) out = 'SKILL: Instructional design | BOTH | three online modules used by 900 students | the skills section of a CV\nSKILL: App development | PROFESSIONAL | a study planner used by 120 students | a portfolio';
      else if (/that transfer/.test(u)) out = 'TRANSFER: Training adults | trained 40 teachers | learning design posts | Trained 40 teachers to teach online.';
      else if (/blind spots/i.test(u)) out = 'BLIND: UNDERSOLD | the study planner app | a reader will not know it exists | add it to Projects with its 120 users';
      else if (/sets me apart/.test(u)) out = 'EDGE: Builds the tools she designs for | a study planner and three modules | I design learning and build the software for it.\nPOSITION: PROFESSIONAL | A learning designer who builds.';
      else if (/clear direction/.test(u)) out = 'PATH: Learning designer in an education technology company | remote and flexible work | three modules, 900 students | a portfolio online | Put the planner and one module in a portfolio | Apply to five posts | Leaves room for a doctorate\nFIND: Which companies hire learning designers remotely? | Read ten postings';
      else if (/Give me suggestions, the most useful first/.test(u)) out = 'STRENGTHEN: the Work section | give the number of students for each module\nADD: the study planner app | under Projects, with its users\nNEXT: add the app to Projects | today';
      const send = () => { if (onPiece) onPiece(out); return out; };
      return slow ? new Promise(r => setTimeout(() => r(send()), slow)) : Promise.resolve(send()); };
  }, slow || 0); }
async function open(b) { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer && IngCareer.mentor, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd && tourEnd(); } catch (e) {} });
  await p.waitForTimeout(400); return { ctx, p, errs }; }
const idle = p => p.waitForFunction(() => !IngCareer.run.busy && !IngCareer.mentor.state().chain, null, { timeout: 120000 });
async function press(p, text, scope) { const b = p.locator((scope || '#cs') + ' button', { hasText: text }).first(); await b.click(); await p.waitForTimeout(350); }
(async () => {
  const b = await pw.chromium.launch(); let A = await open(b), p = A.p;
  await stand(p);
  await p.evaluate(() => { const S = IngCareer.state(); S.profile.name = 'Rosalind Okafor'; S.ui.room = 'mentor'; saveState(); go('career'); IngCareer.render(); });
  await p.waitForTimeout(600);
  // 1. the room and its steps
  const tabs = await p.evaluate(() => [...document.querySelectorAll('#cs .rm-tabs [data-room]')].map(t => t.textContent.trim()));
  ok(tabs[1] === 'Your mentor', 'the Career Studio has a room Your mentor, second after Today', tabs);
  const steps = await p.evaluate(() => [...document.querySelectorAll('#cs .c-list .c-item b')].map(x => x.textContent.trim()));
  ok(steps.length === 7 && /^1\. What I can read about you/.test(steps[0]) && /^7\. Your mentor/.test(steps[6]), 'its seven steps are in view', steps);
  // 2. step 1: the CV through the page's own file picker
  const [fc] = await Promise.all([p.waitForEvent('filechooser'), press(p, 'Add', '#csWork')]);
  await fc.setFiles({ name: 'Rosalind Okafor CV.txt', mimeType: 'text/plain', buffer: Buffer.from(CV) }); await p.waitForTimeout(900);
  const s1 = await p.evaluate(() => [...document.querySelectorAll('#csWork .c-src b')].map(x => x.textContent.trim()));
  ok(/^✓ Your CV/.test(s1[0] || ''), 'step 1: the CV added through the page\'s own file picker shows as read', s1);
  await press(p, 'Next: a short talk', '#csWork .c-pn-f');
  // 3. the talk, one question at a time, with a reload halfway
  const q1 = await p.evaluate(() => ({ q: (document.querySelector('#csWork .c-today-step') || {}).textContent, n: (document.querySelector('#csWork .c-k') || {}).textContent }));
  ok(/lose track of time/.test(q1.q || '') && /Question 1 of 8/.test(q1.n || ''), 'step 2 asks one question at a time, with its place: question 1 of 8', q1);
  await p.fill('#csTalk', 'Designing courses and building small apps for them'); await press(p, 'Next', '#csWork .c-pn-f');
  await p.fill('#csTalk', 'Explaining technology to teachers'); await p.waitForTimeout(800);
  await p.reload(); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer && IngCareer.mentor, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd && tourEnd(); } catch (e) {} }); await stand(p);
  await p.evaluate(() => { go('career'); IngCareer.render(); }); await p.waitForTimeout(600);
  const back = await p.evaluate(() => ({ room: IngCareer.state().ui.room, q: (document.querySelector('#csWork .c-today-step') || {}).textContent, v: (document.getElementById('csTalk') || {}).value }));
  ok(back.room === 'mentor' && /ask you for help/.test(back.q || '') && back.v === 'Explaining technology to teachers', 'opened again halfway, the talk is where she left it, her answer kept', back);
  await press(p, 'Next', '#csWork .c-pn-f');
  await p.fill('#csTalk', 'Learning design, education technology, publishing, a doctorate in education'); await press(p, 'Next', '#csWork .c-pn-f');
  await press(p, 'Skip', '#csWork .c-pn-f');
  await p.fill('#csTalk', 'Security, flexible hours, working remotely'); await press(p, 'Next', '#csWork .c-pn-f');
  await p.fill('#csTalk', 'Long commutes'); await press(p, 'Next', '#csWork .c-pn-f');
  await p.fill('#csTalk', 'Remotely from anywhere'); await press(p, 'Next', '#csWork .c-pn-f');
  await p.fill('#csTalk', 'A doctorate with funding, applications in January'); await press(p, 'Finish the talk', '#csWork .c-pn-f');
  const wants = await p.evaluate(() => IngCareer.state().profile.wants);
  ok(/Interested in: Learning design/.test(wants.looking || '') && /Work I enjoy: Designing courses/.test(wants.looking || '') && /flexible hours/.test(wants.need || '') && /Long commutes/.test(wants.avoid || '') && /anywhere/.test(wants.where || '') && /January/.test(wants.when || ''),
    'finished, the answers fill What you are looking for (a skipped question leaves nothing)', wants);
  // 4. Do the rest for me
  await p.evaluate(() => IngCareer.mentor.rest()); await idle(p); await p.waitForTimeout(500);
  const ran = await p.evaluate(() => { const S = IngCareer.state(), E = S.edge || {}; return { sg: (S.profile.suggested || []).map(x => x.sec + ':' + x.title), tr: !!E.tr, bl: !!E.bl, ed: !!E.ed, paths: (S.paths && S.paths.list || []).length, cv: !!(E.docs && E.docs.cv), step: S.mentor.step, asked: window.__asked.length }; });
  ok(ran.sg.includes('education:MA in Education') && ran.sg.includes('skill:Instructional design'), 'entries and skills found are kept together, neither replacing the other', ran.sg);
  ok(ran.tr && ran.bl && ran.ed && ran.paths === 1 && ran.cv, 'Do the rest for me ran what transfers, blind spots, what sets her apart, paths and her CV, in order', ran);
  ok(ran.step === 'read', 'it then opens at the first step not done: her found entries to look at', ran.step);
  // 5. one at a time
  const one = await p.evaluate(() => ({ k: (document.querySelector('#csWork .c-k') || {}).textContent, cards: document.querySelectorAll('#csWork .c-entry').length, t: (document.querySelector('#csWork .c-entry b') || {}).textContent }));
  ok(one.cards === 1 && /1 of 4/.test(one.k || ''), 'step 3 shows the found entries one at a time, with how many are left', one);
  await press(p, /^Keep$/, '#csWork .c-pn-f'); await press(p, /^Drop$/, '#csWork .c-pn-f');
  await p.evaluate(() => { const b = [...document.querySelectorAll('#csWork button')].find(x => x.textContent.trim() === 'Keep all the rest'); b.click(); }); await p.waitForTimeout(300);
  const kept = await p.evaluate(() => { const P = IngCareer.state().profile; return { items: P.items.map(x => x.title), sg: (P.suggested || []).length, done: IngCareer.mentor.done('read') > 0 }; });
  ok(kept.items.includes('MA in Education') && !kept.items.includes('Learning technologist') && kept.items.includes('Instructional design') && kept.sg === 0 && kept.done, 'Keep puts one in her profile, Drop lets one go, and the step is done', kept);
  // 6. the summary and Today
  await p.evaluate(() => { IngCareer.state().mentor.step = 'sum'; IngCareer.render(); }); await p.waitForTimeout(300);
  const sum = await p.evaluate(() => [...document.querySelectorAll('#csWork .c-label')].map(x => x.textContent.trim()));
  ok(['This week, one at a time', 'What to add to your CV and letters', 'Your blind spots to mend first', 'Paths that fit'].every(t => sum.includes(t)), 'the summary: this week, what to add, blind spots, paths', sum);
  const wk = await p.evaluate(() => [...document.querySelectorAll('#csWork .c-fb')][0].textContent);
  ok(/portfolio/.test(wk) && /Projects/.test(wk), 'this week names a path\'s first step and the mend for a blind spot', wk.slice(0, 300));
  await p.screenshot({ path: OUT + '/mentor_summary.png' });
  await p.evaluate(() => { IngCareer.state().ui.room = 'today'; IngCareer.render(); }); await p.waitForTimeout(300);
  const td = await p.evaluate(() => (document.querySelector('#cs .c-td-mentor') || {}).textContent || '');
  ok(/Your mentor's (summary is ready|next step)/.test(td), 'Today names the mentor\'s next step', td);
  // 7. Stop
  await stand(p, 1500);
  await p.evaluate(() => { const E = IngCareer.state().edge; delete E.tr; delete E.bl; delete E.ed; IngCareer.state().ui.room = 'mentor'; IngCareer.render(); IngCareer.mentor.rest(); });
  await p.waitForTimeout(500); await p.evaluate(() => IngCareer.stop()); await idle(p); await p.waitForTimeout(2500);
  const st = await p.evaluate(() => { const E = IngCareer.state().edge; return { tr: !!E.tr, bl: !!E.bl, ed: !!E.ed, chain: IngCareer.state().mentor.chain, items: IngCareer.state().profile.items.length }; });
  ok(!st.bl && !st.ed && st.chain === false && st.items === 3, 'Stop stops the steps after the one running, and what was finished is kept', st);
  // 8. a second profile
  const two = await p.evaluate(async () => { const before = JSON.stringify(IngCareer.mentor.state().ans); await IngCareer.newPerson('other', 'Sam Ito', ''); const S = IngCareer.state(); return { other: S.profile.name !== 'Rosalind Okafor', ans: Object.keys(IngCareer.mentor.state().ans).length, before: before.length > 2, next: IngCareer.mentor.next() }; });
  ok(two.other && two.ans === 0 && two.next === 'sources', 'a second profile has a mentor of its own, from step 1', two);
  ok(A.errs.length === 0, 'no errors on the page', A.errs);
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
