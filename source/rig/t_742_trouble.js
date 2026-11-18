// Ingenium 7.42: Troubleshoot, the Author Studio's first room (r329, r236). Her approval of the live preview
// (source/previews/troubleshoot, https://claude.ai/artifact/Fw3N7GZMX2JE1ShEjWi7Cn): "I approve of everything from the Author Studio except
// for the the white acrylic button look of the navigation bar, please fix it".
//   node rig/t_742_trouble.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage(); p.setDefaultTimeout(120000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngTrouble && window.IngAuthor, null, { timeout: 600000, polling: 500 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.evaluate(() => IngAuthor.open('trouble')); await p.waitForTimeout(1200);
  const r0 = await p.evaluate(() => { const rooms = [...document.querySelectorAll('#auRail .au-room')]; return { names: rooms.map(x => x.querySelector('span').textContent), sel: (document.querySelector('#auRail .au-room[aria-selected="true"]') || {}).id, room: !!document.getElementById('tsRoom'), h: document.getElementById('auH').textContent }; });
  ok(r0.names[0] === 'Troubleshoot' && r0.names.includes('Additions') && !r0.names.includes('Checks and additions') && r0.sel === 'auR-trouble' && r0.room && r0.h === 'Troubleshoot', 'Troubleshoot is the first room of the rail; Checks and additions is now Additions', r0);
  // the rail: no white key, no purple shade under the pointer; the chosen room is pressed in
  const rail = await p.evaluate(() => { const s = document.querySelector('#auR-trouble'), cs = getComputedStyle(s); return { bg: cs.backgroundColor, sh: cs.boxShadow }; });
  const w = p.locator('#auR-words'); await w.hover(); await p.waitForTimeout(450);
  const hov = await w.evaluate(e => { const c = getComputedStyle(e); return { bg: c.backgroundColor, tf: c.transform, svg: getComputedStyle(e.querySelector('svg')).transform }; });
  ok(/inset/.test(rail.sh) && !/rgb\(255, 255, 255\)/.test(rail.bg), 'the room she is in sits pressed into the rail (inset), not a white key', rail);
  ok(hov.bg === 'rgba(0, 0, 0, 0)' && hov.tf !== 'none' && hov.svg !== 'none', 'under the pointer a room glides and its icon tilts, with no shade behind it', hov);
  await p.screenshot({ path: OUT + '/1_room.png' });
  // before the full check: what is known without it
  const pre = await p.evaluate(() => ({ groups: [...document.querySelectorAll('#tsRoom .ts-grp h3')].map(h => h.textContent), devRows: [...document.querySelectorAll('#tsRoom .ts-grp:nth-child(4) .ts-row b')].map(b => b.textContent), tally: document.querySelector('#tsRoom .ts-tally').textContent }));
  ok(pre.groups.join() === 'The app,Storage,Your models and computers,This device' && pre.devRows.includes('Graphics') && pre.devRows.includes('At rest') && /not run yet/.test(pre.tally), 'four groups; this device\'s graphics and rest are shown at once; the full check waits', pre);
  // Check everything
  await p.locator('#tsRun').click(); await p.waitForFunction(() => document.querySelector('#tsRun') && !document.querySelector('#tsRun').disabled && /Checked at/.test(document.querySelector('#tsRoom .ts-when').textContent), null, { timeout: 120000, polling: 300 });
  const res = await p.evaluate(() => { const g = {}; document.querySelectorAll('#tsRoom .ts-grp').forEach(x => { g[x.querySelector('h3').textContent] = [...x.querySelectorAll('.ts-row b')].map(b => b.textContent); });
    return { g, tally: document.querySelector('#tsRoom .ts-tally').textContent, needle: document.querySelector('#tsRoom .nd').style.transform, open: !document.getElementById('ingAuthor').hidden }; });
  ok(res.open && res.g['The app'].includes('Parts') && res.g['The app'].includes('Pages') && res.g['Storage'].includes('The large store') && res.g['Your models and computers'].includes('The engine') && res.g['Your models and computers'].includes('Model settings record') && /fine/.test(res.tally) && /rotate\(/.test(res.needle),
    'Check everything runs Ingenium\'s own check and puts each line in its group; the gauge moves; the studio stays open', res);
  const row = p.locator('#tsRoom .ts-row').first(); await row.click(); await p.waitForTimeout(300);
  const why = await p.evaluate(() => { const r = document.querySelector('#tsRoom .ts-row[aria-expanded="true"]'); const w = r && r.nextElementSibling; return w ? { shown: getComputedStyle(w).display !== 'none', text: w.textContent.slice(0, 120) } : null; });
  ok(why && why.shown && why.text.length > 10, 'a line unfolds to say why', why);
  const r1 = await row.evaluate(e => getComputedStyle(e.closest('.ts-grp')).transform); const grp = p.locator('#tsRoom .ts-grp').nth(1); await grp.hover(); await p.waitForTimeout(450); const r2 = await grp.evaluate(e => getComputedStyle(e).transform);
  ok(r2 !== 'none', 'each group lifts under the pointer', { r1, r2 });
  // what went wrong: an error met is listed, with Ask a model to fix
  await p.evaluate(() => { setTimeout(() => { throw new Error('A test error for Troubleshoot'); }, 0); }); await p.waitForTimeout(2600);
  const er = await p.evaluate(() => { const e = [...document.querySelectorAll('#tsRoom .ts-err')].find(x => /A test error for Troubleshoot/.test(x.textContent)); return e ? { keys: [...e.querySelectorAll('button')].map(b => b.textContent) } : null; });
  ok(er && er.keys.join() === 'Ask a model to fix,Copy', 'an error met is listed at once, with Ask a model to fix and Copy', er);
  // say it in your own words: the message in Code holds her words and what she ticked (Code is opened, the studio steps aside)
  await p.fill('#tsProb', 'On my HP laptop Adamas froze and the app closed.');
  const handed = await p.evaluate(async () => { let got = null; const of = IngWorkshop.fix; IngWorkshop.fix = a => { got = a; return Promise.resolve(null); }; IngTrouble.hand(); await new Promise(r => setTimeout(r, 600)); IngWorkshop.fix = of; return got; });
  ok(handed && /in my own words: On my HP laptop/.test(handed) && /Ingenium's own check/.test(handed) && /The last errors/.test(handed) && /This device:/.test(handed) && !/model settings record \(newest/.test(handed), 'Hand to a model: her words with the report, the last errors and this device (the record left out, as unticked)', (handed || '').slice(0, 200));
  // Additions: the check and the errors are no longer there twice
  await p.evaluate(() => IngAuthor.open('checks')); await p.waitForTimeout(1000);
  const add = await p.evaluate(() => { const h = document.getElementById('auChecks'); const vis = s => { const e = document.querySelector(s); return !!(e && e.closest('.card') && e.closest('.card').offsetParent); }; return { h: document.getElementById('auH').textContent, res: vis('#wsRes'), errs: vis('#wsErrs'), layers: !!(h && h.offsetParent) }; });
  ok(add.h === 'Additions' && !add.res && !add.errs && add.layers, 'Additions keeps your layers and your page; the check and errors live in Troubleshoot', add);
  // by night
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); IngAuthor.open('trouble'); }); await p.waitForTimeout(900);
  const nt = await p.evaluate(() => getComputedStyle(document.querySelector('#tsRoom .ts-grp h3')).color); ok(/rgb\(2[2-5]\d, 2[2-5]\d, 2[2-5]\d\)/.test(nt), 'by night the room reads light on dark', nt);
  await p.screenshot({ path: OUT + '/2_night.png' });
  ok(await p.evaluate(() => document.getElementById('tsRoom').scrollWidth <= document.getElementById('tsRoom').clientWidth + 1), 'no sideways scroll');
  ok(errs.filter(e => !/A test error for Troubleshoot/.test(e)).length === 0, 'no page errors (besides the test\'s own)', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
