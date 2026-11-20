"""Ingenium 7.57 · Fabrica's plan, stage 3, part two, on a drive: a version brought in from another idea (git cherry-pick) and changes put
aside (git stash), in a repository on the drive (build/desktop/app_pick_757.py).

Copies of the release's own Mac and Windows ingenium_app.py are patched (once; both compile; both bridges have the calls); the Mac copy is
imported (HOME in a temporary folder) and works on invented repositories git made (Ada writes, Theo brings versions in). What the page
would send is made here by git itself in a scratch clone (git cherry-pick --no-commit; git merge-file), and every answer is checked by git:
  pick, refused: a change waiting in the folder, the folder moved on, a version not in the repository, a version that joined two ideas,
    no words, a file that does not match its git name (nothing written, each time);
  pick, with nothing changed both ways: the version made at once, as git cherry-pick -x makes it in a clone (the same tree and words,
    the author and the author's time kept, one parent), the folder clean, git fsck content;
  pick, with a line changed both ways: the files written, git's CHERRY_PICK_HEAD and MERGE_MSG (its words, "# Conflicts:"), the index
    marked as git marks it, git itself says a cherry-pick is under way; the record says it (kind pick, the files left); Keep refused while
    a file holds both versions; resolved and kept: one parent, the picked version's author and time, git's pick files and Fabrica's note
    gone, the folder clean;
  a pick stopped: the files as the version before held them, what she wrote saved aside, git's pick files gone, the folder clean;
  a pick git itself left: said from MERGE_MSG, kept with the picked version's author;
  put aside: refused with nothing waiting and during a pick; then a changed file, a staged new file, a removed file and a file git does not
    know put aside: git stash list shows git's words, W has three parents (the version out, I, U), W's, I's and U's trees are those git's
    own stash push --include-untracked makes of the same folder, refs/stash's log is git's line, the folder is clean, and git stash pop
    (git's own) brings everything back; with words, "On main: <words>";
  the list, newest first; back (apply and pop) with the plan the page makes: the files back, the entry dropped (refs/stash and its log
    gone with the last one); a line changed both ways: both versions in the file, the index marked, the entry kept; drop by number;
    refusals (something waiting, an entry that changed, a number not there);
  a bare repository: refused, saying where to bring the version in.
    python3 -I rig/t_757_drive_pick.py <Mac ingenium_app.py> <Windows ingenium_app.py>
"""
import base64, importlib.util, json, os, py_compile, shutil, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
P757 = os.path.join(HERE, "..", "build", "desktop", "app_pick_757.py")
PFIX = os.path.join(HERE, "..", "build", "desktop", "app_disk_fix_757.py")
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


T = tempfile.mkdtemp(prefix="disk757-")
copies = {}
for k, src in (("mac", MAC), ("win", WIN)):
    dst = os.path.join(T, k, "ingenium_app.py")
    os.makedirs(os.path.dirname(dst))
    shutil.copy(src, dst)
    f1 = subprocess.run([sys.executable, PFIX, dst], capture_output=True, text=True)
    f2 = subprocess.run([sys.executable, PFIX, dst], capture_output=True, text=True)
    fb = open(dst, encoding="utf-8").read()
    ok(f1.returncode == 0 and "already patched" in f2.stdout and fb.count('_DISK = {"lock": ') == 1 and "_DISK_SEAL = {" in fb and '_DISK["key"]' not in fb,
       "the %s app: the disk seal's table has a name of its own, and the drive's table is the only _DISK (app_disk_fix_757.py)" % k, (f1.stdout, f1.stderr, f2.stdout))
    r1 = subprocess.run([sys.executable, P757, dst], capture_output=True, text=True)
    r2 = subprocess.run([sys.executable, P757, dst], capture_output=True, text=True)
    try:
        py_compile.compile(dst, doraise=True)
        comp = True
    except Exception as e:
        comp = str(e)
    body = open(dst, encoding="utf-8").read()
    calls = all(body.count("    def %s(self, " % n) == 2 for n in ("disk_pick", "disk_stash_push", "disk_stash_list", "disk_stash_apply", "disk_stash_drop"))
    ok(r1.returncode == 0 and "patched" in r1.stdout and "already patched" in r2.stdout and comp is True and calls,
       "the %s app is patched once, both bridges have the five calls, and it compiles" % k, (r1.stdout, r1.stderr, r2.stdout, comp))
    copies[k] = dst

HOME = os.path.join(T, "home")
os.makedirs(HOME)
os.environ["HOME"] = HOME
ENV = dict(os.environ, GIT_CONFIG_NOSYSTEM="1", GIT_AUTHOR_NAME="Ada Ferreira", GIT_AUTHOR_EMAIL="ada@example.invalid",
           GIT_COMMITTER_NAME="Ada Ferreira", GIT_COMMITTER_EMAIL="ada@example.invalid")


def git(cwd, *a, check=True, env=None):
    r = subprocess.run(["git"] + list(a), cwd=cwd, capture_output=True, env=env or ENV)
    if check and r.returncode != 0:
        raise RuntimeError("git %s: %s" % (" ".join(a), r.stderr.decode(errors="replace")))
    return r.stdout.decode()


spec = importlib.util.spec_from_file_location("ingenium_app", copies["mac"])
A = importlib.util.module_from_spec(spec)
spec.loader.exec_module(A)

D = os.path.join(T, "drive")
W = os.path.join(D, "Tide Clock")
os.makedirs(W)


def put(rel, text, base=None):
    fs = os.path.join(base or W, *rel.split("/"))
    os.makedirs(os.path.dirname(fs), exist_ok=True)
    with open(fs, "w", newline="\n") as fh:
        fh.write(text)


def read(rel, base=None):
    try:
        with open(os.path.join(base or W, *rel.split("/")), encoding="utf-8", newline="") as fh:
            return fh.read()
    except OSError:
        return None


def tip(ref, base=None):
    return git(base or W, "rev-parse", ref).strip()


def status(base=None):
    return git(base or W, "status", "--porcelain")


git(W, "init", "-q", "-b", "main")
git(W, "config", "user.name", "Ada Ferreira")
git(W, "config", "user.email", "ada@example.invalid")
put("app/tide.js", "function next(){\n  return 6.2;\n}\n")
put("README.md", "# Tide Clock\n\nHigh water, twice a day.\n")
put("old.txt", "an old note\n")
git(W, "add", "-A")
git(W, "commit", "-qm", "The first version")
git(W, "checkout", "-qb", "evening")
EV = dict(ENV, GIT_AUTHOR_DATE="2026-11-19T10:00:00+0100")
put("app/evening.js", "export const evening = 18.5;\n")
git(W, "add", "-A")
git(W, "commit", "-qm", "Evening tides", env=EV)
put("app/tide.js", "function next(){\n  return 6.25;\n}\n")
git(W, "add", "-A")
git(W, "commit", "-qm", "Finer figures\n\nThe next tide to the quarter hour.", env=EV)
put("README.md", "# Tide Clock\n\nHigh water, twice a day, and the evening tide.\n")
os.unlink(os.path.join(W, "old.txt"))
git(W, "add", "-A")
git(W, "commit", "-qm", "The evening, said", env=EV)
put("README.md", "# Tide Clock\n\nHigh water, by the moon.\n")
git(W, "add", "-A")
git(W, "commit", "-qm", "By the moon", env=EV)
git(W, "checkout", "-q", "main")
git(W, "checkout", "-qb", "joined")
git(W, "merge", "-q", "--no-ff", "-m", "Join the evening", "evening")
git(W, "checkout", "-q", "main")
put("README.md", "# Tide Clock\n\nHigh water, twice a day, by the harbour.\n")
git(W, "add", "-A")
git(W, "commit", "-qm", "The harbour")
rid = A._disk_add(W)["id"]


def rec():
    return (A._disk_repo2(rid).get("rec") or {})


def hashed(data):
    p = os.path.join(T, "hash.tmp")
    with open(p, "wb") as fh:
        fh.write(data)
    return git(W, "hash-object", p).strip()


def pick_plan(oid):
    """the pick as the page sends it, made here by git in a scratch clone (git cherry-pick --no-commit): each file the pick changes, by
    its git name; a file holding both versions whole, as the page makes it"""
    S = tempfile.mkdtemp(prefix="pick-", dir=T)
    git(S, "clone", "-q", W, "c")
    C = os.path.join(S, "c")
    git(C, "checkout", "-q", "main")
    git(C, "cherry-pick", "--no-commit", oid, check=False)
    conflicts = [x for x in git(C, "diff", "--name-only", "--diff-filter=U").split("\n") if x]
    head = {}
    for line in git(C, "ls-tree", "-r", "HEAD").split("\n"):
        if line:
            meta, path = line.split("\t", 1)
            head[path] = meta.split(" ")
    files, now = {}, set()
    for root, dirs, fs in os.walk(C):
        if ".git" in dirs:
            dirs.remove(".git")
        for f in fs:
            full = os.path.join(root, f)
            rel = os.path.relpath(full, C).replace(os.sep, "/")
            now.add(rel)
            data = open(full, "rb").read()
            oid2 = hashed(data)
            if rel in head and head[rel][2] == oid2:
                continue
            files[rel] = {"oid": oid2, "mode": "100644", "b64": base64.b64encode(data).decode() if rel in conflicts else None}
    for rel in head:
        if rel not in now:
            files[rel] = None
    c = git(W, "log", "-1", "--format=%B", oid).rstrip()
    return {"ours": tip("main"), "pick": oid, "msg": c + "\n\n(cherry picked from commit %s)" % oid, "files": files, "conflicts": conflicts}


ev = [x for x in git(W, "log", "--format=%H %s", "evening").split("\n") if x]
O = {s: h for h, s in (x.split(" ", 1) for x in ev)}

# ---------- 1. a pick refused ----------
put("README.md", "# Tide Clock\n\nA change waiting.\n")
x = A._disk_pick(rid, pick_plan(O["Evening tides"]), "Theo", "theo@example.invalid")
ok(not x.get("ok") and "Keep or put aside" in x.get("error", "") and not os.path.exists(os.path.join(W, "app/evening.js")),
   "a pick is refused while a change waits in the folder, and nothing is written", x)
git(W, "checkout", "--", "README.md")
pl = pick_plan(O["Evening tides"])
x = A._disk_pick(rid, dict(pl, ours="0" * 40))
ok(not x.get("ok") and "moved on" in x.get("error", ""), "refused when the folder moved on since Fabrica read it", x)
x = A._disk_pick(rid, dict(pl, pick="1" * 40))
ok(not x.get("ok") and "not in the repository" in x.get("error", ""), "refused for a version not in the repository", x)
x = A._disk_pick(rid, dict(pl, pick=tip("joined")))
ok(not x.get("ok") and "joined two ideas" in x.get("error", ""), "refused for a version that joined two ideas", x)
x = A._disk_pick(rid, dict(pl, msg=""))
ok(not x.get("ok") and "words" in x.get("error", ""), "refused with no words", x)
bad = json.loads(json.dumps(pl))
k0 = sorted(bad["files"])[0]
bad["files"][k0] = {"oid": "2" * 40, "mode": "100644", "b64": base64.b64encode(b"not this\n").decode()}
x = A._disk_pick(rid, bad)
ok(not x.get("ok") and "did not arrive whole" in x.get("error", "") and status() == "" and tip("main") == pl["ours"],
   "refused when a file does not match its git name; nothing written, the folder clean", x)

# ---------- 2. a pick with nothing changed both ways ----------
x = A._disk_pick(rid, pl, "Theo", "theo@example.invalid")
made = x.get("commit")
S = tempfile.mkdtemp(prefix="gitpick-", dir=T)
git(S, "clone", "-q", W, "c")
C = os.path.join(S, "c")
git(C, "checkout", "-q", "main")
git(C, "reset", "-q", "--hard", pl["ours"])
git(C, "cherry-pick", "-x", O["Evening tides"])
ok(x.get("ok") and made == tip("main") and not x.get("conflicts"), "with nothing changed both ways the version is made at once", x)
ok(git(W, "rev-parse", "main^{tree}").strip() == git(C, "rev-parse", "HEAD^{tree}").strip(), "   its files are those git cherry-pick -x makes")
ok(git(W, "log", "-1", "--format=%B", "main") == git(C, "log", "-1", "--format=%B", "HEAD"),
   "   its words are git's own, ending (cherry picked from commit <id>)", (git(W, "log", "-1", "--format=%B", "main"), git(C, "log", "-1", "--format=%B", "HEAD")))
ok(git(W, "log", "-1", "--format=%an|%ae|%ad", "--date=raw", "main") == git(W, "log", "-1", "--format=%an|%ae|%ad", "--date=raw", O["Evening tides"]),
   "   the author and the author's time are the picked version's", git(W, "log", "-1", "--format=%an|%ae|%ad", "--date=raw", "main"))
ok(len(git(W, "rev-list", "--parents", "-n1", "main").split()) == 2 and status() == "" and git(W, "fsck", "--no-progress", check=False) == "",
   "   one parent; the folder clean; git fsck finds nothing wrong", status())
ok(not os.path.exists(os.path.join(W, ".git", "CHERRY_PICK_HEAD")), "   no pick is left under way")

# ---------- 3. a pick with a line changed both ways ----------
pl = pick_plan(O["The evening, said"])
ok(pl["conflicts"] == ["README.md"], "the scratch clone finds README.md changed both ways (the plan is real)", pl["conflicts"])
x = A._disk_pick(rid, pl, "Theo", "theo@example.invalid")
ok(x.get("ok") and x.get("conflicts") == ["README.md"] and tip("main") == pl["ours"], "a line changed both ways: the pick is left in the folder, no version made", x)
ok(read(".git/CHERRY_PICK_HEAD", W) == O["The evening, said"] + "\n", "   git's CHERRY_PICK_HEAD names the version brought in")
mm = read(".git/MERGE_MSG", W) or ""
ok(mm.startswith(pl["msg"] + "\n") and "\n# Conflicts:\n#\tREADME.md\n" in mm, "   MERGE_MSG holds its words, then git's # Conflicts lines", mm)
ok("<<<<<<<" in (read("README.md") or "") and ">>>>>>>" in (read("README.md") or "") and not os.path.exists(os.path.join(W, "old.txt")),
   "   README.md holds both versions between git's marks; old.txt, taken away by the version, is gone")
ok("UU README.md" in status() and "You are currently cherry-picking commit" in git(W, "status"),
   "   git's index marks README.md, and git itself says a cherry-pick is under way", status())
m = rec().get("merging") or {}
ok(m.get("kind") == "pick" and m.get("pick") == O["The evening, said"] and m.get("left") == ["README.md"] and "The evening, said" in (m.get("label") or "")
   and "(cherry picked from commit" in (m.get("msg") or ""), "   the record says a pick under way, its file still holding both versions, and its words", m)
x = A._disk_commit(rid, pl["msg"], "Theo", "theo@example.invalid")
ok(not x.get("ok") and "both versions" in x.get("error", "") and "README.md" in x.get("error", ""), "Keep is refused while README.md holds both versions", x)
put("README.md", "# Tide Clock\n\nHigh water, twice a day, by the harbour and in the evening.\n")
x = A._disk_commit(rid, pl["msg"], "Theo", "theo@example.invalid")
ok(x.get("ok") and x.get("commit") == tip("main"), "resolved, Keep makes the version", x)
ok(len(git(W, "rev-list", "--parents", "-n1", "main").split()) == 2, "   with one parent, as git cherry-pick --continue")
ok(git(W, "log", "-1", "--format=%an|%ae|%ad", "--date=raw", "main") == git(W, "log", "-1", "--format=%an|%ae|%ad", "--date=raw", O["The evening, said"]),
   "   the picked version's author and the author's time", git(W, "log", "-1", "--format=%an|%ae|%ad", "--date=raw", "main"))
ok(git(W, "log", "-1", "--format=%B", "main").rstrip() == pl["msg"], "   its words, with git's own last line", git(W, "log", "-1", "--format=%B", "main"))
ok(not any(os.path.exists(os.path.join(W, ".git", f)) for f in ("CHERRY_PICK_HEAD", "MERGE_MSG", "ingenium-merge.json")) and status() == ""
   and git(W, "fsck", "--no-progress", check=False) == "", "   git's pick files and Fabrica's note are gone; the folder clean; git fsck content", status())

# ---------- 4. a pick stopped ----------
pl = pick_plan(O["By the moon"])
x = A._disk_pick(rid, pl)
put("README.md", (read("README.md") or "") + "her half-done edit\n")
x2 = A._disk_merge_stop(rid)
ok(x.get("ok") and x.get("conflicts") and x2.get("ok") and x2.get("saved", 0) >= 1 and status() == "" and tip("main") == pl["ours"],
   "a pick stopped (git cherry-pick --abort): the files as the version before held them, the folder clean", (x, x2, status()))
ok(not os.path.exists(os.path.join(W, ".git", "CHERRY_PICK_HEAD")) and not os.path.exists(os.path.join(W, ".git", "ingenium-merge.json"))
   and x2.get("aside") and os.path.isdir(os.path.join(W, x2["aside"])), "   git's pick files gone; what she wrote saved aside, inside the folder", x2)

# ---------- 5. a pick git itself left ----------
git(W, "-c", "user.name=Theo", "-c", "user.email=theo@example.invalid", "cherry-pick", O["By the moon"], check=False)
m = rec().get("merging") or {}
ok(m.get("kind") == "pick" and m.get("git") is True and "By the moon" in (m.get("label") or "") and m.get("left") == ["README.md"],
   "a pick git itself left is said from MERGE_MSG, its file found by its marks", m)
put("README.md", "# Tide Clock\n\nHigh water, by the harbour, the evening and the moon.\n")
x = A._disk_commit(rid, "By the moon\n\n(cherry picked by git)", "Theo", "theo@example.invalid")
ok(x.get("ok") and git(W, "log", "-1", "--format=%an|%ad", "--date=raw", "main") == git(W, "log", "-1", "--format=%an|%ad", "--date=raw", O["By the moon"])
   and not os.path.exists(os.path.join(W, ".git", "CHERRY_PICK_HEAD")) and status() == "", "   kept with the picked version's author and time; nothing left under way", x)

# ---------- 6. changes put aside ----------
x = A._disk_stash_push(rid)
ok(not x.get("ok") and "Nothing waits" in x.get("error", ""), "putting aside is refused with nothing waiting", x)
before = tip("main")


def make_changes(base):
    put("app/tide.js", "function next(){\n  return 6.5;\n}\n", base)
    put("app/staged.js", "export const staged = true;\n", base)
    git(base, "add", "app/staged.js")
    os.unlink(os.path.join(base, "app", "evening.js"))
    put("notes/unknown.txt", "a file git does not know\n", base)


S2 = tempfile.mkdtemp(prefix="gitstash-", dir=T)
git(S2, "clone", "-q", W, "c")
C2 = os.path.join(S2, "c")
git(C2, "config", "user.name", "Ada Ferreira")
git(C2, "config", "user.email", "ada@example.invalid")
make_changes(C2)
git(C2, "stash", "push", "--include-untracked", "-q")
make_changes(W)
x = A._disk_stash_push(rid, None, "Theo", "theo@example.invalid")
w = git(W, "rev-parse", "--verify", "-q", "refs/stash", check=False).strip()
ok(x.get("ok") and x.get("oid") == w and status() == "", "put aside: the files go back to the version out, the folder clean (the file git did not know too)", (x, status()))
ok(git(W, "stash", "list").strip() == "stash@{0}: WIP on main: %s %s" % (before[:7], git(W, "log", "-1", "--format=%s", "main").strip()),
   "   git stash list shows git's own words", git(W, "stash", "list"))
pw = git(W, "rev-list", "--parents", "-n1", w).split()
ok(len(pw) == 4 and pw[1] == before, "   W has three parents: the version out, I and U", pw)
for name, a, b in (("W", w, tip("refs/stash", C2)), ("I", w + "^2", tip("refs/stash", C2) + "^2"), ("U", w + "^3", tip("refs/stash", C2) + "^3")):
    ok(git(W, "rev-parse", a + "^{tree}").strip() == git(C2, "rev-parse", b + "^{tree}").strip(), "   %s's files are those git stash push --include-untracked makes" % name)
for name, a, b in (("I", w + "^2", "refs/stash^2"), ("U", w + "^3", "refs/stash^3")):
    ok(git(W, "log", "-1", "--format=%B", a) == git(C2, "log", "-1", "--format=%B", b), "   %s's words are git's" % name, git(W, "log", "-1", "--format=%B", a))
log = read(".git/logs/refs/stash") or ""
ok(log.count("\n") == 1 and log.startswith("0" * 40 + " " + w + " Ada Ferreira <ada@example.invalid> ") and log.rstrip("\n").endswith("\tWIP on main: %s %s" % (before[:7], git(W, "log", "-1", "--format=%s", "main").strip())),
   "   refs/stash's log has git's line", log)
git(W, "stash", "pop", "-q")
ok(read("app/tide.js") == "function next(){\n  return 6.5;\n}\n" and read("app/staged.js") and read("notes/unknown.txt") and not os.path.exists(os.path.join(W, "app", "evening.js"))
   and git(W, "stash", "list") == "", "git stash pop (git's own) brings everything back", status())
x = A._disk_stash_push(rid, "Halfway through the moon", "Theo", "theo@example.invalid")
ok(x.get("ok") and git(W, "stash", "list").strip() == "stash@{0}: On main: Halfway through the moon", "with her words: On main: <words>", git(W, "stash", "list"))
put("README.md", (read("README.md") or "") + "a second change\n")
x = A._disk_stash_push(rid)
L = A._disk_stash_list(rid)
lst = L.get("list") or []
ok(L.get("ok") and [e["n"] for e in lst] == [0, 1] and lst[0]["msg"].startswith("WIP on main:") and lst[1]["msg"] == "On main: Halfway through the moon"
   and lst[1]["branch"] == "main" and "notes/unknown.txt" in lst[1]["files"] and "app/tide.js" in lst[1]["files"], "the list, newest first, with each one's files", lst)


def apply_plan(n):
    """what the page sends to bring entry n back onto files with nothing waiting: W's files and U's, merged three ways (here no file
    changed both ways, or made with git merge-file)"""
    e = (A._disk_stash_list(rid).get("list") or [])[n]
    wv = e["oid"]
    base = {}
    for line in git(W, "ls-tree", "-r", wv + "^1").split("\n"):
        if line:
            meta, path = line.split("\t", 1)
            base[path] = meta.split(" ")[2]
    theirs = {}
    for t in (wv, wv + "^3"):
        r = git(W, "ls-tree", "-r", t, check=False)
        for line in r.split("\n"):
            if line:
                meta, path = line.split("\t", 1)
                theirs[path] = meta.split(" ")[2]
    ours = {}
    for line in git(W, "ls-tree", "-r", "HEAD").split("\n"):
        if line:
            meta, path = line.split("\t", 1)
            ours[path] = meta.split(" ")[2]
    files, conflicts = {}, []
    for p in sorted(set(base) | set(theirs) | set(ours)):
        b, o, t = base.get(p), ours.get(p), theirs.get(p)
        if t == b or t == o:
            continue
        if o == b:
            files[p] = None if t is None else {"oid": t, "mode": "100644", "b64": None}
            continue
        # changed both ways: git merge-file, as the page's merge makes it
        def blob(x):
            fp = os.path.join(T, "mf-%s" % x)
            with open(fp, "wb") as fh:
                fh.write(subprocess.run(["git", "cat-file", "blob", x], cwd=W, capture_output=True).stdout)
            return fp
        r = subprocess.run(["git", "merge-file", "-p", "-L", "now", "-L", "base", "-L", "put aside", blob(o), blob(b), blob(t)], cwd=W, capture_output=True)
        data = r.stdout
        files[p] = {"oid": hashed(data), "mode": "100644", "b64": base64.b64encode(data).decode()}
        conflicts.append(p)
    return {"w": wv, "ours": tip("HEAD"), "files": files, "conflicts": conflicts}


x = A._disk_stash_apply(rid, 0, dict(apply_plan(0), w="3" * 40), True)
ok(not x.get("ok") and "changed since" in x.get("error", ""), "back is refused when the entry is no longer the one the page read", x)
put("README.md", (read("README.md") or "") + "waiting\n")
x = A._disk_stash_apply(rid, 0, apply_plan(0), True)
ok(not x.get("ok") and "nothing waiting" in x.get("error", ""), "back is refused while something waits", x)
git(W, "checkout", "--", "README.md")
x = A._disk_stash_apply(rid, 0, apply_plan(0), True)
ok(x.get("ok") and x.get("dropped") and "a second change" in (read("README.md") or "") and len(A._disk_stash_list(rid).get("list") or []) == 1,
   "back and dropped (git stash pop): the change returns, the entry goes", x)
ok(" M README.md" in status() and git(W, "stash", "list").strip() == "stash@{0}: On main: Halfway through the moon", "   not staged, as git stash pop leaves it; git's list agrees", status())
git(W, "checkout", "--", "README.md")
x = A._disk_stash_apply(rid, 0, apply_plan(0), True)
ok(x.get("ok") and x.get("dropped") and read("notes/unknown.txt") and read("app/tide.js") == "function next(){\n  return 6.5;\n}\n" and read("app/staged.js")
   and not os.path.exists(os.path.join(W, ".git", "refs", "stash")) and not os.path.exists(os.path.join(W, ".git", "logs", "refs", "stash")) and git(W, "stash", "list") == "",
   "the last one back: its files and the file git did not know return; refs/stash and its log go with it", (x, status()))
for rel in ("notes/unknown.txt", "app/staged.js"):
    os.unlink(os.path.join(W, *rel.split("/")))
git(W, "checkout", "--", ".")
git(W, "reset", "-q", "--hard")
ok(status() == "", "(the folder clean again for the next part)", status())
# a line changed both ways on the way back
put("README.md", "# Tide Clock\n\nPut aside: the tide at noon.\n")
A._disk_stash_push(rid, "Noon")
put("README.md", "# Tide Clock\n\nKept meanwhile: the tide at dusk.\n")
git(W, "commit", "-qam", "Dusk")
x = A._disk_stash_apply(rid, 0, apply_plan(0), True)
ok(x.get("ok") and x.get("conflicts") == ["README.md"] and not x.get("dropped") and "<<<<<<<" in (read("README.md") or "") and "UU README.md" in status()
   and git(W, "stash", "list").strip() == "stash@{0}: On main: Noon", "a line changed both ways: both versions in the file, the index marked, the entry kept (as git)", (x, status()))
git(W, "reset", "-q", "--hard")
x = A._disk_stash_drop(rid, 3)
ok(not x.get("ok") and "number" in x.get("error", ""), "drop: a number not there is refused", x)
x = A._disk_stash_drop(rid, 0)
ok(x.get("ok") and x.get("dropped") == "On main: Noon" and git(W, "stash", "list") == "", "drop by number: gone, as git stash drop", x)
git(W, "cherry-pick", O["By the moon"], check=False)
put("notes/x.txt", "x\n")
x = A._disk_stash_push(rid)
ok(not x.get("ok") and ("Finish or stop" in x.get("error", "")), "putting aside is refused while a pick is under way", x)
os.unlink(os.path.join(W, "notes", "x.txt"))
git(W, "cherry-pick", "--abort", check=False)

# ---------- 7. a bare repository ----------
B = os.path.join(D, "Tide Clock bare.git")
git(D, "clone", "-q", "--bare", W, B)
bid = A._disk_add(B)["id"]
x = A._disk_pick(bid, {"ours": tip("main"), "pick": O["Evening tides"], "msg": "x", "files": {}, "conflicts": []})
ok(not x.get("ok") and "Make a working copy" in x.get("error", ""), "a bare repository: refused, saying where to bring the version in", x)
fr = subprocess.run(["git", "fsck", "--no-progress"], cwd=W, capture_output=True, env=ENV)
bad = [x for x in (fr.stdout + fr.stderr).decode(errors="replace").split("\n") if x.strip() and not x.startswith("dangling ")]
ok(fr.returncode == 0 and not bad, "git fsck finds nothing wrong at the end (the dropped entries are dangling commits, as after git stash drop)", (fr.returncode, bad))

print("\n%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
