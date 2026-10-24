"""Ingenium 6.2 · the desktop app's side of windows of their own and of Refresh (ingenium_app.py), without a window system:
pywebview is stood in for, so what the app does with a window can be seen.

  python3 -I rig/t_62_app_lite.py path/to/ingenium_app.py path/to/ingenium.html

Checks: open_lite gives the new window the window page (ingenium_window.html), not the whole page; once the window takes
the app it is brought forward; lite_focus brings a window forward and says when it is gone; lite_cmd keeps "home" for that
window alone (and nothing else), lite_cmds hands it over once; a window closed by hand is reported to the main window
("gone"); main_focus brings the main window forward; the local server serves the window page, about a quarter of the
page, with the carried apps, the engine's WebAssembly and the kit store left out and the page whole; _page_answers tells
a page that answers from one that does not; _restart_page_process does nothing away from macOS."""
import importlib.util, json, os, shutil, sys, tempfile, threading, time, types, urllib.request

APP, PAGE = sys.argv[1], sys.argv[2]
passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    print(("PASS " if c else "FAIL ") + m + ("  " + str(d)[:300] if d is not None else ""))
    if c:
        passed += 1
    else:
        failed += 1


# a stand-in for pywebview: windows that record what is done to them
class FakeWin:
    def __init__(self, title, url):
        self.title, self.url, self.calls = title, url, []
        self.events = types.SimpleNamespace(closed=Hooks())

    def show(self):
        self.calls.append("show")

    def restore(self):
        self.calls.append("restore")

    def destroy(self):
        self.calls.append("destroy")


class Hooks(list):
    def __iadd__(self, f):
        self.append(f)
        return self


made = []
fake = types.ModuleType("webview")
fake.create_window = lambda title, url=None, **k: made.append(FakeWin(title, url)) or made[-1]
sys.modules["webview"] = fake

spec = importlib.util.spec_from_file_location("ingenium_app", APP)
ia = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ia)
api = ia.IngeniumApi("http://127.0.0.1/")
api._main_window = api.main_window = FakeWin("main", None)  # 6.4 keeps it as _main_window (app_win_64.py)

# ---- open_lite and the window page ----
ia._LITE["blocked"] = False
r = api.open_lite(json.dumps({"which": "tabula", "tok": "t1", "url": "http://127.0.0.1:17953/ingenium.html#ingapp=tabula&tok=t1", "handoff": {"text": "kept"}}))
ok(r == {"ok": True} and made and made[-1].url == "http://127.0.0.1:17953/ingenium_window.html#ingapp=tabula&tok=t1",
   "open_lite gives the new window the window page, the app and its token kept", (r, made[-1].url if made else None))
w1 = made[-1]
parcel = api.lite_take("t1")
ok(json.loads(parcel or "{}").get("handoff") == {"text": "kept"} and "show" in w1.calls and api.lite_taken("t1"),
   "the window takes the work handed across, and is brought forward as it does", (parcel, w1.calls))
ok(api.lite_take("t1") is None, "the work is taken once")
w1.calls.clear()
ok(api.lite_focus("t1") is True and "show" in w1.calls and "restore" in w1.calls, "lite_focus brings that window forward (restored if folded)", w1.calls)
ok(api.lite_focus("nope") is False, "and says when there is no such window")
ok(api.lite_cmd("t1", "home") is True and api.lite_cmd("t1", "home") is True, "lite_cmd keeps \"home\" for that window")
ok(api.lite_cmd("t1", "rm -rf") is False and api.lite_cmd("ghost", "home") is False, "nothing but \"home\", and only for a window that is open")
ok(json.loads(api.lite_cmds("t1")) == ["home"] and json.loads(api.lite_cmds("t1")) == [], "lite_cmds hands it over once, without repeats")
# the window closed by hand
for f in w1.events.closed:
    f()
q = [json.loads(x) for x in json.loads(api.lite_inbox())]
ok({"kind": "gone", "tok": "t1"} in q and "t1" not in ia._LITE["wins"], "a window closed by hand is reported to the main window", q)
api.main_window.calls.clear()
ok(api.main_focus() is True and "show" in api.main_window.calls, "main_focus brings the main window forward", api.main_window.calls)

# ---- the local server's window page ----
d = tempfile.mkdtemp(prefix="ing62lite_")
try:
    shutil.copy(PAGE, os.path.join(d, "ingenium.html"))
    port = ia._start_local_server(d, "ingenium.html")
    full = urllib.request.urlopen("http://127.0.0.1:%d/ingenium.html" % port, timeout=60).read()
    t0 = time.time()
    win = urllib.request.urlopen("http://127.0.0.1:%d/ingenium_window.html" % port, timeout=60).read()
    first = time.time() - t0
    t0 = time.time()
    win2 = urllib.request.urlopen("http://127.0.0.1:%d/ingenium_window.html" % port, timeout=60).read()
    again = time.time() - t0
    import re
    # a block still there: its script tag followed by its payload (the engine's code names these blocks in its strings too)
    gone = [i for i in ia._WINDOW_DROP if re.search(rb'<script\b[^>]*\bid="' + i.encode() + rb'"[^>]*>[A-Za-z0-9+/=]{1000}', win)]
    ok(len(win) < len(full) * 0.35 and win.rstrip().endswith(b"</html>") and not gone,
       "the server gives the window page: %.1f of %.1f MB, the payloads left out, the page whole" % (len(win) / 1e6, len(full) / 1e6), gone)
    ok(win == win2 and again <= max(first, 0.5), "made once and kept while the page is unchanged (%.2f s, then %.2f s)" % (first, again))
    # (the desk's code by its own name: from 6.3 the page carries no notes, so "R123" is gone with them)
    ok(b'id="ing-app-tabula"' in win and b"window.IngDesk=" in win and b'["p53"]' in win, "the apps a window of its own shows, and the desk's code, are still in it")
finally:
    shutil.rmtree(d, ignore_errors=True)

# ---- Refresh's helpers ----
class Answers:
    def evaluate_js(self, s):
        return 2


class Silent:
    def evaluate_js(self, s):
        time.sleep(30)


if not hasattr(ia, "_page_answers"):
    print("NOTE this app has no menu Refresh of its own (Refresh is the page's own key here): its helpers are not checked")
    print("\n%d passed, %d failed" % (passed, failed))
    sys.exit(1 if failed else 0)
t0 = time.time()
ok(ia._page_answers(Answers(), 2.0) is True, "_page_answers: a page that answers")
ok(ia._page_answers(Silent(), 1.0) is False and time.time() - t0 < 3, "_page_answers: a page that does not, told within its time")
ok(ia._restart_page_process(Answers(), "http://127.0.0.1:1/") is False if sys.platform != "darwin" else True,
   "_restart_page_process does nothing away from macOS")
print("\n%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
