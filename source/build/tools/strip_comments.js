// Ingenium 6.2 · a page's own comments taken out of its scripts and styles (editions.py, for the editions without Lector:
// the notes beside the code speak of the owner, of Lector and of how each part was made, and a page given away or shown in
// public carries the code alone).
//   node strip_comments.js IN.html OUT.html
// Each classic script (no type, or a JavaScript type) is read by acorn (tools/acorn, MIT); every comment it reports is taken
// out: a comment that holds a line break leaves a line break (so the code reads as it did, semicolons and all), any other
// leaves a space. Each style block's comments go the same way, read outside its quoted strings. Kept: a licence or
// copyright notice (a comment that names a licence, a copyright, SPDX, or opens with "!"), and the build's own markers
// (/*ING_...*/). The page's HTML comments, its data blocks and every other script type are left as they are. A script
// acorn cannot read stops it.
//   --word FROM=TO  then, in the same scripts, every word of code (a name, a string, a template, a pattern) that still holds
//                   FROM holds TO instead, the same way everywhere, so code that only ran with FROM's part reads alike and
//                   names nothing of it. A name it would make that the page already uses stops it.
const fs = require('fs'), path = require('path');
const acorn = require(path.join(__dirname, 'acorn', 'acorn.js'));
const [IN, OUT, ...REST] = process.argv.slice(2);
const WORD = (() => { const i = REST.indexOf('--word'); if (i < 0) return null; const [f, t] = REST[i + 1].split('='); return { f, t }; })();
let words = 0; const made = new Set(), names = new Set();
const page = fs.readFileSync(IN, 'utf8');
const KEEP = c => /^\s*!|@license|@preserve|copyright|\(c\)\s*(19|20)\d\d|SPDX-License|licensed under|apache license|mit license|bsd license|gnu general public/i.test(c) || /^ING_[A-Z_]+$/.test(c);
const JS = t => !t || /^(text|application)\/(java|ecma)script$|^module$/i.test(t);
let scripts = 0, styles = 0, cut = 0, kept = 0, bytes = 0;

function stripJs(code, where) {
  const cs = [];
  const opts = { ecmaVersion: 'latest', allowHashBang: true, allowReturnOutsideFunction: true, allowAwaitOutsideFunction: true, onComment: (block, text, start, end) => cs.push({ block, text, start, end }) };
  try { acorn.parse(code, Object.assign({ sourceType: 'script' }, opts)); }
  catch (e) { cs.length = 0; try { acorn.parse(code, Object.assign({ sourceType: 'module' }, opts)); } catch (e2) { console.error('strip_comments: the script at ' + where + ' cannot be read: ' + e.message); process.exit(2); } }
  let out = '', at = 0;
  for (const c of cs) {
    if (KEEP(c.text)) { kept++; continue; }
    out += code.slice(at, c.start) + (c.block && /[\n\r\u2028\u2029]/.test(c.text) ? '\n' : c.block ? ' ' : '');
    at = c.end; cut++; bytes += c.end - c.start;
  }
  out += code.slice(at);
  if (!WORD) return out;  // every script is read, so a name made here is checked against the whole page
  const hits = [];
  for (const t of acorn.tokenizer(out, { ecmaVersion: 'latest', allowHashBang: true, allowReturnOutsideFunction: true, allowAwaitOutsideFunction: true })) {
    const raw = out.slice(t.start, t.end);
    if (t.type.label === 'name') names.add(raw);
    if (raw.indexOf(WORD.f) >= 0) { hits.push([t.start, t.end, raw.split(WORD.f).join(WORD.t)]); if (t.type.label === 'name') made.add(raw.split(WORD.f).join(WORD.t)); }
  }
  for (let k = hits.length - 1; k >= 0; k--) { const [a, b, r] = hits[k]; out = out.slice(0, a) + r + out.slice(b); words++; }
  return out;
}
function stripCss(css) {
  let out = '', i = 0, q = null;
  while (i < css.length) {
    const ch = css[i];
    if (q) { out += ch; if (ch === '\\') { out += css[i + 1] || ''; i += 2; continue; } if (ch === q) q = null; i++; continue; }
    if (ch === '"' || ch === "'") { q = ch; out += ch; i++; continue; }
    if (ch === '/' && css[i + 1] === '*') {
      const e = css.indexOf('*/', i + 2), end = e < 0 ? css.length : e + 2, text = css.slice(i + 2, e < 0 ? css.length : e);
      if (KEEP(text)) { out += css.slice(i, end); kept++; } else { out += ' '; cut++; bytes += end - i; }
      i = end; continue;
    }
    out += ch; i++;
  }
  return out;
}
const lineAt = i => page.slice(0, i).split('\n').length;
const res = page.replace(/<(script|style)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi, (m, tag, attrs, body, off) => {
  attrs = attrs || '';
  if (tag.toLowerCase() === 'style') { styles++; return '<style' + attrs + '>' + stripCss(body) + '</style>'; }
  const t = (/\btype\s*=\s*["']([^"']*)["']/i.exec(attrs) || [])[1];
  if (!JS(t) || /\bsrc\s*=/i.test(attrs)) return m;
  scripts++; return '<script' + attrs + '>' + stripJs(body, 'line ' + lineAt(off)) + '</script>';
});
for (const n of made) if (names.has(n)) { console.error('strip_comments: --word would make the name ' + n + ', which the page already uses'); process.exit(2); }
fs.writeFileSync(OUT, res);
console.log(JSON.stringify({ scripts, styles, cut, kept, bytes, words, before: page.length, after: res.length }));
