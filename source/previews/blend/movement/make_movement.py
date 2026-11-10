"""Puts together the template of Blend as a movement in 3D (Ingenium 6.70): the frame and the shared parts of the Blend preview
(blend_template.html), and the movement's own styles, page and script (movement.css, body.html, movement.js).

python3 -I make_movement.py <folder of the app seals' pictures (ingenium.png, ingeniumN.png)> <out template>
then: python3 -I ../tools/build_blend.py <scratch folder> <out template> <out page>
"""
import base64, io, os, sys
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SEALS, OUT = sys.argv[1], sys.argv[2]
B = open(os.path.join(HERE, 'blend_template.html'), encoding='utf-8').read()


def cut(a, b, start=0):
    i = B.index(a, start)
    j = B.index(b, i)
    return B[i:j]


head = B[:B.index('<style>')].replace('<title>Ingenium Blend</title>', '<title>Ingenium Blend Movement</title>')
css = cut('<style>', "/* ===== Blend, in Home's language ===== */")
tokens = cut("/* ===== Blend, in Home's language ===== */", '.bx{display:flex')
words = cut('.bx-eyebrow{', '/* the engine: Ingenium')
panels = cut('/* the two panels: the step, and the answers', "/* Ingenium's own seal key (R104, R175)")
popcss = cut('/* every card, row and plate that can be pressed leans', '.hov{--cdl')
own_css = open(os.path.join(HERE, 'movement.css'), encoding='utf-8').read()
body = open(os.path.join(HERE, 'body.html'), encoding='utf-8').read().replace('{{BOAT}}', '')
js = open(os.path.join(HERE, 'movement.js'), encoding='utf-8').read()


def sealuri(name):
    im = Image.open(os.path.join(SEALS, name + '.png')).convert('RGBA').resize((128, 128), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, 'WEBP', quality=92, method=6)
    return 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()


js = js.replace('{{SEAL_ING}}', sealuri('ingenium')).replace('{{SEAL_INGN}}', sealuri('ingeniumN'))
out = head + css + tokens + words + panels + popcss + own_css + '\n</style>\n\n' + body + js
open(OUT, 'w', encoding='utf-8').write(out)
print('written', len(out))
