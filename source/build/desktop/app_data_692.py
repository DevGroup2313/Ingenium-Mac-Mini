"""Ingenium 6.9.x (31 October 2026): the trainer takes its text as a file, and a long run goes one pass at a time (patch for
ingenium_app.py, Mac and Windows; applied after app_open_691.py). The owner's words (31 October 2026): "I want to be able to
create and train all kinds of AI models, even Frontier level AI models inside of the app."

What changes on the computer's side (the page's side is modules/r200.js, which feature-detects every method here):
- train_text_put(chunk, first): the page hands the training text over a megabyte at a time; it is written to the app's data
  folder (models/training-in/incoming.txt), and train_start takes {"text_path": that file} in place of one string. This lifts
  the 8 MB cap of one string over the bridge: up to 256 MB of text. For a model from zero the vocabulary is learned from the
  first 8 MB of the text (Python's BPE would take hours on more); the training itself reads the whole file.
- A run of several passes goes one pass at a time: llama-finetune is run with -epochs 1 once a pass, the learning rate
  stepping down pass by pass from the size's usual start to its usual end (each pass slides to the next pass's rate), and
  the model is saved after every pass (pass_N.gguf beside plan.json in the work folder). The chart's history is the same:
  one point a pass. When the app closes in the middle of a run, the passes done stay; train_status (when idle) names them
  ("resumable"), train_resume goes on from the pass reached, train_discard lets them go. Stop training by hand still keeps
  nothing, as before; a new training still clears earlier work folders, so the page asks first (r200).
- train_available says file: true and resume: true, so a page can tell this side from the older one.
- Perplexity, when llama.cpp's llama-perplexity sits beside llama-server and llama-finetune in the engine folder (the builds do not
  carry it yet: see the notes in the report): train_perplexity(model_id) measures a model the app stores on the text handed over
  with train_text_put (the held-back part of a dataset), as the build's own check does (-c 256 -b 256, "Final estimate: PPL ="),
  train_perplexity_status() polls it and train_perplexity_cancel() stops it; train_available says perplexity: true only when the
  program is there.

    python3 build/desktop/app_data_692.py <repo>/ingenium_app.py

Anchors in ingenium_app.py (each found the stated number of times, or the patch stops without writing):
  1 x 'text = str(spec.get("text") or "")' ... 'text = text[:8 * 1024 * 1024]'  (the text block of _train_start)
  1 x '(work / "text.txt").write_text(text, encoding="utf-8")'
  1 x '"started": time.time(), "chars": len(text),'
  1 x 'tid = time.strftime("%Y%m%d-%H%M%S")'  (a run's name no earlier training took, even in the same second)
  1 x 'threading.Thread(target=_train_run, args=(exe, work, size, passes, name, more, base), daemon=True).start()'
  1 x the body of _train_stop_at_exit ('if _TRAIN.get("state") == "running":\\n        _train_cancel()')
  1 x 'def _train_run(exe, work, size, passes, name, more, base=""):'  (the new functions go before it)
  1 x 'return {"ok": True, "trainer": bool(_trainer_path()), "cores": os.cpu_count() or 1}'  (says file, resume, textMax, perplexity)
  2 x 'def train_cancel(self):\\n        return _train_cancel()'  (both API classes: the new methods go after it)
  2 x 'def train_status(self):\\n        return _train_status()'  (both API classes: _train_status_692)"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()
if "_train_text_put" in s:
    print("already patched", p)
    sys.exit(0)


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


rep('''    text = str(spec.get("text") or "")
    if len(text) < 2000:
        return {"ok": False, "error": "Training needs at least about 2,000 characters of text; more is better (100,000 or more)."}
    text = text[:8 * 1024 * 1024]
''', '''    # 6.9.x (app_data_692.py): the text may come as the file train_text_put wrote, of any length up to 256 MB
    text_path, bad = _train_text_path(spec)
    if bad:
        return {"ok": False, "error": bad}
    text = "" if text_path else str(spec.get("text") or "")[:8 * 1024 * 1024]
    nchars = _train_text_chars(text_path) if text_path else len(text)
    if nchars < 2000:
        return {"ok": False, "error": "Training needs at least about 2,000 characters of text; more is better (100,000 or more)."}
''')
rep('''    (work / "text.txt").write_text(text, encoding="utf-8")
''', '''    if text_path:
        shutil.move(str(text_path), str(work / "text.txt"))
    else:
        (work / "text.txt").write_text(text, encoding="utf-8")
''')
rep('''"started": time.time(), "chars": len(text),''', '''"started": time.time(), "chars": nchars,''')
rep('''    tid = time.strftime("%Y%m%d-%H%M%S")
''', '''    tid = time.strftime("%Y%m%d-%H%M%S")
    # 6.9.x (app_data_692.py): a name no earlier training took, even one begun in the same second
    k = 1
    while ("trained-" + tid) in _MODEL_PATHS or (md / ("trained-" + tid + ".gguf")).exists():
        k += 1
        tid = time.strftime("%Y%m%d-%H%M%S") + "-%d" % k
''')
rep('''threading.Thread(target=_train_run, args=(exe, work, size, passes, name, more, base), daemon=True).start()''',
    '''threading.Thread(target=_train_run_692, args=(exe, work, size, passes, name, more, base), daemon=True).start()''')
rep('''    if _TRAIN.get("state") == "running":
        _train_cancel()
''', '''    _perplexity_cancel()  # 6.9.x (app_data_692.py): a measurement does not outlive the app
    if _TRAIN.get("state") == "running":
        _train_set(exiting=True)  # 6.9.x (app_data_692.py): the passes already saved stay, for train_resume
        _train_cancel()
''')
rep('''    return {"ok": True, "trainer": bool(_trainer_path()), "cores": os.cpu_count() or 1}''',
    '''    return {"ok": True, "trainer": bool(_trainer_path()), "cores": os.cpu_count() or 1, "file": True, "resume": True, "textMax": _TRAIN_TEXT_MAX, "perplexity": bool(_perplexity_path())}''')
rep('''    def train_cancel(self):
        return _train_cancel()
''', '''    def train_cancel(self):
        return _train_cancel()

    # 6.9.x (app_data_692.py): the text as a file, a piece at a time; a run cut short goes on, or is let go
    def train_text_put(self, chunk, first=False):
        return _train_text_put(chunk, first)

    def train_resume(self):
        return _train_resume()

    def train_discard(self):
        return _train_discard()

    def train_perplexity(self, model_id):
        return _perplexity_start(model_id)

    def train_perplexity_status(self):
        return _perplexity_status()

    def train_perplexity_cancel(self):
        return _perplexity_cancel()
''', 2)
rep('''    def train_status(self):
        return _train_status()
''', '''    def train_status(self):
        return _train_status_692()
''', 2)

NEW = '''# ---------------------------------------------------------------- 6.9.x: the text as a file, and one pass at a time (app_data_692.py)
_TRAIN_IN = "training-in"
_TRAIN_TEXT_MAX = 256 * 1024 * 1024
_TRAIN_BPE_MAX = 8 * 1024 * 1024


def _train_in_file():
    md = _models_dir()
    if not md:
        return None
    d = md / _TRAIN_IN
    d.mkdir(parents=True, exist_ok=True)
    return d / "incoming.txt"


def _train_text_put(chunk, first=False):
    """The page hands the training text over a piece at a time; it is kept as the file train_start's text_path names."""
    f = _train_in_file()
    if f is None:
        return {"ok": False, "error": "The app's data folder is not writable."}
    data = str(chunk or "").encode("utf-8")
    try:
        if first and f.exists():
            f.unlink()
        have = f.stat().st_size if f.exists() else 0
        if have + len(data) > _TRAIN_TEXT_MAX:
            return {"ok": False, "error": "The text is longer than the trainer takes here (256 MB)."}
        with open(str(f), "ab") as w:
            w.write(data)
        return {"ok": True, "path": str(f), "bytes": have + len(data)}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _train_text_path(spec):
    """The text file train_start may read: only the one train_text_put wrote. Returns (path or None, error or '')."""
    want = str((spec or {}).get("text_path") or "")
    if not want:
        return None, ""
    f = _train_in_file()
    if f is None or not f.is_file() or os.path.realpath(want) != os.path.realpath(str(f)):
        return None, "The text file is not one this app wrote; hand the text over again."
    return f, ""


def _train_text_chars(path):
    n = 0
    with open(str(path), "r", encoding="utf-8", errors="replace") as r:
        while True:
            part = r.read(1 << 20)
            if not part:
                break
            n += len(part)
    return n


def _train_plan_write(work, plan):
    tmp = work / "plan.json.tmp"
    tmp.write_text(json.dumps(plan), encoding="utf-8")
    os.replace(str(tmp), str(work / "plan.json"))


def _train_plan_read(work):
    try:
        return json.loads((work / "plan.json").read_text(encoding="utf-8"))
    except Exception:
        return None


def _train_prepare_692(work, size, name, more, base):
    """The model the first pass starts from, as _train_run made it: widened from a model she has, copied from one trained
    here, or new from random numbers with a vocabulary learned from the text (its first 8 MB)."""
    start = work / "start.gguf"
    nvocab = None
    if base:
        nvocab = _gguf_summary(_MODEL_PATHS[base]).get("vocab")
        _train_set(phase="widening", nvocab=nvocab)
        params = _gguf_to_f32(_MODEL_PATHS[base], str(start), progress=lambda f: _train_set(frac=0.0, widen=round(f, 2)))
        size = "base"
        lr0, lr1 = TRAIN_LR["base"]
    elif more:
        shutil.copyfile(_MODEL_PATHS[more], start)
        size = (_MODEL_META.get(more) or {}).get("size") or size
        lr0, lr1 = TRAIN_LR_MORE.get(size, TRAIN_LR_MORE["tiny"])
        params = (_MODEL_META.get(more) or {}).get("params")
    else:
        _train_set(phase="vocabulary")
        with open(str(work / "text.txt"), "r", encoding="utf-8", errors="replace") as r:
            sample = r.read(_TRAIN_BPE_MAX)
        kv = _train_bpe(sample, TRAIN_VOCAB, progress=lambda f: _train_set(frac=0.0, vocab=round(f, 2)))
        _train_set(phase="model")
        params = _new_model(str(start), kv, size, name)
        lr0, lr1 = TRAIN_LR.get(size, TRAIN_LR["tiny"])
    return start, params, lr0, lr1, size, nvocab


def _train_pass_692(exe, work, start, out, lr, lr_min, passes, pass_no):
    """One pass of llama-finetune (-epochs 1), its progress read from its error output as _train_run reads it.
    Returns (exit code, the last training loss, the held-back loss, the last lines)."""
    threads = max(1, (os.cpu_count() or 2) - 1)
    args = [exe, "-m", str(start), "--file", str(work / "text.txt"), "-c", str(TRAIN_CTX), "-b", str(TRAIN_CTX), "-ub", str(TRAIN_CTX),
            "-epochs", "1", "-lr", str(lr), "-lr-min", str(lr_min), "-decay-epochs", "1", "-t", str(threads), "-o", str(out)]
    kw = {}
    if sys.platform.startswith("win"):
        kw["creationflags"] = 0x08000000  # no console window
    proc = subprocess.Popen(args, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, cwd=str(work), **kw)
    _TRAIN_PROC[0] = proc
    tail, buf, last_train, val = [], b"", None, None
    while True:
        ch = proc.stderr.read(512)
        if not ch:
            break
        buf += ch
        parts = re.split(rb"[\\r\\n]", buf)
        buf = parts.pop()
        for raw in parts:
            line = raw.decode("utf-8", "replace").strip()
            if not line:
                continue
            tail = (tail + [line])[-12:]
            m = _TRAIN_LINE.match(line)
            if not m:
                continue
            kind, k, n = m.group(1), int(m.group(2)), max(1, int(m.group(3)))
            loss, acc = float(m.group(4)), float(m.group(5))
            if kind == "train":
                last_train = loss
                with _TRAIN_LOCK:
                    _TRAIN.update(loss=loss, acc=acc, frac=min(1.0, (pass_no - 1 + k / n) / passes))
                    el = time.time() - _TRAIN["started"]
                    f = _TRAIN["frac"]
                    df = f - (_TRAIN.get("frac0") or 0.0)  # a run taken up again counts from where it was taken up
                    _TRAIN["eta"] = round(el * (1 - f) / df) if df > 0.02 else None
            elif k >= n:
                val = loss
    rc = proc.wait()
    _TRAIN_PROC[0] = None
    return rc, last_train, val, tail


def _train_run_692(exe, work, size, passes, name, more, base="", resume=None):
    """The run: prepared (or taken up where it stopped), then one pass at a time, the model saved after each."""
    try:
        if resume:
            plan = resume
            start = work / ("pass_%d.gguf" % int(plan["done"]))
            params, lr0, lr1 = plan.get("params"), plan["lr0"], plan["lr1"]
            size = plan.get("size") or size
            if plan.get("nvocab"):
                _train_set(nvocab=plan["nvocab"])
        else:
            start, params, lr0, lr1, size, nvocab = _train_prepare_692(work, size, name, more, base)
            plan = {"id": work.name, "name": name, "size": size, "passes": passes, "done": 0, "more": more, "base": base, "lr0": lr0, "lr1": lr1,
                    "params": params, "nvocab": nvocab, "chars": _TRAIN.get("chars"), "history": [], "made": time.time()}
            _train_plan_write(work, plan)
        _train_set(phase="training", params=params)

        def rate(k):
            # the learning rate steps down pass by pass from the usual start to the usual end
            if passes <= 1 or k > passes:
                return lr1 if k > 1 else lr0
            return lr0 * (lr1 / lr0) ** ((k - 1) / float(passes - 1))

        for k in range(int(plan["done"]) + 1, passes + 1):
            out = work / ("pass_%d.gguf" % k)
            rc, tl, vl, tail = (None, None, None, []) if _TRAIN.get("cancel") else _train_pass_692(exe, work, start, out, rate(k), rate(k + 1), passes, k)
            if _TRAIN.get("cancel"):
                _train_set(state="cancelled", phase="")
                if not (_TRAIN.get("exiting") and int(plan["done"]) >= 1):
                    shutil.rmtree(str(work), ignore_errors=True)   # stopped by hand, or nothing saved yet: nothing is kept
                return
            if rc != 0 or not out.is_file():
                _train_set(state="error", error="The trainer stopped (code %s): %s" % (rc, " / ".join(tail[-3:])))
                return
            plan["done"] = k
            plan["history"].append({"pass": k, "loss": tl, "val": vl})
            with _TRAIN_LOCK:
                _TRAIN["history"] = list(plan["history"])
                _TRAIN.update(val=vl, **{"pass": k})
            _train_plan_write(work, plan)
            if start != out and start.is_file():
                try:
                    start.unlink()   # the model before this pass is let go once this pass is saved
                except Exception:
                    pass
            start = out
        _train_finish_692(work, start, plan)
    except Exception as e:
        _TRAIN_PROC[0] = None
        _train_set(state="error", error=str(e))


def _train_finish_692(work, final, plan):
    """The trained model into its place, as _train_run put it."""
    md = _models_dir()
    more, base, name, size, params, passes = plan.get("more") or "", plan.get("base") or "", plan.get("name") or "My first model", plan.get("size"), plan.get("params"), int(plan.get("passes") or 1)
    mid = more or ("trained-" + work.name)
    dest = md / (mid + ".gguf")
    if _ENGINE.get("model_id") == mid:
        _engine_stop()
    shutil.move(str(final), str(dest))
    _MODEL_PATHS[mid] = str(dest)
    prev = _MODEL_META.get(mid) or {}
    _MODEL_META[mid] = {"trained": True, "name": name, "size": size, "params": params,
                        "passes": int(prev.get("passes") or 0) + passes, "chars": plan.get("chars")}
    if base or prev.get("base"):
        _MODEL_META[mid]["base"] = prev.get("base") or (_MODEL_META.get(base) or {}).get("name") or os.path.basename(_MODEL_PATHS.get(base, ""))
    _save_models_index()
    shutil.rmtree(str(work), ignore_errors=True)
    _train_set(state="done", phase="", frac=1.0, eta=0, history=list(plan.get("history") or []),
               model={"id": mid, "fileName": re.sub(r"[^A-Za-z0-9 ._-]", "", name).strip() + ".gguf", "size": os.path.getsize(str(dest)),
                      "passes": _MODEL_META[mid]["passes"], "params": params})


def _train_resumable():
    """A training the app's closing cut short: its plan, where at least one pass was saved and more remain."""
    md = _models_dir()
    if not md or not (md / "training").is_dir():
        return None
    best = None
    for d in (md / "training").iterdir():
        plan = _train_plan_read(d) if d.is_dir() else None
        if not plan:
            continue
        done, total = int(plan.get("done") or 0), int(plan.get("passes") or 0)
        if not (1 <= done < total) or not (d / ("pass_%d.gguf" % done)).is_file():
            continue
        plan["work"] = str(d)
        if best is None or (plan.get("made") or 0) > (best.get("made") or 0):
            best = plan
    return best


def _train_status_692():
    st = _train_status()
    if st.get("state") != "running":
        r = _train_resumable()
        if r:
            st["resumable"] = {"id": r.get("id"), "name": r.get("name"), "done": r.get("done"), "passes": r.get("passes"), "chars": r.get("chars"), "size": r.get("size")}
    return st


def _train_resume():
    with _TRAIN_LOCK:
        if _TRAIN.get("state") == "running":
            return {"ok": False, "error": "A training is already running."}
    exe = _trainer_path()
    if not exe:
        return {"ok": False, "error": "This copy of the app does not carry llama.cpp's trainer (llama-finetune). The installer from GitHub carries it."}
    plan = _train_resumable()
    if not plan:
        return {"ok": False, "error": "There is no training to go on with."}
    work = pathlib.Path(plan.pop("work"))
    if plan.get("more") and not os.path.isfile(_MODEL_PATHS.get(plan["more"], "")):
        return {"ok": False, "error": "The model it was training further is no longer on this computer."}
    passes, done = int(plan["passes"]), int(plan["done"])
    with _TRAIN_LOCK:
        _TRAIN.clear()
        _TRAIN.update({"state": "running", "phase": "training", "id": plan.get("id"), "name": plan.get("name"), "size": plan.get("size"), "passes": passes,
                       "pass": done, "frac": done / float(passes), "loss": None, "val": None, "acc": None, "history": list(plan.get("history") or []),
                       "eta": None, "started": time.time(), "chars": plan.get("chars"), "more": bool(plan.get("more")), "error": "", "cancel": False, "resumed": True,
                       "frac0": done / float(passes)})
    threading.Thread(target=_train_run_692, args=(exe, work, plan.get("size"), passes, plan.get("name"), plan.get("more") or "", plan.get("base") or "", plan), daemon=True).start()
    return {"ok": True, "id": plan.get("id"), "done": done, "passes": passes}


def _train_discard():
    plan = _train_resumable()
    if plan:
        shutil.rmtree(plan["work"], ignore_errors=True)
    return {"ok": True, "gone": bool(plan)}


# ---- perplexity, when llama-perplexity is carried beside the trainer
_PPL = {"state": "idle"}
_PPL_LOCK = threading.Lock()
_PPL_PROC = [None]
_PPL_EXE = "llama-perplexity.exe" if sys.platform.startswith("win") else "llama-perplexity"
_PPL_LINE = re.compile(r"Final estimate: PPL = ([0-9.]+)(?: \\+/- ([0-9.]+))?")
_PPL_MIN_CHARS = 1500


def _perplexity_path():
    d = _engine_dir()
    if d:
        p = os.path.join(d, _PPL_EXE)
        if os.path.isfile(p):
            return p
    return None


def _ppl_set(**kw):
    with _PPL_LOCK:
        _PPL.update(kw)


def _perplexity_start(model_id):
    exe = _perplexity_path()
    if not exe:
        return {"ok": False, "error": "This copy of the app does not carry llama.cpp's llama-perplexity, so it cannot measure a model."}
    path = _MODEL_PATHS.get(str(model_id or ""))
    if not path or not os.path.isfile(path):
        return {"ok": False, "error": "That model is not stored by this app."}
    src = _train_in_file()
    if src is None or not src.is_file():
        return {"ok": False, "error": "Hand the text over first."}
    with _TRAIN_LOCK:
        busy = _TRAIN.get("state") == "running"
    if busy:
        return {"ok": False, "error": "A training is running; measure when it is done."}
    with _PPL_LOCK:
        if _PPL.get("state") == "running":
            return {"ok": False, "error": "A measurement is already running."}
        _PPL.clear()
        _PPL.update({"state": "running", "model": str(model_id), "started": time.time(), "ppl": None, "err": None, "chars": 0})
    mine = src.parent / "measure.txt"
    try:
        shutil.move(str(src), str(mine))
        chars = _train_text_chars(mine)
    except Exception as e:
        _ppl_set(state="error", error=str(e))
        return {"ok": False, "error": str(e)}
    if chars < _PPL_MIN_CHARS:
        try:
            mine.unlink()
        except Exception:
            pass
        msg = "The text is too short to measure on (it needs about %d characters; it has %d)." % (_PPL_MIN_CHARS, chars)
        _ppl_set(state="error", error=msg)
        return {"ok": False, "error": msg}
    _ppl_set(chars=chars)
    threading.Thread(target=_perplexity_run, args=(exe, path, mine), daemon=True).start()
    return {"ok": True, "chars": chars}


def _perplexity_run(exe, model, text):
    try:
        threads = max(1, (os.cpu_count() or 2) - 1)
        kw = {}
        if sys.platform.startswith("win"):
            kw["creationflags"] = 0x08000000  # no console window
        proc = subprocess.Popen([exe, "-m", str(model), "-f", str(text), "-c", "256", "-b", "256", "-t", str(threads)],
                                stdin=subprocess.DEVNULL, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, **kw)
        _PPL_PROC[0] = proc
        tail, found = [], None
        for raw in iter(proc.stdout.readline, b""):
            line = raw.decode("utf-8", "replace").rstrip()
            if not line:
                continue
            tail = (tail + [line])[-12:]
            m = _PPL_LINE.search(line)
            if m:
                found = (float(m.group(1)), float(m.group(2)) if m.group(2) else None)
        rc = proc.wait()
        _PPL_PROC[0] = None
        if _PPL.get("state") == "cancelled":
            return
        if rc == 0 and found:
            _ppl_set(state="done", ppl=found[0], err=found[1], seconds=round(time.time() - _PPL.get("started", time.time()), 1))
        else:
            _ppl_set(state="error", error="llama-perplexity stopped (code %s): %s" % (rc, " / ".join(tail[-3:])))
    except Exception as e:
        _PPL_PROC[0] = None
        if _PPL.get("state") != "cancelled":
            _ppl_set(state="error", error=str(e))
    finally:
        try:
            text.unlink()
        except Exception:
            pass


def _perplexity_status():
    with _PPL_LOCK:
        st = dict(_PPL)
    if st.get("state") == "running":
        st["elapsed"] = round(time.time() - st.get("started", time.time()), 1)
    return st


def _perplexity_cancel():
    with _PPL_LOCK:
        running = _PPL.get("state") == "running"
        if running:
            _PPL["state"] = "cancelled"
    proc = _PPL_PROC[0]
    if proc is not None:
        try:
            proc.kill()
        except Exception:
            pass
    return {"ok": True, "was_running": running}


'''
anchor = 'def _train_run(exe, work, size, passes, name, more, base=""):'
if s.count(anchor) != 1:
    sys.exit("app_data_692: _train_run was not found once")
s = s.replace(anchor, NEW + anchor, 1)
open(p, "w", encoding="utf-8", newline="").write(s)
print("patched", p)
