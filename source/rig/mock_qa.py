"""Stand-in for a connected model that drafts question-and-answer pairs (Ingenium 6.9.x, modules/r200.js: Datasets from your
own work). It answers OpenAI-style chat completions (what the page's own ask path sends to an LM Studio or OpenAI-compatible
connection) with three Q and A pairs drawn from the passage in the prompt, streamed as the service streams them, and records
every request. Usage: python3 mock_qa.py <port> <log.json>"""
import sys, json, re, threading, http.server, socketserver, time

PORT = int(sys.argv[1]); LOG = sys.argv[2]
seen = []
lock = threading.Lock()


def record(h, body):
    with lock:
        seen.append({"path": h.path, "method": h.command, "body": body})
        open(LOG, "w").write(json.dumps(seen, indent=1))


def pairs(prompt):
    """Three pairs from the passage: the first sentences become the answers, so the test can check they came from the text."""
    m = re.search(r"PASSAGE:\n([\s\S]*?)\n\nWrite", prompt)
    text = (m.group(1) if m else prompt).strip()
    sents = [s.strip() for s in re.split(r"(?<=[.!?])\s+", text) if len(s.strip()) > 12][:3] or [text[:120]]
    out = []
    for i, s in enumerate(sents):
        words = re.findall(r"[A-Za-z][A-Za-z'-]+", s)
        topic = " ".join(words[:3]) if words else "this passage"
        out.append("Q: What does the passage say about %s?\nA: %s" % (topic, s))
    return "\n\n".join(out) + "\n"


class H(http.server.BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, *a):
        pass

    def _send(self, code, ctype, data):
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(data)

    def _stream(self, ctype, chunks):
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Transfer-Encoding", "chunked")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        for c in chunks:
            b = c.encode()
            self.wfile.write(("%x\r\n" % len(b)).encode() + b + b"\r\n")
            self.wfile.flush()
            time.sleep(0.005)
        self.wfile.write(b"0\r\n\r\n")

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_GET(self):
        record(self, None)
        if self.path.endswith("/models"):
            return self._send(200, "application/json", json.dumps({"data": [{"id": "stand-in-qa", "context_length": 32768}]}).encode())
        return self._send(404, "application/json", b'{"error":{"message":"not found"}}')

    def do_POST(self):
        n = int(self.headers.get("Content-Length") or 0)
        raw = self.rfile.read(n) if n else b""
        try:
            body = json.loads(raw or b"null")
        except Exception:
            body = {"_raw": raw.decode("utf-8", "replace")}
        record(self, body)
        if self.path.endswith("/chat/completions"):
            msgs = (body or {}).get("messages") or []
            prompt = "\n".join(str(m.get("content", "")) for m in msgs if m.get("role") == "user")
            reply = pairs(prompt)
            ch = []
            for w in re.split(r"(\s+)", reply):
                if w:
                    ch.append("data: %s\n\n" % json.dumps({"choices": [{"delta": {"content": w}}]}))
            ch.append("data: [DONE]\n\n")
            return self._stream("text/event-stream", ch)
        return self._send(404, "application/json", b'{"error":{"message":"not found"}}')


class S(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


S(("127.0.0.1", PORT), H).serve_forever()
