// Ingenium 6.2 · keep only what other parts need from a script (editions.py, for the editions without Lector).
//   node keep_decls.js IN.js OUT.js NAME[,NAME...]
// IN.js is read as a script by acorn (tools/acorn, MIT). Each of its top-level declarations (a function, or a var) is kept
// when one of the NAMEs is declared by it, or when a kept declaration reads a name it declares; everything else (its
// statements that run on their own, its other declarations) is left out. What is kept is written in its own order, its own
// text, so it runs as it did. A NAME the script does not declare stops it.
const fs = require('fs'), path = require('path');
const acorn = require(path.join(__dirname, 'acorn', 'acorn.js')), walk = require(path.join(__dirname, 'acorn', 'walk.js'));
const [IN, OUT, NAMES] = process.argv.slice(2);
const src = fs.readFileSync(IN, 'utf8');
const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script', allowReturnOutsideFunction: true });
const st = ast.body.map(s => {
  const decl = s.type === 'FunctionDeclaration' ? [s.id.name] : s.type === 'VariableDeclaration' ? s.declarations.map(d => d.id.name) : [];
  const reads = new Set(); walk.full(s, n => { if (n.type === 'Identifier') reads.add(n.name); });
  return { s, decl, reads };
});
const by = {}; st.forEach((x, i) => x.decl.forEach(d => { by[d] = i; }));
const keep = new Set(), todo = NAMES.split(',').map(n => { if (!(n in by)) { console.error('keep_decls: ' + n + ' is not declared at the top of ' + IN); process.exit(2); } return by[n]; });
while (todo.length) { const i = todo.pop(); if (keep.has(i)) continue; keep.add(i); for (const r of st[i].reads) if (r in by && !keep.has(by[r])) todo.push(by[r]); }
const kept = [...keep].sort((a, b) => a - b);
fs.writeFileSync(OUT, kept.map(i => src.slice(st[i].s.start, st[i].s.end)).join('\n') + '\n');
console.log(JSON.stringify({ kept: kept.map(i => st[i].decl.join(',')), bytes: kept.reduce((a, i) => a + st[i].s.end - st[i].s.start, 0), of: src.length }));
