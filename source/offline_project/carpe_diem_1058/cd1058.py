"""Pass 1058 of Carpe Diem: the mini Forge is The Forge 641.

The owner's words (19 October 2026): "I also need you to update the mini Forge inside of Carpe Diem to 640. Update
everything accordingly so that I can finally update my apps properly." And then: "The Forge 641 needs to contain
Ingenium 5.9 and Ingenium 5.9 should contain the Forge 641. And both The Forge 641 and Ingenium 5.9 should have Carpe
Diem 1058 which has the mini Forge 641". There is no circle: the mini Forge is made from The Forge 641's lean page, which
carries no apps, and the full Forge 641 then carries this Carpe Diem.

1. The mini Forge is made again, from The Forge 641 (lean: it carries no apps), by pass 1057's recipe: the device
   packages' source is left out (the app around it builds them), Tabula is left out, Abacus, Slides, Scriba and Fontes
   are the short pages that send you to Carpe Diem's own side buttons, and what rides in it is taken whole from the 1057
   mini Forge: the French layer (1052), the guard against Tabula (1053), the rule that it edits Carpe Diem alone (1055,
   given more weight in 1057) and its slim mark. The Forge 641 differs from 639 only in its build stamp, so the new mini
   Forge is checked to differ from the old one only there.
2. Pass 1057's other work is already in the page (the hand-over on loading, the keeper asked only on a website, no false
   alarm in a sealed frame); nothing of it is done twice.
3. The build is shown without its date (the owner's words: "remove the dates from the apps, keep only the build number"):
   "Build 1058 · 528171058 · Committee demo", and in the mini Forge "Build 641 · 9s73" (no_build_dates.py).
4. The build stamp, the builders (the owner's edition: each package carries 1058), and the page's photograph of itself.

usage: cd1058.py THE_FORGE_641_LEAN.html IN_1057.html OUT.html"""
import base64, gzip, hashlib, json, os, plistlib, re, sys, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
lean_path, src, dst = sys.argv[1], sys.argv[2], sys.argv[3]
s = open(src, encoding="utf-8").read()
lean = open(lean_path, encoding="utf-8").read()
DATE, PASS, STAMP = "2026-10-19", "1058", "528171058"
FORGE_OLD = 'CD_BUILD={date:"2026-10-18",pass:"639",stamp:"9s71"}'
FORGE_NEW = 'CD_BUILD={date:"2026-10-19",pass:"641",stamp:"9s73"}'


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


selfsrc = load("selfsrc", os.path.join(HERE, "..", "carpe_diem_1052", "selfsrc.py"))
nbd = load("no_build_dates", os.path.join(HERE, "..", "no_build_dates.py"))
ff = load("forge_fit", os.path.join(HERE, "..", "forge_fit.py"))


def block(page, bid):
    """The whole element (tag, body and end) with this id, found exactly once."""
    ms = list(re.finditer(r'<(script|style)\b[^>]*\sid="%s"[^>]*>' % re.escape(bid), page))
    if len(ms) != 1:
        raise SystemExit("%s: found %d times" % (bid, len(ms)))
    m = ms[0]
    end = page.find("</%s>" % m.group(1), m.end())
    if end < 0:
        raise SystemExit("%s: no end" % bid)
    return m.start(), end + len("</%s>" % m.group(1))


if 'CD_BUILD={date:"2026-10-19",pass:"1057",stamp:"528171057"' not in s:
    raise SystemExit("this is not Carpe Diem 1057")

# 1. THE MINI FORGE, MADE AGAIN FROM THE FORGE 641
if FORGE_NEW not in lean:
    raise SystemExit("this is not The Forge 641")
if re.search(r'<script type="text/plain" id="cd-src-(carpe|ingenium|inkwell)"', lean):
    raise SystemExit("this Forge carries apps: the lean page is wanted")
pm = re.search(r'(<script id="cd-forge-pack" type="text/plain">)([^<]*)(</script>)', s)
if not pm or s.count('id="cd-forge-pack"') != 1:
    raise SystemExit("no mini Forge pack, or more than one")
old = gzip.decompress(base64.b64decode(pm.group(2).strip())).decode("utf-8")
if FORGE_OLD not in old:
    raise SystemExit("the mini Forge here is not the 639 one this pass replaces")
mf = lean
a, b = block(mf, "cd-pkg-src")
mf = mf[:a] + '<script id="cd-pkg-src" type="text/plain">\n</script>' + mf[b:]
mf, n1 = re.subn(r'<script type="text/plain" id="cd-src-tabula">[^<]*</script>\n?', "", mf)
mf, n2 = re.subn(r'<button id="curric-tabula-btn" class="tabula-btn" onclick="openExt\(\'tabula\'\)">Tabula</button>', "", mf)
if n1 != 1 or n2 != 1:
    raise SystemExit("Tabula pieces not where expected (%d, %d)" % (n1, n2))
for k in ("abacus", "slides", "scriba", "fontes"):
    oa, ob = block(old, "cd-src-" + k)
    na, nb = block(mf, "cd-src-" + k)
    if ob - oa > 4000:
        raise SystemExit("the 1057 mini Forge's %s is not the short page" % k)
    mf = mf[:na] + old[oa:ob] + mf[nb:]
# what rides in it, whole, from the 1057 mini Forge: from its slim mark to the end of its carpe-only rule
ra, _ = block(old, "cd-mini-forge-slim")
_, rb = block(old, "cd1057-carpe-only")
ride = old[ra:rb]
for bid in ("cd-mini-forge-slim-js", "cd-mini-forge-fr-1052", "cd1053-no-tabula", "cd1053-no-tabula-js", "cd1055-carpe-only", "cd1055-carpe-only-js"):
    block(ride, bid)
if ride.count('window.__cdMiniForge={from:"639",slim:true};') != 1:
    raise SystemExit("the slim mark is not the 1057 one")
ride = ride.replace('window.__cdMiniForge={from:"639",slim:true};', 'window.__cdMiniForge={from:"641",slim:true};')
k = mf.rfind("</body>")
if k < 0:
    raise SystemExit("the Forge has no body end")
mf = mf[:k] + ride + mf[k:]
# The Forge 641 is The Forge 639 with a new stamp and no date shown: so is the mini Forge (its build, from its record,
# is written into its build line, so the record is changed first), and its Fabrica frame follows the room's head
# (forge_fit.py)
want = ff.fabrica(nbd.forge(old.replace(FORGE_OLD, FORGE_NEW).replace('window.__cdMiniForge={from:"639",slim:true};', 'window.__cdMiniForge={from:"641",slim:true};')))
if mf != want:
    raise SystemExit("the new mini Forge differs from the 1057 one beyond its stamp")
z = bytearray(gzip.compress(mf.encode("utf-8"), 9, mtime=0))
z[9] = 3
s = s[:pm.start(2)] + base64.b64encode(bytes(z)).decode("ascii") + s[pm.end(2):]
print("mini Forge: The Forge 641, %d bytes (%d packed)" % (len(mf.encode("utf-8")), len(z)))

# 2. PASS 1057'S WORK IS IN THE PAGE ALREADY
for mark in ("window.__cd1057auto = Date.now(); editApp.onclick();", "function sealed() { try { void window.localStorage;"):
    if s.count(mark) != 1:
        raise SystemExit("pass 1057's work not found once: %r" % mark)

# 3. THE BUILDERS (the owner's own edition only): each package carries this build's number
bm = re.search(r'(<script[^>]*id="cd-builders-data"[^>]*>)(.*?)(</script>)', s, re.S)
if bm:
    D = json.loads(bm.group(2))
    if str(D.get("pass")) != "1057":
        raise SystemExit("builders: pass %s, 1057 expected" % D.get("pass"))
    D["pass"] = int(PASS) if isinstance(D.get("pass"), int) else PASS
    for K in D["kinds"].values():
        K["zip"] = re.sub(r"^Carpe Diem \d{4} ", "Carpe Diem %s " % PASS, K["zip"])
    T = json.loads(gzip.decompress(base64.b64decode(D["texts"])).decode("utf-8"))
    names = {}
    for K in D["kinds"].values():
        for f in K["files"]:
            names.setdefault(f[1], []).append(f[0])
    done = {}

    def sub(h, pat, new, n=None):
        t2, c = re.subn(pat, new, T[h])
        if c == 0 or (n is not None and c != n):
            raise SystemExit("builders: %r in %s (%d)" % (pat, names.get("t:" + h, ["?"])[0], c))
        T[h] = t2
        done[h] = done.get(h, 0) + c

    for h, t in list(T.items()):
        n = (names.get("t:" + h) or [""])[0]
        if n.endswith("/BUILD_INFO.txt"):
            sub(h, r"Build: \d{4}-\d\d-\d\d\nPass: \d{4}\nStamp: 52817\d{4}", "Build: %s\nPass: %s\nStamp: %s" % (DATE, PASS, STAMP), 1)
        elif n.endswith("/app/build.gradle"):
            sub(h, r"versionName '\d{4}'", "versionName '%s'" % PASS, 1)
        elif n.endswith("/carpe_diem.iss"):
            sub(h, r'#define AppVersion "\d{4}"', '#define AppVersion "%s"' % PASS, 1)
        elif n.endswith("/project.pbxproj"):
            sub(h, r"(CURRENT_PROJECT_VERSION|MARKETING_VERSION) = \d{4};", r"\g<1> = %s;" % PASS)
        elif n.endswith("/Info.plist") and "CFBundleShortVersionString" in t:
            sub(h, r"(<key>CFBundle(?:ShortVersionString|Version)</key>\s*<string>)\d{4}(</string>)", r"\g<1>%s\2" % PASS, 2)
        elif n.endswith("/READ ME FIRST.txt"):
            sub(h, r", BUILD \d{4}: READ ME FIRST", ", BUILD %s: READ ME FIRST" % PASS, 1)
            if re.search(r"Carpe-Diem-\d{4}-Windows-Setup\.exe", T[h]):
                sub(h, r"Carpe-Diem-\d{4}-Windows-Setup\.exe", "Carpe-Diem-%s-Windows-Setup.exe" % PASS)
    refs = [f for f in D["ipa"]["files"] if f[0].endswith(".app/Info.plist")]
    if len(refs) != 1 or not refs[0][1].startswith("b:"):
        raise SystemExit("builders: the app's Info.plist not found once")
    key = refs[0][1][2:]
    pl = plistlib.loads(base64.b64decode(D["blobs"][key]))
    pl["CFBundleShortVersionString"] = pl["CFBundleVersion"] = PASS
    raw = plistlib.dumps(pl, fmt=plistlib.FMT_BINARY)
    nkey = hashlib.sha256(raw).hexdigest()[:16]
    D["blobs"][nkey] = base64.b64encode(raw).decode("ascii")
    refs[0][1] = "b:" + nkey
    used = sum(1 for K in D["kinds"].values() for f in K["files"] if f[1] == "b:" + key) + sum(1 for f in D["ipa"]["files"] if f[1] == "b:" + key)
    if not used:
        del D["blobs"][key]
    D["texts"] = base64.b64encode(gzip.compress(json.dumps(T, ensure_ascii=False, separators=(",", ":")).encode("utf-8"), mtime=0)).decode("ascii")
    body = json.dumps(D, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    s = s[:bm.start(2)] + body + s[bm.end(2):]
    print("builders: pass 1057 -> %s; %d texts changed (%d places)" % (PASS, len(done), sum(done.values())))

# 4. THE BUILD STAMP (its edition stays)
s = s.replace('CD_BUILD={date:"2026-10-19",pass:"1057",stamp:"528171057"', 'CD_BUILD={date:"%s",pass:"%s",stamp:"%s"' % (DATE, PASS, STAMP), 1)

# 5. THE BUILD WITHOUT ITS DATE
s = nbd.carpe(s)

# 6. THE PAGE'S PHOTOGRAPH OF ITSELF, taken again, so a copy, a room window and Edit this app all carry 1058
s = selfsrc.rephoto(s)
if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude(usercontent)?\.(ai|com)", s):
    raise SystemExit("a script from outside that does not belong")
open(dst, "w", encoding="utf-8").write(s)
print("written", dst, len(s.encode("utf-8")))
