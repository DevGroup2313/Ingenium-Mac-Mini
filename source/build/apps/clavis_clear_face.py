# 7.79 (25 November 2026): Clavis's seal, its face clear. Her words, on Ingenia's Clavis folder: "The Clavis logo is transluscent on the
# inside, it does not have any coloured fillins. Remove what you added." Ingenium's copy of the seal (builtin/clavis_mark.json, from
# clavis_bring.py) filled the plate's face: ivory by day, near-black by night. This takes the fill out and keeps everything else: the
# gold bezel and ring, the engraved circles, the rays, the key and the star.
# How: on the plate (the first layer, by day and by night) and on the flat seal (by day and by night), the face is the region reached
# from the plate's centre through face-coloured pixels (the engraved lines are thin and light, the gold ring stops it). Inside it, each
# pixel's own share of the face's colour is lifted out ("colour to transparency": the face's local shade, measured with the thin lines
# filtered away, is what is taken out), so the face becomes clear and each engraved line keeps its colour at its own strength.
# Usage (from build/):  python3 -I apps/clavis_clear_face.py        (rewrites apps/builtin/clavis_mark.json; run once; a second run finds
#                                                                    the face already clear and changes nothing)
import base64, io, json, os, sys
import numpy as np
from PIL import Image, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(HERE, "builtin", "clavis_mark.json")


def decode(src):
    b = base64.b64decode(src.split(",", 1)[1] if src.startswith("data:") else src)
    return Image.open(io.BytesIO(b)).convert("RGBA")


def clear(img, night):
    """Inside the gold ring, the face's own colour is taken out: the gold, the rays, the key and the engraved lines stay."""
    a = np.array(img).astype(np.float64)
    H, W = a.shape[:2]
    op = a[..., 3] > 200
    # the ring's centre: across, the middle of its widest rows; down, the middle of the ring's own height below its hanger
    rows = op.sum(axis=1)
    wide = np.where(rows >= rows.max() * 0.995)[0]
    xs = np.where(op[int(np.median(wide))])[0]
    cx, R = (xs.min() + xs.max()) / 2.0, (xs.max() - xs.min()) / 2.0
    ys = np.where(op.any(axis=1))[0]
    cy = ys.max() - R
    yy, xx = np.mgrid[0:H, 0:W]
    disc = (xx - cx) ** 2 + (yy - cy) ** 2 < (R * FACE) ** 2
    p = a[..., :3]
    sat = p.max(axis=2) - p.min(axis=2)
    # the face's shade where it lies: the median of its quiet (unsaturated) pixels, block by block, smoothed
    quiet = disc & (sat < 30) & (a[..., 3] > 200)
    if quiet.sum() < 0.1 * np.pi * (R * FACE) ** 2:
        return img, 0
    B = max(8, int(R / 10))
    shade = np.zeros_like(p)
    have = np.zeros((H, W), bool)
    glob = np.median(p[quiet], axis=0)
    for y0 in range(0, H, B):
        for x0 in range(0, W, B):
            q = quiet[y0:y0 + B, x0:x0 + B]
            v = np.median(p[y0:y0 + B, x0:x0 + B][q], axis=0) if q.sum() > B else glob
            shade[y0:y0 + B, x0:x0 + B] = v
    sh = Image.fromarray(np.clip(shade, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(B))
    c = np.array(sh).astype(np.float64)
    d = np.abs(p - c).max(axis=2)
    alpha = np.clip((d - 8) / 50.0, 0, 1)
    safe = np.maximum(alpha, 1e-3)[..., None]
    col = np.clip((p - c * (1 - alpha[..., None])) / safe, 0, 255)
    out = a.copy()
    out[..., :3] = np.where(disc[..., None], col, p)
    out[..., 3] = np.where(disc, a[..., 3] * alpha, a[..., 3])
    return Image.fromarray(out.round().astype(np.uint8), "RGBA"), int(disc.sum())


# the face's share of the seal's radius (the gold ring and its numbers stand outside it), measured on Clavis's plate
FACE = 0.82


def enc(img, fmt):
    b = io.BytesIO()
    if fmt == "webp":
        img.save(b, "WEBP", lossless=True)
        return "data:image/webp;base64," + base64.b64encode(b.getvalue()).decode()
    img.save(b, "PNG", optimize=True)
    return base64.b64encode(b.getvalue()).decode()


def main():
    d = json.load(open(P, encoding="utf-8"))
    done = []
    for key, night in (("clavis", False), ("clavisN", True)):
        L = d["layers"][key][0]
        img = decode(L["src"])
        new, n = clear(img, night)
        if n:
            L["src"] = enc(new, "webp")
            done.append("%s plate (%d face pixels)" % (key, n))
    for key, night in (("day", False), ("night", True)):
        s = d["seal"][key]
        img = decode(s["b64"])
        new, n = clear(img, night)
        if n:
            s["b64"] = enc(new, "png")
            done.append("flat seal by %s (%d face pixels)" % (key, n))
    json.dump(d, open(P, "w", encoding="utf-8"), separators=(",", ":"))
    print("Clavis's face cleared: " + ("; ".join(done) or "nothing to clear"))


if __name__ == "__main__":
    main()
