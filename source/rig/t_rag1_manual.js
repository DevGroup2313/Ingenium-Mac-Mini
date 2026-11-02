// Folder search, phase 1, by hand: the BUILT page (with the loader build/modules/r202.js and the card "Folders for the chat" in Settings)
// in headless Chromium, with the desktop app's folder bridge standing in (rig/rag_bridge.py, which runs the patch's own functions, and
// rig/rag_bridge_shim.js, which gives the page window.pywebview.api.rag_*). A person's way through it, with nothing faked in the page:
//   - the browser page WITHOUT the bridge: no card, no window.IngRag, nothing requested from rag/
//   - with the bridge: the loader imports rag/main.js, the card is in Settings (Models and AI), empty at first, its words and its keys
//   - "Add a folder..." three times (the three folders of rag/fixtures, answered by the stand-in's dialog queue), by keyboard for the
//     first; each folder with its name and path, an ACL row for the one user "me" in the store for each
//   - "Read it now" for each folder, all 72 files: every file indexed (or its failure named), the file sizes and SHA-256 equal to the
//     fixtures' MANIFEST, the chunk counts (3,511 in all, the 4 MB log 3,154), the metadata of every chunk, a row in chunks, chunks_fts
//     and chunks_vec for each chunk, the 4 MB file, a few chunks' text equal to the file's own slice, the 37 facts found by the text
//     search and by the vectors, a progress line while reading, the card's numbers equal to the store's
//   - "Read it again now" with nothing changed embeds nothing new (the embedder's own counter), and stopping a reading keeps the index whole
//   - the index survives a reload (the card, the counts, and a new embedder that embeds nothing for unchanged files)
//   - Remove (a question first, Escape keeps the folder): the folder's rows are gone from every table, the app forgets the folder, the room
//     is given back after a big one (compact), and with every folder removed nothing is left in any table
//   - the peak memory of every Chromium process while all this runs (ps, every 250 ms; the page's own measure if the browser gives it)
//   - no request leaves this computer, no script or worker errors, every section ran
//   python3 -m http.server-like server for <E2E> on 8178 (the page folder: ingenium.html, rag/, rag/vendor/) and rig/rag_bridge.py on 8198
//   node rig/t_rag1_manual.js http://127.0.0.1:8178/ <out folder> [--quick]
//   --quick: only the household folder (20 files), no memory limit; for trying the test itself. Environment: RAG_E2E (the page folder,
//   default the scratchpad's rag0/e2e), RAG_BRIDGE (default http://127.0.0.1:8198), RAG_MAX_MIN (give up after this many minutes, 110),
//   RAG_WORKERS (embedder workers, default the app's own choice), AXE_JS (axe-core, to check the card).
// If nothing answers at the two addresses and they are on this computer, the test starts them (and stops them at the end).
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [BASE0, OUT, ...FLAGS] = process.argv.slice(2);
if (!BASE0 || !OUT) { console.log('usage: node rig/t_rag1_manual.js <page server address> <out folder> [--quick]'); process.exit(2); }
const QUICK = FLAGS.includes('--quick');
const BASE = BASE0.replace(/\/?$/, '/'); const ORIGIN = new URL(BASE).origin; const PAGE = BASE + 'ingenium.html';
const BRIDGE = (process.env.RAG_BRIDGE || 'http://127.0.0.1:8198').replace(/\/$/, ''); const BRIDGE_ORIGIN = new URL(BRIDGE).origin;
const E2E = process.env.RAG_E2E || '/tmp/claude-0/-home-user/f70d4091-5e3f-5b2b-9e4a-4f66b5694ecf/scratchpad/rag0/e2e';
const MAX_MIN = Number(process.env.RAG_MAX_MIN || 110);
const SRC = path.resolve(__dirname, '..'); const FIX = path.join(SRC, 'rag', 'fixtures');
fs.mkdirSync(OUT, { recursive: true }); const OUTA = path.resolve(OUT);
const T0 = Date.now();
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; return !!c; };
const note = (m) => console.log('     ' + m);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const mins = () => ((Date.now() - T0) / 60000).toFixed(1);
async function reachable(url, method) { try { const r = await fetch(url, { method: method || 'GET' }); return r.ok; } catch (e) { return false; } }   // the page is 74 MB: ask for its head only
async function bridgePost(p, body) { const r = await fetch(BRIDGE + p, { method: 'POST', body: JSON.stringify(body) }); return r.json(); }

// ------------------------------------------------------------------------------------------------ the two servers
const started = [];
async function ensureServers() {
  if (!(await reachable(PAGE, 'HEAD'))) {
    const u = new URL(BASE);
    if (!/^(127\.0\.0\.1|localhost)$/.test(u.hostname)) throw new Error('nothing answers at ' + BASE);
    const code = [
      'import http.server, sys', 'root, port = sys.argv[1], int(sys.argv[2])',
      'class H(http.server.SimpleHTTPRequestHandler):',
      "    extensions_map = dict(http.server.SimpleHTTPRequestHandler.extensions_map, **{'.mjs': 'text/javascript', '.js': 'text/javascript', '.wasm': 'application/wasm', '.json': 'application/json', '.onnx': 'application/octet-stream', '.html': 'text/html; charset=utf-8'})",
      "    def end_headers(self):", "        self.send_header('Cache-Control', 'no-store'); super().end_headers()",
      "    def log_message(self, *a): pass",
      "http.server.ThreadingHTTPServer(('127.0.0.1', port), lambda *a, **k: H(*a, directory=root, **k)).serve_forever()"].join('\n');
    started.push(cp.spawn('python3', ['-c', code, E2E, u.port || '80'], { stdio: 'ignore' }));
    for (let i = 0; i < 40 && !(await reachable(PAGE, 'HEAD')); i++) await sleep(250);
    if (!(await reachable(PAGE, 'HEAD'))) throw new Error('the page server did not start (is ' + path.join(E2E, 'ingenium.html') + ' there?)');
  }
  if (!(await reachable(BRIDGE + '/'))) {
    const u = new URL(BRIDGE);
    if (!/^(127\.0\.0\.1|localhost)$/.test(u.hostname)) throw new Error('nothing answers at ' + BRIDGE);
    started.push(cp.spawn('python3', [path.join(SRC, 'rig', 'rag_bridge.py'), u.port, '--state', path.join(OUT, 'bridge_state')], { stdio: 'ignore' }));
    for (let i = 0; i < 40 && !(await reachable(BRIDGE + '/')); i++) await sleep(250);
    if (!(await reachable(BRIDGE + '/'))) throw new Error('the bridge stand-in did not start');
  }
}

// ------------------------------------------------------------------------------------------------ memory: the Chromium processes, by ps
function psAll() {
  return new Promise((resolve, reject) => cp.execFile('ps', ['-eo', 'pid=,ppid=,rss=,args='], { maxBuffer: 16e6 }, (e, out) => {
    if (e) return reject(e);
    resolve(out.split('\n').map((l) => /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(.*)$/.exec(l)).filter(Boolean).map((m) => ({ pid: +m[1], ppid: +m[2], rss: +m[3], args: m[4] })));
  }));
}
function tree(all, root) {
  const kids = new Map(); for (const p of all) { if (!kids.has(p.ppid)) kids.set(p.ppid, []); kids.get(p.ppid).push(p); }
  const byPid = new Map(all.map((p) => [p.pid, p])); const out = []; const q = byPid.has(root) ? [byPid.get(root)] : [];
  while (q.length) { const p = q.shift(); out.push(p); for (const k of kids.get(p.pid) || []) q.push(k); }
  return out;
}
const typeOf = (args) => { const m = /--type=([\w-]+)/.exec(args); if (!m) return 'browser'; return m[1] === 'utility' && /NetworkService/.test(args) ? 'network' : m[1]; };
function pssKB(pid) { try { const t = fs.readFileSync('/proc/' + pid + '/smaps_rollup', 'utf8'); const m = /^Pss:\s+(\d+) kB/m.exec(t); return m ? +m[1] : 0; } catch (e) { return 0; } }
async function findRoot(profile) {
  for (let i = 0; i < 80; i++) {
    const all = await psAll(); const r = all.find((p) => p.args.includes('--user-data-dir=' + profile) && !/--type=/.test(p.args));
    if (r) return r.pid; await sleep(250);
  }
  throw new Error('the browser process was not found');
}
function startSampler(root) {
  const m = { root, samples: 0, maxKB: 0, maxAtMin: 0, maxPhase: '', typesAtMax: {}, maxByType: {}, pssMaxKB: 0, series: [], phase: 'start', errors: 0, phaseMax: {}, stopped: false, procsAtMax: 0 };
  const t0 = Date.now(); let n = 0;
  const loop = async () => {
    if (m.stopped) return; const began = Date.now();
    try {
      const mine = tree(await psAll(), root); let total = 0; const by = {};
      for (const p of mine) { total += p.rss; const t = typeOf(p.args); by[t] = (by[t] || 0) + p.rss; }
      m.samples++; n++;
      if (total > m.maxKB) { m.maxKB = total; m.maxAtMin = +((Date.now() - T0) / 60000).toFixed(1); m.maxPhase = m.phase; m.typesAtMax = by; m.procsAtMax = mine.length; }
      if (!m.phaseMax[m.phase] || total > m.phaseMax[m.phase]) m.phaseMax[m.phase] = total;
      for (const t of Object.keys(by)) if (by[t] > (m.maxByType[t] || 0)) m.maxByType[t] = by[t];
      if (n % 4 === 0) { const pss = mine.reduce((s, p) => s + pssKB(p.pid), 0); if (pss > m.pssMaxKB) m.pssMaxKB = pss; }
      if (n % 80 === 0) m.series.push([+((Date.now() - t0) / 60000).toFixed(2), Math.round(total / 1024), m.phase]);
    } catch (e) { m.errors++; }
    m.timer = setTimeout(loop, Math.max(10, 250 - (Date.now() - began)));
  };
  loop();
  m.stop = () => { m.stopped = true; clearTimeout(m.timer); };
  return m;
}

// ------------------------------------------------------------------------------------------------ a browser with the page open
const ALLOWED = (u) => u.origin === ORIGIN || u.origin === BRIDGE_ORIGIN || /^(data|blob|about):/.test(u.protocol);
async function openBrowser(name, withBridge) {
  const profile = path.join(OUTA, 'profile-' + name); fs.rmSync(profile, { recursive: true, force: true });
  const ctx = await pw.chromium.launchPersistentContext(profile, { headless: true, viewport: { width: 1280, height: 900 } }); ctx.setDefaultTimeout(60000);
  const run = { name, ctx, requests: [], external: [], consoleErrors: [], pageErrors: [], workerUrls: [], profile, sampler: null };
  await ctx.route((u) => !ALLOWED(u), (route) => { run.external.push(route.request().url()); route.abort(); });
  ctx.on('request', (r) => run.requests.push(r.url()));
  await ctx.addInitScript('window.__ING_RAG_TEST__ = true');   // the store's own test operations (debug.*), which the app never has
  if (withBridge) { await ctx.addInitScript('window.__RAG_BRIDGE__ = ' + JSON.stringify(BRIDGE)); await ctx.addInitScript({ path: path.join(SRC, 'rig', 'rag_bridge_shim.js') }); }
  const page = ctx.pages()[0] || await ctx.newPage(); run.page = page;
  page.on('pageerror', (e) => run.pageErrors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') run.consoleErrors.push(m.text().slice(0, 300)); });
  page.on('worker', (w) => run.workerUrls.push(w.url()));
  run.root = await findRoot(profile);
  run.sampler = startSampler(run.root);
  run.close = async () => { run.sampler.stop(); await ctx.close(); };
  return run;
}
async function bootPage(run) {
  const p = run.page;
  await p.goto(PAGE, { waitUntil: 'load', timeout: 300000 });
  await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 });
  await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(500);
  await p.waitForFunction(() => typeof window.go === 'function' && window.IngRooms, null, { timeout: 60000 });
}
async function openSettings(p, expectCard) {
  await p.evaluate(() => { go('settings'); });
  await p.waitForTimeout(400);
  await p.evaluate(() => { try { IngRooms.open('settings', 'ai'); } catch (e) { /* the room tabs may be absent */ } });
  await p.waitForTimeout(300);
  if (expectCard) {            // the card opens the index when it comes into view, as a person scrolling down to it would
    await p.waitForSelector('#ragCard', { state: 'visible', timeout: 60000 });
    await p.locator('#ragCard').scrollIntoViewIfNeeded();
  }
}

// ------------------------------------------------------------------------------------------------ the fixtures
const MANIFEST = JSON.parse(fs.readFileSync(path.join(FIX, 'MANIFEST.json'), 'utf8')).files;
const FACTS = JSON.parse(fs.readFileSync(path.join(FIX, 'FACTS.json'), 'utf8')).facts;
const FOLDERS = QUICK ? ['household_papers'] : ['household_papers', 'lab_notes', 'historian_archive'];
const BIG_FILE = 'logbook/ship_logbooks_1781-1802.txt';
// from rag/notes/index.md section 4: the whole corpus parsed with the model's own tokenizer (the chunker is deterministic)
const EXPECT_CHUNKS = { total: 3511, bigFile: 3154, household: 50, byExt: { txt: 3182, md: 76, html: 24, json: 42, csv: 77, pdf: 77, docx: 33 } };
const manifestOf = (folder) => MANIFEST.filter((m) => m.path.startsWith(folder + '/')).map((m) => Object.assign({ rel: m.path.slice(folder.length + 1) }, m));
const ext = (p) => (p.split('.').pop() || '').toLowerCase();

// ------------------------------------------------------------------------------------------------ the test
(async () => {
  await ensureServers();
  const result = { quick: QUICK, startedAt: new Date().toISOString(), cpus: require('os').cpus().length, loadAvg: require('os').loadavg(), sections: [] };
  const SECTIONS = ['without the bridge', 'loader and card', 'adding folders', 'reading', 'the index', 'reading again', 'plain words', 'reload', 'removing', 'an emptied folder, and starting again', 'memory and privacy'];
  const ran = [];
  const section = async (name, fn) => { console.log('--- ' + name + ' (' + mins() + ' min)'); try { await fn(); ran.push(name); } catch (e) { ok(false, 'section "' + name + '" stopped: ' + (e && e.stack || e).toString().slice(0, 900)); } };
  const giveUp = () => { if ((Date.now() - T0) / 60000 > MAX_MIN) throw new Error('gave up: more than ' + MAX_MIN + ' minutes'); };
  let base = null;            // the browser without the bridge
  let run = null;             // the browser with the bridge

  // ---------------------------------------------------------------------------------------- the browser page without the bridge
  await section('without the bridge', async () => {
    base = await openBrowser('nobridge', false);
    base.sampler.phase = 'no bridge';
    await bootPage(base);
    await openSettings(base.page); await base.page.waitForTimeout(4000);
    const r = await base.page.evaluate(() => ({ ing: typeof window.IngRag, card: !!document.getElementById('ragCard'), pyw: typeof window.pywebview, part: (window.__ingParts || {}).p202, cardCss: !!document.getElementById('r202-css') }));
    ok(r.ing === 'undefined' && !r.card && r.pyw === 'undefined', 'the browser page without the bridge has no window.IngRag and no card in Settings', r);
    ok(r.part === 'running', 'the loader (part p202) ran in the browser page, and found no bridge', r.part);
    const ragReq = base.requests.filter((u) => /\/rag\//.test(new URL(u).pathname));
    ok(ragReq.length === 0, 'the browser page without the bridge requests nothing from rag/ (' + base.requests.length + ' requests in all)', ragReq);
    result.baseline = { requests: base.requests.length, external: base.external.slice(0, 20), consoleErrors: base.consoleErrors.slice(0, 20), pageErrors: base.pageErrors.slice(0, 20) };
    await base.close();
  });

  // ---------------------------------------------------------------------------------------- with the bridge
  run = await openBrowser('bridge', true);
  const sampler = run.sampler; const P = run.page;
  const phase = (s) => { sampler.phase = s; };
  const evalIn = (fn, arg) => P.evaluate(fn, arg);
  let ids = {};               // folder name -> id in the store
  let stats0 = null;          // the store's counts when every folder is read
  const dones = {};           // folder name -> the indexer's summary of its first reading
  const readings = {};        // folder name -> {minutes, samples of the progress line}

  await section('loader and card', async () => {
    phase('boot');
    await bootPage(run);
    await P.waitForFunction(() => window.IngRag, null, { timeout: 90000 });
    const w = process.env.RAG_WORKERS ? Number(process.env.RAG_WORKERS) : null;
    await evalIn((w) => {
      if (w) IngRag.config({ workers: w });
      window.__ragLog = { done: [], status: [], queued: 0 };
      IngRag.on((ev) => { if (ev.type === 'done') window.__ragLog.done.push({ folderId: ev.folderId, summary: ev.summary, error: ev.error && ev.error.plain }); else if (ev.type === 'status') window.__ragLog.status.push(ev.status); else if (ev.type === 'queued') window.__ragLog.queued++; });
    }, w);
    const r = await evalIn(() => ({ avail: IngRag.available(), state: IngRag.state(), part: (window.__ingParts || {}).p202, cap: typeof pywebview.api.rag_list, mem: typeof performance.measureUserAgentSpecificMemory, iso: window.crossOriginIsolated }));
    ok(r.avail === true && r.cap === 'function' && r.part === 'running', 'with the bridge, the loader imports rag/main.js: window.IngRag is there, available(), and nothing is opened yet (status ' + r.state.status + ')', r);
    ok(r.state.status === 'idle', 'importing started nothing: the store and the embedder are not opened until a call needs them', r.state);
    const early = run.requests.filter((u) => /\/rag\/(store|embedder|parse)\.?worker|\/vendor\//.test(u));
    ok(early.length === 0, 'no worker, no vendor file was requested before the card was seen', early.slice(0, 5));
    await openSettings(P, true);
    const room = await evalIn(() => { const c = document.getElementById('ragCard'); const pn = c.closest('.rm-panel'); return { room: pn ? pn.getAttribute('data-room') : null, h: c.querySelector('h2').textContent, role: c.getAttribute('role'), labelled: c.getAttribute('aria-labelledby') }; });
    ok(room.h === 'Folders for the chat' && room.role === 'region' && room.labelled === 'ragH', 'the card "Folders for the chat" is in Settings', room);
    ok(room.room === 'ai', 'and sits in the room "Models and AI" (named in r173.js)', room);
    await P.waitForFunction(() => /No folder yet/.test(document.querySelector('#ragCard .rag-none').textContent), null, { timeout: 60000 });
    const t = await evalIn(() => ({ text: document.getElementById('ragCard').innerText, add: !!document.getElementById('ragAdd'), addText: document.getElementById('ragAdd').textContent, status: IngRag.state().status }));
    ok(t.addText === 'Add a folder…' && /read on this computer only/i.test(t.text) && /Nothing is sent anywhere/.test(t.text) && /chat.s use of them comes next/.test(t.text), 'the card says the folders are read on this computer only and that the chat\'s use of them comes next, and has "Add a folder…"', t.text.slice(0, 500));
    ok(t.status === 'open', 'seeing the card opened the store only (status open; the embedder is not loaded for a list)', t.status);
    const jargon = /\b(embedding|vector|chunk|sqlite|opfs|index(?:er)?|tokeni[sz]|ONNX|RAG)\b/i.exec(t.text);
    ok(!jargon, 'the card uses plain words (no embedding, vector, chunk, SQLite, index, RAG)', jargon && jargon[0]);
    await P.locator('#ragCard').screenshot({ path: path.join(OUT, 'card-empty.png') });
    if (process.env.AXE_JS) {
      await P.addScriptTag({ path: process.env.AXE_JS });
      const ax = await evalIn(async () => { const r = await axe.run(document.getElementById('ragCard')); return r.violations.map((v) => v.id + ':' + v.nodes.length); });
      ok(ax.length === 0, 'axe finds nothing on the card (empty)', ax);
    }
  });

  await section('adding folders', async () => {
    await bridgePost('/admin/state', { dir: null });
    await bridgePost('/admin/dialog', { answers: FOLDERS.map((f) => path.join(FIX, f)) });
    for (let i = 0; i < FOLDERS.length; i++) {
      const f = FOLDERS[i];
      if (i === 0) { await P.focus('#ragAdd'); await P.keyboard.press('Enter'); }     // the first by keyboard
      else await P.click('#ragAdd');
      await P.waitForFunction((n) => document.querySelectorAll('#ragCard .rag-item').length >= n, i + 1, { timeout: 60000 });
      await P.waitForFunction(() => document.activeElement && document.activeElement.classList.contains('rag-read'), null, { timeout: 15000 }).catch(() => {});   // the focus moves a moment after the row appears
      const row = await evalIn((n) => { const r = document.querySelectorAll('#ragCard .rag-item')[n]; return { id: +r.getAttribute('data-id'), name: r.querySelector('.rag-name').textContent, path: r.querySelector('.rag-path').textContent, facts: r.querySelector('.rag-facts').textContent, read: r.querySelector('.rag-read').textContent, focus: document.activeElement && document.activeElement.className, note: document.getElementById('ragNote').textContent }; }, i);
      ids[f] = row.id;
      ok(row.name === f && row.path === path.join(FIX, f) && /Not read yet/.test(row.facts) && row.read === 'Read it now', 'folder ' + (i + 1) + ' added: the card shows its name, its path and "Not read yet"', row);
      if (i === 0) ok(/rag-read/.test(row.focus) && /Added/.test(row.note), 'adding by keyboard leaves the focus on the new folder\'s "Read it now" key, and says so', [row.focus, row.note]);
    }
    const db = await evalIn(async () => { const st = IngRag._store, pid = IngRag._principalId; const fl = await st.folder.list({ principalId: pid }); const all = await st.folder.list(); return { me: pid, mine: fl.map((f) => f.id), all: all.map((f) => f.id), allowed: await st.acl.allowed({ principalId: pid }), stats: await st.stats(), principals: await st.debug.sql({ sql: 'select id, name from principals' }), acl: await st.debug.sql({ sql: 'select folder_id, principal_id from folder_acl order by folder_id' }) }; });
    ok(db.all.length === FOLDERS.length && db.stats.folders === FOLDERS.length && db.stats.folder_acl === FOLDERS.length, 'the store has the ' + FOLDERS.length + ' folders and one ACL row for each', db.stats);
    ok(JSON.stringify(db.principals) === JSON.stringify([{ id: db.me, name: 'me' }]) && db.acl.every((a) => a.principal_id === db.me) && JSON.stringify(db.allowed) === JSON.stringify(db.all), 'the one user is "me" and holds every folder (acl.allowed = every folder id)', [db.principals, db.allowed]);
    const bf = await evalIn(async () => (await pywebview.api.rag_folders()).map((f) => f.path));
    ok(FOLDERS.every((f) => bf.includes(path.join(FIX, f))), 'the app remembers the folders chosen (rag_folders)', bf);
    // the same folder again is not added twice
    await bridgePost('/admin/dialog', { answers: [path.join(FIX, FOLDERS[0])] });
    await P.click('#ragAdd'); await P.waitForFunction(() => /already here/.test(document.getElementById('ragNote').textContent), null, { timeout: 30000 });
    const n2 = await evalIn(() => document.querySelectorAll('#ragCard .rag-item').length);
    ok(n2 === FOLDERS.length, 'choosing a folder that is already there says so and adds nothing', n2);
    // a closed dialog adds nothing and says nothing
    await bridgePost('/admin/dialog', { answers: [null] });
    await P.click('#ragAdd'); await P.waitForTimeout(600);
    const n3 = await evalIn(() => ({ n: document.querySelectorAll('#ragCard .rag-item').length, note: document.getElementById('ragNote').textContent, focus: document.activeElement && document.activeElement.id }));
    ok(n3.n === FOLDERS.length && n3.note === '' && n3.focus === 'ragAdd', 'a dialog closed without a choice adds nothing, says nothing and leaves the focus on "Add a folder…"', n3);
  });

  // reading one folder through the card's own key, watching its progress line
  async function readFolder(name, byKeyboard) {
    const id = ids[name]; const t1 = Date.now(); phase('reading ' + name);
    const before = await evalIn(() => window.__ragLog.done.length);
    if (byKeyboard) { await P.focus('#ragCard .rag-item[data-id="' + id + '"] .rag-read'); await P.keyboard.press('Enter'); }
    else await P.click('#ragCard .rag-item[data-id="' + id + '"] .rag-read');
    const seen = { says: new Set(), bars: [], stop: false, waiting: false, focusStop: null }; let lastLog = 0, shot = false;
    for (;;) {
      giveUp();
      const s = await evalIn(({ id, before }) => {
        const row = document.querySelector('#ragCard .rag-item[data-id="' + id + '"]'); if (!row) return { gone: true };
        const bar = row.querySelector('.rag-bar'); const stop = row.querySelector('.rag-stop');
        return { done: window.__ragLog.done.length > before, say: row.querySelector('.rag-say').textContent, bar: bar && !bar.hidden ? Number(bar.getAttribute('aria-valuenow')) : null, stopShown: !!stop && !stop.hidden, readDisabled: row.querySelector('.rag-read').getAttribute('aria-disabled') === 'true', focus: document.activeElement && document.activeElement.className, running: IngRag.running().length };
      }, { id, before });
      if (s.gone) throw new Error('the folder row vanished while it was read');
      if (s.say) seen.says.add(s.say.replace(/\d[\d,]*/g, '#').slice(0, 90));
      if (s.bar != null) seen.bars.push(s.bar);
      if (s.stopShown) { seen.stop = true; if (seen.focusStop === null) seen.focusStop = s.focus; }
      if (!shot && s.bar > 0 && Date.now() - t1 > 8000) { shot = true; try { await P.locator('#ragCard').screenshot({ path: path.join(OUT, 'card-reading-' + name + '.png') }); } catch (e) { /* a picture is not worth a failure */ } }
      if (s.done) break;
      if (Date.now() - lastLog > 60000) { lastLog = Date.now(); note('[' + name + '] ' + mins() + ' min · ' + (s.say || '').slice(0, 150) + ' · memory now/peak ' + Math.round(sampler.maxKB / 1024) + ' MB peak'); }
      await sleep(s.running ? 700 : 150);
    }
    const lastDone = await evalIn(() => window.__ragLog.done[window.__ragLog.done.length - 1]);
    readings[name] = { minutes: +((Date.now() - t1) / 60000).toFixed(2), sayKinds: [...seen.says].slice(0, 12), bars: seen.bars.length, maxBar: Math.max(0, ...seen.bars), stop: seen.stop, focusStop: seen.focusStop };
    dones[name] = lastDone.summary; if (lastDone.error) throw new Error('reading ' + name + ' failed: ' + lastDone.error);
    return lastDone.summary;
  }

  // the card repaints a moment after the indexer says it is done: wait for its last line
  const settled = (name) => P.waitForFunction((n) => { const row = [...document.querySelectorAll('#ragCard .rag-item')].find((x) => x.querySelector('.rag-name').textContent === n); return row && /^(Finished|Nothing had changed|Stopped)/.test(row.querySelector('.rag-say').textContent); }, name, { timeout: 60000 });

  await section('reading', async () => {
    for (let i = 0; i < FOLDERS.length; i++) {
      const name = FOLDERS[i]; const exp = manifestOf(name);
      const s = await readFolder(name, i === 0);      // the first by keyboard
      const r = readings[name];
      ok(s.files.total === exp.length && s.files.indexed === exp.length && s.files.failed === 0 && s.files.skipped === 0 && !s.stopped, name + ': all ' + exp.length + ' files read (indexed ' + s.files.indexed + ', failed ' + s.files.failed + ') in ' + r.minutes + ' min; ' + s.chunks + ' passages, ' + s.embedded + ' vectors made, ' + s.reused + ' reused', { files: s.files, failures: s.failures, notes: s.notes, warnings: s.warnings.slice(0, 5) });
      ok(r.stop && r.bars > 0 && r.sayKinds.some((k) => /^Reading file # of #/.test(k) || /Looking at the folder|Checking/.test(k)), name + ': the card showed a progress line and a Stop key while it read', r);
      if (i === 0) ok(/rag-stop/.test(String(r.focusStop)), 'reading by keyboard moves the focus to the Stop key', r.focusStop);
      await settled(name);
      const fin = await evalIn((n) => { const row = [...document.querySelectorAll('#ragCard .rag-item')].find((x) => x.querySelector('.rag-name').textContent === n); return { facts: row.querySelector('.rag-facts').textContent, say: row.querySelector('.rag-say').textContent, read: row.querySelector('.rag-read').textContent, stopHidden: row.querySelector('.rag-stop').hidden, warn: row.querySelector('.rag-warn').textContent, focus: document.activeElement && document.activeElement.className }; }, name);
      ok(/^Finished: /.test(fin.say) && /Read it again now/.test(fin.read) && fin.stopHidden && /Last read (just now|\d+ minutes? ago|today at)/.test(fin.facts), name + ': when it ends the card says how it went, offers "Read it again now" and shows when it was last read', fin);
      if (i === 0) { ok(/rag-read/.test(fin.focus), 'the focus comes back to the "Read it again now" key', fin.focus);
        const plain = await evalIn(() => ({ notes: [...document.querySelectorAll('#ragCard .rag-notes')].map((n) => n.textContent).join(' | '), text: document.getElementById('ragCard').innerText }));
        ok(/Windows text/.test(plain.notes) && !/UTF-8|Windows-1252/.test(plain.notes), 'a note about a file (the old letter saved as Windows text) is said in plain words, apart from the problems', plain.notes); await P.locator('#ragCard').screenshot({ path: path.join(OUT, 'card-after-first-reading.png') }); }
      if (i === 0 && !QUICK) await verifyIndex([name], true);
      if (i === 0 && fail > 0) { console.log('the first folder is wrong already: not waiting for the others'); throw new Error('stopped early'); }
    }
    result.readings = readings; result.summaries = dones;
  });

  // ---------------------------------------------------------------------------------------- the checks on what the store holds
  async function verifyIndex(names, early) {
    const tag = early ? '(early) ' : '';
    const rows = await evalIn(async ({ names }) => {
      const st = IngRag._store, pid = IngRag._principalId; const out = { folders: {}, stats: await st.stats() };
      const fl = await st.folder.list({ principalId: pid });
      for (const f of fl) {
        if (!names.includes(f.name)) continue;
        const files = await st.file.list({ folderId: f.id });
        const ch = await st.debug.sql({ sql: 'select file_path, chunk_index, heading_path, char_start, char_end, page, content_hash, length(text) as tl, folder_id from chunks where folder_id = ? order by file_path, chunk_index', bind: [f.id] });
        const per = {}; const issues = []; let n = 0;
        const add = (m) => { if (issues.length < 8) issues.push(m); };
        for (const c of ch) {
          (per[c.file_path] = per[c.file_path] || []).push(c);
          if (c.folder_id !== f.id) add('folder_id ' + c.file_path + '#' + c.chunk_index);
          if (!(c.char_start >= 0 && c.char_end > c.char_start)) add('offsets ' + c.file_path + '#' + c.chunk_index);
          if (!/^[0-9a-f]{64}$/.test(c.content_hash)) add('hash ' + c.file_path + '#' + c.chunk_index);
          if (!(c.tl > 0)) add('empty text ' + c.file_path + '#' + c.chunk_index);
          if (typeof c.heading_path !== 'string') add('heading ' + c.file_path + '#' + c.chunk_index);
          const isPdf = /\.pdf$/i.test(c.file_path); if (isPdf && !(c.page >= 1)) add('pdf page ' + c.file_path + '#' + c.chunk_index); if (!isPdf && c.page != null) add('page on a non-pdf ' + c.file_path);
          n++;
        }
        const fileInfo = files.map((x) => {
          const list = per[x.path] || []; let contiguous = list.length === x.chunkCount;
          list.forEach((c, i) => { if (c.chunk_index !== i) contiguous = false; if (i > 0) { const q = list[i - 1]; if (/\.pdf$/i.test(x.path) ? (c.page < q.page || (c.page === q.page && c.char_start < q.char_start)) : c.char_start < q.char_start) contiguous = false; } });   // a PDF's offsets are in its page's text
          if (!contiguous) add('chunk numbers/count ' + x.path);
          return { path: x.path, size: x.size, mtime: x.mtime, contentHash: x.contentHash, chunkCount: x.chunkCount, rows: list.length };
        });
        const withHeading = ch.filter((c) => c.heading_path !== '').length;
        out.folders[f.name] = { id: f.id, path: f.path, fileCount: f.fileCount, chunkCount: f.chunkCount, files: fileInfo, rows: n, issues, withHeading, lastIndexedAt: f.lastIndexedAt };
      }
      // the rows of the text search and the vector table, one for each chunk
      const chunkIds = new Map((await st.debug.sql({ sql: 'select id, folder_id from chunks' })).map((c) => [c.id, c.folder_id]));
      const fts = await st.debug.rows({ table: 'chunks_fts', limit: 1e6 }); const vec = await st.debug.rows({ table: 'chunks_vec', limit: 1e6 });
      const sameSet = (rowsX, label) => { let missing = 0, extra = 0, folderDiff = 0, dimsOff = 0; const seen = new Set(); for (const r of rowsX) { seen.add(r.rowid); if (!chunkIds.has(r.rowid)) extra++; else if (chunkIds.get(r.rowid) !== r.folder_id) folderDiff++; if (r.dims != null && r.dims !== 384) dimsOff++; } for (const id of chunkIds.keys()) if (!seen.has(id)) missing++; return { label, rows: rowsX.length, missing, extra, folderDiff, dimsOff }; };
      out.fts = sameSet(fts, 'chunks_fts'); out.vec = sameSet(vec, 'chunks_vec');
      out.ftsText = (await st.debug.sql({ sql: 'select count(*) as n from chunks c join chunks_fts f on f.rowid = c.id where f.text != c.text or f.heading_path != c.heading_path' }))[0].n;
      out.cacheOk = (await st.debug.sql({ sql: 'select count(*) as n from emb_cache where length(vec) != 384 * 4' }))[0].n;
      out.chunkCount = chunkIds.size;
      return out;
    }, { names });
    const st = rows.stats;
    for (const name of names) {
      const F = rows.folders[name]; const exp = manifestOf(name);
      if (!F) { ok(false, tag + name + ': not in the store'); continue; }
      const got = new Map(F.files.map((x) => [x.path, x]));
      const bad = []; for (const m of exp) { const g = got.get(m.rel); if (!g) bad.push('missing ' + m.rel); else { if (g.size !== m.size) bad.push('size ' + m.rel); if (g.contentHash !== m.sha256) bad.push('sha256 ' + m.rel); if (!(g.chunkCount > 0)) bad.push('no passages ' + m.rel); } }
      const extra = [...got.keys()].filter((p) => !exp.some((m) => m.rel === p));
      ok(bad.length === 0 && extra.length === 0 && F.files.length === exp.length, tag + name + ': every one of its ' + exp.length + ' files is in the store, with the size and SHA-256 of the fixtures\' MANIFEST and at least one passage', { bad: bad.slice(0, 6), extra });
      const mt = []; for (const g of F.files) { const real = Math.floor(fs.statSync(path.join(FIX, name, g.path)).mtimeMs); if (Math.abs(real - g.mtime) > 1) mt.push(g.path + ' ' + real + ' vs ' + g.mtime); }
      ok(mt.length === 0, tag + name + ': each file\'s modification time in the store is the file\'s own (milliseconds)', mt.slice(0, 4));
      ok(F.issues.length === 0 && F.rows === F.chunkCount && F.files.every((x) => x.rows === x.chunkCount), tag + name + ': metadata of all ' + F.rows + ' passages: folder, file path, numbered 0..n-1 in order, offsets inside the file, a 64-hex content hash, text, the page for PDFs only (' + F.withHeading + ' with a heading path)', F.issues);
      if (name === 'household_papers') ok(F.chunkCount === EXPECT_CHUNKS.household, tag + name + ': ' + F.chunkCount + ' passages (the parse run of 31 October made ' + EXPECT_CHUNKS.household + ')', F.chunkCount);
    }
    ok(rows.fts.missing === 0 && rows.fts.extra === 0 && rows.fts.folderDiff === 0 && rows.fts.rows === rows.chunkCount && st.chunks_fts === st.chunks, tag + 'text search: one chunks_fts row for each of the ' + rows.chunkCount + ' passages, none extra, the same folder (' + st.chunks_fts + ' rows = ' + st.chunks + ' chunks)', rows.fts);
    ok(rows.vec.missing === 0 && rows.vec.extra === 0 && rows.vec.folderDiff === 0 && rows.vec.dimsOff === 0 && st.chunks_vec === st.chunks, tag + 'vectors: one chunks_vec row for each passage, 384 values, the same folder (' + st.chunks_vec + ' rows = ' + st.chunks + ' chunks)', rows.vec);
    ok(rows.ftsText === 0 && rows.cacheOk === 0, tag + 'the text search holds each passage\'s own text and heading path; every cached vector is 384 values', [rows.ftsText, rows.cacheOk]);
    return rows;
  }

  await section('the index', async () => {
    phase('checking');
    const rows = await verifyIndex(FOLDERS, false);
    const st = rows.stats; stats0 = st;
    // chunk counts
    const byExt = {}; for (const f of Object.values(rows.folders)) for (const x of f.files) byExt[ext(x.path)] = (byExt[ext(x.path)] || 0) + x.chunkCount;
    if (!QUICK) {
      ok(st.chunks === EXPECT_CHUNKS.total && st.files === 72, 'the whole corpus: ' + st.files + ' files, ' + st.chunks + ' passages (the parse run of 31 October made ' + EXPECT_CHUNKS.total + ')', { files: st.files, chunks: st.chunks });
      ok(JSON.stringify(Object.keys(EXPECT_CHUNKS.byExt).sort().map((k) => byExt[k])) === JSON.stringify(Object.keys(EXPECT_CHUNKS.byExt).sort().map((k) => EXPECT_CHUNKS.byExt[k])), 'passages by type are those of the parse run: ' + JSON.stringify(byExt), EXPECT_CHUNKS.byExt);
      const big = rows.folders.historian_archive.files.find((x) => x.path === BIG_FILE);
      ok(big && big.size === 4265806 && big.chunkCount === EXPECT_CHUNKS.bigFile && big.rows === big.chunkCount, 'the 4 MB log is indexed: ' + (big && big.size) + ' bytes, ' + (big && big.chunkCount) + ' passages (' + EXPECT_CHUNKS.bigFile + ' expected)', big && { size: big.size, chunks: big.chunkCount });
    } else ok(st.files === 20 && st.chunks === EXPECT_CHUNKS.household, 'quick: the household folder, ' + st.files + ' files, ' + st.chunks + ' passages', st);
    result.counts = { stats: st, byExt, folders: Object.fromEntries(Object.entries(rows.folders).map(([k, v]) => [k, { files: v.fileCount, passages: v.chunkCount }])) };
    // passages' text is the file's own slice (plain UTF-8 text and Markdown files)
    const probes = []; for (const name of FOLDERS) for (const m of manifestOf(name)) if (/^(txt|md)$/.test(ext(m.rel)) && m.rel !== BIG_FILE) probes.push({ name, rel: m.rel });
    const slices = await evalIn(async ({ probes, big }) => { const st = IngRag._store, out = []; const fl = await st.folder.list(); for (const p of probes) { const f = fl.find((x) => x.name === p.name); const where = p.rel === big ? ' and chunk_index in (0, 1, 2, 1500, 3153)' : ''; out.push({ rel: p.rel, name: p.name, rows: await st.debug.sql({ sql: 'select chunk_index, char_start, char_end, text from chunks where folder_id = ? and file_path = ?' + where + ' order by chunk_index', bind: [f.id, p.rel] }) }); } return out; }, { probes: probes.concat(QUICK ? [] : [{ name: 'historian_archive', rel: BIG_FILE }]), big: BIG_FILE });
    let checked = 0, chunksChecked = 0; const wrong = [];
    for (const s of slices) {
      const buf = fs.readFileSync(path.join(FIX, s.name, s.rel)); let text = null;
      if (buf[0] === 0xFF || buf[0] === 0xFE) continue;                       // UTF-16: not compared here
      try { text = new TextDecoder('utf-8', { fatal: true }).decode(buf); } catch (e) { continue; }   // Windows-1252: not compared here
      if (text.includes('\r')) continue;                                      // CRLF: not compared here
      checked++; for (const r of s.rows) { chunksChecked++; if (text.slice(r.char_start, r.char_end) !== r.text) wrong.push(s.rel + '#' + r.chunk_index); }
    }
    ok(checked >= (QUICK ? 3 : 10) && wrong.length === 0, 'each passage of ' + checked + ' text and Markdown files (' + chunksChecked + ' passages' + (QUICK ? '' : ', the 4 MB log\'s first, third and last among them') + ') is the file\'s own text between its character offsets', wrong.slice(0, 5));
    // the facts: found by the text search and by the vectors
    const facts = FACTS.filter((f) => FOLDERS.includes(f.folder));
    const found = await evalIn(async ({ facts }) => {
      const st = IngRag._store, emb = IngRag._embedder, pid = IngRag._principalId; const allowed = JSON.stringify(await st.acl.allowed({ principalId: pid }));
      const out = []; for (const f of facts) {
        const q = '"' + f.needle.replace(/"/g, '""') + '"';
        let fts = null, vec = null, ftsErr = null;
        const paths = async (ids) => ids.length ? (await st.debug.sql({ sql: 'select id, file_path from chunks where id in (select value from json_each(?))', bind: [JSON.stringify(ids)] })).reduce((m, r) => (m[r.id] = r.file_path, m), {}) : {};
        try { fts = await st.debug.sql({ sql: 'select rowid from chunks_fts where chunks_fts match ? and folder_id in (select value from json_each(?)) order by bm25(chunks_fts) limit 5', bind: [q, allowed] }); } catch (e) { ftsErr = String(e.message || e); }
        const [v] = await emb.embed({ texts: [f.question], kind: 'query' });
        vec = await st.debug.sql({ sql: 'select rowid, distance from chunks_vec where embedding match ? and k = 5 and folder_id in (select value from json_each(?))', bind: [new Uint8Array(v.buffer), allowed] });
        const pf = await paths((fts || []).map((r) => r.rowid)), pv = await paths(vec.map((r) => r.rowid));
        out.push({ id: f.id, file: f.file, fts: fts && fts.map((r) => pf[r.rowid]), vec: vec.map((r) => pv[r.rowid]), ftsErr });
      }
      return out;
    }, { facts });
    const ftsHit = found.filter((r) => r.fts && r.fts.includes(r.file)).length, vecHit = found.filter((r) => r.vec.includes(r.file)).length;
    result.facts = { n: facts.length, ftsHit, vecHit, ftsErrors: found.filter((r) => r.ftsErr).length };
    ok(found.every((r) => !r.ftsErr), 'the text search (FTS5, bm25, filtered by the folders "me" may read) and the vector search (vec0 KNN, the same filter) both answer', found.find((r) => r.ftsErr));
    ok(ftsHit >= Math.ceil(facts.length * 0.9), 'the text search finds the file of ' + ftsHit + ' of ' + facts.length + ' facts in its first five (the exact phrase)', found.filter((r) => !(r.fts || []).includes(r.file)).map((r) => r.id));
    ok(vecHit >= Math.ceil(facts.length * 0.5), 'the vectors find the file of ' + vecHit + ' of ' + facts.length + ' facts in their first five (the question as asked; not the retrieval test of phase 5, which comes later)', found.filter((r) => !r.vec.includes(r.file)).map((r) => r.id));
    // the card's numbers are the store's
    const card = await evalIn(() => [...document.querySelectorAll('#ragCard .rag-item')].map((r) => ({ name: r.querySelector('.rag-name').textContent, facts: r.querySelector('.rag-facts').textContent, files: +r.querySelector('.rag-facts').getAttribute('data-files'), passages: +r.querySelector('.rag-facts').getAttribute('data-passages'), room: document.getElementById('ragRoom').textContent })));
    const bad = []; for (const c of card) { const F = rows.folders[c.name]; const m = /^(\d[\d,]*) files? · (\d[\d,]*) passages? · Last read /.exec(c.facts); if (!F || !m || +m[1].replace(/,/g, '') !== F.fileCount || +m[2].replace(/,/g, '') !== F.chunkCount || c.files !== F.fileCount || c.passages !== F.chunkCount) bad.push(c); }
    ok(card.length === FOLDERS.length && bad.length === 0, 'the card shows the right numbers for each folder: files, passages, when last read (' + card.map((c) => c.facts).join(' | ') + ')', bad);
    ok(/takes about [\d.]+ (MB|GB) on this computer/.test(card[0].room), 'the card says how much room the folder search takes on this computer', card[0].room);
    await P.locator('#ragCard').screenshot({ path: path.join(OUT, 'card-read.png') });
  });

  await section('reading again', async () => {
    const e0 = await evalIn(async () => { const i = await IngRag._embedder.info(); return { embedded: i.embedded, calls: i.calls, batches: i.batches, stats: await IngRag._store.stats() }; });
    phase('reading again');
    for (const name of FOLDERS) {
      const id = ids[name]; const before = await evalIn(() => window.__ragLog.done.length);
      await P.click('#ragCard .rag-item[data-id="' + id + '"] .rag-read');
      await P.waitForFunction((b) => window.__ragLog.done.length > b, before, { timeout: 300000 });
      const d = await evalIn(() => window.__ragLog.done[window.__ragLog.done.length - 1]);
      const exp = manifestOf(name).length;
      ok(d.summary.files.skipped === exp && d.summary.files.indexed === 0 && d.summary.embedded === 0 && d.summary.chunks === 0, name + ': "Read it again now" with nothing changed leaves all ' + exp + ' files alone (' + d.summary.files.skipped + ' skipped, ' + d.summary.embedded + ' vectors made)', d.summary.files);
      await settled(name);
      const line = await evalIn((id) => document.querySelector('#ragCard .rag-item[data-id="' + id + '"] .rag-say').textContent, id);
      ok(/^Nothing had changed/.test(line), name + ': the card says "Nothing had changed"', line);
    }
    const e1 = await evalIn(async () => { const i = await IngRag._embedder.info(); return { embedded: i.embedded, calls: i.calls, batches: i.batches, stats: await IngRag._store.stats() }; });
    ok(e1.embedded === e0.embedded && e1.calls === e0.calls && e1.batches === e0.batches, 'reading all the folders again embedded nothing new: the embedder\'s own counter is ' + e1.embedded + ' texts, ' + e1.calls + ' calls, ' + e1.batches + ' batches, before and after', [e0, e1].map((e) => [e.embedded, e.calls, e.batches]));
    ok(JSON.stringify(e1.stats) === JSON.stringify(e0.stats), 'and no table of the store changed', [e0.stats, e1.stats]);
    // forcing the same folder to be read again, then stopping it: whatever happens the index stays whole and no vector is made again
    const id = ids[FOLDERS[0]];
    const st = await evalIn(async (id) => { const p = IngRag.indexFolder(id, { force: true }); await new Promise((r) => setTimeout(r, 150)); const stopped = IngRag.stopReading(id); const s = await p; return { stopped, summary: { files: s.files, stopped: s.stopped, embedded: s.embedded }, running: IngRag.running().length, stats: await IngRag._store.stats(), info: await IngRag._embedder.info() }; }, id);
    ok(st.stopped === true && st.running === 0 && st.summary.embedded === 0 && JSON.stringify(st.stats) === JSON.stringify(e0.stats), 'a forced reading that is stopped after 0.15 s ends cleanly (stopped ' + st.summary.stopped + ', ' + st.summary.files.indexed + ' files read again) and leaves the index whole; the vectors came from the cache', st);
    const q = await evalIn(async (ids) => { const a = IngRag.indexFolder(ids[0], { force: true }); const b = IngRag.indexFolder(ids[1] || ids[0] + 100, {}).catch((e) => ({ err: e.code })); const dup = await IngRag.indexFolder(ids[0]).catch((e) => e.code); IngRag.stopReading(ids[0]); await a; const r = await b; IngRag.stopReading(ids[1]); return { dup, r: r && (r.err || (r.stopped ? 'stopped' : 'ran')), running: IngRag.running().length }; }, [ids[FOLDERS[0]], ids[FOLDERS[1] || FOLDERS[0]]]);
    ok(q.dup === 'ALREADY_RUNNING' && q.running === 0, 'a folder that is being read cannot be read twice at once (ALREADY_RUNNING); a second folder waits its turn', q);
    await P.waitForTimeout(500);
    const busy = await evalIn(() => ({ jobs: IngRag.running().length, aria: [...document.querySelectorAll('#ragCard .rag-read')].map((b) => b.getAttribute('aria-disabled')) }));
    ok(busy.jobs === 0 && busy.aria.every((a) => a !== 'true'), 'when all is quiet every "Read it again now" key is usable again', busy);
  });

  // ---- the card's words after the readings, with every note and warning shown (the folder paths left out: they are hers)
  await section('plain words', async () => {
    const w = await evalIn(() => { const c = document.getElementById('ragCard').cloneNode(true); c.querySelectorAll('.rag-path').forEach((n) => n.remove()); return { text: c.innerText, notes: c.querySelectorAll('.rag-notes:not([hidden]), .rag-warn:not([hidden])').length }; });
    const jargon = /\b(embedding|vector|chunk|sqlite|opfs|index(?:er)?|tokeni[sz]|ONNX|RAG|confirmEmpty)\b/i.exec(w.text);
    ok(!jargon, 'after the readings the whole card, its notes and warnings included (' + w.notes + ' shown), uses plain words', jargon && { word: jargon[0], near: w.text.slice(Math.max(0, jargon.index - 80), jargon.index + 40) });
  });

  await section('reload', async () => {
    phase('reload');
    const before = await evalIn(async () => ({ stats: await IngRag._store.stats(), folders: (await IngRag.folders()).map((f) => [f.id, f.name, f.files, f.passages, f.lastReadAt]), bytes: (await IngRag._store.info()).bytes }));
    await P.reload({ waitUntil: 'load', timeout: 300000 });
    await P.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 });
    await P.waitForTimeout(700);
    await P.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
    await P.waitForFunction(() => window.IngRag && typeof go === 'function', null, { timeout: 90000 });
    await evalIn(() => { window.__ragLog = { done: [], status: [], queued: 0 }; IngRag.on((ev) => { if (ev.type === 'done') window.__ragLog.done.push({ folderId: ev.folderId, summary: ev.summary, error: ev.error && ev.error.plain }); else if (ev.type === 'status') window.__ragLog.status.push(ev.status); }); });
    if (process.env.RAG_WORKERS) await evalIn((w) => IngRag.config({ workers: w }), Number(process.env.RAG_WORKERS));
    await openSettings(P, true);
    await P.waitForFunction((n) => document.querySelectorAll('#ragCard .rag-item').length === n, FOLDERS.length, { timeout: 90000 });
    const after = await evalIn(async () => ({ stats: await IngRag._store.stats(), folders: (await IngRag.folders()).map((f) => [f.id, f.name, f.files, f.passages, f.lastReadAt]), bytes: (await IngRag._store.info()).bytes, card: [...document.querySelectorAll('#ragCard .rag-item')].map((r) => r.querySelector('.rag-name').textContent + ': ' + r.querySelector('.rag-facts').textContent), status: IngRag.state().status }));
    ok(JSON.stringify(after.stats) === JSON.stringify(before.stats) && JSON.stringify(after.folders) === JSON.stringify(before.folders), 'after a reload the index is all there: the same rows in every table, the same folders with the same files, passages and last-read times', { before: before.stats, after: after.stats });
    ok(after.card.length === FOLDERS.length && after.card.every((t, i) => { const f = after.folders.find((x) => t.startsWith(x[1] + ': ')); return f && t.includes(f[2].toLocaleString('en-US') + (f[2] === 1 ? ' file' : ' files')); }), 'and the card shows the folders again with their numbers: ' + after.card.join(' | '));
    // a new embedder, new page: unchanged files are still left alone (the decision is in the store, not in memory)
    const name = FOLDERS[0]; const id = ids[name];
    await P.click('#ragCard .rag-item[data-id="' + id + '"] .rag-read');
    await P.waitForFunction(() => window.__ragLog.done.length > 0, null, { timeout: 300000 });
    const d = await evalIn(async () => ({ done: window.__ragLog.done[0], info: await IngRag._embedder.info() }));
    ok(d.done.summary.files.skipped === manifestOf(name).length && d.done.summary.embedded === 0 && d.info.embedded === 0, 'after the reload a new embedder reads ' + name + ' again and embeds nothing (its counter: ' + d.info.embedded + ' texts, ' + d.info.calls + ' calls)', d.done.summary.files);
  });

  await section('removing', async () => {
    phase('removing');
    const order = FOLDERS.slice();                       // the small one first, the big one next, the last one at the end
    const counts = async () => evalIn(async () => ({ stats: await IngRag._store.stats(), bytes: (await IngRag._store.info()).bytes, mine: (await IngRag.folders()).map((f) => f.id) }));
    const rowsOf = (id) => evalIn(async (id) => { const q = async (s) => (await IngRag._store.debug.sql({ sql: s, bind: [id] }))[0].n; return { chunks: await q('select count(*) as n from chunks where folder_id = ?'), files: await q('select count(*) as n from files where folder_id = ?'), fts: await q('select count(*) as n from chunks_fts where folder_id = ?'), vec: await q('select count(*) as n from chunks_vec where folder_id = ?'), acl: await q('select count(*) as n from folder_acl where folder_id = ?'), folder: await q('select count(*) as n from folders where id = ?') }; }, id);
    for (let i = 0; i < order.length; i++) {
      const name = order[i], id = ids[name]; const b = await counts(); const row = '#ragCard .rag-item[data-id="' + id + '"]';
      if (i === 0) {
        // by keyboard: Remove opens a question with the safe key focused; Escape closes it and keeps the folder
        const seeAsk = (row) => document.querySelector(row + ' .rag-ask').getClientRects().length > 0 && getComputedStyle(document.querySelector(row + ' .rag-ask')).display !== 'none';
        const q0 = await evalIn(`(${seeAsk})(${JSON.stringify(row)})`);
        ok(q0 === false, 'the question "Remove it / Keep it" is not on the screen until Remove is pressed (it really is hidden, not only marked hidden)', q0);
        await P.focus(row + ' .rag-del'); await P.keyboard.press('Enter');
        const q1 = await evalIn((row) => ({ askShown: document.querySelector(row + ' .rag-ask').getClientRects().length > 0, focus: document.activeElement.textContent, text: document.querySelector(row + ' .rag-ask').innerText.slice(0, 200) }), row);
        ok(q1.askShown && q1.focus === 'Keep it' && /files stay where they are/.test(q1.text), 'Remove asks first ("Its files stay where they are"), with "Keep it" focused', q1);
        await P.keyboard.press('Escape');
        const q2 = await evalIn((row) => ({ askShown: document.querySelector(row + ' .rag-ask').getClientRects().length > 0, focus: document.activeElement.textContent, rows: document.querySelectorAll('#ragCard .rag-item').length }), row);
        ok(!q2.askShown && q2.focus === 'Remove' && q2.rows === order.length, 'Escape keeps the folder and puts the focus back on "Remove"', q2);
      }
      await P.click(row + ' .rag-del'); await P.click(row + ' .rag-ask button:has-text("Remove it")');
      await P.waitForFunction((id) => !document.querySelector('#ragCard .rag-item[data-id="' + id + '"]'), id, { timeout: 120000 });
      const note1 = await evalIn(() => ({ note: document.getElementById('ragNote').textContent, focus: document.activeElement.id }));
      const a = await counts(); const gone = await rowsOf(id);
      ok(Object.values(gone).every((n) => n === 0), name + ': removed: no row of it is left in folders, files, chunks, chunks_fts, chunks_vec or folder_acl', gone);
      const want = manifestOf(name).length; const chunksOfIt = b.stats.chunks - a.stats.chunks;
      ok(a.stats.files === b.stats.files - want && a.stats.folders === b.stats.folders - 1 && a.stats.folder_acl === b.stats.folder_acl - 1 && a.stats.chunks_fts === a.stats.chunks && a.stats.chunks_vec === a.stats.chunks && chunksOfIt > 0 && a.stats.emb_cache <= b.stats.emb_cache - 1, name + ': the counts fell by exactly its ' + want + ' files, ' + chunksOfIt + ' passages (text rows and vectors with them) and its ACL row; its cached vectors went too', { before: b.stats, after: a.stats });
      ok(/^Removed/.test(note1.note) && note1.focus === 'ragAdd', name + ': the card says it was removed and the focus goes to "Add a folder…"', note1);
      const bf = await evalIn(async (p) => ({ listed: (await pywebview.api.rag_folders()).some((f) => f.path === p), list: await pywebview.api.rag_list(p) }), path.join(FIX, name));
      ok(!bf.listed && bf.list && bf.list.ok === false, name + ': the app forgot the folder too (rag_folders no longer lists it, rag_list refuses it: ' + (bf.list && bf.list.code) + ')', bf);
      if (i < order.length - 1) {
        if (chunksOfIt >= 200) ok(a.bytes < b.bytes && /gave back/i.test(note1.note), name + ': a big folder (' + chunksOfIt + ' passages) is followed by compact(): the index file went from ' + (b.bytes / 1048576).toFixed(1) + ' to ' + (a.bytes / 1048576).toFixed(1) + ' MB, and the card says Ingenium gave back the room', note1.note);
        else ok(!/gave back/i.test(note1.note), name + ': a small folder (' + chunksOfIt + ' passages) is not compacted', note1.note);
      } else {
        const vecLeft = await evalIn(async () => (await IngRag._store.debug.sql({ sql: 'select count(*) as n from chunks_vec_vector_chunks00 where vectors <> zeroblob(length(vectors))' }))[0].n);
        ok(vecLeft === 0, 'and no vector is left in the vector library\'s own storage either (its blocks hold only zeros)', vecLeft);
        ok(Object.entries(a.stats).every(([t, n]) => (t === 'meta' ? n === 1 : t === 'principals' ? n === 1 : n === 0)), 'with every folder removed nothing is left in any table but the settings row and the one user "me"', a.stats);
        if (chunksOfIt >= 200) ok(/gave back/i.test(note1.note), name + ': compact() ran after the last big folder', note1.note);
        note('index file after the last removal: ' + (a.bytes / 1048576).toFixed(2) + ' MB (it was ' + (b.bytes / 1048576).toFixed(2) + ' MB)');
      }
      await P.locator('#ragCard').screenshot({ path: path.join(OUT, 'card-after-removing-' + (i + 1) + '.png') });
    }
    const none = await evalIn(() => ({ text: document.querySelector('#ragCard .rag-none').textContent, hidden: document.querySelector('#ragCard .rag-none').hidden }));
    ok(!none.hidden && /No folder yet/.test(none.text), 'with no folder left the card says so again', none);
  });

  // ---- a folder emptied on purpose: the card asks, in plain words, before anything is taken out; and starting the search again
  await section('an emptied folder, and starting again', async () => {
    phase('an emptied folder');
    const T = path.join(OUTA, 'emptied_folder'); fs.rmSync(T, { recursive: true, force: true }); fs.mkdirSync(T, { recursive: true });
    fs.writeFileSync(path.join(T, 'first.txt'), 'The orchard was planted in the spring of 1911 by the two sisters.\n\nThey kept a ledger of every tree.');
    fs.writeFileSync(path.join(T, 'second.txt'), 'The well behind the barn was dug again in 1934, after the dry summer.');
    const name = path.basename(T);
    await bridgePost('/admin/dialog', { answers: [T] });
    await P.click('#ragAdd');
    await P.waitForFunction((n) => [...document.querySelectorAll('#ragCard .rag-item .rag-name')].some((x) => x.textContent === n), name, { timeout: 60000 });
    ids[name] = await evalIn((n) => +[...document.querySelectorAll('#ragCard .rag-item')].find((r) => r.querySelector('.rag-name').textContent === n).getAttribute('data-id'), name);
    const s1 = await readFolder(name); await settled(name);
    ok(s1.files.indexed === 2, name + ': its two files are read', s1.files);
    fs.unlinkSync(path.join(T, 'first.txt')); fs.unlinkSync(path.join(T, 'second.txt'));
    const s2 = await readFolder(name); await settled(name);
    const row = '#ragCard .rag-item[data-id="' + ids[name] + '"]';
    const q = await evalIn((sel) => { const r = document.querySelector(sel), e = r.querySelector('.rag-empty'); return { shown: !!e && !e.hidden, text: e ? e.textContent : '', facts: r.querySelector('.rag-facts').textContent }; }, row);
    ok(s2.files.deleted === 0 && s2.emptyNow === 2 && q.shown && /looks empty now, but 2 files from it are still in the folder search/.test(q.text) && /Did you empty the folder on purpose/.test(q.text), name + ': emptied, it is not cleared at once: the card asks whether it was emptied on purpose', q);
    const jargon = /\b(embedding|vector|chunk|sqlite|index(?:er)?|confirmEmpty)\b/i.exec(q.text);
    ok(!jargon, name + ': the question is in plain words', jargon && jargon[0]);
    const before = await evalIn(() => window.__ragLog.done.length);
    await P.click(row + ' .rag-empty button:has-text("Yes, take them out")');
    await P.waitForFunction((b) => window.__ragLog.done.length > b, before, { timeout: 120000 });
    await settled(name);
    const after = await evalIn(async (sel) => { const r = document.querySelector(sel); const id = +r.getAttribute('data-id'); const f = (await IngRag.folders()).find((x) => x.id === id); return { files: f.files, passages: f.passages, shown: !r.querySelector('.rag-empty').hidden }; }, row);
    ok(after.files === 0 && after.passages === 0 && !after.shown, name + ': "Yes, take them out" takes its files out of the search, and the question goes', after);
    // starting the folder search again from nothing (what the card offers when its memory is found damaged)
    fs.writeFileSync(path.join(T, 'third.txt'), 'A third note, written after the search started again.');
    const rb = await evalIn(async () => { const r = await IngRag.rebuild(); return { r, state: IngRag.state().status, stats: await IngRag._store.stats(), folders: (await IngRag.folders()).map((f) => ({ name: f.name, files: f.files })) }; });
    ok(rb.r.rebuilt === true && rb.r.folders === 1 && rb.state === 'open' && rb.stats.folders === 1 && rb.stats.chunks === 0 && rb.folders.length === 1 && rb.folders[0].name === name && rb.folders[0].files === 0,
      'IngRag.rebuild() starts the search again from nothing and puts back the folders the app has on its list, to be read again', rb);
    await P.evaluate(() => { const b = document.getElementById('ragRetry'); if (b) b.click(); });
    await P.waitForFunction((n) => [...document.querySelectorAll('#ragCard .rag-item')].some((r) => r.querySelector('.rag-name').textContent === n && /Not read yet/.test(r.querySelector('.rag-facts').textContent)), name, { timeout: 30000 });
    ids[name] = await evalIn((n) => +[...document.querySelectorAll('#ragCard .rag-item')].find((r) => r.querySelector('.rag-name').textContent === n).getAttribute('data-id'), name);
    const s3 = await readFolder(name); await settled(name);
    ok(s3.files.indexed === 1, 'and the folder can be read again at once (1 file)', s3.files);
    const rm = await evalIn(async (id) => { const r = await IngRag.removeFolder(id); return { r, stats: await IngRag._store.stats() }; }, ids[name]);
    ok(rm.r.removed === true && rm.stats.folders === 0 && rm.stats.chunks === 0 && rm.stats.emb_cache === 0, name + ': removed again, nothing of it is left', rm);
    fs.rmSync(T, { recursive: true, force: true });
  });

  await section('memory and privacy', async () => {
    phase('end');
    sampler.stop();
    const mb = (kb) => Math.round(kb / 1024);
    const um = await evalIn(async () => { const r = { fn: typeof performance.measureUserAgentSpecificMemory, isolated: !!window.crossOriginIsolated, heapMB: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : null }; try { if (r.fn === 'function') { const m = await performance.measureUserAgentSpecificMemory(); r.bytes = m.bytes; } } catch (e) { r.error = e.name + ': ' + String(e.message).slice(0, 160); } return r; });
    const mem = { method: 'ps -eo pid,ppid,rss,args every 250 ms, the sum of the resident memory (RSS) of the browser process and all its descendants (renderer, GPU, utility, zygote); RSS counts shared pages in every process, so it is an upper bound; PSS (from /proc/PID/smaps_rollup, every second) is given too', samples: sampler.samples, errors: sampler.errors, peakMB: mb(sampler.maxKB), peakAtMinute: sampler.maxAtMin, peakDuring: sampler.maxPhase, processesAtPeak: sampler.procsAtMax, byTypeAtPeakMB: Object.fromEntries(Object.entries(sampler.typesAtMax).map(([k, v]) => [k, mb(v)])), maxByTypeMB: Object.fromEntries(Object.entries(sampler.maxByType).map(([k, v]) => [k, mb(v)])), peakByPhaseMB: Object.fromEntries(Object.entries(sampler.phaseMax).map(([k, v]) => [k, mb(v)])), pssPeakMB: mb(sampler.pssMaxKB), measureUserAgentSpecificMemory: um, series: sampler.series.slice(0, 400) };
    result.memory = mem;
    console.log('     memory: peak ' + mem.peakMB + ' MB (RSS of ' + mem.processesAtPeak + ' processes, at minute ' + mem.peakAtMinute + ', during "' + mem.peakDuring + '"); PSS peak ' + mem.pssPeakMB + ' MB; by process type at the peak ' + JSON.stringify(mem.byTypeAtPeakMB));
    console.log('     performance.measureUserAgentSpecificMemory: ' + JSON.stringify(um));
    if (!QUICK) ok(mem.peakMB < 2048 && mem.samples > 100, 'peak memory of all the browser\'s processes while everything was indexed: ' + mem.peakMB + ' MB, under 2 GB (' + mem.samples + ' samples)', mem.byTypeAtPeakMB);
    else note('quick run: the memory limit is not checked (peak ' + mem.peakMB + ' MB with the household folder only)');
    // privacy: every request on this computer, every page and worker script a file on the app's own address
    const hosts = [...new Set(run.requests.map((u) => { try { const x = new URL(u); return /^(http|https|ws|wss):$/.test(x.protocol) ? x.host : x.protocol; } catch (e) { return u; } }))];
    const newExternal = run.external.filter((u) => !(result.baseline.external || []).includes(u));
    ok(run.external.length === 0 || newExternal.length === 0, 'no request left this computer (' + run.requests.length + ' requests, to ' + hosts.join(', ') + ')', run.external.slice(0, 5));
    if (run.external.length) note('requests the page makes by itself, refused (the page without the bridge makes the same: ' + (result.baseline.external.length) + '): ' + run.external.slice(0, 3).join(' '));
    const ragReq = run.requests.filter((u) => /\/rag\//.test(new URL(u).pathname)).map((u) => new URL(u).pathname);
    ok(['/rag/main.js', '/rag/folders.js', '/rag/store.js', '/rag/embedder.js', '/rag/indexer.js'].every((f) => ragReq.includes(f)), 'rag/ was fetched from the app\'s own address: ' + [...new Set(ragReq.filter((u) => !/vendor/.test(u)))].join(', '), ragReq.length);
    ok(run.workerUrls.length >= 3 && run.workerUrls.every((u) => u.startsWith(ORIGIN + '/rag/') && !u.startsWith('blob:')), 'the workers (' + run.workerUrls.map((u) => u.split('/').pop()).join(', ') + ') are files on the app\'s own address, none a blob:', run.workerUrls);
    const parts = await evalIn(() => { const p = window.__ingParts || {}; return { n: Object.keys(p).length, notRunning: Object.keys(p).filter((k) => p[k] !== 'running'), p202: p.p202 }; });
    ok(parts.p202 === 'running' && parts.notRunning.length === 0, 'every part of the page ran (' + parts.n + ' parts, the loader p202 among them)', parts.notRunning);
    const wErr = await evalIn(() => [].concat(IngRag._store ? IngRag._store.errors : [], IngRag._embedder ? IngRag._embedder.errors : []));
    const newConsole = run.consoleErrors.filter((m) => !(result.baseline.consoleErrors || []).includes(m));
    ok(run.pageErrors.length === 0 && newConsole.length === 0 && wErr.length === 0, 'no script errors on the page or in a worker', { page: run.pageErrors.slice(0, 5), console: newConsole.slice(0, 5), workers: wErr.slice(0, 5) });
    const nbErr = (result.baseline.pageErrors || []).length; if (nbErr) note('the page without the bridge had ' + nbErr + ' script error(s) of its own: ' + result.baseline.pageErrors.slice(0, 2).join(' | '));
    // the card in the night theme, for the eye
    await evalIn(() => document.body.setAttribute('data-theme', 'night')); await P.locator('#ragCard').screenshot({ path: path.join(OUT, 'card-night.png') });
  });

  ok(ran.length === SECTIONS.length && SECTIONS.every((s) => ran.includes(s)), 'every section ran: ' + ran.join(', '));
  result.pass = pass; result.fail = fail; result.minutes = +mins(); result.finishedAt = new Date().toISOString();
  fs.writeFileSync(path.join(OUT, 'result.json'), JSON.stringify(result, null, 1));
  console.log(pass + ' passed, ' + fail + ' failed (' + mins() + ' min)');
  try { await run.close(); } catch (e) { /* closed */ }
  for (const c of started) { try { c.kill(); } catch (e) { /* gone */ } }
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log('FAIL the test itself: ' + (e && e.stack || e)); for (const c of started) { try { c.kill(); } catch (x) { /* gone */ } } process.exit(1); });
