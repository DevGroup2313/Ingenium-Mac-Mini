// Ingenium 7.79: the guided tour, stage 3: Ingenia brings a folder up to date, Fabrica keeps two versions and runs its own Test,
// Vocatio keeps an application with its closing date (modules/r377.js). Her words (24 November 2026): "I want live demonstrations
// added to the Guided Tour to showcase all of Ingenium's pages ... specifically curated to showcase each page being used to complete a
// specific task". What was hers before the tour must be as it was when the tour ends.
//   node rig/t_779_tour_more.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2), URL_ = args.find(a => /^https?:\/\//.test(a)), OUT = args.find(a => !/^https?:\/\//.test(a)) || '/tmp';
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(3500);
  const hers = async () => p.evaluate(async () => ({ projects: (state.projects || []).length, chats: (state.chats || []).length, open: (state.folders && state.folders.ui || {}).open || null,
    repos: (await IngRepo.list()).length, sel: window.fbHubHost ? fbHubHost.FBS().sel || null : null,
    opps: window.IngCareer ? IngCareer.state().opps.length : -1, room: window.IngCareer ? IngCareer.state().ui.room : null }));
  const before = await hers();
  const idx = await p.evaluate(() => { try { tour(); } catch (e) {} const f = d => ING_TOUR.findIndex(s => s.demo === d); return { folder: f('r377Folder'), fabrica: f('r377Fabrica'), vocatio: f('r377Vocatio'), added: IngTour377.added() }; });
  ok(idx.folder >= 0 && idx.fabrica >= 0 && idx.vocatio >= 0, 'the three cards stand in their chapters: Ingenia, Fabrica and Vocatio', idx);
  // 1. Ingenia
  await p.evaluate(i => tourJump(i), idx.folder);
  await p.waitForFunction(() => { const s = (state.projects || []).find(x => x.id === 'pj-tour-breathe'); return s && s.app.briefAt && !(IngFolders.run || {}).busy; }, null, { timeout: 40000 }).catch(() => {}); await sleep(800);
  const f = await p.evaluate(() => { const b = document.getElementById('fldBody'); const s = (state.projects || []).find(x => x.id === 'pj-tour-breathe') || { app: {} };
    return { page: (document.querySelector('section.section.active') || {}).id, shows: /Breathe is a one-page app/.test(b ? b.textContent : ''), dec: s.app.decisions.length, open: s.app.open.length, sugg: s.app.sugg.length, read: Object.keys(s.app.read || {}).length, conv: (state.chats || []).some(c => c.id === 'c-tour-fold' && c.projectId === 'pj-tour-breathe') }; });
  ok(f.page === 'page-folders' && f.shows && f.conv, 'Ingenia: the app\'s folder, its conversation in it, and Where we left off written', f);
  ok(f.dec === 2 && f.open === 1 && f.sugg === 1 && f.read === 1, 'the decisions, what is open next, a way of working to keep or drop; its conversation counted as read', f);
  await p.screenshot({ path: OUT + '/ingenia.png' });
  // 2. Fabrica
  await p.evaluate(i => tourJump(i), idx.fabrica);
  // polled here: a check that awaits inside waitForFunction is read as done at once
  for (let i = 0; i < 120; i++) { const done = await p.evaluate(async () => { const b = state.tour && state.tour.r377; if (!b || !b.fabRepo) return false; const h = await IngRepo.head(b.fabRepo); if (!h) return false; const n = await IngRepo.notes(b.fabRepo, h); return !!(n && n.test); }); if (done) break; await sleep(500); }
  await sleep(1500);
  const fb = await p.evaluate(async () => { const id = state.tour.r377.fabRepo, h = await IngRepo.head(id), log = await IngRepo.log(id, { max: 5 }), n = await IngRepo.notes(id, h);
    return { sel: fbHubHost.FBS().sel === id, versions: log.length, checks: (n.test && n.test.checks || []).map(c => c.id + ':' + c.state), ok: n.test && n.test.ok, page: (document.querySelector('section.section.active') || {}).id }; });
  ok(fb.page === 'page-fabrica' && fb.sel && fb.versions === 2, 'Fabrica: a real repository of the tour\'s own, chosen, with two versions kept', fb);
  ok(fb.ok && ['reads:ok', 'names:ok', 'opens:ok', 'self:ok', 'number:ok'].every(c => fb.checks.indexOf(c) >= 0), 'its own Test ran its five checks on the second version, every one passed (the self-test and the build number moved forward)', fb.checks);
  await p.screenshot({ path: OUT + '/fabrica.png' });
  // 3. Vocatio
  if (idx.vocatio >= 0) {
    await p.evaluate(i => tourJump(i), idx.vocatio);
    await p.waitForFunction(() => IngCareer.state().opps.some(o => o.__tour), null, { timeout: 40000 }).catch(() => {}); await sleep(1500);
    const v = await p.evaluate(() => { const o = IngCareer.state().opps.find(x => x.__tour) || {}; const li = document.querySelector('#cs .c-opp[aria-current=true]');
      return { title: o.title, org: o.org, due: o.due, stage: o.stage, read: !!o.read, list: li ? li.textContent : null }; });
    ok(v.title === 'Learning and Access Officer' && v.org === 'Example City Museum' && /^\d{4}-\d{2}-\d{2}$/.test(v.due || ''), 'Vocatio: the posting kept, its title, who offers it and its closing date read from the text', v);
    ok(v.stage === 'considering' && !v.read && /Closes in (20|21) days/.test(v.list || ''), 'kept in Applications with its stage and the days left; no model read it', v);
    await p.screenshot({ path: OUT + '/vocatio.png' });
  }
  // 4. the end: hers as it was
  await p.evaluate(() => { try { tourEnd(); } catch (e) {} }); await sleep(2500);
  const after = await hers();
  ok(JSON.stringify(after) === JSON.stringify(before), 'when the tour ends, her folders, conversations, repositories, chosen app and applications are as they were', { before, after });
  ok(await p.evaluate(() => !(state.tour && state.tour.r377)), 'nothing of the tour\'s is kept');
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
