#!/usr/bin/env python3
"""Builds the preview of Models' turret and Blend's movement (mb.html): the page (page.html, made from the heads preview's frame by
page_make.py), Home's click (heads2/hs.js), Home's engine button (its markup and styles as the app draws them, sealCopy from r290 and the
replica of its flourishes), and the renderer (instr.js)."""
import json
S = '/tmp/claude-0/-home-user/e21db973-6f06-529c-bd20-f4b651dad94e/scratchpad'
F = json.load(open(S + '/cmp13/fonts.json'))
fonts = ''.join('@font-face{font-family:"Home Cormorant";font-style:%s;font-weight:%s;font-display:swap;src:url(%s) format("woff2")}\n' % (k.split('-')[2], k.split('-')[1], v)
                for k, v in F.items() if k in ('cormorant-600-normal', 'cormorant-500-italic'))
HS = json.load(open(S + '/cmp13/homeseal.json'))
seal_css = '\n'.join(r for r in HS['rules'] if not r.startswith('#page-') and '.skc-seat' not in r)
seal_css += """
:root{--accent:#6a3fb5;--accent-bright:#8a63d2}
.seal-spin{transform-origin:60px 60px;animation:ikEngine 9s linear infinite}
.seal-counter{transform-origin:60px 60px;animation:ikEngine 9s linear infinite}
.seal-heart{transform-origin:60px 60px;animation:sealBeat 3.2s ease-in-out infinite}
@keyframes ikEngine{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
@keyframes sealBeat{0%,100%{transform:scale(1)}14%{transform:scale(1.18)}28%{transform:scale(1.04)}42%{transform:scale(1.12)}56%{transform:scale(1)}}
.ikey-hx .isl .isl-ring{--fz:0;--fk:1}
:root[data-motion="minimal"] .seal-spin,:root[data-motion="minimal"] .seal-counter,:root[data-motion="minimal"] .seal-heart{animation:none}
@media (prefers-reduced-motion:reduce){.seal-spin,.seal-counter,.seal-heart{animation:none}}
"""
v6 = open(S + '/v6_seal_js.txt', encoding='utf-8').read()
r290 = open(S + '/r290.js', encoding='utf-8').read(); i = r290.find('function sealCopy('); j = r290.find('\nfunction ', i + 10); sealcopy = r290[i:j]
rd = lambda n: open(n, encoding='utf-8').read()
page = rd(S + '/mb/page.html')
for a, b in (('/*FONTS*/', fonts), ('/*SEALCSS*/', seal_css), ('/*SEALHTML*/', HS['html']), ('/*HS_JS*/', rd(S + '/heads2/hs.js')), ('/*SEAL_JS*/', sealcopy + '\n' + v6), ('/*INSTR_JS*/', rd(S + '/mb/instr.js'))):
    assert page.count(a) == 1, a
    page = page.replace(a, b)
open(S + '/mb/mb.html', 'w', encoding='utf-8').write(page); print('built', len(page))
open(S + '/tb/mb.html', 'w', encoding='utf-8').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>' + page + '</body></html>')
