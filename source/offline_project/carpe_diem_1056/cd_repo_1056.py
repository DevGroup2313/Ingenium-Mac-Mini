"""Writes Carpe Diem 1056 into a website repository: the page, the keeper's new name (sw.js), BUILD_INFO and the README.
usage: cd_repo_1056.py REPO_DIR PAGE.html"""
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
t, n = re.subn(r'const CACHE = "(carpe-diem-demo-[a-z]+)-v202610181055";', lambda m: 'const CACHE = "%s-v202610181056";' % m.group(1), t)
if n != 1:
    raise SystemExit("sw.js: the keeper's name was not where expected")
open(sw, "w", encoding="utf-8").write(t)
edit(os.path.join(repo, "BUILD_INFO.txt"), [("Pass: 1055", "Pass: 1056"), ("Stamp: 528171055", "Stamp: 528171056")])
readme = os.path.join(repo, "README.md")
r = open(readme, encoding="utf-8").read()
m = re.search(r'\*\*Build 1055, 18 October 2026\.\*\* The About panel ends with "1055 · 528171055 · ([^"]+)"\.', r)
if not m:
    raise SystemExit("README: the build line was not where expected")
NEW = ('**Build 1056, 18 October 2026.** The About panel ends with "1056 · 528171056 · %s".' % m.group(1)
       + "\n\n**New in build 1056.** In Tabula, a paragraph that meets the foot of a page runs on to the next one, at least\n"
       "two lines on each side, as in Word, so no page ends in a blank gap; and a footnote is placed in a moment, even in a\n"
       "thesis, because only the pages it moves are laid out again (Inkwell 7.45's recipe). Tabula also keeps its raised\n"
       "pages and its notes key when it is opened on its own. Its footnotes now stand at the foot of the page that cites\n"
       "them, are written where they stand, and go into Word files as real footnotes (Inkwell 7.48's recipe). There is more\n"
       "room on the device: Tabula autosaves a document of up to 256 MB, and when the browser's small store (about 5 MB) is\n"
       "full, Carpe Diem keeps its desk in the larger store and opens it from there. The tour's card on autosave describes\n"
       "the new pages, in English and French.")
r = r.replace(m.group(0), NEW, 1)
r = r.replace("**New in build 1054, the build before.**", "**New in build 1054.**", 1)
r = r.replace("**New in build 1055.**", "**New in build 1055, the build before.**", 1)
open(readme, "w", encoding="utf-8").write(r)
print("Carpe Diem 1056 written into", repo)
