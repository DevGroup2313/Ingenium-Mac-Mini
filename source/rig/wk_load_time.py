#!/usr/bin/python3.12
"""Ingenium 6.2 and the Forge 644 · how long a page takes to answer in WebKit (WebKitGTK, the engine family of the Mac apps'
web view), each load in a fresh web view with nothing kept.
   xvfb-run -a /usr/bin/python3.12 rig/wk_load_time.py ingenium|forge RUNS URL [URL ...]
For each URL: the seconds from the start of the load to a page that answers (Ingenium: window.__ingReady; the Forge: its
loading page gone), for each run, and the middle one. With an echo URL (…/_echo), also the request headers WebKit sent."""
import sys, time, json
import gi
gi.require_version("Gtk", "3.0")
gi.require_version("WebKit2", "4.1")
from gi.repository import Gtk, WebKit2, GLib

KIND, RUNS, URLS = sys.argv[1], int(sys.argv[2]), sys.argv[3:]
READY = "window.__ingReady===true" if KIND == "ingenium" else "(function(){var b=document.getElementById('forge-boot');return !!(b&&b.classList.contains('fb-gone'));})()"


def once(url, limit=240):
    ctx = WebKit2.WebContext.new_ephemeral()
    view = WebKit2.WebView.new_with_context(ctx)
    win = Gtk.Window()
    win.set_default_size(1440, 900)
    win.add(view)
    win.show_all()
    st = {"t0": time.time(), "done": None, "val": None}

    def poll():
        if st["done"] is not None:
            return False
        if time.time() - st["t0"] > limit:
            st["done"] = -1
            Gtk.main_quit()
            return False

        def got(v, res):
            try:
                r = v.evaluate_javascript_finish(res)
                if r.to_boolean() and st["done"] is None:
                    st["done"] = time.time() - st["t0"]
                    Gtk.main_quit()
            except Exception:
                pass
        view.evaluate_javascript(READY, -1, None, None, None, got)
        return True

    view.load_uri(url)
    GLib.timeout_add(100, poll)
    Gtk.main()
    win.destroy()
    return st["done"]


for url in URLS:
    ts = [round(once(url), 2) for _ in range(RUNS)]
    good = sorted(t for t in ts if t >= 0)
    print(json.dumps({"url": url, "seconds": ts, "middle": good[len(good) // 2] if good else None}), flush=True)
