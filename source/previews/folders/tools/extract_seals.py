"""Takes the four seals of The Offline Project, by day and by night, out of Ingenium's own r140 (its r140-flat pictures) for the
Folders preview: <folder>/cd.png, cdN.png, forge.png, forgeN.png, ingenium.png, ingeniumN.png, inkwell.png, inkwellN.png.

python3 -I extract_seals.py <path of source/build/modules/r140.js> <scratch folder>/appseals
"""
import base64, io, json, os, re, sys
from PIL import Image

SRC, OUT = sys.argv[1:3]
os.makedirs(OUT, exist_ok=True)
t = open(SRC, encoding='utf-8').read()
m = re.search(r'<script type="application/json" id="r140-flat">(.*?)</script>', t, re.S)
d = json.loads(m.group(1))
for k in ('cd', 'cdN', 'forge', 'forgeN', 'ingenium', 'ingeniumN', 'inkwell', 'inkwellN'):
    im = Image.open(io.BytesIO(base64.b64decode(d[k].split(',', 1)[1]))).convert('RGBA')
    im.save(os.path.join(OUT, k + '.png'))
    print(k, im.size)
