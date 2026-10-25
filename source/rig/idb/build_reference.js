// Builds (or finds) the browser bundle of fake-indexeddb, the reference implementation of the IndexedDB standard, under /tmp:
//   node rig/idb/build_reference.js            prints the path of the bundle, building it first when it is not there
// npm installs fake-indexeddb and esbuild into /tmp/idb-ref (never into the repositories), and esbuild bundles
// rig/idb/reference_entry.js into an IIFE that the reference runner injects before any page script.
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const FAKE = '6.2.5', ESBUILD = '0.28.2', DIR = process.env.IDB_REF_DIR || '/tmp/idb-ref';
const OUT = path.join(DIR, 'fake-indexeddb-' + FAKE + '.iife.js');
const BUILD_MJS = `
import { build } from 'esbuild'; import fs from 'fs';
const P = [
  [/lib[\\/]RecordStore\\.js$/, 'key instanceof FDBKeyRange', '(key !== null && typeof key === "object" && "lowerOpen" in key && typeof key.includes === "function")', 3],
  [/lib[\\/]cmp\\.js$/, 'x instanceof ArrayBuffer', 'Object.prototype.toString.call(x) === "[object ArrayBuffer]"', 1],
  [/lib[\\/]valueToKeyWithoutThrowing\\.js$/, 'input instanceof ArrayBuffer', 'Object.prototype.toString.call(input) === "[object ArrayBuffer]"', 2]];
const shape = { name: 'shape', setup(b) { b.onLoad({ filter: /fake-indexeddb[\\/]build[\\/]esm[\\/].*\\.js$/ }, a => { let t = fs.readFileSync(a.path, 'utf8');
  for (const [re, from, to, n] of P) if (re.test(a.path)) { const got = t.split(from).length - 1; if (got !== n) throw new Error(a.path + ': ' + from + ' found ' + got + ' times, not ' + n); t = t.split(from).join(to); }
  return { contents: t, loader: 'js' }; }); } };
await build({ entryPoints: ['entry.js'], bundle: true, format: 'iife', target: 'es2020', outfile: process.argv[2], logLevel: 'warning', plugins: [shape] });
`;
function build() {
  const entry = path.join(__dirname, 'reference_entry.js');
  const stamp = OUT + '.src';
  const src = fs.readFileSync(entry, 'utf8') + '\n/* build.mjs */\n' + BUILD_MJS;
  if (fs.existsSync(OUT) && fs.existsSync(stamp) && fs.readFileSync(stamp, 'utf8') === src) return OUT;
  fs.mkdirSync(DIR, { recursive: true });
  const have = (p) => { try { return JSON.parse(fs.readFileSync(path.join(DIR, 'node_modules', p, 'package.json'), 'utf8')).version; } catch (e) { return null; } };
  if (!fs.existsSync(path.join(DIR, 'package.json'))) fs.writeFileSync(path.join(DIR, 'package.json'), JSON.stringify({ name: 'idb-ref', private: true }));
  if (have('fake-indexeddb') !== FAKE || have('esbuild') !== ESBUILD)
    execFileSync('npm', ['install', '--no-audit', '--no-fund', '--prefix', DIR, 'fake-indexeddb@' + FAKE, 'esbuild@' + ESBUILD], { stdio: ['ignore', 'pipe', 'inherit'] });
  fs.copyFileSync(entry, path.join(DIR, 'entry.js'));
  // Two tabs share one set of stores (reference_entry.js), each tab with its own copy of fake-indexeddb's classes. The few
  // places where fake-indexeddb's store layer asks whether a key is one of its own key ranges, or a binary key one of its
  // realm's ArrayBuffers, ask it by shape instead, so that a key made in the other tab is read the same; within one tab
  // nothing changes. Each patch must match exactly as many times as it says, or the build stops.
  fs.writeFileSync(path.join(DIR, 'build.mjs'), BUILD_MJS);
  execFileSync(process.execPath, [path.join(DIR, 'build.mjs'), OUT], { cwd: DIR, stdio: 'inherit' });
  const lic = JSON.parse(fs.readFileSync(path.join(DIR, 'node_modules', 'fake-indexeddb', 'package.json'), 'utf8')).license;
  fs.writeFileSync(OUT, '/* fake-indexeddb ' + FAKE + ' (licence ' + lic + ', https://github.com/dumbmatter/fakeIndexedDB), bundled by esbuild ' + ESBUILD + ' for Ingenium\'s library tests */\n' + fs.readFileSync(OUT, 'utf8'));
  fs.writeFileSync(stamp, src);
  return OUT;
}
module.exports = { build, FAKE, ESBUILD };
if (require.main === module) console.log(build());
