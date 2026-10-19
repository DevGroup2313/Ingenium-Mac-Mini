"""Writes The Forge 641 into its repositories: the page, BUILD_INFO.txt and the README's opening.
usage: forge_repo_641.py THE_FORGE.html FORGE_WINDOWS_REPO FORGE_IOS_REPO FORGE_MAC_REPO"""
import json, os, re, shutil, sys, textwrap

page, win, ios, mac = sys.argv[1:5]
# the versions it carries, read from the page itself
meta = json.loads(re.search(r'<script type="application/json" id="forge-bi-meta">(.*?)</script>', open(page, encoding="utf-8").read(), re.S).group(1))
V = {a["key"]: a["version"] for a in meta["apps"]}
NEW = "\n".join(textwrap.wrap(
    "New in 641. The Carpe Diem it carries is %s, whose mini Forge is now The Forge 641 (it was 639). The full page "
    "carries Ingenium %s, which carries The Forge 641 in turn, Carpe Diem %s and Inkwell %s. The About panel and the "
    "footer show the build number and stamp, Build 641 · 9s73, with no date, and the Guide, a Magister lesson and the "
    "glossary no longer read the build by a date or by an old number. Fabrica's frame now follows the room's head while "
    "the help card above it unfolds, so it no longer runs below the window's edge. Nothing else in the Forge changes." % (V["cd"], V["ingenium"], V["cd"], V["inkwell"]), 72)) + "\n\nNew in 640, the build before."


def edit(path, pairs):
    t = open(path, encoding="utf-8").read()
    for a, b in pairs:
        if t.count(a) != 1:
            raise SystemExit("%s: %r not found once" % (path, a[:60]))
        t = t.replace(a, b)
    open(path, "w", encoding="utf-8", newline="").write(t)


def build_info(path):
    edit(path, [("Pass: 640", "Pass: 641"), ("Stamp: 9s72", "Stamp: 9s73")])


def readme(path):
    edit(path, [("Build 640 (9s72), 2026-10-19. Made by The Forge, 19 October 2026.",
                 "Build 641 (9s73), 2026-10-19. Made by The Forge, 19 October 2026."),
                ("New in 639, the build before.", "New in 639."),
                ("New in 640.", NEW)])


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
print("The Forge 641 written into", win, ios, "and", mac)
