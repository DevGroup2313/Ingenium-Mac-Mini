// Folder search, phase 4: the scheduler (rag/scheduler.worker.js, rag/scheduler.js, IngRag.schedule / reconcile, the card's choice in
// build/modules/r202.js), on the BUILT page in headless Chromium with the desktop app's folder bridge standing in (rig/rag_bridge.py,
// rig/rag_bridge_shim.js). Her done criterion 5: "Reindex. Add one file, modify one, delete one, then run reconcile once. Assert that the
// index reflects each change and that the number of embedding calls equals the number of new or changed chunks only." What is checked:
//   1. the clock: the card's choice is "Every 20 minutes" by default, the scheduler is set to 20 minutes with a first look about two
//      minutes after the app opens, its ticks come from a worker (rag/scheduler.worker.js), "Never" stops it and says so
//   2. a copy of household_papers is added and read by hand (the baseline)
//   3. a look with nothing changed, in a page opened afresh: no folder is read and the reading model is not even loaded
//   4. one file added, one changed (a paragraph added at its end), one deleted; ONE tick of the clock (a short interval for the test):
//      the report names 2 new or changed and 1 gone; the new file and its passages are in the index; the changed file's new words are
//      found by the text search and its old passages that did not change kept their ids' hashes; the deleted file has no file row, no
//      passage, no text-search row and no vector left; the reading model embedded exactly the passages whose hash was not in the cache
//      before (the new or changed ones), not one more
//   5. questions asked while the reconcile runs all get answers (one transaction per file: a reader never sees half a file)
//   6. a second tick with nothing changed embeds nothing; 7. a folder whose drive is away is noted and nothing is taken out
//   8. no request leaves this computer, no page error
//   node rig/t_rag4_schedule.js http://127.0.0.1:8188/ <out folder>     (RAG_E2E: the page folder with rag/ and rag/vendor; RAG_BRIDGE)
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [BASE0, OUT] = process.argv.slice(2);
if (!BASE0 || !OUT) { console.log('usage: node rig/t_rag4_schedule.js <page server address> <out folder>'); process.exit(2); }
const BASE = BASE0.replace(/\/?$/, '/'); const ORIGIN = new URL(BASE).origin; const PAGE = BASE + 'ingenium.html';
const BRIDGE = (process.env.RAG_BRIDGE || 'http://127.0.0.1:8199').replace(/\/$/, ''); const BRIDGE_ORIGIN = new URL(BRIDGE).origin;
const E2E = process.env.RAG_E2E || '/tmp/claude-0/-home-user/20533335-3d8c-5333-8292-4941e284bafb/scratchpad/e2e';
const SRC = path.resolve(__dirname, '..'); const FIX = path.join(SRC, 'rag', 'fixtures');
fs.mkdirSync(OUT, { recursive: true }); const OUTA = path.resolve(OUT);
const WORK = path.join(OUTA, 'work'), HOUSE = path.join(WORK, 'household_papers');
let pass = 0, fail = 0; const T0 = Date.now();
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; return !!c; };
const note = (m) => console.log('     ' + m);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function reachable(url, method) { try { const r = await fetch(url, { method: method || 'GET' }); return r.ok; } catch (e) { return false; } }
async function bridgePost(p, body) { const r = await fetch(BRIDGE + p, { method: 'POST', body: JSON.stringify(body) }); return r.json(); }
const started = [];
async function ensureServers() {
  if (!(await reachable(PAGE, 'HEAD'))) {
    const u = new URL(BASE);
    const code = ['import http.server, sys', 'root, port = sys.argv[1], int(sys.argv[2])', 'class H(http.server.SimpleHTTPRequestHandler):',
      "    extensions_map = dict(http.server.SimpleHTTPRequestHandler.extensions_map, **{'.mjs': 'text/javascript', '.js': 'text/javascript', '.wasm': 'application/wasm', '.json': 'application/json', '.onnx': 'application/octet-stream', '.html': 'text/html; charset=utf-8'})",
      "    def end_headers(self):", "        self.send_header('Cache-Control', 'no-store'); super().end_headers()", "    def log_message(self, *a): pass",
      "http.server.ThreadingHTTPServer(('127.0.0.1', port), lambda *a, **k: H(*a, directory=root, **k)).serve_forever()"].join('\n');
    started.push(cp.spawn('python3', ['-c', code, E2E, u.port || '80'], { stdio: 'ignore' }));
    for (let i = 0; i < 40 && !(await reachable(PAGE, 'HEAD')); i++) await sleep(250);
    if (!(await reachable(PAGE, 'HEAD'))) throw new Error('the page server did not start');
  }
  if (!(await reachable(BRIDGE + '/'))) {
    started.push(cp.spawn('python3', [path.join(SRC, 'rig', 'rag_bridge.py'), new URL(BRIDGE).port, '--state', path.join(OUTA, 'bridge_state')], { stdio: 'ignore' }));
    for (let i = 0; i < 40 && !(await reachable(BRIDGE + '/')); i++) await sleep(250);
    if (!(await reachable(BRIDGE + '/'))) throw new Error('the bridge stand-in did not start');
  }
}
const ALLOWED = (u) => u.origin === ORIGIN || u.origin === BRIDGE_ORIGIN || /^(data|blob|about):/.test(u.protocol);

(async () => {
  await ensureServers();
  fs.rmSync(WORK, { recursive: true, force: true }); fs.mkdirSync(WORK, { recursive: true });
  fs.cpSync(path.join(FIX, 'household_papers'), HOUSE, { recursive: true });
  await bridgePost('/admin/state', { dir: null });
  const profile = path.join(OUTA, 'profile'); fs.rmSync(profile, { recursive: true, force: true });
  const ctx = await pw.chromium.launchPersistentContext(profile, { headless: true, viewport: { width: 1280, height: 900 } }); ctx.setDefaultTimeout(60000);
  const requests = [], external = [], errors = [];
  await ctx.route((u) => !ALLOWED(u), (route) => { external.push(route.request().url()); route.abort(); });
  ctx.on('request', (r) => requests.push(r.url()));
  await ctx.addInitScript('window.__RAG_BRIDGE__ = ' + JSON.stringify(BRIDGE)); await ctx.addInitScript({ path: path.join(SRC, 'rig', 'rag_bridge_shim.js') });
  await ctx.addInitScript(() => { window.__ING_RAG_TEST__ = true; });
  const p = ctx.pages()[0] || await ctx.newPage(); p.on('pageerror', (e) => errors.push(e.message));
  const boot = async () => {
    await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(800);
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
    await p.waitForTimeout(400);
    await p.waitForFunction(() => !!(window.IngRag && window.IngRag.schedule && window.IngRagCard), null, { timeout: 60000 });
    await p.waitForTimeout(600);
  };
  const openCard = async () => { await p.evaluate(() => { go('settings'); try { IngRooms.open('settings', 'ai'); } catch (e) { } try { IngSettingsParts.show('ai', 'search'); } catch (e) { } }); await p.waitForTimeout(400); await p.locator('#ragCard').scrollIntoViewIfNeeded(); await p.waitForTimeout(300); };
  const sql = (q, bind) => p.evaluate(([q, b]) => IngRag._store.debug.sql({ sql: q, bind: b }), [q, bind || []]);
  try {
    // ------------------------------------------------------------------------------------------ 1. the clock
    note('1. the clock');
    await p.goto(PAGE); await boot();
    const st1 = await p.evaluate(() => { const s = IngRag.scheduleState(); return { minutes: s.minutes, inMs: s.next - Date.now(), dflt: s.defaultMinutes }; });
    ok(st1.minutes === 20 && st1.dflt === 20 && st1.inMs > 60000 && st1.inMs <= 120000, 'the scheduler is set to every 20 minutes, the first look about two minutes after the app opens', st1);
    ok(requests.some((u) => /\/rag\/scheduler\.worker\.js$/.test(u)), 'its clock is a worker (rag/scheduler.worker.js), on the app\'s own address');
    await openCard();
    const c1 = await p.evaluate(() => ({ val: document.getElementById('ragEvery').value, opts: [...document.querySelectorAll('#ragEvery option')].map((o) => o.textContent), label: document.querySelector('label[for="ragEvery"]').textContent, next: document.getElementById('ragNext').textContent }));
    ok(c1.val === '20' && c1.opts.length === 5 && /Look for changes/.test(c1.label) && /Next look in (a moment|about [12] minutes?)/.test(c1.next), 'the card offers the choice, set to Every 20 minutes, and says when the next look comes', c1);
    await p.selectOption('#ragEvery', '0'); await p.waitForTimeout(500);
    const c2 = await p.evaluate(() => ({ min: IngRag.scheduleState().minutes, saved: state.rag && state.rag.every, next: document.getElementById('ragNext').textContent }));
    ok(c2.min === 0 && c2.saved === 0 && /only when you press Read it now/.test(c2.next), '"Never" stops the clock, is kept, and the card says so', c2);
    await p.selectOption('#ragEvery', '20'); await p.waitForTimeout(500);
    ok(await p.evaluate(() => IngRag.scheduleState().minutes === 20 && state.rag.every === 20), 'back to every 20 minutes');

    // ------------------------------------------------------------------------------------------ 2. the baseline
    note('2. a copy of household_papers, read by hand');
    await bridgePost('/admin/dialog', { answers: [HOUSE] });
    const fid = await p.evaluate(async () => { const a = await IngRag.addFolder(); await IngRag.indexFolder(a.folder.id); return a.folder.id; });
    const base = await p.evaluate(async (fid) => (await IngRag._store.file.list({ folderId: fid })).length, fid);
    ok(base === 20, 'the folder is read: 20 files', base);

    // ------------------------------------------------------------------------------------------ 3. nothing changed, a fresh page
    note('3. a look with nothing changed, in a page opened afresh');
    await p.evaluate(() => IngRag.schedule(0));
    await p.reload(); await boot();
    await p.evaluate(() => IngRag.schedule(0));
    const r3 = await p.evaluate(async () => { const before = !!IngRag._embedder; const r = await IngRag.reconcile('test'); return { before, after: !!IngRag._embedder, read: r.read, folders: r.folders, changed: r.changed, gone: r.gone, errors: r.errors }; });
    ok(!r3.before && r3.folders === 1 && r3.read === 0 && !r3.changed && !r3.gone && !r3.errors.length && !r3.after, 'nothing changed: the folder is looked at, not read, and the reading model is not loaded', r3);

    // ------------------------------------------------------------------------------------------ 4. add, modify, delete; one tick
    note('4. one file added, one changed, one deleted; one tick');
    await p.evaluate(async () => { await IngRag.ready(); });   // the reading model, so its counter can be read before the tick
    // the file to change: the plain-text or Markdown file with the most passages, so that a paragraph added at its end leaves its
    // earlier passages as they were
    const MOD = await p.evaluate(async (fid) => (await IngRag._store.debug.sql({ sql: "select f.path as p, count(*) as n from chunks c join files f on f.id = c.file_id where f.folder_id = ? and (f.path like '%.txt' or f.path like '%.md') and f.path <> 'recipes/cardamom_buns.md' group by f.path order by n desc, f.path limit 1", bind: [fid] }))[0], fid);
    note('the file changed: ' + MOD.p + ' (' + MOD.n + ' passages)');
    const before = await p.evaluate(async ([fid, mp]) => {
      const s = IngRag._store, info = await IngRag._embedder.info();
      const cache = (await s.debug.sql({ sql: 'select hash from emb_cache' })).map((r) => r.hash);
      const warr = await s.debug.sql({ sql: 'select c.id, c.content_hash as h from chunks c join files f on f.id = c.file_id where f.folder_id = ? and f.path = ?', bind: [fid, mp] });
      return { embedded: info.embedded, cache, warr };
    }, [fid, MOD.p]);
    fs.writeFileSync(path.join(HOUSE, 'home', 'loft_insulation.md'), '# Loft insulation\n\nThe loft was insulated on 3 March 2026 by Hollins Insulation, with 270 mm of mineral wool rolls laid crosswise over the joists.\n\n## Cost\n\nThe quote was £1,180; the grant from the council paid £400 of it, so the household paid £780.\n');
    fs.appendFileSync(path.join(HOUSE, ...MOD.p.split('/')), '\n\nThe new cordless vacuum, bought on 2 November 2026 from Marlow Electrical, carries a three-year guarantee that ends on 2 November 2029; the registration code is VX-4471-QK.\n');
    fs.rmSync(path.join(HOUSE, 'recipes', 'cardamom_buns.md'));
    const reports = [];
    await p.exposeFunction('__report', (r) => reports.push(r));
    await p.evaluate(() => { IngRag.on((ev) => { if (ev.type === 'scheduled' && ev.phase === 'done') window.__report(ev.report); }); });
    await p.evaluate(() => IngRag.schedule(0, { everyMs: 4000 }));
    const t4 = Date.now();
    // questions asked while it runs (5.)
    const asked = p.evaluate(async () => { const out = []; for (let i = 0; i < 12; i++) { try { const r = await IngRag.retrieve(i % 2 ? 'When does the dishwasher warranty run until?' : 'What is the buildings sum insured?', 'me'); out.push({ ok: true, n: r.passages.length }); } catch (e) { out.push({ ok: false, e: String(e && e.message || e) }); } await new Promise((r) => setTimeout(r, 400)); } return out; });
    while (!reports.length && Date.now() - t4 < 240000) await sleep(250);
    await p.evaluate(() => IngRag.schedule(0));
    const answers = await asked;   // each question is one embedding of its own (bge's query form): counted apart below
    const rep = reports[0] || {};
    ok(reports.length >= 1 && rep.read === 1 && rep.changed === 2 && rep.gone === 1 && !rep.errors.length, 'one tick of the clock reconciled the folder: 2 new or changed, 1 gone, read again', { n: reports.length, read: rep.read, changed: rep.changed, gone: rep.gone, errors: rep.errors, ms: rep.ms });
    const after = await p.evaluate(async ([fid, mp]) => {
      const s = IngRag._store, info = await IngRag._embedder.info();
      const files = (await s.file.list({ folderId: fid })).map((f) => f.path);
      const hashes = (await s.debug.sql({ sql: 'select c.content_hash as h from chunks c where c.folder_id = ?', bind: [fid] })).map((r) => r.h);
      const gone = await s.debug.sql({ sql: "select count(*) as n from chunks where file_path = 'recipes/cardamom_buns.md'" });
      const counts = await s.debug.sql({ sql: 'select (select count(*) from chunks) as c, (select count(*) from chunks_fts) as f, (select count(*) from chunks_vec) as v' });
      const warr = await s.debug.sql({ sql: 'select c.id, c.content_hash as h from chunks c join files f on f.id = c.file_id where f.folder_id = ? and f.path = ?', bind: [fid, mp] });
      const loft = await s.debug.sql({ sql: 'select count(*) as n from chunks c join files f on f.id = c.file_id where f.folder_id = ? and f.path = ?', bind: [fid, 'home/loft_insulation.md'] });
      const vac = await IngRag.retrieve('When does the guarantee of the cordless vacuum from Marlow Electrical end?', 'me');
      const loftQ = await IngRag.retrieve('How much did the household pay for the loft insulation?', 'me');
      const buns = await s.search.fts({ query: 'cardamom buns knead', principalId: IngRag._principalId, k: 20 });
      return { embedded: info.embedded, files, hashes, gone: gone[0].n, counts: counts[0], warr, loft: loft[0].n,
        vac: vac.passages.slice(0, 5).map((x) => x.filePath + ':' + /VX-4471-QK/.test(x.text)), vacIn: vac.passages.some((x) => x.filePath === mp && /VX-4471-QK/.test(x.text)), loftQ: loftQ.passages.slice(0, 5).map((x) => x.filePath + ':' + /£780/.test(x.text)), bunsHits: buns.hits.length };
    }, [fid, MOD.p]);
    ok(after.files.length === 20 && after.files.includes('home/loft_insulation.md') && !after.files.includes('recipes/cardamom_buns.md') && after.loft > 0, 'the index reflects each change: the new file is in it with its passages, the deleted one is not', { files: after.files.length, loft: after.loft });
    ok(after.gone === 0 && after.counts.c === after.counts.f && after.counts.c === after.counts.v && after.bunsHits === 0, 'the deleted file left no passage, no text-search row and no vector', { gone: after.gone, counts: after.counts, buns: after.bunsHits });
    ok(after.vacIn && after.loftQ.some((x) => /loft_insulation\.md:true/.test(x)), 'the changed file\'s new words and the new file are found by retrieval', { vac: after.vac, loft: after.loftQ });
    const oldH = new Set(before.warr.map((x) => x.h)), keptH = after.warr.filter((x) => oldH.has(x.h)).length;
    ok(before.warr.length >= 2 && keptH >= before.warr.length - 1 && after.warr.length >= before.warr.length, 'the changed file keeps its unchanged passages as they were (' + keptH + ' of ' + before.warr.length + '); only its changed end was read again', { before: before.warr.length, after: after.warr.length, kept: keptH });
    const cacheBefore = new Set(before.cache), fresh = new Set(after.hashes.filter((h) => !cacheBefore.has(h)));
    const calls = after.embedded - before.embedded - answers.length;
    ok(fresh.size > 0 && calls === fresh.size, 'the reading model embedded exactly the new or changed passages: ' + calls + ' embedded, ' + fresh.size + ' new or changed (of ' + after.hashes.length + ' in the folder)', { calls, fresh: fresh.size, total: after.hashes.length });
    ok(answers.length === 12 && answers.every((a) => a.ok && a.n === 5), 'questions asked while the folder was being reconciled all got their five passages', answers.filter((a) => !a.ok).slice(0, 3));

    // ------------------------------------------------------------------------------------------ 6. nothing changed again
    note('6. a second look, nothing changed');
    const e6 = await p.evaluate(async () => (await IngRag._embedder.info()).embedded);
    const r6 = await p.evaluate(async () => { const r = await IngRag.reconcile('test'); return { read: r.read, changed: r.changed, gone: r.gone }; });
    const e6b = await p.evaluate(async () => (await IngRag._embedder.info()).embedded);
    ok(r6.read === 0 && e6b === e6, 'nothing changed: nothing read, nothing embedded', { r6, embedded: e6b - e6 });

    // ------------------------------------------------------------------------------------------ 7. the drive away
    note('7. the folder is away (as a drive unplugged)');
    fs.renameSync(HOUSE, HOUSE + '_away');
    const r7 = await p.evaluate(async (fid) => { const r = await IngRag.reconcile('test'); return { read: r.read, errors: r.errors, files: (await IngRag._store.file.list({ folderId: fid })).length }; }, fid);
    fs.renameSync(HOUSE + '_away', HOUSE);
    ok(r7.read === 0 && r7.errors.length === 1 && r7.files === 20, 'a folder that cannot be listed is noted, and nothing is taken out of the index', r7);
    await openCard();
    const c7 = await p.evaluate(() => document.getElementById('ragNext').textContent);
    ok(/Last look .*could not be looked at/.test(c7), 'the card says what the last look found', c7);

    // ------------------------------------------------------------------------------------------ 8. nothing went out
    ok(!external.length, 'no request left this computer (the stand-ins aside)', external.slice(0, 5));
    ok(!errors.length, 'no page error', errors.slice(0, 5));
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 1500)); }
  finally { try { await ctx.close(); } catch (e) { } for (const s of started) { try { s.kill(); } catch (e) { } } }
  console.log('\n' + pass + ' passed, ' + fail + ' failed in ' + ((Date.now() - T0) / 60000).toFixed(1) + ' min');
  fs.writeFileSync(path.join(OUTA, 'result.json'), JSON.stringify({ pass, fail }, null, 1));
  process.exit(fail ? 1 : 0);
})();
