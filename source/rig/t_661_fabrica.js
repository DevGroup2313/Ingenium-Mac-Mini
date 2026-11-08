// Fabrica 6.61 (modules/r112.js), as she set it out on 8 November 2026: "I don't want you to change Fabrica's 3 column view ... I mainly
// wanted the popped out panels rearranged and fixed" and "I want the library page ... to be the view that I see when I click on the Your
// apps". What is checked, on the built page in headless Chromium (the master edition's app library carries her apps):
//   1. Fabrica shows its three panels as they were (Your apps, the work, Test and ship); no page in front of them
//   2. pressing "Your apps" opens the library page: her own apps as cards, each with its 3D seal (layers), its version, where it stands,
//      Ship and a second key; the filters count; "‹ Back to the work" returns to the three panels
//   3. + New app: one main key and a ✕ (no Close and Done pair); the key and the seal follow the name; Escape closes it
//   4. a new app from "A simple first page": kept with index.html, its manifest, its icon and an offline copy; its row in Your apps wears
//      its coloured seal; in the library it is under Made here
//   5. Bring an app in: her library's apps as seal tiles, a ✕, no Close; Carpe Diem comes in with a first version; its card says Open;
//      Ship on a card opens that app's three panels with Test and ship
//   6. Open on a card shows the app's own page (seal, name, Run it, Ship, six tabs, three boxes, the apps down the left); its tabs lead
//      into the three panels; 7. the other panels (rename) have one ✕ and only their main key; 8. no page error
//   node rig/t_661_fabrica.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
const home = (p) => p.evaluate(() => document.getElementById('fb').classList.contains('f-home'));
const cardsOf = (p) => p.evaluate(() => [...document.querySelectorAll('#fbLibBody .f-lc')].map((c) => ({ nm: c.querySelector('.nm').textContent, vr: c.querySelector('.vr').textContent, layers: c.querySelectorAll('.f-ls-l').length, keys: [...c.querySelectorAll('.ks button')].map((x) => x.textContent) })));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(1200);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd && tourEnd(); } catch (e) { } go('fabrica'); });
    // the app library fills itself about nine seconds after the app opens (modules/r120.js)
    await p.waitForFunction(() => typeof libApps === 'function' && libApps().length >= 4, null, { timeout: 180000 }); await p.waitForTimeout(800);
    // 1. the three panels
    const l1 = await p.evaluate(() => ({ panels: [...document.querySelectorAll('#fbPanels > .f-pn')].map((x) => x.id), shown: getComputedStyle(document.getElementById('fbPanels')).display, lib: getComputedStyle(document.getElementById('fbLib')).display, back: getComputedStyle(document.getElementById('fbHome')).display }));
    ok(l1.panels.join() === 'fbApps,fbWork,fbShip' && l1.shown !== 'none' && l1.lib === 'none' && l1.back === 'none', 'Fabrica shows its three panels as they were, with no page in front of them', l1);
    await p.waitForTimeout(400); await p.screenshot({ path: path.join(OUT, 'cols.png') });
    // 2. Your apps opens the library page
    await p.click('#fbAppsLib'); await p.waitForTimeout(700);
    const c2 = await cardsOf(p), names = c2.map((c) => c.nm);
    ok(await home(p) && ['Carpe Diem', 'The Forge', 'Inkwell'].every((n) => names.includes(n)), 'pressing "Your apps" opens the library page with her own apps', names);
    ok(c2.filter((c) => !/Offline/.test(c.nm)).every((c) => c.layers >= 3), 'each of her apps wears its 3D seal (its layers)', c2.map((c) => c.nm + ':' + c.layers));
    ok(c2.every((c) => c.keys.length === 2 && c.keys[0] === 'Ship'), 'each card has Ship and a second key', c2.map((c) => c.keys.join('/')));
    ok(await p.evaluate(() => /^All \d+/.test(document.querySelector('#fbLibSeg button').textContent) && getComputedStyle(document.getElementById('fbLibSeg')).height !== '0px'), 'the filters show and count');
    await p.waitForTimeout(400); await p.screenshot({ path: path.join(OUT, 'library.png') });
    await p.click('#fbHome'); await p.waitForTimeout(400);
    ok(!(await home(p)) && await p.evaluate(() => getComputedStyle(document.getElementById('fbPanels')).display !== 'none'), '"‹ Back to the work" returns to the three panels');
    // 3. + New app
    await p.evaluate(() => document.getElementById('fbNew').click()); await p.waitForSelector('.f-sheet.wide');
    const s3 = await p.evaluate(() => { const sh = document.querySelector('.f-sheet.wide'); return { title: sh.querySelector('h3').textContent, x: sh.querySelectorAll('.f-x').length, keys: [...sh.querySelectorAll('.f-new-foot button')].map((x) => x.textContent), close: [...sh.querySelectorAll('button')].some((x) => /^(Close|Done)$/.test(x.textContent.trim())), ways: [...sh.querySelectorAll('.f-way b')].map((x) => x.textContent) }; });
    ok(s3.title === 'A new app' && s3.x === 1 && s3.keys.length === 1 && !s3.close, 'A new app has one main key and a ✕, no Close and Done pair', s3);
    ok(s3.ways.join('|') === 'Describe it|A simple first page|Bring its files in|Start in Code', 'four ways to start', s3.ways);
    await p.fill('.f-sheet.wide input.f-in', 'Recipe Box');
    ok(await p.evaluate(() => document.querySelector('.f-new-foot .f-btn').textContent === 'Make Recipe Box' && document.querySelector('.f-new-prev .f-ls.mark span').textContent === 'R'), 'the key and the seal follow the name');
    await p.waitForTimeout(800); await p.screenshot({ path: path.join(OUT, 'new.png') });
    await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    ok(await p.evaluate(() => !document.querySelector('.f-sheet-wrap')), 'Escape closes it');
    // 4. a simple first page
    await p.evaluate(() => document.getElementById('fbNew').click()); await p.waitForSelector('.f-sheet.wide'); await p.fill('.f-sheet.wide input.f-in', 'Recipe Box');
    await p.evaluate(() => { [...document.querySelectorAll('.f-way')].find((x) => /simple first page/.test(x.textContent)).click(); [...document.querySelectorAll('.f-sw button')][3].click(); });
    await p.click('.f-new-foot .f-btn');
    await p.waitForFunction(() => /Recipe Box/.test(document.getElementById('fbWhName').textContent), null, { timeout: 30000 });
    const s4 = await p.evaluate(async () => { const r = fbHubHost.cur(); const files = (await IngRepo.files(r.id)).map((f) => f.path || f.name || f).sort(); const row = [...document.querySelectorAll('#fbRepos .f-repo')].find((x) => /Recipe Box/.test(x.textContent)); return { files, head: !!r.head, mark: (fbHubHost.FBS().marks || {})[r.id], rowSeal: !!(row && row.querySelector('.f-ls.mark, .f-ls.logo')), home: document.getElementById('fb').classList.contains('f-home') }; });
    ok(s4.head && !s4.home && ['icon.svg', 'index.html', 'manifest.webmanifest', 'sw.js'].every((f) => s4.files.includes(f)) && s4.mark && s4.mark.c === '#2f5f4f' && s4.rowSeal, 'the new app is kept with its first page, manifest, icon and offline copy, shown in the three panels with its coloured seal', s4);
    await p.click('#fbAppsChip'); await p.waitForTimeout(500);
    ok(await home(p) && await p.evaluate(() => [...document.querySelectorAll('#fbLibBody .f-lib-sec b')].some((x) => x.textContent === 'Made here') && [...document.querySelectorAll('#fbLibBody .f-lc .nm')].some((x) => x.textContent === 'Recipe Box')), 'its count opens the library too; Recipe Box is under Made here');
    // 5. Bring an app in, from the library page
    await p.click('#fbLibBring'); await p.waitForSelector('.f-sheet.wide .f-tile');
    const s5 = await p.evaluate(() => { const sh = document.querySelector('.f-sheet.wide'); return { tiles: [...sh.querySelectorAll('.f-tiles .f-tile b')].map((x) => x.textContent), seals: sh.querySelectorAll('.f-tile .f-ls-l').length, x: sh.querySelectorAll('.f-x').length, close: [...sh.querySelectorAll('button')].some((x) => x.textContent.trim() === 'Close'), oldOpts: sh.querySelectorAll('.f-opt.op-bring').length }; });
    ok(s5.tiles.includes('Carpe Diem') && s5.seals > 6 && s5.x === 1 && !s5.close && s5.oldOpts === 0, 'Bring an app in shows her apps as seal tiles, with one ✕, no Close key and no doubled options', s5);
    await p.waitForTimeout(800); await p.screenshot({ path: path.join(OUT, 'bring.png') });
    await p.evaluate(() => [...document.querySelectorAll('.f-tile')].find((x) => x.querySelector('b').textContent === 'Carpe Diem').click());
    await p.waitForFunction(() => /Carpe Diem/.test(document.getElementById('fbWhName').textContent) && !document.getElementById('fb').classList.contains('f-home'), null, { timeout: 120000 });
    ok(await p.evaluate(() => !!fbHubHost.cur().head), 'Carpe Diem comes in with a first version, and its three panels show');
    await p.click('#fbAppsLib'); await p.waitForTimeout(500);
    ok(await p.evaluate(() => { const c = [...document.querySelectorAll('#fbLibBody .f-lc')].find((x) => x.querySelector('.nm').textContent === 'Carpe Diem'); return !!c && c.querySelectorAll('.ks button')[1].textContent === 'Open'; }), 'its card now says Open');
    // each app's own page: Open on its card
    await p.evaluate(() => { const c = [...document.querySelectorAll('#fbLibBody .f-lc')].find((x) => x.querySelector('.nm').textContent === 'Carpe Diem'); c.querySelectorAll('.ks button')[1].click(); });
    await p.waitForTimeout(700);
    const pg = await p.evaluate(() => { const g = document.getElementById('fbAppPg'); return { on: document.getElementById('fb').classList.contains('f-apppg'), panels: getComputedStyle(document.getElementById('fbPanels')).display, name: (g.querySelector('.f-hero .nm') || {}).textContent, seal: g.querySelectorAll('.f-hero .f-ls-l').length, tabs: [...g.querySelectorAll('.f-seg button')].map((x) => x.textContent), boxes: [...g.querySelectorAll('.f-box h4')].map((x) => x.textContent), rail: g.querySelectorAll('.f-rail button').length, back: getComputedStyle(document.getElementById('fbHome')).display }; });
    ok(pg.on && pg.panels === 'none' && pg.name === 'Carpe Diem' && pg.seal >= 3 && pg.tabs.join('|') === 'Overview|Changes|Versions|Plans|Ship|How it was built' && pg.boxes.join('|') === 'Where it stands|Next|How it was built' && pg.rail >= 2 && pg.back !== 'none', 'Open shows the app\'s own page: its seal and name, six tabs, three boxes, the apps down the left', pg);
    await p.waitForTimeout(500); await p.screenshot({ path: path.join(OUT, 'apppage.png') });
    await p.evaluate(() => [...document.querySelectorAll('#fbAppPg .f-seg button')].find((x) => x.textContent === 'Versions').click()); await p.waitForTimeout(600);
    ok(await p.evaluate(() => !document.getElementById('fb').classList.contains('f-apppg') && getComputedStyle(document.getElementById('fbPanels')).display !== 'none' && /Carpe Diem/.test(document.getElementById('fbWhName').textContent) && document.querySelector('#fbViews button[aria-selected="true"]').getAttribute('data-v') === 'history'), 'its Versions tab leads into the three panels, on its history');
    await p.click('#fbAppsLib'); await p.waitForTimeout(500);
    await p.evaluate(() => { const c = [...document.querySelectorAll('#fbLibBody .f-lc')].find((x) => x.querySelector('.nm').textContent === 'Recipe Box'); c.querySelectorAll('.ks button')[0].click(); });
    await p.waitForTimeout(600);
    ok(await p.evaluate(() => !document.getElementById('fb').classList.contains('f-home') && /Recipe Box/.test(document.getElementById('fbWhName').textContent) && document.getElementById('fbShip').getBoundingClientRect().width > 0), 'Ship on a card opens that app\'s three panels with Test and ship');
    // 6. the other panels
    await p.evaluate(() => document.getElementById('fbMore').click()); await p.waitForTimeout(300);
    await p.evaluate(() => { const it = [...document.querySelectorAll('#fb button')].find((x) => /^Rename/.test(x.textContent.trim()) && x.offsetParent); if (it) it.click(); });
    await p.waitForSelector('.f-sheet'); await p.waitForTimeout(500);
    const s6 = await p.evaluate(() => { const sh = [...document.querySelectorAll('.f-sheet')].pop(); return { title: sh.querySelector('h3').textContent, x: sh.querySelectorAll('.f-x').length, close: [...sh.querySelectorAll('button')].some((x) => x.textContent.trim() === 'Close'), main: [...sh.querySelectorAll('.end button')].map((x) => x.textContent) }; });
    ok(/^Rename/.test(s6.title) && s6.x === 1 && !s6.close && s6.main.join() === 'Done', 'the rename panel has one ✕ and only its Done key', s6);
    await p.click('.f-sheet .f-x'); await p.waitForTimeout(300);
    ok(await p.evaluate(() => !document.querySelector('.f-sheet-wrap')), 'its ✕ closes it');
    await p.screenshot({ path: path.join(OUT, 'work.png') });
    ok(!errs.length, 'no page error', errs.slice(0, 3));
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 1200)); }
  await b.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
