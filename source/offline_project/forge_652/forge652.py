"""Pass 652 of the Forge: Magister's card in the Forge is the Forge's own again, whenever it is made.

The owner's words (28 October 2026): "You broke something on the Forge it has the wrong Magister dock. Why is the French tutor
button amongst the other buttons inside of the Forge? the Magister page has regressed and I need you to undo this mess and
put it back please."
The Forge makes its Magister card (the Magister room, Overview) by copying Carpe Diem's Magister dock and rewriting it: the
line under the name, the key that opens the lessons, the row of tutors (the Forge's three years: HTML, CSS and JavaScript;
Python; C++) and the row of modes (Lessons, Practice, Questions, Diary, Path). It found the key and the row of tutors by two
marks Carpe Diem's own script puts on them (data-cd-magbtn, data-cd-mode) every so often; when the copy was made before
those marks were put on, the key stayed "Open Magister" and the row stayed Carpe Diem's (Proposal, Curriculum, Research
Writing, Ask the librarian, French Tutor), and the card, marked as made, was never made again. The same code is in every
build from 647 to 651; how soon the marks come depends on the device. Now the key and the row are found by their words
when the marks are not there yet, and a card already made with Carpe Diem's row or key in it is made again.
And the Forge carries the latest Ingenium, as Ingenium carries this Forge (her words: "The Forge needs to carry the latests
version of Ingenium and vice versa").
Each carries the other's lean copy (a page that carries no apps), so the two can be made together: the lean Ingenium 6.8.8
is made from its release page (forge_649/lean_ingenium.py), this pass carries it, and Ingenium 6.8.8 is then built carrying
this pass's lean page; the lean copy of that release is the very copy carried here (checked byte for byte before release).

What it does, each change found exactly once or the pass stops:
  1. the build stamp: 652, 9s84;
  1b. Magister's card: the key and the row of tutors found by their words too, and a card made wrong made again;
  2. the owner's apps this build is made with, by their fingerprints, added to those the lean page names as hers;
  3. the loading bar's map of the page's scripts made again;
  4. the full page: the apps it carries (Ingenium 6.8.8 lean, and Carpe Diem 1058 and Inkwell 7.52 as 651 carried them).
Everything else is 651's.

usage:
  forge652.py THE_FORGE_651.html OUT_DIR INGENIUM_LEAN.html
THE_FORGE_651.html is the 651 page as released: its own lean copy, Carpe Diem and Inkwell are taken from it."""
import base64, gzip, hashlib, json, os, re, sys

STAMP, PASS, DATE = "9s84", "652", "2026-10-28"
if len(sys.argv) != 4:
    sys.exit(__doc__)
src, out_dir, ing_path = sys.argv[1:4]
given = open(src, encoding="utf-8").read()
if 'id="forge-bi-meta"' not in given:
    raise SystemExit("give the 651 page as released (it carries its apps)")
META = json.loads(re.search(r'<script type="application/json" id="forge-bi-meta">(.*?)</script>', given, re.S).group(1))


def carried(ident):
    """an app the 651 page carries, checked against its size and fingerprint"""
    m = re.search(r'<script type="forge/b64" id="%s">([^<]*)</script>' % re.escape(ident), given)
    if not m:
        raise SystemExit("the 651 page does not carry " + ident)
    raw = gzip.decompress(base64.b64decode(m.group(1)))
    want = [a for a in META["apps"] if a["id"] == ident][0]
    if len(raw) != want["size"] or hashlib.sha256(raw).hexdigest() != want["sha256"]:
        raise SystemExit(ident + ": not the copy the 651 page names")
    return raw.decode("utf-8"), want


s, _ = carried("forge-bi-self")
cd_t, cd_m = carried("forge-bi-cd")
ink_t, ink_m = carried("forge-bi-inkwell")
ing_t = open(ing_path, encoding="utf-8").read()
if 'pass:"651"' not in s:
    raise SystemExit("this is not the 651 page")


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit("expected %d, found %d: %r" % (count, n, a[:120]))
    s = s.replace(a, b)


# 1. THE BUILD STAMP
rep('window.CD_BUILD={date:"2026-10-28",pass:"651",stamp:"9s83"};', 'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP))
rep('<span class="build">Build 651 · 9s83</span>', '<span class="build">Build %s · %s</span>' % (PASS, STAMP), 2)

# 1b. MAGISTER'S CARD, THE FORGE'S OWN WHENEVER IT IS MADE
rep("""    function build(){ try{
      var host=document.getElementById('magDock'); if(!host||host.getAttribute('data-built')==='1') return;""",
    """    /* 652: the key and the row of tutors are found by their words when Carpe Diem's marks are not on them yet, and a card
       made with Carpe Diem's row or key in it is made again */
    var CD_TUTOR=/(French Tutor|Tuteur de fran\u00e7ais|Ask the librarian|Research Writing)$/, CD_GO=/^(Open Magister|Ouvrir Magister)$/;
    function byText(root,re){ return [].slice.call(root.querySelectorAll('button')).filter(function(b){ return !b.classList.contains('cd-mag-mode')&&re.test((b.textContent||'').trim()); })[0]||null; }
    function build(){ try{
      var host=document.getElementById('magDock'); if(!host) return;
      if(host.getAttribute('data-built')==='1'){ if(!byText(host,CD_TUTOR)&&!byText(host,CD_GO)) return; host.removeAttribute('data-built'); }""")
rep("""      var go=d.querySelector('[data-cd-magbtn]'); if(go){""", """      var go=d.querySelector('[data-cd-magbtn]')||byText(d,CD_GO); if(go){""")
rep("""      var tutors=d.querySelector('[data-cd-mode]') && d.querySelector('[data-cd-mode]').parentElement;""",
    """      var tutors=(d.querySelector('[data-cd-mode]') && d.querySelector('[data-cd-mode]').parentElement) || (byText(d,CD_TUTOR)||{}).parentElement;""")
rep("""      if(tutors){ var sample=tutors.querySelector('[data-cd-mode]');""", """      if(tutors){ var sample=tutors.querySelector('[data-cd-mode]')||tutors.querySelector('button');""")

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
