#!/usr/bin/env python3
# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
"""The folder search in the Mac and Windows apps' own web view (not shipped; rag/notes/review.md, finding rag-r-04).

    python rig/rag_engine_check.py VENDOR_DIR OUT_DIR write|check

pywebview (6.2.1, as the apps are built with it) opens rig/rag_engine_page.html the way the apps open their page: from a server on
http://127.0.0.1:17953/ that serves the page's folder (rag/*.js and rag/vendor/ beside it) with the types the desktop patch gives,
and webview.start(private_mode=False, storage_path=...) as ingenium_app.py starts it. So on a Mac the page runs in WKWebView and on
Windows in WebView2, the engines the apps have. The bridge is the app's own code: app_rag_692's CODE with app_rag_693's changes,
run here as rig/rag_bridge.py runs it, with the household fixture folder chosen for it.

  write   from nothing: the private file system, SQLite with FTS5 and sqlite-vec, the reading model (its vectors compared with
          Chromium's), and the household folder read through the bridge; the index is kept
  check   a second start of the app on the same storage: the index must still be there, whole; then it is removed

OUT_DIR/<phase>.json holds every check, OUT_DIR/<phase>.txt a plain summary. The exit status is 0 only when every check passed."""
import base64, http.server, json, os, pathlib, re, shutil, sys, threading, time

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.normpath(os.path.join(HERE, ".."))
PORT = 17953                   # the apps' own address (the private file system belongs to an address)
TIMEOUT = 1500                 # seconds before the window is closed whatever the page has done


def main(argv):
    if len(argv) < 4 or argv[3] not in ("write", "check"):
        sys.exit(__doc__)
    vendor, out, phase = os.path.abspath(argv[1]), os.path.abspath(argv[2]), argv[3]
    os.makedirs(out, exist_ok=True)
    page, store, folder_copy = os.path.join(out, "page"), os.path.join(out, "webstore"), os.path.join(out, "household_papers")
    if phase == "write":
        for d in (page, store, folder_copy, os.path.join(out, "state")):
            shutil.rmtree(d, ignore_errors=True)
        os.makedirs(os.path.join(page, "rag"))
        for name in os.listdir(os.path.join(SRC, "rag")):
            if name.endswith(".js"):
                shutil.copyfile(os.path.join(SRC, "rag", name), os.path.join(page, "rag", name))
        shutil.copytree(vendor, os.path.join(page, "rag", "vendor"))
        shutil.copyfile(os.path.join(HERE, "rag_engine_page.html"), os.path.join(page, "check.html"))
        shutil.copyfile(os.path.join(HERE, "rag_engine_ref.json"), os.path.join(page, "rag_engine_ref.json"))
        shutil.copyfile(os.path.join(SRC, "rag", "fixtures", "FACTS.json"), os.path.join(page, "FACTS.json"))
        shutil.copytree(os.path.join(SRC, "rag", "fixtures", "household_papers"), folder_copy)

    # the app's own bridge code, as rig/rag_bridge.py runs it
    sys.path.insert(0, HERE)
    import rag_bridge  # noqa: E402
    problems = []
    ns = {"__name__": "app_rag_code", "os": os, "sys": sys, "json": json, "pathlib": pathlib, "re": re, "base64": base64,
          "threading": threading, "time": time, "APP_FOLDER": "Ingenium",
          "log_problem": lambda tag, exc_info=None: problems.append(str(tag))}
    exec(compile(rag_bridge.current_code(), "<app_rag_692 CODE + app_rag_693>", "exec"), ns)
    ns["_RAG_STATE_DIR"] = os.path.join(out, "state")
    chosen = ns["_rag_remember"](folder_copy) if phase == "write" else {"ok": True, "path": folder_copy}

    class Handler(http.server.SimpleHTTPRequestHandler):
        extensions_map = ns["_rag_extensions_map"](http.server.SimpleHTTPRequestHandler.extensions_map)

        def __init__(self, *a, **k):
            super().__init__(*a, directory=page, **k)

        def end_headers(self):
            self.send_header("Cache-Control", "no-store")
            super().end_headers()

        def log_message(self, fmt, *args):
            pass

    srv = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()

    import webview  # noqa: E402  (pywebview)
    got = {}

    class Api(object):
        def rag_choose_folder(self):
            return {"ok": False, "cancelled": True}

        def rag_folders(self):
            return ns["_rag_folders"]()

        def rag_forget_folder(self, path):
            return ns["_rag_forget_folder"](path)

        def rag_list(self, path):
            return ns["_rag_list"](path)

        def rag_read(self, path, rel, offset=0, length=1048576):
            return ns["_rag_read"](path, rel, offset, length)

        def report(self, result):
            got["result"] = result
            threading.Timer(0.5, close).start()
            return True

    def close():
        try:
            for w in list(webview.windows):
                w.destroy()
        except Exception as e:  # the window may be gone already
            got.setdefault("closeError", str(e))

    def too_long():
        if "result" not in got:
            got["timeout"] = True
            close()

    from urllib.parse import quote
    url ="http://127.0.0.1:%d/check.html?phase=%s&folder=%s" % (PORT, phase, quote(folder_copy, safe=""))
    webview.create_window("Ingenium folder search check", url, js_api=Api(), width=1000, height=760)
    timer = threading.Timer(TIMEOUT, too_long)
    timer.daemon = True
    timer.start()
    t0 = time.time()
    webview.start(private_mode=False, storage_path=store)          # as ingenium_app.py starts it
    timer.cancel()
    srv.shutdown()

    result = got.get("result") or {"phase": phase, "checks": [], "error": "the page reported nothing" + (" (timed out)" if got.get("timeout") else "")}
    result["seconds"] = round(time.time() - t0, 1)
    result["bridgeProblems"] = problems
    result["chosen"] = chosen
    result["python"] = sys.version.split()[0]
    result["pywebview"] = getattr(webview, "__version__", None) or _version("pywebview")
    with open(os.path.join(out, phase + ".json"), "w", encoding="utf-8") as f:
        json.dump(result, f, indent=1, ensure_ascii=False)
    checks = result.get("checks") or []
    failed = [c for c in checks if not c.get("ok")]
    lines = ["Folder search, %s (%s), %s: %d passed, %d failed, %.0f s" % (phase, sys.platform, result.get("ua", "?"), len(checks) - len(failed), len(failed), result["seconds"])]
    lines += [("PASS " if c.get("ok") else "FAIL ") + c.get("m", "") + ("" if c.get("ok") or not c.get("d") else "  " + c["d"][:300]) for c in checks]
    if result.get("ms"):
        lines.append("times (ms): " + json.dumps(result["ms"]))
    if result.get("facts"):
        lines.append("facts: " + json.dumps(result["facts"]))
    if result.get("error"):
        lines.append("STOPPED: " + str(result["error"])[:1500])
    if problems:
        lines.append("bridge problems: " + "; ".join(problems))
    text = "\n".join(lines)
    with open(os.path.join(out, phase + ".txt"), "w", encoding="utf-8") as f:
        f.write(text + "\n")
    print(text)
    return 0 if checks and not failed and not result.get("error") and not problems else 1


def _version(dist):
    try:
        from importlib.metadata import version
        return version(dist)
    except Exception:
        return None


if __name__ == "__main__":
    sys.exit(main(sys.argv))
