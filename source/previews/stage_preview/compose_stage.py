"""Every app opens in the preview (modules/r358.js), Clear the preview (modules/r359.js) and three light designs for the preview's More,
as pictures of the running app: one file per picture, at full size, each with its violet number, its title and one sentence above it (her
rule: "Pictures one by one, at full size"). Lakay as the page carries it, in its practice store with sample goods only; the violet ring
marks what is new. The first picture is the released 7.68, for comparison.
    python3 previews/stage_preview/compose_stage.py <folder of capture_stage.js pictures> <out folder>"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-%s.otf" % ("SemiBold" if b else "Medium"), n)
STEPS = [
    ("1-before", "Before: Lakay in the preview (7.68)",
     "The preview runs each app in a locked box, where the browser refuses it a database. Lakay keeps its books in one, so it stopped at its door."),
    ("2-door", "Now: Lakay's own door",
     "Ingenium now gives every app in the preview a database, cookies and a cache of its own, kept apart from yours. Lakay shows Enter."),
    ("3-practice", "Enter: the practice store, every room",
     "Lakay opens fully and you can use it. What it keeps is saved by Ingenium, sealed with the rest of your work, and comes back after each edit."),
    ("4-more-clear", "Clear the preview, in More",
     "A new key just above Close. It takes the app off the preview and stops it running. Nothing of yours is deleted."),
    ("5-cleared", "The preview, cleared",
     "The panel stays empty in this conversation until you open a page, or a reply writes a new one. A note says so, and that nothing was deleted."),
    ("6-more-now", "More as it is today",
     "For comparison with the three designs that follow. Each row is a raised key with its own edge and shadow."),
    ("7-design-a", "Design A: quiet rows on one raised card (recommended)",
     "The menu is one raised card; its rows lie quietly in it and rise only under the pointer, as you chose for the Code page's start window."),
    ("8-design-a-night", "Design A by night", "The same, in the night colours."),
    ("7-design-b", "Design B: rows set into the card",
     "Each row is gently pressed into the card, and rises out of it under the pointer."),
    ("8-design-b-night", "Design B by night", "The same, in the night colours."),
    ("7-design-c", "Design C: slimmer raised keys",
     "Closest to today: each row stays a raised key, with a thinner edge and a softer shadow."),
    ("8-design-c-night", "Design C by night", "The same, in the night colours."),
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
    p = os.path.join(OUT, "Preview_%02d_%s.png" % (n, key.split("-", 1)[1].replace("-", "_")))
    out.save(p, optimize=True); print(p, out.size)
