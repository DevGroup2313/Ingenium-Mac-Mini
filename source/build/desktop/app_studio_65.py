"""Ingenium 6.6: train a model you have further, on your own text (patch for ingenium_app.py, Mac and Windows; applied after
app_train_65.py).

The owner's words (23 October 2026): "I want Ingenium to be able to create and train frontier level models inside of the
app." Training from zero teaches a model only what one text holds. Starting from an open model that already writes well
(SmolLM2 135M or 360M, Apache 2.0, from Hugging Face's own team) and training it further on the owner's text keeps what it
knew and teaches it the text's way of writing. llama.cpp's trainer takes a model in 32-bit numbers, so a model in 16 bits
(F16, BF16) or 8 bits (Q8_0) is widened first, exactly (source/rig/train_sizes.txt, part 3); a model packed smaller (Q4 and
the like) cannot be widened without loss, and the app says so. The trainer then runs as for a model trained from zero, more
gently, and the result joins the person's models beside the one it came from, never in its place.

    python3 build/desktop/app_studio_65.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()
if "_gguf_to_f32" in s:
    print("already patched", p)
    sys.exit(0)
if "TRAIN_LR_MORE" not in s:
    sys.exit("%s: apply app_train_65.py first" % p)


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


# the learning rates for a model started from one the person has (measured on SmolLM2 135M, .github/workflows/studio-check.yml)
rep('''"large": (3e-5, 3e-6)}
TRAIN_LR_MORE = {''', '''"large": (3e-5, 3e-6), "base": (1e-5, 1e-6)}
TRAIN_LR_MORE = {''')
rep('''"large": (1e-5, 1e-6)}
# the batch is the context''', '''"large": (1e-5, 1e-6), "base": (5e-6, 5e-7)}
# the batch is the context''')
# a model that already writes well is moved by the average of several batches at a time, so one batch's quirks do not
# pull every weight (llama.cpp's "period": batches gathered before each step of the optimiser)
rep('''TRAIN_CTX = 256
''', '''TRAIN_CTX = 256
TRAIN_PERIOD = {"base": 8}
''')
rep('''"-b", str(TRAIN_CTX),''', '''"-b", str(TRAIN_CTX * TRAIN_PERIOD.get(size, 1)),''')

STUDIO = r'''

# ---------------------------------------------------------------- 6.6: a model you have, trained further (app_studio_65.py)
_GGUF_FIXED = {0: 1, 1: 1, 2: 2, 3: 2, 4: 4, 5: 4, 6: 4, 7: 1, 10: 8, 11: 8, 12: 8}
_GGUF_WIDENS = {0: "F32", 1: "F16", 8: "Q8_0", 30: "BF16"}   # the forms widened exactly to 32 bits


def _gguf_skip(b, p, t):
    if t in _GGUF_FIXED:
        return p + _GGUF_FIXED[t]
    if t == 8:
        return p + 8 + struct.unpack_from("<Q", b, p)[0]
    if t == 9:
        et, n = struct.unpack_from("<IQ", b, p)
        p += 12
        if et in _GGUF_FIXED:
            return p + _GGUF_FIXED[et] * n
        for _ in range(n):
            p = _gguf_skip(b, p, et)
        return p
    raise ValueError("a setting of a kind this does not know (%d)" % t)


def _gguf_read(path):
    """A GGUF file's settings (raw, in order), its tensors (name, shape, form, place) and where their numbers begin."""
    with open(path, "rb") as f:
        head = f.read(64 << 20)
    if head[:4] != b"GGUF":
        raise ValueError("not a GGUF model file")
    ver, n_t, n_kv = struct.unpack_from("<IQQ", head, 4)
    p, kvs, sets, align = 24, [], {}, 32
    for _ in range(n_kv):
        k0 = p
        n = struct.unpack_from("<Q", head, p)[0]
        key = head[p + 8:p + 8 + n].decode("utf-8", "replace")
        p += 8 + n
        t = struct.unpack_from("<I", head, p)[0]
        v0 = p + 4
        p = _gguf_skip(head, v0, t)
        kvs.append((key, t, head[k0:v0], head[v0:p]))
        if t == 8:
            sets[key] = head[v0 + 8:p].decode("utf-8", "replace")
        elif t in (4, 5, 10):
            sets[key] = struct.unpack_from({4: "<I", 5: "<i", 10: "<Q"}[t], head, v0)[0]
        if key == "general.alignment" and t == 4:
            align = sets[key]
    tensors = []
    for _ in range(n_t):
        n = struct.unpack_from("<Q", head, p)[0]
        name = head[p + 8:p + 8 + n]
        p += 8 + n
        nd = struct.unpack_from("<I", head, p)[0]
        dims = struct.unpack_from("<%dQ" % nd, head, p + 4)
        p += 4 + 8 * nd
        typ, off = struct.unpack_from("<IQ", head, p)
        p += 12
        count = 1
        for d in dims:
            count *= d
        tensors.append((name, dims, typ, off, count))
    return {"version": ver, "kvs": kvs, "settings": sets, "tensors": tensors, "align": align,
            "data": (p + align - 1) // align * align}


def _gguf_summary(path):
    """What a model is, and whether llama.cpp's trainer can train it here: a Llama-shaped model in 32, 16 or 8 bits."""
    try:
        g = _gguf_read(path)
    except Exception as e:
        return {"trainable": False, "why": "Its file could not be read: %s" % e}
    sets = g["settings"]
    arch = sets.get("general.architecture", "")
    params = sum(t[4] for t in g["tensors"])
    forms = sorted({_GGUF_WIDENS.get(t[2], "type %d" % t[2]) for t in g["tensors"]})
    emb = [t for t in g["tensors"] if t[0] == b"token_embd.weight"]
    out = {"arch": arch, "name": sets.get("general.name", ""), "params": params, "forms": forms, "trainable": True, "why": "",
           "vocab": int(emb[0][1][1]) if emb and len(emb[0][1]) > 1 else None}
    if arch != "llama":
        out.update(trainable=False, why="llama.cpp's trainer trains Llama-shaped models; this one is %s." % (arch or "of another shape"))
    elif any(t[2] not in _GGUF_WIDENS for t in g["tensors"]):
        out.update(trainable=False, why="Its numbers are packed smaller than 8 bits, which cannot be widened without loss: choose its 16-bit (F16) or 8-bit (Q8_0) file.")
    return out


def _gguf_to_f32(src, dst, progress=None):
    """The same model with every tensor in 32-bit numbers: exact from F16 and BF16, and from Q8_0 its own values."""
    g = _gguf_read(src)
    align = g["align"]
    out = bytearray(b"GGUF") + struct.pack("<IQQ", g["version"], len(g["tensors"]), len(g["kvs"]))
    for key, t, kraw, vraw in g["kvs"]:
        out += kraw + (struct.pack("<I", 0) if key == "general.file_type" and t == 4 else vraw)
    noff, places = 0, []
    for name, dims, typ, off, count in g["tensors"]:
        out += struct.pack("<Q", len(name)) + name + struct.pack("<I", len(dims)) + struct.pack("<%dQ" % len(dims), *dims)
        out += struct.pack("<IQ", 0, noff)
        places.append(noff)
        noff += (count * 4 + align - 1) // align * align
    out += b"\0" * ((align - len(out) % align) % align)
    total = sum(t[4] for t in g["tensors"]) or 1
    done = 0
    with open(src, "rb") as f, open(dst, "wb") as w:
        w.write(out)
        for name, dims, typ, off, count in g["tensors"]:
            f.seek(g["data"] + off)
            left = count
            while left:
                if typ == 8:   # Q8_0: blocks of 32 numbers, a 16-bit scale and 32 signed bytes
                    k = min(left, 1 << 15)
                    blk = f.read(34 * (k // 32))
                    vals = []
                    for i in range(0, len(blk), 34):
                        d = struct.unpack_from("<e", blk, i)[0]
                        vals.extend([d * q for q in struct.unpack_from("<32b", blk, i + 2)])
                    chunk = struct.pack("<%df" % k, *vals)
                else:
                    k = min(left, 1 << 20)
                    if typ == 0:
                        chunk = f.read(4 * k)
                    elif typ == 1:
                        chunk = struct.pack("<%df" % k, *struct.unpack("<%de" % k, f.read(2 * k)))
                    else:   # BF16: the upper half of a 32-bit number
                        h = f.read(2 * k)
                        chunk = bytearray(4 * k)
                        chunk[2::4] = h[0::2]
                        chunk[3::4] = h[1::2]
                w.write(chunk)
                left -= k
                done += k
                if progress:
                    progress(done / total)
            w.write(b"\0" * ((count * 4 + align - 1) // align * align - count * 4))
    return total


def _train_need_gb(params):
    """The memory a training takes: the weights, their gradients and the optimiser's two moments, 4 bytes each, and room."""
    return round(params * 16 / 1e9 + 0.6, 1)


def _train_bases():
    """The models on this computer that can be trained further, with what each needs."""
    ram = None
    try:
        ram = _read_device_info().get("ramGB")
    except Exception:
        pass
    out = []
    for mid, path in sorted(_MODEL_PATHS.items()):
        if not os.path.isfile(path):
            continue
        info = _gguf_summary(path)
        meta = _MODEL_META.get(mid) or {}
        need = _train_need_gb(info.get("params") or 0)
        out.append({"id": mid, "name": meta.get("name") or info.get("name") or os.path.basename(path), "params": info.get("params"),
                    "forms": info.get("forms"), "trainable": bool(info.get("trainable")), "why": info.get("why", ""),
                    "needGB": need, "ramGB": ram, "fits": ram is None or need <= ram * 0.7, "trained": bool(meta.get("trained"))})
    return {"ok": True, "models": out, "ramGB": ram}
'''
rep('''\n\n_TRAIN = {"state": "idle"}''', STUDIO + '''\n\n_TRAIN = {"state": "idle"}''')

# the person's choice reaches the trainer
rep('''    more = str(spec.get("from_model") or "")
''', '''    more = str(spec.get("from_model") or "")
    base = "" if more else str(spec.get("base") or "")
    if base:
        if not os.path.isfile(_MODEL_PATHS.get(base, "")):
            return {"ok": False, "error": "The model to start from is not on this computer."}
        info = _gguf_summary(_MODEL_PATHS[base])
        if not info.get("trainable"):
            return {"ok": False, "error": info.get("why") or "That model cannot be trained here."}
        passes = max(1, min(10, int(spec.get("passes") or 2)))
''')
rep('''    threading.Thread(target=_train_run, args=(exe, work, size, passes, name, more), daemon=True).start()''',
    '''    threading.Thread(target=_train_run, args=(exe, work, size, passes, name, more, base), daemon=True).start()''')
rep('''def _train_run(exe, work, size, passes, name, more):''', '''def _train_run(exe, work, size, passes, name, more, base=""):''')
rep('''        if more:
            shutil.copyfile(_MODEL_PATHS[more], start)''', '''        if base:
            # 6.6: widened to 32-bit numbers, which the trainer needs; the model it came from stays as it was
            _train_set(phase="widening", nvocab=_gguf_summary(_MODEL_PATHS[base]).get("vocab"))
            params = _gguf_to_f32(_MODEL_PATHS[base], str(start), progress=lambda f: _train_set(frac=0.0, widen=round(f, 2)))
            size = "base"
            lr0, lr1 = TRAIN_LR["base"]
        elif more:
            shutil.copyfile(_MODEL_PATHS[more], start)''')
rep('''        _MODEL_META[mid] = {"trained": True, "name": name, "size": size, "params": params,
                            "passes": int(prev.get("passes") or 0) + passes, "chars": _TRAIN.get("chars")}''',
    '''        _MODEL_META[mid] = {"trained": True, "name": name, "size": size, "params": params,
                            "passes": int(prev.get("passes") or 0) + passes, "chars": _TRAIN.get("chars")}
        if base or prev.get("base"):
            _MODEL_META[mid]["base"] = prev.get("base") or (_MODEL_META.get(base) or {}).get("name") or os.path.basename(_MODEL_PATHS.get(base, ""))''')
# both of the page's bridges answer the new question
rep('''    def train_available(self):
        return _train_available()
''', '''    def train_available(self):
        return _train_available()

    def train_bases(self):
        return _train_bases()
''', n=2)
open(p, "w", encoding="utf-8", newline="").write(s)
print("patched", p)
