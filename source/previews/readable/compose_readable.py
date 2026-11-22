"""Read it as written, scrambled for everyone else, part one (modules/r357.js), as pictures of the running app: one file per picture, at
full size, each with its violet number, its title and one sentence above it (her rule: "Pictures one by one, at full size"). An invented
app (Tide Clock) and a reading key made for the pictures only; the violet ring marks what is new. The file and the code shown are real.
    python3 previews/readable/compose_readable.py <folder of capture_readable.js pictures> <out folder>"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-%s.otf" % ("SemiBold" if b else "Medium"), n)
STEPS = [
    ("1-before", "Ingenium itself: Read it as written",
     "In Settings, Security, Ingenium itself: where you make the key that will open Ingenium's code for you as written. It says plainly that this copy's code is still as written."),
    ("2-make", "Make your reading key",
     "Made on your own device and kept there only under its own password. Your owner key keeps signing alone."),
    ("3-made", "Your reading key is here",
     "It names the key, and says this release does not carry its public half yet: save it, and give the file for the next release."),
    ("4-made-night", "The same, by night",
     "The room's own night colours."),
    ("5-public-half", "Its public half: nothing secret",
     "The file you give for the next release holds only the public half, numbered by its own fingerprint. That release seals your readable copy of Ingenium to it."),
    ("6-fabrica", "A scrambled copy of your app, back in Fabrica",
     "Fabrica sees which version it was made from, opens that app as you wrote it, and brings nothing scrambled in."),
    ("7-lector", "In Lector's app library",
     "The library keeps your app as written, from Fabrica, and says so."),
    ("8-code", "What came back, and what opens for you",
     "On the left, the scrambled copy; on the right, the very version you wrote, from your Fabrica. In anyone else's Ingenium it stays scrambled."),
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


for n, (key, title, text) in enumerate(STEPS, 1):
    f = os.path.join(SRC, key + ".png")
    if not os.path.exists(f):
        print("missing", key); continue
    im = Image.open(f).convert("RGB")
    W = max(im.size[0] + 2 * M, 1600)
    dr0 = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    lines = wrap(dr0, text, F(36), W - 2 * M)
    head = M + 64 + 22 + 50 * len(lines) + 34
    out = Image.new("RGB", (W, head + im.size[1] + M), bg)
    dr = ImageDraw.Draw(out)
    dr.ellipse((M, M, M + 60, M + 60), fill=violet)
    num = str(n); tw = dr.textlength(num, font=F(34, True))
    dr.text((M + 30 - tw / 2, M + 9), num, font=F(34, True), fill=(255, 255, 255))
    dr.text((M + 84, M + 6), title, font=F(44, True), fill=ink)
    for i, l in enumerate(lines):
        dr.text((M, M + 64 + 22 + 50 * i), l, font=F(36), fill=ink2)
    x = (W - im.size[0]) // 2
    out.paste(im, (x, head))
    dr.rectangle((x - 2, head - 2, x + im.size[0] + 1, head + im.size[1] + 1), outline=edge, width=2)
    p = os.path.join(OUT, "Read_as_written_%02d_%s.png" % (n, key.split("-", 1)[1].replace("-", "_")))
    out.save(p, optimize=True); print(p, out.size)
