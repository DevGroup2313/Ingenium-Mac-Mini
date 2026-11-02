"""The Forge 649: its own identity on Windows (the_forge_app.py and the_forge.iss in Forge-windows), as Ingenium 6.8 has
(../../build/desktop/app_id_68.py).

The owner's words (27 October 2026): "The Forge does not open or work on my windows laptops, it keeps on saying that it can't
find the file. I think its somehow sharing the address with Carpe Diem. [...] Each app needs to have its own address with no
dependencies on any other app, not even one from the Offline Project family."
Windows groups windows on the taskbar, keeps pins and finds the Start menu's entry by an app's identity (its AppUserModelID).
The Forge set none, so Windows took the program's file: run from the kit's script, the Forge, Carpe Diem, Ingenium and Inkwell
were all pythonw.exe and shared one taskbar button and one pin. Now the program says it is The Forge before any window, and
the installer's shortcuts carry the same identity. Each change found exactly once, or nothing is written.
    python3 forge_shell_649.py <Forge-windows repository>"""
import os
import sys

repo = sys.argv[1]
AUMID = "com.yannieforest.theforge"


def patch(path, pairs, mark):
    s = open(path, encoding="utf-8", newline="").read()
    if mark in s:
        print("already patched", path)
        return
    for a, b in pairs:
        if s.count(a) != 1:
            sys.exit("%s: %r found %d times" % (path, a[:70], s.count(a)))
        s = s.replace(a, b)
    open(path, "w", encoding="utf-8", newline="").write(s)
    print("patched", path)


patch(os.path.join(repo, "the_forge_app.py"), [(
    '''def main():
    # 9s57: one copy at a time. First of all, and before the session mark is
    # read or written: a second click brings the open window forward and ends.
    if _another_copy_is_open():
        return
''', '''APP_USER_MODEL_ID = "%s"


def _own_taskbar_identity():
    """649 (forge_shell_649.py): the Forge's own identity on Windows (its AppUserModelID), set before any window, so its taskbar
    button, its pins and its Start menu entry are its own, even when it runs from the kit's script as pythonw.exe."""
    if not sys.platform.startswith("win"):
        return
    try:
        import ctypes
        ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID(APP_USER_MODEL_ID)
    except Exception as exc:
        log_note("taskbar identity: not set (%%s)" %% (exc,))


def main():
    _own_taskbar_identity()
    # 9s57: one copy at a time. First of all, and before the session mark is
    # read or written: a second click brings the open window forward and ends.
    if _another_copy_is_open():
        return
''' % AUMID)], "_own_taskbar_identity")

iss = os.path.join(repo, "the_forge.iss")
crlf = "\r\n" if "\r\n" in open(iss, encoding="utf-8", newline="").read() else "\n"
patch(iss, [
    ('''Name: "{userprograms}\\The Forge"; Filename: "{app}\\The Forge.exe"; WorkingDir: "{app}"; Comment: "The Forge {#AppVersion}"''' + crlf,
     '''Name: "{userprograms}\\The Forge"; Filename: "{app}\\The Forge.exe"; WorkingDir: "{app}"; Comment: "The Forge {#AppVersion}"; AppUserModelID: "%s"''' % AUMID + crlf),
    ('''Name: "{userdesktop}\\The Forge"; Filename: "{app}\\The Forge.exe"; WorkingDir: "{app}"; Comment: "The Forge {#AppVersion}"; Tasks: desktopicon''',
     '''Name: "{userdesktop}\\The Forge"; Filename: "{app}\\The Forge.exe"; WorkingDir: "{app}"; Comment: "The Forge {#AppVersion}"; Tasks: desktopicon; AppUserModelID: "%s"''' % AUMID),
], "AppUserModelID")
