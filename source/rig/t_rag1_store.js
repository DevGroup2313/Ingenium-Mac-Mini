// Folder search, phase 1: the store (rag/store.js and rag/store.worker.js; rag/DESIGN.md sections 3 and 4).
// Schema and version, migrations that re-run safely, principals, folders, ACL rows, file.replace (chunks, FTS rows and vectors
// in one transaction, replaced cleanly, a failure mid-way leaves the old rows), file.delete and folder.remove (nothing left in
// any table), the embedding cache, the database surviving a reload in OPFS, a second window that must not take the files, and
// a store made for a model with longer vectors.
//   python3 rag/test/serve.py 8175 --vendor <the unpacked vendor tree>        (rag/ = source/rag, rag/vendor = the vendor tree)
//   node rig/t_rag1_store.js http://127.0.0.1:8175/ <out folder>
// The first argument is the server's address (or the harness page's address itself).
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [BASE0, OUT] = process.argv.slice(2);
if (!BASE0 || !OUT) { console.log('usage: node rig/t_rag1_store.js <server address or harness address> <out folder>'); process.exit(2); }
const HARNESS = /\.html($|\?)/.test(BASE0) ? BASE0 : BASE0.replace(/\/?$/, '/') + 'rag/test/harness.html';
const ORIGIN = new URL(HARNESS).origin;
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d).slice(0, 700) : '')); c ? pass++ : fail++; };
const sameJSON = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Helpers that live in the page (re-installed after every load).
function pageHelpers() {
  window.T = window.T || {};
  // a unit vector from a seed, so the same seed is the same vector in every run
  window.T.mk = (seed, dims = 384) => {
    const a = new Float32Array(dims); let s = (seed * 2654435761) >>> 0, n = 0;
    for (let i = 0; i < dims; i++) { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; a[i] = s / 4294967296 - 0.5; n += a[i] * a[i]; }
    n = Math.sqrt(n); for (let i = 0; i < dims; i++) a[i] /= n; return a;
  };
  // n chunks in the shape file.replace takes; hashes are prefix + index, vectors from seed0 + index
  window.T.chunks = (n, o = {}) => Array.from({ length: n }, (_, i) => ({
    chunk_index: i, heading_path: o.heading != null ? o.heading : 'Part ' + (i + 1), char_start: i * 100, char_end: i * 100 + 99,
    page: o.pages ? i + 1 : null, content_hash: (o.prefix || 'h') + i, text: o.texts ? o.texts[i % o.texts.length] : 'chunk text number ' + i,
    embedding: window.T.mk((o.seed0 || 0) + i, o.dims || 384),
  }));
  window.T.fnv = (u8) => { let h = 2166136261; for (let i = 0; i < u8.length; i++) { h ^= u8[i]; h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; };
  window.T.bytes = (f32) => new Uint8Array(f32.buffer, f32.byteOffset, f32.byteLength);
  window.T.snap = async (s) => ({
    stats: await s.stats(),
    chunks: await s.debug.sql({ sql: 'select * from chunks order by id' }),
    fts: await s.debug.sql({ sql: 'select rowid, text, heading_path, folder_id from chunks_fts order by rowid' }),
    vec: (await s.debug.sql({ sql: 'select rowid, folder_id, embedding from chunks_vec order by rowid' })).map((r) => [r.rowid, r.folder_id, window.T.fnv(r.embedding)]),
    files: await s.debug.sql({ sql: 'select * from files order by id' }),
    cache: (await s.debug.sql({ sql: 'select model, hash, vec from emb_cache order by model, hash' })).map((r) => [r.model, r.hash, window.T.fnv(r.vec)]),
  });
  // the three tables of chunks must hold the same rowids, and every file must count its chunks right
  window.T.consistent = async (s) => {
    const ids = async (sql) => (await s.debug.sql({ sql })).map((r) => r.id);
    const a = await ids('select id from chunks order by id'), b = await ids('select rowid as id from chunks_fts order by rowid'), c = await ids('select rowid as id from chunks_vec order by rowid');
    const files = await s.debug.sql({ sql: 'select f.id, f.chunk_count, (select count(*) from chunks c where c.file_id = f.id) as n from files f' });
    const wrongFolder = await s.debug.sql({ sql: 'select count(*) as n from chunks c join files f on f.id = c.file_id where f.folder_id <> c.folder_id' });
    const vecFolder = await s.debug.sql({ sql: 'select count(*) as n from chunks c join chunks_vec v on v.rowid = c.id where v.folder_id <> c.folder_id' });
    return { ids: a.length, sameFts: JSON.stringify(a) === JSON.stringify(b), sameVec: JSON.stringify(a) === JSON.stringify(c), countsRight: files.every((f) => f.chunk_count === f.n), folderRight: wrongFolder[0].n === 0 && vecFolder[0].n === 0 };
  };
}

(async () => {
  const b = await pw.chromium.launch();
  const ctx = await b.newContext();
  const external = [], requests = [], consoleErrors = [];
  await ctx.route((u) => u.origin !== ORIGIN && !/^(data|blob):/.test(u.protocol), (route) => { external.push(route.request().url()); route.abort(); });
  ctx.on('request', (r) => requests.push(r.url()));
  await ctx.addInitScript(pageHelpers);
  const p = await ctx.newPage();
  const pageErrors = [];
  p.on('pageerror', (e) => pageErrors.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  const ev = (fn, arg) => p.evaluate(fn, arg);
  const load = async () => { await p.goto(HARNESS); await p.waitForFunction(() => window.RagHarness && window.RagHarness.ready === true, null, { timeout: 30000 }); };

  const SECTIONS = ['start', 'memory', 'schema', 'migrations', 'principals', 'folders and ACL', 'file.replace', 'replace and failure', 'delete and remove', 'embedding cache', 'transfer and arguments', 'dims', 'size estimate', 'OPFS reload', 'second window', 'OPFS volume', 'nothing left behind', 'damaged index'];
  const ran = [];
  const section = async (name, fn) => { try { await fn(); ran.push(name); } catch (e) { ok(false, 'section "' + name + '" stopped: ' + (e && e.message)); } };

  await load();

  // ------------------------------------------------------------------------------------------------------------ start
  await section('start', async () => {
    const r = await ev(async () => {
      const s = RagHarness.makeStore();
      const keys = (o) => Object.keys(o).sort();
      return { ns: { principal: keys(s.principal), folder: keys(s.folder), acl: keys(s.acl), file: keys(s.file), emb: keys(s.emb) }, hasOpen: typeof s.open === 'function', hasStats: typeof s.stats === 'function' };
    });
    ok(r.hasOpen && r.hasStats && sameJSON(r.ns.principal, ['ensure']) && sameJSON(r.ns.folder, ['add', 'list', 'remove', 'touch']) && sameJSON(r.ns.acl, ['allowed', 'grant', 'revoke']) && r.ns.file.includes('replace') && r.ns.emb.includes('lookup') && r.ns.emb.includes('put'), 'the client has every call of DESIGN section 3 (principal, folder, acl, file, emb, stats, open)', r.ns);
  });

  // ------------------------------------------------------------------------------------------------------------ memory
  await section('memory', async () => {
    const r = await ev(async () => {
      const out = {};
      const names = async () => { const l = []; for await (const [n] of await navigator.storage.getDirectory()) l.push(n); return l.sort(); };
      out.before = await names();
      const s = RagHarness.makeStore(); window.T.mem = s; window.T.events = [];
      s.onEvent((m) => window.T.events.push(m.event + ':' + m.worker));
      out.beforeOpen = await s.stats().then(() => null, (e) => e.code);
      out.open = await s.open({ vfs: 'memory' });
      out.again = await s.open({ vfs: 'memory' });
      out.other = await s.open({ vfs: 'memory', dbName: 'other.sqlite3' }).then(() => null, (e) => e.code);
      out.badVfs = await RagHarness.makeStore().open({ vfs: 'floppy' }).then(() => null, (e) => e.code);
      out.after = await names();
      out.events = window.T.events.slice();
      out.ops = await s.ops();
      out.unknown = await s.call('no.such.op', {}).then(() => null, (e) => e.code);
      return out;
    });
    ok(r.open.schemaVersion === 2 && r.open.vfs === 'memory' && r.open.sqlite === '3.45.3' && /^v0\.1\.6$/.test(r.open.vec) && r.open.dims === 384, "open({vfs: 'memory'}) gives {schemaVersion: 1, vfs, sqlite 3.45.3, vec v0.1.6}", r.open);
    ok(r.beforeOpen === 'NOT_OPEN', 'a call before open is refused (NOT_OPEN)', r.beforeOpen);
    ok(r.again.schemaVersion === 2 && r.again.dbName === r.open.dbName && r.other === 'ALREADY_OPEN', 'open again with the same arguments changes nothing; with another database it says ALREADY_OPEN', { again: r.again, other: r.other });
    ok(r.badVfs === 'BAD_ARGS' && r.unknown === 'UNKNOWN_OP', 'a bad vfs and an unknown op are refused with a code', { badVfs: r.badVfs, unknown: r.unknown });
    ok(sameJSON(r.before, r.after) && !r.after.some((n) => /ingenium|sahpool/i.test(n)), 'memory mode touches no OPFS: the origin\'s private file system has no new entry', { before: r.before, after: r.after });
    ok(r.events.includes('hello:store'), 'the worker announces itself with a hello event', r.events);
    const want = ['open', 'principal.ensure', 'folder.add', 'folder.list', 'folder.remove', 'folder.touch', 'acl.grant', 'acl.revoke', 'acl.allowed', 'file.list', 'file.get', 'file.replace', 'file.delete', 'emb.lookup', 'emb.put', 'stats', 'debug.rows'];
    ok(want.every((o) => r.ops.includes(o)), 'the worker serves every op of DESIGN section 3', { missing: want.filter((o) => !r.ops.includes(o)) });
  });

  // ------------------------------------------------------------------------------------------------------------ schema
  await section('schema', async () => {
    const r = await ev(async () => {
      const s = window.T.mem, out = {};
      const master = await s.debug.rows({ table: 'sqlite_master', limit: 500 });
      out.names = master.map((m) => m.name);
      out.vecSql = master.find((m) => m.name === 'chunks_vec').sql;
      out.ftsSql = master.find((m) => m.name === 'chunks_fts').sql;
      out.tableType = Object.fromEntries(master.filter((m) => ['chunks_fts', 'chunks_vec'].includes(m.name)).map((m) => [m.name, m.type + ':' + /virtual/i.test(m.sql)]));
      const cols = async (t) => (await s.debug.sql({ sql: `select name, type, "notnull" as nn, dflt_value, pk from pragma_table_info('${t}') order by cid` })).map((c) => [c.name, c.type.toLowerCase(), c.nn, c.dflt_value, c.pk]);
      out.cols = {};
      for (const t of ['meta', 'principals', 'folders', 'folder_acl', 'files', 'chunks', 'emb_cache']) out.cols[t] = await cols(t);
      const fk = async (t) => (await s.debug.sql({ sql: `select "table" as t, "from" as f, "to" as k, on_delete as d from pragma_foreign_key_list('${t}')` })).map((x) => [x.t, x.f, x.k, x.d]).sort();
      out.fk = { files: await fk('files'), folder_acl: await fk('folder_acl'), chunks: await fk('chunks'), folders: await fk('folders') };
      const idx = async (t) => {
        const l = await s.debug.sql({ sql: `select name, "unique" as u from pragma_index_list('${t}')` }); const res = [];
        for (const i of l) res.push([i.u, (await s.debug.sql({ sql: `select name from pragma_index_info('${i.name}') order by seqno` })).map((c) => c.name).join('+')]);
        return res.sort();
      };
      out.idx = { folders: await idx('folders'), principals: await idx('principals'), files: await idx('files'), chunks: await idx('chunks') };
      out.meta = await s.debug.sql({ sql: 'select key, value from meta' });
      out.fkOn = (await s.debug.sql({ sql: 'select foreign_keys as v from pragma_foreign_keys' }))[0].v;
      return out;
    });
    const T = (n) => r.names.includes(n);
    ok(['meta', 'principals', 'folders', 'folder_acl', 'files', 'chunks', 'chunks_fts', 'chunks_vec', 'emb_cache', 'chunks_file'].every(T), 'every table of DESIGN section 4 and the index chunks_file exist', r.names.filter((n) => !/_(data|idx|docsize|config|content|chunks|info|rowids|vector_chunks\d+)$/.test(n)));
    ok(sameJSON(r.cols.meta, [['key', 'text', 0, null, 1], ['value', 'text', 0, null, 0]]), 'meta(key text primary key, value text)', r.cols.meta);
    ok(sameJSON(r.cols.principals, [['id', 'integer', 0, null, 1], ['name', 'text', 1, null, 0]]), 'principals(id integer primary key, name text not null unique)', r.cols.principals);
    ok(sameJSON(r.cols.folders, [['id', 'integer', 0, null, 1], ['name', 'text', 1, null, 0], ['path', 'text', 1, null, 0], ['source', 'text', 1, null, 0], ['manual_only', 'integer', 1, '0', 0], ['added_at', 'integer', 1, null, 0], ['last_indexed_at', 'integer', 0, null, 0]]), 'folders: the columns, not-null flags and default of DESIGN section 4', r.cols.folders);
    ok(sameJSON(r.cols.folder_acl, [['folder_id', 'integer', 1, null, 1], ['principal_id', 'integer', 1, null, 2]]), 'folder_acl: primary key (folder_id, principal_id)', r.cols.folder_acl);
    ok(sameJSON(r.cols.files, [['id', 'integer', 0, null, 1], ['folder_id', 'integer', 1, null, 0], ['path', 'text', 1, null, 0], ['size', 'integer', 1, null, 0], ['mtime', 'integer', 1, null, 0], ['content_hash', 'text', 1, null, 0], ['chunk_count', 'integer', 1, null, 0], ['indexed_at', 'integer', 1, null, 0]]), 'files: the columns of DESIGN section 4', r.cols.files);
    ok(sameJSON(r.cols.chunks, [['id', 'integer', 0, null, 1], ['folder_id', 'integer', 1, null, 0], ['file_id', 'integer', 1, null, 0], ['file_path', 'text', 1, null, 0], ['chunk_index', 'integer', 1, null, 0], ['heading_path', 'text', 1, "''", 0], ['char_start', 'integer', 1, null, 0], ['char_end', 'integer', 1, null, 0], ['page', 'integer', 0, null, 0], ['content_hash', 'text', 1, null, 0], ['text', 'text', 1, null, 0]]), 'chunks: the columns of DESIGN section 4 (heading_path defaults to the empty string)', r.cols.chunks);
    ok(sameJSON(r.cols.emb_cache, [['model', 'text', 1, null, 1], ['hash', 'text', 1, null, 2], ['vec', 'blob', 1, null, 0]]), 'emb_cache: primary key (model, hash), vec blob', r.cols.emb_cache);
    ok(sameJSON(r.fk.files, [['folders', 'folder_id', 'id', 'CASCADE']]) && sameJSON(r.fk.folder_acl, [['folders', 'folder_id', 'id', 'CASCADE'], ['principals', 'principal_id', 'id', 'CASCADE']]) && sameJSON(r.fk.chunks, [['files', 'file_id', 'id', 'CASCADE']]) && r.fk.folders.length === 0, 'foreign keys: files, folder_acl and chunks.file_id cascade; chunks.folder_id has none', r.fk);
    ok(r.idx.folders.some((i) => i[0] === 1 && i[1] === 'path') && r.idx.principals.some((i) => i[0] === 1 && i[1] === 'name') && r.idx.files.some((i) => i[0] === 1 && i[1] === 'folder_id+path') && r.idx.chunks.some((i) => i[1] === 'file_id'), 'unique(folders.path), unique(principals.name), unique(files.folder_id, path) and the index chunks_file(file_id)', r.idx);
    ok(/using vec0\(folder_id integer partition key, embedding float\[384\] distance_metric=cosine\)/i.test(r.vecSql) && /using fts5\(text, heading_path, folder_id unindexed, tokenize = 'porter unicode61'\)/i.test(r.ftsSql) && /virtual/i.test(r.vecSql) && /virtual/i.test(r.ftsSql), 'chunks_vec is vec0 with a folder_id partition key and 384 cosine values; chunks_fts is FTS5 (porter unicode61, folder_id unindexed)', { vec: r.vecSql, fts: r.ftsSql });
    ok(sameJSON(r.meta, [{ key: 'schema_version', value: '2' }]), "meta holds schema_version '2' (version 2: removing leaves nothing behind)", r.meta);
    ok(r.fkOn === 1, 'pragma foreign_keys is on', r.fkOn);
  });

  // ------------------------------------------------------------------------------------------------------------ migrations
  await section('migrations', async () => {
    const r = await ev(async () => {
      const s = RagHarness.makeStore(); window.T.mig = s; const out = {};
      await s.open({ vfs: 'memory' });
      const ver = async () => (await s.debug.sql({ sql: "select value from meta where key = 'schema_version'" }))[0].value;
      const has = async (n) => (await s.debug.sql({ sql: "select count(*) as n from sqlite_master where name = ?", bind: [n] }))[0].n;
      out.first = await s.debug.migrate({ migrations: [{ version: 3, sql: "create table mig_a(x integer); insert into mig_a values (7)" }] });
      out.v2 = await ver(); out.a = await has('mig_a');
      out.again = await s.debug.migrate({ migrations: [{ version: 3, sql: "create table mig_a(x integer)" }] });   // would fail if it ran again
      out.rows = (await s.debug.sql({ sql: 'select count(*) as n from mig_a' }))[0].n;
      out.fail = await s.debug.migrate({ migrations: [{ version: 3, sql: 'x' }, { version: 4, sql: 'create table mig_b(x); create table mig_b(y)' }] }).then(() => null, (e) => e.message);
      out.v2after = await ver(); out.b = await has('mig_b');
      out.fixed = await s.debug.migrate({ migrations: [{ version: 3, sql: 'x' }, { version: 4, sql: 'create table mig_b(x)' }] });
      out.v3 = await ver(); out.b2 = await has('mig_b');
      out.order = await s.debug.migrate({ migrations: [{ version: 3, sql: 'x' }, { version: 4, sql: 'x' }, { version: 10, sql: 'create table mig_c(x)' }] }).then(() => null, (e) => e.code);
      out.c = await has('mig_c');
      out.stats = await s.stats();
      return out;
    });
    ok(sameJSON(r.first, { from: 2, to: 3, applied: [3] }) && r.v2 === '3' && r.a === 1, 'a later version adds a step: version 3 is applied once and meta.schema_version follows', r.first);
    ok(sameJSON(r.again, { from: 3, to: 3, applied: [] }) && r.rows === 1, 'the same list run again applies nothing (the step that would fail is not run twice)', { again: r.again, rows: r.rows });
    ok(typeof r.fail === 'string' && r.v2after === '3' && r.b === 0, 'a step that fails leaves the version where it was and none of its changes', { fail: r.fail, version: r.v2after, table: r.b });
    ok(sameJSON(r.fixed, { from: 3, to: 4, applied: [4] }) && r.v3 === '4' && r.b2 === 1, 'the corrected step then applies', r.fixed);
    ok(r.order === 'BAD_MIGRATIONS' && r.c === 0, 'a list with a missing version is refused before anything runs', { order: r.order, c: r.c });
    ok(r.stats.meta === 1, 'the migrations left one meta row', r.stats);
  });

  // ------------------------------------------------------------------------------------------------------------ principals
  await section('principals', async () => {
    const r = await ev(async () => {
      const s = window.T.mem, out = {};
      out.me1 = await s.principal.ensure({ name: 'me' }); out.me2 = await s.principal.ensure({ name: 'me' });
      out.b = await s.principal.ensure({ name: 'test-b' });
      out.empty = await s.principal.ensure({ name: '' }).then(() => null, (e) => e.code);
      out.rows = await s.debug.sql({ sql: 'select id, name from principals order by id' });
      window.T.me = out.me1.id; window.T.b = out.b.id;
      return out;
    });
    ok(r.me1.id === r.me2.id && r.b.id !== r.me1.id && r.rows.length === 2, 'principal.ensure: the same name is the same id, another name another id', r.rows);
    ok(r.empty === 'BAD_ARGS', 'an empty name is refused', r.empty);
  });

  // ------------------------------------------------------------------------------------------------------------ folders and ACL
  await section('folders and ACL', async () => {
    const r = await ev(async () => {
      const s = window.T.mem, out = {}; const me = window.T.me, tb = window.T.b;
      const A = await s.folder.add({ name: 'Letters', path: '/Users/me/Letters' });
      const B = await s.folder.add({ name: 'Drafts', path: '/Users/me/Drafts', source: 'test', manualOnly: true });
      const A2 = await s.folder.add({ name: 'Letters', path: '/Users/me/Letters' });
      const A3 = await s.folder.add({ name: 'Old letters', path: '/Users/me/Letters', manualOnly: true });
      out.A = A; out.B = B; out.A2 = A2; out.A3 = A3;
      window.T.A = A.id; window.T.B = B.id;
      out.list = (await s.folder.list()).map((f) => [f.id, f.name, f.manualOnly, f.source]);
      out.noneYet = await s.folder.list({ principalId: me });
      out.g1 = await s.acl.grant({ folderId: A.id, principalId: me });
      out.g1b = await s.acl.grant({ folderId: A.id, principalId: me });
      await s.acl.grant({ folderId: B.id, principalId: tb });
      out.allowedMe = await s.acl.allowed({ principalId: me }); out.allowedB = await s.acl.allowed({ principalId: tb });
      out.listMe = (await s.folder.list({ principalId: me })).map((f) => f.id); out.listB = (await s.folder.list({ principalId: tb })).map((f) => f.id);
      out.aclRows = (await s.stats()).folder_acl;
      out.unknownP = await s.acl.allowed({ principalId: 999 });
      out.badFolder = await s.acl.grant({ folderId: 999, principalId: me }).then(() => null, (e) => e.code);
      out.badPrincipal = await s.acl.grant({ folderId: A.id, principalId: 999 }).then(() => null, (e) => e.code);
      out.touch = await s.folder.touch({ folderId: A.id, indexedAt: 1730500000000 });
      out.touchBad = await s.folder.touch({ folderId: 999, indexedAt: 1 }).then(() => null, (e) => e.code);
      out.listAfterTouch = (await s.folder.list()).find((f) => f.id === A.id);
      // a second user is granted the first folder too, then loses it
      await s.acl.grant({ folderId: A.id, principalId: tb });
      out.sharedB = await s.acl.allowed({ principalId: tb });
      out.rev1 = await s.acl.revoke({ folderId: A.id, principalId: tb }); out.rev2 = await s.acl.revoke({ folderId: A.id, principalId: tb });
      out.afterRevoke = await s.acl.allowed({ principalId: tb });
      return out;
    });
    ok(r.A.created === true && r.B.created === true && r.A.manualOnly === false && r.B.manualOnly === true && r.B.source === 'test' && r.A.source === 'bridge' && r.A.lastIndexedAt === null && Math.abs(r.A.addedAt - Date.now()) < 300000, 'folder.add returns the folder row (source defaults to bridge, manualOnly to false)', r.A);
    ok(r.A2.created === false && r.A2.id === r.A.id && r.A3.id === r.A.id && r.A3.manualOnly === true && r.A3.name === 'Old letters' && r.list.length === 2, 'adding the same path again gives the same folder (and applies what is said differently)', { A2: r.A2, A3: r.A3, list: r.list });
    ok(r.noneYet.length === 0 && sameJSON(r.allowedMe, [r.A.id]) && sameJSON(r.allowedB, [r.B.id]) && sameJSON(r.listMe, [r.A.id]) && sameJSON(r.listB, [r.B.id]), 'acl.grant / acl.allowed / folder.list({principalId}): each user sees only the folders granted to them', { me: r.allowedMe, b: r.allowedB });
    ok(r.g1.folderId === r.A.id && r.aclRows === 2, 'granting twice is one ACL row', r.aclRows);
    ok(sameJSON(r.unknownP, []) && r.badFolder === 'NO_SUCH_FOLDER' && r.badPrincipal === 'NO_SUCH_PRINCIPAL', 'an unknown principal is allowed nothing; granting an unknown folder or principal is refused', { unknownP: r.unknownP, badFolder: r.badFolder, badPrincipal: r.badPrincipal });
    ok(r.touch.lastIndexedAt === 1730500000000 && r.listAfterTouch.lastIndexedAt === 1730500000000 && r.touchBad === 'NO_SUCH_FOLDER', 'folder.touch sets last_indexed_at', r.touch);
    ok(sameJSON(r.sharedB, [r.A.id, r.B.id]) && r.rev1.removed === 1 && r.rev2.removed === 0 && sameJSON(r.afterRevoke, [r.B.id]), 'acl.revoke removes the row (and a second revoke removes nothing)', { sharedB: r.sharedB, rev1: r.rev1, rev2: r.rev2 });
  });

  // ------------------------------------------------------------------------------------------------------------ file.replace
  await section('file.replace', async () => {
    const r = await ev(async () => {
      const s = window.T.mem, out = {}; const A = window.T.A, B = window.T.B;
      const texts = ['The abbey of Cluny grew rich in the tenth century.', 'Letters of Abbot Hugh to the monastic houses.', 'A reform of the monastic orders.', 'Rents, tithes and the economy of a great house.', 'Unrelated notes on Roman tax law.'];
      const chunks = window.T.chunks(5, { prefix: 'a', seed0: 100, texts, heading: 'Cluny > History', pages: true });
      window.T.one = chunks.map((c) => ({ hash: c.content_hash, text: c.text, vec: Array.from(c.embedding), idx: c.chunk_index }));
      const keep = chunks.map((c) => c.embedding.slice());   // our copies: the originals travel to the worker
      out.res = await s.file.replace({ folderId: A, path: 'docs/one.md', size: 1234, mtime: 1730400000123, contentHash: 'file-one', model: 'm1', chunks });
      out.detached = chunks.map((c) => c.embedding.length);
      out.file = await s.file.get({ folderId: A, path: 'docs/one.md' });
      out.missing = await s.file.get({ folderId: A, path: 'docs/none.md' });
      out.list = await s.file.list({ folderId: A });
      out.stats = await s.stats();
      out.rows = await s.debug.sql({ sql: 'select id, folder_id, file_id, file_path, chunk_index, heading_path, char_start, char_end, page, content_hash, text from chunks order by id' });
      out.cons = await window.T.consistent(s);
      // the vectors come back byte for byte
      const back = await s.debug.sql({ sql: 'select rowid, embedding from chunks_vec order by rowid' });
      out.bitwise = back.map((r2, i) => r2.embedding.length === 1536 && window.T.fnv(r2.embedding) === window.T.fnv(window.T.bytes(keep[i])));
      out.dims = (await s.debug.rows({ table: 'chunks_vec' })).map((x) => x.dims);
      // a second file in the second folder with the very same vectors: the filter by allowed folders decides who finds what
      const chunksB = window.T.chunks(5, { prefix: 'b', seed0: 100, texts, heading: 'Cluny > History' });
      out.resB = await s.file.replace({ folderId: B, path: 'docs/copy.md', size: 99, mtime: 1730400000999, contentHash: 'file-two', model: 'm1', chunks: chunksB });
      const knn = async (vec, allowed) => (await s.debug.sql({ sql: 'select rowid, folder_id, distance from chunks_vec where embedding match ? and k = 10 and folder_id in (select value from json_each(?)) order by distance', bind: [window.T.bytes(vec), JSON.stringify(allowed)] })).map((x) => [x.rowid, x.folder_id, Math.round(x.distance * 1e6) / 1e6]);
      const q = keep[2];
      out.knnA = await knn(q, [A]); out.knnB = await knn(q, [B]); out.knnBoth = await knn(q, [A, B]); out.knnNone = await knn(q, []);
      const fts = async (term, allowed) => (await s.debug.sql({ sql: "select rowid, folder_id from chunks_fts where chunks_fts match ? and folder_id in (select value from json_each(?)) order by rowid", bind: [term, JSON.stringify(allowed)] })).map((x) => [x.rowid, x.folder_id]);
      out.ftsA = await fts('abbey', [A]); out.ftsB = await fts('abbey', [B]); out.ftsNone = await fts('abbey', []); out.ftsStem = await fts('letter', [A, B]); out.ftsHeading = await fts('heading_path : cluny', [A]);
      out.statsAfterB = await s.stats();
      return out;
    });
    ok(r.res.chunkCount === 5 && Number.isInteger(r.res.fileId) && r.res.fileId >= 1, 'file.replace returns {fileId, chunkCount}', r.res);
    ok(r.file && r.file.path === 'docs/one.md' && r.file.size === 1234 && r.file.mtime === 1730400000123 && r.file.contentHash === 'file-one' && r.file.chunkCount === 5 && Math.abs(r.file.indexedAt - Date.now()) < 300000 && r.file.id === r.res.fileId && r.missing === null && sameJSON(r.list.map((f) => f.path), ['docs/one.md']), 'file.get / file.list give {id, path, size, mtime, contentHash, chunkCount, indexedAt} (null for a file that is not there)', r.file);
    ok(r.stats.chunks === 5 && r.stats.chunks_fts === 5 && r.stats.chunks_vec === 5 && r.stats.emb_cache === 5 && r.stats.files === 1, 'one file of 5 chunks wrote 5 chunk rows, 5 FTS rows, 5 vectors and 5 cache entries', r.stats);
    ok(r.rows.length === 5 && r.rows.every((x, i) => x.file_path === 'docs/one.md' && x.chunk_index === i && x.heading_path === 'Cluny > History' && x.char_start === i * 100 && x.char_end === i * 100 + 99 && x.page === i + 1 && x.content_hash === 'a' + i && x.file_id === r.res.fileId), 'the chunk rows hold the fields as sent (file_path, chunk_index, heading_path, offsets, page, content_hash)', r.rows[0]);
    ok(r.cons.sameFts && r.cons.sameVec && r.cons.countsRight && r.cons.folderRight && r.cons.ids === 5, 'chunks, chunks_fts and chunks_vec hold the same rowids; folder ids agree', r.cons);
    ok(r.bitwise.length === 5 && r.bitwise.every(Boolean) && r.dims.every((d) => d === 384), 'the vectors are stored as the bytes of the Float32Array, 384 values, unchanged', { bitwise: r.bitwise, dims: r.dims });
    ok(r.detached.every((n) => n === 0), 'the embeddings passed in were transferred to the worker (the caller\'s arrays are emptied)', r.detached);
    ok(r.knnA.length === 5 && r.knnA[0][0] === 3 && r.knnA[0][2] < 1e-5 && r.knnA.every((x) => x[1] === r.knnA[0][1]) && r.knnA.every((x, i, a) => i === 0 || a[i - 1][2] <= x[2]), 'KNN for a stored vector, in its folder only: it is its own nearest neighbour (distance 0), the rest in order', r.knnA);
    ok(r.knnB.length === 5 && r.knnB.every((x) => x[1] !== r.knnA[0][1]) && r.knnBoth.length === 10 && r.knnNone.length === 0, 'KNN with folder_id in (select value from json_each(?)): only the allowed folders, both when both are allowed, none for an empty set', { A: r.knnA.length, B: r.knnB.length, both: r.knnBoth.length, none: r.knnNone.length });
    ok(r.ftsA.length === 1 && r.ftsB.length === 1 && r.ftsA[0][1] !== r.ftsB[0][1] && r.ftsNone.length === 0 && r.ftsStem.length === 2, 'FTS5 with the same filter: "abbey" is found once per folder allowed; the porter stemmer finds "letters" for "letter"', { A: r.ftsA, B: r.ftsB, stem: r.ftsStem });
    ok(r.ftsHeading.length === 5, 'FTS5 also indexes heading_path', r.ftsHeading);
    ok(r.statsAfterB.chunks === 10 && r.statsAfterB.chunks_fts === 10 && r.statsAfterB.chunks_vec === 10 && r.statsAfterB.emb_cache === 10, 'a second file adds its own rows (the cache is by hash, per model: 10 here)', r.statsAfterB);
  });

  // ------------------------------------------------------------------------------------------------------------ replace and failure
  await section('replace and failure', async () => {
    const r = await ev(async () => {
      const s = window.T.mem, out = {}; const A = window.T.A, B = window.T.B;
      const oldFile = await s.file.get({ folderId: A, path: 'docs/one.md' });
      // the file changes: chunks a0 and a2 stay as they were, a1 is rewritten, two are new, a3 and a4 are gone
      const kept0 = (await s.emb.lookup({ model: 'm1', hashes: ['a0', 'a2'] }));
      const next = [
        { chunk_index: 0, heading_path: 'Cluny > History', char_start: 0, char_end: 99, page: 1, content_hash: 'a0', text: 'The abbey of Cluny grew rich in the tenth century.', embedding: kept0.a0 },
        { chunk_index: 1, heading_path: 'Cluny > History', char_start: 100, char_end: 190, page: 2, content_hash: 'n1', text: 'Letters of Abbot Hugh, revised.', embedding: window.T.mk(901) },
        { chunk_index: 2, heading_path: 'Cluny > History', char_start: 200, char_end: 299, page: 3, content_hash: 'a2', text: 'A reform of the monastic orders.', embedding: kept0.a2 },
      ];
      out.res = await s.file.replace({ folderId: A, path: 'docs/one.md', size: 2000, mtime: 1730400009999, contentHash: 'file-one-v2', model: 'm1', chunks: next });
      out.file = await s.file.get({ folderId: A, path: 'docs/one.md' });
      out.oldFile = oldFile;
      out.after = await window.T.snap(s);
      out.cons = await window.T.consistent(s);
      out.cacheHashes = (await s.debug.sql({ sql: "select hash from emb_cache where model = 'm1' order by hash" })).map((x) => x.hash);
      out.oldIdsGone = (await s.debug.sql({ sql: 'select count(*) as n from chunks where content_hash in (?, ?)', bind: ['a3', 'a4'] }))[0].n;
      out.romanFolders = (await s.debug.sql({ sql: "select folder_id from chunks_fts where chunks_fts match 'Roman'" })).map((x) => x.folder_id);   // only the copy in the other folder is left
      out.fileB = (await s.file.get({ folderId: B, path: 'docs/copy.md' })).chunkCount; out.fileBFolder = B;
      // a failure after two chunks have been written: the old rows must all be there afterwards
      const base = await window.T.snap(s);
      await s.debug.fail({ after: 2 });
      out.fail = await s.file.replace({ folderId: A, path: 'docs/one.md', size: 3000, mtime: 1730400019999, contentHash: 'file-one-v3', model: 'm1', chunks: window.T.chunks(4, { prefix: 'z', seed0: 700 }) }).then(() => null, (e) => e.code);
      out.afterFail = await window.T.snap(s);
      out.failSame = JSON.stringify(base) === JSON.stringify(out.afterFail);
      // and the same for a file that is new: nothing of it is left
      await s.debug.fail({ after: 1 });
      out.failNew = await s.file.replace({ folderId: A, path: 'docs/brand-new.md', size: 5, mtime: 5, contentHash: 'bn', model: 'm1', chunks: window.T.chunks(3, { prefix: 'y', seed0: 800 }) }).then(() => null, (e) => e.code);
      out.failNewSame = JSON.stringify(base) === JSON.stringify(await window.T.snap(s));
      out.newFile = await s.file.get({ folderId: A, path: 'docs/brand-new.md' });
      // the fault was one shot: the same call now works
      out.retry = await s.file.replace({ folderId: A, path: 'docs/brand-new.md', size: 5, mtime: 5, contentHash: 'bn', model: 'm1', chunks: window.T.chunks(3, { prefix: 'y', seed0: 800 }) });
      // arguments that are wrong are refused before anything is written
      const snap0 = await window.T.snap(s);
      const bads = {};
      const base2 = { folderId: A, path: 'docs/one.md', size: 1, mtime: 1, contentHash: 'x', model: 'm1' };
      const good = () => window.T.chunks(3, { prefix: 'q', seed0: 50 });
      let c = good(); c[2].embedding = window.T.mk(1, 383); bads.shortVector = await s.file.replace({ ...base2, chunks: c }).then(() => null, (e) => e.code + ': ' + e.message);
      c = good(); c[1].embedding = new Float32Array(384).fill(NaN); bads.nan = await s.file.replace({ ...base2, chunks: c }).then(() => null, (e) => e.code);
      c = good(); c[1].text = 5; bads.text = await s.file.replace({ ...base2, chunks: c }).then(() => null, (e) => e.code);
      c = good(); delete c[0].content_hash; bads.hash = await s.file.replace({ ...base2, chunks: c }).then(() => null, (e) => e.code);
      c = good(); delete c[2].char_end; bads.offset = await s.file.replace({ ...base2, chunks: c }).then(() => null, (e) => e.code);
      bads.notArray = await s.file.replace({ ...base2, chunks: 'no' }).then(() => null, (e) => e.code);
      bads.noModel = await s.file.replace({ ...base2, model: undefined, chunks: good() }).then(() => null, (e) => e.code);
      bads.folder = await s.file.replace({ ...base2, folderId: 4242, chunks: good() }).then(() => null, (e) => e.code);
      bads.path = await s.file.replace({ ...base2, path: '', chunks: good() }).then(() => null, (e) => e.code);
      out.bads = bads; out.badsSame = JSON.stringify(snap0) === JSON.stringify(await window.T.snap(s));
      // a file with nothing in it is recorded with no chunks
      out.empty = await s.file.replace({ folderId: A, path: 'docs/empty.pdf', size: 10, mtime: 10, contentHash: 'e', chunks: [] });
      out.emptyFile = await s.file.get({ folderId: A, path: 'docs/empty.pdf' });
      return out;
    });
    ok(r.res.chunkCount === 3 && r.res.fileId === r.oldFile.id && r.file.size === 2000 && r.file.contentHash === 'file-one-v2' && r.file.chunkCount === 3 && r.file.id === r.oldFile.id, 'replacing a file keeps its id and gives it the new size, hash and chunk count', { res: r.res, file: r.file });
    ok(r.after.stats.chunks === 8 && r.after.stats.chunks_fts === 8 && r.after.stats.chunks_vec === 8 && r.cons.sameFts && r.cons.sameVec && r.cons.countsRight && r.oldIdsGone === 0 && sameJSON(r.romanFolders, [r.fileBFolder]), 'the old chunks left every table (rows, FTS5, vec0) and the new ones are there: 3 + 5 in the other folder', { stats: r.after.stats, oldIdsGone: r.oldIdsGone, roman: r.romanFolders });
    ok(r.fileB === 5 && r.after.chunks.filter((c) => c.file_path === 'docs/copy.md').length === 5, 'the other folder\'s file is untouched', r.fileB);
    ok(sameJSON(r.cacheHashes, ['a0', 'a2', 'b0', 'b1', 'b2', 'b3', 'b4', 'n1']), 'the cache keeps the hashes in use, adds the new one and drops the ones only the old version had (a1, a3, a4)', r.cacheHashes);
    ok(r.fail === 'INJECTED' && r.failSame, 'a failure after two chunks of four: the replace is refused and every table is exactly as it was (chunks, FTS, vectors, files, cache)', { fail: r.fail, same: r.failSame });
    ok(r.failNew === 'INJECTED' && r.failNewSame && r.newFile === null, 'a failure while a new file is added leaves no trace of it either', { failNew: r.failNew, same: r.failNewSame });
    ok(r.retry.chunkCount === 3, 'the injected failure was a single shot: the same call then works', r.retry);
    ok(r.badsSame && Object.values(r.bads).every((v) => typeof v === 'string' && v.length), 'wrong arguments (short vector, NaN, text, hash, offsets, chunks, model, unknown folder, empty path) are all refused and nothing is written', r.bads);
    ok(/383 values, this index holds 384/.test(r.bads.shortVector), 'the message for a vector of the wrong length says what was sent and what the index holds', r.bads.shortVector);
    ok(r.empty.chunkCount === 0 && r.emptyFile.chunkCount === 0, 'a file with no text is recorded with no chunks', r.emptyFile);
  });

  // ------------------------------------------------------------------------------------------------------------ delete and remove
  await section('delete and remove', async () => {
    const r = await ev(async () => {
      const s = window.T.mem, out = {}; const A = window.T.A, B = window.T.B;
      const rowsOf = async (fileId) => {
        const ids = (await s.debug.sql({ sql: 'select id from chunks where file_id = ?', bind: [fileId] })).map((x) => x.id);
        const inList = JSON.stringify(ids);
        return { chunks: ids.length, fts: (await s.debug.sql({ sql: 'select count(*) as n from chunks_fts where rowid in (select value from json_each(?))', bind: [inList] }))[0].n, vec: (await s.debug.sql({ sql: 'select count(*) as n from chunks_vec where rowid in (select value from json_each(?))', bind: [inList] }))[0].n };
      };
      // two files that share one chunk (the same hash): the shared vector stays until the last file using it goes
      const shared = (i) => ({ chunk_index: 0, heading_path: '', char_start: 0, char_end: 5, page: null, content_hash: 'SHARED', text: 'shared chunk', embedding: window.T.mk(5000) });
      const own = (name, seed) => ({ chunk_index: 1, heading_path: '', char_start: 6, char_end: 12, page: null, content_hash: 'own-' + name, text: 'own chunk ' + name, embedding: window.T.mk(seed) });
      const rx = await s.file.replace({ folderId: A, path: 'x.md', size: 1, mtime: 1, contentHash: 'x', model: 'm1', chunks: [shared(), own('x', 5001)] });
      const ry = await s.file.replace({ folderId: A, path: 'y.md', size: 1, mtime: 1, contentHash: 'y', model: 'm1', chunks: [shared(), own('y', 5002)] });
      out.before = await rowsOf(rx.fileId);
      const hashes = async () => (await s.debug.sql({ sql: "select hash from emb_cache where hash like 'SHARED' or hash like 'own-%' order by hash" })).map((x) => x.hash);
      out.hashes0 = await hashes();
      out.delX = await s.file.delete({ folderId: A, path: 'x.md' });
      out.afterX = await rowsOf(rx.fileId); out.fileX = await s.file.get({ folderId: A, path: 'x.md' });
      out.hashes1 = await hashes();
      out.delAgain = await s.file.delete({ folderId: A, path: 'x.md' });
      out.delY = await s.file.delete({ folderId: A, path: 'y.md' });
      out.hashes2 = await hashes();
      out.consAfterFiles = await window.T.consistent(s);
      // folder.remove: everything of folder A, nothing of folder B
      const snapB = (snap) => ({ chunks: snap.chunks.filter((c) => c.folder_id === B), fts: snap.fts.filter((c) => c.folder_id === B), vec: snap.vec.filter((v) => v[1] === B), files: snap.files.filter((f) => f.folder_id === B) });
      const pre = await window.T.snap(s);
      out.preA = { files: pre.files.filter((f) => f.folder_id === A).length, chunks: pre.chunks.filter((c) => c.folder_id === A).length };
      out.rm = await s.folder.remove({ folderId: A });
      const post = await window.T.snap(s);
      out.postA = { files: post.files.filter((f) => f.folder_id === A).length, chunks: post.chunks.filter((c) => c.folder_id === A).length, fts: post.fts.filter((c) => c.folder_id === A).length, vec: post.vec.filter((v) => v[1] === A).length };
      out.bSame = JSON.stringify(snapB(pre)) === JSON.stringify(snapB(post));
      out.folders = (await s.folder.list()).map((f) => f.id);
      out.aclA = (await s.debug.sql({ sql: 'select count(*) as n from folder_acl where folder_id = ?', bind: [A] }))[0].n;
      out.allowedMe = await s.acl.allowed({ principalId: window.T.me });
      out.cons = await window.T.consistent(s);
      out.cacheLeft = (await s.debug.sql({ sql: "select hash from emb_cache where model = 'm1' order by hash" })).map((x) => x.hash);
      out.knnA = (await s.debug.sql({ sql: 'select rowid from chunks_vec where embedding match ? and k = 10 and folder_id in (select value from json_each(?))', bind: [window.T.bytes(window.T.mk(100)), JSON.stringify([A])] })).length;
      out.knnB = (await s.debug.sql({ sql: 'select rowid from chunks_vec where embedding match ? and k = 10 and folder_id in (select value from json_each(?))', bind: [window.T.bytes(window.T.mk(100)), JSON.stringify([B])] })).length;
      out.rmAgain = await s.folder.remove({ folderId: A });
      // and then the other folder: nothing is left in any table but the two users and the version
      out.rmB = await s.folder.remove({ folderId: B });
      out.final = await s.stats();
      return out;
    });
    ok(r.before.chunks === 2 && r.before.fts === 2 && r.before.vec === 2, 'the file to delete has 2 chunks in chunks, chunks_fts and chunks_vec', r.before);
    ok(r.delX.deleted === true && r.delX.chunkCount === 2 && r.afterX.chunks === 0 && r.afterX.fts === 0 && r.afterX.vec === 0 && r.fileX === null, 'file.delete removes the file row, its chunks, its FTS5 rows and its vectors', { del: r.delX, after: r.afterX });
    ok(sameJSON(r.hashes0, ['SHARED', 'own-x', 'own-y']) && sameJSON(r.hashes1, ['SHARED', 'own-y']) && sameJSON(r.hashes2, []), 'the cache loses what only the deleted file used (own-x), keeps what another file still uses (SHARED), and loses it with the last file', { h0: r.hashes0, h1: r.hashes1, h2: r.hashes2 });
    ok(r.delAgain.deleted === false && r.delAgain.chunkCount === 0 && r.delY.deleted === true && r.consAfterFiles.sameFts && r.consAfterFiles.sameVec && r.consAfterFiles.countsRight, 'deleting a file that is not there deletes nothing; the tables stay consistent', { again: r.delAgain, cons: r.consAfterFiles });
    ok(r.rm.removed === true && r.rm.files === r.preA.files && r.rm.chunks === r.preA.chunks && r.postA.files === 0 && r.postA.chunks === 0 && r.postA.fts === 0 && r.postA.vec === 0, 'folder.remove removes the folder\'s files, chunks, FTS5 rows and vectors', { rm: r.rm, pre: r.preA, post: r.postA });
    ok(r.bSame && r.knnB > 0 && r.knnA === 0 && !r.folders.includes(1) && r.aclA === 0 && r.allowedMe.length === 0, 'the other folder is untouched and still searchable; the removed folder is gone from folders and folder_acl', { bSame: r.bSame, knnA: r.knnA, knnB: r.knnB, folders: r.folders, aclA: r.aclA, allowedMe: r.allowedMe });
    ok(r.cons.sameFts && r.cons.sameVec && r.cons.countsRight && r.cons.folderRight, 'after folder.remove the chunk tables are still consistent', r.cons);
    ok(r.cacheLeft.every((h) => /^b\d$/.test(h)) && r.cacheLeft.length === 5, 'the cache entries of the removed folder are gone (only the other folder\'s five remain)', r.cacheLeft);
    ok(r.rmAgain.removed === false && r.rmB.removed === true, 'removing a folder twice removes it once', { again: r.rmAgain, b: r.rmB });
    ok(sameJSON(r.final, { meta: 1, principals: 2, folders: 0, folder_acl: 0, files: 0, chunks: 0, chunks_fts: 0, chunks_vec: 0, emb_cache: 0 }), 'with every folder removed, nothing is left in any table but the version and the two users', r.final);
  });

  // ------------------------------------------------------------------------------------------------------------ embedding cache
  await section('embedding cache', async () => {
    const r = await ev(async () => {
      const s = window.T.mem, out = {};
      const v1 = window.T.mk(7001), v2 = window.T.mk(7002), v3 = window.T.mk(7003);
      const k1 = v1.slice(), k2 = v2.slice(), k3 = v3.slice();
      out.put = await s.emb.put({ model: 'm1', items: [{ hash: 'x1', embedding: v1 }, { hash: 'x2', embedding: v2 }] });
      out.put2 = await s.emb.put({ model: 'm2', items: [{ hash: 'x1', embedding: v3 }] });
      const got = await s.emb.lookup({ model: 'm1', hashes: ['x1', 'x2', 'nope'] });
      out.keys = Object.keys(got).sort(); out.types = Object.values(got).map((g) => g instanceof Float32Array && g.length === 384 && g.buffer.byteLength === 1536);
      out.same1 = window.T.fnv(window.T.bytes(got.x1)) === window.T.fnv(window.T.bytes(k1)) && window.T.fnv(window.T.bytes(got.x2)) === window.T.fnv(window.T.bytes(k2));
      const other = await s.emb.lookup({ model: 'm2', hashes: ['x1', 'x2'] });
      out.m2keys = Object.keys(other); out.m2same = window.T.fnv(window.T.bytes(other.x1)) === window.T.fnv(window.T.bytes(k3));
      out.none = await s.emb.lookup({ model: 'm3', hashes: ['x1'] }); out.emptyList = await s.emb.lookup({ model: 'm1', hashes: [] });
      await s.emb.put({ model: 'm1', items: [{ hash: 'x1', embedding: k3.slice() }] });
      out.replaced = window.T.fnv(window.T.bytes((await s.emb.lookup({ model: 'm1', hashes: ['x1'] })).x1)) === window.T.fnv(window.T.bytes(k3));
      out.badPut = await s.emb.put({ model: 'm1', items: [{ hash: 'bad', embedding: new Float32Array(10) }] }).then(() => null, (e) => e.code);
      // the indexer's way: a file changes, the unchanged chunks are looked up by hash, only the new one is embedded
      const F = (await s.folder.add({ name: 'Cache', path: '/cache' })).id;
      const v0 = window.T.chunks(4, { prefix: 'c', seed0: 300 }); const keep = v0.map((c) => c.embedding.slice());
      await s.file.replace({ folderId: F, path: 'f.md', size: 1, mtime: 1, contentHash: 'f1', model: 'm1', chunks: v0 });
      const want = ['c0', 'c1', 'c2', 'c3'];
      const hit = await s.emb.lookup({ model: 'm1', hashes: want.concat(['c-new']) });
      out.hit = Object.keys(hit).sort();
      out.hitSame = want.every((h, i) => window.T.fnv(window.T.bytes(hit[h])) === window.T.fnv(window.T.bytes(keep[i])));
      const stored = await s.debug.sql({ sql: 'select embedding from chunks_vec order by rowid' });
      out.hitIsStored = stored.every((r2, i) => window.T.fnv(r2.embedding) === window.T.fnv(window.T.bytes(keep[i])));
      out.statsBefore = (await s.stats()).emb_cache;
      out.pruned = await s.emb.prune();
      out.after = (await s.debug.sql({ sql: 'select model, hash from emb_cache order by hash' })).map((x) => x.model + ':' + x.hash);
      return out;
    });
    ok(r.put.stored === 2 && sameJSON(r.keys, ['x1', 'x2']) && r.types.every(Boolean) && r.same1, 'emb.put then emb.lookup gives back the very same vectors (Float32Array of 384 with its own buffer); a hash that is not there is not in the answer', { keys: r.keys });
    ok(sameJSON(r.m2keys, ['x1']) && r.m2same && Object.keys(r.none).length === 0 && Object.keys(r.emptyList).length === 0, 'the cache is per model: another model\'s vector for the same hash is separate; an unknown model or an empty list finds nothing', { m2keys: r.m2keys });
    ok(r.replaced && r.badPut === 'BAD_ARGS', 'putting a hash again replaces it; a vector of the wrong length is refused', { replaced: r.replaced, badPut: r.badPut });
    ok(sameJSON(r.hit, ['c0', 'c1', 'c2', 'c3']) && r.hitSame && r.hitIsStored, 'file.replace fills the cache: the chunks of a changed file are found by hash and are the vectors stored in chunks_vec, so only a new chunk needs the model', { hit: r.hit });
    ok(r.pruned.removed === r.statsBefore - 4 && sameJSON(r.after, ['m1:c0', 'm1:c1', 'm1:c2', 'm1:c3']), 'emb.prune drops every entry that no chunk uses', { pruned: r.pruned, after: r.after });
  });

  // ------------------------------------------------------------------------------------------------------------ transfer and arguments
  await section('transfer and arguments', async () => {
    const r = await ev(async () => {
      const s = RagHarness.makeStore(); const out = {};
      await s.open({ vfs: 'memory' });
      const F = (await s.folder.add({ name: 'T', path: '/t' })).id;
      // a vector that is a view of a larger buffer is copied, not taken; transfer: false keeps the caller's arrays
      const base = window.T.mk(1); const big = new Float32Array(384 * 3); for (let i = 0; i < big.length; i++) big[i] = base[i % 384];
      const views = [0, 1, 2].map((i) => big.subarray(i * 384, (i + 1) * 384));
      const mk = (embs, prefix) => embs.map((e, i) => ({ chunk_index: i, heading_path: '', char_start: 0, char_end: 1, page: null, content_hash: prefix + i, text: 't' + i, embedding: e }));
      out.viewRes = await s.file.replace({ folderId: F, path: 'v.md', size: 1, mtime: 1, contentHash: 'v', model: 'm', chunks: mk(views, 'v') });
      out.viewsKept = big.length === 1152 && views.every((v) => v.length === 384);
      const own = [window.T.mk(11), window.T.mk(12)];
      await s.file.replace({ folderId: F, path: 'o.md', size: 1, mtime: 1, contentHash: 'o', model: 'm', chunks: mk(own, 'o') }, { transfer: false });
      out.keptWithFalse = own.every((v) => v.length === 384);
      // plain arrays of numbers, and the bytes of a Float32Array, are taken too
      const plain = Array.from(window.T.mk(13)); const raw = window.T.bytes(window.T.mk(14).slice());
      out.mixed = await s.file.replace({ folderId: F, path: 'm.md', size: 1, mtime: 1, contentHash: 'm', model: 'm', chunks: mk([plain, raw.slice()], 'm') }).then((x) => x.chunkCount, (e) => e.code + ' ' + e.message);
      out.stored = (await s.debug.rows({ table: 'chunks_vec' })).length;
      // the select-only debug call refuses everything else
      out.sql = await s.debug.sql({ sql: 'delete from principals' }).then(() => null, (e) => e.code);
      out.sql2 = await s.debug.sql({ sql: 'select 1; select 2' }).then(() => null, (e) => e.code);
      out.table = await s.debug.rows({ table: 'users; drop table files' }).then(() => null, (e) => e.code);
      s.terminate();
      out.afterTerminate = await s.stats().then(() => 'answered', (e) => e.code || e.message);
      return out;
    });
    ok(r.viewRes.chunkCount === 3 && r.viewsKept, 'a vector that is only a view of a bigger buffer is copied, not transferred (the caller keeps its arrays)', r);
    ok(r.keptWithFalse, '{ transfer: false } keeps the caller\'s arrays', r.keptWithFalse);
    ok(r.mixed === 2 && r.stored === 7, 'embeddings may also be plain arrays of numbers or the bytes of a Float32Array', { mixed: r.mixed, stored: r.stored });
    ok(r.sql === 'BAD_ARGS' && r.sql2 === 'BAD_ARGS' && r.table === 'BAD_ARGS', 'the test-only calls take one select and known tables only', { sql: r.sql, sql2: r.sql2, table: r.table });
    ok(r.afterTerminate === 'NOT_OPEN' || r.afterTerminate !== 'answered', 'after terminate() a call starts a fresh worker (which has nothing open) instead of hanging', r.afterTerminate);
  });

  // ------------------------------------------------------------------------------------------------------------ dims
  await section('dims', async () => {
    const r = await ev(async () => {
      const s = RagHarness.makeStore(); const out = {};
      out.open = await s.open({ vfs: 'memory', dims: 768 });
      out.bad = await s.open({ vfs: 'memory', dims: 99999 }).then(() => null, (e) => e.code);
      const F = (await s.folder.add({ name: 'Big', path: '/big' })).id;
      out.ok768 = await s.file.replace({ folderId: F, path: 'a.md', size: 1, mtime: 1, contentHash: 'a', model: 'bge-base', chunks: window.T.chunks(3, { dims: 768, seed0: 1 }) }).then((x) => x.chunkCount, (e) => e.message);
      out.no384 = await s.file.replace({ folderId: F, path: 'b.md', size: 1, mtime: 1, contentHash: 'b', model: 'bge-base', chunks: window.T.chunks(1, { dims: 384 }) }).then(() => null, (e) => e.message);
      out.sql = (await s.debug.sql({ sql: "select sql from sqlite_master where name = 'chunks_vec'" }))[0].sql;
      out.vlen = (await s.debug.rows({ table: 'chunks_vec' })).map((x) => x.dims);
      const q = window.T.mk(2, 768);
      out.knn = (await s.debug.sql({ sql: 'select rowid, distance from chunks_vec where embedding match ? and k = 3 and folder_id in (select value from json_each(?)) order by distance', bind: [window.T.bytes(q), JSON.stringify([F])] })).map((x) => x.rowid);
      out.info = await s.info();
      const lookup = await s.emb.lookup({ model: 'bge-base', hashes: ['h1'] });
      out.cached = lookup.h1 && lookup.h1.length;
      return out;
    });
    ok(r.open.dims === 768 && r.info.dims === 768 && r.bad === 'BAD_ARGS', 'open({dims: 768}) makes an index of 768-value vectors (for a larger model); an absurd length is refused', { dims: r.open.dims, bad: r.bad });
    ok(r.ok768 === 3 && /float\[768\]/.test(r.sql) && r.vlen.length === 3 && r.vlen.every((d) => d === 768) && r.knn.length === 3 && r.knn[0] === 2 && r.cached === 768, 'it takes vectors of 768, stores them, finds them by nearest neighbour, and the cache holds them too', { ok768: r.ok768, knn: r.knn, cached: r.cached });
    ok(typeof r.no384 === 'string' && /384 values, this index holds 768/.test(r.no384), 'a vector of 384 is refused by an index of 768, saying so', r.no384);
  });

  // ------------------------------------------------------------------------------------------------------------ size estimate
  await section('size estimate', async () => {
    const r = await ev(async () => {
      let rs = 777; const rnd = () => { rs = (Math.imul(rs, 1664525) + 1013904223) >>> 0; return rs / 4294967296; };
      const word = () => 'w' + Math.floor(4000 * rnd() ** 3).toString(36) + 'ing';
      const text = (n) => { let t = ''; while (t.length < n) t += word() + ' '; return t; };
      const est = window.RagHarness.store.estimateIndexBytes;
      const out = { est384: est({ chunks: 1000 }), est768: est({ chunks: 1000, dims: 768 }), est1024: est({ chunks: 1000, dims: 1024 }), est512: est({ chunks: 1000, dims: 512 }) };
      const s = RagHarness.makeStore(); await s.open({ vfs: 'memory' });
      const F = (await s.folder.add({ name: 'e', path: '/e' })).id;
      const chunks = Array.from({ length: 2048 }, (_, i) => ({ chunk_index: i, heading_path: 'S ' + (i % 9), char_start: 0, char_end: 1, page: null, content_hash: 'e' + i, text: text(1800), embedding: window.T.mk(i) }));
      const b0 = (await s.info()).bytes;
      await s.file.replace({ folderId: F, path: 'e.txt', size: 1, mtime: 1, contentHash: 'e', model: 'm', chunks });
      out.measured = (await s.info()).bytes - b0; out.predicted = est({ chunks: 2048, folders: 1 }) ;
      s.terminate();
      return out;
    });
    ok(r.est384 < r.est512 && r.est512 < r.est768 && r.est768 < r.est1024 && r.est768 / r.est384 > 1.3 && r.est768 / r.est384 < 1.6, 'estimateIndexBytes grows with the vector length (768 about 1.5 times 384)', r);
    ok(Math.abs(r.measured - r.predicted) / r.measured < 0.3, 'estimateIndexBytes is within 30% of a measured index of 2,048 chunks of 1,800 characters (' + (r.measured / 1048576).toFixed(1) + ' MB measured, ' + (r.predicted / 1048576).toFixed(1) + ' MB estimated)', { measured: r.measured, predicted: r.predicted });
  });

  // ------------------------------------------------------------------------------------------------------------ OPFS reload
  await section('OPFS reload', async () => {
    const r1 = await ev(async () => {
      const out = {};
      const names = async () => { const l = []; for await (const [n] of await navigator.storage.getDirectory()) l.push(n); return l.sort(); };
      out.before = await names();
      const s = RagHarness.makeStore(); window.T.o1 = s;
      const t0 = performance.now();
      out.open = await s.open({});
      out.openMs = Math.round(performance.now() - t0);
      out.after = await names();
      const me = (await s.principal.ensure({ name: 'me' })).id;
      const F = (await s.folder.add({ name: 'Persisted', path: '/persisted' })).id; await s.acl.grant({ folderId: F, principalId: me });
      const texts = Array.from({ length: 40 }, (_, i) => 'persisted chunk ' + i + (i % 7 === 0 ? ' abbey' : ''));
      out.rep = await s.file.replace({ folderId: F, path: 'p.md', size: 4000, mtime: 1730400000555, contentHash: 'pp', model: 'm1', chunks: window.T.chunks(40, { prefix: 'p', seed0: 2000, texts }) });
      await s.folder.touch({ folderId: F, indexedAt: 1730400100000 });
      out.stats = await s.stats(); out.F = F; out.me = me;
      out.knn = (await s.debug.sql({ sql: 'select rowid from chunks_vec where embedding match ? and k = 5 and folder_id in (select value from json_each(?)) order by distance', bind: [window.T.bytes(window.T.mk(2000 + 17)), JSON.stringify([F])] })).map((x) => x.rowid);
      out.snap = JSON.stringify(await window.T.snap(s));
      const inf = await s.info(); out.bytes = inf.bytes; out.persisted = inf.persisted; out.storage = inf.storage;
      // the worker is stopped (as a closed window would): the next store must get the files back
      s.terminate();
      const s2 = RagHarness.makeStore(); const t1 = performance.now();
      out.open2 = await s2.open({}); out.reopenMs = Math.round(performance.now() - t1);
      out.stats2 = await s2.stats();
      out.snapSame = JSON.stringify(await window.T.snap(s2)) === out.snap;
      out.knn2 = (await s2.debug.sql({ sql: 'select rowid from chunks_vec where embedding match ? and k = 5 and folder_id in (select value from json_each(?)) order by distance', bind: [window.T.bytes(window.T.mk(2000 + 17)), JSON.stringify([F])] })).map((x) => x.rowid);
      out.meta = await s2.debug.sql({ sql: 'select key, value from meta' });
      out.integrity = (await s2.debug.sql({ sql: 'select integrity_check as r from pragma_integrity_check' })).map((x) => x.r);
      out.fk = (await s2.debug.sql({ sql: 'select foreign_keys as v from pragma_foreign_keys' }))[0].v;
      out.folders = await s2.folder.list({ principalId: me });
      window.T.o2 = s2;
      return out;
    });
    ok(!r1.before.some((n) => /ingenium/i.test(n)) && r1.after.some((n) => n === '.ingenium-rag'), 'opening in OPFS creates the pool directory .ingenium-rag (and memory mode had not)', { before: r1.before, after: r1.after });
    ok(r1.open.schemaVersion === 2 && r1.open.vfs === 'opfs-sahpool' && r1.open.sqlite === '3.45.3' && r1.open.dbName === 'rag.sqlite3' && r1.rep.chunkCount === 40, 'open() in OPFS: {schemaVersion: 1, vfs: opfs-sahpool}; 40 chunks written', { open: r1.open, openMs: r1.openMs });
    ok(typeof r1.persisted === 'boolean' && r1.storage && r1.storage.quota > 1e8 && r1.storage.usage >= 0, 'info() tells whether the browser keeps this origin\'s storage (persisted) and how much it will allow (storage.quota)', { persisted: r1.persisted, storage: r1.storage });
    ok(r1.snapSame && sameJSON(r1.stats2, r1.stats) && r1.stats2.chunks === 40 && sameJSON(r1.knn2, r1.knn) && r1.knn[0] === 18, 'a new worker on the same database (the first one stopped) finds every row again: same snapshot of all tables, same nearest neighbours', { reopenMs: r1.reopenMs, stats: r1.stats2, knn: r1.knn2 });
    ok(r1.open2.schemaVersion === 2 && sameJSON(r1.meta, [{ key: 'schema_version', value: '2' }]) && r1.integrity.length === 1 && r1.integrity[0] === 'ok' && r1.fk === 1, 'migrations re-run safely: the reopened database is still version 1 with one meta row, passes integrity_check, and has foreign keys on again', { meta: r1.meta, integrity: r1.integrity, fk: r1.fk });
    ok(r1.folders.length === 1 && r1.folders[0].lastIndexedAt === 1730400100000 && r1.folders[0].fileCount === 1 && r1.folders[0].chunkCount === 40, 'folders, the ACL row, last_indexed_at and the counts survive', r1.folders);

    // a reload of the page: everything starts again, the data stays
    await load();
    const r2 = await ev(async (prev) => {
      const out = {};
      const s = RagHarness.makeStore(); window.T.o3 = s;
      const t0 = performance.now(); out.open = await s.open({}); out.ms = Math.round(performance.now() - t0);
      out.stats = await s.stats();
      out.snapSame = JSON.stringify(await window.T.snap(s)) === prev.snap;
      out.me = (await s.principal.ensure({ name: 'me' })).id;
      out.allowed = await s.acl.allowed({ principalId: out.me });
      // writes go on after the reload, and the next reload sees them
      out.rep = await s.file.replace({ folderId: prev.F, path: 'second.md', size: 10, mtime: 10, contentHash: 'sec', model: 'm1', chunks: window.T.chunks(5, { prefix: 's', seed0: 3000 }) });
      out.stats2 = await s.stats();
      return out;
    }, { snap: r1.snap, F: r1.F });
    ok(r2.open.schemaVersion === 2 && r2.snapSame && r2.stats.chunks === 40 && r2.me === r1.me && sameJSON(r2.allowed, [r1.F]), 'after page.reload() the database is there: the same snapshot of all tables, the same user and ACL', { open: r2.open, ms: r2.ms, stats: r2.stats });
    await load();
    const r3 = await ev(async () => {
      const s = RagHarness.makeStore(); await s.open({});
      return { stats: await s.stats(), files: (await s.file.list({ folderId: 1 })).map((f) => f.path) };
    });
    ok(r3.stats.chunks === 45 && r3.stats.files === 2 && sameJSON(r3.files, ['p.md', 'second.md']), 'a write made after the first reload is there after the second', r3);
  });

  // ------------------------------------------------------------------------------------------------------------ second window
  await section('second window', async () => {
    await load();   // stops every worker of the sections before, so only this section's first store holds the files
    const r = await ev(async () => {
      const out = {};
      const s1 = RagHarness.makeStore(); await s1.open({});
      const before = JSON.stringify(await window.T.snap(s1));
      const s2 = RagHarness.makeStore(); const t0 = performance.now();
      out.err = await s2.open({ lockWaitMs: 700 }).then(() => null, (e) => ({ code: e.code, message: e.message }));
      out.ms = Math.round(performance.now() - t0);
      out.stillSame = JSON.stringify(await window.T.snap(s1)) === before;
      out.write = await s1.file.replace({ folderId: 1, path: 'third.md', size: 1, mtime: 1, contentHash: 't3', model: 'm1', chunks: window.T.chunks(2, { prefix: 't', seed0: 4000 }) }).then((x) => x.chunkCount, (e) => e.message);
      out.mem = await RagHarness.makeStore().open({ vfs: 'memory', dbName: 'mem.sqlite3' }).then((x) => x.vfs, (e) => e.code);
      s2.terminate();
      out.final = JSON.stringify(await window.T.snap(s1)); out.stats = await s1.stats();
      window.T.s1 = s1;
      return out;
    });
    ok(r.err && r.err.code === 'OPFS_LOCKED' && /another window/i.test(r.err.message) && r.ms >= 600 && r.ms < 8000, 'a second worker on the same OPFS files waits, then says OPFS_LOCKED (it never calls the file system installer that would delete them)', { err: r.err, ms: r.ms });
    ok(r.stillSame && r.write === 2 && r.stats.chunks === 47, 'the first window is unharmed: same data after the attempt, and it can still write', { stillSame: r.stillSame, write: r.write, stats: r.stats });
    ok(r.mem === 'memory', 'a memory store still opens beside it', r.mem);
    await load();
    const r2 = await ev(async () => { const s = RagHarness.makeStore(); await s.open({}); return { stats: await s.stats(), files: (await s.file.list({ folderId: 1 })).map((f) => f.path) }; });
    ok(r2.stats.chunks === 47 && sameJSON(r2.files, ['p.md', 'second.md', 'third.md']), 'and after a reload the data is all there (nothing was lost to the failed attempt)', r2);
  });

  // ------------------------------------------------------------------------------------------------------------ dims on a stored index, volume
  await section('OPFS volume', async () => {
    await load();
    const r = await ev(async () => {
      const out = {};
      // the open index holds 384-value vectors: asking for 768 is refused, asking for nothing is fine
      const s = RagHarness.makeStore();
      out.mismatch = await s.open({ dims: 768 }).then(() => null, (e) => ({ code: e.code, message: e.message }));
      out.open = await s.open({});
      out.open384 = await s.open({ dims: 384 }).then((x) => x.dims, (e) => e.code);
      // a big file: 400 chunks of about 1.8 kB in one transaction
      const para = 'The monastic houses of the Cluniac congregation kept letters, charters and rents. '.repeat(22);
      const texts = Array.from({ length: 400 }, (_, i) => para + ' item ' + i);
      const V = (await s.folder.add({ name: 'Volume', path: '/volume' })).id;
      const W = (await s.folder.add({ name: 'Warm', path: '/warm' })).id;   // added after it, so removing Volume leaves it a folder with a newer vector block
      const mk = () => window.T.chunks(400, { prefix: 'big', seed0: 10000, texts });
      let t0 = performance.now(); out.rep1 = await s.file.replace({ folderId: V, path: 'big.txt', size: 720000, mtime: 1, contentHash: 'big1', model: 'm1', chunks: mk() }); out.ms1 = Math.round(performance.now() - t0);
      t0 = performance.now(); out.rep2 = await s.file.replace({ folderId: V, path: 'big.txt', size: 720001, mtime: 2, contentHash: 'big2', model: 'm1', chunks: mk() }); out.ms2 = Math.round(performance.now() - t0);
      await s.file.replace({ folderId: W, path: 'w.md', size: 1, mtime: 1, contentHash: 'w', model: 'm1', chunks: window.T.chunks(30, { prefix: 'w', seed0: 50000 }) });
      out.cons = await window.T.consistent(s);
      out.knn = (await s.debug.sql({ sql: 'select rowid, distance from chunks_vec where embedding match ? and k = 3 and folder_id in (select value from json_each(?)) order by distance', bind: [window.T.bytes(window.T.mk(10000 + 123)), JSON.stringify([V])] })).map((x) => [x.rowid, Math.round(x.distance * 1e5) / 1e5]);
      out.row123 = (await s.debug.sql({ sql: 'select id from chunks where content_hash = ? and file_path = ?', bind: ['big123', 'big.txt'] }))[0].id;
      const knnOf = async (seed, folder) => (await s.debug.sql({ sql: 'select rowid, distance from chunks_vec where embedding match ? and k = 3 and folder_id in (select value from json_each(?)) order by distance', bind: [window.T.bytes(window.T.mk(seed)), JSON.stringify([folder])] })).map((x) => x.distance);
      const blocks = async () => (await s.debug.sql({ sql: 'select count(*) as n from chunks_vec_chunks' }))[0].n;
      out.blocks0 = await blocks();
      const infoBefore = await s.info();
      t0 = performance.now(); out.rm = await s.folder.remove({ folderId: V }); out.msRm = Math.round(performance.now() - t0);
      const infoAfter = await s.info();
      out.bytes = [infoBefore.bytes, infoAfter.bytes];
      out.cons2 = await window.T.consistent(s);
      out.stats = await s.stats();
      const snapKeep = JSON.stringify(await window.T.snap(s));
      t0 = performance.now(); out.compact = await s.compact(); out.msCompact = Math.round(performance.now() - t0);
      out.compactSame = JSON.stringify(await window.T.snap(s)) === snapKeep;
      out.integrity = (await s.debug.sql({ sql: 'select integrity_check as r from pragma_integrity_check' })).map((x) => x.r);
      out.knnKept = (await knnOf(4000, 1)).length; out.knnW = (await knnOf(50007, W));
      out.blocks1 = await blocks();
      out.compactAgain = await s.compact();
      // a folder added after that works (its block is numbered after the one that was deleted)
      const X = (await s.folder.add({ name: 'After', path: '/after' })).id;
      out.addX = (await s.file.replace({ folderId: X, path: 'x.md', size: 1, mtime: 1, contentHash: 'x', model: 'm1', chunks: window.T.chunks(30, { prefix: 'x', seed0: 60000 }) })).chunkCount;
      out.knnX = await knnOf(60007, X);
      // the newest folder is removed: its block waits (and the next folder takes the same id and the same block)
      await s.folder.remove({ folderId: X });
      out.compactTail = await s.compact();
      const Y = (await s.folder.add({ name: 'Again', path: '/again' })).id;
      out.addY = (await s.file.replace({ folderId: Y, path: 'y.md', size: 1, mtime: 1, contentHash: 'y', model: 'm1', chunks: window.T.chunks(30, { prefix: 'y', seed0: 70000 }) })).chunkCount;
      out.knnY = await knnOf(70007, Y); out.sameId = (Y === X);
      out.consFinal = await window.T.consistent(s);
      out.integrityFinal = (await s.debug.sql({ sql: 'select integrity_check as r from pragma_integrity_check' })).map((x) => x.r);
      out.statsFinal = await s.stats();
      return out;
    });
    ok(r.mismatch && r.mismatch.code === 'DIMS_MISMATCH' && /384/.test(r.mismatch.message) && /768/.test(r.mismatch.message) && r.open.dims === 384 && r.open384 === 384, 'an index of 384 refuses open({dims: 768}) (DIMS_MISMATCH, naming both) and does not break the worker; open() and open({dims: 384}) are fine', { mismatch: r.mismatch, open384: r.open384 });
    ok(r.rep1.chunkCount === 400 && r.rep2.chunkCount === 400 && r.rep2.fileId === r.rep1.fileId && r.cons.sameFts && r.cons.sameVec && r.cons.countsRight && r.cons.ids >= 430, 'a 400-chunk file is written, and written again over itself, in one transaction each', { ms: [r.ms1, r.ms2], cons: r.cons });
    ok(r.knn.length === 3 && r.knn[0][0] === r.row123 && r.knn[0][1] < 1e-5, 'KNN finds a chunk of the big file as its own nearest neighbour', r.knn);
    ok(r.rm.removed === true && r.rm.chunks === 400 && r.cons2.ids === r.stats.chunks && r.stats.chunks_vec === r.stats.chunks && r.stats.chunks_fts === r.stats.chunks, 'folder.remove of the big folder takes all 400 rows from all three tables', { rm: r.rm, ms: r.msRm, stats: r.stats });
    ok(r.compact.mode === 'incremental' && r.compact.before === r.bytes[1] && r.bytes[1] - r.compact.after > 2500000 && r.compact.blocks === 1 && r.blocks1 === r.blocks0 - 1 && r.compactSame && r.integrity.length === 1 && r.integrity[0] === 'ok' && r.knnKept === 3 && r.knnW.length === 3 && r.knnW[0] < 1e-5 && r.compactAgain.blocks === 0 && r.compactAgain.after === r.compact.after, 'compact() gives the removed folder back: the free pages and the empty vector block that sqlite-vec leaves (over 2.5 MB here), every row as it was, the other folders found; a second compact finds nothing more', { compact: r.compact, ms: r.msCompact, blocks: [r.blocks0, r.blocks1], again: r.compactAgain });
    ok(r.addX === 30 && r.knnX.length === 3 && r.knnX[0] < 1e-5, 'a folder added after a block was deleted gets a new block and is found (the numbering of the blocks stayed in step)', { addX: r.addX, knnX: r.knnX });
    ok(r.compactTail.blocks === 0 && r.addY === 30 && r.knnY.length === 3 && r.knnY[0] < 1e-5 && r.consFinal.sameFts && r.consFinal.sameVec && r.consFinal.countsRight && r.consFinal.folderRight && r.integrityFinal[0] === 'ok', 'the newest folder is removed: its empty block is kept by compact, the next folder (' + (r.sameId ? 'it takes the same id, so the same partition' : 'a new id') + ') is written and found, and everything stays consistent', { compactTail: r.compactTail, knnY: r.knnY, cons: r.consFinal });
    console.log('INFO  times (OPFS, 400 chunks of 1.8 kB with 384-value vectors): write ' + r.ms1 + ' ms, write over ' + r.ms2 + ' ms, folder.remove ' + r.msRm + ' ms; database ' + (r.bytes[0] / 1048576).toFixed(1) + ' MB with the folder, ' + (r.bytes[1] / 1048576).toFixed(1) + ' MB after removing it, ' + (r.compact.after / 1048576).toFixed(1) + ' MB after compact (' + r.msCompact + ' ms)');
  });

  // ------------------------------------------------------------------------------------------------------------ the end
  const sc = await ev(() => ({ errors: window.RagHarness.errors, workerErrors: window.RagHarness.workerErrors() }));
  // ------------------------------------------------------------------------------------------------------------ nothing left behind (review, 1 November 2026)
  await section('nothing left behind', async () => {
    await load();
    const r = await ev(async () => {
      const out = {};
      const s = RagHarness.makeStore(); await s.open({ vfs: 'memory', dbName: 'left.sqlite3' });
      out.secure = (await s.debug.sql({ sql: 'select secure_delete as v from pragma_secure_delete' }))[0].v;
      out.ftsSecure = (await s.debug.sql({ sql: "select v from chunks_fts_config where k = 'secure-delete'" })).map((x) => x.v);
      const A = (await s.folder.add({ name: 'A', path: '/left/a' })).id, B = (await s.folder.add({ name: 'B', path: '/left/b' })).id;
      await s.file.replace({ folderId: A, path: 'a.md', size: 1, mtime: 1, contentHash: 'a', model: 'm', chunks: window.T.chunks(3, { prefix: 'la', seed0: 700, texts: ['secret words one', 'secret words two', 'secret words three'] }) });
      await s.file.replace({ folderId: B, path: 'b.md', size: 1, mtime: 1, contentHash: 'b', model: 'm', chunks: window.T.chunks(2, { prefix: 'lb', seed0: 900 }) });
      // what a stopped reading of A had kept: vectors in the cache that no passage uses yet
      await s.emb.put({ model: 'm', items: [0, 1, 2, 3].map((i) => ({ hash: 'kept' + i, embedding: window.T.mk(800 + i) })) });
      const hex16 = (seed) => Array.from(window.T.bytes(window.T.mk(seed)).slice(0, 16)).map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      const blobs = async () => (await s.debug.sql({ sql: 'select hex(vectors) as h from chunks_vec_vector_chunks00' })).map((x) => x.h);
      out.beforeHas = (await blobs()).some((h) => h.includes(hex16(700)));
      out.rm = await s.folder.remove({ folderId: A, prune: true });
      const after = await blobs();
      out.afterHas = [700, 701, 702].map((sd) => after.some((h) => h.includes(hex16(sd))));
      out.bStill = [900, 901].map((sd) => after.some((h) => h.includes(hex16(sd))));
      out.cache = (await s.debug.sql({ sql: 'select hash from emb_cache order by hash' })).map((x) => x.hash);
      out.fts = (await s.debug.sql({ sql: "select count(*) as n from chunks_fts where chunks_fts match 'secret'" }))[0].n;
      out.cons = await window.T.consistent(s);
      // without prune (another folder was being read): the kept vectors stay until the end of the readings
      await s.emb.put({ model: 'm', items: [{ hash: 'kept-b', embedding: window.T.mk(990) }] });
      out.rmB = await s.folder.remove({ folderId: B });
      out.cacheB = (await s.debug.sql({ sql: 'select hash from emb_cache order by hash' })).map((x) => x.hash);
      out.prune = await s.emb.prune();
      out.final = await s.stats();
      // the tests' own operations are not there for the app (a store made without debug)
      const app = RagHarness.makeStore({ debug: false }); await app.open({ vfs: 'memory', dbName: 'app.sqlite3' });
      out.appOps = (await app.ops()).filter((o) => o.startsWith('debug.'));
      out.appSql = await app.call('debug.sql', { sql: 'select 1' }).then(() => 'answered', (e) => e.code);
      out.appWipe = await app.call('debug.wipe', {}).then(() => 'answered', (e) => e.code);
      out.testOps = (await s.ops()).filter((o) => o.startsWith('debug.')).length;
      app.terminate(); s.terminate();
      return out;
    });
    ok(r.secure === 1 && JSON.stringify(r.ftsSecure) === '[1]', "SQLite overwrites deleted rows (secure_delete on) and FTS5 runs with 'secure-delete' (schema version 2)", { secure: r.secure, fts: r.ftsSecure });
    ok(r.beforeHas === true && r.afterHas.every((x) => x === false) && r.bStill.every((x) => x === true), "a removed folder's vectors are gone from sqlite-vec's own storage (overwritten with zeros first); the other folder's are kept", { before: r.beforeHas, after: r.afterHas, b: r.bStill });
    ok(r.rm.removed === true && r.rm.pruned === 4 && sameJSON(r.cache, ['lb0', 'lb1']), "folder.remove({prune: true}) also drops the cached vectors a stopped reading had kept; the other folder's stay", { rm: r.rm, cache: r.cache });
    ok(r.fts === 0 && r.cons.sameFts && r.cons.sameVec, 'the removed words cannot be found, and the three tables still agree', { fts: r.fts, cons: r.cons });
    ok(r.rmB.pruned === 0 && r.cacheB.includes('kept-b') && r.prune.removed === 1 && r.final.emb_cache === 0 && r.final.chunks === 0, 'without prune the kept vectors wait, and emb.prune clears them after the readings end', { rmB: r.rmB, cacheB: r.cacheB, prune: r.prune, final: r.final });
    ok(r.appOps.length === 0 && r.appSql === 'UNKNOWN_OP' && r.appWipe === 'UNKNOWN_OP' && r.testOps === 5, "the tests' own operations (debug.*) are not served to the app; the harness has them", { appOps: r.appOps, sql: r.appSql, wipe: r.appWipe, testOps: r.testOps });
  });

  // ------------------------------------------------------------------------------------------------------------ a damaged index (review, 1 November 2026)
  await section('damaged index', async () => {
    await load();
    const r = await ev(async () => {
      const out = {}, name = 'dmg-' + Date.now() + '.sqlite3';
      const s = RagHarness.makeStore(); await s.open({ dbName: name });
      const F = (await s.folder.add({ name: 'D', path: '/dmg' })).id;
      await s.file.replace({ folderId: F, path: 'd.md', size: 1, mtime: 1, contentHash: 'd', model: 'm', chunks: window.T.chunks(60, { prefix: 'dm', seed0: 3000 }) });
      out.before = await s.stats();
      s.terminate(); await new Promise((res) => setTimeout(res, 600));
      // overwrite three pages of the database file in the private file system, as a failing disk or a stray program might
      let dir = await navigator.storage.getDirectory();
      dir = await (await dir.getDirectoryHandle('.ingenium-rag')).getDirectoryHandle('.opaque');
      let hit = null;
      for await (const [, h] of dir) {
        if (h.kind !== 'file') continue;
        const head = new TextDecoder().decode(new Uint8Array(await (await h.getFile()).slice(0, 512).arrayBuffer())).split('\0')[0];
        if (head === '/' + name) { hit = h; break; }
      }
      out.found = !!hit;
      if (hit) {
        const w = await hit.createWritable({ keepExistingData: true });
        await w.seek(4096 + 4096 * 2); await w.write(new Uint8Array(4096 * 3).fill(0xAB)); await w.close();
      }
      const s2 = RagHarness.makeStore();
      const tryIt = async (f) => { try { await f(); return 'answered'; } catch (e) { return e.code || e.message; } };
      out.open = await tryIt(() => s2.open({ dbName: name }));
      out.use = out.open === 'answered' ? await tryIt(async () => { await s2.stats(); await s2.file.list({ folderId: F }); await s2.debug.sql({ sql: 'select count(*) as n from pragma_integrity_check' }); }) : out.open;
      out.reset = await s2.reset({ dbName: name }).then((x) => ({ schemaVersion: x.schemaVersion, vfs: x.vfs }), (e) => e.code || e.message);
      out.after = await s2.stats().catch((e) => e.code);
      out.integrity = (await s2.debug.sql({ sql: 'select integrity_check as v from pragma_integrity_check' })).map((x) => x.v);
      out.write = await s2.file.replace({ folderId: (await s2.folder.add({ name: 'D', path: '/dmg' })).id, path: 'd.md', size: 1, mtime: 1, contentHash: 'd', model: 'm', chunks: window.T.chunks(5, { prefix: 'dn', seed0: 3100 }) }).then((x) => x.chunkCount, (e) => e.code);
      s2.terminate();
      return out;
    });
    ok(r.before.chunks === 60 && r.found, 'an index on disk, and its file found in the private file system', { before: r.before, found: r.found });
    ok(r.open === 'CORRUPT' || r.use === 'CORRUPT', 'a damaged index is reported as CORRUPT (the card then offers to start again)', { open: r.open, use: r.use });
    ok(r.reset && r.reset.schemaVersion === 2 && r.after && r.after.chunks === 0 && r.after.folders === 0 && JSON.stringify(r.integrity) === '["ok"]', 'reset starts it again from nothing: an empty index of the current version, integrity ok', { reset: r.reset, after: r.after, integrity: r.integrity });
    ok(r.write === 5, 'and it can be written at once', r.write);
  });

  ok(ran.length === SECTIONS.length && SECTIONS.every((s) => ran.includes(s)), 'every part of this test ran to its end (' + ran.length + ' of ' + SECTIONS.length + ')', { missing: SECTIONS.filter((s) => !ran.includes(s)) });
  ok(pageErrors.length === 0 && sc.errors.length === 0 && sc.workerErrors.length === 0, 'no script errors on the page or in the workers', { pageErrors, errors: sc.errors, workerErrors: sc.workerErrors });
  ok(consoleErrors.length === 0, 'no console errors', consoleErrors);
  const outside = requests.filter((u) => !u.startsWith(ORIGIN + '/') && !/^(data|blob):/.test(u));
  ok(outside.length === 0 && external.length === 0, 'nothing was requested from outside this machine (' + requests.length + ' requests, all to ' + ORIGIN + ')', { outside, external });
  fs.writeFileSync(OUT + '/t_rag1_store.requests.txt', requests.join('\n'));
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close();
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log('FAIL the test itself: ' + (e && e.stack || e)); process.exit(1); });
