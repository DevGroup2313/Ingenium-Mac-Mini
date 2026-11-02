"""Ingenium 6.9.3 (1 November 2026): lending that tells the truth and never goes silent (patch for ingenium_app.py, Mac and Windows).

The owner's words (31 October 2026): "I have two 16 GB RAM HP laptops, I want to be able to use it as a server of sorts for my
macbook pro and run its stronger models on the macbook pro or my fire tablet. The graphics of one of the HP laptop is not the
greatest so I would really love to be able to still use its stronger RAM and storage but on my macbook pro instead."

What the lending computer (the HP) now does, in the gateway the page reaches on port 17860 and up:

  Release A, say the truth and never go silent
  - The memory (window) a lent model is given follows this computer's memory: the largest of 32,768, 16,384 or 8,192 tokens that
    the page's own sum (estimateNeedGB) keeps within 70% of it (_share_fit_ctx). The lender may choose it by hand instead
    (Settings, Memory for lent models: Automatic, 8,192, 16,384, 32,768, 65,536). An idle engine that holds less than that is
    started again with it, and what a device asks for (ingenium_ctx) is cut down to it.
  - The model list says it: every model has context_length (the engine's own window if it is loaded, else the fit), max_tokens
    (the window less 256), advice (quick, ok, slow, too big), tps (words a second: measured here once there is a measurement,
    else a guess; tps_measured says which) and loaded. /ingenium/info gains ctx, ctx_default, ram_gb, ram_free_gb, cpu_only,
    gpu_used, gpu_name, gpu_why, busy, queued and version (2); /ingenium/hello gains api (2). A lender from before sends none of
    these and the page copes.
  - One device at a time, first come first served (at most four waiting, thirty minutes at most): a request for another model no
    longer ends the reply being written, and an abandoned request never reaches the engine. A request that streams gets its
    answer head at once, then a ": waiting" line whenever nothing has been sent for ten seconds (which also finds out that the
    device has gone), and, if the request carries ingenium_status, plain status lines: {"ingenium": {"state": "queued", "ahead": 1}},
    "loading", "reading" (with percent), "answering". The engine is asked for return_progress; its progress lines become the
    "reading" lines. An error after the head goes in the stream ({"error": {...}} then [DONE]); an engine that stops while
    answering ends the stream the same way, so a cut reply never looks finished.
  - A request without a code, or with no Authorization at all (a browser visit), no longer counts toward the lock.
  - On the call-in route the reply's head arrives at once, so the 45 seconds are only the time to pick the request up, and the
    504 says so; a reply nobody waits for any more is no longer read to its end.

  Release B, right-size for a processor
  - Graphics (Settings): Automatic, Processor only, Graphics chip. Automatic uses a card only when the engine lists one that is
    a real graphics card (NVIDIA GeForce GTX/RTX, Quadro, RTX A, AMD Radeon RX or Pro, Intel Arc A or B, Apple's chips) with 4,000
    MiB or more; the small chips that share the computer's memory (Intel UHD, HD, Iris, Xe, AMD Radeon Graphics, Vega, GeForce MX,
    the software drawers) mean the processor. The processor is started with --device none -ngl 0 -b 512 (short batches, so the
    engine reports its reading often).
  - An engine that stops after it was ready is started again once, on the processor if it had been using the chip, and the chip
    is left alone for the rest of the run; the device that is waiting is told in a status line, and gpu_used says so.
  - Advice per model and the speed measured here (share_speed.json beside share.json).

    python3 build/desktop/app_lend_693.py <repo>/ingenium_app.py

Test: python3 -I rig/t_705_lend_gateway.py <repo>/ingenium_app.py (the patch applied to a copy; a stand-in engine in rig/lend705_stub_llama.py).
"""
import hashlib
import sys

MARK = "_share_fit_ctx"     # what release.py looks for: a function this patch adds

CODE = r'''# ---------------------------------------------------------------------------
# 6.9.3 (app_lend_693.py): lending that tells the truth and never goes silent. The windows, the advice, the queue, the stream
# the other device sees, the choice of the processor or the graphics chip, and the speed measured here. Plain functions: the
# gateway above and the engine functions below call them; rig/t_705_lend_gateway.py runs the whole file.
# ---------------------------------------------------------------------------
_LEND_API = 2                                  # what this lender says of itself: 2 = windows, advice, a queue, status lines
_LEND_CTX_CHOICES = (8192, 16384, 32768, 65536)
_LEND_QUEUE_MAX = 4                            # devices that may wait behind the one being answered
_LEND_QUEUE_WAIT = 1800                        # the longest a device waits for its turn, seconds
_LEND_PICKUP_WAIT = 45.0                       # a lender that called in has this long to pick a request up, seconds
_LEND_Q = {"cv": threading.Condition(), "line": [], "now": None, "n": 0}
_LEND_GPU_OFF = {"off": False, "why": ""}      # set when the graphics chip gave way: the processor is used for the rest of the run
_LEND_GPU_IDS = [""]                           # the engine's names of the cards to use, when only some of its chips are cards
_LEND_RAM_SEEN = {"at": 0.0, "free": None}
_LEND_SPEED_LOCK = threading.Lock()
_LEND_OPT_LOCK = threading.Lock()
_LEND_SEP = re.compile(rb"\r?\n\r?\n")
_LEND_FIN = re.compile(rb'"finish_reason"\s*:\s*"')

# models that use only some of their parameters for each word: (all, those working on each word), in billions
_LEND_ACTIVE_B = {
    "lfm2.5-8b-a1b": (8.0, 1.0), "mellum2.1-12b-thinking": (12.0, 2.5), "mellum2-12b-thinking": (12.0, 2.5),
    "gemma-4-26b-a4b": (26.0, 4.0), "lfm2.5-24b-a2b": (24.0, 2.0), "qwen3-coder-30b-a3b": (30.0, 3.0),
    "qwen3.6-35b-a3b": (35.0, 3.0)}

# the small chips that share the computer's memory, and the software drawers: the processor does the work better
_LEND_GFX_WEAK = re.compile(r"llvmpipe|swiftshader|lavapipe|microsoft basic|basic render|software|\bvega\s*(?:3|6|8|10|11)\b|"
                            r"geforce\s+mx|\buhd\b|\bhd graphics\b|\biris\b|\bxe graphics\b|radeon\W*(?:\(tm\)\W*)?graphics|"
                            r"radeon\s+rx\s+vega\s*(?:3|6|8|10|11)\b", re.I)
# real graphics cards, by name
_LEND_GFX_CARD = re.compile(r"geforce\s+(?:gtx|rtx)|nvidia\s+(?:rtx|quadro|titan|tesla|t\d{3,4}\b|a\d{2,3}\b|l\d{2}\b)|quadro|"
                            r"\brtx\s*(?:a|pro)?\s*\d|titan|tesla|radeon\s+rx\s+\d|radeon\s+rx\s+vega\s*(?:56|64)|radeon\s+pro|"
                            r"radeon\s+vii|instinct|\barc\W*(?:\(tm\)\W*)?(?:pro\W*)?[ab]\d{3}", re.I)


def _lend_tick():
    """How long a stream may be quiet before it is sent a ": waiting" line (ten seconds; the tests shorten it)."""
    try:
        return max(0.05, float(os.environ.get("INGENIUM_LEND_TICK") or 10))
    except Exception:
        return 10.0


# ---- this computer's memory ----
def _lend_ram():
    """(all, free) memory of this computer in GB; either is None when it cannot be read."""
    total = free = None
    try:
        total = _read_device_info().get("ramGB")
    except Exception:
        pass
    now = time.time()
    if now - _LEND_RAM_SEEN["at"] < 15:
        return total, _LEND_RAM_SEEN["free"]
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
            free = round(ms.ullAvailPhys / 1073741824.0, 1)
        elif sys.platform.startswith("linux"):
            with open("/proc/meminfo", encoding="utf-8") as fh:
                for line in fh:
                    if line.startswith("MemAvailable:"):
                        free = round(int(line.split()[1]) / 1048576.0, 1)
                        break
        elif sys.platform == "darwin":
            r = subprocess.run(["vm_stat"], capture_output=True, text=True, timeout=5)
            ps = re.search(r"page size of (\d+) bytes", r.stdout)
            pages = sum(int(re.search(r"Pages %s:\s+(\d+)" % k, r.stdout).group(1)) for k in ("free", "inactive", "speculative"))
            free = round(pages * (int(ps.group(1)) if ps else 16384) / 1073741824.0, 1)
    except Exception:
        free = None
    _LEND_RAM_SEEN.update(at=now, free=free)
    return total, free


# ---- how big a model is, what window it can be given, how fast it is ----
def _lend_params(m):
    """(all parameters, parameters working on each word) of a model in billions: from its lineup name, else from its own name or file."""
    lk = str(m.get("lineup") or "").lower()
    if lk in _LEND_ACTIVE_B:
        return _LEND_ACTIVE_B[lk]
    for s in (lk, str(m.get("name") or "").lower(), str(m.get("file") or "").lower()):
        x = re.search(r"(?<![a-z0-9.])(\d+(?:\.\d+)?)\s*b(?![a-z0-9])(?:[-_ ]a(\d+(?:\.\d+)?)b(?![a-z0-9]))?", s)
        if x:
            total = float(x.group(1))
            return total, (min(float(x.group(2)), total) if x.group(2) else total)
        x = re.search(r"(?<![a-z0-9.])(\d+)\s*m(?![a-z0-9])", s)
        if x:
            total = int(x.group(1)) / 1000.0
            return total, total
    gb = (m.get("size") or 0) / 1073741824.0       # a four-bit file holds about 0.55 GB for each billion
    total = max(0.5, round(gb / 0.55, 1))
    return total, total


def _lend_need_gb(m, ctx):
    """The page's own sum for the memory a model needs (estimateNeedGB): its file, the working room for ctx tokens, a little more."""
    file_gb = (m.get("size") or 0) / 1073741824.0
    ps = max(0.5, _lend_params(m)[0] / 7.0)
    return file_gb * 1.15 + (ctx / 1024.0) * 0.12 * ps + 0.6


def _share_fit_ctx(m, ram_gb):
    """The largest memory a lent model is given (32,768, 16,384 or 8,192 tokens) whose need stays within 70% of this computer's
    memory, by the page's own sum. 8,192 when not even that fits (the advice then says too big) or the memory is not known."""
    try:
        usable = float(ram_gb) * 0.7
    except Exception:
        return 8192
    for c in (32768, 16384, 8192):
        if _lend_need_gb(m, c) <= usable:
            return c
    return 8192


def _lend_est_tps(m, chip):
    """A guess at words a second. Each word needs the working part of the model read once; a processor reads about 24 GB a
    second, a graphics chip about 100. A model that uses only some of its parameters costs a third more than that part."""
    total, act = _lend_params(m)
    gb = max(0.05, (m.get("size") or 0) / 1e9)
    work = gb * (act / total if total else 1.0) * (1.35 if act < total * 0.9 else 1.0)
    return (100.0 if chip else 24.0) / work


def _share_advice(m, ram_gb, cpu_only, measured=None):
    """quick (8 words a second or more), ok (4 to 8), slow, or too big (it needs more than 70% of the memory even at 8,192
    tokens). By the speed measured on this computer when there is one, else by a guess."""
    try:
        if ram_gb and _lend_need_gb(m, 8192) > float(ram_gb) * 0.7:
            return "too big"
    except Exception:
        pass
    tps = measured if measured else _lend_est_tps(m, not cpu_only)
    return "quick" if tps >= 8 else ("ok" if tps >= 4 else "slow")


def _lend_speed_path():
    p = _share_cfg_path()
    return (p.parent / "share_speed.json") if p is not None else None


def _lend_speed_all():
    try:
        with open(str(_lend_speed_path()), encoding="utf-8") as fh:
            d = json.load(fh)
            return d if isinstance(d, dict) else {}
    except Exception:
        return {}


def _lend_speed_note(mid, tps, cpu):
    """Keeps the speed a reply was written at, per model (and for the processor or the chip alone): an average, not the last."""
    try:
        tps = float(tps)
        p = _lend_speed_path()
        if p is None or not (0.2 < tps < 2000):
            return
        with _LEND_SPEED_LOCK:
            d = _lend_speed_all()
            cur = d.get(str(mid))
            if isinstance(cur, dict) and cur.get("cpu") == bool(cpu) and cur.get("tps"):
                d[str(mid)] = {"tps": round(float(cur["tps"]) * 0.6 + tps * 0.4, 2), "n": int(cur.get("n") or 1) + 1,
                               "cpu": bool(cpu), "at": int(time.time())}
            else:
                d[str(mid)] = {"tps": round(tps, 2), "n": 1, "cpu": bool(cpu), "at": int(time.time())}
            tmp = str(p) + ".part"
            with open(tmp, "w", encoding="utf-8") as fh:
                json.dump(d, fh)
            os.replace(tmp, str(p))
    except Exception:
        log_problem("share: could not keep a measured speed", sys.exc_info())


# ---- what the lender has chosen ----
def _lend_opts():
    """(memory for lent models: "auto" or 8192...65536, graphics: "auto", "cpu" or "gpu"), from the sharing settings."""
    c = _share_cfg()
    try:
        ctx = int(c.get("ctx"))
        ctx = ctx if ctx in _LEND_CTX_CHOICES else "auto"
    except Exception:
        ctx = "auto"
    gpu = c.get("gpu") if c.get("gpu") in ("auto", "cpu", "gpu") else "auto"
    return ctx, gpu


def _share_option_set(key, value):
    """The two choices the lender makes in Settings: ctx (Memory for lent models) and gpu (Graphics). Takes effect when the next
    model is loaded. Returns the sharing status, or {ok: false, error}."""
    with _LEND_OPT_LOCK:        # two choices made at once must both be kept
        c = _share_cfg()
        if key == "ctx":
            v = str(value).strip().lower()
            if v in ("auto", ""):
                c.pop("ctx", None)
            else:
                try:
                    n = int(float(v))
                except Exception:
                    n = 0
                if n not in _LEND_CTX_CHOICES:
                    return {"ok": False, "error": "That memory size is not one of the choices."}
                c["ctx"] = n
        elif key == "gpu":
            if value not in ("auto", "cpu", "gpu"):
                return {"ok": False, "error": "That is not one of the graphics choices."}
            c["gpu"] = value
        else:
            return {"ok": False, "error": "That setting is not known."}
        _share_cfg_save(c)
    return _share_status()


def _lend_ctx_for(m, client=None):
    """The memory a lent model is started with: the lender's choice, else the fit to this computer's memory; what the other
    device asked for (ingenium_ctx) is cut down to it."""
    chosen = _lend_opts()[0]
    fit = int(chosen) if chosen != "auto" else _share_fit_ctx(m, _lend_ram()[0])
    if client:
        try:
            fit = max(2048, min(int(client), fit))
        except Exception:
            pass
    return fit


def _lend_loaded_ctx(mid):
    """The memory of the engine that is running this model right now, or None."""
    with _ENGINE_LOCK:
        a, p = _ENGINE.get("args"), _ENGINE.get("proc")
        if a and len(a) > 1 and p is not None and p.poll() is None and str(_ENGINE.get("model_id")) == str(mid):
            try:
                return int(a[1])
            except Exception:
                return None
    return None


# ---- the processor or the graphics chip ----
def _lend_gfx_strong(dev):
    """True for a real graphics card, or Apple's chip; False for a small chip that shares the computer's memory."""
    n = str(dev.get("name") or "").lower()
    did = str(dev.get("id") or "").lower()
    if _LEND_GFX_WEAK.search(n):
        return False
    if did.startswith(("mtl", "metal")):
        return "apple" in n or "radeon" in n or "amd" in n
    if not _LEND_GFX_CARD.search(n):
        return False
    mib = dev.get("mib")
    return mib is None or mib >= 4000     # a card with less memory than that does not help a model


def _engine_gpu_pick(d, want=True, wait=False):
    """Which graphics chip the engine is to use, if any: (its name, whether to use it, the reason in plain words). With wait,
    the first listing of the chips (a few seconds, once) is waited for, so a small chip is never used by the first start."""
    name, use, why, ids = _lend_gpu_choice(d, want, wait)
    _LEND_GPU_IDS[0] = ids
    return name, use, why


def _lend_gpu_choice(d, want, wait):
    policy = _lend_opts()[1]
    if not want:
        return "", False, "Asked to run on the processor.", ""
    devs = _engine_devices(d) if d else []
    if devs is None and wait and policy != "cpu":
        t0 = time.time()
        while devs is None and time.time() - t0 < 45:
            time.sleep(0.25)
            devs = _engine_devices(d)
    if devs is None:       # still being listed: the guess this app always made
        guess = ""
        if d and (_engine_platform() == "macos-arm64" or os.path.isfile(os.path.join(d, "ggml-vulkan.dll"))):
            guess = "Metal" if _engine_platform() == "macos-arm64" else "Vulkan"
        if policy == "cpu":
            return guess, False, "You chose Processor only in the sharing settings.", ""
        return guess, bool(guess) and not (policy == "auto" and _LEND_GPU_OFF["off"]), "Still looking at the graphics chip.", ""
    if not devs:
        return "", False, "This computer has no graphics chip the engine can use, so the processor does the work.", ""
    if policy == "cpu":
        return devs[0]["name"], False, "You chose Processor only in the sharing settings.", ""
    if policy == "gpu":
        return devs[0]["name"], True, "Graphics chip, as you chose in the sharing settings (%s)." % devs[0]["name"], ""
    if _LEND_GPU_OFF["off"]:
        return devs[0]["name"], False, "The graphics chip stopped during an answer, so the processor does the work until Ingenium is closed.", ""
    strong = [x for x in devs if _lend_gfx_strong(x)]
    if strong:
        ids = ",".join(x["id"] for x in strong) if len(strong) < len(devs) else ""
        return strong[0]["name"], True, "Using the graphics card (%s)." % strong[0]["name"], ids
    return devs[0]["name"], False, ("This computer's graphics chip (%s) is a small one that shares the computer's memory, so the "
                                    "processor does the work. That is usually quicker and steadier." % devs[0]["name"]), ""


def _lend_cpu_only():
    """True when lent models run on the processor alone (as far as can be told before one is loaded)."""
    d = _engine_dir()
    if not d:
        return True
    return not _engine_gpu_pick(d, True, wait=False)[1]


def _lend_options_view():
    """What the sharing settings show of the choices above, and of the engine right now."""
    ctx, gpu = _lend_opts()
    total, free = _lend_ram()
    d = _engine_dir()
    name, use, why = _engine_gpu_pick(d, True, wait=False) if d else ("", False, "This copy of the app carries no engine.")
    with _ENGINE_LOCK:
        running = _ENGINE.get("proc") is not None and _ENGINE.get("state") in ("loading", "ready")
        on_chip = bool(_ENGINE.get("gpu"))
        why_run, note = str(_ENGINE.get("gpu_why") or ""), str(_ENGINE.get("note") or "")
    if running:
        if not on_chip and use:
            why = note or "The graphics chip could not be used, so the processor is working."
        elif why_run:
            why = why_run
    using = ("gpu" if on_chip else "cpu") if running else ("gpu" if use else "cpu")
    return {"ctx": ctx, "ctx_choices": list(_LEND_CTX_CHOICES), "gpu": gpu,
            "gpu_now": {"using": using, "name": name, "why": why, "running": running},
            "ram_gb": total, "ram_free_gb": free, "cpu_only": not use, "api": _LEND_API, "platform": sys.platform,
            "devices": [{"name": x.get("name"), "mib": x.get("mib")} for x in (_engine_devices(d) or [])] if d else []}


# ---- the model list, as the other devices see it ----
def _share_models_full():
    """The models this computer can lend, each with its window, longest reply, advice and speed."""
    total, _free = _lend_ram()
    cpu_only = _lend_cpu_only()
    speeds = _lend_speed_all()
    out = []
    for m in _share_models():
        loaded = _lend_loaded_ctx(m["id"])
        ctx = loaded or _lend_ctx_for(m)
        rec = speeds.get(str(m["id"]))
        meas = float(rec["tps"]) if isinstance(rec, dict) and rec.get("cpu") == cpu_only and rec.get("tps") else None
        tps = meas or _lend_est_tps(m, not cpu_only)
        out.append(dict(m, context_length=ctx, max_tokens=max(256, ctx - 256), loaded=bool(loaded),
                        advice=_share_advice(m, total, cpu_only, meas), tps=round(tps, 1), tps_measured=bool(meas)))
    return out


def _share_advise(models):
    """For the lender's list of what suits this computer: each {name, size, lineup, file, id} given gets back its advice, its
    window at this memory, the memory it needs, and its speed (measured here if it is one of the models kept here)."""
    total, _free = _lend_ram()
    cpu_only = _lend_cpu_only()
    speeds = _lend_speed_all()
    out = []
    for x in (models or [])[:200]:
        try:
            m = {"id": str(x.get("id") or ""), "name": str(x.get("name") or ""), "file": str(x.get("file") or ""),
                 "lineup": str(x.get("lineup") or ""), "size": int(x.get("size") or 0)}
        except Exception:
            out.append({})
            continue
        rec = speeds.get(m["id"]) if m["id"] else None
        meas = float(rec["tps"]) if isinstance(rec, dict) and rec.get("cpu") == cpu_only and rec.get("tps") else None
        ctx = _share_fit_ctx(m, total)
        out.append({"advice": _share_advice(m, total, cpu_only, meas), "ctx": ctx, "need_gb": round(_lend_need_gb(m, ctx), 1),
                    "tps": round(meas or _lend_est_tps(m, not cpu_only), 1), "tps_measured": bool(meas)})
    return out


def _lend_info(info):
    """What /ingenium/info says: the engine, and how this computer is lending."""
    total, free = _lend_ram()
    ctx_set = _lend_opts()[0]
    d = _engine_dir()
    name, use, why = _engine_gpu_pick(d, True, wait=False) if d else ("", False, "")
    with _ENGINE_LOCK:
        ready = _ENGINE.get("state") == "ready" and _ENGINE.get("proc") is not None
        mid = _ENGINE.get("model_id") if ready else None
        args = _ENGINE.get("args") or ()
        on_chip = bool(_ENGINE.get("gpu"))
    busy, queued = _lend_q_counts()
    return {"app": APP_NAME, "computer": _share_computer_name(), "models": len(_share_models()),
            "engine": info.get("version") or "", "available": bool(info.get("available")),
            "platform": info.get("platform") or "", "gpu": info.get("gpu") or "", "loaded": mid,
            "ctx": int(args[1]) if ready and len(args) > 1 else None,
            "ctx_default": int(ctx_set) if ctx_set != "auto" else 32768,
            "ram_gb": total, "ram_free_gb": free, "cpu_only": not use, "gpu_used": on_chip if ready else bool(use),
            "gpu_name": name if use else "", "gpu_why": why, "busy": busy, "queued": queued, "version": _LEND_API}


# ---- one device at a time, first come first served ----
def _lend_q_join():
    """A place in the line, or None when four are waiting already."""
    with _LEND_Q["cv"]:
        if len(_LEND_Q["line"]) >= _LEND_QUEUE_MAX:
            return None
        _LEND_Q["n"] += 1
        t = {"n": _LEND_Q["n"], "at": time.time(), "state": "queued", "t_load": time.time(), "note": "", "pick": None}
        _LEND_Q["line"].append(t)
        return t


def _lend_q_ahead(t):
    """How many are in front of this one: the one being answered, and those who came first."""
    with _LEND_Q["cv"]:
        line = _LEND_Q["line"]
        return (1 if _LEND_Q["now"] is not None else 0) + (line.index(t) if t in line else 0)


def _lend_q_counts():
    """(being answered, waiting): 0 or 1, and how many."""
    with _LEND_Q["cv"]:
        return (1 if _LEND_Q["now"] is not None else 0), len(_LEND_Q["line"])


def _lend_q_wait(t, out):
    """Waits for this request's turn. True when it comes; False when the device went away or waited too long."""
    cv = _LEND_Q["cv"]
    with cv:
        while True:
            if out.gone:
                return False
            if _LEND_Q["now"] is None and _LEND_Q["line"] and _LEND_Q["line"][0] is t:
                _LEND_Q["line"].pop(0)
                _LEND_Q["now"] = t
                t["state"] = "loading"
                t["t_load"] = time.time()
                return True
            if time.time() - t["at"] > _LEND_QUEUE_WAIT:
                return False
            cv.wait(0.4)


def _lend_q_done(t):
    cv = _LEND_Q["cv"]
    with cv:
        if t in _LEND_Q["line"]:
            _LEND_Q["line"].remove(t)
        if _LEND_Q["now"] is t:
            _LEND_Q["now"] = None
        cv.notify_all()


def _lend_state(t, out):
    """The status line a quiet stream is sent now, or None when there is nothing to say (the answer has begun)."""
    if out.answering:
        return None
    st = t.get("state")
    if st == "queued":
        a = _lend_q_ahead(t)
        return {"state": "queued", "ahead": a} if a else None
    s = None
    if st == "loading":
        s = {"state": "loading", "seconds": int(time.time() - t.get("t_load", time.time())), "model": (t.get("pick") or {}).get("name", "")}
    elif st == "reading":
        s = dict(out.progress or {"state": "reading"})
    if s is not None and t.get("note"):
        s["note"] = t["note"]
    return s


# ---- what one lent request says to the device that asked ----
class _LendGone(Exception):
    """The device that asked has gone away."""


class _LendStream(object):
    """The answer to one lent request, on its way to the device that asked. Pieces go out one at a time; a stream that has been
    quiet for a while is sent a ": waiting" line (which also finds out that the device has gone); a device that asked for them
    gets status lines; the engine's progress lines become "reading" lines. A device that has gone frees the engine at once."""

    def __init__(self, sink, tick, status_on):
        self.sink, self.tick, self.status_on = sink, float(tick), bool(status_on)
        self.lock = threading.Lock()
        self.stop = threading.Event()
        self.last = time.time()
        self.opened = self.gone = self.ended = False
        self.conn = None              # the connection to the engine
        self.state_fn = None
        self.thread = None
        self.buf = b""
        self.done = self.finished = self.answering = False
        self.progress = None
        self.tokens = 0
        self.t_first = self.t_last = None
        self.tps = None

    def head(self, code, ctype, model_id=None):
        with self.lock:
            if self.opened:
                return
            self.sink.head(code, ctype, model_id)
            self.opened = True
            self.last = time.time()

    def start(self):
        self.thread = threading.Thread(target=self._run, daemon=True)
        self.thread.start()

    def _run(self):
        step = min(1.0, max(0.02, self.tick / 4.0))
        while not self.stop.wait(step):
            if self.gone or self.ended:
                return
            if time.time() - self.last >= self.tick:
                self.raw(b": waiting\n\n")
                s = self.state_fn() if (self.status_on and self.state_fn and not self.gone) else None
                if s:
                    self._line(s)

    def close(self):
        self.stop.set()
        if self.thread is not None and self.thread is not threading.current_thread():
            self.thread.join(2)

    def _lost(self):
        self.gone = True
        c = self.conn
        try:
            if c is not None and c.sock is not None:
                import socket
                c.sock.shutdown(socket.SHUT_RDWR)
        except Exception:
            pass

    def raw(self, b):
        if self.gone or self.ended:
            return False
        try:
            with self.lock:
                self.sink.write(b)
                self.last = time.time()
            return True
        except Exception:
            self._lost()
            return False

    def _line(self, kw):
        if self.status_on and self.opened:
            self.raw(b"data: " + json.dumps({"ingenium": kw}).encode("utf-8") + b"\n\n")

    def status(self, **kw):
        self._line(kw)

    def error_inband(self, code, msg, extra=None):
        """An error after the head went out: it goes in the stream, then [DONE], so it can never look like a finished reply."""
        err = {"message": msg, "code": code}
        err.update(extra or {})
        self.raw(b"data: " + json.dumps({"error": err}).encode("utf-8") + b"\n\n")
        self.raw(b"data: [DONE]\n\n")

    def end(self):
        if self.ended:
            return
        self.ended = True
        try:
            with self.lock:
                self.sink.end()
        except Exception:
            pass

    def feed(self, piece):
        """Pieces of the engine's stream in; whole events out, the engine's progress lines turned into "reading" lines."""
        self.buf += piece
        while True:
            m = _LEND_SEP.search(self.buf)
            if not m:
                if len(self.buf) > 1048576:
                    self.raw(self.buf)
                    self.buf = b""
                return
            ev, self.buf = self.buf[:m.end()], self.buf[m.end():]
            self._event(ev)

    def _event(self, ev):
        s = ev.strip()
        if s.startswith(b"data:"):
            data = s[5:].strip()
            if data == b"[DONE]":
                self.done = True
            elif b"prompt_progress" in data:
                p = self._progress(data)
                if p is not None:
                    self.progress = p
                    self.status(**p)
                    return
            elif data[:1] == b"{":
                if not self.answering:
                    self.answering = True
                    self.t_first = time.time()
                    self.status(state="answering")
                if _LEND_FIN.search(data):
                    self.finished = True
                if b'"timings"' in data:
                    self._timings(data)
                if b'"content"' in data and b'"content":""' not in data and b'"content":null' not in data:
                    self.tokens += 1
                    self.t_last = time.time()
        self.raw(ev)

    @staticmethod
    def _progress(data):
        try:
            j = json.loads(data.decode("utf-8", "replace"))
            pp = j.get("prompt_progress") or ((j.get("choices") or [{}])[0] or {}).get("prompt_progress") or {}
            total, cache, done = int(pp.get("total") or 0), int(pp.get("cache") or 0), int(pp.get("processed") or 0)
        except Exception:
            return None
        pct = 100 if total <= cache else int(max(0, min(100, round(100.0 * (done - cache) / (total - cache)))))
        return {"state": "reading", "percent": pct, "processed": done, "total": total}

    def _timings(self, data):
        try:
            tm = json.loads(data.decode("utf-8", "replace")).get("timings") or {}
            if int(tm.get("predicted_n") or 0) >= 8 and float(tm.get("predicted_per_second") or 0) > 0:
                self.tps = float(tm["predicted_per_second"])
        except Exception:
            pass

    def speed(self):
        """Words a second of this reply: the engine's own count, else tokens over the time they took."""
        if self.tps:
            return self.tps
        if self.tokens >= 8 and self.t_first and self.t_last and self.t_last - self.t_first >= 1.0:
            return (self.tokens - 1) / (self.t_last - self.t_first)
        return None


def _lend_fail(out, sink, code, msg):
    """An error as the device should see it: a plain answer if nothing was sent yet, else inside the stream."""
    if out.opened:
        out.error_inband(code, msg)
        out.end()
    else:
        out.ended = True
        sink.error(code, msg)


def _lend_http_error(out, code, txt):
    """The engine answered with an error (a message too long for the memory, say): handed on as it came, or inside the stream."""
    msg, err = txt, {}
    try:
        j = json.loads(txt)
        e = j.get("error") if isinstance(j, dict) else None
        if isinstance(e, dict):
            err, msg = e, str(e.get("message") or txt)
        elif isinstance(e, str):
            msg = e
    except Exception:
        pass
    if out.opened:
        out.error_inband(code, msg, {k: v for k, v in err.items() if k not in ("message", "code")})
    else:
        out.head(code, "application/json")
        out.raw(txt.encode("utf-8"))
    out.end()


def _lend_wait_ready(mid, out, ticket, timeout=1200):
    """Waits until the engine has this model ready, telling the device about any change the engine made (it started again
    on the processor, say). Raises RuntimeError with the reason when the engine gives up, _LendGone when the device left."""
    t0 = time.time()
    seen = ""
    while time.time() - t0 < timeout:
        if out.gone:
            raise _LendGone()
        st = _engine_status()
        note = st.get("note") or ""
        if note and note != seen:
            seen = note
            ticket["note"] = note
            out.status(state="loading", model=(ticket.get("pick") or {}).get("name", ""), note=note)
        if st.get("state") == "ready" and str(st.get("model_id")) == mid:
            return st
        if st.get("state") in ("error", "off"):
            raise RuntimeError(st.get("error") or "the engine stopped")
        time.sleep(0.4)
    raise RuntimeError("the model was still loading after 20 minutes")


def _lend_engine_for(pick, want_ctx, proj, out, ticket):
    """The engine with this model ready, holding at least the memory the lender wants: started (or started again, when it is idle
    and holds less) if it is not. This request holds the turn, so no other device's reply is in the way."""
    with _ENGINE_LOCK:
        p = _ENGINE.get("proc")
    if p is not None and p.poll() is not None:
        _engine_status()          # an engine that stopped is started again by its own check (once), or cleared
    with _ENGINE_LOCK:
        p, args = _ENGINE.get("proc"), (_ENGINE.get("args") or ())
        same = str(_ENGINE.get("model_id")) == pick["id"] and p is not None and p.poll() is None
    if same and proj and not (len(args) > 2 and args[2]):
        same = False              # running without its picture reader
    if same and want_ctx and len(args) > 1 and int(args[1]) < int(want_ctx):
        same = False              # idle, and it holds less than this computer can give it
    if not same:
        r = _engine_start(pick["id"], want_ctx, proj)
        if not r.get("ok"):
            raise RuntimeError(r.get("error") or "the engine could not start")
    return _lend_wait_ready(pick["id"], out, ticket)


def _lend_engine_dead():
    """True when the engine process has stopped (a moment is allowed for it to be seen to have stopped)."""
    for _ in range(10):
        with _ENGINE_LOCK:
            p = _ENGINE.get("proc")
        if p is not None and p.poll() is not None:
            return True
        time.sleep(0.05)
    return False


def _lend_pass(out, port, data, pick, stream, ticket):
    """Asks the engine and hands its answer on, piece by piece. Returns "retry" when the engine stopped before any of the
    answer went out (the caller then asks the engine again, started again), else None."""
    import http.client
    conn = http.client.HTTPConnection("127.0.0.1", port, timeout=1800)
    out.conn = conn
    try:
        try:
            conn.request("POST", "/v1/chat/completions", body=data,
                         headers={"content-type": "application/json", "authorization": "Bearer " + _ENGINE_SECRET})
            resp = conn.getresponse()
        except Exception as e:
            if out.gone:
                return
            if not ticket.get("retried") and _lend_engine_dead():
                return "retry"
            _lend_fail(out, out.sink, 503, "The engine on this computer did not answer: %s" % (str(e) or type(e).__name__))
            return
        code = resp.status
        ctype = resp.getheader("Content-Type") or ""
        if code >= 400:
            _lend_http_error(out, code, resp.read(200000).decode("utf-8", "replace"))
            return
        sse = stream and "text/event-stream" in ctype
        if not out.opened:
            out.head(code, ctype or "application/json", pick["id"])
        cut = False
        while not out.gone:
            try:
                piece = resp.read1(65536) if hasattr(resp, "read1") else resp.read(4096)
            except Exception:
                cut = not out.gone
                break
            if not piece:
                break
            if sse:
                out.feed(piece)
            else:
                out.raw(piece)
        if out.gone:
            return
        if sse and out.buf:
            out.raw(out.buf)
            out.buf = b""
        if sse and (cut or not (out.done or out.finished)):
            dead = _lend_engine_dead()
            if dead and not out.answering and not ticket.get("retried"):
                return "retry"
            out.error_inband(503, ("The engine on this computer stopped while it was answering. Ask again: it starts again by itself."
                                   if dead else "The reply was cut short on this computer. Ask again."),
                             {"type": "engine_stopped" if dead else "cut_short"})
        else:
            tps = out.speed()
            if tps:
                _lend_speed_note(pick["id"], tps, not bool(_ENGINE.get("gpu")))
        out.end()
    finally:
        out.conn = None
        try:
            conn.close()
        except Exception:
            pass


def _share_answer(body, sink):
    """R97, 6.9.3: one request in the common chat format, answered by this computer's own engine and streamed to `sink` (a device
    that asked directly, or one this computer calls). Devices are served one at a time, first come first served. A request that
    streams gets its head at once; a quiet stream gets a ": waiting" line; a device that sent ingenium_status gets status lines.
    It loads the model asked for when another one is running, but never while another device's reply is being written."""
    want = str(body.pop("model", "") or "")
    ctx = body.pop("ingenium_ctx", None)
    status_on = bool(body.pop("ingenium_status", False))
    ms = _share_models()
    pick = None
    for m in ms:
        if want and want in (m["id"], m["name"], m["file"], m.get("lineup")):
            pick = m
            break
    if pick is None:
        with _ENGINE_LOCK:
            cur = _ENGINE.get("model_id") if _ENGINE.get("state") == "ready" else None
        pick = next((m for m in ms if m["id"] == cur), None) if not want else None
    if pick is None:
        return sink.error(404, "This computer has no model called %r. The model list shows the ones it has." % want)
    stream = bool(body.get("stream"))
    if stream and "return_progress" not in body:
        body["return_progress"] = True       # the engine then reports how far it has read, after every batch
    ticket = _lend_q_join()
    if ticket is None:
        return sink.error(503, "This computer is answering other devices and %d are already waiting. Try again in a minute." % _LEND_QUEUE_MAX)
    ticket["pick"] = pick
    out = _LendStream(sink, _lend_tick(), status_on and stream)
    out.state_fn = lambda: _lend_state(ticket, out)
    try:
        if stream:
            out.head(200, "text/event-stream", pick["id"])
            out.start()
            ahead = _lend_q_ahead(ticket)
            if ahead:
                out.status(state="queued", ahead=ahead)
        if not _lend_q_wait(ticket, out):
            if not out.gone:
                _lend_fail(out, sink, 503, "Other devices kept this computer busy for half an hour. Try again later.")
            return
        out.status(state="loading", model=pick["name"])
        has_pic = any(isinstance(m, dict) and isinstance(m.get("content"), list) and
                      any(isinstance(c, dict) and c.get("type") in ("image_url", "input_image") for c in m["content"])
                      for m in (body.get("messages") or []))
        proj = _mmproj_for(pick["id"]) if has_pic else None
        data = json.dumps(body).encode("utf-8")
        while True:
            try:
                st = _lend_engine_for(pick, _lend_ctx_for(pick, ctx), proj, out, ticket)
            except _LendGone:
                return
            except Exception as e:
                return _lend_fail(out, sink, 503, "The model could not be loaded on the sharing computer: %s" % e)
            ticket["state"] = "reading"
            out.status(state="reading")
            if _lend_pass(out, st["port"], data, pick, stream, ticket) != "retry":
                break
            # the engine stopped before any of the answer went out: it is started again (on the processor if the chip was the
            # reason), the device is told so, and the same message is asked once more
            ticket["retried"] = True
            ticket["state"] = "loading"
            ticket["t_load"] = time.time()
            out.status(state="loading", model=pick["name"])
    except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError, _LendGone):
        pass   # the other device stopped the reply
    except Exception as e:
        log_problem("share: a request failed", sys.exc_info())
        try:
            _lend_fail(out, sink, 500, str(e))
        except Exception:
            pass
    finally:
        out.close()
        out.end()
        _lend_q_done(ticket)


'''

# ---- the exact text this patch replaces, and what it puts there ----
ANSWER_SHA1 = "f2d5486cb642a2673a1dc2252ef0e6f8ba3bdb3b"       # the old _share_answer, def line to the line before _share_start

GPU_OLD = '''def _engine_gpu(d):
    """The graphics chip the engine can use, or "" for the processor alone."""
    devs = _engine_devices(d) if d else []
    if devs:
        return devs[0]["name"]
    if devs is None and d and (_engine_platform() == "macos-arm64" or
                               os.path.isfile(os.path.join(d, "ggml-vulkan.dll"))):
        return "Metal" if _engine_platform() == "macos-arm64" else "Vulkan"
    return ""
'''
GPU_NEW = '''def _engine_gpu(d):
    """The graphics chip the engine is to use, or "" for the processor alone. 6.9.3: a small chip that shares the computer's
    memory is not used, and the sharing settings can say Processor only or Graphics chip (_engine_gpu_pick)."""
    name, use, _why = _engine_gpu_pick(d, True, wait=False)
    return name if use else ""
'''

SHELL_OLD = "    def share_firewall_allow(self):\n        return _share_firewall_allow()\n"
SHELL_NEW = SHELL_OLD + '''
    # 6.9.3: how this computer lends (app_lend_693.py)
    def share_option_set(self, key, value):
        return _share_option_set(str(key), value)

    def share_advise(self, models):
        return _share_advise(models)
'''


def apply(s):
    """The patched text of ingenium_app.py; SystemExit with the reason if the file is not the shape this patch knows."""
    if MARK in s:
        return s

    def rep(old, new, n=1, what=""):
        nonlocal s
        c = s.count(old)
        if c != n:
            sys.exit("app_lend_693: %s found %d times, not %d: %r" % (what or "text", c, n, old[:80]))
        s = s.replace(old, new)

    # 1. the graphics chip: the policy, and a small chip that shares the computer's memory is left alone
    rep(GPU_OLD, GPU_NEW, 1, "_engine_gpu")
    # 2. the processor: the engine's other chips left out (--device none), short batches so it reports its reading often
    rep('''    if not use_gpu:
        args += ["-ngl", "0"]
    if mmp:''', '''    if not use_gpu:
        args += ["--device", "none", "-ngl", "0", "-b", "512"]    # 6.9.3: no chip at all; short batches, so the engine reports often
    elif _LEND_GPU_IDS[0]:
        args += ["--device", _LEND_GPU_IDS[0]]                    # only the real cards, not the small chip beside them
    if mmp:''', 1, "the engine's -ngl 0")
    # 3. a start: the policy decides, the first listing of the chips is waited for, and the reason is kept
    rep('''    gpu_name = _engine_gpu(d)
    use_gpu = bool(gpu) and bool(gpu_name)
''', '''    gpu_name, use_gpu, gpu_why = _engine_gpu_pick(d, gpu, wait=True)    # 6.9.3
''', 1, "the engine start's graphics line")
    rep("    key = (path, n_ctx, mmp, drafter)\n", "    key = (path, n_ctx, mmp, drafter, bool(use_gpu))\n", 1, "the engine start's key")
    rep('''                       gpu=gpu_name if use_gpu else "", draft=bool(drafter), kvq=_engine_kvq(n_ctx))''',
        '''                       gpu=gpu_name if use_gpu else "", draft=bool(drafter), kvq=_engine_kvq(n_ctx),
                       gpu_why=gpu_why, revived=0)''', 1, "the engine start's record")
    # 4. an engine that stops: a chip that gave way is left alone from then on, and an engine that stops after it was ready
    #    is started again once (on the processor if it had been using the chip)
    rep('''                    proc, port2, _a = _engine_launch(args[0], args[1], args[2], False, args[3] if len(args) > 3 else None)
''', '''                    if "not enough memory" not in err:
                        _LEND_GPU_OFF.update(off=True, why=err)       # 6.9.3: a chip that failed is left alone for the rest of the run
                    proc, port2, _a = _engine_launch(args[0], args[1], args[2], False, args[3] if len(args) > 3 else None)
''', 1, "the processor-only retry")
    rep('''        with _ENGINE_LOCK:
            if _ENGINE["proc"] is p:
                _ENGINE.update(proc=None, port=None, key=None, args=None, state="error", error=err, gpu="")
        return {"state": "error", "error": err, "log": tail}
''', '''        # 6.9.3: an engine that stops AFTER it was ready (a chip that gave way under a long message, or a crash) is started again
        # once, on the processor alone if it had been using the chip; the chip is then left alone for the rest of this run
        if state == "ready":
            with _ENGINE_LOCK:
                args = _ENGINE["args"] if _ENGINE["proc"] is p else None
                revived = int(_ENGINE.get("revived") or 0)
            if args and revived < 1:
                if gpu:
                    _LEND_GPU_OFF.update(off=True, why=err)
                note = ("The graphics chip stopped, so this computer now uses its processor (slower)." if gpu
                        else "The engine stopped, so it was started again.")
                try:
                    proc, port2, _a = _engine_launch(args[0], args[1], args[2], False, None)
                    with _ENGINE_LOCK:
                        if _ENGINE["proc"] is p:
                            _ENGINE.update(proc=proc, port=port2, state="loading", log=[], gpu="", draft=False, revived=revived + 1,
                                           args=(args[0], args[1], args[2], None), key=(args[0], args[1], args[2], None, False),
                                           note=note, gpu_why=note, started=time.time())
                    return {"state": "loading", "port": port2, "model_id": model_id, "log": [], "seconds": 0.0, "note": note}
                except Exception:
                    log_problem("engine: the restart after a stop could not start", sys.exc_info())
        with _ENGINE_LOCK:
            if _ENGINE["proc"] is p:
                _ENGINE.update(proc=None, port=None, key=None, args=None, state="error", error=err, gpu="")
        return {"state": "error", "error": err, "log": tail}
''', 1, "the engine's last fall-through")
    # 5. the gateway: only a code that was sent and was wrong counts toward the lock; the lists say more
    rep('''            got = (self.headers.get("Authorization") or "").replace("Bearer ", "", 1).strip()
            import hmac as _hmac
            if not _hmac.compare_digest(_share_norm(got), _share_norm(_share_code())):
                with _SHARE_LOCK:
                    _SHARE["fails"].setdefault(ip, []).append(now)
''', '''            got = (self.headers.get("Authorization") or "").replace("Bearer ", "", 1).strip()
            import hmac as _hmac
            if not _hmac.compare_digest(_share_norm(got), _share_norm(_share_code())):
                if got:       # 6.9.3: only a code that was sent and was wrong counts (a browser visit sends none)
                    with _SHARE_LOCK:
                        _SHARE["fails"].setdefault(ip, []).append(now)
''', 1, "the lock's counting")
    rep('''"lends": lend, "models": len(_share_models()) if lend else 0, "callins": True})''',
        '''"lends": lend, "models": len(_share_models()) if lend else 0, "callins": True, "api": _LEND_API})''', 1, "hello")
    rep('''                ms = _share_models()
                return self._json(200, {"object": "list", "data": [dict(m, object="model", owned_by=_share_computer_name() or "ingenium")''',
        '''                ms = _share_models_full()
                return self._json(200, {"object": "list", "data": [dict(m, object="model", owned_by=_share_computer_name() or "ingenium")''',
        1, "the model list")
    rep('''                info = _engine_info()
                return self._json(200, {"app": APP_NAME, "computer": _share_computer_name(), "models": len(_share_models()),
                                        "engine": info.get("version") or "", "available": bool(info.get("available")),
                                        "platform": info.get("platform") or "", "gpu": info.get("gpu") or "",
                                        "loaded": _ENGINE.get("model_id") if _ENGINE.get("state") == "ready" else None})
''', '''                return self._json(200, _lend_info(_engine_info()))
''', 1, "/ingenium/info")
    # 6. the answer: the whole old function goes, with a check that it is the one this patch knows
    a = s.index("def _share_answer(body, sink):")
    b = s.index("def _share_start():", a)
    if hashlib.sha1(s[a:b].encode("utf-8")).hexdigest() != ANSWER_SHA1:
        sys.exit("app_lend_693: _share_answer is not the text this patch knows")
    s = s[:a] + CODE + s[b:]
    # 7. the status: who is waiting, and the choices
    rep('''        port, busy, err = _SHARE["port"], _SHARE["busy"], _SHARE["error"]
''', '''        port, err = _SHARE["port"], _SHARE["error"]
        busy, queued = _lend_q_counts()
''', 1, "the status's busy")
    rep('''"callins": _callin_list(), "callouts": _callout_list(), "firewall": _share_firewall()}''',
        '''"callins": _callin_list(), "callouts": _callout_list(), "firewall": _share_firewall(),
            "queued": queued, "options": _lend_options_view()}''', 1, "the status's list")
    # 8. the call-in route: the lender's models carry their windows and advice; the 45 seconds are the time to pick up; a reply
    #    nobody waits for is not read to its end
    rep('''"models": _share_models()}).encode("utf-8")''', '''"models": _share_models_full()}).encode("utf-8")''', 1, "the call-out's model list")
    rep('''            first = out.get(timeout=45)
        except _queue.Empty:
            return h._err(504, "%s did not pick the request up. Check that Ingenium is open there." % who)''',
        '''            first = out.get(timeout=_LEND_PICKUP_WAIT)
        except _queue.Empty:
            return h._err(504, "%s did not pick the request up in %d seconds. Check that Ingenium is open there and still lends to this computer."
                          % (who, int(_LEND_PICKUP_WAIT)))''', 1, "the call-in 504")
    rep('''            for piece in _callin_read_chunked(h.rfile):
                out.put(("data", piece))
''', '''            for piece in _callin_read_chunked(h.rfile):
                out.put(("data", piece))
                with _CALLIN_LOCK:
                    waiting = jid in _CALLIN_JOBS
                if not waiting:       # 6.9.3: the device that asked has gone: stop reading, so the lender finds out at its next write
                    return h._err(410, "Nobody is waiting for this reply any more.")
''', 1, "the call-in reply")
    # 9. the shell's two classes
    rep(SHELL_OLD, SHELL_NEW, 2, "share_firewall_allow")
    return s


def main(argv):
    p = argv[1]
    s = open(p, encoding="utf-8").read()
    if MARK in s:
        print("lend: already in", p)
        return 0
    new = apply(s)
    compile(new, p, "exec")                  # a patch that does not compile is never written
    open(p, "w", encoding="utf-8", newline="\n").write(new)
    print("lend: added to", p)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
