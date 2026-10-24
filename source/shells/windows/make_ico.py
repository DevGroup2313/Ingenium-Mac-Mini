"""INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
Makes the Windows shell's stand-in icon (shell.ico) from icon/shell-<size>.png, with room kept after each picture for the
app's own: Fabrica (modules/r170.js) writes each app's icon into the same place in the program, so each picture is padded
to the room below and the icon's table names the full room. A PNG ends at its IEND chunk; what follows is never read.
    python make_ico.py <out shell.ico>"""
import os, struct, sys
HERE = os.path.dirname(os.path.abspath(__file__))
# the room for each size: more than a 32-bit picture of that size could ever take, packed or not
ROOM = {16: 4096, 24: 6144, 32: 8192, 48: 16384, 64: 24576, 256: 307200}
pics = []
for z, room in sorted(ROOM.items()):
    png = open(os.path.join(HERE, "icon", "shell-%d.png" % z), "rb").read()
    assert png[:8] == b"\x89PNG\r\n\x1a\n" and len(png) <= room, (z, len(png))
    pics.append((z, png + b"\0" * (room - len(png))))
head = struct.pack("<HHH", 0, 1, len(pics))
off = 6 + 16 * len(pics)
table, body = b"", b""
for z, data in pics:
    table += struct.pack("<BBBBHHII", z % 256, z % 256, 0, 0, 1, 32, len(data), off + len(body))
    body += data
open(sys.argv[1], "wb").write(head + table + body)
print("shell.ico:", len(pics), "sizes,", len(head + table + body), "bytes")
