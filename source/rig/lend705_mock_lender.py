#!/usr/bin/env python3
"""A stand-in for an HP laptop that is lending its models, for the page tests (rig/t_705_lend_page.js). Not shipped.

It keeps the HTTP surface of the real lender (ingenium_app.py, _share_handler and _share_answer, as app_lend_693.py leaves them):
HTTP/1.0, the same CORS headers, /ingenium/hello without a code, /v1/models and /ingenium/info and /v1/chat/completions with the pairing
code as a Bearer token, the same error bodies ({"error": {"message", "code"}}), and a stream in the common chat format. A model entry
carries context_length, max_tokens, advice and tps as the new lender sends them. A control URL changes what the next request meets:
  POST /__ctl   {"mode": ..., "delay": seconds, "reply": "text", "models": [...], "info": {...}, "code": "XXXX-XXXX", "lend": true}
  mode  ok        a whole reply, finish_reason stop, [DONE]
        err400    HTTP 400 with the engine's "exceeds the available context size" body (n_ctx taken from the first model)
        err400b   200, then the same error inside the stream, then [DONE]
        err503 / err404   HTTP 503 / 404 with the lender's own words
        die       the lender goes away in the middle of the reply (a clean close, no [DONE])
        length    the reply ends with finish_reason length
        progress  if the request asked (ingenium_status): queued (2 ahead), queued (1 ahead), loading, reading 20, 60, 100 percent,
                  answering, then the words, half a second apart; a request that did not ask gets only ": waiting" lines
Every request is appended to the log file as one JSON line (the Authorization value is not kept).
Usage: lend705_mock_lender.py <port> <logfile> [code]
"""
import json
import socketserver
import sys
import threading
import time
import http.server

PORT = int(sys.argv[1])
LOG = sys.argv[2]
NORM = lambda c: "".join(ch for ch in str(c or "").upper() if ch.isalnum())
MODELS = [
    {"id": "m1", "name": "Qwen3.5 9B", "file": "Qwen3.5-9B-Q4_K_M.gguf", "size": 5680000000, "lineup": "qwen3.5-9b", "context_length": 16384, "max_tokens": 16128, "advice": "ok", "tps": 4.2, "tps_measured": False},
    {"id": "m2", "name": "Qwen3.5 4B", "file": "Qwen3.5-4B-Q4_K_M.gguf", "size": 2740000000, "lineup": "qwen3.5-4b", "context_length": 32768, "max_tokens": 32512, "advice": "quick", "tps": 8.8, "tps_measured": False},
    {"id": "m3", "name": "LFM2.5 8B A1B", "file": "LFM2.5-8B-A1B-Q4_K_M.gguf", "size": 5160000000, "lineup": "lfm2.5-8b-a1b", "context_length": 32768, "max_tokens": 32512, "advice": "quick", "tps": 27.5, "tps_measured": False},
    {"id": "m4", "name": "Gemma 4 26B A4B", "file": "gemma-4-26B-A4B-it-Q4_K_M.gguf", "size": 14400000000, "lineup": "gemma-4-26b-a4b", "context_length": 8192, "max_tokens": 7936, "advice": "too big", "tps": 3.0, "tps_measured": False}]
STATE = {"mode": "ok", "delay": 0.0, "reply": "Paris is the capital of France. " * 3, "lend": True, "code": sys.argv[3] if len(sys.argv) > 3 else "K7QM-4HXP",
         "models": MODELS, "info": {"app": "Ingenium", "computer": "HP-Laptop", "models": 4, "ram_gb": 16.0, "ram_free_gb": 11.2, "ctx": None, "ctx_default": 32768,
                                    "cpu_only": True, "gpu_used": False, "gpu_name": "", "busy": 0, "queued": 0, "version": 2}}
LOCK = threading.Lock()


def log(rec):
    with LOCK:
        with open(LOG, "a", encoding="utf-8") as fh:
            fh.write(json.dumps(rec) + "\n")


class H(http.server.BaseHTTPRequestHandler):
    server_version = "Ingenium"
    protocol_version = "HTTP/1.0"

    def log_message(self, *a):
        pass

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Authorization, Content-Type")
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

    def _err(self, code, msg):
        self._json(code, {"error": {"message": msg, "code": code}})

    def _allowed(self):
        got = (self.headers.get("Authorization") or "").replace("Bearer ", "", 1).strip()
        if NORM(got) != NORM(STATE["code"]):
            self._err(401, "The pairing code is not right. It is shown on the sharing computer, in Settings.")
            return False
        return True

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_GET(self):
        path = self.path.split("?", 1)[0].rstrip("/")
        log({"t": time.time(), "m": "GET", "path": path})
        if path == "/ingenium/hello":
            return self._json(200, {"app": "Ingenium", "name": "Ingenium", "computer": "HP-Laptop", "needs_code": True, "lends": STATE["lend"],
                                    "models": len(STATE["models"]), "callins": True, "api": 2})
        if not self._allowed():
            return
        if not STATE["lend"]:
            return self._err(403, "This computer is not lending its models. Switch sharing on there, in Settings, Your models on every device.")
        if path in ("/v1/models", "/models"):
            return self._json(200, {"object": "list", "data": [dict(m, object="model", owned_by="HP-Laptop") for m in STATE["models"]]})
        if path == "/ingenium/info":
            return self._json(200, STATE["info"])
        return self._err(404, "not found")

    def _sse(self, obj):
        self.wfile.write(("data: " + json.dumps(obj) + "\n\n").encode("utf-8"))
        self.wfile.flush()

    def do_POST(self):
        path = self.path.split("?", 1)[0].rstrip("/")
        n = int(self.headers.get("Content-Length") or 0)
        raw = self.rfile.read(n) if n else b""
        if path == "/__ctl":
            STATE.update(json.loads(raw.decode("utf-8") or "{}"))
            return self._json(200, {"ok": True})
        try:
            body = json.loads(raw.decode("utf-8") or "{}")
        except Exception:
            body = {"_unreadable": True}
        if not self._allowed():
            return
        if path not in ("/v1/chat/completions", "/chat/completions"):
            return self._err(404, "not found")
        if not STATE["lend"]:
            return self._err(403, "This computer is not lending its models. Switch sharing on there, in Settings, Your models on every device.")
        msgs = body.get("messages") or []
        chars = sum(len(m.get("content") if isinstance(m.get("content"), str) else json.dumps(m.get("content"))) for m in msgs)
        mode = STATE["mode"]
        log({"t": time.time(), "m": "POST", "path": path, "body": {k: v for k, v in body.items() if k != "messages"}, "n_messages": len(msgs),
             "prompt_chars": chars, "mode": mode})
        if STATE["delay"]:
            time.sleep(float(STATE["delay"]))
        n_ctx = int((STATE["models"][0] or {}).get("context_length") or 8192)
        err = {"code": 400, "type": "exceed_context_size_error", "n_prompt_tokens": chars // 3, "n_ctx": n_ctx,
               "message": "request (%d tokens) exceeds the available context size (%d tokens), try increasing it" % (chars // 3, n_ctx)}
        if mode == "err400":
            return self._json(400, {"error": err})
        if mode == "err503":
            return self._err(503, "The model could not be loaded on the sharing computer: the engine stopped (code 3221226505).")
        if mode == "err404":
            return self._err(404, "This computer has no model called %r. The model list shows the ones it has." % str(body.get("model")))
        self.send_response(200)
        self._cors()
        self.send_header("Content-Type", "text/event-stream")
        self.send_header("Cache-Control", "no-cache")
        self.end_headers()
        asked = bool(body.get("ingenium_status"))
        if mode == "err400b":
            self._sse({"error": err})
            self.wfile.write(b"data: [DONE]\n\n")
            self.wfile.flush()
            return
        if mode == "progress":
            if asked:
                for st in ({"state": "queued", "ahead": 2}, {"state": "queued", "ahead": 1}, {"state": "loading", "seconds": 7, "model": "Qwen3.5 4B"},
                           {"state": "reading", "percent": 20, "processed": 200, "total": 1000}, {"state": "reading", "percent": 60, "processed": 600, "total": 1000},
                           {"state": "reading", "percent": 100, "processed": 1000, "total": 1000}):
                    self._sse({"ingenium": st})
                    time.sleep(0.6)
                self._sse({"ingenium": {"state": "answering"}})
            else:
                for _ in range(3):
                    self.wfile.write(b": waiting\n\n")
                    self.wfile.flush()
                    time.sleep(0.6)
        words = STATE["reply"].split(" ")

        def chunk(delta, fin=None):
            self._sse({"id": "chatcmpl-1", "object": "chat.completion.chunk", "model": body.get("model"), "choices": [{"index": 0, "delta": delta, "finish_reason": fin}]})

        chunk({"role": "assistant", "content": None})
        for i, w in enumerate(words):
            chunk({"content": w + " "})
            time.sleep(0.03)
            if mode == "die" and i == 5:
                self.wfile.flush()
                self.connection.shutdown(2)
                return
        chunk({}, "length" if mode == "length" else "stop")
        self.wfile.write(b"data: [DONE]\n\n")
        self.wfile.flush()


class S(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


if __name__ == "__main__":
    open(LOG, "w").close()
    print("mock lender on", PORT, "code", STATE["code"], flush=True)
    S(("127.0.0.1", PORT), H).serve_forever()
