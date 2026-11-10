"""Builds the live Home preview page from the template, the pictures of her app and the genuine parts taken from it.

python3 -I build_live.py <scratch dir> <template> <out html> [card width]
"""
import base64, io, json, re, sys
from PIL import Image

S, TPL, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
CARD_W = sys.argv[4] if len(sys.argv) > 4 else '330'
R = S + '/real2/'
g = json.load(open(R + 'geometry.json'))['day']
parts = json.load(open(R + 'parts.json'))


def webp(name, q=92):
    im = Image.open(R + name)
    if im.mode not in ('RGB', 'RGBA'):
        im = im.convert('RGBA')
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=q, method=6)
    return 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode(), im.size


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

# her app's own rules for the seal key and the card, kept to the preview's window
rules = [r for r in parts['rules'] if 'ghx-' not in r and '#ccPanel' not in r]


def scope(t):
    for a, b in (('html body[data-theme="night"]', '.win[data-theme="night"]'), ('body[data-theme="night"]', '.win[data-theme="night"]'),
                 ('html body[data-motion="minimal"]', '.win[data-motion="minimal"]'), ('body[data-motion="minimal"]', '.win[data-motion="minimal"]'),
                 ('body[data-motion="calm"]', '.win[data-motion="calm"]'), ('html body ', '.win ')):
        t = t.replace(a, b)
    return t


css = [scope(r) for r in rules] + parts['frames']
for sel, out in (('.hx', '.win .hx'), ('body[data-theme="night"] .hx', '.win[data-theme="night"] .hx')):
    v = parts['vars'].get(sel, {})
    css.append(out + '{' + ';'.join(k + ':' + val for k, val in v.items()) + '}')
html = html.replace('{{APP_CSS}}', '\n'.join(css))
html = html.replace('{{CARD_W}}', CARD_W)

# the seal key, as Home has it, at the engine's size
seal = parts['key'].replace('style="--S: 92px;"', 'style="--S: 100px;"')
assert 'style="--S: 100px;"' in seal, 'seal size not set'
html = html.replace('{{SEAL}}', seal)

# the card, as Home has it, without "Read the short guide" (and the wallpapers key hidden beside it)
nx = parts['next']
nx2 = re.sub(r'<div class="hx-row"><button class="hx-btn" id="hxGuide".*?</div>', '', nx, flags=re.S)
assert 'hxGuide' not in nx2 and 'hxWall' not in nx2, 'guide row still there'
nx2 = nx2.replace(' onclick="go(\'models\')"', ' data-say="In Ingenium this opens Models, to bring in your first model."')
nx2 = nx2.replace('id="homeTour" type="button"', 'id="homeTour" type="button" data-say="In Ingenium this starts the guided tour."')
assert 'data-say' in nx2 and 'onclick' not in nx2
html = html.replace('{{NEXT}}', nx2)

rooms = [{'h': k['h'], 'm': k['m'], 'd': k['d'], 'icon': k['icon']} for k in parts['keys']]
html = html.replace('{{ROOMS}}', json.dumps(rooms, ensure_ascii=False).replace('</', '<\\/'))
html = html.replace('{{HELLO}}', parts['hello']).replace('{{DATE}}', parts['date']).replace('{{LEDE}}', parts['lede'])
left = re.findall(r'\{\{[A-Z_]+\}\}', html)
assert not left, left
open(OUT, 'w').write(html)
print('written', OUT, round(len(html) / 1e6, 2), 'MB')
