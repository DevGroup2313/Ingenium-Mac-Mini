"""Ingenium 6.2 · the editions (23 October 2026). build_page.py reads ING_EDITION and builds one of four.

The owner's words: "I want the demo version of Ingenium on the Offline Project to have the Lector page removed. It should
never be on anything public facing and I want a master version of Ingenium and another full version that does not have all
of my apps and my personal info built in. I want a gift version that does not feature Carpe Diem, The Forge, Ingenium's own
app and Inkwell. I want it to be a blank slate for a new user being gifted the app."

  master  everything (the default), the owner's own: the only edition whose Settings can rename the app (6.7.1).
  full    without the owner's apps and the owner's personal information: Carpe Diem, The Forge and Inkwell are not carried (its app
          library starts empty, for the apps the person adds); no Lector recipe (the owner's rules, verified sources and kinds
          of document); the owner's name is in no commit, signing certificate or app id; Lector and the chat write for whoever uses
          this copy. Since 6.7.1 its name is fixed as Ingenium (no Name card in Settings), as in the gift and demo editions.
  gift    the full edition with no Ingenium of its own to open, edit or package, and without Lector (it reads and writes
          about the owner's four apps by name): a blank slate for the person it is given to, where no page names Carpe
          Diem, The Forge or Inkwell, and Home shows Ingenium's own seal, not the Offline Project's crest.
  demo    the full edition without Lector and with no Ingenium of its own, for the Offline Project's public pages, beside
          the other apps of the family. Lector's page, its parts and modules, its Home card and its tour cards are not in
          the page at all.

6.27 (5 November 2026). Her words: "The Ingenium edition that will be made available to the public and participants and even friends
and family will only have the Home, Chat, Code, Folders, Focus, Models, Blend, Build, No apps, and the Guide and Settings page without
the Author Studio and its functions. The Lector, Career and Fabrica page as well as the Author Studio and the rename Ingenium and Author
key function are only reserved for my master edition and the "Full" edition with some limitations such (no renaming Ingenium, and no
Author Studio as well as no Author key generation. The Full edition will be a gift to my partner so it will contain the apps and the
Lector page, the Career Studio and Fabrica but it will not have any of the apps from the Offline Project built in and it will not have
their skills and information or any of my profile information".
  gift and demo  the public editions: Home, Chat, Code, Folders, Focus, Models, Blend, Build, the Guide and Settings, nothing else. Neither
          carries the five apps (Tabula, Abacus, Imago, Scriba, Fontes; build_page.py leaves them out, and their modules r118, r123,
          r193 and r194 are not in the page), nor shows Fabrica (its code stays, as Build and the chat call it; its page, key, route,
          tour, help and every word of it are gone: modules/r231.js and _public() below). Lector and the Career Studio were already
          left out. Ingenium's own reference database (the chat's My sources, called Fontes) and its model house Scriba stay: they are
          not the apps of those names.
  full    keeps the five apps, Lector, the Career Studio and Fabrica; no Name card, no owner's key (the owner's key is the master's
          alone: modules/r162.js), no Author Studio; and now none of the owner's other apps by name either: the gift edition's
          _blank() applies to it too, and Lector and the app library know Ingenium alone (no Carpe Diem, The Forge or Inkwell waiting
          as "Not added yet").
ING_HAS(part) in the page answers "author", "rename" and "ownerkey" (the master only), "fabrica", "desk", "lector" and "career"
(the master and full editions).

Every edition keeps the copyright line and the licence. Each change here must find its text exactly as many times as it
says, so a change to the page that moves one stops the build instead of leaving it undone."""
import os, re, sys

EDITIONS = ("master", "full", "gift", "demo")


def name():
    e = os.environ.get("ING_EDITION", "master").strip().lower() or "master"
    if e not in EDITIONS:
        sys.exit("ING_EDITION must be one of " + ", ".join(EDITIONS) + ", not " + repr(e))
    return e


# the modules an edition leaves out
def skip_modules(ed):
    if ed == "master":
        return {"r231.js"}  # 6.27: the public editions' own pages
    out = {"r126.js"}  # Lector's recipe: the owner's rules, verified sources and kinds of document
    out |= {"r226.js"}  # 6.18: the author's workshop, the master's alone ("I want that capability added to my master version")
    out |= {"r227.js"}  # 6.19: her own page in place of the built one, the master's alone, with the Workshop
    out |= {"r236.js"}  # 6.37: the Author Studio, the room behind the rooms, the master's alone, with the Workshop it holds
    out |= {"r246.js"}  # 6.48: the Offline Project made from her apps in Fabrica, the master's alone (it gathers her four apps)
    out |= {"r268.js"}  # 6.77: the demonstrations the master edition carries for it (her apps' demos), the master's alone
    out |= {"r275.js"}  # 6.82: puts back the copy of itself an app carried inside the page leaves out; only the master carries the apps
    out |= {"r258.js"}  # 6.65: her build library on the Folders page, the master's alone (it names her apps; modules/r208.js calls it only where it is)
    if has_fabrica(ed) and carries_desk(ed):
        out |= {"r231.js"}  # 6.27: only the public editions take away what they do not have
    if not has_fabrica(ed):
        out |= {"r260.js"}  # 6.66: Fabrica's depth and motion, where there is a Fabrica
        out |= {"r276.js"}  # 6.83: Fabrica brings everything from GitHub, where there is a Fabrica
    if not carries_desk(ed):
        out |= {"r118.js", "r123.js", "r193.js", "r194.js"}  # 6.27: the five apps, the Desk, their stones, a document opened in its app
    if not has_lector(ed):
        out |= {"r107.js", "r108.js", "r148.js"}  # Lector, as approved; how it reads; how it writes
        out |= {"r188.js"}  # 6.8.3: the Career Studio, which writes with Lector ("Please keep the Lector page and the new Career Studio page off the demo and its tour")
        out |= {"r283.js", "r290.js"}  # 6.93: the counsellor, and the heads of the Career Studio and Lector, where those pages are
        out |= {"r293.js"}  # 6.94: the Career Studio's compass, turned on (held), where that page is
    return out


def has_lector(ed):
    return ed in ("master", "full")


def carries_apps(ed):
    """Whether the page carries Carpe Diem, The Forge and Inkwell inside it."""
    return ed == "master"


def carries_desk(ed):
    """6.27: whether the page carries the five apps of the Desk (Tabula, Abacus, Imago, Scriba, Fontes)."""
    return ed in ("master", "full")


def has_fabrica(ed):
    """6.27: whether Fabrica is a page of this edition."""
    return ed in ("master", "full")


# ---- the changes, made on the finished page: (old, new, label, times) ----
def _personal():
    """The owner's name, repositories and app ids, out of every edition but the master."""
    E = []
    E.append(('var ING_EDITION="master";', None, "the edition", 1))  # filled in by edits()
    # the app library: in the master and full editions (the full one carries no app, but Lector reads what the person adds)
    E.append(('function libOn(){return ING_EDITION!=="public";}', 'function libOn(){return ING_EDITION==="master"||ING_EDITION==="full";}',
              "the app library: the master and full editions'", 1))
    E.append(('if(!n&&typeof ING_EDITION!=="undefined"&&ING_EDITION==="master")n="Yannie D. Forest";return n;}',
              'return n;}', "Lector's author: the persona's name only", 1))
    E.append(('var who={name:"Yannie D. Forest",email:""};', 'var who={name:"",email:""};', "Git: no author until one is set", 1))
    # a key made on this device names whoever this copy belongs to, never the owner
    E.append(('UTF8S("Yannie D. Forest")',
              'UTF8S((function(){try{return String(personaGet().name||"").trim();}catch(e){return "";}})()||cn||"Ingenium")',
              "signing certificate: the person's own name", 1))
    # 6.5: two more, the example in the Mac and Windows makers' "cannot be an app id" (modules/r170.js)
    E.append(('com.yannieforest.', 'app.ingenium.', "app ids: a neutral prefix", 16))
    E.append(('com.yannie.carpediem', 'app.ingenium.carpediem', "app ids: a neutral prefix (Carpe Diem's)", 4))
    E.append(('"DevGroup2313/Ingenium-', '"Ingenium-', "the build files: no account named", 4))
    # Fabrica: the name a Fire tablet's icon points to is the app's own, not the owner's (modules/r139.js)
    E.append(("The name a home screen icon already points to. An app the Forge built, or one built online from its project, for the Fire tablet uses app.ingenium.carpediem.MainActivity; keep it,",
              "The name a home screen icon already points to: keep it,", "Fabrica: the icon's name", 1))
    # Fabrica brings no app in from an app library this edition does not keep (modules/r112.js)
    E.append(('sh.box.appendChild(opt("♦","From your app library",', 'if(libOn())sh.box.appendChild(opt("♦","From your app library",',
              "Fabrica: no app library to bring from", 1))
    # the chat's fast mode and Lector speak of whoever uses the app
    E.append(('(a document, page or app she asks for is still written in full)',
              '(a document, page or app the person asks for is still written in full)', "fast mode: the person", 1))
    return E


def _lector_voice():
    """Lector's instructions to the model, in the base page (R86) and in modules/r108.js, call the author "her" and "she". In
    the full edition, the other one with Lector, Lector writes for whoever uses it."""
    return [
        ("write a 'Projects' section for her résumé", "write a 'Projects' section for their résumé", "Lector: résumé", 1),
        (": what she built, why, the skills it shows", ": what they built, why, the skills it shows", "Lector: cover letter", 1),
        ("Here is the owner's current version, for her voice and what to keep or replace",
         "Here is the owner's current version, for their voice and what to keep or replace", "Lector: current version", 1),
        (": what she built and why, what it shows about her skills and judgement",
         ": what they built and why, what it shows about their skills and judgement", "Lector: portfolio", 1),
        ("THE OWNER'S CURRENT VERSION (keep her voice;", "THE OWNER'S CURRENT VERSION (keep their voice;", "Lector: keep the voice", 1),
        ("Keep her structure, her voice and everything still true", "Keep their structure, their voice and everything still true",
         "Lector: dossier section", 1),
        ("in the first person as her, in clear, exact prose", "in the first person as the author, in clear, exact prose",
         "Lector: first person", 1),
        ("Keep the first person and her voice, and the placeholders", "Keep the first person and the author's voice, and the placeholders",
         "Lector: refine", 1),
        ("add none that is not on the list of her sources.", "add none that is not on the list of the author's sources.",
         "Lector: sources", 1),
        ("HER CV (the only source of facts about her: names, dates, posts, qualifications)",
         "THE AUTHOR'S CV (the only source of facts about the author: names, dates, posts, qualifications)", "Lector: CV", 1),
        ("HER OWN WRITING (match its voice", "THE AUTHOR'S OWN WRITING (match its voice", "Lector: own writing", 1),
        ("HER PAST COVER LETTERS (for their shape", "THE AUTHOR'S PAST COVER LETTERS (for their shape", "Lector: past letters", 1),
        ("HER SOURCES (kept in Fontes;", "THE AUTHOR'S SOURCES (kept in Fontes;", "Lector: Fontes", 1),
        ('"\\n    Her note: "', '"\\n    The author\'s note: "', "Lector: a source's note", 1),
    ]


def _no_self():
    """No Ingenium of its own in Code's or Build's list of apps, in every edition but the master (until 6.43 the full edition
    kept it for a permission of the owner's that allowed "edit"; her answer of 6 November 2026: "Yes please remove the \"edit\",
    it can go too")."""
    return [
        ('    if(!L.some(function(a){return a.key==="ingenium";})&&location.protocol!=="file:")L.push({key:"ingenium-self",name:"Ingenium (this copy)",version:ING_VERSION});return L;},',
         '    return L;},', "no Ingenium (this copy) among the apps", 1),
    ]


OWN_PAGE_JS = r'/\bvar ING_EDITION\s*=/.test(H)&&/__ingParts/.test(H)'
OWN_PAGE_SAYS = "This is Ingenium's own page. Only its owner makes apps of Ingenium."


def _open_words(ed):
    """6.43: the words of Build's Open key (modules/r138.js) and its help (r144.js) name only what this edition opens: no
    Ingenium itself outside the master; in the public editions no app library and no Fabrica either."""
    if ed == "full":
        a, b, c = ("Your apps, an app in Fabrica, or a page from this device", "Your apps, an app in Fabrica, or a sample.",
                   "Opens your apps, an app in Fabrica, or a file.")
    else:
        a, b, c = ("A page from this device", "A page from this device, or a sample.", "Opens a page from this device, or a sample.")
    return [
        ("Your apps, Ingenium itself, an app in Fabrica, or a page from this device", a, "Build: what Open opens", 1),
        ("Your apps, Ingenium itself, an app in Fabrica, or a sample.", b, "help: what Open opens", 1),
        ("Opens your apps, Ingenium itself, an app in Fabrica, or a file.", c, "the tour: what Open opens", 1),
    ]


def _no_self_kit():
    """6.43, the owner's words (6 November 2026): "Please remove the option to download Ingenium as an app from the Build page and
    only leave it in the master edition and nowhere else, I should be only person with access to it, I don't want others to be
    able to ship and produce variations of my app without my expressed consent and permission." Every edition but the master
    (until 6.42 the full edition kept the choice, hidden until a permission allowed "package"): no install kit of Ingenium itself
    on the Build page, the kits make a new app only, and a kit or a Fabrica package refuses a page that is Ingenium's own (the
    marks every Ingenium page carries: its edition's variable and the parts' register). A new app of the person's own is still
    packaged. A copy someone has altered by hand cannot be stopped from inside a page; this closes the ways the page offers."""
    return [
        ('<label class="kit-opt"><input type="radio" name="kitWhat" value="self" checked><span><b>Ingenium itself</b> <span class="small muted">to rebuild it or publish an update</span></span></label>',
         '', "the install kit: no Ingenium itself", 1),
        ('<input type="radio" name="kitWhat" value="editor">', '<input type="radio" name="kitWhat" value="editor" checked>',
         "the install kit: the app in the editor", 1),
        ('function kitWhat(){var r=document.querySelector(\'input[name="kitWhat"]:checked\');return r?r.value:"self";}',
         'function kitWhat(){return "editor";}', "the install kit: a new app only", 1),
        ("  if(!who.isNew)return kitOwnPage();",
         "  if(!who.isNew)return Promise.reject(new Error(\"Only the owner's edition makes Ingenium itself.\"));", "the install kit: never Ingenium's own page", 1),
        ('  if(!code.trim())return Promise.reject(new Error("The editor above is empty: write or open the app there first."));\n  return Promise.resolve(code);}',
         '  if(!code.trim())return Promise.reject(new Error("The editor above is empty: write or open the app there first."));\n'
         '  var H=code;if(' + OWN_PAGE_JS + ')return Promise.reject(new Error("' + OWN_PAGE_SAYS + '"));\n  return Promise.resolve(code);}',
         "the install kit: not Ingenium's own page from the editor", 1),
        # Fabrica (modules/r111.js): every package passes through the page it assembles, and the web app reads its page itself
        ("function onePageFrom(id,snap,page,html){var cache={},missing=[],n=0,big=0;",
         "function onePageFrom(id,snap,page,html){var H=String(html||\"\");if(" + OWN_PAGE_JS + ")return Promise.reject(new Error(\"" + OWN_PAGE_SAYS + "\"));var cache={},missing=[],n=0,big=0;",
         "Fabrica: no package of Ingenium's own page", 1),
        ("return readText(id,snap.commit,page).then(function(html){var hasMan=",
         "return readText(id,snap.commit,page).then(function(html){var H=String(html||\"\");if(" + OWN_PAGE_JS + ")throw new Error(\"" + OWN_PAGE_SAYS + "\");var hasMan=",
         "Fabrica: no web app of Ingenium's own page", 1),
    ]


def _blank(ed="gift"):
    """The gift edition names none of the owner's other apps, and Home's plaque shows Ingenium's own seal, not the Offline
    Project's crest of four apps. 6.27: the full edition too; the words about the five apps (modules r118 and r123) only where
    the edition carries them."""
    desk = carries_desk(ed)
    E = [
        ('IngSeal.el(["cd","forge","ingenium","inkwell"],{night:"auto",live:true,size:300})',
         'IngSeal.el(["ingenium"],{night:"auto",live:true,size:300})', "Home: Ingenium's seal alone", 1),
        ('["Carpe Diem","The Forge","Ingenium","Inkwell"].forEach(function(n,i){', '["Ingenium"].forEach(function(n,i){', "Home: the plaque's line", 1),
        ('var ph=mk("h2","hx-sr","The Offline Project");', 'var ph=mk("h2","hx-sr","Ingenium");', "Home: the plaque's name", 1),
        ('side.setAttribute("aria-label","The Offline Project, your models and this device");',
         'side.setAttribute("aria-label","Ingenium, your models and this device");', "Home: the side column's name", 1),
        ('im.alt="The master logo of The Offline Project";', 'im.alt="The logo of Ingenium";', "Home: the plaque's picture", 1),  # 6.74: logo, not seal
        # 6.77: the build library is the master edition's alone (modules/r258.js), so the news of Folders does not speak of it here
        ("Every folder is an index card with its seal, the build library a bound book, the ways of bringing in your work envelopes in a tray",
         "Every folder is an index card with its seal, the ways of bringing in your work envelopes in a tray", "Guide: the 6.69 news, without the build library", 1),
        ("with words you can read at that size, and the build library's volume stands above its words. On a wider screen",
         "with words you can read at that size. On a wider screen", "Guide: the 6.71 news, without the build library", 1),
        # 6.74: the news of logo, not seal, without the Offline Project's master logo, which only the master edition carries
        ('["6.74","The Career Studio\'s documents and Tabula, Abacus and Imago say logo too: the master logo of the Offline Project, each app\'s logo on a document, the logo studio and Tabula\'s watermarks.","career"]',
         '["6.74","The Career Studio\'s documents and Tabula, Abacus and Imago say logo too: each app\'s logo on a document, the logo studio and Tabula\'s watermarks.","career"]',
         "What is new: logo, not seal, without the Offline Project", 1),
        ("Carpe Diem's own apps open on the Desk; the instruments open over this page.", "These apps open on the Desk; the instruments open over this page.",
         "Home: the apps", 1),
        # About, the chat, Fabrica, the apps, Focus, the tour and the Guide
        ("Your own studio for local AI models, in the family of Carpe Diem and The Forge. It runs", "Your own studio for local AI models. It runs",
         "About: what it is", 1),
        ("One page (.html), with its scripts and styles inside it: Carpe Diem, The Forge, Inkwell or Ingenium.</span>",
         "One page (.html), with its scripts and styles inside it.</span>", "the chat: an app file", 1),
        ('"Carpe Diem, My Notes…"', '"My Notes, Garden Planner…"', "Fabrica: a new app's name", 1),
        ("A package of The Forge or Ingenium installs over one built online from its project when", "A package installs over one built online from its project when",
         "Fabrica: the signing key", 1),
        (": the same Tabula as in Carpe Diem, with", ", with", "Tabula: what it is", 2),
        (": the same Abacus as in Carpe Diem, with", ", with", "Abacus: what it is", 2),
        ("whole: the same app as in Carpe Diem, with", "whole, with", "Tabula and Abacus: what they are", 1),
        ('" is part of Carpe Diem, not of Ingenium."', '" is not part of this Ingenium."', "an app this copy does not hold", 1),
        (" Carpe Diem and the Forge carry the same supports, in their own colours.", "", "Focus: the supports", 1),
        ('"📚 The apps, as in Carpe Diem"', '"📚 The apps"', "tour: the apps", 1),
        ("are Carpe Diem's own apps, whole.", "are apps of their own, whole.", "tour: the apps, whole", 1),
        ("Build, Blend, and Carpe Diem's five apps.", "Build, Blend, and the five apps.", "tour: making things", 1),
        ("Build, Blend and Carpe Diem's five apps turn answers", "Build, Blend and the five apps turn answers", "tour: making things, again", 1),
        ("Out of session, as in Carpe Diem. Starting Clepsydra", "Out of session. Starting Clepsydra", "Guide: your status", 1),
        # 6.69: Folders' drawer (modules/r263.js) names and draws only Ingenium's own seal here; any other app has its coin
        ("its app's own seal (Carpe Diem, The Forge, Ingenium and Inkwell carry theirs, by day and by night as your Display is; any other app has a coin with its first letter)",
         "its app's own seal (Ingenium carries its own, by day and by night as your Display is; any other app has a coin with its first letter)",
         "Guide: the 6.69 news, Ingenium's seal alone", 1),
        ('return n==="carpe diem"?"cd":/^(the )?forge$/.test(n)?"forge":n==="ingenium"?"ingenium":n==="inkwell"?"inkwell":null;}',
         'return n==="ingenium"?"ingenium":null;}', "Folders: Ingenium's seal alone", 1),
    ]
    if not desk:  # their words left the page with the apps (modules r118 and r123)
        E = [e for e in E if e[2] not in ("Tabula: what it is", "Abacus: what it is", "Tabula and Abacus: what they are",
                                          "an app this copy does not hold", "tour: the apps", "tour: the apps, whole",
                                          "tour: making things", "tour: making things, again")]
    return E


def _no_lector():
    """Lector's page is not in the page: no key, no section, no route. Its parts and modules are cut by cut_parts() and
    skip_modules()."""
    return [
        ("""<button class="nav-btn" data-page="lector" onclick="go('lector')">""", None, "Lector's key", 1),  # the whole line, below
        ('    <!-- LECTOR: a whole app or a long document, read with your own model -->\n', '', "Lector's section: its note", 1),
        ('<section class="section" id="page-lector">', None, "Lector's section", 1),  # the whole section, below
        ('var PAGES=["home","chat","focus","models","blend","lector","build",', 'var PAGES=["home","chat","focus","models","blend","build",',
         "no route to Lector", 1),
        ('  if(page==="lector"){try{lxRender();}catch(e){}}\n', '', "no Lector to draw", 1),
        # the part that remains of R86 is the chat's document maker (cut_parts)
        ('"p16":"Lector (reading and writing documents)",', '"p16":"Documents (Word, a web page, Markdown)",', "the list of parts", 1),
    ]


def _no_lector_words():
    """What the page says where Lector is not: each line a person can see, said without it. A ("CUT", first, last) edit
    takes out everything from its first text to its last, both included. What is left of Lector after these (code that only
    ran beside it) is renamed by strip() and checked."""
    return [
        # the Blend page, in the base page and again in modules/r117.js
        ('blPaintNote("The engine is busy (a chat reply or Lector). Let it finish, then run the blend.","bad")',
         'blPaintNote("The engine is busy with a chat reply. Let it finish, then run the blend.","bad")', "Blend: the engine busy", 2),
        ('try{if(window.Lector&&Lector.LX&&Lector.LX.busy){blPaintNote("Lector is using the engine. Let it finish or stop it on the Lector page first.","bad");return;}}catch(e){}',
         '', "Blend: no Lector at work", 2),
        # Fontes (modules/r115.js)
        ("Ingenium formats them with citeproc-js, the engine Zotero uses; Lector cites them in your documents.</p>",
         "Ingenium formats them with citeproc-js, the engine Zotero uses.</p>", "Fontes: who cites them", 1),
        # the tour's chapters, the export and the recovery shelf (modules/r117.js)
        ('if(ING_TOUR.some(function(s){return s.chap==="Lector";}))return;',
         'if(ING_TOUR.some(function(s){return s.chap==="Fabrica"&&s.sub==="Your apps as repositories";}))return;', "tour: added once", 1),
        (("CUT", "  var lector=[\n", 'and no source that is not yours is ever invented."}];\n'), "", "tour: no Lector chapter", 1),
        ('insertAfterChap("Making things",lector);', '', "tour: no Lector chapter placed", 1),
        ('ING_TOUR_TEASERS.Lector=ING_TOUR_TEASERS.Lector||"the reader that writes your documents.";', '', "tour: no Lector teaser", 1),
        ("""    +'<label><input type="checkbox" id="exLector" checked> Lector\\'s documents, each as a Word file and as Markdown</label>'\n""",
         '', "export: no Lector documents to tick", 1),
        ('var wantL=on("exLector"),wantF=on("exFabrica");', 'var wantL=false,wantF=on("exFabrica");', "export: none to carry", 1),
        ("Lector's documents are Word files, with the same text as Markdown beside each. ", "", "export: its README", 1),
        ("Lector's readings and documents, Fabrica's repositories", "Fabrica's repositories", "the recovery shelf", 1),
        # Today (modules/r121.js)
        ("a thought that asked to come back, a reading Lector is part way through, and your focus sessions.",
         "a thought that asked to come back, and your focus sessions.", "Today: what waits", 1),
        # Build's list of apps (modules/r138.js)
        ("No app is kept on this device yet: add yours in Lector (Add your apps) or bring one into Fabrica.",
         "No app is kept on this device yet: bring one into Fabrica, or open a page from this device.", "Build: no app yet", 1),
        # Storage (modules/r142.js)
        ("Files and pages your chats, Lector, Code and Build hold", "Files and pages your chats, Code and Build hold", "Storage: long texts", 1),
        ("Checked first against your chats, Lector's documents and readings, Code, Ask Lector's versions, the app library, the recovery shelf and every other store",
         "Checked first against your chats, Code, the recovery shelf and every other store", "Storage: what is checked", 1),
        # Backup and moving (modules/r143.js)
        ('row("Lector\'s documents",bc.lector,hc.lector,rep?bc.lector:mc.lector);', '', "Backup: no Lector row", 1),
        ("Fabrica's apps, Lector's documents and the stores here are left as they are.", "Fabrica's apps and the stores here are left as they are.",
         "Backup: an older backup", 1),
        ("Open a conversation, an app in Fabrica and a Lector document to see that all is there.",
         "Open a conversation and an app in Fabrica to see that all is there.", "Backup: check after", 1),
        ("their issues and pages, Lector\\'s documents, your app library and the large store.", "their issues and pages, and the large store.",
         "Backup: what it holds", 1),
        ("For everything in one file, with Fabrica's apps, Lector's documents and your app library, use ", "For everything in one file, with Fabrica's apps, use ",
         "Backup: the pointer", 1),
        # the help beside each page (modules/r144.js)
        ("Chat, Code, Build, Fabrica, Lector and Focus each have a key.", "Chat, Code, Build, Fabrica and Focus each have a key.", "help: Home's rooms", 1),
        ('  Lector:"Save gives Word, PDF, a web page or Markdown; the dividers between the panels remember where you leave them.",\n', '',
         "help: no Lector tip", 1),
        (("CUT", '  lector:{name:"Lector",tour:["Lector"],', '"Each panel folds away to give the others room."]}},\n'), "", "help: no Lector page", 1),
        ("""  ['.nav-btn[data-page="lector"]',"Lector","Reads your apps and writes the documents you need from them."],\n""", '', "help: no Lector key", 1),
        (("CUT", '  [".l-apps","Your apps","The apps Lector reads.', '"Who the documents are for and what they are for: a portfolio, a job, a programme."],\n'),
         "", "help: none of Lector's parts", 1),
        # Home (modules/r147.js)
        ('"Home Cormorant","Lector Cormorant",', '"Home Cormorant",', "Home: its face", 1),
        ('  {k:"lector",t:"Lector",d:"Reads your apps and writes the documents you need from them."},\n', '', "Home: no Lector key", 1),
        (',["lector","lector","From Lector","lector","Open Lector"]].forEach(', '].forEach(', "Home: no Lector column", 1),
        ('try{fillLector();}catch(e){console.error("R147 lector",e);}', '', "Home: nothing of Lector's to fill", 1),
        (("CUT", 'var LNAMES={cd:"Carpe Diem",forge:"The Forge",ingenium:"Ingenium",inkwell:"Inkwell"},LORDER=',
          'meta("lector",ds.length?plural(ds.length,"document")+" · last "+lower(when(ds[0].made)):"No document yet");}'), "",
         "Home: no Lector documents", 1),
    ]


# the base page's own parts that are Lector's: R86 (Lector reads and writes) and R99 (Lector's documents in the house style).
# R86 also holds the chat's document maker (Word, a web page, Markdown, Tabula), which the chat, Build, Blend and the slides
# use: that much of it stays, found by the names they call (tools/keep_decls.js).
LECTOR_PARTS = ("p16", "p30")
DOC_CORE = ("lxFileName", "lxHtml", "lxSaveMd", "lxSaveWord", "lxToTabula", "lxBlocks", "LX_EM", "lxInline")
TOOLS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tools")


def _node(args):
    import subprocess
    try:
        r = subprocess.run(["node"] + args, capture_output=True, text=True)
    except FileNotFoundError:
        sys.exit("this edition needs Node.js (node) to build")
    if r.returncode:
        sys.exit((r.stderr or r.stdout).strip())
    return r.stdout.strip()


def cut_parts(out, ed):
    if has_lector(ed):
        return out
    import tempfile
    for pid in LECTOR_PARTS:
        head = '<script>try{(window.__ingParts=window.__ingParts||{})["%s"]="started";}catch(_){}' % pid
        tail = ';try{window.__ingParts["%s"]="running";}catch(_){}\n' % pid
        if out.count(head) != 1:
            sys.exit("edition %s: the part %s was not found once" % (ed, pid))
        i = out.index(head)
        j = out.index("</script>", i) + len("</script>")
        if out[j:j + 1] == "\n":
            j += 1
        keep = ""
        if pid == "p16":
            with tempfile.TemporaryDirectory() as d:
                src, dst = os.path.join(d, "in.js"), os.path.join(d, "out.js")
                open(src, "w", encoding="utf-8").write(out[i + len(head):out.index("</script>", i)])
                _node([os.path.join(TOOLS, "keep_decls.js"), src, dst, ",".join(DOC_CORE)])
                core = open(dst, encoding="utf-8").read()
            for a, b in (('s=String(s||"lector")', 's=String(s||"document")'), ('.slice(0,90).trim()||"lector";}', '.slice(0,90).trim()||"document";}')):
                if core.count(a) != 1:
                    sys.exit("edition %s: the document maker's file name: %r not found once" % (ed, a))
                core = core.replace(a, b)
            keep = head + "\n" + core + tail + "</script>\n"
        out = out[:i] + keep + out[j:]
    return out


def assets(ed):
    """Where Lector's modules are left out, the pictures and the faces they carried for others: the seals' layers (Fabrica,
    the seals of each app) and the Cormorant faces (Home), in a script of their own before the modules."""
    if has_lector(ed):
        return ""
    here = os.path.dirname(os.path.abspath(__file__))
    lay = open(os.path.join(here, "lx_layers.json"), encoding="utf-8").read().strip()
    fon = open(os.path.join(here, "lx_fonts.json"), encoding="utf-8").read().strip()
    if "</" in lay or "</" in fon:
        sys.exit("the seals' layers or the faces hold \"</\"")
    return "<script>window.LX7_LAYERS=" + lay + ";window.LX7_FONTS=" + fon + ";</script>\n"


def strip(out, ed):
    """Every edition: the code's own comments out, and the markup's (licence notices, the build's line and its markers kept;
    tools/strip_comments.js), each script then proved to hold the same code (tools/same_code.js). The owner's words (23 October
    2026): "I want you to remove those unecessary stales codes or comments from the code of the app please." Without Lector,
    what is left of Lector is renamed too, and then nothing of Lector is anywhere in the page outside its data.
    ING_KEEP_COMMENTS=1 keeps them (to compare)."""
    if os.environ.get("ING_KEEP_COMMENTS") == "1":
        return out
    import tempfile, json
    word = [] if has_lector(ed) else ["--word", "Lector=Reader"]
    with tempfile.TemporaryDirectory() as d:
        src, mid, dst = os.path.join(d, "in.html"), os.path.join(d, "mid.html"), os.path.join(d, "out.html")
        open(src, "w", encoding="utf-8").write(out)
        owner = ["--keep-owner"] if has_lector(ed) else []  # the owner's authorship notes stay where the owner's name does
        rep = json.loads(_node([os.path.join(TOOLS, "strip_comments.js"), src, mid, "--html"] + owner))
        _node([os.path.join(TOOLS, "same_code.js"), src, mid])
        if word:
            rep["words"] = json.loads(_node([os.path.join(TOOLS, "strip_comments.js"), mid, dst] + word))["words"]
            mid = dst
        out = open(mid, encoding="utf-8").read()
    said = "edition %s: %d comments out (%d whole lines, %d in the markup; %d kept), %d bytes fewer" % (
        ed, rep["cut"], rep["lines"], rep["html"], rep["kept"], rep["before"] - rep["after"])
    if word:
        bare = re.sub(r'(<script type="(?:text/plain|ingenium/[\w-]+|application/json)"[^>]*>)(.*?)(</script>)', r"\1\3", out, flags=re.S)
        left = [m.start() for m in re.finditer(r"Lector", bare)]
        if left:
            sys.exit("edition %s: Lector is still named %d times, first: %r" % (ed, len(left), bare[max(0, left[0] - 120):left[0] + 80]))
        said += ", %d words of Lector's left code renamed" % rep["words"]
    print(said)
    return out


def _fixed_name():
    """6.7.1, every edition but the master. The owner's words (25 October 2026): "I wanted the option to rename the app removed
    from every build or version of the app that is NOT the master version of the app. I only want the master version of the
    app that only I possess on my devices to have that feature and functionality on the Settings page, nowhere else."
    Settings has no Name card; the top bar, Home, the help and the files it saves always say Ingenium, whatever an older copy
    or a backup kept as its name (that value is kept as it was, and shown nowhere). Since 6.45 no edition has a Name card (her
    words: "since I can rename Ingenium inside of the Author Studio, I don't think there is a need to keep that function on the
    Settings page"; build_page.py takes it out of the page), so what is left here keeps the name fixed."""
    return [
        ('function applyBrand(){var n=state.appName||"Ingenium";', 'function applyBrand(){var n="Ingenium";', "the top bar and Home say Ingenium", 1),
        ('function ingAppName(){return ((state.appName||"").trim())||"Ingenium";}', 'function ingAppName(){return "Ingenium";}', "every part asks for Ingenium", 1),
        ('(state.appName||"Ingenium")', '"Ingenium"', "saved files and the system check are named Ingenium", 6),
        ('(esc(state.appName)||"Ingenium")', '"Ingenium"', "the system check names Ingenium", 1),
    ]


def _full_apps():
    """6.27, the full edition: none of the owner's other apps by name. Lector and the app library know Ingenium alone (her words:
    "it will not have any of the apps from the Offline Project built in and it will not have their skills and information")."""
    return [
        ('var LIB_KEYS=["cd","forge","inkwell","ingenium"],', 'var LIB_KEYS=["ingenium"],', "the app library: Ingenium alone", 1),
        # 6.42: any other app the person adds follows Ingenium in Lector (r108's syncApps, modules/r240.js)
        ('var ORDER=["cd","forge","ingenium","inkwell"];\n/* 6.42: any app, not only her four.', 'var ORDER=["ingenium"];\n/* 6.42: any app, not only her four.', "Lector's apps: Ingenium alone (r108; r140's seals keep all four)", 1),
    ]


def _public(ed):
    """6.27, the public editions (gift, demo): Home, Chat, Code, Folders, Focus, Models, Blend, Build, the Guide and Settings. No
    Fabrica and none of the five apps: no key, no route, and no word of them. What is made at run time (Fabrica's key and page, the
    tour's chapters, the keys that send something to an app) is taken away by modules/r231.js."""
    blank = True  # Home already says "These apps", by _blank(), in both public editions
    return [
        # the side bar and the routes of the base page
        ('<div class="grp-label">Apps</div>', None, "the side bar: no Apps group", 1),
        ("""<button class="nav-btn" data-page="tabula" onclick="go('tabula')">""", None, "the side bar: no Tabula", 1),
        ("""<button class="nav-btn" data-page="abacus" onclick="go('abacus')">""", None, "the side bar: no Abacus", 1),
        ('"build","notes","tabula","abacus","guide","settings"];', '"build","notes","guide","settings"];', "no route to Tabula or Abacus", 1),
        # Home (modules/r147.js)
        ('  {k:"fabrica",t:"Fabrica",d:"Your apps as repositories: every version you keep, its checks and its packages."},\n', '', "Home: no Fabrica key", 1),
        (',["fabrica","fabrica","In Fabrica","fabrica","Open Fabrica"]', '', "Home: no Fabrica column", 1),
        ('try{fillFabrica();}catch(e){console.error("R147 fabrica",e);}', '', "Home: nothing of Fabrica's to fill", 1),
        ('var APPS=[\n  {k:"tabula",t:"Tabula",d:"Writing",c:"#8a8172",go:"tabula"},{k:"abacus",t:"Abacus",d:"Tables",c:"#2d9a52",go:"abacus"},\n'
         '  {k:"slides",t:"Imago",d:"Slides",c:"#b34a3c",go:"slides"},{k:"scriba",t:"Scriba",d:"Recordings",c:"#2f5f9e",go:"scriba"},\n'
         '  {k:"fontes",t:"Fontes",d:"Sources",c:"#c9a14a",go:"fontes"},\n', 'var APPS=[\n', "Home: the instruments alone", 1),
        ('var ah2=mk("h2",null,"Your apps");', 'var ah2=mk("h2",null,"Your instruments");', "Home: the instruments' heading", 1),
        (("These apps open on the Desk; the instruments open over this page." if blank else "Carpe Diem's own apps open on the Desk; the instruments open over this page."),
         "The instruments open over this page: loose notes, and sprints of focus.", "Home: what the instruments do", 1),
        # the words of the Guide, the tour and the help
        ("Sort it later: to a note, to Tabula, into steps, to the chat, to a reminder, or done.",
         "Sort it later: to a note, into steps, to the chat, to a reminder, or done.", "Guide: the Inbox", 1),
        ("goes where it belongs: to a note, to Tabula, into steps, to the chat, to a reminder, or done.",
         "goes where it belongs: to a note, into steps, to the chat, to a reminder, or done.", "tour: the Inbox", 1),
        ("pin one to the page, search the rest, and send any of them into Tabula when a thought is ready to become writing.",
         "pin one to the page, and search the rest.", "Guide: Schedae", 1),
        ('<div class="tip"><span class="tip-mark">T</span><div><b>Tabula</b> is the writing tablet, with documents, footnotes, letterheads, signatures and exports. '
         '<b>Abacus</b> is the reckoning grid: workbooks, formulas, formats, and CSV in and out. With <b>Imago</b> for slides, <b>Scriba</b> for recordings and '
         '<b>Fontes</b> for sources, they are apps of their own, carried whole.</div></div>', '', "Guide: no five apps", 1),
        ("Fabrica chooses no model: it hands work to Chat and Code.", "", "Guide: effort, no Fabrica", 2),
        ("Lector, the Career Studio and Folders share one writing effort, beside their model, as they share the model:",
         "Folders has a writing effort of its own, beside its model:", "Guide: effort, Folders alone", 1),
        ("Notes, Tabula, a Word file, or the clipboard", "Notes, a Word file, or the clipboard", "Guide: where a blend goes", 1),
        ('"Apps made here can be kept in Fabrica, with every version.",', '', "help: Code keeps its own apps", 1),
        ("Chat, Code, Build, Fabrica and Focus each have a key.", "Chat, Code, Build and Focus each have a key.", "help: Home's rooms", 1),
        ("a look-up of a reference, or the speech model the first time you dictate or record (Scriba's, fetched once and kept).",
         "a look-up of a reference, or the speech model the first time you dictate (fetched once and kept).", "Home: what goes online (6.56)", 1),
        # Folders, the Studio (modules/r208.js, r200.js, r201.js)
        ("Your profile names no apps yet (the Career Studio's entries of projects). Name them here.", "No apps are named yet. Name them here.",
         "Folders: no Career Studio to read", 1),
        ("your notes on sources, the Tabula page, your sticky notes and your project files", "your notes on sources, your sticky notes and your project files",
         "Data: no Tabula page", 1),
        (("CUT", '  keys.appendChild(btn("My Tabula page",', '||"The Tabula page");},"ghost"));\n'), "", "the workbench: no Tabula page", 1),
        # Settings, Your data: backup and storage name no Fabrica (modules/r143.js, r142.js, r197.js); their stores stay empty here
        ("your conversations, notes and settings, Fabrica\\'s apps with every version, their issues and pages, and the large store.",
         "your conversations, notes and settings, and the large store.", "Backup: what it holds", 1),
        ("For everything in one file, with Fabrica's apps, use ", "For everything in one file, use ", "Backup: the pointer", 1),
        ("Open a conversation and an app in Fabrica to see that all is there.", "Open a conversation to see that all is there.", "Backup: check after", 1),
        ('  stay.push("Fabrica\'s packages, unless you choose them. Each can be made again from its version.");\n', '', "Backup: no packages to keep", 1),
        (("CUT", '  li((c.fabrica||[]).length,', '+((c.fabrica||[]).length>6?" and more":""));\n'), "", "Backup: no Fabrica apps row", 1),
        ('  li((c.issues||0)+(c.pulls||0),"issues and pull requests, with Fabrica\'s pages");\n', '', "Backup: no issues row", 1),
        ('li(c.lector,c.lector===1?"document from Lector":"documents from Lector");', '', "Backup: no documents row", 1),
        ('ingenium_repos:"Fabrica\'s apps, with every version",', 'ingenium_repos:"Apps, with every version",', "Backup: a store's name", 1),
        ('ingenium_hub:"Fabrica\'s issues, pull requests and pages",', 'ingenium_hub:"Issues, pull requests and pages",', "Backup: a store's name, again", 1),
        ('fabrica_made:"Fabrica\'s packages",', 'fabrica_made:"Packages",', "Backup: the packages' name", 1),  # 6.65: the build library's name follows it
        ('This is a copy of Fabrica\'s issues and pages, not a whole backup. Bring it back in Fabrica: an app\'s Settings, Bring a copy back.',
         "This is a copy of an app\'s issues and pages, not a whole backup.", "Backup: a copy of issues", 1),
        ('row("Fabrica\'s packages",', 'row("Packages",', "Backup: the packages' row", 2),
        ('"Fabrica\'s packages are not in this backup: the ones here stay."', '"Packages are not in this backup: the ones here stay."', "Backup: packages left out", 1),
        ('{what:"Fabrica\'s packages",why:', '{what:"Packages",why:', "Backup: packages, why", 1),
        ('ingenium_repos:["Fabrica\'s history","Every version of the apps you make in Fabrica"],', 'ingenium_repos:["App history","Every version of the apps you keep"],',
         "Storage: a store's name", 1),
        ('fabrica_made:["Fabrica\'s packages","Apps and kits Fabrica made, kept to save again"],', 'fabrica_made:["Packages","Apps and kits made here, kept to save again"],',
         "Storage: the packages' name", 1),
        ('ingenium_hub:["Fabrica\'s issues and pull requests","What you wrote about your apps in Fabrica"],', 'ingenium_hub:["Issues and pull requests","What you wrote about your apps"],',
         "Storage: the issues' name", 1),
        ('stores:"Fabrica and Ingenium\'s other stores"};', 'stores:"Ingenium\'s other stores"};', "Storage: the other stores", 1),
        ('["package","Older Fabrica packages"]', '["package","Older packages"]', "Storage: older packages", 1),
        ("Fabrica\\'s older packages (they can be made again), ", "", "Storage: what may go", 1),
        ("the signing keys and Fabrica's issues and pages", "and the signing keys", "the sign-in: what is sealed", 1),
        # 6.32: the lock seals the app library and Fabrica's stores in the editions that keep them; these name neither
        ("the signing keys, your app library, and Fabrica's apps, packages, issues and pages. A backup is sealed", "and the signing keys. A backup is sealed",
         "the sign-in: what turning it on seals", 1),
        ("Sealed too: your app library, and Fabrica\\'s apps with every version and the packages it made. ", "", "the sign-in: no library or Fabrica sealed", 1),
        ("your app library, and Fabrica's apps with every version and the packages it made (what each holds; the names they are filed under are not); ", "",
         "the sign-in: no library or Fabrica in what is sealed", 1),
        ("Sealing your app library, and Fabrica\\'s apps and packages: ", "Sealing the rest of what is kept here: ", "the sign-in: sealing the rest", 1),
        ("Opening your app library, and Fabrica\\'s apps and packages: ", "Opening the rest of what is kept here: ", "the sign-in: opening the rest", 1),
        ("from elsewhere, the signing keys and Fabrica\\'s pages: ", "from elsewhere and the signing keys: ", "the sign-in: its progress names no Fabrica", 2),
        # the backup's packages switch is read when a backup is made, so it stays, hidden, in neutral words (none are made here)
        ('<div class="bk-opt"><input type="checkbox" class="bk-sw" role="switch" id="bkOptPk"', '<div class="bk-opt" hidden><input type="checkbox" class="bk-sw" role="switch" id="bkOptPk"',
         "Backup: the packages switch hidden", 1),
        ('<b id="bkOptPkL">Fabrica\\\'s packages</b><span id="bkOptPkD">The Android, iPhone and other packages Fabrica made.', '<b id="bkOptPkL">Packages</b><span id="bkOptPkD">The packages made here.',
         "Backup: the packages switch's words", 1),
        ('pk.textContent="The Android, iPhone and other packages Fabrica made ("', 'pk.textContent="The packages made here ("', "Backup: the packages switch's count", 1),
        ("Your chats, documents, projects, Fabrica\\\'s history, issues and keys are never removed.", "Your chats, documents, projects and keys are never removed.",
         "Storage: what never goes", 1),
        # the notes (the base page), the Inbox (modules/r119.js) and Blend (modules/r218.js): nothing is sent to an app this edition lacks
        ("and its errands: send it to Tabula when a thought is ready to become writing. The row beneath", "and its errands. The row beneath",
         "Guide: a note's three dots", 1),
        ('  menu.appendChild(mkRow("Send to Tabula",function(){sendToTabula(n.id);closeStickyMenus();}));\n', '', "a note's menu: no Send to Tabula", 1),
        ('No notes yet. A new note floats on every page until you unpin it, and can be sent into Tabula when it is ready to become writing.',
         'No notes yet. A new note floats on every page until you unpin it.', "Schedae: no Tabula", 1),
        ('    var sv=el("button","sch-btn","Send to Tabula");\n    sv.onclick=function(){sendToTabula(n.id);sv.textContent="Sent ✓";setTimeout(function(){sv.textContent="To Tabula";},1200);};\n',
         '', "Schedae: no Send to Tabula key", 1),
        ('acts.appendChild(pin);acts.appendChild(sv);acts.appendChild(dl);', 'acts.appendChild(pin);acts.appendChild(dl);', "Schedae: its keys", 1),
        (("CUT", '  {key:"tabula",label:"📝 To Tabula",word:"Tabula",run:function(it,tc){tc.closeInbox();', 'go("tabula");toast("Sent to Tabula.");}},\n'), "",
         "the Inbox: no To Tabula", 1),
        ('acts.appendChild(blKey("Tabula",function(){toTabula(r);}));', '', "Blend: no Tabula key", 1),
    ]


def _reset_words(ed):
    """6.38: Reset everything says what it clears (build_page.py); an edition is told only of what it holds. The full edition has
    no Author Studio; the public editions have no app library, no Fabrica and no Author Studio (Build makes packages there, so
    the signing keys are named)."""
    old = ("the long texts, the app library, Fabrica\\'s apps, packages, issues and pages, the conversations you brought in, "
           "the signing keys and your Author Studio changes. On a computer app")
    if ed == "full":
        new = ("the long texts, the app library, Fabrica\\'s apps, packages, issues and pages, the conversations you brought in "
               "and the signing keys. On a computer app")
    else:
        new = "the long texts, the conversations you brought in and the signing keys. On a computer app"
    return [(old, new, "Reset everything: what it clears, in this edition", 1)]


def _no_lakay():
    """6.55: Lakay, her store's app, is carried and named in the master edition alone: every other edition's app library has the list
    it had before (and the full edition's rule below then leaves Ingenium alone in it), and knows no Lakay page by name."""
    return [
        ('var LIB_KEYS=["cd","forge","inkwell","ingenium","lakay"],LIB_NAMES={cd:"Carpe Diem",forge:"The Forge",inkwell:"Inkwell",ingenium:"Ingenium",lakay:"Lakay"};',
         'var LIB_KEYS=["cd","forge","inkwell","ingenium"],LIB_NAMES={cd:"Carpe Diem",forge:"The Forge",inkwell:"Inkwell",ingenium:"Ingenium"};',
         "the app library without Lakay", 1),
        ('  if(/<meta name="lakay-build"/i.test(head.slice(0,40000))||/<title>\\s*Lakay\\b/i.test(head.slice(0,40000)))return "lakay";\n', "",
         "no Lakay page known by name", 1),
        ('  if(key==="lakay"&&(m=/<meta name="lakay-build" content="(\\d+)"/.exec(s.slice(0,40000))))return m[1];\n', "",
         "no Lakay build number read", 1),
        # 6.83: the one place an app's logo is found (modules/r277.js) knows Lakay's own pictures in the master edition alone
        ('  if(n==="lakay")return "lakay";if(/^offline (project|pro)$/.test(n))return "master";return null;}',
         '  if(/^offline (project|pro)$/.test(n))return "master";return null;}', "app logos without Lakay's name", 1),
        ('function lakaySrc(){return flat(night()&&W.ING_SEALS&&ING_SEALS.lakayN?"lakayN":"lakay");}\n', "", "app logos without Lakay's pictures", 1),
        ('function src(name){var m=own(name);if(m)return m;var k=key(name);if(k==="lakay")return lakaySrc();var o=kept()[norm(name)];',
         'function src(name){var m=own(name);if(m)return m;var o=kept()[norm(name)];',
         "app logos: an app's own logo, kept", 1),
        ('  if(k&&k!=="lakay"&&W.IngSeal&&typeof IngSeal.el==="function")', '  if(k&&W.IngSeal&&typeof IngSeal.el==="function")', "app logos: the seals", 1),
        ('  if(k==="lakay"&&lakaySrc())return img(lakaySrc(),size,"lakay");\n', "", "app logos: no Lakay picture", 1),
        ("function retheme(){[].forEach.call(D.querySelectorAll('img[data-applogo=\"lakay\"]'),function(im){var s=lakaySrc();if(s&&im.src!==s)im.src=s;});}",
         "function retheme(){}", "app logos: nothing to change by night", 1),
        # its line in What is new (shown in the master edition alone) is not carried either, so its name is nowhere in the page
        ('  ["6.55","Lakay, your store\'s app, is carried inside Ingenium at its latest build and kept with your other apps on first start: in '
         'Lector, in Fabrica\'s app library and wherever your apps are listed, with its Spiral in its seven layers.","master"],\n', "",
         "What is new without Lakay", 1),
        # 6.56: the master edition's news of Lakay Build 6 and of Carpe Diem 1081 is not carried either
        ('  ["6.56","Lakay is carried at Build 6, with its new Spiral: a coin in sixteen planes, its edge, enamel plate, shell and pearl each at its own depth, in Lector, Fabrica and wherever your apps are listed.","master"],\n', "", "What is new without Lakay Build 6", 1),
        ('  ["6.56","Lector and your app library carry Carpe Diem 1081, its full edition, in place of 1058: Lector measures it and quotes build 1081 with its own figures (48.5 MB and 71,186 lines).","master"],\n', "", "What is new without Carpe Diem 1081", 1),
        # 6.72: nor the master edition's news of Carpe Diem 1084
        ('  ["6.72","Lector and your app library carry Carpe Diem 1084, its full edition, in place of 1081: Tabula prints in colour and splits a long list across pages (1082), on a Mac the five rooms can sit in the Dock as apps of their own (1083), and set to French, all five rooms are in French throughout (1084). Lector measures it and quotes build 1084 with its own figures (48.7 MB and 71,421 lines).","master"],\n', "", "What is new without Carpe Diem 1084", 1),
        # 6.81: nor the master edition's news of Carpe Diem 1089
        ('  ["6.81","Lector and your app library carry Carpe Diem 1089, its full edition, in place of 1084: Tabula keeps paragraphs and bullet points in good order (1085), a sign-in can protect the copy and seal the work it keeps on the device (1086), each Writing Room has a face of its own (1087), Tabula is offered under Open With for Word, PDF, plain text, web pages and Markdown (1088), and the Guidebook stands in nine sections with a shorter guided tour (1089). Lector measures it and quotes build 1089 with its own figures (49.4 MB and 73,130 lines).","master"],\n', "", "What is new without Carpe Diem 1089", 1),
        # 6.82: nor the master edition's news of Carpe Diem carried without its copy of itself (modules/r275.js)
        ('  ["6.82","Ingenium\'s page is about 19 MB lighter. Carpe Diem rides inside it without the copy of itself that it carries, and Ingenium puts that copy back, letter for letter, when your app library or Fabrica wants it, checked against Carpe Diem\'s own fingerprint. The page has room again for what comes next.","master"],\n', "", "What is new without 6.82's room in the page", 1),
        # 6.83: nor the master edition's news of Lakay's and the Offline Project's logos on their folders (modules/r277.js)
        ('  ["6.83","Every app\'s folder wears its own logo, never a letter: Lakay its Spiral and the Offline Project its master logo, by day and by night, and any other app the logo in its own page, found in Fabrica, your app library or GitHub, and kept once found.","master"],\n', "", "What is new without 6.83's logos of her apps", 1),
    ]


def edits(ed):
    if ed == "master":
        return []
    E = _no_lakay() + _fixed_name()
    for old, new, label, times in _personal():
        if label == "the edition":
            new = 'var ING_EDITION="%s";' % ed
        E.append((old, new, label, times))
    if has_lector(ed):
        E += _lector_voice()
    else:
        E += _no_lector() + _no_lector_words()
    # 6.43 and 6.45 (her words: "Yes please remove the \"edit\", it can go too"): every edition but the master has no Ingenium of
    # its own to open in Code or Build, and none to package; no permission brings either back (modules/r162.js)
    E += _no_self() + _no_self_kit() + _open_words(ed)
    if ed in ("gift", "demo", "full"):  # 6.27: no edition but the master names the owner's other apps
        E += _blank(ed)
    if ed == "full":
        E += _full_apps()
    if not has_fabrica(ed):  # 6.27: the public editions
        E += _public(ed)
    E += _reset_words(ed)
    return E


def apply(out, ed):
    for old, new, label, times in edits(ed):
        if isinstance(old, tuple):  # ("CUT", first, last): from the first text to the last, both included
            _, a, b = old
            if out.count(a) != times:
                sys.exit("edition %s, %r: its first text found %d times, not %d" % (ed, label, out.count(a), times))
            i = out.index(a)
            k = out.find(b, i)
            if k < 0 or k - i > 60000:
                sys.exit("edition %s, %r: its last text was not found after its first" % (ed, label))
            out = out[:i] + new + out[k + len(b):]
            continue
        n = out.count(old)
        if n != times:
            sys.exit("edition %s, %r: found %d times, not %d" % (ed, label, n, times))
        if new is None:  # a whole element: its line (Lector's key) or its section
            if old.startswith("<section"):
                i = out.index(old)
                j = out.index("</section>", i) + len("</section>")
                ls = out.rfind("\n", 0, i) + 1
                out = out[:ls] + out[j:].lstrip(" ").lstrip("\n")
            else:
                i = out.index(old)
                ls = out.rfind("\n", 0, i) + 1
                le = out.index("\n", i) + 1
                out = out[:ls] + out[le:]
        else:
            out = out.replace(old, new)
    return cut_parts(out, ed)
