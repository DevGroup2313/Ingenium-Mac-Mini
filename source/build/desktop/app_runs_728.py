"""Ingenium 7.28: Fabrica's runs on her other computers (the computer that runs them, and the computer that keeps a copy).

Her words (14 November 2026), approved on the live preview of Fabrica's phase 3 ("I approve of the Fabrica on Every Device preview,
please commit and push it everywhere", https://claude.ai/artifact/GKVKb3isARMrB1NtBytnTp): her workflows run on her own machines, the
Mac mini and the HP laptop, with every log kept; GitHub's machines only as a backup. The preview's Machines: "Your Mac mini and HP laptop
pair once with the code this computer shows, as your devices do for models (6.81)." Built on 6.81's lending (app_lend_681.py: the code,
a device that names itself, pairing once) and on 7.08's runner (app_runs_708.py: runs_new, runs_put, runs_go, runs_get, runs_log,
runs_file), which run here exactly as they run for this computer's own Fabrica.

  share_runs_set(on)           the switch on the computer that runs them: "Run Fabrica's jobs for my devices". Off until she turns it
                               on; while it is on, the lending server runs (as for lending, the Cloud or call-ins)
  GET  /ingenium/runs/tools    what this computer has for building and testing (runs_tools)
  GET  /ingenium/runs/list     the runs this device sent here
  GET  /ingenium/runs/get      ?rid=      one of them, whole
  GET  /ingenium/runs/log      ?rid=&job=&offset=   a job's log from a byte on
  GET  /ingenium/runs/file     ?rid=&art=&path=&offset=&size=   a part of a file it kept
  POST /ingenium/runs/new      {spec}     a run made ready (never from this computer's own drive: the device sends the files)
  POST /ingenium/runs/put      {rid, path, b64, mode, append}
  POST /ingenium/runs/go       {rid}      /stop {rid}   /forget {rid}
Every request needs the code and a device that names itself (X-Ingenium-Device, 6.81); a device removed here is refused, as for models;
a device reads and steers only the runs it sent. A run says who sent it (its record's "by", and "from <device>, ..." in its why), so the
computer's own Fabrica lists it too.

On the computer that sent it, its copy (every log kept here, as the preview said):
  runs_keep_copy(rec, machine)            the run's record, with where it ran ("remote": the computer's name and id)
  runs_keep_log(rid, job, text, append)   a job's log
  runs_keep_file(rid, art, path, b64, append)   a file it kept

    python3 build/desktop/app_runs_728.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_runs_dev_get" in s:
    print("already patched", p)
    sys.exit(0)
if "_runs_new" not in s or "_share_dev_header" not in s:
    sys.exit("%s: the runner (app_runs_708.py) and the lending of 6.81 (app_lend_681.py) must be applied first" % p)

FN = r'''# ---- 7.28 (Fabrica): runs for her other devices on this computer, and the copy kept on the one that sent them (app_runs_728.py) ----
_RUNS_DEV_MAX = 64 << 20
_RUNS_DEV_OFF = ("Fabrica's runs for your devices are off on this computer. Turn them on there: Settings, Your devices, "
                 "Run Fabrica's jobs for my devices.")


def _runs_dev_on():
    return bool(_share_cfg().get("runs"))


def _runs_dev_who(h):
    dev = _share_dev_header(h.headers.get("X-Ingenium-Device"))
    if not dev:
        h._err(401, "Pair this device with this computer first: type the code it shows, in Settings, Your devices.")
        return None
    return dev


def _runs_dev_mine(rid, dev):
    try:
        r = _runs_read(_runs_safe(rid))
    except Exception:
        return False
    return (r.get("by") or {}).get("id") == dev["id"]


def _runs_dev_q(h):
    from urllib.parse import parse_qs
    q = parse_qs(h.path.split("?", 1)[1] if "?" in h.path else "")
    return lambda k, d="": (q.get(k) or [d])[0]


def _runs_dev_get(h, path):
    if not _runs_dev_on():
        return h._err(403, _RUNS_DEV_OFF)
    dev = _runs_dev_who(h)
    if not dev:
        return
    g = _runs_dev_q(h)
    try:
        if path == "/ingenium/runs/tools":
            return h._json(200, _runs_tools(g("fresh") == "1"))
        if path == "/ingenium/runs/list":
            r = _runs_list()
            r["runs"] = [x for x in r.get("runs") or [] if (x.get("by") or {}).get("id") == dev["id"]]
            return h._json(200, r)
        rid = g("rid")
        if not _runs_dev_mine(rid, dev):
            return h._err(404, "No run sent by this device has that name here.")
        if path == "/ingenium/runs/get":
            return h._json(200, _runs_get(rid))
        if path == "/ingenium/runs/log":
            return h._json(200, _runs_log(rid, g("job"), int(g("offset") or 0)))
        if path == "/ingenium/runs/file":
            return h._json(200, _runs_file(rid, g("art"), g("path"), int(g("offset") or 0), int(g("size") or 4194304)))
    except Exception as e:
        return h._err(500, str(e))
    return h._err(404, "not found")


def _runs_dev_post(h, path):
    if not _runs_dev_on():
        return h._err(403, _RUNS_DEV_OFF)
    dev = _runs_dev_who(h)
    if not dev:
        return
    try:
        n = int(h.headers.get("Content-Length") or 0)
        if n > _RUNS_DEV_MAX:
            return h._err(413, "Too large: a part is sent in pieces of a few megabytes.")
        body = json.loads(h.rfile.read(n).decode("utf-8") or "{}")
        if not isinstance(body, dict):
            raise ValueError("not an object")
    except Exception:
        return h._err(400, "the request was not readable")
    try:
        if path == "/ingenium/runs/new":
            spec = body.get("spec") if isinstance(body.get("spec"), dict) else {}
            spec["disk"] = ""    # never from this computer's own drive: the device sends the app's files
            spec["why"] = ("from %s, " % (dev.get("name") or "another device")) + str(spec.get("why") or "")
            r = _runs_new(spec)
            if r.get("ok"):
                rec = _runs_read(r["id"])
                rec["by"] = {"id": dev["id"], "name": dev.get("name") or "", "kind": dev.get("kind") or ""}
                _runs_write(rec)
                r.pop("src", None)   # this computer's own folders stay its own
            return h._json(200, r)
        rid = str(body.get("rid") or "")
        if not _runs_dev_mine(rid, dev):
            return h._err(404, "No run sent by this device has that name here.")
        if path == "/ingenium/runs/put":
            return h._json(200, _runs_put(rid, body.get("path"), body.get("b64") or "", body.get("mode"), bool(body.get("append"))))
        if path == "/ingenium/runs/go":
            return h._json(200, _runs_go(rid))
        if path == "/ingenium/runs/stop":
            return h._json(200, _runs_stop(rid))
        if path == "/ingenium/runs/forget":
            return h._json(200, _runs_forget(rid))
    except Exception as e:
        return h._err(500, str(e))
    return h._err(404, "not found")


def _share_runs_set(on):
    c = _share_cfg()
    c["runs"] = bool(on)
    _share_cfg_save(c)
    _share_apply()
    return _share_status()


def _runs_keep_copy(rec, machine=None):
    """a run made on another of her computers, kept here too, with where it ran"""
    if not isinstance(rec, dict) or not rec.get("id"):
        return {"ok": False, "error": "no run to keep"}
    m = machine if isinstance(machine, dict) else {}
    rid = _runs_safe(str(rec["id"]))
    d = os.path.join(_runs_dir(), rid)
    f = os.path.join(d, "run.json")
    if os.path.isfile(f):
        try:
            old = _runs_read(rid)
        except Exception:
            old = {}
        if not old.get("remote"):
            rid = rid + "-k"     # a run of this computer's own already has that name
            d = os.path.join(_runs_dir(), rid)
    for sub in ("logs", "files"):
        os.makedirs(os.path.join(d, sub), exist_ok=True)
    keep = dict(rec)
    keep["id"] = rid
    keep["remote"] = {"computer": str(m.get("name") or "")[:80], "id": str(m.get("id") or "")[:80], "kind": str(m.get("kind") or "")[:20],
                      "rid": str(rec["id"])[:80], "kept": time.time()}
    _runs_write(keep)
    return {"ok": True, "id": rid}


def _runs_keep_log(rid, job, text, append=False):
    try:
        f = os.path.join(_runs_dir(), _runs_safe(rid), "logs", _runs_safe(job, 60) + ".log")
        with open(f, "ab" if append else "wb") as fh:
            fh.write(str(text or "").encode("utf-8"))
        return {"ok": True}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _runs_keep_file(rid, art, path, b64, append=False):
    try:
        base = os.path.join(_runs_dir(), _runs_safe(rid), "files", _runs_safe(art, 120))
        os.makedirs(base, exist_ok=True)
        to = _runs_inside(base, path)
        os.makedirs(os.path.dirname(to), exist_ok=True)
        with open(to, "ab" if append else "wb") as fh:
            fh.write(base64.b64decode(b64 or ""))
        return {"ok": True}
    except Exception as e:
        return {"ok": False, "error": str(e)}


'''
rep("\ndef _runs_inside(base, rel):", "\n" + FN + "def _runs_inside(base, rel):")

# the lending server answers runs while the switch is on, as it does for lending, the Cloud and call-ins
rep('''    if c.get("on") or c.get("callins") or c.get("cloud"):''', '''    if c.get("on") or c.get("callins") or c.get("cloud") or c.get("runs"):   # 7.28: or runs for her devices''')
rep('''"cloud_on": bool(cfg.get("cloud")),''', '''"cloud_on": bool(cfg.get("cloud")), "runs_on": bool(cfg.get("runs")),''')
rep('''"cloud": _CLOUD_API, "id": _share_id(),''', '''"cloud": _CLOUD_API, "runs": 1 if _share_cfg().get("runs") else 0, "id": _share_id(),''')
rep('''            if path.startswith("/ingenium/via/"):
                return _callin_via_get(self, path)
''', '''            if path.startswith("/ingenium/via/"):
                return _callin_via_get(self, path)
            # 7.28 (app_runs_728.py): Fabrica's runs for her devices
            if path.startswith("/ingenium/runs/"):
                return _runs_dev_get(self, path)
''')
rep('''            if path.startswith("/ingenium/cloud/"):
                return _cloud_post(self, path)
''', '''            if path.startswith("/ingenium/cloud/"):
                return _cloud_post(self, path)
            # 7.28 (app_runs_728.py): Fabrica's runs for her devices
            if path.startswith("/ingenium/runs/"):
                return _runs_dev_post(self, path)
''')
# a run's row says who sent it
rep('''            row = {k: r.get(k) for k in ("id", "at", "state", "app", "repo", "version", "label", "workflow", "file", "why", "machine", "ended", "started", "n", "event")}''',
    '''            row = {k: r.get(k) for k in ("id", "at", "state", "app", "repo", "version", "label", "workflow", "file", "why", "machine", "ended", "started", "n", "event", "by", "remote")}''')
# the functions the page calls, in both of the app's windows
rep('''    def share_renew_code(self):''', '''    def share_runs_set(self, on):
        return _share_runs_set(bool(on))

    def runs_keep_copy(self, rec, machine=None):
        return _runs_keep_copy(rec, machine)

    def runs_keep_log(self, rid, job, text, append=False):
        return _runs_keep_log(rid, job, text, append)

    def runs_keep_file(self, rid, art, path, b64, append=False):
        return _runs_keep_file(rid, art, path, b64, append)

    def share_renew_code(self):''', 2)

open(p, "w", encoding="utf-8").write(s)
print("patched", p)
