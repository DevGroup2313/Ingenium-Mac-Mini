"""Ingenium 7.49: sealed on the computer's disk (Security, the computer's disk; the approved preview, source/previews/security).

Her answers (18 November 2026): the computer's disk, "All of them" sealed. The preview: "While you are signed in, the computer app holds
the key in its memory only, and drops it when Ingenium locks. A run still runs on plain files while it runs; its files are sealed when it
ends." Kept readable on purpose: an app served for the Home Screen (Safari has to read it) and the model files.

The key: the page derives it from its own data key (modules/r197.js, IngLock.diskKey: HKDF-SHA-256, info "ingenium-disk 1") and hands
it over while she is signed in (disk_key_hold); it is dropped when Ingenium locks (disk_key_drop) and never written anywhere.

A sealed file: "INGSEAL1", the key's id (8 bytes), a nonce prefix (8 bytes), then the plain bytes in chunks of 1 MiB, each sealed with
AES-256-GCM (nonce = prefix + the chunk's number; the associated data says the chunk's number and whether it is the last, so a file cut
short or reordered is refused). A part of a file is read without opening the rest.

This stage seals: the apps waiting for her devices (Ingenium/apps/outbox: each page as it is written; read for a device only while the
key is held, otherwise "Ingenium is locked on that computer"), Fabrica's runs (each job's log and every file a run kept, when the run
ends; a run's record, its name, state and times, stays readable so the list shows), and the copies of runs made on her other computers.
disk_seal_now seals what was written before; disk_unseal_all opens everything again (when she turns her sign-in off).

    python3 build/desktop/app_disk_749.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_disk_key_hold" in s:
    print("already patched", p)
    sys.exit(0)
if "_apps_send" not in s or "_runs_keep_file" not in s or "_seal_lib" not in s:
    sys.exit("%s: app_apps_735.py, app_runs_728.py and app_seal_737.py must be applied first" % p)

FN = r'''# ---- 7.49: sealed on the computer's disk (app_disk_749.py) ----
_DISK_SEAL = {"key": None, "kid": None, "at": 0}  # 7.57: its own name; _DISK is the drive's (app_disk_fix_757.py)
_DISK_MAGIC = b"INGSEAL1"
_DISK_HEAD = 24                 # magic 8, key id 8, nonce prefix 8
_DISK_CH = 1 << 20              # plain bytes in a chunk
_DISK_LOCKED = "Ingenium is locked on that computer: sign in there, then try again."


class _DiskLocked(Exception):
    pass


def _disk_key_hold(b64key, kid):
    try:
        k = base64.b64decode(str(b64key or ""))
        if len(k) != 32 or not _seal_lib():
            return {"ok": False, "error": "no key"}
        _DISK_SEAL["key"], _DISK_SEAL["kid"], _DISK_SEAL["at"] = k, str(kid or "")[:16], time.time()
        threading.Thread(target=_disk_sweep, daemon=True).start()     # what ended while she was away is sealed now
        return _disk_seal_status()
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _disk_key_drop():
    _DISK_SEAL["key"] = None
    _DISK_SEAL["kid"] = None
    return _disk_seal_status()


def _disk_kid_bytes():
    return bytes.fromhex(_DISK_SEAL["kid"]) if _DISK_SEAL["kid"] and len(_DISK_SEAL["kid"]) == 16 else hashlib.sha256(_DISK_SEAL["key"]).digest()[:8]


def _disk_is_sealed(path):
    try:
        with open(path, "rb") as fh:
            return fh.read(8) == _DISK_MAGIC
    except Exception:
        return False


def _disk_aead():
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    if not _DISK_SEAL["key"]:
        raise _DiskLocked(_DISK_LOCKED)
    return AESGCM(_DISK_SEAL["key"])


def _disk_ad(i, last):
    return b"ingenium-disk chunk %d %s" % (i, b"last" if last else b"more")


def _disk_seal_bytes(data):
    a, kid, pre = _disk_aead(), _disk_kid_bytes(), os.urandom(8)
    out = [_DISK_MAGIC, kid, pre]
    n = max(1, (len(data) + _DISK_CH - 1) // _DISK_CH)
    for i in range(n):
        part = data[i * _DISK_CH:(i + 1) * _DISK_CH]
        out.append(a.encrypt(pre + i.to_bytes(4, "big"), part, _disk_ad(i, i == n - 1)))
    return b"".join(out)


def _disk_plain_size(path):
    if not _disk_is_sealed(path):
        return os.path.getsize(path)
    body = os.path.getsize(path) - _DISK_HEAD
    full, rem = divmod(body, _DISK_CH + 16)
    return full * _DISK_CH + max(0, rem - 16) if rem else full * _DISK_CH


def _disk_read(path, offset=0, size=None):
    """the plain bytes of a file, sealed or not, from offset (size bytes, or to the end)"""
    if not _disk_is_sealed(path):
        with open(path, "rb") as fh:
            fh.seek(max(0, int(offset)))
            return fh.read() if size is None else fh.read(max(0, int(size)))
    a = _disk_aead()
    total = _disk_plain_size(path)
    offset = max(0, min(int(offset), total))
    end = total if size is None else min(total, offset + max(0, int(size)))
    if end <= offset:
        return b""
    n = max(1, (total + _DISK_CH - 1) // _DISK_CH)
    out = []
    with open(path, "rb") as fh:
        head = fh.read(_DISK_HEAD)
        if head[8:16] != _disk_kid_bytes():
            raise _DiskLocked("This file was sealed with another key (another sign-in).")
        pre = head[16:24]
        for i in range(offset // _DISK_CH, (end - 1) // _DISK_CH + 1):
            fh.seek(_DISK_HEAD + i * (_DISK_CH + 16))
            ct = fh.read(_DISK_CH + 16)
            out.append(a.decrypt(pre + i.to_bytes(4, "big"), ct, _disk_ad(i, i == n - 1)))
    b = b"".join(out)
    first = (offset // _DISK_CH) * _DISK_CH
    return b[offset - first:end - first]


def _disk_seal_write(path, data, seal=True):
    """write a file whole: sealed while the key is held (and seal is asked), plain otherwise"""
    tmp = path + ".ingtmp"
    with open(tmp, "wb") as fh:
        fh.write(_disk_seal_bytes(data) if (seal and _DISK_SEAL["key"]) else data)
    os.replace(tmp, path)


def _disk_seal_file(path):
    """seal a plain file in place; True when it is sealed after"""
    if _disk_is_sealed(path):
        return True
    if not _DISK_SEAL["key"] or not os.path.isfile(path):
        return False
    with open(path, "rb") as fh:
        data = fh.read()
    _disk_seal_write(path, data, True)
    return True


def _disk_open_file(path):
    if not _disk_is_sealed(path):
        return True
    data = _disk_read(path)
    _disk_seal_write(path, data, False)
    return True


def _disk_append(path, data):
    """append to a file that may be sealed: read it whole, add, write it back sealed"""
    if os.path.isfile(path) and _disk_is_sealed(path):
        _disk_seal_write(path, _disk_read(path) + data, True)
    else:
        with open(path, "ab") as fh:
            fh.write(data)


def _disk_targets(force=False):
    """every file this stage seals: the outbox's pages, each ended run's logs and kept files (a copy still arriving from another
    computer, kept in the last quarter of an hour, waits, unless she asks for everything now)"""
    out = []
    try:
        base = _apps_dir("outbox")
        out += [os.path.join(base, f) for f in os.listdir(base) if f.endswith(".html")]
    except Exception:
        pass
    try:
        rd = _runs_dir()
        for rid in os.listdir(rd):
            d = os.path.join(rd, rid)
            try:
                rec = _runs_read(rid)
            except Exception:
                continue
            if rec.get("state") not in ("ok", "bad", "stopped", "skipped"):
                continue                              # a run still runs on plain files while it runs
            kept = (rec.get("remote") or {}).get("kept") or 0
            if kept and not force and time.time() - kept < 900:
                continue
            for sub in ("logs", "files"):
                for root, _dirs, files in os.walk(os.path.join(d, sub)):
                    out += [os.path.join(root, f) for f in files if not f.endswith(".ingtmp")]
    except Exception:
        pass
    return out


def _disk_sweep(force=False):
    n = 0
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
    return {"ok": True, "held": bool(_DISK_SEAL["key"]), "kid": _DISK_SEAL["kid"] or "", "lib": bool(_seal_lib()), "files": len(fs), "sealed": sealed,
            "kinds": ["outbox", "runs"]}


def _disk_seal_now():
    if not _DISK_SEAL["key"]:
        return {"ok": False, "error": _DISK_LOCKED}
    n = _disk_sweep(True)
    r = _disk_seal_status()
    r["now"] = n
    return r


def _disk_unseal_all():
    if not _DISK_SEAL["key"]:
        return {"ok": False, "error": _DISK_LOCKED}
    n = 0
    for f in _disk_targets(True):
        try:
            if _disk_is_sealed(f) and _disk_open_file(f):
                n += 1
        except Exception:
            pass
    r = _disk_seal_status()
    r["opened"] = n
    return r


'''
rep("\ndef _apps_send(slug, name, version, b64, to=None):", "\n" + FN + "def _apps_send(slug, name, version, b64, to=None):")

# the outbox: each page sealed as it is written
rep('''        with open(os.path.join(base, aid + ".html"), "wb") as fh:
            fh.write(raw)''', '''        _disk_seal_write(os.path.join(base, aid + ".html"), raw)   # 7.49: sealed while the key is held''')

# a device asking for an app waiting for it: opened while the key is held; locked, the device is told so
rep('''        with open(os.path.join(_apps_dir("outbox"), aid + ".html"), "rb") as fh:
            data = fh.read()''', '''        try:
            data = _disk_read(os.path.join(_apps_dir("outbox"), aid + ".html"))   # 7.49: opened only while the key is held
        except _DiskLocked as e:
            return h._err(423, str(e))''')

FN2 = r'''
# ---- 7.49 (app_disk_749.py): Fabrica's runs read whether sealed or not, sealed when they end ----
def _runs_log(rid, job, offset=0):
    try:
        f = os.path.join(_runs_dir(), _runs_safe(rid), "logs", _runs_safe(job, 60) + ".log")
        if not os.path.isfile(f):
            return {"ok": True, "text": "", "offset": 0, "size": 0}
        size = _disk_plain_size(f)
        offset = max(0, min(int(offset or 0), size))
        b = _disk_read(f, offset, 262144)
        return {"ok": True, "text": b.decode("utf-8", "replace"), "offset": offset + len(b), "size": size}
    except _DiskLocked as e:
        return {"ok": False, "error": str(e), "locked": True}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _runs_file(rid, art, path, offset=0, size=4194304):
    """a part of a file a run kept, to save it or to add it to a release (sealed or not)"""
    try:
        base = os.path.join(_runs_dir(), _runs_safe(rid), "files", _runs_safe(art, 120))
        f = _runs_inside(base, path)
        total = _disk_plain_size(f)
        offset = max(0, min(int(offset or 0), total))
        b = _disk_read(f, offset, max(1, min(int(size or 4194304), 16777216)))
        return {"ok": True, "b64": base64.b64encode(b).decode("ascii"), "offset": offset + len(b), "size": total}
    except _DiskLocked as e:
        return {"ok": False, "error": str(e), "locked": True}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _runs_keep_log(rid, job, text, append=False):
    try:
        f = os.path.join(_runs_dir(), _runs_safe(rid), "logs", _runs_safe(job, 60) + ".log")
        data = str(text or "").encode("utf-8")
        if append:
            _disk_append(f, data)
        else:
            _disk_seal_write(f, data, False)
        return {"ok": True}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _runs_keep_file(rid, art, path, b64, append=False):
    try:
        base = os.path.join(_runs_dir(), _runs_safe(rid), "files", _runs_safe(art, 120))
        os.makedirs(base, exist_ok=True)
        to = _runs_inside(base, path)
        os.makedirs(os.path.dirname(to), exist_ok=True)
        data = base64.b64decode(b64 or "")
        if append:
            _disk_append(to, data)
        else:
            _disk_seal_write(to, data, False)
        return {"ok": True}
    except Exception as e:
        return {"ok": False, "error": str(e)}


_runs_worker_plain = _runs_worker


def _runs_worker(rid):
    """a run runs on plain files while it runs; its logs and kept files are sealed when it ends (while the key is held)"""
    try:
        _runs_worker_plain(rid)
    finally:
        if _DISK_SEAL["key"]:
            try:
                d = os.path.join(_runs_dir(), _runs_safe(rid))
                for sub in ("logs", "files"):
                    for root, _dirs, files in os.walk(os.path.join(d, sub)):
                        for f in files:
                            if not f.endswith(".ingtmp"):
                                _disk_seal_file(os.path.join(root, f))
            except Exception:
                pass


'''
rep('''if __name__ == "__main__":''', FN2 + '''if __name__ == "__main__":''')

# the calls the page makes, in both of the app's windows
rep('''    def share_renew_code(self):''', '''    def disk_key_hold(self, b64key, kid=""):
        return _disk_key_hold(b64key, kid)

    def disk_key_drop(self):
        return _disk_key_drop()

    def disk_status(self):
        return _disk_seal_status()

    def disk_seal_now(self):
        return _disk_seal_now()

    def disk_unseal_all(self):
        return _disk_unseal_all()

    def share_renew_code(self):''', 2)
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
