"""What the master edition carries to make the Offline Project itself (modules/r246.js, Ingenium 6.48), written once into
source/build/op_make.json: the hall (site.html beside this file, compressed), the devices' pictures (brand/the-offline-project,
at most 720 pixels high, as build_master_demo.py writes them), the site's icons drawn from the master seal (build/master_seal.json,
its shield without the ribbon, by day and by night, as build_master_demo.py draws them) and the loading page's shield.

The owner's words (7 November 2026), choosing how the Offline Project is built into her master edition: in Fabrica she chooses
all four apps or the variation without Inkwell, and Ingenium builds it fresh from her current apps, to try, to edit and to
package; both variations are also listed with her apps, each built fresh when opened. Nothing is kept as a copy (6.45).

Run it again when site.html, the master seal or the pictures change:
    python3 source/offline_project/master_demo/make_op_data.py"""
import base64, gzip, io, json, os

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, "..", "..", ".."))
BUILD = os.path.join(ROOT, "source", "build")
PICS = os.path.join(ROOT, "brand", "the-offline-project")
OUT = os.path.join(BUILD, "op_make.json")


def master_shield(when="day"):
    """build_master_demo.py's master_shield: the master seal's shield, its ribbon cut away below the shield's foot"""
    d = json.load(open(os.path.join(BUILD, "master_seal.json"), encoding="utf-8"))
    im = Image.open(io.BytesIO(base64.b64decode(d[when]["b64"]))).convert("RGBA")
    W, H = im.size
    px = im.load()
    span = []
    for y in range(H):
        xs = [x for x in range(W) if px[x, y][3] > 40]
        span.append((min(xs), max(xs)) if xs else None)
    cut, tip = None, None
    for y in range(H // 2, H):
        a, b = span[y - 1], span[y]
        if a and b and (b[1] - b[0]) > 2 * (a[1] - a[0]) + 20:
            cut, tip = y, a
            break
    if cut is None:
        raise SystemExit("master_seal.json: the foot of the shield was not found")
    for y in range(cut, H):
        k = y - cut + 1
        lo, hi = tip[0] + 2 * k, tip[1] - 2 * k
        for x in range(W):
            if not (lo <= x <= hi and y < cut + 8):
                px[x, y] = (0, 0, 0, 0)
    return im.crop(im.getbbox())


SHIELD = {"day": master_shield("day"), "night": master_shield("night")}


def shield_square(n, pad=0.0, bg=None, when="day"):
    sh = SHIELD[when]
    c = Image.new("RGBA", (n, n), bg or (0, 0, 0, 0))
    inner = n * (1 - 2 * pad)
    k = min(inner / sh.size[0], inner / sh.size[1])
    im = sh.resize((max(1, round(sh.size[0] * k)), max(1, round(sh.size[1] * k))), Image.LANCZOS)
    c.alpha_composite(im, ((n - im.size[0]) // 2, (n - im.size[1]) // 2))
    return c


def url(im, fmt, mime, **kw):
    buf = io.BytesIO()
    im.save(buf, fmt, **kw)
    return "data:%s;base64,%s" % (mime, base64.b64encode(buf.getvalue()).decode("ascii"))


icons = {}
for when, tag in (("day", ""), ("night", "-dark")):
    icons[when] = {"ico": url(shield_square(256, when=when), "ICO", "image/x-icon", sizes=[(16, 16), (32, 32), (48, 48)]),
                   "32": url(shield_square(32, when=when), "PNG", "image/png", optimize=True),
                   "192": url(shield_square(192, 0.03, when=when), "PNG", "image/png", optimize=True)}
touch = url(shield_square(180, 0.1, (255, 255, 255, 255)).convert("RGB"), "PNG", "image/png", optimize=True)
loadseal = url(shield_square(240), "WEBP", "image/webp", quality=90, method=6)

devices = {}
for dv in ("iphone", "ipad", "macbook_pro", "mac_mini_4k", "windows", "fire_hd10_upright", "fire_hd10_sideways"):
    for t in ("day", "night"):
        src = Image.open(os.path.join(PICS, "the_offline_project_%s_%s.jpg" % (dv, t)))
        if src.format == "JPEG" and src.size[1] <= 720:
            b = open(os.path.join(PICS, "the_offline_project_%s_%s.jpg" % (dv, t)), "rb").read()
        else:
            im = src.convert("RGB")
            if im.size[1] > 720:
                im = im.resize((round(im.size[0] * 720 / im.size[1]), 720), Image.LANCZOS)
            buf = io.BytesIO()
            im.save(buf, "JPEG", quality=84, optimize=True, progressive=True)
            b = buf.getvalue()
        devices["%s_%s" % (dv, t)] = "data:image/jpeg;base64," + base64.b64encode(b).decode("ascii")

# the three things build_master_demo.py adds at the top of each app's page, taken from it word for word: its own corner of the
# storage (the shim), the key back to the hall when it is opened on its own, and no scroll bars
import re as _re
_src = open(os.path.join(HERE, "build_master_demo.py"), encoding="utf-8").read()
_ns = {"json": json}
for _name, _pat in (("SHIM", r'^SHIM = r""".*?"""'), ("HOME_TAG", r'^HOME_TAG = r""".*?"""'), ("NOBARS_CSS", r"^NOBARS_CSS = \(.*?\)\n"), ("NOBARS", r"^NOBARS = \(.*?\)\n")):
    _m = _re.search(_pat, _src, _re.S | _re.M)
    if not _m:
        raise SystemExit("build_master_demo.py: %s was not found" % _name)
    exec(_m.group(0), _ns)
tags = {"shim": _ns["SHIM"], "home": _ns["HOME_TAG"], "nobars": _ns["NOBARS"]}
for _k, _v in tags.items():
    if ("__APP__" not in _v and _k == "shim") or ("__HOME__" not in _v and _k == "home"):
        raise SystemExit("build_master_demo.py: the %s has lost its placeholder" % _k)

site = open(os.path.join(HERE, "site.html"), encoding="utf-8").read()
for mark in ("/*@@BUILD@@*/{}", '/*@@LOADSEAL@@*/""', "<title>The Offline Project</title>", '<div id="app">'):
    if site.count(mark) != 1:
        raise SystemExit("site.html: %r is not found once" % mark)
data = {"v": 1, "site": base64.b64encode(gzip.compress(site.encode("utf-8"), 9, mtime=0)).decode("ascii"),
        "icons": icons, "touch": touch, "loadseal": loadseal, "devices": devices, "tags": tags}
json.dump(data, open(OUT, "w", encoding="utf-8"), separators=(",", ":"))
print("op_make.json:", os.path.getsize(OUT), "bytes;", len(devices), "pictures;", len(site), "characters of the hall")
