"""Writes The Forge 632 into its repositories: the page, BUILD_INFO.txt and the README's opening.
usage: forge_repo_632.py THE_FORGE.html FORGE_WINDOWS_REPO FORGE_IOS_REPO"""
import os, shutil, sys

page, win, ios = sys.argv[1:4]
NEW = """New in 632. The Forge carries your four apps inside this one file, as
Ingenium does: Ingenium 5.0, Carpe Diem 1052 and Inkwell 7.43, and a copy of
itself. On its first start on each device it keeps them in the Editor, each
checked against its fingerprint, so no app library file is needed any more.
The copies it carries are lean: Ingenium comes without the apps Ingenium
carries, and the Forge's copy of itself without the apps the Forge carries
(a file cannot hold a full copy of an app that holds a full copy of it back).
The thoughts panel now follows day and night while it is open, and the Focus
room uses the newest support module.

Since 631."""


def build_info(path):
    t = open(path, encoding="utf-8").read()
    for a, b in (("Build: 2026-10-17", "Build: 2026-10-18"), ("Pass: 631", "Pass: 632"), ("Stamp: 9s63", "Stamp: 9s64")):
        if t.count(a) != 1:
            raise SystemExit("%s: %r not found once" % (path, a))
        t = t.replace(a, b)
    open(path, "w", encoding="utf-8", newline="").write(t)


def readme(path):
    t = open(path, encoding="utf-8").read()
    for a, b in (("Build 631 (9s63), 2026-10-17. Made by The Forge, 17 October 2026.",
                  "Build 632 (9s64), 2026-10-18. Made by The Forge, 18 October 2026."),
                 ("New in 631.", NEW)):
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
print("The Forge 632 written into", win, "and", ios)
