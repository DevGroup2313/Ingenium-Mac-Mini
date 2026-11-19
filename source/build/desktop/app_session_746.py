"""Ingenium 7.46: a version kept on a branch of its own, in a repository on a drive (modules/r333.js, r280's ROUTE.commitTo).

Fabrica's plan, stage 1 (her words, 19 November 2026: "I want for both chats to be able to connect to both Github repositories and
Fabrica's repositories in the same way and work flawlessly"): a Code session keeps its work on its own branch (ingenium/...), never on
the branch it began from, and never on the branch the repository's folder has out. On a drive the computer app keeps the repository, so
this is the app's part: the version's files are written as git objects with dulwich, the tree is the branch's last version with the
session's changes, the commit names that version as its parent, and the branch is moved only if nobody moved it meanwhile. The files in
the repository's folder, its index and the branch it has out are not touched.

    disk_commit_to(rid, branch, changes, message, frm=None, name=None, email=None)
        changes: [{"path": ..., "b64": ...}] ({"path": ..., "b64": None} takes a file away); frm: where a new branch starts (a branch
        or a version; the one out when none is given)

    python3 build/desktop/app_session_746.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_disk_commit_to" in s:
    print("already patched", p)
    sys.exit(0)

rep('''    def disk_commit(self, rid, message, name=None, email=None):
        return _disk_commit(rid, message, name, email)
''', '''    def disk_commit(self, rid, message, name=None, email=None):
        return _disk_commit(rid, message, name, email)

    # 7.46 (app_session_746.py): a version kept on a branch of its own, the folder's files untouched
    def disk_commit_to(self, rid, branch, changes, message, frm=None, name=None, email=None):
        return _disk_commit_to(rid, branch, changes, message, frm, name, email)
''', 2)

rep('''def _disk_commit(rid, message, name=None, email=None):''', '''def _disk_commit_to(rid, branch, changes, message, frm=None, name=None, email=None):
    """7.46 (app_session_746.py): keep a version on the branch named, made from frm the first time, without touching the folder"""
    import base64
    import time as _t
    from dulwich.objects import Blob, Commit
    from dulwich.index import commit_tree
    from dulwich.object_store import iter_tree_contents
    msg = str(message or "").replace("\\r\\n", "\\n").strip()
    if not msg:
        return {"ok": False, "error": "A few words first: what changed?"}
    b = str(branch or "").strip()
    if (not b or b.startswith("/") or b.endswith("/") or ".." in b or "//" in b or b.endswith(".lock")
            or any(ch in b for ch in " ~^:?*[\\\\") or b.startswith("-")):
        return {"ok": False, "error": "“%s” cannot be a branch's name." % b}
    with _DISK["lock"]:
        try:
            repo, k = _disk_open(rid)
            ref = ("refs/heads/" + b).encode("utf-8")
            try:
                head = repo.refs.read_ref(b"HEAD")
            except Exception:
                head = None
            if head == b"ref: " + ref:
                return {"ok": False, "error": "“%s” is the branch its folder has out: keep the work there." % b}
            old = repo.refs[ref] if ref in repo.refs.keys() else None
            if old is None:
                start = str(frm or "")
                if not start:
                    tip = repo.head()
                elif len(start) == 40 and all(c in "0123456789abcdef" for c in start):
                    tip = start.encode()
                elif ("refs/heads/" + start).encode() in repo.refs.keys():
                    tip = repo.refs[("refs/heads/" + start).encode()]
                elif ("refs/tags/" + start).encode() in repo.refs.keys():
                    tip = repo.refs[("refs/tags/" + start).encode()]
                else:
                    return {"ok": False, "error": "There is no branch or version called “%s” to start from." % start}
            else:
                tip = old
            c0 = repo[tip]
            while c0.type_name == b"tag":
                c0 = repo[c0.object[1]]
            files = {}
            for e in iter_tree_contents(repo.object_store, c0.tree):
                files[e.path] = (e.mode, e.sha)
            for ch in changes or []:
                path = str((ch or {}).get("path") or "").replace("\\\\", "/").lstrip("/")
                parts = path.split("/")
                if not path or any(x in ("", ".", "..") for x in parts) or parts[0] == ".git":
                    return {"ok": False, "error": "“%s” cannot be a file's place." % path}
                pb = path.encode("utf-8")
                if ch.get("b64") is None:
                    files.pop(pb, None)
                    continue
                for q in list(files.keys()):
                    if q != pb and (q.startswith(pb + b"/") or pb.startswith(q + b"/")):
                        return {"ok": False, "error": "“%s” is in the way of “%s”." % (_disk_text(q), path)}
                blob = Blob.from_string(base64.b64decode(ch["b64"]))
                repo.object_store.add_object(blob)
                files[pb] = (files[pb][0] if pb in files else 0o100644, blob.id)
            tree = commit_tree(repo.object_store, [(q, sha, mode) for q, (mode, sha) in files.items()])
            if tree == c0.tree:
                return {"ok": False, "error": "Nothing has changed since the last version."}
            ident = _disk_ident(repo, name, email)
            c = Commit()
            c.tree = tree
            c.parents = [c0.id]
            c.author = c.committer = ident
            now = int(_t.time())
            try:
                tz = int(_t.localtime(now).tm_gmtoff)
            except Exception:
                tz = 0
            c.author_time = c.commit_time = now
            c.author_timezone = c.commit_timezone = tz
            c.encoding = b"UTF-8"
            c.message = msg.encode("utf-8") + b"\\n"
            repo.object_store.add_object(c)
            moved = repo.refs.add_if_new(ref, c.id) if old is None else repo.refs.set_if_equals(ref, old, c.id)
            if not moved:
                return {"ok": False, "error": "The branch moved while the version was being kept: try again."}
            _DISK["size"].pop(os.path.realpath(repo.controldir()), None)
            return {"ok": True, "commit": _disk_text(c.id), "branch": b}
        except KeyError as e:
            return {"ok": False, "error": str(e).strip("'\\"")}
        except Exception as e:
            return {"ok": False, "error": "The version could not be kept: %s" % e}


def _disk_commit(rid, message, name=None, email=None):''')

open(p, "w", encoding="utf-8").write(s)
print("patched", p)
