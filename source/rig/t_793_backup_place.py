"""Ingenium 7.93: the computer app's part of scheduled backups (desktop/app_backup_793.py), its functions run on their own against a real
folder: a backup written in pieces takes its name only when whole; only Ingenium's own backups are listed, written or removed.
    python3 rig/t_793_backup_place.py <ingenium_app.py patched by app_backup_793.py>"""
import base64, os, re, sys, tempfile
src = open(sys.argv[1], encoding="utf-8").read()
code = src[src.index("_BACKUP_NAME_793 = "):src.index("def _load_state():")]
probs = []
g = {"re": re, "os": os, "sys": sys, "log_problem": lambda *a: probs.append(a), "_ask_folder": lambda win: "/chosen"}
exec(code, g)
ok = [0, 0]
def check(c, m, d=None):
    print(("PASS " if c else "FAIL ") + m + ("" if c or d is None else "  " + repr(d)[:300])); ok[0 if c else 1] += 1
d = tempfile.mkdtemp()
open(os.path.join(d, "holiday.jpg"), "w").write("not ours")
name = "Ingenium backup 2026-11-25 19-30.zip"
blob = os.urandom(300000)
pieces = [blob[i:i + 100000] for i in range(0, len(blob), 100000)]
r = None
for i, pc in enumerate(pieces):
    r = g["_backup_write_793"](d, name, base64.b64encode(pc).decode(), i == 0, False)
    if i < len(pieces) - 1:
        check(not os.path.exists(os.path.join(d, name)), "piece %d: not yet named as a backup (only its .part exists)" % (i + 1))
r = g["_backup_write_793"](d, name, "", False, True)
check(r.get("ok") and open(os.path.join(d, name), "rb").read() == blob and not os.path.exists(os.path.join(d, name + ".part")), "the last piece in, the whole file takes its name, byte for byte", r)
check(not g["_backup_write_793"](d, "../evil.zip", "AA==", True, True).get("ok") and not g["_backup_write_793"](d, "holiday.jpg", "AA==", True, True).get("ok"), "a name that is not one of Ingenium's backups is refused")
L = g["_backup_files_793"](d)
check(L.get("ok") and [f["name"] for f in L["files"]] == [name], "only Ingenium's own backups are listed", L)
check(not g["_backup_remove_793"](d, "holiday.jpg").get("ok") and os.path.exists(os.path.join(d, "holiday.jpg")), "her other files are never removed")
check(g["_backup_remove_793"](d, name).get("ok") and not os.path.exists(os.path.join(d, name)), "one of Ingenium's backups can be removed (to keep the last few)")
check(not g["_backup_files_793"](os.path.join(d, "gone")).get("ok"), "a folder that is not there is said plainly")
check(g["_backup_choose_793"](None) == {"ok": True, "folder": "/chosen"}, "the folder comes from the computer's own dialog")
print("%d passed, %d failed" % tuple(ok)); sys.exit(1 if ok[1] else 0)
