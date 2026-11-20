"""Ingenium 7.49 · sealed on the computer's disk (build/desktop/app_disk_749.py), tested on a copy of the real computer app, on this machine.
An invented app (Tide Clock), an invented device and a random key stand in for hers.
  1. without the key, nothing changes: an app waiting for a device is written plain
  2. with the key held: Seal them now seals it; a new one is written sealed; a device asking for it gets the page whole
  3. a run: its log and its file plain while it runs, sealed when it ends, read back whole and in parts (across chunks of 1 MiB)
  4. the key dropped (Ingenium locked): the log, the file and the waiting app cannot be read, and the device is told so (423)
  5. a sealed file changed by one byte, or opened with another key, is refused
  6. a copy of a run made elsewhere, added to after it was sealed, reads whole
  7. Open everything again (her sign-in turned off): every file plain, as before
    python3 rig/t_749_disk_app.py <ingenium_app.py, patched> <scratch folder>"""
import base64
import hashlib
import importlib.util
import json
import os
import shutil
import sys
import time

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
    print(("PASS " if c else "FAIL ") + m + ("" if c or d is None else "  " + json.dumps(d, default=str)[:500]))
    if c:
        P += 1
    else:
        F += 1


class Req:
    """a device's request, as the lending server's handler receives it"""
    def __init__(self, path, dev="id=dtesttablet1;kind=tablet;name=Test%20tablet"):
        self.path, self.headers, self.out = path, {"X-Ingenium-Device": dev}, None

    def _json(self, code, obj):
        self.out = (code, obj)

    def _err(self, code, msg):
        self.out = (code, {"error": msg})


def sealed(path):
    with open(path, "rb") as fh:
        return fh.read(8) == b"INGSEAL1"


KEY = os.urandom(32)
KID = hashlib.sha256(KEY).hexdigest()[:16]
PAGE = b"<!doctype html><title>Tide Clock</title><h1>Tide Clock</h1><p>TIDE-MARK-0451</p>"

# 1. no key
r = ia._apps_send("tide-clock", "Tide Clock", "1.0", base64.b64encode(PAGE).decode(), [])
aid = r.get("id")
f_out = os.path.join(ia._apps_dir("outbox"), aid + ".html")
ok(r.get("ok") and not sealed(f_out), "without the key an app waiting for a device is written as before (plain)", r)
st = (ia._disk_seal_status() if hasattr(ia, '_disk_seal_status') else ia._disk_status())
ok(st.get("held") is False and st.get("lib") is True, "the status: no key held; the encryption library is there", st)

# 2. the key held
st = ia._disk_key_hold(base64.b64encode(KEY).decode(), KID)
ok(st.get("held") is True and st.get("kid") == KID, "the key is held (in memory only)", st)
time.sleep(0.5)                                      # holding the key starts a sweep of what was written before
now = ia._disk_seal_now()
ok(now.get("ok") and sealed(f_out) and PAGE not in open(f_out, "rb").read(), "Seal them now: the waiting app is sealed on the disk; its words are not there", now)
r2 = ia._apps_send("tide-clock", "Tide Clock", "1.1", base64.b64encode(PAGE + b"<p>v1.1</p>").decode(), [])
f_out = os.path.join(ia._apps_dir("outbox"), r2["id"] + ".html")
ok(sealed(f_out), "an app sent while the key is held is written sealed")
q = Req("/ingenium/apps/get?id=" + r2["id"])
ia._apps_dev_get(q, "/ingenium/apps/get")
got = base64.b64decode((q.out or (0, {}))[1].get("b64") or "")
ok(q.out and q.out[0] == 200 and got == PAGE + b"<p>v1.1</p>", "a device asking for it gets the page whole", q.out and q.out[0])

# 3. a run, sealed when it ends
big = os.urandom(2600000)                            # more than two chunks of 1 MiB
job = {"key": "build", "name": "Build", "steps": [
    {"name": "Say", "kind": "run", "shell": "bash", "run": "echo RUN-MARK-7781 from the tide clock; mkdir -p out; cp big.bin out/big.bin"},
    {"name": "Keep", "kind": "artifact", "art": "made", "paths": ["out/big.bin"]}]}
n = ia._runs_new({"app": "Tide Clock", "repo": "r1", "version": "abc1234", "workflow": "Build", "why": "by hand", "disk": "", "n": 1, "jobs": [job]})
rid = n.get("id")
ia._runs_put(rid, "big.bin", base64.b64encode(big).decode(), None, False)
ia._runs_go(rid)
end = time.time() + 60
while time.time() < end and ia._runs_read(rid).get("state") not in ("ok", "bad", "stopped"):
    time.sleep(0.3)
end = time.time() + 15                           # the worker seals once the run's record says it ended
while time.time() < end and not os.path.isfile(os.path.join(ia._runs_dir(), rid, "logs", "build.log.sealed-check")):
    lf = os.path.join(ia._runs_dir(), rid, "logs", "build.log")
    if os.path.isfile(lf) and sealed(lf):
        break
    time.sleep(0.3)
time.sleep(0.5)
rec = ia._runs_read(rid)
d = os.path.join(ia._runs_dir(), rid)
logf = os.path.join(d, "logs", "build.log")
files = [os.path.join(r_, x) for r_, _ds, xs in os.walk(os.path.join(d, "files")) for x in xs]
ok(rec.get("state") == "ok" and os.path.isfile(logf) and files, "the run ran to its end and kept its file", {"state": rec.get("state"), "files": len(files)})
ok(sealed(logf) and all(sealed(x) for x in files), "when it ended, its log and its kept file were sealed on the disk")
ok(b"RUN-MARK-7781" not in open(logf, "rb").read(), "the log's words are not on the disk")
lg = ia._runs_log(rid, "build", 0)
ok(lg.get("ok") and "RUN-MARK-7781" in lg.get("text", "") and lg.get("size") == len(lg.get("text", "").encode()), "its log read back whole, with its true size", {"size": lg.get("size")})
art = rec.get("artifacts") or []
fp = ((art[0].get("files") or [{}])[0].get("path") if art else "") or ""
parts, off = [], 0
while True:
    x = ia._runs_file(rid, "made", fp, off, 700000)
    if not x.get("ok"):
        break
    b = base64.b64decode(x.get("b64") or "")
    if not b:
        break
    parts.append(b)
    off = x["offset"]
    if off >= x["size"]:
        break
whole = b"".join(parts)
ok(whole == big, "the kept file read back in parts across its chunks, byte for byte (2.6 MB)", {"got": len(whole), "want": len(big)})
mid = ia._runs_file(rid, "made", fp, 1048570, 20)
ok(base64.b64decode(mid.get("b64") or "") == big[1048570:1048590], "a part that straddles two chunks reads right")

# 4. the key dropped
ia._disk_key_drop()
lg2 = ia._runs_log(rid, "build", 0)
fl2 = ia._runs_file(rid, "made", fp, 0, 10)
ok(not lg2.get("ok") and lg2.get("locked") and not fl2.get("ok") and fl2.get("locked"), "locked: the log and the file cannot be read, and say why", lg2)
q = Req("/ingenium/apps/get?id=" + r2["id"])
ia._apps_dev_get(q, "/ingenium/apps/get")
ok(q.out and q.out[0] == 423 and "locked" in json.dumps(q.out[1]).lower(), "locked: a device asking for the waiting app is told the computer is locked (423)", q.out)

# 5. tampering, another key
ia._disk_key_hold(base64.b64encode(KEY).decode(), KID)
with open(logf, "r+b") as fh:
    fh.seek(40)
    c = fh.read(1)
    fh.seek(40)
    fh.write(bytes([c[0] ^ 1]))
lg3 = ia._runs_log(rid, "build", 0)
ok(not lg3.get("ok"), "a sealed log changed by one byte is refused", lg3)
other = os.urandom(32)
ia._disk_key_hold(base64.b64encode(other).decode(), hashlib.sha256(other).hexdigest()[:16])
fl3 = ia._runs_file(rid, "made", fp, 0, 10)
ok(not fl3.get("ok"), "opened with another key (another sign-in), it is refused", fl3)
ia._disk_key_hold(base64.b64encode(KEY).decode(), KID)

# 6. a copy made elsewhere, added to after sealing
kc = ia._runs_keep_copy({"id": "far1", "state": "ok", "app": "Tide Clock", "jobs": []}, {"name": "Mac mini", "id": "cmini", "kind": "desktop"})
kid2 = kc.get("id")
ia._runs_keep_file(kid2, "made", "a.bin", base64.b64encode(b"FIRST-").decode())
kf = os.path.join(ia._runs_dir(), kid2, "files", "made", "a.bin")
ia._disk_seal_now()
was = sealed(kf)
ia._runs_keep_file(kid2, "made", "a.bin", base64.b64encode(b"SECOND").decode(), True)
rb = base64.b64decode(ia._runs_file(kid2, "made", "a.bin", 0).get("b64") or "")
ok(was and sealed(kf) and rb == b"FIRST-SECOND", "a copy from another computer, added to after it was sealed, stays sealed and reads whole", {"was": was, "got": rb})

# 7. open everything again
un = ia._disk_unseal_all()
ok(un.get("ok") and not sealed(f_out) and not sealed(kf) and all(not sealed(x) for x in files), "Open everything again: every file plain, as before", {k: un.get(k) for k in ("opened", "sealed", "files")})
ok(open(f_out, "rb").read() == PAGE + b"<p>v1.1</p>", "and the page is the same, byte for byte")
ia._disk_key_drop()
print("\n%d passed, %d failed" % (P, F))
sys.exit(1 if F else 0)
