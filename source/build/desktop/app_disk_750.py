"""Ingenium 7.50: sealed on the computer's disk, the second stage's first part (Security, the computer's disk; the approved preview,
source/previews/security).

Her answer (18 November 2026) for the computer's disk: "All of them" sealed. Her word (20 November 2026): "I approve of everything, please
commit and push it everywhere and continue working on my requests."

Found on 7.49 by rig/t_736_leak_hunt.js (a real computer app, protection on, a mark written into everything she makes, every file read
raw): an app waiting for her devices was sealed, but the small record beside it (Ingenium/apps/outbox/<id>.json: its name, version, size
and devices) was plain, and its file name began with the app's short name; a run's record (its name, its steps and their commands, the
values each step was given) stayed plain after the run ended, so that the lists show; and a run the app's closing cut short kept the
state "running" in its record, so nothing of it was ever sealed.

Now, while the key is held:
  - an app sent to her devices is kept under a name that says nothing (a, ten random hexadecimal digits, a dash, the time), its record
    sealed with its page; one kept before under its short name takes such a name when the sweep seals it. A device asking while the
    computer is locked is told so (423), never that nothing is waiting.
  - a run's record is sealed when the run has ended (as its logs and files are); a run whose app closed while it ran counts as ended.
    While it runs, its record stays plain: the run writes it at every step, and a run goes on when Ingenium locks.
  - texts for training: a text handed over and left unused for a quarter of an hour (Ingenium/models/training-in/incoming.txt) is sealed,
    and so are the text and the plan of a training the app's closing cut short (models/training/<id>/text.txt, plan.json). A training
    and a measurement read their text plain while they run, as a run does; the trained models are model files, readable on purpose.

    python3 build/desktop/app_disk_750.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_disk_more_750" in s:
    print("already patched", p)
    sys.exit(0)
if "_disk_key_hold" not in s or "_train_resume" not in s or "_perplexity_start" not in s:
    sys.exit("%s: app_disk_749.py and the training's patches must be applied first" % p)

FN = r'''
# ---- 7.50 (app_disk_750.py): sealed on the computer's disk, the second stage's first part ----
_DISK_ENDED = ("ok", "bad", "stopped", "skipped")
_DISK_QUIET = 900                 # a text handed over for training and left for a quarter of an hour is sealed
_DISK_ASK = threading.local()     # set while a paired device's request is answered
_APPS_DARK = re.compile(r"^a[0-9a-f]{10}-[0-9]{6,16}$")


class _DiskLockedAsk(BaseException):
    """raised through the device handlers' own `except Exception`, so the device is told 423"""
    pass


def _disk_more_750():
    return True


def _disk_json(path):
    return json.loads(_disk_read(path).decode("utf-8"))


# -- the apps waiting for her devices: each record sealed with its page, under a name that says nothing
def _apps_new_id():
    return "a%s-%d" % (os.urandom(5).hex(), int(time.time() * 1000))


def _apps_read(aid):
    if not _APPS_ID.match(str(aid or "")):
        raise ValueError("no such app is waiting")
    return _disk_json(os.path.join(_apps_dir("outbox"), aid + ".json"))


def _apps_write_rec(rec):
    _disk_seal_write(os.path.join(_apps_dir("outbox"), rec["id"] + ".json"), json.dumps(rec).encode("utf-8"), True)


def _apps_outbox():
    out, locked = [], 0
    try:
        base = _apps_dir("outbox")
        for f in sorted(os.listdir(base)):
            if f.endswith(".json"):
                try:
                    out.append(_apps_read(f[:-5]))
                except _DiskLocked:
                    locked += 1
                except Exception:
                    pass
    except Exception:
        pass
    return {"ok": True, "apps": out, "locked": locked, "devices": _share_devices_view(), "running": _SHARE.get("port") is not None}


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
            stem, ext = os.path.splitext(f)
            if ext not in (".json", ".html") or not _APPS_ID.match(stem):
                continue
            same = stem.startswith(slug + "-") and not _APPS_DARK.match(stem)
            if not same and ext == ".json":
                try:
                    same = _apps_read(stem).get("slug") == slug
                except Exception:
                    same = False
            if same:
                for e2 in (".json", ".html"):
                    try:
                        os.remove(os.path.join(base, stem + e2))
                    except Exception:
                        pass
        aid = _apps_new_id()
        _disk_seal_write(os.path.join(base, aid + ".html"), raw)
        rec = {"id": aid, "slug": slug, "name": str(name or slug)[:80], "version": str(version or "")[:40], "bytes": len(raw),
               "to": [str(x)[:64] for x in (to or []) if isinstance(x, str)][:20], "at": int(time.time()), "got": {},
               "computer": _share_computer_name()}
        _apps_write_rec(rec)
        _apps_apply()
        return {"ok": True, "id": aid, "running": _SHARE.get("port") is not None, "error": _SHARE.get("error") or ""}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _apps_hide_names():
    """an app kept before 7.50 under a name that began with its short name takes one that says nothing (key held)"""
    n = 0
    if not _DISK["key"]:
        return 0
    try:
        base = _apps_dir("outbox")
        for f in os.listdir(base):
            stem, ext = os.path.splitext(f)
            if ext != ".json" or not _APPS_ID.match(stem) or _APPS_DARK.match(stem):
                continue
            try:
                rec = _apps_read(stem)
            except Exception:
                continue
            new = _apps_new_id()
            page = os.path.join(base, stem + ".html")
            if os.path.isfile(page):
                os.replace(page, os.path.join(base, new + ".html"))
            rec["id"] = new
            _apps_write_rec(rec)
            os.remove(os.path.join(base, f))
            n += 1
    except Exception:
        pass
    return n


def _apps_dev_get(h, path):
    dev = _share_dev_header(h.headers.get("X-Ingenium-Device"))
    if not dev:
        return h._err(400, "Name this device first (Ingenium does so by itself).")
    if path == "/ingenium/apps/outbox":
        box = _apps_outbox()
        if box.get("locked"):
            return h._err(423, _DISK_LOCKED)
        rows = []
        for rec in box["apps"]:
            if _apps_for(rec, dev) and dev["id"] not in (rec.get("got") or {}):
                rows.append({k: rec.get(k) for k in ("id", "slug", "name", "version", "bytes", "at", "computer")})
        return h._json(200, {"ok": True, "apps": rows})
    if path == "/ingenium/apps/get":
        from urllib.parse import urlparse, parse_qs
        q = parse_qs(urlparse(h.path).query)
        aid = (q.get("id") or [""])[0]
        try:
            rec = _apps_read(aid)
        except _DiskLocked as e:
            return h._err(423, str(e))
        except Exception:
            return h._err(404, "That app is no longer waiting here.")
        if not _apps_for(rec, dev):
            return h._err(404, "That app is no longer waiting here.")
        try:
            data = _disk_read(os.path.join(_apps_dir("outbox"), aid + ".html"))
        except _DiskLocked as e:
            return h._err(423, str(e))
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
        except _DiskLocked as e:
            return h._err(423, str(e))
        except Exception:
            return h._err(404, "That app is no longer waiting here.")
        rec.setdefault("got", {})[dev["id"]] = {"at": int(time.time()), "name": dev.get("name") or ""}
        _apps_write_rec(rec)
        return h._json(200, {"ok": True})
    return h._err(404, "not found")


# -- Fabrica's runs: a run's record sealed when the run has ended
def _runs_live(rid):
    x = _RUNS["live"].get(rid)
    return bool(x and x.get("thread") and x["thread"].is_alive())


def _runs_read(rid):
    def go():
        return _disk_json(_runs_rec_path(rid))
    with _runs_io:
        return _runs_retry(go)


def _runs_write(rec):
    f = _runs_rec_path(rec["id"])
    tmp = f + ".tmp"
    data = json.dumps(rec, ensure_ascii=False, indent=1).encode("utf-8")
    seal = bool(_DISK["key"]) and rec.get("state") in _DISK_ENDED and not _runs_live(rec["id"])
    with _runs_io:
        with open(tmp, "wb") as fh:
            fh.write(_disk_seal_bytes(data) if seal else data)
        _runs_retry(lambda: os.replace(tmp, f))


def _runs_list():
    out, locked = [], 0
    try:
        base = _runs_dir()
        for n in sorted(os.listdir(base), reverse=True)[:400]:
            f = os.path.join(base, n, "run.json")
            if not os.path.isfile(f):
                continue
            try:
                r = _disk_json(f)
            except _DiskLocked:
                locked += 1
                continue
            except Exception:
                continue
            if r.get("state") == "running" and n not in _RUNS["live"]:
                r["state"] = "stopped"   # the app closed while it ran
            row = {k: r.get(k) for k in ("id", "at", "state", "app", "repo", "version", "label", "workflow", "file", "why", "machine", "ended", "started", "n", "event", "by", "remote")}
            row["jobs"] = [{"key": j["key"], "name": j["name"], "state": j["state"], "started": j.get("started"), "ended": j.get("ended")} for j in r.get("jobs") or []]
            row["files"] = sum(len(a.get("files") or []) for a in r.get("artifacts") or [])
            out.append(row)
    except Exception as e:
        return {"ok": False, "error": str(e), "runs": out}
    if locked and getattr(_DISK_ASK, "dev", False):
        raise _DiskLockedAsk()
    return {"ok": True, "runs": out, "here": _runs_os(), "locked": locked}


def _runs_dev_mine(rid, dev):
    try:
        r = _runs_read(_runs_safe(rid))
    except _DiskLocked:
        raise _DiskLockedAsk()
    except Exception:
        return False
    return (r.get("by") or {}).get("id") == dev["id"]


def _runs_seal_record(rid):
    """the record of a run that has just ended, sealed (its logs and files are sealed by 7.49's _runs_worker)"""
    if not _DISK["key"]:
        return
    try:
        f = _runs_rec_path(rid)
        with _runs_io:
            if os.path.isfile(f) and not _disk_is_sealed(f):
                with open(f, encoding="utf-8") as fh:
                    rec = json.load(fh)
                if rec.get("state") in _DISK_ENDED:
                    _runs_retry(lambda: _disk_seal_file(f))
    except Exception:
        pass


_runs_guard_749 = _runs_guard


def _runs_guard(rid):
    try:
        _runs_guard_749(rid)
    finally:
        _runs_seal_record(rid)


_runs_dev_get_749 = _runs_dev_get
_runs_dev_post_749 = _runs_dev_post


def _runs_dev_get(h, path):
    _DISK_ASK.dev = True
    try:
        return _runs_dev_get_749(h, path)
    except _DiskLockedAsk:
        return h._err(423, _DISK_LOCKED)
    finally:
        _DISK_ASK.dev = False


def _runs_dev_post(h, path):
    _DISK_ASK.dev = True
    try:
        return _runs_dev_post_749(h, path)
    except _DiskLockedAsk:
        return h._err(423, _DISK_LOCKED)
    finally:
        _DISK_ASK.dev = False


# -- texts for training: read plain while a training or a measurement runs; sealed when left
def _train_busy():
    return _TRAIN.get("state") == "running" or _PPL.get("state") == "running"


def _train_plan_read(work):
    try:
        return _disk_json(str(work / "plan.json"))
    except Exception:
        return None


def _disk_open_in(path):
    """open a sealed file in place before a program reads it; locked, say so"""
    if path and os.path.isfile(str(path)) and _disk_is_sealed(str(path)):
        _disk_open_file(str(path))


_train_text_put_749 = _train_text_put
_train_start_749 = _train_start
_train_resume_749 = _train_resume
_perplexity_start_749 = _perplexity_start


def _train_text_put(chunk, first=False):
    try:
        if not first:
            _disk_open_in(_train_in_file())     # a text the sweep sealed while it waited takes more pieces plain
    except _DiskLocked as e:
        return {"ok": False, "error": str(e)}
    return _train_text_put_749(chunk, first)


def _train_start(spec):
    try:
        _disk_open_in(_train_in_file())
    except _DiskLocked as e:
        return {"ok": False, "error": str(e)}
    return _train_start_749(spec)


def _perplexity_start(model_id):
    try:
        _disk_open_in(_train_in_file())
    except _DiskLocked as e:
        return {"ok": False, "error": str(e)}
    return _perplexity_start_749(model_id)


def _train_resume():
    try:
        plan = _train_resumable()
        if plan and not _train_busy():
            for name in ("text.txt", "plan.json"):
                _disk_open_in(os.path.join(plan["work"], name))
    except _DiskLocked as e:
        return {"ok": False, "error": str(e)}
    return _train_resume_749()


def _train_targets(force=False):
    """texts for training. A text already sealed is always listed (so Open everything again opens it, even while a training runs);
    a plain one only when nothing trains or measures, and when it was left alone: a quarter of an hour for a text being handed over,
    a minute for a training's own (opened just now for a training about to start)"""
    out = []
    try:
        md = _models_dir()
        if not md:
            return out
        busy, now = _train_busy(), time.time()
        cand = [(md / _TRAIN_IN / "incoming.txt", _DISK_QUIET)]
        tr = md / "training"
        if tr.is_dir():
            for d in tr.iterdir():
                if d.is_dir():
                    cand += [(d / x, 60) for x in ("text.txt", "plan.json")]
        for f, quiet in cand:
            if not f.is_file():
                continue
            if _disk_is_sealed(str(f)) or (not busy and (force or now - f.stat().st_mtime > quiet)):
                out.append(str(f))
    except Exception:
        pass
    return out


# -- what is sealed: the stage 1 kinds, their records, and texts for training
def _disk_targets(force=False):
    out = []
    try:
        base = _apps_dir("outbox")
        out += [os.path.join(base, f) for f in os.listdir(base) if f.endswith(".html") or f.endswith(".json")]
    except Exception:
        pass
    try:
        rd = _runs_dir()
        for rid in os.listdir(rd):
            d = os.path.join(rd, rid)
            f = os.path.join(d, "run.json")
            if not os.path.isfile(f):
                continue
            try:
                rec = _disk_json(f)
            except _DiskLocked:
                rec = None                            # sealed: it had ended
            except Exception:
                continue
            if rec is not None:
                if _runs_live(rid):
                    continue                          # a run still runs on plain files while it runs
                if rec.get("state") not in _DISK_ENDED and rec.get("state") != "running":
                    continue                          # ready, never started: nothing of it ran yet
                kept = (rec.get("remote") or {}).get("kept") or 0
                if kept and not force and time.time() - kept < 900:
                    continue
            out.append(f)
            for sub in ("logs", "files"):
                for root, _dirs, files in os.walk(os.path.join(d, sub)):
                    out += [os.path.join(root, x) for x in files if not x.endswith(".ingtmp")]
    except Exception:
        pass
    out += _train_targets(force)
    return out


def _disk_sweep(force=False):
    n = 0
    try:
        _apps_hide_names()
    except Exception:
        pass
    for f in _disk_targets(force):
        try:
            if not _disk_is_sealed(f) and _disk_seal_file(f):
                n += 1
        except Exception:
            pass
    return n


def _disk_seal_status():
    fs = _disk_targets(True)
    sealed = sum(1 for f in fs if _disk_is_sealed(f))
    return {"ok": True, "held": bool(_DISK["key"]), "kid": _DISK["kid"] or "", "lib": bool(_seal_lib()), "files": len(fs), "sealed": sealed,
            "kinds": ["outbox", "runs", "records", "training"]}


'''
rep('''if __name__ == "__main__":''', FN + '''if __name__ == "__main__":''')
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
