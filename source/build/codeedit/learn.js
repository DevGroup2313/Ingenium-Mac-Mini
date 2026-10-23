// Glossa, Calm and Lima: the editor as a place to learn and to read calmly (6.3 / 645).
// The owner's words (23 October 2026): "I want to be able to go through all of my apps line by line [...] and be able to make
// surgical edits to the code of the apps and also be able clear out any dead code or unecessary lines or comments", "I want
// AuDHD accessibility", and to "curate the app for me and my limited coding experience as a Humanities based scholar and
// researcher with limited technical background that is interested in learning and mastering the new skills."
//   Glossa (a gloss, as in a manuscript's margin): where the cursor is in the page's structure, what the word under it means,
//     and what its line does, in plain words.
//   Calm: softer colours, more room between lines, and only the part being worked on in full colour.
//   Lima (the file, the tool that smooths: Horace's "limae labor", the labour of the file, is the polishing of a text): what can
//     be cleared from the code (notes no one reads, empty lines,
//     spaces at line ends, styles and functions nothing uses), shown first, removed only when chosen, all undone with one Undo.
import { syntaxTree, ensureSyntaxTree } from "@codemirror/language";
import { ViewPlugin, Decoration } from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";
import { GLOSS, KINDS } from "./glossa.js";

const text = (s, n) => s.sliceDoc(n.from, n.to);
const clip = (t, n) => (t.length > n ? t.slice(0, n - 1) + "…" : t);

/* ---------- Glossa ---------- */
function tagLabel(s, el) {
  const open = el.getChild("OpenTag") || el.getChild("SelfClosingTag"); if (!open) return null;
  const tn = open.getChild("TagName"); if (!tn) return null;
  let label = "<" + text(s, tn);
  for (let a = open.firstChild; a; a = a.nextSibling) if (a.name === "Attribute") {
    const an = a.getChild("AttributeName"), av = a.getChild("AttributeValue");
    if (an && av) { const k = text(s, an); if (k === "id" || k === "class") label += " " + k + "=" + clip(text(s, av), 34); }
  }
  return label + ">";
}
function nameOf(s, n, kinds) { for (const k of kinds) { const c = n.getChild(k); if (c) return text(s, c); } return ""; }
const LOOP = /^(For|ForIn|ForOf|While|Do)Statement$/;
export function where(s, pos) {
  const out = [];
  for (let n = syntaxTree(s).resolveInner(pos, -1); n; n = n.parent) {
    const nm = n.name;
    if (nm === "Element") { const l = tagLabel(s, n); if (l) out.push(l); }
    else if (nm === "FunctionDeclaration" || nm === "MethodDeclaration") out.push("the function " + nameOf(s, n, ["VariableDefinition", "PropertyDefinition"]) + "()");
    else if (nm === "ClassDeclaration") out.push("the class " + nameOf(s, n, ["VariableDefinition"]));
    else if (nm === "ArrowFunction" || nm === "FunctionExpression") out.push("a function");
    else if (nm === "IfStatement") out.push("a check (if)");
    else if (LOOP.test(nm)) out.push("a loop");
    else if (nm === "TryStatement") out.push("a try");
    else if (nm === "SwitchStatement") out.push("a choice (switch)");
    else if (nm === "RuleSet") out.push("the style " + clip(s.sliceDoc(n.from, Math.min(n.to, n.from + 300)).split("{")[0].trim(), 50));
    else if (/^(Media|Keyframes|Supports)Statement$/.test(nm)) out.push("@" + nm.replace("Statement", "").toLowerCase());
  }
  return out.reverse();
}
function lookup(key) {
  if (GLOSS[key]) return { key, text: GLOSS[key] };
  // a property with a side or a part (margin-top, border-left-color): what its first word means, and which side or part
  const m = /^css:([a-z]+)-([a-z-]+)$/.exec(key);
  if (m && GLOSS["css:" + m[1]]) return { key, text: "The " + m[2].replace(/-/g, " ") + " part of " + m[1] + ". " + GLOSS["css:" + m[1]] };
  return null;
}
export function wordAt(s, pos, lang) {
  const tree = syntaxTree(s);
  for (const side of [1, -1]) {
    const n = tree.resolveInner(pos, side); if (!n || n.to - n.from > 400) continue;
    const t = text(s, n), lt = t.toLowerCase(), nm = n.name, par = n.parent ? n.parent.name : "";
    let g = null;
    if (nm === "TagName") g = lookup("html:" + lt);
    else if (nm === "AttributeName") g = lookup("attr:" + lt) || (/^data-/.test(lt) && lookup("attr:data-*")) || (/^aria-/.test(lt) && lookup("attr:aria-label"));
    else if (nm === "PropertyName" && (par === "Declaration" || lang === "css")) g = lookup("css:" + lt);
    else if (nm === "AtKeyword") g = lookup("css:" + lt);
    else if (nm === "Important") g = lookup("css:!important");
    else if (/^(PseudoClassName|:)/.test(nm) || /^:/.test(t)) g = lookup("css::" + lt.replace(/^:+/, ""));
    else if (/Comment$/.test(nm)) g = { key: "comment", text: KINDS.comment };
    else if (nm === "String" || nm === "TemplateString" || nm === "AttributeValue") g = { key: "string", text: KINDS.string };
    else if (nm === "Number") g = { key: "number", text: KINDS.number };
    if (!g && /^[\w$!=&|>@:-]+$/.test(t)) g = lookup("js:" + t) || lookup("js:" + lt) || lookup("css:" + lt) || lookup("html:" + lt) || lookup("attr:" + lt);
    if (g) return Object.assign({ word: clip(t, 40) }, g);
  }
  // the word itself, when the reading gives nothing more
  const line = s.doc.lineAt(pos), col = pos - line.from, lt2 = line.text;
  let a = col, b = col; while (a > 0 && /[\w$-]/.test(lt2[a - 1])) a--; while (b < lt2.length && /[\w$-]/.test(lt2[b])) b++;
  const w = lt2.slice(a, b); if (!w) return null;
  const g = lookup("js:" + w) || lookup("css:" + w.toLowerCase()) || lookup("html:" + w.toLowerCase()) || lookup("attr:" + w.toLowerCase());
  return g ? Object.assign({ word: w }, g) : null;
}
const STMT = /^(FunctionDeclaration|ClassDeclaration|VariableDeclaration|ReturnStatement|IfStatement|ExpressionStatement|Declaration|RuleSet|Element|LineComment|BlockComment|Comment|(For|ForIn|ForOf|While|Do)Statement)$/;
export function lineSays(s, pos) {
  const line = s.doc.lineAt(pos), m = /\S/.exec(line.text); if (!m) return "An empty line.";
  const at = line.from + m.index;
  // the innermost statement around the cursor that starts on this line; failing that, the one its first word begins
  let n = syntaxTree(s).resolveInner(Math.max(pos, at + 1), -1);
  while (n && !(STMT.test(n.name) && n.from >= line.from)) n = n.parent;
  if (!n) { n = syntaxTree(s).resolveInner(at + 1, -1); while (n && !(STMT.test(n.name) && n.from >= line.from - 1)) n = n.parent; }
  if (!n) { const n2 = syntaxTree(s).resolveInner(at + 1, -1); if (n2 && /Comment$/.test(n2.name)) return KINDS.comment; return ""; }
  const nm = n.name;
  if (/Comment$/.test(nm)) return KINDS.comment;
  if (nm === "Element") { const tn = (n.getChild("OpenTag") || n.getChild("SelfClosingTag") || n).getChild("TagName"); const tag = tn ? text(s, tn).toLowerCase() : "";
    return "Starts <" + tag + ">" + (GLOSS["html:" + tag] ? ": " + GLOSS["html:" + tag].charAt(0).toLowerCase() + GLOSS["html:" + tag].slice(1) : "."); }
  if (nm === "Declaration") { const p = n.getChild("PropertyName"), k = p ? text(s, p).toLowerCase() : "";
    return "Sets " + k + (GLOSS["css:" + k] ? ": " + GLOSS["css:" + k].charAt(0).toLowerCase() + GLOSS["css:" + k].slice(1) : "."); }
  if (nm === "RuleSet") return KINDS.rule;
  if (nm === "FunctionDeclaration") return "Starts the function " + nameOf(s, n, ["VariableDefinition"]) + ": steps grouped under a name, run when it is called.";
  if (nm === "ClassDeclaration") return "Starts the class " + nameOf(s, n, ["VariableDefinition"]) + ": a pattern for making objects.";
  if (nm === "VariableDeclaration") { const v = n.getChild("VariableDefinition"); return "Makes a name" + (v ? ", " + text(s, v) + "," : "") + " and gives it a value."; }
  if (nm === "ReturnStatement") return KINDS["return"];
  if (nm === "IfStatement") return "Checks something: what follows runs only if it is true.";
  if (LOOP.test(nm)) return KINDS.loop;
  if (nm === "ExpressionStatement") { const c = n.firstChild;
    if (c && c.name === "CallExpression") { const f = c.firstChild; return "Calls " + clip(f ? text(s, f) : "a function", 60) + ": runs it."; }
    if (c && c.name === "AssignmentExpression") { const f = c.firstChild; return "Gives " + clip(f ? text(s, f) : "something", 60) + " a new value."; } }
  return "";
}

/* ---------- Calm: only the part being worked on in full colour ---------- */
const BLOCK = /^(Element|RuleSet|FunctionDeclaration|MethodDeclaration|ClassDeclaration|(Media|Keyframes)Statement)$/;
function partAround(s, pos) {
  for (let n = syntaxTree(s).resolveInner(pos, -1); n; n = n.parent) if (BLOCK.test(n.name) && n.to - n.from < s.doc.length * 0.9) {
    if (n.name === "Element" && s.doc.lineAt(n.from).number === s.doc.lineAt(n.to).number) continue;
    return { from: s.doc.lineAt(n.from).from, to: s.doc.lineAt(n.to).to };
  }
  return null;
}
const dim = Decoration.line({ class: "ic-dim" });
export const calmFocus = ViewPlugin.fromClass(class {
  constructor(v) { this.deco = this.make(v); }
  update(u) { if (u.docChanged || u.selectionSet || u.viewportChanged) this.deco = this.make(u.view); }
  make(v) {
    const s = v.state, part = partAround(s, s.selection.main.head), b = new RangeSetBuilder();
    if (!part) return b.finish();
    for (const r of v.visibleRanges) for (let p = r.from; p <= r.to;) { const l = s.doc.lineAt(p); if (l.to < part.from || l.from > part.to) b.add(l.from, l.from, dim); p = l.to + 1; }
    return b.finish();
  }
}, { decorations: v => v.deco });

/* ---------- Lima ---------- */
// notes that always stay: licences and copyrights, and the marks an app reads in itself
const KEEP = /copyright|licen[cs]e|©|\(c\)\s*\d{4}|@license|@preserve|SPDX|^\/\*!|^<!--\s*\[if|sourceMappingURL/i;
const MARK = /^\/\*\s*[A-Z][A-Z0-9_]{2,}\s*\*\/$|^<!--\s*[A-Z][A-Z0-9_]{2,}\b|\bBUILD\s*=|\bPASS \d{3}\b/;   // capitals only: a mark, not a sentence
const keepNote = c => KEEP.test(c) || MARK.test(c);
function wholeLines(s, from, to) {
  const a = s.doc.lineAt(from), b = s.doc.lineAt(to);
  if (/^\s*$/.test(s.sliceDoc(a.from, from)) && /^\s*$/.test(s.sliceDoc(to, b.to))) return { from: a.from, to: Math.min(s.doc.length, b.to + 1) };
  let f = from; while (f > a.from && /[ \t]/.test(s.sliceDoc(f - 1, f))) f--;
  return { from: f, to };
}
export function tidyScan(s, budgetMs) {
  const tree = ensureSyntaxTree(s, s.doc.length, budgetMs || 4000), complete = !!tree && tree.length >= s.doc.length;
  const t = tree || syntaxTree(s), all = s.doc.toString();
  const notes = [], kept = [], selectors = [], rules = [], fns = [];
  t.iterate({ enter: n => {
    if (/Comment$/.test(n.name)) { const c = s.sliceDoc(n.from, n.to); (keepNote(c.trim()) ? kept : notes).push({ from: n.from, to: n.to, text: c }); return false; }
    if (n.name === "RuleSet") { const block = n.node.getChild("Block"); const selEnd = block ? block.from : n.to;
      selectors.push([n.from, selEnd]); rules.push({ from: n.from, to: n.to, sel: s.sliceDoc(n.from, selEnd).trim() }); }
    if (n.name === "FunctionDeclaration") { const v = n.node.getChild("VariableDefinition"); if (v) fns.push({ from: n.from, to: n.to, name: s.sliceDoc(v.from, v.to) }); }
  } });
  // empty lines: two or more in a row become one; spaces at the ends of lines
  const blanks = [], trails = []; let run = [];
  for (let i = 1; i <= s.doc.lines; i++) { const l = s.doc.line(i);
    if (/^\s*$/.test(l.text)) run.push(l); else { if (run.length > 1) blanks.push({ from: run[1].from, to: run[run.length - 1].to + 1, n: run.length - 1 }); run = []; }
    const m = /[ \t]+$/.exec(l.text); if (m && !/^\s*$/.test(l.text)) trails.push({ from: l.from + m.index, to: l.to }); }
  // styles nothing names: every class or id in the selector is named nowhere outside the style rules
  let outside = all; selectors.slice().sort((a, b) => b[0] - a[0]).forEach(r => { outside = outside.slice(0, r[0]) + " ".repeat(r[1] - r[0]) + outside.slice(r[1]); });
  const used = new Map(); const isUsed = nm => { if (!used.has(nm)) used.set(nm, new RegExp("(^|[^\\w-])" + nm.replace(/[-]/g, "\\-") + "(?![\\w-])").test(outside)); return used.get(nm); };
  const styles = rules.filter(r => { const parts = r.sel.split(","); return parts.length && parts.every(p => { const names = (p.match(/[.#][A-Za-z_][\w-]*/g) || []).map(x => x.slice(1)); return names.length && names.some(nm => !isUsed(nm)); }); })
    .map(r => ({ from: r.from, to: r.to, label: clip(r.sel, 70), line: s.doc.lineAt(r.from).number }));
  // functions nothing calls: their name appears once, where they are made
  const functions = fns.filter(f => (all.match(new RegExp("(^|[^\\w$])" + f.name.replace(/\$/g, "\\$") + "(?![\\w$])", "g")) || []).length === 1)
    .map(f => ({ from: f.from, to: f.to, label: f.name + "()", line: s.doc.lineAt(f.from).number }));
  return { complete, notes, kept: kept.length, blanks, trails, styles, functions };
}
export function tidyChanges(s, kind, items) {
  const ch = items.map(it => kind === "notes" || kind === "styles" || kind === "functions" ? Object.assign(wholeLines(s, it.from, it.to), { insert: "" }) : { from: it.from, to: it.to, insert: "" });
  ch.sort((a, b) => a.from - b.from); const out = []; let last = -1;
  for (const c of ch) { if (c.from < last) continue; out.push(c); last = c.to; }
  return out;
}
