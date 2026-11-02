"""Ingenium 6.8.2: models kept on an external drive as well as on the computer itself.

The owner's words (27 October 2026): "models should be allowed to use storage from external hard drives as well as the
machine they are working on."

Before, a model file chosen with the computer's own dialog was already linked where it lay, on any drive (R64), but
everything Ingenium wrote itself (a model of its lineup, a copy kept from the page) went to the computer's own models folder,
and nothing could be moved. Worse for a drive: a model whose file was not there when the app started was left out of the
list kept on disk, so a drive unplugged for one start lost every model on it.

Now:
  - a folder on another drive can be chosen for the models Ingenium writes (an "Ingenium models" folder is made in it, and
    Ingenium checks it can write there first); new downloads and kept copies go there while the drive is connected, and to
    the computer's own folder while it is not; the choice can be undone at any time;
  - a model Ingenium wrote can be moved either way, with its progress shown, after checking the room on the other side; a
    file the person linked where it lies is never moved, and never deleted;
  - a model on a drive that is not connected (when the app starts, or unplugged while it is open) stays in the list, said
    to be not connected, and comes back when the drive does;
  - the list itself always stays on the computer.

    python3 build/desktop/app_drives_682.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_models_store_dir" in s:
    print("already patched", p)
    sys.exit(0)

# a model whose file is not there now is kept in the list, not forgotten
rep('''_MODEL_META = {}  # R70: id -> details of a model installed from Ingenium's lineup
''', '''_MODEL_META = {}  # R70: id -> details of a model installed from Ingenium's lineup
_MODEL_AWAY = {}  # 6.8.2: id -> its record, for a model whose file is on a drive not connected now
''')
rep('''            if p and os.path.isfile(p):
                _MODEL_PATHS[mid] = p
                if rec.get("external"):
                    _MODEL_EXTERNAL.add(mid)
                if isinstance(rec.get("meta"), dict):
                    _MODEL_META[mid] = rec["meta"]
''', '''            if p and os.path.isfile(p):
                _MODEL_PATHS[mid] = p
                _MODEL_AWAY.pop(mid, None)
                if rec.get("external"):
                    _MODEL_EXTERNAL.add(mid)
                if isinstance(rec.get("meta"), dict):
                    _MODEL_META[mid] = rec["meta"]
            elif p and mid not in _MODEL_PATHS:
                _MODEL_AWAY[mid] = rec
''')
rep('''            if mid in _MODEL_META:
                idx[mid]["meta"] = _MODEL_META[mid]
        ip.write_text(json.dumps(idx), encoding="utf-8")''', '''            if mid in _MODEL_META:
                idx[mid]["meta"] = _MODEL_META[mid]
        for mid, rec in _MODEL_AWAY.items():
            if mid not in idx:
                idx[mid] = rec
        ip.write_text(json.dumps(idx), encoding="utf-8")''')

# the place a new model is written, and the drive's own functions
rep('''def _models_index_path():''', '''# 6.8.2 (app_drives_682.py): a folder on another drive for the models Ingenium writes
_PLACE_FOLDER = "Ingenium models"
_MOVES = {}
_MOVES_LOCK = threading.Lock()


def _place_file():
    d = _models_dir()
    return (d / "place.json") if d else None


def _place_chosen():
    """The folder chosen on another drive, or None (the computer's own models folder)."""
    try:
        pf = _place_file()
        if pf and pf.is_file():
            got = json.loads(pf.read_text(encoding="utf-8")).get("dir")
            return str(got) if got else None
    except Exception:
        pass
    return None


def _models_store_dir():
    """Where a new model is written: the chosen folder while its drive is connected and can be written to, otherwise the
    computer's own models folder."""
    c = _place_chosen()
    if c:
        try:
            pc = pathlib.Path(c)
            if pc.is_dir() and os.access(str(pc), os.W_OK):
                return pc
        except Exception:
            pass
    return _models_dir()


def _under(path, base):
    try:
        a, b = os.path.realpath(str(path)), os.path.realpath(str(base))
        return os.path.commonpath([a, b]) == b
    except Exception:
        return False


def _drive_label(path):
    """The drive a path is on, as the person knows it: its name on a Mac, its letter (and name) on Windows."""
    path = str(path or "")
    if not path:
        return ""
    if sys.platform == "darwin" and path.startswith("/Volumes/"):
        return path.split("/")[2]
    if sys.platform.startswith("win"):
        letter = os.path.splitdrive(path)[0]
        try:
            import ctypes
            buf = ctypes.create_unicode_buffer(261)
            if letter and ctypes.windll.kernel32.GetVolumeInformationW(letter + "\\\\", buf, 261, None, None, None, None, 0) and buf.value:
                return "%s (%s)" % (buf.value, letter)
        except Exception:
            pass
        return letter or path
    return path


def _place_info(path, label):
    out = {"path": str(path) if path else "", "label": label, "connected": False, "free": 0, "total": 0}
    try:
        if path and os.path.isdir(str(path)):
            du = shutil.disk_usage(str(path))
            out.update(connected=True, free=du.free, total=du.total)
    except Exception:
        pass
    return out


def _model_places():
    """Where the models are kept: the computer's own folder, the folder chosen on another drive, and each model's place."""
    _load_models_index()
    inner, chosen = _models_dir(), _place_chosen()
    models = []
    for mid, mp in list(_MODEL_PATHS.items()):
        if not os.path.isfile(mp):
            # its drive was unplugged while the app was open: kept in the list as not connected, until it comes back
            rec = {"path": mp, "external": mid in _MODEL_EXTERNAL}
            if mid in _MODEL_META:
                rec["meta"] = _MODEL_META[mid]
            _MODEL_AWAY[mid] = rec
            _MODEL_PATHS.pop(mid, None)
            continue
        try:
            size = os.path.getsize(mp)
        except OSError:
            size = 0
        if mid in _MODEL_EXTERNAL:
            where = "linked"
        elif inner and _under(mp, inner):
            where = "computer"
        elif chosen and _under(mp, chosen):
            where = "drive"
        else:
            where = "linked"
        models.append({"id": mid, "file": os.path.basename(mp), "size": size, "where": where, "connected": True,
                       "drive": _drive_label(mp), "name": (_MODEL_META.get(mid) or {}).get("name") or ""})
    for mid, rec in _MODEL_AWAY.items():
        models.append({"id": mid, "file": os.path.basename(rec.get("path", "")), "size": 0, "where": "away", "connected": False,
                       "drive": _drive_label(rec.get("path", "")), "name": ((rec.get("meta") or {}).get("name") or "")})
    with _MOVES_LOCK:
        moves = dict((k, {x: v[x] for x in ("state", "done", "total", "error", "to")}) for k, v in _MOVES.items())
    return {"computer": _place_info(inner, "This computer"), "drive": _place_info(chosen, _drive_label(chosen)) if chosen else None,
            "writes_to": "drive" if (chosen and _models_store_dir() and _under(_models_store_dir(), chosen)) else "computer",
            "models": models, "moves": moves}


def _set_model_place(folder):
    base = os.path.abspath(os.path.expanduser(str(folder or "")))
    if not os.path.isdir(base):
        return {"ok": False, "error": "That folder could not be found."}
    inner = _models_dir()
    if inner and _under(base, inner):
        return _reset_model_place()
    target = base if os.path.basename(base) == _PLACE_FOLDER else os.path.join(base, _PLACE_FOLDER)
    try:
        os.makedirs(target, exist_ok=True)
        probe = os.path.join(target, ".ingenium-write-check")
        with open(probe, "wb") as fh:
            fh.write(b"ok")
        os.remove(probe)
    except Exception:
        return {"ok": False, "error": "Ingenium cannot write there. The drive may be read-only, or formatted for another kind "
                                      "of computer (a Mac reads a Windows drive's NTFS but cannot write to it)."}
    pf = _place_file()
    if not pf:
        return {"ok": False, "error": "The app's own models folder could not be made."}
    pf.write_text(json.dumps({"dir": target}), encoding="utf-8")
    return dict(_model_places(), ok=True)


def _reset_model_place():
    try:
        pf = _place_file()
        if pf and pf.is_file():
            pf.unlink()
    except Exception:
        pass
    return dict(_model_places(), ok=True)


def _choose_model_place(win):
    """The computer's own folder dialog; the folder chosen becomes the place for new models."""
    try:
        import webview
        if win is None and getattr(webview, "windows", None):
            win = webview.windows[0]
        if win is None:
            return {"ok": False, "error": "The folder dialog could not be opened."}
        kinds = getattr(webview, "FileDialog", None)
        dialog = kinds.FOLDER if kinds is not None else webview.FOLDER_DIALOG
        got = win.create_file_dialog(dialog) or ()
        if isinstance(got, str):
            got = (got,)
        if not got:
            return {"ok": False, "cancelled": True}
        return _set_model_place(str(got[0]))
    except Exception:
        log_problem("choose_model_place failed", sys.exc_info())
        return {"ok": False, "error": "The folder dialog could not be opened."}


def _move_model(mid, to):
    """Move a model Ingenium wrote to the computer's own folder or to the folder on the drive, in the background."""
    mid, to = str(mid), str(to)
    _load_models_index()
    src = _MODEL_PATHS.get(mid)
    if not src or not os.path.isfile(src):
        return {"ok": False, "error": "That model's file is not connected now."}
    if mid in _MODEL_EXTERNAL:
        return {"ok": False, "error": "You linked that file where it is, so Ingenium leaves it there."}
    if _ENGINE.get("model_id") == mid and _ENGINE.get("state") in ("loading", "ready"):
        return {"ok": False, "error": "That model is running. Unload it first, then move it."}
    if to == "computer":
        dest_dir = _models_dir()
    else:
        c = _place_chosen()
        dest_dir = pathlib.Path(c) if c else None
        if dest_dir is None:
            return {"ok": False, "error": "Choose a drive first."}
    if dest_dir is None or not dest_dir.is_dir():
        return {"ok": False, "error": "The drive is not connected."}
    dest = dest_dir / os.path.basename(src)
    if os.path.realpath(str(dest)) == os.path.realpath(src):
        return {"ok": True, "same": True}
    size = os.path.getsize(src)
    free = shutil.disk_usage(str(dest_dir)).free
    if free < size + 64 * 1024 * 1024:
        return {"ok": False, "error": "There is not enough room there (%.1f GB needed, %.1f GB free)." % (size / 1e9, free / 1e9)}
    with _MOVES_LOCK:
        job = _MOVES.get(mid)
        if job and job["state"] == "running":
            return {"ok": True, "already": True}
        job = {"state": "running", "done": 0, "total": size, "error": "", "to": to, "stop": threading.Event()}
        _MOVES[mid] = job

    def work():
        part = dest.with_name(dest.name + ".moving")
        try:
            with open(src, "rb") as a, open(str(part), "wb") as b:
                while True:
                    if job["stop"].is_set():
                        raise _InstallStopped()
                    chunk = a.read(8 << 20)
                    if not chunk:
                        break
                    b.write(chunk)
                    job["done"] += len(chunk)
                b.flush()
                os.fsync(b.fileno())
            if os.path.getsize(str(part)) != size:
                raise RuntimeError("the copy came out a different size")
            os.replace(str(part), str(dest))
            _MODEL_PATHS[mid] = str(dest)
            _save_models_index()
            try:
                os.remove(src)
            except Exception:
                log_problem("move_model: the old copy of %r stays at %s" % (mid, src), sys.exc_info())
            job["state"] = "done"
        except _InstallStopped:
            job.update(state="stopped")
        except Exception as e:
            log_problem("move_model(%r) failed" % (mid,), sys.exc_info())
            job.update(state="error", error=str(e) or "the copy stopped")
        finally:
            try:
                if part.exists():
                    part.unlink()
            except Exception:
                pass
    threading.Thread(target=work, daemon=True).start()
    return {"ok": True}


def _move_status(mid):
    with _MOVES_LOCK:
        job = _MOVES.get(str(mid))
        return {x: job[x] for x in ("state", "done", "total", "error", "to")} if job else {"state": "none"}


def _models_index_path():''')

# what Ingenium writes goes to the place chosen
rep('''    disk, so a 2 GB model costs no more memory than one chunk."""
    d = _models_dir()
    if d is None:
        return False
    try:
        raw = base64.b64decode(str(data_b64))
    except Exception:
        return False
    p = d / _safe_id(mid)''', '''    disk, so a 2 GB model costs no more memory than one chunk."""
    d = _models_store_dir()
    if d is None:
        return False
    try:
        raw = base64.b64decode(str(data_b64))
    except Exception:
        return False
    # a copy goes on in the place it began, even if the place for new models is changed meanwhile
    p = pathlib.Path(_MODEL_PATHS[mid]) if (not first and mid in _MODEL_PATHS) else d / _safe_id(mid)''')
rep('''        mid = "lineup-" + _safe_id(sp["key"])
        d = _models_dir()
        if d is None:''', '''        mid = "lineup-" + _safe_id(sp["key"])
        d = _models_store_dir()
        if d is None:''')
rep('''            raise RuntimeError("there is not enough free space on this computer (%.1f GB needed, %.1f GB free)"
                               % ((sp["size"] - have) / 1e9, free / 1e9))''', '''            raise RuntimeError("there is not enough free space %s (%.1f GB needed, %.1f GB free)"
                               % ("on this computer" if _under(d, _models_dir()) else "on " + _drive_label(d),
                                  (sp["size"] - have) / 1e9, free / 1e9))''')

# removing a model: a copy on the drive's folder is Ingenium's own too; a model not connected is forgotten
rep('''def _delete_model_file(mid):
    p = _MODEL_PATHS.pop(mid, None) or _model_path_for(mid)''', '''def _delete_model_file(mid):
    _MODEL_AWAY.pop(mid, None)
    p = _MODEL_PATHS.pop(mid, None) or _model_path_for(mid)''')
rep('''        d = _models_dir()
        # only ever delete files that live inside our own models folder
        if d and os.path.commonpath([os.path.realpath(p), str(d)]) == str(d):
            os.remove(p)''', '''        d = _models_dir()
        # only ever delete files that live inside our own models folder, or the one Ingenium made on a drive
        c = _place_chosen()
        if (d and os.path.commonpath([os.path.realpath(p), str(d)]) == str(d)) or (c and _under(p, c)):
            os.remove(p)''')

# the page asks through the app's bridge, in both of its kinds of window
rep('''    def installed_models(self):
        return _installed_models()
''', '''    def installed_models(self):
        return _installed_models()

    # 6.8.2: models on an external drive (app_drives_682.py)
    def model_places(self):
        return _model_places()

    def choose_model_place(self):
        return _choose_model_place(getattr(self, "_main_window", None))

    def set_model_place(self, folder):
        return _set_model_place(folder)

    def reset_model_place(self):
        return _reset_model_place()

    def move_model(self, model_id, to):
        return _move_model(model_id, to)

    def move_status(self, model_id):
        return _move_status(model_id)
''', 2)
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
