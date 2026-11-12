"""Ingenium 6.92 · Fabrica: a merge whose two ideas changed the same lines, resolved on the drive (build/desktop/app_merge_692.py).

6.87 refused such a merge on the drive. Copies of the release's own Mac and Windows ingenium_app.py (which carry app_disk_686.py,
app_disk2_687.py, app_copy_688.py and app_refs_691.py) are patched (once; both compile; both bridges have the calls; every status read
goes through the new one); the Mac copy is imported (HOME in a temporary folder) and works on invented repositories git made. The merge
the page would send is made here by git itself in a scratch clone (its files, and the git name of each). Every answer is checked by git:
  begin: refused while a change waits in the folder, when the folder moved on, when a file made in the page does not match its git name,
    when a version named is not in the repository (nothing written, each time); then the files written (both versions between git's
    marks where both ideas changed the same lines, the rest as the merge made them, a file taken away), git's MERGE_HEAD, ORIG_HEAD and
    MERGE_MSG, and git itself sees the merge under way; the record says so (the idea's name, the files holding both versions); a second
    merge refused while one is under way;
  keep: refused while a file holds both versions (named); resolved, the version has both parents, the merge's files, and git finds the
    folder clean and nothing wrong (git fsck); git's merge files and Fabrica's note are gone;
  stop: the files back as the version before held them, what they held first saved aside (her half-done edit too), a file the merge
    brought moved aside, git finds the folder clean;
  a squash: no MERGE_HEAD (as git merge --squash), one parent once kept;
  a merge git itself left (a marked index, which dulwich 0.22.8's status cannot read alone): the folder is read, the merge is said with
    the idea's name from MERGE_MSG and its file found by its marks; kept with both parents; another one stopped, git's index as before;
  a merge ended in git (git merge --abort): Fabrica's note goes with it; a bare repository: refused, saying where to resolve it.
    python3 -I rig/t_692_drive_merge.py <Mac ingenium_app.py> <Windows ingenium_app.py>
"""
import base64, importlib.util, json, os, py_compile, shutil, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
P692 = os.path.join(HERE, "..", "build", "desktop", "app_merge_692.py")
MAC, WIN = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    if c:
        passed += 1
        print("PASS " + m)
    else:
        failed += 1
        print("FAIL " + m + ("" if d is None else "  " + str(d)[:900]))


T = tempfile.mkdtemp(prefix="disk692-")
copies = {}
for k, src in (("mac", MAC), ("win", WIN)):
    dst = os.path.join(T, k, "ingenium_app.py")
    os.makedirs(os.path.dirname(dst))
    shutil.copy(src, dst)
    r1 = subprocess.run([sys.executable, P692, dst], capture_output=True, text=True)
    r2 = subprocess.run([sys.executable, P692, dst], capture_output=True, text=True)
    try:
        py_compile.compile(dst, doraise=True)
        comp = True
    except Exception as e:
        comp = str(e)
    body = open(dst, encoding="utf-8").read()
    ok(r1.returncode == 0 and "patched" in r1.stdout and "already patched" in r2.stdout and comp is True
       and body.count("    def disk_merge_begin(self, rid, payload):") == 2 and body.count("    def disk_merge_stop(self, rid):") == 2
       and body.count("st = _disk_status_of(repo)  # 6.92") == 4 and "porcelain.status(repo, untracked_files=\"all\")\n" not in body.replace("return porcelain.status", ""),
       "the %s app is patched once, both bridges have the calls, every status goes through the new reading, and it compiles" % k, (r1.stdout, r1.stderr, r2.stdout, comp))
    copies[k] = dst

HOME = os.path.join(T, "home")
os.makedirs(HOME)
os.environ["HOME"] = HOME
ENV = dict(os.environ, GIT_CONFIG_NOSYSTEM="1", GIT_AUTHOR_NAME="Ada Ferreira", GIT_AUTHOR_EMAIL="ada@example.invalid",
           GIT_COMMITTER_NAME="Ada Ferreira", GIT_COMMITTER_EMAIL="ada@example.invalid")


def git(cwd, *a, check=True):
    r = subprocess.run(["git"] + list(a), cwd=cwd, capture_output=True, env=ENV)
    if check and r.returncode != 0:
        raise RuntimeError("git %s: %s" % (" ".join(a), r.stderr.decode(errors="replace")))
    return r.stdout.decode()


spec = importlib.util.spec_from_file_location("ingenium_app", copies["mac"])
A = importlib.util.module_from_spec(spec)
spec.loader.exec_module(A)

D = os.path.join(T, "drive")
W = os.path.join(D, "Atelier")
os.makedirs(W)


def put(rel, text):
    fs = os.path.join(W, *rel.split("/"))
    os.makedirs(os.path.dirname(fs), exist_ok=True)
    with open(fs, "w", newline="\n") as fh:
        fh.write(text)


def read(rel, base=None):
    with open(os.path.join(base or W, *rel.split("/")), encoding="utf-8", newline="") as fh:
        return fh.read()


git(W, "init", "-q", "-b", "main")
git(W, "config", "user.name", "Ada Ferreira")
git(W, "config", "user.email", "ada@example.invalid")
put("a.txt", "one\ntwo\nthree\n")
put("b.txt", "bee\n")
put("gone.txt", "to be taken away by the idea\n")
git(W, "add", "-A")
git(W, "commit", "-qm", "The first version")
# four ideas, each changing line two of a.txt; the first also changes b.txt, brings new.txt and takes gone.txt away
for n, idea in enumerate(("idea", "idea2", "idea3", "idea4", "idea5")):
    git(W, "checkout", "-qb", idea, "main")
    put("a.txt", "one\nTWO from %s\nthree\n" % idea)
    if idea == "idea":
        put("b.txt", "bee, and a second line\nfrom the idea\n")
        put("new.txt", "brought by the idea\n")
        os.unlink(os.path.join(W, "gone.txt"))
    git(W, "add", "-A")
    git(W, "commit", "-qm", "%s's version" % idea)
git(W, "checkout", "-q", "main")
put("a.txt", "one\nTWO from main\nthree\n")
put("c.txt", "main's own new file\n")
git(W, "add", "-A")
git(W, "commit", "-qm", "main's version")
rid = A._disk_add(W)["id"]


def rec():
    x = A._disk_repo2(rid)
    return x.get("rec") or {}


def tip(ref):
    return git(W, "rev-parse", ref).strip()


def plan(idea, squash=False):
    """the merge as the page sends it, made here by git in a scratch clone: each file the merge changes, by its git name; a file the
    merge made (one holding both versions) whole, as the page makes it"""
    S = tempfile.mkdtemp(prefix="plan-", dir=T)
    git(S, "clone", "-q", W, "c")
    C = os.path.join(S, "c")
    git(C, "checkout", "-q", "main")
    git(C, "merge", "--no-commit", "--no-ff", "origin/" + idea, check=False)
    conflicts = [x for x in git(C, "diff", "--name-only", "--diff-filter=U").split("\n") if x]
    head = {}
    for line in git(C, "ls-tree", "-r", "HEAD").split("\n"):
        if line:
            meta, path = line.split("\t", 1)
            mode, _, oid = meta.split(" ")
            head[path] = (mode, oid)
    files = {}
    paths = set(head) | set(x for x in git(C, "ls-files").split("\n") if x)
    for path in sorted(paths):
        fs = os.path.join(C, *path.split("/"))
        if not os.path.exists(fs):
            files[path] = None
            continue
        data = open(fs, "rb").read()
        oid = subprocess.run(["git", "hash-object", "--stdin"], input=data, capture_output=True, cwd=C, env=ENV).stdout.decode().strip()
        if path in head and head[path][1] == oid:
            continue
        f = {"oid": oid, "mode": "100644"}
        if subprocess.run(["git", "cat-file", "-e", oid], cwd=W, env=ENV).returncode != 0:
            f["b64"] = base64.b64encode(data).decode()
        files[path] = f
    return {"ours": tip("main"), "theirs": None if squash else tip(idea), "from": tip(idea), "squash": squash, "label": idea, "msg": "Merge branch '%s'" % idea,
            "conflicts": conflicts, "files": files}


GITD = os.path.join(W, ".git")
P = plan("idea")
ok(P["conflicts"] == ["a.txt"] and P["files"]["gone.txt"] is None and "b64" in P["files"]["a.txt"] and "b64" not in P["files"]["b.txt"]
   and "b64" not in P["files"]["new.txt"], "the merge to send: a.txt holds both versions (made in the page, sent whole), b.txt and new.txt by their git names, gone.txt taken away",
   {k: (v if v is None else {kk: vv for kk, vv in v.items() if kk != "b64"}) for k, v in P["files"].items()})

# refusals: nothing written each time
before = read("a.txt")
put("c.txt", "a change waiting\n")
x = A._disk_merge_begin(rid, P)
nothing = not os.path.exists(os.path.join(GITD, "MERGE_HEAD")) and read("b.txt") == "bee\n"
ok(not x.get("ok") and "Keep or put back the changes in its folder first" in x.get("error", "") and nothing, "refused while a change waits to be kept in the folder (nothing written)", x)
git(W, "checkout", "--", "c.txt")
bad = dict(P, ours="0" * 40)
x = A._disk_merge_begin(rid, bad)
ok(not x.get("ok") and "moved on since Fabrica read it" in x.get("error", "") and not os.path.exists(os.path.join(GITD, "MERGE_HEAD")), "refused when the folder moved on since Fabrica read it", x)
bad = json.loads(json.dumps(P))
bad["files"]["a.txt"]["b64"] = base64.b64encode(b"one\nsomething else\nthree\n").decode()
x = A._disk_merge_begin(rid, bad)
ok(not x.get("ok") and "a.txt did not arrive whole" in x.get("error", "") and read("a.txt") == before and read("b.txt") == "bee\n",
   "refused when a file made in the page does not match its git name (nothing written)", x)
bad = json.loads(json.dumps(P))
bad["files"]["new.txt"]["oid"] = "1" * 40
x = A._disk_merge_begin(rid, bad)
ok(not x.get("ok") and "new.txt's version is not in the repository" in x.get("error", "") and not os.path.exists(os.path.join(W, "new.txt")),
   "refused when a version named is not in the repository (nothing written)", x)

# begun
main0, idea0 = tip("main"), tip("idea")
x = A._disk_merge_begin(rid, P)
st = git(W, "status")
ok(x.get("ok") and x.get("conflicts") == ["a.txt"], "the merge is begun in the folder", x)
a = read("a.txt")
ok(a.startswith("one\n<<<<<<< ") and "TWO from main\n=======\nTWO from idea\n>>>>>>> " in a and a.endswith("three\n")
   and read("b.txt") == "bee, and a second line\nfrom the idea\n" and read("new.txt") == "brought by the idea\n" and not os.path.exists(os.path.join(W, "gone.txt")),
   "its files: a.txt holds both versions between git's marks, b.txt and new.txt as the idea made them, gone.txt taken away", a)
sp = sorted(x for x in git(W, "status", "--porcelain").split("\n") if x)
ok(read("MERGE_HEAD", GITD).strip() == idea0 and read("ORIG_HEAD", GITD).strip() == main0 and read("MERGE_MSG", GITD).startswith("Merge branch 'idea'")
   and "You have unmerged paths" in st, "git's own merge files: MERGE_HEAD (the idea's version), ORIG_HEAD, MERGE_MSG; git itself sees the merge under way", st)
ok(sp == ["A  new.txt", "D  gone.txt", "M  b.txt", "UU a.txt"], "git's index as after git's own merge: the clean files staged, a.txt marked as both changed", sp)
r = rec()
m = r.get("merging") or {}
chg = sorted(c["path"] for c in r.get("changes") or [])
ok(m.get("theirs") == idea0 and m.get("label") == "idea" and m.get("conflicts") == ["a.txt"] and m.get("left") == ["a.txt"] and m.get("squash") is False
   and m.get("git") is False and chg == ["a.txt", "b.txt", "gone.txt", "new.txt"], "the record says so: the idea's name, the file holding both versions, the files changed", (m, chg))
x = A._disk_merge_begin(rid, P)
ok(not x.get("ok") and "already under way" in x.get("error", ""), "a second merge is refused while one is under way", x)

# keep: refused while both versions remain, then the version with both parents
x = A._disk_commit(rid, "Bring in the idea", "Ada Ferreira", "ada@example.invalid")
ok(not x.get("ok") and "These still hold both versions: a.txt" in x.get("error", "") and tip("main") == main0, "Keep this version is refused while a.txt holds both versions (named; nothing kept)", x)
put("a.txt", "one\nTWO from main and the idea\nthree\n")
r = rec()
ok((r.get("merging") or {}).get("left") == [], "resolved, no file holds both versions any longer", r.get("merging"))
x = A._disk_commit(rid, "Bring in the idea", "Ada Ferreira", "ada@example.invalid")
c = tip("main")
parents = git(W, "log", "-1", "--format=%P", c).split()
files = sorted(git(W, "ls-tree", "-r", "--name-only", c).split())
st = git(W, "status", "--porcelain")
fsck = subprocess.run(["git", "fsck", "--no-progress"], cwd=W, capture_output=True, env=ENV)
ok(x.get("ok") and x.get("merged") is True and parents == [main0, idea0] and files == ["a.txt", "b.txt", "c.txt", "new.txt"] and st == "" and fsck.returncode == 0,
   "kept: the version has both parents and the merge's files; git finds the folder clean and nothing wrong", (x, parents, files, st, fsck.stderr[-300:]))
gone = [n for n in ("MERGE_HEAD", "MERGE_MSG", "ingenium-merge.json") if os.path.exists(os.path.join(GITD, n))]
ok(gone == [] and rec().get("merging") is None, "git's merge files and Fabrica's note are gone, and the record says no merge is under way", gone)

# stop: everything back, nothing lost
P2 = plan("idea2")
main1 = tip("main")
x = A._disk_merge_begin(rid, P2)
put("a.txt", "one\nher half-done choice\nthree\n")
y = A._disk_merge_stop(rid)
aside = os.path.join(W, *(y.get("aside") or "x").split("/"))
ok(x.get("ok") and y.get("ok") and read("a.txt") == read("a.txt") and git(W, "show", "HEAD:a.txt") == read("a.txt") and git(W, "status", "--porcelain") == ""
   and tip("main") == main1 and not os.path.exists(os.path.join(GITD, "MERGE_HEAD")) and not os.path.exists(os.path.join(GITD, "ingenium-merge.json")),
   "Stop the merge: the files back as the version before held them, git finds the folder clean, git's merge files gone", (x, y, git(W, "status", "--porcelain")))
ok(os.path.isfile(os.path.join(aside, "a.txt")) and read("a.txt", aside) == "one\nher half-done choice\nthree\n", "what a.txt held first (her half-done choice) is kept aside, inside its folder", y)
ok(rec().get("merging") is None, "the record says no merge is under way", rec().get("merging"))

# a squash
P3 = plan("idea3", squash=True)
x = A._disk_merge_begin(rid, P3)
m = rec().get("merging") or {}
ok(x.get("ok") and not os.path.exists(os.path.join(GITD, "MERGE_HEAD")) and os.path.exists(os.path.join(GITD, "SQUASH_MSG")) and m.get("squash") is True and m.get("label") == "idea3",
   "a squash: no MERGE_HEAD, as git merge --squash; the record says it is a squash", m)
put("a.txt", "one\nTWO, squashed\nthree\n")
x = A._disk_commit(rid, "Squash idea3", "Ada Ferreira", "ada@example.invalid")
ok(x.get("ok") and len(git(W, "log", "-1", "--format=%P", "main").split()) == 1 and not os.path.exists(os.path.join(GITD, "SQUASH_MSG"))
   and not os.path.exists(os.path.join(GITD, "ingenium-merge.json")) and git(W, "status", "--porcelain") == "", "kept: one parent, its files kept, the folder clean", x)

# a merge git itself left
main2 = tip("main")
git(W, "merge", "idea4", check=False)
r = rec()
m = r.get("merging") or {}
ok(not (r.get("disk") or {}).get("folderError") and m.get("git") is True and m.get("label") == "idea4" and m.get("theirs") == tip("idea4") and m.get("left") == ["a.txt"],
   "a merge git left (its index marked): the folder is read, the merge said with the idea's name, its file found by its marks", (m, (r.get("disk") or {}).get("folderError")))
x = A._disk_commit(rid, "Bring in idea4", "Ada Ferreira", "ada@example.invalid")
ok(not x.get("ok") and "a.txt" in x.get("error", "") and tip("main") == main2, "refused while it holds both versions", x)
put("a.txt", "one\nTWO, from main and idea4\nthree\n")
x = A._disk_commit(rid, "Bring in idea4", "Ada Ferreira", "ada@example.invalid")
parents = git(W, "log", "-1", "--format=%P", "main").split()
fsck = subprocess.run(["git", "fsck", "--no-progress"], cwd=W, capture_output=True, env=ENV)
ok(x.get("ok") and parents == [main2, tip("idea4")] and git(W, "status", "--porcelain") == "" and fsck.returncode == 0 and not os.path.exists(os.path.join(GITD, "MERGE_HEAD")),
   "kept in Fabrica: both parents, the folder clean, nothing wrong", (x, parents, git(W, "status", "--porcelain")))
main3 = tip("main")
git(W, "merge", "idea5", check=False)
y = A._disk_merge_stop(rid)
ok(y.get("ok") and git(W, "status", "--porcelain") == "" and subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=W, env=ENV).returncode == 0
   and tip("main") == main3 and not os.path.exists(os.path.join(GITD, "MERGE_HEAD")), "another stopped in Fabrica: the files and git's index as the version before held them", (y, git(W, "status", "--porcelain")))

# ended in git
P5 = plan("idea5")
x = A._disk_merge_begin(rid, P5)
git(W, "merge", "--abort")
ok(x.get("ok") and rec().get("merging") is None and not os.path.exists(os.path.join(GITD, "ingenium-merge.json")) and git(W, "status", "--porcelain") == "",
   "a merge ended in git (git merge --abort): Fabrica's note goes with it", rec().get("merging"))

# a bare repository
B = os.path.join(D, "Bare.git")
git(D, "clone", "-q", "--bare", W, B)
bid = A._disk_add(B)["id"]
x = A._disk_merge_begin(bid, dict(P5, ours=git(B, "rev-parse", "main").strip()))
ok(not x.get("ok") and "make a working copy of it" in x.get("error", ""), "a bare repository: refused, saying where to resolve it", x)

shutil.rmtree(T, ignore_errors=True)
print("%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
