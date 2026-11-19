// Ingenium 7.48 (approved on its pictures, 19 November 2026): Fabrica's plan, stage 2, one ecosystem (modules/r337.js). The audit's recommendations 5 to 7,
// approved in full on 19 November 2026 ("I want them all implemented into Ingenium in the proposed order").
//   5. a Code session on an app works with that app's folder: the folder's notes go with every turn; Its folder in its top row; with no
//      folder, Make its folder makes one
//   6. an app's folder shows its repository in Fabrica (branch, newest version, open pull requests, last run); a pull request merged in
//      Fabrica and a release made are written, dated, into the folder's Where we left off, and go with the folder's notes to the model
//   7. All in one place, on Fabrica's own sheet: where we left off, its repository, its releases, its conversations, and its keys;
//      reached from Folders, Fabrica, Code, Chat and Adamas
//   node rig/t_747_ecosystem.js <page url> <out folder>
// Invented apps only (Tide Clock, Rain Gauge).
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; return !!c; };
const violet = (v) => { const m = String(v).match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/); if (!m) return false; const R = +m[1], G = +m[2], B = +m[3], A = m[4] == null ? 1 : +m[4]; return A > 0.02 && B > R && R > G && B - G > 25 && !(R > 240 && G > 235); };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1360, height: 860 } })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1200);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
    await p.waitForTimeout(800);
    ok(await p.evaluate(() => !!(window.IngAppView && window.IngFolderFab && window.IngCodeFolder && IngRepoWork.ui && IngFolders.start && window.bdOpenRepo)), '0. stage 2 is in this page, with its points of connection (r208, r333, r138)');
    // an app in Fabrica, with a folder of the same name and notes in it
    const ids = await p.evaluate(async () => {
      const page = '<!doctype html><html><head><title>Tide Clock</title></head><body><h1>Tide Clock</h1><p>High water at 06:12.</p></body></html>';
      const x = await IngRepo.fromFiles([{ path: 'index.html', data: page }], { name: 'Tide Clock', msg: 'The first page' });
      const id = x && (x.id || x.repo || x);
      const g = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Rain Gauge</title><h1>Rain Gauge</h1>' }], { name: 'Rain Gauge', msg: 'The first page' });
      const f = IngFolders.make('Tide Clock'); f.app.how = 'Tide Clock marker 7741: keep the dial calm.'; f.app.brief = 'The dial is drawn; the tide table comes next.'; saveState();
      try { await fbHubHost && window.fbRender && fbRender(); } catch (e) {}
      return { id: typeof id === 'string' ? id : (await IngRepo.list()).filter((r) => r.name === 'Tide Clock')[0].id, rain: (await IngRepo.list()).filter((r) => r.name === 'Rain Gauge')[0].id, folder: f.id };
    });
    ok(!!ids.id && !!ids.rain && !!ids.folder, '   an app in Fabrica (Tide Clock) with its folder, and one without a folder (Rain Gauge)', ids);
    await p.evaluate(async () => { go('fabrica'); await new Promise((r) => setTimeout(r, 1500)); });
    // ---------------------------------------------------------------- 5. the folder in Code
    await p.evaluate(async (id) => { await IngRepoWork.openFab(id, (await IngRepo.info(id)).branch); }, ids.id); await p.waitForTimeout(2500);
    const c5 = await p.evaluate(() => { const k = document.getElementById('r337Folder'); let sp = ''; try { sp = chatSystemPrompt(8000) || ''; } catch (e) { sp = 'err ' + e.message; }
      return { key: k && !k.hidden && k.offsetParent ? k.textContent : null, inFolder: /THIS CONVERSATION IS IN MY FOLDER FOR TIDE CLOCK/.test(sp), how: sp.indexOf('Tide Clock marker 7741') >= 0, brief: sp.indexOf('the tide table comes next') >= 0 }; });
    ok(c5.key === 'Its folder' && c5.inFolder && c5.how && c5.brief, '5. a Code session on Tide Clock: Its folder in its top row, and the folder\'s notes go with every turn', c5);
    await p.hover('#r337Folder'); await p.waitForTimeout(400);
    const k5 = await p.evaluate(() => { const k = document.getElementById('r337Folder'), cs = getComputedStyle(k); return { bg: cs.backgroundColor, sh: cs.boxShadow !== 'none' }; });
    ok(k5.sh && !violet(k5.bg), '   the key is one of the top row\'s raised keys, with no violet wash under the pointer', k5);
    await p.screenshot({ path: path.join(OUT, 'code_folder_key.png') });
    await p.evaluate(async (id) => { await IngRepoWork.openFab(id, (await IngRepo.info(id)).branch); }, ids.rain); await p.waitForTimeout(2500);
    const c5b = await p.evaluate(() => { const k = document.getElementById('r337Folder'); return k && !k.hidden && k.offsetParent ? k.textContent : null; });
    await p.evaluate(() => { const s = document.querySelector('.fbx.r333x'); if (s) s.remove(); document.getElementById('r337Folder').click(); }); await p.waitForTimeout(900);
    const c5c = await p.evaluate(() => ({ folder: !!IngFolders.folders().filter((f) => f.name === 'Rain Gauge')[0], key: document.getElementById('r337Folder').textContent, sheet: !!document.querySelector('.fbx.r333x .f-sheet') }));
    ok(c5b === 'Make its folder' && c5c.folder && c5c.key === 'Its folder' && c5c.sheet, '   a session on an app with no folder (Rain Gauge): Make its folder makes it, then shows it all in one place', { c5b, c5c });
    await p.evaluate(() => { const s = document.querySelector('.fbx.r333x'); if (s) s.remove(); });
    // ---------------------------------------------------------------- 6. Folders and Fabrica, both ways
    await p.evaluate(async (fid) => { state.folders.ui.open = fid; saveState(); go('folders'); IngFolders.paint(); }, ids.folder); await p.waitForTimeout(2500);
    const f6 = await p.evaluate(() => { const c = document.getElementById('r337Repo'); return c ? { text: c.innerText.replace(/\s+/g, ' ').slice(0, 400), keys: [...c.querySelectorAll('button')].map((x) => x.textContent.trim()) } : null; });
    ok(f6 && /the branch it is on/.test(f6.text) && /newest version/.test(f6.text) && /pull requests? open/.test(f6.text) && f6.keys.join('|') === 'All in one place|Open in Fabrica|Open in Code', '6. Tide Clock\'s folder shows its repository in Fabrica: branch, newest version, pull requests, last run, and its keys', f6);
    await p.screenshot({ path: path.join(OUT, 'folder_repo.png'), fullPage: false });
    // a pull request merged in Fabrica, as its Merge key does it, and a release made
    const m6 = await p.evaluate(async (id) => {
      const info = await IngRepo.info(id); const main = info.branch;
      await IngRepo.branch(id, 'ingenium/tide-table'); await IngRepo.switchTo(id, 'ingenium/tide-table');
      await IngRepo.put(id, 'table.json', '{"high":"06:12"}'); await IngRepo.commit(id, 'The tide table');
      const pr = await fbHub.newPull(id, { from: 'ingenium/tide-table', to: main, title: 'The tide table' });
      await IngRepo.switchTo(id, main); window.__ingPrMerge = id; await IngRepo.merge(id, 'ingenium/tide-table'); window.__ingPrMerge = null;
      const rec = await fbHub.live(id); const it = (rec.pulls || []).filter((x) => x.n === pr.n)[0]; it.state = 'merged'; await fbHub.keep(rec);
      await new Promise((r) => setTimeout(r, 3500));
      await IngRepo.tag(id, 'v1.0'); await new Promise((r) => setTimeout(r, 300));
      const f = IngFolders.folders().filter((x) => x.name === 'Tide Clock')[0];
      let sp = ''; try { sp = IngFolders.contextFor(f); } catch (e) {}
      return { pr: pr.n, log: (f.app.log || []).map((x) => x.t), ctx: /What happened in Fabrica/.test(sp) && /merged into/.test(sp) };
    }, ids.id);
    ok(m6.log.some((t) => /^Pull request #\d+, The tide table, merged into /.test(t)) && m6.log.some((t) => /^Release v1\.0 made\.$/.test(t)), '   a pull request merged and a release made are written, dated, into the folder', m6.log);
    ok(m6.ctx, '   and they go with the folder\'s notes to the model', m6);
    await p.evaluate(() => { IngFolders.paint(); }); await p.waitForTimeout(800);
    const w6 = await p.evaluate(() => { const l = document.querySelector('#page-folders .r337-log'); return l ? l.innerText.replace(/\s+/g, ' ') : null; });
    ok(w6 && /merged into/.test(w6) && /19|20|21|22|November|December|January/.test(w6), '   Where we left off shows them, each with its day', w6);
    await p.screenshot({ path: path.join(OUT, 'folder_left_off.png') });
    // ---------------------------------------------------------------- 7. All in one place, from each of the five
    const v7 = await p.evaluate(async () => { const out = {};
      const sheet = () => { const s = document.querySelector('.fbx.r333x .f-sheet'); return s ? { h: (s.querySelector('h3') || {}).textContent, secs: [...s.querySelectorAll('.r337-sec > h4')].map((x) => x.textContent), keys: [...s.querySelectorAll('.r337-keys .f-btn')].map((x) => x.textContent) } : null; };
      const shut = () => { const s = document.querySelector('.fbx.r333x'); if (s) s.remove(); };
      const press = async (sel) => { const k = document.querySelector(sel); if (!k) return null; k.click(); await new Promise((r) => setTimeout(r, 1800)); const s = sheet(); shut(); return s; };
      IngFolders.paint(); await new Promise((r) => setTimeout(r, 600)); out.folders = await press('#page-folders .fld-h .r337-all');
      go('fabrica'); await new Promise((r) => setTimeout(r, 900)); const id = (await IngRepo.list()).filter((r) => r.name === 'Tide Clock')[0].id;
      const h = fbHubHost; h.FBS().sel = id; h.S.home = false; h.S.appPg = id; fbRender(); await new Promise((r) => setTimeout(r, 1800)); out.fabrica = await press('#fbAppPg .f-hero .r337-all');
      return out; });
    const want = (s) => s && /Tide Clock: all in one place/.test(s.h) && s.secs.join('|') === 'Where we left off|Its repository|Its releases|Its conversations' && s.keys.join('|') === 'Open the folder|Open in Fabrica|Open in Adamas|Open in Code';
    ok(want(v7.folders), '7. All in one place from Folders (the folder\'s head): where we left off, its repository, its releases, its conversations, and its keys', v7.folders);
    ok(want(v7.fabrica), '   and from Fabrica (the app\'s own page)', v7.fabrica);
    await p.evaluate(async (fid) => { go('chat'); document.getElementById('chatNew').click(); await new Promise((r) => setTimeout(r, 500)); const c = curChat(); c.projectId = fid; saveState(); }, ids.folder); await p.waitForTimeout(2200);
    const ch = await p.evaluate(async () => { const k = document.getElementById('r337Chat'); if (!k || k.hidden || !k.offsetParent) return { key: k ? 'not visible' : null }; const t = k.textContent; k.click(); await new Promise((r) => setTimeout(r, 1800)); const s = document.querySelector('.fbx.r333x .f-sheet h3'); const h = s ? s.textContent : null; const w = document.querySelector('.fbx.r333x'); if (w) w.remove(); return { key: t, sheet: h }; });
    ok(ch && ch.key === 'All of Tide Clock' && /all in one place/.test(ch.sheet), '   and from Chat (a conversation in the folder)', ch);
    const ad = await p.evaluate(async () => { const id = (await IngRepo.list()).filter((r) => r.name === 'Tide Clock')[0].id; await bdOpenRepo(id); await new Promise((r) => setTimeout(r, 2500));
      const k = document.getElementById('r337Adamas'); if (!k || k.hidden || !k.offsetParent) return { key: null, doc: (state.buildDoc || {}).repo === id }; k.click(); await new Promise((r) => setTimeout(r, 1800)); const s = document.querySelector('.fbx.r333x .f-sheet h3'); const h = s ? s.textContent : null; const w = document.querySelector('.fbx.r333x'); if (w) w.remove(); return { key: k.textContent, sheet: h }; });
    ok(ad && ad.key === 'All in one place' && /Tide Clock: all in one place/.test(ad.sheet), '   and from Adamas (the app opened from Fabrica)', ad);
    // the sheet's parts lift under the pointer, with no violet wash
    await p.evaluate(() => IngAppView.open('Tide Clock')); await p.waitForTimeout(1800);
    await p.screenshot({ path: path.join(OUT, 'all_in_one_place.png') });
    const y0 = await p.evaluate(() => document.querySelector('.fbx.r333x .r337-keys .f-btn').getBoundingClientRect().top);
    await p.hover('.fbx.r333x .r337-keys .f-btn'); await p.waitForTimeout(450);
    const h7 = await p.evaluate(() => { const k = document.querySelector('.fbx.r333x .r337-keys .f-btn'), cs = getComputedStyle(k); return { top: k.getBoundingClientRect().top, bg: cs.backgroundColor }; });
    ok(y0 - h7.top >= 1 && !violet(h7.bg), '   its keys are Fabrica\'s own, lifting under the pointer, no violet wash', { lift: y0 - h7.top, bg: h7.bg });
  } catch (e) { ok(false, 'the run finished', e.message); }
  ok(errs.length === 0, 'no page error', errs.slice(0, 5));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
