"""Pass 642 of the Forge: Fabrica saves its five install packages one after another, each under its own name.

The owner's words (20 October 2026): "The Forge's Fabrica seems to be working but it is glitching somewhat and mixing up
the packages. The Mac's package has the Fire Tablet's zip install. The mac mini holds the Iphone and Ipad, only the windows
actually holds the right folder, the Fire Tablet shows the mac build install." And, asked whether to release the Forge with
the fix: "yes, please release the Forge now with that fix."

The cause: Fabrica saved the five packages at the same moment, and the desktop shells keep the place chosen in one save
dialog slot, so names and contents crossed. Fabrica is now Ingenium 6.0's (forge_fabrica.py: each save waits for the one
before it, and every ship card is chosen by pressing it, with its own Make and save key, Releases and an app menu that can
remove an app), with the frame that follows the room's head (forge_fit.py, as in 641). Nothing else in the Forge changes but
its build stamp.

usage:
  forge642.py FORGE641_LEAN.html OUT_DIR
      writes OUT_DIR/the_forge_642_lean.html: the Forge 642 page that carries no apps (Ingenium carries this one)
  forge642.py FORGE641_LEAN.html OUT_DIR INGENIUM_LEAN.html CARPE_DIEM.html INKWELL.html
      also writes OUT_DIR/the_forge.html: the full page, carrying Ingenium (lean), Carpe Diem and Inkwell, and its own
      lean page as its copy of itself (as passes 632 to 641)."""
import base64, gzip, hashlib, importlib.util, json, os, re, sys

STAMP, PASS, DATE = "9s74", "642", "2026-10-20"
HERE = os.path.dirname(os.path.abspath(__file__))
src, out_dir = sys.argv[1], sys.argv[2]
apps_in = sys.argv[3:6]
s = open(src, encoding="utf-8").read()
if 'id="forge-bi-meta"' in s:
    raise SystemExit("give the 641 lean page (it carries no apps)")
if 'pass:"641"' not in s:
    raise SystemExit("this is not the 641 page")


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
rep('window.CD_BUILD={date:"2026-10-19",pass:"641",stamp:"9s73"};',
    'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP))
rep('<span class="build">Build 641 · 9s73</span>', '<span class="build">Build %s · %s</span>' % (PASS, STAMP), 2)

# 1d. EVERY SAVE IN THE FORGE WAITS FOR THE ONE BEFORE IT. In the Mac and Windows apps the bytes go to the native save
#     dialog, which keeps the place chosen in one slot; the Editor's "All six" asked for its six saves 450 milliseconds
#     apart, so a slow dialog could hand one package's place to another. cdSaveBytesQueued(name, mime, bytes) is the queue
#     (a promise, or null where there is no native dialog); cdSaveBytesToHost uses it, and so does Fabrica (forge_fabrica.py).
rep("""      var p = api.save_file(String(name), String(mime || 'application/octet-stream'), btoa(bin));
      if (p && p.then) {
        p.then(function (ok) { if (!ok) cdSaveBytesAnchor(name, mime, bytes); },
               function () { cdSaveBytesAnchor(name, mime, bytes); });
      }
      return true;""", """      var b64 = btoa(bin);
      window.__cdSaveQ = (window.__cdSaveQ || Promise.resolve()).then(function () {
        return Promise.resolve(api.save_file(String(name), String(mime || 'application/octet-stream'), b64))
          .then(function (ok) { if (!ok) cdSaveBytesAnchor(name, mime, bytes); },
                function () { cdSaveBytesAnchor(name, mime, bytes); });
      });
      return true;""")
rep("function cdSaveBytesAnchor(name, mime, bytes) {", """/* 642: the same queue, for a caller that waits for its save to finish */
window.cdSaveBytesQueued = function (name, mime, bytes) {
  var api = window.pywebview && window.pywebview.api;
  if (!(api && api.save_file)) return null;
  cdSaveBytesToHost(name, mime, bytes);
  return window.__cdSaveQ;
};
function cdSaveBytesAnchor(name, mime, bytes) {""")

# 2. FABRICA, AS INGENIUM 6.0 HAS IT: the block of pass 639 (as 641 left it) gives way to a fresh one
a = s.find("<!-- PASS 639 · Fabrica, her own offline GitHub")
b = s.find('<style id="forge-fabrica-css">', a)
b = s.find("</style>", b) + len("</style>")
if a < 0 or b < a or s.count("<!-- PASS 639 · Fabrica, her own offline GitHub") != 1:
    raise SystemExit("Fabrica's block was not found once")
ff = load("forge_fabrica", os.path.join("..", "forge_639", "forge_fabrica.py"))
s = s[:a] + "<!-- PASS 642 · Fabrica, the offline GitHub, with no model (Ingenium 6.0's R110, R111, R112 and R114, made the Forge's) -->\n" + ff.block() + s[b:]
# the frame follows the room's head while it moves, as in 641
s = load("forge_fit", os.path.join("..", "forge_fit.py")).fabrica(s)
if "saveQ=Promise.resolve()" not in s or "window.__fbFollow" not in s or "window.cdSaveBytesQueued" not in s:
    raise SystemExit("the new Fabrica is not in the page")

lean = s
os.makedirs(out_dir, exist_ok=True)
open(os.path.join(out_dir, "the_forge_642_lean.html"), "w", encoding="utf-8").write(lean)
print("lean", len(lean.encode("utf-8")), hashlib.sha256(lean.encode("utf-8")).hexdigest())
if not apps_in:
    sys.exit(0)


# 3. THE APPS IT CARRIES (the full page only), each checked here as it goes in, as in passes 632 to 641
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
full = lean[:k] + "\n<!-- PASS 642 · the apps the Forge carries (lean copies), and its own page -->\n" + meta_block + "\n" + "\n".join(blocks) + "\n" + lean[k:]
open(os.path.join(out_dir, "the_forge.html"), "w", encoding="utf-8").write(full)
print("full", len(full.encode("utf-8")), hashlib.sha256(full.encode("utf-8")).hexdigest())
for m in metas:
    print("  carries", m["title"], m["version"], m["size"], "bytes,", m["gz"], "compressed")
