#!/bin/bash
# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved. See LICENCE.txt.
# Installs the five APKs key_rotation_make.sh made, one over the other, in Android's emulator, and says whether the key
# change works as the owner needs it to:
#   1. the app signed with the old key installs;
#   2. the app signed through the lineage (old key, then new) installs over it, so the tablet needs no reinstall;
#   3. after that, an app signed with the old key alone is REFUSED (the old key has been public, so this is the point);
#   4. an app signed with the new key alone (reported only);
#   5. the next release, signed as in 2, installs.
#   key_rotation_check.sh API WORK_DIR
API=$1; W=$2; R="$W/rotation-android-$API.txt"
: > "$R"
say() { echo "$*" | tee -a "$R"; }
adb uninstall org.forest.rotationtest >/dev/null 2>&1 || true
fail=0
step() {   # apk expected(ok|refused|any)
  local out; out=$(adb install -r "$W/$1.apk" 2>&1 | tr -d '\r' | grep -E "Success|Failure|INSTALL_" | tail -1)
  local got=refused; echo "$out" | grep -q "^Success" && got=ok
  local mark=PASS
  if [ "$2" != any ] && [ "$2" != "$got" ]; then mark=FAIL; fail=1; fi
  [ "$2" = any ] && mark=INFO
  say "$mark $1: $got (expected $2) · $out"
}
say "Android $API: the signing key change, with throwaway keys"
step v1_old ok
step v2_rotated ok
step v3_old_only refused
step v4_new_only any
step v5_rotated ok
adb shell dumpsys package org.forest.rotationtest | tr -d '\r' | grep -E "versionCode|signatures|signingDetails|PastSigningCertificates|keySet" | head -8 | sed 's/^/  /' | tee -a "$R"
if [ $fail = 0 ]; then say "RESULT Android $API: the key change works (no reinstall, and the old key alone is refused)"; else say "RESULT Android $API: the key change does NOT work as needed"; fi
exit 0
