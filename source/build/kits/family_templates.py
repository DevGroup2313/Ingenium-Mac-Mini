"""The family's packaging templates, made neutral for every app Ingenium ships (Ingenium 7.12).

Why. Since 6.7 (modules/r178.js) an app whose page carries its own packaging templates (The Forge's <script id="cd-pkg-src">) is
shipped from them; every other app (Carpe Diem, Inkwell, the apps she makes in Build or keeps in Fabrica) was shipped from Ingenium's
own repositories, renamed (r178's ownKit). Fabrica's audit of 14 November 2026 found what that left in such a kit: for the Fire
tablet, Ingenium's model engine (its Java bridge, its native engine and the JNI glue); for the iPhone and iPad, Ingenium's Swift
engine and bridge; for the Mac, Ingenium's key tool. Her list for Fabrica (7.05): never Ingenium's own files or logo in another
app's kits, each app with its own icons and no errors, a kit to build it herself in the terminal as well as on GitHub.

What this does. It reads The Forge's templates (build/apps/builtin/forge.html.gz, the page's own <script id="cd-pkg-src">), keeps
every project, recipe and guide The Forge ships for each device (Mac, Mac mini, Windows, iPhone and iPad, Fire tablet, the web),
and makes them the family's, for any app:
  - the owner's name becomes __APP_OWNER__ and the year __APP_YEAR__ (filled when a kit is made, from the person's own profile, so
    no edition but the master carries the master's name); the Fire project's Java package becomes __APP_NS__ (the app's own id,
    or the activity name an earlier package of that app kept, so a home screen icon still points to it);
  - no picture of another app's (The Forge's seal is dropped; each kit draws its icons from the app's own picture), and only the
    licence and terms that name no app;
  - the guides speak of the app itself, never of The Forge, Carpe Diem, Inkwell or Ingenium, and say "Made by Fabrica";
  - the Fire tablet project gains Gradle's own wrapper (kits/gradle: gradlew, gradlew.bat, gradle-wrapper.jar, Apache 2.0) and a
    terminal build for a Mac and for Windows (kits/family/fire); the Windows project gains a terminal build of the program and its
    installer (kits/family/windows); their guides gain a part on building on her own computer.
Every change must find its text exactly as many times as it says, so a change to The Forge's templates stops this script instead
of leaving a name behind. The result is written, compressed, into modules/r299.js, which r178 uses for every app but Ingenium.

    python3 build/kits/family_templates.py          # writes build/modules/r299.js
    python3 build/kits/family_templates.py --json   # also writes the neutral templates, readable, to stdout
"""
import base64, gzip, json, os, re, sys, zlib

HERE = os.path.dirname(os.path.abspath(__file__))
BUILD = os.path.dirname(HERE)
FORGE = os.path.join(BUILD, "apps", "builtin", "forge.html.gz")
OUT = os.path.join(BUILD, "modules", "r299.js")
FAMILY = os.path.join(HERE, "family")
GRADLE = os.path.join(HERE, "gradle")
VERSION = "7.12"

FIRE = "__APP_TITLE__ for Fire tablet/"
FIREP = FIRE + "Fire tablet project/"
WIN = "__APP_TITLE__ for Windows/"
WINP = WIN + "Windows project/"
IOS = "__APP_TITLE__ for iPhone and iPad/"


def die(msg):
    sys.exit("family_templates.py: " + msg)


def forge_templates():
    html = gzip.open(FORGE, "rb").read().decode("utf-8")
    m = re.search(r'<script\b[^>]*\bid=["\'][\w-]*pkg-src["\'][^>]*>\s*b64:([A-Za-z0-9+/=\s]+?)\s*</script', html)
    if not m:
        die("The Forge's page carries no packaging templates (<script id=\"cd-pkg-src\">)")
    T = json.loads(base64.b64decode(re.sub(r"\s+", "", m.group(1))).decode("utf-8"))
    if T.get("v") != 2:
        die("The Forge's templates are of version %r, not 2" % T.get("v"))
    return T


def every_text(T):
    """(device, path) for every text value: the projects' files and the texts."""
    for dev in ("mac", "mac_mini", "windows", "ios", "fire", "web"):
        for k, v in T[dev].items():
            if isinstance(v, str) and not k.startswith("@@") and not v.startswith(("@@", "icon:", "b64:")):
                yield dev, k
    for k in T["texts"]:
        yield "texts", k


def replace(T, old, new, times, where=None):
    """Replaces old with new in every text (or those whose path holds `where`); times is how many it must find, None for any
    number above nought."""
    n = 0
    for dev, k in list(every_text(T)):
        if where and where not in dev + "|" + k:
            continue
        v = T[dev][k]
        o, nw = (crlf(old), crlf(new)) if "\r\n" in v else (old, new)   # a file with Windows line endings keeps them
        c = v.count(o)
        if c:
            T[dev][k] = v.replace(o, nw)
            n += c
    if (times is None and n == 0) or (times is not None and n != times):
        die("%r: found %d time(s), expected %s" % (old[:70], n, times if times is not None else "at least once"))
    return n


def crlf(s):
    return s.replace("\r\n", "\n").replace("\n", "\r\n")


def rename_keys(T, old, new):
    n = 0
    for dev in ("mac", "mac_mini", "windows", "ios", "fire", "web"):
        for k in list(T[dev].keys()):
            if old in k:
                T[dev][k.replace(old, new)] = T[dev].pop(k)
                n += 1
    return n


def read(*p):
    with open(os.path.join(*p), encoding="utf-8") as fh:
        return fh.read()


def b64file(*p):
    with open(os.path.join(*p), "rb") as fh:
        return "b64:" + base64.b64encode(fh.read()).decode("ascii")


def windows_text(t, bom=False):
    """A .bat or .ps1 file as Windows reads it best: CRLF line endings; a .ps1 with a UTF-8 byte order mark, so that Windows
    PowerShell 5.1 reads an app's name with accents as written."""
    t = t.replace("\r\n", "\n").replace("\n", "\r\n")
    return ("﻿" + t) if bom else t


# ---- the parts each guide gains ----
FIRE_PART3 = """PART 3. BUILD THE APK ON YOUR OWN MAC OR PC (optional)
------------------------------------------------------

The project carries Gradle's own starter (gradlew), so it builds on your
computer as it does on GitHub. You need two things on that computer, once:
  - Android Studio, from developer.android.com/studio. It brings the
    Android tools and its own Java. Open it once after installing it, so
    that its first screens fetch the Android tools; then you may close it.
  - The internet, the first time, to fetch Gradle and the parts of the
    Android tools the project names.

On a Mac: in "Fire tablet project", double-click "Build the APK.command".
  If macOS refuses to open it, right-click it, choose Open, then Open.
On a Windows PC: in "Fire tablet project", double-click
  "Build the APK (Windows).bat". If Windows SmartScreen stops it, choose
  More info, then Run anyway.

A window shows each step. The first build takes several minutes; later
ones are quicker. When it ends, __APP_APK__ is in this package's top
folder, beside READ ME FIRST.txt. Put it on the tablet as in Part 1.

The first build on your computer makes the app's permanent signing key in
the folder "signing", as GitHub's first build does (Part 2 says why it
matters). Keep that folder. If GitHub has already made a key for this app,
copy the "signing" folder from your repository into "Fire tablet project"
before you build, so that both make APKs that install over each other.

Each run writes build_log.txt in "Fire tablet project". If a build fails,
the window says why, and the last lines of that file name the cause.


"""

WIN_PART4 = """PART 4. MAKING IT ON THIS PC INSTEAD (optional)
-----------------------------------------------

"Build __APP_TITLE__ (Windows).bat", inside "Windows project", makes the
same program and the same installer on this PC. It needs, once:
  - Python 3.12, from www.python.org/downloads (in its installer, tick
    "Add python.exe to PATH");
  - the internet, to fetch the build tools (the same versions GitHub's
    build uses);
  - Inno Setup 6, from jrsoftware.org, for the installer. Without it the
    build still makes the program folder, which runs as it is.
Double-click the .bat file. If Windows SmartScreen stops it, choose More
info, then Run anyway. A window shows each step; the first build takes
several minutes. When it ends:
  - the installer, whose name ends in -Setup.exe, is in this package's
    top folder, beside READ ME FIRST.txt; open it to install __APP_TITLE__;
  - the program folder is "Windows project\\dist\\__APP_TITLE__".
Each run writes build_log.txt in "Windows project". If a build fails, the
window says why, and the last lines of that file name the cause.


"""

WIN_WHY = """WHY WINDOWS MAY REMOVE IT
-------------------------
A program new to Windows has no reputation yet, and this one is not signed
(see below). The steps above find which file Windows removed and the name
it gave. What helps:
  - The program is built with PyInstaller's standard starter, which
    Windows has seen on many PCs, never a new one made for each build.
  - GitHub's scan is good evidence, not a guarantee. Your PC can also
    ask Microsoft's cloud, and may send it a new program for a closer
    look. The cloud may judge differently. If it does, the steps above
    say what to do.
"""


def neutral():
    T = forge_templates()
    # 1. no picture and no text of another app's
    T["icons"] = {}
    T["texts"] = {k: T["texts"][k] for k in ("licence", "terms")}
    # 2. the owner, the year and the Fire project's Java package, filled when a kit is made
    replace(T, "Copyright (c) 2026 Yannie D. Forest", "Copyright (c) __APP_YEAR__ __APP_OWNER__", None)
    replace(T, "Yannie D. Forest", "__APP_OWNER__", None)
    replace(T, "com.yannie.carpediem", "__APP_NS__", 2)
    if rename_keys(T, "com/yannie/carpediem", "__APP_NS_PATH__") != 1:
        die("the Fire project's MainActivity.java was not found under com/yannie/carpediem")
    # 3. the guides speak of the app itself
    replace(T, "Made by The Forge, __APP_TODAY__.", "Made by Fabrica, __APP_TODAY__.", None)
    replace(T, ".forge_probe", ".build_probe", 2)
    # Windows
    replace(T, "The installer is made for you on GitHub, the same way Inkwell's is. This\npackage holds what GitHub needs to make it.",
            "The installer is made for you on GitHub, or on this PC (Part 4). This\npackage holds what both need to make it.", 2)
    replace(T, "Like Inkwell, __APP_TITLE__ draws its own window with Microsoft's WebView2\ncomponent, which comes with Windows 10 and 11. That is not a browser\nwindow.",
            "__APP_TITLE__ draws its own window with Microsoft's WebView2 component,\nwhich comes with Windows 10 and 11. That is not a browser window.", 2)
    replace(T, "Everything GitHub needs to build the\n                                  program and its installer.",
            "Everything needed to build the program\n                                  and its installer, on GitHub or on\n                                  this PC (Part 4).", 2)
    replace(T, "WHAT IS NEW IN THIS BUILD\n  - The program is built the way Inkwell is built, with the same\n"
               "    ready-made starter that Inkwell has. (A starter is the small part\n"
               "    that opens a program. Earlier builds made a new one each time.)\n"
               "  - There is one way to have __APP_TITLE__ on Windows: the installer from\n"
               "    your Releases page. The two .bat files are gone; they needed Python\n    on the PC.\n"
               "  - GitHub's check with Microsoft Defender now only scans. It no longer\n"
               "    changes any of Defender's settings, and this package carries no\n    such commands.\n"
               "  - If __APP_TITLE__ ever closes unexpectedly, it still opens in its own\n"
               "    window next time. It never opens your browser by itself for that.\n\n", "", 2)
    replace(T, "standard starter (as Inkwell's) and its version details;", "standard starter and its version details;", 2)
    replace(T, "first and keep the file (in The Forge: Settings, Backup, \"Export\n   everything\"). The installer also copies",
            "first and keep the file (with the app's own backup or Export, where it\n   has one). The installer also copies", 2)
    guide = T["windows"][WIN + "READ ME FIRST.txt"].replace("\r\n", "\n")
    i = guide.find("WHY WINDOWS MAY HAVE REMOVED IT\n")
    j = guide.find("\n\nCODE SIGNING:")
    if i < 0 or j < i:
        die("the Windows guide's part on why Windows may have removed it was not found")
    old = guide[i:j]
    if "Inkwell" not in old:
        die("the Windows guide's part on why Windows may have removed it changed")
    replace(T, old, WIN_WHY.rstrip("\n"), 2)
    replace(T, "Neither Inkwell nor __APP_TITLE__ is signed today.", "__APP_TITLE__ is not signed today.", 2)
    replace(T, "\n\nIF THE BUILD FAILS\n------------------\n", "\n\n" + WIN_PART4 + "IF THE BUILD FAILS\n------------------\n", 2,
            where="windows|" + WIN)
    replace(T, "package zip made by\n        # The Forge carries it.", "kit zip made by\n        # Fabrica carries it.", 2)
    replace(T, "# 7 October 2026), which Ingenium also pins. Fixed, so a new release",
            "# 7 October 2026), which the family's apps pin. Fixed, so a new release", 2)
    replace(T, "(up to 16 minutes, as\n      # Ingenium's check waits), and add", "(up to 16 minutes),\n      # and add", 2)
    replace(T, "What the page needs from its window, as Inkwell's and Ingenium's iPhone and\n   iPad apps give it:",
            "What the page needs from its window, as the family's iPhone and iPad\n   apps give it:", 1)
    replace(T, "This launcher serves every app The Forge packages.", "This launcher serves every app The Forge or Fabrica packages.", 1)
    # the Mac mini
    replace(T, "  1. On the MacBook Pro, open __APP_TITLE__ and export a backup. In The\n"
               "     Forge: Settings, Backup, \"Export everything\". (In another app made\n"
               "     by The Forge: its own backup or Export button.) Keep the file.\n"
               "     Not the Editor's \"Import (JSON)\" or its JSON export: those carry\n"
               "     only edits, not your work.\n",
            "  1. On the MacBook Pro, open __APP_TITLE__ and export a backup, with its\n"
            "     own backup or Export button. Keep the file.\n", 1)
    replace(T, "  3. On the Mac mini, open __APP_TITLE__ and read the file back. In The\n"
               "     Forge: Settings, Backup, \"Read a backup back\".\n",
            "  3. On the Mac mini, open __APP_TITLE__ and read the file back, with its\n"
            "     own way of bringing a backup in.\n", 1)
    # iPhone and iPad
    replace(T, "(for example Inkwell, Ingenium or Carpe Diem)", "(for example your other apps)", 4)
    replace(T, "This is the way Carpe Diem for iPhone and iPad is installed. You need a\nMac",
            "This is the simplest way when you have a Mac. You need a\nMac", 2)
    replace(T, "This is the way Inkwell and Ingenium are installed. Sideloadly is also\nmade for the Mac, but on a Mac, Way 1 is simpler.",
            "This way needs no Mac. Sideloadly is also made for the Mac, but on a\nMac, Way 1 is simpler.", 2)
    replace(T, "iphone-ipad (the way Ingenium's repository holds both). Or make a new", "iphone-ipad. Or make a new", 2)
    replace(T, "make the new iPhone and iPad package in The\n    Forge and upload BOTH",
            "make the new version's iPhone and iPad kit in\n    Fabrica and upload BOTH", 2)
    replace(T, "or out, use the app's own backup (in The Forge: Settings, Backup,\n  \"Export everything\", and \"Read a backup back\" to bring it in).",
            "or out, use the app's own backup or Export, where it has one.", 2)
    replace(T, "- Way 1 follows Carpe Diem's iPhone and iPad project, which is installed\n  with Xcode and a free Apple ID. This project matches it in every\n  setting that signing depends on:",
            "- Way 1 is made for Xcode and a free Apple ID, in every setting that\n  signing depends on:", 2)
    replace(T, "- Way 2 follows the way Inkwell and Ingenium are installed, and\n  Sideloadly's published method.",
            "- Way 2 follows Sideloadly's published method.", 2)
    replace(T, "# for example the Fire tablet project, the way Ingenium's repository holds\n# both. This file builds",
            "# for example the Fire tablet project. This file builds", 2)
    replace(T, "# installs it over the USB cable, the way Inkwell and Ingenium are installed.", "# installs it over the USB cable.", 2)
    replace(T, "# Made by The Forge from the recipe that builds Carpe Diem for iPhone and iPad\n# (the same Xcode project), with the checks of the recipes that build Inkwell\n# and Ingenium.",
            "# Made by Fabrica from the family's recipe for iPhone and iPad.", 2)
    replace(T, "# cannot do for you. Made from the file that opens Carpe Diem's iPhone and\n# iPad project.\n",
            "# cannot do for you. Made by Fabrica.\n", 1)
    replace(T, "(The Forge marks this file as a program when it makes the", "(Fabrica marks this file as a program when it makes the", 1)
    replace(T, "every app made by The Forge: it names where the app stores your work) */",
            "every app The Forge or Fabrica makes: it names where the app stores your work) */", 1)
    # the Fire tablet
    replace(T, "This package holds everything needed to put __APP_TITLE__ on a Fire tablet\n(or any Android tablet or phone), and to rebuild it yourself later on\nGitHub, with no help and no tools installed on your computer.",
            "This package holds everything needed to put __APP_TITLE__ on a Fire tablet\n(or any Android tablet or phone), and to rebuild it yourself later: on\nGitHub, with no tools installed on your computer, or on your own Mac or\nPC (Part 3).", 2)
    replace(T, "the installable app, __APP_APK__ (Way B).",
            "the installable app, __APP_APK__ (Way B).\n                                  It also builds on your computer\n                                  (Part 3).", 2)
    replace(T, "  1. In The Forge, ship the new version as the Fire package again, and\n     unzip it.",
            "  1. In Fabrica, make the new version's Fire tablet kit, and unzip it.", 2)
    replace(T, "\n\nUPDATING THE APP LATER (for example with a newer __APP_HTML__)\n",
            "\n\n" + FIRE_PART3 + "UPDATING THE APP LATER (for example with a newer __APP_HTML__)\n", 2)
    replace(T, "# Made by The Forge from the recipe that builds Carpe Diem for the Fire tablet.",
            "# Made by Fabrica from the family's recipe for the Fire tablet.", 2)
    replace(T, "<!-- INTERNET, as in Carpe Diem since 2 October 2026 at the owner's request. The app still",
            "<!-- INTERNET, as in the family's apps since 2 October 2026. The app still", 1)
    replace(T, "*.apk\n", "*.apk\nbuild_log.txt\n", 1, where="fire|" + FIREP + ".gitignore")
    # 4. the terminal builds and Gradle's own wrapper
    T["fire"][FIREP + "gradlew"] = b64file(GRADLE, "gradlew")
    T["fire"][FIREP + "gradlew.bat"] = b64file(GRADLE, "gradlew.bat")
    T["fire"][FIREP + "gradle/wrapper/gradle-wrapper.jar"] = b64file(GRADLE, "gradle", "wrapper", "gradle-wrapper.jar")
    T["fire"][FIREP + "Build the APK.command"] = read(FAMILY, "fire", "Build the APK.command")
    T["fire"][FIREP + "Build the APK (Windows).bat"] = windows_text(read(FAMILY, "fire", "Build the APK (Windows).bat"))
    T["fire"][FIREP + "build_apk.ps1"] = windows_text(read(FAMILY, "fire", "build_apk.ps1"), bom=True)
    wf = T["windows"][WINP + ".github/workflows/build-windows-app.yml"]
    m = re.search(r'python -m pip install --quiet (--only-binary=\S+ (?:"[^"\s]+==[^"\s]+" ?)+)', wf)
    if not m:
        die("the Windows recipe's pinned build tools were not found")
    pins = m.group(1).replace('"', "").strip()
    ps1 = read(FAMILY, "windows", "build_windows.ps1")
    if ps1.count("@@PIP_ARGS@@") != 1:
        die("build_windows.ps1 must name @@PIP_ARGS@@ once")
    T["windows"][WINP + "build_windows.ps1"] = windows_text(ps1.replace("@@PIP_ARGS@@", pins), bom=True)
    T["windows"][WINP + "Build __APP_TITLE__ (Windows).bat"] = windows_text(read(FAMILY, "windows", "Build __APP_TITLE__ (Windows).bat"))
    T["windows"][WINP + ".gitignore"] = "# Made by each build on this PC, never part of the project\n.buildenv/\nbuild/\ndist/\nbuild_log.txt\n"
    replace(T, "*.iss -text\n", "*.iss -text\n# The build files for this PC are kept as committed.\n*.bat -text\n*.ps1 -text\n", 1,
            where="windows|" + WINP + ".gitattributes")
    # 5. nothing of the owner's, and nothing of another app's in a guide
    left = []
    for dev, k in every_text(T):
        v = T[dev][k]
        if re.search(r"yannie|forest", v, re.I):
            die("%s %s still names the owner" % (dev, k))
        if "Ingenium" in v or "ingenium" in k.lower():
            die("%s %s still names Ingenium" % (dev, k))
        if k.endswith((".txt", ".md")) and re.search(r"\bForge\b|Carpe Diem|Inkwell|Ingenium", v):
            left.append("%s %s: %s" % (dev, k, re.search(r".{0,40}(\bForge\b|Carpe Diem|Inkwell|Ingenium).{0,40}", v).group(0)))
    for k in T["fire"]:
        if "yannie" in k.lower():
            die("a Fire file's path still names the owner: " + k)
    allowed = [l for l in left if "WORKFLOW_paste_this" in l]  # the recipes' engineering notes keep their history
    if len(left) != len(allowed):
        die("a guide still names another app:\n  " + "\n  ".join(l for l in left if l not in allowed))
    return T, pins


def module(T, pins):
    raw = json.dumps(T, ensure_ascii=False, separators=(",", ":"), sort_keys=False).encode("utf-8")
    z = zlib.compress(raw, 9)
    b64 = base64.b64encode(z).decode("ascii")
    devices = [d for d in ("mac", "mac_mini", "windows", "ios", "fire", "web") if T.get(d)]
    head = """<script>try{(window.__ingParts=window.__ingParts||{})["p299"]="started";}catch(_){}
/* ============ R299 · THE FAMILY'S PACKAGING, FOR EVERY APP SHE SHIPS (Ingenium %(v)s, 15 November 2026) ============
   Her list for Fabrica (7.05): another app's kits never carry Ingenium's own files or logo; each app has its own icons and no
   errors; each device has a kit to build it herself, in the terminal as well as on GitHub, and a ready-made app.
   Fabrica's audit of 14 November 2026 found what an app without packaging templates of its own was given (r178's ownKit, which
   renamed Ingenium's repositories): for the Fire tablet Ingenium's model engine, for the iPhone and iPad its Swift engine and
   bridge, for the Mac its key tool. This module carries the family's packaging, made neutral by build/kits/family_templates.py
   from The Forge's own templates: every project, recipe and guide for the Mac, the Mac mini, Windows, the iPhone and iPad, the
   Fire tablet and the web, with no other app's picture or name, the owner and the year filled when a kit is made (from the
   person's own profile), the Fire project's Java package set to the app's own, Gradle's own wrapper and a terminal build for the
   Fire tablet (Mac and Windows) and for the Windows program and its installer. The Windows terminal build installs the same
   build tools as GitHub's build (%(pins)s).
   modules/r178.js ships every app but Ingenium from it when the app's page carries no templates of its own; Ingenium itself
   keeps its own projects. %(n)d bytes of templates, carried compressed (%(z)d bytes). */
(function r299(){
"use strict";
if(window.__ingR299)return;window.__ingR299=true;
var RAW=%(n)d,DEVICES=%(dev)s,DATA="%(data)s";
var memo=null;
function bytes(){var s=atob(DATA),u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u;}
function inflate(z){var R=window.IngRepo&&IngRepo.core;
  if(R&&typeof R.inflateZ==="function"){try{return Promise.resolve(R.inflateZ(z,0,RAW).data);}catch(e){}}
  if(typeof DecompressionStream==="function")return new Response(new Blob([z]).stream().pipeThrough(new DecompressionStream("deflate"))).arrayBuffer().then(function(b){return new Uint8Array(b);});
  return Promise.reject(new Error("This copy of Ingenium cannot unpack the family's packaging."));}
/* the templates, unpacked once: {v:2, icons:{}, texts:{licence,terms}, mac, mac_mini, windows, ios, fire, web} */
function templates(){if(memo)return memo;
  memo=inflate(bytes()).then(function(u){var T=JSON.parse(new TextDecoder("utf-8").decode(u));
    if(!T||T.v!==2)throw new Error("The family's packaging could not be read.");return T;});
  memo.catch(function(){memo=null;});return memo;}
window.IngFamilyKit={has:function(){return true;},templates:templates,devices:DEVICES.slice(),size:RAW,version:"%(v)s"};
;try{window.__ingParts["p299"]="running";}catch(_){}
})();
</script>
"""
    return head % {"v": VERSION, "pins": pins, "n": len(raw), "z": len(z), "dev": json.dumps(devices), "data": b64}


def main():
    T, pins = neutral()
    text = module(T, pins)
    with open(OUT, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(text)
    raw = len(json.dumps(T, ensure_ascii=False, separators=(",", ":")).encode("utf-8"))
    print("wrote %s: %d bytes (templates %d bytes; %s)" % (os.path.relpath(OUT, os.path.dirname(BUILD)), len(text.encode("utf-8")), raw,
          ", ".join("%s %d files" % (d, len([k for k in T[d] if not k.startswith("@@")])) for d in ("mac", "mac_mini", "windows", "ios", "fire", "web"))))
    if "--json" in sys.argv:
        json.dump(T, sys.stdout, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
