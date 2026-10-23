"""The Forge 644: the Forge's own address answers the Forge's own window only (patch for the_forge_app.py, Mac and Windows;
forge_repo_644.py applies it to both).

The owner's words (2026): "I want to be protected from someone stealing my code and also hacking into the apps and releasing
malicious software or to steal data and information."
The Forge's window is given its page through pywebview's own server on the computer's address (127.0.0.1). A web page open in
any browser on the same computer can try "DNS rebinding": it points a name it owns at 127.0.0.1 and then reads that address as
if it were its own site. A browser always says which name it asked for (the Host header), and the Forge's window always asks
for 127.0.0.1 at the server's port; so pywebview's server is started through a guard that refuses (421) every request naming
anything else, before any file is read. Ingenium's app takes the same rule (build/desktop/app_guard_62.py).

    python3 offline_project/forge_644/forge_guard_644.py <repo>/the_forge_app.py"""
import sys

GUARD = '''
# 644 (forge_guard_644.py): the Forge's own address answers the Forge's own window only. pywebview serves the page from
# 127.0.0.1; a request that names any other host (a page that has pointed its own name at 127.0.0.1) is refused before any
# file is read.
def _guard_local_server():
    try:
        import webview.http as _wh
    except Exception:
        return False
    b = getattr(_wh, "bottle", None)
    if b is None or getattr(b.run, "_forge_guard", False):
        return bool(b)
    orig = b.run

    def run(app=None, *a, **kw):
        port, inner = kw.get("port"), app

        def guarded(environ, start_response):
            host = (environ.get("HTTP_HOST") or "").strip().lower()
            if port and host in ("127.0.0.1:%s" % port, "localhost:%s" % port, "[::1]:%s" % port):
                return inner(environ, start_response)
            body = b"This address answers only the Forge's own window."
            start_response("421 Misdirected Request", [("Content-Type", "text/plain; charset=utf-8"),
                                                       ("Content-Length", str(len(body)))])
            return [body]
        return orig(app=guarded, *a, **kw)
    run._forge_guard = True
    b.run = run
    return True

'''


def patch(p):
    s = open(p, encoding="utf-8").read()
    if "_guard_local_server" in s:
        print("already patched", p)
        return
    n = s.count("\ndef _make_window(")
    if n != 1:
        sys.exit("%s: def _make_window( found %d times, not once" % (p, n))
    i = s.index("\ndef _make_window(") + 1
    j = s.index("\n", i) + 1
    first = s[j:]
    # the guard goes in before the window is made (pywebview starts its server when the app starts)
    doc = ""
    if first.lstrip().startswith(('"""', "'''")):
        q = first.lstrip()[:3]
        k = first.index(q) + 3
        k = first.index(q, k) + 3
        k = first.index("\n", k) + 1
        doc, first = first[:k], first[k:]
    indent = first[:len(first) - len(first.lstrip())]
    s = s[:i - 1] + GUARD + s[i - 1:j] + doc + indent + "_guard_local_server()\n" + first
    open(p, "w", encoding="utf-8", newline="").write(s)
    print("patched", p)


if __name__ == "__main__":
    for a in sys.argv[1:]:
        patch(a)
