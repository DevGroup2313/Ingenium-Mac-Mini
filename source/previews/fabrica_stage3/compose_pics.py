"""Fabrica stage 3, part one, as pictures: one per step, the new part ringed in gold, one plain sentence each. Every picture is the running app."""
import os, sys
from PIL import Image, ImageDraw, ImageFont

D = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.abspath(__file__)) + "/pics"
OUTP = sys.argv[2] if len(sys.argv) > 2 else os.path.dirname(D) + "/Fabrica_stage_3_part_1_in_pictures.png"
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-%s.otf" % ("SemiBold" if b else "Medium"), n)
STEPS = [
    ("1-reviewers", "Reviewers: a third chip beside People and Milestone",
     "Under the chips, each one asked has a pill saying what they did since: waiting, approved, asked for changes, or commented. The pill names the CODEOWNERS line that asked them."),
    ("2-ask", "Ask for a review",
     "The chip opens Ingenium's own list: the people known in the repository, your own model, Someone else, or No one."),
    ("3-reading", "Your model, reading",
     "Asked for a review, your model reads the pull request's own changes. Its pill says reading until it is done."),
    ("4-model", "Your model's review, kept as a comment",
     "It is written by your model and says so. A model never approves; its pill then says commented."),
    ("5-owners", "Code owners, in the merge box",
     "CODEOWNERS is read as GitHub reads it. The box says whose review each changed file waits for, and which lines GitHub would skip. It holds nothing back."),
    ("6-suggest", "Suggest a change",
     "A comment on a line now offers Suggest a change. It starts from the line as it is; empty takes the line away."),
    ("7-thread", "The suggestion, in its thread",
     "The change is drawn as Fabrica draws changes, with Commit suggestion and Add suggestion to batch."),
    ("7b-panel", "A change of its own, for your yes: the panel of changes grows with its threads",
     "In a pull request's Files changed, the panel of changes was held to 120 pixels under a long head, so a comment or a suggestion under a line was cut off. It now shows the file's changes in full, and the view scrolls as a whole."),
    ("8-commit", "Commit the suggestion",
     "One version on the pull request's own idea. The message names who suggested it, and no other file is touched."),
    ("9-committed", "Committed",
     "The thread then says which version holds it, who kept it, and when."),
    ("10-batch", "A batch, kept as one version",
     "Suggestions added to the batch are kept together. Each line is checked first, and nothing is written if one has changed."),
    ("11-outdated", "Out of date",
     "If the line has changed since the suggestion was made, it says so and offers no key to apply it."),
    ("12-reviewers-night", "By night: the reviewers",
     "The same pills in Fabrica's night colours."),
    ("13-thread-night", "By night: a suggestion",
     "The same thread in Fabrica's night colours."),
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
head = ["Fabrica, stage 3, part one: reviewers, code owners and suggested changes (a preview, held until your yes)",
        "Recommendations 9 and 10 of the audit, checked against GitHub's own documentation. Each picture is the real app with an invented app (Tide Clock) and invented people; the gold ring marks what is new."]
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
    dr.ellipse((M, yy + 2, M + 28, yy + 30), fill=gold); dr.text((M + 9 if n < 9 else M + 4, yy + 4), str(n + 1), font=F(18, True), fill=(255, 255, 255))
    dr.text((M + 40, yy + 2), title, font=F(21, True), fill=ink)
    for i, l in enumerate(lines):
        dr.text((M, yy + 40 + 27 * i), l, font=F(18), fill=ink2)
    iy = yy + 40 + 27 * len(lines) + 10
    out.paste(im, (M, iy)); dr.rectangle((M - 1, iy - 1, M + im.size[0], iy + im.size[1]), outline=(220, 214, 230))
out.save(OUTP, optimize=True); print(OUTP, out.size)
