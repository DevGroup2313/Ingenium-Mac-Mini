# The Android signing keys (23 October 2026)

The owner's words: "Replace the exposed Android signing keys and remove them from the public repos."

## What was exposed

- **Ingenium's Android and Fire key** (`signing/ingenium-release.keystore`, kept in the private Ingenium-Android-fire
  repository) was also carried inside every Ingenium page, in the kit store Fabrica's kits are made from, with the note
  that gives its password (`signing/SIGNING.txt`). Those pages are in the public Ingenium-Mac-Mini, Ingenium-Mac-Intel and
  Ingenium-HPWindows repositories, and inside The Forge's pages.
- **The Forge's Fire key** (`signing/app.keystore` with `signing/signing.properties`, which holds its password) is in the
  public Forge-Fire repository: its build made the key and committed it there.

Anyone holding a key and its password could sign an app that installs over the owner's on a device they can reach. Both
keys must be treated as known to others, so both are being replaced.

## What is done

- No page carries a key any more: `build/build_page.py` takes key files out of the kit store of every page it builds, and
  `build/release.py` never puts one in. The fire kit's guide (`build/kits/guides/fire.md`, section 7) says the kit carries
  no key and how to keep one in the repository's secrets.
- Ingenium-Android-fire and Forge-Fire take the key from the repository's secrets (`ANDROID_KEYSTORE_B64`,
  `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`), never write one into the repository, and say in the build log which
  key signed the app. Until the new key is in the secrets they still use the old one, so the apps go on updating.
  (Committed in both repositories; pushed with the 6.2 and 644 release, since a push there rebuilds and republishes.)
- The change of key itself was tried with throwaway keys on Android 9, 11 and 14 (the Fire tablet's Fire OS 7 and 8):
  `.github/workflows/key-rotation-check.yml` with `security/key_rotation_make.sh` and `key_rotation_check.sh`. An app signed
  through a lineage (the old key vouching for the new) installs over the old one with nothing removed, and after it an app
  signed with the old key alone is refused.

## What needs the owner

1. **Make two new keys on your own device**, one for Ingenium and one for The Forge: in Ingenium (master edition), open
   Fabrica, the app's shipping card, and press **Save this key (.p12)**, with a password of at least twelve characters.
   Keep both files and passwords safe, away from the computer.
2. **Put each in its repository's secrets** (github.com, the repository, Settings, Secrets and variables, Actions, New
   repository secret): `ANDROID_KEYSTORE_B64` (the file as base64: on a Mac, `base64 -i <file>` in Terminal) and
   `ANDROID_KEYSTORE_PASSWORD`. Ingenium's in Ingenium-Android-fire, the Forge's in Forge-Fire.
3. **Say when they are there.** The next step is then made in each build: the lineage from the old key to the new one, so
   the installed apps update without being removed, and the old key leaves the repositories' files (Forge-Fire's goes into
   a secret of its own for as long as the lineage needs it).
4. **Recommended: make the public repositories private** (Ingenium-Mac-Mini, Ingenium-Mac-Intel, Ingenium-HPWindows,
   Forge-windows, Forge-Mac, Forge-Fire, The-forge-IOS). They hold the apps' whole code and pages; private, only the owner
   and whoever the owner adds can read them. The old keys also remain in the repositories' history. Taking them out of it
   means rewriting the history (a force push), which is the owner's call; once the keys are replaced, the old ones are of
   no use to anyone against an app that has updated.

## 25 October 2026 (Ingenium 6.7): the new key is made, and the change needs one secret

- A new Ingenium key was made (RSA 4096, valid 30 years, "CN=Yannie D. Forest, O=The Offline Project"), with the lineage in
  which the old key vouches for it (`signing/lineage-2026.bin` in Ingenium-Android-fire; the old key keeps no right to roll the
  app back). Both keys ride in `signing/ingenium-signing-2026.gpg` (gpg, AES-256, a passphrase of about 150 bits), which opens
  only with the secret `ANDROID_SIGNING_PASSPHRASE`.
- build-android.yml opens it when that secret is there, and the Gradle task signs with the old key for Android 7 and 8 and the
  new key, through the lineage, for Android 9 and newer (`--rotation-min-sdk-version 28`), as the emulator checks proved.
  Checked here with Android's apksigner (build-tools 35): an APK made by the page's own maker, signed this way, verifies for
  Android 7 (old key, v2) and Android 9 and newer (new key, v3), and stays aligned to 4096 bytes. The workflow's step was run
  here with the real passphrase (it opens the file and masks both passwords) and with a wrong one (it stops with a clear error).
- What the owner does: add the one secret (signing/SIGNING.txt has the steps), then run the build. After the first build
  signed with the new key, `signing/ingenium-release.keystore` can be deleted from Ingenium-Android-fire.
- The Forge's Fire key (Forge-Fire) is not in this session's repositories, so it is still to be changed the same way.
