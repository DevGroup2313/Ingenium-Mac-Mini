"""Ingenium 6.20 (4 November 2026): Your page's downloads, written by the computer app from the file itself.

A whole page is about 76 MB; handed to the app's save call as base64 it crossed the page's bridge as some 100 MB in one piece.
Now the app saves it from the file it already has:
- page_save(pid, name): the page running (pid "") or a version kept, copied where she chooses in the computer's own save dialog.
- page_export(piece, first, last, name): the Workshop's lighter copy from Code, in pieces of text (about 15 MB in all); on the last,
  what the page carries at its end is put back from the running page (app_page_619.py's _page_complete), and the whole page is
  written where she chooses. No version is kept.
Both answer the path written, "cancelled", or {"ok": False, "error": ...}.
    python3 desktop/app_page_620.py <repo>/ingenium_app.py      (after app_page_619.py)
"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()
if "_page_save" in s:
    sys.exit(0)
if "_page_choose" not in s:
    sys.exit("app_page_620: app_page_619.py must be applied first")


def put(old, new, times=1, label=""):
    global s
    n = s.count(old)
    if n != times:
        sys.exit("app_page_620: %s found %d times, not %d" % (label or old[:60], n, times))
    s = s.replace(old, new)


OLD = "    def page_started(self):\n        return _page_started()\n"
NEW = OLD + '''
    def page_save(self, pid="", name="ingenium.html"):
        return _page_save(pid, name)

    def page_export(self, piece, first=False, last=False, name="ingenium.html"):
        return _page_export(piece, first, last, name)
'''
put(OLD, NEW, 2, "page_started")

FN = r'''def _page_save_target(name):
    """Where she chooses, in the computer's own save dialog: (path, shown)."""
    keep = " ._-()[]"
    safe = "".join(c for c in str(name or "ingenium.html") if c.isalnum() or c in keep).strip() or "ingenium.html"
    try:
        import webview
        ws = [x for x in (getattr(webview, "windows", None) or []) if x is not None]
        if ws:
            res = ws[0].create_file_dialog(webview.SAVE_DIALOG, save_filename=safe)
            if not res:
                return None, True
            return (res if isinstance(res, str) else res[0]), True
    except Exception:
        log_problem("pages: save dialog unavailable", sys.exc_info())
    try:
        d = os.path.join(os.path.expanduser("~"), "Downloads")
        if not os.path.isdir(d):
            d = os.path.expanduser("~")
        return os.path.join(d, safe), False
    except Exception:
        return None, False


def _page_save(pid="", name="ingenium.html"):
    """6.20 (app_page_620.py): the page running ("") or a version kept, copied where she chooses."""
    pid = str(pid or "")
    src = _page_file(pid) if pid else _APP_HTML_PATH
    if not src or not os.path.isfile(src):
        return {"ok": False, "error": "that page is not on this computer"}
    with _SAVE_LOCK:
        target, shown = _page_save_target(name)
        if shown and not target:
            return "cancelled"
        if not target:
            return {"ok": False, "error": "no folder to save it in"}
        try:
            shutil.copyfile(src, target)
            log_problem("pages: %s saved to %s" % (pid or "the page running", target))
            return target
        except Exception as e:
            log_problem("pages: saving the page failed", sys.exc_info())
            return {"ok": False, "error": str(e)}


def _page_export(piece, first=False, last=False, name="ingenium.html"):
    """6.20 (app_page_620.py): the lighter copy, in pieces; on the last, made whole and written where she chooses."""
    d = _pages_dir()
    if not d:
        return {"ok": False, "error": "this computer has no folder for pages"}
    inc = os.path.join(d, "export.part")
    try:
        with _PAGE["lock"]:
            with open(inc, "wb" if first else "ab") as fh:
                fh.write(str(piece or "").encode("utf-8"))
        if not last:
            return {"ok": True, "bytes": os.path.getsize(inc)}
        raw = open(inc, "rb").read()
        try:
            os.remove(inc)
        except Exception:
            pass
        text, back, missing = _page_complete(raw)
        with _SAVE_LOCK:
            target, shown = _page_save_target(name)
            if shown and not target:
                return "cancelled"
            if not target:
                return {"ok": False, "error": "no folder to save it in"}
            with open(target, "wb") as fh:
                fh.write(text)
        log_problem("pages: the lighter copy saved whole to %s (%d carried blocks put back; missing %r)" % (target, back, missing))
        return target
    except Exception as e:
        log_problem("pages: the copy could not be saved", sys.exc_info())
        return {"ok": False, "error": str(e)}


'''
put("class IngeniumApi(_LiteWindows):", FN + "class IngeniumApi(_LiteWindows):", 1, "the API class")
open(p, "w", encoding="utf-8").write(s)
print("app_page_620: Your page's downloads from the file itself, in", p)
