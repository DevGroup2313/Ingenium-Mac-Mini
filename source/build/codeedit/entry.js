// Ingenium and The Forge · the code editor (6.2 / 645). CodeMirror 6 (MIT), bundled whole by make_code_editor.py into
// build/thoughts/code_editor_core.html, which both apps carry, so it works with no connection.
// The owner's words (23 October 2026): "I want them to be great platforms and workbench to do serious coding, creating and
// developing apps and softwares both with AI and without AI." Until now every place either app shows code to be edited was a
// plain text box: no colours, no search and replace, no folding, no second cursor, and a large file held the page.
// IngEditor.attach(textarea) puts an editor in the box's place and keeps the box as the way the rest of the app reaches the text:
// its value, its selection, focus, its input events, hidden and disabled all go on working as before.
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor,
  rectangularSelection, crosshairCursor, highlightActiveLine, Decoration, WidgetType } from "@codemirror/view";
import { EditorState, Compartment, StateField, StateEffect, RangeSetBuilder, EditorSelection } from "@codemirror/state";
import { defaultKeymap, history, historyKeymap, indentMore, indentLess, undo, redo } from "@codemirror/commands";
import { indentOnInput, syntaxHighlighting, bracketMatching, foldGutter, foldKeymap, StreamLanguage, indentUnit,
  foldAll, unfoldAll, syntaxTree, ensureSyntaxTree } from "@codemirror/language";
import { classHighlighter } from "@lezer/highlight";
import { searchKeymap, highlightSelectionMatches, openSearchPanel, gotoLine, search } from "@codemirror/search";
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import { MergeView, unifiedMergeView } from "@codemirror/merge";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { python } from "@codemirror/lang-python";
import { markdown } from "@codemirror/lang-markdown";
import { xml } from "@codemirror/lang-xml";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { rust } from "@codemirror/lang-rust";
import { sql } from "@codemirror/lang-sql";
import { php } from "@codemirror/lang-php";
import { yaml } from "@codemirror/lang-yaml";
import { swift } from "@codemirror/legacy-modes/mode/swift";
import { shell } from "@codemirror/legacy-modes/mode/shell";
import { go } from "@codemirror/legacy-modes/mode/go";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { lua } from "@codemirror/legacy-modes/mode/lua";
import { toml } from "@codemirror/legacy-modes/mode/toml";
import { dockerFile } from "@codemirror/legacy-modes/mode/dockerfile";
import { properties } from "@codemirror/legacy-modes/mode/properties";
import { powerShell } from "@codemirror/legacy-modes/mode/powershell";
import { diff } from "@codemirror/legacy-modes/mode/diff";
import { kotlin, objectiveC, dart, csharp, scala } from "@codemirror/legacy-modes/mode/clike";
import { where, wordAt, lineSays, calmFocus, tidyScan, tidyChanges } from "./learn.js";

/* ---------- 1. the languages, by a file's name or, failing that, by its first words ---------- */
const S = m => () => StreamLanguage.define(m);
const LANGS = {
  html: { name: "HTML", make: () => html({ matchClosingTags: true, autoCloseTags: true }) },
  css: { name: "CSS", make: () => css() },
  js: { name: "JavaScript", make: () => javascript() },
  jsx: { name: "JSX", make: () => javascript({ jsx: true }) },
  ts: { name: "TypeScript", make: () => javascript({ typescript: true }) },
  tsx: { name: "TSX", make: () => javascript({ typescript: true, jsx: true }) },
  json: { name: "JSON", make: () => json() },
  py: { name: "Python", make: () => python() },
  md: { name: "Markdown", make: () => markdown() },
  xml: { name: "XML", make: () => xml() },
  java: { name: "Java", make: () => java() },
  kotlin: { name: "Kotlin", make: S(kotlin) },
  swift: { name: "Swift", make: S(swift) },
  objc: { name: "Objective-C", make: S(objectiveC) },
  cpp: { name: "C / C++", make: () => cpp() },
  cs: { name: "C#", make: S(csharp) },
  rust: { name: "Rust", make: () => rust() },
  go: { name: "Go", make: S(go) },
  dart: { name: "Dart", make: S(dart) },
  scala: { name: "Scala", make: S(scala) },
  sql: { name: "SQL", make: () => sql() },
  php: { name: "PHP", make: () => php() },
  yaml: { name: "YAML", make: () => yaml() },
  toml: { name: "TOML", make: S(toml) },
  sh: { name: "Shell", make: S(shell) },
  ps: { name: "PowerShell", make: S(powerShell) },
  rb: { name: "Ruby", make: S(ruby) },
  lua: { name: "Lua", make: S(lua) },
  docker: { name: "Dockerfile", make: S(dockerFile) },
  props: { name: "Properties", make: S(properties) },
  diff: { name: "Diff", make: S(diff) },
  text: { name: "Plain text", make: () => [] }
};
const EXT = { html: "html", htm: "html", xhtml: "html", css: "css", scss: "css", less: "css", js: "js", mjs: "js", cjs: "js",
  jsx: "jsx", ts: "ts", mts: "ts", cts: "ts", tsx: "tsx", json: "json", webmanifest: "json", jsonc: "json", map: "json",
  py: "py", pyw: "py", spec: "py", md: "md", markdown: "md", xml: "xml", svg: "xml", plist: "xml", xib: "xml",
  storyboard: "xml", csproj: "xml", java: "java", kt: "kotlin", kts: "kotlin", gradle: "kotlin", swift: "swift",
  m: "objc", mm: "objc", c: "cpp", h: "cpp", cc: "cpp", cpp: "cpp", cxx: "cpp", hpp: "cpp", hh: "cpp", cs: "cs",
  rs: "rust", go: "go", dart: "dart", scala: "scala", sql: "sql", php: "php", yml: "yaml", yaml: "yaml", toml: "toml",
  sh: "sh", bash: "sh", zsh: "sh", command: "sh", ps1: "ps", rb: "rb", lua: "lua", properties: "props", iss: "props",
  ini: "props", cfg: "props", diff: "diff", patch: "diff", txt: "text", log: "text", csv: "text" };
function langFor(name, text) {
  const n = String(name || "").toLowerCase(), base = n.split(/[\\/]/).pop();
  if (/^dockerfile/.test(base)) return "docker";
  const m = /\.([a-z0-9]+)$/.exec(base); if (m && EXT[m[1]]) return EXT[m[1]];
  const t = String(text || "").slice(0, 2000).replace(/^﻿/, "").trimStart();
  if (/^<!doctype html|^<html[\s>]/i.test(t) || /^<(head|body|div|script|style)[\s>]/i.test(t)) return "html";
  if (/^<\?xml/.test(t)) return "xml";
  if (/^#!.*\b(ba|z)?sh\b/.test(t)) return "sh";
  if (/^#!.*python/.test(t)) return "py";
  if (/^[\[{]/.test(t) && /^[\[{][\s\S]*?["\]}]/.test(t)) { try { JSON.parse(String(text)); return "json"; } catch (e) { } }
  return name ? "text" : "html";
}

/* ---------- 2. what a large file carries that no one types: encoded data, and lines of a megabyte or more ----------
   shown as a short mark the cursor steps over; the text stays whole underneath, copied and saved as it is */
const DATA_MIN = 4000, RUN_MIN = 20000, LONG = 1000000;
class Mark extends WidgetType {
  constructor(len, kind) { super(); this.len = len; this.kind = kind; }
  eq(o) { return o.len === this.len && o.kind === this.kind; }
  toDOM() { const s = document.createElement("span"); s.className = "ic-mark"; s.textContent = "⟦" + (this.kind === "data" ? "encoded data" : "a line") + ", " + size(this.len) + ", kept as it is⟧"; s.title = "This part is kept whole; it is not shown so the editor stays quick."; return s; }
  ignoreEvent() { return false; }
}
function size(n) { return n >= 1048576 ? (n / 1048576).toFixed(1) + " MB" : n >= 1024 ? Math.round(n / 1024) + " KB" : n + " characters"; }
const B64 = /[A-Za-z0-9+\/=]/;
function scan(text, offset, out) {
  // a run of encoded data that fills an element (4,000 characters or more), or any run of 20,000 or more
  let re = />[\t ]*[A-Za-z0-9+\/=]{4000}/g, m;
  const cuts = [];
  while ((m = re.exec(text))) {
    let s = m.index + 1; while (text.charCodeAt(s) === 32 || text.charCodeAt(s) === 9) s++;
    let e = s; while (e < text.length && B64.test(text[e])) e++;
    if (text.charCodeAt(e) === 60 && e - s >= DATA_MIN) cuts.push([s, e, "data"]);
    re.lastIndex = Math.max(e, re.lastIndex);
  }
  re = /[A-Za-z0-9+\/=]{20000}/g;
  while ((m = re.exec(text))) { let e = m.index; while (e < text.length && B64.test(text[e])) e++; cuts.push([m.index, e, "data"]); re.lastIndex = e; }
  // a line of a megabyte or more (minified code, or data of another kind), unless what makes it long is data already marked
  cuts.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  let i = 0, k = 0;
  while (i < text.length) { let j = text.indexOf("\n", i); if (j < 0) j = text.length;
    if (j - i >= LONG) { let inData = 0; while (k < cuts.length && cuts[k][1] <= i) k++; for (let q = k; q < cuts.length && cuts[q][0] < j; q++) inData += Math.min(j, cuts[q][1]) - Math.max(i, cuts[q][0]);
      if (j - i - inData >= LONG / 2) cuts.push([i, j, "line"]); }
    i = j + 1; }
  cuts.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  let last = -1;
  for (const c of cuts) { if (c[0] < last) continue; out.push([offset + c[0], offset + c[1], c[2]]); last = c[1]; }
}
const resetMarks = StateEffect.define();
function marksOf(state) {
  if (state.doc.length < RUN_MIN) return Decoration.none;
  const cuts = []; scan(state.doc.toString(), 0, cuts);
  const b = new RangeSetBuilder();
  for (const c of cuts) b.add(c[0], c[1], Decoration.replace({ widget: new Mark(c[1] - c[0], c[2]) }));
  return b.finish();
}
const marks = StateField.define({
  create: marksOf,
  update(deco, tr) {
    if (tr.effects.some(e => e.is(resetMarks))) return marksOf(tr.state);
    if (!tr.docChanged) return deco;
    deco = deco.map(tr.changes);
    // only the lines a change touched are looked at again
    const doc = tr.state.doc, add = [];
    let lo = Infinity, hi = -1;
    tr.changes.iterChangedRanges((fa, ta, fb, tb) => { lo = Math.min(lo, doc.lineAt(fb).from); hi = Math.max(hi, doc.lineAt(Math.min(tb, doc.length)).to); });
    if (hi < 0) return deco;
    const piece = doc.sliceString(lo, hi);
    if (piece.length >= DATA_MIN) scan(piece, lo, add);
    deco = deco.update({ filter: (f, t) => t <= lo || f >= hi, add: add.map(c => Decoration.replace({ widget: new Mark(c[1] - c[0], c[2]) }).range(c[0], c[1])), sort: true });
    return deco;
  },
  provide: f => [EditorView.decorations.from(f), EditorView.atomicRanges.of(v => v.state.field(f))]
});

/* Tab: two spaces where the cursor is, as the boxes did; with lines chosen, those lines move in (Shift+Tab moves them out).
   Escape, then Tab, leaves the editor for the next control, as the keyboard alone needs */
function tab(view) {
  if (view.state.selection.ranges.some(r => !r.empty)) return indentMore(view);
  view.dispatch(view.state.replaceSelection("  "), { userEvent: "input", scrollIntoView: true }); return true;
}

/* ---------- 3. the editor, sized and coloured as the box it stands in for ---------- */
const BIG = 4000000, HUGE = 40000000;
const COPY = ["width", "height", "minHeight", "maxHeight", "flexGrow", "flexShrink", "flexBasis", "alignSelf", "marginTop", "marginRight",
  "marginBottom", "marginLeft", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderTopStyle",
  "borderRightStyle", "borderBottomStyle", "borderLeftStyle", "borderTopColor", "borderRightColor", "borderBottomColor",
  "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius",
  "backgroundColor", "boxShadow", "boxSizing", "resize"];
function lum(c) { const m = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/.exec(c || ""); if (!m || (m[4] !== undefined && +m[4] < 0.2)) return null; return (0.2126 * m[1] + 0.7152 * m[2] + 0.0722 * m[3]) / 255; }
function bgOf(el) { for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const l = lum(getComputedStyle(e).backgroundColor); if (l !== null) return l; } return 1; }
const NAT = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value");
/* the choices a person makes in the bar (Glossa open, Calm) stay with them on this device */
const PREFS = (() => { try { return JSON.parse(localStorage.getItem("ingEditorPrefs") || "{}") || {}; } catch (e) { return {}; } })();
function savePrefs() { try { localStorage.setItem("ingEditorPrefs", JSON.stringify(PREFS)); } catch (e) { } }
const all = new Set();

// read-only or disabled as its text box is; it is always one stop for the keyboard (named so, as checkers want a scrolled region
// to be), so code that cannot be changed can still be reached, read and scrolled, and it says when it cannot be changed
function roExt(ta) {
  const ro = !!ta.disabled || !!ta.readOnly;
  return [EditorState.readOnly.of(ro), EditorView.editable.of(!ta.disabled),
    EditorView.contentAttributes.of(ro ? { tabindex: '0', 'aria-readonly': 'true' } : { tabindex: '0' })];
}
function attach(ta, o) {
  if (!ta || ta.__ingCode) return ta && ta.__ingCode;
  o = o || {};
  const text0 = NAT.get.call(ta);
  const crlf = /\r\n/.test(text0) && !/[^\r]\n/.test(text0.slice(0, 2000000));
  const C = { lang: new Compartment(), ro: new Compartment(), big: new Compartment(), wrap: new Compartment(), attrs: new Compartment(), calm: new Compartment() };
  const TH = o.theme || (window.IngEditor && window.IngEditor.theme) || {};   // the app's own look: its class, its buttons
  const wrapEl = document.createElement("div"); wrapEl.className = "ic-wrap" + (TH.wrap ? " " + TH.wrap : ""); if (o.wrapId) wrapEl.id = o.wrapId;
  const host = document.createElement("div"); host.className = "ic-host";
  const bar = document.createElement("div"); bar.className = "ic-bar";
  const gl = document.createElement("div"); gl.className = "ic-glossa"; gl.hidden = true; gl.setAttribute("role", "region"); gl.setAttribute("aria-label", "Glossa: what this means");
  const td = document.createElement("div"); td.className = "ic-tidy"; td.hidden = true; td.setAttribute("role", "region"); td.setAttribute("aria-label", "Lima: polish the code");
  wrapEl.appendChild(host); wrapEl.appendChild(gl); wrapEl.appendChild(td); wrapEl.appendChild(bar);
  ta.parentNode.insertBefore(wrapEl, ta.nextSibling);
  ta.classList.add("ic-ta");
  const H = { ta, wrap: wrapEl, view: null, langKey: "text", name: o.name || ta.getAttribute("data-file") || "", wrapOn: !!o.wrap, crlf };
  let inputT = null, dirtySinceFocus = false, cacheDoc = null, cacheStr = "";
  function attrs() { return EditorView.contentAttributes.of({ "aria-label": ta.getAttribute("aria-label") || o.label || "The code", spellcheck: "false", autocorrect: "off", autocapitalize: "off" }); }
  function bigExt(len) {
    // a large file keeps what costs nothing; what reads the whole text on every keystroke waits for a smaller one
    return len > BIG ? [] : [highlightSelectionMatches(), autocompletion()];
  }
  function langExt(key, len) { if (len > HUGE && !H.colours) return []; try { return LANGS[key].make(); } catch (e) { return []; } }
  function mkState(text) {
    if (H.crlf) text = text.replace(/\r\n/g, "\n");
    if (typeof o.nameFrom === "function") { try { H.name = o.nameFrom(ta) || H.name; } catch (e) { } }
    H.langKey = o.lang && LANGS[o.lang] ? o.lang : langFor(H.name, text);
    const len = text.length;
    return EditorState.create({
      doc: text,
      extensions: [
        lineNumbers(), highlightActiveLineGutter(), highlightSpecialChars(), history({ minDepth: 400 }), foldGutter(), drawSelection(),
        dropCursor(), EditorState.allowMultipleSelections.of(true), indentOnInput(), syntaxHighlighting(classHighlighter),
        bracketMatching(), closeBrackets(), rectangularSelection(), crosshairCursor(), highlightActiveLine(), search({ top: true }),
        indentUnit.of("  "), EditorState.tabSize.of(2), marks,
        keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...searchKeymap, ...historyKeymap, ...foldKeymap, ...completionKeymap,
          { key: "Mod-Alt-g", run: gotoLine }, { key: "Tab", run: tab, shift: indentLess }]),
        C.lang.of(langExt(H.langKey, len)), C.big.of(bigExt(len)), C.wrap.of(H.wrapOn ? EditorView.lineWrapping : []),
        C.ro.of(roExt(ta)), C.attrs.of(attrs()),
        C.calm.of(PREFS.calm && len < BIG ? calmFocus : []),
        EditorView.updateListener.of(u => {
          if (u.docChanged) { dirtySinceFocus = true; fire(); }
          if (u.docChanged || u.selectionSet) { paintBar(); glossSoon(); }
          if (u.docChanged && !td.hidden) limaSoon();
        }),
        EditorView.domEventHandlers({
          // a shortcut the app listens for on the box (Ctrl+S, Ctrl+Enter, ...) still reaches it; plain keys, and Tab, are the editor's
          keydown(e) {
            if (!(e.ctrlKey || e.metaKey || e.altKey) && !/^F\d+$/.test(e.key)) return false;
            const c = new KeyboardEvent("keydown", { key: e.key, code: e.code, ctrlKey: e.ctrlKey, metaKey: e.metaKey, shiftKey: e.shiftKey, altKey: e.altKey, repeat: e.repeat, cancelable: true });
            ta.dispatchEvent(c); if (c.defaultPrevented) { e.preventDefault(); return true; } return false; },
          focus() { dirtySinceFocus = false; }, blur() { if (dirtySinceFocus) { dirtySinceFocus = false; setTimeout(() => ta.dispatchEvent(new Event("change", { bubbles: true })), 0); } } })
      ]
    });
  }
  function fire() {
    // the rest of the app hears an edit as it heard one in the box; a large file is told once typing pauses
    clearTimeout(inputT);
    const go = () => ta.dispatchEvent(new Event("input", { bubbles: true }));
    if (H.view.state.doc.length > BIG) inputT = setTimeout(go, 300); else inputT = setTimeout(go, 0);
  }
  function str() { const s = H.view.state; if (s.doc !== cacheDoc) { cacheStr = s.doc.toString(); if (H.crlf) cacheStr = cacheStr.replace(/\n/g, "\r\n"); cacheDoc = s.doc; } return cacheStr; }
  // positions as the box counts them (a file with Windows line ends counts two characters for each)
  const toBox = p => H.crlf ? p + H.view.state.doc.lineAt(p).number - 1 : p;
  const fromBox = p => { if (!H.crlf) return p; const d = H.view.state.doc; let lo = 0, hi = d.length; p = Math.max(0, p | 0); while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (toBox(mid) <= p) lo = mid; else hi = mid - 1; } return lo; };
  function select(a, b) { const d = H.view.state.doc.length; a = Math.min(d, fromBox(a)); b = Math.min(d, fromBox(b == null ? a : b)); H.view.dispatch({ selection: EditorSelection.single(a, b), scrollIntoView: true }); }
  function setDoc(text) {
    H.crlf = /\r\n/.test(text) && !/[^\r]\n/.test(text.slice(0, 2000000)); H.colours = false;
    clearTimeout(inputT); H.view.setState(mkState(text)); cacheDoc = null; paintBar(); sync();
  }
  H.view = new EditorView({ state: mkState(text0), parent: host });
  NAT.set.call(ta, "");   // the text lives in the editor now: one copy, not two
  Object.defineProperty(ta, "value", { configurable: true, get: str, set(v) { setDoc(v == null ? "" : String(v)); } });
  Object.defineProperty(ta, "selectionStart", { configurable: true, get() { return toBox(H.view.state.selection.main.from); }, set(v) { select(v, ta.selectionEnd); } });
  Object.defineProperty(ta, "selectionEnd", { configurable: true, get() { return toBox(H.view.state.selection.main.to); }, set(v) { select(ta.selectionStart, v); } });
  Object.defineProperty(ta, "textLength", { configurable: true, get() { return str().length; } });
  Object.defineProperty(ta, "scrollTop", { configurable: true, get() { return H.view.scrollDOM.scrollTop; }, set(v) { H.view.scrollDOM.scrollTop = v; } });
  Object.defineProperty(ta, "scrollHeight", { configurable: true, get() { return H.view.scrollDOM.scrollHeight; } });
  ta.setSelectionRange = (a, b) => select(a, b);
  ta.select = () => H.view.dispatch({ selection: EditorSelection.single(0, H.view.state.doc.length) });
  ta.focus = () => H.view.focus();
  ta.blur = () => H.view.contentDOM.blur();

  /* the bar under the editor: where the cursor is, the language (which can be changed), wrapping, size */
  bar.innerHTML = '<span class="ic-pos" aria-live="off"></span><label class="ic-l"><span class="ic-sr">Language</span><select class="ic-lang"></select></label>' +
    '<label class="ic-w"><input type="checkbox" class="ic-wrapbox"> Wrap</label><button type="button" class="ic-find">Find</button>' +
    '<button type="button" class="ic-gl" aria-pressed="false" title="What the code under the cursor means, in plain words">Glossa</button>' +
    '<button type="button" class="ic-calm" aria-pressed="false" title="Softer colours, more room, and only the part you are working on in full colour">Calm</button>' +
    '<button type="button" class="ic-em" aria-expanded="false" title="Clear out what the code does not need: you see each change first">Lima</button><span class="ic-size"></span>';
  /* the bar's keys and the panels' keys wear the app's own buttons (raised, and pressed when on) */
  const dress = b => { if (TH.btn) { b.classList.add("ic-themed"); TH.btn.split(/\s+/).forEach(c => c && b.classList.add(c)); } };
  const lit = (b, on) => { if (TH.on) TH.on.split(/\s+/).forEach(c => c && b.classList.toggle(c, !!on)); };
  bar.querySelectorAll("button").forEach(dress);
  const sel = bar.querySelector(".ic-lang");
  Object.keys(LANGS).forEach(k => { const op = document.createElement("option"); op.value = k; op.textContent = LANGS[k].name; sel.appendChild(op); });
  sel.addEventListener("change", () => setLang(sel.value, true));
  const wb = bar.querySelector(".ic-wrapbox"); wb.checked = H.wrapOn;
  wb.addEventListener("change", () => { H.wrapOn = wb.checked; H.view.dispatch({ effects: C.wrap.reconfigure(H.wrapOn ? EditorView.lineWrapping : []) }); });
  bar.querySelector(".ic-find").addEventListener("click", () => { openSearchPanel(H.view); });
  /* Glossa: where the cursor is, the word under it, what its line does */
  const glB = bar.querySelector(".ic-gl"), calmB = bar.querySelector(".ic-calm"), emB = bar.querySelector(".ic-em");
  let glT = 0;
  function glossSoon() { if (gl.hidden) return; clearTimeout(glT); glT = setTimeout(gloss, 140); }
  function gloss() {
    const s = H.view.state, pos = s.selection.main.head, here = where(s, pos), w = wordAt(s, pos, H.langKey), line = lineSays(s, pos);
    gl.innerHTML = "";
    const h = document.createElement("div"); h.className = "ic-gh"; h.textContent = "Glossa · what this means"; gl.appendChild(h);
    const row = (label, val, cls) => { if (!val) return; const d = document.createElement("div"); d.className = "ic-gr " + (cls || ""); const b = document.createElement("b"); b.textContent = label; d.appendChild(b); const sp = document.createElement("span"); sp.textContent = val; d.appendChild(sp); gl.appendChild(d); };
    row("Where you are", here.length ? here.join("  ›  ") : "At the top level of the file.");
    row("This line", line || "—");
    row("This word", w ? "“" + w.word + "”: " + w.text : "Put the cursor on a word to see what it means.");
    const ask = o.ask || window.IngEditor.ask;
    if (typeof ask === "function") { const b = document.createElement("button"); b.type = "button"; b.className = "ic-ask"; b.textContent = "Ask about this line"; b.title = "Opens a question about this line, ready to send";
      dress(b); b.onclick = () => { const l = s.doc.lineAt(pos); ask({ line: l.text, number: l.number, where: here.join(" › "), lang: LANGS[H.langKey] ? LANGS[H.langKey].name : "" }); }; gl.appendChild(b); }
  }
  function setGloss(on) { gl.hidden = !on; glB.setAttribute("aria-pressed", on ? "true" : "false"); lit(glB, on); PREFS.glossa = on; savePrefs(); if (on) gloss(); }
  glB.addEventListener("click", () => setGloss(gl.hidden));
  /* Calm */
  function setCalm(on) { wrapEl.classList.toggle("ic-calm", on); calmB.setAttribute("aria-pressed", on ? "true" : "false"); lit(calmB, on); PREFS.calm = on; savePrefs();
    H.view.dispatch({ effects: C.calm.reconfigure(on && H.view.state.doc.length < BIG ? calmFocus : []) }); }
  calmB.addEventListener("click", () => setCalm(!wrapEl.classList.contains("ic-calm")));
  /* Lima: what can be cleared, shown first, removed only when chosen, all undone with one Undo */
  /* after an edit (or an Undo), Lima reads the code again once typing pauses, so what it lists is never out of date */
  let limaT = 0;
  function limaSoon() { clearTimeout(limaT); if (H.view.state.doc.length > BIG) { const say = td.querySelector(".ic-tsay"); if (say) say.textContent = "The code has changed. Press Lima twice to read it again."; return; } limaT = setTimeout(lima, 1200); }
  function lima() {
    const s = H.view.state;
    td.innerHTML = '<div class="ic-gh">Lima · polish the code</div><div class="ic-tsay">Reading the code…</div>';
    setTimeout(() => {
      if (s.doc.length > HUGE) { td.querySelector(".ic-tsay").textContent = "This file is too long to read all at once here. Open it part by part (Build in Ingenium, Files in the Forge) and tidy each part."; return; }
      const r = tidyScan(s, 5000); td.innerHTML = '<div class="ic-gh">Lima · polish the code</div>';
      const say = document.createElement("div"); say.className = "ic-tsay"; say.setAttribute("role", "status");
      say.textContent = (r.complete ? "" : "Only the first part of this long file was read in time. ") + "Nothing changes until you choose. One Undo (Ctrl+Z) puts back everything a button removed.";
      td.appendChild(say);
      const group = (title, about, items, kind, list) => {
        const g = document.createElement("div"); g.className = "ic-tg"; const hd = document.createElement("div"); hd.className = "ic-tt"; hd.textContent = title + (items.length ? " · " + items.length : " · none"); g.appendChild(hd);
        const p = document.createElement("div"); p.className = "ic-ta2"; p.textContent = about; g.appendChild(p);
        if (items.length && list) {
          const ul = document.createElement("ul"); ul.className = "ic-tl";
          items.slice(0, 200).forEach((it, i) => { const li = document.createElement("li"); const lab = document.createElement("label"); const cb = document.createElement("input"); cb.type = "checkbox"; cb.dataset.i = i; lab.appendChild(cb);
            lab.appendChild(document.createTextNode(" " + it.label + " ")); li.appendChild(lab); const go = document.createElement("button"); go.type = "button"; go.className = "ic-go"; go.textContent = "Line " + it.line;
            dress(go); go.onclick = () => { H.view.dispatch({ selection: EditorSelection.single(it.from), scrollIntoView: true }); H.view.focus(); }; li.appendChild(go); ul.appendChild(li); });
          g.appendChild(ul);
        }
        if (items.length) { const b = document.createElement("button"); b.type = "button"; b.className = "ic-tbtn"; dress(b); b.textContent = list ? "Remove the ones chosen" : "Remove " + (kind === "notes" ? "these notes" : kind === "blanks" ? "the extra empty lines" : "these spaces");
          b.onclick = () => { const chosen = list ? [...g.querySelectorAll("input[type=checkbox]")].filter(c => c.checked).map(c => items[+c.dataset.i]) : items;
            if (!chosen.length) { say.textContent = "Choose one or more first: each box beside a name."; return; }
            const ch = tidyChanges(H.view.state, kind, chosen); H.view.dispatch({ changes: ch, userEvent: "delete.tidy" });
            say.textContent = "Done: " + ch.length + " removed. One Undo (Ctrl+Z) puts them back."; };
          g.appendChild(b); }
        td.appendChild(g);
      };
      group("Notes for people (comments)", "Notes in the code the computer skips." + (r.kept ? " " + r.kept + " stay always: licences, copyrights, and marks the app reads in itself." : ""), r.notes, "notes", false);
      group("Empty lines more than one in a row", "Two or more empty lines become one.", r.blanks, "blanks", false);
      group("Spaces at the ends of lines", "Spaces no one sees, after the last word of a line.", r.trails, "trails", false);
      group("Styles nothing names", "Style rules whose classes or ids appear nowhere else in this file. Check before removing: code can build a name in pieces.", r.styles, "styles", true);
      group("Functions nothing calls", "Functions whose name appears only where they are made. Check before removing: another file may call them.", r.functions, "functions", true);
    }, 30);
  }
  emB.addEventListener("click", () => { const on = td.hidden; td.hidden = !on; emB.setAttribute("aria-expanded", on ? "true" : "false"); lit(emB, on); if (on) lima(); });
  function paintBar() {
    if (!H.view) return; const s = H.view.state, h = s.selection.main.head, ln = s.doc.lineAt(h);
    bar.querySelector(".ic-pos").textContent = "Line " + ln.number.toLocaleString() + ", column " + (h - ln.from + 1) + (s.selection.ranges.length > 1 ? " · " + s.selection.ranges.length + " cursors" : "");
    bar.querySelector(".ic-size").textContent = s.doc.lines.toLocaleString() + (s.doc.lines === 1 ? " line · " : " lines · ") + size(s.doc.length) + (s.doc.length > HUGE && !H.colours ? " · colours off for a file this size (choose its language to turn them on)" : "");
    sel.value = H.langKey;
  }
  function setLang(key, byHand) { if (!LANGS[key]) return; H.langKey = key; if (byHand !== false) H.colours = true; H.view.dispatch({ effects: C.lang.reconfigure(langExt(key, H.view.state.doc.length)) }); paintBar(); }

  /* the box's own state, mirrored: shown or hidden, enabled or not, its name for a screen reader, its look */
  function sync() {
    const cs = getComputedStyle(ta), st = wrapEl.style;
    if (o.styled) {   // the app's own styles place and dress this editor (o.wrapId names it): only its colours are chosen here
      wrapEl.classList.toggle("ic-dark", bgOf(wrapEl) < 0.45); wrapEl.classList.toggle("ic-disabled", !!ta.disabled); return; }
    COPY.forEach(p => { const v = cs[p]; if (v && v !== "auto" && v !== "none" || p === "boxShadow" || p === "resize") st[p] = v; });
    if (cs.height === "auto" || !cs.height) st.minHeight = Math.max(160, (ta.rows || 12) * (parseFloat(cs.lineHeight) || 20)) + "px";
    host.style.fontFamily = cs.fontFamily; host.style.fontSize = cs.fontSize; host.style.lineHeight = cs.lineHeight; host.style.color = cs.color;
    host.style.setProperty("--ic-pad", cs.paddingTop + " " + cs.paddingRight + " " + cs.paddingBottom + " " + cs.paddingLeft);
    wrapEl.classList.toggle("ic-dark", bgOf(ta.parentElement || ta) < 0.45 || lum(cs.backgroundColor) !== null && lum(cs.backgroundColor) < 0.45);
    const shown = !ta.hidden && ta.style.display !== "none";
    wrapEl.style.display = shown ? "" : "none";
    wrapEl.classList.toggle("ic-disabled", !!ta.disabled);
  }
  let lastRo = null;
  function watch() {
    sync();
    const ro = !!ta.disabled || !!ta.readOnly;
    if (ro !== lastRo) { lastRo = ro; H.view.dispatch({ effects: [C.ro.reconfigure(roExt(ta)), C.attrs.reconfigure(attrs())] }); }
  }
  new MutationObserver(watch).observe(ta, { attributes: true, attributeFilter: ["style", "hidden", "disabled", "readonly", "aria-label", "data-file"] });
  H.setLang = setLang; H.setName = n => { H.name = n || ""; if (!o.lang) setLang(langFor(H.name, str().slice(0, 4000)), false); };
  H.sync = sync; H.undo = () => undo(H.view); H.redo = () => redo(H.view); H.foldAll = () => foldAll(H.view); H.unfoldAll = () => unfoldAll(H.view);
  H.find = () => openSearchPanel(H.view);
  H.destroy = () => { try { H.view.destroy(); } catch (e) { } try { wrapEl.remove(); } catch (e) { } all.delete(H); try { delete ta.value; delete ta.selectionStart; delete ta.selectionEnd; delete ta.textLength; delete ta.scrollTop; delete ta.scrollHeight; } catch (e) { } ta.__ingCode = null; };
  H.gloss = () => setGloss(true); H.calm = setCalm; H.lima = () => { if (td.hidden) emB.click(); else lima(); };
  ta.__ingCode = H; all.add(H); watch(); paintBar();
  if (PREFS.glossa) setGloss(true); if (PREFS.calm) setCalm(true);
  return H;
}

/* the boxes an app names are taken over as they appear, and every editor follows the app's day and night */
function auto(selector, opts) {
  const take = root => { (root.matches && root.matches(selector) ? [root] : []).concat([...(root.querySelectorAll ? root.querySelectorAll(selector) : [])]).forEach(t => { if (t.tagName === "TEXTAREA" && t.isConnected) attach(t, typeof opts === "function" ? opts(t) : Object.assign({}, opts || {})); }); };
  take(document);
  new MutationObserver(ms => { let gone = false; for (const m of ms) { for (const n of m.addedNodes) if (n.nodeType === 1) take(n); if (m.removedNodes.length) gone = true; } if (gone) sweep(); }).observe(document.documentElement, { childList: true, subtree: true });
}
/* an editor whose box has left the page goes with it, and lets its text go */
function sweep() { all.forEach(h => { if (!h.ta.isConnected) h.destroy(); }); }
let syncT = 0;
const resync = () => { cancelAnimationFrame(syncT); syncT = requestAnimationFrame(() => all.forEach(h => { try { if (h.ta.isConnected) h.sync(); } catch (e) { } })); };
new MutationObserver(resync).observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme", "style"] });
if (document.body) new MutationObserver(resync).observe(document.body, { attributes: true, attributeFilter: ["class", "data-theme", "style"] });
else document.addEventListener("DOMContentLoaded", () => new MutationObserver(resync).observe(document.body, { attributes: true, attributeFilter: ["class", "data-theme", "style"] }));
addEventListener("resize", resync);

window.IngEditor = { attach, auto, sweep, count: () => all.size, langFor, langs: Object.fromEntries(Object.entries(LANGS).map(([k, v]) => [k, v.name])), version: "1",
  cm: { syntaxTree, ensureSyntaxTree, EditorView, EditorState, MergeView, unifiedMergeView, Decoration, StateField, StateEffect, EditorSelection, syntaxHighlighting, classHighlighter, lineNumbers,
    make: (key) => LANGS[key] ? LANGS[key].make() : [] } };
