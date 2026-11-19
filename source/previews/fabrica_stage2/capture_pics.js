// Fabrica's plan, stage 2, as it really is (modules/r337.js on a test page), filled with an invented app, taken out of the running page
// for its live preview: at each step, the top bar, the page in view and the sheet over it, with every style rule, token and keyframe that
// draws them (day; the night rules come with them).
//   node capture_stage1.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 860 }, deviceScaleFactor: 2 }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1200);
  await p.evaluate(async () => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.theme = 'day'; try { applyTheme(); } catch (e) {}
    const enc = (s) => new TextEncoder().encode(s); IngRepo.setAuthor({ name: 'Ada', email: '' });
    IngFolders.make('Tide Clock'); try { saveState(); } catch (e) {}  // its folder first: Fabrica writes into it as things happen
    const a = await IngRepo.fromFiles([{ path: 'index.html', data: enc('<!doctype html><meta charset="utf-8"><title>Tide Clock</title>\n<link rel="stylesheet" href="app/clock.css">\n<h1>Tide Clock</h1>\n<p id="next">High tide soon</p>\n<script src="app/tide.js"></script>\n') },
      { path: 'app/tide.js', data: enc('// the next high tide, in hours from now\nfunction next(){\n  return 6;\n}\ndocument.getElementById("next").textContent = "High tide in " + next() + " hours";\n') },
      { path: 'app/clock.css', data: enc('body{font:16px Georgia,serif;margin:2rem}\nh1{color:#1f4f68}\n') }, { path: 'README.md', data: enc('# Tide Clock\n\nThe tides of the harbour, offline.\n') }],
      { name: 'Tide Clock', desc: 'The tides of the harbour, offline', msg: 'The first page' });
    const info = await IngRepo.info(a.id); const main = info.branch;
    // a pull request merged, a release made, and one open, as Fabrica's own keys make them
    await IngRepo.branch(a.id, 'ingenium/tide-table'); await IngRepo.switchTo(a.id, 'ingenium/tide-table');
    await IngRepo.put(a.id, 'app/table.json', '{ "harbour": "Kingsbridge", "next": 6.5 }\n'); await IngRepo.commit(a.id, 'The tide table');
    const pr = await fbHub.newPull(a.id, { from: 'ingenium/tide-table', to: main, title: 'The tide table' });
    await IngRepo.switchTo(a.id, main); window.__ingPrMerge = a.id; await IngRepo.merge(a.id, 'ingenium/tide-table'); window.__ingPrMerge = null;
    const rec = await fbHub.live(a.id); (rec.pulls || []).filter((x) => x.n === pr.n)[0].state = 'merged'; await fbHub.keep(rec);
    await new Promise((r) => setTimeout(r, 3500)); await IngRepo.tag(a.id, 'v1.0');
    await IngRepo.branch(a.id, 'ingenium/evening-face'); await IngRepo.switchTo(a.id, 'ingenium/evening-face'); await IngRepo.put(a.id, 'app/clock.css', 'body{font:16px Georgia,serif;margin:2rem;background:#f4efe3}\nh1{color:#1f4f68}\n');
    await IngRepo.commit(a.id, 'An evening face'); await fbHub.newPull(a.id, { from: 'ingenium/evening-face', to: main, title: 'An evening face' }); await IngRepo.switchTo(a.id, main);
    const g = await IngRepo.fromFiles([{ path: 'index.html', data: enc('<!doctype html><title>Rain Gauge</title><h1>Rain Gauge</h1>\n') }], { name: 'Rain Gauge', desc: 'The rain of the week', msg: 'The first page' });
    // its folder, with its notes and a conversation in it
    const f = IngFolders.folders().filter((x) => x.name === 'Tide Clock')[0] || IngFolders.make('Tide Clock');
    f.app.how = 'One step at a time; keep the dial calm; read the tide table before changing it.'; f.app.brief = 'The dial is drawn and the tide table is in. Next: an evening face, then the week ahead.'; f.app.briefAt = Date.now() - 86400000;
    f.app.decisions = ['The table is kept as JSON beside the page', 'No sound on the dial']; f.app.open = ['An evening face', 'The week ahead'];
    state.chats.push({ id: 'cTide1', title: 'How the tide table is read', projectId: f.id, messages: [{ role: 'me', text: 'How should the page read the tide table?', at: Date.now() - 7200000 }, { role: 'bot', text: 'From app/table.json, once when the page opens.', at: Date.now() - 7100000 }], made: Date.now() - 7200000, updated: Date.now() - 7100000 });
    window.__cap = { a: a.id, g: g.id, f: f.id }; try { saveState(); } catch (e) {} go('code'); });
  await p.waitForTimeout(1500);
  // one picture per step: the part that is new, ringed in gold, with the page around it
  const ring = async (sel) => p.evaluate((sel) => { document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring'));
    if (!document.getElementById('pvRingCss')) { const st = document.createElement('style'); st.id = 'pvRingCss'; st.textContent = '.pv-ring{outline:3px solid #d4a23a!important;outline-offset:4px!important;border-radius:12px}'; document.head.appendChild(st); }
    const els = sel.split('|').map((q) => document.querySelector(q)).filter(Boolean); els.forEach((e) => e.classList.add('pv-ring')); if (els[0]) els[0].scrollIntoView({ block: 'center' }); return els.length; }, sel);
  const grab = async (key, sel, pad) => { await p.waitForTimeout(700); const n = await ring(sel); await p.waitForTimeout(500);
    const box = await p.evaluate((sel) => { let x0 = 1e9, y0 = 1e9, x1 = 0, y1 = 0; sel.split('|').forEach((q) => { const e = document.querySelector(q); if (!e) return; const r = e.getBoundingClientRect(); x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); }); return { x0, y0, x1, y1 }; }, sel);
    const P = pad || 140; const x = Math.max(0, box.x0 - P), y = Math.max(0, box.y0 - P), w = Math.min(1360 - x, box.x1 - box.x0 + 2 * P), h = Math.min(860 - y, box.y1 - box.y0 + 2 * P);
    await p.screenshot({ path: path.join(OUT, key + '.png'), clip: { x, y, width: Math.max(320, w), height: Math.max(200, h) } }); console.log(key, n); };
  await p.evaluate(async () => { await IngRepoWork.openFab(window.__cap.a, (await IngRepo.info(window.__cap.a)).branch); const c = curChat(); c.title = 'An evening face'; try { saveState(); ccPaintHead(); } catch (e) {} });
  await p.waitForTimeout(3000); await grab('1-code', '#r337Folder', 220);
  await p.evaluate(async () => { state.folders.ui.open = window.__cap.f; saveState(); go('folders'); IngFolders.paint(); }); await p.waitForTimeout(2500);
  await grab('2-folder', '#page-folders .r337-log|#r337Repo', 60);
  await p.evaluate(() => { document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring')); IngAppView.open('Tide Clock'); }); await p.waitForSelector('.fbx.r333x .r337-keys .f-btn', { timeout: 15000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring')));
  { const r = await p.evaluate(() => document.querySelector('.fbx.r333x .f-sheet').getBoundingClientRect().toJSON()); await p.screenshot({ path: path.join(OUT, '3-all.png'), clip: { x: r.x - 30, y: Math.max(0, r.y - 30), width: r.width + 60, height: Math.min(860, r.height + 60) } }); }
  await p.evaluate(() => { const s = document.querySelector('.fbx.r333x'); if (s) s.remove(); });
  await p.evaluate(async () => { go('fabrica'); await new Promise((r) => setTimeout(r, 1200)); const h = fbHubHost; h.FBS().sel = window.__cap.a; h.S.home = false; h.S.appPg = window.__cap.a; fbRender(); });
  await p.waitForTimeout(2800); await grab('4-fabrica', '#fbAppPg .f-hero', 40);
  await p.evaluate(async () => { go('chat'); state.activeChat = 'cTide1'; try { ccState().activeChat = 'cTide1'; } catch (e) {} saveState(); renderChat(); }); await p.waitForTimeout(2500);
  await grab('5-chat', '#r337Chat', 200);
  await p.evaluate(async () => { await bdOpenRepo(window.__cap.a); }); await p.waitForTimeout(3000); await grab('6-adamas', '#r337Adamas', 200);
  await p.evaluate(async () => { go('code'); await new Promise((r) => setTimeout(r, 600)); await IngRepoWork.openFab(window.__cap.g, (await IngRepo.info(window.__cap.g)).branch); }); await p.waitForTimeout(3000);
  await grab('7-make', '#r337Folder', 220);
  await b.close(); })().catch((e) => { console.error(e); process.exit(2); });
