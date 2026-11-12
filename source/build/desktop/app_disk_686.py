"""Ingenium 6.86 (12 November 2026): Fabrica, phase 2. Every repository on this computer, read straight from the drive.

The owner's words (12 November 2026): "Please continue working on my requests and deepening and enhancing Fabrica and making it my
own offline GitHub. I want full and complete parity with GitHub but I want you to go above and beyond that and really enhance it and
Ingenium as a whole." On the preview (https://claude.ai/artifact/VNwsz2ywj3XkXaCq8gws1o): "Please make the fixes and then push this
preview everywhere, I approve of the design."

The page keeps each repository as a record (its refs, its HEAD, its files at HEAD) and its git objects in a store (modules/r110.js,
IngRepo). For a repository on this computer, modules/r280.js asks these calls instead of the browser's store, so every view of Fabrica
reads it as it is on the drive, whatever its size, with nothing copied into the page:
  disk_list()                the repositories Fabrica knows on this computer: those she added, and every one brought from GitHub
                             (6.83, app_hub_683.py), each with its size, its drive and the room left on it, its branches and tags;
                             one whose drive is not connected is listed and said to be away
  disk_add(path)             add a folder that holds a git repository (a working copy with .git, or a bare one), on any drive
  disk_choose()              the same, through the system's folder dialog
  disk_forget(id)            Fabrica forgets one she added (nothing on the drive is touched)
  disk_repo(id)              its record for IngRepo: refs, HEAD and the files at HEAD (mode, git name), and their number
  disk_objs(id, oids, more)  git objects by name: {t, n, b64}; over 8 MB {t, n, part} (disk_part gives it in parts); over 48 MB
                             {t, n, big}: such a file is kept whole on the drive and opened from there, not carried into the page.
                             more: the commits before a commit, and a tree's folders, in the same answer
  disk_part(id, oid, off, n) a part of one object over 8 MB
  disk_sizes(id, oids)       sizes from the objects' headers only, so a file of any size is listed without being read
Read only in this stage: the only file written is the list she keeps (disk_repos.json in the app's own data folder).

    python3 build/desktop/app_disk_686.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_disk_repo" in s:
    print("already patched", p)
    sys.exit(0)

FN = r'''# ---- 6.86 (Fabrica, phase 2): every repository on this computer, read straight from the drive (app_disk_686.py) ----
_DISK = {"lock": threading.RLock(), "open": {}, "work": {}, "size": {}, "sz": {}, "last": None}
_DISK_PART = 8 * 1048576    # an object larger than this goes to the page in parts of this size
_DISK_BIG = 48 * 1048576    # an object larger than this is kept whole on the drive and opened from there
_DISK_KIND = {1: "commit", 2: "tree", 3: "blob", 4: "tag"}


def _disk_file():
    d = storage_dir()
    return os.path.join(d, "disk_repos.json") if d else None


def _disk_reg():
    try:
        f = _disk_file()
        if f and os.path.isfile(f):
            with open(f, encoding="utf-8") as fh:
                x = json.load(fh)
            if isinstance(x, dict) and isinstance(x.get("repos"), list):
                return x
    except Exception:
        log_problem("disk: the list of repositories could not be read", sys.exc_info())
    return {"repos": []}


def _disk_reg_save(reg):
    f = _disk_file()
    if not f:
        raise RuntimeError("this computer gives Ingenium no folder of its own to keep the list in")
    tmp = f + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(reg, fh, ensure_ascii=False, indent=1)
    os.replace(tmp, f)


def _disk_id(path):
    real = os.path.realpath(path)
    return "disk:" + hashlib.sha1(real.encode("utf-8", "surrogateescape")).hexdigest()[:16]


def _disk_drive(path):
    """the drive a path is on, as she knows it: a Mac's /Volumes/<name>, a Windows drive other than C:, else this computer"""
    real = os.path.realpath(path)
    m = re.match(r"^/Volumes/([^/]+)", real) or re.match(r"^/(?:media/[^/]+|run/media/[^/]+|mnt)/([^/]+)", real)
    if m:
        return m.group(1)
    m = re.match(r"^([A-Za-z]):[\\/]", real)
    if m and m.group(1).upper() != "C":
        return "Drive %s:" % m.group(1).upper()
    return "This computer"


def _disk_known():
    out = {}
    for x in _disk_reg().get("repos", []):
        try:
            if x.get("id") and x.get("path"):
                out[x["id"]] = {"id": x["id"], "path": x["path"], "name": x.get("name") or os.path.basename(x["path"].rstrip("/\\")),
                                "added": x.get("added") or 0, "brought": False, "present": os.path.isdir(x["path"])}
        except Exception:
            pass
    try:
        b = _hub_brought()
    except NameError:
        b = None
    except Exception:
        log_problem("disk: the repositories brought from GitHub could not be listed", sys.exc_info())
        b = None
    if b and b.get("place"):
        for r in b.get("repos") or []:
            try:
                if not (r.get("present") and r.get("git")):
                    continue
                gp = os.path.join(b["place"], r["git"])
                i = _disk_id(gp)
                if i not in out:
                    nm = r.get("name") or os.path.basename(gp)
                    if nm.endswith(".git"):
                        nm = nm[:-4]
                    out[i] = {"id": i, "path": gp, "name": nm, "added": 0, "brought": True, "full": r.get("full") or "",
                              "icon": r.get("icon") or "", "desc": r.get("description") or "", "present": True}
            except Exception:
                pass
    return out


def _disk_open(rid):
    from dulwich.repo import Repo
    with _DISK["lock"]:
        got = _DISK["open"].get(rid)
        if got:
            return got
        k = _disk_known().get(rid)
        if not k:
            raise KeyError("Fabrica does not know that repository.")
        if not os.path.isdir(k["path"]):
            raise KeyError("%s is not on this computer now: is its drive connected?" % k["name"])
        repo = Repo(k["path"])
        _DISK["open"][rid] = (repo, k)
        return repo, k


def _disk_drop(rid):
    with _DISK["lock"]:
        got = _DISK["open"].pop(rid, None)
    if got:
        try:
            got[0].close()
        except Exception:
            pass


def _disk_size(gitdir):
    """the room the repository takes on the drive (its .git folder), counted again only when it changes"""
    key = os.path.realpath(gitdir)
    marks = []
    for n in ("objects", os.path.join("objects", "pack"), "refs", "packed-refs"):
        try:
            marks.append(os.path.getmtime(os.path.join(gitdir, n)))
        except OSError:
            pass
    stamp = max(marks) if marks else 0
    got = _DISK["size"].get(key)
    if got and got[0] == stamp:
        return got[1]
    total = 0
    for root, dirs, files in os.walk(gitdir):
        for n in files:
            try:
                total += os.path.getsize(os.path.join(root, n))
            except OSError:
                pass
    _DISK["size"][key] = (stamp, total)
    return total


def _disk_text(b):
    return b.decode("utf-8", "replace") if isinstance(b, bytes) else str(b)


def _disk_refs(repo):
    refs, head = {}, None
    for k, v in repo.refs.as_dict().items():
        name = _disk_text(k)
        if not v or not (name.startswith("refs/heads/") or name.startswith("refs/tags/") or name.startswith("refs/pull/")):
            continue
        refs[name] = _disk_text(v)
    try:
        sym = repo.refs.get_symrefs().get(b"HEAD")
    except Exception:
        sym = None
    if sym:
        head = {"ref": _disk_text(sym)}
    else:
        try:
            head = {"oid": _disk_text(repo.refs.read_ref(b"HEAD"))}
        except Exception:
            head = {"ref": "refs/heads/main"}
    return refs, head


# ---------- an object's kind and size from its first bytes only, so a file of any size is never read whole to be listed ----------
def _disk_varint(b, i):
    c = b[i]
    i += 1
    kind, size, shift = (c >> 4) & 7, c & 15, 4
    while c & 0x80:
        c = b[i]
        i += 1
        size |= (c & 0x7f) << shift
        shift += 7
    return kind, size, i


def _disk_inflate_start(fh, want):
    import zlib
    d, out = zlib.decompressobj(), b""
    while len(out) < want and not d.eof:
        chunk = d.unconsumed_tail or fh.read(512)
        if not chunk:
            break
        out += d.decompress(chunk, want - len(out))
    return out


def _disk_pack_head(fh, off, store, kind_too, depth, fhs):
    fh.seek(off)
    head = fh.read(64)
    kind, size, i = _disk_varint(head, 0)
    if kind in (1, 2, 3, 4):
        return kind, size
    if kind == 6:  # kept as a change against an object further back in the same pack
        c = head[i]
        i += 1
        ofs = c & 0x7f
        while c & 0x80:
            c = head[i]
            i += 1
            ofs = ((ofs + 1) << 7) | (c & 0x7f)
        base = ("ofs", off - ofs)
    elif kind == 7:  # kept as a change against an object named in full
        base = ("ref", head[i:i + 20].hex())
        i += 20
    else:
        return None
    fh.seek(off + i)
    d = _disk_inflate_start(fh, 24)
    j, n = 0, 0
    for _ in range(2):  # the size of the object it is kept against, then its own
        n, shift = 0, 0
        while True:
            c = d[j]
            j += 1
            n |= (c & 0x7f) << shift
            shift += 7
            if not c & 0x80:
                break
    if not kind_too:
        return None, n
    if depth > 300:
        return None
    got = _disk_pack_head(fh, base[1], store, True, depth + 1, fhs) if base[0] == "ofs" else _disk_ohead(store, base[1], True, depth + 1, fhs)
    return (got[0], n) if got else None


def _disk_ohead(store, oid, kind_too=False, depth=0, fhs=None):
    """(kind, size) of an object, reading only its header: in a pack (for one kept as a change, the size the change gives,
    and the kind of the object it is kept against), or a loose object's first bytes. None when it cannot be told."""
    own = fhs is None
    fhs = {} if own else fhs
    try:
        for pack in list(getattr(store, "packs", None) or []):
            try:
                off = pack.index.object_offset(oid.encode())
            except KeyError:
                continue
            path = getattr(pack, "_data_path", None) or (getattr(pack, "_basename", "") + ".pack")
            fh = fhs.get(path)
            if fh is None:
                fh = fhs[path] = open(path, "rb")
            return _disk_pack_head(fh, off, store, kind_too, depth, fhs)
        base = getattr(store, "path", None)
        if base:
            p = os.path.join(base, oid[:2], oid[2:])
            if os.path.isfile(p):
                with open(p, "rb") as fh:
                    h = _disk_inflate_start(fh, 48)
                z = h.find(b"\0")
                if z > 0 and b" " in h[:z]:
                    t, n = h[:z].split(b" ", 1)
                    return {b"commit": 1, b"tree": 2, b"blob": 3, b"tag": 4}.get(t), int(n)
                return None
        if depth < 300:
            for alt in list(getattr(store, "alternates", None) or []):
                got = _disk_ohead(alt, oid, kind_too, depth + 1, fhs)
                if got:
                    return got
        return None
    finally:
        if own:
            for fh in fhs.values():
                try:
                    fh.close()
                except Exception:
                    pass


def _disk_sizes(store, oids, seconds):
    """the sizes of many objects by their headers, within a time; those not reached stay unknown until the next look"""
    sz, out, t0, fhs = _DISK["sz"], {}, time.time(), {}
    try:
        for o in oids:
            if o in sz:
                out[o] = sz[o]
                continue
            if time.time() - t0 > seconds:
                break
            try:
                got = _disk_ohead(store, o, False, 0, fhs)
            except Exception:
                got = None
            if got:
                sz[o] = out[o] = got[1]
    finally:
        for fh in fhs.values():
            try:
                fh.close()
            except Exception:
                pass
    if len(sz) > 1500000:
        sz.clear()
    return out


def _disk_sizes_of(rid, oids):
    """the sizes of objects in one repository on the drive, by their headers (a version's files, for the list of them)"""
    with _DISK["lock"]:
        try:
            repo, _ = _disk_open(rid)
        except Exception as e:
            _disk_drop(rid)
            return {"ok": False, "error": str(e.args[0] if isinstance(e, KeyError) and e.args else e)}
        want = [str(o) for o in list(oids or [])[:200000] if re.match(r"^[0-9a-f]{40}$", str(o or ""))]
        return {"ok": True, "sizes": _disk_sizes(repo.object_store, want, 6.0)}


def _disk_list():
    out = []
    with _DISK["lock"]:
        for rid, k in sorted(_disk_known().items(), key=lambda x: x[1]["name"].lower()):
            item = {"id": rid, "name": k["name"], "path": k["path"], "brought": k.get("brought", False), "full": k.get("full", ""),
                    "icon": k.get("icon", ""), "desc": k.get("desc", ""), "drive": _disk_drive(k["path"]), "present": k.get("present", True)}
            if not item["present"]:
                _disk_drop(rid)
                item.update({"ok": False, "error": "Its drive is not connected now."})
                out.append(item)
                continue
            try:
                repo, _ = _disk_open(rid)
                refs, head = _disk_refs(repo)
                tip = refs.get(head["ref"]) if head.get("ref") else head.get("oid")
                got = _DISK["work"].get((rid, tip))
                gd = repo.controldir()
                marks = []
                for x in ("HEAD", "refs", "packed-refs"):
                    try:
                        marks.append(os.path.getmtime(os.path.join(gd, x)))
                    except OSError:
                        pass
                try:
                    free = shutil.disk_usage(k["path"]).free
                except Exception:
                    free = None
                item.update({"ok": True, "bare": bool(repo.bare), "head": head, "refs": refs, "fileCount": len(got) if got is not None else None,
                             "size": _disk_size(gd), "free": free, "changed": int(max(marks) * 1000) if marks else 0})
            except Exception as e:
                _disk_drop(rid)
                item.update({"ok": False, "error": "It could not be read: %s" % e})
            out.append(item)
    return {"ok": True, "repos": out}


def _disk_add(path):
    from dulwich.repo import Repo, NotGitRepository
    path = str(path or "").strip()
    if not path or not os.path.isdir(path):
        return {"ok": False, "error": "That folder is not here."}
    try:
        repo = Repo.discover(path)
    except NotGitRepository:
        return {"ok": False, "error": "That folder holds no git repository: choose the folder that holds .git, or a bare repository."}
    except Exception as e:
        return {"ok": False, "error": "That repository could not be opened: %s" % e}
    try:
        top = os.path.realpath(repo.controldir() if repo.bare else os.path.dirname(os.path.realpath(repo.controldir())))
        if not repo.bare and os.path.basename(os.path.realpath(repo.controldir())) != ".git":
            top = os.path.realpath(path)
        bare = bool(repo.bare)
    finally:
        try:
            repo.close()
        except Exception:
            pass
    rid = _disk_id(top)
    with _DISK["lock"]:
        if rid in _disk_known():
            return {"ok": True, "id": rid, "already": True}
        reg = _disk_reg()
        nm = os.path.basename(top.rstrip("/\\")) or "repository"
        if bare and nm.endswith(".git"):
            nm = nm[:-4]
        reg["repos"].append({"id": rid, "path": top, "name": nm, "added": int(time.time() * 1000)})
        _disk_reg_save(reg)
        _disk_drop(rid)
    return {"ok": True, "id": rid}


def _disk_choose(win):
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
        return _disk_add(str(got[0]))
    except Exception:
        log_problem("disk: the folder dialog failed", sys.exc_info())
        return {"ok": False, "error": "The folder dialog could not be opened."}


def _disk_forget(rid):
    with _DISK["lock"]:
        reg = _disk_reg()
        keep = [x for x in reg["repos"] if x.get("id") != rid]
        if len(keep) == len(reg["repos"]):
            k = _disk_known().get(rid)
            if k and k.get("brought"):
                return {"ok": False, "error": "This one was brought from GitHub: Fabrica lists it while it is in the folder that holds what came from GitHub."}
            return {"ok": False, "error": "Fabrica does not know that repository."}
        reg["repos"] = keep
        _disk_reg_save(reg)
        _disk_drop(rid)
    return {"ok": True}


def _disk_repo(rid):
    from dulwich.object_store import iter_tree_contents
    with _DISK["lock"]:
        try:
            repo, k = _disk_open(rid)
            refs, head = _disk_refs(repo)
            tip = refs.get(head["ref"]) if head.get("ref") else head.get("oid")
            work = {}
            if tip:
                got = _DISK["work"].get((rid, tip))
                if got is None:
                    o = repo.get_object(tip.encode())
                    while o.type_name == b"tag":
                        o = repo.get_object(o.object[1])
                    got = {}
                    if o.type_name == b"commit":
                        for e in iter_tree_contents(repo.object_store, o.tree):
                            mode = "%o" % e.mode
                            if mode == "160000":  # another repository inside this one (a submodule): named, not held
                                continue
                            if mode == "100664":
                                mode = "100644"
                            got[_disk_text(e.path)] = [mode, _disk_text(e.sha)]
                    if len(_DISK["work"]) > 24:
                        _DISK["work"].clear()
                    _DISK["work"][(rid, tip)] = got
                work = got
            sizes = _disk_sizes(repo.object_store, sorted(set(v[1] for v in work.values())), 4.0)
            gd = repo.controldir()
            marks = []
            for x in ("HEAD", "refs", "packed-refs"):
                try:
                    marks.append(os.path.getmtime(os.path.join(gd, x)))
                except OSError:
                    pass
            changed = int(max(marks) * 1000) if marks else 0
            try:
                created = int(os.path.getctime(gd) * 1000)
            except OSError:
                created = changed
            try:
                free = shutil.disk_usage(k["path"]).free
            except Exception:
                free = None
            rec = {"id": rid, "name": k["name"], "slug": re.sub(r"[^A-Za-z0-9._-]+", "-", k["name"]).strip("-.")[:60] or "repository", "app": None,
                   "desc": k.get("desc", ""), "created": created, "changed": changed, "head": head, "refs": refs, "work": work, "sizes": sizes,
                   "log": [], "merging": None, "fileCount": len(work),
                   "disk": {"path": k["path"], "drive": _disk_drive(k["path"]), "size": _disk_size(gd), "free": free, "brought": k.get("brought", False),
                            "full": k.get("full", ""), "icon": k.get("icon", ""), "bare": bool(repo.bare),
                            "sized": len(sizes) == len(set(v[1] for v in work.values()))}}
            return {"ok": True, "rec": rec}
        except KeyError as e:
            _disk_drop(rid)
            return {"ok": False, "error": str(e.args[0] if e.args else e)}
        except Exception as e:
            _disk_drop(rid)
            log_problem("disk: a repository could not be read", sys.exc_info())
            return {"ok": False, "error": "It could not be read: %s" % e}


def _disk_links(kind, raw):
    """what a commit or a tree names for the next look: a commit's parents; a tree's own folders"""
    out = []
    if kind == 1:
        for line in raw.split(b"\n\n", 1)[0].split(b"\n"):
            if line.startswith(b"parent "):
                out.append(_disk_text(line[7:47]))
    elif kind == 2:
        i, n = 0, len(raw)
        while i < n:
            sp = raw.index(b" ", i)
            z = raw.index(b"\0", sp)
            if raw[i:sp] in (b"40000", b"040000"):
                out.append(raw[z + 1:z + 21].hex())
            i = z + 21
    return out


def _disk_objs(rid, oids, more=0):
    """objects by their git names, as {t, n, b64}; one larger than a part as {t, n, part} (read with disk_part); one larger than
    48 MB as {t, n, big}, kept whole on the drive. An object not in this repository is null; one left out (the reply was full)
    is missing from the answer, to be asked again. more: for a commit, as many of the commits before it as that; for a tree,
    its folders, so a history or a whole tree comes in a few answers"""
    with _DISK["lock"]:
        try:
            repo, _ = _disk_open(rid)
        except Exception as e:
            _disk_drop(rid)
            return {"ok": False, "error": str(e.args[0] if isinstance(e, KeyError) and e.args else e)}
        store, out, left, fhs = repo.object_store, {}, _DISK_PART, {}
        try:
            def one(o):
                head = None
                try:
                    head = _disk_ohead(store, o, False, 0, fhs)
                except Exception:
                    head = None
                if head and head[1] > _DISK_PART:
                    full = _disk_ohead(store, o, True, 0, fhs)
                    t = _DISK_KIND.get(full[0]) if full else None
                    return {"t": t or "blob", "n": head[1], ("big" if head[1] > _DISK_BIG else "part"): True}, 0, None, None
                try:
                    kind, raw = store.get_raw(o.encode())
                except KeyError:
                    return None, 0, None, None
                t = _DISK_KIND.get(kind)
                if not t:
                    return None, 0, None, None
                return {"t": t, "n": len(raw), "b64": base64.b64encode(raw).decode("ascii")}, len(raw), kind, raw
            asked = [str(o or "") for o in list(oids or [])[:4096]]
            nexts = []
            for o in asked:
                if not re.match(r"^[0-9a-f]{40}$", o):
                    out[o] = None
                    continue
                if o in out:
                    continue
                got, n, kind, raw = one(o)
                if n > left and len(out):
                    break
                left -= n
                out[o] = got
                if got and more and kind in (1, 2):
                    nexts.extend((kind, x) for x in _disk_links(kind, raw))
            extra, count, limit = {}, 0, max(0, min(int(more or 0), 2000))
            room = min(left, 4 * 1048576)
            while nexts and count < limit and room > 0:
                kind, o = nexts.pop(0)
                if o in out or o in extra:
                    continue
                got, n, k2, raw = one(o)
                if not got or "b64" not in got or n > room:
                    continue
                room -= n
                count += 1
                extra[o] = got
                if k2 in (1, 2):
                    nexts.extend((k2, x) for x in _disk_links(k2, raw))
            return {"ok": True, "objs": out, "more": extra}
        finally:
            for fh in fhs.values():
                try:
                    fh.close()
                except Exception:
                    pass


def _disk_part(rid, oid, off, n):
    """a part of one object larger than a part: n bytes from off, as b64"""
    with _DISK["lock"]:
        try:
            repo, _ = _disk_open(rid)
            o = str(oid or "")
            last = _DISK["last"]
            if not last or last[0] != (rid, o):
                head = _disk_ohead(repo.object_store, o)
                if head and head[1] > _DISK_BIG:
                    return {"ok": False, "error": "That file is kept whole on the drive."}
                kind, raw = repo.object_store.get_raw(o.encode())
                last = _DISK["last"] = ((rid, o), raw)
            off, n = max(0, int(off or 0)), max(0, min(int(n or 0), _DISK_PART))
            return {"ok": True, "n": len(last[1]), "b64": base64.b64encode(last[1][off:off + n]).decode("ascii")}
        except KeyError:
            return {"ok": False, "error": "That object is not in this repository."}
        except Exception as e:
            _disk_drop(rid)
            return {"ok": False, "error": "It could not be read: %s" % e}


'''

rep('''def _start_local_server(directory, html_name=None):''', FN + '''def _start_local_server(directory, html_name=None):''')

rep('''    def model_places(self):
        return _model_places()
''', '''    def model_places(self):
        return _model_places()

    # 6.86: Fabrica reads the repositories on this computer straight from the drive (app_disk_686.py)
    def disk_list(self):
        return _disk_list()

    def disk_add(self, path):
        return _disk_add(path)

    def disk_choose(self):
        return _disk_choose(getattr(self, "_main_window", None))

    def disk_forget(self, rid):
        return _disk_forget(rid)

    def disk_repo(self, rid):
        return _disk_repo(rid)

    def disk_objs(self, rid, oids, more=0):
        return _disk_objs(rid, oids, more)

    def disk_part(self, rid, oid, off, n):
        return _disk_part(rid, oid, off, n)

    def disk_sizes(self, rid, oids):
        return _disk_sizes_of(rid, oids)
''', 2)
for need in ("hashlib", "base64", "re", "time", "threading", "json", "shutil"):
    if "\nimport %s\n" % need not in s:
        sys.exit("%s: it no longer imports %s" % (p, need))
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
