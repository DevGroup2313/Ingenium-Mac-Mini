"""A stand-in for a computer that lends its models as 6.81 does (build/desktop/app_lend_681.py), for rig/t_681_lend.js. Test only, not shipped.
Hello says its id, kind, addresses and that it pairs; POST /ingenium/pair, GET /v1/models and POST /v1/chat/completions (streamed) need the
code; a device named in X-Ingenium-Device that was removed is refused (401, removed) until it pairs again. Controls (no code, test only):
POST /ctl/remove {"id"}, POST /ctl/code {"code"}, POST /ctl/lend {"on"}. Every request is written to the log, one JSON line each.
    python3 -I rig/lend681_mock.py <port> <log.jsonl> <code> <id> <name> <kind> <addresses, comma separated>"""
import http.server
import json
import re
import socketserver
import sys
from urllib.parse import unquote

PORT, LOG, CODE, CID, NAME, KIND = int(sys.argv[1]), sys.argv[2], [sys.argv[3]], sys.argv[4], sys.argv[5], sys.argv[6]
ADDRS = [a for a in sys.argv[7].split(",") if a]
REMOVED, LEND = set(), [True]
MODELS = [{"name": "Magister 9B", "lineup": "qwen3.5-9b", "file": "magister-9b.gguf", "size": 5600000000, "context_length": 16384, "max_tokens": 4096, "advice": "ok"},
          {"name": "Scriba 4B", "lineup": "qwen3.5-4b", "file": "scriba-4b.gguf", "size": 2600000000, "context_length": 32768, "max_tokens": 4096, "advice": "quick"},
          {"name": "Velox 2B", "lineup": "qwen3.5-2b", "file": "velox-2b.gguf", "size": 1300000000, "context_length": 32768, "max_tokens": 4096, "advice": "quick"}]


def norm(c):
    return re.sub(r"[^A-Z0-9]", "", str(c or "").upper())


def device(v):
    d = {}
    for part in str(v or "").split(";"):
        if "=" in part:
            k, x = part.split("=", 1)
            d[k.strip()] = unquote(x.strip())
    return d if re.match(r"^[A-Za-z0-9_-]{6,40}$", d.get("id", "")) else None


def log(o):
    with open(LOG, "a", encoding="utf-8") as fh:
        fh.write(json.dumps(o) + "\n")


class H(http.server.BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.0"

    def log_message(self, *a):
        pass

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Ingenium-Device")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Private-Network", "true")

    def _json(self, code, obj):
        data = json.dumps(obj).encode("utf-8")
        self.send_response(code)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _body(self):
        try:
            n = int(self.headers.get("Content-Length") or 0)
            return json.loads(self.rfile.read(n).decode("utf-8") or "{}")
        except Exception:
            return {}

    def _auth(self, pairing=False):
        dev = device(self.headers.get("X-Ingenium-Device"))
        got = (self.headers.get("Authorization") or "").replace("Bearer ", "", 1)
        log({"port": PORT, "path": self.path, "method": self.command, "device": dev, "code_ok": norm(got) == norm(CODE[0])})
        if norm(got) != norm(CODE[0]):
            self._json(401, {"error": {"message": "The pairing code is not right. It is shown on the sharing computer, in Settings.", "code": 401}})
            return False
        if dev and dev["id"] in REMOVED and not pairing:
            self._json(401, {"error": {"message": "This device was removed on the lending computer. Type its code again to pair.", "code": 401, "removed": True}})
            return False
        return True

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_GET(self):
        path = self.path.split("?", 1)[0].rstrip("/")
        if path == "/ingenium/hello":
            log({"port": PORT, "path": path, "method": "GET", "device": device(self.headers.get("X-Ingenium-Device"))})
            return self._json(200, {"app": "Ingenium", "name": "Ingenium", "computer": NAME, "needs_code": True, "lends": LEND[0], "models": len(MODELS) if LEND[0] else 0,
                                    "callins": True, "api": 3, "cloud": 1, "id": CID, "kind": KIND, "pair": 1, "addresses": ADDRS})
        if not self._auth():
            return
        if path == "/v1/models":
            return self._json(200, {"object": "list", "data": [dict(m, object="model", owned_by=NAME) for m in MODELS]})
        if path == "/ingenium/info":
            return self._json(200, {"app": "Ingenium", "computer": NAME, "models": len(MODELS)})
        return self._json(404, {"error": {"message": "not found", "code": 404}})

    def do_POST(self):
        path = self.path.split("?", 1)[0].rstrip("/")
        if path.startswith("/ctl/"):
            b = self._body()
            if path == "/ctl/remove":
                REMOVED.add(str(b.get("id")))
            elif path == "/ctl/code":
                CODE[0] = str(b.get("code"))
            elif path == "/ctl/lend":
                LEND[0] = bool(b.get("on"))
            return self._json(200, {"ok": True})
        if not self._auth(pairing=(path == "/ingenium/pair")):
            return
        b = self._body()
        if path == "/ingenium/pair":
            dev = device(self.headers.get("X-Ingenium-Device"))
            if dev:
                REMOVED.discard(dev["id"])
            log({"port": PORT, "path": path, "paired": dev})
            return self._json(200, {"ok": True, "app": "Ingenium", "id": CID, "computer": NAME, "kind": KIND, "addresses": ADDRS, "lends": LEND[0],
                                    "models": [m["name"] for m in MODELS]})
        if path in ("/v1/chat/completions", "/chat/completions"):
            log({"port": PORT, "path": path, "model": b.get("model"), "device": device(self.headers.get("X-Ingenium-Device"))})
            self.send_response(200)
            self._cors()
            self.send_header("Content-Type", "text/event-stream")
            self.send_header("Cache-Control", "no-cache")
            self.end_headers()
            for piece in ["Hello ", "from the ", NAME.lower(), "."]:
                self.wfile.write(("data: " + json.dumps({"choices": [{"index": 0, "delta": {"content": piece}, "finish_reason": None}]}) + "\n\n").encode())
                self.wfile.flush()
            self.wfile.write(("data: " + json.dumps({"choices": [{"index": 0, "delta": {}, "finish_reason": "stop"}]}) + "\n\n").encode())
            self.wfile.write(b"data: [DONE]\n\n")
            self.wfile.flush()
            return
        return self._json(404, {"error": {"message": "not found", "code": 404}})


class S(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


S(("127.0.0.1", PORT), H).serve_forever()
