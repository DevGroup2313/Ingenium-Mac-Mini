"""Ingenium 6.7: the relay never carries a key to another host (patch for ingenium_app.py, Mac and Windows; applied after
app_frames_67.py).

Found in the security audit (25 October 2026). The relay carries the page's requests to a connection (a cloud model, web search,
GitHub) with the headers the page gives, keys included (Authorization, x-api-key and the like). Python's urllib follows a
redirect and copies those headers to wherever it points, even another host, which a browser never does. So a service that
answered with a redirect elsewhere would hand the owner's key to that other host. Now a redirect to another host, or from https
down to http, is followed without any header that carries a key, token or password.

    python3 build/desktop/app_relay_67.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_IngSafeRedirect" in s:
    print("already patched", p)
    sys.exit(0)

rep('''def _relay_urllib(url, method, headers, body):
''', '''class _IngSafeRedirect(urllib.request.HTTPRedirectHandler):
    """6.7 (app_relay_67.py): a redirect to another host, or from https to http, keeps no header that carries a key."""
    _SECRET = ("authorization", "proxy-authorization", "cookie", "x-api-key", "api-key", "x-goog-api-key",
               "x-subscription-token", "anthropic-api-key", "openai-organization")

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        new = urllib.request.HTTPRedirectHandler.redirect_request(self, req, fp, code, msg, headers, newurl)
        if new is None:
            return None
        try:
            a, b = urllib.parse.urlsplit(req.full_url), urllib.parse.urlsplit(new.full_url)
            moved = (a.hostname or "").lower() != (b.hostname or "").lower() or (a.port != b.port)
            downgraded = a.scheme.lower() == "https" and b.scheme.lower() != "https"
            if moved or downgraded:
                for k in list(new.headers.keys()):
                    lk = k.lower()
                    if lk in self._SECRET or "token" in lk or "secret" in lk or "password" in lk or lk.endswith("key"):
                        del new.headers[k]
        except Exception:
            return None
        return new


def _ing_urlopen(req, timeout, ctx):
    """urlopen with the safe redirect (6.7, app_relay_67.py)."""
    handlers = [_IngSafeRedirect()]
    if ctx is not None:
        handlers.append(urllib.request.HTTPSHandler(context=ctx))
    return urllib.request.build_opener(*handlers).open(req, timeout=timeout)


def _relay_urllib(url, method, headers, body):
''')
rep('''    with urllib.request.urlopen(req, timeout=300,
                                context=ctx if url.startswith("https://") else None) as resp:''',
    '''    with _ing_urlopen(req, 300, ctx if url.startswith("https://") else None) as resp:''')
rep('''        resp = urllib.request.urlopen(req, timeout=timeout, context=ctx)
        return int(resp.status), resp''', '''        resp = _ing_urlopen(req, timeout, ctx)
        return int(resp.status), resp''')
if "import urllib.parse" not in s and "urllib.parse" not in s.split("def ", 1)[0]:
    rep("import urllib.request\n", "import urllib.request\nimport urllib.parse\n")
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
