"""Ingenium 6.87 · Fabrica, phase 2, second stage: working on the drive, tested against git (build/desktop/app_disk2_687.py).

Her words (12 November 2026), on the preview of this stage: "I approve of the preview, please push it everywhere." Copies of the Mac
and Windows ingenium_app.py (6.86's, which carry app_disk_686.py) are patched (once; both compile; both bridges have the calls); the Mac
copy is imported (HOME in a temporary folder) and works on invented repositories git made. Every answer is checked by git itself:
  the folder: a file changed in another program, one taken away, one new, one .gitignore names (left out); each changed file served by
    its git name, byte for byte;
  keep: one version with every change (the one taken away too), the repository's own name from git's settings; git finds the folder
    clean, the version in its log, and nothing wrong (git fsck);
  put back: a changed file as it was kept, a new file moved aside, and both first saved in .git/ingenium-put-back/;
  writes: a file written, taken away (moved aside) and moved, in the folder; a path that would leave the folder or reach .git refused;
  ideas and tags: an idea made, an annotated tag written as the page makes it, an idea taken away; a branch that moved on the drive
    meanwhile is not moved (nothing changed); an object whose git name does not match refused (nothing written);
  the folder follows: a merge made in the page moves the branch worked on, and the folder follows (a file taken away, a file new, git's
    index), git finds it clean; switching to another idea, the folder follows; refused while a change waits to be kept, or while a new
    file of hers stands where the other idea puts one (nothing changed); a file .gitignore names in the way is moved aside;
  a bare repository: nothing to keep (said so), an idea made on it, and a working copy made from it, listed at once, its files there.
    python3 -I rig/t_687_disk_write.py <Mac ingenium_app.py> <Windows ingenium_app.py>
"""
import base64, hashlib, importlib.util, json, os, py_compile, shutil, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
P686 = os.path.join(HERE, "..", "build", "desktop", "app_disk_686.py")
P687 = os.path.join(HERE, "..", "build", "desktop", "app_disk2_687.py")
MAC, WIN = sys.argv[1], sys.argv[2]
passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    if c:
        passed += 1
        print("PASS " + m)
    else:
        failed += 1
        print("FAIL " + m + ("" if d is None else "  " + str(d)[:900]))


T = tempfile.mkdtemp(prefix="disk687-")
copies = {}
for k, src in (("mac", MAC), ("win", WIN)):
    dst = os.path.join(T, k, "ingenium_app.py")
    os.makedirs(os.path.dirname(dst))
    shutil.copy(src, dst)
    subprocess.run([sys.executable, P686, dst], capture_output=True, text=True)
    r1 = subprocess.run([sys.executable, P687, dst], capture_output=True, text=True)
    r2 = subprocess.run([sys.executable, P687, dst], capture_output=True, text=True)
    try:
        py_compile.compile(dst, doraise=True)
        comp = True
    except Exception as e:
        comp = str(e)
    body = open(dst, encoding="utf-8").read()
    ok(r1.returncode == 0 and "patched" in r1.stdout and "already patched" in r2.stdout and comp is True and body.count("    def disk_commit(self, rid, message, name=None, email=None):") == 2
       and body.count("        return _disk_repo2(rid)") == 2, "the %s app is patched once, both of its bridges have the calls, and it compiles" % k, (r1.stdout, r1.stderr, r2.stdout, comp))
    copies[k] = dst

HOME = os.path.join(T, "home")
os.makedirs(HOME)
os.environ["HOME"] = HOME
ENV = dict(os.environ, GIT_CONFIG_NOSYSTEM="1", GIT_AUTHOR_NAME="Ada Ferreira", GIT_AUTHOR_EMAIL="ada@example.invalid",
           GIT_COMMITTER_NAME="Ada Ferreira", GIT_COMMITTER_EMAIL="ada@example.invalid")


def git(cwd, *a):
    r = subprocess.run(["git"] + list(a), cwd=cwd, capture_output=True, env=ENV)
    if r.returncode != 0:
        raise RuntimeError("git %s: %s" % (" ".join(a), r.stderr.decode(errors="replace")))
    return r.stdout.decode()


spec = importlib.util.spec_from_file_location("ingenium_app", copies["mac"])
A = importlib.util.module_from_spec(spec)
spec.loader.exec_module(A)

D = os.path.join(T, "drive")
W = os.path.join(D, "Atelier")
os.makedirs(os.path.join(W, "src"))
git(W, "init", "-q", "-b", "main")
git(W, "config", "user.name", "Ada Ferreira")
git(W, "config", "user.email", "ada@example.invalid")
open(os.path.join(W, "README.md"), "w").write("# Atelier\n\nAn invented app.\n")
open(os.path.join(W, "src", "app.js"), "w").write("console.log('one');\n")
open(os.path.join(W, "old.txt"), "w").write("to be taken away\n")
open(os.path.join(W, ".gitignore"), "w").write("*.log\n")
git(W, "add", "-A")
git(W, "commit", "-qm", "The first version")
git(W, "branch", "idea")
rid = A._disk_add(W)["id"]


def rec():
    x = A._disk_repo2(rid)
    return x.get("rec") or {}


r0 = rec()
ok(r0.get("disk", {}).get("worktree") is True and r0.get("changes") == [], "a working copy: its folder read, nothing waiting", (r0.get("disk"), r0.get("changes")))

# ---------- the folder, changed in another program ----------
open(os.path.join(W, "src", "app.js"), "w").write("console.log('two');\n")
os.remove(os.path.join(W, "old.txt"))
open(os.path.join(W, "new.md"), "w").write("A new page.\n")
open(os.path.join(W, "build.log"), "w").write("ignored\n")
r1 = rec()
kinds = {c["path"]: c["kind"] for c in r1.get("changes", [])}
ok(kinds == {"src/app.js": "changed", "old.txt": "removed", "new.md": "added"}, "the folder's changes, made in another program: changed, taken away, new; .gitignore's file left out", kinds)
ok("old.txt" not in r1["work"] and "new.md" in r1["work"] and "build.log" not in r1["work"], "its files as they are in the folder", sorted(r1["work"]))
app_oid = r1["work"]["src/app.js"][1]
O = A._disk_objs2(rid, [app_oid])
raw = base64.b64decode(O["objs"][app_oid]["b64"]) if O["objs"].get(app_oid) else b""
ok(raw == b"console.log('two');\n" and hashlib.sha1(b"blob %d\0" % len(raw) + raw).hexdigest() == app_oid, "a changed file is served by its git name, byte for byte", O["objs"].get(app_oid))
S = A._disk_sizes_of2(rid, [app_oid])
ok(S.get("sizes", {}).get(app_oid) == len(raw), "and its size", S)

# ---------- keep ----------
C = A._disk_commit(rid, "Two, and a new page", "Someone Else", "else@example.invalid")
log1 = git(W, "log", "-1", "--format=%an <%ae>|%s")
ok(C.get("ok") and log1.strip() == "Ada Ferreira <ada@example.invalid>|Two, and a new page", "kept as one version, with the repository's own name from git's settings", (C, log1))
ok(git(W, "status", "--porcelain").strip() == "", "git finds the folder clean", git(W, "status", "--porcelain"))
names = git(W, "show", "--name-status", "--format=", "HEAD").split()
ok(names == ["A", "new.md", "D", "old.txt", "M", "src/app.js"], "the version holds every change, the file taken away too", names)
ok(subprocess.run(["git", "fsck", "--no-progress"], cwd=W, capture_output=True, env=ENV).returncode == 0, "git fsck finds nothing wrong")
ok(not A._disk_commit(rid, "Again", None, None).get("ok") and "Nothing in its folder waits" in A._disk_commit(rid, "Again", None, None).get("error", ""), "nothing waiting: said so")
ok("A few words first" in A._disk_commit(rid, "  ", None, None).get("error", ""), "a version needs a few words first")

# ---------- put back ----------
open(os.path.join(W, "README.md"), "w").write("# Atelier\n\nScribbled over.\n")
open(os.path.join(W, "draft.txt"), "w").write("a draft of hers\n")
PB = A._disk_put_back(rid, ["README.md", "draft.txt"])
aside = os.path.join(W, *(PB.get("aside") or "x").split("/"))
ok(PB.get("ok") and open(os.path.join(W, "README.md")).read() == "# Atelier\n\nAn invented app.\n" and not os.path.exists(os.path.join(W, "draft.txt")),
   "put back: the file as it was kept, the new file gone from the folder", PB)
ok(open(os.path.join(aside, "README.md")).read() == "# Atelier\n\nScribbled over.\n" and open(os.path.join(aside, "draft.txt")).read() == "a draft of hers\n" and PB.get("aside", "").startswith(".git/ingenium-put-back/"),
   "and both first saved in .git/ingenium-put-back/: nothing is lost", PB.get("aside"))
ok(git(W, "status", "--porcelain").strip() == "", "git finds the folder clean again", git(W, "status", "--porcelain"))

# ---------- writes in the folder ----------
WF = A._disk_write_file(rid, "docs/guide.md", base64.b64encode(b"# The guide\n").decode())
ok(WF.get("ok") and open(os.path.join(W, "docs", "guide.md")).read() == "# The guide\n", "a file written into the folder", WF)
bad = [A._disk_write_file(rid, p, base64.b64encode(b"x").decode()) for p in ("../evil.txt", ".git/config", "/etc/x", "a/../../b")]
ok(all(not b.get("ok") for b in bad) and not os.path.exists(os.path.join(D, "evil.txt")), "a path that would leave the folder, or reach .git, is refused", bad)
RM = A._disk_remove_file(rid, "docs/guide.md")
ok(RM.get("ok") and not os.path.exists(os.path.join(W, "docs", "guide.md")) and os.path.exists(os.path.join(W, *RM["aside"].split("/"), "docs", "guide.md")), "a file taken away is moved aside", RM)
MV = A._disk_move_file(rid, "new.md", "pages/new.md")
ok(MV.get("ok") and os.path.exists(os.path.join(W, "pages", "new.md")) and not os.path.exists(os.path.join(W, "new.md")), "a file moved, in the folder", MV)
k2 = {c["path"]: c["kind"] for c in rec().get("changes", [])}
ok(k2 == {"new.md": "removed", "pages/new.md": "added"}, "and Fabrica sees it as git does", k2)
A._disk_put_back(rid, None)
ok(git(W, "status", "--porcelain").strip() == "", "everything put back at once", git(W, "status", "--porcelain"))

# ---------- ideas and tags, written as the page makes them ----------
head = git(W, "rev-parse", "HEAD").strip()
B1 = A._disk_write(rid, {"updates": [{"ref": "refs/heads/night", "old": None, "new": head, "why": "new idea"}]})
ok(B1.get("ok") and git(W, "rev-parse", "night").strip() == head, "an idea made on the drive", B1)
tag_body = ("object %s\ntype commit\ntag v1\ntagger Ada Ferreira <ada@example.invalid> 1762950000 +0000\n\nThe first release\n" % head).encode()
tag_oid = hashlib.sha1(b"tag %d\0" % len(tag_body) + tag_body).hexdigest()
B2 = A._disk_write(rid, {"objects": [[tag_oid, "tag", base64.b64encode(tag_body).decode()]], "updates": [{"ref": "refs/tags/v1", "old": None, "new": tag_oid}]})
ok(B2.get("ok") and git(W, "tag", "-n1").split() == ["v1", "The", "first", "release"] and git(W, "cat-file", "-t", "v1").strip() == "tag", "an annotated tag, written as the page makes it", (B2, git(W, "tag", "-n1")))
B3 = A._disk_write(rid, {"updates": [{"ref": "refs/heads/night", "old": "0" * 40, "new": head}]})
ok(not B3.get("ok") and "moved on the drive since Fabrica read it" in B3.get("error", "") and git(W, "rev-parse", "night").strip() == head, "a branch that moved meanwhile is not moved: nothing changed", B3)
bad_body = b"not what the name says\n"
B4 = A._disk_write(rid, {"objects": [["1" * 40, "blob", base64.b64encode(bad_body).decode()]], "updates": []})
ok(not B4.get("ok") and "does not match its git name" in B4.get("error", ""), "an object whose git name does not match is refused: nothing written", B4)
B5 = A._disk_write(rid, {"updates": [{"ref": "refs/heads/night", "old": head, "new": None}]})
ok(B5.get("ok") and "night" not in git(W, "branch", "--list", "night"), "an idea taken away", B5)


# ---------- the folder follows its branch ----------
def obj(t, body):
    o = hashlib.sha1(("%s %d" % (t, len(body))).encode() + b"\0" + body).hexdigest()
    return [o, t, base64.b64encode(body).decode()]


def tree_of(entries):
    out = b""
    for mode, name, oid in sorted(entries, key=lambda e: e[1]):
        out += mode.encode() + b" " + name.encode() + b"\0" + bytes.fromhex(oid)
    return out


ls = {line.split("\t")[1]: line.split()[2] for line in git(W, "ls-tree", "HEAD").strip().splitlines()}
blob = obj("blob", b"merged in the page\n")
top = [("100644", n, o) for n, o in ls.items() if n not in ("README.md",) and not n == "src"] + [("100644", "merged.txt", blob[0])]
src_tree = git(W, "rev-parse", "HEAD:src").strip()
top.append(("40000", "src", src_tree))
tree = obj("tree", tree_of(top))
commit = obj("commit", ("tree %s\nparent %s\nauthor Ada Ferreira <ada@example.invalid> 1762950000 +0000\ncommitter Ada Ferreira <ada@example.invalid> 1762950000 +0000\n\nMerged in the page\n" % (tree[0], head)).encode())
M1 = A._disk_write(rid, {"objects": [blob, tree, commit], "updates": [{"ref": "refs/heads/main", "old": head, "new": commit[0], "why": "merge"}]})
ok(M1.get("ok") and git(W, "rev-parse", "HEAD").strip() == commit[0], "a merge made in the page moves the branch worked on", M1)
ok(not os.path.exists(os.path.join(W, "README.md")) and open(os.path.join(W, "merged.txt")).read() == "merged in the page\n" and git(W, "status", "--porcelain").strip() == "",
   "and the folder follows: a file taken away, a file new, git finds it clean", git(W, "status", "--porcelain"))
ok(subprocess.run(["git", "fsck", "--no-progress"], cwd=W, capture_output=True, env=ENV).returncode == 0, "git fsck finds nothing wrong after it")
idea_tip = git(W, "rev-parse", "idea").strip()
S1 = A._disk_write(rid, {"updates": [], "head": "refs/heads/idea"})
ok(S1.get("ok") and git(W, "rev-parse", "--abbrev-ref", "HEAD").strip() == "idea" and os.path.exists(os.path.join(W, "README.md")) and not os.path.exists(os.path.join(W, "merged.txt"))
   and git(W, "status", "--porcelain").strip() == "", "switching to another idea: the folder follows it, clean", (S1, git(W, "status", "--porcelain")))
open(os.path.join(W, "README.md"), "a").write("an unsaved line\n")
S2 = A._disk_write(rid, {"updates": [], "head": "refs/heads/main"})
ok(not S2.get("ok") and "changes not kept yet" in S2.get("error", "") and git(W, "rev-parse", "--abbrev-ref", "HEAD").strip() == "idea" and "an unsaved line" in open(os.path.join(W, "README.md")).read(),
   "refused while a change waits to be kept: nothing changed, her line still there", S2)
A._disk_put_back(rid, ["README.md"])
open(os.path.join(W, "merged.txt"), "w").write("a file of hers, not kept\n")
S3 = A._disk_write(rid, {"updates": [], "head": "refs/heads/main"})
ok(not S3.get("ok") and "merged.txt" in S3.get("error", "") and open(os.path.join(W, "merged.txt")).read() == "a file of hers, not kept\n", "refused while a new file of hers stands where the other idea puts one", S3)
os.remove(os.path.join(W, "merged.txt"))
open(os.path.join(W, ".gitignore"), "w").write("*.log\nmerged.txt\n")
git(W, "commit", "-qam", "Ignore merged.txt here")
open(os.path.join(W, "merged.txt"), "w").write("an ignored file in the way\n")
S4 = A._disk_write(rid, {"updates": [], "head": "refs/heads/main"})
moved = os.path.join(W, *(S4.get("aside") or "x").split("/"), "merged.txt")
ok(S4.get("ok") and open(os.path.join(W, "merged.txt")).read() == "merged in the page\n" and os.path.exists(moved) and open(moved).read() == "an ignored file in the way\n",
   "a file .gitignore names, in the way, is moved aside first", S4)

# ---------- a submodule whose folder is not there: never staged, never a change, never in the way ----------
SUB = os.path.join(D, "Sub")
os.makedirs(SUB)
git(SUB, "init", "-q", "-b", "main")
git(SUB, "config", "user.name", "Ada Ferreira")
git(SUB, "config", "user.email", "ada@example.invalid")
open(os.path.join(SUB, "a.txt"), "w").write("a\n")
git(SUB, "add", "-A")
git(SUB, "commit", "-qm", "First")
git(SUB, "update-index", "--add", "--cacheinfo", "160000,%s,vendor/lib" % git(SUB, "rev-parse", "HEAD").strip())
git(SUB, "commit", "-qm", "A submodule, named")
git(SUB, "branch", "other")
sid = A._disk_add(SUB)["id"]
rs = A._disk_repo2(sid).get("rec", {})
ok(rs.get("changes") == [], "a submodule whose folder is not there is no change of the folder", rs.get("changes"))
open(os.path.join(SUB, "a.txt"), "w").write("a, changed\n")
SC = A._disk_commit(sid, "Change a", None, None)
ok(SC.get("ok") and git(SUB, "ls-tree", "HEAD", "vendor/lib").split()[:2] == ["160000", "commit"] and git(SUB, "show", "--name-only", "--format=", "HEAD").split() == ["a.txt"],
   "keeping a version leaves the submodule in the repository: only the change is kept", (SC, git(SUB, "ls-tree", "HEAD")))
SW = A._disk_write(sid, {"updates": [], "head": "refs/heads/other"})
ok(SW.get("ok") and git(SUB, "rev-parse", "--abbrev-ref", "HEAD").strip() == "other" and open(os.path.join(SUB, "a.txt")).read() == "a\n", "and switching ideas is not stopped by it", SW)

# ---------- a bare repository ----------
BARE = os.path.join(D, "Lumen.git")
git(D, "clone", "-q", "--bare", W, BARE)
bid = A._disk_add(BARE)["id"]
rb = A._disk_repo2(bid).get("rec", {})
NC = A._disk_commit(bid, "x", None, None)
ok(rb.get("disk", {}).get("worktree") is False and not NC.get("ok") and "make a working copy" in NC.get("error", ""), "a bare repository: no folder to keep, and that is said", NC)
bh = git(BARE, "rev-parse", "main").strip()
BB = A._disk_write(bid, {"updates": [{"ref": "refs/heads/print", "old": None, "new": bh}]})
ok(BB.get("ok") and git(BARE, "rev-parse", "print").strip() == bh, "an idea made on a bare repository", BB)
PARENT = os.path.join(T, "copies")
os.makedirs(PARENT)
WC = A._disk_working_copy(bid, None, PARENT)
wcp = WC.get("path") or ""
listed = [x["name"] for x in A._disk_list()["repos"]]
ok(WC.get("ok") and os.path.exists(os.path.join(wcp, "merged.txt")) and git(wcp, "status", "--porcelain").strip() == "" and "Lumen" in listed,
   "a working copy made from it, in the folder she chose, listed at once", (WC, listed))
ok(subprocess.run(["git", "fsck", "--no-progress"], cwd=BARE, capture_output=True, env=ENV).returncode == 0, "git fsck finds nothing wrong in the bare repository")

print("\n%d passed, %d failed" % (passed, failed))
shutil.rmtree(T, ignore_errors=True)
sys.exit(1 if failed else 0)
