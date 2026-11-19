"""Fabrica stage 2 as pictures: one per step, the new part ringed in gold, one plain sentence each (day). Every picture is the running app."""
import os
from PIL import Image, ImageDraw, ImageFont

D = os.path.dirname(os.path.abspath(__file__)) + "/pics"
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-%s.otf" % ("SemiBold" if b else "Medium"), n)
STEPS = [
    ("1-code", "Code: a session on an app now works with that app's folder",
     "Its folder (ringed) is new in the session's top row. Your notes for the app go with every message, and pressing it shows the app all in one place."),
    ("2-folder", "Its folder: what happened in Fabrica, and its repository",
     "Under Where we left off, Fabrica writes a dated line when a pull request is merged, a release is made or the checks fail. On the right: its branch, newest version, open pull requests and last check."),
    ("3-all", "All in one place",
     "One sheet for the app: where you left off, its repository, its releases and its conversations, with keys to open it in its folder, Fabrica, Adamas or Code."),
    ("4-fabrica", "Fabrica: the same sheet from the app's own page",
     "All in one place stands beside Run it and Ship."),
    ("5-chat", "Chat: a conversation in the folder",
     "All of Tide Clock in the conversation's top row opens the same sheet."),
    ("6-adamas", "Adamas: an app opened from Fabrica",
     "All in one place sits with Adamas's own keys."),
    ("7-make", "An app with no folder yet",
     "In Code, the key says Make its folder: one press makes the folder, and its notes then go with every session."),
]
W, M = 1240, 44
bg, ink, ink2, gold = (244, 241, 248), (34, 26, 46), (90, 82, 104), (212, 162, 58)


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


tmp = Image.new("RGB", (10, 10)); dr0 = ImageDraw.Draw(tmp)
blocks, y = [], M
head = ["Fabrica, stage 2: one ecosystem (a preview, held until your yes)",
        "Your folders, Fabrica, Code, Chat and Adamas joined. Each picture is the real app with invented apps (Tide Clock, Rain Gauge); the gold ring marks what is new."]
y += 50 + 30 * len(wrap(dr0, head[1], F(19), W - 2 * M)) + 26
for key, title, text in STEPS:
    im = Image.open(os.path.join(D, key + ".png")).convert("RGB")
    sc = min(1.0, (W - 2 * M) / im.size[0]); im = im.resize((round(im.size[0] * sc), round(im.size[1] * sc)), Image.LANCZOS)
    lines = wrap(dr0, text, F(18), W - 2 * M)
    blocks.append((y, key, title, lines, im)); y += 40 + 27 * len(lines) + 10 + im.size[1] + 40
out = Image.new("RGB", (W, y + M - 20), bg); dr = ImageDraw.Draw(out)
dr.text((M, M), head[0], font=F(28, True), fill=ink)
for i, l in enumerate(wrap(dr, head[1], F(19), W - 2 * M)):
    dr.text((M, M + 50 + 30 * i), l, font=F(19), fill=ink2)
for n, (yy, key, title, lines, im) in enumerate(blocks):
    dr.ellipse((M, yy + 2, M + 28, yy + 30), fill=gold); dr.text((M + 9 if n < 9 else M + 4, yy + 4), str(n + 1), font=F(18, True), fill=(255, 255, 255))
    dr.text((M + 40, yy + 2), title, font=F(21, True), fill=ink)
    for i, l in enumerate(lines):
        dr.text((M, yy + 40 + 27 * i), l, font=F(18), fill=ink2)
    iy = yy + 40 + 27 * len(lines) + 10
    out.paste(im, (M, iy)); dr.rectangle((M - 1, iy - 1, M + im.size[0], iy + im.size[1]), outline=(220, 214, 230))
p = os.path.dirname(D) + "/Fabrica_stage_2_in_pictures.png"
out.save(p, optimize=True); print(p, out.size)
