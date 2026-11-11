// INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
// NO LICENCE IS GRANTED. See LICENCE.txt.
//
// 6.82 (build/self_copy.py): the proof, in Node, that the page's own code puts an app's copy of itself back letter for letter.
// It loads the very text the page carries (build/pako/pako_deflate.min.js and build/self_copy.js, joined as the page joins them)
// and writes the page it gives back, for self_copy.py to compare with the app's own page.
//   node self_copy_prove.js <pako_deflate.min.js> <self_copy.js> <page without the copy> <meta.json> <out>
const fs = require('fs');
const [PAKO, CORE, CDX, META, OUT] = process.argv.slice(2);
if (!OUT) { console.error('usage: node self_copy_prove.js <pako> <core> <page> <meta.json> <out>'); process.exit(2); }
// the same wrapper the page uses (modules/r275.js): pako finds a module to fill, and the core stays out of it
const src = fs.readFileSync(PAKO, 'utf8') + '\n' + fs.readFileSync(CORE, 'utf8');
const made = new Function('TextEncoder', 'var module={exports:{}},exports=module.exports,require=undefined;' + src + '\n;return {pako:module.exports,rebuild:ingSelfRebuild};')(TextEncoder);
const t0 = Date.now();
const out = made.rebuild(made.pako, new Uint8Array(fs.readFileSync(CDX)), JSON.parse(fs.readFileSync(META, 'utf8')));
fs.writeFileSync(OUT, out);
console.log('put back in ' + (Date.now() - t0) + ' ms: ' + out.length + ' bytes');
