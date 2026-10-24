"""INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
Reads an app Fabrica made for a Mac or for Windows (modules/r170.js) as those systems read it, written apart from the
maker, so the two can disagree:
  mac: every file the seal lists has the fingerprint it gives, and no file is left out or added; the program's signature
       binds Info.plist and the seal (special slots 1 and 3 of each CodeDirectory, in each half), and every page of its
       code still has the fingerprint its CodeDirectory gives (the program was not changed); the icon holds each size; the
       program can be run (its mode); the page shell.json names is there.
  win: the icon table names each picture with its true size, and each picture is a PNG of that size; the files after the
       program read back (shell.txt, shell.json, the page).
    python verify_desktop_app.py mac|win <made.zip> [id] [title]     -> prints one JSON line; exit 1 when anything is wrong"""
import hashlib, io, json, plistlib, struct, sys, zipfile

try:
    from PIL import Image
except ImportError:
    Image = None
bad = []


def check(cond, what):
    if not cond:
        bad.append(what)
    return cond


def png_size(b):
    if b[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    w, h = struct.unpack(">II", b[16:24])
    if Image:
        Image.open(io.BytesIO(b)).load()
    return (w, h)


def mac(zf, want_id, want_title):
    names = zf.namelist()
    apps = sorted({n.split("/")[0] for n in names if n.split("/")[0].endswith(".app")})
    check(len(apps) == 1, "one .app in the zip (%s)" % apps)
    app = apps[0]
    if want_title:
        check(app == want_title + ".app", "the bundle is named for the app (%s)" % app)
    root = app + "/Contents/"
    files = {n[len(root):]: zf.read(n) for n in names if n.startswith(root) and not n.endswith("/")}
    info = plistlib.loads(files["Info.plist"])
    exe = info["CFBundleExecutable"]
    if want_id:
        check(info["CFBundleIdentifier"] == want_id, "Info.plist names the app's id (%s)" % info["CFBundleIdentifier"])
    check(info.get("CFBundleDisplayName") == want_title or not want_title, "Info.plist names the app (%s)" % info.get("CFBundleDisplayName"))
    zi = zf.getinfo(root + "MacOS/" + exe)
    check((zi.external_attr >> 16) & 0o111, "the program can be run (mode %o)" % ((zi.external_attr >> 16) & 0o7777))
    cr_bytes = files["_CodeSignature/CodeResources"]
    cr = plistlib.loads(cr_bytes)
    sealed = {k for k in files if k not in ("Info.plist", "PkgInfo") and not k.startswith("_CodeSignature/") and k != "MacOS/" + exe}
    check(set(cr["files2"]) == sealed, "the seal lists every file and only those (%s)" % sorted(set(cr["files2"]) ^ sealed))
    for k, v in cr["files2"].items():
        if k in files:
            check(v["hash2"] == hashlib.sha256(files[k]).digest(), "the seal's SHA-256 of " + k)
            if "hash" in v:
                check(v["hash"] == hashlib.sha1(files[k]).digest(), "the seal's SHA-1 of " + k)
    v1 = {k for k in files if k.startswith("Resources/")}
    check(set(cr["files"]) == v1, "the older seal lists every resource (%s)" % sorted(set(cr["files"]) ^ v1))
    for k, v in cr["files"].items():
        if k in files:
            check(v == hashlib.sha1(files[k]).digest(), "the older seal's SHA-1 of " + k)
    # the program's signature
    prog = files["MacOS/" + exe]
    magic = struct.unpack(">I", prog[:4])[0]
    if magic == 0xCAFEBABE:
        n = struct.unpack(">I", prog[4:8])[0]
        slices = [struct.unpack(">IIIII", prog[8 + i * 20:28 + i * 20]) for i in range(n)]
        parts = [(s[2], s[3]) for s in slices]
    else:
        parts = [(0, len(prog))]
    algs = {1: (hashlib.sha1, 20), 2: (hashlib.sha256, 32), 3: (hashlib.sha256, 20), 4: (hashlib.sha384, 48)}
    cds = 0
    for off, size in parts:
        sl = prog[off:off + size]
        check(struct.unpack("<I", sl[:4])[0] == 0xFEEDFACF, "a 64-bit half")
        ncmds = struct.unpack("<I", sl[16:20])[0]
        p, sig = 32, None
        for _ in range(ncmds):
            cmd, cs = struct.unpack("<II", sl[p:p + 8])
            if cmd == 0x1D:
                sig = struct.unpack("<II", sl[p + 8:p + 16])
            p += cs
        if not check(sig, "the half is signed"):
            continue
        sb = sig[0]
        check(struct.unpack(">I", sl[sb:sb + 4])[0] == 0xFADE0CC0, "the signature's super blob")
        count = struct.unpack(">I", sl[sb + 8:sb + 12])[0]
        for k in range(count):
            typ, bo = struct.unpack(">II", sl[sb + 12 + k * 8:sb + 20 + k * 8])
            b = sb + bo
            if struct.unpack(">I", sl[b:b + 4])[0] != 0xFADE0C02:
                continue
            cds += 1
            hoff, ioff, nsp, ncs, climit = struct.unpack(">IIIII", sl[b + 16:b + 36])
            hsize, htype, plat, psize = sl[b + 36], sl[b + 37], sl[b + 38], sl[b + 39]
            fn, hs = algs[htype]
            slot = lambda i: sl[b + hoff - i * hsize:b + hoff - (i - 1) * hsize]
            check(slot(1) == fn(files["Info.plist"]).digest()[:hsize], "the signature binds Info.plist")
            check(slot(3) == fn(cr_bytes).digest()[:hsize], "the signature binds the seal")
            page = 1 << psize
            for i in range(ncs):
                start = i * page
                chunk = sl[start:min(start + page, climit)]
                if sl[b + hoff + i * hsize:b + hoff + (i + 1) * hsize] != fn(chunk).digest()[:hsize]:
                    bad.append("the program's code page %d is as signed" % i)
                    break
    check(cds >= 1, "the program has a CodeDirectory")
    # the icon
    ic = files.get("Resources/AppIcon.icns", b"")
    check(ic[:4] == b"icns" and struct.unpack(">I", ic[4:8])[0] == len(ic), "AppIcon.icns is an icon file")
    p, sizes = 8, {}
    want = {"icp4": 16, "icp5": 32, "ic11": 32, "icp6": 64, "ic12": 64, "ic07": 128, "ic13": 256, "ic08": 256, "ic14": 512, "ic09": 512, "ic10": 1024}
    while p + 8 <= len(ic):
        t, n = ic[p:p + 4].decode("latin-1"), struct.unpack(">I", ic[p + 4:p + 8])[0]
        sizes[t] = png_size(ic[p + 8:p + n])
        p += n
    for t, z in want.items():
        check(sizes.get(t) == (z, z), "the icon's %s is a %d-pixel PNG (%s)" % (t, z, sizes.get(t)))
    sj = json.loads(files["Resources/www/shell.json"])
    check(("Resources/www/" + sj["page"]) in files, "the page shell.json names is there (%s)" % sj["page"])
    return {"bundle": app, "id": info["CFBundleIdentifier"], "program": exe, "halves": len(parts), "code_directories": cds,
            "sealed": len(cr["files2"]), "page": sj["page"], "page_bytes": len(files.get("Resources/www/" + sj["page"], b""))}


def win(zf, want_id, want_title):
    exes = [n for n in zf.namelist() if n.lower().endswith(".exe")]
    check(len(exes) == 1, "one program in the zip (%s)" % exes)
    name = exes[0]
    if want_title:
        check(name == want_title + ".exe", "the program is named for the app (%s)" % name)
    b = zf.read(name)
    check(b[:2] == b"MZ", "a Windows program")
    e = struct.unpack("<I", b[0x3C:0x40])[0]
    check(b[e:e + 4] == b"PE\0\0", "a PE program")
    nsec, = struct.unpack("<H", b[e + 6:e + 8]); optsize, = struct.unpack("<H", b[e + 20:e + 22]); opt = e + 24
    magic, = struct.unpack("<H", b[opt:opt + 2])
    check(magic == 0x20B, "a 64-bit program")
    rva_rsrc, = struct.unpack("<I", b[opt + 112 + 16:opt + 112 + 20])
    secs = []
    for i in range(nsec):
        q = opt + optsize + i * 40
        vsize, va, rsize, raw = struct.unpack("<IIII", b[q + 8:q + 24])
        secs.append((va, max(vsize, rsize), raw))
    def off(rva):
        for va, sz, raw in secs:
            if va <= rva < va + sz:
                return rva - va + raw
        raise ValueError("rva %x" % rva)
    base = off(rva_rsrc)
    def entries(o):
        nn = sum(struct.unpack("<HH", b[base + o + 12:base + o + 16]))
        return [struct.unpack("<II", b[base + o + 16 + k * 8:base + o + 24 + k * 8]) for k in range(nn)]
    def leaf(d):
        while d & 0x80000000:
            d = entries(d & 0x7FFFFFFF)[0][1]
        rva, size = struct.unpack("<II", b[base + d:base + d + 8])
        return off(rva), size
    types = {nm & 0x7FFFFFFF: d for nm, d in entries(0)}
    pics = {nm & 0x7FFFFFFF: leaf(d) for nm, d in entries(types[3] & 0x7FFFFFFF)}
    g_at, g_size = leaf(entries(types[14] & 0x7FFFFFFF)[0][1])
    count, = struct.unpack("<H", b[g_at + 4:g_at + 6])
    seen = []
    for i in range(count):
        w, h, _, _, _, _, nbytes, pid = struct.unpack("<BBBBHHIH", b[g_at + 6 + i * 14:g_at + 20 + i * 14])
        z = w or 256
        at, size = pics[pid]
        check(size == nbytes, "the icon table gives the %d-pixel picture its true size" % z)
        check(png_size(b[at:at + size]) == (z, z), "the %d-pixel picture is a PNG of that size" % z)
        seen.append(z)
    check(b[-8:] == b"INGWWW01", "the app's files follow the program, with their mark")
    n, = struct.unpack("<Q", b[-16:-8])
    pz = zipfile.ZipFile(io.BytesIO(b[-16 - n:-16]))
    conf = dict(l.split("=", 1) for l in pz.read("shell.txt").decode("utf-8").splitlines() if "=" in l)
    if want_id:
        check(conf.get("id") == want_id, "shell.txt names the app's id (%s)" % conf.get("id"))
    if want_title:
        check(conf.get("title") == want_title, "shell.txt names the app (%s)" % conf.get("title"))
    check(conf.get("page") in pz.namelist(), "the page shell.txt names is there (%s)" % conf.get("page"))
    check(all(i.compress_type == 0 for i in pz.infolist()), "the app's files are stored as they are (the shell reads them so)")
    return {"program": name, "bytes": len(b), "icons": seen, "id": conf.get("id"), "page": conf.get("page"),
            "page_bytes": len(pz.read(conf["page"])) if conf.get("page") in pz.namelist() else 0, "files": pz.namelist()}


if __name__ == "__main__":
    kind, path = sys.argv[1], sys.argv[2]
    want_id = sys.argv[3] if len(sys.argv) > 3 else ""
    want_title = sys.argv[4] if len(sys.argv) > 4 else ""
    zf = zipfile.ZipFile(path)
    try:
        out = (mac if kind == "mac" else win)(zf, want_id, want_title)
    except Exception as e:   # anything unreadable is a fault in what was made
        out = {}
        bad.append("could not be read: %r" % e)
    out["faults"] = bad
    print(json.dumps(out))
    sys.exit(1 if bad else 0)
