"""Ingenium 6.2: a quicker start in the computer apps (patch for ingenium_app.py, Mac and Windows; the Forge's own app takes
the same, forge_quick_62.py).

The owner's words (23 October 2026): "I want both Ingenium and the Forge to be expanded to run faster on the mac mini."
Ingenium's page is about 54 MB, and the web view reads all of it before Ingenium can be used; some 43 MB of it are things
carried for later (the apps Ingenium keeps in its library, the page's own engine, the picture reader, the kit store), read
only when they are used. The window's own load of the page is now given the page without them (about 11 MB): each is left
in place as an empty block that names where it is (data-defer="/_payload/<id>"), and the page fetches it from this app
the first time it is used (modules/r161.js). Any other request for the page (the page fetching itself to keep a copy, make
a kit, or show its own code) gets the whole page, as before; so does a web view that does not say a load is the window's
own (Sec-Fetch-Dest: document, sent by WebKit since Safari 16.4 and by WebView2).

    python3 build/desktop/app_quick_62.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_QUICK_DEFER" in s:
    print("already patched", p)
    sys.exit(0)

rep('''def _start_local_server(directory, html_name=None):''', '''# 6.2: the page as the window first reads it: what is carried for later stays on this side until the page asks for it
_QUICK_DEFER = ("ing-builtin-cd", "ing-builtin-forge", "ing-builtin-inkwell", "ingenium-kit-bundle",
                "ingenium-engine-wasm", "ingenium-engine-compat-wasm", "ing-eyes")
_QUICK_CACHE = {"key": None, "page": None, "parts": {}}


def _quick_page(html_path):
    """(page, parts): the page with the carried blocks left empty, each naming where it is, and the blocks themselves."""
    try:
        st = os.stat(html_path)
        key = (st.st_mtime_ns, st.st_size)
        if _QUICK_CACHE["key"] == key:
            return _QUICK_CACHE["page"], _QUICK_CACHE["parts"]
        text = open(html_path, "rb").read()
        parts = {}
        for ident in _QUICK_DEFER:
            m = re.search(rb'(<script\\b[^>]*\\bid="' + re.escape(ident.encode()) + rb'"[^>]*)>([^<]*)</script>', text)
            if not m or len(m.group(2)) < 1024:
                continue
            parts[ident] = m.group(2)
            tag = m.group(1) + b' data-defer="/_payload/' + ident.encode() + b'" data-defer-bytes="' + str(len(m.group(2))).encode() + b'">'
            text = text[:m.start()] + tag + b"</script>" + text[m.end():]
        _QUICK_CACHE.update(key=key, page=text, parts=parts)
        return text, parts
    except Exception:
        log_problem("quick page", sys.exc_info())
        return None, {}


def _start_local_server(directory, html_name=None):''')
rep('''            if path.startswith("/_models/"):
                self._serve_model(path.rsplit("/", 1)[-1])
                return
            return http.server.SimpleHTTPRequestHandler.do_GET(self)''', '''            if path.startswith("/_models/"):
                self._serve_model(path.rsplit("/", 1)[-1])
                return
            # 6.2: the window's own load of the page reads the quick page; a part is given when the page asks for it
            if html_path and path.startswith("/_payload/"):
                page, parts = _quick_page(html_path)
                data = parts.get(path.rsplit("/", 1)[-1])
                if data is None:
                    self.send_response(404)
                    self.send_header("Content-Length", "0")
                    self.end_headers()
                    return
                self.send_response(200)
                self.send_header("Content-Type", "text/plain; charset=us-ascii")
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                try:
                    self.wfile.write(data)
                except Exception:
                    pass
                return
            if (html_path and path == "/" + os.path.basename(html_path) and "full=1" not in self.path
                    and (self.headers.get("Sec-Fetch-Dest") or "").lower() == "document"):
                page, parts = _quick_page(html_path)
                if page is not None:
                    self.send_response(200)
                    self.send_header("Content-Type", "text/html; charset=utf-8")
                    self.send_header("Content-Length", str(len(page)))
                    self.end_headers()
                    try:
                        self.wfile.write(page)
                    except Exception:
                        pass
                    return
            return http.server.SimpleHTTPRequestHandler.do_GET(self)''')
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
