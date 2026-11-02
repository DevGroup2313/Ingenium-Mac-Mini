"""6.8.1 (28 October 2026): Ingenium is ready before the browser has read what it carries for later.

The owner's words: "I want Ingenium and the Forge to be working efficiently with no bugs and have its performance improved
immensely as an app."

The page is about 74 MB, and 56 MB of it are carried for later: the apps kept in the library (Carpe Diem, the Forge,
Inkwell), the page's own engine, the picture reader, the kit store and the document typefaces. They sat between the page's
own parts, so the browser read all of them before the last part could mark the page ready. Now each stays in its place as
an empty block that names where it is (data-defer="#ing-tail:<id>"), and is carried itself after the page's last part, as
a block of the same kind named ing-tail:<id>. The page is ready once its own parts are read; ingFill (build_page.py)
takes a block from the end of the page the first time it is wanted, as it fetches one from the computer apps
(desktop/app_quick_62.py, desktop/app_quick_681.py). Run last: after the release has put the kit store in.

    tail(page) -> page        the blocks moved to the end (idempotent)
    untail(page) -> page      the page as it was"""
import re

IDS = ("ing-builtin-cd", "ing-builtin-forge", "ing-builtin-inkwell", "ingenium-kit-bundle", "ingenium-engine-wasm",
       "ingenium-engine-compat-wasm", "ing-eyes", "ing-docfonts")
PRE = "ing-tail:"


def _attrs(tag, ident):
    """the tag's other attributes, the id taken out"""
    return re.sub(r'\s+id="%s"' % re.escape(ident), "", tag[len("<script"):-1])


def tail(page):
    if 'id="' + PRE in page:
        return page
    moved = []
    for ident in IDS:
        m = re.search(r'(<script\b[^>]*\bid="%s"[^>]*>)([^<]*)</script>' % re.escape(ident), page)
        if not m or len(m.group(2)) < 1024 or "data-defer" in m.group(1):
            continue
        rest = _attrs(m.group(1), ident)
        place = '<script id="%s"%s data-defer="#%s%s" data-defer-bytes="%d"></script>' % (ident, rest, PRE, ident, len(m.group(2)))
        moved.append('<script id="%s%s"%s>%s</script>\n' % (PRE, ident, rest, m.group(2)))
        page = page[:m.start()] + place + page[m.end():]
    if not moved:
        return page
    i = page.rfind("</body>")
    if i < 0:
        raise SystemExit("tail: the page has no </body>")
    return page[:i] + "".join(moved) + page[i:]


def untail(page):
    found = list(re.finditer(r'<script id="%s([^"]+)"([^>]*)>([^<]*)</script>\n?' % re.escape(PRE), page))
    for m in reversed(found):
        page = page[:m.start()] + page[m.end():]
    for m in found:
        ident, rest, body = m.group(1), m.group(2), m.group(3)
        place = re.compile(r'<script id="%s"[^>]* data-defer="#%s%s" data-defer-bytes="\d+"></script>' % (re.escape(ident), re.escape(PRE), re.escape(ident)))
        page, n = place.subn(lambda _: '<script id="%s"%s>%s</script>' % (ident, rest, body), page, count=1)
        if n != 1:
            raise SystemExit("untail: %s has no place left for it" % ident)
    return page
