"""Fabrica for the Forge (pass 647): Ingenium 6.6's Fabrica, carried into the Forge without any model, now making the apps a
device installs, here on the device: for the Fire tablet and Android (APK), the iPhone and iPad (IPA), a Mac, and Windows.

The owner's words (20 October 2026): "It was supposed to be my own personal offline GitHub and ship ready made apps on my
devices for all of my devices". Ingenium's Fabrica has made the APK and the IPA on the device since 6.0 (R136) and the Mac and
Windows apps since 6.5 (R170); the Forge's Fabrica (pass 639, made fresh in 643) left them out and offered only its five
install packages, projects for a computer or GitHub to build. Now the Forge carries the same makers and the same four shells
(source/shells/out, each checked against the fingerprint the build that made it wrote), so its Test and ship offers them too,
beside the five install packages, with Package details (the app's id, version and signing key).

Everything pass 639's adaptation does stays as it is (forge_639/forge_fabrica.py: the Forge's own store, keeping, colours,
file editor, Editor, app library and install packages); what changes here, each change found exactly once or the pass stops:
  - the targets: the APK, the IPA, the Mac app and the Windows app stay, and the build kits are the Forge's five install
    packages; a new app is offered the APK and one page first, as in Ingenium;
  - Package details and the line naming the app's id and key stay in Test and ship and the app's menu;
  - R136 and R170, the makers, as Ingenium builds them, in the Forge's words: its own key store (forge_keys), its name in a
    certificate the device makes and in what it writes into an app ("Made with the Forge's Fabrica");
  - the four shells, carried in the page.
usage (from forge647.py): block() returns the styles and scripts to put in place of the Fabrica the page carries."""
import base64, hashlib, importlib.util, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
_sp = importlib.util.spec_from_file_location("forge_fabrica_639", os.path.join(HERE, "..", "forge_639", "forge_fabrica.py"))
F = importlib.util.module_from_spec(_sp)
_sp.loader.exec_module(F)
Src = F.Src
SHELLS = os.path.normpath(os.path.join(HERE, "..", "..", "shells", "out"))


def r112():
    """pass 639's changes to R112, but for the targets a device installs, which stay"""
    p = Src("r112")
    p.rep('#page-fabrica.fb-page > .page-title,#page-fabrica.fb-page > .lede{display:none !important}\n', '')
    p.rep('body.fb-on .main{padding-bottom:10px !important}\n', '')
    p.cut("/* 6.0: Ingenium's own foot only", '#fb{\n', '')
    p.rep('if(typeof IngRepo==="undefined"||typeof IngShip==="undefined"||typeof go!=="function")return;',
          'if(typeof IngRepo==="undefined"||typeof IngShip==="undefined")return;\n' + F.LOCAL_STATE)
    p.rep("Your workshop, on this device: each of your apps kept with every version, changed, tested and shipped from here.",
          "Your workshop, in the Forge: each of your apps kept with every version, changed, tested and shipped from here, with no model and no connection.")
    p.rep('"<b>A new app, ready for its first page</b>Describe it in Chat or open it in Code: every change the model makes, and every save of yours, lands here as a change to keep. Or bring in a page you already have."',
          '"<b>A new app, ready for its first page</b>Write its first page here, or bring in a page you already have. Every save of yours lands here as a change to keep."')
    p.rep('f.appendChild(btn("pri","Open it in Code",function(){openInCode(r);}));f.appendChild(btn("","Write its first page",function(){openEditor(r,"index.html");}));',
          'f.appendChild(btn("pri","Write its first page",function(){openEditor(r,"index.html");}));')
    p.rep('"<b>Nothing changed since the last version</b>Every change you or the model make in Chat or Code appears here first, file by file, with exactly what changed. You keep it as a version when it is right."',
          '"<b>Nothing changed since the last version</b>Every change you save here, or bring back from the Editor, appears here first, file by file, with exactly what changed. You keep it as a version when it is right."')
    p.rep('f.appendChild(btn("","Open it in Code",function(){openInCode(r);}));f.appendChild(btn("","Edit a file",function(){openEditor(r);}));return;}',
          'f.appendChild(btn("","Edit a file",function(){openEditor(r);}));return;}')
    p.rep('Open them in Code, keep one of each, then keep this version.', 'Edit them here, keep one of each, then keep this version.')
    p.rep('open them in Code, keep one of each, then keep this version.', 'edit them here, keep one of each, then keep this version.')
    p.rep('f.appendChild(btn("","Open it in Code",function(){openInCode(r,selp?selp.path:null);}));\n', '')
    p.cut('function saveBytes(name,mime,data){', '/* the history: every version kept', F.FORGE_SAVE)
    # 647: the apps a device installs stay; the build kits are the Forge's five install packages
    p.rep('["kits","Build kits (.zip)","Projects to build the apps on a computer or online: you choose the devices"]]',
          '["kits","Install packages (.zip)","Five projects to build on a computer or online: Mac, Mac mini, Windows, iPhone and iPad, Fire"]]')
    p.rep('function kitsHere(){return typeof kitStore==="function"&&typeof kitAssemble==="function"&&typeof makeZip==="function"&&!!document.getElementById("ingenium-kit-bundle");}',
          'function kitsHere(){try{return !!(window.FORGE&&FORGE.fab&&FORGE.fab.kits&&FORGE.fab.hasKits());}catch(e){return false;}}')
    p.rep('"The kits are made on a computer: this build of Ingenium carries no kit store."', '"This copy of the Forge carries no install packages."')
    for what in ("Android shell", "iPhone and iPad shell", "Mac shell", "Windows shell"):
        p.rep('"This build of Ingenium carries no %s."' % what, '"This copy of the Forge carries no %s."' % what)
    p.cut('/* the build kits: the devices chosen, one zip each, saved one after another */', '/* what was made, kept on this device beside its version',
          '/* the five install packages, made by the Forge\'s own packager from the version kept (PASS 639), each saved after the one\n'
          '   before it and kept under Releases (6.0) */\n'
          'function sheetKits(r){makeOne(r,"kits").catch(function(){});}\n'
          'function makeKits(r){return IngShip.onePage(r.id,{quiet:true}).then(function(x){var base=(r.slug||r.name||"app").replace(/[^\\w.-]+/g,"_");\n'
          '  return FORGE.fab.kits(x.html,base,function(i,n){if(S.making){S.making.prog.kits=Math.round(10+60*i/n);paintShip();}}).then(function(list){if(!list.length)throw new Error("this copy of the Forge carries no install packages");\n'
          '    var total=0,made=[],chain=Promise.resolve();\n'
          '    list.forEach(function(k,i){chain=chain.then(function(){say(r,"kits","Saving "+k.name+"…");total+=k.size;made.push({name:k.name,size:k.size});\n'
          '      return saveBytes(k.name,"application/zip",k.bytes).then(function(){return keepMade(r,x.commit,"kits",k.name,"application/zip",k.bytes);}).then(function(){if(S.making){S.making.prog.kits=Math.round(70+28*(i+1)/list.length);paintShip();}});});});\n'
          '    return chain.then(function(){return IngRepo.setNote(r.id,x.commit,"kits",{at:Date.now(),size:total,made:made});}).then(function(){return total;});});});}\n')
    # the app's menu: no Build page and no Code in the Forge (Package details stays); its file editor is the Forge's own
    p.rep('  item("Open it in Build",function(){openInBuild(r);});\n  item("Open it in Code",function(){openInCode(r);});\n', '')
    p.cut("/* the app's files, written here: any text file, saved as a change to keep", '/* the releases: each version',
          '/* the app\'s files: the Forge\'s own file editor (FORGE_JS) */\nfunction openEditor(r,path,report){openInCode(r,path,report);}\n')
    # (6.2: the app runs in a window of its own where one can open; where none can, the Forge saves the one page)
    p.rep('if(typeof csShow==="function"){go("chat");csShow({kind:"file",html:html,name:x.page||(r.slug+".html")},{user:true});}else toast("This build cannot open a window; save the one page and open it.");',
          'saveBytes(x.page||(r.slug+".html"),"text/html",new TextEncoder().encode(html));toast("This window cannot open another, so the one page is saved instead: open it to run "+r.name+".");')
    p.cut('function libList(){', 'function sheetLibrary(lib,into){', _LIB)
    p.rep('"The copies Lector keeps on this device. Each comes in as a repository with a first version."',
          '"The copies the Forge keeps on this device. Each comes in as a repository with a first version."')
    p.cut('function sheetProjects(prs,into){', 'function sheetNew(){', '')
    p.rep('"Its name. Then give it its first page in Chat or Code, or bring one in."', '"Its name. Then write its first page here, or bring one in."')
    p.rep('toast("A new app, "+name+": give it its first page in Chat or Code, or bring one in.");', 'toast("A new app, "+name+": write its first page here, or bring one in.");')
    p.cut('/* ---------- Code and Fabrica keep the same files ---------- */', ';try{window.__ingParts["p44"]="running";}catch(_){}', F.FORGE_JS + "\n")
    js = p.s
    if re.search(r"\bccMakeProject\(|\bccNewSession\(|\bccLoadAll\(|\bgo\(\"(?:code|chat|build)\"\)|kitStore\(|libApps\(|IngBuild|openInBuild|saveFileNative", js):
        raise SystemExit("r112: a way into Code or Ingenium's kits is still there")
    for k in ('["apk","Android app (APK)"', '["ipa","iPhone and iPad app (IPA)"', '["mac","Mac app"', '["win","Windows app (.exe)"', 'item("Package details"'):
        if js.count(k) != 1:
            raise SystemExit("r112: %s should be there once" % k)
    return js


# pass 639's way of bringing an app in (the Forge's app library and its Editor), cut out of its block() as it is
_b = open(os.path.join(HERE, "..", "forge_639", "forge_fabrica.py"), encoding="utf-8").read()
_a = _b.find("p.cut('function libList(){', 'function sheetLibrary(lib,into){',\n")
_z = _b.find("\n    p.rep('\"The copies Lector keeps on this device.", _a)
_seg = _b[_a:_z].split("\n", 1)[1].rstrip() if _a >= 0 and _z > _a else ""
if not _seg.endswith(")"):
    raise SystemExit("forge_fabrica.py: the app library's way in was not found")
_LIB = eval("(" + _seg[:-1] + ")")


def r136():
    """the APK and the IPA, made on the device, in the Forge's words"""
    a = Src("r136")
    a.rep('indexedDB.open("ingenium_keys",1)', 'indexedDB.open("forge_keys",1)')
    a.rep('"this window has no Web Crypto: open Ingenium from its own app or a secure address"', '"this window has no Web Crypto: open the Forge from its own app or a secure address"')
    a.rep('UTF8S(cn||"Ingenium")', 'UTF8S(cn||"The Forge")')
    a.rep('makeKeyPair("Ingenium, on this device")', 'makeKeyPair("The Forge, on this device")')
    a.rep('"this keystore is locked in an older way Ingenium cannot open (not PBES2): make it again with keytool, or export it as PKCS #12 with AES"',
          '"this keystore is locked in an older way the Forge cannot open (not PBES2): make it again with keytool, or export it as PKCS #12 with AES"')
    a.rep('"this keystore uses a key derivation Ingenium cannot open"', '"this keystore uses a key derivation the Forge cannot open"')
    a.rep('"this keystore uses a cipher Ingenium cannot open"', '"this keystore uses a cipher the Forge cannot open"')
    a.rep('"not a PKCS #12 keystore Ingenium can read"', '"not a PKCS #12 keystore the Forge can read"')
    a.rep('"this build of Ingenium carries no Android shell"', '"this copy of the Forge carries no Android shell"')
    a.rep('"this build of Ingenium carries no iPhone and iPad shell"', '"this copy of the Forge carries no iPhone and iPad shell"')
    a.rep('made:"Ingenium Fabrica"', 'made:"The Forge\'s Fabrica"', 2)
    a.rep('signV1(files,key,"Ingenium Fabrica")', 'signV1(files,key,"The Forge\'s Fabrica")')
    _left(a, "r136")
    return a.s


def r170():
    """the Mac and Windows apps, made on the device, in the Forge's words"""
    a = Src("r170")
    a.rep('"this window has no Web Crypto: open Ingenium from its own app or a secure address"', '"this window has no Web Crypto: open the Forge from its own app or a secure address"')
    a.rep('"this build of Ingenium carries no Mac shell"', '"this copy of the Forge carries no Mac shell"')
    a.rep('"this build of Ingenium carries no Windows shell"', '"this copy of the Forge carries no Windows shell"')
    a.rep('"Made with Ingenium Fabrica, for a Mac (Apple silicon or Intel, macOS 12 or newer)."', '"Made with the Forge\'s Fabrica, for a Mac (Apple silicon or Intel, macOS 12 or newer)."')
    a.rep('"Made with Ingenium Fabrica, for Windows 10 and 11 (64-bit)."', '"Made with the Forge\'s Fabrica, for Windows 10 and 11 (64-bit)."')
    a.rep('made:"Ingenium Fabrica"', 'made:"The Forge\'s Fabrica"', 2)
    a.rep('"made=Ingenium Fabrica"', '"made=The Forge\'s Fabrica"')
    _left(a, "r170")
    return a.s


def _left(a, name):
    """no string the Forge shows or writes into an app may still name Ingenium (comments aside)"""
    code = re.sub(r"/\*[\s\S]*?\*/", "", a.s)
    left = [m.group(0) for m in re.finditer(r'"(?:[^"\\\n]|\\.)*Ingenium(?:[^"\\\n]|\\.)*"', code)]
    if left:
        raise SystemExit("%s: still names Ingenium: %s" % (name, left))


def shells():
    """the four shells Fabrica fills, each checked against the fingerprint its build wrote (as Ingenium's build_page.py)"""
    out = []
    ios = json.load(open(os.path.join(SHELLS, "ios-shell.json")))["device"]
    for sid, sf, rec in (("ing-android-shell", "android-shell.dex", None), ("ing-ios-shell", "ios-shell.zip", ios),
                         ("ing-mac-shell", "mac-shell.zip", "mac-shell.json"), ("ing-win-shell", "win-shell.exe", "win-shell.json")):
        b = open(os.path.join(SHELLS, sf), "rb").read()
        if isinstance(rec, str):
            rec = json.load(open(os.path.join(SHELLS, rec)))
        if rec and (len(b) != rec["bytes"] or hashlib.sha256(b).hexdigest() != rec["sha256"]):
            raise SystemExit(sf + ": its size or fingerprint does not match the record its build wrote")
        out.append('<script type="forge/shell" id="%s">%s</script>' % (sid, base64.b64encode(b).decode("ascii")))
    return out


def block():
    r110 = Src("r110")
    r110.rep('indexedDB.open("ingenium_repos",1)', 'indexedDB.open("forge_repos",1)')
    r110.rep('"a pack version Ingenium does not read"', '"a pack version Fabrica does not read"')
    r110.rep('is packed in a way Ingenium does not read"', 'is packed in a way Fabrica does not read"')
    r110.rep('"Ingenium reads a zip or a git bundle here"', '"Fabrica reads a zip or a git bundle here"')
    r111 = Src("r111")
    r111.rep('(made by Ingenium) */', '(made by the Forge) */')
    r111.rep('Made by Ingenium from version', 'Made by the Forge from version')
    g = Src("r114")
    g.rep('(function r114GitHub(){\nif(typeof IngRepo==="undefined")return;', '(function r114GitHub(){\nif(typeof IngRepo==="undefined")return;\n' + F.LOCAL_STATE)
    g.rep('btn("sm pri","Fix it in Code",function(){fixInCode(r,report,X);})', 'btn("sm pri","Look at the files",function(){fixInCode(r,report,X);})')
    g.cut('/* the test\'s report, taken to Code with the app open there */', 'function ',
          '/* the test\'s report, shown beside the app\'s files in the file editor (PASS 639: the Forge has no model) */\n'
          'function fixInCode(r,report,X){try{if(typeof window.fbEditWithReport==="function"){window.fbEditWithReport(r,report);return;}}catch(e){}\n'
          '  X.toast("The report is copied: paste it beside the files.");try{if(navigator.clipboard)navigator.clipboard.writeText(report);}catch(e){}}\n')
    g.s = re.sub(r'function fixInCode\(r,report,X\)\{try\{if\(typeof window\.fbOpenInCode==="function"\)\{.*?\n  X\.toast\("Code is not in this build; the report is copied below\."\);[^\n]*\n', '', g.s, count=1, flags=re.S)
    if g.s.count("function fixInCode(") != 1 or "Code is not in this build" in g.s:
        raise SystemExit("r114: fixInCode not replaced once")
    h = Src("r141")
    h.rep('var HUBDB="ingenium_hub";', 'var HUBDB="forge_hub";')
    # the makers come before the page, as in Ingenium (R136 and R170 are read by R112 when Test and ship is drawn)
    return "\n".join([F.KEEP, r110.s, r111.s, r136(), r170(), r112(), g.s, h.s, F.FORGE_CSS] + shells())


if __name__ == "__main__":
    out = block()
    print(len(out), "characters")
