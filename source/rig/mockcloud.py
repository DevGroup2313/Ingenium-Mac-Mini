"""Stand-in for the services Ingenium connects to: Anthropic's Messages API, OpenAI-style
chat completions (OpenAI, Moonshot/Kimi, OpenRouter, Gemini's OpenAI endpoint, LM Studio),
and Ollama's /api/chat. It records every request (path, headers, body) and streams a reply
in each service's own format. Usage: python3 mockcloud.py <port> <log.json>"""
import sys, json, threading, http.server, socketserver, time

PORT = int(sys.argv[1]); LOG = sys.argv[2]
seen = []
lock = threading.Lock()
REPLY = "Hello from the stand-in."


def record(h, body):
    with lock:
        seen.append({"path": h.path, "method": h.command,
                     "headers": {k.lower(): v for k, v in h.headers.items()}, "body": body})
        open(LOG, "w").write(json.dumps(seen, indent=1))


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
            time.sleep(0.01)
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
        if self.path.endswith("/api/tags"):
            return self._send(200, "application/json", json.dumps({"models": [{"name": "llama3.2:3b"}, {"name": "qwen3:8b"}]}).encode())
        if self.path.endswith("/models"):
            # 6.9.1: the lists carry each model's window and longest reply, as the services' own lists do: Anthropic's shape
            # (max_input_tokens, max_tokens) when the request carries its key header, OpenRouter's (context_length,
            # top_provider.max_completion_tokens) otherwise
            if self.headers.get("x-api-key"):
                return self._send(200, "application/json", json.dumps({"data": [
                    {"type": "model", "id": "claude-opus-5-5", "display_name": "Stand-in Opus", "max_input_tokens": 1000000, "max_tokens": 128000},
                    {"type": "model", "id": "claude-haiku-4-5", "display_name": "Stand-in Haiku", "max_input_tokens": 200000, "max_tokens": 64000}],
                    "has_more": False}).encode())
            return self._send(200, "application/json", json.dumps({"data": [
                {"id": "stand-in-a", "context_length": 131072, "top_provider": {"max_completion_tokens": 32768}}, {"id": "stand-in-b"}]}).encode())
        return self._send(404, "application/json", b'{"error":{"message":"not found"}}')

    def do_POST(self):
        n = int(self.headers.get("Content-Length") or 0)
        raw = self.rfile.read(n) if n else b""
        try:
            body = json.loads(raw or b"null")
        except Exception:
            body = {"_raw": raw.decode("utf-8", "replace")}
        record(self, body)
        if self.path.endswith("/v1/messages"):
            # Anthropic: 400 for what current models refuse, else an SSE stream
            m = str(body.get("model", ""))
            th = body.get("thinking") or {}
            if th.get("type") == "enabled" and m.startswith(("claude-opus-5", "claude-fable", "claude-sonnet-5", "claude-haiku-5", "claude-opus-4-7", "claude-opus-4-8")):
                return self._send(400, "application/json", json.dumps({"type": "error", "error": {"type": "invalid_request_error", "message": "thinking.budget_tokens is not supported for this model"}}).encode())
            if any(k in body for k in ("temperature", "top_p", "top_k")) and m.startswith(("claude-opus-5", "claude-fable")):
                return self._send(400, "application/json", json.dumps({"type": "error", "error": {"type": "invalid_request_error", "message": "sampling parameters are not supported"}}).encode())
            msgs = body.get("messages") or []
            if not msgs or msgs[0].get("role") != "user" or msgs[-1].get("role") != "user":
                return self._send(400, "application/json", json.dumps({"type": "error", "error": {"type": "invalid_request_error", "message": "messages must start and end with a user turn"}}).encode())
            ev = []
            def e(t, d):
                d["type"] = t
                ev.append("event: %s\ndata: %s\n\n" % (t, json.dumps(d)))
            e("message_start", {"message": {"id": "msg_1", "model": m, "role": "assistant", "content": [], "usage": {"input_tokens": 10, "output_tokens": 0}}})
            if th:
                e("content_block_start", {"index": 0, "content_block": {"type": "thinking", "thinking": ""}})
                e("content_block_delta", {"index": 0, "delta": {"type": "thinking_delta", "thinking": "Considering a greeting."}})
                e("content_block_stop", {"index": 0})
            e("content_block_start", {"index": 1, "content_block": {"type": "text", "text": ""}})
            for w in REPLY.split(" "):
                e("content_block_delta", {"index": 1, "delta": {"type": "text_delta", "text": w + " "}})
            e("content_block_stop", {"index": 1})
            e("message_delta", {"delta": {"stop_reason": "end_turn"}, "usage": {"output_tokens": 7}})
            e("message_stop", {})
            return self._stream("text/event-stream", ev)
        if self.path.endswith("/chat/completions"):
            ch = []
            ch.append("data: %s\n\n" % json.dumps({"choices": [{"delta": {"reasoning_content": "Thinking briefly."}}]}))
            for w in REPLY.split(" "):
                ch.append("data: %s\n\n" % json.dumps({"choices": [{"delta": {"content": w + " "}}]}))
            if (body.get("stream_options") or {}).get("include_usage"):  # 6.9.1: the count, in a last chunk, as OpenAI sends it
                ch.append("data: %s\n\n" % json.dumps({"choices": [], "usage": {"prompt_tokens": 12, "completion_tokens": 7, "total_tokens": 19}}))
            ch.append("data: [DONE]\n\n")
            return self._stream("text/event-stream", ch)
        if self.path.endswith("/api/chat"):
            ch = [json.dumps({"message": {"role": "assistant", "thinking": "Hmm."}, "done": False}) + "\n"]
            for w in REPLY.split(" "):
                ch.append(json.dumps({"message": {"role": "assistant", "content": w + " "}, "done": False}) + "\n")
            ch.append(json.dumps({"done": True, "prompt_eval_count": 12, "eval_count": 7}) + "\n")  # 6.9.1: Ollama's own count
            return self._stream("application/x-ndjson", ch)
        return self._send(404, "application/json", b'{"error":{"message":"not found"}}')


class S(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


S(("127.0.0.1", PORT), H).serve_forever()
