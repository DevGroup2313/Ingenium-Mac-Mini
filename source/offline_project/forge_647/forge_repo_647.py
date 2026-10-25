"""Writes The Forge 647 into its repositories: the page, BUILD_INFO.txt, the README's opening, and the Fire app's version.
usage: forge_repo_647.py THE_FORGE.html FORGE_WINDOWS_REPO FORGE_IOS_REPO FORGE_MAC_REPO FORGE_FIRE_REPO
What is new in 647 is read from notes_647.txt beside this script (plain words, one paragraph), followed by the versions of
the apps the full page carries. (Refresh in the Mac app's menu, and the question when a page stops answering on the Fire
tablet, the iPhone and the iPad, are written in those repositories' own sources, since pass 643.) The Mac project gets the
quick page and its parts (forge_644/forge_quick_split.py) and its spec takes the parts folder (since 644); every other copy is
the full page. 647 also writes the licence (version 3, licence/LICENCE_forge.txt) into each copy, the programs' own changes
(forge_shell_647.py) into the Windows and Mac sources, and its third-party notices (with Microsoft's Fluent Emoji). The Windows and Mac apps' own guard (forge_guard_644.py) is already in their sources. Each copy gets the
Forge's third-party notices (forge_647/THIRD_PARTY_NOTICES_forge.txt: 645's, with Microsoft's Fluent Emoji)."""
import json, os, re, shutil, subprocess, sys, textwrap

page, win, ios, mac, fire = sys.argv[1:6]
HERE = os.path.dirname(os.path.abspath(__file__))
t = open(page, encoding="utf-8").read()
if 'pass:"647"' not in t or 'id="forge-bi-meta"' not in t:
    raise SystemExit("give the full 647 page (the_forge.html, carrying its apps)")
meta = json.loads(re.search(r'<script type="application/json" id="forge-bi-meta">(.*?)</script>', t, re.S).group(1))
V = {a["key"]: a["version"] for a in meta["apps"]}
notes = " ".join(open(os.path.join(HERE, "notes_647.txt"), encoding="utf-8").read().split())
if not notes or "TODO" in notes:
    raise SystemExit("notes_647.txt: say what is new in 647 first")
NEW = "\n".join(textwrap.wrap(
    "New in 647. " + notes + " The full page carries Ingenium %s, Carpe Diem %s and Inkwell %s." % (V["ingenium"], V["cd"], V["inkwell"]),
    72)) + "\n\nNew in 646, the build before."


def edit(path, pairs):
    s = open(path, encoding="utf-8").read()
    for a, b in pairs:
        if s.count(a) == 0 and b in s:
            continue  # written by an earlier run of this script (the page given again)
        if s.count(a) != 1:
            raise SystemExit("%s: %r not found once" % (path, a[:60]))
        s = s.replace(a, b)
    open(path, "w", encoding="utf-8", newline="").write(s)


def build_info(path):
    edit(path, [("Pass: 646", "Pass: 647"), ("Stamp: 9s78", "Stamp: 9s79")])
    t = open(path, encoding="utf-8").read()
    t, n = re.subn(r"^Build: \d{4}-\d{2}-\d{2}$", "Build: 2026-10-25", t, count=1, flags=re.M)
    if n != 1:
        raise SystemExit("%s: no Build: line" % path)
    open(path, "w", encoding="utf-8", newline="").write(t)


HEAD = ("Build 646 (9s78), 2026-10-24. Made by The Forge, 24 October 2026.", "Build 647 (9s79), 2026-10-25. Made by The Forge, 25 October 2026.")


def readme(path):
    edit(path, [HEAD, ("New in 645, the build before.", "New in 645."), ("New in 646.", NEW)])


shutil.copyfile(page, os.path.join(win, "the_forge.html"))
build_info(os.path.join(win, "BUILD_INFO.txt"))
readme(os.path.join(win, "README.txt"))
for rel in ("www/the_forge.html", "iphone-ipad/TheForge/www/the_forge.html"):
    shutil.copyfile(page, os.path.join(ios, rel))
build_info(os.path.join(ios, "iphone-ipad", "BUILD_INFO.txt"))
readme(os.path.join(ios, "iphone-ipad", "README.txt"))
shutil.copyfile(page, os.path.join(mac, "Mac project", "the_forge.html"))
# 644: the Mac app opens the quick page, the apps the Forge carries in files beside it (forge_quick_split.py, checked there
# byte for byte), and its build takes that folder into the app with the page
subprocess.check_call([sys.executable, os.path.join(HERE, "..", "forge_644", "forge_quick_split.py"), page, os.path.join(mac, "Mac project")])
_spec = os.path.join(mac, "Mac project", "the_forge.spec")
if "the_forge_parts" not in open(_spec, encoding="utf-8").read():
    edit(_spec, [("    datas=extra_datas + [('the_forge.html', '.'),",
                  "    # 644: the apps the Forge carries, in files beside the page (the Mac app opens the quick page)\n"
                  "    datas=extra_datas + ([('the_forge_parts', 'the_forge_parts')] if os.path.isdir('the_forge_parts') else []) + [('the_forge.html', '.'),")])
build_info(os.path.join(mac, "Mac project", "BUILD_INFO.txt"))
readme(os.path.join(mac, "Mac project", "README.txt"))
for rel in ("the_forge.html", "app/src/main/assets/the_forge.html"):
    shutil.copyfile(page, os.path.join(fire, rel))
build_info(os.path.join(fire, "BUILD_INFO.txt"))
edit(os.path.join(fire, "README.txt"), [HEAD])
edit(os.path.join(fire, "app", "build.gradle"), [("versionName '646'", "versionName '647'")])
# 644: the open-source software, word lists and fonts the Forge's page carries (inside the apps it carries), and the Mac and
# Windows apps' packaging, named with their licences beside each copy of the Forge
for d in (win, os.path.join(ios, "iphone-ipad"), os.path.join(mac, "Mac project"), fire):
    shutil.copyfile(os.path.join(HERE, "THIRD_PARTY_NOTICES_forge.txt"), os.path.join(d, "THIRD_PARTY_NOTICES.txt"))
    # 647: the licence, version 3 (25 October 2026)
    shutil.copyfile(os.path.join(HERE, "..", "..", "licence", "LICENCE_forge.txt"), os.path.join(d, "LICENCE.txt"))
# 644: each release names its build and lists its fingerprint (SHA-256) in BUILD_INFO.txt, as the licence says
# (LICENCE.txt, version 2); the apps carry these very files (the Windows and iPhone builds check it byte for byte)
sys.path.insert(0, os.path.normpath(os.path.join(HERE, "..", "..", "security")))
import fingerprint
fingerprint.write(os.path.join(win, "BUILD_INFO.txt"), ["the_forge.html"])
fingerprint.write(os.path.join(mac, "Mac project", "BUILD_INFO.txt"), ["the_forge.html", "the_forge_parts"])
fingerprint.write(os.path.join(fire, "BUILD_INFO.txt"), ["the_forge.html", "app/src/main/assets/the_forge.html"])
fingerprint.write(os.path.join(ios, "iphone-ipad", "BUILD_INFO.txt"), ["TheForge/www/the_forge.html"])
# 647: the programs' own changes (forge_shell_647.py), in the Windows and Mac sources
subprocess.check_call([sys.executable, os.path.join(HERE, "forge_shell_647.py"), os.path.join(win, "the_forge_app.py"),
                       os.path.join(mac, "Mac project", "the_forge_app.py")])
print("The Forge 647 written into", win, ios, mac, "and", fire)
