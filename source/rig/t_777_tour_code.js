// Ingenium 7.77: the guided tour builds a real small app in Code before her eyes (modules/r222.js).
// Her words (24 November 2026): "I want the demonstration prompt to be replaced with another live demonstration prompt that actually
// demonstrates using Ingenium's chat pages to actually build an app or something else."
//   node rig/t_777_tour_code.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2), URL_ = args.find(a => /^https?:\/\//.test(a)), OUT = args.find(a => !/^https?:\/\//.test(a)) || '/tmp';
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(3000);   /* Ingenia adds a folder for each of her apps a moment after the start: counted after it */
  const before = await p.evaluate(() => ({ chats: (state.chats || []).length, projects: (state.projects || []).length }));
  const idx = await p.evaluate(() => { try { tour(); } catch (e) {} return { type: ING_TOUR.findIndex(s => s.r222 && s.chap === 'Code' && s.sub === 'Building an app'), build: ING_TOUR.findIndex(s => s.r222 && s.chap === 'Code' && s.sub === 'The plan') }; });
  ok(idx.type >= 0 && idx.build === idx.type + 1, 'the Code chapter opens with the request, then the app written and running', idx);
  // 1. the request, typed
  await p.evaluate(i => tourJump(i), idx.type); await sleep(6500);
  const t = await p.evaluate(() => ({ input: (document.getElementById('chatInput') || {}).value || '', page: (document.querySelector('section.section.active') || {}).id, mode: (window.CC || {}).mode, msgs: (curChat() || {}).messages ? curChat().messages.length : -1 }));
  ok(/breathing app/.test(t.input) && t.mode === 'code' && t.msgs === 0, 'in Code, the tour types its request for a small breathing app', t);
  ok(!/PhD|research proposal|application is due/i.test(JSON.stringify(await p.evaluate(() => ING_TOUR.map(s => [s.t, s.b]))) + await p.evaluate(() => String(window.TOUR_Q || ''))), 'no step and no example speaks of a PhD or an application deadline');
  // 2. the reply written, the plan ticked, the page written into the tour's app and run beside the conversation
  await p.evaluate(i => tourJump(i), idx.build); await sleep(2200);
  const mid = await p.evaluate(() => { const b = curChat().messages[1]; return { live: !!(b && b.live), done: b && b.plan ? b.plan.tasks.filter(x => x.s === 'done').length : -1 }; });
  ok(mid.live && mid.done >= 0 && mid.done < 4, 'the reply is being written, its plan ticked as it goes', mid);
  await p.waitForFunction(() => { const pr = (state.projects || []).find(x => x.__tour); return pr && pr.files && pr.files.some(f => f.name === 'index.html' && f.ref); }, null, { timeout: 30000 }).catch(() => {});
  await sleep(2500);
  const done = await p.evaluate(() => { const c = curChat(), b = c.messages[1], pr = (state.projects || []).find(x => x.__tour), f = pr && pr.files.find(x => x.name === 'index.html');
    const fr = [...document.querySelectorAll('iframe')].filter(x => x.offsetParent && /Breathe/.test(x.srcdoc || ''))[0];
    return { live: !!b.live, plan: b.plan.tasks.map(x => x.s).join(','), edits: (b.edits || []).map(e => e.file + ':' + e.ok), file: !!f, size: f && f.size, versions: pr && pr.versions.length, frame: !!fr }; });
  ok(!done.live && done.plan === 'done,done,done,done', 'the reply is finished and every task of the plan ticked', done);
  ok(done.file && done.size > 1000 && done.edits.join() === 'index.html:1' && done.versions === 1, 'the reply\'s edit wrote the page into the tour\'s app, kept as a version, as a model\'s reply does', done);
  ok(done.frame, 'the app runs beside the conversation', done);
  await p.screenshot({ path: OUT + '/tour_code_app.png' });
  // 3. the tour ends: its app and session are gone, hers as they were
  await p.evaluate(() => { try { tourEnd(); } catch (e) {} }); await sleep(800);
  const after = await p.evaluate(() => ({ chats: (state.chats || []).length, projects: (state.projects || []).length, tourChat: (state.chats || []).some(c => c.__tourCode), tourProject: (state.projects || []).some(p => p.__tour) }));
  ok(!after.tourChat && !after.tourProject && after.chats === before.chats && after.projects === before.projects, 'when the tour ends, its app and its session are removed; hers are as they were', { before, after });
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
