"""Ingenium 7.46: the computer app keeps a session's version on a branch of its own in a repository on a drive (desktop/app_session_746.py).
    python3 -I rig/t_746_session_app.py <repo>/ingenium_app.py
A git repository of its own in a temporary folder, made with dulwich; an invented app (tide-clock). Nothing of this computer's is read."""
import os, sys, subprocess, tempfile, shutil, importlib.util, base64
SRC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
app = sys.argv[1]
tmp = tempfile.mkdtemp(prefix="t746-")
home = os.path.join(tmp, "home"); os.makedirs(home)
cp = os.path.join(tmp, "ingenium_app.py"); shutil.copyfile(app, cp)
r = subprocess.run([sys.executable, "-I", os.path.join(SRC, "build", "desktop", "app_session_746.py"), cp], capture_output=True, text=True)
passed = failed = 0
def ok(c, m, d=None):
    global passed, failed
    print(("PASS " if c else "FAIL ") + m + ("" if c or d is None else "  " + str(d)[:500])); passed += bool(c); failed += (not c)
ok(r.returncode == 0 and "patched" in r.stdout, "the patch applies", r.stdout + r.stderr)
r2 = subprocess.run([sys.executable, "-I", os.path.join(SRC, "build", "desktop", "app_session_746.py"), cp], capture_output=True, text=True)
ok("already patched" in r2.stdout, "and applies once")
os.environ["HOME"] = home; os.environ["XDG_DATA_HOME"] = os.path.join(home, ".local", "share")
spec = importlib.util.spec_from_file_location("ing_t746", cp); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
ok(hasattr(m.IngeniumApi, "disk_commit_to") and hasattr(m.IngeniumApiSingle, "disk_commit_to"), "both bridges have disk_commit_to")
# a repository on the "drive", with main and a branch out (evening) whose folder holds a change not kept
from dulwich.repo import Repo
from dulwich import porcelain
d = os.path.join(tmp, "drive", "tide-clock"); os.makedirs(d)
repo = Repo.init(d)
repo.refs.set_symbolic_ref(b"HEAD", b"refs/heads/main")  # its first branch is main, as GitHub and Fabrica name it
def w(path, text):
    full = os.path.join(d, path); os.makedirs(os.path.dirname(full), exist_ok=True); open(full, "w").write(text)
w("index.html", "<title>Tide Clock</title>\n"); w("app/tide.js", "function next(){ return 6; }\n")
porcelain.add(d, [os.path.join(d, "index.html"), os.path.join(d, "app/tide.js")]); porcelain.commit(d, message=b"Begin", author=b"Ada <>", committer=b"Ada <>")
main = repo.refs[b"HEAD"]
porcelain.branch_create(d, "evening"); porcelain.checkout_branch(Repo(d), "evening")
w("app/tide.js", "function next(){ return 7; }\n"); porcelain.add(d, [os.path.join(d, "app/tide.js")]); porcelain.commit(d, message=b"Evening", author=b"Ada <>", committer=b"Ada <>")
w("README.md", "not kept yet\n")
evening = repo.refs[b"refs/heads/evening"]
m._disk_open = lambda rid: (Repo(d), {"name": "tide-clock", "path": d})
before_status = porcelain.status(d)
b64 = lambda t: base64.b64encode(t.encode()).decode()
x = m._disk_commit_to("t1", "ingenium/half-tides", [{"path": "app/moon.js", "b64": b64("function moon(){ return 'full'; }\n")}, {"path": "app/tide.js", "b64": b64("function next(){ return 6.5; }\n")}], "Half tides", "main", "Ada", "")
ok(x.get("ok") and len(x.get("commit", "")) == 40, "a version kept on ingenium/half-tides, made from main", x)
R = Repo(d)
c = R[R.refs[b"refs/heads/ingenium/half-tides"]]
ok(c.parents == [main] and c.message.startswith(b"Half tides"), "its parent is main's last version, with her words", (c.parents, main, c.message))
from dulwich.object_store import tree_lookup_path
mode, sha = tree_lookup_path(R.__getitem__, c.tree, b"app/moon.js")
ok(R[sha].data == b"function moon(){ return 'full'; }\n", "the new file is in that version")
mode2, sha2 = tree_lookup_path(R.__getitem__, c.tree, b"index.html")
ok(R[sha2].data == b"<title>Tide Clock</title>\n", "and main's other files are carried as they were")
after_status = porcelain.status(d)
ok(R.refs[b"refs/heads/evening"] == evening and R.refs.read_ref(b"HEAD") == b"ref: refs/heads/evening" and R.refs[b"refs/heads/main"] == main, "main, the branch out (evening) and HEAD are not moved")
ok(open(os.path.join(d, "app/tide.js")).read() == "function next(){ return 7; }\n" and open(os.path.join(d, "README.md")).read() == "not kept yet\n"
   and before_status.untracked == after_status.untracked, "the folder's files, and its change not kept, are untouched")
x2 = m._disk_commit_to("t1", "ingenium/half-tides", [{"path": "app/moon.js", "b64": None}], "Moon taken away", None, "Ada", "")
c2 = R[Repo(d).refs[b"refs/heads/ingenium/half-tides"]]
ok(x2.get("ok") and c2.parents == [c.id], "a second version on the same branch follows the first", x2)
try:
    tree_lookup_path(R.__getitem__, c2.tree, b"app/moon.js"); gone = False
except KeyError:
    gone = True
ok(gone, "and a file can be taken away")
ok(m._disk_commit_to("t1", "evening", [{"path": "x.md", "b64": b64("x")}], "no", None)["ok"] is False, "the branch out is refused (it keeps through the folder)")
ok(m._disk_commit_to("t1", "../bad", [], "no", None)["ok"] is False and m._disk_commit_to("t1", "ok-name", [{"path": "../x", "b64": b64("x")}], "no", "main")["ok"] is False, "a bad branch name or file place is refused")
ok(m._disk_commit_to("t1", "ingenium/same", [], "nothing", "main").get("error", "").startswith("Nothing has changed"), "nothing changed: no empty version")
ok(m._disk_commit_to("t1", "ingenium/x", [{"path": "a", "b64": b64("a")}], "  ", "main")["ok"] is False, "a version needs words")
shutil.rmtree(tmp, ignore_errors=True)
print("%d passed, %d failed" % (passed, failed)); sys.exit(1 if failed else 0)
