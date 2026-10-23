"""Ingenium 6.2 · the computer app's own address answers its own window only (desktop/app_guard_62.py applied to
ingenium_app.py), with the app's own page server, started as the app starts it:

  python3 -I rig/t_62_app_guard.py path/to/patched/ingenium_app.py

Checks: a request that names the app's address (127.0.0.1 or localhost at its port), as the window does, is answered (the
page, its parts, a HEAD); one that names any other host, as a page that has pointed its own name at 127.0.0.1 would ("DNS
rebinding"), is refused with 421 and nothing of the page in the answer, for GET, HEAD and POST (the relay too); one with no
Host at all is refused; the relay still asks for its secret even with the right Host."""
import http.client, importlib.util, os, sys, tempfile, types

APP = sys.argv[1]
passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    print(("PASS " if c else "FAIL ") + m + ("  " + str(d)[:300] if d is not None else ""))
    if c:
        passed += 1
    else:
        failed += 1


sys.modules["webview"] = types.ModuleType("webview")
spec = importlib.util.spec_from_file_location("ingenium_app", APP)
ia = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ia)

d = tempfile.mkdtemp()
PAGE = b"<!doctype html><title>Ingenium</title><h1>the page</h1>" + b"x" * 5000
open(os.path.join(d, "ingenium.html"), "wb").write(PAGE)
port = ia._start_local_server(d, "ingenium.html")


def ask(method, path, host, body=None, headers=None):
    c = http.client.HTTPConnection("127.0.0.1", port, timeout=10)
    c.putrequest(method, path, skip_host=True, skip_accept_encoding=True)
    if host is not None:
        c.putheader("Host", host)
    for k, v in (headers or {}).items():
        c.putheader(k, v)
    if body is not None:
        c.putheader("Content-Length", str(len(body)))
    c.endheaders(body)
    r = c.getresponse()
    data = r.read()
    c.close()
    return r.status, data


own = "127.0.0.1:%d" % port
st, data = ask("GET", "/ingenium.html", own)
ok(st == 200 and data == PAGE, "the window's own request (Host %s) is answered with the page" % own, st)
st, data = ask("GET", "/ingenium.html", "localhost:%d" % port)
ok(st == 200 and data == PAGE, "localhost at the same port too", st)
st, data = ask("HEAD", "/ingenium.html", own)
ok(st == 200, "and a HEAD", st)
for host in ("evil.example:%d" % port, "evil.example", "127.0.0.1:%d" % (port + 1), "127.0.0.1", "192.168.1.20:%d" % port):
    st, data = ask("GET", "/ingenium.html", host)
    ok(st == 421 and b"the page" not in data, "a request naming %s is refused, and nothing of the page is in the answer" % host, (st, data[:60]))
st, data = ask("HEAD", "/ingenium.html", "evil.example:%d" % port)
ok(st == 421, "a HEAD naming another host is refused", st)
st, data = ask("GET", "/_engine/has", "evil.example:%d" % port)
ok(st == 421, "the engine's parts are refused to another host", st)
st, data = ask("GET", "/ingenium.html", None)
ok(st in (400, 421) and b"the page" not in data, "a request with no Host is refused", st)
body = b'{"url":"https://example.com/","method":"GET"}'
st, data = ask("POST", "/_relay", "evil.example:%d" % port, body, {"Content-Type": "application/json", "X-Ingenium-Key": "guess"})
ok(st == 421, "the relay is refused to another host before anything else", st)
st, data = ask("POST", "/_relay", own, body, {"Content-Type": "application/json", "X-Ingenium-Key": "guess"})
ok(st == 403, "with the right Host, the relay still asks for its own secret", st)
print("\n%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
