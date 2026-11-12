"""Ingenium 6.92 (12 November 2026): Fabrica, phase 2. A merge whose two ideas changed the same lines, resolved on the drive.

6.87 (app_disk2_687.py) refused it ("Fabrica does not resolve that on the drive yet"). Now the merge is left in the working copy's folder as
git itself leaves one, so that Fabrica, git and any other program see the same thing:
  disk_merge_begin(id, payload)
                             the files the merge changes, written into the folder: those both ideas changed hold both versions between
                             git's own marks (<<<<<<< ======= >>>>>>>), as Fabrica's three-way merge made them in the page; the others
                             as the merge made them, each read from the repository by its git name, or (made in the page) checked
                             against it. Then git's own files: ORIG_HEAD (the version before the merge), MERGE_HEAD (the other idea's
                             version; none for a squash, as git's merge --squash), MERGE_MSG; and Fabrica's note, .git/ingenium-merge.json
                             (the idea's name, the files that held both versions). Refused when the folder moved on since Fabrica read
                             it, when anything in it waits to be kept, or when a merge is already under way. payload: {ours, theirs,
                             label, squash, msg, conflicts: [paths], files: {path: null (taken away) | {oid, mode, b64?}}}
  disk_merge_stop(id)        stops it, as git merge --abort: each file the merge changed is put back as the version before held it,
                             what it holds now saved first in .git/ingenium-put-back/<time>/ (nothing she wrote is lost); git's merge
                             files and Fabrica's note taken away
  disk_commit(id, ...)       as in 6.87, and while a merge is under way: refused while a file still holds both versions (naming each);
                             the version made has both parents (dulwich 0.22.8 reads MERGE_HEAD, and removes it once the version is
                             made), one for a squash; then MERGE_MSG and Fabrica's note are taken away
  disk_repo(id)              as in 6.87, with the merge under way: {theirs, label, squash, conflicts, left, git}: left, the files that
                             still hold both versions; git, true for a merge git itself left (MERGE_HEAD without Fabrica's note), whose
                             files holding both versions are found by their marks
Every call was checked in dulwich 0.22.8 and tested against git (rig/t_692_drive_merge.py).

    python3 build/desktop/app_merge_692.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_disk_merge_begin" in s:
    print("already patched", p)
    sys.exit(0)
if "_disk_commit" not in s:
    sys.exit("%s: app_disk2_687.py must come first" % p)

FN = r'''# ---- 6.92 (Fabrica, phase 2): a merge whose ideas changed the same lines, resolved on the drive (app_merge_692.py) ----
_DISK_MARKS = re.compile(rb"^(<<<<<<<|=======|>>>>>>>)( |$)", re.M)


def _disk_merge_files(repo):
    cd = repo.controldir()
    return {"note": os.path.join(cd, "ingenium-merge.json"), "head": os.path.join(cd, "MERGE_HEAD"),
            "msg": os.path.join(cd, "MERGE_MSG"), "orig": os.path.join(cd, "ORIG_HEAD"), "squash": os.path.join(cd, "SQUASH_MSG")}


def _disk_status_of(repo):
    """git's status as dulwich gives it; a folder git left in the middle of a merge marks in its index the files both ideas changed,
    which dulwich 0.22.8's status cannot read (an AttributeError): each is read as the version before the merge held it, in memory only"""
    from dulwich import porcelain
    from dulwich.index import ConflictedIndexEntry
    idx = repo.open_index()
    marked = [(k, v) for k, v in idx.items() if isinstance(v, ConflictedIndexEntry)]
    if not marked:
        return porcelain.status(repo, untracked_files="all")
    for k, v in marked:
        e = v.this or v.ancestor or v.other
        if e is None:
            del idx[k]
        else:
            idx[k] = e
    repo.open_index = lambda: idx
    try:
        return porcelain.status(repo, untracked_files="all")
    finally:
        try:
            del repo.open_index
        except AttributeError:
            pass


def _disk_holds_both(repo, rel):
    """that a file of the folder still holds both versions between git's marks (a file too large or not text is not read)"""
    fs = _disk_fs(repo, rel)
    try:
        if os.path.islink(fs) or not os.path.isfile(fs) or os.path.getsize(fs) > 32 * 1048576:
            return False
        with open(fs, "rb") as fh:
            data = fh.read()
    except OSError:
        return False
    if b"\0" in data[:8000]:
        return False
    return bool(_DISK_MARKS.search(data))


def _disk_merge_clear(repo, made=False):
    f = _disk_merge_files(repo)
    for k in ("note", "msg", "squash") + (() if made else ("head",)):
        try:
            os.unlink(f[k])
        except OSError:
            pass


def _disk_merge_under_way(repo, changed=None):
    """the merge under way in the folder: Fabrica's note and git's MERGE_HEAD; a merge git left has no note (its files holding both
    versions are found by their marks among the files changed). None when there is none."""
    f = _disk_merge_files(repo)
    note = None
    try:
        with open(f["note"], encoding="utf-8") as fh:
            note = json.load(fh)
        if not isinstance(note, dict):
            note = None
    except (OSError, ValueError):
        note = None
    heads = []
    try:
        with open(f["head"], "rb") as fh:
            heads = [x.strip().decode("ascii") for x in fh.read().splitlines() if x.strip()]
    except (OSError, UnicodeDecodeError):
        heads = []
    if not note and not heads:
        return None
    if note and not note.get("squash") and not heads:
        # ended or stopped elsewhere (git commit, git merge --abort): Fabrica's note goes with it
        _disk_merge_clear(repo)
        return None
    if note:
        conflicts = [str(x) for x in (note.get("conflicts") or [])]
        label = str(note.get("label") or "the other idea")
    else:
        label = "the other idea"
        try:
            with open(f["msg"], "rb") as fh:
                first = fh.read().decode("utf-8", "replace").split("\n")[0]
            m = re.match(r"^Merge (?:remote-tracking )?(?:branch|tag|commit) '([^']+)'", first)
            if m:
                label = m.group(1)
        except OSError:
            pass
        conflicts = sorted(x for x in (changed or []) if _disk_holds_both(repo, x))
    left = [x for x in conflicts if _disk_holds_both(repo, x)]
    return {"theirs": heads[0] if heads else None, "label": label, "squash": bool(note and note.get("squash")),
            "conflicts": conflicts, "left": left, "git": not note}


def _disk_put_blob(repo, rel, data, mode):
    """a file of the merge, written as git checks a file out (the repository's line endings), a mark of running kept"""
    from dulwich.objects import Blob
    fs = _disk_fs(repo, rel)
    if os.path.isdir(fs):
        raise ValueError("%s is a folder in its folder; the merge puts a file there." % rel)
    blob = Blob.from_string(data)
    try:
        blob = repo.get_blob_normalizer().checkout_normalize(blob, rel.encode("utf-8"))
    except Exception:
        pass
    os.makedirs(os.path.dirname(fs), exist_ok=True)
    if str(mode) == "120000":
        if os.path.lexists(fs):
            os.unlink(fs)
        try:
            os.symlink(blob.data.decode("utf-8"), fs)
            return
        except (OSError, NotImplementedError, UnicodeDecodeError):
            pass  # a system that keeps no links: the link's target as the file's text, as git does there
    tmp = fs + ".ingenium-tmp"
    with open(tmp, "wb") as fh:
        fh.write(blob.data)
    os.replace(tmp, fs)
    if os.name != "nt":
        m = os.stat(fs).st_mode
        os.chmod(fs, (m | 0o111) if str(mode) == "100755" else (m & ~0o111))


def _disk_merge_index(repo, tip, theirs, plan, conflicts):
    """git's index as git's own merge leaves it: each file merged cleanly staged; each file both ideas changed marked with its three
    versions (the common one, this idea's, the other's), so git status, git add, git commit and git merge --abort work as after git"""
    from dulwich.index import IndexEntry, ConflictedIndexEntry
    from dulwich.object_store import tree_lookup_path
    cs = set(conflicts)
    repo.stage([rel for rel, data, mode in plan if rel not in cs])
    if not cs:
        return
    tipb = tip if isinstance(tip, bytes) else str(tip).encode("ascii")
    trees = {"this": repo[tipb].tree}
    if theirs and re.match(r"^[0-9a-f]{40}$", str(theirs)):
        thb = str(theirs).encode("ascii")
        try:
            trees["other"] = repo[thb].tree
            from dulwich.graph import find_merge_base
            base = find_merge_base(repo, [tipb, thb])
            if base:
                trees["ancestor"] = repo[base[0]].tree
        except KeyError:
            pass

    def entry(which, rel):
        if which not in trees:
            return None
        try:
            mode, sha = tree_lookup_path(repo.object_store.__getitem__, trees[which], rel.encode("utf-8"))
        except KeyError:
            return None
        return IndexEntry(ctime=(0, 0), mtime=(0, 0), dev=0, ino=0, mode=mode, uid=0, gid=0, size=0, sha=sha)

    idx = repo.open_index()
    for rel in sorted(cs):
        e = ConflictedIndexEntry(ancestor=entry("ancestor", rel), this=entry("this", rel), other=entry("other", rel))
        if e.this is None and e.other is None:
            continue
        idx[rel.encode("utf-8")] = e
    idx.write()


def _disk_merge_begin(rid, payload):
    from dulwich.objects import Blob
    payload = payload or {}
    with _DISK["lock"]:
        try:
            repo, k = _disk_open(rid)
            if repo.bare:
                return {"ok": False, "error": "%s has no folder of files: make a working copy of it (Make a working copy, under its name), and bring the idea in there." % k["name"]}
            if _disk_merge_under_way(repo):
                return {"ok": False, "error": "A merge is already under way in its folder: keep the version, or stop the merge, first."}
            tip, head = _disk_head_tip(repo)
            if not head.get("ref"):
                return {"ok": False, "error": "Its folder shows an older version: go back to an idea first."}
            if _disk_text(tip or b"") != str(payload.get("ours") or ""):
                return {"ok": False, "error": "Its folder moved on since Fabrica read it: look again, then bring the idea in."}
            work, changes, _, _ = _disk_status(rid, repo)
            if changes:
                return {"ok": False, "error": "Keep or put back the changes in its folder first: a merge starts from files with nothing waiting."}
            theirs = payload.get("theirs") or None
            squash = bool(payload.get("squash")) or not theirs
            if theirs:
                if not re.match(r"^[0-9a-f]{40}$", str(theirs)) or theirs.encode("ascii") not in repo.object_store:
                    return {"ok": False, "error": "The other idea's version is not in the repository."}
            files = payload.get("files") or {}
            plan = []
            for path in sorted(files):
                rel = _disk_rel(path)
                v = files[path]
                if v is None:
                    plan.append((rel, None, None))
                    continue
                oid = str(v.get("oid") or "")
                mode = str(v.get("mode") or "100644")
                if mode in ("160000", "40000", "040000"):
                    continue
                if v.get("b64") is not None:
                    data = base64.b64decode(v.get("b64") or "")
                    if Blob.from_string(data).id.decode("ascii") != oid:
                        return {"ok": False, "error": "%s did not arrive whole: nothing was written." % rel}
                else:
                    try:
                        o = repo.object_store[oid.encode("ascii")]
                    except KeyError:
                        return {"ok": False, "error": "%s's version is not in the repository: nothing was written." % rel}
                    if o.type_name != b"blob":
                        return {"ok": False, "error": "%s is not a file in the repository: nothing was written." % rel}
                    data = o.as_raw_string()
                plan.append((rel, data, mode))
            # git's merge files and Fabrica's note first: a write that fails part way leaves a merge under way, which Stop the merge
            # puts back
            tipt = _disk_text(tip)
            f = _disk_merge_files(repo)
            msg = str(payload.get("msg") or ("Merge branch '%s'" % (payload.get("label") or "the other idea"))).replace("\r\n", "\n").strip() + "\n"
            note = {"v": 1, "label": str(payload.get("label") or "the other idea"), "squash": squash, "ours": tipt,
                    "theirs": theirs, "conflicts": sorted(_disk_rel(x) for x in (payload.get("conflicts") or [])),
                    "files": [x[0] for x in plan], "at": int(time.time())}
            with open(f["note"], "w", encoding="utf-8") as fh:
                json.dump(note, fh)
            with open(f["orig"], "wb") as fh:
                fh.write(tipt.encode("ascii") + b"\n")
            if squash:
                with open(f["squash"], "wb") as fh:
                    fh.write(msg.encode("utf-8"))
            else:
                with open(f["msg"], "wb") as fh:
                    fh.write(msg.encode("utf-8"))
                with open(f["head"], "wb") as fh:
                    fh.write(theirs.encode("ascii") + b"\n")
            for rel, data, mode in plan:
                fs = _disk_fs(repo, rel)
                if data is None:
                    if os.path.lexists(fs) and not os.path.isdir(fs):
                        os.unlink(fs)
                    continue
                _disk_put_blob(repo, rel, data, mode)
            _disk_merge_index(repo, tip, theirs or payload.get("from") or None, plan, note["conflicts"])
            _DISK_W["st"].pop(rid, None)
            return {"ok": True, "files": len(plan), "conflicts": note["conflicts"]}
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        except Exception as e:
            log_problem("disk: a merge could not be begun", sys.exc_info())
            return {"ok": False, "error": "The merge could not be begun: %s" % e}


def _disk_merge_stop(rid):
    with _DISK["lock"]:
        try:
            repo, k = _disk_wt(rid)
            work, changes, tip, head = _disk_status(rid, repo)
            m = _disk_merge_under_way(repo, [c["path"] for c in changes])
            if not m:
                return {"ok": True, "n": 0, "saved": 0, "aside": None}
            note = {}
            try:
                with open(_disk_merge_files(repo)["note"], encoding="utf-8") as fh:
                    note = json.load(fh) or {}
            except (OSError, ValueError):
                note = {}
            # the files the merge changed: Fabrica's list, and every file git knows that is changed (a new file of hers, never known
            # to git, stays where it is, as git merge --abort leaves it)
            st = _disk_status_of(repo)
            known = set(_disk_text(x) for x in st.unstaged) | set(_disk_text(x) for kk in ("add", "delete", "modify") for x in st.staged.get(kk, []))
            try:
                from dulwich.index import ConflictedIndexEntry
                known |= set(_disk_text(k2) for k2, v in repo.open_index().items() if isinstance(v, ConflictedIndexEntry))
            except Exception:
                pass
            rels = sorted(set(_disk_rel(x) for x in (note.get("files") or [])) | (known - _disk_gitlinks(repo)))
            hm = _disk_tree_map(rid, repo, tip)
            d, saved = None, 0
            for rel in rels:
                fs = _disk_fs(repo, rel)
                if os.path.lexists(fs) and not os.path.isdir(fs):
                    if d is None:
                        d = _disk_aside(repo)
                    if _disk_save_aside(repo, rel, d, rel not in hm):
                        saved += 1
                if rel in hm:
                    o = repo.object_store[hm[rel][1].encode("ascii")]
                    _disk_put_blob(repo, rel, o.as_raw_string(), hm[rel][0])
            # the index as the version before holds it: git's marks and what git's merge staged taken away
            idx = repo.open_index()
            for rel in rels:
                b = rel.encode("utf-8")
                if b in idx:
                    del idx[b]
            idx.write()
            repo.stage([r for r in rels if r in hm])
            _disk_merge_clear(repo)
            _DISK_W["st"].pop(rid, None)
            return {"ok": True, "n": len(rels), "saved": saved, "aside": os.path.relpath(d, repo.path).replace("\\", "/") if d else None}
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        except Exception as e:
            log_problem("disk: a merge could not be stopped", sys.exc_info())
            return {"ok": False, "error": "The merge could not be stopped: %s" % e}


'''

rep('''def _start_local_server(directory, html_name=None):''', FN + '''def _start_local_server(directory, html_name=None):''')
rep('''st = porcelain.status(repo, untracked_files="all")''', '''st = _disk_status_of(repo)  # 6.92: a merge git left (app_merge_692.py)''', 4)

# the record: the merge under way
rep('''            work, changes, tip, head = _disk_status(rid, repo)
            rec["work"] = work
            rec["fileCount"] = len(work)
            rec["changes"] = changes
            return x
''', '''            work, changes, tip, head = _disk_status(rid, repo)
            rec["work"] = work
            rec["fileCount"] = len(work)
            rec["changes"] = changes
            rec["merging"] = _disk_merge_under_way(repo, [c["path"] for c in changes])  # 6.92 (app_merge_692.py)
            return x
''')

# keeping a version while a merge is under way
rep('''            if not paths and not staged:
                return {"ok": False, "error": "Nothing in its folder waits to be kept."}
''', '''            mg = _disk_merge_under_way(repo, sorted(paths))  # 6.92: a merge under way (app_merge_692.py)
            if mg and mg["left"]:
                return {"ok": False, "error": "These still hold both versions: %s. Keep one of each, then keep the version." % ", ".join(mg["left"])}
            if mg and not paths and not staged and mg["theirs"]:
                staged = True  # a merge whose files are as the version before: kept all the same, with both parents (as git)
            if mg:
                # the index marks the files both ideas changed (git's merge, and Fabrica's, as git's): each is staged as it is now
                try:
                    idx = repo.open_index()
                    for b, v in list(idx.items()):
                        if type(v).__name__ == "ConflictedIndexEntry":
                            paths.add(_disk_text(b))
                except Exception:
                    pass
            if not paths and not staged:
                return {"ok": False, "error": "Nothing in its folder waits to be kept."}
''')
rep('''            _DISK["size"].pop(os.path.realpath(repo.controldir()), None)
            return {"ok": True, "commit": _disk_text(c)}
''', '''            _DISK["size"].pop(os.path.realpath(repo.controldir()), None)
            if mg:
                _disk_merge_clear(repo, made=True)
            return {"ok": True, "commit": _disk_text(c), "merged": bool(mg)}
''')

rep('''    def disk_working_copy(self, rid, folder=None):
''', '''    # 6.92: a merge whose ideas changed the same lines, resolved on the drive (app_merge_692.py)
    def disk_merge_begin(self, rid, payload):
        return _disk_merge_begin(rid, payload)

    def disk_merge_stop(self, rid):
        return _disk_merge_stop(rid)

    def disk_working_copy(self, rid, folder=None):
''', 2)
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
