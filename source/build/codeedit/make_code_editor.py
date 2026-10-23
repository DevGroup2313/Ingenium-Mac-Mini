"""Builds build/thoughts/code_editor_core.html, the code editor Ingenium and The Forge carry (entry.js, with CodeMirror 6),
whole and offline: its styles, its licence notice, and one script.

    python3 build/codeedit/make_code_editor.py            (runs npm ci here the first time: the packages are pinned in
                                                           package-lock.json, and node_modules/ is never committed)

The editor follows the box it stands in for: its size, its border and background, its font; its colours for code are a day
set or a night set, chosen from how dark the box is. Every colour below keeps the 4.5 to 1 contrast the accessibility rules
ask for, on white and on the apps' night backgrounds."""
import json, os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "thoughts", "code_editor_core.html")

if not os.path.isdir(os.path.join(HERE, "node_modules", "@codemirror", "view")):
    subprocess.check_call(["npm", "ci", "--no-audit", "--no-fund"], cwd=HERE)
js = subprocess.check_output([os.path.join(HERE, "node_modules", ".bin", "esbuild"), "entry.js", "--bundle", "--format=iife",
                              "--minify", "--target=es2019", "--legal-comments=none", "--charset=utf8"], cwd=HERE).decode("utf-8")
js = js.replace("</script", "<\\/script").replace("<!--", "<\\!--")
lock = json.load(open(os.path.join(HERE, "package-lock.json"), encoding="utf-8"))
pk = {k.split("node_modules/")[-1]: v["version"] for k, v in lock["packages"].items() if k.startswith("node_modules/") and "esbuild" not in k}
names = ", ".join("%s %s" % (k, pk[k]) for k in sorted(pk))

CSS = r"""
/* the code editor (build/codeedit): CodeMirror 6 in the place of a box of code */
.ic-ta{display:none !important}
.ic-wrap{display:flex;flex-direction:column;overflow:hidden;position:relative;min-width:0;padding:0 !important}
.ic-host{flex:1 1 auto;min-height:0;display:flex;overflow:hidden}
.ic-host .cm-editor{flex:1 1 auto;min-width:0;height:100%;background:transparent;color:inherit}
.ic-host .cm-scroller{font-family:inherit;line-height:inherit;overflow:auto}
.ic-host .cm-content{padding:var(--ic-pad,8px 0);caret-color:currentColor}
.ic-host .cm-line{padding:0 6px 0 4px}
.ic-host .cm-editor.cm-focused{outline:2px solid #2f6fb0;outline-offset:-2px}
.ic-dark .ic-host .cm-editor.cm-focused{outline-color:#79b8ff}
.ic-host .cm-gutters{background:rgba(127,127,127,.07);border-right:1px solid rgba(127,127,127,.22);color:#5f6670}
.ic-dark .ic-host .cm-gutters{color:#a6adb8}
.ic-host .cm-activeLine{background:rgba(127,127,127,.08)}
.ic-host .cm-activeLineGutter{background:rgba(127,127,127,.14)}
.ic-host .cm-cursor,.ic-host .cm-dropCursor{border-left:2px solid currentColor}
.ic-host .cm-selectionBackground{background:rgba(70,130,230,.22) !important}
.ic-host .cm-focused .cm-selectionBackground{background:rgba(70,130,230,.32) !important}
.ic-host .cm-selectionMatch{background:rgba(70,130,230,.16)}
.ic-host .cm-matchingBracket{background:rgba(40,160,90,.22);outline:1px solid rgba(40,160,90,.55)}
.ic-host .cm-nonmatchingBracket{background:rgba(220,60,60,.2)}
.ic-host .cm-searchMatch{background:rgba(255,196,0,.38);outline:1px solid rgba(200,140,0,.6)}
.ic-host .cm-searchMatch.cm-searchMatch-selected{background:rgba(255,140,0,.55)}
.ic-host .cm-foldPlaceholder{background:rgba(127,127,127,.18);border:1px solid rgba(127,127,127,.35);color:inherit;padding:0 5px;border-radius:4px}
.ic-host .cm-foldGutter span{color:inherit}
.ic-host .cm-panels{background:rgba(127,127,127,.08);color:inherit;border-color:rgba(127,127,127,.25)}
.ic-host .cm-panel.cm-search{padding:6px 8px;font:13px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
.ic-host .cm-panel.cm-search input,.ic-host .cm-panel.cm-search button,.ic-host .cm-panel.cm-search label{font:inherit;color:inherit}
.ic-host .cm-panel.cm-search input[type=text],.ic-host .cm-textfield{background:rgba(255,255,255,.75);border:1px solid rgba(127,127,127,.45);border-radius:6px;padding:2px 6px;color:#1c2128}
.ic-dark .ic-host .cm-panel.cm-search input[type=text],.ic-dark .ic-host .cm-textfield{background:rgba(0,0,0,.35);color:#e6edf3}
.ic-host .cm-button{background-image:none;background:rgba(127,127,127,.12);border:1px solid rgba(127,127,127,.45);border-radius:6px;color:inherit;padding:2px 8px}
.ic-host .cm-tooltip{background:#fff;color:#1c2128;border:1px solid rgba(127,127,127,.4);border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,.15)}
.ic-dark .ic-host .cm-tooltip{background:#1d232b;color:#e6edf3}
.ic-host .cm-tooltip-autocomplete ul li[aria-selected]{background:#2f6fb0;color:#fff}
.ic-mark{display:inline-block;padding:0 6px;margin:0 2px;border-radius:5px;background:rgba(127,127,127,.16);color:#565d66;font-style:italic;font-size:.92em;white-space:nowrap}
.ic-dark .ic-mark{color:#b4bcc7}
.ic-bar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:4px 10px;border-top:1px solid rgba(127,127,127,.22);font:12px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;color:#4c535c;background:rgba(127,127,127,.05)}
.ic-dark .ic-bar{color:#b9c1cc}
.ic-bar select,.ic-bar button{font:inherit;padding:1px 6px;border-radius:6px;border:1px solid rgba(127,127,127,.45);background:transparent;color:inherit;cursor:pointer}
.ic-bar label{display:inline-flex;gap:4px;align-items:center;cursor:pointer}
.ic-bar :focus-visible{outline:2px solid #2f6fb0;outline-offset:1px}
.ic-size{margin-left:auto}
.ic-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.ic-disabled .ic-host{opacity:.6}
.ic-option-dark{color-scheme:dark}
/* the colours of code, by day (on white: each 4.5 to 1 or more) */
.ic-wrap .tok-keyword,.ic-wrap .tok-controlKeyword{color:#8b1fa9}
.ic-wrap .tok-string,.ic-wrap .tok-string2{color:#0b6b37}
.ic-wrap .tok-comment{color:#5f6670;font-style:italic}
.ic-wrap .tok-number,.ic-wrap .tok-atom,.ic-wrap .tok-bool,.ic-wrap .tok-literal{color:#9a4600}
.ic-wrap .tok-typeName,.ic-wrap .tok-className,.ic-wrap .tok-namespace{color:#00609a}
.ic-wrap .tok-propertyName{color:#1a56a0}
.ic-wrap .tok-variableName.tok-definition,.ic-wrap .tok-definition{color:#00609a}
.ic-wrap .tok-macroName,.ic-wrap .tok-meta{color:#5f6670}
.ic-wrap .tok-invalid,.ic-wrap .tok-deleted{color:#b3261e}
.ic-wrap .tok-inserted{color:#0b6b37}
.ic-wrap .tok-heading{font-weight:700;color:#00609a}
.ic-wrap .tok-strong{font-weight:700}.ic-wrap .tok-emphasis{font-style:italic}
.ic-wrap .tok-link,.ic-wrap .tok-url{color:#1a56a0;text-decoration:underline}
/* by night */
.ic-dark .tok-keyword,.ic-dark .tok-controlKeyword{color:#d6b2ff}
.ic-dark .tok-string,.ic-dark .tok-string2{color:#8ee39a}
.ic-dark .tok-comment{color:#a3acb8}
.ic-dark .tok-number,.ic-dark .tok-atom,.ic-dark .tok-bool,.ic-dark .tok-literal{color:#ffb270}
.ic-dark .tok-typeName,.ic-dark .tok-className,.ic-dark .tok-namespace,.ic-dark .tok-definition,.ic-dark .tok-variableName.tok-definition,.ic-dark .tok-heading{color:#86c5ff}
.ic-dark .tok-propertyName,.ic-dark .tok-link,.ic-dark .tok-url{color:#9cc8ff}
.ic-dark .tok-macroName,.ic-dark .tok-meta{color:#a3acb8}
.ic-dark .tok-invalid,.ic-dark .tok-deleted{color:#ff8a80}
.ic-dark .tok-inserted{color:#8ee39a}
"""

NOTICE = """/* The code editor of Ingenium and The Forge (build/codeedit/entry.js) is the owner's work; see LICENCE.txt.
   It carries CodeMirror 6 and Lezer (%s), used under the MIT License:
   Copyright (C) 2018-2021 by Marijn Haverbeke <marijn@haverbeke.berlin>, Adrian Heine <mail@adrianheine.de>, and others.
   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
   files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
   modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
   Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice
   shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY
   OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
   PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
   USE OR OTHER DEALINGS IN THE SOFTWARE. */""" % names

out = ('<style id="ing-code-css">' + CSS + '</style>\n<script id="ing-code-js">' + NOTICE + "\n"
       + "try{(function(){if(window.IngEditor)return;\n" + js + "\n})();}catch(e){try{console.warn('the code editor could not start: '+(e&&e.message||e));}catch(_){}}\n</script>\n")
open(OUT, "w", encoding="utf-8").write(out)
print("code_editor_core.html: %d bytes (script %d), %d packages" % (len(out.encode("utf-8")), len(js.encode("utf-8")), len(pk)))
