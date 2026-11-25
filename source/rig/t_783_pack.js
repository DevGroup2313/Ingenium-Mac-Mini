// Ingenium 7.83: Vocatio's submission pack and its dates in Vesta (modules/r382.js; hooks in r188.js and r121.js). Her approval of the
// preview (25 November 2026): "I approve of the previews but I want the "Your submission pack" cards to also have the animated effect and
// lift of hover and I want the same effect for the "Against the posting's criteria" section as well".
//   node rig/t_783_pack.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2), URL_ = args.find(a => /^https?:\/\//.test(a)), OUT = args.find(a => !/^https?:\/\//.test(a)) || '/tmp';
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const words = n => Array.from({ length: n }, (_, i) => ['the', 'study', 'of', 'learning', 'tools'][i % 5]).join(' ');
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage(); p.setDefaultTimeout(90000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer && window.IngPack, null, { timeout: 600000 }); await sleep(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(800);
  const close = new Date(Date.now() + 2 * 864e5).toISOString().slice(0, 10);
  const POST = 'PhD in Education\nUniversity of Exampleton, Faculty of Education\nApplicants must submit a CV, a research proposal of no more than 2,500 words, a personal statement of no more than 1,000 words, two references and transcripts.\nThe closing date is ' + close + '.\n' + 'x'.repeat(40);
  const id = await p.evaluate(async ([post, close, w1, w2]) => {
    const o = await IngCareer.newOpp('phd', post, 'pasted'); o.due = close; o.closes = 'The closing date is ' + close; o.title = 'PhD in Education'; o.org = 'University of Exampleton';
    IngCareer.state().profile.name = 'Ada B. Lovelace';
    const it = (text, quote, doc) => ({ id: 'ck' + Math.random().toString(36).slice(2, 8), text, quote, doc, done: false, src: 'posting' });
    o.check = { items: [it('Your CV', 'Applicants must submit a CV', 'cv'), it('A research proposal', 'a research proposal of no more than 2,500 words', 'proposal'), it('A personal statement', 'a personal statement of no more than 1,000 words', 'statement'), it('References', 'two references', 'ref'), it('Transcripts of your degrees', 'and transcripts', '')], pending: [], hidden: [], at: Date.now(), way: 'auto' };
    await IngBig.put('t784-prop', w1); await IngBig.put('t784-stat', w2);
    o.docs.proposal = { ref: 't784-prop', made: Date.now(), chk: { exam: 0.1 } }; o.docs.statement = { ref: 't784-stat', made: Date.now() };
    const o2 = await IngCareer.newOpp('job', 'Archivist\nThe County Record Office\n' + 'x'.repeat(60), 'pasted'); o2.title = 'Archivist'; o2.due = close; o2.stage = 'applied';
    o.refs = [{ id: 'rf1', name: 'Dr Example', status: 'asked', asked: Date.now() - 11 * 864e5 }];
    saveState(); const S = IngCareer.state(); S.ui.room = 'apps'; S.ui.open = o.id; S.ui.show = 'work'; o.step = 'send'; go('career'); IngCareer.render(); return o.id;
  }, [POST, close, words(2310), words(1046) + ' I would work with [your supervisor] on this.']);
  await sleep(1500);
  // the pack, first in What you send, folded under its bar
  const b0 = await p.evaluate(() => { const v = document.querySelector('#cs .vp'); if (!v) return null; return { open: v.classList.contains('open'), bar: v.querySelector('.vp-bar').textContent, before: !!(v.nextElementSibling && v.nextElementSibling.classList.contains('c-split')) }; });
  ok(b0 && !b0.open && /Your submission pack/.test(b0.bar) && b0.before, 'What you send opens with the submission pack, folded under its bar', b0);
  await p.evaluate(() => document.querySelector('#cs .vp-bar').click()); await sleep(1200);
  const cards = await p.evaluate(() => [...document.querySelectorAll('#cs .vp-item')].map(c => ({ h: c.querySelector('h4').textContent, q: (c.querySelector('.vp-q') || {}).textContent || '', fn: (c.querySelector('.vp-fn') || {}).value || '', w: c.querySelector('.vp-w').textContent, st: (c.querySelector('.vp-lv [aria-checked="true"]') || {}).textContent })));
  ok(cards.length === 5, 'unfolded, one card for each thing the posting asks to send', cards.map(c => c.h));
  const prop = cards.find(c => /proposal/i.test(c.h)), stat = cards.find(c => /statement/i.test(c.h)), cv = cards.find(c => /CV/.test(c.h));
  ok(cards.map(c => c.h).join('|') === 'Your CV|Research proposal|Personal statement|References|Transcripts of your degrees', "each card is named in the posting's words", cards.map(c => c.h));
  ok(prop && /2,310 of 2,500 words/.test(prop.w) && prop.st === 'Checked' && /no more than 2,500 words/.test(prop.q), "each with the posting's words, its limit and the words written; an examined document stands at Checked", prop);
  ok(stat && /1,054 of 1,000 words/.test(stat.w) && /54 over/.test(stat.w) && stat.st === 'Drafted', 'a document over its limit says by how much', stat);
  ok(cv && cv.fn === 'Lovelace_Ada_CV.pdf' && cv.st === 'To write', 'the file name the portal expects, from her profile\'s name (her initial left out)', cv);
  // her change: the cards lift under the pointer
  const lift = await p.evaluate(() => { const c = document.querySelectorAll('#cs .vp-item')[1]; return getComputedStyle(c).transitionProperty + ' | ' + getComputedStyle(c).transform; });
  const box = await p.evaluate(() => { const c = document.querySelectorAll('#cs .vp-item')[1]; c.scrollIntoView({ block: 'center' }); const r = c.getBoundingClientRect(); return { x: r.left + 20, y: r.top + 20 }; });
  await p.mouse.move(box.x, box.y); await sleep(450);
  const lifted = await p.evaluate(() => getComputedStyle(document.querySelectorAll('#cs .vp-item')[1]).transform);
  ok(/transform/.test(lift) && /matrix\(1, 0, 0, 1, 0, -3\)/.test(lifted), 'each card lifts under the pointer, animated (her change)', { lift, lifted });
  await p.screenshot({ path: OUT + '/pack.png' });
  // the lever: Final ticks the checklist; the chip counts
  await p.evaluate(() => { const c = [...document.querySelectorAll('#cs .vp-item')].find(x => /CV/.test(x.querySelector('h4').textContent)); c.querySelector('.vp-lv [data-v="3"]').click(); }); await sleep(300);
  const lv = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id), it = o.check.items.find(x => x.doc === 'cv'); return { done: it.done, chip: document.querySelector('#cs .vp-bar .vp-sum').textContent }; }, id);
  ok(lv.done === true && /1 of 5 final/.test(lv.chip) && /1 over its limit/.test(lv.chip), 'set to Final, the checklist item is ticked, and the bar counts it', lv);
  // the final check and the export
  const fc = await p.evaluate(() => ({ ticks: [...document.querySelectorAll('#cs .vp-tick')].map(t => [t.textContent.slice(0, 40), t.getAttribute('aria-checked')]), ex: [...document.querySelectorAll('#cs .vp-col .c-btn')].find(x => /Export the pack/.test(x.textContent)).disabled, note: document.querySelector('#cs .vp-col .vp-note:last-child').textContent }));
  ok(fc.ticks.length === 5 && fc.ticks[4][1] === 'false', 'the final check has its five ticks; the one on square brackets is not ticked while a document keeps one', fc.ticks);
  const ph = await p.evaluate(() => document.querySelectorAll('#cs .vp-tick')[4].textContent);
  ok(/Still to fill: .*\[your supervisor\]/.test(ph), 'Vocatio reads each document for square brackets left, and names them', ph);
  ok(fc.ex === true && /not final yet/.test(fc.note), 'Export the pack waits until every item is final and every check ticked', fc.note);
  // the folder of the pack: each document as the PDF the portal will receive, named as it expects, and its Word file
  const zip = await p.evaluate(async id => { const o = IngCareer.state().opps.find(x => x.id === id); let names = null, saved = null; const mz = window.makeZip, sf = window.saveFileNative;
    window.makeZip = f => { names = f.map(x => x.name); return mz(f); }; window.saveFileNative = (n) => { saved = n; return Promise.resolve(); };
    try { await IngCareer.packApi().exportPack(o, [{ kind: 'proposal', name: 'Lovelace_Ada_Research_Proposal' }], 'README'); } finally { window.makeZip = mz; window.saveFileNative = sf; }
    return { names, saved }; }, id);
  ok(zip.names && zip.names.indexOf('PhD in Education - submission pack/Lovelace_Ada_Research_Proposal.pdf') >= 0 && zip.names.indexOf('PhD in Education - submission pack/Word/Lovelace_Ada_Research_Proposal.docx') >= 0 && /submission pack\.zip$/.test(zip.saved || ''), 'Export the pack makes each document as the PDF the portal will receive, named as it expects, with its Word file beside it', zip);
  // Vesta: the closing date and the referee's follow-up in Today; the reminder rings once
  const vt = await p.evaluate(() => { const rows = window.IngSupport.todayRows().map(r => r.text); const R = (state.reminders || []).filter(r => r.from === 'vocatio').map(r => r.text); window.IngSupport.todayRows(); const R2 = (state.reminders || []).filter(r => r.from === 'vocatio').length; return { rows, R, R2 }; });
  ok(vt.rows.some(t => /PhD in Education, University of Exampleton closes in 2 days/.test(t)), "Vesta's Today lists the application's closing date", vt.rows);
  ok(vt.rows.some(t => /Follow up with Dr Example, asked 11 days ago/.test(t)), "and the referee to follow up", vt.rows);
  ok(!vt.rows.some(t => /Archivist/.test(t)), 'an application already applied for is not listed', vt.rows);
  ok(vt.R.length === 2 && /A week before/.test(vt.R.join()) && /Three days before/.test(vt.R.join()) && vt.R2 === 2, 'a week and three days before, a reminder rings once each, and not again', vt);
  await p.evaluate(() => go('focus')); await sleep(1200);
  const fx = await p.evaluate(() => { const h = document.getElementById('fxTodayHost'); return h ? h.innerText : ''; });
  ok(/closes in 2 days/.test(fx), "on Vesta's page, Today asks of you shows it", fx.slice(0, 300));
  await p.screenshot({ path: OUT + '/vesta.png' });
  // night
  await p.evaluate(() => { go('career'); IngCareer.render(); document.body.setAttribute('data-theme', 'night'); }); await sleep(900);
  await p.evaluate(() => { const v = document.querySelector('#cs .vp'); if (v && !v.classList.contains('open')) v.querySelector('.vp-bar').click(); }); await sleep(700);
  await p.screenshot({ path: OUT + '/pack_night.png' });
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
