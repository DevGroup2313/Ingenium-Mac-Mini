"""Ingenium 7.38: the built app's own self-test pairs sealed, as her devices do.

7.37 (app_seal_737.py) refuses a request that carries the code alone and names no device paired before 7.37. The self-test of lending
(_selftest_share, run by the build workflows with --selftest-share) did exactly that, so the 7.37 builds for Windows and the Intel Mac
stopped there ("sharing with other devices: HTTP Error 401"). Now the self-test names itself as a device paired before (its checks of
the code, the model list and a streamed answer stay as they were), and then also pairs sealed as a phone would: its own key pair, the
pairing with the code, the four words confirmed here, and the model list asked for through /ingenium/sealed, opened and compared with
the plain one. So every build proves that the encryption library it carries works inside the built app.

    python3 build/desktop/app_seal2_738.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_seal_selftest" in s:
    print("already patched", p)
    sys.exit(0)
if "_seal_serve" not in s or "def _selftest_share(b):" not in s:
    sys.exit("%s: app_seal_737.py and the lending self-test must be there first" % p)

FN = r'''# ---- 7.38: the self-test pairs sealed, as her devices do (app_seal2_738.py) ----
_SELFTEST_DEV = "id=selftest-device;kind=laptop;name=Self-test"


def _seal_selftest(base, code, plain_models):
    """pair sealed with this computer's own gateway, as a phone would, and ask for the model list through /ingenium/sealed"""
    import secrets
    from cryptography.hazmat.primitives.asymmetric import ec
    from cryptography.hazmat.primitives import hashes, serialization
    from cryptography.hazmat.primitives.kdf.hkdf import HKDF
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    dev_id = "selftest-sealed"
    hdr = "id=%s;kind=phone;name=Self-test%%20phone" % dev_id
    me = ec.generate_private_key(ec.SECP256R1())
    pub = me.public_key().public_bytes(serialization.Encoding.X962, serialization.PublicFormat.UncompressedPoint)

    def call(path, body=None, headers=None):
        h = {"content-type": "application/json", "X-Ingenium-Device": hdr}
        h.update(headers or {})
        data = json.dumps(body).encode("utf-8") if body is not None else None
        return _NO_PROXY.open(urllib.request.Request("http://%s%s" % (base, path), data=data, headers=h), timeout=120)
    with call("/ingenium/pair2", {"id": dev_id, "kind": "phone", "name": "Self-test phone", "pub": base64.b64encode(pub).decode("ascii")},
              {"authorization": "Bearer " + code}) as r:
        ask = json.loads(r.read().decode("utf-8"))
    peer = base64.b64decode(ask["pub"])
    if ask.get("words") != _seal_words(pub, peer):
        return {"ok": False, "error": "the four words differ between the two sides"}
    ans = _seal_answer(ask["rid"], True)            # here she would press They match
    if not ans.get("ok"):
        return {"ok": False, "error": "the pairing was not confirmed: %s" % ans.get("error")}
    with call("/ingenium/pair2/state?rid=" + ask["rid"], None, {"authorization": "Bearer " + code}) as r:
        st = json.loads(r.read().decode("utf-8"))
    if st.get("state") != "ok" or not st.get("sealed"):
        return {"ok": False, "error": "the pairing did not end sealed: %s" % st}
    shared = me.exchange(ec.ECDH(), ec.EllipticCurvePublicKey.from_encoded_point(ec.SECP256R1(), peer))
    x, y = sorted([pub, peer])
    key = HKDF(algorithm=hashes.SHA256(), length=32, salt=hashlib.sha256(b"ingenium-seal-v1" + x + y).digest(), info=b"messages").derive(shared)
    aes, rid, iv = AESGCM(key), secrets.token_hex(8), os.urandom(12)
    inner = {"m": "GET", "p": "/v1/models", "h": {"X-Ingenium-Device": hdr}, "b": "", "t": int(time.time() * 1000), "r": rid}
    ct = aes.encrypt(iv, json.dumps(inner).encode("utf-8"), ("ingenium-seal-v1|req|%s" % dev_id).encode("utf-8"))
    with call("/ingenium/sealed", {"v": 1, "d": dev_id, "i": base64.b64encode(iv).decode("ascii"), "c": base64.b64encode(ct).decode("ascii")}) as r:
        lines = [l for l in r.read().split(b"\n") if l.strip()]
    ad, raw, ended = ("ingenium-seal-v1|res|%s|%s|" % (dev_id, rid)).encode("utf-8"), b"", False
    for n, l in enumerate(lines):
        u = base64.b64decode(l)
        pt = aes.decrypt(u[:12], u[12:], ad + str(n).encode("ascii"))
        if pt[:1] == b"\x01":
            ended = True
            break
        raw += pt[1:]
    head, _, body = raw.partition(b"\r\n\r\n")
    status = int(head.split(b" ", 2)[1]) if head.startswith(b"HTTP/") else 0
    models = [m.get("name") for m in (json.loads(body.decode("utf-8")).get("data") or [])] if status == 200 else []
    refused = False
    try:      # the sealed device, with the code alone, is refused
        call("/v1/models", None, {"authorization": "Bearer " + code}).close()
    except urllib.error.HTTPError as e:
        refused = e.code == 401
    _seal_forget(dev_id)
    ok = ended and status == 200 and models == plain_models and refused
    return {"ok": ok, "frames": len(lines), "status": status, "models": models, "refuses_code_alone": refused,
            "error": "" if ok else "the sealed answer was not the plain one (status %s, ended %s, refused %s)" % (status, ended, refused)}


'''
rep("\ndef _selftest_share(b):\n", "\n" + FN + "def _selftest_share(b):\n")
rep('''            h = {"content-type": "application/json"}
            if key:
                h["authorization"] = "Bearer " + key
            data = json.dumps(body).encode("utf-8") if body is not None else None
            return _NO_PROXY.open(urllib.request.Request("http://%s%s" % (base, path), data=data, headers=h), timeout=600)''',
    '''            h = {"content-type": "application/json", "X-Ingenium-Device": _SELFTEST_DEV}   # 7.38: a device paired before 7.37
            if key:
                h["authorization"] = "Bearer " + key
            data = json.dumps(body).encode("utf-8") if body is not None else None
            return _NO_PROXY.open(urllib.request.Request("http://%s%s" % (base, path), data=data, headers=h), timeout=600)''')
rep('''        port, code = _SHARE["port"], _share_code()
        ips = [a for a in _share_addresses(port) if re.match(r"\\d+\\.\\d+\\.\\d+\\.\\d+:", a)]''',
    '''        port, code = _SHARE["port"], _share_code()
        if _seal_lib():      # 7.38 (app_seal2_738.py): the self-test is a device paired before 7.37, as far as the code goes
            _st = _seal_store()
            if "selftest-device" not in _st["legacy"]:
                _st["legacy"].append("selftest-device")
        ips = [a for a in _share_addresses(port) if re.match(r"\\d+\\.\\d+\\.\\d+\\.\\d+:", a)]''')
rep('''        out["models"] = [m.get("name") for m in models]
''', '''        out["models"] = [m.get("name") for m in models]
        if _seal_lib():      # 7.38 (app_seal2_738.py): and sealed, as her devices pair
            try:
                out["sealed"] = _seal_selftest(base, code, out["models"])
            except Exception as e:
                out["sealed"] = {"ok": False, "error": "%s: %s" % (type(e).__name__, e)}
            if not out["sealed"].get("ok"):
                out["error"] = "sealed between devices: %s" % out["sealed"].get("error")
                return out
        else:      # a build must carry it: without it nothing between her devices is sealed
            out["sealed"] = {"ok": False, "error": "this build carries no encryption library (cryptography)"}
            out["error"] = "sealed between devices: this build carries no encryption library (cryptography)"
            return out
''')

open(p, "w", encoding="utf-8").write(s)
print("patched", p)
