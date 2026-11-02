"""A small WebDriver client for WebKitGTK (the engine Safari shares its editing and selection code with), for the rig's
WebKit tests. Chromium keeps a document's selection where Safari loses it; these tests need the real engine.

Needs: WebKitWebDriver and MiniBrowser (apt: webkit2gtk-driver, libwebkit2gtk-4.1-0) and a display (run under xvfb-run).

    with Session() as s:
        s.go(url); s.js("return 1+1")
        s.click(s.find("#editor"))          # a real press of the pointer, as a person makes it
"""
import json, os, socket, subprocess, time, urllib.request

MINI = "/usr/lib/x86_64-linux-gnu/webkit2gtk-4.1/MiniBrowser"
EL = "element-6066-11e4-a52e-4f735466cecf"


def _port():
    s = socket.socket(); s.bind(("127.0.0.1", 0)); p = s.getsockname()[1]; s.close(); return p


class Session:
    def __init__(self, width=1440, height=950):
        self.port = _port()
        self.drv = subprocess.Popen(["WebKitWebDriver", "--port=%d" % self.port], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        for _ in range(100):
            try:
                self._req("GET", "/status"); break
            except Exception:
                time.sleep(.1)
        caps = {"capabilities": {"alwaysMatch": {"webkitgtk:browserOptions": {"binary": MINI, "args": ["--automation"]}}}}
        self.sid = self._req("POST", "/session", caps)["sessionId"]
        self.req("POST", "/window/rect", {"width": width, "height": height})

    def __enter__(self):
        return self

    def __exit__(self, *a):
        self.close()

    def _req(self, method, path, body=None):
        data = None if body is None else json.dumps(body).encode()
        r = urllib.request.Request("http://127.0.0.1:%d%s" % (self.port, path), data=data, method=method,
                                   headers={"Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(r, timeout=300) as f:
                v = json.loads(f.read().decode() or "{}")
        except urllib.error.HTTPError as e:
            raise RuntimeError("%s %s: %s" % (method, path, e.read().decode()[:400]))
        return v.get("value", v) if path != "/session" else v.get("value", v)

    def req(self, method, path, body=None):
        return self._req(method, "/session/" + self.sid + path, body)

    def close(self):
        try:
            self.req("DELETE", "")
        except Exception:
            pass
        self.drv.terminate()

    def go(self, url):
        self.req("POST", "/url", {"url": url})

    def js(self, script, *args):
        return self.req("POST", "/execute/sync", {"script": script, "args": list(args)})

    def wait(self, script, timeout=60):
        end = time.time() + timeout
        while time.time() < end:
            try:
                if self.js(script):
                    return True
            except RuntimeError:
                pass
            time.sleep(.2)
        raise RuntimeError("waited %ds for: %s" % (timeout, script[:120]))

    def find(self, css):
        return self.req("POST", "/element", {"using": "css selector", "value": css})

    def frame(self, el=None):
        self.req("POST", "/frame", {"id": el})

    def element_click(self, el):
        self.req("POST", "/element/%s/click" % el[EL], {})

    def keys(self, el, text):
        self.req("POST", "/element/%s/value" % el[EL], {"text": text})

    def _pointer(self, acts):
        self.req("POST", "/actions", {"actions": [{"type": "pointer", "id": "mouse", "parameters": {"pointerType": "mouse"}, "actions": acts}]})
        self.req("DELETE", "/actions")

    def click(self, el, dx=0, dy=0, count=1):
        """a real press and release of the pointer on an element (its centre, moved by dx, dy)"""
        acts = [{"type": "pointerMove", "origin": el, "x": dx, "y": dy, "duration": 0}]
        for _ in range(count):
            acts += [{"type": "pointerDown", "button": 0}, {"type": "pointerUp", "button": 0}]
        self._pointer(acts)

    def click_at(self, x, y, count=1):
        """a real press and release at a point of the viewport"""
        acts = [{"type": "pointerMove", "origin": "viewport", "x": int(x), "y": int(y), "duration": 0}]
        for _ in range(count):
            acts += [{"type": "pointerDown", "button": 0}, {"type": "pointerUp", "button": 0}]
        self._pointer(acts)

    def press(self, *ks):
        """real key presses; a tuple presses its keys together (("\\ue009", "a") is Control+A)"""
        acts = []
        for k in ks:
            ks2 = k if isinstance(k, tuple) else (k,)
            acts += [{"type": "keyDown", "value": c} for c in ks2] + [{"type": "keyUp", "value": c} for c in reversed(ks2)]
        self.req("POST", "/actions", {"actions": [{"type": "key", "id": "kb", "actions": acts}]})
        self.req("DELETE", "/actions")

    def shot(self, path):
        import base64
        open(path, "wb").write(base64.b64decode(self.req("GET", "/screenshot")))
