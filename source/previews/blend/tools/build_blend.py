"""Builds the live Blend preview from its template, pictures of the app's frame with Blend open, and Ingenium's own seal key.

python3 -I build_blend.py <scratch dir> <template> <out html>
"""
import base64, io, json, re, sys
from PIL import Image

S, TPL, OUT = sys.argv[1:4]
F = S + '/frame_blend/'
parts = json.load(open(S + '/real2/parts.json'))
g = json.load(open(F + 'geometry.json'))['day']


def webp(path, q):
    im = Image.open(path)
    if im.mode not in ('RGB', 'RGBA'):
        im = im.convert('RGBA')
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=q, method=6)
    return 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()


def scope(t):
    for a, b in (('html body[', '.win['), ('html body ', '.win '), ('body[', '.win[')):
        t = t.replace(a, b)
    return t


html = open(TPL).read()
for part in ('top', 'rail', 'right', 'back'):
    for th in ('day', 'night'):
        html = html.replace('{{' + part.upper() + '_' + th.upper() + '}}', webp(F + part + '_' + th + '.png', 90 if part == 'back' else 93))
T, L, RX = g['T'], g['L'], g['RX']
html = (html.replace('{{T}}', str(T)).replace('{{L}}', str(L)).replace('{{RX}}', str(RX))
        .replace('{{RW}}', str(1440 - RX)).replace('{{RH}}', str(900 - T)))
seal = [r for r in parts['rules'] if re.search(r'\.isl\b|\.isl-|r175-|\.s4-|seal-spin|seal-heart|seal-counter|seal3d', r.split('{')[0]) and 'ghx-' not in r]
html = html.replace('{{APP_CSS}}', '\n'.join([scope(r) for r in seal] + parts['frames']))
key = parts['key'].replace('style="--S: 92px;"', 'style="--S: 96px;"')
assert '--S: 96px' in key
html = html.replace('{{SEAL}}', key)
left = re.findall(r'\{\{[A-Z0-9_]+\}\}', html)
assert not left, left
open(OUT, 'w').write(html)
print('written', OUT, round(len(html) / 1e6, 2), 'MB')
