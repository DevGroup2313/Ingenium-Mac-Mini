"""Ingenium 6.7: only Ingenium's own page may call the desktop app (patch for ingenium_app.py, Mac and Windows; applied after
app_studio_65.py).

Found in the security audit (25 October 2026). Ingenium shows pages it did not write (a page a model wrote, an app sent as a
file, the preview of Code and Build) in sandboxed frames inside its window. On a Mac, pywebview 6.2.1 receives the page's calls
to the app (window.pywebview.api: saving files, the models, training, the window of its own) through a WebKit message handler,
and WebKit defines that handler in every frame. pywebview never asks which frame spoke, so a sandboxed page could call the
app as if it were Ingenium. Now a call is answered only when it comes from the main frame of a page on the app's own address
(127.0.0.1 or localhost), or from the app's own fallbacks (the page given inline or as a file); any other, a website
included, is dropped. On Windows, WebView2 hands pywebview the messages of the top frame only, so
nothing changes there, and the guard does nothing off a Mac.

    python3 build/desktop/app_frames_67.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_guard_bridge_frames" in s:
    print("already patched", p)
    sys.exit(0)

rep('''def main():
''', '''def _guard_bridge_frames():
    """6.7 (app_frames_67.py): on a Mac, answer a call from the page only when it comes from the main frame of the app's own
    address, never from a frame inside it (pywebview's message handler is defined in every frame and does not check)."""
    if sys.platform != "darwin":
        return
    try:
        import objc
        from webview.platforms import cocoa as _pc
        base = _pc.BrowserView.JSBridge
        if getattr(base, "_ing_guarded", False):
            return

        class IngeniumFrameGuardedJSBridge(base):
            def userContentController_didReceiveScriptMessage_(self, controller, message):
                try:
                    info = message.frameInfo()
                    if info is None or not info.isMainFrame():
                        return
                    origin = info.securityOrigin()
                    host = str(origin.host() or "") if origin is not None else ""
                    proto = str(origin.protocol() or "").lower() if origin is not None else ""
                    # the app's own address; or the app's own fallbacks (the page given inline, or as a file), never a website
                    if not (host in ("127.0.0.1", "localhost") or proto in ("file", "about") or (proto == "" and host == "")):
                        return
                except Exception:
                    return
                objc.super(IngeniumFrameGuardedJSBridge, self).userContentController_didReceiveScriptMessage_(controller, message)

        IngeniumFrameGuardedJSBridge._ing_guarded = True
        _pc.BrowserView.JSBridge = IngeniumFrameGuardedJSBridge
    except Exception:
        log_problem("guard of the page's calls to the app could not be set", sys.exc_info())


def main():
''')
rep('''            webview.start(**kwargs)''', '''            _guard_bridge_frames()  # 6.7 (app_frames_67.py)
            webview.start(**kwargs)''')
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
