// The copy on disk (desktop apps): written as segments the desk names; read back when the page's store comes back empty.
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
const SRC = path.resolve(process.argv[2]), OUT = path.resolve(process.argv[3] || './m_out'); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const sh = (c, a, o = {}) => execFileSync(c, a, { maxBuffer: 1 << 30, stdio: ['pipe', 'pipe', 'pipe'], ...o });
globalThis.window = globalThis; const disk = {}; let saves = 0;
globalThis.shellApi = () => ({ big_put(id, t) { if (!/^big_[a-z0-9]{7,40}$/.test(id)) return { ok: false, error: 'bad id' }; if (t.length > 64 * 1048576) return { ok: false }; disk[id] = t; return { ok: true }; }, big_get(id) { return id in disk ? { ok: true, text: disk[id] } : { ok: false }; }, big_del(id) { delete disk[id]; return true; } });
globalThis.state = {}; globalThis.saveState = () => { saves++; };
(0, eval)(fs.readFileSync(SRC, 'utf8').replace(/^<script>/, '').replace(/<\/script>\s*$/, ''));
const R = globalThis.IngRepo, C = R.core; let fail = 0; const ok = (n, c, x) => { if (!c) fail++; console.log((c ? 'PASS ' : 'FAIL ') + n + (x ? '  ' + x : '')); };
C.use(C.MemBackend());
const u8 = b => new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
const MM = '/home/user/Ingenium-Mac-Mini';
const s = await R.create({ name: 'Ingenium page' });
const vs = sh('git', ['-C', MM, 'log', '--format=%H', '-n', '3', '--', 'ingenium.html']).toString().trim().split('\n').reverse();
for (const v of vs) { await R.put(s.id, 'ingenium.html', u8(sh('git', ['-C', MM, 'show', `${v}:ingenium.html`]))); await R.put(s.id, 'notes/' + v.slice(0, 7) + '.md', 'Version ' + v + '\n'); await R.commit(s.id, 'Page at ' + v.slice(0, 7)); }
await R.branch(s.id, 'idea'); await R.tag(s.id, 'v4.0', { msg: 'Four' });
await C.mirrorNow();
const segs = state.yard.mir.segs.length, recs = Object.keys(state.yard.mir.recs).length;
ok('the copy on disk is written: segments and the record, named in the desk', segs >= 1 && recs === 1 && saves > 0, `${segs} segments, ${(Object.values(disk).reduce((a, t) => a + t.length, 0) / 1048576).toFixed(1)} MB of text`);
const head = (await R.log(s.id))[0].oid;
// the web view forgets: a fresh, empty store
C.use(C.MemBackend());
const l = await R.list();
ok('an empty store brings the repository back from the disk copy', l.length === 1 && l[0].name === 'Ingenium page', JSON.stringify(l.map(x => x.name)));
const lg = await R.log(s.id, { max: 10 });
ok('with its whole history, branch and tag', lg.length === 3 && lg[0].oid === head && l[0].branches.includes('idea') && l[0].tags.includes('v4.0'));
const page = await R.read(s.id, 'ingenium.html'), want = sh('git', ['-C', MM, 'show', `${vs[2]}:ingenium.html`]);
ok('the page reads back byte for byte', Buffer.compare(Buffer.from(page), want) === 0);
const b = await R.bundle(s.id); fs.writeFileSync(OUT + '/back.bundle', b); const cl = OUT + '/cl'; sh('git', ['clone', '-q', OUT + '/back.bundle', cl]);
let fsck = 'clean'; try { sh('git', ['-C', cl, 'fsck', '--full', '--strict']); } catch (e) { fsck = String(e.stderr); }
ok('and git clones it clean', fsck === 'clean' && sh('git', ['-C', cl, 'rev-parse', 'HEAD']).toString().trim() === head);
// later work goes out as a new segment; a gc writes the copy again and lets the old segments go
await R.put(s.id, 'README.md', '# Ingenium\n'); await R.commit(s.id, 'A readme'); await C.mirrorNow();
ok('later work adds a segment', state.yard.mir.segs.length === segs + 1);
await R.delBranch(s.id, 'idea'); const before = Object.keys(disk).length; const g = await R.gc();
console.log('   gc', JSON.stringify(g), 'disk texts', before, '->', Object.keys(disk).length);
C.use(C.MemBackend()); const l2 = await R.list(); const lg2 = await R.log(s.id, { max: 10 });
ok('after a gc the disk copy still brings everything back', l2.length === 1 && lg2.length === 4);
console.log(fail ? fail + ' failed' : 'all passed'); process.exit(fail ? 1 : 0);
