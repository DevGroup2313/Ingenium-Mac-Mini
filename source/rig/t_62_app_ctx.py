"""Ingenium 6.2 · the computer apps' engine with a long memory (desktop/app_ctx_62.py applied to ingenium_app.py), without the
engine: its start is stood in for, so the arguments it would be given, and what happens when it refuses them, can be seen.

  python3 -I rig/t_62_app_ctx.py path/to/patched/ingenium_app.py

Checks: up to 32,768 tokens the engine starts as before (no eight-bit memory), always with --cache-reuse; past it, with
-fa on -ctk q8_0 -ctv q8_0; an engine that stops while loading with the eight-bit memory is started again at once without
it, at the same memory, with a note for the page; every later start that session goes without it; the other retries (on
the processor) still follow; the memory asked for is held between 512 and 262,144 (1,048,576 from 6.3).
(On a real llama.cpp b11321, rig notes: at 131,072 tokens the eight-bit memory took 237 MB against 357 MB, and -ctv q8_0
without flash attention made the engine stop with "exiting due to model loading error", which is what the retry is for.)"""
import importlib.util, sys, types

APP = sys.argv[1]
passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    print(("PASS " if c else "FAIL ") + m + ("  " + str(d)[:300] if d is not None else ""))
    if c:
        passed += 1
    else:
        failed += 1


sys.modules["webview"] = types.ModuleType("webview")
spec = importlib.util.spec_from_file_location("ingenium_app", APP)
ia = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ia)


class Proc:
    def __init__(self, args):
        self.args, self.code = args, None

    def poll(self):
        return self.code


launched = []


def popen(args, **kw):
    launched.append(Proc(args))
    return launched[-1]


ia.subprocess.Popen = popen
ia._engine_dir = lambda: "/engine"
ia._engine_exe = lambda d: "/engine/llama-server"
ia._engine_free_port = lambda: 40000 + len(launched)
ia._engine_popen_kw = lambda d: {}
ia._engine_reader = lambda proc: None
ia._engine_gpu = lambda d: "Apple M4"
ia._model_path_for = lambda mid: "/models/%s.gguf" % mid
ia._drafter_for = lambda mid: None
ia.os.path.isfile = lambda p: True
ia.os.access = lambda p, m: True


def start(n):
    launched.clear()
    ia._engine_stop()
    return ia._engine_start("m1", n)


r = start(8192)
a = launched[-1].args
ok(r.get("ok") and "--cache-reuse" in a and a[a.index("--cache-reuse") + 1] == "256" and "-ctk" not in a and "-fa" not in a,
   "8,192 tokens: as before, with what was read reused (--cache-reuse 256), no eight-bit memory", a)
start(32768)
ok("-ctk" not in launched[-1].args, "32,768 tokens: still in full")
start(131072)
a = launched[-1].args
ok(all(x in a for x in ["-fa", "on", "-ctk", "q8_0", "-ctv"]) and a[a.index("-c") + 1] == "131072",
   "131,072 tokens: the memory in eight bits, flash attention on", a)
start(10 ** 7)
# (6.3, desktop/app_ctx_63.py: up to 1,048,576 when the app carries it; 262,144 before)
CAP = "1048576" if "_ING_CTX_MAX" in open(APP, encoding="utf-8").read() else "262144"
ok(launched[-1].args[launched[-1].args.index("-c") + 1] == CAP, "a memory asked past the longest is held to it (" + CAP + ")")

# the engine refuses the eight-bit memory while loading
start(131072)
first = launched[-1]
first.code = 1
ia._ENGINE["log"] = ["llama_server: exiting due to model loading error"]
st = ia._engine_status()
second = launched[-1]
ok(second is not first and "-ctk" not in second.args and second.args[second.args.index("-c") + 1] == "131072"
   and st.get("state") == "loading" and "eight bits" in (st.get("note") or ""),
   "a refusal: started again at once without it, at the same memory, and the page is told why", (st, second.args))
start(65536)
ok("-ctk" not in launched[-1].args, "every later start this session goes without it")
# the processor retry still follows when the second start fails too
third_before = len(launched)
launched[-1].code = 1
ia._ENGINE["log"] = ["ggml_metal: failed to allocate"]
st2 = ia._engine_status()
ok(len(launched) == third_before + 1 and "-ngl" in launched[-1].args, "and the processor retry still follows", launched[-1].args)
ia._KVQ_OK[0] = True
print("\n%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
