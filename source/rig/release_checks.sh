#!/usr/bin/env bash
# The checks run on each release page before it is pushed (7.72; the set the 7.71 release ran, two at a time: four at once makes false
# failures on this machine). Run from source/:  bash rig/release_checks.sh <out folder> [master|editions] [extra tests...]
#   master    the master page, served at http://127.0.0.1:8193/ingenium.html from the Mac mini repository's root
#   editions  the full, gift and demo editions beside it (editions/), after release.py editions
# Each line of <out folder>/results.txt is "<test> <its last line>"; the full output stays beside it.
set -u
OUT=${1:?out folder}; WHAT=${2:-master}; shift 2 || true; EXTRA=("$@")
mkdir -p "$OUT"; R="$OUT/results.txt"; : > "$R"
ROOT=$(cd .. && pwd); U=http://127.0.0.1:8193; PAGE="$ROOT/ingenium.html"
run(){ local name=$1; shift; timeout 1800 node "rig/$name.js" "$@" > "$OUT/$name${TAG:-}.txt" 2>&1; echo "$name${TAG:-} $(tail -1 "$OUT/$name${TAG:-}.txt")" >> "$R"; }
pair(){ "$@" & }
if [ "$WHAT" = master ]; then
  run t_736_security "$U/ingenium.html" "$OUT/sec"   # alone: it measures the sign-in's timing
  for t in "${EXTRA[@]}"; do run "$t" "$U/ingenium.html" "$OUT/$t"; done
  pair run t_770_ask "$ROOT" "$OUT/ask"; run t_771_carried_folders "$U/ingenium.html"; wait
  pair run t_769_stage_kit "$PAGE"; run t_768_readable "$PAGE"; wait
  pair run t_767_scramble "$PAGE" --apps "$ROOT/source/build/apps/builtin" --cd; run t_760_app_sign "$U/ingenium.html" "$OUT/sign"; wait
  pair run t_762_sign_check "$U/ingenium.html" master; run t_763_owner_door "$U/ingenium.html" master; wait
  pair run t_626_guide "$U/ingenium.html" "$OUT/guide" master; run t_755_record "$U/ingenium.html"; wait
  pair run t_680_old_webview "$U/ingenium.html" "$OUT/old"; run t_765_clavis "$U/ingenium.html" "$OUT/clavis"; wait
else
  E="$ROOT/editions"; EU="$U/editions"
  pair run t_627_editions "$OUT/ed" master="$U/ingenium.html" full="$EU/ingenium_full.html" gift="$EU/ingenium_gift.html" demo="$EU/ingenium_demo.html"
  run t_745_owner_free full="$E/ingenium_full.html" gift="$E/ingenium_gift.html" demo="$E/ingenium_demo.html"; wait
  TAG=_full pair run t_746_no_apps "$EU/ingenium_full.html" "$OUT/na_full"; TAG=_gift run t_746_no_apps "$EU/ingenium_gift.html" "$OUT/na_gift"; wait
  TAG=_demo pair run t_746_no_apps "$EU/ingenium_demo.html" "$OUT/na_demo"; TAG=_guest run t_746_no_apps "$U/ingenium.html" "$OUT/na_guest" guest; wait
  TAG=_full pair run t_763_owner_door "$EU/ingenium_full.html" full; TAG=_gift run t_763_owner_door "$EU/ingenium_gift.html" gift; wait
  # t_767_scramble serves on port 8765: one at a time
  TAG=_full pair run t_767_scramble "$E/ingenium_full.html"; TAG=_gift run t_768_readable "$E/ingenium_gift.html" gift; wait
  TAG=_gift run t_767_scramble "$E/ingenium_gift.html"; TAG=_demo run t_767_scramble "$E/ingenium_demo.html"
  TAG=_gift pair run t_769_stage_kit "$E/ingenium_gift.html"; TAG=_gift run t_626_guide "$EU/ingenium_gift.html" "$OUT/guide_gift" gift; wait
  TAG=_gift pair run t_771_carried_folders "$U/ingenium.html" "$EU/ingenium_gift.html"; wait
  run t_783_full_trouble full="$EU/ingenium_full.html" master="$U/ingenium.html" "$OUT/full_trouble"   # 7.83: Troubleshoot in the full edition
fi
cat "$R"
