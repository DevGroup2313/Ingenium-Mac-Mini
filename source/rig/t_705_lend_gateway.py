"""Ingenium 6.9.3 · the lender, tested (build/desktop/app_lend_693.py), with a stand-in engine (rig/lend705_stub_llama.py).

The owner's words (31 October 2026): "I have two 16 GB RAM HP laptops, I want to be able to use it as a server of sorts for my
macbook pro and run its stronger models on the macbook pro or my fire tablet. The graphics of one of the HP laptop is not the
greatest so I would really love to be able to still use its stronger RAM and storage but on my macbook pro instead."

The patched ingenium_app.py is imported as it is (HOME in a temporary folder), its gateway is started on loopback, and its engine is
the stand-in, started the way the app starts llama-server (the real _engine_start, _engine_launch and _engine_status). Checks:
  the patch (applies once, a second run changes nothing, compiles), the window each model is given and told (_share_fit_ctx,
  context_length, max_tokens, /ingenium/info, the setting, ingenium_ctx), the queue (one device at a time, nothing killed in the middle
  of a reply, a waiting device that goes is dropped, four waiting at most), the stream (head at once, ": waiting", status lines,
  progress, an error in the stream, [DONE]), the engine that stops (started again, on the processor if the chip was the reason),
  the lock that browser visits no longer count toward, the graphics choice (--device none -ngl 0 -b 512, the 12 chips), the advice,
  the speed kept, and the call-in route (a slow first piece no longer gives 504; a true 504 says so).
    python3 -I rig/t_705_lend_gateway.py <patched ingenium_app.py> [<unpatched ingenium_app.py>]      (ports 8185 and up)
"""
import atexit
import http.client
import importlib.util
import signal
import json
import os
import shutil
import socket
import subprocess
import sys
import tempfile
import threading
import time

HERE = os.path.dirname(os.path.abspath(__file__))
STUB = os.path.join(HERE, "lend705_stub_llama.py")
PATCH = os.path.normpath(os.path.join(HERE, "..", "build", "desktop", "app_lend_693.py"))
ROLE = "A"
if len(sys.argv) > 2 and sys.argv[1] == "--lender":
    ROLE = "B"
APP = os.path.abspath(sys.argv[2] if ROLE == "B" else sys.argv[1])
PRISTINE = os.path.abspath(sys.argv[2]) if ROLE == "A" and len(sys.argv) > 2 else None
WORK = tempfile.mkdtemp(prefix="lend705_") if ROLE == "A" else sys.argv[3]
PORT0 = 8185 if ROLE == "A" else 8195
for k in ("XDG_DATA_HOME", "LOCALAPPDATA"):
    os.environ.pop(k, None)
HOME = os.path.join(WORK, "home")
os.makedirs(HOME, exist_ok=True)
os.environ["HOME"] = HOME
os.environ["STUB_LOG"] = os.path.join(WORK, "stub.jsonl")
os.environ["STUB_CTL"] = os.path.join(WORK, "stub_ctl.json")
os.environ["INGENIUM_LEND_TICK"] = "0.3"
os.environ["STUB_LOAD_S"] = "0.3"
os.environ["STUB_DEVICES"] = "Intel(R) UHD Graphics 620|8036|7000"
spec = importlib.util.spec_from_file_location("ingenium_app", APP)
mod = importlib.util.module_from_spec(spec)
sys.modules["ingenium_app"] = mod
spec.loader.exec_module(mod)

pass_n = fail_n = 0


def ok(cond, msg, detail=None):
    global pass_n, fail_n
    print(("PASS " if cond else "FAIL ") + msg + ("" if detail is None else "  " + str(detail)[:300]), flush=True)
    if cond:
        pass_n += 1
    else:
        fail_n += 1
    return cond


# ---- the stand-in engine, installed where the app looks for llama-server ----
ENG = os.path.join(WORK, "engine")
os.makedirs(ENG, exist_ok=True)
shutil.copy(STUB, os.path.join(ENG, "llama-server"))
os.chmod(os.path.join(ENG, "llama-server"), 0o755)
mod._ENGINE_DIR_FOUND[:] = [ENG]

# ---- the models: file sizes as in the lineup, as sparse files ----
MODELS = [("m-12b", "lfm2.5-1.2b-instruct", "LFM2.5-1.2B-Instruct-Q4_K_M.gguf", 730895168),
          ("m-26b", "lfm2.5-2.6b", "LFM2.5-2.6B-Q4_K_M.gguf", 1670000000),
          ("m-4b", "qwen3.5-4b", "Qwen3.5-4B-Q4_K_M.gguf", 2740000000),
          ("m-8b", "lfm2.5-8b-a1b", "LFM2.5-8B-A1B-Q4_K_M.gguf", 5160000000),
          ("m-9b", "qwen3.5-9b", "Qwen3.5-9B-Q4_K_M.gguf", 5680000000),
          ("m-mel", "mellum2.1-12b-thinking", "Mellum2.1-12B-Q4_K_M.gguf", 8070000000),
          ("m-g12", "gemma-4-12b", "gemma-4-12B-it-Q4_K_M.gguf", 6980000000),
          ("m-g26", "gemma-4-26b-a4b", "gemma-4-26B-A4B-it-Q4_K_M.gguf", 14400000000)]
MD = os.path.join(WORK, "gguf")
os.makedirs(MD, exist_ok=True)
for mid, lk, fn, size in MODELS:
    pth = os.path.join(MD, fn)
    with open(pth, "wb") as fh:
        fh.truncate(size)
    mod._MODEL_META[mid] = {"lineup": lk}
    mod._register_model_file(mid, pth)
mod._SHARE_PORT = PORT0
RAM = {"v": (16.0, 12.0)}
ORIG_RAM = mod._lend_ram
mod._lend_ram = lambda: RAM["v"]
BYID = {m[0]: {"id": m[0], "name": m[2][:-5], "file": m[2], "lineup": m[1], "size": m[3]} for m in MODELS}


def stub_log():
    try:
        return [json.loads(x) for x in open(os.environ["STUB_LOG"], encoding="utf-8") if x.strip()]
    except Exception:
        return []


def stub_starts():
    return [r for r in stub_log() if r.get("ev") == "start" and "--list-devices" not in r.get("argv", [])]


def clear_stub(ctl=None):
    open(os.environ["STUB_LOG"], "w").close()
    with open(os.environ["STUB_CTL"], "w") as fh:
        json.dump(ctl or {}, fh)


def argv_of(rec):
    return rec["argv"]


def argval(argv, name):
    return argv[argv.index(name) + 1] if name in argv else None


def reset_engine(devices=None):
    mod._engine_stop()
    mod._LEND_GPU_OFF.update(off=False, why="")
    mod._LEND_GPU_IDS[0] = ""
    os.environ.pop("STUB_CHIP_CRASH", None)
    os.environ.pop("STUB_CHIP_LOADFAIL", None)
    if devices is not None:
        os.environ["STUB_DEVICES"] = devices
        mod._ENGINE_DEVICES.update(list=None, busy=False)
    clear_stub()


def set_cfg(**kw):
    c = mod._share_cfg()
    for k, v in kw.items():
        if v is None:
            c.pop(k, None)
        else:
            c[k] = v
    mod._share_cfg_save(c)


def conn_to(timeout=30):
    return http.client.HTTPConnection("127.0.0.1", PORT, timeout=timeout)


def call(method, path, body=None, code=None, timeout=30):
    c = conn_to(timeout)
    h = {}
    if code is not False:
        h["Authorization"] = "Bearer " + (code or CODE)
    data = None
    if body is not None:
        data = json.dumps(body).encode()
        h["Content-Type"] = "application/json"
    c.request(method, path, body=data, headers=h)
    r = c.getresponse()
    txt = r.read().decode("utf-8", "replace")
    c.close()
    return r.status, txt


def jget(path):
    st, tx = call("GET", path)
    return st, (json.loads(tx) if tx else None)


class Req(object):
    """A streaming request on its own thread: every piece with the time it arrived, and the events read out of it."""

    def __init__(self, body, code=None, delay=0.0):
        self.body, self.code, self.pieces, self.t0, self.status, self.err = body, code, [], None, None, None
        self.head_t = None
        self.done_t = None
        self.th = threading.Thread(target=self._run, args=(delay,), daemon=True)
        self.th.start()

    def _run(self, delay):
        time.sleep(delay)
        self.t0 = time.time()
        try:
            c = conn_to(120)
            data = json.dumps(self.body).encode()
            c.request("POST", "/v1/chat/completions", body=data, headers={"Authorization": "Bearer " + (self.code or CODE), "Content-Type": "application/json"})
            r = c.getresponse()
            self.status = r.status
            self.head_t = time.time() - self.t0
            while True:
                p = r.read1(65536)
                if not p:
                    break
                self.pieces.append((time.time() - self.t0, p))
            c.close()
        except Exception as e:
            self.err = e
        self.done_t = time.time() - (self.t0 or time.time())

    def wait(self, t=60):
        self.th.join(t)
        return self

    def text(self):
        return b"".join(p for _t, p in self.pieces).decode("utf-8", "replace")

    def events(self):
        out = []
        for blk in self.text().split("\n\n"):
            blk = blk.strip()
            if not blk:
                continue
            out.append(blk)
        return out

    def jsons(self):
        r = []
        for e in self.events():
            if e.startswith("data:") and e[5:].strip().startswith("{"):
                try:
                    r.append(json.loads(e[5:].strip()))
                except Exception:
                    pass
        return r

    def words(self):
        return "".join(((j.get("choices") or [{}])[0].get("delta") or {}).get("content") or "" for j in self.jsons() if "choices" in j)

    def statuses(self):
        return [j["ingenium"] for j in self.jsons() if "ingenium" in j]

    def comments(self):
        return [e for e in self.events() if e.startswith(":")]

    def done(self):
        return any(e.strip() == "data: [DONE]" for e in self.events())

    def errors(self):
        return [j["error"] for j in self.jsons() if "error" in j]


def chat(model, text="hi", **kw):
    b = {"model": model, "messages": [{"role": "user", "content": text}], "stream": True}
    b.update(kw)
    return b


def wait_for(fn, t=10, step=0.05):
    t0 = time.time()
    while time.time() - t0 < t:
        v = fn()
        if v:
            return v
        time.sleep(step)
    return fn()


# =====================================================================================================================
# ROLE B: a lender that calls in (started by role A for the call-in checks)
# =====================================================================================================================
atexit.register(lambda: mod._engine_stop())
if ROLE == "B":
    signal.signal(signal.SIGTERM, lambda *a: (mod._engine_stop(), os._exit(0)))
    os.environ["STUB_FIRST_S"] = os.environ.get("B_FIRST_S", "4")
    mod._SHARE_PORT = PORT0
    mod._share_set(True)
    CODE_A, ADDR_A = sys.argv[4], sys.argv[5]
    r = mod._callout_add(ADDR_A, CODE_A)
    print("B callout_add ok:", r.get("ok"), r.get("error"), flush=True)
    time.sleep(600)
    sys.exit(0)

# =====================================================================================================================
# ROLE A
# =====================================================================================================================
print("== the patch")
src = open(APP, encoding="utf-8").read()
ok("_share_fit_ctx" in src and "_LendStream" in src, "the app file carries the lend patch")
if PRISTINE:
    t = os.path.join(WORK, "pristine_copy.py")
    shutil.copy(PRISTINE, t)
    r1 = subprocess.run([sys.executable, "-I", PATCH, t], capture_output=True, text=True)
    h1 = open(t, "rb").read()
    r2 = subprocess.run([sys.executable, "-I", PATCH, t], capture_output=True, text=True)
    h2 = open(t, "rb").read()
    ok(r1.returncode == 0 and "added" in r1.stdout and h1 != open(PRISTINE, "rb").read(), "the patch applies to an unpatched copy", r1.stdout.strip() or r1.stderr[-200:])
    ok(r2.returncode == 0 and "already" in r2.stdout and h1 == h2, "a second run changes nothing", r2.stdout.strip())
    ok(subprocess.run([sys.executable, "-m", "py_compile", t], capture_output=True).returncode == 0, "the patched copy compiles")
    ok(h1 == open(APP, "rb").read(), "the patched copy is the file under test (the patch is deterministic)")

mod._share_set(True)
PORT = mod._SHARE["port"]
CODE = mod._share_code()
ok(PORT == PORT0, "the gateway is on the port asked for", PORT)

print("\n== the window each model is given (C1)")
fit = lambda mid, ram: mod._share_fit_ctx(BYID[mid], ram)
ok([fit(m, 16.0) for m in ("m-4b", "m-9b", "m-mel")] == [32768, 16384, 8192], "16 GB: 4B 32,768, 9B 16,384, Mellum 12B 8,192", [fit(m, 16.0) for m in ("m-4b", "m-9b", "m-mel")])
ok([fit(m, 16.0) for m in ("m-12b", "m-26b", "m-8b")] == [32768, 32768, 32768], "16 GB: 1.2B, 2.6B and 8B-A1B all 32,768", [fit(m, 16.0) for m in ("m-12b", "m-26b", "m-8b")])
ok(fit("m-4b", 8.0) == 16384 and fit("m-9b", 8.0) == 8192, "8 GB: 4B gets 16,384; 9B 8,192 (and is too big)", (fit("m-4b", 8.0), fit("m-9b", 8.0)))
ok(mod._share_advice(BYID["m-9b"], 8.0, True) == "too big" and mod._share_advice(BYID["m-g26"], 16.0, True) == "too big", "the 9B is too big on 8 GB and the 26B on 16 GB")
ok(fit("m-4b", None) == 8192, "memory not known: 8,192")
st, ms = jget("/v1/models")
by = {m["id"]: m for m in ms["data"]}
ok(st == 200 and all(k in by["m-9b"] for k in ("context_length", "max_tokens", "advice", "tps", "tps_measured", "loaded")), "/v1/models carries context_length, max_tokens, advice, tps", sorted(by["m-9b"].keys()))
ok(by["m-9b"]["context_length"] == 16384 and by["m-9b"]["max_tokens"] == 16384 - 256 and by["m-4b"]["context_length"] == 32768, "the 9B is offered 16,384 (reply 16,128), the 4B 32,768",
   (by["m-9b"]["context_length"], by["m-9b"]["max_tokens"]))
ok(by["m-9b"]["lineup"] == "qwen3.5-9b" and by["m-9b"]["file"].endswith(".gguf") and by["m-9b"]["size"] == 5680000000, "the old fields are all still there")
st, info = jget("/ingenium/info")
ok(st == 200 and info["ram_gb"] == 16.0 and info["ram_free_gb"] == 12.0 and info["ctx"] is None and info["ctx_default"] == 32768 and info["version"] == 2, "/ingenium/info: ram_gb, ram_free_gb, ctx null, ctx_default, version 2",
   {k: info.get(k) for k in ("ram_gb", "ram_free_gb", "ctx", "ctx_default", "version")})
ok(info["cpu_only"] is True and info["gpu_used"] is False and info["busy"] == 0 and info["queued"] == 0 and "app" in info and "engine" in info, "/ingenium/info: cpu_only (a small chip), gpu_used false, nobody busy; the old fields stay",
   {k: info.get(k) for k in ("cpu_only", "gpu_used", "busy", "queued", "gpu_why")})
hello = json.loads(call("GET", "/ingenium/hello", code=False)[1])
ok(hello.get("api") == 2 and hello.get("app") == "Ingenium" and hello.get("callins") is True, "/ingenium/hello says api 2 and keeps its old fields")

clear_stub({"tokens": 3, "gap": 0.02})
r = Req(chat("m-4b")).wait()
ok(r.status == 200 and r.done() and r.words().strip() == "w0 w1 w2", "a first request loads the 4B and is answered whole", r.words())
s0 = stub_starts()
ok(len(s0) == 1 and argval(argv_of(s0[0]), "-c") == "32768", "the engine was started with the fitted window, 32,768 (not 8,192)", argval(argv_of(s0[0]), "-c"))
st, ms = jget("/v1/models")
by = {m["id"]: m for m in ms["data"]}
ok(by["m-4b"]["loaded"] is True and by["m-4b"]["context_length"] == 32768, "a loaded model reports its own window", (by["m-4b"]["loaded"], by["m-4b"]["context_length"]))
st, info = jget("/ingenium/info")
ok(info["ctx"] == 32768 and info["loaded"] == "m-4b", "/ingenium/info: ctx is the running engine's window and loaded names the model", (info["ctx"], info["loaded"]))

reset_engine()
clear_stub({"tokens": 2, "gap": 0.02})
Req(chat("m-9b", ingenium_ctx=65536)).wait()
ok(argval(argv_of(stub_starts()[-1]), "-c") == "16384", "ingenium_ctx 65,536 from a device is cut down to the 9B's fit, 16,384", argval(argv_of(stub_starts()[-1]), "-c"))
reset_engine()
clear_stub({"tokens": 2, "gap": 0.02})
Req(chat("m-4b", ingenium_ctx=4096)).wait()
ok(argval(argv_of(stub_starts()[-1]), "-c") == "4096", "a device may ask for less (4,096)")

reset_engine()
bad = mod._share_option_set("ctx", 12345)
ok(bad.get("ok") is False, "a memory size that is not a choice is refused", bad.get("error"))
mod._share_option_set("ctx", 8192)
clear_stub({"tokens": 2, "gap": 0.02})
Req(chat("m-4b")).wait()
ok(argval(argv_of(stub_starts()[-1]), "-c") == "8192", "the setting 'Memory for lent models: 8,192' overrides the fit")
st, ms = jget("/v1/models")
ok({m["id"]: m for m in ms["data"]}["m-9b"]["context_length"] == 8192, "and the lists say so for the models not loaded")
mod._share_option_set("ctx", 65536)
reset_engine()
clear_stub({"tokens": 2, "gap": 0.02})
Req(chat("m-4b", ingenium_ctx=131072)).wait()
ok(argval(argv_of(stub_starts()[-1]), "-c") == "65536", "the setting 65,536 is honoured, and a device is cut down to it", argval(argv_of(stub_starts()[-1]), "-c"))
mod._share_option_set("ctx", "auto")
ok(mod._lend_opts()[0] == "auto", "Automatic puts the fit back")

# an idle engine that holds less than the lender wants is started again
reset_engine()
clear_stub({"tokens": 2, "gap": 0.02})
mod._engine_start("m-4b", 8192)
mod._share_wait_ready("m-4b", timeout=20)
n0 = len(stub_starts())
Req(chat("m-4b")).wait()
ss = stub_starts()
ok(len(ss) == n0 + 1 and argval(argv_of(ss[-1]), "-c") == "32768", "an idle engine holding 8,192 is started again with 32,768 for a device", [argval(argv_of(x), "-c") for x in ss])
n1 = len(stub_starts())
Req(chat("m-4b")).wait()
ok(len(stub_starts()) == n1, "and one that holds enough is left alone")

print("\n== a message longer than the window (C1, C2)")
big = "word " * 20000        # about 25,000 tokens by the stand-in's count
reset_engine()
clear_stub({"tokens": 2, "gap": 0.02})
r = Req(chat("m-9b", big)).wait()
er = r.errors()
ok(r.status == 200 and len(er) == 1 and er[0].get("code") == 400 and "exceeds the available context size (16384 tokens)" in er[0].get("message", ""), "streamed: the 400 comes inside the stream, with its code and the engine's words", er)
ok(er and er[0].get("n_ctx") == 16384 and er[0].get("n_prompt_tokens") and r.done(), "it keeps n_ctx and n_prompt_tokens and ends with [DONE]")
st, tx = call("POST", "/v1/chat/completions", chat("m-9b", big, stream=False))
ok(st == 400 and json.loads(tx)["error"]["code"] == 400, "not streamed: a plain HTTP 400 with the engine's body", (st, tx[:100]))

print("\n== one device at a time, nothing cut off (C4)")
os.environ["STUB_FIRST_S"] = "0"
reset_engine()
clear_stub({"tokens": 6, "gap": 0.25, "first_s": 1.0, "prog_s": 0.2})
A = Req(chat("m-4b", "first", ingenium_status=True))
time.sleep(0.8)
B = Req(chat("m-4b", "second", ingenium_status=True))
A.wait()
B.wait()
ok(A.status == 200 and B.status == 200 and A.done() and B.done(), "two requests for one model: both finished whole")
ok(B.head_t is not None and B.head_t < 1.0, "the second one's head arrived within a second although it had to wait", round(B.head_t or 99, 2))
bw = [t for t, p in B.pieces if p.startswith(b": waiting")]
ok(len(bw) >= 2 and B.t0 + bw[0] < A.t0 + (A.done_t or 99), "a ': waiting' line came while it waited (the tick was shortened to 0.3 s)", [round(x, 1) for x in bw[:4]])
firstword = next((t for t, p in B.pieces if b'"content"' in p and b"w0" in p), None)
ok(firstword is not None and B.t0 + firstword > A.t0 + (A.done_t or 0) - 0.05, "its first word came after the first device's last", (round(B.t0 + (firstword or 0) - A.t0, 2), round(A.done_t or 0, 2)))
sts = B.statuses()
kinds = [x["state"] for x in sts]
ok(kinds and kinds[0] == "queued" and sts[0].get("ahead") == 1, "its status lines begin with 'queued, 1 ahead'", sts[:3])
order = [k for i, k in enumerate(kinds) if i == 0 or k != kinds[i - 1]]
ok(order[:1] == ["queued"] and order[-1] == "answering" and "loading" in order and "reading" in order and order.index("loading") < order.index("reading") < order.index("answering"), "then loading, reading, answering, in that order", order)
rd = [x for x in sts if x["state"] == "reading" and "percent" in x]
ok(rd and rd[-1]["percent"] >= rd[0]["percent"] and all(0 <= x["percent"] <= 100 for x in rd), "'reading' lines carry a percent that does not go down", [x["percent"] for x in rd][:8])
ok(b"prompt_progress" not in b"".join(p for _t, p in B.pieces), "the engine's own progress chunks are not passed on")
ok(not any(x["state"] == "queued" for x in A.statuses()), "the first device, which had nobody ahead of it, was not told to wait", A.statuses()[:2])
ok(len(stub_starts()) == 1, "the engine was started once for the two", len(stub_starts()))
rq = [x for x in stub_log() if x.get("ev") == "req"]
ok(rq and all(x["return_progress"] is True for x in rq), "return_progress was asked of the engine on streaming requests", [x["return_progress"] for x in rq])
ok("ingenium_status" not in rq[0]["keys"] and "ingenium_ctx" not in rq[0]["keys"] and "messages" in rq[0]["keys"], "the engine never sees ingenium_status or ingenium_ctx", rq[0]["keys"])

# a device that did not ask for status lines gets none, only the comments
reset_engine()
clear_stub({"tokens": 3, "gap": 0.05, "first_s": 1.2, "prog_s": 0.2})
C = Req(chat("m-4b")).wait()
ok(C.statuses() == [] and C.done() and C.words().strip() == "w0 w1 w2", "a device that did not ask has no status lines in its stream and its words are whole")
ok(len(C.comments()) >= 2, "but it still gets ': waiting' lines while the engine reads", len(C.comments()))

# different models: the second waits, the first is not cut off, the engine starts for the second only after
reset_engine()
clear_stub({"tokens": 8, "gap": 0.25, "first_s": 0.0})
A = Req(chat("m-4b", "first"))
time.sleep(1.0)
B = Req(chat("m-9b", "second"))
A.wait()
B.wait()
ok(A.words().strip() == " ".join("w%d" % i for i in range(8)) and A.done() and not A.errors(), "different models: the first reply was written to its end (nothing killed in the middle)", A.words())
ok(B.done() and B.words().strip().startswith("w0") and not B.errors(), "the second was answered after")
ss = stub_starts()
dn = [x for x in stub_log() if x.get("ev") == "done"]
ok(len(ss) == 2 and dn and ss[1]["t"] >= dn[0]["t"] - 0.01, "the second model's engine started only after the first reply was done", (len(ss), [round(x["t"] % 1000, 1) for x in ss], [round(x["t"] % 1000, 1) for x in dn]))
ok(argval(argv_of(ss[1]), "-c") == "16384", "and with its own window, 16,384")

# the line is four long
reset_engine()
clear_stub({"tokens": 4, "gap": 0.4, "first_s": 0.0})
runs = [Req(chat("m-4b", "r%d" % i), delay=0.15 * i) for i in range(7)]
for x in runs:
    x.wait(40)
codes = [x.status for x in runs]
rej = [x for x in runs if x.status == 503]
ok(len(rej) == 2 and all("already waiting" in x.text() for x in rej), "one being answered, four waiting: the sixth and seventh are told so (503)", codes)
ok(sum(1 for x in runs if x.status == 200 and x.done()) == 5, "the five that were let in were all answered whole")
ok(wait_for(lambda: mod._lend_q_counts() == (0, 0), 5) is True, "the line is empty afterwards", mod._lend_q_counts())

# a waiting device that goes is dropped and never reaches the engine
reset_engine()
clear_stub({"tokens": 6, "gap": 0.3, "first_s": 0.0})
A = Req(chat("m-4b", "stays"))
time.sleep(0.7)
sk = socket.create_connection(("127.0.0.1", PORT), timeout=10)
raw = json.dumps(chat("m-4b", "goes")).encode()
sk.sendall(("POST /v1/chat/completions HTTP/1.0\r\nAuthorization: Bearer %s\r\nContent-Type: application/json\r\nContent-Length: %d\r\n\r\n" % (CODE, len(raw))).encode() + raw)
first = sk.recv(4096)
ok(b"200" in first.split(b"\r\n")[0], "the waiting device was heard at once (200)", first[:30])
st, info = jget("/ingenium/info")
ok(info["busy"] == 1 and info["queued"] == 1, "/ingenium/info shows one being answered and one waiting", (info["busy"], info["queued"]))
sk.close()
dropped = wait_for(lambda: mod._lend_q_counts()[1] == 0, 4)
ok(dropped is True, "after it went the line is empty again within seconds", mod._lend_q_counts())
A.wait()
ok(A.done() and len([x for x in stub_log() if x.get("ev") == "req"]) == 1, "only the device that stayed reached the engine", len([x for x in stub_log() if x.get("ev") == "req"]))

# a device that goes while the engine reads its message frees the engine
reset_engine()
clear_stub({"tokens": 3, "gap": 0.05, "first_s": 6.0, "prog_s": 0.2})
sk = socket.create_connection(("127.0.0.1", PORT), timeout=10)
raw = json.dumps(chat("m-4b", "a long message " * 50, ingenium_status=True)).encode()
sk.sendall(("POST /v1/chat/completions HTTP/1.0\r\nAuthorization: Bearer %s\r\nContent-Type: application/json\r\nContent-Length: %d\r\n\r\n" % (CODE, len(raw))).encode() + raw)
wait_for(lambda: any(x.get("ev") == "req" for x in stub_log()), 15)
time.sleep(0.6)
tclose = time.time()
sk.close()
gone = wait_for(lambda: any(x.get("ev") == "gone" for x in stub_log()), 5)
ok(bool(gone), "the engine was told the device had gone while it was reading (it stopped within seconds, not at the end of 6 s)", round(time.time() - tclose, 2))
ok(wait_for(lambda: mod._lend_q_counts() == (0, 0), 5) is True, "and the lender is free again", mod._lend_q_counts())
clear_stub({"tokens": 3, "gap": 0.05, "first_s": 0.2, "prog_s": 0.1})
t1 = time.time()
D = Req(chat("m-4b", "next"))
D.wait()
ok(D.done() and time.time() - t1 < 6, "the next device is not held up by the abandoned message", round(time.time() - t1, 1))

print("\n== the engine that stops (C4, C6)")
reset_engine()
clear_stub({"tokens": 8, "gap": 0.1, "die_at": 3})
r = Req(chat("m-4b", "dies")).wait()
er = r.errors()
ok(r.words().strip() == "w0 w1 w2" and len(er) == 1 and er[0].get("type") == "engine_stopped" and r.done(), "the engine stopping in the middle: the words so far, then an error inside the stream, then [DONE]", (r.words(), er))
ok("stopped while it was answering" in er[0].get("message", ""), "the error says in plain words what happened", er[0].get("message"))
clear_stub({"tokens": 3, "gap": 0.02})
r = Req(chat("m-4b", "again")).wait()
ok(r.done() and r.words().strip() == "w0 w1 w2" and not r.errors(), "the next question starts the engine again and is answered whole", r.words())

# a chip that gives way: the engine starts again on the processor and the device is told
set_cfg(gpu="gpu")
reset_engine("NVIDIA GeForce RTX 3050 Laptop GPU|4096|3800")
os.environ["STUB_CHIP_CRASH"] = "1"
clear_stub({"tokens": 3, "gap": 0.02})
r = Req(chat("m-4b", "chip", ingenium_status=True)).wait(40)
ss = stub_starts()
ok(len(ss) == 2 and "none" not in argv_of(ss[0]) and "--device" in argv_of(ss[1]) and argval(argv_of(ss[1]), "--device") == "none", "the chip crashed the engine; it was started again with --device none", [("--device" in argv_of(x) and argval(argv_of(x), "--device")) for x in ss])
notes = [x.get("note") for x in r.statuses() if x.get("note")]
ok(r.done() and r.words().strip() == "w0 w1 w2" and not r.errors(), "the same message was answered whole on the processor, with no error shown", (r.words(), r.errors()))
ok(notes and "graphics chip stopped" in notes[0] and "processor" in notes[0], "the device was told: the graphics chip stopped, the processor is used (slower)", notes[:1])
st, info = jget("/ingenium/info")
ok(info["gpu_used"] is False and info["loaded"] == "m-4b", "/ingenium/info: gpu_used is false now", info["gpu_used"])
ok(mod._LEND_GPU_OFF["off"] is True, "the chip is left alone for the rest of the run")
set_cfg(gpu=None)
st, info = jget("/ingenium/info")
ok(info["cpu_only"] is True and "stopped" in (info["gpu_why"] or ""), "automatic then says processor, and why", info["gpu_why"])
# a chip that fails to load the model: the app's own retry, and the chip is left alone
reset_engine("NVIDIA GeForce RTX 3050 Laptop GPU|4096|3800")
set_cfg(gpu="gpu")
os.environ["STUB_CHIP_LOADFAIL"] = "1"
clear_stub({"tokens": 2, "gap": 0.02})
r = Req(chat("m-4b", "loadfail")).wait(40)
ok(r.done() and not r.errors() and mod._LEND_GPU_OFF["off"] is True, "a chip that cannot load the model: the engine starts on the processor, the answer comes, the chip is left alone", r.errors())
set_cfg(gpu=None)

print("\n== the graphics choice (C6)")
CASES = [("Intel(R) UHD Graphics 620", 8036, False), ("Intel(R) Iris(R) Xe Graphics", 7954, False), ("AMD Radeon(TM) Graphics", 8192, False),
         ("AMD Radeon(TM) Vega 8 Graphics", 2048, False), ("NVIDIA GeForce GTX 1650", 4096, True), ("NVIDIA GeForce RTX 3050 Laptop GPU", 4096, True),
         ("AMD Radeon RX 6600", 8176, True), ("Intel(R) Arc(TM) A370M Graphics", 4096, True), ("NVIDIA GeForce MX150", 2048, False),
         ("Microsoft Basic Render Driver", 0, False), ("llvmpipe (LLVM 15.0.7, 256 bits)", 15000, False), ("NVIDIA GeForce GTX 1050", 2048, False),
         ("NVIDIA RTX A2000 Laptop GPU", 4096, True), ("AMD Radeon RX Vega 11 Graphics", 2048, False), ("AMD Radeon RX Vega 56", 8176, True),
         ("Intel(R) Arc(TM) Graphics", 8000, False), ("AMD Radeon 780M Graphics", 4096, False), ("Intel(R) Iris(R) Plus Graphics", 1536, False)]
bad = []
for name, mib, want in CASES:
    reset_engine("%s|%d|%d" % (name, mib, max(0, mib - 500)))
    devs = mod._engine_devices(ENG)
    wait_for(lambda: mod._ENGINE_DEVICES["list"] is not None, 20)
    nm, use, why = mod._engine_gpu_pick(ENG, True, wait=True)
    if use != want:
        bad.append((name, use, want))
ok(not bad, "Automatic: %d chips told apart as the plan says (cards used; small shared chips, Vega, MX, software left to the processor)" % len(CASES), bad)
reset_engine("Intel(R) UHD Graphics 620|8036|7000;NVIDIA GeForce RTX 3050 Laptop GPU|4096|3800")
mod._engine_devices(ENG)
wait_for(lambda: mod._ENGINE_DEVICES["list"] is not None, 20)
nm, use, why = mod._engine_gpu_pick(ENG, True, wait=True)
ok(use and "3050" in nm and mod._LEND_GPU_IDS[0] == "Vulkan1", "a small chip beside a card: only the card is named for the engine (Vulkan1)", (nm, mod._LEND_GPU_IDS[0]))
reset_engine("Intel(R) UHD Graphics 620|8036|7000")
set_cfg(gpu="cpu")
clear_stub({"tokens": 2, "gap": 0.02})
Req(chat("m-4b")).wait()
a = argv_of(stub_starts()[-1])
ok(argval(a, "--device") == "none" and argval(a, "-ngl") == "0" and argval(a, "-b") == "512", "Processor only: the engine gets --device none -ngl 0 -b 512", a[a.index("--device") - 1:] if "--device" in a else a)
reset_engine("NVIDIA GeForce RTX 3050 Laptop GPU|4096|3800")
clear_stub({"tokens": 2, "gap": 0.02})
Req(chat("m-4b")).wait()
a = argv_of(stub_starts()[-1])
ok(argval(a, "--device") == "none", "Processor only holds even with a card", None)
set_cfg(gpu="gpu")
reset_engine("Intel(R) UHD Graphics 620|8036|7000")
clear_stub({"tokens": 2, "gap": 0.02})
Req(chat("m-4b")).wait()
a = argv_of(stub_starts()[-1])
ok("--device" not in a and "-ngl" not in a and "-b" not in a, "Graphics chip: even the small chip is used (no --device none, no -ngl 0)", a)
set_cfg(gpu=None)
reset_engine("Intel(R) UHD Graphics 620|8036|7000")
clear_stub({"tokens": 2, "gap": 0.02})
Req(chat("m-4b")).wait()
a = argv_of(stub_starts()[-1])
ok(argval(a, "--device") == "none" and argval(a, "-b") == "512", "Automatic with a small chip: the processor, with short batches")
reset_engine("NVIDIA GeForce RTX 3050 Laptop GPU|4096|3800")
clear_stub({"tokens": 2, "gap": 0.02})
Req(chat("m-4b")).wait()
a = argv_of(stub_starts()[-1])
ok("--device" not in a and "-ngl" not in a, "Automatic with a card: the card is left to the engine")
st, info = jget("/ingenium/info")
ok(info["gpu_used"] is True and info["cpu_only"] is False and "3050" in info["gpu_name"], "/ingenium/info: gpu_used true, cpu_only false, the card named", (info["gpu_used"], info["gpu_name"]))
view = mod._share_status()["options"]
ok(view["gpu"] == "auto" and view["gpu_now"]["using"] == "gpu" and view["ctx"] == "auto" and view["ram_gb"] == 16.0, "the sharing status carries the choices and 'right now'", view["gpu_now"])
mod._share_option_set("gpu", "cpu")
view = mod._share_status()["options"]
ok(view["gpu"] == "cpu", "share_option_set('gpu', 'cpu') is saved with the sharing settings", view["gpu"])
ok(mod._share_option_set("gpu", "fast").get("ok") is False and mod._share_option_set("what", 1).get("ok") is False, "a choice that does not exist is refused")
mod._share_option_set("gpu", "auto")

print("\n== advice and speed (C7)")
reset_engine("Intel(R) UHD Graphics 620|8036|7000")
adv = {mid: mod._share_advice(BYID[mid], 16.0, True) for mid in BYID}
ok(adv["m-12b"] == adv["m-26b"] == adv["m-4b"] == adv["m-8b"] == "quick", "16 GB, processor: 1.2B, 2.6B, 4B and 8B-A1B are quick", adv)
ok(adv["m-9b"] in ("ok", "slow") and adv["m-g12"] == "slow" and adv["m-g26"] == "too big", "the 9B is not quick, Gemma 12B is slow, the 26B is too big", (adv["m-9b"], adv["m-g12"], adv["m-g26"]))
chip = {mid: mod._share_advice(BYID[mid], 16.0, False) for mid in BYID}
ok(chip["m-9b"] == "quick" and chip["m-g26"] == "too big", "with a card the 9B is quick", chip["m-9b"])
ok(mod._share_advice(BYID["m-9b"], 16.0, True, measured=9.5) == "quick" and mod._share_advice(BYID["m-4b"], 16.0, True, measured=2.0) == "slow"
   and mod._share_advice(BYID["m-4b"], 16.0, True, measured=5.0) == "ok", "a measured speed replaces the guess (9.5 quick, 5 ok, 2 slow)")
ad = mod._share_advise([{"name": "Qwen3.5 4B", "size": 2740000000, "lineup": "qwen3.5-4b"}, {"name": "x", "size": "bad"}, {"name": "Gemma 4 26B-A4B", "size": 14400000000, "lineup": "gemma-4-26b-a4b"}])
ok(ad[0]["advice"] == "quick" and ad[0]["ctx"] == 32768 and ad[2]["advice"] == "too big" and ad[1] == {}, "share_advise answers for the page's own list (4B quick; a bad row gives {})", ad)
ok(mod._lend_params({"lineup": "mellum2.1-12b-thinking"}) == (12.0, 2.5) and mod._lend_params({"file": "Some-Model-7B-Q4.gguf"}) == (7.0, 7.0)
   and mod._lend_params({"file": "x-30B-A3B-q4.gguf", "lineup": ""}) == (30.0, 3.0) and mod._lend_params({"lineup": "lfm2.5-350m"})[0] == 0.35, "parameters are read from the lineup name, else the file name (7B, 30B-A3B, 350M)")
reset_engine("Intel(R) UHD Graphics 620|8036|7000")
try:
    os.remove(str(mod._lend_speed_path()))
except OSError:
    pass
clear_stub({"tokens": 12, "gap": 0.1})
Req(chat("m-4b", "measure")).wait()
sp = mod._lend_speed_all().get("m-4b")
ok(sp and 8 < sp["tps"] < 12 and sp["cpu"] is True and sp["n"] == 1, "the speed of a whole reply is kept per model (about 10 words a second here)", sp)
st, ms = jget("/v1/models")
m4 = {m["id"]: m for m in ms["data"]}["m-4b"]
ok(m4["tps_measured"] is True and 8 < m4["tps"] < 12 and m4["advice"] == "quick", "and /v1/models shows it, measured", (m4["tps"], m4["tps_measured"], m4["advice"]))
clear_stub({"tokens": 12, "gap": 0.2})
Req(chat("m-4b", "measure again")).wait()
sp2 = mod._lend_speed_all().get("m-4b")
ok(sp2 and sp2["n"] == 2 and 6 < sp2["tps"] < sp["tps"], "a second measurement is averaged in, not taken alone", sp2)
clear_stub({"tokens": 3, "gap": 0.02})
Req(chat("m-4b", "short")).wait()
ok(mod._lend_speed_all().get("m-4b", {}).get("n") == 2, "a reply of fewer than 8 words is not counted")

print("\n== readings, a streamed and a plain answer, the shell calls")
tot, fr = ORIG_RAM()
ok(tot and fr and 0 < fr <= tot + 0.1, "the real reading of this computer's memory gives the total and what is free (Linux)", (tot, fr))
import types
import unittest.mock as um
canned = "Mach Virtual Memory Statistics: (page size of 16384 bytes)\nPages free:                               12345.\nPages inactive:                           23456.\nPages speculative:                         1000.\n"
with um.patch.object(sys, "platform", "darwin"), um.patch.object(mod.subprocess, "run", return_value=types.SimpleNamespace(stdout=canned, returncode=0)):
    mod._LEND_RAM_SEEN.update(at=0.0, free=None)
    tot2, fr2 = ORIG_RAM()
mod._LEND_RAM_SEEN.update(at=0.0, free=None)
ok(fr2 == 0.6, "a Mac's free memory is read from vm_stat (12,345 + 23,456 + 1,000 pages of 16,384 bytes = 0.6 GB)", fr2)
saved = os.environ.pop("INGENIUM_LEND_TICK")
ok(mod._lend_tick() == 10.0, "a quiet stream is sent a ': waiting' line every ten seconds unless told otherwise")
os.environ["INGENIUM_LEND_TICK"] = saved
reset_engine()
clear_stub({"tokens": 4, "gap": 0.02})
st, tx = call("POST", "/v1/chat/completions", chat("m-4b", "plain", stream=False))
j = json.loads(tx)
ok(st == 200 and j["choices"][0]["message"]["content"].startswith("w0 w1"), "a request that does not stream is answered as one piece of JSON", tx[:100])
rq = [x for x in stub_log() if x.get("ev") == "req"][-1]
ok(rq["stream"] is False and rq["return_progress"] is False, "and the engine is not asked for progress it could not send", (rq["stream"], rq["return_progress"]))
ok(all(callable(getattr(getattr(mod, c), n, None)) for c in ("IngeniumApi", "IngeniumApiSingle") for n in ("share_option_set", "share_advise")), "both API classes carry share_option_set and share_advise")
ss = mod._share_status()
ok("queued" in ss and ss["queued"] == 0 and "options" in ss and ss["busy"] == 0 and "callins" in ss and "firewall" in ss, "share_status keeps all it had and gains queued and options", sorted(ss.keys())[:12])

print("\n== the lock (C4)")
mod._SHARE["fails"].clear()
codes = [call("GET", "/", code=False)[0] for _ in range(12)] + [call("GET", "/favicon.ico", code=False)[0] for _ in range(4)]
ok(set(codes) == {401}, "sixteen visits with no code at all (a browser) get 401 every time, never 429", sorted(set(codes)))
ok(call("GET", "/v1/models")[0] == 200, "and the right code still works afterwards")
mod._SHARE["fails"].clear()
seen = [call("GET", "/v1/models", code="WRNG-CODE")[0] for _ in range(10)]
ok(seen[:8] == [401] * 8 and seen[8:] == [429, 429], "eight wrong codes are 401, then the lock (429)", seen)
ok(call("GET", "/v1/models")[0] == 429, "the lock holds against the right code too, as before")
mod._SHARE["fails"].clear()

print("\n== the call-in route (C4)")
mod._share_stop()
mod._SHARE_PORT = PORT0 + 1
mod._share_cfg_save({"callins": True, "code": "ABCD-2345"})
mod._share_apply()
PORT = mod._SHARE["port"]
CODE = mod._share_code()
mod._LEND_PICKUP_WAIT = 2.0
env = dict(os.environ, B_FIRST_S="4", STUB_LOG=os.path.join(WORK, "stubB.jsonl"), STUB_CTL=os.path.join(WORK, "stubB_ctl.json"))
wb = os.path.join(WORK, "B")
os.makedirs(wb, exist_ok=True)
bproc = subprocess.Popen([sys.executable, "-I", os.path.abspath(__file__), "--lender", APP, wb, CODE, "127.0.0.1:%d" % PORT], env=env,
                         stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
blog = []
threading.Thread(target=lambda: [blog.append(x.rstrip()) for x in bproc.stdout], daemon=True).start()
lid = None
t0 = time.time()
while time.time() - t0 < 25 and not lid:
    lst = mod._callin_list()
    lid = lst[0]["id"] if lst else None
    time.sleep(0.3)
ok(lid is not None, "a lender calls in (its models are listed here)", blog[-2:])
if lid:
    models = mod._callin_list()[0]["models"]
    ok(models and "context_length" in models[0] and "advice" in models[0] and "max_tokens" in models[0], "the models it sends carry context_length, max_tokens and advice", sorted(models[0].keys()))
    t = time.time()
    c = conn_to(60)
    body = chat("m-4b", "hello", ingenium_status=True)
    c.request("POST", "/ingenium/via/%s/v1/chat/completions" % lid, body=json.dumps(body).encode(), headers={"Authorization": "Bearer " + CODE, "Content-Type": "application/json"})
    r = c.getresponse()
    head_t = time.time() - t
    data = r.read().decode("utf-8", "replace")
    c.close()
    ok(r.status == 200, "a lender whose first word takes 4 seconds no longer gives 504 (the pick-up limit was shortened to 2 s)", r.status)
    ok(head_t < 1.5, "the reply's head arrives at once, not when the first word is ready", round(head_t, 2))
    ok("w0" in data and "[DONE]" in data, "and the words and [DONE] come through the call", data[-80:].replace("\n", " "))
    ok(": waiting" in data or '"state": "reading"' in data or '"state":"reading"' in data, "with a keep-alive line or a status line on the way while it waited", None)
    bproc.terminate()
    bproc.wait(10)
    time.sleep(0.5)
    t = time.time()
    c = conn_to(60)
    c.request("POST", "/ingenium/via/%s/v1/chat/completions" % lid, body=json.dumps(chat("m-4b")).encode(), headers={"Authorization": "Bearer " + CODE, "Content-Type": "application/json"})
    r = c.getresponse()
    tx = r.read().decode("utf-8", "replace")
    c.close()
    ok(r.status == 504 and "did not pick the request up in 2 seconds" in tx and 1.5 < time.time() - t < 6, "a lender that does not pick the request up: a true 504, which says so", (r.status, tx[:140]))
else:
    bproc.terminate()
mod._share_stop()

shutil.rmtree(WORK, ignore_errors=True)
print("\n%d passed, %d failed" % (pass_n, fail_n))
sys.exit(1 if fail_n else 0)
