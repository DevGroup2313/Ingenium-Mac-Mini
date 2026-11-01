"""Ingenium 6.9.3 (1 November 2026): two fixes to the folder search's side of the desktop app (app_rag_692.py, released in 6.9.2),
found in the review of the folder search's first phase.

  1. A symbolic link inside a chosen folder could reach a hidden file or a hidden folder in it (the hidden-file rule looked
     only at the names in the request). Now what a path really is, once its links are resolved, is checked step by step below
     the folder: no step may be hidden (by its name or the system's own mark), and a file must be of a searched type. This is
     done when a folder is listed and when a file is read. (Nothing outside the chosen folder could be reached before either.)
  2. A folder chosen through a link (or, on Windows, a mapped drive) whose target had changed could not be forgotten, and
     stayed readable by its old real path. Now it is forgotten by the path it was chosen with too.

The changes are exact replacements in the text app_rag_692.py added (each found exactly once, or nothing is written).
rig/rag_bridge.py runs app_rag_692's CODE with these replacements made (upgrade_code), so the tests exercise the code the
apps will have.

    python3 build/desktop/app_rag_693.py <repo>/ingenium_app.py
"""
import sys

MARK = "_rag_real_steps_ok"     # what release.py looks for: a function this patch adds
NEEDS = "_rag_choose_folder"    # app_rag_692's mark: this patch changes its code

STEPS = r'''

def _rag_real_steps_ok(full, base, want_file):
    """For what a path really is once its links are resolved: True when it lies inside base, no step of it below base is
    hidden (by its name or the system's own mark), and (want_file) it is a file of a searched type. So a link inside the
    folder cannot reach a hidden file or a hidden folder, and neither can another spelling of a name (a Windows short name).
    (6.9.3, app_rag_693.py)"""
    try:
        real, rbase = os.path.realpath(full), os.path.realpath(base)
        if not _rag_inside(os.path.normcase(real), os.path.normcase(rbase)):
            return False
        cur = rbase
        for part in os.path.relpath(real, rbase).split(os.sep):
            if part in ("", "."):
                continue
            cur = os.path.join(cur, part)
            if _rag_hidden(part, os.lstat(cur)):
                return False
        return _rag_type_ok(os.path.basename(real)) if want_file else True
    except (OSError, ValueError):
        return False
'''

REPLACEMENTS = [
    # the new check, after _rag_type_ok
    ('''def _rag_type_ok(name):
    return os.path.splitext(name)[1].lower() in _RAG_TYPES
''', '''def _rag_type_ok(name):
    return os.path.splitext(name)[1].lower() in _RAG_TYPES
''' + STEPS),
    # listing: a link to a folder
    ('''                if not _rag_inside(real, nbase) or real in chain:
                    continue                                 # it leaves the folder, or loops back into a folder it is already inside
                subdirs.append((full, prefix + name + "/", chain + (real,)))''',
     '''                if not _rag_inside(real, nbase) or real in chain:
                    continue                                 # it leaves the folder, or loops back into a folder it is already inside
                if islink and not _rag_real_steps_ok(full, base, False):
                    continue                                 # a link to a hidden folder inside this one (6.9.3)
                subdirs.append((full, prefix + name + "/", chain + (real,)))'''),
    # listing: a link to a file
    ('''                if islink and not _rag_inside(_rag_real(full), nbase):
                    continue''',
     '''                if islink and not _rag_real_steps_ok(full, base, True):
                    continue                                 # it leaves the folder, or reaches a hidden file or another type (6.9.3)'''),
    # forgetting: by the path it was chosen with too
    ('''        want = _rag_real(path)
        with _RAG_LOCK:
            rows = _rag_load()
            keep = [r for r in rows if os.path.normcase(r["real"]) != want]''',
     '''        want = _rag_real(path)
        said = os.path.normcase(os.path.abspath(path))
        with _RAG_LOCK:
            rows = _rag_load()
            # by its real path, and by the path it was chosen with: a link or a mapped drive may point elsewhere by now (6.9.3)
            keep = [r for r in rows if os.path.normcase(r["real"]) != want and os.path.normcase(os.path.abspath(r["path"])) != said]'''),
    # reading: what a link inside the folder points to is checked too
    ('''        if not os.path.isfile(full):
            return _rag_err("There is no such file in the folder.", "NO_FILE")
        with open(full, "rb") as fh:''',
     '''        if not os.path.isfile(full):
            return _rag_err("There is no such file in the folder.", "NO_FILE")
        if not _rag_real_steps_ok(cur, base, True):            # what a link inside the folder points to is checked too (6.9.3)
            return _rag_err("Hidden files are not read.", "HIDDEN")
        with open(full, "rb") as fh:'''),
]


def upgrade_code(text, where="the text"):
    """text with every replacement made; SystemExit with the reason when an old part is not found exactly once."""
    for i, (old, new) in enumerate(REPLACEMENTS, 1):
        c = text.count(old)
        if c != 1:
            sys.exit("app_rag_693: change %d found %d times in %s, not once" % (i, c, where))
        text = text.replace(old, new)
    return text


def apply(s):
    """The patched text of ingenium_app.py; SystemExit with the reason if the file is not the shape this patch knows."""
    if MARK in s:
        return s
    if NEEDS not in s:
        sys.exit("app_rag_693: the folder search's code (app_rag_692) is not in this file")
    return upgrade_code(s, "ingenium_app.py")


def main(argv):
    p = argv[1]
    s = open(p, encoding="utf-8").read()
    if MARK in s:
        print("rag 6.9.3: already in", p)
        return 0
    new = apply(s)
    compile(new, p, "exec")                  # a patch that does not compile is never written
    open(p, "w", encoding="utf-8", newline="\n").write(new)
    print("rag 6.9.3: added to", p)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
