"""Opens only with your owner key (modules/r354.js), as pictures of the running app and of the door each
package carries: one file per picture, at full size, each with its violet number, its title and one sentence above it (her rule:
"Pictures one by one, at full size"). An invented app (Tide Clock), an invented person (Ada Example) and a test owner key; the violet ring marks what is new.
The window around the door is drawn for the picture; the door inside it is the real one, in the package Fabrica made.
    python3 previews/owner_key/compose_owner_key.py <folder of capture_owner_key.js pictures> <out folder>"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-%s.otf" % ("SemiBold" if b else "Medium"), n)
STEPS = [
    ("1-package-details", "Package details: Opens only with your owner key",
     "A new switch for each app, under Signed with your owner key: turned on, every package of that app carries a door, and is always signed."),
    ("2-room", "The Security room: Opens only with your owner key",
     "It says how many of your apps are yours alone, what the door keeps out, and what no door can."),
    ("3-door", "The door, on a Mac",
     "Where you have never opened the app, this door is all there is: nothing of the app runs behind it."),
    ("4-key", "Open it with your owner key",
     "You choose your owner key's file and type its password, with the key that shows it; the key is used once, there, and never kept."),
    ("5-wrong", "A wrong password",
     "The door says so, in the card's own words, and stays shut."),
    ("6-opened", "Opened, and kept open on that device",
     "With the right password the app opens, and that device keeps it open from then on: your signature on the opening is checked at each start."),
    ("7-door-night", "On an iPhone, by night",
     "The same door, in the night colours, at a phone's size."),
    ("8-permit", "A permission you gave",
     "Someone you gave a permission to use the app opens it with that file, until the day it ends."),
    ("9-ended", "A permission that has ended",
     "It says when it ended and stays shut; one you withdraw stops in the same way, once the app carries your latest list."),
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
    p = os.path.join(OUT, "Owner_key_%02d_%s.png" % (n, key.split("-", 1)[1].replace("-", "_")))
    out.save(p, optimize=True); print(p, out.size)
