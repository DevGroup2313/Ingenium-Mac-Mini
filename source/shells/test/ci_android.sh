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

# 6.1: no step may hang the job: an emulator that loses its connection (Android 14 did, twice, opening the 13 MB Forge)
# ends the step after a few minutes with a plain report, instead of waiting forty minutes for the job's limit
adb() { timeout "${ADB_WAIT:-240}" "$(type -P adb)" "$@"; }
quick() { timeout 20 "$(type -P adb)" "$@"; }
alive() { [ "$(quick get-state 2>/dev/null | tr -d '\r')" = "device" ]; }
adb wait-for-device
# 6.1: the pages' reports are counted, not taken from a log assumed empty. Android 11's emulator does not always clear
# its log on "logcat -c", so the last report found was the previous start's (version 2 read as run 1, the Forge as the
# test page's run 2). A start's report is now the first one that appears after it.
reports() { quick logcat -d -s IngeniumPage:I 2>/dev/null | grep "INGENIUM_SELFTEST PAGE"; }
report() {   # $1 package, $2 component: starts it with the page test and prints the page's report
  quick logcat -c > /dev/null 2>&1 || true
  local before n L="" end
  before=$(reports | wc -l)
  quick shell am start -n "$2" --ez ingenium_pagetest true > /dev/null 2>&1
  end=$((SECONDS + ${REPORT_WAIT:-150}))
  while [ $SECONDS -lt $end ]; do
    if ! alive; then echo "(the emulator stopped answering)"; return; fi
    n=$(reports | wc -l)
    if [ "$n" -gt "$before" ]; then L=$(reports | tail -1); break; fi
    sleep 2
  done
  echo "${L#*INGENIUM_SELFTEST PAGE }"
}
check() {   # $1 what, $2 report, $3 the title wanted (a pattern)
  if echo "$2" | grep -q "\"title\":\"$3\"" && echo "$2" | grep -q '"storage":true' && echo "$2" | grep -q '"bridge":true'; then say "PASS $1: $2"; else say "FAIL $1: ${2:-(no report)}"; fail=1; fi
}
runs() { echo "$1" | sed -n 's/.*"title":"Shell Test run \([0-9]*\)".*/\1/p'; }
SHELL_ACT=studio.ingenium.shell.ShellActivity
say "Android $API: $(adb shell getprop ro.build.version.release | tr -d '\r'), WebView $(adb shell dumpsys webviewupdate 2>/dev/null | grep -m1 'Current WebView package' | tr -d '\r' | sed 's/.*(//;s/).*//')"
if adb install "$W/v1.apk" 2>&1 | tee -a "$REPORT" | grep -q Success; then
  R=$(report com.yannieforest.shelltest com.yannieforest.shelltest/$SHELL_ACT); check "version 1 opens" "$R" "Shell Test run [0-9]*"
  N1=$(runs "$R")
  quick exec-out screencap -p > "$OUT/android-$API-test.png"
  quick shell am force-stop com.yannieforest.shelltest
  if adb install -r "$W/v2.apk" 2>&1 | tee -a "$REPORT" | grep -q Success; then
    R=$(report com.yannieforest.shelltest com.yannieforest.shelltest/$SHELL_ACT); N2=$(runs "$R")
    # its storage was kept when it counts more starts than version 1 did (Android 14 may start a page twice on its
    # first opening, so the count itself is not fixed)
    if [ -n "$N1" ] && [ -n "$N2" ] && [ "$N2" -gt "$N1" ]; then check "version 2 installs over it and keeps its storage (run $N1, then run $N2)" "$R" "Shell Test run $N2"
    else say "FAIL version 2 installs over it and keeps its storage: ${R:-(no report)} (version 1 counted ${N1:-nothing})"; fail=1; fi
  else say "FAIL version 2 did not install over version 1"; fail=1; fi
else say "FAIL version 1 did not install"; fail=1; fi
if ! alive; then say "FAIL the emulator stopped answering before The Forge was installed"; fail=1
elif adb install "$W/forge.apk" 2>&1 | tee -a "$REPORT" | grep -q Success; then
  sleep 2
  R=$(report com.yannieforest.theforge.test com.yannieforest.theforge.test/com.yannie.carpediem.MainActivity); check "The Forge (13 MB page) opens by its launcher name" "$R" "[^\"]*Forge[^\"]*"
  sleep 4; alive && quick exec-out screencap -p > "$OUT/android-$API-forge.png"
else say "FAIL The Forge's APK did not install$(alive || echo ': the emulator stopped answering')"; fail=1; fi
alive && quick logcat -d -s IngeniumShell:* AndroidRuntime:E | tail -40 > "$OUT/android-$API-log.txt"
exit $fail
