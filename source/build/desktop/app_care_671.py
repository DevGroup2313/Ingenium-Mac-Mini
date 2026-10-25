"""Ingenium 6.7.1: the stored work is kept, and a page whose process stops comes back by itself (patch for ingenium_app.py,
Mac and Windows; the first point is the same on both, the rest is Windows' alone).

The owner's words (25 October 2026), on both HP laptops: "the app's page keeps on saying Not responding and crashes the
whole page", and kits that came out jumbled or incomplete. What the app did with a run that did not finish:
  - every run that did not end with the window closed counted as a crash: a Windows restart for an update with the app
    open, the "Close the program" Windows offers for a window that says Not responding, Task Manager. One such run turned
    safe graphics on for good (app_win_64.py), and two in a row moved the whole stored work aside at the next start
    (storage.crashed-N), so the app opened empty, with no word said. The next time it happened with the same count, the
    folder kept the first time was deleted to make room;
  - nothing listened when the web view's own processes stopped, so a page whose process had ended stayed blank or grey
    until the app was closed, and nothing was written down.
Now:
  - the stored work is moved aside only when the page itself did not come up at two starts in a row (the case the step was
    made for: a save that stops every start). A run whose page came up and ended any way at all does not count. The kept
    folder has a name of its own (storage.kept-<date and time>), nothing kept is ever deleted, it is not done again within
    the hour, and the person is told where the work is and how to bring it back;
  - on Windows, Windows ending the session (shut down, restart, sign out) with the app open ends the run as closing the
    window does;
  - on Windows, the web view's ProcessFailed event is listened to: when the page's process has ended (it crashed, ran out
    of memory, or was ended), the page is loaded again at once, up to three times in two minutes, and after that the
    person is told; when the page's process stops answering, the time is written down and the page is left to finish
    (loading it again would lose what it was doing); when the graphics process stops twice in a run, safe graphics are
    kept for the next start, the evidence app_win_64.py waited for a crash to find; when the web view itself has gone, the
    person is told to open the app again. The web view's version is written down once.

    python3 build/desktop/app_care_671.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()
if "_care_attach" in s:
    print("already patched", p)
    sys.exit(0)


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


CARE = r'''
# 6.7.1 (app_care_671.py): the stored work is kept, and a page whose process stops comes back by itself
_CARE = {"attached": False, "reloads": [], "told": False, "gpu": 0, "refs": []}


def _start_flag():
    f = _session_flag()
    return None if f is None else f.with_name("ingenium_start.flag")


def _begin_start():
    """How many starts in a row ended before the page came up. This start is counted too, until the page comes up."""
    f = _start_flag()
    if f is None:
        return 0
    n = 0
    try:
        if f.exists():
            n = int(f.read_text().strip() or "1")
    except Exception:
        n = 1
    try:
        f.write_text(str(n + 1))
    except Exception:
        pass
    return n


def _start_ok():
    """The page came up (or this run ended cleanly, or it cannot be judged): this start does not count."""
    f = _start_flag()
    try:
        if f is not None and f.exists():
            f.unlink()
    except Exception:
        pass


def _move_store_aside(n):
    """The page did not come up at n starts in a row: the stored work is moved aside, whole, under a name of its own, and
    the person is told. Nothing kept is deleted, and it is not done again within the hour."""
    try:
        store = storage_dir()
        if not (store and os.path.isdir(store)):
            return
        import glob
        base = store.rstrip("\\/")
        def made(k):  # when it was moved aside: the date and time in its name (a folder's own time is its last change)
            try:
                return time.mktime(time.strptime(k[len(base) + 6:len(base) + 23], "%Y-%m-%d-%H%M%S"))
            except Exception:
                return os.path.getmtime(k)
        recent = [k for k in glob.glob(base + ".kept-*") if time.time() - made(k) < 3600]
        if recent:
            log_problem("start: the page did not come up at %d starts in a row; the work was already moved aside within "
                        "the hour (%s), so it is left where it is" % (n, recent[0]))
            return
        aside = base + ".kept-" + time.strftime("%Y-%m-%d-%H%M%S")
        k = 2
        while os.path.exists(aside):
            aside = base + ".kept-" + time.strftime("%Y-%m-%d-%H%M%S") + "-%d" % k
            k += 1
        os.rename(store, aside)
        log_problem("start: the page did not come up at %d starts in a row; the stored work was moved aside, whole, to "
                    "%s (nothing deleted); starting fresh" % (n, aside))
        msg = ("%s did not come up the last %d times it was opened, so this time it starts with a fresh place for its "
               "work.\n\nNothing was deleted. Everything it held before is kept, whole, in:\n  %s\n\n"
               "To bring it back: close %s, rename the folder called storage beside it to storage-new, rename the kept "
               "folder to storage, and open %s again. A backup file (Settings, Backup) can also be restored."
               % (APP_NAME, n, aside, APP_NAME, APP_NAME))
        threading.Thread(target=tell_user, args=(msg,), daemon=True).start()
    except Exception:
        log_problem("start: fresh-start move failed", sys.exc_info())


def _care_say(text):
    if not _CARE["told"]:
        _CARE["told"] = True
        threading.Thread(target=tell_user, args=(text,), daemon=True).start()


def _care_attach(window):
    """Windows: listen for the web view's processes stopping, and for Windows ending the session. Once, from the first
    page load (the web view exists by then); the listening itself is set up on the window's own thread."""
    if _CARE["attached"] or not sys.platform.startswith("win"):
        return
    _CARE["attached"] = True
    try:
        import clr  # noqa: F401  (pythonnet, already loaded by the window)
        from System import Func, Type
        from Microsoft.Web.WebView2.Core import CoreWebView2ProcessFailedKind as K
        from Microsoft.Win32 import SystemEvents
        form = getattr(window, "native", None)
        wv = getattr(form, "webview", None) if form is not None else None
        if wv is None:
            log_problem("care: the web view could not be reached; a page whose process stops will not come back by itself")
            return

        def failed(_sender, args):
            try:
                kind = args.ProcessFailedKind
                more = ""
                try:
                    more = " (%s, exit code %s)" % (args.Reason, args.ExitCode)
                except Exception:
                    pass
                now = time.time()
                if kind == K.RenderProcessExited:
                    recent = [t for t in _CARE["reloads"] if now - t < 120]
                    if len(recent) >= 3:
                        log_problem("page: its process stopped again%s, after three new starts in two minutes; left as it is" % more)
                        _care_say("%s's page stopped working several times in a row.\n\nYour work is saved as you go. "
                                  "Please close %s and open it again.\n\nDetails were written to:\n  %s"
                                  % (APP_NAME, APP_NAME, crash_log_path()))
                        return
                    recent.append(now)
                    _CARE["reloads"] = recent
                    log_problem("page: its process stopped%s; the page is loaded again" % more)
                    wv.CoreWebView2.Reload()
                elif kind == K.RenderProcessUnresponsive:
                    log_problem("page: its process is not answering%s; left to finish what it is doing" % more)
                elif kind == K.GpuProcessExited:
                    _CARE["gpu"] += 1
                    log_problem("graphics: the graphics process stopped%s (%d this run)" % (more, _CARE["gpu"]))
                    path = _safe_graphics_file()
                    if _CARE["gpu"] >= 2 and not _GFX_SOFT[0] and not os.path.isfile(path):
                        with open(path, "w", encoding="utf-8") as fh:
                            fh.write("Safe graphics are on for %s on this PC.\n\n%s switched them on by itself on %s: its "
                                     "graphics process stopped twice in one run.\nWith safe graphics the window is drawn "
                                     "without the graphics chip's help, a little less smooth and safe.\n\nTo try full "
                                     "graphics again: close %s, delete this file, and open %s.\n"
                                     % (APP_NAME, APP_NAME, time.strftime("%d %B %Y at %H:%M"), APP_NAME, APP_NAME))
                        log_problem("graphics: safe graphics kept for the next start (%s)" % path)
                elif kind == K.BrowserProcessExited:
                    log_problem("web view: its own process stopped%s; the window cannot show the page until %s is opened again"
                                % (more, APP_NAME))
                    _care_say("%s's window stopped working (its web view closed).\n\nYour work is saved as you go. "
                              "Please close %s and open it again." % (APP_NAME, APP_NAME))
                else:
                    log_problem("web view: a helper process stopped (%s)%s" % (kind, more))
            except BaseException:
                log_problem("care: a stopped process could not be handled", sys.exc_info())

        def ended(_sender, args):
            try:
                log_problem("session: Windows is ending the session (%s); this run counts as finished" % (args.Reason,))
                _end_session()
            except BaseException:
                pass

        def attach():
            core = wv.CoreWebView2
            if core is None:
                log_problem("care: the web view is not ready; a page whose process stops will not come back by itself")
                return None
            core.ProcessFailed += failed
            SystemEvents.SessionEnded += ended
            _CARE["refs"] += [failed, ended]
            ver = ""
            try:
                ver = str(core.Environment.BrowserVersionString)
            except Exception:
                pass
            log_problem("care: listening for the page's processes stopping and for Windows ending the session (web view %s)"
                        % (ver or "version unknown"))
            return None
        form.Invoke(Func[Type](attach))
    except BaseException:
        log_problem("care: could not listen to the web view", sys.exc_info())

'''

rep('\n_RP_MONITOR = None\n', CARE + '\n_RP_MONITOR = None\n')
rep('    """A clean exit removes the breadcrumb, so only bad endings accumulate."""\n    f = _session_flag()',
    '    """A clean exit removes the breadcrumb, so only bad endings accumulate (6.7.1: and the start\'s own mark)."""\n'
    '    _start_ok()\n    f = _session_flag()')
rep('log_problem("load: page reported loaded")\n            _install_right_press_monitor(window)',
    'log_problem("load: page reported loaded")\n            _install_right_press_monitor(window)\n'
    '            _care_attach(window)  # 6.7.1 (app_care_671.py)')
rep('            log_problem("load: verified, page booted")\n',
    '            log_problem("load: verified, page booted")\n            _start_ok()\n')
rep('                log_problem("load: recovered, page booted after inline load")\n',
    '                log_problem("load: recovered, page booted after inline load")\n                _start_ok()\n')
# a probe that cannot reach the page cannot judge it: the start is not counted against the stored work
rep('            log_problem("load: probe could not reach the page; leaving it alone")\n',
    '            log_problem("load: probe could not reach the page; leaving it alone")\n            _start_ok()\n')
rep('        log_problem("load: watchdog could not be started", sys.exc_info())\n',
    '        log_problem("load: watchdog could not be started", sys.exc_info())\n        _start_ok()\n')

# the old step: two runs in a row that did not finish moved the stored work aside, and deleted what an earlier move kept
a = s.index('    if _prior_bad >= 2:\n')
b = s.index('            log_problem("start: fresh-start move failed", sys.exc_info())\n', a)
b += len('            log_problem("start: fresh-start move failed", sys.exc_info())\n')
old = s[a:b]
if "shutil.rmtree(aside)" not in old or ".crashed-%d" not in old:
    sys.exit("%s: the fresh-start step is not as this patch expects" % p)
s = s[:a] + ('    # 6.7.1 (app_care_671.py): the stored work is moved aside only when the page did not come up at two starts\n'
             '    # in a row (a save that stops every start); a run whose page came up does not count, however it ended\n'
             '    _prior_unstarted = _begin_start()\n'
             '    if _prior_unstarted >= 2:\n'
             '        _move_store_aside(_prior_unstarted)\n') + s[b:]
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
