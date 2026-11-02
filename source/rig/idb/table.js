// The table of the library tests: each test on each implementation, from the JSON results the runners write.
//   node rig/idb/table.js chromium.json webkit.json reference.json [--md table.md] [--url page]
// Exits 1 when any test failed on any implementation, or did not run on one where it ran on another, or when a result is
// missing or (with --url) was made on another page.
const fs = require('fs');
const args = process.argv.slice(2), mdAt = args.indexOf('--md'), md = mdAt >= 0 ? args.splice(mdAt, 2)[1] : null;
const urlAt = args.indexOf('--url'), URL_ = urlAt >= 0 ? args.splice(urlAt, 2)[1] : null;
const runs = args.map(f => { try { const r = JSON.parse(fs.readFileSync(f, 'utf8')); return URL_ && r.url !== URL_ ? { impl: r.impl || f, missing: true, results: [] } : r; } catch (e) { return { impl: f, missing: true, results: [] }; } });
const names = []; runs.forEach(r => r.results.forEach(x => { if (names.indexOf(x.name) < 0) names.push(x.name); }));
const cell = (r, n) => { if (r.missing) return 'no result'; const x = r.results.find(y => y.name === n); return !x ? 'not run' : x.ok ? 'PASS' : 'FAIL'; };
const head = ['test'].concat(runs.map(r => r.impl + (r.engine ? ' (' + r.engine + (r.reference ? ', fake-indexeddb ' + r.reference['fake-indexeddb'] : '') + ')' : '')));
const rows = names.map(n => [n].concat(runs.map(r => cell(r, n))));
const w = Math.min(96, Math.max(...rows.map(r => r[0].length), 4));
console.log('\n' + 'test'.padEnd(w) + '  ' + runs.map(r => r.impl.padEnd(10)).join(' '));
rows.forEach(r => console.log((r[0].length > w ? r[0].slice(0, w - 1) + '…' : r[0]).padEnd(w) + '  ' + r.slice(1).map(c => c.padEnd(10)).join(' ')));
const tot = runs.map(r => r.missing ? 'no result' : r.results.filter(x => x.ok).length + '/' + r.results.length);
console.log('passed'.padEnd(w) + '  ' + tot.map(t => t.padEnd(10)).join(' '));
runs.forEach(r => { if (r.engine) console.log('  ' + r.impl + ': ' + r.engine + (r.reference ? ', fake-indexeddb ' + r.reference['fake-indexeddb'] + ' (esbuild ' + r.reference.esbuild + ')' : '') + ', ' + r.url); });
if (md) fs.writeFileSync(md, '| ' + head.join(' | ') + ' |\n|' + head.map(() => '---').join('|') + '|\n' + rows.map(r => '| ' + r.join(' | ') + ' |').join('\n') + '\n| passed | ' + tot.join(' | ') + ' |\n');
const bad = rows.some(r => r.slice(1).some(c => c !== 'PASS')) || !rows.length;
process.exit(bad ? 1 : 0);
