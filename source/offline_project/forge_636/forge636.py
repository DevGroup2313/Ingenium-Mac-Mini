"""Pass 636 of the Forge: it carries Carpe Diem 1055 (whose Tabula holds a thesis of 100,000 words and whose mini Forge
edits Carpe Diem alone), Inkwell 7.45, and Ingenium 5.4, which carries both. Nothing else in the Forge changes: its own
Tabula has held a thesis since 635, its build stamp moves on, the Mac recipe in its kits waits for an Intel start under
Rosetta, and the full page carries the new Carpe Diem, Ingenium and Inkwell (7.45).

The owner's words (18 October 2026), asked whether the demos and the copies inside Ingenium and the Forge should have
pass 1055 too: "Yes, all of them." And: "Inkwell is now on version 7.45, please update the Forge and Ingenium with the
latest version. Also the Forge's builds keep on failing on GitHub, please fix that."

usage:
  forge636.py FORGE635_LEAN.html OUT_DIR
      writes OUT_DIR/the_forge_636_lean.html: the Forge 636 page that carries no apps (Ingenium carries this one)
  forge636.py FORGE635_LEAN.html OUT_DIR INGENIUM_LEAN.html CARPE_DIEM.html INKWELL.html
      also writes OUT_DIR/the_forge.html: the full page, carrying Ingenium (lean), Carpe Diem and Inkwell, and its own
      lean page as its copy of itself (the same way as passes 632 to 635)."""
import base64, gzip, hashlib, json, os, re, sys

STAMP, PASS, DATE = "9s68", "636", "2026-10-18"
src, out_dir = sys.argv[1], sys.argv[2]
apps_in = sys.argv[3:6]
s = open(src, encoding="utf-8").read()
if 'id="forge-bi-meta"' in s:
    raise SystemExit("give the 635 lean page (it carries no apps)")
if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude\.ai", s[:20000]):
    raise SystemExit("the 635 page carries a script from outside that does not belong")


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit("expected %d, found %d: %r" % (count, n, a[:120]))
    s = s.replace(a, b)


# 1. THE BUILD STAMP
rep('window.CD_BUILD={date:"2026-10-18",pass:"635",stamp:"9s67"};',
    'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP))

# 2. ITS TABULA STILL HOLDS A THESIS (since 635: source/build/apps/tabula_big_patch.py)
_tm = re.search(r'(<script type="text/plain" id="cd-src-tabula">)([A-Za-z0-9+/=\s]+)(</script>)', s)
if not _tm or "R127-TABULA-THESIS" not in base64.b64decode(_tm.group(2).strip()).decode("utf-8"):
    raise SystemExit("the Forge's Tabula does not carry the thesis patch")

# 3. THE MAC KIT BUILDS ON GITHUB (the owner's word, 18 October 2026: "the Forge's builds keep on failing on GitHub, please
#    fix that"). The Mac recipe in every kit the Forge makes asked the app's page server once, 12 seconds after it opened the
#    app as Intel; under Rosetta the first answer can come later (16 seconds for The Forge 635), so a working app failed its
#    build. The check now waits up to 40 seconds (../mac_start_check.py), in the recipe and in its copy to paste.
import importlib.util as _ilu
_ms = _ilu.spec_from_file_location("mac_start_check", os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "mac_start_check.py")))
_msm = _ilu.module_from_spec(_ms); _ms.loader.exec_module(_msm)
_pm = re.search(r'(<script id="cd-pkg-src" type="text/plain">)(b64:[A-Za-z0-9+/=]+)(</script>)', s)
if not _pm:
    raise SystemExit("the Forge's kits (cd-pkg-src) not found")
_pkg = json.loads(base64.b64decode(_pm.group(2)[4:]).decode("utf-8"))
for _n in ("__APP_TITLE__ for Mac/Mac project/.github/workflows/build-mac-app.yml", "__APP_TITLE__ for Mac/GITHUB_WORKFLOW_paste_this.txt"):
    _pkg["mac"][_n], _k = _msm.fix(_pkg["mac"][_n])
    if _k != 1:
        raise SystemExit("the Mac start check in %s (%d)" % (_n, _k))
_raw = "b64:" + base64.b64encode(json.dumps(_pkg, ensure_ascii=False, separators=(",", ":")).encode("utf-8")).decode("ascii")
s = s[:_pm.start(2)] + _raw + s[_pm.end(2):]

lean = s
os.makedirs(out_dir, exist_ok=True)
open(os.path.join(out_dir, "the_forge_636_lean.html"), "w", encoding="utf-8").write(lean)
print("lean", len(lean.encode("utf-8")), hashlib.sha256(lean.encode("utf-8")).hexdigest())
if not apps_in:
    sys.exit(0)


# 4. THE APPS IT CARRIES (the full page only), each checked here as it goes in, as in passes 632 to 635
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
full = lean[:k] + "\n<!-- PASS 636 · the apps the Forge carries (lean copies), and its own page -->\n" + meta_block + "\n" + "\n".join(blocks) + "\n" + lean[k:]
open(os.path.join(out_dir, "the_forge.html"), "w", encoding="utf-8").write(full)
print("full", len(full.encode("utf-8")), hashlib.sha256(full.encode("utf-8")).hexdigest())
for m in metas:
    print("  carries", m["title"], m["version"], m["size"], "bytes,", m["gz"], "compressed")
