// node rig/t_690_counsel.js <Ingenium page url (master or full)> <out dir>
// Ingenium 6.90 (12 November 2026), in Chromium, with a stand-in model (the person, her CV and her answers are invented). Her words
// (12 November 2026): the Career Studio and Lector "are still not streamlined and integrated well enough ... It creates more work and is
// not really AuDHD accessible"; "I don't want to have to input my information for my profile from scratch"; "be my in-app
// recruiter/mentor/counselor/headhunter. I want that to be replicable for a second user profile and so forth."
//   - the room Your counsellor, second after Today, with five stages on its rail and how many are done;
//   - a new profile opens on it;
//   - stage 1 takes a CV, a letter and a LinkedIn file in one go through the page's own picker, and sorts them;
//   - stage 2 reads the sources once and keeps every entry and skill at once, each marked found; Looks right clears one, a section at once;
//   - stage 3 answers by chips, keeps its place over a reload, fills What you are looking for, and makes the two aims goals;
//   - stage 4 runs what transfers, blind spots, what sets her apart, the paths and the aims' steps in one chain;
//   - stage 5 lists this week with minutes, Done ticks the goal's step too, Do it for me looks at her CV;
//   - Today names the counsellor; Stop stops the chain and keeps what was finished; Begin another profile starts the path again;
//   - Lector's Suggestions key is taken over to show beside the document; no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const zlib = require('zlib');
// a small zip (deflate) of named texts, as a folder of documents would be
function zipOf(entries) { const crcT = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; crcT[n] = c >>> 0; }
  const crc = b => { let c = 0xFFFFFFFF; for (const x of b) c = crcT[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  const locals = [], cds = []; let off = 0;
  for (const [name, text] of entries) { const nm = Buffer.from(name), raw = Buffer.from(text), def = zlib.deflateRawSync(raw), c = crc(raw);
    const lh = Buffer.alloc(30); lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0, 6); lh.writeUInt16LE(8, 8); lh.writeUInt32LE(0, 10); lh.writeUInt32LE(c, 14); lh.writeUInt32LE(def.length, 18); lh.writeUInt32LE(raw.length, 22); lh.writeUInt16LE(nm.length, 26); lh.writeUInt16LE(0, 28);
    const cd = Buffer.alloc(46); cd.writeUInt32LE(0x02014b50, 0); cd.writeUInt16LE(20, 4); cd.writeUInt16LE(20, 6); cd.writeUInt16LE(0, 8); cd.writeUInt16LE(8, 10); cd.writeUInt32LE(0, 12); cd.writeUInt32LE(c, 16); cd.writeUInt32LE(def.length, 20); cd.writeUInt32LE(raw.length, 24); cd.writeUInt16LE(nm.length, 28); cd.writeUInt16LE(0, 30); cd.writeUInt16LE(0, 32); cd.writeUInt16LE(0, 34); cd.writeUInt16LE(0, 36); cd.writeUInt32LE(0, 38); cd.writeUInt32LE(off, 42);
    locals.push(lh, nm, def); cds.push(cd, nm); off += lh.length + nm.length + def.length; }
  const cdb = Buffer.concat(cds), eo = Buffer.alloc(22); eo.writeUInt32LE(0x06054b50, 0); eo.writeUInt16LE(0, 4); eo.writeUInt16LE(0, 6); eo.writeUInt16LE(entries.length, 8); eo.writeUInt16LE(entries.length, 10); eo.writeUInt32LE(cdb.length, 12); eo.writeUInt32LE(off, 16); eo.writeUInt16LE(0, 20);
  return Buffer.concat([...locals, cdb, eo]); }
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 900) : '')); } }
const CV = 'Rosalind Okafor\nCurriculum vitae\n\nEducation\nMA in Education, Northgate University, 2019 to 2021. Dissertation on the design of online courses.\n\nExperience\nLearning technologist, Westbrook College, 2021 to 2024. Designed three online modules used by 900 students; trained 40 teachers to teach online.\n\nProjects\nA study planner app used by 120 students.\n\nSkills\nInstructional design, app development, training adults.\n\nLanguages\nEnglish, French.\n\nReferees\nAvailable on request.';
const LETTER = 'Dear Dr Hale,\n\nI am writing to apply for the post of learning designer at Harbour Learning. At Westbrook College I designed three online modules used by 900 students and trained 40 teachers to teach online. I built a study planner app that 120 students use every week.\n\nYours sincerely,\nRosalind Okafor';
const POSITIONS = 'Company Name,Title,Description,Location,Started On,Finished On\nWestbrook College,Learning technologist,Designed three online modules,Leeds,Sep 2021,Jul 2024\nNorthgate University,Teaching assistant,Seminars on course design,Leeds,Oct 2019,Jun 2021\n';
async function stand(p, slow) {
  await p.evaluate((slow) => {
    const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^mfake/.test(m.id));
    state.models.push({ id: 'mfake12', customName: 'Stand-in 12B', fileState: 'ready', fileName: L['gemma-4-12b'].file, stored: true }); saveState();
    window.__asked = [];
    lxAsk = function (run, msgs, max, temp, onPiece) { const u = msgs[msgs.length - 1].content; window.__asked.push(u.slice(0, 160)); let out = 'Nothing.';
      if (/List the entries of my profile/.test(u)) out = 'ENTRY: education | MA in Education | Northgate University | 2019 | 2021 | Dissertation on the design of online courses\nENTRY: post | Learning technologist | Westbrook College | 2021 | 2024 | Designed three online modules used by 900 students\nENTRY: project | A study planner app | | | | Used by 120 students\nENTRY: language | French | | | | ';
      else if (/List the skills my sources show/.test(u)) out = 'SKILL: Instructional design | BOTH | three online modules used by 900 students | the skills section of a CV\nSKILL: App development | PROFESSIONAL | a study planner used by 120 students | Projects, and a portfolio';
      else if (/that transfer/.test(u)) out = 'TRANSFER: Training adults | trained 40 teachers | learning design posts | Trained 40 teachers to teach online.';
      else if (/blind spots/i.test(u)) out = 'BLIND: UNDERSOLD | the study planner app | a reader will not know it exists | add it to Projects with its 120 users';
      else if (/sets me apart/.test(u)) out = 'EDGE: Builds the tools she designs for | a study planner and three modules | I design learning and build the software for it.\nPOSITION: PROFESSIONAL | A learning designer who builds.\nPOSITION: ACADEMIC | A researcher of online course design with three modules as evidence.\nPOSITION: BRIDGE | Research into how people learn online, tested in tools she builds.';
      else if (/clear direction/.test(u)) out = 'PATH: Learning designer in an education technology company | remote and flexible work | three modules, 900 students | a portfolio online | Put the planner and one module in a portfolio | Apply to two remote posts; ask Dr Hale for a reference | Leaves evenings for the doctorate\nFIND: Which companies hire learning designers remotely | read five postings and note the pattern';
      else if (/Give me suggestions, the most useful first/.test(u)) out = 'STRENGTHEN: the Work section | give the number of students for each module\nADD: the study planner app | under Projects, with its users\nNEXT: add the app to Projects with its 120 users';
      else if (/concrete steps towards it/.test(u)) out = 'STEP: Read the department\'s page on funding and note each closing date | in two weeks | the dates decide the order of everything else\nSTEP: Write to one possible supervisor with a one-page summary | in a month | a supervisor\'s interest is asked for by most routes\nSTEP: Draft the research question in two sentences | in a week | every form asks for it';
      else if (/Lector has read my app/.test(u)) out = 'SKILLFROMAPP: Offline data design | the planner keeps everything on the device | Projects; a portfolio | Designed a planner that keeps every record on the device.';
      const send = () => { if (onPiece) onPiece(out); return out; };
      return slow ? new Promise(r => setTimeout(() => r(send()), slow)) : Promise.resolve(send()); };
  }, slow || 0); }
async function open(b) { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer && window.IngCounsel, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd && tourEnd(); } catch (e) {} });
  await p.waitForTimeout(400); return { ctx, p, errs }; }
const idle = p => p.waitForFunction(() => !IngCareer.run.busy && !IngCounsel.state().chain, null, { timeout: 120000 });
async function press(p, text, scope) { const b = p.locator((scope || '#cs') + ' button', { hasText: text }).first(); await b.click(); await p.waitForTimeout(350); }
(async () => {
  const b = await pw.chromium.launch(); let A = await open(b), p = A.p;
  await stand(p);
  await p.evaluate(() => { const S = IngCareer.state(); S.profile.name = 'Rosalind Okafor'; S.ui.room = 'mentor'; S.ui.show = 'work'; saveState(); go('career'); IngCareer.render(); });
  await p.waitForTimeout(600);
  // 1. the room and its rail
  const tabs = await p.evaluate(() => [...document.querySelectorAll('#cs .rm-tabs [data-room]')].map(t => t.textContent.trim()));
  ok(tabs[1] === 'Your counsellor' && tabs[0] === 'Today', 'the Career Studio has a room Your counsellor, second after Today', tabs);
  const fresh = await p.evaluate(() => { delete state.career; const S = IngCareer.state(); const r = S.ui.room; S.ui.room = 'mentor'; S.ui.show = 'work'; S.profile.name = 'Rosalind Okafor'; saveState(); IngCareer.render(); return r; });
  ok(fresh === 'today', 'a fresh studio opens on Today, the whole picture (her choice)', fresh);
  const rail = await p.evaluate(() => ({ steps: [...document.querySelectorAll('#cs .c-list .c-item b')].map(x => x.textContent.trim()), prog: (document.querySelector('#cs .cn-prog span') || {}).textContent, title: (document.querySelector('#csWork h2') || {}).textContent }));
  ok(rail.steps.length === 5 && /^1\. What you have/.test(rail.steps[0]) && /^5\. This week/.test(rail.steps[4]) && /0 of 5 done/.test(rail.prog || '') && /1\. What you have/.test(rail.title || ''), 'five stages on its rail, none done, the first open', rail);
  // 2. stage 1: a CV, a letter and a LinkedIn file in one go
  const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.click('#cnAdd')]);
  await fc.setFiles([{ name: 'Rosalind Okafor CV.txt', mimeType: 'text/plain', buffer: Buffer.from(CV) }, { name: 'documents.zip', mimeType: 'application/zip', buffer: zipOf([['letters/Letter to Harbour Learning.txt', LETTER], ['Statement.txt', 'A statement of purpose. ' + LETTER]]) }, { name: 'Positions.csv', mimeType: 'text/csv', buffer: Buffer.from(POSITIONS) }]);
  await p.waitForTimeout(2500);
  const s1 = await p.evaluate(() => { const S = IngCareer.state(), me = IngLector.state().me; return { cv: me.cv && me.cv.name, files: S.profile.files.map(f => f.name), li: !!S.profile.linkedin, items: S.profile.items.map(x => x.sec + ':' + x.title), rows: [...document.querySelectorAll('#csWork .c-src b')].map(x => x.textContent.trim()) }; });
  ok(s1.cv === 'Rosalind Okafor CV.txt' && s1.files.length === 2 && s1.files.some(f => /Harbour/.test(f)) && s1.files.some(f => /Statement/.test(f)) && s1.li && s1.items.includes('post:Learning technologist'), 'one key takes a CV, a zip of two documents and a LinkedIn file at once and sorts them', s1);
  ok(/^✓ Your CV/.test(s1.rows[0] || '') && /^✓ LinkedIn/.test(s1.rows[1] || '') && /^✓ Documents/.test(s1.rows[2] || ''), 'the card shows each as kept', s1.rows);
  // 3. stage 2: the record, built at once
  await press(p, 'Next: build my record', '#csWork .c-pn-f');
  const t2 = await p.evaluate(() => (document.querySelector('#csWork h2') || {}).textContent);
  ok(/2\. Your record/.test(t2 || ''), 'Next opens stage 2', t2);
  const pre = await p.evaluate(() => [...document.querySelectorAll('#csWork .c-pn-f .c-btn')].map(b => b.textContent.trim()));
  ok(pre.includes('Find more in my sources') && pre.includes('Next: what you want'), 'with LinkedIn entries already in, stage 2 offers to find more in her sources', pre);
  await press(p, 'Find more in my sources', '#csWork .c-pn-f'); await idle(p); await p.waitForTimeout(500);
  const one = await p.evaluate(() => ({ k: (document.querySelector('#csWork .c-k') || {}).textContent, cards: document.querySelectorAll('#csWork .c-entry').length, t: (document.querySelector('#csWork .c-entry b') || {}).textContent, sg: (IngCareer.state().profile.suggested || []).length, keys: [...document.querySelectorAll('#csWork .c-pn-f .c-btn')].map(b => b.textContent.trim()) }));
  ok(one.cards === 1 && /1 of 5/.test(one.k || '') && one.t === 'MA in Education' && one.sg === 5 && one.keys.includes('Keep') && one.keys.includes('Drop') && one.keys.includes('Keep all the rest'), 'stage 2 shows what it found one at a time, to keep or drop, with Keep all the rest (her choice)', one);
  await p.focus('#cnKeep'); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
  await press(p, /^Drop$/, '#csWork .c-pn-f');
  await press(p, 'Keep all the rest', '#csWork .c-pn-f');
  const rec = await p.evaluate(() => { const P = IngCareer.state().profile; return { items: P.items.map(x => x.sec + ':' + x.title + (x.found ? '*' : '')), sg: (P.suggested || []).length, done: IngCounsel.done('record') > 0, rows: document.querySelectorAll('#csWork .cn-row.is-found').length, prog: (document.querySelector('#cs .cn-prog span') || {}).textContent }; });
  ok(rec.items.includes('education:MA in Education') && !rec.items.some(x => /study planner/.test(x)) && rec.items.includes('skill:Instructional design*') && rec.items.includes('language:French*') && rec.sg === 0 && rec.done, 'Enter keeps one as hers, Drop lets one go, Keep all the rest keeps the remainder marked found', rec);
  ok(rec.rows >= 3 && /2 of 5 done/.test(rec.prog || ''), 'the card then lists the record with its marks; two stages done', rec);
  await p.evaluate(() => { const b = [...document.querySelectorAll('#csWork .cn-row.is-found .c-btn')].find(x => x.textContent.trim() === 'Looks right'); b.click(); }); await p.waitForTimeout(300);
  await p.evaluate(() => { const b = [...document.querySelectorAll('#csWork .cn-sec .c-btn')].find(x => /Looks right, all/.test(x.textContent)); b.click(); }); await p.waitForTimeout(300);
  const chk = await p.evaluate(() => { const P = IngCareer.state().profile; return { found: P.items.filter(x => x.found).length, total: P.items.length, me: P.items.filter(x => x.src === 'me').length }; });
  ok(chk.found < chk.total - 1 && chk.me >= 2, 'Looks right clears one, and a whole section at once', chk);
  await p.screenshot({ path: OUT + '/counsel_record.png' });
  // 4. stage 3: chips, a reload halfway, the aims
  await press(p, 'Next: what you want', '#csWork .c-pn-f');
  const q1 = await p.evaluate(() => ({ q: (document.querySelector('#csWork .c-today-step') || {}).textContent, n: (document.querySelector('#csWork .c-k') || {}).textContent, chips: document.querySelectorAll('#csWork .cn-chips .c-pill').length }));
  ok(/lose track of time/.test(q1.q || '') && /Question 1 of 8/.test(q1.n || '') && q1.chips >= 6, 'stage 3 asks one question at a time, answered by chips', q1);
  await p.click('#csWork .cn-chips .c-pill:nth-child(1)'); await p.click('#csWork .cn-chips .c-pill:nth-child(2)'); await p.waitForTimeout(200);
  await press(p, /^Next$/, '#csWork .c-pn-f');
  await p.fill('#cnOwn', 'Explaining technology to teachers'); await p.waitForTimeout(800);
  await p.reload(); await p.waitForFunction(() => window.__ingReady === true && window.IngCounsel, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd && tourEnd(); } catch (e) {} }); await stand(p);
  await p.evaluate(() => { go('career'); IngCareer.render(); }); await p.waitForTimeout(600);
  const back = await p.evaluate(() => ({ room: IngCareer.state().ui.room, q: (document.querySelector('#csWork .c-today-step') || {}).textContent, v: (document.getElementById('cnOwn') || {}).value, on: Object.keys(IngCounsel.state().chips).map(k => k + ':' + IngCounsel.state().chips[k].length) }));
  ok(back.room === 'mentor' && /ask you for help/.test(back.q || '') && back.v === 'Explaining technology to teachers' && back.on.includes('enjoy:2'), 'opened again halfway, the talk is where she left it, chips and words kept', back);
  await press(p, /^Next$/, '#csWork .c-pn-f');
  await p.click('#csWork .cn-chips .c-pill:nth-child(1)'); await press(p, /^Next$/, '#csWork .c-pn-f');  // drawn: Learning design
  await press(p, /^Skip$/, '#csWork .c-pn-f');  // change
  await p.click('#csWork .cn-chips .c-pill:nth-child(3)'); await p.click('#csWork .cn-chips .c-pill:nth-child(4)'); await press(p, /^Next$/, '#csWork .c-pn-f');  // need: flexible hours, anywhere
  await p.click('#csWork .cn-chips .c-pill:nth-child(1)'); await press(p, /^Next$/, '#csWork .c-pn-f');  // avoid: commuting
  await p.click('#csWork .cn-chips .c-pill:nth-child(1)'); await press(p, /^Next$/, '#csWork .c-pn-f');  // where
  await p.click('#csWork .cn-chips .c-pill:nth-child(5)'); await press(p, /^Next$/, '#csWork .c-pn-f');  // when: the next intake
  const aims = await p.evaluate(() => ({ k: (document.querySelector('#csWork .c-k') || {}).textContent, n: document.querySelectorAll('#csWork .cn-aim').length }));
  ok(/your aims/i.test(aims.k || '') && aims.n === 2, 'last, her two aims as cards', aims);
  const tone = await p.evaluate(() => ({ seg: [...document.querySelectorAll('#csWork .c-seg button')].map(b => b.textContent.trim()), on: (document.querySelector('#csWork .c-seg button[aria-pressed="true"]') || {}).textContent, t: IngCareer.state().profile.prefs.tone }));
  ok(tone.seg.length === 3 && /^Frank/.test(tone.on || '') && tone.t === 'frank', 'and how the counsellor speaks: frank by default (her choice)', tone);
  await p.click('#csWork .cn-aim:nth-child(1)'); await p.waitForTimeout(300); await p.click('#csWork .cn-aim:nth-child(2)'); await p.waitForTimeout(300);
  await p.evaluate(() => { const f = [...document.querySelectorAll('#csWork .cn-aimf input')]; [['Northgate University', 0], ['PhD', 1], ['Education', 2]].forEach(([v, i]) => { f[i].value = v; f[i].dispatchEvent(new Event('change')); }); });
  await p.evaluate(() => { document.querySelectorAll('#csWork .cn-chips')[0].querySelector('.c-pill').click(); }); await p.waitForTimeout(200);
  await press(p, 'Finish: that is what I want', '#csWork .c-pn-f'); await idle(p); await p.waitForTimeout(600);
  const wants = await p.evaluate(() => ({ w: IngCareer.state().profile.wants, goals: IngCareer.state().goals.map(g => g.text + '|' + g.kind + '|' + g.steps.length), done: IngCounsel.done('want') > 0 }));
  ok(/Interested in: Learning design/.test(wants.w.looking || '') && /Work I enjoy: Building something/.test(wants.w.looking || '') && /Explaining technology/.test(wants.w.looking || '') && /Flexible hours/.test(wants.w.need || '') && /Commuting/.test(wants.w.avoid || '') && /next intake/i.test(wants.w.when || ''),
    'finished, the chips and her words fill What you are looking for (a skipped question leaves nothing)', wants.w);
  ok(wants.goals.some(g => /fully funded PhD at Northgate University, in Education\|academic\|3/.test(g)) && wants.goals.some(g => /^Work in Learning design/.test(g) && /\|career\|3$/.test(g)) && wants.done, 'the aims become goals, and stage 4 ran by itself and gave each its steps', wants.goals);
  // 5. stage 4
  const g4 = await p.evaluate(() => { const S = IngCareer.state(), E = S.edge || {}; return { title: (document.querySelector('#csWork h2') || {}).textContent, tr: !!E.tr, bl: !!E.bl, ed: !!E.ed, pos: Object.keys(E.ed && E.ed.pos || {}).length, paths: (S.paths && S.paths.list || []).length, labels: [...document.querySelectorAll('#csWork .c-label')].map(x => x.textContent.trim()), done: IngCounsel.done('go') > 0 }; });
  ok(/4\. Where you could go/.test(g4.title || '') && g4.tr && g4.bl && g4.ed && g4.pos === 3 && g4.paths === 1 && g4.done, 'stage 4 holds what transfers, blind spots, what sets her apart with her positioning, and the paths', g4);
  ok(['How to present yourself', 'What transfers', 'Your blind spots', 'Paths that fit', 'Your aims, with their steps'].every(t => g4.labels.includes(t)), 'its card shows them in that order', g4.labels);
  const recd = await p.evaluate(() => ({ chips: [...document.querySelectorAll('#csWork .c-path .c-chip')].map(c => c.textContent.trim()), why: (document.querySelector('#csWork .c-path .c-k') || {}).textContent, asked: (window.__asked || []).some(u => /Put first the path you recommend/.test(u) || true) }));
  ok(recd.chips[0] === 'Recommended' && /Why it comes first/.test(recd.why || ''), 'the first path is marked Recommended, with why it comes first (her choice: a recommendation and one alternative)', recd);
  const guard = await p.evaluate(() => IngCareer.ui.noPay('Salary £42,000 a year, and a stipend of 18,000 GBP; trained 40 teachers'));
  ok(/kept on this device/.test(guard) && /trained 40 teachers/.test(guard) && !/42,000/.test(guard) && !/18,000/.test(guard), 'a pay figure is kept on this device when the model is away; other figures stay', guard);
  await p.screenshot({ path: OUT + '/counsel_go.png' });
  // 6. stage 5: this week
  await press(p, 'Next: this week', '#csWork .c-pn-f');
  const wk = await p.evaluate(() => ({ title: (document.querySelector('#csWork h2') || {}).textContent, rows: [...document.querySelectorAll('#csWork .cn-week > .cn-row')].map(r => r.querySelector('b').textContent.trim()), mins: [...document.querySelectorAll('#csWork .cn-week .cn-min')].length, items: IngCounsel.state().week.items.map(x => x.kind) }));
  ok(/5\. This week/.test(wk.title || '') && wk.rows.length === 3 && wk.mins >= 3 && wk.items.includes('cvlook') && wk.items.includes('step') && wk.items.includes('first') && wk.items.includes('fix'), 'this week: three things in view with their minutes, from her CV, her aims, the paths and a blind spot', wk);
  await p.evaluate(() => { const b = [...document.querySelectorAll('#csWork .cn-week .c-btn')].find(x => x.textContent.trim() === 'Do it for me'); b.click(); }); await idle(p); await p.waitForTimeout(500);
  const cvl = await p.evaluate(() => { const E = IngCareer.state().edge; return { looked: Object.keys(E.docs || {}).some(k => k === 'cv'), done: IngCounsel.state().week.items.filter(x => x.kind === 'cvlook')[0].done }; });
  ok(cvl.looked && cvl.done, 'Do it for me looks at her CV with her, and the item is done', cvl);
  await p.evaluate(() => { const it = IngCounsel.state().week.items.filter(x => x.kind === 'step')[0]; const cb = [...document.querySelectorAll('#csWork .cn-week input[type=checkbox]')].find(c => c.getAttribute('aria-label') === 'Done: ' + it.text); cb.click(); }); await p.waitForTimeout(300);
  const stp = await p.evaluate(() => { const g = IngCareer.state().goals.filter(g => g.aim === 'dphil')[0]; return { done: g.steps.filter(s => s.done).length, prog: (document.querySelector('#cs .cn-prog span') || {}).textContent }; });
  ok(stp.done === 1 && /5 of 5 done/.test(stp.prog || ''), 'Done ticks the goal\'s own step; all five stages done', stp);
  await p.screenshot({ path: OUT + '/counsel_week.png' });
  const sum = await p.evaluate(() => IngCounsel.summary());
  ok(/How to present yourself/.test(sum) && /This week/.test(sum) && /Paths that fit/.test(sum) && /Your aims/.test(sum), 'the summary gathers positioning, the week, the paths and the aims', sum.slice(0, 200));
  // 7. Today names the counsellor
  await p.evaluate(() => { IngCareer.state().ui.room = 'today'; IngCareer.render(); }); await p.waitForTimeout(300);
  const td = await p.evaluate(() => ({ t: (document.querySelector('#cs .c-td-mentor') || {}).textContent || '', k: [...document.querySelectorAll('#cs .c-btn')].some(b => b.textContent.trim() === 'Open your counsellor') }));
  ok(/Your counsellor, this week:/.test(td.t) && td.k, 'Today names the counsellor\'s next thing, with a key to it', td);
  const pic = await p.evaluate(() => [...document.querySelectorAll('#cs .cn-pic .c-item')].map(b => b.querySelector('b').textContent.trim() + ' · ' + b.querySelector('small').textContent.trim()));
  ok(pic.length === 3 && /^Applications · None yet/.test(pic[0]) && /^Your counsellor · This week:/.test(pic[1]) && /^Your profile · \d+ entries/.test(pic[2]) && /from your CV, LinkedIn, 2 documents/.test(pic[2]), 'Today shows the whole picture: applications, the counsellor, the profile', pic);
  const away = await p.evaluate(() => { IngCareer.state().ui.seenAt = Date.now() - 30 * 3600 * 1000; IngCareer.render(); const w = document.querySelector('#cs .cn-away'); return w ? w.textContent : ''; });
  ok(/While you were away \(30 hours\)/.test(away) && /Your counsellor: This week done/.test(away), 'opened after a day away, Today says what changed', away.slice(0, 200));
  // 8. Stop
  await stand(p, 1500);
  await p.evaluate(() => { const E = IngCareer.state().edge; delete E.tr; delete E.bl; delete E.ed; IngCareer.state().ui.room = 'mentor'; IngCounsel.state().stage = 'go'; IngCareer.render(); IngCounsel.runGo(); });
  await p.waitForTimeout(500); await p.evaluate(() => IngCareer.stop()); await idle(p); await p.waitForTimeout(2500);
  const st = await p.evaluate(() => { const E = IngCareer.state().edge; return { tr: !!E.tr, bl: !!E.bl, ed: !!E.ed, chain: IngCounsel.state().chain, items: IngCareer.state().profile.items.length, stopKey: [...document.querySelectorAll('#cs .c-list .c-btn')].map(b => b.textContent.trim()) }; });
  ok(!st.bl && !st.ed && st.chain === false && st.items >= 6 && st.stopKey.includes('Let the counsellor work'), 'Stop stops the chain after the step running; what was finished is kept', st);
  // 9. another profile
  await stand(p);
  const mine = await p.evaluate(() => IngCareer.state().profile.items.length);
  await p.evaluate(() => { const b = [...document.querySelectorAll('#cs .c-list .c-btn')].find(x => x.textContent.trim() === 'Another side of me'); b.click(); }); await p.waitForTimeout(900);
  const side = await p.evaluate(() => { const S = IngCareer.state(); return { me: S.profile.isMe !== false, items: S.profile.items.length, files: S.profile.files.length, next: IngCounsel.next(), chips: Object.keys(IngCounsel.state().chips).length, people: IngCareer.root().people.length }; });
  ok(side.me && side.items === mine && side.files === 2 && side.next === 'have' && side.chips === 0 && side.people === 2, 'Another side of me: a copy of her profile with its entries and documents, its counsellor from the beginning', side);
  await p.evaluate(() => { const b = [...document.querySelectorAll('#cs .c-list .c-btn')].find(x => x.textContent.trim() === 'Someone else'); b.click(); }); await p.waitForTimeout(700);
  const two = await p.evaluate(() => { const S = IngCareer.state(); return { other: S.profile.isMe === false, items: S.profile.items.length, next: IngCounsel.next(), prog: (document.querySelector('#cs .cn-prog span') || {}).textContent, title: (document.querySelector('#csWork h2') || {}).textContent, chips: Object.keys(IngCounsel.state().chips).length, room: S.ui.room }; });
  ok(two.other && two.items === 0 && two.next === 'have' && /0 of 5 done/.test(two.prog || '') && /1\. What you have/.test(two.title || '') && two.chips === 0 && two.room === 'mentor', 'Someone else: a profile of their own, the same path from the beginning, nothing of hers in it', two);
  // 10. Lector's Suggestions key is the counsellor's now
  await p.evaluate(() => go('lector')); await p.waitForTimeout(600);
  const lx = await p.evaluate(() => ({ hooked: !!(document.getElementById('l7Advise') || {}).__cn, cur: typeof IngLector.curDoc === 'function' }));
  ok(lx.hooked && lx.cur, 'in Lector, Suggestions shows beside the document (the key is taken over, and Lector tells what is shown)', lx);
  ok(A.errs.length === 0, 'no errors on the page', A.errs);
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
