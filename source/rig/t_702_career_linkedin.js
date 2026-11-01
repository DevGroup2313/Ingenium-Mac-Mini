// node rig/t_702_career_linkedin.js <Ingenium page url> <out dir>
// 6.9.2: a LinkedIn export imported as a difference (modules/r188.js), in Chromium. Her words (31 October 2026): "automate where
// I want and also meticulously review and do on my own at my own pace." So the first import still enters every entry at once,
// with its status shown (the files and their counts, what was skipped, the headline and summary); imported again, the export is
// read against what is there: an entry unchanged is kept, one new or changed is offered in Found in your sources, one gone from
// the export is flagged for her to keep or drop, and an entry she changed herself or dropped before is never touched.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const V1 = { 'Profile.csv': 'First Name,Last Name,Headline,Summary\n"Ada","Lovelace","Researcher in the history of computing","I write about early machines."\n',
  'Positions.csv': 'Company Name,Title,Description,Location,Started On,Finished On\n"Analytical Society","Research Assistant","Catalogued 312 letters","London","Sep 2019","Jun 2021"\n"University of London","Tutor in History","Taught 40 undergraduates","London","Oct 2022","Jun 2024"\n',
  'Education.csv': 'School Name,Start Date,End Date,Notes,Degree Name,Activities\n"University of London","2017","2019","","MA in History",""\n',
  'Connections.csv': 'First Name,Last Name\n"A","B"\n' };
const V2 = { 'Positions.csv': 'Company Name,Title,Description,Location,Started On,Finished On\n"Analytical Society","Research Assistant","Catalogued 400 letters","London","Sep 2019","Jun 2021"\n"County Record Office","Archivist","Arranged the estate papers","Oxbridge","Sep 2024",""\n',
  'Education.csv': 'School Name,Start Date,End Date,Notes,Degree Name,Activities\n"University of London","2017","2019","","MA in History",""\n' };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  const imp = files => p.evaluate(files => IngCareer.importLinkedIn(Object.keys(files).map(n => new File([files[n]], n, { type: 'text/csv' }))).then(() => { const P = IngCareer.state().profile; return { items: P.items.map(i => [i.sec, i.title, i.place, i.src, i.text, !!i.gone]), L: P.linkedin, sugg: (P.suggested || []).map(s => [s.title, s.place, s.src, s.note]), status: IngCareer.liStatus(P.linkedin) }; }), files);
  // the first import: every entry enters, and its status is shown
  const r1 = await imp(V1);
  ok(r1.items.length === 3 && r1.items.every(i => i[3] === 'linkedin') && r1.L.n === 3 && r1.L.files.map(f => f.name + ':' + f.kept).join('|') === 'Positions.csv:2|Education.csv:1' && r1.L.skipped.join() === 'Connections' && r1.sugg.length === 0, 'the first import enters every entry (3), and records each file with its count and what was skipped', r1);
  ok(/^Imported .*: 3 entries from Positions \(2\), Education \(1\) · 3 new · skipped: Connections\.$/.test(r1.status), 'its status line says so', r1.status);
  await p.evaluate(() => { const S = IngCareer.state(); S.ui.room = 'profile'; S.ui.ppart = 'sources'; S.ui.show = 'work'; go('career'); IngCareer.render(); }); await p.waitForTimeout(600);
  const src = await p.evaluate(() => ({ rows: [...document.querySelectorAll('#cs .c-src')].map(x => x.querySelector('.tx b').textContent + ' :: ' + x.querySelector('.tx small').textContent), keys: [...document.querySelectorAll('#cs .c-src .c-btn')].map(x => x.textContent) }));
  ok(src.rows.some(r => /^Your LinkedIn export :: Imported .*3 entries from Positions \(2\), Education \(1\)/.test(r)) && src.rows.some(r => /^Your headline and summary :: Headline: Researcher in the history of computing Summary: I write about early machines\./.test(r)) && src.keys.includes('Import it again') && src.keys.includes('Keep as an entry'),
    'What the studio may use shows the status, and the headline and summary it kept, with Keep as an entry', src);
  await p.screenshot({ path: OUT + '/linkedin-sources.png' });
  await p.evaluate(() => [...document.querySelectorAll('#cs .c-src .c-btn')].find(x => x.textContent === 'Keep as an entry').click()); await p.waitForTimeout(400);
  ok(await p.evaluate(() => IngCareer.state().profile.items.some(i => i.sec === 'other' && i.title === 'LinkedIn headline and summary' && /early machines/.test(i.text) && i.src === 'me')), 'Keep as an entry puts the headline and summary among her entries, under Other');
  // she changes one entry herself, and removes another by hand
  await p.evaluate(() => { const S = IngCareer.state(), P = S.profile; const ra = P.items.find(i => i.title === 'Research Assistant'); S.ui.ppart = 'entries'; S.ui.editing = ra.id; IngCareer.render(); });
  await p.fill('#csEntry textarea', 'Catalogued 312 letters, with a note on each'); await p.evaluate(() => [...document.querySelectorAll('#cs .c-work .c-pn-f .c-btn')].find(x => x.textContent === 'Keep it').click()); await p.waitForTimeout(300);
  await p.evaluate(() => { const card = [...document.querySelectorAll('#cs .c-entry')].find(c => c.querySelector('b').textContent === 'MA in History'); [...card.querySelectorAll('.c-btn')].find(x => x.textContent === 'Remove').click(); }); await p.waitForTimeout(300);
  const mid = await p.evaluate(() => { const P = IngCareer.state().profile; return { ra: P.items.filter(i => i.title === 'Research Assistant').map(i => [i.src, i.text]), ma: P.items.some(i => i.title === 'MA in History'), dropped: Object.keys(P.linkedin.dropped || {}) }; });
  ok(mid.ra.length === 1 && mid.ra[0][0] === 'me' && /with a note on each/.test(mid.ra[0][1]) && !mid.ma && mid.dropped.join() === 'ma in history|university of london', 'an entry she changes becomes her own; one she removes is remembered as dropped', mid);
  // imported again: a difference
  const r2 = await imp(V2);
  const by = t => r2.items.find(i => i[1] === t);
  ok(by('Research Assistant')[3] === 'me' && /with a note on each/.test(by('Research Assistant')[4]) && !by('Research Assistant')[5], 'imported again, the entry she changed herself is not touched (its change in the export is not even offered)', by('Research Assistant'));
  ok(by('Tutor in History') && by('Tutor in History')[5] === true && by('Tutor in History')[3] === 'linkedin', 'the entry gone from the export is flagged, not removed', by('Tutor in History'));
  ok(!by('MA in History') && r2.sugg.length === 1 && r2.sugg[0][0] === 'Archivist' && r2.sugg[0][2] === 'linkedin-new' && r2.sugg[0][3] === 'New in your export', 'the new row is offered in Found in your sources; the one she dropped before is not offered again', r2.sugg);
  ok(r2.L.added === 1 && r2.L.changed === 0 && r2.L.gone === 1 && r2.L.kept === 0 && /^Imported .*: 3 entries from Positions \(2\), Education \(1\) · 1 new · 1 gone\.$/.test(r2.status), 'the counts: 1 new, 1 gone, and the status line says so (three rows in the export)', r2.status);
  ok((await p.evaluate(() => (document.getElementById('ingToast') || {}).textContent || '')).indexOf('Read as a difference: 0 unchanged, 1 new and 0 changed') === 0, 'she is told what the difference was', await p.evaluate(() => (document.getElementById('ingToast') || {}).textContent));
  // Found: Keep enters it as a LinkedIn entry; Your entries: the gone one, kept as her own or dropped
  const found = await p.evaluate(() => { const S = IngCareer.state(); return { part: S.ui.ppart, cards: [...document.querySelectorAll('#cs .c-entry')].map(c => c.querySelector('b').textContent + ' :: ' + [...c.querySelectorAll('small')].map(s => s.textContent).join(' ')) }; });
  ok(found.part === 'found' && found.cards.length === 1 && /^Archivist :: County Record Office · Sep 2024 · New in your export$/.test(found.cards[0]), 'Found in your sources opens on the new row, marked as new in the export', found);
  await p.evaluate(() => [...document.querySelectorAll('#cs .c-entry .c-btn')].find(x => x.textContent === 'Keep').click()); await p.waitForTimeout(300);
  ok(await p.evaluate(() => { const i = IngCareer.state().profile.items.find(x => x.title === 'Archivist'); return i && i.src === 'linkedin' && !i.note && !i.was; }), 'kept, it enters her entries as a LinkedIn entry (so a later import can still compare it)');
  await p.evaluate(() => { const S = IngCareer.state(); S.ui.ppart = 'entries'; S.ui.efilter = 'all'; IngCareer.render(); }); await p.waitForTimeout(300);
  const gone = await p.evaluate(() => { const card = [...document.querySelectorAll('#cs .c-entry')].find(c => c.querySelector('b').textContent === 'Tutor in History'); return { flag: (card.querySelector('.c-ligone') || {}).textContent, keys: [...card.querySelectorAll('.c-btn')].map(x => x.textContent) }; });
  ok(/^No longer in your LinkedIn export \(.*\): keep it as your own, or drop it\.$/.test(gone.flag || '') && gone.keys.join('|') === 'Keep it|Drop it|Change|Remove', 'in Your entries the gone one is flagged, with Keep it and Drop it', gone);
  await p.screenshot({ path: OUT + '/linkedin-gone.png' });
  await p.evaluate(() => { const card = [...document.querySelectorAll('#cs .c-entry')].find(c => c.querySelector('b').textContent === 'Tutor in History'); [...card.querySelectorAll('.c-btn')].find(x => x.textContent === 'Drop it').click(); }); await p.waitForTimeout(300);
  ok(await p.evaluate(() => { const P = IngCareer.state().profile; return !P.items.some(i => i.title === 'Tutor in History') && !!P.linkedin.dropped['tutor in history|university of london']; }), 'Drop it removes it and remembers the choice');
  const r3 = await imp(V1);
  ok(!r3.sugg.some(s => s[0] === 'Tutor in History') && !r3.sugg.some(s => s[0] === 'MA in History') && r3.sugg.length === 0 && r3.L.gone === 1, 'imported a third time with the old file, neither entry she dropped comes back; the Archivist is now the one gone', r3.sugg.concat([r3.L.gone]));
  ok(await p.evaluate(() => Object.keys(window.__ingParts).every(k => window.__ingParts[k] === 'running')), 'every part of the page ran to its end');
  ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
