"""Fabrica's phase 2 preview, built from Fabrica itself: the window's frame (pictures of the app), the real #fb with its captured
rooms, every style rule and keyframe that draws it, and the phase 2 pieces in its own forms.
    python3 -I build.py <scratch> <out.html>"""
import sys, json, re, io, base64
from PIL import Image
S, OUT = sys.argv[1:3]
C = S + '/fabcap/'; F = C + 'frame/'; H = S + '/preview/fabrica_p2/'
parts = json.load(open(C + 'parts.json', encoding='utf-8'))
g = json.load(open(F + 'geometry.json'))['day']
T, L, RX = g['T'], g['L'], g['RX']
def webp(path, q):
    im = Image.open(path)
    if im.mode not in ('RGB', 'RGBA'): im = im.convert('RGBA')
    b = io.BytesIO(); im.save(b, 'WEBP', quality=q, method=6); return 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()
pic = {}
for part in ('top', 'rail', 'right', 'back'):
    for th in ('day', 'night'):
        pic[part + '_' + th] = webp(F + part + '_' + th + '.png', 88 if part == 'back' else 92)
SEL = re.compile(r'(^|[{,]\s*)(?:html\s+body|html|body|:root)(?=[\[\s.:{#>,]|$)')
def scope(t): return SEL.sub(lambda m: m.group(1) + '.win', t)
rules = '\n'.join(scope(r) for r in parts['rules'])
toks = '\n'.join(scope(t) for t in parts['toks'])
frames = '\n'.join(parts['frames'])
add = open(H + 'add.css', encoding='utf-8').read()
sk = parts['skeleton']['html']
sk = re.sub(r'style="--f-h:\s*\d+px;?"', 'style="--f-h: 841px;"', sk, count=1)
def fill(html, i, inner):
    m = re.search(r'(<(?:div|section)[^>]*data-pn="%d"[^>]*>)(</(?:div|section)>)' % i, html)
    assert m, i
    return html[:m.end(1)] + inner + html[m.start(2):]
sk = fill(sk, 0, parts['left']); sk = fill(sk, 1, ''); sk = fill(sk, 2, '')
views = json.dumps(parts['views']).replace('</', '<\\/'); right = json.dumps(parts['right']).replace('</', '<\\/')
page_css = r'''
:root{--pg:#e9e6ef;--pgink:#4a4358;--pgink2:#6c6579;--pgline:rgba(34,26,46,.12);--pgkey:#ffffff;--pgacc:#6a3fb5;--pgcard:#faf8fc;--pgok:#2f7a55;--pgoks:rgba(47,122,85,.12);--pgwarn:#9a5a12;--pgwarns:rgba(184,116,46,.12)}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--pg:#0b0910;--pgink:#d3c9e3;--pgink2:#a99cc1;--pgline:rgba(205,184,240,.14);--pgkey:#211a2d;--pgacc:#b79ce6;--pgcard:#17121f;--pgok:#7fd1a6;--pgoks:rgba(127,209,166,.14);--pgwarn:#e6b26a;--pgwarns:rgba(230,178,106,.14);color-scheme:dark}}
:root[data-theme="dark"]{--pg:#0b0910;--pgink:#d3c9e3;--pgink2:#a99cc1;--pgline:rgba(205,184,240,.14);--pgkey:#211a2d;--pgacc:#b79ce6;--pgcard:#17121f;--pgok:#7fd1a6;--pgoks:rgba(127,209,166,.14);--pgwarn:#e6b26a;--pgwarns:rgba(230,178,106,.14);color-scheme:dark}
body{background:var(--pg);color:var(--pgink);font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
*{box-sizing:border-box}
.bar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding-block:10px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));font-size:13px;color:var(--pgink2)}
.bar b{color:var(--pgink);font-weight:600}.bar .keys{display:flex;gap:8px;flex-wrap:wrap}
.tg{min-width:72px;padding:6px 14px;border-radius:999px;border:1px solid var(--pgline);background:var(--pgkey);color:var(--pgink);font-family:inherit;font-weight:600;font-size:12.5px;line-height:1.2;cursor:pointer;box-shadow:0 1px 0 var(--pgline),0 3px 8px rgba(40,22,68,.10);transition:transform .16s cubic-bezier(.34,1.35,.64,1)}
.tg:hover{transform:translateY(-2px)}.tg:active{transform:translateY(1px)}.tg:focus-visible{outline:2px solid var(--pgacc);outline-offset:2px}
.stage{padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-bottom:12px}
.fit{position:relative;margin:0 auto;overflow:hidden;border-radius:14px;box-shadow:0 0 0 1px var(--pgline),0 18px 48px rgba(20,10,40,.22)}
.note{max-width:86ch;margin:6px auto 14px;color:var(--pgink2);font-size:13px;line-height:1.55;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
.note b{color:var(--pgink)}
.win{position:absolute;left:0;top:0;width:1440px;height:900px;overflow:hidden;transform-origin:0 0;background:#f5f3f7;font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#221a2e;-webkit-font-smoothing:antialiased}
.win[data-theme="night"]{background:#16131c;color:#efe9f6}
.win img{display:block;max-width:none;-webkit-user-drag:none}
.win .only-night{display:none!important}.win[data-theme="night"] .only-night{display:block!important}.win[data-theme="night"] .only-day{display:none!important}
.win > .pvf-back{position:absolute;inset:0;z-index:0}.win > .pvf-back img{width:1440px;height:900px}
.win > .pvf-scroll{position:absolute;inset:0;z-index:1;overflow:hidden}
.win .pvf-page{padding:59px 84px 0 229px}
.win > .pvf-top{position:absolute;left:0;top:0;z-index:5;pointer-events:none}.win > .pvf-top img{width:1440px;height:%(T)dpx}
.win > .pvf-rail{position:absolute;left:0;top:%(T)dpx;z-index:5;pointer-events:none}.win > .pvf-rail img{width:%(L)dpx;height:%(RH)dpx}
.win > .pvf-right{position:absolute;left:%(RX)dpx;top:%(T)dpx;z-index:5;pointer-events:none}.win > .pvf-right img{width:%(RW)dpx;height:%(RH)dpx}
.win .pv-toast{position:absolute;left:50%%;bottom:26px;z-index:95;transform:translate(-50%%,16px);padding:8px 16px;border-radius:999px;background:#fff;color:#221a2e;box-shadow:inset 0 0 0 1px rgba(34,26,46,.10),0 10px 24px rgba(40,22,68,.18);font-weight:600;font-size:13px;opacity:0;pointer-events:none;transition:opacity .25s ease,transform .35s cubic-bezier(.34,1.35,.64,1);max-width:900px}
.win[data-theme="night"] .pv-toast{background:#231c30;color:#efe9f6;box-shadow:inset 0 0 0 1px rgba(205,184,240,.12),0 10px 24px rgba(0,0,0,.5)}
.win .pv-toast.on{opacity:1;transform:translate(-50%%,0)}
/* the map below the window, in the page's own words */
.map{max-width:1100px;margin:8px auto 40px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
.map h2{font:600 22px/1.25 "Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;margin:0 0 6px;color:var(--pgink)}
.map p{margin:0 0 12px;color:var(--pgink2);font-size:13px;max-width:86ch}
.mk{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 12px}
.mk .tg[aria-pressed="true"]{background:var(--pgacc);color:#fff;border-color:transparent}
.grp{margin:14px 0 6px;font:600 15px "Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;color:var(--pgink)}
.row{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr) auto;gap:4px 14px;align-items:start;padding:9px 12px;border-radius:12px;background:var(--pgcard);box-shadow:0 0 0 1px var(--pgline);margin-bottom:6px;font-size:13px}
.row b{font-weight:600;color:var(--pgink)}.row span{color:var(--pgink2)}.row .lb{display:none;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--pgink2)}
.ph{font:600 11px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:5px 9px;border-radius:999px;white-space:nowrap;background:rgba(106,63,181,.14);color:var(--pgacc);justify-self:end}
.ph.now{background:var(--pgoks);color:var(--pgok)}.ph.p3,.ph.p4{background:var(--pgwarns);color:var(--pgwarn)}.ph.bey{background:var(--pgacc);color:#fff}
.order{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px;margin-top:16px}
.order div{padding:12px 14px;border-radius:12px;background:var(--pgcard);box-shadow:0 0 0 1px var(--pgline);font-size:12.5px;color:var(--pgink2)}
.order b{display:block;font-size:13.5px;color:var(--pgink);margin-bottom:2px}
@media (max-width:760px){.row{grid-template-columns:minmax(0,1fr) auto}.row span{grid-column:1/-1}.row .ph{grid-row:1;grid-column:2}}
@media (prefers-reduced-motion:reduce){.tg,.win *{transition:none!important;animation:none!important}}
''' % {'T': T, 'L': L, 'RX': RX, 'RW': 1440 - RX, 'RH': 900 - T}
body = '''<div class="bar"><span><b>Ingenium</b> · Fabrica, phase 2: every repository on your own disk (a preview)</span><span class="keys"><button class="tg" id="soundKey" type="button" aria-pressed="true">Sound on</button><button class="tg" id="themeKey" type="button">Night</button><button class="tg" id="againKey" type="button">Start again</button></span></div>
<div class="stage" id="stage"><div class="fit" id="fit">
<div class="win" id="win" data-theme="day">
<script>(function(){try{if(matchMedia("(prefers-color-scheme: dark)").matches&&document.documentElement.getAttribute("data-theme")!=="light")document.getElementById("win").setAttribute("data-theme","night");}catch(e){}})();</script>
  <div class="pvf-back" aria-hidden="true"><img class="only-day" alt="" src="%(back_day)s"><img class="only-night" alt="" src="%(back_night)s"></div>
  <div class="pvf-scroll"><div class="pvf-page">%(fb)s</div></div>
  <div class="pvf-top" aria-hidden="true"><img class="only-day" alt="" src="%(top_day)s"><img class="only-night" alt="" src="%(top_night)s"></div>
  <div class="pvf-rail" aria-hidden="true"><img class="only-day" alt="" src="%(rail_day)s"><img class="only-night" alt="" src="%(rail_night)s"></div>
  <div class="pvf-right" aria-hidden="true"><img class="only-day" alt="" src="%(right_day)s"><img class="only-night" alt="" src="%(right_night)s"></div>
  <div class="pv-toast" id="pvToast" role="status" aria-live="polite"></div>
</div></div></div>
<p class="note"><b>A preview, drawn from Fabrica itself.</b> This is Fabrica as it is in the app today, with what phase 2 adds in its own pieces: <b>On this computer</b> in Your apps (your repositories read straight from the drive, at any size); their size and drive beside the name; the branch in Ingenium's own list; in Plans, a pull request brought in by merge, squash or rebase; and a fourth part beside Test, Ship and Copies: <b>Ingenium</b>, your own model reading the repository with no connection. Also new here: <b>what changed while you were away</b>, at the top of Your apps; <b>People and a milestone</b> on an issue or a pull request; a <b>comment on any line</b> of a pull request's Files changed (the + beside a line), with Resolve, and <b>Viewed</b>; <b>Rules before main</b> in Care, Settings, where every section now opens and shuts; and <b>Safety, on every version</b> in Care, Checks. Press the rooms (Now, Story, Plans, Care), their tabs, the pull request and the issue in Plans, the branch, and the parts on the right. The repositories, logos and words are invented; the top bar and the side list are pictures of the app.</p>
'''
data = {'fb': sk}; data.update(pic)
body = body % data
map_html = open(H + 'map.html', encoding='utf-8').read()
out = ('<title>Fabrica on Your Disk</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n<style>\n' + page_css + '\n' + toks + '\n' + rules + '\n' + frames + '\n' + add + '\n</style>\n' + body + map_html +
       '<script type="application/json" id="pvViews">' + views + '</script>\n<script type="application/json" id="pvRight">' + right + '</script>\n<script>\n' + open(H + 'app.js', encoding='utf-8').read() + '</script>\n')
open(OUT, 'w', encoding='utf-8').write(out); print('written', OUT, round(len(out) / 1e6, 2), 'MB')
