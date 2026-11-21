"""Ingenium 7.64 · rig/t_758_run_self.py (7.58's headless computer app, run_app.py's) for rig/t_764_self_page.js, with three calls of the
test's own (never in the app): POST /test/keys [{kid, x, y}] puts the test's owner key in place of the owner's, POST /test/release
"<version>" sets the release the app says it is, and POST /test/give "<path>" answers as self_give_pick does once that page is chosen in the
system's dialog (which a headless test cannot open), in this process only. Everything else is run_app.py's: the page served by the app's own server (port 17953..), the
bridge on <api_port> as POST /call/<method> with a JSON list of arguments.

    python3 rig/t_764_run_self.py <app_dir> <api_port>"""
import sys, os, json, http.server, socketserver, importlib.util, inspect, traceback
app_dir = os.path.abspath(sys.argv[1]); api_port = int(sys.argv[2])
sys.path.insert(0, app_dir)
spec = importlib.util.spec_from_file_location("ingenium_app", os.path.join(app_dir, "ingenium_app.py"))
ia = importlib.util.module_from_spec(spec); spec.loader.exec_module(ia)
api = ia.IngeniumApi("http://127.0.0.1/")
names = [n for n, v in inspect.getmembers(ia.IngeniumApi, inspect.isfunction) if not n.startswith("_")]
page = os.path.join(app_dir, "ingenium.html")
ia._PAGE["builtin"] = page
ia._APP_HTML_PATH = page
port = ia._start_local_server(app_dir, "ingenium.html")
class H(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    def do_OPTIONS(self):
        self.send_response(204); self._cors(); self.end_headers()
    def _send(self, obj):
        body = json.dumps(obj, default=str).encode()
        self.send_response(200); self._cors(); self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body))); self.end_headers(); self.wfile.write(body)
    def do_GET(self):
        self._send({"names": names, "port": port, "data": os.environ.get("XDG_DATA_HOME", "")})
    def do_POST(self):
        ln = int(self.headers.get("Content-Length") or 0)
        args = json.loads(self.rfile.read(ln) or b"[]")
        if self.path == "/test/keys":
            ia._SELF_KEYS = list(args); ia._SELF["last"] = None
            return self._send({"ok": True, "keys": [k.get("kid") for k in ia._SELF_KEYS]})
        if self.path == "/test/give":
            return self._send({"ok": True, "v": ia._self2_give_read(str(args))})
        if self.path == "/test/release":
            ia._SELF_RELEASE = str(args); ia._SELF["last"] = None
            return self._send({"ok": True, "release": ia._SELF_RELEASE})
        n = self.path.rsplit("/", 1)[-1]
        try:
            res = {"ok": True, "v": getattr(api, n)(*args)}
        except Exception as e:
            traceback.print_exc()
            res = {"ok": False, "e": str(e)}
        self._send(res)
class S(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
print(json.dumps({"page_port": port, "api_port": api_port, "names": names}), flush=True)
S(("127.0.0.1", api_port), H).serve_forever()
