"""Pass 1055 of Carpe Diem: Tabula holds a thesis of 100,000 words, by Inkwell 7.44's recipe.

The owner's words (18 October 2026): "Inkwell has already implemented the 100,000 word fix to Tabula, please copy that
recipe and apply it to the other Tabulas." Carpe Diem's Tabula (TABULA_SRC) takes the same patch as Ingenium 5.3 and The
Forge 635 (source/build/apps/tabula_big_patch.py, R127): the pages are laid out only as far as an edit moves them, in
slices a keystroke can stop, and a document over 300,000 characters is kept in IndexedDB with a small marker in
localStorage, so a thesis is no longer refused at localStorage's four million characters. Pass 1053 already gave this
Tabula the footnote fix the patch builds on (R124).
The tour's card on autosave (pass 1054) says so, in English and French. In the owner's own edition, the builders the
mini Forge and the Author Studio make packages from carry this build's number in each package's name, BUILD_INFO.txt,
installer, app and project versions (they still said 1050 or 1051), and the Mac recipe's first-start check waits for
an Intel start under Rosetta (mac_start_check.py). Nothing else in the page changes but the build stamp and the page's
photograph of itself.
usage: cd1055.py IN_1054.html OUT.html"""
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
tbig = load("tabula_big_patch", os.path.join(HERE, "..", "..", "build", "apps", "tabula_big_patch.py"))
macstart = load("mac_start_check", os.path.join(HERE, "..", "mac_start_check.py"))


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit("expected %d, found %d: %r" % (count, n, a[:120]))
    s = s.replace(a, b)


# 1. TABULA HOLDS A THESIS
m = re.search(r'var TABULA_SRC = "([^"]+)"', s)
if not m or len(re.findall(r'var TABULA_SRC = "', s)) != 1:
    raise SystemExit("Tabula not found once")
tab = tbig.patch(base64.b64decode(m.group(1)).decode("utf-8"))
s = s[:m.start(1)] + base64.b64encode(tab.encode("utf-8")).decode("ascii") + s[m.end(1):]

# 1b. THE MINI FORGE EDITS CARPE DIEM ALONE (the owner's word, 18 October 2026: "The mini Forge is not supposed to show
#     the other apps."). Its Editor still offered Inkwell and Ingenium beside Carpe Diem, and its words spoke of "your four
#     apps". The other apps' keys are hidden, Carpe Diem stays the app it edits, and those words name Carpe Diem alone, in
#     English and French (as the page runs, so the French that follows the English words still finds them).
import gzip
pm = re.search(r'(<script id="cd-forge-pack" type="text/plain">)([^<]*)(</script>)', s)
if not pm:
    raise SystemExit("no mini Forge pack")
mf = gzip.decompress(base64.b64decode(pm.group(2).strip())).decode("utf-8")
if "cd1055-carpe-only" in mf or 'id="edAppSeg"' not in mf:
    raise SystemExit("mini Forge: already done, or no app switch")
ONLY = r'''<style id="cd1055-carpe-only">#edAppSeg button[data-app]:not([data-app="cd"]){display:none!important}</style><script id="cd1055-carpe-only-js">/* CARPE DIEM PASS 1055: the mini Forge edits Carpe Diem alone, and offers no other app */
(function () {
  var D = document, busy = false, t = 0, CUR = "en";
  /* each line: as the Forge wrote it in English, as the French layer shows it, and the same line naming Carpe Diem alone */
  var SAY = [
    ["Choose the app at the top (Editing): Carpe Diem, The Forge, Inkwell or Ingenium.", "Choisissez l’app en haut (Édition) : Carpe Diem, La Forge, Inkwell ou Ingenium.",
     "The app at the top (Editing) is Carpe Diem: the mini Forge edits Carpe Diem itself.", "L’app en haut (Édition) est Carpe Diem : la mini Forge modifie Carpe Diem lui-même."],
    ["Open the app library file once, and the Forge keeps your four apps here: Carpe Diem, the Forge, Inkwell and Ingenium. After that, choosing an app above opens it at once.",
     "Ouvrez une fois le fichier de la bibliothèque d’apps : la Forge garde alors ici vos quatre apps, Carpe Diem, la Forge, Inkwell et Ingenium. Ensuite, choisir une app ci-dessus l’ouvre aussitôt.",
     "Open the app library file once, and the mini Forge keeps Carpe Diem here. After that, Carpe Diem opens here at once.",
     "Ouvrez une fois le fichier de la bibliothèque d’apps : la mini Forge garde alors ici Carpe Diem. Ensuite, Carpe Diem s’ouvre ici aussitôt."]];
  var TIP = /the other apps it knows|les autres apps qu’elle connaît/, TIPS = ["The mini Forge edits Carpe Diem, the app it lives in.", "La mini Forge modifie Carpe Diem, l’app où elle vit."];
  function fr() { return CUR === "fr"; }
  /* Carpe Diem tells this frame its language in a message, as it tells the French layer */
  window.addEventListener("message", function (e) { try { if (e.source !== window.parent || window.parent === window) return; var d = e.data;
    if (d && typeof d === "object" && (d.cdLang === "fr" || d.cdLang === "en") && d.cdLang !== CUR) { CUR = d.cdLang; soon(); } } catch (x) {} });
  try { if (window.parent !== window) window.parent.postMessage({ cdLangAsk: 1 }, "*"); } catch (e) {}
  /* where those words stand: the Editor room (its switch, its panels, its prompt) and the guide's room-by-room steps */
  function roots() { var r = [], e = D.getElementById("room-editor"); if (e) r.push(e); D.querySelectorAll('article[data-group="Step by step"]').forEach(function (a) { r.push(a); }); return r; }
  function swap(v) {
    for (var k = 0; k < SAY.length; k++) { var want = SAY[k][fr() ? 3 : 2];
      for (var q = 0; q < 4; q++) { var from = SAY[k][q]; if (from !== want && v.indexOf(from) >= 0) v = v.split(from).join(want); } }
    var tw = TIPS[fr() ? 1 : 0], tn = TIPS[fr() ? 0 : 1]; if (v.indexOf(tn) >= 0) v = v.split(tn).join(tw);
    return v;
  }
  function fix() {
    if (busy) return; busy = true;
    try {
      var seg = D.getElementById("edAppSeg"), on = seg && seg.querySelector('button[aria-pressed="true"]');
      if (on && on.getAttribute("data-app") !== "cd") { var cd = seg.querySelector('button[data-app="cd"]'); if (cd) cd.click(); }
      roots().forEach(function (root) {
        var w = D.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
        while ((n = w.nextNode())) { var v = n.nodeValue; if (!/Carpe Diem/.test(v)) continue; var s2 = swap(v); if (s2 !== v) n.nodeValue = s2; }
        root.querySelectorAll("[data-tip]").forEach(function (e) { var a = e.getAttribute("data-tip"); if (TIP.test(a) || TIPS.indexOf(a) >= 0) { var b = TIPS[fr() ? 1 : 0]; if (a !== b) e.setAttribute("data-tip", b); } });
        root.querySelectorAll("p, div, span, li, small").forEach(function (e) {
          if (!TIP.test(e.textContent || "")) return;
          for (var c = e.firstElementChild; c; c = c.nextElementSibling) if (TIP.test(c.textContent || "")) return;
          e.textContent = TIPS[fr() ? 1 : 0]; });
      });
    } catch (e) {}
    busy = false;
  }
  function soon() { clearTimeout(t); t = setTimeout(fix, 120); }
  function mine(ms) { var r = roots(); for (var i = 0; i < ms.length; i++) for (var j = 0; j < r.length; j++) if (r[j].contains(ms[i].target)) return true; return false; }
  function start() { fix(); try { new MutationObserver(function (ms) { if (!busy && mine(ms)) soon(); }).observe(D.body, { childList: true, subtree: true, characterData: true }); } catch (e) {} }
  if (D.body) start(); else D.addEventListener("DOMContentLoaded", start);
})();
</script>'''
k = mf.rfind("</body>")
if k < 0:
    raise SystemExit("mini Forge: no body end")
mf = mf[:k] + ONLY + mf[k:]
z = bytearray(gzip.compress(mf.encode("utf-8"), 9, mtime=0))
z[9] = 3
s = s[:pm.start(2)] + base64.b64encode(bytes(z)).decode("ascii") + s[pm.end(2):]

# 2. THE TOUR SAYS SO, in pass 1054's card on autosave
rep("A page moved into a floating window, or opened again after a restart, comes back whole. If a document ever grows",
    "A page moved into a floating window, or opened again after a restart, comes back whole. Tabula holds a thesis of "
    "100,000 words: a keystroke is answered at once, because only the pages an edit moves are laid out again, and a long "
    "document is kept in the browser’s larger store, so it is not lost. If a document ever grows")
rep("Une page envoyée dans une fenêtre flottante, ou rouverte après un redémarrage, revient entière. Si un document",
    "Une page envoyée dans une fenêtre flottante, ou rouverte après un redémarrage, revient entière. Tabula tient une "
    "thèse de 100 000 mots : chaque touche frappée s’affiche aussitôt, car seules les pages qu’une modification "
    "déplace sont remises en page, et un long document est gardé dans la plus grande réserve du navigateur, pour qu’il "
    "ne se perde pas. Si un document")

# 3. THE BUILDERS (the owner's own edition only): each package carries this build's number
bm = re.search(r'(<script[^>]*id="cd-builders-data"[^>]*>)(.*?)(</script>)', s, re.S)
if bm:
    D = json.loads(bm.group(2))
    old = str(D.get("pass"))
    D["pass"] = 1055 if isinstance(D.get("pass"), int) else "1055"
    for K in D["kinds"].values():
        K["zip"] = re.sub(r"^Carpe Diem \d{4} ", "Carpe Diem 1055 ", K["zip"])
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
            sub(h, r"Build: \d{4}-\d\d-\d\d\nPass: \d{4}\nStamp: 52817\d{4}", "Build: 2026-10-18\nPass: 1055\nStamp: 528171055", 1)
        elif n.endswith("/app/build.gradle"):
            sub(h, r"versionName '\d{4}'", "versionName '1055'", 1)
        elif n.endswith("/carpe_diem.iss"):
            sub(h, r'#define AppVersion "\d{4}"', '#define AppVersion "1055"', 1)
        elif n.endswith("/project.pbxproj"):
            sub(h, r"(CURRENT_PROJECT_VERSION|MARKETING_VERSION) = \d{4};", r"\1 = 1055;")
        elif n.endswith("/Info.plist") and "CFBundleShortVersionString" in t:
            sub(h, r"(<key>CFBundle(?:ShortVersionString|Version)</key>\s*<string>)\d{4}(</string>)", r"\g<1>1055\2", 2)
        elif "/Mac project/" in n and (n.endswith("/build-mac-app.yml") or n.endswith("/GITHUB_WORKFLOW_paste_this.txt")):
            # the Mac recipe's first-start check waits for an Intel start under Rosetta (mac_start_check.py)
            T[h], k = macstart.fix(T[h])
            if k != 1:
                raise SystemExit("builders: the Mac start check in %s (%d)" % (n, k))
            done[h] = done.get(h, 0) + k
        elif n.endswith("/READ ME FIRST.txt"):
            sub(h, r", BUILD \d{4}: READ ME FIRST", ", BUILD 1055: READ ME FIRST", 1)
            if re.search(r"Carpe-Diem-\d{4}-Windows-Setup\.exe", T[h]):
                sub(h, r"Carpe-Diem-\d{4}-Windows-Setup\.exe", "Carpe-Diem-1055-Windows-Setup.exe")
    # the ready iPhone and iPad app (CarpeDiem.ipa, unsigned: Sideloadly signs it) reads this build in its Info.plist
    import hashlib, plistlib
    refs = [f for f in D["ipa"]["files"] if f[0].endswith(".app/Info.plist")]
    if len(refs) != 1 or not refs[0][1].startswith("b:"):
        raise SystemExit("builders: the app's Info.plist not found once")
    key = refs[0][1][2:]
    used = sum(1 for K in D["kinds"].values() for f in K["files"] if f[1] == "b:" + key)
    pl = plistlib.loads(base64.b64decode(D["blobs"][key]))
    pl["CFBundleShortVersionString"] = pl["CFBundleVersion"] = "1055"
    raw = plistlib.dumps(pl, fmt=plistlib.FMT_BINARY)
    nkey = hashlib.sha256(raw).hexdigest()[:16]
    D["blobs"][nkey] = base64.b64encode(raw).decode("ascii")
    refs[0][1] = "b:" + nkey
    if not used:
        del D["blobs"][key]
    D["texts"] = base64.b64encode(gzip.compress(json.dumps(T, ensure_ascii=False, separators=(",", ":")).encode("utf-8"), mtime=0)).decode("ascii")
    body = json.dumps(D, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    s = s[:bm.start(2)] + body + s[bm.end(2):]
    print("builders: pass %s -> 1055; %d texts changed (%d places)" % (old, len(done), sum(done.values())))

# 4. THE BUILD STAMP (its edition stays)
m = re.search(r'CD_BUILD=\{date:"2026-10-18",pass:"1054",stamp:"528171054"', s)
if not m:
    raise SystemExit("no CD_BUILD 1054")
s = s.replace(m.group(0), 'CD_BUILD={date:"2026-10-18",pass:"1055",stamp:"528171055"')

# 5. THE PAGE'S PHOTOGRAPH OF ITSELF, taken again, so a copy, a room window and Edit this app all carry 1055
s = selfsrc.rephoto(s)
if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude\.ai", s[:200000]):
    raise SystemExit("a script from outside that does not belong")
open(dst, "w", encoding="utf-8").write(s)
print("written", dst, len(s.encode("utf-8")))
