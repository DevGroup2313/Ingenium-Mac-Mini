"""Ingenium 7.11 · a run's record read and written one at a time (build/desktop/app_runs_710.py), tested on Linux with Windows' rule
imitated: a file another handle holds open cannot be replaced (PermissionError). Found in the 7.10 Windows build's self-test (run
43665002267): a read during a write ended a job at once, its later step left "queued".
  1. the rule imitated, 7.10's _runs_read and _runs_write (as app_runs_708.py wrote them) fail with a writer and four readers at once
     (the fault reproduced; if it is not met in this many tries, the check says so rather than pass silently)
  2. with app_runs_710.py, the same writer and readers never fail, and every read is a whole record
  3. a replace refused twice (a scanner holding the file a moment) succeeds on the third try
  4. a replace refused for longer than two seconds still raises, so a lasting fault is not hidden
    python3 rig/t_711_runs_io.py <ingenium_app.py, patched> <scratch folder>"""
import importlib.util
import json
import os
import shutil
import sys
import threading
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


ok(hasattr(ia, "_runs_io") and hasattr(ia, "_runs_retry"), "the app carries the fix (_runs_io, _runs_retry)")
rid = "selftest-io"
os.makedirs(os.path.dirname(ia._runs_rec_path(rid)), exist_ok=True)
REC = {"id": rid, "state": "running", "jobs": [{"key": "one", "steps": [{"state": "queued"} for _ in range(40)]}]}

# Windows' rule, imitated: while a reader holds the record open, replacing it raises PermissionError
held = [0]
held_lock = threading.Lock()
real_open, real_replace = open, os.replace


class Held:
    def __init__(self, fh):
        self.fh = fh

    def __enter__(self):
        return self.fh

    def __exit__(self, *a):
        try:
            self.fh.close()
        finally:
            with held_lock:
                held[0] -= 1


def open_like_windows(path, mode="r", *a, **k):
    fh = real_open(path, mode, *a, **k)
    if mode == "r" and str(path).endswith("run.json"):
        with held_lock:
            held[0] += 1
        time.sleep(0.002)  # a reader takes a moment, as the page's does
        return Held(fh)
    return fh


def replace_like_windows(src, dst):
    with held_lock:
        if held[0] and str(dst).endswith("run.json"):
            raise PermissionError(13, "Access is denied", dst)
    return real_replace(src, dst)


def old_read(r):
    with open_like_windows(ia._runs_rec_path(r), encoding="utf-8") as fh:
        return json.load(fh)


def old_write(rec):
    f = ia._runs_rec_path(rec["id"])
    tmp = f + ".tmp"
    with real_open(tmp, "w", encoding="utf-8") as fh:
        json.dump(rec, fh)
    replace_like_windows(tmp, f)


def hammer(read, write, n=400):
    errs, bad = [], []
    ia._runs_write(REC)

    def writer():
        for i in range(n):
            REC["jobs"][0]["steps"][i % 40]["state"] = "ok"
            try:
                write(REC)
            except Exception as e:
                errs.append(type(e).__name__)

    def reader():
        for _ in range(n):
            try:
                r = read(rid)
                if len(r["jobs"][0]["steps"]) != 40:
                    bad.append("short")
            except Exception as e:
                errs.append(type(e).__name__)
    ts = [threading.Thread(target=writer)] + [threading.Thread(target=reader) for _ in range(4)]
    [t.start() for t in ts]
    [t.join() for t in ts]
    return errs, bad


# 1. 7.10's code, under the rule
errs, bad = hammer(old_read, old_write)
ok(errs.count("PermissionError") > 0, "1. 7.10's code meets the fault under Windows' rule (%d of 2000 calls refused)" % errs.count("PermissionError"), errs[:5])
# 2. the fix, under the same rule: the app's own functions, with its open and replace made to behave as Windows' do
ia.open = open_like_windows
ia.os.replace = replace_like_windows
try:
    errs2, bad2 = hammer(ia._runs_read, ia._runs_write)
finally:
    del ia.open
    ia.os.replace = real_replace
ok(not errs2 and not bad2, "2. with the fix, a writer and four readers at once never fail, and every read is whole", {"errs": errs2[:5], "bad": bad2[:5]})
# 3. refused twice, then put in place
tries = [0]


def refuse_twice(src, dst):
    tries[0] += 1
    if tries[0] <= 2:
        raise PermissionError(13, "Access is denied", dst)
    return real_replace(src, dst)


ia.os.replace = refuse_twice
try:
    ia._runs_write(dict(REC, state="bad"))
    got = ia._runs_read(rid)["state"]
finally:
    ia.os.replace = real_replace
ok(tries[0] == 3 and got == "bad", "3. a replace refused twice (a scanner holding the file) succeeds on the third try", {"tries": tries[0], "state": got})
# 4. refused for good: it raises after about two seconds
ia.os.replace = lambda s0, d0: (_ for _ in ()).throw(PermissionError(13, "Access is denied", d0))
t0 = time.time()
try:
    ia._runs_write(REC)
    raised = False
except PermissionError:
    raised = True
finally:
    ia.os.replace = real_replace
took = time.time() - t0
ok(raised and 1.9 <= took <= 3.5, "4. a replace refused for longer than two seconds still raises (after %.1f s)" % took)
print("\n%d passed, %d failed" % (P, F))
sys.exit(1 if F else 0)
