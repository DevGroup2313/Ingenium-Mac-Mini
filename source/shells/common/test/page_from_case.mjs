// INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
// Writes the page of one case of vectors.json (make_vectors.mjs) to a file, for the shells' checks on GitHub's machines: a page
// signed with a test key the shells do not carry, which each shell must refuse ("is signed with a key this app does not know").
//   node page_from_case.mjs <vectors.json> <case name> <out.html>
import fs from 'node:fs';
const [vec, name, out] = process.argv.slice(2);
const c = JSON.parse(fs.readFileSync(vec, 'utf8')).cases.find((x) => x.name === name);
if (!c) { console.error('no case named', name); process.exit(1); }
fs.writeFileSync(out, Buffer.concat(c.parts.map((p) => p.b64 != null ? Buffer.from(p.b64, 'base64') : Buffer.from(p.rep.repeat(p.count), 'utf8'))));
console.log(JSON.stringify({ out, bytes: fs.statSync(out).size, want: c.want, kid: c.kid || null }));
