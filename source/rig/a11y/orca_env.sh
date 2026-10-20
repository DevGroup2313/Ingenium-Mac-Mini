#!/bin/bash
# INGENIUM 6.1 · a real screen reader for the tests: a virtual display, a D-Bus session and the accessibility bus, in which
# Chromium (with its accessibility on) and Orca, GNOME's screen reader, run as they would on a desktop.
# The owner's words (20 October 2026): "Develop a more comprehensive accessibility audit, including screen reader testing with
# actual assistive technology."
# Needs: apt-get install orca at-spi2-core dbus-x11 python3-pyatspi xdotool xvfb (Orca runs on the system's Python 3.12).
# usage: orca_env.sh node rig/a11y/orca_walk.js <url> <outdir> [pages]
export DISPLAY=:${ORCA_DISPLAY:-77}
Xvfb $DISPLAY -screen 0 ${ORCA_SCREEN:-1440x900x24} >/dev/null 2>&1 & XV=$!
sleep 1
eval "$(dbus-launch --sh-syntax)"
export NO_AT_BRIDGE=0 ACCESSIBILITY_ENABLED=1
/usr/libexec/at-spi-bus-launcher --launch-immediately >/dev/null 2>&1 & AB=$!
sleep 1
gsettings set org.gnome.desktop.interface toolkit-accessibility true 2>/dev/null
"$@"; rc=$?
kill $AB $XV 2>/dev/null; kill $DBUS_SESSION_BUS_PID 2>/dev/null
exit $rc
