#!/usr/bin/python3.12
"""Ingenium's library tests on WebKit's own IndexedDB: WebKitGTK (WebKit2 4.1), the same WebCore IndexedDB as Safari and the web
view of the Mac apps, iPhone and iPad, with its SQLite store on disk (a data directory of its own for each run, removed after).
   xvfb-run -a /usr/bin/python3.12 rig/idb/run_webkit.py <page url> [result.json]
IDB_ONLY=<regular expression> runs only the tests of one tab whose names match it; IDB_SKIP=main,tabs,quota leaves phases out;
IDB_KEEP=1 keeps the data directories (their path is printed).
The page is loaded and polled as rig/wk_load_time.py does; suite.js is injected once window.__ingReady is true, its phases run
as run_node.js runs them, and each result is read back with WebKit2.WebView.call_async_javascript_function."""
import sys, os, json, time, re, shutil, tempfile
import gi
gi.require_version("Gtk", "3.0")
gi.require_version("WebKit2", "4.1")
from gi.repository import Gtk, WebKit2, GLib

HERE = os.path.dirname(os.path.abspath(__file__))
SUITE = open(os.path.join(HERE, "suite.js"), encoding="utf-8").read()
QUOTA = 12 * 1048576
ERRORS = "(() => { window.__idbErrors = []; window.addEventListener('error', e => { try { window.__idbErrors.push(String(e.message || e.error || 'error') + (e.filename ? ' @' + e.filename.split('/').pop() + ':' + e.lineno : '')); } catch (x) { } }); })();"


def log(s):
    print(s, flush=True)


def pump(seconds):
    """lets WebKit work for a while"""
    loop = GLib.MainLoop()
    GLib.timeout_add(int(seconds * 1000), lambda: (loop.quit(), False)[1])
    loop.run()


def wait_for(start, seconds):
    """starts something that calls done(*args) later, and runs the main loop until it does (or the time is up)"""
    loop, box = GLib.MainLoop(), {}

    def done(*a):
        if "r" not in box:
            box["r"] = a
            loop.quit()

    def late():
        box.setdefault("late", True)
        loop.quit()
        return False
    tid = GLib.timeout_add(int(seconds * 1000), late)
    start(done)
    if "r" not in box:
        loop.run()
    if "late" not in box or "r" in box:
        try:
            GLib.source_remove(tid)
        except Exception:
            pass
    return box


class Tab:
    def __init__(self, ctx, env):
        ucm = WebKit2.UserContentManager()
        for src in (env, ERRORS):
            ucm.add_script(WebKit2.UserScript.new(src, WebKit2.UserContentInjectedFrames.TOP_FRAME, WebKit2.UserScriptInjectionTime.START, None, None))
        self.view = WebKit2.WebView(web_context=ctx, user_content_manager=ucm)
        s = self.view.get_settings()
        s.set_enable_developer_extras(False)
        self.win = Gtk.Window()
        self.win.set_default_size(1440, 900)
        self.win.add(self.view)
        self.win.show_all()
        self.loads = 0
        self.crashed = None
        self.view.connect("load-changed", self._load)
        self.view.connect("script-dialog", self._dialog)
        self.view.connect("permission-request", lambda v, r: (r.deny(), True)[1])
        self.view.connect("run-file-chooser", lambda v, r: (r.cancel(), True)[1])
        self.view.connect("create", lambda v, a: None)
        self.view.connect("web-process-terminated", self._crash)

    def _load(self, v, ev):
        if ev == WebKit2.LoadEvent.FINISHED:
            self.loads += 1

    def _dialog(self, v, d):
        try:
            if d.get_dialog_type() == WebKit2.ScriptDialogType.CONFIRM or d.get_dialog_type() == WebKit2.ScriptDialogType.BEFORE_UNLOAD_CONFIRM:
                d.confirm_set_confirmed(True)
        except Exception:
            pass
        return True

    def _crash(self, v, reason):
        self.crashed = str(reason)

    def js(self, body, seconds=180):
        """runs an async function body in the page; returns its value as JSON (None when undefined)"""
        box = wait_for(lambda done: self.view.call_async_javascript_function(body, -1, None, None, None, None, lambda v, res: done(v, res)), seconds)
        if "r" not in box:
            raise TimeoutError("the page did not answer in %d s" % seconds)
        v, res = box["r"]
        val = v.call_async_javascript_function_finish(res)
        if val is None or val.is_undefined() or val.is_null():
            return None
        return json.loads(val.to_json(0))

    def evaluate(self, src, seconds=120):
        box = wait_for(lambda done: self.view.evaluate_javascript(src, -1, None, None, None, lambda v, res: done(v, res)), seconds)
        if "r" not in box:
            raise TimeoutError("the page did not take the script in %d s" % seconds)
        v, res = box["r"]
        v.evaluate_javascript_finish(res)

    def wait(self, cond, seconds):
        t0 = time.time()
        while time.time() - t0 < seconds:
            try:
                if self.js("return !!(" + cond + ");", 30):
                    return True
            except Exception:
                pass
            if self.crashed:
                raise RuntimeError("the web process ended: " + self.crashed)
            pump(0.5)
        return False

    def ready(self, seconds=300):
        if not self.wait("window.__ingReady === true", seconds):
            raise TimeoutError("the page was not ready in %d s" % seconds)
        pump(0.6)
        self.js("const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); return 1;")
        pump(0.4)

    def load(self, url):
        n = self.loads
        self.view.load_uri(url)
        t0 = time.time()
        while self.loads == n and time.time() - t0 < 300:
            pump(0.3)

    def inject(self):
        self.evaluate(SUITE)

    def close(self):
        self.win.destroy()


def phase(tab, name, res, only=None, navigates=False, limit=3600):
    n0 = tab.js("return window.__idbSuite.results.length;")
    if only:
        tab.js("window.__idbSuite.only = new RegExp(%s); return 1;" % json.dumps(only))
    tab.js("window.__idbSuite.run(%s).catch(() => {}); return 1;" % json.dumps(name))
    if navigates:
        return []
    seen, rows, t0 = n0, [], time.time()
    while True:
        try:
            st = tab.js("return {done: window.__idbSuite.finished[%s], rows: window.__idbSuite.results.slice(%d)};" % (json.dumps(name), seen), 60)
        except Exception as e:
            log("NOTE the page could not be read during %s: %s" % (name, str(e).split("\n")[0]))
            if tab.crashed or time.time() - t0 > limit:
                rows.append({"name": "phase %s ran to its end" % name, "ok": False, "detail": "the page stopped answering" + (" (web process: %s)" % tab.crashed if tab.crashed else ""), "ms": int((time.time() - t0) * 1000)})
                break
            pump(2)
            continue
        for r in st["rows"]:
            rows.append(r)
            log("%s %s  (%s ms)  %s" % ("PASS" if r["ok"] else "FAIL", r["name"], r["ms"], str(r["detail"])[:700]))
        seen += len(st["rows"])
        if st["done"] is True:
            break
        if isinstance(st["done"], str):
            log("NOTE phase %s stopped: %s" % (name, st["done"]))
            break
        if time.time() - t0 > limit:
            rows.append({"name": "phase %s finished in time" % name, "ok": False, "detail": "still running after %d s" % (time.time() - t0), "ms": int((time.time() - t0) * 1000)})
            break
        pump(1.5)
    res["results"].extend(rows)
    return rows


def manager(root, ratio=None):
    os.makedirs(root, exist_ok=True)
    kw = dict(base_data_directory=os.path.join(root, "data"), base_cache_directory=os.path.join(root, "cache"))
    if ratio:
        kw.update(origin_storage_ratio=ratio, total_storage_ratio=min(1.0, ratio * 4))
    return WebKit2.WebsiteDataManager(**kw)


def main():
    if len(sys.argv) < 2:
        print("usage: xvfb-run -a /usr/bin/python3.12 rig/idb/run_webkit.py <page url> [result.json]")
        sys.exit(2)
    url = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else "idb-webkit.json"
    only = os.environ.get("IDB_ONLY") or None
    skip = (os.environ.get("IDB_SKIP") or "").split(",")
    keep = os.environ.get("IDB_KEEP") == "1"
    ver = "%d.%d.%d" % (WebKit2.get_major_version(), WebKit2.get_minor_version(), WebKit2.get_micro_version())
    res = {"impl": "webkit", "url": url, "started": time.strftime("%Y-%m-%dT%H:%M:%S"), "engine": "WebKitGTK " + ver, "results": [], "notes": []}
    log("NOTE webkit: WebKitGTK %s (WebKit2 4.1), page %s" % (ver, url))
    root = tempfile.mkdtemp(prefix="idb-webkit-")
    if keep:
        log("NOTE data directories under " + root)

    def fail(name, e):
        r = {"name": name, "ok": False, "detail": "the runner could not do it: " + str(e).split("\n")[0], "ms": 0}
        res["results"].append(r)
        log("FAIL %s  %s" % (name, r["detail"]))
    env = lambda q: "window.__idbEnv = %s;" % json.dumps({"impl": "webkit", "quota": q})
    try:
        ctx = WebKit2.WebContext.new_with_website_data_manager(manager(os.path.join(root, "main")))
        ctx.connect("download-started", lambda c, d: d.cancel())
        a = Tab(ctx, env(None))
        t0 = time.time()
        a.load(url)
        a.ready()
        res["ua"] = a.js("return navigator.userAgent;")
        log("NOTE ready in %d ms" % ((time.time() - t0) * 1000))
        a.inject()
        if "main" not in skip:
            phase(a, "main", res, only=only)
        if "tabs" not in skip:
            try:
                phase(a, "tabs-a1", res)
                b = Tab(ctx, env(None))
                b.load(url)
                b.ready()
                b.inject()
                phase(b, "tabs-b1", res)
                n = b.loads
                phase(b, "tabs-b-reset", res, navigates=True)
                t1 = time.time()
                while b.loads == n and time.time() - t1 < 300:
                    pump(0.3)
                b.ready()
                b.inject()
                phase(b, "tabs-b2", res)
                phase(a, "tabs-a2", res)
                b.close()
            except Exception as e:
                fail("two tabs: the runner ran both tabs", e)
        a.close()
        if "quota" not in skip:
            try:
                # the origin's quota is a share of the disk that holds the data directory
                st = os.statvfs(root)
                cap = st.f_blocks * st.f_frsize
                ratio = QUOTA / cap
                res["quota"] = {"bytes": QUOTA, "volume": cap, "origin_storage_ratio": ratio}
                qctx = WebKit2.WebContext.new_with_website_data_manager(manager(os.path.join(root, "quota"), ratio))
                qctx.connect("download-started", lambda c, d: d.cancel())
                q = Tab(qctx, env(QUOTA))
                q.load(url)
                q.ready()
                q.inject()
                phase(q, "quota", res)
                q.close()
            except Exception as e:
                fail("quota: the runner made a profile with a small quota", e)
    except Exception as e:
        fail("the runner loaded the page and ran the suite", e)
    if not keep:
        shutil.rmtree(root, ignore_errors=True)
    res["finished"] = time.strftime("%Y-%m-%dT%H:%M:%S")
    res["passed"] = sum(1 for r in res["results"] if r["ok"])
    res["failed"] = len(res["results"]) - res["passed"]
    d = os.path.dirname(os.path.abspath(out))
    os.makedirs(d, exist_ok=True)
    with open(out, "w") as f:
        json.dump(res, f, indent=1)
    log("\nwebkit: %d passed, %d failed" % (res["passed"], res["failed"]))
    sys.exit(1 if res["failed"] or not res["results"] else 0)


main()
