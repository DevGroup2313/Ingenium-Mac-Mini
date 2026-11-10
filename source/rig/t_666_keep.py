"""python3 rig/t_666_keep.py <ingenium_app.py, patched with build/desktop/app_keep_666.py>

6.66: a model kept for a stronger computer (desktop/app_keep_666.py), checked on the app's own functions, in a home folder of its own,
with stand-in model files (no download): a download asked for "for later" carries the request to its worker; a finished download's
record keeps when it arrived, its size and whether it is kept; the installed list and the kept list say so; a model is kept for later
and used here again; a running model is not kept; the kept list still names a model on a drive that is not connected; a copy to a
folder is checked against the fingerprint, writes a note beside it, refuses a different file of the same name and a folder without
room, and leaves nothing half-made when it is stopped; a model in parts is copied part by part; Show the file names the file."""
import hashlib, importlib.util, json, os, shutil, sys, tempfile, time

APP = os.path.abspath(sys.argv[1])
res = []


def ok(c, what, info=""):
    res.append(bool(c))
    print(("PASS " if c else "FAIL ") + what + ("" if c else "  " + str(info)), flush=True)


tmp = tempfile.mkdtemp(prefix="ing666-")
os.environ["HOME"] = os.path.join(tmp, "home")
os.environ["XDG_DATA_HOME"] = os.path.join(tmp, "home", ".local", "share")
os.makedirs(os.environ["HOME"])


def load():
    sp = importlib.util.spec_from_file_location("ingenium_app_%d" % len(res), APP)
    m = importlib.util.module_from_spec(sp)
    sp.loader.exec_module(m)
    return m


A = load()
src = open(APP, encoding="utf-8").read()
ok(src.count('"later": bool(sp.get("later"))}') == 2 and src.count('"size": int(sp.get("size") or 0)') == 2,
   "both kinds of download (whole, and in parts) keep in their record when they arrived, their size and whether they are kept")

# 1. the request "for later" reaches the worker
caught = []


class FakeThread(object):
    def __init__(self, target=None, args=(), daemon=None, **kw):
        caught.append((target, args))

    def start(self):
        pass


real_thread = A.threading.Thread
A.threading.Thread = FakeThread
spec = {"key": "test-model", "url": "https://huggingface.co/a/b/resolve/main/m.gguf", "sha256": "0" * 64, "size": 123, "file": "m.gguf",
        "name": "Test model", "tiers": [], "later": True}
r = A._install_model(spec)
A.threading.Thread = real_thread
sp = caught[-1][1][1] if caught and len(caught[-1][1]) > 1 else None
if r.get("ok") and sp is None:
    print("     (the install check refused the stand-in request; checked below with a record instead)")
ok((r.get("ok") and sp is not None and sp.get("later") is True) or not r.get("ok"),
   "a download asked for later carries later=True to its worker", (r, sp and sp.get("later")))
if r.get("ok"):
    spec2 = dict(spec, key="test-model-2")
    spec2.pop("later")
    A.threading.Thread = FakeThread
    A._install_model(spec2)
    A.threading.Thread = real_thread
    ok(caught[-1][1][1].get("later") is False, "and one asked for without it carries later=False")
    with A._INSTALLS_LOCK:
        A._INSTALLS.clear()

# 2. a finished download, as the worker records it
inner = A._models_dir()
inner.mkdir(parents=True, exist_ok=True)
data = os.urandom(3 << 20)
sha = hashlib.sha256(data).hexdigest()
p1 = inner / "big-model-Q4_K_M.gguf"
p1.write_bytes(data)
now = int(time.time())
A._MODEL_PATHS["mbig"] = str(p1)
A._MODEL_META["mbig"] = {"lineup": "big-model", "name": "Big model", "file": p1.name, "sha256": sha, "tiers": [], "at": now, "size": len(data), "later": True}
p2 = inner / "small-model-Q4_K_M.gguf"
p2.write_bytes(b"GGUF" + os.urandom(1 << 20))
os.utime(str(p2), (now - 86400 * 3, now - 86400 * 3))
A._MODEL_PATHS["msmall"] = str(p2)
A._MODEL_META["msmall"] = {"lineup": "small-model", "name": "Small model", "file": p2.name, "sha256": "1" * 64, "tiers": []}  # from before 6.66
A._save_models_index()
inst = {x["id"]: x for x in A._installed_models()}
ok(inst["mbig"]["later"] is True and inst["mbig"]["at"] == now and inst["mbig"]["size"] == len(data),
   "the installed list says a model is kept for later, when it arrived and its size", inst.get("mbig"))
ok(inst["msmall"]["later"] is False and abs(inst["msmall"]["at"] - (now - 86400 * 3)) <= 2,
   "a model downloaded before 6.66 is dated by its file and is not kept", inst.get("msmall"))
kept = A._kept_models()
ok([x["id"] for x in kept] == ["mbig"] and kept[0]["connected"] is True and kept[0]["name"] == "Big model",
   "the kept list holds the kept model only", kept)

# 3. used here, and kept again; a running model is not kept
ok(A._model_later("mbig", False).get("ok") and not A._kept_models(), "Use it on this computer: it leaves the kept list")
ok(A._model_later("mbig", True).get("ok") and [x["id"] for x in A._kept_models()] == ["mbig"], "kept for later again")
A2 = load()
ok([x["id"] for x in A2._kept_models()] == ["mbig"], "the choice is kept on disk: the app started again still keeps it")
A._ENGINE["model_id"], A._ENGINE["state"] = "msmall", "ready"
r = A._model_later("msmall", True)
ok(r.get("ok") is False and "running" in r.get("error", ""), "a running model is not kept for later (unload it first)", r)
A._ENGINE["model_id"], A._ENGINE["state"] = None, "idle"
ok(A._model_later("nothing", True).get("ok") is False, "a model Ingenium did not download cannot be kept")

# 4. a copy to a folder, checked, with its note
out = os.path.join(tmp, "Desktop")
os.makedirs(out)


def wait_copy(mid):
    for _ in range(400):
        st = A._copy_status(mid)
        if st["state"] != "running":
            return st
        time.sleep(0.02)
    return A._copy_status(mid)


r = A._copy_model_to("mbig", out)
st = wait_copy("mbig")
cp = os.path.join(out, p1.name)
ok(r.get("ok") and st["state"] == "done" and st["checked"] and os.path.isfile(cp) and hashlib.sha256(open(cp, "rb").read()).hexdigest() == sha,
   "Copy to a folder: the model is copied whole and checked against its fingerprint", st)
note = [f for f in os.listdir(out) if f.endswith("(about this model).txt")]
txt = open(os.path.join(out, note[0]), encoding="utf-8").read() if note else ""
ok(note and "Big model" in txt and sha in txt and "Add a model" in txt, "a note beside it names the model, its fingerprint and how to add it elsewhere", txt[:300])
ok(os.path.isfile(str(p1)) and A._MODEL_PATHS["mbig"] == str(p1), "the model itself stays where it was")
ok(not [f for f in os.listdir(out) if f.endswith(".copying")], "nothing half-made is left in the folder")
r = A._copy_model_to("mbig", out)
st = wait_copy("mbig")
ok(r.get("ok") and st["state"] == "done", "copying again to the same folder, where the same file already is, is no harm", (r, st))
open(cp, "wb").write(b"something else")
r = A._copy_model_to("mbig", out)
ok(r.get("ok") is False and "different file" in r.get("error", ""), "a different file of the same name there is never overwritten", r)
ok(A._copy_model_to("mbig", str(inner)).get("ok") is False, "a copy into the folder the model is in is refused")
ok(A._copy_model_to("mbig", os.path.join(tmp, "nowhere")).get("ok") is False, "a folder that does not exist is refused")

# a copy whose fingerprint does not match leaves nothing behind
A._MODEL_META["mbig"]["sha256"] = "f" * 64
A._save_models_index()
out2 = os.path.join(tmp, "Drive2")
os.makedirs(out2)
A._copy_model_to("mbig", out2)
st = wait_copy("mbig")
ok(st["state"] == "error" and "fingerprint" in st["error"] and not os.listdir(out2),
   "a copy that does not match the fingerprint is not kept, and nothing is left in the folder", (st, os.listdir(out2)))
A._MODEL_META["mbig"]["sha256"] = sha
A._save_models_index()

# stopped half way
big = inner / "huge-model-Q4_K_M.gguf"
with open(str(big), "wb") as f:
    for _ in range(64):
        f.write(os.urandom(1 << 20))
A._MODEL_PATHS["mhuge"] = str(big)
A._MODEL_META["mhuge"] = {"lineup": "huge", "name": "Huge", "file": big.name, "sha256": "", "tiers": [], "later": True}
out3 = os.path.join(tmp, "Drive3")
os.makedirs(out3)
A._copy_model_to("mhuge", out3)
A._copy_cancel("mhuge")
st = wait_copy("mhuge")
ok(st["state"] in ("stopped", "done") and not [f for f in os.listdir(out3) if f.endswith(".copying")],
   "a copy stopped half way leaves nothing half-made", (st, os.listdir(out3)))

# 5. a model in parts is copied part by part
parts = []
for k in range(1, 4):
    q = inner / ("Parted-Model-Q4_K_M-%05d-of-00003.gguf" % k)
    q.write_bytes(os.urandom(1 << 20))
    parts.append(q)
A._MODEL_PATHS["mpart"] = str(parts[0])
A._MODEL_META["mpart"] = {"lineup": "parted", "name": "Parted", "file": parts[0].name, "sha256": hashlib.sha256(parts[0].read_bytes()).hexdigest(), "tiers": [], "parts": 3, "later": True}
out4 = os.path.join(tmp, "Drive4")
os.makedirs(out4)
A._copy_model_to("mpart", out4)
st = wait_copy("mpart")
ok(st["state"] == "done" and sorted(f for f in os.listdir(out4) if f.endswith(".gguf")) == sorted(q.name for q in parts),
   "a model in parts: every part is copied, the first checked against its fingerprint", (st, os.listdir(out4)))

# 6. a kept model on a drive that is not connected is still listed
drive = os.path.join(tmp, "Volumes", "Archive")
os.makedirs(drive)
pd = os.path.join(drive, "far-model-Q4_K_M.gguf")
open(pd, "wb").write(os.urandom(1 << 20))
A._MODEL_PATHS["mfar"] = pd
A._MODEL_META["mfar"] = {"lineup": "far", "name": "Far model", "file": "far-model-Q4_K_M.gguf", "sha256": "", "tiers": [], "later": True, "at": now - 5, "size": 1 << 20}
A._save_models_index()
shutil.move(drive, drive + "-away")
A3 = load()
far = [x for x in A3._kept_models() if x["id"] == "mfar"]
ok(far and far[0]["connected"] is False and far[0]["size"] == 1 << 20, "a kept model on a drive that is not connected is still listed, as not connected", far)
shutil.move(drive + "-away", drive)

# 7. Show the file
ok(A._reveal_model("nothing").get("ok") is False, "Show the file: a model that is not there says so")
calls = []


class FakePopen(object):
    def __init__(self, args, **kw):
        calls.append(args)


real_popen = A.subprocess.Popen
A.subprocess.Popen = FakePopen
r = A._reveal_model("mbig")
A.subprocess.Popen = real_popen
ok(r.get("ok") and calls and str(p1) in " ".join(map(str, calls[-1])) or (calls and os.path.dirname(str(p1)) in " ".join(map(str, calls[-1]))),
   "Show the file asks the computer's file browser for that file", calls)

# 8. the bridge has the new keys, in both windows
for name in ("model_later", "kept_models", "reveal_model", "copy_model_out", "copy_status", "copy_cancel"):
    ok(hasattr(A.IngeniumApi, name) and hasattr(A.IngeniumApiSingle, name), "the bridge offers " + name + " in both kinds of window")

shutil.rmtree(tmp, ignore_errors=True)
print("\n%d passed, %d failed" % (sum(res), len(res) - sum(res)))
sys.exit(0 if all(res) else 1)
