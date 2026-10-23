// Ingenium 6.3 · a page's own comments taken out of its code (editions.py, every edition; the Forge's passes from 645).
// The owner's words (23 October 2026): "clear out any dead code or unecessary lines or comments in the code that is not
// needed. I want you to remove those unecessary stales codes or comments from the code of the app please."
//   node strip_comments.js IN.html OUT.html [--html] [--keep-owner] [--word FROM=TO]
// Each classic script (no type, or a JavaScript type) is read by acorn (tools/acorn, MIT); every comment it reports is taken
// out. A comment alone on its line(s) goes with its line, so no empty line is left where it stood; one after code on a line
// goes with the spaces before it; any other leaves a line break if it held one (so the code reads as it did, semicolons and
// all) or a space between two words. Each style block's comments go the same way, read outside its quoted strings. Kept: a
// licence or copyright notice (a comment that names a licence, a copyright, SPDX, or opens with "!"), with --keep-owner a
// note that names the owner as its author (not in an edition given away), and the build's own
// markers (/*ING_BOOT_MAP*/, /*FORGE_BOOT_MAP*/: a name in capitals alone). The page's data blocks and every other script
// type are left as they are, and so are the apps a page carries in them. A script acorn cannot read stops it.
//   --html          the comments in the page's own markup go too (not in a script, a style, a text box or a title), but the
//                   build's line (<!-- BUILD=...) and a licence note stay.
//   --word FROM=TO  then, in the same scripts, every word of code (a name, a string, a template, a pattern) that still holds
//                   FROM holds TO instead, the same way everywhere, so code that only ran with FROM's part reads alike and
//                   names nothing of it. A name it would make that the page already uses stops it.
const fs = require('fs'), path = require('path');
const acorn = require(path.join(__dirname, 'acorn', 'acorn.js'));
const [IN, OUT, ...REST] = process.argv.slice(2);
const WORD = (() => { const i = REST.indexOf('--word'); if (i < 0) return null; const [f, t] = REST[i + 1].split('='); return { f, t }; })();
const HTML = REST.includes('--html');
let words = 0; const made = new Set(), names = new Set();
const page = fs.readFileSync(IN, 'utf8');
const LICENCE = /^\s*!|@license|@preserve|copyright|\(c\)\s*(19|20)\d\d|SPDX-License|licensed under|apache license|mit license|bsd license|gnu general public|all rights reserved/i;
const OWNER = REST.includes('--keep-owner') ? /Yannie D\. Forest/ : null;
const KEEP = c => LICENCE.test(c) || (OWNER && OWNER.test(c)) || /^[A-Z][A-Z0-9]*_[A-Z0-9_]+$/.test(c);
const KEEP_HTML = c => LICENCE.test(c) || /^\s*BUILD=/.test(c) || /^\[if |^\[endif/i.test(c);
const JS = t => !t || /^(text|application)\/(java|ecma)script$|^module$/i.test(t);
const SP = ch => ch === ' ' || ch === '\t';
const NL = ch => ch === '\n' || ch === '\r' || ch === '\u2028' || ch === '\u2029';
let scripts = 0, styles = 0, cut = 0, kept = 0, bytes = 0, lines = 0, marks = 0;

// one comment (code.slice(start, end)) out of code; at: where the text kept so far ends. Gives [from, to, put]: the part of
// code to take out and what to put in its place.
function span(code, start, end, at, multi) {
  let a = start; while (a > at && SP(code[a - 1])) a--;
  let b = end; while (b < code.length && SP(code[b])) b++;
  const before = a === 0 || NL(code[a - 1]), after = b >= code.length || NL(code[b]);
  if (before && after) {                 // alone on its line(s): the line goes, with its line break
    if (b < code.length) b += code[b] === '\r' && code[b + 1] === '\n' ? 2 : 1;
    lines++; return [a, b, ''];
  }
  if (after) return [a, end, multi ? '\n' : ''];  // after code: the spaces before it go too
  if (multi) return [a, end, '\n'];
  const l = code[start - 1], r = code[end];
  if (l !== undefined && !SP(l) && !NL(l) && r !== undefined && !SP(r)) return [start, end, ' '];
  return [start, SP(l) ? b : end, ''];
}
function apply(code, cs) {
  let out = '', at = 0;
  for (const c of cs) {
    if (c.start < at) continue;
    const [a, b, put] = span(code, c.start, c.end, at, c.multi);
    out += code.slice(at, a) + put; at = b; cut++; bytes += c.end - c.start;
  }
  return out + code.slice(at);
}
function stripJs(code, where) {
  const cs = [];
  const opts = { ecmaVersion: 'latest', allowHashBang: true, allowReturnOutsideFunction: true, allowAwaitOutsideFunction: true, onComment: (block, text, start, end) => { if (KEEP(text)) kept++; else cs.push({ start, end, multi: block && /[\n\r\u2028\u2029]/.test(text) }); } };
  try { acorn.parse(code, Object.assign({ sourceType: 'script' }, opts)); }
  catch (e) { cs.length = 0; try { acorn.parse(code, Object.assign({ sourceType: 'module' }, opts)); } catch (e2) { console.error('strip_comments: the script at ' + where + ' cannot be read: ' + e.message); process.exit(2); } }
  let out = apply(code, cs);
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
  const cs = []; let i = 0, q = null;
  while (i < css.length) {
    const ch = css[i];
    if (q) { if (ch === '\\') { i += 2; continue; } if (ch === q) q = null; i++; continue; }
    if (ch === '"' || ch === "'") { q = ch; i++; continue; }
    if (ch === '/' && css[i + 1] === '*') {
      const e = css.indexOf('*/', i + 2), end = e < 0 ? css.length : e + 2, text = css.slice(i + 2, e < 0 ? css.length : e);
      if (KEEP(text)) kept++; else cs.push({ start: i, end, multi: false });
      i = end; continue;
    }
    i++;
  }
  return apply(css, cs);
}
// the markup's own comments: read tag by tag (a tag's quoted values, and the text of a script, a style, a text box, a title,
// an xmp or a pre, are passed over whole)
function stripMarkup(s) {
  const cs = []; let i = 0;
  while (i < s.length) {
    const lt = s.indexOf('<', i); if (lt < 0) break;
    if (s.startsWith('<!--', lt)) {
      const e = s.indexOf('-->', lt + 4); if (e < 0) break;
      if (KEEP_HTML(s.slice(lt + 4, e))) kept++; else cs.push({ start: lt, end: e + 3, multi: false });
      i = e + 3; continue;
    }
    const m = /^<([a-zA-Z][\w-]*)/.exec(s.slice(lt, lt + 40));
    if (!m) { i = lt + 1; continue; }
    let j = lt + m[0].length, q = null;
    for (; j < s.length; j++) { const ch = s[j]; if (q) { if (ch === q) q = null; } else if (ch === '"' || ch === "'") q = ch; else if (ch === '>') break; }
    i = j + 1;
    const tag = m[1].toLowerCase();
    if (/^(script|style|textarea|title|xmp|pre)$/.test(tag)) { const z = s.toLowerCase().indexOf('</' + tag, i); i = z < 0 ? s.length : z; }
  }
  const before = cut; const out = apply(s, cs); marks = cut - before; return out;
}
const lineAt = i => page.slice(0, i).split('\n').length;
let res = page.replace(/<(script|style)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi, (m, tag, attrs, body, off) => {
  attrs = attrs || '';
  if (tag.toLowerCase() === 'style') { styles++; return '<style' + attrs + '>' + stripCss(body) + '</style>'; }
  const t = (/\btype\s*=\s*["']([^"']*)["']/i.exec(attrs) || [])[1];
  if (!JS(t) || /\bsrc\s*=/i.test(attrs)) return m;
  scripts++; return '<script' + attrs + '>' + stripJs(body, 'line ' + lineAt(off)) + '</script>';
});
if (HTML) res = stripMarkup(res);
for (const n of made) if (names.has(n)) { console.error('strip_comments: --word would make the name ' + n + ', which the page already uses'); process.exit(2); }
fs.writeFileSync(OUT, res);
console.log(JSON.stringify({ scripts, styles, cut, kept, bytes, lines, html: marks, words, before: page.length, after: res.length }));
