"""Writes The Forge 633 into its repositories: the page, BUILD_INFO.txt and the README's opening.
usage: forge_repo_633.py THE_FORGE.html FORGE_WINDOWS_REPO FORGE_IOS_REPO"""
import os, shutil, sys

page, win, ios = sys.argv[1:4]
NEW = """New in 633. The tour and the Guidebook describe the workshop as it now
stands: nine rooms on the rail in four groups, the Editor's five steps, and
new cards for Files, Focus, the Inbox (the thought bubble), the Agenda and
Projects, in English and French. The tour's Editing switch card rings the
switch where it now is, and says that the Forge carries its apps inside it.
Magister's tip and the Guidebook now say four questions for each module, as
the Assessments room has them, and year 1, term 1 is said to hold eight
lessons, as it does. The lesson shown after the carried apps are kept names
the fingerprints they were checked against. It carries Ingenium 5.1,
Carpe Diem 1054 and Inkwell 7.43, and a copy of itself.

Since 632."""


def build_info(path):
    t = open(path, encoding="utf-8").read()
    for a, b in (("Pass: 632", "Pass: 633"), ("Stamp: 9s64", "Stamp: 9s65")):
        if t.count(a) != 1:
            raise SystemExit("%s: %r not found once" % (path, a))
        t = t.replace(a, b)
    open(path, "w", encoding="utf-8", newline="").write(t)


def readme(path):
    t = open(path, encoding="utf-8").read()
    for a, b in (("Build 632 (9s64), 2026-10-18. Made by The Forge, 18 October 2026.",
                  "Build 633 (9s65), 2026-10-18. Made by The Forge, 18 October 2026."),
                 ("New in 632.", NEW.replace("Since 632.", "New in 632, the build before."))):
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
print("The Forge 633 written into", win, "and", ios)
