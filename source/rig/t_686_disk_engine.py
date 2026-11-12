"""Ingenium 6.86 · Fabrica, phase 2: every repository on this computer, read straight from the drive, tested (build/desktop/app_disk_686.py).

Her words (12 November 2026): "I want full and complete parity with GitHub but I want you to go above and beyond that". Copies of the
Mac and Windows ingenium_app.py are patched (once: a second run changes nothing; both compile; both bridges have the calls); the Mac
copy is imported (HOME in a temporary folder) and reads invented repositories that git itself made (packed, with changes kept against
other versions, loose objects, an annotated tag, a submodule, a link, a file over a part), and one bare repository made by dulwich.
Every answer is checked against git's own (rev-parse, ls-tree, cat-file):
  add: a working copy, a bare one, a folder inside a working copy (the repository that holds it), twice (one entry); a folder with no
    repository and a folder not there are refused in plain words;
  list: names, branches, tags, the drive, the room taken, bare or not; a repository brought from GitHub (6.83) listed with its name,
    logo and address; a drive not connected said so;
  repo: HEAD, refs, the files at HEAD with their modes and git names (the submodule named, not held), every size as git gives it;
  sizes: an older version's files, in one answer;
  objs: each kind byte for byte; a missing object and a bad name are null; a file over a part comes in parts, whole again; one over
    48 MB is kept on the drive; a full answer leaves the rest to be asked again and loses none; more brings the history and the trees;
  forget: listed no more, the drive untouched; one brought from GitHub stays; read only: every file on the drive as it was;
  at once: four askers together get the right answers; speed: 3000 files in a few seconds, at once the second time.
    python3 -I rig/t_686_disk_engine.py <Mac ingenium_app.py> <Windows ingenium_app.py>
"""
import base64, hashlib, importlib.util, json, os, py_compile, random, shutil, subprocess, sys, tempfile, threading, time

HERE = os.path.dirname(os.path.abspath(__file__))
PATCH = os.path.join(HERE, "..", "build", "desktop", "app_disk_686.py")
MAC, WIN = sys.argv[1], sys.argv[2]
passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    if c:
        passed += 1
        print("PASS " + m)
    else:
        failed += 1
        print("FAIL " + m + ("" if d is None else "  " + str(d)[:700]))


T = tempfile.mkdtemp(prefix="disk686-")
copies = {}
for k, src in (("mac", MAC), ("win", WIN)):
    dst = os.path.join(T, k, "ingenium_app.py")
    os.makedirs(os.path.dirname(dst))
    shutil.copy(src, dst)
    r1 = subprocess.run([sys.executable, PATCH, dst], capture_output=True, text=True)
    r2 = subprocess.run([sys.executable, PATCH, dst], capture_output=True, text=True)
    try:
        py_compile.compile(dst, doraise=True)
        comp = True
    except Exception as e:
        comp = str(e)
    body = open(dst, encoding="utf-8").read()
    ok(r1.returncode == 0 and "patched" in r1.stdout and "already patched" in r2.stdout and comp is True and body.count("    def disk_repo(self, rid):") == 2
       and body.count("    def disk_part(self, rid, oid, off, n):") == 2 and body.count("    def disk_sizes(self, rid, oids):") == 2, "the %s app is patched once, both of its bridges have the calls, and it compiles" % k, (r1.stdout, r1.stderr, r2.stdout, comp))
    copies[k] = dst

HOME = os.path.join(T, "home")
os.makedirs(HOME)
os.environ["HOME"] = HOME
spec = importlib.util.spec_from_file_location("ingenium_app", copies["mac"])
A = importlib.util.module_from_spec(spec)
spec.loader.exec_module(A)


def git(cwd, *args, text=True, inp=None):
    env = dict(os.environ, GIT_AUTHOR_NAME="Ada Ferreira", GIT_AUTHOR_EMAIL="ada@example.invalid", GIT_COMMITTER_NAME="Ada Ferreira",
               GIT_COMMITTER_EMAIL="ada@example.invalid", GIT_CONFIG_NOSYSTEM="1", HOME=HOME)
    r = subprocess.run(["git"] + list(args), cwd=cwd, capture_output=True, env=env, input=inp)
    if r.returncode != 0:
        raise RuntimeError("git %s: %s" % (" ".join(args), r.stderr.decode(errors="replace")))
    return r.stdout.decode() if text else r.stdout


DRIVE = os.path.join(T, "drive")
os.makedirs(DRIVE)
AT = os.path.join(DRIVE, "Atelier")
os.makedirs(os.path.join(AT, "src"))
os.makedirs(os.path.join(AT, "docs", "guide"))
git(AT, "init", "-q", "-b", "main")
rnd = random.Random(686)
words = ["lamp", "river", "stone", "quiet", "garden", "north", "paper", "salt", "violet", "harbour"]
open(os.path.join(AT, "README.md"), "w").write("# Atelier\n\nAn invented app for this test.\n" + "\n".join(" ".join(rnd.choice(words) for _ in range(12)) for _ in range(400)))
open(os.path.join(AT, "src", "app.js"), "w").write("console.log('atelier');\n" * 50)
open(os.path.join(AT, "docs", "guide", "intro.md"), "w").write("Begin here.\n")
open(os.path.join(AT, "run.sh"), "w").write("#!/bin/sh\necho run\n")
os.chmod(os.path.join(AT, "run.sh"), 0o755)
os.symlink("README.md", os.path.join(AT, "link"))
big = bytes(rnd.getrandbits(8) for _ in range(9 * 1048576 + 333))
open(os.path.join(AT, "src", "photo.bin"), "wb").write(big)
git(AT, "add", "-A")
git(AT, "commit", "-qm", "The first version")
s = open(os.path.join(AT, "README.md")).read()
open(os.path.join(AT, "README.md"), "w").write(s[:500] + "A changed line.\n" + s[500:])
git(AT, "commit", "-qam", "A change to the README")
git(AT, "tag", "-a", "v1", "-m", "The first release")
git(AT, "tag", "v0", "HEAD~1")
git(AT, "checkout", "-qb", "idea")
open(os.path.join(AT, "docs", "guide", "intro.md"), "a").write("An idea.\n")
git(AT, "commit", "-qam", "An idea")
git(AT, "checkout", "-q", "main")
sub = git(AT, "rev-parse", "HEAD").strip()
git(AT, "update-index", "--add", "--cacheinfo", "160000,%s,vendor/lib" % sub)
git(AT, "commit", "-qm", "A submodule, named")
git(AT, "gc", "-q")
open(os.path.join(AT, "notes.txt"), "w").write("a loose object, after the pack\n")
git(AT, "add", "notes.txt")
git(AT, "commit", "-qm", "A loose one")

from dulwich.repo import Repo
from dulwich.objects import Blob, Tree, Commit
QU = os.path.join(DRIVE, "Quill.git")
q = Repo.init_bare(QU, mkdir=True)
b1 = Blob.from_string(b"Quill\n")
q.object_store.add_object(b1)
t1 = Tree()
t1.add(b"README.md", 0o100644, b1.id)
q.object_store.add_object(t1)
c1 = Commit()
c1.tree, c1.parents, c1.message = t1.id, [], b"Quill begins"
c1.author = c1.committer = b"Ada Ferreira <ada@example.invalid>"
c1.author_time = c1.commit_time = 1762900000
c1.author_timezone = c1.commit_timezone = 0
q.object_store.add_object(c1)
q.refs[b"refs/heads/main"] = c1.id
q.refs.set_symbolic_ref(b"HEAD", b"refs/heads/main")
q.close()
EMPTY = os.path.join(DRIVE, "Just a folder")
os.makedirs(EMPTY)


def tree_hash(root):
    h = hashlib.sha256()
    for dp, dn, fn in sorted(os.walk(root)):
        dn.sort()
        for n in sorted(fn):
            p = os.path.join(dp, n)
            h.update(p.encode())
            if os.path.islink(p):
                h.update(os.readlink(p).encode())
            else:
                st = os.stat(p)
                h.update(str((st.st_size, st.st_mtime_ns)).encode())
                with open(p, "rb") as fh:
                    h.update(hashlib.sha256(fh.read()).digest())
    return h.hexdigest()


before = tree_hash(DRIVE)

# ---------- add ----------
ra = A._disk_add(AT)
rq = A._disk_add(QU)
rs = A._disk_add(os.path.join(AT, "src"))
r2 = A._disk_add(AT)
re1 = A._disk_add(EMPTY)
re2 = A._disk_add(os.path.join(DRIVE, "Not here"))
ok(ra.get("ok") and rq.get("ok") and ra["id"].startswith("disk:") and rs.get("id") == ra["id"] and rs.get("already") and r2.get("already"),
   "a working copy, a bare repository and a folder inside a working copy are added; twice gives the same one", (ra, rq, rs, r2))
ok(not re1.get("ok") and "holds no git repository" in re1.get("error", "") and not re2.get("ok") and "not here" in re2.get("error", ""),
   "a folder with no repository, and one not there, are refused in plain words", (re1, re2))
reg = json.load(open(A._disk_file(), encoding="utf-8"))
ok(len(reg["repos"]) == 2 and A._disk_file().startswith(HOME), "the list she keeps holds each one once, in the app's own folder", reg)

# ---------- list ----------
L = A._disk_list()
by = {x["name"]: x for x in L["repos"]}
at, qu = by.get("Atelier", {}), by.get("Quill", {})
ok(sorted(by) == ["Atelier", "Quill"] and at.get("ok") and qu.get("ok"), "the list names both, by name", L)
ok(at.get("branches") is None and sorted(k[11:] for k in at["refs"] if k.startswith("refs/heads/")) == ["idea", "main"]
   and sorted(k[10:] for k in at["refs"] if k.startswith("refs/tags/")) == ["v0", "v1"], "its branches and tags", at.get("refs"))
du = sum(os.path.getsize(os.path.join(dp, n)) for dp, dn, fn in os.walk(os.path.join(AT, ".git")) for n in fn)
ok(isinstance(at.get("free"), int) and at["free"] > 0 and at.get("changed", 0) > 0, "the room left on its drive, and when it last changed", (at.get("free"), at.get("changed")))
ok(at.get("size") == du and at.get("drive") == "This computer" and at.get("bare") is False and qu.get("bare") is True and at.get("head") == {"ref": "refs/heads/main"},
   "the room it takes on the drive, its drive, bare or not, and HEAD", (at.get("size"), du, at.get("drive"), at.get("bare"), qu.get("bare"), at.get("head")))
ok(A._disk_drive("/Volumes/Studio Drive/code/x") == "Studio Drive" and A._disk_drive(HOME) == "This computer", "a drive is named as she knows it",
   (A._disk_drive("/Volumes/Studio Drive/code/x"), A._disk_drive(HOME)))

# ---------- repo ----------
R = A._disk_repo(ra["id"])
rec = R.get("rec") or {}
want = {}
for line in git(AT, "ls-tree", "-r", "HEAD").splitlines():
    meta, path = line.split("\t", 1)
    mode, kind, oid = meta.split()
    if kind != "commit":
        want[path] = [mode, oid]
ok(R.get("ok") and rec.get("work") == want and rec.get("fileCount") == len(want) and "vendor/lib" not in rec.get("work", {}),
   "the files at HEAD, with their modes and git names, as git lists them; the submodule named, not held", (R.get("error"), sorted(set(want) ^ set(rec.get("work", {})))))
modes = {p: v[0] for p, v in rec.get("work", {}).items()}
ok(modes.get("run.sh") == "100755" and modes.get("link") == "120000" and modes.get("README.md") == "100644", "a script, a link and a file keep their kinds", modes)
refs_git = {}
for line in git(AT, "show-ref").splitlines():
    oid, name = line.split()
    refs_git[name] = oid
ok(rec.get("refs") == refs_git and rec.get("head") == {"ref": "refs/heads/main"}, "every branch and tag points where git says", (rec.get("refs"), refs_git))
sizes_ok = all(rec["sizes"].get(v[1]) == int(git(AT, "cat-file", "-s", v[1])) for v in want.values())
ok(sizes_ok and rec["disk"]["sized"] is True and rec["sizes"].get(want["src/photo.bin"][1]) == len(big), "every size as git gives it, the large file too, without reading it whole",
   [(p, rec["sizes"].get(v[1])) for p, v in want.items()])
ok(rec["disk"]["path"] == AT and rec["disk"]["bare"] is False and rec["disk"]["size"] == du and rec["name"] == "Atelier" and rec["slug"] == "Atelier",
   "where it is, its room and its name", rec.get("disk"))
old_sizes = {}
for line in git(AT, "rev-list", "--objects", "--all").splitlines():
    oid = line.split()[0]
    old_sizes[oid] = int(git(AT, "cat-file", "-s", oid))
got = A._disk_sizes(Repo(AT).object_store, sorted(old_sizes), 30)
ok(got == old_sizes, "the size of every object in every version, kept whole or as a change against another, packed or loose", sorted(set(got.items()) ^ set(old_sizes.items()))[:6])

# ---------- objs ----------
head = git(AT, "rev-parse", "HEAD").strip()
tree = git(AT, "rev-parse", "HEAD^{tree}").strip()
blob = want["README.md"][1]
tag = refs_git["refs/tags/v1"]
miss = "0" * 40
O = A._disk_objs(ra["id"], [head, tree, blob, tag, miss, "not-a-name"])
objs = O.get("objs") or {}


def body(oid, kind):
    return git(AT, "cat-file", kind, oid, text=False)


ok(O.get("ok") and objs[head]["t"] == "commit" and base64.b64decode(objs[head]["b64"]) == body(head, "commit")
   and objs[tree]["t"] == "tree" and base64.b64decode(objs[tree]["b64"]) == body(tree, "tree")
   and objs[blob]["t"] == "blob" and base64.b64decode(objs[blob]["b64"]) == body(blob, "blob")
   and objs[tag]["t"] == "tag" and base64.b64decode(objs[tag]["b64"]) == body(tag, "tag"), "a commit, a tree, a file and a tag, byte for byte as git gives them",
   {k: (v or {}).get("t") for k, v in objs.items()})
ok(objs.get(miss, 1) is None and objs.get("not-a-name", 1) is None and O.get("more") == {}, "a missing object and a bad name are null", objs.get(miss))
ph = want["src/photo.bin"][1]
P = A._disk_objs(ra["id"], [ph])["objs"][ph]
parts, off = [], 0
while off < P["n"]:
    x = A._disk_part(ra["id"], ph, off, A._DISK_PART)
    parts.append(base64.b64decode(x["b64"]))
    off += len(parts[-1])
whole = b"".join(parts)
ok(P.get("part") and P.get("t") == "blob" and P.get("n") == len(big) and "b64" not in P and whole == big
   and hashlib.sha1(b"blob %d\0" % len(whole) + whole).hexdigest() == ph, "a file over a part comes in parts, and is whole again", (P, len(parts)))
keep = A._DISK_BIG
A._DISK_BIG = 5 * 1048576
B = A._disk_objs(ra["id"], [ph])["objs"][ph]
A._DISK["last"] = None
Bp = A._disk_part(ra["id"], ph, 0, 100)
A._DISK_BIG = keep
ok(B.get("big") and B.get("n") == len(big) and B.get("t") == "blob" and not Bp.get("ok") and "kept whole on the drive" in Bp.get("error", ""),
   "a file over the largest size is kept whole on the drive, and said so", (B, Bp))
three = [v[1] for p, v in want.items() if p in ("src/app.js", "docs/guide/intro.md", "run.sh")]
sizes3 = sorted(int(git(AT, "cat-file", "-s", o)) for o in three)
keep = A._DISK_PART
A._DISK_PART = sizes3[2] + sizes3[1] - 1  # each fits; the three together do not
F1 = A._disk_objs(ra["id"], three)["objs"]
rest = [o for o in three if o not in F1]
F2 = A._disk_objs(ra["id"], rest)["objs"] if rest else {}
A._DISK_PART = keep
allgot = dict(F1)
allgot.update(F2)
ok(0 < len(F1) < 3 and rest and all(base64.b64decode(allgot[o]["b64"]) == body(o, "blob") for o in three), "a full answer leaves the rest to be asked again, and none is lost",
   (len(F1), len(F2)))
hist = git(AT, "rev-list", "--first-parent", "HEAD").split()
M = A._disk_objs(ra["id"], [head], 50)
ok(set(M["more"]) == set(hist[1:]) and all(v["t"] == "commit" for v in M["more"].values()), "more brings the history before a version in the same answer",
   (len(M["more"]), len(hist)))
subtrees = set()
for line in git(AT, "ls-tree", "-r", "-t", "HEAD").splitlines():
    meta, path = line.split("\t", 1)
    if meta.split()[1] == "tree":
        subtrees.add(meta.split()[2])
M2 = A._disk_objs(ra["id"], [tree], 50)
ok(set(M2["more"]) == subtrees, "and a tree's folders, all of them", (sorted(M2["more"]), sorted(subtrees)))

v0 = {}
for line in git(AT, "ls-tree", "-r", "v0").splitlines():
    meta, path = line.split("\t", 1)
    if meta.split()[1] == "blob":
        v0[meta.split()[2]] = int(git(AT, "cat-file", "-s", meta.split()[2]))
SZ = A._disk_sizes_of(ra["id"], sorted(v0) + ["bad"])
ok(SZ.get("ok") and SZ["sizes"] == v0, "the sizes of an older version's files, in one answer, from their headers", (SZ.get("sizes"), v0))

# ---------- brought from GitHub (6.83) ----------
place = os.path.join(T, "hubplace")
sp = A._hub_set_place(place)
hub = A._hub_place()
os.makedirs(os.path.join(hub, "ada"))
lumen = os.path.join(hub, "ada", "Lumen.git")
subprocess.run(["git", "clone", "-q", "--bare", QU, lumen], check=True, capture_output=True)
json.dump({"repos": {"ada/Lumen": {"full": "ada/Lumen", "name": "Lumen", "icon": "data:image/png;base64,iVBORw0KGgo=", "description": "An invented app",
                                   "git": os.path.join("ada", "Lumen.git"), "hub": os.path.join("ada", "Lumen.hub")}}}, open(os.path.join(hub, "index.json"), "w"))
L2 = A._disk_list()
lu = [x for x in L2["repos"] if x["name"] == "Lumen"]
lu = lu[0] if lu else {}
ok(sp.get("ok") and lu.get("ok") and lu.get("brought") and lu.get("full") == "ada/Lumen" and lu.get("icon", "").startswith("data:image/png") and lu.get("desc") == "An invented app",
   "a repository brought from GitHub is listed at once, with its name, its logo and its address", (sp, lu))
RL = A._disk_repo(lu.get("id"))
ok(RL.get("ok") and RL["rec"]["disk"]["brought"] and RL["rec"]["disk"]["full"] == "ada/Lumen" and RL["rec"]["work"] == {"README.md": ["100644", b1.id.decode()]},
   "it opens from the drive like any other", RL.get("error"))
FL = A._disk_forget(lu.get("id"))
ok(not FL.get("ok") and "brought from GitHub" in FL.get("error", ""), "one brought from GitHub is not forgotten from here, and that is said", FL)

# ---------- at once, and speed ----------
answers, errs = [], []


def asker(i):
    try:
        for _ in range(15):
            x = A._disk_objs(ra["id"], [head, tree, blob])
            answers.append(base64.b64decode(x["objs"][blob]["b64"]) == body(blob, "blob") and x["objs"][head]["t"] == "commit")
    except Exception as e:
        errs.append(str(e))


ts = [threading.Thread(target=asker, args=(i,)) for i in range(4)]
[t.start() for t in ts]
[t.join() for t in ts]
ok(len(answers) == 60 and all(answers) and not errs, "four askers at once all get the right answers", (len(answers), errs[:2]))
MANY = os.path.join(DRIVE, "Many")
os.makedirs(MANY)
git(MANY, "init", "-q", "-b", "main")
for i in range(3000):
    d = os.path.join(MANY, "d%02d" % (i % 40))
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "f%04d.txt" % i), "w").write("file %d\n" % i)
git(MANY, "add", "-A")
git(MANY, "commit", "-qm", "Three thousand files")
git(MANY, "gc", "-q")
rm = A._disk_add(MANY)
t0 = time.time()
RM = A._disk_repo(rm["id"])
t1 = time.time()
RM2 = A._disk_repo(rm["id"])
t2 = time.time()
ok(RM.get("ok") and RM["rec"]["fileCount"] == 3000 and RM["rec"]["disk"]["sized"] and t1 - t0 < 8 and t2 - t1 < 1.5,
   "3000 files read in a few seconds, and at once the second time (%.2f s, then %.2f s)" % (t1 - t0, t2 - t1), RM.get("error"))

# ---------- forget, a drive away, and nothing written ----------
FA = A._disk_forget(ra["id"])
FA2 = A._disk_forget(ra["id"])
L3 = A._disk_list()
ok(FA.get("ok") and not FA2.get("ok") and "does not know" in FA2.get("error", "") and "Atelier" not in [x["name"] for x in L3["repos"]] and os.path.isdir(os.path.join(AT, ".git")),
   "forgotten, Fabrica lists it no more, and the repository is still on the drive", (FA, FA2))
shutil.move(QU, QU + ".away")
L4 = A._disk_list()
quq = [x for x in L4["repos"] if x["name"] == "Quill"]
RQ = A._disk_repo(rq["id"])
shutil.move(QU + ".away", QU)
ok(quq and quq[0].get("ok") is False and "not connected" in quq[0].get("error", "") and not RQ.get("ok") and "drive connected" in RQ.get("error", ""),
   "a repository whose drive is away is still listed, and said to be away", (quq, RQ))
RQ2 = A._disk_repo(rq["id"])
ok(RQ2.get("ok") and RQ2["rec"]["work"] == {"README.md": ["100644", b1.id.decode()]}, "and opens again when it is back", RQ2.get("error"))
shutil.rmtree(MANY)
after = tree_hash(DRIVE)
ok(before == after, "read only: every file on the drive is as it was, to the byte and the time")

print("\n%d passed, %d failed" % (passed, failed))
shutil.rmtree(T, ignore_errors=True)
sys.exit(1 if failed else 0)
