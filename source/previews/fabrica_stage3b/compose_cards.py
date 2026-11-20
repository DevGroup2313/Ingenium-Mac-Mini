# One picture for each step of the preview, at full size: a violet number, the step's title and its one sentence above the picture.
# Her rule (20 November 2026): "I can't see anything in these previews. You piled everything together into one tiny image, how am I
# supposed to see it???" So each step is its own picture, sent on its own; never one tall sheet of many pictures.
#   python3 source/previews/fabrica_stage3b/compose_cards.py <the pictures capture_pics.js took> <out folder>
# The steps (file, title, sentence) are compose_pics.py's own, read without running it.
import os, sys
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
PICS, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
src = open(os.path.join(HERE, "compose_pics.py"), encoding="utf-8").read()
a = src.index("STEPS = [")
ns = {}
exec(src[a:src.index("]\n", a) + 2], {}, ns)
STEPS = ns["STEPS"]
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-%s.otf" % ("SemiBold" if b else "Medium"), n)
BG, INK, INK2, VIOLET = (244, 241, 248), (34, 26, 46), (90, 82, 104), (106, 63, 181)   # Ingenium's violet, never gold


def wrap(dr, text, font, width):
    out, line = [], ""
    for w in text.split():
        t = (line + " " + w).strip()
        if dr.textlength(t, font=font) > width and line:
            out.append(line)
            line = w
        else:
            line = t
    if line:
        out.append(line)
    return out


for n, (key, title, text) in enumerate(STEPS):
    im = Image.open(os.path.join(PICS, key + ".png")).convert("RGB")
    if im.size[0] > 1600:
        sc = 1600 / im.size[0]
        im = im.resize((1600, round(im.size[1] * sc)), Image.LANCZOS)
    M = 48
    W = max(1100, im.size[0] + 2 * M)
    tmp = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    tl = wrap(tmp, title, F(40, True), W - 2 * M - 70)
    bl = wrap(tmp, text, F(32), W - 2 * M)
    top = M + 52 * len(tl) + 14 + 44 * len(bl) + 28
    out = Image.new("RGB", (W, top + im.size[1] + M), BG)
    dr = ImageDraw.Draw(out)
    dr.ellipse((M, M + 2, M + 50, M + 52), fill=VIOLET)
    num = str(n + 1)
    dr.text((M + 25 - dr.textlength(num, font=F(30, True)) / 2, M + 8), num, font=F(30, True), fill=(255, 255, 255))
    for i, l in enumerate(tl):
        dr.text((M + 66, M + 2 + 52 * i), l, font=F(40, True), fill=INK)
    for i, l in enumerate(bl):
        dr.text((M, M + 52 * len(tl) + 14 + 44 * i), l, font=F(32), fill=INK2)
    x = (W - im.size[0]) // 2
    out.paste(im, (x, top))
    dr.rectangle((x - 1, top - 1, x + im.size[0], top + im.size[1]), outline=(220, 214, 230))
    p = os.path.join(OUT, "Part2_%02d_%s.png" % (n + 1, key.split("-", 1)[1]))
    out.save(p, optimize=True)
    print(os.path.basename(p), out.size)
