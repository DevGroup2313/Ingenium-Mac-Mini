"""Pass 1057 of Carpe Diem: the mini Forge is The Forge 639, and it opens on the Carpe Diem it lives in.

The owner's words (19 October 2026), with three photographs of the full edition 1056: "The mini Forge inside of
Carpe Diem is showing a much older mini Forge, it says build 629, please fix that and its copy of Carpe Diem and the
other apps are also old, I need that fixed and make sure you fix it on the demo builds." Asked whether the mini Forge
should offer the other apps again, the owner chose "Carpe Diem only", as on 18 October.

What was wrong. Every edition of 1056 carried the mini Forge made from The Forge 629 (12 October), so its About read
"Build 2026-10-12 · 629 · 9s61". In the full edition's device pages it had also lost pass 1055's rule, so its Editor
offered Inkwell and Ingenium again. And it opened on whichever Carpe Diem had last been chosen in it (on the owner's
Mac, a 1051 kept since 12 October), not on the app around it, until Edit this app was pressed.

1. The mini Forge is made again from The Forge 639 (lean: it carries no apps), as the 629 one was made from 629: the
   device packages' source is left out (the app around it builds them), Tabula is left out (pass 1053), Abacus,
   Slides, Scriba and Fontes are the short pages that send you to Carpe Diem's own side buttons, and the French layer
   (pass 1052), the guard against Tabula (pass 1053) and the rule that it edits Carpe Diem alone (pass 1055) ride in it.
2. Each time the mini Forge has loaded, it is handed this very build, as Edit this app hands it (from the page's
   photograph of itself first), so its Editor and its Bakery hold Carpe Diem 1057, not an older file kept from before.
   The edits made in it are kept as before; only the file they apply to is the current one.
3. The build stamp, the builders (the owner's edition: each package carries 1057), and the page's photograph of itself.

usage: cd1057.py THE_FORGE_639_LEAN.html IN_1056.html OUT.html"""
import base64, gzip, hashlib, json, os, plistlib, re, sys, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
lean_path, src, dst = sys.argv[1], sys.argv[2], sys.argv[3]
s = open(src, encoding="utf-8").read()
lean = open(lean_path, encoding="utf-8").read()
DATE = "2026-10-19"


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


selfsrc = load("selfsrc", os.path.join(HERE, "..", "carpe_diem_1052", "selfsrc.py"))


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit("expected %d, found %d: %r" % (count, n, a[:120]))
    s = s.replace(a, b)


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


# 1. THE MINI FORGE, MADE AGAIN FROM THE FORGE 639
if 'CD_BUILD={date:"2026-10-18",pass:"639",stamp:"9s71"}' not in lean:
    raise SystemExit("this is not The Forge 639")
if re.search(r'<script type="text/plain" id="cd-src-(carpe|ingenium|inkwell)"', lean):
    raise SystemExit("this Forge carries apps: the lean page is wanted")
pm = re.search(r'(<script id="cd-forge-pack" type="text/plain">)([^<]*)(</script>)', s)
if not pm or s.count('id="cd-forge-pack"') != 1:
    raise SystemExit("no mini Forge pack, or more than one")
old = gzip.decompress(base64.b64decode(pm.group(2).strip())).decode("utf-8")
if 'CD_BUILD={date:"2026-10-12",pass:"629",stamp:"9s61"}' not in old:
    raise SystemExit("the mini Forge here is not the 629 one this pass replaces")
mf = lean
# the device packages' source: the app around the mini Forge builds the packages, as with 629
a, b = block(mf, "cd-pkg-src")
mf = mf[:a] + '<script id="cd-pkg-src" type="text/plain">\n</script>' + mf[b:]
# Tabula is not in the mini Forge (pass 1053)
mf, n1 = re.subn(r'<script type="text/plain" id="cd-src-tabula">[^<]*</script>\n?', "", mf)
mf, n2 = re.subn(r'<button id="curric-tabula-btn" class="tabula-btn" onclick="openExt\(\'tabula\'\)">Tabula</button>', "", mf)
if n1 != 1 or n2 != 1:
    raise SystemExit("Tabula pieces not where expected (%d, %d)" % (n1, n2))
# Abacus, Slides, Scriba and Fontes: the short pages of the 629 mini Forge, which send you to Carpe Diem's side buttons
for k in ("abacus", "slides", "scriba", "fontes"):
    oa, ob = block(old, "cd-src-" + k)
    na, nb = block(mf, "cd-src-" + k)
    if ob - oa > 4000:
        raise SystemExit("the 629 mini Forge's %s is not the short page" % k)
    mf = mf[:na] + old[oa:ob] + mf[nb:]
# what rides in the mini Forge, from the 629 one: the French layer (1052) and the guard against Tabula (1053)
ride = []
for bid in ("cd-mini-forge-fr-1052", "cd1053-no-tabula", "cd1053-no-tabula-js"):
    oa, ob = block(old, bid)
    ride.append(old[oa:ob])
# the rule that it edits Carpe Diem alone (1055): from the old mini Forge where it has it, else from pass 1055 itself
if "cd1055-carpe-only" in old:
    oa, _ = block(old, "cd1055-carpe-only")
    _, ob = block(old, "cd1055-carpe-only-js")
    only = old[oa:ob]
else:
    t = open(os.path.join(HERE, "..", "carpe_diem_1055", "cd1055.py"), encoding="utf-8").read()
    m = re.search(r"ONLY = r'''(.*?)'''", t, re.S)
    if not m:
        raise SystemExit("pass 1055's rule not found")
    only = m.group(1)
if 'id="cd1055-carpe-only"' not in only or 'id="cd1055-carpe-only-js"' not in only:
    raise SystemExit("pass 1055's rule is not whole")
slim = ('<style id="cd-mini-forge-slim">#zipAppsBtn{display:none !important}</style>'
        '<script id="cd-mini-forge-slim-js">window.__cdMiniForge={from:"639",slim:true};</script>')
# The Forge 639 sets its app keys with a rule of seven ids (cd-9s62-appseals-css), which outranks pass 1055's; the same
# rule, given more weight, keeps the other apps out of sight in this Forge too
if 'html:not(#hd1):not(#hd2):not(#hd3):not(#hd4):not(#hd5):not(#hd6):not(#hd7) body.forge-app .hd-panel #edAppRow > #edAppSeg > button' not in mf:
    raise SystemExit("the Forge's rule for its app keys is not the one this pass outweighs")
# The Forge 639's first step says it carries all four apps; in the mini Forge, it says what is true there
LAST_ROW = '     "Ouvrez une fois le fichier de la bibliothèque d’apps : la mini Forge garde alors ici Carpe Diem. Ensuite, Carpe Diem s’ouvre ici aussitôt."]];'
if only.count(LAST_ROW) != 1:
    raise SystemExit("pass 1055's lines not where expected")
FOUR = "The Forge carries all four inside it and keeps them on this device on its first start, so choosing one opens it at once."
if FOUR not in mf:
    raise SystemExit("the Forge's first step is not the one this pass rewords")
only = only.replace(LAST_ROW, LAST_ROW[:-2] + ',\n    ["' + FOUR + '", "' + FOUR + '",\n'
                    '     "Each time it opens, Carpe Diem hands the mini Forge this very build, so the app here is always the current one.",\n'
                    '     "À chaque ouverture, Carpe Diem confie à la mini Forge cette version même : l’app ici est donc toujours la plus récente."]];')
heavy = "html" + "".join(":not(#cdo%d)" % i for i in range(1, 11))
only += ('<style id="cd1057-carpe-only">%s body #edAppRow > #edAppSeg > button[data-app]:not([data-app="cd"]),'
         '%s body #edAppRow > .tip{display:none !important}</style>' % (heavy, heavy))
k = mf.rfind("</body>")
if k < 0:
    raise SystemExit("the Forge has no body end")
mf = mf[:k] + slim + "".join(ride) + only + mf[k:]
for bid in ("cd-mini-forge-fr-1052", "cd1053-no-tabula-js", "cd1055-carpe-only-js", "cd-mini-forge-slim-js"):
    block(mf, bid)
z = bytearray(gzip.compress(mf.encode("utf-8"), 9, mtime=0))
z[9] = 3
s = s[:pm.start(2)] + base64.b64encode(bytes(z)).decode("ascii") + s[pm.end(2):]
print("mini Forge: The Forge 639, %d bytes (%d packed); the 629 one was %d" % (len(mf.encode("utf-8")), len(z), len(old.encode("utf-8"))))

# 2. THE MINI FORGE OPENS ON THIS VERY BUILD
rep("    p.appendChild(f);\n\n    /* PASS 891 - THE APP READS ITSELF FROM ITSELF.",
    "    p.appendChild(f);\n"
    "    /* CARPE DIEM PASS 1057: the mini Forge opens on this very build. It showed whichever Carpe Diem had last been\n"
    "       chosen in it (on one Mac, a 1051 kept since 12 October), so each time the Forge has loaded it is handed the\n"
    "       app it lives in, as Edit this app hands it; the edits made in it stay. */\n"
    "    f.addEventListener('load', function () {\n"
    "      if (!f.srcdoc) return;\n"
    "      setTimeout(function () {\n"
    "        try { if (typeof editApp.onclick === 'function') { window.__cd1057auto = Date.now(); editApp.onclick(); } } catch (e) {}\n"
    "      }, 1500);\n"
    "    });\n\n"
    "    /* PASS 891 - THE APP READS ITSELF FROM ITSELF.")
# only a press of Edit this app says so in a line; the hand-over on opening is quiet
rep("        try { if (window.say699) window.say699(\n          'This very build is open in the Forge. Edit it, then Download ships the next version.',",
    "        try { if (window.say699 && !(window.__cd1057auto && Date.now() - window.__cd1057auto < 30000)) window.say699(\n          'This very build is open in the Forge. Edit it, then Download ships the next version.',")

# 2b. THE DEMONSTRATION EDITIONS' KEEPER, ASKED FOR ONLY WHERE IT CAN BE: these editions ask the browser for their offline
#     keeper (sw.js) without looking where they stand. Shown in the mini Forge's preview, a sealed frame, the question itself
#     is refused with an error; it is now asked only on a website, as the other editions ask it, and never throws.
SW_OLD = '<script>if("serviceWorker" in navigator){window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js",{updateViaCache:"none"}).catch(function(){});});}</script>'
SW_NEW = ('<script>if("serviceWorker" in navigator&&(location.protocol==="https:"||location.protocol==="http:")){window.addEventListener("load",function(){'
          'try{navigator.serviceWorker.register("sw.js",{updateViaCache:"none"}).catch(function(){});}catch(e){}});}</script>')
if s.count(SW_OLD) == 1:
    rep(SW_OLD, SW_NEW)
    print("the keeper is asked for only on a website")
elif s.count(SW_OLD):
    raise SystemExit("the keeper's question found %d times" % s.count(SW_OLD))

# 2c. NO FALSE ALARM IN A SEALED FRAME: shown in the mini Forge's preview, Carpe Diem is refused both stores because the
#     frame is sealed, not because the device is full, and it said "Not saved: this device has no room left". It now says
#     so only when a store is refused for room; in a sealed frame it says nothing.
rep("  var checked = false, early = null, pend = null, timer = null, recOk = null, said = false;\n",
    "  /* 1057: a frame sealed from every store (the mini Forge's preview) has room; it is only sealed, so nothing is said there */\n"
    "  function sealed() { try { void window.localStorage; return false; } catch (e) { return !!(e && e.name === 'SecurityError'); } }\n"
    "  var checked = false, early = null, pend = null, timer = null, recOk = null, said = false;\n")
rep("      function () { if (!ok) notice(false, 'Not saved: this device has no room left. Export a backup.',",
    "      function () { if (!ok && !sealed()) notice(false, 'Not saved: this device has no room left. Export a backup.',")

# 3. THE BUILDERS (the owner's own edition only): each package carries this build's number
bm = re.search(r'(<script[^>]*id="cd-builders-data"[^>]*>)(.*?)(</script>)', s, re.S)
if bm:
    D = json.loads(bm.group(2))
    was = str(D.get("pass"))
    if was != "1056":
        raise SystemExit("builders: pass %s, 1056 expected" % was)
    D["pass"] = 1057 if isinstance(D.get("pass"), int) else "1057"
    for K in D["kinds"].values():
        K["zip"] = re.sub(r"^Carpe Diem \d{4} ", "Carpe Diem 1057 ", K["zip"])
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
            sub(h, r"Build: \d{4}-\d\d-\d\d\nPass: \d{4}\nStamp: 52817\d{4}", "Build: %s\nPass: 1057\nStamp: 528171057" % DATE, 1)
        elif n.endswith("/app/build.gradle"):
            sub(h, r"versionName '\d{4}'", "versionName '1057'", 1)
        elif n.endswith("/carpe_diem.iss"):
            sub(h, r'#define AppVersion "\d{4}"', '#define AppVersion "1057"', 1)
        elif n.endswith("/project.pbxproj"):
            sub(h, r"(CURRENT_PROJECT_VERSION|MARKETING_VERSION) = \d{4};", r"\1 = 1057;")
        elif n.endswith("/Info.plist") and "CFBundleShortVersionString" in t:
            sub(h, r"(<key>CFBundle(?:ShortVersionString|Version)</key>\s*<string>)\d{4}(</string>)", r"\g<1>1057\2", 2)
        elif n.endswith("/READ ME FIRST.txt"):
            sub(h, r", BUILD \d{4}: READ ME FIRST", ", BUILD 1057: READ ME FIRST", 1)
            if re.search(r"Carpe-Diem-\d{4}-Windows-Setup\.exe", T[h]):
                sub(h, r"Carpe-Diem-\d{4}-Windows-Setup\.exe", "Carpe-Diem-1057-Windows-Setup.exe")
    # the ready iPhone and iPad app (CarpeDiem.ipa, unsigned: Sideloadly signs it) reads this build in its Info.plist
    refs = [f for f in D["ipa"]["files"] if f[0].endswith(".app/Info.plist")]
    if len(refs) != 1 or not refs[0][1].startswith("b:"):
        raise SystemExit("builders: the app's Info.plist not found once")
    key = refs[0][1][2:]
    pl = plistlib.loads(base64.b64decode(D["blobs"][key]))
    pl["CFBundleShortVersionString"] = pl["CFBundleVersion"] = "1057"
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
    print("builders: pass 1056 -> 1057; %d texts changed (%d places)" % (len(done), sum(done.values())))

# 4. THE BUILD STAMP (its edition stays)
m = re.search(r'CD_BUILD=\{date:"2026-10-18",pass:"1056",stamp:"528171056"', s)
if not m:
    raise SystemExit("no CD_BUILD 1056")
s = s.replace(m.group(0), 'CD_BUILD={date:"%s",pass:"1057",stamp:"528171057"' % DATE)

# 5. THE PAGE'S PHOTOGRAPH OF ITSELF, taken again, so a copy, a room window and Edit this app all carry 1057
s = selfsrc.rephoto(s)
if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude(usercontent)?\.(ai|com)", s):
    raise SystemExit("a script from outside that does not belong")
open(dst, "w", encoding="utf-8").write(s)
print("written", dst, len(s.encode("utf-8")))
