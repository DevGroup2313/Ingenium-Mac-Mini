"""Pass 635 of the Forge: it carries Inkwell 7.44 and Ingenium 5.3, and its Tabula holds a thesis of 100,000 words by
Inkwell 7.44's recipe (the patch Ingenium 5.3 carries). Nothing else in the Forge changes: its build stamp moves on, and
the full page carries the new Inkwell and the new Ingenium.

The owner's words (18 October 2026): "finish with my other requests for Ingenium and the Forge. I want them updated with
the latest Inkwell app and I want to install them their latest versions."

usage:
  forge635.py FORGE634_LEAN.html OUT_DIR
      writes OUT_DIR/the_forge_635_lean.html: the Forge 635 page that carries no apps (Ingenium carries this one)
  forge635.py FORGE634_LEAN.html OUT_DIR INGENIUM_LEAN.html CARPE_DIEM.html INKWELL.html
      also writes OUT_DIR/the_forge.html: the full page, carrying Ingenium (lean), Carpe Diem and Inkwell, and its own
      lean page as its copy of itself (the same way as passes 632 to 634)."""
import base64, gzip, hashlib, json, os, re, sys

STAMP, PASS, DATE = "9s67", "635", "2026-10-18"
src, out_dir = sys.argv[1], sys.argv[2]
apps_in = sys.argv[3:6]
s = open(src, encoding="utf-8").read()
if 'id="forge-bi-meta"' in s:
    raise SystemExit("give the 634 lean page (it carries no apps)")
if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude\.ai", s[:20000]):
    raise SystemExit("the 634 page carries a script from outside that does not belong")


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit("expected %d, found %d: %r" % (count, n, a[:120]))
    s = s.replace(a, b)


# 1. THE BUILD STAMP
rep('window.CD_BUILD={date:"2026-10-18",pass:"634",stamp:"9s66"};',
    'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP))

# 2. TABULA HOLDS A THESIS OF 100,000 WORDS, by Inkwell 7.44's recipe (the same patch as Ingenium 5.3:
#    source/build/apps/tabula_big_patch.py), in the Tabula the Forge carries
import importlib.util as _ilu
_tb = _ilu.spec_from_file_location("tabula_big_patch", os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "build", "apps", "tabula_big_patch.py")))
_tbm = _ilu.module_from_spec(_tb); _tb.loader.exec_module(_tbm)
_tm = re.search(r'(<script type="text/plain" id="cd-src-tabula">)([A-Za-z0-9+/=\s]+)(</script>)', s)
if not _tm:
    raise SystemExit("no Tabula in the Forge")
_tab = _tbm.patch(base64.b64decode(_tm.group(2).strip()).decode("utf-8"))
s = s[:_tm.start(2)] + base64.b64encode(_tab.encode("utf-8")).decode("ascii") + s[_tm.end(2):]

# 3. THE TOUR SAYS SO, in the card on the five apps, in English and in French
rep("kept here so you can see what the kind of thing you are making actually is.\",",
    "kept here so you can see what the kind of thing you are making actually is. Tabula holds a thesis of 100,000 words: "
    "a keystroke is answered at once, because only the pages an edit moves are laid out again, and a long document is kept "
    "in the browser's larger store, so it is not lost.\",")
rep("pour que vous voyiez ce qu’est vraiment le genre de chose que vous faites.\",",
    "pour que vous voyiez ce qu’est vraiment le genre de chose que vous faites. Tabula tient une thèse de 100 000 mots : "
    "chaque touche frappée s’affiche aussitôt, car seules les pages qu’une modification déplace sont remises en page, et un "
    "long document est gardé dans la plus grande réserve du navigateur, pour qu’il ne se perde pas.\",")

lean = s
os.makedirs(out_dir, exist_ok=True)
open(os.path.join(out_dir, "the_forge_635_lean.html"), "w", encoding="utf-8").write(lean)
print("lean", len(lean.encode("utf-8")), hashlib.sha256(lean.encode("utf-8")).hexdigest())
if not apps_in:
    sys.exit(0)


# 2. THE APPS IT CARRIES (the full page only), each checked here as it goes in, as in passes 632 and 633
def ingenium(t):
    m = re.search(r'var ING_VERSION="([0-9.]+)",ING_PAGE_DATE="([^"]*)";', t)
    if not m or "var BI={};" not in t or 'id="ing-builtin-' in t:
        raise SystemExit("Ingenium: not its lean page (a version, and no apps of its own carried)")
    return {"key": "ingenium", "title": "Ingenium", "version": m.group(1), "build": "", "date": m.group(2), "name": "ingenium.html"}


def carpediem(t):
    m = re.search(r'window\.CD_BUILD=\{date:"([^"]*)",pass:"(\d+)",stamp:"([^"]*)"', t)
    if not m or 'id="section-forge"' in t or not re.search(r"<title>[^<]*Carpe Diem", t[:400000]):
        raise SystemExit("Carpe Diem: not its page")
    return {"key": "cd", "title": "Carpe Diem", "version": m.group(2), "build": m.group(3), "date": m.group(1), "name": "carpe_diem.html"}


def inkwell(t):
    m = re.search(r"<!-- BUILD='([\d.]+)'", t[:2000])
    if not m or "Inkwell" not in t[:4000]:
        raise SystemExit("Inkwell: not its page")
    return {"key": "inkwell", "title": "Inkwell", "version": m.group(1), "build": "", "date": DATE, "name": "Inkwell.html"}


blocks, metas = [], []


def carry(meta, raw, block_id, self_copy=False):
    if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude\.ai", raw[:20000]):
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
full = lean[:k] + "\n<!-- PASS 635 · the apps the Forge carries (lean copies), and its own page -->\n" + meta_block + "\n" + "\n".join(blocks) + "\n" + lean[k:]
open(os.path.join(out_dir, "the_forge.html"), "w", encoding="utf-8").write(full)
print("full", len(full.encode("utf-8")), hashlib.sha256(full.encode("utf-8")).hexdigest())
for m in metas:
    print("  carries", m["title"], m["version"], m["size"], "bytes,", m["gz"], "compressed")
