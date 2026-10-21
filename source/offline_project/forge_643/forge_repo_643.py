"""Writes The Forge 643 into its repositories: the page, BUILD_INFO.txt, the README's opening, and the Fire app's version.
usage: forge_repo_643.py THE_FORGE.html FORGE_WINDOWS_REPO FORGE_IOS_REPO FORGE_MAC_REPO FORGE_FIRE_REPO
What is new in 643 is read from notes_643.txt beside this script (plain words, one paragraph), followed by the versions of
the apps the full page carries. (Refresh in the Mac app's menu, and the question when a page stops answering on the Fire
tablet, the iPhone and the iPad, are written in those repositories' own sources.)"""
import json, os, re, shutil, sys, textwrap

page, win, ios, mac, fire = sys.argv[1:6]
HERE = os.path.dirname(os.path.abspath(__file__))
t = open(page, encoding="utf-8").read()
if 'pass:"643"' not in t or 'id="forge-bi-meta"' not in t:
    raise SystemExit("give the full 643 page (the_forge.html, carrying its apps)")
meta = json.loads(re.search(r'<script type="application/json" id="forge-bi-meta">(.*?)</script>', t, re.S).group(1))
V = {a["key"]: a["version"] for a in meta["apps"]}
notes = " ".join(open(os.path.join(HERE, "notes_643.txt"), encoding="utf-8").read().split())
if not notes or "TODO" in notes:
    raise SystemExit("notes_643.txt: say what is new in 643 first")
NEW = "\n".join(textwrap.wrap(
    "New in 643. " + notes + " The full page carries Ingenium %s, Carpe Diem %s and Inkwell %s." % (V["ingenium"], V["cd"], V["inkwell"]),
    72)) + "\n\nNew in 642, the build before."


def edit(path, pairs):
    s = open(path, encoding="utf-8").read()
    for a, b in pairs:
        if s.count(a) != 1:
            raise SystemExit("%s: %r not found once" % (path, a[:60]))
        s = s.replace(a, b)
    open(path, "w", encoding="utf-8", newline="").write(s)


def build_info(path):
    edit(path, [("Build: 2026-10-20", "Build: 2026-10-21"), ("Pass: 642", "Pass: 643"), ("Stamp: 9s74", "Stamp: 9s75")])


HEAD = ("Build 642 (9s74), 2026-10-20. Made by The Forge, 20 October 2026.", "Build 643 (9s75), 2026-10-21. Made by The Forge, 21 October 2026.")


def readme(path):
    edit(path, [HEAD, ("New in 641, the build before.", "New in 641."), ("New in 642.", NEW)])


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
edit(os.path.join(fire, "app", "build.gradle"), [("versionName '642'", "versionName '643'")])
print("The Forge 643 written into", win, ios, mac, "and", fire)
