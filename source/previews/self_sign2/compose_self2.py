"""Ingenium itself, signed and checked, part two (modules/r355.js, its hooks in r348, and the refusal page the iPhone, iPad and Fire apps
will show): one file per picture, at full size, each with its violet number, its title and one sentence above it (her rule: "Pictures one
by one, at full size"). A test owner key; the violet ring marks what is new. The phone's and tablet's frames are drawn for the pictures.
    python3 previews/self_sign2/compose_self2.py <folder of capture_self2.js pictures> <out folder>"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-%s.otf" % ("SemiBold" if b else "Medium"), n)
STEPS = [
    ("1-sign-card", "Sign this release, on your computer",
     "The same card as now, with one more line: it signs the copy your computers run and the copy your iPhone, iPad and Fire tablet carry."),
    ("2-signed-computer", "Signed: one file for every device",
     "Save the signature saves one file that each of your computers, phones and tablets takes; Sign a copy you give is new."),
    ("3-phone-unsigned", "On your iPhone: not signed yet",
     "Settings, Security, Ingenium itself, on the phone: Bring a signature in takes the file you saved on your computer."),
    ("4-phone-signed", "On your iPhone: signed",
     "Brought in and checked; from then on the iPhone checks Ingenium at every start, before anything of it runs."),
    ("5-phone-refused", "A changed copy, on an iPhone",
     "The app shows its own page in Ingenium's place, saying which file changed and what you signed; nothing of the changed file runs."),
    ("6-tablet-refused", "A changed copy, on a Fire tablet, by night",
     "The same page, in the night colours, at a tablet's size."),
    ("7-give-card", "Sign a copy you give",
     "On your computer you choose the gift or full edition's page; it is read there, and signed with your owner key."),
    ("8-give-saved", "Saved, to give with that copy",
     "Whoever runs it brings it in once, and their apps check that copy at every start: Signed by its maker."),
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
    p = os.path.join(OUT, "Self_check_%02d_%s.png" % (n, key.split("-", 1)[1].replace("-", "_")))
    out.save(p, optimize=True); print(p, out.size)
