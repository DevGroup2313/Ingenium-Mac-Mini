#!/bin/bash
# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
#
# Run by .github/workflows/build-shells.yml on a Mac (Apple silicon, then Intel), from the top of the repository: the
# Mac shell, filled by the page's own code (modules/r170.js, in Node) as Fabrica fills it on the device, unpacked as
# the Finder unpacks a download, checked by codesign, and opened twice: a test page (its storage kept from the first
# start to the second, the clipboard, a file saved), then The Forge's own page (13 MB).
#   bash source/shells/test/ci_mac.sh <mac-shell.zip> <out folder> <arm64|intel>
set -uo pipefail
ZIP="$1"; OUT="$2"; TAG="$3"; mkdir -p "$OUT"
M=source/build/modules; I=source/shells/test/icons; T=source/shells/test
W="${RUNNER_TEMP:-/tmp}/mactest-$TAG"; rm -rf "$W"; mkdir -p "$W"
REPORT="$OUT/mac-$TAG.txt"; : > "$REPORT"
say() { echo "$*"; echo "$*" >> "$REPORT"; }
fail=0
say "Mac ($TAG): macOS $(sw_vers -productVersion), $(uname -m)"
gunzip -c source/build/apps/builtin/forge.html.gz > "$W/the_forge.html"
node "$T/make_mac.mjs" $M "$ZIP" "$T/test_page.html" $I "$W/test.zip" com.yannieforest.shelltest.mac "Shell Test" CarpeNative | tail -1 | tee -a "$REPORT" || exit 1
node "$T/make_mac.mjs" $M "$ZIP" "$W/the_forge.html" $I "$W/forge.zip" com.yannieforest.theforge.mactest "The Forge" CarpeNative,pywebview | tail -1 | tee -a "$REPORT" || exit 1

report() { grep "SHELL_PAGETEST PAGE" "$1" 2>/dev/null | tail -1 | sed 's/^.*SHELL_PAGETEST PAGE //'; }
has() { echo "$1" | grep -q "$2"; }
quit_app() {   # $1 the program's path: asked to end, then made to
  pkill -TERM -f "$1" > /dev/null 2>&1; for i in 1 2 3 4 5; do pgrep -f "$1" > /dev/null || return 0; sleep 1; done
  pkill -KILL -f "$1" > /dev/null 2>&1; return 0
}
wait_for() {   # $1 log, $2 what to wait for, $3 seconds
  local n=$(( $3 / 2 )); for i in $(seq 1 $n); do grep -q "$2" "$1" 2>/dev/null && return 0; sleep 2; done; return 1
}

# $1 zip, $2 what, $3 title of the first start (a pattern), $4 title of the second (or "" for one start), $5 picture
one() {
  local D="$W/x-$5"; rm -rf "$D"; mkdir -p "$D"
  ditto -x -k "$1" "$D" || { say "FAIL $2: the zip did not unpack"; fail=1; return; }
  local APP; APP=$(ls -d "$D"/*.app | head -1)
  local EXE; EXE=$(/usr/libexec/PlistBuddy -c 'Print :CFBundleExecutable' "$APP/Contents/Info.plist")
  local BID; BID=$(/usr/libexec/PlistBuddy -c 'Print :CFBundleIdentifier' "$APP/Contents/Info.plist")
  say "     $(basename "$APP"): $BID, program $EXE ($(lipo -archs "$APP/Contents/MacOS/$EXE" 2>/dev/null)), how to open: $(ls "$D" | grep -c '^How to open') file"
  if codesign --verify --deep --strict --verbose=2 "$APP" > "$W/cs.txt" 2>&1; then
    say "PASS $2: codesign --verify --deep --strict accepts the seal Fabrica wrote ($(tail -1 "$W/cs.txt"))"
  else
    say "FAIL $2: codesign: $(tail -4 "$W/cs.txt" | tr '\n' ' ')"; fail=1
  fi
  spctl --assess --type execute -vv "$APP" > "$W/sp.txt" 2>&1
  say "     Gatekeeper's own word (an app from outside the App Store, opened once with Open): $(tr '\n' ' ' < "$W/sp.txt" | cut -c1-200)"

  # the first start: the program itself, so its words reach this log, with a folder for the file the page saves
  local LOG="$W/$5-1.log" SAVE="$W/saved-$5"; rm -rf "$SAVE"
  SHELL_PAGETEST_SAVE_DIR="$SAVE" "$APP/Contents/MacOS/$EXE" -shell_pagetest > "$LOG" 2>&1 &
  wait_for "$LOG" "SHELL_PAGETEST DONE" 120
  sleep 3
  screencapture -x "$OUT/$5" > /dev/null 2>&1 || true
  quit_app "$APP/Contents/MacOS/$EXE"
  local R; R=$(report "$LOG")
  if [ -n "$R" ] && has "$R" "\"title\":\"$3\"" && has "$R" '"storage":true' && has "$R" '"bridge":true' && has "$R" '"idb":true'; then
    say "PASS $2, first start: its page, its storage and IndexedDB, the file saver: $R"
  else
    say "FAIL $2, first start: ${R:-(no report)}"; tail -n 15 "$LOG" | sed 's/^/     | /' >> "$REPORT"; fail=1
  fi
  local CL; CL=$(grep "SHELL_PAGETEST CLIP" "$LOG" | tail -1)
  if has "$CL" "CLIP ok"; then say "PASS $2: the clipboard, written and read back"; else say "FAIL $2: the clipboard: ${CL:-(no report)}"; fail=1; fi
  if grep -q "SHELL_PAGETEST SAVED shell-check.txt ok" "$LOG" && [ "$(cat "$SAVE/shell-check.txt" 2>/dev/null)" = "saved by the page" ]; then
    say "PASS $2: the page saved a file, and it holds what the page gave"
  else
    say "FAIL $2: the page's file was not saved: $(grep 'SHELL_PAGETEST SAVED' "$LOG" | tail -1)"; fail=1
  fi
  [ -z "$4" ] && return

  # the second start: as a person starts it (the Finder's way, through Launch Services), with what the first left
  local LOG2="$W/$5-2.log"
  open -n --stdout "$LOG2" --stderr "$LOG2.err" "$APP" --args -shell_pagetest
  wait_for "$LOG2" "SHELL_PAGETEST DONE" 120
  sleep 2
  quit_app "$APP/Contents/MacOS/$EXE"
  local R2; R2=$(report "$LOG2")
  if [ -n "$R2" ] && has "$R2" "\"title\":\"$4\"" && ! has "$R2" '"kept":null'; then
    say "PASS $2, second start (opened as the Finder opens it): what the first start kept is there: $R2"
  else
    say "FAIL $2, second start: ${R2:-(no report)} $(tail -3 "$LOG2.err" 2>/dev/null | tr '\n' ' ')"; fail=1
  fi
}
one "$W/test.zip" "a test page in the Mac app Fabrica made" "Shell Test run 1" "Shell Test run 2" "mac-$TAG-test.png"
one "$W/forge.zip" "The Forge (13 MB page) in the Mac app Fabrica made" "[^\"]*Forge[^\"]*" "" "mac-$TAG-forge.png"
exit $fail
