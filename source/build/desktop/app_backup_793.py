"""Ingenium 7.93: scheduled backups, written by the computer app into a folder she chooses (the page's side is modules/r395.js).

Stage 2 of the recommendations she approved (25 November 2026: "I approve of all your recommendations, please build them into the app";
then "proceed with stage 2: backups, restore points and Cloud"): "Automatic backups on a schedule, daily or weekly, keeping the last few".
The page makes the backup as it always has (modules/r143.js, IngBackup.make: one file, every part with its fingerprint); this part only
writes it where she chose, keeps the last few and lists them. It touches nothing but its own files: a name it writes or removes must be
"Ingenium backup <date and time>.zip" (or .ingenium, a sealed one), in the folder she chose.

  backup_choose_place()                 the computer's own folder dialog: {"ok": true, "folder": path} or {"ok": false}
  backup_write(folder, name, b64, first, last)
                                        a piece of the file (base64); written to "<name>.part" and renamed to <name> once whole
  backup_files(folder)                  {"ok": true, "files": [{"name", "size", "at"}]} newest first (Ingenium's own backups only)
  backup_remove(folder, name)           removes one of Ingenium's own backups (for keeping the last few)

    python3 build/desktop/app_backup_793.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_backup_files_793" in s:
    print("already patched", p)
    sys.exit(0)

rep('''    def load_state(self):
        return _load_state()
''', '''    def load_state(self):
        return _load_state()

    # 7.93: scheduled backups, into a folder she chooses (app_backup_793.py)
    def backup_choose_place(self):
        return _backup_choose_793(getattr(self, "_main_window", None))

    def backup_write(self, folder, name, b64, first=False, last=False):
        return _backup_write_793(folder, name, b64, first, last)

    def backup_files(self, folder):
        return _backup_files_793(folder)

    def backup_remove(self, folder, name):
        return _backup_remove_793(folder, name)
''', 2)

rep('''def _load_state():''', r'''_BACKUP_NAME_793 = re.compile(r"^Ingenium backup [0-9][0-9 .\-]{6,40}\.(zip|ingenium)$")


def _backup_folder_793(folder):
    """The folder she chose: it must be a folder that exists."""
    folder = os.path.abspath(os.path.expanduser(str(folder or "")))
    if not folder or not os.path.isdir(folder):
        raise ValueError("That folder is not there any more. Choose it again.")
    return folder


def _backup_choose_793(win):
    try:
        folder = _ask_folder(win)
    except Exception:  # noqa: BLE001
        log_problem("backup_choose_place: the folder dialog", sys.exc_info())
        return {"ok": False, "error": "The folder dialog could not be opened."}
    if not folder:
        return {"ok": False, "cancelled": True}
    return {"ok": True, "folder": folder}


def _backup_write_793(folder, name, b64, first, last):
    """A piece of a backup: appended to <name>.part; once the last piece is in, the file takes its name (so a half-written backup never
    looks like a whole one)."""
    import base64
    try:
        folder = _backup_folder_793(folder)
        name = os.path.basename(str(name or ""))
        if not _BACKUP_NAME_793.match(name):
            return {"ok": False, "error": "That is not the name of one of Ingenium's backups."}
        part = os.path.join(folder, name + ".part")
        data = base64.b64decode(str(b64 or ""))
        with open(part, "wb" if first else "ab") as fh:
            fh.write(data)
        if last:
            final = os.path.join(folder, name)
            os.replace(part, final)
            return {"ok": True, "path": final, "size": os.path.getsize(final)}
        return {"ok": True}
    except Exception as e:  # noqa: BLE001
        log_problem("backup_write", sys.exc_info())
        return {"ok": False, "error": str(e)}


def _backup_files_793(folder):
    try:
        folder = _backup_folder_793(folder)
        out = []
        for n in os.listdir(folder):
            if _BACKUP_NAME_793.match(n):
                f = os.path.join(folder, n)
                try:
                    out.append({"name": n, "size": os.path.getsize(f), "at": int(os.path.getmtime(f) * 1000)})
                except OSError:
                    pass
        out.sort(key=lambda x: x["at"], reverse=True)
        return {"ok": True, "folder": folder, "files": out}
    except Exception as e:  # noqa: BLE001
        return {"ok": False, "error": str(e)}


def _backup_remove_793(folder, name):
    try:
        folder = _backup_folder_793(folder)
        name = os.path.basename(str(name or ""))
        if not _BACKUP_NAME_793.match(name):
            return {"ok": False, "error": "That is not one of Ingenium's backups."}
        f = os.path.join(folder, name)
        if os.path.isfile(f):
            os.remove(f)
        return {"ok": True}
    except Exception as e:  # noqa: BLE001
        log_problem("backup_remove", sys.exc_info())
        return {"ok": False, "error": str(e)}


def _load_state():''')

open(p, "w", encoding="utf-8").write(s)
print("patched", p)
