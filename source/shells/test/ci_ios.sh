#!/bin/bash
# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
#
# Run by .github/workflows/build-shells.yml on a Mac, from the top of the repository: the simulator's copy of the
# shell, filled by the page's own code (modules/r136.js, in Node) as Fabrica fills the device's copy, installed in
# Apple's iPhone simulator and opened: a test page, then The Forge's own page (13 MB).
#   bash source/shells/test/ci_ios.sh <simulator shell zip> <simulator udid> <out folder>
set -uo pipefail
ZIP="$1"; UDID="$2"; OUT="$3"; mkdir -p "$OUT"
M=source/build/modules; I=source/shells/test/icons; T=source/shells/test
W="${RUNNER_TEMP:-/tmp}/ipatest"; rm -rf "$W"; mkdir -p "$W"
REPORT="$OUT/ios.txt"; : > "$REPORT"
say() { echo "$*"; echo "$*" >> "$REPORT"; }
fail=0
gunzip -c source/build/apps/builtin/forge.html.gz > "$W/the_forge.html"
node "$T/make_ipa.mjs" $M "$ZIP" "$T/test_page.html" $I "$W/test.ipa" com.yannieforest.shelltest "Shell Test" CarpeNative | tail -1 || exit 1
node "$T/make_ipa.mjs" $M "$ZIP" "$W/the_forge.html" $I "$W/forge.ipa" com.yannieforest.theforge.test "The Forge" CarpeNative,pywebview | tail -1 || exit 1
one() {   # $1 ipa, $2 bundle id, $3 what, $4 title wanted (a pattern), $5 picture
  rm -rf "$W/x" && mkdir -p "$W/x" && (cd "$W/x" && unzip -q "$1")
  APP=$(ls -d "$W"/x/Payload/*.app | head -1)
  if ! xcrun simctl install "$UDID" "$APP"; then say "FAIL $3: it did not install"; fail=1; return; fi
  LOG="$W/$2.log"; xcrun simctl launch --console-pty "$UDID" "$2" -shell_pagetest > "$LOG" 2>&1 & LP=$!
  for i in $(seq 1 60); do grep -q "SHELL_PAGETEST PAGE" "$LOG" 2>/dev/null && break; sleep 3; done
  kill "$LP" > /dev/null 2>&1
  L=$(grep "SHELL_PAGETEST PAGE" "$LOG" | tail -1); R="${L#*SHELL_PAGETEST PAGE }"
  xcrun simctl io "$UDID" screenshot "$OUT/$5" > /dev/null 2>&1
  if echo "$R" | grep -q "\"title\":\"$4\"" && echo "$R" | grep -q '"storage":true' && echo "$R" | grep -q '"bridge":true'; then say "PASS $3: $R"; else say "FAIL $3: ${R:-(no report)}"; fail=1; fi
  xcrun simctl terminate "$UDID" "$2" > /dev/null 2>&1
}
one "$W/test.ipa" com.yannieforest.shelltest "a test page in the shell Fabrica filled" "Shell Test run 1" ios-test.png
one "$W/forge.ipa" com.yannieforest.theforge.test "The Forge (13 MB page) in the shell Fabrica filled" "[^\"]*Forge[^\"]*" ios-forge.png
# 7.62: a page signed with a key the shell does not carry (a test key, shells/common/test): the shell refuses it before anything
# of it runs, and shows its own page in its place (modules/r352.js)
node source/shells/common/test/page_from_case.mjs source/shells/common/test/vectors.json "signed, as Fabrica made it" "$W/signed_test.html" > /dev/null || exit 1
node "$T/make_ipa.mjs" $M "$ZIP" "$W/signed_test.html" $I "$W/refused.ipa" com.yannieforest.tidecheck "Tide Check" CarpeNative | tail -1 || exit 1
rm -rf "$W/x" && mkdir -p "$W/x" && (cd "$W/x" && unzip -q "$W/refused.ipa")
APP=$(ls -d "$W"/x/Payload/*.app | head -1)
if xcrun simctl install "$UDID" "$APP"; then
  LOG="$W/refused.log"; xcrun simctl launch --console-pty "$UDID" com.yannieforest.tidecheck -shell_pagetest > "$LOG" 2>&1 & LP=$!
  for i in $(seq 1 40); do grep -q "SHELL_PAGETEST DONE" "$LOG" 2>/dev/null && break; sleep 3; done
  sleep 2; xcrun simctl io "$UDID" screenshot "$OUT/ios-refused.png" > /dev/null 2>&1
  kill "$LP" > /dev/null 2>&1
  R=$(grep "SHELL_PAGETEST REFUSED" "$LOG" | tail -1)
  if echo "$R" | grep -q "is signed with a key this app does not know" && echo "$R" | grep -q "ING-SHELL-CHECK-1"; then
    say "PASS a page signed with a key the shell does not carry: refused before it ran, the shell's own page in its place: ${R#*SHELL_PAGETEST REFUSED }"
  else say "FAIL a page signed with a key the shell does not carry: ${R:-(no report)}"; fail=1; fi
  xcrun simctl terminate "$UDID" com.yannieforest.tidecheck > /dev/null 2>&1
else say "FAIL the refused case did not install"; fail=1; fi
sleep 2; xcrun simctl io "$UDID" screenshot "$OUT/ios-home.png" > /dev/null 2>&1
exit $fail
