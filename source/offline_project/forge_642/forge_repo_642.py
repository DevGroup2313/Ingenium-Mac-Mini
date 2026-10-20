"""Writes The Forge 642 into its repositories: the page, BUILD_INFO.txt, the README's opening, and the Fire app's version.
usage: forge_repo_642.py THE_FORGE.html FORGE_WINDOWS_REPO FORGE_IOS_REPO FORGE_MAC_REPO FORGE_FIRE_REPO
(The save queues in the Fire app's MainActivity and the iPhone and iPad app's DeskView and SaveSheet are written in those
repositories' own sources.)"""
import json, os, re, shutil, sys, textwrap

page, win, ios, mac, fire = sys.argv[1:6]
meta = json.loads(re.search(r'<script type="application/json" id="forge-bi-meta">(.*?)</script>', open(page, encoding="utf-8").read(), re.S).group(1))
V = {a["key"]: a["version"] for a in meta["apps"]}
NEW = "\n".join(textwrap.wrap(
    "New in 642. Fabrica saves its five install packages one after another, each under its own name: before, they were "
    "saved at the same moment, so the Mac package could hold the Fire one. Every other save in the Forge waits its turn "
    "too (the Editor's All six), and the Fire app and the iPhone and iPad app now keep a queue of the files waiting to be "
    "saved. Fabrica is now Ingenium 6.0's: each ship card is chosen by pressing it and has its own Make and save key, "
    "Releases keeps what was made, and an app can be renamed or removed from Fabrica. The full page carries Ingenium %s, "
    "Carpe Diem %s and Inkwell %s." % (V["ingenium"], V["cd"], V["inkwell"]), 72)) + "\n\nNew in 641, the build before."


def edit(path, pairs):
    t = open(path, encoding="utf-8").read()
    for a, b in pairs:
        if t.count(a) != 1:
            raise SystemExit("%s: %r not found once" % (path, a[:60]))
        t = t.replace(a, b)
    open(path, "w", encoding="utf-8", newline="").write(t)


def build_info(path):
    edit(path, [("Build: 2026-10-19", "Build: 2026-10-20"), ("Pass: 641", "Pass: 642"), ("Stamp: 9s73", "Stamp: 9s74")])


HEAD = ("Build 641 (9s73), 2026-10-19. Made by The Forge, 19 October 2026.", "Build 642 (9s74), 2026-10-20. Made by The Forge, 20 October 2026.")


def readme(path):
    edit(path, [HEAD, ("New in 640, the build before.", "New in 640."), ("New in 641.", NEW)])


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
for rel in ("the_forge.html", "app/src/main/assets/the_forge.html"):
    shutil.copyfile(page, os.path.join(fire, rel))
build_info(os.path.join(fire, "BUILD_INFO.txt"))
edit(os.path.join(fire, "README.txt"), [HEAD])
edit(os.path.join(fire, "app", "build.gradle"), [("versionName '641'", "versionName '642'")])
print("The Forge 642 written into", win, ios, mac, "and", fire)
