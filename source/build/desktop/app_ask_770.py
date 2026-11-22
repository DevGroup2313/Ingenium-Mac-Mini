"""Ingenium 7.70: asking and offering, with Accept (the computer that lends). Held until her word on its pictures.

Her words (22 November 2026): "Currently when one Ingenium (A - Request Sender) sends a request to another Ingenium (B - Request Receiver)
there's no significant visual confirmation that either machine has connected successfully. Pop-up notifications must appear for each
step". Her answers that day: Accept replaces the code, and the code stays as an option ("in case it fails ... nice to have as a bonus
option"); A is told when B accepts, too.

  POST /ingenium/ask {id, kind, name, pub, mode}   no code, while this computer lends. mode "use": a device asks to use this computer's
                                                    models; she accepts or declines here (the pending list of 7.37, marked "ask",
                                                    with the four words). mode "offer": a device accepts this computer's offer of
                                                    its models (share_offer); it pairs at once, since she offered, with the words
                                                    shown on both screens. Only a device that seals may ask; one that cannot types
                                                    the code, as before. At most one waiting ask for each device, six a minute in all.
  GET  /ingenium/ask/state?rid=                     no code: wait, no, or ok with what /ingenium/pair2/state answers
  POST /ingenium/ask/decline {id}                   no code: a device declines this computer's offer; her page is told
  hello: "ask": 1, "offers": the ids of the devices this computer offers its models to now ("*" for any device nearby)
  share_asks(), share_offer(dev_id, on), share_usage(), share_memory()   for this computer's own page
  Usage: each paired device's requests to the models, today and in all, its last use and model, kept over a restart.

    python3 build/desktop/app_ask_770.py <repo>/ingenium_app.py"""
import sys

MARK = "_ask_start"

CODE = r'''

# ---------------------------------------------------------------------------
# 7.70 (app_ask_770.py): asking and offering, with Accept
# ---------------------------------------------------------------------------
_ASK = {"lock": threading.Lock(), "times": [], "offers": {}, "answers": [], "usage": None, "usage_saved": 0}


def _ask_lending():
    try:
        return bool(_SHARE.get("lend")) or bool(_share_cfg().get("on"))
    except Exception:
        return False


def _ask_offers_now():
    """the devices this computer offers its models to now: their ids, or "*" for any device nearby (ten minutes each)"""
    now = time.time()
    with _ASK["lock"]:
        for k in [k for k, v in _ASK["offers"].items() if now - v["at"] > 600]:
            _ASK["offers"].pop(k, None)
        return sorted(_ASK["offers"].keys())


def _ask_answer_note(dev, mode, answer):
    with _ASK["lock"]:
        _ASK["answers"].append({"id": dev.get("id") or "", "name": dev.get("name") or "", "kind": dev.get("kind") or "",
                                "mode": mode, "answer": answer, "at": int(time.time())})
        _ASK["answers"] = _ASK["answers"][-20:]


def _ask_dev(h, body):
    from urllib.parse import quote
    return _share_dev_header(h.headers.get("X-Ingenium-Device")) or _share_dev_header(
        "id=%s;kind=%s;name=%s" % (quote(str(body.get("id") or "")), quote(str(body.get("kind") or "")), quote(str(body.get("name") or ""))))


def _ask_start(h):
    """POST /ingenium/ask: a device asks to use this computer's models, or accepts its offer"""
    if not _seal_lib():
        return h._err(501, "This computer cannot seal yet: update Ingenium on it.")
    if not _ask_lending():
        return h._json(409, {"error": {"message": "%s is not lending its models now. Switch on Lend my models to my devices there." % _share_computer_name(),
                                       "code": 409}, "lends": False})
    try:
        body = json.loads(_seal_body(h, 65536).decode("utf-8") or "{}")
        pub = _seal_b64d(body.get("pub"))
        if len(pub) != 65 or pub[0] != 4:
            raise ValueError("not a P-256 public key")
        from cryptography.hazmat.primitives.asymmetric import ec
        ec.EllipticCurvePublicKey.from_encoded_point(ec.SECP256R1(), pub)
    except Exception:
        return h._err(400, "Only a device that seals can ask without the code. Type the code that the computer shows instead.")
    mode = "offer" if body.get("mode") == "offer" else "use"
    dev = _ask_dev(h, body)
    if not dev:
        return h._err(400, "Name this device first (Ingenium does so by itself).")
    now = time.time()
    with _ASK["lock"]:
        _ASK["times"] = [t for t in _ASK["times"] if now - t < 60]
        if len(_ASK["times"]) >= 6:
            return h._err(429, "Too many requests at once. Wait a minute, then ask again.")
        _ASK["times"].append(now)
    offers = _ask_offers_now()
    if mode == "offer" and dev["id"] not in offers and "*" not in offers:
        return h._json(410, {"error": {"message": "%s no longer offers its models. Ask it instead." % _share_computer_name(), "code": 410}, "state": "gone"})
    import secrets
    rid = secrets.token_urlsafe(12)
    words = _seal_words(_seal_pub(), pub)
    x = {"rid": rid, "dev": dev, "pub": pub, "words": words, "at": now, "state": "wait", "ip": h.client_address[0], "ask": mode}
    with _SEAL["lock"]:
        pend = _SEAL["pending"]
        for k in [k for k, v in pend.items() if now - v["at"] > 600]:
            pend.pop(k, None)
        for k in [k for k, v in pend.items() if v["dev"]["id"] == dev["id"] and v["state"] == "wait"]:
            pend.pop(k, None)      # the same device asking again replaces its earlier ask
        if len(pend) >= 8:
            for k in sorted(pend, key=lambda k: pend[k]["at"])[:len(pend) - 7]:
                pend.pop(k, None)
        pend[rid] = x
    if mode == "offer":            # she offered: it pairs at once, and her page is told
        try:
            _seal_register(x)
            x["state"] = "ok"
        except Exception as e:
            x["state"] = "no"
            return h._err(500, "Pairing did not finish: %s" % e)
        with _ASK["lock"]:
            _ASK["offers"].pop(dev["id"], None)
        _ask_answer_note(dev, "offer", "accepted")
    return h._json(200, {"ok": True, "rid": rid, "pub": base64.b64encode(_seal_pub()).decode("ascii"), "words": words,
                         "computer": _share_computer_name(), "id": _share_id(), "state": x["state"]})


def _ask_state(h):
    """GET /ingenium/ask/state?rid=: as /ingenium/pair2/state, for an ask (no code)"""
    from urllib.parse import urlparse, parse_qs
    rid = (parse_qs(urlparse(h.path).query).get("rid") or [""])[0]
    with _SEAL["lock"]:
        x = _SEAL["pending"].get(rid)
        if not x or not x.get("ask"):
            return h._json(404, {"error": {"message": "That request is no longer waiting. Ask again.", "code": 404}, "state": "gone"})
    return _seal_pair_state(h)


def _ask_decline(h):
    """POST /ingenium/ask/decline: a device declines this computer's offer"""
    try:
        body = json.loads(_seal_body(h, 4096).decode("utf-8") or "{}")
    except Exception:
        body = {}
    dev = _ask_dev(h, body)
    if not dev:
        return h._err(400, "Name this device first (Ingenium does so by itself).")
    with _ASK["lock"]:
        had = dev["id"] in _ASK["offers"] or "*" in _ASK["offers"]
        _ASK["offers"].pop(dev["id"], None)
    if had:
        _ask_answer_note(dev, "offer", "declined")
    return h._json(200, {"ok": True})


def _ask_list():
    """for this computer's page: the asks waiting for her (with the words), and the answers to her offers and asks, each once"""
    with _SEAL["lock"]:
        now = time.time()
        asks = [{"rid": x["rid"], "id": x["dev"].get("id") or "", "name": x["dev"].get("name") or "", "kind": x["dev"].get("kind") or "",
                 "words": list(x["words"]), "seconds": int(now - x["at"])}
                for x in sorted(_SEAL["pending"].values(), key=lambda v: v["at"])
                if x.get("ask") == "use" and x["state"] == "wait" and now - x["at"] < 300]
    with _ASK["lock"]:
        answers, _ASK["answers"] = _ASK["answers"], []
    return {"ok": True, "asks": asks, "answers": answers, "offers": _ask_offers_now(), "lends": _ask_lending()}


def _ask_offer(dev_id, on):
    dev_id = str(dev_id or "")
    if not dev_id or (dev_id != "*" and not re.fullmatch(r"[A-Za-z0-9_.:-]{1,80}", dev_id)):
        return {"ok": False, "error": "Choose a device to offer your models to."}
    if on and not _ask_lending():
        return {"ok": False, "error": "Switch on Lend my models to my devices first."}
    with _ASK["lock"]:
        if on:
            _ASK["offers"][dev_id] = {"at": time.time()}
        else:
            _ASK["offers"].pop(dev_id, None)
    return {"ok": True, "offers": _ask_offers_now()}


# ---- each paired device's use of this computer's models ----
def _ask_usage_load():
    if _ASK["usage"] is None:
        try:
            u = _share_cfg().get("usage")
            _ASK["usage"] = u if isinstance(u, dict) else {}
        except Exception:
            _ASK["usage"] = {}
    return _ASK["usage"]


def _ask_usage_note(dev_id, model, chars=0):
    if not dev_id:
        return
    today = time.strftime("%Y-%m-%d")
    with _ASK["lock"]:
        u = _ask_usage_load()
        r = u.setdefault(str(dev_id)[:80], {"all": 0, "today": 0, "day": today, "last": 0, "model": "", "chars": 0})
        if r.get("day") != today:
            r["day"], r["today"] = today, 0
        r["all"] = int(r.get("all") or 0) + 1
        r["today"] = int(r.get("today") or 0) + 1
        r["last"] = int(time.time())
        r["chars"] = int(r.get("chars") or 0) + int(chars or 0)
        if model:
            r["model"] = str(model)[:120]
        if len(u) > 60:
            for k in sorted(u, key=lambda k: u[k].get("last", 0))[:len(u) - 60]:
                u.pop(k, None)
        due = time.time() - _ASK["usage_saved"] > 30
        if due:
            _ASK["usage_saved"] = time.time()
            snap = json.loads(json.dumps(u))
    if due:
        try:
            c = _share_cfg()
            c["usage"] = snap
            _share_cfg_save(c)
        except Exception:
            pass


def _ask_usage():
    today = time.strftime("%Y-%m-%d")
    with _ASK["lock"]:
        u = json.loads(json.dumps(_ask_usage_load()))
    for r in u.values():
        if r.get("day") != today:
            r["today"] = 0
    names = {}
    try:
        for d in _share_devices_view():
            names[d.get("id")] = d
    except Exception:
        pass
    rows = []
    for k, r in u.items():
        d = names.get(k) or {}
        rows.append({"id": k, "name": d.get("name") or "", "kind": d.get("kind") or "", "today": r.get("today", 0), "all": r.get("all", 0),
                     "last": r.get("last", 0), "model": r.get("model", ""), "chars": r.get("chars", 0)})
    busy, queued = _lend_q_counts()
    return {"ok": True, "devices": sorted(rows, key=lambda r: -r["last"]), "busy": busy, "queued": queued, "lends": _ask_lending()}


# ---- the computer's memory, measured now (for Mentes' meter while it lends) ----
def _ask_memory():
    total = free = None
    try:
        total = _read_device_info().get("ramGB")
    except Exception:
        pass
    try:
        if sys.platform.startswith("win"):
            import ctypes

            class _MS(ctypes.Structure):
                _fields_ = [("dwLength", ctypes.c_ulong), ("dwMemoryLoad", ctypes.c_ulong),
                            ("ullTotalPhys", ctypes.c_ulonglong), ("ullAvailPhys", ctypes.c_ulonglong),
                            ("ullTotalPageFile", ctypes.c_ulonglong), ("ullAvailPageFile", ctypes.c_ulonglong),
                            ("ullTotalVirtual", ctypes.c_ulonglong), ("ullAvailVirtual", ctypes.c_ulonglong),
                            ("ullAvailExtendedVirtual", ctypes.c_ulonglong)]
            ms = _MS()
            ms.dwLength = ctypes.sizeof(_MS)
            ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(ms))
            free = ms.ullAvailPhys / 1073741824.0
            total = total or ms.ullTotalPhys / 1073741824.0
        elif sys.platform.startswith("linux"):
            with open("/proc/meminfo", encoding="utf-8") as fh:
                for line in fh:
                    if line.startswith("MemAvailable:"):
                        free = int(line.split()[1]) / 1048576.0
                    elif line.startswith("MemTotal:") and not total:
                        total = int(line.split()[1]) / 1048576.0
        elif sys.platform == "darwin":
            r = subprocess.run(["vm_stat"], capture_output=True, text=True, timeout=3)
            ps = re.search(r"page size of (\d+) bytes", r.stdout)
            pages = sum(int(re.search(r"Pages %s:\s+(\d+)" % k, r.stdout).group(1)) for k in ("free", "inactive", "speculative"))
            free = pages * (int(ps.group(1)) if ps else 16384) / 1073741824.0
    except Exception:
        free = None
    if not total or free is None:
        return {"ok": False, "lends": _ask_lending()}
    busy, queued = _lend_q_counts()
    return {"ok": True, "total": round(float(total), 2), "used": round(max(0.0, float(total) - free), 2), "free": round(free, 2),
            "busy": busy, "queued": queued, "lends": _ask_lending(), "at": time.time()}
'''


def apply(s):
    if MARK in s:
        return s

    def rep(old, new, n=1, what=""):
        nonlocal s
        c = s.count(old)
        if c != n:
            sys.exit("app_ask_770: %s found %d times, not %d: %r" % (what or "text", c, n, old[:80]))
        s = s.replace(old, new)

    # 1. the code, after sealed pairing's own
    rep('''def _seal_pair_state(h):''', CODE.strip("\n") + '''\n\n\ndef _seal_pair_state(h):''', 1, "_seal_pair_state")
    # 2. hello says it can be asked, and to whom it offers its models now
    rep('''"addresses": _share_addresses_cached(self.server.server_address[1])})
            if not self._allowed():
                return''', '''"addresses": _share_addresses_cached(self.server.server_address[1]),
                                        "ask": 1, "offers": _ask_offers_now()})
            # 7.70 (app_ask_770.py): a device waits for her answer to its ask, without the code
            if path == "/ingenium/ask/state":
                return _ask_state(self)
            if not self._allowed():
                return''', 1, "hello")
    # 3. an ask, and a declined offer, carry no code
    rep('''            if path == "/ingenium/sealed":
                return _seal_serve(self)
''', '''            if path == "/ingenium/sealed":
                return _seal_serve(self)
            # 7.70 (app_ask_770.py): asking (or accepting an offer) and declining an offer, without the code
            if path == "/ingenium/ask":
                return _ask_start(self)
            if path == "/ingenium/ask/decline":
                return _ask_decline(self)
''', 1, "sealed route")
    # 3b. this computer's page knows an ask from a pairing with the code (sealed pairing's own list)
    rep('''"words": list(x["words"]), "seconds": int(now - x["at"])}
                                     for x in sorted(_SEAL["pending"].values(), key=lambda v: v["at"])''', '''"words": list(x["words"]), "seconds": int(now - x["at"]),
                                      "ask": x.get("ask") or "", "id": x["dev"].get("id") or ""}
                                     for x in sorted(_SEAL["pending"].values(), key=lambda v: v["at"])''', 1, "_seal_pending")
    # 4. each device's use of the models, for Mentes (a sealed request runs through this same route, as its device's own)
    rep('''            _share_answer(body, _HandlerSink(self))
    return H''', '''            try:
                _dv = getattr(self, "_seal_dev", None)
                _dv = _dv if isinstance(_dv, dict) else _share_dev_header(self.headers.get("X-Ingenium-Device"))
                _ask_usage_note((_dv or {}).get("id"), body.get("model") if isinstance(body, dict) else "")
            except Exception:
                pass
            _share_answer(body, _HandlerSink(self))
    return H''', 1, "the chat route")
    # 5. for this computer's own page
    rep("    def share_firewall_allow(self):\n        return _share_firewall_allow()\n",
        "    def share_firewall_allow(self):\n        return _share_firewall_allow()\n" + '''
    # 7.70: asking and offering, usage and memory (app_ask_770.py)
    def share_asks(self):
        return _ask_list()

    def share_offer(self, dev_id, on=True):
        return _ask_offer(dev_id, bool(on))

    def share_usage(self):
        return _ask_usage()

    def share_memory(self):
        return _ask_memory()
''', 2, "the page's methods")
    return s


if __name__ == "__main__":
    p = sys.argv[1]
    t = open(p, encoding="utf-8").read()
    out = apply(t)
    if out == t:
        print("already patched", p)
    else:
        open(p, "w", encoding="utf-8").write(out)
        print("patched", p)
