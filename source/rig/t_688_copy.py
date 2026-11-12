"""Ingenium 6.88 · Fabrica's second copy of a repository on another drive, checked by fingerprint (build/desktop/app_copy_688.py).

Her approval of the preview (version 4) that shows it: "I approve of the preview, please push it everywhere." Copies of the Mac and Windows
ingenium_app.py of the release (6.86 and 6.87 already applied) are patched (once; a second run changes nothing; both compile); the Mac copy
is imported with HOME in a temporary folder. Invented repositories only, made with git: a working copy with packs and loose objects, a
bare one, and one that borrows its objects (git's alternates). Checks: the places listed; a plan refused inside the repository or in a
folder that is not there; the copy made in the background, with its progress; git's own fsck finds the copy whole; its branches, tags and
HEAD are the repository's; only what is new travels the second time; a branch taken away is kept in the copy; git's tidying (gc) is
followed; a byte changed in the copy is found by its fingerprint and copied again; a pack taken away from the copy is found missing and
copied again; a repository that borrows objects gives a copy that stands alone; every day, every Sunday and by hand, as the scheduler
reads them; the scheduler's look brings a due copy up to date; forgetting a copy leaves it on its drive; the build's self-test passes.
    python3 -I rig/t_688_copy.py <Mac ingenium_app.py> <Windows ingenium_app.py>
"""
import importlib.util
import json
import os
import py_compile
import shutil
import subprocess
import sys
import tempfile
import time

HERE = os.path.dirname(os.path.abspath(__file__))
PATCH = os.path.normpath(os.path.join(HERE, "..", "build", "desktop", "app_copy_688.py"))
MAC, WIN = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
WORK = tempfile.mkdtemp(prefix="copy688_")
pass_n = fail_n = 0


def ok(cond, msg, detail=None):
    global pass_n, fail_n
    print(("PASS " if cond else "FAIL ") + msg + ("" if cond or detail is None else "  " + str(detail)[:900]))
    if cond:
        pass_n += 1
    else:
        fail_n += 1


def git(*a, cwd=None):
    env = dict(os.environ, GIT_AUTHOR_NAME="Ada", GIT_AUTHOR_EMAIL="ada@example.invalid", GIT_COMMITTER_NAME="Ada", GIT_COMMITTER_EMAIL="ada@example.invalid")
    return subprocess.run(["git"] + list(a), cwd=cwd, env=env, capture_output=True, text=True)


def refs_of(gd):
    out = git("--git-dir", gd, "for-each-ref", "--format=%(refname) %(objectname)").stdout.split("\n")
    return dict(l.split(" ", 1)[::-1][::-1] for l in out if l and not l.startswith("refs/ingenium-kept/")) if out else {}


def rmap(gd):
    m = {}
    for l in git("--git-dir", gd, "for-each-ref", "--format=%(refname) %(objectname)").stdout.split("\n"):
        if l and not l.startswith("refs/ingenium-kept/"):
            k, v = l.split(" ", 1)
            m[k] = v
    return m


copies = {}
for name, src in (("mac", MAC), ("win", WIN)):
    dst = os.path.join(WORK, name + "_ingenium_app.py")
    shutil.copy(src, dst)
    r1 = subprocess.run([sys.executable, PATCH, dst], capture_output=True, text=True)
    once = open(dst, encoding="utf-8").read()
    r2 = subprocess.run([sys.executable, PATCH, dst], capture_output=True, text=True)
    try:
        py_compile.compile(dst, doraise=True)
        compiled = True
    except Exception as e:
        compiled = str(e)
    ok(r1.returncode == 0 and "patched" in r1.stdout and "already patched" in r2.stdout and once == open(dst, encoding="utf-8").read() and compiled is True
       and once.count("def copy_now(self, rid)") == 2, "the patch applies once to the %s app (both of its API classes), a second run changes nothing, and it compiles" % name, (r1.stdout, r1.stderr, r2.stdout, compiled))
    copies[name] = dst

for k in ("XDG_DATA_HOME", "LOCALAPPDATA"):
    os.environ.pop(k, None)
HOME = os.path.join(WORK, "home")
os.makedirs(HOME, exist_ok=True)
os.environ["HOME"] = HOME
spec = importlib.util.spec_from_file_location("ingenium_app", copies["mac"])
mod = importlib.util.module_from_spec(spec)
sys.modules["ingenium_app"] = mod
spec.loader.exec_module(mod)


def wait(rid, secs=120):
    t0 = time.time()
    seen = set()
    while time.time() - t0 < secs:
        c = [x for x in mod._copy_list()["copies"] if x["id"] == rid][0]
        j = c.get("job") or {}
        if j.get("phase"):
            seen.add(j["phase"])
        if j.get("state") in ("done", "failed"):
            return c, seen
        time.sleep(0.05)
    return c, seen


# an invented repository with history: packed, then loose; a branch and tags
SRC = os.path.join(WORK, "Projects", "quill-notes")
os.makedirs(SRC)
git("init", "-q", "-b", "main", cwd=SRC)
for i in range(1, 6):
    with open(os.path.join(SRC, "notes.md"), "a") as fh:
        fh.write("A line of notes, number %d.\n" % i)
    os.makedirs(os.path.join(SRC, "app", "parts"), exist_ok=True)
    with open(os.path.join(SRC, "app", "parts", "part%d.js" % i), "w") as fh:
        fh.write("export const part = %d;\n" % i * 40)
    git("add", "-A", cwd=SRC)
    git("commit", "-q", "-m", "Version %d" % i, cwd=SRC)
with open(os.path.join(SRC, "picture.bin"), "wb") as fh:
    fh.write(os.urandom(3 << 20))
git("add", "-A", cwd=SRC)
git("commit", "-q", "-m", "A picture", cwd=SRC)
git("tag", "-a", "v1.0", "-m", "The first release", cwd=SRC)
git("branch", "night-reader", cwd=SRC)
git("branch", "old-idea", cwd=SRC)
git("gc", "-q", cwd=SRC)
with open(os.path.join(SRC, "notes.md"), "a") as fh:
    fh.write("A loose change after the tidying.\n")
git("commit", "-q", "-am", "Loose after gc", cwd=SRC)
GD = os.path.join(SRC, ".git")

add = mod._disk_add(SRC)
rid = add.get("id")
ok(add.get("ok") and rid, "the repository is added, as in 6.86", add)

pl = mod._copy_places()
ok(pl.get("ok") and any(x["label"] == "This computer" for x in pl["places"]), "the places a copy can go on are listed, with this computer among them", pl)

DRIVE = os.path.join(WORK, "Backup SSD")
os.makedirs(DRIVE)
bad1 = mod._copy_plan(rid, os.path.join(SRC, "app"), "sunday")
bad2 = mod._copy_plan(rid, os.path.join(WORK, "not-here"), "sunday")
bad3 = mod._copy_plan("disk:0000000000000000", DRIVE, "sunday")
bad4 = mod._copy_plan(rid, DRIVE, "hourly")
ok(not bad1.get("ok") and "inside the repository" in bad1.get("error", "") and not bad2.get("ok") and "not here" in bad2.get("error", "") and not bad3.get("ok") and not bad4.get("ok"),
   "a copy inside the repository, in a folder that is not here, of an unknown repository or at an unknown time is refused, in plain words", (bad1, bad2, bad3, bad4))
plan = mod._copy_plan(rid, DRIVE, "sunday")
T = os.path.join(DRIVE, "Ingenium copies", "quill-notes.git")
ok(plan.get("ok") and plan["copy"]["target"] == T and plan["copy"]["when"] == "sunday" and plan["copy"]["next"] and plan["copy"]["label"] == "This computer", "the copy is planned on the chosen drive, checked every Sunday", plan)
named = mod._copy_plan(rid, DRIVE, "sunday", "Backup SSD")
ok(named["copy"]["label"] == "Backup SSD" and named["copy"]["target"] == T, "a place keeps the name it was shown with (the folder dialog's choice)", named)
nochk = mod._copy_check(rid)
ok(not nochk.get("ok") and "make it first" in nochk.get("error", ""), "there is nothing to check before the copy is made", nochk)

go = mod._copy_now(rid)
c, seen = wait(rid)
fsck = git("--git-dir", T, "fsck", "--full", "--strict")
ok(go.get("ok") and c["job"]["state"] == "done" and c["result"]["ok"] and c["result"]["copied"] > 3e6 and c["job"]["done"] == c["job"]["total"] > 0,
   "the copy is made in the background, then checked: every version matches", (go, c, seen))
ok(fsck.returncode == 0, "git's own fsck finds the copy whole", fsck.stdout + fsck.stderr)
a, b = rmap(GD), rmap(T)
sym = git("--git-dir", T, "symbolic-ref", "HEAD").stdout.strip()
ok(a == b and "refs/tags/v1.0" in b and "refs/heads/night-reader" in b and sym == "refs/heads/main", "its branches, tags and HEAD are the repository's", (a, b, sym))
mark = json.load(open(os.path.join(T, "ingenium-copy.json")))
ok(mark.get("id") == rid and mark.get("name") == "quill-notes", "the copy says whose copy it is", mark)
first_total = c["result"]["copied"]

# new versions, a branch taken away, a new tag: only what is new travels; the branch taken away stays in the copy
with open(os.path.join(SRC, "notes.md"), "a") as fh:
    fh.write("Written after the copy.\n")
git("commit", "-q", "-am", "After the copy", cwd=SRC)
git("tag", "v1.1", cwd=SRC)
gone_oid = rmap(GD)["refs/heads/old-idea"]
git("branch", "-D", "old-idea", cwd=SRC)
mod._copy_now(rid)
c2, _ = wait(rid)
b2 = rmap(T)
kept = [l for l in git("--git-dir", T, "for-each-ref", "--format=%(refname) %(objectname)", "refs/ingenium-kept/").stdout.split("\n") if l]
ok(c2["result"]["ok"] and rmap(GD) == b2 and "refs/tags/v1.1" in b2 and "refs/heads/old-idea" not in b2, "brought up to date: the new version and tag are there, the branch taken away is no longer a branch", (c2["result"], b2))
ok(len(kept) == 1 and kept[0].endswith(" " + gone_oid) and "/heads/old-idea " in kept[0], "the branch taken away from the repository is kept in the copy, so its versions stay", kept)
ok(c2["result"]["copied"] < first_total / 4, "the second time only what is new travels (%d bytes against %d)" % (c2["result"]["copied"], first_total), (c2["result"], first_total))

# git's tidying: new packs with new names
git("gc", "-q", "--prune=now", cwd=SRC)
mod._copy_now(rid)
c3, _ = wait(rid)
ok(c3["result"]["ok"] and git("--git-dir", T, "fsck", "--full").returncode == 0, "after git tidies the repository (gc), the copy follows and is whole", c3["result"])

# a byte changed in the copy: found by its fingerprint, then copied again
packs = sorted(n for n in os.listdir(os.path.join(T, "objects", "pack")) if n.endswith(".pack"))
big = max(packs, key=lambda n: os.path.getsize(os.path.join(T, "objects", "pack", n)))
fp = os.path.join(T, "objects", "pack", big)
with open(fp, "r+b") as fh:
    fh.seek(os.path.getsize(fp) // 2)
    x = fh.read(1)
    fh.seek(-1, 1)
    fh.write(bytes([x[0] ^ 0xFF]))
mod._copy_check(rid)
c4, _ = wait(rid)
ok(not c4["result"]["ok"] and any(big in p and "fingerprint" in p for p in c4["result"]["problems"]), "a byte changed in the copy is found by its fingerprint, the pack named", c4["result"])
mod._copy_now(rid)
c5, _ = wait(rid)
ok(c5["result"]["ok"] and git("--git-dir", T, "fsck", "--full").returncode == 0, "the next copy puts it right: the faulty pack is copied again", c5["result"])

# every pack taken away from the copy (an older pack can still hold what a newer one does, so all go): found missing, copied again
pdir = os.path.join(T, "objects", "pack")
for n in os.listdir(pdir):
    os.remove(os.path.join(pdir, n))
mod._copy_check(rid)
c6, _ = wait(rid)
ok(not c6["result"]["ok"] and any("not in the copy" in p for p in c6["result"]["problems"]), "the packs taken away from the copy are found: their objects are not there", c6["result"])
mod._copy_now(rid)
c7, _ = wait(rid)
ok(c7["result"]["ok"] and git("--git-dir", T, "fsck", "--full").returncode == 0, "and the next copy brings them back", c7["result"])

# the drive engine of 6.86 and 6.87 reads packed-refs again when git rewrites it in another program
seen0 = sorted(mod._disk_repo(rid)["rec"]["refs"])
git("branch", "while-open", cwd=SRC)
git("pack-refs", "--all", "--prune", cwd=SRC)
git("branch", "-D", "night-reader", cwd=SRC)
seen1 = sorted(mod._disk_repo(rid)["rec"]["refs"])
ok("refs/heads/night-reader" in seen0 and "refs/heads/night-reader" not in seen1 and "refs/heads/while-open" in seen1 and "refs/heads/main" in seen1,
   "with the repository open, a branch taken away in another program after git packed the refs is gone at once, and one packed meanwhile is seen", (seen0, seen1))

# a bare repository that borrows its objects (alternates): its copy stands alone
BOR = os.path.join(WORK, "Projects", "borrowed.git")
git("clone", "-q", "--bare", "--shared", SRC, BOR)
alt = open(os.path.join(BOR, "objects", "info", "alternates")).read().strip()
add2 = mod._disk_add(BOR)
rid2 = add2["id"]
mod._copy_plan(rid2, DRIVE, "hand")
mod._copy_now(rid2)
c8, _ = wait(rid2)
T2 = c8["target"]
ok(alt and c8["result"]["ok"] and not os.path.exists(os.path.join(T2, "objects", "info", "alternates")) and git("--git-dir", T2, "fsck", "--full").returncode == 0,
   "a bare repository that borrows its objects from another gives a copy that stands alone, whole", (alt, c8["result"], T2))
ok(c8["when"] == "hand" and c8["next"] is None, "a copy checked by hand has no next check of its own", c8)

# the schedule: every day, every Sunday, by hand
wed = time.mktime((2026, 11, 11, 15, 0, 0, 0, 0, -1))      # Wednesday 11 November 2026, 3 pm here
sun = time.mktime((2026, 11, 15, 9, 0, 0, 0, 0, -1))       # Sunday 15 November 2026, 9 am
ls_w, ls_s = mod._copy_last_sunday(wed), mod._copy_last_sunday(sun)
ok(time.localtime(ls_w)[:6] == (2026, 11, 8, 0, 0, 0) and time.localtime(ls_s)[:6] == (2026, 11, 15, 0, 0, 0), "the last Sunday is read in this computer's own time", (time.localtime(ls_w)[:6], time.localtime(ls_s)[:6]))
cw = {"when": "sunday", "checked": int(wed * 1000)}
ok(not mod._copy_due(cw, wed + 3600) and mod._copy_due(cw, sun) and mod._copy_due(cw, sun + 86400 * 2) and not mod._copy_due(dict(cw, checked=int(sun * 1000)), sun + 3600),
   "every Sunday: due once Sunday begins, or at the first start after a Sunday missed; not again that week", None)
cd = {"when": "day", "checked": int(wed * 1000)}
ok(not mod._copy_due(cd, wed + 3600) and mod._copy_due(cd, wed + 86400 + 1) and not mod._copy_due({"when": "hand", "checked": 0}, sun), "every day: due a day after the last check; by hand: never by itself", None)
nx = mod._copy_next(cw, wed + 60)
ok(time.localtime(nx / 1000)[:6] == (2026, 11, 15, 0, 0, 0), "the next check is said: Sunday 15 November", time.localtime(nx / 1000)[:6])
reg = mod._copy_reg()
reg["copies"][rid]["when"] = "day"
reg["copies"][rid]["checked"] = int((time.time() - 2 * 86400) * 1000)
mod._copy_reg_save(reg)
with open(os.path.join(SRC, "notes.md"), "a") as fh:
    fh.write("Written two days after.\n")
git("commit", "-q", "-am", "Two days on", cwd=SRC)
due = mod._copy_tick()
c9, _ = wait(rid)
ok(due == [rid] and c9["result"]["ok"] and rmap(T)["refs/heads/main"] == rmap(GD)["refs/heads/main"], "the scheduler's look finds the copy due and brings it up to date", (due, c9["result"]))

fg = mod._copy_forget(rid)
ok(fg.get("ok") and rid not in [x["id"] for x in mod._copy_list()["copies"]] and os.path.isdir(T), "forgetting a copy leaves it on its drive, whole", fg)
st = mod._selftest_copy()
ok(st.get("ok"), "the build's self-test of the second copy passes", st)
print("%d passed, %d failed" % (pass_n, fail_n))
sys.exit(1 if fail_n else 0)
