"""Writes Carpe Diem 1057 into a website repository: the page, the keeper's new name (sw.js), BUILD_INFO and the README.
usage: cd_repo_1057.py REPO_DIR PAGE.html"""
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
t, n = re.subn(r'const CACHE = "(carpe-diem-demo-[a-z]+)-v202610181056";', lambda m: 'const CACHE = "%s-v202610191057";' % m.group(1), t)
if n != 1:
    raise SystemExit("sw.js: the keeper's name was not where expected")
open(sw, "w", encoding="utf-8").write(t)
edit(os.path.join(repo, "BUILD_INFO.txt"), [("Build: 2026-10-18\nPass: 1056\nStamp: 528171056", "Build: 2026-10-19\nPass: 1057\nStamp: 528171057")])
readme = os.path.join(repo, "README.md")
r = open(readme, encoding="utf-8").read()
m = re.search(r'\*\*Build 1056, 18 October 2026\.\*\* The About panel ends with "1056 · 528171056 · ([^"]+)"\.', r)
if not m:
    raise SystemExit("README: the build line was not where expected")
NEW = ('**Build 1057, 19 October 2026.** The About panel ends with "1057 · 528171057 · %s".' % m.group(1)
       + "\n\n**New in build 1057.** The mini Forge in the Author Studio is now The Forge 639 (it was The Forge 629), and it\n"
       "opens on this very build of Carpe Diem each time, not on an older copy kept from before. It still edits Carpe Diem\n"
       "alone. Shown inside it, Carpe Diem no longer warns that the device has no room left, which was not true there.")
r = r.replace(m.group(0), NEW, 1)
if r.count("**New in build 1056.**") != 1:
    raise SystemExit("README: 'New in build 1056' not found once")
r = r.replace("**New in build 1056.**", "**New in build 1056, the build before.**")
r = r.replace("**New in build 1055, the build before.**", "**New in build 1055.**")
open(readme, "w", encoding="utf-8").write(r)
print("Carpe Diem 1057 written into", repo)
