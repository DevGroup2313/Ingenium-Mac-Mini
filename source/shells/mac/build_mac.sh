#!/bin/bash
# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
#
# Builds the Mac shell Fabrica fills (Ingenium 6.5), on a Mac with Xcode's command line tools:
# Shell.app, one program for Apple silicon and Intel (macOS 12 or newer), its stand-in page and icon, sealed with an
# ad-hoc signature (codesign -s -) so that the seal lists every file of the bundle. On the device Fabrica writes an app's
# page, name, id, version and icon into a copy, and seals it again (modules/r170.js).
#   bash source/shells/mac/build_mac.sh <out folder>     -> <out>/mac-shell.zip
set -euo pipefail
HERE=$(cd "$(dirname "$0")" && pwd)
OUT=$(mkdir -p "$1" && cd "$1" && pwd)
W=$(mktemp -d)
APP="$W/Shell.app"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources/www"
SDK=$(xcrun --show-sdk-path --sdk macosx)
for ARCH in arm64 x86_64; do
  xcrun swiftc -O -whole-module-optimization -target "$ARCH-apple-macos12.0" -sdk "$SDK" \
    -framework AppKit -framework WebKit -o "$W/Shell-$ARCH" "$HERE"/Shell/*.swift
done
lipo -create -output "$APP/Contents/MacOS/Shell" "$W/Shell-arm64" "$W/Shell-x86_64"
strip -x "$APP/Contents/MacOS/Shell" 2>/dev/null || true
cp "$HERE/Shell/Info.plist" "$APP/Contents/Info.plist"
plutil -lint "$APP/Contents/Info.plist"
printf 'APPL????' > "$APP/Contents/PkgInfo"
cp "$HERE"/Shell/www/* "$APP/Contents/Resources/www/"
# the stand-in icon, at every size a Mac draws
SET="$W/AppIcon.iconset"; mkdir -p "$SET"
for z in 16 32 128 256 512; do
  sips -z $z $z "$HERE/Shell/icon-1024.png" --out "$SET/icon_${z}x${z}.png" > /dev/null
  d=$((z * 2)); sips -z $d $d "$HERE/Shell/icon-1024.png" --out "$SET/icon_${z}x${z}@2x.png" > /dev/null
done
iconutil -c icns "$SET" -o "$APP/Contents/Resources/AppIcon.icns"
# sealed ad-hoc: the program's signature binds Info.plist and the seal of every other file (_CodeSignature/CodeResources)
codesign --force --sign - --timestamp=none "$APP"
codesign --verify --deep --strict --verbose=2 "$APP"
codesign -d --verbose=4 "$APP" 2>&1 | grep -E "^(Identifier|Format|CodeDirectory|Hash type|CandidateCDHash|Signature|Sealed Resources)" || true
lipo -info "$APP/Contents/MacOS/Shell"
rm -f "$OUT/mac-shell.zip"
(cd "$W" && zip -qry -9 -X "$OUT/mac-shell.zip" Shell.app)
ls -la "$OUT/mac-shell.zip"
