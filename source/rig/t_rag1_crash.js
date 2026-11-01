// Folder search, phase 1: the index survives Ingenium being closed or killed in the middle of a write (review of 1 November
// 2026, finding rag-r-01). The whole browser is killed (SIGKILL) while the store writes a file of 3,154 passages (the size of
// the corpus's 4 MB log), while it removes a folder of that size, and while it gives the room back (compact); then it is
// started again on the same profile, and the index must be whole: integrity_check "ok", the three tables of passages agreeing,
// and either the old rows or the new ones, never a mixture.
//   python3 rag/test/serve.py 8175 --vendor <the unpacked vendor tree>
//   node rig/t_rag1_crash.js http://127.0.0.1:8175/ <out folder>
const pw = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path'), cp = require('child_process');
const [BASE0, OUT] = process.argv.slice(2);
if (!BASE0 || !OUT) { console.log('usage: node rig/t_rag1_crash.js <server address> <out folder>'); process.exit(2); }
const HARNESS = BASE0.replace(/\/?$/, '/') + 'rag/test/harness.html';
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d).slice(0, 700) : '')); c ? pass++ : fail++; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pids = (prof) => cp.execFileSync('ps', ['-eo', 'pid=,args=']).toString().split('\n').filter((l) => l.includes(prof)).map((l) => +l.trim().split(/\s+/)[0]).filter(Boolean);
const N = 3154;

// in the page
function helpers() {
  window.C = {
    unit(seed, dims = 384) {
      let x = (seed * 2654435761) >>> 0; const v = new Float32Array(dims); let n = 0;
      for (let i = 0; i < dims; i++) { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; v[i] = x / 4294967296 - 0.5; n += v[i] * v[i]; }
      n = Math.sqrt(n); for (let i = 0; i < dims; i++) v[i] /= n; return v;
    },
    rows(k, seed0, tag) {
      const filler = ' The harbour master wrote down the tides, the cargo, the weather and the names of every ship that came in that week.';
      return Array.from({ length: k }, (_, i) => ({ chunk_index: i, heading_path: 'Log > ' + tag, char_start: i * 1000, char_end: i * 1000 + 999, page: null, content_hash: tag + i, text: tag + ' entry ' + i + filler.repeat(8), embedding: window.C.unit(seed0 + i) }));
    },
    // starts a long operation and returns at once; window.__done is set if it ends before the kill
    async start(kind, name, n) {
      const s = window.__s = RagHarness.makeStore(); await s.open({ dbName: name });
      const A = (await s.folder.add({ name: 'A', path: '/crash/a' })).id;
      await s.file.replace({ folderId: A, path: 'log.txt', size: 1, mtime: 1, contentHash: 'v1', model: 'm', chunks: window.C.rows(50, 5000, 'old') });
      if (kind !== 'replace') {
        const B = (await s.folder.add({ name: 'B', path: '/crash/b' })).id;
        await s.file.replace({ folderId: B, path: 'big.txt', size: 2, mtime: 2, contentHash: 'b1', model: 'm', chunks: window.C.rows(n, 9000, 'big') });
        if (kind === 'compact') await s.folder.remove({ folderId: B });
      }
      window.__done = null; const t0 = performance.now();
      const p = kind === 'replace' ? s.file.replace({ folderId: A, path: 'log.txt', size: 2, mtime: 2, contentHash: 'v2', model: 'm', chunks: window.C.rows(n, 9000, 'new') })
        : kind === 'remove' ? s.folder.remove({ folderId: 2 }) : s.compact();
      p.then(() => { window.__done = Math.round(performance.now() - t0); }, () => {});
      return 'started';
    },
    async check(name) {
      const s = RagHarness.makeStore(), out = {};
      try { out.open = (await s.open({ dbName: name })).schemaVersion; } catch (e) { out.open = 'ERR ' + (e.code || '') + ' ' + String(e.message).slice(0, 120); s.terminate(); return out; }
      const q = async (sql) => { try { return await s.debug.sql({ sql }); } catch (e) { return 'ERR ' + (e.code || '') + ' ' + String(e.message).slice(0, 100); } };
      out.stats = await s.stats().catch((e) => 'ERR ' + e.code);
      out.integrity = await q('select integrity_check as r from pragma_integrity_check limit 3');
      out.byFile = await q('select f.path, f.chunk_count as n, (select count(*) from chunks c where c.file_id = f.id) as have, (select min(content_hash) from chunks c where c.file_id = f.id) as first from files f order by f.path');
      out.ftsOrphans = await q('select count(*) as n from chunks_fts where rowid not in (select id from chunks)');
      out.vecOrphans = await q('select count(*) as n from chunks_vec where rowid not in (select id from chunks)');
      out.write = await s.file.replace({ folderId: 1, path: 'after.txt', size: 3, mtime: 3, contentHash: 'v3', model: 'm', chunks: window.C.rows(5, 12000, 'after') }).then((x) => x.chunkCount, (e) => 'ERR ' + e.code);
      s.terminate(); await new Promise((r) => setTimeout(r, 400));
      return out;
    },
  };
}

(async () => {
  const runs = [];
  for (const [kind, delays] of [['replace', [500, 750, 1000, 1300]], ['remove', [400, 1200]], ['compact', [40, 90]]]) {
    for (const delay of delays) {
      const prof = fs.mkdtempSync(path.join(OUT, 'profile-' + kind + '-' + delay + '-')), name = kind + '-' + delay + '.sqlite3';
      let ctx = await pw.chromium.launchPersistentContext(prof, { headless: true });
      await ctx.addInitScript(helpers);
      let page = ctx.pages()[0] || await ctx.newPage();
      await page.goto(HARNESS); await page.waitForFunction(() => window.RagHarness && window.RagHarness.ready === true, null, { timeout: 30000 });
      await page.evaluate(([k, nm, n]) => window.C.start(k, nm, n), [kind, name, N]);
      await sleep(delay);
      const done = await page.evaluate(() => window.__done).catch(() => 'n/a');
      for (const p of pids(prof)) { try { process.kill(p, 'SIGKILL'); } catch (e) { /* gone */ } }
      await sleep(1500); try { await ctx.close(); } catch (e) { /* killed */ }
      ctx = await pw.chromium.launchPersistentContext(prof, { headless: true });
      await ctx.addInitScript(helpers);
      page = ctx.pages()[0] || await ctx.newPage();
      await page.goto(HARNESS); await page.waitForFunction(() => window.RagHarness && window.RagHarness.ready === true, null, { timeout: 30000 });
      const r = await page.evaluate((nm) => window.C.check(nm), name).catch((e) => ({ error: String(e.message).slice(0, 200) }));
      await ctx.close();
      fs.rmSync(prof, { recursive: true, force: true });
      runs.push({ kind, delay, done, r });
      const whole = Array.isArray(r.integrity) && r.integrity.length === 1 && r.integrity[0].r === 'ok';
      const agree = Array.isArray(r.ftsOrphans) && r.ftsOrphans[0].n === 0 && Array.isArray(r.vecOrphans) && r.vecOrphans[0].n === 0 && r.stats && r.stats.chunks === r.stats.chunks_fts && r.stats.chunks === r.stats.chunks_vec;
      const files = Array.isArray(r.byFile) ? r.byFile : [];
      const log = files.find((f) => f.path === 'log.txt'), big = files.find((f) => f.path === 'big.txt');
      let oneOrOther = false;
      if (kind === 'replace') oneOrOther = !!log && log.n === log.have && ((log.n === 50 && log.first === 'old0') || (log.n === N && /^new/.test(log.first)));
      else if (kind === 'remove') oneOrOther = !!log && log.n === 50 && (big ? big.n === N && big.have === N : true);
      else oneOrOther = !!log && log.n === 50 && !big;
      const label = kind + ', killed after ' + delay + ' ms' + (done != null && done !== 'n/a' ? ' (it had finished in ' + done + ' ms)' : ' (in the middle)');
      ok(r.open === 2 && whole, label + ': the index opens and is whole (integrity_check ok)', r);
      ok(agree && oneOrOther, label + ': the three tables agree, with the old rows or the new ones, never a mixture', { stats: r.stats, files });
      ok(r.write === 5, label + ': and it can be written again', r.write);
    }
  }
  fs.writeFileSync(path.join(OUT, 'crash.json'), JSON.stringify(runs, null, 1));
  console.log(pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log('FAIL the test itself: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
