"""Ingenium 6.11 (4 November 2026): which engine answered, proved (patch for ingenium_app.py, Mac and Windows; applied after
app_engine2_6105.py).

6.10.5's cloud builds ran the newer engine's self-test and reported "llama.cpp b11321", the proven engine's version, because
_engine_info() read VERSION.txt from the proven engine's resources (engine/<platform>/) when the running engine's own sat
elsewhere (a Mac app keeps the newer engine's in Contents/Resources/engine-next/<platform>/). So the report could not show
which engine had answered. Now:
  _engine_info()   gives the running engine's own version (_engine_meta, which knows engine-next/), and engine_kind:
                   "newer" or "proven";
  the self-test    records, for the engine it ran, the folder's kind and the binary's own answer to --version (its build
                   number and the commit it was compiled from), so the cloud build keeps the newer engine only when the
                   binary that answered is the newer one.

    python3 build/desktop/app_engine3_6106.py <repo>/ingenium_app.py"""
import sys

MARK = "_engine_info_one"

CODE = r'''

# ---- 6.11: which engine answered, proved (app_engine3_6106.py) ----
_engine_info_one = _engine_info


def _engine_info():
    """As before; the version is the running engine's own, and engine_kind says which of the two it is."""
    info = _engine_info_one()
    try:
        d = _engine_dir()
        if d and info.get("available"):
            nd = _engine_next_dir()
            info["engine_kind"] = "newer" if (nd and os.path.normpath(d) == os.path.normpath(nd)) else "proven"
            v = (_engine_meta(d, "VERSION.txt") or "").strip()
            if v:
                info["version"] = v
    except Exception:
        log_problem("engine: reading the running engine's version failed", sys.exc_info())
    return info


def _engine_build_of(d):
    """The engine binary's own answer to --version (its build number and commit), or a short reason."""
    try:
        r = subprocess.run([_engine_exe(d), "--version"], timeout=120, **_engine_popen_kw(d))
        return (r.stdout or b"").decode("utf-8", "replace").strip()[-300:]
    except Exception as e:
        return "unknown (%s: %s)" % (type(e).__name__, e)
'''

if __name__ == "__main__":
    p = sys.argv[1]
    s = open(p, encoding="utf-8").read()
    if MARK in s:
        print("already patched", p)
        sys.exit(0)
    if "_engine_next_dir" not in s:
        sys.exit("%s: app_engine2_6105.py must be applied first" % p)

    def rep(old, new, n=1):
        global s
        c = s.count(old)
        if c != n:
            sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
        s = s.replace(old, new)

    # after app_engine2_6105's code (whose functions it uses), before the sharing section
    anchor = "\n# R74: sharing this computer's models with the person's other devices.\n"
    i = s.find(anchor)
    j = s.rfind("\n# ---", 0, i)
    if i < 0 or j < 0 or s.count(anchor) != 1 or s.find("def _engine_next_dir():") > j or s.find("\ndef _engine_info():") > j:
        sys.exit("%s: the place for the code was not found" % p)
    s = s[:j] + CODE.rstrip("\n") + "\n\n" + s[j:]
    # the self-test records which engine binary answered
    line = '        res["engine"] = dict((k, info.get(k)) for k in ("available", "platform", "version", "threads"))\n'
    rep(line, line +
        '        if info.get("available"):    # 6.11: which engine binary answers, by its own word (its build and commit)\n'
        '            res["engine"]["kind"] = info.get("engine_kind")\n'
        '            res["engine"]["build"] = _engine_build_of(_engine_dir())\n')
    open(p, "w", encoding="utf-8").write(s)
    print("patched", p)
