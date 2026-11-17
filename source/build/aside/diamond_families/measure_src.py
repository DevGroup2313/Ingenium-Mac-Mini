# The purple stone's mean colour in each look (lavender, purple, night by day, night of the night theme), over all its frames: the stone
# alone (the rows above the gap between it and the holder), its solid pixels.   python3 -I measure_src.py <raw folder> <out.json>
import sys, glob, json
import numpy as np
from PIL import Image
RAW, OUT = sys.argv[1:3]
A = np.asarray(Image.open(RAW + '/stone_clear_00.png').convert('RGBA'))[..., 3]
rows = (A > 10).sum(1); top = next(y for y in range(40, len(rows)) if rows[y] > 0); gap = next(y for y in range(top, len(rows)) if rows[y] == 0)
res = []
for n in ['lavender', 'purple', 'night', 'nightT']:
    acc = [];
    for f in sorted(glob.glob(RAW + '/stone_%s_*.png' % n)):
        im = np.asarray(Image.open(f).convert('RGBA')).astype(np.float64)[top:gap]; m = im[..., 3] > 230; acc.append(im[..., :3][m])
    c = np.concatenate(acc).mean(0); res.append('#%02x%02x%02x' % tuple(int(round(v)) for v in c)); print(n, len(acc), res[-1])
json.dump(res, open(OUT, 'w'))
