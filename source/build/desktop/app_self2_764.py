"""Ingenium 7.64: Settings, Security, "Ingenium itself, signed and checked", part two, the computer app's side (the page's side is
modules/r355.js). Shown to her as eight pictures one by one at full size (previews/self_sign2: the scripts; the pictures stay out of the
repository), and her word (21 November 2026): "I approve of the previews, please commit and push it everywhere and continue working on
my requests."

The iPhone, iPad and Fire apps carry their own copy of the page, made from the release's page by tools/app_page.py in the Fire and iPhone
repository: the baked engine and the kit store left out, each block the page carries for later written beside it as carried-<id>.txt (its
place in the page renamed to that file), and the build number stamped into the page's first <meta name="ingenium-build">. Those steps are
fixed, so this app makes the same copy from its own page, in memory, with the build number left empty as the release's page has it; and a
phone or tablet reads its copy with its stamped build number left out the same way. So one signature, made here, fits every phone and
tablet that runs the release.

New on both windows' bridges:
  self_mobile_fields()             {ok, version, edition, files: {name: {sha256, size}}}: the copy her phones and tablets carry, as they
                                   read it (ingenium.html and each carried-<id>.txt); read once and kept while the page stays as it was.
  self_mobile_signature_put(text)  a signature of that copy (its release's app is "ingenium-mobile"), made by Sign this release or by
                                   Sign it for your phones and tablets in her master copy; kept beside hers when it is the owner's, names
                                   this release and edition, and names the very files this app makes. Answers the check, as below.
  self_give_pick()                 Sign a copy you give: the system's dialog, a page chosen (the full or gift edition), read here:
                                   {ok, name, version, edition, files: {"ingenium.html": ...}, mobile_files}; null when she cancels.
And three answer more:
  self_check(again)                also says mobile_signed: a signature of the copy for phones and tablets is kept for this release.
  self_signature_get()             one file for every device: when both are kept, {"kind": "ingenium-release-signatures", "v": 1,
                                   "signatures": [this computer's, the phones' and tablets']}; otherwise the one, as in 7.58.
  self_signature_put(text)         also takes that file: the computer apps' signature as in 7.58, and the phones' and tablets' kept with
                                   it when it fits this release.
Kept here: <the app's folder>/signatures/ingenium-mobile-<edition>-<version>-<its page's fingerprint, 12>.ingsig. The 7.58 check reads only
signatures of the app "ingenium", so these files change nothing in it.

    python3 build/desktop/app_self2_764.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_self2_764" in s:
    print("already patched", p)
    sys.exit(0)
if "_self_758" not in s:
    sys.exit("%s: app_self_758.py must be applied first" % p)

FN = r'''# ---- 7.64 (Security, "Ingenium itself, signed and checked", part two): the copy her phones and tablets carry (app_self2_764.py) ----
_self2_764 = True
_SELF2 = {"lock": threading.Lock(), "read": None}
_SELF2_APP = "ingenium-mobile"
_SELF2_LIST = "ingenium-release-signatures"
# tools/app_page.py's own expressions (Fire and iPhone repository), in its order
_SELF2_ENGINE = re.compile(r'\n?<script id="(?:ing-tail:)?ingenium-engine-(?:js|wasm|compat-worker|compat-wasm)"[^>]*>[\s\S]*?</script>')
_SELF2_KIT = re.compile(r'\n?<script id="(?:ing-tail:)?ingenium-kit-bundle"[^>]*>[\s\S]*?</script>')
_SELF2_TAIL = re.compile(r'<script id="ing-tail:([^"]+)"[^>]*>([^<]*)</script>\n?')
_SELF2_BUILD = re.compile(r'<meta name="ingenium-build" content="[^"]*">')


def _self2_phone_copy(html):
    """The copy tools/app_page.py makes of a page without --build: {file name: its text}. The same steps in the same order, so the same
    bytes; app_page.py writes the build number it is given into the first build tag, and without one it writes it empty."""
    out = _SELF2_ENGINE.sub("", html)
    out = _SELF2_KIT.sub("", out)
    carried = []
    for m in reversed(list(_SELF2_TAIL.finditer(out))):
        out = out[:m.start()] + out[m.end():]
        carried.append((m.group(1), m.group(2)))
    files = {}
    for ident, body in carried:
        name = "carried-%s.txt" % ident
        out, c = re.subn(r'data-defer="#ing-tail:%s"' % re.escape(ident), 'data-defer="%s"' % name, out, count=1)
        if c != 1:
            raise ValueError("%s has no place in the page" % ident)
        files[name] = body
    out = _SELF2_BUILD.sub('<meta name="ingenium-build" content="">', out, count=1)
    if not out.rstrip().endswith("</html>"):
        raise ValueError("the page did not survive the strip")
    files["ingenium.html"] = out
    return files


def _self2_fields(raw):
    """A page's bytes: (version, edition, the copy for phones and tablets as {name: {sha256, size}}, the page's own {sha256, size} with its
    build number left out, as 7.58 reads a page)."""
    ver = _SELF_VER.search(raw)
    ed = _SELF_ED.search(raw)
    head = raw[:1 << 20]
    m = _SELF_BUILD.search(head)
    own = (head[:m.start(1)] + head[m.end(1):] + raw[1 << 20:]) if m else raw
    files = {}
    # app_page.py reads the page as text, so a carriage return reaches the copy as a line's end (Python's own reading)
    for name, text in _self2_phone_copy(raw.decode("utf-8").replace("\r\n", "\n").replace("\r", "\n")).items():
        b = text.encode("utf-8")
        files[name] = {"sha256": hashlib.sha256(b).hexdigest(), "size": len(b)}
    return (ver.group(1).decode("ascii") if ver else "", ed.group(1).decode("ascii") if ed else "master", files,
            {"sha256": hashlib.sha256(own).hexdigest(), "size": len(own)})


def _self2_page():
    return _PAGE.get("builtin") or _APP_HTML_PATH or find_app_html()


def _self2_read(again=False):
    """This app's page made into the copy for phones and tablets: kept while the page's size and time stay as they were."""
    path = _self2_page()
    try:
        ap = os.path.abspath(path)
        st = os.stat(ap)
    except Exception:
        return None
    key = (ap, st.st_size, getattr(st, "st_mtime_ns", int(st.st_mtime * 1e9)))
    with _SELF2["lock"]:
        got = _SELF2["read"]
        if got and got["key"] == key and not again:
            return got
    try:
        with open(ap, "rb") as fh:
            raw = fh.read()
        ver, ed, files, _own = _self2_fields(raw)
    except Exception:
        log_problem("self2: the copy for phones and tablets could not be made", sys.exc_info())
        return None
    got = {"key": key, "version": ver, "edition": ed, "files": files}
    with _SELF2["lock"]:
        _SELF2["read"] = got
    return got


def _self2_verify(f, app):
    """(the release it signs, "") when f is a signature of hers of app ("ingenium" or "ingenium-mobile"); else (None, why). 7.58's own
    reading (_self_verify) holds the computer apps' app alone; this one is the same steps for either."""
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
    if not isinstance(body, dict) or body.get("app") != app:
        return None, "This signature is for another copy of Ingenium."
    test = dict(body)
    test["app"] = "ingenium"
    if not _self_body_ok(test):
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
        log_problem("self2: a signature could not be checked", sys.exc_info())
        return None, "Its signature cannot be read."
    return body, ""


def _self2_kept(version=None, edition=None):
    """The signatures of the copy for phones and tablets kept here, each checked: [(release, name, the signature)], newest first."""
    d = _self_dir(False)
    out = []
    if not d or not os.path.isdir(d):
        return out
    try:
        names = sorted(os.listdir(d))
    except OSError:
        return out
    for name in names:
        if not (name.startswith("ingenium-mobile-") and name.endswith(".ingsig")):
            continue
        try:
            fp = os.path.join(d, name)
            if os.path.getsize(fp) > 65536:
                continue
            with open(fp, encoding="utf-8") as fh:
                f = json.load(fh)
        except Exception:
            continue
        body, why = _self2_verify(f, _SELF2_APP)
        if body and (version is None or body["version"] == version) and (edition is None or body["edition"] == edition):
            out.append((body, name, f))
    out.sort(key=lambda x: x[0]["made"], reverse=True)
    return out


def _self2_mobile_fields():
    got = _self2_read()
    if not got:
        return {"ok": False, "error": "The copy your phones and tablets carry could not be made from this computer's page."}
    return {"ok": True, "version": got["version"], "edition": got["edition"], "files": got["files"]}


def _self2_mobile_keep(f):
    """A signature of the copy for phones and tablets, kept when it is hers and names the very files this release makes for them."""
    body, why = _self2_verify(f, _SELF2_APP)
    if not body:
        return {"ok": False, "error": why}
    got = _self2_read()  # kept while the page's size and time stay as they were: a page that changes is read afresh
    if not got:
        return {"ok": False, "error": "The copy your phones and tablets carry could not be made from this computer's page."}
    if body["version"] != got["version"] or body["edition"] != got["edition"]:
        return {"ok": False, "error": "This signature is for Ingenium %s (the %s edition) on phones and tablets; this computer runs Ingenium %s "
                "(the %s edition)." % (body["version"], body["edition"], got["version"] or "of no version", got["edition"])}
    if body["files"] != got["files"]:
        return {"ok": False, "error": "This signature names another copy for phones and tablets than the one this release makes."}
    d = _self_dir()
    if not d:
        return {"ok": False, "error": "This computer gives Ingenium no folder to keep it in."}
    name = "ingenium-mobile-%s-%s-%s.ingsig" % (body["edition"], body["version"], body["files"]["ingenium.html"]["sha256"][:12])
    try:
        fp = os.path.join(d, name)
        with open(fp + ".tmp", "w", encoding="utf-8") as fh:
            json.dump(f, fh, indent=1, sort_keys=True)
        os.replace(fp + ".tmp", fp)
    except Exception:
        log_problem("self2: the signature for phones and tablets could not be kept", sys.exc_info())
        return {"ok": False, "error": "The signature could not be kept on this computer."}
    return {"ok": True, "kept": name}


def _self2_answer(again=False):
    st = _self_answer(again)
    try:
        st["mobile_signed"] = bool(st.get("state") == "signed" and _self2_kept(st.get("version"), st.get("edition")))
    except Exception:
        st["mobile_signed"] = False
    return st


def _self2_mobile_put(text):
    try:
        f = json.loads(text) if isinstance(text, str) and len(text) <= 65536 else None
    except Exception:
        f = None
    r = _self2_mobile_keep(f)
    if not r.get("ok"):
        return r
    st = _self2_answer(True)
    st["kept_mobile"] = r.get("kept")
    return st


def _self2_put(text):
    """Bring a signature in: one signature, as in 7.58; or the file Save the signature makes, with the computer apps' signature and the
    phones' and tablets' in it (the second kept when it fits this release; it is never needed for this computer to open)."""
    try:
        f = json.loads(text) if isinstance(text, str) and len(text) <= 262144 else None
    except Exception:
        f = None
    if not (isinstance(f, dict) and f.get("kind") == _SELF2_LIST):
        return _self_put(text)
    sigs = [x for x in (f.get("signatures") if f.get("v") == 1 and isinstance(f.get("signatures"), list) else [])[:8] if isinstance(x, dict)]
    desk = [x for x in sigs if isinstance(x.get("release"), dict) and x["release"].get("app") == "ingenium"]
    mob = [x for x in sigs if isinstance(x.get("release"), dict) and x["release"].get("app") == _SELF2_APP]
    if not desk:
        return {"ok": False, "error": "This file holds no signature for the computer apps."}
    st = _self_put(json.dumps(desk[0]))
    if not st.get("ok"):
        return st
    for m in mob:
        try:
            _self2_mobile_keep(m)
        except Exception:
            log_problem("self2: a signature for phones and tablets could not be kept", sys.exc_info())
    kept = st.get("kept")
    st = _self2_answer(True)
    st["kept"] = kept
    return st


def _self2_get():
    r = _self_get()
    if not r.get("ok"):
        return r
    st = _SELF.get("last") or {}
    mob = _self2_kept(st.get("version"), st.get("edition"))
    if not mob:
        return r
    try:
        desk = json.loads(r["text"])
    except Exception:
        return r
    return {"ok": True, "name": r.get("name"), "text": json.dumps({"kind": _SELF2_LIST, "v": 1, "signatures": [desk, mob[0][2]]}, indent=1)}


def _self2_give_read(fp):
    """Sign a copy you give: a page of the full or gift edition, read here."""
    try:
        if os.path.getsize(fp) > (512 << 20):
            return {"ok": False, "error": "That file is too large to be a page of Ingenium."}
        with open(fp, "rb") as fh:
            raw = fh.read()
    except Exception:
        return {"ok": False, "error": "That file could not be read."}
    if not (_SELF_VER.search(raw) and _SELF_ED.search(raw)):
        return {"ok": False, "error": "That file is not a page of Ingenium."}
    try:
        ver, ed, mobile, own = _self2_fields(raw)
    except Exception:
        log_problem("self2: a page to give could not be read", sys.exc_info())
        return {"ok": False, "error": "That page could not be read whole."}
    if ed not in ("full", "gift"):
        return {"ok": False, "error": "That is the %s edition: Sign a copy you give is for the full and gift editions; your own copy is signed "
                "with Sign this release." % ed}
    return {"ok": True, "name": os.path.basename(fp), "version": ver, "edition": ed, "files": {"ingenium.html": own}, "mobile_files": mobile}


def _self2_give_pick():
    try:
        import webview
        win = webview.windows[0] if getattr(webview, "windows", None) else None
        if win is None:
            return {"ok": False, "error": "The file dialog could not open."}
        kinds = getattr(webview, "FileDialog", None)
        dialog = kinds.OPEN if kinds is not None else webview.OPEN_DIALOG
        got = win.create_file_dialog(dialog, allow_multiple=False, file_types=("Ingenium page (*.html)", "All files (*.*)")) or ()
    except Exception:
        log_problem("self2: the file dialog", sys.exc_info())
        return {"ok": False, "error": "The file dialog could not open."}
    if isinstance(got, str):
        got = (got,)
    if not got:
        return None
    return _self2_give_read(str(got[0]))


'''

rep('''def _start_local_server(directory, html_name=None):''', FN + '''def _start_local_server(directory, html_name=None):''')

rep('''    def self_check(self, again=False):
        return _self_answer(again)

    def self_signature_put(self, text):
        return _self_put(text)

    def self_signature_get(self):
        return _self_get()
''', '''    def self_check(self, again=False):
        return _self2_answer(again)  # 7.64: and whether the copy for phones and tablets is signed too (app_self2_764.py)

    def self_signature_put(self, text):
        return _self2_put(text)

    def self_signature_get(self):
        return _self2_get()

    # 7.64: part two, the copy her phones and tablets carry, and the copies she gives (app_self2_764.py)
    def self_mobile_fields(self):
        return _self2_mobile_fields()

    def self_mobile_signature_put(self, text):
        return _self2_mobile_put(text)

    def self_give_pick(self):
        return _self2_give_pick()
''', 2)
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
