"""INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
What the Forge 647's makers made on a machine (maker_page.py), checked by tools written apart from them:
  forge-check.apk          both signatures Android reads (v2: apksigtool; v1: the JDK's jarsigner), its manifest (androguard:
                           the app's id, version, name and icon), its key made by the Forge on that device (keytool), and
                           "The Forge's Fabrica" in what it writes into the app;
  forge-check.ipa          the shell, the page in www/, the icons, the id and name in Info.plist, made by the Forge;
  forge-check-mac.zip      read as macOS reads it (rig/verify_desktop_app.py mac);
  forge-check-windows.zip  read as Windows reads it (rig/verify_desktop_app.py win).
    python3 verify_made.py <folder> <apksigtool> <python with androguard>     -> one line each; exit 1 when anything is wrong"""
import json, os, re, subprocess, sys, zipfile

D, APKSIG, PY = sys.argv[1:4]
RIG = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "rig"))
bad = 0


def run(*a):
    r = subprocess.run(list(a), capture_output=True, text=True)
    return r.stdout + r.stderr


def say(ok, what, detail=""):
    global bad
    print(("PASS " if ok else "FAIL ") + what + ("  " + detail[:300] if detail else ""), flush=True)
    bad += 0 if ok else 1


apk = os.path.join(D, "forge-check.apk")
if os.path.isfile(apk):
    v2, v1 = run(APKSIG, "verify", apk), run("jarsigner", "-verify", "-strict", apk)
    say(re.search(r"\bv2 verified", v2) is not None and "jar verified" in v1, "APK: both signatures verify (v2 by apksigtool, v1 by jarsigner)",
        "%d bytes · %s · %s" % (os.path.getsize(apk), (re.search(r"v2 [^\n]*", v2) or [""])[0][:120], (re.search(r"jar verified[^\n]*", v1) or [""])[0]))
    man = run(PY, "-c", "from loguru import logger;logger.remove()\nfrom androguard.core.apk import APK\nimport sys\na=APK(sys.argv[1])\n"
              "print(a.get_package(),a.get_androidversion_name(),a.get_app_name(),a.get_app_icon())", apk).strip()
    say(re.match(r"^com\.yannieforest\.tideclock 1\.4 Tide Clock res/mipmap-xxxhdpi-v4/ic_launcher\.png$", man) is not None, "APK: its manifest names the app, its version, its name and its icon", man)
    cert = run("keytool", "-printcert", "-jarfile", apk)
    own = (re.search(r"Owner:[^\n]*", cert) or [""])[0]
    say('The Forge, on this device' in own and "O=Yannie D. Forest" in own, "APK: signed with the key the Forge made on that device", own)
    sj = zipfile.ZipFile(apk).read("assets/shell.json").decode()
    say(json.loads(sj).get("made") == "The Forge's Fabrica", "APK: what it writes into the app names the Forge", sj)
else:
    say(False, "APK: nothing was saved")

ipa = os.path.join(D, "forge-check.ipa")
if os.path.isfile(ipa):
    z = zipfile.ZipFile(ipa)
    names = z.namelist()
    plist = z.read("Payload/TideClock.app/Info.plist").decode("utf-8", "replace") if "Payload/TideClock.app/Info.plist" in names else ""
    sj = z.read("Payload/TideClock.app/www/shell.json").decode() if "Payload/TideClock.app/www/shell.json" in names else ""
    say(all(n in names for n in ("Payload/TideClock.app/Shell", "Payload/TideClock.app/www/index.html", "Payload/TideClock.app/AppIcon60x60@3x.png"))
        and "<string>com.yannieforest.tideclock</string>" in plist and "<string>Tide Clock</string>" in plist and "The Forge's Fabrica" in sj,
        "IPA: the shell, the page in www/, its icons, its id and name in Info.plist, made by the Forge", "%d entries" % len(names))
else:
    say(False, "IPA: nothing was saved")

for kind, f, label in (("mac", "forge-check-mac.zip", "Mac app"), ("win", "forge-check-windows.zip", "Windows app")):
    p = os.path.join(D, f)
    if not os.path.isfile(p):
        say(False, label + ": nothing was saved")
        continue
    out = run(sys.executable, os.path.join(RIG, "verify_desktop_app.py"), kind, p, "", "Tide Clock")
    try:
        v = json.loads(out.strip().splitlines()[-1])
    except Exception:
        v = {"faults": [out[-300:]]}
    say(not v.get("faults"), label + ": read as " + ("macOS" if kind == "mac" else "Windows") + " reads it", json.dumps(v))
sys.exit(1 if bad else 0)
