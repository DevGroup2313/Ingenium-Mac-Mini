// Tests for IngRepo (r110.js) in Node, with real git as the referee.
// Usage: node t_repo.mjs <r110.js> <outdir>
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';

const SRC = path.resolve(process.argv[2]);
const OUT = path.resolve(process.argv[3] || './t_out');
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const sh = (cmd, args, opts = {}) => execFileSync(cmd, args, { maxBuffer: 1 << 30, stdio: ['pipe', 'pipe', 'pipe'], ...opts });
const git = (dir, ...a) => sh('git', ['-C', dir, ...a]).toString();
globalThis.window = globalThis;
const code = fs.readFileSync(SRC, 'utf8').replace(/^<script>/, '').replace(/<\/script>\s*$/, '');
(0, eval)(code);
const R = globalThis.IngRepo, C = R.core;
let pass = 0, fail = 0; const results = [];
function ok(name, cond, extra) { (cond ? pass++ : fail++); results.push((cond ? 'PASS ' : 'FAIL ') + name + (extra ? '  ' + extra : '')); console.log((cond ? 'PASS ' : 'FAIL ') + name + (extra ? '  ' + extra : '')); }
const be = C.MemBackend(); C.use(be);
const u8 = b => new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
const T0 = Date.now();

// ---- A. SHA-1, both ways ----
{
  let good = true;
  for (const n of [0, 1, 55, 56, 63, 64, 65, 119, 120, 1000, 1 << 20]) {
    const b = crypto.randomBytes(n); const want = crypto.createHash('sha1').update(b).digest('hex');
    if (C.sha1JS(u8(b)) !== want || (await C.sha1(u8(b))) !== want) good = false;
  }
  ok('A sha1 (JS and browser) equal Node for 11 sizes', good);
}
// ---- B. inflate: every block kind, and where the stream ends ----
{
  let good = true, why = '';
  const page = fs.readFileSync('/home/user/Ingenium-Mac-Mini/ingenium.html');
  const inputs = [Buffer.alloc(0), Buffer.from('a'), Buffer.from('hello hello hello hello'), crypto.randomBytes(70000), page.subarray(0, 3_000_000), Buffer.alloc(100000, 7)];
  for (const inp of inputs) for (const level of [0, 1, 6, 9]) {
    const z = zlib.deflateSync(inp, { level }); const tail = Buffer.from('TRAILING'); const both = Buffer.concat([z, tail]);
    try { const r = C.inflateZ(u8(both), 0, inp.length); if (Buffer.compare(Buffer.from(r.data), inp) !== 0 || r.end !== z.length) { good = false; why = `level ${level} len ${inp.length} end ${r.end} vs ${z.length}`; } }
    catch (e) { good = false; why = e.message + ' level ' + level + ' len ' + inp.length; }
  }
  const raw = zlib.deflateRawSync(Buffer.from('fixed huffman text '.repeat(30)), { level: 1 });
  const r = C.inflateRaw(u8(raw), 0); good = good && Buffer.from(r.data).toString() === 'fixed huffman text '.repeat(30) && r.end === raw.length;
  ok('B inflate (stored, fixed, dynamic; exact end) for 24 streams', good, why);
  const st = C.storedZ(u8(page.subarray(0, 200000))); ok('B stored zlib is read by Node', Buffer.compare(zlib.inflateSync(st), page.subarray(0, 200000)) === 0);
}
// ---- C. deltas between real versions of the page ----
const MM = '/home/user/Ingenium-Mac-Mini';
const vers = git(MM, 'log', '--format=%H', '-n', '6', '--', 'ingenium.html').trim().split('\n');
{
  const a = u8(sh('git', ['-C', MM, 'show', `${vers[1]}:ingenium.html`])), b = u8(sh('git', ['-C', MM, 'show', `${vers[0]}:ingenium.html`]));
  const t = Date.now(); const d = C.makeDelta(a, b); const ms = Date.now() - t;
  const back = C.applyDelta(a, d);
  ok('C delta between two versions of the page rebuilds it', Buffer.compare(Buffer.from(back), Buffer.from(b)) === 0, `${a.length} -> ${b.length} B, delta ${d.length} B in ${ms} ms`);
  const x = u8(crypto.randomBytes(5000)), y = u8(crypto.randomBytes(5000)); ok('C unrelated data gives no delta', C.makeDelta(x, y) === null);
}
// ---- D. a repository from the Android repository's files: the same tree as git's ----
const AF = '/home/user/Ingenium-Android-fire';
function gitFiles(dir, rev = 'HEAD') {
  const ls = git(dir, 'ls-tree', '-r', '-z', rev).split('\0').filter(Boolean);
  return ls.map(l => { const [meta, p] = l.split('\t'); const [mode, type, oid] = meta.split(' '); return { path: p, mode, oid, type }; }).filter(e => e.type === 'blob');
}
let repo;
{
  const fl = gitFiles(AF);
  const files = fl.map(f => ({ path: f.path, mode: f.mode, data: u8(sh('git', ['-C', AF, 'cat-file', 'blob', f.oid])) }));
  const t = Date.now();
  const res = await R.fromFiles(files, { name: 'Ingenium Android', msg: 'First version' });
  repo = res.id;
  const lg = await R.log(repo);
  const real = git(AF, 'rev-parse', 'HEAD^{tree}').trim();
  ok('D first commit of ' + files.length + ' files has git\'s own tree name', lg.length === 1 && lg[0].tree === real, `${lg[0].tree} vs ${real}, ${Date.now() - t} ms`);
  const st = await R.status(repo); ok('D clean after the first commit', st.clean);
}
// ---- E. edits, branches, merges ----
{
  const readme = (await R.readText(repo, 'README_FIRE.txt')) || '';
  await R.put(repo, 'README_FIRE.txt', readme + '\nA line from Ingenium.\n');
  let st = await R.status(repo); ok('E status sees one changed file', st.changes.length === 1 && st.changes[0].kind === 'changed' && st.changes[0].path === 'README_FIRE.txt', JSON.stringify(st.changes));
  const c1 = await R.commit(repo, 'Say hello in the README');
  await R.branch(repo, 'feature');
  await R.switchTo(repo, 'feature');
  await R.put(repo, 'docs/NOTES.md', '# Notes\n\nOne\nTwo\nThree\n');
  await R.put(repo, 'tools/run.sh', '#!/bin/sh\necho run\n');
  const c2 = await R.commit(repo, 'Notes and a script');
  const fileMode = (await R.files(repo)).find(f => f.path === 'tools/run.sh').mode;
  ok('E a .sh file is kept as executable', fileMode === '100755');
  await R.switchTo(repo, 'main');
  ok('E switching back takes the branch\'s files away', (await R.readText(repo, 'docs/NOTES.md')) === null);
  await R.put(repo, 'README_FIRE.txt', readme + '\nA line from Ingenium.\nAnd one more on main.\n');
  const c3 = await R.commit(repo, 'One more line on main');
  const m = await R.merge(repo, 'feature');
  const lg = await R.log(repo, { max: 10 });
  ok('E merging feature into main makes a merge commit with two parents', m.kind === 'merged' && lg[0].parents.length === 2 && (await R.readText(repo, 'docs/NOTES.md')).includes('Three'), JSON.stringify(m));
  // a clash: both sides change the same line
  await R.branch(repo, 'other');
  await R.put(repo, 'docs/NOTES.md', '# Notes\n\nOne\nTwo (main)\nThree\n'); await R.commit(repo, 'main says two');
  await R.switchTo(repo, 'other'); await R.put(repo, 'docs/NOTES.md', '# Notes\n\nOne\nTwo (other)\nThree\n'); await R.commit(repo, 'other says two');
  await R.switchTo(repo, 'main');
  const m2 = await R.merge(repo, 'other');
  const both = await R.readText(repo, 'docs/NOTES.md');
  ok('E the same line changed on both sides is shown with both versions', m2.kind === 'conflicts' && /<<<<<<< main\nTwo \(main\)\n=======\nTwo \(other\)\n>>>>>>> other/.test(both), both.replace(/\n/g, '|'));
  let refused = false; try { await R.commit(repo, 'too soon'); } catch (e) { refused = /both versions/.test(e.message); }
  ok('E a commit is refused while both versions are still in the file', refused);
  await R.put(repo, 'docs/NOTES.md', '# Notes\n\nOne\nTwo (main and other)\nThree\n');
  const c5 = await R.commit(repo, 'Merge other: both said two');
  ok('E the settled merge commits with two parents', (await R.log(repo, { max: 1 }))[0].parents.length === 2);
  // undo an older commit
  const u0 = await R.revert(repo, c2);
  ok('E undoing a commit whose file was changed since is held back, as git does', u0.kind === 'conflicts' && u0.conflicts[0] === 'docs/NOTES.md', JSON.stringify(u0));
  await R.stopMerge(repo);
  ok('E stopping puts the working copy back', (await R.status(repo)).clean);
  const u = await R.revert(repo, c3);
  ok('E undoing “One more line on main” takes it away in a new commit', u.kind === 'undone' && !(await R.readText(repo, 'README_FIRE.txt')).includes('And one more on main') && (await R.log(repo, { max: 1 }))[0].title.startsWith('Undo'), JSON.stringify(u));
  await R.del(repo, 'tools/run.sh'); await R.commit(repo, 'No script');
  await R.tag(repo, 'v1.0', { msg: 'The first release from Ingenium' });
  await R.tag(repo, 'light');
  // a binary file, a move, a removal
  const png = fs.readFileSync(path.join(AF, gitFiles(AF).find(f => /\.png$/.test(f.path)).path));
  await R.put(repo, 'art/seal.png', u8(png));
  await R.move(repo, 'docs/NOTES.md', 'docs/notes/NOTES.md');
  st = await R.status(repo);
  ok('E a move is seen as a move, a picture as added', st.changes.some(c => c.kind === 'moved' && c.from === 'docs/NOTES.md') && st.changes.some(c => c.path === 'art/seal.png' && c.kind === 'added'), JSON.stringify(st.changes.map(c => c.kind + ':' + c.path)));
  await R.commit(repo, 'A picture, and the notes in their own folder');
  const d = await R.diff(repo, { from: c1, to: 'HEAD', text: true });
  ok('E the diff from the first edit lists the picture as binary', d.some(x => x.path === 'art/seal.png' && x.binary));
}
// ---- F. the bundle: git verifies and clones it ----
let lgAll;
{
  const b = await R.bundle(repo); const bf = path.join(OUT, 'repo.bundle'); fs.writeFileSync(bf, b);
  const cl = path.join(OUT, 'from-bundle'); sh('git', ['clone', '-q', bf, cl]);
  let v = ''; try { v = sh('git', ['bundle', 'verify', bf], { cwd: cl }).toString() + String(''); v = 'okay'; } catch (e) { v = String(e.stderr); }
  ok('F git bundle verify accepts the bundle', v === 'okay', v.trim().split('\n').pop());
  let fsck = ''; try { fsck = sh('git', ['-C', cl, 'fsck', '--full', '--strict']).toString() + 'clean'; } catch (e) { fsck = String(e.stderr); }
  ok('F git fsck --strict on the clone', fsck.trim() === 'clean', fsck.trim().slice(0, 200));
  lgAll = await R.log(repo, { max: 1000 });
  const n = +git(cl, 'rev-list', '--count', 'HEAD').trim();
  ok('F the clone has every commit', n === lgAll.length, `${n} vs ${lgAll.length}`);
  ok('F the clone has the same head', git(cl, 'rev-parse', 'HEAD').trim() === lgAll[0].oid);
  const tags = git(cl, 'tag').trim().split('\n').sort().join(',');
  ok('F the clone has both tags', tags === 'light,v1.0', tags);
  ok('F the annotated tag reads as written', /The first release from Ingenium/.test(git(cl, 'cat-file', '-p', 'v1.0')));
  const pngOk = Buffer.compare(fs.readFileSync(path.join(cl, 'art/seal.png')), fs.readFileSync(path.join(AF, gitFiles(AF).find(f => /\.png$/.test(f.path)).path))) === 0;
  ok('F the picture comes out byte for byte', pngOk);
  ok('F the clone\'s branches', git(cl, 'branch', '-r').includes('origin/feature') && git(cl, 'branch', '-r').includes('origin/other'));
}
// ---- G. the folder for git (a zip with its .git): fsck, status clean ----
{
  const z = await R.gitFolder(repo, { folder: 'ingenium-android' }); const zf = path.join(OUT, 'gitfolder.zip'); fs.writeFileSync(zf, z);
  const dir = path.join(OUT, 'unz'); fs.mkdirSync(dir); sh('unzip', ['-q', zf, '-d', dir]);
  const rd = path.join(dir, 'ingenium-android');
  let fsck = ''; try { fsck = sh('git', ['-C', rd, 'fsck', '--full', '--strict']).toString() + 'clean'; } catch (e) { fsck = String(e.stderr); }
  ok('G git fsck --strict in the unzipped folder', fsck.trim() === 'clean', fsck.trim().slice(0, 200));
  const st = git(rd, 'status', '--porcelain');
  ok('G git status shows nothing changed', st.trim() === '', st.slice(0, 300));
  ok('G its log has every commit', +git(rd, 'rev-list', '--count', 'HEAD').trim() === lgAll.length);
  const zipT = sh('unzip', ['-Z', '-l', zf]).toString();
  ok('G gradlew keeps its exec bit in the zip', /-rwxr-xr-x.*gradlew\s*$/m.test(zipT));
  ok('G Python reads the zip', sh('python3', ['-c', `import zipfile,sys;z=zipfile.ZipFile(sys.argv[1]);print(z.testzip())`, zf]).toString().trim() === 'None');
}
// ---- H. the zip of the files, as GitHub's Download ZIP ----
{
  const z = await R.sourceZip(repo, 'HEAD'); const zf = path.join(OUT, 'src.zip'); fs.writeFileSync(zf, z);
  const dir = path.join(OUT, 'srcz'); fs.mkdirSync(dir); sh('unzip', ['-q', zf, '-d', dir]);
  const top = fs.readdirSync(dir)[0];
  const cl = path.join(OUT, 'from-bundle'); const cmp = path.join(OUT, 'arch'); fs.mkdirSync(cmp); sh('sh', ['-c', `git -C ${cl} archive HEAD | tar -x -C ${cmp}`]);
  let same = true; try { sh('diff', ['-r', path.join(dir, top), cmp]); } catch (e) { same = false; }
  ok('H the files zip holds exactly the commit\'s files', same, top);
  ok('H its comment is the commit\'s name, as GitHub does', sh('unzip', ['-z', zf]).toString().includes(lgAll[0].oid));
}
// ---- I. in: a bundle git made from the Mac mini repository ----
{
  const bf = path.join(OUT, 'mm.bundle'); sh('git', ['-C', MM, 'bundle', 'create', bf, '--all'], { stdio: 'ignore' });
  const t = Date.now();
  const res = await R.importAny(u8(fs.readFileSync(bf)), { name: 'Ingenium (Mac mini)' });
  const ms = Date.now() - t;
  const ours = await R.log(res.id, { max: 100000 });
  const theirsN = +git(MM, 'rev-list', '--count', 'HEAD').trim();
  ok('I a bundle from git comes in whole', ours.length === theirsN && ours[0].oid === git(MM, 'rev-parse', 'HEAD').trim(), `${ours.length} commits, ${res.objects} objects, ${ms} ms`);
  const page = await R.read(res.id, 'ingenium.html');
  ok('I the page in the working copy is the same as git\'s', Buffer.compare(Buffer.from(page), fs.readFileSync(path.join(MM, 'ingenium.html'))) === 0);
  const old = await R.readText(res.id, 'ingenium.html', vers[3]);
  ok('I an older version reads back', old === sh('git', ['-C', MM, 'show', `${vers[3]}:ingenium.html`]).toString());
  let stored = 0; for (const [k, v] of be._objects) stored += v.b.length;
  console.log(`   store holds ${be._objects.size} objects, ${(stored / 1048576).toFixed(1)} MB`);
  // and back out: the bundle we make from it clones to the same history
  const back = await R.bundle(res.id); const bf2 = path.join(OUT, 'mm-back.bundle'); fs.writeFileSync(bf2, back);
  const cl = path.join(OUT, 'mm-back'); sh('git', ['clone', '-q', '--mirror', bf2, cl]);
  const a = git(cl, 'rev-parse', 'HEAD').trim();
  ok('I out again: the same history, the same head', a === ours[0].oid && +git(cl, 'rev-list', '--count', 'HEAD').trim() === theirsN, `bundle ${(back.length / 1048576).toFixed(1)} MB vs git's ${(fs.statSync(bf).size / 1048576).toFixed(1)} MB`);
}
// ---- J. in: GitHub's Download ZIP ----
{
  const zf = path.join(OUT, 'gh.zip'); const head = git(AF, 'rev-parse', 'HEAD').trim();
  sh('git', ['-C', AF, 'archive', '--format=zip', `--prefix=Ingenium-Android-fire-${head}/`, '-o', zf, 'HEAD']);
  const res = await R.importAny(u8(fs.readFileSync(zf)), { fileName: 'gh.zip' });
  const lg = await R.log(res.id); const info = await R.info(res.id);
  ok('J a GitHub zip comes in with git\'s own tree name and its name', lg[0].tree === git(AF, 'rev-parse', 'HEAD^{tree}').trim() && info.name === 'Ingenium-Android-fire', info.name + ' / ' + lg[0].title);
}
// ---- K. in: a folder with its .git, zipped ----
{
  const cl = path.join(OUT, 'clone-af'); sh('git', ['clone', '-q', AF, cl]);
  const zf = path.join(OUT, 'withgit.zip'); sh('sh', ['-c', `cd ${OUT} && zip -qr ${zf} clone-af`]);
  const res = await R.importAny(u8(fs.readFileSync(zf)));
  const lg = await R.log(res.id, { max: 100000 });
  ok('K a zipped folder with its .git brings its history', lg.length === +git(cl, 'rev-list', '--count', 'HEAD').trim() && res.changes === 0, `${lg.length} commits, ${res.changes} changes`);
}
// ---- L. the diff counts agree with git's ----
{
  const a = sh('git', ['-C', MM, 'show', `${vers[2]}:ingenium.html`]).toString(), b = sh('git', ['-C', MM, 'show', `${vers[0]}:ingenium.html`]).toString();
  const t = Date.now(); const hs = C.hunks(C.splitLines(a), C.splitLines(b)); const ms = Date.now() - t;
  let ad = 0, de = 0; hs.forEach(h => h.lines.forEach(l => { if (l[0] === '+') ad++; else if (l[0] === '-') de++; }));
  const ns = git(MM, 'diff', '--numstat', '--minimal', vers[2], vers[0], '--', 'ingenium.html').trim().split(/\s+/);
  ok('L diff of the page across two versions: same lines added and taken away as git --minimal', ad === +ns[0] && de === +ns[1], `ours +${ad} -${de}, git +${ns[0]} -${ns[1]}, ${hs.length} hunks, ${ms} ms`);
  // our unified text applies with git apply
  const dir = path.join(OUT, 'apply'); fs.mkdirSync(dir); fs.writeFileSync(path.join(dir, 'ingenium.html'), a);
  fs.writeFileSync(path.join(dir, 'p.diff'), C.unified('ingenium.html', C.splitLines(a), C.splitLines(b), hs, 'changed'));
  let applied = true; try { sh('git', ['apply', '--unidiff-zero', 'p.diff'], { cwd: dir }); } catch (e) { applied = false; console.log(String(e.stderr).slice(0, 300)); }
  ok('L git apply takes our diff and makes the newer page', applied && fs.readFileSync(path.join(dir, 'ingenium.html'), 'utf8') === b);
}
// ---- M. three-way merges agree with git merge-file ----
{
  let agree = 0, total = 0; const rnd = (n) => Math.floor(Math.random() * n);
  for (let k = 0; k < 300; k++) {
    const base = Array.from({ length: 40 }, (_, i) => 'line ' + i);
    const mut = (arr) => { const o = arr.slice(); const ops = 1 + rnd(3); for (let j = 0; j < ops; j++) { const at = rnd(o.length); const kind = rnd(3); if (kind === 0) o[at] = o[at] + ' changed' + rnd(100); else if (kind === 1) o.splice(at, 1); else o.splice(at, 0, 'new ' + rnd(1000)); } return o; };
    const ours = mut(base), theirs = mut(base);
    const dir = path.join(OUT, 'm3'); fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'b'), base.join('\n') + '\n'); fs.writeFileSync(path.join(dir, 'o'), ours.join('\n') + '\n'); fs.writeFileSync(path.join(dir, 't'), theirs.join('\n') + '\n');
    let g, clean = true; try { g = sh('git', ['merge-file', '-p', 'o', 'b', 't'], { cwd: dir }).toString(); } catch (e) { g = e.stdout.toString(); clean = false; }
    const m = C.merge3(base, ours, theirs);
    if (clean) { total++; if (m.conflicts === 0 && m.lines.join('\n') + '\n' === g) agree++; }
  }
  ok('M where git merges cleanly, ours gives the same text', agree === total, `${agree}/${total}`);
}
// ---- N. letting go of what nothing names ----
{
  const before = be._objects.size; const lst = await R.list();
  for (const r of lst) if (r.id !== repo) await R.remove(r.id);
  const g = await R.gc();
  const b = await R.bundle(repo); const bf = path.join(OUT, 'after-gc.bundle'); fs.writeFileSync(bf, b);
  let v = true; try { sh('git', ['bundle', 'verify', bf], { cwd: path.join(OUT, 'from-bundle') }); } catch (e) { v = false; console.log(String(e.stderr)); }
  ok('N after the others are removed, gc lets go and the repository still verifies', g.gone > 0 && v && be._objects.size < before, `${before} -> ${be._objects.size} (${g.gone} gone)`);
}
// ---- O. what twenty commits of a 15 MB page cost here ----
{
  C.use(C.MemBackend()); const be2 = (() => { const b = C.MemBackend(); C.use(b); return b; })();
  const s = await R.create({ name: 'Page only' });
  const vs = git(MM, 'log', '--format=%H', '-n', '12', '--', 'ingenium.html').trim().split('\n').reverse();
  let rawTotal = 0; const t = Date.now();
  for (const v of vs) { const b = sh('git', ['-C', MM, 'show', `${v}:ingenium.html`]); rawTotal += b.length; await R.put(s.id, 'ingenium.html', u8(b)); await R.commit(s.id, 'Page at ' + v.slice(0, 7), { allowEmpty: true }); }
  let stored = 0; for (const [k, v] of be2._objects) stored += v.b.length;
  ok('O ' + vs.length + ' versions of the page are kept in less than a quarter of their size', stored < rawTotal / 4, `${(rawTotal / 1048576).toFixed(1)} MB of versions kept in ${(stored / 1048576).toFixed(1)} MB, ${Date.now() - t} ms`);
  const back = await R.read(s.id, 'ingenium.html', 'HEAD~0'.replace('~0', ''));
  ok('O the newest reads back exactly', Buffer.compare(Buffer.from(back), sh('git', ['-C', MM, 'show', `${vs[vs.length - 1]}:ingenium.html`])) === 0);
}
console.log(`\n${pass} passed, ${fail} failed, ${((Date.now() - T0) / 1000).toFixed(1)} s`);
fs.writeFileSync(path.join(OUT, 'results.txt'), results.join('\n') + `\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
