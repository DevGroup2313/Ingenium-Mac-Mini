"""Ingenium 6.81: sharing models between her devices, made simple (the computer that lends).

The owner's words (9 November 2026): "I think that the process of sharing models between my devices is really convulated and not always
straightforward. I want that process to be streamlined and simplified. I want it to be easy to do and for it to work everytime and with
no issues, please make the fix"; on its preview (11 November 2026): "I approve of this design ... please push this everywhere", and
"please include the mac mini, the iPad, the iPhone and Fire Tablet as well and any other devices that I may purchase in the future".

Measured on 6.79: a device reached the lending computer at the one address typed by hand (a new address from the router broke it),
said nothing about itself, and the computer could only list the network addresses that had used it lately. Now:
  - /ingenium/hello also says the computer's own id (kept in share.json), what kind of computer it is (a laptop, a desktop, or a
    computer without a screen of its own, such as a Mac mini) and every address it can be reached at, so a device keeps them all and
    tries the next one by itself, and the search (_share_find) carries them too;
  - a device names itself in each request (X-Ingenium-Device: id, kind, name), and POST /ingenium/pair, with the code, pairs it once;
    the computer lists its devices by name and kind (share_status "devices"), and keeps them over a restart;
  - share_device_remove(id) removes a device: its requests are refused (401, "removed") until it pairs again with the code, typed by
    hand on that device; "Make a new code" stays the way to lock every device out;
  - share_status also says the computer's id and kind, and the names of the models it lends.

    python3 build/desktop/app_lend_681.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_share_pair" in s:
    print("already patched", p)
    sys.exit(0)

# a device may name itself in a header the browser would otherwise not send
rep('''            self.send_header("Access-Control-Allow-Headers", "Authorization, Content-Type")''',
    '''            self.send_header("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Ingenium-Device")''')

# the code check: the device that asks is known by its name; a removed device is refused until it pairs again
rep('''        def _allowed(self):
            ip = self.client_address[0]''', '''        def _allowed(self, pairing=False):
            ip = self.client_address[0]''')
rep('''            with _SHARE_LOCK:
                _SHARE["last"][ip] = now
            return True''', '''            with _SHARE_LOCK:
                _SHARE["last"][ip] = now
            # 6.81 (app_lend_681.py): the device names itself; one removed here must pair again, with the code
            dev = _share_dev_header(self.headers.get("X-Ingenium-Device"))
            if dev:
                if not pairing and dev["id"] in _share_removed():
                    self._json(401, {"error": {"message": "This device was removed on the lending computer. Type its code again to pair.",
                                               "code": 401, "removed": True}})
                    return False
                _share_dev_seen(dev, ip)
            return True''')

# hello: the computer's id, its kind and every address it can be reached at
rep('''                return self._json(200, {"app": "Ingenium", "name": APP_NAME, "computer": _share_computer_name(), "needs_code": True,
                                        "lends": lend, "models": len(_share_models()) if lend else 0, "callins": True, "api": _LEND_API,
                                        "cloud": _CLOUD_API})''', '''                return self._json(200, {"app": "Ingenium", "name": APP_NAME, "computer": _share_computer_name(), "needs_code": True,
                                        "lends": lend, "models": len(_share_models()) if lend else 0, "callins": True, "api": _LEND_API,
                                        "cloud": _CLOUD_API, "id": _share_id(), "kind": _share_kind(), "pair": 1,
                                        "addresses": _share_addresses_cached(self.server.server_address[1])})''')

# pairing, once, with the code
rep('''        def do_POST(self):
            path = self.path.split("?", 1)[0].rstrip("/")
            if not self._allowed():
                return
''', '''        def do_POST(self):
            path = self.path.split("?", 1)[0].rstrip("/")
            if not self._allowed(pairing=(path == "/ingenium/pair")):
                return
            # 6.81 (app_lend_681.py): a device pairs once with the code, and is known by its name from then on
            if path == "/ingenium/pair":
                return _share_pair(self)
''')

# the search carries what hello says now
rep('''                        hits.append({"address": "%s:%d" % (ip, port), "computer": h.get("computer") or "",
                                     "models": h.get("models") or 0, "lends": bool(h.get("lends", True)),
                                     "callins": bool(h.get("callins"))})''', '''                        hits.append({"address": "%s:%d" % (ip, port), "computer": h.get("computer") or "",
                                     "models": h.get("models") or 0, "lends": bool(h.get("lends", True)),
                                     "callins": bool(h.get("callins")), "id": str(h.get("id") or ""),
                                     "kind": str(h.get("kind") or ""), "addresses": list(h.get("addresses") or [])[:8]})''')

# the status: the computer's id and kind, its devices, the names of the models it lends
rep('''            "queued": queued, "options": _lend_options_view()}''', '''            "queued": queued, "options": _lend_options_view(),
            "id": _share_id(), "kind": _share_kind(), "devices": _share_devices_view(),
            "model_names": [m["name"] for m in _share_models()] if lend else []}''')

rep('''def _share_status():
''', r'''# ---------------------------------------------------------------------------
# 6.81 (app_lend_681.py): the computer's id and kind, its devices by name, pairing once, removing a device.
# ---------------------------------------------------------------------------
_SHARE_DEV_RE = re.compile(r"^[A-Za-z0-9_-]{6,40}$")
_SHARE_KINDS = ("laptop", "desktop", "box", "tablet", "phone", "browser")
_SHARE_KIND = [None]
_SHARE_ADDR = {"at": 0.0, "port": None, "list": []}


def _share_id():
    """A lasting id for this computer, so a device knows it again at any address."""
    c = _share_cfg()
    i = str(c.get("id") or "")
    if not re.fullmatch(r"[a-f0-9]{12}", i):
        import secrets
        i = secrets.token_hex(6)
        c["id"] = i
        _share_cfg_save(c)
    return i


def _share_kind():
    """What kind of computer this is, for the icon a device shows: a laptop, a desktop with its own screen (iMac), or a computer
    without one (Mac mini, Mac Studio, Mac Pro: "box"). On a Mac, by its model name, else by its battery; on Windows, by its battery."""
    if _SHARE_KIND[0]:
        return _SHARE_KIND[0]
    kind = "laptop"
    try:
        if sys.platform == "darwin":
            name = ""
            try:
                r = subprocess.run(["system_profiler", "SPHardwareDataType"], capture_output=True, text=True, timeout=8)
                m = re.search(r"Model Name:\s*(.+)", r.stdout or "")
                name = (m.group(1).strip() if m else "").lower()
            except Exception:
                name = ""
            if name.startswith("macbook"):
                kind = "laptop"
            elif name.startswith("imac"):
                kind = "desktop"
            elif name.startswith("mac"):
                kind = "box"
            else:
                r = subprocess.run(["pmset", "-g", "batt"], capture_output=True, text=True, timeout=5)
                kind = "laptop" if "InternalBattery" in (r.stdout or "") else "box"
        elif sys.platform.startswith("win"):
            import ctypes

            class _PS(ctypes.Structure):
                _fields_ = [("ACLineStatus", ctypes.c_ubyte), ("BatteryFlag", ctypes.c_ubyte), ("BatteryLifePercent", ctypes.c_ubyte),
                            ("SystemStatusFlag", ctypes.c_ubyte), ("BatteryLifeTime", ctypes.c_ulong), ("BatteryFullLifeTime", ctypes.c_ulong)]
            ps = _PS()
            if ctypes.windll.kernel32.GetSystemPowerStatus(ctypes.byref(ps)):
                kind = "desktop" if ps.BatteryFlag == 128 else "laptop"     # 128: no system battery
    except Exception:
        pass
    _SHARE_KIND[0] = kind
    return kind


def _share_addresses_cached(port):
    """Every address the computer can be reached at, worked out at most every thirty seconds (hello is asked often)."""
    now = time.time()
    if _SHARE_ADDR["port"] == port and now - _SHARE_ADDR["at"] < 30 and _SHARE_ADDR["list"]:
        return list(_SHARE_ADDR["list"])
    lst = _share_addresses(port)
    _SHARE_ADDR.update(at=now, port=port, list=list(lst))
    return lst


def _share_dev_header(v):
    """Who is asking: X-Ingenium-Device: id=...;kind=...;name=... (each part percent-encoded)."""
    if not v:
        return None
    from urllib.parse import unquote
    d = {}
    for part in str(v).split(";")[:6]:
        if "=" in part:
            k, x = part.split("=", 1)
            d[k.strip().lower()] = unquote(x.strip())[:60]
    i = d.get("id", "")
    if not _SHARE_DEV_RE.match(i):
        return None
    kind = d.get("kind", "")
    return {"id": i, "kind": kind if kind in _SHARE_KINDS else "", "name": re.sub(r"[\x00-\x1f<>]", "", d.get("name", ""))[:40].strip()}


def _share_removed():
    c = _share_cfg()
    return set(x for x in (c.get("removed") or []) if isinstance(x, str))


def _share_dev_seen(dev, ip):
    now = time.time()
    with _SHARE_LOCK:
        devs = _SHARE.setdefault("devices", {})
        old = devs.get(dev["id"]) or {}
        keep = (not old) or now - old.get("saved", 0) > 600 or (dev["name"] and old.get("name") != dev["name"])
        devs[dev["id"]] = {"name": dev["name"] or old.get("name", ""), "kind": dev["kind"] or old.get("kind", ""), "address": ip,
                           "last": now, "saved": now if keep else old.get("saved", 0)}
        row = dict(devs[dev["id"]])
    if keep:      # a new device, a new name, or ten minutes on: remembered over a restart
        c = _share_cfg()
        known = c.get("devices") if isinstance(c.get("devices"), dict) else {}
        known[dev["id"]] = {"name": row["name"], "kind": row["kind"], "last": int(row["last"])}
        if len(known) > 40:
            for k in sorted(known, key=lambda k: known[k].get("last", 0))[:len(known) - 40]:
                known.pop(k, None)
        c["devices"] = known
        _share_cfg_save(c)


def _share_devices_view():
    now = time.time()
    c = _share_cfg()
    known = c.get("devices") if isinstance(c.get("devices"), dict) else {}
    removed = _share_removed()
    out = {}
    for i, d in known.items():
        if i not in removed and isinstance(d, dict):
            out[i] = {"id": i, "name": d.get("name") or "", "kind": d.get("kind") or "", "last": d.get("last") or 0, "address": ""}
    with _SHARE_LOCK:
        for i, d in (_SHARE.get("devices") or {}).items():
            if i not in removed:
                out[i] = {"id": i, "name": d.get("name") or "", "kind": d.get("kind") or "", "last": d.get("last") or 0,
                          "address": d.get("address") or ""}
    lst = sorted(out.values(), key=lambda d: -(d["last"] or 0))[:20]
    for d in lst:
        d["minutes_ago"] = int(max(0, now - (d["last"] or now)) // 60)
        d["last"] = int(d["last"] or 0)
    return lst


def _share_device_remove(dev_id):
    dev_id = str(dev_id or "")
    if _SHARE_DEV_RE.match(dev_id):
        c = _share_cfg()
        r = [x for x in (c.get("removed") or []) if isinstance(x, str) and x != dev_id] + [dev_id]
        c["removed"] = r[-200:]
        known = c.get("devices") if isinstance(c.get("devices"), dict) else {}
        known.pop(dev_id, None)
        c["devices"] = known
        _share_cfg_save(c)
        with _SHARE_LOCK:
            (_SHARE.get("devices") or {}).pop(dev_id, None)
    return _share_status()


def _share_pair(h):
    """POST /ingenium/pair, with the code: the device is known by its name (and no longer removed); the answer says what a device
    keeps of this computer: its id, name, kind, every address, and the models it lends."""
    try:
        n = int(h.headers.get("Content-Length") or 0)
        body = json.loads(h.rfile.read(min(n, 65536)).decode("utf-8") or "{}")
        if not isinstance(body, dict):
            body = {}
    except Exception:
        body = {}
    from urllib.parse import quote
    dev = _share_dev_header(h.headers.get("X-Ingenium-Device")) or _share_dev_header(
        "id=%s;kind=%s;name=%s" % (quote(str(body.get("id") or "")), quote(str(body.get("kind") or "")), quote(str(body.get("name") or ""))))
    if dev:
        c = _share_cfg()
        was = [x for x in (c.get("removed") or []) if isinstance(x, str)]
        if dev["id"] in was:
            c["removed"] = [x for x in was if x != dev["id"]]
            _share_cfg_save(c)
        _share_dev_seen(dev, h.client_address[0])
    lend = bool(_SHARE.get("lend"))
    return h._json(200, {"ok": True, "app": "Ingenium", "id": _share_id(), "computer": _share_computer_name(), "kind": _share_kind(),
                         "addresses": _share_addresses_cached(h.server.server_address[1]), "lends": lend,
                         "models": [m["name"] for m in _share_models()] if lend else []})


def _share_status():
''')

# the page removes a device through both windows' bridges
rep('''    def share_find(self):
        return _share_find()
''', '''    def share_find(self):
        return _share_find()

    # 6.81: a device removed from those using this computer's models (app_lend_681.py)
    def share_device_remove(self, dev_id):
        return _share_device_remove(dev_id)
''', 2)

open(p, "w", encoding="utf-8").write(s)
print("patched", p)
