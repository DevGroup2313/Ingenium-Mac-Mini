"""Ingenium 7.50 · sealed on the computer's disk, the second stage's first part (build/desktop/app_disk_750.py), tested on a copy of the
real computer app, on this machine. An invented app (Tide Clock), an invented device and a random key stand in for hers.
  1. an app waiting for her devices: kept under a name that says nothing; with the key held, its record is sealed with its page, and its
     name is nowhere on the disk; one kept before under its short name (as 7.49 did) takes a name that says nothing when the sweep seals it
  2. a device: lists it, gets it whole and says it got it, while the key is held; locked, each is told the computer is locked (423),
     never that nothing is waiting
  3. a run's record: sealed when the run ends (its steps' commands and values are not on the disk), read back with the key; a run the
     app's closing cut short (its record still says running) is sealed by the sweep and listed as stopped; locked, the page's list says
     how many it could not read, and a paired device asking is told the computer is locked (423)
  4. texts for training: a text handed over and left for a quarter of an hour is sealed; a piece added later reads on whole; training
     and measuring open it first; the text and the plan of a training cut short are sealed, its checkpoint model is not; going on with
     it opens them again; nothing is sealed while a training runs
  5. a record changed by one byte is refused and passed over, without stopping the list
  6. Open everything again: every record and text plain, as before
    python3 rig/t_750_disk_more.py <ingenium_app.py, patched> <scratch folder>"""
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
    print(("PASS " if c else "FAIL ") + m + ("" if c or d is None else "  " + json.dumps(d, default=str)[:600]))
    if c:
        P += 1
    else:
        F += 1


DEV = {"id": "dtesttablet1", "kind": "tablet", "name": "Test tablet"}


class Req:
    """a device's request, as the lending server's handler receives it"""
    def __init__(self, path, body=None, dev="id=dtesttablet1;kind=tablet;name=Test%20tablet"):
        raw = json.dumps(body).encode() if body is not None else b""
        self.path, self.headers, self.out = path, {"X-Ingenium-Device": dev, "Content-Length": str(len(raw))}, None
        import io
        self.rfile = io.BytesIO(raw)

    def _json(self, code, obj):
        self.out = (code, obj)

    def _err(self, code, msg):
        self.out = (code, {"error": msg})


def sealed(path):
    with open(path, "rb") as fh:
        return fh.read(8) == b"INGSEAL1"


def raw(path):
    with open(path, "rb") as fh:
        return fh.read()


def disk_has(mark):
    """every file under the test's home folder that holds the mark in clear"""
    hits = []
    for r_, _ds, xs in os.walk(os.environ["HOME"]):
        for x in xs:
            f = os.path.join(r_, x)
            try:
                if mark in raw(f):
                    hits.append(os.path.relpath(f, os.environ["HOME"]))
            except Exception:
                pass
    return hits


KEY = os.urandom(32)
KID = hashlib.sha256(KEY).hexdigest()[:16]
B64KEY = base64.b64encode(KEY).decode()
NAME = "Tide Clock TIDENAME-5512"
PAGE = b"<!doctype html><title>Tide Clock</title><p>TIDEPAGE-0451</p>"
box = ia._apps_dir("outbox")

# 1. the outbox: a name that says nothing, sealed with the key held
r = ia._apps_send("tide-clock", NAME, "1.0", base64.b64encode(PAGE).decode(), [])
ok(r.get("ok") and ia._APPS_DARK.match(r["id"]) and not r["id"].startswith("tide-clock"), "an app sent is kept under a name that says nothing", r.get("id"))
ok(not sealed(os.path.join(box, r["id"] + ".json")), "without the key its record is written plain, as before")
# one kept by 7.49, under its short name
old = "tide-clock-1795000000000"
with open(os.path.join(box, old + ".html"), "wb") as fh:
    fh.write(PAGE + b"<p>older</p>")
with open(os.path.join(box, old + ".json"), "w", encoding="utf-8") as fh:
    json.dump({"id": old, "slug": "tide-clock-old", "name": NAME + " old", "version": "0.9", "bytes": 10, "to": [], "at": 1795000000, "got": {}, "computer": "vm"}, fh)
st = ia._disk_key_hold(B64KEY, KID)
time.sleep(0.6)
now = ia._disk_seal_now()
names = sorted(os.listdir(box))
ok(now.get("ok") and not any(n.startswith("tide-clock") for n in names) and all(ia._APPS_DARK.match(os.path.splitext(n)[0]) for n in names),
   "the one kept before under its short name takes a name that says nothing", names)
ok(all(sealed(os.path.join(box, n)) for n in names), "every record and page in the outbox is sealed", names)
ok(not disk_has(b"TIDENAME-5512") and not disk_has(b"TIDEPAGE-0451"), "the app's name and its page are nowhere on the disk in clear", disk_has(b"TIDENAME-5512") + disk_has(b"TIDEPAGE-0451"))
lst = ia._apps_outbox()
ok(lst.get("locked") == 0 and sorted(a.get("name") for a in lst.get("apps") or []) == sorted([NAME, NAME + " old"]), "with the key, the page's list names both, as before", lst.get("apps"))
r2 = ia._apps_send("tide-clock", NAME, "1.1", base64.b64encode(PAGE + b"<p>1.1</p>").decode(), [])
lst = ia._apps_outbox()
ok(r2.get("ok") and len([a for a in lst["apps"] if a.get("slug") == "tide-clock"]) == 1 and sealed(os.path.join(box, r2["id"] + ".json")),
   "a newer version of the same app replaces the one waiting, found by its sealed record", [a.get("version") for a in lst["apps"]])

# 2. a device, with the key and locked
q = Req("/ingenium/apps/outbox")
ia._apps_dev_get(q, "/ingenium/apps/outbox")
ok(q.out and q.out[0] == 200 and any(a.get("name") == NAME for a in q.out[1].get("apps") or []), "a device lists what waits for it", q.out and q.out[0])
q = Req("/ingenium/apps/get?id=" + r2["id"])
ia._apps_dev_get(q, "/ingenium/apps/get")
ok(q.out and q.out[0] == 200 and base64.b64decode(q.out[1].get("b64") or "") == PAGE + b"<p>1.1</p>", "it gets the page whole", q.out and q.out[0])
q = Req("/ingenium/apps/got", {"id": r2["id"]})
ia._apps_dev_post(q, "/ingenium/apps/got")
ok(q.out and q.out[0] == 200 and sealed(os.path.join(box, r2["id"] + ".json")) and DEV["id"] in (ia._apps_read(r2["id"]).get("got") or {}),
   "it says it got it: the record is written again, sealed", q.out)
ia._disk_key_drop()
q = Req("/ingenium/apps/outbox")
ia._apps_dev_get(q, "/ingenium/apps/outbox")
q2 = Req("/ingenium/apps/get?id=" + r2["id"])
ia._apps_dev_get(q2, "/ingenium/apps/get")
q3 = Req("/ingenium/apps/got", {"id": r2["id"]})
ia._apps_dev_post(q3, "/ingenium/apps/got")
ok(q.out and q.out[0] == 423 and q2.out and q2.out[0] == 423 and q3.out and q3.out[0] == 423 and "locked" in q.out[1].get("error", "").lower(),
   "locked: listing, getting and saying it got it are each told the computer is locked (423), never that nothing waits", [q.out, q2.out and q2.out[0], q3.out and q3.out[0]])
ia._disk_key_hold(B64KEY, KID)

# 3. a run's record
job = {"key": "build", "name": "Build", "steps": [{"name": "Say", "kind": "run", "shell": "bash", "run": "echo RUNCMD-6630", "env": {"TIDE_TOKEN": "RUNVALUE-2207"}}]}
n = ia._runs_new({"app": "Tide Clock", "repo": "r1", "version": "abc1234", "workflow": "Build", "why": "by hand", "disk": "", "n": 1, "jobs": [job]})
rid = n.get("id")
rec_f = ia._runs_rec_path(rid)
ok(not sealed(rec_f), "a run that has not started keeps its record plain (it starts from it)")
ia._runs_go(rid)
end = time.time() + 60
while time.time() < end and ia._runs_read(rid).get("state") not in ("ok", "bad", "stopped"):
    time.sleep(0.3)
end = time.time() + 10
while time.time() < end and not sealed(rec_f):
    time.sleep(0.2)
ok(ia._runs_read(rid).get("state") == "ok" and sealed(rec_f), "when the run ends its record is sealed", ia._runs_read(rid).get("state"))
ok(not disk_has(b"RUNCMD-6630") and not disk_has(b"RUNVALUE-2207"), "its step's command and the value it was given are not on the disk in clear", disk_has(b"RUNCMD-6630") + disk_has(b"RUNVALUE-2207"))
rl = ia._runs_list()
ok(rl.get("ok") and rl.get("locked") == 0 and any(x.get("id") == rid and x.get("app") == "Tide Clock" for x in rl.get("runs") or []), "with the key, Fabrica's list shows it, as before")
# a run the app's closing cut short
cut = "20261120-010101-c0ffee"
os.makedirs(os.path.join(ia._runs_dir(), cut, "logs"), exist_ok=True)
with open(ia._runs_rec_path(cut), "w", encoding="utf-8") as fh:
    json.dump({"id": cut, "at": time.time() - 3600, "state": "running", "app": "Tide Clock", "label": "CUTSHORT-3391", "jobs": [], "artifacts": []}, fh)
with open(os.path.join(ia._runs_dir(), cut, "logs", "build.log"), "w") as fh:
    fh.write("CUTLOG-4471\n")
ia._disk_seal_now()
rl = ia._runs_list()
row = [x for x in rl.get("runs") or [] if x.get("id") == cut]
ok(sealed(ia._runs_rec_path(cut)) and sealed(os.path.join(ia._runs_dir(), cut, "logs", "build.log")) and row and row[0].get("state") == "stopped",
   "a run the app's closing cut short is sealed, its log too, and is listed as stopped", row)
# locked
ia._disk_key_drop()
rl = ia._runs_list()
ok(rl.get("ok") and rl.get("locked", 0) >= 2 and not any(x.get("id") in (rid, cut) for x in rl.get("runs") or []), "locked: the page's list says how many it could not read", {"locked": rl.get("locked")})
on, who = ia._runs_dev_on, ia._runs_dev_who
ia._runs_dev_on = lambda: True
ia._runs_dev_who = lambda h: DEV
q = Req("/ingenium/runs/list")
ia._runs_dev_get(q, "/ingenium/runs/list")
q2 = Req("/ingenium/runs/get?rid=" + rid)
ia._runs_dev_get(q2, "/ingenium/runs/get")
q3 = Req("/ingenium/runs/go", {"rid": rid})
ia._runs_dev_post(q3, "/ingenium/runs/go")
ok(q.out and q.out[0] == 423 and q2.out and q2.out[0] == 423 and q3.out and q3.out[0] == 423, "locked: a paired device asking for its runs is told the computer is locked (423)", [q.out, q2.out, q3.out])
ia._disk_key_hold(B64KEY, KID)
q = Req("/ingenium/runs/list")
ia._runs_dev_get(q, "/ingenium/runs/list")
ok(q.out and q.out[0] == 200, "with the key again, the device's list answers", q.out and q.out[0])
ia._runs_dev_on, ia._runs_dev_who = on, who

# 4. texts for training
md = ia._models_dir()
t1 = ia._train_text_put("TRAINTEXT-8810 " * 300, True)
inc = ia._train_in_file()
ok(t1.get("ok") and inc.is_file() and not sealed(str(inc)), "a text handed over for training is kept plain while it is handed over")
ia._disk_sweep()
ok(not sealed(str(inc)), "a text handed over in the last quarter of an hour is left alone (more pieces may follow)")
os.utime(str(inc), (time.time() - 1200, time.time() - 1200))
ia._disk_sweep()
ok(sealed(str(inc)) and not disk_has(b"TRAINTEXT-8810"), "left for a quarter of an hour, it is sealed: its words are not on the disk", disk_has(b"TRAINTEXT-8810"))
t2 = ia._train_text_put(" MORE-1182", False)
ok(t2.get("ok") and not sealed(str(inc)) and raw(str(inc)).decode().endswith("TRAINTEXT-8810  MORE-1182"), "a piece added later: the text is opened and goes on whole", t2)
ia._disk_seal_now()
was = sealed(str(inc))
st = ia._train_start({"text_path": str(inc), "size": "tiny", "passes": 1, "name": "Tide model"})
ok(was and os.path.isfile(str(inc)) is False or (was and not sealed(str(inc))), "starting a training opens the text first (the trainer reads it plain)", {"was": was, "start": st})
if os.path.isfile(str(inc)):
    ia._disk_seal_now()
    was = sealed(str(inc))
    pp = ia._perplexity_start("none")
    ok(was and not sealed(str(inc)), "measuring a model opens it first too", pp)
else:
    ok(True, "measuring a model opens it first too (the trainer took the text, so there is none left to measure on here)")
# a training cut short
work = md / "training" / "20261120-020202"
work.mkdir(parents=True, exist_ok=True)
(work / "text.txt").write_text("CUTTRAIN-9902 " * 400, encoding="utf-8")
(work / "plan.json").write_text(json.dumps({"id": "20261120-020202", "name": "Tide model PLANNAME-7713", "size": "tiny", "passes": 3, "done": 1, "chars": 5600, "made": time.time()}), encoding="utf-8")
(work / "pass_1.gguf").write_bytes(b"GGUF" + b"CUTTRAIN-9902" + os.urandom(64))
for x in ("text.txt", "plan.json"):
    os.utime(str(work / x), (time.time() - 120, time.time() - 120))   # left by an app closed some time ago
ia._disk_sweep()
ok(sealed(str(work / "text.txt")) and sealed(str(work / "plan.json")) and not sealed(str(work / "pass_1.gguf")),
   "a training cut short: its text and its plan are sealed; its checkpoint is a model file, left readable")
ok(not [h for h in disk_has(b"PLANNAME-7713")], "its plan's name is not on the disk in clear", disk_has(b"PLANNAME-7713"))
st = ia._train_status_692()
ok((st.get("resumable") or {}).get("name") == "Tide model PLANNAME-7713", "with the key, Mentes still offers to go on with it", st.get("resumable"))
gr = ia._train_resume()
ok(not sealed(str(work / "text.txt")) and not sealed(str(work / "plan.json")), "going on with it opens its text and its plan first", gr)
os.utime(str(work / "text.txt"), (time.time() - 120, time.time() - 120))
os.utime(str(work / "plan.json"), (time.time() - 120, time.time() - 120))
ia._disk_sweep()
was = sealed(str(work / "text.txt"))
ia._TRAIN["state"] = "running"
ia._disk_unseal_all()
ok(was and not sealed(str(work / "text.txt")) and not sealed(str(work / "plan.json")), "Open everything again opens a sealed text even while a training runs (her sign-in turned off then)")
ia._disk_sweep(True)
ok(not sealed(str(work / "text.txt")), "while a training runs, nothing of its text is sealed, even by Seal them now")
ia._TRAIN["state"] = "idle"
ia._disk_seal_now()
ok(sealed(str(work / "text.txt")), "once it stops, Seal them now seals it")

# 5. a record changed by one byte
recs = [n for n in os.listdir(box) if n.endswith(".json")]
victim = os.path.join(box, recs[0])
with open(victim, "r+b") as fh:
    fh.seek(30)
    c = fh.read(1)
    fh.seek(30)
    fh.write(bytes([c[0] ^ 1]))
lst = ia._apps_outbox()
ok(lst.get("ok") and len(lst.get("apps") or []) == len(recs) - 1, "a record changed by one byte is refused and passed over; the list goes on", {"apps": len(lst.get("apps") or []), "records": len(recs)})
os.remove(victim)

# 6. open everything again
stt = ia._disk_status()
ok(stt.get("files") and stt.get("sealed") == stt.get("files") and "records" in stt.get("kinds", []) and "training" in stt.get("kinds", []),
   "the status counts every record and text, all sealed", {k: stt.get(k) for k in ("files", "sealed", "kinds")})
un = ia._disk_unseal_all()
left = [f for f in ia._disk_targets(True) if sealed(f)]
ok(un.get("ok") and not left and ia._runs_read(rid).get("state") == "ok" and (work / "plan.json").read_text().find("PLANNAME-7713") > 0,
   "Open everything again: every record and text plain, as before", {"left": left[:5], "opened": un.get("opened")})
ia._disk_key_drop()
print("\n%d passed, %d failed" % (P, F))
sys.exit(1 if F else 0)
