"""Writes The Forge 637 into its repositories: the page, BUILD_INFO.txt and the README's opening.
usage: forge_repo_637.py THE_FORGE.html FORGE_WINDOWS_REPO FORGE_IOS_REPO"""
import os, shutil, sys

page, win, ios = sys.argv[1:4]
NEW = """New in 637. The help level keys ("First day", "Finding my way",
"At ease") are raised and move like every other key in the Forge: they
lift under the pointer, sink when pressed, and the chosen level is the
filled key, which settles into place. They follow day, night and the
Forge's Minimal motion setting. It carries the same apps as 636:
Ingenium 5.4, Carpe Diem 1055 and Inkwell 7.45.

Since 636."""


def build_info(path):
    t = open(path, encoding="utf-8").read()
    for a, b in (("Pass: 636", "Pass: 637"), ("Stamp: 9s68", "Stamp: 9s69")):
        if t.count(a) != 1:
            raise SystemExit("%s: %r not found once" % (path, a))
        t = t.replace(a, b)
    open(path, "w", encoding="utf-8", newline="").write(t)


def readme(path):
    t = open(path, encoding="utf-8").read()
    for a, b in (("Build 636 (9s68), 2026-10-18. Made by The Forge, 18 October 2026.",
                  "Build 637 (9s69), 2026-10-18. Made by The Forge, 18 October 2026."),
                 ("New in 635, the build before.", "New in 635."),
                 ("New in 636.", NEW.replace("Since 636.", "New in 636, the build before."))):
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
print("The Forge 637 written into", win, "and", ios)
