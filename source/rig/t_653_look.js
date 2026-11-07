// node rig/t_653_look.js <Ingenium page url (master)> <out dir> ref=<the 6.9.4 page: git show aa50c44:ingenium.html, served>
// Ingenium 6.53 (7 November 2026), in Chromium. Her words (7 November 2026): "I honestly just want Ingenium reverted back to how it used
// to look before you started messing it the graphics. I want all of the edits and updates kept but I want my app to look like how it
// looked prior to this as far as the buttons. Perhaps how it looked on 6.9.4"; "Th + button and the mic buttons on the chat pages need
// to be reverted"; "it is mostly slightly faster but still slow on my Macbook pro"; and of the Offline Project in Fabrica: "It should
// only be there only if I was working on it inside of Fabrica and recently shipped a new version like any other app".
//   - every common key and surface on Chat, Home, Settings, Models and Blend has the 6.9.4 page's shadow, face, border and motion;
//   - the + key is flat in the message box; the model key has no ring while nothing answers;
//   - no glass blur once the door is passed; (6.54) with the pointer still, the rail, the seal and the dots move, as in 6.8.7;
//   - Fabrica: no tile above Your apps; Bring one in offers The Offline Project; kept, it is an app in Your apps beside Ingenium,
//     with its versions (making it again adds one);
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2); const REF = (args.find(a => a.startsWith('ref=')) || '').slice(4); const [URL_, OUT] = args.filter(a => !a.startsWith('ref=')); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 900) : '')); } }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  await p.evaluate(() => { try { const k = [...document.querySelectorAll('button')].find(x => /^Not now$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); } catch (e) {} });
  // 1. every common key and surface as in 6.9.4 (the reference page from the history: git show aa50c44:ingenium.html)
  const SEL = { chat: ['#chatCtlBtn', '#chatImgBtn', '#chatSend', '.cl-key#displayBtn', '.cl-key#statusPill', '.chat-card', '.composer', '.nav-btn.active'],
    home: ['.hx-key', '.hx-app .hx-stone'], settings: ['#page-settings .btn:not(.primary)', '#page-settings .card', '#page-settings .seg-btn', '.rm-tab'], models: ['#page-models .card'], blend: ['#page-blend .card'] };
  const look = async (pg) => { const out = {}; for (const [room, sels] of Object.entries(SEL)) { await pg.evaluate((r) => go(r), room); await pg.waitForTimeout(900);
      out[room] = await pg.evaluate((sels) => { const o = {}; for (const s of sels) { const e = [...document.querySelectorAll(s)].find(x => x.getBoundingClientRect().width > 0); if (!e) { o[s] = null; continue; } const c = getComputedStyle(e);
        o[s] = { sh: c.boxShadow, bg: c.backgroundColor + ' ' + c.backgroundImage, bd: c.borderTopWidth + ' ' + c.borderTopStyle + ' ' + c.borderTopColor, tr: c.transition }; } return o; }, sels); } return out; };
  const now = await look(p);
  if (REF) {
    const R = await b.newContext({ viewport: { width: 1440, height: 900 } }); const rp = await R.newPage();
    await rp.goto(REF); await rp.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await rp.waitForTimeout(1200);
    await rp.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await rp.waitForTimeout(900);
    const was = await look(rp); await R.close(); const diff = [], seen = [];
    for (const room of Object.keys(SEL)) for (const s of SEL[room]) { const x = was[room][s], y = now[room][s]; if (!x || !y) continue; seen.push(s); for (const k of ['sh', 'bg', 'bd', 'tr']) if (x[k] !== y[k]) diff.push(room + ' ' + s + ' ' + k + ': ' + x[k].slice(0, 90) + ' -> ' + y[k].slice(0, 90)); }
    ok(diff.length === 0 && seen.length >= 12, 'every common key and surface has its 6.9.4 shadow, face, border and motion (' + seen.length + ' compared)', diff);
  } else console.log('(no 6.9.4 page given: keys not compared)');
  // her words (7 November 2026): "Th + button and the mic buttons on the chat pages need to be reverted to how they used to look"
  await p.evaluate(() => go('chat')); await p.waitForTimeout(800);
  const plus = await p.evaluate(() => { const e = document.getElementById('chatImgBtn'), c = getComputedStyle(e), m = getComputedStyle(document.getElementById('chatModelBtn')); return { sh: c.boxShadow, bg: c.backgroundColor + ' ' + c.backgroundImage, border: c.borderTopWidth + ' ' + c.borderTopStyle, model: m.boxShadow }; });
  ok(plus.sh === 'none' && /rgba\(0, 0, 0, 0\) none/.test(plus.bg) && plus.border === '1px solid', 'the + key is flat in the message box again: an outline, no face, no raised edge', plus);
  ok(!/0px 0px 0px 3px/.test(plus.model), 'the model key has no ring round it while nothing answers', plus.model);
  // 3. no glass; (6.54) the rail, the seal and the dots move by themselves, as in 6.8.7
  const glass = await p.evaluate(() => { const out = []; for (const e of document.querySelectorAll('*')) for (const pe of [null, '::before', '::after']) { const c = getComputedStyle(e, pe); const v = c.backdropFilter || c.webkitBackdropFilter; const r = e.getBoundingClientRect(); if (v && v !== 'none' && r.width > 0 && r.height > 0) out.push((e.id || e.className) + (pe || '') + ' ' + v); } return out; });
  ok(glass.length === 0, 'no glass blur once the door is passed', glass);
  // (6.54, her words, 7 November 2026: "I want the 3D look and animation of build 6.8.7") the rail, the seal and the dots move by themselves again
  await p.evaluate(() => go('chat')); await p.waitForTimeout(1200); await p.mouse.move(700, 450); await p.waitForTimeout(400);
  const run = await p.evaluate(() => document.getAnimations().filter(a => a.playState === 'running' && a.constructor.name === 'CSSAnimation').map(a => a.animationName));
  ok(['ingBellSoft', 'sealEngine', 'sealBeat', 'sealCounter', 'islSway', 'cdHourTurn', 'forgeBreathe'].every(n => run.indexOf(n) >= 0), 'with the pointer still, the rail, the seal and the dots move, as in 6.8.7', run);
  // 4. Fabrica: the Offline Project as any app
  const hasOp = await p.evaluate(() => !!(window.IngOffline && IngOffline.keep));
  if (hasOp) {
    await p.evaluate(() => Promise.resolve(IngBuiltin.seed({})));
    await p.evaluate(() => go('fabrica')); await p.waitForTimeout(1500);
    const f0 = await p.evaluate(() => ({ row: !!document.getElementById('fbOpRow'), tile: !!document.querySelector('.op-tile'), names: [...document.querySelectorAll('#fbRepos .f-repo .nm')].map(x => x.textContent) }));
    ok(!f0.row && !f0.tile && f0.names.indexOf('The Offline Project') < 0, 'Fabrica: nothing above Your apps, and the Offline Project is not listed before it is made there', f0);
    await p.click('#fbBring'); await p.waitForTimeout(400);
    const opts = await p.evaluate(() => [...document.querySelectorAll('.f-sheet .op-bring b')].map(x => x.textContent));
    ok(opts.length === 3 && /all four apps/.test(opts[0]), 'Bring one in offers The Offline Project', opts);
    await p.evaluate(() => { const w = document.querySelector('.f-sheet-wrap'); if (w) w.remove(); });
    await p.evaluate(() => IngOffline.keep(true));
    await p.waitForFunction(() => [...document.querySelectorAll('#fbRepos .f-repo .nm')].some(x => x.textContent === 'The Offline Project'), null, { timeout: 300000 }).catch(() => {});
    const f1 = await p.evaluate(() => { const names = [...document.querySelectorAll('#fbRepos .f-repo .nm')].map(x => x.textContent); const tile = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => (x.querySelector('.nm') || {}).textContent === 'The Offline Project');
      return { names, crest: !!(tile && tile.querySelector('.ing-crest, img')), sameKind: tile ? tile.className : '' }; });
    ok(f1.names.indexOf('The Offline Project') >= 0 && f1.crest && /f-repo/.test(f1.sameKind) && !/op-tile|wide/.test(f1.sameKind), 'kept, it is an app in Your apps like the others, with its crest', f1);
    await p.screenshot({ path: OUT + '/fabrica.png' });
    const v1 = await p.evaluate(() => IngRepo.list().then(rs => { const r = rs.find(x => x.name === 'The Offline Project'); return IngRepo.log(r.id).then(l => l.length); }));
    await p.evaluate(() => IngOffline.keep(false)); await p.waitForTimeout(500);
    await p.waitForFunction((n) => IngRepo.list().then(rs => { const r = rs.find(x => x.name === 'The Offline Project'); return IngRepo.log(r.id).then(l => l.length > n); }), v1, { timeout: 300000, polling: 1000 }).catch(() => {});
    const v2 = await p.evaluate(() => IngRepo.list().then(rs => { const r = rs.filter(x => x.name === 'The Offline Project'); return Promise.all(r.map(x => IngRepo.log(x.id).then(l => l.length))).then(ls => ({ repos: r.length, versions: ls })); }));
    ok(v2.repos === 1 && v2.versions[0] === v1 + 1, 'making it again adds a version to the same app', { v1, v2 });
  } else console.log('(the Offline Project is not in this edition)');
  ok(errs.length === 0, 'no errors on the page', errs);
  await b.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); process.exit(1); });
