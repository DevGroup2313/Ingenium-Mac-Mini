"""Ingenium 7.39: on a Mac, the app's own logs are kept in ~/Library/Logs/Ingenium, never inside the app.

What happened (18 November 2026): the 7.38 build for the Intel Mac repository (its Apple silicon copy) stopped at signing:
"code object is not signed at all. In subcomponent: .../Ingenium.app/Contents/MacOS/ingenium_crash.log". During the build's
self-tests the app had noted a problem, and crash_log_path() writes beside the program when that folder is writable: on a Mac,
inside the app itself. A file added inside an app breaks its signature, on her Mac as on the build machine (an app in
/Applications is writable for an administrator). Now, on a Mac, the built app writes its crash log and its findings to
~/Library/Logs/Ingenium (where a Mac keeps an app's logs, and where Console shows them); on Windows and elsewhere nothing changes.

    python3 build/desktop/app_logs_739.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_mac_logs_dir" in s:
    print("already patched", p)
    sys.exit(0)

rep('''def crash_log_path():
    """Beside the program if that is writable, otherwise the home folder."""
    import os
    try:
''', '''def _mac_logs_dir():
    """7.39 (app_logs_739.py): a built app on a Mac keeps its logs in ~/Library/Logs/Ingenium, never inside itself (its signature)"""
    import os
    if sys.platform != "darwin" or not getattr(sys, "frozen", False):
        return None
    d = os.path.join(os.path.expanduser("~"), "Library", "Logs", "Ingenium")
    try:
        os.makedirs(d, exist_ok=True)
        return d
    except Exception:
        return None


def crash_log_path():
    """Beside the program if that is writable, otherwise the home folder; on a Mac, ~/Library/Logs/Ingenium (7.39)."""
    import os
    mac = _mac_logs_dir()
    if mac:
        return os.path.join(mac, "ingenium_crash.log")
    try:
''')
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
