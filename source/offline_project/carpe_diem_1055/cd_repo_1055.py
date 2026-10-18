"""Writes Carpe Diem 1055 into a website repository: the page, the keeper's new name (sw.js), BUILD_INFO and the README.
usage: cd_repo_1055.py REPO_DIR PAGE.html"""
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
t, n = re.subn(r'const CACHE = "(carpe-diem-demo-[a-z]+)-v202610181054";', lambda m: 'const CACHE = "%s-v202610181055";' % m.group(1), t)
if n != 1:
    raise SystemExit("sw.js: the keeper's name was not where expected")
open(sw, "w", encoding="utf-8").write(t)
edit(os.path.join(repo, "BUILD_INFO.txt"), [("Pass: 1054", "Pass: 1055"), ("Stamp: 528171054", "Stamp: 528171055")])
readme = os.path.join(repo, "README.md")
r = open(readme, encoding="utf-8").read()
m = re.search(r'\*\*Build 1054, 18 October 2026\.\*\* The About panel ends with "1054 · 528171054 · ([^"]+)"\.', r)
if not m:
    raise SystemExit("README: the build line was not where expected")
NEW = ('**Build 1055, 18 October 2026.** The About panel ends with "1055 · 528171055 · %s".' % m.group(1)
       + "\n\n**New in build 1055.** Tabula holds a thesis of 100,000 words, by Inkwell 7.44's recipe: a keystroke is\n"
       "answered at once, because only the pages an edit moves are laid out again, and a long document is kept in the\n"
       "browser's larger store (IndexedDB), so it is not lost when it outgrows the small one. The tour's card on autosave\n"
       "says so, in English and French. The mini Forge edits Carpe Diem alone: its Editor no longer offers the other apps.")
r = r.replace(m.group(0), NEW, 1)
r = r.replace("**New in build 1053, the build before.**", "**New in build 1053.**", 1)
r = r.replace("**New in build 1054.**", "**New in build 1054, the build before.**", 1)
open(readme, "w", encoding="utf-8").write(r)
print("Carpe Diem 1055 written into", repo)
