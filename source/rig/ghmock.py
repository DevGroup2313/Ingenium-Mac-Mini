#!/usr/bin/env python3
"""A stand-in for GitHub's REST API, for testing Fabrica's GitHub bridge here, with real git object hashing.
Serves the endpoints the bridge uses: user, repos, git data (blobs, trees, commits, refs), releases and asset
uploads, actions (workflows, dispatches, runs, artifacts) and issues. Everything lives in memory.
Usage: python3 ghmock.py <port>   (state is reset with POST /_reset; a seed with POST /_seed)"""
import sys, json, hashlib, base64, re, time, zlib
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

def oid(kind, body):
    return hashlib.sha1(("%s %d\0" % (kind, len(body))).encode() + body).hexdigest()

def tree_body(entries):
    # entries: [{path, mode, type, sha}] -> canonical git tree bytes (sorted as git sorts: trees compare with a trailing /)
    def key(e):
        return e["path"] + ("/" if e["type"] == "tree" else "")
    out = b""
    for e in sorted(entries, key=key):
        mode = e["mode"].lstrip("0") if e["mode"] != "040000" else "40000"
        out += ("%s %s\0" % (mode, e["path"])).encode() + bytes.fromhex(e["sha"])
    return out

def commit_body(tree, parents, author, committer, message):
    s = "tree %s\n" % tree
    for p in parents:
        s += "parent %s\n" % p
    s += "author %s\ncommitter %s\n\n%s" % (author, committer, message)
    return s.encode()

def ident(p):
    # {name, email, date(ISO with offset)} -> "name <email> ts tz"
    m = re.match(r"(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:\.\d+)?(Z|[+-]\d\d:?\d\d)$", p.get("date", ""))
    if not m:
        ts = int(time.time()); tz = "+0000"
    else:
        import calendar
        y, mo, d, h, mi, s, z = m.groups()
        local = calendar.timegm((int(y), int(mo), int(d), int(h), int(mi), int(s)))
        if z == "Z":
            off = 0; tz = "+0000"
        else:
            sign = 1 if z[0] == "+" else -1; zz = z[1:].replace(":", "")
            off = sign * (int(zz[:2]) * 3600 + int(zz[2:]) * 60); tz = z[0] + zz
        ts = local - off
    return "%s <%s> %d %s" % (p.get("name", ""), p.get("email", ""), ts, tz)

S = {}
def reset():
    S.clear()
    S.update({"objects": {}, "refs": {}, "releases": [], "assets": {}, "runs": [], "dispatches": [], "issues": [], "log": [], "nextid": 100})
reset()

class H(BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Expose-Headers", "*")
    def send(self, code, obj=None, raw=None, ctype="application/json"):
        body = raw if raw is not None else (json.dumps(obj).encode() if obj is not None else b"")
        self.send_response(code); self._cors(); self.send_header("Content-Type", ctype); self.send_header("Content-Length", str(len(body))); self.end_headers()
        if body: self.wfile.write(body)
    def body(self):
        n = int(self.headers.get("Content-Length") or 0); b = self.rfile.read(n) if n else b""
        return b
    def jbody(self):
        b = self.body(); return json.loads(b or b"{}")
    def do_OPTIONS(self): self.send(204)
    def auth(self):
        a = self.headers.get("Authorization", "")
        return a.startswith("Bearer ") or a.startswith("token ")
    def do_GET(self): self.route("GET")
    def do_POST(self): self.route("POST")
    def do_PATCH(self): self.route("PATCH")
    def do_DELETE(self): self.route("DELETE")
    def route(self, m):
        u = urlparse(self.path); p = u.path; q = parse_qs(u.query)
        S["log"].append(m + " " + p)
        if p == "/_reset" and m == "POST": reset(); return self.send(200, {"ok": True})
        if p == "/_state" and m == "GET": return self.send(200, {"refs": S["refs"], "objects": len(S["objects"]), "releases": S["releases"], "assets": {k: len(v) for k, v in S["assets"].items()}, "runs": S["runs"], "dispatches": S["dispatches"], "issues": S["issues"], "log": S["log"][-40:]})
        if p == "/_object" and m == "GET":
            o = S["objects"].get(q["sha"][0]); return self.send(200, {"type": o[0], "body": base64.b64encode(o[1]).decode()} if o else None) if o else self.send(404, {"message": "no"})
        if p == "/_runs" and m == "POST":
            S["runs"] = self.jbody(); return self.send(200, {"ok": True})
        # 6.9.1: GitHub's device sign-in (the page opens github.com/login/device; the app polls for the token)
        if p == "/login/device/code" and m == "POST":
            f = parse_qs(self.body().decode("utf-8", "replace")); S["oauth"] = {"client_id": f.get("client_id", [""])[0], "scope": f.get("scope", [""])[0], "polls": 0, "approved": False}
            if not S["oauth"]["client_id"]: return self.send(200, {"error": "incorrect_client_credentials"})
            return self.send(200, {"device_code": "dev-1", "user_code": "ABCD-1234", "verification_uri": "http://127.0.0.1:%d/login/device" % PORT, "expires_in": 900, "interval": 1})
        if p == "/login/device" and m == "GET": return self.send(200, raw=b"<!doctype html><title>Device Activation</title><p>Enter the code shown in the app.</p>", ctype="text/html")
        if p == "/login/oauth/access_token" and m == "POST":
            f = parse_qs(self.body().decode("utf-8", "replace")); o = S.setdefault("oauth", {"polls": 0, "approved": False}); o["polls"] += 1
            o["grant"] = f.get("grant_type", [""])[0]; o["poll_client"] = f.get("client_id", [""])[0]; o["device"] = f.get("device_code", [""])[0]
            if o["grant"] != "urn:ietf:params:oauth:grant-type:device_code" or o["device"] != "dev-1": return self.send(200, {"error": "incorrect_device_code"})
            if o["polls"] == 1: return self.send(200, {"error": "slow_down", "interval": 2})
            if not o["approved"]: return self.send(200, {"error": "authorization_pending"})
            return self.send(200, {"access_token": "gho_test", "token_type": "bearer", "scope": "repo workflow"})
        if p == "/_approve" and m == "POST": S.setdefault("oauth", {})["approved"] = True; return self.send(200, {"ok": True})
        if p == "/_oauth" and m == "GET": return self.send(200, S.get("oauth") or {})
        if not self.auth(): return self.send(401, {"message": "Requires authentication"})
        if p == "/user": return self.send(200, {"login": "testowner", "name": "Test Owner"})
        if p == "/user/repos": return self.send(200, [{"full_name": "testowner/notes", "name": "notes", "owner": {"login": "testowner"}, "default_branch": "main", "private": False, "pushed_at": "2026-10-17T10:00:00Z"}, {"full_name": "testowner/other", "name": "other", "owner": {"login": "testowner"}, "default_branch": "main", "private": True, "pushed_at": "2026-10-16T10:00:00Z"}])
        mm = re.match(r"^/repos/([^/]+)/([^/]+)(/.*)?$", p)
        if not mm: return self.send(404, {"message": "Not Found"})
        owner, repo, rest = mm.group(1), mm.group(2), mm.group(3) or ""
        if rest == "" and m == "GET": return self.send(200, {"full_name": owner + "/" + repo, "default_branch": "main", "private": False, "html_url": "https://github.example/%s/%s" % (owner, repo), "permissions": {"push": True}})
        # git data
        r = re.match(r"^/git/ref/(heads|tags)/(.+)$", rest)
        if r and m == "GET":
            k = "refs/%s/%s" % (r.group(1), r.group(2)); sha = S["refs"].get(k)
            return self.send(200, {"ref": k, "object": {"sha": sha, "type": "commit"}}) if sha else self.send(404, {"message": "Not Found"})
        if rest == "/git/refs" and m == "POST":
            b = self.jbody(); S["refs"][b["ref"]] = b["sha"]; return self.send(201, {"ref": b["ref"], "object": {"sha": b["sha"]}})
        r = re.match(r"^/git/refs/(heads|tags)/(.+)$", rest)
        if r and m == "PATCH":
            b = self.jbody(); k = "refs/%s/%s" % (r.group(1), r.group(2)); old = S["refs"].get(k)
            if old and not b.get("force") and not self.is_ancestor(old, b["sha"]): return self.send(422, {"message": "Update is not a fast forward"})
            S["refs"][k] = b["sha"]; return self.send(200, {"ref": k, "object": {"sha": b["sha"]}})
        if rest == "/git/blobs" and m == "POST":
            b = self.jbody(); data = base64.b64decode(b["content"]) if b.get("encoding") == "base64" else b["content"].encode()
            sha = oid("blob", data); S["objects"][sha] = ("blob", data); return self.send(201, {"sha": sha})
        r = re.match(r"^/git/blobs/([0-9a-f]{40})$", rest)
        if r and m == "GET":
            o = S["objects"].get(r.group(1))
            if not o or o[0] != "blob": return self.send(404, {"message": "Not Found"})
            return self.send(200, {"sha": r.group(1), "size": len(o[1]), "encoding": "base64", "content": base64.b64encode(o[1]).decode()})
        if rest == "/git/trees" and m == "POST":
            b = self.jbody(); ents = b["tree"]
            for e in ents:
                if e["sha"] not in S["objects"]: return self.send(422, {"message": "Tree SHA does not exist: " + e["sha"]})
            body = tree_body(ents); sha = oid("tree", body); S["objects"][sha] = ("tree", body); return self.send(201, {"sha": sha})
        r = re.match(r"^/git/trees/([0-9a-f]{40})$", rest)
        if r and m == "GET":
            o = S["objects"].get(r.group(1))
            if not o or o[0] != "tree": return self.send(404, {"message": "Not Found"})
            ents = []; b = o[1]; i = 0
            while i < len(b):
                sp = b.index(b" ", i); nul = b.index(b"\0", sp); mode = b[i:sp].decode(); name = b[sp + 1:nul].decode(); sha = b[nul + 1:nul + 21].hex(); i = nul + 21
                ents.append({"path": name, "mode": mode.zfill(6), "type": "tree" if mode == "40000" else "blob", "sha": sha, "size": len(S["objects"][sha][1]) if sha in S["objects"] and mode != "40000" else None})
            return self.send(200, {"sha": r.group(1), "tree": ents})
        if rest == "/git/commits" and m == "POST":
            b = self.jbody(); a = ident(b["author"]); c = ident(b.get("committer") or b["author"])
            body = commit_body(b["tree"], b.get("parents", []), a, c, b["message"]); sha = oid("commit", body); S["objects"][sha] = ("commit", body)
            return self.send(201, {"sha": sha, "tree": {"sha": b["tree"]}, "parents": [{"sha": x} for x in b.get("parents", [])]})
        r = re.match(r"^/git/commits/([0-9a-f]{40})$", rest)
        if r and m == "GET":
            o = S["objects"].get(r.group(1))
            if not o or o[0] != "commit": return self.send(404, {"message": "Not Found"})
            t = o[1].decode("utf-8", "replace"); head, msg = t.split("\n\n", 1); tree = None; parents = []; author = committer = None
            for line in head.split("\n"):
                k, v = line.split(" ", 1)
                if k == "tree": tree = v
                elif k == "parent": parents.append(v)
                elif k == "author": author = v
                elif k == "committer": committer = v
            def person(s):
                mm2 = re.match(r"^(.*?) <([^>]*)> (\d+) ([+-]\d{4})$", s); ts = int(mm2.group(3)); tz = mm2.group(4)
                off = (int(tz[1:3]) * 3600 + int(tz[3:5]) * 60) * (1 if tz[0] == "+" else -1)
                d = time.gmtime(ts + off); return {"name": mm2.group(1), "email": mm2.group(2), "date": time.strftime("%Y-%m-%dT%H:%M:%S", d) + tz[:3] + ":" + tz[3:]}
            return self.send(200, {"sha": r.group(1), "tree": {"sha": tree}, "parents": [{"sha": x} for x in parents], "message": msg, "author": person(author), "committer": person(committer)})
        # releases
        if rest == "/releases" and m == "GET": return self.send(200, list(reversed(S["releases"])))
        if rest == "/releases" and m == "POST":
            b = self.jbody(); S["nextid"] += 1; rid = S["nextid"]
            rel = {"id": rid, "tag_name": b["tag_name"], "name": b.get("name") or b["tag_name"], "body": b.get("body", ""), "draft": bool(b.get("draft")), "html_url": "https://github.example/%s/%s/releases/tag/%s" % (owner, repo, b["tag_name"]), "upload_url": "http://127.0.0.1:%d/repos/%s/%s/releases/%d/assets{?name,label}" % (PORT, owner, repo, rid), "assets": [], "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())}
            if b.get("tag_name") and b.get("target_commitish"): S["refs"]["refs/tags/" + b["tag_name"]] = b["target_commitish"]
            S["releases"].append(rel); return self.send(201, rel)
        r = re.match(r"^/releases/(\d+)/assets$", rest)
        if r and m == "POST":
            rid = int(r.group(1)); rel = [x for x in S["releases"] if x["id"] == rid]
            if not rel: return self.send(404, {"message": "Not Found"})
            data = self.body(); name = q.get("name", ["asset"])[0]; S["nextid"] += 1; aid = S["nextid"]; S["assets"][str(aid)] = data
            asset = {"id": aid, "name": name, "size": len(data), "browser_download_url": "http://127.0.0.1:%d/_asset/%d/%s" % (PORT, aid, name), "content_type": self.headers.get("Content-Type", "")}
            rel[0]["assets"].append(asset); return self.send(201, asset)
        # actions
        if rest == "/actions/workflows" and m == "GET": return self.send(200, {"total_count": 2, "workflows": [{"id": 1, "name": "Build for the Fire tablet", "path": ".github/workflows/build-android.yml", "state": "active"}, {"id": 2, "name": "Build for the Mac", "path": ".github/workflows/build-mac.yml", "state": "active"}]})
        r = re.match(r"^/actions/workflows/(\d+)/dispatches$", rest)
        if r and m == "POST":
            b = self.jbody(); S["dispatches"].append({"workflow": int(r.group(1)), "ref": b.get("ref")}); S["nextid"] += 1
            S["runs"].insert(0, {"id": S["nextid"], "name": ["", "Build for the Fire tablet", "Build for the Mac"][int(r.group(1))], "status": "queued", "conclusion": None, "head_branch": b.get("ref"), "html_url": "https://github.example/%s/%s/actions/runs/%d" % (owner, repo, S["nextid"]), "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "head_sha": S["refs"].get("refs/heads/" + str(b.get("ref")), "")})
            return self.send(204)
        if rest == "/actions/runs" and m == "GET":
            br = q.get("branch", [None])[0]; runs = [x for x in S["runs"] if not br or x["head_branch"] == br]; return self.send(200, {"total_count": len(runs), "workflow_runs": runs})
        r = re.match(r"^/actions/runs/(\d+)/artifacts$", rest)
        if r and m == "GET":
            rid = int(r.group(1)); arts = [{"id": rid * 10 + 1, "name": "Ingenium-Fire-Tablet-app", "size_in_bytes": 15320970, "expired": False, "archive_download_url": "http://127.0.0.1:%d/repos/%s/%s/actions/artifacts/%d/zip" % (PORT, owner, repo, rid * 10 + 1)}] if any(x["id"] == rid and x["status"] == "completed" for x in S["runs"]) else []
            return self.send(200, {"total_count": len(arts), "artifacts": arts})
        r = re.match(r"^/actions/artifacts/(\d+)/zip$", rest)
        if r and m == "GET":
            z = b"PK\x05\x06" + b"\0" * 18; return self.send(200, raw=z, ctype="application/zip")
        # issues
        if rest == "/issues" and m == "GET": return self.send(200, [x for x in S["issues"] if x["state"] == q.get("state", ["open"])[0]])
        if rest == "/issues" and m == "POST":
            b = self.jbody(); S["nextid"] += 1; it = {"number": len(S["issues"]) + 1, "id": S["nextid"], "title": b["title"], "body": b.get("body", ""), "state": "open", "html_url": "https://github.example/%s/%s/issues/%d" % (owner, repo, len(S["issues"]) + 1), "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())}
            S["issues"].append(it); return self.send(201, it)
        return self.send(404, {"message": "Not Found: " + m + " " + p})
    def is_ancestor(self, old, new):
        seen = set(); q = [new]
        while q:
            s = q.pop()
            if s == old: return True
            if s in seen: continue
            seen.add(s); o = S["objects"].get(s)
            if not o or o[0] != "commit": continue
            for line in o[1].decode("utf-8", "replace").split("\n\n", 1)[0].split("\n"):
                if line.startswith("parent "): q.append(line[7:])
        return False

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8170
if __name__ == "__main__":
    class HH(H):
        def do_GET(self):
            if self.path.startswith("/_asset/"):
                aid = self.path.split("/")[2]; data = S["assets"].get(aid, b""); return self.send(200, raw=data, ctype="application/octet-stream")
            return self.route("GET")
    ThreadingHTTPServer(("127.0.0.1", PORT), HH).serve_forever()
