// Ingenium 6.3 · proof that strip_comments.js changed no code: each classic script of two pages, read by acorn, must hold the
// same words of code in the same order with a line break between the same two words (a comment that held a line break counts
// as one, as JavaScript counts it; before a script's first word it means nothing); each style the same rules once its comments and spaces are set aside; the markup the same
// once its comments are. Any difference stops it, with where.
//   node same_code.js BEFORE.html AFTER.html
const fs = require('fs'), path = require('path');
const acorn = require(path.join(__dirname, 'acorn', 'acorn.js'));
const [A, B] = process.argv.slice(2);
const JS = t => !t || /^(text|application)\/(java|ecma)script$|^module$/i.test(t);
function parts(page) {
  const js = [], css = [], rest = [];
  const r = page.replace(/<(script|style)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi, (m, tag, attrs, body) => {
    attrs = attrs || '';
    if (tag.toLowerCase() === 'style') { css.push(body); return '<style' + attrs + '></style>'; }
    const t = (/\btype\s*=\s*["']([^"']*)["']/i.exec(attrs) || [])[1];
    if (!JS(t) || /\bsrc\s*=/i.test(attrs)) return m;
    js.push(body); return '<script' + attrs + '></script>';
  });
  return { js, css, markup: r };
}
function words(code) {
  const o = { ecmaVersion: 'latest', allowHashBang: true, allowReturnOutsideFunction: true, allowAwaitOutsideFunction: true };
  let toks;
  const read = st => { const t = []; let last = 0; const it = acorn.tokenizer(code, Object.assign({ sourceType: st }, o));
    for (const k of it) { const gap = code.slice(last, k.start); t.push((t.length && /[\n\r\u2028\u2029]/.test(gap) ? '\n' : '') + k.type.label + ':' + code.slice(k.start, k.end)); last = k.end; } return t; };
  try { toks = read('script'); } catch (e) { toks = read('module'); }
  return toks;
}
const cssWords = c => c.replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\/\*[\s\S]*?\*\//g, (m, q) => q || ' ').replace(/\s+/g, ' ').trim();
const marks = m => m.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ');
const a = parts(fs.readFileSync(A, 'utf8')), b = parts(fs.readFileSync(B, 'utf8'));
const fail = m => { console.error('same_code: ' + m); process.exit(1); };
if (a.js.length !== b.js.length) fail('scripts: ' + a.js.length + ' before, ' + b.js.length + ' after');
let n = 0;
for (let i = 0; i < a.js.length; i++) {
  const x = words(a.js[i]), y = words(b.js[i]);
  if (x.length !== y.length) fail('script ' + i + ': ' + x.length + ' words before, ' + y.length + ' after');
  for (let k = 0; k < x.length; k++) if (x[k] !== y[k]) fail('script ' + i + ', word ' + k + ': ' + JSON.stringify(x[k]).slice(0, 120) + ' became ' + JSON.stringify(y[k]).slice(0, 120) + ' near ' + JSON.stringify(x.slice(Math.max(0, k - 4), k).join(' ')).slice(0, 200));
  n += x.length;
}
if (a.css.length !== b.css.length) fail('styles differ in number');
for (let i = 0; i < a.css.length; i++) if (cssWords(a.css[i]) !== cssWords(b.css[i])) fail('style ' + i + ' differs');
const ma = marks(a.markup), mb = marks(b.markup);
if (ma !== mb) { let k = 0; while (ma[k] === mb[k]) k++; fail('the markup differs near ' + JSON.stringify(ma.slice(Math.max(0, k - 80), k + 80))); }
console.log(JSON.stringify({ scripts: a.js.length, words: n, styles: a.css.length, same: true }));
