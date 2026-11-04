#!/usr/bin/env python3
"""Which engine answered, proved (Ingenium 6.11, build/desktop/app_engine3_6106.py), run here with the app's own code from the three
repositories (patched in a copy) against stand-in engines: folders laid out as a Mac app lays them out (the binaries in Contents/MacOS,
VERSION.txt among Contents/Resources), each binary a small script that answers --version as llama.cpp does, with its own commit.

    python3 -I rig/t_611_engine_proof.py

6.10.5's cloud builds reported the newer engine's self-test as "llama.cpp b11321": the version was read from the proven engine's
resources whatever engine ran. Checks: the info names the running engine's own version and kind (proven by default, newer when the
self-test forces it); the self-test's record carries the binary's own answer to --version; the patch applies once, after the 6.10.5
patch, in the three apps, which still compile."""
import os, sys, json, shutil, tempfile, subprocess, py_compile, importlib.util, stat

HERE = os.path.dirname(os.path.abspath(__file__))
P2 = os.path.normpath(os.path.join(HERE, "..", "build", "desktop", "app_engine2_6105.py"))
P3 = os.path.normpath(os.path.join(HERE, "..", "build", "desktop", "app_engine3_6106.py"))
ROOT = os.path.normpath(os.path.join(HERE, "..", "..", ".."))
passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    print(("PASS " if c else "FAIL ") + m + ("" if c or d is None else "  " + json.dumps(d, default=str)[:600]))
    passed, failed = (passed + 1, failed) if c else (passed, failed + 1)


tmp = tempfile.mkdtemp(prefix="ing611-")
try:
    # 1. the app's own functions, patched in a copy, run against a stand-in Mac app
    src = os.path.join(ROOT, "Ingenium-Mac-Mini", "ingenium_app.py")
    work = os.path.join(tmp, "ingenium_app.py")
    shutil.copyfile(src, work)
    if "_engine_next_dir" not in open(work, encoding="utf-8").read():
        subprocess.run([sys.executable, P2, work], check=True, capture_output=True)
    r = subprocess.run([sys.executable, P3, work], capture_output=True, text=True)
    ok(r.returncode == 0 and "patched" in r.stdout, "the patch applies to the Mac app's code", r.stdout + r.stderr)
    app = os.path.join(tmp, "Ingenium.app", "Contents")
    plat = "macos-arm64"
    for kind, ver, commit in (("engine", "llama.cpp b11321", "b0aca3c"), ("engine-next", "llama.cpp b12000", "68d20b8")):
        d = os.path.join(app, "MacOS", kind, plat)
        os.makedirs(d)
        exe = os.path.join(d, "llama-server")
        open(exe, "w").write("#!/bin/sh\necho 'version: 0.5.0-dev (build 1, commit %s)'\necho 'built with a stand-in for this test'\n" % commit)
        os.chmod(exe, os.stat(exe).st_mode | stat.S_IEXEC)
        res = os.path.join(app, "Resources", kind, plat)
        os.makedirs(res)
        open(os.path.join(res, "VERSION.txt"), "w").write(ver + "\n")
    spec = importlib.util.spec_from_file_location("ingapp611", work)
    mod = importlib.util.module_from_spec(spec)
    sys.argv = [work]
    try:
        spec.loader.exec_module(mod)
        loaded = True
    except SystemExit:
        loaded = True
    except Exception as e:
        loaded = str(e)[:300]
    ok(loaded is True, "the patched app's code loads as a module", loaded)
    if loaded is True:
        mod._app_roots = lambda: [os.path.join(app, "MacOS"), os.path.join(app, "Resources")]
        mod._engine_platform = lambda: plat
        mod._mac_too_old = lambda: None
        mod._engine_devices = lambda d: []
        mod._engine_gpu = lambda d: ""
        mod._read_device_info = lambda: {}
        del mod._ENGINE_DIR_FOUND[:]
        del mod._ENGINE_NEXT_DIR_FOUND[:]
        mod._ENGINE_USE["forced"] = None
        i1 = mod._engine_info()
        ok(i1.get("version") == "llama.cpp b11321" and i1.get("engine_kind") == "proven", "by default the info names the proven engine, its own version", i1)
        mod._ENGINE_USE["forced"] = "newer"
        i2 = mod._engine_info()
        ok(i2.get("version") == "llama.cpp b12000" and i2.get("engine_kind") == "newer",
           "with the self-test on the newer engine, the info names the newer engine and its own version (6.10.5 said b11321 here)", i2)
        b2 = mod._engine_build_of(mod._engine_dir())
        mod._ENGINE_USE["forced"] = None
        b1 = mod._engine_build_of(mod._engine_dir())
        ok("commit 68d20b8" in b2 and "commit b0aca3c" in b1, "each binary's own answer to --version is read: the newer one's commit, then the proven one's", {"newer": b2, "proven": b1})
    # 2. the patch: once, after the 6.10.5 patch, in the three apps; the self-test records the binary's word; they compile
    for repo in ("Ingenium-Mac-Mini", "Ingenium-Mac-Intel", "Ingenium-HPWindows"):
        dst = os.path.join(tmp, repo + ".py")
        shutil.copyfile(os.path.join(ROOT, repo, "ingenium_app.py"), dst)
        if "_engine_next_dir" not in open(dst, encoding="utf-8").read():
            subprocess.run([sys.executable, P2, dst], check=True, capture_output=True)
        out = subprocess.run([sys.executable, P3, dst], capture_output=True, text=True)
        again = subprocess.run([sys.executable, P3, dst], capture_output=True, text=True)
        s = open(dst, encoding="utf-8").read()
        order = [s.find(x) for x in ("\ndef _engine_info():", "\ndef _engine_next_dir():", "_engine_info_one = _engine_info", "# R74: sharing this computer's models")]
        try:
            py_compile.compile(dst, doraise=True)
            comp = True
        except Exception as e:
            comp = str(e)[:300]
        ok(out.returncode == 0 and "already patched" in again.stdout and order == sorted(order) and s.count('res["engine"]["build"] = _engine_build_of(_engine_dir())') == 1 and comp is True,
           repo + ": the patch applies once, after what it wraps; the self-test records the binary's own word; it compiles", {"out": out.stdout + out.stderr, "order": order, "comp": comp})
finally:
    shutil.rmtree(tmp, ignore_errors=True)
print("%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
