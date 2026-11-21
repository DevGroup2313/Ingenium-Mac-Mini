// Ingenium 7.59: the folder search's index, one per profile, sealed with that profile's own key (rag/seal.js, rag/store.worker.js).
// Her choice (21 November 2026): "One index per profile". Invented people only: the owner ("me") and two profiles, pzz1 and pqq2.
//   1. the split: a shared index from before 7.59 with three readers; the first open with split moves each other profile's folders
//      (files, passages, words, vectors, cached vectors) into its own file, takes them out of the shared one, and keeps a folder that
//      the owner shares; a second open moves nothing
//   2. the seal: a profile's index sealed with its key; its marker word in no file of the private file system, read raw; the magic
//      head in its file; searches give the same answers sealed as plain
//   3. refusals: no key (LOCKED), another key (OTHER_KEY), a changed byte (SEAL_BROKEN); never taken for a damaged index (CORRUPT)
//   4. turning the sign-in off (seal.openAll) opens it again in place; turning it on with the index open (seal.key) seals it in place
//   5. a sealed shared index is left as it is by another profile's split
//   python3 rag/test/serve.py 8175 --vendor <the unpacked vendor tree, with noble/>
//   node rig/t_759_rag_seal.js http://127.0.0.1:8175/ <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [BASE0, OUT] = process.argv.slice(2);
if (!BASE0 || !OUT) { console.log('usage: node rig/t_759_rag_seal.js <server address> <out folder>'); process.exit(2); }
const HARNESS = /\.html($|\?)/.test(BASE0) ? BASE0 : BASE0.replace(/\/?$/, '/') + 'rag/test/harness.html';
const ORIGIN = new URL(HARNESS).origin;
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d).slice(0, 600) : '')); c ? pass++ : fail++; };

function pageHelpers() {
  window.T = {};
  T.mk = (seed, dims = 384) => {
    const a = new Float32Array(dims); let s = (seed * 2654435761) >>> 0, n = 0;
    for (let i = 0; i < dims; i++) { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; a[i] = s / 4294967296 - 0.5; n += a[i] * a[i]; }
    n = Math.sqrt(n); for (let i = 0; i < dims; i++) a[i] /= n; return a;
  };
  T.chunks = (n, word, seed0) => Array.from({ length: n }, (_, i) => ({
    chunk_index: i, heading_path: 'Part ' + (i + 1), char_start: i * 100, char_end: i * 100 + 99, page: null,
    content_hash: word + '-h' + i, text: 'A note about ' + word + ' number ' + i + ', written for the test.', embedding: T.mk(seed0 + i),
  }));
  T.b64 = (u8) => btoa(String.fromCharCode(...u8));
  T.hex = (u8) => [...u8].map((x) => x.toString(16).padStart(2, '0')).join('');
  T.key = () => ({ key: T.b64(crypto.getRandomValues(new Uint8Array(32))), kid: T.hex(crypto.getRandomValues(new Uint8Array(8))) });
  T.open = async (args) => {
    const s = RagHarness.makeStore();
    try { const info = await s.open(args); return { s, info }; }
    catch (e) { s.terminate(); return { s: null, error: e.code || String(e.message || e), message: String(e.message || e) }; }
  };
  T.end = async (s) => { if (!s) return; try { await s.close(); } catch (_) { /* gone */ } s.terminate(); await new Promise((r) => setTimeout(r, 150)); };
  // the pool keeps its files in a folder of its own inside its directory (.opaque): every file, at any depth
  T.files = async () => {
    const out = [];
    const go = async (d) => { for await (const [, h] of d.entries()) { if (h.kind === 'file') out.push(h); else await go(h); } };
    await go(await (await navigator.storage.getDirectory()).getDirectoryHandle('.ingenium-rag'));
    return out;
  };
  // every file of the pool's directory, read raw once no worker holds it: which hold the word, which begin with the seal's head
  T.raw = async (words) => {
    const out = { files: 0, holding: {}, sealedHeads: 0 };
    for (const w of words) out.holding[w] = 0;
    for (const h of await T.files()) {
      const u8 = new Uint8Array(await (await h.getFile()).arrayBuffer());
      if (u8.length <= 4096) continue;
      out.files++;
      const text = new TextDecoder('latin1').decode(u8);
      for (const w of words) if (text.includes(w)) out.holding[w]++;
      if (text.slice(4096, 4104) === 'INGRAGS1') out.sealedHeads++;
    }
    return out;
  };
  // changes one byte inside the first sealed sector of every sealed file
  T.spoil = async () => {
    let n = 0;
    for (const h of await T.files()) {
      const u8 = new Uint8Array(await (await h.getFile()).arrayBuffer());
      if (u8.length <= 4200 || new TextDecoder('latin1').decode(u8.subarray(4096, 4104)) !== 'INGRAGS1') continue;
      const at = 4096 + 64 + 24 + 100;
      const w = await h.createWritable({ keepExistingData: true });
      await w.write({ type: 'write', position: at, data: new Uint8Array([u8[at] ^ 0x5a]) }); await w.close(); n++;
    }
    return n;
  };
  T.view = async (s, principal) => {
    const pid = (await s.principal.find({ name: principal }));
    const folders = (await s.folder.list(pid ? { principalId: pid.id } : {})).map((f) => f.name).sort();
    const all = (await s.folder.list({})).map((f) => f.name).sort();
    const principals = (await s.debug.sql({ sql: 'select name from principals order by name' })).map((r) => r.name);
    const counts = (await s.debug.sql({ sql: 'select (select count(*) from chunks) as chunks, (select count(*) from chunks_fts) as fts, (select count(*) from chunks_vec) as vec, (select count(*) from emb_cache) as cache, (select count(*) from files) as files' }))[0];
    return { folders, all, principals, counts, pid: pid && pid.id };
  };
  T.search = async (s, principalId, word, seed) => {
    const f = await s.search.fts({ principalId, query: word, k: 10 });
    const v = await s.search.vec({ principalId, embedding: T.mk(seed), k: 3 });
    return { fts: f.hits.map((h) => h.id), vec: v.hits.map((h) => h.id), top: v.hits[0] && v.hits[0].distance };
  };
}

(async () => {
  const b = await pw.chromium.launch();
  const ctx = await b.newContext();
  const external = [];
  await ctx.route((u) => u.origin !== ORIGIN && !/^(data|blob):/.test(u.protocol), (route) => { external.push(route.request().url()); route.abort(); });
  await ctx.addInitScript(pageHelpers);
  const p = await ctx.newPage();
  const pageErrors = [];
  p.on('pageerror', (e) => pageErrors.push(e.message));
  const ev = (fn, arg) => p.evaluate(fn, arg);
  await p.goto(HARNESS);
  await p.waitForFunction(() => window.RagHarness && window.RagHarness.ready === true, null, { timeout: 30000 });
  await ev(async () => { const s = RagHarness.makeStore(); await s.open({}); await s.debug.wipe(); s.terminate(); });

  // ------------------------------------------------------------------------------------------------ 1. the split
  const before = await ev(async () => {
    const { s } = await T.open({});
    const me = (await s.principal.ensure({ name: 'me' })).id, a = (await s.principal.ensure({ name: 'p:pzz1' })).id, c = (await s.principal.ensure({ name: 'p:pqq2' })).id;
    const F = {};
    for (const [name, who, word, seed] of [['Owner letters', [me], 'Marrowbend', 100], ['Pzz notes', [a], 'Quillfeather', 200], ['Shared recipes', [me, a], 'Saffronwick', 300], ['Pqq diary', [c], 'Thistlemoor', 400]]) {
      const f = await s.folder.add({ name, path: '/invented/' + name });
      for (const w of who) await s.acl.grant({ folderId: f.id, principalId: w });
      await s.file.replace({ folderId: f.id, path: name + '/one.md', size: 100, mtime: 1730000000000, contentHash: word + '-file', model: 'm1', chunks: T.chunks(4, word, seed) });
      await s.emb.put({ model: 'm1', items: [0, 1, 2, 3].map((i) => ({ hash: word + '-h' + i, embedding: T.mk(seed + i) })) });
      F[name] = f.id;
    }
    const view = await T.view(s, 'p:pzz1');
    const search = await T.search(s, a, 'Quillfeather', 201);
    await T.end(s);
    return { view, search, F };
  });
  ok(before.view.all.length === 4 && before.view.counts.chunks === 16 && before.view.counts.cache === 16, 'a shared index from before 7.59: four folders, three readers, 16 passages', before.view);

  const split = await ev(async () => {
    const { s, info, error } = await T.open({ split: true });
    if (!s) return { error };
    const owner = await T.view(s, 'me');
    const leak = await s.search.fts({ principalId: owner.pid, query: 'Quillfeather Thistlemoor', k: 10 });
    await T.end(s);
    return { split: info.split, owner, leak: leak.hits.length };
  });
  ok(split.split && split.split.moved === 2 && JSON.stringify(split.split.profiles.sort()) === '["pqq2","pzz1"]' && !split.split.failed, 'the first open moves the two other profiles out of the shared index', split.split);
  ok(split.owner && JSON.stringify(split.owner.principals) === '["me"]' && JSON.stringify(split.owner.all) === '["Owner letters","Shared recipes"]', 'the shared index keeps the owner alone, with her folder and the folder she shares', split.owner);
  ok(split.owner && split.owner.counts.chunks === 8 && split.owner.counts.fts === 8 && split.owner.counts.vec === 8 && split.owner.counts.cache === 8 && split.leak === 0, 'nothing of the other profiles is left in it: passages, words, vectors, cached vectors', split.owner && split.owner.counts);

  const own = await ev(async () => {
    const out = {};
    for (const pid of ['pzz1', 'pqq2']) {
      const { s, error } = await T.open({ dbName: 'rag-' + pid + '.sqlite3' });
      if (!s) { out[pid] = { error }; continue; }
      out[pid] = await T.view(s, 'p:' + pid);
      if (pid === 'pzz1') out.search = await T.search(s, out[pid].pid, 'Quillfeather', 201);
      await T.end(s);
    }
    return out;
  });
  ok(own.pzz1 && JSON.stringify(own.pzz1.folders) === '["Pzz notes","Shared recipes"]' && own.pzz1.counts.chunks === 8 && own.pzz1.counts.fts === 8 && own.pzz1.counts.vec === 8 && own.pzz1.counts.cache === 8, 'pzz1 has its own index: its folder and the shared one, every row', own.pzz1);
  ok(own.pqq2 && JSON.stringify(own.pqq2.folders) === '["Pqq diary"]' && own.pqq2.counts.chunks === 4 && JSON.stringify(own.pqq2.principals) === '["p:pqq2"]', 'pqq2 has its own index, with only its own folder', own.pqq2);
  ok(own.search && JSON.stringify(own.search) === JSON.stringify(before.search), 'searches in pzz1\'s own index give the very answers they gave in the shared one (no folder read again)', { before: before.search, after: own.search });

  const again = await ev(async () => { const { s, info } = await T.open({ split: true }); await T.end(s); return info.split; });
  ok(again && again.moved === 0, 'a second open moves nothing', again);

  // ------------------------------------------------------------------------------------------------ 2. the seal
  const K = await ev(() => { window.K1 = T.key(); window.K2 = T.key(); return { k1: K1.kid, k2: K2.kid }; });
  const sealed = await ev(async () => {
    const { s, info, error } = await T.open({ dbName: 'rag-pzz1.sqlite3', split: true, seal: K1 });
    if (!s) return { error };
    const v = await T.view(s, 'p:pzz1');
    const search = await T.search(s, v.pid, 'Quillfeather', 201);
    await T.end(s);
    return { sealed: info.sealed, search, raw: await T.raw(['Quillfeather', 'quillfeath', 'Thistlemoor', 'Marrowbend']) };
  });
  ok(sealed.sealed && sealed.sealed.on && sealed.sealed.keyed && sealed.sealed.files.sealed >= 1 && sealed.sealed.files.plain === 0, 'opened with its key, pzz1\'s index is sealed in place', sealed.sealed || sealed);
  ok(sealed.raw && sealed.raw.holding.Quillfeather === 0 && sealed.raw.holding.quillfeath === 0 && sealed.raw.sealedHeads === 1, 'read raw, no file holds pzz1\'s word, as written or as indexed, and one file begins with the seal\'s head', sealed.raw);
  ok(sealed.raw && sealed.raw.holding.Thistlemoor === 1 && sealed.raw.holding.Marrowbend === 1, 'the profiles without a sign-in stay plain (each word in one file only)', sealed.raw && sealed.raw.holding);
  ok(JSON.stringify(sealed.search) === JSON.stringify(before.search), 'sealed, its searches give the very same answers', sealed.search);

  // ------------------------------------------------------------------------------------------------ 3. refusals
  const refused = await ev(async () => {
    const none = await T.open({ dbName: 'rag-pzz1.sqlite3', split: true });
    const other = await T.open({ dbName: 'rag-pzz1.sqlite3', split: true, seal: K2 });
    const right = await T.open({ dbName: 'rag-pzz1.sqlite3', split: true, seal: K1 });
    let search = null;
    if (right.s) { const v = await T.view(right.s, 'p:pzz1'); search = await T.search(right.s, v.pid, 'Quillfeather', 201); await T.end(right.s); }
    if (none.s) await T.end(none.s); if (other.s) await T.end(other.s);
    return { none: none.error || 'opened', other: other.error || 'opened', right: right.error || 'opened', search };
  });
  ok(refused.none === 'LOCKED', 'without its key it is refused as sealed (LOCKED), never as damaged', refused.none);
  ok(refused.other === 'OTHER_KEY', 'with another key it is refused (OTHER_KEY)', refused.other);
  ok(refused.right === 'opened' && JSON.stringify(refused.search) === JSON.stringify(before.search), 'with its own key again it opens, every answer the same', refused);

  // ------------------------------------------------------------------------------------------------ 4. off and on again
  const off = await ev(async () => {
    const { s } = await T.open({ dbName: 'rag-pzz1.sqlite3', split: true, seal: K1 });
    const r = await s.seal.openAll();
    await T.end(s);
    const raw = await T.raw(['Quillfeather']);
    const plain = await T.open({ dbName: 'rag-pzz1.sqlite3', split: true });
    let v = null; if (plain.s) { v = await T.view(plain.s, 'p:pzz1'); }
    const on = plain.s ? await plain.s.seal.key(K1) : null;
    if (plain.s) await T.end(plain.s);
    return { r, raw, plain: plain.error || 'opened', v, on, raw2: await T.raw(['Quillfeather']) };
  });
  ok(off.r && off.r.openedNow === 1 && off.raw.holding.Quillfeather === 1 && off.raw.sealedHeads === 0, 'turning the sign-in off opens the index again in place (the word is back in its file)', { r: off.r, raw: off.raw });
  ok(off.plain === 'opened' && off.v && off.v.counts.chunks === 8, 'and it opens without a key, every passage there', off.v);
  ok(off.on && off.on.sealedNow === 1 && off.raw2.holding.Quillfeather === 0 && off.raw2.sealedHeads === 1, 'turning it on with the index open seals it in place at once', { on: off.on, raw: off.raw2 });

  const broken = await ev(async () => {
    const n = await T.spoil();
    const r = await T.open({ dbName: 'rag-pzz1.sqlite3', split: true, seal: K1 });
    if (r.s) await T.end(r.s);
    return { n, code: r.error || 'opened' };
  });
  ok(broken.n === 1 && broken.code === 'SEAL_BROKEN', 'one changed byte in a sealed sector is found (SEAL_BROKEN), not read', broken);

  // ------------------------------------------------------------------------------------------------ 5. a sealed shared index
  const shared = await ev(async () => {
    window.K0 = T.key();
    const o = await T.open({ split: true, seal: K0 }); const ov = o.s ? await T.view(o.s, 'me') : null; if (o.s) await T.end(o.s);
    const q = await T.open({ dbName: 'rag-pqq2.sqlite3', split: true }); const split = q.info && q.info.split; if (q.s) await T.end(q.s);
    const o2 = await T.open({ split: true, seal: K0 }); const ov2 = o2.s ? await T.view(o2.s, 'me') : null; if (o2.s) await T.end(o2.s);
    return { owner: o.error || ov.counts, split, after: o2.error || ov2.counts, raw: await T.raw(['Marrowbend', 'Saffronwick', 'Thistlemoor']) };
  });
  ok(shared.split && shared.split.moved === 0 && shared.split.unread === true, 'another profile\'s open leaves the owner\'s sealed index as it is', shared.split);
  ok(shared.after && shared.after.chunks === 8 && JSON.stringify(shared.after) === JSON.stringify(shared.owner), 'the owner\'s index opens with her key afterwards, unchanged', shared);
  ok(shared.raw.holding.Marrowbend === 0 && shared.raw.holding.Saffronwick === 0 && shared.raw.holding.Thistlemoor === 1, 'read raw: the owner\'s words are sealed, the profile without a sign-in plain', shared.raw.holding);

  // ------------------------------------------------------------------------------------------------ 6. a profile removed
  const dropped = await ev(async () => {
    const o = await T.open({ split: true, seal: K0 });
    const r = await o.s.profile.drop({ pid: 'pqq2' });
    const r2 = await o.s.profile.drop({ pid: 'pzz1' });   // the one spoiled above: removed though it cannot be opened
    await T.end(o.s);
    const self = await T.open({ dbName: 'rag-pzz1.sqlite3', seal: K1 });
    const own = self.s ? await self.s.profile.drop({ pid: 'pzz1' }).then(() => 'dropped', (e) => e.code) : self.error;
    if (self.s) await T.end(self.s);
    return { r, r2, own, raw: await T.raw(['Thistlemoor']) };
  });
  ok(dropped.r.dropped === 1 && dropped.r2.dropped === 1 && dropped.raw.holding.Thistlemoor === 0, 'a removed profile\'s own index goes with it, sealed, plain or spoiled (its word in no file now)', dropped);
  ok(dropped.own === 'IN_USE', 'the index open now is never removed this way', dropped.own);

  ok(external.length === 0, 'nothing was fetched from outside', external);
  ok(pageErrors.length === 0, 'no page errors', pageErrors);
  await ev(async () => { const s = RagHarness.makeStore(); try { await s.open({ seal: K0 }); } catch (_) { /* sealed */ } await s.debug.wipe(); s.terminate(); });
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log('FAIL the test stopped: ' + (e && e.stack || e)); process.exit(1); });
