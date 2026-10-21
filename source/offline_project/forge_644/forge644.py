"""Pass 644 of the Forge: the Quiet Screen, timed reminders in the Forge's own colours, and an Editor preview that holds
still while the room scrolls. Paired with Ingenium 6.2 (each carries the other's lean page); Carpe Diem 1058 and
Inkwell 7.49 ride along unchanged.

The owner's words (21 October 2026): "I want the "Quiet Screen" feature and page from Ingenium added to the Forge please,
it should be added to all of the apps in the Offline Project. I want the time reminders that show up on the screen to be in
a blue card or a better colour that matches the app better instead of the black colour it currently is, please make the fix.
The live preview panel keeps on shaking when I scroll on the Forge's Editor page, please fix that issue." And then: "There's
no need to add the that page to Inkwell. Please leave it out." And: "Focus on only Ingenium and The Forge for now, don't
work on Carpe Diem or Inkwell."

What it does, each change found exactly once or the pass stops:
  1. the build stamp: 644, 9s76;
  2. the shared modules the Forge carries whole (support_core.html, thought_cloud.html) brought up to date (shared_swap.py);
  3. the exact text patches beside this script (patches_*.json), each found the number of times it names;
  4. the shared modules include.json names (such as quiet_screen.html), then every block in blocks/ (name order), before
     </body>: each one a part of this pass, made and tested on its own;
  5. the full page only: the apps it carries, as passes 632 to 643.

usage:
  forge644.py FORGE643_LEAN.html OUT_DIR [--only NAME[,NAME]]
      writes OUT_DIR/the_forge_644_lean.html (and, with --only, only those blocks, for a block's own tests)
  forge644.py FORGE643_LEAN.html OUT_DIR INGENIUM_LEAN.html CARPE_DIEM.html INKWELL.html
      also writes OUT_DIR/the_forge.html, the full page.
  --release leaves out the blocks held.json names (when there is one)."""
import base64, glob, gzip, hashlib, importlib.util, json, os, re, sys

STAMP, PASS, DATE = "9s76", "644", "2026-10-21"
HERE = os.path.dirname(os.path.abspath(__file__))
argv = [a for a in sys.argv[1:]]
only = None
held = set()
if "--release" in argv:
    argv.remove("--release")
    hp = os.path.join(HERE, "held.json")
    if os.path.exists(hp):
        held = set(json.load(open(hp))["blocks"])
    print("held out of this release:", ", ".join(sorted(held)) or "nothing")
if "--only" in argv:
    k = argv.index("--only")
    only = set(argv[k + 1].split(","))
    del argv[k:k + 2]
src, out_dir = argv[0], argv[1]
apps_in = argv[2:5]
s = open(src, encoding="utf-8").read()
if 'id="forge-bi-meta"' in s:
    raise SystemExit("give the 643 lean page (it carries no apps)")
if 'pass:"643"' not in s:
    raise SystemExit("this is not the 643 page")


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
rep('window.CD_BUILD={date:"2026-10-21",pass:"643",stamp:"9s75"};', 'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP))
rep('<span class="build">Build 643 · 9s75</span>', '<span class="build">Build %s · %s</span>' % (PASS, STAMP), 2)

# 2. THE SHARED MODULES, UP TO DATE
shared = load("shared_swap", os.path.join("..", "shared_swap.py"))
s = shared.swap(s, "the Forge")

# 3. THE TEXT PATCHES OF THIS PASS
for pf in sorted(glob.glob(os.path.join(HERE, "patches_*.json"))):
    key = os.path.basename(pf)[len("patches_"):-len(".json")]
    if only is not None and key not in only:
        continue
    for p in json.load(open(pf, encoding="utf-8")):
        rep(p["old"], p["new"], p.get("count", 1))
    print("patches:", os.path.basename(pf))


# 4. THE SHARED MODULES THIS PASS ADDS, AND ITS BLOCKS
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
        out.append("<!-- PASS 644 · " + key + " -->\n" + t)
    return out


inc = []
ip = os.path.join(HERE, "include.json")
for name in (json.load(open(ip))["shared"] if os.path.exists(ip) else []):
    t = shared.include(name)
    if re.search(r"<script[^>]+src=[\"']https?://", t):
        raise SystemExit(name + ": loads a script from outside, which the Forge never does")
    inc.append("<!-- PASS 644 · the shared " + name + " -->\n" + t)
k = s.rfind("</body>")
s = s[:k] + "\n" + "\n".join(inc + blocks("blocks")) + "\n" + s[k:]


def boot_map(t):
    """The loading page's bar: where each of the page's scripts begins, in thousandths of the page (as pass 643)."""
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
open(os.path.join(out_dir, "the_forge_644_lean.html"), "w", encoding="utf-8").write(lean)
print("lean", len(lean.encode("utf-8")), hashlib.sha256(lean.encode("utf-8")).hexdigest())
if not apps_in:
    sys.exit(0)


# 5. THE FULL PAGE: the apps it carries (as passes 632 to 643)
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
full = boot_map(lean[:k] + "\n<!-- PASS 644 · the apps the Forge carries (lean copies), and its own page -->\n" + meta_block + "\n" + "\n".join(blocks_out) + "\n" + lean[k:])
open(os.path.join(out_dir, "the_forge.html"), "w", encoding="utf-8").write(full)
print("full", len(full.encode("utf-8")), hashlib.sha256(full.encode("utf-8")).hexdigest())
for m in metas:
    print("  carries", m["title"], m["version"], m["size"], "bytes,", m["gz"], "compressed")
