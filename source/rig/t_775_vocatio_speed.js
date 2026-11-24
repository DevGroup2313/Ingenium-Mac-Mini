// Ingenium 7.75 (24 November 2026): Vocatio reads quickly and visibly, and a model never thinks in circles (modules/r188.js, r241.js,
// r365.js; build_page.py 7.75). Her words: "Last night I spent over 64 minutes waiting for a reading on Vocatio ... looking at a blank
// screen"; "Vocatio has to contantly stop the model from its own loop when it is finally thinking and force it to finally write". Her
// answer on how it should read: "I want a combination of Options A and B, depending on the task at hand but I always want the option."
// An invented applicant with a large profile (400 entries, three that bear on the posting), an invented posting, a stand-in model that
// says how far it has read before its first word, and a model memory of 131,072 tokens (which made every reading send everything).
//   node rig/t_775_vocatio_speed.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const POST = 'Learning Designer\nExample Learning Ltd\nWe are looking for a learning designer to build accessible online courses.\nEssential: experience designing learning materials; experience with an authoring tool such as Articulate Storyline; excellent written communication.\nDesirable: accessibility auditing.\nCloses 30 November 2026.';
const ANSWER = ['TITLE: Learning Designer', 'ORGANISATION: Example Learning Ltd', 'CLOSES: 30 November 2026', 'KIND: JOB',
  'CRITERION: Experience designing learning materials | ESSENTIAL | MET | Learning designer, Example College | Designed accessible online courses.',
  'CRITERION: Experience with an authoring tool such as Articulate Storyline | ESSENTIAL | MET | Storyline certificate | Holds a Storyline certificate.',
  'CRITERION: Excellent written communication | ESSENTIAL | TRANSFERABLE | Accessibility audit of course pages | The audit report shows clear writing.',
  'CRITERION: Accessibility auditing | DESIRABLE | MET | Accessibility audit of course pages | Audited course pages for accessibility.',
  'READING: A strong fit.', 'STRENGTH: Real courses built.', 'CONCERN: None of note.', 'NEXT: Apply.', 'ASK: None.', 'LEAD: Learning designer, Example College | experience designing learning materials'];
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(900);
  // 0. the page's own source: the engine is asked for its progress, and lxAsk hands it on
  const src = await p.evaluate(() => fetch(location.href).then(r => r.text()).then(t => ({ ask: t.indexOf('stream_options:{include_usage:true},return_progress:true,') >= 0, hand: t.indexOf('LX.onRead(p)') >= 0, eat: t.indexOf('job.onRead({total:+pp.total') >= 0 })));
  ok(src.ask && src.hand && src.eat, 'the computer app\'s engine is asked how far it has read, and each report reaches Lector and Vocatio (LX.onRead)', src);
  await p.evaluate(([ANSWER]) => {
    const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^mfake/.test(m.id));
    state.models.push({ id: 'mfake4', customName: 'Stand-in 4B', fileState: 'ready', fileName: L['gemma-4-12b'].file, stored: true }); delete state.vcRates; saveState();
    window.lxCtx = function () { return 131072; };   // the memory that made every reading send everything
    window.__asked = [];
    lxAsk = function (run, msgs, max, temp, onPiece) { const u = msgs[msgs.length - 1].content; window.__asked.push({ len: msgs.reduce((n, m) => n + String(m.content).length, 0), u: u.slice(0, 400), part: /^THE TASK/.test(u), notes: /READ PART BY PART/.test(u), first: u.indexOf('Learning designer, Example College'), garden: u.indexOf('Gardening club') });
      return new Promise((res, rej) => { let k = 0;
        const read = () => { if (run && run.__stopped) { rej(new Error('stopped')); return; } if (k <= 4) { if (LX.onRead) LX.onRead({ total: 1000, cache: 0, done: k * 200 }); k++; setTimeout(read, 450); return; } write(); };
        const write = () => { if (/^THE TASK/.test(u)) { const out = /Learning designer|Storyline|Accessibility audit/.test(u) ? '- Learning designer, Example College, 2023 to 2025: designed accessible online courses.' : 'NONE'; if (onPiece) onPiece(out); res(out); return; }
          let i = 0, out = ''; const step = () => { if (run && run.__stopped) { rej(new Error('stopped')); return; } if (i < ANSWER.length) { out += (out ? '\n' : '') + ANSWER[i]; if (onPiece) onPiece(out); i++; setTimeout(step, 60); return; } res(out); }; step(); };
        read(); }); };
    const P = IngCareer.state().profile; P.name = 'Ada Example'; P.items = [];
    for (let i = 0; i < 400; i++) P.items.push({ id: 'g' + i, sec: 'post', title: 'Gardening club volunteer ' + i, place: 'Riverside allotments', from: '2010', to: '2011', text: 'Watered the roses, pruned the hedges, sorted seed packets and kept the shed tidy for the season; ' + 'planted bulbs along the borders. '.repeat(4), src: 'me' });
    P.items.splice(380, 0, { id: 'r1', sec: 'post', title: 'Learning designer, Example College', place: 'Example College', from: '2023', to: '2025', text: 'Designed accessible online courses with Articulate Storyline; wrote the learning materials.', src: 'me' });
    P.items.splice(390, 0, { id: 'r2', sec: 'cert', title: 'Storyline certificate', place: 'Articulate', from: '2024', to: '', text: 'Authoring tool certificate.', src: 'me' });
    P.items.splice(395, 0, { id: 'r3', sec: 'project', title: 'Accessibility audit of course pages', place: 'Example College', from: '2024', to: '', text: 'Audited online course pages for accessibility and wrote the report.', src: 'me' });
    saveState(); }, [ANSWER]);
  await p.evaluate(post => IngCareer.newOpp('job', post, 'pasted').then(o => { o.step = 'post'; saveState(); const S = IngCareer.state(); S.ui.room = 'apps'; S.ui.open = o.id; S.ui.show = 'work'; go('career'); IngCareer.render(); return o.id; }), POST);
  await sleep(500);
  // 1. reading a posting: step by step by default, the way shown, the profile read part by part, each part within a minute's reading
  await p.evaluate(() => { const k = [...document.querySelectorAll('#cs button')].find(x => x.offsetParent && /Read it against my profile/.test(x.textContent)); k.click(); });
  await sleep(1300);
  const l1 = await p.evaluate(() => ({ way: [...document.querySelectorAll('#csWay .c-way-k')].map(b => b.textContent + ':' + b.getAttribute('aria-checked')), state: (document.getElementById('csLiveState') || {}).textContent || '', meter: !!(document.getElementById('csMeter') || {}).offsetParent, w: ((document.querySelector('#csMeter>i') || {}).style || {}).width }));
  ok(l1.way.join() === 'Relevant first:false,Step by step, everything:true', 'the working panel shows how it reads, with both ways to hand; a posting is read step by step by default', l1.way);
  ok(/Step by step: reading part 1 of \d+/.test(l1.state) && /read \d+ %/.test(l1.state) && l1.meter, 'before the first word: which part, how far the model has read (its own count), and a meter', l1);
  await p.screenshot({ path: OUT + '/1_step_by_step.png' });
  await p.waitForFunction(() => window.__asked.some(a => a.notes), null, { timeout: 180000 });
  await p.waitForFunction(() => !document.getElementById('csLivePn'), null, { timeout: 60000 }).catch(() => {});
  const a1 = await p.evaluate(() => ({ parts: window.__asked.filter(a => a.part).map(a => a.len), final: window.__asked.filter(a => a.notes).map(a => a.len), rate: state.vcRates }));
  ok(a1.parts.length >= 3 && Math.max(...a1.parts) <= 16000 + 4000, 'all of the profile is read, part by part, each part a minute\'s reading at this device\'s speed (not the whole memory at once)', a1);
  ok(a1.final.length === 1 && a1.final[0] < 30000, 'then the answer is written from the notes made part by part', a1.final);
  ok(a1.rate && Object.values(a1.rate).some(v => v > 0), 'this device\'s reading speed is measured and kept, for the next reading\'s size', a1.rate);
  // 2. switching to Relevant first while it works starts it again that way: one request, sized to a minute, the relevant entries first
  // the speed measured on the stand-in (which answers at once) is forgotten, so the size below is this kind of device's own (a page engine's)
  await p.evaluate(() => { window.__asked = []; delete state.vcRates; const k = [...document.querySelectorAll('#cs button')].find(x => x.offsetParent && /Read it (again|against my profile)/.test(x.textContent)); if (k) k.click(); });
  await sleep(900);
  await p.evaluate(() => { delete state.vcRates; const k = document.querySelector('#csWay .c-way-k[data-way="quick"]'); k.click(); });
  await p.waitForFunction(() => window.__asked.some(a => !a.part), null, { timeout: 60000 });
  await sleep(600);
  const a2 = await p.evaluate(() => { const q = window.__asked.filter(a => !a.part && !a.notes); return { n: q.length, len: q.map(a => a.len), first: q.map(a => a.first), garden: q.map(a => a.garden), way: IngCareer.state().profile.prefs.ways }; });
  ok(a2.n >= 1 && a2.len[a2.len.length - 1] < 40000, 'Relevant first: one request, sized to this device\'s speed (the old size was the whole memory, about 387,000 characters)', a2);
  ok(a2.first[a2.first.length - 1] >= 0 && a2.first[a2.first.length - 1] < a2.garden[a2.garden.length - 1], 'and the entries that bear on the posting come first, ahead of the 400 that do not', a2);
  ok(a2.way && Object.values(a2.way).includes('quick'), 'the choice is remembered for this task', a2.way);
  await p.waitForFunction(() => !document.getElementById('csLivePn'), null, { timeout: 60000 }).catch(() => {});
  // 3. a model that thinks though asked not to: stopped at a short reasoning, then answers; asked again and thinking again, it is stopped and says so
  const r3 = await p.evaluate(async () => {
    function fake(mode) { let aborted = false, calls = 0; return { calls: () => calls, abort() { aborted = true; },
      generate(job) { calls++; aborted = false; const n = calls; return new Promise(res => { let t = 0;
        const go = () => { if (aborted) { res({ text: '' }); return; }
          if (n === 1 || mode === 'stubborn') { job.onThink && job.onThink('Wait, let me check the profile again. Hmm, the dates. '); t++; if (t < 4000) { setTimeout(go, 1); return; } res({ text: '' }); return; }
          job.onToken('The answer, written from the notes.'); res({ text: 'The answer, written from the notes.' }); }; go(); }); } }; }
    const A = fake('once'); const r1 = await ingThinkBudget(A, { messages: [{ role: 'user', content: 'Read this.' }], params: { thinking: false }, onToken() {}, onThink() {} });
    const B = fake('stubborn'); let e2 = ''; try { await ingThinkBudget(B, { messages: [{ role: 'user', content: 'Read this.' }], params: { thinking: false }, onToken() {}, onThink() {} }); } catch (e) { e2 = e.message; }
    return { text: r1.text, cut: r1.thinkCut, callsA: A.calls(), e2, callsB: B.calls() }; });
  ok(/The answer, written from the notes\./.test(r3.text) && r3.cut && r3.callsA === 2, 'a model that thinks though asked not to (Lector, Vocatio) is stopped when it circles, and answers from its notes, without Stop', r3);
  ok(/went on thinking and gave no answer/.test(r3.e2) && r3.callsB === 2, 'one that thinks again is stopped there too, and Ingenium says so plainly instead of waiting', r3);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
