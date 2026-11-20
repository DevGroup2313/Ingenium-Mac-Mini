"""Fabrica stage 3, part two, as pictures: one per step, the new part ringed in violet, one plain sentence each. Every picture is the running app."""
import os, sys
from PIL import Image, ImageDraw, ImageFont

D = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.abspath(__file__)) + "/pics"
OUTP = sys.argv[2] if len(sys.argv) > 2 else os.path.dirname(D) + "/Fabrica_stage_3_part_2_in_pictures.png"
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-%s.otf" % ("SemiBold" if b else "Medium"), n)
STEPS = [
    ("1-ideas", "Ideas: Pick its versions",
     "An idea you are not working on offers Pick its versions: those of its versions that the idea you are on does not hold yet."),
    ("2-sheet", "The versions you can pick",
     "Newest first, each with Bring it here. The other idea is not changed."),
    ("3-brought", "Brought in",
     "A new version on the idea you are on, with its own words and its author, and the line git itself writes to say where it came from."),
    ("4-history", "In the history",
     "The version as it is kept: its words, then “(cherry picked from commit …)”, exactly as git writes it."),
    ("5-both", "When a line was changed both ways",
     "Both versions wait in the file, between git's marks, as in a merge, until you choose and keep the version."),
    ("6-aside-key", "Changes: Put aside",
     "Beside Keep this version: what waits is kept out of the files for now, named by the words you wrote for it."),
    ("7-aside-list", "Put aside",
     "Its list, newest first: the words, the idea, how many files and when, with Drop and Bring back."),
    ("8-drop-ask", "Drop, asked first",
     "What is put aside is in no version, so dropping it is asked first."),
    ("9-sheet-night", "By night: the versions you can pick",
     "The same sheet in Fabrica's night colours."),
    ("10-aside-night", "By night: Put aside",
     "The same list in Fabrica's night colours."),
]
W, M = 1240, 44
bg, ink, ink2, violet = (244, 241, 248), (34, 26, 46), (90, 82, 104), (106, 63, 181)


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
head = ["Fabrica, stage 3, part two: cherry-pick and changes put aside (a preview, held until your yes)",
        "Recommendation 11 of the audit, checked against git itself. Each picture is the real app with an invented app (Tide Clock) and invented people; the violet ring marks what is new. On a drive, and submodules, come next."]
y += 50 + 30 * len(wrap(dr0, head[0], F(28, True), W - 2 * M)) - 30 + 30 * len(wrap(dr0, head[1], F(19), W - 2 * M)) + 26
for key, title, text in STEPS:
    f = os.path.join(D, key + ".png")
    if not os.path.exists(f):
        print("missing", key); continue
    im = Image.open(f).convert("RGB")
    sc = min(1.0, (W - 2 * M) / im.size[0], 520 / im.size[1]); im = im.resize((round(im.size[0] * sc), round(im.size[1] * sc)), Image.LANCZOS)
    lines = wrap(dr0, text, F(18), W - 2 * M)
    blocks.append((y, key, title, lines, im)); y += 40 + 27 * len(lines) + 10 + im.size[1] + 40
out = Image.new("RGB", (W, y + M - 20), bg); dr = ImageDraw.Draw(out)
hl = wrap(dr, head[0], F(28, True), W - 2 * M)
for i, l in enumerate(hl):
    dr.text((M, M + 34 * i), l, font=F(28, True), fill=ink)
for i, l in enumerate(wrap(dr, head[1], F(19), W - 2 * M)):
    dr.text((M, M + 34 * len(hl) + 16 + 30 * i), l, font=F(19), fill=ink2)
for n, (yy, key, title, lines, im) in enumerate(blocks):
    dr.ellipse((M, yy + 2, M + 28, yy + 30), fill=violet); dr.text((M + 9 if n < 9 else M + 4, yy + 4), str(n + 1), font=F(18, True), fill=(255, 255, 255))
    dr.text((M + 40, yy + 2), title, font=F(21, True), fill=ink)
    for i, l in enumerate(lines):
        dr.text((M, yy + 40 + 27 * i), l, font=F(18), fill=ink2)
    iy = yy + 40 + 27 * len(lines) + 10
    out.paste(im, (M, iy)); dr.rectangle((M - 1, iy - 1, M + im.size[0], iy + im.size[1]), outline=(220, 214, 230))
out.save(OUTP, optimize=True); print(OUTP, out.size)
