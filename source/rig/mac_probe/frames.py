"""The look probe: reads the screen pictures a Mac took of the Blend page and says what changed between them.
For each picture: the mean colour of the face of Ingenium's wheel (a ring between its collar and its teeth) and of the seal at
its centre. A picture whose face or seal differs clearly from the usual one is named. Also makes one sheet of all the pictures.
  python3 frames.py <folder of f_*.png> <probe.log> <out folder>"""
import sys, os, re, json, glob, statistics
from PIL import Image
frames, logp, out = sys.argv[1], sys.argv[2], sys.argv[3]
log = open(logp, encoding="utf-8", errors="replace").read()
m = re.search(r"SCREEN (\d+) (\d+) CONTENT (-?\d+) (-?\d+) (\d+) (\d+) SCALE ([\d.]+)", log)
sw, sh, cx, cy, cw_, ch_, scale = [float(x) for x in m.groups()]
states = [json.loads(l[6:]) for l in log.splitlines() if l.startswith("STATE {")]
st = [s for s in states if s.get("ready") and s.get("wheel")][-1]
lines = ["Ingenium look probe: the Blend page in a Mac web view (WKWebView)", re.search(r"OS (.*)", log).group(0), "Web view: " + st["ua"],
         "Screen %dx%d, window content %dx%d at (%d,%d), scale %s" % (sw, sh, cw_, ch_, cx, cy, scale),
         "The page says: wheel %s, seat %s, seal in place: %s, motion '%s', page errors: %s" % (st["wheel"], st["seat"], st["seal"], st["motion"], st["errs"]), ""]
files = sorted(glob.glob(os.path.join(frames, "f_*.png")))
first = Image.open(files[0]); k = first.size[0] / sw   # picture pixels per screen point
W = st["wheel"]; M = st["move"] or W
wx, wy, R = (cx + W["x"] + W["w"] / 2) * k, (cy + W["y"] + W["h"] / 2) * k, W["w"] / 2 * k
def mean(im, r0, r1):
    px = im.load(); n = 0; acc = [0, 0, 0]
    for y in range(int(wy - r1), int(wy + r1) + 1):
        for x in range(int(wx - r1), int(wx + r1) + 1):
            d = ((x - wx) ** 2 + (y - wy) ** 2) ** .5
            if r0 <= d <= r1:
                p = px[x, y]; acc[0] += p[0]; acc[1] += p[1]; acc[2] += p[2]; n += 1
    return tuple(round(a / max(1, n)) for a in acc)
box = (int((cx + M["x"] - 10) * k), int((cy + M["y"] - 10) * k), int((cx + M["x"] + M["w"] + 10) * k), int((cy + M["y"] + M["h"] + 10) * k))
rows, crops = [], []
for f in files:
    im = Image.open(f).convert("RGB")
    rows.append((os.path.basename(f), mean(im, R * .60, R * .78), mean(im, 0, R * .2)))
    crops.append(im.crop(box))
def far(a, b): return max(abs(a[i] - b[i]) for i in range(3))
med_face = tuple(int(statistics.median(r[1][i] for r in rows)) for i in range(3))
med_seal = tuple(int(statistics.median(r[2][i] for r in rows)) for i in range(3))
odd_face = [r[0] for r in rows if far(r[1], med_face) > 22]
odd_seal = [r[0] for r in rows if far(r[2], med_seal) > 30]
lines += ["%d pictures. Usual face colour %s, usual seal colour %s." % (len(rows), med_face, med_seal),
          "Pictures whose wheel face differs clearly: %d %s" % (len(odd_face), odd_face[:30]),
          "Pictures whose seal differs clearly: %d %s" % (len(odd_seal), odd_seal[:30]), "", "picture      face (r,g,b)       seal (r,g,b)"]
lines += ["%s  %-18s %-18s%s" % (r[0], r[1], r[2], "  <-- differs" if (r[0] in odd_face or r[0] in odd_seal) else "") for r in rows]
os.makedirs(out, exist_ok=True)
open(os.path.join(out, "report.txt"), "w").write("\n".join(lines) + "\n")
cw2, ch2 = crops[0].size; z = min(1.0, 260.0 / cw2); tw, th = int(cw2 * z), int(ch2 * z); per = 8
sheet = Image.new("RGB", (tw * per, th * ((len(crops) + per - 1) // per)), (20, 16, 30))
for i, c in enumerate(crops): sheet.paste(c.resize((tw, th)), ((i % per) * tw, (i // per) * th))
sheet.save(os.path.join(out, "sheet.jpg"), quality=70)
print("\n".join(lines[:60]))
