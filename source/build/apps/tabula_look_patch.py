"""R129 (18 October 2026): Tabula keeps its raised pages and its 3D notes key even when it stands alone.

The owner's words: "Why does Tabula look flat and have this small gap between the pages, please restore Tabula's look."
"This is a big regression even on Schedae button." The picture was a test photograph of Tabula's page opened by itself,
with no app around it.

Tabula draws its pages as one flat sheet with a thin grey band at each page break, and its notes key as a flat dark
disc. The raised pages (a card for each page, a wide gap, the shadows) are a layer each host adds when it opens Tabula:
Carpe Diem, the Forge and Ingenium each put the same script (cd-realpages, byte for byte the same in all three) before
the page's </body>, and each hides Tabula's notes key and shows its own Schedae key. Opened by itself (a test, a copy
saved on its own) Tabula had neither, and looked flat.

Now the layer rides in Tabula's own page (tabula_pages_layer.js, the hosts' script exactly, under the id tab-realpages).
It runs first and marks itself done (window.__cdRealPagesOn), so a host's copy stands aside and nothing is drawn twice;
in a host the pages look as before. Tabula's own notes key takes the hosts' Schedae look: the notepad, raised, that
breathes and lifts under the pointer. Every host still hides it (display:none !important), so this shows only when
Tabula stands alone.

patch(text) returns the patched Tabula page; apply it after tabula_flow_patch.py (R128). Usage on its own:
  python3 -I tabula_look_patch.py tabula.html OUT.html
"""
import os
import sys

MARK = "R129-TABULA-LOOK"
HERE = os.path.dirname(os.path.abspath(__file__))

KEY_CSS = ("<style id=\"tab-notes-key\">/* R129-TABULA-LOOK · Tabula's own notes key, in the hosts' Schedae look "
           "(every host hides it and shows its own) */\n"
           ".sticky-fab{background:transparent !important;box-shadow:none !important;width:48px;height:48px;"
           "transition:transform .18s cubic-bezier(.2,.8,.3,1),filter .18s;}\n"
           ".sticky-fab svg{display:none;}\n"
           ".sticky-fab::before{content:\"\\1F5D2\\FE0F\";font-size:30px;line-height:1;display:inline-block;"
           "animation:tabKeyBreathe 4.2s ease-in-out infinite;}\n"
           ".sticky-fab:hover{transform:translateY(-2px) scale(1.05);filter:brightness(1.04);}\n"
           ".sticky-fab:active{transform:translateY(1px) scale(.97);transition-duration:.08s;}\n"
           "@keyframes tabKeyBreathe{0%,100%{transform:none}50%{transform:translateY(-1.6px) scale(1.024)}}\n"
           "@media (prefers-reduced-motion:reduce){.sticky-fab::before{animation:none}}\n"
           "</style>\n")


def patch(s):
    if MARK in s:
        return s
    if "R128-TABULA-FLOW" not in s:
        raise SystemExit("apply tabula_flow_patch.py (R128) first")
    layer = open(os.path.join(HERE, "tabula_pages_layer.js"), encoding="utf-8").read()
    if "window.__cdRealPagesOn" not in layer or "</script" in layer.lower():
        raise SystemExit("tabula_look_patch: tabula_pages_layer.js is not the hosts' page layer")
    # the page's own </body> is its last; the earlier ones are inside the Word and web exports' strings
    i = s.rfind("</body>")
    if i < 0 or s.count("</body>\n</html>") != 1 or s.find("</body>\n</html>") != i:
        raise SystemExit("tabula_look_patch: the page's own </body> was not found")
    add = KEY_CSS + "<script id=\"tab-realpages\">/* " + MARK + " · the raised pages, as every host draws them */\n" + layer + "</script>\n"
    return s[:i] + add + s[i:]


if __name__ == "__main__":
    src, out = sys.argv[1], sys.argv[2]
    open(out, "w", encoding="utf-8").write(patch(open(src, encoding="utf-8").read()))
    print("written", out)
