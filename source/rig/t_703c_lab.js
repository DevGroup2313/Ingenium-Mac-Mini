// node rig/t_703c_lab.js <Ingenium page url> <out dir>
// Ingenium 6.9.x (31 October 2026), in headless Chromium. The owner's words: "I want to expand on the parameters of what Ingenium
// can do as a serious coding and creating workbench with and without AI. I want to be able to create and train all kinds of AI
// models, even Frontier level AI models inside of the app." (modules/r201.js: the learning workbench, on the TensorFlow.js that
// Ingenium's eyes carry; modules/r157.js lends it)
//   - the card stands in the Train room, after the trainer, with four tools one at a time; TensorFlow.js is not loaded until a
//     lesson starts; what was kept is listed without loading it;
//   - the character model trains on the processor (the CPU backend, as a device with no graphics chip would): the loss falls, a
//     sample of what it writes appears every few steps, held-back loss is measured, the whole lesson takes under two minutes;
//   - pause holds the steps still, carrying on goes on, stop keeps what was learned; one lesson at a time; no tensor is left behind;
//   - a model is kept by name in TensorFlow.js's IndexedDB store, listed after a reload, used again to write, and let go;
//   - the notes sorter learns from six examples and says how it does on the one held back; the sixty-word map puts words used
//     in the same places near each other; the picture sorter, with the carried MobileNet, tells red pictures from blue ones;
//   - a device with 2 GB is offered the two smaller sizes; at a phone's width nothing overflows; the arrow keys move between the tools;
//   - no script errors; every part of the page ran to its end.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function enter(p) { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900); }
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1280, height: 1000 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300))); p.on('dialog', d => d.accept());
  await p.goto(URL_); await enter(p);
  // 6.28 (modules/r232.js): the Train room shows one part at a time, and each workbench tool one step at a time. Before a key or a field
  // of the workbench is used, its part and its step are opened, as she would open them (its step's key, IngTrain.step)
  const atStep = sel => p.evaluate(s => { try { const el = document.querySelector(s); if (!el || !window.IngTrain) return; if (IngTrain.part() !== 'workbench' && document.getElementById('ingLabCard').contains(el)) IngTrain.part('workbench');
    const sec = el.closest('#labPanels .lb-panel > .lb-sec'); if (sec && !sec.classList.contains('tn-on')) { const pn = sec.parentNode; IngTrain.step(pn.id.replace(/^labP-/, ''), [...pn.querySelectorAll(':scope > .lb-sec')].indexOf(sec)); } } catch (e) {} }, sel.split(' >> ')[0].trim());
  const oClick = p.click.bind(p), oFill = p.fill.bind(p);
  p.click = async (sel, o) => { if (typeof sel === 'string' && /lab|#labP-/.test(sel)) await atStep(sel); return oClick(sel, o); };
  p.fill = async (sel, v, o) => { if (typeof sel === 'string' && /lab/.test(sel)) await atStep(sel); return oFill(sel, v, o); };
  const oFiles = p.setInputFiles.bind(p), oSelect = p.selectOption.bind(p);
  p.setInputFiles = async (sel, v, o) => { if (typeof sel === 'string' && /lab/.test(sel)) await atStep(sel); return oFiles(sel, v, o); };
  p.selectOption = async (sel, v, o) => { if (typeof sel === 'string' && /lab/.test(sel)) await atStep(sel); return oSelect(sel, v, o); };
  await p.evaluate(() => { go('models'); IngRooms.open('models', 'studio', true); IngStudio.open('train'); if (window.IngTrain) IngTrain.part('workbench'); }); await p.waitForTimeout(900);
  // the card
  const a = await p.evaluate(() => { const c = document.getElementById('ingLabCard'); return { room: IngStudio.roomOf(c), h: c.querySelector('h2').textContent, tabs: [...c.querySelectorAll('.lb-tab')].map(t => t.textContent), sel: [...c.querySelectorAll('.lb-tab')].filter(t => t.getAttribute('aria-selected') === 'true').map(t => t.id).join(),
    panels: [...c.querySelectorAll('.lb-panel')].filter(x => !x.hidden).map(x => x.id).join(), tf: typeof window.tf, eng: document.getElementById('labEngine').textContent, saved: document.getElementById('labCharsSaved').innerText.replace(/\s+/g, ' '),
    order: [...document.getElementById('stP-train').children].filter(e => e.classList.contains('card')).map(e => e.id), shown: c.getBoundingClientRect().height > 0, api: Object.keys(IngLab).join(), carried: IngLab.engine.carried() }; });
  ok(a.room === 'train' && a.h === 'The learning workbench' && a.order.join() === 'ingTruthCard,trainCard,ingLabCard' && a.shown, 'the learning workbench stands in the Train room, after the truth card and the trainer', a.order);
  ok(a.tabs.join() === 'Write like my text,Sort my notes,Sort my pictures,Words that sit together' && a.sel === 'labT-chars' && a.panels === 'labP-chars', 'four tools, one shown at a time, the character model first', { tabs: a.tabs, sel: a.sel, panels: a.panels });
  ok(a.tf === 'undefined' && /It loads when you start a lesson/.test(a.eng) && /Nothing is sent anywhere/.test(a.eng) && /WebGPU/.test(a.eng) && /Nothing kept yet/.test(a.saved), 'TensorFlow.js is not loaded until a lesson starts; the engine line says where it runs, that nothing is sent, and what it does about WebGPU; the kept list is empty without it', { tf: a.tf, eng: a.eng.slice(0, 260), saved: a.saved });
  const hint = await p.evaluate(() => { const hh = document.querySelector('#trainBody .lb-hint'); return hh ? { text: hh.innerText.replace(/\s+/g, ' '), key: (hh.querySelector('button') || {}).textContent } : null; });
  ok(hint && /Smaller lessons run in this page, on any device: the learning workbench, (below|in the Workbench tab)/.test(hint.text) && hint.key === 'Open the learning workbench', "on a device with no trainer the trainer's card points to the workbench", hint);
  await p.screenshot({ path: path.join(OUT, 'lab_top.png') });
  // the ways a text comes in: a file, a dataset from the Data room, the notes (before any lesson)
  const tide = 'The tide comes in twice a day, and the gulls know it before we do. '.repeat(30);
  await p.setInputFiles('#labP-chars input[type=file]', { name: 'tide.txt', mimeType: 'text/plain', buffer: Buffer.from(tide) }); await p.waitForTimeout(500);
  const f1 = await p.evaluate(() => ({ len: document.getElementById('labCharsText').value.length, info: document.getElementById('labCharsTextCount').textContent, cur: IngLab.current() }));
  ok(f1.len === tide.length && /from .tide./.test(f1.info) && f1.cur.name === 'tide' && f1.cur.chars === tide.length, 'a text file chosen with the key becomes the text, with its name', f1);
  const d1 = await p.evaluate(async () => { const set = await IngData.create('Tide dataset', [{ kind: 'text', title: 'tide', text: 'The tide comes in twice a day, and the gulls know it before we do. '.repeat(40), src: { kind: 'paste' } }], { held: 0 });
    const sel = document.querySelector('#labP-chars .lb-ds'); sel.dispatchEvent(new Event('mousedown')); await new Promise(r => setTimeout(r, 600));
    const opts = [...sel.options].map(o => o.textContent), shown = !sel.hidden; const o = [...sel.options].find(x => /Tide dataset/.test(x.textContent)); sel.value = o.value; sel.dispatchEvent(new Event('change')); await new Promise(r => setTimeout(r, 600));
    const cur = IngLab.current(); await IngData.remove(set.id); return { opts, shown, cur, want: (await IngData.text(set.id, { split: 'train' }).catch(() => '')).length }; });
  ok(d1.shown && d1.opts.some(t => /Tide dataset \(.* characters\)/.test(t)) && d1.cur.name === 'Tide dataset' && d1.cur.chars > 2000, 'a dataset from the Data room can be chosen as the text', d1);
  await p.evaluate(() => { state.notes = [{ id: 'q1', text: '<p>Buy butter and flour</p>', ts: 1 }, { id: 'q2', text: 'Write to the editor about the proofs', ts: 2 }, { id: 'q3', text: '', ts: 3 }]; }); await p.click('#labT-notes'); await p.click('#labNotesText', { force: true }); await p.evaluate(() => { document.getElementById('labNotesText').value = ''; }); await p.click('#labP-notes >> text=Bring in my sticky notes'); await p.waitForTimeout(300);
  const nn = await p.evaluate(() => ({ t: document.getElementById('labNotesText').value, c: document.getElementById('labNotesCount').textContent })); await p.evaluate(() => { document.getElementById('labNotesText').value = ''; }); await p.click('#labT-chars');
  ok(/^\?: Buy butter and flour\n\?: Write to the editor about the proofs\n$/.test(nn.t) && /2 lines, none labelled yet/.test(nn.c), 'her sticky notes come in as lines with no label (an empty note is left out), to be labelled and sorted', nn);
  // the character model, on the processor, a few steps
  await p.evaluate(() => { IngLab.engine.prefer(false); document.getElementById('labGpu').checked = false; });
  await p.click('#labP-chars >> text=Try a sample'); await p.fill('#labCharsSteps', '24');
  const cnt = await p.textContent('#labCharsTextCount');
  const T0 = Date.now(); await p.click('#labCharsGo');
  const seen = new Set(); let status = '', maxStep = 0, sawPaused = false;
  while (Date.now() - T0 < 400000) { const s = await p.evaluate(() => ({ st: document.getElementById('labCharsStatus').textContent, sm: document.getElementById('labCharsSample').lastChild.textContent, step: IngLab.run() ? IngLab.run().step : -1 })); status = s.st; if (s.sm && !/^Nothing yet/.test(s.sm)) seen.add(s.sm); maxStep = Math.max(maxStep, s.step); if (/^(Done|Stopped)/.test(s.st)) break; await sleep(250); }
  const secs = (Date.now() - T0) / 1000;
  const c1 = await p.evaluate(() => { const st = IngLab.chars.state(); return { st: { step: st.step, params: st.params, vocab: st.vocab, backend: st.backend, val: st.val, loss: st.loss, sampleLen: st.sample.length, dead: st.dead }, hist: st.hist.map(h => [h.s, h.loss, h.val]), chart: !!document.querySelector('#labCharsChart svg path.tr-train'), chartVal: !!document.querySelector('#labCharsChart svg path.tr-val'),
    stats: document.getElementById('labCharsStats').textContent, tf: typeof window.tf, tfv: window.tf && tf.version_core, eng: document.getElementById('labEngine').textContent, bar: document.getElementById('labCharsBar').getAttribute('aria-valuenow'), go: document.getElementById('labCharsGo').disabled, run: IngLab.run() }; });
  console.log('     (' + cnt.trim() + '; ' + secs.toFixed(1) + ' s; status: ' + status + ')');
  ok(/^Done: 24 steps/.test(status) && c1.st.step === 24 && c1.st.backend === 'cpu' && !c1.go && c1.run === null, 'the character model trains 24 steps on the processor and says so', { status, st: c1.st, run: c1.run });
  const first = c1.hist[0][1], last = c1.hist[c1.hist.length - 1][1];
  ok(c1.hist.length >= 10 && first - last >= 0.5 && last < Math.log(c1.st.vocab), 'the loss falls (' + first.toFixed(2) + ' to ' + last.toFixed(2) + '; guessing at random is ' + Math.log(c1.st.vocab).toFixed(2) + ')', { first, last, n: c1.hist.length });
  ok(typeof c1.st.val === 'number' && c1.hist.some(h => h[2] != null) && c1.chart && c1.chartVal && /held back/.test(c1.stats) && /^loss \d/.test(c1.stats), 'the loss is drawn, with the held-back loss beside it, and the numbers are said', { val: c1.st.val, chart: c1.chart, chartVal: c1.chartVal, stats: c1.stats });
  ok(seen.size >= 2 && c1.st.sampleLen >= 20, 'a sample of what it writes is shown every few steps (' + seen.size + ' different ones during the lesson) and one is left at the end', { seen: seen.size, len: c1.st.sampleLen });
  ok(secs < 120, 'the whole lesson, from the key to the last sample, took ' + secs.toFixed(0) + ' seconds (under two minutes)', secs);
  ok(c1.tf === 'object' && c1.tfv === '4.22.0' && /TensorFlow\.js 4\.22\.0/.test(c1.eng) && /processor/.test(c1.eng), 'TensorFlow.js 4.22.0 started when the lesson did, and the engine line names the processor', { tf: c1.tf, eng: c1.eng.slice(0, 200) });
  await p.screenshot({ path: path.join(OUT, 'lab_chars.png'), fullPage: false });
  // write with it
  await p.fill('#labCharsPrompt', 'It is'); await p.click('#labCharsWrite'); await p.waitForFunction(() => !/Writing/.test(document.getElementById('labCharsOut').textContent), null, { timeout: 240000 });
  const wr = await p.evaluate(() => document.getElementById('labCharsOut').lastChild.textContent);
  ok(wr.startsWith('It is') && wr.length > 100, 'Try it: the model continues a sentence of hers, letter by letter (what it writes after 24 steps is still mostly noise)', wr.slice(0, 80));
  // pause, carry on, stop
  await p.fill('#labCharsSteps', '300'); await p.click('#labCharsGo'); await p.waitForFunction(() => IngLab.run() && IngLab.run().step >= 3, null, { timeout: 240000 });
  const other = await p.evaluate(async () => { try { await IngLab.notes.train({ text: 'a: one two three\na: two three four\nb: five six seven\nb: six seven eight\n' }); return 'started'; } catch (e) { return e.message; } });
  await p.click('#labCharsPause'); await p.waitForFunction(() => IngLab.run() && IngLab.run().state === 'paused', null, { timeout: 240000 });
  const s1 = await p.evaluate(() => IngLab.run().step); await p.waitForTimeout(2000); const s2 = await p.evaluate(() => IngLab.run().step);
  const pl = await p.evaluate(() => ({ btn: document.getElementById('labCharsPause').textContent, say: document.getElementById('labCharsStatus').textContent }));
  await p.click('#labCharsPause'); await p.waitForFunction(s => IngLab.run() && IngLab.run().step > s && IngLab.run().state === 'running', s2, { timeout: 240000 });
  const s3 = await p.evaluate(() => IngLab.run().step);
  await p.click('#labCharsStop'); await p.waitForFunction(() => /^Stopped/.test(document.getElementById('labCharsStatus').textContent), null, { timeout: 240000 });
  const stp = await p.evaluate(() => ({ say: document.getElementById('labCharsStatus').textContent, st: IngLab.chars.state(), run: IngLab.run(), go: document.getElementById('labCharsGo').disabled, pa: document.getElementById('labCharsPause').hidden }));
  ok(/A lesson is running just now \(Write like my text\)/.test(other), 'one lesson at a time: a second is refused while one runs, and says which', other);
  ok(s1 === s2 && /^Carry on/.test(pl.btn) && /^Paused at step/.test(pl.say), 'Pause holds the steps still (step ' + s1 + ' stayed ' + s2 + ' for two seconds); the key becomes Carry on', { s1, s2, pl });
  ok(s3 > s2 && /^Stopped at step/.test(stp.say) && stp.st.step >= s3 && stp.st.sample.length > 0 && !stp.st.dead && stp.run === null && !stp.go && stp.pa, 'Carry on goes on; Stop ends the lesson and keeps what was learned (step ' + stp.st.step + '), with a sample, ready to write with, keep or carry on', { s3, stp });
  // memory: nothing left behind once the model is let go
  const mem = await p.evaluate(() => { const w = IngLab.engine.memory(); IngLab.chars.forget(); return { with: w, without: IngLab.engine.memory() }; });
  ok(mem.with.tensors > 0 && mem.without.tensors === 0 && mem.without.bytes === 0, 'the model holds its numbers while it is kept, and lets every one go when it is let go: no tensor left behind', mem);
  // keep it by name, after a short lesson again
  await p.fill('#labCharsSteps', '12'); await p.click('#labCharsGo'); await p.waitForFunction(() => /^Done/.test(document.getElementById('labCharsStatus').textContent), null, { timeout: 400000 });
  const stepKept = await p.evaluate(() => IngLab.chars.state().step);
  await p.fill('#labCharsName', 'Letters, tiny'); await p.click('#labCharsSave'); await p.waitForFunction(() => /^Kept as/.test(document.getElementById('labCharsKeepSay').textContent), null, { timeout: 120000 }); await p.waitForTimeout(500);
  const k1 = await p.evaluate(() => ({ say: document.getElementById('labCharsKeepSay').textContent, list: document.getElementById('labCharsSaved').innerText.replace(/\s+/g, ' ') }));
  ok(/Kept as .Letters, tiny., in this browser/.test(k1.say) && /Letters, tiny/.test(k1.list) && /KB/.test(k1.list), 'Keep it saves the model under a name in this browser (TensorFlow.js\'s own store) and lists it', k1);
  // the same name again asks first (the page's own question), and replaces only when she says yes
  await p.evaluate(() => { document.getElementById('labCharsKeepSay').textContent = ''; }); await p.click('#labCharsSave'); await p.waitForSelector('.ing-ask-keys', { timeout: 15000 });
  const rq = await p.evaluate(() => document.querySelector('.ing-ask').innerText.replace(/\s+/g, ' '));
  await p.click('.ing-ask-keys .btn.primary'); await p.waitForFunction(() => /^Kept as/.test(document.getElementById('labCharsKeepSay').textContent), null, { timeout: 120000 });
  const rl = await p.evaluate(async () => (await IngLab.saved()).filter(x => x.kind === 'chars').length);
  ok(/Replace .Letters, tiny.\?/.test(rq) && /only the new one/.test(rq) && rl === 1, 'keeping a model under a name already kept asks first, in the page\'s own question, and replaces it when she says yes (one model kept, not two)', { rq, rl });
  await p.reload(); await enter(p); await p.evaluate(() => { go('models'); IngRooms.open('models', 'studio', true); IngStudio.open('train'); }); await p.waitForTimeout(1500);
  const k2 = await p.evaluate(() => ({ tf: typeof window.tf, list: document.getElementById('labCharsSaved').innerText.replace(/\s+/g, ' '), list2: null }));
  ok(k2.tf === 'undefined' && /Letters, tiny/.test(k2.list), 'after a reload the kept model is listed, and TensorFlow.js is still not loaded', k2);
  await p.evaluate(() => IngLab.engine.prefer(false));
  await p.click('#labCharsSaved >> text=Use'); await p.waitForFunction(() => /is open/.test(document.getElementById('labCharsStatus').textContent), null, { timeout: 240000 });
  const k3 = await p.evaluate(() => ({ say: document.getElementById('labCharsStatus').textContent, st: IngLab.chars.state(), keep: document.getElementById('labCharsKeep').checked, sample: document.getElementById('labCharsSample').innerText.replace(/\s+/g, ' ').slice(0, 60) }));
  await p.fill('#labCharsPrompt', 'The'); await p.click('#labCharsWrite'); await p.waitForFunction(() => !/Writing/.test(document.getElementById('labCharsOut').textContent), null, { timeout: 240000 });
  const wr2 = await p.evaluate(() => document.getElementById('labCharsOut').lastChild.textContent);
  ok(/Letters, tiny.? is open: \d+ steps of learning, 28,394 numbers/.test(k3.say) && k3.st.step === stepKept && k3.keep && wr2.startsWith('The') && wr2.length > 100, 'Use opens the kept model as it was (step ' + stepKept + ', 28,394 numbers), ready to write with or to carry on training', { say: k3.say, step: k3.st.step, stepKept, wr2: wr2.slice(0, 40) });
  await p.click('#labCharsSaved >> text=Let it go'); await p.waitForSelector('.ing-ask-keys', { timeout: 15000 }); const lg = await p.evaluate(() => document.querySelector('.ing-ask').innerText.replace(/\s+/g, ' '));
  await p.click('.ing-ask-keys .btn.primary'); await p.waitForFunction(() => /Nothing kept yet/.test(document.getElementById('labCharsSaved').innerText), null, { timeout: 120000 });
  ok(/Let go of .Letters, tiny.\?/.test(lg) && /cannot be got back/.test(lg), 'Let it go asks first, in the page\'s own question, and removes the kept model from this device when she says yes', lg);
  await p.evaluate(() => IngLab.chars.forget());
  // the notes sorter, on six examples
  await p.click('#labT-notes'); await p.waitForTimeout(300);
  const six = 'history: The treaty ended the war and the princes signed it.\nhistory: The king sent an army across the river to the old city.\nhistory: The archive keeps letters from the court of the empire.\ncooking: Fry the onions in butter and add the garlic.\ncooking: Bake the bread in a hot oven until golden.\ncooking: Whisk the eggs with sugar and flour.\n?: The envoys met at the old city before the war.\n?: Sugar and flour for the bread.\n';
  await p.fill('#labNotesText', six); await p.fill('#labNotesRounds', '100');
  const cn = await p.textContent('#labNotesCount'); await p.click('#labNotesGo'); await p.waitForFunction(() => /^(Done|Stopped)/.test(document.getElementById('labNotesStatus').textContent), null, { timeout: 240000 });
  const n1 = await p.evaluate(() => ({ res: document.getElementById('labNotesResult').innerText.replace(/\s+/g, ' '), model: !!IngLab.notes.model(), chart: !!document.querySelector('#labNotesChart svg path.tr-train') }));
  await p.fill('#labNotesTry', 'The king signed the treaty'); await p.click('#labNotesTryGo'); const t1 = await p.evaluate(() => document.querySelector('#labNotesOut .lb-bar2 b').textContent);
  await p.fill('#labNotesTry', 'Fry the onions in butter'); await p.click('#labNotesTryGo'); const t2 = await p.evaluate(() => document.querySelector('#labNotesOut .lb-bar2 b').textContent);
  await p.click('#labNotesSort'); const so = await p.evaluate(() => [...document.querySelectorAll('#labNotesSorted tr')].slice(1).map(r => [...r.children].map(c => c.textContent).join(' | ')));
  ok(/6 examples under 2 labels: history \(3\), cooking \(3\)/.test(cn) && /2 lines with no label/.test(cn), 'six examples under two labels are counted, and the two lines with no label are said', cn);
  ok(/On the examples it learned from: 5 of 5 right/.test(n1.res) && /On the 1 held back: [01] right/.test(n1.res) && /rough figure from so few/.test(n1.res) && n1.chart, 'the sorter learns from six examples (one held back, said to be a rough figure) and the loss is drawn', n1.res);
  ok(t1 === 'history' && t2 === 'cooking' && so.length === 2 && /history/.test(so[0]) && /cooking/.test(so[1]), 'it sorts a new note, and the lines she had not labelled', { t1, t2, so });
  await p.fill('#labNotesName', 'Six notes'); await p.click('#labNotesSave'); await p.waitForFunction(() => /^Kept as/.test(document.getElementById('labNotesKeepSay').textContent), null, { timeout: 120000 });
  const n2 = await p.evaluate(() => { const before = IngLab.notes.predict('The king signed the treaty')[0]; IngLab.notes.forget(); let gone = false; try { IngLab.notes.predict('x'); } catch (e) { gone = true; } return { before, gone }; });
  await p.waitForTimeout(500); await p.click('#labNotesSaved >> text=Use'); await p.waitForFunction(() => /is open/.test(document.getElementById('labNotesStatus').textContent), null, { timeout: 120000 });
  const n3 = await p.evaluate(() => IngLab.notes.predict('The king signed the treaty')[0]);
  ok(n2.gone && n3.label === 'history' && Math.abs(n3.p - n2.before.p) < 1e-4, 'a kept sorter, used again, gives the same answer as before it was kept', { n2, n3 });
  await p.click('#labNotesSaved >> text=Let it go'); await p.waitForSelector('.ing-ask-keys', { timeout: 15000 }); await p.click('.ing-ask-keys .btn.primary'); await p.waitForFunction(() => /Nothing kept yet/.test(document.getElementById('labNotesSaved').innerText), null, { timeout: 120000 });
  // words that sit together
  await p.click('#labT-words'); await p.waitForTimeout(300); await p.click('#labP-words >> text=Try a sample'); await p.fill('#labWordsSteps', '120');
  const W0 = Date.now(); await p.click('#labWordsGo'); await p.waitForFunction(() => /^(Done|Stopped)/.test(document.getElementById('labWordsStatus').textContent), null, { timeout: 480000 });
  await p.fill('#labWordsLook', 'king'); await p.click('#labWordsFind'); await p.click('#labWordsMapGo');
  const w1 = await p.evaluate(() => ({ res: document.getElementById('labWordsResult').innerText.replace(/\s+/g, ' '), near: [...document.querySelectorAll('#labWordsOut .lb-bar2 b')].map(x => x.textContent), circles: document.querySelectorAll('#labWordsMap circle').length, chart: !!document.querySelector('#labWordsChart svg path.tr-train') }));
  ok(/51 words, 16 numbers each, from 7,594 words/.test(w1.res) && /ranks a real neighbour above a random word/.test(w1.res) && w1.chart, 'the word map learns (' + ((Date.now() - W0) / 1000).toFixed(0) + ' s, 120 steps), says how many words and numbers, and how it does on word pairs held back', w1.res);
  ok(w1.near.slice(0, 5).some(w => /^(queen|prince|princess|lord|lady)$/.test(w)) && w1.circles >= 30, 'the words nearest "king" are others of the court (' + w1.near.slice(0, 5).join(', ') + '); the map draws the most used words', w1);
  await p.fill('#labWordsLook', 'king - lord + zzzz'); await p.click('#labWordsFind'); const w2 = await p.evaluate(() => document.getElementById('labWordsOut').innerText.replace(/\s+/g, ' '));
  ok(/Not known, and left out: zzzz/.test(w2), 'a word it does not know is said, not guessed at', w2);
  await p.evaluate(() => IngLab.words.forget());
  // the picture sorter, with the carried MobileNet
  await p.evaluate(() => IngLab.engine.prefer(true)); await p.click('#labT-pictures'); await p.waitForTimeout(300);
  const files = await p.evaluate(() => { function mk(kind, i) { const c = document.createElement('canvas'); c.width = c.height = 120; const x = c.getContext('2d'); const hue = kind === 'red' ? i * 6 : 215 + i * 6; x.fillStyle = 'hsl(' + hue + ',70%,' + (30 + i * 5) + '%)'; x.fillRect(0, 0, 120, 120); x.fillStyle = 'hsl(' + (hue + 20) + ',80%,70%)'; if (kind === 'red') x.fillRect(20 + i * 5, 20, 50, 50); else { x.beginPath(); x.arc(60, 60 + i * 3, 30, 0, 7); x.fill(); } return c.toDataURL('image/png').split(',')[1]; }
    const o = { red: [], blue: [], test: mk('red', 6) }; for (let i = 0; i < 5; i++) { o.red.push(mk('red', i)); o.blue.push(mk('blue', i)); } return o; });
  const tmp = path.join(OUT, 'pics'); fs.mkdirSync(tmp, { recursive: true }); const paths = { red: [], blue: [] };
  ['red', 'blue'].forEach(k => files[k].forEach((d, i) => { const f = path.join(tmp, k + i + '.png'); fs.writeFileSync(f, Buffer.from(d, 'base64')); paths[k].push(f); })); const testPic = path.join(tmp, 'test.png'); fs.writeFileSync(testPic, Buffer.from(files.test, 'base64'));
  const ins = await p.$$('#labPicCats input[type=file]'); await p.fill('#labPicCats input.lb-catname >> nth=0', 'reds'); await p.fill('#labPicCats input.lb-catname >> nth=1', 'blues');
  await ins[0].setInputFiles(paths.red); await ins[1].setInputFiles(paths.blue);
  await p.waitForFunction(() => document.querySelectorAll('#labPicCats .lb-thumbs img').length === 10, null, { timeout: 420000 });
  await p.click('#labPicGo'); await p.waitForFunction(() => /^(Done|Stopped)/.test(document.getElementById('labPicStatus').textContent), null, { timeout: 240000 });
  const pr = await p.evaluate(() => ({ res: document.getElementById('labPicResult').innerText.replace(/\s+/g, ' '), counts: [...document.querySelectorAll('#labPicCats .lb-cat')].map(c => c.innerText.replace(/\s+/g, ' ').match(/(\d+) pictures/)[1]).join(), feat: IngLab.pictures.categories()[0].items[0].feat.length }));
  await p.setInputFiles('#labPicTry', testPic); await p.waitForFunction(() => document.querySelectorAll('#labPicOut .lb-bar2').length > 0, null, { timeout: 240000 });
  const pt = await p.evaluate(() => [...document.querySelectorAll('#labPicOut .lb-bar2')].map(r => r.innerText.replace(/\s+/g, ' ')));
  ok(pr.counts === '5,5' && pr.feat === 1280 && /On the pictures it learned from: 8 of 8 right/.test(pr.res) && /On the 2 held back: 2 right/.test(pr.res), 'the picture sorter: ten pictures in two categories, each read once by MobileNet v2 (1,280 numbers), learned in seconds, two held back and both right', pr);
  ok(/^reds 9\d%|^reds 100%/.test(pt[0]), 'a red picture it never saw goes under "reds"', pt);
  const held = await p.evaluate(() => { const m = IngLab.engine.memory(); return { tensors: m.tensors }; });
  ok(held.tensors < 200, 'only the picture reader\'s own weights remain in memory (' + held.tensors + ' tensors), and r157 lets them go after two idle minutes', held);
  await p.screenshot({ path: path.join(OUT, 'lab_pictures.png'), fullPage: false });
  // the keyboard, a phone's width
  await p.evaluate(() => document.getElementById('labT-chars').click()); await p.focus('#labT-chars'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200);
  const kb = await p.evaluate(() => ({ cur: IngLab.current().kind, focus: document.activeElement.id })); await p.keyboard.press('End'); await p.waitForTimeout(200); const kb2 = await p.evaluate(() => ({ cur: IngLab.current().kind, focus: document.activeElement.id }));
  ok(kb.cur === 'notes' && kb.focus === 'labT-notes' && kb2.cur === 'words' && kb2.focus === 'labT-words', 'the arrow keys and End move between the tools and the focus with them', { kb, kb2 });
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(500); await p.evaluate(() => document.getElementById('labT-chars').click()); await p.waitForTimeout(300);
  const nw = await p.evaluate(() => { const c = document.getElementById('ingLabCard'); return { sw: document.documentElement.scrollWidth, iw: window.innerWidth, cw: c.scrollWidth, cc: c.clientWidth, tabs: [...c.querySelectorAll('.lb-tab')].map(t => Math.round(t.getBoundingClientRect().top)) }; });
  ok(nw.sw <= nw.iw + 1 && nw.cw <= nw.cc + 1 && new Set(nw.tabs).size >= 2, "at a phone's width the tools wrap and nothing overflows", nw);
  await p.evaluate(() => document.getElementById('ingLabCard').scrollIntoView()); await p.screenshot({ path: path.join(OUT, 'lab_phone.png') });
  const parts = await p.evaluate(() => Object.keys(window.__ingParts).filter(k => window.__ingParts[k] !== 'running'));
  ok(parts.length === 0, 'every part of the page ran to its end', parts);
  ok(errs.length === 0, 'no script errors on the page', errs.join(' | '));
  await ctx.close();
  // a device with 2 GB: the two smaller sizes only
  const ctx2 = await b.newContext({ viewport: { width: 1280, height: 1000 } }); await ctx2.addInitScript(() => { try { Object.defineProperty(navigator, 'deviceMemory', { get: () => 2 }); } catch (e) { } });
  const p2 = await ctx2.newPage(); const errs2 = []; p2.on('pageerror', e => errs2.push(e.message.slice(0, 300)));
  await p2.goto(URL_); await enter(p2); await p2.evaluate(() => { go('models'); IngRooms.open('models', 'studio', true); IngStudio.open('train'); }); await p2.waitForTimeout(900);
  const sm = await p2.evaluate(() => ({ btns: [...document.querySelectorAll('#labCharsSize .seg-btn')].map(x => x.textContent + (x.disabled ? ' (off)' : '')).join(), why: document.querySelector('#labCharsSize .seg-btn:disabled') && document.querySelector('#labCharsSize .seg-btn:disabled').title, env: document.getElementById('labCharsEnv').textContent }));
  ok(sm.btns === 'Tiny,Small,Medium (off),Large (off)' && /more memory than this device has to spare/.test(sm.why) && /2 GB of memory/.test(sm.env), 'a device with 2 GB is offered Tiny and Small; Medium and Large are shown, off, with the reason', sm);
  // a lean copy (the Forge carries one): no picture reader, so no TensorFlow.js; the workbench says so and nothing breaks
  const lean = await p2.evaluate(async () => { const el = document.getElementById('ing-eyes'), had = !!el; if (el) el.remove(); go('models'); IngStudio.open('train'); await new Promise(r => setTimeout(r, 400));
    let msg = ''; try { await IngLab.chars.start({ text: 'The tide comes in twice a day. '.repeat(40), size: 'tiny', steps: 10 }); } catch (e) { msg = e.message; }
    document.getElementById('labCharsGo').click(); await new Promise(r => setTimeout(r, 800));
    return { had, carried: IngLab.engine.carried(), eng: document.getElementById('labEngine').textContent, msg, ui: document.getElementById('labCharsStatus').textContent, run: IngLab.run() }; });
  ok(lean.had && !lean.carried && /carries no TensorFlow\.js/.test(lean.eng) && /carries no TensorFlow\.js/.test(lean.msg) && lean.run === null, 'in a lean copy with no picture reader the workbench says it carries no TensorFlow.js, and no lesson starts', lean);
  ok(errs2.length === 0, 'no script errors on the small device either', errs2.join(' | '));
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
