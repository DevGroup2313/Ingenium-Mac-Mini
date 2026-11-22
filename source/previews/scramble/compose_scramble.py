"""Your apps' code scrambled (modules/r356.js), as pictures of the running app and of the page Fabrica ships: one file per picture, at
full size, each with its violet number, its title and one sentence above it (her rule: "Pictures one by one, at full size"). Invented
apps (Tide Clock, Name Keeper); the violet ring marks what is new. The two windows around Tide Clock are drawn for the picture; the pages
inside them are the real ones, and the code shown is the real code.
    python3 previews/scramble/compose_scramble.py <folder of capture_scramble.js pictures> <out folder>"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-%s.otf" % ("SemiBold" if b else "Medium"), n)
STEPS = [
    ("1-package-details", "Package details: Scrambled code",
     "A new switch for each app, under the two you know: on for every app until you turn it off for one."),
    (("2a-ship-tile", "2b-ship-line"), "The Ship card says so",
     "What was made scrambled carries a Scrambled chip, and the package's line says its code is scrambled."),
    ("3-room-day", "The Security room: Scrambled code, On",
     "No longer Not yet: it says what is scrambled, what stays as you wrote it, and that it is never impossible to read."),
    ("4-room-night", "The same, by night",
     "The room's own night colours."),
    ("5-code", "Your code, and the code that is shipped",
     "Your sources in Fabrica stay exactly as you wrote them; the package carries the same script shrunk, its comments gone (a copyright note stays) and the names inside each function scrambled."),
    ("6-same", "It still works the same",
     "Tide Clock as you wrote it, and as it is shipped: the same page, the same time, the same key."),
    ("7-safety", "If scrambling would break an app",
     "Before anything is made, the scrambled copy is run beside yours; if it shows an error yours does not, the package carries your code as written, and Ingenium tells you."),
    ("8-ingenium", "Ingenium itself is never scrambled",
     "In Ingenium's own Package details the switch stays off and cannot be turned on: its copy stays as you wrote it."),
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


def picture(keys):
    """one picture, or several (one part of the app each) stacked and centred, with a gap between them"""
    ims = []
    for k in keys:
        f = os.path.join(SRC, k + ".png")
        if not os.path.exists(f):
            print("missing", k); return None
        ims.append(Image.open(f).convert("RGB"))
    if len(ims) == 1:
        return ims[0]
    gap = 48
    w, h = max(i.size[0] for i in ims), sum(i.size[1] for i in ims) + gap * (len(ims) - 1)
    out, y = Image.new("RGB", (w, h), bg), 0
    for i in ims:
        out.paste(i, ((w - i.size[0]) // 2, y)); ImageDraw.Draw(out).rectangle(((w - i.size[0]) // 2 - 1, y - 1, (w + i.size[0]) // 2, y + i.size[1]), outline=edge, width=2)
        y += i.size[1] + gap
    return out


for n, (key, title, text) in enumerate(STEPS, 1):
    keys = key if isinstance(key, tuple) else (key,)
    im = picture(keys)
    if im is None:
        continue
    stacked = len(keys) > 1
    key = "%d-ship-card" % n if stacked else key
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
    if not stacked:
        dr.rectangle((x - 2, head - 2, x + im.size[0] + 1, head + im.size[1] + 1), outline=edge, width=2)
    p = os.path.join(OUT, "Scrambled_code_%02d_%s.png" % (n, key.split("-", 1)[1].replace("-", "_")))
    out.save(p, optimize=True); print(p, out.size)
