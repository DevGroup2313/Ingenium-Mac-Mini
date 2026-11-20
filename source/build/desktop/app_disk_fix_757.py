"""Ingenium 7.57 (20 November 2026): repositories on a drive work again in the Mac and Windows apps.

7.49's seal on the computer's disk (app_disk_749.py, and 7.50's app_disk_750.py after it) took three names the drive's repositories had
used since 6.86 and 6.87 (app_disk_686.py, app_disk2_687.py), each set later when the app starts, so the seal's won:
  _DISK          the seal's table {"key", "kid", "at"} in place of the drive's {"lock", "open", "work", "size", "sz", "last"}: from 7.49
                 every call on a repository on a drive (Fabrica's "Add one from this computer", its files, its versions, its merges)
                 failed with KeyError: 'lock';
  _disk_status() the seal's state in place of the drive's _disk_status(rid, repo) (the folder as it is), which the drive's record, its
                 merges and its versions call;
  _disk_write(path, data, seal)
                 the seal's sealed file writer in place of the drive's _disk_write(rid, payload), which the bridge's disk_write calls to
                 write a repository's new versions and ideas.
Found by rig/t_757_drive_pick.py, the first drive test run on a 7.49 or later app; a scan of every function the app defines twice found
no other pair whose arguments differ (the rest are later parts redefining a function on purpose, with the same arguments).

The seal's three are named _DISK_SEAL, _disk_seal_status() and _disk_seal_write() here, with every use of them; the drive's are left as
they were. app_disk_749.py and app_disk_750.py themselves now write the new names, so a fresh build needs nothing from this patch (it then
says so and changes nothing).

    python3 build/desktop/app_disk_fix_757.py <repo>/ingenium_app.py"""
import re
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()

if "_DISK_SEAL = {" in s and '_DISK = {"key"' not in s and "def _disk_status():" not in s and "def _disk_write(path, data" not in s:
    print("already patched", p)
    sys.exit(0)
OLD = '_DISK = {"key": None, "kid": None, "at": 0}'
if s.count(OLD) != 1:
    sys.exit("%s: expected the 7.49 seal's table once, found %d" % (p, s.count(OLD)))
if s.count('_DISK = {"lock": ') != 1 or s.count("def _disk_status(rid, repo):") != 1 or s.count("def _disk_write(rid, payload):") != 1:
    sys.exit("%s: expected the drive's table, _disk_status(rid, repo) and _disk_write(rid, payload) once each" % p)
s = s.replace(OLD, '_DISK_SEAL = {"key": None, "kid": None, "at": 0}  # 7.57: its own name, not the drive\'s _DISK (app_disk_fix_757.py)')
s, n1 = re.subn(r'_DISK\["(key|kid|at)"\]', r'_DISK_SEAL["\1"]', s)
# the seal's state: def _disk_status(): and every call with no arguments
s, n2 = re.subn(r'(?<![\w.])_disk_status\(\)', '_disk_seal_status()', s)
# the seal's writer: every _disk_write( but the drive's own def and the bridge's call, (rid, payload)
s, n3 = re.subn(r'(?<![\w.])_disk_write\((?!rid, payload\))', '_disk_seal_write(', s)
if (n1 < 1 or n2 < 1 or n3 < 1 or re.search(r'_DISK\["(key|kid|at)"\]', s) or "def _disk_status():" in s or "def _disk_write(path" in s
        or s.count("def _disk_status(rid, repo):") != 1 or s.count("def _disk_write(rid, payload):") != 1 or '_DISK = {"lock": ' not in s):
    sys.exit("%s: the seal's names were not all given their own" % p)
open(p, "w", encoding="utf-8").write(s)
print("patched", p, "(%d, %d, %d uses)" % (n1, n2, n3))
