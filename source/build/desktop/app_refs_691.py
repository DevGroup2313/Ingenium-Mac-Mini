"""Ingenium 6.91 (12 November 2026): the drive's branches and tags in a stable order.

app_disk_686.py lists a repository's branches and tags as dulwich gives them (refs.as_dict), and dulwich 0.22.8 joins the loose refs and
packed-refs in a set, so their order can change from one start of the app to the next (rig/t_683_hub.js saw main before idea on 6.89's
release page, idea before main on 6.88's). Fabrica's lists mostly sort them, but a record keeps them in that order; they are given
sorted now, so every start shows the same order.

    python3 build/desktop/app_refs_691.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()
MARK = "# 6.91: sorted, so every start of the app gives the same order (app_refs_691.py)"
if MARK in s:
    print("already patched", p)
    sys.exit(0)
old = '''def _disk_refs(repo):
    refs, head = {}, None
    for k, v in repo.refs.as_dict().items():'''
new = '''def _disk_refs(repo):
    refs, head = {}, None
    ''' + MARK + '''
    for k, v in sorted(repo.refs.as_dict().items()):'''
if s.count(old) != 1:
    sys.exit("%s: expected the 6.86 refs loop once, found %d" % (p, s.count(old)))
s = s.replace(old, new)
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
