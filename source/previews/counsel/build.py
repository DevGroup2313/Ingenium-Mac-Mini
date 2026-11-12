"""The counsellor's preview (Ingenium 6.90), built from the Career Studio itself: the app's frame (pictures of the running page), the
real #page-career at each stage of the path as modules/r283.js draws it for an invented person, every style rule, keyframe and token that
draws it, and a bar above the window to walk the stages by day and by night. Nothing here is drawn by hand.
    python3 -I build.py <capture folder (tools/capture_counsel.js's out, with frame/ inside it from tools/capture_frame.js)> <out.html>"""
import sys, json, re, io, base64, os
from PIL import Image
C, OUT = sys.argv[1:3]
H = os.path.dirname(os.path.abspath(__file__))
parts = json.load(open(os.path.join(C, 'parts.json'), encoding='utf-8'))
g = json.load(open(os.path.join(C, 'frame', 'geometry.json')))['day']
T, L, RX = g['T'], g['L'], g['RX']; PX, PY, PW = round(g['page']['x']), round(g['page']['y']), round(g['page']['w'])
def webp(path, q):
    im = Image.open(path)
    if im.mode not in ('RGB', 'RGBA'): im = im.convert('RGBA')
    b = io.BytesIO(); im.save(b, 'WEBP', quality=q, method=6); return 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()
pic = {}
for part in ('top', 'rail', 'right', 'back'):
    for th in ('day', 'night'):
        pic[part + '_' + th] = webp(os.path.join(C, 'frame', part + '_' + th + '.png'), 86 if part == 'back' else 92)
rules = '\n'.join(parts['rules']) + '\n' + '\n'.join(parts['media']) + '\n' + '\n'.join(parts['frames'])
def toks(th):
    return ''.join('%s:%s;' % (k, v) for k, v in parts['toks'][th].items() if k not in ('--font', '--bg', '--ink'))
shots = {k: v['html'] for k, v in parts['shots'].items()}
hs = {k: v['h'] for k, v in parts['shots'].items()}
add_css = open(os.path.join(H, 'add.css'), encoding='utf-8').read()
add_js = open(os.path.join(H, 'add.js'), encoding='utf-8').read()
notes = open(os.path.join(H, 'notes.html'), encoding='utf-8').read()
page = '''<title>Your counsellor</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
/* the preview's own frame around the window: a bar of stage keys, the window, the notes */
:root{--pv-bg:#efeaf4;--pv-ink:#221a2e;--pv-ink2:#4a4358;--pv-ink3:#6c6579;--pv-card:#ffffff;--pv-hair:rgba(34,26,46,.10);--pv-acc:#6a3fb5;--pv-accs:rgba(106,63,181,.10);--pv-pa:#7348be;--pv-pb:#5d37a1;--pv-pedge:#4b2a86;
  --pv-pill:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -1.5px 0 rgba(40,20,70,.10),0 1px 0 rgba(40,20,70,.12),0 3px 4px rgba(40,20,70,.09);--pv-slab:0 1px 0 rgba(40,22,68,.10),0 6px 12px rgba(40,22,68,.07),0 18px 36px rgba(40,22,68,.10)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--pv-bg:#120d1a;--pv-ink:#f3eefb;--pv-ink2:#d3c9e3;--pv-ink3:#a99cc1;--pv-card:#201a2b;--pv-hair:rgba(205,184,240,.12);--pv-acc:#b79ce6;--pv-accs:rgba(183,156,230,.14);--pv-pa:#7a56c8;--pv-pb:#5b3aa1;--pv-pedge:#2c1956;
  --pv-pill:inset 0 1px 0 rgba(255,255,255,.09),inset 0 -1.5px 0 rgba(0,0,0,.4),0 1px 0 rgba(0,0,0,.5),0 3px 5px rgba(0,0,0,.4);--pv-slab:0 1px 0 rgba(0,0,0,.6),0 6px 12px rgba(0,0,0,.35),0 18px 36px rgba(0,0,0,.4);color-scheme:dark}}
:root[data-theme="dark"]{--pv-bg:#120d1a;--pv-ink:#f3eefb;--pv-ink2:#d3c9e3;--pv-ink3:#a99cc1;--pv-card:#201a2b;--pv-hair:rgba(205,184,240,.12);--pv-acc:#b79ce6;--pv-accs:rgba(183,156,230,.14);--pv-pa:#7a56c8;--pv-pb:#5b3aa1;--pv-pedge:#2c1956;
  --pv-pill:inset 0 1px 0 rgba(255,255,255,.09),inset 0 -1.5px 0 rgba(0,0,0,.4),0 1px 0 rgba(0,0,0,.5),0 3px 5px rgba(0,0,0,.4);--pv-slab:0 1px 0 rgba(0,0,0,.6),0 6px 12px rgba(0,0,0,.35),0 18px 36px rgba(0,0,0,.4);color-scheme:dark}
body{background:var(--pv-bg);color:var(--pv-ink);font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:18px 48px}
''' + add_css + '''
/* the window: the app's own tokens by day and by night, then every rule that draws the studio, as captured */
.win{''' + toks('day') + '''}
body[data-theme="night"] .win{''' + toks('night') + '''}
''' + rules + '''
</style>
<div class="pv">
<header class="pv-head"><h1>Your counsellor: one path through the Career Studio</h1>
<p>Drawn from the Career Studio itself, running Ingenium 6.90 with an invented person (Rosalind Okafor) and a stand-in model. Walk the five stages with the keys; tap chips, aims and keys inside the window; switch day and night.</p></header>
<div class="pv-bar" id="pvBar">
<div class="pv-stages" role="tablist" aria-label="The stages">
<button type="button" class="pv-k" data-s="have0">1 · Empty</button><button type="button" class="pv-k" data-s="have">1 · What you have</button><button type="button" class="pv-k" data-s="record0">2 · Before reading</button><button type="button" class="pv-k" data-s="record">2 · Your record</button><button type="button" class="pv-k" data-s="want">3 · What you want</button><button type="button" class="pv-k" data-s="aims">3 · Your aims</button><button type="button" class="pv-k" data-s="go">4 · Where you could go</button><button type="button" class="pv-k" data-s="week">5 · This week</button>
</div>
<div class="pv-theme" role="group" aria-label="Day or night"><button type="button" class="pv-k" data-th="day" aria-pressed="true">Day</button><button type="button" class="pv-k" data-th="night" aria-pressed="false">Night</button></div>
</div>
<div class="pv-stage" id="pvStage"><div class="win" id="win" style="--T:''' + str(T) + '''px;--L:''' + str(L) + '''px;--RX:''' + str(RX) + '''px;--PX:''' + str(PX) + '''px;--PY:''' + str(PY) + '''px;--PW:''' + str(PW) + '''px">
<img class="f-back" alt="" data-day="''' + pic['back_day'] + '''" data-night="''' + pic['back_night'] + '''"><img class="f-top" alt="" data-day="''' + pic['top_day'] + '''" data-night="''' + pic['top_night'] + '''"><img class="f-rail" alt="" data-day="''' + pic['rail_day'] + '''" data-night="''' + pic['rail_night'] + '''"><img class="f-right" alt="" data-day="''' + pic['right_day'] + '''" data-night="''' + pic['right_night'] + '''">
<div class="main" id="pvMain"></div>
<div class="pv-toast" id="pvToast" hidden></div>
</div></div>
''' + notes + '''
</div>
<script>
var SHOTS=''' + json.dumps(shots) + ''';var HS=''' + json.dumps(hs) + ''';
''' + add_js + '''
</script>
'''
open(OUT, 'w', encoding='utf-8').write(page)
print('wrote', OUT, len(page), 'bytes')
