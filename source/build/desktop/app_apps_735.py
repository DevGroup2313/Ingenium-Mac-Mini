"""Ingenium 7.35: her apps on her iPhone and iPad, from this computer (served for the Home Screen, and sent to her paired devices).

Her request (16 November 2026): iPhone and iPad "all four ways" (inside Ingenium; a Home Screen web app; an IPA with a free Apple ID; an
IPA with a paid developer account). Her answers (17 November 2026): the Home Screen app "Mac first, GitHub backup"; inside Ingenium
"Both" (paired devices, and a file). Her word on the live preview (18 November 2026, https://claude.ai/artifact/HMXfpBF7MfUwg9Q8Z2yNRP):
"I approve of the preview, please just add some colours to the buttons ... Please commit and push it everywhere".

Built on the lending server of 6.81 (app_lend_681.py: the code, a device that names itself, pairing once), which runs while anything
is served or waiting here, as it does for lending, the Cloud, call-ins and runs.

The Home Screen app, served from this computer (Ingenium/apps/served/<name>/, beside Ingenium/runs):
  apps_serve(slug, name, files)   files: [{path, b64}], the web app's own files (its page, manifest, worker and icons); replaces what
                                  was served under that name; returns its addresses (this computer's .local name first, then its address)
  apps_unserve(slug)              stops serving it
  apps_served()                   what is served, with its addresses
  GET /apps/<name>/<path>         the files, to any browser on the home network, without the code: Safari on the iPhone opens it and
                                  adds it to the Home Screen. Only what she chose to serve is there; nothing else of Ingenium's is read.

Sent to her paired devices (Ingenium/apps/outbox/):
  apps_send(slug, name, version, b64, to)   the app's one page, for the devices named in to (their ids; empty for every paired device)
  apps_outbox()                    what waits, and which device has taken it
  apps_unsend(id)                  takes it back
  GET  /ingenium/apps/outbox       what waits for the asking device (the code and a device that names itself, as for models)
  GET  /ingenium/apps/get?id=      one of them, whole
  POST /ingenium/apps/got  {id}    the device has kept it

    python3 build/desktop/app_apps_735.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_apps_serve" in s:
    print("already patched", p)
    sys.exit(0)
if "_runs_dev_get" not in s or "_share_dev_header" not in s:
    sys.exit("%s: the lending of 6.81 (app_lend_681.py) and the runs of 7.28 (app_runs_728.py) must be applied first" % p)

FN = r'''# ---- 7.35 (Fabrica): her apps on her iPhone and iPad, served for the Home Screen and sent to her paired devices (app_apps_735.py) ----
_APPS_MAX = 64 << 20
_APPS_SLUG = re.compile(r"^[a-z0-9][a-z0-9-]{0,60}$")
_APPS_ID = re.compile(r"^[a-z0-9][a-z0-9-]{0,60}-[0-9]{6,16}$")
_APPS_TYPES = {".html": "text/html; charset=utf-8", ".htm": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
               ".mjs": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json",
               ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
               ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".ico": "image/x-icon", ".woff2": "font/woff2",
               ".woff": "font/woff", ".ttf": "font/ttf", ".txt": "text/plain; charset=utf-8", ".wasm": "application/wasm",
               ".mp3": "audio/mpeg", ".mp4": "video/mp4", ".pdf": "application/pdf", ".xml": "application/xml"}


def _apps_dir(sub):
    d = storage_dir()
    if not d:
        raise RuntimeError("this computer gives Ingenium no folder of its own to keep the apps in")
    r = os.path.join(os.path.dirname(d), "apps", sub)   # beside the window's own storage: Ingenium/apps/served, Ingenium/apps/outbox
    os.makedirs(r, exist_ok=True)
    return r


def _apps_slug(slug):
    x = re.sub(r"[^a-z0-9-]+", "-", str(slug or "").lower()).strip("-")[:60]
    if not _APPS_SLUG.match(x or ""):
        raise ValueError("that is not a name an app can be served under")
    return x


def _apps_inside(base, rel):
    rel = str(rel or "").replace("\\", "/").lstrip("/")
    if not rel or any(part in ("", ".", "..") for part in rel.split("/")):
        raise ValueError("a file's path is not one this computer keeps: %r" % rel[:80])
    to = os.path.realpath(os.path.join(base, *rel.split("/")))
    if not to.startswith(os.path.realpath(base) + os.sep):
        raise ValueError("a file's path leaves its folder")
    return to


def _apps_busy():
    """anything served or waiting keeps the lending server running"""
    try:
        if any(os.path.isdir(os.path.join(_apps_dir("served"), x)) for x in os.listdir(_apps_dir("served"))):
            return True
        return any(f.endswith(".json") for f in os.listdir(_apps_dir("outbox")))
    except Exception:
        return False


def _apps_apply():
    c = _share_cfg()
    want = _apps_busy()
    if bool(c.get("apps")) != want:
        c["apps"] = want
        _share_cfg_save(c)
    _share_apply()


def _apps_urls(slug):
    port = _SHARE.get("port")
    if not port:
        return []
    return ["http://%s/apps/%s/" % (a, slug) for a in _share_addresses(port)]


def _apps_serve(slug, name, files):
    try:
        slug = _apps_slug(slug)
        if not isinstance(files, list) or not files:
            return {"ok": False, "error": "there are no files to serve"}
        base = _apps_dir("served")
        tmp = os.path.join(base, "." + slug + ".part")
        if os.path.isdir(tmp):
            shutil.rmtree(tmp, ignore_errors=True)
        os.makedirs(tmp)
        total = 0
        for f in files[:4000]:
            raw = base64.b64decode(str((f or {}).get("b64") or ""))
            total += len(raw)
            if total > _APPS_MAX:
                shutil.rmtree(tmp, ignore_errors=True)
                return {"ok": False, "error": "the app is larger than this computer serves (64 MB)"}
            to = _apps_inside(tmp, (f or {}).get("path"))
            os.makedirs(os.path.dirname(to), exist_ok=True)
            with open(to, "wb") as fh:
                fh.write(raw)
        with open(os.path.join(tmp, ".ingenium-app.json"), "w", encoding="utf-8") as fh:
            json.dump({"name": str(name or slug)[:80], "at": int(time.time()), "files": len(files), "bytes": total}, fh)
        dest = os.path.join(base, slug)
        old = None
        if os.path.isdir(dest):
            old = os.path.join(base, "." + slug + ".old")
            shutil.rmtree(old, ignore_errors=True)
            os.replace(dest, old)
        os.replace(tmp, dest)
        if old:
            shutil.rmtree(old, ignore_errors=True)
        _apps_apply()
        return {"ok": True, "slug": slug, "urls": _apps_urls(slug), "running": _SHARE.get("port") is not None, "error": _SHARE.get("error") or ""}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _apps_unserve(slug):
    try:
        slug = _apps_slug(slug)
        d = os.path.join(_apps_dir("served"), slug)
        if os.path.isdir(d):
            shutil.rmtree(d, ignore_errors=True)
        _apps_apply()
        return {"ok": True}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _apps_served():
    out = []
    try:
        base = _apps_dir("served")
        for x in sorted(os.listdir(base)):
            d = os.path.join(base, x)
            if x.startswith(".") or not os.path.isdir(d):
                continue
            try:
                with open(os.path.join(d, ".ingenium-app.json"), encoding="utf-8") as fh:
                    meta = json.load(fh)
            except Exception:
                meta = {}
            out.append({"slug": x, "name": meta.get("name") or x, "at": meta.get("at") or 0, "files": meta.get("files") or 0,
                        "bytes": meta.get("bytes") or 0, "urls": _apps_urls(x)})
    except Exception:
        pass
    return {"ok": True, "apps": out, "running": _SHARE.get("port") is not None}


def _apps_send(slug, name, version, b64, to=None):
    try:
        slug = _apps_slug(slug)
        raw = base64.b64decode(str(b64 or ""))
        if not raw:
            return {"ok": False, "error": "there is no page to send"}
        if len(raw) > _APPS_MAX:
            return {"ok": False, "error": "the app is larger than this computer sends (64 MB)"}
        base = _apps_dir("outbox")
        for f in os.listdir(base):      # what waited for the same app before is replaced by this one
            if f.startswith(slug + "-") and _APPS_ID.match(f.rsplit(".", 1)[0]):
                try:
                    os.remove(os.path.join(base, f))
                except Exception:
                    pass
        aid = "%s-%d" % (slug, int(time.time() * 1000))
        with open(os.path.join(base, aid + ".html"), "wb") as fh:
            fh.write(raw)
        rec = {"id": aid, "slug": slug, "name": str(name or slug)[:80], "version": str(version or "")[:40], "bytes": len(raw),
               "to": [str(x)[:64] for x in (to or []) if isinstance(x, str)][:20], "at": int(time.time()), "got": {},
               "computer": _share_computer_name()}
        with open(os.path.join(base, aid + ".json"), "w", encoding="utf-8") as fh:
            json.dump(rec, fh)
        _apps_apply()
        return {"ok": True, "id": aid, "running": _SHARE.get("port") is not None, "error": _SHARE.get("error") or ""}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _apps_read(aid):
    if not _APPS_ID.match(str(aid or "")):
        raise ValueError("no such app is waiting")
    with open(os.path.join(_apps_dir("outbox"), aid + ".json"), encoding="utf-8") as fh:
        return json.load(fh)


def _apps_outbox():
    out = []
    try:
        base = _apps_dir("outbox")
        for f in sorted(os.listdir(base)):
            if f.endswith(".json"):
                try:
                    out.append(_apps_read(f[:-5]))
                except Exception:
                    pass
    except Exception:
        pass
    return {"ok": True, "apps": out, "devices": _share_devices_view(), "running": _SHARE.get("port") is not None}


def _apps_unsend(aid):
    try:
        if not _APPS_ID.match(str(aid or "")):
            return {"ok": False, "error": "no such app is waiting"}
        for ext in (".json", ".html"):
            f = os.path.join(_apps_dir("outbox"), aid + ext)
            if os.path.exists(f):
                os.remove(f)
        _apps_apply()
        return {"ok": True}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _apps_for(rec, dev):
    return (not rec.get("to")) or (dev and dev["id"] in rec.get("to"))


def _apps_public(h, raw_path):
    """GET /apps/<name>/<path>: what she chose to serve, to any browser on the home network (Safari adds it to the Home Screen)"""
    from urllib.parse import unquote
    rel = unquote(raw_path.split("?", 1)[0])[len("/apps/"):]
    slug, _, rest = rel.partition("/")
    try:
        slug = _apps_slug(slug)
    except Exception:
        return h._err(404, "not found")
    base = os.path.join(_apps_dir("served"), slug)
    if not os.path.isdir(base):
        return h._err(404, "This app is not served from this computer now.")
    if not _ and not rest:                  # /apps/<name> without its slash: the page's own links need it
        h.send_response(301)
        h.send_header("Location", "/apps/%s/" % slug)
        h.send_header("Content-Length", "0")
        h.end_headers()
        return
    if not rest or rest.endswith("/"):
        rest = rest + "index.html"
    try:
        f = _apps_inside(base, rest)
    except Exception:
        return h._err(404, "not found")
    if os.path.basename(f).startswith(".ingenium") or not os.path.isfile(f):
        return h._err(404, "not found")
    with open(f, "rb") as fh:
        data = fh.read()
    h.send_response(200)
    h.send_header("Content-Type", _APPS_TYPES.get(os.path.splitext(f)[1].lower(), "application/octet-stream"))
    h.send_header("Content-Length", str(len(data)))
    h.send_header("Cache-Control", "no-cache")
    h.send_header("X-Content-Type-Options", "nosniff")
    h.end_headers()
    h.wfile.write(data)


def _apps_dev_get(h, path):
    dev = _share_dev_header(h.headers.get("X-Ingenium-Device"))
    if not dev:
        return h._err(400, "Name this device first (Ingenium does so by itself).")
    if path == "/ingenium/apps/outbox":
        rows = []
        for rec in _apps_outbox()["apps"]:
            if _apps_for(rec, dev) and dev["id"] not in (rec.get("got") or {}):
                rows.append({k: rec.get(k) for k in ("id", "slug", "name", "version", "bytes", "at", "computer")})
        return h._json(200, {"ok": True, "apps": rows})
    if path == "/ingenium/apps/get":
        from urllib.parse import urlparse, parse_qs
        q = parse_qs(urlparse(h.path).query)
        aid = (q.get("id") or [""])[0]
        try:
            rec = _apps_read(aid)
        except Exception:
            return h._err(404, "That app is no longer waiting here.")
        if not _apps_for(rec, dev):
            return h._err(404, "That app is no longer waiting here.")
        with open(os.path.join(_apps_dir("outbox"), aid + ".html"), "rb") as fh:
            data = fh.read()
        return h._json(200, {"ok": True, "id": aid, "slug": rec.get("slug"), "name": rec.get("name"), "version": rec.get("version"),
                             "b64": base64.b64encode(data).decode("ascii")})
    return h._err(404, "not found")


def _apps_dev_post(h, path):
    dev = _share_dev_header(h.headers.get("X-Ingenium-Device"))
    if not dev:
        return h._err(400, "Name this device first (Ingenium does so by itself).")
    try:
        n = int(h.headers.get("Content-Length") or 0)
        body = json.loads(h.rfile.read(n).decode("utf-8") or "{}") if 0 < n < 65536 else {}
    except Exception:
        body = {}
    if path == "/ingenium/apps/got":
        aid = str(body.get("id") or "")
        try:
            rec = _apps_read(aid)
        except Exception:
            return h._err(404, "That app is no longer waiting here.")
        rec.setdefault("got", {})[dev["id"]] = {"at": int(time.time()), "name": dev.get("name") or ""}
        with open(os.path.join(_apps_dir("outbox"), aid + ".json"), "w", encoding="utf-8") as fh:
            json.dump(rec, fh)
        return h._json(200, {"ok": True})
    return h._err(404, "not found")


'''
rep("\ndef _runs_dev_on():", "\n" + FN + "def _runs_dev_on():")

# the lending server runs while anything is served or waiting, as for lending, the Cloud, call-ins and runs
rep('''    if c.get("on") or c.get("callins") or c.get("cloud") or c.get("runs"):   # 7.28: or runs for her devices''',
    '''    if c.get("on") or c.get("callins") or c.get("cloud") or c.get("runs") or c.get("apps"):   # 7.28: or runs; 7.35: or her apps''')
rep('''"cloud": _CLOUD_API, "runs": 1 if _share_cfg().get("runs") else 0, "id": _share_id(),''',
    '''"cloud": _CLOUD_API, "runs": 1 if _share_cfg().get("runs") else 0, "apps": 1, "id": _share_id(),''')
rep('''"cloud_on": bool(cfg.get("cloud")), "runs_on": bool(cfg.get("runs")),''',
    '''"cloud_on": bool(cfg.get("cloud")), "runs_on": bool(cfg.get("runs")), "apps_on": bool(cfg.get("apps")),''')
# the served apps answer any browser on the home network, before the code is asked for
rep('''        def do_GET(self):
            path = self.path.split("?", 1)[0].rstrip("/")
            if path == "/ingenium/hello":''', '''        def do_GET(self):
            path = self.path.split("?", 1)[0].rstrip("/")
            # 7.35 (app_apps_735.py): an app she chose to serve, for Safari's Add to Home Screen (no code: nothing else is read)
            if self.path.startswith("/apps/"):
                return _apps_public(self, self.path)
            if path == "/ingenium/hello":''')
rep('''            # 7.28 (app_runs_728.py): Fabrica's runs for her devices
            if path.startswith("/ingenium/runs/"):
                return _runs_dev_get(self, path)
''', '''            # 7.28 (app_runs_728.py): Fabrica's runs for her devices
            if path.startswith("/ingenium/runs/"):
                return _runs_dev_get(self, path)
            # 7.35 (app_apps_735.py): her apps, sent to her devices
            if path.startswith("/ingenium/apps/"):
                return _apps_dev_get(self, path)
''')
rep('''            # 7.28 (app_runs_728.py): Fabrica's runs for her devices
            if path.startswith("/ingenium/runs/"):
                return _runs_dev_post(self, path)
''', '''            # 7.28 (app_runs_728.py): Fabrica's runs for her devices
            if path.startswith("/ingenium/runs/"):
                return _runs_dev_post(self, path)
            # 7.35 (app_apps_735.py): a device has kept an app sent to it
            if path.startswith("/ingenium/apps/"):
                return _apps_dev_post(self, path)
''')
# the functions the page calls, in both of the app's windows
rep('''    def share_runs_set(self, on):
        return _share_runs_set(bool(on))
''', '''    def share_runs_set(self, on):
        return _share_runs_set(bool(on))

    # 7.35 (app_apps_735.py): her apps on her iPhone and iPad, from this computer
    def apps_serve(self, slug, name, files):
        return _apps_serve(slug, name, files)

    def apps_unserve(self, slug):
        return _apps_unserve(slug)

    def apps_served(self):
        return _apps_served()

    def apps_send(self, slug, name, version, b64, to=None):
        return _apps_send(slug, name, version, b64, to)

    def apps_outbox(self):
        return _apps_outbox()

    def apps_unsend(self, aid):
        return _apps_unsend(aid)
''', 2)
if "\nimport shutil" not in s and "import shutil" not in s.split("\n_APPS_MAX", 1)[0]:
    sys.exit("%s: shutil is not imported where the app's functions are" % p)

open(p, "w", encoding="utf-8").write(s)
print("patched", p)
