#!/bin/bash
# The Forge 644 · the Editor's live preview holds still while the Editor scrolls, in WebKit (WebKitGTK 2.52, the engine
# family of the Mac apps), with real wheel and key input and a film of the screen at 60 frames a second.
#   wk_644_preview.sh URL OUT_DIR
# Judged: during wheel scrolls (and a wheel inside the preview) the panel may stand apart from the bar at the top in no
# more than 2 frames in 100. It fails on 643 (1 or 2 px apart in about half the frames) and passes on 644.
# Reported only (INFO): the keys, and frames where the bar and the panel are drawn late together (see wk_644_frames.py).
# Needs: xvfb-run, xdotool, ffmpeg, python3.12 with WebKit2 4.1 (gir1.2-webkit2-4.1), python3 with numpy and Pillow.
# The page must be served over http (python3 -m http.server); the Editor opens a small app written by the driver.
HERE=$(cd "$(dirname "$0")" && pwd)
URL=$1; OUT=$2
[ -z "$URL" ] || [ -z "$OUT" ] && { echo "usage: wk_644_preview.sh URL OUT_DIR"; exit 2; }
mkdir -p "$OUT"
fail=0
run() {   # size theme methods
  local o="$OUT/$1_$2"; rm -rf "$o"; mkdir -p "$o"
  timeout 900 xvfb-run -a -s "-screen 0 2600x1500x24" /usr/bin/python3.12 "$HERE/wk_644_drive.py" "$URL" "$1" "$2" "$o" "$3" > "$o/drive.log" 2>&1
  grep -E "^(booted|geo|wheel|keys|in_preview|errors)" "$o/drive.log" | cut -c1-400
  python3 "$HERE/wk_644_frames.py" "$o" ${3//,/ } || fail=1
}
run 1440x900 day wheel,wheel_fast,keys,in_preview
run 1024x768 night wheel,keys
if [ $fail = 0 ]; then echo "ALL PASS"; else echo "SOME FAILED"; fi
exit $fail
