"""Pass 637 of the Forge: the help level keys ("First day", "Finding my way", "At ease") are raised and move like every
other key in the Forge. Nothing else in the Forge changes but its build stamp; the full page carries the same apps as 636
(Ingenium 5.4, Carpe Diem 1055, Inkwell 7.45).

The owner's words (18 October 2026): "I want you to make the First day, Finding your way and the at ease buttons 3D and
animated to match the rest of the app on the Forge [...] it looks weird being so flat against the rest of the app."

usage:
  forge637.py FORGE636_LEAN.html OUT_DIR
      writes OUT_DIR/the_forge_637_lean.html: the Forge 637 page that carries no apps (Ingenium carries this one)
  forge637.py FORGE636_LEAN.html OUT_DIR INGENIUM_LEAN.html CARPE_DIEM.html INKWELL.html
      also writes OUT_DIR/the_forge.html: the full page, carrying Ingenium (lean), Carpe Diem and Inkwell, and its own
      lean page as its copy of itself (the same way as passes 632 to 636)."""
import base64, gzip, hashlib, json, os, re, sys

STAMP, PASS, DATE = "9s69", "637", "2026-10-18"
src, out_dir = sys.argv[1], sys.argv[2]
apps_in = sys.argv[3:6]
s = open(src, encoding="utf-8").read()
if 'id="forge-bi-meta"' in s:
    raise SystemExit("give the 636 lean page (it carries no apps)")
if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude\.ai", s[:20000]):
    raise SystemExit("the 636 page carries a script from outside that does not belong")


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit("expected %d, found %d: %r" % (count, n, a[:120]))
    s = s.replace(a, b)


# 1. THE BUILD STAMP
rep('window.CD_BUILD={date:"2026-10-18",pass:"636",stamp:"9s68"};',
    'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP))

# 2a. ITS TABULA STILL HOLDS A THESIS (since 635: source/build/apps/tabula_big_patch.py)
_tm = re.search(r'(<script type="text/plain" id="cd-src-tabula">)([A-Za-z0-9+/=\s]+)(</script>)', s)
if not _tm or "R127-TABULA-THESIS" not in base64.b64decode(_tm.group(2).strip()).decode("utf-8"):
    raise SystemExit("the Forge's Tabula does not carry the thesis patch")

# 2b. ITS MAC KITS STILL WAIT FOR AN INTEL START UNDER ROSETTA (since 636: ../mac_start_check.py)
_pm = re.search(r'<script id="cd-pkg-src" type="text/plain">(b64:[A-Za-z0-9+/=]+)</script>', s)
if not _pm or "sleep 12" in json.loads(base64.b64decode(_pm.group(1)[4:]).decode("utf-8"))["mac"]["__APP_TITLE__ for Mac/Mac project/.github/workflows/build-mac-app.yml"]:
    raise SystemExit("the Forge's Mac kit does not carry the start check of 636")

# 3. THE HELP LEVEL KEYS, RAISED AND ANIMATED. Pass 9s62's chooser ("How much help:") drew its three choices as flat
#    outlined pills, the one control in the Forge with no relief. They now wear the Forge's own key: the face, rim and
#    relief of its design tokens (--fk-face, --fk-rim, --fk-key and its raised and pressed states), so they follow day,
#    night, the folio dress and the flat setting with every other key. A key lifts under the pointer, sinks when pressed,
#    and the chosen level is the filled key (the accent, as a primary key) that settles into place with a small spring.
#    The spring moves the key's scale, not its transform, so it still shows under the pointer while the lift holds.
#    Motion follows the Forge's own setting (data-motion="minimal") and the device's reduced-motion preference.
#    The selectors carry :not(#fk-a):not(#fk-b), the Forge's own way (9s58) of standing above the older sheets' button
#    rules (cd-jewel-css sets every button's movement under #cd-scroll), so the movement here is the one that applies.
KEYS = """<style id="cd-637-help-keys">
/* 637 · THE HELP LEVEL KEYS, RAISED AND ANIMATED LIKE EVERY OTHER KEY IN THE FORGE */
html body.forge-app .fg-lv-row.fg-lv-row{gap:10px 7px !important;padding:2px 0 4px}
html body.forge-app .fg-lv.fg-lv:not(#fk-a):not(#fk-b){background:var(--fk-face,#F7F8FA) !important;border:1px solid var(--fk-rim,rgba(23,87,122,.26)) !important;color:var(--fk-ink,#121619) !important;padding:5px 12px !important;box-shadow:var(--fk-key,inset 0 -1.5px 0 rgba(10,30,46,.16),0 2px 0 rgba(10,30,46,.30),0 4px 5px rgba(10,30,46,.20),0 9px 14px rgba(10,30,46,.13)) !important;transition:transform .1s cubic-bezier(.34,1.35,.64,1),box-shadow .12s,border-color .12s,background-color .16s,color .16s !important;-webkit-tap-highlight-color:transparent;will-change:transform}
html body.forge-app .fg-lv.fg-lv[aria-pressed="true"]:not(#fk-a):not(#fk-b){background:var(--accent,#17577A) !important;border-color:var(--fk-primary-rim,var(--accent,#17577A)) !important;color:var(--fk-on-accent,#F4EFE4) !important;text-shadow:0 1px 1px rgba(0,0,0,.25);animation:fg637-settle .34s cubic-bezier(.34,1.35,.64,1) 1}
html body.forge-app:where(:not([data-motion="minimal"])) .fg-lv.fg-lv:not(#fk-a):not(#fk-b):where(:not(:disabled)):hover{transform:translateY(-2px) !important;box-shadow:var(--fk-key-up,inset 0 -1.5px 0 rgba(10,30,46,.16),0 3px 0 rgba(10,30,46,.30),0 6px 8px rgba(10,30,46,.22),0 13px 20px rgba(10,30,46,.15)) !important;border-color:var(--fk-rim-hi,rgba(23,87,122,.40)) !important}
html body.forge-app .fg-lv.fg-lv:not(#fk-a):not(#fk-b):not(:disabled):active{transform:translateY(1px) !important;box-shadow:var(--fk-key-down,inset 0 2px 5px rgba(10,30,46,.24),0 1px 1px rgba(10,30,46,.25)) !important;transition-duration:.05s !important}
@keyframes fg637-settle{0%{scale:.95}55%{scale:1.04}100%{scale:1}}
html body.forge-app[data-motion="minimal"] .fg-lv.fg-lv:not(#fk-a):not(#fk-b){animation:none !important;transition:none !important;transform:none !important}
@media (prefers-reduced-motion:reduce){html body.forge-app .fg-lv.fg-lv:not(#fk-a):not(#fk-b){animation:none !important;transition:none !important;transform:none !important}}
</style>"""
if "cd-637-help-keys" in s or "cd-9s62-guidance-css" not in s:
    raise SystemExit("the help keys: already done, or the chooser's style is missing")
k = s.rfind("</body>")
s = s[:k] + KEYS + "\n" + s[k:]

lean = s
os.makedirs(out_dir, exist_ok=True)
open(os.path.join(out_dir, "the_forge_637_lean.html"), "w", encoding="utf-8").write(lean)
print("lean", len(lean.encode("utf-8")), hashlib.sha256(lean.encode("utf-8")).hexdigest())
if not apps_in:
    sys.exit(0)


# 4. THE APPS IT CARRIES (the full page only), each checked here as it goes in, as in passes 632 to 636
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
full = lean[:k] + "\n<!-- PASS 637 · the apps the Forge carries (lean copies), and its own page -->\n" + meta_block + "\n" + "\n".join(blocks) + "\n" + lean[k:]
open(os.path.join(out_dir, "the_forge.html"), "w", encoding="utf-8").write(full)
print("full", len(full.encode("utf-8")), hashlib.sha256(full.encode("utf-8")).hexdigest())
for m in metas:
    print("  carries", m["title"], m["version"], m["size"], "bytes,", m["gz"], "compressed")
