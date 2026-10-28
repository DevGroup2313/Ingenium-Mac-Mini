"""Writes The Forge 652 into its repositories: the page, BUILD_INFO.txt, the README's opening, and the Fire app's version.
usage: forge_repo_650.py THE_FORGE.html FORGE_WINDOWS_REPO FORGE_IOS_REPO FORGE_MAC_REPO FORGE_FIRE_REPO
What is new in 652 is read from notes_652.txt beside this script (plain words, one paragraph), followed by the versions of
the apps the full page carries. As 648 did, the Mac project gets the quick page and its text parts (forge_644); every other
copy is the full page. The Windows repository's quick_split.py (forge_649/forge_quick_split_js.py) is written again, so its
build makes the Windows app's quick page and its parts as scripts, as 649's, 650's and 651's do."""
import json, os, re, shutil, subprocess, sys, textwrap

page, win, ios, mac, fire = sys.argv[1:6]
HERE = os.path.dirname(os.path.abspath(__file__))
F648 = os.path.join(HERE, "..", "forge_648")
F649 = os.path.join(HERE, "..", "forge_649")
t = open(page, encoding="utf-8").read()
if 'pass:"652"' not in t or 'id="forge-bi-meta"' not in t:
    raise SystemExit("give the full 652 page (the_forge.html, carrying its apps)")
meta = json.loads(re.search(r'<script type="application/json" id="forge-bi-meta">(.*?)</script>', t, re.S).group(1))
V = {a["key"]: a["version"] for a in meta["apps"]}
notes = " ".join(open(os.path.join(HERE, "notes_652.txt"), encoding="utf-8").read().split())
if not notes or "TODO" in notes:
    raise SystemExit("notes_652.txt: say what is new in 652 first")
NEW = "\n".join(textwrap.wrap(
    "New in 652. " + notes + " The full page carries Ingenium %s, Carpe Diem %s and Inkwell %s." % (V["ingenium"], V["cd"], V["inkwell"]),
    72)) + "\n\nNew in 651, the build before."


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
    edit(path, [("Pass: 651", "Pass: 652"), ("Stamp: 9s83", "Stamp: 9s84")])
    t = open(path, encoding="utf-8").read()
    t, n = re.subn(r"^Build: \d{4}-\d{2}-\d{2}$", "Build: 2026-10-28", t, count=1, flags=re.M)
    if n != 1:
        raise SystemExit("%s: no Build: line" % path)
    open(path, "w", encoding="utf-8", newline="").write(t)


HEAD = ("Build 651 (9s83), 2026-10-28. Made by The Forge, 28 October 2026.", "Build 652 (9s84), 2026-10-28. Made by The Forge, 28 October 2026.")


def readme(path):
    edit(path, [HEAD, ("New in 650, the build before.", "New in 650."), ("New in 651.", NEW)])


shutil.copyfile(page, os.path.join(win, "the_forge.html"))
shutil.copyfile(os.path.join(F649, "forge_quick_split_js.py"), os.path.join(win, "quick_split.py"))
build_info(os.path.join(win, "BUILD_INFO.txt"))
readme(os.path.join(win, "README.txt"))
for rel in ("www/the_forge.html", "iphone-ipad/TheForge/www/the_forge.html"):
    shutil.copyfile(page, os.path.join(ios, rel))
build_info(os.path.join(ios, "iphone-ipad", "BUILD_INFO.txt"))
readme(os.path.join(ios, "iphone-ipad", "README.txt"))
shutil.copyfile(page, os.path.join(mac, "Mac project", "the_forge.html"))
subprocess.check_call([sys.executable, os.path.join(HERE, "..", "forge_644", "forge_quick_split.py"), page, os.path.join(mac, "Mac project")])
build_info(os.path.join(mac, "Mac project", "BUILD_INFO.txt"))
readme(os.path.join(mac, "Mac project", "README.txt"))
for rel in ("the_forge.html", "app/src/main/assets/the_forge.html"):
    shutil.copyfile(page, os.path.join(fire, rel))
build_info(os.path.join(fire, "BUILD_INFO.txt"))
edit(os.path.join(fire, "README.txt"), [HEAD])
edit(os.path.join(fire, "app", "build.gradle"), [("versionName '651'", "versionName '652'")])
for d in (win, os.path.join(ios, "iphone-ipad"), os.path.join(mac, "Mac project"), fire):
    shutil.copyfile(os.path.join(F648, "THIRD_PARTY_NOTICES_forge.txt"), os.path.join(d, "THIRD_PARTY_NOTICES.txt"))
    shutil.copyfile(os.path.join(HERE, "..", "..", "licence", "LICENCE_forge.txt"), os.path.join(d, "LICENCE.txt"))
sys.path.insert(0, os.path.normpath(os.path.join(HERE, "..", "..", "security")))
import fingerprint
fingerprint.write(os.path.join(win, "BUILD_INFO.txt"), ["the_forge.html"])
fingerprint.write(os.path.join(mac, "Mac project", "BUILD_INFO.txt"), ["the_forge.html", "the_forge_parts"])
fingerprint.write(os.path.join(fire, "BUILD_INFO.txt"), ["the_forge.html", "app/src/main/assets/the_forge.html"])
fingerprint.write(os.path.join(ios, "iphone-ipad", "BUILD_INFO.txt"), ["TheForge/www/the_forge.html"])
for sh in ("forge_shell_647.py", "forge_shell_647b.py", "forge_shell_648.py"):
    subprocess.check_call([sys.executable, os.path.join(F648, sh), os.path.join(win, "the_forge_app.py"), os.path.join(mac, "Mac project", "the_forge_app.py")])
subprocess.check_call([sys.executable, os.path.join(F649, "forge_shell_649.py"), win])
print("The Forge 652 written into", win, ios, mac, "and", fire)
