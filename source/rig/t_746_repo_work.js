// Ingenium 7.46: Fabrica's plan, stage 1 (modules/r333.js, r110's commitTo, r141's newPull), in Chromium on a built page. Invented apps only.
//   1. the engine: commitTo keeps a version on a branch of its own, and the branch out and its working copy are not touched
//   2. Code on a Fabrica app, from the branch she chose: the project opens with the files of that branch (not the one out), linked by pr.fab
//   3. what changed is known file by file; Review and keep is r219's own sheet, raised, with its files, lines and branch
//   4. kept on the session's branch; main and the working copy unchanged; then nothing left to keep
//   5. Create pull request: one in Fabrica, from the session's branch into main, open, waiting for her yes
//   6. the model's tools: fabrica_status, fabrica_diff, keep_version, open_pull_request offered in that session only; in a plain conversation
//      that reads a repository, repo_files and repo_read only, and the working loop runs there
//   7. the doors: Code's start window says From Fabrica works on a branch of its own; A repository lists the apps and their branches;
//      Chat's + menu offers A repository; the keys and rows lift under the pointer
//   node rig/t_746_repo_work.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; return !!c; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 240)));
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1200);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
    // ---------------------------------------------------------------- 1. the engine
    const e1 = await p.evaluate(async () => { const enc = (s) => new TextEncoder().encode(s); IngRepo.setAuthor({ name: 'Ada', email: '' });
      const a = await IngRepo.fromFiles([{ path: 'index.html', data: enc('<!doctype html><title>Tide Clock</title><h1>Tide Clock</h1>\n') }, { path: 'app/tide.js', data: enc('function next(){\n  return 6;\n}\n') }, { path: 'README.md', data: enc('# Tide Clock\n') }], { name: 'tide-clock', desc: 'The tides, offline' });
      await IngRepo.branch(a.id, 'evening'); await IngRepo.switchTo(a.id, 'evening'); await IngRepo.put(a.id, 'app/tide.js', enc('function next(){\n  return 7;\n}\n')); await IngRepo.commit(a.id, 'Evening tides');
      /* the branch out stays 'evening'; a change waits in its working copy, unkept */
      await IngRepo.put(a.id, 'README.md', enc('# Tide Clock\n\nA note not kept yet.\n'));
      const before = await IngRepo.info(a.id), st0 = await IngRepo.status(a.id);
      const oid = await IngRepo.commitTo(a.id, 'ingenium/engine-check', [{ path: 'docs/a.md', data: enc('# A\n') }], 'An engine check', { from: 'main' });
      const after = await IngRepo.info(a.id), st1 = await IngRepo.status(a.id), onIt = await IngRepo.readText(a.id, 'docs/a.md', 'ingenium/engine-check'), onMain = await IngRepo.readText(a.id, 'docs/a.md', 'main');
      const log = await IngRepo.log(a.id, { ref: 'ingenium/engine-check', max: 3 });
      let refused = ''; try { await IngRepo.commitTo(a.id, 'evening', [{ path: 'x.md', data: enc('x') }], 'no'); } catch (e) { refused = e.message; }
      window.__t746 = a.id;
      return { id: a.id, oid: /^[0-9a-f]{40}$/.test(oid), out: [before.branch, after.branch], head: before.head === after.head, work: st0.changes.length === st1.changes.length && st1.changes.length === 1, onIt, onMain, parent: log[1] && log[1].title, refused }; });
    ok(e1.oid && e1.onIt === '# A\n' && e1.onMain === null && !!e1.parent, '1. commitTo keeps a version on a branch of its own, made from main', e1);
    ok(e1.out[0] === 'evening' && e1.out[1] === 'evening' && e1.head && e1.work, '   the branch out, its last version and its unkept change are not touched', e1);
    ok(/branch out in Fabrica/.test(e1.refused), '   and it refuses the branch that is out (that one keeps through Fabrica itself)', e1.refused);
    // ---------------------------------------------------------------- 2. Code on a Fabrica app, from main
    await p.evaluate(() => IngRepoWork.openFab(window.__t746, 'main')); await p.waitForTimeout(2500);
    const e2 = await p.evaluate(() => { const pr = ccProj(), F = pr && pr.fab, f = (pr.files || []).filter((x) => x.name === 'app/tide.js')[0];
      return { name: pr && pr.name, base: F && F.base, repo: F && F.repo === window.__t746, work: F && F.work, code: ccIsCode(curChat()), tide: f && f.text, files: (pr.files || []).map((x) => x.name).sort() }; });
    ok(e2.repo && e2.base === 'main' && e2.work === null && e2.code && /return 6/.test(e2.tide || '') && e2.files.indexOf('docs/a.md') < 0, '2. Code opens the app from main (not the branch out), as a session linked by its Fabrica record', e2);
    // ---------------------------------------------------------------- 3. what changed, and Review and keep
    await p.evaluate(async () => { const pr = ccProj(), f = pr.files.filter((x) => x.name === 'app/tide.js')[0]; await ccPut(f, 'function next(){\n  return 6.5;\n}\n'); pr.files.push({ name: 'app/moon.js', ref: null, size: 0 }); await ccPut(pr.files[pr.files.length - 1], 'function moon(){ return "full"; }\n'); });
    const e3 = await p.evaluate(async () => { const ch = await IngRepoWork.changes(ccProj()); return ch.map((x) => x.how + ' ' + x.path); });
    ok(e3.length === 2 && e3.indexOf('changed app/tide.js') >= 0 && e3.indexOf('new app/moon.js') >= 0, '3. what changed is known file by file', e3);
    await p.evaluate(() => IngRepoWork.keepSheet(ccProj())); await p.waitForSelector('.fbx.r333x #r333F .f-frow', { timeout: 15000 }); await p.waitForTimeout(900);
    const e3b = await p.evaluate(() => { const s = document.querySelector('.fbx.r333x .f-sheet'); return { h: s.querySelector('h3').textContent, files: [...s.querySelectorAll('#r333F .f-frow .p')].map((x) => x.textContent), nums: [...s.querySelectorAll('#r333F .f-frow .a')].map((x) => x.textContent), br: (s.querySelector('input#r333Br') || {}).value, go: s.querySelector('#r333Go').textContent, diff: !!s.querySelector('.f-diff .f-dcode .f-dl.add') }; });
    ok(e3b.h === 'Review and keep' && e3b.files.length === 2 && e3b.nums.length === 2 && /^ingenium\//.test(e3b.br || '') && e3b.go === 'Keep this version' && e3b.diff, '   Review and keep, in Fabrica\'s own sheet and Changes view: its files with their lines, the diff, the branch of its own, Keep this version', e3b);
    const lift = await p.evaluate(() => { const k = document.querySelector('.fbx.r333x #r333Go'); return k.getBoundingClientRect().top; }); await p.hover('.fbx.r333x #r333Go'); await p.waitForTimeout(450);
    const lift2 = await p.evaluate(() => document.querySelector('.fbx.r333x #r333Go').getBoundingClientRect().top);
    ok(lift - lift2 >= 1, '   its key lifts under the pointer', { lift: lift - lift2 });
    await p.screenshot({ path: path.join(OUT, 'review_and_keep.png') });
    await p.fill('.fbx.r333x input#r333Br', 'ingenium/half-tides'); await p.click('.fbx.r333x #r333Go'); await p.waitForTimeout(2500);
    // ---------------------------------------------------------------- 4. kept on the session's branch
    const e4 = await p.evaluate(async () => { const id = window.__t746, F = ccProj().fab; const info = await IngRepo.info(id);
      return { work: F.work, head: !!F.head, onBr: await IngRepo.readText(id, 'app/moon.js', 'ingenium/half-tides'), onMain: await IngRepo.readText(id, 'app/tide.js', 'main'), out: info.branch, st: (await IngRepo.status(id)).changes.length, left: (await IngRepoWork.changes(ccProj())).length,
        pr: !!document.querySelector('.fbx.r333x #r333G2') }; });
    ok(e4.work === 'ingenium/half-tides' && e4.head && /full/.test(e4.onBr || '') && /return 6;/.test(e4.onMain || '') && e4.out === 'evening' && e4.st === 1 && e4.left === 0, '4. kept on ingenium/half-tides; main, the branch out and its working copy unchanged; nothing left to keep', e4);
    // ---------------------------------------------------------------- 5. the pull request in Fabrica
    ok(e4.pr, '5. then Create pull request is offered at once');
    await p.click('.fbx.r333x #r333G2'); await p.waitForTimeout(1800);
    const e5 = await p.evaluate(async () => { const rec = await fbHub.live(window.__t746); const it = (rec.pulls || []).filter((x) => x.from === 'ingenium/half-tides')[0]; return { it: it && { n: it.n, to: it.to, state: it.state, head: !!it.lastHead }, pr: ccProj().fab.pr }; });
    ok(e5.it && e5.it.to === 'main' && e5.it.state === 'open' && e5.it.head && e5.pr && e5.pr.n === e5.it.n, '   a pull request in Fabrica, from the session\'s branch into main, open and waiting for her yes', e5);
    // ---------------------------------------------------------------- 6. the model's tools
    const e6 = await p.evaluate(async () => { const inCode = IngAgent.toolsFor(false, {}).map((t) => t.name);
      const st = await IngAgent.exec(null, 'fabrica_status', {}, {}).catch((e) => ({ text: 'ERR ' + e.message }));
      try { go('chat'); } catch (e) {} document.getElementById('chatNew').click(); const c = curChat(); IngRepoWork.tieChat({ kind: 'fabrica', repo: window.__t746, name: 'tide-clock', branch: 'main' });
      const inChat = IngAgent.toolsFor(false, {}).map((t) => t.name), files = await IngAgent.exec(null, 'repo_files', {}, {}).catch((e) => ({ text: 'ERR ' + e.message })), read = await IngAgent.exec(null, 'repo_read', { file: 'app/tide.js' }, {}).catch((e) => ({ text: 'ERR ' + e.message }));
      const loops = await IngAgent.wsFor(null).catch(() => null);
      return { inCode: ['fabrica_status', 'fabrica_diff', 'keep_version', 'fabrica_pull_request'].filter((n) => inCode.indexOf(n) >= 0), codeNoRepo: inCode.indexOf('repo_files') < 0, st: String(st && st.text || st).slice(0, 160),
        inChat: ['repo_files', 'repo_read'].filter((n) => inChat.indexOf(n) >= 0), chatNoFab: inChat.indexOf('keep_version') < 0, files: String(files && files.text || files).slice(0, 120), read: String(read && read.text || read).slice(0, 80), loops: !!(loops && loops.connectorsOnly), sys: /reads the repository tide-clock/.test(chatSystemPrompt() || '') }; });
    ok(e6.inCode.length === 4 && e6.codeNoRepo && /session branch ingenium\/half-tides/.test(e6.st) && /pull request #\d+ \(open\)/.test(e6.st), '6. in that Code session the model has fabrica_status, fabrica_diff, keep_version and fabrica_pull_request', e6);
    ok(e6.inChat.length === 2 && e6.chatNoFab && /files on main/.test(e6.files) && /return 6;/.test(e6.read) && e6.loops && e6.sys, '   a plain conversation that reads it: repo_files and repo_read only, the working loop runs, and the model is told', e6);
    // ---------------------------------------------------------------- 7. the doors
    await p.evaluate(() => { try { closeModal(); } catch (e) {} go('code'); }); await p.waitForTimeout(600);
    await p.evaluate(() => ccWelcome()); await p.waitForTimeout(700);
    const e7 = await p.evaluate(() => { const f = document.querySelector('#modalBox .cc-start [data-a="fabrica"]'), g = document.querySelector('#modalBox .cc-start [data-a="github"]'); return { fab: f && f.textContent, gh: !!g }; });
    ok(/branch of its own/.test(e7.fab || '') && e7.gh, '7. Code\'s start window: From Fabrica works on a branch of its own, beside From GitHub', e7);
    await p.click('#modalBox .cc-start [data-a="fabrica"]'); await p.waitForSelector('.fbx.r333x #r333List .f-opt', { timeout: 15000 }); await p.waitForTimeout(500);
    const e7b = await p.evaluate(() => { const s = document.querySelector('.fbx.r333x .f-sheet'); return { h: s.querySelector('h3').textContent, tabs: [...s.querySelectorAll('.f-seg [data-t]')].map((x) => x.textContent), rows: [...s.querySelectorAll('#r333List .f-opt b')].map((x) => x.textContent) }; });
    ok(e7b.h === 'A repository' && e7b.tabs.join('|') === 'Fabrica|GitHub' && e7b.rows.indexOf('tide-clock') >= 0, '   A repository, in Fabrica\'s own sheet: Fabrica and GitHub, the apps listed', e7b);
    // 7.46: the sheet lies over the window, in view, without scrolling the page (r333's frame; a copied rule once swallowed it, and the sheet lay at the page's foot)
    const e7f = await p.evaluate(() => { const root = document.querySelector('.fbx.r333x'), s = root.querySelector('.f-sheet'), r = s.getBoundingClientRect(), mid = document.elementFromPoint(r.left + r.width / 2, r.top + 12);
      return { pos: getComputedStyle(root).position, top: Math.round(r.top), bottom: Math.round(r.bottom), h: innerHeight, scroll: Math.round(document.scrollingElement.scrollTop), onTop: !!(mid && s.contains(mid)) }; });
    ok(e7f.pos === 'fixed' && e7f.top >= 0 && e7f.bottom <= e7f.h && e7f.onTop, '   the sheet lies over the window, in view, on top of the page', e7f);
    const r0 = await p.evaluate(() => [...document.querySelectorAll('#r333List .f-opt')].find((x) => /tide-clock/.test(x.textContent)).getBoundingClientRect().top);
    await p.hover('#r333List .f-opt'); await p.waitForTimeout(450);
    const r1 = await p.evaluate(() => [...document.querySelectorAll('#r333List .f-opt')].find((x) => /tide-clock/.test(x.textContent)).getBoundingClientRect().top);
    await p.screenshot({ path: path.join(OUT, 'a_repository.png') });
    await p.evaluate(() => [...document.querySelectorAll('#r333List .f-opt')].find((x) => /tide-clock/.test(x.textContent)).click()); await p.waitForSelector('#r333Br .f-opt', { timeout: 15000 });
    const e7c = await p.evaluate(() => [...document.querySelectorAll('#r333Br .f-opt')].map((x) => x.textContent.replace(/\s+/g, ' ').trim()));
    ok(r0 - r1 >= 1 && e7c.length === 4 && /^⑂?\s*evening ?Out in Fabrica now/.test(e7c[0]), '   each row lifts under the pointer; the app\'s branches, the one out first', { lift: r0 - r1, e7c });
    await p.evaluate(() => { try { closeModal(); } catch (e) {} go('chat'); document.getElementById('chatNew').click(); }); await p.waitForTimeout(500);
    const e7d = await p.evaluate(() => { try { paintPlus(); } catch (e) {} const m = document.getElementById('chatPlusMenu'); const it = m && m.querySelector('.r333-pm'); return it ? it.textContent.replace(/\s+/g, ' ').trim() : null; });
    ok(/A repository/.test(e7d || ''), '   Chat\'s + menu offers A repository', e7d);
  } catch (e) { ok(false, 'the run finished', e.message); }
  ok(errs.length === 0, 'no page error', errs.slice(0, 5));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
