// R113: Lector at a doctoral standard: the charter, the examiner's pass, the style check, and the model guidance in the brief.
// A stand-in model answers every ask, so the writer's own work can be checked without a real model.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 260) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  // the charter reaches the model
  const charter = await p.evaluate(() => { const s = document.documentElement.outerHTML; return { standard: /THE STANDARD\. Write as a doctoral candidate/.test(s), banned: /game-changing/.test(s) && /tapestry/.test(s) }; });
  ok(charter.standard && charter.banned, 'the doctoral charter and the banned words are in the page', JSON.stringify(charter));
  // a kept app, a finished reading, and two stand-in models: a 4B (chosen) and a 12B (stronger, ready)
  await p.evaluate(async () => {
    const page = '<!doctype html><html><head><meta charset="utf-8"><title>Carpe Diem</title></head><body><h1>Carpe Diem</h1><p>A day planner.</p><script>function a(){}</script></body></html>';
    const u8 = new TextEncoder().encode(page); await libPut('lib-cd-lx', u8, page);
    libState().apps.cd = { ref: 'lib-cd-lx', sha256: 'sha-cd-lx', version: '1051', title: 'carpe_diem.html', name: 'carpe_diem.html', size: u8.length, at: Date.now() };
    const L = ING_LINEUP.models;
    state.models = (state.models || []).filter(m => !/^mfake/.test(m.id));
    state.models.push({ id: 'mfake4', customName: 'Stand-in 4B', fileState: 'ready', fileName: L['qwen3.5-4b'].file, stored: true });
    state.models.push({ id: 'mfake12', customName: 'Stand-in 12B', fileState: 'ready', fileName: L['gemma-4-12b'].file, stored: true });
    const an = {}; ['In brief', 'Purpose and the person it serves', 'What it does', 'Design for focus and well-being', 'How it is built', 'Research and scholarly value', 'Skills it shows', 'How it was made', 'Limits and next steps'].forEach(k => an[k] = k + ': Carpe Diem is a day planner of 2,480 lines with 31 named functions, made alone over 14 months; its calm room and its three skies answer the needs of an AuDHD user.');
    const run = { id: 'lx_seed', name: 'Carpe Diem', app: 'cd', sha: 'sha-cd-lx', version: '1051', file: 'carpe_diem.html', kind: 'app', depth: 'overview', modelId: 'mfake4', created: Date.now() - 5000, updated: Date.now() - 1000, finished: Date.now() - 1000, status: 'done', done: 3, total: 3,
      facts: { title: 'Carpe Diem', chars: 182400, jsChars: 91000, functions: 31, headings: 12, sayings: 240, comments: 18, lines: 2480 }, partsRef: 'lx_seed_parts', notesRef: 'lx_seed_notes', mergeRef: 'lx_seed_merge', analysisRef: 'lx_seed_an', writings: {} };
    await IngBig.put('lx_seed_parts', JSON.stringify([{ i: 0 }, { i: 1 }, { i: 2 }])); await IngBig.put('lx_seed_notes', JSON.stringify(['a', 'b', 'c'])); await IngBig.put('lx_seed_an', JSON.stringify(an));
    const s = lxState(); s.runs = s.runs.filter(r => r.id !== 'lx_seed'); s.runs.unshift(run);
    state.lector7 = state.lector7 || {}; if (state.lx7) { state.lx7.job = null; }
    saveState();
    // the stand-in model: a draft with an American spelling, a contraction and an unsupported figure; the examiner strikes the figure
    window.__asks = [];
    lxAsk = function (run, msgs, maxTok, temp, onPiece) { const sys = msgs[0].content, u = msgs[1].content; window.__asks.push({ examiner: /examiner of a draft/.test(sys), charter: /THE STANDARD/.test(sys), max: maxTok });
      let out; if (/examiner of a draft/.test(sys)) { const d = u.split('THE DRAFT:\n')[1] || ''; out = d.replace(/ It won 9,999 awards\./, ''); }
      else out = 'Carpe Diem is a day planner of 2,480 lines with 31 named functions. I made it alone over 14 months, and its color scheme follows the sky. It won 9,999 awards. I don\'t think a planner needs more than this; the measures suggest that its three skies carry the day.';
      if (onPiece) onPiece(out); return Promise.resolve(out); };
  });
  await p.evaluate(() => go('lector')); await p.waitForTimeout(1500);
  // the brief: the model lines and the switches
  // 6.2: the model is chosen in How Lector reads, at the top of the brief (#l7HowModel)
  const brief = await p.evaluate(() => { const m = document.getElementById('l7Model'); const sel = document.getElementById('l7HowModel'); return { head: m.querySelector('b') && m.querySelector('b').textContent, metic: !!document.getElementById('l7Metic'), checked: document.getElementById('l7Metic') && document.getElementById('l7Metic').checked, options: sel ? [...sel.options].map(o => o.textContent) : [], stronger: (m.textContent.match(/A stronger model is ready[^.]*\./) || [''])[0] }; });
  ok(brief.metic && brief.checked, 'the brief has the Examine switch, on by default', JSON.stringify(brief));
  // choose the 4B by hand: the brief says a stronger one is ready, and one press takes it
  await p.evaluate(() => { const sel = document.getElementById('l7HowModel'); sel.value = 'mfake4'; sel.dispatchEvent(new Event('change')); }); await p.waitForTimeout(400);
  const strong = await p.evaluate(() => { const m = document.getElementById('l7Model'); const k = [...m.querySelectorAll('button')].find(x => /^Use Stand-in 12B/.test(x.textContent)); return { line: (m.textContent.match(/A stronger model is ready on [^:]+: Stand-in 12B\. For a doctoral standard, use it\./) || [''])[0], key: !!k }; });
  ok(/Stand-in 12B/.test(strong.line) && strong.key, 'with a weaker model chosen, the brief names the stronger one that is ready and offers it', JSON.stringify(strong));
  await p.evaluate(() => { [...document.querySelectorAll('#l7Model button')].find(x => /^Use Stand-in 12B/.test(x.textContent)).click(); }); await p.waitForTimeout(400);
  const after = await p.evaluate(() => ({ head: document.querySelector('#l7Model b').textContent, stronger: /A stronger model is ready/.test(document.getElementById('l7Model').textContent), est: (document.getElementById('l7Model').textContent.match(/About [^.]+\./) || [''])[0] }));
  ok(/Stand-in 12B/.test(after.head) && !after.stronger, 'one press: the stronger model is the writer, and the note goes', JSON.stringify(after));
  await p.screenshot({ path: OUT + '/lector-brief.png' });
  // the documents: a portfolio piece and a letter, for the portfolio
  await p.evaluate(() => { [...document.querySelectorAll('#l7Bf .l-seg button')].forEach(b => { if (b.dataset.v === 'portfolio') b.click(); }); });
  await p.waitForTimeout(300);
  await p.evaluate(() => { [...document.querySelectorAll('#l7Bf input[type=checkbox]')].forEach(c => { const t = c.parentNode.textContent; if (/Portfolio piece|Cover letter/.test(t)) { if (!c.checked) c.click(); } else if (/dossier|Appendix|CV entry/i.test(t) && c.checked && c.id !== 'l7Metic') c.click(); }); });
  await p.waitForTimeout(300);
  const docs = await p.evaluate(() => [...document.querySelectorAll('#l7Bf input[type=checkbox]:checked')].map(c => c.parentNode.textContent.trim().slice(0, 30)));
  const main = await p.evaluate(() => { const b = [...document.querySelectorAll('#l7BriefF button')].find(x => /Write the documents|Start reading/.test(x.textContent)); return b ? b.textContent : null; });
  ok(main === 'Write the documents', 'the reading is already done, so the main key offers to write', main + ' | ' + docs.join(' / '));
  await p.evaluate(() => { [...document.querySelectorAll('#l7BriefF button')].find(x => /Write the documents/.test(x.textContent)).click(); });
  await p.waitForFunction(() => { const c = document.getElementById('l7BriefChip'); return c && /Used for this set/.test(c.textContent); }, null, { timeout: 90000 }); await p.waitForTimeout(600);
  const asks = await p.evaluate(() => window.__asks);
  const drafts = asks.filter(a => !a.examiner).length, exams = asks.filter(a => a.examiner).length;
  ok(drafts === 5 && exams === 5 && asks.every(a => a.charter), 'every section (four of the piece, one letter) was drafted and then examined, each with the charter', 'drafts ' + drafts + ', examined ' + exams);
  const ev = await p.evaluate(() => { const s = document.getElementById('l7Stream'); const t = s ? s.innerText : ''; return t.split(/\n(?=\S)/).map(x => x.replace(/\s+/g, ' ').trim()).filter(x => /Examined|spelling|contraction|figure/.test(x)); });
  ok(ev.some(t => /Examined · What it is/.test(t)) && ev.some(t => /of the words were changed in the examiner's pass/.test(t)), 'the thinking panel shows each examiner\'s pass and what it changed', ev.slice(0, 2).join(' || '));
  ok(ev.some(t => /1 spelling set to British \(color → colour\)/.test(t)) && ev.some(t => /1 contraction/.test(t)), 'Ingenium\'s own check set the spelling right and named the contraction left', ev.filter(t => /spelling|contraction/.test(t)).slice(0, 1).join(''));
  ok(ev.some(t => /Every figure \(\d+\) was found/.test(t)), 'with the unsupported figure struck by the examiner, every figure left is found in the measures', ev.filter(t => /figure/.test(t)).slice(0, 1).join(''));
  const doc = await p.evaluate(() => { const d = document.getElementById('l7Desk'); const t = d ? d.innerText : ''; return { colour: /colour scheme/.test(t), color: /\bcolor\b/.test(t), awards: /9,999/.test(t), foot: /examined section by section against the material/.test(t) }; });
  // 6.1 took the closing line off every document (the owner's words: no watermarks), so no footer names the model or the examination
  ok(doc.colour && !doc.color && !doc.awards && !doc.foot, 'the document on the desk: British spelling, no invented figure, and no closing line', JSON.stringify(doc));
  await p.screenshot({ path: OUT + '/lector-done.png' });
  ok(errs.length === 0, 'no script errors', errs.join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
