"""Pass 638 of the Forge: its Tabula's paragraphs run on across pages, a note no longer lays out the whole thesis
again (R128, by Inkwell 7.45's recipe), and Tabula keeps its raised pages and its 3D notes key when it stands alone
(R129), and its footnotes stand at each page's foot as Word sets them (R130, by Inkwell 7.48's recipe). The full page
carries Ingenium 5.5, Carpe Diem 1056 and Inkwell 7.48.

The owner's words (18 October 2026), asked whether Inkwell's newer Tabula improvements should go into the Tabula of
Ingenium, the Forge and Carpe Diem: "Yes, in these releases." "Inkwell has newer version, please make sure that Ingenium
and the Forge are updated." And: "Why does Tabula look flat and have this small gap between the pages, please restore
Tabula's look." (The picture was a test photograph of Tabula opened by itself; in the Forge its pages are drawn as
before.) "Inkwell's newest build is 7pv48, please update the Forge and Ingenium. I also want you to apply the new
footnotes addition to all of the other Tabula to keep full parity across Tabula." The patches are Ingenium's and Carpe
Diem's own: source/build/apps/tabula_flow_patch.py, tabula_look_patch.py and tabula_notes_patch.py.

And R132, room to grow ("I want for the local storage limits for all of my apps to be expanded please."): its Tabula
autosaves up to 256 MB in the larger store and leaves the small store to the desk (tabula_room_patch.py), and the
Forge's desk, when the small store refuses it, is kept in the larger store and opens from there (cd_room_patch.py).

usage:
  forge638.py FORGE637_LEAN.html OUT_DIR
      writes OUT_DIR/the_forge_638_lean.html: the Forge 638 page that carries no apps (Ingenium carries this one)
  forge638.py FORGE637_LEAN.html OUT_DIR INGENIUM_LEAN.html CARPE_DIEM.html INKWELL.html
      also writes OUT_DIR/the_forge.html: the full page, carrying Ingenium (lean), Carpe Diem and Inkwell, and its own
      lean page as its copy of itself (the same way as passes 632 to 637)."""
import base64, gzip, hashlib, json, os, re, sys

STAMP, PASS, DATE = "9s70", "638", "2026-10-18"
src, out_dir = sys.argv[1], sys.argv[2]
apps_in = sys.argv[3:6]
s = open(src, encoding="utf-8").read()
if 'id="forge-bi-meta"' in s:
    raise SystemExit("give the 637 lean page (it carries no apps)")
if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude\.ai", s[:20000]):
    raise SystemExit("the 637 page carries a script from outside that does not belong")


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit("expected %d, found %d: %r" % (count, n, a[:120]))
    s = s.replace(a, b)


# 1. THE BUILD STAMP
rep('window.CD_BUILD={date:"2026-10-18",pass:"637",stamp:"9s69"};',
    'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP))

# 2. ITS TABULA: PARAGRAPHS RUN ON, A NOTE IS PLACED IN A MOMENT, AND THE RAISED PAGES TRAVEL WITH IT. The same patches
#    as Ingenium 5.5 and Carpe Diem 1056, on the Tabula of 635 (R124 and R127)
import importlib.util as _ilu


def _load(name):
    sp = _ilu.spec_from_file_location(name, os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "build", "apps", name + ".py")))
    md = _ilu.module_from_spec(sp); sp.loader.exec_module(md)
    return md


_tm = re.search(r'(<script type="text/plain" id="cd-src-tabula">)([A-Za-z0-9+/=\s]+)(</script>)', s)
if not _tm or len(re.findall(r'id="cd-src-tabula"', s)) != 1:
    raise SystemExit("the Forge's Tabula was not found once")
_tab = base64.b64decode(_tm.group(2).strip()).decode("utf-8")
if "R127-TABULA-THESIS" not in _tab:
    raise SystemExit("the Forge's Tabula does not carry the thesis patch")
_tab = _load("tabula_room_patch").patch(_load("tabula_notes_patch").patch(_load("tabula_look_patch").patch(_load("tabula_flow_patch").patch(_tab))))
s = s[:_tm.start(2)] + base64.b64encode(_tab.encode("utf-8")).decode("ascii") + s[_tm.end(2):]

# 2b. ROOM TO GROW (R132): a desk the small store refuses is kept in the larger store, and opens from there
s = _load("cd_room_patch").patch(s)

# 3. THE TOUR SAYS SO, in the card on the five apps, after pass 635's sentence, in English and in French
rep("in the browser's larger store, so it is not lost.\",",
    "in the browser's larger store, so it is not lost. A paragraph runs on to the next page, as in Word, so no page ends in "
    "a blank gap, and a footnote is placed in a moment, even in a thesis.\",")
rep("long document est gardé dans la plus grande réserve du navigateur, pour qu’il ne se perde pas.\",",
    "long document est gardé dans la plus grande réserve du navigateur, pour qu’il ne se perde pas. Un paragraphe se "
    "poursuit sur la page suivante, comme dans Word, si bien qu’aucune page ne finit sur un blanc, et une note de bas de "
    "page se place en un instant, même dans une thèse.\",")

# 4. WHAT EARLIER PASSES MADE IS STILL THERE: the Mac kits wait for an Intel start under Rosetta (636), and the help level
#    keys are raised (637)
_pm = re.search(r'<script id="cd-pkg-src" type="text/plain">(b64:[A-Za-z0-9+/=]+)</script>', s)
if not _pm or "sleep 12" in json.loads(base64.b64decode(_pm.group(1)[4:]).decode("utf-8"))["mac"]["__APP_TITLE__ for Mac/Mac project/.github/workflows/build-mac-app.yml"]:
    raise SystemExit("the Forge's Mac kit does not carry the start check of 636")
if s.count('<style id="cd-637-help-keys">') != 1:
    raise SystemExit("the Forge's help level keys of 637 are missing")

lean = s
os.makedirs(out_dir, exist_ok=True)
open(os.path.join(out_dir, "the_forge_638_lean.html"), "w", encoding="utf-8").write(lean)
print("lean", len(lean.encode("utf-8")), hashlib.sha256(lean.encode("utf-8")).hexdigest())
if not apps_in:
    sys.exit(0)


# 5. THE APPS IT CARRIES (the full page only), each checked here as it goes in, as in passes 632 to 637
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
full = lean[:k] + "\n<!-- PASS 638 · the apps the Forge carries (lean copies), and its own page -->\n" + meta_block + "\n" + "\n".join(blocks) + "\n" + lean[k:]
open(os.path.join(out_dir, "the_forge.html"), "w", encoding="utf-8").write(full)
print("full", len(full.encode("utf-8")), hashlib.sha256(full.encode("utf-8")).hexdigest())
for m in metas:
    print("  carries", m["title"], m["version"], m["size"], "bytes,", m["gz"], "compressed")
