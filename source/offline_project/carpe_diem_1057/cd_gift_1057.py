"""Writes Carpe Diem 1057, the full edition, into the owner's private repository: each device's page, its BUILD_INFO,
the Windows installer's version and the Fire tablet's version name. Nothing else in the repository is touched.
usage: cd_gift_1057.py GIFT_REPO MAC.html WINDOWS.html FIRE.html"""
import os, shutil, sys

repo, mac, win, fire = sys.argv[1:5]


def edit(p, pairs):
    b = open(p, "rb").read()
    crlf = b"\r\n" in b
    s = b.decode("utf-8")
    for a, c in pairs:
        if crlf:
            a = a.replace("\n", "\r\n")
            c = c.replace("\n", "\r\n")
        if s.count(a) != 1:
            raise SystemExit("not found once in %s: %r" % (p, a[:80]))
        s = s.replace(a, c)
    open(p, "wb").write(s.encode("utf-8"))


for src, rel in ((mac, "Mac project/carpe_diem.html"), (win, "Windows project/carpe_diem.html"),
                 (fire, "Fire tablet project/app/src/main/assets/carpe_diem.html")):
    if 'CD_BUILD={date:"2026-10-19",pass:"1057",stamp:"528171057"' not in open(src, encoding="utf-8").read():
        raise SystemExit("%s is not Carpe Diem 1057" % src)
    shutil.copyfile(src, os.path.join(repo, rel))
for proj in ("Mac project", "Windows project", "Fire tablet project"):
    edit(os.path.join(repo, proj, "BUILD_INFO.txt"), [("Build: 2026-10-18\nPass: 1056\nStamp: 528171056", "Build: 2026-10-19\nPass: 1057\nStamp: 528171057")])
edit(os.path.join(repo, "Windows project", "build", "carpe_diem.iss"), [('#define AppVersion "1056"', '#define AppVersion "1057"')])
edit(os.path.join(repo, "Fire tablet project", "app", "build.gradle"), [("versionName '1056'", "versionName '1057'")])
print("Carpe Diem 1057, the full edition, written into", repo)
