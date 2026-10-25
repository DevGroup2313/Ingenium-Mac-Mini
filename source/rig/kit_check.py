"""Ingenium 6.7 · reads a kit or package zip that Ingenium made for an app other than itself (modules/r178.js), apart from the
page that made it, so the two can disagree. Used by rig/t_67_kits.js.

    python3 -I rig/kit_check.py <made.zip> <spec.json>      -> prints one JSON line

spec.json (every key optional):
  app_ref      a PNG of the app's own picture; each icon in the zip is compared with it, drawn as the packagers draw
  ing_refs     PNGs of Ingenium's own icons; each icon must be far from all of them
  page_sha256  the SHA-256 of the app's page: the entries holding exactly that page are named
  ref_zip      a zip the app's own packager made: every entry must match it by name, bytes and mode, in the same order
  ref_map      [[prefix in ref_zip, prefix here], ...]: compare only the entries under these prefixes (the web package
               against the iPhone and iPad package's Home Screen app)
  orig_names   the paths of Ingenium's own kit for the same device (inside its project folder)
  old_names    file names that were renamed: no text file may still name one
  build_globs  regexes of the build files whose file references must all be found in the zip
  read         regexes of entry names: the first entry each one matches is returned as text (read_max characters)
  ing_icon_sha256  the SHA-256 of every icon file of Ingenium's own: no icon file here may be one of them
What it reports: every entry (name, size, SHA-256, unix mode), the top folders, any entry path naming Ingenium, each icon
(.png, .ico, .icns: every picture in it) with its distance from the app's picture and from Ingenium's, the entries that hold
the app's page, the comparison with ref_zip, the files that still name Ingenium in their text, and, for build files, every
file reference that is not in the zip and every reference to an old name."""
import hashlib, io, json, re, struct, sys, zipfile

from PIL import Image

zpath, spath = sys.argv[1], sys.argv[2]
spec = json.load(open(spath, encoding="utf-8"))
zf = zipfile.ZipFile(zpath)
infos = [i for i in zf.infolist() if not i.filename.endswith("/")]
data = {i.filename: zf.read(i) for i in infos}
rep = {"zip": zpath.split("/")[-1], "entries": [[i.filename, i.file_size, hashlib.sha256(data[i.filename]).hexdigest(), (i.external_attr >> 16) & 0o7777] for i in infos]}
rep["top"] = sorted({n.split("/")[0] for n in data})
rep["ing_paths"] = [n for n in data if re.search("ingenium", n, re.I)]


def pngs_in(name, b):
    """every picture an icon file holds: (label, PNG bytes)"""
    if name.lower().endswith(".png"):
        return [("png", b)]
    out = []
    if name.lower().endswith(".ico") and b[:4] == b"\x00\x00\x01\x00":
        n = struct.unpack("<H", b[4:6])[0]
        for k in range(n):
            w, h, c, r, pl, bpp, sz, off = struct.unpack("<BBBBHHII", b[6 + 16 * k:22 + 16 * k])
            out.append(("ico %d" % (w or 256), b[off:off + sz]))
    if name.lower().endswith(".exe") and b[:2] == b"MZ":
        out += pe_parts(b)[0]
    if name.lower().endswith(".icns") and b[:4] == b"icns":
        p = 8
        while p + 8 <= len(b):
            t, ln = b[p:p + 4].decode("latin1"), struct.unpack(">I", b[p + 4:p + 8])[0]
            if ln < 8:
                break
            if b[p + 8:p + 16] == b"\x89PNG\r\n\x1a\n":
                out.append(("icns " + t, b[p + 8:p + ln]))
            p += ln
    return out


def pe_parts(b):
    """a Windows program from the shell: the pictures of its icon, and the app's files that follow it"""
    pics, files = [], {}
    try:
        e = struct.unpack("<I", b[0x3C:0x40])[0]
        nsec, = struct.unpack("<H", b[e + 6:e + 8]); optsize, = struct.unpack("<H", b[e + 20:e + 22]); opt = e + 24
        rva_rsrc, = struct.unpack("<I", b[opt + 112 + 16:opt + 112 + 20])
        secs = []
        for k in range(nsec):
            q = opt + optsize + k * 40
            vsize, va, rsize, raw = struct.unpack("<IIII", b[q + 8:q + 24])
            secs.append((va, max(vsize, rsize), raw))

        def off(rva):
            for va, sz, raw in secs:
                if va <= rva < va + sz:
                    return rva - va + raw
            raise ValueError("rva")
        base = off(rva_rsrc)

        def ents(o):
            nn = sum(struct.unpack("<HH", b[base + o + 12:base + o + 16]))
            return [struct.unpack("<II", b[base + o + 16 + k * 8:base + o + 24 + k * 8]) for k in range(nn)]

        def leaf(d):
            while d & 0x80000000:
                d = ents(d & 0x7FFFFFFF)[0][1]
            rva, size = struct.unpack("<II", b[base + d:base + d + 8])
            return off(rva), size
        types_ = {nm & 0x7FFFFFFF: d for nm, d in ents(0)}
        table = {nm & 0x7FFFFFFF: leaf(d) for nm, d in ents(types_[3] & 0x7FFFFFFF)}
        g_at, g_size = leaf(ents(types_[14] & 0x7FFFFFFF)[0][1])
        count, = struct.unpack("<H", b[g_at + 4:g_at + 6])
        for k in range(count):
            w, h, _, _, _, _, nbytes, pid = struct.unpack("<BBBBHHIH", b[g_at + 6 + k * 14:g_at + 20 + k * 14])
            at, size = table[pid]
            pics.append(("exe %d" % (w or 256), b[at:at + nbytes]))
        if b[-8:] == b"INGWWW01":
            n, = struct.unpack("<Q", b[-16:-8])
            pz = zipfile.ZipFile(io.BytesIO(b[-16 - n:-16]))
            files = {i.filename: pz.read(i) for i in pz.infolist()}
    except Exception:
        pass
    return pics, files


def on_white(im):
    im = im.convert("RGBA")
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
    bg.alpha_composite(im)
    return bg.convert("RGB")


def renders(ref, z, bg=None):
    """the reference drawn as the packagers draw it at z pixels: whole, and inside a margin (88% and 78% on a white square, Apple's
    grid of 824 in 1024, and the steps between), on white, on nothing, and on the colour an opaque icon fills its corners with
    (bg: an iPhone app's icon has no see-through corners)"""
    grounds = [(255, 255, 255, 255), (0, 0, 0, 0)] + ([bg] if bg else [])
    out = []
    for g in grounds:
        c = Image.new("RGBA", (z, z), g)
        c.alpha_composite(ref.resize((z, z), Image.LANCZOS))
        out.append(on_white(c))
    for frac in (0.96, 0.92, 0.88, 0.84, 824 / 1024, 0.78, 0.74, 0.70):
        inner = round(z * frac)
        off = round((z - inner) / 2)
        for g in grounds:
            c = Image.new("RGBA", (z, z), g)
            c.alpha_composite(ref.resize((inner, inner), Image.LANCZOS), (off, off))
            out.append(on_white(c))
    if bg:
        # a round seal's solid disc drawn as large as the square allows (98.5%), on its rim's colour, as iPhone icons are drawn
        box = ref.getchannel("A").point(lambda a: 255 if a > 200 else 0).getbbox()
        if box:
            side = max(box[2] - box[0], box[3] - box[1])
            cx, cy = (box[0] + box[2]) / 2, (box[1] + box[3]) / 2
            disc = ref.crop((round(cx - side / 2), round(cy - side / 2), round(cx + side / 2), round(cy + side / 2)))
            inner = round(z * 0.985)
            off = round((z - inner) / 2)
            c = Image.new("RGBA", (z, z), bg)
            c.alpha_composite(disc.resize((inner, inner), Image.LANCZOS), (off, off))
            out.append(on_white(c))
    return out


def dist(a, b):
    """the mean difference of two pictures of one size, 0 to 255, compared at 48 pixels or less, so that two ways of drawing one
    picture smaller (a browser's and this one's) agree, while two different pictures do not"""
    s = min(a.size[0], 48)
    if a.size[0] != s:
        a, b = a.resize((s, s), Image.BOX), b.resize((s, s), Image.BOX)
    ha, hb = a.tobytes(), b.tobytes()
    return round(sum(abs(x - y) for x, y in zip(ha, hb)) / max(1, len(ha)), 2)


app_ref = Image.open(spec["app_ref"]).convert("RGBA") if spec.get("app_ref") else None
ing_refs = [Image.open(p).convert("RGBA") for p in spec.get("ing_refs", [])]
icons = []
for n, b in data.items():
    if not re.search(r"\.(png|ico|icns|exe)$", n, re.I):
        continue
    for label, pb in pngs_in(n, b):
        try:
            im = Image.open(io.BytesIO(pb))
            im.load()
        except Exception as e:
            icons.append({"name": n, "pic": label, "bad": str(e)})
            continue
        z = im.size[0]
        sq = (im.resize((z, z)) if im.size[0] != im.size[1] else im).convert("RGBA")
        got = on_white(sq)
        corner = sq.getpixel((0, 0))
        bg = (corner[0], corner[1], corner[2], 255) if corner[3] == 255 and corner[:3] != (255, 255, 255) else None
        d_app = min(dist(got, r) for r in renders(app_ref, z, bg)) if app_ref else None
        d_ing = min(min(dist(got, r) for r in renders(ir, z, bg)) for ir in ing_refs) if ing_refs else None
        icons.append({"name": n, "pic": label, "size": list(im.size), "d_app": d_app, "d_ing": d_ing})
rep["icons"] = icons
if icons and app_ref:
    rep["icon_worst_app"] = max(i.get("d_app", 999) for i in icons)
if icons and ing_refs:
    rep["icon_nearest_ing"] = min(i.get("d_ing", 0) for i in icons)
if icons and app_ref and ing_refs:
    # how much nearer each picture is to the app's own than to Ingenium's (the least of them): Ingenium's distance over the app's
    rep["icon_least_ratio"] = round(min((i.get("d_ing") or 0) / max(0.5, i.get("d_app") or 0) for i in icons), 2)
if spec.get("ing_icon_sha256"):
    # icon files whose bytes are exactly one of Ingenium's own
    ing_sha = set(spec["ing_icon_sha256"])
    rep["ing_icon_bytes"] = [n for n, b in data.items() if re.search(r"\.(png|ico|icns|svg)$", n, re.I) and hashlib.sha256(b).hexdigest() in ing_sha]
if spec.get("page_sha256"):
    rep["page_entries"] = [n for n, b in data.items() if hashlib.sha256(b).hexdigest() == spec["page_sha256"]]
    for n, b in data.items():
        if n.lower().endswith(".exe"):
            rep["page_entries"] += [n + "!" + k for k, v in pe_parts(b)[1].items() if hashlib.sha256(v).hexdigest() == spec["page_sha256"]]
            rep["exe_files"] = sorted(pe_parts(b)[1])

if spec.get("ref_zip"):
    rz = zipfile.ZipFile(spec["ref_zip"])
    rinfos = [i for i in rz.infolist() if not i.filename.endswith("/")]
    rdata = {i.filename: (hashlib.sha256(rz.read(i)).hexdigest(), (i.external_attr >> 16) & 0o777) for i in rinfos}
    mine = {e[0]: (e[2], e[3] & 0o777) for e in rep["entries"]}
    pairs = spec.get("ref_map")
    if pairs:
        cmp_ = {}
        for a, b in pairs:
            for n, v in rdata.items():
                if n.startswith(a):
                    cmp_[b + n[len(a):]] = v
        rdata = cmp_
        mine = {n: v for n, v in mine.items() if n in rdata}
        order_same = True
    else:
        order_same = [i.filename for i in rinfos] == [e[0] for e in rep["entries"]]
    rep["ref"] = {"compared": len(rdata), "same": sum(1 for n in rdata if mine.get(n) == rdata[n]),
                  "differ": [n for n in rdata if n in mine and mine[n] != rdata[n]][:20],
                  "missing": [n for n in rdata if n not in mine][:20], "extra": [n for n in mine if n not in rdata][:20],
                  "order_same": order_same}

texts = {}
for n, b in data.items():
    try:
        t = b.decode("utf-8")
    except UnicodeDecodeError:
        continue
    c = len(re.findall(r"Ingenium", t))
    if c:
        texts[n] = c
rep["texts_naming_ingenium"] = texts

if spec.get("orig_names") is not None or spec.get("old_names"):
    top = rep["top"][0] + "/"
    have = set(data)
    base_have = {n.rsplit("/", 1)[-1] for n in have}
    old = set(spec.get("old_names", []))
    orig_base = {p.rsplit("/", 1)[-1] for p in spec.get("orig_names", [])}
    globs = [re.compile(g) for g in spec.get("build_globs", [])]
    ref_re = re.compile(r"""(?:"|'|\s|^|=|\(|\[)((?:[\w.\-]+[/\\])*[\w.\-]+\.(?:html|py|spec|iss|ico|icns|png|svg|bat|command|sh|gradle|yml|plist|swift|java))(?=["'\s,)\]:;]|$)""", re.M)
    missing, olds = [], []
    for n, b in data.items():
        try:
            t = b.decode("utf-8")
        except UnicodeDecodeError:
            continue
        for o in old:
            if o in t:
                olds.append([n, o])
        if not any(g.search(n) for g in globs):
            continue
        for m in ref_re.finditer(t):
            r = m.group(1).replace("\\", "/").lstrip("./") if not m.group(1).startswith("..") else None
            if not r or "$" in r or "{" in r or "%" in r:
                continue
            b2 = r.rsplit("/", 1)[-1]
            if b2 not in base_have and b2 not in orig_base:
                continue  # made while it builds, or not a file of the kit
            if b2 in base_have:
                continue
            missing.append([n, r])
    # the build and run files named with spaces ("Build X (Windows).bat"): each one named is there
    for n, b in data.items():
        if not any(g.search(n) for g in globs):
            continue
        try:
            t = b.decode("utf-8")
        except UnicodeDecodeError:
            continue
        for m in re.finditer(r"""["']((?:Build|Run) [^"'\n]+? \(Windows\)\.bat)["']""", t):
            if m.group(1) not in base_have:
                missing.append([n, m.group(1)])
    rep["refs"] = {"missing": missing[:30], "old": olds[:30]}

if spec.get("read"):
    rep["read"] = {}
    for rx in spec["read"]:
        hit = next((n for n in data if re.search(rx, n)), None)
        if hit:
            try:
                rep["read"][rx] = {"name": hit, "text": data[hit].decode("utf-8")[:int(spec.get("read_max", 8000))]}
            except UnicodeDecodeError:
                rep["read"][rx] = {"name": hit, "text": None}

print(json.dumps(rep))
