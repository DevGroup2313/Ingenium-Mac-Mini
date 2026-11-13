#!/usr/bin/env python3
"""Builds the preview of Build's and Focus's heads (heads2.html) from page.html, Home's click (hs.js), the diamond (diamond.js), the stones
(stones.js) and the fonts (the compass preview's Home Cormorant, 600 and 500 italic)."""
import json, os
H = os.path.dirname(os.path.abspath(__file__)); S = os.path.dirname(H)
F = json.load(open(os.path.join(S, 'cmp13', 'fonts.json')))
fonts = ''.join('@font-face{font-family:"Home Cormorant";font-style:%s;font-weight:%s;font-display:swap;src:url(%s) format("woff2")}\n' % (k.split('-')[2], k.split('-')[1], v)
                for k, v in F.items() if k in ('cormorant-600-normal', 'cormorant-500-italic'))
rd = lambda n: open(os.path.join(H, n), encoding='utf-8').read()
page = rd('page.html')
for a, b in (('/*FONTS*/', fonts), ('/*HS_JS*/', rd('hs.js')), ('/*DIAMOND_JS*/', rd('diamond.js')), ('/*STONES_JS*/', rd('stones.js')), ('/*VCLIGHT_JS*/', rd('vclight.js')), ('/*TREE_JS*/', rd('tree.js'))):
    assert page.count(a) == 1, a
    page = page.replace(a, b)
open(os.path.join(H, 'heads2.html'), 'w', encoding='utf-8').write(page); print('built', len(page))
