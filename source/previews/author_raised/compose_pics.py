"""The Author Studio, raised (modules/r353.js, held for her preview), as pictures of the running studio: one file per picture, at full
size, each with its violet number, its title and one sentence above it (her rule: "Pictures one by one, at full size"). A fresh copy
holding nothing of hers; two invented rewrites so the rows have something to show.
    python3 previews/author_raised/compose_pics.py <folder of capture_pics.js pictures> <out folder>"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-%s.otf" % ("SemiBold" if b else "Medium"), n)
STEPS = [
    ("01-editor-before", "The Editor as it is now",
     "For comparison: flat white sheets and flat panels, nothing raised and nothing moving."),
    ("02-editor", "The Editor, raised",
     "Each kind is a raised tile with its room's mark on a violet disc, and the cards rise in one after another as the room opens."),
    ("03-editor-pointer", "Under the pointer",
     "A tile lifts and leans toward the pointer, its mark tilts, and it sinks when pressed, as Settings' tiles do."),
    ("04-words", "Words",
     "The cards are raised slabs, the search field a lit well, and each rewrite a raised row that lifts under the pointer."),
    ("05-names", "Names",
     "Each page's names sit on a raised tile that leans and lifts like the Editor's."),
    ("06-look", "Look",
     "The ready looks are raised keys that lift and sink; the fields are lit wells."),
    ("07-additions", "Additions",
     "The layers' strip is a well, and the chosen layer a raised key that slides under the choice."),
    ("08-change-log", "Change log",
     "Every change is a raised row, with its Undo key beside it."),
    ("09-editor-night", "By night: the Editor",
     "The same depth in the night colours."),
    ("10-look-night", "By night: Look",
     "The ready looks and the fields by night."),
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
    W = im.size[0] + 2 * M
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
    out.paste(im, (M, head))
    dr.rectangle((M - 2, head - 2, M + im.size[0] + 1, head + im.size[1] + 1), outline=edge, width=2)
    p = os.path.join(OUT, "Author_Studio_raised_%02d_%s.png" % (n, key.split("-", 1)[1].replace("-", "_")))
    out.save(p, optimize=True); print(p, out.size)
