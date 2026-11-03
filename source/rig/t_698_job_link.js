// A posting from its link, read against her profile at once (Ingenium 6.9.8, modules/r188.js). Her words (3 November 2026):
// "I want to be able to paste a link of a job that I am interested in applying to in the Career studio and have the analysis be
// done and the match profile for me and the job be done from there ... Ingenium can go online to get the information", and "I want
// to be able to link my LinkedIn account to Ingenium so that I can have Ingenium fetch my saved jobs easier".
// The sites here are stand-ins (page.route), built from the documented shapes: Greenhouse's Job Board API, Lever's Postings API,
// and schema.org's JobPosting. A stand-in for Anthropic's Messages API writes the reading; no real key is used. People are invented.
//   node rig/t_698_job_link.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d).slice(0, 700) : '')); c ? pass++ : fail++; };
const BASE = new URL(URL_).origin + '/mockanthropic';
const ev = (o) => 'event: ' + o.type + '\ndata: ' + JSON.stringify(o) + '\n\n';
const READING = ['TITLE: Learning Technologist', 'ORGANISATION: University of Example', 'CLOSES: 30 November 2026', 'KIND: JOB',
  'CRITERION: Experience designing online courses | ESSENTIAL | MET | Designed twelve online courses with academic staff',
  'CRITERION: Experience leading a development team | ESSENTIAL | MET | Led a team of ten developers at a bank',
  'CRITERION: Knowledge of accessibility standards | DESIRABLE | PARTLY | Accessibility audits against WCAG',
  'STRENGTH: Course design shown plainly.', 'CONCERN: No team leadership shown.', 'NEXT: Add any leadership you have done to your profile.', 'ASK: Is the post open to part-time work?',
  'LEAD: Learning Designer, The Open Example University | Experience designing online courses',
  'LEAD: Chief Technology Officer, Big Bank | leading a team'].join('\n');
const ACAO = { 'access-control-allow-origin': '*' };
const html = (body, head) => '<!doctype html><html><head><meta charset="utf-8">' + (head || '') + '</head><body>' + body + '</body></html>';
const DESC = '<p>The Centre for Digital Learning seeks a Learning Technologist to work with academic staff on online courses.</p><h3>What you will do</h3><ul><li>Design online courses with academic colleagues</li><li>Run usability tests with students</li></ul><h3>Essential criteria</h3><ul><li>Experience designing online courses</li><li>Experience leading a development team</li></ul><p>We welcome applications from people of every background, and we offer flexible working.</p>';
const LD = { '@context': 'https://schema.org', '@graph': [{ '@type': 'WebPage', name: 'Vacancy' }, { '@type': 'JobPosting', title: 'Learning Technologist', hiringOrganization: { '@type': 'Organization', name: 'University of Example' },
  jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Oxford', addressCountry: 'United Kingdom' } }, datePosted: '2026-11-01', validThrough: '2026-11-30T23:59:00+00:00', employmentType: 'FULL_TIME',
  baseSalary: { '@type': 'MonetaryAmount', currency: 'GBP', value: { '@type': 'QuantitativeValue', minValue: 38000, maxValue: 45000, unitText: 'YEAR' } }, description: DESC }] };
// a raw line break inside a JSON string, a fault some sites leave: it must still be read
const LDtext = JSON.stringify(LD).replace('people of every background', 'people of every\nbackground');
const PAGES = {
  'https://jobs.example.ac.uk/vacancy/learning-technologist-123': { status: 200, body: html('<header><nav>Home · Jobs · Sign in</nav></header><main><h1>Learning Technologist</h1><p>Short teaser.</p></main><footer>Cookies</footer>', '<script type="application/ld+json">' + LDtext + '</script>') },
  'https://careers.example.org/jobs/77': { status: 200, body: html('<nav>Menu</nav><main><h1>Digital Humanities Research Associate</h1><p>Example Institute</p><p>We are looking for a research associate to work on the digitisation of letters held in our archive, with a team of historians and engineers, for two years.</p><h2>You will need</h2><ul><li>A doctorate, or near completion, in history or a related field</li><li>Experience with TEI encoding of historical texts</li><li>Clear writing for scholarly and public readers</li></ul><p>Closing date: 15 December 2026. Interviews will be held in January. The post is full time and based in Edinburgh, with some work from home possible.</p></main><footer>© Example Institute</footer>') },
  'https://jobs.example.ac.uk/vacancy/gone': { status: 404, body: html('<h1>Not found</h1>') },
  'https://apply.example.com/j/ABC': { status: 200, body: html('<div id="root"></div><noscript>You need to enable JavaScript to run this app.</noscript>') },
  'https://www.linkedin.com/jobs/view/3999999999/': { status: 200, body: html('<main><h1>Sign in to view more jobs</h1><p>Join now</p><p>Agree &amp; Join LinkedIn</p></main>') },
};
const GH = { id: 4012345, internal_job_id: 1, title: 'Learning Experience Designer', updated_at: '2026-10-28T10:00:00Z', first_published: '2026-10-20T09:00:00Z', requisition_id: 'R1', location: { name: 'Remote, United Kingdom' },
  absolute_url: 'https://job-boards.greenhouse.io/exampleco/jobs/4012345', company_name: 'Example Learning', language: 'en', metadata: null, application_deadline: '2026-12-01',
  content: '&lt;p&gt;Example Learning builds courses for adult learners.&lt;/p&gt;&lt;h3&gt;What you bring&lt;/h3&gt;&lt;ul&gt;&lt;li&gt;Experience designing online courses for adults&lt;/li&gt;&lt;li&gt;A portfolio of learning design work&lt;/li&gt;&lt;li&gt;Comfort with research on how people learn&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;We are a remote team across the United Kingdom, and we meet in person twice a year.&lt;/p&gt;' };
const GH2 = Object.assign({}, GH, { id: 4099999, title: 'Learning Designer', absolute_url: 'https://job-boards.greenhouse.io/exampleco/jobs/4099999' });
const LV = { id: '5ac21346-8e0c-4494-8e7a-3eb92ff77902', text: 'Research Technologist', categories: { location: 'London', commitment: 'Full-time', team: 'Research', department: 'Labs', allLocations: ['London'] },
  description: '<div>We build tools for historians.</div>', descriptionPlain: 'We build tools for historians and archivists, and we need a research technologist who can turn archives into data that scholars can use well.',
  lists: [{ text: 'What you will need', content: '<li>Python for working with texts</li><li>Experience with archives or special collections</li>' }],
  additional: '<div>We offer a hybrid week.</div>', additionalPlain: 'We offer a hybrid week, with two days in the London office.', hostedUrl: 'https://jobs.lever.co/exampleai/5ac21346-8e0c-4494-8e7a-3eb92ff77902', applyUrl: 'https://jobs.lever.co/exampleai/5ac21346-8e0c-4494-8e7a-3eb92ff77902/apply', workplaceType: 'hybrid' };
let sent = [], hits = [];
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route('**/mockanthropic/**', (route) => { const bd = JSON.parse(route.request().postData() || '{}'); sent.push(bd);
    route.fulfill({ status: 200, contentType: 'text/event-stream', body: ev({ type: 'message_start', message: { model: 'claude-fable-5-1', usage: { input_tokens: 1 } } }) + ev({ type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } })
      + ev({ type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text: READING } }) + ev({ type: 'message_delta', delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 5 } }) + ev({ type: 'message_stop' }) }); });
  await p.route(/^https:\/\/(jobs\.example\.ac\.uk|careers\.example\.org|apply\.example\.com|www\.linkedin\.com)\//, (route) => { const u = route.request().url(); hits.push(u); const pg = PAGES[u];
    if (!pg) return route.fulfill({ status: 404, headers: ACAO, contentType: 'text/html', body: html('<h1>Not found</h1>') });
    route.fulfill({ status: pg.status, headers: ACAO, contentType: 'text/html; charset=utf-8', body: pg.body }); });
  await p.route('https://boards-api.greenhouse.io/v1/boards/exampleco/jobs/*', (route) => { const u = route.request().url(); hits.push(u);
    const j = /4012345$/.test(u) ? GH : /4099999$/.test(u) ? GH2 : null; route.fulfill({ status: j ? 200 : 404, headers: ACAO, contentType: 'application/json', body: JSON.stringify(j || { status: 404 }) }); });
  await p.route('https://api.lever.co/v0/postings/**', (route) => { hits.push(route.request().url()); route.fulfill({ status: 200, headers: ACAO, contentType: 'application/json', body: JSON.stringify(LV) }); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(500);
  await p.evaluate((BASE) => { window.__toasts = []; const o = window.ingToast; window.ingToast = function (t) { window.__toasts.push(String(t)); return o.apply(this, arguments); };
    state.cloud = { on: false, provider: 'anthropic', base: BASE, key: 'sk-test-not-real', model: 'claude-fable-5-1', models: ['claude-fable-5-1'], info: { 'claude-fable-5-1': { ctx: 1000000, out: 128000 } } }; saveState(); lxSetCloud(true);
    go('career'); const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.profile.name = 'Ada Applicant';
    s.profile.items = [{ id: 'i1', sec: 'post', title: 'Learning Designer', place: 'The Open Example University', from: '2022', to: 'present', text: '- Designed twelve online courses with academic staff.\n- Ran usability tests with students.', src: 'me', at: Date.now() },
      { id: 'i2', sec: 'education', title: 'MPhil in the History of Science', place: 'University of Somewhere', from: '2020', to: '2021', text: 'Dissertation on the analytical engine.', src: 'me', at: Date.now() },
      { id: 'i3', sec: 'skill', title: 'Accessibility', place: '', text: 'Accessibility audits against WCAG 2.2.', src: 'me', at: Date.now() }];
    s.ui.room = 'apps'; s.ui.open = null; s.ui.show = 'list'; saveState(); go('career'); }, BASE);
  await p.waitForTimeout(700);
  const text = () => p.evaluate(() => (document.getElementById('page-career') || {}).innerText || '');
  const toasts = () => p.evaluate(() => window.__toasts.join(' | '));
  const S = () => p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; return s; });
  const opp = (re) => p.evaluate((src) => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0], o = s.opps.find((x) => new RegExp(src).test(/^https?:/.test(src.replace(/\\/g, '')) ? (x.url || '') : (x.title || ''))); if (!o) return null;
    return { id: o.id, title: o.title, org: o.org, closes: o.closes, due: o.due, url: o.url, how: o.how, kind: o.kind, stage: o.stage, step: o.step, titleSet: !!o.titleSet, read: o.read ? { crit: o.read.r.crit, lead: o.read.r.lead, leadOff: o.read.r.leadOff || 0 } : null }; }, re.source);
  const postText = (id) => p.evaluate(async (id) => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0], o = s.opps.find((x) => x.id === id); return String(await IngBig.load(o.ref) || ''); }, id);
  const waitRead = async (re) => { for (let i = 0; i < 80; i++) { const o = await opp(re); if (o && o.read) return o; await p.waitForTimeout(250); } return opp(re); };
  const pasteLink = async (sel, url) => { await p.focus(sel); await p.evaluate(({ sel, url }) => { const i = document.querySelector(sel); i.value = url; i.dispatchEvent(new ClipboardEvent('paste', { bubbles: true })); }, { sel, url }); };

  // 1. the link row leads the Applications room; its address is tidied
  let t = await text();
  ok(/Bring a posting by its link/.test(t) && await p.$('#page-career .c-quick input[type=url]') !== null, '1. the Applications room opens with a field for a posting\'s link', t.slice(0, 160));
  const norm = await p.evaluate(() => { const n = IngCareer.jl.norm; return [n('https://www.linkedin.com/jobs/collections/recommended/?currentJobId=3999999999&trk=x'), n('linkedin.com/jobs/view/learning-designer-at-example-3999999999?refId=abc'),
    n('https://uk.indeed.com/jobs?q=learning+designer&vjk=0a1b2c3d4e5f'), n('https://jobs.example.ac.uk/vacancy/123?utm_source=newsletter&utm_medium=email&ref=7'), n('not a link'), n('jobs.example.ac.uk/vacancy/123')]; });
  ok(norm[0] === 'https://www.linkedin.com/jobs/view/3999999999/' && norm[1] === 'https://www.linkedin.com/jobs/view/3999999999/' && norm[2] === 'https://uk.indeed.com/viewjob?jk=0a1b2c3d4e5f'
    && norm[3] === 'https://jobs.example.ac.uk/vacancy/123?ref=7' && norm[4] === '' && norm[5] === 'https://jobs.example.ac.uk/vacancy/123', '1. a link is tidied: LinkedIn and Indeed to the job\'s own page, tracking left out, https added', norm);
  const ats = await p.evaluate(() => { const a = IngCareer.jl.ats, api = IngCareer.jl.api; return [api(a('https://job-boards.greenhouse.io/exampleco/jobs/4012345')), api(a('https://boards.greenhouse.io/embed/job_app?for=exampleco&token=4012345')), api(a('https://jobs.lever.co/exampleai/5ac21346-8e0c-4494-8e7a-3eb92ff77902/apply')), api(a('https://jobs.eu.lever.co/exampleai/5ac21346-8e0c-4494-8e7a-3eb92ff77902')), a('https://example.com/jobs/1')]; });
  ok(ats[0] === 'https://boards-api.greenhouse.io/v1/boards/exampleco/jobs/4012345' && ats[1] === ats[0] && ats[2] === 'https://api.lever.co/v0/postings/exampleai/5ac21346-8e0c-4494-8e7a-3eb92ff77902' && ats[3] === 'https://api.eu.lever.co/v0/postings/exampleai/5ac21346-8e0c-4494-8e7a-3eb92ff77902' && ats[4] === null,
    '1. Greenhouse and Lever boards are read through their public APIs, at the addresses their documentation gives', ats);
  const wl = await p.evaluate(() => { const w = IngCareer.jl.wall; return [w(999, '', true, 'linkedin.com'), w(403, '', true, 'indeed.com'), w(404, '', true, 'x.org'), w(200, 'Please enable JavaScript to view this page.', false, 'x.org'), w(200, 'A long posting text. '.repeat(40), false, 'x.org')]; });
  ok(JSON.stringify(wl) === JSON.stringify(['signin', 'refused', 'gone', 'script', '']), '1. a sign-in, a refusal, a page gone and a page built by scripts are told apart', wl);

  // 2. a page with schema.org's JobPosting: pasted, fetched, and read at once
  sent = [];
  await pasteLink('#page-career .c-quick input[type=url]', 'https://jobs.example.ac.uk/vacancy/learning-technologist-123?utm_source=x');
  let o = await waitRead(/Learning Technologist/);
  ok(o && o.title === 'Learning Technologist' && o.titleSet && o.org === 'University of Example' && o.due === '2026-11-30' && /30 November 2026/.test(o.closes) && o.url === 'https://jobs.example.ac.uk/vacancy/learning-technologist-123' && /schema|search engines/.test(o.how || ''),
    '2. pasted, its link is fetched: the title, who offers it and the closing date come from the page\'s own data', o && { title: o.title, org: o.org, due: o.due, closes: o.closes, url: o.url, how: o.how });
  let pt = o ? await postText(o.id) : '';
  ok(/^Learning Technologist\nUniversity of Example\nLocation: Oxford, United Kingdom\nHours: Full time\nSalary: GBP 38,000 to 45,000 a year\nPosted: 1 November 2026\nClosing date: 30 November 2026\nLink: https:\/\/jobs\.example\.ac\.uk/.test(pt)
    && /\n- Design online courses with academic colleagues\n- Run usability tests with students\n/.test(pt) && /every background/.test(pt) && !/Short teaser|Cookies|Sign in/.test(pt),
    '2. the posting is kept in plain text with its shape: its facts first, its lists as lists; the page\'s menus are left out', pt.slice(0, 420));
  const req = sent.find((x) => /reading an opportunity against my profile/.test(String(x.system || '')));
  ok(!!req && /Learning Technologist/.test(JSON.stringify(req.messages)) && /Designed twelve online courses/.test(JSON.stringify(req.messages)), '2. the reading against her profile started by itself, with the posting and her profile', !!req);
  ok(o && o.read && o.step === 'fit', '2. the reading is shown: How you fit', o && o.step);
  // 3. the reading vetted: evidence looked for in her profile; what to lead with, only from her profile
  const cr = (o && o.read && o.read.crit) || [];
  ok(cr[0] && cr[0].st === 'met' && cr[0].vet === 'found' && cr[1] && cr[1].st === 'partly' && cr[1].vet === 'missing' && cr[1].was === 'met' && cr[2] && cr[2].vet === 'found',
    '3. evidence found in her profile stands; evidence not in it falls from shown to partly shown, and says so', cr.map((c) => ({ st: c.st, vet: c.vet, was: c.was })));
  ok(o.read.lead.length === 1 && o.read.lead[0].title === 'Learning Designer, The Open Example University' && o.read.leadOff === 1, '3. what to lead with names only entries of her profile; an entry not in it is left out', o.read.lead);
  t = await text();
  ok(/What to lead with/.test(t) && /Not found in your profile: counted as partly shown until you check it/.test(t) && /In your profile/.test(t), '3. the page shows what to lead with, and what the check found for each piece of evidence', (t.match(/What to lead with[\s\S]{0,140}/) || [''])[0]);
  await p.screenshot({ path: OUT + '/reading.png' }).catch(() => {});

  // 4. Greenhouse: its public Job Board API, its entity-encoded content made plain text
  await p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.ui.open = null; s.ui.show = 'list'; saveState(); IngCareer.render(); });
  await p.waitForTimeout(300);
  await pasteLink('#page-career .c-quick input[type=url]', 'https://job-boards.greenhouse.io/exampleco/jobs/4012345');
  o = await waitRead(/Learning Experience Designer/);
  pt = o ? await postText(o.id) : '';
  ok(o && o.org === 'Example Learning' && o.due === '2026-12-01' && /Greenhouse/.test(o.how) && hits.some((u) => /boards-api\.greenhouse\.io\/v1\/boards\/exampleco\/jobs\/4012345/.test(u)) && /\n- Experience designing online courses for adults\n/.test(pt) && !/&lt;|<p>/.test(pt),
    '4. a Greenhouse board is read through its API: who offers it, its deadline, and its text without HTML', o && { org: o.org, due: o.due, how: o.how, text: pt.slice(0, 200) });
  // 5. Lever: its public Postings API, its lists kept
  await p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.ui.open = null; s.ui.show = 'list'; saveState(); IngCareer.render(); });
  await p.waitForTimeout(300);
  await pasteLink('#page-career .c-quick input[type=url]', 'https://jobs.lever.co/exampleai/5ac21346-8e0c-4494-8e7a-3eb92ff77902');
  o = await waitRead(/Research Technologist/);
  pt = o ? await postText(o.id) : '';
  ok(o && /Lever/.test(o.how) && /Location: London/.test(pt) && /Workplace: Hybrid/.test(pt) && /Hours: Full-time/.test(pt) && /What you will need\n- Python for working with texts\n- Experience with archives/.test(pt) && /two days in the London office/.test(pt),
    '5. a Lever board is read through its API: where, how many hours, its lists and its further text', pt.slice(0, 360));
  // 6. a page with no structured data: its readable text, lists kept, menus left out
  await p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.ui.open = null; s.ui.show = 'list'; saveState(); IngCareer.render(); });
  await p.waitForTimeout(300);
  await pasteLink('#page-career .c-quick input[type=url]', 'https://careers.example.org/jobs/77');
  o = await waitRead(/https:\/\/careers\.example\.org\/jobs\/77/);
  pt = o ? await postText(o.id) : '';
  ok(o && /page's text/.test(o.how) && /\n- Experience with TEI encoding of historical texts\n/.test(pt) && !/Menu|© Example/.test(pt) && o.due === '2026-12-15',
    '6. a page without structured data gives its readable text, its lists as lists, and its closing date is found', o && { how: o.how, due: o.due, text: pt.slice(0, 240) });

  // 7. what cannot be fetched is said plainly, with the paste box ready
  await p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.ui.open = null; s.ui.show = 'list'; saveState(); IngCareer.render(); });
  await p.waitForTimeout(300);
  const nBefore = (await S()).opps.length;
  await pasteLink('#page-career .c-quick input[type=url]', 'https://www.linkedin.com/jobs/collections/recommended/?currentJobId=3999999999');
  await p.waitForTimeout(1200); t = await text();
  const foc = await p.evaluate(() => document.activeElement && document.activeElement.id);
  ok(/LinkedIn shows this posting only to people who are signed in/.test(t) && /Look for it elsewhere/.test(t) && foc === 'csPaste' && (await S()).opps.length === nBefore,
    '7. LinkedIn behind its sign-in: said plainly, nothing kept, the paste box ready, and a way to look for it elsewhere', { msg: (t.match(/LinkedIn shows[^\n]*/) || [''])[0].slice(0, 120), focus: foc });
  await p.fill('#csLink', 'https://jobs.example.ac.uk/vacancy/gone'); await p.press('#csLink', 'Enter'); await p.waitForTimeout(1000); t = await text();
  ok(/says the page does not exist \(it answered 404\)/.test(t), '7. a page gone: it says the posting may have closed', (t.match(/[^\n]*does not exist[^\n]*/) || [''])[0]);
  await p.fill('#csLink', 'https://apply.example.com/j/ABC'); await p.press('#csLink', 'Enter'); await p.waitForTimeout(1000); t = await text();
  ok(/builds its pages with scripts|Too little of the posting came back/.test(t), '7. a page built only by its scripts: it says so, and to paste the text', (t.match(/[^\n]*(scripts|Too little)[^\n]*/) || [''])[0]);
  // 8. the same link again opens what is there; nothing is doubled
  const n8 = (await S()).opps.length;
  await p.fill('#csLink', 'https://jobs.example.ac.uk/vacancy/learning-technologist-123'); await p.press('#csLink', 'Enter'); await p.waitForTimeout(700);
  ok((await S()).opps.length === n8 && /It is in your applications already: Learning Technologist/.test(await toasts()), '8. a link already brought opens that application; nothing is doubled');
  // 9. paste remains: its text kept and read at once; a link pasted into the text box is fetched as a link
  await p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.ui.open = 'new'; s.ui.show = 'work'; saveState(); IngCareer.render(); });
  await p.waitForTimeout(300);
  await p.fill('#csPaste', 'Archive Assistant\nThe Example Museum\nClosing date: 9 January 2027\n\nThe museum seeks an archive assistant to catalogue letters and photographs.\n- Experience cataloguing archives\n- Care with detail\nApply with a CV and a letter.');
  await p.evaluate(() => { const k = [...document.querySelectorAll('#page-career button')].find((x) => x.textContent.trim() === 'Keep and read it'); k.click(); });
  let o9 = null;
  for (let i = 0; i < 80; i++) { o9 = await p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0], x = s.opps.find((q) => q.from === 'pasted'); return x ? { title: x.title, due: x.due, read: !!x.read } : null; }); if (o9 && o9.read) break; await p.waitForTimeout(250); }
  ok(o9 && o9.read && o9.due === '2027-01-09', '9. pasted text is kept and read at once, as a link is', o9);

  // 10. LinkedIn's own copy of her data: the jobs she saved wait, one at a time; brought in, each is fetched and read
  const imp = await p.evaluate(async () => {
    const saved = 'Saved Date,Job Url,Job Title,Company Name\n"10/28/26, 9:12 AM",https://www.linkedin.com/jobs/view/3999999999/,Learning Designer,Example Co\n"10/30/26, 4:40 PM",https://www.linkedin.com/jobs/view/3888888888/,Research Technologist,Example AI\n';
    const applied = 'Application Date,Contact Email,Contact Phone Number,Company Name,Job Title,Job Url,Resume Name,Question And Answers\n"10/12/26, 1:00 PM",,,Example Museum,Archive Assistant,https://www.linkedin.com/jobs/view/3777777777/,cv.pdf,\n';
    const positions = 'Company Name,Title,Description,Location,Started On,Finished On\nThe Open Example University,Learning Designer,Designed online courses.,Oxford,Jan 2022,\n';
    await IngCareer.importLinkedIn([new File([saved], 'Saved Jobs.csv', { type: 'text/csv' }), new File([applied], 'Job Applications.csv', { type: 'text/csv' }), new File([positions], 'Positions.csv', { type: 'text/csv' })]);
    return IngCareer.saved().map((x) => ({ title: x.title, org: x.org, kind: x.kind, st: x.st, url: x.url })); });
  ok(imp.length === 3 && imp.filter((x) => x.st === 'wait').length === 3 && imp.some((x) => x.kind === 'applied' && x.title === 'Archive Assistant') && /2 saved jobs and 1 application sent through LinkedIn read: 3 new, waiting in Applications under Saved on LinkedIn\./.test(await toasts()),
    '10. her LinkedIn data: 2 saved jobs and 1 application come in, waiting, and the toast says where', imp);
  await p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.ui.room = 'apps'; s.ui.open = null; s.ui.show = 'list'; saveState(); IngCareer.render(); });
  await p.waitForTimeout(400); t = await text();
  ok(/Saved on LinkedIn\s*3 waiting · one at a time/.test(t), '10. Applications shows them: Saved on LinkedIn, 3 waiting, one at a time', (t.match(/Saved on LinkedIn[^\n]*\n?[^\n]*/) || [''])[0]);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#page-career .c-svk')][0]; k.click(); }); await p.waitForTimeout(400);
  const cards = await p.evaluate(() => [...document.querySelectorAll('#page-career .c-svcard b')].map((x) => x.textContent));
  ok(cards.length === 1, '10. one at a time: one saved job is shown, with the rest waiting', cards);
  // brought in: LinkedIn wants a sign-in, so it is looked for on the employer's own site, and that one is fetched and read
  await p.evaluate(() => { window.webSearch = function (q, n) { window.__q = q; return Promise.resolve([{ title: 'Learning Designer - Example Co', url: 'https://job-boards.greenhouse.io/exampleco/jobs/4099999', snippet: 'Join Example Co' }, { title: 'Learning Designer on LinkedIn', url: 'https://www.linkedin.com/jobs/view/3999999999/', snippet: '' }]); }; });
  const first = cards[0];
  await p.evaluate(() => { const k = [...document.querySelectorAll('#page-career .c-svcard button')].find((x) => x.textContent.trim() === 'Bring it in and read it'); k.click(); }); await p.waitForTimeout(1200);
  t = await text();
  const q0 = await p.evaluate(() => { const i = [...document.querySelectorAll('#page-career .c-alert input')][0]; return i ? i.value : null; });
  ok(/signed in/.test(t) && q0 && q0.indexOf(first) === 0, '10. LinkedIn asks for a sign-in: said so, with the post\'s title and company ready to look for elsewhere', { q: q0, first });
  await p.evaluate(() => { const k = [...document.querySelectorAll('#page-career .c-alert button')].find((x) => x.textContent.trim() === 'Look for it elsewhere'); k.click(); }); await p.waitForTimeout(600);
  t = await text();
  ok(/Found for “/.test(t) && /job-boards\.greenhouse\.io/.test(t) && !/linkedin\.com\/jobs\/view/.test((t.match(/Found for[\s\S]*?Open one to be sure/) || [''])[0]), '10. found elsewhere: the employer\'s own board, LinkedIn itself left out', (t.match(/Found for[^\n]*/) || [''])[0]);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#page-career .c-found button')][0]; k.click(); });
  o = await waitRead(/^Learning Designer$/);
  const sv = await p.evaluate(() => IngCareer.saved().map((x) => ({ title: x.title, st: x.st, opp: !!x.opp })));
  ok(o && o.read && sv.filter((x) => x.st === 'in').length === 1 && sv.find((x) => x.st === 'in').title === first, '10. chosen, it is fetched, read against her profile, and the saved job is marked as brought in', sv);
  // set aside, and imported again: nothing doubled, nothing that was set aside comes back
  await p.evaluate(() => { const L = IngCareer.saved(); L.find((x) => x.st === 'wait').st = 'drop'; saveState(); });
  const again = await p.evaluate(async () => { const saved = 'Saved Date,Job Url,Job Title,Company Name\n"10/28/26, 9:12 AM",https://www.linkedin.com/jobs/view/3999999999/,Learning Designer,Example Co\n"11/02/26, 8:00 AM",https://www.linkedin.com/jobs/view/3666666666/,Digital Archivist,Example Library\n';
    await IngCareer.importLinkedIn([new File([saved], 'Saved Jobs.csv', { type: 'text/csv' })]); return IngCareer.saved().map((x) => ({ title: x.title, st: x.st })); });
  ok(again.length === 4 && again.filter((x) => x.title === 'Learning Designer').length === 1 && again.find((x) => x.title === 'Digital Archivist').st === 'wait' && again.filter((x) => x.st === 'drop').length === 1,
    '10. brought in again later, only the new saved job is added; one set aside stays aside', again);
  // 11. no model ready: fetched and kept, and it says what is needed
  await p.evaluate(() => { lxSetCloud(false); const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.ui.open = null; s.ui.show = 'list'; saveState(); IngCareer.render(); });
  await p.waitForTimeout(300);
  const ready = await p.evaluate(() => { try { return !!IngLector.plan && !!(IngLector.plan() || {}).chosen; } catch (e) { return null; } });
  if (!ready) {
    await p.evaluate(() => { window.__toasts = []; });
    await p.evaluate(() => IngCareer.fetchPosting('https://careers.example.org/jobs/77', 'job', { again: true }));
    await p.waitForTimeout(800);
    ok(/A model is needed to read it against your profile/.test(await toasts()), '11. with no model ready, the posting is kept and it says a model is needed', await toasts());
  }
  await p.screenshot({ path: OUT + '/saved.png' }).catch(() => {});
  ok(errs.length === 0, 'no script errors on the page', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
