// Effort wherever a model is chosen (Ingenium 6.17, modules/r225.js, r190.js, r215.js and two edits in build_page.py). Her words
// (3 November 2026): "I want to be able to select low to Max effort and Ultracode inside of the chats and everywhere a model can be
// selected to run a task or do work inside of Ingenium." Lector, the Career Studio and Folders share one writing effort; Build has its
// own. The connection, the engine on the device and the Claude service are stand-ins; the texts are invented.
//   node rig/t_617_effort.js <Ingenium page url> <mock server url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, MOCK, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1400))); c ? pass++ : fail++; };
const http = (method, path) => fetch(MOCK + path, { method }).then(r => r.json());
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 980 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(900);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });

  /* stand-ins: a connection that records what each request carries, and replies as asked */
  await p.evaluate(() => { window.__calls = []; window.__saved = { supUsesLink: window.supUsesLink, ensureCloudModel: window.ensureCloudModel, cloudChat: window.cloudChat };
    window.__reply = (msgs) => { const last = String(msgs[msgs.length - 1].content || ''); const sys = String((msgs[0] || {}).content || '');
      if (/^Now check what you wrote/.test(last)) return window.__fix || 'The corrected section: the archive holds 120 letters from 1890 to 1910, catalogued by the author in 2024.';
      if (/^You are Lector, a careful reader/.test(sys)) return 'Main points:\n- a note on this part';
      return window.__draft || 'The archive holds 120 letters from 1890 to 1910, catalogued by the author in 2024, and a medal from 1999.'; };
    window.supUsesLink = () => true; window.ensureCloudModel = () => Promise.resolve();
    window.cloudChat = function (msgs, on, th, ab) { window.__calls.push({ effort: ab && ab.effort, think: ab && ab.think, maxTok: ab && ab.maxTok, n: msgs.length, sys: String((msgs[0] || {}).content || ''), last: String(msgs[msgs.length - 1].content || '').slice(0, 60) });
      on(window.__reply(msgs)); return Promise.resolve(); }; });
  const READ = [{ role: 'system', content: 'You are Lector, a careful reader working inside Ingenium.' }, { role: 'user', content: 'Write notes on this part.' }];
  const WRITE = [{ role: 'system', content: 'You are Lector, writing a document for its owner.' }, { role: 'user', content: 'Write the section "Context" about the invented archive, from this material: the archive holds 120 letters from 1890 to 1910, catalogued by the author in 2024.' }];
  const ask = (lv, msgs) => p.evaluate(async ([lv, msgs]) => { IngWriteEffort.set(lv); window.__calls = []; const out = await lxAsk({ modelId: null }, msgs, 900, 0.2, () => {}); return { out, calls: window.__calls }; }, [lv, msgs]);

  /* 1. through a connection */
  let r = await ask('auto', READ), w = await ask('auto', WRITE);
  ok(r.calls.length === 1 && r.calls[0].effort === 1 && r.calls[0].think === false && w.calls[0].effort === 3 && w.calls[0].think === true && w.calls[0].maxTok >= 8192,
    'Auto, through a connection: reading at Low without thinking, writing at High with thinking and its room', { r: r.calls, w: w.calls });
  ok(/THE OWNER'S MANNER/.test(w.calls[0].sys), 'the wrappers below it still work: the guard against writing that repeats itself adds its manner', w.calls[0].sys.slice(-200));
  const lo = await ask('1', WRITE), mx = await ask('5', WRITE);
  ok(lo.calls[0].effort === 1 && lo.calls[0].think === false && mx.calls[0].effort === 5 && mx.calls[0].think === true && mx.calls[0].maxTok >= 32768, 'Low and Max are what they say: the level, the thinking and the room', { lo: lo.calls, mx: mx.calls });
  /* 2. Ultra: the piece checked against its material, and corrected */
  const ul = await ask('ultra', WRITE);
  ok(ul.calls.length === 2 && ul.calls[0].effort === 5 && /^Now check what you wrote/.test(ul.calls[1].last) && ul.calls[1].n === 4 && /The corrected section/.test(ul.out) && !/medal/.test(ul.out),
    'Ultra writes at Max, then checks the piece against its own material and keeps the correction', { calls: ul.calls, out: ul.out });
  const ur = await ask('ultra', READ);
  ok(ur.calls.length === 1, 'reading is never checked twice: only what is written is', ur.calls);
  await p.evaluate(() => { window.__draft = '{"crit":[{"text":"Cataloguing","st":"met"}],"strengths":["letters"]}'; window.__fix = 'Here is the corrected JSON: {"crit":[]}'; });
  const uj = await ask('ultra', WRITE);
  ok(uj.out === '{"crit":[{"text":"Cataloguing","st":"met"}],"strengths":["letters"]}', 'a correction that breaks the form asked for (here, JSON) is not taken: the first piece stays', uj.out);
  await p.evaluate(() => { window.__draft = 'SUMMARY:\nThe invented archive is catalogued.\nDECISIONS:\n- keep the letters together'; window.__fix = 'The invented archive is catalogued, and the letters stay together.'; });
  const us = await ask('ultra', WRITE);
  ok(/^SUMMARY:/.test(us.out) && /DECISIONS:/.test(us.out), 'nor one that loses the headings asked for', us.out);
  await p.evaluate(() => { delete window.__draft; delete window.__fix; });

  /* 3. on this device */
  const dev = await p.evaluate(async () => { const gen = []; const S = { lxUsesCloud: window.lxUsesCloud, lxModel: window.lxModel, lxReady: window.lxReady, ingEnsureLoaded: window.ingEnsureLoaded, gen: Engine.generate, status: Engine.status };
    window.supUsesLink = () => false; window.lxUsesCloud = () => false; window.lxModel = () => ({ id: 'inv', name: 'Invented 8B', paramB: 8, fileState: 'ready' }); window.lxReady = () => true; window.ingEnsureLoaded = () => Promise.resolve();
    Engine.status = 'ready'; Engine.generate = function (job) { gen.push(Object.assign({}, job.params)); job.onToken('A paragraph written on this device about the invented archive, long enough to be a piece.'); return Promise.resolve({}); };
    const W2 = [{ role: 'system', content: 'You are Lector, writing a document for its owner.' }, { role: 'user', content: 'Write a section.' }];
    const out = {}; for (const lv of ['auto', '1', '3', '5']) { IngWriteEffort.set(lv); gen.length = 0; await lxAsk({ modelId: 'inv' }, W2, 900, 0.2, () => {}); out[lv] = gen.map(g => ({ th: g.thinking, b: g.thinking_budget || 0, mt: g.max_tokens, t: g.temperature })); }
    window.lxUsesCloud = S.lxUsesCloud; window.lxModel = S.lxModel; window.lxReady = S.lxReady; window.ingEnsureLoaded = S.ingEnsureLoaded; Engine.generate = S.gen; Engine.status = S.status; window.supUsesLink = () => true; return out; });
  ok(dev.auto[0].th === false && dev['1'][0].th === false && dev['3'][0].th === true && dev['3'][0].b === 3072 && dev['3'][0].mt === 900 + 3072 && dev['5'][0].b === 12288 && dev['3'][0].t === 0.2,
    'on this device: Auto and Low stay quick; High and Max think, with a thinking room by the model\'s size added to the writing room, at the temperature asked', dev);

  /* 4. one choice, beside the model, on each page that uses it */
  await p.evaluate(() => IngWriteEffort.set('auto'));
  const pages = {};
  for (const pg of ['lector', 'career']) { await p.evaluate((pg) => go(pg), pg); await p.waitForTimeout(700); pages[pg] = await p.evaluate(() => { const w = [...document.querySelectorAll('.wef')].filter(x => x.offsetParent); return w.map(x => x.getAttribute('data-wef') + ':' + x.querySelector('select').value); }); }
  await p.evaluate(() => { IngFolders.make('Invented archive app'); go('folders'); try { IngFolders.paint(); } catch (e) {} });
  await p.waitForTimeout(500);
  pages.folders = await p.evaluate(() => { const card = [...document.querySelectorAll('#page-folders .fld-card')].filter(x => !x.classList.contains('fld-new') && /Invented archive app/.test(x.textContent))[0]; if (card) card.click(); return null; });
  await p.waitForTimeout(500);
  pages.folders = await p.evaluate(() => [...document.querySelectorAll('#page-folders .wef')].filter(x => x.offsetParent).map(x => x.getAttribute('data-wef') + ':' + x.querySelector('select').value));
  ok(/^lector:auto$/.test((pages.lector || []).join()) && /^career:auto$/.test((pages.career || []).join()), 'Lector and the Career Studio show the writing effort beside their model', pages);
  ok(/^folders:auto$/.test((pages.folders || []).join()), 'and Folders, beside Bring it up to date', pages.folders);
  await p.evaluate(() => go('career')); await p.waitForTimeout(400);
  await p.selectOption('#cs .wef select', '4'); await p.waitForTimeout(200);
  const shared = await p.evaluate(() => { go('lector'); return new Promise(r => setTimeout(() => r({ st: state.wEff, lx: (document.querySelector('#l7Model .wef select') || {}).value, say: (document.querySelector('#l7Model .wef .wef-say') || {}).textContent }), 500)); });
  ok(shared.st === '4' && shared.lx === '4' && /Shared by Lector, Vocatio and Folders/.test(shared.say), 'chosen in one, it is the choice in all three, as their model is', shared);
  await p.screenshot({ path: OUT + '/lector_effort.png' });

  /* 5. Build: an effort of its own, Ultracode among them, carried by every request */
  await p.evaluate(([base]) => { window.cloudChat = window.__saved.cloudChat; window.supUsesLink = window.__saved.supUsesLink; window.ensureCloudModel = window.__saved.ensureCloudModel;
    state.cloud = { provider: 'anthropic', base, key: 'test-key', model: 'claude-opus-5-5', models: ['claude-opus-5-5'], on: true }; state.chatSource = 'cloud'; state.thinking = false; saveState(); }, [MOCK]);
  const PAGE = '<!doctype html>\n<html>\n<head><title>Greeting</title></head>\n<body>\n<h1 id="title"></h1>\n<script>\nfunction greet(n){document.getElementById("title").textContent="Hello, "+n+"!";}\ngreeet("world");\n</script>\n</body>\n</html>\n';
  await p.evaluate(pg => { go('build'); const ce = document.getElementById('codeEditor'); ce.value = pg; ce.dispatchEvent(new Event('input', { bubbles: true })); runBuild(); }, PAGE); await p.waitForTimeout(800);
  const bo = await p.evaluate(() => { const s = document.querySelector('#agBuild .agb-effsel'); return s ? { opts: [...s.options].map(o => o.textContent), v: s.value, say: document.querySelector('#agBuild .agb-effsay').textContent } : null; });
  ok(bo && bo.opts.join() === 'Auto,Low,Medium,High,Extra,Max,Ultracode' && bo.v === 'auto' && /never Max/.test(bo.say), 'Build has its own effort, beside How should it work: Auto, Low to Max, and Ultracode', bo);
  for (const [lv, want, tools] of [['1', 'low', false], ['ultra', 'max', true]]) {
    await http('POST', '/reset'); await p.selectOption('#agBuild .agb-effsel', lv); await p.click('#agBuild .agb-ways button[data-way="auto"]');
    await p.fill('#agBuild textarea.agb-in', 'Make the page greet the gardener instead of the world.'); await p.click('#agBuild .agb-go');
    await p.waitForFunction(() => !IngAgent.build.state.busy, null, { timeout: 120000 }).catch(() => {}); await p.waitForTimeout(400);
    const rep = await http('GET', '/report'); const q = (rep.requests || [])[0] || {};
    const said = await p.evaluate(() => { const e = document.querySelector('#agBuild .eff-says'); return e ? e.textContent : ''; });
    ok(q.effort === want && (tools ? q.tools.includes('update_plan') && q.tools.includes('run_check') : !q.tools.includes('update_plan')) && (lv !== 'ultra' || /Ultracode, at Max effort/.test(said)),
      'Build\'s request carries its effort: ' + (lv === 'ultra' ? 'Ultracode at Max, with the plan and the checks' : 'Low, without them'), { lv, effort: q.effort, tools: q.tools, said });
    await p.evaluate(() => { const u = document.querySelector('#agBuild .agb-undo'); if (u && !u.closest('[hidden]')) u.click(); });
  }
  await p.evaluate(() => { document.getElementById('agBuild').scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(300); await p.screenshot({ path: OUT + '/build_effort.png' });

  /* the invented page's own mistake (greeet, the bug Build is asked to fix) is the page's, not Ingenium's */
  const own = errs.filter(e => !/greeet is not defined/.test(e));
  ok(!own.length, 'no errors on the page (besides the invented page\'s own mistake, which Build is asked to fix)', own);
  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})();
