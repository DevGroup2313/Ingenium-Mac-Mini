"""6.77 (10 November 2026): the demonstrations the master edition carries, as recipes.

The owner's words (10 November 2026): "I want the Offline Project apps to only contain the apps demos and never the full version,
I just installed the mac app after shipping it inside of Ingenium's Fabrica and it had the full versions of all 4 apps and not the
demos, please make the fix." And: "I also want the different demos of all of my apps built into Ingenium and made available to me
on there."

Measured on 6.71: Ingenium's demo edition is 38.8 MB, and 28 MB of it are large blocks the master edition carries too, letter for
letter (the picture reader, the two engines, the document typefaces, Code's editor, the Windows shell, the four seals' pictures);
built in the same release, the kit store is the same too. So the master edition does not carry a second copy of them. It carries
a recipe: the demo edition's own text, with each block the master page already holds named in its place.

  make(demo, master)        -> the recipe: {"v":2, "what", "version", "size", "sha256", "srcs": [...], "ops": [text | [src, start, length], ...]}
                               srcs: the parts of the master page it copies from, each {"len": n} (its length as the page counts
                               it, in UTF-16 units) with its "id", or else its "sha" (the fingerprint of its text); ops: the demo
                               edition's bytes, as runs of those parts' bytes and the text between them
  apply(recipe, master)     -> the demo edition's page, put together again (checked against its size and fingerprint)
  block(recipe)             -> the text of the block the page carries (JSON, gzip, base64)
  embed(master, demo)       -> the master page with the recipe in its slot (the page as release.py holds it: not tailed)

6.77, before it shipped: the first recipe named whole blocks only, and carried the rest of the demo edition as its own text, 7 MB
of it; with Carpe Diem's Public sample the page came to 108.9 MB, more than GitHub keeps in one file (100 MiB). The demo edition's
code is the master edition's code with the edition's words changed, so a recipe now copies runs of the master page's own parts: its
large blocks with an id (as before) and its own code, its scripts and its styles, each found again by its id or else by its length
and fingerprint. Its own text is about 0.2 MB. In the page, modules/r268.js reads each part from the page itself (a block carried
for later is fetched first, tail.py), puts the runs together, and checks the whole against the fingerprint here before anything is
made from it.

And for The Forge's demonstration (apps/demos/make_demos.py): a page made from another page that the master edition carries whole
(the lean Forge) is carried as what differs from it, byte for byte:

  delta(base, target)       -> [[offset, length] | text, ...]: runs copied from the base page, and the text between them
  patch(base, ops)          -> the target page's bytes again
"""
import re, json, gzip, base64, hashlib

MIN_REF = 32768
SLOT = "ing-demo-ingenium"
TYPE = "ingenium/recipe-gz"
PRE = "ing-tail:"
_SCRIPT = re.compile(r'<script\b([^>]*)>(.*?)</script>', re.S)
_ID = re.compile(r'\bid="([^"]+)"')


def _sha(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def _units(text):
    """the text's length as the page counts it (UTF-16 units: a character beyond the basic plane, an emoji, counts for two)"""
    return len(text.encode("utf-16-le")) // 2


def _named(master):
    """the master page's large blocks that have an id: the fingerprint of each one's text -> its id (as the page names it when it
    is read: a block carried at the end of the page, ing-tail:<id>, is read through <id>)"""
    out = {}
    for m in _SCRIPT.finditer(master):
        body = m.group(2)
        if len(body) < MIN_REF:
            continue
        i = _ID.search(m.group(1))
        if not i:
            continue
        ident = i.group(1)
        if ident.startswith(PRE):
            ident = ident[len(PRE):]
        if ident == SLOT:
            continue
        out.setdefault(_sha(body), ident)
    return out


_PART = re.compile(r'<(script|style)\b([^>]*)>(.*?)</\1>', re.S)
_TYPE = re.compile(r'\btype="([^"]*)"')
JS_TYPES = ("", "text/javascript", "application/javascript", "module")


def _sources(master):
    """the parts of the master page a recipe may copy from, in the page's order: its large blocks with an id (read through <id>, as
    the page reads them, ing-tail:<id> too) and its own code (its scripts and its styles); the demo slot is never one"""
    out = []
    for m in _PART.finditer(master):
        kind, attrs, body = m.group(1), m.group(2), m.group(3)
        if not body:
            continue
        i = _ID.search(attrs)
        ident = i.group(1) if i else ""
        if ident.startswith(PRE):
            ident = ident[len(PRE):]
        if ident == SLOT:
            continue
        ty = _TYPE.search(attrs)
        code = kind == "style" or (ty.group(1).lower() if ty else "") in JS_TYPES
        if not (code or (ident and len(body) >= MIN_REF)):
            continue
        rec = {"len": _units(body)}
        if ident:
            rec["id"] = ident
        else:
            rec["sha"] = _sha(body)
        out.append((rec, body))
    return out


def make(demo, master, what="Ingenium's demo edition"):
    import bisect
    srcs = _sources(master)
    raws = [b.encode("utf-8") for _, b in srcs]
    starts, at = [], 0
    for r in raws:
        starts.append(at)
        at += len(r)
    raw = demo.encode("utf-8")
    used, ops = {}, []
    for op in delta(b"".join(raws), raw):
        if isinstance(op, str):
            ops.append(op)
            continue
        off, n = op
        while n > 0:  # a run that reaches into the next part is two runs, one in each
            k = bisect.bisect_right(starts, off) - 1
            take = min(n, starts[k] + len(raws[k]) - off)
            ops.append([used.setdefault(k, len(used)), off - starts[k], take])
            off += take
            n -= take
    v = re.search(r'var ING_VERSION="([0-9.]+)"', demo)
    return {"v": 2, "what": what, "version": v.group(1) if v else "", "size": len(raw), "sha256": hashlib.sha256(raw).hexdigest(),
            "srcs": [srcs[k][0] for k in sorted(used, key=used.get)], "ops": ops}


def _texts(master):
    out = {}
    for m in _SCRIPT.finditer(master):
        i = _ID.search(m.group(1))
        if i and len(m.group(2)) >= MIN_REF:
            ident = i.group(1)
            out.setdefault(ident[len(PRE):] if ident.startswith(PRE) else ident, m.group(2))
    return out


def find(recipe, master):
    """the text of each part the recipe copies from, found in the master page as the page finds it: by its id, or by its length
    and fingerprint"""
    by_id, by_sha = {}, {}
    for rec, body in _sources(master):
        (by_id if "id" in rec else by_sha).setdefault(rec.get("id") or rec.get("sha"), body)
    texts = []
    for s in recipe["srcs"]:
        body = by_id.get(s["id"]) if "id" in s else by_sha.get(s["sha"])
        if body is None or _units(body) != s["len"]:
            raise SystemExit("the recipe copies from %s, which this page does not hold as it was" % (s.get("id") or "a part of its code"))
        texts.append(body)
    return texts


def apply(recipe, master):
    raws = [t.encode("utf-8") for t in find(recipe, master)]
    out = bytearray()
    for op in recipe["ops"]:
        out += op.encode("utf-8") if isinstance(op, str) else raws[op[0]][op[1]:op[1] + op[2]]
    if len(out) != recipe["size"] or hashlib.sha256(out).hexdigest() != recipe["sha256"]:
        raise SystemExit("the recipe did not give the page back whole (its size or fingerprint differs)")
    return out.decode("utf-8")


def block(recipe):
    raw = json.dumps(recipe, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    return base64.b64encode(gzip.compress(raw, compresslevel=9, mtime=0)).decode("ascii"), len(raw)


def slot(body="", attrs=""):
    return '<script id="%s" type="%s"%s>%s</script>' % (SLOT, TYPE, attrs, body)


def embed(master, demo):
    """the master page (not tailed) with the demo edition's recipe in its slot; the page says so when it has no slot (an edition
    that carries none)"""
    if re.search(r'<script id="' + re.escape(PRE) + r'[^"]+"', master):  # a block already moved to the end (its code may name the prefix)
        raise SystemExit("embed: give the page before its blocks are moved to its end (tail.untail first)")
    pat = re.compile(r'<script id="%s"[^>]*>[^<]*</script>' % re.escape(SLOT))
    if len(pat.findall(master)) != 1:
        raise SystemExit("embed: the page has no place for the demo edition's recipe (or more than one)")
    bare = pat.sub(lambda m: slot(), master, count=1)
    rec = make(demo, bare)
    again = apply(rec, bare)  # proved here, before it travels
    assert again == demo
    b64, n = block(rec)
    lit = sum(len(p.encode("utf-8")) for p in rec["ops"] if isinstance(p, str))
    runs = [p for p in rec["ops"] if not isinstance(p, str)]
    print("the demo edition's recipe: %d bytes of its own text and %d runs from %d parts of the page (%d of them blocks with an id) give back %d bytes; carried as %d"
          % (lit, len(runs), len(rec["srcs"]), sum(1 for s in rec["srcs"] if "id" in s), rec["size"], len(b64)))
    return pat.sub(lambda m: slot(b64, ' data-bytes="%d" data-version="%s" data-sha256="%s"' % (n, rec["version"], rec["sha256"])), master, count=1), rec


# ---------- what differs between two pages, byte for byte ----------
def delta(base, target, block_len=48):
    """runs of the base page's bytes found again in the target ([offset, length]), and the text between them. Runs are cut where a
    character begins, so every piece of text between them reads as UTF-8 by itself."""
    index = {}
    for i in range(0, len(base) - block_len + 1, block_len):
        index.setdefault(base[i:i + block_len], i)
    ops, lit_from, i, n = [], 0, 0, len(target)

    def cont(b):
        return (b & 0xC0) == 0x80

    while i <= n - block_len:
        j = index.get(target[i:i + block_len])
        if j is None:
            i += 1
            continue
        # as far back and as far on as the two pages agree
        a, b = i, j
        while a > lit_from and b > 0 and target[a - 1] == base[b - 1]:
            a -= 1
            b -= 1
        k = block_len + (i - a)
        while a + k < n and b + k < len(base) and target[a + k] == base[b + k]:
            k += 1
        # a run starts and ends where a character does (so the text before and after it is whole)
        while k > 0 and cont(target[a]):
            a += 1
            b += 1
            k -= 1
        while k > 0 and a + k < n and cont(target[a + k]):
            k -= 1
        if k < block_len:
            i += 1
            continue
        if a > lit_from:
            ops.append(target[lit_from:a].decode("utf-8"))
        ops.append([b, k])
        i = lit_from = a + k
    if lit_from < n:
        ops.append(target[lit_from:].decode("utf-8"))
    return ops


def patch(base, ops):
    out = bytearray()
    for op in ops:
        if isinstance(op, str):
            out += op.encode("utf-8")
        else:
            out += base[op[0]:op[0] + op[1]]
    return bytes(out)


if __name__ == "__main__":
    import sys
    if len(sys.argv) == 4 and sys.argv[1] == "check":
        master, demo = open(sys.argv[2], encoding="utf-8").read(), open(sys.argv[3], encoding="utf-8").read()
        import tail
        rec = make(demo, tail.untail(master))
        apply(rec, master)
        b64, n = block(rec)
        print("the recipe gives the demo edition back whole; %d bytes as JSON, %d carried" % (n, len(b64)))
    else:
        print(__doc__)
