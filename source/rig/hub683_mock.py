"""A stand-in for GitHub, for Ingenium 6.83's tests (build/desktop/app_hub_683.py). Invented repositories and people only.

It serves, on one port, git's own protocol over HTTP (/git/<owner>/<name>.git, through dulwich's own server, with the key as the
password) and the parts of GitHub's API that Fabrica reads (/api/...), 100 to a page with Link headers; and on a second port the
files of releases, as GitHub's own file host does: reached only by the address the API gives, and refusing any request that carries
a key. The first request for a repository's labels is told to wait two seconds (GitHub's limit of requests an hour), once.
Every request is written to <log> as one line of JSON.
    python3 rig/hub683_mock.py <port> <file port> <work folder> <token> <log>
<work folder>/add_commit: a file; while it exists, each request adds one version to lantern-notes's main (for "only what is new")."""
import base64, hashlib, json, os, sys, threading, time, urllib.parse
from wsgiref.simple_server import make_server, WSGIServer, WSGIRequestHandler
from socketserver import ThreadingMixIn

from dulwich.repo import Repo
from dulwich.objects import Blob, Tree, Commit, Tag
from dulwich.server import DictBackend
from dulwich.web import make_wsgi_chain

PORT, FPORT, WORK, TOKEN, LOG = int(sys.argv[1]), int(sys.argv[2]), sys.argv[3], sys.argv[4], sys.argv[5]
OWNER = "ledger-studio"
LOCK = threading.Lock()
PNG = base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==") * 1 + b"\0" * 900


def log(d):
    with LOCK:
        with open(LOG, "a") as fh:
            fh.write(json.dumps(d) + "\n")


# ---------- the invented repositories, made with git's own objects ----------
def commit(repo, files, parents, msg, when):
    tree = Tree()
    for name, data in sorted(files.items()):
        b = Blob.from_string(data)
        repo.object_store.add_object(b)
        tree.add(name.encode(), 0o100644, b.id)
    repo.object_store.add_object(tree)
    c = Commit()
    c.tree, c.parents, c.message = tree.id, parents, msg.encode()
    c.author = c.committer = b"Invented Person <invented@example.org>"
    c.author_time = c.commit_time = when
    c.author_timezone = c.commit_timezone = 0
    repo.object_store.add_object(c)
    return c.id


def make_repos():
    repos = {}
    t0 = 1762800000
    # lantern-notes: 7 versions on main, a branch, two tags (one annotated), a pull request's versions, a wiki
    r = Repo.init_bare(os.path.join(WORK, "lantern-notes.git"), mkdir=True)
    files, last = {"README.md": b"# Lantern Notes\n"}, []
    for k in range(7):
        files["notes%d.txt" % k] = ("note %d\n" % k).encode() * 40
        last = [commit(r, dict(files), last, "Version %d" % (k + 1), t0 + k * 3600)]
    r.refs[b"refs/heads/main"] = last[0]
    side = commit(r, dict(files, **{"side.txt": b"a side idea\n"}), last, "A side idea", t0 + 9 * 3600)
    r.refs[b"refs/heads/idea"] = side
    pr = commit(r, dict(files, **{"fix.txt": b"a fix\n"}), last, "A fix, offered", t0 + 10 * 3600)
    r.refs[b"refs/pull/1/head"] = pr
    r.refs[b"refs/tags/v1.0"] = last[0]
    tag = Tag()
    tag.object, tag.name, tag.tag_time, tag.tag_timezone = (Commit, last[0]), b"v1.1", t0 + 11 * 3600, 0
    tag.tagger, tag.message = b"Invented Person <invented@example.org>", b"The first release\n"
    r.object_store.add_object(tag)
    r.refs[b"refs/tags/v1.1"] = tag.id
    r.refs.set_symbolic_ref(b"HEAD", b"refs/heads/main")
    repos["lantern-notes"] = r
    w = Repo.init_bare(os.path.join(WORK, "lantern-notes.wiki.git"), mkdir=True)
    w.refs[b"refs/heads/master"] = commit(w, {"Home.md": b"# Welcome\n"}, [], "The wiki's first page", t0)
    w.refs.set_symbolic_ref(b"HEAD", b"refs/heads/master")
    repos["lantern-notes.wiki"] = w
    # harbour-garden: its own logo in its files, no wiki
    h = Repo.init_bare(os.path.join(WORK, "harbour-garden.git"), mkdir=True)
    h.refs[b"refs/heads/main"] = commit(h, {"index.html": b"<!doctype html><title>Harbour Garden</title>", "icon.png": PNG}, [], "The garden", t0)
    h.refs.set_symbolic_ref(b"HEAD", b"refs/heads/main")
    repos["harbour-garden"] = h
    return repos


REPOS = make_repos()
BACKEND = DictBackend({"/git/%s/%s.git" % (OWNER, k): v for k, v in REPOS.items()})
GITAPP = make_wsgi_chain(BACKEND)


def count_commits(repo, head):
    seen, todo = set(), [head]
    while todo:
        c = todo.pop()
        if c in seen:
            continue
        seen.add(c)
        todo.extend(repo[c].parents)
    return len(seen)


def add_commit_if_asked():
    if os.path.exists(os.path.join(WORK, "add_commit")):
        r = REPOS["lantern-notes"]
        head = r.refs[b"refs/heads/main"]
        n = count_commits(r, head)
        r.refs[b"refs/heads/main"] = commit(r, {"README.md": b"# Lantern Notes\n", "later%d.txt" % n: b"later\n"}, [head], "A later version", 1762900000 + n)
        os.remove(os.path.join(WORK, "add_commit"))


# ---------- the API ----------
def person(n):
    return {"login": "invented-%s" % n, "id": 1000 + len(n)}


ASSET = os.urandom(150000)
DATA = {
    "lantern-notes": {
        "issues": [{"number": n, "title": "Issue %d" % n, "state": "closed" if n % 2 else "open", "body": "Words of issue %d" % n, "user": person("a"),
                    "labels": [{"name": "idea"}], "created_at": "2026-11-0%dT10:00:00Z" % (n % 9 + 1)} for n in range(1, 131)]
                  + [{"number": 131, "title": "A fix, offered", "state": "open", "body": "", "user": person("b"), "pull_request": {"url": "x"}, "created_at": "2026-11-10T10:00:00Z"}],
        "pulls": [{"number": 131, "title": "A fix, offered", "state": "open", "head": {"ref": "fix"}, "base": {"ref": "main"}, "user": person("b")}],
        "comments": [{"id": k, "issue_url": "/issues/%d" % (k % 130 + 1), "body": "Comment %d" % k, "user": person("c")} for k in range(1, 205)],
        "review_comments": [{"id": 1, "body": "Look at this line", "path": "fix.txt"}],
        "reviews": {"131": [{"id": 9, "state": "APPROVED", "body": "Good"}]},
        "labels": [{"name": "idea", "color": "6a3fb5"}, {"name": "bug", "color": "a33a3a"}],
        "milestones": [{"number": 1, "title": "Spring"}],
        "releases": [{"id": 77, "tag_name": "v1.1", "name": "The first release", "body": "Notes",
                      "assets": [{"id": 501, "name": "lantern-notes-mac.zip", "size": len(ASSET), "digest": "sha256:" + hashlib.sha256(ASSET).hexdigest()}]}],
        "workflows": [{"id": 3, "name": "Build", "path": ".github/workflows/build.yml"}],
        "runs": [{"id": 9000 + k, "name": "Build", "conclusion": "success"} for k in range(1, 6)],
        "info": {"description": "Notes by lamplight", "topics": ["notes"], "has_wiki": True, "private": True},
    },
    "harbour-garden": {
        "issues": [], "pulls": [], "comments": [], "review_comments": [], "reviews": {}, "labels": [], "milestones": [], "releases": [],
        "workflows": [], "runs": [], "info": {"description": "A garden by the harbour", "topics": [], "has_wiki": False, "private": False},
    },
}
WAITED = {"labels": False}


def repo_json(name):
    d, r = DATA[name]["info"], REPOS[name]
    return {"name": name, "full_name": "%s/%s" % (OWNER, name), "private": d["private"], "default_branch": "main", "description": d["description"],
            "topics": d["topics"], "has_wiki": d["has_wiki"], "fork": False, "archived": False, "size": 120, "pushed_at": "2026-11-11T09:00:00Z",
            "clone_url": "http://127.0.0.1:%d/git/%s/%s.git" % (PORT, OWNER, name)}


def page(env, items):
    q = urllib.parse.parse_qs(env.get("QUERY_STRING", ""))
    per = max(1, min(100, int((q.get("per_page") or ["30"])[0])))
    pg = max(1, int((q.get("page") or ["1"])[0]))
    last = max(1, (len(items) + per - 1) // per)
    base = "http://127.0.0.1:%d%s?" % (PORT, env["PATH_INFO"])
    keep = {k: v[0] for k, v in q.items() if k not in ("page",)}
    links = []
    if pg < last:
        links.append('<%s>; rel="next"' % (base + urllib.parse.urlencode(dict(keep, page=pg + 1))))
        links.append('<%s>; rel="last"' % (base + urllib.parse.urlencode(dict(keep, page=last))))
    return items[(pg - 1) * per: pg * per], ([("Link", ", ".join(links))] if links else [])


def api(env, start):
    path = env["PATH_INFO"][len("/api"):]
    if env.get("HTTP_AUTHORIZATION") != "Bearer " + TOKEN:
        start("401 Unauthorized", [("Content-Type", "application/json")])
        return [b'{"message":"Bad credentials"}']
    add_commit_if_asked()
    parts = path.strip("/").split("/")
    q = urllib.parse.parse_qs(env.get("QUERY_STRING", ""))

    def ok(obj, extra=()):
        start("200 OK", [("Content-Type", "application/json")] + list(extra))
        return [json.dumps(obj).encode()]

    if path == "/user":
        return ok({"login": OWNER, "id": 42})
    if path == "/user/repos":
        items, h = page(env, [repo_json(n) for n in ("harbour-garden", "lantern-notes")])
        return ok(items, h)
    if len(parts) >= 3 and parts[0] == "repos" and parts[1] == OWNER and parts[2] in DATA:
        name, rest, d, r = parts[2], parts[3:], DATA[parts[2]], REPOS[parts[2]]
        if not rest:
            return ok(repo_json(name))
        k = rest[0]
        if k == "commits":
            sha = (q.get("sha") or ["main"])[0]
            n = count_commits(r, r.refs[b"refs/heads/" + sha.encode()])
            items, h = page(env, [{"sha": "x"}] * n)
            return ok(items, h)
        if k == "branches":
            items, h = page(env, [{"name": x[len(b"refs/heads/"):].decode()} for x in r.refs.keys() if x.startswith(b"refs/heads/")])
            return ok(items, h)
        if k == "tags":
            items, h = page(env, [{"name": x[len(b"refs/tags/"):].decode()} for x in r.refs.keys() if x.startswith(b"refs/tags/")])
            return ok(items, h)
        if k == "issues" and len(rest) == 1:
            items, h = page(env, d["issues"])
            return ok(items, h)
        if k == "issues" and rest[1:] == ["comments"]:
            items, h = page(env, d["comments"])
            return ok(items, h)
        if k == "pulls" and len(rest) == 1:
            items, h = page(env, d["pulls"])
            return ok(items, h)
        if k == "pulls" and rest[1:] == ["comments"]:
            items, h = page(env, d["review_comments"])
            return ok(items, h)
        if k == "pulls" and len(rest) == 3 and rest[2] == "reviews":
            items, h = page(env, d["reviews"].get(rest[1], []))
            return ok(items, h)
        if k == "labels":
            if not WAITED["labels"]:
                WAITED["labels"] = True
                start("403 Forbidden", [("Content-Type", "application/json"), ("X-RateLimit-Remaining", "0"), ("X-RateLimit-Reset", str(int(time.time()) + 2))])
                return [b'{"message":"API rate limit exceeded"}']
            items, h = page(env, d["labels"])
            return ok(items, h)
        if k == "milestones":
            items, h = page(env, d["milestones"])
            return ok(items, h)
        if k == "releases" and len(rest) == 1:
            items, h = page(env, d["releases"])
            return ok(items, h)
        if k == "releases" and len(rest) == 3 and rest[1] == "assets":
            if env.get("HTTP_ACCEPT") != "application/octet-stream":
                return ok({"id": int(rest[2])})
            start("302 Found", [("Location", "http://127.0.0.1:%d/files/%s?signature=invented" % (FPORT, rest[2]))])
            return [b""]
        if k == "actions" and rest[1:] == ["workflows"]:
            items, h = page(env, d["workflows"])
            return ok({"total_count": len(d["workflows"]), "workflows": items}, h)
        if k == "actions" and rest[1:] == ["runs"]:
            items, h = page(env, d["runs"])
            return ok({"total_count": len(d["runs"]), "workflow_runs": items}, h)
        if k == "git" and rest[1] == "trees":
            head = r.refs[b"refs/heads/" + rest[2].encode()]
            tree = r[r[head].tree]
            return ok({"tree": [{"path": e.path.decode(), "type": "blob", "sha": e.sha.decode(), "size": len(r[e.sha].data)} for e in tree.iteritems()]})
        if k == "git" and rest[1] == "blobs":
            return ok({"content": base64.b64encode(r[rest[2].encode()].data).decode(), "encoding": "base64"})
    start("404 Not Found", [("Content-Type", "application/json")])
    return [b'{"message":"Not Found"}']


def git_auth(env, start):
    a = env.get("HTTP_AUTHORIZATION") or ""
    if not a.startswith("Basic ") or base64.b64decode(a[6:]).decode().split(":", 1)[-1] != TOKEN:
        start("401 Unauthorized", [("WWW-Authenticate", 'Basic realm="GitHub"'), ("Content-Type", "text/plain")])
        return [b"Authentication required"]
    add_commit_if_asked()
    return GITAPP(env, start)


CORS = [("Access-Control-Allow-Origin", "*"), ("Access-Control-Allow-Headers", "Authorization, Accept, Content-Type, X-GitHub-Api-Version"),
        ("Access-Control-Allow-Methods", "GET, POST, OPTIONS"), ("Access-Control-Expose-Headers", "Link, X-RateLimit-Remaining, X-RateLimit-Reset")]


def app(env, start):
    log({"port": PORT, "method": env["REQUEST_METHOD"], "path": env["PATH_INFO"], "q": env.get("QUERY_STRING", ""), "auth": bool(env.get("HTTP_AUTHORIZATION"))})
    if env["PATH_INFO"].startswith("/api/"):
        if env["REQUEST_METHOD"] == "OPTIONS":  # a browser asks first (the page signs in with a key)
            start("204 No Content", CORS)
            return [b""]
        return api(env, lambda status, headers, *a: start(status, list(headers) + CORS, *a))
    if env["PATH_INFO"].startswith("/git/"):
        if not env["PATH_INFO"].split("/info/")[0].endswith(".git") and "/info/" not in env["PATH_INFO"] and "git-upload-pack" not in env["PATH_INFO"]:
            pass
        name = env["PATH_INFO"].split("/")[3] if len(env["PATH_INFO"].split("/")) > 3 else ""
        if name.replace(".git", "") not in REPOS:
            start("404 Not Found", [("Content-Type", "text/plain")])
            return [b"Repository not found"]
        return git_auth(env, start)
    start("404 Not Found", [("Content-Type", "text/plain")])
    return [b"not here"]


def files(env, start):
    log({"port": FPORT, "method": env["REQUEST_METHOD"], "path": env["PATH_INFO"], "q": env.get("QUERY_STRING", ""), "auth": bool(env.get("HTTP_AUTHORIZATION"))})
    if env.get("HTTP_AUTHORIZATION"):
        start("400 Bad Request", [("Content-Type", "text/plain")])
        return [b"Only one auth mechanism allowed"]
    if env["PATH_INFO"] == "/files/501":
        start("200 OK", [("Content-Type", "application/octet-stream"), ("Content-Length", str(len(ASSET)))])
        return [ASSET]
    start("404 Not Found", [("Content-Type", "text/plain")])
    return [b"no such file"]


class TServer(ThreadingMixIn, WSGIServer):
    daemon_threads = True


class Quiet(WSGIRequestHandler):
    def log_message(self, *a):
        pass


if __name__ == "__main__":
    open(os.path.join(WORK, "asset.sha256"), "w").write(hashlib.sha256(ASSET).hexdigest())
    a = make_server("127.0.0.1", PORT, app, server_class=TServer, handler_class=Quiet)
    f = make_server("127.0.0.1", FPORT, files, server_class=TServer, handler_class=Quiet)
    threading.Thread(target=f.serve_forever, daemon=True).start()
    print("ready", flush=True)
    a.serve_forever()
