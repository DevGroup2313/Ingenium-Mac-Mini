"""The Forge 644 · where the preview panel and the bar at the top are drawn in every frame of a film made by wk_644_drive.py.
Each is found again in every frame by a vertical search against the film's first frame:
  bar   = the bar's name and motto ("The Forge", fixed at the top; if it moves, the whole page was drawn out of place);
  panel = the preview panel's own top bar (Preview, Code, the file's name);
  rel   = panel minus bar: the panel's own motion, which is the shaking.
It also reads the page's own record of the same run (METHOD.json): the preview's height, its transform and the split's
measured height must not change while only scrolling, and the page must really have scrolled.
What is judged (PASS or FAIL): for the wheel (wheel, wheel_fast) and a wheel inside the preview (in_preview), the panel
may stand apart from the bar in no more than 2 frames in 100 (643: about half the frames, 1 or 2 px each way).
What is only reported (INFO): frames where the bar and the panel are drawn late TOGETHER (the whole page a scroll step
behind: WebKitGTK's scrolling thread and page thread out of step, in 643 as in 644), and the keys (keyboard scrolling,
where WebKitGTK draws the bar and the panel late or out of place in 643 and 644 alike, see the report).
   python3 wk_644_frames.py OUT METHOD [METHOD...]      prints one JSON line per method; exit 1 if a judged one fails"""
JUDGED = ("wheel", "wheel_fast", "in_preview")
import json, os, sys, subprocess, tempfile, glob, shutil
import numpy as np
from PIL import Image

out = sys.argv[1]
R = 60


def find(a, ref, b):
    x0, x1, y0, y1 = b
    tpl = ref[y0:y1, x0:x1]
    best, bdy = None, 0
    for dy in range(-R, R + 1):
        if y0 + dy < 0 or y1 + dy > a.shape[0]:
            continue
        e = float(np.abs(a[y0 + dy:y1 + dy, x0:x1] - tpl).mean())
        if best is None or e < best:
            best, bdy = e, dy
    return bdy, round(best, 2)


def film(name):
    geo = json.load(open(os.path.join(out, name + ".geo.json")))
    d = tempfile.mkdtemp(prefix="f644", dir=out)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-i", os.path.join(out, name + ".mkv"), "-vsync", "0", os.path.join(d, "f%05d.png")], check=True)
    files = sorted(glob.glob(os.path.join(d, "f*.png")))
    st, th = geo["st"], geo["th"]
    panel = (int(st["x"] + 10), int(st["x"] + min(st["w"], 600) - 10), int(st["y"] + 2), int(st["y"] + 38))
    bar = (70, 260, 6, 50)
    # the part that should move: the Editor's column, or the app inside the preview when the wheel turns there
    fa = geo["fr"] if name == "in_preview" else th
    area = (int(fa["x"] + 10), int(fa["x"] + fa["w"] - 10), int(max(fa["y"], 120)), int(min(geo["vh"] - 10, fa["y"] + fa["h"])))
    ref = np.asarray(Image.open(files[0]).convert("L"), dtype=np.int16)
    res, prev, moved = [], None, 0
    for f in files:
        a = np.asarray(Image.open(f).convert("L"), dtype=np.int16)
        p, pe = find(a, ref, panel)
        h, he = find(a, ref, bar) if st["y"] > 40 else (0, 0.0)
        res.append({"panel": p, "pe": pe, "bar": h, "he": he, "rel": p - h})
        c = a[area[2]:area[3], area[0]:area[1]]
        if prev is not None and float(np.abs(c - prev).mean()) > 0.5:
            moved += 1
        prev = c
    shutil.rmtree(d)
    n = len(res)
    s = {"frames": n, "contentMoved": moved,
         "panelOff": sum(1 for r in res if r["panel"]), "panelMax": max(abs(r["panel"]) for r in res),
         "barOff": sum(1 for r in res if r["bar"]), "barMax": max(abs(r["bar"]) for r in res),
         "relOff": sum(1 for r in res if r["rel"]), "relMax": max(abs(r["rel"]) for r in res),
         "relSeen": sorted(set(r["rel"] for r in res)), "maxErr": max(r["pe"] for r in res)}
    json.dump({"summary": s, "frames": res}, open(os.path.join(out, name + ".offsets.json"), "w"))
    return s


def page(name):
    if not os.path.exists(os.path.join(out, name + ".json")):   # filmed without the page's own record (WK_NOREC=1)
        return {"frames": 0, "scrolled": None, "heightChanges": 0, "frameHeightChanges": 0, "transformChanges": 0, "splitHeightChanges": 0}
    rec = json.load(open(os.path.join(out, name + ".json")))
    fr = rec["frames"]
    hs = [f["h"] for f in fr]
    return {"frames": len(fr), "scrolled": (max(f["sc"] for f in fr) - min(f["sc"] for f in fr)) if fr else 0,
            "heightChanges": sum(1 for a, b in zip(fr, fr[1:]) if abs(a["h"] - b["h"]) > 0.75 and a["vh"] == b["vh"]),
            "frameHeightChanges": sum(1 for a, b in zip(fr, fr[1:]) if abs(a["fh"] - b["fh"]) > 0.75 and a["vh"] == b["vh"]),
            "transformChanges": sum(1 for a, b in zip(fr, fr[1:]) if a["tf"] != b["tf"]),
            "splitHeightChanges": sum(1 for a, b in zip(fr, fr[1:]) if a["mainH"] != b["mainH"]),
            "styleWrites": len(rec.get("writes") or []), "heldMax": rec.get("heldMax"), "h": [min(hs), max(hs)] if hs else None}


bad = 0
for name in sys.argv[2:]:
    if not os.path.exists(os.path.join(out, name + ".mkv")):
        print(name, "no film")
        bad += 1
        continue
    f, pg = film(name), page(name)
    lim = max(2, f["frames"] * 2 // 100)
    need_scroll = name in ("wheel", "wheel_fast", "keys")
    ok = (f["relOff"] <= lim and f["contentMoved"] >= 5
          and pg["heightChanges"] == 0 and pg["frameHeightChanges"] == 0 and pg["transformChanges"] == 0 and pg["splitHeightChanges"] == 0
          and (pg["scrolled"] is None or pg["scrolled"] >= 400 or not need_scroll))
    note = {"panelApartFromBar": "%d of %d frames (limit %d), up to %d px" % (f["relOff"], f["frames"], lim, f["relMax"]),
            "barLate": "%d frames, up to %d px" % (f["barOff"], f["barMax"])}
    if name in JUDGED:
        bad += 0 if ok else 1
        print(("PASS " if ok else "FAIL ") + name, json.dumps({"summary": note, "film": f, "page": pg}), flush=True)
    else:
        print("INFO " + name, json.dumps({"summary": note, "film": f, "page": pg}), flush=True)
sys.exit(1 if bad else 0)
