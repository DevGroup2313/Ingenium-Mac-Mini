#!/bin/bash
# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
#
# The look probe, run by GitHub on a Mac: builds Probe.swift, opens Ingenium's page in a Mac web view on the Blend page
# (invented models, none chosen, left alone) and photographs the screen about three times a second for half a minute.
#   bash source/rig/mac_probe/run.sh <out folder> <ingenium.html>
set -uo pipefail
HERE=$(cd "$(dirname "$0")" && pwd)
OUT=$(mkdir -p "$1" && cd "$1" && pwd)
PAGE="$2"
W=$(mktemp -d); mkdir -p "$W/frames"
xcrun swiftc -O -framework AppKit -framework WebKit -o "$W/Probe" "$HERE/Probe.swift" || { echo "::error::the probe did not build"; exit 1; }
"$W/Probe" "$PAGE" "$HERE/setup_blend.js" "$OUT/probe.log" &
PID=$!
for i in $(seq 1 150); do grep -q '"ready":true' "$OUT/probe.log" 2>/dev/null && break; sleep 2; done
if ! grep -q '"ready":true' "$OUT/probe.log"; then echo "::error::the page did not get ready in the web view"; tail -5 "$OUT/probe.log"; kill $PID; exit 1; fi
sleep 3
for i in $(seq -w 1 96); do screencapture -x -t png "$W/frames/f_$i.png"; sleep 0.15; done
tail -2 "$OUT/probe.log"
kill $PID 2>/dev/null
python3 -m pip install --quiet --user --break-system-packages pillow 2>/dev/null || python3 -m pip install --quiet --user pillow
python3 "$HERE/frames.py" "$W/frames" "$OUT/probe.log" "$OUT" || { echo "::error::the pictures could not be read"; exit 1; }
cp "$W/frames/f_01.png" "$OUT/first.png" 2>/dev/null || true
