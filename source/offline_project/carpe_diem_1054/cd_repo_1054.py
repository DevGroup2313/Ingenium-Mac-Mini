"""Writes Carpe Diem 1054 into a website repository: the page, the keeper's new name (sw.js), BUILD_INFO and the README.
usage: cd_repo_1054.py REPO_DIR PAGE.html"""
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
t, n = re.subn(r'const CACHE = "(carpe-diem-demo-[a-z]+)-v202610181053";', lambda m: 'const CACHE = "%s-v202610181054";' % m.group(1), t)
if n != 1:
    raise SystemExit("sw.js: the keeper's name was not where expected")
open(sw, "w", encoding="utf-8").write(t)
edit(os.path.join(repo, "BUILD_INFO.txt"), [("Pass: 1053", "Pass: 1054"), ("Stamp: 528171053", "Stamp: 528171054")])
readme = os.path.join(repo, "README.md")
r = open(readme, encoding="utf-8").read()
m = re.search(r'\*\*Build 1053, 18 October 2026\.\*\* The About panel ends with "1053 · 528171053 · ([^"]+)"\.', r)
if not m:
    raise SystemExit("README: the build line was not where expected")
NEW = ('**Build 1054, 18 October 2026.** The About panel ends with "1054 · 528171054 · %s".' % m.group(1)
       + "\n\n**New in build 1054.** The tour says what Tabula's autosave now keeps: a new card, in English and French,\n"
       "follows Real files, saved to your device, and explains that the footnotes, endnotes, bibliography, header, footer\n"
       "and contents travel with the text into autosave, into a floating window and back after a restart, and that Tabula\n"
       "says so on the page, with a .docx or PDF copy to hand, if a document ever grows past what autosave can keep.")
r = r.replace(m.group(0), NEW, 1)
r = r.replace("**New in build 1052, the build before.**", "**New in build 1052.**", 1)
r = r.replace("**New in build 1053.**", "**New in build 1053, the build before.**", 1)
open(readme, "w", encoding="utf-8").write(r)
print("Carpe Diem 1054 written into", repo)
