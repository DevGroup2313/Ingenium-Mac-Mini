"""The Forge 647 · its computer programs (forge_shell_647.py), with nothing of pywebview's: a file the page hands over is never
written over one already there, nor as a hidden file, when no dialog can be shown; on a Mac a document to print is opened only as
what it says it is, with the Forge's own extension, in the print folder.
    python3 tests/t_647_shell.py <the_forge_app.py (patched)> [...]"""
import ast, base64, os, sys, tempfile, types
def funcs(path, names):
    src = open(path, encoding="utf-8").read(); tree = ast.parse(src); ns = {}
    logs = []
    ns["log_problem"] = lambda *a, **k: logs.append(("problem", a[0]))
    ns["log_note"] = lambda *a, **k: logs.append(("note", a[0]))
    for n in tree.body:
        if isinstance(n, ast.FunctionDef) and n.name in names:
            exec(compile(ast.Module([n], []), path, "exec"), ns)
    return ns, logs
ok = lambda c, m: print(("PASS " if c else "FAIL ") + m)
home = tempfile.mkdtemp(); os.makedirs(os.path.join(home, "Downloads")); os.environ["HOME"] = home
fake = types.ModuleType("webview"); fake.settings = {}; fake.SAVE_DIALOG = 1; fake.windows = []
sys.modules["webview"] = fake
for label in sys.argv[1:]:
    home = tempfile.mkdtemp(); os.makedirs(os.path.join(home, "Downloads")); os.environ["HOME"] = home
    ns, logs = funcs(label, {"save_bytes", "print_document"})
    b = base64.b64encode(b"hello").decode()
    p1 = ns["save_bytes"](None, "notes.txt", "text/plain", b); p2 = ns["save_bytes"](None, "notes.txt", "text/plain", b)
    ok(p1.endswith("notes.txt") and p2.endswith("notes (2).txt") and open(p1, "rb").read() == b"hello", label + ": with no dialog, a second file of the same name is kept beside the first, never over it (" + os.path.basename(p2) + ")")
    p3 = ns["save_bytes"](None, ".hidden", "text/plain", b)
    ok(os.path.basename(p3) == "hidden", label + ": a name starting with a dot is not written as a hidden file (" + os.path.basename(p3) + ")")
    if "print_document" in ns:
        import subprocess; opened = []; subprocess.Popen = lambda a, *x, **k: opened.append(a[-1])
        r1 = ns["print_document"](None, "evil.command", "application/x-sh", b)
        r2 = ns["print_document"](None, "report.command", "application/pdf", base64.b64encode(b"%PDF-1.4").decode())
        r3 = ns["print_document"](None, "../../x.app", "text/html", b)
        ok(r1 is False and not any(o.endswith(".command") for o in opened), label + ": a document of a type it is not (a shell script) is not opened")
        ok(r2 and r2.endswith(".pdf") and ".command" not in os.path.basename(r2) and os.path.dirname(r2).endswith("TheForgePrint"), label + ": a PDF named \".command\" is opened as a .pdf in the print folder (" + os.path.basename(str(r2)) + ")")
        ok(r3 and r3.endswith(".html") and os.path.dirname(r3).endswith("TheForgePrint") and ".app" not in os.path.basename(r3), label + ": a name that climbs out of the folder stays in it, as a .html (" + os.path.basename(str(r3)) + ")")
