"""The practice studio (modules/r350.js), as pictures of the running app: one file per picture, at full size, each with its violet number,
its title and one sentence above it (her rule: "Pictures one by one, at full size"). An invented person (Ada Example) and invented sample
work; the violet ring marks what is new.
    python3 previews/practice/compose_practice.py <folder of capture_practice.js pictures> <out folder>"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-%s.otf" % ("SemiBold" if b else "Medium"), n)
STEPS = [
    ("1-door", "Who is using Ingenium: Open the practice studio",
     "After Sign out, under the profiles: a line in ink and the door's own key, for showing Ingenium with nothing of anyone's in it."),
    ("2-sign-in", "The sign-in: Open the practice studio",
     "The same way in on the sign-in's card, after its note, where Lakay's door has its practice store."),
    ("3-welcome", "It opens on Ingenium's welcome door",
     "As a new person first sees Ingenium, with the practice studio's mark in the corner where the little lock stands elsewhere."),
    ("4-home", "Home in the practice studio",
     "A strip at the head of Home says what it is, with Start again and Leave; the top bar keeps a Practice studio key on every page."),
    ("5-panel", "The Status panel: Start again, Leave the practice studio",
     "In place of the profiles, the practice studio's own two rows, of the panel's own kind."),
    ("6-chat", "A sample conversation",
     "Three invented conversations, each sample reply marked as a sample."),
    ("7-ingenia", "A sample app's folder on Ingenia",
     "Tide Clock, an invented app, with two files and its conversation, so the drawer and its folders can be tried."),
    ("8-leave", "Leave the practice studio",
     "It asks once, since what was tried there is taken away."),
    ("9-back", "Back at the door it was opened from",
     "Nothing of the practice studio is left: its stores are gone, and its files on the computer app's disk with them."),
    ("10-door-night", "By night: Who is using Ingenium",
     "The practice studio's line and key in the night colours."),
    ("11-welcome-night", "By night: the welcome door",
     "Opened from a door by night, the practice studio opens by night."),
    ("12-home-night", "By night: Home in the practice studio",
     "The strip and the top bar's key in the night colours."),
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
    p = os.path.join(OUT, "Practice_studio_%02d_%s.png" % (n, key.split("-", 1)[1].replace("-", "_")))
    out.save(p, optimize=True); print(p, out.size)
