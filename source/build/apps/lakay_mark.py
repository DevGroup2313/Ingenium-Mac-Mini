# 6.55 (7 November 2026): Lakay's mark, the Spiral, as Ingenium draws her apps' seals: in layers at depth.
# Usage:  python3 -I lakay_mark.py path/to/a/Lakay/repository
# Reads the Spiral's seven layers by day and by night (src/brand/lakay-mark/spiral-day-0.png ... spiral-night-6.png) and their depths
# (the Z list of src/js/09-crest.js), and writes builtin/lakay_mark.json beside this file:
#   {"layers": {"lakay": [{"src": data URL, "z": depth}, ...], "lakayN": [...]},
#    "seal": {"day": {"w", "h", "b64"}, "night": {...}}}
# The layers are the Spiral as Lakay draws it; the seal is the seven layers laid flat, for the places that show an app's seal still
# (the papers, the Word files, Storage). build_page.py adds both to the master edition alone, where Lakay is carried.
import base64, io, json, os, re, sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
if len(sys.argv) != 2:
    sys.exit("usage: python3 -I lakay_mark.py path/to/a/Lakay/repository")
repo = sys.argv[1]
mark = os.path.join(repo, "src", "brand", "lakay-mark")
js = open(os.path.join(repo, "src", "js", "09-crest.js"), encoding="utf-8").read()
m = re.search(r"var Z = \[([^\]]+)\]", js)
if not m:
    sys.exit("the Spiral's depths (var Z = [...]) were not found in src/js/09-crest.js")
Z = [float(x) for x in m.group(1).split(",")]
out = {"layers": {}, "seal": {}}
for tod, key in (("day", "lakay"), ("night", "lakayN")):
    layers, flat = [], None
    for i, z in enumerate(Z):
        path = os.path.join(mark, "spiral-%s-%d.png" % (tod, i))
        raw = open(path, "rb").read()
        im = Image.open(io.BytesIO(raw)).convert("RGBA")
        if im.size != (256, 256):
            sys.exit(path + ": a layer of 256 by 256 was expected")
        layers.append({"src": "data:image/png;base64," + base64.b64encode(raw).decode("ascii"), "z": z})
        flat = im if flat is None else Image.alpha_composite(flat, im)
    buf = io.BytesIO()
    flat.save(buf, "PNG", optimize=True)
    out["layers"][key] = layers
    out["seal"][tod] = {"w": 256, "h": 256, "b64": base64.b64encode(buf.getvalue()).decode("ascii")}
dest = os.path.join(HERE, "builtin", "lakay_mark.json")
open(dest, "w").write(json.dumps(out, separators=(",", ":")) + "\n")
print("Lakay's mark: %d layers by day and by night (depths %s), and its seal; %d bytes" % (len(Z), ", ".join("%g" % z for z in Z), os.path.getsize(dest)))
