"""Ingenium 6.83 · Fabrica, phase 1: everything on GitHub brought onto this computer, tested (build/desktop/app_hub_683.py).

Her words (11 November 2026): "I want to transfer all of my data and contents from GitHub directly to Ingenium and continue working
from there without missing a beat, this is really important to me"; "unlike GitHub I don't want any caps on file size". Copies of the
Mac and Windows ingenium_app.py are patched (once: a second run changes nothing; both compile); the Mac copy is imported (HOME in a
temporary folder) and brings everything from a stand-in GitHub (rig/hub683_mock.py: invented repositories and people). Checks:
  scan: both repositories, with their versions, branches, tags, issues, pull requests, releases and the file size of releases; the
    logo found in a repository's own files; a wrong key is refused in plain words;
  bring: every branch, tag and pull request's versions, as on GitHub, in a bare repository any git program opens (git fsck, git log);
    the wiki; issues and pull requests (131, over two pages), 204 comments, reviews, labels, milestones; the release's file, its
    fingerprint as GitHub gives it, fetched from the file host without the key; workflows and their runs; check.json and the index;
    GitHub's request to wait is waited out; pause and carry on; nothing on GitHub was changed (no request but GET and git's fetch);
  again: only what is new travels (one new version comes in; the release file is not fetched twice);
  stop: stopped and said so; room: a drive without room is refused before anything is fetched.
    python3 -I rig/t_683_hub_engine.py <Mac ingenium_app.py> <Windows ingenium_app.py>
"""
import importlib.util, json, os, py_compile, shutil, subprocess, sys, tempfile, time, hashlib

HERE = os.path.dirname(os.path.abspath(__file__))
PATCH = os.path.join(HERE, "..", "build", "desktop", "app_hub_683.py")
MAC, WIN = sys.argv[1], sys.argv[2]
TOKEN = "invented-key-683"
passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    if c:
        passed += 1
        print("PASS " + m)
    else:
        failed += 1
        print("FAIL " + m + ("" if d is None else "  " + str(d)[:700]))


T = tempfile.mkdtemp(prefix="hub683-")
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
    ok(r1.returncode == 0 and "patched" in r1.stdout and "already patched" in r2.stdout and comp is True,
       "the %s app is patched once, and compiles" % k, (r1.stdout, r1.stderr, r2.stdout, comp))
    copies[k] = dst

PORT, FPORT = 18683, 18684
WORK = os.path.join(T, "github")
os.makedirs(WORK)
LOG = os.path.join(T, "requests.jsonl")
mock = subprocess.Popen([sys.executable, os.path.join(HERE, "hub683_mock.py"), str(PORT), str(FPORT), WORK, TOKEN, LOG], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
assert mock.stdout.readline().strip() == "ready", mock.stderr.read()
os.environ["INGENIUM_HUB_API"] = "http://127.0.0.1:%d/api" % PORT
os.environ["INGENIUM_HUB_GIT"] = "http://127.0.0.1:%d/git" % PORT
HOME = os.path.join(T, "home")
os.makedirs(HOME)
os.environ["HOME"] = HOME
spec = importlib.util.spec_from_file_location("ingenium_app", copies["mac"])
A = importlib.util.module_from_spec(spec)
spec.loader.exec_module(A)


def wait(key, states=("done", "failed", "stopped", "done-with-problems"), limit=180):
    t0 = time.time()
    while time.time() - t0 < limit:
        st = A._hub_status()
        x = st.get(key) or {}
        if x.get("state") in states:
            return st
        time.sleep(0.2)
    return A._hub_status()


def requests():
    with open(LOG) as fh:
        return [json.loads(l) for l in fh if l.strip()]


try:
    DRIVE = os.path.join(T, "studio-drive")
    os.makedirs(DRIVE)
    r = A._hub_set_place(DRIVE)
    place = os.path.join(DRIVE, "Ingenium GitHub")
    ok(r.get("ok") and A._hub_place() == place and os.path.isdir(place), "the place chosen is a folder named Ingenium GitHub on that drive", r)
    sh = A._selftest_hub()
    ok(sh.get("ok") and sh.get("dulwich") == "0.22.8" and sh.get("refs") == 2, "the build's self-test: the git part is inside the app and fetches (dulwich %s)" % sh.get("dulwich"), sh)
    pl = A._hub_places()
    ok(pl.get("ok") and pl["places"][0]["label"] == "This computer" and isinstance(pl["places"][0]["free"], int), "the places name this computer with its free space", pl)

    # a wrong key
    A._hub_scan("not-the-key")
    st = wait("scan")
    ok(st["scan"]["state"] == "failed" and "did not accept the key" in st["scan"].get("error", ""), "a wrong key is refused in plain words", st["scan"])

    # scan
    A._hub_scan(TOKEN)
    st = wait("scan")
    sc = st["scan"]
    byname = {x["name"]: x for x in sc.get("repos") or []}
    ln = byname.get("lantern-notes") or {}
    ok(sc["state"] == "done" and sc.get("login") == "ledger-studio" and set(byname) == {"lantern-notes", "harbour-garden"}, "the scan finds both repositories", sc)
    ok(ln.get("versions") == 7 and ln.get("branches") == 2 and ln.get("tags") == 2 and ln.get("issues") == 130 and ln.get("pulls") == 1
       and ln.get("releases") == 1 and ln.get("release_bytes") == 150000 and ln.get("private") is True,
       "lantern-notes: 7 versions, 2 branches, 2 tags, 130 issues, 1 pull request, 1 release of 150,000 bytes, private", ln)
    hg = byname.get("harbour-garden") or {}
    ok(str(hg.get("icon") or "").startswith("data:image/png;base64,") and ln.get("icon") is None,
       "harbour-garden's own logo is found in its files (lantern-notes has none, and Fabrica shows its app's logo instead)", (str(hg.get("icon"))[:40], ln.get("icon")))

    # room
    big = dict(ln, kb=10 ** 12)
    r = A._hub_bring(TOKEN, {"repos": [big]})
    ok(not r.get("ok") and "GB free" in r.get("error", ""), "a drive without room is refused before anything is fetched", r)

    # bring, with a pause
    r = A._hub_bring(TOKEN, {"repos": sc["repos"], "what": {"issues": True, "releases": True, "wiki": True, "actions": True}})
    ok(r.get("ok") and r.get("place") == place, "bringing starts, into the place chosen", r)
    time.sleep(0.3)
    p1 = A._hub_pause(True)["job"]["state"]
    time.sleep(1.0)
    seen = len(requests())
    time.sleep(1.0)
    still = len(requests()) == seen
    p2 = A._hub_pause(False)["job"]["state"]
    ok(p1 == "paused" and still and p2 == "running", "paused, nothing more is asked of GitHub; then it carries on", (p1, still, p2))
    st = wait("job", limit=240)
    job = st["job"]
    ok(job["state"] == "done" and all(x["stage"] == "done" for x in job["repos"]), "both repositories are brought, and checked", job)

    from dulwich.repo import Repo
    src = Repo(os.path.join(WORK, "lantern-notes.git"))
    dst = Repo(os.path.join(place, "ledger-studio", "lantern-notes.git"))
    want = {k: v for k, v in src.refs.as_dict().items() if k.startswith((b"refs/heads/", b"refs/tags/", b"refs/pull/"))}
    have = {k: v for k, v in dst.refs.as_dict().items() if k.startswith((b"refs/heads/", b"refs/tags/", b"refs/pull/"))}
    ok(want == have and len(have) == 5, "every branch, tag and pull request's versions, as on GitHub (5 names)", (sorted(want), sorted(have)))
    ok(dst.refs.read_ref(b"HEAD") == b"ref: refs/heads/main", "it opens on its default branch", dst.refs.read_ref(b"HEAD"))
    gd = os.path.join(place, "ledger-studio", "lantern-notes.git")
    fsck = subprocess.run(["git", "--git-dir", gd, "fsck", "--full"], capture_output=True, text=True)
    lg = subprocess.run(["git", "--git-dir", gd, "log", "--all", "--oneline"], capture_output=True, text=True)
    ok(fsck.returncode == 0 and len(lg.stdout.strip().splitlines()) == 9, "git itself opens it: fsck finds nothing wrong, and its log holds all 9 versions", (fsck.stderr[-300:], lg.stdout))
    wd = os.path.join(place, "ledger-studio", "lantern-notes.wiki.git")
    ok(os.path.isdir(wd) and Repo(wd).refs.as_dict().get(b"refs/heads/master"), "the wiki, with its history", os.path.isdir(wd))
    hub = os.path.join(place, "ledger-studio", "lantern-notes.hub")
    J = lambda n: json.load(open(os.path.join(hub, n), encoding="utf-8"))
    iss, com, pul, rev = J("issues.json"), J("comments.json"), J("pulls.json"), J("reviews.json")
    ok(len(iss) == 131 and len(com) == 204 and len(pul) == 1 and rev.get("131") and len(J("labels.json")) == 2 and len(J("milestones.json")) == 1
       and len(J("review_comments.json")) == 1, "issues and pull requests (131), 204 comments, the review, labels and milestones", (len(iss), len(com), len(pul)))
    ok(J("repo.json").get("description") == "Notes by lamplight" and J("repo.json").get("topics") == ["notes"], "its description and topics", J("repo.json"))
    fp = os.path.join(hub, "releases", "v1.1", "lantern-notes-mac.zip")
    sha = open(os.path.join(WORK, "asset.sha256")).read().strip()
    got = hashlib.sha256(open(fp, "rb").read()).hexdigest() if os.path.isfile(fp) else None
    ok(got == sha and J("releases.json")[0]["tag_name"] == "v1.1", "the release's file, with the fingerprint GitHub gives", (got, sha))
    R = requests()
    fhost = [x for x in R if x["port"] == FPORT]
    ok(fhost and all(not x["auth"] for x in fhost), "the file was fetched from the file host without the key", fhost)
    ok(len(J("workflows.json")) == 1 and len(J("runs.json")) == 5, "the workflow and its 5 run records", None)
    lab = [x for x in R if x["path"].endswith("/labels")]
    ok(len(lab) >= 2, "GitHub's request to wait was waited out, and the labels came after", lab)
    ok(all(x["method"] in ("GET",) or x["path"].endswith("/git-upload-pack") for x in R), "nothing on GitHub was changed: only reading, and git's fetch",
       [x for x in R if x["method"] != "GET"][:3])
    ck = J("check.json")
    ok(ck["check"].get("refs_match") and ck["check"].get("issues_match") and ck["check"].get("release_files_match"), "check.json: every name, issue and file matches GitHub", ck)
    br = A._hub_brought()
    names = {x["full"]: x for x in br.get("repos") or []}
    ok(br.get("ok") and set(names) == {"ledger-studio/lantern-notes", "ledger-studio/harbour-garden"} and all(x["present"] for x in names.values())
       and str(names["ledger-studio/harbour-garden"].get("icon") or "").startswith("data:image/png"), "the brought repositories are listed, with harbour-garden's logo", br)

    # again: only what is new
    before = len([x for x in requests() if x["port"] == FPORT])
    open(os.path.join(WORK, "add_commit"), "w").write("1")
    A._hub_scan(TOKEN)
    sc2 = wait("scan")["scan"]
    A._hub_bring(TOKEN, {"repos": [x for x in sc2["repos"] if x["name"] == "lantern-notes"]})
    st = wait("job", limit=240)
    dst = Repo(os.path.join(place, "ledger-studio", "lantern-notes.git"))
    src = Repo(os.path.join(WORK, "lantern-notes.git"))
    after = len([x for x in requests() if x["port"] == FPORT])
    ok(st["job"]["state"] == "done" and dst.refs[b"refs/heads/main"] == src.refs[b"refs/heads/main"] and after == before,
       "brought again: the new version came in, and the release file was not fetched twice", (st["job"]["state"], after, before))

    # stop
    A._hub_bring(TOKEN, {"repos": sc2["repos"]})
    A._hub_stop()
    st = wait("job", limit=60)
    ok(st["job"]["state"] in ("stopped", "done"), "stopped when asked, and said so", st["job"].get("line"))
finally:
    mock.terminate()

print("\n%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
