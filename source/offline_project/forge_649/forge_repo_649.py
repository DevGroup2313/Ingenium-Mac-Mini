"""Writes The Forge 649 into its repositories: the page, BUILD_INFO.txt, the README's opening, and the Fire app's version.
usage: forge_repo_649.py THE_FORGE.html FORGE_WINDOWS_REPO FORGE_IOS_REPO FORGE_MAC_REPO FORGE_FIRE_REPO
What is new in 649 is read from notes_649.txt beside this script (plain words, one paragraph), followed by the versions of
the apps the full page carries. As 648 did, the Mac project gets the quick page and its text parts (forge_644); every other
copy is the full page. 649 also puts quick_split.py (forge_quick_split_js.py) into the Windows repository, so its build makes
the Windows app's quick page and its parts as scripts; and the Windows app's own identity (forge_shell_649.py)."""
import json, os, re, shutil, subprocess, sys, textwrap

page, win, ios, mac, fire = sys.argv[1:6]
HERE = os.path.dirname(os.path.abspath(__file__))
F648 = os.path.join(HERE, "..", "forge_648")
t = open(page, encoding="utf-8").read()
if 'pass:"649"' not in t or 'id="forge-bi-meta"' not in t:
    raise SystemExit("give the full 649 page (the_forge.html, carrying its apps)")
meta = json.loads(re.search(r'<script type="application/json" id="forge-bi-meta">(.*?)</script>', t, re.S).group(1))
V = {a["key"]: a["version"] for a in meta["apps"]}
notes = " ".join(open(os.path.join(HERE, "notes_649.txt"), encoding="utf-8").read().split())
if not notes or "TODO" in notes:
    raise SystemExit("notes_649.txt: say what is new in 649 first")
NEW = "\n".join(textwrap.wrap(
    "New in 649. " + notes + " The full page carries Ingenium %s, Carpe Diem %s and Inkwell %s." % (V["ingenium"], V["cd"], V["inkwell"]),
    72)) + "\n\nNew in 648, the build before."


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
    edit(path, [("Pass: 648", "Pass: 649"), ("Stamp: 9s80", "Stamp: 9s81")])
    t = open(path, encoding="utf-8").read()
    t, n = re.subn(r"^Build: \d{4}-\d{2}-\d{2}$", "Build: 2026-10-28", t, count=1, flags=re.M)
    if n != 1:
        raise SystemExit("%s: no Build: line" % path)
    open(path, "w", encoding="utf-8", newline="").write(t)


HEAD = ("Build 648 (9s80), 2026-10-25. Made by The Forge, 25 October 2026.", "Build 649 (9s81), 2026-10-28. Made by The Forge, 28 October 2026.")


def readme(path):
    edit(path, [HEAD, ("New in 647, the build before.", "New in 647."), ("New in 648.", NEW)])


shutil.copyfile(page, os.path.join(win, "the_forge.html"))
shutil.copyfile(os.path.join(HERE, "forge_quick_split_js.py"), os.path.join(win, "quick_split.py"))
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
edit(os.path.join(fire, "app", "build.gradle"), [("versionName '648'", "versionName '649'")])
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
subprocess.check_call([sys.executable, os.path.join(HERE, "forge_shell_649.py"), win])
print("The Forge 649 written into", win, ios, mac, "and", fire)
