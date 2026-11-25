// Ingenium 7.85: Vocatio reads her profile once (modules/r384.js; its hooks in r188.js). Recommendation 1 of 24 November, approved with
// the live preview (25 November 2026). A stand-in model reads each part; one fact it gives is in no part, and must be left out.
//   node rig/t_785_digest.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2), URL_ = args.find(a => /^https?:\/\//.test(a)), OUT = args.find(a => !/^https?:\/\//.test(a)) || '/tmp';
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage(); p.setDefaultTimeout(90000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer && window.IngDigest, null, { timeout: 600000 }); await sleep(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(800);
  await p.evaluate(() => {
    window.__asks = []; IngLector.plan = () => ({ chosen: { id: 'test-model', customName: 'Test model' } });
    window.lxAsk = function (run, msgs, max, temp, onPiece) { const s = msgs[0].content, u = msgs[msgs.length - 1].content; window.__asks.push({ s: s.slice(0, 300), u: u.slice(0, 6000) }); let out = 'Nothing.';
      if (/^PART \d+ OF \d+ OF MY PROFILE \(([^)]*)\)/.test(u)) { const src = /\(([^)]*)\)/.exec(u)[1];
        out = /MSt in History/.test(src) ? '- MSt in History, Oxford, 2020 to 2021\n- Dissertation on the archives of the Museum\n- Won the Nobel Prize in 2019' : /Study skills/.test(src) ? (/three years/.test(u) ? '- Taught study skills for three years' : '- Taught study skills for two years') : '- Archival research and cataloguing'; }
      else if (/^Write my cover letter/.test(u)) out = 'Dear [the reader\'s name],\n\nI apply.\n\nYours faithfully,\nAda';
      if (onPiece) onPiece(out); return Promise.resolve(out); };
    const P = IngCareer.state().profile; P.name = 'Ada Lovelace';
    P.items = [{ id: 'i1', sec: 'education', title: 'MSt in History', place: 'Oxford', from: '2020', to: '2021', text: 'Dissertation on the archives of the Museum.', src: 'me' },
      { id: 'i2', sec: 'teaching', title: 'Study skills tutor', place: 'University of Exampleton', from: '2022', to: '2024', text: 'Taught study skills for two years.', src: 'me' },
      { id: 'i3', sec: 'skill', title: 'Archival research', place: '', from: '', to: '', text: 'Archival research and cataloguing.', src: 'me' }];
    delete P.digest; saveState(); const S = IngCareer.state(); S.ui.room = 'profile'; S.ui.ppart = 'read'; go('career'); IngCareer.render(); });
  await sleep(1500);
  const d0 = await p.evaluate(() => ({ list: [...document.querySelectorAll('#csList .c-item')].map(x => x.textContent).find(t => /Read once/.test(t)) || null, chip: (document.querySelector('#cs .vd-chip') || {}).textContent, key: [...document.querySelectorAll('#cs .c-btn')].map(b => b.textContent).find(t => /Read it now/.test(t)) || null }));
  ok(d0.list && /Not read yet/.test(d0.list) && d0.chip === 'Not read yet' && d0.key, 'Your profile has a part of its own, Read once: not read yet, with Read it now', d0);
  await p.evaluate(() => [...document.querySelectorAll('#cs .c-btn')].find(b => b.textContent === 'Read it now').click());
  await p.waitForFunction(() => { const c = document.querySelector('#cs .vd-chip'); return c && /Up to date/.test(c.textContent); }, null, { timeout: 60000 }).catch(() => {}); await sleep(600);
  const d1 = await p.evaluate(() => { const D0 = IngCareer.state().profile.digest; return { chip: (document.querySelector('#cs .vd-chip') || {}).textContent, top: (document.querySelector('#cs .vd-top') || {}).textContent, asks: window.__asks.filter(a => /^PART/.test(a.u)).length, facts: Object.values(D0.parts).reduce((n, e) => n + e.facts.length, 0), all: JSON.stringify(D0.parts), rows: [...document.querySelectorAll('#cs .vd-facts li')].map(li => li.textContent.slice(0, 120)) }; });
  ok(d1.chip === 'Up to date' && d1.asks === 3 && /3 of 3 parts read/.test(d1.top), 'read once, part by part: each entry once', d1);
  ok(!/Nobel/.test(d1.all) && /1 fact left out, not found in their part/.test(d1.top), 'a fact that is in no part (a prize never won) is left out, and the panel says so', { top: d1.top });
  ok(d1.rows.some(r => /MSt in History, Oxford, 2020 to 2021/.test(r) && /From education/i.test(r) || /From .*MSt in History/.test(r)), 'each fact shows where it came from', d1.rows);
  const box = await p.evaluate(() => { const li = document.querySelector('#cs .vd-facts li'); const r = li.getBoundingClientRect(); return { x: r.left + 30, y: r.top + 10 }; });
  await p.mouse.move(box.x, box.y); await sleep(450);
  ok(/matrix\(1, 0, 0, 1, 0, -2\)/.test(await p.evaluate(() => getComputedStyle(document.querySelector('#cs .vd-facts li')).transform)), 'each fact lifts under the pointer');
  await p.screenshot({ path: OUT + '/digest.png' });
  // a reading starts from the digest
  await p.evaluate(async () => { window.__asks = []; const o = await IngCareer.newOpp('job', 'Archivist\nThe County Record Office\nEssential:\n- Archival research\n' + 'x'.repeat(60), 'pasted'); window.__o = o.id; await IngCareer.write(o, 'cover'); });
  await p.waitForFunction(() => !IngCareer.run.busy, null, { timeout: 60000 }).catch(() => {}); await sleep(500);
  const d2 = await p.evaluate(() => { const a = window.__asks.find(x => /^Write my cover letter/.test(x.u)) || window.__asks[0] || {}; return { has: /THE PROFILE, READ ONCE/.test(a.u || ''), src: /\[[^\]]*MSt in History[^\]]*\]/.test(a.u || ''), raw: /Dissertation on the archives of the Museum\./.test(a.u || ''), first: (/THE PROFILE, READ ONCE[^\n]*\n(?:Name: [^\n]*\n)?\n([^\n]*)/.exec(a.u || '') || [])[1] }; });
  ok(d2.has && d2.src, 'a reading starts from the digest: each fact with where it comes from', d2);
  ok(/Archival research/.test(d2.first || ''), "the fact most relevant to the task comes first (an archivist's post: archival research)", d2.first);
  // change one entry: only that one is read again
  await p.evaluate(() => { const P = IngCareer.state().profile; P.items[1].text = 'Taught study skills for three years.'; saveState(); const S = IngCareer.state(); S.ui.room = 'profile'; S.ui.ppart = 'read'; window.__asks = []; IngCareer.render(); }); await sleep(1200);
  const d3 = await p.evaluate(() => ({ chip: (document.querySelector('#cs .vd-chip') || {}).textContent, key: [...document.querySelectorAll('#cs .c-btn')].map(b => b.textContent).find(t => /changed part/.test(t)) || null }));
  ok(/1 to read again/.test(d3.chip || '') && /Read the 1 changed part again/.test(d3.key || ''), 'an entry changed: one part to read again', d3);
  await p.evaluate(() => [...document.querySelectorAll('#cs .c-btn')].find(b => /changed part/.test(b.textContent)).click());
  await p.waitForFunction(() => { const c = document.querySelector('#cs .vd-chip'); return c && /Up to date/.test(c.textContent); }, null, { timeout: 60000 }).catch(() => {}); await sleep(500);
  const d4 = await p.evaluate(() => ({ asks: window.__asks.filter(a => /^PART/.test(a.u)).length, three: /three years/.test(JSON.stringify(IngCareer.state().profile.digest.parts)), two: /two years/.test(JSON.stringify(IngCareer.state().profile.digest.parts)) }));
  ok(d4.asks === 1 && d4.three && !d4.two, 'only the changed entry was read again, and its old facts are gone', d4);
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await sleep(600); await p.screenshot({ path: OUT + '/digest_night.png' });
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
