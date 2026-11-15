#!/usr/bin/env bash
# __APP_STAMP__  |  Copyright (c) __APP_YEAR__ __APP_OWNER__. All rights reserved.
# NO LICENCE IS GRANTED. No copying, adaptation, redistribution, reverse
# engineering or commercial use without the author's written permission.
# See LICENCE.txt. Every distributed copy carries a build marker.
# __APP_TITLE__: build the Fire tablet app, __APP_APK__, on this computer.
# Double-click this file on a Mac, or run it in a terminal on Linux. It needs
# Java 17 to 21 and the Android tools on THIS computer; Android Studio brings
# both. The first build also needs the internet, to fetch Gradle 8.7 and the
# Android parts the project names. It takes the same steps as GitHub's build
# (.github/workflows/build-apk.yml) and signs the app with the same permanent
# key, kept in the folder "signing". Made by Fabrica.

cd "$(dirname "$0")" || exit 1
PROJ="$(pwd)"
LOG="$PROJ/build_log.txt"
: > "$LOG"
say(){ printf '%s\n' "$*" | tee -a "$LOG"; }
finish(){ say ""; if [ -t 0 ]; then read -r -p "Press Return to close. " _; fi; exit "${1:-0}"; }

say "__APP_TITLE__: building the Fire tablet app on this computer"
say "Started $(date)"
say ""

for f in settings.gradle build.gradle app/build.gradle app/src/main/AndroidManifest.xml app/src/main/assets/__APP_HTML__ gradlew gradle/wrapper/gradle-wrapper.jar gradle/wrapper/gradle-wrapper.properties; do
  if [ ! -s "$f" ]; then
    say "Missing piece: $f"
    say "Unzip the whole package again, then run this again."
    finish 1
  fi
done

# Java 17 to 21: the Android plugin needs 17 or later, and Gradle 8.7 runs on
# Java up to 21. Android Studio's own Java is used when no other one fits.
java_major(){ "$1/bin/java" -version 2>&1 | awk -F'"' '/version/ {print $2; exit}' | awk -F. '{ if ($1 == "1") print $2; else print $1 }'; }
java_fits(){ [ -x "$1/bin/java" ] || return 1; case "$(java_major "$1")" in 17|18|19|20|21) return 0;; esac; return 1; }
JDK=""
for c in "${JAVA_HOME:-}" \
         "$(/usr/libexec/java_home -v 21 2>/dev/null)" "$(/usr/libexec/java_home -v 17 2>/dev/null)" \
         "/Applications/Android Studio.app/Contents/jbr/Contents/Home" \
         "$HOME/Applications/Android Studio.app/Contents/jbr/Contents/Home" \
         "/Applications/Android Studio.app/Contents/jre/Contents/Home" \
         "$HOME/android-studio/jbr" "/opt/android-studio/jbr" "/snap/android-studio/current/jbr" \
         "${JAVA_HOME_21_X64:-}" "${JAVA_HOME_17_X64:-}" "${JAVA_HOME_21_arm64:-}" "${JAVA_HOME_17_arm64:-}" \
         /usr/lib/jvm/*; do
  if [ -n "$c" ] && java_fits "$c"; then JDK="$c"; break; fi
done
if [ -z "$JDK" ]; then
  say "No Java 17 to 21 was found on this computer."
  say ""
  say "The simplest way: install Android Studio from"
  say "    https://developer.android.com/studio"
  say "open it once, so that it fetches the Android tools, then run this"
  say "again. Android Studio carries its own Java, which this build uses."
  say "Or install Java 17 or 21 (for example Temurin, from https://adoptium.net)."
  finish 1
fi
export JAVA_HOME="$JDK"
export PATH="$JDK/bin:$PATH"
say "Java:          $(java_major "$JDK") ($JDK)"

# The Android tools (the SDK), where Android Studio puts them.
SDK=""
for c in "${ANDROID_HOME:-}" "${ANDROID_SDK_ROOT:-}" "$HOME/Library/Android/sdk" "$HOME/Android/Sdk" "/usr/local/lib/android/sdk"; do
  if [ -n "$c" ] && [ -d "$c" ] && { [ -d "$c/platforms" ] || [ -d "$c/platform-tools" ] || [ -d "$c/build-tools" ] || [ -d "$c/cmdline-tools" ]; }; then SDK="$c"; break; fi
done
if [ -z "$SDK" ]; then
  say "The Android tools (the Android SDK) were not found on this computer."
  say ""
  say "Install Android Studio from https://developer.android.com/studio and"
  say "open it once: its first screens fetch the Android tools. Then run this"
  say "again. (If you keep them somewhere else, set ANDROID_HOME to that folder.)"
  finish 1
fi
export ANDROID_HOME="$SDK"
printf 'sdk.dir=%s\n' "$(printf '%s' "$SDK" | sed 's/\\/\\\\/g')" > local.properties
say "Android tools: $SDK"

SDKM=$(ls "$SDK"/cmdline-tools/*/bin/sdkmanager 2>/dev/null | head -n 1)
if [ -n "$SDKM" ]; then
  say "Checking the Android parts the project needs (Android 14, API 34)..."
  yes 2>/dev/null | "$SDKM" --licenses >>"$LOG" 2>&1 || true
  "$SDKM" "platforms;android-34" "build-tools;34.0.0" >>"$LOG" 2>&1 || say "  (not fetched now; Gradle will fetch what it needs)"
fi

# One permanent key for every version of the app (see READ ME FIRST.txt).
NEWKEY=""
if [ -f signing/signing.properties ] || [ -f app/carpe-diem.keystore ]; then
  say "Signing key:   the permanent key in the folder \"signing\""
else
  say "Making this app's permanent signing key (first build only)..."
  mkdir -p signing
  PW=$(openssl rand -hex 16 2>/dev/null)
  [ -n "$PW" ] || PW=$(od -An -tx1 -N16 /dev/urandom | tr -d ' \n')
  if "$JDK/bin/keytool" -genkeypair -noprompt -keystore signing/app.keystore -storetype PKCS12 \
      -storepass "$PW" -keypass "$PW" -alias app -keyalg RSA -keysize 2048 -validity 36500 \
      -dname "CN=__APP_TITLE__, O=__APP_OWNER__" >>"$LOG" 2>&1 && [ -s signing/app.keystore ]; then
    printf 'storeFile=app.keystore\nstorePassword=%s\nkeyAlias=app\nkeyPassword=%s\n' "$PW" "$PW" > signing/signing.properties
    NEWKEY=1
    say "Signing key:   made, in the folder \"signing\""
  else
    say "The key could not be made (see build_log.txt). The app will be signed"
    say "with this computer's own test key: it installs, but a later version"
    say "will not install over it."
  fi
fi
say ""

chmod +x gradlew 2>/dev/null
say "Building. The first build fetches Gradle and the Android parts it needs"
say "and takes several minutes; the window may look idle..."
T0=$SECONDS
./gradlew --no-daemon :app:assembleRelease >>"$LOG" 2>&1
STATUS=$?
say "The build took $(( (SECONDS-T0+59)/60 )) minute(s), exit status $STATUS."
say ""

APK="app/build/outputs/apk/release/app-release.apk"
if [ "$STATUS" -eq 0 ] && [ -s "$APK" ]; then
  OUT="$(cd .. && pwd)"
  [ -w "$OUT" ] || OUT="$PROJ"
  cp "$APK" "$OUT/__APP_APK__"
  say "SUCCESS."
  say "The app is:  $OUT/__APP_APK__"
  say ""
  say "Put it on the tablet as in Part 1 of READ ME FIRST.txt: copy it to the"
  say "tablet's Download folder, tap it there, and allow the install."
  if [ -n "$NEWKEY" ]; then
    say ""
    say "KEEP THE FOLDER \"signing\" (inside \"Fire tablet project\"). It holds this"
    say "app's permanent key. Every later version must be signed with it, or the"
    say "tablet refuses the update. If you also build on GitHub, upload this"
    say "folder into the repository's project first, so both use the same key."
  fi
  if [ "$(uname)" = "Darwin" ] && [ -t 0 ]; then open -R "$OUT/__APP_APK__" >/dev/null 2>&1; fi
  finish 0
fi

say "The build did NOT finish, so no app was made."
say ""
if grep -qiE "not accepted the license|licen[cs]es? .*not .*accepted|accept the sdk license" "$LOG"; then
  say "The Android tools' licences have not been accepted on this computer."
  say "Open Android Studio, then its Settings, Languages & Frameworks, Android"
  say "SDK. Under SDK Platforms tick Android 14 (API level 34), press Apply,"
  say "and accept the licences it shows. Then run this again."
elif grep -qiE "could not resolve|could not get|unknownhost|connection refused|timed out|network is unreachable" "$LOG"; then
  say "The build could not fetch what it needs. The first build needs the"
  say "internet; connect, then run this again."
elif grep -qiE "unsupported class file major version|requires java|incompatible java" "$LOG"; then
  say "The build did not accept this Java. Install Java 17 or 21, or Android"
  say "Studio, and run this again."
fi
say "The full build log is:  $LOG"
say "Its last lines name the cause:"
say ""
tail -n 25 "$LOG"
finish 1
