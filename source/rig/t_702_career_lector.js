// node rig/t_702_career_lector.js <Ingenium page url> <out dir>
// 6.9.2: the Career Studio and the reading page (modules/r188.js and r108.js), in Chromium, with a stand-in model. Her words
// (31 October 2026): "I want to make the Career Studio and the Lector page more capable. I want to be able to use it for PhD
// applications and for job applications."
//   (a) examiner parity: the studio's second reading of a doctoral document (a statement of purpose) is given the reading page's
//       own instructions (a claim inferred marked as inferred, one idea to a paragraph, the limit kept, a citation only where a
//       source supports it), and the document's notes say how much of it the examiner changed, as the reading page does;
//   (b) one posting, two pages: the reading page's brief offers the studio's open applications as the posting; a posting kept in
//       the brief has "Also bring it to the Career Studio", and is brought once; the brief with no apps hands cv/cover to the
//       studio without a second copy.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const POST = 'DPhil in History of Science\nUniversity of Exampleton\nApplicants must submit a CV, a cover letter and a statement of purpose of no more than 1,000 words.\nThe closing date is 30 November 2026.\n' + 'x'.repeat(40);
const DRAFT = 'My research asks how field notebooks shaped method in the 1850s. It won 9,999 awards.\n\nAt Oxford I studied the archives of the Museum, and the measures suggest that the notebooks carried the argument.\n\nThis programme offers the history of collections.';
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer && window.IngLector, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  const idle = () => p.waitForFunction(() => !IngCareer.run.busy, null, { timeout: 60000 });
  await p.evaluate(DRAFT => { window.__asks = []; IngLector.plan = () => ({ chosen: { id: 'test-model', customName: 'Test model' } });
    window.lxAsk = function (run, msgs, max, temp, onPiece) { const s = msgs[0].content, u = msgs[msgs.length - 1].content; window.__asks.push({ s, u: u.slice(0, 6000) }); let out = 'Nothing.';
      if (/examiner of a draft/.test(s)) out = (u.split('THE DRAFT:\n')[1] || '').replace(/ It won 9,999 awards\./, '');
      else if (/^Write my statement of purpose/.test(u)) out = DRAFT;
      else if (/^Write my cover letter/.test(u)) out = 'Dear [the reader\'s name],\n\nI apply for the programme. My archive work suits it.\n\nYours faithfully,\nAda Lovelace';
      else if (/^Write my CV/.test(u)) out = '## Education\n**MSt in History, Oxford**, 2020 to 2021\n- Dissertation on the archives.';
      if (onPiece) onPiece(out); return Promise.resolve(out); };
    const P = IngCareer.state().profile; P.name = 'Ada Lovelace'; P.items.push({ id: 'i1', sec: 'education', title: 'MSt in History', place: 'Oxford', from: '2020', to: '2021', text: 'Dissertation on the archives of the Museum.', src: 'me' }); saveState(); }, DRAFT);
  const id = await p.evaluate(post => IngCareer.newOpp('phd', post, 'pasted').then(o => { o.way = 'auto'; o.read = { r: { crit: [{ text: 'A first degree in history', ess: true, st: 'met', ev: 'MSt in History' }], strengths: [], concerns: [], next: [], asks: [], wants: [] }, at: Date.now(), model: 'Test model' }; saveState(); const S = IngCareer.state(); S.ui.room = 'apps'; S.ui.open = o.id; S.ui.show = 'work'; go('career'); return o.id; }), POST);
  // (a) the examiner, to the reading page's standard
  await p.evaluate(id => IngCareer.write(IngCareer.state().opps.find(x => x.id === id), 'purpose'), id); await idle(); await p.waitForTimeout(600);
  const ex = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id), a = window.__asks.find(x => /examiner of a draft/.test(x.s)); return { s: a && a.s, u: a && a.u, exam: o.docs.purpose && o.docs.purpose.chk.exam, notes: (document.querySelector('#cs .c-checks') || {}).textContent || '' }; }, id);
  ok(/as an Oxford or Cambridge doctoral examiner would be/.test(ex.s || '') && /Examine it against THE PROFILE as an Oxford or Cambridge doctoral examiner would/.test(ex.u || ''), 'the second reading of a statement of purpose is asked for as a doctoral examiner\'s', ex.s);
  ok(/4\. Mark as inferred \("on this reading", "the evidence suggests"\) every claim that is inferred rather than shown, and call nothing proven/.test(ex.u || '') && /5\. One idea to a paragraph, the topic sentence first/.test(ex.u || '') && /6\. Keep each citation in square brackets only where the source supports the sentence/.test(ex.u || '') && /7\. THE POSTING SETS A LIMIT of 1000 words/.test(ex.u || '') && /8\. British English; no contractions/.test(ex.u || ''),
    "it carries the reading page's instructions: claims inferred marked, one idea to a paragraph, citations only where supported, the posting's limit", (ex.u || '').slice(0, 900));
  ok(ex.exam > 0 && ex.exam < 0.3 && /\d+% of the words were changed in the examiner's pass, which holds every claim to your profile/.test(ex.notes), 'the share of words changed is kept and shown with the document, as the reading page shows it', { exam: ex.exam, notes: ex.notes.slice(0, 200) });
  ok(await p.evaluate(() => { const f = document.querySelector('#cs iframe.c-paper'); return f && !/9,999/.test(f.contentDocument.body.innerText); }), 'the struck claim is gone from the paper');
  await p.evaluate(id => IngCareer.write(IngCareer.state().opps.find(x => x.id === id), 'cover'), id); await idle(); await p.waitForTimeout(400);
  const cv = await p.evaluate(() => { const a = window.__asks.filter(x => /examiner of a draft/.test(x.s)).pop(); return { s: a.s, u: a.u, n: (a.u.match(/^\d\. /gm) || []).length }; });
  ok(!/doctoral examiner/.test(cv.s) && !/Mark as inferred/.test(cv.u) && cv.n === 4, 'a cover letter keeps the plainer examination of before (four rules, no doctoral instruction)', cv.n);
  await p.screenshot({ path: OUT + '/examiner.png' });
  // (b) one posting, two pages: the brief offers the studio's applications
  await p.evaluate(() => { const L = IngLector.state(); L.brief.purpose = 'programme'; L.posts.programme = null; L.posts.job = null; saveState(); go('lector'); IngLector.render(); }); await p.waitForTimeout(900);
  const sel = await p.evaluate(() => { const s = document.querySelector('#l7Bf select.l-sel'); return s ? [...s.options].map(o => o.textContent) : null; });
  ok(sel && sel[0] === 'From Vocatio…' && sel[1] === 'DPhil in History of Science · University of Exampleton', "the brief's \"What it is for\" offers the studio's open application as the programme's call", sel);
  await p.evaluate(id => { const s = document.querySelector('#l7Bf select.l-sel'); s.value = id; s.dispatchEvent(new Event('change')); }, id); await p.waitForTimeout(700);
  const post = await p.evaluate(id => { const P = IngLector.state().posts.programme; return P && { from: P.from, title: P.title, org: P.org, closes: P.closes, chars: P.chars, name: P.name, also: [...document.querySelectorAll('#l7Bf button')].some(x => x.textContent === 'Also bring it to Vocatio'), card: (document.querySelector('#l7Bf .l-card') || {}).innerText || '' }; }, id);
  ok(post && post.from === 'career:' + id && post.title === 'DPhil in History of Science' && post.org === 'University of Exampleton' && post.chars > 100 && post.name === 'From Vocatio' && !post.also, 'chosen, the studio\'s posting is the brief\'s, marked as from the studio (so no key offers to bring it back)', post);
  // the brief with no apps hands cv and cover to the studio: the same application, not a second one
  await p.evaluate(() => { const L = IngLector.state(); L.brief.apps = []; L.brief.docs = { cv: true, cover: true }; saveState(); IngLector.go(); }); await p.waitForTimeout(800); await idle(); await p.waitForTimeout(600);
  const hand = await p.evaluate(id => { const S = IngCareer.state(); return { n: S.opps.length, open: S.ui.open === id, docs: Object.keys(S.opps.find(x => x.id === id).docs).sort().join(), page: document.querySelector('section.active') && document.querySelector('section.active').id }; }, id);
  ok(hand.n === 1 && hand.open && /cover,cv,purpose/.test(hand.docs) && hand.page === 'page-career', 'the brief with no apps writes the CV and letter into the same application: no second copy', hand);
  // a posting kept in the brief, brought to the studio once
  await p.evaluate(() => { go('lector'); IngLector.keepPost('job', 'Archivist\nThe County Record Office\nEssential:\n- Archival research\n- Cataloguing\nThe closing date is 5 December 2026.\n', 'Pasted text'); const L = IngLector.state(); L.brief.purpose = 'job'; }); await p.waitForTimeout(700);
  await p.evaluate(() => IngLector.render()); await p.waitForTimeout(500);
  const also = await p.evaluate(() => [...document.querySelectorAll('#l7Bf button')].filter(x => x.textContent === 'Also bring it to Vocatio').length);
  ok(also === 1, 'a posting kept in the brief offers "Also bring it to the Career Studio"', also);
  await p.evaluate(() => [...document.querySelectorAll('#l7Bf button')].find(x => x.textContent === 'Also bring it to Vocatio').click()); await p.waitForTimeout(900);
  const brought = await p.evaluate(() => { const S = IngCareer.state(), pid = IngLector.state().posts.job.id; return { n: S.opps.filter(o => o.from === 'lector:' + pid).length, all: S.opps.length, title: (S.opps.find(o => o.from === 'lector:' + pid) || {}).title, kind: (S.opps.find(o => o.from === 'lector:' + pid) || {}).kind, page: document.querySelector('section.active').id }; });
  ok(brought.n === 1 && brought.all === 2 && brought.title === 'Archivist' && brought.kind === 'job' && brought.page === 'page-career', 'pressed, the posting is in the studio as an application, and the studio opens', brought);
  await p.evaluate(() => { go('lector'); IngLector.render(); }); await p.waitForTimeout(500);
  await p.evaluate(() => [...document.querySelectorAll('#l7Bf button')].find(x => x.textContent === 'Also bring it to Vocatio').click()); await p.waitForTimeout(700);
  ok(await p.evaluate(() => { const S = IngCareer.state(), pid = IngLector.state().posts.job.id; return S.opps.filter(o => o.from === 'lector:' + pid).length === 1 && S.opps.length === 2; }), 'pressed again, it is there once (the studio knows it by the brief\'s id)');
  ok(await p.evaluate(() => Object.keys(window.__ingParts).every(k => window.__ingParts[k] === 'running')), 'every part of the page ran to its end');
  ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
