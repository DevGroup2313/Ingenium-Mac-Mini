# 6.55 (7 November 2026): Lakay's mark, the Spiral, as Ingenium draws her apps' seals: in layers at depth.
# Usage:  python3 -I lakay_mark.py path/to/a/Lakay/repository
# Reads the Spiral's planes by day and by night (src/brand/lakay-mark/spiral-<day|night>-<name>.png, Build 6; or the seven
# numbered layers of Build 3) and their depths (the PLANES list of src/js/09-crest.js; Build 3: its Z list), and writes
# builtin/lakay_mark.json beside this file:
#   {"layers": {"lakay": [{"src": data URL, "z": depth}, ...], "lakayN": [...]},
#    "seal": {"day": {"w", "h", "b64"}, "night": {...}}}
# The layers are the Spiral as Lakay draws it; the seal is its still planes laid flat, for the places that show an app's seal still
# (the papers, the Word files, Storage). build_page.py adds both to the master edition alone, where Lakay is carried.
import base64, io, json, os, re, sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
if len(sys.argv) != 2:
    sys.exit("usage: python3 -I lakay_mark.py path/to/a/Lakay/repository")
repo = sys.argv[1]
mark = os.path.join(repo, "src", "brand", "lakay-mark")
js = open(os.path.join(repo, "src", "js", "09-crest.js"), encoding="utf-8").read()
# 6.56 (8 November 2026): Lakay Build 6 draws the Spiral as a coin in depth, from named planes (var PLANES = [[picture, depth],
# ...], back to front, each depth a share of the width, as Ingenium's own layers are): the edge in four planes behind the face,
# the plate, the engraving, two cast shadows, the halo, the shell's sides in three planes, the shell, the lattice, the pearl and
# the sparkles; each picture is src/brand/lakay-mark/spiral-<day|night>-<name>.png. Every plane keeps its own depth in Ingenium
# (none is marked side: Ingenium's renderers give a side plane one fixed depth, made for Inkwell's coin edge, which would undo
# Lakay's). The still seal (the papers, Word files, Storage) is laid flat from the planes of Lakay's own still mark
# (E.crest.flat: plate, engraving, shadows, halo, one side, shell, lattice, pearl, sparkles; the edge left out). Build 3's seven
# numbered layers (var Z = [...], spiral-<day|night>-<n>.png) are still read.
planes = re.search(r"var PLANES = \[(.*?)\];", js, re.S)
if planes:
    PLANES = [(m.group(1), float(m.group(2))) for m in re.finditer(r'\["([a-z]+)",\s*(-?[0-9.]+)\]', planes.group(1))]
    if not PLANES:
        sys.exit("the Spiral's planes (var PLANES = [...]) were found in src/js/09-crest.js, but none could be read")
    last_side = max(z for r, z in PLANES if r == "sside") if any(r == "sside" for r, z in PLANES) else None
    def flat_of(role, z):
        return role != "edge" and (role != "sside" or z == last_side)
    names = [("spiral-%s-" + r + ".png", z, flat_of(r, z)) for r, z in PLANES]
else:
    m = re.search(r"var Z = \[([^\]]+)\]", js)
    if not m:
        sys.exit("neither the Spiral's planes (var PLANES = [...]) nor its depths (var Z = [...]) were found in src/js/09-crest.js")
    names = [("spiral-%s-" + str(i) + ".png", float(z), True) for i, z in enumerate(m.group(1).split(","))]
out = {"layers": {}, "seal": {}}
for tod, key in (("day", "lakay"), ("night", "lakayN")):
    layers, flat, seen = [], None, {}
    for pattern, z, in_flat in names:
        path = os.path.join(mark, pattern % tod)
        raw = open(path, "rb").read()
        im = Image.open(io.BytesIO(raw)).convert("RGBA")
        if im.size != (256, 256):
            sys.exit(path + ": a layer of 256 by 256 was expected")
        layers.append({"src": "data:image/png;base64," + base64.b64encode(raw).decode("ascii"), "z": z})
        if in_flat:
            flat = im if flat is None else Image.alpha_composite(flat, im)
    buf = io.BytesIO()
    flat.save(buf, "PNG", optimize=True)
    out["layers"][key] = layers
    out["seal"][tod] = {"w": 256, "h": 256, "b64": base64.b64encode(buf.getvalue()).decode("ascii")}
dest = os.path.join(HERE, "builtin", "lakay_mark.json")
open(dest, "w").write(json.dumps(out, separators=(",", ":")) + "\n")
print("Lakay's mark: %d planes by day and by night (%d on the still seal; depths %s), and its seal; %d bytes" % (
    len(names), sum(1 for n in names if n[2]), ", ".join("%g" % n[1] for n in names), os.path.getsize(dest)))
