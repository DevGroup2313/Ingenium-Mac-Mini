"""Ingenium 6.8: each app its own identity on Windows (patch for ingenium_app.py, Mac and Windows; the Forge's own app takes the
same, offline_project/forge_649/forge_shell_649.py).

The owner's words (27 October 2026): "Each app needs to have its own address with no dependencies on any other app, not even
one from the Offline Project family."
Windows groups windows on the taskbar, keeps pins and finds the Start menu's entry by an app's identity (its AppUserModelID).
Without one it takes the program's file: the installed app is its own, but run from the kit's script every one of the owner's
apps is pythonw.exe, so Ingenium, the Forge, Carpe Diem and Inkwell shared one taskbar button and one pin, and a pin made for
one could open another or point at a file that is not there. Now the process says who it is (the app id in app.json, as an
app made by Fabrica has its own), before any window, and the installer's shortcuts say the same (installer/Ingenium.iss).
On a Mac nothing changes.

    python3 build/desktop/app_id_68.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_own_taskbar_identity" in s:
    print("already patched", p)
    sys.exit(0)

rep('''def main():
    global _APP_HTML_PATH
    if _another_copy_is_open():
        return
''', '''APP_USER_MODEL_ID = re.sub(r"[^A-Za-z0-9.]", "", str(_APP_CFG.get("app_id") or ""))[:120] or "com.yannieforest.ingenium"


def _own_taskbar_identity():
    """6.8 (app_id_68): this app's own identity on Windows (its AppUserModelID), set before any window, so its taskbar button,
    its pins and its Start menu entry are its own, even when it runs from the kit's script as pythonw.exe."""
    if not sys.platform.startswith("win"):
        return
    try:
        import ctypes
        ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID(APP_USER_MODEL_ID)
    except Exception as exc:
        log_problem("taskbar identity: not set (%s)" % (exc,))


def main():
    global _APP_HTML_PATH
    _own_taskbar_identity()
    if _another_copy_is_open():
        return
''')
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
