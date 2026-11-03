#!/usr/bin/env python3
"""The computer's own sign-in as a way back in (Ingenium 6.10.1, build/desktop/app_device_6101.py): the app's side, run here with
its own CODE. On this Linux machine neither Touch ID nor Windows Hello can be asked, so the Mac's path is run against a stand-in
helper (a script that answers as tools/IngeniumKey.swift does), and Windows' path only as far as it can be without Windows.

    python3 -I rig/t_6101_device.py

Checks: a key's name is refused unless it is 4 to 64 letters, digits, hyphens or underscores; the reason given to the computer is
cleaned of anything but plain words; on a Mac the helper is found beside the app's program and its one line of JSON is passed on
(made, read, refused, cancelled, missing); with no helper, a plain word that this copy was built without it; elsewhere, nothing can
be asked; the patch adds the four calls to both of the app's bridges, once, after app_claude_610's, and the app compiles."""
import os, sys, json, shutil, stat, tempfile, importlib.util, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
PATCH = os.path.normpath(os.path.join(HERE, "..", "build", "desktop", "app_device_6101.py"))
PATCH0 = os.path.normpath(os.path.join(HERE, "..", "build", "desktop", "app_claude_610.py"))
APP = os.path.normpath(os.path.join(HERE, "..", "..", "ingenium_app.py"))
passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    print(("PASS " if c else "FAIL ") + m + ("" if c or d is None else "  " + json.dumps(d, default=str)[:400]))
    passed, failed = (passed + 1, failed) if c else (passed, failed + 1)


spec = importlib.util.spec_from_file_location("app_device_6101", PATCH)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
problems = []
import re, base64
ns = {"os": os, "sys": sys, "re": re, "json": json, "base64": base64, "subprocess": subprocess, "log_problem": lambda w, i: problems.append(w),
      "_rag_app_dir": lambda: tmp}
exec(mod.CODE, ns)
tmp = tempfile.mkdtemp(prefix="ing6101-")
try:
    ok(ns["_dev_name"]("ing-abc123_X") == "ing-abc123_X" and ns["_dev_name"]("../etc") is None and ns["_dev_name"]("a b c d") is None and ns["_dev_name"]("abc") is None and ns["_dev_name"]("x" * 65) is None,
       "a key's name: 4 to 64 letters, digits, hyphens or underscores, nothing else")
    r = ns["_dev_reason"]("open Ingenium'; rm -rf / `x` $(y)")
    ok("'" not in r and "`" not in r and "$" not in r and r.startswith("open Ingenium"), "the reason shown by the computer is cleaned of anything but plain words", r)
    # the Mac's path, against a stand-in helper beside a stand-in program
    exe_dir = os.path.join(tmp, "Ingenium.app", "Contents", "MacOS")
    os.makedirs(exe_dir)
    store = os.path.join(tmp, "keychain.json")
    helper = os.path.join(exe_dir, "IngeniumKey")
    open(helper, "w").write("""#!/usr/bin/env python3
import sys, json, os, base64
store = %r
db = json.load(open(store)) if os.path.exists(store) else {}
a = sys.argv[1:]
def out(d): print(json.dumps(d)); sys.exit(0 if d.get("ok") else 1)
if a[0] == "info": out({"ok": True, "kind": "touchid", "label": "Touch ID"})
if a[0] in ("make", "get"):
    if a[2].startswith("cancel"): out({"ok": False, "error": "Cancelled by user.", "cancelled": True})
    if a[0] == "make":
        db[a[1]] = base64.b64encode(os.urandom(32)).decode(); json.dump(db, open(store, "w")); out({"ok": True, "key": db[a[1]]})
    if a[1] not in db: out({"ok": False, "error": "This Mac holds no key for this copy of Ingenium.", "missing": True})
    out({"ok": True, "key": db[a[1]]})
if a[0] == "drop": db.pop(a[1], None); json.dump(db, open(store, "w")); out({"ok": True})
""" % store)
    os.chmod(helper, os.stat(helper).st_mode | stat.S_IXUSR)
    real_exe, real_plat = sys.executable, sys.platform
    sys.executable = os.path.join(exe_dir, "Ingenium")
    sys.platform = "darwin"
    try:
        info = ns["_device_unlock_info"]()
        ok(info == {"ok": True, "kind": "touchid", "label": "Touch ID"}, "on a Mac: the helper beside the app's program says what the Mac can ask", info)
        m = ns["_device_key_make"]("ing-key0001", "turn on opening Ingenium")
        g = ns["_device_key_get"]("ing-key0001", "open Ingenium")
        ok(m["ok"] and g["ok"] and m["key"] == g["key"] and len(base64.b64decode(g["key"])) == 32, "a key made is the key read back, 256 bits", {"m": m.get("ok"), "g": g.get("ok")})
        c = ns["_device_key_get"]("ing-key0001", "cancel please")
        ok(not c["ok"] and c.get("cancelled"), "Touch ID cancelled: said so, nothing given", c)
        x = ns["_device_key_get"]("ing-other01", "open Ingenium")
        ok(not x["ok"] and x.get("missing"), "a key this Mac does not hold: said so", x)
        d = ns["_device_key_drop"]("ing-key0001")
        g2 = ns["_device_key_get"]("ing-key0001", "open Ingenium")
        ok(d["ok"] and not g2["ok"] and g2.get("missing"), "a key dropped is gone", g2)
        bad = ns["_device_key_get"]("../../x", "open Ingenium")
        ok(not bad["ok"] and "not the name of a key" in bad["error"], "a bad name never reaches the helper", bad)
        os.remove(helper)
        nh = ns["_device_key_get"]("ing-key0001", "open Ingenium")
        ok(not nh["ok"] and nh.get("nohelper") and "built without the Touch ID helper" in nh["error"], "with no helper in the app: a plain word that this copy was built without it", nh)
        info2 = ns["_device_unlock_info"]()
        ok(info2["ok"] and info2["kind"] == "none", "and nothing can be asked", info2)
    finally:
        sys.executable, sys.platform = real_exe, real_plat
    sys.platform = "linux"
    try:
        ok(ns["_device_unlock_info"]()["kind"] == "none" and not ns["_device_key_get"]("ing-key0001")["ok"], "on another kind of computer, nothing can be asked")
    finally:
        sys.platform = real_plat
    # the patch on a copy of the app, after app_claude_610
    app = os.path.join(tmp, "ingenium_app.py")
    shutil.copy(APP, app)
    if "_claude_sessions" not in open(app, encoding="utf-8").read():
        subprocess.run([sys.executable, PATCH0, app], check=True, capture_output=True)
    out = subprocess.run([sys.executable, PATCH, app], capture_output=True, text=True)
    s = open(app, encoding="utf-8").read()
    ok(out.returncode == 0 and s.count("def _device_unlock_info():") == 1 and s.count("    def device_key_get(self, name, reason=\"\"):") == 2 and s.count("    def device_unlock_info(self):") == 2,
       "the patch adds the functions once and the four calls to both of the app's bridges", out.stdout + out.stderr)
    out2 = subprocess.run([sys.executable, PATCH, app], capture_output=True, text=True)
    ok("already patched" in out2.stdout, "applied again, it changes nothing")
    comp = subprocess.run([sys.executable, "-m", "py_compile", app], capture_output=True, text=True)
    ok(comp.returncode == 0, "the patched app compiles", comp.stderr[-300:])
    ok(not problems, "nothing was written to the app's log of problems", problems)
finally:
    shutil.rmtree(tmp, ignore_errors=True)
print("%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
