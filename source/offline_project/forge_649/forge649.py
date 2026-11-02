"""Pass 649 of the Forge, built from the 648 lean page (the copy of itself the 648 page carries), paired with Ingenium 6.8.4.

The owner's words (27 October 2026): "I want the seal inside of the Forge's About panel to be clickable, the same way the one
inside of Carpe Diem's About panel is"; of the seal on the apps' ribbons, "it should be all be replaced with Ingenium's app
logo, the same for the Forge [...] only the master (owner's version) has the seal or app logo in the apps ribbons"; and of
the Windows apps, "slow load" and "Not responding".

What it does, each change found exactly once or the pass stops:
  1. the build stamp: 649, 9s81;
  2. Tabula, Abacus and Imago in the Forge's page (scripts cd-src-*) wear the Forge's seal, name and colour in their Seals &
     letterheads group, watermark and signed pages, as Ingenium's copies wear Ingenium's since 6.8.1
     (../../build/apps/house_patch.py, with the Forge's seal in forge_seal.png), and their seal group says "Seals &
     letterheads" as Ingenium's does, not "Carpe Diem"; this page is the owner's own, so the seal is carried; a
     demonstration made from it takes the seal out (no seal, and "Your own");
  3. every block in blocks/ (name order), its comments taken out as in every release (shared_swap.strip_text, the code
     proved the same), before </body>: the seal in About is a key (forge_about_seal.html), and the Windows app reads the
     apps the Forge carries from scripts beside its page (forge_quick_file.html, with forge_quick_split_js.py);
  4. given the apps (a release), their fingerprints added to those the lean page names as the owner's own (forge-trust-shas);
  5. the loading bar's map of the page's scripts made again;
  6. the full page only: the apps it carries, as passes 632 to 648 (Ingenium 6.8.4's lean page, lean_ingenium.py).

usage:
  forge649.py THE_FORGE_648.html OUT_DIR [INGENIUM_LEAN.html [CARPE_DIEM.html INKWELL.html]]
THE_FORGE_648.html is the 648 page as released (its own lean copy is taken from it) or its lean page. Without Carpe Diem and
Inkwell, the ones the 648 page carries are carried again (Carpe Diem 1058 and Inkwell 7.52)."""
import base64, glob, gzip, hashlib, importlib.util, json, os, re, sys

STAMP, PASS, DATE = "9s81", "649", "2026-10-28"
HERE = os.path.dirname(os.path.abspath(__file__))
argv = sys.argv[1:]
if len(argv) not in (2, 3, 5):
    sys.exit(__doc__)
src, out_dir = argv[0], argv[1]
given = open(src, encoding="utf-8").read()


def carried(page, ident):
    """an app the full page carries, checked against its size and fingerprint"""
    meta = json.loads(re.search(r'<script type="application/json" id="forge-bi-meta">(.*?)</script>', page, re.S).group(1))
    m = re.search(r'<script type="forge/b64" id="%s">([^<]*)</script>' % re.escape(ident), page)
    if not m:
        raise SystemExit("the 648 page does not carry " + ident)
    raw = gzip.decompress(base64.b64decode(m.group(1)))
    want = [a for a in meta["apps"] if a["id"] == ident][0]
    if len(raw) != want["size"] or hashlib.sha256(raw).hexdigest() != want["sha256"]:
        raise SystemExit(ident + ": not the copy the 648 page names")
    return raw.decode("utf-8")


if 'id="forge-bi-meta"' in given:
    s = carried(given, "forge-bi-self")
    kept_cd, kept_ink = carried(given, "forge-bi-cd"), carried(given, "forge-bi-inkwell")
else:
    s, kept_cd, kept_ink = given, None, None
if 'pass:"648"' not in s or 'id="forge-bi-meta"' in s:
    raise SystemExit("this is not the 648 page or its lean page")


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
rep('window.CD_BUILD={date:"2026-10-25",pass:"648",stamp:"9s80"};', 'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP))
rep('<span class="build">Build 648 · 9s80</span>', '<span class="build">Build %s · %s</span>' % (PASS, STAMP), 2)

# 2. THE FORGE'S SEAL ON THE RIBBONS OF THE APPS IT CARRIES (the owner's own page)
HP = load("house_patch", os.path.join("..", "..", "build", "apps", "house_patch.py"))
HOUSE = {"name": "The Forge", "word": "THE FORGE", "accent": "#17577A", "tag": "",
         "png": "data:image/png;base64," + base64.b64encode(open(os.path.join(HERE, "forge_seal.png"), "rb").read()).decode("ascii")}
for key in ("tabula", "abacus", "slides"):
    m = re.search(r'(<script type="text/plain" id="cd-src-%s"[^>]*>)(.*?)(</script>)' % key, s, re.S)
    if not m:
        raise SystemExit("cd-src-%s: not found" % key)
    page = base64.b64decode(m.group(2).strip()).decode("utf-8")
    if HP.MARK in page:
        continue
    page = HP.patch(key, page, HOUSE)
    # the Forge's copies are older than Ingenium's: their seal group is still labelled with Carpe Diem's name, where
    # Ingenium's copies say what the group holds
    page, n = re.subn(r"(\b(?:lab|lb)\.style\.whiteSpace = 'nowrap'; (?:lab|lb)\.textContent = )'Carpe Diem';",
                      lambda g: g.group(1) + '((window.__APP_LANG__==="fr")?"Sceaux et en-têtes":"Seals & letterheads");', page)
    if n != 3:
        raise SystemExit("cd-src-%s: the seal group's label was found %d times" % (key, n))
    if key == "tabula":
        # the house's name stands in a sentence written for a name without an article
        if page.count("if the The Forge application is closed") != 1:
            raise SystemExit("cd-src-tabula: the warning that names the house was not found once")
        page = page.replace("if the The Forge application is closed", "if The Forge is closed")
    s = s[:m.start(2)] + base64.b64encode(page.encode("utf-8")).decode("ascii") + s[m.end(2):]
print("the carried apps: the Forge's seal, name and colour in their seal studios")

# 3. THIS PASS'S BLOCKS, their comments taken out
shared = load("shared_swap", os.path.join("..", "shared_swap.py"))
out = []
for path in sorted(glob.glob(os.path.join(HERE, "blocks", "*.html"))):
    key = os.path.basename(path)[:-5]
    t = open(path, encoding="utf-8").read()
    if re.search(r"<script[^>]+src=[\"']https?://", t):
        raise SystemExit(key + ": loads a script from outside, which the Forge never does")
    t, said = shared.strip_text(t, check=True)
    out.append("<!-- PASS " + PASS + " · " + key + " -->\n" + t.strip())
k = s.rfind("</body>")
s = s[:k] + "\n" + "\n".join(out) + "\n" + s[k:]

# 4. THE OWNER'S APPS THIS BUILD IS MADE WITH, named by their fingerprints in the lean page too, beside those named before
apps_in = argv[2:]
texts = []
if apps_in:
    ing_t = open(apps_in[0], encoding="utf-8").read()
    cd_t = open(apps_in[1], encoding="utf-8").read() if len(apps_in) == 3 else kept_cd
    ink_t = open(apps_in[2], encoding="utf-8").read() if len(apps_in) == 3 else kept_ink
    if cd_t is None or ink_t is None:
        raise SystemExit("give Carpe Diem and Inkwell, or the 648 page as released (which carries them)")
    texts = [ing_t, cd_t, ink_t]
    m = re.search(r'<script type="application/json" id="forge-trust-shas">(.*?)</script>', s)
    if not m or s.count('id="forge-trust-shas"') != 1:
        raise SystemExit("the fingerprints of the owner's apps were not found once")
    shas = [hashlib.sha256(t.encode("utf-8")).hexdigest() for t in texts]
    shas += [h for h in json.loads(m.group(1)) if h not in shas]
    s = s[:m.start(1)] + json.dumps(shas) + s[m.end(1):]


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


# 5. THE LOADING BAR'S MAP
s = boot_map(s)
lean = s
os.makedirs(out_dir, exist_ok=True)
open(os.path.join(out_dir, "the_forge_%s_lean.html" % PASS), "w", encoding="utf-8").write(lean)
print("lean", len(lean.encode("utf-8")), hashlib.sha256(lean.encode("utf-8")).hexdigest())
if not texts:
    sys.exit(0)


# 6. THE FULL PAGE: the apps it carries (as passes 632 to 648)
def ingenium(t):
    m = re.search(r'var ING_VERSION="([0-9.]+)",ING_PAGE_DATE="([^"]*)";', t)
    if not m or "var BI={};" not in t or re.search(r'id="(ing-tail:)?ing-builtin-', t):
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


ing_t, cd_t, ink_t = texts
carry(ingenium(ing_t), ing_t, "forge-bi-ingenium")
carry(carpediem(cd_t), cd_t, "forge-bi-cd")
carry(inkwell(ink_t), ink_t, "forge-bi-inkwell")
carry({"key": "forge", "title": "The Forge", "version": PASS, "build": STAMP, "date": DATE, "name": "the_forge.html"}, lean, "forge-bi-self", True)
sig = hashlib.sha256((STAMP + "|" + "|".join(m["sha256"] for m in metas)).encode()).hexdigest()[:24]
meta_block = '<script type="application/json" id="forge-bi-meta">%s</script>' % json.dumps(
    {"format": "forge-builtin", "stamp": STAMP, "sig": sig, "apps": metas}, separators=(",", ":")).replace("</", "<\\/")
k = lean.rfind("</body>")
full = boot_map(lean[:k] + "\n<!-- PASS " + PASS + " · the apps the Forge carries (lean copies), and its own page -->\n" + meta_block + "\n" + "\n".join(blocks_out) + "\n" + lean[k:])
open(os.path.join(out_dir, "the_forge.html"), "w", encoding="utf-8").write(full)
print("full", len(full.encode("utf-8")), hashlib.sha256(full.encode("utf-8")).hexdigest())
for m in metas:
    print("  carries", m["title"], m["version"], m["size"], "bytes,", m["gz"], "compressed")
