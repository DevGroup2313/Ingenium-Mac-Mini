"""Pass 633 of the Forge: its tour and its Guidebook describe the workshop as it now stands, and the lesson that follows
the keeping of the apps it carries says where their fingerprints come from.

The owner's words (18 October 2026): "I also want you to update the tours for all of the apps and their demos so that
everything is cohesive and describe the latest versions of the apps." Measured on the 632 page: the rail holds nine rooms
(Editor, Files, Workshop; Focus, Agenda, Projects; Magister, Reckoner; Settings), while the tour and the Guidebook still
named six, and the tour never visited Files, Focus, the Inbox, the Agenda or Projects. The tour's Editing switch card did
not say that the Forge carries its apps inside it (pass 632). And the lesson shown once the carried apps are kept said
their SHA-256 had been compared with "the library's manifest.json", which was true only of the old app library file:
the copies the Forge carries are checked against the fingerprints written beside them in its own page.

usage:
  forge633.py FORGE632_LEAN.html OUT_DIR
      writes OUT_DIR/the_forge_633_lean.html: the Forge 633 page that carries no apps (Ingenium carries this one)
  forge633.py FORGE632_LEAN.html OUT_DIR INGENIUM_LEAN.html CARPE_DIEM.html INKWELL.html
      also writes OUT_DIR/the_forge.html: the full page, carrying Ingenium (lean), Carpe Diem and Inkwell, and its own
      lean page as its copy of itself (the same way as pass 632)."""
import base64, gzip, hashlib, json, os, re, sys

STAMP, PASS, DATE = "9s65", "633", "2026-10-18"
src, out_dir = sys.argv[1], sys.argv[2]
apps_in = sys.argv[3:6]
s = open(src, encoding="utf-8").read()
if 'id="forge-bi-meta"' in s:
    raise SystemExit("give the 632 lean page (it carries no apps)")


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit("expected %d, found %d: %r" % (count, n, a[:120]))
    s = s.replace(a, b)


# 1. THE BUILD STAMP
rep('window.CD_BUILD={date:"2026-10-18",pass:"632",stamp:"9s64"};',
    'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP))

# 2. THE RAIL, AS IT STANDS: nine rooms in four groups (the tour, in English and French, and the Guidebook)
rep("Ringed here is the rail. Six rooms stand on it as words with a glyph, in an order that never changes, so the same room is always in the same place under your hand: the Editor, Files, the Workshop, Magister, the Reckoner and Settings.",
    "Ringed here is the rail. Nine rooms stand on it as words with a glyph, in an order that never changes, so the same room is always in the same place under your hand. They stand in four small groups: the Editor, Files and the Workshop for making; Focus, the Agenda and Projects for your days and your work; Magister and the Reckoner for learning; and Settings on its own.")
rep("Entouré ici, le rail. Six pièces s’y tiennent, chacune un mot avec son pictogramme, dans un ordre qui ne change jamais, pour que la même pièce soit toujours au même endroit sous votre main : Editor, Files, Workshop, Magister, Reckoner et Settings.",
    "Entouré ici, le rail. Neuf pièces s’y tiennent, chacune un mot avec son pictogramme, dans un ordre qui ne change jamais, pour que la même pièce soit toujours au même endroit sous votre main. Elles se tiennent en quatre petits groupes : Editor, Files et Workshop pour faire ; Focus, Agenda et Projects pour vos journées et votre travail ; Magister et Reckoner pour apprendre ; et Settings, seule.")
rep("<li><b>The rail</b>, down the left. Six rooms stand on it as words with a glyph, in a fixed order: Editor, Files, Workshop, Magister, Reckoner and Settings.",
    "<li><b>The rail</b>, down the left. Nine rooms stand on it as words with a glyph, in a fixed order and in four groups: Editor, Files and Workshop; Focus, Agenda and Projects; Magister and Reckoner; and Settings.")

# 2b. THE EDITOR, AS IT STANDS: it opens any of the four apps or another page, and its steps are five (1 choose the
#     file; 2 the whole app, point at a part; 3 a named surface; 4 change it; 5 download the app), where the tour still
#     walked four; its Editing switch is the key at the head of the room (the old row under it is folded into that key's
#     panel, so the tour ringed a hidden element, on 632 as well)
rep("It opens a real Carpe Diem file and lets you change every named surface of it, the masthead, the door, the colours, the wording, as plain choices rather than as code, and it shows each change live in the preview beside you. We will open it now and walk its four steps.",
    "It opens one of your apps, Carpe Diem, the Forge itself, Inkwell or Ingenium, or any other page, and lets you change every named surface of it, the masthead, the door, the colours, the wording, as plain choices rather than as code, and it shows each change live in the preview beside you. We will open it now and walk its five steps.")
rep("Elle ouvre un vrai fichier Carpe Diem et vous laisse changer chacune de ses surfaces nommées,",
    "Elle ouvre l’une de vos apps, Carpe Diem, la Forge elle-même, Inkwell ou Ingenium, ou toute autre page, et vous laisse changer chacune de ses surfaces nommées,")
rep("Nous allons l’ouvrir maintenant et parcourir ses quatre étapes.", "Nous allons l’ouvrir maintenant et parcourir ses cinq étapes.")
rep('go: function () { roomThenRing("editor", "#edAppSeg", 380); },', 'go: function () { roomThenRing("editor", ".hd-appkey", 380); },')
rep("Ringed above step one is the Editing switch. It names each app the Forge knows, and Another app for any other page. Each app keeps its own set of edits, its own surfaces and its own way out in step four,",
    "Ringed at the head of the room is the Editing switch. Press it and it names each app the Forge knows, and Another app for any other page. Each app keeps its own set of edits, its own surfaces and its own way out in step five,")
rep("Entouré au-dessus de l’étape un, le sélecteur de l’app modifiée. Il nomme chaque app que la Forge connaît, et Une autre app pour toute autre page. Chaque app garde ses propres modifications, ses propres surfaces et sa propre sortie à l’étape quatre,",
    "Entouré en tête de la pièce, le sélecteur de l’app modifiée. Appuyez dessus : il nomme chaque app que la Forge connaît, et Une autre app pour toute autre page. Chaque app garde ses propres modifications, ses propres surfaces et sa propre sortie à l’étape cinq,")
rep('''      chap: "The Editor", sub: "Steps two and three",
      go: function () { roomThenRing("editor", "#room-editor", 360); },
      en: {
        t: "\\ud83e\\udded Step two and three: a surface, then a change",
        b: "With a file open, step two lets you pick a surface, which is a named part of the app, such as the masthead or the door. Step three then shows you what you can change about it, in plain words, and the preview follows every change at once.''',
    '''      chap: "The Editor", sub: "Steps two to four",
      go: function () { roomThenRing("editor", "#room-editor", 360); },
      en: {
        t: "\\ud83e\\udded Steps two to four: point, pick, change",
        b: "With a file open, step two lets you go anywhere in the whole app, point at a part on the page and change it where it stands. Step three is the quick way: pick a surface, which is a named part of the app, such as the masthead or the door. Step four then shows you what you can change about it, in plain words: its words, its order, its colour, or a block added to Home, and the preview follows every change at once.''')
rep('''      chap: "The Editor", sub: "Step four, keep and ship",
      go: function () { roomThenRing("editor", "#room-editor", 360); },
      en: {
        t: "\\ud83d\\udce6 Step four: keep and ship",
        b: "The fourth step keeps your work and, when you are ready, ships it. Download the edited file and it carries your changes inside itself, so it opens the same way on any device. You can also export just your edits as a small file and read them back in later.''',
    '''      chap: "The Editor", sub: "Step five, download the app",
      go: function () { roomThenRing("editor", "#room-editor", 360); },
      en: {
        t: "\\ud83d\\udce6 Step five: download the app",
        b: "The fifth step ships your work when you are ready. Download the app and it carries your changes inside itself, so it opens the same way on any device. Its three parts give the app's identity, just the file, and the edits themselves, which you can export as a small file and read back in later.''')
rep('''    "Steps two and three": { s: "Étapes deux et trois", t: "🧭 Étapes deux et trois : une surface, puis un changement", b: "Une fois un fichier ouvert, l’étape deux vous laisse choisir une surface, c’est-à-dire une partie nommée de l’app, comme le bandeau ou la porte. L’étape trois vous montre alors ce que vous pouvez y changer, en mots simples, et l’aperçu suit chaque changement aussitôt.''',
    '''    "Steps two to four": { s: "Étapes deux à quatre", t: "🧭 Étapes deux à quatre : désigner, choisir, changer", b: "Une fois un fichier ouvert, l’étape deux vous laisse aller partout dans l’app entière, désigner une partie sur la page et la changer là où elle se tient. L’étape trois est le chemin rapide : choisir une surface, c’est-à-dire une partie nommée de l’app, comme le bandeau ou la porte. L’étape quatre vous montre alors ce que vous pouvez y changer, en mots simples : ses mots, son ordre, sa couleur, ou un bloc ajouté à l’Accueil, et l’aperçu suit chaque changement aussitôt.''')
rep('''    "Step four, keep and ship": { s: "Étape quatre, garder et livrer", t: "📦 Étape quatre : garder et livrer", b: "La quatrième étape garde votre travail et, le moment venu, le livre. Téléchargez le fichier modifié : il porte vos changements en lui, et s’ouvre donc de la même façon sur n’importe quel appareil. Vous pouvez aussi exporter seulement vos modifications dans un petit fichier et les relire plus tard.''',
    '''    "Step five, download the app": { s: "Étape cinq, télécharger l’app", t: "📦 Étape cinq : télécharger l’app", b: "La cinquième étape livre votre travail, le moment venu. Téléchargez l’app : elle porte vos changements en elle, et s’ouvre donc de la même façon sur n’importe quel appareil. Ses trois parties donnent l’identité de l’app, le fichier seul, et les modifications elles-mêmes, que vous pouvez exporter dans un petit fichier et relire plus tard.''')

# 2c. THE FORGE'S OWN WORDS AGREE WITH ITS ROOMS. Measured in the rendered rooms: each module has four questions in
#     Assessments (12 modules a year, 144 questions over three years), and Term 1 of year 1 holds four modules of two
#     lessons, eight in all. Magister's tip and the Guidebook said five questions for each unit, and Term 1's line said
#     twelve lessons.
rep("Each unit has its lessons in the Curriculum, its five questions in Assessments, and its place on the path in Ascensus.",
    "Each module has its lessons in the Curriculum, its four questions in Assessments, and its place on the path in Ascensus.")
rep("<li><b>Assessments</b>: five questions for each unit, answers explained, nothing kept.</li>",
    "<li><b>Assessments</b>: four questions for each module, answers explained, nothing kept.</li>")
rep("HTML: the grammar of a page. Twelve lessons, each one a tag you have already met in your own apps.",
    "HTML: the grammar of a page. Eight lessons, each on tags you have already met in your own apps.")

# 3. THE EDITING SWITCH: the apps come carried inside the Forge (pass 632)
rep("You rarely need to press it: when you choose a file, the Forge reads what the file says about itself and moves the switch for you, and a line under it says so, with a button to go back.\",",
    "You rarely need to press it: when you choose a file, the Forge reads what the file says about itself and moves the switch for you, and a line under it says so, with a button to go back. The switch comes stocked: the Forge carries Carpe Diem, Inkwell and Ingenium inside its own page, with a copy of itself, and keeps them on this device on its first start, each checked against its fingerprint, so choosing one opens it at once.\",")
rep("et une ligne en dessous le dit, avec un bouton pour revenir.\", tip:",
    "et une ligne en dessous le dit, avec un bouton pour revenir. Le sélecteur arrive garni : la Forge porte Carpe Diem, Inkwell et Ingenium dans sa propre page, avec une copie d’elle-même, et les garde sur cet appareil à son premier démarrage, chacune vérifiée par son empreinte ; en choisir une l’ouvre aussitôt.\", tip:")

# 4. FILES, before the Library (its second tab)
FILES_EN = '''    {
      chap: "Making and keeping", sub: "Files",
      go: function () { roomThenRing("files", "#room-files", 360); },
      en: {
        t: "\\ud83d\\uddc4\\ufe0f Files",
        b: "Here is Files, everything you keep on this device: pages, pictures, notes, data, and whatever else you bring in. Bring in files keeps them in the device's own store, never sent anywhere. Choose one to read it, or to edit it as text and keep the change, and Show it on the right opens a page in the preview. Start something new begins a page from nothing, and the Library waits as the second tab.",
        tip: "Bring a file in once and it stays. You never have to find it on your device again."
      }
    },
    {
      chap: "Making and keeping", sub: "The Library",'''
rep('''    {
      chap: "Making and keeping", sub: "The Library",''', FILES_EN)

# 5. YOUR DAYS: Focus, the Inbox, the Agenda and Projects, before Learning to code
DAYS_EN = '''
    /* ---------- Your days (pass 633) ---------- */
    {
      chap: "Your days", sub: "Focus",
      go: function () { roomThenRing("focus", "#room-focus", 360); },
      en: {
        t: "\\ud83e\\udded Focus",
        b: "Here is Focus, support that fits how you build: Now shows where you are and the routine that suits the hour; Steps breaks a task into three to five small steps and shows one at a time; Time keeps the hour large, with a focus session of ten to forty five minutes and the Clepsydra; Calm turns the screen down; and Today in the Forge gathers what waits on you. Each support has its own switch under Your supports. Carpe Diem and Ingenium carry the same supports, in their own colours.",
        tip: "When starting is the hard part, press Just start. Two minutes is all it asks."
      }
    },
    {
      chap: "Your days", sub: "The Inbox",
      go: function () { toForge(); ring("#cd-thought-fab"); },
      en: {
        t: "\\ud83d\\udcad The Inbox",
        b: "Ringed at the side is the thought bubble. When a thought arrives in the middle of work, catch it and carry on: press it, or Ctrl and the full stop anywhere, and a small panel opens for the words. Keep sends them to the Inbox in Focus, which holds them until you send each one where it belongs; the minus puts a thought away with the bubble, which counts what waits, as the bell does.",
        tip: "Catch the thought, then go straight back to the work. The Inbox keeps it for later."
      }
    },
    {
      chap: "Your days", sub: "The Agenda",
      go: function () { roomThenRing("agenda", "#room-agenda", 360); },
      en: {
        t: "\\ud83d\\udcc5 The Agenda",
        b: "Here is the Agenda, your days of labour laid out: plan the week, keep the day. The arrows move to past and future days and Today comes back. This week shares the days between building and packaging, and it is always fine to swap a day; Choose your ship date and a deadline shape the week; and Today's labours lists the small tasks for the day, to tick as you go.",
        tip: "Pick what fits your energy each morning. The week is a plan, not a promise."
      }
    },
    {
      chap: "Your days", sub: "Projects",
      go: function () { roomThenRing("projects", "#room-projects", 360); },
      en: {
        t: "\\ud83c\\udfaf Projects",
        b: "Here is Projects, the apps you are building and the road to shipping each one. Each app has its own card, standing in Building, Testing or Shipped, and opening a card shows its road one step at a time. The tabs give the Overview, the Builds, the Plan, the Milestones and the Sources.",
        tip: "Keep one card per app. Its road shows the next step, so you never have to hold the whole plan in your head."
      }
    },

    /* ---------- Learning to code ---------- */'''
rep('''
    /* ---------- Learning to code ---------- */''', DAYS_EN)

# 6. IN CLOSING, with the rooms the tour now visits
rep("You have walked the whole Forge: the mark and the rail, the preview and the save corner, the Editor and the Bakery, Compose and the Library and the Workshop, Magister and its rooms, the Reckoner and Fontes, your apps and your Settings.",
    "You have walked the whole Forge: the mark and the rail, the preview and the save corner, the Editor and the Bakery, Compose, Files and the Library and the Workshop, Focus and the Inbox, the Agenda and Projects, Magister and its rooms, the Reckoner and Fontes, your apps and your Settings.")
m = re.search(r'"In closing": \{ s: "Pour finir", t: "[^"]*", b: "([^"]*)"', s)
if not m:
    raise SystemExit("no French closing card")
fr_close = m.group(1)
a = re.search(r"Vous avez parcouru toute la Forge : [^.]*\.", fr_close)
if not a:
    raise SystemExit("the French closing card does not list the rooms as expected: %r" % fr_close[:200])
rep(a.group(0), "Vous avez parcouru toute la Forge : la marque et le rail, l’aperçu et le coin de sauvegarde, Editor et Bakery, Compose, Files, Library et Workshop, Focus et la Boîte, Agenda et Projects, Magister et ses pièces, Reckoner et Fontes, vos apps et vos Settings.")

# 7. THE FRENCH FOR THE NEW CARDS, and their chapter
rep('"Making and keeping": "Faire et garder", ', '"Making and keeping": "Faire et garder", "Your days": "Vos journées", ')
FR_NEW = '''    "Files": { s: "Files", t: "🗄️ Files", b: "Voici Files, tout ce que vous gardez sur cet appareil : pages, images, notes, données, et tout ce que vous y apportez. Apporter des fichiers les garde dans le stockage de l’appareil, jamais envoyés nulle part. Choisissez-en un pour le lire, ou pour le modifier comme du texte et garder le changement ; une page peut aussi s’ouvrir dans l’aperçu, à droite. Vous pouvez partir d’une page vide, et Library attend en second onglet.", tip: "Apportez un fichier une fois et il reste. Vous n’avez plus jamais à le chercher sur votre appareil." },
    "Focus": { s: "Focus", t: "🧭 Focus", b: "Voici Focus, un soutien taillé pour votre façon de construire : Maintenant montre où vous en êtes et la routine qui convient à l’heure ; Étapes découpe une tâche en trois à cinq petites étapes et n’en montre qu’une à la fois ; Le temps garde l’heure en grand, avec une séance de dix à quarante-cinq minutes et la Clepsydre ; Calme baisse l’écran ; et une carte rassemble ce qui vous attend aujourd’hui. Chaque aide a son interrupteur sous Vos aides. Carpe Diem et Ingenium portent les mêmes aides, dans leurs couleurs.", tip: "Quand commencer est le plus dur, appuyez sur Juste commencer. Deux minutes, c’est tout ce qu’il demande." },
    "The Inbox": { s: "La Boîte", t: "💭 La Boîte", b: "Entourée sur le côté, la bulle de pensée. Quand une pensée arrive au milieu du travail, attrapez-la et continuez : appuyez dessus, ou sur Ctrl et le point n’importe où, et un petit panneau s’ouvre pour les mots. Garder les envoie dans la Boîte de Focus, qui les tient jusqu’à ce que vous envoyiez chacune là où elle va ; le moins range une pensée avec la bulle, qui compte ce qui attend, comme la cloche.", tip: "Attrapez la pensée, puis revenez droit au travail. La Boîte la garde pour plus tard." },
    "The Agenda": { s: "Agenda", t: "📅 Agenda", b: "Voici Agenda, vos journées de labeur étalées : prévoir la semaine, tenir la journée. Les flèches vont aux jours passés et à venir, et Aujourd’hui ramène au présent. Cette semaine partage les jours entre construire et empaqueter, et l’on peut toujours échanger un jour ; Choisir la date de sortie et une échéance donnent forme à la semaine ; et Les labeurs du jour liste les petites tâches du jour, à cocher au fil de l’eau.", tip: "Choisissez chaque matin ce qui convient à votre énergie. La semaine est un plan, pas une promesse." },
    "Projects": { s: "Projects", t: "🎯 Projects", b: "Voici Projects, les apps que vous construisez et la route jusqu’à la sortie de chacune. Chaque app a sa carte, rangée dans En construction, En test ou Sortie, et ouvrir une carte montre sa route une étape à la fois. Les onglets donnent la Vue d’ensemble, les Versions, le Plan, les Jalons et les Sources.", tip: "Gardez une carte par app. Sa route montre l’étape suivante : vous n’avez jamais à tenir tout le plan en tête." },
    "In closing": { s: "Pour finir",'''
rep('''    "In closing": { s: "Pour finir",''', FR_NEW)

# 8. THE LESSON AFTER THE CARRIED APPS ARE KEPT names the fingerprints they were checked against
rep("if(!failed && kept.length){ try{ B().teach('libKept',{n:kept.length+same.length+hers.length}); }catch(e){} }",
    "if(!failed && kept.length){ try{ B().teach('libKeptBi',{n:kept.length+same.length+hers.length}); }catch(e){} }")
rep("  b.lesson('libOpened', function(v){",
    """  b.lesson('libKeptBi', function(v){ return fr()
    ? 'Vos apps sont maintenant dans l’<b>IndexedDB</b> de cet appareil : le classeur du navigateur pour les gros fichiers, à part des petites notes de <code>localStorage</code>. La Forge les porte dans sa propre page ; avant de garder chacune, elle a calculé son <b>SHA-256</b>, une empreinte de 64 lettres et chiffres qui change entièrement si une seule lettre du fichier change, et l’a comparée à celle qu’elle écrit à côté de chaque copie qu’elle porte. Essayez : choisissez une autre app ci-dessus, elle s’ouvre aussitôt.'
    : 'Your apps are now in this device’s <b>IndexedDB</b>: the browser’s own filing cabinet for big files, kept apart from the small notes in <code>localStorage</code>. The Forge carries them inside its own page; before keeping each one, it worked out its <b>SHA-256</b>, a fingerprint of 64 letters and digits that changes completely if a single letter of the file changes, and compared it with the one written beside each copy it carries. Try it: choose another app above and it opens at once.'; });
  b.lesson('libOpened', function(v){""")

if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude\.ai", s[:200000]):
    raise SystemExit("a script from outside that does not belong")
lean = s
os.makedirs(out_dir, exist_ok=True)
open(os.path.join(out_dir, "the_forge_633_lean.html"), "w", encoding="utf-8").write(lean)
print("lean", len(lean.encode("utf-8")), hashlib.sha256(lean.encode("utf-8")).hexdigest())
if not apps_in:
    sys.exit(0)


# 9. THE APPS IT CARRIES (the full page only), each checked here as it goes in, as in pass 632
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
full = lean[:k] + "\n<!-- PASS 633 · the apps the Forge carries (lean copies), and its own page -->\n" + meta_block + "\n" + "\n".join(blocks) + "\n" + lean[k:]
open(os.path.join(out_dir, "the_forge.html"), "w", encoding="utf-8").write(full)
print("full", len(full.encode("utf-8")), hashlib.sha256(full.encode("utf-8")).hexdigest())
for m in metas:
    print("  carries", m["title"], m["version"], m["size"], "bytes,", m["gz"], "compressed")
