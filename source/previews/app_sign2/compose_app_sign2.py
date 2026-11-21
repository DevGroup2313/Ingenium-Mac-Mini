"""Your apps signed when shipped, part two (modules/r352.js, the shells' check), as pictures of the running app and of the page each
device's app shows: one file per picture, at full size, each with its violet number, its title and one sentence above it (her rule:
"Pictures one by one, at full size"). Invented apps (Tide Clock, Harbour Notes) and a test owner key; the violet ring marks what is new.
The window around each device's page is drawn for the picture; the page inside it is the one the shells carry (shells/common/refused.html).
    python3 previews/app_sign2/compose_app_sign2.py <folder of capture_app_sign2.js pictures> <out folder>"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-%s.otf" % ("SemiBold" if b else "Medium"), n)
STEPS = [
    ("1-room", "The Security room: Signed with your key",
     "Its words now say that every app checks your signature each time it starts, on every device, and that an app is checked as it comes into your library."),
    ("2-package-details", "Package details: Signed with your owner key",
     "The switch for each app says the same in its own sentence, and is on unless you turn it off for that app."),
    ("3-mac", "A changed copy, on a Mac",
     "The Mac app checks its page before anything of it runs, and shows this card in its place: the card you approved for the web app."),
    ("4-windows-night", "On Windows, by night",
     "The Windows app does the same, and the card takes the night colours when Windows is set to dark."),
    ("5-fire", "On the Fire tablet",
     "The Fire tablet's and Android's app checks its page in the same way before it shows it."),
    ("6-iphone-night", "On the iPhone, by night: a signature taken away",
     "A page whose signature was removed is refused too, because the app itself records that it was made signed."),
    ("7-library", "Lector's tiles of your apps: what each check found",
     "Each app in your library carries a small raised mark: Signed by you, or Not signed for the apps made before your signatures."),
    ("8-changed", "A changed copy, as it comes in",
     "Nothing of it is kept unless you say so: the card opens on Leave it out, and Keep it anyway keeps it marked Changed."),
    ("9-left-out", "What the library says afterwards",
     "The note says the copy was left out as you chose, never that it could not be read."),
    ("10-library-night", "By night: the marks on Lector's tiles",
     "The same marks in the night colours."),
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
    p = os.path.join(OUT, "Signing_part_two_%02d_%s.png" % (n, key.split("-", 1)[1].replace("-", "_")))
    out.save(p, optimize=True); print(p, out.size)
