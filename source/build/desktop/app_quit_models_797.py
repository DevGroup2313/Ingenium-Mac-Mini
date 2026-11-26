"""Ingenium 7.97: the app always quits, and a model's file is found again wherever Ingenium keeps models.

Her words (26 November 2026): "I am also having issues with simply closing the app, it never does and I keep on seeing the little
spinning rainbow wheel, I have to keep Force Quitting the app to close the window and I hate that." And: "the models are no longer
loading on the Windows Full edition app, it does not matter which model they all refuse to load on the Engine and it keeps on saying
that the model files are not where they are supposed to be ... When I upload a new model from my files or my device they work inside of
the Full edition Windows app but the built-in models do not work. The ones that I install from inside of Ingenium also works ... but the
Mellum model also refused to load."

1. Quitting. Read on 7.96: when the window closes, the app stopped its engine and its trainer, then left Python to finish, which waits
   for every thread still running and for every exit handler; one call that never returns (a stream still open, a web view call that
   waits for the main thread) leaves the app alive without a window, and macOS shows the spinning wheel until it is forced to quit. I
   could not watch it happen on her Mac, so the cause is not proven. Now the app ends by itself, whatever is still running:
   - the moment the window closes, the engine, the trainer and lending are stopped, each in its own thread and each given a moment;
   - when the window's run ends, the session is closed and the app ends at once (os._exit), not waiting for anything left running;
   - should even that not happen, a watch started when the window closed ends the app 4 seconds after Ingenium's own parts are
     stopped (8 seconds at most), and first writes to the crash log which threads were still running and where the main thread
     stood, so the true cause can be read there.
   A model the engine had loaded, a lending server and a training are all stopped first: nothing of Ingenium is left running.

2. Models. Read on 7.96: the computer app finds a model's file by its id, in the list it keeps (models/index.json) or, for a model built
   into the app, only once the page has asked for the list of built-in models (_builtin_models). When the page asks the engine for a
   model before that (at start, or after the full edition takes the master's work), or when the list it keeps lost a record, the app
   said "That model's file is no longer where it was" although the file was there. Without her laptop I could not see which of these
   it was, so each is covered. Now, before saying so, the app:
   - reads its list again, and asks for the built-in models when the id is one of theirs;
   - looks for the file by every name it can have (its own name, the name Ingenium's lineup gives a model it installs, l + the first
     12 characters of its SHA-256 + .gguf, and the copy's own id) in every place Ingenium keeps models: this computer's models folder,
     the folder chosen on another drive, and the models folder beside or inside the app;
   - when it finds it, writes it back into its list, so the next start finds it at once.
   A file that is truly gone is still said to be gone.

  _model_path_for(mid)             as before, with the search above
  _model_find_797(mid)             the search alone: a path or None
  _quit_797(why)                   stop everything Ingenium started, then end the process
  _closed_797()                    the window's closed event: stop the engine at once, and watch that the app ends

    python3 build/desktop/app_quit_models_797.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_model_find_797" in s:
    print("already patched", p)
    sys.exit(0)

# ---------- 2. a model's file found again ----------
rep('''def _model_path_for(mid):
    if mid in _MODEL_PATHS:
        return _MODEL_PATHS[mid]
    _load_models_index()
    return _MODEL_PATHS.get(mid)
''', '''def _model_path_for(mid):
    p = _MODEL_PATHS.get(mid)
    if p and os.path.isfile(p):
        return p
    # 7.97 (app_quit_models_797.py): read the list again; ask for the built-in models; then look by name wherever models are kept
    _load_models_index()
    p = _MODEL_PATHS.get(mid)
    if p and os.path.isfile(p):
        return p
    if str(mid).startswith("builtin-"):
        try:
            _builtin_models()
        except Exception:
            log_problem("models: the built-in models could not be listed", sys.exc_info())
        p = _MODEL_PATHS.get(mid)
        if p and os.path.isfile(p):
            return p
    found = _model_find_797(str(mid))
    if found:
        _MODEL_PATHS[mid] = found
        _MODEL_AWAY.pop(mid, None)
        _save_models_index()
        log_problem("models: %s found again at %s" % (mid, found))
        return found
    return p


def _model_find_797(mid):
    """7.97: a model's file by every name it can have, in every place Ingenium keeps models; None when it is nowhere."""
    names = []
    rec = _MODEL_AWAY.get(mid) or {}
    meta = _MODEL_META.get(mid) or (rec.get("meta") if isinstance(rec.get("meta"), dict) else {}) or {}
    for n in (os.path.basename(str(rec.get("path") or "")),
              ("l" + str(meta.get("sha256"))[:12] + ".gguf") if meta.get("sha256") else "",
              mid[len("builtin-"):] if mid.startswith("builtin-") else "",
              str(meta.get("file") or ""), _safe_id(mid)):
        n = os.path.basename(n)
        if n and n not in names and n not in (".", ".."):
            names.append(n)
    dirs = []
    for get in (_models_dir, _models_store_dir, _place_chosen):
        try:
            d = get()
        except Exception:
            d = None
        if d and str(d) not in dirs:
            dirs.append(str(d))
    for root in _app_roots():
        d = os.path.join(root, "models")
        if d not in dirs:
            dirs.append(d)
    for d in dirs:
        for n in names:
            f = os.path.join(d, n)
            try:
                if os.path.isfile(f) and os.path.getsize(f) > 0:
                    return f
            except Exception:
                continue
    return None
''')

# ---------- 1. the app always quits ----------
rep('''            webview.start(**kwargs)
            _started = True
            _engine_stop()
            _train_stop_at_exit()
            _end_session()
''', '''            webview.start(**kwargs)
            _started = True
            _quit_797("the window's run ended")  # 7.97 (app_quit_models_797.py): stop what Ingenium started, then end at once
''')

rep('''        window.events.loaded += _on_loaded
''', '''        window.events.loaded += _on_loaded
        window.events.closed += _closed_797  # 7.97 (app_quit_models_797.py)
''')

rep('''def _end_session():
''', '''_QUIT_797 = {"closing": False}


def _quit_stop_797(wait=4.0):
    """7.97: the engine, the trainer and lending stopped, each in its own thread, all given at most `wait` seconds together."""
    import threading as _t
    jobs = []
    for name in ("_engine_stop", "_train_stop_at_exit", "_share_stop", "_end_session"):
        f = globals().get(name)
        if callable(f):
            th = _t.Thread(target=f, daemon=True, name="quit-" + name)
            th.start()
            jobs.append(th)
    end = time.time() + wait
    for th in jobs:
        th.join(max(0.05, end - time.time()))


def _quit_threads_797():
    """7.97: which threads were still running, and where the main thread stood, for the crash log."""
    try:
        import threading as _t
        import traceback
        names = sorted("%s%s" % (th.name, "" if th.daemon else " (holds the app open)") for th in _t.enumerate())
        main = _t.main_thread()
        frame = sys._current_frames().get(main.ident)
        where = "".join(traceback.format_stack(frame)[-6:]) if frame is not None else "(not found)"
        return "threads: " + ", ".join(names) + "\\nthe main thread stood at:\\n" + where
    except Exception:
        return "threads: could not be read"


def _quit_797(why):
    """7.97: end Ingenium now: stop what it started, close its session, then end the process without waiting for anything left."""
    _QUIT_797["closing"] = True
    log_problem("quit: %s" % why)
    try:
        _quit_stop_797()
    except Exception:
        log_problem("quit: stopping failed", sys.exc_info())
    try:
        sys.stdout.flush()
        sys.stderr.flush()
    except Exception:
        pass
    os._exit(0)


def _closed_797(*_a, **_k):
    """7.97: the window closed. Stop the engine at once; should the app still be running 4 seconds after that (8 at most), end it."""
    if _QUIT_797.get("watch"):
        return
    _QUIT_797["watch"] = True
    _QUIT_797["closing"] = True
    import threading as _t

    def watch():
        try:
            _quit_stop_797(wait=4.0)
        except Exception:
            pass
        time.sleep(4.0)
        log_problem("quit: still running after the window closed; ending it now\\n" + _quit_threads_797())
        os._exit(0)
    _t.Thread(target=watch, daemon=True, name="quit-watch").start()


def _end_session():
''')

open(p, "w", encoding="utf-8").write(s)
print("patched", p)
