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
sleep 2; xcrun simctl io "$UDID" screenshot "$OUT/ios-home.png" > /dev/null 2>&1
exit $fail
