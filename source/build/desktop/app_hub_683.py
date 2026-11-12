"""Ingenium 6.83 (11 November 2026): Fabrica, phase 1. Everything on GitHub, brought onto this computer.

The owner's words (11 November 2026): "I want to transfer all of my data and contents from GitHub directly to Ingenium and continue
working from there without missing a beat, this is really important to me", and "unlike GitHub I don't want any caps on file size";
asked whether GitHub stays as a backup: "For question 3, yes". On the preview (https://claude.ai/artifact/4E99gkSPJ11A6fHH2nk4Va):
"I like the preview please push it everywhere but make sure that all of the apps logos are showing instead of the coloured letters".

What it brings, for each repository she chooses, into a folder on the drive she chooses ("Ingenium GitHub"):
  - every version, every branch, every tag and every pull request's versions (refs/pull/*), in git's own format (a bare repository,
    <owner>/<name>.git, which any git program opens), through git's own protocol (dulwich, a git written in Python); the wiki the same
    way when it has pages (<owner>/<name>.wiki.git);
  - in <owner>/<name>.hub/: the repository's description and topics; issues and pull requests, with every comment, review and
    review comment, their labels and milestones; releases, with each of their files (checked by the fingerprint GitHub gives, or by
    their size); the workflows and the run records GitHub still keeps; and check.json, what was checked against GitHub.
It only reads from GitHub: nothing there is changed. A repository already brought is brought up to date (only what is new travels;
a file already whole is not fetched again). The only limit is the drive's free space, checked first. Work runs in the background:
pause, carry on, stop; the page asks for its state (hub_status). The key to GitHub is given by the page for each piece of work and
kept only in memory.

    python3 build/desktop/app_hub_683.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_hub_bring" in s:
    print("already patched", p)
    sys.exit(0)

FN = r'''# ---- 6.83 (Fabrica, phase 1): everything on GitHub, brought onto this computer (app_hub_683.py) ----
_HUB = {"lock": threading.RLock(), "scan": None, "job": None, "pause": False, "stop": False, "thread": None}


class _HubStopped(Exception):
    pass


def _hub_bases():
    api = (os.environ.get("INGENIUM_HUB_API") or "https://api.github.com").rstrip("/")
    git = (os.environ.get("INGENIUM_HUB_GIT") or "https://github.com").rstrip("/")
    return api, git


class _HubNoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def _hub_note(line=None, wait=None):
    with _HUB["lock"]:
        j = _HUB.get("job") or _HUB.get("scan")
        if j is not None:
            if line is not None:
                j["line"] = line
            j["wait"] = wait


def _hub_hold():
    """between two steps: stop when asked, and wait while paused"""
    while True:
        if _HUB["stop"]:
            raise _HubStopped()
        if not _HUB["pause"]:
            return
        time.sleep(0.25)


def _hub_call(url, token, accept="application/vnd.github+json", to_file=None, timeout=90):
    """One request to GitHub: (status, headers, body). A file's own (signed) address is followed without the key. When GitHub
    asks Ingenium to wait (its limit of requests an hour), it waits and says until when."""
    api, _ = _hub_bases()
    if not url.startswith("http"):
        url = api + url
    hdr = {"Accept": accept, "User-Agent": "Ingenium-Fabrica", "X-GitHub-Api-Version": "2022-11-28"}
    if token:
        hdr["Authorization"] = "Bearer " + token
    tries = 0
    while True:
        _hub_hold()
        tries += 1
        try:
            r = urllib.request.build_opener(_HubNoRedirect).open(urllib.request.Request(url, headers=hdr), timeout=timeout)
        except urllib.error.HTTPError as e:
            if e.code in (301, 302, 303, 307, 308) and e.headers.get("Location"):
                loc = urllib.parse.urljoin(url, e.headers.get("Location"))
                same = urllib.parse.urlsplit(loc).netloc == urllib.parse.urlsplit(api).netloc
                url = loc
                if not same:
                    hdr = {"Accept": "*/*", "User-Agent": "Ingenium-Fabrica"}
                continue
            if e.code in (403, 429) and (e.headers.get("X-RateLimit-Remaining") == "0" or e.headers.get("Retry-After")):
                try:
                    until = float(e.headers.get("X-RateLimit-Reset") or 0)
                except ValueError:
                    until = 0
                pause = max(5.0, min(3700.0, (until - time.time()) if until else float(e.headers.get("Retry-After") or 60)))
                _hub_note(wait="GitHub asks Ingenium to wait until %s; it carries on by itself." % time.strftime("%H:%M", time.localtime(time.time() + pause)))
                end = time.time() + pause
                while time.time() < end:
                    _hub_hold()
                    time.sleep(0.5)
                _hub_note(wait=None)
                continue
            if e.code >= 500 and tries < 6:
                time.sleep(min(30, 2 ** tries))
                continue
            raise
        except (urllib.error.URLError, OSError) as e:
            if tries < 6 and not isinstance(e, _HubStopped):
                time.sleep(min(30, 2 ** tries))
                continue
            raise
        with r:
            if to_file is None:
                return r.status, r.headers, r.read()
            h = hashlib.sha256()
            n = 0
            tmp = to_file + ".part"
            with open(tmp, "wb") as fh:
                while True:
                    _hub_hold()
                    b = r.read(1 << 20)
                    if not b:
                        break
                    fh.write(b)
                    h.update(b)
                    n += len(b)
            os.replace(tmp, to_file)
            return r.status, r.headers, {"bytes": n, "sha256": h.hexdigest()}


def _hub_json(url, token):
    return json.loads(_hub_call(url, token)[2].decode("utf-8") or "null")


def _hub_next(headers):
    for part in (headers.get("Link") or "").split(","):
        m = re.match(r'\s*<([^>]+)>;\s*rel="next"', part)
        if m:
            return m.group(1)
    return None


def _hub_all(url, token, key=None):
    """every page of a list (100 at a time)"""
    out = []
    url = url + ("&" if "?" in url else "?") + "per_page=100"
    while url:
        st, h, body = _hub_call(url, token)
        d = json.loads(body.decode("utf-8") or "null")
        if key:
            d = (d or {}).get(key) or []
        out.extend(d or [])
        url = _hub_next(h)
    return out


def _hub_count(url, token):
    """how many a list holds, from one item and the number of its last page"""
    try:
        st, h, body = _hub_call(url + ("&" if "?" in url else "?") + "per_page=1", token)
    except urllib.error.HTTPError as e:
        if e.code in (404, 409, 410):
            return 0
        raise
    m = re.search(r'[?&]page=(\d+)>;\s*rel="last"', h.get("Link") or "")
    if m:
        return int(m.group(1))
    d = json.loads(body.decode("utf-8") or "null")
    if isinstance(d, dict) and "total_count" in d:
        return int(d["total_count"])
    return len(d or [])


# ---------- where it goes: a folder named "Ingenium GitHub", on this computer or on another drive ----------
def _hub_place_file():
    d = storage_dir()
    return os.path.join(d, "hub_place.json") if d else None


def _hub_place():
    try:
        f = _hub_place_file()
        if f and os.path.isfile(f):
            with open(f, encoding="utf-8") as fh:
                p = json.load(fh).get("folder")
            if p:
                return p
    except Exception:
        log_problem("hub: the place could not be read", sys.exc_info())
    return os.path.join(os.path.expanduser("~"), "Ingenium GitHub")


def _hub_free(path):
    q = path
    while q and not os.path.exists(q):
        nq = os.path.dirname(q)
        if nq == q:
            break
        q = nq
    try:
        return shutil.disk_usage(q or os.path.expanduser("~")).free
    except Exception:
        return None


def _hub_places():
    out = []
    home = os.path.expanduser("~")
    out.append({"label": "This computer", "folder": os.path.join(home, "Ingenium GitHub"), "free": _hub_free(home), "kind": "computer"})
    roots = []
    if sys.platform == "darwin" and os.path.isdir("/Volumes"):
        for n in sorted(os.listdir("/Volumes")):
            v = os.path.join("/Volumes", n)
            try:
                if os.path.ismount(v) and os.path.realpath(v) != "/":
                    roots.append((n, v))
            except Exception:
                pass
    elif sys.platform.startswith("win"):
        sysd = (os.environ.get("SystemDrive") or "C:").upper()
        for c in "DEFGHIJKLMNOPQRSTUVWXYZ":
            v = c + ":\\"
            if os.path.exists(v) and (c + ":") != sysd:
                roots.append((c + ":", v))
    for n, v in roots:
        out.append({"label": n, "folder": os.path.join(v, "Ingenium GitHub"), "free": _hub_free(v), "kind": "drive"})
    cur = _hub_place()
    return {"ok": True, "place": cur, "free": _hub_free(cur), "places": out}


def _hub_set_place(folder):
    try:
        folder = os.path.abspath(os.path.expanduser(str(folder)))
        if os.path.basename(folder.rstrip("\\/")) != "Ingenium GitHub":
            folder = os.path.join(folder, "Ingenium GitHub")
        os.makedirs(folder, exist_ok=True)
        probe = os.path.join(folder, ".ingenium-write-check")
        with open(probe, "w") as fh:
            fh.write("ok")
        os.remove(probe)
        f = _hub_place_file()
        if f:
            with open(f, "w", encoding="utf-8") as fh:
                json.dump({"folder": folder}, fh)
        return dict(_hub_places(), ok=True)
    except Exception:
        log_problem("hub: the place could not be set", sys.exc_info())
        return {"ok": False, "error": "Ingenium cannot write in that folder. Choose another, or check the drive is connected."}


def _hub_choose_place(win):
    try:
        import webview
        if win is None and getattr(webview, "windows", None):
            win = webview.windows[0]
        if win is None:
            return {"ok": False, "error": "The folder dialog could not be opened."}
        kinds = getattr(webview, "FileDialog", None)
        got = win.create_file_dialog(kinds.FOLDER if kinds is not None else webview.FOLDER_DIALOG) or ()
        if isinstance(got, str):
            got = (got,)
        if not got:
            return {"ok": False, "cancelled": True}
        return _hub_set_place(str(got[0]))
    except Exception:
        log_problem("hub: the folder dialog failed", sys.exc_info())
        return {"ok": False, "error": "The folder dialog could not be opened."}


# ---------- what she has on GitHub: each repository, with what it holds and its own logo ----------
_HUB_ICON = re.compile(r'(^|/)((app[-_ ]?)?icon[^/]*|logo[^/]*|favicon[^/]*|apple-touch-icon[^/]*|[^/]*[-_ ](icon|logo)[^/]*)\.(png|jpe?g|webp)$', re.I)


def _hub_icon(full, branch, name, token):
    """the repository's own logo: a picture its files name as an icon or logo (or one named as the repository), as a picture address"""
    try:
        tree = _hub_json("/repos/%s/git/trees/%s?recursive=1" % (full, urllib.parse.quote(branch, safe="")), token)
    except Exception:
        return None
    best, score = None, -1
    stem = re.sub(r'[^a-z0-9]', '', name.lower())
    for t in (tree or {}).get("tree") or []:
        if t.get("type") != "blob":
            continue
        pth, size = t.get("path") or "", int(t.get("size") or 0)
        if size < 600 or size > 800000 or "node_modules/" in pth:
            continue
        base = pth.rsplit("/", 1)[-1].lower()
        ok = _HUB_ICON.search(pth) or re.sub(r'\.(png|jpe?g|webp)$', '', re.sub(r'[^a-z0-9.]', '', base)) == stem
        if not ok or not re.search(r'\.(png|jpe?g|webp)$', base):
            continue
        sc = min(size, 400000) // 1000 + (40 if "icon" in base else 0) + (30 if "logo" in base else 0) - pth.count("/") * 5
        if sc > score:
            best, score = t, sc
    if not best:
        return None
    try:
        b = _hub_json("/repos/%s/git/blobs/%s" % (full, best["sha"]), token)
        raw = base64.b64decode(b.get("content") or "")
        mime = "image/png" if raw[:8] == b"\x89PNG\r\n\x1a\n" else ("image/jpeg" if raw[:2] == b"\xff\xd8" else ("image/webp" if raw[8:12] == b"WEBP" else None))
        if not mime:
            return None
        return "data:%s;base64,%s" % (mime, base64.b64encode(raw).decode("ascii"))
    except Exception:
        return None


def _hub_scan_run(token):
    try:
        me = _hub_json("/user", token) or {}
        repos = _hub_all("/user/repos?affiliation=owner,collaborator,organization_member&sort=full_name", token)
        with _HUB["lock"]:
            _HUB["scan"].update(login=me.get("login") or "", total=len(repos))
        out = []
        for i, r in enumerate(repos):
            full = r.get("full_name") or ""
            _hub_note(line="Reading %s (%d of %d)" % (full, i + 1, len(repos)))
            br = r.get("default_branch") or "main"
            empty = int(r.get("size") or 0) == 0
            rels = [] if empty else _hub_all("/repos/%s/releases" % full, token)
            item = {"full": full, "name": r.get("name") or full, "private": bool(r.get("private")), "branch": br,
                    "description": r.get("description") or "", "kb": int(r.get("size") or 0), "wiki": bool(r.get("has_wiki")),
                    "fork": bool(r.get("fork")), "archived": bool(r.get("archived")), "pushed": r.get("pushed_at") or "",
                    "versions": 0 if empty else _hub_count("/repos/%s/commits?sha=%s" % (full, urllib.parse.quote(br, safe="")), token),
                    "branches": 0 if empty else _hub_count("/repos/%s/branches" % full, token),
                    "tags": 0 if empty else _hub_count("/repos/%s/tags" % full, token),
                    "issues_all": _hub_count("/repos/%s/issues?state=all" % full, token),
                    "pulls": _hub_count("/repos/%s/pulls?state=all" % full, token),
                    "releases": len(rels), "release_bytes": sum(int(a.get("size") or 0) for x in rels for a in (x.get("assets") or [])),
                    "icon": None if empty else _hub_icon(full, br, r.get("name") or "", token)}
            item["issues"] = max(0, item["issues_all"] - item["pulls"])
            out.append(item)
            with _HUB["lock"]:
                _HUB["scan"]["repos"] = list(out)
                _HUB["scan"]["done"] = i + 1
        with _HUB["lock"]:
            _HUB["scan"].update(state="done", line="", repos=out)
    except _HubStopped:
        with _HUB["lock"]:
            _HUB["scan"].update(state="stopped", line="")
    except urllib.error.HTTPError as e:
        with _HUB["lock"]:
            _HUB["scan"].update(state="failed", error=("GitHub did not accept the key (sign in again)." if e.code == 401 else "GitHub answered %d." % e.code))
    except Exception as e:
        log_problem("hub: the scan failed", sys.exc_info())
        with _HUB["lock"]:
            _HUB["scan"].update(state="failed", error="GitHub could not be read: %s" % e)


def _hub_scan(token):
    with _HUB["lock"]:
        if (_HUB.get("scan") or {}).get("state") == "scanning" or (_HUB.get("job") or {}).get("state") in ("running", "paused"):
            return {"ok": False, "error": "Ingenium is already reading GitHub."}
        _HUB["stop"] = _HUB["pause"] = False
        _HUB["scan"] = {"state": "scanning", "done": 0, "total": 0, "repos": [], "line": "Asking GitHub for your repositories", "wait": None, "at": time.time()}
    threading.Thread(target=_hub_scan_run, args=(str(token or ""),), daemon=True).start()
    return {"ok": True}


# ---------- bringing: the code by git's own protocol, the rest through GitHub's API ----------
def _hub_git_fetch(url, target, token, progress):
    """every branch, tag and pull request's versions, into a bare repository (made, or brought up to date)"""
    try:
        from dulwich.repo import Repo
        from dulwich.client import get_transport_and_path
    except ImportError:
        raise RuntimeError("This copy of Ingenium was built without its git part, so versions cannot come in. Install the newest Ingenium.")
    if os.path.isdir(os.path.join(target, "objects")):
        repo = Repo(target)
    else:
        os.makedirs(target, exist_ok=True)
        repo = Repo.init_bare(target)
    try:
        client, path = get_transport_and_path(url, username="x-access-token", password=token) if token else get_transport_and_path(url)
        keep = {}

        def wants(refs, depth=None):
            keep.clear()
            for k, v in refs.items():
                if k.endswith(b"^{}"):
                    continue
                if k.startswith((b"refs/heads/", b"refs/tags/", b"refs/pull/")):
                    keep[k] = v
            return [v for v in set(keep.values()) if v not in repo.object_store]

        res = client.fetch(path, repo, determine_wants=wants, progress=progress)
        for k, v in keep.items():
            repo.refs[k] = v
        head = (getattr(res, "symrefs", None) or {}).get(b"HEAD")
        if head and head in keep:
            repo.refs.set_symbolic_ref(b"HEAD", head)
        return {k.decode("utf-8", "replace"): v.decode("ascii") for k, v in keep.items()}
    finally:
        repo.close()


def _hub_remote_refs(url, token):
    from dulwich.client import get_transport_and_path
    client, path = get_transport_and_path(url, username="x-access-token", password=token) if token else get_transport_and_path(url)
    got = client.get_refs(path)
    got = getattr(got, "refs", got)
    return {k.decode("utf-8", "replace"): v.decode("ascii") for k, v in got.items()
            if not k.endswith(b"^{}") and k.startswith((b"refs/heads/", b"refs/tags/", b"refs/pull/"))}


def _hub_save(folder, name, data):
    os.makedirs(folder, exist_ok=True)
    tmp = os.path.join(folder, name + ".part")
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False)
    os.replace(tmp, os.path.join(folder, name))


def _hub_repo_set(i, **kw):
    with _HUB["lock"]:
        _HUB["job"]["repos"][i].update(kw)


def _hub_bring_one(i, r, token, what, place):
    api, git = _hub_bases()
    full = r["full"]
    owner, name = full.split("/", 1)
    gdir = os.path.join(place, owner, name + ".git")
    hdir = os.path.join(place, owner, name + ".hub")
    os.makedirs(hdir, exist_ok=True)
    counts, check = {}, {}
    # 1. every version, branch, tag and pull request's versions
    _hub_repo_set(i, stage="code", pct=2, line="Asking GitHub for every version, branch and tag")
    seen = {"n": 0}

    def progress(msg):
        try:
            t = msg.decode("utf-8", "replace").strip().splitlines()[-1] if msg else ""
        except Exception:
            t = ""
        m = re.search(r'(\d+)%', t)
        seen["n"] += 1
        pct = 2 + (int(m.group(1)) * 50 // 100 if m else min(48, seen["n"]))
        if t:
            _hub_repo_set(i, pct=max(2, min(52, pct)), line=t[:160])

    refs = {}
    if r.get("kb", 1) or r.get("versions"):
        refs = _hub_git_fetch("%s/%s.git" % (git, full), gdir, token, progress)
    counts["refs"] = len(refs)
    counts["branches"] = sum(1 for k in refs if k.startswith("refs/heads/"))
    counts["tags"] = sum(1 for k in refs if k.startswith("refs/tags/"))
    counts["pull_refs"] = sum(1 for k in refs if k.startswith("refs/pull/"))
    _hub_save(hdir, "repo.json", _hub_json("/repos/%s" % full, token))
    _hub_hold()
    # 2. the wiki, when it has pages
    if what.get("wiki") and r.get("wiki"):
        _hub_repo_set(i, stage="wiki", pct=54, line="The wiki and its history")
        try:
            w = _hub_git_fetch("%s/%s.wiki.git" % (git, full), os.path.join(place, owner, name + ".wiki.git"), token, lambda m: None)
            counts["wiki_refs"] = len(w)
        except Exception:
            counts["wiki_refs"] = 0  # a repository whose wiki has no pages has no wiki repository
            shutil.rmtree(os.path.join(place, owner, name + ".wiki.git"), ignore_errors=True)
    _hub_hold()
    # 3. issues and pull requests, with every comment, review, label and milestone
    if what.get("issues"):
        _hub_repo_set(i, stage="issues", pct=58, line="Issues and pull requests")
        iss = _hub_all("/repos/%s/issues?state=all&sort=created&direction=asc" % full, token)
        _hub_save(hdir, "issues.json", iss)
        _hub_repo_set(i, pct=62, line="Their comments")
        _hub_save(hdir, "comments.json", _hub_all("/repos/%s/issues/comments?sort=created&direction=asc" % full, token))
        pulls = _hub_all("/repos/%s/pulls?state=all&sort=created&direction=asc" % full, token)
        _hub_save(hdir, "pulls.json", pulls)
        _hub_save(hdir, "review_comments.json", _hub_all("/repos/%s/pulls/comments?sort=created&direction=asc" % full, token))
        reviews = {}
        for k, pr in enumerate(pulls):
            _hub_repo_set(i, pct=64 + 8 * k // max(1, len(pulls)), line="Reviews of pull request #%s" % pr.get("number"))
            reviews[str(pr.get("number"))] = _hub_all("/repos/%s/pulls/%s/reviews" % (full, pr.get("number")), token)
        _hub_save(hdir, "reviews.json", reviews)
        _hub_save(hdir, "labels.json", _hub_all("/repos/%s/labels" % full, token))
        _hub_save(hdir, "milestones.json", _hub_all("/repos/%s/milestones?state=all" % full, token))
        counts["issues"] = sum(1 for x in iss if not x.get("pull_request"))
        counts["pulls"] = len(pulls)
    _hub_hold()
    # 4. releases and their files, each checked
    if what.get("releases"):
        _hub_repo_set(i, stage="releases", pct=74, line="Releases")
        rels = _hub_all("/repos/%s/releases" % full, token)
        _hub_save(hdir, "releases.json", rels)
        files = [(x, a) for x in rels for a in (x.get("assets") or [])]
        good = 0
        for k, (x, a) in enumerate(files):
            tag = re.sub(r'[\\/:*?"<>|]', "_", x.get("tag_name") or str(x.get("id")))
            fdir = os.path.join(hdir, "releases", tag)
            os.makedirs(fdir, exist_ok=True)
            fp = os.path.join(fdir, re.sub(r'[\\/:*?"<>|]', "_", a.get("name") or str(a.get("id"))))
            want = (a.get("digest") or "").split(":", 1)[-1] if str(a.get("digest") or "").startswith("sha256:") else ""
            _hub_repo_set(i, pct=74 + 20 * k // max(1, len(files)), line="%s: %s (%.1f MB)" % (x.get("tag_name") or "", a.get("name"), int(a.get("size") or 0) / 1e6))
            okf = False
            if os.path.isfile(fp) and os.path.getsize(fp) == int(a.get("size") or -1):
                if want:
                    h = hashlib.sha256()
                    with open(fp, "rb") as fh:
                        for b in iter(lambda: fh.read(1 << 20), b""):
                            h.update(b)
                    okf = h.hexdigest() == want
                else:
                    okf = True
            if not okf:
                st, hd, got = _hub_call("/repos/%s/releases/assets/%s" % (full, a.get("id")), token, accept="application/octet-stream", to_file=fp)
                okf = got["bytes"] == int(a.get("size") or -1) and (not want or got["sha256"] == want)
            good += 1 if okf else 0
        counts["releases"], counts["release_files"], counts["release_files_ok"] = len(rels), len(files), good
    _hub_hold()
    # 5. workflows, and the run records GitHub still keeps
    if what.get("actions"):
        _hub_repo_set(i, stage="actions", pct=95, line="Workflows and their runs")
        try:
            _hub_save(hdir, "workflows.json", _hub_all("/repos/%s/actions/workflows" % full, token, key="workflows"))
            runs = _hub_all("/repos/%s/actions/runs" % full, token, key="workflow_runs")
            _hub_save(hdir, "runs.json", runs)
            counts["runs"] = len(runs)
        except urllib.error.HTTPError as e:
            if e.code not in (404, 403):
                raise
            counts["runs"] = 0
    # 6. checked against GitHub
    _hub_repo_set(i, stage="check", pct=98, line="Checking against GitHub")
    if refs:
        far = _hub_remote_refs("%s/%s.git" % (git, full), token)
        check["refs_match"] = all(refs.get(k) == v for k, v in far.items()) and len(far) == len(refs)
        check["refs"] = len(far)
    else:
        check["refs_match"], check["refs"] = True, 0
    if what.get("issues"):
        check["issues_match"] = (counts.get("issues", 0) + counts.get("pulls", 0)) >= int(r.get("issues_all") or 0)
    if what.get("releases"):
        check["release_files_match"] = counts.get("release_files_ok", 0) == counts.get("release_files", 0)
    check["at"] = time.strftime("%Y-%m-%dT%H:%M:%S")
    _hub_save(hdir, "check.json", {"counts": counts, "check": check})
    whole = all(v for k, v in check.items() if k.endswith("_match"))
    _hub_repo_set(i, stage="done" if whole else "differs", pct=100, line="", counts=counts, check=check)
    return counts, check, whole


def _hub_index(place, add=None):
    f = os.path.join(place, "index.json")
    try:
        with open(f, encoding="utf-8") as fh:
            idx = json.load(fh)
    except Exception:
        idx = {"repos": {}}
    if add:
        idx.setdefault("repos", {})[add["full"]] = add
        _hub_save(place, "index.json", idx)
    return idx


def _hub_bring_run(token, chosen, what, place):
    try:
        for i, r in enumerate(chosen):
            _hub_hold()
            try:
                counts, check, whole = _hub_bring_one(i, r, token, what, place)
                owner, name = r["full"].split("/", 1)
                _hub_index(place, {"full": r["full"], "name": r.get("name") or name, "private": r.get("private"), "branch": r.get("branch"),
                                   "icon": r.get("icon"), "description": r.get("description") or "",
                                   "git": os.path.join(owner, name + ".git"), "hub": os.path.join(owner, name + ".hub"),
                                   "at": time.strftime("%Y-%m-%dT%H:%M:%S"), "counts": counts, "check": check, "whole": whole})
            except _HubStopped:
                raise
            except urllib.error.HTTPError as e:
                _hub_repo_set(i, stage="failed", error="GitHub answered %d for %s." % (e.code, r["full"]))
            except Exception as e:
                log_problem("hub: %s was not brought" % r.get("full"), sys.exc_info())
                _hub_repo_set(i, stage="failed", error=str(e)[:200])
        with _HUB["lock"]:
            j = _HUB["job"]
            bad = [x for x in j["repos"] if x.get("stage") != "done"]
            j.update(state="done" if not bad else "done-with-problems", line="", finished=time.time())
    except _HubStopped:
        with _HUB["lock"]:
            _HUB["job"].update(state="stopped", line="Stopped. What came in is kept; bring them again to carry on from there.")


def _hub_bring(token, spec):
    spec = spec or {}
    what = dict({"issues": True, "releases": True, "wiki": True, "actions": True}, **(spec.get("what") or {}))
    chosen = [r for r in (spec.get("repos") or []) if isinstance(r, dict) and re.match(r'^[\w.-]+/[\w.-]+$', str(r.get("full") or ""))]
    if not chosen:
        return {"ok": False, "error": "No repository is chosen."}
    place = _hub_place()
    try:
        os.makedirs(place, exist_ok=True)
    except Exception:
        return {"ok": False, "error": "The folder %s cannot be made. Is its drive connected?" % place}
    need = sum(int(r.get("kb") or 0) * 1024 + (int(r.get("release_bytes") or 0) if what.get("releases") else 0) for r in chosen)
    free = _hub_free(place)
    if free is not None and need > free:
        return {"ok": False, "error": "This needs about %.1f GB and the drive has %.1f GB free. Choose another drive, or fewer repositories." % (need / 1e9, free / 1e9)}
    with _HUB["lock"]:
        if (_HUB.get("job") or {}).get("state") in ("running", "paused"):
            return {"ok": False, "error": "Ingenium is already bringing your repositories."}
        _HUB["stop"] = _HUB["pause"] = False
        _HUB["job"] = {"state": "running", "place": place, "what": what, "started": time.time(), "line": "", "wait": None,
                       "need": need, "repos": [{"full": r["full"], "stage": "waiting", "pct": 0, "line": ""} for r in chosen]}
    t = threading.Thread(target=_hub_bring_run, args=(str(token or ""), chosen, what, place), daemon=True)
    _HUB["thread"] = t
    t.start()
    return {"ok": True, "place": place, "need": need, "free": free}


def _hub_pause(on):
    with _HUB["lock"]:
        _HUB["pause"] = bool(on)
        j = _HUB.get("job")
        if j and j.get("state") in ("running", "paused"):
            j["state"] = "paused" if on else "running"
    return _hub_status()


def _hub_stop():
    _HUB["stop"] = True
    _HUB["pause"] = False
    return {"ok": True}


def _hub_status():
    with _HUB["lock"]:
        return json.loads(json.dumps({"ok": True, "scan": _HUB.get("scan"), "job": _HUB.get("job"), "place": _hub_place()}))


def _hub_brought():
    place = _hub_place()
    idx = _hub_index(place)
    out = []
    for full, x in sorted((idx.get("repos") or {}).items()):
        x = dict(x)
        x["present"] = os.path.isdir(os.path.join(place, x.get("git") or ""))
        out.append(x)
    return {"ok": True, "place": place, "connected": os.path.isdir(place), "repos": out}


# ---------- the build's self-test: the git part is inside this app, and fetches ----------
def _selftest_hub():
    import tempfile
    try:
        import dulwich
        from dulwich.repo import Repo
        from dulwich.objects import Blob, Tree, Commit
    except Exception as e:
        return {"ok": False, "error": "the git part (dulwich) is not inside this app: %s" % e}
    d = tempfile.mkdtemp(prefix="ingenium-hub-")
    try:
        src = Repo.init_bare(os.path.join(d, "src.git"), mkdir=True)
        b = Blob.from_string(b"Ingenium\n")
        src.object_store.add_object(b)
        t = Tree()
        t.add(b"README.md", 0o100644, b.id)
        src.object_store.add_object(t)
        c = Commit()
        c.tree, c.parents, c.message = t.id, [], b"Self-test"
        c.author = c.committer = b"Ingenium <selftest@ingenium.invalid>"
        c.author_time = c.commit_time = 1762800000
        c.author_timezone = c.commit_timezone = 0
        src.object_store.add_object(c)
        src.refs[b"refs/heads/main"] = c.id
        src.refs[b"refs/tags/v1"] = c.id
        src.refs.set_symbolic_ref(b"HEAD", b"refs/heads/main")
        src.close()
        refs = _hub_git_fetch(os.path.join(d, "src.git"), os.path.join(d, "dst.git"), "", lambda m: None)
        if refs.get("refs/heads/main") != c.id.decode() or "refs/tags/v1" not in refs:
            return {"ok": False, "error": "the fetch did not give the versions back"}
        return {"ok": True, "dulwich": ".".join(str(x) for x in dulwich.__version__), "refs": len(refs)}
    except Exception as e:
        return {"ok": False, "error": "%s: %s" % (type(e).__name__, e)}
    finally:
        shutil.rmtree(d, ignore_errors=True)


# ---------- reading a brought repository, so Fabrica can open it (IngRepo.fromGitDir) ----------
def _hub_dir(full, kind):
    if not re.match(r'^[\w.-]+/[\w.-]+$', str(full or "")) or kind not in (".git", ".hub"):
        return None
    owner, name = str(full).split("/", 1)
    d = os.path.realpath(os.path.join(_hub_place(), owner, name + kind))
    return d if os.path.isdir(d) else None


def _hub_git_files(full):
    """the files of its git folder that Fabrica reads: packs, loose objects, branch and tag names, HEAD"""
    d = _hub_dir(full, ".git")
    if not d:
        return {"ok": False, "error": "That repository is not on the drive now. Is the drive connected?"}
    out = []
    for root, dirs, files in os.walk(d):
        for f in files:
            rel = os.path.relpath(os.path.join(root, f), d).replace(os.sep, "/")
            if re.match(r'^(HEAD|packed-refs|objects/pack/pack-[0-9a-f]{40}\.pack|objects/[0-9a-f]{2}/[0-9a-f]{38}|refs/(heads|tags)/.+)$', rel):
                out.append({"name": rel, "size": os.path.getsize(os.path.join(root, f))})
    return {"ok": True, "files": out, "bytes": sum(x["size"] for x in out)}


def _hub_git_read(full, rel, offset=0, length=8 << 20):
    """a piece of one of those files (base64), at most 8 MB at a time"""
    d = _hub_dir(full, ".git")
    if not d:
        return {"ok": False, "error": "That repository is not on the drive now."}
    f = os.path.realpath(os.path.join(d, str(rel)))
    if os.path.commonpath([f, d]) != d or not os.path.isfile(f):
        return {"ok": False, "error": "No such file in that repository."}
    with open(f, "rb") as fh:
        fh.seek(max(0, int(offset)))
        b = fh.read(max(1, min(int(length), 8 << 20)))
    return {"ok": True, "b64": base64.b64encode(b).decode("ascii"), "n": len(b), "size": os.path.getsize(f)}


def _hub_hub_json(full, name):
    """one of the records brought beside it: issues, pulls, comments, reviews, labels, milestones, releases, repo, check"""
    d = _hub_dir(full, ".hub")
    if not d or name not in ("issues", "pulls", "comments", "reviews", "review_comments", "labels", "milestones", "releases", "repo", "check", "workflows", "runs"):
        return {"ok": False, "error": "Not brought."}
    f = os.path.join(d, name + ".json")
    if not os.path.isfile(f):
        return {"ok": True, "data": None}
    with open(f, encoding="utf-8") as fh:
        return {"ok": True, "data": json.load(fh)}


'''

rep('''def _start_local_server(directory, html_name=None):''', FN + '''def _start_local_server(directory, html_name=None):''')

rep('''    def model_places(self):
        return _model_places()
''', '''    def model_places(self):
        return _model_places()

    # 6.83: Fabrica brings everything from GitHub onto this computer (app_hub_683.py)
    def hub_places(self):
        return _hub_places()

    def hub_choose_place(self):
        return _hub_choose_place(getattr(self, "_main_window", None))

    def hub_set_place(self, folder):
        return _hub_set_place(folder)

    def hub_scan(self, token):
        return _hub_scan(token)

    def hub_bring(self, token, spec):
        return _hub_bring(token, spec)

    def hub_pause(self, on):
        return _hub_pause(on)

    def hub_stop(self):
        return _hub_stop()

    def hub_status(self):
        return _hub_status()

    def hub_brought(self):
        return _hub_brought()

    def hub_git_files(self, full):
        return _hub_git_files(full)

    def hub_git_read(self, full, rel, offset=0, length=8388608):
        return _hub_git_read(full, rel, offset, length)

    def hub_hub_json(self, full, name):
        return _hub_hub_json(full, name)
''', 2)
rep('''        # R74: lending the models to the person's other devices
        if res["ok"] and model == "builtin" and "--selftest-share" in argv:''', '''        # 6.83: Fabrica's git part (dulwich), carried in the app, fetches (app_hub_683.py)
        if res["ok"] and "--selftest-hub" in argv:
            res["hub"] = _selftest_hub()
            if not res["hub"].get("ok"):
                res["ok"] = False
                res["error"] = "Fabrica's git part: %s" % res["hub"].get("error")
        # R74: lending the models to the person's other devices
        if res["ok"] and model == "builtin" and "--selftest-share" in argv:''')
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
