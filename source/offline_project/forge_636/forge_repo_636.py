"""Writes The Forge 636 into its repositories: the page, BUILD_INFO.txt and the README's opening.
usage: forge_repo_636.py THE_FORGE.html FORGE_WINDOWS_REPO FORGE_IOS_REPO"""
import os, shutil, sys

page, win, ios = sys.argv[1:4]
NEW = """New in 636. It carries Inkwell 7.45, which adds the checks a
doctoral editor makes on the whole document, places Chicago footnotes in
a third of a second, and runs long paragraphs on across pages. It
carries Carpe Diem 1055, whose Tabula holds a thesis of 100,000 words and
whose mini Forge edits Carpe Diem alone, and Ingenium 5.4, which carries
both, and a copy of itself. The Mac app in every kit the Forge makes now
builds on GitHub: its first start as Intel, under Rosetta, may take up to
40 seconds before the build counts it as failed (it was 12).

Since 635."""


def build_info(path):
    t = open(path, encoding="utf-8").read()
    for a, b in (("Pass: 635", "Pass: 636"), ("Stamp: 9s67", "Stamp: 9s68")):
        if t.count(a) != 1:
            raise SystemExit("%s: %r not found once" % (path, a))
        t = t.replace(a, b)
    open(path, "w", encoding="utf-8", newline="").write(t)


def readme(path):
    t = open(path, encoding="utf-8").read()
    for a, b in (("Build 635 (9s67), 2026-10-18. Made by The Forge, 18 October 2026.",
                  "Build 636 (9s68), 2026-10-18. Made by The Forge, 18 October 2026."),
                 ("New in 635.", NEW.replace("Since 635.", "New in 635, the build before."))):
        if t.count(a) != 1:
            raise SystemExit("%s: %r not found once" % (path, a))
        t = t.replace(a, b)
    open(path, "w", encoding="utf-8", newline="").write(t)


shutil.copyfile(page, os.path.join(win, "the_forge.html"))
build_info(os.path.join(win, "BUILD_INFO.txt"))
readme(os.path.join(win, "README.txt"))
for rel in ("www/the_forge.html", "iphone-ipad/TheForge/www/the_forge.html"):
    shutil.copyfile(page, os.path.join(ios, rel))
build_info(os.path.join(ios, "iphone-ipad", "BUILD_INFO.txt"))
readme(os.path.join(ios, "iphone-ipad", "README.txt"))
print("The Forge 636 written into", win, "and", ios)
