// Templates by field and role, and the portfolio (Ingenium 6.10.2, modules/r209.js and r188.js). Her words (3 November 2026): "I want
// for Ingenium and its pages to have resume templates and cover letter templates for different industry and different roles within them
// ... to help any applicant ... best curate their experience and education ... and portfolio for their future roles", and "I want the
// Career Studio to genuinely help me build and refine my portfolio for any job application ... phd application or fellowship
// application, grant, scholarship application". A stand-in for Anthropic's Messages API writes the documents. The person is invented.
//   node rig/t_6102_templates.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const BASE = new URL(URL_).origin + '/mockanthropic';
const ev = (o) => 'event: ' + o.type + '\ndata: ' + JSON.stringify(o) + '\n\n';
const DOC = '## Experience\n**Learning Designer**, The Open Example University, 2022 to present\n- Designed twelve online courses with academic staff.\n\n## Education\n**MPhil in the History of Science**, University of Somewhere, 2020 to 2021';
let sent = [];
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1360, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.route('**/mockanthropic/**', (route) => { const bd = JSON.parse(route.request().postData() || '{}'); sent.push(bd);
    route.fulfill({ status: 200, contentType: 'text/event-stream', body: ev({ type: 'message_start', message: { model: 'claude-fable-5-1', usage: { input_tokens: 1 } } }) + ev({ type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } })
      + ev({ type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text: DOC } }) + ev({ type: 'message_delta', delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 5 } }) + ev({ type: 'message_stop' }) }); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(400);
  await p.evaluate((BASE) => { window.__toasts = []; const o = window.ingToast; window.ingToast = function (t) { window.__toasts.push(String(t)); return o.apply(this, arguments); };
    state.cloud = { on: false, provider: 'anthropic', base: BASE, key: 'sk-test-not-real', model: 'claude-fable-5-1', models: ['claude-fable-5-1'], info: { 'claude-fable-5-1': { ctx: 1000000, out: 128000 } } }; saveState(); lxSetCloud(true);
    go('career'); const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.profile.name = 'Ada Applicant';
    s.profile.items = [{ id: 'i1', sec: 'post', title: 'Learning Designer', place: 'The Open Example University', from: '2022', to: 'present', text: '- Designed twelve online courses with academic staff.', src: 'me', at: Date.now() },
      { id: 'i2', sec: 'education', title: 'MPhil in the History of Science', place: 'University of Somewhere', from: '2020', to: '2021', text: '', src: 'me', at: Date.now() }];
    s.ui.room = 'learn'; s.ui.show = 'list'; s.ui.learnTpl = false; saveState(); IngCareer.render(); }, BASE);
  await p.waitForTimeout(500);
  const T = await p.evaluate(() => ({ n: IngTemplates.list.length, inds: IngTemplates.industries.length, m: [IngTemplates.match('Senior Learning Technologist', ''), IngTemplates.match('Product Manager, AI tutoring', 'edtech'), IngTemplates.match('Instructional Designer', 'online learning'), IngTemplates.match('Research Software Engineer', ''), IngTemplates.match('Barista', 'coffee')].map((x) => x && x.id) }));
  ok(T.n >= 24 && T.inds === 8, '1. a library of templates: at least 24 roles in 8 fields', T);
  ok(JSON.stringify(T.m) === JSON.stringify(['lt', 'pm', 'ld', 'rse', null]), '1. a posting is matched to its template by its words, and to none when nothing fits', T.m);
  const press = (re) => p.evaluate((src) => { const r = new RegExp(src); const k = [...document.querySelectorAll('#page-career button')].find((x) => x.offsetParent && r.test(x.textContent.trim())); if (k) { k.click(); return true; } return false; }, re.source);
  const text = () => p.evaluate(() => (document.getElementById('page-career') || {}).innerText || '');
  // 2. Learn: the templates, by field, then a role
  await press(/^CV and letter templates/); await p.waitForTimeout(400); let t = await text();
  ok(/Universities and research/.test(t) && /Education and learning design/.test(t) && /Fellowships, grants and scholarships/.test(t), '2. Learn opens the templates, by field', t.slice(0, 300));
  await press(/^Education and learning design/); await p.waitForTimeout(300);
  await press(/^Learning designer or instructional designer/); await p.waitForTimeout(400); t = await text();
  ok(/What its readers look for/.test(t) && /The CV, in this order/.test(t) && /Portfolio:?\s*a link/.test(t) && /The cover letter's moves/.test(t) && /Length and form/.test(t) && /Avoid/.test(t) && /An example line, to show the shape/.test(t) && /\[learners\]/.test(t),
    '2. a role\'s template: what its readers look for, the CV in order, the letter\'s moves, length, what to avoid, and an example line with places for her facts', t.slice(0, 500));
  await p.screenshot({ path: OUT + '/template.png' });
  // 3. used for an application: its CV follows the template, every fact from her profile
  await p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.opps.push({ id: 'op-ld', kind: 'job', title: 'Instructional Designer', org: 'Example Learning', closes: '', due: '', stage: 'considering', at: Date.now(), docs: {}, older: {}, emails: [], practice: { crit: {}, qs: [] }, notes: '', way: 'auto' }); saveState(); IngCareer.render(); });
  await p.waitForTimeout(300);
  await p.evaluate(() => { const sel = [...document.querySelectorAll('#page-career .c-work .c-pn-f select')][0]; sel.value = 'op-ld'; sel.dispatchEvent(new Event('change')); }); await p.waitForTimeout(500);
  const o1 = await p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0], o = s.opps.find((x) => x.id === 'op-ld'); return { tpl: o.tpl, step: o.step, room: s.ui.room, open: s.ui.open }; });
  t = await text();
  ok(o1.tpl === 'ld' && o1.step === 'send' && o1.room === 'apps' && /Template/i.test(t) && /See the template/.test(t), '3. Use it for an application: the application follows it, and What you send says so', o1);
  sent = [];
  await press(/^Write the tailored CV$/); for (let i = 0; i < 80; i++) { const busy = await p.evaluate(() => IngCareer.run.busy); if (!busy && sent.length) break; await p.waitForTimeout(250); }
  const u = JSON.stringify((sent[0] || {}).messages || []);
  ok(/FOLLOW THIS TEMPLATE: a CV for Learning designer or instructional designer \(Education and learning design\)/.test(u) && /Sections, in this order/.test(u) && /Every fact, title, date and figure comes from THE PROFILE, never from this template/.test(u),
    '3. writing the CV, the model is given the template\'s shape and the rule that every fact comes from her profile', u.slice(0, 300));
  // 4. a posting with no template chosen: one is suggested
  await p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.opps.push({ id: 'op-rse', kind: 'job', title: 'Research Software Engineer', org: 'Example Lab', closes: '', due: '', stage: 'considering', at: Date.now(), docs: {}, older: {}, emails: [], practice: { crit: {}, qs: [] }, notes: '', way: 'auto', step: 'send', sv: { kind: 'cover' } }); s.ui.open = 'op-rse'; s.ui.show = 'work'; saveState(); IngCareer.render(); });
  await p.waitForTimeout(600); t = await text();
  ok(/Suggested for this posting/.test(t) && /Use Research software engineer or research technologist/.test(t), '4. a posting with no template: the studio suggests the one its words fit', (t.match(/Suggested for this posting[^\n]*/) || [''])[0]);
  await press(/^Use Research software engineer/); await p.waitForTimeout(300);
  ok(await p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; return s.opps.find((x) => x.id === 'op-rse').tpl === 'rse'; }), '4. one press uses it');
  // 5. the portfolio: a document of its own, its case studies drawn from her work
  const nav = await p.evaluate(() => [...document.querySelectorAll('#page-career .c-nav .c-item b')].map((x) => x.textContent));
  ok(nav.includes('Portfolio'), '5. What you send offers a Portfolio for a job', nav);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#page-career .c-nav .c-item')].find((x) => /^Portfolio/.test(x.textContent)); k.click(); }); await p.waitForTimeout(300);
  sent = []; await press(/^Write the portfolio$/); for (let i = 0; i < 80; i++) { const busy = await p.evaluate(() => IngCareer.run.busy); if (!busy && sent.length) break; await p.waitForTimeout(250); }
  const u2 = JSON.stringify((sent[0] || {}).messages || []);
  ok(/Write my portfolio for Research Software Engineer, Example Lab/.test(u2) && /two to four pieces of my own work as short case studies/.test(u2) && /no figure, user number or outcome it does not give/.test(u2) && /FOLLOW THIS TEMPLATE: a portfolio for Research software engineer/.test(u2),
    '5. the portfolio is written as case studies chosen for this application, in its template\'s shape, never inventing a result', u2.slice(0, 260));
  await p.screenshot({ path: OUT + '/portfolio.png' });
  // 6. the lesson on portfolios
  const ls = await p.evaluate(() => IngCareer.lessons.map((l) => l[0]));
  ok(ls.includes('A portfolio for an application'), '6. Learn has a lesson on the portfolio', ls);
  ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
