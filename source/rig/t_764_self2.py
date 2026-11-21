"""Ingenium 7.64 · Ingenium itself, signed and checked, part two, the computer app's side (build/desktop/app_self2_764.py), with a test key
made here (never the owner's: the app's own keys are put aside, in this process only).
  1. the copy for phones and tablets, made here, is the very copy tools/app_page.py makes (the Fire and iPhone repository's own script,
     run here): each file's fingerprint and size the same, on a test page with blocks carried for later, an engine and a kit store, and on
     a real release page; and a phone's copy with its build number stamped in reads the same once that number is left out, as phones read it
  2. self_mobile_fields gives that copy; self_mobile_signature_put keeps the owner's signature of it, and refuses one of another key, one
     changed after signing, one for another copy, one for another version, and one of the computer apps' kind, keeping nothing
  3. self_check says mobile_signed; self_signature_get gives one file with both signatures in it; self_signature_put takes that file on a
     computer that had neither, and keeps both; a file without the computer apps' signature is refused
  4. Sign a copy you give: the gift edition's page is read (its own fingerprint as the computer apps read it, and its copy for phones and
     tablets); the master edition's page is refused; and a file that is not a page of Ingenium
  5. the bridge: both windows' bridges answer the three new calls and the three that answer more

    python3 -I rig/t_764_self2.py <ingenium_app.py, patched with app_self_758 and app_self2_764> <tools/app_page.py> [<a release page>]"""
import base64, hashlib, importlib.util, json, os, re, shutil, subprocess, sys, tempfile, time

if len(sys.argv) < 3:
    sys.exit(__doc__)
APP, APPPAGE = sys.argv[1], sys.argv[2]
REAL = sys.argv[3] if len(sys.argv) > 3 else None
ok = bad = 0


def check(cond, what, more=""):
    global ok, bad
    if cond:
        ok += 1
        print("PASS", what)
    else:
        bad += 1
        print("FAIL", what, str(more)[:600])


TMP = tempfile.mkdtemp(prefix="t764self2-")
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


def files_of(folder):
    out = {}
    for n in sorted(os.listdir(folder)):
        if n == "ingenium.html" or (n.startswith("carried-") and n.endswith(".txt")):
            b = open(os.path.join(folder, n), "rb").read()
            out[n] = {"sha256": hashlib.sha256(b).hexdigest(), "size": len(b)}
    return out


def app_page(src, build=None):
    d = tempfile.mkdtemp(dir=TMP)
    cmd = [sys.executable, "-I", APPPAGE, src, os.path.join(d, "ingenium.html")] + (["--build", build] if build else [])
    subprocess.run(cmd, check=True, capture_output=True)
    return d


def as_phone(folder):
    """what a phone or tablet reads of its copy: its page with the build number in its first build tag left out"""
    out = files_of(folder)
    b = open(os.path.join(folder, "ingenium.html"), "rb").read()
    head = b[:1 << 20]
    m = re.search(rb'<meta name="ingenium-build" content="([0-9A-Za-z.\-]{0,40})">', head)
    if m:
        b = head[:m.start(1)] + head[m.end(1):] + b[1 << 20:]
    out["ingenium.html"] = {"sha256": hashlib.sha256(b).hexdigest(), "size": len(b)}
    return out


# ---------- a test page: version, edition, a build tag, an engine, a kit store, and blocks carried for later ----------
def page(version="7.64", edition="master", extra=""):
    return ('<!doctype html><html><head><meta charset="utf-8"><meta name="ingenium-build" content=""><title>Test</title></head><body>\n'
            '<script>var ING_VERSION="%s",ING_PAGE_DATE="21 November 2026";var ING_EDITION="%s";</script>\n' % (version, edition) +
            '<div data-defer="#ing-tail:ing-apps"></div><div data-defer="#ing-tail:ing-pdf"></div><p>Ünïcödé · ✓ %s</p>\n' % extra +
            '<script id="ingenium-engine-js" type="text/plain">ENGINE-' + "e" * 5000 + '</script>\n'
            '<script id="ingenium-kit-bundle" type="application/json">{"kits":"' + "k" * 3000 + '"}</script>\n'
            '<script>window.__ok=1;</script>\n'
            '<script id="ing-tail:ing-apps" type="text/plain">APPS-' + "a" * 7000 + '</script>\n'
            '<script id="ing-tail:ing-pdf" type="text/plain">PDF-' + "p" * 4000 + '</script>\n'
            '<script id="ing-tail:ingenium-engine-wasm" type="text/plain">WASM-' + "w" * 2000 + '</script>\n'
            '</body></html>\n')


APPDIR = os.path.join(TMP, "app")
os.makedirs(APPDIR)
PAGE = os.path.join(APPDIR, "ingenium.html")


def write(path, text, bump=[0]):
    with open(path, "w", encoding="utf-8", newline="") as fh:
        fh.write(text)
    bump[0] += 2
    t = time.time() + bump[0]
    os.utime(path, (t, t))


write(PAGE, page())
ia._PAGE["builtin"] = PAGE
ia._APP_HTML_PATH = PAGE
ia._PAGE["serve"] = None

# 1. the same copy as tools/app_page.py
mf = ia._self2_mobile_fields()
ref = files_of(app_page(PAGE))
check(mf.get("ok") and mf.get("files") == ref and set(ref) == {"ingenium.html", "carried-ing-apps.txt", "carried-ing-pdf.txt"},
      "the copy for phones and tablets made here is tools/app_page.py's own: the page and its two carried files, each fingerprint and size the same",
      {"here": mf.get("files"), "app_page": ref})
check(mf.get("version") == "7.64" and mf.get("edition") == "master", "it names the release's version and edition", mf)
stamped = as_phone(app_page(PAGE, "7.64.20261121.258"))
check(stamped == ref, "a phone's copy with its build number stamped in reads the same once that number is left out, as phones read it", stamped)
write(PAGE, page(extra="crlf\r\nline"))
ref_cr = files_of(app_page(PAGE))
check(ia._self2_mobile_fields().get("files") == ref_cr, "a carriage return reaches the copy as app_page.py's text reading makes it", ref_cr)
write(PAGE, page())
if REAL:
    t0 = time.time()
    raw = open(REAL, "rb").read()
    v, e, mfiles, own = ia._self2_fields(raw)
    ms = time.time() - t0
    real_ref = files_of(app_page(REAL))
    check(mfiles == real_ref, "on a real release page (%s, %s bytes): the copy made here is app_page.py's, %d files, in %.1f s"
          % (os.path.basename(os.path.dirname(os.path.abspath(REAL))), len(raw), len(real_ref), ms), {"here": len(mfiles), "app_page": len(real_ref)})
    check(own == {"sha256": hashlib.sha256(raw).hexdigest(), "size": len(raw)} or "ingenium-build\" content=\"\"" not in raw[:1 << 20].decode("utf-8", "replace"),
          "and its own fingerprint is the one 7.58 reads (its build tag empty, as a release's page has it)", own)

# 2. the signature of that copy, kept or refused
KEY, PUB = make_key()
OTHER, OPUB = make_key()
ia._SELF_KEYS = [PUB]
ia._SELF_RELEASE = "7.64"
got = ia._self_read(PAGE, True)
DESK = {"kind": "ingenium-release", "v": 1, "app": "ingenium", "version": "7.64", "edition": "master",
        "files": {"ingenium.html": {"sha256": got["sha256"], "size": got["size"]}}, "made": "2026-11-21T21:00:00.000Z"}
MOB = {"kind": "ingenium-release", "v": 1, "app": "ingenium-mobile", "version": "7.64", "edition": "master", "files": mf["files"],
       "made": "2026-11-21T21:00:00.000Z"}
B = ia.IngeniumApi("http://127.0.0.1/")
st = B.self_check(True)
check(st.get("state") == "unsigned" and st.get("mobile_signed") is False, "not signed: self_check says so, and mobile_signed is false", st)
check(ia._self_put(json.dumps(sign(KEY, PUB["kid"], DESK))).get("state") == "signed", "the computer apps' signature is kept (7.58's way)")


def kept_mobile():
    d = ia._self_dir(False)
    return sorted(n for n in os.listdir(d) if n.startswith("ingenium-mobile-")) if d and os.path.isdir(d) else []


for what, f in [("another key's", sign(OTHER, OPUB["kid"], MOB)),
                ("one changed after signing", dict(sign(KEY, PUB["kid"], MOB), release=dict(MOB, made="2026-11-22T21:00:00.000Z"))),
                ("one for another copy", sign(KEY, PUB["kid"], dict(MOB, files=dict(MOB["files"], **{"carried-ing-pdf.txt": {"sha256": "0" * 64, "size": 3}})))),
                ("one for another version", sign(KEY, PUB["kid"], dict(MOB, version="7.63"))),
                ("one of the computer apps' kind", sign(KEY, PUB["kid"], DESK))]:
    r = B.self_mobile_signature_put(json.dumps(f))
    check(r.get("ok") is False and not kept_mobile(), "the signature for phones and tablets: %s is refused, nothing kept (%s)" % (what, r.get("error")), r)
r = B.self_mobile_signature_put(json.dumps(sign(KEY, PUB["kid"], MOB)))
check(r.get("ok") and r.get("state") == "signed" and r.get("mobile_signed") is True and kept_mobile() == [r.get("kept_mobile")],
      "the owner's signature of the copy for phones and tablets is kept beside hers, and the check says mobile_signed", {k: r.get(k) for k in ("ok", "state", "mobile_signed", "kept_mobile", "error")})
check(ia._self_state(PAGE, True).get("state") == "signed", "and 7.58's own check is as it was (it reads only the computer apps' signatures)")

# 3. one file for every device
g = B.self_signature_get()
both = json.loads(g.get("text") or "{}")
check(g.get("ok") and both.get("kind") == "ingenium-release-signatures" and [x["release"]["app"] for x in both.get("signatures", [])] == ["ingenium", "ingenium-mobile"],
      "Save the signature: one file with both signatures in it, the computer apps' first", g)
shutil.rmtree(ia._self_dir(False))
check(B.self_check(True).get("state") == "unsigned", "another computer, with no signature kept")
r = B.self_signature_put(g["text"])
check(r.get("ok") and r.get("state") == "signed" and r.get("mobile_signed") is True and len(kept_mobile()) == 1,
      "Bring a signature in takes that file: the computer apps' signature kept and checked, and the phones' and tablets' kept with it", {k: r.get(k) for k in ("ok", "state", "mobile_signed", "error")})
r = B.self_signature_put(json.dumps({"kind": "ingenium-release-signatures", "v": 1, "signatures": [sign(KEY, PUB["kid"], MOB)]}))
check(r.get("ok") is False, "a file without the computer apps' signature is refused (%s)" % r.get("error"), r)
r = B.self_signature_put(json.dumps(sign(KEY, PUB["kid"], DESK)))
check(r.get("ok") and r.get("state") == "signed", "one signature alone is still taken, as in 7.58", r.get("error"))

# 4. Sign a copy you give
GIFT = os.path.join(TMP, "ingenium_gift.html")
write(GIFT, page(edition="gift"))
gv = ia._self2_give_read(GIFT)
gref = files_of(app_page(GIFT))
gown = ia._self_read(GIFT, True)
check(gv.get("ok") and gv.get("edition") == "gift" and gv.get("version") == "7.64" and gv.get("name") == "ingenium_gift.html"
      and gv.get("files") == {"ingenium.html": {"sha256": gown["sha256"], "size": gown["size"]}} and gv.get("mobile_files") == gref,
      "Sign a copy you give reads the gift edition's page: its own fingerprint as the computer apps read it, and its copy for phones and tablets", gv)
r = ia._self2_give_read(PAGE)
check(r.get("ok") is False and "master" in (r.get("error") or ""), "the master edition's page is refused: it is signed with Sign this release (%s)" % r.get("error"), r)
junk = os.path.join(TMP, "notes.html")
write(junk, "<!doctype html><title>notes</title>")
r = ia._self2_give_read(junk)
check(r.get("ok") is False, "a file that is not a page of Ingenium is refused (%s)" % r.get("error"), r)

# 5. both windows' bridges
names = ("self_mobile_fields", "self_mobile_signature_put", "self_give_pick", "self_check", "self_signature_put", "self_signature_get")
classes = [c for c in vars(ia).values() if isinstance(c, type) and hasattr(c, "self_mobile_fields")]
check(len(classes) == 2 and all(all(callable(getattr(c, n, None)) for n in names) for c in classes),
      "both windows' bridges answer the three new calls and the three that answer more", [c.__name__ for c in classes])

shutil.rmtree(TMP, ignore_errors=True)
print("%d passed, %d failed" % (ok, bad))
sys.exit(1 if bad else 0)
