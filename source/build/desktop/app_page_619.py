"""Ingenium 6.19 (4 November 2026): Ingenium's own page, changed by its author, in place of the built one, on her computers.

The owner's words: "I want full agency and authorship over Ingenium. I want to be able to make proper edits, customise,
troubleshoot, fix, curate, run diagnostics and add or remove new features, pages, sections or different functions in
Ingenium as its author and creator." Her answer on how changes take effect: both, layers first (6.18), then the page itself.

- A changed page is handed over in pieces (page_put) and kept as a version of its own, beside the stored work:
  <the app's folder>/pages/<date-time>/ingenium.html. What the page carries at its end (the apps on the Desk, the engine,
  the kits, the typefaces: build/tail.py) is put back from the running page where the changed one names it but lacks it,
  so the copy a model reads and changes in Code can leave those 61 MB out.
- page_use chooses a version (or the built page, "") for this window now, or for the next start. The address and the
  stored work stay the same: the app's own server serves the chosen page at the same place.
- A changed page counts as working once its Workshop reports in (page_started). One that has not reported in within half a
  minute, or did not come up at a start, is left: Ingenium goes back to the last version that worked, or to the built
  page, on its own, and keeps why, for the Workshop to say. A version that worked before is left after two starts in a row
  that did not come up.
- On a Mac, the app menu also offers "Use the built page", which needs nothing from the page itself.
- When Ingenium itself is updated, a version made on the earlier build is not started in place of the new one: the new built page
  starts, her version is kept, and the Workshop says why; chosen again, it is started on the new build as she asks.
    python3 desktop/app_page_619.py <repo>/ingenium_app.py
"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()
if "_page_choose" in s:
    sys.exit(0)


def put(old, new, times=1, label=""):
    global s
    n = s.count(old)
    if n != times:
        sys.exit("app_page_619: %s found %d times, not %d" % (label or old[:60], n, times))
    s = s.replace(old, new)


# ---- 1. the bridge: five calls, in both kinds of window ----
OLD = "    def take_screenshot(self):\n        return _take_screenshot()\n"
NEW = OLD + '''
    # 6.19 (app_page_619.py): Ingenium's own page, changed by its author
    def page_state(self):
        return _page_state()

    def page_put(self, piece, first=False, last=False, note=""):
        return _page_put(piece, first, last, note)

    def page_use(self, pid, now=False):
        return _page_use(pid, now, getattr(self, "_main_window", None))

    def page_drop(self, pid):
        return _page_drop(pid)

    def page_started(self):
        return _page_started()
'''
put(OLD, NEW, 2, "take_screenshot")

# ---- 2. the functions ----
FN = r'''# 6.19 (app_page_619.py): Ingenium's own page, changed by its author, in place of the built one; back to the last that worked
_PAGE = {"builtin": None, "serve": None, "running": "", "port": None, "lock": threading.RLock()}
_PAGE_KEEP = 5  # versions kept; the one in use and the last that worked are never removed
_PAGE_WAIT = 30  # seconds a changed page has to report in, when chosen in the window
_PAGE_TAIL_IDS = ("ing-builtin-cd", "ing-builtin-forge", "ing-builtin-inkwell", "ingenium-kit-bundle", "ingenium-engine-wasm",
                  "ingenium-engine-compat-wasm", "ing-eyes", "ing-docfonts")


def _pages_dir():
    """<the app's folder>/pages, beside storage (so a fresh start that moves the storage aside leaves it in place)."""
    try:
        store = storage_dir()
        if not store:
            return None
        d = os.path.join(os.path.dirname(store.rstrip("\\/")), "pages")
        os.makedirs(d, exist_ok=True)
        return d
    except Exception:
        log_problem("pages: no folder", sys.exc_info())
        return None


def _pages_read():
    st = {"use": "", "good": {}, "tries": {}, "notes": {}, "base": {}, "back": None}
    d = _pages_dir()
    if not d:
        return st
    try:
        with open(os.path.join(d, "pages.json"), encoding="utf-8") as fh:
            got = json.load(fh)
        if isinstance(got, dict):
            if isinstance(got.get("use"), str):
                st["use"] = got["use"]
            for k in ("good", "tries", "notes", "base"):
                if isinstance(got.get(k), dict):
                    st[k] = got[k]
            if isinstance(got.get("back"), dict):
                st["back"] = got["back"]
    except FileNotFoundError:
        pass
    except Exception:
        log_problem("pages: the record could not be read; the built page", sys.exc_info())
    return st


def _pages_write(st):
    d = _pages_dir()
    if not d:
        return False
    try:
        tmp = os.path.join(d, "pages.json.tmp")
        with open(tmp, "w", encoding="utf-8") as fh:
            json.dump(st, fh, indent=1)
        os.replace(tmp, os.path.join(d, "pages.json"))
        return True
    except Exception:
        log_problem("pages: the record could not be written", sys.exc_info())
        return False


def _page_file(pid):
    d = _pages_dir()
    if not d or not re.match(r"^[0-9]{8}-[0-9]{6}(-[0-9]{1,3})?$", str(pid or "")):
        return None
    return os.path.join(d, str(pid), "ingenium.html")


def _page_versions(st=None):
    st = st or _pages_read()
    d = _pages_dir()
    out = []
    if not d:
        return out
    try:
        names = sorted(os.listdir(d), reverse=True)
    except Exception:
        names = []
    for name in names:
        f = _page_file(name)
        if f and os.path.isfile(f):
            try:
                tries = int(st["tries"].get(name, 0) or 0)
            except Exception:
                tries = 0
            out.append({"id": name, "bytes": os.path.getsize(f), "when": os.path.getmtime(f), "good": bool(st["good"].get(name)),
                        "tries": tries, "note": str(st["notes"].get(name, ""))[:300]})
    return out


def _page_back(st, pid, why):
    """The version pid did not start: the last version that worked (or the built page) is used, and why is kept."""
    to = ""
    for v in _page_versions(st):
        if v["id"] != pid and v["good"]:
            to = v["id"]
            break
    st["use"] = to
    st["back"] = {"from": pid, "to": to, "why": why, "at": time.time()}
    if to:
        st["tries"][to] = 0
    _pages_write(st)
    log_problem("pages: %s %s; back to %s" % (pid, why, to or "the built page"))
    return to


def _page_base_id(path):
    """Which build of the built page this is: its size and a hash of its first and last megabyte."""
    try:
        n = os.path.getsize(path)
        h = hashlib.sha256()
        with open(path, "rb") as fh:
            h.update(fh.read(1 << 20))
            if n > (2 << 20):
                fh.seek(n - (1 << 20))
                h.update(fh.read(1 << 20))
        return "%d:%s" % (n, h.hexdigest()[:16])
    except Exception:
        return ""


def _set_app_page(path):
    global _APP_HTML_PATH
    _APP_HTML_PATH = path


def _page_choose(builtin):
    """The page this start serves: the version chosen by the author, unless it did not start; otherwise the built one."""
    with _PAGE["lock"]:
        _PAGE["builtin"] = _PAGE.get("builtin") or builtin
        builtin = _PAGE["builtin"]
        try:
            st = _pages_read()
            pid = st.get("use") or ""
            base = _page_base_id(builtin) if builtin else ""
            if pid and base and st["base"].get(pid) and st["base"][pid] != base:
                pid = _page_back(st, pid, "was made on an earlier build of Ingenium, and Ingenium has been updated")
            for _ in range(_PAGE_KEEP + 2):
                if not pid:
                    break
                f = _page_file(pid)
                if not f or not os.path.isfile(f):
                    pid = _page_back(st, pid, "was not found")
                    continue
                try:
                    tries = int(st["tries"].get(pid, 0) or 0)
                except Exception:
                    tries = 0
                limit = 2 if st["good"].get(pid) else 1
                if tries >= limit:
                    pid = _page_back(st, pid, "did not start" + (" twice in a row" if limit == 2 else ""))
                    continue
                st["tries"][pid] = tries + 1
                _pages_write(st)
                _PAGE["serve"], _PAGE["running"] = f, pid
                log_problem("pages: starting with the author's page %s (try %d)" % (pid, tries + 1))
                return f
        except Exception:
            log_problem("pages: choosing the page failed; the built page", sys.exc_info())
        _PAGE["serve"], _PAGE["running"] = None, ""
        return builtin


def _page_started():
    """The page's Workshop reports in: the version running works."""
    pid = _PAGE.get("running") or ""
    if not pid:
        return {"ok": True, "running": ""}
    with _PAGE["lock"]:
        st = _pages_read()
        st["good"][pid] = True
        st["tries"][pid] = 0
        _pages_write(st)
    log_problem("pages: the author's page %s reported in" % pid)
    return {"ok": True, "running": pid}


def _page_state():
    st = _pages_read()
    b = _PAGE.get("builtin")
    try:
        bb = os.path.getsize(b) if b and os.path.isfile(b) else 0
    except Exception:
        bb = 0
    return {"ok": True, "use": st.get("use") or "", "running": _PAGE.get("running") or "", "versions": _page_versions(st),
            "back": st.get("back"), "builtin": {"bytes": bb}, "folder": _pages_dir() or "", "now": bool(_PAGE.get("port"))}


def _page_tails(text):
    """{id: the whole block}, for the blocks a page carries at its end (build/tail.py)."""
    out = {}
    for m in re.finditer(rb'<script id="ing-tail:([^"]+)"[^>]*>[^<]*</script>\n?', text):
        out[m.group(1).decode("ascii", "replace")] = m.group(0)
    return out


def _page_complete(text):
    """(page, put back, missing): the blocks the page names but lacks, put back from the running page, before </body>."""
    for ident in _PAGE_TAIL_IDS:  # a page saved from the window names the app's own address for them (app_quick_681.py)
        text = text.replace(b'data-defer="/_payload/' + ident.encode() + b'"', b'data-defer="#ing-tail:' + ident.encode() + b'"')
        text = re.sub(rb'(data-defer="#ing-tail:' + re.escape(ident.encode()) + rb'") data-defer-bytes="\d+"', rb"\1", text)
    named = [m.decode("ascii", "replace") for m in re.findall(rb'data-defer="#ing-tail:([^"]+)"', text)]
    have = _page_tails(text)
    want = [k for k in dict.fromkeys(named) if k not in have]
    if not want:
        return text, 0, []
    try:
        with open(_APP_HTML_PATH, "rb") as fh:
            running = _page_tails(fh.read())
    except Exception:
        running = {}
    add = b"".join((running[k] if running[k].endswith(b"\n") else running[k] + b"\n") for k in want if k in running)
    missing = [k for k in want if k not in running]
    i = text.rfind(b"</body>")
    text = (text[:i] + add + text[i:]) if i >= 0 else (text + add)
    return text, len(want) - len(missing), missing


def _page_take(inc, note):
    raw = open(inc, "rb").read()
    try:
        raw.decode("utf-8")
    except UnicodeDecodeError:
        return {"ok": False, "error": "the page is not text Ingenium can read (UTF-8)"}
    low = raw[:4096].lower()
    if b"<html" not in low and b"<!doctype html" not in low:
        return {"ok": False, "error": "this is not a web page"}
    if b"__INGENIUM_BOOTED" not in raw:
        return {"ok": False, "error": "this is not Ingenium's page: it never says it has started (window.__INGENIUM_BOOTED)"}
    text, back, missing = _page_complete(raw)
    d = _pages_dir()
    pid = time.strftime("%Y%m%d-%H%M%S")
    k = 2
    while os.path.exists(os.path.join(d, pid)):
        pid = time.strftime("%Y%m%d-%H%M%S") + "-%d" % k
        k += 1
    os.makedirs(os.path.join(d, pid))
    with open(os.path.join(d, pid, "ingenium.html"), "wb") as fh:
        fh.write(text)
    try:
        os.remove(inc)
    except Exception:
        pass
    with _PAGE["lock"]:
        st = _pages_read()
        if note:
            st["notes"][pid] = str(note)[:300]
        if _PAGE.get("builtin"):
            st["base"][pid] = _page_base_id(_PAGE["builtin"])
        _pages_write(st)
        _page_prune(st)
    log_problem("pages: version %s kept (%d bytes; %d carried blocks put back; missing %r)" % (pid, len(text), back, missing))
    return {"ok": True, "id": pid, "bytes": len(text), "put_back": back, "missing": missing}


def _page_prune(st):
    """At most _PAGE_KEEP versions; the one in use, the one running and the last that worked stay."""
    vs = _page_versions(st)
    keep = set([st.get("use") or "", _PAGE.get("running") or ""])
    for v in vs:
        if v["good"]:
            keep.add(v["id"])
            break
    extra = [v for v in vs[_PAGE_KEEP:] if v["id"] not in keep]
    for v in extra:
        _page_remove(st, v["id"])
    if extra:
        _pages_write(st)


def _page_remove(st, pid):
    f = _page_file(pid)
    if f:
        shutil.rmtree(os.path.dirname(f), ignore_errors=True)
    for k in ("good", "tries", "notes", "base"):
        st[k].pop(pid, None)


def _page_put(piece, first=False, last=False, note=""):
    """A changed page, in pieces of text (in order); the last piece keeps it as a version of its own."""
    d = _pages_dir()
    if not d:
        return {"ok": False, "error": "this computer has no folder for pages"}
    inc = os.path.join(d, "incoming.part")
    try:
        with _PAGE["lock"]:
            with open(inc, "wb" if first else "ab") as fh:
                fh.write(str(piece or "").encode("utf-8"))
        if not last:
            return {"ok": True, "bytes": os.path.getsize(inc)}
        return _page_take(inc, note)
    except Exception as e:
        log_problem("pages: a piece could not be kept", sys.exc_info())
        return {"ok": False, "error": str(e)}


def _page_drop(pid):
    pid = str(pid or "")
    with _PAGE["lock"]:
        st = _pages_read()
        if pid in (st.get("use"), _PAGE.get("running")):
            return {"ok": False, "error": "that version is in use; choose another first"}
        if not _page_file(pid) or not os.path.isfile(_page_file(pid)):
            return {"ok": False, "error": "that version is not kept"}
        _page_remove(st, pid)
        _pages_write(st)
    return {"ok": True}


def _page_use(pid, now=False, window=None):
    """Choose a version ("" for the built page): now, in this window, or at the next start."""
    pid = str(pid or "")
    if pid and not (_page_file(pid) and os.path.isfile(_page_file(pid))):
        return {"ok": False, "error": "that version is not kept"}
    with _PAGE["lock"]:
        st = _pages_read()
        st["use"] = pid
        if pid:
            st["tries"][pid] = 0
            if _PAGE.get("builtin"):
                st["base"][pid] = _page_base_id(_PAGE["builtin"])  # chosen on the build installed now
        st["back"] = None
        _pages_write(st)
    if now and window is not None and _PAGE.get("port"):
        return _page_switch(window)
    return {"ok": True, "use": pid, "restart": True}


def _page_switch(window):
    """In this window, now: the chosen page is served at the same address and loaded afresh. A changed page that has not
    reported in within half a minute is left, and the last that worked is loaded instead."""
    f = _page_choose(_PAGE.get("builtin"))
    _set_app_page(f)
    pid = _PAGE.get("running") or ""
    name = os.path.basename(_PAGE.get("builtin") or "ingenium.html")
    url = "http://127.0.0.1:%d/%s?b=%s" % (_PAGE["port"], name, _page_mark(f))
    try:
        if _GFX_SOFT[0]:
            url += "&softgpu=1"
    except Exception:
        pass

    def go():
        done = False
        try:
            if sys.platform == "darwin" and "_restart_page_process" in globals():
                done = _restart_page_process(window, url)
            if not done:
                window.load_url(url)
            log_problem("pages: the window loads %s" % (pid or "the built page"))
        except BaseException:
            log_problem("pages: the window could not load the page", sys.exc_info())

    threading.Thread(target=go, daemon=True).start()
    if pid and not _pages_read()["good"].get(pid):
        def watch():
            time.sleep(_PAGE_WAIT)
            with _PAGE["lock"]:
                if _PAGE.get("running") != pid or _pages_read()["good"].get(pid):
                    return
                _page_back(_pages_read(), pid, "did not start")
            _page_switch(window)
        threading.Thread(target=watch, daemon=True).start()
    return {"ok": True, "running": pid, "now": True}


def _page_not_up(window):
    """The load watchdog found the page not started: a changed page that never worked is left at once."""
    pid = _PAGE.get("running") or ""
    if not pid or not _PAGE.get("port") or _pages_read()["good"].get(pid):
        return False
    with _PAGE["lock"]:
        _page_back(_pages_read(), pid, "did not start")
    _page_switch(window)
    return True


'''
put("class IngeniumApi(_LiteWindows):", FN + "class IngeniumApi(_LiteWindows):", 1, "the API class")

# ---- 3. the start: the chosen page, served at the built page's own address ----
put("    app_html = find_app_html()\n    _APP_HTML_PATH = app_html\n",
    "    app_html = find_app_html()\n    _APP_HTML_PATH = _page_choose(app_html) if app_html else app_html  # 6.19 (app_page_619.py)\n",
    1, "main's page")
put("    html_path = os.path.join(directory, html_name) if html_name else None\n    engine_cache = {}\n",
    "    html_path0 = os.path.join(directory, html_name) if html_name else None\n    engine_cache = {}\n", 1, "the served path")
put("        def do_GET(self):\n            if not self._ing_host_ok():\n                return\n            path = self.path.split(\"?\", 1)[0]\n",
    "        def do_GET(self):\n            if not self._ing_host_ok():\n                return\n"
    "            html_path = _PAGE.get(\"serve\") or html_path0  # 6.19 (app_page_619.py): the author's page, when chosen\n"
    "            path = self.path.split(\"?\", 1)[0]\n", 1, "do_GET")
put("            return http.server.SimpleHTTPRequestHandler.do_GET(self)\n\n        def _serve_model(self, mid):",
    "            if _PAGE.get(\"serve\") and html_path and path == \"/\" + os.path.basename(html_path0 or \"\"):\n"
    "                try:  # 6.19: the page itself, read whole (the Workshop, the kits), is the one running\n"
    "                    with open(html_path, \"rb\") as fh:\n"
    "                        data = fh.read()\n"
    "                    self.send_response(200)\n"
    "                    self.send_header(\"Content-Type\", \"text/html; charset=utf-8\")\n"
    "                    self.send_header(\"Content-Length\", str(len(data)))\n"
    "                    self.end_headers()\n"
    "                    self.wfile.write(data)\n"
    "                except Exception:\n"
    "                    log_problem(\"pages: the page could not be served whole\", sys.exc_info())\n"
    "                return\n"
    "            return http.server.SimpleHTTPRequestHandler.do_GET(self)\n\n        def _serve_model(self, mid):",
    1, "the whole page")
put("        port = _start_local_server(directory, name)\n",
    "        port = _start_local_server(directory, name)\n        _PAGE[\"port\"] = port  # 6.19 (app_page_619.py)\n", 1, "the port")
put('local_url = "http://127.0.0.1:%d/%s?b=%s" % (port, name, _page_mark(app_html_path))',
    'local_url = "http://127.0.0.1:%d/%s?b=%s" % (port, name, _page_mark(_PAGE.get("serve") or app_html_path))', 1, "the mark")

# ---- 4. the watchdog: a changed page that never worked and did not come up is left at once ----
put('        log_problem("load: page answered but NOT verified: %r" % (pr1,))\n',
    '        log_problem("load: page answered but NOT verified: %r" % (pr1,))\n'
    '        if _page_not_up(win):  # 6.19 (app_page_619.py)\n'
    '            write_diag(["first check: the author\'s page did not start; back to the last that worked"] + _probe_lines(pr1))\n'
    '            return\n', 1, "the watchdog")

# ---- 5. the Mac's app menu: the built page, whatever the page itself can do ----
MENU = '        return [Menu("__app__", [MenuAction("Refresh %s" % APP_NAME, refresh_ingenium)])]'
if MENU in s:
    put(MENU, '''        def built_page():  # 6.19 (app_page_619.py)
            threading.Thread(target=_page_use, args=("", True, window), daemon=True).start()

        return [Menu("__app__", [MenuAction("Refresh %s" % APP_NAME, refresh_ingenium),
                                 MenuAction("Use the built page", built_page)])]''', 1, "the app menu")

open(p, "w", encoding="utf-8").write(s)
print("app_page_619: the author's page, in place of the built one, in", p)
