"""python3 rig/t_682_drives.py <ingenium_app.py, patched with build/desktop/app_drives_682.py>

6.8.2: models kept on an external drive (desktop/app_drives_682.py), checked on the app's own functions with a folder standing
in for the drive, in a home folder of its own: a place chosen on the drive; what Ingenium writes goes there; a model moved
there and back, the old copy gone each time; the drive unplugged (its folder renamed) and the app started again: its models
are still listed, as not connected; plugged in again: they come back; a file the person linked is never moved or deleted; a
copy on the drive is removed with its model; the choice undone."""
import base64, importlib.util, json, os, shutil, sys, tempfile, time

APP = os.path.abspath(sys.argv[1])
res = []


def ok(c, what, info=""):
    res.append(bool(c))
    print(("PASS " if c else "FAIL ") + what + ("" if c else "  " + str(info)), flush=True)


tmp = tempfile.mkdtemp(prefix="ing682-")
os.environ["HOME"] = os.path.join(tmp, "home")
os.environ["XDG_DATA_HOME"] = os.path.join(tmp, "home", ".local", "share")
os.makedirs(os.environ["HOME"])
drive = os.path.join(tmp, "Volumes", "Archive")
os.makedirs(drive)


def load():
    sp = importlib.util.spec_from_file_location("ingenium_app_%d" % len(res), APP)
    m = importlib.util.module_from_spec(sp)
    sp.loader.exec_module(m)
    return m


A = load()
blob = base64.b64encode(b"GGUF" + os.urandom(3 << 20)).decode()


def where(places, mid):
    return next((x for x in places["models"] if x["id"] == mid), None)


def wait_move(mid):
    for _ in range(200):
        st = A._move_status(mid)
        if st["state"] != "running":
            return st
        time.sleep(0.05)
    return A._move_status(mid)


ok(A._put_model_part("m1", blob, True), "a model kept from the page is written")
inner = str(A._models_dir())
ok(os.path.dirname(A._MODEL_PATHS["m1"]) == inner, "with no drive chosen, it goes to the computer's own models folder", A._MODEL_PATHS["m1"])
r = A._set_model_place(drive)
ok(r.get("ok") and r["drive"]["connected"] and r["writes_to"] == "drive" and r["drive"]["path"].endswith("Ingenium models"),
   "a folder on the drive is chosen: an Ingenium models folder is made in it, and new models are written there", r.get("drive"))
A._put_model_part("m2", blob, True)
A._put_model_part("m2", blob, False)
ok(A._under(A._MODEL_PATHS["m2"], r["drive"]["path"]) and os.path.getsize(A._MODEL_PATHS["m2"]) == 2 * len(base64.b64decode(blob)),
   "a model kept from the page now goes to the drive, every part of it in one file", A._MODEL_PATHS["m2"])
old = A._MODEL_PATHS["m1"]
ok(A._move_model("m1", "drive").get("ok"), "a model on the computer is moved to the drive")
st = wait_move("m1")
ok(st["state"] == "done" and A._under(A._MODEL_PATHS["m1"], r["drive"]["path"]) and not os.path.exists(old),
   "it arrives whole, the list points at it there, and the copy on the computer is gone", (st, A._MODEL_PATHS["m1"], os.path.exists(old)))
ok(os.path.getsize(A._MODEL_PATHS["m1"]) == len(base64.b64decode(blob)), "its size is the same")
linked = os.path.join(tmp, "Downloads", "mine.gguf")
os.makedirs(os.path.dirname(linked))
open(linked, "wb").write(b"GGUF" + b"x" * 4096)
A._register_model_file("m3", linked)
mv = A._move_model("m3", "drive")
ok(not mv.get("ok") and "linked" in mv.get("error", ""), "a file the person linked where it lies is not moved", mv)
p = A._model_places()
ok(where(p, "m1")["where"] == "drive" and where(p, "m2")["where"] == "drive" and where(p, "m3")["where"] == "linked",
   "the list says where each model is", [(x["id"], x["where"]) for x in p["models"]])

# the drive unplugged, and the app started again
os.rename(drive, drive + "-away")
A = load()
A._load_models_index()
p = A._model_places()
ok(where(p, "m1") and where(p, "m1")["where"] == "away" and not where(p, "m1")["connected"] and where(p, "m2")["where"] == "away",
   "with the drive unplugged, its models are still listed, as not connected", [(x["id"], x["where"]) for x in p["models"]])
ok(p["writes_to"] == "computer" and p["drive"] and not p["drive"]["connected"], "and new models go to the computer meanwhile", (p["writes_to"], p["drive"]))
A._put_model_part("m4", blob, True)
idx = json.load(open(os.path.join(inner, "index.json")))
ok("m1" in idx and "m2" in idx and "m4" in idx, "saving the list keeps the models that are not connected (it dropped them before)", sorted(idx))
os.rename(drive + "-away", drive)
A = load()
A._load_models_index()
p = A._model_places()
ok(where(p, "m1")["where"] == "drive" and where(p, "m1")["connected"] and where(p, "m2")["connected"], "plugged in again, they come back",
   [(x["id"], x["where"]) for x in p["models"]])

# back to the computer, removed, and the choice undone
ok(A._move_model("m2", "computer").get("ok"), "a model on the drive is moved back to the computer")
st = wait_move("m2")
ok(st["state"] == "done" and os.path.dirname(A._MODEL_PATHS["m2"]) == inner, "it arrives on the computer", (st, A._MODEL_PATHS.get("m2")))
f1 = A._MODEL_PATHS["m1"]
A._delete_model_file("m1")
ok(not os.path.exists(f1), "removing a model whose copy Ingenium made on the drive removes that copy")
A._delete_model_file("m3")
ok(os.path.exists(linked), "removing a linked model leaves the person's own file where it was")
r = A._reset_model_place()
ok(r.get("ok") and r["drive"] is None and r["writes_to"] == "computer", "the choice of drive is undone: new models go to the computer again", r.get("drive"))
bad = A._set_model_place(os.path.join(tmp, "no-such-folder"))
ok(not bad.get("ok") and "not be found" in bad.get("error", ""), "a folder that does not exist is refused with the reason", bad)
shutil.rmtree(tmp, ignore_errors=True)
print("%d passed, %d failed" % (res.count(True), res.count(False)))
sys.exit(1 if res.count(False) else 0)
