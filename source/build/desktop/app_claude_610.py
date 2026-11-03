"""Ingenium 6.10 (3 November 2026): Claude Code's sessions kept on this computer, read on her press (patch for ingenium_app.py, Mac and
Windows; applied after app_lend_693.py).

Her words (3 November 2026): "I want a safe way to move my data from Claude and Ollama to Ingenium so that I don't lose all of my
work ... so that I can continue working right from where I left off". Claude Code keeps each session as a file of JSON lines under
~/.claude/projects/<project>/<session-id>.jsonl (its documentation, code.claude.com/docs/en/sessions; the folder moves with the
CLAUDE_CONFIG_DIR setting, which is honoured here). The page's Folders (modules/r208.js) asks for them on her press, through two
calls, and nothing else:
  claude_sessions()                       the .jsonl files there: their names, sizes and times, newest first; nothing is read
  claude_session_read(rel, offset, len)   a piece of one of them, as text, ending at a whole line; only a .jsonl file inside that
                                          folder, never a path that leaves it, never another kind of file
Nothing is written, moved or sent anywhere; the page reads what it is given with its own reader (modules/r160.js) and keeps it on
this device. Claude Code's documentation says the format of these files is its own and may change: the reader is lenient, and a
line it cannot read is passed over.

    python3 build/desktop/app_claude_610.py <repo>/ingenium_app.py"""
import sys

MARK = "_claude_sessions"

CODE = r'''

# ---- 6.10: Claude Code's sessions on this computer, read on her press (app_claude_610.py) ----
_CLAUDE_PIECE = 4 * 1024 * 1024
_CLAUDE_MAX_FILES = 4000


def _claude_root():
    """Claude Code's projects folder: ~/.claude/projects, or under CLAUDE_CONFIG_DIR when it is set."""
    base = os.environ.get("CLAUDE_CONFIG_DIR") or os.path.join(os.path.expanduser("~"), ".claude")
    return os.path.realpath(os.path.join(base, "projects"))


def _claude_inside(full, root):
    a, b = os.path.normcase(full), os.path.normcase(root)
    return a.startswith(b.rstrip(os.sep) + os.sep)


def _claude_sessions():
    """The .jsonl session files under Claude Code's projects folder, newest first: names, sizes and times only."""
    try:
        root = _claude_root()
        if not os.path.isdir(root):
            return {"ok": True, "files": [], "root": root}
        out = []
        for dirpath, dirnames, filenames in os.walk(root, followlinks=False):
            rel_dir = os.path.relpath(dirpath, root)
            depth = 0 if rel_dir == "." else rel_dir.count(os.sep) + 1
            if depth >= 1:                       # <project>/<session>.jsonl only: a session's own folder (its helpers' work) is left
                dirnames[:] = []
            if depth != 1:
                continue
            for fn in sorted(filenames):
                if not fn.lower().endswith(".jsonl"):
                    continue
                full = os.path.join(dirpath, fn)
                try:
                    if os.path.islink(full) or not os.path.isfile(full):
                        continue
                    st = os.stat(full)
                except OSError:
                    continue
                rel = os.path.relpath(full, root).replace(os.sep, "/")
                out.append({"rel": rel, "name": rel.replace("/", " - "), "size": int(st.st_size), "mtime": int(st.st_mtime * 1000)})
                if len(out) >= _CLAUDE_MAX_FILES:
                    break
            if len(out) >= _CLAUDE_MAX_FILES:
                break
        out.sort(key=lambda x: -x["mtime"])
        return {"ok": True, "files": out, "root": root}
    except Exception:
        log_problem("claude_sessions failed", sys.exc_info())
        return {"ok": False, "error": "Claude Code's sessions could not be listed.", "files": []}


def _claude_session_read(rel, offset=0, length=_CLAUDE_PIECE):
    """A piece of one session file, as text, ending at a whole line: only a .jsonl file inside Claude Code's projects folder."""
    try:
        root = _claude_root()
        rel = str(rel or "")
        if "\x00" in rel or not rel.lower().endswith(".jsonl"):
            return {"ok": False, "error": "Only Claude Code's session files are read."}
        parts = [x for x in rel.replace("\\", "/").split("/") if x]
        if not parts or any(x in (".", "..") or ":" in x for x in parts):
            return {"ok": False, "error": "That is not a session file."}
        joined = os.path.join(root, *parts)
        if os.path.islink(joined):
            return {"ok": False, "error": "That is not a session file."}
        full = os.path.realpath(joined)
        if not _claude_inside(full, root):
            return {"ok": False, "error": "That path leaves Claude Code's folder."}
        if not os.path.isfile(full):
            return {"ok": False, "error": "There is no such session file."}
        try:
            offset = max(0, int(offset or 0))
            length = max(1, min(int(length or _CLAUDE_PIECE), _CLAUDE_PIECE))
        except (TypeError, ValueError):
            return {"ok": False, "error": "The offset and the length must be whole numbers."}
        with open(full, "rb") as fh:
            size = os.fstat(fh.fileno()).st_size
            fh.seek(min(offset, size))
            data = fh.read(length)
        if offset + len(data) < size:
            cut = data.rfind(b"\n")
            if cut >= 0:
                data = data[:cut + 1]            # a piece ends at a whole line: no character and no line is cut in two
            else:
                while data and (data[-1] & 0xC0) == 0x80:
                    data = data[:-1]             # a line longer than a piece: at least no character is cut in two
                if data and data[-1] >= 0xC0:
                    data = data[:-1]
        return {"ok": True, "text": data.decode("utf-8", "replace"), "length": len(data), "size": size, "more": offset + len(data) < size}
    except Exception:
        log_problem("claude_session_read failed", sys.exc_info())
        return {"ok": False, "error": "The session file could not be read."}
'''

METHODS = '''
    # 6.10: Claude Code's sessions on this computer, read on her press (app_claude_610.py)
    def claude_sessions(self):
        return _claude_sessions()

    def claude_session_read(self, rel, offset=0, length=4194304):
        return _claude_session_read(rel, offset, length)
'''

if __name__ == "__main__":
    p = sys.argv[1]
    s = open(p, encoding="utf-8").read()
    if MARK in s:
        print("already patched", p)
        sys.exit(0)

    def rep(old, new, n=1):
        global s
        c = s.count(old)
        if c != n:
            sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
        s = s.replace(old, new)

    rep("\n\nclass IngeniumApi(_LiteWindows):", CODE + "\n\nclass IngeniumApi(_LiteWindows):")
    anchor = "        return _rag_read(path, rel, offset, length)\n"
    rep(anchor, anchor + METHODS, 2)
    open(p, "w", encoding="utf-8").write(s)
    print("patched", p)
