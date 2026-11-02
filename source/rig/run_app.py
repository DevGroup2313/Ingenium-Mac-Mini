"""Run Ingenium's desktop back-end headless (no pywebview window) for tests.
Usage: python3 run_app.py <app_dir> <api_port>
<app_dir> holds ingenium_app.py, ingenium.html, engine/linux-x64/llama-server, models/.
The page is served by the app's own server (port 17953..); the API is served on
<api_port> as POST /call/<method> with a JSON list of arguments."""
import sys, os, json, threading, http.server, socketserver, importlib.util, inspect, traceback
app_dir = os.path.abspath(sys.argv[1]); api_port = int(sys.argv[2])
sys.path.insert(0, app_dir)
spec = importlib.util.spec_from_file_location("ingenium_app", os.path.join(app_dir, "ingenium_app.py"))
ia = importlib.util.module_from_spec(spec); spec.loader.exec_module(ia)
api = ia.IngeniumApi("http://127.0.0.1/")
names = [n for n, v in inspect.getmembers(ia.IngeniumApi, inspect.isfunction) if not n.startswith("_")]
port = ia._start_local_server(app_dir, "ingenium.html")
class H(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    def do_OPTIONS(self):
        self.send_response(204); self._cors(); self.end_headers()
    def do_GET(self):
        body = json.dumps({"names": names, "port": port}).encode()
        self.send_response(200); self._cors(); self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body))); self.end_headers(); self.wfile.write(body)
    def do_POST(self):
        n = self.path.rsplit("/", 1)[-1]
        ln = int(self.headers.get("Content-Length") or 0)
        args = json.loads(self.rfile.read(ln) or b"[]")
        try:
            res = {"ok": True, "v": getattr(api, n)(*args)}
        except Exception as e:
            traceback.print_exc()
            res = {"ok": False, "e": str(e)}
        body = json.dumps(res, default=str).encode()
        self.send_response(200); self._cors(); self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body))); self.end_headers(); self.wfile.write(body)
class S(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
print(json.dumps({"page_port": port, "api_port": api_port, "names": names}), flush=True)
S(("127.0.0.1", api_port), H).serve_forever()
