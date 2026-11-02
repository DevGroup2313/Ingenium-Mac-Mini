"""Ingenium 6.4: on Windows, one copy at a time, and safe graphics after a start that did not finish (patch for ingenium_app.py,
Mac and Windows; on a Mac nothing changes but the first point, which is the same there).

The owner's words (24 October 2026): "Ingenium keeps on crashing before opening on my windows laptop". The laptop is the HP
with AMD Radeon graphics where the Forge's window once died (Forge-windows the_forge_app.py, _prepare_windows_graphics: "the
signature of a crash inside the graphics process, which is why nothing was ever written to the log"). The Forge has carried
two cures since 9s57 and 9s58; Ingenium's Windows app had neither, so every start could die the same way, and each extra
click while the page was still coming up started another copy that counted as a run that never finished (two of those, and
the stored work was moved aside). Now, as in the Forge:
  - the app's window is kept on its API object as _main_window, not main_window. Found on a clean Windows PC (the check
    Ingenium-HPWindows .github/workflows/windows-home-check.yml): the window opened and its page never started. When a page
    loads, pywebview (6.x) publishes the API object's functions by walking every public attribute it holds; through
    main_window it reached the window's native form (window.native, a .NET WinForms form) and wandered through .NET objects
    from the wrong thread, where every step is a new wrapper and its guard against going round in circles never trips. While
    it walked it held Python's lock, and every request the page makes passes through Python, so the page starved: pywebview's
    own "ready" never came, the load watchdog waited 20 seconds on each of its questions, and depending on the PC the window
    stayed empty or the app ran out of memory and closed. pywebview skips a name that starts with "_"; the Forge's own app
    has always called it _main_window;
  - a second click brings the open window forward and ends (a named mutex, Local\\<app>.windows.single);
  - safe graphics (Edge WebView2 started with --disable-gpu-compositing --disable-features=CalculateNativeWinOcclusion, set
    before the web view is made) are switched on by the first start that finds an unfinished run, and remembered for the PC
    in a small note beside the work (%LOCALAPPDATA%\\<app>\\<app>_safe_graphics.txt; deleting it tries full graphics again);
  - on AMD Radeon graphics they are on from the very first start, so that laptop never has to crash once to get them;
  - the page is told (?softgpu=1) and sheds its dearest paint (modules/r169.js).

    python3 build/desktop/app_win_64.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()
if "_another_copy_is_open" in s:
    print("already patched", p)
    sys.exit(0)
if "_main_window" in s or s.count("main_window") < 3:
    sys.exit("%s: main_window is not as this patch expects" % p)
s = s.replace("main_window", "_main_window")


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


WIN = r'''
# 6.4 (app_win_64.py): on Windows, one copy at a time, and safe graphics after a start that did not finish, as the Forge does
SINGLE_INSTANCE_NAME = "Local\\" + APP_FOLDER + ".windows.single"
_single_instance = []
SAFE_GRAPHICS_ARGS = "--disable-gpu-compositing --disable-features=CalculateNativeWinOcclusion"
_GFX_SOFT = [False]


def _bring_window_forward(wait_s=30.0):
    """Find the open copy's window by its title (only pywebview's own window class, or one of its message boxes, counts)
    and bring it forward: restored when minimised, shown as it is otherwise. The first copy may still be making its window,
    so this looks again for up to wait_s seconds."""
    import ctypes
    from ctypes import wintypes
    user32 = ctypes.WinDLL("user32", use_last_error=True)
    user32.FindWindowExW.argtypes = (wintypes.HWND, wintypes.HWND, wintypes.LPCWSTR, wintypes.LPCWSTR)
    user32.FindWindowExW.restype = wintypes.HWND
    user32.GetClassNameW.argtypes = (wintypes.HWND, wintypes.LPWSTR, ctypes.c_int)
    user32.GetClassNameW.restype = ctypes.c_int
    user32.IsIconic.argtypes = (wintypes.HWND,)
    user32.IsIconic.restype = wintypes.BOOL
    user32.ShowWindow.argtypes = (wintypes.HWND, ctypes.c_int)
    user32.ShowWindow.restype = wintypes.BOOL
    user32.SetForegroundWindow.argtypes = (wintypes.HWND,)
    user32.SetForegroundWindow.restype = wintypes.BOOL

    def find():
        after = None
        for _ in range(64):
            hwnd = user32.FindWindowExW(None, after, None, WINDOW_TITLE)
            if not hwnd:
                return None
            name = ctypes.create_unicode_buffer(256)
            user32.GetClassNameW(hwnd, name, 256)
            if name.value.startswith("WindowsForms") or name.value == "#32770":
                return hwnd
            after = hwnd
        return None

    end = time.monotonic() + wait_s
    hwnd = find()
    while not hwnd and time.monotonic() < end:
        time.sleep(0.25)
        hwnd = find()
    if not hwnd:
        return False
    user32.ShowWindow(hwnd, 9 if user32.IsIconic(hwnd) else 5)
    user32.SetForegroundWindow(hwnd)
    return True


def _another_copy_is_open():
    """True when this app is already open in this sign-in: its window is brought forward and this copy ends at once,
    before the session mark is read or written. A named mutex; the first copy keeps its handle for its whole life, and
    Windows lets go of it when the process ends, so a crash never leaves the name behind. Windows only; anything that goes
    wrong here opens the app as usual."""
    if not sys.platform.startswith("win"):
        return False
    try:
        import ctypes
        from ctypes import wintypes
        kernel32 = ctypes.WinDLL("kernel32", use_last_error=True)
        kernel32.CreateMutexW.argtypes = (ctypes.c_void_p, wintypes.BOOL, wintypes.LPCWSTR)
        kernel32.CreateMutexW.restype = wintypes.HANDLE
        handle = kernel32.CreateMutexW(None, False, SINGLE_INSTANCE_NAME)
        err = ctypes.get_last_error()
        if not handle:
            log_problem("single copy: no guard on this PC (error %d); opening as usual" % err)
            return False
        if err != 183:   # ERROR_ALREADY_EXISTS
            _single_instance.append(handle)
            return False
        try:
            kernel32.CloseHandle.argtypes = (wintypes.HANDLE,)
            kernel32.CloseHandle(handle)
        except Exception:
            pass
    except Exception as exc:
        log_problem("single copy: no guard on this PC (%s); opening as usual" % (exc,))
        return False
    try:
        if _bring_window_forward():
            log_problem("start: already open; brought its window forward")
        else:
            log_problem("start: already open, but its window has not appeared yet")
            tell_user("%s is still opening.\n\nIts window will appear in a moment." % APP_NAME)
    except Exception as exc:
        log_problem("start: already open; its window could not be brought forward (%s)" % (exc,))
    return True


def _safe_graphics_file():
    """The note that keeps safe graphics on for this PC: beside the stored work (not inside it, which a fresh start moves
    aside), so an update or a new install keeps it."""
    d = storage_dir()
    d = os.path.dirname(d.rstrip("\\/")) if d else os.path.expanduser("~")
    return os.path.join(d, APP_FOLDER.lower() + "_safe_graphics.txt")


def _graphics_chips():
    """The names of this PC's graphics chips, as Windows lists them (the display adapters' class key), or [] when they
    cannot be read."""
    names = []
    try:
        import winreg
        base = r"SYSTEM\CurrentControlSet\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}"
        with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, base) as root:
            for i in range(32):
                try:
                    sub = winreg.EnumKey(root, i)
                except OSError:
                    break
                if not sub.isdigit():
                    continue
                try:
                    with winreg.OpenKey(root, sub) as k:
                        names.append(str(winreg.QueryValueEx(k, "DriverDesc")[0]))
                except OSError:
                    continue
    except Exception:
        pass
    return names


def _prepare_windows_graphics(prior_bad):
    """Choose the arguments Edge WebView2 starts with, on Windows only; True when safe graphics are used. Full graphics on a
    PC that has never had a run end badly; safe graphics from the first start that finds an unfinished run, remembered in
    the note so every later start uses them; on AMD Radeon graphics, safe from the first start. Every start writes one line
    saying which it used. Must run before the web view is made: that is when the arguments are read."""
    if not sys.platform.startswith("win"):
        return False
    existing = os.environ.get("WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS", "").strip()
    path = _safe_graphics_file()
    remembered = os.path.isfile(path)
    chips = _graphics_chips()
    amd = [c for c in chips if re.search(r"radeon|\bamd\b|\bati\b", c, re.I)]
    if not remembered and prior_bad < 1 and not amd:
        if "--disable-gpu-compositing" in existing:
            log_problem("graphics: safe, set from outside the app (%s)" % existing)
            return True
        log_problem("graphics: full (the graphics chip helps draw the window; %s)" % (", ".join(chips) or "chip not named"))
        return False
    if remembered:
        why = "safe graphics are on for this PC, after a run that did not finish. To try full graphics again, close %s and delete %s" % (APP_NAME, path)
    else:
        why = (("AMD Radeon graphics (%s): safe graphics from the first start" % ", ".join(amd)) if amd and prior_bad < 1
               else "safe graphics switched on for this PC by themselves, because the last run did not finish")
        try:
            with open(path, "w", encoding="utf-8") as fh:
                fh.write("Safe graphics are on for %s on this PC.\n\n"
                         "%s switched them on by itself on %s: %s.\n"
                         "With safe graphics the window is drawn without the graphics chip's help, a little less smooth and safe.\n\n"
                         "To try full graphics again: close %s, delete this file, and open %s.\n"
                         "If its window ever closes by itself again, safe graphics switch back on by themselves.\n"
                         % (APP_NAME, APP_NAME, time.strftime("%d %B %Y at %H:%M"), why, APP_NAME, APP_NAME))
        except Exception as exc:
            log_problem("graphics: safe graphics could not be remembered on this PC (%s)" % (exc,))
    args = (existing + " " + SAFE_GRAPHICS_ARGS).strip() if "--disable-gpu-compositing" not in existing else existing
    os.environ["WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS"] = args
    log_problem("graphics: %s (%s)" % (why, args))
    return True


def main():'''
rep("\n\ndef main():", "\n" + WIN)
# the first thing main does: a second copy ends here, before anything is started or counted
rep('''def main():
    global _APP_HTML_PATH
    app_html = find_app_html()''', '''def main():
    global _APP_HTML_PATH
    if _another_copy_is_open():
        return
    app_html = find_app_html()''')
# safe graphics are chosen before the window is made
rep('''    _prior_bad = _begin_session()
    _lite_start(_prior_bad)''', '''    _prior_bad = _begin_session()
    _lite_start(_prior_bad)
    try:
        _GFX_SOFT[0] = _prepare_windows_graphics(_prior_bad)
    except Exception:
        log_problem("graphics: could not be chosen; full graphics", sys.exc_info())''')
# the page is told
rep('''        local_url = "http://127.0.0.1:%d/%s?b=%s" % (port, name, _page_mark(app_html_path))''',
    '''        local_url = "http://127.0.0.1:%d/%s?b=%s" % (port, name, _page_mark(app_html_path))
        if _GFX_SOFT[0]:
            local_url += "&softgpu=1"''')
open(p, "w", encoding="utf-8", newline="").write(s)
print("patched", p)
