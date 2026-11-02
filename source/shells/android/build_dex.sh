#!/bin/bash
# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
#
# Compiles the Android shell (src/) into classes.dex, the one compiled part of
# every APK Fabrica makes. Everything else in an APK (its manifest, its icons,
# its resource table, the app's page and the signature) is written by the page
# itself (modules/r136.js), on the device.
#
#   bash build_dex.sh <tools folder> [<out folder>]
#
# The tools folder holds three jars from Maven Central (Google's own Android
# servers were not reachable where this was first built, 20 October 2026):
#   android-all.jar  org.robolectric:android-all-instrumented:15-robolectric-12650502-i7
#                    (Android 15's framework classes, used only to compile against)
#   dx.jar           com.jakewharton.android.repackaged:dalvik-dx:16.0.1 (Android's dx)
#   stubs/classes    two empty interfaces the instrumented jar names
#                    (org.robolectric.internal.bytecode.InstrumentedInterface and
#                    ShadowedObject); javac needs them to read Activity, and the
#                    shell's own classes never refer to them (checked below)
# A JDK 11 or newer compiles for Java 8, which dx reads. The shell uses no
# lambdas, so dx needs no desugaring. The output is written to out/ beside this
# script unless another folder is given, and is then copied to ../out/android-shell.dex,
# from where build_page.py rides it into the page.
set -euo pipefail
T="$(cd "$1" && pwd)"
HERE="$(cd "$(dirname "$0")" && pwd)"
OUT="${2:-$HERE/out}"
rm -rf "$OUT" && mkdir -p "$OUT/classes"
javac -nowarn --release 8 -classpath "$T/android-all.jar:$T/stubs/classes" -encoding UTF-8 \
  -d "$OUT/classes" $(find "$HERE/src" -name '*.java')
java -cp "$T/dx.jar" com.android.dx.command.Main --dex --min-sdk-version=22 --output="$OUT/classes.dex" "$OUT/classes"
if grep -q robolectric "$OUT/classes.dex"; then echo "the dex names Robolectric: it must not" >&2; exit 1; fi
cp "$OUT/classes.dex" "$HERE/../out/android-shell.dex"
ls -la "$HERE/../out/android-shell.dex"
