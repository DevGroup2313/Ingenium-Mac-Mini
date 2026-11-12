// The Career Studio as it really is with modules/r283.js (6.90), filled with an invented person (Rosalind Okafor, as rig/t_690_counsel.js
// invents her) and a stand-in model, taken out of the running page for the counsellor's preview: the studio's markup at each stage of the
// path, by day and by night, and every style rule, keyframe and token that draws it.
//   node capture_counsel.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const CV = 'Rosalind Okafor\nCurriculum vitae\n\nEducation\nMA in Education, Northgate University, 2019 to 2021. Dissertation on the design of online courses.\n\nExperience\nLearning technologist, Westbrook College, 2021 to 2024. Designed three online modules used by 900 students; trained 40 teachers to teach online.\n\nProjects\nA study planner app used by 120 students.\n\nSkills\nInstructional design, app development, training adults.\n\nLanguages\nEnglish, French.';
const LETTER = 'Dear Dr Hale,\n\nI am writing to apply for the post of learning designer at Harbour Learning. At Westbrook College I designed three online modules used by 900 students and trained 40 teachers to teach online. I built a study planner app that 120 students use every week.\n\nYours sincerely,\nRosalind Okafor';
const POSITIONS = 'Company Name,Title,Description,Location,Started On,Finished On\nWestbrook College,Learning technologist,Designed three online modules,Leeds,Sep 2021,Jul 2024\nNorthgate University,Teaching assistant,Seminars on course design,Leeds,Oct 2019,Jun 2021\n';
async function stand(p) {
  await p.evaluate(() => {
    const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^mfake/.test(m.id));
    state.models.push({ id: 'mfake12', customName: 'Magister 12B', fileState: 'ready', fileName: L['gemma-4-12b'].file, stored: true }); saveState();
    lxAsk = function (run, msgs, max, temp, onPiece) { const u = msgs[msgs.length - 1].content; let out = 'Nothing.';
      if (/List the entries of my profile/.test(u)) out = 'ENTRY: education | MA in Education | Northgate University | 2019 | 2021 | Dissertation on the design of online courses\nENTRY: post | Learning technologist | Westbrook College | 2021 | 2024 | Designed three online modules used by 900 students; trained 40 teachers to teach online\nENTRY: project | A study planner app | | 2023 | | Used by 120 students every week\nENTRY: language | French | | | | Working knowledge';
      else if (/List the skills my sources show/.test(u)) out = 'SKILL: Instructional design | BOTH | three online modules used by 900 students | the skills section of a CV\nSKILL: App development | PROFESSIONAL | a study planner used by 120 students | Projects, and a portfolio\nSKILL: Training adults | PROFESSIONAL | trained 40 teachers to teach online | a cover letter';
      else if (/that transfer/.test(u)) out = 'TRANSFER: Training adults | trained 40 teachers to teach online (Westbrook College) | learning design posts; a teaching statement | Trained 40 teachers to teach online, with three modules used by 900 students.\nTRANSFER: Building what she designs | the study planner app, 120 users | education technology posts; a portfolio | Designed and built a study planner that 120 students use every week.\nTRANSFER: Research into course design | the MA dissertation on online course design | a DPhil application; a research proposal | Studied the design of online courses at master\'s level, then designed three.';
      else if (/blind spots/i.test(u)) out = 'BLIND: UNDERSOLD | the study planner app | a reader will not know it exists | add it to Projects with its 120 users and a line on what it does\nBLIND: MISSING | no publication or conference talk yet | a doctoral panel looks for signs of research output | write up the dissertation\'s findings as a short article or a talk\nBLIND: QUESTION | why move from a college post to a doctorate now | a panel will ask | answer it in two sentences in the statement';
      else if (/sets me apart/.test(u)) out = 'EDGE: Designs learning and builds the software for it | three modules and a study planner app | I design how people learn and build the tools they learn with.\nEDGE: Evidence at scale for a first-stage career | 900 students, 40 teachers, 120 app users | My work reached 900 students and 40 teachers in three years.\nPOSITION: PROFESSIONAL | A learning designer who builds: modules used by 900 students and an app used by 120.\nPOSITION: ACADEMIC | A researcher of online course design, with a dissertation and three modules as evidence.\nPOSITION: BRIDGE | Research into how people learn online, tested in tools she designs and builds herself.';
      else if (/clear direction/.test(u)) out = 'PATH: Learning designer in an education technology company, remote | remote and flexible work, long projects, pay that gives security | three modules, 900 students, the planner app | a portfolio online; a named product shipped | Put the planner and one module in a portfolio page | Apply to two remote posts; ask Dr Hale for a reference; read five postings and note what they ask | Leaves evenings and a day a week for the doctorate\nPATH: A funded doctorate in education, part time beside remote work | time to study, research, a doctorate | the MA dissertation and the modules | a supervisor\'s interest; a research question in two sentences | Draft the research question | Write to one possible supervisor; read the department\'s funding page | The work pays for it until funding comes\nFIND: Which education technology companies hire learning designers remotely | read five postings and note the pattern\nFIND: Whether the department takes part-time doctoral students with funding | its own page, then one email to its admissions office';
      else if (/Give me suggestions, the most useful first/.test(u)) out = 'STRENGTHEN: the Experience section | give the number of students for each module\nADD: the study planner app | under Projects, with its 120 users\nCUT: "Available on request" under Referees | name two referees, or leave the heading out\nBLIND: no dates on the app | a reader will ask when it was built\nNEXT: add the app to Projects with its 120 users';
      else if (/concrete steps towards it/.test(u)) out = 'STEP: Read the department\'s page on funding and note each closing date | in two weeks | the dates decide the order of everything else\nSTEP: Draft the research question in two sentences | in a week | every form asks for it\nSTEP: Write to one possible supervisor with a one-page summary | in a month | a supervisor\'s interest is asked for by most routes\nSTEP: Ask Dr Hale and one tutor whether they would write references | in six weeks | two referees are asked for';
      const send = () => { if (onPiece) onPiece(out); return out; }; return Promise.resolve(send()); };
  }); }
const idle = p => p.waitForFunction(() => !IngCareer.run.busy && !IngCounsel.state().chain, null, { timeout: 120000 });
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCounsel, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme(); });
  await stand(p);
  await p.evaluate(() => { const S = IngCareer.state(); S.profile.name = 'Rosalind Okafor'; S.ui.room = 'mentor'; S.ui.show = 'work'; saveState(); go('career'); IngCareer.render(); });
  await p.waitForTimeout(600);
  const shots = {};
  async function take(key) { for (const th of ['day', 'night']) {
      await p.evaluate((th) => { state.theme = th; applyTheme(); IngCareer.render(); const t = document.getElementById('toast'); if (t) t.hidden = true; }, th); await p.waitForTimeout(700);
      await p.evaluate(() => { document.querySelectorAll('.toast, #toast, .ing-toast').forEach(x => { x.hidden = true; x.style.display = 'none'; }); });
      shots[key + '_' + th] = await p.evaluate(() => { const pg = document.getElementById('page-career'); return { html: pg.outerHTML, h: document.getElementById('cs').style.getPropertyValue('--c-h') }; });
      await p.screenshot({ path: path.join(OUT, key + '_' + th + '.png'), clip: { x: 221, y: 44, width: 1143, height: 856 } }); }
    await p.evaluate(() => { state.theme = 'day'; applyTheme(); IngCareer.render(); }); await p.waitForTimeout(300); console.log('took', key); }
  // stage 1, empty, then with everything given
  await take('have0');
  const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.click('#cnAdd')]);
  await fc.setFiles([{ name: 'Rosalind Okafor CV.docx.txt', mimeType: 'text/plain', buffer: Buffer.from(CV) }, { name: 'Letter to Harbour Learning.txt', mimeType: 'text/plain', buffer: Buffer.from(LETTER) }, { name: 'Positions.csv', mimeType: 'text/csv', buffer: Buffer.from(POSITIONS) }]);
  await p.waitForTimeout(1500); await p.evaluate(() => { const me = IngLector.state().me; if (me.cv) me.cv.name = 'Rosalind Okafor CV.docx'; IngCareer.state().profile.files[0].name = 'Letter to Harbour Learning.docx'; saveState(); IngCareer.render(); }); await p.waitForTimeout(300);
  await take('have');
  // stage 2
  await p.evaluate(() => IngCounsel.go('record')); await p.waitForTimeout(300); await take('record0');
  await p.evaluate(() => IngCounsel.build()); await idle(p); await p.waitForTimeout(600); await take('record');
  // stage 3: question 1 with two chips, then the aims
  await p.evaluate(() => { IngCounsel.go('want'); const c = IngCounsel.state(); c.chips.enjoy = ['Building something from start to finish', 'Designing how people learn']; IngCareer.render(); }); await p.waitForTimeout(300); await take('want');
  await p.evaluate(() => { const c = IngCounsel.state(); c.chips.asked = ['Fixing or building technology']; c.chips.drawn = ['Learning design and instructional design', 'Education technology', 'Large technology companies', 'Publishing and editorial', 'A doctorate']; c.chips.need = ['Pay that gives security', 'Working from anywhere', 'Time and leave to study', 'Long, immersive projects']; c.chips.avoid = ['Commuting', 'Fixed hours']; c.chips.where = ['Remotely, from anywhere']; c.chips.when = ['The next intake'];
    c.aims.dphil = { on: true, where: 'Northgate University', prog: 'PhD', field: 'Education', when: 'October 2027' }; c.aims.work = { on: true, kinds: ['Learning design', 'Education technology', 'Large technology companies'], remote: '', hours: ['Fully remote, from anywhere', 'Flexible hours', 'Permanent'] }; c.qi = 8; saveState(); IngCareer.render(); });
  await p.waitForTimeout(300); await take('aims');
  await p.evaluate(() => { const b = [...document.querySelectorAll('#csWork .c-pn-f .c-btn')].find(x => /Finish/.test(x.textContent)); b.click(); }); await idle(p); await p.waitForTimeout(800);
  await take('go');
  await p.evaluate(() => { IngCounsel.week(); IngCounsel.go('week'); }); await p.waitForTimeout(300);
  await p.evaluate(() => { const it = IngCounsel.state().week.items.filter(x => x.kind === 'cvlook')[0]; const cv = IngCareer.edgeDocs().filter(d => d.id === 'cv')[0]; if (it && cv) { IngCareer.docAdvise(cv); } }); await idle(p); await p.waitForTimeout(500);
  await p.evaluate(() => { const it = IngCounsel.state().week.items.filter(x => x.kind === 'cvlook')[0]; if (it) it.done = true; IngCounsel.go('week'); }); await p.waitForTimeout(300); await take('week');
  // the rules that draw the studio, and the tokens they use, by day and by night
  const parts = await p.evaluate(() => {
    const SEL = /r172|#cs\b|#page-career|\.rm-tab|\.c-head|\.cs-fold|#csWho|\.c-who|\.c-hrow|\.cn-|\.field\b|\.c-ta\b|\.page-title|\.lede\b/;
    const rules = [], frames = [], media = [];
    for (const sh of document.styleSheets) { let rs; try { rs = sh.cssRules; } catch (e) { continue; }
      for (const r of rs) {
        if (r.type === 1 && SEL.test(r.selectorText)) rules.push(r.cssText);
        else if (r.type === 7 && /cRise|cnRise/.test(r.name)) frames.push(r.cssText);
        else if (r.type === 4) { const inner = [...r.cssRules].filter(x => x.type === 1 && SEL.test(x.selectorText)).map(x => x.cssText); if (inner.length) media.push('@media ' + r.conditionText + '{' + inner.join('\n') + '}'); } } }
    const vars = new Set(); (rules.join('\n') + media.join('\n')).replace(/var\(\s*(--[\w-]+)/g, (m, v) => { vars.add(v); return m; });
    const toks = {};
    for (const th of ['day', 'night']) { state.theme = th; applyTheme(); const cs = getComputedStyle(document.getElementById('cs')), bd = getComputedStyle(document.body), rt = getComputedStyle(document.documentElement); const o = {};
      vars.forEach(v => { const x = cs.getPropertyValue(v) || bd.getPropertyValue(v) || rt.getPropertyValue(v); if (x) o[v] = x.trim(); }); o['--font'] = bd.fontFamily; o['--bg'] = bd.backgroundColor; o['--ink'] = bd.color; toks[th] = o; }
    state.theme = 'day'; applyTheme();
    return { rules, media, frames, toks, bodyClass: document.body.className, fontSize: getComputedStyle(document.body).fontSize };
  });
  fs.writeFileSync(path.join(OUT, 'parts.json'), JSON.stringify({ shots, rules: parts.rules, media: parts.media, frames: parts.frames, toks: parts.toks, fontSize: parts.fontSize }, null, 0));
  console.log('rules', parts.rules.length, 'media', parts.media.length, 'frames', parts.frames.length, 'errors', errs);
  await b.close();
})().catch(e => { console.error(e); process.exit(2); });
