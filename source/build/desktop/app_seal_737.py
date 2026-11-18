"""Ingenium 7.37: sealed between her devices. Each device that pairs with this computer agrees on a key of its own with it; she compares
four words on both screens and confirms them here; from then on every request from that device, and every byte of the answer, is sealed.

Her answer (18 November 2026), asked whether messages between her devices should be encrypted end to end: "Yes, encrypt them". Her word
on the live preview (https://claude.ai/artifact/KRuQqSihghbSgFcHswJCEU, source/previews/pairing): "Approve, build it", and "I approve of
the preview, please commit and push it everywhere".

Why words: the pairing code has 40 bits (8 of 32 letters). It is enough against guessing over the network (wrong tries are slowed), but
too little to be the only secret behind the seal, since a recorded pairing could be tried offline. The words (32 bits, from both public
keys) show that no one in between swapped the keys.

  POST /ingenium/pair2 {id, kind, name, pub}   with the code: the device's ECDH P-256 public key (65 bytes, base64); the answer carries
                                               this computer's public key, a request id and the four words. A device that cannot seal
                                               sends no key: she is asked here whether to allow it with the code alone
  GET  /ingenium/pair2/state?rid=              with the code: wait, no, or ok with what /ingenium/pair answers (once she confirmed here)
  POST /ingenium/sealed {v, d, i, c}           no code: the device id, an IV and the sealed request (AES-GCM, 256-bit, the key from ECDH
                                               and HKDF-SHA-256); it is run through this server's own routes as the device's request,
                                               and the whole answer comes back sealed, one base64 line per frame (streams included)
  seal_pending(), seal_answer(rid, yes), seal_status()   for this computer's own page (Settings, Your devices)
A device paired before 7.37 keeps working with the code (seal.json "legacy") until it pairs again; a new device, or one paired sealed,
is refused with the code alone. Requests that name no device pass only while such older devices remain, or for a computer calling in.
Needs the Python package cryptography (the build workflows install it); without it, pairing and requests work as before.

    python3 build/desktop/app_seal_737.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_seal_serve" in s:
    print("already patched", p)
    sys.exit(0)
if "_apps_dev_get" not in s or "_share_dev_header" not in s:
    sys.exit("%s: the lending of 6.81 (app_lend_681.py) and her apps of 7.35 (app_apps_735.py) must be applied first" % p)

FN = r'''# ---- 7.37: sealed between her devices (app_seal_737.py) ----
@@WORDS@@
_SEAL = {"lock": threading.RLock(), "pending": {}, "seen": {}, "key": None, "st": None, "lib": None}
_SEAL_INFO = b"ingenium-seal-v1"


def _seal_lib():
    if _SEAL["lib"] is None:
        try:
            from cryptography.hazmat.primitives.asymmetric import ec  # noqa: F401
            from cryptography.hazmat.primitives.ciphers.aead import AESGCM  # noqa: F401
            from cryptography.hazmat.primitives.kdf.hkdf import HKDF  # noqa: F401
            from cryptography.hazmat.primitives import hashes, serialization  # noqa: F401
            _SEAL["lib"] = True
        except Exception:
            _SEAL["lib"] = False
    return _SEAL["lib"]


def _seal_dir():
    d = _models_dir()
    return str(d.parent) if d is not None else None


def _seal_write(path, data):
    """only this user may read it (0600), written whole or not at all"""
    tmp = path + ".part"
    fd = os.open(tmp, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, "wb") as fh:
        fh.write(data)
    os.replace(tmp, path)
    try:
        os.chmod(path, 0o600)
    except Exception:
        pass


def _seal_b64d(v):
    return base64.b64decode(str(v or "").encode("ascii"), validate=True)


def _seal_priv():
    from cryptography.hazmat.primitives.asymmetric import ec
    from cryptography.hazmat.primitives import serialization
    with _SEAL["lock"]:
        if _SEAL["key"] is not None:
            return _SEAL["key"]
        d = _seal_dir()
        path = os.path.join(d, "seal_key.pem") if d else None
        k = None
        if path:
            try:
                with open(path, "rb") as fh:
                    k = serialization.load_pem_private_key(fh.read(), None)
            except Exception:
                k = None
        if k is None:
            k = ec.generate_private_key(ec.SECP256R1())
            if path:
                _seal_write(path, k.private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8,
                                                  serialization.NoEncryption()))
        _SEAL["key"] = k
        return k


def _seal_pub():
    from cryptography.hazmat.primitives import serialization
    return _seal_priv().public_key().public_bytes(serialization.Encoding.X962, serialization.PublicFormat.UncompressedPoint)


def _seal_words(a, b):
    x, y = sorted([bytes(a), bytes(b)])
    h = hashlib.sha256(b"ingenium-pair-v1" + x + y).digest()
    return [_SEAL_WORDS[h[i]] for i in range(4)]


def _seal_derive(peer_raw):
    from cryptography.hazmat.primitives.asymmetric import ec
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.kdf.hkdf import HKDF
    peer = ec.EllipticCurvePublicKey.from_encoded_point(ec.SECP256R1(), bytes(peer_raw))
    shared = _seal_priv().exchange(ec.ECDH(), peer)
    x, y = sorted([_seal_pub(), bytes(peer_raw)])
    salt = hashlib.sha256(_SEAL_INFO + x + y).digest()
    return HKDF(algorithm=hashes.SHA256(), length=32, salt=salt, info=b"messages").derive(shared)


def _seal_store():
    """{"v": 1, "devices": {id: {pub, key, name, kind, at}}, "legacy": [ids]}, in seal.json beside share.json (0600)"""
    with _SEAL["lock"]:
        if _SEAL["st"] is not None:
            return _SEAL["st"]
        d = _seal_dir()
        st = None
        if d:
            try:
                with open(os.path.join(d, "seal.json"), encoding="utf-8") as fh:
                    st = json.load(fh)
            except Exception:
                st = None
        if not (isinstance(st, dict) and isinstance(st.get("devices"), dict)):
            # the first start of 7.37: the devices paired before keep working with the code until they pair again
            c = _share_cfg()
            known = c.get("devices") if isinstance(c.get("devices"), dict) else {}
            gone = _share_removed()
            st = {"v": 1, "devices": {}, "legacy": sorted(i for i in known if i not in gone)}
            _SEAL["st"] = st
            _seal_save()
        if not isinstance(st.get("legacy"), list):
            st["legacy"] = []
        _SEAL["st"] = st
        return st


def _seal_save():
    d = _seal_dir()
    if d and _SEAL["st"] is not None:
        try:
            _seal_write(os.path.join(d, "seal.json"), json.dumps(_SEAL["st"]).encode("utf-8"))
        except Exception:
            log_problem("seal: could not save its devices", sys.exc_info())


def _seal_status():
    if not _seal_lib():
        return {"lib": False, "sealed": 0, "legacy": 0, "pending": 0, "devices": {}}
    st = _seal_store()
    with _SEAL["lock"]:
        now = time.time()
        pend = sum(1 for x in _SEAL["pending"].values() if x["state"] == "wait" and now - x["at"] < 300)
        devs = dict((i, "sealed") for i in st["devices"])
        devs.update((i, "legacy") for i in st["legacy"] if i not in devs)
    return {"lib": True, "sealed": len(st["devices"]), "legacy": len(st["legacy"]), "pending": pend, "devices": devs}


def _seal_mark(lst):
    try:
        if not _seal_lib():
            return
        st = _seal_store()
        for d in lst:
            d["sealed"] = d["id"] in st["devices"]
            d["legacy"] = d["id"] in st["legacy"] and not d["sealed"]
    except Exception:
        pass


def _seal_forget(dev_id):
    if not _seal_lib():
        return
    st = _seal_store()
    with _SEAL["lock"]:
        st["devices"].pop(dev_id, None)
        st["legacy"] = [x for x in st["legacy"] if x != dev_id]
        _seal_save()


def _seal_refuse(h, pairing):
    """with the code alone (7.37): only a device paired before 7.37, a computer calling in, or the sealed pairing itself"""
    if not _seal_lib():
        return ""
    path = h.path.split("?", 1)[0].rstrip("/")
    if path.startswith("/ingenium/pair2"):
        return ""
    st = _seal_store()
    dev = _share_dev_header(h.headers.get("X-Ingenium-Device"))
    if dev is None:
        if st["legacy"] or path.startswith("/ingenium/callin") or path.startswith("/ingenium/via/"):
            return ""
        return ("This computer now seals everything between your devices. Update Ingenium on the device that asks, then pair it again: "
                "both screens show four words, and you confirm them on this computer.")
    if dev["id"] in st["legacy"] or dev["id"] in _share_removed():
        return ""       # a removed device hears that it was removed (the check after this one)
    if dev["id"] in st["devices"]:
        return ("This device is paired sealed, so its requests must be sealed. If Ingenium on it was reset, remove it on this computer "
                "and pair it again.")
    return "Pair this device once more: both screens show four words, and you confirm them on this computer."


def _seal_body(h, limit):
    n = int(h.headers.get("Content-Length") or 0)
    if n <= 0 or n > limit:
        raise ValueError("the request is empty or too large")
    return h.rfile.read(n)


def _seal_pair_start(h):
    """POST /ingenium/pair2 (with the code): a device asks to pair sealed"""
    if not _seal_lib():
        return h._err(501, "This computer cannot seal yet: update Ingenium on it.")
    try:
        body = json.loads(_seal_body(h, 65536).decode("utf-8") or "{}")
        pub = None       # a device that cannot seal sends no key: she is asked whether to allow it with the code alone
        if body.get("pub"):
            pub = _seal_b64d(body.get("pub"))
            if len(pub) != 65 or pub[0] != 4:
                raise ValueError("not a P-256 public key")
            from cryptography.hazmat.primitives.asymmetric import ec
            ec.EllipticCurvePublicKey.from_encoded_point(ec.SECP256R1(), pub)
    except Exception:
        return h._err(400, "The pairing request was not readable.")
    from urllib.parse import quote
    dev = _share_dev_header(h.headers.get("X-Ingenium-Device")) or _share_dev_header(
        "id=%s;kind=%s;name=%s" % (quote(str(body.get("id") or "")), quote(str(body.get("kind") or "")), quote(str(body.get("name") or ""))))
    if not dev:
        return h._err(400, "Name this device first (Ingenium does so by itself).")
    import secrets
    rid = secrets.token_urlsafe(12)
    words = _seal_words(_seal_pub(), pub) if pub else []
    with _SEAL["lock"]:
        pend = _SEAL["pending"]
        for k in [k for k, v in pend.items() if time.time() - v["at"] > 600]:
            pend.pop(k, None)
        for k in [k for k, v in pend.items() if v["dev"]["id"] == dev["id"] and v["state"] == "wait"]:
            pend.pop(k, None)      # the same device asking again replaces its earlier ask
        if len(pend) >= 8:
            for k in sorted(pend, key=lambda k: pend[k]["at"])[:len(pend) - 7]:
                pend.pop(k, None)
        pend[rid] = {"rid": rid, "dev": dev, "pub": pub, "words": words, "at": time.time(), "state": "wait", "ip": h.client_address[0]}
    return h._json(200, {"ok": True, "rid": rid, "pub": base64.b64encode(_seal_pub()).decode("ascii"), "words": words,
                         "computer": _share_computer_name(), "id": _share_id()})


def _seal_register(x):
    st = _seal_store()
    dev = x["dev"]
    if x["pub"] is None:       # allowed unsealed: an older device from then on, guarded by the code alone
        with _SEAL["lock"]:
            st["devices"].pop(dev["id"], None)
            if dev["id"] not in st["legacy"]:
                st["legacy"].append(dev["id"])
            _seal_save()
        _share_dev_seen(dev, x.get("ip") or "")
        return
    key = _seal_derive(x["pub"])
    with _SEAL["lock"]:
        st["devices"][dev["id"]] = {"pub": base64.b64encode(x["pub"]).decode("ascii"), "key": base64.b64encode(key).decode("ascii"),
                                    "name": dev.get("name") or "", "kind": dev.get("kind") or "", "at": int(time.time())}
        st["legacy"] = [i for i in st["legacy"] if i != dev["id"]]
        _seal_save()
    c = _share_cfg()
    was = [i for i in (c.get("removed") or []) if isinstance(i, str)]
    if dev["id"] in was:
        c["removed"] = [i for i in was if i != dev["id"]]
        _share_cfg_save(c)
    _share_dev_seen(dev, x.get("ip") or "")


def _seal_pending():
    with _SEAL["lock"]:
        now = time.time()
        return {"ok": True, "asks": [{"rid": x["rid"], "name": x["dev"].get("name") or "", "kind": x["dev"].get("kind") or "",
                                      "words": list(x["words"]), "seconds": int(now - x["at"])}
                                     for x in sorted(_SEAL["pending"].values(), key=lambda v: v["at"])
                                     if x["state"] == "wait" and now - x["at"] < 300]}


def _seal_answer(rid, yes):
    with _SEAL["lock"]:
        x = _SEAL["pending"].get(str(rid or ""))
        if not x or x["state"] != "wait" or time.time() - x["at"] >= 300:
            return {"ok": False, "error": "That device is no longer waiting. Pair it again from the device."}
        if yes:
            try:
                _seal_register(x)
            except Exception as e:
                x["state"] = "no"
                return {"ok": False, "error": str(e)}
            x["state"] = "ok"
        else:
            x["state"] = "no"
    return {"ok": True, "state": x["state"]}


def _seal_pair_state(h):
    """GET /ingenium/pair2/state?rid= (with the code): wait, no, or ok with what /ingenium/pair answers"""
    from urllib.parse import urlparse, parse_qs
    rid = (parse_qs(urlparse(h.path).query).get("rid") or [""])[0]
    with _SEAL["lock"]:
        x = _SEAL["pending"].get(rid)
        if not x:
            return h._json(404, {"error": {"message": "That pairing is no longer waiting. Pair again.", "code": 404}, "state": "gone"})
        dev = _share_dev_header(h.headers.get("X-Ingenium-Device"))
        if dev and dev["id"] != x["dev"]["id"]:
            return h._err(403, "That pairing belongs to another device.")
        state, sealed = x["state"], x["pub"] is not None
        if state == "wait" and time.time() - x["at"] >= 300:
            state = x["state"] = "no"
        if state != "wait":
            _SEAL["pending"].pop(rid, None)
    if state == "wait":
        return h._json(200, {"state": "wait"})
    if state == "no":
        return h._json(200, {"state": "no"})
    lend = bool(_SHARE.get("lend"))
    return h._json(200, {"state": "ok", "ok": True, "app": "Ingenium", "id": _share_id(), "computer": _share_computer_name(),
                         "kind": _share_kind(), "addresses": _share_addresses_cached(h.server.server_address[1]), "lends": lend,
                         "models": [m["name"] for m in _share_models()] if lend else [], "sealed": sealed})


class _SealWriter(object):
    """the answer of a sealed request: every byte the route writes (its status line, its headers, its body) sealed in frames, one base64
    line each: IV (12 bytes) and AES-GCM of a kind byte (0 data, 1 the end) and the data; the frame's number is bound in"""

    def __init__(self, h, aes, dev, rid):
        self.h, self.aes, self.n, self.closed, self.wrote = h, aes, 0, False, 0
        self.ad = ("ingenium-seal-v1|res|%s|%s|" % (dev, rid)).encode("utf-8")

    def _frame(self, kind, data):
        iv = os.urandom(12)
        ct = self.aes.encrypt(iv, bytes([kind]) + data, self.ad + str(self.n).encode("ascii"))
        self.n += 1
        self.h.wfile.write(base64.b64encode(iv + ct) + b"\n")

    def write(self, data):
        if self.closed:
            return 0
        data = bytes(data)
        for i in range(0, len(data), 1 << 18):
            self._frame(0, data[i:i + (1 << 18)])
        self.wrote += len(data)
        self.flush()
        return len(data)

    def flush(self):
        try:
            self.h.wfile.flush()
        except Exception:
            pass

    def close(self):
        if not self.closed:
            self._frame(1, b"")
            self.closed = True
            self.flush()


def _seal_serve(h):
    """POST /ingenium/sealed: a request from a device paired sealed, run as its own, answered sealed"""
    if not _seal_lib():
        return h._err(501, "This computer cannot seal yet: update Ingenium on it.")
    if getattr(h, "_seal_dev", None) is not None:
        return h._err(400, "A sealed request cannot carry another.")
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    try:
        env = json.loads(_seal_body(h, 96 << 20).decode("utf-8"))
        did = str(env.get("d") or "")
        iv, ct = _seal_b64d(env.get("i")), _seal_b64d(env.get("c"))
    except Exception:
        return h._err(400, "The sealed request was not readable.")
    st = _seal_store()
    rec = st["devices"].get(did)
    if not rec or did in _share_removed():
        return h._json(401, {"error": {"message": "This device is not paired sealed with this computer. Pair it again.", "code": 401},
                             "pair_sealed": True, "removed": did in _share_removed()})
    aes = AESGCM(_seal_b64d(rec["key"]))
    try:
        inner = json.loads(aes.decrypt(iv, ct, ("ingenium-seal-v1|req|%s" % did).encode("utf-8")).decode("utf-8"))
    except Exception:
        return h._json(401, {"error": {"message": "The request could not be opened with this device's key. Pair it again.", "code": 401},
                             "pair_sealed": True})
    now = time.time()
    rid = str(inner.get("r") or "")
    try:
        t = float(inner.get("t") or 0) / 1000.0
    except Exception:
        t = 0
    if abs(now - t) > 600:
        return h._err(401, "This device's clock and this computer's differ by more than ten minutes, so the request was refused.")
    with _SEAL["lock"]:
        seen = _SEAL["seen"]
        for k in [k for k, v in seen.items() if now - v > 900]:
            seen.pop(k, None)
        if not rid or rid in seen:
            return h._err(409, "This request was already answered once.")
        seen[rid] = now
    method = str(inner.get("m") or "GET").upper()
    path = str(inner.get("p") or "/")
    if not path.startswith("/") or method not in ("GET", "POST"):
        return h._err(400, "The sealed request was not readable.")
    try:
        body = _seal_b64d(inner.get("b") or "")
    except Exception:
        return h._err(400, "The sealed request was not readable.")
    import io
    import email.message
    from urllib.parse import quote
    hdrs = inner.get("h") if isinstance(inner.get("h"), dict) else {}
    dev = _share_dev_header(hdrs.get("X-Ingenium-Device"))
    if not dev or dev["id"] != did:
        dev = {"id": did, "kind": rec.get("kind") or "", "name": rec.get("name") or ""}
    msg = email.message.Message()
    for k, v in hdrs.items():
        if str(k).lower() not in ("authorization", "content-length", "x-ingenium-device", "host", "connection"):
            msg[str(k)] = str(v)[:4096]
    msg["Content-Length"] = str(len(body))
    msg["X-Ingenium-Device"] = "id=%s;kind=%s;name=%s" % (quote(dev["id"]), quote(dev["kind"] or ""), quote(dev["name"] or ""))
    H = type(h)
    s2 = H.__new__(H)
    s2.server, s2.client_address, s2.request_version = h.server, h.client_address, "HTTP/1.0"
    s2.command, s2.path, s2.requestline = method, path, "%s %s HTTP/1.0" % (method, path)
    s2.headers, s2.rfile, s2.close_connection = msg, io.BytesIO(body), True
    s2._seal_dev = dev
    w = _SealWriter(h, aes, did, rid)
    s2.wfile = w
    h.send_response(200)
    h._cors()
    h.send_header("Content-Type", "text/plain; charset=us-ascii")
    h.send_header("Cache-Control", "no-cache")
    h.send_header("X-Ingenium-Sealed", "1")
    h.end_headers()
    try:
        if method == "GET":
            s2.do_GET()
        else:
            s2.do_POST()
    except Exception:
        log_problem("seal: a sealed request failed", sys.exc_info())
        if not w.wrote:
            try:
                s2._err(500, "This computer could not answer that request.")
            except Exception:
                pass
    w.close()


'''.replace("@@WORDS@@", '_SEAL_WORDS = (\n    "acorn", "amber", "anchor", "apple", "apron", "arch", "arrow", "atlas", "attic", "autumn", "badge", "bagel", "bakery",\n    "bamboo", "banjo", "barley", "basil", "basket", "beacon", "beach", "bean", "bell", "berry", "birch", "biscuit", "blanket",\n    "bloom", "blossom", "boat", "bonnet", "book", "boot", "bottle", "branch", "bread", "breeze", "brick", "bridge", "brook",\n    "brush", "bubble", "bucket", "button", "cabin", "cactus", "cake", "camel", "candle", "canoe", "canvas", "canyon", "cape",\n    "carrot", "castle", "cedar", "cello", "chalk", "cherry", "chess", "cider", "cinnamon", "circle", "cliff", "clock", "cloud",\n    "clover", "coast", "cobalt", "coconut", "comet", "compass", "copper", "coral", "cotton", "cradle", "crane", "crayon", "creek",\n    "cricket", "crystal", "cup", "daisy", "dawn", "delta", "desert", "dolphin", "dove", "dragon", "drum", "dune", "eagle", "easel",\n    "echo", "elbow", "ember", "falcon", "feather", "fern", "fiddle", "field", "fig", "flame", "flute", "forest", "fossil",\n    "fountain", "fox", "garden", "garnet", "ginger", "glacier", "globe", "glove", "granite", "grape", "harbour", "harp", "hazel",\n    "heron", "hill", "honey", "horizon", "iris", "island", "ivory", "jacket", "jasmine", "jewel", "kayak", "kettle", "kite",\n    "koala", "ladder", "lagoon", "lake", "lantern", "lark", "lemon", "lilac", "lily", "linen", "lion", "lotus", "lunar", "maple",\n    "marble", "meadow", "melon", "mint", "mirror", "mitten", "moon", "moss", "mountain", "muffin", "nectar", "needle", "nest",\n    "noodle", "nutmeg", "oak", "oasis", "ocean", "olive", "onion", "opal", "orbit", "orchard", "otter", "owl", "paddle", "palm",\n    "panda", "paper", "parrot", "pasta", "peach", "peanut", "pearl", "pebble", "pencil", "penguin", "pepper", "piano", "pigeon",\n    "pillow", "pine", "planet", "plum", "pocket", "pony", "poppy", "pottery", "prairie", "pumpkin", "quail", "quartz", "quill",\n    "quilt", "rabbit", "radish", "rain", "raven", "reef", "ribbon", "river", "robin", "rocket", "rose", "saddle", "saffron",\n    "sail", "salmon", "sand", "satin", "scarf", "shell", "silver", "sketch", "sky", "sled", "snow", "sparrow", "spice", "spoon",\n    "spring", "spruce", "star", "stone", "straw", "stream", "sugar", "summit", "sun", "swan", "teapot", "thistle", "thunder",\n    "tiger", "timber", "tulip", "tunnel", "turtle", "valley", "velvet", "violet", "volcano", "walnut", "wave", "whale", "wheat",\n    "willow", "window", "winter", "wren", "yarn")')

rep("\ndef _share_handler():\n", "\n" + FN + "def _share_handler():\n")
# the device's hello says this computer seals
rep('"kind": _share_kind(), "pair": 1,', '"kind": _share_kind(), "pair": 1, "seal": 1 if _seal_lib() else 0,')
# a sealed request is its own proof; with the code alone, only what 7.37 still allows
rep('''        def _allowed(self, pairing=False):
            ip = self.client_address[0]
''', '''        def _allowed(self, pairing=False):
            # 7.37 (app_seal_737.py): a sealed request is its own proof (opened with the device's key)
            if getattr(self, "_seal_dev", None) is not None:
                _share_dev_seen(self._seal_dev, self.client_address[0])
                return True
            ip = self.client_address[0]
''')
rep('''            with _SHARE_LOCK:
                _SHARE["last"][ip] = now
''', '''            why = _seal_refuse(self, pairing)       # 7.37 (app_seal_737.py)
            if why:
                self._json(401, {"error": {"message": why, "code": 401}, "pair_sealed": True})
                return False
            with _SHARE_LOCK:
                _SHARE["last"][ip] = now
''')
rep('''            if not self._allowed():
                return
            # 6.57: Ingenium Cloud's box (app_cloud_657.py), whether or not this computer lends its models
''', '''            if not self._allowed():
                return
            # 7.37 (app_seal_737.py): a device waits for her to compare the words on this computer
            if path == "/ingenium/pair2/state":
                return _seal_pair_state(self)
            # 6.57: Ingenium Cloud's box (app_cloud_657.py), whether or not this computer lends its models
''')
rep('''        def do_POST(self):
            path = self.path.split("?", 1)[0].rstrip("/")
            if not self._allowed(pairing=(path == "/ingenium/pair")):
                return
''', '''        def do_POST(self):
            path = self.path.split("?", 1)[0].rstrip("/")
            # 7.37 (app_seal_737.py): a sealed request carries no code; its seal is the proof
            if path == "/ingenium/sealed":
                return _seal_serve(self)
            if not self._allowed(pairing=(path in ("/ingenium/pair", "/ingenium/pair2"))):
                return
            if path == "/ingenium/pair2":
                return _seal_pair_start(self)
''')
# each device in the list says whether it is sealed, or paired before 7.37
rep('''        d["last"] = int(d["last"] or 0)
    return lst
''', '''        d["last"] = int(d["last"] or 0)
    _seal_mark(lst)       # 7.37 (app_seal_737.py)
    return lst
''')
rep('''        c["devices"] = known
        _share_cfg_save(c)
        with _SHARE_LOCK:
            (_SHARE.get("devices") or {}).pop(dev_id, None)
''', '''        c["devices"] = known
        _share_cfg_save(c)
        _seal_forget(dev_id)       # 7.37 (app_seal_737.py): a removed device pairs again, sealed
        with _SHARE_LOCK:
            (_SHARE.get("devices") or {}).pop(dev_id, None)
''')
rep('"queued": queued, "options": _lend_options_view(),', '"queued": queued, "options": _lend_options_view(), "seal": _seal_status(),')
rep('''    def share_device_remove(self, dev_id):
        return _share_device_remove(dev_id)
''', '''    def share_device_remove(self, dev_id):
        return _share_device_remove(dev_id)

    # 7.37 (app_seal_737.py): a device asks to pair sealed; she compares the words here
    def seal_pending(self):
        return _seal_pending()

    def seal_answer(self, rid, yes):
        return _seal_answer(rid, bool(yes))

    def seal_status(self):
        return _seal_status()
''', 2)

open(p, "w", encoding="utf-8").write(s)
print("patched", p)
