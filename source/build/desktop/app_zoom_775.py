"""Ingenium 7.75: Ingenium fills a large screen. The Mac app's window zooms its page as a browser does (the page's side is
modules/r368.js).

Her words (24 November 2026): "Ingenium's 3D headers drawings and designs look small and odd on the Mac mini's large curved screen. I
have a 34-inch Dell Desktop screen for the Mac mini, so it looks really tiny and weird on the screen, shrunken like that ... I want
Ingenium's display to properly expand to fit the larger screen comfortably". Measured on 7.74 at 3,440 by 1,440: the page stretches to
the whole width at a laptop's sizes, so the 520-pixel stone of Adamas stands in a head 3,110 pixels wide, and every word and key is as
small as on a laptop. A zoom set in the page's own styles (CSS zoom) cannot be used: it enlarges what is measured in the window's own
units too (a box of 100vw by 100vh measured 5,160 by 2,160 at zoom 1.5), so the panes that fill the window would spill past it. The
window's own zoom (WKWebView's pageZoom, macOS 11 and later) is the browser's zoom: the page is laid out for a narrower window, then
drawn larger, so everything keeps its proportions and nothing spills.

  display_zoom()     {"ok": true, "zoom": <the window's zoom now>}
  display_zoom(1.25) sets the zoom (0.8 to 2), on the main thread, for every window of the app

On Windows (WebView2) and elsewhere it answers {"ok": false, "why": ...}, and the page leaves its Size row out.

    python3 build/desktop/app_zoom_775.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_display_zoom" in s:
    print("already patched", p)
    sys.exit(0)

# the bridge: one call, in both of the app's bridge classes
rep('''    def load_state(self):
        return _load_state()
''', '''    def load_state(self):
        return _load_state()

    def display_zoom(self, f=None):
        return _display_zoom(f)
''', 2)

rep('''def _load_state():''', '''def _display_zoom(f=None):
    """7.75: the window's own zoom (WKWebView's pageZoom), so Ingenium fills a large screen without spilling (app_zoom_775.py)."""
    if sys.platform != "darwin":
        return {"ok": False, "why": "This app zooms with the keyboard here: Control and plus, Control and minus."}
    try:
        from webview.platforms.cocoa import BrowserView
        from PyObjCTools import AppHelper
    except Exception as e:  # noqa: BLE001
        return {"ok": False, "why": "The window cannot zoom here (%s)." % e}
    views = [i.webview for i in list(BrowserView.instances.values()) if getattr(i, "webview", None) is not None]
    if not views:
        return {"ok": False, "why": "No window yet."}
    def on_main(fn, wait=2.0):
        """WebKit is asked on the app's main thread; the bridge calls in from another, so it waits there for the answer."""
        import threading
        try:
            from Foundation import NSThread
            if NSThread.isMainThread():
                return fn()
        except Exception:  # noqa: BLE001
            pass
        box, ev = {}, threading.Event()

        def run():
            try:
                box["v"] = fn()
            except Exception as e:  # noqa: BLE001
                box["e"] = e
            finally:
                ev.set()
        AppHelper.callAfter(run)
        if not ev.wait(wait):
            raise TimeoutError("the window did not answer")
        if "e" in box:
            raise box["e"]
        return box["v"]
    if f is None:
        try:
            return {"ok": True, "zoom": float(on_main(lambda: views[0].pageZoom()))}
        except Exception as e:  # noqa: BLE001
            return {"ok": False, "why": "This version of macOS cannot zoom the window (%s)." % e}
    try:
        z = max(0.8, min(2.0, float(f)))
    except Exception:  # noqa: BLE001
        return {"ok": False, "why": "Not a size."}

    def go():
        for v in views:
            try:
                v.setPageZoom_(z)
            except Exception:  # noqa: BLE001
                pass
    AppHelper.callAfter(go)
    return {"ok": True, "zoom": z}


def _load_state():''')

open(p, "w", encoding="utf-8").write(s)
print("patched", p)
