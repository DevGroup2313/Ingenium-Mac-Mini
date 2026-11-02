"""Writes The Forge 635 into its repositories: the page, BUILD_INFO.txt and the README's opening.
usage: forge_repo_635.py THE_FORGE.html FORGE_WINDOWS_REPO FORGE_IOS_REPO"""
import os, shutil, sys

page, win, ios = sys.argv[1:4]
NEW = """New in 635. Its own Tabula now holds a thesis of 100,000 words, by
Inkwell 7.44's recipe. A keystroke is answered at once, because the
pages are laid out only as far as an edit moves them. A long document is
kept in the browser's larger store (IndexedDB), so it is not lost when it
outgrows the small one. It carries Inkwell 7.44, whose Tabula opens and
keeps such a thesis, finds anything in it as Word's Navigation pane does,
and offers eleven supports for your own way of working, each off until
you switch it on. It also carries Ingenium 5.3, whose Tabula holds a
thesis by the same recipe and whose Lector keeps the figures of an
edition you keep outside it (such as a full edition) apart from the copy
it carries, and Carpe Diem 1054, and a copy of itself.

Since 634."""


def build_info(path):
    t = open(path, encoding="utf-8").read()
    for a, b in (("Pass: 634", "Pass: 635"), ("Stamp: 9s66", "Stamp: 9s67")):
        if t.count(a) != 1:
            raise SystemExit("%s: %r not found once" % (path, a))
        t = t.replace(a, b)
    open(path, "w", encoding="utf-8", newline="").write(t)


def readme(path):
    t = open(path, encoding="utf-8").read()
    for a, b in (("Build 634 (9s66), 2026-10-18. Made by The Forge, 18 October 2026.",
                  "Build 635 (9s67), 2026-10-18. Made by The Forge, 18 October 2026."),
                 ("New in 634.", NEW.replace("Since 634.", "New in 634, the build before."))):
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
print("The Forge 635 written into", win, "and", ios)
