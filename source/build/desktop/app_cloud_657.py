"""Ingenium 6.57 (8 November 2026): Ingenium Cloud's box, on the computer that keeps it.

Her words (8 November 2026): "I want you to build Ingenium its own local Cloud or local network that can store my data and facilitate
the transfer of my data across wirelessly across my devices ... I want all of my devices to have the same content in real time or be
able to be updated over Ingenium's Cloud". Asked how, she chose both: her Mac mini as the home hub, and any two devices directly.

The page (modules/r255.js) cuts her data into the parts a backup is made of (modules/r143.js), seals each one on the device with a key
drawn from her Cloud passphrase (AES-GCM-256), and names it by a keyed fingerprint of what is inside. This computer only keeps what
arrives: sealed parts it cannot read, and for each device a short list of its latest snapshots (the device's name, when, how large,
and the names of its parts). It never sees the passphrase, a key, or a word of her work.

It answers on the gateway that lends models (port 17860, or the next free one), only while that gateway is on, and only to requests
that carry its pairing code (the same lockout after eight wrong codes); lending itself may stay off. While the gateway is on the
computer does not go to sleep by itself (R74, _share_keep_awake), so the hub stays reachable with its screen off.

    GET  /ingenium/cloud                  what it keeps: {"api", "computer", "snaps": [...], "parts", "bytes"}
    GET  /ingenium/cloud/part/<id>        one sealed part: {"id", "b64", "sha"}
    POST /ingenium/cloud/has  {"ids"}     which of these parts it does not hold yet: {"missing": [...]}
    POST /ingenium/cloud/part/<id>  {"b64", "sha"}   keeps one sealed part (its bytes checked against "sha", their SHA-256)
    POST /ingenium/cloud/snap  {...}      keeps a snapshot once every part it names is here; the newest five of each device stay
    POST /ingenium/cloud/forget {"device"} lets one device's snapshots go (parts no snapshot names go an hour later)

Everything is kept beside the app's other data, in a folder named cloud: snaps.json and parts/<first two letters>/<id>.
    python3 desktop/app_cloud_657.py <repo>/ingenium_app.py
"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()
if "_cloud_box_dir" in s:
    sys.exit(0)


def put(old, new, times=1, label=""):
    global s
    n = s.count(old)
    if n != times:
        sys.exit("app_cloud_657: %s found %d times, not %d" % (label or old[:60], n, times))
    s = s.replace(old, new)


FN = r'''# ---------------------------------------------------------------------------
# 6.57 (app_cloud_657.py): Ingenium Cloud's box. The page seals every part before it leaves the device; this computer keeps sealed
# parts it cannot read, and each device's latest snapshots, on the gateway that lends models, behind its pairing code.
# ---------------------------------------------------------------------------
_CLOUD_API = 1
_CLOUD_LOCK = threading.Lock()
_CLOUD_PART_MAX = 24 << 20
_CLOUD_KEEP = 5
_CLOUD_ID = re.compile(r"^[0-9a-f]{64}$")


def _cloud_box_dir():
    d = _models_dir()
    if d is None:
        return None
    c = d.parent / "cloud"
    try:
        (c / "parts").mkdir(parents=True, exist_ok=True)
    except Exception:
        return None
    return c


def _cloud_index(c):
    try:
        idx = json.loads((c / "snaps.json").read_text("utf-8"))
        if isinstance(idx, dict) and isinstance(idx.get("snaps"), list):
            return idx
    except Exception:
        pass
    return {"v": 1, "snaps": []}


def _cloud_index_save(c, idx):
    tmp = c / "snaps.json.tmp"
    tmp.write_text(json.dumps(idx), "utf-8")
    os.replace(str(tmp), str(c / "snaps.json"))


def _cloud_part_path(c, pid):
    return c / "parts" / pid[:2] / pid


def _cloud_census(c):
    n, b = 0, 0
    try:
        for sub in (c / "parts").iterdir():
            if sub.is_dir():
                for f in sub.iterdir():
                    n += 1
                    b += f.stat().st_size
    except Exception:
        pass
    return n, b


def _cloud_gc(c, idx):
    """parts that no kept snapshot names, and that came more than an hour ago (one arriving now is not taken from under it)"""
    keep = set()
    for sn in idx.get("snaps", []):
        keep.add(sn.get("head"))
        keep.update(sn.get("parts") or [])
    now = time.time()
    try:
        for sub in (c / "parts").iterdir():
            if not sub.is_dir():
                continue
            for f in sub.iterdir():
                if f.name not in keep and now - f.stat().st_mtime > 3600:
                    try:
                        f.unlink()
                    except Exception:
                        pass
    except Exception:
        pass


def _cloud_body(h, limit):
    n = int(h.headers.get("Content-Length") or 0)
    if n <= 0 or n > limit:
        raise ValueError("size")
    return json.loads(h.rfile.read(n).decode("utf-8") or "{}")


def _cloud_get(h, path):
    c = _cloud_box_dir()
    if c is None:
        return h._err(500, "This computer has no folder for Ingenium Cloud.")
    if path == "/ingenium/cloud":
        with _CLOUD_LOCK:
            idx = _cloud_index(c)
            n, b = _cloud_census(c)
        return h._json(200, {"ok": True, "api": _CLOUD_API, "computer": _share_computer_name(), "snaps": idx["snaps"], "parts": n, "bytes": b})
    if path.startswith("/ingenium/cloud/part/"):
        pid = path.rsplit("/", 1)[-1]
        if not _CLOUD_ID.match(pid):
            return h._err(400, "That is not the name of a part.")
        f = _cloud_part_path(c, pid)
        if not f.exists():
            return h._err(404, "This computer does not keep that part.")
        data = f.read_bytes()
        return h._json(200, {"id": pid, "b64": base64.b64encode(data).decode("ascii"), "sha": hashlib.sha256(data).hexdigest()})
    return h._err(404, "not found")


def _cloud_post(h, path):
    c = _cloud_box_dir()
    if c is None:
        return h._err(500, "This computer has no folder for Ingenium Cloud.")
    try:
        body = _cloud_body(h, _CLOUD_PART_MAX * 4 // 3 + 65536)
        if not isinstance(body, dict):
            raise ValueError("shape")
    except Exception:
        return h._err(400, "The request was not readable.")
    if path == "/ingenium/cloud/has":
        ids = [i for i in (body.get("ids") or []) if isinstance(i, str) and _CLOUD_ID.match(i)][:50000]
        return h._json(200, {"missing": [i for i in ids if not _cloud_part_path(c, i).exists()]})
    if path.startswith("/ingenium/cloud/part/"):
        pid = path.rsplit("/", 1)[-1]
        if not _CLOUD_ID.match(pid):
            return h._err(400, "That is not the name of a part.")
        try:
            raw = base64.b64decode(str(body.get("b64") or ""), validate=True)
        except Exception:
            return h._err(400, "The part was not readable.")
        if not raw or len(raw) > _CLOUD_PART_MAX:
            return h._err(413, "That part is larger than the Cloud keeps.")
        if hashlib.sha256(raw).hexdigest() != str(body.get("sha") or ""):
            return h._err(400, "The part arrived damaged. Send it again.")
        f = _cloud_part_path(c, pid)
        with _CLOUD_LOCK:
            f.parent.mkdir(parents=True, exist_ok=True)
            if not f.exists():
                tmp = f.with_name(f.name + ".tmp")
                tmp.write_bytes(raw)
                os.replace(str(tmp), str(f))
            else:
                os.utime(str(f), None)
        return h._json(200, {"ok": True})
    if path == "/ingenium/cloud/snap":
        dev = str(body.get("device") or "")[:64]
        head = str(body.get("head") or "")
        parts = body.get("parts") or []
        if not re.match(r"^[A-Za-z0-9_-]{6,64}$", dev) or not _CLOUD_ID.match(head) or not isinstance(parts, list) or len(parts) > 200000:
            return h._err(400, "That snapshot is not complete.")
        parts = [str(x) for x in parts]
        if any(not _CLOUD_ID.match(x) for x in parts):
            return h._err(400, "That snapshot names a part wrongly.")
        missing = [x for x in [head] + parts if not _cloud_part_path(c, x).exists()]
        if missing:
            return h._json(409, {"error": {"message": "Some parts have not arrived yet.", "code": 409}, "missing": missing[:2000]})
        snap = {"device": dev, "name": str(body.get("name") or "")[:120], "at": int(body.get("at") or 0), "head": head, "parts": parts,
                "bytes": int(body.get("bytes") or 0), "platform": str(body.get("platform") or "")[:60], "version": str(body.get("version") or "")[:20],
                "got": int(time.time() * 1000)}
        # how the page draws its key from her passphrase (a salt and a count of rounds: neither is secret), so a device joining
        # the Cloud draws the same key; a snapshot without it keeps the one its device sent before
        kdf = body.get("kdf")
        if isinstance(kdf, dict) and re.match(r"^[A-Za-z0-9+/=]{16,64}$", str(kdf.get("salt") or "")) and 100000 <= int(kdf.get("iter") or 0) <= 10000000:
            snap["kdf"] = {"salt": str(kdf["salt"]), "iter": int(kdf["iter"]), "name": "PBKDF2-SHA-256"}
        with _CLOUD_LOCK:
            idx = _cloud_index(c)
            mine = [x for x in idx["snaps"] if x.get("device") == dev] + [snap]
            mine.sort(key=lambda x: x.get("got") or 0)
            idx["snaps"] = [x for x in idx["snaps"] if x.get("device") != dev] + mine[-_CLOUD_KEEP:]
            _cloud_index_save(c, idx)
            _cloud_gc(c, idx)
        return h._json(200, {"ok": True, "got": snap["got"]})
    if path == "/ingenium/cloud/forget":
        dev = str(body.get("device") or "")[:64]
        with _CLOUD_LOCK:
            idx = _cloud_index(c)
            idx["snaps"] = [x for x in idx["snaps"] if x.get("device") != dev]
            _cloud_index_save(c, idx)
        return h._json(200, {"ok": True})
    return h._err(404, "not found")


def _share_handler():'''
put("def _share_handler():", FN, 1, "the share handler")
put('''                                        "lends": lend, "models": len(_share_models()) if lend else 0, "callins": True, "api": _LEND_API})''',
    '''                                        "lends": lend, "models": len(_share_models()) if lend else 0, "callins": True, "api": _LEND_API,
                                        "cloud": _CLOUD_API})''', 1, "hello names the Cloud")
put('''            if not self._allowed():
                return
            if path == "/ingenium/callins":''',
    '''            if not self._allowed():
                return
            # 6.57: Ingenium Cloud's box (app_cloud_657.py), whether or not this computer lends its models
            if path == "/ingenium/cloud" or path.startswith("/ingenium/cloud/"):
                return _cloud_get(self, path)
            if path == "/ingenium/callins":''', 1, "the Cloud in GET")
put('''            if not self._allowed():
                return
            # R97: a computer that this one cannot reach calls in, and carries its models over that call''',
    '''            if not self._allowed():
                return
            # 6.57: Ingenium Cloud's box (app_cloud_657.py)
            if path.startswith("/ingenium/cloud/"):
                return _cloud_post(self, path)
            # R97: a computer that this one cannot reach calls in, and carries its models over that call''', 1, "the Cloud in POST")
# the computer that keeps the Cloud runs the gateway and stays awake for it, whether or not it lends its models
put('''    if c.get("on") or c.get("callins"):
        _share_start()
    else:
        _share_stop()
    # only lending keeps the computer awake; a laptop that borrows sleeps as it likes
    _share_keep_awake(bool(c.get("on")) and _SHARE["server"] is not None)''',
    '''    # 6.57 (app_cloud_657.py): and while it keeps the Cloud for her other devices
    if c.get("on") or c.get("callins") or c.get("cloud"):
        _share_start()
    else:
        _share_stop()
    # only lending, or keeping the Cloud, keeps the computer awake; a laptop that borrows sleeps as it likes
    _share_keep_awake((bool(c.get("on")) or bool(c.get("cloud"))) and _SHARE["server"] is not None)''', 1, "the gateway runs for the Cloud")
put('''    return {"ok": True, "on": lend, "running": running, "callins_on": bool(cfg.get("callins")), "port": port,''',
    '''    return {"ok": True, "on": lend, "running": running, "callins_on": bool(cfg.get("callins")), "port": port, "cloud_on": bool(cfg.get("cloud")),''', 1, "the status names the Cloud")
put('''    def share_set(self, on):
        return _share_set(bool(on))
''',
    '''    def share_set(self, on):
        return _share_set(bool(on))

    # 6.57 (app_cloud_657.py): this computer keeps Ingenium Cloud for her other devices (the gateway runs, the computer stays awake)
    def cloud_box_set(self, on):
        c = _share_cfg()
        c["cloud"] = bool(on)
        _share_cfg_save(c)
        _share_apply()
        return _share_status()
''', 2, "the bridge's Cloud switch")
open(p, "w", encoding="utf-8").write(s)
print("app_cloud_657: Ingenium Cloud's box on the gateway")
