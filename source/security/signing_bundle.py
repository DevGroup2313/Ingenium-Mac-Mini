"""Ingenium 6.8 and The Forge 649 · a new Android signing key, the lineage in which the old key vouches for it, and the encrypted
bundle the Fire builds open (27 October 2026).

The owner's words: "Replace the exposed Android signing keys and remove them from the public repos." The bundles made on 25 October
opened with a passphrase that never reached the owner (the session that made it ended first), so the Forge's 647 and 648 could not
be signed and its Fire APK stayed at 641. This makes the bundle again, with a passphrase the owner is given.

  SIGN_PASSPHRASE=... OLD_PW=... python3 -I signing_bundle.py ingenium|forge <old keystore> <old alias> <out folder> [test.apk]

writes into <out folder>: <app>-signing-2026.gpg (AES-256; inside: the new key <app>-release-2026.p12, its password new.pw, its
alias, the old key old.keystore and old.pw: the names the workflows read) and lineage-2026.bin (the old key vouches for the new
one and keeps no right to roll the app back). With a test APK it signs it as the build does and checks it with apksigner: the
old key for Android 7 and 8, the new key through the lineage for Android 9 and newer. Nothing secret is written anywhere else,
and the folder it works in is removed."""
import os
import secrets
import shutil
import subprocess
import sys
import tempfile

app, old_ks, old_alias, out = sys.argv[1:5]
test_apk = sys.argv[5] if len(sys.argv) > 5 else None
NAMES = {"ingenium": ("ingenium-release-2026.p12", "ingenium2026", "ingenium-signing-2026.gpg"),
         "forge": ("the-forge-release-2026.p12", "forge2026", "the-forge-signing-2026.gpg")}
p12, alias, bundle = NAMES[app]
passphrase, old_pw = os.environ["SIGN_PASSPHRASE"], os.environ["OLD_PW"]
if len(passphrase) < 24:
    sys.exit("the passphrase is too short")


def run(*a, env=None, quiet=True):
    r = subprocess.run(a, env=env, capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit("failed: %s\n%s%s" % (" ".join(a[:2]), r.stdout[-1500:], r.stderr[-1500:]))
    return r.stdout


work = tempfile.mkdtemp(prefix="sign-")
os.chmod(work, 0o700)
try:
    new_pw = secrets.token_urlsafe(30)
    env = dict(os.environ, NEW_PW=new_pw, OLD_PW=old_pw)
    newks = os.path.join(work, p12)
    run("keytool", "-genkeypair", "-noprompt", "-keystore", newks, "-storetype", "PKCS12", "-storepass:env", "NEW_PW",
        "-keypass:env", "NEW_PW", "-alias", alias, "-keyalg", "RSA", "-keysize", "4096", "-validity", "10950",
        "-dname", "CN=Yannie D. Forest, O=The Offline Project", env=env)
    shutil.copyfile(old_ks, os.path.join(work, "old.keystore"))
    lineage = os.path.join(out, "lineage-2026.bin")
    os.makedirs(out, exist_ok=True)
    run("apksigner", "rotate", "--out", lineage,
        "--old-signer", "--ks", old_ks, "--ks-key-alias", old_alias, "--ks-pass", "env:OLD_PW", "--key-pass", "env:OLD_PW", "--set-rollback", "false",
        "--new-signer", "--ks", newks, "--ks-key-alias", alias, "--ks-pass", "env:NEW_PW", "--key-pass", "env:NEW_PW", env=env)
    for name, val in (("new.pw", new_pw), ("old.pw", old_pw), ("alias", alias)):
        with open(os.path.join(work, name), "w") as fh:
            fh.write(val)
    tarf = os.path.join(work, "bundle.tar")
    run("tar", "-c", "-f", tarf, "-C", work, "new.pw", "old.pw", "alias", p12, "old.keystore")
    gpg_home = os.path.join(work, "gnupg")
    os.makedirs(gpg_home, mode=0o700)
    r = subprocess.run(["gpg", "--homedir", gpg_home, "--batch", "--yes", "--quiet", "--pinentry-mode", "loopback", "--passphrase-fd", "0",
                        "--symmetric", "--cipher-algo", "AES256", "--s2k-mode", "3", "--s2k-digest-algo", "SHA512", "--s2k-count", "65011712",
                        "--output", os.path.join(out, bundle), tarf], input=passphrase, capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit("gpg: " + r.stderr[-800:])
    # the bundle opens with the passphrase, as the workflow opens it, and holds what the workflow reads
    chk = os.path.join(work, "check")
    os.makedirs(chk)
    r = subprocess.run("gpg --homedir '%s' --batch --quiet --pinentry-mode loopback --passphrase-fd 0 --decrypt '%s' | tar -x -C '%s'"
                       % (gpg_home, os.path.join(out, bundle), chk), shell=True, input=passphrase, capture_output=True, text=True)
    if r.returncode != 0 or sorted(os.listdir(chk)) != sorted(["new.pw", "old.pw", "alias", p12, "old.keystore"]):
        sys.exit("the bundle does not open as the workflow opens it: " + r.stderr[-500:])
    print("bundle %s opens with the passphrase and holds %s" % (bundle, ", ".join(sorted(os.listdir(chk)))))
    print(run("keytool", "-list", "-v", "-keystore", newks, "-storepass:env", "NEW_PW", env=env).split("Certificate fingerprints:")[1].split("Signature algorithm")[0].strip().splitlines()[1].strip())
    if test_apk:
        # apksigner before build-tools 31 has no --rotation-min-sdk-version and rotates from Android 9 (API 28), the value the
        # workflows give it
        ROT28 = ["--rotation-min-sdk-version", "28"] if "rotation-min-sdk-version" in subprocess.run(
            ["apksigner", "sign", "--help"], capture_output=True, text=True).stdout else []
        signed = os.path.join(work, "signed.apk")
        run("apksigner", "sign", "--ks", os.path.join(chk, "old.keystore"), "--ks-key-alias", old_alias, "--ks-pass", "env:OLD_PW", "--key-pass", "env:OLD_PW",
            "--next-signer", "--ks", os.path.join(chk, p12), "--ks-key-alias", alias, "--ks-pass", "env:NEW_PW", "--key-pass", "env:NEW_PW",
            "--lineage", lineage, *ROT28, "--out", signed, test_apk, env=env)
        for sdk in ("24", "28", "33"):
            v = run("apksigner", "verify", "--min-sdk-version", sdk, "--print-certs", "-v", signed)
            first = [l for l in v.splitlines() if "certificate DN" in l][:2]
            print("Android API %s: %s | %s" % (sdk, "verified" if "Verifies" in v else "NOT verified", " / ".join(first)))
finally:
    shutil.rmtree(work, ignore_errors=True)
