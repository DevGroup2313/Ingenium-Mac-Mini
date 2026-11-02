#!/usr/bin/env python3
"""Folder search, phase 1: the desktop app's folder bridge (build/desktop/app_rag_692.py) and its test stand-in (rig/rag_bridge.py,
rig/rag_bridge_shim.js).

    python3 -I rig/t_rag1_bridge.py [<folder for the copies>]       (default: a new temporary folder)

1. The patch. The ingenium_app.py of the Mac mini, the Mac (Intel) and the Windows repository are COPIED, the patch is applied to
   each copy (as release.py does: python3 build/desktop/app_rag_692.py <copy>), it applies once and a second run changes nothing,
   each copy compiles, adds only what the patch says (taking the additions out gives the original back), has the five methods in
   BOTH API classes, and refuses a file that is not the shape it knows; release.py lists it after app_open_691 for the three.
2. The rules, as one set of checks run against the stand-in over HTTP (as the shim calls it) and against the patched copies' own API
   classes (Mac and Windows, both classes): choosing a folder (the dialog, cancelling, a file, the app's own data folder), what
   is listed (the seven types, hidden entries, symbolic links in and out, loops, the limit of 5,000), what is read (an outside
   path, ../, a symbolic link out, a hidden file, a type not allowed, a read past the end, 1 MB pieces rejoining, the 4 MB log of the
   test corpus), a forgotten folder, a folder remembered after a restart, a damaged list.
3. The local server of a patched copy answers .mjs/.js, .wasm, .onnx and .json with the types the folder search needs, also when the
   computer's own table says otherwise (the unpatched handler, as a control, does not).
4. rig/rag_bridge_shim.js in headless Chromium: window.pywebview.api.rag_* reach the stand-in from another origin.
Nothing is changed in the repositories: every file the test writes is in the folder for the copies or in temporary folders."""
import ast, base64, hashlib, http.client, http.server, importlib.util, inspect, json, mimetypes, os, random, re, shutil, socketserver
import subprocess, sys, tempfile, threading, time, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import rag_bridge  # noqa: E402

PATCH = os.path.join(SRC, "build", "desktop", "app_rag_692.py")
PATCH693 = os.path.join(SRC, "build", "desktop", "app_rag_693.py")    # 6.9.3: the review's two fixes, on top of 6.9.2's code
RELEASE = os.path.join(SRC, "build", "release.py")
FIX = os.path.join(SRC, "rag", "fixtures")
REPOS = {"mini": "/home/user/Ingenium-Mac-Mini", "intel": "/home/user/Ingenium-Mac-Intel", "win": "/home/user/Ingenium-HPWindows"}
METHODS = ["rag_choose_folder", "rag_folders", "rag_forget_folder", "rag_list", "rag_read"]
MB = 1048576
passed = failed = 0
LABEL = ""


def ok(c, m, d=None):
    global passed, failed
    print(("PASS " if c else "FAIL ") + (("[" + LABEL + "] ") if LABEL else "") + m + (("  " + str(d)[:400]) if (d is not None and not c) else ""))
    if c:
        passed += 1
    else:
        failed += 1


def rt(x):
    """What the page would receive: the value through JSON."""
    return json.loads(json.dumps(x))


# ================================================================================================================ the corpus on disk
class Tree(object):
    """root/papers is the folder a person chooses; around it, what must stay out of reach."""

    def __init__(self, root):
        self.root = root
        self.papers = P = os.path.join(root, "papers")
        self.outside = os.path.join(root, "outside")
        self.evil = os.path.join(root, "papers-evil")           # shares the chosen folder's name as a prefix
        for d in (P, self.outside, self.evil):
            os.makedirs(d, exist_ok=True)
        rnd = random.Random(7)
        self.big = rnd.randbytes(2 * MB + MB // 2 + 17)
        self.files = {}                                        # rel -> bytes, for the files that must be listed

        def w(rel, data, base=P):
            path = os.path.join(base, *rel.split("/"))
            os.makedirs(os.path.dirname(path), exist_ok=True)
            with open(path, "wb") as fh:
                fh.write(data if isinstance(data, bytes) else data.encode("utf-8"))
            return path

        for rel in ("a.txt", "b.md", "c.html", "d.htm", "e.json", "f.csv", "g.pdf", "h.docx", "UPPER.TXT", "sub/more.md", "sub/deeper/note.txt",
                    "with space/ünï cödé.txt", "named.txt/inside.md"):
            self.files[rel] = ("the words of " + rel + "\n").encode("utf-8")
            w(rel, self.files[rel])
        self.files["empty.txt"] = b""
        w("empty.txt", b"")
        self.files["big.txt"] = self.big
        w("big.txt", self.big)
        # kept out: hidden, other types, hidden folders
        self.hidden = [".hidden.txt", ".git/config.txt", "._a.txt", "~$lock.docx", "sub/.hidden/x.txt"]
        self.types = ["image.png", "secret.pem", "run.exe", "noext", "archive.txt.bak", "sub/script.py"]
        for rel in self.hidden + self.types:
            w(rel, b"not for the search\n")
        w("secret.txt", b"TOP SECRET OUTSIDE\n", base=self.outside)
        w("steal.txt", b"STOLEN\n", base=self.evil)
        # symbolic links
        self.links = True
        self.fifo = False
        try:
            os.symlink(os.path.join("sub", "deeper", "note.txt"), os.path.join(P, "link_in.txt"))
            os.symlink("sub", os.path.join(P, "link_dir_in"))
            os.symlink(os.path.join("..", "outside", "secret.txt"), os.path.join(P, "link_out.txt"))
            os.symlink(os.path.join("..", "outside"), os.path.join(P, "link_dir_out"))
            os.symlink(os.path.join("..", "papers-evil", "steal.txt"), os.path.join(P, "link_prefix.txt"))
            os.symlink("nowhere.txt", os.path.join(P, "broken.txt"))
            os.symlink(".", os.path.join(P, "loop"))
            os.symlink("..", os.path.join(P, "sub", "back"))
            self.files["link_in.txt"] = self.files["sub/deeper/note.txt"]
            self.files["link_dir_in/more.md"] = self.files["sub/more.md"]
            self.files["link_dir_in/deeper/note.txt"] = self.files["sub/deeper/note.txt"]
        except (OSError, NotImplementedError, AttributeError):
            self.links = False
        try:
            os.mkfifo(os.path.join(P, "fifo.txt"))
            self.fifo = True
        except (OSError, AttributeError):
            pass
        self.expected = sorted(self.files)

    def many(self, n):
        d = os.path.join(self.root, "many")
        os.makedirs(d, exist_ok=True)
        for i in range(n):
            with open(os.path.join(d, "f%05d.txt" % i), "wb") as fh:
                fh.write(b"x")
        return d


# ======================================================================================================================= the adapters
class Http(object):
    """The stand-in as the shim reaches it."""
    kind = "stand-in over HTTP"
    fns = None

    def __init__(self, base):
        self.base = base

    def _post(self, path, obj):
        req = urllib.request.Request(self.base + path, data=json.dumps(obj).encode("utf-8"), method="POST")
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read())

    def call(self, name, *args):
        j = self._post("/call/" + name, list(args))
        if not j.get("ok"):
            raise RuntimeError(j.get("e"))
        return j["v"]

    def dialog(self, *answers):
        self._post("/admin/dialog", {"answers": list(answers)})

    def state(self, d=None):
        return self._post("/admin/state", {"dir": d})["state"]

    def setvar(self, name, value):
        self._post("/admin/set", {"name": name, "value": value})

    def log(self):
        with urllib.request.urlopen(self.base + "/admin/problems", timeout=30) as r:
            return json.loads(r.read())


class Module(object):
    """A patched copy of ingenium_app.py, imported, and one of its API classes."""

    def __init__(self, path, cls, tag):
        spec = importlib.util.spec_from_file_location("ia_" + tag, path)
        self.ia = ia = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(ia)
        self.kind = tag + " / " + cls
        self.win = rag_bridge.FakeWindow()
        self.api = getattr(ia, cls)("http://127.0.0.1/")
        self.api._main_window = self.win
        self.probs = []
        ia.log_problem = lambda tag, exc_info=None: self.probs.append(str(tag))
        self.fns = vars(ia)

    def call(self, name, *args):
        return rt(getattr(self.api, name)(*args))

    def dialog(self, *answers):
        self.win.answers = list(answers)

    def state(self, d=None):
        d = d or tempfile.mkdtemp(prefix="rag_state_")
        self.ia._RAG_STATE_DIR = d
        return d

    def setvar(self, name, value):
        setattr(self.ia, name, value)

    def log(self):
        return {"problems": list(self.probs), "asked": [str(k) for k in self.win.asked]}


def app_dir_for(home):
    if sys.platform == "darwin":
        return os.path.join(home, "Library", "Application Support", "Ingenium")
    if sys.platform.startswith("win"):
        return os.path.join(os.environ.get("APPDATA", home), "Ingenium")
    return os.path.join(home, ".local", "share", "ingenium")


# ========================================================================================================================== the rules
def suite(A, work):
    global LABEL
    LABEL = A.kind
    print("== " + A.kind)
    T = Tree(os.path.join(work, "tree_" + re.sub(r"\W+", "_", A.kind)))
    P = T.papers
    R = lambda name, *a: A.call(name, *a)                                 # noqa: E731
    st = A.state()
    now = int(time.time() * 1000)

    # ---- nothing is chosen yet
    ok(R("rag_folders") == [], "nothing is chosen at first: rag_folders() is an empty list")
    r = R("rag_list", P)
    ok(r.get("ok") is False and r.get("code") == "NOT_CHOSEN", "a folder that was not chosen cannot be listed (the page may not name one)", r)
    r = R("rag_read", P, "a.txt", 0, 100)
    ok(r.get("ok") is False and r.get("code") == "NOT_CHOSEN", "nor read", r)
    r = R("rag_read", "/etc", "passwd", 0, 100)
    ok(r.get("ok") is False and r.get("code") == "NOT_CHOSEN", "/etc cannot be read as a folder, whatever the name", r)

    # ---- choosing
    A.dialog(None)
    r = R("rag_choose_folder")
    ok(r == {"ok": False, "cancelled": True}, "a closed dialog answers {ok: false, cancelled: true}", r)
    A.dialog()
    r = R("rag_choose_folder")
    ok(r == {"ok": False, "cancelled": True}, "so does a dialog that returns nothing", r)
    ok(R("rag_folders") == [], "and nothing is remembered")
    A.dialog(P)
    r = R("rag_choose_folder")
    ok(r.get("ok") is True and r.get("path") == P and r.get("name") == "papers" and "again" not in r, "the folder chosen in the dialog comes back as {ok, path, name}", r)
    ok("20" in A.log()["asked"], "the dialog asked for was the folder dialog (webview's FOLDER kind)", A.log()["asked"])
    fl = R("rag_folders")
    ok(len(fl) == 1 and fl[0]["path"] == P and fl[0]["name"] == "papers" and fl[0]["available"] is True and abs(fl[0]["added"] - now) < 120000,
       "rag_folders() lists it: [{path, name, added (milliseconds), available}]", fl)
    f = os.path.join(st, "folders.json")
    saved = json.load(open(f, encoding="utf-8")) if os.path.isfile(f) else {}
    ok(saved.get("folders") and saved["folders"][0]["path"] == P and saved["folders"][0]["real"] == os.path.realpath(P),
       "it is remembered in the app's data folder (folders.json, with its real path)", saved)
    A.dialog(P)
    r = R("rag_choose_folder")
    ok(r.get("ok") is True and r.get("again") is True and len(R("rag_folders")) == 1, "choosing it again does not add it twice", r)
    A.dialog(os.path.join(P, "a.txt"))
    r = R("rag_choose_folder")
    ok(r.get("ok") is False and r.get("code") == "NOT_A_FOLDER", "a file is not a folder", r)
    A.dialog(os.path.join(work, "no_such_folder"))
    r = R("rag_choose_folder")
    ok(r.get("ok") is False and r.get("code") == "NOT_A_FOLDER", "nor is a folder that is not there", r)
    ok(len(R("rag_folders")) == 1, "a refused choice remembers nothing")
    home = os.environ["HOME"]
    appd = app_dir_for(home)
    os.makedirs(os.path.join(appd, "rag"), exist_ok=True)
    os.makedirs(os.path.join(home, "Documents", "Research"), exist_ok=True)
    for what, p in (("the app's own data folder", appd), ("a folder inside it", os.path.join(appd, "rag")), ("the user folder that holds it", home)):
        A.dialog(p)
        r = R("rag_choose_folder")
        ok(r.get("ok") is False and r.get("code") == "REFUSED" and "own settings" in r.get("error", ""), "%s cannot be chosen" % what, r)
    A.dialog(os.path.join(home, "Documents", "Research"))
    r = R("rag_choose_folder")
    ok(r.get("ok") is True and r.get("name") == "Research", "but a folder of papers under the user folder can", r)
    ok(R("rag_forget_folder", os.path.join(home, "Documents", "Research")).get("forgot") is True, "(and is forgotten again)")
    other = os.path.join(work, "Mes Papiers é")
    os.makedirs(other, exist_ok=True)
    A.dialog(other)
    r = R("rag_choose_folder")
    ok(r.get("ok") is True and r.get("name") == "Mes Papiers é" and r.get("path") == other, "a name with spaces and accents is kept", r)
    ok(R("rag_forget_folder", other).get("forgot") is True, "(forgotten again)")

    # ---- the listing
    r = R("rag_list", P)
    files = {x["rel"]: x for x in r.get("files", [])}
    ok(r.get("ok") is True and r.get("truncated") is False, "rag_list(path) answers {ok: true, files, truncated: false}", {k: r[k] for k in r if k != "files"})
    ok(sorted(files) == T.expected, "it lists exactly the files of the seven types, recursively (%d files)" % len(T.expected),
       {"missing": sorted(set(T.expected) - set(files)), "extra": sorted(set(files) - set(T.expected))})
    ok(list(files) == sorted(files), "sorted by rel, with / between names")
    ok(all(set(x) == {"rel", "size", "mtime"} for x in files.values()), "each entry is {rel, size, mtime}")
    ok(all(x["size"] == len(T.files[x["rel"]]) for x in files.values()), "the sizes are the files' sizes")
    ok(all(x["mtime"] == os.stat(os.path.join(P, *x["rel"].split("/"))).st_mtime_ns // 1000000 for x in files.values()),
       "mtime is the modification time in whole milliseconds")
    ok("UPPER.TXT" in files and "with space/ünï cödé.txt" in files and "d.htm" in files and "g.pdf" in files and "h.docx" in files,
       "upper case extensions, spaces and accents, .htm, .pdf and .docx are all there")
    ok("named.txt/inside.md" in files and "named.txt" not in files, "a folder named like a file is walked, not listed")
    ok(not any(x in files for x in T.hidden) and not any(k.split("/")[-1].startswith((".", "~$")) for k in files), "hidden entries are skipped: dot files, a dot folder, a Mac's ._ copy, a ~$ lock file")
    ok(not any(x in files for x in T.types), "other types are skipped (.png .pem .exe, no extension, .txt.bak, .py)")
    if T.links:
        ok("link_in.txt" in files and "link_dir_in/more.md" in files and "link_dir_in/deeper/note.txt" in files,
           "a symbolic link that stays inside the folder is followed (a file and a folder)")
        ok(not any(k.startswith(("link_out", "link_dir_out", "link_prefix", "broken", "loop")) for k in files), "a link that leaves the folder, one that goes to a sibling with the same name start, a broken one and a loop are not")
        ok(not any("/back" in k or "/loop" in k for k in files) and len(files) == len(T.expected), "a link back into a folder it is already inside is not entered twice (no endless walk)")
    if T.fifo:
        ok("fifo.txt" not in files, "a named pipe is not a file")
    for spelled, what in ((P + "/", "with a closing slash"), (os.path.join(P, "sub", ".."), "spelled through a .."), (os.path.join(P, "loop") if T.links else P, "through a link that leads back to it")):
        r = R("rag_list", spelled)
        ok(r.get("ok") is True and len(r.get("files", [])) == len(T.expected), "the chosen folder named %s is the same folder" % what, r.get("code"))
    r = R("rag_list", os.path.join(P, "sub"))
    ok(r.get("ok") is False and r.get("code") == "NOT_CHOSEN", "a folder inside the chosen one is not itself chosen", r)
    r = R("rag_list", T.root)
    ok(r.get("ok") is False and r.get("code") == "NOT_CHOSEN", "nor is the folder around it", r)
    for bad in ("papers", "", None, 5, "\0", ["a"]):
        r = R("rag_list", bad)
        ok(r.get("ok") is False, "rag_list(%r) is refused" % (bad,), r)

    # ---- reading
    def rd(rel, off=0, ln=MB):
        return R("rag_read", P, rel, off, ln)

    r = rd("a.txt")
    ok(r.get("ok") is True and base64.b64decode(r["data"]) == T.files["a.txt"] and r["size"] == len(T.files["a.txt"]) and r["eof"] is True,
       "a small file comes back whole: {ok, data (base64), size, eof: true}", {k: r[k] for k in r if k != "data"})
    r = rd("a.txt", 4, 5)
    ok(base64.b64decode(r["data"]) == T.files["a.txt"][4:9] and r["eof"] is False and r["size"] == len(T.files["a.txt"]), "an offset and a length cut out that piece; eof is false before the end", r)
    r = rd("a.txt", len(T.files["a.txt"]) - 3, 100)
    ok(base64.b64decode(r["data"]) == T.files["a.txt"][-3:] and r["eof"] is True, "a read that runs to the end stops there with eof true", r)
    n = len(T.files["a.txt"])
    for off in (n, n + 1, n + 10 ** 6, 2 ** 62):
        r = rd("a.txt", off, 100)
        ok(r.get("ok") is True and r["data"] == "" and r["eof"] is True and r["size"] == n, "a read at %s (the size is %d) is past the end: no data, eof true, no error" % (off, n), r)
    r = rd("empty.txt")
    ok(r.get("ok") is True and r["data"] == "" and r["size"] == 0 and r["eof"] is True, "an empty file reads as nothing, eof true", r)
    got = bytearray()
    off = 0
    sizes = []
    while True:
        r = rd("big.txt", off, MB)
        ok_ = r.get("ok") is True
        if not ok_:
            break
        piece = base64.b64decode(r["data"])
        sizes.append(len(piece))
        got += piece
        off += len(piece)
        if r["eof"] or not piece:
            break
    ok(bytes(got) == T.big and sizes == [MB, MB, MB // 2 + 17] and hashlib.sha256(got).hexdigest() == hashlib.sha256(T.big).hexdigest(),
       "a 2.5 MB file read in 1 MB pieces (%s) rejoins byte for byte" % sizes)
    r = R("rag_read", P, "big.txt", 0, 5 * MB)
    ok(r.get("ok") is True and len(base64.b64decode(r["data"])) == MB and r["eof"] is False and r["size"] == len(T.big), "asking for more than 1 MB gets 1 MB (eof false)", {k: r[k] for k in r if k != "data"})
    r = R("rag_read", P, "big.txt", MB // 2, MB)
    ok(base64.b64decode(r["data"]) == T.big[MB // 2: MB // 2 + MB], "a piece that does not start at a multiple of 1 MB is the right bytes")
    r = R("rag_read", P, "a.txt", 0.0, 5.0)
    ok(r.get("ok") is True and base64.b64decode(r["data"]) == T.files["a.txt"][:5], "whole numbers that arrive as 0.0 and 5.0 are accepted", r)
    for off, ln in ((-1, 10), (0, 0), (0, -5), ("5", 10), (0, "10"), (1.5, 10), (True, 10), (None, 10), (0, None), ([0], 10)):
        r = R("rag_read", P, "a.txt", off, ln)
        ok(r.get("ok") is False and r.get("code") == "BAD_ARGS", "offset %r and length %r are refused" % (off, ln), r)
    r = R("rag_read", P, "link_in.txt") if T.links else {"ok": True, "data": base64.b64encode(T.files["sub/deeper/note.txt"]).decode()}
    ok(r.get("ok") is True and base64.b64decode(r["data"]) == T.files["sub/deeper/note.txt"], "a link that stays inside reads as its target")
    if T.links:
        r = R("rag_read", P, "link_dir_in/more.md")
        ok(r.get("ok") is True and base64.b64decode(r["data"]) == T.files["sub/more.md"], "and a file through a folder link that stays inside")
    r = R("rag_read", P + "/", "a.txt", 0, 5)
    ok(r.get("ok") is True and base64.b64decode(r["data"]) == T.files["a.txt"][:5], "the folder may be named with a closing slash")

    def refused(rel, code, what):
        r = R("rag_read", P, rel, 0, 100)
        ok(r.get("ok") is False and r.get("code") == code and "data" not in r, "%s is refused (%s)" % (what, code), r)

    # outside the folder
    refused("/etc/passwd", "OUTSIDE", "an absolute path outside, /etc/passwd")
    refused(os.path.join(P, "a.txt"), "OUTSIDE", "an absolute path, even of a file inside")
    refused("../outside/secret.txt", "OUTSIDE", "../outside/secret.txt")
    refused("sub/../../outside/secret.txt", "OUTSIDE", "sub/../../outside/secret.txt")
    refused("../papers-evil/steal.txt", "OUTSIDE", "../papers-evil/steal.txt (a sibling whose name starts like the folder's)")
    refused("sub/../a.txt", "OUTSIDE", "a .. even where it stays inside (a listing never has one)")
    refused("..", "OUTSIDE", "..")
    refused("", "OUTSIDE", "an empty path")
    refused("a.txt\0.png", "OUTSIDE", "a path with a NUL")
    refused("//etc/passwd", "OUTSIDE", "//etc/passwd")
    if os.sep == "/":
        refused("sub\\more.md", "NO_FILE", "a backslash name (an ordinary character here, so no such file)")
    for bad in (None, 5, ["a.txt"], {"a": 1}):
        refused(bad, "OUTSIDE", "a path of the wrong kind %r" % (bad,))
    if T.links:
        refused("link_out.txt", "OUTSIDE", "a symbolic link out of the folder")
        refused("link_dir_out/secret.txt", "OUTSIDE", "a file through a folder link out")
        refused("link_prefix.txt", "OUTSIDE", "a link to a sibling folder whose name starts like this one's")
        refused("broken.txt", "NO_FILE", "a broken link")
    # hidden
    refused(".hidden.txt", "HIDDEN", "a hidden file")
    refused(".git/config.txt", "HIDDEN", "a file in a hidden folder")
    refused("sub/.hidden/x.txt", "HIDDEN", "a file in a hidden folder below")
    refused("._a.txt", "HIDDEN", "a Mac's ._ copy")
    refused("~$lock.docx", "HIDDEN", "an editor's lock file")
    # types
    for rel in ("image.png", "secret.pem", "run.exe", "noext", "archive.txt.bak", "sub/script.py"):
        refused(rel, "TYPE", "a type that is not searched (" + rel + ")")
    refused("sub", "TYPE", "a folder named without an extension")
    refused("named.txt", "NO_FILE", "a folder named like a file")
    refused("nope.txt", "NO_FILE", "a file that is not there")
    refused("sub/deeper/nope.md", "NO_FILE", "a file that is not there, in a folder that is")
    if T.fifo:
        refused("fifo.txt", "NO_FILE", "a named pipe (it is not opened, so it cannot block)")
    ok(not A.log()["problems"], "nothing above wrote a problem to the app's log", A.log()["problems"])

    # ---- the real test corpus: the 4 MB log, 1 MB at a time
    hist = os.path.join(FIX, "historian_archive")
    A.dialog(hist)
    r = R("rag_choose_folder")
    ok(r.get("ok") is True and r.get("name") == "historian_archive", "the test corpus's historian_archive is chosen", r)
    manifest = {m["path"][len("historian_archive/"):]: m for m in json.load(open(os.path.join(FIX, "MANIFEST.json")))["files"] if m["path"].startswith("historian_archive/")}
    r = R("rag_list", hist)
    got = {x["rel"]: x for x in r.get("files", [])}
    ok(sorted(got) == sorted(manifest) and all(got[k]["size"] == manifest[k]["size"] for k in got), "its listing is the manifest's %d files with their sizes" % len(manifest), sorted(set(manifest) ^ set(got))[:5])
    log = "logbook/ship_logbooks_1781-1802.txt"
    h = hashlib.sha256()
    off = 0
    npieces = 0
    while True:
        r = R("rag_read", hist, log, off, MB)
        piece = base64.b64decode(r["data"]) if r.get("ok") else b""
        h.update(piece)
        off += len(piece)
        npieces += 1
        if not r.get("ok") or r["eof"] or not piece:
            break
    ok(off == manifest[log]["size"] and h.hexdigest() == manifest[log]["sha256"] and off > 4 * 10 ** 6 and npieces == 5,
       "the 4 MB log (%d bytes) read in %d pieces of at most 1 MB has the manifest's SHA-256" % (off, npieces))
    ok(R("rag_forget_folder", hist).get("forgot") is True, "(the corpus folder is forgotten again)")

    # ---- the limit of 5,000 files
    many = T.many(5100)
    A.dialog(many)
    R("rag_choose_folder")
    r = R("rag_list", many)
    ok(r.get("ok") is True and len(r["files"]) == 5000 and r["truncated"] is True, "a folder of 5,100 files lists 5,000 and says it was cut short", {"n": len(r.get("files", [])), "t": r.get("truncated")})
    ok([x["rel"] for x in r["files"]] == ["f%05d.txt" % i for i in range(5000)], "the 5,000 are the same every time (the first by name)")
    for i in range(5000, 5100):
        os.remove(os.path.join(many, "f%05d.txt" % i))
    r = R("rag_list", many)
    ok(len(r["files"]) == 5000 and r["truncated"] is False, "a folder of exactly 5,000 lists them all and says nothing was left")
    open(os.path.join(many, "f05000.txt"), "wb").write(b"x")
    r = R("rag_list", many)
    ok(len(r["files"]) == 5000 and r["truncated"] is True, "and with one more it says so again")
    A.setvar("_RAG_SCAN_CAP", 300)
    r = R("rag_list", many)
    ok(r["truncated"] is True and len(r["files"]) <= 300, "a folder with more entries than the scan limit stops there and says so", len(r.get("files", [])))
    A.setvar("_RAG_SCAN_CAP", 300000)
    ok(R("rag_forget_folder", many).get("forgot") is True, "(forgotten again)")

    # ---- a forgotten folder
    ok(len(R("rag_folders")) == 1, "one folder is still remembered")
    r = R("rag_forget_folder", P)
    ok(r == {"ok": True, "forgot": True}, "rag_forget_folder(path) answers {ok: true}", r)
    ok(R("rag_folders") == [], "the folders list is empty again")
    saved = json.load(open(f, encoding="utf-8"))
    ok(saved["folders"] == [], "and the app's file no longer holds it")
    r = R("rag_list", P)
    ok(r.get("ok") is False and r.get("code") == "NOT_CHOSEN", "a forgotten folder cannot be listed", r)
    r = R("rag_read", P, "a.txt", 0, 10)
    ok(r.get("ok") is False and r.get("code") == "NOT_CHOSEN" and "data" not in r, "nor read", r)
    r = R("rag_forget_folder", P)
    ok(r == {"ok": True, "forgot": False}, "forgetting it again is harmless", r)
    for bad in (None, 5, "", "relative/path", "\0"):
        r = R("rag_forget_folder", bad)
        ok(r.get("ok") is False and r.get("code") == "BAD_ARGS", "rag_forget_folder(%r) is refused" % (bad,), r)
    A.dialog(P)
    R("rag_choose_folder")
    r = R("rag_read", P, "a.txt", 0, 10)
    ok(r.get("ok") is True, "choosing it again lets it be read again")

    # ---- the folder vanishes (a drive unplugged), and comes back
    gone = os.path.join(work, "drive_" + re.sub(r"\W+", "_", A.kind))
    os.makedirs(os.path.join(gone, "docs"), exist_ok=True)
    open(os.path.join(gone, "docs", "x.txt"), "wb").write(b"on a drive")
    A.dialog(os.path.join(gone, "docs"))
    R("rag_choose_folder")
    moved = gone + "_away"
    os.rename(gone, moved)
    r = R("rag_list", os.path.join(gone, "docs"))
    ok(r.get("ok") is False and r.get("code") == "UNAVAILABLE", "a folder whose drive is not there says so (the indexer then leaves its index alone)", r)
    r = R("rag_read", os.path.join(gone, "docs"), "x.txt", 0, 10)
    ok(r.get("ok") is False and r.get("code") == "UNAVAILABLE", "and cannot be read", r)
    ok([x for x in R("rag_folders") if x["path"].endswith("docs")][0]["available"] is False, "rag_folders() marks it not available, and still lists it")
    os.rename(moved, gone)
    ok(R("rag_list", os.path.join(gone, "docs")).get("ok") is True, "back with the drive")
    ok(R("rag_forget_folder", os.path.join(gone, "docs")).get("forgot") is True, "(forgotten)")

    # ---- a damaged list of folders
    open(f, "wb").write(b"{ this is not json")
    ok(R("rag_folders") == [], "a damaged list of chosen folders reads as none, without an error")
    ok(os.path.isfile(f + ".bad") and any("damaged" in x for x in A.log()["problems"]), "the damaged file is set aside (.bad) and the app's log says so", A.log()["problems"])
    r = R("rag_list", P)
    ok(r.get("ok") is False and r.get("code") == "NOT_CHOSEN", "nothing can be read from it")
    A.dialog(P)
    ok(R("rag_choose_folder").get("ok") is True and len(R("rag_folders")) == 1, "the next choice starts a good list")
    json.dump({"version": 1, "folders": [{"path": P, "real": P}, {"nonsense": 1}, 7, {"path": "", "real": ""}]}, open(f, "w"))
    ok(len(R("rag_folders")) == 1, "entries that are not folders in a good file are ignored")
    ok(R("rag_forget_folder", P).get("forgot") is True, "(forgotten)")
    ok(sorted(os.listdir(st)) == ["folders.json", "folders.json.bad"], "the data folder holds nothing else (no temporary file left)", sorted(os.listdir(st)))
    return T


def direct(work):
    """Things only the functions can show: the system's own marks, many choices at once, a dialog that is open, a restart, the old dialog API."""
    global LABEL
    LABEL = "functions"
    print("== the functions themselves")
    b = rag_bridge.Bridge()
    ns = b.ns
    class S(object):                                                   # a stat result as Windows and the Mac give it
        def __init__(self, **k):
            self.__dict__.update(k)
    H = ns["_rag_hidden"]
    ok(H("x.txt", S(st_file_attributes=0x2)) and H("x.txt", S(st_file_attributes=0x2 | 0x20)), "Windows: a file the system marks hidden (FILE_ATTRIBUTE_HIDDEN) is hidden")
    ok(not H("x.txt", S(st_file_attributes=0x20)) and not H("x.txt", S(st_file_attributes=0x10)), "an archive or a folder attribute alone is not")
    ok(H("x.txt", S(st_flags=0x8000)) and not H("x.txt", S(st_flags=0)), "Mac: the hidden flag (UF_HIDDEN) is hidden")
    ok(not H("x.txt", S(st_mode=0)) and not H("x.txt") and H(".x") and H("~$x.docx") and not H("a~$b.docx"), "other stat results, no stat, dot names and ~$ names")
    tmp = tempfile.mkdtemp(prefix="rag_direct_")
    # many choices at once keep the list whole
    dirs = []
    for i in range(24):
        d = os.path.join(tmp, "f%02d" % i)
        os.makedirs(d)
        dirs.append(d)
    out = [None] * len(dirs)
    def go(i):
        out[i] = ns["_rag_remember"](dirs[i])
    ts = [threading.Thread(target=go, args=(i,)) for i in range(len(dirs))]
    [t.start() for t in ts]
    [t.join() for t in ts]
    fl = json.load(open(os.path.join(b.state_dir, "folders.json")))["folders"]
    ok(all(o and o.get("ok") for o in out) and sorted(x["path"] for x in fl) == sorted(dirs), "24 folders chosen at the same moment are all remembered, the file stays whole (%d)" % len(fl))
    # a restart: a new namespace on the same data folder
    b2 = rag_bridge.Bridge(b.state_dir)
    ok(sorted(x["path"] for x in b2.call("rag_folders")) == sorted(dirs) and b2.call("rag_list", dirs[3]).get("ok") is True,
       "a restarted app (a new copy of the functions on the same data folder) still has the folders, and can list them")
    # a second dialog while one is open
    b2.set_state()
    b2.window.gate = threading.Event()
    b2.window.answers = [dirs[0]]
    first = {}
    t = threading.Thread(target=lambda: first.update(r=b2.call("rag_choose_folder")))
    t.start()
    b2.window.opened.wait(10)
    second = b2.call("rag_choose_folder")
    ok(second.get("ok") is False and second.get("code") == "BUSY", "a second dialog asked for while one is open is refused (BUSY), not stacked", second)
    b2.window.gate.set()
    t.join(10)
    ok(first.get("r", {}).get("ok") is True and b2.call("rag_choose_folder") == {"ok": False, "cancelled": True}, "the first one finishes as usual, and the lock is released")
    # no window: the function falls back on webview.windows, and says so when there is none
    b2.webview.windows.clear()
    r = ns["_rag_choose_folder"](None)
    ok(r.get("ok") is False and r.get("code") == "DIALOG", "with no window at all the dialog cannot be opened: a plain refusal, not an exception", r)
    # the older pywebview's FOLDER_DIALOG
    b3 = rag_bridge.Bridge(webview_style="old")
    b3.window.answers = [dirs[1]]
    r = b3.call("rag_choose_folder")
    ok(r.get("ok") is True and b3.window.asked == [20], "the older pywebview (webview.FOLDER_DIALOG) works too", r)
    # a window that answers with a plain string, as some versions do
    b3.window.create_file_dialog = lambda kind=None: dirs[2]
    r = b3.call("rag_choose_folder")
    ok(r.get("ok") is True and r.get("path") == dirs[2], "a dialog that answers with a string instead of a tuple works", r)
    b3.window.create_file_dialog = lambda kind=None: (_ for _ in ()).throw(RuntimeError("the dialog broke"))
    r = b3.call("rag_choose_folder")
    ok(r.get("ok") is False and r.get("code") == "DIALOG" and b3.problems, "a dialog that breaks is a plain refusal and a line in the app's log", r)
    # the extension table
    m = ns["_rag_extensions_map"]({".js": "text/plain", ".mjs": "text/plain", ".wasm": "x/y", ".json": "text/plain", ".onnx": "text/plain", ".keep": "k/k"})
    ok(m == {".js": "text/javascript", ".mjs": "text/javascript", ".wasm": "application/wasm", ".json": "application/json", ".onnx": "application/octet-stream", ".keep": "k/k"},
       "the extension table sets the five types outright and keeps the others", m)
    ok(ns["_RAG_CT"] == {".mjs": "text/javascript", ".js": "text/javascript", ".wasm": "application/wasm", ".onnx": "application/octet-stream", ".json": "application/json"},
       "and those are exactly the five the task names")


# ============================================================================================================================ the patch
def section_patch(try_dir):
    global LABEL
    LABEL = "patch"
    print("== the patch, on copies of the three ingenium_app.py in " + try_dir)
    P = rag_bridge.load_patch()
    U = rag_bridge.load_upgrade()
    out = {}
    for k, repo in REPOS.items():
        src = os.path.join(repo, "ingenium_app.py")
        d = os.path.join(try_dir, k)
        os.makedirs(d, exist_ok=True)
        dst = os.path.join(d, "ingenium_app.py")
        # 6.9.2 put the patch into the repositories (release.py); the file as it was before is what is left when it is taken
        # out again, which works only because the patch is purely additive (checked below on that file)
        repo_text = open(src, "rb").read().decode("utf-8")
        ok(P.MARK in repo_text and U.MARK not in repo_text, "%s: the repository's file has 6.9.2's folder search and not yet 6.9.3's changes" % k)
        before = repo_text.replace(P.CODE, "", 1).replace("\n" + P.METHODS, "").replace(P.SERVER_NEW, P.SERVER_OLD)
        open(dst, "w", encoding="utf-8", newline="\n").write(before)
        ok(P.MARK not in before and "extensions_map" not in before, "%s: taking 6.9.2's patch out of it leaves none of it" % k)
        r1 = subprocess.run([sys.executable, PATCH, dst], capture_output=True, text=True)
        after = open(dst, "rb").read().decode("utf-8")
        ok(r1.returncode == 0 and "added to" in r1.stdout and after != before and P.MARK in after, "%s: the patch applies to the copy" % k, r1.stdout + r1.stderr)
        r2 = subprocess.run([sys.executable, PATCH, dst], capture_output=True, text=True)
        ok(r2.returncode == 0 and "already in" in r2.stdout and open(dst, "rb").read().decode("utf-8") == after, "%s: a second run changes nothing (idempotent)" % k, r2.stdout + r2.stderr)
        r3 = subprocess.run([sys.executable, "-m", "py_compile", dst], capture_output=True, text=True)
        ok(r3.returncode == 0, "%s: the patched copy compiles" % k, r3.stderr)
        # purely additive
        undone = after.replace(P.CODE, "", 1).replace("\n" + P.METHODS, "").replace(P.SERVER_NEW, P.SERVER_OLD)
        ok(undone == before, "%s: it adds only what the patch says (taking that out gives the repository's file back byte for byte)" % k)
        tree = ast.parse(after)
        classes = {n.name: [f.name for f in n.body if isinstance(f, ast.FunctionDef)] for n in tree.body if isinstance(n, ast.ClassDef)}
        ok(all(all(classes.get(c, []).count(m) == 1 for m in METHODS) for c in ("IngeniumApi", "IngeniumApiSingle")),
           "%s: both API classes (IngeniumApi, IngeniumApiSingle) have each of %s once" % (k, ", ".join(METHODS)))
        funcs = [n.name for n in tree.body if isinstance(n, ast.FunctionDef)]
        ok(all(funcs.count(f) == 1 for f in ("_rag_choose_folder", "_rag_folders", "_rag_forget_folder", "_rag_list", "_rag_read", "_rag_extensions_map", "_rag_remember", "_rag_walk")),
           "%s: the logic is plain module-level functions, each once" % k)
        ok(after.count("extensions_map = _rag_extensions_map(http.server.SimpleHTTPRequestHandler.extensions_map)") == 1, "%s: the local server's handler takes the explicit types" % k)
        ok(after == repo_text, "%s: applied to that file, 6.9.2's patch gives the repository's file back byte for byte" % k)
        # 6.9.3 (app_rag_693.py): on top of it, once
        r4 = subprocess.run([sys.executable, PATCH693, dst], capture_output=True, text=True)
        up = open(dst, "rb").read().decode("utf-8")
        ok(r4.returncode == 0 and "added to" in r4.stdout and U.MARK in up and up.count("def _rag_real_steps_ok(") == 1, "%s: 6.9.3's changes apply on top" % k, r4.stdout + r4.stderr)
        r5 = subprocess.run([sys.executable, PATCH693, dst], capture_output=True, text=True)
        ok(r5.returncode == 0 and "already in" in r5.stdout and open(dst, "rb").read().decode("utf-8") == up, "%s: a second run of 6.9.3's changes changes nothing" % k, r5.stdout + r5.stderr)
        r6 = subprocess.run([sys.executable, "-m", "py_compile", dst], capture_output=True, text=True)
        ok(r6.returncode == 0, "%s: the copy with 6.9.3's changes compiles" % k, r6.stderr)
        back = up
        for old, new in U.REPLACEMENTS:
            back = back.replace(new, old, 1)
        ok(back == after, "%s: 6.9.3's changes are only the listed replacements (undoing them gives 6.9.2's file back)" % k)
        out[k] = dst
    # a file that is not the shape the patch knows is refused and left alone
    junk = os.path.join(try_dir, "junk.py")
    open(junk, "w").write("class IngeniumApi(_LiteWindows):\n    pass\n")
    r = subprocess.run([sys.executable, PATCH, junk], capture_output=True, text=True)
    ok(r.returncode != 0 and "take_screenshot" in (r.stderr + r.stdout) and open(junk).read() == "class IngeniumApi(_LiteWindows):\n    pass\n", "a file without the anchors is refused with the reason and not written", r.stderr[-200:])
    # a file whose second API class has no take_screenshot (the first def is renamed)
    broken = os.path.join(try_dir, "one_class.py")
    orig = open(os.path.join(REPOS["mini"], "ingenium_app.py"), encoding="utf-8").read()
    orig = orig.replace(P.CODE, "", 1).replace("\n" + P.METHODS, "").replace(P.SERVER_NEW, P.SERVER_OLD)   # as before 6.9.2
    open(broken, "w", encoding="utf-8").write(orig.replace("def take_screenshot(self):", "def take_shot(self):", 1))
    r = subprocess.run([sys.executable, PATCH, broken], capture_output=True, text=True)
    ok(r.returncode != 0 and "found 1 times, not 2" in (r.stderr + r.stdout), "a file with only one of the two API classes' take_screenshot is refused (nothing half done)", (r.stderr + r.stdout)[-200:])
    ok("_rag_choose_folder" not in open(broken, encoding="utf-8").read(), "and left as it was")
    # release.py
    tree = ast.parse(open(RELEASE, encoding="utf-8").read())
    desk = None
    for n in tree.body:
        if isinstance(n, ast.Assign) and any(isinstance(t, ast.Name) and t.id == "DESKTOP" for t in n.targets):
            desk = ast.literal_eval(n.value)
    names = [x[0] for x in desk or []]
    ok(desk is not None and ("app_rag_692", P.MARK, ("mini", "intel", "win")) in desk and ("app_rag_693", U.MARK, ("mini", "intel", "win")) in desk
       and names.index("app_open_691") < names.index("app_rag_692") < names.index("app_rag_693"),
       "release.py lists app_rag_692 after app_open_691, and app_rag_693 (%r) after it" % U.MARK, desk[-3:] if desk else None)
    ok(all(os.path.isfile(os.path.join(SRC, "build", "desktop", n + ".py")) for n in names), "every patch in release.py's DESKTOP list is a file in build/desktop/")
    ok(len(set(names)) == len(names) and len({x[1] for x in desk}) == len(desk), "no patch or mark is listed twice (a mark that is another's would skip it)")
    return out


# ================================================================================================================ the local server
def section_server(path, work):
    global LABEL
    LABEL = "server"
    print("== the local server of the patched Mac copy")
    spec = importlib.util.spec_from_file_location("ia_server", path)
    ia = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(ia)
    d = os.path.join(work, "served")
    os.makedirs(os.path.join(d, "rag", "vendor", "ort"), exist_ok=True)
    want = {"rag/main.mjs": "text/javascript", "rag/store.worker.js": "text/javascript", "rag/vendor/ort/ort.wasm": "application/wasm",
            "rag/vendor/model.onnx": "application/octet-stream", "rag/fixtures/FACTS.json": "application/json", "rag/UPPER.MJS": "text/javascript"}
    os.makedirs(os.path.join(d, "rag", "fixtures"), exist_ok=True)
    for rel in want:
        open(os.path.join(d, *rel.split("/")), "wb").write(b"x")
    open(os.path.join(d, "ingenium.html"), "wb").write(b"<!doctype html><title>p</title>")
    # the computer's own table is wrong (as a Windows registry can be): the handler's base table and the mimetypes module both
    saved_map = dict(http.server.SimpleHTTPRequestHandler.extensions_map)
    wrong = {".js": "text/plain", ".mjs": "text/plain", ".wasm": "application/x-wasm", ".json": "text/plain", ".onnx": "text/plain"}
    http.server.SimpleHTTPRequestHandler.extensions_map.update(wrong)
    saved_types = dict(mimetypes.types_map)
    for ext, ct in wrong.items():
        mimetypes.add_type(ct, ext)
    try:
        port = ia._start_local_server(d, "ingenium.html")

        def head(port_, rel):
            c = http.client.HTTPConnection("127.0.0.1", port_, timeout=10)
            c.request("GET", "/" + rel)
            r = c.getresponse()
            body = r.read()
            ct = r.getheader("Content-Type")
            c.close()
            return r.status, ct, body

        got = {rel: head(port, rel) for rel in want}
        ok(all(got[rel][0] == 200 and got[rel][1] == want[rel] for rel in want), "the app's own server sends .mjs, .js, .wasm, .onnx and .json (also in capitals) with the types the folder search needs", {k: v[:2] for k, v in got.items()})
        st, ct, body = head(port, "ingenium.html")
        ok(st == 200 and ct.startswith("text/html"), "and still serves the page as HTML", ct)
        # the control: a plain handler under the same wrong table
        srv = socketserver.ThreadingTCPServer(("127.0.0.1", 0), lambda *a, **k: http.server.SimpleHTTPRequestHandler(*a, directory=d, **k))
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        ctl = {rel: head(srv.server_address[1], rel)[1] for rel in want}
        srv.shutdown()
        ok(ctl["rag/main.mjs"] != "text/javascript" and ctl["rag/store.worker.js"] != "text/javascript" and ctl["rag/vendor/ort/ort.wasm"] != "application/wasm",
           "(control: an ordinary handler under the same wrong table gets them wrong: %s, %s, %s)" % (ctl["rag/main.mjs"], ctl["rag/store.worker.js"], ctl["rag/vendor/ort/ort.wasm"]))
    finally:
        http.server.SimpleHTTPRequestHandler.extensions_map.clear()
        http.server.SimpleHTTPRequestHandler.extensions_map.update(saved_map)
        mimetypes.types_map.clear()
        mimetypes.types_map.update(saved_types)
        try:
            ia._LOCAL_SERVER.shutdown()
        except Exception:
            pass


# ====================================================================================================================== the shim, in Chromium
SHIM_CHECK = r"""
const pw = require('/opt/node-tools/node_modules/playwright');
const [SHIM, BRIDGE, PAGE_ORIGIN, FOLDER] = process.argv.slice(2);
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext();
  await ctx.addInitScript(() => { window.__sawReady = false; window.addEventListener('pywebviewready', () => { window.__sawReady = true; }); });
  await ctx.addInitScript({ path: SHIM });
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(PAGE_ORIGIN + '/');
  const out = await page.evaluate(async ([BRIDGE, FOLDER]) => {
    const r = { origin: location.origin, names: Object.keys(window.pywebview.api).sort() };
    await new Promise((res) => setTimeout(res, 300));
    r.ready = window.__sawReady === true;
    await fetch(BRIDGE + '/admin/dialog', { method: 'POST', body: JSON.stringify({ answers: [FOLDER] }) });
    const api = window.pywebview.api;
    r.choose = await api.rag_choose_folder();
    r.folders = await api.rag_folders();
    const l = await api.rag_list(FOLDER); r.n = l.files.length; r.first = l.files[0];
    const rd = await api.rag_read(FOLDER, l.files[0].rel, 0, 1048576); r.read = { ok: rd.ok, size: rd.size, eof: rd.eof, len: atob(rd.data).length };
    r.refused = await api.rag_read(FOLDER, '../x.txt', 0, 10);
    r.forgot = await api.rag_forget_folder(FOLDER);
    r.after = await api.rag_list(FOLDER);
    try { await window.pywebview.api.rag_nothing_here(); } catch (e) { r.noSuch = 'threw'; }
    return r;
  }, [BRIDGE, FOLDER]);
  out.errors = errors; console.log(JSON.stringify(out)); await b.close();
})().catch((e) => { console.log(JSON.stringify({ crash: String(e && e.stack || e) })); process.exit(1); });
"""


def section_shim(work):
    global LABEL
    LABEL = "shim"
    print("== rig/rag_bridge_shim.js in headless Chromium (the page is on another port of 127.0.0.1 than the bridge)")
    if not os.path.isdir("/opt/node-tools/node_modules/playwright") or not shutil.which("node"):
        print("SKIP the shim check: node and Playwright are not here")
        return
    srv, bridge = rag_bridge.serve(0)
    base = "http://127.0.0.1:%d" % srv.server_address[1]

    class Page(http.server.BaseHTTPRequestHandler):                # a real page on another port of 127.0.0.1, as the test server's is
        def log_message(self, *a):
            pass

        def do_GET(self):
            body = b"<!doctype html><title>t</title><p>page</p>"
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
    page = socketserver.ThreadingTCPServer(("127.0.0.1", 0), Page)
    page.daemon_threads = True
    threading.Thread(target=page.serve_forever, daemon=True).start()
    origin = "http://127.0.0.1:%d" % page.server_address[1]
    folder = os.path.join(FIX, "household_papers")
    script = os.path.join(work, "shim_check.js")
    open(script, "w").write(SHIM_CHECK)
    # the stand-in is told to use the default address by the shim: give it its real one first
    shim = os.path.join(work, "shim_with_address.js")
    open(shim, "w").write("window.__RAG_BRIDGE__ = %s;\n" % json.dumps(base) + open(os.path.join(HERE, "rag_bridge_shim.js")).read())
    try:
        p = subprocess.run(["node", script, shim, base, origin, folder], capture_output=True, text=True, timeout=120)
        try:
            r = json.loads(p.stdout.strip().splitlines()[-1])
        except Exception:
            r = {"crash": (p.stdout + p.stderr)[-400:]}
    finally:
        srv.shutdown()
        page.shutdown()
    ok("crash" not in r and r.get("origin") == origin and r["names"] == METHODS, "the page (another origin) has window.pywebview.api with the five methods", r)
    if "crash" in r:
        return
    ok(r["ready"] is True, "the shim announces itself with a pywebviewready event")
    ok(r["choose"].get("ok") is True and r["choose"]["name"] == "household_papers" and len(r["folders"]) == 1, "rag_choose_folder() and rag_folders() work through it", r["choose"])
    ok(r["n"] == 20 and r["first"]["rel"] and r["read"]["ok"] and r["read"]["len"] == r["read"]["size"] and r["read"]["eof"] is True, "rag_list() lists the 20 files of household_papers and rag_read() reads one", {"n": r["n"], "read": r["read"]})
    ok(r["refused"].get("ok") is False and r["refused"].get("code") == "OUTSIDE", "a refusal arrives as a value ({ok: false, code}), as the app's do", r["refused"])
    ok(r["forgot"].get("forgot") is True and r["after"].get("code") == "NOT_CHOSEN", "rag_forget_folder() works and the folder is then refused", r["after"])
    ok(r.get("noSuch") == "threw" and r["errors"] == [], "a method that does not exist is not defined (calling it throws); no script error", r)


# ======================================================================================== the review's two cases (1 November 2026)
def review_fixes(work):
    """A link inside the chosen folder that points to a hidden file or folder there; a folder chosen through a link that was
    later pointed elsewhere. The patch's own CODE runs in a namespace, as rig/rag_bridge.py runs it."""
    global LABEL
    LABEL = "links"
    import importlib.util, pathlib as _pl, threading as _th
    spec = importlib.util.spec_from_file_location("app_rag_692_review", os.path.join(SRC, "build", "desktop", "app_rag_692.py"))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    problems = []

    def namespace():
        ns = {"__name__": "review", "os": os, "sys": sys, "json": json, "pathlib": _pl, "re": re, "base64": base64,
              "threading": _th, "time": time, "APP_FOLDER": "Ingenium", "log_problem": lambda tag, exc_info=None: problems.append(str(tag))}
        exec(compile(rag_bridge.current_code(mod), "<CODE>", "exec"), ns)
        ns["_RAG_STATE_DIR"] = tempfile.mkdtemp(prefix="rag_links_state_", dir=work)
        return ns

    root = tempfile.mkdtemp(prefix="rag_links_", dir=work)
    ns = namespace()
    P = os.path.join(root, "papers")
    os.makedirs(os.path.join(P, ".private"))
    open(os.path.join(P, ".secret.txt"), "w").write("hidden secret text")
    open(os.path.join(P, ".private", "diary.md"), "w").write("hidden diary")
    open(os.path.join(P, "plain.txt"), "w").write("plain words")
    os.symlink(".secret.txt", os.path.join(P, "alias.txt"))
    os.symlink(".private", os.path.join(P, "notes"))
    os.symlink("plain.txt", os.path.join(P, "plain-link.txt"))
    ns["_rag_remember"](P)
    listed = [f["rel"] for f in ns["_rag_list"](P).get("files", [])]
    ok(listed == ["plain-link.txt", "plain.txt"], "a link to a hidden file or a hidden folder inside the folder is not listed; a link to a plain file is", listed)
    r1, r2 = ns["_rag_read"](P, "alias.txt", 0, 100), ns["_rag_read"](P, "notes/diary.md", 0, 100)
    ok(r1.get("code") == "HIDDEN" and r2.get("code") == "HIDDEN", "nor read through the link (refused as hidden)", [r1, r2])
    r3 = ns["_rag_read"](P, "plain-link.txt", 0, 100)
    ok(r3.get("ok") is True and base64.b64decode(r3["data"]) == b"plain words", "a link to a plain file inside the folder is read", r3)
    # a folder chosen through a link that was then pointed at another folder
    ns = namespace()
    Q = os.path.join(root, "drive", "papers2")
    os.makedirs(Q)
    open(os.path.join(Q, "x.txt"), "w").write("still readable")
    L = os.path.join(root, "shortcut")
    os.symlink(Q, L)
    ns["_rag_remember"](L)
    os.remove(L)
    other = os.path.join(root, "other")
    os.makedirs(other)
    os.symlink(other, L)
    f1 = ns["_rag_forget_folder"](L)
    ok(f1.get("ok") is True and f1.get("forgot") is True and ns["_rag_folders"]() == [], "a folder chosen through a link is forgotten by the path it was chosen with, after the link changed", f1)
    rd = ns["_rag_read"](Q, "x.txt", 0, 100)
    ok(rd.get("code") == "NOT_CHOSEN", "and its old real path can no longer be read", rd)
    ok(problems == [], "no problem logged", problems)
    LABEL = ""


# ======================================================================================================================== the run
def main(argv):
    global LABEL
    work = tempfile.mkdtemp(prefix="rag_bridge_test_")
    try_dir = argv[1] if len(argv) > 1 else os.path.join(work, "desktop_try")
    os.makedirs(try_dir, exist_ok=True)
    home = os.path.join(work, "home")
    os.makedirs(home, exist_ok=True)
    os.environ["HOME"] = home                       # the app's data folder is under it
    os.environ["USERPROFILE"] = home
    os.environ["APPDATA"] = os.path.join(home, "AppData", "Roaming")
    patched = section_patch(try_dir)
    # the stand-in over HTTP
    srv, bridge = rag_bridge.serve(0)
    suite(Http("http://127.0.0.1:%d" % srv.server_address[1]), work)
    srv.shutdown()
    # the patched copies' own API classes
    rag_bridge.install_fake_webview()
    for tag, cls in (("mini", "IngeniumApi"), ("mini", "IngeniumApiSingle"), ("win", "IngeniumApi"), ("win", "IngeniumApiSingle")):
        suite(Module(patched[tag], cls, tag), work)
    # the Mac (Intel) copy is the same text as the Mac mini's: a short check that it imports and answers
    LABEL = "intel / IngeniumApi"
    A = Module(patched["intel"], "IngeniumApi", "intel")
    A.state()
    A.dialog(os.path.join(FIX, "household_papers"))
    r = A.call("rag_choose_folder")
    ok(r.get("ok") is True and len(A.call("rag_list", r["path"])["files"]) == 20, "the Mac (Intel) copy imports, chooses a folder and lists its 20 files", r)
    ok(inspect.signature(A.api.rag_read).parameters["length"].default == MB, "rag_read's length defaults to 1 MB")
    direct(work)
    review_fixes(work)
    section_server(patched["mini"], work)
    section_shim(work)
    LABEL = ""
    print("%d passed, %d failed" % (passed, failed))
    shutil.rmtree(work, ignore_errors=True)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
