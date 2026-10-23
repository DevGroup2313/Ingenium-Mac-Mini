"""Ingenium 6.2: windows of their own open reliably and have a way back (patch for ingenium_app.py, Mac and Windows)."""
import sys
p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


# 1. open_lite: the window reads the lighter page (the same desk, without what a window of its own never uses)
rep('''        try:
            import webview
            _LITE["parcels"][tok] = json.dumps({"which": which, "handoff": p.get("handoff")})
            win = webview.create_window(''', '''        # 6.2: a window of its own reads the window page (ingenium_window.html, served beside the page by
        # _start_local_server): the same page without the apps Ingenium carries, the engine's WebAssembly and the kit
        # store, about a quarter of its size, so it opens about four times sooner
        url = re.sub(r"/ingenium\\.html#", "/ingenium_window.html#", url, count=1)
        try:
            import webview
            _LITE["parcels"][tok] = json.dumps({"which": which, "handoff": p.get("handoff")})
            win = webview.create_window(''')

# 2. lite_take: the new window comes to the front once it has the app
rep('''    def lite_take(self, tok):
        parcel = _LITE["parcels"].pop(str(tok), None)
        if parcel is not None:
            _LITE["taken"].add(str(tok))
        return parcel''', '''    def lite_take(self, tok):
        parcel = _LITE["parcels"].pop(str(tok), None)
        if parcel is not None:
            _LITE["taken"].add(str(tok))
            # 6.2: it comes forward, so the app never seems to vanish behind the main window
            _lite_forward(_LITE["wins"].get(str(tok)))
        return parcel

    # 6.2: the main window's Desk bar keeps a tab for each window of its own: the tab brings that window forward, and its
    # second key asks the window to send its app back into the main window's desk (lite_cmd "home", read by lite_cmds).
    def lite_focus(self, tok):
        w = _LITE["wins"].get(str(tok))
        if w is None:
            return False
        _lite_forward(w)
        return True

    def lite_cmd(self, tok, cmd):
        tok, cmd = str(tok), str(cmd)
        if cmd not in ("home",) or tok not in _LITE["wins"]:
            return False
        with _LITE["lock"]:
            q = _LITE["cmds"].setdefault(tok, [])
            if cmd not in q:
                q.append(cmd)
        return True

    def lite_cmds(self, tok):
        with _LITE["lock"]:
            q = _LITE["cmds"].pop(str(tok), [])
        return json.dumps(q)

    def main_focus(self):
        _lite_forward(getattr(self, "main_window", None))
        return True''')

# 3. the state: the commands waiting for each window
rep('''_LITE = {"wins": {}, "parcels": {}, "taken": set(), "blocked": False, "creating": False, "lock": threading.RLock(),
         "queue": [], "hub": {}, "seq": 0}''', '''_LITE = {"wins": {}, "parcels": {}, "taken": set(), "blocked": False, "creating": False, "lock": threading.RLock(),
         "queue": [], "hub": {}, "seq": 0, "cmds": {}}


def _lite_forward(win):
    """6.2: a window brought to the front (shown, restored if folded into the Dock or the taskbar)."""
    if win is None:
        return
    for name in ("restore", "show"):
        try:
            getattr(win, name)()
        except Exception:
            pass''')

# 4. a window closed by hand: the main window's Desk bar is told, and its tab goes
rep('''def _lite_closed(tok):
    _LITE["wins"].pop(tok, None)
    _LITE["taken"].discard(tok)''', '''def _lite_closed(tok):
    _LITE["wins"].pop(tok, None)
    _LITE["taken"].discard(tok)
    with _LITE["lock"]:
        _LITE["cmds"].pop(tok, None)
        if len(_LITE["queue"]) < 200:
            _LITE["queue"].append(json.dumps({"kind": "gone", "tok": str(tok)}))''')

# 5. the server: the window page, made once from the page and kept while the page is unchanged
rep('''            if path.startswith("/_models/"):''', '''            if path == "/ingenium_window.html" and html_path:
                data = _window_page(html_path)
                if data is None:
                    return http.server.SimpleHTTPRequestHandler.do_GET(self)
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                try:
                    self.wfile.write(data)
                except Exception:
                    pass
                return
            if path.startswith("/_models/"):''')
rep('''def _start_local_server(directory, html_name=None):''', '''# 6.2: the page a window of its own reads. A window of its own shows one app and the side keys; it never keeps the apps
# Ingenium carries in the library (r120 skips it), never runs a model in the page and never makes kits, so the blocks
# that hold those (about three quarters of the page) are left out of it. Each block is removed whole, so the page's own
# checks see it absent, as in a copy that never carried it.
_WINDOW_DROP = ("ing-builtin-cd", "ing-builtin-forge", "ing-builtin-inkwell", "ingenium-kit-bundle",
                "ingenium-engine-wasm", "ingenium-engine-compat-wasm", "ing-eyes")
_WINDOW_CACHE = {"key": None, "data": None}


def _window_page(html_path):
    try:
        st = os.stat(html_path)
        key = (st.st_mtime_ns, st.st_size)
        if _WINDOW_CACHE["key"] == key:
            return _WINDOW_CACHE["data"]
        text = open(html_path, "rb").read()
        for ident in _WINDOW_DROP:
            text = re.sub(rb'<script\\b[^>]*\\bid="' + ident.encode() + rb'"[^>]*>[^<]*</script>', b"", text, count=1)
        _WINDOW_CACHE["key"], _WINDOW_CACHE["data"] = key, text
        return text
    except Exception:
        log_problem("window page", sys.exc_info())
        return None


def _start_local_server(directory, html_name=None):''')
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
