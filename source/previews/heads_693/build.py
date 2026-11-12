#!/usr/bin/env python3
"""The live preview of three pages' heads (Ingenium 6.93): Build's prism, Focus's armillary sphere and Lector's fan, the page's own
modules (r284, r287, r289) running in small copies of those pages, with the keys, words and colours measured from the built page
(see README.md). python3 build.py OUT.html"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.normpath(os.path.join(HERE, "..", "..", "build"))
def mod(name):
    s = open(os.path.join(SRC, "modules", name), encoding="utf-8").read()
    css = re.search(r'<style id="[^"]+">([\s\S]*?)</style>', s).group(1)
    js = re.search(r"<script>([\s\S]*?)</script>", s).group(1)
    return css, js
c284, j284 = mod("r284.js"); c287, j287 = mod("r287.js"); c289, j289 = mod("r289.js")
fonts = json.load(open(os.path.join(SRC, "lx_fonts.json"), encoding="utf-8"))
FONTS = {k: fonts[k] for k in ("cormorant-600-normal", "cormorant-500-italic")}
SAMPLE = open(os.path.join(HERE, "sample.html"), encoding="utf-8").read()
page = open(os.path.join(HERE, "page.html"), encoding="utf-8").read()
out = (page.replace("/*R284_CSS*/", c284).replace("/*R287_CSS*/", c287).replace("/*R289_CSS*/", c289)
       .replace("/*FONTS*/null", json.dumps(FONTS)).replace("/*R284_JS*/", j284).replace("/*R287_JS*/", j287).replace("/*R289_JS*/", j289)
       .replace("/*SAMPLE*/\"\"", json.dumps(SAMPLE).replace("</", "<\\/")))
dest = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "out", "heads_693.html")
os.makedirs(os.path.dirname(dest), exist_ok=True); open(dest, "w", encoding="utf-8").write(out)
print("wrote", dest, len(out), "bytes")
