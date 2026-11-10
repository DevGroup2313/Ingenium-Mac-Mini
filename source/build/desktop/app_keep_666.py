"""Ingenium 6.66: a model kept for a stronger computer, and what was downloaded lately.

The owner's words (9 November 2026): "I want to be able to download models on the Models page to store for later on the app and
on my device so that I can have access to them when I get a stronger computer to run them ... download to run inside of the app on
my device or save to storage for later to run on a more powerful device equipped with more memory ... directly from Ingenium to my
device on my desktop or folder or also be able to store it inside of Ingenium's app library or storage", and "I also want a section
added to the Models page where I can see recently downloaded models and also the ones downloaded for Storage for later use".

Before, every model downloaded from Ingenium's lineup became a model of this computer at once: listed wherever a model is chosen,
even one that needs far more memory than the computer has ("It may not load"). Now:
  - a download asked for "for later" is kept and checked as any other, but marked so: the page leaves it out of the model lists
    until she chooses Use it here, and a model can be marked so (or back) at any time (model_later);
  - each download's record keeps when it arrived and its size, so the page can list what came lately (a model downloaded before
    6.66 is dated by its file);
  - kept_models lists the kept ones, also those on a drive that is not connected now;
  - reveal_model shows the file in the Finder or in Explorer;
  - copy_model_out copies a model (every part of a model in parts) to a folder she chooses, such as the desktop or a drive to
    carry to another computer, in the background, checking the first part's SHA-256 against the fingerprint the download was
    checked against, and writes beside it a short note naming the model, its size, its fingerprint and how to add it on the
    other computer. The model stays where it was.

    python3 build/desktop/app_keep_666.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_model_later" in s:
    print("already patched", p)
    sys.exit(0)

# a download may be asked for "for later"
rep('''def _install_model(spec):
    sp = _install_check(spec if isinstance(spec, dict) else {})
    if sp is None:
        return {"ok": False, "error": "The request did not name a model of Ingenium's lineup properly."}
''', '''def _install_model(spec):
    sp = _install_check(spec if isinstance(spec, dict) else {})
    if sp is None:
        return {"ok": False, "error": "The request did not name a model of Ingenium's lineup properly."}
    sp["later"] = bool(isinstance(spec, dict) and spec.get("later"))    # 6.66: kept for a stronger computer
''')

# each download's record: when it arrived, its size, and whether it is kept for later
rep('''"tiers": sp["tiers"]}''', '''"tiers": sp["tiers"], "at": int(time.time()), "size": int(sp.get("size") or 0),
                            "later": bool(sp.get("later"))}''')
rep('''"tiers": sp["tiers"], "parts": n}''', '''"tiers": sp["tiers"], "parts": n, "at": int(time.time()),
                            "size": int(sp.get("size") or 0), "later": bool(sp.get("later"))}''')
rep('''"size": _gguf_total_size(p), "lineup": lk, "role": role})''',
    '''"size": _gguf_total_size(p), "lineup": lk, "role": role, "at": _model_at(meta, p),
                        "later": bool(meta.get("later")), "where": _drive_label(os.path.dirname(p))})''')

rep('''def _move_status(mid):
''', r'''def _model_at(meta, p):
    """6.66: when a download arrived: its record's date, or, for one made before 6.66, its file's."""
    try:
        a = int((meta or {}).get("at") or 0)
    except Exception:
        a = 0
    if a > 0:
        return a
    try:
        return int(os.path.getmtime(p))
    except Exception:
        return 0


def _model_later(mid, later):
    """6.66: keep a downloaded model for a stronger computer (left out of the page's model lists), or use it here again."""
    mid = str(mid)
    _load_models_index()
    if mid not in _MODEL_META:
        return {"ok": False, "error": "That model is not one Ingenium downloaded."}
    if later and _ENGINE.get("model_id") == mid and _ENGINE.get("state") in ("loading", "ready"):
        return {"ok": False, "error": "That model is running. Unload it first, then keep it for later."}
    _MODEL_META[mid]["later"] = bool(later)
    _save_models_index()
    return {"ok": True, "later": bool(later)}


def _kept_models():
    """6.66: the models kept for a stronger computer, also those on a drive that is not connected now."""
    _load_models_index()
    out = []
    seen = set()
    for mid, meta in list(_MODEL_META.items()):
        lk = str((meta or {}).get("lineup") or "")
        if not (meta or {}).get("later") or lk.endswith("-dspark") or lk.endswith("-mmproj"):
            continue
        p = _MODEL_PATHS.get(mid) or ""
        here = bool(p) and os.path.isfile(p)
        seen.add(mid)
        out.append({"id": mid, "name": meta.get("name") or os.path.basename(p), "file": meta.get("file") or os.path.basename(p),
                    "size": _gguf_total_size(p) if here else int(meta.get("size") or 0), "lineup": lk,
                    "at": _model_at(meta, p) if here else int(meta.get("at") or 0), "connected": here,
                    "where": _drive_label(os.path.dirname(p)) if p else ""})
    for mid, rec in list(_MODEL_AWAY.items()):
        meta = rec.get("meta") if isinstance(rec, dict) else None
        if mid in seen or not isinstance(meta, dict) or not meta.get("later"):
            continue
        p = str(rec.get("path") or "")
        out.append({"id": mid, "name": meta.get("name") or os.path.basename(p), "file": meta.get("file") or os.path.basename(p),
                    "size": int(meta.get("size") or 0), "lineup": str(meta.get("lineup") or ""), "at": int(meta.get("at") or 0),
                    "connected": False, "where": _drive_label(os.path.dirname(p)) if p else ""})
    out.sort(key=lambda x: -(x.get("at") or 0))
    return out


def _reveal_model(mid):
    """6.66: the model's file shown in the Finder or in Explorer."""
    p = _model_path_for(str(mid))
    if not p or not os.path.isfile(p):
        return {"ok": False, "error": "That model's file is not connected now."}
    try:
        if sys.platform == "darwin":
            subprocess.Popen(["/usr/bin/open", "-R", p])
        elif sys.platform.startswith("win"):
            subprocess.Popen(["explorer", "/select,", os.path.normpath(p)])
        else:
            subprocess.Popen(["xdg-open", os.path.dirname(p)])
        return {"ok": True, "path": p}
    except Exception:
        log_problem("reveal_model(%r) failed" % (mid,), sys.exc_info())
        return {"ok": False, "error": "The folder could not be opened."}


_COPIES = {}
_COPIES_LOCK = threading.Lock()


def _ask_folder(win):
    """The computer's own folder dialog. Returns the folder, None when she cancelled, or raises."""
    import webview
    if win is None and getattr(webview, "windows", None):
        win = webview.windows[0]
    if win is None:
        raise RuntimeError("no window")
    kinds = getattr(webview, "FileDialog", None)
    dialog = kinds.FOLDER if kinds is not None else webview.FOLDER_DIALOG
    got = win.create_file_dialog(dialog) or ()
    if isinstance(got, str):
        got = (got,)
    return str(got[0]) if got else None


def _copy_model_out(mid, win):
    """6.66: a copy of a model in a folder she chooses (the desktop, a drive to carry), made in the background."""
    try:
        folder = _ask_folder(win)
    except Exception:
        log_problem("copy_model_out: the folder dialog", sys.exc_info())
        return {"ok": False, "error": "The folder dialog could not be opened."}
    if not folder:
        return {"ok": False, "cancelled": True}
    return _copy_model_to(mid, folder)


def _copy_model_to(mid, folder):
    mid = str(mid)
    _load_models_index()
    src = _MODEL_PATHS.get(mid)
    if not src or not os.path.isfile(src):
        return {"ok": False, "error": "That model's file is not connected now."}
    files = _gguf_parts_of(src)
    if not all(os.path.isfile(q) for q in files):
        return {"ok": False, "error": "A part of that model is missing, so it cannot be copied."}
    dest_dir = pathlib.Path(str(folder or ""))
    if not dest_dir.is_dir() or not os.access(str(dest_dir), os.W_OK):
        return {"ok": False, "error": "Ingenium cannot write in that folder. Choose another."}
    if any(os.path.realpath(os.path.dirname(q)) == os.path.realpath(str(dest_dir)) for q in files[:1]):
        return {"ok": False, "error": "The model is already in that folder."}
    sizes = [os.path.getsize(q) for q in files]
    total = sum(sizes)
    for q, n in zip(files, sizes):
        d = dest_dir / os.path.basename(q)
        if d.exists() and not (d.is_file() and d.stat().st_size == n):
            return {"ok": False, "error": "A different file named %s is already there. Choose another folder." % os.path.basename(q)}
    free = shutil.disk_usage(str(dest_dir)).free
    if free < total + 64 * 1024 * 1024:
        return {"ok": False, "error": "There is not enough room there (%.1f GB needed, %.1f GB free)." % (total / 1e9, free / 1e9)}
    meta = dict(_MODEL_META.get(mid) or {})
    want = str(meta.get("sha256") or "").lower()
    with _COPIES_LOCK:
        job = _COPIES.get(mid)
        if job and job["state"] == "running":
            return {"ok": True, "already": True}
        job = {"state": "running", "done": 0, "total": total, "error": "", "folder": str(dest_dir), "checked": False,
               "stop": threading.Event()}
        _COPIES[mid] = job

    def work():
        made = []
        try:
            for k, (q, n) in enumerate(zip(files, sizes)):
                d = dest_dir / os.path.basename(q)
                part = d.with_name(d.name + ".copying")
                made.append(part)
                h = hashlib.sha256() if (k == 0 and want) else None
                with open(q, "rb") as a, open(str(part), "wb") as b:
                    while True:
                        if job["stop"].is_set():
                            raise _InstallStopped()
                        chunk = a.read(8 << 20)
                        if not chunk:
                            break
                        b.write(chunk)
                        if h is not None:
                            h.update(chunk)
                        job["done"] += len(chunk)
                    b.flush()
                    os.fsync(b.fileno())
                if os.path.getsize(str(part)) != n:
                    raise RuntimeError("the copy came out a different size")
                if h is not None:
                    if h.hexdigest() != want:
                        raise RuntimeError("the copy does not match the model's fingerprint")
                    job["checked"] = True
                os.replace(str(part), str(d))
            name = str(meta.get("name") or os.path.basename(src))
            note = ["%s" % name, "",
                    "A model for Ingenium, copied from %s on %s." % (_drive_label(os.path.dirname(src)) or "this computer",
                                                                      time.strftime("%d %B %Y")),
                    "File%s: %s" % ("s" if len(files) > 1 else "", ", ".join(os.path.basename(q) for q in files)),
                    "Size: %.1f GB" % (total / 1e9)]
            if want:
                note.append("SHA-256 of %s: %s" % (os.path.basename(files[0]), want))
            note += ["", "To use it on another computer: open Ingenium there, go to Models, Your models, Add a model, and choose %s."
                     % os.path.basename(files[0]),
                     "Keep every file of it together in one folder."]
            try:
                (dest_dir / (os.path.splitext(os.path.basename(files[0]))[0] + " (about this model).txt")).write_text(
                    "\n".join(note) + "\n", encoding="utf-8")
            except Exception:
                log_problem("copy_model_out: the note beside the model", sys.exc_info())
            job["state"] = "done"
        except _InstallStopped:
            job.update(state="stopped")
        except Exception as e:
            log_problem("copy_model_out(%r) failed" % (mid,), sys.exc_info())
            job.update(state="error", error=str(e) or "the copy stopped")
        finally:
            for part in made:
                try:
                    if part.exists():
                        part.unlink()
                except Exception:
                    pass
    threading.Thread(target=work, daemon=True).start()
    return {"ok": True, "folder": str(dest_dir)}


def _copy_status(mid):
    with _COPIES_LOCK:
        job = _COPIES.get(str(mid))
        return {x: job[x] for x in ("state", "done", "total", "error", "folder", "checked")} if job else {"state": "none"}


def _copy_cancel(mid):
    with _COPIES_LOCK:
        job = _COPIES.get(str(mid))
        if job and job["state"] == "running":
            job["stop"].set()
    return {"ok": True}


def _move_status(mid):
''')

# the page reaches them through both windows' bridges
rep('''    def move_status(self, model_id):
        return _move_status(model_id)
''', '''    def move_status(self, model_id):
        return _move_status(model_id)

    # 6.66: a model kept for a stronger computer (app_keep_666.py)
    def model_later(self, model_id, later):
        return _model_later(model_id, later)

    def kept_models(self):
        return _kept_models()

    def reveal_model(self, model_id):
        return _reveal_model(model_id)

    def copy_model_out(self, model_id):
        return _copy_model_out(model_id, getattr(self, "_main_window", None))

    def copy_status(self, model_id):
        return _copy_status(model_id)

    def copy_cancel(self, model_id):
        return _copy_cancel(model_id)
''', 2)

open(p, "w", encoding="utf-8").write(s)
print("patched", p)
