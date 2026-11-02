"""Ingenium 6.9.1 (31 October 2026): open_url(url), an https address opened in the computer's own browser (GitHub's own
sign-in page, a build on GitHub). pywebview's Mac backend drops a window.open made from a script, so the page asks the app.
    python3 desktop/app_open_691.py <repo>/ingenium_app.py
"""
import sys
p = sys.argv[1]
s = open(p, encoding="utf-8").read()
if "_open_url" in s:
    sys.exit(0)
OLD = "    def take_screenshot(self):\n        return _take_screenshot()\n"
NEW = OLD + "\n    def open_url(self, url):\n        return _open_url(url)\n"
n = s.count(OLD)
if n != 2:
    sys.exit("app_open_691: take_screenshot found %d times, not 2" % n)
s = s.replace(OLD, NEW)
anchor = "class IngeniumApi(_LiteWindows):"
if s.count(anchor) != 1:
    sys.exit("app_open_691: the API class was not found once")
fn = '''def _open_url(url):
    """6.9.1: an https address, opened in the computer's own browser (GitHub's sign-in page, a build on GitHub)."""
    import webbrowser
    u = str(url or "").strip()
    bad = any(ch in u for ch in " \\t\\r\\n<>\\"'")
    if bad or not u.lower().startswith("https://") or len(u) < 9:
        return {"ok": False, "error": "only an https address can be opened"}
    try:
        return {"ok": bool(webbrowser.open(u))}
    except Exception as e:
        return {"ok": False, "error": str(e)}


'''
s = s.replace(anchor, fn + anchor, 1)
open(p, "w", encoding="utf-8").write(s)
print("open_url: added to", p)
