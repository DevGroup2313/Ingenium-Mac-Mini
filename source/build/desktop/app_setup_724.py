"""7.24 (16 November 2026): Install on this PC opens the app's own installer. From 7.24 the Windows app Fabrica makes is one file,
"<App> Setup.exe" (shells/windows/shell.cpp, modules/r170.js), as the owner's approved preview of the installer shows it; the installer
itself asks for everyone on this PC or just for you, and makes the shortcuts and the entry in Settings, Apps. So when the package handed
to runs_install_go is a program (it begins "MZ"), it is put in a folder of its own in %TEMP% (never the staging folder, which is removed
as the call ends) and opened; a zip from before 7.24 is installed for the person alone, as before.
usage: python3 app_setup_724.py path/to/ingenium_app.py   (after app_runs_708.py)"""
import sys
p = sys.argv[1]
s = open(p, encoding="utf-8").read()
def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)
if "_runs_install_setup" in s:
    print("already patched", p)
    sys.exit(0)
if "_runs_install_win" not in s:
    sys.exit("%s: app_runs_708.py must be applied first" % p)
rep('''    import winreg
    out = os.path.join(x["dir"], "out")
    os.makedirs(out, exist_ok=True)
    _runs_unzip(x["file"], out)
''', '''    import winreg
    with open(x["file"], "rb") as fh:
        if fh.read(2) == b"MZ":
            return _runs_install_setup(x, info)
    out = os.path.join(x["dir"], "out")
    os.makedirs(out, exist_ok=True)
    _runs_unzip(x["file"], out)
''')
rep('''def _runs_install_win(x, info):
''', '''def _runs_install_setup(x, info):
    """7.24 (app_setup_724.py): the app's own installer, "<App> Setup.exe", put in a folder of its own in %TEMP% and opened; it asks
    for everyone on this PC or just for you itself"""
    import tempfile
    name = os.path.basename(x["file"])
    if not name.lower().endswith(".exe"):
        name = (re.sub(r'[<>:"/\\\\|?*\\x00-\\x1f]+', " ", str(info.get("title") or "")).strip(" .") or "App") + " Setup.exe"
    home = os.path.join(tempfile.gettempdir(), "Ingenium setups", hashlib.sha1(os.urandom(8)).hexdigest()[:8])
    os.makedirs(home, exist_ok=True)
    target = os.path.join(home, name)
    shutil.copy2(x["file"], target)
    os.startfile(target)
    return {"ok": True, "setup": True, "path": target, "where": "its installer, which asks for everyone on this PC or just for you"}


def _runs_install_win(x, info):
''')
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
