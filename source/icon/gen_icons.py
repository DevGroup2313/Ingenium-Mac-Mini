"""Every icon file from the still layered seal (seal1024_day.png), and the page's own tab icons (day and night)."""
import os, io, base64, json, struct
from PIL import Image
S = os.path.dirname(os.path.abspath(__file__))
N = os.path.join(S, "new")
OUT = os.path.join(N, "out"); os.makedirs(OUT, exist_ok=True)
day = Image.open(os.path.join(N, "seal1024_day.png")).convert("RGBA")
night = Image.open(os.path.join(N, "seal1024_night.png")).convert("RGBA")
def size(im, px):
    return im.resize((px, px), Image.LANCZOS)
def save(im, name):
    p = os.path.join(OUT, name); os.makedirs(os.path.dirname(p), exist_ok=True); im.save(p, optimize=True); return p
save(size(day, 512), "ingenium.png")
# icns: the ten sizes iconutil makes, as PNG entries (ic04..ic14 types)
types = [("icp4", 16), ("icp5", 32), ("icp6", 64), ("ic07", 128), ("ic08", 256), ("ic09", 512), ("ic10", 1024),
         ("ic11", 32), ("ic12", 64), ("ic13", 256), ("ic14", 512)]
chunks = b""
for t, px in types:
    b = io.BytesIO(); size(day, px).save(b, "PNG", optimize=True); d = b.getvalue()
    chunks += t.encode() + struct.pack(">I", len(d) + 8) + d
icns = b"icns" + struct.pack(">I", len(chunks) + 8) + chunks
open(os.path.join(OUT, "ingenium.icns"), "wb").write(icns)
# Windows
size(day, 256).save(os.path.join(OUT, "ingenium.ico"), sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
# Fire and Android launcher sizes
for d, px in [("mdpi", 48), ("hdpi", 72), ("xhdpi", 96), ("xxhdpi", 144), ("xxxhdpi", 192)]:
    save(size(day, px), "android/ic_launcher_%s.png" % d)
# iPhone and iPad: one opaque 1024 picture on the seal's own pale ground (iOS rounds the corners itself)
plate = Image.new("RGBA", (1024, 1024), (245, 243, 247, 255)); plate.alpha_composite(day)
plate.convert("RGB").save(os.path.join(OUT, "icon-1024.png"), optimize=True)
# the browser tab's icons, day and night (64 and 180), and the 512 pictures the page draws its other icons from
def uri(im, px):
    b = io.BytesIO(); size(im, px).save(b, "PNG", optimize=True); return "data:image/png;base64," + base64.b64encode(b.getvalue()).decode()
tab = {"day": [uri(day, 64), uri(day, 180)], "night": [uri(night, 64), uri(night, 180)]}
big = {"day": uri(day, 512), "night": uri(night, 512)}
json.dump({"tab": tab, "big": big}, open(os.path.join(OUT, "page_icons.json"), "w"))
print("icns", len(icns), "tab", sum(len(x) for v in tab.values() for x in v), "big", sum(len(v) for v in big.values()))
