"""Ingenium 6.2: the app's own address answers the app's own window only (patch for ingenium_app.py, Mac and Windows; applied
after app_lite_62.py, app_refresh_62.py, app_ctx_62.py and app_quick_62.py).

The owner's words (2026): "I want to be protected from someone stealing my code and also hacking into the apps and releasing
malicious software or to steal data and information."
The app serves its page, its engine and the model files on the computer's own address (127.0.0.1, port 17953 or the next free
one). Nothing off the computer can reach it, but a web page open in any browser on it can try "DNS rebinding": it points a
name it owns at 127.0.0.1, waits, and then reads the app's address as if it were its own site, so the page (the code), the
engine and the models could be read and carried off. A browser always says which name it asked for (the Host header), and
the app's window always asks for 127.0.0.1 or localhost at the app's own port; so every request that names anything else is
now refused (421, and nothing is read), before any file, model or relay is touched. The relay (/_relay) also keeps its
own secret header and its Origin check, as before.

    python3 build/desktop/app_guard_62.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_ing_host_ok" in s:
    print("already patched", p)
    sys.exit(0)

rep('''        def do_POST(self):
            if self.path.split("?", 1)[0] == "/_relay":
                return _relay_stream(self)''', '''        # 6.2 (app_guard_62.py): the app's own address answers only a request that names it, as the app's window does
        def _ing_host_ok(self):
            port = self.server.server_address[1]
            host = (self.headers.get("Host") or "").strip().lower()
            if host in ("127.0.0.1:%d" % port, "localhost:%d" % port, "[::1]:%d" % port):
                return True
            body = b"This address answers only Ingenium's own window."
            try:
                self.send_response(421)
                self.send_header("Content-Type", "text/plain; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.send_header("Connection", "close")
                self.end_headers()
                self.wfile.write(body)
            except Exception:
                pass
            return False

        def do_HEAD(self):
            if not self._ing_host_ok():
                return
            return http.server.SimpleHTTPRequestHandler.do_HEAD(self)

        def do_POST(self):
            if not self._ing_host_ok():
                return
            if self.path.split("?", 1)[0] == "/_relay":
                return _relay_stream(self)''')
rep('''        def do_GET(self):
            path = self.path.split("?", 1)[0]
            if path == "/_engine/has" or path.startswith("/_engine/part/"):''', '''        def do_GET(self):
            if not self._ing_host_ok():
                return
            path = self.path.split("?", 1)[0]
            if path == "/_engine/has" or path.startswith("/_engine/part/"):''')
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
