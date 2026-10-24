"""Ingenium 6.4 · on Windows, one copy at a time and safe graphics (desktop/app_win_64.py applied to ingenium_app.py), with
Windows stood in for: the registry's list of graphics chips, the named mutex, the window search.

  python3 -I rig/t_64_app_win.py path/to/patched/ingenium_app.py

Checks: pywebview's own walk over the API object (as it publishes the API to the page) finishes at once and never reaches
the window or its native form (it once wandered there without end, and the page never started); a PC with Intel graphics and no unfinished run starts with full graphics (no arguments, no note); the first start
after an unfinished run switches safe graphics on (the WebView2 arguments set before the window, a note written beside the
work) and every later start keeps them while the note is there; on AMD Radeon graphics they are on from the first start; a
second copy finds the name taken, brings the window forward and ends before main() reads anything or counts the run; the
first copy keeps its handle; the page's address carries &softgpu=1 only with safe graphics; on a Mac nothing changes."""
import importlib.util, os, sys, tempfile, types

APP = sys.argv[1]
passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    print(("PASS " if c else "FAIL ") + m + ("  " + str(d)[:300] if d is not None else ""))
    if c:
        passed += 1
    else:
        failed += 1


sys.modules["webview"] = types.ModuleType("webview")
spec = importlib.util.spec_from_file_location("ingenium_app", APP)
ia = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ia)
logs = []
ia.log_problem = lambda tag, exc_info=None: logs.append(tag)
home = tempfile.mkdtemp()
store = os.path.join(home, "Ingenium", "storage")
os.makedirs(store)
ia.storage_dir = lambda: store
CHIPS = ["Intel(R) Iris(R) Xe Graphics"]


class Key:
    def __init__(self, sub=None):
        self.sub = sub

    def __enter__(self):
        return self

    def __exit__(self, *a):
        return False


winreg = types.ModuleType("winreg")
winreg.HKEY_LOCAL_MACHINE = 1
winreg.OpenKey = lambda root, sub: Key(sub)


def enum_key(root, i):
    if i < len(CHIPS):
        return "%04d" % i
    if i == len(CHIPS):
        return "Configuration"
    raise OSError("no more")


winreg.EnumKey = enum_key
winreg.QueryValueEx = lambda k, name: (CHIPS[int(k.sub)], 1)
sys.modules["winreg"] = winreg
real_platform = sys.platform
sys.platform = "win32"
note = ia._safe_graphics_file()


def start(prior):
    os.environ.pop("WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS", None)
    del logs[:]
    soft = ia._prepare_windows_graphics(prior)
    return soft, os.environ.get("WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS", ""), list(logs)


soft, env, said = start(0)
ok(not soft and env == "" and not os.path.exists(note) and any(s.startswith("graphics: full") and "Iris" in s for s in said),
   "Intel graphics, no unfinished run: full graphics, no arguments, no note", (soft, env, said))
soft, env, said = start(1)
ok(soft and "--disable-gpu-compositing" in env and "CalculateNativeWinOcclusion" in env and os.path.isfile(note)
   and "did not finish" in open(note, encoding="utf-8").read() and os.path.dirname(note) == os.path.dirname(store),
   "the first start after an unfinished run: safe graphics, set before the window; a note beside the work (not in it)", (env, note, said))
soft, env, said = start(0)
ok(soft and "--disable-gpu-compositing" in env and any("safe graphics are on for this PC" in s for s in said),
   "every later start keeps safe graphics while the note is there", said)
os.remove(note)
soft, env, said = start(0)
ok(not soft and env == "", "the note deleted: full graphics again", (soft, env))
CHIPS[:] = ["AMD Radeon(TM) Graphics", "Microsoft Basic Display Adapter"]
soft, env, said = start(0)
ok(soft and "--disable-gpu-compositing" in env and os.path.isfile(note) and "AMD Radeon" in open(note, encoding="utf-8").read(),
   "AMD Radeon graphics (the HP): safe graphics from the very first start, remembered", said)
os.remove(note)
CHIPS[:] = ["Intel(R) UHD Graphics"]
os.environ["WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS"] = "--disable-gpu-compositing"
del logs[:]
ok(ia._prepare_windows_graphics(0) and os.environ["WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS"] == "--disable-gpu-compositing",
   "arguments set from outside the app are kept, and count as safe graphics", logs)
os.environ.pop("WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS", None)

# one copy at a time
state = {"err": 0, "handles": 0, "closed": 0, "forward": True}


class Fn:
    def __init__(self, f):
        self.f = f
        self.argtypes = self.restype = None

    def __call__(self, *a):
        return self.f(*a)


class K32:
    def __init__(self):
        self.CreateMutexW = Fn(lambda *a: (state.__setitem__("handles", state["handles"] + 1), 4242)[1])
        self.CloseHandle = Fn(lambda h: state.__setitem__("closed", state["closed"] + 1))


import ctypes
ctypes.WinDLL = lambda name, use_last_error=False: K32()
ctypes.get_last_error = lambda: state["err"]
ia._bring_window_forward = lambda wait_s=30.0: state["forward"]
del logs[:]
ok(ia._another_copy_is_open() is False and ia._single_instance == [4242] and state["closed"] == 0,
   "the first copy takes the name and keeps its handle", (ia._single_instance, state))
state["err"] = 183
del logs[:]
ok(ia._another_copy_is_open() is True and state["closed"] == 1 and "start: already open; brought its window forward" in logs,
   "a second copy finds the name taken, lets go of its own handle, brings the window forward and ends", (logs, state))
called = []
ia.find_app_html = lambda: called.append("find") or None
ia._begin_session = lambda: called.append("session") or 0
ia.main()
ok(called == [], "main() of a second copy ends before it looks for the page or counts the run", called)
told = []
ia.tell_user = lambda t, title=None: told.append(t)
state["forward"] = False
del logs[:]
ok(ia._another_copy_is_open() is True and told and "still opening" in told[0], "a second copy while the first window is not up yet says so calmly", told)
state["err"] = 0

# the page is told
made = []
wv = types.SimpleNamespace(create_window=lambda title, url=None, html=None, **k: made.append(url) or "win", screens=[])
ia._start_local_server = lambda d, n=None: 17953
ia._page_mark = lambda p: "abc"
ia._window_start = lambda w: (1200, 800)
ia._GFX_SOFT[0] = False
ia._make_window(wv, None, "file:///x/ingenium.html", os.path.join(home, "ingenium.html"))
ia._GFX_SOFT[0] = True
ia._make_window(wv, None, "file:///x/ingenium.html", os.path.join(home, "ingenium.html"))
ok(made[0] == "http://127.0.0.1:17953/ingenium.html?b=abc" and made[1] == "http://127.0.0.1:17953/ingenium.html?b=abc&softgpu=1",
   "the page's address carries &softgpu=1 only with safe graphics (same origin, so the same stored work)", made)

# pywebview's own walk over the API object (webview/util.py, inject_pywebview's get_functions, pywebview 6.2.1, as it is)
# with the window it holds: its native form stood in for by an object whose every property is a new object, as .NET's are
class Native:
    made = [0]

    def __getattr__(self, name):
        if name.startswith("__"):
            raise AttributeError(name)
        Native.made[0] += 1
        if Native.made[0] > 20000:
            raise SystemExit("walked into the native form")
        return Native()

    def __dir__(self):
        return ["Controls", "Parent", "Handle", "TopLevelControl", "Owner", "ActiveControl", "Site", "Container", "Menu", "Region",
                "BindingContext", "DataBindings", "Font", "Cursor", "AccessibilityObject", "Bounds", "ClientRectangle", "Padding",
                "Margin", "Tag", "ContextMenuStrip", "Icon", "Layout", "LayoutEngine", "Location", "Size", "WindowTarget",
                "MdiParent", "ParentForm", "Visible", "Text", "Name", "BackColor", "ForeColor", "Dock", "Anchor", "Events",
                "CreateParams", "DisplayRectangle", "Browser"]


class FakeWindow:
    def __init__(self):
        self.native = Native()
        self.title = "Ingenium"

    def evaluate_js(self, script, callback=None):
        return None


def walk(obj):
    import inspect
    exposed = []

    def get_args(func):
        return list(inspect.getfullargspec(func).args)

    def get_functions(obj, base_name="", functions=None):
        if id(obj) in exposed:
            return functions
        exposed.append(id(obj))
        if functions is None:
            functions = {}
        for name in dir(obj):
            try:
                full_name = f"{base_name}.{name}" if base_name else name
                if name.startswith("_"):
                    continue
                attr = getattr(obj, name)
                if not getattr(attr, "_serializable", True):
                    continue
                if inspect.ismethod(attr) or inspect.isfunction(attr):
                    functions[full_name] = get_args(attr)[1:]
                elif inspect.isclass(attr) or (isinstance(attr, object) and not callable(attr) and hasattr(attr, "__module__")):
                    get_functions(attr, full_name, functions)
            except SystemExit:
                raise
            except Exception:
                continue
        return functions
    return get_functions(obj)


for cls in (ia.IngeniumApiSingle, ia.IngeniumApi):
    api = cls("http://127.0.0.1:17953/ingenium.html")
    api._main_window = FakeWindow()
    Native.made[0] = 0
    try:
        fns = walk(api)
        finished = True
    except SystemExit:
        fns, finished = {}, False
    ok(finished and Native.made[0] == 0 and fns and not any("window" in k.split(".")[0] and "." in k for k in fns) and all("." not in k for k in fns),
       "%s: pywebview's walk over the API object finishes at once and never reaches the window or its native form (%d functions)" % (cls.__name__, len(fns)),
       {"finished": finished, "native_steps": Native.made[0], "nested": [k for k in fns if "." in k][:5]})
    ok(not hasattr(api, "main_window"), "%s: the window is kept as _main_window, which pywebview skips" % cls.__name__)

# a Mac
sys.platform = "darwin"
state["err"] = 183
os.environ.pop("WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS", None)
ok(ia._another_copy_is_open() is False and ia._prepare_windows_graphics(5) is False and "WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS" not in os.environ,
   "on a Mac nothing changes")
sys.platform = real_platform
print("\n%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
