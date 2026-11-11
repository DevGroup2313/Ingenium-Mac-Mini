"""Ingenium 6.81 · the computer that lends, tested (build/desktop/app_lend_681.py).

Her words (9 November 2026): "I want it to be easy to do and for it to work everytime and with no issues"; (11 November 2026) "please
include the mac mini, the iPad, the iPhone and Fire Tablet as well and any other devices that I may purchase in the future".
Copies of the Mac and Windows ingenium_app.py are patched (once: a second run changes nothing; both compile); the Mac copy is imported
(HOME in a temporary folder) and its gateway started on this machine. Invented devices only. Checks:
  hello says the computer's id, kind and addresses; a browser may send the device header (CORS); a device pairs with the code and is
  listed by its name and kind; a wrong code does not pair; a removed device is refused (401, removed) until it pairs again; a device
  that names no one (an older Ingenium) still works with the code; the devices are kept over a restart; the status names the models.
    python3 -I rig/t_681_lend_gateway.py <Mac ingenium_app.py> <Windows ingenium_app.py>
"""
import http.client
import importlib.util
import json
import os
import py_compile
import re
import shutil
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
PATCH = os.path.normpath(os.path.join(HERE, "..", "build", "desktop", "app_lend_681.py"))
MAC, WIN = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
WORK = tempfile.mkdtemp(prefix="lend681_")
pass_n = fail_n = 0


def ok(cond, msg, detail=None):
    global pass_n, fail_n
    print(("PASS " if cond else "FAIL ") + msg + ("" if cond or detail is None else "  " + str(detail)[:600]))
    if cond:
        pass_n += 1
    else:
        fail_n += 1


# the patch, on both apps
copies = {}
for name, src in (("mac", MAC), ("win", WIN)):
    dst = os.path.join(WORK, name + "_ingenium_app.py")
    shutil.copy(src, dst)
    r1 = subprocess.run([sys.executable, PATCH, dst], capture_output=True, text=True)
    once = open(dst, encoding="utf-8").read()
    r2 = subprocess.run([sys.executable, PATCH, dst], capture_output=True, text=True)
    twice = open(dst, encoding="utf-8").read()
    try:
        py_compile.compile(dst, doraise=True)
        compiled = True
    except Exception as e:
        compiled = str(e)
    ok(r1.returncode == 0 and "patched" in r1.stdout and "already patched" in r2.stdout and once == twice and compiled is True,
       "the patch applies once to the %s app, a second run changes nothing, and it compiles" % name, (r1.stdout, r1.stderr, r2.stdout, compiled))
    copies[name] = dst

for k in ("XDG_DATA_HOME", "LOCALAPPDATA"):
    os.environ.pop(k, None)
HOME = os.path.join(WORK, "home")
os.makedirs(HOME, exist_ok=True)
os.environ["HOME"] = HOME
spec = importlib.util.spec_from_file_location("ingenium_app", copies["mac"])
mod = importlib.util.module_from_spec(spec)
sys.modules["ingenium_app"] = mod
spec.loader.exec_module(mod)
mod._share_cfg_save({"on": True, "code": "ABCD-2345"})
mod._share_apply()
PORT = mod._SHARE["port"]
ok(bool(PORT), "the gateway starts", mod._SHARE.get("error"))


def call(method, path, body=None, code=None, dev=None, extra=None):
    c = http.client.HTTPConnection("127.0.0.1", PORT, timeout=10)
    h = {"Content-Type": "application/json"}
    if code:
        h["Authorization"] = "Bearer " + code
    if dev:
        h["X-Ingenium-Device"] = dev
    h.update(extra or {})
    c.request(method, path, body=json.dumps(body).encode() if body is not None else None, headers=h)
    r = c.getresponse()
    raw = r.read().decode("utf-8", "replace")
    hdrs = dict(r.getheaders())
    c.close()
    try:
        data = json.loads(raw) if raw else None
    except Exception:
        data = raw
    return r.status, data, hdrs


st, hello, _ = call("GET", "/ingenium/hello")
ok(st == 200 and re.fullmatch(r"[a-f0-9]{12}", hello.get("id", "")) and hello.get("kind") in ("laptop", "desktop", "box")
   and hello.get("pair") == 1 and isinstance(hello.get("addresses"), list) and hello["addresses"],
   "hello says the computer's id, its kind and every address it can be reached at", hello)
st2, hello2, _ = call("GET", "/ingenium/hello")
ok(hello2.get("id") == hello.get("id"), "the id stays the same", (hello.get("id"), hello2.get("id")))
st, _, hd = call("OPTIONS", "/ingenium/pair", extra={"Origin": "http://example.test", "Access-Control-Request-Headers": "x-ingenium-device"})
ok("X-Ingenium-Device" in (hd.get("Access-Control-Allow-Headers") or ""), "a page in a browser may send the device header", hd)

FIRE = "id=dev-fire01;kind=tablet;name=Fire%20tablet"
IPAD = "id=dev-ipad01;kind=tablet;name=iPad"
st, bad, _ = call("POST", "/ingenium/pair", {"id": "dev-fire01"}, code="WRNG-2345", dev=FIRE)
ok(st == 401, "a wrong code does not pair", (st, bad))
mod._SHARE["fails"].clear()
st, pr, _ = call("POST", "/ingenium/pair", {}, code="ABCD-2345", dev=FIRE)
ok(st == 200 and pr.get("ok") and pr.get("id") == hello.get("id") and pr.get("addresses") and pr.get("lends") is True and isinstance(pr.get("models"), list),
   "the Fire tablet pairs with the code; the answer says the computer's id, addresses and models", pr)
st, pr2, _ = call("POST", "/ingenium/pair", {"id": "dev-ipad01", "kind": "tablet", "name": "iPad"}, code="ABCD-2345")
ok(st == 200, "the iPad pairs, naming itself in the body", (st, pr2))
stt = mod._share_status()
devs = {d["id"]: d for d in stt.get("devices", [])}
ok(devs.get("dev-fire01", {}).get("name") == "Fire tablet" and devs.get("dev-fire01", {}).get("kind") == "tablet" and devs.get("dev-ipad01", {}).get("name") == "iPad"
   and stt.get("id") == hello.get("id") and stt.get("kind") == hello.get("kind") and isinstance(stt.get("model_names"), list),
   "the computer lists its devices by name and kind, and says its id, kind and model names", stt.get("devices"))
st, ms, _ = call("GET", "/v1/models", code="ABCD-2345", dev=FIRE)
ok(st == 200, "the paired Fire tablet reads the models", (st, ms))

# removed: refused until it pairs again
mod._share_device_remove("dev-fire01")
ok("dev-fire01" not in [d["id"] for d in mod._share_status()["devices"]], "a removed device leaves the list")
st, rm, _ = call("GET", "/v1/models", code="ABCD-2345", dev=FIRE)
ok(st == 401 and isinstance(rm, dict) and rm.get("error", {}).get("removed") is True, "a removed device is refused, and told it was removed", (st, rm))
st, cl, _ = call("POST", "/v1/chat/completions", {"model": "x", "messages": []}, code="ABCD-2345", dev=FIRE)
ok(st == 401, "and cannot ask for a reply either", st)
st, ms2, _ = call("GET", "/v1/models", code="ABCD-2345", dev=IPAD)
ok(st == 200, "another device is not touched", st)
st, older, _ = call("GET", "/v1/models", code="ABCD-2345")
ok(st == 200, "a device that names no one (an older Ingenium) still works with the code", st)
st, again, _ = call("POST", "/ingenium/pair", {}, code="ABCD-2345", dev=FIRE)
st2, ms3, _ = call("GET", "/v1/models", code="ABCD-2345", dev=FIRE)
ok(st == 200 and st2 == 200 and "dev-fire01" in [d["id"] for d in mod._share_status()["devices"]], "it pairs again with the code, and is listed again", (st, st2))

# kept over a restart
mod._SHARE["devices"] = {}
kept = [d["id"] for d in mod._share_devices_view()]
ok("dev-fire01" in kept and "dev-ipad01" in kept, "the devices are kept over a restart (share.json)", kept)
# a header that is not a device is ignored, not trusted
st, junk, _ = call("GET", "/v1/models", code="ABCD-2345", dev="id=<x>;name=<script>")
ok(st == 200 and "<x>" not in json.dumps(mod._share_status()["devices"]), "a header that is not a device id is ignored", st)
print("%d passed, %d failed" % (pass_n, fail_n))
sys.exit(1 if fail_n else 0)
