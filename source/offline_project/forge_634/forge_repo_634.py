"""Writes The Forge 634 into its repositories: the page, BUILD_INFO.txt and the README's opening.
usage: forge_repo_633.py THE_FORGE.html FORGE_WINDOWS_REPO FORGE_IOS_REPO"""
import os, shutil, sys

page, win, ios = sys.argv[1:4]
NEW = """New in 634. It carries Ingenium 5.2, whose Lector now keeps your
documents true to each new build: it measures your apps on your device,
finds every figure an update changed in your own words, and updates your
Word files in place, keeping each version. It also carries Carpe Diem 1054
and Inkwell 7.43, and a copy of itself.

Since 633."""


def build_info(path):
    t = open(path, encoding="utf-8").read()
    for a, b in (("Pass: 633", "Pass: 634"), ("Stamp: 9s65", "Stamp: 9s66")):
        if t.count(a) != 1:
            raise SystemExit("%s: %r not found once" % (path, a))
        t = t.replace(a, b)
    open(path, "w", encoding="utf-8", newline="").write(t)


def readme(path):
    t = open(path, encoding="utf-8").read()
    for a, b in (("Build 633 (9s65), 2026-10-18. Made by The Forge, 18 October 2026.",
                  "Build 634 (9s66), 2026-10-18. Made by The Forge, 18 October 2026."),
                 ("New in 633.", NEW.replace("Since 633.", "New in 633, the build before."))):
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
print("The Forge 634 written into", win, "and", ios)
