// Ingenium 7.82: Lector's recipe (modules/r108.js). Her words (24 November 2026): each document written for its audience, in the first
// person, formal, clear, with no jargon, no leaked reasoning and no invented citations, starting from the drafts she approved. A stand-in
// model answers every ask with the faults a small model makes: its thinking, a preamble, a citation that is none of hers, a note on its work.
//   node rig/t_782_lector_recipe.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2), URL_ = args.find(a => /^https?:\/\//.test(a)), OUT = args.find(a => !/^https?:\/\//.test(a)) || '/tmp';
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngLector, null, { timeout: 600000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.waitForTimeout(800);
  // 1. the reader: the voice follows the purpose
  const sys = await p.evaluate(() => { const R = IngLector.recipe; return { prog: R.system({ purpose: 'programme', apps: ['cd'] }), job: R.system({ purpose: 'job', apps: ['cd'] }), port: R.system({ purpose: 'portfolio', apps: ['cd'] }) }; });
  ok(/Oxford or Cambridge doctoral application/.test(sys.prog) && /THE STANDARD\. Write as a doctoral candidate/.test(sys.prog), 'a programme is written to the doctoral standard, as before', sys.prog.slice(0, 300));
  ok(!/doctoral/.test(sys.job) && /hiring manager outside software/.test(sys.job) && /THE READER\. This document is read by the person hiring for the post/.test(sys.job), 'a post is written for the person hiring: professional, plain, the result first', sys.job.slice(0, 400));
  ok(!/doctoral/.test(sys.port) && /no training in software/.test(sys.port), 'her portfolio is written for a reader with no training in software', sys.port.slice(0, 400));
  ok([sys.prog, sys.job, sys.port].every(s => /in the first person as her/.test(s) && /PLAIN WORDS\. Explain a technical term in plain words/.test(s) && /Never invent a fact/.test(s)), 'every reader: the first person, plain words, nothing invented');
  // 2. no leaked reasoning, 3. no invented citations (the pure parts)
  const u = await p.evaluate(() => { const R = IngLector.recipe, T = 'Carpe Diem keeps the day in view.\nIt holds four rooms.'; return {
    a: R.clean('<think>I should plan.</think>Here is the revised section:\n\n' + T + '\n\n---\nNote: I kept her placeholders.') === T,
    b: R.clean('The user wants a section.</think>\n' + T) === T, c: R.clean(T + '\n<think>Now the word count') === T,
    d: R.clean('I have built four apps on my own.\nEach one answers a need.') === 'I have built four apps on my own.\nEach one answers a need.',
    e: R.cites('Time slips [1]. Focus fails [3] (Jones et al., 2021). It began (March 2024).', { sources: [{ n: 1, text: 'Smith, J. (2019) Attention and Time.' }] }) };
  });
  ok(u.a && u.b && u.c, "the model's thinking, its preamble and its notes never reach the page (a whole block, one cut off, one without its opening tag)", u);
  ok(u.d, 'her own first-person opening ("I have built...") stays', u);
  ok(u.e.text === 'Time slips [1]. Focus fails. It began (March 2024).' && u.e.gone === 2, 'a citation that is none of her sources is taken out; her own and a plain date stay', u.e);
  // 4. her approved draft, and a whole portfolio written by a stand-in model with a small model's faults
  await p.evaluate(async () => {
    const page = '<!doctype html><html><head><meta charset="utf-8"><title>Carpe Diem</title></head><body><h1>Carpe Diem</h1><p>A day planner.</p><script>function a(){}</script></body></html>';
    const u8 = new TextEncoder().encode(page); await libPut('lib-cd-lx', u8, page);
    libState().apps.cd = { ref: 'lib-cd-lx', sha256: 'sha-cd-lx', version: '1051', title: 'carpe_diem.html', name: 'carpe_diem.html', size: u8.length, at: Date.now() };
    const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^mfake/.test(m.id));
    state.models.push({ id: 'mfake12', customName: 'Stand-in 12B', fileState: 'ready', fileName: L['gemma-4-12b'].file, stored: true });
    const an = {}; ['In brief', 'Purpose and the person it serves', 'What it does', 'Design for focus and well-being', 'How it is built', 'Research and scholarly value', 'Skills it shows', 'How it was made', 'Limits and next steps'].forEach(k => an[k] = k + ': Carpe Diem is a day planner of 2,480 lines with 31 named functions; its calm room answers the needs of an AuDHD user.');
    const run = { id: 'lx_seed', name: 'Carpe Diem', app: 'cd', sha: 'sha-cd-lx', version: '1051', file: 'carpe_diem.html', kind: 'app', depth: 'overview', modelId: 'mfake12', created: Date.now() - 5000, updated: Date.now() - 1000, finished: Date.now() - 1000, status: 'done', done: 3, total: 3,
      facts: { title: 'Carpe Diem', chars: 182400, jsChars: 91000, functions: 31, headings: 12, sayings: 240, comments: 18, lines: 2480 }, partsRef: 'lx_seed_parts', notesRef: 'lx_seed_notes', mergeRef: 'lx_seed_merge', analysisRef: 'lx_seed_an', writings: {} };
    await IngBig.put('lx_seed_parts', JSON.stringify([{ i: 0 }, { i: 1 }, { i: 2 }])); await IngBig.put('lx_seed_notes', JSON.stringify(['a', 'b', 'c'])); await IngBig.put('lx_seed_an', JSON.stringify(an));
    const s = lxState(); s.runs = s.runs.filter(r => r.id !== 'lx_seed'); s.runs.unshift(run);
    // her approved summary of Carpe Diem, kept in the recipe (r126), and an older one for another app
    await IngBig.put('rd_cd', '## What it is\nCarpe Diem is my day planner; it keeps the day in view, in four quiet rooms.\n\n## How it was made\nI built it alone, over long evenings.');
    await IngBig.put('rd_ink', '## What it is\nInkwell is my writing desk.');
    if (!state.recipe) state.recipe = {}; state.recipe.docs = [{ id: 'rd1', name: 'Carpe Diem summary.docx', ref: 'rd_cd', bin: null, chars: 120, at: Date.now() - 9000, tpl: 'summary-cd', ver: [], found: null },
      { id: 'rd2', name: 'Inkwell summary.docx', ref: 'rd_ink', bin: null, chars: 40, at: Date.now(), tpl: 'summary-ink', ver: [], found: null }];
    saveState();
    window.__asks = [];
    lxAsk = function (run, msgs, maxTok, temp, onPiece) { const sys = msgs[0].content, u = msgs[msgs.length - 1].content; window.__asks.push({ examiner: /examiner of a draft/.test(sys), s: sys, u: u.slice(0, 9000) });
      let out; if (/examiner of a draft/.test(sys)) out = 'Revised text:\n' + (u.split('THE DRAFT:\n')[1] || '') + '\n\nChanges made:\n- kept her words';
      // her 7.71 sample: a 12B thinking model gave its working as the whole of "How it was made"
      else if (/Write only the finished text now/.test(u)) out = 'I built Carpe Diem alone, in numbered revisions recorded in its code.';
      else if (/^Write the section "How it was made"/.test(u)) out = 'The notes contain information about how Carpe Diem was made. I need to extract evidence of the process: iterations, revisions, testing. The facts mention "Author\'s notes in the code: 18".';
      else out = '<think>I should plan the section first and count the words.</think>\nHere is the section:\n\nCarpe Diem keeps the day in view for me [7], as research on attention shows (Jones, 2020). It is a day planner of 2,480 lines with 31 named functions.\n\n---\nNote: I kept the figures from the material.';
      if (onPiece) onPiece(out); return Promise.resolve(out); };
  });
  await p.evaluate(() => go('lector')); await p.waitForTimeout(1500);
  await p.evaluate(() => { const sel = document.getElementById('l7HowModel'); if (sel) { sel.value = 'mfake12'; sel.dispatchEvent(new Event('change')); } }); await p.waitForTimeout(300);
  await p.evaluate(() => { [...document.querySelectorAll('#l7Bf .l-seg button')].forEach(b => { if (b.dataset.v === 'portfolio') b.click(); }); }); await p.waitForTimeout(300);
  await p.evaluate(() => { [...document.querySelectorAll('#l7Bf input[type=checkbox]')].forEach(c => { const t = c.parentNode.textContent; if (/Portfolio piece|Cover letter/.test(t)) { if (!c.checked) c.click(); } else if (/dossier|Appendix|CV entry/i.test(t) && c.checked && c.id !== 'l7Metic') c.click(); }); }); await p.waitForTimeout(300);
  await p.evaluate(() => { [...document.querySelectorAll('#l7BriefF button')].find(x => /Write the documents/.test(x.textContent)).click(); });
  await p.waitForFunction(() => { const c = document.getElementById('l7BriefChip'); return c && /Used for this set/.test(c.textContent); }, null, { timeout: 120000 }); await p.waitForTimeout(800);
  const asks = await p.evaluate(() => window.__asks);
  const piece = asks.filter(a => !a.examiner && /Portfolio piece|portfolio piece/i.test(a.u) && !/cover letter/i.test(a.u.slice(0, 200)));
  const first = asks.find(a => !a.examiner && /THE APPROVED DRAFT/.test(a.u));
  ok(first && /THE APPROVED DRAFT \(Carpe Diem summary\.docx\)\. Start from it: keep its words, its order and its paragraphs wherever they are still true/.test(first.u), 'the portfolio piece starts from her approved summary of the same app (not the newer one of another app)', first ? first.u.slice(0, 300) : asks.length);
  const part = a => (a.u.split('THE APPROVED DRAFT')[1] || '').split('\n\n')[0];
  const what = asks.find(a => !a.examiner && /^Write|section "What it is"|What it is/.test(a.u) && /in four quiet rooms/.test(part(a))), made = asks.find(a => !a.examiner && /over long evenings/.test(part(a)));
  ok(what && !/over long evenings/.test(part(what)) && made && !/four quiet rooms/.test(part(made)), 'each section is given the matching part of her draft ("What it is" gets her "What it is", "How it was made" hers)', { what: what && part(what).slice(0, 300), made: made && part(made).slice(0, 300) });
  ok(asks.filter(a => !a.examiner).every(a => /no training in software/.test(a.s) && !/doctoral application/.test(a.s)) && asks.filter(a => a.examiner).every(a => /a careful editor for a reader with no training in software would/.test(a.u)), 'every ask for her portfolio is for its reader: the writer and the examiner', asks.filter(a => a.examiner).slice(0, 1).map(a => a.u.slice(0, 260)));
  const ev = await p.evaluate(() => { const s = document.getElementById('l7Stream'); return s ? s.innerText : ''; });
  ok(/Starts from your approved draft/.test(ev) && /Carpe Diem summary\.docx: its words, order and paragraphs are kept/.test(ev), 'the thinking panel says which of her drafts it started from', ev.slice(0, 300));
  ok(/1 citation was not among your sources and was taken out/.test(ev) || /2 citations were not among your sources and were taken out/.test(ev), 'the thinking panel says a citation that is none of hers was taken out', (ev.match(/Sources[^\n]*\n?[^\n]*/) || [''])[0]);
  // every document written in this set (the desk shows one at a time), and the one on the desk
  const doc = await p.evaluate(() => { const d = document.getElementById('l7Desk'), M = (IngLector.R7 && IngLector.R7.docMd) || {}; return Object.keys(M).map(k => M[k]).join('\n\n') + '\n\n' + (d ? d.innerText : ''); });
  const kinds = await p.evaluate(() => Object.keys((IngLector.R7 && IngLector.R7.docMd) || {}));
  ok(kinds.indexOf('portfolio') >= 0 && kinds.indexOf('cover') >= 0 && /keeps the day in view/.test(doc) && /2,480 lines/.test(doc), 'the portfolio piece and the letter are written', { kinds, doc: doc.slice(0, 300) });
  ok(!/<think>|I should plan|Here is the section|Revised text|Changes made|kept her words|Note: I kept/.test(doc), "and none of the model's thinking, preambles or notes", doc.slice(0, 500));
  ok(!/\[7\]|Jones/.test(doc), 'and no citation that is none of hers', (doc.match(/.{0,60}(\[7\]|Jones).{0,40}/) || [''])[0]);
  ok(!/I need to extract|The facts mention|The notes contain information/.test(doc) && /I built Carpe Diem alone, in numbered revisions/.test(doc) && /The model gave only its working, not the section; Lector asked once more/.test(ev),
    'her 7.71 fault: a section that was only the model\'s working is asked for again, and the finished text takes its place', { ev: (ev.match(/[^\n]*only its working[^\n]*/) || [''])[0], doc: (doc.match(/How it was made[\s\S]{0,200}/) || [''])[0] });
  await p.screenshot({ path: OUT + '/lector_recipe.png' });
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
