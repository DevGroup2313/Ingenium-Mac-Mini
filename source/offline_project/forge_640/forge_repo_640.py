"""Writes The Forge 640 into its repositories: the page, BUILD_INFO.txt and the README's opening.
usage: forge_repo_640.py THE_FORGE.html FORGE_WINDOWS_REPO FORGE_IOS_REPO FORGE_MAC_REPO"""
import os, shutil, sys

page, win, ios, mac = sys.argv[1:5]
NEW = """New in 640. The Carpe Diem it carries is 1057, whose mini Forge is now
The Forge 639 (it was 629) and opens on the Carpe Diem it lives in each
time, editing Carpe Diem alone. The full page carries Ingenium 5.7,
Carpe Diem 1057 and Inkwell 7.48. Nothing else in the Forge changes.

Since 639."""


def edit(path, pairs):
    t = open(path, encoding="utf-8").read()
    for a, b in pairs:
        if t.count(a) != 1:
            raise SystemExit("%s: %r not found once" % (path, a[:60]))
        t = t.replace(a, b)
    open(path, "w", encoding="utf-8", newline="").write(t)


def build_info(path):
    edit(path, [("Pass: 639", "Pass: 640"), ("Stamp: 9s71", "Stamp: 9s72"), ("Build: 2026-10-18", "Build: 2026-10-19")])


def readme(path):
    t = open(path, encoding="utf-8").read()
    pairs = [("Build 639 (9s71), 2026-10-18. Made by The Forge, 18 October 2026.",
              "Build 640 (9s72), 2026-10-19. Made by The Forge, 19 October 2026."),
             ("New in 639.", NEW.replace("Since 639.", "New in 639, the build before."))]
    if "New in 638, the build before." in t:
        pairs.insert(1, ("New in 638, the build before.", "New in 638."))
    edit(path, pairs)


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
print("The Forge 640 written into", win, ios, "and", mac)
