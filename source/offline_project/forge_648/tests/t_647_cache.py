# The Forge 647 · forge_shell_647b.py, in both programs: the page goes out no-store (pywebview 6.2.1 meant to, but its headers were
# dropped), the build is read from the page, and a new build empties the web view's page cache once (Windows checked here; the
# Mac half runs on GitHub's Mac in the build). python3 tests/t_647_cache.py <the_forge_app.py (patched)> [...]
import ast, os, sys, types, threading, time, urllib.request, tempfile, shutil
ok = lambda c, m: print(("PASS " if c else "FAIL ") + m)
for label in sys.argv[1:]:
    src = open(label, encoding="utf-8").read(); tree = ast.parse(src)
    notes = []
    ns = {"os": os, "sys": sys, "log_problem": lambda *a, **k: notes.append(a[0]), "log_note": lambda *a, **k: notes.append(a[0])}
    for n in tree.body:
        if isinstance(n, ast.FunctionDef) and n.name in ("_forge_no_store", "_page_build", "_forget_old_pages", "_guard_local_server"):
            exec(compile(ast.Module([n], []), label, "exec"), ns)
    # 1. pywebview 6.2.1's own asset route (webview/http.py), behind the program's guard
    import bottle, webview_http_stub
    root = tempfile.mkdtemp(); open(os.path.join(root, "the_forge.html"), "w").write("<p>page")
    sys.modules["webview.http"] = webview_http_stub; webview_http_stub.bottle = bottle
    sys.modules.setdefault("webview", types.ModuleType("webview")).http = webview_http_stub
    ok(ns["_guard_local_server"]() is True, label + ": the guard is put on the server as before")
    app = bottle.Bottle()
    @app.route('/<file:path>')
    def asset(file):
        bottle.response.set_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        return bottle.static_file(file, root=root)
    port = 42100 + sys.argv.index(label)
    threading.Thread(target=lambda: bottle.run(app=app, server=bottle.WSGIRefServer, port=port, quiet=True), daemon=True).start(); time.sleep(1.2)
    h = dict(urllib.request.urlopen("http://127.0.0.1:%d/the_forge.html" % port).headers)
    ok(h.get("Cache-Control") == "no-store, max-age=0" and "Etag" not in h and "ETag" not in h and "Last-Modified" not in h,
       label + ": the page goes out with no-store, and no Last-Modified or ETag " + str({k: v for k, v in h.items() if k.lower() in ("cache-control", "etag", "last-modified", "pragma")}))
    bottle.run = webview_http_stub.ORIG
    # 2. the build the page names
    page = "/home/user/wt/forge647full/the_forge_647_lean.html"
    ok(ns["_page_build"](page) == "647 9s79", label + ": the build read from the page: " + ns["_page_build"](page))
    # 3. Windows: the cache emptied once per build, the work untouched
    store = tempfile.mkdtemp(); sd = os.path.join(store, "TheForge", "storage")
    for rel in ("EBWebView/Default/Cache/Cache_Data", "EBWebView/Default/Code Cache/js", "EBWebView/Default/Local Storage/leveldb", "EBWebView/Default/IndexedDB/x"):
        os.makedirs(os.path.join(sd, rel)); open(os.path.join(sd, rel, "f"), "w").write("x")
    ns["storage_dir"] = lambda: sd
    real = sys.platform; sys.platform = "win32"
    try:
        ns["_forget_old_pages"](page)
        gone = not os.path.exists(os.path.join(sd, "EBWebView/Default/Cache")) and not os.path.exists(os.path.join(sd, "EBWebView/Default/Code Cache"))
        kept = os.path.exists(os.path.join(sd, "EBWebView/Default/Local Storage/leveldb/f")) and os.path.exists(os.path.join(sd, "EBWebView/Default/IndexedDB/x/f"))
        mark = open(os.path.join(store, "TheForge", "page_build.txt")).read()
        ok(gone and kept and mark == "647 9s79", label + ": a new build empties the page cache once; local storage and the databases stay; the build is noted")
        os.makedirs(os.path.join(sd, "EBWebView/Default/Cache/again"))
        ns["_forget_old_pages"](page)
        ok(os.path.exists(os.path.join(sd, "EBWebView/Default/Cache/again")), label + ": the same build again leaves the cache alone")
        ok(any("build 647 9s79 starts" in x and "emptied" in x for x in notes), label + ": the log says which build started and that the cache was emptied")
    finally:
        sys.platform = real
