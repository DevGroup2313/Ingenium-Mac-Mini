"""Ingenium 6.87 (12 November 2026): Fabrica, phase 2, second stage. Working on the repositories on this computer, on the drive itself.

The owner's words (12 November 2026), on the preview of this stage (https://claude.ai/artifact/VNwsz2ywj3XkXaCq8gws1o, version 4):
"I approve of the preview, please push it everywhere."

6.86 (app_disk_686.py) reads every repository on this computer from its drive. This stage writes there, as git itself would:
  disk_repo(id)              as in 6.86, and for a working copy (a folder with .git) the folder as it is: its files, and what
                             changed since the version kept, made in Ingenium or in any other program (git's own status, with
                             .gitignore); each changed file's git name read from the file itself
  disk_objs, disk_sizes      as in 6.86, and a changed file of the folder served by its git name (read again and checked)
  disk_commit(id, message, name, email)
                             keeps every change of the folder as a version: staged as git add would (deletions too), committed with
                             the repository's own name and address from git's settings (else the name Fabrica uses)
  disk_put_back(id, paths)   puts files back as they were in the version kept; what they held first is saved in
                             .git/ingenium-put-back/<time>/ (a new file is moved there): nothing is lost
  disk_write_file(id, path, b64), disk_remove_file(id, path), disk_move_file(id, a, b)
                             a change made in Fabrica's own editor, in the folder (a file removed is moved aside, as above);
                             never outside the repository's folder, never inside .git
  disk_write(id, payload)    what Fabrica made in the page (a merge, a squash, a rebase, an idea, a tag, a version undone): its
                             objects written after checking each one's git name, then each branch or tag moved only if it is still
                             where Fabrica saw it (git's own compare and swap); the idea worked on, switched; for a working copy, the
                             folder follows its branch, only when nothing in it waits to be kept and no new file of hers is in the
                             way (a file .gitignore names is moved aside first)
  disk_working_copy(id)      a bare repository (one brought from GitHub) gets a working copy in a folder she chooses, so she can
                             change its files; Fabrica lists it at once
Every call was checked in dulwich 0.22.8, which the apps carry, and tested against git (rig/t_687_disk_write.py).

    python3 build/desktop/app_disk2_687.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_disk_commit" in s:
    print("already patched", p)
    sys.exit(0)
if "_disk_repo" not in s:
    sys.exit("%s: app_disk_686.py must come first" % p)

FN = r'''# ---- 6.87 (Fabrica, phase 2, second stage): working on the drive itself (app_disk2_687.py) ----
_DISK_W = {"hash": {}, "wc": {}, "st": {}}


def _disk_rel(path):
    """a path inside the repository, as git names it; refused if it would leave the folder or reach .git"""
    from dulwich.index import validate_path
    raw = str(path or "").replace("\\", "/")
    rel = raw.rstrip("/")
    if not rel or raw.startswith("/") or re.match(r"^[A-Za-z]:", raw) or not validate_path(rel.encode("utf-8")):
        raise ValueError("That path is not one Fabrica writes: %s" % (path or "(none)"))
    return rel


def _disk_fs(repo, rel):
    return os.path.join(repo.path, *rel.split("/"))


def _disk_mode_of(st, known):
    import stat as _st
    if _st.S_ISLNK(st.st_mode):
        return 0o120000
    if os.name == "nt" and known:
        return known  # Windows keeps no mark of a file that runs: the mode git knows stays
    return 0o100755 if (st.st_mode & 0o111) else 0o100644


def _disk_hash_file(repo, rel, fs, st, known):
    key = (fs, st.st_size, st.st_mtime_ns, st.st_mode)
    got = _DISK_W["hash"].get(key)
    if got:
        return got
    from dulwich.index import blob_from_path_and_stat
    blob = blob_from_path_and_stat(os.fsencode(fs), st)
    try:
        blob = repo.get_blob_normalizer().checkin_normalize(blob, rel.encode("utf-8"))
    except Exception:
        pass
    got = (_disk_text(blob.id), _disk_mode_of(st, known))
    if len(_DISK_W["hash"]) > 200000:
        _DISK_W["hash"].clear()
    _DISK_W["hash"][key] = got
    return got


def _disk_tree_map(rid, repo, tip):
    from dulwich.object_store import iter_tree_contents
    if not tip:
        return {}
    got = _DISK["work"].get((rid, tip))
    if got is None:
        o = repo.get_object(tip.encode())
        while o.type_name == b"tag":
            o = repo.get_object(o.object[1])
        got = {}
        if o.type_name == b"commit":
            for e in iter_tree_contents(repo.object_store, o.tree):
                mode = "%o" % e.mode
                if mode == "160000":
                    continue
                got[_disk_text(e.path)] = ["100644" if mode == "100664" else mode, _disk_text(e.sha)]
        if len(_DISK["work"]) > 24:
            _DISK["work"].clear()
        _DISK["work"][(rid, tip)] = got
    return got


def _disk_gitlinks(repo, rid=None, tip=None):
    """the other repositories inside this one (submodules): never staged, never counted as a change of the folder"""
    out = set()
    try:
        for path, e in repo.open_index().items():
            if getattr(e, "mode", 0) == 0o160000:
                out.add(_disk_text(path))
    except Exception:
        pass
    try:
        from dulwich.object_store import iter_tree_contents
        t = tip or _disk_head_tip(repo)[0]
        if t:
            o = repo.get_object(t.encode())
            while o.type_name == b"tag":
                o = repo.get_object(o.object[1])
            for e in iter_tree_contents(repo.object_store, o.tree):
                if e.mode == 0o160000:
                    out.add(_disk_text(e.path))
    except Exception:
        pass
    return out


def _disk_head_tip(repo):
    refs, head = _disk_refs(repo)
    return (refs.get(head["ref"]) if head.get("ref") else head.get("oid")), head


def _disk_status(rid, repo):
    """the folder as it is: its files (path: [mode, git name]) and what changed since the version kept, in Fabrica's words"""
    from dulwich import porcelain
    tip, head = _disk_head_tip(repo)
    hm = _disk_tree_map(rid, repo, tip)
    st = porcelain.status(repo, untracked_files="all")
    touched = set()
    for k in ("add", "delete", "modify"):
        touched.update(_disk_text(x) for x in st.staged.get(k, []))
    touched.update(_disk_text(x) for x in st.unstaged)
    touched.update(_disk_text(x) for x in st.untracked)
    work, changes, wc = dict(hm), [], {}
    for rel in sorted(touched):
        fs = _disk_fs(repo, rel)
        old = hm.get(rel)
        try:
            stv = os.lstat(fs)
        except OSError:
            stv = None
        if stv is None or os.path.isdir(fs):
            if old:
                work.pop(rel, None)
                changes.append({"path": rel, "kind": "removed", "old": old})
            continue
        oid, mode = _disk_hash_file(repo, rel, fs, stv, int(old[0], 8) if old else None)
        now = ["%o" % mode, oid]
        wc[oid] = (fs, rel)
        if old and old == now:
            continue
        work[rel] = now
        if old:
            changes.append({"path": rel, "kind": "mode" if old[1] == oid else "changed", "old": old, "now": now})
        else:
            changes.append({"path": rel, "kind": "added", "now": now})
    _DISK_W["wc"][rid] = wc
    _DISK_W["st"][rid] = (time.time(), work, changes, tip)
    return work, changes, tip, head


def _disk_repo2(rid):
    """6.86's record, and for a working copy the folder as it is"""
    x = _disk_repo(rid)
    if not x.get("ok"):
        return x
    with _DISK["lock"]:
        try:
            repo, _ = _disk_open(rid)
            rec = x["rec"]
            rec["disk"]["worktree"] = not repo.bare
            if repo.bare:
                return x
            work, changes, tip, head = _disk_status(rid, repo)
            rec["work"] = work
            rec["fileCount"] = len(work)
            rec["changes"] = changes
            return x
        except Exception as e:
            log_problem("disk: the folder could not be read", sys.exc_info())
            x["rec"]["changes"] = []
            x["rec"]["disk"]["folderError"] = str(e)
            return x


def _disk_objs2(rid, oids, more=0):
    """6.86's objects, and a changed file of the folder by its git name (read again, and checked)"""
    x = _disk_objs(rid, oids, more)
    if not x.get("ok"):
        return x
    wc = _DISK_W["wc"].get(rid) or {}
    objs = x.get("objs") or {}
    for o in list(objs):
        if objs[o] is None and o in wc:
            fs, rel = wc[o]
            try:
                with _DISK["lock"]:
                    repo, _ = _disk_open(rid)
                    stv = os.lstat(fs)
                    if stv.st_size > _DISK_BIG:
                        objs[o] = {"t": "blob", "n": stv.st_size, "big": True}
                        continue
                    from dulwich.index import blob_from_path_and_stat
                    blob = blob_from_path_and_stat(os.fsencode(fs), stv)
                    try:
                        blob = repo.get_blob_normalizer().checkin_normalize(blob, rel.encode("utf-8"))
                    except Exception:
                        pass
                if _disk_text(blob.id) == o:
                    raw = blob.as_raw_string()
                    objs[o] = {"t": "blob", "n": len(raw), "b64": base64.b64encode(raw).decode("ascii")}
            except OSError:
                pass
    return x


def _disk_sizes_of2(rid, oids):
    x = _disk_sizes_of(rid, oids)
    if x.get("ok"):
        wc = _DISK_W["wc"].get(rid) or {}
        for o in oids or []:
            if o not in x["sizes"] and o in wc:
                try:
                    x["sizes"][o] = os.lstat(wc[o][0]).st_size
                except OSError:
                    pass
    return x


def _disk_wt(rid):
    repo, k = _disk_open(rid)
    if repo.bare:
        raise ValueError("%s has no folder of files to change: make a working copy of it first (Make a working copy, under its name)." % k["name"])
    return repo, k


def _disk_ident(repo, name, email):
    """the repository's own name and address, from git's settings; else the name Fabrica uses"""
    n = e = None
    try:
        cfg = repo.get_config_stack()
        n = cfg.get((b"user",), b"name")
        e = cfg.get((b"user",), b"email")
    except KeyError:
        pass
    except Exception:
        pass
    if not n:
        n = (name or "Ingenium").encode("utf-8")
    if not e:
        e = (email or "").encode("utf-8")
    return n + b" <" + e + b">"


def _disk_aside(repo, stamp=None):
    d = os.path.join(repo.controldir(), "ingenium-put-back", stamp or time.strftime("%Y%m%d-%H%M%S"))
    os.makedirs(d, exist_ok=True)
    return d


def _disk_save_aside(repo, rel, d, move):
    src = _disk_fs(repo, rel)
    if not os.path.lexists(src):
        return False
    dst = os.path.join(d, *rel.split("/"))
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if move:
        shutil.move(src, dst)
    else:
        shutil.copy2(src, dst, follow_symlinks=False)
    return True


def _disk_commit(rid, message, name=None, email=None):
    from dulwich import porcelain
    msg = str(message or "").replace("\r\n", "\n").strip()
    if not msg:
        return {"ok": False, "error": "A few words first: what changed?"}
    with _DISK["lock"]:
        try:
            repo, k = _disk_wt(rid)
            st = porcelain.status(repo, untracked_files="all")
            links = _disk_gitlinks(repo)
            paths = (set(_disk_text(x) for x in st.unstaged) | set(_disk_text(x) for x in st.untracked)) - links
            staged = any(set(_disk_text(x) for x in st.staged.get(kk, [])) - links for kk in ("add", "delete", "modify"))
            if not paths and not staged:
                return {"ok": False, "error": "Nothing in its folder waits to be kept."}
            if paths:
                repo.stage(sorted(paths))
            ident = _disk_ident(repo, name, email)
            try:
                c = repo.do_commit(msg.encode("utf-8") + b"\n", committer=ident, author=ident)
            except Exception as e:
                if "hook" in type(e).__name__.lower() or "hook" in str(e).lower():
                    return {"ok": False, "error": "The repository's own check before a commit stopped it: %s" % e}
                raise
            _DISK["size"].pop(os.path.realpath(repo.controldir()), None)
            return {"ok": True, "commit": _disk_text(c)}
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        except Exception as e:
            log_problem("disk: a version could not be kept", sys.exc_info())
            return {"ok": False, "error": "It could not be kept: %s" % e}


def _disk_put_back(rid, paths):
    from dulwich import porcelain
    with _DISK["lock"]:
        try:
            repo, k = _disk_wt(rid)
            tip, head = _disk_head_tip(repo)
            hm = _disk_tree_map(rid, repo, tip)
            rels = [_disk_rel(x) for x in (paths or [])]
            if not rels:
                st = porcelain.status(repo, untracked_files="all")
                rels = sorted((set(_disk_text(x) for x in st.unstaged) | set(_disk_text(x) for x in st.untracked) |
                               set(_disk_text(x) for kk in ("add", "delete", "modify") for x in st.staged.get(kk, []))) - _disk_gitlinks(repo))
            d, saved = None, 0
            for rel in rels:
                if d is None:
                    d = _disk_aside(repo)
                if rel in hm:
                    if _disk_save_aside(repo, rel, d, False):
                        saved += 1
                    porcelain.reset_file(repo, rel)
                    repo.stage([rel])
                else:
                    if _disk_save_aside(repo, rel, d, True):
                        saved += 1
                    try:
                        idx = repo.open_index()
                        if rel.encode("utf-8") in idx:
                            del idx[rel.encode("utf-8")]
                            idx.write()
                    except Exception:
                        pass
            return {"ok": True, "n": len(rels), "saved": saved,
                    "aside": os.path.relpath(d, repo.path).replace("\\", "/") if d else None}
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        except Exception as e:
            log_problem("disk: files could not be put back", sys.exc_info())
            return {"ok": False, "error": "They could not be put back: %s" % e}


def _disk_write_file(rid, path, b64, mode=None):
    with _DISK["lock"]:
        try:
            repo, k = _disk_wt(rid)
            rel = _disk_rel(path)
            if str(mode or "") == "120000":
                return {"ok": False, "error": "Fabrica does not write a link into the folder."}
            fs = _disk_fs(repo, rel)
            if os.path.isdir(fs):
                return {"ok": False, "error": "%s is a folder." % rel}
            os.makedirs(os.path.dirname(fs), exist_ok=True)
            data = base64.b64decode(b64 or "")
            tmp = fs + ".ingenium-tmp"
            with open(tmp, "wb") as fh:
                fh.write(data)
            os.replace(tmp, fs)
            if str(mode or "") == "100755" and os.name != "nt":
                os.chmod(fs, os.stat(fs).st_mode | 0o111)
            return {"ok": True}
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        except Exception as e:
            log_problem("disk: a file could not be written", sys.exc_info())
            return {"ok": False, "error": "It could not be written: %s" % e}


def _disk_remove_file(rid, path):
    with _DISK["lock"]:
        try:
            repo, k = _disk_wt(rid)
            rel = _disk_rel(path)
            d = _disk_aside(repo)
            if not _disk_save_aside(repo, rel, d, True):
                return {"ok": False, "error": "%s is not in its folder." % rel}
            return {"ok": True, "aside": os.path.relpath(d, repo.path).replace("\\", "/")}
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        except Exception as e:
            return {"ok": False, "error": "It could not be taken away: %s" % e}


def _disk_move_file(rid, a, b):
    with _DISK["lock"]:
        try:
            repo, k = _disk_wt(rid)
            ra, rb = _disk_rel(a), _disk_rel(b)
            fa, fb = _disk_fs(repo, ra), _disk_fs(repo, rb)
            if not os.path.lexists(fa):
                return {"ok": False, "error": "%s is not in its folder." % ra}
            if os.path.lexists(fb):
                return {"ok": False, "error": "%s is already there." % rb}
            os.makedirs(os.path.dirname(fb), exist_ok=True)
            os.replace(fa, fb)
            return {"ok": True}
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        except Exception as e:
            return {"ok": False, "error": "It could not be moved: %s" % e}


_DISK_TYPE = {"commit": 1, "tree": 2, "blob": 3, "tag": 4}


def _disk_follow(repo, rid, old_tip, new_tip):
    """the folder follows its branch from one version to another: files the new one no longer holds taken away (a file
    .gitignore names, in the way of the new version, moved aside first), then the new version's files and git's index"""
    from dulwich import porcelain
    om, nm = _disk_tree_map(rid, repo, old_tip), _disk_tree_map(rid, repo, new_tip)
    d = None
    for rel in sorted(set(om) - set(nm)):
        fs = _disk_fs(repo, rel)
        if os.path.lexists(fs) and not os.path.isdir(fs):
            os.remove(fs)
            par = os.path.dirname(fs)
            while par and os.path.realpath(par) != os.path.realpath(repo.path):
                try:
                    os.rmdir(par)
                except OSError:
                    break
                par = os.path.dirname(par)
    for rel in sorted(set(nm) - set(om)):
        fs = _disk_fs(repo, rel)
        if os.path.lexists(fs) and not os.path.isdir(fs):
            if d is None:
                d = _disk_aside(repo)
            _disk_save_aside(repo, rel, d, True)
    tree = repo.get_object(new_tip.encode())
    while tree.type_name == b"tag":
        tree = repo.get_object(tree.object[1])
    repo.reset_index(tree.tree)
    return d


def _disk_ready_to_follow(repo, rid, old_tip, new_tip):
    """nothing waits to be kept in the folder, and no new file of hers stands where the new version puts one"""
    from dulwich import porcelain
    st = porcelain.status(repo, untracked_files="all")
    waiting = (set(_disk_text(x) for x in st.unstaged) | set(_disk_text(x) for kk in ("add", "delete", "modify") for x in st.staged.get(kk, []))) - _disk_gitlinks(repo, rid, old_tip)
    if waiting:
        n = len(waiting)
        return "%d file%s in its folder %s changes not kept yet: keep them, or put them back, first." % (n, "" if n == 1 else "s", "has" if n == 1 else "have")
    om, nm = _disk_tree_map(rid, repo, old_tip), _disk_tree_map(rid, repo, new_tip)
    untracked = set(_disk_text(x) for x in st.untracked)
    way = sorted(p for p in set(nm) - set(om) if p in untracked)
    if way:
        return "A new file of yours is where that version puts one: %s. Move it, or keep it in a version, first." % ", ".join(way[:4])
    return None


def _disk_write(rid, payload):
    from dulwich.objects import ShaFile
    with _DISK["lock"]:
        try:
            repo, k = _disk_open(rid)
            payload = payload or {}
            objs = payload.get("objects") or []
            for item in objs:
                oid, t, b64 = item[0], item[1], item[2]
                raw = base64.b64decode(b64)
                head = ("%s %d" % (t, len(raw))).encode("ascii") + b"\0"
                if hashlib.sha1(head + raw).hexdigest() != oid:
                    return {"ok": False, "error": "An object Fabrica made does not match its git name: nothing was written."}
            for item in objs:
                if item[0].encode() not in repo.object_store:
                    repo.object_store.add_object(ShaFile.from_raw_string(_DISK_TYPE[item[1]], base64.b64decode(item[2])))
            refs, head = _disk_refs(repo)
            cur = head.get("ref")
            tip = refs.get(cur) if cur else head.get("oid")
            updates = payload.get("updates") or []
            switch = payload.get("head")
            follow_to = None
            if not repo.bare:
                for u in updates:
                    if u.get("ref") == cur and u.get("new"):
                        follow_to = u["new"]
                if switch and switch != cur:
                    target = None
                    for u in updates:
                        if u.get("ref") == switch:
                            target = u.get("new")
                    follow_to = target or refs.get(switch)
                    if not follow_to:
                        return {"ok": False, "error": "There is no idea called %s on the drive." % switch.replace("refs/heads/", "")}
                if follow_to and follow_to != tip:
                    why = _disk_ready_to_follow(repo, rid, tip, follow_to)
                    if why:
                        return {"ok": False, "error": why}
            ident = _disk_ident(repo, payload.get("name"), payload.get("email"))
            done = []
            for u in updates:
                ref, old, new = u.get("ref") or "", u.get("old"), u.get("new")
                if not (ref.startswith("refs/heads/") or ref.startswith("refs/tags/")):
                    return {"ok": False, "error": "Fabrica moves only ideas and tags on the drive: %s" % ref, "done": done}
                rb = ref.encode("utf-8")
                why = ("Ingenium: " + (u.get("why") or "update")).encode("utf-8")
                if old is None and new:
                    okk = repo.refs.add_if_new(rb, new.encode(), committer=ident, message=why)
                elif new is None and old:
                    okk = repo.refs.remove_if_equals(rb, old.encode())  # git drops a deleted branch's log (dulwich 0.22.8 fails writing one)
                else:
                    okk = repo.refs.set_if_equals(rb, old.encode(), new.encode(), committer=ident, message=why)
                if not okk:
                    return {"ok": False, "error": "%s moved on the drive since Fabrica read it: nothing more was changed. Look again, and try once more." %
                            ref.replace("refs/heads/", "the idea ").replace("refs/tags/", "the tag "), "done": done}
                done.append(ref)
            aside = None
            if not repo.bare:
                if switch and switch != cur:
                    repo.refs.set_symbolic_ref(b"HEAD", switch.encode("utf-8"), committer=ident, message=b"Ingenium: switch")
                if follow_to and follow_to != tip:
                    d = _disk_follow(repo, rid, tip, follow_to)
                    aside = os.path.relpath(d, repo.path).replace("\\", "/") if d else None
            _DISK["size"].pop(os.path.realpath(repo.controldir()), None)
            return {"ok": True, "done": done, "aside": aside}
        except Exception as e:
            log_problem("disk: a change could not be written", sys.exc_info())
            return {"ok": False, "error": "It could not be written on the drive: %s" % e}


def _disk_working_copy(rid, win, folder=None):
    """a working copy of a bare repository, in a folder she chooses (the copy's own folder is named after the repository)"""
    from dulwich import porcelain
    import io
    try:
        repo, k = _disk_open(rid)
        if not repo.bare:
            return {"ok": False, "error": "%s already has its folder of files." % k["name"]}
        if not folder:
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
            folder = str(got[0])
        base = os.path.join(folder, re.sub(r"[^A-Za-z0-9._ -]+", "-", k["name"]).strip(" .") or "repository")
        target, n = base, 1
        while os.path.exists(target):
            n += 1
            target = "%s %d" % (base, n)
        with _DISK["lock"]:
            porcelain.clone(k["path"], target, checkout=True, errstream=io.BytesIO())
        x = _disk_add(target)
        if x.get("ok"):
            x["path"] = target
        return x
    except Exception as e:
        log_problem("disk: a working copy could not be made", sys.exc_info())
        return {"ok": False, "error": "A working copy could not be made: %s" % e}


'''

rep('''def _start_local_server(directory, html_name=None):''', FN + '''def _start_local_server(directory, html_name=None):''')
rep('''    def disk_repo(self, rid):
        return _disk_repo(rid)
''', '''    def disk_repo(self, rid):
        return _disk_repo2(rid)
''', 2)
rep('''    def disk_objs(self, rid, oids, more=0):
        return _disk_objs(rid, oids, more)
''', '''    def disk_objs(self, rid, oids, more=0):
        return _disk_objs2(rid, oids, more)
''', 2)
rep('''    def disk_sizes(self, rid, oids):
        return _disk_sizes_of(rid, oids)
''', '''    def disk_sizes(self, rid, oids):
        return _disk_sizes_of2(rid, oids)

    # 6.87: Fabrica works on the repositories on this computer, on the drive itself (app_disk2_687.py)
    def disk_commit(self, rid, message, name=None, email=None):
        return _disk_commit(rid, message, name, email)

    def disk_put_back(self, rid, paths=None):
        return _disk_put_back(rid, paths)

    def disk_write_file(self, rid, path, b64, mode=None):
        return _disk_write_file(rid, path, b64, mode)

    def disk_remove_file(self, rid, path):
        return _disk_remove_file(rid, path)

    def disk_move_file(self, rid, a, b):
        return _disk_move_file(rid, a, b)

    def disk_write(self, rid, payload):
        return _disk_write(rid, payload)

    def disk_working_copy(self, rid, folder=None):
        return _disk_working_copy(rid, getattr(self, "_main_window", None), folder)
''', 2)
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
