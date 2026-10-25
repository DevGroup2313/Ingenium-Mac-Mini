// Ingenium 6.7 · the pages rig/t_62_capacity.js edits: a small working app, its code in several parts, and embedded data as
// Ingenium embeds its own (base64, unbroken, each block the whole content of a script block of its own type).
// What the test reads in them: the heading <h1 id="capHead">The Offline Project, master</h1>, which a change rewrites; the
// app sets window.__capReady once its code has run and read its data; ten data blocks or more, each over 400,000
// characters (what Build counts as data, modules/r138.js), so a page is 12 MB at the least.
//   node rig/make_big.js <out.html> <size in MB, 12 or more>
// The data is the same for the same size (a fixed seed), so two runs make the same page.
const fs = require('fs');
const [OUT, MBS] = process.argv.slice(2);
const MB = Math.max(12, Number(MBS) || 12), TOTAL = Math.round(MB * 1048576);
if (!OUT) { console.log('usage: node rig/make_big.js <out.html> <size in MB, 12 or more>'); process.exit(2); }

// the code: twelve parts of plain functions, about 16 KB each, that the app calls when it starts
const parts = [];
for (let k = 0; k < 12; k++) {
  const fns = [];
  for (let j = 0; j < 60; j++) fns.push(`function part${k}_${j}(list){var total=0;for(var i=0;i<list.length;i++){total+=list[i]*${j + 1}%${k + 7};}return total;}`);
  parts.push(`/* part ${k + 1} of the app's code */\nwindow.capParts=(window.capParts||0)+1;\n${fns.join('\n')}\nwindow.capSum=(window.capSum||0)+part${k}_0([1,2,3]);`);
}
const head = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>The Offline Project, master</title>
<style>body{font:16px/1.5 Georgia,serif;margin:40px;color:#241d31;background:#fbf8f2}h1{font-weight:600}#capNote{color:#5a5368}</style>
</head><body>
<h1 id="capHead">The Offline Project, master</h1>
<p id="capNote">Reading its data…</p>
`;
const code = parts.map(t => `<script>\n${t}\n</script>\n`).join('');
const tail = `<script>
(function(){var n=0,bytes=0,list=document.querySelectorAll('script[type="application/x-cap-data"]');
  for(var i=0;i<list.length;i++){n++;bytes+=list[i].textContent.length;}
  document.getElementById('capNote').textContent='This app carries '+n+' blocks of data ('+Math.round(bytes/1048576)+' MB) and '+(window.capParts||0)+' parts of code.';
  window.__capReady=true;})();
</script>
</body></html>
`;
// the data blocks fill the rest, about 1 MB each, ten at the least
const wrapA = i => `<script type="application/x-cap-data" id="capData${i}">`, wrapB = '</script>\n';
const room = TOTAL - Buffer.byteLength(head + code + tail);
const n = Math.max(10, Math.floor(room / 1048576));
let seed = 0x2545f491;
function bytes(len) { const b = Buffer.alloc(len); for (let i = 0; i < len; i++) { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; b[i] = seed & 255; } return b; }
const fd = fs.openSync(OUT, 'w');
fs.writeSync(fd, head + code);
let left = room;
for (let i = 1; i <= n; i++) {
  const over = Buffer.byteLength(wrapA(i) + wrapB), want = Math.floor(left / (n - i + 1)) - over;
  const chars = Math.max(400004, want - (want % 4)), raw = bytes(chars / 4 * 3);
  fs.writeSync(fd, wrapA(i) + raw.toString('base64') + wrapB);
  left -= over + chars;
}
fs.writeSync(fd, tail); fs.closeSync(fd);
console.log(`${OUT}: ${(fs.statSync(OUT).size / 1048576).toFixed(1)} MB, ${parts.length} parts of code, ${n} blocks of data`);
