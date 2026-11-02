"""Pass 643 of the Forge: the Forge at Ingenium 6.1's level, paired with Ingenium 6.1 (each carries the other's lean page).

The owner's words (20 October 2026): "for the Forge, I want you to implement storage management policies to automatically
evict old app versions when storage limits are approached. Add robust error handling for ZIP file corruption, storage quota
exceeded, and missing dependencies. Develop a more comprehensive accessibility audit, including screen reader testing with
actual assistive technology. Create a backup and restore system that allows users to export the entire library and app state.
Enhance the walkthrough feature to adapt to user skill level and provide contextual help. Implement a version comparison tool
to help users understand changes between app versions. Add user-controlled storage limits with warnings before reaching
capacity. Develop a migration path for users moving between different devices or platforms. Create a testing framework for
the library system to ensure reliability across different IndexedDB implementations. Implement a "clean library" function to
remove unused app versions and free up space." And: "Yes, please offer the wallpapers inside of both apps." And: "You also need
to update the Forge with the latest version of Ingenium when its done and update Ingenium with the latest version of the
Forge so that they both offer the latest builds with the right numbers for me to use and work on."

What it does, each change found exactly once or the pass stops:
  1. the build stamp: 643, 9s75;
  2. Fabrica, fresh from Ingenium's modules (forge_fabrica.py: R110, R111, R112, R140's views of GitHub's own, R114), with the
     frame that follows the room's head (forge_fit.py), unless --keep-fabrica;
  3. every block in blocks_early/ right after <body> (the loading page, painted before the rest is read), and every block in
     blocks/ (name order), before </body>: each one a part of this pass, made and tested on its own;
  4. the full page only: every block in blocks_full/ (large data, such as the wallpapers, that the lean page Ingenium carries
     leaves out), then the apps it carries, as passes 632 to 642.

usage:
  forge643.py FORGE642_LEAN.html OUT_DIR [--only NAME[,NAME]] [--keep-fabrica]
      writes OUT_DIR/the_forge_643_lean.html (and, with --only, only those blocks, for a block's own tests)
  forge643.py FORGE642_LEAN.html OUT_DIR INGENIUM_LEAN.html CARPE_DIEM.html INKWELL.html
      also writes OUT_DIR/the_forge.html, the full page.
  --release leaves out the blocks held.json names."""
import base64, gzip, hashlib, importlib.util, json, os, re, sys

STAMP, PASS, DATE = "9s75", "643", "2026-10-21"
HERE = os.path.dirname(os.path.abspath(__file__))
argv = [a for a in sys.argv[1:]]
only = None
keep_fab = "--keep-fabrica" in argv
if keep_fab:
    argv.remove("--keep-fabrica")
# a release pass leaves out the blocks held.json names (still being finished, or not yet through their review)
held = set()
if "--release" in argv:
    argv.remove("--release")
    held = set(json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "held.json")))["blocks"])
    print("held out of this release:", ", ".join(sorted(held)) or "nothing")
if "--only" in argv:
    k = argv.index("--only")
    only = set(argv[k + 1].split(","))
    del argv[k:k + 2]
src, out_dir = argv[0], argv[1]
apps_in = argv[2:5]
s = open(src, encoding="utf-8").read()
if 'id="forge-bi-meta"' in s:
    raise SystemExit("give the 642 lean page (it carries no apps)")
if 'pass:"642"' not in s:
    raise SystemExit("this is not the 642 page")


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit("expected %d, found %d: %r" % (count, n, a[:120]))
    s = s.replace(a, b)


def load(name, rel):
    sp = importlib.util.spec_from_file_location(name, os.path.join(HERE, rel))
    m = importlib.util.module_from_spec(sp)
    sp.loader.exec_module(m)
    return m


# 1. THE BUILD STAMP
rep('window.CD_BUILD={date:"2026-10-20",pass:"642",stamp:"9s74"};', 'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP))
rep('<span class="build">Build 642 · 9s74</span>', '<span class="build">Build %s · %s</span>' % (PASS, STAMP), 2)

# 2. FABRICA, FRESH FROM INGENIUM'S MODULES
if not keep_fab:
    a = s.find("<!-- PASS 642 · Fabrica, the offline GitHub")
    b = s.find('<style id="forge-fabrica-css">', a)
    b = s.find("</style>", b) + len("</style>")
    if a < 0 or b < a or s.count("<!-- PASS 642 · Fabrica, the offline GitHub") != 1:
        raise SystemExit("Fabrica's block was not found once")
    ff = load("forge_fabrica", os.path.join("..", "forge_639", "forge_fabrica.py"))
    s = s[:a] + "<!-- PASS 643 · Fabrica, the offline GitHub, with no model (Ingenium 6.1's R110, R111, R112, R140 and R114, made the Forge's) -->\n" + ff.block() + s[b:]
    s = load("forge_fit", os.path.join("..", "forge_fit.py")).fabrica(s)


# 3. THE BLOCKS OF THIS PASS
def blocks(folder):
    d = os.path.join(HERE, folder)
    out = []
    for name in sorted(os.listdir(d)) if os.path.isdir(d) else []:
        if not name.endswith(".html"):
            continue
        key = name[:-5]
        if only is not None and key not in only:
            continue
        if key in held:
            continue
        t = open(os.path.join(d, name), encoding="utf-8").read()
        if re.search(r"<script[^>]+src=[\"']https?://", t):
            raise SystemExit(name + ": loads a script from outside, which the Forge never does")
        out.append("<!-- PASS 643 · " + key + " -->\n" + t)
    return out


k = s.rfind("</body>")
s = s[:k] + "\n" + "\n".join(blocks("blocks")) + "\n" + s[k:]
# the loading page comes first in the body (only blocks named in --only when a block is tested on its own)
early = blocks("blocks_early")
if early:
    rep('<body data-theme="light">\n', '<body data-theme="light">\n' + "\n".join(early) + "\n")


def boot_map(t):
    """The loading page's bar: where each of the page's scripts begins, in thousandths of the page. The page is walked as
    the browser reads it: a script ends at the first "</script" after it opens, so text inside one that only looks like a
    tag is not counted."""
    mark = "/*FORGE_BOOT_MAP*/"
    i = t.find(mark)
    if i < 0:
        return t
    j = t.index("]", i) + 1
    t = t[:i] + mark + "[]" + t[j:]
    marks, pos, low = [], 0, t.lower()
    while True:
        a = low.find("<script", pos)
        if a < 0:
            break
        marks.append(a)
        z = low.find("</script", a + 7)
        if z < 0:
            break
        pos = z + 8
    m = [min(999, int(x * 1000 / len(t))) for x in marks]
    return t.replace(mark + "[]", mark + json.dumps(m, separators=(",", ":")), 1)


s = boot_map(s)
lean = s
os.makedirs(out_dir, exist_ok=True)
open(os.path.join(out_dir, "the_forge_643_lean.html"), "w", encoding="utf-8").write(lean)
print("lean", len(lean.encode("utf-8")), hashlib.sha256(lean.encode("utf-8")).hexdigest())
full_extra = blocks("blocks_full")
if only is not None:
    # a block's own tests: its large data too, in a page of its own
    t = lean
    k = t.rfind("</body>")
    t = boot_map(t[:k] + "\n" + "\n".join(full_extra) + "\n" + t[k:])
    open(os.path.join(out_dir, "the_forge_643_test.html"), "w", encoding="utf-8").write(t)
    print("test page with", sorted(only))
if not apps_in:
    sys.exit(0)


# 4. THE FULL PAGE: its large data, and the apps it carries (as passes 632 to 642)
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
        raise SystemExit("Carpe Diem: 1058 or later is wanted")
    return {"key": "cd", "title": "Carpe Diem", "version": m.group(2), "build": m.group(3), "date": m.group(1), "name": "carpe_diem.html"}


def inkwell(t):
    m = re.search(r"<!-- BUILD='([\d.]+)'", t[:2000])
    if not m or "Inkwell" not in t[:4000]:
        raise SystemExit("Inkwell: not its page")
    return {"key": "inkwell", "title": "Inkwell", "version": m.group(1), "build": "", "date": DATE, "name": "Inkwell.html"}


blocks_out, metas = [], []


def carry(meta, raw, block_id, self_copy=False):
    if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude(usercontent)?\.(ai|com)", raw):
        raise SystemExit(meta["title"] + ": carries a script from outside that does not belong")
    b = raw.encode("utf-8")
    z = bytearray(gzip.compress(b, 9, mtime=0))
    meta = dict(meta, id=block_id, size=len(b), sha256=hashlib.sha256(b).hexdigest(), gz=len(z))
    if self_copy:
        meta["self"] = True
    metas.append(meta)
    blocks_out.append('<script type="forge/b64" id="%s">%s</script>' % (block_id, base64.b64encode(bytes(z)).decode("ascii")))


ing_t, cd_t, ink_t = (open(p, encoding="utf-8").read() for p in apps_in)
carry(ingenium(ing_t), ing_t, "forge-bi-ingenium")
carry(carpediem(cd_t), cd_t, "forge-bi-cd")
carry(inkwell(ink_t), ink_t, "forge-bi-inkwell")
carry({"key": "forge", "title": "The Forge", "version": PASS, "build": STAMP, "date": DATE, "name": "the_forge.html"}, lean, "forge-bi-self", True)
sig = hashlib.sha256((STAMP + "|" + "|".join(m["sha256"] for m in metas)).encode()).hexdigest()[:24]
meta_block = '<script type="application/json" id="forge-bi-meta">%s</script>' % json.dumps(
    {"format": "forge-builtin", "stamp": STAMP, "sig": sig, "apps": metas}, separators=(",", ":")).replace("</", "<\\/")
k = lean.rfind("</body>")
full = boot_map(lean[:k] + "\n" + "\n".join(full_extra) + "\n<!-- PASS 643 · the apps the Forge carries (lean copies), and its own page -->\n" + meta_block + "\n" + "\n".join(blocks_out) + "\n" + lean[k:])
open(os.path.join(out_dir, "the_forge.html"), "w", encoding="utf-8").write(full)
print("full", len(full.encode("utf-8")), hashlib.sha256(full.encode("utf-8")).hexdigest())
for m in metas:
    print("  carries", m["title"], m["version"], m["size"], "bytes,", m["gz"], "compressed")
