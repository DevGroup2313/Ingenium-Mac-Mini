"""Ingenium 7.44: local profiles on the Mac and Windows apps (the page's side is modules/r331.js and boot/profiles_boot.js).

Her words, on the live preview she approved (19 November 2026): "I approve of the preview ... Just add it to the damn app and let's move
on." Each person who uses Ingenium on a device has a profile; what a profile keeps stays apart from the others; the models are shared.

On the computer the page's desk and its other records are also kept on the disk (R61, R81 and after): desk.json and its kept copies, the
long texts (big/), the box of keys for her connections (cloud/), Fabrica's hub, drives, second copy and runs, the apps waiting for her
devices, the pages and the texts for training. The owner's profile keeps every one of them where it has always been. Another person's
profile keeps each in a folder of its own beside the owner's: the same parent, then profiles/<its id>/, then the same name, so desk.json
becomes profiles/p1abc/desk.json beside it. The models, the engine, the speech models, the pairing with her devices, the window's place
and the folder search's list of chosen folders stay shared.

The page says which profile it is (profile_use) before it opens again in another, and the app keeps that in profile_current.json beside
the models, so a restart opens the same profile's files; the page checks it before its first call (boot/profiles_boot.js). In another
person's profile, the computer's own records of its owner are not read: Claude Code's sessions and Ollama's chats are found empty. The
app's own sign-in key (Touch ID or Windows Hello, device_key_*) is named for the profile, so one profile's key never opens another's.
profile_drop removes a profile's folders when the owner removes the profile.

    python3 build/desktop/app_profiles_744.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_profile_use" in s:
    print("already patched", p)
    sys.exit(0)

# the bridge: three calls, in both of the app's bridge classes
rep('''    def load_state(self):
        return _load_state()
''', '''    # 7.44 (app_profiles_744.py): local profiles, each profile's files on the disk its own
    def profile_current(self):
        return _profile_current()

    def profile_use(self, pid=""):
        return _profile_use(pid)

    def profile_drop(self, pid):
        return _profile_drop(pid)

    def load_state(self):
        return _load_state()
''', 2)

rep('''def _entry():
    """Start the app (or its self-test), as a script or as a built app."""''', '''# ---- 7.44 (app_profiles_744.py): local profiles ----
_PROFILE = {"id": ""}
_PROFILE_ID_RE = re.compile(r"^p[a-z0-9]{1,24}$")


def _profile_file():
    try:
        d = _models_dir_unshifted()
        return (d.parent / "profile_current.json") if d is not None else None
    except Exception:
        return None


def _profile_load():
    try:
        f = _profile_file()
        if f and f.is_file():
            v = json.loads(f.read_text(encoding="utf-8")).get("id", "")
            _PROFILE["id"] = v if isinstance(v, str) and _PROFILE_ID_RE.match(v) else ""
    except Exception:
        _PROFILE["id"] = ""


def _profile_current():
    return {"ok": True, "id": _PROFILE["id"]}


def _profile_use(pid=""):
    pid = str(pid or "")
    if pid and not _PROFILE_ID_RE.match(pid):
        return {"ok": False, "error": "That is not a profile's name."}
    _PROFILE["id"] = pid
    try:
        f = _profile_file()
        if f:
            tmp = f.with_name(f.name + ".tmp")
            tmp.write_text(json.dumps({"id": pid}), encoding="utf-8")
            os.replace(str(tmp), str(f))
    except Exception as e:
        return {"ok": False, "error": "The profile could not be kept: %s" % e}
    return {"ok": True, "id": pid}


def _profile_shift(v, pid=None):
    """the place a record keeps in another person's profile: the same parent, profiles/<id>/, the same name"""
    pid = _PROFILE["id"] if pid is None else pid
    if not pid or v is None:
        return v
    import pathlib as _pl
    was_path = isinstance(v, _pl.PurePath)
    pp = _pl.Path(v)
    np_ = pp.parent / "profiles" / pid / pp.name
    try:
        np_.parent.mkdir(parents=True, exist_ok=True)
        if pp.is_dir():
            np_.mkdir(exist_ok=True)
    except Exception:
        pass
    return np_ if was_path else str(np_)


_PROFILE_PLACES = []


def _profile_wrap(name):
    f = globals().get(name)
    if not callable(f) or getattr(f, "_profiled", False):
        return

    def w(*a, **k):
        return _profile_shift(f(*a, **k))
    w._profiled = True
    w._plain = f
    globals()[name] = w
    _PROFILE_PLACES.append(name)


def _models_dir_unshifted():
    return _models_dir()


# the records each person keeps: the desk (its kept copies and the long texts are beside it), the keys box, Fabrica's records, the
# apps waiting for her devices, the pages, the texts for training
for _n in ("_desk_path", "_cloud_box_dir", "_hub_place_file", "_disk_file", "_copy_file", "_runs_dir", "_train_in_file", "_pages_dir", "_apps_dir"):
    _profile_wrap(_n)


def _profile_drop(pid):
    pid = str(pid or "")
    if not _PROFILE_ID_RE.match(pid):
        return {"ok": False, "error": "That is not a profile's name."}
    if pid == _PROFILE["id"]:
        return {"ok": False, "error": "The profile in use cannot be removed."}
    gone, roots = 0, set()
    for name in _PROFILE_PLACES:
        f = globals().get(name)
        plain = getattr(f, "_plain", None)
        if not plain:
            continue
        try:
            v = plain("outbox") if name == "_apps_dir" else plain()
        except Exception:
            continue
        if v is None:
            continue
        import pathlib as _pl
        roots.add(_pl.Path(v).parent / "profiles" / pid)
    for r in roots:
        try:
            if r.is_dir():
                shutil.rmtree(str(r), ignore_errors=True)
                gone += 1
        except Exception:
            pass
    return {"ok": True, "removed": gone}


# the computer's own records of its owner are not read in another person's profile
def _profile_guard(name, empty):
    f = globals().get(name)
    if not callable(f):
        return

    def w(*a, **k):
        if _PROFILE["id"]:
            return dict(empty)
        return f(*a, **k)
    globals()[name] = w


_profile_guard("_claude_sessions", {"ok": True, "files": [], "root": "", "profile": True})
_profile_guard("_claude_session_read", {"ok": False, "error": "Claude Code's sessions on this computer are read in the owner's profile only."})
_profile_guard("_ollama_chats_find", {"ok": True, "found": False, "looked": [], "profile": True})
_profile_guard("_ollama_chats_json", {"ok": False, "error": "Ollama's chats on this computer are read in the owner's profile only."})


# the app's own sign-in key is named for the profile
def _profile_key(name):
    f = globals().get(name)
    if not callable(f):
        return

    def w(kname, *a, **k):
        if _PROFILE["id"]:
            kname = "%s@%s" % (kname, _PROFILE["id"])
        return f(kname, *a, **k)
    globals()[name] = w


for _n in ("_device_key_make", "_device_key_get", "_device_key_drop"):
    _profile_key(_n)

_profile_load()


def _entry():
    """Start the app (or its self-test), as a script or as a built app."""''')

open(p, "w", encoding="utf-8").write(s)
print("patched", p)
