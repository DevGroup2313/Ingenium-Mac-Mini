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
        return set()
    out = {"r126.js"}  # Lector's recipe: the owner's rules, verified sources and kinds of document
    if not has_lector(ed):
        out |= {"r107.js", "r108.js", "r148.js"}  # Lector, as approved; how it reads; how it writes
        out |= {"r188.js"}  # 6.8.3: the Career Studio, which writes with Lector ("Please keep the Lector page and the new Career Studio page off the demo and its tour")
    return out


def has_lector(ed):
    return ed in ("master", "full")


def carries_apps(ed):
    """Whether the page carries Carpe Diem, The Forge and Inkwell inside it."""
    return ed == "master"


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
    """No Ingenium of its own: not in Code's or Build's list of apps, and no install package of Ingenium itself (the owner
    alone publishes Ingenium; a new app of the person's own is still packaged)."""
    return [
        ('    if(!L.some(function(a){return a.key==="ingenium";})&&location.protocol!=="file:")L.push({key:"ingenium-self",name:"Ingenium (this copy)",version:ING_VERSION});return L;},',
         '    return L;},', "no Ingenium (this copy) among the apps", 1),
        ('<label class="kit-opt"><input type="radio" name="kitWhat" value="self" checked><span><b>Ingenium itself</b> <span class="small muted">to rebuild it or publish an update</span></span></label>',
         '', "the install kit: no Ingenium itself", 1),
        ('<input type="radio" name="kitWhat" value="editor">', '<input type="radio" name="kitWhat" value="editor" checked>',
         "the install kit: the app in the editor", 1),
        ('function kitWhat(){var r=document.querySelector(\'input[name="kitWhat"]:checked\');return r?r.value:"self";}',
         'function kitWhat(){return "editor";}', "the install kit: a new app only", 1),
    ]


def _blank():
    """The gift edition names none of the owner's other apps, and Home's plaque shows Ingenium's own seal, not the Offline
    Project's crest of four apps."""
    return [
        ('IngSeal.el(["cd","forge","ingenium","inkwell"],{night:"auto",live:true,size:300})',
         'IngSeal.el(["ingenium"],{night:"auto",live:true,size:300})', "Home: Ingenium's seal alone", 1),
        ('["Carpe Diem","The Forge","Ingenium","Inkwell"].forEach(function(n,i){', '["Ingenium"].forEach(function(n,i){', "Home: the plaque's line", 1),
        ('var ph=mk("h2","hx-sr","The Offline Project");', 'var ph=mk("h2","hx-sr","Ingenium");', "Home: the plaque's name", 1),
        ('side.setAttribute("aria-label","The Offline Project, your models and this device");',
         'side.setAttribute("aria-label","Ingenium, your models and this device");', "Home: the side column's name", 1),
        ('im.alt="The master seal of The Offline Project";', 'im.alt="The seal of Ingenium";', "Home: the plaque's picture", 1),
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
    ]


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
        ("Chat, Code, Build, Fabrica, Lector and Focus each have a card.", "Chat, Code, Build, Fabrica and Focus each have a card.", "help: Home's rooms", 1),
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
    or a backup kept as its name (that value is kept as it was, and shown nowhere). The master edition keeps its Name card."""
    return [
        (("CUT", '      <div class="card"><h2 class="sec">Name</h2>', 'Shows in the top bar and on the Home page.</div>\n      </div>\n'), "", "Settings: no Name card", 1),
        ('$("setAppName").addEventListener("input",function(){state.appName=$("setAppName").value;applyBrand();saveState();});', "",
         "Settings: nothing listens for a new name", 1),
        ('T("appname",function(){$("setAppName").value=state.appName;});', "", "start: no name to fill in", 1),
        ('function applyBrand(){var n=state.appName||"Ingenium";', 'function applyBrand(){var n="Ingenium";', "the top bar and Home say Ingenium", 1),
        ('function ingAppName(){return ((state.appName||"").trim())||"Ingenium";}', 'function ingAppName(){return "Ingenium";}', "every part asks for Ingenium", 1),
        ('(state.appName||"Ingenium")', '"Ingenium"', "saved files and the system check are named Ingenium", 6),
        ('(esc(state.appName)||"Ingenium")', '"Ingenium"', "the system check names Ingenium", 1),
        ('["#setAppName","The app\'s name","What Ingenium calls itself on this device."],', "", "Help: no Name field to show", 1),
    ]


def edits(ed):
    if ed == "master":
        return []
    E = _fixed_name()
    for old, new, label, times in _personal():
        if label == "the edition":
            new = 'var ING_EDITION="%s";' % ed
        E.append((old, new, label, times))
    if has_lector(ed):
        E += _lector_voice()
    else:
        E += _no_self() + _no_lector() + _no_lector_words()
    if ed == "gift":
        E += _blank()
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
