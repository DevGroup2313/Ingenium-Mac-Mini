"""Writes The Forge 638 into its repositories: the page, BUILD_INFO.txt and the README's opening.
usage: forge_repo_638.py THE_FORGE.html FORGE_WINDOWS_REPO FORGE_IOS_REPO FORGE_MAC_REPO"""
import os, shutil, sys

page, win, ios, mac = sys.argv[1:5]
NEW = """New in 638. Its Tabula lays out a long document as Word does: a
paragraph that meets the foot of a page runs on to the next one, so no
page ends in a blank gap, and a footnote is placed in a moment, even in
a thesis (Inkwell 7.45's recipe). Footnotes stand at the foot of the
page that cites them, are written where they stand, and go into Word
files as real footnotes (Inkwell 7.48's recipe). Tabula keeps its
raised pages when it is opened on its own. There is more room on the
device: Tabula autosaves a document of up to 256 MB in the browser's
larger store, and when the small store (about 5 MB) is full, the
Forge's desk is kept in the larger store and opens from there. It
carries Ingenium 5.5 (which brings in your Claude conversations),
Carpe Diem 1056 and Inkwell 7.48.

Since 637."""


def build_info(path):
    t = open(path, encoding="utf-8").read()
    for a, b in (("Pass: 637", "Pass: 638"), ("Stamp: 9s69", "Stamp: 9s70")):
        if t.count(a) != 1:
            raise SystemExit("%s: %r not found once" % (path, a))
        t = t.replace(a, b)
    open(path, "w", encoding="utf-8", newline="").write(t)


def readme(path):
    t = open(path, encoding="utf-8").read()
    pairs = [("Build 637 (9s69), 2026-10-18. Made by The Forge, 18 October 2026.",
              "Build 638 (9s70), 2026-10-18. Made by The Forge, 18 October 2026."),
             ("New in 637.", NEW.replace("Since 637.", "New in 637, the build before."))]
    if "New in 636, the build before." in t:
        pairs.insert(1, ("New in 636, the build before.", "New in 636."))
    for a, b in pairs:
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
shutil.copyfile(page, os.path.join(mac, "Mac project", "the_forge.html"))
build_info(os.path.join(mac, "Mac project", "BUILD_INFO.txt"))
readme(os.path.join(mac, "Mac project", "README.txt"))
print("The Forge 638 written into", win, ios, "and", mac)
