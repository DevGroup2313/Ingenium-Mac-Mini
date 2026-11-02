"""The Forge 647 (second change to its computer programs, 25 October 2026): a new build always shows itself.

The owner's words: "I downloaded the 647 app on GitHub through safari TWICE and it said 646 BOTH times. I even cleared the cache
to make sure." Found: pywebview 6.2.1 serves the page from http://127.0.0.1:42001 and means to forbid caching, but the headers it
sets are dropped (its asset route sets Cache-Control on bottle's response, then returns bottle.static_file, whose own response
replaces those headers), so the page and its parts go out with Last-Modified and ETag only. The web view may then keep a page for
a tenth of its age (WebKit's and Chromium's rule for a response with no lifetime of its own), in its own cache, which outlives the
app being deleted and installed again and is not Safari's: a new build at the same address was shown the old page.

  1. every answer from the Forge's own address says no-store (no Last-Modified or ETag), so nothing is kept from now on;
  2. the first time a build starts (its build read from its own page, against the build noted beside the stored work), the web
     view's cache of pages is emptied before the window opens: on a Mac WKWebsiteDataStore's disk and memory caches, on Windows
     WebView2's Cache folder. Local storage and the databases, where the work is kept, are not touched;
  3. the log says which build started and whether the cache was emptied.
Each change found exactly once, or nothing is written.
    python3 forge_shell_647b.py <the_forge_app.py> [<the_forge_app.py> ...]"""
import sys

CODE = r'''
def _forge_no_store(start_response):
    """647 (forge_shell_647b.py): every answer from the Forge's own address says it is not to be kept."""
    def sr(status, headers, exc_info=None):
        keep = [(k, v) for (k, v) in headers if k.lower() not in ("cache-control", "expires", "pragma", "etag", "last-modified")]
        keep += [("Cache-Control", "no-store, max-age=0"), ("Pragma", "no-cache"), ("Expires", "0")]
        if exc_info is not None:
            return start_response(status, keep, exc_info)
        return start_response(status, keep)
    return sr


def _page_build(path):
    """The build the Forge's page names (window.CD_BUILD's pass and stamp), read from the file, or ''."""
    import re as _re
    try:
        with open(path, "rb") as fh:
            data = fh.read()
        m = _re.search(rb'window\.CD_BUILD=\{date:"[^"]*",pass:"(\d+)",stamp:"([^"]*)"', data)
        return (m.group(1) + b" " + m.group(2)).decode("ascii", "replace") if m else ""
    except Exception:
        return ""


def _forget_old_pages(app_html):
    """647 (forge_shell_647b.py): the first time a build starts, the web view's cache of pages is emptied, so the window shows
    this build's page and not one kept from an earlier build at the same address. The work (local storage, the databases) is
    never touched."""
    build = _page_build(app_html)
    store = storage_dir()
    if not build or not store:
        return
    note = os.path.join(os.path.dirname(store), "page_build.txt")
    try:
        with open(note, encoding="utf-8") as fh:
            before = fh.read().strip()
    except Exception:
        before = ""
    if before == build:
        return
    emptied = False
    try:
        if sys.platform == "darwin":
            import time as _t
            import WebKit
            from Foundation import NSDate, NSRunLoop, NSSet
            kinds = NSSet.setWithArray_([WebKit.WKWebsiteDataTypeDiskCache, WebKit.WKWebsiteDataTypeMemoryCache])
            done = {"ok": False}

            def _done():
                done["ok"] = True
            WebKit.WKWebsiteDataStore.defaultDataStore().removeDataOfTypes_modifiedSince_completionHandler_(
                kinds, NSDate.dateWithTimeIntervalSince1970_(0), _done)
            end = _t.time() + 5
            while not done["ok"] and _t.time() < end:
                NSRunLoop.currentRunLoop().runUntilDate_(NSDate.dateWithTimeIntervalSinceNow_(0.05))
            emptied = done["ok"]
        elif sys.platform.startswith("win"):
            import shutil as _sh
            for rel in (("EBWebView", "Default", "Cache"), ("EBWebView", "Default", "Code Cache")):
                p = os.path.join(store, *rel)
                if os.path.isdir(p):
                    _sh.rmtree(p, ignore_errors=True)
            emptied = True
    except Exception:
        log_problem("page cache: could not be emptied", sys.exc_info())
    log_note("page: build %s starts (the build before: %s); the web view's cache of pages %s"
             % (build, before or "none noted", "emptied" if emptied else "NOT emptied"))
    if emptied:
        try:
            with open(note, "w", encoding="utf-8") as fh:
                fh.write(build)
        except Exception:
            pass

'''

for p in sys.argv[1:]:
    s = open(p, encoding="utf-8", newline="").read()
    if "_forget_old_pages" in s:
        print("already patched", p)
        continue
    nl = "\r\n" if "\r\n" in s else "\n"
    t = s.replace("\r\n", "\n")

    def rep(old, new, n=1):
        global t
        c = t.count(old)
        if c != n:
            sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:80]))
        t = t.replace(old, new)

    rep("\ndef main():\n", CODE + "\ndef main():\n")
    rep("                return inner(environ, start_response)\n",
        "                return inner(environ, _forge_no_store(start_response))  # 647 (forge_shell_647b.py)\n")
    rep('    log_problem("start: locating the window component")\n',
        '    try:\n        _forget_old_pages(app_html)  # 647 (forge_shell_647b.py)\n    except Exception:\n'
        '        log_problem("page cache: the check failed", sys.exc_info())\n'
        '    log_problem("start: locating the window component")\n')
    for need in ("\nimport os\n", "\nimport sys\n", "\ndef storage_dir():", "\ndef log_note(", "\ndef log_problem("):
        if need not in t:
            sys.exit("%s: %r is missing" % (p, need.strip()))
    open(p, "w", encoding="utf-8", newline="").write(t.replace("\n", nl))
    print("patched", p)
