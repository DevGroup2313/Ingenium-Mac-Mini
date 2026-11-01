"""Ingenium 6.9.2 (31 October 2026): the folder search's side of the desktop app (rag/DESIGN.md section 6).

The owner's decision (31 October 2026): "Use the app's own folder dialog, and let the app read the folder's files when asked."
The page may not open files itself, so the app does it, under rules that are the app's, not the page's:

  rag_choose_folder()                  the computer's own folder dialog (as the models' place is chosen); the folder chosen is
                                       remembered in the app's data folder (rag/folders.json). Only a folder chosen so can be
                                       listed or read. -> {ok: true, path, name} | {ok: false, cancelled: true}
  rag_folders()                        -> [{path, name, added, available}]            (added: milliseconds since 1970)
  rag_forget_folder(path)              the app forgets it and refuses it from then on -> {ok, forgot}
  rag_list(path)                       -> {ok, files: [{rel, size, mtime}], truncated}  (mtime: whole milliseconds since 1970)
                                       recursive; .txt .md .html .htm .json .csv .pdf .docx only; hidden entries skipped (a name
                                       with a leading dot, an editor's ~$ lock file, what Windows or the Mac marks hidden); a
                                       symbolic link only when what it points to stays inside the folder; at most 5,000 files
  rag_read(path, rel, offset, length)  -> {ok, data (base64), size, eof}; length at most 1 MB (more is cut to 1 MB); rel must be
                                       a plain path of the listing's kind and its real path must lie inside the chosen folder
  A refusal is {ok: false, error: <plain words>, code}. A folder that holds the app's own data, or lies inside it (the whole user
  folder, a drive's system root), cannot be chosen.

The logic is plain functions (_rag_*), added before the API classes; both API classes (the default single window and the one with
windows of its own) get the five methods; the local server gets explicit types for .mjs/.js (text/javascript), .wasm
(application/wasm), .onnx (application/octet-stream) and .json (application/json), so that a computer's own table (Windows reads
its registry, where .js can be text/plain, and a module script is then refused) cannot spoil the folder search's own code, its
WebAssembly or its model. rig/rag_bridge.py runs the very text of CODE below for the browser tests, and rig/t_rag1_bridge.py
tests it and this patch.

    python3 build/desktop/app_rag_692.py <repo>/ingenium_app.py
"""
import sys

MARK = "_rag_choose_folder"     # what release.py looks for: a function this patch adds

CODE = r'''# 6.9.2 (app_rag_692.py): the folder search reads folders through these (rag/DESIGN.md section 6). The person chooses a folder with
# the computer's own dialog; only a folder chosen so, and remembered in the app's data folder, can be listed or read. Plain functions:
# the API classes below only call them, and rig/rag_bridge.py runs this very text for the tests.
import stat as _rag_stat

_RAG_TYPES = (".txt", ".md", ".html", ".htm", ".json", ".csv", ".pdf", ".docx")
_RAG_LIST_CAP = 5000        # the most files one listing returns
_RAG_SCAN_CAP = 300000      # the most directory entries one listing looks at (a folder of millions of other files is not walked to its end)
_RAG_PIECE = 1048576        # the most one read returns
_RAG_STATE_DIR = None       # where the chosen folders are kept; None is the app's own data folder (the tests point it elsewhere)
_RAG_LOCK = threading.RLock()
_RAG_DIALOG = threading.Lock()
_RAG_CT = {".mjs": "text/javascript", ".js": "text/javascript", ".wasm": "application/wasm",
           ".onnx": "application/octet-stream", ".json": "application/json"}


def _rag_extensions_map(base):
    """The local server's table of file types with the ones the folder search needs set outright."""
    m = dict(base)
    m.update(_RAG_CT)
    return m


def _rag_err(message, code="REFUSED"):
    return {"ok": False, "error": message, "code": code}


def _rag_app_dir():
    """The app's own data folder: the one that holds the models folder (_models_dir)."""
    home = pathlib.Path.home()
    if sys.platform == "darwin":
        return home / "Library" / "Application Support" / APP_FOLDER
    if sys.platform.startswith("win"):
        return pathlib.Path(os.environ.get("APPDATA", str(home))) / APP_FOLDER
    return home / ".local" / "share" / APP_FOLDER.lower()


def _rag_state_file():
    d = pathlib.Path(_RAG_STATE_DIR) if _RAG_STATE_DIR else _rag_app_dir() / "rag"
    return d / "folders.json"


def _rag_load():
    """The folders chosen so far: [{path, real, name, added}]. No file is no folders; a damaged file is set aside (.bad) and is no folders."""
    f = _rag_state_file()
    try:
        if not f.is_file():
            return []
        rows = json.loads(f.read_text(encoding="utf-8")).get("folders")
        out = []
        for r in rows if isinstance(rows, list) else []:
            if isinstance(r, dict) and isinstance(r.get("path"), str) and isinstance(r.get("real"), str) and r["path"] and r["real"]:
                out.append({"path": r["path"], "real": r["real"], "name": str(r.get("name") or os.path.basename(r["path"]) or r["path"]),
                            "added": int(r.get("added") or 0)})
        return out
    except Exception:
        try:
            os.replace(str(f), str(f) + ".bad")
        except Exception:
            pass
        log_problem("rag: the list of chosen folders was damaged and was set aside", sys.exc_info())
        return []


def _rag_save(rows):
    f = _rag_state_file()
    f.parent.mkdir(parents=True, exist_ok=True)
    tmp = f.with_name(f.name + ".tmp")
    tmp.write_text(json.dumps({"version": 1, "folders": rows}, indent=1), encoding="utf-8")
    os.replace(str(tmp), str(f))


def _rag_real(p):
    """A path as the computer really has it, for comparing: links resolved, case folded where the system ignores case."""
    return os.path.normcase(os.path.realpath(p))


def _rag_inside(path, base):
    """True when path is base or lies under it (both as _rag_real gives them)."""
    try:
        return os.path.commonpath([path, base]) == base
    except ValueError:                      # another drive (Windows), or a path that is not absolute
        return False


def _rag_find(path):
    """The remembered folder a path names (by its real path, so another spelling of the same folder works too), or None."""
    if not isinstance(path, str) or not path.strip() or "\0" in path or not os.path.isabs(path):
        return None
    try:
        want = _rag_real(path)
    except (OSError, ValueError):
        return None
    for r in _rag_load():
        if os.path.normcase(r["real"]) == want:
            return r
    return None


def _rag_hidden(name, st=None):
    """A name the search leaves out: a dot name (a Mac's ._ copies too), an editor's lock file (~$), or what the system marks hidden."""
    if name.startswith(".") or name.startswith("~$"):
        return True
    if st is not None:
        if getattr(st, "st_file_attributes", 0) & 0x2:                                  # Windows: FILE_ATTRIBUTE_HIDDEN
            return True
        if getattr(st, "st_flags", 0) & getattr(_rag_stat, "UF_HIDDEN", 0x8000):        # Mac: chflags hidden
            return True
    return False


def _rag_type_ok(name):
    return os.path.splitext(name)[1].lower() in _RAG_TYPES


def _rag_walk(base):
    """The files under base (a real path): ([{rel, size, mtime}] sorted by rel, with / between names; more_were_left). Hidden entries are
    skipped; a symbolic link is followed only when what it points to lies inside base, and never into a folder it is already inside."""
    nbase = os.path.normcase(base)
    out = []
    scanned = 0
    truncated = False
    stack = [(base, "", (nbase,))]
    while stack and not truncated:
        d, prefix, chain = stack.pop()
        try:
            with os.scandir(d) as it:
                entries = sorted(it, key=lambda e: e.name)
        except OSError:
            continue
        subdirs = []
        for e in entries:
            scanned += 1
            if scanned > _RAG_SCAN_CAP:
                truncated = True
                break
            name = e.name
            try:
                lst = e.stat(follow_symlinks=False)
            except OSError:
                continue
            if _rag_hidden(name, lst):
                continue
            full = os.path.join(d, name)
            st = lst
            islink = _rag_stat.S_ISLNK(lst.st_mode)
            if islink:
                try:
                    st = os.stat(full)                       # what the link points to; a broken link is skipped
                except OSError:
                    continue
            if _rag_stat.S_ISDIR(st.st_mode):
                real = _rag_real(full)
                if not _rag_inside(real, nbase) or real in chain:
                    continue                                 # it leaves the folder, or loops back into a folder it is already inside
                subdirs.append((full, prefix + name + "/", chain + (real,)))
            elif _rag_stat.S_ISREG(st.st_mode) and _rag_type_ok(name):
                if islink and not _rag_inside(_rag_real(full), nbase):
                    continue
                if len(out) >= _RAG_LIST_CAP:
                    truncated = True
                    break
                out.append({"rel": prefix + name, "size": int(st.st_size), "mtime": int(st.st_mtime_ns // 1000000)})
        for sd in reversed(subdirs):
            stack.append(sd)
    out.sort(key=lambda f: f["rel"])
    return out, truncated


def _rag_parts(rel):
    """The names in a relative path of the listing's kind, or None for anything else (absolute, a drive, .., empty, a NUL)."""
    if not isinstance(rel, str) or not rel or len(rel) > 4096 or "\0" in rel:
        return None
    if os.path.isabs(rel) or os.path.splitdrive(rel)[0] or rel[0] in "/\\":
        return None
    if os.sep == "\\" and ":" in rel:                        # a Windows alternate data stream (name:stream)
        return None
    parts = [p for p in re.split(r"[/\\]" if os.sep == "\\" else r"/", rel) if p not in ("", ".")]
    if not parts or any(p == ".." for p in parts):
        return None
    return parts


def _rag_int(v):
    if isinstance(v, bool):
        raise ValueError("not a number")
    if isinstance(v, int):
        return v
    if isinstance(v, float) and v == int(v):
        return int(v)
    raise ValueError("not a whole number")


def _rag_remember(path):
    """Checks a folder the person chose and remembers it. -> {ok, path, name} (again: true when it was chosen before)."""
    try:
        p = os.path.abspath(str(path))
        real = os.path.realpath(p)
    except (OSError, ValueError):
        return _rag_err("That is not a folder.", "NOT_A_FOLDER")
    if not os.path.isdir(real):
        return _rag_err("That is not a folder.", "NOT_A_FOLDER")
    if not os.access(real, os.R_OK | os.X_OK):
        return _rag_err("Ingenium may not read that folder.", "UNREADABLE")
    app = _rag_real(str(_rag_app_dir()))
    nreal = os.path.normcase(real)
    if _rag_inside(nreal, app) or _rag_inside(app, nreal):
        return _rag_err("That folder holds Ingenium's own settings (or is the whole user folder). Choose the folder with your papers in it.", "REFUSED")
    with _RAG_LOCK:
        rows = _rag_load()
        for r in rows:
            if os.path.normcase(r["real"]) == nreal:
                return {"ok": True, "path": r["path"], "name": r["name"], "again": True}
        name = os.path.basename(p.rstrip("/\\")) or p
        rows.append({"path": p, "real": real, "name": name, "added": int(time.time() * 1000)})
        try:
            _rag_save(rows)
        except Exception:
            log_problem("rag: the chosen folder could not be remembered", sys.exc_info())
            return _rag_err("Ingenium could not remember that folder.", "NOT_SAVED")
    return {"ok": True, "path": p, "name": name}


def _rag_choose_folder(win):
    """The computer's own folder dialog; the folder chosen is remembered (and may then be listed and read)."""
    if not _RAG_DIALOG.acquire(False):
        return _rag_err("The folder dialog is open already.", "BUSY")
    try:
        import webview
        if win is None and getattr(webview, "windows", None):
            win = webview.windows[0]
        if win is None:
            return _rag_err("The folder dialog could not be opened.", "DIALOG")
        kinds = getattr(webview, "FileDialog", None)
        dialog = kinds.FOLDER if kinds is not None else webview.FOLDER_DIALOG
        got = win.create_file_dialog(dialog) or ()
        if isinstance(got, str):
            got = (got,)
        if not got:
            return {"ok": False, "cancelled": True}
        return _rag_remember(str(got[0]))
    except Exception:
        log_problem("rag_choose_folder failed", sys.exc_info())
        return _rag_err("The folder dialog could not be opened.", "DIALOG")
    finally:
        _RAG_DIALOG.release()


def _rag_folders():
    try:
        return [{"path": r["path"], "name": r["name"], "added": r["added"], "available": os.path.isdir(r["real"])} for r in _rag_load()]
    except Exception:
        log_problem("rag_folders failed", sys.exc_info())
        return []


def _rag_forget_folder(path):
    try:
        if not isinstance(path, str) or not path.strip() or "\0" in path or not os.path.isabs(path):
            return _rag_err("That is not a folder path.", "BAD_ARGS")
        want = _rag_real(path)
        with _RAG_LOCK:
            rows = _rag_load()
            keep = [r for r in rows if os.path.normcase(r["real"]) != want]
            if len(keep) != len(rows):
                _rag_save(keep)
        return {"ok": True, "forgot": len(keep) != len(rows)}
    except Exception:
        log_problem("rag_forget_folder failed", sys.exc_info())
        return _rag_err("The folder could not be forgotten.", "FAILED")


def _rag_list(path):
    try:
        rec = _rag_find(path)
        if rec is None:
            return _rag_err("That folder was not chosen for the search.", "NOT_CHOSEN")
        if not os.path.isdir(rec["real"]) or not os.access(rec["real"], os.R_OK | os.X_OK):
            return _rag_err("The folder cannot be reached (is its drive connected?).", "UNAVAILABLE")
        files, truncated = _rag_walk(rec["real"])
        return {"ok": True, "files": files, "truncated": truncated}
    except Exception:
        log_problem("rag_list failed", sys.exc_info())
        return _rag_err("The folder could not be listed.", "FAILED")


def _rag_read(path, rel, offset=0, length=_RAG_PIECE):
    try:
        rec = _rag_find(path)
        if rec is None:
            return _rag_err("That folder was not chosen for the search.", "NOT_CHOSEN")
        try:
            offset, length = _rag_int(offset), _rag_int(length)
        except (ValueError, OverflowError):
            return _rag_err("The offset and the length must be whole numbers.", "BAD_ARGS")
        if offset < 0 or length < 1:
            return _rag_err("The offset must be 0 or more and the length 1 or more.", "BAD_ARGS")
        length = min(length, _RAG_PIECE)
        parts = _rag_parts(rel)
        if parts is None:
            return _rag_err("That is not a path inside the folder.", "OUTSIDE")
        base = rec["real"]
        if not os.path.isdir(base):
            return _rag_err("The folder cannot be reached (is its drive connected?).", "UNAVAILABLE")
        cur = base
        for part in parts:                                   # no hidden step on the way (by name, or by the system's own mark)
            cur = os.path.join(cur, part)
            try:
                st = os.lstat(cur)
            except OSError:
                return _rag_err("There is no such file in the folder.", "NO_FILE")
            if _rag_hidden(part, st):
                return _rag_err("Hidden files are not read.", "HIDDEN")
        if not _rag_type_ok(parts[-1]):
            return _rag_err("Only .txt, .md, .html, .htm, .json, .csv, .pdf and .docx files are read.", "TYPE")
        full = os.path.realpath(cur)
        if not _rag_inside(os.path.normcase(full), os.path.normcase(base)):
            return _rag_err("That path leaves the folder.", "OUTSIDE")
        if not os.path.isfile(full):
            return _rag_err("There is no such file in the folder.", "NO_FILE")
        with open(full, "rb") as fh:
            size = os.fstat(fh.fileno()).st_size
            data = b""
            if offset < size:
                fh.seek(offset)
                data = fh.read(min(length, size - offset))
        return {"ok": True, "data": base64.b64encode(data).decode("ascii"), "size": size, "eof": offset + len(data) >= size}
    except OSError:
        return _rag_err("The file could not be read.", "UNREADABLE")
    except Exception:
        log_problem("rag_read failed", sys.exc_info())
        return _rag_err("The file could not be read.", "FAILED")


'''

# the five methods, added to both API classes after take_screenshot
METHODS = '''    # 6.9.2: the folder search (app_rag_692.py; rag/DESIGN.md section 6)
    def rag_choose_folder(self):
        return _rag_choose_folder(getattr(self, "_main_window", None))

    def rag_folders(self):
        return _rag_folders()

    def rag_forget_folder(self, path):
        return _rag_forget_folder(path)

    def rag_list(self, path):
        return _rag_list(path)

    def rag_read(self, path, rel, offset=0, length=1048576):
        return _rag_read(path, rel, offset, length)
'''

API_ANCHOR = "    def take_screenshot(self):\n        return _take_screenshot()\n"
CLASS_ANCHOR = "class IngeniumApi(_LiteWindows):"
SERVER_OLD = "    class _Quiet(http.server.SimpleHTTPRequestHandler):\n        def log_message(self, *a):\n            pass\n"
SERVER_NEW = ("    class _Quiet(http.server.SimpleHTTPRequestHandler):\n"
              "        # 6.9.2 (app_rag_692.py): types set outright for the folder search's code, WebAssembly and model (a computer's own table can be wrong)\n"
              "        extensions_map = _rag_extensions_map(http.server.SimpleHTTPRequestHandler.extensions_map)\n\n"
              "        def log_message(self, *a):\n            pass\n")


def apply(s):
    """The patched text of ingenium_app.py; SystemExit with the reason if the file is not the shape this patch knows."""
    if MARK in s:
        return s
    for what, anchor, n in (("take_screenshot", API_ANCHOR, 2), ("the API class", CLASS_ANCHOR, 1), ("the local server's handler", SERVER_OLD, 1)):
        c = s.count(anchor)
        if c != n:
            sys.exit("app_rag_692: %s found %d times, not %d" % (what, c, n))
    s = s.replace(API_ANCHOR, API_ANCHOR + "\n" + METHODS)
    s = s.replace(CLASS_ANCHOR, CODE + CLASS_ANCHOR, 1)
    s = s.replace(SERVER_OLD, SERVER_NEW)
    return s


def main(argv):
    p = argv[1]
    s = open(p, encoding="utf-8").read()
    if MARK in s:
        print("rag: already in", p)
        return 0
    new = apply(s)
    compile(new, p, "exec")                  # a patch that does not compile is never written
    open(p, "w", encoding="utf-8", newline="\n").write(new)
    print("rag: added to", p)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
