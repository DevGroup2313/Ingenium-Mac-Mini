"""Pass 647 of the Forge: Fabrica makes the apps a device installs, here on the device.

The owner's words (20 October 2026): "It was supposed to be my own personal offline GitHub and ship ready made apps on my
devices for all of my devices". Ingenium's Fabrica makes them on the device (R136 since 6.0: the APK and the IPA; R170 since
6.5: the Mac and Windows apps); the Forge's offered only its five install packages, projects for a computer or GitHub to
build. Now the Forge's Test and ship makes an Android app (APK) for the Fire tablet, an iPhone and iPad app (IPA), a Mac app
and a Windows app, signed or sealed here, with Package details, beside its five install packages and the one page and web app.

What it does, each change found exactly once or the pass stops:
  1. the build stamp: 647, 9s79;
  2. the shared modules the Forge carries whole brought up to date (shared_swap.py);
  2b. Fabrica, fresh from Ingenium 6.6's modules with the makers and the four shells (forge_fabrica_647.py), in place of the
     one pass 643 made; its frame follows the room's head (forge_fit.py);
  3. the exact text patches beside this script (patches_*.json), each found the number of times it names;
  4. the shared modules include.json names, then every block in blocks/ (name order), before </body>;
  4c. the code's own comments out, and the markup's (licence notices and markers kept; the code proved the same);
  5. the full page only: the apps it carries, as passes 632 to 646 (each as it is).

usage:
  forge647.py FORGE646_LEAN.html OUT_DIR [--only NAME[,NAME]]
  forge647.py FORGE646_LEAN.html OUT_DIR INGENIUM_LEAN.html CARPE_DIEM.html INKWELL.html
  --release leaves out the blocks held.json names (when there is one)."""
import base64, glob, gzip, hashlib, importlib.util, json, os, re, sys

STAMP, PASS, DATE = "9s79", "647", "2026-10-24"
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
    raise SystemExit("give the 646 lean page (it carries no apps)")
if 'pass:"646"' not in s:
    raise SystemExit("this is not the 646 page")


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
rep('window.CD_BUILD={date:"2026-10-24",pass:"646",stamp:"9s78"};', 'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP))
rep('<span class="build">Build 646 · 9s78</span>', '<span class="build">Build %s · %s</span>' % (PASS, STAMP), 2)

# 2. THE SHARED MODULES, UP TO DATE
shared = load("shared_swap", os.path.join("..", "shared_swap.py"))
s = shared.swap(s, "the Forge", shared.NAMES + ("chat_import_core.html", "quiet_screen.html", "permit_core.html", "open_apart.html",
                                               "code_editor_core.html", "fabrica_rooms.html", "fabrica_parts.html"))

# 2b. FABRICA, FRESH FROM INGENIUM 6.6'S MODULES, WITH THE MAKERS AND THE FOUR SHELLS (forge_fabrica_647.py), in place of the
#     one pass 643 made: it begins with Fabrica's own keeping (fabrica:state) and ends with the Forge's colours for it
_k = s.find('var K="fabrica:state"')
_a = s.rfind("<script", 0, _k)
_e = s.find('<style id="forge-fabrica-css">')
_b = s.find("</style>", _e) + len("</style>")
if s.count('var K="fabrica:state"') != 1 or s.count('<style id="forge-fabrica-css">') != 1 or not (0 <= _a < _e < _b):
    raise SystemExit("Fabrica's block was not found once")
_old = s[_a:_b]
for _id in ('"p42"', '"p43"', '"p44"', '"p45"', '"p62"', 'id="r112-css"', 'id="r114-css"', 'id="r141-css"'):
    if _old.count(_id) < 1:
        raise SystemExit("Fabrica's block lacks " + _id + ": it is not the block pass 643 made")
if 'id="ing-android-shell"' in s or "IngMac=" in s:
    raise SystemExit("the page already carries a maker or a shell")
_ff = load("forge_fabrica_647", "forge_fabrica_647.py")
s = s[:_a] + "<!-- PASS 647 · Fabrica, the offline GitHub, with no model, making the apps a device installs (Ingenium 6.6's R110, R111, R136, R170, R112, R114 and R141, made the Forge's) -->\n" + _ff.block() + s[_b:]
s = load("forge_fit", os.path.join("..", "forge_fit.py")).fabrica(s)
print("Fabrica: fresh from Ingenium's modules, with the APK, IPA, Mac and Windows makers and their shells")

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
        out.append("<!-- PASS 647 · " + key + " -->\n" + t)
    return out


inc = []
ip = os.path.join(HERE, "include.json")
for name in (json.load(open(ip))["shared"] if os.path.exists(ip) else []):
    t = shared.include(name)
    if re.search(r"<script[^>]+src=[\"']https?://", t):
        raise SystemExit(name + ": loads a script from outside, which the Forge never does")
    inc.append("<!-- PASS 647 · the shared " + name + " -->\n" + t)
k = s.rfind("</body>")
s = s[:k] + "\n" + "\n".join(inc + blocks("blocks")) + "\n" + s[k:]

# 4b. THE LICENCE AND THE OWNER'S KEYS (blocks/forge_permit.html), written in as Ingenium's build writes its own
#     (security/permits.py: only the public halves of the owner's keys, each checked)
if '/*PERMIT_LICENCE*/""' in s:
    sys.path.insert(0, os.path.normpath(os.path.join(HERE, "..", "..", "security")))
    import permits
    s, said = permits.fill(s, os.path.normpath(os.path.join(HERE, "..", "..", "licence", "LICENCE_forge.txt")))
    print(said)

# 4c. THE CODE'S OWN COMMENTS OUT, as in every edition of Ingenium (shared_swap.tidy: licence notices and markers kept, the
#     code proved the same)
s = shared.tidy(s, "the Forge")


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
open(os.path.join(out_dir, "the_forge_647_lean.html"), "w", encoding="utf-8").write(lean)
print("lean", len(lean.encode("utf-8")), hashlib.sha256(lean.encode("utf-8")).hexdigest())
if not apps_in:
    sys.exit(0)


# 5. THE FULL PAGE: the apps it carries (as passes 632 to 646)
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
full = boot_map(lean[:k] + "\n<!-- PASS 647 · the apps the Forge carries (lean copies), and its own page -->\n" + meta_block + "\n" + "\n".join(blocks_out) + "\n" + lean[k:])
open(os.path.join(out_dir, "the_forge.html"), "w", encoding="utf-8").write(full)
print("full", len(full.encode("utf-8")), hashlib.sha256(full.encode("utf-8")).hexdigest())
for m in metas:
    print("  carries", m["title"], m["version"], m["size"], "bytes,", m["gz"], "compressed")
