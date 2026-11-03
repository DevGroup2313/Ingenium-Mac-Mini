#!/usr/bin/env python3
"""Claude Code's sessions on this computer, read on her press (Ingenium 6.10, build/desktop/app_claude_610.py). It runs the patch's
own CODE (the very text it adds to ingenium_app.py) against a stand-in home folder, and applies the patch to a copy of the app.

    python3 -I rig/t_610_claude_sessions.py

Checks: the sessions under .claude/projects are listed (names, sizes, times, newest first), and nothing else (another kind of file,
a link, a session's helpers' work in its own folder); CLAUDE_CONFIG_DIR is honoured; a piece ends at a whole line and the pieces join to the whole file; a path
that leaves the folder, a link, another kind of file, a bad offset are refused in plain words; the patch adds the two calls to both
of the app's bridges, once."""
import os, sys, json, shutil, tempfile, types, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
PATCH = os.path.normpath(os.path.join(HERE, "..", "build", "desktop", "app_claude_610.py"))
APP = os.path.normpath(os.path.join(HERE, "..", "..", "ingenium_app.py"))
passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    print(("PASS " if c else "FAIL ") + m + ("" if c or d is None else "  " + json.dumps(d)[:400]))
    if c:
        passed += 1
    else:
        failed += 1


spec = importlib.util.spec_from_file_location("app_claude_610", PATCH)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
problems = []
ns = {"os": os, "sys": sys, "log_problem": lambda what, info: problems.append(what)}
exec(mod.CODE, ns)

tmp = tempfile.mkdtemp(prefix="ing610-")
try:
    cfg = os.path.join(tmp, "claude-config")
    proj = os.path.join(cfg, "projects", "-Users-yannie-Ingenium")
    os.makedirs(proj)
    os.makedirs(os.path.join(cfg, "projects", "-Users-yannie-Inkwell", "sess-b", "subagents", "deep"))
    lines = [json.dumps({"type": "user", "message": {"role": "user", "content": "Ingenium: line %d, café — naïve" % i}}) for i in range(4000)]
    a = os.path.join(proj, "sess-a.jsonl")
    open(a, "w", encoding="utf-8").write("\n".join(lines) + "\n")
    b = os.path.join(cfg, "projects", "-Users-yannie-Inkwell", "sess-b.jsonl")
    open(b, "w", encoding="utf-8").write('{"type":"user","message":{"role":"user","content":"Inkwell"}}\n')
    os.utime(a, (2000000000, 2000000000))
    os.utime(b, (1900000000, 1900000000))
    open(os.path.join(proj, "notes.txt"), "w").write("not a session")
    open(os.path.join(cfg, "projects", "-Users-yannie-Inkwell", "sess-b", "subagents", "agent-1.jsonl"), "w").write('{"a":1}\n')
    open(os.path.join(cfg, "projects", "-Users-yannie-Inkwell", "sess-b", "subagents", "deep", "too-deep.jsonl"), "w").write('{"a":1}\n')
    secret = os.path.join(tmp, "secret.jsonl")
    open(secret, "w").write('{"secret":true}\n')
    try:
        os.symlink(secret, os.path.join(proj, "link.jsonl"))
        linked = True
    except OSError:
        linked = False
    os.environ["CLAUDE_CONFIG_DIR"] = cfg

    L = ns["_claude_sessions"]()
    rels = [f["rel"] for f in L["files"]]
    ok(L["ok"] and rels[0] == "-Users-yannie-Ingenium/sess-a.jsonl" and "-Users-yannie-Inkwell/sess-b.jsonl" in rels, "the sessions are listed, newest first, under CLAUDE_CONFIG_DIR when it is set", rels)
    ok(len(rels) == 2 and not any("subagents" in r for r in rels) and not any(r.endswith(".txt") for r in rels) and not any("link" in r for r in rels),
       "only her sessions: not the work of a session's helpers in its own folder, no other kind of file, no link", rels)
    f0 = L["files"][0]
    ok(f0["size"] == os.path.getsize(a) and f0["mtime"] == 2000000000000 and f0["name"] == "-Users-yannie-Ingenium - sess-a.jsonl", "each with its size, its time and a readable name", f0)

    parts, off, n = [], 0, 0
    while True:
        r = ns["_claude_session_read"](f0["rel"], off, 50000)
        if not r["ok"]:
            break
        parts.append(r["text"])
        off += r["length"]
        n += 1
        if not r["text"].endswith("\n") and r["more"]:
            break
        if not r["more"]:
            break
    whole = open(a, encoding="utf-8").read()
    ok(n > 3 and "".join(parts) == whole and all(p.endswith("\n") for p in parts), "read in pieces, each ends at a whole line, and the pieces join to the whole file", {"pieces": n})

    r = ns["_claude_session_read"]("../../secret.jsonl")
    ok(not r["ok"] and "not a session file" in r["error"], "a path with .. is refused", r)
    r = ns["_claude_session_read"]("-Users-yannie-Ingenium/notes.txt")
    ok(not r["ok"] and "Only Claude Code's session files" in r["error"], "another kind of file is refused", r)
    if linked:
        r = ns["_claude_session_read"]("-Users-yannie-Ingenium/link.jsonl")
        ok(not r["ok"], "a link inside the folder is not followed", r)
    r = ns["_claude_session_read"](os.path.abspath(secret))
    ok(not r["ok"], "an absolute path outside the folder is refused", r)
    r = ns["_claude_session_read"](f0["rel"], "x", 10)
    ok(not r["ok"] and "whole numbers" in r["error"], "a bad offset is refused in plain words", r)
    r = ns["_claude_session_read"]("-Users-yannie-Ingenium/none.jsonl")
    ok(not r["ok"] and "no such session" in r["error"], "a session that is not there is said so", r)
    del os.environ["CLAUDE_CONFIG_DIR"]
    os.environ["HOME"] = os.path.join(tmp, "nohome")
    L2 = ns["_claude_sessions"]()
    ok(L2["ok"] and L2["files"] == [], "with no Claude Code on this computer: an empty list, no error", L2)

    # the patch applied to a copy of the app: both bridges have the two calls, once
    app = os.path.join(tmp, "ingenium_app.py")
    shutil.copy(APP, app)
    import subprocess
    out = subprocess.run([sys.executable, PATCH, app], capture_output=True, text=True)
    s = open(app, encoding="utf-8").read()
    ok(out.returncode == 0 and s.count("def _claude_sessions():") == 1 and s.count("    def claude_sessions(self):") == 2 and s.count("    def claude_session_read(self, rel, offset=0, length=4194304):") == 2,
       "the patch adds the functions once and the two calls to both of the app's bridges", out.stdout + out.stderr)
    out2 = subprocess.run([sys.executable, PATCH, app], capture_output=True, text=True)
    ok("already patched" in out2.stdout, "applied again, it changes nothing")
    comp = subprocess.run([sys.executable, "-m", "py_compile", app], capture_output=True, text=True)
    ok(comp.returncode == 0, "the patched app compiles", comp.stderr[-300:])
    ok(not problems, "nothing was written to the app's log of problems", problems)
finally:
    shutil.rmtree(tmp, ignore_errors=True)
print("%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
