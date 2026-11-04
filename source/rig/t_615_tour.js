// The tour, its demonstrations and the Guide, up to date (Ingenium 6.15, modules/r222.js). Her words (4 November 2026): "Please make
// sure that the guided tour and its demonstrations are also updated as well as the Guide page to reflect the latest pages and sections
// as well as updates recently made to Ingenium ... the same for all of the different editions of Ingeniums and its demos."
// The app, its files and its session are invented.
//   node rig/t_615_tour.js <Ingenium page url> <out folder> [master|demo|gift|full]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT, ED = 'master'] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1400))); c ? pass++ : fail++; };
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1500, height: 980 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(900);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  const career = ED === 'master' || ED === 'full';

  /* 1. the new steps, each in its chapter, and the chapters in order */
  const t = await p.evaluate(() => ({ n: ING_TOUR.length, added: IngTourNow.added(), chaps: tourChapList().map(c => c.chap), env: !!window.IngEnv, ws: !!window.IngWorkshop }));
  const want = ['Chat: Effort, beside the model', 'Chat: Connectors', 'Code: Code: building an app with the model', 'Code: The plan, ticked off', 'Code: The Session column', 'Code: Ultracode',
    'Code: Your GitHub repositories'].concat(t.env ? ['Code: The environment'] : []).concat(['Code: Pointing with @, commands with /', 'Models: Newer models, found online', 'Making things: Ways to blend', 'Folders: Folders', 'Folders: Bringing your work in'])
    .concat(career ? ['Career Studio: The Career Studio', 'Career Studio: A posting from its link', 'Career Studio: Drafts you review'] : [])
    .concat(['Settings: Connectors', 'Settings: Your data, sealed']).concat(t.ws ? ['Settings: The Workshop'] : []);
  ok(want.every(w => t.added.includes(w)) && t.added.length === want.length, 'the tour carries the ' + want.length + ' new steps of this edition, and no others', t.added);
  const ci = c => t.chaps.indexOf(c);
  ok(ci('Code') === ci('Chat') + 1 && ci('Folders') === ci('Making things') + 1 && (career ? ci('Career Studio') === ci('Lector') + 1 : ci('Career Studio') < 0 && ci('Lector') < 0),
    'Code follows Chat, Folders follows Making things, and the Career Studio follows Lector where the edition carries them', t.chaps);
  const chatSteps = await p.evaluate(() => ING_TOUR.filter(s => s.chap === 'Chat').map(s => s.t.replace(/^[^A-Za-z]+/, '')));
  ok(chatSteps.indexOf('Effort, beside the model') === chatSteps.indexOf('Choosing the model') + 1 && chatSteps.indexOf('Connectors') === chatSteps.indexOf('The + key') + 1,
    'in Chat, effort follows the model, and connectors the + key', chatSteps);
  const said = await p.evaluate(() => { const f = r => ING_TOUR.filter(s => s.chap === 'Chat' && r.test(s.t))[0].b; return { m: f(/Choosing the model/), plus: f(/The \+ key/) }; });
  ok(/by service, and each conversation keeps the model that last answered it\./.test(said.m) && /opens beside the chat when you press it/.test(said.plus), 'the model and + key steps say what changed since', said);

  /* 2. every new step finds what it points at, page by page */
  await p.evaluate(() => { document.body.setAttribute('data-motion', 'minimal'); IngHelp.setLevel('new'); });
  const own = await p.evaluate(async () => { const pr = await ccMakeProject('Invented garden', [{ name: 'index.html', text: '<!doctype html><title>Garden</title><p>fern</p>' }], 'index.html');
    go('code'); try { closeModal(); } catch (e) {} ccNewSession(pr); const c = curChat(); c.messages.push({ role: 'me', text: 'Make the title green.', at: Date.now() });
    IngR215.PANEL.plan = false; IngR215.PANEL.session = false; ccState().panel = { plan: false, session: false }; go('home'); return { id: c.id, proj: pr.id }; });
  const rings = await p.evaluate(async () => { const out = []; const idx = ING_TOUR.map((s, i) => s.r222 ? i : -1).filter(i => i >= 0);
    for (const i of idx) { const s = ING_TOUR[i]; tourI = i; window.tourI = i; tourRender(); await new Promise(r => setTimeout(r, 1700));
      const ring = document.querySelector('.tour-ring'), sel = Array.isArray(s.ring) ? s.ring[0] : s.ring; let match = false; try { match = !!ring && ring.matches(sel); } catch (e) {}
      const card = document.querySelector('#ingTour .tour-card'); const r = ring ? ring.getBoundingClientRect() : null;
      out.push({ i, t: s.t.replace(/^[^A-Za-z]+/, ''), sel, match, w: r ? Math.round(r.width) : 0, title: card ? card.querySelector('.tour-title').textContent.replace(/^[^A-Za-z]+/, '') : '' }); }
    return out; });
  const missed = rings.filter(r => !r.match || r.w < 3 || r.title !== r.t);
  ok(!missed.length, 'each of the ' + rings.length + ' new steps opens its page and rings what it names', missed.length ? missed : rings.map(r => r.t));

  /* 3. the demonstration: a plan ticked off in the tour's own Code session, and hers put back after */
  const demo = await p.evaluate(async () => { document.body.removeAttribute('data-motion'); const i = ING_TOUR.findIndex(s => s.demo === 'r222Plan'); tourI = i; window.tourI = i; tourRender();
    await new Promise(r => setTimeout(r, 900)); const sec = () => document.querySelector('#ccPanel [data-sec="plan"]');
    const a = { mode: CC.mode, chat: state.activeChat, kind: curChat().kind, count: sec() ? sec().querySelector('.ccp-h span').textContent : '', ring: !!document.querySelector('#ccPanel [data-sec="plan"].tour-ring, #ccPanel .tour-ring') };
    await new Promise(r => setTimeout(r, 1300)); a.count2 = sec() ? sec().querySelector('.ccp-h span').textContent : '';
    await new Promise(r => setTimeout(r, 2600)); a.count3 = sec() ? sec().querySelector('.ccp-h span').textContent : ''; a.done = [...sec().querySelectorAll('li')].map(l => l.className).join();
    a.list = [...document.querySelectorAll('.cc-sessions .cc-row')].map(x => x.textContent).filter(x => /Example from the tour/.test(x)).length;
    return a; });
  ok(demo.mode === 'code' && demo.chat === IngTourNowId(demo) && demo.kind === 'code', 'the demonstration runs in a Code session of the tour\'s own', demo);
  ok(demo.count === '1 of 4 done' && demo.count2 === '2 of 4 done' && demo.count3 === '4 of 4 done' && demo.done === 'done,done,done,done', 'the example plan is ticked off one task at a time, in the column beside it', demo);
  await p.screenshot({ path: OUT + '/tour_plan.png' });
  const back = await p.evaluate(() => { tourEnd(); return { mode: CC.mode, chat: state.activeChat, code: ccState().activeCode, panel: JSON.stringify(ccState().panel), P: [IngR215.PANEL.plan, IngR215.PANEL.session],
    left: (state.chats || []).filter(c => c.id === IngTourNow.codeId || c.__tourCode || c.__tour).length, list: [...document.querySelectorAll('.cc-sessions .cc-row')].filter(x => /Example from the tour/.test(x.textContent)).length }; });
  ok(back.mode === 'code' && back.chat === own.id && back.code === own.id && back.panel === '{"plan":false,"session":false}' && back.P.join() === 'false,false' && back.left === 0 && back.list === 0,
    'ending the tour removes its sessions and puts hers back, with her column closed as she left it', { back, own });
  const kept = await p.evaluate(() => { const c = curChat(); return c.messages.length === 1 && c.messages[0].text === 'Make the title green.' && c.projectId; });
  ok(kept === own.proj, 'her own session is as she left it', kept);

  /* 4. levels: the steps an expert needs stay in the expert's tour */
  const ex = await p.evaluate(() => { const v = IngHelp.cardsFor('expert').map(i => ING_TOUR[i].t.replace(/^[^A-Za-z]+/, '')); return ['Effort, beside the model', 'Ultracode', 'Pointing with @, commands with /', 'Code: building an app with the model', 'Ways to blend', 'Your data, sealed'].filter(x => !v.includes(x)); });
  ok(!ex.length, 'the expert\'s tour keeps effort, Ultracode, @ and /, Ways to blend and the sign-in', ex);

  /* 5. the engines step only where the computer's app carries both engines, after Newer models, never while the tour runs */
  const en = await p.evaluate(async () => { const tick = () => new Promise(r => setTimeout(r, 60)); const before = ING_TOUR.some(s => s.r222e); const o = window.deskApi; let newer = false;
    window.deskApi = function () { return { engine_choice: function () { return Promise.resolve({ proven: { version: 'b11321' }, newer: { available: newer, version: 'b12000' } }); }, engine_choice_set: function () { return Promise.resolve({}); } }; };
    go('models'); await tick(); const alone = ING_TOUR.some(s => s.r222e); newer = true;
    document.body.classList.add('touring'); go('models'); await tick(); const during = ING_TOUR.some(s => s.r222e); document.body.classList.remove('touring');
    go('models'); await tick(); const i = ING_TOUR.findIndex(s => s.r222e), prev = i > 0 ? ING_TOUR[i - 1].t.replace(/^[^A-Za-z]+/, '') : '';
    go('models'); await tick(); const n = ING_TOUR.filter(s => s.r222e).length; window.deskApi = o; await new Promise(r => setTimeout(r, 300)); return { before, alone, during, prev, n }; });
  ok(!en.before && !en.alone && !en.during && en.prev === 'Newer models, found online' && en.n === 1, 'Two engines joins once, after Newer models, only where the computer\'s app carries the newer engine, and not while the tour runs', en);

  /* 6. help by page */
  const hp = await p.evaluate(() => { const P = IngHelp.pages; return { code: JSON.stringify(P.code.tour), codeAt: IngHelp.tourIndex(P.code.tour), codeFirst: ING_TOUR.findIndex(s => s.chap === 'Code'),
    folders: !!P.folders && P.folders.tour[0], fAt: P.folders ? IngHelp.tourIndex(P.folders.tour) : -1, career: !!P.career, cAt: P.career ? IngHelp.tourIndex(P.career.tour) : -1,
    dos: P.folders ? P.folders.dos.map(d => !!document.querySelector(d[2])).join() : '' }; });
  ok(hp.code === '["Code"]' && hp.codeAt === hp.codeFirst && hp.folders === 'Folders' && hp.fAt > 0 && (career ? hp.career && hp.cAt > 0 : !hp.career), 'help tours Code\'s, Folders\' and the Career Studio\'s own chapters', hp);
  await p.evaluate(() => go('folders'));
  const fdos = await p.evaluate(() => IngHelp.pages.folders.dos.map(d => { const e = document.querySelector(d[2]); return !!e && e.getBoundingClientRect().width > 2; }).join());
  ok(fdos === 'true,true,true', 'each of Folders\' help keys shows something on the page', fdos);

  /* 7. the Guide */
  const g = await p.evaluate(() => { go('guide'); const pg = document.getElementById('page-guide'); const ids = [...pg.querySelectorAll('.card')].map(c => c.id).filter(Boolean);
    return { ids, wn: [...document.querySelectorAll('#wnGuide .wn-list li b')].map(x => x.textContent), twice: (() => { go('home'); go('guide'); return document.querySelectorAll('#wnGuide').length; })() }; });
  const at = id => g.ids.indexOf(id);
  ok(at('wnGuide') === at('guideTourCard') + 1, 'What is new comes right after the guided tour\'s card', g.ids);
  ok(at('mdGuide') > at('cnGuide') && at('fdGuide') > at('cnGuide') && (career ? at('csGuide') > at('fdGuide') : at('csGuide') < 0), 'Folders, the Career Studio (where carried) and Models follow the other cards', g.ids);
  ok(/^6\.1[4-9]/.test(g.wn[0]) && g.wn.includes('6.14') && g.wn.includes('6.10') && (career ? g.wn.includes('6.9.7') : !g.wn.includes('6.9.7') && !g.wn.includes('6.9.8')) && g.twice === 1, 'What is new lists the versions newest first, those of this edition only, once', g);
  await p.waitForTimeout(700); await p.screenshot({ path: OUT + '/guide_new.png' });
  const words = await p.evaluate(() => ({ models: ING_TOUR_TEASERS.Models, settings: ING_TOUR_TEASERS.Settings, entry: (document.querySelector('#guideTour p') || {}).textContent || '' }));
  ok(/newer ones found online/.test(words.models) && /connectors and the sign-in/.test(words.settings) && /remembers where you stopped/.test(words.entry) && !/About ten minutes/.test(words.entry) && /in 1[46] short chapters/.test(words.entry),
    'the chapters\' lines and the Guide\'s tour card say what the tour now holds, and guess no time', words);

  /* 8. the last card names this copy's chapters */
  const fin = await p.evaluate(() => { tourFinale(); const t = document.querySelector('#ingTour .finale .tour-body').textContent; tourEnd(); return t; });
  ok(/Code/.test(fin) && /Folders/.test(fin) && (career ? /the Career Studio/.test(fin) : !/Career/.test(fin)) && /Settings\. The best way/.test(fin), 'the tour\'s last card names its chapters, Code and Folders among them', fin);

  /* 9. at phone width the Code steps fit */
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(300);
  const ph = await p.evaluate(async () => { const out = []; for (const name of ['The plan, ticked off', 'The Session column', 'Your GitHub repositories']) { const i = ING_TOUR.findIndex(s => s.t.indexOf(name) >= 0); tourI = i; window.tourI = i; tourRender();
      await new Promise(r => setTimeout(r, 1700)); const c = document.querySelector('#ingTour .tour-card').getBoundingClientRect();
      out.push({ name, over: document.documentElement.scrollWidth - innerWidth, left: Math.round(c.left), right: Math.round(c.right), w: innerWidth }); }
    tourEnd(); return out; });
  ok(ph.every(x => x.over <= 1 && x.left >= 0 && x.right <= x.w), 'at phone width the Code steps\' cards fit the screen, with no sideways scroll', ph);
  await p.screenshot({ path: OUT + '/tour_phone.png' });

  ok(!errs.length, 'no errors on the page', errs);
  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})();
function IngTourNowId() { return 'c-tour-code'; }
