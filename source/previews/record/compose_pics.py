"""The record of Ingenium's security, profiles and design in Ingenium's folder (modules/r345.js), as pictures of the running app: one file
per picture, at full size, with its violet number, its title and one sentence above it (her rule: "Pictures one by one, at full size").
    python3 previews/record/compose_pics.py <folder of capture_pics.js pictures> <out folder>"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-%s.otf" % ("SemiBold" if b else "Medium"), n)
STEPS = [("2-its-files", "The record, in Ingenium's folder",
          "Ingenia, Ingenium's folder, Its files and instructions: the eleven files of the record, which go with every conversation in this folder.")]
bg, ink, ink2, violet, edge = (244, 241, 248), (34, 26, 46), (90, 82, 104), (106, 63, 181), (220, 214, 230)
M = 64


def wrap(dr, text, font, width):
    out, line = [], ""
    for w in text.split():
        t = (line + " " + w).strip()
        if dr.textlength(t, font=font) > width and line:
            out.append(line); line = w
        else:
            line = t
    if line:
        out.append(line)
    return out


for n, (key, title, text) in enumerate(STEPS, 1):
    im = Image.open(os.path.join(SRC, key + ".png")).convert("RGB")
    W = im.size[0] + 2 * M
    lines = wrap(ImageDraw.Draw(Image.new("RGB", (10, 10))), text, F(36), W - 2 * M)
    head = M + 64 + 22 + 50 * len(lines) + 34
    out = Image.new("RGB", (W, head + im.size[1] + M), bg); dr = ImageDraw.Draw(out)
    dr.ellipse((M, M, M + 60, M + 60), fill=violet); tw = dr.textlength(str(n), font=F(34, True))
    dr.text((M + 30 - tw / 2, M + 9), str(n), font=F(34, True), fill=(255, 255, 255))
    dr.text((M + 84, M + 6), title, font=F(44, True), fill=ink)
    for i, l in enumerate(lines):
        dr.text((M, M + 64 + 22 + 50 * i), l, font=F(36), fill=ink2)
    out.paste(im, (M, head)); dr.rectangle((M - 2, head - 2, M + im.size[0] + 1, head + im.size[1] + 1), outline=edge, width=2)
    p = os.path.join(OUT, "Record_%d_%s.png" % (n, key.split("-", 1)[1].replace("-", "_"))); out.save(p, optimize=True); print(p, out.size)
