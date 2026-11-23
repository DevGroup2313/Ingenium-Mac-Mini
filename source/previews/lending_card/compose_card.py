"""Mentes' Lending now, redesigned (modules/r361.js): today's card, then designs A and B, from capture_card.js. Adapted from lend_ask/compose_lend.py.
Asking and offering with Accept (modules/r360.js), each computer's colour, the who-answers glow and the memory meter (modules/r361.js),
as pictures of the running app: one file per picture, at full size, each with its violet number, its title and one sentence above it (her
rule: "Pictures one by one, at full size"). Atelier is the computer that lends; Reading Tablet and Pocket Phone are devices (invented names).
The violet ring marks what is new where a picture shows more than the new part.
    python3 previews/lend_ask/compose_lend.py <folder of capture_lend.js pictures> <folder of glow frames> <out folder>"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

SRC, OUT = sys.argv[1], sys.argv[2]; GLOW = SRC
os.makedirs(OUT, exist_ok=True)
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-%s.otf" % ("SemiBold" if b else "Medium"), n)
STEPS = [
    ("1-today", "Today: Lending now",
     "One large card under the tabs, on every tab of Mentes, with the meter across the page and a row for each device."),
    ("2-design-a-folded", "Design A: a slim strip, folded (recommended)",
     "One raised strip: who uses this computer's models, a small level meter and the memory in use. It stays folded until you open it."),
    ("3-design-a-open", "Design A, open",
     "The arrow opens it in place: the full meter and each device's use, two to a row. It remembers how you left it."),
    ("2-design-a-folded-night", "Design A by night, folded", "The same, in the night colours."),
    ("3-design-a-open-night", "Design A by night, open", "The same, open."),
    ("4-design-b-folded", "Design B: a key beside the tabs",
     "Nothing on the page itself: a small key at the end of Mentes' tabs, its little level moving with the memory in use."),
    ("5-design-b-open", "Design B, open",
     "Pressing the key opens a small panel over the page, with the meter and each device's use. Pressing elsewhere closes it."),
    ("4-design-b-folded-night", "Design B by night", "The same, in the night colours."),
    ("5-design-b-open-night", "Design B by night, open", "The same, open."),
]
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


def strip(mode):
    """The four frames of one pulse side by side, each with its moment under it."""
    fr = [Image.open(os.path.join(GLOW, "%s_%d.png" % (mode, i))).convert("RGB") for i in range(4)]
    import json
    times = json.load(open(os.path.join(GLOW, "%s_times.json" % mode)))
    w, h, gap = fr[0].size[0], fr[0].size[1], 48
    im = Image.new("RGB", (4 * w + 3 * gap, h + 70), (239, 234, 246))
    dr = ImageDraw.Draw(im)
    for i, f in enumerate(fr):
        im.paste(f, (i * (w + gap), 0))
        t = "%.2f s" % times[i]; tw = dr.textlength(t, font=F(30))
        dr.text((i * (w + gap) + (w - tw) / 2, h + 20), t, font=F(30), fill=ink2)
    return im


for n, (key, title, text) in enumerate(STEPS, 1):
    if key.startswith("glow-"):
        try:
            im = strip(key.split("-")[1])
        except FileNotFoundError:
            print("missing", key); continue
    else:
        f = os.path.join(SRC, key + ".png")
        if not os.path.exists(f):
            print("missing", key); continue
        im = Image.open(f).convert("RGB")
    W = max(im.size[0] + 2 * M, 1600)
    dr0 = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    tl = wrap(dr0, title, F(44, True), W - 2 * M - 84)
    lines = wrap(dr0, text, F(36), W - 2 * M)
    th = 56 * len(tl)
    head = M + max(64, th) + 22 + 50 * len(lines) + 34
    out = Image.new("RGB", (W, head + im.size[1] + M), bg)
    dr = ImageDraw.Draw(out)
    dr.ellipse((M, M, M + 60, M + 60), fill=violet)
    num = str(n); tw = dr.textlength(num, font=F(34, True))
    dr.text((M + 30 - tw / 2, M + 9), num, font=F(34, True), fill=(255, 255, 255))
    for i, l in enumerate(tl):
        dr.text((M + 84, M + 6 + 56 * i), l, font=F(44, True), fill=ink)
    for i, l in enumerate(lines):
        dr.text((M, M + max(64, th) + 22 + 50 * i), l, font=F(36), fill=ink2)
    x = (W - im.size[0]) // 2
    out.paste(im, (x, head))
    dr.rectangle((x - 2, head - 2, x + im.size[0] + 1, head + im.size[1] + 1), outline=edge, width=2)
    p = os.path.join(OUT, "Lending_card_%02d_%s.png" % (n, (key.split("-", 1)[1] if key[0].isdigit() else key).replace("-", "_")))
    out.save(p, optimize=True); print(p, out.size)
