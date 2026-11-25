// Ingenium 7.80: the whole guided tour, from its first card to its last, with every demonstration (r222, r376, r377, r379): no card
// throws, every card shows its words, and when the tour ends everything of hers is as it was.
//   node rig/t_780_tour_whole.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2), URL_ = args.find(a => /^https?:\/\//.test(a)), OUT = args.find(a => !/^https?:\/\//.test(a)) || '/tmp';
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(3500);
  // hers, before the tour: a page in Adamas, a question in Concordia
  await p.evaluate(() => { go('build'); const ce = document.getElementById('codeEditor'); ce.value = '<p>Mine</p>'; ce.dispatchEvent(new Event('input', { bubbles: true })); runBuild(); go('blend'); const t = document.getElementById('blendTask'); if (t) t.value = 'My question'; go('home'); });
  await sleep(1000);
  const hers = () => p.evaluate(async () => ({ chats: (state.chats || []).map(c => c.id).sort().join(','), projects: (state.projects || []).map(x => x.id).sort().join(','), open: (state.folders && state.folders.ui || {}).open || null,
    ais: (state.ownAIs || []).map(a => a.id).join(','), repos: (await IngRepo.list()).length, opps: window.IngCareer ? IngCareer.state().opps.length : -1, build: state.build, blend: (document.getElementById('blendTask') || {}).value,
    tasks: (state.tasks || []).length, parked: (state.parked || []).length, tour: !!(state.tour && (state.tour.r376 || state.tour.r377)) }));
  const before = await hers();
  const n = await p.evaluate(() => { try { tour(); } catch (e) {} tourJump(0); return ING_TOUR.length; });
  ok(n > 60, 'the tour has its cards', n);
  const empty = [], thrown = [];
  for (let i = 0; i < n; i++) {
    const at = await p.evaluate(() => typeof tourI === 'number' ? tourI : -1);
    const card = await p.evaluate(() => { const c = document.querySelector('#ingTour .tour-card'); return c ? { t: (c.querySelector('.tour-title') || {}).textContent || '', b: ((c.querySelector('.tour-body') || {}).textContent || '').length, chapter: c.classList.contains('chapter') } : null; });
    if (!card || (!card.chapter && (!card.t || card.b < 20))) empty.push([at, card]);
    const demo = await p.evaluate(() => { const s = ING_TOUR[tourI]; return s && s.demo ? s.demo : null; });
    await sleep(demo ? 9000 : 700);
    const e0 = errs.length;
    await p.evaluate(() => { const nx = [...document.querySelectorAll('#ingTour .btn.primary')].pop(); if (nx) nx.click(); });
    await sleep(600);
    if (errs.length > e0) thrown.push([at, errs.slice(e0)]);
    // a chapter's closing card: Continue
    const chap = await p.evaluate(() => { const c = document.querySelector('#ingTour .tour-card.chapter'); if (!c) return false; const k = [...c.querySelectorAll('.btn.primary')].pop(); if (k) k.click(); return true; });
    if (chap) await sleep(500);
    const fin = await p.evaluate(() => !!document.querySelector('#ingTour .tour-card.finale'));
    if (fin) break;
  }
  await p.screenshot({ path: OUT + '/finale.png' });
  ok(await p.evaluate(() => !!document.querySelector('#ingTour .tour-card.finale')), 'the tour reaches its last card');
  ok(empty.length === 0, 'every card shows its title and words', empty.slice(0, 5));
  ok(thrown.length === 0, 'no card throws', thrown.slice(0, 5));
  await p.evaluate(() => { try { tourEnd(); } catch (e) {} }); await sleep(3000);
  const after = await hers();
  const diff = Object.keys(before).filter(k => before[k] !== after[k]);
  ok(diff.length === 0, 'when the tour ends, everything of hers is as it was (conversations, folders, the folder open, her own AIs, repositories, applications, her page in Adamas, her question in Concordia, tasks, parked thoughts)', diff.map(k => [k, before[k], after[k]]));
  ok(errs.length === 0, 'no page errors', errs.slice(0, 6));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
