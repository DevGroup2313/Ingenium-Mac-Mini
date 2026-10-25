"""The Forge 647: its computer programs (the_forge_app.py, in Forge-windows and in Forge-Mac's Mac project) given what Ingenium's
got in 6.7 and 6.7.1 (Ingenium-Mac-Mini source/build/desktop/app_frames_67.py and app_care_671.py):
  - on a Mac, a call to the program (window.pywebview.api: saving files, the window of its own) is answered only when it comes
    from the main frame of the Forge's own page. pywebview 6.2.1 hears the calls through a WebKit message handler that WebKit
    defines in every frame and never asks which frame spoke, so an app the Forge shows in a frame (the Editor's preview, an app
    opened in a window of its own, the apps it carries) could call it as if it were the Forge. On Windows WebView2 hands
    pywebview the top frame's messages only;
  - on Windows, the web view's ProcessFailed event is listened to: a page whose process ended (it crashed, ran out of memory,
    or was ended) is loaded again at once, up to three times in two minutes, and after that the person is told; a page that
    stops answering is written down and left to finish; the graphics process stopping twice in a run keeps safe graphics for
    the next start; the web view itself gone, the person is told to open the Forge again. The Forge already counts a Windows
    shut down, restart or sign out as a run that finished (_closing_is_clean), and never moves its stored work aside.
Each change found exactly once, or nothing is written.
    python3 forge_shell_647.py <the_forge_app.py> [<the_forge_app.py> ...]"""
import sys

GUARD = r'''
def _guard_bridge_frames():
    """647 (forge_shell_647.py): on a Mac, answer a call from the page only when it comes from the main frame of the Forge's
    own page, never from a frame inside it (pywebview's message handler is defined in every frame and does not check)."""
    if sys.platform != "darwin":
        return
    try:
        import objc
        from webview.platforms import cocoa as _pc
        base = _pc.BrowserView.JSBridge
        if getattr(base, "_forge_guarded", False):
            return

        class ForgeFrameGuardedJSBridge(base):
            def userContentController_didReceiveScriptMessage_(self, controller, message):
                try:
                    info = message.frameInfo()
                    if info is None or not info.isMainFrame():
                        return
                    origin = info.securityOrigin()
                    host = str(origin.host() or "") if origin is not None else ""
                    proto = str(origin.protocol() or "").lower() if origin is not None else ""
                    # the Forge's own page: from its file, or from pywebview's own address; never a website
                    if not (host in ("127.0.0.1", "localhost") or proto in ("file", "about") or (proto == "" and host == "")):
                        return
                except Exception:
                    return
                objc.super(ForgeFrameGuardedJSBridge, self).userContentController_didReceiveScriptMessage_(controller, message)

        ForgeFrameGuardedJSBridge._forge_guarded = True
        _pc.BrowserView.JSBridge = ForgeFrameGuardedJSBridge
    except Exception:
        log_problem("guard of the page's calls to the program could not be set", sys.exc_info())


_CARE = {"attached": False, "reloads": [], "told": False, "gpu": 0, "refs": []}


def _care_say(text):
    if not _CARE["told"]:
        _CARE["told"] = True
        import threading as _th
        _th.Thread(target=tell_user, args=(text,), daemon=True).start()


def _forge_care_attach(window):
    """647 (forge_shell_647.py), Windows: listen for the web view's processes stopping. Once, from the first page load (the web
    view exists by then); the listening itself is set up on the window's own thread."""
    if _CARE["attached"] or not sys.platform.startswith("win"):
        return
    _CARE["attached"] = True
    try:
        import time as _t
        import clr  # noqa: F401  (pythonnet, already loaded by the window)
        from System import Func, Type
        from Microsoft.Web.WebView2.Core import CoreWebView2ProcessFailedKind as K
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
                now = _t.time()
                if kind == K.RenderProcessExited:
                    recent = [x for x in _CARE["reloads"] if now - x < 120]
                    if len(recent) >= 3:
                        log_note("page: its process stopped again%s, after three new starts in two minutes; left as it is" % more)
                        _care_say("The Forge's page stopped working several times in a row.\n\nYour work is saved as you go. "
                                  "Please close The Forge and open it again.\n\nDetails were written to:\n  %s" % crash_log_path())
                        return
                    recent.append(now)
                    _CARE["reloads"] = recent
                    log_note("page: its process stopped%s; the page is loaded again" % more)
                    wv.CoreWebView2.Reload()
                elif kind == K.RenderProcessUnresponsive:
                    log_note("page: its process is not answering%s; left to finish what it is doing" % more)
                elif kind == K.GpuProcessExited:
                    _CARE["gpu"] += 1
                    log_note("graphics: the graphics process stopped%s (%d this run)" % (more, _CARE["gpu"]))
                    path = _safe_graphics_file()
                    if _CARE["gpu"] >= 2 and not os.path.isfile(path) and _remember_safe_graphics(path, 1):
                        log_note("graphics: safe graphics kept for the next start (%s)" % path)
                elif kind == K.BrowserProcessExited:
                    log_note("web view: its own process stopped%s; the window cannot show the page until The Forge is opened again" % more)
                    _care_say("The Forge's window stopped working (its web view closed).\n\nYour work is saved as you go. "
                              "Please close The Forge and open it again.")
                else:
                    log_note("web view: a helper process stopped (%s)%s" % (kind, more))
            except BaseException:
                log_problem("care: a stopped process could not be handled", sys.exc_info())

        def attach():
            core = wv.CoreWebView2
            if core is None:
                log_problem("care: the web view is not ready; a page whose process stops will not come back by itself")
                return None
            core.ProcessFailed += failed
            _CARE["refs"].append(failed)
            ver = ""
            try:
                ver = str(core.Environment.BrowserVersionString)
            except Exception:
                pass
            log_note("care: listening for the page's processes stopping (web view %s)" % (ver or "version unknown"))
            return None
        form.Invoke(Func[Type](attach))
    except BaseException:
        log_problem("care: could not listen to the web view", sys.exc_info())

'''

for p in sys.argv[1:]:
    s = open(p, encoding="utf-8", newline="").read()
    if "_forge_care_attach" in s:
        print("already patched", p)
        continue
    nl = "\r\n" if "\r\n" in s else "\n"
    t = s.replace("\r\n", "\n")

    def rep(old, new, n=1):
        global t
        c = t.count(old)
        if c != n:
            sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:80]))
        t = t.replace(old, new)

    rep("\ndef main():\n", GUARD + "\ndef main():\n")
    rep("        window.events.loaded += _page_loaded\n",
        "        window.events.loaded += _page_loaded\n"
        "        window.events.loaded += lambda *_a, **_k: _forge_care_attach(window)  # 647 (forge_shell_647.py)\n")
    # the guard is set just before the window starts: on the Mac, before the dock seal and the start; on Windows (where it does
    # nothing), at the same place in main(), right after the closing and loading events are watched
    if "    show_seal_in_dock('the_forge.png')\n" in t:
        rep("    show_seal_in_dock('the_forge.png')\n", "    _guard_bridge_frames()  # 647 (forge_shell_647.py)\n    show_seal_in_dock('the_forge.png')\n")
    else:
        rep("        window.events.loaded += lambda *_a, **_k: _forge_care_attach(window)  # 647 (forge_shell_647.py)\n",
            "        window.events.loaded += lambda *_a, **_k: _forge_care_attach(window)  # 647 (forge_shell_647.py)\n"
            "        _guard_bridge_frames()\n")
    # 647: a file the page hands over is never written over one already there (when no dialog could be shown it goes to the
    # Downloads folder, and was written over a file of the same name); on a Mac, a document to print is opened only as what it
    # says it is (a PDF, a web page, plain text or a picture), its extension chosen by the Forge, never by the page, so that no
    # name the page gives can have the Mac run it (a ".command", an ".app", a ".terminal")
    rep("""            target = os.path.join(d, safe)
        except Exception:
            log_problem("save_bytes: no writable folder")
            return False
""", """            target = os.path.join(d, safe.lstrip(".") or "download")
            # 647 (forge_shell_647.py): never over a file already there
            stem, ext = os.path.splitext(target)
            n = 2
            while os.path.exists(target) and n < 1000:
                target = "%s (%d)%s" % (stem, n, ext)
                n += 1
        except Exception:
            log_problem("save_bytes: no writable folder")
            return False
""")
    if "def print_document(win, name, mime, data_b64):" in t:
        rep("""    safe = "".join(c for c in str(name or "document") if c.isalnum() or c in " ._-").strip()
    if not safe:
        safe = "document"
    try:
        folder = os.path.join(tempfile.gettempdir(), "TheForgePrint")
        os.makedirs(folder, exist_ok=True)
        path = os.path.join(folder, safe)
        with open(path, "wb") as fh:
            fh.write(raw)
""", """    # 647 (forge_shell_647.py): opened only as what it says it is, with the Forge's own extension
    kind = {"application/pdf": ".pdf", "text/html": ".html", "text/plain": ".txt", "image/png": ".png", "image/jpeg": ".jpg",
            "image/gif": ".gif", "image/webp": ".webp"}.get(str(mime or "").split(";")[0].strip().lower())
    if not kind:
        log_note("print_document: a document of type %r was not opened (a PDF, a web page, plain text or a picture is)" % str(mime)[:60])
        return False
    base = os.path.splitext(os.path.basename(str(name or "document").replace("\\\\", "/")))[0]
    safe = "".join(c for c in base if c.isalnum() or c in " _-").strip()[:80] or "document"
    try:
        folder = os.path.join(tempfile.gettempdir(), "TheForgePrint")
        os.makedirs(folder, exist_ok=True)
        fd, path = tempfile.mkstemp(prefix=safe + "-", suffix=kind, dir=folder)
        with os.fdopen(fd, "wb") as fh:
            fh.write(raw)
""")
    for need in ("\nimport os\n", "\nimport sys\n"):
        if need not in t:
            sys.exit("%s: %r is not imported at the top" % (p, need.strip()))
    open(p, "w", encoding="utf-8", newline="").write(t.replace("\n", nl))
    print("patched", p)
