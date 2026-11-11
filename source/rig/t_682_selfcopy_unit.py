"""Ingenium 6.82 (11 November 2026): an app page carried without the copy of itself that it carries (build/self_copy.py), checked
outside the browser on invented pages (no app of hers is read). Checks:
  - a page whose copy is gzip level 9 in one plain base64 run is carried without the copy's text, and the page's own code (Node,
    build/self_copy_prove.js with build/pako and build/self_copy.js) gives it back byte for byte; its note reads back;
  - a copy compressed at another level, base64 broken into lines, a gzip head that carries a name, a page with no copy, and a copy
    that is not made of the page are each carried whole, with the reason said;
  - the code the page carries holds nothing that would end its script block early.
    python3 -I rig/t_682_selfcopy_unit.py
"""
import base64, gzip, io, json, os, random, sys, zlib

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "build"))
import self_copy  # noqa: E402

passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    if c:
        passed += 1
        print("PASS " + m)
    else:
        failed += 1
        print("FAIL " + m + ("" if d is None else "  " + str(d)[:400]))


rnd = random.Random(682)
WORDS = "ledger quill lumen vellum orrery margin folio cedar harbour lantern meadow cipher".split()


def prose(n):
    return " ".join(rnd.choice(WORDS) for _ in range(n))


def app(copy_of=None, level=9, lines=False, name=False):
    """an invented app page: its code, a film block (left out of its own copy, as Carpe Diem leaves out its film), and its copy"""
    code = "<script>\n" + "\n".join("function f%d(){return %r;}" % (i, prose(12)) for i in range(4000)) + "\n</script>\n"
    film = '<script type="application/octet-stream" id="x-film">' + base64.b64encode(bytes(rnd.getrandbits(8) for _ in range(60000))).decode() + "</script>\n"
    head = "<!DOCTYPE html>\n<html><head><title>Invented app</title></head><body>\n<h1>" + prose(6) + "</h1>\n"
    tail = "</body></html>\n"
    own = (head + code + '<script type="x/b64" id="x-self"></script>\n' + tail).encode("utf-8") if copy_of is None else copy_of
    if name:
        buf = io.BytesIO()
        with gzip.GzipFile(filename="own.html", mode="wb", fileobj=buf, compresslevel=level, mtime=0) as g:
            g.write(own)
        gz = buf.getvalue()
    else:
        gz = gzip.compress(own, compresslevel=level, mtime=0)
    b = base64.b64encode(gz).decode()
    if lines:
        b = "\n".join(b[i:i + 76] for i in range(0, len(b), 76))
    page = head + code + film + '<script type="x/b64" id="x-self">' + b + "</script>\n" + tail
    return page.encode("utf-8")


# 1. carried without the copy, and given back whole by the page's own code
raw = app()
cdx, meta = self_copy.compact(raw, "x-self")
ok(cdx is not None, "an app whose copy is gzip level 9 in one plain base64 run rides without the copy's text", meta)
if cdx is not None:
    ok(len(cdx) < len(raw) and raw.find(b'id="x-self">') + len(b'id="x-self">') == meta["at"], "the page carried is smaller, and the note says where the copy stood", (len(cdx), len(raw), meta["at"]))
    lit = sum(len(o) for o in meta["ops"] if isinstance(o, str))
    ok(lit < 200 and len(meta["ops"]) <= 8, "the copy's page is a few runs of the page itself (%d parts, %d letters of its own)" % (len(meta["ops"]), lit), meta["ops"])
    back = json.loads(base64.b64decode(self_copy.attr(meta)).decode("utf-8"))
    ok(back == json.loads(json.dumps(meta)), "the block's note reads back as it was written")
    good, why = self_copy.prove(cdx, meta, raw)
    ok(good, "the page's own code (pako and self_copy.js, in Node) gives the app back byte for byte: " + str(why), why)
    bad = dict(meta, head="1f8b08000000000002" + "03")
    good2, why2 = self_copy.prove(cdx, bad, raw)
    ok(not good2, "a note with another gzip head does not pass for the app", why2)

# 2. carried whole, each with its reason
for label, page, want in [
    ("a copy compressed at level 6", app(level=6), "byte for byte"),
    ("a copy whose base64 is broken into lines", app(lines=True), "plain base64"),
    ("a copy whose gzip head carries a name", app(name=True), "name"),
    ("a copy that is not made of the page", app(copy_of=("<html>" + prose(20000) + "</html>").encode()), "differs from the page"),
]:
    c, why = self_copy.compact(page, "x-self")
    ok(c is None and want in str(why), label + " rides whole: " + str(why), why)
c, why = self_copy.compact(app(), "no-such-block")
ok(c is None and "no block" in why, "a page with no such block rides whole: " + str(why), why)

# 3. what the page carries
src = self_copy.source()
low = src.lower()
ok("</script" not in low and "<!--" not in low and "<script" not in low and "function ingSelfRebuild" in src and "MIT License" in src,
   "the code the page carries ends no script early, holds the rebuild, and names pako's licence")

print("\n%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
