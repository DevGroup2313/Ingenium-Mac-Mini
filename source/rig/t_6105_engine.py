#!/usr/bin/env python3
"""A newer engine beside the proven one (Ingenium 6.10.5, build/desktop/app_engine2_6105.py): the app's side, run here with its own CODE
against stand-in engines (folders holding a file named as the engine, its version and the kinds of model it lists) and invented model
files (the first bytes of a GGUF file, naming a kind), so nothing real is started.

    python3 -I rig/t_6105_engine.py

Her words (3 November 2026): "I don't want to lose my reliable llama cpp engine, I want the option of a newer engine where it tested and
proven to work and work well but I still want the llama engine kept optional or in some cases as a backup or default". Checks: a model's
kind is read from its file; automatic runs every model on the proven engine except a kind only the newer one lists; "newer" runs what the
newer one lists on it; "proven" never uses it; with no newer engine in the copy, nothing changes; when the newer engine cannot load a
model, the proven one loads it at once and keeps it this session; the choice is kept; the self-test can be put on either engine; and the
patch applies once to the three apps, after what it wraps, and they compile."""
import os, sys, json, struct, shutil, tempfile, threading, time, importlib.util, subprocess, py_compile

HERE = os.path.dirname(os.path.abspath(__file__))
PATCH = os.path.normpath(os.path.join(HERE, "..", "build", "desktop", "app_engine2_6105.py"))
ROOT = os.path.normpath(os.path.join(HERE, "..", "..", ".."))
passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    print(("PASS " if c else "FAIL ") + m + ("" if c or d is None else "  " + json.dumps(d, default=str)[:500]))
    passed, failed = (passed + 1, failed) if c else (passed, failed + 1)


def gguf(path, arch, extra=True):
    """the first bytes of a GGUF file: a string and an array before general.architecture, as real files have"""
    kv = []
    def s(key, val):
        k, v = key.encode(), val.encode()
        return struct.pack("<Q", len(k)) + k + struct.pack("<I", 8) + struct.pack("<Q", len(v)) + v
    def arr(key, items):
        k = key.encode(); body = struct.pack("<I", 8) + struct.pack("<Q", len(items))
        for it in items:
            b = it.encode(); body += struct.pack("<Q", len(b)) + b
        return struct.pack("<Q", len(k)) + k + struct.pack("<I", 9) + body
    if extra:
        kv.append(s("general.type", "model"))
        kv.append(arr("general.tags", ["text-generation", "gguf"]))
        kv.append(struct.pack("<Q", 15) + b"general.version" + struct.pack("<I", 4) + struct.pack("<I", 3))
    kv.append(s("general.architecture", arch))
    head = b"GGUF" + struct.pack("<I", 3) + struct.pack("<Q", 0) + struct.pack("<Q", len(kv))
    open(path, "wb").write(head + b"".join(kv) + b"\0" * 64)


spec = importlib.util.spec_from_file_location("app_engine2_6105", PATCH)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
tmp = tempfile.mkdtemp(prefix="ing6105-")
try:
    plat = "macos-arm64"
    proven = os.path.join(tmp, "app", "engine", plat)
    newer = os.path.join(tmp, "app", "engine-next", plat)
    data = os.path.join(tmp, "data")
    for d, ver, kinds in ((proven, "llama.cpp b11321", "llama qwen35 gemma4 (unknown)"), (newer, "llama.cpp b12000", "llama qwen35 gemma4 lfm3 deepseek41 (unknown)")):
        os.makedirs(d)
        open(os.path.join(d, "llama-server"), "w").write("#!/bin/sh\n")
        open(os.path.join(d, "VERSION.txt"), "w").write(ver + "\n")
        open(os.path.join(d, "ARCHS.txt"), "w").write(kinds + "\n")
    models = {}
    for name, arch in (("lfm3", "lfm3"), ("qwen", "qwen35"), ("odd", "somethingnew")):
        models[name] = os.path.join(tmp, name + ".gguf")
        gguf(models[name], arch)
    launched, problems = [], []

    class Proc:
        def __init__(self, code=None):
            self.code = code
        def poll(self):
            return self.code

    ns = {"os": os, "sys": sys, "json": json, "time": time, "threading": threading, "log_problem": lambda w, i=None: problems.append(w),
          "_ENGINE_EXE": "llama-server", "_engine_platform": lambda: plat, "_app_roots": lambda: [os.path.join(tmp, "app")],
          "_engine_unpack": lambda z, p: None, "_rag_app_dir": lambda: data, "_ENGINE_LOCK": threading.RLock(),
          "_ENGINE": {"proc": None, "port": None, "key": None, "model_id": None, "args": None, "state": "off", "error": "", "note": "", "log": [], "started": 0.0, "gpu": ""}}

    def _engine_dir():
        return proven

    def _engine_launch(path, n_ctx, mmp, use_gpu, drafter=None):
        d = ns["_engine_dir"]()          # the app's own launch reads the engine folder this way
        launched.append((os.path.basename(path), "newer" if d == newer else "proven"))
        return Proc(), 1234, [d]

    def _engine_status():
        return {"state": ns["_ENGINE"]["state"]}
    ns.update(_engine_dir=_engine_dir, _engine_launch=_engine_launch, _engine_status=_engine_status)
    exec(mod.CODE, ns)

    # 1. a model's kind, from its file
    ok(ns["_gguf_arch"](models["lfm3"]) == "lfm3" and ns["_gguf_arch"](models["qwen"]) == "qwen35" and ns["_gguf_arch"](os.path.join(tmp, "none.gguf")) is None,
       "a model's kind is read from its file's first bytes (past a string and a list before it); an unreadable file gives none")
    # 2. the choices
    run = lambda name: (ns["_engine_launch"](models[name], 8192, None, True), launched[-1][1])[1]
    ok(ns["_engine_choice_get"]() == "auto" and run("qwen") == "proven" and run("lfm3") == "newer" and run("odd") == "proven",
       "automatic (the default): a kind the proven engine lists runs on it; LFM3, which only the newer one lists, on the newer; a kind neither lists, on the proven", launched[-3:])
    ok(ns["_engine_choice_set"]("newer")["ok"] and run("qwen") == "newer" and run("odd") == "proven",
       "newer: every kind the newer engine lists runs on it; one it does not list stays on the proven", launched[-2:])
    ok(ns["_engine_choice_set"]("proven")["ok"] and run("lfm3") == "proven" and not ns["_engine_choice_set"]("fastest")["ok"],
       "proven: the newer engine is never used; a choice that is not one of the three is refused", launched[-1:])
    ok(json.load(open(os.path.join(data, "engine.json")))["choice"] == "proven", "the choice is kept in the app's data folder")
    ok(ns["_ENGINE_USE"]["next"] is False and ns["_engine_dir"]() == proven, "outside a start, every other part of the app still finds the proven engine (its trainer, its version)")
    # 3. the fall back
    ns["_engine_choice_set"]("auto"); ns["_engine_launch"](models["lfm3"], 8192, None, True)
    E = ns["_ENGINE"]; dead = Proc(code=1)
    E.update(proc=dead, state="loading", args=(models["lfm3"], 8192, None, None), gpu="Apple M2", model_id="m-lfm3")
    r = ns["_engine_status"]()
    ok(r.get("state") == "loading" and r.get("engine_kind") == "proven" and launched[-1] == ("lfm3.gguf", "proven") and E["proc"] is not dead and "proven engine runs it" in r.get("note", ""),
       "the newer engine could not load the model: the proven engine loads it at once, and the page is told", {"r": r, "last": launched[-1]})
    ok(run("lfm3") == "proven", "that model stays on the proven engine for the rest of the session")
    E.update(state="ready", proc=Proc()); r2 = ns["_engine_status"]()
    ok(r2.get("engine_kind") == "proven", "the status says which engine runs the model", r2)
    # 4. a copy with no newer engine: nothing changes
    shutil.move(newer, newer + ".away"); del ns["_ENGINE_NEXT_DIR_FOUND"][:]
    ns["_ENGINE_NEXT_FAILED"].clear(); ns["_engine_choice_set"]("newer")
    ok(run("qwen") == "proven" and ns["_engine_choice"]()["newer"]["available"] is False, "a copy built without the newer engine runs everything on the proven one, whatever the choice")
    shutil.move(newer + ".away", newer); del ns["_ENGINE_NEXT_DIR_FOUND"][:]
    # 5. what the page is told
    ns["_engine_choice_set"]("auto"); c = ns["_engine_choice"]()
    ok(c["choice"] == "auto" and c["proven"]["version"] == "llama.cpp b11321" and c["newer"]["version"] == "llama.cpp b12000" and c["newer"]["available"]
       and c["proven"]["kinds"] == 3 and c["newer"]["kinds"] == 5 and c["newer"]["only"] == ["deepseek41", "lfm3"],
       "the page is told both engines' versions, how many kinds each lists, which only the newer one can load, and the choice", c)
    # 6. the self-test on the newer engine
    ns["_ENGINE_USE"]["forced"] = "newer"; r3 = run("qwen"); v = ns["_engine_dir"]()
    ns["_ENGINE_USE"]["forced"] = None
    ok(r3 == "newer" and v == newer, "the self-test can be put on the newer engine (--selftest-engine newer), and the version it reports is the newer one's")
    # 7. the patch: once, in the three apps, after what it wraps; they compile
    for repo in ("Ingenium-Mac-Mini", "Ingenium-Mac-Intel", "Ingenium-HPWindows"):
        src = os.path.join(ROOT, repo, "ingenium_app.py")
        dst = os.path.join(tmp, repo + ".py")
        shutil.copyfile(src, dst)
        out = subprocess.run([sys.executable, PATCH, dst], capture_output=True, text=True)
        again = subprocess.run([sys.executable, PATCH, dst], capture_output=True, text=True)
        s = open(dst, encoding="utf-8").read()
        order = [s.find(x) for x in ("\ndef _engine_launch(", "\ndef _engine_status():", "_engine_launch_one = _engine_launch", "# R74: sharing this computer's models")]
        try:
            py_compile.compile(dst, doraise=True); comp = True
        except Exception as e:
            comp = str(e)[:300]
        ok(out.returncode == 0 and "already patched" in again.stdout and order == sorted(order) and s.count("def engine_choice_set(self, choice):") == 2
           and '_ENGINE_USE["forced"] = arg("--selftest-engine")' in s and comp is True,
           repo + ": the patch applies once, after what it wraps; both bridges offer the choice; the self-test takes --selftest-engine; it compiles", {"out": out.stdout + out.stderr, "order": order, "comp": comp})
    ok(problems == ["engine: the newer engine could not load lfm3.gguf; the proven engine loads it"], "the only problem logged is the fall back itself", problems)
finally:
    shutil.rmtree(tmp, ignore_errors=True)
print("%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
