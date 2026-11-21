"""Ingenium 7.64 · the Fire and Android app's own check of its copy (SelfCore.java, Fire and iPhone repository), on this computer: what the
check is given is made here, and rig/selfcore/SelfCoreTest.java runs SelfCore against it.
  - a test page with blocks carried for later, an engine and a kit store; its phone copy made by tools/app_page.py itself, with a build
    number stamped in (copy/); the computer's own reading of the copy for phones and tablets (build/desktop/app_self2_764.py: fields.json)
  - a test key (never the owner's) in self.json, and signatures made with it: the copy's alone (mobile.json), the file Save the signature
    makes with both (list.json); another key's, one changed after signing, one for another version, one for another copy, one of the
    computer apps' kind, a file with only that one, and a file that is not a signature
  - the copy with one byte changed (changed/), with a carried file taken away (missing/), and a copy of another version (older/)
  - optionally a real release page's phone copy (real/), read against the computer's reading of the same page
    python3 -I rig/t_764_self_core.py <ingenium_app.py with app_self2_764> <tools/app_page.py> <SelfCore.java> <self_refused.html> [<a release page>]"""
import base64, hashlib, importlib.util, json, os, shutil, subprocess, sys, tempfile

if len(sys.argv) < 5:
    sys.exit(__doc__)
APP, APPPAGE, CORE, REFUSED = sys.argv[1:5]
REAL = sys.argv[5] if len(sys.argv) > 5 else None
HERE = os.path.dirname(os.path.abspath(__file__))
TMP = tempfile.mkdtemp(prefix="t764core-")
os.environ["XDG_DATA_HOME"] = os.path.join(TMP, "data")
os.environ["HOME"] = os.path.join(TMP, "home")
os.makedirs(os.environ["HOME"], exist_ok=True)
sys.path.insert(0, os.path.dirname(os.path.abspath(APP)))
spec = importlib.util.spec_from_file_location("ingenium_app", APP)
ia = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ia)
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.asymmetric.utils import decode_dss_signature


def b64u(b):
    return base64.urlsafe_b64encode(b).decode("ascii").rstrip("=")


def kid_of(x, y):
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


def page(version="7.64", edition="master"):
    return ('<!doctype html><html><head><meta charset="utf-8"><meta name="ingenium-build" content=""><title>Test</title></head><body>\n'
            '<script>var ING_VERSION="%s",ING_PAGE_DATE="21 November 2026";var ING_EDITION="%s";</script>\n' % (version, edition) +
            '<div data-defer="#ing-tail:ing-apps"></div><div data-defer="#ing-tail:ing-pdf"></div><p>Ünïcödé · ✓</p>\n'
            '<script id="ingenium-engine-js" type="text/plain">ENGINE-' + "e" * 5000 + '</script>\n'
            '<script id="ingenium-kit-bundle" type="application/json">{"kits":"' + "k" * 3000 + '"}</script>\n'
            '<script>window.__ok=1;</script>\n' + "<!-- " + "x" * (1 << 20) + " -->\n"
            '<script id="ing-tail:ing-apps" type="text/plain">APPS-' + "a" * 7000 + '</script>\n'
            '<script id="ing-tail:ing-pdf" type="text/plain">PDF-' + "p" * 4000 + '</script>\n'
            '<script id="ing-tail:ingenium-engine-wasm" type="text/plain">WASM-' + "w" * 2000 + '</script>\n'
            '</body></html>\n')


def app_page(src, dst_dir, build):
    os.makedirs(dst_dir, exist_ok=True)
    subprocess.run([sys.executable, "-I", APPPAGE, src, os.path.join(dst_dir, "ingenium.html"), "--build", build], check=True, capture_output=True)


V = os.path.join(TMP, "v")
os.makedirs(V)
SRC = os.path.join(TMP, "page.html")
open(SRC, "w", encoding="utf-8").write(page())
app_page(SRC, os.path.join(V, "copy"), "7.64.20261121.258")
ver, ed, mob_files, own = ia._self2_fields(open(SRC, "rb").read())
json.dump(mob_files, open(os.path.join(V, "fields.json"), "w"))
KEY, PUB = make_key()
OTHER, OPUB = make_key()
json.dump({"release": "7.64", "keys": [PUB]}, open(os.path.join(V, "self.json"), "w"))
MOB = {"kind": "ingenium-release", "v": 1, "app": "ingenium-mobile", "version": ver, "edition": ed, "files": mob_files, "made": "2026-11-21T21:00:00.000Z"}
DESK = dict(MOB, app="ingenium", files={"ingenium.html": own})
W = lambda n, o: json.dump(o, open(os.path.join(V, n), "w"))
W("mobile.json", sign(KEY, PUB["kid"], MOB))
W("list.json", {"kind": "ingenium-release-signatures", "v": 1, "signatures": [sign(KEY, PUB["kid"], DESK), sign(KEY, PUB["kid"], MOB)]})
W("other_key.json", sign(OTHER, OPUB["kid"], MOB))
W("changed_sig.json", dict(sign(KEY, PUB["kid"], MOB), release=dict(MOB, made="2026-11-22T21:00:00.000Z")))
W("other_version.json", sign(KEY, PUB["kid"], dict(MOB, version="7.63")))
W("other_copy.json", sign(KEY, PUB["kid"], dict(MOB, files=dict(mob_files, **{"carried-ing-pdf.txt": {"sha256": "0" * 64, "size": 3}}))))
W("desk_only.json", sign(KEY, PUB["kid"], DESK))
W("list_desk_only.json", {"kind": "ingenium-release-signatures", "v": 1, "signatures": [sign(KEY, PUB["kid"], DESK)]})
open(os.path.join(V, "junk.json"), "w").write("hello")
shutil.copytree(os.path.join(V, "copy"), os.path.join(V, "changed"))
p = os.path.join(V, "changed", "ingenium.html")
b = bytearray(open(p, "rb").read())
i = b.index(b"window.__ok=1")
b[i + len("window.__ok=")] = ord("2")
open(p, "wb").write(bytes(b))
shutil.copytree(os.path.join(V, "copy"), os.path.join(V, "missing"))
os.remove(os.path.join(V, "missing", "carried-ing-pdf.txt"))
OLD = os.path.join(TMP, "older.html")
open(OLD, "w", encoding="utf-8").write(page(version="7.63"))
app_page(OLD, os.path.join(V, "older"), "7.63.20261121.257")
shutil.copy(REFUSED, os.path.join(V, "self_refused.html"))
if REAL:
    app_page(REAL, os.path.join(V, "real"), "7.64.20261121.300")
    json.dump(ia._self2_fields(open(REAL, "rb").read())[2], open(os.path.join(V, "real_fields.json"), "w"))
OUT = os.path.join(TMP, "classes")
os.makedirs(OUT)
subprocess.run(["javac", "-nowarn", "-d", OUT, CORE, os.path.join(HERE, "selfcore", "SelfCoreTest.java")], check=True)
r = subprocess.run(["java", "-cp", OUT, "com.yannieforest.ingenium.SelfCoreTest", V])
shutil.rmtree(TMP, ignore_errors=True)
sys.exit(r.returncode)
