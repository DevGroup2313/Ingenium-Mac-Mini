#!/usr/bin/env python3
"""A stand-in for three model services, for testing Ingenium's working loop (r190) without a key or a network.

It answers, in each service's own published request form:
  /v1/messages       Anthropic's Messages API (Claude): SSE, thinking with signatures, tool_use streamed as JSON fragments
  /chat/completions  the OpenAI form (Kimi through Moonshot, OpenRouter, LM Studio): SSE, tool_calls streamed by index
  /api/chat          Ollama's own form: NDJSON, tool_calls with their arguments as objects

Every request is checked as the real service would check it (tool definitions; every tool call answered, by its id, in
the next message; Claude's thinking passed back unchanged; the history only appended to), and each departure is
recorded. The same scripted model answers on all three: it lists the files, searches, reads, makes two changes at once
(one of them wrong on purpose), runs the app, mends the error it was shown, runs the app again and sums up.
GET /report returns what was checked; POST /reset starts again.
  python3 mock_agent_server.py PORT
"""
import json, re, sys, threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

LOCK = threading.Lock()
STATE = {"problems": [], "requests": [], "issued": {}, "prev": {}}

SCRIPT = [
    ("Let me see the files first.", [("list_files", {})], None),
    ("", [("search", {"pattern": "greet"})], "{F}"),
    ("", [("read", {"file": "{F}", "start_line": 1, "end_line": 20})], "{F}:"),
    ("I will change the greeting.", [("edit", {"file": "{F}", "old_text": 'greet("world")', "new_text": 'greeet("Yannie")'}),
                                     ("edit", {"file": "{F}", "old_text": "this text is not in the file", "new_text": "x"})], "1\t"),
    ("", [("run_app", {})], ["Changed {F}", "not in {F}"]),
    ("The app shows an error: I misspelt the function. Mending it.", [("edit", {"file": "{F}", "old_text": 'greeet("Yannie")', "new_text": 'greet("Yannie")'})], "error"),
    ("", [("run_app", {})], "Changed {F}"),
    ("I changed the greeting in {F} to greet Yannie, and the app runs with no errors. Open the preview to see it.", [], "no errors"),
]
PLAN_SCRIPT = [
    ("", [("search", {"pattern": "greet"})], None),
    ("Plan:\n1. In app.js, change greet(\"world\") to greet(\"Yannie\").\nShall I go ahead?", [], "app.js"),
]


def problem(where, what):
    with LOCK:
        STATE["problems"].append(where + ": " + what)


def text_of(content):
    if isinstance(content, str):
        return content
    out = []
    for b in content or []:
        if isinstance(b, dict):
            if b.get("type") == "text":
                out.append(b.get("text", ""))
            elif b.get("type") == "tool_result":
                c = b.get("content")
                out.append(c if isinstance(c, str) else text_of(c))
    return "\n".join(out)


def is_real_user(m, fam):
    if m.get("role") != "user":
        return False
    if fam == "anthropic" and isinstance(m.get("content"), list):
        return not any(isinstance(b, dict) and b.get("type") == "tool_result" for b in m["content"])
    return True


def step_of(msgs, fam):
    """how many tool turns the model has taken since the person last wrote, and the results it was last given"""
    last = max(i for i, m in enumerate(msgs) if is_real_user(m, fam))
    after = msgs[last + 1:]
    n = sum(1 for m in after if m.get("role") == "assistant")
    if fam == "anthropic":
        res = text_of(after[-1]["content"]) if after else ""
    else:
        res = "\n".join(text_of(m.get("content")) for m in after if m.get("role") == "tool")
        tail = []
        for m in reversed(after):
            if m.get("role") != "tool":
                break
            tail.append(text_of(m.get("content")))
        res = "\n".join(reversed(tail))
    return n, res, after, msgs[last]


def system_of(body, fam):
    if fam == "anthropic":
        s = body.get("system")
        return s if isinstance(s, str) else text_of(s or [])
    return "\n".join(m.get("content") or "" for m in body.get("messages") or [] if m.get("role") == "system")


def subst(o, F):
    if isinstance(o, str):
        return o.replace("{F}", F)
    if isinstance(o, list):
        return [subst(x, F) for x in o]
    if isinstance(o, tuple):
        return tuple(subst(x, F) for x in o)
    if isinstance(o, dict):
        return {k: subst(v, F) for k, v in o.items()}
    return o


def pick(body, fam, tools):
    if not tools:
        return ("A plain reply without tools.", [])
    plan = "edit" not in tools
    script = PLAN_SCRIPT if plan else SCRIPT
    msgs = body.get("messages") or []
    n, res, after, user = step_of(msgs, fam)
    sysx = system_of(body, fam)
    names = re.findall(r'"([^"]+)"', (re.search(r"Files: ([^\n]*)", sysx) or [None, ""])[1] if re.search(r"Files: ([^\n]*)", sysx) else "")
    F = ([x for x in names if x.endswith(".js")] or names or ["app.js"])[0]
    with LOCK:
        if STATE["requests"]:
            STATE["requests"][-1].update({"res": res[:2000], "sys": sysx[-3000:], "step": n})
    if n >= len(script):
        problem(fam, "asked for a turn past the end of the script (%d)" % n)
        return ("Done.", [])
    say, calls, expect = subst(script[n], F)
    if expect:
        for e in (expect if isinstance(expect, list) else [expect]):
            if e not in res:
                problem(fam, "step %d: the last tool results do not contain %r: %r" % (n, e, res[:300]))
    return say, calls


def check_append_only(fam, model, msgs):
    key = fam + "|" + model
    with LOCK:
        prev = STATE["prev"].get(key)
        STATE["prev"][key] = json.loads(json.dumps(msgs))
    if prev and len(msgs) > len(prev):
        for i, m in enumerate(prev):
            if json.dumps(m, sort_keys=True) != json.dumps(msgs[i], sort_keys=True):
                # a fresh conversation starts over: only a continuation of the same turn must extend the last request
                if i <= 1:
                    return
                problem(fam, "the history was changed at message %d, not only appended to" % i)
                return


class H(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, *a):
        pass

    def cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

    def do_OPTIONS(self):
        self.send_response(204)
        self.cors()
        self.send_header("Content-Length", "0")
        self.end_headers()

    def plain(self, code, obj):
        b = json.dumps(obj).encode()
        self.send_response(code)
        self.cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(b)))
        self.end_headers()
        self.wfile.write(b)

    def do_GET(self):
        if self.path.startswith("/report"):
            with LOCK:
                self.plain(200, {"problems": STATE["problems"], "requests": STATE["requests"]})
            return
        if self.path.startswith("/v1/models") or self.path.startswith("/models"):
            self.plain(200, {"data": [{"id": "claude-opus-5-5"}, {"id": "kimi-k2"}]})
            return
        if self.path.startswith("/api/tags"):
            self.plain(200, {"models": [{"name": "qwen3:8b"}]})
            return
        self.plain(404, {"error": "no such path"})

    def do_POST(self):
        ln = int(self.headers.get("Content-Length") or 0)
        raw = self.rfile.read(ln) if ln else b""
        if self.path.startswith("/reset"):
            with LOCK:
                STATE.update({"problems": [], "requests": [], "issued": {}, "prev": {}})
            self.plain(200, {"ok": True})
            return
        try:
            body = json.loads(raw or b"{}")
        except Exception:
            self.plain(400, {"error": {"message": "the body is not JSON"}})
            return
        if self.path.startswith("/v1/messages"):
            return self.anthropic(body)
        if self.path.startswith("/chat/completions") or self.path.startswith("/v1/chat/completions"):
            return self.openai(body)
        if self.path.startswith("/api/chat"):
            return self.ollama(body)
        self.plain(404, {"error": "no such path"})

    def record(self, fam, body, tools):
        with LOCK:
            STATE["requests"].append({"fam": fam, "model": body.get("model"), "tools": tools, "n": len(body.get("messages") or []),
                                      "thinking": body.get("thinking"), "effort": (body.get("output_config") or {}).get("effort"),
                                      "max_tokens": body.get("max_tokens") or body.get("max_completion_tokens"),
                                      "eager": [t.get("eager_input_streaming") for t in (body.get("tools") or [])] if fam == "anthropic" else None})

    def stream_start(self, ctype):
        self.send_response(200)
        self.cors()
        self.send_header("Content-Type", ctype)
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Connection", "close")
        self.end_headers()
        self.close_connection = True

    def sse(self, ev, obj):
        self.wfile.write(("event: %s\ndata: %s\n\n" % (ev, json.dumps(obj))).encode())
        self.wfile.flush()

    # ---------------- Anthropic ----------------
    def anthropic(self, body):
        if not self.headers.get("x-api-key") or self.headers.get("anthropic-version") != "2023-06-01":
            self.plain(401, {"type": "error", "error": {"type": "authentication_error", "message": "missing x-api-key or anthropic-version"}})
            return
        tools = [t.get("name") for t in body.get("tools") or []]
        self.record("anthropic", body, tools)
        model = body.get("model", "")
        if model == "notools-model" and body.get("tools"):
            self.plain(400, {"type": "error", "error": {"type": "invalid_request_error", "message": "tools: this model does not support tools"}})
            return
        for t in body.get("tools") or []:
            if not isinstance(t.get("input_schema"), dict) or t.get("input_schema", {}).get("type") != "object":
                problem("anthropic", "tool %s has no object input_schema" % t.get("name"))
            if t.get("eager_input_streaming") is not True:
                problem("anthropic", "tool %s lacks eager_input_streaming" % t.get("name"))
        msgs = body.get("messages") or []
        if any(m.get("role") == "system" for m in msgs):
            problem("anthropic", "a system message inside messages")
        roles = [m.get("role") for m in msgs]
        for i in range(1, len(roles)):
            if roles[i] == roles[i - 1]:
                problem("anthropic", "two %s messages in a row at %d" % (roles[i], i))
        # every tool_use answered, by id, in the next message, all results in that one message; thinking unchanged
        for i, m in enumerate(msgs):
            if m.get("role") != "assistant" or not isinstance(m.get("content"), list):
                continue
            ids = [b.get("id") for b in m["content"] if b.get("type") == "tool_use"]
            for b in m["content"]:
                if b.get("type") == "thinking":
                    want = STATE["issued"].get(b.get("signature"))
                    if want is None or want != b.get("thinking"):
                        problem("anthropic", "a thinking block was not passed back unchanged (message %d)" % i)
                if b.get("type") == "text" and not b.get("text"):
                    problem("anthropic", "an empty text block (message %d)" % i)
            if ids:
                nxt = msgs[i + 1] if i + 1 < len(msgs) else None
                got = [b.get("tool_use_id") for b in (nxt or {}).get("content", []) if isinstance(b, dict) and b.get("type") == "tool_result"] if nxt else []
                if sorted(got) != sorted(ids):
                    problem("anthropic", "tool_use ids %s answered by %s" % (ids, got))
        check_append_only("anthropic", model, msgs)
        think = (body.get("thinking") or {}).get("type") == "adaptive"
        say, calls = pick(body, "anthropic", tools)
        self.stream_start("text/event-stream")
        k = len(STATE["requests"])
        self.sse("message_start", {"type": "message_start", "message": {"id": "msg_%d" % k, "type": "message", "role": "assistant", "model": model,
                                                                        "content": [], "stop_reason": None, "usage": {"input_tokens": 10, "output_tokens": 1}}})
        idx = 0
        if think:
            th = "Thinking about step %d of the request." % k
            sig = "sig-%d-%s" % (k, model)
            with LOCK:
                STATE["issued"][sig] = th
            self.sse("content_block_start", {"type": "content_block_start", "index": idx, "content_block": {"type": "thinking", "thinking": "", "signature": ""}})
            self.sse("content_block_delta", {"type": "content_block_delta", "index": idx, "delta": {"type": "thinking_delta", "thinking": th[:10]}})
            self.sse("content_block_delta", {"type": "content_block_delta", "index": idx, "delta": {"type": "thinking_delta", "thinking": th[10:]}})
            self.sse("content_block_delta", {"type": "content_block_delta", "index": idx, "delta": {"type": "signature_delta", "signature": sig}})
            self.sse("content_block_stop", {"type": "content_block_stop", "index": idx})
            idx += 1
        if say:
            self.sse("content_block_start", {"type": "content_block_start", "index": idx, "content_block": {"type": "text", "text": ""}})
            for i in range(0, len(say), 17):
                self.sse("content_block_delta", {"type": "content_block_delta", "index": idx, "delta": {"type": "text_delta", "text": say[i:i + 17]}})
            self.sse("content_block_stop", {"type": "content_block_stop", "index": idx})
            idx += 1
        for j, (name, inp) in enumerate(calls):
            tid = "toolu_%d_%d" % (k, j)
            self.sse("content_block_start", {"type": "content_block_start", "index": idx, "content_block": {"type": "tool_use", "id": tid, "name": name, "input": {}}})
            js = json.dumps(inp)
            for i in range(0, len(js), 7):
                self.sse("content_block_delta", {"type": "content_block_delta", "index": idx, "delta": {"type": "input_json_delta", "partial_json": js[i:i + 7]}})
            self.sse("content_block_stop", {"type": "content_block_stop", "index": idx})
            idx += 1
        self.sse("message_delta", {"type": "message_delta", "delta": {"stop_reason": "tool_use" if calls else "end_turn", "stop_sequence": None}, "usage": {"output_tokens": 20}})
        self.sse("message_stop", {"type": "message_stop"})

    # ---------------- OpenAI form ----------------
    def openai(self, body):
        tools = [((t.get("function") or {}).get("name")) for t in body.get("tools") or []]
        self.record("openai", body, tools)
        model = body.get("model", "")
        if model == "notools-model" and body.get("tools"):
            self.plain(400, {"error": {"message": "This model does not support tools", "type": "invalid_request_error"}})
            return
        for t in body.get("tools") or []:
            if t.get("type") != "function" or not isinstance((t.get("function") or {}).get("parameters"), dict):
                problem("openai", "a tool is not in the function form")
        msgs = body.get("messages") or []
        for i, m in enumerate(msgs):
            if m.get("role") == "assistant" and m.get("tool_calls"):
                ids = [c.get("id") for c in m["tool_calls"]]
                for c in m["tool_calls"]:
                    try:
                        json.loads((c.get("function") or {}).get("arguments") or "")
                    except Exception:
                        problem("openai", "tool call arguments passed back are not JSON text")
                got = []
                for x in msgs[i + 1:]:
                    if x.get("role") != "tool":
                        break
                    got.append(x.get("tool_call_id"))
                if sorted(got) != sorted(ids):
                    problem("openai", "tool_calls %s answered by %s" % (ids, got))
                if model.startswith("kimi") and "reasoning_content" not in m:
                    problem("openai", "Kimi's reasoning_content was not passed back")
        check_append_only("openai", model, msgs)
        say, calls = pick(body, "openai", tools)
        self.stream_start("text/event-stream")
        k = len(STATE["requests"])

        def chunk(delta, fin=None):
            self.wfile.write(("data: %s\n\n" % json.dumps({"id": "c%d" % k, "object": "chat.completion.chunk", "model": model,
                                                           "choices": [{"index": 0, "delta": delta, "finish_reason": fin}]})).encode())
            self.wfile.flush()
        chunk({"role": "assistant", "content": ""})
        if model.startswith("kimi"):
            chunk({"reasoning_content": "Considering step %d." % k})
        for i in range(0, len(say), 13):
            chunk({"content": say[i:i + 13]})
        for j, (name, inp) in enumerate(calls):
            js = json.dumps(inp)
            chunk({"tool_calls": [{"index": j, "id": "call_%d_%d" % (k, j), "type": "function", "function": {"name": name, "arguments": ""}}]})
            for i in range(0, len(js), 6):
                chunk({"tool_calls": [{"index": j, "function": {"arguments": js[i:i + 6]}}]})
        chunk({}, "tool_calls" if calls else "stop")
        self.wfile.write(b"data: [DONE]\n\n")
        self.wfile.flush()

    # ---------------- Ollama ----------------
    def ollama(self, body):
        tools = [((t.get("function") or {}).get("name")) for t in body.get("tools") or []]
        self.record("ollama", body, tools)
        model = body.get("model", "")
        if model == "notools-model" and body.get("tools"):
            self.plain(400, {"error": "registry.ollama.ai/library/notools-model does not support tools"})
            return
        msgs = body.get("messages") or []
        for i, m in enumerate(msgs):
            if m.get("role") == "assistant" and m.get("tool_calls"):
                for c in m["tool_calls"]:
                    if not isinstance((c.get("function") or {}).get("arguments"), dict):
                        problem("ollama", "tool call arguments passed back are not an object")
                got = []
                for x in msgs[i + 1:]:
                    if x.get("role") != "tool":
                        break
                    got.append(x.get("tool_name"))
                want = [(c.get("function") or {}).get("name") for c in m["tool_calls"]]
                if got != want:
                    problem("ollama", "tool calls %s answered by %s" % (want, got))
        check_append_only("ollama", model, msgs)
        say, calls = pick(body, "ollama", tools)
        self.stream_start("application/x-ndjson")

        def line(obj):
            self.wfile.write((json.dumps(obj) + "\n").encode())
            self.wfile.flush()
        for i in range(0, len(say), 11):
            line({"model": model, "message": {"role": "assistant", "content": say[i:i + 11]}, "done": False})
        if calls:
            line({"model": model, "message": {"role": "assistant", "content": "",
                                              "tool_calls": [{"function": {"name": n, "arguments": a}} for n, a in calls]}, "done": False})
        line({"model": model, "message": {"role": "assistant", "content": ""}, "done": True, "done_reason": "stop"})


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8191
    ThreadingHTTPServer(("127.0.0.1", port), H).serve_forever()
