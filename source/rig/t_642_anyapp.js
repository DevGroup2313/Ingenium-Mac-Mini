// node rig/t_642_anyapp.js <Ingenium page url (master)> <out dir> [<full edition url>]
// Any app, not only her four (Ingenium 6.42; modules/r240.js, r108.js, r239.js, r112.js, r142.js). Her words (6 November 2026): "I need
// for Lector and every other page inside of Ingenium to be able to take other apps ... Lector should be able to read and analyse and process
// any app inside of Ingenium." And: "Yes, I want Lector to take any app, kept under its own name, read, written about, and shown with its
// own 3D logo", "it should also recognise the Offline Project". The apps are invented here; the model is a stand-in for Lector's asks.
// Checks: two invented apps (one with a logo, a version and a colour; one with none) and the Offline Project's page in both variations are
// kept through Add your apps, each under its own name; the library lists her four, then the Offline Project, then the others by name; in
// Lector each has its tile, a logo in 3D, a seal of its initials, the Offline Project's live crests; a set with another app in it is not
// named as the Offline Project; Lector reads the invented app and writes its documents, on a paper in its own colour with its logo on the
// cover; the chat's + menu, Fabrica's library and Storage name it; the full edition takes other apps but not the Offline Project's keys,
// and keeps a page of an app it does not list by key as any other app; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3], FULL = process.argv[4]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#1f6f8b"/><path d="M20 60 Q35 40 50 60 T80 60" stroke="#ffd66b" stroke-width="7" fill="none"/></svg>';
const TIDE = '<!doctype html><html><head><meta charset="utf-8"><title>Tide Clock 2.1</title><meta name="theme-color" content="#1f6f8b"><meta name="version" content="2.1">' +
  '<link rel="icon" href="data:image/svg+xml,' + encodeURIComponent(SVG) + '"></head><body><h1>Tide Clock</h1><p>Shows the next high and low tide for a harbour, from a table kept on the device.</p>' +
  '<button id="next">Next tide</button><script>/* the harbour table */ var TABLE=[["06:12","high"],["12:30","low"]]; function nextTide(){return TABLE[0];} function fmt(t){return t[0]+" "+t[1];} document.getElementById("next").onclick=function(){alert(fmt(nextTide()));};<\/script></body></html>';
const LAMP = '<!doctype html><html><head><meta charset="utf-8"></head><body><h1>Ledger Lamp</h1><p>A small household ledger.</p><script>function add(a,b){return a+b;}<\/script></body></html>';
const OP4 = '<!doctype html><html><head><meta charset="utf-8"><title>The Offline Project</title></head><body><div id="crest"></div><script>var BUILD = {"preview": false, "app": true, "apps": {}}<\/script></body></html>';
const OP3 = '<!doctype html><html><head><meta charset="utf-8"><title>The Offline Project</title></head><body><div id="crest"></div><script>var BUILD = {"preview": false, "app": true, "apps": {}, "without": ["inkwell"]}<\/script></body></html>';
const CDP = '<!doctype html><html><head><meta charset="utf-8"><title>Carpe Diem</title></head><body><h1>A stand-in page</h1><script>window.CD_BUILD = {pass: "1058"};<\/script></body></html>';
const boot = async (ctx, url) => { const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message.slice(0, 200)));
  await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500); return p; };
const add = (p, files) => p.evaluate(async (files) => { const fs = files.map(f => new File([f[1]], f[0], { type: 'text/html' })); await libAddFiles(fs); return window.__libLastAdd; }, files);
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await boot(ctx, URL_);
  // 1. kept through Add your apps
  const added = await add(p, [['tide-clock.html', TIDE], ['ledger.html', LAMP], ['The Offline Project.html', OP4], ['op-three.html', OP3]]);
  const lib = await p.evaluate(() => { const A = libState().apps; const pick = k => A[k] ? { title: A[k].title, version: A[k].version, color: A[k].color || '', other: !!A[k].other } : null;
    return { tide: pick('app-tide-clock'), lamp: pick('app-ledger-lamp'), op: pick('offline'), op3: pick('offline3'), keys: libKeys().filter(k => A[k] && A[k].ref) }; });
  ok(lib.tide && lib.tide.title === 'Tide Clock' && lib.tide.version === '2.1' && lib.tide.color === '#1f6f8b' && lib.tide.other, 'an app of her own is kept under its own name, with its version and its colour', { lib: lib.tide, added });
  ok(lib.lamp && lib.lamp.title === 'Ledger Lamp' && lib.lamp.version === '', 'a page with no title is named from its first heading', lib.lamp);
  ok(lib.op && lib.op.title === 'The Offline Project' && lib.op3 && lib.op3.title === 'The Offline Project without Inkwell', 'the Offline Project is recognised, in both variations', { op: lib.op, op3: lib.op3 });
  const order = lib.keys.join(',');
  ok(/^((cd|forge|inkwell|ingenium),)*offline,offline3,app-ledger-lamp,app-tide-clock$/.test(order), 'the library lists her four first, then the Offline Project, then the others by name', order);
  // 2. Lector: a tile for each, with its own seal
  await p.evaluate(() => { go('lector'); }); await p.waitForTimeout(2500);
  const tiles = await p.evaluate(() => { const t = {}; [...document.querySelectorAll('#l7Bf .l-app')].forEach(x => { const k = x.getAttribute('data-k');
      t[k] = { nm: (x.querySelector('.nm') || {}).textContent, st: (x.querySelector('.st') || {}).textContent, layers: x.querySelectorAll('img.ls-l').length, crest: x.querySelector('.ing-crest') ? (x.querySelector('.ing-crest').classList.contains('ic-master') ? 'master' : x.querySelector('.ing-crest').classList.contains('ic-trio') ? 'trio' : 'other') : '', quarters: !!x.querySelector('.ing-crest.ic-quarters') }; }); return t; });
  ok(tiles['app-tide-clock'] && tiles['app-tide-clock'].nm === 'Tide Clock' && /2\.1/.test(tiles['app-tide-clock'].st) && tiles['app-tide-clock'].layers === 3, 'in Lector the app has its tile, named, with its version, and its logo in 3D (its edge, the logo, a sheen)', tiles['app-tide-clock']);
  ok(tiles['app-ledger-lamp'] && tiles['app-ledger-lamp'].layers >= 1, 'an app with no logo wears a seal of its initials, in the same layers', tiles['app-ledger-lamp']);
  // 6.43, her words: "I don't want two new Offline project seal logo added to the Lector page, instead I want for when I select all 4
  // apps of the Offline Project the master shield seal of the app appears and when I select only apps the master shield of the Offline
  // Project still appears with three quadrants of the selected 3 apps and so forth." No tile of its own (6.42 had two); the set chosen
  // wears its crest, drawn from the apps Ingenium keeps now
  ok(!tiles.offline && !tiles.offline3, 'Lector shows no tile of the Offline Project\'s own, though the library holds its page (6.43)', Object.keys(tiles));
  const crests = await p.evaluate(async () => {
    const wait = (ms) => new Promise(r => setTimeout(r, ms)); const B = () => lxState().brief.apps.slice();
    /* her four in the library: the three carried apps and this copy of Ingenium, as the first start keeps them */
    try { await IngBuiltin.seed(); } catch (e) {} go('home'); await wait(300); go('lector'); await wait(1500);
    const tile = (k) => document.querySelector('#l7Bf .l-app[data-k="' + k + '"]');
    const crest = () => { const c = document.querySelector('#l7Bf .l-crest'); return c ? (c.classList.contains('ic-master') ? 'master' : c.classList.contains('ic-trio') ? 'trio' : c.classList.contains('ic-duo') ? 'duo' : 'other') + (c.classList.contains('ic-quarters') ? '+q' : '') : ''; };
    const choose = async (set) => { for (const k of set) if (B().indexOf(k) < 0 && tile(k)) { tile(k).click(); await wait(250); }
      for (const k of B()) if (set.indexOf(k) < 0 && tile(k)) { tile(k).click(); await wait(250); } await wait(600); return { set: B(), crest: crest() }; };
    const four = ['cd', 'forge', 'ingenium', 'inkwell'].filter(k => tile(k) && !tile(k).classList.contains('none'));
    const out = { four };
    if (four.length === 4) out.all = await choose(four);
    if (four.length >= 3) out.three = await choose(four.slice(0, 3));
    if (four.length >= 2) out.two = await choose(four.slice(0, 2));
    out.one = await choose(four.slice(0, 1));
    return out; });
  ok(crests.four.length >= 3 && (!crests.all || /^master/.test(crests.all.crest)) && /^trio/.test(crests.three.crest) && /^duo/.test(crests.two.crest) && crests.one.crest === '',
    'choosing her apps gives the set its crest: all four the master seal, three the shield of three, two the duo\'s, one app none', crests);
  await p.screenshot({ path: OUT + '/lector-apps.png', clip: { x: 220, y: 160, width: 320, height: 720 } });
  // 3. the names of a set
  const names = await p.evaluate(() => { const L = IngLector, B = L.state().brief; const out = {};
    B.apps = ['app-tide-clock']; saveState(); lxRender(); out.one = (document.querySelector('#l7Bf .l-setname') || {}).textContent;
    B.apps = ['cd', 'app-tide-clock']; saveState(); lxRender(); out.two = (document.querySelector('#l7Bf .l-setname') || {}).textContent; out.twoCrest = !!document.querySelector('#l7Bf .l-setname .ing-crest');
    return out; });
  ok(/Tide Clock/.test(names.one) && /on its own/.test(names.one), 'chosen alone it is named as itself, on its own', names.one);
  ok(/Carpe Diem and Tide Clock/.test(names.two) && /2 apps together/.test(names.two) && !/duo|Offline Project/.test(names.two) && !names.twoCrest, 'a set with another app in it is "2 apps together": no duo, no crest, not the Offline Project', names);
  // 4. read and written about
  await p.evaluate(() => { const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^mfake/.test(m.id));
    state.models.push({ id: 'mfake4', customName: 'Stand-in 4B', fileState: 'ready', fileName: L['qwen3.5-4b'].file, stored: true });
    const B = IngLector.state().brief; B.apps = ['app-tide-clock']; B.depth = 'overview'; B.modelId = 'mfake4'; B.docs = { dossier: true, appendix: false, portfolio: false, cover: false, cv: false }; saveState();
    window.__asks = 0; lxAsk = function (run, msgs, maxTok, temp, onPiece) { window.__asks++; const sys = String(msgs[0].content || '');
      const out = /examiner of a draft/.test(sys) ? (String(msgs[1].content || '').split('THE DRAFT:\n')[1] || 'Tide Clock shows the next tide.') :
        'Tide Clock shows the next high and low tide for a harbour, from a table kept on the device. Its key Next tide reads the table; nextTide and fmt are its two functions.';
      if (onPiece) onPiece(out); return Promise.resolve(out); };
    lxRender(); });
  await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#l7BriefF button')].find(x => /Start reading|Write the documents/.test(x.textContent)); if (k) k.click(); });
  await p.waitForFunction(() => { const j = IngLector.state().job; return j && (j.status === 'done' || j.status === 'error'); }, null, { timeout: 180000 }).catch(() => {});
  const job = await p.evaluate(() => { const j = IngLector.state().job || {}; const run = lxState().runs.find(r => r.app === 'app-tide-clock'); return { status: j.status, err: j.err || '', apps: j.apps, run: run ? { status: run.status, name: run.name, total: run.total, done: run.done } : null, asks: window.__asks }; });
  ok(job.run && job.run.status === 'done' && job.run.name === 'Tide Clock' && job.run.total >= 1 && job.run.done === job.run.total, 'Lector reads the app in full, part by part, as it reads her apps', job);
  ok(job.status === 'done', 'and writes its documents', job);
  await p.waitForTimeout(800);
  const paper = await p.evaluate(() => { const d = document.querySelector('#l7Desk .l-paper'); if (!d) return null; const im = d.querySelector('.cv .seals img'); const s = ING_SEALS['app-tide-clock'];
    return { theme: [...d.classList].concat([...(d.closest('[class*="th-"]') || d).classList]).filter(c => /^th-/.test(c)), seal: im ? im.getAttribute('src').slice(0, 40) : '', sealIs: !!(s && im && im.getAttribute('src') === 'data:image/png;base64,' + s.b64), text: d.innerText.slice(0, 160) }; });
  ok(paper && paper.theme.indexOf('th-app-tide-clock') >= 0, 'its documents are set on a paper in its own colour', paper);
  ok(paper && paper.sealIs, 'with its own logo on the cover', paper);
  await p.screenshot({ path: OUT + '/lector-paper.png' });
  // 5. the chat's + menu, Fabrica's library, Storage
  const plus = await p.evaluate(() => { go('chat'); try { paintPlus('apps'); } catch (e) {} const t = (document.getElementById('chatPlusMenu') || {}).innerText || ''; try { closePlus(); } catch (e) {} return t; });
  ok(/Tide Clock 2\.1/.test(plus) && /Ledger Lamp/.test(plus) && /The Offline Project/.test(plus), 'the chat\'s + menu offers them among your apps', plus.slice(0, 300));
  const fab = await p.evaluate(() => (typeof libApps === 'function' ? libApps() : []).map(m => (m.title || m.key) + (m.version ? ' ' + m.version : '')));
  ok(fab.indexOf('Tide Clock 2.1') >= 0 && fab.indexOf('The Offline Project') >= 0, 'Fabrica\'s library and every page that lists the library list them', fab);
  const store = await p.evaluate(async () => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); if (window.IngSettingsParts) IngSettingsParts.show('data', 'storage'); await new Promise(r => setTimeout(r, 1500));
    return (document.getElementById('stxApps') || {}).innerText || ''; });
  ok(/Tide Clock/.test(store) && !/app-tide-clock/.test(store), 'Storage names it as itself', store.slice(0, 300));
  // 6. the full edition: other apps, not the Offline Project's keys
  if (FULL) { const ctxF = await b.newContext({ viewport: { width: 1440, height: 900 } }); const f = await boot(ctxF, FULL);
    await add(f, [['tide-clock.html', TIDE], ['The Offline Project.html', OP4], ['carpe.html', CDP]]);
    const fl = await f.evaluate(() => { const A = libState().apps; return { tide: !!(A['app-tide-clock'] && A['app-tide-clock'].ref), op: !!(A.offline && A.offline.ref), keys: libKeys(),
      cd: !!(A['app-carpe-diem'] && A['app-carpe-diem'].ref), cdHidden: !!(A.cd && A.cd.ref), listed: libApps().map(m => m.key) }; });
    ok(fl.tide && !fl.op && fl.keys.indexOf('offline') < 0, 'the full edition takes any app of its own, and not the Offline Project (hers alone)', fl);
    ok(fl.cd && !fl.cdHidden && fl.listed.indexOf('app-carpe-diem') >= 0, 'a page of an app the full edition does not list by key is kept as any other app, in sight, never kept out of sight', fl);
    ok(f.__errs.length === 0, 'no script errors in the full edition', f.__errs); }
  ok(p.__errs.length === 0, 'no script errors on the page', p.__errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
