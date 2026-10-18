"""Pass 639 of the Forge: Fabrica, her own offline GitHub, as Ingenium carries it and with no model, in a room of the
Forge's own; and the full page carries Ingenium 5.6 (a conversation opened from elsewhere is the one its Chat page shows).

The owner's words (18 October 2026): "Please update the Forge with Ingenium's 5.6 fixes and bring the Forge up to
Ingenium's level, as a full offline mini GitHub without AI."

Fabrica (forge_fabrica.py) keeps each app as a real git repository on the device: every version, the changes file by
file and line by line, ideas as branches brought back into main by a three-way merge, releases, an undo that adds a
version and never writes over one, a test of five checks, the app made as one page, as a web app and as the Forge's
five install packages, and the folder, bundle and zip any git opens; GitHub only when switched on. Its files are
written in a file editor of its own, or in the Forge's Editor for the apps it knows, whose edits come back as changes
to keep. It stands on the rail between Files and the Workshop, and the tour, the Guidebook and the room's own help
card say so, in English and in French. Ingenium 5.6's fix (R133) is Ingenium's own: the Forge has no Decode or Draft,
so it reaches the Forge in the Ingenium the full page carries.

usage:
  forge639.py FORGE638_LEAN.html OUT_DIR
      writes OUT_DIR/the_forge_639_lean.html: the Forge 639 page that carries no apps (Ingenium carries this one)
  forge639.py FORGE638_LEAN.html OUT_DIR INGENIUM_LEAN.html CARPE_DIEM.html INKWELL.html
      also writes OUT_DIR/the_forge.html: the full page, carrying Ingenium (lean), Carpe Diem and Inkwell, and its own
      lean page as its copy of itself (the same way as passes 632 to 638)."""
import base64, gzip, hashlib, json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import forge_fabrica  # noqa: E402

STAMP, PASS, DATE = "9s71", "639", "2026-10-18"
src, out_dir = sys.argv[1], sys.argv[2]
apps_in = sys.argv[3:6]
s = open(src, encoding="utf-8").read()
if 'id="forge-bi-meta"' in s:
    raise SystemExit("give the 638 lean page (it carries no apps)")
if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude\.ai", s[:20000]):
    raise SystemExit("the 638 page carries a script from outside that does not belong")
if 'id="room-fabrica"' in s:
    raise SystemExit("this page already has Fabrica")


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit("expected %d, found %d: %r" % (count, n, a[:120]))
    s = s.replace(a, b)


# 1. THE BUILD STAMP
rep('window.CD_BUILD={date:"2026-10-18",pass:"638",stamp:"9s70"};',
    'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP))

# 2. THE ROOM: after the Library, a room of the Forge's own; the whole width (no stage beside it)
ROOM = ('<div class="room" id="room-fabrica">\n'
        '      <div class="room-head"><div class="page-title"><h2 class="section-title">🗃️ Fabrica</h2><div class="section-sub">Your own GitHub, on this device: '
        'every version of each app kept, changed, tested and shipped here, with no model and no connection.</div></div></div>\n'
        '      <div class="room-body"><div id="fbHost"></div></div>\n'
        '    </div>\n    ')
rep('<div class="room" id="room-compose">', ROOM + '<div class="room" id="room-compose">')
rep("var ROOMS=['editor','bakery','library','files','compose','workshop','guidebook','settings','magister','curriculum','assessments','ascensus','fontes','reckoner','agenda','projects','focus'];",
    "var ROOMS=['editor','bakery','library','files','compose','workshop','guidebook','settings','magister','curriculum','assessments','ascensus','fontes','reckoner','agenda','projects','focus','fabrica'];")
rep("if(name==='projects'){ try{ forgeMountProjects(); }catch(e){} }",
    "if(name==='projects'){ try{ forgeMountProjects(); }catch(e){} } if(name==='fabrica'){ try{ if(window.__forgeFabricaMount) window.__forgeFabricaMount(); }catch(e){} }")
rep("if(window.teach && booted){ var names={editor:'the Editor',bakery:'the Bakery',library:'the Library',",
    "if(window.teach && booted){ var names={fabrica:'Fabrica',editor:'the Editor',bakery:'the Bakery',library:'the Library',")
# on the rail, in the making group: the Editor, Files, Fabrica and the Workshop
rep("[['editor','Editor','\\u270d\\ufe0f'],['files','Files','\\ud83d\\uddc4\\ufe0f'],['workshop','Workshop','\\ud83e\\uddf0']],",
    "[['editor','Editor','\\u270d\\ufe0f'],['files','Files','\\ud83d\\uddc4\\ufe0f'],['fabrica','Fabrica','\\ud83d\\uddc3\\ufe0f'],['workshop','Workshop','\\ud83e\\uddf0']],")

# 3. WHAT FABRICA ASKS OF THE FORGE: the app open in the Editor, with its edits, and the Forge's own five packages
FAB = (",fab:{editorApp:function(){ try{ if(!ED.shell) return null; var h=ED.shell, edited=false;"
       " try{ if(pkgHasEdits()){ var d=shellDoc(); h=(ED.shell.indexOf(T_SHIM)>=0)?d:stripTag(d,T_SHIM); edited=true; } }catch(e){ h=ED.shell; edited=false; }"
       " return {name:ED.shellName||'', html:h, edited:edited, app:(ED.app||edApp())}; }catch(e){ return null; } },"
       " hasKits:function(){ try{ return PKG && PKG.v===2 && !!pkgSource('mac'); }catch(e){ return false; } },"
       " kits:function(html, base, onStep){ var kinds=['mac','mac_mini','windows','ios','fire'], idt=pkgIdentity(html, base||'my_app'), made=[], n=0;"
       " return kinds.reduce(function(p,k){ return p.then(function(){ return pkgEntries(k,html,idt).then(function(entries){ if(!entries) return null;"
       " var zn=pkgZipName(k,idt); return zipAsync(entries).then(function(blob){ return blob.arrayBuffer(); }).then(function(ab){ made.push({kind:k,name:zn,size:ab.byteLength,bytes:new Uint8Array(ab)}); }); })"
       ".then(function(){ n++; if(onStep){ try{ onStep(n,kinds.length); }catch(e){} } }); }); }, Promise.resolve()).then(function(){ return made; }); } }")
rep("showDoc:function(d,n,t,k){ showDoc(d,n,t,k); }};\n})();", "showDoc:function(d,n,t,k){ showDoc(d,n,t,k); }" + FAB + "};\n})();")

# 4. THE TOUR: a card for Fabrica after the Library; the rail and the closing card count it, in English and in French
CARD = '''{
      chap: "Making and keeping", sub: "Fabrica",
      go: function () { roomThenRing("fabrica", "#room-fabrica", 600); },
      en: {
        t: "\\ud83d\\uddc3\\ufe0f Fabrica",
        b: "Here is Fabrica, your own GitHub, kept on this device and needing no model. Each of your apps is a real git repository: every version you keep is there for good, the changes since the last one show file by file and line by line, an idea becomes a branch you can bring back into main, and a version can be undone by a new one that leaves the old one standing. Write a file here, or open the app's page in the Editor and its edits come back as changes to keep. Then test the version, five checks in a quiet window, and ship it: as one page, as a web app, or as the Forge's five install packages. Any git opens what is kept here; GitHub is a switch you turn on only if you want it.",
        tip: "Keep a version before a large change. It costs one press, and nothing in the history is ever written over."
      }
    },
    {
      chap: "Making and keeping", sub: "The Workshop",'''
rep('{\n      chap: "Making and keeping", sub: "The Workshop",', CARD)
CARD_FR = ('"Fabrica": { s: "Fabrica", t: "🗃️ Fabrica", b: "Voici Fabrica, votre propre GitHub, gardé sur cet appareil et sans aucun modèle. '
           'Chacune de vos apps est un vrai dépôt git : chaque version gardée y reste pour de bon, les changements depuis la dernière se lisent fichier par fichier '
           'et ligne par ligne, une idée devient une branche que vous ramenez dans main, et une version se défait par une nouvelle qui laisse l’ancienne debout. '
           'Écrivez un fichier ici, ou ouvrez la page de l’app dans Editor : ses modifications reviennent comme des changements à garder. Puis testez la version, '
           'cinq vérifications dans une fenêtre tranquille, et expédiez-la : en une seule page, en app web, ou en cinq paquets d’installation de la Forge. '
           'Tout git ouvre ce qui est gardé ici ; GitHub est un interrupteur que vous n’allumez que si vous le voulez.", '
           'tip: "Gardez une version avant un grand changement. Cela coûte un appui, et rien dans l’historique n’est jamais écrasé." },\n     ')
rep('"The Workshop": { s: "Workshop", t: "🧰 Workshop",', CARD_FR + '"The Workshop": { s: "Workshop", t: "🧰 Workshop",')
rep("Nine rooms stand on it as words with a glyph, in an order that never changes, so the same room is always in the same place under your hand. They stand in four small groups: the Editor, Files and the Workshop for making;",
    "Ten rooms stand on it as words with a glyph, in an order that never changes, so the same room is always in the same place under your hand. They stand in four small groups: the Editor, Files, Fabrica and the Workshop for making;")
rep("Neuf pièces s’y tiennent, chacune un mot avec son pictogramme, dans un ordre qui ne change jamais, pour que la même pièce soit toujours au même endroit sous votre main. Elles se tiennent en quatre petits groupes : Editor, Files et Workshop pour faire ;",
    "Dix pièces s’y tiennent, chacune un mot avec son pictogramme, dans un ordre qui ne change jamais, pour que la même pièce soit toujours au même endroit sous votre main. Elles se tiennent en quatre petits groupes : Editor, Files, Fabrica et Workshop pour faire ;")
rep("the Editor and the Bakery, Compose, Files and the Library and the Workshop,",
    "the Editor and the Bakery, Compose, Files and the Library, Fabrica and the Workshop,")
_cl = re.search(r'"In closing": \{ s: "[^"]*", t: "[^"]*", b: "([^"]*)"', s)
if not _cl or "Files" not in _cl.group(1):
    raise SystemExit("the French closing card was not found")
_fr_old = _cl.group(1)
_fr_new = re.sub(r"Files et (la |)Library et (le |)Workshop", lambda m: "Files et " + m.group(1) + "Library, Fabrica et " + m.group(2) + "Workshop", _fr_old, count=1)
if _fr_new == _fr_old:
    _fr_new = _fr_old.replace("Workshop", "Fabrica, Workshop", 1)
rep(_fr_old, _fr_new)

# 5. THE GUIDEBOOK: the rail's sentence, and a chapter of its own, in English and in French
rep("Nine rooms stand on it as words with a glyph, in a fixed order and in four groups: Editor, Files and Workshop;",
    "Ten rooms stand on it as words with a glyph, in a fixed order and in four groups: Editor, Files, Fabrica and Workshop;")
_gfr = re.search(r"Neuf pièces[^<]{0,200}Editor, Files et Workshop", s)
if _gfr:
    rep(_gfr.group(0), _gfr.group(0).replace("Neuf pièces", "Dix pièces").replace("Editor, Files et Workshop", "Editor, Files, Fabrica et Workshop"))
ART = ('<article data-on="0" data-group="Step by step"><h3>Fabrica, your own GitHub · Fabrica, votre propre GitHub</h3>'
       '<div class="fg-en"><p>Fabrica keeps each of your apps as a real git repository on this device. It needs no model and no connection; GitHub is a switch you turn on only if you want it.</p>'
       '<ol><li><b>Your apps.</b> Bring one in: from your app library, from the app open in the Editor, from a page or a zip, or from a git bundle or a folder with its .git, history and all. Or start a new one.</li>'
       '<li><b>Change.</b> Edit a file in Fabrica itself (Save, or Ctrl and S), make a new file, rename or take one away. Or open the app’s page in the Editor: when you come back, its edits are here as changes.</li>'
       '<li><b>Keep.</b> Changes shows what differs, file by file and line by line. Write a line about it (or let Fabrica write one from the changes) and keep the version. Put back any file you did not mean to change.</li>'
       '<li><b>History and ideas.</b> Every version stays. Look at an old one, undo one (a new version that leaves the old standing), mark a release. An idea is a branch: work on it, then bring it into main.</li>'
       '<li><b>Test and ship.</b> Five checks on the version kept, in a quiet window. Then make it as one page, as a web app that works offline, or as the Forge’s five install packages. Each is noted beside its version.</li>'
       '<li><b>Copies.</b> A folder with its .git, one bundle file, or a zip of its files: any git opens them.</li></ol></div>'
       '<div class="fg-fr" lang="fr"><p>Fabrica garde chacune de vos apps comme un vrai dépôt git sur cet appareil. Il ne faut ni modèle ni connexion ; GitHub est un interrupteur que vous n’allumez que si vous le voulez.</p>'
       '<ol><li><b>Vos apps.</b> Faites-en entrer une : depuis votre bibliothèque d’apps, depuis l’app ouverte dans Editor, depuis une page ou un zip, ou depuis un bundle git ou un dossier avec son .git, historique compris. Ou commencez-en une nouvelle.</li>'
       '<li><b>Changer.</b> Modifiez un fichier dans Fabrica même (Enregistrer, ou Ctrl et S), créez un fichier, renommez-en ou retirez-en un. Ou ouvrez la page de l’app dans Editor : à votre retour, ses modifications sont là comme des changements.</li>'
       '<li><b>Garder.</b> Changes montre ce qui diffère, fichier par fichier et ligne par ligne. Écrivez une ligne (ou laissez Fabrica l’écrire d’après les changements) et gardez la version. Remettez tout fichier changé par erreur.</li>'
       '<li><b>Historique et idées.</b> Chaque version reste. Regardez-en une ancienne, défaites-en une (une nouvelle version qui laisse l’ancienne debout), marquez une sortie. Une idée est une branche : travaillez-y, puis ramenez-la dans main.</li>'
       '<li><b>Tester et expédier.</b> Cinq vérifications sur la version gardée, dans une fenêtre tranquille. Puis faites-en une seule page, une app web qui marche hors ligne, ou les cinq paquets d’installation de la Forge. Chacun est noté à côté de sa version.</li>'
       '<li><b>Copies.</b> Un dossier avec son .git, un fichier bundle, ou un zip de ses fichiers : tout git les ouvre.</li></ol></div></article>\n')
_ev = s.find('<article data-on="0" data-group="Step by step"><h3>Every room, step by step')
_ev_end = s.find("</article>", _ev)
if _ev < 0 or _ev_end < 0 or s.count('<h3>Every room, step by step') != 1:
    raise SystemExit("the Guidebook's chapter on every room was not found once")
_ev_end += len("</article>\n") if s[_ev_end:_ev_end + 11] == "</article>\n" else len("</article>")
s = s[:_ev_end] + ART + s[_ev_end:]

# 6. THE ROOM'S OWN HELP CARD (first, then next), in English and in French
rep('"workshop": [["Write the change you want in plain words, or write the code itself."],',
    '"fabrica": [["Bring an app in, or start a new one, under Your apps.", "Change a file here, or open the app\'s page in the Editor, then keep the version."], '
    '["Faites entrer une app, ou commencez-en une, sous Your apps.", "Changez un fichier ici, ou ouvrez la page de l’app dans Editor, puis gardez la version."], '
    '["Test and ship: five checks, then one page, a web app or the five install packages.", "Every version stays in History; an idea is a branch you bring into main."], '
    '["Test and ship : cinq vérifications, puis une page, une app web ou les cinq paquets d’installation.", "Chaque version reste dans History ; une idée est une branche que vous ramenez dans main."]], '
    '"workshop": [["Write the change you want in plain words, or write the code itself."],')

# 7. FABRICA ITSELF, before the page's end: Ingenium's engines and page, made the Forge's (forge_fabrica.py)
k = s.rfind("</body>")
if k < 0:
    raise SystemExit("the page has no </body>")
s = s[:k] + "\n<!-- PASS 639 · Fabrica, her own offline GitHub, with no model (Ingenium's R110, R111, R112 and R114, made the Forge's) -->\n" + forge_fabrica.block() + "\n" + s[k:]

# 8. WHAT EARLIER PASSES MADE IS STILL THERE: the Mac kits wait for an Intel start under Rosetta (636), the help level
#    keys are raised (637), and the Tabula of 638 (its footnotes as Word sets them, and room to grow)
_pm = re.search(r'<script id="cd-pkg-src" type="text/plain">(b64:[A-Za-z0-9+/=]+)</script>', s)
if not _pm or "sleep 12" in json.loads(base64.b64decode(_pm.group(1)[4:]).decode("utf-8"))["mac"]["__APP_TITLE__ for Mac/Mac project/.github/workflows/build-mac-app.yml"]:
    raise SystemExit("the Forge's Mac kit does not carry the start check of 636")
if s.count('<style id="cd-637-help-keys">') != 1:
    raise SystemExit("the Forge's help level keys of 637 are missing")
_tm = re.search(r'<script type="text/plain" id="cd-src-tabula">([A-Za-z0-9+/=\s]+)</script>', s)
_tab = base64.b64decode(_tm.group(1).strip()).decode("utf-8") if _tm else ""
if "R127-TABULA-THESIS" not in _tab or "R130" not in _tab:
    raise SystemExit("the Forge's Tabula does not carry the passes of 635 and 638")

lean = s
os.makedirs(out_dir, exist_ok=True)
open(os.path.join(out_dir, "the_forge_639_lean.html"), "w", encoding="utf-8").write(lean)
print("lean", len(lean.encode("utf-8")), hashlib.sha256(lean.encode("utf-8")).hexdigest())
if not apps_in:
    sys.exit(0)


# 9. THE APPS IT CARRIES (the full page only), each checked here as it goes in, as in passes 632 to 638
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
full = lean[:k] + "\n<!-- PASS 639 · the apps the Forge carries (lean copies), and its own page -->\n" + meta_block + "\n" + "\n".join(blocks) + "\n" + lean[k:]
open(os.path.join(out_dir, "the_forge.html"), "w", encoding="utf-8").write(full)
print("full", len(full.encode("utf-8")), hashlib.sha256(full.encode("utf-8")).hexdigest())
for m in metas:
    print("  carries", m["title"], m["version"], m["size"], "bytes,", m["gz"], "compressed")
