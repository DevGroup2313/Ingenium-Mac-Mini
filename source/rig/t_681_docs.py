"""6.8.1: the shown pages against the PDF's pages, pixel by pixel (after rig/t_681_docs.js).

    python3 -I rig/t_681_docs.py <out dir>

Renders the PDF at 96 dots to the inch (pdftoppm), lays each page over the page shown, and reports, per page: how much of the
ink is in the same place (ink of either within one pixel of ink of the other), how far the ink is from lining up (the
shift that best lines the two up, searched over +-3 px), and writes an overlay (shown in red, PDF in blue, both in black)."""
import os, subprocess, sys
import numpy as np
from PIL import Image

out = sys.argv[1]
subprocess.run(["pdftoppm", "-r", "96", "-png", os.path.join(out, "saved.pdf"), os.path.join(out, "pdf")], check=True)
ok = True
i = 1
while os.path.exists(os.path.join(out, "shown-%d.png" % i)):
    a = np.asarray(Image.open(os.path.join(out, "shown-%d.png" % i)).convert("L"), dtype=np.int16)
    pf = os.path.join(out, "pdf-%d.png" % i)
    if not os.path.exists(pf):
        print("page %d: the PDF has no such page" % i); ok = False; i += 1; continue
    b = np.asarray(Image.open(pf).convert("L"), dtype=np.int16)
    h, w = min(a.shape[0], b.shape[0]), min(a.shape[1], b.shape[1])
    a, b = a[:h, :w], b[:h, :w]
    ia, ib = a < 160, b < 160
    best = None
    for dy in range(-3, 4):
        for dx in range(-3, 4):
            sb = np.roll(np.roll(ib, dy, 0), dx, 1)
            s = (ia & sb).sum() / max(1, (ia | sb).sum())
            if best is None or s > best[0]:
                best = (s, dx, dy)
    def near(x, y):  # ink of x that has ink of y within one pixel
        g = y.copy()
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                g = g | np.roll(np.roll(y, dy, 0), dx, 1)
        return (x & g).sum() / max(1, x.sum())
    na, nb = near(ia, ib), near(ib, ia)
    img = np.full((h, w, 3), 255, np.uint8)
    img[ia & ~ib] = (220, 40, 40); img[ib & ~ia] = (40, 80, 220); img[ia & ib] = (0, 0, 0)
    Image.fromarray(img).save(os.path.join(out, "overlay-%d.png" % i))
    good = na > 0.97 and nb > 0.97 and abs(best[1]) <= 1 and abs(best[2]) <= 1
    ok &= good
    print("page %d: shown ink near the PDF's %.1f%%, PDF ink near the shown %.1f%%, best shift (%d,%d) px, %s" % (i, na * 100, nb * 100, best[1], best[2], "same" if good else "DIFFERENT"))
    i += 1
if os.path.exists(os.path.join(out, "pdf-%d.png" % i)):
    print("the PDF has more pages than the page shows"); ok = False
print("PASS" if ok else "FAIL")
sys.exit(0 if ok else 1)
