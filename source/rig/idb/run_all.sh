#!/usr/bin/env bash
# Ingenium's library tests on all three IndexedDB implementations, against one built page; builds nothing.
#   rig/idb/run_all.sh <page url> [out folder]      (the out folder defaults to ./idb-results)
# Runs Chromium's own IndexedDB, WebKit's own (WebKitGTK, under xvfb-run) and the reference implementation (fake-indexeddb in
# Chromium) one after another, keeps each one's log and JSON in the out folder, and prints the table (test x implementation).
# IDB_PARALLEL=1 runs the three at the same time. Exits non-zero when any test fails on any implementation.
set -u
URL=${1:?usage: rig/idb/run_all.sh <page url> [out folder]}
OUT=${2:-idb-results}
HERE=$(cd "$(dirname "$0")" && pwd)
mkdir -p "$OUT"
chromium() { node "$HERE/run_chromium.js" "$URL" "$OUT/chromium.json" > "$OUT/chromium.log" 2>&1; }
webkit() { xvfb-run -a /usr/bin/python3.12 "$HERE/run_webkit.py" "$URL" "$OUT/webkit.json" 2>&1 | grep --line-buffered -v '^libEGL warning' > "$OUT/webkit.log"; }
reference() { node "$HERE/run_reference.js" "$URL" "$OUT/reference.json" > "$OUT/reference.log" 2>&1; }
echo "library tests on $URL, results in $OUT"
if [ "${IDB_PARALLEL:-0}" = "1" ]; then
  chromium & webkit & reference & wait
else
  for impl in chromium webkit reference; do echo "  $impl…"; $impl; tail -n 1 "$OUT/$impl.log"; done
fi
node "$HERE/table.js" "$OUT/chromium.json" "$OUT/webkit.json" "$OUT/reference.json" --md "$OUT/table.md"
