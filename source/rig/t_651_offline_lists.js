// node rig/t_651_offline_lists.js <master url> <out dir>
// The Offline Project in the lists of her apps, and its hall's words edited in Code (Ingenium 6.51; modules/r246.js; the master edition
// alone). Her answer (7 November 2026): "Fabrica and app lists": both variations listed with her apps, each built fresh when opened.
// The apps are the copies the master edition carries and this copy of Ingenium (IngBuiltin.seed), as on her computers.
// Checks: Code's Your apps lists both variations, and one chosen is made fresh and opened as a Code project of its page; the + menu's
// One of your apps lists both, and one chosen goes with the next message; Fabrica's hall row opens the hall's page in Code (a project of
// its own), a word changed there is in the next making, and the hall Ingenium carries comes back when chosen; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500);
  await p.evaluate(() => IngBuiltin.seed({}));
  // 1. Code's Your apps
  await p.evaluate(() => { go('code'); IngApps.choose(); }); await p.waitForTimeout(400);
  const c1 = await p.evaluate(() => [...document.querySelectorAll('#appsPick .op-row')].map(x => (x.getAttribute('data-op') || 'cap') + ':' + x.innerText.replace(/\s+/g, ' ')));
  await p.screenshot({ path: OUT + '/1_code_apps.png' });
  ok(c1.length === 3 && /^cap:The Offline Project, made from these/.test(c1[0]) && /^4:The Offline Project All four apps/.test(c1[1]) && /^3:The Offline Project, without Inkwell/.test(c1[2]), 'Code\'s Your apps lists The Offline Project, with all four apps and without Inkwell', c1);
  await p.click('#appsPick .op-row[data-op="3"]');
  await p.waitForFunction(() => (state.projects || []).some(x => x.name === 'The Offline Project (without Inkwell)'), null, { timeout: 300000 }).catch(() => {});
  await p.waitForTimeout(800);
  const c2 = await p.evaluate(() => { const pr = (state.projects || []).filter(x => x.name === 'The Offline Project (without Inkwell)')[0]; const c = curChat(); return pr ? { files: pr.files.map(f => f.name + ':' + f.size), active: c && c.projectId === pr.id && c.kind === 'code' } : null; });
  ok(c2 && /^The Offline Project \(without Inkwell\)\.html:\d+$/.test(c2.files[0]) && +c2.files[0].split(':')[1] > 5e6 && c2.active, 'chosen, it is made fresh and opened as a Code project of its page, its session open', c2);
  // 2. the + menu's One of your apps
  await p.evaluate(() => go('chat')); await p.waitForTimeout(400);
  await p.evaluate(() => { const n = document.getElementById('chatNew'); if (n) n.click(); });
  await p.evaluate(() => { document.getElementById('chatImgBtn').click(); }); await p.waitForTimeout(200);
  await p.evaluate(() => paintPlus('apps')); await p.waitForTimeout(200);
  const m1 = await p.evaluate(() => [...document.querySelectorAll('#chatPlusMenu .op-pm')].map(x => x.innerText.replace(/\s+/g, ' ')));
  await p.screenshot({ path: OUT + '/2_plus_apps.png' });
  ok(m1.length === 2 && /^The Offline Project All four apps/.test(m1[0]) && /^The Offline Project, without Inkwell/.test(m1[1]), 'the + menu\'s One of your apps lists both variations', m1);
  await p.evaluate(() => { document.querySelector('#chatPlusMenu .op-pm').click(); });
  await p.waitForFunction(() => (typeof stagedFiles !== 'undefined') && stagedFiles.some(f => f.name === 'The Offline Project.html'), null, { timeout: 300000 }).catch(() => {});
  const m2 = await p.evaluate(() => (typeof stagedFiles !== 'undefined' ? stagedFiles : []).map(f => f.name + ':' + (f.pageChars || 0) + ':' + (f.chars || 0)));
  ok(m2.some(x => /^The Offline Project\.html:\d+:\d+$/.test(x) && +x.split(':')[1] > 5e6 && +x.split(':')[2] > 1000), 'chosen, it is made fresh and goes with the next message (the whole page kept beside it, its words for the model, as any app\'s)', m2);
  await p.evaluate(() => { try { clearStagedImage(); } catch (e) {} stagedFiles.length = 0; try { paintChips(); } catch (e) {} });
  // 3. the hall's words, edited in Code
  await p.evaluate(() => go('fabrica')); await p.waitForTimeout(1200);
  await p.click('#fbBring'); await p.waitForTimeout(400); await p.evaluate(() => { const b = [...document.querySelectorAll('.f-sheet .op-bring')].find(x => /choose each app/.test(x.textContent)); b.click(); }); await p.waitForTimeout(400);
  const h0 = await p.evaluate(() => { const r = document.querySelector('.op-work .op-hall'); return r ? r.innerText.replace(/\s+/g, ' ') : ''; });
  ok(/The hall As Ingenium carries it/.test(h0) && /Edit its words in Code/.test(h0), 'Fabrica\'s card has a row for the hall, as Ingenium carries it, with Edit its words in Code', h0);
  await p.evaluate(() => IngOffline.editHall());
  await p.waitForFunction(() => (state.projects || []).some(x => x.opHall), null, { timeout: 60000 }).catch(() => {}); await p.waitForTimeout(800);
  const h1 = await p.evaluate(() => { const pr = (state.projects || []).filter(x => x.opHall)[0]; return pr ? ccLoadAll(pr).then(() => ({ name: pr.name, file: pr.files[0].name, places: /\/\*@@BUILD@@\*\/\{\}/.test(pr.files[0].text), mode: document.body.getAttribute('data-chatmode'), active: (curChat() || {}).projectId === pr.id })) : null; });
  ok(h1 && h1.name === 'The Offline Project\'s hall' && h1.file === 'index.html' && h1.places && h1.mode === 'code' && h1.active, 'Edit its words in Code opens the hall\'s page in a Code project of its own', h1);
  await p.evaluate(() => { const pr = (state.projects || []).filter(x => x.opHall)[0]; const f = pr.files[0]; const t = f.text.split('Four apps that live on your own device.').join('Four invented apps for this test.'); return ccPut(f, t).then(() => { pr.updated = Date.now(); saveState(); }); });
  const h2 = await p.evaluate(() => IngOffline.make({ four: true }).then(r => r.blob.text()).then(t => ({ mine: t.indexOf('Four invented apps for this test.') >= 0, theirs: t.indexOf('Four apps that live on your own device.') >= 0 })));
  ok(h2.mine && !h2.theirs, 'a word changed in the hall\'s page in Code is in the next making', h2);
  await p.evaluate(() => go('fabrica')); await p.waitForTimeout(800); await p.click('#fbBring'); await p.waitForTimeout(400); await p.evaluate(() => { const b = [...document.querySelectorAll('.f-sheet .op-bring')].find(x => /choose each app/.test(x.textContent)); b.click(); }); await p.waitForTimeout(400);
  const h3 = await p.evaluate(() => { const r = document.querySelector('.op-work .op-hall'); return r ? r.innerText.replace(/\s+/g, ' ') : ''; });
  await p.screenshot({ path: OUT + '/3_hall_row.png' });
  await p.evaluate(() => { const b = [...document.querySelectorAll('.op-work .op-hall button')].find(x => /Use the hall Ingenium carries/.test(x.textContent)); b.click(); }); await p.waitForTimeout(200);
  const h4 = await p.evaluate(() => IngOffline.make({ four: true }).then(r => r.blob.text()).then(t => ({ mine: t.indexOf('Four invented apps for this test.') >= 0, theirs: t.indexOf('Four apps that live on your own device.') >= 0, own: state.opMake.ownHall })));
  ok(/Yours, as you edited it in Code/.test(h3) && /Use the hall Ingenium carries/.test(h3) && !h4.mine && h4.theirs && h4.own === false, 'the card says the hall is hers; Use the hall Ingenium carries brings its words back in the next making', { h3, h4 });
  ok(errs.length === 0, 'no script errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
