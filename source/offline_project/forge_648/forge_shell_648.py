"""The Forge 648: its computer programs (the_forge_app.py, in Forge-windows and in Forge-Mac's Mac project), from the second
security review of 25 October 2026 (finding 7).

pywebview 6.2.1 hands a link a page opens in a new window to the operating system through Python's webbrowser module: on Windows
every window.open and target=_blank (edgechromium.py, on_new_window_request), on a Mac a clicked target=_blank link (cocoa.py),
whatever the address says. webbrowser then passes it on (os.startfile on Windows, the Mac's own open), so a page shown in the
preview could have the computer open a file, a network share, or any kind of address an installed program answers. Now only a web
address (http or https) is handed on, and the Forge's own page (the program opens it in the browser when its window cannot be
drawn); anything else is refused and written in the log.
Each change found exactly once, or nothing is written.
    python3 forge_shell_648.py <the_forge_app.py> [<the_forge_app.py> ...]"""
import sys

CODE = r'''
def _forge_web_links_only(app_html):
    """648 (forge_shell_648.py): the system is asked to open only a web address (http or https), or the Forge's own page."""
    import re as _re
    try:
        import webbrowser as _wb
    except Exception:
        return
    if getattr(_wb.open, "_forge_web_only", False):
        return
    own = ""
    try:
        import pathlib as _pl
        own = _pl.Path(app_html).as_uri() if app_html else ""
    except Exception:
        own = ""

    def _only_web(fn):
        def opener(url, *a, **k):
            u = str(url or "").strip()
            if not (_re.match(r"(?i)^https?://[^\s\x00-\x1f]+$", u) or (own and u == own)):
                log_note("links: %r was not handed to the system (only web addresses, http and https, are opened)" % u[:160])
                return False
            return fn(u, *a, **k)
        opener._forge_web_only = True
        return opener
    for name in ("open", "open_new", "open_new_tab"):
        if hasattr(_wb, name):
            setattr(_wb, name, _only_web(getattr(_wb, name)))

'''

for p in sys.argv[1:]:
    s = open(p, encoding="utf-8", newline="").read()
    if "_forge_web_links_only" in s:
        print("already patched", p)
        continue
    nl = "\r\n" if "\r\n" in s else "\n"
    t = s.replace("\r\n", "\n")

    def rep(old, new, n=1):
        global t
        c = t.count(old)
        if c != n:
            sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:80]))
        t = t.replace(old, new)

    rep("\ndef main():\n", CODE + "\ndef main():\n")
    rep('        _forget_old_pages(app_html)  # 647 (forge_shell_647b.py)\n',
        '        _forget_old_pages(app_html)  # 647 (forge_shell_647b.py)\n'
        '        _forge_web_links_only(app_html)  # 648 (forge_shell_648.py)\n')
    if "\ndef log_note(" not in t:
        sys.exit("%s: log_note is missing" % p)
    open(p, "w", encoding="utf-8", newline="").write(t.replace("\n", nl))
    print("patched", p)
