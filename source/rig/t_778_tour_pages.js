// Ingenium 7.78: the guided tour, stage 2: a task done on Adamas, Concordia and Lector, and the Engine panel shown (modules/r376.js).
// Her words (24 November 2026): "I want live demonstrations added to the Guided Tour to showcase all of Ingenium's pages ...
// specifically curated to showcase each page being used to complete a specific task".
//   node rig/t_778_tour_pages.js <Ingenium page url> <out folder>
// What was hers before the tour (a page in Adamas, a question in Concordia) must be as it was when the tour ends.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2), URL_ = args.find(a => /^https?:\/\//.test(a)), OUT = args.find(a => !/^https?:\/\//.test(a)) || '/tmp';
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const MINE = '<!doctype html><title>Mine</title><p>My own page</p>';
// the preview runs the page in a frame of its own (sandboxed): its words are read there, as a person sees them
async function shareShown(p) { for (const f of p.frames()) { try { const t = await f.evaluate(() => { const e = document.getElementById('share'); return e ? e.textContent : null; }); if (t) return t; } catch (e) {} } return null; }
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(3000);
  // hers, before the tour
  await p.evaluate(m => { go('build'); const ce = document.getElementById('codeEditor'); ce.value = m; ce.dispatchEvent(new Event('input', { bubbles: true })); runBuild(); go('blend'); document.getElementById('blendTask').value = 'My own question'; }, MINE);
  await sleep(800);
  const idx = await p.evaluate(() => { try { tour(); } catch (e) {} const f = d => ING_TOUR.findIndex(s => s.demo === d);
    return { adamas: f('r376Adamas'), ask: f('r376AdamasAsk'), blend: f('r376Blend'), lector: f('r376Lector'), engine: f('r376Engine'),
      running: (ING_TOUR.find(s => /What is running/.test(s.t)) || {}).b, added: IngTour376.added() }; });
  ok(idx.adamas >= 0 && idx.ask === idx.adamas + 1 && idx.blend > idx.ask && idx.lector >= 0 && idx.engine >= 0, 'the new cards stand in their chapters: Adamas (two), Concordia, Lector and the Engine panel', idx);
  ok(!/Mentes/.test(idx.running || '') && /Engine key opens the engine's panel/.test(idx.running || ''), 'the top bar\'s card no longer says the Engine key opens Mentes', idx.running);
  // 1. Adamas: the page written and run
  await p.evaluate(i => tourJump(i), idx.adamas); await sleep(2200);
  const a1 = await p.evaluate(() => ({ text: document.getElementById('codeEditor').value.split('\n').length, page: (document.querySelector('section.section.active') || {}).id }));
  ok(a1.page === 'page-build' && a1.text > 3 && a1.text < 38, 'Adamas: the page is being written, line by line', a1);
  await p.waitForFunction(() => /<\/html>\s*$/.test(document.getElementById('codeEditor').value), null, { timeout: 30000 }).catch(() => {}); await sleep(1500);
  const a2 = await p.evaluate(() => ({ ed: document.getElementById('codeEditor').value, cm: (document.querySelector('#page-build .cm-content') || {}).textContent || '', frame: document.getElementById('previewFrame').srcdoc || '' }));
  ok(/Split the bill/.test(a2.ed) && /<\/html>\s*$/.test(a2.ed) && /Split the bill/.test(a2.cm), 'the whole page is written, in the editor itself', { len: a2.ed.length, cm: a2.cm.length });
  const sh1 = await shareShown(p);
  ok(sh1 === '£24.30', 'the preview runs it: each of three pays £24.30 of £64.80 with a 12.5% tip', sh1);
  await p.screenshot({ path: OUT + '/adamas_page.png' });
  // 2. Adamas: a change asked for
  await p.evaluate(i => tourNext(), idx.adamas); await sleep(1800);
  const q = await p.evaluate(() => (document.querySelector('#agBuild .agb-in') || {}).value || '');
  ok(/rounds each share up/.test(q) || q.length > 10, 'the request is typed into Ask a model to change this page', q);
  await p.waitForFunction(() => !!(document.querySelector('#agBuild .agb-reply') || {}).textContent, null, { timeout: 30000 }).catch(() => {}); await sleep(1500);
  const a3 = await p.evaluate(() => ({ steps: [...document.querySelectorAll('#agBuild .agb-out .ag-steps li')].map(x => x.textContent), reply: (document.querySelector('#agBuild .agb-reply') || {}).textContent || '', ed: document.getElementById('codeEditor').value, frame: document.getElementById('previewFrame').srcdoc || '' }));
  ok(a3.steps.length === 4 && /Read page\.html/.test(a3.steps[0]) && /Ran the app/.test(a3.steps[3]), 'its steps: read, changed twice, ran', a3.steps);
  const lines = a3.ed.split('\n'), row = lines.findIndex(l => /id="round"/.test(l)) + 1, js = lines.findIndex(l => /Math\.ceil/.test(l)) + 1;
  ok(row > 0 && js > 0 && a3.steps[1].indexOf('line ' + row) > 0 && a3.steps[2].indexOf('line ' + js) > 0, 'the lines its steps name are the lines changed', { row, js, steps: a3.steps });
  const sh2 = await shareShown(p);
  ok(/Round up/.test(a3.reply) && sh2 === '£25.00', 'its reply says what it did, and the preview runs the changed page: £25.00 each, rounded up', { reply: a3.reply, sh2 });
  await p.screenshot({ path: OUT + '/adamas_ask.png' });
  // 3. Concordia: Pass and refine, watched
  await p.evaluate(i => tourJump(i), idx.blend); await sleep(2500);
  const c1 = await p.evaluate(() => ({ task: document.getElementById('blendTask').value, page: (document.querySelector('section.section.active') || {}).id }));
  ok(c1.page === 'page-blend' && /stairwell/.test(c1.task), 'Concordia: the question is written once', c1);
  await p.waitForFunction(() => !!document.querySelector('#blendOut .bl-final .bl-acts2'), null, { timeout: 40000 }).catch(() => {});
  const c2 = await p.evaluate(() => { const o = document.getElementById('blendOut'); return { run: o.getAttribute('data-run'), cards: [...o.querySelectorAll('.bl-card')].map(c => c.querySelector('.bl-card-h').textContent), final: (o.querySelector('.bl-final .bl-body') || {}).textContent || '', ex: !!o.querySelector('.r376-ex'), changed: (o.querySelector('.blx-chg') || {}).textContent || '' }; });
  ok(c2.run === 'b-tour-376' && c2.cards.length === 3 && /Velox/.test(c2.cards[0]) && /Magister/.test(c2.cards[1]), 'the first model drafts, the second improves it, the refined answer comes last', c2);
  ok(/everyone's way out/.test(c2.final) && /Changed/.test(c2.changed) && c2.ex, 'the refined answer says what was changed, and the run says it is the tour\'s example', c2);
  ok(await p.evaluate(() => !blState().runs.some(r => r.id === 'b-tour-376')), 'the example is not kept among her blends');
  await p.screenshot({ path: OUT + '/concordia.png' });
  // 4. Lector
  if (idx.lector >= 0) {
    await p.evaluate(i => tourJump(i), idx.lector);
    await p.waitForFunction(() => { const d = document.getElementById('l7Desk'); return d && /What it needs/.test(d.textContent) && !d.querySelector('.l-caret') && d.querySelectorAll('.l-sheet').length; }, null, { timeout: 60000 }).catch(() => {}); await sleep(800);
    const l = await p.evaluate(() => { const d = document.getElementById('l7Desk'); return { notes: [...document.querySelectorAll('#l7Stream .r376-th .lbl')].map(x => x.textContent), h: [...d.querySelectorAll('h2')].map(x => x.textContent), by: !!d.querySelector('.cv .by'), sheets: d.querySelectorAll('.l-sheet').length, title: (d.querySelector('.cv h1') || {}).textContent }; });
    ok(l.notes.length === 2 && /Part 1 of 2/.test(l.notes[0]), 'Lector: two parts read, a note kept on each', l.notes);
    ok(l.title === 'Breathe' && l.h.length === 4 && /What it does/.test(l.h[0]) && !l.by, 'the guide is written onto the paper, its four sections, with no byline of hers', l);
    ok(l.sheets >= 1, 'on Lector\'s own sheets', l.sheets);
    await p.screenshot({ path: OUT + '/lector.png' });
  }
  // 5. the Engine panel
  await p.evaluate(i => tourJump(i), idx.engine); await sleep(1800);
  const e1 = await p.evaluate(() => ({ open: !!document.getElementById('ingEngine'), ring: [...document.querySelectorAll('.tour-ring')].map(x => x.id || x.className).slice(0, 3) }));
  ok(e1.open, 'the Engine card opens the panel', e1);
  await sleep(2500);
  const lay = await p.evaluate(() => { const c = document.querySelector('#ingTour .tour-card').getBoundingClientRect(), e = document.getElementById('ingEngine').getBoundingClientRect(); return { cardRight: Math.round(c.right), panelLeft: Math.round(e.left), cardBottom: Math.round(c.bottom), h: innerHeight }; });
  ok(lay.cardRight <= lay.panelLeft && lay.cardBottom > lay.h - 60, 'the tour\'s card stands at the lower left, clear of the panel', lay);
  await p.evaluate(() => { const c = document.querySelector('#ingTour .tour-card'); const r = c.getBoundingClientRect(); window.__c = [r.x + 30, r.y + 12]; });
  const cxy = await p.evaluate(() => window.__c); await p.mouse.move(cxy[0], cxy[1]); await p.mouse.down(); await p.mouse.move(cxy[0] - 40, cxy[1] - 10); await p.mouse.up(); await sleep(300);
  ok(await p.evaluate(() => !!document.getElementById('ingEngine')), 'moving the tour\'s card leaves the panel open');
  await p.screenshot({ path: OUT + '/engine.png' });
  await p.evaluate(() => tourNext()); await sleep(900);
  ok(await p.evaluate(() => !document.getElementById('ingEngine')), 'the next card closes it');
  // 6. the end: hers as it was
  await p.evaluate(() => { try { tourEnd(); } catch (e) {} }); await sleep(1500);
  const end = await p.evaluate(() => { go('build'); const ed = document.getElementById('codeEditor').value; go('blend');
    return { ed, build: state.build, task: document.getElementById('blendTask').value, run: document.getElementById('blendOut').getAttribute('data-run'), kept: !!(state.tour && state.tour.r376), ask: (document.querySelector('#agBuild .agb-out') || {}).textContent || '' }; });
  ok(end.ed === MINE && end.build === MINE, 'when the tour ends, her own page is back in Adamas', { ed: end.ed.slice(0, 80) });
  ok(end.task === 'My own question' && end.run !== 'b-tour-376' && !end.ask, 'and her question in Concordia; the tour\'s blend and request are gone', end);
  ok(!end.kept, 'nothing of the tour\'s is kept', end.kept);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
