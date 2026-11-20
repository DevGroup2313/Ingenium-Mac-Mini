"""Ingenium 7.58 · Ingenium itself, signed and checked, the computer app's side (build/desktop/app_self_758.py), with a test key made here
(never the owner's: the app's own keys are put aside for the test, in this process only). A test page and a test copy of the app's folder
(XDG_DATA_HOME in a temporary folder), then: not signed; a signature kept and checked; the page changed (refused, and the refusal names
the file and both fingerprints); the page naming another version or edition; another key's signature, a signature changed after signing,
one for another version or for another copy, all refused with nothing kept; the author's own page never refused; the app's own address
gives a changed page to no one (the page, its parts, the window's page); a refusal kept for the room; the page's mark from the same
reading; the bridge on both windows' bridges; and, for each app file named, its release and keys written in as release.py writes them.

    python3 -I rig/t_758_self_check.py <ingenium_app.py, patched> [<more ingenium_app.py> ...]"""
import base64, hashlib, http.client, importlib.util, json, os, re, shutil, sys, tempfile, time

APPS = sys.argv[1:]
if not APPS:
    sys.exit(__doc__)
ok = bad = 0


def check(cond, what, more=""):
    global ok, bad
    if cond:
        ok += 1
        print("PASS", what)
    else:
        bad += 1
        print("FAIL", what, more)


TMP = tempfile.mkdtemp(prefix="t758self-")
os.environ["XDG_DATA_HOME"] = os.path.join(TMP, "data")
os.environ["HOME"] = os.path.join(TMP, "home")
os.makedirs(os.environ["HOME"], exist_ok=True)
sys.path.insert(0, os.path.dirname(os.path.abspath(APPS[0])))
spec = importlib.util.spec_from_file_location("ingenium_app", APPS[0])
ia = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ia)

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.asymmetric.utils import decode_dss_signature


def b64u(b):
    return base64.urlsafe_b64encode(b).decode("ascii").rstrip("=")


def kid_of(x, y):  # as security/permits.py and PermitCore's kidOf
    canon = json.dumps({"crv": "P-256", "kty": "EC", "x": x, "y": y}, sort_keys=True, separators=(",", ":"))
    return b64u(hashlib.sha256(canon.encode("utf-8")).digest())[:22]


def make_key():
    k = ec.generate_private_key(ec.SECP256R1())
    n = k.public_key().public_numbers()
    x, y = b64u(n.x.to_bytes(32, "big")), b64u(n.y.to_bytes(32, "big"))
    return k, {"kid": kid_of(x, y), "x": x, "y": y}


def sign(k, kid, body):
    r, s_ = decode_dss_signature(k.sign(ia._self_canon(body).encode("utf-8"), ec.ECDSA(hashes.SHA256())))
    return {"kind": "ingenium-release-signature", "v": 1, "release": body, "kid": kid, "sig": b64u(r.to_bytes(32, "big") + s_.to_bytes(32, "big"))}


# the release and the keys release.py writes in, in each app file named (before the test puts its own in, in this process)
vj = None
for p in APPS:
    src = open(p, encoding="utf-8").read()
    m = re.search(r'^_SELF_RELEASE = "([0-9.]*)"  # ING-SELF-RELEASE$', src, re.M)
    k = re.search(r'^_SELF_KEYS = (\[.*\])  # ING-SELF-KEYS$', src, re.M)
    check(bool(m and m.group(1)), "%s: its release is written in (%s)" % (os.path.basename(os.path.dirname(os.path.abspath(p))), m and m.group(1)))
    keys = json.loads(k.group(1)) if k else []
    check(bool(keys) and all(set(x) == {"kid", "x", "y"} and x["kid"] == kid_of(x["x"], x["y"]) for x in keys),
          "%s: the owner's public keys are written in, each its own fingerprint, and no private part" % os.path.basename(os.path.dirname(os.path.abspath(p))))
    page = os.path.join(os.path.dirname(os.path.abspath(p)), "ingenium.html")
    if m and os.path.isfile(page):
        pv = ia._self_read(page)
        check(pv and pv["version"] == m.group(1), "%s: the release written in is its page's own (%s)" % (os.path.basename(os.path.dirname(os.path.abspath(p))), pv and pv["version"]))

# the test's own key in place of the owner's, in this process only
KEY, PUB = make_key()
OTHER, OPUB = make_key()
ia._SELF_KEYS = [PUB]
ia._SELF_RELEASE = "7.58"
APPDIR = os.path.join(TMP, "app")
os.makedirs(APPDIR)
PAGE = os.path.join(APPDIR, "ingenium.html")
BODY0 = '<!doctype html><html><head><meta charset="utf-8"><meta name="ingenium-build" content=""><title>Test</title></head><body><script>var ING_VERSION="7.58",ING_PAGE_DATE="20 November 2026";var ING_EDITION="master";</script>A test page.</body></html>'


def write_page(text):
    with open(PAGE, "w", encoding="utf-8") as fh:
        fh.write(text)
    t = time.time() + (write_page.n or 0)
    write_page.n = (write_page.n or 0) + 2
    os.utime(PAGE, (t, t))  # a new time each write, as a file changed on a disk would have


write_page.n = 0
write_page(BODY0)
ia._PAGE["builtin"] = PAGE
ia._APP_HTML_PATH = PAGE
ia._PAGE["serve"] = None


def body_now(**kw):
    got = ia._self_read(PAGE, True)
    b = {"kind": "ingenium-release", "v": 1, "app": "ingenium", "version": got["version"], "edition": got["edition"],
         "files": {"ingenium.html": {"sha256": got["sha256"], "size": got["size"]}}, "made": "2026-11-20T21:00:00.000Z"}
    b.update(kw)
    return b


st = ia._self_answer(True)
check(st.get("state") == "unsigned" and st.get("version") == "7.58" and st.get("edition") == "master" and st.get("can") is True,
      "a copy with no signature: not signed yet, its version and edition read from its page", json.dumps(st)[:300])
check(st["files"]["ingenium.html"]["sha256"] == hashlib.sha256(BODY0.encode()).hexdigest() and st["files"]["ingenium.html"]["size"] == len(BODY0.encode()),
      "its fingerprint and size are the page's own")
check(not ia._self_gate(ia._self_state(PAGE)), "a copy not signed opens")

good = sign(KEY, PUB["kid"], body_now())
r = ia._self_put(json.dumps(good))
check(r.get("ok") and r.get("state") == "signed" and r.get("kept", "").endswith(".ingsig"), "a signature of the test key's, for this very copy, is kept: signed", json.dumps(r)[:300])
sdir = ia._self_dir(False)
check(sdir and os.path.isfile(os.path.join(sdir, r.get("kept", "x"))) and os.path.dirname(sdir) == os.path.join(os.environ["XDG_DATA_HOME"], ia.APP_FOLDER),
      "it is kept in <the app's folder>/signatures, beside storage")
g = ia._self_get()
check(g.get("ok") and json.loads(g["text"])["sig"] == good["sig"] and g["name"] == "Ingenium 7.58 signature.ingsig", "the signature kept can be saved for another computer")
st = ia._self_answer(True)
check(st["signed"] and st["signed"]["made"] == "2026-11-20T21:00:00.000Z" and st["signed"]["kid"] == PUB["kid"], "the room is told when it was signed, and with which key")

# the page changed, its version and edition the same
write_page(BODY0.replace("A test page.", "A test page, changed by someone else."))
st = ia._self_state(PAGE, True)
check(st["state"] == "changed" and st["changed"] and st["changed"][0]["name"] == "ingenium.html" and st["changed"][0]["why"] == "content",
      "the page changed after it was signed: changed, ingenium.html named", json.dumps(st.get("changed"))[:300])
check(ia._self_gate(st), "a changed copy does not open")
html = ia._self_refusal_html(st)
w = good["release"]["files"]["ingenium.html"]["sha256"]
n = st["changed"][0]["now"]["sha256"]
check("Ingenium did not open" in html and "ingenium.html" in html and w[:8] in html and n[:8] in html and "20 November 2026" in html,
      "the refusal names the file, what was signed and what is there now, and the day it was signed")
check("http" not in html.replace("http-equiv", "") and "<script src" not in html and "<link" not in html, "the refusal page reaches nothing outside this computer")
r = ia._self_put(json.dumps(good))
check(not r.get("ok") and "another copy" in r.get("error", ""), "the same signature cannot be brought in again for the changed copy", r.get("error"))
write_page(BODY0)
check(ia._self_state(PAGE, True)["state"] == "signed", "the page as it was: signed again, it opens")

# the page naming another version, or another edition, than the one signed for this app's release
write_page(BODY0.replace('ING_VERSION="7.58"', 'ING_VERSION="7.58.1"').replace("A test page.", "Another page."))
st = ia._self_state(PAGE, True)
check(st["state"] == "changed" and st["changed"][0]["why"] == "version" and ia._self_gate(st), "a page put in naming a new version, in an app released as 7.58 and signed: changed", json.dumps(st.get("changed")))
check("It names Ingenium <b>7.58.1</b>" in ia._self_refusal_html(st), "the refusal says which version the page names")
write_page(BODY0.replace('ING_EDITION="master"', 'ING_EDITION="gift"'))
st = ia._self_state(PAGE, True)
check(st["state"] == "changed" and st["changed"][0]["why"] == "edition" and ia._self_gate(st), "a page put in naming another edition: changed", json.dumps(st.get("changed")))
write_page(BODY0.replace('ING_VERSION="7.58"', 'ING_VERSION="7.59"'))
ia._SELF_RELEASE = "7.59"
check(ia._self_state(PAGE, True)["state"] == "unsigned", "an app of a new release, with its own page, not signed yet: it opens as not signed")
ia._SELF_RELEASE = "7.58"
write_page(BODY0)

# signatures that are not hers, or not for this copy: refused, nothing kept
before = sorted(os.listdir(sdir))
r = ia._self_put(json.dumps(sign(OTHER, OPUB["kid"], body_now())))
check(not r.get("ok") and "owner's keys" in r.get("error", ""), "a signature made with a key this app does not carry is refused", r.get("error"))
forged = sign(OTHER, PUB["kid"], body_now())
r = ia._self_put(json.dumps(forged))
check(not r.get("ok") and "does not match" in r.get("error", ""), "another key's signature under the owner's key number is refused", r.get("error"))
moved = json.loads(json.dumps(good))
moved["release"]["files"]["ingenium.html"]["size"] += 1
r = ia._self_put(json.dumps(moved))
check(not r.get("ok") and "does not match" in r.get("error", ""), "a signature whose fields were changed after signing is refused", r.get("error"))
r = ia._self_put(json.dumps(sign(KEY, PUB["kid"], body_now(version="7.57"))))
check(not r.get("ok") and "is for Ingenium 7.57" in r.get("error", ""), "a signature for another version is refused, and says which", r.get("error"))
r = ia._self_put(json.dumps(sign(KEY, PUB["kid"], body_now(extra="x"))))
check(not r.get("ok"), "a signature holding other fields than a release's is refused", r.get("error"))
for t in ("", "not json", json.dumps({"kind": "offline-project-permission"}), "x" * 70000):
    r = ia._self_put(t)
    check(not r.get("ok"), "refused: %r" % t[:30], r.get("error"))
check(sorted(os.listdir(sdir)) == before, "nothing was kept for any of them")
with open(os.path.join(sdir, "planted.ingsig"), "w") as fh:
    json.dump(sign(OTHER, OPUB["kid"], body_now(made="2026-11-21T09:00:00Z")), fh)
write_page(BODY0.replace("A test page.", "A page changed, with a signature planted beside it."))
st = ia._self_state(PAGE, True)
check(st["state"] == "changed", "a signature planted in the folder with another key counts for nothing: the changed page is still refused")
os.remove(os.path.join(sdir, "planted.ingsig"))
write_page(BODY0)

# the build number a device build stamps in (tools/stamp_build.py) is left out of what is signed; nothing else is
stamped = BODY0.replace('<meta name="ingenium-build" content="">', '<meta name="ingenium-build" content="7.58.20261121.42">', 1)
write_page(stamped)
got = ia._self_read(PAGE, True)
check(got["sha256"] == hashlib.sha256(BODY0.encode()).hexdigest() and got["size"] == len(BODY0.encode()) and got["build"] == "7.58.20261121.42",
      "a device build's copy, its build number stamped in, has the release's own fingerprint and size (as BUILD_INFO.txt lists it), and its build is read", json.dumps({k: got[k] for k in ("sha256", "size", "build")}))
st = ia._self_state(PAGE, True)
check(st["state"] == "signed" and st["build"] == "7.58.20261121.42", "one signature serves every device build of the release: the stamped copy is signed")
check(ia._page_mark(PAGE) == got["sha256"][:12] + "-7.58.20261121.42", "the page's mark still changes with every build")
write_page(BODY0.replace('<meta name="ingenium-build" content="">', '<meta name="ingenium-build" content="7.58 <b>x</b>">', 1))
check(ia._self_state(PAGE, True)["state"] == "changed", "anything in that tag but a build number (letters, digits, dots and dashes) is read as it is: changed")
write_page(stamped.replace("A test page.", "A test page, changed after the build was stamped."))
check(ia._self_state(PAGE, True)["state"] == "changed", "a stamped copy changed anywhere else: changed")
write_page(BODY0)

# the canon is PermitCore's (rig/t_758_self_page.js checks it against the page's own, in the browser)
check(ia._self_canon({"b": 1, "a": [True, None, "é\"/"], "c": {"z": 0, "y": "x"}}) == '{"a":[true,null,"é\\"/"],"b":1,"c":{"y":"x","z":0}}',
      "the fixed order: keys sorted at every level, no spaces, text as JSON writes it")

# the author's own page (6.19) is hers: never refused
write_page(BODY0.replace("A test page.", "Changed while her own page runs."))
own = os.path.join(TMP, "own.html")
open(own, "w").write(BODY0.replace("A test page.", "Her own page."))
ia._PAGE["serve"] = own
st = ia._self_state(PAGE, True)
check(st["state"] == "changed" and st["own"] is True and not ia._self_gate(st), "with her own page chosen, a changed built page is said, and never refused")
ia._PAGE["serve"] = None

# the app's own address: a changed page is given to no one
ia._SELF["last"] = None
port = ia._start_local_server(APPDIR, "ingenium.html")


def get(path, doc=False):
    c = http.client.HTTPConnection("127.0.0.1", port, timeout=20)
    h = {"Host": "127.0.0.1:%d" % port}
    if doc:
        h["Sec-Fetch-Dest"] = "document"
    c.request("GET", path, headers=h)
    r = c.getresponse()
    return r.status, r.read()


code, data = get("/ingenium.html", True)
check(code == 200 and b"Ingenium did not open" in data and b"Changed while her own page runs." not in data, "the window's load of a changed page gets the refusal, not the page", (code, data[:120]))
code, data = get("/ingenium.html?full=1")
check(code == 200 and b"Ingenium did not open" in data, "the page read whole gets the refusal too")
code, data = get("/_payload/a")
check(code == 403, "the page's parts are given to no one", code)
code, data = get("/ingenium_window.html")
check(code == 403, "the window's page is given to no one", code)
check(len(ia._self_refusals()) == 1, "the refusals of one changed page, asked four times, are kept once", len(ia._self_refusals()))
os.remove(ia._self_refused_file())
write_page(BODY0)
time.sleep(2.2)
code, data = get("/ingenium.html?full=1")
check(code == 200 and b"A test page." in data and b"Ingenium did not open" not in data, "the page as it was is served again", (code, data[:120]))

# a refusal is kept for the room; the page's mark from the same reading
write_page(BODY0.replace("A test page.", "Changed once more."))
st = ia._self_state(PAGE, True)
ia._self_refused(st)
write_page(BODY0)
st = ia._self_answer(True)
check(st["state"] == "signed" and len(st.get("refused") or []) == 1 and st["refused"][0]["changed"][0]["name"] == "ingenium.html", "a refusal is kept, and the room is told of it at the next start that opens")
check(ia._page_mark(PAGE) == hashlib.sha256(BODY0.encode()).hexdigest()[:12], "the page's mark comes from the same reading (no build number stamped in)")
ia._SELF["read"].clear()
calls = []
orig = ia.hashlib.sha256
ia.hashlib.sha256 = lambda *a: (calls.append(1), orig(*a))[1]
ia._page_mark(PAGE)
ia._self_state(PAGE)
ia.hashlib.sha256 = orig
check(len(calls) == 1, "a start reads the page once for its mark and its check", len(calls))

# without the means to check: it opens, and says so
real = ia._self_can
ia._self_can = lambda: False
write_page(BODY0.replace("A test page.", "Changed, and nothing to check it with."))
st = ia._self_state(PAGE, True)
check(st["state"] == "unchecked" and not ia._self_gate(st), "without its cryptography part, the app opens and says it cannot check")
ia._self_can = real
write_page(BODY0)

# both windows' bridges
for cls in (ia.IngeniumApi, ia.IngeniumApiSingle):
    check(all(callable(getattr(cls, n, None)) for n in ("self_check", "self_signature_put", "self_signature_get", "self_reveal", "self_quit")),
          "%s carries self_check, self_signature_put, self_signature_get, self_reveal and self_quit" % cls.__name__)
b = ia.IngeniumApi("http://127.0.0.1/")
check(b.self_check().get("state") == "signed", "self_check answers through the bridge")

shutil.rmtree(TMP, ignore_errors=True)
print("%d passed, %d failed" % (ok, bad))
sys.exit(1 if bad else 0)
