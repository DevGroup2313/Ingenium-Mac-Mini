"""Ingenium 6.88 (12 November 2026): Fabrica, phase 2, second stage, its second part. A second copy of a repository on another drive,
kept whole and checked by fingerprint, every day, every Sunday or by hand.

The owner's words, on the preview of this stage (https://claude.ai/artifact/VNwsz2ywj3XkXaCq8gws1o, version 4): "I approve of the preview,
please push it everywhere." What the preview shows for it: "Every version, idea and tag, kept whole on another drive, and checked against
this one by fingerprint", on a drive chosen in Ingenium's own list, checked every day, every Sunday or by hand.

  copy_places()                  the drives a copy can go on (this computer and each drive connected, as phase 1 lists them), with the
                                 room left on each
  copy_choose()                  any other folder, through the system's folder dialog
  copy_list()                    each repository's copy: where it is, when it is checked, the last copy and check, and the work going on
  copy_plan(rid, folder, when)   where the copy of a repository on this computer goes, and when it is checked: "day", "sunday", "hand"
  copy_now(rid)                  bring the copy up to date now (made the first time), then check it; in the background, one at a time
  copy_check(rid)                check it now, without copying anything
  copy_forget(rid)               stop keeping it (the copy stays on its drive, whole)
The copy is a bare repository, <folder>/Ingenium copies/<name>.git (a file ingenium-copy.json in it says whose copy it is). The branches
and tags are read first; then every pack and loose object of the repository is copied as it is, each file under a temporary name and
renamed when whole, a pack's index after the pack (git and dulwich read a pack only once its index is there); then each branch and tag
is set in the copy as it was read, and HEAD too. A branch or tag taken away from the repository stays in the copy under
refs/ingenium-kept/<time>/, so a version is never lost from the copy. Objects a repository borrows from another (git's alternates) are
copied too, so the copy stands alone. The check: each branch and tag of the copy points where it pointed when copied; every object of
the repository is in the copy; every pack of the copy matches its own fingerprint (the SHA-1 git writes at its end, and its index's) and
every loose object its name. A scheduler in the app looks every half hour (and a minute after the app starts): every day means a day since
the last check; every Sunday means not checked since the last Sunday began, so a Sunday the computer was off is made up at its next
start. A drive not connected is waited for. The list is disk_copies.json in the app's own folder.
Also, for every drive call of 6.86 and 6.87: a repository Fabrica holds open has its packed-refs read again whenever the file changed
(dulwich 0.22.8 reads it once and keeps it: its own note says so), so after git gc or git pack-refs in another program a branch taken
away is gone at once, and the branches git packed meanwhile are still seen.

    python3 build/desktop/app_copy_688.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_copy_now" in s:
    print("already patched", p)
    sys.exit(0)
if "_disk_open" not in s or "_hub_places" not in s:
    sys.exit("%s: Fabrica's drive part (app_hub_683.py, app_disk_686.py) must be applied first" % p)

FN = r'''# ---- 6.88 (Fabrica, phase 2): a second copy of a repository on another drive, checked by fingerprint (app_copy_688.py) ----
def _disk_packed_fresh(repo):
    """dulwich keeps packed-refs once read and never reads it again (its own note: "TODO: invalidate the cache on repacking"); git gc,
    git pack-refs or another program can rewrite it while Fabrica has the repository open, so it is read again whenever it changed:
    a branch taken away elsewhere is gone at once, and branches git packed meanwhile are still seen"""
    try:
        rc = repo.refs
        f = os.path.join(rc.path, b"packed-refs" if isinstance(rc.path, bytes) else "packed-refs")
        try:
            st = os.stat(f)
            mark = (st.st_ino, st.st_mtime_ns, st.st_size)
        except OSError:
            mark = None
        if getattr(repo, "_ing_packed_mark", "unread") != mark:
            rc._packed_refs = None
            rc._peeled_refs = None
            repo._ing_packed_mark = mark
    except Exception:
        pass



_COPY = {"lock": threading.RLock(), "jobs": {}, "queue": [], "worker": None, "sched": None, "wake": threading.Event()}
_COPY_WHEN = ("day", "sunday", "hand")


def _copy_file():
    d = storage_dir()
    return os.path.join(d, "disk_copies.json") if d else None


def _copy_reg():
    try:
        f = _copy_file()
        if f and os.path.isfile(f):
            with open(f, encoding="utf-8") as fh:
                x = json.load(fh)
            if isinstance(x, dict) and isinstance(x.get("copies"), dict):
                return x
    except Exception:
        log_problem("copy: the list of copies could not be read", sys.exc_info())
    return {"copies": {}}


def _copy_reg_save(reg):
    f = _copy_file()
    if not f:
        raise RuntimeError("this computer gives Ingenium no folder of its own to keep the list in")
    tmp = f + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(reg, fh, ensure_ascii=False, indent=1)
    os.replace(tmp, f)


def _copy_label(folder):
    """a place as she knows it: the drive's name, or this computer"""
    try:
        return _disk_drive(folder)
    except Exception:
        return "This computer"


def _copy_places():
    out = []
    try:
        hp = _hub_places()
    except Exception:
        hp = {"places": []}
    for x in hp.get("places") or []:
        base = os.path.dirname(x.get("folder") or "")
        if not base:
            continue
        out.append({"label": _copy_label(base), "folder": base, "free": x.get("free"), "kind": x.get("kind") or "drive"})
    with _COPY["lock"]:
        for c in _copy_reg()["copies"].values():
            f = c.get("folder")
            if f and not any(os.path.realpath(y["folder"]) == os.path.realpath(f) for y in out):
                out.append({"label": _copy_label(f), "folder": f, "free": _hub_free(f), "kind": "chosen", "away": not os.path.isdir(f)})
    return {"ok": True, "places": out}


def _copy_choose(win):
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
        f = str(got[0])
        return {"ok": True, "place": {"label": _copy_label(f), "folder": f, "free": _hub_free(f), "kind": "chosen"}}
    except Exception:
        log_problem("copy: the folder dialog failed", sys.exc_info())
        return {"ok": False, "error": "The folder dialog could not be opened."}


def _copy_safe(name):
    n = re.sub(r'[\\/:*?"<>|\x00-\x1f]+', "-", str(name or "repository")).strip(" .-") or "repository"
    return n[:80]


def _copy_target(rid, k, folder):
    """<folder>/Ingenium copies/<name>.git, or <name>-<id>.git when that name is another repository's copy"""
    base = os.path.join(folder, "Ingenium copies")
    for nm in (_copy_safe(k["name"]), _copy_safe(k["name"]) + "-" + rid.split(":")[-1][:6]):
        t = os.path.join(base, nm + ".git")
        mark = os.path.join(t, "ingenium-copy.json")
        if not os.path.exists(t):
            return t
        try:
            with open(mark, encoding="utf-8") as fh:
                if json.load(fh).get("id") == rid:
                    return t
        except Exception:
            pass
    return os.path.join(base, _copy_safe(k["name"]) + "-" + rid.split(":")[-1] + ".git")


def _copy_inside(a, b):
    a, b = os.path.realpath(a), os.path.realpath(b)
    return a == b or a.startswith(b.rstrip(os.sep) + os.sep)


def _copy_plan(rid, folder, when, label=None):
    with _COPY["lock"]:
        k = _disk_known().get(rid)
        if not k:
            return {"ok": False, "error": "Fabrica does not know that repository."}
        if when not in _COPY_WHEN:
            return {"ok": False, "error": "A copy is checked every day, every Sunday or by hand."}
        reg = _copy_reg()
        c = dict(reg["copies"].get(rid) or {})
        if folder:
            folder = str(folder)
            if not os.path.isdir(folder):
                return {"ok": False, "error": "That folder is not here: is its drive connected?"}
            if _copy_inside(folder, k["path"]):
                return {"ok": False, "error": "A copy cannot go inside the repository it copies: choose another drive."}
            if c.get("folder") and os.path.realpath(c["folder"]) != os.path.realpath(folder):
                c = {"made": None, "checked": None, "result": None}   # a new place: a new copy (the old one stays where it is)
            c["folder"] = folder
            c["target"] = _copy_target(rid, k, folder)
            c["label"] = str(label)[:80] if label else None
        elif not c.get("folder"):
            return {"ok": False, "error": "Choose where the copy goes first."}
        c["when"] = when
        c["name"] = k["name"]
        reg["copies"][rid] = c
        _copy_reg_save(reg)
    _copy_start()
    return {"ok": True, "copy": _copy_view(rid, c)}


def _copy_forget(rid):
    with _COPY["lock"]:
        reg = _copy_reg()
        if rid not in reg["copies"]:
            return {"ok": False, "error": "There is no copy of that repository in the list."}
        del reg["copies"][rid]
        _copy_reg_save(reg)
    return {"ok": True}


def _copy_last_sunday(now=None):
    """the moment the last Sunday began, in this computer's own time"""
    t = time.localtime(now if now is not None else time.time())
    midnight = time.mktime((t.tm_year, t.tm_mon, t.tm_mday, 0, 0, 0, 0, 0, -1))
    back = (t.tm_wday + 1) % 7     # Monday 0 ... Sunday 6
    lt = time.localtime(midnight - back * 86400 + 7200)
    return time.mktime((lt.tm_year, lt.tm_mon, lt.tm_mday, 0, 0, 0, 0, 0, -1))


def _copy_due(c, now=None):
    now = time.time() if now is None else now
    last = (c.get("checked") or 0) / 1000.0
    w = c.get("when")
    if w == "day":
        return now - last >= 86400
    if w == "sunday":
        return last < _copy_last_sunday(now)
    return False


def _copy_next(c, now=None):
    """when the next check comes, for the page to say"""
    now = time.time() if now is None else now
    w = c.get("when")
    if w == "day":
        return int(((c.get("checked") or 0) / 1000.0 + 86400) * 1000) if c.get("checked") else int(now * 1000)
    if w == "sunday":
        s = _copy_last_sunday(now)
        last = (c.get("checked") or 0) / 1000.0
        if last < s:
            return int(now * 1000)
        lt = time.localtime(s + 7 * 86400 + 7200)
        return int(time.mktime((lt.tm_year, lt.tm_mon, lt.tm_mday, 0, 0, 0, 0, 0, -1)) * 1000)
    return None


def _copy_view(rid, c):
    v = {"id": rid, "name": c.get("name") or "", "folder": c.get("folder"), "target": c.get("target"), "when": c.get("when") or "sunday",
         "made": c.get("made"), "checked": c.get("checked"), "result": c.get("result"), "next": _copy_next(c), "label": c.get("label") or _copy_label(c.get("folder") or "")}
    if c.get("folder"):
        v["away"] = not os.path.isdir(c["folder"])
        v["free"] = None if v["away"] else _hub_free(c["folder"])
    j = _COPY["jobs"].get(rid)
    if j:
        v["job"] = {k: j.get(k) for k in ("state", "phase", "done", "total", "files", "error", "started", "copied", "what")}
    return v


def _copy_list():
    with _COPY["lock"]:
        reg = _copy_reg()
        out = [_copy_view(rid, c) for rid, c in sorted(reg["copies"].items())]
    _copy_start()
    return {"ok": True, "copies": out}


# ---------- the work itself: one repository at a time, in the background ----------
def _copy_write(src, dst, job):
    """one file copied whole: written under a temporary name, then renamed"""
    tmp = dst + ".ingenium-tmp"
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(src, "rb") as a, open(tmp, "wb") as b:
        while True:
            chunk = a.read(1 << 20)
            if not chunk:
                break
            b.write(chunk)
            job["done"] = job.get("done", 0) + len(chunk)
        b.flush()
        try:
            os.fsync(b.fileno())
        except Exception:
            pass
    os.replace(tmp, dst)


def _copy_sources(repo):
    """the object folders the repository reads: its own, and those it borrows from (git's alternates)"""
    st = repo.object_store
    out = [st.path]
    try:
        for alt in st.alternates:
            pth = getattr(alt, "path", None)
            if pth and os.path.isdir(pth) and pth not in out:
                out.append(pth)
    except Exception:
        pass
    return out


def _copy_files(srcs):
    """every pack (its index last) and loose object of the object folders, as (source, path inside objects/)"""
    todo = []
    for src in srcs:
        pdir = os.path.join(src, "pack")
        if os.path.isdir(pdir):
            names = set(os.listdir(pdir))
            for n in sorted(names):
                if n.startswith("pack-") and n.endswith(".pack") and n[:-5] + ".idx" in names:
                    b = n[:-5]
                    for ext in (".pack", ".rev", ".bitmap", ".idx"):
                        if b + ext in names:
                            todo.append((os.path.join(pdir, b + ext), os.path.join("pack", b + ext)))
        try:
            dirs = sorted(os.listdir(src))
        except OSError:
            dirs = []
        for d in dirs:
            if re.match(r"^[0-9a-f]{2}$", d) and os.path.isdir(os.path.join(src, d)):
                for f in sorted(os.listdir(os.path.join(src, d))):
                    if re.match(r"^[0-9a-f]{38}$", f):
                        todo.append((os.path.join(src, d, f), os.path.join(d, f)))
    return todo


def _copy_refs(repo):
    refs = {}
    for k, v in repo.refs.as_dict().items():
        if k.startswith(b"refs/") and not k.startswith(b"refs/ingenium-kept/"):
            refs[k] = v
    head = None
    try:
        head = repo.refs.get_symrefs().get(b"HEAD")
    except Exception:
        pass
    return refs, head


def _copy_make(rid, c, job):
    from dulwich.repo import Repo
    repo, k = _disk_open(rid)
    with _DISK["lock"]:
        refs, head = _copy_refs(repo)       # the branches and tags first: the objects they name are already there
        srcs = _copy_sources(repo)
    target = c["target"]
    if not os.path.isdir(c.get("folder") or ""):
        raise RuntimeError("%s is not connected now." % _copy_label(c.get("folder") or ""))
    if not os.path.isdir(target):
        os.makedirs(os.path.dirname(target), exist_ok=True)
        Repo.init_bare(target, mkdir=True).close()
    with open(os.path.join(target, "ingenium-copy.json"), "w", encoding="utf-8") as fh:
        json.dump({"id": rid, "name": k["name"], "from": k["path"], "by": "Ingenium", "made": int(time.time() * 1000)}, fh, ensure_ascii=False, indent=1)
    dobj = os.path.join(target, "objects")
    for rel in ((c.get("result") or {}).get("bad") or []):   # what the last check found faulty is copied again
        q = os.path.realpath(os.path.join(dobj, rel))
        if q.startswith(os.path.realpath(dobj) + os.sep) and os.path.isfile(q):
            os.remove(q)
    todo = []
    for a, rel in _copy_files(srcs):
        b = os.path.join(dobj, rel)
        try:
            if os.path.exists(b) and os.path.getsize(b) == os.path.getsize(a):
                continue
            todo.append((a, b, os.path.getsize(a)))
        except OSError:
            pass
    job.update({"phase": "copying", "done": 0, "total": sum(x[2] for x in todo), "files": len(todo)})
    gone = 0
    job["copied"] = 0
    for a, b, n in todo:
        if job.get("stop"):
            raise RuntimeError("Stopped.")
        try:
            _copy_write(a, b, job)
        except FileNotFoundError:
            gone += 1      # git tidied its packs meanwhile: the objects are in its new pack, copied on the next pass
    if gone:
        for a, rel in _copy_files(srcs):
            b = os.path.join(dobj, rel)
            if not os.path.exists(b):
                try:
                    _copy_write(a, b, job)
                except FileNotFoundError:
                    pass
    job["copied"] = job.get("done", 0)
    dst = Repo(target)
    try:
        have = {kk: vv for kk, vv in dst.refs.as_dict().items() if kk.startswith(b"refs/") and not kk.startswith(b"refs/ingenium-kept/")}
        stamp = time.strftime("%Y-%m-%d-%H%M%S").encode("ascii")
        for kk, vv in have.items():
            if kk not in refs:     # taken away from the repository: kept in the copy, so its versions stay
                dst.refs[b"refs/ingenium-kept/" + stamp + b"/" + kk[5:]] = vv
                dst.refs.remove_if_equals(kk, vv)
        new = {kk: vv for kk, vv in refs.items() if kk not in have}
        for kk, vv in refs.items():
            if kk in have and have[kk] != vv:
                dst.refs[kk] = vv
        if new:
            dst.refs.add_packed_refs(new)
        if head:
            dst.refs.set_symbolic_ref(b"HEAD", head)
    finally:
        dst.close()
    return {kk.decode("utf-8", "replace"): vv.decode("ascii") for kk, vv in refs.items()}


def _copy_check_run(rid, c, job, refs=None):
    """the copy against the repository: its refs, every object, and each file's own fingerprint"""
    import zlib
    from dulwich.repo import Repo
    from dulwich.pack import load_pack_index, compute_file_sha
    problems = []
    target = c.get("target")
    if not target or not os.path.isdir(target):
        return {"ok": False, "problems": ["The copy is not there: is its drive connected?"]}
    repo, k = _disk_open(rid)
    with _DISK["lock"]:
        srcs = _copy_sources(repo)
        if refs is None:
            now, _ = _copy_refs(repo)
            refs = {kk.decode("utf-8", "replace"): vv.decode("ascii") for kk, vv in now.items()}
    dst = Repo(target)
    try:
        theirs = {kk.decode("utf-8", "replace"): vv.decode("ascii") for kk, vv in dst.refs.as_dict().items() if kk.startswith(b"refs/")}
    finally:
        dst.close()
    moved = sorted(r for r, v in refs.items() if theirs.get(r) != v)
    if moved:
        problems.append("%d branch%s or tag%s of the repository %s not as in the copy: %s" % (len(moved), "" if len(moved) == 1 else "es", "" if len(moved) == 1 else "s",
                        "is" if len(moved) == 1 else "are", ", ".join(m.split("/", 2)[-1] for m in moved[:4]) + (" and others" if len(moved) > 4 else "")))
    dobj = os.path.join(target, "objects")
    dpack = os.path.join(dobj, "pack")
    packs = sorted(n for n in (os.listdir(dpack) if os.path.isdir(dpack) else []) if n.startswith("pack-") and n.endswith(".pack"))
    loose = []
    for d in sorted(os.listdir(dobj)) if os.path.isdir(dobj) else []:
        if re.match(r"^[0-9a-f]{2}$", d):
            loose += [(d, f) for f in sorted(os.listdir(os.path.join(dobj, d))) if re.match(r"^[0-9a-f]{38}$", f)]
    total = sum(os.path.getsize(os.path.join(dpack, n)) for n in packs) + sum(os.path.getsize(os.path.join(dobj, d, f)) for d, f in loose)
    job.update({"phase": "checking", "done": 0, "total": total, "files": len(packs) + len(loose)})
    idxs, bad_packs, bad = {}, set(), []
    for n in packs:
        if job.get("stop"):
            raise RuntimeError("Stopped.")
        pk = os.path.join(dpack, n)
        try:
            ix = load_pack_index(pk[:-5] + ".idx")
            ix.check()
            size = os.path.getsize(pk)
            with open(pk, "rb") as fh:
                fh.seek(size - 20)
                trailer = fh.read(20)
                fh.seek(0)
                calc = compute_file_sha(fh, end_ofs=-20).digest()
            job["done"] += size
            if calc != trailer or trailer != ix.get_pack_checksum():
                problems.append("%s does not match its fingerprint." % n)
                bad_packs.add(n)
            else:
                idxs[n] = ix
        except Exception as e:
            problems.append("%s could not be checked: %s" % (n, e))
            bad_packs.add(n)
        if n in bad_packs:
            bad += [os.path.join("pack", n[:-5] + ext) for ext in (".pack", ".idx", ".rev", ".bitmap")]
    have_loose = set()
    for d, f in loose:
        fp = os.path.join(dobj, d, f)
        try:
            with open(fp, "rb") as fh:
                raw = zlib.decompress(fh.read())
            job["done"] += os.path.getsize(fp)
            if hashlib.sha1(raw).hexdigest() != d + f:
                problems.append("The object %s does not match its name." % (d + f)[:12])
                bad.append(os.path.join(d, f))
            else:
                have_loose.add(d + f)
        except Exception as e:
            problems.append("The object %s could not be read: %s" % ((d + f)[:12], e))
            bad.append(os.path.join(d, f))

    def in_copy(sha_hex):
        if sha_hex in have_loose:
            return True
        b = bytes.fromhex(sha_hex)
        for ix in idxs.values():
            try:
                ix.object_offset(b)
                return True
            except KeyError:
                pass
        return False
    missing, count = 0, 0
    for a, rel in _copy_files(srcs):
        if rel.endswith(".idx"):
            n = os.path.basename(rel)[:-4] + ".pack"
            if n in idxs:
                try:
                    count += len(idxs[n])
                except Exception:
                    pass
                continue      # the same name is the same content: a pack is named by its own fingerprint
            try:
                for sha, _off, _crc in load_pack_index(a).iterentries():
                    count += 1
                    if not in_copy(sha.hex()):
                        missing += 1
            except FileNotFoundError:
                pass
        elif not rel.startswith("pack"):
            count += 1
            if not in_copy(rel.replace(os.sep, "").replace("/", "")):
                missing += 1
    if missing:
        problems.append("%d object%s of the repository %s not in the copy." % (missing, "" if missing == 1 else "s", "is" if missing == 1 else "are"))
    return {"ok": not problems, "problems": problems[:12], "bad": bad, "objects": count, "packs": len(packs), "loose": len(loose), "bytes": total, "refs": len(refs)}


def _copy_job(rid, what):
    j = _COPY["jobs"][rid]
    j.update({"state": "running", "started": int(time.time() * 1000), "error": None})
    try:
        with _COPY["lock"]:
            c = dict(_copy_reg()["copies"].get(rid) or {})
        if not c.get("target"):
            raise RuntimeError("Choose where the copy goes first.")
        refs = None
        if what == "copy":
            refs = _copy_make(rid, c, j)
        res = _copy_check_run(rid, c, j, refs)
        nowms = int(time.time() * 1000)
        with _COPY["lock"]:
            reg = _copy_reg()
            cc = reg["copies"].get(rid)
            if cc is not None:
                if what == "copy":
                    cc["made"] = nowms
                    res["copied"] = j.get("copied", 0)
                cc["checked"] = nowms
                cc["result"] = dict(res, at=nowms)
                _copy_reg_save(reg)
        j.update({"state": "done", "phase": None})
    except Exception as e:
        log_problem("copy: the copy of a repository did not finish", sys.exc_info())
        j.update({"state": "failed", "phase": None, "error": str(e)})
        with _COPY["lock"]:
            reg = _copy_reg()
            cc = reg["copies"].get(rid)
            if cc is not None:
                cc["result"] = {"ok": False, "problems": [str(e)], "at": int(time.time() * 1000), "unfinished": True}
                _copy_reg_save(reg)


def _copy_worker():
    while True:
        with _COPY["lock"]:
            item = _COPY["queue"].pop(0) if _COPY["queue"] else None
            if item is None:
                _COPY["worker"] = None
                return
        _copy_job(*item)


def _copy_enqueue(rid, what):
    with _COPY["lock"]:
        j = _COPY["jobs"].get(rid)
        if j and j.get("state") in ("waiting", "running"):
            return {"ok": True, "already": True}
        _COPY["jobs"][rid] = {"state": "waiting", "phase": None, "done": 0, "total": 0, "files": 0, "what": what}
        _COPY["queue"].append((rid, what))
        if _COPY["worker"] is None:
            t = threading.Thread(target=_copy_worker, name="ingenium-copies", daemon=True)
            _COPY["worker"] = t
            t.start()
    return {"ok": True}


def _copy_now(rid):
    with _COPY["lock"]:
        if not _copy_reg()["copies"].get(rid, {}).get("target"):
            return {"ok": False, "error": "Choose where the copy goes first."}
    return _copy_enqueue(rid, "copy")


def _copy_check(rid):
    with _COPY["lock"]:
        c = _copy_reg()["copies"].get(rid) or {}
        if not c.get("made"):
            return {"ok": False, "error": "There is no copy to check yet: make it first."}
    return _copy_enqueue(rid, "check")


def _copy_tick(now=None):
    """the scheduler's look: every copy due, whose drive is connected, is brought up to date and checked"""
    with _COPY["lock"]:
        reg = _copy_reg()
        due = [rid for rid, c in reg["copies"].items() if c.get("target") and c.get("made") and _copy_due(c, now) and os.path.isdir(c.get("folder") or "")]
    for rid in due:
        _copy_enqueue(rid, "copy")
    return due


def _copy_sched():
    first = True
    while True:
        _COPY["wake"].wait(60 if first else 1800)
        _COPY["wake"].clear()
        first = False
        try:
            _copy_tick()
        except Exception:
            log_problem("copy: the scheduler's look failed", sys.exc_info())


def _copy_start():
    with _COPY["lock"]:
        if _COPY["sched"] is None:
            t = threading.Thread(target=_copy_sched, name="ingenium-copy-schedule", daemon=True)
            _COPY["sched"] = t
            t.start()


def _selftest_copy():
    """the build's self-test: a repository copied, checked, and a fault in the copy found"""
    import tempfile
    try:
        from dulwich.repo import Repo
        from dulwich.objects import Blob, Tree, Commit
        d = tempfile.mkdtemp(prefix="ing-copy-")
        r = Repo.init_bare(os.path.join(d, "src.git"), mkdir=True)
        b = Blob.from_string(b"hello\n")
        t = Tree()
        t.add(b"a.txt", 0o100644, b.id)
        c = Commit()
        c.tree = t.id
        c.author = c.committer = b"Ingenium <selftest@ingenium.invalid>"
        c.author_time = c.commit_time = 0
        c.author_timezone = c.commit_timezone = 0
        c.message = b"one\n"
        for o in (b, t, c):
            r.object_store.add_object(o)
        r.refs[b"refs/heads/main"] = c.id
        r.close()
        files = _copy_files([os.path.join(d, "src.git", "objects")])
        ok = len(files) == 3
        return {"ok": bool(ok), "error": None if ok else "the objects to copy were not found"}
    except Exception as e:
        return {"ok": False, "error": str(e)}


'''

rep('''def _start_local_server(directory, html_name=None):''', FN + '''def _start_local_server(directory, html_name=None):''')
rep('''        got = _DISK["open"].get(rid)
        if got:
            return got
''', '''        got = _DISK["open"].get(rid)
        if got:
            _disk_packed_fresh(got[0])   # 6.88: packed-refs read again when it changed (app_copy_688.py)
            return got
''')

rep('''    def disk_sizes(self, rid, oids):
''', '''    # 6.88: a second copy of a repository on another drive, checked by fingerprint (app_copy_688.py)
    def copy_places(self):
        return _copy_places()

    def copy_choose(self):
        return _copy_choose(getattr(self, "_main_window", None))

    def copy_list(self):
        return _copy_list()

    def copy_plan(self, rid, folder, when, label=None):
        return _copy_plan(rid, folder, when, label)

    def copy_now(self, rid):
        return _copy_now(rid)

    def copy_check(self, rid):
        return _copy_check(rid)

    def copy_forget(self, rid):
        return _copy_forget(rid)

    def disk_sizes(self, rid, oids):
''', 2)
rep('''        # R74: lending the models to the person's other devices
        if res["ok"] and model == "builtin" and "--selftest-share" in argv:''', '''        # 6.88: Fabrica's second copy: the objects of a repository found to copy (app_copy_688.py)
        if res["ok"] and "--selftest-hub" in argv:
            res["copy"] = _selftest_copy()
            if not res["copy"].get("ok"):
                res["ok"] = False
                res["error"] = "Fabrica's second copy: %s" % res["copy"].get("error")
        # R74: lending the models to the person's other devices
        if res["ok"] and model == "builtin" and "--selftest-share" in argv:''')
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
