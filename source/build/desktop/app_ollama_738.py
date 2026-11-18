"""Ingenium 7.38: her chats in Ollama's own app, brought in on her press, read only.

Her request (9 November 2026, with the folders): "I want a safe way to move my data from Claude and Ollama to Ingenium so that I don't
lose all of my work". Her answer (18 November 2026), asked whether she chats inside Ollama's own app: "Yes, on Mac and Windows".

Where Ollama's app keeps them, read in its own source (github.com/ollama/ollama, main, 18 November 2026):
internal/onboarding/app_state.go, AppDatabasePath: on a Mac, ~/Library/Application Support/Ollama/db.sqlite; on Windows,
%LOCALAPPDATA%\\Ollama\\db.sqlite; elsewhere none. app/store/database.go: SQLite (go-sqlite3, in write-ahead mode), with the tables chats
(id, title, created_at) and messages (chat_id, role, content, thinking, model_name, created_at, ...), and attachments (message_id,
filename, data). An older app may have kept it under %APPDATA% on Windows (a third-party cleaner looks there too), so that is looked at
second; elsewhere ~/.ollama/db.sqlite is looked at, which Ollama's own app does not use (it serves the tests on Linux).

Read only: the database and its write-ahead log are copied into a private temporary folder, the copy is opened, read and deleted;
Ollama's own files are never opened for writing, and Ollama may stay open meanwhile.

  ollama_chats_find()               where, how many chats and messages, and each chat's title, date and size (to show before anything
                                    comes in)
  ollama_chats_json(offset, length) the chats as one JSON text {"chats": [...]}, read a piece at a time (the page's importer reads it)

    python3 build/desktop/app_ollama_738.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_ollama_chats_find" in s:
    print("already patched", p)
    sys.exit(0)
if "_share_handler" not in s:
    sys.exit("%s: the lending server must be there first" % p)

FN = r'''# ---- 7.38: her chats in Ollama's own app, read only (app_ollama_738.py) ----
_OLL = {"lock": threading.Lock(), "json": None}


def _ollama_db_paths():
    home = os.path.expanduser("~")
    out = []
    if sys.platform == "darwin":
        out.append(os.path.join(home, "Library", "Application Support", "Ollama", "db.sqlite"))
    elif sys.platform.startswith("win"):
        for v in ("LOCALAPPDATA", "APPDATA"):
            b = os.environ.get(v)
            if b:
                out.append(os.path.join(b, "Ollama", "db.sqlite"))
    else:
        out.append(os.path.join(home, ".ollama", "db.sqlite"))
    return out


def _ollama_copy():
    """the database and its write-ahead log, copied into a private folder: (folder, copy) or (None, None)"""
    import tempfile
    for src in _ollama_db_paths():
        if os.path.isfile(src):
            d = tempfile.mkdtemp(prefix="ingenium-ollama-")
            try:
                os.chmod(d, 0o700)
            except Exception:
                pass
            dst = os.path.join(d, "db.sqlite")
            shutil.copyfile(src, dst)
            for ext in ("-wal", "-shm"):
                if os.path.isfile(src + ext):
                    shutil.copyfile(src + ext, dst + ext)
            return d, dst, src
    return None, None, None


def _ollama_ms(v):
    """a SQLite time as Go writes it ("2026-11-18 10:00:00.123+00:00", or an ISO form), as milliseconds since 1970"""
    import datetime as _dt
    if v is None:
        return 0
    if isinstance(v, (int, float)):
        return int(v * 1000) if v < 1e12 else int(v)
    t = str(v).strip().replace("T", " ")
    if t.endswith("Z"):
        t = t[:-1] + "+00:00"
    m = re.match(r"^(\d{4}-\d\d-\d\d \d\d:\d\d:\d\d)(\.\d+)?(?: ?([+-]\d\d:?\d\d))?", t)
    if not m:
        return 0
    try:
        base = _dt.datetime.strptime(m.group(1), "%Y-%m-%d %H:%M:%S")
        frac = float("0" + m.group(2)) if m.group(2) else 0.0
        tz = m.group(3)
        off = 0
        if tz:
            tz = tz.replace(":", "")
            off = (int(tz[1:3]) * 60 + int(tz[3:5])) * (1 if tz[0] == "+" else -1)
        epoch = (base - _dt.datetime(1970, 1, 1)).total_seconds() - off * 60 + frac
        return int(epoch * 1000)
    except Exception:
        return 0


def _ollama_read(dst, full):
    import sqlite3
    con = sqlite3.connect(dst)       # the private copy (its write-ahead log is folded into the copy, never into Ollama's file)
    try:
        con.row_factory = sqlite3.Row
        tables = set(r[0] for r in con.execute("SELECT name FROM sqlite_master WHERE type='table'"))
        if "chats" not in tables or "messages" not in tables:
            raise ValueError("this is not the database of Ollama's app (no chats and messages)")
        cols = set(r[1] for r in con.execute("PRAGMA table_info(messages)"))
        att = "attachments" in tables
        chats = []
        for c in con.execute("SELECT id, title, created_at FROM chats ORDER BY created_at"):
            row = {"id": "ollama-" + str(c["id"]), "title": c["title"] or "", "created": _ollama_ms(c["created_at"])}
            msgs = []
            sel = "SELECT id, role, content, created_at%s FROM messages WHERE chat_id = ? ORDER BY id" % (", model_name" if "model_name" in cols else "")
            for m in con.execute(sel, (c["id"],)):
                if not full:
                    msgs.append(1)
                    continue
                text = m["content"] or ""
                if att:
                    names = [a[0] for a in con.execute("SELECT filename FROM attachments WHERE message_id = ?", (m["id"],))]
                    if names:
                        text += "\n\n[Attached in Ollama: " + ", ".join(names) + "]"
                one = {"role": m["role"] or "", "content": text, "created_at": _ollama_ms(m["created_at"])}
                if "model_name" in cols and m["model_name"]:
                    row["model"] = m["model_name"]
                msgs.append(one)
            row["n"] = len(msgs)
            if full:
                row["messages"] = msgs
                row["updated"] = max([x["created_at"] for x in msgs] or [row["created"]])
            chats.append(row)
        return chats
    finally:
        con.close()


def _ollama_chats_find():
    d = None
    try:
        d, dst, src = _ollama_copy()
        if not dst:
            return {"ok": True, "found": False, "looked": _ollama_db_paths()}
        chats = _ollama_read(dst, False)
        return {"ok": True, "found": True, "path": src, "chats": [{"title": c["title"], "created": c["created"], "n": c["n"]} for c in chats][:500],
                "count": len(chats), "messages": sum(c["n"] for c in chats)}
    except Exception as e:
        return {"ok": False, "error": str(e)}
    finally:
        if d:
            shutil.rmtree(d, ignore_errors=True)


def _ollama_chats_json(offset=0, length=4 << 20):
    """the chats as {"chats": [...]}, a piece at a time: offset 0 reads Ollama's database again (from a fresh copy)"""
    d = None
    try:
        offset, length = int(offset or 0), max(1, min(int(length or (4 << 20)), 16 << 20))
        with _OLL["lock"]:
            if offset == 0 or _OLL["json"] is None:
                d, dst, src = _ollama_copy()
                if not dst:
                    return {"ok": False, "error": "Ollama's app keeps no chats on this computer."}
                _OLL["json"] = json.dumps({"source": "Ollama", "chats": [c for c in _ollama_read(dst, True) if c["messages"]]}, ensure_ascii=False)
            t = _OLL["json"]
            piece = t[offset:offset + length]
            more = offset + length < len(t)
            if not more:
                _OLL["json"] = None
            return {"ok": True, "text": piece, "length": len(piece), "more": more, "size": len(t)}
    except Exception as e:
        _OLL["json"] = None
        return {"ok": False, "error": str(e)}
    finally:
        if d:
            shutil.rmtree(d, ignore_errors=True)


'''

rep("\ndef _share_handler():\n", "\n" + FN + "def _share_handler():\n")
rep('''    def share_device_remove(self, dev_id):
        return _share_device_remove(dev_id)
''', '''    def share_device_remove(self, dev_id):
        return _share_device_remove(dev_id)

    # 7.38 (app_ollama_738.py): her chats in Ollama's own app, read only
    def ollama_chats_find(self):
        return _ollama_chats_find()

    def ollama_chats_json(self, offset=0, length=4194304):
        return _ollama_chats_json(offset, length)
''', 2)
if "import shutil" not in s:
    sys.exit("%s: shutil is not imported" % p)

open(p, "w", encoding="utf-8").write(s)
print("patched", p)
