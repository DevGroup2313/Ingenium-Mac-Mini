"""Fabrica, phase 3, its live preview (14 November 2026), built from Fabrica itself: the window's frame and Fabrica's header as pictures
of the app (7.06), the real #fb with its captured rooms and every style rule and keyframe that draws it, and the phase 3 pieces in
Fabrica's own forms (add.css, app.js), with the parity map below (map.html).
    python3 -I build.py <scratch> <out.html> [capture folder, fabcap705] [frame and head folder, fabcap706]
The capture: tools/capture_fabrica_686.js of the phase 2 kit (../fabrica_p2/tools), run on the page with logos.json (three invented
logos); the frame: ../fabrica_p2/tools/capture_frame.js <page> <S>/fabcap706/frame fabrica; the head: tools/capture_head.js."""
import sys, os, json, re, io, base64
from PIL import Image
S, OUT = sys.argv[1:3]
CAP = sys.argv[3] if len(sys.argv) > 3 else 'fabcap705'
FH = sys.argv[4] if len(sys.argv) > 4 else 'fabcap706'
H = os.path.dirname(os.path.abspath(__file__)) + '/'
C = S + '/' + CAP + '/'; F = S + '/' + FH + '/frame/'; HD = S + '/' + FH + '/head/'
parts = json.load(open(C + 'parts.json', encoding='utf-8'))
g = json.load(open(F + 'geometry.json'))['day']
T, L, RX = g['T'], g['L'], g['RX']
head = json.load(open(HD + 'head.json'))['day']
PT, FT = head['pageTop'], head['fbTop']          # the page's top and #fb's top, in the page (1x)
def webp(im, q):
    if isinstance(im, str): im = Image.open(im)
    if im.mode not in ('RGB', 'RGBA'): im = im.convert('RGBA')
    b = io.BytesIO(); im.save(b, 'WEBP', quality=q, method=6); return 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()
pic = {}
for part in ('top', 'rail', 'right', 'back'):
    for th in ('day', 'night'):
        pic[part + '_' + th] = webp(F + part + '_' + th + '.png', 88 if part == 'back' else 92)
# the header card and its four steps: the head picture was taken from x 221 to 1364 and y 0 to #fb's top, at twice the size; the page's
# content starts at x 229 (8 px in) and y PT
for th in ('day', 'night'):
    im = Image.open(HD + 'head_' + th + '.png')
    im = im.crop((2 * 8, 2 * PT, im.width - 2 * 8, 2 * FT))
    pic['head_' + th] = webp(im, 90)
HW, HH = 1364 - 221 - 16, FT - PT
SEL = re.compile(r'(^|[{,]\s*)(?:html\s+body|html|body|:root)(?=[\[\s.:{#>,]|$)')
def scope(t): return SEL.sub(lambda m: m.group(1) + '.win', t)
rules = '\n'.join(scope(r) for r in parts['rules'])
toks = '\n'.join(scope(t) for t in parts['toks'])
frames = '\n'.join(parts['frames'])
add = open(H + 'add.css', encoding='utf-8').read()
sk = parts['skeleton']['html']
sk = re.sub(r'style="--f-h:\s*\d+px;?"', 'style="--f-h: 826px;"', sk, count=1)
def fill(html, i, inner):
    m = re.search(r'(<(?:div|section)[^>]*data-pn="%d"[^>]*>)(</(?:div|section)>)' % i, html)
    assert m, i
    return html[:m.end(1)] + inner + html[m.start(2):]
sk = fill(sk, 0, parts['left']); sk = fill(sk, 1, ''); sk = fill(sk, 2, '')
views = json.dumps(parts['views']).replace('</', '<\\/'); right = json.dumps(parts['right']).replace('</', '<\\/')
PANELS = FT - T - 8   # the window scrolled so the three panels fill it, as in the app
page_css = open(H + '../fabrica_p2/build.py', encoding='utf-8').read()
page_css = page_css[page_css.index("page_css = r'''") + len("page_css = r'''"):]
page_css = page_css[:page_css.index("'''")]
page_css = page_css.replace('.win > .pvf-scroll{position:absolute;inset:0;z-index:1;overflow:hidden}', '.win > .pvf-scroll{position:absolute;inset:0;z-index:1;overflow-x:hidden;overflow-y:auto;scrollbar-width:thin}')
page_css += '''
.win .pv-head{position:relative;width:%(HW)dpx;height:%(HH)dpx}.win .pv-head img{width:%(HW)dpx;height:%(HH)dpx}
.bar .keys .tg[aria-pressed="true"]{background:var(--pgacc);color:#fff;border-color:transparent}
.tour{max-width:1100px;margin:0 auto 10px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));color:var(--pgink2);font-size:13px}
.tour b{color:var(--pgink);font-weight:600;margin-right:2px}
.win #fb .f-sheet-wrap{position:absolute}
''' % {'HW': HW, 'HH': HH}
page_css = page_css % {'T': T, 'L': L, 'RX': RX, 'RW': 1440 - RX, 'RH': 900 - T}
body = '''<div class="bar"><span><b>Ingenium</b> · Fabrica, phase 3: every device, your own machines, and learning as you go (a preview)</span><span class="keys"><button class="tg" id="learnKey" type="button" aria-pressed="false">Learning mode</button><button class="tg" id="soundKey" type="button" aria-pressed="true">Sound on</button><button class="tg" id="themeKey" type="button">Night</button><button class="tg" id="againKey" type="button">Start again</button></span></div>
<div class="tour" role="group" aria-label="Go to"><b>Go to:</b><button class="tg" type="button" data-go="runs,runs,14,win">A run on your machines</button><button class="tg" type="button" data-go="runs,runs,13,win">A failed test, explained</button><button class="tg" type="button" data-go="runs,machines">Machines</button><button class="tg" type="button" data-go="runs,workflows">Workflows</button><button class="tg" type="button" data-go="story,releases">Every device in one release</button><button class="tg" type="button" data-go="ship">Where each package is made</button></div>
<div class="stage" id="stage"><div class="fit" id="fit">
<div class="win" id="win" data-theme="day">
<script>(function(){try{if(matchMedia("(prefers-color-scheme: dark)").matches&&document.documentElement.getAttribute("data-theme")!=="light")document.getElementById("win").setAttribute("data-theme","night");}catch(e){}})();</script>
  <div class="pvf-back" aria-hidden="true"><img class="only-day" alt="" src="%(back_day)s"><img class="only-night" alt="" src="%(back_night)s"></div>
  <div class="pvf-scroll" id="pvScroll" data-panels="%(PANELS)d"><div class="pvf-page"><div class="pv-head" aria-label="Fabrica's header: the tree of quill-notes' versions, and its four steps"><img class="only-day" alt="" src="%(head_day)s"><img class="only-night" alt="" src="%(head_night)s"></div>%(fb)s</div></div>
  <div class="pvf-top" aria-hidden="true"><img class="only-day" alt="" src="%(top_day)s"><img class="only-night" alt="" src="%(top_night)s"></div>
  <div class="pvf-rail" aria-hidden="true"><img class="only-day" alt="" src="%(rail_day)s"><img class="only-night" alt="" src="%(rail_night)s"></div>
  <div class="pvf-right" aria-hidden="true"><img class="only-day" alt="" src="%(right_day)s"><img class="only-night" alt="" src="%(right_night)s"></div>
  <div class="pv-toast" id="pvToast" role="status" aria-live="polite"></div>
</div></div></div>
<p class="note"><b>A preview, drawn from Fabrica itself.</b> This is Fabrica as Ingenium 7.06 draws it, captured from the app with three invented apps (quill-notes, harbour-garden, ledger); the header is a picture of the app, and you can scroll up to it. What phase 3 adds is shown in Fabrica's own forms: <b>Needs you</b> at the top of Your apps, across all your apps; a fifth room, <b>Runs</b>, where your workflows run on your own Mac mini and HP laptop, or on GitHub's machines, each job with its steps, its whole log and the files it made, all kept; <b>Machines</b>, with what each can build and what it still needs; <b>every device in one release</b> (Story, Releases), with Install on this Mac, a Windows installer that registers and uninstalls, and sending to the Fire tablet or to Ingenium on the iPhone; in Test and ship, <b>where each package is made</b>; and <b>Learn</b> in every room, with Learning mode above. The runs, logs, sizes and times are examples.</p>
<p class="note"><b>Said plainly.</b> A machine runs a workflow only while it is awake with Ingenium open. GitHub's machines need your GitHub sign-in, and GitHub counts the minutes of a private repository's runs. An iPhone or iPad app of its own needs an Apple ID to sign it (Sideloadly, AltStore or Xcode do that); without one, an app can live inside Ingenium on the iPhone. An installer that is not signed with a certificate is asked about once by Windows (More info, Run anyway), and an app from another computer once by macOS (Control-click, Open).</p>
'''
data = {'fb': sk, 'PANELS': PANELS}; data.update(pic)
body = body % data
map_html = open(H + 'map.html', encoding='utf-8').read()
out = ('<title>Fabrica on Every Device</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n<style>\n' + page_css + '\n' + toks + '\n' + rules + '\n' + frames + '\n' + add + '\n</style>\n' + body + map_html +
       '<script type="application/json" id="pvViews">' + views + '</script>\n<script type="application/json" id="pvRight">' + right + '</script>\n<script>\n' + open(H + 'app.js', encoding='utf-8').read() + '</script>\n')
open(OUT, 'w', encoding='utf-8').write(out); print('written', OUT, round(len(out) / 1e6, 2), 'MB', 'panels at', PANELS)
