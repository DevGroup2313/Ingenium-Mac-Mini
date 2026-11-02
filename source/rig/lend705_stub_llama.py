#!/usr/bin/env python3
"""A stand-in for llama-server, for the lending tests (rig/t_705_lend_gateway.py). Not shipped.

It keeps to what the lender uses of the real engine (llama.cpp b11321):
  --list-devices          prints the chips named in $STUB_DEVICES ("name|MiB|free MiB;name|MiB|free MiB") as the engine does
  -m -c --port --host     read; every start is recorded with its whole argument list in $STUB_LOG (one JSON line)
  GET /health             503 until $STUB_LOAD_S seconds (default 0.3) after the start, then 200
  POST /v1/chat/completions
       needs "Authorization: Bearer $LLAMA_API_KEY"; one request at a time (-np 1: the next waits inside); a prompt longer than
       -c is refused with the engine's own 400 body; a stream with "return_progress" sends its head at once and a
       prompt_progress chunk every $STUB_PROG_S seconds while it "reads" (for $STUB_FIRST_S seconds); without it, nothing is sent
       until the first word (as the real engine); then $STUB_TOKENS words, $STUB_GAP seconds apart, a last chunk with finish_reason
       and timings, and [DONE].
Behaviour can be changed between requests with the JSON file $STUB_CTL (keys first_s, tokens, gap, prog_s, die_at, finish, hold):
  die_at N   the engine process stops after N words (a crash in the middle of a reply)
  finish     "length" ends the reply with finish_reason length
STUB_CHIP_CRASH=1   the engine dies when a reply is asked of it, unless it was started with --device none (a graphics chip giving way)
STUB_CHIP_LOADFAIL=1  the engine dies at once, unless it was started with --device none
The log also gets {"ev": "req", ...} for each request, {"ev": "gone", "where": ...} when the device that asked has gone, {"ev": "done"}.
"""
import http.server
import json
import os
import socketserver
import sys
import threading
import time

ARGV = sys.argv[1:]
LOG = os.environ.get("STUB_LOG")
LOCK = threading.Lock()
SLOT = threading.Lock()
T0 = time.time()


def log(rec):
    if not LOG:
        return
    rec["pid"] = os.getpid()
    rec["t"] = round(time.time(), 3)
    with LOCK:
        with open(LOG, "a", encoding="utf-8") as fh:
            fh.write(json.dumps(rec) + "\n")


def arg(name, default=None):
    if name in ARGV:
        i = ARGV.index(name)
        if i + 1 < len(ARGV):
            return ARGV[i + 1]
    return default


def on_processor():
    return "--device" in ARGV and arg("--device") == "none"


if "--list-devices" in ARGV:
    print("ggml_vulkan: Found devices")
    print("Available devices:")
    for i, d in enumerate([x for x in os.environ.get("STUB_DEVICES", "").split(";") if x.strip()]):
        name, _, rest = d.partition("|")
        mib, _, free = rest.partition("|")
        print("  Vulkan%d: %s (%s MiB, %s MiB free)" % (i, name.strip(), mib or "0", free or mib or "0"))
    print("  BLAS: Accelerate (0 MiB, 0 MiB free)")
    sys.exit(0)

log({"ev": "start", "argv": ARGV})
if os.environ.get("STUB_CHIP_LOADFAIL") and not on_processor():
    log({"ev": "died", "why": "load"})
    os._exit(3)

PORT = int(arg("--port", "0"))
CTX = int(arg("-c", "8192"))
KEY = os.environ.get("LLAMA_API_KEY", "")


def ctl():
    c = {"first_s": float(os.environ.get("STUB_FIRST_S", "0")), "tokens": int(os.environ.get("STUB_TOKENS", "6")),
         "gap": float(os.environ.get("STUB_GAP", "0.05")), "prog_s": float(os.environ.get("STUB_PROG_S", "0.2"))}
    p = os.environ.get("STUB_CTL")
    if p and os.path.isfile(p):
        try:
            with open(p, encoding="utf-8") as fh:
                c.update(json.load(fh))
        except Exception:
            pass
    return c


class H(http.server.BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, *a):
        pass

    def _json(self, code, obj):
        data = json.dumps(obj).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path.split("?")[0] == "/health":
            ready = time.time() - T0 >= float(os.environ.get("STUB_LOAD_S", "0.3"))
            return self._json(200 if ready else 503, {"status": "ok"} if ready else {"error": {"code": 503, "message": "Loading model"}})
        self._json(404, {"error": {"code": 404, "message": "not found"}})

    def _chunk(self, data):
        self.wfile.write(("%x\r\n" % len(data)).encode("ascii") + data + b"\r\n")
        self.wfile.flush()

    def do_POST(self):
        n = int(self.headers.get("Content-Length") or 0)
        body = json.loads(self.rfile.read(n).decode("utf-8") or "{}")
        if (self.headers.get("Authorization") or "") != "Bearer " + KEY:
            return self._json(401, {"error": {"code": 401, "message": "Invalid API Key"}})
        msgs = body.get("messages") or []
        chars = sum(len(m.get("content")) if isinstance(m.get("content"), str) else len(json.dumps(m.get("content"))) for m in msgs)
        total = max(1, chars // 4)
        stream = bool(body.get("stream"))
        prog = bool(body.get("return_progress"))
        log({"ev": "req", "ctx": CTX, "stream": stream, "return_progress": prog, "prompt_tokens": total,
             "keys": sorted(body.keys()), "model": body.get("model")})
        if total > CTX:
            return self._json(400, {"error": {"code": 400, "type": "exceed_context_size_error", "n_prompt_tokens": total, "n_ctx": CTX,
                                              "message": "request (%d tokens) exceeds the available context size (%d tokens), try increasing it" % (total, CTX)}})
        with SLOT:
            c = ctl()
            if os.environ.get("STUB_CHIP_CRASH") and not on_processor():
                log({"ev": "died", "why": "chip"})
                os._exit(3)
            first, ntok, gap = float(c["first_s"]), int(c["tokens"]), float(c["gap"])
            if not stream:
                time.sleep(first)
                words = " ".join("w%d" % i for i in range(ntok))
                return self._json(200, {"choices": [{"index": 0, "finish_reason": "stop", "message": {"role": "assistant", "content": words}}],
                                        "timings": {"predicted_n": ntok, "predicted_per_second": (1.0 / gap) if gap else 0}})
            phase = "reading"
            try:
                if prog:
                    self._head()
                    t0 = time.time()
                    while time.time() - t0 < first:
                        frac = min(1.0, (time.time() - t0) / max(first, 0.001))
                        self._chunk(("data: " + json.dumps({"choices": [{"index": 0, "finish_reason": None, "delta": {"content": None}}],
                                                            "object": "chat.completion.chunk", "model": "stub",
                                                            "prompt_progress": {"total": total, "cache": 0, "processed": int(total * frac),
                                                                                "time_ms": int((time.time() - t0) * 1000)}}) + "\n\n").encode())
                        time.sleep(float(c["prog_s"]))
                else:
                    time.sleep(first)
                    self._head()
                phase = "answering"
                for i in range(ntok):
                    self._chunk(("data: " + json.dumps({"choices": [{"index": 0, "finish_reason": None, "delta": {"content": "w%d " % i}}],
                                                        "object": "chat.completion.chunk", "model": "stub"}) + "\n\n").encode())
                    if c.get("die_at") is not None and i + 1 >= int(c["die_at"]):
                        log({"ev": "died", "why": "die_at", "at": i + 1})
                        os._exit(3)
                    time.sleep(gap)
                self._chunk(("data: " + json.dumps({"choices": [{"index": 0, "finish_reason": c.get("finish") or "stop", "delta": {}}],
                                                    "object": "chat.completion.chunk", "model": "stub",
                                                    "timings": {"prompt_n": total, "predicted_n": ntok,
                                                                "predicted_per_second": (1.0 / gap) if gap else 100.0}}) + "\n\n").encode())
                self._chunk(b"data: [DONE]\n\n")
                self.wfile.write(b"0\r\n\r\n")
                self.wfile.flush()
                log({"ev": "done", "tokens": ntok})
            except (BrokenPipeError, ConnectionResetError, OSError):
                log({"ev": "gone", "where": phase})

    def _head(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/event-stream")
        self.send_header("Transfer-Encoding", "chunked")
        self.end_headers()
        self.wfile.flush()


class S(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


if __name__ == "__main__":
    S(("127.0.0.1", PORT), H).serve_forever()
