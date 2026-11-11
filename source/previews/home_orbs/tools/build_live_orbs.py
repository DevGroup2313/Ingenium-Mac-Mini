"""Builds the live preview of Home's solid orbs (modules/r264.js, held for her answer on 10 November 2026) from the 6.67 preview's
template and tools (../../home_concepts/): the pictures and genuine parts capture_v2.js takes from her running app, Home's own
styles (r147), the orrery (r261) and the solid orbs (r264), so the preview runs the code Ingenium will carry. A room pressed in the
preview knocks as it will in Ingenium; where Ingenium would then open the room, the preview says which room it would open.

python3 -I build_live_orbs.py <scratch dir holding real2/> <out html> <modules dir>
"""
import os, re, subprocess, sys

S, OUT, MOD = sys.argv[1:4]
HERE = os.path.dirname(os.path.abspath(__file__))
CONCEPTS = os.path.normpath(os.path.join(HERE, '..', '..', 'home_concepts'))
TPL = os.path.join(CONCEPTS, 'live_orrery_template.html')
tmp_tpl = os.path.join(S, 'orbs_template.html')
tpl = open(TPL, encoding='utf-8').read()
# a room's press goes through its own click handler, as in Ingenium, so the solid orbs' knock comes before what the room does
a = ('[].forEach.call(D.querySelectorAll("#hx .hx-key"),function(k){k.addEventListener("click",function(){say("In Ingenium this opens "'
     '+k.querySelector(".hx-kh").textContent+".");});});')
assert tpl.count(a) == 1, 'the template changed: its rooms are no longer pressed as expected'
tpl = tpl.replace(a, '[].forEach.call(D.querySelectorAll("#hx .hx-key"),function(k){k.onclick=function(){say("In Ingenium this opens "'
                     '+k.querySelector(".hx-kh").textContent+".");};});')
r264 = open(os.path.join(MOD, 'r264.js'), encoding='utf-8').read()
css = re.search(r'<style id="r264-css">(.*?)</style>', r264, re.S).group(1)
js = re.search(r'</style>\s*<script>(.*?)</script>', r264, re.S).group(1)
assert '</script' not in js
b = '{{R261_JS}}\n</script>'
assert tpl.count(b) == 1
tpl = tpl.replace(b, '{{R261_JS}}\n</script>\n<script>\n/* Ingenium\'s modules/r264.js (Home\'s solid orbs), as the app will carry it */\n'
                  + js.replace('{{', '{ {') + '\n</script>')
c = '{{APP_CSS}}'
assert tpl.count(c) == 1
tpl = tpl.replace(c, '{{APP_CSS}}\n' + css.replace('body[', '.win[').replace('{{', '{ {'))
open(tmp_tpl, 'w', encoding='utf-8').write(tpl)
subprocess.check_call([sys.executable, '-I', os.path.join(CONCEPTS, 'tools', 'build_live4.py'), S, tmp_tpl, OUT, MOD])
h = open(OUT, encoding='utf-8').read()
for x, y in (('<title>Ingenium Orrery</title>', '<meta charset="utf-8">\n<title>Ingenium Solid Orbs</title>'),
             ('<span><b>Ingenium 6.67</b> · Home, with your rooms in orbit around your seal</span>',
              '<span><b>Preview</b> · Home\'s rooms, as solid as your seal</span>'),
             ('<p class="note">This is the Home that Ingenium 6.67 carries, running the app\'s own code. Point at a room, press your seal, or scroll '
              'inside the window for the rest of Home. The top bar, the side list, the side buttons and the rest of Home are pictures of the app.</p>',
              '<p class="note">This is Home with the solid orbs, running the code Ingenium will carry once you approve it. Point at a room: it '
              'lifts, tilts and shows its edge. Press and hold: its mark is pushed down and it sinks. Let go: it knocks, and its room would open. '
              'Press your seal to compare. The top bar, the side list, the side buttons and the rest of Home are pictures of Ingenium 6.71.</p>')):
    assert h.count(x) == 1, x[:60]
    h = h.replace(x, y)
open(OUT, 'w', encoding='utf-8').write(h)
print('the solid orbs are in:', 'r264-css' not in h and 'oxo-edge' in h)
