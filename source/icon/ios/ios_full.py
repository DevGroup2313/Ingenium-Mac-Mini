"""A full-size iPhone and iPad icon from a round seal: iOS cuts every app icon to its rounded square and shows no
transparency, so the seal is drawn as large as the square allows, on the colour of its own outer ring.
usage: ios_full.py ROUND_SEAL.(png|icns) OUT_1024.png [preview.png]"""
import sys
from PIL import Image, ImageDraw, ImageChops

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src); im.load(); im = im.convert("RGBA")
if im.size[0] < 1024:
    im = im.resize((1024, 1024), Image.LANCZOS)
a = im.getchannel("A")
# the disc itself: the opaque part (a soft shadow below the seal is left out)
solid = a.point(lambda v: 255 if v > 200 else 0)
x0, y0, x1, y1 = solid.getbbox()
d = max(x1 - x0, y1 - y0)
cx, cy = (x0 + x1) / 2, (y0 + y0 + (x1 - x0)) / 2 if (y1 - y0) > (x1 - x0) else (y0 + y1) / 2
disc = im.crop((int(cx - d / 2), int(cy - d / 2), int(cx + d / 2), int(cy + d / 2)))
# the outer ring's colour: the first solid pixels in from the left and right, at the middle height
row = disc.size[1] // 2
def first(xs):
    for x in xs:
        p = disc.getpixel((x, row))
        if p[3] > 230:
            return p
    return (255, 255, 255, 255)
l, r = first(range(disc.size[0])), first(range(disc.size[0] - 1, -1, -1))
rim = tuple((l[i] + r[i]) // 2 for i in range(3))
N = 1024
canvas = Image.new("RGBA", (N, N), rim + (255,))
size = int(N * float(sys.argv[4]) if len(sys.argv) > 4 else N * 0.985)
seal = disc.resize((size, size), Image.LANCZOS)
canvas.alpha_composite(seal, ((N - size) // 2, (N - size) // 2))
canvas.convert("RGB").save(out, optimize=True)
print(out, "rim", rim, "seal", size)
if len(sys.argv) > 3 and sys.argv[3] != "-":
    m = Image.new("L", (N, N), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, N - 1, N - 1), radius=int(N * 0.2237), fill=255)
    pv = Image.new("RGBA", (N, N), (40, 40, 48, 255))
    pv.paste(canvas, (0, 0), m)
    pv.convert("RGB").resize((256, 256), Image.LANCZOS).save(sys.argv[3])
