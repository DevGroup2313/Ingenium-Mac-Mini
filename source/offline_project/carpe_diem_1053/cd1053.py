"""Pass 1053 of Carpe Diem: Tabula keeps every part of a document when it autosaves or moves between windows, and says
plainly when autosave cannot keep a document; the thoughts panel follows day and night while it is open; version 2 of
the shared support module.

Measured on 18 October 2026: Tabula's autosave, and its hand-over to a floating window or a window of its own, carried
only the main text, so the footnotes, endnotes, bibliography, header, footer and contents were lost from a page restored
after a crash or moved to another window. The fix is the same one Ingenium 5.0 and The Forge 632 carry
(source/build/apps/tabula_patch.py).
usage: cd1053.py IN_1052.html OUT.html"""
import base64, os, re, sys, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
BUILD = os.path.normpath(os.path.join(HERE, "..", "..", "build"))
src, dst = sys.argv[1], sys.argv[2]
s = open(src, encoding="utf-8").read()


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


tabula_patch = load("tabula_patch", os.path.join(BUILD, "apps", "tabula_patch.py"))
selfsrc = load("selfsrc", os.path.join(HERE, "..", "carpe_diem_1052", "selfsrc.py"))


def rep(a, b):
    global s
    n = s.count(a)
    if n != 1:
        raise SystemExit("expected one, found %d: %r" % (n, a[:100]))
    s = s.replace(a, b)


# 1. TABULA KEEPS EVERY PART
m = re.search(r'var TABULA_SRC = "([A-Za-z0-9+/=]+)"', s)
if not m:
    raise SystemExit("no TABULA_SRC")
tab = tabula_patch.patch(base64.b64decode(m.group(1)).decode("utf-8"))
s = s[:m.start(1)] + base64.b64encode(tab.encode("utf-8")).decode("ascii") + s[m.end(1):]

# 1b. THE MINI FORGE HOLDS NO TABULA (the owner's word, 18 October 2026: "The mini Forge inside of Carpe Diem should not
#     have a Tabula in it. It should only have the Editor page with its tabs, The Files page with its tabs and the
#     Settings page and simplified top bar with the side buttons."). Its pack still held the full Forge's Tabula
#     placeholder page and a Tabula key on a page it never shows; both go, and the mini Forge never opens Tabula.
import gzip
pm = re.search(r'(<script id="cd-forge-pack" type="text/plain">)([^<]*)(</script>)', s)
if not pm:
    raise SystemExit("no mini Forge pack")
mf = gzip.decompress(base64.b64decode(pm.group(2).strip())).decode("utf-8")
mf, n1 = re.subn(r'<script type="text/plain" id="cd-src-tabula">[^<]*</script>\n?', "", mf)
mf, n2 = re.subn(r'<button id="curric-tabula-btn" class="tabula-btn" onclick="openExt\(\'tabula\'\)">Tabula</button>', "", mf)
if n1 != 1 or n2 != 1:
    raise SystemExit("mini Forge: Tabula pieces not where expected (%d, %d)" % (n1, n2))
guard = ('<style id="cd1053-no-tabula">[data-room="tabula"],.tabula-btn,#frame-tabula{display:none!important}</style>'
         '<script id="cd1053-no-tabula-js">/* CARPE DIEM PASS 1053: the mini Forge holds the Editor, Files and Settings; it never opens Tabula */'
         '(function(){try{var o=window.openExt;if(typeof o!=="function")return;window.openExt=openExt=function(w){if(w==="tabula")return;return o.apply(this,arguments);};}catch(e){}})();</script>')
k = mf.rfind("</body>")
if k < 0:
    raise SystemExit("mini Forge: no body end")
mf = mf[:k] + guard + mf[k:]
z = bytearray(gzip.compress(mf.encode("utf-8"), 9, mtime=0))
z[9] = 3
s = s[:pm.start(2)] + base64.b64encode(bytes(z)).decode("ascii") + s[pm.end(2):]

# 2. THE SHARED MODULES, at their current versions
for old_name, new_name in (("thought_cloud.pre123.html", "thought_cloud.html"), ("support_core.v1.html", "support_core.html")):
    old = open(os.path.join(HERE, "..", "forge_632", "previous", old_name), encoding="utf-8").read().rstrip("\n")
    new = open(os.path.join(BUILD, "thoughts", new_name), encoding="utf-8").read().rstrip("\n")
    rep(old, new)

# 3. THE BUILD STAMP (its edition stays)
m2 = re.search(r'CD_BUILD=\{date:"2026-10-18",pass:"1052",stamp:"528171052"', s)
if not m2:
    raise SystemExit("no CD_BUILD 1052")
s = s.replace(m2.group(0), 'CD_BUILD={date:"2026-10-18",pass:"1053",stamp:"528171053"')

# 4. THE PAGE'S PHOTOGRAPH OF ITSELF, taken again, so a copy, a room window and Edit this app all carry 1053
s = selfsrc.rephoto(s)
if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude\.ai", s[:200000]):
    raise SystemExit("a script from outside that does not belong")
open(dst, "w", encoding="utf-8").write(s)
print("written", dst, len(s.encode("utf-8")))
