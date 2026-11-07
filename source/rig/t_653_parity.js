// node rig/t_653_parity.js <Ingenium page url (master)> <out dir>
// Ingenium 6.53 (7 November 2026), in Chromium. Her words (7 November 2026): "I have told you many times that I want full parity with
// Carpe Diem's buttons and acrylic surfaces ... You keep adding this freaking purple glow under every fucking button"; "it is mostly
// slightly faster but still slow on my Macbook pro"; and of the Offline Project in Fabrica: "I don't want it awkwardly placed at the top
// of the "Your apps" section ... It should only be there only if I was working on it inside of Fabrica and recently shipped a new
// version like any other app". (modules/r251.js, build_page.py's slate pass, r246.js)
//   - keys rest on Carpe Diem's slate edge and casts, flat faces (the primary key one flat accent), rise 2 px and press 1 px;
//   - no shadow on Home, Chat or Settings is drawn in Ingenium's purple ink; cards are acrylic (white at 72 %);
//   - no glass blur once the door is passed; with the pointer still, nothing animates; the rail's bell swings when pointed at;
//   - Fabrica: no tile above Your apps; Bring one in offers The Offline Project; kept, it is an app in Your apps beside Ingenium,
//     with its versions (making it again adds one);
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 900) : '')); } }
const PURPLE = /40, 2[02], (?:68|70)|93, 55, 161|106, 63, 181, 0\.2[0-9]?\) 0px [1-9]/;
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  await p.evaluate(() => { try { const k = [...document.querySelectorAll('button')].find(x => /^Not now$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); } catch (e) {} });
  // 1. keys
  await p.evaluate(() => go('chat')); await p.waitForTimeout(1200);
  const k = await p.evaluate(() => { const g = id => { const e = typeof id === 'string' ? document.querySelector(id) : id; if (!e) return null; const c = getComputedStyle(e); return { sh: c.boxShadow, bg: c.backgroundImage + ' ' + c.backgroundColor }; };
    return { ctl: g('#chatCtlBtn'), get: g('.wa-hello .btn.ghost'), pri: g('.wa-hello .btn.primary'), pill: g('.cl-key#displayBtn') }; });
  ok(k.ctl && /rgba\(16, 42, 58, 0\.16\) 0px -1\.5px 0px 0px inset/.test(k.ctl.sh) && /rgba\(16, 42, 58, 0\.3\) 0px 2px 0px/.test(k.ctl.sh) && /rgba\(16, 42, 58, 0\.13\) 0px 9px 14px/.test(k.ctl.sh), 'a key rests on Carpe Diem\'s slate edge and casts', k.ctl);
  ok(k.get && /rgb\(255, 255, 255\), rgb\(255, 255, 255\)|none rgb\(255, 255, 255\)/.test(k.get.bg) && !PURPLE.test(k.get.sh), 'its face is flat white, with no purple in its shadow', k.get);
  ok(k.pri && /none rgb\(106, 63, 181\)/.test(k.pri.bg) && /rgba\(16, 42, 58, 0\.3\) 0px 2px 0px/.test(k.pri.sh) && !PURPLE.test(k.pri.sh), 'the primary key is one flat accent on the same slate edge', k.pri);
  ok(k.pill && /rgba\(16, 42, 58, 0\.32\) 0px 1px 0px/.test(k.pill.sh), 'the top bar\'s pills rest on Carpe Diem\'s 1 px edge', k.pill);
  const box = await p.evaluate(() => { const r = document.querySelector('.wa-hello .btn.ghost').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await p.mouse.move(box.x, box.y); await p.waitForTimeout(350);
  const hv = await p.evaluate(() => { const c = getComputedStyle(document.querySelector('.wa-hello .btn.ghost')); return { tf: c.transform, sh: c.boxShadow }; });
  await p.mouse.down(); await p.waitForTimeout(150);
  const pr = await p.evaluate(() => { const c = getComputedStyle(document.querySelector('.wa-hello .btn.ghost')); return { tf: c.transform, sh: c.boxShadow }; });
  await p.mouse.move(5, 400); await p.mouse.up(); await p.waitForTimeout(250);
  ok(/matrix\(1, 0, 0, 1, 0, -2\)/.test(hv.tf) && /rgba\(16, 42, 58, 0\.3\) 0px 3px 0px/.test(hv.sh), 'under the pointer it rises 2 px and its edge deepens to 3 px', hv);
  ok(/matrix\(1, 0, 0, 1, 0, 1\)/.test(pr.tf) && /inset/.test(pr.sh) && /rgba\(16, 42, 58, 0\.24\) 0px 2px 5px 0px inset/.test(pr.sh), 'pressed, it sits 1 px down in Carpe Diem\'s well', pr);
  // 2. no purple ink in any shadow; acrylic cards
  for (const pg of ['home', 'chat', 'settings']) {
    await p.evaluate((pg) => go(pg), pg); await p.waitForTimeout(1000);
    const bad = await p.evaluate((re) => { const R = new RegExp(re); const out = []; for (const e of document.querySelectorAll('body *')) { const r = e.getBoundingClientRect(); if (!r.width || r.bottom < 0 || r.top > innerHeight) continue; for (const pe of [null, '::before', '::after']) { const s = getComputedStyle(e, pe).boxShadow; if (s && s !== 'none' && R.test(s)) out.push((e.id ? '#' + e.id : e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0]) + (pe || '') + ' ' + s.slice(0, 90)); } if (out.length > 8) break; } return out; }, PURPLE.source);
    ok(bad.length === 0, 'on ' + pg + ', no shadow is drawn in Ingenium\'s purple ink', bad);
  }
  await p.evaluate(() => go('home')); await p.waitForTimeout(600);
  const card = await p.evaluate(() => { const c = document.querySelector('#page-home .card') || document.querySelector('.card'); const s = getComputedStyle(c); return { bg: s.backgroundColor, sh: s.boxShadow }; });
  ok(/rgba\(255, 255, 255, 0\.72\)/.test(card.bg) && /rgba\(16, 42, 58, 0\.22\) 0px 1px 0px/.test(card.sh), 'cards are acrylic: white at 72 %, a 1 px slate edge and soft casts', card);
  // 3. no glass; nothing animates with the pointer still; the bell swings when pointed at
  const glass = await p.evaluate(() => { const out = []; for (const e of document.querySelectorAll('*')) for (const pe of [null, '::before', '::after']) { const c = getComputedStyle(e, pe); const v = c.backdropFilter || c.webkitBackdropFilter; const r = e.getBoundingClientRect(); if (v && v !== 'none' && r.width > 0 && r.height > 0) out.push((e.id || e.className) + (pe || '') + ' ' + v); } return out; });
  ok(glass.length === 0, 'no glass blur once the door is passed', glass);
  await p.evaluate(() => go('chat')); await p.waitForTimeout(1200); await p.mouse.move(700, 450); await p.waitForTimeout(400);
  const run = await p.evaluate(() => document.getAnimations().filter(a => a.playState === 'running' && a.constructor.name === 'CSSAnimation').map(a => a.animationName));
  ok(run.length === 0, 'with the pointer still, nothing animates (the rail, the seal, the dots rest)', run);
  const bell = await p.evaluate(() => { const r = document.getElementById('fabBell').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await p.mouse.move(bell.x, bell.y); await p.waitForTimeout(400);
  const swing = await p.evaluate(() => { const e = document.querySelector('#fabBell .bell'); return (e.getAnimations()[0] || {}).playState || 'none'; });
  await p.mouse.move(700, 450);
  ok(swing === 'running', 'pointed at, the rail\'s bell swings', swing);
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
