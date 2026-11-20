"""Ingenium 7.58: Settings, Security, "Ingenium itself, signed and checked", part one, in the Mac and Windows apps.
Her request (18 November 2026): "I really want everything to be encrypted and protected ... my code is protected". The Security room
promised (modules/r318.js): "each release signed with your owner key, and checked by the computer apps ... before Ingenium opens: a copy
changed by anyone else refuses to open, and says which file changed." Where her owner key signs, her answer (20 November 2026) to the
choice between her device and GitHub: on her device, a "Sign this release" key in her master copy, so the key never leaves it ("I
approve of your recommendation, please continue working on my requests."). The page's side is modules/r348.js. Shown to her as six pictures (previews/self_sign), and her word:
"I approve of your preview, please commit and push it everywhere and continue working on my requests."

At every start, before the window is made, the page it is about to open (the built page, ingenium.html) is read once: its SHA-256, its
size, and the version and edition the page names (the first of each). The build number the device builds stamp into the page's first
<meta name="ingenium-build"> (tools/stamp_build.py: letters, digits, dots and dashes, at most 40) is left out of what is read, as the
release's own page has it empty: so the fingerprint is the one BUILD_INFO.txt lists for the release, the same in the Mac, Intel and
Windows apps, and one signature serves all her computers that run the release. Anything else in that tag, or anywhere else, is read as
it is. The same reading gives the page's mark (_page_mark, with the build number after it), so a start reads the page no more than it did. Her signatures, kept beside the app's storage (<the app's folder>/signatures, *.ingsig), are checked
with the owner's public keys this app carries (_SELF_KEYS; release.py writes them in at each release from security/owner_keys.json, as
the page's own are written in: public halves only). A signature counts only when its ECDSA P-256 signature (SHA-256, raw r and s, over
the release's fields in PermitCore's fixed order, build/thoughts/permit_core.html) is one of those keys'. Then:
  signed     a signature of hers names this version and edition, and each file it names is as she signed it: the page opens.
  changed    a signature of hers names this app's own release (_SELF_RELEASE, written in at each release), and the page is not the one
             signed: a file differs, or the page names another version or edition. The window opens on a page of the app's own that
             says which file changed, what was signed and what is there now, with Show the file and Quit. Nothing of the changed page
             runs, and the app's own address gives none of it (a reload is refused the same way). Without a signature for this app's
             release, a signature for the version the page names counts the same way.
  unsigned   no signature of hers names this release: the page opens, and Security says Not signed yet.
  unchecked  the page could not be read, or this app cannot check signatures (its cryptography part did not load): the page opens,
             and Security says so. A fault in the check itself never keeps Ingenium closed: it opens as before, and the log says why.
The author's own page (6.19, app_page_619.py: chosen in Fabrica, kept in <the app's folder>/pages) is hers: it is never refused, and the
room says it runs in place of the built page.
Bridge (both windows' bridges):
  self_check(again)         the state: {ok, state, version, edition, release, files, own, keys, signed, changed, why, can, platform,
                            refused}; again: the page read afresh.
  self_signature_put(text)  a signature file (made by Sign this release in her master copy, or brought in from another of her
                            computers): kept only when it is hers (one of the keys carried) and names this very copy (its version,
                            edition and every file as they are now); otherwise refused, with why, and nothing kept.
  self_signature_get()      the signature kept for this copy, as text, to save as a file for her other computers.
  self_reveal()             the page's file shown in the Finder or in Explorer (the refusal page's Show the file).
  self_quit()               the refusal page's Quit.
rig/t_758_self_check.py checks it with a test key; rig/t_758_self_page.js has the page sign in the browser and this app check it.

    python3 build/desktop/app_self_758.py <repo>/ingenium_app.py"""
import json, os, sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()
HERE = os.path.dirname(os.path.abspath(__file__))


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_self_758" in s:
    print("already patched", p)
    sys.exit(0)
if "_page_choose" not in s or "_disk_pick_757" not in s:
    sys.exit("%s: app_page_619.py and app_pick_757.py must come first" % p)
sys.path.insert(0, os.path.normpath(os.path.join(HERE, "..", "..", "security")))
import permits  # the owner's public keys, checked as the page's are (security/permits.py)

REL = json.load(open(os.path.join(HERE, "..", "version.json"), encoding="utf-8"))["v"]
KEYS = json.dumps([{"kid": k["kid"], "x": k["jwk"]["x"], "y": k["jwk"]["y"]} for k in permits.keys()])

FN = r'''# ---- 7.58 (Security, "Ingenium itself, signed and checked"): the release she signs on her device, checked at every start (app_self_758.py) ----
_self_758 = True
# what this computer app is: its release, and the owner's public keys (release.py writes both in at each release, from version.json and
# security/owner_keys.json, the halves Settings saves; only public halves, never a private part)
_SELF_RELEASE = "@@REL@@"  # ING-SELF-RELEASE
_SELF_KEYS = @@KEYS@@  # ING-SELF-KEYS
_SELF = {"lock": threading.RLock(), "read": {}, "last": None, "told": set()}
_SELF_KIND = "ingenium-release-signature"
_SELF_BODY = "ingenium-release"
_SELF_VER = re.compile(rb'var ING_VERSION="([0-9][0-9.]{0,15})"')
_SELF_ED = re.compile(rb'var ING_EDITION="([a-z]{1,16})"')
_SELF_BUILD = re.compile(rb'<meta name="ingenium-build" content="([0-9A-Za-z.\-]{0,40})">')
_SELF_HEX = re.compile(r"^[0-9a-f]{64}$")
_SELF_NAME = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._/-]{0,79}$")
_SELF_V = re.compile(r"^[0-9]{1,3}(\.[0-9]{1,3}){1,3}$")
_SELF_E = re.compile(r"^[a-z]{1,16}$")
_SELF_T = re.compile(r"^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{1,3})?Z$")
_SELF_MONTHS = ("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")


def _self_dir(make=True):
    """<the app's folder>/signatures, beside storage and pages: her signatures of Ingenium's releases (nothing secret is in them)."""
    try:
        store = storage_dir()
        if not store:
            return None
        d = os.path.join(os.path.dirname(store.rstrip("\\/")), "signatures")
        if make:
            os.makedirs(d, exist_ok=True)
        return d
    except Exception:
        log_problem("self: no folder for the signatures", sys.exc_info())
        return None


def _self_read(path, again=False):
    """The file's SHA-256 and size, and the version and edition a page names (the first of each), in one reading; kept while the
    file's size and time stay as they were (again: read afresh)."""
    try:
        ap = os.path.abspath(path)
        st = os.stat(ap)
    except (OSError, TypeError, ValueError):
        return None
    key = (st.st_size, getattr(st, "st_mtime_ns", int(st.st_mtime * 1e9)))
    with _SELF["lock"]:
        got = _SELF["read"].get(ap)
        if got and got["key"] == key and not again:
            return got
    h = hashlib.sha256()
    ver = ed = None
    build = ""
    first = True
    tail = b""
    n = 0
    try:
        with open(ap, "rb") as fh:
            for piece in iter(lambda: fh.read(1 << 20), b""):
                if first:
                    first = False
                    m = _SELF_BUILD.search(piece)
                    if m:  # the build number a device build stamps in is not part of what is signed (the notes above)
                        build = m.group(1).decode("ascii")
                        piece = piece[:m.start(1)] + piece[m.end(1):]
                h.update(piece)
                n += len(piece)
                if ver is None or ed is None:
                    look = tail + piece
                    if ver is None:
                        m = _SELF_VER.search(look)
                        if m:
                            ver = m.group(1).decode("ascii")
                    if ed is None:
                        m = _SELF_ED.search(look)
                        if m:
                            ed = m.group(1).decode("ascii")
                    tail = look[-64:]
    except OSError:
        log_problem("self: %s could not be read" % os.path.basename(ap), sys.exc_info())
        return None
    got = {"key": key, "path": ap, "sha256": h.hexdigest(), "size": n, "version": ver or "", "edition": ed or "master", "build": build}
    with _SELF["lock"]:
        _SELF["read"][ap] = got
    return got


def _self_canon(v):
    """PermitCore's fixed order (canon in build/thoughts/permit_core.html): keys sorted at every level, no spaces, text as JSON writes it."""
    if v is None:
        return "null"
    if v is True:
        return "true"
    if v is False:
        return "false"
    if isinstance(v, int):
        return str(v)
    if isinstance(v, str):
        return json.dumps(v, ensure_ascii=False)
    if isinstance(v, list):
        return "[" + ",".join(_self_canon(x) for x in v) + "]"
    if isinstance(v, dict):
        return "{" + ",".join(json.dumps(k, ensure_ascii=False) + ":" + _self_canon(v[k])
                              for k in sorted(v, key=lambda k: k.encode("utf-16-be"))) + "}"
    raise ValueError("a signature holds no %s" % type(v).__name__)


def _self_body_ok(b):
    """The release's fields, exactly: {kind, v, app, version, edition, files: {name: {sha256, size}}, made}."""
    try:
        if not isinstance(b, dict) or set(b) != {"kind", "v", "app", "version", "edition", "files", "made"}:
            return False
        if b["kind"] != _SELF_BODY or type(b["v"]) is not int or b["v"] != 1 or b["app"] != "ingenium":
            return False
        if not (isinstance(b["version"], str) and _SELF_V.match(b["version"]) and isinstance(b["edition"], str)
                and _SELF_E.match(b["edition"]) and isinstance(b["made"], str) and _SELF_T.match(b["made"])):
            return False
        f = b["files"]
        if not isinstance(f, dict) or not 1 <= len(f) <= 32:
            return False
        for k, x in f.items():
            if not (isinstance(k, str) and _SELF_NAME.match(k) and ".." not in k and "//" not in k):
                return False
            if not isinstance(x, dict) or set(x) != {"sha256", "size"}:
                return False
            if not (isinstance(x["sha256"], str) and _SELF_HEX.match(x["sha256"]) and type(x["size"]) is int and 0 <= x["size"] < 2 ** 53):
                return False
        return True
    except Exception:
        return False


def _self_unb64(t):
    if not isinstance(t, str) or not re.match(r"^[A-Za-z0-9_-]{1,200}$", t):
        return None
    try:
        return base64.urlsafe_b64decode(t + "=" * (-len(t) % 4))
    except Exception:
        return None


def _self_can():
    try:
        from cryptography.hazmat.primitives.asymmetric.utils import encode_dss_signature  # noqa: F401
        return True
    except Exception:
        return False


def _self_verify(f):
    """(the release it signs, "") when f is a signature of Ingenium made with one of the owner's keys this app carries; else (None, why)."""
    try:
        from cryptography.exceptions import InvalidSignature
        from cryptography.hazmat.primitives import hashes
        from cryptography.hazmat.primitives.asymmetric import ec
        from cryptography.hazmat.primitives.asymmetric.utils import encode_dss_signature
    except Exception:
        return None, "This computer app cannot check signatures: its cryptography part did not load."
    if not isinstance(f, dict) or f.get("kind") != _SELF_KIND or f.get("v") != 1:
        return None, "This is not a signature of Ingenium."
    body = f.get("release")
    if not _self_body_ok(body):
        return None, "This signature does not hold the fields of a release of Ingenium."
    key = None
    for k in _SELF_KEYS:
        if isinstance(k, dict) and k.get("kid") == f.get("kid"):
            key = k
            break
    if key is None:
        return None, "It is not signed with one of the owner's keys this copy carries."
    raw, x, y = _self_unb64(f.get("sig")), _self_unb64(key.get("x")), _self_unb64(key.get("y"))
    if raw is None or len(raw) != 64 or x is None or y is None or len(x) != 32 or len(y) != 32:
        return None, "Its signature cannot be read."
    try:
        pub = ec.EllipticCurvePublicNumbers(int.from_bytes(x, "big"), int.from_bytes(y, "big"), ec.SECP256R1()).public_key()
        pub.verify(encode_dss_signature(int.from_bytes(raw[:32], "big"), int.from_bytes(raw[32:], "big")),
                   _self_canon(body).encode("utf-8"), ec.ECDSA(hashes.SHA256()))
    except InvalidSignature:
        return None, "Its signature does not match: it was changed, or it is not the owner's."
    except Exception:
        log_problem("self: a signature could not be checked", sys.exc_info())
        return None, "Its signature cannot be read."
    return body, ""


def _self_all():
    """Her signatures kept here, each checked: [(release, file name, kid)]; any other file there is left as it is, and unused."""
    d = _self_dir(False)
    out = []
    if not d or not os.path.isdir(d):
        return out
    try:
        names = sorted(os.listdir(d))
    except OSError:
        return out
    for name in names:
        if not name.endswith(".ingsig"):
            continue
        fp = os.path.join(d, name)
        try:
            if os.path.getsize(fp) > 65536:
                continue
            with open(fp, encoding="utf-8") as fh:
                f = json.load(fh)
        except Exception:
            continue
        body, why = _self_verify(f)
        if body:
            out.append((body, name, f.get("kid")))
    return out


def _self_platform():
    return "Mac" if sys.platform == "darwin" else "Windows computer" if sys.platform.startswith("win") else "computer"


def _self_files_bad(b, path, got, again=False):
    """Each file the release names, as it is now: [] when all are as signed; else one entry for each that differs or is missing."""
    bad = []
    base = os.path.basename(path)
    for name, want in sorted(b["files"].items()):
        fp = path if name == base else os.path.join(os.path.dirname(path), *name.split("/"))
        now = got if fp == path else _self_read(fp, again)
        if not now:
            bad.append({"name": name, "why": "missing", "want": want, "now": None})
        elif now["sha256"] != want["sha256"] or now["size"] != want["size"]:
            bad.append({"name": name, "why": "content", "want": want, "now": {"sha256": now["sha256"], "size": now["size"]}})
    return bad


def _self_state(path=None, again=False, fresh=0):
    """The check (the notes at the head of app_self_758.py). path: the built page; fresh: an answer this many seconds old will do."""
    path = path or _PAGE.get("builtin") or _APP_HTML_PATH or find_app_html()
    with _SELF["lock"]:
        last = _SELF.get("last")
    if fresh and last and not again and last.get("path") == (os.path.abspath(path) if path else None) and time.time() - last.get("at", 0) < fresh:
        return last
    st = {"ok": True, "state": "unsigned", "version": "", "edition": "", "build": "", "release": _SELF_RELEASE, "files": {}, "own": bool(_PAGE.get("serve")),
          "keys": [k.get("kid") for k in _SELF_KEYS if isinstance(k, dict)], "signed": None, "changed": [], "why": "", "can": _self_can(),
          "platform": _self_platform(), "path": os.path.abspath(path) if path else None, "at": time.time()}

    def keep(x):
        with _SELF["lock"]:
            _SELF["last"] = x
        return x
    got = _self_read(path, again) if path else None
    if not got:
        st.update(ok=False, state="unchecked", why="The page could not be read.")
        return keep(st)
    base = os.path.basename(path)
    st.update(version=got["version"], edition=got["edition"], build=got.get("build", ""), files={base: {"sha256": got["sha256"], "size": got["size"]}})
    if not st["can"]:
        st.update(state="unchecked", why="This computer app cannot check signatures: its cryptography part did not load.")
        return keep(st)
    sigs = _self_all()
    rel = _SELF_RELEASE
    if rel and any(x[0]["version"] == rel for x in sigs):
        cands = [x for x in sigs if x[0]["version"] == rel]
    else:
        cands = [x for x in sigs if x[0]["version"] == got["version"] and x[0]["edition"] == got["edition"]]
    if not cands:
        return keep(st)
    exact = sorted([x for x in cands if x[0]["version"] == got["version"] and x[0]["edition"] == got["edition"]],
                   key=lambda x: x[0]["made"], reverse=True)
    for b, name, kid in exact:
        if not _self_files_bad(b, path, got, again):
            st.update(state="signed", signed={"made": b["made"], "kid": kid, "file": name, "version": b["version"], "edition": b["edition"]})
            return keep(st)
    b, name, kid = exact[0] if exact else sorted(cands, key=lambda x: (x[0]["edition"] == got["edition"], x[0]["made"]), reverse=True)[0]
    st["signed"] = {"made": b["made"], "kid": kid, "file": name, "version": b["version"], "edition": b["edition"]}
    if exact:
        st["changed"] = _self_files_bad(b, path, got, again)
    elif b["version"] != got["version"]:
        st["changed"] = [{"name": base, "why": "version", "want": {"version": b["version"]}, "now": {"version": got["version"] or ""}}]
    else:
        st["changed"] = [{"name": base, "why": "edition", "want": {"edition": b["edition"]}, "now": {"edition": got["edition"]}}]
    st["state"] = "changed"
    st["why"] = "; ".join("%s %s" % (c["name"], c["why"]) for c in st["changed"])
    return keep(st)


def _self_gate(st):
    """True when the window must not have the built page: a release she signed, changed since (never her own page)."""
    return bool(st and st.get("state") == "changed" and not _PAGE.get("serve"))


def _self_day(iso):
    m = re.match(r"^([0-9]{4})-([0-9]{2})-([0-9]{2})", str(iso or ""))
    return "%d %s %s" % (int(m.group(3)), _SELF_MONTHS[int(m.group(2)) - 1], m.group(1)) if m else ""


def _self_refused_file():
    d = _self_dir()
    return os.path.join(d, "refused.json") if d else None


def _self_refused(st):
    """A refusal is logged, and kept (the last ten) so that Security can say so at the next start that opens."""
    log_problem("self: Ingenium did not open: %s (signed %s)" % (st.get("why"), (st.get("signed") or {}).get("made")))
    fp = _self_refused_file()
    if not fp:
        return
    try:
        try:
            with open(fp, encoding="utf-8") as fh:
                rows = json.load(fh)
            rows = rows if isinstance(rows, list) else []
        except Exception:
            rows = []
        rows.append({"at": time.time(), "version": st.get("version"), "edition": st.get("edition"), "changed": st.get("changed")})
        with open(fp + ".tmp", "w", encoding="utf-8") as fh:
            json.dump(rows[-10:], fh)
        os.replace(fp + ".tmp", fp)
    except Exception:
        log_problem("self: the refusal could not be kept", sys.exc_info())


def _self_told(st):
    """A refusal kept once for each changed page (a reload asks the app's own address many times)."""
    key = "|".join(str(c.get("why")) + ":" + str((c.get("now") or {}).get("sha256") or (c.get("now") or {}).get("version")
                                                  or (c.get("now") or {}).get("edition")) for c in st.get("changed") or [])
    with _SELF["lock"]:
        if key in _SELF["told"]:
            return
        _SELF["told"].add(key)
    _self_refused(st)


def _self_refusals():
    fp = _self_refused_file()
    try:
        with open(fp, encoding="utf-8") as fh:
            rows = json.load(fh)
        return rows[-10:] if isinstance(rows, list) else []
    except Exception:
        return []


def _self_public(st):
    x = dict(st or {})
    for k in ("path", "at"):
        x.pop(k, None)
    return x


def _self_answer(again=False):
    try:
        st = _self_public(_self_state(None, bool(again)))
        st["refused"] = _self_refusals()
        return st
    except Exception:
        log_problem("self: the check could not run", sys.exc_info())
        return {"ok": False, "state": "unchecked", "why": "The check could not run on this computer."}


def _self_esc(t):
    return str(t if t is not None else "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def _self_fp(h):
    h = str(h or "")
    return "%s %s … %s" % (h[:8], h[8:16], h[-8:]) if len(h) == 64 else h


def _self_refusal_html(st):
    """The window's page when a signed release changed: which file, what was signed and what is there now. The app's own page: it
    asks nothing of the changed one, and reaches nothing outside this computer."""
    sg = st.get("signed") or {}
    day = _self_day(sg.get("made"))
    rows = []
    for c in st.get("changed") or []:
        nm = '<div class="nm">' + _self_esc(c.get("name")) + "</div>"
        w, n = c.get("want") or {}, c.get("now") or {}
        if c.get("why") == "version":
            rows.append(nm + '<p>It names Ingenium <b>' + _self_esc(n.get("version") or "no version") + '</b>, and this app is Ingenium <b>'
                        + _self_esc(st.get("release") or w.get("version")) + '</b>, which you signed: its page was put in from elsewhere.</p>')
        elif c.get("why") == "edition":
            rows.append(nm + '<p>It names the <b>' + _self_esc(n.get("edition")) + '</b> edition, and you signed this app\'s <b>'
                        + _self_esc(w.get("edition")) + '</b> edition: its page was put in from elsewhere.</p>')
        elif c.get("why") == "missing":
            rows.append(nm + '<p>It is no longer there.</p>')
        else:
            rows.append(nm + '<dl><dt>You signed</dt><dd><code>' + _self_esc(_self_fp(w.get("sha256"))) + '</code> · '
                        + "{:,}".format(int(w.get("size") or 0)) + ' bytes</dd><dt>It is now</dt><dd><code>' + _self_esc(_self_fp(n.get("sha256")))
                        + '</code> · ' + "{:,}".format(int(n.get("size") or 0)) + ' bytes</dd></dl>')
    lead = ("This copy of Ingenium is not the one you signed" + (" on " + day if day else "") + ": a file in it changed since. "
            "Nothing of the changed file ran.")
    return ("""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Ingenium did not open</title><style>
:root{color-scheme:light;--bg1:#efe8fb;--bg2:#d9ccf3;--card:#fff;--card2:#faf8fd;--ink1:#221a2e;--ink2:#4a4358;--ink3:#6c6480;--line:rgba(34,26,46,.1);
--vio:#6a3fb5;--vio2:#5d37a1;--well:rgba(34,26,46,.04);--lav:#efe9fa;--lavc:#4b2a86;
--sh:0 1px 1px rgba(40,20,70,.18),0 4px 8px rgba(40,20,70,.12),0 14px 30px rgba(40,20,70,.14),0 30px 60px rgba(40,20,70,.12);
--key:inset 0 1.5px 0 rgba(255,255,255,.95),inset 0 -3px 5px rgba(60,30,90,.16),0 1px 1px rgba(40,20,70,.3),0 3px 4px rgba(40,20,70,.24),0 6px 9px rgba(40,20,70,.18);
--keyhi:inset 0 1.5px 0 #fff,inset 0 -3px 5px rgba(60,30,90,.14),0 3px 4px rgba(40,20,70,.24),0 9px 16px rgba(40,20,70,.2),0 16px 26px rgba(40,20,70,.14)}
@media (prefers-color-scheme:dark){:root{color-scheme:dark;--bg1:#1b1326;--bg2:#2a1d3d;--card:#2a2138;--card2:#241c31;--ink1:#f1ecf8;--ink2:#cfc6de;
--ink3:#a69cb8;--line:rgba(255,255,255,.1);--vio:#b79ce6;--vio2:#9c7ad8;--well:rgba(10,6,18,.35);--lav:#3a2d52;--lavc:#e6dcf7;
--sh:0 1px 1px rgba(0,0,0,.5),0 6px 12px rgba(0,0,0,.4),0 18px 38px rgba(0,0,0,.45);
--key:inset 0 1.5px 0 rgba(255,255,255,.16),inset 0 -3px 5px rgba(0,0,0,.45),0 1px 1px rgba(0,0,0,.65),0 3px 4px rgba(0,0,0,.55),0 6px 9px rgba(0,0,0,.45);
--keyhi:inset 0 1.5px 0 rgba(255,255,255,.2),inset 0 -3px 5px rgba(0,0,0,.4),0 3px 4px rgba(0,0,0,.6),0 9px 16px rgba(0,0,0,.5),0 16px 26px rgba(0,0,0,.4)}}
*{box-sizing:border-box}html,body{margin:0;min-height:100%}
body{background:radial-gradient(1200px 700px at 20% 0%,var(--bg1),transparent 70%),linear-gradient(160deg,var(--bg1),var(--bg2));color:var(--ink2);
font:15px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;display:flex;align-items:center;justify-content:center;
min-height:100vh;padding:32px 16px;overflow:hidden}
.card{width:min(600px,100%);background:linear-gradient(180deg,var(--card),var(--card2));border:1px solid var(--line);border-radius:22px;
box-shadow:var(--sh);padding:30px 32px 24px;animation:rise .5s cubic-bezier(.2,.8,.2,1) both}
@keyframes rise{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}
.seal{width:62px;height:62px;border-radius:50%;display:grid;place-items:center;color:#fff;background:radial-gradient(circle at 35% 30%,#9a74df,#6a3fb5 55%,#3a2070);
box-shadow:inset 0 2px 1px rgba(255,255,255,.35),inset 0 -4px 8px rgba(20,8,40,.45),0 3px 5px rgba(40,20,70,.3),0 10px 22px rgba(52,24,100,.28);margin-bottom:14px}
.seal svg{width:32px;height:32px}
.eye{font:600 11.5px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:var(--vio);margin:0}
h1{font:700 27px/1.25 Georgia,"Times New Roman",serif;color:var(--ink1);margin:6px 0 8px;text-wrap:balance}
p{margin:6px 0}.lead{font-size:16px;color:var(--ink2)}
.well{background:var(--well);border:1px solid var(--line);border-radius:14px;padding:12px 16px;margin:14px 0;box-shadow:inset 0 1px 3px rgba(40,20,70,.08)}
.nm{font:700 14px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--ink1);margin-top:4px}
dl{display:grid;grid-template-columns:auto 1fr;gap:4px 14px;margin:8px 0 4px}dt{color:var(--ink3);font-size:13px}dd{margin:0;font-size:13px}
code{font:12.5px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--ink1);word-break:break-all}b{color:var(--ink1)}
h2{font:700 15.5px/1.35 Georgia,"Times New Roman",serif;color:var(--ink1);margin:16px 0 2px}
.keys{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 6px}
.key{appearance:none;border:1px solid var(--line);border-radius:12px;padding:9px 16px;font:600 14px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;
cursor:pointer;background:linear-gradient(180deg,var(--card),var(--lav));color:var(--lavc);box-shadow:var(--key);
transition:transform .18s cubic-bezier(.2,.8,.2,1),box-shadow .18s}
.key.pri{color:#fff;background:linear-gradient(180deg,#7348be,#5d37a1);border-color:#4b2a86}
.key:hover{transform:translateY(-2px);box-shadow:var(--keyhi)}.key:active{transform:translateY(1px) scale(.98);box-shadow:var(--key)}
.key:focus-visible{outline:3px solid var(--vio);outline-offset:3px}
.fine{font-size:12.5px;color:var(--ink3);margin-top:12px}.say{min-height:1.4em;font-size:13px;color:var(--ink3)}
@media (prefers-reduced-motion:reduce){.card{animation:none}.key{transition:none}.key:hover,.key:active{transform:none}}
</style></head><body><main class="card" role="alertdialog" aria-labelledby="h" aria-describedby="d">
<div class="seal" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
<path d="M12 2.8l7.5 3v5.6c0 4.6-3.2 8.4-7.5 9.8-4.3-1.4-7.5-5.2-7.5-9.8V5.8z"/><path d="M12 8v4.6"/><path d="M12 16.2h.01"/></svg></div>
<p class="eye">Ingenium itself, signed and checked</p><h1 id="h">Ingenium did not open</h1>
<p class="lead" id="d">""" + _self_esc(lead) + """</p>
<div class="well">""" + "".join(rows) + """</div>
<h2>What to do</h2><p>Install Ingenium again from your release's download link, then open it: your work is kept, apart from the app. If you changed
this file yourself, put it back as it was.</p>
<div class="keys"><button type="button" class="key" id="show">Show the file</button><button type="button" class="key pri" id="quit">Quit Ingenium</button></div>
<p class="say" id="say" aria-live="polite"></p>
<p class="fine">Checked at this start with your owner key""" + (" (" + _self_esc(str(sg.get("kid") or "")[:8]) + "…)" if sg.get("kid") else "")
            + """, on this """ + _self_esc(st.get("platform") or "computer") + """. A copy changed by anyone else does not open.</p></main>
<script>(function(){function api(){return window.pywebview&&window.pywebview.api?window.pywebview.api:null;}
function say(t){document.getElementById("say").textContent=t;}
document.getElementById("show").onclick=function(){var a=api();if(!a||!a.self_reveal){say("The folder cannot be opened from here.");return;}
Promise.resolve(a.self_reveal()).then(function(r){if(!r||!r.ok)say((r&&r.error)||"The folder could not be opened.");},function(){say("The folder could not be opened.");});};
document.getElementById("quit").onclick=function(){var a=api();if(a&&a.self_quit){a.self_quit();}else{window.close();}};
setTimeout(function(){try{document.getElementById("quit").focus();}catch(e){}},80);})();</script></body></html>""")


def _self_put(text):
    """A signature, kept when it is hers and names this very copy: Sign this release, or one brought in from another of her computers."""
    try:
        if not isinstance(text, str) or len(text) > 65536:
            return {"ok": False, "error": "This is not a signature of Ingenium."}
        f = json.loads(text)
    except Exception:
        return {"ok": False, "error": "This is not a signature of Ingenium."}
    body, why = _self_verify(f)
    if not body:
        return {"ok": False, "error": why}
    path = _PAGE.get("builtin") or _APP_HTML_PATH or find_app_html()
    got = _self_read(path, True) if path else None
    if not got:
        return {"ok": False, "error": "This copy's page could not be read."}
    if body["version"] != got["version"] or body["edition"] != got["edition"]:
        return {"ok": False, "error": "This signature is for Ingenium %s (the %s edition); this copy is Ingenium %s (the %s edition)."
                % (body["version"], body["edition"], got["version"] or "of no version", got["edition"])}
    bad = _self_files_bad(body, path, got, True)
    if bad:
        return {"ok": False, "error": "This signature names another copy of Ingenium %s: this copy's %s is not the one signed. If you installed "
                "this copy from your release, it changed since: install it again." % (body["version"], ", ".join(b["name"] for b in bad))}
    d = _self_dir()
    if not d:
        return {"ok": False, "error": "This computer gives Ingenium no folder to keep it in."}
    page = os.path.basename(path)
    name = "ingenium-%s-%s-%s.ingsig" % (body["edition"], body["version"], body["files"].get(page, {}).get("sha256", "0" * 12)[:12])
    try:
        fp = os.path.join(d, name)
        with open(fp + ".tmp", "w", encoding="utf-8") as fh:
            json.dump(f, fh, indent=1, sort_keys=True)
        os.replace(fp + ".tmp", fp)
    except Exception:
        log_problem("self: the signature could not be kept", sys.exc_info())
        return {"ok": False, "error": "The signature could not be kept on this computer."}
    st = _self_answer(True)
    st["kept"] = name
    return st


def _self_get():
    st = _SELF.get("last") or _self_state()
    if not st or st.get("state") != "signed" or not st.get("signed"):
        return {"ok": False, "error": "This copy is not signed yet."}
    try:
        with open(os.path.join(_self_dir(False) or "", st["signed"]["file"]), encoding="utf-8") as fh:
            text = fh.read()
    except Exception:
        return {"ok": False, "error": "The signature could not be read."}
    return {"ok": True, "text": text, "name": "Ingenium %s signature.ingsig" % st.get("version")}


def _self_reveal():
    fp = (_SELF.get("last") or {}).get("path") or _PAGE.get("builtin") or _APP_HTML_PATH
    if not fp or not os.path.isfile(fp):
        return {"ok": False, "error": "The page's file was not found."}
    try:
        if sys.platform == "darwin":
            subprocess.Popen(["/usr/bin/open", "-R", fp])
        elif sys.platform.startswith("win"):
            subprocess.Popen(["explorer", "/select,", os.path.normpath(fp)])
        else:
            subprocess.Popen(["xdg-open", os.path.dirname(fp)])
        return {"ok": True}
    except Exception:
        log_problem("self: the file could not be shown", sys.exc_info())
        return {"ok": False, "error": "The folder could not be opened."}


def _self_quit(api):
    def go():
        time.sleep(0.25)
        try:
            w = getattr(api, "_main_window", None)
            if w is not None:
                w.destroy()
                return
        except Exception:
            pass
        os._exit(0)
    threading.Thread(target=go, daemon=True).start()
    return {"ok": True}


'''.replace("@@REL@@", REL).replace("@@KEYS@@", KEYS)

rep('''def _start_local_server(directory, html_name=None):''', FN + '''def _start_local_server(directory, html_name=None):''')

# the page's mark comes from the same reading as its check, so a start reads the page once
rep('''def _page_mark(path):
    """A short mark that changes with every build of the page: a hash of the whole file
    (about 14 MB; some tens of milliseconds, once, at start)."""
    try:
''', '''def _page_mark(path):
    """A short mark that changes with every build of the page: a hash of the whole file
    (about 14 MB; some tens of milliseconds, once, at start)."""
    try:
        _got = _self_read(path)  # 7.58: the same reading gives the page's mark and its check (app_self_758.py)
        if _got:
            return _got["sha256"][:12] + ("-" + _got["build"] if _got.get("build") else "")
    except Exception:
        pass
    try:
''')

# before the window is made: a release she signed, changed since, does not open
rep('''        js_api=api,
    )
    try:
        directory = os.path.dirname(os.path.abspath(app_html_path))''', '''        js_api=api,
    )
    # 7.58 (app_self_758.py): a release she signed and changed since does not open; the window says which file changed, and nothing
    # of the changed page runs. A fault in the check never keeps Ingenium closed.
    try:
        _st = _self_state(app_html_path)
        if _self_gate(_st):
            _self_told(_st)
            return webview.create_window(WINDOW_TITLE, html=_self_refusal_html(_st), **common)
    except Exception:
        log_problem("self: the check could not run; Ingenium opens as before", sys.exc_info())
    try:
        directory = os.path.dirname(os.path.abspath(app_html_path))''')

# the app's own address gives none of a changed page either (a reload, the window's page, its parts)
rep('''            html_path = _PAGE.get("serve") or html_path0  # 6.19 (app_page_619.py): the author's page, when chosen
            path = self.path.split("?", 1)[0]''', '''            html_path = _PAGE.get("serve") or html_path0  # 6.19 (app_page_619.py): the author's page, when chosen
            path = self.path.split("?", 1)[0]
            # 7.58 (app_self_758.py): the built page of a release she signed, changed since, is given to no one
            if (not _PAGE.get("serve") and html_path0 and (path == "/" + os.path.basename(html_path0) or path.startswith("/_payload/")
                                                           or path == "/ingenium_window.html")):
                try:
                    _st = _self_state(html_path0, fresh=2)
                except Exception:
                    _st = None
                if _self_gate(_st):
                    _self_told(_st)
                    _doc = path == "/" + os.path.basename(html_path0)
                    _data = (_self_refusal_html(_st) if _doc else "Ingenium did not open: its page changed since you signed it.").encode("utf-8")
                    try:
                        self.send_response(200 if _doc else 403)
                        self.send_header("Content-Type", "text/html; charset=utf-8" if _doc else "text/plain; charset=utf-8")
                        self.send_header("Content-Length", str(len(_data)))
                        self.end_headers()
                        self.wfile.write(_data)
                    except Exception:
                        pass
                    return''')

rep('''    def disk_stash_drop(self, rid, n):
        return _disk_stash_drop(rid, n)
''', '''    def disk_stash_drop(self, rid, n):
        return _disk_stash_drop(rid, n)

    # 7.58: Ingenium itself, signed and checked (app_self_758.py)
    def self_check(self, again=False):
        return _self_answer(again)

    def self_signature_put(self, text):
        return _self_put(text)

    def self_signature_get(self):
        return _self_get()

    def self_reveal(self):
        return _self_reveal()

    def self_quit(self):
        return _self_quit(self)
''', 2)
open(p, "w", encoding="utf-8").write(s)
print("patched", p, "release", REL, "keys", len(json.loads(KEYS)))
