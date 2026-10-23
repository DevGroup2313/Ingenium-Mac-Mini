"""Ingenium 6.2: a long memory, and quicker long conversations, in the computer apps' engine (patch for ingenium_app.py,
Mac and Windows).

The page now gives a model on this computer up to 131,072 tokens of memory by itself and 262,144 by hand (modules/r159.js).
The engine (llama.cpp b11321) is started so that this costs half the room and runs quickly:
  - past 32,768 tokens its memory is kept in eight bits (-ctk q8_0 -ctv q8_0), with flash attention on (-fa on), which the
    eight-bit memory needs; on Apple's chips flash attention is also the quicker way;
  - --cache-reuse 256: when a long conversation moves on, what the engine has already read is reused wherever it still
    stands, not read again from the start;
  - an engine that refuses the eight-bit memory (a graphics chip without flash attention) is started again at once
    without it, at the same memory, and the page is told why.

    python3 build/desktop/app_ctx_62.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_KVQ_OK" in s:
    print("already patched", p)
    sys.exit(0)

# 1. the launch: the eight-bit memory past 32,768, flash attention with it, and the reuse of what was read
rep('''def _engine_launch(path, n_ctx, mmp, use_gpu, drafter=None):
    """Start llama-server. Returns (proc, port) or raises."""''', '''# 6.2: past this much memory the engine keeps it in eight bits (half the room); cleared for the session when an engine
# refuses it, so every later start goes without
_KVQ_AT = 32768
_KVQ_OK = [True]


def _engine_kvq(n_ctx):
    try:
        return _KVQ_OK[0] and int(n_ctx) > _KVQ_AT
    except Exception:
        return False


def _engine_launch(path, n_ctx, mmp, use_gpu, drafter=None):
    """Start llama-server. Returns (proc, port) or raises."""''')
rep('''    args = [exe, "-m", path, "--host", "127.0.0.1", "--port", str(port), "-c", str(n_ctx),
            "-np", "1", "--jinja", "--no-webui"]''', '''    args = [exe, "-m", path, "--host", "127.0.0.1", "--port", str(port), "-c", str(n_ctx),
            "-np", "1", "--jinja", "--no-webui", "--cache-reuse", "256"]
    # 6.2: a long memory in eight bits, with the flash attention it needs
    if _engine_kvq(n_ctx):
        args += ["-fa", "on", "-ctk", "q8_0", "-ctv", "q8_0"]''')
# 2. the engine remembers whether this start used the eight-bit memory
rep('''        _ENGINE.update(proc=proc, port=port, key=key, model_id=str(model_id), args=(path, n_ctx, mmp, drafter),
                       state="loading", error="", note="", log=[], started=time.time(),
                       gpu=gpu_name if use_gpu else "", draft=bool(drafter))''', '''        _ENGINE.update(proc=proc, port=port, key=key, model_id=str(model_id), args=(path, n_ctx, mmp, drafter),
                       state="loading", error="", note="", log=[], started=time.time(),
                       gpu=gpu_name if use_gpu else "", draft=bool(drafter), kvq=_engine_kvq(n_ctx))''')
# 3. an engine that refused it starts again without it, before any other retry
rep('''        # R73: a speed-up file that the engine cannot use is no reason to give
        # up either: load the model again without it.
        if state == "loading":''', '''        # 6.2: an engine that cannot keep its memory in eight bits (or lacks flash attention) starts again without it,
        # at the same memory; every later start this session goes without
        if state == "loading":
            with _ENGINE_LOCK:
                args = _ENGINE["args"] if _ENGINE["proc"] is p else None
                kvq = bool(_ENGINE.get("kvq"))
            if args and kvq:
                _KVQ_OK[0] = False
                try:
                    proc, port2, _a = _engine_launch(args[0], args[1], args[2], bool(gpu), args[3] if len(args) > 3 else None)
                    with _ENGINE_LOCK:
                        if _ENGINE["proc"] is p:
                            _ENGINE.update(proc=proc, port=port2, state="loading", log=[], kvq=False,
                                           note="This computer's engine could not keep a long memory in eight bits, so it keeps it in full (it needs more room).",
                                           started=time.time())
                    return {"state": "loading", "port": port2, "model_id": model_id, "log": [],
                            "seconds": 0.0, "note": _ENGINE["note"]}
                except Exception:
                    log_problem("engine: the retry without the eight-bit memory could not start", sys.exc_info())
        # R73: a speed-up file that the engine cannot use is no reason to give
        # up either: load the model again without it.
        if state == "loading":''')
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
