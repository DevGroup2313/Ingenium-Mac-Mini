// R117: the studio, cared for. Blend's Judge strategy and ready-made blends, the tour's new chapters, the export with
// Lector's documents and Fabrica's repositories, the shelf's account, and quiet asides in a focus session.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  const parts = await p.evaluate(() => window.__ingParts);
  ok(parts.p48 === 'running' && parts.p47 === 'running', 'the studio part (p48) runs', JSON.stringify({ p47: parts.p47, p48: parts.p48 }));

  // house records on a 16 GB stand-in computer, runnable for the test
  await p.evaluate(() => { window.__INGENIUM_DEVICE = { ramGB: 16, cores: 8 }; const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^hs_/.test(m.id));
    [['hs_velox', 'lfm2.5-1.2b-instruct', 'Velox copy'], ['hs_scriba', 'qwen3.5-2b', 'Scriba copy'], ['hs_magister', 'qwen3.5-9b', 'Magister copy'], ['hs_faber', 'mellum2.1-12b-thinking', 'Faber copy']].forEach(x => {
      state.models.push({ id: x[0], customName: x[2], fileState: 'ready', fileName: L[x[1]].file, sizeBytes: L[x[1]].size, paramB: L[x[1]].params, stored: true, shellStored: true, type: 'GGUF', color: '#6a3fb5' }); });
    blCanRun = () => true; saveState(); });

  // 1. the Judge strategy and the ready-made blends
  await p.evaluate(() => go('blend')); await p.waitForTimeout(800);
  const page1 = await p.evaluate(() => ({ strats: [...document.querySelectorAll('#blendStrats .blend-strat b')].map(b => b.textContent), presets: [...document.querySelectorAll('#blPresets .bl-preset b')].map(b => b.textContent), enabled: [...document.querySelectorAll('#blPresets .bl-preset .btn')].filter(k => !k.disabled).length, marks: [...document.querySelectorAll('#blPresets .bl-preset')].map(c => [...c.querySelectorAll('.bl-pm span')].map(s => s.textContent).join(' | ')) }));
  ok(page1.strats.includes('Judge and decide') && page1.strats.length >= 4, 'Blend offers another way: Judge and decide', page1.strats.join(', '));
  ok(page1.presets.length === 5 && page1.enabled === 5, 'five ready-made blends, all usable with the four houses here', page1.presets.join(', '));
  ok(page1.marks[1] && /Magister: Magister copy ×3/.test(page1.marks[1]) && /Scriba: Scriba copy/.test(page1.marks[1]), "the Scholar's desk shows its houses and the weight of three", page1.marks[1]);
  await p.screenshot({ path: OUT + '/studio-blend.png' });
  await p.evaluate(() => { [...document.querySelectorAll('#blPresets .bl-preset')].find(c => /Second opinion/.test(c.textContent)).querySelector('.btn').click(); }); await p.waitForTimeout(500);
  const set = await p.evaluate(() => { const b = blState(); return { ids: b.ids, strategy: b.strategy, think: b.think, checked: [...document.querySelectorAll('#blendPick input:checked')].length, on: (document.querySelector('#blendStrats .blend-strat.on b') || {}).textContent, note: document.getElementById('blendNote').textContent.slice(0, 80) }; });
  ok(set.ids.join(',') === 'hs_scriba,hs_magister' && set.strategy === 'judge' && set.checked === 2 && set.on === 'Judge and decide', 'one press sets the two houses and the Judge way', JSON.stringify(set));
  // a stand-in engine: two answers, then the judge's scored sheet
  const run = await p.evaluate(async () => { window.__asked = [];
    blAsk = function (r, a, m, messages, into) { const u = messages[messages.length - 1].content; window.__asked.push({ model: m.customName, judge: /You are the judge/.test(u) });
      let text; if (/You are the judge/.test(u)) text = 'Answer 1: accuracy 3/5, completeness 2/5, clarity 4/5. Reason: it leaves out the second cause.\nAnswer 2: accuracy 5/5, completeness 4/5, clarity 4/5. Reason: both causes are given and supported.\nTHE ANSWER:\nThe tides rise and fall because of the Moon\'s gravity and, to a lesser degree, the Sun\'s.';
      else text = m.id === 'hs_scriba' ? 'The tides come from the Moon.' : 'The tides come from the Moon and the Sun together.';
      a.state = 'done'; a.text = text; a.ms = 900; into.text = text; return Promise.resolve(text); };
    document.getElementById('blendTask').value = 'Why are there tides?'; blendRun();
    for (let i = 0; i < 100 && BL.run; i++) await new Promise(r => setTimeout(r, 100));
    const r = blState().runs[0]; return { asked: window.__asked, status: r.status, scores: r.scores, final: r.final, cards: [...document.querySelectorAll('#blendOut .bl-card')].map(c => ({ head: (c.querySelector('.bl-card-h b') || {}).textContent, by: (c.querySelector('.bl-card-h .small') || {}).textContent, score: [...c.querySelectorAll('.bl-score span')].map(s => s.textContent), why: (c.querySelector('.bl-why') || {}).textContent })), note: document.getElementById('blendNote').textContent }; });
  ok(run.asked.length === 3 && run.asked[2].judge && run.asked[2].model === 'Magister copy', 'both models answer, then the stronger judges', JSON.stringify(run.asked));
  ok(run.scores && run.scores[0] && run.scores[0].acc === 3 && run.scores[1] && run.scores[1].comp === 4 && run.scores[1].best && !run.scores[0].best, "the judge's scores are read from its sheet and the best answer is marked", JSON.stringify(run.scores));
  ok(run.final && run.final.judged && /Moon's gravity and, to a lesser degree, the Sun's/.test(run.final.text) && !/THE ANSWER|accuracy/.test(run.final.text), 'the judged answer is the text after THE ANSWER, without the sheet', run.final && run.final.text);
  const c2 = run.cards.find(c => c.head === 'Magister copy'), fin = run.cards.find(c => c.head === 'The judged answer');
  ok(c2 && c2.score.includes('Accuracy 5/5') && c2.score.includes("the judge's choice") && /both causes/.test(c2.why || ''), "the Magister's card carries its scores, the judge's reason and the choice", JSON.stringify(c2));
  ok(fin && /judged and written by Magister copy/.test(fin.by || ''), 'the final card is named the judged answer, judged and written by the judge', JSON.stringify(fin));
  ok(/judge's scores/.test(run.note), 'the note says where the scores are', run.note);
  await p.screenshot({ path: OUT + '/studio-judged.png' });

  // 2. the tour's new chapters
  const tour = await p.evaluate(() => { const chaps = tourChapList().map(c => c.chap); const subs = {}; ING_TOUR.forEach(s => { if (s.sub) (subs[s.chap] = subs[s.chap] || []).push(s.sub); }); return { chaps, lector: subs.Lector, fabrica: subs.Fabrica, scholar: subs.Scholarship, models: subs.Models, order: [chaps.indexOf('Making things'), chaps.indexOf('Lector'), chaps.indexOf('Fabrica'), chaps.indexOf('Scholarship'), chaps.indexOf('The side buttons')] }; });
  ok(tour.chaps.includes('Lector') && tour.chaps.includes('Fabrica') && tour.chaps.includes('Scholarship') && tour.models.includes('Quality and health'), 'the tour gains chapters for Lector, Fabrica and Scholarship, and Models gains Quality and health', tour.chaps.join(' › '));
  ok(tour.order[0] < tour.order[1] && tour.order[1] < tour.order[2] && tour.order[2] < tour.order[3] && tour.order[3] < tour.order[4], 'they come after Making things and before The side buttons, in order', JSON.stringify(tour.order));
  ok(tour.lector.join(',') === 'The brief,The right model' && tour.fabrica.join(',') === 'Your apps as repositories,Work, test and ship,GitHub inside' && tour.scholar.join(',') === 'Every search vetted,Fontes', 'each new chapter has its sub-chapters', JSON.stringify({ l: tour.lector, f: tour.fabrica, s: tour.scholar }));
  const step = await p.evaluate(() => { const i = ING_TOUR.findIndex(s => s.chap === 'Fabrica'); tourJump(i); return new Promise(r => setTimeout(() => { const c = document.getElementById('ingTour'); r({ there: !!c, text: c ? c.innerText.slice(0, 120) : '', page: document.querySelector('.section.active') && document.querySelector('.section.active').id, ring: !!document.querySelector('.tour-ring') }); }, 1500)); });
  ok(step.there && /Fabrica/.test(step.text) && step.page === 'page-fabrica', "jumping to the Fabrica chapter opens Fabrica's page with the card", JSON.stringify(step));
  await p.screenshot({ path: OUT + '/studio-tour-fabrica.png' });
  await p.evaluate(() => { try { tourSoftClose(); } catch (e) {} const o = document.getElementById('ingTour'); if (o) o.remove(); });

  // 3. the export carries Lector's documents and Fabrica's repositories
  await p.evaluate(async () => { const s = lxState(); s.sets = { 'cd|portfolio': { apps: ['cd'], purpose: 'portfolio', docs: { dossier: { ref: 'lx_ex_doc', title: 'Carpe Diem · Project dossier', made: Date.now() } }, older: {} } };
    await IngBig.put('lx_ex_doc', '# Carpe Diem · Project dossier\n\n## Context\n\nA day planner of 2,480 lines.\n');
    const L = await IngRepo.list(); for (const r of L) { if (/Export test/.test(r.name)) await IngRepo.remove(r.id); }
    await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Export test</title>' }], { name: 'Export test', msg: 'First version' });
    window.__saved = null; saveFileNative = function (name, mime, data) { const u8 = data instanceof Uint8Array ? data : new Uint8Array(data); const names = []; for (let i = 0; i + 46 <= u8.length; i++) { if (u8[i] === 0x50 && u8[i + 1] === 0x4b && u8[i + 2] === 1 && u8[i + 3] === 2) { const n = u8[i + 28] | (u8[i + 29] << 8); names.push(new TextDecoder().decode(u8.subarray(i + 46, i + 46 + n))); } } window.__saved = { name, mime, size: u8.length, names }; };
    go('settings'); });
  await p.waitForTimeout(600);
  await p.evaluate(() => openExport()); await p.waitForTimeout(900);
  const dlg = await p.evaluate(() => ({ lector: !!document.getElementById('exLector'), fabrica: !!document.getElementById('exFabrica'), note: document.getElementById('exNote').textContent }));
  ok(dlg.lector && dlg.fabrica && /1 Lector document/.test(dlg.note) && /Fabrica repositor/.test(dlg.note), "the export dialog offers Lector's documents and Fabrica's repositories and counts them", JSON.stringify(dlg));
  await p.screenshot({ path: OUT + '/studio-export.png' });
  await p.evaluate(() => { ['exChats', 'exChatsJson', 'exNotes', 'exDocs', 'exSources', 'exSettings'].forEach(id => { document.getElementById(id).checked = false; }); document.getElementById('exGo').click(); });
  await p.waitForFunction(() => !!window.__saved, null, { timeout: 30000 });
  const saved = await p.evaluate(() => window.__saved);
  ok(saved && /^Ingenium-export-\d{4}-\d{2}-\d{2}\.zip$/.test(saved.name) && saved.names.some(n => /^lector\/.*Project dossier\.docx$/.test(n)) && saved.names.some(n => /^lector\/.*Project dossier\.md$/.test(n)), "the zip holds the dossier as a Word file and as Markdown", JSON.stringify(saved && saved.names));
  ok(saved && saved.names.some(n => /^fabrica\/export-test\.bundle$/i.test(n) || /^fabrica\/.*\.bundle$/.test(n)) && saved.names.includes('README.txt'), 'and the repository as a git bundle, with the README', JSON.stringify(saved && saved.names.filter(n => /fabrica|README/.test(n))));

  // 4. the shelf's account
  const shelf = await p.evaluate(() => { state.fontes = state.fontes || { items: [] }; state.fontes.colls = ['DPhil chapter 2']; const a = shelfSummary(state), bb = shelfSummary({}); const d = shelfDiff(a, bb); recoverShow(); const note = document.querySelector('#modalBox .shelf-note'); const out = { sets: a.sets, colls: a.colls, lines: d.lines, note: note && note.textContent.slice(0, 400) }; closeModal(); return out; });
  ok(shelf.sets === 1 && shelf.colls === 1 && shelf.lines.some(l => /\+1 Lector set/.test(l)) && shelf.lines.some(l => /\+1 Fontes collection/.test(l)), "the shelf counts Lector's sets and Fontes' collections and names them in the difference", JSON.stringify(shelf));
  ok(/Lector's readings and documents, Fabrica's repositories, .*the model files live in this device's own store/.test(shelf.note || ''), 'and says what returning to a moment leaves alone', shelf.note);

  // 5. quiet in a focus session
  const quiet = await p.evaluate(() => { let toasts = 0; const o = ingToast; ingToast = function () { toasts++; }; _perfWarned = {}; pomo.running = true; pomo.phase = 'focus'; state.focusPause = true;
    perfWarn({ mid: 'hs_velox', model: 'Velox copy', tps: 0.8 }); const inFocus = toasts; pomo.running = false; perfWarn({ mid: 'hs_velox', model: 'Velox copy', tps: 0.8 }); const after = toasts; ingToast = o;
    const t = document.querySelector('#focusPauseSw') && document.querySelector('#focusPauseSw').closest('.sch-set').textContent; return { inFocus, after, text: /own asides/.test(t || '') }; });
  ok(quiet.inFocus === 0 && quiet.after === 1 && quiet.text, 'a slow-model aside waits during a focus session and comes after it; the setting says so', JSON.stringify(quiet));

  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('CRASH', e); process.exit(2); });
