"""The Offline Project with Clavis, as pictures of the running app and of the hall Fabrica makes: one file per picture, at full size,
each with its violet number, its title and one sentence above it (her rule: "Pictures one by one, at full size"). Her words (22 November
2026): "Yes Clavis should join the Offline Project's crest and bundle, please show me previews." The violet ring marks what is new.
    python3 previews/op_clavis/compose_op_clavis.py <folder of capture_op_clavis.js pictures, renamed in order> <out folder>"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-%s.otf" % ("SemiBold" if b else "Medium"), n)
STEPS = [
    ("1-heart", "Option A: Clavis at the heart of the cross",
     "Your master seal stays as you approved it: Clavis's seal sits in a gold socket where the arms of the cross meet, and the open book rises up the cross."),
    ("2-field", "Option B: Clavis in a field of its own",
     "The shield gains a fifth field in its point, in Clavis's ivory, under a second gilt bar, and the four quarters grow a little shorter."),
    ("3-crown", "Option C: Clavis above the shield",
     "The shield and its four quarters stay exactly as they are, and Clavis's seal stands above them as the crest's crown."),
    ("4-heart-night", "Option A by night",
     "By night Clavis wears its own night seal, onyx and gold, as the four apps wear theirs."),
    ("5-fabrica", "Fabrica: Bring an app in",
     "The Offline Project offers all five apps, and the variation without Inkwell holds Carpe Diem, The Forge, Ingenium and Clavis, each with its crest."),
    ("6-hall-top", "The Offline Project's hall",
     "The hall Fabrica makes wears the crest of five at its head and names the five apps."),
    ("7-hall-rooms", "The five rooms",
     "Clavis has its own room below the four, in its ivory, holding Clavis's own page, its one edition, as Inkwell's room holds Inkwell's."),
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
    p = os.path.join(OUT, "Offline_Project_Clavis_%02d_%s.png" % (n, key.split("-", 1)[1].replace("-", "_")))
    out.save(p, optimize=True); print(p, out.size)
