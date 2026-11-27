// Ingenium 8.00, r407: sort keys beside Ingenia's Your apps and Mentes's Your models. node rig/t_800_sort.js <page url> [picture folder]
// Every date, conversation and model here is invented for the test.
const pw = require('/opt/node-tools/node_modules/playwright'); const os = require('os'); const path = require('path'); const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const url = process.argv[2]; const pics = process.argv[3] || path.join(os.tmpdir(), 't800s');
let ok = 0, bad = 0; const check = (c, m, x) => { if (c) { ok++; console.log('PASS ' + m); } else { bad++; console.log('FAIL ' + m + (x !== undefined ? '  ' + JSON.stringify(x) : '')); } };
(async () => {
  require('fs').mkdirSync(pics, { recursive: true });
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 240)));
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  for (let i = 0; i < 2; i++) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(900); }
  check(await p.evaluate(() => window.__ingParts && window.__ingParts.p407 === 'running' && typeof IngSortKeys === 'object'), 'r407 runs');
  // invented dates: when each folder was made, and its latest conversation
  const plan = await p.evaluate(() => { const d = 86400000, n = Date.now(), F = IngFolders.folders(); const made = {}, used = {};
    F.forEach((f, i) => { f.app = f.app || {}; f.app.made = n - (10 + ((i * 7) % 13)) * d; made[f.name] = f.app.made; });
    state.chats = state.chats || []; F.forEach((f, i) => { const t = n - ((i * 5) % 11) * 3600000 - 60000; state.chats.push({ id: 'c' + (t - i).toString(36), title: 'Test ' + i, projectId: f.id, updated: t, messages: [] }); used[f.name] = t; });
    go('folders'); try { IngFolders.paint(); } catch (e) {} return { names: F.map((f) => f.name), made, used }; });
  await sleep(2500);
  const order = () => p.evaluate(() => [...document.querySelectorAll('#page-folders .fld-grid > .fld-card .fld-name')].map((x) => x.textContent.trim()).filter(Boolean));
  const press = async (sel, k) => { await p.evaluate(([sel, k]) => { const b = document.querySelector(sel + ' button[data-sort="' + k + '"]'); if (b) b.click(); }, [sel, k]); await sleep(900); };
  const keys = await p.evaluate(() => { const r = document.getElementById('r407Apps'); return r ? { words: [...r.querySelectorAll('button[data-sort]')].map((x) => x.textContent.trim()), head: r.querySelector('h2.sec') && r.querySelector('h2.sec').textContent.trim() } : null; });
  check(keys && keys.head === 'Your apps' && JSON.stringify(keys.words) === JSON.stringify(['Used last', 'Newest', 'Oldest', 'A to Z']), 'Ingenia: Used last, Newest, Oldest and A to Z stand beside Your apps', keys);
  const az = plan.names.slice().sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true }));
  await press('#r407Apps', 'az'); const o1 = await order();
  check(JSON.stringify(o1) === JSON.stringify(az), 'A to Z puts the cards in the order of their names', { got: o1, want: az });
  check(await p.evaluate(() => IngFolderView.state().order === 'az'), 'it is the same choice as the right pull in Ingenia\'s head (r279)');
  await p.screenshot({ path: path.join(pics, '1_apps_az.png') });
  await press('#r407Apps', 'new'); const o2 = await order(), wantNew = plan.names.slice().sort((a, b) => plan.made[b] - plan.made[a]);
  check(JSON.stringify(o2) === JSON.stringify(wantNew), 'Newest: the folder made last comes first', { got: o2, want: wantNew });
  await press('#r407Apps', 'old'); const o3 = await order(), wantOld = wantNew.slice().reverse();
  check(JSON.stringify(o3) === JSON.stringify(wantOld), 'Oldest: the folder made first comes first', { got: o3, want: wantOld });
  await press('#r407Apps', 'used'); const o4 = await order(), wantUsed = plan.names.slice().sort((a, b) => plan.used[b] - plan.used[a]);
  check(JSON.stringify(o4) === JSON.stringify(wantUsed), 'Used last: the folder with the latest conversation comes first', { got: o4, want: wantUsed });
  check(await p.evaluate(() => document.querySelector('#r407Apps button[data-sort="used"]').getAttribute('aria-pressed') === 'true' && document.querySelectorAll('#r407Apps button[aria-pressed="true"]').length === 1), 'the chosen key stays pressed in, and only it');
  await press('#r407Apps', 'az'); await p.evaluate(() => { try { IngFolders.paint(); } catch (e) {} }); await sleep(2200); const o5 = await order();
  check(JSON.stringify(o5) === JSON.stringify(az), 'when Ingenia draws its folders again, the order is kept', { got: o5 });
  check(await p.evaluate(() => { const c = [...document.querySelectorAll('#page-folders .fld-grid > *')]; return !c[c.length - 1].querySelector('.fld-name') || /folder for another app/i.test(c[c.length - 1].textContent); }), 'the card for a new folder stays last');
  // Mentes, Your models
  await p.evaluate(() => { state.models.push(
      { id: 't8-a', name: 'Model A', customName: 'Velox', fileName: 'a.gguf', fileState: 'ready', type: 'GGUF' },
      { id: 't8-b', name: 'Model B', customName: 'Aurora', fileName: 'b.gguf', fileState: 'ready', type: 'GGUF' },
      { id: 't8-c', name: 'Model C', customName: 'Magister', fileName: 'c.gguf', fileState: 'ready', type: 'GGUF' },
      { id: 't8-d', name: 'Model D', customName: 'Codex', fileName: 'd.gguf', fileState: 'ready', type: 'GGUF' });
    go('models'); try { renderModels(); } catch (e) {} }); await sleep(2500);
  const morder = () => p.evaluate(() => [...document.querySelectorAll('#modelList > .model-row')].map((r) => { const id = r.getAttribute('data-r407'); const m = state.models.find((x) => x.id === id); return m ? m.customName || m.name : '?'; }));
  check(await p.evaluate(() => { const r = document.getElementById('r407Models'); return !!r && JSON.stringify([...r.querySelectorAll('button[data-sort]')].map((x) => x.textContent.trim())) === JSON.stringify(['Newest', 'Oldest', 'A to Z']) && r.querySelector('h2.sec').textContent.trim() === 'Your models'; }), 'Mentes: Newest, Oldest and A to Z stand beside Your models');
  const added = await p.evaluate(() => state.models.map((m) => m.customName || m.name));
  check(JSON.stringify(await morder()) === JSON.stringify(added), 'at first the models stand as they were added (Oldest)');
  await press('#r407Models', 'new'); const m1 = await morder();
  check(JSON.stringify(m1) === JSON.stringify(added.slice().reverse()), 'Newest: the model added last comes first', m1);
  await p.screenshot({ path: path.join(pics, '2_models_newest.png') });
  await press('#r407Models', 'az'); const m2 = await morder(), mAz = added.slice().sort((a, b) => a.localeCompare(b));
  check(JSON.stringify(m2) === JSON.stringify(mAz), 'A to Z puts the models in the order of their names', { got: m2, want: mAz });
  await p.evaluate(() => { try { renderModels(); } catch (e) {} }); await sleep(1800);
  check(JSON.stringify(await morder()) === JSON.stringify(mAz) && await p.evaluate(() => state.ui.modelOrder === 'az'), 'when the models are drawn again, the order is kept, and the choice is saved');
  // night
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await sleep(400);
  check(await p.evaluate(() => getComputedStyle(document.querySelector('#r407Models button[data-sort="new"]')).backgroundImage.indexOf('44, 36, 64') >= 0 || getComputedStyle(document.querySelector('#r407Models button[data-sort="new"]')).backgroundImage.indexOf('2c2440') >= 0), 'by night the keys are dark');
  await p.evaluate(() => document.body.removeAttribute('data-theme'));
  check(errs.length === 0, 'no page error' + (errs.length ? ': ' + errs.join(' | ') : ''));
  console.log(ok + ' passed, ' + bad + ' failed'); await b.close(); process.exit(bad ? 1 : 0);
})();
