#!/usr/bin/env python3
"""Models in parts (Ingenium 6.10.2, build/desktop/app_parts_6102.py): the app's side, run here with its own CODE against a stand-in
for Hugging Face that serves invented files (random bytes, three parts), so nothing is fetched online.

    python3 -I rig/t_6102_parts.py

Her words (3 November 2026): "I don't want Ingenium to be capped at 64 GB RAM in case I get better hardware that are far more
capable in the future." Every model over 50 GB comes in parts; checks: the parts' names are the ones llama.cpp reads from beside the
first; a lineup request naming its parts is accepted only when every part is in order, on Hugging Face, named in its own address,
and they add up; each part is fetched, carried on from where it stopped, and kept only when its fingerprint matches; the model is
installed only when every part is there; its size is all of them; it moves and is deleted whole; a file chosen on the computer is
added by its first part; the page's own engine is never handed one; and the patch applies once to the three apps, which compile."""
import os, sys, json, re, time, shutil, hashlib, ssl, tempfile, threading, pathlib, types, importlib.util, subprocess, py_compile
import urllib.request, urllib.error

HERE = os.path.dirname(os.path.abspath(__file__))
PATCH = os.path.normpath(os.path.join(HERE, "..", "build", "desktop", "app_parts_6102.py"))
ROOT = os.path.normpath(os.path.join(HERE, "..", "..", ".."))
passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    print(("PASS " if c else "FAIL ") + m + ("" if c or d is None else "  " + json.dumps(d, default=str)[:500]))
    passed, failed = (passed + 1, failed) if c else (passed, failed + 1)


spec = importlib.util.spec_from_file_location("app_parts_6102", PATCH)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

tmp = tempfile.mkdtemp(prefix="ing6102-")
store = pathlib.Path(tmp) / "models"
store.mkdir()
drive = pathlib.Path(tmp) / "drive"
drive.mkdir()

# three invented parts, and a stand-in for Hugging Face that serves them (with ranges) and counts what it was asked
PARTS = [os.urandom(300000 + 1000 * k) for k in range(3)]
BASE = "https://huggingface.co/example/Big-Model-GGUF/resolve/main/Q4_K_M/"
NAMES = ["Big-Model-Q4_K_M-%05d-of-00003.gguf" % k for k in (1, 2, 3)]
SERVED = {BASE + n: b for n, b in zip(NAMES, PARTS)}
asked = []


class Resp:
    def __init__(self, data, status, crange=None):
        self.data, self.status, self.pos = data, status, 0
        self.headers = {"Content-Range": crange} if crange else {}

    def read(self, n):
        c = self.data[self.pos:self.pos + n]
        self.pos += len(c)
        return c

    def __enter__(self):
        return self

    def __exit__(self, *a):
        return False


def urlopen(req, timeout=None, context=None):
    url = req.full_url
    rng = req.get_header("Range")
    asked.append((url.rsplit("/", 1)[-1], rng))
    if url not in SERVED:
        raise urllib.error.HTTPError(url, 404, "not found", {}, None)
    data = SERVED[url]
    if rng:
        a = int(re.match(r"bytes=(\d+)-", rng).group(1))
        return Resp(data[a:], 206, "bytes %d-%d/%d" % (a, len(data) - 1, len(data)))
    return Resp(data, 200)


fake_urllib = types.SimpleNamespace(request=types.SimpleNamespace(Request=urllib.request.Request, urlopen=urlopen), error=urllib.error)
problems = []
saved = []
META, PATHS, EXTERNAL = {}, {}, set()


def _install_check(spec):    # the app's own check (ingenium_app.py, R70), as it stands
    try:
        key = str(spec.get("key") or "")
        url = str(spec.get("url") or "")
        sha = str(spec.get("sha256") or "").lower()
        fname = str(spec.get("file") or "")
        size = int(spec.get("size") or 0)
    except Exception:
        return None
    if not (key and url.startswith("https://huggingface.co/") and re.match(r"^[0-9a-f]{64}$", sha)
            and re.match(r"^[A-Za-z0-9._-]{1,200}\.gguf$", fname) and size > 0):
        return None
    tiers = spec.get("tiers") if isinstance(spec.get("tiers"), list) else []
    return {"key": key, "url": url, "sha256": sha, "file": fname, "size": size, "name": str(spec.get("name") or fname),
            "tiers": [str(t) for t in tiers][:8]}


class _InstallStopped(Exception):
    pass


ns = {"os": os, "sys": sys, "re": re, "json": json, "time": time, "shutil": shutil, "hashlib": hashlib, "ssl": ssl, "threading": threading,
      "pathlib": pathlib, "urllib": fake_urllib, "log_problem": lambda w, i=None: problems.append(w),
      "_install_check": _install_check, "_install_worker": lambda job, sp: ("whole", sp["key"]), "_pick_model_files": None,
      "_InstallStopped": _InstallStopped, "_is_cert_error": lambda e: False, "_relay_reason": lambda e: str(e), "_CERT_FILE": None,
      "_curl_fetch": lambda *a, **k: False, "_INSTALLS_LOCK": threading.Lock(), "_safe_id": lambda s: re.sub(r"[^a-z0-9._-]", "-", s.lower()),
      "_models_store_dir": lambda: store, "_models_dir": lambda: store, "_under": lambda a, b: str(a).startswith(str(b)),
      "_drive_label": lambda d: "the drive", "_place_chosen": lambda: str(drive), "_MODEL_META": META, "_MODEL_PATHS": PATHS,
      "_MODEL_EXTERNAL": EXTERNAL, "_save_models_index": lambda: saved.append(1), "_MOVES": {}, "_MOVES_LOCK": threading.Lock()}
picked = []
ns["_pick_model_files"] = lambda win: [dict(r) for r in picked]
exec(mod.CODE, ns)
try:
    # 1. the parts' names, as llama.cpp reads them from beside the first
    P = ns["_gguf_parts_of"]
    ok(P("/m/x-00001-of-00003.gguf") == ["/m/x-00001-of-00003.gguf", "/m/x-00002-of-00003.gguf", "/m/x-00003-of-00003.gguf"]
       and P("/m/x-00002-of-00003.gguf") == ["/m/x-00002-of-00003.gguf"] and P("/m/whole.gguf") == ["/m/whole.gguf"]
       and P("/m/x-00001-of-00001.gguf") == ["/m/x-00001-of-00001.gguf"],
       "a model in parts: the first part names the others, in llama.cpp's own form (name-00001-of-0000N.gguf); any other file is itself alone")

    # 2. a lineup request naming its parts
    sha = [hashlib.sha256(b).hexdigest() for b in PARTS]
    good = {"key": "big-model", "url": BASE + NAMES[0], "sha256": sha[0], "file": NAMES[0], "size": sum(len(b) for b in PARTS),
            "name": "Big Model", "tiers": ["magister"],
            "parts": [{"file": n, "url": BASE + n, "sha256": s, "size": len(b)} for n, s, b in zip(NAMES, sha, PARTS)]}
    C = ns["_install_check"]
    sp = C(json.loads(json.dumps(good)))
    ok(sp is not None and len(sp["parts"]) == 3 and sp["size"] == sum(len(b) for b in PARTS), "a request naming its three parts is accepted", sp and {k: sp[k] for k in ("key", "size")})
    whole = dict(good)
    whole.pop("parts")
    ok(C(whole) is not None and "parts" not in C(whole), "a model in one file is checked as before")

    def bad(fn):
        g = json.loads(json.dumps(good))
        fn(g)
        return C(g) is None
    cases = {
        "out of order": lambda g: g["parts"].reverse(),
        "a part missing": lambda g: g["parts"].pop(),
        "an address not on Hugging Face": lambda g: g["parts"][1].update(url="https://example.org/" + NAMES[1]),
        "an address for another file": lambda g: g["parts"][1].update(url=BASE + NAMES[2]),
        "a bad fingerprint": lambda g: g["parts"][2].update(sha256="xyz"),
        "sizes that do not add up": lambda g: g.update(size=g["size"] + 1),
        "a first part that is not the model's file": lambda g: g.update(sha256=sha[1]),
        "a name with a path in it": lambda g: g["parts"][1].update(file="../" + NAMES[1]),
    }
    refused = [k for k, f in cases.items() if bad(f)]
    ok(len(refused) == len(cases), "refused: a part out of order, missing, off Hugging Face, at another file's address, with a bad fingerprint, sizes that do not add up, a first part that is not the model's file, a path in a name", refused)

    # 3. installed part by part, every part verified, under the names the engine reads
    job = {"state": "running", "received": 0, "total": sp["size"], "phase": "start", "error": "", "id": None, "stop": threading.Event()}
    ok(ns["_install_worker"](job, dict(whole, parts=None)) == ("whole", "big-model"), "a model in one file goes the way it always went")
    seen = []
    real_say_lock = ns["_INSTALLS_LOCK"]
    ns["_install_worker"](job, sp)
    files = sorted(os.listdir(store))
    stem = "l" + sha[0][:12]
    want = ["%s-%05d-of-00003.gguf" % (stem, k) for k in (1, 2, 3)]
    ok(job["state"] == "done" and job["id"] == "lineup-big-model" and files == want and job["received"] == sp["size"],
       "installed: three verified parts side by side, named as the engine reads them, and all of it counted", {"job": {k: job[k] for k in ("state", "error", "received")}, "files": files})
    ok(all(open(os.path.join(store, n), "rb").read() == b for n, b in zip(want, PARTS)), "each part is exactly the file Hugging Face lists")
    ok(PATHS.get("lineup-big-model") == str(store / want[0]) and META["lineup-big-model"]["parts"] == 3 and META["lineup-big-model"]["sha256"] == sha[0],
       "the model is the first part, with the count of its parts kept beside it")
    ok(ns["_gguf_total_size"](PATHS["lineup-big-model"]) == sp["size"], "its size is all of its parts together")
    # installed again: nothing fetched
    asked.clear()
    job2 = dict(job, state="running", stop=threading.Event())
    ns["_install_worker"](job2, sp)
    ok(job2["state"] == "done" and not asked, "asked again when installed: nothing is fetched")

    # 4. carried on from where it stopped: part 1 kept, part 2 half there
    for n in want[1:]:
        os.remove(store / n)
    half = len(PARTS[1]) // 2
    open(store / (sha[1][:16] + ".dl.part"), "wb").write(PARTS[1][:half])
    META.pop("lineup-big-model", None)
    asked.clear()
    job3 = dict(job, state="running", stop=threading.Event(), received=0)
    ns["_install_worker"](job3, sp)
    ok(job3["state"] == "done" and asked == [(NAMES[1], "bytes=%d-" % half), (NAMES[2], None)] and sorted(os.listdir(store)) == want,
       "an install that stopped carries on: the part already there is kept, the half part asks only for the rest", asked)

    # 5. a part that does not match its fingerprint is deleted, and the model is not installed
    for n in os.listdir(store):
        os.remove(store / n)
    META.clear()
    PATHS.clear()
    SERVED[BASE + NAMES[2]] = PARTS[2][:-1] + bytes([PARTS[2][-1] ^ 1])
    job4 = dict(job, state="running", stop=threading.Event(), received=0)
    ns["_install_worker"](job4, sp)
    ok(job4["state"] == "error" and "part 3 of 3 does not match its SHA-256" in job4["error"] and "lineup-big-model" not in PATHS
       and not any(n.endswith("-00003-of-00003.gguf") or n.endswith(".dl.part") for n in os.listdir(store)),
       "a part that does not match its fingerprint is deleted; the model is not installed", job4["error"])
    SERVED[BASE + NAMES[2]] = PARTS[2]

    # 6. not enough room: said before anything is fetched
    real_du = shutil.disk_usage
    ns["shutil"] = types.SimpleNamespace(disk_usage=lambda p: types.SimpleNamespace(free=1000))
    asked.clear()
    job5 = dict(job, state="running", stop=threading.Event(), received=0)
    ns["_install_worker"](job5, sp)
    ok(job5["state"] == "error" and "not enough free space" in job5["error"] and not asked, "not enough room: said at once, nothing fetched", job5["error"])
    ns["shutil"] = shutil
    job6 = dict(job, state="running", stop=threading.Event(), received=0)
    ns["_install_worker"](job6, sp)
    ok(job6["state"] == "done", "with room, it installs")

    # 7. moved whole to the drive, and back
    r = ns["_move_parts"]("lineup-big-model", PATHS["lineup-big-model"], "drive")
    for _ in range(100):
        if ns["_MOVES"]["lineup-big-model"]["state"] != "running":
            break
        time.sleep(0.05)
    mv = ns["_MOVES"]["lineup-big-model"]
    ok(r.get("ok") and mv["state"] == "done" and sorted(os.listdir(drive)) == want and not [n for n in os.listdir(store) if n.endswith(".gguf")]
       and PATHS["lineup-big-model"] == str(drive / want[0]) and mv["done"] == sp["size"],
       "moved to the drive part by part: every part arrives, the old ones go, and the model is its first part there", {"r": r, "mv": {k: mv[k] for k in ("state", "error", "done")}})
    os.remove(drive / want[2])
    r2 = ns["_move_parts"]("lineup-big-model", PATHS["lineup-big-model"], "computer")
    ok(not r2.get("ok") and "missing" in r2.get("error", ""), "a part missing: it is not moved, and says why", r2)

    # 8. chosen on this computer: added by its first part
    own = pathlib.Path(tmp) / "own"
    own.mkdir()
    for n, b in zip(NAMES, PARTS):
        open(own / n, "wb").write(b)
    picked[:] = [{"path": str(own / n), "name": n, "size": len(b), "ok": True} for n, b in zip(NAMES, PARTS)]
    rows = ns["_pick_model_files"](None)
    ok(len(rows) == 1 and rows[0]["ok"] and rows[0]["name"] == NAMES[0] and rows[0]["size"] == sum(len(b) for b in PARTS) and rows[0]["parts"] == 3,
       "all three parts chosen: one model, its first part, its size all of them", rows)
    picked[:] = [{"path": str(own / NAMES[1]), "name": NAMES[1], "size": len(PARTS[1]), "ok": True}]
    rows = ns["_pick_model_files"](None)
    ok(len(rows) == 1 and not rows[0]["ok"] and "part 2 of 3" in rows[0]["reason"] and "00001-of-00003" in rows[0]["reason"], "a later part chosen alone: refused, with which to choose instead", rows)
    os.remove(own / NAMES[2])
    picked[:] = [{"path": str(own / NAMES[0]), "name": NAMES[0], "size": len(PARTS[0]), "ok": True},
                 {"path": str(own / "other.gguf"), "name": "other.gguf", "size": 5, "ok": True}, {"name": "x.txt", "ok": False, "reason": "not a GGUF model file"}]
    rows = ns["_pick_model_files"](None)
    ok(len(rows) == 3 and not rows[0]["ok"] and NAMES[2] in rows[0]["reason"] and "is not beside it" in rows[0]["reason"] and rows[1]["ok"] and not rows[2]["ok"],
       "a first part whose others are not beside it: refused with the missing part named; other files as before", rows)

    # 9. the patch: once, in the three apps, after the code it wraps; they compile
    for repo in ("Ingenium-Mac-Mini", "Ingenium-Mac-Intel", "Ingenium-HPWindows"):
        src = os.path.join(ROOT, repo, "ingenium_app.py")
        if not os.path.isfile(src):
            ok(False, repo + ": its ingenium_app.py is here", src)
            continue
        dst = os.path.join(tmp, repo + ".py")
        shutil.copyfile(src, dst)
        out = subprocess.run([sys.executable, PATCH, dst], capture_output=True, text=True)
        again = subprocess.run([sys.executable, PATCH, dst], capture_output=True, text=True)
        s = open(dst, encoding="utf-8").read()
        order = [s.find(x) for x in ("def _pick_model_files(win):", "\ndef _install_worker(job, sp):", "_install_worker_whole = _install_worker",
                                     "# R74: sharing this computer's models")]
        try:
            py_compile.compile(dst, doraise=True)
            comp = True
        except Exception as e:
            comp = str(e)[:300]
        ok(out.returncode == 0 and "already patched" in again.stdout and s.count("_install_worker_whole = _install_worker") == 1 and order == sorted(order)
           and s.count('"size": _gguf_total_size(p)') == 2 and s.count("_gguf_total_size(mp)") == 1 and "return _move_parts(mid, src, to)" in s
           and "for q in _gguf_parts_of(p):" in s and "len(_gguf_parts_of(p)) > 1:    # 6.10.2: the page" in s and comp is True,
           repo + ": the patch applies once, after the code it wraps, and the app compiles", {"out": out.stdout + out.stderr, "order": order, "comp": comp})
    ok(problems == ["install of big-model failed"] * 2, "nothing else went wrong: the only problems logged are the two failed installs above", problems[:4])
finally:
    shutil.rmtree(tmp, ignore_errors=True)
print("%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
