#!/bin/bash
# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
#
# Puts the native engine and the built-in models inside a freshly built Mac
# app, then seals the app again (an ad hoc signature, as the build makes it):
#   bash tools/finish_mac_app.sh <the .app> <engine folder> [<models folder>]
# The engine goes to Contents/MacOS/engine/<platform>/ (programs belong
# there), its version and licence to Contents/Resources/engine/<platform>/,
# and the model to Contents/Resources/models/.
set -euo pipefail
APP="$1"
ENG="$2"
MOD="${3:-}"
[ -d "$APP/Contents/MacOS" ] || { echo "not an app: $APP"; exit 1; }
[ -f "$ENG/llama-server" ] || { echo "no engine in $ENG"; exit 1; }
case "$(uname -m)" in arm64) PLAT=macos-arm64 ;; *) PLAT=macos-x64 ;; esac

rm -rf "$APP/Contents/MacOS/engine" "$APP/Contents/Resources/engine" "$APP/Contents/Resources/models"
mkdir -p "$APP/Contents/MacOS/engine/$PLAT" "$APP/Contents/Resources/engine/$PLAT"
for f in llama-server llama-finetune; do   # R78: the trainer, when it was compiled
  if [ -f "$ENG/$f" ]; then
    cp "$ENG/$f" "$APP/Contents/MacOS/engine/$PLAT/$f"
    chmod 755 "$APP/Contents/MacOS/engine/$PLAT/$f"
    codesign --force --sign - --timestamp=none "$APP/Contents/MacOS/engine/$PLAT/$f"
  fi
done
for f in VERSION.txt LICENSE-llama.cpp.txt ARCHS.txt; do   # 6.10.5: and the kinds of model it lists
  [ -f "$ENG/$f" ] && cp "$ENG/$f" "$APP/Contents/Resources/engine/$PLAT/$f"
done
# 6.10.5: a newer engine beside the proven one, when the build has one (ENGINE_NEXT names its folder); the cloud build keeps it
# in the app only when the app's own self-test answers with it
rm -rf "$APP/Contents/MacOS/engine-next" "$APP/Contents/Resources/engine-next"
if [ -n "${ENGINE_NEXT:-}" ] && [ -f "$ENGINE_NEXT/llama-server" ]; then
  mkdir -p "$APP/Contents/MacOS/engine-next/$PLAT" "$APP/Contents/Resources/engine-next/$PLAT"
  cp "$ENGINE_NEXT/llama-server" "$APP/Contents/MacOS/engine-next/$PLAT/llama-server"
  chmod 755 "$APP/Contents/MacOS/engine-next/$PLAT/llama-server"
  codesign --force --sign - --timestamp=none "$APP/Contents/MacOS/engine-next/$PLAT/llama-server"
  for f in VERSION.txt LICENSE-llama.cpp.txt ARCHS.txt; do
    [ -f "$ENGINE_NEXT/$f" ] && cp "$ENGINE_NEXT/$f" "$APP/Contents/Resources/engine-next/$PLAT/$f"
  done
  echo "Newer engine: $(cat "$ENGINE_NEXT/VERSION.txt" 2>/dev/null || echo llama.cpp), beside the proven one."
fi
if [ -n "$MOD" ] && [ -f "$MOD/builtin.json" ]; then
  mkdir -p "$APP/Contents/Resources/models"
  cp "$MOD"/* "$APP/Contents/Resources/models/"
  echo "Built-in models: $(python3 -c "import json,sys;d=json.load(open(sys.argv[1]));print(', '.join(m['name'] for m in d.get('models',[d])))" "$MOD/builtin.json")"
else
  echo "No built-in model."
fi
# 6.10.1: the Mac's own sign-in as a way back into Ingenium (Touch ID, or the Mac's password): a small helper, compiled here from
# tools/IngeniumKey.swift when this Mac has Swift (Xcode, or its command line tools); without it the app works as before, and the
# page says that this copy cannot use Touch ID.
KEYSRC="$(cd "$(dirname "$0")" && pwd)/IngeniumKey.swift"
rm -f "$APP/Contents/MacOS/IngeniumKey"
if [ -f "$KEYSRC" ] && command -v swiftc >/dev/null 2>&1; then
  # 6.10.2: built for the same oldest macOS the release promises (13.3), and for each chip the app itself is built for; without
  # the target, Swift used the build Mac's own newer macOS, and the check in the cloud build rightly stopped the release.
  KMAIN="$APP/Contents/MacOS/$(/usr/libexec/PlistBuddy -c 'Print :CFBundleExecutable' "$APP/Contents/Info.plist" 2>/dev/null || true)"
  KARCHS="$(lipo -archs "$KMAIN" 2>/dev/null || true)"
  [ -n "$KARCHS" ] || KARCHS="$(uname -m)"
  KTMP="$(mktemp -d)"
  KOK=1
  for KA in $KARCHS; do
    swiftc -O -target "$KA-apple-macos13.3" -o "$KTMP/IngeniumKey-$KA" "$KEYSRC" || KOK=0
  done
  if [ "$KOK" = 1 ] && lipo -create "$KTMP"/IngeniumKey-* -output "$APP/Contents/MacOS/IngeniumKey"; then
    rm -rf "$KTMP"
    chmod 755 "$APP/Contents/MacOS/IngeniumKey"
    codesign --force --sign - --timestamp=none "$APP/Contents/MacOS/IngeniumKey"
    echo "Touch ID helper: built ($("$APP/Contents/MacOS/IngeniumKey" info || true))."
  else
    rm -rf "$KTMP"
    rm -f "$APP/Contents/MacOS/IngeniumKey"
    echo "Touch ID helper: NOT built (Swift could not compile it); the app works without it."
  fi
else
  echo "Touch ID helper: not built (no Swift on this Mac); the app works without it."
fi
# the app's seal covers every file inside it, so it is made again last
codesign --force --sign - --timestamp=none "$APP"
codesign --verify --deep --strict "$APP" && echo "The app's seal is whole."
du -sh "$APP"
