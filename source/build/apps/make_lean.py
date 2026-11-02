# R124: the lean copy of Ingenium that The Forge carries: the release page exactly, without the apps Ingenium carries
# (a page cannot hold a full copy of an app that holds a full copy of it back; the owner chose lean copies, 18 October 2026).
# Usage:  python3 -I make_lean.py path/to/ingenium.html path/to/ingenium_lean.html
import json, re, sys

src, dst = sys.argv[1], sys.argv[2]
s = open(src, encoding="utf-8").read()
s, n = re.subn(r'<script type="text/plain" id="ing-builtin-(?:forge|inkwell|cd)">[A-Za-z0-9+/=]*</script>\n?', "", s)
i = s.find("var BI=")
if n < 1 or i < 0:
    sys.exit("this page carries no apps to leave out")
bi, end = json.JSONDecoder().raw_decode(s, i + len("var BI="))
if not isinstance(bi, dict) or s[end:end + 1] != ";":
    sys.exit("the list of carried apps was not where it should be")
s = s[:i] + "var BI={};" + s[end + 1:]
if 'id="ing-builtin-' in s or not re.search(r'var ING_VERSION="[0-9.]+"', s):
    sys.exit("the lean page is not right")
open(dst, "w", encoding="utf-8").write(s)
print("lean Ingenium: %d bytes (left out %d carried apps: %s)" % (len(s.encode("utf-8")), n, ", ".join(sorted(bi))))
