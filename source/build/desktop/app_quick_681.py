"""Ingenium 6.8.1: the computer apps' quicker start (app_quick_62.py) with a page that carries its blocks at its end.

The owner's words (28 October 2026): "I want Ingenium and the Forge to be working efficiently with no bugs and have its
performance improved immensely as an app."

From 6.8.1 the page itself carries what it keeps for later after its last part (build/tail.py): each block's place names
where it is (data-defer="#ing-tail:<id>"), and the block, named ing-tail:<id>, waits at the end. The window's own load of
the page is now given the page without those blocks too: each is taken out, its place names this app instead
(data-defer="/_payload/<id>"), and the page fetches it from here the first time it is used, as before. A page made before
6.8.1 is treated as before.

    python3 build/desktop/app_quick_681.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_quick_take_tails" in s:
    print("already patched", p)
    sys.exit(0)

rep('''def _quick_page(html_path):''', '''def _quick_take_tails(text, parts):
    """6.8.1: the blocks a page carries at its end (build/tail.py), taken out; each place names this app instead."""
    found = list(re.finditer(rb'<script id="ing-tail:([^"]+)"[^>]*>([^<]*)</script>\\n?', text))
    for m in reversed(found):
        text = text[:m.start()] + text[m.end():]
    for m in found:
        ident = m.group(1)
        parts[ident.decode()] = m.group(2)
        text = text.replace(b'data-defer="#ing-tail:' + ident + b'"', b'data-defer="/_payload/' + ident + b'"', 1)
    return text


def _quick_page(html_path):''')
rep('''        text = open(html_path, "rb").read()
        parts = {}
        for ident in _QUICK_DEFER:''', '''        text = open(html_path, "rb").read()
        parts = {}
        text = _quick_take_tails(text, parts)
        for ident in _QUICK_DEFER:''')
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
