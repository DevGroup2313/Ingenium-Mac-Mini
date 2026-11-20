"""Ingenium 7.57 (20 November 2026): Fabrica's plan, stage 3, part two, on a drive. A version brought in from another idea (git cherry-pick)
and changes put aside (git stash), in a repository on her drive, made as git 2.43 makes them, so that git and any other program see the same.

7.53 (modules/r342.js, the engine in modules/r110.js) did both on repositories kept in Ingenium. On a drive the page works the pick out (its
three-way merge, in r110, read through r280) and the computer app writes it into the folder:
  disk_pick(id, payload, name, email)
                             payload: {ours, pick, msg, files: {path: null (taken away) | {oid, mode, b64?}}, conflicts: [paths]}.
                             Refused when the folder moved on since Fabrica read it, when anything in it waits to be kept, when a merge or
                             a pick is under way, when the version is not in the repository or joined two ideas, or when a file made in
                             the page does not match its git name (nothing written, each time). With no line changed both ways, the
                             version is made at once, as git cherry-pick -x makes it: the files staged, one parent, the version's words
                             with git's own last line "(cherry picked from commit <id>)", its author and the author's time kept, she its
                             committer. With lines changed both ways, the pick is left in the folder as git leaves one: the files written
                             (both versions between git's marks), git's CHERRY_PICK_HEAD (the version brought in) and MERGE_MSG (its words,
                             then "# Conflicts:" and a line for each file), git's index marking each such file with its three versions
                             (the version's parent's, this idea's, the version's), and Fabrica's note (.git/ingenium-merge.json, kind
                             "pick"). No ORIG_HEAD, as git 2.43 writes none for a pick.
  disk_commit(...)           while a pick is under way: refused while a file holds both versions (as for a merge, app_merge_692.py); the
                             version made has one parent, the picked version's author and the author's time, as git cherry-pick
                             --continue; then git's pick files and Fabrica's note are taken away.
  disk_merge_stop(id)        a pick under way is stopped as git cherry-pick --abort: the files put back (what they held first saved aside,
                             as for a merge), the pick's files and Fabrica's note taken away.
  disk_repo(id)              the record says a pick under way: {kind: "pick", pick, label, msg, conflicts, left, git}; a pick git itself
                             left (CHERRY_PICK_HEAD without Fabrica's note) is said from MERGE_MSG, its files found by their marks.
Changes put aside, as git stash push --include-untracked writes them (dulwich 0.22.8's own stash_push does not: its words are "A stash on
<id>", its log says "commit:", and it leaves the files as they were; checked in the session):
  disk_stash_push(id, words, name, email)
                             I, the index as it is ("index on <idea>: <short id> <title>"); U, the new files git does not know yet
                             ("untracked files on <idea>: <short id> <title>", no parent), when there are any; W, the known files as they
                             are (parents: the version out, I, then U), "WIP on <idea>: <short id> <title>" or "On <idea>: <words>", with
                             no last newline, as git; refs/stash moved to W and a line added to its log, as git's; then the files and
                             the index put back as the version out holds them, and the new files taken away (they are in U).
  disk_stash_list(id)        refs/stash's log, newest first: {n, oid, msg, branch, at, files}, what git stash list shows.
  disk_stash_apply(id, n, payload, drop)
                             payload {w, ours, files, conflicts}: the page merged the changes put aside (W's files and U's, from W's first
                             parent) three ways onto the version out; written as git stash apply leaves them (not staged; a file changed
                             both ways holds both versions, marked in git's index). Refused when the folder moved on, when anything waits,
                             or when entry n is no longer the one the page read. With drop and nothing changed both ways, the entry goes
                             (git stash pop); with both ways, it stays, as git keeps it.
  disk_stash_drop(id, n)     the entry taken out of refs/stash's log; refs/stash names the newest left, or goes with its log when none is.
Every call was checked in dulwich 0.22.8 and tested against git 2.43 (rig/t_757_drive_pick.py).

    python3 build/desktop/app_pick_757.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_disk_pick_757" in s:
    print("already patched", p)
    sys.exit(0)
if "_disk_merge_begin" not in s:
    sys.exit("%s: app_merge_692.py must come first" % p)

FN = r'''# ---- 7.57 (Fabrica, stage 3, part two, on a drive): a version brought in from another idea, and changes put aside (app_pick_757.py) ----
_disk_pick_757 = True


def _disk_pick_head(repo):
    return os.path.join(repo.controldir(), "CHERRY_PICK_HEAD")


def _disk_note_of(repo):
    try:
        with open(_disk_merge_files(repo)["note"], encoding="utf-8") as fh:
            n = json.load(fh)
        return n if isinstance(n, dict) else {}
    except (OSError, ValueError):
        return {}


def _disk_pick_under_way(repo, changed=None):
    """a version being brought in from another idea: git's CHERRY_PICK_HEAD (Fabrica's note says kind "pick"); None when there is none"""
    ph = None
    try:
        with open(_disk_pick_head(repo), "rb") as fh:
            ph = fh.read().strip().decode("ascii") or None
    except (OSError, UnicodeDecodeError):
        ph = None
    note = _disk_note_of(repo)
    if note.get("kind") != "pick":
        note = {}
    if not ph:
        if note:
            # ended or stopped elsewhere (git cherry-pick --continue or --abort): Fabrica's note goes with it
            try:
                os.unlink(_disk_merge_files(repo)["note"])
            except OSError:
                pass
        return None
    words = ""
    try:
        with open(_disk_merge_files(repo)["msg"], "rb") as fh:
            words = fh.read().decode("utf-8", "replace")
    except OSError:
        words = ""
    words = "\n".join(x for x in words.replace("\r\n", "\n").split("\n") if not x.startswith("#")).strip()
    if note:
        conflicts = [str(x) for x in (note.get("conflicts") or [])]
        label = str(note.get("label") or "a version")
    else:
        label = "%s (%s)" % ((words.split("\n")[0][:80] or "a version"), ph[:7])
        conflicts = sorted(x for x in (changed or []) if _disk_holds_both(repo, x))
    left = [x for x in conflicts if _disk_holds_both(repo, x)]
    return {"theirs": None, "pick": ph, "kind": "pick", "label": label, "squash": False, "conflicts": conflicts, "left": left,
            "git": not note, "msg": words or str(note.get("msg") or "")}


def _disk_pick_author(repo, mg):
    """the picked version's author and the author's time, for the version that ends a pick (git cherry-pick --continue keeps them)"""
    if not mg or mg.get("kind") != "pick" or not mg.get("pick"):
        return {}
    try:
        c = repo[str(mg["pick"]).encode("ascii")]
        return {"author": c.author, "author_timestamp": c.author_time, "author_timezone": c.author_timezone}
    except Exception:
        return {}


def _disk_plan(repo, files):
    """the files a pick or a return writes: [(path, bytes or None, mode)], each checked against its git name; ValueError, nothing written"""
    from dulwich.objects import Blob
    plan = []
    for path in sorted(files or {}):
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
                raise ValueError("%s did not arrive whole: nothing was written." % rel)
        else:
            try:
                o = repo.object_store[oid.encode("ascii")]
            except (KeyError, UnicodeEncodeError):
                raise ValueError("%s's version is not in the repository: nothing was written." % rel)
            if o.type_name != b"blob":
                raise ValueError("%s is not a file in the repository: nothing was written." % rel)
            data = o.as_raw_string()
        plan.append((rel, data, mode))
    return plan


def _disk_plan_write(repo, plan):
    for rel, data, mode in plan:
        fs = _disk_fs(repo, rel)
        if data is None:
            if os.path.lexists(fs) and not os.path.isdir(fs):
                os.unlink(fs)
                _disk_prune_dirs(repo, rel)
            continue
        _disk_put_blob(repo, rel, data, mode)


def _disk_prune_dirs(repo, rel):
    """the folders a file taken away leaves empty, taken away too, as git does"""
    parts = rel.split("/")[:-1]
    while parts:
        d = os.path.join(repo.path, *parts)
        try:
            os.rmdir(d)
        except OSError:
            return
        parts.pop()


def _disk_entry(repo, tree, rel):
    from dulwich.index import IndexEntry
    from dulwich.object_store import tree_lookup_path
    if not tree:
        return None
    try:
        mode, sha = tree_lookup_path(repo.object_store.__getitem__, tree, rel.encode("utf-8"))
    except KeyError:
        return None
    return IndexEntry(ctime=(0, 0), mtime=(0, 0), dev=0, ino=0, mode=mode, uid=0, gid=0, size=0, sha=sha)


def _disk_mark_index(repo, base_tree, this_tree, other_trees, conflicts):
    """each file changed both ways marked in git's index with its three versions (common, this idea's, the other side's)"""
    from dulwich.index import ConflictedIndexEntry
    if not conflicts:
        return
    idx = repo.open_index()
    for rel in sorted(conflicts):
        other = None
        for t in other_trees:
            other = _disk_entry(repo, t, rel)
            if other is not None:
                break
        e = ConflictedIndexEntry(ancestor=_disk_entry(repo, base_tree, rel), this=_disk_entry(repo, this_tree, rel), other=other)
        if e.this is None and e.other is None:
            continue
        idx[rel.encode("utf-8")] = e
    idx.write()


def _disk_pick(rid, payload, name=None, email=None):
    payload = payload or {}
    with _DISK["lock"]:
        try:
            repo, k = _disk_open(rid)
            if repo.bare:
                return {"ok": False, "error": "%s has no folder of files: make a working copy of it (Make a working copy, under its name), and bring the version in there." % k["name"]}
            if _disk_merge_under_way(repo):
                return {"ok": False, "error": "A merge, or a version being brought in, is under way in its folder: keep the version, or stop it, first."}
            tip, head = _disk_head_tip(repo)
            if not head.get("ref"):
                return {"ok": False, "error": "Its folder shows an older version: go back to an idea first."}
            tipt = _disk_text(tip or b"")
            if tipt != str(payload.get("ours") or ""):
                return {"ok": False, "error": "Its folder moved on since Fabrica read it: look again, then bring the version in."}
            work, changes, _, _ = _disk_status(rid, repo)
            if changes:
                return {"ok": False, "error": "Keep or put aside the changes in its folder first: a version comes in onto files with nothing waiting."}
            pick = str(payload.get("pick") or "")
            if not re.match(r"^[0-9a-f]{40}$", pick) or pick.encode("ascii") not in repo.object_store:
                return {"ok": False, "error": "That version is not in the repository."}
            pc = repo[pick.encode("ascii")]
            if len(pc.parents) > 1:
                return {"ok": False, "error": "A version that joined two ideas cannot be brought in by itself."}
            msg = str(payload.get("msg") or "").replace("\r\n", "\n").strip()
            if not msg:
                return {"ok": False, "error": "The version's words did not arrive: nothing was written."}
            plan = _disk_plan(repo, payload.get("files") or {})
            conflicts = sorted(set(_disk_rel(x) for x in (payload.get("conflicts") or [])))
            if conflicts:
                # git's pick files and Fabrica's note first: a write that fails part way leaves a pick under way, which Stop puts back
                f = _disk_merge_files(repo)
                note = {"v": 1, "kind": "pick", "label": "%s (%s)" % (msg.split("\n")[0][:80], pick[:7]), "pick": pick, "ours": tipt,
                        "conflicts": conflicts, "files": [x[0] for x in plan], "msg": msg, "at": int(time.time())}
                with open(f["note"], "w", encoding="utf-8") as fh:
                    json.dump(note, fh)
                with open(f["msg"], "wb") as fh:
                    fh.write((msg + "\n\n# Conflicts:\n" + "".join("#\t%s\n" % c for c in conflicts)).encode("utf-8"))
                with open(_disk_pick_head(repo), "wb") as fh:
                    fh.write(pick.encode("ascii") + b"\n")
            _disk_plan_write(repo, plan)
            cs = set(conflicts)
            repo.stage([rel for rel, data, mode in plan if rel not in cs])
            if conflicts:
                base = repo[pc.parents[0]].tree if pc.parents else None
                _disk_mark_index(repo, base, repo[tipt.encode("ascii")].tree, [pc.tree], conflicts)
                _DISK_W["st"].pop(rid, None)
                return {"ok": True, "conflicts": conflicts, "files": len(plan)}
            ident = _disk_ident(repo, name, email)
            try:
                c = repo.do_commit(msg.encode("utf-8") + b"\n", committer=ident, author=pc.author,
                                   author_timestamp=pc.author_time, author_timezone=pc.author_timezone)
            except Exception as e:
                if "hook" in type(e).__name__.lower() or "hook" in str(e).lower():
                    return {"ok": False, "error": "The repository's own check before a commit stopped it: %s" % e}
                raise
            _DISK["size"].pop(os.path.realpath(repo.controldir()), None)
            _DISK_W["st"].pop(rid, None)
            return {"ok": True, "commit": _disk_text(c), "conflicts": [], "files": len(plan)}
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        except Exception as e:
            log_problem("disk: a version could not be brought in", sys.exc_info())
            return {"ok": False, "error": "The version could not be brought in: %s" % e}


# ---- changes put aside, as git stash push --include-untracked ----
def _disk_stash_log(repo):
    return os.path.join(repo.controldir(), "logs", "refs", "stash")


def _disk_stash_entries(repo):
    """git stash list: refs/stash's log, newest first"""
    try:
        with open(_disk_stash_log(repo), "rb") as fh:
            lines = [x for x in fh.read().decode("utf-8", "replace").split("\n") if x.strip()]
    except OSError:
        lines = []
    out = []
    for i, line in enumerate(lines):
        left, _, msg = line.partition("\t")
        parts = left.split(" ")
        if len(parts) < 2 or not re.match(r"^[0-9a-f]{40}$", parts[1]):
            continue
        m = re.search(r"> (\d+) [+-]\d{4}$", left)
        b = re.match(r"^(?:WIP on|On) ([^:]+):", msg)
        out.append({"oid": parts[1], "msg": msg, "at": int(m.group(1)) * 1000 if m else 0, "branch": b.group(1) if b else "", "i": i})
    out.reverse()
    for n, e in enumerate(out):
        e["n"] = n
    return out, lines


def _disk_stash_files(repo, oid):
    """the files an entry put aside: W's change from the version it was put aside on, and U's new files"""
    try:
        w = repo[oid.encode("ascii")]
        names = set()
        base = repo[w.parents[0]].tree if w.parents else None
        for ch in repo.object_store.tree_changes(base, w.tree):
            nm = ch[0][1] or ch[0][0]
            if nm:
                names.add(_disk_text(nm))
        if len(w.parents) > 2:
            from dulwich.object_store import iter_tree_contents
            for e in iter_tree_contents(repo.object_store, repo[w.parents[2]].tree):
                names.add(_disk_text(e.path))
        return sorted(names)[:200]
    except Exception:
        return []


def _disk_tz():
    try:
        return int(time.localtime().tm_gmtoff)
    except Exception:
        return 0


def _disk_tzs(tz):
    sg = "-" if tz < 0 else "+"
    tz = abs(int(tz)) // 60
    return "%s%02d%02d" % (sg, tz // 60, tz % 60)


def _disk_new_commit(repo, tree, parents, ident, when, tz, msg):
    from dulwich.objects import Commit
    c = Commit()
    c.tree = tree
    c.parents = list(parents)
    c.author = c.committer = ident
    c.author_time = c.commit_time = when
    c.author_timezone = c.commit_timezone = tz
    c.message = msg.encode("utf-8")
    repo.object_store.add_object(c)
    return c.id


def _disk_stash_set(repo, new, old, ident, when, tz, msg):
    """refs/stash moved to new, and its log given git's line (the old, the new, who and when, a tab, the words)"""
    repo.refs.set_if_equals(b"refs/stash", None, new)
    lp = _disk_stash_log(repo)
    os.makedirs(os.path.dirname(lp), exist_ok=True)
    line = "%s %s %s %d %s\t%s\n" % (_disk_text(old) if old else "0" * 40, _disk_text(new), _disk_text(ident), when, _disk_tzs(tz), msg)
    with open(lp, "ab") as fh:
        fh.write(line.encode("utf-8"))


def _disk_stash_push(rid, words=None, name=None, email=None):
    from dulwich.objects import Blob
    from dulwich.index import blob_from_path_and_stat, cleanup_mode, commit_tree, ConflictedIndexEntry
    with _DISK["lock"]:
        try:
            repo, k = _disk_wt(rid)
            if _disk_merge_under_way(repo):
                return {"ok": False, "error": "Finish or stop the merge, or the version being brought in, first."}
            tip, head = _disk_head_tip(repo)
            if not tip:
                return {"ok": False, "error": "Keep a first version before putting changes aside."}
            tipt = _disk_text(tip)
            tipb = tipt.encode("ascii")
            st = _disk_status_of(repo)
            links = _disk_gitlinks(repo)
            staged = set()
            for kk in ("add", "delete", "modify"):
                staged |= set(_disk_text(x) for x in st.staged.get(kk, []))
            staged -= links
            unstaged = set(_disk_text(x) for x in st.unstaged) - links
            untracked = set(_disk_text(x) for x in st.untracked) - links
            if not (staged or unstaged or untracked):
                return {"ok": False, "error": "Nothing waits to be kept, so there is nothing to put aside."}
            idx = repo.open_index()
            if any(isinstance(v, ConflictedIndexEntry) for _, v in idx.items()):
                return {"ok": False, "error": "A file still holds both versions of a merge: keep one of each first."}
            hc = repo[tipb]
            ref = head.get("ref") or ""
            br = ref[len("refs/heads/"):] if ref.startswith("refs/heads/") else "(no branch)"
            title = hc.message.decode("utf-8", "replace").split("\n")[0]
            short = tipt[:7]
            ident = _disk_ident(repo, name, email)
            when, tz = int(time.time()), _disk_tz()
            norm = None
            try:
                norm = repo.get_blob_normalizer()
            except Exception:
                norm = None

            def blob_of(rel):
                fs = _disk_fs(repo, rel)
                stv = os.lstat(fs)
                b = blob_from_path_and_stat(os.fsencode(fs), stv)
                if norm is not None:
                    try:
                        b = norm.checkin_normalize(b, rel.encode("utf-8"))
                    except Exception:
                        pass
                repo.object_store.add_object(b)
                return b.id, cleanup_mode(stv.st_mode)

            # I: the index as it is
            ient = {}
            for path, e in idx.items():
                ient[path] = (e.sha, e.mode)
            itree = commit_tree(repo.object_store, [(pth, sha, mode) for pth, (sha, mode) in sorted(ient.items())])
            io = _disk_new_commit(repo, itree, [tipb], ident, when, tz, "index on %s: %s %s\n" % (br, short, title))
            # W: the files git knows, as they are in the folder
            went = dict(ient)
            for rel in sorted(unstaged | staged):
                pb = rel.encode("utf-8")
                if pb not in went:
                    continue
                fs = _disk_fs(repo, rel)
                if os.path.lexists(fs) and not os.path.isdir(fs):
                    went[pb] = blob_of(rel)
                else:
                    went.pop(pb, None)
            wtree = commit_tree(repo.object_store, [(pth, sha, mode) for pth, (sha, mode) in sorted(went.items())])
            parents = [tipb, io]
            # U: the new files git does not know yet
            if untracked:
                uent = {}
                for rel in sorted(untracked):
                    fs = _disk_fs(repo, rel)
                    if os.path.lexists(fs) and not os.path.isdir(fs):
                        uent[rel.encode("utf-8")] = blob_of(rel)
                if uent:
                    utree = commit_tree(repo.object_store, [(pth, sha, mode) for pth, (sha, mode) in sorted(uent.items())])
                    parents.append(_disk_new_commit(repo, utree, [], ident, when, tz, "untracked files on %s: %s %s\n" % (br, short, title)))
            w = " ".join(str(words or "").split()).strip()[:200]
            wmsg = ("On %s: %s" % (br, w)) if w else ("WIP on %s: %s %s" % (br, short, title))
            wo = _disk_new_commit(repo, wtree, parents, ident, when, tz, wmsg)
            try:
                old = repo.refs[b"refs/stash"]
            except KeyError:
                old = None
            _disk_stash_set(repo, wo, old, ident, when, tz, wmsg)
            # the files and the index back as the version out holds them; the new files taken away (they are in U)
            hm = _disk_tree_map(rid, repo, tipt)
            back = sorted(staged | unstaged)
            for rel in back:
                fs = _disk_fs(repo, rel)
                if rel in hm:
                    o = repo.object_store[hm[rel][1].encode("ascii")]
                    _disk_put_blob(repo, rel, o.as_raw_string(), hm[rel][0])
                elif os.path.lexists(fs) and not os.path.isdir(fs):
                    os.unlink(fs)
                    _disk_prune_dirs(repo, rel)
            for rel in sorted(untracked):
                fs = _disk_fs(repo, rel)
                if os.path.lexists(fs) and not os.path.isdir(fs):
                    os.unlink(fs)
                    _disk_prune_dirs(repo, rel)
            idx = repo.open_index()
            for rel in back:
                b = rel.encode("utf-8")
                if rel not in hm and b in idx:
                    del idx[b]
            idx.write()
            repo.stage([rel for rel in back if rel in hm])
            _DISK_W["st"].pop(rid, None)
            return {"ok": True, "oid": _disk_text(wo), "msg": wmsg, "files": len(set(back) | untracked)}
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        except Exception as e:
            log_problem("disk: changes could not be put aside", sys.exc_info())
            return {"ok": False, "error": "The changes could not be put aside: %s" % e}


def _disk_stash_list(rid):
    with _DISK["lock"]:
        try:
            repo, k = _disk_open(rid)
            ents, _ = _disk_stash_entries(repo)
            out = []
            for e in ents[:60]:
                out.append({"n": e["n"], "oid": e["oid"], "msg": e["msg"], "branch": e["branch"], "at": e["at"], "files": _disk_stash_files(repo, e["oid"])})
            return {"ok": True, "list": out}
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        except Exception as e:
            log_problem("disk: the changes put aside could not be read", sys.exc_info())
            return {"ok": False, "error": "The changes put aside could not be read: %s" % e}


def _disk_stash_drop_n(repo, n):
    ents, lines = _disk_stash_entries(repo)
    if n < 0 or n >= len(ents):
        raise ValueError("Nothing is put aside under that number.")
    e = ents[n]
    keep = [x for i, x in enumerate(lines) if i != e["i"]]
    lp = _disk_stash_log(repo)
    if keep:
        with open(lp, "wb") as fh:
            fh.write(("\n".join(keep) + "\n").encode("utf-8"))
        top = keep[-1].partition("\t")[0].split(" ")[1]
        repo.refs.set_if_equals(b"refs/stash", None, top.encode("ascii"))
    else:
        try:
            repo.refs.remove_if_equals(b"refs/stash", None)
        except Exception:
            pass
        for f in (lp, os.path.join(repo.controldir(), "refs", "stash")):
            try:
                os.unlink(f)
            except OSError:
                pass
    return e


def _disk_stash_drop(rid, n):
    with _DISK["lock"]:
        try:
            repo, k = _disk_open(rid)
            e = _disk_stash_drop_n(repo, int(n or 0))
            return {"ok": True, "dropped": e["msg"]}
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        except Exception as e:
            log_problem("disk: changes put aside could not be dropped", sys.exc_info())
            return {"ok": False, "error": "They could not be dropped: %s" % e}


def _disk_stash_apply(rid, n, payload, drop=False):
    payload = payload or {}
    with _DISK["lock"]:
        try:
            repo, k = _disk_wt(rid)
            if _disk_merge_under_way(repo):
                return {"ok": False, "error": "Finish or stop the merge, or the version being brought in, first."}
            n = int(n or 0)
            ents, _ = _disk_stash_entries(repo)
            if n < 0 or n >= len(ents):
                return {"ok": False, "error": "Nothing is put aside under that number."}
            e = ents[n]
            if e["oid"] != str(payload.get("w") or ""):
                return {"ok": False, "error": "What is put aside changed since Fabrica read it: look again."}
            tip, head = _disk_head_tip(repo)
            tipt = _disk_text(tip or b"")
            if tipt != str(payload.get("ours") or ""):
                return {"ok": False, "error": "Its folder moved on since Fabrica read it: look again, then bring the changes back."}
            work, changes, _, _ = _disk_status(rid, repo)
            if changes:
                return {"ok": False, "error": "Keep or put aside the changes under Changes first: changes come back onto files with nothing waiting."}
            plan = _disk_plan(repo, payload.get("files") or {})
            conflicts = sorted(set(_disk_rel(x) for x in (payload.get("conflicts") or [])))
            _disk_plan_write(repo, plan)
            if conflicts:
                w = repo[e["oid"].encode("ascii")]
                base = repo[w.parents[0]].tree if w.parents else None
                others = [w.tree] + ([repo[w.parents[2]].tree] if len(w.parents) > 2 else [])
                _disk_mark_index(repo, base, repo[tipt.encode("ascii")].tree, others, conflicts)
            dropped = False
            if drop and not conflicts:
                _disk_stash_drop_n(repo, n)
                dropped = True
            _DISK_W["st"].pop(rid, None)
            return {"ok": True, "conflicts": conflicts, "dropped": dropped, "msg": e["msg"]}
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        except Exception as e:
            log_problem("disk: changes put aside could not come back", sys.exc_info())
            return {"ok": False, "error": "The changes could not come back: %s" % e}


'''

rep('''def _start_local_server(directory, html_name=None):''', FN + '''def _start_local_server(directory, html_name=None):''')

# a pick under way is said as a merge under way is (the record, Keep, Stop)
rep('''versions are found by their marks among the files changed). None when there is none."""
    f = _disk_merge_files(repo)''', '''versions are found by their marks among the files changed). None when there is none.
    7.57: a version being brought in from another idea (git's CHERRY_PICK_HEAD) is said the same way, kind "pick" (app_pick_757.py)."""
    pk = _disk_pick_under_way(repo, changed)
    if pk:
        return pk
    f = _disk_merge_files(repo)''')
rep('''def _disk_merge_clear(repo, made=False):
    f = _disk_merge_files(repo)
    for k in ("note", "msg", "squash") + (() if made else ("head",)):
        try:
            os.unlink(f[k])
        except OSError:
            pass
''', '''def _disk_merge_clear(repo, made=False):
    f = _disk_merge_files(repo)
    for k in ("note", "msg", "squash") + (() if made else ("head",)):
        try:
            os.unlink(f[k])
        except OSError:
            pass
    # 7.57: a pick's own file, and git's AUTO_MERGE beside it (app_pick_757.py)
    for x in ("CHERRY_PICK_HEAD", "AUTO_MERGE"):
        try:
            os.unlink(os.path.join(repo.controldir(), x))
        except OSError:
            pass
''')
# the version that ends a pick keeps the picked version's author and the author's time
rep('''            ident = _disk_ident(repo, name, email)
            try:
                c = repo.do_commit(msg.encode("utf-8") + b"\\n", committer=ident, author=ident)''', '''            ident = _disk_ident(repo, name, email)
            akw = _disk_pick_author(repo, mg)  # 7.57: a pick ends as git cherry-pick --continue ends it (app_pick_757.py)
            try:
                c = repo.do_commit(msg.encode("utf-8") + b"\\n", committer=ident, author=akw.pop("author", ident), **akw)''')

rep('''    def disk_merge_stop(self, rid):
        return _disk_merge_stop(rid)
''', '''    def disk_merge_stop(self, rid):
        return _disk_merge_stop(rid)

    # 7.57: a version brought in from another idea, and changes put aside, on a drive (app_pick_757.py)
    def disk_pick(self, rid, payload, name=None, email=None):
        return _disk_pick(rid, payload, name, email)

    def disk_stash_push(self, rid, words=None, name=None, email=None):
        return _disk_stash_push(rid, words, name, email)

    def disk_stash_list(self, rid):
        return _disk_stash_list(rid)

    def disk_stash_apply(self, rid, n, payload, drop=False):
        return _disk_stash_apply(rid, n, payload, drop)

    def disk_stash_drop(self, rid, n):
        return _disk_stash_drop(rid, n)
''', 2)
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
