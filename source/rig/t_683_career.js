// node rig/t_683_career.js <Ingenium page url> <out dir> [phone]
// 6.8.3: the Career Studio (modules/r188.js), in Chromium, pressed as a person presses it. A stand-in model answers every
// request (the page's lxAsk is replaced), so what the studio does with each answer is checked without a real model; every
// prompt it sends is kept and checked too. The owner's words: "a deep and thorough analysis done that tells me first how it
// matches with what I am looking for, if I fit the role and what my probablities are, and recommendation on whether to apply
// or not and clear plan for next steps"; "that will not sugarcoat anything, that will not invent skills or experiences that
// I do not possess"; "Tell me and I forget. Teach me and I remember. Involve me and I learn."; and of its look: "The Career
// Studio needs to be redesigned to match the rest of the app and its sleek elegant and elevated look. I want it to be AUDHD
// acessible and organised. I don't want to be endlessly scrolling on this new page". So the page itself never scrolls: in
// every room, at every step, the page fits the window and only its panels scroll.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const zlib = require('zlib');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(d).slice(0, 300))); c ? pass++ : fail++; };
// a LinkedIn export as LinkedIn sends it: a .zip of .csv files (deflated), some with a note above their header
function zip(files) { const loc = [], cen = []; let off = 0;
  for (const [name, text] of files) { const raw = Buffer.from(text, 'utf8'), data = zlib.deflateRawSync(raw), nm = Buffer.from(name);
    const crc = zlib.crc32 ? zlib.crc32(raw) : 0; const lh = Buffer.alloc(30); lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(8, 8); lh.writeUInt32LE(crc >>> 0, 14); lh.writeUInt32LE(data.length, 18); lh.writeUInt32LE(raw.length, 22); lh.writeUInt16LE(nm.length, 26);
    const ch = Buffer.alloc(46); ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(8, 10); ch.writeUInt32LE(crc >>> 0, 16); ch.writeUInt32LE(data.length, 20); ch.writeUInt32LE(raw.length, 24); ch.writeUInt16LE(nm.length, 28); ch.writeUInt32LE(off, 42);
    loc.push(lh, nm, data); cen.push(ch, nm); off += 30 + nm.length + data.length; }
  const c = Buffer.concat(cen), e = Buffer.alloc(22); e.writeUInt32LE(0x06054b50, 0); e.writeUInt16LE(files.length, 8); e.writeUInt16LE(files.length, 10); e.writeUInt32LE(c.length, 12); e.writeUInt32LE(off, 16);
  return Buffer.concat(loc.concat([c, e])); }
fs.writeFileSync(OUT + '/linkedin.zip', zip([['Profile.csv', 'First Name,Last Name,Headline,Summary\n"Ada","Lovelace","Researcher in the history of computing","I write about early machines."\n'],
  ['Positions.csv', 'Company Name,Title,Description,Location,Started On,Finished On\n"Analytical Society","Research Assistant","Catalogued 312 letters, with notes","London","Sep 2019","Jun 2021"\n'],
  ['Education.csv', 'School Name,Start Date,End Date,Notes,Degree Name,Activities\n"University of London","2017","2019","","MA in History",""\n'],
  ['Skills.csv', 'Notes:\n"This file lists your skills"\nName\n"Archival research"\n"Palaeography"\n'],
  ['Languages.csv', 'Notes:\n"Languages you have added"\n\nName,Proficiency\n"French","Professional working proficiency"\n'],
  ['Connections.csv', 'First Name,Last Name\n"A","B"\n']]));
fs.writeFileSync(OUT + '/cv.txt', 'Ada Lovelace\nEducation\nMA in History, University of London, 2017 to 2019 (Distinction)\nMSc in Digital Humanities, King\'s College London, 2021 to 2022\nPosts\nResearch Assistant, Analytical Society, 2019 to 2021: catalogued 312 letters.\nTutor in History, 2022 to 2024: taught 40 undergraduates in seminars of 12.\nApps\nBuilt four offline apps alone, the largest of 28,000 lines.\n');
const POST = 'Lecturer in Digital History\nUniversity of Oxbridge\nWe seek a lecturer in digital history.\nEssential:\n- A PhD in history or a related field\n- Experience of teaching undergraduates\n- Skill in archival research\n- Experience of building digital tools\nDesirable:\n- Palaeography\n- Grant writing\nSalary £40,000. Full time, in Oxbridge.\nThe closing date is 30 November 2026. Apply with a CV and a cover letter.\n';
(async () => {
  const phone = process.argv[4] === 'phone';
  const b = await pw.chromium.launch(); const ctx = await b.newContext(phone ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, acceptDownloads: true } : { viewport: { width: 1440, height: 950 }, acceptDownloads: true });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const outside = []; p.on('request', r => { const u = r.url(); if (/^https?:/.test(u) && !/^https?:\/\/(127\.0\.0\.1|localhost)/.test(u)) outside.push(u); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  // a model ready (stand-in), and the stand-in itself
  await p.evaluate(() => {
    const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^mfake/.test(m.id));
    state.models.push({ id: 'mfake12', customName: 'Stand-in 12B', fileState: 'ready', fileName: L['gemma-4-12b'].file, stored: true }); saveState();
    window.__asks = [];
    lxAsk = function (run, msgs, max, temp, onPiece) { const s = msgs[0].content, u = msgs[1].content; window.__asks.push({ s, u, run }); let out = '';
      if (/examiner of a draft/.test(s)) { out = (u.split('THE DRAFT:\n')[1] || '').replace(/ I taught 9,999 students\./, ''); }
      else if (/CRITERION: the criterion/.test(u)) out = ['TITLE: Lecturer in Digital History', 'ORGANISATION: University of Oxbridge', 'CLOSES: 30 November 2026', 'KIND: JOB',
        'WANT: An academic post in digital history | MATCHES | A lectureship in digital history', 'WANT: Work in London | DOES NOT MATCH | Full time, in Oxbridge',
        'CRITERION: A PhD in history or a related field | ESSENTIAL | NOT SHOWN | none', 'CRITERION: Experience of teaching undergraduates | ESSENTIAL | MET | Tutor in History, taught 40 undergraduates',
        '**CRITERION:** Skill in archival research | ESSENTIAL | MET | catalogued 312 letters', 'CRITERION: Experience of building digital tools | ESSENTIAL | PARTLY | built four offline apps alone',
        'CRITERION: Palaeography | DESIRABLE | MET | Palaeography (LinkedIn)', 'CRITERION: Grant writing | DESIRABLE | NOT SHOWN | none',
        'STRENGTH: Teaching and archival work are shown plainly.', 'CONCERN: The post asks for a PhD; the profile shows two master\'s degrees and no PhD.',
        'NEXT: Ask whether a candidate near the end of a doctorate would be considered.', 'ASK: Is a PhD in progress acceptable?'].join('\n');
      else if (/Write my CV/.test(u)) out = '## Education\n**MA in History, University of London**, 2017 to 2019\n- Graduated with a distinction.\n\n## Teaching\n**Tutor in History**, [the place], 2022 to 2024\n- Taught 40 undergraduates in seminars of 12. I taught 9,999 students.\n- Led 47 seminars.\n\n## Skills\n- Archival research: catalogued 312 letters.';
      else if (/Write my cover letter/.test(u)) out = 'Dear [the reader\'s name],\n\nI apply for the post of Lecturer in Digital History at the University of Oxbridge. My teaching and my archival work suit it.\n\nAs Tutor in History I taught 40 undergraduates in seminars of 12. As Research Assistant I catalogued 312 letters.\n\nI built four offline apps alone, the largest of 28,000 lines.\n\nThe post asks for a PhD, which I do not yet hold.\n\nYours faithfully,\n\nAda Lovelace';
      else if (/Write an email from me/.test(u)) out = 'Subject: A doctoral project on early computing\n\nDear [their name],\n\nI write to ask whether you would consider supervising a DPhil on early computing.\n\nYours sincerely,\nAda Lovelace';
      else if (/frank, kind tutor/.test(s)) out = '**MEETS:** PARTLY\nWORKS: You name a concrete task and a figure.\nMISSING: What came of it.\nASK YOURSELF: What changed because of your catalogue?';
      else if (/interviewer preparing questions/.test(s)) out = [1, 2, 3, 4, 5, 6, 7, 8].map(i => 'Q: Question ' + i + ' about the post?').join('\n');
      else if (/frank, kind reviewer/.test(s)) out = 'WORKS: The opening is direct.\nMISSING: Grant writing is not answered.\nUNSUPPORTED: "I won three prizes"\nWORDING: "very passionate": plainer without it.\nNEXT: Answer the PhD criterion first.';
      else if (/listing the skills the sources show/.test(s)) out = 'SKILL: Archival research | ACADEMIC | catalogued 312 letters (CV) | CV, Skills; a statement\nSKILL: Software design | BOTH | four offline apps, as Lector read them | CV, Projects\nSKILL: Flying | PROFESSIONAL | none | CV';
      else if (/listing the entries of a profile/.test(s)) out = 'ENTRY: education | MSc in Digital Humanities | King\'s College London | 2021 | 2022 | \nENTRY: education | MA in History | University of London | 2017 | 2019 | already there';
      else if (/mentor helping me plan/.test(s)) out = 'STEP: Write to two possible supervisors | in two weeks | They decide whether a project is possible.\nSTEP: Draft the proposal\'s question | 2026-12-01 | Everything follows from it.';
      else if (/frank careers adviser\. You name kinds/.test(s)) out = 'ROLE: A DPhil in the history of computing | two master\'s degrees and four apps | a supervisor | write to supervisors\nROLE: Research software engineer in the humanities | four offline apps | a portfolio | gather the apps\' readings\nROLE: Digital archivist | catalogued 312 letters | a professional qualification | look at the courses';
      else out = 'Nothing.';
      if (onPiece) onPiece(out); return Promise.resolve(out); };
  });
  // pressing: a key found by its words (inside a part of the page when asked), pressed where a person would
  const press = async (text, within) => { const bb = await p.evaluate(([text, within]) => { const root = document.querySelector(within || '#cs') || document; const k = [...root.querySelectorAll('button')].find(x => x.offsetParent && (x.textContent.trim() === text || (x.querySelector('b') && x.querySelector('b').textContent.trim() === text) || (x.querySelector('span') && x.querySelector('span').textContent.trim() === text)));
      if (!k) return null; k.scrollIntoView({ block: 'center' }); const r = k.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, [text, within || null]);
    if (!bb) throw new Error('no key: ' + text + (within ? ' in ' + within : '')); await p.mouse.click(bb[0], bb[1]); await p.waitForTimeout(350); };
  const idle = () => p.waitForFunction(() => !IngCareer.run.busy, null, { timeout: 60000 });
  const work = () => p.evaluate(() => (document.querySelector('#cs .c-work') || {}).innerText || '');
  const shot = async name => { const sfx = phone ? '-phone' : ''; await p.screenshot({ path: OUT + '/' + name + sfx + '.png' });
    await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await p.waitForTimeout(250); await p.screenshot({ path: OUT + '/' + name + sfx + '-night.png' });
    await p.evaluate(() => document.body.setAttribute('data-theme', 'day')); await p.waitForTimeout(150); };
  // the page never scrolls: it fits the window, and only the panels scroll
  const fits = [];
  const fitCheck = async where => { const f = await p.evaluate(() => { const se = document.scrollingElement, m = document.querySelector('.main'); const pn = [...document.querySelectorAll('#cs .c-pn')].filter(x => x.offsetParent).map(x => Math.round(x.getBoundingClientRect().bottom));
      const cs = document.getElementById('cs'); return { page: se.scrollHeight - se.clientHeight, main: m ? m.scrollHeight - m.clientHeight : 0, bottom: Math.max(...pn), h: innerHeight, ch: cs.style.getPropertyValue('--c-h'), top: Math.round(cs.getBoundingClientRect().top), ms: m ? m.scrollTop : 0, ss: se.scrollTop, csh: Math.round(cs.getBoundingClientRect().height), kids: [...cs.querySelectorAll('.c-pn')].map(x => Math.round(x.getBoundingClientRect().height) + ':' + Math.round(x.scrollHeight)) }; }); fits.push([where, f]); };
  // 1. its place in the menu, after Lector
  const nav = await p.evaluate(() => { const ks = [...document.querySelectorAll('.nav-btn')].map(x => x.getAttribute('data-page')); return { has: ks.includes('career'), after: ks[ks.indexOf('career') - 1] }; });
  ok(nav.has && nav.after === 'lector', 'the Career Studio has its own key in the main menu, after Lector', JSON.stringify(nav));
  if (phone) await p.evaluate(() => go('career')); else { const bb = await p.evaluate(() => { const r = document.querySelector('.nav-btn[data-page="career"]').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }); await p.mouse.click(bb[0], bb[1]); }
  await p.waitForTimeout(700);
  const rooms = await p.evaluate(() => [...document.querySelectorAll('#cs .rm-tabs [data-room]')].map(x => x.textContent.trim()));
  ok(await p.evaluate(() => document.getElementById('page-career').classList.contains('active')) && rooms.join('|') === 'Today|Applications|Your profile|Goals and plan|Learn', 'pressed, it opens on its rooms (Today since 6.8.12), in the keys Settings uses for its rooms', rooms.join('|'));
  ok(await p.evaluate(() => /not a job board/.test(document.querySelector('#cs .c-list').innerText) && (innerWidth < 900 || /Tell me and I forget\. Teach me and I remember\. Involve me and I learn\./.test(document.querySelector('#cs .c-work').innerText))), 'with nothing brought yet: how it works, her words at its head, and that it is not a job board');
  await fitCheck('Applications, nothing yet'); await shot('intro');
  // 2. the profile: who, what she is looking for, her CV (shared with Lector), an entry, LinkedIn
  await press('Your profile', '#cs .rm-tabs'); await press('About you');
  await p.fill('#cs .c-work input[type=text] >> nth=0', 'Ada Lovelace'); await p.fill('#cs .c-work input[type=text] >> nth=1', 'ada@example.org · Oxford'); await p.keyboard.press('Tab');
  if (phone) await press('‹ Your profile'); await press('What you are looking for');
  const wantsTa = await p.$$('#cs .c-work textarea'); await wantsTa[0].fill('An academic post in digital history'); await wantsTa[3].fill('London'); await p.keyboard.press('Tab');
  await fitCheck('Your profile, what you are looking for');
  if (phone) await press('‹ Your profile'); await press('What the studio may use');
  let fc = p.waitForEvent('filechooser'); await press('Add your CV'); await (await fc).setFiles(OUT + '/cv.txt'); await p.waitForTimeout(700);
  const cvKept = await p.evaluate(() => ({ me: !!(IngLector.state().me.cv), name: IngLector.state().me.cv && IngLector.state().me.cv.name, studio: IngCareer.state().profile.name, wants: IngCareer.state().profile.wants }));
  ok(cvKept.me && cvKept.name === 'cv.txt' && cvKept.studio === 'Ada Lovelace' && cvKept.wants.looking && cvKept.wants.where === 'London', 'her name, what she is looking for and her CV are kept; the CV is the one Lector keeps', JSON.stringify(cvKept));
  fc = p.waitForEvent('filechooser'); await press('Add the export'); await (await fc).setFiles(OUT + '/linkedin.zip'); await p.waitForTimeout(1200);
  const li = await p.evaluate(() => { const P = IngCareer.state().profile; return { items: P.items.filter(i => i.src === 'linkedin').map(i => i.sec + ':' + i.title + (i.place ? '@' + i.place : '')), n: P.linkedin && P.linkedin.n }; });
  ok(li.items.includes('post:Research Assistant@Analytical Society') && li.items.includes('education:MA in History@University of London') && li.items.includes('skill:Archival research') && li.items.includes('skill:Palaeography') && li.items.includes('language:French') && li.n === 5,
    'her LinkedIn export (.zip) gives her posts, studies, skills and languages as entries (the notes above two headers passed over; connections not read)', JSON.stringify(li));
  await fitCheck('Your profile, sources'); await shot('sources');
  if (phone) await press('‹ Your profile'); await press('Your entries'); await press('Add an entry');
  await p.selectOption('#csEntry select', 'teaching'); await p.fill('#csEntry input[type=text] >> nth=0', 'Tutor in History'); await p.fill('#csEntry input[type=text] >> nth=2', '2022'); await p.fill('#csEntry input[type=text] >> nth=3', '2024');
  await p.fill('#csEntry textarea', 'Taught 40 undergraduates in seminars of 12.'); await press('Keep it');
  ok(await p.evaluate(() => IngCareer.state().profile.items.some(i => i.sec === 'teaching' && i.title === 'Tutor in History' && /40 undergraduates/.test(i.text))), 'an entry written in the form is kept in its section');
  const ents = await p.evaluate(() => ({ cards: document.querySelectorAll('#cs .c-entry').length, pills: [...document.querySelectorAll('#cs .c-filter .c-pill')].map(x => x.textContent) }));
  ok(ents.cards === 6 && ents.pills[0] === 'All (6)' && ents.pills.includes('Teaching (1)'), 'her entries side by side as cards, with a key for each section to see one at a time', JSON.stringify(ents));
  await press('Teaching (1)'); ok(await p.evaluate(() => document.querySelectorAll('#cs .c-entry').length === 1), 'one section at a time when chosen');
  await fitCheck('Your profile, entries'); await shot('entries');
  // entries and skills suggested from her sources: hers to keep or drop
  await press('Suggest entries'); await idle(); await p.waitForTimeout(300);
  const sug = await p.evaluate(() => ({ s: (IngCareer.state().profile.suggested || []).map(x => x.title), head: (document.querySelector('#cs .c-work h2') || {}).textContent }));
  ok(sug.s.length === 1 && sug.s[0] === 'MSc in Digital Humanities' && sug.head === 'Found in your sources', 'entries suggested from her CV, only those not already there, shown at once for her to keep or drop', JSON.stringify(sug));
  await press('Keep'); ok(await p.evaluate(() => IngCareer.state().profile.items.some(i => i.title === 'MSc in Digital Humanities' && i.src === 'me')), 'a suggestion kept enters her entries; nothing enters by itself');
  await press('Find my skills'); await idle(); await p.waitForTimeout(300);
  const sk = await p.evaluate(() => (IngCareer.state().profile.suggested || []).map(x => x.title + ' :: ' + x.text));
  ok(sk.length === 1 && /^Software design :: Evidence: four offline apps/.test(sk[0]) && /Where it counts: Academic and professional/.test(sk[0]), 'her skills are found with their evidence and where they count; one already kept and one with no evidence are not offered', JSON.stringify(sk));
  await press('Drop them all');
  // 3. an application: pasted, read against her profile
  await press('Applications', '#cs .rm-tabs'); await press('+ Bring one'); await p.fill('#cs .c-work textarea', POST); await press('Keep it');
  await p.waitForFunction(() => IngCareer.state().opps.length === 1, null, { timeout: 15000 }).catch(() => {}); await p.waitForTimeout(400);
  let opp = await p.evaluate(() => { const o = IngCareer.state().opps[0]; return o && { title: o.title, org: o.org, closes: o.closes, due: o.due, open: IngCareer.state().ui.open === o.id, steps: [...document.querySelectorAll('#cs .c-steps li:not(.sep) span')].map(x => x.textContent.trim()), now: (document.querySelector('#cs .c-steps li.now') || {}).textContent }; });
  ok(opp && opp.title === 'Lecturer in Digital History' && opp.org === 'University of Oxbridge' && /30 November 2026/.test(opp.closes) && opp.due === '2026-11-30' && opp.open, 'a pasted posting is kept and opened, its title, organisation and closing date read from it (the date set for the tracker)', JSON.stringify(opp));
  ok(opp.steps.join('|') === 'The posting|How you fit|Checklist|What you send|Practise|Track' && /The posting/.test(opp.now), 'an application is taken in numbered steps (six since 6.8.12, with its Checklist), one on the screen at a time: it opens on The posting', JSON.stringify(opp.steps));
  await fitCheck('An application: the posting'); await shot('posting');
  await press('Read it against my profile'); await idle(); await p.waitForTimeout(400);
  const rd = await p.evaluate(() => { const w = document.querySelector('#cs .c-work'), t = w.innerText, band = w.querySelector('.c-bandcard'); return { band: band && band.getAttribute('data-band'), word: band && band.querySelector('h3').textContent, text: t, now: (w.querySelector('.c-steps li.now') || {}).textContent,
    rows: w.querySelectorAll('.c-tab tbody tr').length, ask: window.__asks.filter(a => /CRITERION: the criterion/.test(a.u)).pop() }; });
  ok(/How you fit/.test(rd.now) && /Against what you are looking for/i.test(rd.text) && /Does not match/.test(rd.text) && /Full time, in Oxbridge/.test(rd.text), 'read, it moves to How you fit, and says how it matches what she is looking for (London: does not match)', rd.now);
  ok(rd.band === 'stretch' && rd.word === 'A stretch', 'one essential criterion not shown (the PhD): the band is A stretch, plainly', JSON.stringify({ band: rd.band, word: rd.word }));
  ok(/2 of 4 essential criteria are shown plainly in your profile; 1 is only partly shown; 1 is not shown\./.test(rd.text) && /Of the 2 desirable, 1 is shown plainly\./.test(rd.text) && /Advice\. Apply only if you can show the missing criteria/.test(rd.text), 'its reasons are counted from the criteria, and the advice follows the band', (rd.text.match(/\d of \d essential[^\n]*/) || [''])[0]);
  ok(/The rule:/.test(rd.text) && /it is not a probability/.test(rd.text) && !/\d+\s?%/.test(rd.text), 'the rule is shown beside it; no percentage anywhere');
  ok(rd.rows === 8 && /Not shown/.test(rd.text) && /Partly shown/.test(rd.text) && /catalogued 312 letters/.test(rd.text), 'each want and each criterion is listed with its judgement and its evidence (bold markers in the answer read too)', rd.rows);
  ok(/Ask whether a candidate near the end of a doctorate/.test(rd.text) && /Ask the contact: Is a PhD in progress acceptable\?/.test(rd.text) && /Against\s+The post asks for a PhD/i.test(rd.text), 'next steps, a question for the contact and the concern, said plainly');
  ok(rd.ask && /THE PROFILE \(the only source of facts about me\)/.test(rd.ask.u) && /WHAT I AM LOOKING FOR/.test(rd.ask.u) && /Never invent a skill/.test(rd.ask.s) && /MY CV:\n[\s\S]*312 letters/.test(rd.ask.u) && /Research Assistant, Analytical Society/.test(rd.ask.u) && rd.ask.run.modelId === 'mfake12',
    'the model is given her profile, her wants, her CV and her LinkedIn entries, and the rule never to invent; with the model Lector uses', rd.ask && rd.ask.u.slice(0, 200));
  await fitCheck('An application: how you fit'); await shot('fit');
  // 4. what she sends: a CV, a letter, an email, and the files
  await press('Next: its checklist'); await press('Next: what you send'); await p.evaluate(() => { const o = IngCareer.state().opps[0]; o.way = 'auto'; IngCareer.render(); }); await press('Write the tailored CV'); await idle(); await p.waitForTimeout(1500);
  const cv = await p.evaluate(() => { const f = document.querySelector('#cs iframe.c-paper'); const d = f && f.contentDocument; const o = IngCareer.state().opps[0]; return { text: d ? d.body.innerText : '', head: d && d.querySelector('.cv h1') && d.querySelector('.cv h1').textContent, sub: d && d.querySelector('.cv .sub') && d.querySelector('.cv .sub').textContent,
    h2: d ? [...d.querySelectorAll('h2')].map(x => x.textContent) : [], chk: o.docs.cv && o.docs.cv.chk, stage: o.stage, foot: [...document.querySelectorAll('#cs .c-work .c-pn-f button')].map(x => x.textContent) }; });
  ok(cv.head === 'Ada Lovelace' && cv.sub === 'ada@example.org · Oxford' && cv.h2.join('|') === 'Education|Teaching|Skills', 'the CV is shown on its paper: her name and contact line at its head, its sections unnumbered', JSON.stringify({ head: cv.head, sub: cv.sub, h2: cv.h2 }));
  ok(!/9,999/.test(cv.text) && /40 undergraduates/.test(cv.text), 'the second reading struck the claim her profile does not support (9,999 students)');
  ok(cv.chk && cv.chk.figures.join() === '47' && cv.chk.fills === 1, 'a figure her profile does not give (47 seminars) is named for her to check; the place left to fill is counted', JSON.stringify(cv.chk));
  ok(cv.stage === 'preparing' && cv.foot.join('|') === 'Improve it|Change it|Copy the text|Write it again|Open in Tabula|Save as PDF|Save as Word', 'with a document written, the application is Preparing; the document\'s keys are at the foot of the panel (6.8.5: Improve it first)', cv.foot.join('|'));
  await fitCheck('What you send: the CV'); await shot('send');
  const dl1 = p.waitForEvent('download', { timeout: 120000 }); await press('Save as PDF'); const d1 = await dl1; await d1.saveAs(OUT + '/cv.pdf');
  ok(/^%PDF/.test(fs.readFileSync(OUT + '/cv.pdf').slice(0, 5).toString()) && /Ada Lovelace/.test(d1.suggestedFilename()) && /Tailored CV/.test(d1.suggestedFilename()) && /\.pdf$/.test(d1.suggestedFilename()), 'Save as PDF gives the CV as a PDF, named for her and the post', d1.suggestedFilename());
  const dl2 = p.waitForEvent('download', { timeout: 120000 }); await press('Save as Word'); const d2 = await dl2; await d2.saveAs(OUT + '/cv.docx');
  ok(fs.readFileSync(OUT + '/cv.docx').slice(0, 2).toString() === 'PK' && /\.docx$/.test(d2.suggestedFilename()), 'Save as Word gives a Word file', d2.suggestedFilename());
  await press('How it is built'); ok(/Put first what the posting asks for most/.test(await work()), 'beside the document, how it is built (the lesson for a CV), in its place');
  await press('Cover letter'); await press('Write the cover letter'); await idle(); await p.waitForTimeout(1500);
  const cl = await p.evaluate(() => { const d = document.querySelector('#cs iframe.c-paper').contentDocument; return { lhead: d.querySelector('.lhead b') && d.querySelector('.lhead b').textContent, text: d.body.innerText, ask: window.__asks.filter(a => /Write my cover letter/.test(a.u)).pop() }; });
  ok(cl.lhead === 'Ada Lovelace' && /which I do not yet hold/.test(cl.text), 'the cover letter is on its paper, headed with her name as she gives it', JSON.stringify(cl.lhead));
  ok(/NOT SHOWN: do not claim it/.test(cl.ask.u) && /THE STANDARD/.test(cl.ask.s), 'the letter is written knowing which criteria not to claim, to Lector\'s standard', cl.ask.u.slice(0, 120));
  await press('+ A new email'); await p.selectOption('#cs .c-pane select >> nth=0', 'supervisor'); await p.selectOption('#cs .c-pane select >> nth=1', 'introduce');
  await press('Write the email'); await idle(); await p.waitForTimeout(400);
  const em = await p.evaluate(() => (document.querySelector('#cs .c-mail') || {}).textContent || '');
  await press('How it is built'); const emHow = await work();
  ok(/^Subject: /.test(em) && /supervising a DPhil/.test(em) && /Read their recent work first/.test(emHow), 'an email to a prospective supervisor, with its subject, and the lesson on writing to one', em.slice(0, 80));
  // 5. her own draft, looked at with her, never rewritten
  await press('Write it yourself'); await p.selectOption('#cs .c-pane select.c-sel', 'cover'); await p.waitForTimeout(300);
  const mine = 'Dear Professor Babbage,\n\nI am very passionate about this post. I won three prizes. I taught 40 undergraduates in seminars of 12, and I catalogued 312 letters for the Analytical Society.\n\nYours sincerely,\nAda';
  await p.fill('#cs .c-pane textarea', mine); await press('Look at it with me'); await idle(); await p.waitForTimeout(400);
  const rv = await p.evaluate(() => ({ fb: (document.querySelector('#cs .c-fbside') || {}).innerText || '', ta: document.querySelector('#cs .c-pane textarea').value }));
  ok(/Not supported by your profile: "I won three prizes"/.test(rv.fb) && /Wording to look at/.test(rv.fb) && /First, do this: Answer the PhD criterion/.test(rv.fb) && /very passionate/.test(rv.ta), 'her own draft is looked at with her, beside it (what works, what is missing, what her profile does not support), and left as she wrote it', rv.fb.slice(0, 200));
  await fitCheck('What you send: her own draft'); await shot('mine');
  await press('Keep it as my version'); await p.waitForTimeout(1200);
  ok(await p.evaluate(() => { const o = IngCareer.state().opps[0]; return o.docs.cover.mine === true && /Your own version/.test(document.querySelector('#cs .c-work').innerText); }), 'kept as her version, it is the cover letter to save as Word or PDF');
  // 6. practise: her evidence for a criterion, and interview questions
  await press('Practise', '#cs .c-steps');
  const order = await p.evaluate(() => [...document.querySelectorAll('#cs .c-nav .c-item small')].map(m => /^Essential/.test(m.textContent) ? 'E' : 'D').join(''));
  ok(order === 'EEEEDD', 'Practise: the criteria listed, the essential first, each with how it stands', order);
  await press('Skill in archival research');
  const ev = 'In 2020 I catalogued 312 letters of the Analytical Society, reading each hand and dating it from its paper.';
  await p.fill('#cs .c-pane textarea', ev); await press('Look at it with me'); await idle(); await p.waitForTimeout(400);
  const pr = await p.evaluate(() => ({ fb: (document.querySelector('#cs .c-pane .c-fb') || {}).innerText || '', ta: document.querySelector('#cs .c-pane textarea').value, head: (document.querySelector('#cs .c-pane .c-h3') || {}).textContent }));
  ok(pr.head === 'Skill in archival research' && /Meets it: partly/.test(pr.fb) && /Ask yourself: What changed because of your catalogue\?/.test(pr.fb) && pr.ta === ev, 'her evidence is looked at with her: what works, what is missing, a question to answer; her words kept as written, her place kept', JSON.stringify(pr));
  await press('Keep it in my profile');
  ok(await p.evaluate(e => IngCareer.state().profile.items.some(i => i.sec === 'skill' && i.text === e), ev), 'kept in her profile, her evidence is there for every application after');
  await fitCheck('Practise: your evidence'); await shot('practise');
  await press('Interview questions'); await press('Choose questions to practise'); await idle(); await p.waitForTimeout(400);
  const qs = await p.evaluate(() => [...document.querySelectorAll('#cs .c-nav .c-item b')].map(x => x.textContent));
  ok(qs.length === 8 && qs[0] === '1. Question 1 about the post?', 'eight interview questions to practise, one at a time', JSON.stringify(qs.slice(0, 2)));
  // 7. the tracker: the closing date, the stage, finished ones apart
  await press('Track', '#cs .c-steps');
  const in3 = new Date(Date.now() + 3 * 864e5); const iso = in3.getFullYear() + '-' + String(in3.getMonth() + 1).padStart(2, '0') + '-' + String(in3.getDate()).padStart(2, '0');
  await p.evaluate(d => { const i = document.querySelector('#cs .c-work input[type=date]'); i.value = d; i.dispatchEvent(new Event('change')); }, iso); await p.waitForTimeout(300);
  const tr = await p.evaluate(() => { const o = document.querySelector('#cs .c-opp'); return { tile: o ? o.textContent : '', soon: !!(o && o.querySelector('.c-soon')), days: (document.querySelector('#cs .c-days') || {}).innerText }; });
  ok(/Closes in 3 days/.test(tr.tile) && tr.soon && /A stretch/.test(tr.tile) && /Preparing/.test(tr.tile) && /^3\s*days left/.test(tr.days), 'Track: the days left, large; and in the list its stage, its band and the days, marked when a week or less', JSON.stringify(tr));
  await fitCheck('Track'); await shot('track');
  await p.evaluate(() => IngCareer.newOpp('grant', 'Small research grant\nThe Humanities Fund\nFor early-career researchers. The closing date is 1 March 2027. Apply with a proposal of 1,000 words and a budget.\n' + 'x'.repeat(60), 'pasted').then(o => { o.stage = 'not'; saveState(); IngCareer.render(); }));
  await p.waitForTimeout(300);
  const fin = await p.evaluate(() => { const d = document.querySelector('#cs .c-list details.cs-fold'); return d ? d.textContent : ''; });
  ok(/Finished \(1\)/.test(fin) && /Small research grant/.test(fin), 'one she is not applying for goes under Finished, out of the way', fin.slice(0, 80));
  // 8. goals and plan
  await press('Goals and plan', '#cs .rm-tabs'); await press('+ A goal'); await p.fill('#cs .c-work input[type=text]', 'A DPhil place for October 2027'); await press('Add the goal');
  await press('Suggest steps'); await idle(); await p.waitForTimeout(300); await press('Keep');
  await p.evaluate(() => { document.querySelector('#cs .c-steprow .c-check input').click(); }); await p.waitForTimeout(300);
  const gl = await p.evaluate(() => { const g = IngCareer.state().goals[0]; return { text: g.text, steps: g.steps.map(s => s.text + '|' + s.done), chip: (document.querySelector('#cs .c-work .c-pn-h .c-chip') || {}).textContent, when: (document.querySelector('#cs .c-steprow small') || {}).textContent }; });
  ok(gl.text === 'A DPhil place for October 2027' && gl.steps[0] === 'Write to two possible supervisors|true' && gl.chip === '1 of 1 done' && /^In two weeks/.test(gl.when), 'a goal, a suggested step kept, ticked done and counted; its time said plainly ("In two weeks")', JSON.stringify(gl));
  await fitCheck('Goals and plan: a goal'); await shot('goals');
  if (phone) await press('‹ Goals and plan'); await press('Roles and programmes that suit you'); await press('Weigh what suits me'); await idle(); await p.waitForTimeout(300);
  const rl = await p.evaluate(() => ({ list: (IngCareer.state().roles || {}).list || [], text: document.querySelector('#cs .c-work').innerText, ask: window.__asks.filter(a => /You name kinds/.test(a.s)).pop() }));
  ok(rl.list.length === 3 && /What is missing\s+a supervisor/i.test(rl.text) && /never particular postings/.test(rl.ask.s), 'the kinds of role and programme that suit her, with why, what is missing and a first step; never postings', rl.list.map(x => x.role).join(' | '));
  await press('Make it a goal'); ok(await p.evaluate(() => IngCareer.state().goals.length === 2 && IngCareer.state().goals[0].steps[0].text === 'write to supervisors'), 'a kind of role made a goal, with its first step');
  // 9. learn: one lesson at a time
  await press('Learn', '#cs .rm-tabs'); const ls = await p.evaluate(() => [...document.querySelectorAll('#cs .c-list .c-item b')].map(x => x.textContent));
  ok(ls.length === 14 && ls[0] === 'Reading a posting' && ls.includes('A research proposal') && ls.includes('Interviews') && ls.includes('A statement of purpose') && ls.includes('A checklist from a posting'), 'Learn: its lessons, listed (fourteen since 6.8.12)', ls.join(', '));
  if (phone) await press('Reading a posting'); const l1 = await p.evaluate(() => ({ h: document.querySelector('#cs .c-work h2').textContent, n: document.querySelectorAll('#cs .c-lesson li').length }));
  await press('A CV for an application ›'); const l2 = await p.evaluate(() => document.querySelector('#cs .c-work h2').textContent);
  ok(l1.h === 'Reading a posting' && l1.n === 5 && l2 === 'A CV for an application', 'one lesson at a time, in numbered steps, the next one a press away', JSON.stringify([l1, l2]));
  await fitCheck('Learn'); await shot('learn');
  // 10. from Lector: a CV and a letter from a posting, with no apps
  await p.evaluate(() => { const L = IngLector.state(); L.brief.apps = []; L.brief.purpose = 'job'; L.brief.docs = { cv: true, cover: true }; });
  await p.evaluate(async t => { const ref = IngBig.newId(); await IngBig.put(ref, t); IngLector.state().posts.job = { id: 'pX', ref, name: 'Pasted text', chars: t.length, at: Date.now(), title: 'Archivist', org: 'The County Record Office' }; saveState(); }, 'Archivist\nThe County Record Office\nEssential:\n- Archival research\n- Cataloguing\nThe closing date is 5 December 2026.\n');
  await p.evaluate(() => IngLector.go()); await p.waitForTimeout(800); await idle(); await p.waitForTimeout(800);
  const lx = await p.evaluate(() => { const o = IngCareer.state().opps.find(x => x.from === 'lector:pX'); return { page: document.querySelector('section.active') && document.querySelector('section.active').id, o: o && { title: o.title, docs: Object.keys(o.docs).sort().join(), step: o.step } }; });
  ok(lx.page === 'page-career' && lx.o && lx.o.title === 'Archivist' && lx.o.docs === 'cover,cv' && lx.o.step === 'send', 'in Lector, a CV and a cover letter with no apps chosen: the Career Studio writes both from the posting and her profile, and shows them', JSON.stringify(lx));
  // 11. the page never scrolls; nothing went online; no errors
  const bad = fits.filter(x => x[1].page > 2 || x[1].main > 2 || x[1].bottom > x[1].h);
  ok(!bad.length, 'the page never scrolls: in every room and step it fits the window, and only its panels scroll (' + fits.length + ' places)', JSON.stringify(bad.slice(0, 3)));
  ok(outside.length === 0, 'nothing was searched or fetched online: nothing was asked for', outside.slice(0, 3).join(' '));
  const asks = await p.evaluate(() => window.__asks.map(a => /Never invent a skill/.test(a.s)));
  ok(asks.length >= 14 && asks.every(Boolean), 'every request to the model carries the rule never to invent (' + asks.length + ' requests)');
  if (phone) { const ph = await p.evaluate(() => ({ list: getComputedStyle(document.querySelector('#cs .c-list')).display, work: getComputedStyle(document.querySelector('#cs .c-work')).display, over: document.documentElement.scrollWidth - innerWidth }));
    ok(ph.list === 'none' && ph.work !== 'none' && ph.over <= 1, 'on a phone: one panel at a time, nothing wider than the screen', JSON.stringify(ph));
    await press('‹ Applications'); ok(await p.evaluate(() => getComputedStyle(document.querySelector('#cs .c-list')).display !== 'none'), 'and its key goes back to the list'); }
  ok(errs.length === 0, 'no page errors', errs.slice(0, 3).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
