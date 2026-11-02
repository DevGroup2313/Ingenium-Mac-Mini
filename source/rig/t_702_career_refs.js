// node rig/t_702_career_refs.js <Ingenium page url> <out dir>
// 6.9.2: the Career Studio's referees (modules/r188.js), in Chromium, with a stand-in model. Her words (31 October 2026): "I
// want to be able to use it for PhD applications and for job applications" and "automate where I want and also meticulously
// review and do on my own at my own pace". So each application keeps who will speak for her and where each stands (to ask,
// asked, agreed, sent, thanked); Today says when to choose them and when to follow up; the request is written for her to send.
//   - the checklist's "Ask your referees" line opens the referees; with none, Today says "Choose your referees";
//   - a referee added by name and one from the profile's Referees entries, each due three days before the closing date;
//   - Mark asked sets the day; after ten days with nothing back, Today says "Follow up with X";
//   - Write the request: the prompt carries the referee's name and the due date, and the email is kept with the application;
//   - Track says the referees in short; every part ran; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const POST = 'DPhil in History of Science\nUniversity of Exampleton\nApplicants must submit a CV and a research proposal of no more than 2,000 words.\nTwo academic references are required.\nThe closing date is 30 November 2026.\n' + 'x'.repeat(40);
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
      if (/^Write an email from me/.test(u)) out = 'Subject: A reference for my DPhil application\n\nDear Professor Babbage,\n\nWould you be willing to write a reference for my application? It is due by the date given.\n\nYours sincerely,\nAda Lovelace';
      else if (/^Below is the draft of my/.test(u)) out = (u.split('THE DRAFT:\n')[1] || '');
      if (onPiece) onPiece(out); return Promise.resolve(out); };
    const P = IngCareer.state().profile; P.name = 'Ada Lovelace'; P.items.push({ id: 'i1', sec: 'education', title: 'MSt in History', place: 'Oxford', from: '2020', to: '2021', text: '', src: 'me' },
      { id: 'r1', sec: 'referee', title: 'Dr Mary Somerville', place: 'Royal Society', from: '', to: '', text: 'My tutor in 2020.', src: 'me' }); saveState(); });
  const id = await p.evaluate(post => IngCareer.newOpp('phd', post, 'pasted').then(o => { o.read = { r: { crit: [], strengths: [], concerns: [], next: [], asks: [], wants: [] }, at: Date.now(), model: 'Test model' }; o.due = '2026-12-03'; o.way = 'auto'; IngLector.plan = () => null; saveState(); return o.id; }), POST);
  // the checklist's references line opens the referees; Today says to choose them
  await p.evaluate(id => IngCareer.makeCheck(IngCareer.state().opps.find(x => x.id === id)), id); await p.waitForTimeout(500);
  await p.evaluate(() => { IngLector.plan = () => ({ chosen: { id: 'test-model', customName: 'Test model' } }); });
  const ck = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); const first = IngCareer.nextOf(o).text; o.check.items.forEach(x => { if (x.doc === 'cv' || x.doc === 'proposal') x.done = true; }); saveState(); return { first, refs: o.check.items.filter(x => x.doc === 'refs').map(x => x.text), next: IngCareer.nextOf(o) }; }, id);
  ok(ck.first === 'Write your tailored CV' && ck.refs.join('|') === '2 references|Ask your referees, and give them the posting and the date it is due' && ck.next.kind === 'refs' && ck.next.text === 'Choose your referees' && /Ask early/.test(ck.next.why), 'the checklist keeps its order (the CV first); when the references lines are next and no referee is chosen, Today says "Choose your referees"', ck);
  await p.evaluate(id => { const S = IngCareer.state(), o = S.opps.find(x => x.id === id); S.ui.room = 'apps'; S.ui.open = id; S.ui.show = 'work'; o.step = 'check'; go('career'); IngCareer.render(); }, id); await p.waitForTimeout(500);
  const ckKey = await p.evaluate(() => [...document.querySelectorAll('#cs .c-ck li')].filter(x => /references|referees/.test(x.textContent)).map(li => [...li.querySelectorAll('.c-ck-acts .c-btn')].map(x => x.textContent)[0]));
  ok(ckKey.join('|') === 'Choose them|Choose them', 'both references lines of the checklist have a key to the referees', ckKey);
  await press('Choose them', '#cs .c-ck');
  const pane = await p.evaluate(() => ({ v: IngCareer.state().opps[0].sv, h3: (document.querySelector('#cs .c-pane .c-h3') || {}).textContent, nav: [...document.querySelectorAll('#cs .c-nav .c-item b')].map(x => x.textContent) }));
  ok(pane.v && pane.v.kind === 'refs' && pane.h3 === 'Your referees' && pane.nav.includes('Your referees') && pane.nav.includes('Your reading list'), 'it opens the Referees pane, listed in What you send beside the documents and emails', pane);
  // one by name, one from the profile
  await p.evaluate(() => { const ins = document.querySelectorAll('#cs .c-pane .c-row input[type=text]'); ins[0].value = 'Prof. Charles Babbage'; ins[1].value = 'Professor of Mathematics'; ins[2].value = 'babbage@example.org'; });
  await press('Add by name', '#cs .c-pane');
  await p.evaluate(() => { const s = [...document.querySelectorAll('#cs .c-pane select')].find(x => /From your profile/.test(x.textContent)); s.value = 'r1'; s.dispatchEvent(new Event('change')); }); await p.waitForTimeout(300);
  const refs = await p.evaluate(id => IngCareer.state().opps.find(x => x.id === id).refs.map(r => [r.name, r.role, r.status, r.due]), id);
  ok(refs.length === 2 && refs[0][0] === 'Prof. Charles Babbage' && refs[0][1] === 'Professor of Mathematics' && refs[0][2] === 'toask' && refs[0][3] === '2026-11-30' && refs[1][0] === 'Dr Mary Somerville' && refs[1][1] === 'Royal Society' && refs[1][3] === '2026-11-30',
    'two referees: one by name, one from the profile\'s Referees entries, each due three days before the closing date (to change)', refs);
  await p.screenshot({ path: OUT + '/referees.png' });
  // asked; then followed up after ten days
  await press('Mark asked', '#cs .c-ref');
  const asked = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); return { st: o.refs[0].status, at: Date.now() - o.refs[0].asked < 5000, next: IngCareer.nextOf(o).text }; }, id);
  ok(asked.st === 'asked' && asked.at && !/^Follow up/.test(asked.next), 'Mark asked keeps the day; Today does not nag yet', asked);
  const fu = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); o.refs[0].asked = Date.now() - 11 * 864e5; saveState(); return IngCareer.nextOf(o); }, id);
  ok(fu.kind === 'refs' && fu.text === 'Follow up with Prof. Charles Babbage' && /ten days/.test(fu.why), 'eleven days after asking with nothing back, Today says "Follow up with Prof. Charles Babbage"', fu);
  ok((await p.evaluate(id => IngCareer.estimateOf(IngCareer.state().opps.find(x => x.id === id), IngCareer.nextOf(IngCareer.state().opps.find(x => x.id === id))), id)) === 10, 'a follow-up is a ten-minute step');
  // the request, written with the name and the due date
  await p.evaluate(() => IngCareer.render()); await p.waitForTimeout(200);
  await press('Write the request', '#cs .c-ref'); await idle(); await p.waitForTimeout(500);
  const em = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id), u = window.__asked.find(x => /^Write an email from me/.test(x)) || ''; return { u, email: o.emails[0] && [o.emails[0].role, o.emails[0].purpose], view: o.sv && o.sv.kind, mail: (document.querySelector('#cs .c-mail') || {}).textContent || '' }; }, id);
  ok(/to a referee, to ask for a reference, about DPhil in History of Science/.test(em.u) && /Also: The referee is Prof\. Charles Babbage, Professor of Mathematics\. The reference is due by 30 November 2026\./.test(em.u), 'the request carries the referee\'s name, post and the date it is due', em.u.slice(0, 400));
  ok(em.email && em.email[0] === 'referee' && em.email[1] === 'reference' && em.view === 'email' && /^Subject: A reference/.test(em.mail), 'the email is kept with the application and shown', em);
  // Track, in short
  await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); o.step = 'track'; IngCareer.render(); }, id); await p.waitForTimeout(300);
  const tr = await p.evaluate(() => (document.querySelector('#cs .c-work') || {}).innerText || '');
  ok(/2 referees: Prof\. Charles Babbage \(asked\), Dr Mary Somerville \(to ask\)\./.test(tr) && /Reference from Prof\. Charles Babbage due/.test(tr), 'Track says the referees in short, and lists each reference due among its dates', tr.slice(0, 300));
  ok(await p.evaluate(() => Object.keys(window.__ingParts).every(k => window.__ingParts[k] === 'running')), 'every part of the page ran to its end');
  ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
