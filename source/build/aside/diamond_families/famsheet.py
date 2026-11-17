# Contact sheet of the colour families: each family's four shades made from Ingenium's purple stone by the same display-space colour
# matrix and luma curve the renderer applies (r292 fam()). Rows: families; columns: pastel, medium, deep (by day) and night (on the night
# theme's ground).   python3 fam/famsheet.py <raw folder> <palette.json> <out.png>
import sys, json, math
import numpy as np
from PIL import Image
RAW, PAL, OUT = sys.argv[1:4]
YF = np.array([[0.299, 0.587, 0.114], [0.596, -0.274, -0.322], [0.211, -0.523, 0.312]])
YI = np.linalg.inv(YF)


def hexrgb(h):
    h = h.lstrip('#'); return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)]) / 255.0


def load(n):
    return np.asarray(Image.open('%s/stone_%s_00.png' % (RAW, n)).convert('RGBA')).astype(np.float64) / 255.0


SH = ['lavender', 'purple', 'night', 'nightT']
IM = {n: load(n) for n in SH + ['clear']}
# the stone alone: rows above the gap between the stone and the holder
A = IM['clear'][..., 3]
rows = (A > 0.04).sum(1)
top = next(y for y in range(40, len(rows)) if rows[y] > 0)
gap = next(y for y in range(top, len(rows)) if rows[y] == 0)


def mean_tone(im):
    s = im[top:gap]; a = s[..., 3]; m = a > 0.9
    return (s[..., :3][m]).mean(0)


S = {n: mean_tone(IM[n]) for n in SH}
print('sources', {n: '#%02x%02x%02x' % tuple(int(round(v * 255)) for v in S[n]) for n in SH})


def hue_of(c):
    q = YF @ c; return math.atan2(q[2], q[1])


def recolour(im, hs, hf, k, sc, g):
    """each pixel's hue gathered toward the family's (its distance from the source's own hue times k), its chroma times sc, its luma
    raised to g: what r292's fam() does in the display's colours"""
    c = im[..., :3]; q = c @ YF.T
    C = np.hypot(q[..., 1], q[..., 2]); a = np.arctan2(q[..., 2], q[..., 1])
    d = a - hs; d = d - 2 * np.pi * np.floor((d + np.pi) / (2 * np.pi)); na = hf + d * k
    q2 = np.stack([np.power(np.clip(q[..., 0], 0, None), g), C * sc * np.cos(na), C * sc * np.sin(na)], -1)
    out = im.copy(); out[..., :3] = np.clip(q2 @ YI.T, 0, 1); return out


pal = json.load(open(PAL))
cw = 260; chh = 150
sheet = Image.new('RGBA', (cw * 4 + 150, chh * len(pal)), (255, 255, 255, 255))
from PIL import ImageDraw
d = ImageDraw.Draw(sheet)
for r, (name, t) in enumerate(pal.items()):
    d.text((8, r * chh + 60), name, fill=(40, 30, 60, 255))
    for c, n in enumerate(SH):
        if t[c] is None:
            o = IM['clear'] if (c == 0 and name.lower().startswith('clear')) else IM[n]
        else:
            hx, k, sc, g = t[c]
            o = recolour(IM[n], hue_of(S[n]), hue_of(hexrgb(hx)), k, sc, g)
        img = Image.fromarray((o * 255).round().astype(np.uint8), 'RGBA')
        bg = Image.new('RGBA', img.size, (246, 243, 250, 255) if c < 3 else (24, 18, 40, 255)); bg.alpha_composite(img)
        tile = bg.crop((120, 30, 400, 230)).resize((cw, int(200 * cw / 280)))
        sheet.paste(tile.crop((0, 0, cw, chh)), (150 + c * cw, r * chh))
sheet.save(OUT); print(OUT, sheet.size)
