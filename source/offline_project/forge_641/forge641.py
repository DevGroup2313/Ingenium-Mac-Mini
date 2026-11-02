"""Pass 641 of the Forge: it carries Carpe Diem 1058, whose mini Forge is The Forge 641, and Ingenium 5.9, which carries
The Forge 641; nothing else in the Forge changes but its build stamp.

The owner's words (19 October 2026): "The Forge 641 needs to contain Ingenium 5.9 and Ingenium 5.9 should contain the
Forge 641. And both The Forge 641 and Ingenium 5.9 should have Carpe Diem 1058 which has the mini Forge 641". There is no
circle, because each carries the other's lean page, which carries no apps. The order: this pass's lean page first (it
needs nothing); Carpe Diem 1058 makes its mini Forge from it; Ingenium 5.9 carries it and Carpe Diem 1058; Ingenium's lean
page is made; and this pass's full page carries that lean Ingenium, Carpe Diem 1058, Inkwell and its own lean page.

usage:
  forge641.py FORGE640_LEAN.html OUT_DIR
      writes OUT_DIR/the_forge_641_lean.html: the Forge 641 page that carries no apps (Ingenium carries this one)
  forge641.py FORGE640_LEAN.html OUT_DIR INGENIUM_LEAN.html CARPE_DIEM.html INKWELL.html
      also writes OUT_DIR/the_forge.html: the full page, carrying Ingenium (lean), Carpe Diem and Inkwell, and its own
      lean page as its copy of itself (the same way as passes 632 to 640)."""
import base64, gzip, hashlib, importlib.util, json, os, re, sys

STAMP, PASS, DATE = "9s73", "641", "2026-10-19"
src, out_dir = sys.argv[1], sys.argv[2]
apps_in = sys.argv[3:6]
s = open(src, encoding="utf-8").read()
if 'id="forge-bi-meta"' in s:
    raise SystemExit("give the 640 lean page (it carries no apps)")
if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude(usercontent)?\.(ai|com)", s):
    raise SystemExit("the 640 page carries a script from outside that does not belong")
if 'id="room-fabrica"' not in s:
    raise SystemExit("this page has no Fabrica: the 640 lean page is wanted")


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit("expected %d, found %d: %r" % (count, n, a[:120]))
    s = s.replace(a, b)


# 1. THE BUILD STAMP
rep('window.CD_BUILD={date:"2026-10-19",pass:"640",stamp:"9s72"};',
    'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP))

# 1b. THE BUILD WITHOUT ITS DATE: the build line reads "Build 641 · 9s73", and the About no longer says when the build was
#     finished (no_build_dates.py, shared with Carpe Diem 1058)
_sp = importlib.util.spec_from_file_location("no_build_dates", os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "no_build_dates.py"))
nbd = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(nbd)
s = nbd.forge(s)

# 1c. FABRICA'S FRAME FOLLOWS THE ROOM'S HEAD while the help card above it unfolds (forge_fit.py, shared with Carpe Diem 1058)
_sp = importlib.util.spec_from_file_location("forge_fit", os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "forge_fit.py"))
ff = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(ff)
s = ff.fabrica(s)

lean = s
os.makedirs(out_dir, exist_ok=True)
open(os.path.join(out_dir, "the_forge_641_lean.html"), "w", encoding="utf-8").write(lean)
print("lean", len(lean.encode("utf-8")), hashlib.sha256(lean.encode("utf-8")).hexdigest())
if not apps_in:
    sys.exit(0)


# 2. THE APPS IT CARRIES (the full page only), each checked here as it goes in, as in passes 632 to 640
def ingenium(t):
    m = re.search(r'var ING_VERSION="([0-9.]+)",ING_PAGE_DATE="([^"]*)";', t)
    if not m or "var BI={};" not in t or 'id="ing-builtin-' in t:
        raise SystemExit("Ingenium: not its lean page (a version, and no apps of its own carried)")
    return {"key": "ingenium", "title": "Ingenium", "version": m.group(1), "build": "", "date": m.group(2), "name": "ingenium.html"}


def carpediem(t):
    m = re.search(r'window\.CD_BUILD=\{date:"([^"]*)",pass:"(\d+)",stamp:"([^"]*)"', t)
    if not m or 'id="section-forge"' in t or not re.search(r"<title>[^<]*Carpe Diem", t[:400000]):
        raise SystemExit("Carpe Diem: not its page")
    if int(m.group(2)) < 1058:
        raise SystemExit("Carpe Diem: 1058 or later is wanted (its mini Forge is The Forge 640)")
    return {"key": "cd", "title": "Carpe Diem", "version": m.group(2), "build": m.group(3), "date": m.group(1), "name": "carpe_diem.html"}


def inkwell(t):
    m = re.search(r"<!-- BUILD='([\d.]+)'", t[:2000])
    if not m or "Inkwell" not in t[:4000]:
        raise SystemExit("Inkwell: not its page")
    return {"key": "inkwell", "title": "Inkwell", "version": m.group(1), "build": "", "date": DATE, "name": "Inkwell.html"}


blocks, metas = [], []


def carry(meta, raw, block_id, self_copy=False):
    if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude(usercontent)?\.(ai|com)", raw):
        raise SystemExit(meta["title"] + ": carries a script from outside that does not belong")
    b = raw.encode("utf-8")
    z = bytearray(gzip.compress(b, 9, mtime=0))
    meta = dict(meta, id=block_id, size=len(b), sha256=hashlib.sha256(b).hexdigest(), gz=len(z))
    if self_copy:
        meta["self"] = True
    metas.append(meta)
    blocks.append('<script type="forge/b64" id="%s">%s</script>' % (block_id, base64.b64encode(bytes(z)).decode("ascii")))


ing_t, cd_t, ink_t = (open(p, encoding="utf-8").read() for p in apps_in)
carry(ingenium(ing_t), ing_t, "forge-bi-ingenium")
carry(carpediem(cd_t), cd_t, "forge-bi-cd")
carry(inkwell(ink_t), ink_t, "forge-bi-inkwell")
carry({"key": "forge", "title": "The Forge", "version": PASS, "build": STAMP, "date": DATE, "name": "the_forge.html"}, lean, "forge-bi-self", True)
sig = hashlib.sha256((STAMP + "|" + "|".join(m["sha256"] for m in metas)).encode()).hexdigest()[:24]
meta_block = '<script type="application/json" id="forge-bi-meta">%s</script>' % json.dumps(
    {"format": "forge-builtin", "stamp": STAMP, "sig": sig, "apps": metas}, separators=(",", ":")).replace("</", "<\\/")
k = lean.rfind("</body>")
full = lean[:k] + "\n<!-- PASS 641 · the apps the Forge carries (lean copies), and its own page -->\n" + meta_block + "\n" + "\n".join(blocks) + "\n" + lean[k:]
open(os.path.join(out_dir, "the_forge.html"), "w", encoding="utf-8").write(full)
print("full", len(full.encode("utf-8")), hashlib.sha256(full.encode("utf-8")).hexdigest())
for m in metas:
    print("  carries", m["title"], m["version"], m["size"], "bytes,", m["gz"], "compressed")
