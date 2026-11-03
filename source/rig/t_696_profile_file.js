// A profile in one file (Ingenium 6.9.6, modules/r188.js). Her words (3 November 2026): "I don't want to have to input my information for
// my profile from scratch on my master version", and "I want that to be replicable for a second user profile and so forth".
// The people here are invented (Ada Example, Ben Second): no one's real profile is in this repository.
//   node rig/t_696_profile_file.js <Ingenium page url> <out folder> [a real profile file to bring in too, kept outside the repository]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, REAL] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d).slice(0, 600) : '')); c ? pass++ : fail++; };
const long = (s, n) => (s + ' ').repeat(Math.ceil(n / (s.length + 1))).slice(0, n);
const ada = { kind: 'ingenium-profile', v: 1, made: '3 November 2026', person: { name: 'Ada Example', contact: '', isMe: true, spelling: 'british' },
  cv: { name: 'ada_cv.docx', text: long('Ada Example, curriculum vitae. Education and experience in the history of computing.', 400) },
  items: [{ sec: 'education', title: 'MPhil in the History of Science', place: 'University of Somewhere', from: 'Oct 2020', to: 'Sep 2021', text: 'Dissertation on the analytical engine.', note: 'From her CV' },
    { sec: 'post', title: 'Archivist', place: 'The Museum, London', from: 'Jan 2022', to: 'present', text: '- Catalogued 4,000 letters.' },
    { sec: 'project', title: 'Designer and Builder', place: 'A note-taking app', from: '2025', to: 'present', text: '- Built it offline.' },
    { sec: 'language', title: 'French', text: 'native' },
    { sec: 'hobby', title: 'Bell-ringing', text: 'An unknown section, kept under Other.' }],
  files: [{ name: 'ada_dossier.docx', kind: 'dossier', text: long('A dossier about the note-taking app and its design for focus.', 900) },
    { name: 'ada_summary.docx', kind: 'summary', text: long('A summary of the project for a CV.', 300) }] };
const ben = { kind: 'ingenium-profile', v: 1, person: { name: 'Ben Second', isMe: false },
  items: [{ sec: 'education', title: 'BA in Music', place: 'A Conservatoire', text: '' }, { sec: 'skill', title: 'Piano', text: 'Grade 8' }], files: [] };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const write = (name, obj) => { const f = path.join(OUT, name); fs.writeFileSync(f, typeof obj === 'string' ? obj : JSON.stringify(obj)); return f; };
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(500);
  const pg = (re) => p.evaluate((src) => { const r = new RegExp(src); const k = [...document.querySelectorAll('#page-career button, #page-career [role=tab], #page-career [role=button]')].find((x) => x.offsetParent && r.test(x.textContent.trim())); if (k) { k.click(); return true; } return false; }, re.source);
  const text = () => p.evaluate(() => (document.getElementById('page-career') || {}).innerText || '');
  const modal = () => p.evaluate(() => { const m = document.getElementById('modalBox'); return m && m.offsetParent ? m.innerText.replace(/\s+/g, ' ') : ''; });
  const bring = async (file, keyRe) => { const [fc] = await Promise.all([p.waitForEvent('filechooser'), pg(keyRe)]); await fc.setFiles(file); await p.waitForTimeout(500); return modal(); };
  const prof = () => p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0], P = s.profile; return { people: r.people.length, name: P.name, isMe: P.isMe !== false, items: P.items.length, files: P.files.length, secs: P.items.map((x) => x.sec).join(','), cvOwn: !!(P.own && P.own.cv) }; });
  // the studio speaks in short toasts (say, ingToast): each one is kept here to be read
  await p.evaluate(() => { window.__toasts = []; const o = window.ingToast; window.ingToast = function (t) { window.__toasts.push(String(t)); return o.apply(this, arguments); }; });
  const toasts = () => p.evaluate(() => window.__toasts.join(' | '));
  await p.evaluate(() => go('career')); await p.waitForTimeout(600);
  await pg(/^Your profile$/); await p.waitForTimeout(400);
  await pg(/^Your entries/); await p.waitForTimeout(400);
  // 1. the key is where an empty profile begins
  let t = await text();
  ok(/No entries yet/.test(t) && /Bring in a profile file/.test(t), '1. an empty list of entries offers to bring in a profile file first', t.slice(0, 300));
  // 2. brought in: what the file holds is said before anything changes
  let m = await bring(write('ada.ingenium-profile.json', ada), /^Bring in a profile file$/);
  ok(/Ada Example's/.test(m) && /5 entries: 1 Education, 1 Posts and work, 1 Projects, 1 Languages, 1 Other/.test(m) && /2 documents/.test(m) && /a CV: ada_cv\.docx/.test(m) && /sends it nowhere/.test(m),
    '2. the file is read and what it holds is said first: 5 entries by section, 2 documents, a CV; it stays on this device', m);
  const before = await prof();
  ok(before.items === 0, '2. nothing changes before it is confirmed', before);
  await p.evaluate(() => document.getElementById('pkHere').click()); await p.waitForTimeout(900);
  let s1 = await prof(); t = await toasts();
  ok(s1.name === 'Ada Example' && s1.items === 5 && s1.files === 2 && /education,post,project,language,other/.test(s1.secs), '3. brought in: the name, 5 entries (an unknown section kept under Other) and 2 documents', s1);
  ok(/Brought in: 5 entries, 2 documents, your CV, which Lector now uses too\./.test(t), '3. it says in plain words what came in, and that Lector uses the CV too', t);
  await pg(/^What the studio may use/); await p.waitForTimeout(400); t = await text();
  ok(/ada_cv\.docx, kept .*Lector uses the same one\./.test(t) && /A profile file/.test(t) && /Save this profile as a file/.test(t), '4. the CV is kept for the studio and Lector alike; the sources list the profile file with both keys', (t.match(/Your CV[^\n]*\n?[^\n]*/) || [''])[0]);
  // 5. the same file again: nothing doubled
  m = await bring(write('ada.ingenium-profile.json', ada), /^Bring in a profile file$/);
  ok(/Add it to Ada Example/.test(m) && /Make it a new profile/.test(m), '5. a profile already holding things asks: add to it, or make a new profile', m.slice(-160));
  await p.evaluate(() => document.getElementById('pkHere').click()); await p.waitForTimeout(900);
  let s2 = await prof(); t = await toasts();
  ok(s2.items === 5 && s2.files === 2 && /Nothing new: everything in the file is already here\./.test(t), '5. brought in again, nothing is doubled, and it says so', s2);
  // 6. a second person, as a profile of their own
  m = await bring(write('ben.ingenium-profile.json', ben), /^Bring in a profile file$/);
  await p.evaluate(() => document.getElementById('pkNew').click()); await p.waitForTimeout(900);
  let s3 = await prof();
  ok(s3.people === 2 && s3.name === 'Ben Second' && !s3.isMe && s3.items === 2 && s3.files === 0, '6. a second person\'s file becomes a profile of their own, beside hers', s3);
  // 7. saved as a file, and brought in again elsewhere, it is the same profile
  await p.evaluate(() => { const r = state.career; r.cur = r.people[0].id; saveState(); go('career'); }); await p.waitForTimeout(600);
  await pg(/^Your profile$/); await p.waitForTimeout(300); await pg(/^What the studio may use/); await p.waitForTimeout(400);
  const [dl] = await Promise.all([p.waitForEvent('download', { timeout: 20000 }), pg(/^Save this profile as a file$/)]);
  const saved = path.join(OUT, dl.suggestedFilename()); await dl.saveAs(saved); const back = JSON.parse(fs.readFileSync(saved, 'utf8'));
  ok(/Ada Example - profile\.ingenium-profile\.json$/.test(dl.suggestedFilename()) && back.kind === 'ingenium-profile' && back.items.length === 5 && back.files.length === 2 && back.cv && back.cv.text.length > 200 && back.person.name === 'Ada Example',
    '7. saved as one file: the 5 entries, the 2 documents with their text, and the CV', { name: dl.suggestedFilename(), items: back.items.length, files: back.files.length, cv: !!back.cv });
  const p2 = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  await p2.goto(URL_); await p2.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p2.waitForTimeout(600);
  const round = await p2.evaluate(async (txt) => { const d = IngProfileFile.read(txt); const got = await IngProfileFile.apply(d); const r = state.career, P = r.people.filter((x) => x.id === r.cur)[0].profile; return { got, items: P.items.length, files: P.files.length, name: P.name }; }, fs.readFileSync(saved, 'utf8'));
  ok(round.items === 5 && round.files === 2 && round.name === 'Ada Example' && round.got.cv, '7. brought into another device\'s Ingenium, the saved file gives the same profile and CV', round);
  await p2.context().close();
  // 8. a file that is no profile is refused in plain words, and nothing changes
  await pg(/^Your entries/); await p.waitForTimeout(300);
  const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => { const k = [...document.querySelectorAll('#page-career button')].find((x) => /^Bring in a profile file$/.test(x.textContent.trim())); if (k) { k.click(); return true; } return false; }).then(async (found) => { if (!found) { await pg(/^What the studio may use/); await p.waitForTimeout(300); await pg(/^Bring in a profile file$/); } })]);
  await fc.setFiles(write('not_a_profile.json', '{"hello":"world"}')); await p.waitForTimeout(500); t = await toasts();
  ok(/not_a_profile\.json: it is not an Ingenium profile file\./.test(t) && (await prof()).items === 5, '8. a file that is no profile is refused in plain words, and nothing changes', t.slice(-200));
  // 9. (only when given) a real profile file, kept outside the repository: brought in whole
  if (REAL) {
    const p3 = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
    await p3.goto(URL_); await p3.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p3.waitForTimeout(600);
    const real = JSON.parse(fs.readFileSync(REAL, 'utf8'));
    const rr = await p3.evaluate(async (txt) => { const d = IngProfileFile.read(txt); const got = await IngProfileFile.apply(d); const r = state.career, P = r.people.filter((x) => x.id === r.cur)[0].profile; return { got, items: P.items.length, files: P.files.length, name: P.name }; }, JSON.stringify(real));
    ok(rr.items === real.items.length && rr.files === real.files.length && rr.got.cv && rr.name === real.person.name, '9. the real profile file is brought in whole: every entry, every document and the CV', { items: rr.items, files: rr.files, cv: rr.got.cv });
    await p3.context().close();
  }
  ok(errs.length === 0, 'no script errors on the page', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
