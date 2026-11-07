// node rig/t_648_offline.js <master url> <out dir>
// The Offline Project, made from her apps, in Fabrica (Ingenium 6.48; modules/r246.js, source/build/op_make.json; the master edition alone).
// Her answer (7 November 2026): "Fabrica and app lists": in Fabrica she chooses all four apps or the variation without Inkwell, and
// Ingenium builds it fresh from her current apps, to try and to package it. The apps are the copies the master edition carries (Carpe
// Diem, The Forge, Inkwell) and this copy of Ingenium, kept in the app library by IngBuiltin.seed, as on her computers.
// Checks: Fabrica's list opens with The Offline Project; its rooms name each copy (Ingenium's says it is the master edition); Make and
// open makes the one-file app and opens it in a window of its own: the hall, the line naming the four builds, four apps inside, each
// with its own corner of the storage, and a room opens its app; the variation without Inkwell: three rooms, three apps inside, the
// line without Inkwell; Save the app saves the file under the variation's name; the earlier copy can be chosen where one is kept;
// nothing is kept in the app library; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, acceptDownloads: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500);
  // the library holds the apps as on her computers
  const seeded = await p.evaluate(() => Promise.resolve(IngBuiltin.seed({})).then(() => { const A = libState().apps; return ['cd', 'forge', 'ingenium', 'inkwell'].map(k => k + ':' + (A[k] && A[k].ref ? (A[k].version || '?') + '/' + (A[k].source || '') : 'none')); }));
  ok(seeded.every(x => !/none$/.test(x)), 'the app library holds the four apps (the copies Ingenium carries, and this copy)', seeded);
  const keys0 = await p.evaluate(() => Object.keys(libState().apps).sort());
  // 1. Fabrica: The Offline Project at the head of the list
  await p.evaluate(() => go('fabrica')); await p.waitForTimeout(1500);
  // 6.53: no tile pinned above Your apps; Bring one in offers it, and it is then kept as an app like any other
  const t1 = await p.evaluate(() => ({ row: !!document.getElementById('fbOpRow'), tile: !!document.querySelector('.op-tile') }));
  await p.click('#fbBring'); await p.waitForTimeout(400);
  const t2 = await p.evaluate(() => [...document.querySelectorAll('.f-sheet .op-bring')].map(b => b.innerText.replace(/\s+/g, ' ')));
  ok(!t1.row && !t1.tile && t2.length === 3 && /The Offline Project, all four apps/.test(t2[0]) && /without Inkwell/.test(t2[1]) && /choose each app's copy/.test(t2[2]),
    'no tile above Your apps: Bring one in offers The Offline Project (all four apps, without Inkwell, and its own choices)', { t1, t2 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('.f-sheet .op-bring')].find(x => /choose each app/.test(x.textContent)); b.click(); }); await p.waitForTimeout(400);
  const r1 = await p.evaluate(() => { const w = document.querySelector('.op-work'); return { name: (document.getElementById('fbWhName') || {}).textContent, rooms: w ? [...w.querySelectorAll('.op-room:not(.op-hall) .t')].map(x => x.innerText.replace(/\s+/g, ' ')) : [], seg: w ? [...w.querySelectorAll('.op-seg button')].map(x => x.textContent + (x.getAttribute('aria-pressed') === 'true' ? '*' : '')) : [], make: !!document.getElementById('opMakeOpen') && !document.getElementById('opMakeOpen').disabled, views: getComputedStyle(document.querySelector('#fb .f-views')).display }; });
  await p.screenshot({ path: OUT + '/1_fabrica.png' });
  ok(r1.name === 'The Offline Project' && r1.rooms.length === 4 && /^Carpe Diem Carpe Diem 1058/.test(r1.rooms[0]) && /The Forge 656/.test(r1.rooms[1]) && /Ingenium [0-9.]+ · this copy, the master edition/.test(r1.rooms[2]) && /master edition, with your Author Studio/.test(r1.rooms[2]) && /Inkwell 7\.52/.test(r1.rooms[3]) && r1.seg[0] === 'All four apps*' && r1.make && r1.views === 'none',
    'its work: All four apps chosen, each room naming the copy it holds (Ingenium says it is this copy, the master edition), and Make and open ready (an app\'s views stand aside)', r1);
  // 2. Make and open: the one-file app, in a window of its own
  const [pop] = await Promise.all([p.waitForEvent('popup', { timeout: 30000 }), p.click('#opMakeOpen')]);
  await pop.waitForURL(/^blob:/, { timeout: 300000 }); await pop.waitForLoadState('domcontentloaded', { timeout: 240000 });
  await pop.waitForFunction(() => !!document.getElementById('builds') && document.getElementById('builds').textContent.length > 0, null, { timeout: 120000 }).catch(() => {}); await pop.waitForTimeout(1500);
  const h2 = await pop.evaluate(() => ({ title: document.title, line: (document.getElementById('builds') || {}).textContent || '', apps: document.querySelectorAll('script[type="op/gz64"]').length, ids: [...document.querySelectorAll('script[type="op/gz64"]')].map(x => x.id), icon: !!document.querySelector('link[data-op-icon="ico"][href^="data:"]') }));
  await pop.screenshot({ path: OUT + '/2_hall.png' });
  ok(h2.title === 'The Offline Project' && /^Carpe Diem 1058 · The Forge 656 · Ingenium [0-9.]+ · Inkwell 7\.52$/.test(h2.line) && h2.apps === 4 && h2.icon, 'Make and open: the hall opens in a window of its own, naming the four builds, with the four apps inside it and its icons', h2);
  const st2 = await p.evaluate(() => { const s = document.querySelector('.op-work .op-state'); return s ? s.textContent : ''; });
  ok(/^Made: The Offline Project\.html, [0-9.]+ MB/.test(st2) && /lives only in this window/.test(st2), 'Fabrica says what was made, how large, and that it lives only in this window until saved', st2);
  const in2 = await p.evaluate(() => IngOffline.last().blob.text().then(t => { const m = /<script type="op\/gz64" id="op-app-inkwell">([^<]+)<\/script>/.exec(t); return IngOffline.unpack(m[1]).then(s => ({ head: s.slice(0, 160), corner: /\("op:inkwell:"\)/.test(s), home: s.indexOf('id="op-home"') >= 0, bars: s.indexOf('id="op-no-bars"') >= 0, inkwell: /<!-- BUILD='7\.52'/.test(s) })); }));
  ok(/^<!doctype html>\s*<meta charset="utf-8"><script id="op-shim">/i.test(in2.head) && in2.corner && in2.home && in2.bars && in2.inkwell, 'each app inside is its own page with the three additions at its top (its own corner of the storage, the key back, no scroll bars)', in2);
  await pop.evaluate(() => window.__opGo('inkwell')); await pop.waitForTimeout(6000);
  const f2 = await pop.evaluate(() => { const f = document.getElementById('demoFrame'); let t = ''; try { t = f.contentDocument.title; } catch (e) { t = 'x:' + e.message; } return { title: t, slug: location.hash }; });
  ok(/Inkwell/i.test(f2.title), 'a room opens its app from inside the page', f2);
  await pop.close();
  // 3. Without Inkwell
  await p.evaluate(() => { const b = document.querySelector('.op-seg button[data-four="0"]'); b.click(); }); await p.waitForTimeout(300);
  const r3 = await p.evaluate(() => [...document.querySelectorAll('.op-work .op-room:not(.op-hall) .t b')].map(x => x.textContent));
  const [pop3] = await Promise.all([p.waitForEvent('popup', { timeout: 30000 }), p.click('#opMakeOpen')]);
  await pop3.waitForURL(/^blob:/, { timeout: 300000 }); await pop3.waitForLoadState('domcontentloaded', { timeout: 240000 });
  await pop3.waitForFunction(() => !!document.getElementById('builds') && document.getElementById('builds').textContent.length > 0, null, { timeout: 120000 }).catch(() => {}); await pop3.waitForTimeout(1500);
  const h3 = await pop3.evaluate(() => ({ line: (document.getElementById('builds') || {}).textContent || '', apps: document.querySelectorAll('script[type="op/gz64"]').length, trio: !!document.querySelector('.trio') || /three apps/i.test(document.body.innerText) }));
  await pop3.screenshot({ path: OUT + '/3_trio.png' });
  await pop3.close();
  ok(JSON.stringify(r3) === JSON.stringify(['Carpe Diem', 'The Forge', 'Ingenium']) && /^Carpe Diem 1058 · The Forge 656 · Ingenium [0-9.]+$/.test(h3.line) && h3.apps === 3 && h3.trio, 'Without Inkwell: three rooms, three apps inside, the line without Inkwell, the hall of three', { r3, h3 });
  // 4. Save the app (the one just made is used)
  const [dl] = await Promise.all([p.waitForEvent('download', { timeout: 120000 }), p.click('#opSave')]);
  const name = dl.suggestedFilename(); const path = OUT + '/saved.html'; await dl.saveAs(path); const size = fs.statSync(path).size;
  ok(name === 'The Offline Project (without Inkwell).html' && size > 5e6, 'Save the app saves the file under the variation\'s name', { name, size });
  // 5. the earlier copy, where one is kept, can be chosen
  await p.evaluate(() => { const A = libState().apps; A.forge.earlier = Object.assign({}, A.forge, { version: '655', earlier: undefined }); IngOffline.open(); });
  await p.waitForTimeout(300);
  const s5 = await p.evaluate(() => { const sel = [...document.querySelectorAll('.op-work .op-room select')]; return sel.map(x => [...x.options].map(o => o.textContent)); });
  await p.evaluate(() => { const sel = document.querySelector('.op-work .op-room select'); sel.value = 'earlier'; sel.dispatchEvent(new Event('change', { bubbles: true })); });
  const u5 = await p.evaluate(() => state.opMake.use.forge);
  await p.evaluate(() => { delete libState().apps.forge.earlier; state.opMake.use = {}; saveState(); });
  ok(s5.length === 1 && /The copy kept now \(656\)/.test(s5[0][0]) && /The earlier copy \(655\)/.test(s5[0][1]) && u5 === 'earlier', 'where an earlier copy is kept, the room offers it, and the choice is kept', { s5, u5 });
  // 6. nothing kept
  const keys1 = await p.evaluate(() => Object.keys(libState().apps).sort());
  ok(JSON.stringify(keys0) === JSON.stringify(keys1), 'nothing of the Offline Project is kept in the app library', { keys0, keys1 });
  ok(errs.length === 0, 'no script errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
