# The shells Fabrica fills (Ingenium 6.0)

Fabrica makes an app's Android package (APK) and its iPhone and iPad package (IPA) on the
device, with no compiler and no connection. It can, because the only compiled part of each
package is a small shell that does not change from one app to the next: a window holding a web
view that runs the app's own page. The shells are compiled once and ride inside Ingenium's page;
Fabrica writes everything else.

| | Compiled once (here) | Written by Fabrica on the device |
| --- | --- | --- |
| Android (Fire tablet) | `android/src` → `out/android-shell.dex` (`android/build_dex.sh`) | the binary manifest (id, name, version, icon), the resource table, the icons, the app's page in `assets/`, `assets/shell.json`, and the v1 and v2 signatures with a key kept on the device |
| iPhone and iPad | `ios/` → `out/ios-shell.zip` (GitHub's Macs, `.github/workflows/build-shells.yml`) | the app's page in `www/`, `www/shell.json`, its icons, and its name, id and version in `Info.plist` |

What each shell gives the page: its own address (`https://appassets.androidplatform.net/assets/`
on Android, `carpe-app://desk/` on iPhone and iPad, the same addresses The Forge's shells use, so
an app made here keeps the work of the same app made there), saving a file (one at a time: the
cause of the Forge's crossed packages was five saves asked for at once), the clipboard, the
microphone, alert, confirm and prompt, and other sites opened in the browser. Which bridge names a
page is given is written in `shell.json` for each app: Ingenium's page is given only
`IngeniumNative.saveFile`, never the engine's `call`, because a shell carries no model engine.

## What signing means for each

- **Android.** Every APK is signed (APK Signature Scheme v1 and v2) with a key made on the device
  the first time and kept there; Fabrica can also take a key from a `.keystore` (PKCS #12), so a
  package installs over one built before by GitHub with that key. Android installs an update over
  an app only when both carry the same key.
- **iPhone and iPad.** Apple lets no app onto an iPhone or iPad unless it is signed by an Apple
  ID. The IPA Fabrica saves is unsigned, as the IPAs GitHub builds for The Forge and Ingenium are:
  Sideloadly (or AltStore) signs it with your Apple ID as it installs it. A free Apple ID's apps
  stop opening after seven days, until they are installed again; a paid developer account's last
  a year. A web app saved from Fabrica and added to the Home Screen from Safari needs no signing.
