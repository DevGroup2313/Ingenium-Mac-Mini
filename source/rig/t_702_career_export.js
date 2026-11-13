// node rig/t_702_career_export.js <Ingenium page url> <out dir>
// 6.9.2: an application exported as a folder of files (modules/r188.js), in Chromium, the zip read back in Node. Her words
// (31 October 2026): "I want to be able to use it for PhD applications and for job applications." So one application (or all)
// goes out as one zip through makeZip and saveFileNative: the posting, the reading, the checklist, each document as the Word
// file Save as Word gives and as Markdown, the emails, the practise, the notes and a README; and Settings' Export your data
// has the studio's own line, with every text it keeps.
//   - Export this application: the zip holds the expected names; posting.txt is the posting; the .docx begins PK;
//   - Export all: one folder per application and a README at the top;
//   - Export your data lists "The Career Studio" and its files go into that zip too, with career/career.json carrying the texts;
//   - every part ran; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
// the zip as makeZip writes it: every file stored, read off the local headers
function unzip(buf) { const out = {}; let p = 0; while (p + 30 <= buf.length && buf.readUInt32LE(p) === 0x04034b50) { const csz = buf.readUInt32LE(p + 18), nl = buf.readUInt16LE(p + 26), xl = buf.readUInt16LE(p + 28); const name = buf.slice(p + 30, p + 30 + nl).toString('utf8'); out[name] = buf.slice(p + 30 + nl + xl, p + 30 + nl + xl + csz); p += 30 + nl + xl + csz; } return out; }
const POST = 'DPhil in History of Science\nUniversity of Exampleton\nApplicants must submit a CV and a personal statement of no more than 1,000 words.\nTwo academic references are required.\nThe closing date is 30 November 2026.\n' + 'x'.repeat(40);
const CV = '## Education\n**MSt in History, Oxford**, 2020 to 2021\n- Dissertation on the archives of the Museum.\n\n## Skills\n- Archival research: catalogued 312 letters.';
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  // what is saved is caught, as base64
  await p.evaluate(() => { window.__saved = []; window.saveFileNative = function (name, mime, bytes) { let s = ''; const u = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes); for (let i = 0; i < u.length; i += 8192) s += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); window.__saved.push({ name, mime, b64: btoa(s) }); return Promise.resolve(null); }; });
  const id = await p.evaluate(async ([post, cv]) => { const P = IngCareer.state().profile; P.name = 'Ada Lovelace'; P.contact = 'ada@example.org · Oxford';
    const o = await IngCareer.newOpp('phd', post, 'pasted'); o.read = { r: { crit: [{ text: 'A first degree in history', ess: true, st: 'met', ev: 'MSt in History' }, { text: 'Palaeography', ess: false, st: 'none', ev: '' }], strengths: ['The archive work is shown plainly.'], concerns: ['No palaeography.'], next: ['Write to a supervisor.'], asks: ['Who would supervise?'], wants: [{ text: 'An academic post', st: 'met', offer: 'A DPhil place' }] }, at: Date.now(), model: 'Test model' };
    o.check = { items: [{ id: 'c1', text: 'Your CV', doc: 'cv', done: true, quote: 'Applicants must submit a CV', src: 'posting' }, { id: 'c2', text: 'A personal statement (no more than 1,000 words)', doc: 'statement', done: false, quote: 'a personal statement of no more than 1,000 words', src: 'posting' }], pending: [], at: Date.now(), way: 'auto' };
    const ref = IngBig.newId(); await IngBig.put(ref, cv); o.docs.cv = { ref, made: Date.now(), model: 'Test model', chk: { figures: [], fills: 0, style: '' } };
    const er = IngBig.newId(); await IngBig.put(er, 'Subject: A doctoral project\n\nDear Professor,\n\nI write to ask whether you would consider supervising my project.\n\nYours sincerely,\nAda'); o.emails.push({ id: 'em1', role: 'supervisor', purpose: 'introduce', ref: er, made: Date.now(), model: 'Test model', chk: {} });
    o.practice.crit.c0 = { answer: 'In 2020 I catalogued 312 letters.', fb: { MEETS: 'PARTLY', WORKS: 'A figure.', MISSING: 'The result.', 'ASK YOURSELF': 'What changed?' } }; o.practice.qs = [{ id: 'q1', q: 'Why this programme?', answer: 'Because of its archive.', fb: null }];
    const cvr = IngBig.newId(); await IngBig.put(cvr, 'Ada Lovelace. MSt in History, Oxford, 2020 to 2021.'); IngLector.state().me.cv = { ref: cvr, name: 'cv.txt', chars: 50, at: Date.now() };
    o.notes = 'Ask Dr Somerville first.'; o.refs = [{ id: 'r1', name: 'Dr Mary Somerville', role: 'Royal Society', status: 'asked', asked: Date.now(), due: '2026-11-27', notes: '', sent: [] }]; o.dates = [{ id: 'd1', kind: 'funding', at: '2026-12-10', label: 'Funding form' }]; o.due = '2026-11-30'; saveState(); return o.id; }, [POST, CV]);
  // one application
  const n1 = await p.evaluate(id => IngCareer.exportOpp(IngCareer.state().opps.find(x => x.id === id)).then(fs => fs && fs.length), id);
  const s1 = await p.evaluate(() => window.__saved[0]); const z1 = unzip(Buffer.from(s1.b64, 'base64')); const names = Object.keys(z1);
  ok(s1.name === 'DPhil in History of Science.zip' && s1.mime === 'application/zip' && n1 === names.length, 'Export this application saves one zip named for the application (' + names.length + ' files)', s1.name);
  const want = ['posting.txt', 'reading.md', 'checklist.md', 'Tailored CV.md', 'Tailored CV.docx', 'emails/A prospective supervisor - introduce myself and my research.txt', 'practise.md', 'notes.md', 'README.txt'].map(x => 'DPhil in History of Science/' + x);
  ok(want.every(w => names.includes(w)), 'the folder holds the posting, the reading, the checklist, the CV as Word and as text, the email, the practise, the notes and a README', names);
  ok(z1[want[0]].toString('utf8') === POST && z1[want[4]].slice(0, 2).toString() === 'PK' && z1[want[4]].length > 2000, 'posting.txt is the posting as kept; the .docx is a Word file');
  const rd = z1[want[1]].toString('utf8'), ck = z1[want[2]].toString('utf8'), nt = z1[want[7]].toString('utf8'), pr = z1[want[6]].toString('utf8');
  ok(/^# How you fit: DPhil in History of Science, University of Exampleton/.test(rd) && /\*\*Possible fit\*\*/.test(rd) && /\| A first degree in history \| Essential \| Shown \| MSt in History \|/.test(rd) && /\| An academic post \| Matches \| A DPhil place \|/.test(rd) && /Ask the contact: Who would supervise\?/.test(rd), 'reading.md carries the band, the wants and criteria tables and the questions', rd.slice(0, 300));
  ok(/- \[x\] Your CV\s+From the posting: “Applicants must submit a CV”/.test(ck) && /- \[ \] A personal statement \(no more than 1,000 words\)/.test(ck), 'checklist.md keeps each item ticked or not, with its sentence', ck);
  ok(/Where it stands: Preparing|Where it stands: Considering/.test(nt) && /## Dates/.test(nt) && /27 November 2026: Reference from Dr Mary Somerville due/.test(nt) && /10 December 2026: Funding form/.test(nt) && /## Referees\n\n- Dr Mary Somerville, Royal Society: asked/.test(nt) && /## Notes\n\nAsk Dr Somerville first\./.test(nt), 'notes.md carries the dates, the referees and her notes', nt.slice(0, 400));
  ok(/# Your evidence\n\n## A first degree in history\n\nIn 2020 I catalogued 312 letters\./.test(pr) && /# Interview questions\n\n1\. Why this programme\?\n\n   Because of its archive\./.test(pr), 'practise.md carries her evidence and her answers', pr.slice(0, 300));
  ok(/Nothing here was sent anywhere/.test(z1[want[8]].toString('utf8')), 'the README says nothing left the device');
  // all of them
  await p.evaluate(post => IngCareer.newOpp('job', 'Archivist\nThe County Record Office\nApply with a CV.\nThe closing date is 5 December 2026.\n' + 'y'.repeat(60), 'pasted'), POST);
  const n2 = await p.evaluate(() => IngCareer.exportAll().then(fs => fs && fs.length));
  const s2 = await p.evaluate(() => window.__saved[1]); const z2 = unzip(Buffer.from(s2.b64, 'base64')); const names2 = Object.keys(z2);
  ok(/^Vocatio - .*\.zip$/.test(s2.name) && n2 === names2.length && names2.includes('README.txt') && names2.includes('Archivist/posting.txt') && names2.includes('Archivist/notes.md') && names2.includes('DPhil in History of Science/Tailored CV.docx'), 'Export all: one folder for each application, a README at the top', { name: s2.name, n: names2.length });
  // Settings' Export your data carries the studio
  ok(await p.evaluate(() => (window.__ingExportProviders || []).some(x => x.id === 'exCareer')), 'the studio registers its line for Export your data');
  await p.evaluate(() => openExport()); await p.waitForTimeout(400);
  const modal = await p.evaluate(() => ({ has: !!document.getElementById('exCareer'), checked: document.getElementById('exCareer') && document.getElementById('exCareer').checked, label: (document.getElementById('exCareer') && document.getElementById('exCareer').parentNode.textContent.trim()) || '' }));
  ok(modal.has && modal.checked && /^Vocatio: each profile's applications as readable files/.test(modal.label), 'Export your data lists "The Career Studio", ticked', modal);
  await p.evaluate(() => { ['exChats', 'exChatsJson', 'exNotes', 'exDocs', 'exSources', 'exSettings'].forEach(k => { const c = document.getElementById(k); if (c) c.checked = false; }); document.getElementById('exGo').click(); });
  await p.waitForFunction(() => window.__saved.length >= 3, null, { timeout: 30000 }); await p.waitForTimeout(200);
  const s3 = await p.evaluate(() => window.__saved[2]); const z3 = unzip(Buffer.from(s3.b64, 'base64')); const names3 = Object.keys(z3);
  const cj = names3.includes('career/career.json') ? JSON.parse(z3['career/career.json'].toString('utf8')) : null;
  ok(/^Ingenium-export-\d{4}-\d{2}-\d{2}\.zip$/.test(s3.name) && names3.includes('README.txt') && names3.some(n => /^career\/.+\/DPhil in History of Science\/posting\.txt$/.test(n)) && !names3.some(n => /\.docx$/.test(n)), "the export's zip holds each application as readable files under career/ (no Word files there: they are made on press)", names3.slice(0, 12));
  ok(cj && cj.career && cj.career.people && cj.career.people[0].opps.length === 2 && Object.values(cj.texts).includes(CV) && Object.values(cj.texts).includes(POST) && Object.values(cj.texts).includes('Ada Lovelace. MSt in History, Oxford, 2020 to 2021.'), 'career/career.json carries the studio\'s records with every text it keeps, whole, and the CV it shares with the reading page', cj && Object.keys(cj.texts).length);
  ok(await p.evaluate(() => Object.keys(window.__ingParts).every(k => window.__ingParts[k] === 'running')), 'every part of the page ran to its end');
  ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
