"""Writes Carpe Diem 1058 into a website repository: the page, the keeper's new name (sw.js), BUILD_INFO and the README.
usage: cd_repo_1058.py REPO_DIR PAGE.html"""
import os, re, shutil, sys

repo, page = sys.argv[1], sys.argv[2]


def edit(p, pairs):
    b = open(p, "rb").read()
    crlf = b"\r\n" in b
    s = b.decode("utf-8")
    for a, c in pairs:
        if crlf:
            a = a.replace("\r\n", "\n").replace("\n", "\r\n")
            c = c.replace("\r\n", "\n").replace("\n", "\r\n")
        if s.count(a) != 1:
            raise SystemExit("not found once in %s: %r" % (p, a[:80]))
        s = s.replace(a, c)
    open(p, "wb").write(s.encode("utf-8"))


shutil.copyfile(page, os.path.join(repo, "index.html"))
sw = os.path.join(repo, "sw.js")
t = open(sw, encoding="utf-8").read()
t, n = re.subn(r'const CACHE = "(carpe-diem-demo-[a-z]+)-v202610191057";', lambda m: 'const CACHE = "%s-v202610191058";' % m.group(1), t)
if n != 1:
    raise SystemExit("sw.js: the keeper's name was not where expected")
open(sw, "w", encoding="utf-8").write(t)
edit(os.path.join(repo, "BUILD_INFO.txt"), [("Build: 2026-10-19\nPass: 1057\nStamp: 528171057", "Build: 2026-10-19\nPass: 1058\nStamp: 528171058")])
readme = os.path.join(repo, "README.md")
r = open(readme, encoding="utf-8").read()
m = re.search(r'\*\*Build 1057, 19 October 2026\.\*\* The About panel ends with "1057 · 528171057 · ([^"]+)"\.', r)
if not m:
    raise SystemExit("README: the build line was not where expected")
NEW = ('**Build 1058, 19 October 2026.** The About panel ends with "1058 · 528171058 · %s".' % m.group(1)
       + "\n\n**New in build 1058.** The mini Forge in the Author Studio is now The Forge 641 (it was The Forge 639). It\n"
       "still opens on this very build of Carpe Diem each time and edits Carpe Diem alone. The app now shows its build\n"
       "number and stamp, with no date.")
r = r.replace(m.group(0), NEW, 1)
if r.count("**New in build 1057.**") != 1:
    raise SystemExit("README: 'New in build 1057' not found once")
r = r.replace("**New in build 1057.**", "**New in build 1057, the build before.**")
r = r.replace("**New in build 1056, the build before.**", "**New in build 1056.**")
open(readme, "w", encoding="utf-8").write(r)
print("Carpe Diem 1058 written into", repo)
