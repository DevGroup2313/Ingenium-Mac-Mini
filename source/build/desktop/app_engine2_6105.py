"""Ingenium 6.10.5 (4 November 2026): a newer engine beside the proven one (patch for ingenium_app.py, Mac and Windows; applied after
app_parts_6102.py).

Her words (3 November 2026): "I don't want to lose my reliable llama cpp engine, I want the option of a newer engine where it tested
and proven to work and work well but I still want the llama engine kept optional or in some cases as a backup or default, depending
on what works best." The proven engine (llama.cpp b11321) stays the default. A copy of the app may also carry a newer llama.cpp
(engine-next/<platform>/, beside engine/<platform>/), put in only when its cloud build's own self-test answered with it. Then:
  automatic (the default)  each model runs on the proven engine, unless its kind (its file's general.architecture) is one only the
                           newer engine lists (ARCHS.txt beside each engine, written when it was built);
  newer                    every model the newer engine can load runs on it;
  proven                   only the proven engine, as before.
If the newer engine cannot load a model (its process ends while loading), the proven engine loads it at once, and that model goes
to the proven engine for the rest of the session. A self-test can be run on the newer engine: --selftest-engine newer.
Three calls for the page:
  engine_choice()              both engines (version, kinds they list), the choice, and which engine runs the model now
  engine_choice_set(choice)    "auto", "newer" or "proven"; kept in the app's data folder (engine.json)

    python3 build/desktop/app_engine2_6105.py <repo>/ingenium_app.py"""
import sys

MARK = "_engine_next_dir"

CODE = r'''

# ---- 6.10.5: a newer engine beside the proven one (app_engine2_6105.py) ----
_ENGINE_NEXT_DIR_FOUND = []
_ENGINE_USE = {"next": False, "forced": None}     # forced: "newer" or "proven", for the self-test
_ENGINE_KIND = ["proven"]                         # which engine the running model was started on
_ENGINE_NEXT_FAILED = set()                       # model files the newer engine could not load, this session
_ENGINE_CHOICES = ("auto", "newer", "proven")


def _engine_next_dir():
    """The newer engine's folder (engine-next/<platform>/, or packed as engine-next/<platform>.zip), or None."""
    if _ENGINE_NEXT_DIR_FOUND and os.path.isfile(os.path.join(_ENGINE_NEXT_DIR_FOUND[0], _ENGINE_EXE)):
        return _ENGINE_NEXT_DIR_FOUND[0]
    plat = _engine_platform()
    found = None
    for root in _app_roots():
        d = os.path.join(root, "engine-next", plat)
        if os.path.isfile(os.path.join(d, _ENGINE_EXE)):
            found = d
            break
    if not found:
        for root in _app_roots():
            z = os.path.join(root, "engine-next", plat + ".zip")
            if os.path.isfile(z):
                found = _engine_unpack(z, plat)
                if found:
                    break
    if found:
        del _ENGINE_NEXT_DIR_FOUND[:]
        _ENGINE_NEXT_DIR_FOUND.append(found)
    return found


_engine_dir_proven = _engine_dir


def _engine_dir():
    if _ENGINE_USE["next"] or _ENGINE_USE["forced"] == "newer":
        d = _engine_next_dir()
        if d:
            return d
    return _engine_dir_proven()


def _engine_meta(d, name):
    """VERSION.txt or ARCHS.txt beside an engine (or, inside a Mac app, among its resources)."""
    if not d:
        return None
    kind = "engine-next" if os.path.normpath(os.path.dirname(d)).endswith("engine-next") else "engine"
    for p in [os.path.join(d, name)] + [os.path.join(r, kind, _engine_platform(), name) for r in _app_roots()]:
        if os.path.isfile(p):
            try:
                with open(p, encoding="utf-8") as fh:
                    return fh.read()
            except Exception:
                return None
    return None


def _engine_archs(d):
    """The kinds of model an engine lists (its llama-arch.cpp, written beside it when it was built), or None when unknown."""
    t = _engine_meta(d, "ARCHS.txt")
    if not t:
        return None
    names = set(x.strip() for x in t.split() if x.strip() and x.strip() != "(unknown)")
    return names or None


def _gguf_arch(path):
    """A model file's kind: general.architecture in its first bytes (for a model in parts, the first part's). None if unreadable."""
    import struct
    try:
        with open(path, "rb") as fh:
            buf = fh.read(1 << 20)
        if buf[:4] != b"GGUF":
            return None
        off = 24
        n = struct.unpack_from("<Q", buf, 16)[0]
        sizes = {0: 1, 1: 1, 2: 2, 3: 2, 4: 4, 5: 4, 6: 4, 7: 1, 10: 8, 11: 8, 12: 8}

        def skip(t, off):
            if t == 8:
                ln = struct.unpack_from("<Q", buf, off)[0]
                return off + 8 + ln
            if t == 9:
                et = struct.unpack_from("<I", buf, off)[0]
                cnt = struct.unpack_from("<Q", buf, off + 4)[0]
                off += 12
                for _ in range(cnt):
                    off = skip(et, off)
                return off
            return off + sizes[t]
        for _ in range(min(n, 256)):
            kl = struct.unpack_from("<Q", buf, off)[0]
            key = buf[off + 8:off + 8 + kl].decode("utf-8", "replace")
            off += 8 + kl
            t = struct.unpack_from("<I", buf, off)[0]
            off += 4
            if key == "general.architecture" and t == 8:
                ln = struct.unpack_from("<Q", buf, off)[0]
                return buf[off + 8:off + 8 + ln].decode("utf-8", "replace")
            off = skip(t, off)
    except Exception:
        return None
    return None


def _engine_choice_file():
    return os.path.join(str(_rag_app_dir()), "engine.json")


def _engine_choice_get():
    try:
        with open(_engine_choice_file(), encoding="utf-8") as fh:
            c = json.load(fh).get("choice")
        return c if c in _ENGINE_CHOICES else "auto"
    except Exception:
        return "auto"


def _engine_choice_set(choice):
    choice = str(choice or "")
    if choice not in _ENGINE_CHOICES:
        return {"ok": False, "error": "That is not one of the engine choices."}
    try:
        os.makedirs(os.path.dirname(_engine_choice_file()), exist_ok=True)
        with open(_engine_choice_file(), "w", encoding="utf-8") as fh:
            json.dump({"choice": choice}, fh)
    except Exception:
        log_problem("engine_choice_set failed", sys.exc_info())
        return {"ok": False, "error": "The choice could not be kept."}
    return {"ok": True, "choice": choice}


def _engine_pick_next(path):
    """Whether this model should start on the newer engine."""
    forced = _ENGINE_USE["forced"]
    if forced:
        return forced == "newer" and bool(_engine_next_dir())
    nd = _engine_next_dir()
    if not nd or path in _ENGINE_NEXT_FAILED:
        return False
    choice = _engine_choice_get()
    if choice == "proven":
        return False
    arch = _gguf_arch(path)
    nxt, old = _engine_archs(nd), _engine_archs(_engine_dir_proven())
    if choice == "newer":
        return not (nxt and arch and arch not in nxt)
    # automatic: the newer engine only for a kind the proven one does not list and the newer one does
    return bool(arch and old and nxt and arch not in old and arch in nxt)


_engine_launch_one = _engine_launch


def _engine_launch(path, n_ctx, mmp, use_gpu, drafter=None):
    nxt = _engine_pick_next(path)
    _ENGINE_USE["next"] = nxt
    try:
        out = _engine_launch_one(path, n_ctx, mmp, use_gpu, drafter)
    finally:
        _ENGINE_USE["next"] = False
    _ENGINE_KIND[0] = "newer" if (nxt or _ENGINE_USE["forced"] == "newer") else "proven"
    return out


_engine_status_one = _engine_status


def _engine_status():
    """As before; and when the newer engine could not load a model, the proven engine loads it at once."""
    try:
        with _ENGINE_LOCK:
            p, state, args, gpu, mid = _ENGINE["proc"], _ENGINE["state"], _ENGINE["args"], _ENGINE["gpu"], _ENGINE["model_id"]
        if (p is not None and p.poll() is not None and state == "loading" and _ENGINE_KIND[0] == "newer" and args
                and not _ENGINE_USE["forced"]):
            _ENGINE_NEXT_FAILED.add(args[0])
            log_problem("engine: the newer engine could not load %s; the proven engine loads it" % os.path.basename(args[0]))
            proc, port2, _a = _engine_launch(args[0], args[1], args[2], bool(gpu), args[3] if len(args) > 3 else None)
            note = "The newer engine could not load this model, so the proven engine runs it."
            with _ENGINE_LOCK:
                if _ENGINE["proc"] is p:
                    _ENGINE.update(proc=proc, port=port2, state="loading", log=[], note=note, started=time.time())
            return {"state": "loading", "port": port2, "model_id": mid, "log": [], "seconds": 0.0, "note": note, "engine_kind": "proven"}
    except Exception:
        log_problem("engine: the fall back to the proven engine failed", sys.exc_info())
    r = _engine_status_one()
    if isinstance(r, dict):
        r["engine_kind"] = _ENGINE_KIND[0]
    return r


def _engine_choice():
    nd, od = _engine_next_dir(), _engine_dir_proven()
    ver = lambda d: ((_engine_meta(d, "VERSION.txt") or "").strip() or ("llama.cpp" if d else ""))
    a_old, a_new = _engine_archs(od), _engine_archs(nd)
    with _ENGINE_LOCK:
        running = _ENGINE["state"] in ("loading", "ready") and _ENGINE["proc"] is not None
    return {"choice": _engine_choice_get(),
            "proven": {"available": bool(od), "version": ver(od), "kinds": len(a_old) if a_old else None},
            "newer": {"available": bool(nd), "version": ver(nd), "kinds": len(a_new) if a_new else None,
                      "only": sorted(a_new - a_old) if (a_new and a_old) else []},
            "running": _ENGINE_KIND[0] if running else None}
'''

METHODS = '''
    # 6.10.5: a newer engine beside the proven one (app_engine2_6105.py)
    def engine_choice(self):
        return _engine_choice()

    def engine_choice_set(self, choice):
        return _engine_choice_set(choice)
'''

if __name__ == "__main__":
    p = sys.argv[1]
    s = open(p, encoding="utf-8").read()
    if MARK in s:
        print("already patched", p)
        sys.exit(0)

    def rep(old, new, n=1):
        global s
        c = s.count(old)
        if c != n:
            sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
        s = s.replace(old, new)

    # after every function it wraps (the engine's start, launch and status, and the parts patch), before the sharing section
    anchor = "\n# R74: sharing this computer's models with the person's other devices.\n"
    i = s.find(anchor)
    j = s.rfind("\n# ---", 0, i)
    if i < 0 or j < 0 or s.count(anchor) != 1 or s.find("def _engine_status():") > j or s.find("def _engine_launch(") > j:
        sys.exit("%s: the place for the code was not found" % p)
    s = s[:j] + CODE.rstrip("\n") + "\n\n" + s[j:]
    anchor2 = "    def engine_status(self):\n        return _engine_status()\n"
    rep(anchor2, anchor2 + METHODS, 2)
    # the self-test can be run on the newer engine (or forced onto the proven one)
    rep('    model, out = arg("--selftest-model"), arg("--selftest-out")\n',
        '    model, out = arg("--selftest-model"), arg("--selftest-out")\n'
        '    if arg("--selftest-engine") in ("newer", "proven"):    # 6.10.5: the self-test on the newer engine\n'
        '        _ENGINE_USE["forced"] = arg("--selftest-engine")\n')
    open(p, "w", encoding="utf-8").write(s)
    print("patched", p)
