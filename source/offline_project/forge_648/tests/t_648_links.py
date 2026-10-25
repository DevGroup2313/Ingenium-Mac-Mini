"""The Forge 648 · forge_shell_648.py in both programs: the system is asked to open only a web address (http or https), or the
Forge's own page; a file, a share or any other kind of address a page gives is refused and logged.
    python3 tests/t_648_links.py <the_forge_app.py (patched)> [...]"""
import ast, sys, types
ok = lambda c, m: print(("PASS " if c else "FAIL ") + m)
for label in sys.argv[1:]:
    tree = ast.parse(open(label, encoding="utf-8").read())
    notes, opened = [], []
    fake = types.ModuleType("webbrowser")
    fake.open = lambda url, *a, **k: opened.append(url) or True
    fake.open_new = lambda url: fake.open(url, 1)
    fake.open_new_tab = lambda url: fake.open(url, 2)
    sys.modules["webbrowser"] = fake
    ns = {"log_note": lambda m: notes.append(m)}
    for n in tree.body:
        if isinstance(n, ast.FunctionDef) and n.name == "_forge_web_links_only":
            exec(compile(ast.Module([n], []), label, "exec"), ns)
    page = "/Applications/The Forge.app/Contents/Resources/the_forge.html"
    ns["_forge_web_links_only"](page)
    ns["_forge_web_links_only"](page)   # twice: wrapped once
    import pathlib
    good = ["https://github.com/DevGroup2313", "http://example.org/a?b=1", pathlib.Path(page).as_uri()]
    bad = ["file:///etc/passwd", "file:///C:/Windows/System32/calc.exe", "\\\\server\\share\\x.exe", "ms-settings:privacy", "smb://host/x",
           "javascript:alert(1)", "x-apple.systempreferences:com.apple.preference.security", "https://ok.example/\nfile:///x", "  HTTPS://Example.ORG/ok  "]
    res = {u: fake.open(u) for u in good + bad}
    res_tab = fake.open_new_tab("file:///tmp/x")
    ok(all(res[u] for u in good) and all(u.strip() in opened for u in good), label + ": web addresses and the Forge's own page are opened")
    refused = [u for u in bad[:-1] if res[u] is False and u not in opened]
    ok(len(refused) == len(bad) - 1 and res_tab is False, label + ": every other kind of address is refused (%d of %d), through open_new_tab too" % (len(refused), len(bad) - 1))
    ok(res[bad[-1]] and "HTTPS://Example.ORG/ok" in opened, label + ": a web address in capitals with spaces around it still opens")
    ok(any("file:///etc/passwd" in m for m in notes), label + ": a refused address is written in the log")
    ok(getattr(fake.open, "_forge_web_only", False) and fake.open.__name__ == "opener", label + ": the guard is put on once")
