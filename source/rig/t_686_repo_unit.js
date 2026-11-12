// node rig/t_686_repo_unit.js : IngRepo's squash and rebase (Ingenium 6.86, modules/r110.js), with no page: IngRepo keeps its
// repositories in memory when no browser store is there. Her words (12 November 2026): "I approve of the design" (Fabrica, phase 2:
// a pull request brought in by merge, squash or rebase). Invented repositories and words.
const fs = require('fs'), vm = require('vm'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'build', 'modules', 'r110.js'), 'utf8').split('<script>')[1].split('</script>')[0];
const ctx = { window: {}, console, TextEncoder, TextDecoder, Uint8Array, ArrayBuffer, Promise, Date, Math, JSON, Map, Set, setTimeout, clearTimeout, crypto: globalThis.crypto,
  DecompressionStream: globalThis.DecompressionStream, CompressionStream: globalThis.CompressionStream, Response: globalThis.Response, Blob: globalThis.Blob, btoa, atob };
ctx.window = ctx; vm.createContext(ctx); vm.runInContext(src, ctx);
const R = ctx.IngRepo || ctx.window.IngRepo; let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c ? '' : '  ' + JSON.stringify(d).slice(0, 400))); c ? pass++ : fail++; };
const enc = s => new TextEncoder().encode(s);
(async () => {
  R.setAuthor({ name: 'Ada', email: 'ada@example.org' });
  async function make() { const a = await R.fromFiles([{ path: 'app.js', data: enc('one\ntwo\nthree\n') }, { path: 'README.md', data: enc('# Quill\n') }], { name: 'quill' });
    await R.branch(a.id, 'night'); await R.switchTo(a.id, 'night');
    await R.put(a.id, 'app.js', enc('one\ntwo\nthree\nnight 1\n')); await R.commit(a.id, 'Night, first step');
    await R.put(a.id, 'night.css', enc('body{background:#111}\n')); await R.commit(a.id, 'Night, its colours');
    await R.switchTo(a.id, 'main'); await R.put(a.id, 'README.md', enc('# Quill\n\nA notebook.\n')); await R.commit(a.id, 'The README says more');
    return a.id; }
  // 1. merge, as before: two parents
  let id = await make(); let m = await R.merge(id, 'night', { msg: 'Merge night' }); let l = await R.log(id, { max: 10 });
  ok(m.kind === 'merged' && l[0].parents.length === 2 && l[0].title === 'Merge night', 'merge keeps a version with two parents, as before', { m, p: l[0].parents });
  // 2. squash: one version, one parent, the other idea's changes in it
  id = await make(); m = await R.merge(id, 'night', { squash: true, msg: 'Night mode (#4)' }); l = await R.log(id, { max: 10 });
  let f = await R.files(id); const names = (Array.isArray(f) ? f.map(x => x.path || x) : Object.keys(f)).join();
  const app = await R.readText(id, 'app.js');
  ok(m.kind === 'merged' && l[0].parents.length === 1 && l[0].title === 'Night mode (#4)' && /night 1/.test(app) && /night\.css/.test(names), 'squash keeps one version with one parent, holding the whole idea', { m, parents: l[0].parents, names, app });
  ok(l.length === 3 && l[1].title === 'The README says more', 'main\'s own history is unchanged beneath it', l.map(x => x.title));
  // 3. squash of an idea main has not moved past: still one new version
  let id2 = (await R.fromFiles([{ path: 'a.txt', data: enc('a\n') }], { name: 'q2' })).id; await R.branch(id2, 'x'); await R.switchTo(id2, 'x'); await R.put(id2, 'b.txt', enc('b\n')); await R.commit(id2, 'b');
  await R.put(id2, 'c.txt', enc('c\n')); await R.commit(id2, 'c'); await R.switchTo(id2, 'main'); m = await R.merge(id2, 'x', { squash: true, msg: 'Squashed x' }); l = await R.log(id2, { max: 5 });
  ok(m.kind === 'merged' && l[0].title === 'Squashed x' && l[0].parents.length === 1 && l.length === 2, 'squash makes one version even where main could only move forward', l.map(x => x.title));
  // 4. rebase: each version made again on top of main, oldest first, with its own words, author and date
  id = await make(); const before = await R.log(id, { ref: 'night', max: 5 }); m = await R.rebase(id, 'night'); l = await R.log(id, { max: 10 });
  ok(m.kind === 'rebased' && m.count === 2 && l[0].title === 'Night, its colours' && l[1].title === 'Night, first step' && l[2].title === 'The README says more' && l[0].parents.length === 1 && l[1].parents.length === 1,
    'rebase makes each version again on top of main, oldest first, one parent each', l.map(x => x.title));
  ok(l[0].author.name === 'Ada' && l[0].author.when === before[0].author.when && l[1].author.when === before[1].author.when, 'each keeps its own author and date', [l[0].author, before[0].author]);
  const app2 = await R.readText(id, 'app.js'), rd = await R.readText(id, 'README.md');
  ok(/night 1/.test(app2) && /A notebook/.test(rd), 'and main holds both ideas\' changes', { app2, rd });
  // 5. rebase that meets a change on the same lines: nothing written, it says which
  id = await make(); await R.put(id, 'app.js', enc('one\ntwo\nthree\nday 1\n')); await R.commit(id, 'Day, on the same line');
  const head = (await R.log(id, { max: 1 }))[0].oid; let err = null; try { await R.rebase(id, 'night'); } catch (e) { err = e.message; }
  const head2 = (await R.log(id, { max: 1 }))[0].oid;
  ok(err && /same lines/.test(err) && /Night, first step/.test(err) && head === head2, 'a rebase that meets a change on the same lines writes nothing and says which', { err, same: head === head2 });
  // 6. a disk repository is known by its id
  ok(R.isDisk('disk:abc') && !R.isDisk('repo_x'), 'a repository read from the drive is known by its id (disk:)');
  // 5. an object lent by the drive (r280 marks it away) is never counted as kept: a new file with the same words is kept for itself
  const inner = R.core.MemBackend(), lentBody = enc('Begin here.\n');
  const lentOid = await R.core.sha1(Uint8Array.from([...enc('blob ' + lentBody.length), 0, ...lentBody])).then(h => typeof h === 'string' ? h : Array.from(h).map(x => x.toString(16).padStart(2, '0')).join(''));
  const mux = Object.assign({}, inner, { getRec: oid => inner.getRec(oid).then(r => r || (oid === lentOid ? { t: 'blob', n: lentBody.length, b: lentBody, away: 1 } : null)), ownRec: oid => inner.getRec(oid) });
  R.core.use(mux);
  const st = R.core.store(), got = await st.get(lentOid), hadOwn = await st.has(lentOid);
  const k = await R.fromFiles([{ path: 'same.md', data: lentBody }], { name: 'kept' });
  const own = await inner.getRec(lentOid);
  ok(got && got.type === 'blob' && !hadOwn && own && own.t === 'blob', 'an object lent by the drive is read, not counted as kept, and a file with the same words is kept for itself', { got: !!got, hadOwn, own: !!own, k: !!k });
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
