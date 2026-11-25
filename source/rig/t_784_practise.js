// Ingenium 7.84: Vocatio's Practise, deepened (modules/r383.js; its hook in r188.js). Recommendation 10 of 24 November, approved with the
// preview (25 November 2026): "I approve of the previews but I want ... the same effect for the "Against the posting's criteria" section".
// Chromium's own stand-in microphone speaks; a stand-in for Scriba's model writes it down; a stand-in model reads the answer.
//   node rig/t_784_practise.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2), URL_ = args.find(a => /^https?:\/\//.test(a)), OUT = args.find(a => !/^https?:\/\//.test(a)) || '/tmp';
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch({ args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); try { await ctx.grantPermissions(['microphone']); } catch (e) {}
  const p = await ctx.newPage(); p.setDefaultTimeout(90000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer && window.IngPractise, null, { timeout: 600000 }); await sleep(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(800);
  const SAID = 'I built four offline study tools myself, and this programme is where that research belongs.';
  const id = await p.evaluate(async SAID => {
    window.__asks = []; IngLector.plan = () => ({ chosen: { id: 'test-model', customName: 'Test model' } });
    window.lxAsk = function (run, msgs, max, temp, onPiece) { const u = msgs[msgs.length - 1].content; window.__asks.push(u.slice(0, 3000)); let out = 'Nothing.';
      if (/THE CRITERIA:/.test(u)) out = '1 | MET | "I built four offline study tools myself" | Say what each tool records.\n2 | PARTLY | "this programme is where that research belongs" | Name the group you would join.\n3 | MET | "I led a team of ten" | Give one result.';
      if (onPiece) onPiece(out); return Promise.resolve(out); };
    window.IngEars = Object.assign({}, window.IngEars || {}, { deviceOk: () => true, ready: () => Promise.resolve({}), lang: () => 'en', resample: a => Promise.resolve(a), write: () => Promise.resolve(SAID) });
    const o = await IngCareer.newOpp('phd', 'PhD in Education\nUniversity of Exampleton\n' + 'x'.repeat(60), 'pasted'); o.title = 'PhD in Education';
    o.read = { r: { crit: [{ text: 'A clear research question', ess: true, st: 'met', ev: '' }, { text: 'Fit with the programme', ess: true, st: 'partly', ev: '' }, { text: 'Leading a team', ess: false, st: 'none', ev: '' }], strengths: [], concerns: [], next: [], asks: [], wants: [] }, at: Date.now(), model: 'Test model' };
    o.practice.qs = [{ id: 'q1', q: 'Why this programme, and why now?' }]; o.qsel = 'q1'; o.ptab = 'interview'; o.step = 'practise';
    saveState(); const S = IngCareer.state(); S.ui.room = 'apps'; S.ui.open = o.id; S.ui.show = 'work'; go('career'); IngCareer.render(); return o.id;
  }, SAID);
  await sleep(1500);
  const v0 = await p.evaluate(() => { const r = document.querySelector('#cs .vq-row'); return r ? { dial: !!r.querySelector('svg.vq-dial'), t: r.querySelector('svg text').textContent, keys: [...r.querySelectorAll('button')].map(b => b.textContent), before: r.nextElementSibling && r.nextElementSibling.tagName, foot: [...document.querySelectorAll('#cs .c-btn')].filter(b => b.offsetParent).map(b => b.textContent).filter(t => /criteria|best answer|Look at it/.test(t)) } : null; });
  ok(v0 && v0.dial && v0.t === '2:00' && v0.keys.indexOf('Answer aloud') >= 0 && v0.keys.indexOf('Start the clock') >= 0 && v0.keys.indexOf('3 min') >= 0 && v0.before === 'TEXTAREA', 'above the answer: a two-minute dial, Answer aloud, Start the clock and the time to choose', v0);
  ok(v0 && v0.foot.join('|') === 'Read it against the criteria|Keep as a best answer|Look at it with me', 'beside Look at it with me: Read it against the criteria, Keep as a best answer', v0 && v0.foot);
  // answer aloud: the stand-in microphone, the level, the clock running, then written down into the answer
  await p.evaluate(() => [...document.querySelectorAll('#cs .vq-row .c-btn')].find(b => b.textContent === 'Answer aloud').click()); await sleep(2300);
  const v1 = await p.evaluate(() => ({ key: [...document.querySelectorAll('#cs .vq-row .c-btn')].map(b => b.textContent), lvl: document.querySelector('#cs .vq-lvl').classList.contains('on'), t: document.querySelector('#cs .vq-dial text').textContent, on: IngPractise.listening() }));
  ok(v1.on && v1.lvl && v1.key.indexOf('Stop and write it down') >= 0 && /^1:5\d$/.test(v1.t), 'answering aloud: the microphone on this device, a level that moves, the clock running', v1);
  await p.screenshot({ path: OUT + '/listening.png' });
  await p.evaluate(() => [...document.querySelectorAll('#cs .vq-row .c-btn')].find(b => /Stop and write/.test(b.textContent)).click()); await sleep(800);
  const v2 = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id), q = o.practice.qs[0]; return { ta: document.querySelector('#cs textarea').value, ans: q.answer, secs: q.secs, note: document.querySelector('#cs .vq-say').textContent, on: IngPractise.listening() }; }, id);
  ok(!v2.on && v2.ta === SAID && v2.ans === SAID && v2.secs >= 2 && /Written down: \d+ words/.test(v2.note), 'stopped, what she said is written down into her answer, with the time it took', v2);
  // against the criteria: one reading, each criterion met, partly or not yet, with her own sentence; one the model invented is not quoted
  await p.evaluate(() => [...document.querySelectorAll('#cs .c-btn')].find(b => b.textContent === 'Read it against the criteria').click());
  await p.waitForFunction(() => document.querySelectorAll('#cs .vq-cr li .vq-chip.ok, #cs .vq-cr li .vq-chip.warn').length >= 2, null, { timeout: 30000 }).catch(() => {}); await sleep(500);
  const v3 = await p.evaluate(() => [...document.querySelectorAll('#cs .vq-cr li')].map(li => ({ v: li.querySelector('.vq-chip').textContent, c: li.querySelector('b') && li.querySelector('b').textContent, q: (li.querySelector('.q') || {}).textContent || '' })));
  ok(v3.length === 3 && v3[0].v === 'Met' && /I built four offline study tools myself/.test(v3[0].q) && v3[1].v === 'Partly', 'each criterion read against her answer, with the sentence it rests on', v3);
  ok(v3[2] && v3[2].v === 'Partly' && v3[2].q === '', 'a sentence the model put in her mouth is not quoted, and does not count as met', v3[2]);
  const box = await p.evaluate(() => { const li = document.querySelector('#cs .vq-cr li'); li.scrollIntoView({ block: 'center' }); const r = li.getBoundingClientRect(); return { x: r.left + 30, y: r.top + 12 }; });
  await p.mouse.move(box.x, box.y); await sleep(450);
  const lift = await p.evaluate(() => getComputedStyle(document.querySelector('#cs .vq-cr li')).transform);
  ok(/matrix\(1, 0, 0, 1, 0, -2\)/.test(lift), 'each criterion\'s line lifts under the pointer (her change)', lift);
  await p.screenshot({ path: OUT + '/criteria.png' });
  // her best answers
  await p.evaluate(() => [...document.querySelectorAll('#cs .c-btn')].find(b => b.textContent === 'Keep as a best answer').click()); await sleep(800);
  const v4 = await p.evaluate(id => { const q = IngCareer.state().opps.find(x => x.id === id).practice.qs[0]; return { n: (q.best || []).length, met: q.best && q.best[0].met, shown: [...document.querySelectorAll('#cs .vq-best li')].map(li => li.textContent.slice(0, 80)) }; }, id);
  ok(v4.n === 1 && v4.met === 1 && v4.shown.length === 1 && /meets 1 of 3 criteria/.test(v4.shown[0]), 'kept with her best answers: the time it took and the criteria it meets', v4);
  // the clock alone, and its length
  await p.evaluate(() => { const b = [...document.querySelectorAll('#cs .vq-len button')].find(x => x.textContent === '1 min'); b.click(); }); await sleep(200);
  const v5 = await p.evaluate(() => document.querySelector('#cs .vq-dial text').textContent);
  ok(v5 === '1:00', 'one, two or three minutes, chosen on the dial', v5);
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await sleep(600); await p.screenshot({ path: OUT + '/night.png' });
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
