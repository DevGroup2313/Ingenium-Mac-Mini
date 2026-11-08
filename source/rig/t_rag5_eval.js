// Folder search, phase 5: the evaluation (rag/eval.js judges, rag/eval/golden.json asks). Her done criteria, measured on the BUILT page in
// headless Chromium with the desktop app's folder bridge standing in (rig/rag_bridge.py and rig/rag_bridge_shim.js), and a REAL model
// answering through the chat's own connection path (an OpenAI-style server on this computer, such as llama.cpp's llama-server with one of
// the models the apps carry):
//   4. memory: the whole corpus (three folders, 72 files, the 4 MB logbook) read with the app's one reading-model worker while every
//      Chromium process's resident memory is added up every 250 ms (ps), and its proportional share (PSS, /proc/<pid>/smaps_rollup)
//   1. Recall@5 over the golden set, as "me"
//   3. ACL: test-b may read lab_notes and historian_archive, not household_papers: retrieve() and both searches give none of it for the
//      golden items it alone answers, and the chat's end-to-end response, with the real model, is compared with NOT_FOUND
//   2. groundedness: each golden question asked in the chat with Your folders on; the reply and the passages it was given are judged
//      (every sentence cited, every citation to a passage given, the cited words found in the passage), and whether it names the fact
//   5. reindex: a copy of household_papers as a fourth folder, read; one file added, one modified, one deleted; one reconcile; the index
//      reflects each change and the embedding calls equal the passages whose hash was not in the cache before
//   node rig/t_rag5_eval.js http://127.0.0.1:8188/ <out folder>
//   Environment: RAG_E2E (the page folder: ingenium.html, rag/, rag/vendor/), RAG_BRIDGE (default http://127.0.0.1:8199), LLM (the model
//   server, default http://127.0.0.1:8090/v1), LLM_NAME (how the report names it), SKIP_MODEL=1 (no model: criteria 2 and the end-to-end
//   half of 3 are left out and said so).
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [BASE0, OUT] = process.argv.slice(2);
if (!BASE0 || !OUT) { console.log('usage: node rig/t_rag5_eval.js <page server address> <out folder>'); process.exit(2); }
const BASE = BASE0.replace(/\/?$/, '/'); const ORIGIN = new URL(BASE).origin; const PAGE = BASE + 'ingenium.html';
const BRIDGE = (process.env.RAG_BRIDGE || 'http://127.0.0.1:8199').replace(/\/$/, ''); const BRIDGE_ORIGIN = new URL(BRIDGE).origin;
const LLM = (process.env.LLM || 'http://127.0.0.1:8090/v1').replace(/\/$/, ''); const LLM_ORIGIN = new URL(LLM).origin;
const LLM_NAME = process.env.LLM_NAME || 'the model at ' + LLM; const SKIP_MODEL = process.env.SKIP_MODEL === '1';
const E2E = process.env.RAG_E2E || '/tmp/claude-0/-home-user/20533335-3d8c-5333-8292-4941e284bafb/scratchpad/e2e';
const SRC = path.resolve(__dirname, '..'); const FIX = path.join(SRC, 'rag', 'fixtures');
fs.mkdirSync(OUT, { recursive: true }); const OUTA = path.resolve(OUT);
const GOLD = JSON.parse(fs.readFileSync(path.join(SRC, 'rag', 'eval', 'golden.json'), 'utf8'));
const T0 = Date.now(); let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; return !!c; };
const note = (m) => console.log('     [' + ((Date.now() - T0) / 60000).toFixed(1) + ' min] ' + m);
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
  }
  if (!(await reachable(BRIDGE + '/'))) {
    started.push(cp.spawn('python3', [path.join(SRC, 'rig', 'rag_bridge.py'), new URL(BRIDGE).port, '--state', path.join(OUTA, 'bridge_state')], { stdio: 'ignore' }));
    for (let i = 0; i < 40 && !(await reachable(BRIDGE + '/'));  i++) await sleep(250);
  }
}
// ---------------------------------------------------------------- memory: every Chromium process, by ps (as rig/t_rag1_manual.js)
function psAll() { return new Promise((res, rej) => cp.execFile('ps', ['-eo', 'pid=,ppid=,rss=,args='], { maxBuffer: 16e6 }, (e, out) => { if (e) return rej(e); res(out.split('\n').map((l) => /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(.*)$/.exec(l)).filter(Boolean).map((m) => ({ pid: +m[1], ppid: +m[2], rss: +m[3], args: m[4] }))); })); }
function tree(all, root) { const kids = new Map(); for (const p of all) { if (!kids.has(p.ppid)) kids.set(p.ppid, []); kids.get(p.ppid).push(p); } const by = new Map(all.map((p) => [p.pid, p])); const out = []; const q = by.has(root) ? [by.get(root)] : []; while (q.length) { const p = q.shift(); out.push(p); for (const k of kids.get(p.pid) || []) q.push(k); } return out; }
function pssKB(pid) { try { const t = fs.readFileSync('/proc/' + pid + '/smaps_rollup', 'utf8'); const m = /^Pss:\s+(\d+) kB/m.exec(t); return m ? +m[1] : 0; } catch (e) { return 0; } }
async function findRoot(profile) { for (let i = 0; i < 80; i++) { const r = (await psAll()).find((p) => p.args.includes('--user-data-dir=' + profile) && !/--type=/.test(p.args)); if (r) return r.pid; await sleep(250); } throw new Error('the browser process was not found'); }
function sampler(root) {
  const m = { maxKB: 0, pssMaxKB: 0, samples: 0, phase: 'start', atPhase: '', stopped: false }; let n = 0;
  const loop = async () => { if (m.stopped) return; const t = Date.now();
    try { const mine = tree(await psAll(), root); const total = mine.reduce((s, p) => s + p.rss, 0); m.samples++; n++; if (total > m.maxKB) { m.maxKB = total; m.atPhase = m.phase; } if (n % 4 === 0) { const pss = mine.reduce((s, p) => s + pssKB(p.pid), 0); if (pss > m.pssMaxKB) m.pssMaxKB = pss; } } catch (e) { }
    m.timer = setTimeout(loop, Math.max(10, 250 - (Date.now() - t))); };
  loop(); m.stop = () => { m.stopped = true; clearTimeout(m.timer); }; return m;
}

(async () => {
  const E = await import('file://' + path.join(SRC, 'rag', 'eval.js'));
  await ensureServers();
  await bridgePost('/admin/state', { dir: null });
  const profile = path.join(OUTA, 'profile'); fs.rmSync(profile, { recursive: true, force: true });
  const ctx = await pw.chromium.launchPersistentContext(profile, { headless: true, viewport: { width: 1280, height: 900 } }); ctx.setDefaultTimeout(120000);
  const external = [], errors = [];
  await ctx.route((u) => !(u.origin === ORIGIN || u.origin === BRIDGE_ORIGIN || u.origin === LLM_ORIGIN || /^(data|blob|about):/.test(u.protocol)), (r) => { external.push(r.request().url()); r.abort(); });
  await ctx.addInitScript('window.__RAG_BRIDGE__ = ' + JSON.stringify(BRIDGE)); await ctx.addInitScript({ path: path.join(SRC, 'rig', 'rag_bridge_shim.js') });
  await ctx.addInitScript(() => { window.__ING_RAG_TEST__ = true; });
  const p = ctx.pages()[0] || await ctx.newPage(); p.on('pageerror', (e) => errors.push(e.message));
  const mem = sampler(await findRoot(profile));
  const R = { when: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC', where: 'headless Chromium on Linux, 4 processors, the built page with rag/ beside it and the folder bridge standing in' };
  try {
    await p.goto(PAGE); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(800);
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); try { go('chat'); } catch (e) { } });
    await p.waitForFunction(() => !!(window.IngRag && IngRag.prompt && IngRag.schedule), null, { timeout: 90000 });
    await p.evaluate(() => IngRag.schedule(0));
    // ------------------------------------------------------------------ 4. memory, reading the whole corpus
    const NAMES = ['household_papers', 'lab_notes', 'historian_archive'];
    await bridgePost('/admin/dialog', { answers: NAMES.map((n) => path.join(FIX, n)) });
    const ids = await p.evaluate(async (n) => { const o = {}; for (let i = 0; i < n; i++) { const a = await IngRag.addFolder(); o[a.folder.name] = a.folder.id; } return o; }, NAMES.length);
    mem.phase = 'reading'; const tr = Date.now();
    for (const n of NAMES) { note('reading ' + n); const sm = await p.evaluate((id) => IngRag.indexFolder(id).then((s) => ({ files: s.files, chunks: s.chunks })), ids[n]); note(n + ': ' + JSON.stringify(sm)); }
    mem.phase = 'after';
    const st = await p.evaluate(async () => { const s = await IngRag.stats(); const e = IngRag._embedder ? await IngRag._embedder.info() : {}; return { files: s.files, passages: s.passages, workers: IngRag._embedder ? IngRag._embedder.workers : null }; });
    R.memory = { files: st.files, passages: st.passages, workers: st.workers, minutes: +((Date.now() - tr) / 60000).toFixed(1), peakMB: Math.round(mem.maxKB / 1024), pssMB: Math.round(mem.pssMaxKB / 1024), phase: mem.atPhase,
      method: 'ps, every 250 ms, the RSS of the browser process and all its children added up (shared pages counted in each process, so an upper bound), and PSS from /proc/<pid>/smaps_rollup every second; performance.measureUserAgentSpecificMemory needs cross-origin isolation, which the app does not have' };
    ok(st.files === 72 && R.memory.peakMB < 2048, '4. memory: the whole corpus (' + st.files + ' files, ' + st.passages + ' passages) read; peak ' + R.memory.peakMB + ' MB RSS (PSS ' + R.memory.pssMB + ' MB), under 2 GB', R.memory);
    // ------------------------------------------------------------------ 1. Recall@5
    const results = {};
    for (const it of GOLD.items) results[it.id] = await p.evaluate((q) => IngRag.retrieve(q, 'me', { k: 5 }).then((r) => r.passages.map((x) => ({ folderName: x.folderName, filePath: x.filePath, text: x.text }))), it.question);
    R.recall = E.recall(GOLD, results, 5);
    ok(R.recall.fileRecall >= 0.8, '1. Recall@5 ' + R.recall.fileHits + ' of ' + R.recall.n + ' (' + R.recall.fileRecall.toFixed(2) + ', file level; the passage holding the answer ' + R.recall.needleHits + ' of ' + R.recall.n + ')', R.recall.items.filter((x) => !x.fileRank || !x.needleRank));
    // ------------------------------------------------------------------ 3. ACL, retrieval half
    const restricted = GOLD.restricted_folder, onlyX = GOLD.items.filter((it) => it.source.folder === restricted);
    await p.evaluate(async (ids) => { const s = IngRag._store; const b = await s.principal.ensure({ name: 'test-b' }); for (const n of ['lab_notes', 'historian_archive']) await s.acl.grant({ folderId: ids[n], principalId: b.id }); }, ids);
    let leaks = 0, searchLeaks = 0;
    for (const it of onlyX) { const r = await p.evaluate(([q, x]) => IngRag.retrieve(q, 'test-b', { k: 5 }).then((r) => ({ p: r.passages.filter((y) => y.folderId === x).length, s: r.fts.concat(r.vec).filter((y) => y.folderId === x).length })), [it.question, ids[restricted]]); if (r.p) leaks++; if (r.s) searchLeaks++; }
    R.acl = { user: 'test-b', folder: restricted, n: onlyX.length, leaks, searchLeaks, e2eNotFound: null, e2eOther: [] };
    ok(leaks === 0 && searchLeaks === 0, '3. ACL: retrieve() and both searches give test-b no passage of ' + restricted + ' for its ' + onlyX.length + ' questions', { leaks, searchLeaks });
    // ------------------------------------------------------------------ 2. groundedness, and 3's end-to-end half, with the real model
    if (!SKIP_MODEL) {
      await p.evaluate(([base, name]) => { state.cloud = { provider: 'lmstudio', base: base, key: '', model: name, models: [name], on: true }; state.chatSource = 'cloud'; state.thinking = false; saveState(); IngRagChat.setOn(true); }, [LLM, 'local']);
      const ask = async (q) => { await p.evaluate(() => { const c = { id: 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), title: 'New conversation', messages: [] }; state.chats.push(c); state.activeChat = c.id; saveState(); renderChat(); });
        await p.fill('#chatInput', q); await p.evaluate(() => sendChat());
        await p.waitForFunction(() => { const m = curMsgs(); const l = m[m.length - 1]; return l && l.role === 'bot' && !l.live && (typeof liveBot === 'undefined' || !liveBot) && (!l.rag || l.rag.done || l.rag.called === false); }, null, { timeout: 900000 });
        return p.evaluate(() => { const l = curMsgs()[curMsgs().length - 1]; return { text: l.text, rag: l.rag ? { passages: (l.rag.passages || []).map((x) => ({ folder: x.folder, file: x.file, text: x.text })), called: l.rag.called } : null }; }); };
      const items = [];
      for (const it of GOLD.items) {
        const t = Date.now(); const a = await ask(it.question); const ps = (a.rag && a.rag.passages) || [];
        const g = E.grounded(a.text, ps); const correct = E.answerHas(a.text, it);
        items.push({ id: it.id, text: a.text, passages: ps.map((x) => ({ folder: x.folder, file: x.file, text: String(x.text || '').slice(0, 2000) })), notFound: g.notFound, cited: g.notFound || (!g.flagged.length && !g.badRefs.length && g.sentences.length > 0), flagged: g.flagged, badRefs: g.badRefs, unsupported: g.unsupported, correct, seconds: Math.round((Date.now() - t) / 1000) });
        note(it.id + ' (' + Math.round((Date.now() - t) / 1000) + ' s): ' + (g.notFound ? 'NOT_FOUND' : (g.ok ? 'grounded' : 'flagged')) + (correct ? ', names the fact' : '') + ' :: ' + String(a.text).replace(/\s+/g, ' ').slice(0, 160));
      }
      R.grounded = { model: LLM_NAME, items };
      const cited = items.filter((x) => x.cited).length, unsup = items.reduce((s, x) => s + x.unsupported.length, 0);
      ok(cited === items.length, '2. groundedness: every sentence cited and every citation to a passage given in ' + cited + ' of ' + items.length + ' answers', items.filter((x) => !x.cited).map((x) => x.id + ': ' + x.flagged.concat(x.badRefs.map((n) => '[' + n + ']')).join(' | ')));
      ok(unsup === 0, '2. groundedness: no cited sentence whose words are mostly missing from its passage (' + unsup + ' to read)', items.filter((x) => x.unsupported.length).map((x) => x.id + ': ' + x.unsupported.map((u) => u.text + ' (' + u.share + ')').join(' | ')));
      note('answers that name the fact: ' + items.filter((x) => x.correct).length + ' of ' + items.length);
      await p.evaluate(() => IngRagChat._as('test-b'));
      let nf = 0; const other = [];
      for (const it of onlyX) { const a = await ask(it.question); if (a.text === E.NOT_FOUND) nf++; else other.push(it.id + ': ' + a.text); note('test-b, ' + it.id + ': ' + String(a.text).slice(0, 160)); }
      await p.evaluate(() => IngRagChat._as('me'));
      R.acl.e2eNotFound = nf; R.acl.e2eOther = other;
      ok(nf === onlyX.length, '3. ACL end to end: ' + nf + ' of ' + onlyX.length + ' responses for test-b equal NOT_FOUND', other);
      await p.evaluate(() => { IngRagChat.setOn(false); state.chatSource = 'local'; state.cloud.on = false; saveState(); });
    } else note('no model: groundedness and the end-to-end half of the ACL criterion are left out');
    // ------------------------------------------------------------------ 5. reindex
    const WORK = path.join(OUTA, 'work', 'household_copy'); fs.rmSync(path.join(OUTA, 'work'), { recursive: true, force: true }); fs.cpSync(path.join(FIX, 'household_papers'), WORK, { recursive: true });
    await bridgePost('/admin/dialog', { answers: [WORK] });
    const wid = await p.evaluate(async () => { const a = await IngRag.addFolder(); await IngRag.indexFolder(a.folder.id); return a.folder.id; });
    const MOD = await p.evaluate(async (fid) => (await IngRag._store.debug.sql({ sql: "select f.path as p, count(*) as n from chunks c join files f on f.id = c.file_id where f.folder_id = ? and (f.path like '%.txt' or f.path like '%.md') group by f.path order by n desc, f.path limit 1", bind: [fid] }))[0], wid);
    const before = await p.evaluate(async () => ({ embedded: (await IngRag._embedder.info()).embedded, cache: (await IngRag._store.debug.sql({ sql: 'select hash from emb_cache' })).map((r) => r.hash) }));
    fs.writeFileSync(path.join(WORK, 'home', 'loft_insulation.md'), '# Loft insulation\n\nThe loft was insulated on 3 March 2026 by Hollins Insulation, with 270 mm of mineral wool rolls laid crosswise over the joists.\n\n## Cost\n\nThe quote was £1,180; the grant from the council paid £400 of it, so the household paid £780.\n');
    fs.appendFileSync(path.join(WORK, ...MOD.p.split('/')), '\n\nThe new cordless vacuum, bought on 2 November 2026 from Marlow Electrical, carries a three-year guarantee that ends on 2 November 2029.\n');
    const del = MOD.p === 'home/warranty_notes.txt' ? 'home/passport_reminders.txt' : 'home/warranty_notes.txt'; fs.rmSync(path.join(WORK, ...del.split('/')));
    const rep = await p.evaluate(() => IngRag.reconcile('evaluation'));
    const after = await p.evaluate(async ([fid, del]) => { const s = IngRag._store; return { embedded: (await IngRag._embedder.info()).embedded, files: (await s.file.list({ folderId: fid })).map((f) => f.path), hashes: (await s.debug.sql({ sql: 'select content_hash as h from chunks where folder_id = ?', bind: [fid] })).map((r) => r.h), gone: (await s.debug.sql({ sql: 'select count(*) as n from chunks where folder_id = ? and file_path = ?', bind: [fid, del] }))[0].n, counts: (await s.debug.sql({ sql: 'select (select count(*) from chunks) as c, (select count(*) from chunks_fts) as f, (select count(*) from chunks_vec) as v' }))[0] }; }, [wid, del]);
    const cache = new Set(before.cache), fresh = new Set(after.hashes.filter((h) => !cache.has(h))).size, calls = after.embedded - before.embedded;
    const reflects = after.files.includes('home/loft_insulation.md') && !after.files.includes(del) && after.gone === 0 && after.counts.c === after.counts.f && after.counts.c === after.counts.v && rep.changed === 2 && rep.gone === 1;
    R.reindex = { reflects, calls, fresh, changed: rep.changed, gone: rep.gone, modified: MOD.p, deleted: del };
    ok(reflects && calls === fresh && fresh > 0, '5. reindex: the index reflects each change; ' + calls + ' embedding calls for ' + fresh + ' new or changed passages', R.reindex);
    ok(!external.length, 'no request left this computer (the page, the bridge and the model server aside)', external.slice(0, 5));
    ok(!errors.length, 'no page error', errors.slice(0, 5));
  } catch (e) { ok(false, 'the evaluation ran to its end', String(e && e.stack || e).slice(0, 1500)); }
  finally { mem.stop(); try { await ctx.close(); } catch (e) { } for (const s of started) { try { s.kill(); } catch (e) { } } }
  fs.writeFileSync(path.join(OUTA, 'report.json'), JSON.stringify(R, null, 1));
  fs.writeFileSync(path.join(OUTA, 'report.md'), E.markdown(R) + '\n');
  console.log('\n' + pass + ' passed, ' + fail + ' failed in ' + ((Date.now() - T0) / 60000).toFixed(1) + ' min');
  process.exit(fail ? 1 : 0);
})();
