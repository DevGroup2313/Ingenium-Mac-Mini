"""Ingenium 7.28 · Fabrica's runs on her other computers (build/desktop/app_runs_728.py), tested with the real lending server of the
patched computer app, on this machine. The devices are invented ("Test laptop", "Another tablet").
  1. the switch: off, the server answers runs with 403 and says where to turn them on; on, its hello says so and share_status too
  2. a wrong code is refused (401); a device that does not name itself is asked to pair (401)
  3. a whole run sent by a device: its tools; a run made ready (never from this computer's own drive), its file put in, started;
     its record says who sent it; its log as it ran; the file it kept, read back in parts
  4. another device can neither list it nor read it nor stop it
  5. the copy kept on the computer that sent it: the record (with where it ran), its log and its file, read as this computer's own
    python3 rig/t_728_runs_devices.py <ingenium_app.py, patched> <scratch folder>"""
import base64
import importlib.util
import json
import os
import shutil
import sys
import time
import urllib.error
import urllib.request

APP, OUT = sys.argv[1], sys.argv[2]
shutil.rmtree(OUT, ignore_errors=True)
os.makedirs(os.path.join(OUT, "home"))
os.environ["HOME"] = os.path.join(OUT, "home")
os.environ.pop("XDG_DATA_HOME", None)
shutil.copy(APP, os.path.join(OUT, "ingenium_app.py"))
spec = importlib.util.spec_from_file_location("ia", os.path.join(OUT, "ingenium_app.py"))
ia = importlib.util.module_from_spec(spec)
sys.argv = ["x"]
spec.loader.exec_module(ia)
P = F = 0


def ok(c, m, d=None):
    global P, F
    print(("PASS " if c else "FAIL ") + m + ("" if c or d is None else "  " + json.dumps(d, default=str)[:600]))
    if c:
        P += 1
    else:
        F += 1


NO_PROXY = urllib.request.build_opener(urllib.request.ProxyHandler({}))
DEV_A = "id=dtestlaptop01;kind=laptop;name=Test%20laptop"
DEV_B = "id=dothertablet2;kind=tablet;name=Another%20tablet"


def call(method, path, body=None, code=None, dev=DEV_A):
    h = {"Content-Type": "application/json"}
    if code is not None:
        h["Authorization"] = "Bearer " + code
    if dev:
        h["X-Ingenium-Device"] = dev
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request("http://127.0.0.1:%d%s" % (ia._SHARE["port"], path), data=data, headers=h, method=method)
    try:
        with NO_PROXY.open(req, timeout=20) as r:
            return r.status, json.loads(r.read().decode() or "{}")
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read().decode() or "{}")
        except Exception:
            return e.code, {}


# 1. the switch
c = ia._share_cfg()
c["callins"] = True        # the server runs for call-ins, runs still off
ia._share_cfg_save(c)
ia._share_apply()
CODE = ia._share_code()
st, j = call("GET", "/ingenium/runs/tools", code=CODE)
ok(st == 403 and "Run Fabrica's jobs for my devices" in json.dumps(j), "off: the server refuses runs (403) and says where to turn them on", [st, j])
st, h = call("GET", "/ingenium/hello")
ok(st == 200 and h.get("runs") == 0, "off: its hello says it runs no jobs", h.get("runs"))
s = ia._share_runs_set(True)
ok(s.get("runs_on") is True and s.get("running"), "on: share_status says so, and the server runs", {k: s.get(k) for k in ("runs_on", "running", "port")})
st, h = call("GET", "/ingenium/hello")
ok(st == 200 and h.get("runs") == 1, "on: its hello says it runs jobs for her devices", h.get("runs"))

# 2. the code and the device
st, j = call("GET", "/ingenium/runs/tools", code="WRNG-CODE")
ok(st == 401, "a wrong code is refused (401)", st)
st, j = call("GET", "/ingenium/runs/tools", code=CODE, dev=None)
ok(st == 401 and "Pair this device" in json.dumps(j), "a device that does not name itself is asked to pair (401)", [st, j])

# 3. a whole run
st, t = call("GET", "/ingenium/runs/tools", code=CODE)
ok(st == 200 and t.get("ok") and t.get("os") and isinstance(t.get("tools"), list), "its tools: the system and each tool, checked", {"os": t.get("os"), "n": len(t.get("tools") or [])})
job = {"key": "build", "name": "Build", "steps": [
    {"name": "Say hello", "kind": "run", "shell": "bash", "run": "echo hello from the other computer; mkdir -p out; cat note.txt > out/made.txt; echo done >> out/made.txt"},
    {"name": "Keep it", "kind": "artifact", "art": "made", "paths": ["out/made.txt"]}]}
st, n = call("POST", "/ingenium/runs/new", {"spec": {"app": "Tide Clock", "repo": "r1", "version": "abc1234", "workflow": "Build", "why": "by you, by hand", "disk": "should-be-ignored", "n": 1, "jobs": [job]}}, code=CODE)
rid = n.get("id")
ok(st == 200 and n.get("ok") and rid and "src" not in n, "a run made ready on it (its own folders not said)", n)
rec = ia._runs_read(rid)
ok(rec.get("by", {}).get("id") == "dtestlaptop01" and rec.get("by", {}).get("name") == "Test laptop" and rec.get("why", "").startswith("from Test laptop, ") and rec.get("disk") == "",
   "its record says who sent it, and it is never taken from this computer's own drive", {k: rec.get(k) for k in ("by", "why", "disk")})
st, p = call("POST", "/ingenium/runs/put", {"rid": rid, "path": "note.txt", "b64": base64.b64encode(b"a note from the laptop\n").decode()}, code=CODE)
ok(st == 200 and p.get("ok"), "the app's file put in", p)
st, g = call("POST", "/ingenium/runs/go", {"rid": rid}, code=CODE)
ok(st == 200 and g.get("ok"), "started", g)
end = time.time() + 60
run = {}
while time.time() < end:
    st, gg = call("GET", "/ingenium/runs/get?rid=" + rid, code=CODE)
    run = gg.get("run") or {}
    if run.get("state") in ("ok", "bad", "stopped"):
        break
    time.sleep(0.5)
ok(run.get("state") == "ok", "it ran to the end, well", {"state": run.get("state"), "jobs": [(x.get("key"), x.get("state")) for x in run.get("jobs") or []]})
st, lg = call("GET", "/ingenium/runs/log?rid=%s&job=build&offset=0" % rid, code=CODE)
ok(st == 200 and "hello from the other computer" in (lg.get("text") or ""), "its log, as it ran", (lg.get("text") or "")[-300:])
arts = run.get("artifacts") or []
fpath = ((arts[0].get("files") or [{}])[0].get("path") if arts else "") or ""
st, f1 = call("GET", "/ingenium/runs/file?rid=%s&art=made&path=%s&offset=0&size=5" % (rid, fpath), code=CODE)
st2, f2 = call("GET", "/ingenium/runs/file?rid=%s&art=made&path=%s&offset=%d" % (rid, fpath, f1.get("offset", 0)), code=CODE)
got = base64.b64decode(f1.get("b64") or "") + base64.b64decode(f2.get("b64") or "")
ok(st == 200 and st2 == 200 and got == b"a note from the laptop\ndone\n", "the file it kept, read back in parts", {"art": arts[:1], "got": got.decode("utf-8", "replace")})

# 4. another device
st, l2 = call("GET", "/ingenium/runs/list", code=CODE, dev=DEV_B)
st1, l1 = call("GET", "/ingenium/runs/list", code=CODE)
ok(not any(x.get("id") == rid for x in l2.get("runs") or []) and any(x.get("id") == rid for x in l1.get("runs") or []), "the run is listed for the device that sent it, and not for another",
   {"a": [x.get("id") for x in l1.get("runs") or []], "b": [x.get("id") for x in l2.get("runs") or []]})
st, r2 = call("GET", "/ingenium/runs/get?rid=" + rid, code=CODE, dev=DEV_B)
st3, r3 = call("POST", "/ingenium/runs/stop", {"rid": rid}, code=CODE, dev=DEV_B)
ok(st == 404 and st3 == 404, "another device can neither read it nor stop it (404)", [st, st3])

# 5. the copy kept on the computer that sent it (the same functions, called as that computer's page calls them)
kc = ia._runs_keep_copy(run, {"name": "Mac mini", "id": "cmini0001", "kind": "desktop"})
kid = kc.get("id")
ok(kc.get("ok") and kid and kid != rid, "the copy kept: a run of this computer's own already has that name here, so the copy takes its own", kc)
ia._runs_keep_log(kid, "build", lg.get("text") or "")
ia._runs_keep_file(kid, "made", fpath, base64.b64encode(got[:10]).decode())
ia._runs_keep_file(kid, "made", fpath, base64.b64encode(got[10:]).decode(), True)
kg = ia._runs_get(kid).get("run") or {}
kl = ia._runs_log(kid, "build", 0)
kf = ia._runs_file(kid, "made", fpath, 0)
ok(kg.get("remote", {}).get("computer") == "Mac mini" and kg.get("remote", {}).get("rid") == rid and kg.get("state") == "ok", "its record says where it ran", kg.get("remote"))
ok("hello from the other computer" in (kl.get("text") or "") and base64.b64decode(kf.get("b64") or "") == got, "its log and its file, read here as this computer's own", {"log": (kl.get("text") or "")[-80:]})
ok(any(x.get("id") == kid and x.get("remote") for x in ia._runs_list().get("runs") or []), "it is listed here with where it ran")
try:
    ia._runs_keep_file(kid, "made", "../escape.txt", "eA==")
    esc = os.path.exists(os.path.join(ia._runs_dir(), kid, "files", "escape.txt"))
except Exception:
    esc = False
ok(not esc and not os.path.exists(os.path.join(ia._runs_dir(), kid, "escape.txt")), "a file is never kept outside its run's folder")
ia._share_runs_set(False)
c = ia._share_cfg()
c["callins"] = False
ia._share_cfg_save(c)
ia._share_apply()
print("\n%d passed, %d failed" % (P, F))
sys.exit(1 if F else 0)
