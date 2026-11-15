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

# (the exact phrase in the built page, the phrase on screen now); grouped by the page they name
_BLEND = [
    ('</svg>Blend</button>', '</svg>%s</button>'),                          # the side list
    ('<h1 class="page-title">Blend</h1>', '<h1 class="page-title">%s</h1>'),
    ('Blend · the movement of your models', '%s · the movement of your models'),   # its head (r262)
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
# both names in one phrase
_BOTH = [
    ('"Build, Blend, ', '"%s, %s, '),                  # the tour's teasers and closers (A, C)
    ('"Build, Blend and ', '"%s, %s and '),
    ('Blend, Build and Code', '%s, %s and Code'),      # (C, A)
]
# what every edition holds: the side list and the titles
CORE = {'</svg>Blend</button>', '<h1 class="page-title">Blend</h1>', '</svg>Build</button>', '<h1 class="page-title">Build</h1>'}


def phrases():
    out = [(o, n.replace("%s", C)) for o, n in _BLEND] + [(o, n.replace("%s", A)) for o, n in _BUILD]
    out.append((_BOTH[0][0], _BOTH[0][1] % (A, C)))
    out.append((_BOTH[1][0], _BOTH[1][1] % (A, C)))
    out.append((_BOTH[2][0], _BOTH[2][1] % (C, A)))
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
