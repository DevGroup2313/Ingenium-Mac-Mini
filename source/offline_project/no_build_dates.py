"""The apps show their build without its date (the owner's words, 19 October 2026: "I want you to remove the dates from
the apps, keep only the build number please", and, asked what stays, the number and its stamp; the Forge's "This build was
finished on" goes too). Carpe Diem shows "Build 1058 · 528171058 · Committee demo", The Forge "Build 641 · 9s73".
The date stays in each page's own record (window.CD_BUILD.date), which the apps that carry one another read; it is only
no longer shown. Used by carpe_diem_1058/cd1058.py and forge_641/forge641.py, so the mini Forge, the Forge's copies in
Ingenium and the demonstrations all come out the same."""
import re

# the pages write the middle dot as the escape backslash, u, 00b7 inside their scripts
DOT = chr(92) + "u00b7"
LINE_OLD = '(f?"Version ":"Build ")+window.CD_BUILD.date+" ' + DOT + ' "+window.CD_BUILD.pass'
LINE_NEW = '(f?"Version ":"Build ")+window.CD_BUILD.pass'
FOOT_OLD = "ft.textContent='Build '+window.CD_BUILD.date+' " + DOT + " '+window.CD_BUILD.pass+' " + DOT + " '+window.CD_BUILD.stamp;"
FOOT_NEW = "ft.textContent='Build '+window.CD_BUILD.pass+' " + DOT + " '+window.CD_BUILD.stamp;"
BOOT_OLD = '_bl.textContent = "Build " + window.CD_BUILD.date + " ' + DOT + ' " + window.CD_BUILD.pass'
BOOT_NEW = '_bl.textContent = "Build " + window.CD_BUILD.pass'
FINISHED = re.compile(r' This build was finished on <b id="aboutSealDate">[^<]*</b>\.')
# the build line written into the page itself, before its script puts the build in (it read "Build 2026-10-17 · 630 · 9s62")
STATIC = re.compile(r'<span class="build">Build [^<]*</span>')
RECORD = re.compile(r'window\.CD_BUILD=\{date:"[^"]*",pass:"(\d+)",stamp:"([^"]+)"\}')
# Magister's lesson on values, which read the build line with its date, and the glossary, which named build 630
U = chr(92) + "u"
LESSON_OLD = ("The Forge" + U + "2019s build line says <i>Build 2026-10-17 " + DOT + " 630 " + DOT + " 9s62</i>. Underneath, a script "
              "holds those three as values with names: a date, a number, a stamp.")
LESSON_NEW = ("The Forge" + U + "2019s build line, at the foot of each page, says <i>Build</i> and then two values: the build "
              "number and a stamp. Underneath, a script holds those two as values with names.")
GLOSS = [("Carpe Diem 1050 came after 1049; this Forge is build 630.",
          "Carpe Diem 1050 came after 1049; the Forge shows its own at the foot of each page."),
         ("Carpe Diem 1050 vient après 1049 ; cette Forge est le build 630.",
          "Carpe Diem 1050 vient après 1049 ; la Forge montre le sien au pied de chaque page.")]
# the guide, in Carpe Diem and the Forge alike: what the About line carries, and the tip that read the build by its date.
# Every edition of a build shares its stamp; a demonstration adds its edition's name.
GUIDE = [("The last line of About carries the build: its date, its pass number and a short fingerprint of the file itself. That "
          "is the quickest way to tell whether a device is running the newest copy, which matters when the same app lives on a "
          "desk, a tablet and a phone at once. The fingerprint differs between the full app, the demo and the gift on purpose, "
          "so two editions can never be mistaken for one another.",
          "The last line of About carries the build: its pass number and its stamp, and in a demonstration the edition’s "
          "name. That is the quickest way to tell whether a device is running the newest copy, which matters when the same app "
          "lives on a desk, a tablet and a phone at once. A demonstration names its edition on purpose, so it can never be "
          "mistaken for the full app."),
         ("La dernière ligne d’À propos porte l’édition : sa date, son numéro de passe et une courte "
          "empreinte du fichier lui-même. C’est la façon la plus rapide de savoir si un appareil fait tourner la copie "
          "la plus récente, ce qui compte quand la même app vit à la fois sur un bureau, une tablette et un "
          "téléphone. L’empreinte diffère volontairement entre l’app complète, la démo et le cadeau, "
          "pour que deux éditions ne puissent jamais être confondues.",
          "La dernière ligne d’À propos porte l’édition : son numéro de passe et son tampon, et dans une "
          "démonstration le nom de l’édition. C’est la façon la plus rapide de savoir si un appareil fait "
          "tourner la copie la plus récente, ce qui compte quand la même app vit à la fois sur un bureau, une tablette "
          "et un téléphone. Une démonstration nomme son édition volontairement, pour qu’elle ne puisse jamais "
          "être confondue avec l’app complète."),
         ("If its date is older than the newest file you hold, replace the file first.",
          "If its build number is lower than that of the newest file you hold, replace the file first."),
         ("Si sa date est plus ancienne que le fichier le plus récent que vous détenez, remplacez d’abord le fichier.",
          "Si son numéro est plus petit que celui du fichier le plus récent que vous détenez, remplacez d’abord le "
          "fichier.")]


def _guide(s, what):
    """the guide's texts, wherever the page carries them (an English text may stand twice: once shown, once as the key of its
    French); the tip is in every page that has a guide"""
    for a, b in GUIDE:
        s = s.replace(a, b)
    if GUIDE[2][0] in s or GUIDE[2][1] not in s:
        raise SystemExit("no_build_dates: %s: the guide's tip on the build line is not where expected" % what)
    return s


def _rep(s, a, b, n, what):
    if s.count(a) != n:
        raise SystemExit("no_build_dates: %s found %d times, %d expected" % (what, s.count(a), n))
    return s.replace(a, b)


def forge(s):
    """The Forge's page (lean or full): its two build lines, the line at the foot of the guide, the About's date, the build
    line written into the page (now its own build, from its record), and the lesson and glossary that quoted an old build."""
    s = _rep(s, LINE_OLD, LINE_NEW, 2, "the Forge's build line")
    s = _rep(s, FOOT_OLD, FOOT_NEW, 1, "the Forge's line at the guide's foot")
    s, n = FINISHED.subn("", s)
    if n != 1:
        raise SystemExit("no_build_dates: the Forge's 'This build was finished on' found %d times" % n)
    s = _rep(s, LESSON_OLD, LESSON_NEW, 1, "Magister's lesson on the build line")
    for a, b in GLOSS:
        s = _rep(s, a, b, 1, "the glossary's build")
    rec = RECORD.findall(s)
    if len(rec) != 1:
        raise SystemExit("no_build_dates: the Forge's own build record found %d times" % len(rec))
    s, n = STATIC.subn('<span class="build">Build %s ' % rec[0][0] + chr(183) + ' %s</span>' % rec[0][1], s)
    if n != 2:
        raise SystemExit("no_build_dates: the Forge's written build line found %d times, 2 expected" % n)
    return _guide(s, "the Forge")


def carpe(s):
    """A Carpe Diem page (any edition): the build line drawn at start, the one kept up to date, and the guide's texts."""
    s = _rep(s, BOOT_OLD, BOOT_NEW, 1, "Carpe Diem's build line at start")
    s = _rep(s, LINE_OLD, LINE_NEW, 1, "Carpe Diem's build line")
    return _guide(s, "Carpe Diem")
