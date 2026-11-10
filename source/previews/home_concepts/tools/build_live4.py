"""Builds the live Home preview (6.67) from the template, pictures of her app, the genuine parts taken from it, and the app's own
modules r147 (Home's styles) and r261 (the orrery), so the preview runs the code Ingenium carries.

python3 -I build_live4.py <scratch dir> <template> <out html> <modules dir>
"""
import base64, io, json, re, sys
from PIL import Image

S, TPL, OUT, MOD = sys.argv[1:5]
R = S + '/real2/'
g = json.load(open(R + 'geometry.json'))['day']
parts = json.load(open(R + 'parts.json'))


def webp(name, q):
    im = Image.open(R + name)
    if im.mode not in ('RGB', 'RGBA'):
        im = im.convert('RGBA')
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=q, method=6)
    return 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode(), im.size


def scope(t):
    for a, b in (('html body[', '.win['), ('html body ', '.win '), ('body[', '.win[')):
        t = t.replace(a, b)
    return t


html = open(TPL).read()
sizes = {}
for part in ('top', 'rail', 'right', 'rest', 'back'):
    for th in ('day', 'night'):
        uri, size = webp(part + '_' + th + '.png', 90 if part == 'back' else 93)
        html = html.replace('{{' + part.upper() + '_' + th.upper() + '}}', uri)
        sizes[part] = size
T, L, RX = g['T'], g['L'], g['RX']
html = (html.replace('{{T}}', str(T)).replace('{{L}}', str(L)).replace('{{RX}}', str(RX))
        .replace('{{RW}}', str(1440 - RX)).replace('{{RH}}', str(900 - T))
        .replace('{{REST_W}}', str(sizes['rest'][0] // 2)).replace('{{REST_H}}', str(sizes['rest'][1] // 2)))

r147 = open(MOD + '/r147.js').read()
r261 = open(MOD + '/r261.js').read()
home_css = re.search(r'<style id="r147-css">(.*?)</style>', r147, re.S).group(1)
orrery_css = re.search(r'<style id="r261-css">(.*?)</style>', r261, re.S).group(1)
orrery_js = re.search(r'</style>\s*<script>(.*?)</script>', r261, re.S).group(1)
seal = [r for r in parts['rules'] if re.search(r'\.isl\b|\.isl-|r175-|\.s4-|seal-spin|seal-heart|seal-counter|seal3d', r.split('{')[0]) and 'ghx-' not in r]
css = '\n'.join([scope(home_css)] + [scope(r) for r in seal] + parts['frames'] + [scope(orrery_css)])
html = html.replace('{{APP_CSS}}', css)
assert '</script' not in orrery_js
html = html.replace('{{R261_JS}}', orrery_js)

key = parts['key'].replace('style="--S: 92px;"', 'style="--S: 132px;"')
assert '--S: 132px' in key
html = html.replace('{{SEAL}}', key)
nx = parts['next'].replace(' onclick="go(\'models\')"', ' data-say="In Ingenium this opens Models, to bring in your first model."')
nx = nx.replace('id="homeTour" type="button"', 'id="homeTour" type="button" data-say="In Ingenium this starts the guided tour."')
assert 'onclick' not in nx and 'hxGuide' in nx
html = html.replace('{{NEXT}}', nx)


def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


keys = ''.join('<button class="hx-key" type="button" data-go="%s" aria-label="Open %s"><span class="hx-jewel">%s</span><span class="hx-kt"><span class="hx-kh">%s</span>'
               '<span class="hx-kd">%s</span></span><span class="hx-km">%s</span><span class="hx-arrow" aria-hidden="true">&#8250;</span></button>'
               % (k['go'], esc(k['h']), k['icon'], esc(k['h']), esc(k['d']), esc(k['m'])) for k in parts['keys'])
assert all(k['go'] in ('chat', 'code', 'build', 'fabrica', 'lector', 'focus') for k in parts['keys']), [k['go'] for k in parts['keys']]
html = html.replace('{{KEYS}}', keys)
html = html.replace('{{HELLO}}', esc(parts['hello'])).replace('{{DATE}}', esc(parts['date'])).replace('{{LEDE}}', esc(parts['lede']))
left = re.findall(r'\{\{[A-Z0-9_]+\}\}', html)
assert not left, left
open(OUT, 'w').write(html)
print('written', OUT, round(len(html) / 1e6, 2), 'MB')
