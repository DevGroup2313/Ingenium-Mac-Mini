// node rig/t_703_studio.js <Ingenium page url> <out dir>
// Ingenium 6.9.x (31 October 2026), in Chromium. The owner's words: "I want to expand on the parameters of what Ingenium can do
// as a serious coding and creating workbench with and without AI. I want to be able to create and train all kinds of AI models,
// even Frontier level AI models inside of the app." (modules/r199.js: the Studio's rooms and its truth card)
//   - the Models page's Studio has rooms of its own, Make, Data, Train, Measure and Elsewhere, one shown at a time, with a
//     line saying what each holds; the existing cards are filed by id (Your own AIs and Convert in Make, Train a small model
//     in Train) and keep their ids and keys;
//   - "What can be trained here" reads the device (the app's facts when they are there: 16 GB, 8 cores) and says the bands in
//     plain words with the arithmetic and its sources: the memory rule's figure for this memory, "not measured above 135
//     million", the millions of years and the millions of dollars of frontier scale; no key anywhere says "frontier";
//   - in a browser the card says it reads a hint, or that the browser does not say;
//   - a card in a closed room opens its room when it is scrolled to, focused, revealed, rung by the tour or shown by Help;
//   - the keyboard moves between the rooms; the room chosen last is kept across a reload;
//   - Measure says what perplexity needs when the app lacks the tool, and offers it when the bridge has it;
//   - at a phone's width nothing overflows; every part of the page ran; no script errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  // the computer app's facts and its trainer, stood in for
  await p.evaluate(() => { window.__INGENIUM_DEVICE = { ramGB: 16, cores: 8 };
    const api = { train_available: () => ({ ok: true, trainer: true, cores: 8 }), train_status: () => ({ state: 'idle' }), train_bases: () => ({ ok: true, ramGB: 16, models: [] }), train_start: () => ({ ok: false, error: 'stand-in' }), train_cancel: () => ({ ok: true }) };
    window.trainApi = () => api; go('models'); IngRooms.open('models', 'studio', true); IngStudio.refresh(); });
  await p.waitForTimeout(900);
  const rooms = await p.evaluate(() => ({ list: IngStudio.rooms(), cur: IngStudio.current(), tabs: [...document.querySelectorAll('#stTabs .st-tab')].map(t => t.textContent.trim() + (t.hidden ? ' (hidden)' : '')),
    says: document.getElementById('stSays').textContent, studioTab: !document.getElementById('rmT-models-studio').hidden, pageRoom: IngRooms.current('models'),
    role: document.getElementById('stTabs').getAttribute('role'), label: document.getElementById('stTabs').getAttribute('aria-label') }));
  ok(rooms.list.map(r => r.key).join() === 'make,data,train,measure,elsewhere' && rooms.tabs.filter(t => !/hidden/.test(t)).length >= 4 && rooms.studioTab && rooms.pageRoom === 'studio' && rooms.role === 'tablist',
    "the Studio has its own rooms, Make, Data, Train, Measure and Elsewhere (WAI-ARIA tabs), under the page's Studio tab", rooms);
  ok(rooms.list.every(r => r.shown), 'every room holds a card and shows its tab (Data and the workbench come with r200 and r201)', rooms.tabs);
  const filed = await p.evaluate(() => { const r = id => { const e = document.getElementById(id); return e ? (IngStudio.roomOf(e) || 'loose') : 'missing'; };
    return { ai: r('aiCard'), conv: r('convCard'), train: r('trainCard'), truth: r('ingTruthCard'), measure: r('ingMeasureCard'), elsewhere: r('ingElsewhereCard'), data: r('ingDataCard'), lab: r('ingLabCard'),
      keys: !!(document.getElementById('aiNew') && document.getElementById('convChoose') && document.getElementById('trainBody')) }; });
  ok(filed.ai === 'make' && filed.conv === 'make' && filed.train === 'train' && filed.truth === 'train' && filed.measure === 'measure' && filed.elsewhere === 'elsewhere' && filed.keys,
    'the cards are filed by id and keep their keys: Your own AIs and Convert in Make, Train a small model and the truth card in Train, Measure and Elsewhere in theirs', filed);
  ok(filed.data === 'data' && filed.lab === 'train', 'the datasets card is in Data and the learning workbench in Train', { data: filed.data, lab: filed.lab });
  const one = await p.evaluate(() => { const vis = id => { const e = document.getElementById(id); return !!e && e.getBoundingClientRect().height > 0; };
    document.getElementById('stT-make').click(); const a = { cur: IngStudio.current(), ai: vis('aiCard'), train: vis('trainCard'), truth: vis('ingTruthCard') };
    document.getElementById('stT-train').click(); if (window.IngTrain) IngTrain.part('overview'); const t = { cur: IngStudio.current(), ai: vis('aiCard'), truth: vis('ingTruthCard'), says: document.getElementById('stSays').textContent };
    if (window.IngTrain) IngTrain.part('trainer'); t.train = vis('trainCard'); if (window.IngTrain) IngTrain.part('overview');
    return { a, t }; });
  ok(one.a.cur === 'make' && one.a.ai && !one.a.train && !one.a.truth && one.t.cur === 'train' && one.t.train && one.t.truth && !one.t.ai && /Training here/.test(one.t.says),
    'one room at a time: Make shows Your own AIs and hides the trainer; Train shows the truth card and the trainer and hides Your own AIs; the line says what the room holds', one);
  await p.screenshot({ path: OUT + '/studio_train.png', fullPage: false });
  // the truth card
  const truth = await p.evaluate(() => { const c = document.getElementById('ingTruthCard'); const d = c.querySelector('details.tr-math'); if (d) d.open = true; const t = c.textContent.replace(/\s+/g, ' '); return { h: c.querySelector('h2').textContent, dev: c.querySelector('#ingTruthDev').textContent,
    bands: [...c.querySelectorAll('.tr-band')].map(x => x.getAttribute('data-band') + ':' + x.querySelector('.tr-tag').textContent), text: t,
    has: { mem: /16 GB of memory/.test(t), cores: /8 processor cores/.test(t), trainer: /trainer \(llama-finetune\) is here/.test(t), rule: /about 660 million numbers/.test(t), notMeasured: /Not measured above 135 million/.test(t), note24: /1B model needs about 24 GB/.test(t),
      years: /about 2\d million years/.test(t), dollars: /US\$5\.6 million/.test(t), gpus: /16,384/.test(t), flops: /3\.8 × 10\^25/.test(t), chinchilla: /20 pieces of text a number/.test(t), tb: /6\.5 TB/.test(t), days: /about 5\d days and 3 GB of text/.test(t), yearhalf: /a year and a half here/.test(t),
      lora: /graphics chip the trainer can use, or a rented machine/.test(t), kind: /not a shortcoming of your computer/.test(t), sources: /Llama 3 Herd of Models/.test(c.textContent) && /DeepSeek-V3 Technical Report/.test(c.textContent) && /Hoffmann/.test(c.textContent) && /train_sizes\.txt/.test(c.textContent) && /examples\/training/.test(c.textContent) },
    bands4: c.querySelectorAll('.tr-band').length, frontierKey: [...document.querySelectorAll('button, a, [role=button]')].filter(x => !x.closest('#ingTruthBands')).some(x => /frontier/i.test(x.textContent || '')), bandsApi: IngStudio.bands().map(b => b.k), fits: Math.round(IngStudio.fits(16) / 1e7) }; });
  ok(truth.h === 'What can be trained here' && truth.bands.join() === 'small:Here,further:On this computer,lora:Not yet,frontier:Not at home', 'the truth card names four bands: here, on this computer, not yet, not at home', truth.bands);
  ok(truth.has.mem && truth.has.cores && truth.has.trainer, "it reads the computer's own facts: 16 GB of memory, 8 processor cores, the trainer present", truth.dev);
  ok(truth.has.rule && truth.has.notMeasured && truth.has.note24 && truth.fits === 66, 'the memory rule gives about 660 million numbers for 16 GB, said as not measured above 135 million, with llama.cpp\'s 24 GB note', { rule: truth.has.rule, nm: truth.has.notMeasured, n24: truth.has.note24, fits: truth.fits });
  ok(truth.has.years && truth.has.dollars && truth.has.gpus && truth.has.flops && truth.has.tb && truth.has.chinchilla && truth.has.yearhalf && truth.has.days,
    'frontier scale in figures: 3.8 × 10^25 operations, 16,384 chips, tens of millions of years here, 6.5 TB of training state, US$5.6 million; a 135M model from zero a year and a half, Large about 50 days and 3 GB of text', truth.has);
  ok(truth.has.lora && truth.has.kind && truth.has.sources, 'LoRA needs a graphics chip or a rented machine (not yet); the words stay kind; the sources are named (Meta, DeepSeek, Hoffmann, llama.cpp, train_sizes.txt)', truth.has);
  ok(!truth.frontierKey, 'no key anywhere on the page says "frontier"');
  await p.screenshot({ path: OUT + '/truth_card.png', fullPage: false });
  // a browser without the app's facts: a hint, or nothing reported
  const browser = await p.evaluate(() => { const keep = window.__INGENIUM_DEVICE; delete window.__INGENIUM_DEVICE; const ta = window.trainApi; window.trainApi = () => null; IngStudio.refresh();
    const t = document.getElementById('ingTruthCard').textContent.replace(/\s+/g, ' '); const d = IngStudio.device(); window.__INGENIUM_DEVICE = keep; window.trainApi = ta; IngStudio.refresh();
    return { kind: d.kind, mem: d.memGB, text: document.getElementById('ingTruthDev') && t.slice(0, 400), browserWords: /This browser/.test(t) && (/a browser's hint/.test(t) || /memory not reported by this browser/.test(t)), further: /runs in the Ingenium app on a Mac or Windows computer/.test(t), lab: /trains a character model in this very page/.test(t) }; });
  ok(browser.kind === 'browser' && browser.browserWords && browser.further && browser.lab, 'in a browser the card says it reads a hint (or that the browser does not say), that the trainer runs on a computer and that the workbench trains here', browser);
  // a card in a closed room opens its room: scrolled to, focused, revealed, rung by the tour, shown by Help
  const reveal = await p.evaluate(async () => { const out = {};
    document.getElementById('stT-make').click(); document.getElementById('trainCard').scrollIntoView(); out.scroll = IngStudio.current();
    document.getElementById('stT-make').click(); document.getElementById('ingMeasureH').setAttribute('tabindex', '-1'); document.getElementById('ingMeasureH').focus(); out.focus = IngStudio.current();
    document.getElementById('stT-make').click(); IngRooms.reveal(document.getElementById('ingElsewhereCard'), { scroll: false }); out.reveal = IngStudio.current();
    document.getElementById('stT-make').click(); document.querySelector('#rmT-models-yours').click(); const i = ING_TOUR.findIndex(s => s.ring === '#trainCard'); tourJump(i); await new Promise(r => setTimeout(r, 1800));
    const n = document.querySelector('.tour-ring'); out.tour = { i, page: IngRooms.current('models'), room: IngStudio.current(), ring: n && n.id, seen: !!n && n.getBoundingClientRect().height > 0 };
    try { tourEnd(); } catch (e) { try { tourStop(); } catch (_) { } } try { closeModal(); } catch (e) { }
    document.getElementById('stT-train').click(); document.querySelector('#rmT-models-yours').click(); IngHelp.open('models'); await new Promise(r => setTimeout(r, 400));
    const k = [...document.querySelectorAll('#ihPanel button')].find(x => /Your own AIs|Build your own AI/i.test(x.getAttribute('aria-label') || '') && x.querySelector('.ih-show')); if (k) k.click(); await new Promise(r => setTimeout(r, 800));
    out.help = { found: !!k, page: IngRooms.current('models'), room: IngStudio.current(), ring: !!document.querySelector('#aiCard.ih-ring') }; try { IngHelp.close(); } catch (e) { }
    return out; });
  ok(reveal.scroll === 'train' && reveal.focus === 'measure' && reveal.reveal === 'elsewhere', 'scrollIntoView, focus and IngRooms.reveal open the room of the card they reach (Train, Measure, Elsewhere)', reveal);
  ok(reveal.tour.i >= 0 && reveal.tour.page === 'studio' && reveal.tour.room === 'train' && reveal.tour.ring === 'trainCard' && reveal.tour.seen, "the guided tour's Train a small model card opens the Studio and its Train room, and rings the card", reveal.tour);
  ok(reveal.help.found && reveal.help.page === 'studio' && reveal.help.room === 'make' && reveal.help.ring, "Help's Show me for Your own AIs opens the Studio's Make room and rings the card", reveal.help);
  // Help lists what the Studio gained, and Show me opens the room and rings the card
  const hl = await p.evaluate(async () => { const out = {};
    for (const [lab, room, sel] of [['Train a small model in the page', 'train', '#ingLabCard'], ['Make a dataset from your own work', 'data', '#ingDataCard'], ['See what can be trained here', 'train', '#ingTruthCard']]) {
      document.getElementById('stT-make').click(); document.querySelector('#rmT-models-yours').click(); IngHelp.open('models'); await new Promise(r => setTimeout(r, 300));
      const k = [...document.querySelectorAll('#ihPanel button')].find(x => (x.getAttribute('aria-label') || '').indexOf(lab + '.') === 0 && x.querySelector('.ih-show')); if (k) k.click(); await new Promise(r => setTimeout(r, 800));
      out[lab] = { found: !!k, page: IngRooms.current('models'), room: IngStudio.current(), want: room, ring: !!document.querySelector(sel + '.ih-ring') }; try { IngHelp.close(); } catch (e) { } }
    return out; });
  ok(Object.values(hl).every(x => x.found && x.page === 'studio' && x.room === x.want && x.ring), "Help lists the workbench, the datasets and what can be trained here; Show me opens the Studio's room and rings the card", hl);
  // her word (31 October 2026): "limit the button of Back to Ingenium's choice for this computer to only the text, I don't like the long raised line look"
  const bk = await p.evaluate(async () => { const keep = window.lineupDevice; window.lineupDevice = () => 'desktop'; try { go('models'); await new Promise(r => setTimeout(r, 500));
      const ks = IngR105.list(); state.tierPick = { faber: ks[ks.length - 1] }; renderLineup(); await new Promise(r => setTimeout(r, 500));
      const t = document.querySelector('.lu-tile[data-tier="faber"]'); IngRooms.reveal(t, { scroll: false }); await new Promise(r => setTimeout(r, 300));
      const k = [...document.querySelectorAll('.lu-coders > button')].find(x => /Back to Ingenium/.test(x.textContent)); const r = k && k.getBoundingClientRect(), cs = k && getComputedStyle(k), tr = document.querySelector('.lu-coders').getBoundingClientRect();
      const g = k && document.createRange(); if (g) g.selectNodeContents(k);
      return k ? { text: k.textContent, w: Math.round(r.width), h: Math.round(r.height), box: Math.round(tr.width), words: Math.round(g.getBoundingClientRect().width), shadow: cs.boxShadow, justify: cs.justifySelf, bg: cs.backgroundImage, bgc: cs.backgroundColor, weight: +cs.fontWeight, arrow: getComputedStyle(k, '::before').content } : null;
    } finally { delete state.tierPick; window.lineupDevice = keep; try { renderLineup(); } catch (e) { } } });
  ok(bk && bk.text === "Back to Ingenium's choice for this computer" && bk.w <= bk.words + 34 && bk.w < bk.box - 40 && bk.h < 40 && bk.shadow === 'none' && bk.bg === 'none' && bk.bgc === 'rgba(0, 0, 0, 0)' && bk.justify === 'start' && bk.weight >= 700 && /21BA|↺/.test(bk.arrow), "the way back to Ingenium's choice is a line of text the width of its words, purple and bold with a return mark, not a raised line across the tile (6.9.2 and 6.9.3)", bk);
  // the keyboard, and the room kept across a reload
  await p.evaluate(() => { try { closeModal(); } catch (e) { } go('models'); IngRooms.open('models', 'studio', true); document.getElementById('stT-make').click(); document.getElementById('stT-make').focus(); });
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200); const k1 = await p.evaluate(() => ({ cur: IngStudio.current(), focus: document.activeElement.id }));
  await p.keyboard.press('End'); await p.waitForTimeout(200); const k2 = await p.evaluate(() => ({ cur: IngStudio.current(), focus: document.activeElement.id }));
  ok(k1.cur === 'data' && k1.focus === 'stT-data' && k2.cur === 'elsewhere' && k2.focus === 'stT-elsewhere', 'the arrow keys and End move between the rooms and move the focus with them', { k1, k2 });
  await p.evaluate(() => document.getElementById('stT-measure').click()); await p.waitForTimeout(200);
  await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); go('models'); }); await p.waitForTimeout(1200);
  const kept = await p.evaluate(() => ({ page: IngRooms.current('models'), room: IngStudio.current() }));
  ok(kept.page === 'studio' && kept.room === 'measure', 'after a reload the Models page opens on the Studio and the Studio on the room chosen last (Measure)', kept);
  // Measure: perplexity needs the tool; Elsewhere's keys
  const ms = await p.evaluate(async () => { const wait = t => new Promise(r => setTimeout(r, t)); window.trainApi = () => null; IngStudio.refresh(); const a = document.getElementById('ingMeasureList').innerText;
    const base = { train_status: () => ({ state: 'idle' }), train_start: () => ({ ok: true }), train_cancel: () => ({ ok: true }) };
    // the newer side is there but the program is not carried: said as not carried, and nothing offered
    window.trainApi = () => Object.assign({ train_available: () => ({ ok: true, trainer: true, cores: 8, perplexity: false }), train_perplexity: () => ({ ok: false }) }, base); IngStudio.refresh(); await wait(200);
    const a2 = document.getElementById('ingMeasureList').innerText, off = !document.getElementById('msRun');
    window.trainApi = () => Object.assign({ train_available: () => ({ ok: true, trainer: true, cores: 8, perplexity: true }), train_perplexity: () => ({ ok: true }), train_text_put: () => ({ ok: true }), train_perplexity_status: () => ({ state: 'idle' }), train_perplexity_cancel: () => ({ ok: true }) }, base); IngStudio.refresh(); await wait(300);
    const b2 = document.getElementById('ingMeasureList').innerText, on = !!document.getElementById('msRun'); window.trainApi = () => null; IngStudio.refresh(); await wait(100); const gone = !document.getElementById('msRun');
    return { without: /does not carry/.test(a) && /not offered here until the app carries the tool/.test(a), missing: /does not carry/.test(a2) && off, with: /can measure a model's perplexity on a held-back text/.test(b2) && on && gone, honest: /A lower loss is not quality/.test(a) && /does not converse/.test(a) }; });
  ok(ms.without && ms.missing && ms.with && ms.honest, 'Measure says perplexity needs llama-perplexity (not in this copy, or not carried by the app), offers it only when the app says it carries it, and says what the figures do not say', ms);
  const mr = await p.evaluate(async () => { const wait = t => new Promise(r => setTimeout(r, t)); const log = { put: [], asked: [], cancel: 0 }; let n = 0;
    const api = { train_available: () => ({ ok: true, trainer: true, cores: 8, perplexity: true }), train_status: () => ({ state: 'idle' }), train_start: () => ({ ok: true }), train_cancel: () => ({ ok: true }),
      train_text_put: (c, first) => { log.put.push([c.length, !!first]); return { ok: true, path: '/p' }; }, train_perplexity: id => { log.asked.push(id); n = 0; return { ok: true, chars: 2640 }; },
      train_perplexity_status: () => (++n < 3 ? { state: 'running', elapsed: n } : { state: 'done', ppl: 21.68, err: 1.01, chars: 2640, seconds: 3.2 }), train_perplexity_cancel: () => { log.cancel++; return { ok: true }; } };
    window.trainApi = () => api; state.models.push({ id: 'mtest', fileName: 'trained-1.gguf', customName: 'My tide model', fileState: 'ready', sizeBytes: 1e6 });
    document.getElementById('stT-measure').click(); IngStudio.refresh(); await wait(400);
    const opts = [...document.querySelectorAll('#msModel option')].map(o => o.textContent + '=' + o.value); document.getElementById('msModel').value = 'mtest';
    document.getElementById('msGo').click(); await wait(300); const none = document.getElementById('msOut').textContent;
    document.getElementById('msPaste').value = 'too short'; document.getElementById('msGo').click(); await wait(300); const shortSay = document.getElementById('msOut').textContent;
    document.getElementById('msPaste').value = 'The tide comes in twice a day, and the gulls know it before we do. '.repeat(40); document.getElementById('msGo').click();
    await wait(1500); const running = document.getElementById('msOut').textContent, stopShown = !document.getElementById('msStop').hidden;
    await wait(3500); const done = document.getElementById('msOut').textContent;
    state.models = state.models.filter(m => m.id !== 'mtest'); window.trainApi = () => null; IngStudio.refresh();
    return { opts, none, shortSay, running, stopShown, done, put: log.put, asked: log.asked, stopHidden: !!(document.getElementById('msStop') || { hidden: true }).hidden }; });
  ok(mr.opts.indexOf('My tide model=mtest') >= 0 && /Choose a model first|needs about 1,500/.test(mr.none + mr.shortSay) && /needs about 1,500 characters of text or more \(this has 9\)/.test(mr.shortSay) && /^Measuring/.test(mr.running) && mr.stopShown && /^Perplexity 21\.68 \(± 1\.01\) on 2,640 characters, in 3\.2 s\. Lower is better/.test(mr.done) && /does not say whether an answer is true/.test(mr.done) && mr.put.length === 1 && mr.put[0][1] === true && mr.asked.join() === 'mtest' && mr.stopHidden,
    'Measure a model: the model and the text are chosen (a dataset\'s held-back part, or a pasted text), a text too short is refused, the text is handed to the app, the figure is shown with what it does and does not say', mr);
  const ew = await p.evaluate(() => { document.getElementById('stT-elsewhere').click(); const t = document.getElementById('ingElsewhereCard').innerText;
    [...document.querySelectorAll('#ingElsewhereCard button')].find(x => x.textContent === 'Convert a model').click(); const r1 = IngStudio.current();
    document.getElementById('stT-elsewhere').click(); [...document.querySelectorAll('#ingElsewhereCard button')].find(x => x.textContent === 'What can be trained here').click(); const r2 = IngStudio.current();
    return { r1, r2, words: /not possible here yet/.test(t) && /nothing here promises a date/.test(t) && /Nothing in Ingenium sends your text/.test(t) }; });
  ok(ew.r1 === 'make' && ew.r2 === 'train' && ew.words, 'Elsewhere says what needs another machine, promises no date, and its keys open Make (Convert) and Train (the truth card)', ew);
  // a phone's width: nothing overflows
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(500);
  const narrow = await p.evaluate(() => { document.getElementById('stT-train').click(); return { sw: document.documentElement.scrollWidth, iw: window.innerWidth, tabs: [...document.querySelectorAll('#stTabs .st-tab')].filter(t => !t.hidden && t.getBoundingClientRect().height > 0).length, bandCols: getComputedStyle(document.getElementById('ingTruthBands')).gridTemplateColumns.split(' ').length }; });
  ok(narrow.sw <= narrow.iw + 1 && narrow.tabs >= 4 && narrow.bandCols === 1, "at a phone's width the tabs wrap, the bands stack and nothing overflows", narrow);
  await p.screenshot({ path: OUT + '/studio_phone.png' });
  const parts = await p.evaluate(() => Object.keys(window.__ingParts).filter(k => window.__ingParts[k] !== 'running'));
  ok(parts.length === 0, 'every part of the page ran to its end', parts);
  ok(errs.length === 0, 'no script errors on the page', errs.join(' | '));
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
