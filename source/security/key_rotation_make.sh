#!/bin/bash
# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved. See LICENCE.txt.
# The signing key change, tried before it is used: makes two throwaway keys (never the real ones), the record that
# passes the app from the old key to the new (a lineage), and five small APKs of one test app, each signed a different
# way. key_rotation_check.sh then installs them in Android's emulator, one over the other.
#   key_rotation_make.sh WORK_DIR
set -euo pipefail
W=$1; mkdir -p "$W"; cd "$W"
BT=$(ls -d "$ANDROID_HOME"/build-tools/* | sort -V | tail -1)
PLAT=$(ls -d "$ANDROID_HOME"/platforms/android-* | sort -V | tail -1)
echo "build tools: $BT"; echo "platform: $PLAT"
"$BT/apksigner" version
PW=pass:rotation-test-only
for k in old new; do
  keytool -genkeypair -noprompt -keystore $k.jks -storetype PKCS12 -storepass rotation-test-only -keypass rotation-test-only \
    -alias $k -keyalg RSA -keysize 2048 -validity 3650 -dname "CN=Rotation test $k key, O=Test only" >/dev/null 2>&1
done
# the old key vouches for the new one; the old key keeps no right to roll the app back to itself
"$BT/apksigner" rotate --out lineage.bin --old-signer --ks old.jks --ks-pass $PW --new-signer --ks new.jks --ks-pass $PW
"$BT/apksigner" lineage --in lineage.bin --print-certs -v | tee lineage.txt
mk() {
  cat > AndroidManifest.xml <<XML
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="org.forest.rotationtest"
  android:versionCode="$1" android:versionName="$1"><application android:hasCode="false" android:label="Rotation test"/></manifest>
XML
  "$BT/aapt2" link -o u$1.apk -I "$PLAT/android.jar" --manifest AndroidManifest.xml --min-sdk-version 24 --target-sdk-version 33
  "$BT/zipalign" -f -p 4 u$1.apk a$1.apk
}
ROT="--rotation-min-sdk-version 28"
"$BT/apksigner" sign --help 2>&1 | grep -q rotation-min-sdk-version || ROT=""
mk 1; "$BT/apksigner" sign --ks old.jks --ks-pass $PW --out v1_old.apk a1.apk
mk 2; "$BT/apksigner" sign --ks old.jks --ks-pass $PW --next-signer --ks new.jks --ks-pass $PW --lineage lineage.bin $ROT --out v2_rotated.apk a2.apk
mk 3; "$BT/apksigner" sign --ks old.jks --ks-pass $PW --out v3_old_only.apk a3.apk
mk 4; "$BT/apksigner" sign --ks new.jks --ks-pass $PW --out v4_new_only.apk a4.apk
mk 5; "$BT/apksigner" sign --ks old.jks --ks-pass $PW --next-signer --ks new.jks --ks-pass $PW --lineage lineage.bin $ROT --out v5_rotated.apk a5.apk
for a in v1_old v2_rotated v3_old_only v4_new_only v5_rotated; do
  echo "== $a"; "$BT/apksigner" verify -v --print-certs $a.apk | grep -E "Verified using|Signer|certificate SHA-256" | head -12
done
