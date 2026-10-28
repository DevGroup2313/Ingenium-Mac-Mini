"""The lean copy of Ingenium that The Forge 649 carries: the release page without the apps it carries (as
build/apps/make_lean.py makes it). Since 6.8.1 the release carries its blocks for later at its end (build/tail.py): each
app is an empty block in its place and the app itself at the end, so both are taken out here, and the other blocks for later
stay at the end, so the copy starts as quickly as the release does. The picture reader is left out too, as a lean build
leaves it out (build_page.py, ING_LEAN=1): the copy the Forge carries reads pictures with a model that can see, or not at all.
    python3 lean_ingenium.py INGENIUM.html INGENIUM_LEAN.html"""
import json, re, sys

src, dst = sys.argv[1], sys.argv[2]
s = open(src, encoding="utf-8").read()
n = 0
for key in ("forge", "inkwell", "cd"):
    ident = "ing-builtin-" + key
    for pat in (r'<script id="ing-tail:%s"[^>]*>[A-Za-z0-9+/=]*</script>\n?' % ident,   # the app itself, at the end
                r'<script id="%s"[^>]*data-defer="#ing-tail:%s"[^>]*></script>\n?' % (ident, ident),   # its place
                r'<script type="text/plain" id="%s">[A-Za-z0-9+/=]*</script>\n?' % ident):   # a page not tailed
        s, k = re.subn(pat, "", s)
        n += k
for pat in (r'<script id="ing-tail:ing-eyes"[^>]*>[A-Za-z0-9+/=]*</script>\n?', r'<script id="ing-eyes"[^>]*data-defer="#ing-tail:ing-eyes"[^>]*></script>\n?',
            r'<script type="ingenium/b64" id="ing-eyes">[A-Za-z0-9+/=]*</script>\n?', r'<script type="text/plain" id="ing-eyes-notice">.*?</script>\n?'):
    s, k = re.subn(pat, "", s, flags=re.S)
    if k > 1:
        sys.exit("the picture reader: more than one block found")
if 'id="ing-eyes' in s or "ing-tail:ing-eyes" in s:
    sys.exit("the picture reader is still carried")
i = s.find("var BI=")
if n < 1 or i < 0:
    sys.exit("this page carries no apps to leave out")
bi, end = json.JSONDecoder().raw_decode(s, i + len("var BI="))
if not isinstance(bi, dict) or s[end:end + 1] != ";":
    sys.exit("the list of carried apps was not where it should be")
s = s[:i] + "var BI={};" + s[end + 1:]
if re.search(r'id="(ing-tail:)?ing-builtin-', s) or not re.search(r'var ING_VERSION="[0-9.]+"', s):
    sys.exit("the lean page is not right")
open(dst, "w", encoding="utf-8").write(s)
print("lean Ingenium: %d bytes (left out %d blocks of the apps it carries: %s)" % (len(s.encode("utf-8")), n, ", ".join(sorted(bi))))
