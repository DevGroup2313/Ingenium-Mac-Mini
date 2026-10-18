"""Writes The Forge 639 into its repositories: the page, BUILD_INFO.txt and the README's opening.
usage: forge_repo_639.py THE_FORGE.html FORGE_WINDOWS_REPO FORGE_IOS_REPO FORGE_MAC_REPO"""
import os, shutil, sys

page, win, ios, mac = sys.argv[1:5]
NEW = """New in 639. Fabrica, your own GitHub, now stands in the Forge, on the
rail between Files and the Workshop, and it needs no model and no
connection. Each of your apps is kept as a real git repository on the
device: every version, the changes file by file and line by line, ideas
as branches brought back into main, releases, and an undo that adds a
version and never writes over one. Files are written in Fabrica's own
file editor, or in the Forge's Editor, whose edits come back as changes
to keep. A version is tested (five checks in a quiet window) and made as
one page, as a web app, or as the Forge's five install packages; any git
opens the folder, the bundle or the zip it saves, and GitHub is a switch
you turn on only if you want it. The full page carries Ingenium 5.6, in
which Decode a message and Draft a reply open a conversation of their
own, with Carpe Diem 1056 and Inkwell 7.48.

Since 638."""


def build_info(path):
    t = open(path, encoding="utf-8").read()
    for a, b in (("Pass: 638", "Pass: 639"), ("Stamp: 9s70", "Stamp: 9s71")):
        if t.count(a) != 1:
            raise SystemExit("%s: %r not found once" % (path, a))
        t = t.replace(a, b)
    open(path, "w", encoding="utf-8", newline="").write(t)


def readme(path):
    t = open(path, encoding="utf-8").read()
    pairs = [("Build 638 (9s70), 2026-10-18. Made by The Forge, 18 October 2026.",
              "Build 639 (9s71), 2026-10-18. Made by The Forge, 18 October 2026."),
             ("New in 638.", NEW.replace("Since 638.", "New in 638, the build before."))]
    if "New in 637, the build before." in t:
        pairs.insert(1, ("New in 637, the build before.", "New in 637."))
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
print("The Forge 639 written into", win, ios, "and", mac)
