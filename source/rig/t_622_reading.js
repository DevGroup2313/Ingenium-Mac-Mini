// Ingenium 6.22 (5 November 2026): the Career Studio reads a posting as an admissions tutor and a recruiter would (modules/r188.js), and
// shows the model's reasoning while it works (build_page.py: lxAsk hands it on). Her words: "The Career Studio does not analyse the job
// postings or uploading applications properly, it is waiting to see everything written from my profile to match the roles or applications
// requirements verbatim ... I want it to be more nuanced ... I want the Career Studio to bridge the gaps from my resume without inventing
// any experience, skills and education"; and "Instead of seeing a blank canvas, I want to see the model's thinking on the Applications tab".
// A stand-in model streams a reading in the new form, and its reasoning; an invented applicant and an invented posting only.
//   node rig/t_622_reading.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1200))); c ? pass++ : fail++; };
const POST = 'Learning Designer\nExample Learning Ltd\nWe are looking for a learning designer to build online courses.\nEssential: a degree in a relevant field; experience designing learning materials; excellent written communication; experience with an authoring tool such as Articulate Storyline; the right to work in the United Kingdom.\nDesirable: experience with AI tools in education; a project management certificate.\nThe closing date is 30 November 2026.\n';
const THINK = ['The posting asks for five essential things. ', 'The MSt is a relevant degree, so that one is met directly. ', 'Her seminar guides as a teaching assistant are learning design in a university setting: that transfers. ', 'Nothing in the profile names an authoring tool; that is learnable. ', 'Right to work is not said; I should ask her.'];
const ANSWER = ['TITLE: Learning Designer', 'ORGANISATION: Example Learning Ltd', 'CLOSES: 30 November 2026', 'KIND: JOB',
  'CRITERION: A degree in a relevant field | ESSENTIAL | MET | MSt in Digital Humanities, University of Exampleton | The MSt is a postgraduate degree in a relevant humanities field.',
  'CRITERION: Experience designing learning materials | ESSENTIAL | TRANSFERABLE | Teaching assistant, Introduction to Sociology | Preparing the seminar guides and reading packs for first-year students is learning design in a university setting.',
  'CRITERION: Excellent written communication | ESSENTIAL | TRANSFERABLE | MSt in Digital Humanities, University of Exampleton | The dissertation on archives and annotation shows sustained, clear academic writing.',
  'CRITERION: Experience with an authoring tool such as Articulate Storyline | ESSENTIAL | NOT SHOWN | none | The profile names no authoring tool. | LEARNABLE: a short course in Articulate Storyline and one sample module would show it',
  'CRITERION: The right to work in the United Kingdom | ESSENTIAL | NOT SHOWN | none | The profile does not say. | ASK ME: say whether you hold the right to work in the United Kingdom',
  'CRITERION: Experience with AI tools in education | DESIRABLE | TRANSFERABLE | Quillpad, an offline writing app | Designing and building an offline writing app for students is practical work with educational technology.',
  'CRITERION: A project management certificate | DESIRABLE | MET | PRINCE2 Practitioner certificate | Holds the PRINCE2 Practitioner certificate.',
  'READING: A hiring manager would see a humanities graduate with real teaching and app design behind her. The authoring tool is the one practical gap, and it can be closed before applying.',
  'STRENGTH: Teaching materials made for real students.', 'CONCERN: No authoring tool is named.', 'NEXT: Make one sample module in Storyline.', 'ASK: Is the post open to remote work?',
  'LEAD: Teaching assistant, Introduction to Sociology | experience designing learning materials'];
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  // the hook itself: lxAsk hands a model's reasoning on, on this device and through a connection
  // lxAsk is wrapped by other parts (the recipe, the writing guard, effort), so the page's own source is read for it
  const hook = await p.evaluate(() => fetch(location.href).then(r => r.text()).then(t => ({ n: t.split('typeof LX.onThink==="function")LX.onThink(t)').length - 1 })));
  ok(hook.n === 2, 'lxAsk hands the model\'s reasoning on (on this device and through a connection)', hook);
  // a stand-in model: streams the reasoning first, then the answer line by line, as a real one does
  await p.evaluate(([THINK, ANSWER]) => {
    const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^mfake/.test(m.id));
    state.models.push({ id: 'mfake12', customName: 'Stand-in 12B', fileState: 'ready', fileName: L['gemma-4-12b'].file, stored: true }); saveState();
    window.__asked = []; window.__gate = null;
    lxAsk = function (run, msgs, max, temp, onPiece) { const u = msgs[msgs.length - 1].content; window.__asked.push({ sys: msgs[0].content, u: u.slice(0, 20000) });
      if (/^Read THE /.test(u)) return new Promise((res) => { let i = 0, out = '';
        const step = () => { if (i < THINK.length) { if (LX.onThink) LX.onThink(THINK[i]); i++; setTimeout(step, 250); return; }
          const j = i - THINK.length; if (j < ANSWER.length) { out += (out ? '\n' : '') + ANSWER[j]; if (onPiece) onPiece(out); i++; setTimeout(step, j === 6 ? 2600 : 120); return; } res(out); };
        step(); });
      const out = 'A drafted document.'; if (onPiece) onPiece(out); return Promise.resolve(out); };
    const P = IngCareer.state().profile; P.name = 'Ada Example';
    P.items.push({ id: 'i1', sec: 'education', title: 'MSt in Digital Humanities', place: 'University of Exampleton', from: '2021', to: '2022', text: 'Dissertation on archives and annotation, with distinction.', src: 'me' });
    P.items.push({ id: 'i2', sec: 'post', title: 'Teaching assistant, Introduction to Sociology', place: 'University of Exampleton', from: '2022', to: '2024', text: 'Prepared seminar guides and reading packs for first-year students; marked essays.', src: 'me' });
    P.items.push({ id: 'i3', sec: 'project', title: 'Quillpad, an offline writing app', place: '', from: '2025', to: '', text: 'Designed and built an offline writing app for students.', src: 'me' });
    saveState(); }, [THINK, ANSWER]);
  const id = await p.evaluate(post => IngCareer.newOpp('job', post, 'pasted').then(o => { o.step = 'post'; saveState(); const S = IngCareer.state(); S.ui.room = 'apps'; S.ui.open = o.id; S.ui.show = 'work'; go('career'); IngCareer.render(); return o.id; }), POST);
  await p.waitForTimeout(500);
  // the request: generous and honest; the entry named; the gap typed; the reader's view
  await p.evaluate(() => { const k = [...document.querySelectorAll('#cs button')].find(x => x.offsetParent && /Read it against my profile/.test(x.textContent)); k.click(); });
  await p.waitForTimeout(900);
  const live1 = await p.evaluate(() => ({ think: (document.getElementById('csThinkB') || {}).textContent || '', thinkShown: !!(document.getElementById('csThink') || {}).offsetParent, state: (document.getElementById('csLiveState') || {}).textContent || '' }));
  ok(/five essential things/.test(live1.think) && live1.thinkShown, 'while it works: the model\'s reasoning is shown as it comes, not a blank panel', live1);
  ok(/reasoning|reading the posting/i.test(live1.state) && /seconds|min/.test(live1.state), 'and a line says what it is doing, with the time so far', live1.state);
  await p.screenshot({ path: OUT + '/622_live_think.png' });
  await p.waitForFunction(() => { const t = document.querySelector('#csSoFar table'); return t && t.querySelectorAll('tbody tr').length >= 2; }, null, { timeout: 30000 });
  const live2 = await p.evaluate(() => ({ rows: document.querySelectorAll('#csSoFar tbody tr').length, chips: [...document.querySelectorAll('#csSoFar .c-st')].map(x => x.textContent), state: document.getElementById('csLiveState').textContent, raw: (document.getElementById('csLive') || {}).style.display }));
  ok(live2.rows >= 2 && live2.chips.includes('Shown') && live2.chips.includes('Transfers') && /judged so far/.test(live2.state) && live2.raw === 'none', 'each criterion shows as it is judged, in a table, in place of the raw text', live2);
  await p.screenshot({ path: OUT + '/622_live_rows.png' });
  await p.waitForFunction(() => !IngCareer.run.busy, null, { timeout: 60000 }); await p.waitForTimeout(500);
  const asked = await p.evaluate(() => window.__asked.find(a => /^Read THE /.test(a.u)));
  ok(asked && /admissions tutor and recruiter/.test(asked.u) && /TRANSFERABLE/.test(asked.u) && /Credit what transfers/.test(asked.u) && /never invent/.test(asked.u), 'the request reads as an admissions tutor and a recruiter: it credits what transfers, and never invents', asked && asked.u.slice(0, 400));
  ok(asked && /LEARNABLE or ASK ME or REQUIRED/.test(asked.u) && /the entry it rests on/.test(asked.u) && /^READING:/m.test(asked.u), 'it asks for the entry each judgement rests on, the kind of each gap, and how a reader would see it', null);
  ok(asked && /drawing the link, not stretching/.test(asked.sys) && /Never invent a skill/.test(asked.sys), 'the rule for every piece of writing: draw the link from the record, never claim beyond it', asked && asked.sys.slice(0, 300));
  // what was kept
  const r = await p.evaluate((id) => { const o = IngCareer.state().opps.find(x => x.id === id); return { crit: o.read.r.crit.map(c => ({ t: c.text.slice(0, 30), st: c.st, gap: c.gap, src: c.src, vet: c.vet, at: c.at, was: c.was || '' })), view: o.read.r.view, think: (o.read.think || '').length, band: IngCareer.bandOf(o.read.r) }; }, id);
  const C = r.crit;
  ok(C[0].st === 'met' && C[0].vet === 'found' && C[0].at === 'entry', 'a degree in her profile: shown, found by the entry it names', C[0]);
  ok(C[1].st === 'transfer' && C[1].vet === 'found' && C[2].st === 'transfer', 'teaching materials and a dissertation: they transfer, and they are found in her profile', [C[1], C[2]]);
  ok(C[3].st === 'none' && C[3].gap === 'learn' && C[4].st === 'none' && C[4].gap === 'ask', 'the authoring tool is learnable; the right to work waits on her (Ask me)', [C[3], C[4]]);
  ok(C[6].st === 'partly' && C[6].was === 'met' && C[6].vet === 'missing', 'a certificate she does not have: not found in her profile, so it counts only as partly shown', C[6]);
  ok(/hiring manager would see a humanities graduate/.test(r.view) && r.think > 100, 'the reader\'s view and the model\'s reasoning are kept with the reading', { view: r.view, think: r.think });
  ok(r.band.band === 'possible' && r.band.ifAsk && r.band.ifAsk.band === 'good' && Math.abs(r.band.score - 0.61) < 0.02, 'the band, by the stated rule: a possible fit now, a good fit if the Ask me one is hers', r.band);
  ok(/2 transfer from your other work/.test(r.band.why[0]) && r.band.why.some(w => /If it is, this would be a good fit/.test(w)), 'its reasons count what transfers, and say what it would be if the Ask me one is hers', r.band.why);
  // How you fit
  const v = await p.evaluate(() => { const w = document.querySelector('#csWork'); const t = (s) => [...w.querySelectorAll(s)].map(x => x.textContent.trim());
    return { band: t('.c-bandcard h3')[0], view: t('.c-bandcard .c-view')[0] || '', h3: t('.c-h3'), chips: t('.c-tab .c-st'), gaps: t('.c-tab .c-gap'), bridge: t('.c-bridge')[0] || '', src: t('.c-from'), think: !!w.querySelector('details.c-think'), listChip: (document.querySelector('#cs .c-list .c-opp .c-chip.c-band-possible') || {}).textContent || '' }; });
  ok(v.band === 'Possible fit' && /How a reader would see it/.test(v.view), 'How you fit: the band, with how a reader would see it', v);
  ok(v.h3.includes('Waiting on you') && v.h3.includes('Gaps you could close'), 'what waits on her, and the gaps she could close, each in its place', v.h3);
  ok(v.chips.filter(x => x === 'Transfers').length === 3 && v.gaps.includes('Learnable') && v.gaps.includes('Ask me'), 'the table says Transfers, and marks each gap Learnable or Ask me', { chips: v.chips, gaps: v.gaps });
  ok(/^The link to make:/.test(v.bridge) && v.src.includes('Teaching assistant, Introduction to Sociology'), 'for each that transfers: the entry it rests on, and the link to make', { bridge: v.bridge, src: v.src });
  ok(v.think, 'How the model reasoned, kept and foldable', v.think);
  ok(/Possible fit/.test(v.listChip), 'the application\'s card in the list carries the band', v.listChip);
  await p.screenshot({ path: OUT + '/622_fit.png', fullPage: false });
  await p.evaluate(() => { const b = document.querySelector('#csWork .c-pn-b'); if (b) b.scrollTop = b.scrollHeight; }); await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/622_fit_lower.png' });
  // the writer is told what transfers and the link to make, and never to claim what is not shown
  await p.evaluate((id) => IngCareer.write(IngCareer.state().opps.find(x => x.id === id), 'cover'), id); await p.waitForFunction(() => !IngCareer.run.busy, null, { timeout: 60000 });
  const wr = await p.evaluate(() => { const a = window.__asked[window.__asked.length - 1]; return a ? a.u : ''; });
  ok(/TRANSFERS; from: Teaching assistant, Introduction to Sociology; the link: Preparing the seminar guides/.test(wr) && /NOT SHOWN: do not claim it/.test(wr) && /I may say how I am closing it: a short course/.test(wr), 'the cover letter is asked to make the link plain, from the entry named, and to claim nothing not shown', (wr.match(/THE CRITERIA[\s\S]{0,900}/) || [''])[0]);
  // an earlier reading (the four-part line) still reads, and is offered a fuller reading
  const old = await p.evaluate(() => { const r0 = IngCareer.parseRead('CRITERION: A degree | ESSENTIAL | MET | MSt in History\nCRITERION: Teaching | ESSENTIAL | NOT SHOWN | none'); return { c: r0.crit.map(c => [c.st, c.ev, c.src, c.gap]), band: IngCareer.bandOf(r0).band }; });
  ok(old.c[0][0] === 'met' && old.c[0][1] === 'MSt in History' && old.c[1][0] === 'none' && old.band === 'stretch', 'a reading in the earlier four-part form still reads, under the new rule', old);
  // programmes and people from a file (6.22): added once, a person tied to the programme the file names, nothing doubled
  const pk = await p.evaluate(() => { const pack = { kind: 'ingenium-career-pack', v: 1, made: '5 November 2026',
      opps: [{ kind: 'phd', title: 'PhD in Example Studies', org: 'University of Exampleton', closes: '8 December 2026', due: '2026-12-08', text: 'PhD in Example Studies. University of Exampleton. A research proposal of up to 1,500 words. Two references. The application deadline is 8 December 2026.', notes: 'Name a supervisor before applying.' },
             { kind: 'job', title: 'Learning Designer', org: 'Example Learning Ltd', text: 'The same posting again, which must not be added twice because it is already here in Applications.' }],
      contacts: [{ name: 'Dr Jane Example', role: 'supervisor', org: 'University of Exampleton', email: 'jane@example.org', opp: 'PhD in Example Studies', notes: 'Digital tools and learning.' }] };
    const d = IngProfileFile.read(JSON.stringify(pack)); return IngProfileFile.apply(d).then(got => { const S = IngCareer.state(); const o = S.opps.find(x => x.title === 'PhD in Example Studies');
      const c = (S.contacts || []).find(x => x.name === 'Dr Jane Example'); return { got, n: S.opps.filter(x => x.title === 'Learning Designer').length, o: o ? { kind: o.kind, due: o.due, org: o.org, notes: o.notes } : null, c: c ? { role: c.role, opp: c.opp === (o && o.id), status: c.status } : null }; }); });
  ok(pk.got.opps === 1 && pk.got.contacts === 1 && pk.n === 1, 'a file brings in a programme and a person; the posting already here is not added twice', pk);
  ok(pk.o && pk.o.kind === 'phd' && pk.o.due === '2026-12-08' && pk.o.org === 'University of Exampleton' && /supervisor/.test(pk.o.notes), 'the programme keeps its kind, its date, its organisation and its notes', pk.o);
  ok(pk.c && pk.c.role === 'supervisor' && pk.c.opp && pk.c.status === 'write', 'the person is a potential supervisor, tied to that programme, waiting to be written to', pk.c);
  ok(!errs.length, 'no errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
