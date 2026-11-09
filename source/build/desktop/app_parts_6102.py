"""Ingenium 6.10.2 (3 November 2026): models in parts, so that a computer with far more memory than 64 GB can run far stronger models
(patch for ingenium_app.py, Mac and Windows; applied after app_device_6101.py).

Her words (3 November 2026): "I also want Ingenium to be able to run stronger models and be strong enough to run on larger computers
with far more RAM than 64GB. I don't want Ingenium to be capped at 64 GB RAM in case I get better hardware that are far more capable
in the future." Hugging Face keeps no file over 50 GB, so every model larger than that comes in parts, named
name-00001-of-0000N.gguf, name-00002-of-0000N.gguf and so on; the engine (llama.cpp) is given the first part and reads the others
from beside it, by those names. Until now the app installed, listed, moved and deleted one file per model. Now:
  install   a model of the lineup may name its parts (file, address, size and SHA-256 of each); each part is downloaded, carried on
            from where it stopped, and kept only when its fingerprint matches; the parts are kept side by side under the names the
            engine looks for, and the model counts as installed only when every part is there;
  list      a model's size is all of its parts together (Models, Storage, and what this computer shares);
  move      a model in parts moves part by part to the drive or back, and counts as moved only when every part is there;
  delete    every part goes with the first;
  choose    a file chosen on this computer that is the first part is added with the others beside it (its size, all of them); a later
            part chosen alone is refused with the reason, and one chosen with its first part is read with it;
  page      the page's own engine (in the window) is never handed a model in parts: it cannot read one.

    python3 build/desktop/app_parts_6102.py <repo>/ingenium_app.py"""
import sys

MARK = "_gguf_parts_of"

CODE = r'''

# ---- 6.10.2: models in parts, for computers with far more memory (app_parts_6102.py) ----
# llama.cpp names the parts of a model "%s-%05d-of-%05d.gguf" and finds the others from the first (llama_split_prefix and
# llama_split_path in its llama.h); Hugging Face keeps no file over 50 GB, so every larger model comes this way.
_SPLIT_RE = re.compile(r"^(.+)-(\d{5})-of-(\d{5})\.gguf$")


def _gguf_parts_of(p):
    """A model in parts: the path of every part, first to last, beside the first. Any other file: itself alone."""
    p = str(p or "")
    m = _SPLIT_RE.match(os.path.basename(p))
    if not m or int(m.group(2)) != 1 or not (2 <= int(m.group(3)) <= 99):
        return [p]
    n, d = int(m.group(3)), os.path.dirname(p)
    return [p] + [os.path.join(d, "%s-%05d-of-%05d.gguf" % (m.group(1), k, n)) for k in range(2, n + 1)]


def _gguf_total_size(p):
    """A model's size on disk: all of its parts together."""
    t = 0
    for q in _gguf_parts_of(p):
        try:
            t += os.path.getsize(q)
        except OSError:
            pass
    return t


_install_check_whole = _install_check


def _install_check(spec):
    """A model in parts names each part; the first part's name, address and fingerprint stand for the model, and its size is all of
    the parts together. Every part must be the next in order, of the same count, on Hugging Face, and named in its own address."""
    sp = _install_check_whole(spec)
    if sp is None or not isinstance(spec, dict) or not isinstance(spec.get("parts"), list) or not spec.get("parts"):
        return sp
    raw = spec["parts"]
    n = len(raw)
    if not (2 <= n <= 99):
        return None
    parts = []
    for k, x in enumerate(raw, 1):
        if not isinstance(x, dict):
            return None
        try:
            f, url = str(x.get("file") or ""), str(x.get("url") or "")
            sha, size = str(x.get("sha256") or "").lower(), int(x.get("size") or 0)
        except Exception:
            return None
        m = _SPLIT_RE.match(f)
        if not (m and int(m.group(2)) == k and int(m.group(3)) == n and re.match(r"^[A-Za-z0-9._-]{1,200}$", f)
                and url.startswith("https://huggingface.co/") and url.endswith("/" + f)
                and re.match(r"^[0-9a-f]{64}$", sha) and size > 0):
            return None
        parts.append({"file": f, "url": url, "sha256": sha, "size": size})
    if parts[0]["file"] != sp["file"] or parts[0]["sha256"] != sp["sha256"] or sum(x["size"] for x in parts) != sp["size"]:
        return None
    sp["parts"] = parts
    return sp


def _fetch_part(x, d, job, say, base, k, n):
    """One part, as a whole model is fetched (R70, R84): carried on from where it stopped, and kept only when its SHA-256 matches.
    Returns the verified file, still under its download name."""
    part = d / (x["sha256"][:16] + ".dl.part")
    have = part.stat().st_size if part.is_file() else 0
    if have > x["size"]:
        part.unlink()
        have = 0
    h = hashlib.sha256()
    if have:
        say(phase="resume", received=base + have)
        done = 0
        with open(str(part), "rb") as fh:
            while done < have:
                chunk = fh.read(min(4 << 20, have - done))
                if not chunk:
                    break
                h.update(chunk)
                done += len(chunk)
                if job["stop"].is_set():
                    raise _InstallStopped()
        if done != have:
            part.unlink()
            have = 0
            h = hashlib.sha256()
    ctx = ssl.create_default_context(cafile=_CERT_FILE) if _CERT_FILE else ssl.create_default_context()
    last_err = ""
    cert_fail = False
    for attempt in range(1, 7):
        if have >= x["size"]:
            break
        if job["stop"].is_set():
            raise _InstallStopped()
        try:
            req = urllib.request.Request(x["url"], headers={"User-Agent": "Ingenium"})
            if have:
                req.add_header("Range", "bytes=%d-" % have)
            with urllib.request.urlopen(req, timeout=60, context=ctx) as r:
                if r.status == 200 and have:   # the whole file again: start over
                    have = 0
                    h = hashlib.sha256()
                elif r.status == 206:
                    m = re.match(r"bytes (\d+)-", r.headers.get("Content-Range") or "")
                    if not m or int(m.group(1)) != have:
                        raise IOError("the server sent the wrong part of the file")
                with open(str(part), "r+b" if (have and part.is_file()) else "wb") as out:
                    out.seek(have)
                    out.truncate()
                    last = 0.0
                    while True:
                        chunk = r.read(1 << 20)
                        if not chunk:
                            break
                        if have + len(chunk) > x["size"]:
                            raise IOError("the file is larger than expected")
                        out.write(chunk)
                        h.update(chunk)
                        have += len(chunk)
                        if job["stop"].is_set():
                            raise _InstallStopped()
                        now = time.time()
                        if now - last > 0.3:
                            last = now
                            say(received=base + have, phase="download")
        except _InstallStopped:
            raise
        except urllib.error.HTTPError as e:
            last_err = "the server answered %d" % e.code
            if e.code in (401, 403, 404):
                break
        except Exception as e:
            last_err = _relay_reason(e) if "_relay_reason" in globals() else str(e)
            if _is_cert_error(e):
                cert_fail = True
                break
        if have < x["size"]:
            if job["stop"].wait(min(16, 2 ** attempt)):
                raise _InstallStopped()
    if cert_fail and have < x["size"] and sys.platform == "darwin":
        log_problem("install of part %d of %d: Python refused the certificate (%s); the Mac's own curl carries it" % (k, n, last_err))

        def say_part(**kw):
            say(**dict(kw, received=base + int(kw.get("received") or 0)))
        if _curl_fetch(x["url"], part, job, say_part):
            have = part.stat().st_size if part.is_file() else 0
            say(phase="verify", received=base + have)
            h = hashlib.sha256()
            with open(str(part), "rb") as fh:
                while True:
                    chunk = fh.read(4 << 20)
                    if not chunk:
                        break
                    h.update(chunk)
                    if job["stop"].is_set():
                        raise _InstallStopped()
    if have != x["size"]:
        raise RuntimeError("the download of part %d of %d stopped part way (%s). Install again to carry on from where it stopped."
                           % (k, n, last_err or "no reason given"))
    say(phase="verify", received=base + have)
    if h.hexdigest() != x["sha256"]:
        part.unlink()
        raise RuntimeError("part %d of %d does not match its SHA-256 fingerprint, so it was deleted" % (k, n))
    return part


def _install_parts_worker(job, sp):
    def say(**kw):
        with _INSTALLS_LOCK:
            job.update(kw)
    try:
        mid = "lineup-" + _safe_id(sp["key"])
        d = _models_store_dir()
        if d is None:
            raise RuntimeError("the app's models folder could not be made")
        parts, n = sp["parts"], len(sp["parts"])
        stem = "l" + sp["sha256"][:12]
        dests = [d / ("%s-%05d-of-%05d.gguf" % (stem, k, n)) for k in range(1, n + 1)]
        # a part under its own name was verified before it was given that name
        whole = [q.is_file() and q.stat().st_size == x["size"] for q, x in zip(dests, parts)]
        if all(whole) and _MODEL_META.get(mid, {}).get("sha256") == sp["sha256"]:
            _MODEL_PATHS[mid] = str(dests[0])
            say(state="done", id=mid, received=sp["size"], phase="verify")
            return
        left = 0
        for x, w in zip(parts, whole):
            if not w:
                tmp = d / (x["sha256"][:16] + ".dl.part")
                got = tmp.stat().st_size if tmp.is_file() else 0
                left += x["size"] - (got if got <= x["size"] else 0)
        free = shutil.disk_usage(str(d)).free
        if free < left + 64 * 1024 * 1024:
            raise RuntimeError("there is not enough free space %s (%.1f GB needed, %.1f GB free)"
                               % ("on this computer" if _under(d, _models_dir()) else "on " + _drive_label(d), left / 1e9, free / 1e9))
        base = 0
        for k, (q, x, w) in enumerate(zip(dests, parts, whole), 1):
            if not w:
                say(phase="download", received=base)
                got = _fetch_part(x, d, job, say, base, k, n)
                os.replace(str(got), str(q))
            base += x["size"]
            say(received=base)
        _MODEL_PATHS[mid] = str(dests[0])
        _MODEL_EXTERNAL.discard(mid)
        _MODEL_META[mid] = {"lineup": sp["key"], "name": sp["name"], "file": sp["file"], "sha256": sp["sha256"],
                            "tiers": sp["tiers"], "parts": n}
        _save_models_index()
        say(state="done", id=mid)
    except _InstallStopped:
        say(state="cancelled", error="Stopped.")
    except Exception as e:
        log_problem("install of %s failed" % sp.get("key"), sys.exc_info())
        say(state="error", error=str(e) or e.__class__.__name__)


_install_worker_whole = _install_worker


def _install_worker(job, sp):
    if sp.get("parts"):
        return _install_parts_worker(job, sp)
    return _install_worker_whole(job, sp)


def _move_parts(mid, src, to):
    """A model in parts moves part by part, and counts as moved only when every part has arrived."""
    if to == "computer":
        dest_dir = _models_dir()
    else:
        c = _place_chosen()
        dest_dir = pathlib.Path(c) if c else None
        if dest_dir is None:
            return {"ok": False, "error": "Choose a drive first."}
    if dest_dir is None or not dest_dir.is_dir():
        return {"ok": False, "error": "The drive is not connected."}
    srcs = _gguf_parts_of(src)
    if not all(os.path.isfile(q) for q in srcs):
        return {"ok": False, "error": "A part of that model is missing, so it cannot be moved."}
    dests = [dest_dir / os.path.basename(q) for q in srcs]
    if os.path.realpath(str(dests[0])) == os.path.realpath(src):
        return {"ok": True, "same": True}
    size = sum(os.path.getsize(q) for q in srcs)
    free = shutil.disk_usage(str(dest_dir)).free
    if free < size + 64 * 1024 * 1024:
        return {"ok": False, "error": "There is not enough room there (%.1f GB needed, %.1f GB free)." % (size / 1e9, free / 1e9)}
    with _MOVES_LOCK:
        job = _MOVES.get(mid)
        if job and job["state"] == "running":
            return {"ok": True, "already": True}
        job = {"state": "running", "done": 0, "total": size, "error": "", "to": to, "stop": threading.Event()}
        _MOVES[mid] = job

    def work():
        made = []
        try:
            for q, dst in zip(srcs, dests):
                part = dst.with_name(dst.name + ".moving")
                made.append(part)
                want = os.path.getsize(q)
                with open(q, "rb") as a, open(str(part), "wb") as b:
                    while True:
                        if job["stop"].is_set():
                            raise _InstallStopped()
                        chunk = a.read(8 << 20)
                        if not chunk:
                            break
                        b.write(chunk)
                        job["done"] += len(chunk)
                    b.flush()
                    os.fsync(b.fileno())
                if os.path.getsize(str(part)) != want:
                    raise RuntimeError("the copy came out a different size")
            for part, dst in zip(made, dests):
                os.replace(str(part), str(dst))
            made = []
            _MODEL_PATHS[mid] = str(dests[0])
            _save_models_index()
            for q in srcs:
                try:
                    os.remove(q)
                except Exception:
                    log_problem("move_model: the old copy of %r stays at %s" % (mid, q), sys.exc_info())
            job["state"] = "done"
        except _InstallStopped:
            job.update(state="stopped")
        except Exception as e:
            log_problem("move_model(%r) failed" % (mid,), sys.exc_info())
            job.update(state="error", error=str(e) or "the copy stopped")
        finally:
            for part in made:
                try:
                    if part.exists():
                        part.unlink()
                except Exception:
                    pass
    threading.Thread(target=work, daemon=True).start()
    return {"ok": True}


_pick_model_files_each = _pick_model_files


def _pick_model_files(win):
    """A model in parts is added by its first part, which reads the others from beside it; its size is all of them."""
    rows = _pick_model_files_each(win)
    if not isinstance(rows, list):
        return rows
    firsts = set()
    for r in rows:
        m = _SPLIT_RE.match(os.path.basename(str(r.get("path") or ""))) if r.get("ok") else None
        if m and int(m.group(2)) == 1:
            firsts.add((os.path.dirname(r["path"]), m.group(1), m.group(3)))
    out = []
    for r in rows:
        m = _SPLIT_RE.match(os.path.basename(str(r.get("path") or ""))) if r.get("ok") else None
        if not m:
            out.append(r)
            continue
        k, n = int(m.group(2)), int(m.group(3))
        if k != 1:
            if (os.path.dirname(r["path"]), m.group(1), m.group(3)) not in firsts:
                out.append({"name": r.get("name"), "ok": False,
                            "reason": "part %d of %d of a model in parts: choose its first part (%s-00001-of-%05d.gguf), and the "
                                      "others are read from beside it" % (k, n, m.group(1), n)})
            continue
        missing = [os.path.basename(q) for q in _gguf_parts_of(r["path"]) if not os.path.isfile(q)]
        if missing:
            out.append({"name": r.get("name"), "ok": False,
                        "reason": "a model in %d parts, and %s%s %s not beside it" % (n, ", ".join(missing[:3]),
                                                                                    " and more" if len(missing) > 3 else "",
                                                                                    "is" if len(missing) == 1 else "are")})
            continue
        out.append(dict(r, size=_gguf_total_size(r["path"]), parts=n))
    return out
'''

if __name__ == "__main__":
    p = sys.argv[1]
    s = open(p, encoding="utf-8").read()
    if MARK in s:
        print("already patched", p)
        sys.exit(0)

    def rep(old, new, n=1):
        global s
        c = s.count(old)
        if c != n:
            sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
        s = s.replace(old, new)

    # after the install, move and choose functions it wraps, so that its definitions are the ones in force
    anchor = "\n# R74: sharing this computer's models with the person's other devices.\n"
    i = s.find(anchor)
    j = s.rfind("\n# ---", 0, i)
    if i < 0 or j < 0 or s.count(anchor) != 1:
        sys.exit("%s: the place for the code was not found" % p)
    s = s[:j] + CODE.rstrip("\n") + "\n\n" + s[j:]
    rep('"size": os.path.getsize(p), "lineup": lk, "role": role})', '"size": _gguf_total_size(p), "lineup": lk, "role": role})')
    rep('"size": os.path.getsize(p), "lineup": (_MODEL_META.get(mid) or {}).get("lineup", "")})',
        '"size": _gguf_total_size(p), "lineup": (_MODEL_META.get(mid) or {}).get("lineup", "")})')
    rep("            size = os.path.getsize(mp)\n        except OSError:\n            size = 0\n",
        "            size = _gguf_total_size(mp)\n        except OSError:\n            size = 0\n")
    rep("        if (d and os.path.commonpath([os.path.realpath(p), str(d)]) == str(d)) or (c and _under(p, c)):\n            os.remove(p)\n",
        "        if (d and os.path.commonpath([os.path.realpath(p), str(d)]) == str(d)) or (c and _under(p, c)):\n"
        "            for q in _gguf_parts_of(p):    # 6.10.2: every part of a model in parts\n"
        "                try:\n"
        "                    os.remove(q)\n"
        "                except OSError:\n"
        "                    pass\n")
    rep('        return {"ok": False, "error": "That model is running. Unload it first, then move it."}\n',
        '        return {"ok": False, "error": "That model is running. Unload it first, then move it."}\n'
        '    if len(_gguf_parts_of(src)) > 1:    # 6.10.2: a model in parts moves part by part\n'
        '        return _move_parts(mid, src, to)\n')
    rep("        def _serve_model(self, mid):\n            p = _model_path_for(mid)\n            if not p or not os.path.isfile(p):",
        "        def _serve_model(self, mid):\n            p = _model_path_for(mid)\n"
        "            if not p or not os.path.isfile(p) or len(_gguf_parts_of(p)) > 1:    # 6.10.2: the page cannot read a model in parts")
    open(p, "w", encoding="utf-8").write(s)
    print("patched", p)
