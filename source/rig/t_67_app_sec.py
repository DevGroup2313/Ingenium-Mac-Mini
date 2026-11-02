"""Ingenium 6.7 · the computer app's two security patches (desktop/app_frames_67.py and desktop/app_relay_67.py applied to
ingenium_app.py), with real redirects between two small servers on this computer:

  python3 -I rig/t_67_app_sec.py path/to/patched/ingenium_app.py

Checks: a redirect to another host (here another port) is followed without the headers that carry a key, a token, a cookie or a
password, and keeps the others; a redirect on the same host keeps them all; a redirect from https down to http keeps no key
(asked of the redirect handler directly, with no network); the relay's two ways out both go through it; the native bridge's
guard on frames is in place, is called before the window starts, and does nothing off a Mac."""
import http.server, importlib.util, inspect, json, sys, threading, types, urllib.request

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


class Echo(http.server.BaseHTTPRequestHandler):
    """/to/<port>/<path> answers 302 to that port on 127.0.0.1; anything else answers with the headers it was sent."""

    def do_GET(self):
        if self.path.startswith("/to/"):
            port, rest = self.path[4:].split("/", 1)
            self.send_response(302)
            self.send_header("Location", "http://127.0.0.1:%s/%s" % (port, rest))
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        body = json.dumps({k.lower(): v for k, v in self.headers.items()}).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *a):
        pass


def serve():
    s = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Echo)
    threading.Thread(target=s.serve_forever, daemon=True).start()
    return s, s.server_address[1]


sa, pa = serve()
sb, pb = serve()
SENT = {"Authorization": "Bearer sk-owner", "x-api-key": "key-1", "anthropic-api-key": "key-2", "X-Goog-Api-Key": "key-3",
        "Cookie": "session=1", "X-Subscription-Token": "tok", "X-Client-Secret": "sec", "Content-Type": "application/json",
        "X-Ingenium-Note": "kept", "Accept": "application/json"}
SECRET = ["authorization", "x-api-key", "anthropic-api-key", "x-goog-api-key", "cookie", "x-subscription-token", "x-client-secret"]


def get(url):
    req = urllib.request.Request(url, headers=dict(SENT))
    with ia._ing_urlopen(req, 10, None) as r:
        return json.loads(r.read().decode())


ok(hasattr(ia, "_IngSafeRedirect") and hasattr(ia, "_ing_urlopen"), "the relay patch is in the app (_IngSafeRedirect, _ing_urlopen)")
other = get("http://127.0.0.1:%d/to/%d/echo" % (pa, pb))
# (urllib itself leaves out Content-Type and Content-Length when it follows a redirect, as it turns the request into a GET)
ok(not any(k in other for k in SECRET) and other.get("x-ingenium-note") == "kept" and other.get("accept") == "application/json",
   "a redirect to another host (another port) arrives with no key, token, cookie or secret, and with the other headers",
   {k: other.get(k) for k in SECRET + ["x-ingenium-note"]})
same = get("http://127.0.0.1:%d/to/%d/echo" % (pa, pa))
ok(all(k in same for k in SECRET), "a redirect on the same host and port keeps every header, the key included", sorted(same))
direct = get("http://127.0.0.1:%d/echo" % pb)
ok(direct.get("authorization") == "Bearer sk-owner", "with no redirect the key goes where it was sent", direct.get("authorization"))

h = ia._IngSafeRedirect()
req = urllib.request.Request("https://api.example.com/v1", headers=dict(SENT))
new = h.redirect_request(req, None, 302, "Found", {}, "http://api.example.com/v1")
ok(new is not None and not any(k.lower() in SECRET for k in new.headers), "a redirect from https down to http keeps no key",
   new and sorted(new.headers))
new2 = h.redirect_request(urllib.request.Request("https://api.example.com/v1", headers=dict(SENT)), None, 302, "Found", {},
                          "https://api.example.com/v2")
ok(new2 is not None and "Authorization" in new2.headers, "a redirect within the same https host keeps the key", new2 and sorted(new2.headers))

src_u, src_o = inspect.getsource(ia._relay_urllib), inspect.getsource(ia._relay_open) if hasattr(ia, "_relay_open") else ""
ok("_ing_urlopen(" in src_u and "urlopen(req" not in src_u.replace("_ing_urlopen(req", ""), "the relay's request goes through the safe redirect")
ok(not src_o or ("_ing_urlopen(" in src_o and "urllib.request.urlopen(" not in src_o), "the relay's streamed request goes through it too",
   "no _relay_open" if not src_o else None)

ok(hasattr(ia, "_guard_bridge_frames"), "the bridge's guard on frames is in the app (_guard_bridge_frames)")
main = inspect.getsource(ia.main)
ok(main.find("_guard_bridge_frames()") >= 0 and main.find("_guard_bridge_frames()") < main.find("webview.start("),
   "it is called before the window starts")
if sys.platform != "darwin":
    try:
        ia._guard_bridge_frames()
        ok(True, "off a Mac it does nothing and raises nothing")
    except Exception as e:
        ok(False, "off a Mac it does nothing and raises nothing", e)

sa.shutdown()
sb.shutdown()
print("\n%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
