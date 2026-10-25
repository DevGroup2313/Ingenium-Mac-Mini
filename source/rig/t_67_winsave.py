"""Ingenium 6.7 · the Windows desktop app's own saving (ingenium_app.py: IngeniumApi.save_file, then save_bytes), run headless
for rig/t_67_kits.js: only pywebview is stood in for, by a window whose save dialog accepts the name it is offered, as a
person pressing Save does. Each save is answered with the path written, the name the dialog was offered, and the SHA-256
and size of the bytes on disk, so the test can compare them with the package the page made.

  python3 -I rig/t_67_winsave.py path/to/ingenium_app.py <folder to save into> <port>"""
import hashlib, http.server, importlib.util, json, os, socketserver, sys, types

APP, OUTD, PORT = sys.argv[1], os.path.abspath(sys.argv[2]), int(sys.argv[3])
os.makedirs(OUTD, exist_ok=True)
offered = []


class Win:
    def create_file_dialog(self, kind, save_filename=None, **k):
        offered.append(save_filename)
        return os.path.join(OUTD, save_filename)


wv = types.ModuleType("webview")
wv.SAVE_DIALOG = 30
wv.settings = {}
wv.windows = [Win()]
sys.modules["webview"] = wv
spec = importlib.util.spec_from_file_location("ingenium_app", APP)
ia = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ia)
api = ia.IngeniumApi("http://127.0.0.1/")


class H(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_POST(self):
        n = int(self.headers.get("Content-Length") or 0)
        args = json.loads(self.rfile.read(n) or b"[]")
        try:
            path = api.save_file(*args)
            b = open(path, "rb").read() if isinstance(path, str) and os.path.isfile(path) else b""
            res = {"ok": True, "path": path, "offered": offered[-1] if offered else None, "sha256": hashlib.sha256(b).hexdigest(), "size": len(b)}
        except Exception as e:
            res = {"ok": False, "e": repr(e)}
        body = json.dumps(res).encode()
        self.send_response(200)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


class S(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True


print(json.dumps({"port": PORT, "save_file": hasattr(api, "save_file")}), flush=True)
S(("127.0.0.1", PORT), H).serve_forever()
