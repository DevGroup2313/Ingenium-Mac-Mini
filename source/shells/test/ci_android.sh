#!/bin/bash
# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
#
# Run by .github/workflows/build-shells.yml inside an Android emulator, from the top of the repository:
# APKs made by the page's own code (modules/r136.js, in Node), installed and opened.
#   1. a test page, version 1 (signed with a key saved as Fabrica saves one): it opens and counts one start;
#   2. version 2 of the same app, installed over it: it installs (same key, higher version) and its storage
#      kept the count (two starts);
#   3. The Forge's own page (13 MB), with the launcher name its GitHub builds use (an activity alias):
#      it opens through that name and shows its title.
#   bash source/shells/test/ci_android.sh <api level> <out folder>
set -uo pipefail
API="$1"; OUT="$2"; mkdir -p "$OUT"
M=source/build/modules; D=source/shells/out/android-shell.dex; I=source/shells/test/icons; T=source/shells/test
W="${RUNNER_TEMP:-/tmp}/apktest"; mkdir -p "$W"
REPORT="$OUT/android-$API.txt"; : > "$REPORT"
say() { echo "$*"; echo "$*" >> "$REPORT"; }
fail=0
gunzip -c source/build/apps/builtin/forge.html.gz > "$W/the_forge.html"
node "$T/make_key.mjs" "$W/test.p12" test-pass-123 || exit 1
VC=$(( ($(date +%s) - 1735689600) / 60 ))
FABRICA_VC=$VC node "$T/make_apk.mjs" $M $D "$T/test_page.html" $I "$W/v1.apk" com.yannieforest.shelltest "Shell Test" "$W/test.p12" test-pass-123 | tail -1 || exit 1
FABRICA_VC=$((VC + 1)) node "$T/make_apk.mjs" $M $D "$T/test_page.html" $I "$W/v2.apk" com.yannieforest.shelltest "Shell Test" "$W/test.p12" test-pass-123 | tail -1 || exit 1
FABRICA_ALIAS=com.yannie.carpediem.MainActivity node "$T/make_apk.mjs" $M $D "$W/the_forge.html" $I "$W/forge.apk" com.yannieforest.theforge.test "The Forge" "$W/test.p12" test-pass-123 | tail -1 || exit 1

adb wait-for-device
report() {   # $1 package, $2 component: starts it with the page test and prints the page's report
  adb logcat -c
  adb shell am start -n "$2" --ez ingenium_pagetest true > /dev/null
  for i in $(seq 1 60); do
    L=$(adb logcat -d -s IngeniumPage:I | grep "INGENIUM_SELFTEST PAGE" | tail -1)
    [ -n "$L" ] && break; sleep 2
  done
  echo "${L#*INGENIUM_SELFTEST PAGE }"
}
check() {   # $1 what, $2 report, $3 the title wanted (a pattern)
  if echo "$2" | grep -q "\"title\":\"$3\"" && echo "$2" | grep -q '"storage":true' && echo "$2" | grep -q '"bridge":true'; then say "PASS $1: $2"; else say "FAIL $1: ${2:-(no report)}"; fail=1; fi
}
SHELL_ACT=studio.ingenium.shell.ShellActivity
say "Android $API: $(adb shell getprop ro.build.version.release | tr -d '\r'), WebView $(adb shell dumpsys webviewupdate 2>/dev/null | grep -m1 'Current WebView package' | tr -d '\r' | sed 's/.*(//;s/).*//')"
if adb install "$W/v1.apk" 2>&1 | tee -a "$REPORT" | grep -q Success; then
  R=$(report com.yannieforest.shelltest com.yannieforest.shelltest/$SHELL_ACT); check "version 1 opens" "$R" "Shell Test run 1"
  adb exec-out screencap -p > "$OUT/android-$API-test.png"
  adb shell am force-stop com.yannieforest.shelltest
  if adb install -r "$W/v2.apk" 2>&1 | tee -a "$REPORT" | grep -q Success; then
    R=$(report com.yannieforest.shelltest com.yannieforest.shelltest/$SHELL_ACT); check "version 2 installs over it and keeps its storage" "$R" "Shell Test run 2"
  else say "FAIL version 2 did not install over version 1"; fail=1; fi
else say "FAIL version 1 did not install"; fail=1; fi
if adb install "$W/forge.apk" 2>&1 | tee -a "$REPORT" | grep -q Success; then
  sleep 2
  R=$(report com.yannieforest.theforge.test com.yannieforest.theforge.test/com.yannie.carpediem.MainActivity); check "The Forge (13 MB page) opens by its launcher name" "$R" "[^\"]*Forge[^\"]*"
  sleep 4; adb exec-out screencap -p > "$OUT/android-$API-forge.png"
else say "FAIL The Forge's APK did not install"; fail=1; fi
adb logcat -d -s IngeniumShell:* AndroidRuntime:E | tail -40 > "$OUT/android-$API-log.txt"
exit $fail
