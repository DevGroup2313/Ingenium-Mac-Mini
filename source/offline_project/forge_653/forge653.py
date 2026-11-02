"""Pass 653 of the Forge: Tabula, Abacus and Imago inside the Forge as Ingenium's are.

The owner's words: "I want the Forge to be just as capable and functional as Ingenium with the same increased
capabilities. I just want to do it all without AI." and, of the apps, "The text colours and other functions on Tabula's
ribbons do not work well. I have to keep trying multiple times for it to stick and work. [...] I want Tabula, Abacus, and
Imago to have a full audit for bugs and functionality and then I want them all fixed." Ingenium 6.8.1 fixed them
(build/apps/tabula_ribbon_patch.py, tabula_hf_patch.py, abacus_ribbon_patch.py, imago_ribbon_patch.py); the Forge's copies
had none of it. Pressed as a person presses them (rig/t_681_ribbon.js, rig/t_681_abacus.js), the Forge 652's Tabula failed
22 of 42 checks (a size always made words 48 pixels high; a colour, a highlight or bold chosen before typing did not reach
the words typed) and its Abacus 10 of 36 (Wrap, decimal places, borders and cell styles reached one cell of a range; the
last change before closing was lost). The same four patches, applied here to the Forge's copies, pass all of them.
And the Forge carries the latest Ingenium, as Ingenium carries this Forge (her words: "The Forge needs to carry the latests
version of Ingenium and vice versa").
Each carries the other's lean copy (a page that carries no apps), so the two can be made together: the lean Ingenium 6.8.9
is made from its release page (forge_649/lean_ingenium.py), this pass carries it, and Ingenium 6.8.8 is then built carrying
this pass's lean page; the lean copy of that release is the very copy carried here (checked byte for byte before release).

What it does, each change found exactly once or the pass stops:
  1. the build stamp: 653, 9s85;
  1b. Tabula, Abacus and Imago (scripts cd-src-tabula, cd-src-abacus, cd-src-slides): Ingenium 6.8.1's patches;
  2. the owner's apps this build is made with, by their fingerprints, added to those the lean page names as hers;
  3. the loading bar's map of the page's scripts made again;
  4. the full page: the apps it carries (Ingenium 6.8.9 lean, and Carpe Diem 1058 and Inkwell 7.52 as 652 carried them).
Everything else is 652's.

usage:
  forge653.py THE_FORGE_652.html OUT_DIR INGENIUM_LEAN.html
THE_FORGE_652.html is the 652 page as released: its own lean copy, Carpe Diem and Inkwell are taken from it."""
import base64, gzip, hashlib, importlib.util, json, os, re, sys

STAMP, PASS, DATE = "9s85", "653", "2026-10-28"
if len(sys.argv) != 4:
    sys.exit(__doc__)
src, out_dir, ing_path = sys.argv[1:4]
given = open(src, encoding="utf-8").read()
if 'id="forge-bi-meta"' not in given:
    raise SystemExit("give the 652 page as released (it carries its apps)")
META = json.loads(re.search(r'<script type="application/json" id="forge-bi-meta">(.*?)</script>', given, re.S).group(1))


def carried(ident):
    """an app the 652 page carries, checked against its size and fingerprint"""
    m = re.search(r'<script type="forge/b64" id="%s">([^<]*)</script>' % re.escape(ident), given)
    if not m:
        raise SystemExit("the 652 page does not carry " + ident)
    raw = gzip.decompress(base64.b64decode(m.group(1)))
    want = [a for a in META["apps"] if a["id"] == ident][0]
    if len(raw) != want["size"] or hashlib.sha256(raw).hexdigest() != want["sha256"]:
        raise SystemExit(ident + ": not the copy the 652 page names")
    return raw.decode("utf-8"), want


s, _ = carried("forge-bi-self")
cd_t, cd_m = carried("forge-bi-cd")
ink_t, ink_m = carried("forge-bi-inkwell")
ing_t = open(ing_path, encoding="utf-8").read()
if 'pass:"652"' not in s:
    raise SystemExit("this is not the 652 page")


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit("expected %d, found %d: %r" % (count, n, a[:120]))
    s = s.replace(a, b)


# 1. THE BUILD STAMP
rep('window.CD_BUILD={date:"2026-10-28",pass:"652",stamp:"9s84"};', 'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP))
rep('<span class="build">Build 652 · 9s84</span>', '<span class="build">Build %s · %s</span>' % (PASS, STAMP), 2)

# 1b. TABULA, ABACUS AND IMAGO AS INGENIUM'S ARE: Ingenium 6.8.1's own patches, read from Ingenium's sources
APPS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "build", "apps")


def patcher(name):
    sp = importlib.util.spec_from_file_location(name, os.path.join(APPS, name + ".py"))
    m = importlib.util.module_from_spec(sp)
    sp.loader.exec_module(m)
    return m.patch


for key, names in (("tabula", ("tabula_hf_patch", "tabula_ribbon_patch")), ("abacus", ("abacus_ribbon_patch",)),
                   ("slides", ("imago_ribbon_patch",))):
    found = list(re.finditer(r'(<script type="text/plain" id="cd-src-%s"[^>]*>)(.*?)(</script>)' % key, s, re.S))
    if len(found) != 1:
        raise SystemExit("cd-src-%s: found %d times" % (key, len(found)))
    m = found[0]
    page = base64.b64decode(m.group(2).strip()).decode("utf-8")
    for name in names:
        page2 = patcher(name)(page)
        if page2 == page:
            raise SystemExit("cd-src-%s: %s changed nothing" % (key, name))
        page = page2
    s = s[:m.start(2)] + base64.b64encode(page.encode("utf-8")).decode("ascii") + s[m.end(2):]
    print("cd-src-%s: %s" % (key, ", ".join(names)))

# 2. THE OWNER'S APPS THIS BUILD IS MADE WITH, beside those named before
m = re.search(r'<script type="application/json" id="forge-trust-shas">(.*?)</script>', s)
if not m or s.count('id="forge-trust-shas"') != 1:
    raise SystemExit("the fingerprints of the owner's apps were not found once")
shas = [hashlib.sha256(t.encode("utf-8")).hexdigest() for t in (ing_t, cd_t, ink_t)]
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
    mm = [min(999, int(x * 1000 / len(t))) for x in marks]
    return t.replace(mark + "[]", mark + json.dumps(mm, separators=(",", ":")), 1)


# 3. THE LOADING BAR'S MAP
lean = boot_map(s)
os.makedirs(out_dir, exist_ok=True)
open(os.path.join(out_dir, "the_forge_%s_lean.html" % PASS), "w", encoding="utf-8").write(lean)
print("lean", len(lean.encode("utf-8")), hashlib.sha256(lean.encode("utf-8")).hexdigest())

# 4. THE FULL PAGE: the apps it carries
mv = re.search(r'var ING_VERSION="([0-9.]+)",ING_PAGE_DATE="([^"]*)";', ing_t)
if not mv or "var BI={};" not in ing_t or re.search(r'id="(ing-tail:)?ing-builtin-', ing_t):
    raise SystemExit("Ingenium: not its lean page (a version, and no apps of its own carried)")
blocks_out, metas = [], []


def carry(meta, raw, block_id, self_copy=False):
    b = raw.encode("utf-8")
    z = bytearray(gzip.compress(b, 9, mtime=0))
    meta = dict(meta, id=block_id, size=len(b), sha256=hashlib.sha256(b).hexdigest(), gz=len(z))
    if self_copy:
        meta["self"] = True
    metas.append(meta)
    blocks_out.append('<script type="forge/b64" id="%s">%s</script>' % (block_id, base64.b64encode(bytes(z)).decode("ascii")))


keep = lambda mt: {k: mt[k] for k in ("key", "title", "version", "build", "date", "name")}
carry({"key": "ingenium", "title": "Ingenium", "version": mv.group(1), "build": "", "date": mv.group(2), "name": "ingenium.html"}, ing_t, "forge-bi-ingenium")
carry(keep(cd_m), cd_t, "forge-bi-cd")
carry(keep(ink_m), ink_t, "forge-bi-inkwell")
carry({"key": "forge", "title": "The Forge", "version": PASS, "build": STAMP, "date": DATE, "name": "the_forge.html"}, lean, "forge-bi-self", True)
sig = hashlib.sha256((STAMP + "|" + "|".join(x["sha256"] for x in metas)).encode()).hexdigest()[:24]
meta_block = '<script type="application/json" id="forge-bi-meta">%s</script>' % json.dumps(
    {"format": "forge-builtin", "stamp": STAMP, "sig": sig, "apps": metas}, separators=(",", ":")).replace("</", "<\\/")
k = lean.rfind("</body>")
full = boot_map(lean[:k] + "\n<!-- PASS " + PASS + " · the apps the Forge carries (lean copies), and its own page -->\n" + meta_block + "\n" + "\n".join(blocks_out) + "\n" + lean[k:])
open(os.path.join(out_dir, "the_forge.html"), "w", encoding="utf-8").write(full)
print("full", len(full.encode("utf-8")), hashlib.sha256(full.encode("utf-8")).hexdigest())
for x in metas:
    print("  carries", x["title"], x["version"], x["size"], "bytes,", x["gz"], "compressed")
