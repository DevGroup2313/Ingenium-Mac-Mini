"""7.12 (15 November 2026): the pages' names on screen, in one place. Her words (15 November 2026): "I am thinking of renaming the Focus,
Folders, Blend and Build pages since their names seem so basic and without an identity." Asked, she chose Concordia for Blend
("Concordia (Recommended)": the wheels of its movement mesh in agreement, and it joins Lector, Fabrica and Vocatio as one Latin family)
and Adamas for Build: "I'll try Adamas for now and the Build name as backup" (her vision: "the diamond is there to signify a diamond in
the rough beign chiseled away in code by the artist and being refined into brillance"). Focus and Folders keep their names.

The page ids, the data and the code keep blend and build (as Vocatio's page keeps career): only the words a person reads change, and
only where the word names the page. "Build" and "blend" are also ordinary words in Ingenium (a build number, Build kits for your
devices, Build your own AI, Build Mac App.command, the blended answer), and those stay. Every phrase below is exact and named in full,
so nothing else is touched; the master edition must hold each one (the build stops otherwise), the other editions hold what they carry.
What is new keeps its history as it was written (var NEW=[...]): a line of 7.02 says Build, as the page was called then.
To go back to Build (her backup) or Blend, take its phrases out of PHRASES: nothing else changes.

build_page.py calls rename(out, ED) after editions.apply and editions.strip, so the editions' own exact edits still meet the words
they were written for."""
import sys

C, A = "Concordia", "Adamas"   # Blend, Build
# 7.15: Folders and Focus. Her words (15 November 2026), on Folders: "It is the home where all of my apps and all of the information of
# how they were contructed and made to come to life. It is the library and archive of all of my work and achievements, the storage
# place of all of my accrued skills and knowledge"; her choice: "Ingenia" (the plural of ingenium: talents and inventions, the works of
# Ingenium). On Focus, from what the page does rather than its stones: "I am torn between Vesta and Ancora but I am leaning more towards
# Vesta, please keep Ancora as a backup" (focus is Latin for hearth; Vesta kept the hearth's flame that must never go out). To go back,
# or to Ancora, change I or V below (or take their phrases out of PHRASES).
I, V = "Ingenia", "Vesta"      # Folders, Focus
# 7.16: the Models page. Asked on 15 November 2026, with Minerva recommended beside Mentes, Musae and Machina, her answer: "Mentes" (the
# minds: the models that think and answer in Ingenium); then, on 15 November 2026: "The Models page has been renamed to Mentes, it was
# supposed to ship with the last session that got interrupted." To go back, change N below (or take its phrases out of PHRASES).
N = "Mentes"                   # Models

# (the exact phrase in the built page, the phrase on screen now); grouped by the page they name
_BLEND = [
    ('</svg>Blend</button>', '</svg>%s</button>'),                          # the side list
    ('<h1 class="page-title">Blend</h1>', '<h1 class="page-title">%s</h1>'),
    ('head.setAttribute("aria-label","Blend")', 'head.setAttribute("aria-label","%s")'),
    ('on the Models page to use Blend.', 'on the Models page to use %s.'),
    ('String(r.task||"Blend")', 'String(r.task||"%s")'),
    ('title:("Blend: "+', 'title:("%s: "+'),
    ('"Blend is using your models right now.', '"%s is using your models right now.'),
    ('the Blend page', 'the %s page'),
    ('tg.textContent="Blend";', 'tg.textContent="%s";'),
    ('sel:"#blendPick",t:"Blend"', 'sel:"#blendPick",t:"%s"'),
    ('sub:"Blend"', 'sub:"%s"'),                                             # the tour
    ('"🤝 Blend"', '"🤝 %s"'),
    ('Blend asks several', '%s asks several'),
    ('/^Blend/.test(bare(s.t))', '/^%s/.test(bare(s.t))'),
    ('name:"Blend",tour:["Making things","Blend"]', 'name:"%s",tour:["Making things","%s"]'),   # the Guide and help
    ('Blend asks two or more models', '%s asks two or more models'),
    ('Check with Blend', 'Check with %s'),
    ('Checked with Blend', 'Checked with %s'),
    ('Send this reply to Blend:', 'Send this reply to %s:'),
    ('The reply goes to Blend;', 'The reply goes to %s;'),
    ('[\'.nav-btn[data-page="blend"]\',"Blend",', '[\'.nav-btn[data-page="blend"]\',"%s",'),
    ('return "Blend, Folders, "+', 'return "%s, Folders, "+'),
    ('label:"Blend, in rooms"', 'label:"%s, in rooms"'),
    ('Blend: several models, one answer', '%s: several models, one answer'),
    ('ultra:"Blend\'s Ultracode', 'ultra:"%s\'s Ultracode'),
    ('in Ingenium\'s Blend;', 'in Ingenium\'s %s;'),
    ('Blend\'s effort', '%s\'s effort'),
    ('About Blend, effort and Ultra', 'About %s, effort and Ultra'),
    ('Blend has its own effort, in its steps.', '%s has its own effort, in its steps.'),
    ('a.push("Blend")', 'a.push("%s")'),
    ('w.push("Blend")', 'w.push("%s")'),
    ('Chat, Blend and Lector', 'Chat, %s and Lector'),
    ('join a Blend.', 'join a blend in %s.'),
    ('"Blend, dictation, the Cloud)', '"%s, dictation, the Cloud)'),
]
_BUILD = [
    ('</svg>Build</button>', '</svg>%s</button>'),                          # the side list
    ('<h1 class="page-title">Build</h1>', '<h1 class="page-title">%s</h1>'),
    ('Build · code in, a page out', '%s · code in, a page out'),            # its head (r292)
    ('the Build editor', 'the %s editor'),
    ('in Build</button>', 'in %s</button>'),
    ('the Build page', 'the %s page'),
    ('The Build page', 'The %s page'),
    ('ingOpenApart($("codeEditor").value||"","Build")', 'ingOpenApart($("codeEditor").value||"","%s")'),
    ('chat, Focus and Build.', 'chat, Focus and %s.'),                      # the tour
    ('sub:"Build"', 'sub:"%s"'),
    ('"🛠️ Build"', '"💎 %s"'),
    ('Build makes small apps', '%s makes small apps'),
    ('Open it in Build', 'Open it in %s'),
    ('open it in Build,', 'open it in %s,'),
    ('"Build is not available in this copy."', '"%s is not available in this copy."'),
    ('"It is in Build.', '"It is in %s.'),
    ('in Build…', 'in %s…'),
    ('is open in Build', 'is open in %s'),
    ('Open an app in Build', 'Open an app in %s'),
    ('MB; Build opens a page', 'MB; %s opens a page'),
    ('Code and Build hold', 'Code and %s hold'),
    ('"Build runs as you type;', '"%s runs as you type;'),
    ('Chat, Code, Build, Fabrica, Lector and Focus', 'Chat, Code, %s, Fabrica, Lector and Focus'),
    ('name:"Build",tour:["Making things","Build"]', 'name:"%s",tour:["Making things","%s"]'),   # the Guide and help
    ('Build is a page that runs', '%s is a page that runs'),
    ('[\'.nav-btn[data-page="build"]\',"Build",', '[\'.nav-btn[data-page="build"]\',"%s",'),
    ('{k:"build",t:"Build",', '{k:"build",t:"%s",'),                       # Home's room
    ('(Build in Ingenium, Files in the Forge)', '(%s in Ingenium, Files in the Forge)'),
    ('page open in Build (one file', 'page open in %s (one file'),
    ('Effort for Build\\\'s requests', 'Effort for %s\\\'s requests'),
    ('a.push("Build")', 'a.push("%s")'),
    ('in its steps. Build has its own,', 'in its steps. %s has its own,'),
    ('K.hero({title:"Build",', 'K.hero({title:"%s",'),
]
_INGENIA = [
    ('<h1 class="page-title">Folders</h1>', '<h1 class="page-title">%s</h1>'),   # its title (r208)
    ('b.title="Folders";', 'b.title="%s";'),                                       # the side list (r208)
    ('+"Folders";nb.parentNode', '+"%s";nb.parentNode'),
    ('h("button","fld-crumbk","Folders")', 'h("button","fld-crumbk","%s")'),       # the way back to all the folders
    ('head=mk("section","fd-head");head.setAttribute("aria-label","Folders");', 'head=mk("section","fd-head");head.setAttribute("aria-label","%s");'),
    ('Its folder on the Folders page keeps', 'Its folder on the %s page keeps'),
    ('kept on the Folders page and searchable', 'kept on the %s page and searchable'),
    ('"Open its folder":"Open Folders"', '"Open its folder":"Open %s"'),
    ('make one on the Folders page, and its notes stay', 'make one on the %s page, and its notes stay'),
    ('brought in on the Folders page"]', 'brought in on the %s page"]'),
    ('Bring in your work on the Folders page, or start one here.', 'Bring in your work on the %s page, or start one here.'),
    ('make one on the Folders page, then press this again.', 'make one on the %s page, then press this again.'),
    ('No folder in Folders is named ', 'No folder in %s is named '),
    ('"in Folders: its conversations and notes"', '"in %s: its conversations and notes"'),
    ('the only part of Folders that uses the internet', 'the only part of %s that uses the internet'),
    ('Shared by Lector, Vocatio and Folders.', 'Shared by Lector, Vocatio and %s.'),
    ('Writing effort, shared by Lector, Vocatio and Folders', 'Writing effort, shared by Lector, Vocatio and %s'),
    ('Lector, Vocatio and Folders share one writing effort', 'Lector, Vocatio and %s share one writing effort'),
    ('chap:"Folders"', 'chap:"%s"'),                                               # the tour: its chapter, and the tables keyed by it
    ('t:"🗂️ Folders"', 't:"🗂️ %s"'),
    ('b:"Folders keeps a folder for each of your apps', 'b:"%s keeps a folder for each of your apps'),
    ('"Folders":"A folder for each app, and your work', '"%s":"A folder for each app, and your work'),
    ('"Folders":"Folders keep how you work', '"%s":"%s keeps how you work'),
    ('?"Folders":"Making things"', '?"%s":"Making things"'),
    ('P.folders={name:"Folders",tour:["Folders"],', 'P.folders={name:"%s",tour:["%s"],'),   # the Guide and help
    ('what:"Folders keeps a folder for each of your apps', 'what:"%s keeps a folder for each of your apps'),
    ('card("fdGuide","Folders",', 'card("fdGuide","%s",'),
    ('return "Concordia, Folders, "+', 'return "Concordia, %s, "+'),                # after Blend's rename
]
_VESTA = [
    ('<h1 class="page-title">Focus</h1>', '<h1 class="page-title">%s</h1>'),       # its title (base page)
    ('fill="currentColor"/></svg>Focus</button>', 'fill="currentColor"/></svg>%s</button>'),   # the side list
    ('<span class="qh">Focus</span>', '<span class="qh">%s</span>'),               # Home's key
    ('{k:"focus",t:"Focus",', '{k:"focus",t:"%s",'),                               # Home's room
    ('K.hero({title:"Focus",eyebrow:"Focus \\u00b7 one step at a time"', 'K.hero({title:"%s",eyebrow:"%s \\u00b7 one step at a time"'),   # its head (r291)
    ('"aria-label","Focus, in parts"', '"aria-label","%s, in parts"'),
    ('title="The time. Tap to open Focus."', 'title="The time. Tap to open %s."'),   # the clock
    ('". Tap to open Focus."', '". Tap to open %s."'),
    ('The time of day. Press it to open Focus.', 'The time of day. Press it to open %s.'),
    ('<h2 class="sec">Focus: support that fits how you work</h2>', '<h2 class="sec">%s: support that fits how you work</h2>'),
    ('The Focus page holds the tools', 'The %s page holds the tools'),
    ('It waits in the Inbox, on the Focus page.', 'It waits in the Inbox, on the %s page.'),
    ('decoding a message) are on the Focus page.', 'decoding a message) are on the %s page.'),
    ('onclick="go(\'focus\')">Open Focus</button>', 'onclick="go(\'focus\')">Open %s</button>'),
    ('It waits on the Focus page until you are ready.', 'It waits on the %s page until you are ready.'),
    ('" waiting on the Focus page."', '" waiting on the %s page."'),
    ('The Inbox is switched off. Focus, Your supports, turns it back on.', 'The Inbox is switched off. %s, Your supports, turns it back on.'),
    ('Look at your step in Focus: just look', 'Look at your step in %s: just look'),
    ('The Steps card on Focus, with', 'The Steps card on %s, with'),
    ('the Inbox card on Focus."', 'the Inbox card on %s."'),
    ('in the Inbox and on Focus. Inside Ingenium only', 'in the Inbox and on %s. Inside Ingenium only'),
    ('It waits in the Inbox in Focus.', 'It waits in the Inbox in %s.'),
    ('so Focus fits how you work.', 'so %s fits how you work.'),
    ('["conversations","notes","projects","Focus"]', '["conversations","notes","projects","%s"]'),
    ('chap:"Focus"', 'chap:"%s"'),                                                 # the tour: its chapter, and the tables keyed by it
    ('if(s.chap==="Focus")at=k;', 'if(s.chap==="%s")at=k;'),
    ('t:"🎯 Focus: your support room",b:"Focus holds supports', 't:"🎯 %s: your support room",b:"%s holds supports'),
    ('b:"Every part of Focus can be switched', 'b:"Every part of %s can be switched'),
    ('Focus then shows only what is essential', '%s then shows only what is essential'),
    ('"Focus":"Focus is yours to shape', '"%s":"%s is yours to shape'),
    ('"Focus":"Support built for attention', '"%s":"Support built for attention'),
    ('Focus:"Enter in the Inbox box', '%s:"Enter in the Inbox box'),
    ('You have seen every room: Home, Chat, Models, Focus,', 'You have seen every room: Home, Chat, Models, %s,'),
    ('bring in a model, chat, Focus and Adamas. The Focus button also shows', 'bring in a model, chat, %s and Adamas. The %s button also shows'),   # after Build's rename
    ('Chat, Code, Adamas, Fabrica, Lector and Focus each have a key.', 'Chat, Code, Adamas, Fabrica, Lector and %s each have a key.'),
    ('focus:{name:"Focus",tour:["Focus"],', 'focus:{name:"%s",tour:["%s"],'),      # the Guide and help
    ('what:"Focus is your support room', 'what:"%s is your support room'),
    ('Write what you need to do and Focus breaks it', 'Write what you need to do and %s breaks it'),
    ('[\'.nav-btn[data-page="focus"]\',"Focus",', '[\'.nav-btn[data-page="focus"]\',"%s",'),
    ('"and Focus, the support that fits how you work."', '"and %s, the support that fits how you work."'),
]
_MENTES = [
    # every phrase met after the renames above (so "Home, Chat, Models, Vesta" with Vesta in it); ordinary uses stay: Models and AI,
    # Models and devices, Models kept for a stronger computer, the catalogue's group label Models, Who answers' list label, Models on
    # this device, Models and engine, and every sentence about models in general (and the titles of the papers the Guide cites)
    ('</svg>Models</button>', '</svg>%s</button>'),                                   # the side list (base page)
    ('<h1 class="page-title">Models</h1>', '<h1 class="page-title">%s</h1>'),         # its title
    ('tr-head tu-head");head.setAttribute("aria-label","Models");', 'tr-head tu-head");head.setAttribute("aria-label","%s");'),   # its head (r269)
    ('models:{label:"Models, in rooms",', 'models:{label:"%s, in rooms",'),           # its rooms (r173)
    ('Tap to open Models.', 'Tap to open %s.'),                                       # the top bar's engine and model keys
    # 7.78: the Engine key's help no longer names Models (it opens the Engine panel, r144), so its line here is gone
    ('btn("Relink on Models",', 'btn("Relink on %s",'),
    ('"bk-key sm","Open Models")', '"bk-key sm","Open %s")'),
    ('btn("Open Models","primary",', 'btn("Open %s","primary",'),
    ('Models:"Drop any .gguf file', '%s:"Drop any .gguf file'),                       # the tour's extra lines, keyed by its chapters
    ('chap:"Models"', 'chap:"%s"'),                                                   # the tour: its chapter, and the tables keyed by it
    ('insertAfterChap("Models",', 'insertAfterChap("%s",'),
    ('lastOf("Models")', 'lastOf("%s")'),
    ('"Models":"The models are the minds behind the answers', '"%s":"The models are the minds behind the answers'),
    ('"Models":"The four houses of models', '"%s":"The four houses of models'),
    ('You have seen every room: Home, Chat, Models, Vesta,', 'You have seen every room: Home, Chat, %s, Vesta,'),   # after Focus's rename
    ('[\'.nav-btn[data-page="models"]\',"Models",', '[\'.nav-btn[data-page="models"]\',"%s",'),
    ('models:{name:"Models",tour:["Models"],', 'models:{name:"%s",tour:["%s"],'),     # the Guide and help
    ('what:"Models holds the models', 'what:"%s holds the models'),
    ('card("mdGuide","Models: newer ones, and two engines",', 'card("mdGuide","%s: newer ones, and two engines",'),
    ('the Models page', 'the %s page'),                                              # every sentence that names it
    ('The Models page', 'The %s page'),
    ('(Models page)', '(%s page)'),
    ('(Models, Magister)', '(%s, Magister)'),
    ('(Models, or the model key beside the chat', '(%s, or the model key beside the chat'),
    ('(Models, or the model key at the top)', '(%s, or the model key at the top)'),
    ('Models, Health, has more.', '%s, Health, has more.'),
    ('. Models, Health, has every reply.', '. %s, Health, has every reply.'),
    ('Models, Your AIs holds it.', '%s, Your AIs holds it.'),
    ('fetch the models again in Models: Restore', 'fetch the models again in %s: Restore'),
    ('Models suggests those that fit.', '%s suggests those that fit.'),
    ('After restoring, fetch them in Models.', 'After restoring, fetch them in %s.'),
    ('To have a model write them, choose one in Models.', 'To have a model write them, choose one in %s.'),
]
# both names in one phrase
_BOTH = [
    ('"Build, Blend, ', '"%s, %s, '),                  # the tour's teasers and closers (A, C)
    ('"Build, Blend and ', '"%s, %s and '),
    ('Blend, Build and Code', '%s, %s and Code'),      # (C, A)
]
# what every edition holds: the side list and the titles
CORE = {'</svg>Blend</button>', '<h1 class="page-title">Blend</h1>', '</svg>Build</button>', '<h1 class="page-title">Build</h1>',
        '<h1 class="page-title">Folders</h1>', 'b.title="Folders";', '<h1 class="page-title">Focus</h1>', 'fill="currentColor"/></svg>Focus</button>',
        '</svg>Models</button>', '<h1 class="page-title">Models</h1>'}


def phrases():
    out = [(o, n.replace("%s", C)) for o, n in _BLEND] + [(o, n.replace("%s", A)) for o, n in _BUILD]
    out.append((_BOTH[0][0], _BOTH[0][1] % (A, C)))
    out.append((_BOTH[1][0], _BOTH[1][1] % (A, C)))
    out.append((_BOTH[2][0], _BOTH[2][1] % (C, A)))
    # 7.15: after Blend's and Build's, since some of their phrases are met again here with the new names in them
    out += [(o, n.replace("%s", I)) for o, n in _INGENIA] + [(o, n.replace("%s", V)) for o, n in _VESTA]
    # 7.16: Mentes last, since some of its phrases are met with the names above in them
    out += [(o, n.replace("%s", N)) for o, n in _MENTES]
    return out


PHRASES = phrases()


def rename(out, ed, report=None):
    """the page with its pages' names on screen; What is new left as it was written"""
    i = out.find("var NEW=[")
    j = out.find("];", i) if i >= 0 else -1
    head, news, tail = (out[:i], out[i:j], out[j:]) if i >= 0 and j > i else (out, "", "")
    counts = {}
    for old, new in PHRASES:
        n = head.count(old) + tail.count(old)
        counts[old] = n
        head, tail = head.replace(old, new), tail.replace(old, new)
    missing = [o for o, n in counts.items() if n == 0 and (ed == "master" or o in CORE)]
    if missing:
        sys.exit("names.py, edition %s: not found: %r" % (ed, missing))
    if report is not None:
        report.update(counts)
    return head + news + tail
