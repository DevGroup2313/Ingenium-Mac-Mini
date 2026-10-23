"""The Forge 644 · the Forge's own address answers its own window only (forge_guard_644.py), with a real bottle server started
as pywebview starts it (bottle.run, through the guard):

  python3 -I tests/t_644_guard.py <bottle's folder> <the_forge_app.py> [<the_forge_app.py> ...]

Checks: each app script, patched, still compiles, keeps its own text, and calls the guard first thing when it makes its window
(again patched, it is left as it is); with the guard, a request that names 127.0.0.1 or localhost at the server's port gets
the page; one that names any other host (DNS rebinding) is refused with 421 and nothing of the page; one with no Host too;
a server given its port in its place keeps the same rule; one whose port the guard cannot see answers the computer's own
name and still refuses every other."""
import http.client, importlib.util, os, py_compile, shutil, socket, sys, tempfile, threading, time, types

BOTTLE_DIR, APPS = sys.argv[1], sys.argv[2:]
HERE = os.path.dirname(os.path.abspath(__file__))
passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    print(("PASS " if c else "FAIL ") + m + ("  " + str(d)[:300] if d is not None else ""))
    if c:
        passed += 1
    else:
        failed += 1


spec = importlib.util.spec_from_file_location("forge_guard_644", os.path.join(HERE, "..", "forge_guard_644.py"))
fg = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fg)
tmp = tempfile.mkdtemp()
for i, app in enumerate(APPS):
    p = os.path.join(tmp, "app%d.py" % i)
    shutil.copyfile(app, p)
    before = open(p, encoding="utf-8").read()
    fg.patch(p)
    after = open(p, encoding="utf-8").read()
    fg.patch(p)
    again = open(p, encoding="utf-8").read()
    try:
        py_compile.compile(p, doraise=True)
        compiles = True
    except Exception as e:
        compiles = str(e)
    import ast
    fn = [n for n in ast.walk(ast.parse(after)) if isinstance(n, ast.FunctionDef) and n.name == "_make_window"][0]
    st = [b for b in fn.body if not (isinstance(b, ast.Expr) and isinstance(getattr(b, "value", None), ast.Constant) and isinstance(b.value.value, str))]
    first = [ast.unparse(st[0])] if st else []
    import re
    undone = re.sub(r"(?m)^[ \t]*_guard_local_server\(\)\n", "", after.replace(fg.GUARD, "", 1), count=1)
    ok(compiles is True and undone == before and again == after and first and first[0] == "_guard_local_server()",
       os.path.basename(os.path.dirname(app)) + "/" + os.path.basename(app) + ": patched, it compiles, calls the guard first when it makes its window, and a second patch changes nothing",
       {"compiles": compiles, "first": first[:1]})

# the guard itself, around a real bottle server started the way pywebview starts it
sys.path.insert(0, BOTTLE_DIR)
import bottle  # noqa: E402
wv = types.ModuleType("webview"); wv.__path__ = []
wh = types.ModuleType("webview.http"); wh.bottle = bottle
sys.modules["webview"], sys.modules["webview.http"] = wv, wh
ns = {}
exec(fg.GUARD, ns)
ok(ns["_guard_local_server"]() is True and bottle.run._forge_guard and ns["_guard_local_server"]() is True, "the guard takes its place in pywebview's server start, once")
root = tempfile.mkdtemp()
PAGE = b"<!doctype html><title>The Forge</title><h1>the page</h1>" + b"x" * 4000
open(os.path.join(root, "the_forge.html"), "wb").write(PAGE)
app = bottle.Bottle()


@app.route("/<file:path>")
def asset(file):
    return bottle.static_file(file, root=root)


with socket.socket() as s:
    s.bind(("127.0.0.1", 0)); port = s.getsockname()[1]
threading.Thread(target=lambda: bottle.run(app=app, server="wsgiref", host="127.0.0.1", port=port, quiet=True), daemon=True).start()
for _ in range(50):
    try:
        socket.create_connection(("127.0.0.1", port), 0.2).close(); break
    except OSError:
        time.sleep(0.1)


def ask(host, at=None):
    c = http.client.HTTPConnection("127.0.0.1", at or port, timeout=10)
    c.putrequest("GET", "/the_forge.html", skip_host=True, skip_accept_encoding=True)
    if host is not None:
        c.putheader("Host", host)
    c.endheaders()
    r = c.getresponse(); d = r.read(); c.close()
    return r.status, d


st, d = ask("127.0.0.1:%d" % port)
ok(st == 200 and d == PAGE, "the window's own request (Host 127.0.0.1:%d) gets the page" % port, st)
st, d = ask("localhost:%d" % port)
ok(st == 200 and d == PAGE, "localhost at the same port too", st)
for host in ("evil.example:%d" % port, "evil.example", "127.0.0.1:%d" % (port + 1), "192.168.1.20:%d" % port, None):
    st, d = ask(host)
    ok(st == 421 and b"the page" not in d, "a request naming %s is refused, and nothing of the page is in the answer" % (host or "no host"), (st, d[:50]))


def serve(start):
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0)); at = s.getsockname()[1]
    threading.Thread(target=lambda: start(at), daemon=True).start()
    for _ in range(50):
        try:
            socket.create_connection(("127.0.0.1", at), 0.2).close(); break
        except OSError:
            time.sleep(0.1)
    return at


# the port in its place rather than by name: the same rule
p2 = serve(lambda at: bottle.run(app, "wsgiref", "127.0.0.1", at, quiet=True))
ok(ask("127.0.0.1:%d" % p2, p2)[0] == 200 and ask("127.0.0.1:%d" % (p2 + 1), p2)[0] == 421 and ask("evil.example:%d" % p2, p2)[0] == 421,
   "a server given its port in its place keeps the same rule (its own port answered; another port, another name refused)")
# a server started with no port the guard can see (were a later pywebview to start it so): the window still gets its page,
# by the computer's own name; any other name is still refused
p3 = serve(lambda at: bottle.run(app=app, server=bottle.WSGIRefServer(host="127.0.0.1", port=at), quiet=True))
st3 = [ask(h, p3)[0] for h in ("127.0.0.1:%d" % p3, "localhost:%d" % p3, "evil.example:%d" % p3, "evil.example", "192.168.1.20:%d" % p3)]
ok(st3 == [200, 200, 421, 421, 421], "a server whose port the guard cannot see never leaves the window blank, and still refuses every other name", st3)
print("\n%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
