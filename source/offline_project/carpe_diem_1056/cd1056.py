"""Pass 1056 of Carpe Diem: Tabula's paragraphs run on across pages, and a note no longer lays out the whole thesis
again, by Inkwell 7.45's recipe (GAP1 and CITE1).

The owner's words (18 October 2026), asked whether Inkwell's newer Tabula improvements should go into the Tabula of
Ingenium, the Forge and Carpe Diem in these releases: "Yes, in these releases." Carpe Diem's Tabula (TABULA_SRC) takes
the same patch as Ingenium 5.5 and The Forge 638 (source/build/apps/tabula_flow_patch.py, R128, on R124 and R127): a
paragraph of text that meets the foot of a page runs on to the next one, at least two lines on each side, as in Word, so
no page ends in a blank gap (a thesis of 100,000 words: 299 pages, 337 before); and placing a footnote lays out the pages
from its paragraph past the figures it moved, not the whole document (in that thesis: 8 paragraphs of 778, 189 ms, 528
before). The tour's card on autosave (pass 1054) says so, in English and French. In the owner's own edition, the
builders carry this build's number in each package. Nothing else changes but the build stamp and the page's photograph
of itself.

Tabula also takes R129 (source/build/apps/tabula_look_patch.py): the raised pages and the 3D notes key ride in its own
page, so it keeps its look when it stands alone. The owner's words: "Why does Tabula look flat and have this small gap
between the pages, please restore Tabula's look." "This is a big regression even on Schedae button." (The picture was a
test photograph of Tabula opened by itself; in Carpe Diem its pages are drawn as before.)

And R130 (source/build/apps/tabula_notes_patch.py): Tabula's footnotes as Word sets them, by Inkwell 7.48's recipe: each
page's notes at its foot, a note written where it stands, the numbers set as Word sets them, real footnotes in Word
files, notes through copy and paste. The owner's words: "apply the new footnotes addition to all of the other Tabula to
keep full parity across Tabula."

And R132 (source/build/apps/tabula_room_patch.py and cd_room_patch.py): room to grow. Tabula autosaves a document
of up to 256 MB in the larger store (it stopped at 80 MB) and leaves the small store to the desk; Carpe Diem's desk,
when the small store (about 5 MB) refuses it, is kept in the larger store and opens from there on the next start; the
browser is asked to keep both. The owner's words: "I want for the local storage limits for all of my apps to be
expanded please."
usage: cd1056.py IN_1055.html OUT.html"""
import base64, gzip, json, os, re, sys, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
src, dst = sys.argv[1], sys.argv[2]
s = open(src, encoding="utf-8").read()


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


selfsrc = load("selfsrc", os.path.join(HERE, "..", "carpe_diem_1052", "selfsrc.py"))
tflow = load("tabula_flow_patch", os.path.join(HERE, "..", "..", "build", "apps", "tabula_flow_patch.py"))
tlook = load("tabula_look_patch", os.path.join(HERE, "..", "..", "build", "apps", "tabula_look_patch.py"))
tnotes = load("tabula_notes_patch", os.path.join(HERE, "..", "..", "build", "apps", "tabula_notes_patch.py"))
troom = load("tabula_room_patch", os.path.join(HERE, "..", "..", "build", "apps", "tabula_room_patch.py"))
cdroom = load("cd_room_patch", os.path.join(HERE, "..", "..", "build", "apps", "cd_room_patch.py"))


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit("expected %d, found %d: %r" % (count, n, a[:120]))
    s = s.replace(a, b)


# 1. TABULA'S PARAGRAPHS RUN ON, AND A NOTE IS PLACED IN A MOMENT
m = re.search(r'var TABULA_SRC = "([^"]+)"', s)
if not m or len(re.findall(r'var TABULA_SRC = "', s)) != 1:
    raise SystemExit("Tabula not found once")
tab = base64.b64decode(m.group(1)).decode("utf-8")
if "R127-TABULA-THESIS" not in tab:
    raise SystemExit("this Tabula lacks pass 1055's thesis patch (R127)")
tab = troom.patch(tnotes.patch(tlook.patch(tflow.patch(tab))))
s = s[:m.start(1)] + base64.b64encode(tab.encode("utf-8")).decode("ascii") + s[m.end(1):]

# 2. THE TOUR SAYS SO, in pass 1054's card on autosave, after pass 1055's sentence
rep("and a long document is kept in the browser’s larger store, so it is not lost.",
    "and a long document is kept in the browser’s larger store, so it is not lost. A paragraph runs on to the next page, "
    "as in Word, so no page ends in a blank gap, and a footnote is placed in a moment, even in a thesis.")
rep("et un long document est gardé dans la plus grande réserve du navigateur, pour qu’il ne se perde pas.",
    "et un long document est gardé dans la plus grande réserve du navigateur, pour qu’il ne se perde pas. Un paragraphe "
    "se poursuit sur la page suivante, comme dans Word, si bien qu’aucune page ne finit sur un blanc, et une note de bas "
    "de page se place en un instant, même dans une thèse.")

# 3. THE BUILDERS (the owner's own edition only): each package carries this build's number
bm = re.search(r'(<script[^>]*id="cd-builders-data"[^>]*>)(.*?)(</script>)', s, re.S)
if bm:
    D = json.loads(bm.group(2))
    old = str(D.get("pass"))
    D["pass"] = 1056 if isinstance(D.get("pass"), int) else "1056"
    for K in D["kinds"].values():
        K["zip"] = re.sub(r"^Carpe Diem \d{4} ", "Carpe Diem 1056 ", K["zip"])
    T = json.loads(gzip.decompress(base64.b64decode(D["texts"])).decode("utf-8"))
    names = {}
    for K in D["kinds"].values():
        for f in K["files"]:
            names.setdefault(f[1], []).append(f[0])
    done = {}
    def sub(h, pat, new, n=None):
        t2, k = re.subn(pat, new, T[h])
        if k == 0 or (n is not None and k != n):
            raise SystemExit("builders: %r in %s (%d)" % (pat, names.get("t:" + h, ["?"])[0], k))
        T[h] = t2
        done[h] = done.get(h, 0) + k
    for h, t in list(T.items()):
        n = (names.get("t:" + h) or [""])[0]
        if n.endswith("/BUILD_INFO.txt"):
            sub(h, r"Build: \d{4}-\d\d-\d\d\nPass: \d{4}\nStamp: 52817\d{4}", "Build: 2026-10-18\nPass: 1056\nStamp: 528171056", 1)
        elif n.endswith("/app/build.gradle"):
            sub(h, r"versionName '\d{4}'", "versionName '1056'", 1)
        elif n.endswith("/carpe_diem.iss"):
            sub(h, r'#define AppVersion "\d{4}"', '#define AppVersion "1056"', 1)
        elif n.endswith("/project.pbxproj"):
            sub(h, r"(CURRENT_PROJECT_VERSION|MARKETING_VERSION) = \d{4};", r"\1 = 1056;")
        elif n.endswith("/Info.plist") and "CFBundleShortVersionString" in t:
            sub(h, r"(<key>CFBundle(?:ShortVersionString|Version)</key>\s*<string>)\d{4}(</string>)", r"\g<1>1056\2", 2)
        elif n.endswith("/READ ME FIRST.txt"):
            sub(h, r", BUILD \d{4}: READ ME FIRST", ", BUILD 1056: READ ME FIRST", 1)
            if re.search(r"Carpe-Diem-\d{4}-Windows-Setup\.exe", T[h]):
                sub(h, r"Carpe-Diem-\d{4}-Windows-Setup\.exe", "Carpe-Diem-1056-Windows-Setup.exe")
    # the ready iPhone and iPad app (CarpeDiem.ipa, unsigned: Sideloadly signs it) reads this build in its Info.plist
    import hashlib, plistlib
    refs = [f for f in D["ipa"]["files"] if f[0].endswith(".app/Info.plist")]
    if len(refs) != 1 or not refs[0][1].startswith("b:"):
        raise SystemExit("builders: the app's Info.plist not found once")
    key = refs[0][1][2:]
    used = sum(1 for K in D["kinds"].values() for f in K["files"] if f[1] == "b:" + key)
    pl = plistlib.loads(base64.b64decode(D["blobs"][key]))
    pl["CFBundleShortVersionString"] = pl["CFBundleVersion"] = "1056"
    raw = plistlib.dumps(pl, fmt=plistlib.FMT_BINARY)
    nkey = hashlib.sha256(raw).hexdigest()[:16]
    D["blobs"][nkey] = base64.b64encode(raw).decode("ascii")
    refs[0][1] = "b:" + nkey
    if not used:
        del D["blobs"][key]
    D["texts"] = base64.b64encode(gzip.compress(json.dumps(T, ensure_ascii=False, separators=(",", ":")).encode("utf-8"), mtime=0)).decode("ascii")
    body = json.dumps(D, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    s = s[:bm.start(2)] + body + s[bm.end(2):]
    print("builders: pass %s -> 1056; %d texts changed (%d places)" % (old, len(done), sum(done.values())))

# 4. THE BUILD STAMP (its edition stays)
m = re.search(r'CD_BUILD=\{date:"2026-10-18",pass:"1055",stamp:"528171055"', s)
if not m:
    raise SystemExit("no CD_BUILD 1055")
s = s.replace(m.group(0), 'CD_BUILD={date:"2026-10-18",pass:"1056",stamp:"528171056"')

# 4b. ROOM TO GROW (R132): a desk the small store refuses is kept in the larger store
s = cdroom.patch(s)

# 5. THE PAGE'S PHOTOGRAPH OF ITSELF, taken again, so a copy, a room window and Edit this app all carry 1056
s = selfsrc.rephoto(s)
if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude\.ai", s[:200000]):
    raise SystemExit("a script from outside that does not belong")
open(dst, "w", encoding="utf-8").write(s)
print("written", dst, len(s.encode("utf-8")))
